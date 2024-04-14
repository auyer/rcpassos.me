---
title: "DRAFT - eBPF : A brief look at how it works"
date: 2024-03-30
---

### TL;DR

- Programs with two components: one in User-Space, one in Kernel-Space.
- The Kernel-space component is compiled to eBPF bytecode and loaded into the kernel.
- It will be executed by the Kernel when a specific event occurs.
- The user-space component is responsible for setting up the eBPF program and handling the data it produces. 



# Introduction

If you are a programmer used to working in high level applications, like I am, it becomes easy to forget that for every interaction with the hardware a "program" makes, the Kernel is involved.
This involves reading and writing to files, network communication, memory allocation, and even the simple "printing to a terminal", among other things [[1]](#references).

And it is worse than that.
The Kernel has control over the programs we write at an instruction level.
While the CPU is the one responsible for executing the instructions, the Kernel is the one that decides which instructions are executed at each time.
It can pause and resume the execution at any time, known as time-sharing or milti-tasking.
It is how we can have multiple programs running at the "same time" in a single CPU [[2]](#references).
<!-- And it does not matter what language was used to write the program. -->
<!-- In the end it all comes down to a sequence of instructions that the CPU will execute. keep or delete?-->

The reason I am saying all this is to remind us some of the responsibilities of the Kernel.
It is itself a program that runs on the same CPU as the programs we write.
When it is running, it has access to all the hardware resources and can do anything it wants.
We can call it Kernel-mode.
When our programs are running, they access resources through the Kernel, and this can be called running in User-Space.
<!-- Another thing to remember, is that there is always a cost to switch between the Kernel and User-Space. # put it elsewhere-->

## What is eBPF?

Skipping the origin story, eBPF is a technology that allows us to run small programs inside the Linux Kernel.
This could have seemed uninteresting before my introduction.
But now that we remember the Kernel's power, we can start to imagine why this is a big deal.

These programs can be loaded into the Kernel at runtime without rebooting or stopping anuthing, and without the need to recompile (the kernel).
They are, however, limited in several ways.
They are not equivalent to a Kernel module, and not as powerful.
But they are also simpler, safer and more flexible.

In this article, we will take a brief look at how eBPF works and how it can be used to trace events in the Linux Kernel.
I will use two simple but powerful programs built with it to demonstrate how it works under the hood (just a bit).
- `execsnoop` traces the `exec()` system call.
- `gethostlatency` DNS resolution latency.

How does eBPF work?

![BPF Training technologies, Figure 2-1 from the book 1](./fig2-1-bpf-tracing.png)
*BPF Training technologies, Figure 2-1 from the book [[2]](#references)*

## Why use eBPF instead of existing Kernel APIs?

If using an API-based approach, the tracing application need to probe the API at a timely manner to see what is being executed.
This can lead to missing short lived events, as they can pop in and out between the each probe in the system.
Using event-based tracing guarantees we will see what is being executed, because the Kernel is responsible for saving the tracing information that will be read by our user-space app.
[[2]](#references)

## Dynamic Instrumentation

DynamicTracing has zero-cost when not in use. Software can run unmodified until tracing is needed.
It is similar to how a debugger works, where a instruction is replaced by a breakpoint instruction.
But it is done in a way that is transparent to the user-space application. [[2]](#references)

uprobes and kprobes are examples of dynamic instrumentation. eBPF can use them to trace user-space and Kernel-space events respectively.

uprobe:/bin/bash:readline

## listing tracepoints

```bash
bpftrace -l 'tracepoint:syscalls:sys_enter_open*'
```

## Examples using bpftrace

```bash
sudo bpftrace -e 'kprobe:do_nanosleep {
    printf ("PID %d sleeping...\n",pid);
}'
```

## Some example eBPF programs for tracing

- biolatency: Trace block I/O latency.
- execsnoop: trace exec() syscalls.

## kprobes
...

When a kprobe is attached to a function, the Kernel will save the original instruction and replace it with a breakpoint-like instruction.
This instructions calls the kprobe handler, which will execute the eBPF program.
After the eBPF program is executed, the original instruction is called from where it was saved and the function is executed normally.

When the probe is removed, the original instruction is restored.


The default mode for eBPF programs is to run only while the user-space program that started it is still running.
There is a pinning mechanism that allows the eBPF program to run even after the user-space program that started it has finished.
BPF_OBJ_PIN

## SYSCALLS 

Kernel-tree/tools/include/uapi/linux/bpf.h



## Testing inside a VM:
    
```bash
apt update 
apt install make gcc clang bcc bpftool glibc-source libelf-dev linux-headers-amd64 build-essential


## If you see an error with the libc version
echo "deb https://deb.debian.org/debian experimental main" >> /etc/apt/sources.list


apt install -t experimental libc-bin
```

vim /


# TODO:
read 2.7 2.8
read 14.3 from book to compare with traditional tracing tools

# References

[1] A. S. Tanenbaum and H. J. Bos, Modern Operating Systems, 4th Edition. Pearson Higher Education, 2015.
[1] D. M. Ritchie and K. Thompson, “The UNIX time-sharing system,” Communications of the ACM, vol. 17, no. 7, pp. 365–375, Jul. 1974
[2] B. Gregg, Bpf performance tools: Linux system and application observability, 1st ed. Hoboken: Pearson Education, Inc, 2019.
[3] S. Brand, “How C++ Debuggers work,” CppCon.org, Oct. 20, 2018. https://www.youtube.com/watch?v=0DDrseUomfU (accessed Apr. 13, 2024).
