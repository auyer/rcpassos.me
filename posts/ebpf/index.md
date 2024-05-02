---
title: 'DRAFT - eBPF : A brief look at how it works'
date: 2024-03-30
---

In this article, I will give a brief overview of eBPF, what it can be used for, and go through the steps two libraries take to load an eBPF program into the Kernel. TODO: and what happens in the Kernel when the program is executed.
### TL;DR # todo remove

- Programs with two components: one in User-Space, one in Kernel-Space.
- The Kernel-space component is compiled to eBPF bytecode and loaded into the kernel.
- It will be executed by the Kernel when a specific event occurs.
- The user-space component is responsible for setting up the eBPF program and handling the data it produces.

# Introduction

If you are a programmer used to working in high level applications, like I am, it becomes easy to forget that for every interaction with the hardware a "program" makes, the Kernel is involved.
This includes reading and writing to files, network communication, memory allocation, and even the simple "printing logs to a terminal", among other things [[1](#references)].

And it is more complex than that.
The Kernel has control over the programs it executes at an instruction level.
While the CPU is the one responsible for executing the instructions, the Kernel is the one that decides which instructions are available for the CPU to see at.
It can pause and resume the execution at any time, known as time-sharing or multi-tasking.
It is how we computers can have many programs running "at the same time" with a limited number of cores [[2](#references)].

<!-- And it does not matter what language was used to write the program. -->
<!-- In the end it all comes down to a sequence of instructions that the CPU will execute. keep or delete?-->

The reason I am saying all this is to remind us some of the responsibilities the Kernel has.
It is itself a program that runs on the same CPU as the programs we write.
When it is running, it has access to all the hardware resources and can do anything it wants.
We can call it Kernel-mode.
When our programs are running, they run in User-Space, and they access resources through the Kernel, requesting them with what is called system calls.
The important thing to take note here, is that when your program wants to access something, it asks the Kernel, and stops running for a while.
At this time, the Kernel code is running to provide what was requested.
Only then, your program can continue running.

<!-- Another thing to remember, is that there is always a cost to switch between the Kernel and User-Space. # put it elsewhere-->

## What is eBPF?

It is the extension of the original BPF (Berkeley Packet Filter) that was used to filter packets in the network stack.
They are the same technology now, and both BPF and eBPF names can be used interchangeably to refer to the same thing.
Skipping the origin story, eBPF is a technology that allows us to run small programs inside the Linux Kernel.
This could have seemed uninteresting before my introduction.
But now that we remeber the Kernel's power, we can start to imagine why this is a big deal.

These programs can be loaded at runtime without rebooting or stopping anything, and clearly, without the need to recompile (the kernel).
They are, however, limited in several ways.
They are not equivalent to a Kernel module, and not as powerful.
But this is a good thing.
It makes them a lot simpler and safer than actual Kernel code, while being able to do things not accessible to User-Space programs, or providing the efficiency of running in Kernel-Space to improve performance-critical tasks.

Like most tools, what it can do will depends only on the creativity of its users.
Some of the most common use cases are:

- Tracing and monitoring: log what is being run in the Kernel or in User programs;
- Security: detect or even block malicious behavior;
- Networking: monitoring and controlling network traffic

In the following sections, we will take a brief look at how eBPF works and how it can be used to trace events in the Linux Kernel.
I will use two simple but powerful programs built with it to demonstrate how it works under the hood.

- `execsnoop` traces the `exec()` system call to track every program being run;
- `gethostlatency` log DNS resolution latency across all processes.

## How does eBPF work?

In a high level view, BPF tools are composed of two parts: one in User-Space, and one in Kernel-Space.
The User-Space part is responsible for setting up the BPF program (that is the Kernel-Space part), and if it produces any data, handling it.

For a given BPF tool to run, these are the basic steps that need to happen (also shown in the picture below):

1. The User-Space part is started by the user;
2. It compiles the BPF program to the BPF bytecode (a instruction set create for this purpose), and sends it to the Kernel;
3. The program is recieved, and processed by the Verifier (a security mechanism that checks if the program is safe to run);
4. The program is loaded into the Kernel, and attached to the desired event (defined in the program itself);
5. It can now be executed by the BPF interpreter, or compiled to native code by a JIT (just in time compiler) to run faster;
6. When the event occurs, the Kernel will execute the BPF program, and the User-Space part can read the data produced by it (if its the case).

![BPF Tracing technologies, Figure 2-1 from the book 3](./fig2-1-bpf-tracing.png)
_BPF Tracing technologies, Figure 2-1 from the book [[3](#references)]_

## Dynamic Instrumentation

DynamicTracing has zero-cost when not in use. Software can run unmodified until tracing is needed.
It is similar to how a debugger works, where a instruction is replaced by a breakpoint instruction.
But it is done in a way that is transparent to the user-space application. [[3]](#references)

uprobes and kprobes are examples of dynamic instrumentation. eBPF can use them to trace user-space and Kernel-space events respectively.

uprobe:/bin/bash:readline


## Why use eBPF instead of existing Kernel APIs?

By know we know that BPF can be used to extend and monitor what is happening in a machine.
But the Kernel already provides APIs various use cases that might be the same.
If what you need is already covered by an API, why use eBPF?
As with most things, it depends.
There is a few clear advantage to using eBPF, they just might not matter to some use cases.

First, BPF programs can bring the flexibility to do exactly what you want, if the API does not cover it perfectly.
Second, it is event-based.
If using an API-based approach, the tracing application need to probe the API at a timely manner, fetching the results.
This can lead to missing short lived events, as they can pop in and out between the each probe in the system.
Using event-based tracing guarantees we will see what is being executed, because the Kernel is responsible for saving the tracing information that will be read by our user-space app.
[[3](#references)]

Consider the following example: we want to trace every process that is being run in a system.
The Kernel provides an API for this.
Programs like `ps` and `top` use it.
The first returns a snapshot at the time it was called, and the second updates the information at a configurable interval (3s by default).
The `execsnoop` BPF program I mentioned before, will trace every `exec()` system call, and print the information as it happens.
Since the Kernel itself reports the event, and saves it into a accessible memory space, we can be sure we will see every event that happens.
The downside is, you need to know what you are looking for.


## kprobes

...

When a kprobe is attached to a function, the Kernel will save the original instruction and replace it with a breakpoint-like instruction.
This instructions calls the kprobe handler, which will execute the eBPF program.
After the eBPF program is executed, the original instruction is called from where it was saved and the function is executed normally.

When the probe is removed, the original instruction is restored.

The default mode for eBPF programs is to run only while the user-space program that started it is still running.
There is a pinning mechanism that allows the eBPF program to run even after the user-space program that started it has finished.
BPF_OBJ_PIN

# What the Kernel provides

Previously I mentioned how powerful the Kernel is.
I also mentioned that eBPF programs are limited, and dont have access to all the Kernel's power.
Let's take a look at a non-exhaustive list of things that the Kernel provides to eBPF programs.
Some of these are available to other tools as well, but BPF can use all of them in a very simple and efficient way.

## Uprobes

Uprobes are used to trace User-Space functions.
This means we can trace any function in any program or libraries, as long as we know the address of the function.


## kprobes

Kprobes are used to trace Kernel functions.
Since every interaction with the hardware goes through the Kernel, this means we can trace almost anything every program does.
We can also monitor the Kernel itself, by probing functions it uses 




# How eBPF Kernel programs are executed

This part took me a while to understand, so I will try to explain it as simply as possible.
eBPF programs are only executed when a specific event occurs.
This event can be a system call, a function call in the Kernel, or even a function call from libraries and programs in User-Space.

The key is to remember that the Kernel knows every instruction that will be executed by the CPU.
It can also change them at any time.
When we register an eBPF program to a given event (eg a Function call), the Kernel will replace the address of the original with the address of the eBPF program.
When the CPU reaches that instruction, it will execute the eBPF program first, instead of the original one.
This is quite similar to how a debugger works, but it is done in a way that is transparent to the user-space application. [[3,4](#references)]

## Diving into the implementation

In this section, I will wlak go through the steps two libraries take to load an eBPF program into the Kernel: cilium-ebpf (GO) and BCC (C/Python).

The examples I will use are: `execsnoop` for the BCC, and `kprobe` for the cilium-ebpf library.
They are both used to trace the `exec()` system call, which is used to run programs in Linux.
<!-- What the example programs do is not the same, but this is not important for what I will cover.  -->
<!-- For the curious that will run them, the first prints every call, the second just counts them). -->

The first step is to write the eBPF program.
It must contain the function(s) that will be executed, and the map(s) that will be used to store data and communicate with user-space.
This is the code for the cilium's `kprobe` example (similar to `execsnoop`, but simpler): 

```c
#include "common.h" // provided by cilium-ebpf

char __license[] SEC("license") = "Dual MIT/GPL";

struct bpf_map_def SEC("maps") kprobe_map = {
	.type        = BPF_MAP_TYPE_ARRAY,
	.key_size    = sizeof(u32),
	.value_size  = sizeof(u64),
	.max_entries = 1,
};

SEC("kprobe/sys_execve")
int kprobe_execve() {
	u32 key     = 0;
	u64 initval = 1, *valule_pointer;

	valule_pointer = bpf_map_lookup_elem(&kprobe_map, &key);
	if (!valule_pointer) {
		bpf_map_update_elem(&kprobe_map, &key, &initval, BPF_ANY);
		return 0;
	}
	__sync_fetch_and_add(valule_pointer, 1);

	return 0;
}
```

With the program written, we need to compile it.
The steps both libraries will take are roughly equivalent to:

- Compile the BPF program
- Load the BPF program into the Kernel
- Load the iterfaces to interact with the program (like the map in this example)
- Attach the program to the desired event 

This program has to be compiled into BPF Bytecode.
Both tools use the Clang (LLVM) compiler to do this, but in different ways.

### GO and cilium-ebpf


<!-- This is not the accurate implementation, but it is a simplified version of how it could be implemented. -->
<!-- The real implementation is in [github.com/cilium/ebpf/link/kprobe.go](https://github.com/cilium/ebpf/blob/main/link/kprobe.go). -->

The Cilium ebpf library [[5](#references)], takes a approach with code generation to reduce manual work.
There are three stages to this process:

1. BPF compilation (clang) and Go "glue" code generation, 
2. Tool development using the generated code,
3. GO compilation (our code + generated code) and embedding of the BPF program into the binary.

For the first step, assuming the BPF program is in a local file called `kprobe.c`, the following `go:generate` directive needs to be added to a Go file:
```go
package main

//go:generate go run github.com/cilium/ebpf/cmd/bpf2go bpf kprobe.c -- -I../headers
```
Now the `go generate` command can be issued.
It is also possible to call the bpf2go direclty.

It compiles the BPF program with Clang, and generates the GO code that will be used to load the program into the Kernel, and interact with it.
One part of this glue code uses a `go:embed` directive to include the compiled BPF program into the final binary (used in step 3):
```go
//go:embed bpf_bpfel.o
var _BpfBytes []byte
```

The code below is a very simplified version of the calls made by the cilium-ebpf library.
The represent how it loads the compiled BPF program is loaded to the Kernel.

> **Note**: 
> While in normal programs we just call a function with the parameters we want,
> when calling the Kernel, we need to store all the parameters in a struct and pass a pointer to it.
> The kernel will then look at the pointer, and "decode" it into its own representation of the struct.

```go
attr := &sys.ProgLoadAttr{
    // bytecode: the compiled instructions for the function
	Insns :             sys.NewSlicePointer(bytecode), 
    ProgType:           sys.ProgType(spec.Type),
    ProgFlags:          spec.Flags,
    ExpectedAttachType: sys.AttachType(spec.AttachType),
    License:            sys.NewStringPointer(spec.License),
    KernVersion:        kv,
}

// code from : ProgLoad
programRawFD, _, errNo := unix.Syscall(unix.SYS_BPF, uintptr(BPF_BTF_LOAD), unsafe.Pointer(attr), unsafe.Sizeof(*attr))
, _, errNo := unix.Syscall(unix.SYS_BPF, uintptr(cmd), uintptr(attr), size)
if err != nil {
    return nil, err
}
return NewFD(int(fd))
```

When we compile everything, the resulting binary will contain the eBPF program, the GO code to load it into the Kernel, and the GO code to interact with it.
This means once you have the resulting binary, it can run on any Linux machine with a compatible Kernel.
There are some other thins that need to happen, but I wont cover deeply:
- the library needs to also load the structures that will be used to interact with the program, like the map used in this example
- the library might need to check if the addresses we got when compiling the BPF program are valid in the Kernel we are running on. If they are different, it can map them. This is refered to as CO-RE (compile once, run everywhere).
like the Kernel version, the BPF version, and the Kernel configuration.

Now that we have the program loaded into the Kernel, we need to attach it to the desired event.
The library will first check if the desired event is available in the Kernel.

```go
// code from : kprobe, pmuProbe

// Create a pointer to a NUL-terminated string for the kernel.
// this is the name of the (kernel) function we want to trace.
sp, err = unsafeStringPtr("sys_execve") // or ach specific, like "__x64_sys_execve"
attr = unix.PerfEventAttr{
      Type:   uint32(KPROBE),      // PMU event type read from sysfs
      Ext1:   uint64(uintptr(sp)), // Kernel symbol to trace
      Ext2:   args.Offset,         // Kernel symbol offset
            ...
    }

rawFd, _, e1 := Syscall6(SYS_PERF_EVENT_OPEN, uintptr(unsafe.Pointer(attr)), uintptr(pid), uintptr(cpu), uintptr(groupFd), uintptr(flags), 0)
// r0 is the file descriptor of the perf event
// ... check error e1

// this is the file descriptor of the perf event we want to trace
kprobeFd, err := sys.NewFD(int(rawFd))
```

If this was successful, we know whe can ask the kernel to add a probe there.
This is done with the `SYS_BPF` syscall, with the `BPF_LINK_CREATE` command.

```go
// code from: attachPerfEventLink

rawFd2, _, errNo := unix.Syscall(unix.SYS_BPF, uintptr(BPF_LINK_CREATE), uintptr(attr), size) // SYS_BPF = 321, BPF_LINK_CREATE = 28
// ... check error errNo

ebpfProgramLinkFd, err := sys.NewFD(int(rawFd2))
```

TODO: finish GOLANG integration part

### Python and BCC

In this part, I will not go as deep as I did with the cilium-ebpf library, beacause doing the syscalls is mostly the same (just in C/C++ instead of GO).
The Python BPF Compiler Collection (BCC) [[6](#references)] implementation takes the program either as a string or a file, and compiles it right before loading it into the Kernel.
And there is no pre-compulation step, like the cilium-ebpf library.
It need to do it every time it is runs.
Because of this, and also because of how Python works, it is expected to have all these all dependencies to run a tool built with BCC: Python, BCC, Clang/llvm & Linux Headers.
<!-- The upside, is that it is simpler to implement versatile tools, by changing the BPF code at will. -->

For the user writing the BPF tool, this is as simple as running the following Python code.

```python
from bcc import BPF

# where bpf_text is a program similar written in the BPF C-like language
b = BPF(text=bpf_text)
# OR, point to a file
b = BPF(src_file=bpf_file)

... #(more details later)
```

This BPF Python Class takes the program as input, and .

```python
# bcc/src/__init__.py - BPF class

def __init__(self, src_file=b"", hdr_file=b"", text=None, debug=0,
            cflags=[], usdt_contexts=[], allow_rlimit=True, device=None,
            attach_usdt_ignore_pid=False):
...
self.module = lib.bpf_module_create_c_from_string(text,
                                                  self.debug,
                                                  cflags_array, len(cflags_array),
                                                  allow_rlimit, device)
```

The `bpf_module_create_c_from_string` function is a call to its C++ function implementation with the same name.

```c++
// bcc/src/cc/bpf_module.cc

BPFModule::BPFModule(unsigned flags, TableStorage *ts, bool rw_engine_enabled,
                     const std::string &maps_ns, bool allow_rlimit,
                     const char *dev_name)
...

// load an entire c file as a module
int BPFModule::load_cfile(const string &file, bool in_memory, const char *cflags[], int ncflags) {
  ClangLoader clang_loader(&*ctx_, flags_);
  if (clang_loader.parse(&mod_, *ts_, file, in_memory, cflags, ncflags, id_,
                         *prog_func_info_, mod_src_, maps_ns_, fake_fd_map_,
                         perf_events_))
    return -1;
  return 0;
}
```

Back to the Python code, the next step is to attach the program to the desired event.
The functions `attach_kprobe` and `attach_kretprobe` both instrument the Kernel function `execve_fnname`.
They attach the function with name passed to `fn_name` to the start and end of `execve_fnname` respectively.
The `fn_name` function names need to match the ones in the BPF program loaded earlier.

```python
# returns the corresponding kernel function name of the syscall (for the specific architecture/version running)
execve_fnname = b.get_syscall_fnname("execve")

b.attach_kprobe(event=execve_fnname, fn_name="syscall__execve")
b.attach_kretprobe(event=execve_fnname, fn_name="do_ret_sys_execve")
```

At this point, the user space part of this tool is ready to collect the data recorded, and report to the user.


## What happens in the Kernel

https://elixir.bootlin.com/linux/latest/source/tools/include/uapi/linux/bpf.h#L122

In the Go example, I showed the `SYS_BPF` Syscall being used two times.
Each one, with a different command: `BPF_PROG_LOAD` and `BPF_LINK_CREATE`.
This Syscall `SYS_BPF` selects what it should do based on a command passed as input.

```c
static int __sys_bpf(int cmd, bpfptr_t uattr, unsigned int size)
{
  ...
  switch (cmd) {
  case BPF_MAP_CREATE:
    err = map_create(&attr);
    break;
    ...
    case BPF_LINK_CREATE:
    err = link_create(&attr, uattr);
    break;
    ...
    default:
    err = -EINVAL;
    break;
}

```

# SHOW HOW ADDRESSES ARE REPLACED

attach_kprobe

attach_uprobe



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


# TODO:

read 2.7 2.8
read 14.3 from book to compare with traditional tracing tools

check SYS_PERF_EVENT_OPEN (298)

# References
// TODO FIX order

- [1] A. S. Tanenbaum and H. J. Bos, Modern Operating Systems, 4th Edition. Pearson Higher Education, 2015.
- [2] D. M. Ritchie and K. Thompson, “The UNIX time-sharing system,” Communications of the ACM, vol. 17, no. 7, pp. 365–375, Jul. 1974
- [3] “BPF Documentation — The Linux Kernel documentation,” kernel.org. [kernel.org/doc/html/latest/bpf/index.html](https://kernel.org/doc/html/latest/bpf/index.html).
- [3] B. Gregg, Bpf performance tools: Linux system and application observability, 1st ed. Hoboken: Pearson Education, Inc, 2019.
- [4] S. Brand, “How C++ Debuggers work,” CppCon.org, Oct. 20, 2018. [youtube.com/watch?v=0DDrseUomfU](https://www.youtube.com/watch?v=0DDrseUomfU)
- [5] “cilium/ebpf,” GitHub, [github.com/cilium/ebpf](https://github.com/iovisor/bcc)
- [6] “iovisor/bcc,” GitHub, [github.com/iovisor/bcc](https://github.com/iovisor/bcc)

# Appendix

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




