---
title: DRAFT -  A Solid Environment For Building And Developing The Linux Kernel
date: 2024-03-20
---

## Introduction

In my last post ["Compiling and Debugging a Kernel - Xv6 for the RISC-V Architecture"](https://rcpassos.me/post/compiling-debugging-riscv-xv6-kernel), I talked about my sudies on Kernel Development.
After finishing the MIT course [6.S081 Operating System Engineering](https://learncs.me/mit/6.s081) (available online), I decided it was time to learn how to build the Linux Kernel, and hopefully contribute to it.
I joined a free software group ([FLUSP](https://flusp.ime.usp.br)) at the University of São Paulo (USP), and started taking a course on Linux Kernel Development.

In this post, I will cover the setup of the environment for building and contributing to the Linux Kernel.
It was largely inspired by the guides provided by the FLUSP community, and my experience with them.
<!-- also [Linux Kernel Newbies](https://kernelnewbies.org/KernelBuild) website. -->
What we will cover:
- Creating a Virtual Machine using a Debian Cloud Image
- Enabling SSH to access the virtual machine
- Installing the necessary packages for building the kernel
- Downloading the kernel source code
- Building the kernel
- Booting the kernel in the virtual machine
- Setting up the Clangd LSP for a better experience navigating the source code


# Preparing a Virtual Machine Disk and Files

The first step in my environment setup was to create a virtual machine to build the kernel.
The reasoning here is that I can have an intalation target to test the kernel I am building, and not disrupt any machine I use for other purpuses.
This will also make it easier to backup the environment and roll back to a previous state if something goes wrong.

I use Arch Linux as my main OS, so I will use it as the host for the virtual machine. 
The packages I list here are for arch linux, but you can use the package manager of your choice to install the equivalent packages for your OS.

## My folder setup for this project

To make it easier for anyone following this setup, here is, this is the folder structure I used in this project.
You may adapt it to your liking, but I will use these paths in the commands I will show.
All folders will be created here with these two `mkdir` commands.

```bash
$ mkdir -p ~/kernel-dev/amd64/boot
$ mkdir -p ~/kernel-dev/arm64/boot

$ cd ~/kernel-dev
$ tree
$ tree
.
├── amd64
│   ├── boot
│   │   ├── initrd.img-6.1.0-18-amd64
│   │   └── vmlinuz-6.1.0-18-amd64
│   └── linux-amd64.qcow2
├── arm64
│   ├── boot
│   │   ├── initrd.img-6.1.0-18-arm64
│   │   └── vmlinuz-6.1.0-18-arm64
│   └── linux-arm64.qcow2
├── debian-12-nocloud-amd64-daily.qcow2
└── debian-12-nocloud-arm64-daily.qcow2
```

## Downloading a Ready to Use Debian Image
The Debian Cloud Team provides daily built images that a ready to use, no installation step required: [Debian Official Cloud Images](https://cloud.debian.org/images/cloud/).
There are a few variations, and the "nocloud" variant is a perfect fit for this use case.
It is a minimal image that requires no configuration to use. 
It allows root login without a password, and it is perfect for quick testing and development.

I will create two VMs.
The first one will be for the x86_64 architecture, and the second one will be for the arm64 architecture.
The daily built images can be found at [cdimage.debian.org](http://cdimage.debian.org/cdimage/cloud/bookworm/daily/latest/).

Downloading the base images in qcow2 format (a format that is easy to work with in QEMU and Libvirt):
```bash
$ cd ~/kernel-dev

$ wget http://cdimage.debian.org/cdimage/cloud/bookworm/daily/latest/debian-12-nocloud-amd64-daily.qcow2 # amd64
$ wget http://cdimage.debian.org/cdimage/cloud/bookworm/daily/latest/debian-12-nocloud-arm64-daily.qcow2 # arm64
```

If we peek into these files, we can see the partitions inside.
```bash
$ virt-filesystems --long -a ./debian-12-nocloud-amd64-daily.qcow2 
Name        Type        VFS   Label  Size        Parent
/dev/sda1   filesystem  ext4  -      1941159936  -
/dev/sda15  filesystem  vfat  -      129718272   -

$ virt-filesystems --long -a ./debian-12-nocloud-arm64-daily.qcow2
Name        Type        VFS   Label  Size        Parent
/dev/sda1   filesystem  ext4  -      1941159936  -
/dev/sda15  filesystem  vfat  -      132872192   -
```


From here, most steps will be identical for both architectures (besides the arch name in files).
I will use a variable to store the architecture name, and use it in the commands.
When there are differences, I will note them.


## Resizing the Disk Image with virt-resize (Option 1)
The base files we downloaded are almost ready to use, if not for one thing: they have almost no free space available.
We will need to resize the disk to have enough space to have a usable system.
This command will create a new qcow2 file with 4GB of space, and copy the contents of the original file to it, while also making the root partition larger.
In this case, the root partition is the first one, and it is named `/dev/sda1`, with `ext4` filesystem.


```bash
$ export ARCH=amd64
$ qemu-img create -f qcow2 -o preallocation=metadata ./$ARCH/linux-$ARCH.qcow2 4G

$ virt-resize --expand /dev/sda1 debian-12-nocloud-$ARCH-daily.qcow2 ./$ARCH/linux-$ARCH.qcow2
```

If this step is successful, we can proceed to the next step [Reading files from the VM Disk image](#reading-files-from-the-vm-disk-image). 
#TODO check if link worked

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

```bash
# copy the base image to the new file location
$ cp debian-12-nocloud-$ARCH-daily.qcow2 ./$ARCH/linux-$ARCH.qcow2
# resize the image 
$ qemu-img resize ./$ARCH/linux-$ARCH.qcow2 +2G
```

This will add 2GB to the image, but it will not resize the partition. 
We can check that with the `virt-filesystems` command:
```bash
$ virt-filesystems -h --long --all -a ./$ARCH/linux-$ARCH.qcow2
Name        Type        VFS      Label  MBR  Size  Parent
/dev/sda1   filesystem  ext4     -      -    1,8G  -
/dev/sda14  filesystem  unknown  -      -    3,0M  -
/dev/sda15  filesystem  vfat     -      -    124M  -
/dev/sda1   partition   -        -      -    1,9G  /dev/sda
/dev/sda14  partition   -        -      -    3,0M  /dev/sda
/dev/sda15  partition   -        -      -    124M  /dev/sda
/dev/sda    device      -        -      -    4,0G  -
```

We can see that the root partition is still 1.8GB.
To resize it, we are going to mount this image as a device using the `nbd` kernel module.

```bash
# enable the nbd module
$ sudo modprobe nbd
# mount the image as a device to /dev/nbd0
$ sudo qemu-nbd -c /dev/nbd0 ./$ARCH/linux-$ARCH.qcow2
```

To check if it worked, we can use the `lsblk` command.
The output should show the partitions in the image, and should be equivalent to the output of the `virt-filesystems` command we used before:
```bash
$ lsblk /dev/nbd0
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
$ sudo parted /dev/nbd0

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
$ lsblk /dev/nbd0
NAME      MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS
nbd0       43:0    0    4G  0 disk
├─nbd0p1   43:1    0  3,9G  0 part
├─nbd0p14 259:6    0    3M  0 part
└─nbd0p15 259:7    0  124M  0 part
```

Now we can disconnect the image from the nbd device and proceed to use it in the VM.
```bash
$ sudo qemu-nbd -d /dev/nbd0
```

## Reading files from the VM Disk image

At this point, we have a Disk Image (the qcow2 file) with a root partition that is large enough to use for testing the kernel and its modules.
With the next command, we are listing the files in the boot directory of the image.
We are looking for the kernel and initrd files, so we can copy them to the host and use them in the VM we are going to create.
The file name will be different depending on the kernel version and architecture, but it will be similar to `vmlinuz-6.1.0-18-amd64` and `initrd.img-6.1.0-18-amd64`.

> ⚠️ **Attention** Depending on the method used to expand the disk, your root partition might have a different name.
> In my case, the partition is named `/dev/sda1`, but I've seen it be renamed to `/dev/sda2` and `/dev/sda3` by the `virt-resize` method.
> Use the `virt-filesystems` command to check the name of the root partition, and use it in the following commands.

```bash
$ virt-ls -a ./$ARCH/linux-$ARCH.qcow2 -m /dev/sda1 /boot/
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

``` bash
$ virt-copy-out -a ./$ARCH/linux-$ARCH.qcow2 /boot/initrd.img-6.1.0-18-$ARCH ./$ARCH/boot
$ virt-copy-out -a ./$ARCH/linux-$ARCH.qcow2 /boot/vmlinuz-6.1.0-18-$ARCH ./$ARCH/boot
```

# Creating the Virtual Machine

It's finally time to create the virtual machine.
We need to start the Libvirt service, and a bridge network to connect the VM to the host.

```bash
# start the libvirt system service
$ sudo systemctl start libvirtd
# check if it is running correctly
$ sudo systemctl status libvirtd

# create a default bridge network
$ sudo virsh net-start default
# make it start automatically
$ sudo virsh net-autostart default #optional, but recommended
```

If you want the libvirtd service to start automatically at boot, you can use the `enable` command too.
It is not something I do, because I can always start it manually when I need it. 
This way I dont incur the risk of having VMs running when I dont need them.

```bash
$ sudo systemctl enable libvirtd # optional
```


## Creating the VM

The only persistent configuration we need to create a VM is the disk image.
From now on, we can create and destroy the VM as many times as we want, and it will always start with the same disk image.
But to make it easy to manage, we can write a script to create the VM with the necessary parameters.

There are a few differences between the commands for the amd64 and arm64 architectures.
I will show both commands here, and explain the differences.

### A script to create the VM

The first script will create the VM and run it with the original kernel and initrd files (the two files we got with `virt-copy-out`).
I will keep them and this script in my environment folder, so I can use them to create the VM again if I need to.

> ⚠️ **Attention**. Some parameters might need to be changed to fit your environment.

- The VM_DIR variable needs to point to your workdir folder. 
- Shortcuts like `$HOME` or `~` wont work because we will execute this script with the root user.
- The last line contains the path to the kernel and initrd files. These should match the files you got from the `virt-copy-out` command.
- The same line also contains the root partition `root=/dev/sda1`, and this should also match the root partition you got from the `virt-filesystems` command.
- The `--disk` parameter should point to the disk image you created or resized.
- If your network is different from `virbr0`, you should change the `--network` parameter to match your network.

#### amd64

I created this as a bash script called `create_og_kernel_amd64.sh`. 
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
VM_DIR=/home/code/kernel-dev/amd64
BOOT_DIR=$VM_DIR/boot

virt-install \
    --name "linux-amd64" \
    --memory 1024 \
    --arch x86_64 \
    --osinfo detect=on,require=off \
    --check path_in_use=off \
    --features acpi=off \
    --import \
    --graphics none \
    --network bridge:virbr0 \
    --disk path=$VM_DIR/linux-amd64.qcow2 \
    --boot kernel=$BOOT_DIR/vmlinuz-6.1.0-18-amd64,initrd=$BOOT_DIR/initrd.img-6.1.0-18-amd64,kernel_args="console=tty0 console=ttyS0 loglevel=8 root=/dev/sda1 rootwait"
```

#### arm64

Most things are the same as the previous script.
What changed:
- the root device is different from the one we found in the `virt-filesystems` command. It must be referred here as `vdaX` where X is the same id. Ex: `/dev/sda1` -> `/dev/vda1` 
- the architecture is different (arm64) here is referred as `aarch64`
- the console device (last line) is different (ttyAMA0 instead of tty0 and ttyS0)

Save this as `create_og_kernel_arm64.sh`:
```bash
#!/bin/sh
if [[ $EUID -ne 0 ]]; then
    echo "This must be run as root"
    exit 1
fi

# this should point to your project path 
VM_DIR=/home/auyer/code/kernel-dev/arm64
BOOT_DIR=$VM_DIR/boot

virt-install \
    --name "linux-arm64" \
    --memory 1024 \
    --arch aarch64 \
    --osinfo detect=on,require=off \
    --check path_in_use=off \
    --features acpi=off \
    --graphics none \
    --import \
    --network bridge:virbr0 \
    --disk path=$VM_DIR/linux-arm64.qcow2 \
    --boot kernel=$BOOT_DIR/vmlinuz-6.1.0-18-arm64,initrd=$BOOT_DIR/initrd.img-6.1.0-18-arm64,kernel_args="console=ttyAMA0 loglevel=8 root=/dev/vda1 rootwait"
```


### Starting the VM

From this part on, the steps are the same for both architectures again.
With the script from the previous session saved, we can execute this with:

```bash
$ sudo bash create_og_kernel_$ARCH.sh
```
You can also make it executable by itself (no need to call `bash script`). 
```bash
$ chmod +x create_og_kernel_$ARCH.sh`
# and then run it with 
$ sudo ./create_og_kernel_$ARCH.sh
```

If everything goes well, you should see the VM starting in the terminal.
You can log in to the vm with the `root` user (no password required).
If you get stuck, or need to stop the VM, you can use the `virsh` command to manage it. 
Check the [Useful Commands For Managing Virsh VM](#useful-commands-for-managing-virsh-vm) section for a quick reference.

```bash

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
$ sudo systemctl restart libvirtd
```

### Enabling SSH to access the VM (Optional)

# TODO

```bash
sudo virsh net-dhcp-leases default
```


The first time we start a VM, we get a virtual console to interact with it.
But when just restarting it with virsh, we can just connect to it with SSH. 
```
sudo virsh net-dhcp-leases default
```

# Getting the Kernel Source Code
TODO explain git threes


```bash
git clone git://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git 
```

```
ssh
ssh...
lsmod > vm_mod_list
exit

scp -i ~/.ssh/rsa_iio_arm64_virt root@192.168.122.38:~/vm_mod_list .
make LSMOD=vm_mod_list localmodconfig
```

```
make -j$(nproc) bzImage modules
```

## Choosing what modules to build

TODO module install

For cross compilation:
```
pacman -S aarch64-linux-gnu-gcc bc
```

# Appendix

## Useful Commands For Managing Virsh VM

```bash
# list all VMs
sudo virsh list --all
# start the VM
sudo virsh start linux-amd64
# pause the VM
sudo virsh suspend linux-amd64
# force shutdown the VM (if it gets stuck)
sudo virsh destroy linux-amd64
# delete the VM (but not the disk, you can re-create with the same disk as before)
sudo virsh undefine linux-amd64
```

## List of Packages I needed to install
```bash
sudo pacman -S guestfs-tools \
                virt-manager \
                qemu-base \
                qemu-system-arm \
                qemu-system-aarch64 \
                qemu-system-arm-firmware \
                dnsmasq
```


## References
