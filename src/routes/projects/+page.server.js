import { posts } from '$lib/data/posts';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  let projects = [
    {
      name:"Protonup-rs",
      description: "A Rust app to Install and Update GE-Proton for Steam, and Wine-GE for Lutris",
      link: "https://github.com/auyer/Protonup-rs",
      cta: "github.com/auyer/Protonup-rs"
    },
    {
      name:"Steganography Lib",
      description: "Pure Golang Library that allows LSB steganography on images using ZERO dependencies",
      link: "https://github.com/auyer/steganography",
      cta: "github.com/auyer/steganography"
    },
    {
      name:"MemoryKV",
      description: "A KV in memory database built in Rust for learning purposes. It streams all changes using websocket. The demo is hosted in a tiny free-tier instance. <br><b>But go check the Demo! It's fun!</b><br>Open it in two tabs, or two devices for a more interesting experience.",
      link: "/projects/kv",
      cta: "Check the live demo here"
    },
    {
      name:"Linux Patches",
      description: "I want to contribute more to the Linux kernel, but I only have small janitor style patches for now.",
      link: "https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/log/?qt=author&q=Rafael+Passos",
      cta: "Check my patches upstream"
    },
    {
      name:"Lagoinha-rs",
      description: "Rust library that retrieve Addresses from the Brazilian Postal Code (CEP) using multiple APIs asynchronously, returning the result from the first one to respond.",
      link: "https://github.com/auyer/lagoinha-rs",
      cta: "github.com/auyer/lagoinha-rs"
    },
  ];

	return {
		projects: projects,
	};
}
