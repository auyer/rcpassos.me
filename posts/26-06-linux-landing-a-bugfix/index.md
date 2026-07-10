---
title: 'Solving two regressions in Linux 7.1 with one PATCH!'
date: 2026-06-02
---

I found a serious boot failure bug in Linux 7.1 during the stabilization phase.
[Dogfooding works](https://rcpassos.me/post/26-03-linux-kernel-bug-hunting-setup)! I sent the fix just in time for it to be included in the 7.1 release.

## The almost continuous deployment

As I described in a [past post](https://rcpassos.me/post/26-03-linux-kernel-bug-hunting-setup), I'm using my own devices to find (and fix) issues in the Linux Kernel.

It took me some time to find this one because I was spending all my free time finishing work on a scientific paper.
At this time, I only deployed to my desktop and found no issues.
But right after finishing it, I deployed it to my laptop again, and booting failed!

Have you ever seen someone excited by a boot failure? I call it an opportunity.

## Debugging a boot failure

This was my first time investigating a bug serious enough to prevent the machine from booting.
My first question was "_If the boot failed, how am I going to get the logs? Am I going into this completely blind?_"

The answer is no. But then, how do we get these early logs? 4 key things need to happen.

During boot, before filesystems are mounted, we have no disk to write the logs to. But the Kernel uses its **Ring Buffer** to save the logs in memory. This buffer is also accessible via the `/dev/kmsg` file. But this buffer starts clean in every boot.

Each boot also gets a **unique id**, (exposed at `/proc/sys/kernel/random/boot_id`). This ID will be used to identify the logs from a previous boot.

Still, before mounting a disk, the **systemd-journald** starts, and streams the logs from the ring buffer, with the boot-id, to a **tempfs** (still in RAM) in `/run/log/journal/`.

Once we have a disk, _systemd-journal-flush.service_ is activated, and flushes content from the tempfs to `/var/log/journal/` persistent storage.

I was lucky the failure wasn't before this flush.
One day, I will figure out how to debug crashes that happen before this step.

The logs can then be read using this command:

```bash
sudo journalctl -k -b -1 > boot-failure.txt
#               /\   /\
#  only kernel _|     |_ the last boot (-1)
#         logs            current boot is 0
```

## Decoding a stack trace

After collecting the failure log, we have a not-so-readable stack trace. , but there is a handy tool to help.

Check this piece of stack trace:

```bash
Call Trace:
<TASK>
? input_alloc_absinfo+0x36/0x60
hidinput_connect+0x8a5/0x5ed0 [hid]
hid_connect+0x3bc/0x680 [hid]
? vfree.part.0+0x9a/0x200
hid_hw_start+0x40/0x70 [hid]
mt_probe+0x1cc/0x3c0 [hid_multitouch]
? devres_open_group+0xe8/0x140
hid_device_probe+0x1a3/0x240 [hid]
```

It is a lot better than not having one. It contains some hints,
but it could be a lot better.
These hexadecimal numbers are offsets. There is a tool in the kernel tree that can decode them into file lines!
All we need is the compiled binary.

Inside the kernel tree, the binary is usually located in the root of the kernel folder, named `vmlinux`.
The tool is in the scripts folder.

```bash
bash scripts/decode_stacktrace.sh vmlinux < boot-failure.txt
#                                   /\        /|
#             the compiled kernel __|         |
#                     the boot logs we saved _|
```

This is the new stack strace!
Much better!

```bash
Call Trace:
<TASK>
? input_alloc_absinfo (./include/linux/slab.h:950 ./include/linux/slab.h:1188 drivers/input/input.c:442)
hidinput_connect (drivers/hid/hid-input.c:1310 drivers/hid/hid-input.c:2294 drivers/hid/hid-input.c:2361) hid
hid_connect (drivers/hid/hid-core.c:2308 (discriminator 1)) hid
? vfree.part.0 (mm/vmalloc.c:3475)
hid_hw_start (drivers/hid/hid-core.c:2426 drivers/hid/hid-core.c:2417) hid
mt_probe (drivers/hid/hid-multitouch.c:2028) hid_multitouch
? devres_open_group (./include/linux/spinlock.h:408 ./include/linux/spinlock.h:619 drivers/base/devres.c:263 drivers/base/devres.c:617)
hid_device_probe (drivers/hid/hid-core.c:2822 drivers/hid/hid-core.c:2859) hid
```

## Finding the bug

I was ready to start bisecting, but this time there was only one recent change to the `hid-input.c` file.
I tested a build with the commit reverted, and it worked.
It is then time to read the code and understand what changed.
[My report](https://lore.kernel.org/all/20260602011949.2825852-1-rafael@rcpassos.me/).

What changed:
This change was part of a series in the HID (Human Interface Devices) drivers. It introduced the support for [tracking multiple batteries per device](https://lore.kernel.org/all/20260314010533.110278-4-lcasmz54@gmail.com/).
During initialization, a list of batteries is allocated by the `devm_kzalloc`.
This is one of the interfaces used to manage driver objects in memory (and I just started learning about it).
This list was not being properly deallocated on driver removal.

Why did this cause an issue?
During boot, devices are matched to their drivers using the `probe` process.
Apparently, in early boot, some generic drivers are loaded, and `device_reprobe` is later used to detach the generic driver and upgrade to the desired driver.
I don't know why this happens in this case, as the same driver was loaded once (it created the battery list), unloaded, and failed to reload (due to the uncleared battery list).

My [first fix (PATCH V1)](https://lore.kernel.org/all/20260602015029.2838058-1-rafael@rcpassos.me/) was to clean up this list in the `hidinput_disconnect` function I found in the same file.

## A sashiko review

That wasn't the right way to clean up the driver's memory objects.
It worked, but the [review](https://lore.kernel.org/all/20260602020352.4256D1F00893@smtp.kernel.org/) from the Sashiko bot pointed out a possible race condition! Ouch!

There is a proper way to register a cleanup function. The review mentioned the _Wacom_ drivers, and I used them as a reference.
I found the `devm_add_action_or_reset` function, which registers a cleanup call during driver initialization.
I used it in [my v2 patch](https://lore.kernel.org/all/20260602030519.3097058-1-rafael@rcpassos.me/), sent an hour after the first one.

## Two regressions?

In the morning, I was cc'd into another email thread.
Someone had found and reported [a similar bug with Bluetooth keyboards](https://lore.kernel.org/all/ah6vRH9J9LSvnKWW@mail.iam.tj/) (turns out they have batteries too ;P).
They found my report similar and noted later that my patch also fixed their problem.

After seeing [these results](https://lore.kernel.org/all/871573a0-79e7-4d0e-95f5-00bbda58238c@leemhuis.info/), is it wrong to be cheering for more regressions like this so I can fix them?
Well, I am hoping for more bugs to fix!
