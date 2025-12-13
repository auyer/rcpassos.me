---
title: Recover a Just-Deleted/Overwritten Text File in Linux, Without GUI
date: 2025-12-13
---

## First, the mistake

I was changing my fstab from the tty, after moving my home partition.
To get the disk UUID, I used the following command

```bash
#  DO NOT RUN THIS (the "f" typo is intentional, in case anyone copies it)
blkid | grep n1p2 | awk '{print $3}' > /etf/fstab
```

If you noticed the `>` redirection after the awk output, you know I just replaced my `/etc/fstab` with a single useless UUID.
What I should have done is use `>>`, to append the UUID to the end.

## What now ?

I knew thee data was probably still stored in disk.
I was on the tty, with nothing running in my system.

I found this solution in Superuser.com(StackExchange): <https://superuser.com/a/415388/644470>, and decided to give a more step-by-step guide.
Thanks Durval Menezes, life saviour.

### Finding the file contents

Turns out the `strings` command can be pointed to a block device (the representation of the raw disk).

In my case, the disk was in `/dev/mapper/luks-idX...`, because it was an encrypted disk, and this was pointing to its decrypted data.
Unencrypted disks would be under `/dev/nvmeX...` or `/dev/sdX...`.

So I used the `strings` to read the device, and redirected the data to the `less` command:

```bash
strings /dev/mapper/luks-idX | less
```

Inside the `less` interface, I can search for a string with `/<string>`, like in `vim`.

Searching for `/fstab` yielded too many results. but `/subvol=` geve me the exact match (because this is the syntax to mount a btrfs subvolume).

### Copying the contents (from inside `less`)

If I was on the GUI, easy. Select and copy, than paste it on my editor.
I was on the tty, no easy way out.

Luckily, the same saviour gave me the solution. But I had to learn how to use it.

Turns out there is a way to mark the current cursor position in `less`, to use it somewhere else.
Here is the step by step:

1. move the desired line to the top of the window (the start of the cursor).
2. press `m`, followed by a letter of your choice. In my case, `mx`; This starts a mark with the letter `x`, to be used latter.
3. move the window to have the last desired line in the bottom of the screen (the last line snown by `less`.
4. press `|x` (x being the letter chosen), followed by the command that will use this stream of data. In my case, `cat >> recover.txt`, and enter..
5. quit less by pressing `q`

Now I was able to check, edit, and copy my `fstab` to boot.
