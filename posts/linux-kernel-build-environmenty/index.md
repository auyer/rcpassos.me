---
title: DRAFT -  A Solid Environment For Building And Developing The Linux Kernel
date: 2024-03-20
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
- Using the KWorflow tool to streamline the process of building and testing the kernel

# Preparing a Virtual Machine Disk and Files

The first step in my environment setup was to create a virtual machine.
The reasoning here is that I can have a clean intalation target to test the kernel I am building, and I wont negatively affect my machine util I tested it in the VM.
This will also make it easier to backup the environment and roll back to a previous state if something goes wrong.

I use Arch Linux as my main OS, so I will use it as the host for the virtual machine. 
The packages I list here are for arch linux, but you can use the package manager of your choice to install the equivalent packages for your OS.

> **⚠️ Note**: In this guide, I refer to the machine I am using to build the kernel as the host machine, and the virtual machine as the VM.
> The Host is where the VM is running, but you may also chose to build the Kernel in a different machine that is not the host.
> If that is the case, only the outputs from the Build step need to be sent from your build machine to the Host machine.

## My folder setup for this project

To make it easier for anyone following this setup, here is, this is the folder structure I used in this project.
You may adapt it to your liking, but I will use these paths in the commands I will show.
All folders will be created here with these two `mkdir` commands.

```bash
# create folders for the amd64 architecute
mkdir -p ~/kernel-dev/amd64/boot
mkdir -p ~/kernel-dev/amd64/modules

# and for the arm64 architecture
mkdir -p ~/kernel-dev/arm64/boot
mkdir -p ~/kernel-dev/arm64/modules

# this is how the folder structure will look like
cd ~/kernel-dev
tree . w

➜ 
.
├── amd64
│   ├── boot
│   │   └── boot files for amd64
│   └── linux-amd64.qcow2
├── arm64
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

If this step is successful, we can proceed to the next step [Reading files from the VM Disk image](#reading-files-from-the-vm-disk-image). 

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

## Reading files from the VM Disk image

At this point, we have a Disk Image (the qcow2 file) with a root partition that is large enough to use for testing the kernel and its modules.
With the next command, we are listing the files in the boot directory of the image.
We are looking for the kernel and initrd files, so we can copy them to the host and use them in the VM we are going to create.
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

``` bash
virt-copy-out -a ./$ARCH/linux-$ARCH.qcow2 /boot/initrd.img-6.1.0-18-$ARCH ./$ARCH/boot
virt-copy-out -a ./$ARCH/linux-$ARCH.qcow2 /boot/vmlinuz-6.1.0-18-$ARCH ./$ARCH/boot
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

The first script will create the VM and run it with the original kernel and initrd files (the two files we got with `virt-copy-out`).
I will keep them and this script in my environment folder, so I can use them to create the VM again if I need to.

> ⚠️ **Attention**: Some parameters might need to be changed to fit your environment.

- The VM_DIR variable needs to point to your workdir folder. 
- Shortcuts like `$HOME` or `~` wont work because we will execute this script with the root user.
- The last line contains the path to the kernel and initrd files. These should match the files you got from the `virt-copy-out` command.
- The same line also contains the root partition `root=/dev/sda1`, and this should also match the root partition you got from the `virt-filesystems` command.
- The `--disk` parameter should point to the disk image you created or resized.
- If your network is different from `virbr0`, you should change the `--network` parameter to match your network.

### amd64

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

### arm64

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
VM_DIR=/home/auyer/kernel-dev/arm64
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


## Starting the VM

From this part on, the steps are the same for both architectures again.
With the script from the previous session saved, we can execute this with:

```bash
sudo bash create_og_kernel_$ARCH.sh
```
You can also make it executable by itself (no need to call `bash ./script...`). 
```bash
chmod +x create_og_kernel_$ARCH.sh`
# and then run it with 
sudo ./create_og_kernel_$ARCH.sh
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

# Getting the Kernel Source Code

The next step is to get the kernel source code.
If you are used to the GitHub experience, this is going to be a bit different.
in GitHub, it is common to have a single repository for a project.
Inside contributors create branches in the same repository, and merge these changes to the main branch with pull requests.
Outside contributors fork the repository, make changes in their fork, and create pull requests to the main repository.

For the Linux Kernel, the structure is more similar to the second case.
There are several repositories (also known as trees) where the kernel is developed, and contributors send patches to the maintainers.
The maintainers review the patches, and if they are good, they are merged into the their repository.
I will not cover how these patches are sent and reviewed in this post, but I will show how to get the source code and build it.

The tree I chose to clone is the one maintained by Linus Torvalds, the creator of the Linux Kernel.
This is also known as the mainline tree, and it is where the Official Linux Releases come from.
The repository is hosted at [git.kernel.org](https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git).
Also in this website, you can find the other trees, like the stable tree, the linux-next tree and many others.

The next command will clone the kernel source code into the `linux` folder.
It might take a, because the kernel source code is quite large.
```bash
git clone git://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git 
cd linux
```

> ⚠️ **Attention**: In the previous steps I used a variable `ARCH` to store the architecture name and make it easy to reuse the commands for both architectures.
> But when building the kernel, the arch name for amd64 is `x86_64`, and for arm64 is `arm64`.
> If going back to the previous steps, you should replace the `ARCH` variable with the correct arch name.
 
```bash
export ARCH=x86_64 # or export ARCH=arm64 
# todo explain
make defconfig
# todo explain
make olddefconfig
```

## Choosing what modules to build 

You could build all kernel modules, but it would take a long time. 
Instead, we will read what modules your VM needs, and build only those.

Get the current IP address of the VM with the `virsh` command, and run this `lsmod` command over ssh.
The result will be written to your current folder in your host machine.

> ⚠️ **Attention**: The `lsmod` command will not work if the VM is not running.

> ⚠️ **Attention**: The `make LSMOD=...` command might ask you to set parameters for the modules you are building.
> You are most like going to be fine by pressing enter and using the default values.
> If it fails, you might need to search for the root cause of the error message elsewhere.

```bash
ssh root@192.168.122.178 lsmod > modules_list_$ARCH
# and this will configure the kernel to build only the modules you need
make LSMOD=../modules_list_$ARCH localmodconfig
```

The next step will build the kernel with all available cores.
This will speed up the process a lot, but it will also consume a lot of resources.
If you are using a resource limited machine, you can use the `-j` parameter with a lower number.

> ⚠️ **Attention**: The next command might ask you to set parameters for the modules you are building.
> You are most like going to be fine by pressing enter and using the default values.

For amd64 (if your host is amd64):
```bash
make -j$(nproc) modules bzImage
```

For arm64 (if your host is amd64):
```bash
make -j$(nproc) ARCH=arm64 CROSS_COMPILE=aarch64-linux-gnu- Image.gz modules
```

## Installing the Kernel Modules

At this point, we have a compiled kernel and modules.
We can install the modules in the VM directly from the host machine.

```bash
sudo virsh shutdown linux-$ARCH # or destroy, if it hangs
```

### Option 1: sending modules over SSH

We can leverage the ssh we configured to send the modules to the VM without needing to stop it.
You can do it with `rsync` or the older `scp` protocol.
`rsync` is a lot faster. It can detect existing files and send an incremental update.
But it requires the `rsync`  command to be installed in the VM.
You can install it with `apt-get install rsync`.


```bash
# inside the vm
apt update && apt install rsync
```

Now install the modules to the local `$ARCH/modules` folder we created.

```bash
# in your host
make INSTALL_MOD_PATH=../$ARCH/modules modules_install
# rsync with recursive, compress and Progress reporting options
rsync -rzP ./arm64/modules/lib/modules/ root@192.168.122.25:/lib/modules/
```

> ⚠️ **Attention**: The modules_install command may install it to your host **if you leave the `INSTALL_MOD_PATH` variable empty**.`

### Option 2: mounting the disk image into a local folder

If you prefer not to use the virtual network to send the files, you can mount the disk image to a local folder and copy the files.
These commands are run from the linux folder, and the VM needs to be offline to use the disk features.

```bash
# mount the disk image to the modules folder (created in the first section)
guestmount ../$ARCH/modules
# run the modules_install command pointing to the mounted folder
make INSTALL_MOD_PATH=../$ARCH/modules modules_install
# unmount the disk image, so we can start the VM
guestunmount ../$ARCH/modules
```

## Running the VM with the new kernel and Modules

Now let's create a copy of the script we used to create the VM, and change the kernel and initrd files to the ones we just compiled.
The idea is to keep both scripts, so we can use them to create the VM again if we need to.

```bash
cp create_og_kernel_$ARCH.sh create_built_kernel_$ARCH.sh
```
There is only one thing to change in the script.
We need to point to the output files of the kernel compilation. 
That is the `kernel` parameter in the `--boot` option.

Here are the diffs for the two files, showing the changes I made to the `--boot` option.
The first line is the original file, and the second line is the new file.
If you are using a different folder structure, that should be adapted too.

adm64:
```bash
diff create_og_kernel_amd64.sh create_built_kernel_amd64.sh

➜  
< --boot kernel=$BOOT_DIR/vmlinuz-6.1.0-18-amd64,initrd=$BOOT_DIR/initrd.img-6.1.0-18-amd64,kernel_args="console=tty0 console=ttyS0 log
level=8 root=/dev/sda1 rootwait"
---
> --boot kernel=$VM_DIR/../linux/arch/x86/boot/bzImage,initrd=$BOOT_DIR/initrd.img-6.1.0-18-amd64,kernel_args="console=tty0 console=tty
S0 loglevel=8 root=/dev/sda1 rootwait"
>
```

arm64:
```bash
diff create_og_kernel_arm64.sh create_built_kernel_arm64.sh

➜  
< --boot kernel=$BOOT_DIR/vmlinuz-6.1.0-18-arm64,initrd=$BOOT_DIR/initrd.img-6.1.0-18-arm64,kernel_args="console=ttyAMA0 loglevel=8 roo
t=/dev/vda1 rootwait" 
---
> --boot kernel=$VM_DIR/../linux/arch/arm64/boot/Image.gz,initrd=$BOOT_DIR/initrd.img-6.1.0-18-arm64,kernel_args="console=ttyAMA0 logle
vel=8 root=/dev/vda1 rootwait"
```

Before running this script, we need to make sure the VM is off, and remove it from the list of configured VMs (so we can re-create it). 
```bash
# attempt the shutdown
sudo virsh shutdown linux-$ARCH
# check if it is no longer running. 
# If it is, force it to shutdown using `destroy` instead
sudo virsh list --all
# remove the VM from the list
sudo virsh undefine linux-$ARCH
```

Now we can run the script to create the VM with the new kernel and modules.
```bash
sudo bash create_built_kernel_$ARCH.sh

## Inside the VM:
# check the version running
uname -a

➜ 
Linux localhost 6.8.0-11767-g23956900041d SMP PREEMPT_DYNAMIC Thu Mar 21 10:28:09 -03 2024 x86_64 GNU/Linux

# check the modules installed
ls /lib/modules/

➜ 
6.1.0-18-amd64  6.8.0-11767-g23956900041d

```

Great !
Now we have a VM running with the kernel and modules we just compiled.
The basic development loop is ready to take place:
1. make changes to the kernel source code
2. compile the kernel and modules
3. install the modules in the VM
4. run the VM and test the changes

---

The next sections will cover how to set up a development environment for the kernel, and how to use the LSP for the kernel source code.
After that, we will cover how to use a tool called `kworkflow` to automate the process of building and running the kernel in the VM.

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

# Using kworkflow


```bash
kw init

kw env create arm64_vm # or kw env -c arm64_vm
kw env use arm64_vm # or kw env -u arm64_vm

export ARCH=arm64
make defconfig
make LSMOD=../modules_list_$ARCH localmodconfig
# config cross compilation for arm64
kw config build.arch arm64
kw config build.cross_compile aarch64-linux-gnu-

kw remote create arm64_vm root@<vm_ip>:22
kw remote --set-default=arm64_vm

```
TODO

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
```bash
pacman -S base-devel 
```

Or using the dependencies specified in the [Linux PKGBUILD](https://gitlab.archlinux.org/archlinux/packaging/packages/linux/-/blob/main/PKGBUILD):
```bash
pacman -S \
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

## References
1. FLUSP Build the Linux kernel for ARM [flusp.ime.usp.br/kernel/build-linux-for-arm](https://flusp.ime.usp.br/kernel/build-linux-for-arm/)
2. FLUSP Kernel Compilation and Installation [flusp.ime.usp.br/kernel/Kernel-compilation-and-installation](https://flusp.ime.usp.br/kernel/Kernel-compilation-and-installation/)
3. FLUSP Use QEMU to Play with Linux Kernel [flusp.ime.usp.br/kernel/use-qemu-to-play-with-linux](https://flusp.ime.usp.br/kernel/use-qemu-to-play-with-linux/)
4. KernelNewbies Kernel Build [kernelnewbies.org/KernelBuild](https://kernelnewbies.org/KernelBuild)
