---
title: A Solid Environment For Building And Developing The Linux Kernel
date: 2024-04-20
---

# Preface

In my last [post](https://rcpassos.me/post/compiling-debugging-riscv-xv6-kernel), I talked about my sudies on Kernel Development with a simpler Unix like OS, called xv6.
After finishing the MIT course [6.S081 Operating System Engineering](https://learncs.me/mit/6.s081) (available online), I decided it was time to learn how to build the Linux Kernel, and hopefully contribute to it.
I joined a free software group ([FLUSP](https://flusp.ime.usp.br)) at the University of São Paulo (USP), and started taking a course on Free Software and the Linux Kernel Development.
In this post, I will cover the setup of the environment for building and contributing to it.

# Introduction

The Linux Kernel is the most important open source project in the world.
It is the result of collaboration between thousands of developers, and it is the core of the most used operating systems in the world.

It is a very big and complex project.
To build it, you need a good environment, with the right tools and configurations.
It is very important to have a good workflow, so you can build, test, and debug the kernel efficiently.

To accomplish thiw, we will create a virtual machine with a Debian Cloud Image, build the kernel on our host machine, and deploy it to the VM.
This configuration was largely inspired by the guides provided by the FLUSP community, and my experience with them and their workshops.
I also contributed some improvements I am sharing here back to their guides.

What I will cover:

- Creating a Virtual Machine using a Debian Cloud Image
- Enabling SSH to access the virtual machine
- Installing the necessary packages for building the kernel
- Downloading the kernel source code
- Building the kernel
- Booting the kernel in the virtual machine
- Setting up the Clangd LSP for a better experience navigating the source code

# Preparing a Virtual Machine Disk

The first step in my environment setup was to create a virtual machine.
The reasoning here is that I can have a clean intalation target to test the kernel I am building, and I wont negatively affect my machine util I tested it in the VM.
This will also make it easier to backup the environment and roll back to a previous state if something goes wrong.

I use Arch Linux as my main OS, so I will use it as the host for the virtual machine.
The packages I list here are for arch linux, but you can use the package manager of your choice to install the equivalent packages for your OS.

> **⚠️ Note**: In this guide, I refer to the machine I am using to build the kernel as the host machine, and the virtual machine as the VM.
> The Host is where the VM is running, but you may also chose to build the Kernel in a different machine that is not the host.
> If that is the case, only the outputs from the build step need to be sent from your build machine to the Host machine.

## My folder structure

To make it easier for anyone following this setup, here is, this is the folder structure I used in this project.
You may adapt it to your liking, but I will use these paths in the commands I will show.
All folders will be created here with these two `mkdir` commands.

```bash
# create folders for the amd64 architecute
mkdir -p ~/kernel-dev/amd64/boot
mkdir -p ~/kernel-dev/amd64/mountpoint

# and for the arm64 architecture
mkdir -p ~/kernel-dev/arm64/boot
mkdir -p ~/kernel-dev/arm64/mountpoint

# this is how the folder structure will look like
cd ~/kernel-dev
tree . w

➜
.
├── amd64
│   ├── mountpoint
│   ├── boot
│   │   └── boot files for amd64
│   └── linux-amd64.qcow2
├── arm64
│   ├── mountpoint
│   ├── boot
│   │   └── boot files for arm64
│   └── linux-arm64.qcow2
├── linux
│   └── the linux kernel source code
├── vm bootstrap scripts, and base disk images
├── debian-12-nocloud-amd64-daily.qcow2
└── debian-12-nocloud-arm64-daily.qcow2
```

## Downloading a Ready to Use Debian Image

The Debian Cloud Team provides daily built images that a ready to use, no installation step required: [Debian Official Cloud Images](https://cloud.debian.org/images/cloud/).
There are a few variations, and the "nocloud" variant is a perfect fit for this use case.
It is a minimal image that requires no configuration to use.
It allows root login without a password, and it is perfect for quick testing and development.

For my environment, I will create two VMs.
The first one will be for the amd64 (x86_64) architecture, and the second one will be for the arm64 (aarch64) architecture.
You may choose to create only one of them, or even create more VMs for different architectures, as most things will be the same for all of them.

The daily built images can be found at [cdimage.debian.org](http://cdimage.debian.org/cdimage/cloud/bookworm/daily/latest/).
At the moment, they offer images for the `amd64`, `arm64`, `ppc64` and `ppc64el` architectures.

Downloading the base images in qcow2 format (a format that is easy to work with in QEMU and Libvirt):

```bash
cd ~/kernel-dev

# download the images from the debian website for adm64 and arm64
wget http://cdimage.debian.org/cdimage/cloud/bookworm/daily/latest/debian-12-nocloud-amd64-daily.qcow2
wget http://cdimage.debian.org/cdimage/cloud/bookworm/daily/latest/debian-12-nocloud-arm64-daily.qcow2
```

If we peek into these files, we can see the partitions inside.
It is expected for any Linux system to have at least two partitions: one for the root filesystem, and one for the boot filesystem.
The boot is usually a small `vfat` or `fat32` partition.
The root partition is larger, and can usually come in the `ext4`, `btrfs` or other less common partition types.

```bash
virt-filesystems -h --long -a ./debian-12-nocloud-amd64-daily.qcow2

➜
Name        Type        VFS   Label  Size  Parent
/dev/sda1   filesystem  ext4  -      1,8G  -
/dev/sda15  filesystem  vfat  -      124M  -


virt-filesystems -h --long -a ./debian-12-nocloud-arm64-daily.qcow2

➜
Name        Type        VFS   Label  Size  Parent
/dev/sda1   filesystem  ext4  -      1,8G  -
/dev/sda15  filesystem  vfat  -      127M  -
```

From here, most steps will be identical for both architectures (besides the arch name in files).
I will use the `ARCH` variable to store the architecture name, and use it in the commands.
When there are differences, I will make it clear.

## Resizing the Disk Image with virt-resize (Option 1)

The base files we downloaded are almost ready to use, if not for one thing: they have almost no free space available.
We will need to resize the disk to have enough space to have a usable system.
I chose to double the size of the disk, from 2GB to 4GB.
You may want to make it even larger, depending on your needs.

This command will create a new qcow2 file with 4GB of space, and copy the contents of the original file to it, while also making the root partition larger.
In this case, the root partition is the first one, and it is named `/dev/sda1`, with `ext4` filesystem.

```bash
export ARCH=amd64 # or export ARCH=arm64
qemu-img create -f qcow2 -o preallocation=metadata ./$ARCH/linux-$ARCH.qcow2 4G

virt-resize --expand /dev/sda1 debian-12-nocloud-$ARCH-daily.qcow2 ./$ARCH/linux-$ARCH.qcow2
```

If this step is successful, we can proceed to the next step [Creating the Virtual Machine](#creating-the-virtual-machine).

For a yet unknown reason, I experienced an error when running the `virt-resize` command.
Since I had it working before, I included it in the tutorial, hoping it will work for you.
In case it does not, follow the next step to resize the disk manually.

The error message I got was:

```bash
[  44.8] Copying /dev/sda1
virt-resize: error: libguestfs error: appliance closed the connection
unexpectedly.
This usually means the libguestfs appliance crashed.
Do:
  export LIBGUESTFS_DEBUG=1 LIBGUESTFS_TRACE=1
and run the command again.  For further information, read:
  http://libguestfs.org/guestfs-faq.1.html#debugging-libguestfs
You can also run 'libguestfs-test-tool' and post the *complete* output
into a bug report or message to the libguestfs mailing list.

If reporting bugs, run virt-resize with debugging enabled and include the
complete output:

  virt-resize -v -x [...]
```

## Resizing the Disk Image manually (Option 2)

If the previous step did not work, we can resize the disk manually.
This is a more complex process, but it is a good learning experience.
We will use the `qemu-img` command to resize the image, and the `qemu-nbd` command to mount the image as a device, so we can resize the partition as if it was a normal device.

The image we downloaded is about 2GB in total.
To achieve the same 4GB size from the previous step, I will add 2GB to the image.

```bash
# copy the base image to the new file location
cp debian-12-nocloud-$ARCH-daily.qcow2 ./$ARCH/linux-$ARCH.qcow2
# resize the image
qemu-img resize ./$ARCH/linux-$ARCH.qcow2 +2G
```

This just added 2GB of free space to the fisk image, but it did not resize the partition.
We can check that with the `virt-filesystems` command:

```bash
$ virt-filesystems -h --long --all -a ./$ARCH/linux-$ARCH.qcow2

➜
Name        Type        VFS      Label  MBR  Size  Parent
/dev/sda1   filesystem  ext4     -      -    1,8G  -
/dev/sda14  filesystem  unknown  -      -    3,0M  -
/dev/sda15  filesystem  vfat     -      -    124M  -
/dev/sda1   partition   -        -      -    1,9G  /dev/sda
/dev/sda14  partition   -        -      -    3,0M  /dev/sda
/dev/sda15  partition   -        -      -    124M  /dev/sda
/dev/sda    device      -        -      -    4,0G  -
```

We can see that the root partition is still 1.8GB, and the new space we create is just empty space.
To resize it, we are going to mount this image to our host machine as a device using the `nbd` kernel module.

```bash
# enable the nbd module
sudo modprobe nbd
# mount the image as a device to /dev/nbd0
sudo qemu-nbd -c /dev/nbd0 ./$ARCH/linux-$ARCH.qcow2
```

To check if it worked, we can use the `lsblk` command.
The output should show the partitions in the image, and should be equivalent to the output of the `virt-filesystems` command we used before:

```bash
lsblk /dev/nbd0

➜
NAME      MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS
nbd0       43:0    0    4G  0 disk
├─nbd0p1   43:1    0  1,9G  0 part
├─nbd0p14 259:6    0    3M  0 part
└─nbd0p15 259:7    0  124M  0 part
```

At this point, resizing the partition can be done in a plethora of ways.
If you are familiat with this, you can use the tool of your choice (like gparted, gnome-disk-utility).

I will use the `parted` command line tool.

```bash
sudo parted /dev/nbd0

➜
GNU Parted 3.6
Using /dev/nbd0
Welcome to GNU Parted! Type 'help' to view a list of commands.

(parted) print
Model: Unknown (unknown)
Disk /dev/nbd0: 4295MB
Sector size (logical/physical): 512B/512B
Partition Table: gpt
Disk Flags:

Number  Start   End     Size    File system  Name  Flags
14      1049kB  4194kB  3146kB                     bios_grub
15      4194kB  134MB   130MB   fat16              boot, esp
 1      134MB   2146MB  2012MB  ext4
```

If you see a warning like this, you can use `Fix`, but it wont resize the partition we want.

```bash
Warning: Not all of the space available to /dev/nbd0 appears to be used, you can fix the GPT to use all of the space (an extra 4194304 blocks) or continue with
the current setting?
Fix/Ignore? Fix
```

We can resize the partition with the `resizepart` command inside the `parted` shell.
For this command, the first argument is the partition number, and the second is the new size of the partition.
Both values can be copied from the previous output.
The partition number is 1, because it is the root partition (with the ext4 filesystem).
The size is 4295MB, because it is the size noted on the "Disk" line.
Alternatively, we can use 100% as the second argument, to use all available space.

```bash
# inside the parted shell
(parted) resizepart 1 4295MB # or 100%
(parted) quit

# check the results:
lsblk /dev/nbd0

➜
NAME      MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS
nbd0       43:0    0    4G  0 disk
├─nbd0p1   43:1    0  3,9G  0 part
├─nbd0p14 259:6    0    3M  0 part
└─nbd0p15 259:7    0  124M  0 part
```

Now we can disconnect the image from the nbd device and proceed to use it in the VM.

```bash
sudo qemu-nbd -d /dev/nbd0
```

---

# Creating the Virtual Machine

It's finally time to create the virtual machine.
We need to start the Libvirt service, and a bridge network to connect the VM to the host.

```bash
# start the libvirt system service
sudo systemctl start libvirtd
# check if it is running correctly
sudo systemctl status libvirtd

# create a default bridge network
sudo virsh net-start default
# make it start automatically
sudo virsh net-autostart default #optional, but recommended
```

If you want the libvirtd service to start automatically at boot, you can use the `enable` command too.
It is not something I do, because I can always start it manually when I need it.
This way I dont incur the risk of having VMs running when I dont need them.

```bash
sudo systemctl enable libvirtd # optional
```

The only persistent configuration we need to create a VM is the disk image.
From now on, we can create and destroy the VM as many times as we want, and it will always start with the same disk image.
But to make it easy to manage, we can write a script to create the VM with the necessary parameters.

There are a few differences between the commands for the amd64 and arm64 architectures.
I will show both commands here, and explain the differences.

## A script to create the VM

<!-- The first script will create the VM and run it with the original kernel and initrd files (the two files we got with `virt-copy-out`). -->
This create is nothing more than a 
Instead of running a script every time
I will keep them and this script in my environment folder, so I can use them to create the VM again if I need to.

> ⚠️ **Attention**: Some parameters might need to be changed to fit your environment.

- The VM_DIR variable needs to point to your workdir folder.
- Shortcuts like `$HOME` or `~` wont work because we will execute this script with the root user.
- The `--disk` parameter should point to the disk image you created or resized.
- If your network is different from `virbr0`, you should change the `--network` parameter to match your network.
- If you **decide to set boot parameters** with the `--boot` option, add the root partition as well: `root=/dev/sda1`, and this should also match the root partition you got from the `virt-filesystems` command. I have examples latter in this post. 

I created this as a bash script called `create_vm_amd64.sh`.
It stands for "create original kernel amd64", and it should be clear what it does when I look at it again in the future.
Also note that we refer to the architecture here as x86_64 instead of amd64.
This is also the name of the architecture in the kernel source code.

```bash
#!/bin/sh
if [[ $EUID -ne 0 ]]; then
    echo "This must be run as root"
    exit 1
fi

# this should point to your project path
VM_DIR=/home/auyer/kernel-dev/amd64

virt-install \
    --name "linux-amd64" \
    --memory 1024 \
    --arch x86_64 \
    --osinfo detect=on,require=off \
    --check path_in_use=off \
    --features acpi=off \
    --graphics none \
    --network bridge:virbr0 \
    --import \
    --disk path=$VM_DIR/linux-amd64.qcow2
```


- the root device is different from the one we found in the `virt-filesystems` command. It must be referred here as `vdaX` where X is the same id. Ex: `/dev/sda1` -> `/dev/vda1`
- the architecture is different (arm64) here is referred as `aarch64`
- the console device (last line) is different (ttyAMA0 instead of tty0 and ttyS0)

Save this as `create_vm_arm64.sh`:

```bash
#!/bin/sh
if [[ $EUID -ne 0 ]]; then
    echo "This must be run as root"
    exit 1
fi

# this should point to your project path
VM_DIR=/home/auyer/kernel-dev/arm64

virt-install \
    --name "linux-arm64" \
    --memory 1024 \
    --arch aarch64 \
    --osinfo detect=on,require=off \
    --check path_in_use=off \
    --features acpi=off \
    --graphics none \
    --network bridge:virbr0 \
    --import \
    --disk path=$VM_DIR/linux-arm64.qcow2
```

## Starting the VM

From this part on, the steps are the same for both architectures again.
With the script from the previous session saved, we can execute this with:

```bash
sudo bash create_vm_$ARCH.sh
```

You can also make it executable by itself (no need to call `bash ./script...`).

```bash
chmod +x create_vm_$ARCH.sh`
# and then run it with
sudo ./create_vm_$ARCH.sh
```

If everything goes well, you should see the VM starting in the terminal.
You can log in to the vm with the `root` user (no password required).
If you get stuck, or need to stop the VM, you can use the `virsh` command to manage it.
Check the [Useful Commands For Managing Virsh VM](#useful-commands-for-managing-virsh-vm) section for a quick reference.

> ⚠️ **Possible error**. When starting the VM, it is possible to get an error message with permission denied for the disk image.

The solution I chose was to set **myself** the user for QEMU processes run by the system instance.
This can be done It can be done editing the `user` and `group` parameters in the `/etc/libvirt/qemu.conf` file.
I found this solution on [a github issue](https://github.com/jedi4ever/veewee/issues/996#issuecomment-536519623).

```bash
# /etc/libvirt/qemu.conf
...
user = "auyer"
group = "auyer"
```

After changing the file, you need to restart the libvirtd service.

```bash
sudo systemctl restart libvirtd
```

## Enabling SSH in the VM (Recommended)

If you want to access the VM with SSH, we need to enable it and change some configs.
The first step is to configure the `openssh-server` package in the VM.
It comes installed by default in the Debian Cloud Image, but it lacks host keys to work properly.

We will run two commands inside the VM.
The first might ask you to

```bash
# inside the VM
# configure and generate host keys
dpkg-reconfigure openssh-server
```

> ⚠️ **Attention**: The `dpkg-reconfigure` command might ask you to deal with conflicting configurations.
> "What do you want to do about modified configuration file sshd_config?"
> I recommend choosing **install the package maintainer's version**

Now, there are two ways the sshd server can be configured:

1. allow (empty) password logins for the root user: simple, but less secure. It is ok for a local VM.
2. allow only key-based logins, adding your key to the VM. This is more secure, but requires more steps.

### Option 1: Allow empty password logins for the root user

Inside the VM, edit the `/etc/ssh/sshd_config` file, and set the following parameters (they are commented by default):

```
PermitRootLogin yes
PasswordAuthentication yes
PermitEmptyPasswords yes
```

### Option 2: Allow only key-based logins

Inside the VM, edit the `/etc/ssh/sshd_config` file, and set the following parameter (commented by default):

```
PermitRootLogin yes
```

Shutdown the VM by running `'shutdown now` inside of it.
Refer to the [Useful Commands For Managing Virsh VM](#useful-commands-for-managing-virsh-vm) section if the shutdown process hangs.

If you have a private/public key pair, skip this command and use it in the next step.
If you don't, we can generate a new key pair with the `ssh-keygen` command.
A very complete guide is available [in GitHub docs](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent).
But here is the short version:

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

Use your public key (or the one you generated) to inject it into the VM.

```bash
sudo virt-sysprep -a ./$ARCH/linux-$ARCH.qcow2 --ssh-inject root:file:/home/$USER/.ssh/<your_key>.pub
```

Restart the VM and check if the sshd server is running.

```bash
sudo virsh start --console linux-$ARCH
```

## Starting the SSH server and connecting to it

```bash
# inside the VM
# start and enable the sshd server, so it starts at boot
systemctl enable --now sshd.service
```

If it fails, here a few thing to try:

```bash
# run dpkg-reconfigure again, this time choosing to keep your settings
dpkg-reconfigure openssh-server
# reload systemd configuration and restart sshd
systemctl daemon-reload
systemctl restart sshd.service
# also the good old system reboot (in the VM)
reboot
```

Outise of the VM, you can check the IP address of the VM with the `virsh` command.
It should be the same result as running `ip a` inside the VM.

```bash
# check the IP address in the dhcp leases for the default network
sudo virsh net-dhcp-leases default
```

Now you should be able to connect to the VM with the `ssh` command.

```bash
ssh root@192.168.122.178
# or if you have an ssh key that is not added to your ssh-agent
ssh -i ~/.ssh/your_key root@192.168.122.178
```

---

# Accessing the Kernel Source Code

The next step is to get the kernel source code.
If you are used to the GitHub/GitLab/BitBucket experience, this is going to be a bit different.
In these sites, it is common to have a single **repository** for a project.
Inside contributors create **branches** in the same repository, and merge these changes to the main branch with pull requests.
Outside contributors **fork** the repository, make changes in their fork, and create pull requests to the main repository.

For the Linux Kernel, the process is a bit different.
The codebase is so large and complex, that there are multiple levels of maintainers, that create a chain of trust.
There are several repositories (also known as trees) for different subsystems.
Each tree might have different branches, depending on the development stage.
Developers will usually clone a tree for a specific subsystem, and send patches to the maintainer of that tree.
The maintainers review the patches, and if they are good, they are merged into the their repository.
Thee patches eventually make their way to the mainline tree, where Linus Torvalds will review them and merge them into what will be the next release.
I will not cover how these patches are sent and reviewed in this post, but I will show how to get the source code and build it.

I chose to clone two trees. The Torvalds (mainline), and the BPF tree (where the BPF subsystem is developed).
Both repositories are hosted at [git.kernel.org](https://git.kernel.org/), where you can find most trees, like the stable tree, the linux-next tree and many others.

The next command will clone the kernel source code into the `linux` folder.
It might take a while, because the kernel source code is quite large.

```bash
git clone git://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git
cd linux
```

You can clone only the last commit of the repository with the `--depth 1` option.
But I dont do it, because it is useful to have the full history of the code.
For instance, you can use the `git blame <file>` command to see who wrote a specific line of code, and when it was written.
Or what I usually do, use the `git log <file>` command to see the history of a specific file.
It helps me to understand what was changed, and why.

> ⚠️ **Attention**: In the previous steps I used a variable `ARCH` to store the architecture name and make it easy to reuse the commands for both architectures.
> But when building the kernel, the arch name for amd64 is `x86_64`, and for arm64 is `arm64`.
> If going back to the previous steps, you should replace the `ARCH` variable with the correct arch name.

```bash
export ARCH=x86_64 # or export ARCH=arm64
# generates the default configuration for the Kernel and ARCH provided
make defconfig
# keeps onptions set in .config, and set the new options to their recommended values
# if you dont run this, it will ask you for every new/unset option
make olddefconfig
```

## Kernel Modules

The Linux Kernel has a lot of parts that can bebuilt as removable parts, called modules.
I have an analogy I used to better explain this in class.
If you consider a Laptop is a single piece of hardware, it can have a WebCam as a pre-built part, or it can be an external module that you can plug in or remove.
The same goes for the Kernel.
There are features you can chose to build as parte of the Kernel, or as modules, or not build at all.

The VM we downloaded probably does depends on only a few modules.
To have a Kernel working for it, we could build all kernel modules, but it would take a long time.
Instead, we will read what modules your VM needs, and build only those.
You can also toggle them on and off in the kernel configuration menu with `make menuconfig`.

Get the current IP address of the VM with the `virsh` command, and run this `lsmod` command over ssh.
The result will be written to your current folder in your host machine.

> ⚠️ **Attention**: The `lsmod` command has to be run inside the VM.

> ⚠️ **Attention**: The `make LSMOD=...` command might ask you to set extra/new parameters for the modules you are building.
> You are most like going to be fine by pressing enter and using the default values.
> If it fails, you might need to search for the root cause of the error message elsewhere.

```bash
ssh root@192.168.122.178 lsmod > modules_list
# and this will configure the kernel to build only the modules you need
make LSMOD=./modules_list localmodconfig
```

The next step will build the kernel with all available cores.
This will speed up the process a lot, but it will also consume a lot of resources.
If you are using a resource limited machine, you can use the `-j` parameter with a lower number.

> ⚠️ **Attention**: If you are building the Kernel for the first time, you might need to get extra dependencies.
> I put the ones I needed in the Appendix, but if your system is different, you might need to search for them.
> Trying to compile, and googling the error if it fails is a good strategy.

> ⚠️ **Attention**: The next command might ask you to set parameters for the modules you are building.
> You are most like going to be fine by pressing enter and using the default values.

For amd64 (if your host is amd64):

```bash
make -j$(nproc) modules bzImage
```

For arm64 (if your host is amd64):

```bash
make -j$(nproc) ARCH=arm64 CROSS_COMPILE=aarch64-linux-gnu- modules Image.gz
```

## Installing the Kernel and Modules

At this point, we have a compiled kernel and modules.
For the VM to use them, we need to either put them inside the VM (using SSH, or mounting the disk image), or configure the VM to boot from the new kernel by passing it to libvirt.
I will show a few methods, but some of them are not complete. 
In these cases, you can combine them to deploy the both the Kernel and its modules.

### Method 1 (Modules + Kernel): using the kworkflow tool

The kworkflow tool is a tool that helps you streamline the process of building and testing the kernel.
This is the easiest way to install everything to the VM.
Its features help with Kernel development in various ways (and I will mention some later). 

To install it, check [kworkflow.org](https://kworkflow.org) for instructions.
Assuming you have it installed, you can configure it to deploy the  
```bash
# inside the linux folder, create kw local configuration
kw init
```

Add the VM as a remote target using its IP address.
```bash
kw remote --add amd64-vm root@192.168.122.163:22
kw remote --set-default=amd64-vm
```

Now you can deploy both the Kernel and modules to the VM with the `kw deploy` command.
```bash
kw deploy
```
This works for most target Linux Distros, and also works for real machines.
But in the rare case the VM does not use the Kernel you built after you reboot it, you will need to check the documentation for the Distro it uses.
Or if it is a VM, you can pass the Kernel and initrd files using the techniques I will show next.

### Option 2 (Modules): mounting the disk image into a local folder

This section requires the VM to be offline.
```bash
sudo virsh shutdown linux-$ARCH # or destroy, if it hangs
```

If you prefer not to use the virtual network to send the files, you can mount the disk image to a local folder and copy the files.
These commands are run from the linux folder, and the VM needs to be offline to use the disk features.
```bash
# mount the ROOT partition of the image, to the mountpoint folder (created in the first section)
guestmount -w -a ../$ARCH/linux-$ARCH.qcow2 -m /dev/sda1 ../$ARCH/mountpoint
# run the modules_install command pointing to the mounted folder
make INSTALL_MOD_PATH=../$ARCH/mountpoint modules_install
# unmount the disk image, so we can install the kernel
guestunmount ../$ARCH/mountpoint

# mount the BOOT partition of the image, to the mountpoint folder
guestmount -w -a ../$ARCH/linux-$ARCH.qcow2 -m /dev/sda2 ../$ARCH/mountpoint
make INSTALL_PATH=../$ARCH/mount install
guestunmount ../$ARCH/mountpoint

```


### Method 3 (Modules): sending modules over SSH

We can leverage the ssh we configured to send the modules to the VM without needing to stop it.
You can do it with `rsync` or the older `scp` protocol.
`rsync` is a lot faster. It can detect existing files and send an incremental update.
But it requires the `rsync` command to be installed in the VM.
You can install it with `apt-get install rsync`.

```bash
# inside the vm
apt update && apt install rsync
```

Now install the modules to the local `$ARCH/mountpoint` folder we created.

```bash
# in your host
make INSTALL_MOD_PATH=../$ARCH/mountpoint modules_install
# rsync with recursive, compress and Progress reporting options
rsync -rzP ./arm64/mountpoint/lib/modules/ root@192.168.122.25:/lib/modules/
```

You can probably also send the Kernel this way, but I have not tested it.
You would need to update the configs in the VM to boot the new Kernel.

> ⚠️ **Attention**: The modules_install command may install it to your host **if you leave the `INSTALL_MOD_PATH` variable empty**.`

### Method 4 (Kernel): overwriting the Kernel with libvirt

If you had problems with the above, you may force the VM to boot with a specific kernel adding the boot option in the script and recreate it.

```bash
# copy the original script to a new one
cp create_vm_$ARCH.sh create_built_kernel_$ARCH.sh
# copy the kernel to the boot folder (created in the first section)
cp arch/x86/boot/bzImage ../$ARCH/boot
#or
cp arch/arm/boot/Image.gz ../$ARCH/boot
```

There is only one thing to change in the script.
We need to point to the output files of the kernel compilation.
That is the `kernel` parameter in the `--boot` option.

Here are the diffs for the two files, showing the changes I made to the `--boot` option.
The first line is the original file, and the second line is the new file.
If you are using a different folder structure, that should be adapted too.

Before running this script, we need to make sure the VM is off, and remove it from the list of configured VMs (so we can re-create it).
The `undefine` command will remove the VM from the list of configured VMs.
But since all the files are still there, we can recreate it with the same name.
The IP address can change, however, so we need to check it again.
```bash
# attempt the shutdown
sudo virsh shutdown linux-$ARCH
# check if it is no longer running.
# If it is, force it to shutdown using `destroy` instead
sudo virsh list --all
# remove the VM from the list
sudo virsh undefine linux-$ARCH
```

> ⚠️ **Attention**: You will also need the initrd file to boot the VM.
> Jump to the [#restoring-the-original-kernel](#restoring-the-original-kernel) section to learn how to do it, and come back here.

Add this line to the last line of your script:

AMD64:

```bash
--boot kernel=$BOOT_DIR/bzImage,initrd=$BOOT_DIR/initrd.img-6.1.0-18-amd64,kernel_args="console=tty0 console=ttyS0 loglevel=8 root=/dev/sda1 rootwait"
```

ARM64:
```bash
--boot kernel=$BOOT_DIR/Image.gz,initrd=$BOOT_DIR/initrd.img-6.1.0-18-arm64,kernel_args="console=ttyAMA0 loglevel=8 root=/dev/vda1 rootwait"
```

## Checking the new Kernel and Modules in the VM
Now we can run the new script to create the VM with the new kernel and modules.

```bash
## Inside the VM:
# check the version running
cat /proc/version

➜
Linux version 6.9.0-rc3-dirty (auyer@darkforce) 
    (gcc (GCC) 13.2.1 20230801, GNU ld (GNU Binutils) 2.42.0) 
    #1 SMP PREEMPT_DYNAMIC Mon Apr  8 22:33:15 -03 2024

```

```bash
## also check the Modules
ls /lib/modules

➜
6.1.0-18-amd64          
6.9.0-rc3-dirty
```

Great !
Now we have a VM running with the kernel and modules we just compiled.
The basic development loop is ready to take place:

1. make changes to the kernel source code
2. compile the kernel and modules
3. install the modules in the VM
4. run the VM and test the changes

## Restoring the original Kernel 

If your VM no longer boots, we can read the original kernel and initrd files from the disk image, and tell libvirtd to use them in the next boot.
With the next command, we are listing the files in the boot directory of the image.
<!-- We are looking for the kernel and initrd files, so we can copy them to the host and use them in the VM we are going to . -->
The file name will be different depending on the kernel version and architecture, but it will be similar to `vmlinuz-6.1.0-18-amd64` and `initrd.img-6.1.0-18-amd64`.

> ⚠️ **Attention**: Depending on the method used to expand the disk, your root partition might have a different name.
> In my case, the partition is named `/dev/sda1`, but I've seen it be renamed to `/dev/sda2` and `/dev/sda3` by the `virt-resize` method.
> Use the `virt-filesystems` command to check the name of the root partition, and use it in the following commands.

```bash
virt-ls -a ./$ARCH/linux-$ARCH.qcow2 -m /dev/sda1 /boot/

➜
System.map-6.1.0-18-amd64
config-6.1.0-18-amd64
efi
grub
initrd.img-6.1.0-18-amd64
vmlinuz-6.1.0-18-amd64
```

Now that we know the file names, we can copy them to the host.
Sadly we can not use wildcards here to copy all files at once, so we will have to copy them one by one, and with the exact path.
Replace the file names with the ones you got from the previous command.

```bash
virt-copy-out -a ./$ARCH/linux-$ARCH.qcow2 /boot/initrd.img-6.1.0-18-$ARCH ./$ARCH/boot
virt-copy-out -a ./$ARCH/linux-$ARCH.qcow2 /boot/vmlinuz-6.1.0-18-$ARCH ./$ARCH/boot
```

With these files copied to the host, we can create a new script to re-create the VM using these files, or edit the vm configuration file.

In case you decide to recreate using the script, add this section to the last line of the script created when starting the VM for the first time.

AMD64:
```bash
--boot kernel=$BOOT_DIR/vmlinuz-6.1.0-18-arm64,initrd=$BOOT_DIR/initrd.img-6.1.0-18-arm64,kernel_args="console=tty0 console=ttyS0 root=/dev/sda1 rootwait"
```
ARM64: 
```bash
--boot kernel=$BOOT_DIR/vmlinuz-6.1.0-18-arm64,initrd=$BOOT_DIR/initrd.img-6.1.0-18-arm64,kernel_args="console=ttyAMA0 root=/dev/sda1 rootwait"
```

If you decide to edit the existing VM:
Run the virsh edit command, choosing the editor you prefer.
```bash
sudo EDITOR=nvim virsh edit linux-amd64
```

Look for a line that starts with `<os>`, and add the following lines inside the `<os>` tag (keeping other tags intact).
You need to put the path that matches your environment. Note that Libvirt requires the full path here. 
```xml
<kernel>/home/auyer/kernel-dev/amd64/boot/vmlinuz-6.1.0-18-amd64</kernel>
<initrd>/home/auyer/kernel-dev/amd64/boot/initrd.img-6.1.0-18-amd64</initrd>
```

---

# Setting up Clangd LSP

One common tool for development is the Language Server Protocol (LSP).
It is an editor-agnostic protocol that allows the integration of language-specific features into your code editor.
It makes it possible to have features like "in-place errors and warning reporting", "code completion", "go to definition" and "find references" in your editor.

For the C language programs, like the Linux Kernel, the most common LSP is the Clangd LSP.

First thing we need to do is to install the Clangd tool.
This is easy, but very different from one editor to another, and I will not include this step in this tutorial.

For the LSP to work, we need to generate the `compile_commands.json` file, and generate a first compilation result.
This file is used by the LSP to understand the structure and compilation flags used in the project.
There is a Python script in the kernel source code that does it for us.

```bash
# inside the kernel source code folder
# build the entire kernel to get the initial build results and artifacts
make -j$(nproc)
# generate the compile_commands.json file
scripts/clang-tools/gen_compile_commands.py
```

Let's check if the file was generated correctly.
The output should be a list of compilation commands, with the directory and file being compiled.

```bash
# check if the file was generated successfully
head compile_commands.json

➜
[
  {
    "command": "gcc -Wp,-MMD,./..vmlinux.export.o.d ... -D__KBUILD_MODNAME=kmod_.vmlinux.export -c -o .vmlinux.export.o .vmlinux.export.c",
    "directory": "/home/auyer/kernel-dev/linux",
    "file": "/home/auyer/kernel-dev/linux/.vmlinux.export.c"
  },
...
```

By default, the kernel is built with GCC.
Although I have not experienced any problems with this, I've seen reports of problems when not also compiling with Clang.
If you want to compile the kernel with Clang, you can use the following commands:

```bash
make CC=clang defconfig
make CC=clang -j$(nproc)
# generate the compile_commands.json file with the clangd compiler
scripts/clang-tools/gen_compile_commands.py
```

If the previous step worked, code formatting should also work with Clangd.
This makes it easier to adhere to the kernel coding style.
But it is not perfect, and you might need to adjust some things manually.
Always keep in mind that the Kernel offers some tools to check for coding style, and you can use them to check your code.

```bash
# check the coding style of the files
scripts/checkpatch.pl kernel/bpf/arena.c

➜
total: 0 errors, 0 warnings, 590 lines checked

kernel/bpf/arena.c has no obvious style problems and is ready for submission.
```
Using the auto-format feature of Clangd, you can cause changes that are not actually better or easier to read.

# Conclusion

This was more of a guide than an article.
My goal was to document all steps I took to build the Linux Kernel and set up a development environment.
I hope it can be useful to someone else, and I know it can be useful to me in the future (I will forget some things, and come back here too).

One thing that I usually do, that helps me a lot, is to not just follow a guide, but to also change things in the way to make it my own.
It is usually doing this that I get thing wrong, and also where I learn the most.

Thanks!

---

# Appendix

## Useful Commands For Managing Virsh VM

```bash
# list all VMs
sudo virsh list --all
# start the VM
sudo virsh start linux-amd64
# pause the VM
sudo virsh suspend linux-amd64
# shutdown the VM
sudo virsh shutdown linux-amd64
# force shutdown the VM (if it gets stuck)
sudo virsh destroy linux-amd64
# delete the VM (but not the disk, you can re-create with the same disk as before)
sudo virsh undefine linux-amd64
```

## List of Packages I needed to install

I use Arch linux, and these packages only fit Arch and its derivatives.
For the VM:

```bash
sudo pacman -S guestfs-tools \
                virt-manager \
                qemu-base \
                qemu-system-arm \
                qemu-system-aarch64 \
                qemu-system-arm-firmware \
                dnsmasq
```

For compiling the Linux Kernel:

Or using the dependencies specified in the [Linux PKGBUILD](https://gitlab.archlinux.org/archlinux/packaging/packages/linux/-/blob/main/PKGBUILD):

```bash
pacman -S base-devel \
  make \
  bc \
  cpio \
  gettext \
  libelf \
  pahole \
  perl \
  python \
  tar \
  xz
```

For cross compilation:

```bash
pacman -S aarch64-linux-gnu-gcc bc
```

---

# References

1. FLUSP Build the Linux kernel for ARM [flusp.ime.usp.br/kernel/build-linux-for-arm](https://flusp.ime.usp.br/kernel/build-linux-for-arm/)
2. FLUSP Kernel Compilation and Installation [flusp.ime.usp.br/kernel/Kernel-compilation-and-installation](https://flusp.ime.usp.br/kernel/Kernel-compilation-and-installation/)
3. FLUSP Use QEMU to Play with Linux Kernel [flusp.ime.usp.br/kernel/use-qemu-to-play-with-linux](https://flusp.ime.usp.br/kernel/use-qemu-to-play-with-linux/)
4. KernelNewbies Kernel Build [kernelnewbies.org/KernelBuild](https://kernelnewbies.org/KernelBuild)
5. The Linux Kernel documentation [docs.kernel.org](https://docs.kernel.org/)
6. Write and Submit your first Linux kernel Patch, Greg Kroah-Hartman [YouTube.com](https://www.youtube.com/watch?v=LLBrBBImJt4)
7. Linux Kernel Development, Greg Kroah-Hartman [YouTube.com](https://www.youtube.com/watch?v=vyenmLqJQjs)
7. Kernel/Upgrade - Gentoo wiki [wiki.gentoo.org](https://wiki.gentoo.org/wiki/Kernel/Upgrade/en#Adjusting_the_.config_file_for_the_new_kernel)
