---
title: Compiling the XV6 kernel for RISC-V - My journey and leasons learned
date: 2024-01-21
---

# Preface

I recently decided to study more about how Operating Systems are built.
To help motivate myself, I decidade to write a couple articles during my studies.
This is the first one, and it will be about compiling the XV6 kernel for RISC-V.

One of the main resources I am using, is this MIT Course [6.S081 Operating System Engineering](https://learncs.me/mit/6.s081)

Another very interesting resource, is this YouTube playist [Source Dive by Low Byte Productions](https://www.youtube.com/playlist?list=PLP29wDx6QmW4Mw8mgvP87Zk33LRcKA9bl)

For this article, I chose to build everything from source. This can take some time depending on the machine running. The MIT class also provides a guide to download pre-compiled binaries of the tools needed [in the Tools page](https://pdos.csail.mit.edu/6.828/2020/tools.html)

# Setup

## Installing the toolchain


Clone the repository with 
`git clone --recurse-submodules  git@github.com:riscv-collab/riscv-gnu-toolchain.git`

In my system, I chose to put all the tools under `/usr`, but you can change it to something else if you want. 
Just note that you might need to configure your path to find the commands and libraries needed to compile everything.
`./configure --prefix=/usr --enable-multilib`

`make -j $(nproc)` where `$(nproc)` will be the number of cores in your machine. In my case, this is equivalent to `make -j 24`. 
You can give a smaller number if you want to use your machine while compiling, but it will take longer. 
In my experience, giving it a larger number than the number of cores will not make it faster. 
Your CPU will need to do a lot more context switching from one compiling job to another.
Note that you will need root access to the `/usr` folder to install the toolchain. So you will need to use the root user to run make, or run `sudo make -j $(nproc)`.


## Downloading the XV6 codebase



## Running the xv6-riscv system
Since we are running a RISC-V kernel, we need to use a RISC-V emulator.

I decided to build Qemu from source. 
```
git clone --recurse-submodules https://gitlab.com/qemu-project/qemu.git
cd qemu
./configure
make -j $(nproc)
sudo make install
```

### xv6-riscv codebase
Clone the repository with
`git clone git@github.com:mit-pdos/xv6-riscv.git`

Once inside the folder, you can compile the source code by just running just `make`.
This time, its simple enough to not need to use the `-j` flag.

Running this will generate a file called `kernel` inside the `kernel` folder.
This is the compiled file that we will run in out QEMU emulator.
We also generated binaries for every user program inside the `user` folder.

But before we do that, we need to create an image file to use as a disk for our system.
This is done by running `make fs.img`. It will run the mkfs program, and create the default `fs.img` file. 
If you loook at the Makefile, you will notice that it adds the README file and all the user programs to the image.

Now you can run the system with `make qemu`. This will run the QEMU emulator with the kernel we compiled, and the disk image we created.

You should see the following output:


```
xv6 kernel is booting

hart 2 starting
hart 1 starting
init: starting sh
$
```

### How to close the running QEMU instance
Press: `Ctrl + a` and then `q` and `Enter`


## Running with GDB

Just running the kernel is not very useful to understand what is happening.
We can use GDB to debug the kernel while it is running, and see what codepaths are being executed.
Luckly, QEMU has a built-in GDB server, so we can connect to it and debug the kernel.

I had not used GDB in a while, so I had to relearn how to use it. Also, I had to create a  file `$HOME/.config/gdb/gdbinit` file with the following content:
```
set auto-load safe-path <path to you local xv6-riscv codebase> 
```
mkdir -p .config/gdb

Open two terminal windows, one for QEMU and one for GDB.
In the QEMU terminal, run `make CPUS=1 qemu-gdb` (CPUS=1 makes it run in a single core, so it is easier to debug).

In the GDB terminal, run: `riscv64-unknown-elf-gdb -tui`
You will see a screen like this:

![QEMU and GDB on terminal screenshot](./xv6-riscv-gdb.jpg)

The first breakpoint I added was at _entry `b _entry`, after witch you can press `c` to continue, or `s` to step.
I cloud not get any source displayed before the `start` function (also reachable diraclty by a breakpoint `b start`). 
But you can see the instructions executed prior to it in the `kernel/kernel.asm` file that gets generated when compiling. It should be in the fisrt lines of the file.

```
kernel/kernel:     file format elf64-littleriscv


Disassembly of section .text:

0000000080000000 <_entry>:
    80000000:	00009117          	auipc	sp,0x9
    80000004:	a1010113          	add	sp,sp,-1520 # 80008a10 <stack0>
    80000008:	6505                	lui	a0,0x1
    8000000a:	f14025f3          	csrr	a1,mhartid
    8000000e:	0585                	add	a1,a1,1
    80000010:	02b50533          	mul	a0,a0,a1
    80000014:	912a                	add	sp,sp,a0
    80000016:	076000ef          	jal	8000008c <start>
```

