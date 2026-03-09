---
title: Linux Kernel Bug Hunting Setup
date: 2026-03-08
---

In 2024, I contributed to the Linux Kernel by performing janitorial work, fixing compiler warnings (unused variables, variable shadowing, and typos in comments).
After familiarising myself with the contribution process, finding what to contribute to became the hard part.
Keeping up with the emails in the mailing list is challenging.
2025 was a busy year, due to work and the start of my PhD.
But in **2026**, I decided to **put myself back in a position to find meaningful contribution opportunities**.
This post details **the strategy I used** to find real bugs, and fix them.

## Dogfooding

Dogfooding is a software industry practice in which we use the software we develop.
I have been using Linux on my computers for at least a decade. I've been gaming **only** on Linux for 6 years.
This is obviously a start. But to take things further, I started running bleeding-edge versions, compiled straight from source.

First, I started compiling the Mainline Kernel and deploying it to my Desktop and Laptop.
I do it at least twice a week, depending on how my week is going, or how many patches are landing in the Mainline.
To do it, I use the build-deploy script from [KW](https://kworkflow.org) Kernel Workflow Tool. It makes it painlessly easy to do it, in two commands (one per machine).

```c
     .--.
     |  | $ kw bd
     |  v  (build and deploy locally)
  +-----------------------+
  |         Desktop       |
  | (Compiles the Kernel) |
  +-----------------------+
         |
         |
         | $ kw d --remote laptop
         v  (deploy the previous build)
  +--------------------+
  |      Laptop        |
  +--------------------+
```

The local deployment requires no setup. The remote deployment requires root SSH access and Rsync.
On my laptop, I added a configuration to SSHD to allow SSH login with key-based authentication from my Desktop's local IP.
I also keep sshd off and only turn it on when needed.

```python
Match Address desktop.lan.ip
        PermitRootLogin prohibit-password
```

Configuring `kw` to use the laptop as a remote deployment target can be done with the following command, but specifying `user@ip` at deploy time yields the same result and is not much more complicated.

```bash
kw remote --global --add freebook root@laptop.lan.ip
```

The last key part is to keep watching the kernel log (with `dmesg`).
I recommend starting with the following command using the Kernel provided by your distro, to get used to how it usually looks.
But errors and warnings are usually quite visible.

```
sudo dmesg -w
```

All this is completely safe.
The `kw` kernel deployment keeps the Kernel for the distros you run and those you install manually.
In my case, Arch on Desktop, Fedora and Debian on Laptop.
If anything goes wrong and I have other work to do, I can reboot into another working Kernel version.
But the goal is to watch closely when things go wrong.

## Taking a note of the Drivers you use

While it is totally possible to contribute to parts of the Kernel you do not use, I feel much more comfortable if I can test the changes I made.
If the previous strategy did not point you to clear bugs or Kernel warnings, you use the list of devices found in this section to explore the source code, mailing lists or compilation logs.
I will present 3 commands that help identify what to look for.

First, I like to check which driver is used by devices connected via PCI.
The `lspci -k` command shows the kernel modules/drivers in use for the devices:

```bash
$ sudo lspci -k

...
0c:00.0 VGA compatible controller: Advanced Micro Devices, Inc. [AMD/ATI] Granite Ridge [Radeon Graphics] (rev c9)
        Subsystem: ASRock Incorporation Device 364e
        Kernel driver in use: amdgpu
        Kernel modules: amdgpu
06:00.0 Network controller: MEDIATEK Corp. MT7925 (RZ717) Wi-Fi 7 160MHz
        Subsystem: MEDIATEK Corp. MT7925 (RZ717) Wi-Fi 7 160MHz
        Kernel driver in use: mt7925e
        Kernel modules: mt7925e
07:00.0 Ethernet controller: Realtek Semiconductor Co., Ltd. RTL8125 2.5GbE Controller (rev 05)
        Subsystem: ASRock Incorporation Device 8125
        Kernel driver in use: r8169
        Kernel modules: r8169
...
```

There is one small catch, however. Some modules support a very wide number of devices.
The `amdgpu` module in the example above, for instance, supports just about every AMD GPU.
This means not every part of the code in this module will run on your devices.

For USB devices, the command is quite similar. There are usually internal USB hubs, and the devices listed inside them.
Either way, the drivers are clearly labelled in the output.

```bash
$ lsusb -t

...
/:  Bus 003.Port 001: Dev 001, Class=root_hub, Driver=xhci_hcd/4p, 480M
    |__ Port 002: Dev 003, If 0, Class=Vendor Specific Class, Driver=ch341, 12M
    |__ Port 003: Dev 002, If 0, Class=Video, Driver=uvcvideo, 480M
...
/:  Bus 007.Port 001: Dev 001, Class=root_hub, Driver=xhci_hcd/1p, 480M
    |__ Port 001: Dev 002, If 0, Class=Human Interface Device, Driver=usbhid, 12M

```

The last command I is not related to a specific interface type, like the ones before.
It will list all Kernel modules being used, including the ones listed above.
For device drivers, it is harder to understand what uses it.
It also prints modules unrelated to devices and unused modules.

```bash
$ lsmod

typec_ucsi             73728  1 ucsi_acpi
mmc_core              278528  1 rtsx_pci_sdmmc
drm_display_helper    258048  1 amdgpu
video                  77824  1 amdgpu
nvme_auth              28672  1 nvme_core
roles                  16384  1 typec_ucsi
btmtk                  28672  1 btusb
kvm                  1290240  1 kvm_amd
snd_seq_device         16384  1 snd_seq
btrtl                  32768  1 btusb
...
```

## Finding Compilation warnings

This last section aims to find compilation warnings to fix, but I also like to run static analysis on top of it.

First, look only at compiler warnings. The `--warnings` flag in `kw` helps us log different levels of warnings.
You can play with values that combine 1, 2, and 3. I suggest testing levels 1 and 2 first, as level 3 produces a lot of logs.
When using level 3, use a regex expression with the modules collected in the step above to help filter the output:

```bash
kw b --warnings 123 --save-log-to ALL_WARNINGS.log
cat ALL_WARNINGS.log | rg "r8169|8125|igc|ahci|vfio-pci|nfs|amdgpu"
```

To run static analysis, I use `Sparse` and `Smatch` (the latter uses the former).
Installing them is easy, and I recommend doing it from source:
[Sparce docs](https://kernelnewbies.org/Sparse), [Smatch docs](https://github.com/error27/smatch/blob/master/Documentation/smatch.rst).

These docs also go into detail on how to use them.
But this is how I do it. Filtering can be done with grep/rg, like in the previous example.

```bash
make -j30 CHECK="$(which smatch) -p=kernel" C=1 W=12 2>&1 bzImage modules | tee smatch_warnings.txt
```

Reading these logs is the most time-consuming part of this guide.
The filter you use will define how much reading you will do.
If something is showing up way too much, and you want to ignore it, you can also use a negative filter like this:

```bash
rg -v "^ | note: in included file"
```

## Good Luck

If you are interested in contributing to the Linux Kernel, I hope this setup helps.
Always be mindful of the rules and standards established by each community.
Read their contribution guide before submitting anything.
And remember to play nice. The maintainers usually have a lot of work to do.
