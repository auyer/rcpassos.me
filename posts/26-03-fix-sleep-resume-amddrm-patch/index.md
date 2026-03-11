---
title: I found a Bug in Linux 7.0-rc1 when resuming from S3 Sleep and sent a Fix
date: 2026-03-11
---

In [my last post](https://rcpassos.me/post/26-03-linux-kernel-bug-hunting-setup), I described my current effort to find bugs, regressions, and compilation warnings on Linux, to open up contribution opportunities in hardware I can test.
It took more than a month to find my first bug: my Laptop's screen stopped waking up from sleep.

## How it went down

Finding this bug was easy; I just had to put myself in the position to find it (by running the Linux Kernel compiled straight from source).

The Linux Kernel development follows a cyclical pattern.
Every cycle starts with a **Merge Window** lasting two weeks, during which new features reviewed by maintainers are merged into the Mainline tree (Linus Torvald's repository). After that, a **Stabilisation Window** of 6 to 8 weeks follows, where only regressions and bug fixes are addressed (in the Mainline).

I first found this bug just as the Linux 7.0 Merge Window opened. The symptom was clear: the Laptop worked well until I closed it. When opening back up, the screen wouldn't turn on. Interestingly, when I enabled the SSH server and connected to my Laptop from my Desktop, the connection resumed after reopening it, and I could confirm the machine was running, but without a screen.

## Start of the (blind) investigation

When I figured out I could maintain the SSH connection to my Laptop after sleep/resume, I started reading the kernel log with `dmesg -w`.
Part of the investigation process was my test cycle: I turned the Laptop on, connected via SSH, started watching the logs, closed it, and reopened it. I kept repeating right until the end.

The first logs I collected showed a blood-red stack trace, a few errors, and timeout messages.
I started exploring the code paths that appeared in these logs. This was a huge waste of time. I was trying to follow confusing code paths with a bunch of acronyms I'd never seen before.

My second approach was to log (`printk`) messages in all the functions listed in the logs and manually trace their callers.
One challenge with this approach was identifying the functions that were used as methods in the Kernel's Object-Oriented model.
This was very verbose and led me to spend a lot of time reading code, but I didn't get any real results.

It was only after that that I decided to contact my colleague, [David Tadokoro](https://davidbtadokoro.github.io). He suggested a different approach: git bisect.
At this point, I decided to send my public report, announcing I would attempt to bisect it: check [My bug report in the Mailing list](https://lore.kernel.org/amd-gfx/DGQ49PK0QE7U.3O1AQPSD6NI7I@rcpassos.me/).

## Git Bisect

Bisect is an amazing git command. I had heard about it, but never used it.
The basic idea is: you should know two git commits: one where the error is definitely present, and another where it isn't.
The `git bisect` command will start a binary search, giving you new commits to test between the two.
If the name "binary search" did not make your eyes shine, remember it has $O(\log n)$ complexity! In this case, $n$ is the number of commits in your range. This saves a lot of time.

So I had a known bad commit, and I chose a good commit by date (since I knew the approximate date I last built the Kernel).
The bisection process was the same cycle I used in the previous section, with a `git bisect good/bad` after each result.

This process gave me a clear answer: the failing commit was [drm/amd/display: Migrate DCCG registers access from hwseq to dccg component. (4c595e)](https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/commit/?id=4c595e75110ece20af3a68c1ebef8ed4c1b69afe). It worked before it, fails after it.

## Debugging

With 21 files changed, 143 insertions, and 55 deletions, this commit was not exactly simple to understand.
And I had never read code from the `amddrm` subsystem before.
I started repeating the ideas from before: adding `printk` to all functions changed by this commit, and to their callers as well.
But this time, this helped me filter what functions my hardware uses.

These drivers share a lot of code. My affected card uses the `dcn21` driver, but most of its code uses the `dcn20` implementation. At this point, I had no idea whether this bug affected only my chip or others as well. But I did find the exact point where the failure occurred.
It was a register being read from two different sources, and yielding different results.

After reaching that conclusion, I decided not to solve this issue alone. I [send a response on the mailing list](https://lore.kernel.org/amd-gfx/DGTZWNGLPVI3.108P2EKGFCO2R@rcpassos.me/), sharing my findings and my intention to keep investigating to fix it.

The last email was sent on a Wednesday. When Friday came, I met again with my colleague David and showed him what I had. We only stopped on Saturday evening.
We [sent a patch](https://lore.kernel.org/amd-gfx/20260308000515.890688-1-rafael@rcpassos.me/)!
It had everything we could understand, and a section with everything we didn't know. And we expected to change it after the maintainers' revision.

Before explaining what we did, I should explain what the original patch did.
There are a few different abstractions on top of these GPU drivers.
The affected function used to call the register read from the "hwseq" layer. The change migrated it to the "dccg" component, which seems to be cleaner.

What we got right:

- We found a register missing from the definition in this new module. The `MICROSECOND_TIME_BASE_DIV` register address was set to the structs by a few macros in "hwseq", but not in "dccg". We added it.
- The init function was overwriting a value in the register (and this was on the wrong offset).
- The `dcn21_s0i3_golden_init_wa` function expected to find the `0x120464` value, but the init function was setting `0x120264`. We added a new `init` function specific to this driver (because we couldn't know if other cards were affected), and it set the value expected by the check.

Turns out a developer had sent his changes in the middle of a larger patchset (still unmerged), and did not update our thread.
In his changes, he added a few other registers that were missing, and actually stopped setting the value in the init function. This value was set in the BIOS, and there was no need to set it again in the Kernel (the change we made to the init function was unnecessary).


## Conclusion

We learned a lot, and it was very fun to work with my colleague.
But we didn't land a nice bugfix patch.
At least we got a [response in our thread](https://lore.kernel.org/amd-gfx/ad3244e8-96a0-4d60-9047-cc20720c6dd2@amd.com/) with a Thank You :).
Wish us better luck next time!
