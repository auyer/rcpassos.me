import{_ as r}from"./preload-helper-41c905a7.js";const n=(e,t)=>{const o=e[t];return o?typeof o=="function"?o():Promise.resolve(o):new Promise((u,i)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(i.bind(null,new Error("Unknown variable dynamic import: "+t)))})};async function s({data:e}){const t=e.post.isIndexFile?await n(Object.assign({"../../../../posts/latex-with-vscode/index.md":()=>r(()=>import("./index-7af46496.js"),["./index-7af46496.js","./index-998a520c.js"],import.meta.url)}),`../../../../posts/${e.post.slug}/index.md`):await n(Object.assign({}),`../../../../posts/${e.post.slug}.md`);return{post:e.post,component:t.default,layout:{fullWidth:!0}}}const p=Object.freeze(Object.defineProperty({__proto__:null,load:s},Symbol.toStringTag,{value:"Module"}));export{p as _,s as l};