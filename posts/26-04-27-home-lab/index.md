---
title: 'The joy on running a Home-Lab'
date: 2026-04-27
---

Digging through my photos, I realized I have been running my home lab since March 2016 when I bought my first Raspberry Pi 3.
It was not exactly a continuous journey, since that Pi became everything from a media player to a retro gaming console.
Still, it has been a full ten years, and I have never written about it until now.

## Why run a Home Lab?

Unless someone printed this post out for you, you are using the internet right now to access services running on someone else's computer.
The beauty of a home lab is that you can choose to host those services yourself.

If you work in tech, you probably already know this, but self hosting is an incredible learning experience.
You get to run your own custom software or explore countless Free Software¹ projects built with love by the global community.

_Note¹: [Free Software](https://directory.fsf.org/wiki/Main_Page) as in the Freedom to do whatever you want with it, not price. But free of charge as well._

## Tools needed

Almost any computer will do the job perfectly.
Old desktops and laptops are amazing for this.
I have even seen people repurpose old [Android Phone](https://www.xda-developers.com/turned-old-android-phone-into-home-server-more-useful-than-raspberry-pi/) to act as their dedicated home servers.

## Tip: write things down

One practice that took me a while to adopt is writing down what I did in my lab.
When installing software for testing, it's common to have to tweak settings.
And it's even more common to forget these tweaks.

Last year, I started keeping a Journal of what I did with each test. Where are the websites that I used as reference? Where are the config files?
Written as if it were a guide for future me.
I recently decided to take this one step further, use [Ansible](https://docs.ansible.com/) to maintain these configs.
I've been using Terraform at work for years.
While it's really good at some things, deploying configs to VMs/Containers is not one of them.

My Ansible setup started messy, but I eventually found a way to organise it.
Recently, I decided to make these configs [public on GitHub](https://github.com/auyer/HomeLab) (after a good cleanup to remove secrets).
In this repository, I have Ansible and OpenTofu (Terraform) configs that represent part of what I run in my lab.
_Maybe someday I will migrate everything to it..._

## The evolution of my lab

My Raspberry Pi was where I really started experimenting with remote accessing a computer.
I was a student back then, and it was mostly a toy to play around with.

At some point, probably by mid-2017, it was replaced by an older Dell laptop. It was set up like a tent in my room, with an 80mm fan bolted to it to keep it cool.
Running a modded Minecraft server was more resource-intensive than I anticipated.

The Pi returned to being a server when I started using the Laptop to run a game, which had no Linux support... Dark times. It was the gateway I used to access both the Laptop and my desktop.

By 2019, I learned about Proxmox. This is where things started changing a lot. I ran various VMs and LXC containers in it. Even that game from before worked in a VM, but not for long.
The Pi had a new job: it was a DNS server (with [Pi-hole](https://pi-hole.net/)), and a dynamic DNS watchdog using [ddclient](https://ddclient.net/).

In the same year, I moved to a different city. This Laptop stayed behind, running in my father's home. It serves as a DNS server and also acts as my gateway, helping my family with technical support.
It was eventually replaced by an OpenWRT router, and the Laptop came back with me.

The Pi came with me and also took on a new role: my WireGuard server. At this point, only the non-default SSH and WireGuard ports were exposed in my network. Accessing my home was just a VPN click away.

I tested multiple services on the Proxmox laptop. In 2024, I bought an HP Mini pc. While compact, it has two full-size PCI ports available and two NVMe Slots.
I ran in cluster mode for a while with my Laptop and the Pi as a voting agent, but eventually I migrated everything off the Laptop.
Jellyfin was one of the services that saw a great improvement with this migration. The data was still on an external hard drive, but it could now use the iGPU to transcode media.

At the time of writing, this pc is the main machine in my lab. The PI3 is only responsible for media casting to the TV and speakers. A Raspberry Pi 5 took its place, gaining more services that were way too heavy for the 3.
The mini-PC has two PCI boards. One with 2.5GB Ethernet and another with SATA ports for the TrueNAS VM inside. Since I can pass the PCI card directly to the VM, my NAS can handle my Raid Z1 pool with minimal overhead. I keep a page up-to-date with what I run in the [/home-lab page](/home-lab).

## Just don't forget:

**The Power and Noise Factor**:
While computers are usually not the biggest power consumers in a house, older machines tend to be significantly less efficient. Noisy fans are the worst.
It is always a good idea to check how much power your gear draws and consider where you place your lab to avoid the constant hum of cooling hardware.

**The Security Warning**:
Opening ports to the internet can be risky if you are not careful. If you need to expose services, try using a reverse proxy like Nginx so you only have to open a single port for everything. You can also use secure tunnels like Netbird, Cloudflare, or Tailscale to access your lab safely without opening any ports to the public at all.

**The Backup Talk**:
Data loss is a real possibility of self-hosting, and even a robust storage setup is not a replacement for a true backup.
I personally handle this by automating backups from my TrueNAS system to an Object Storage provider.
I use a local provider called Magalu Cloud for this, which ensures my important files are safe.

## Conclusion

Do not be afraid to dive in and start your own home lab, even if it is strictly for fun.
Most importantly, do not buy unnecessary hardware right away.
Start with whatever old gear you have lying around, and expand from there once you actually need more power.
