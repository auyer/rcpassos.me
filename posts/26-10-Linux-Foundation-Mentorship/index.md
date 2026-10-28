---
title: My Experience at the Linux Foundation Kernel Mentorship
date: 2026-10-28
---

This year, I joined the Linux kernel Summer Unpaid Mentorship.
It is an official program through which we receive training from experienced Linux developers, including Shuah Khan.

I should start by thanking them all.
All the mentors were very approachable.
It was helpful to have them ask questions and to see all the work being done by the other mentors.

## Why I joined

This program is the official mentorship to help developers get into the Kernel development and the community, with guidance and support.
It is especially helpful for developers who are unfamiliar with how the Kernel community operates.

I have contributed small patches to the Kernel before and contribute to FLOSS development training for students at the University of São Paulo.
I may not fully fit the "newcommer" audience.
But I joined because I wanted to see how the maintainers handled the mentoring;
And mostly I wanted help finding new contributions to make, and this sounded like a nice opportunity, given I have limited time due to my PhD and day work.

## The first patch

Right after applying for the mentorship, I started working on the first patch after finding a bug in 7.1-RC6 [the bug fix](https://lore.kernel.org/linux-input/20260602015029.2838058-1-rafael@rcpassos.me/).
It was quickly accepted but sent upstream only in the 7.2 release.
Right when it was merged, I also sent it to the 7.1 stable tree [for backporting](https://lore.kernel.org/stable/20260619013207.1968584-1-rafael@rcpassos.me/).
The complete story of this patch was told in my previous post: ["Solving two regressions in Linux 7.1 with one PATCH!"](https://rcpassos.me/post/26-06-linux-landing-a-bugfix).

## Finding something to work on

When the mentorship started, I first decided to study the selftests and the filesystems subsystems.
I kept checking Syzbot alerts a couple of times a day, and most issues were fixed before I could finish my investigation.
The ones that remained were hard to reproduce and not friendly to someone trying to understand the Kernel context, and with limited time available.

## The Wiimote driver

I eventually decided to look around for devices I could test with.
Eventually, when I connected my Nintendo Wiimote controller to my machine, I found an interesting behavior (or the lack of an expected behavior) that I could work on.

I worked on lighting up the correct LEDs for the Wiimote controller.
In addition, I looked for other improvements I could make in the driver.
I replaced lock/unlock pairs with `scoped_guards` and refactored the `led_probe` function to use a scoped guard for object allocation as well [the driver improvements](https://lore.kernel.org/linux-input/20261009022844.2790778-1-rafael@rcpassos.me/).
I am also writing a dedicated post about this work, and will update this post when I post it, placing the link [here].

## The kernel docs

Right at the end of the Merge Window, a mentor gave us a helpful tip: it is usually a good time to start building the Kernel docs.
It was the first time I did it, and I learned how to identify and fix issues in them. [This is the docs fix I sent](https://lore.kernel.org/all/20260701012141.167868-1-rafael@rcpassos.me/).

## Rust: the Android binder driver

The Linux Rust community frequently posts issues on GitHub, making it easy for people to find and contribute.
The improvement I made there was a performance improvement for the Android binder driver.
Validating it was very complex, as I had to build the entire AOSP Android project.
It took over 400GB just in cloned repos (tooling, emulator, Kernel, etc).
I couldn't reliably demonstrate a performance difference with the existing benchmarks, since the change would only affect the more extreme cases.
But at least the tests were passing. [Check the binder patch](https://lore.kernel.org/rust-for-linux/20260814215145.2050599-1-rafael@rcpassos.me/#t).

## Additional work

Additionally, [this patch](https://lore.kernel.org/all/6a1d983b.b111c304.35cd64.0028.GAE@google.com/t/#u) was produced to fix a syzbot bug in the WireGuard client.
It was deemed unnecessary by the maintainers.
In short, the bug was real but only affected a metric counter.
Fixing it would make the code more complex and could have performance side effects.

[This patch](https://lore.kernel.org/linux-input/20260904034843.1340846-1-rafael@rcpassos.me/) was a bug fix, which was not merged because the feature that introduced the bug was instead reverted.
It needs more work to be merge-ready again, but I might still help with this (at least with testing).

Finally, I also had a simple 1-line patch accepted, but someone had already sent a similar fix.
[My patch](https://lore.kernel.org/all/20260617235740.74029-1-rafael@rcpassos.me/) was removed in favor of the older patch.

## Looking Ahead

I will continue running my own compiler Kernels, as it gives me the best chance of finding bugs I can test on the hardware I own.
I am also running a personal PublicInbox with a few filters I use to check emails for areas of interest, so I can test a few patches before they get merged.
This is a nice way to help the community without the overhead of looking for things to fix.
