/* empty css                                                    */function W(){}function me(e){return e()}function fe(){return Object.create(null)}function $(e){e.forEach(me)}function pe(e){return typeof e=="function"}function he(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function we(e){return Object.keys(e).length===0}let ee=!1;function be(){ee=!0}function Ce(){ee=!1}function ze(e,t,n,l){for(;e<t;){const r=e+(t-e>>1);n(r)<=l?e=r+1:t=r}return e}function Ee(e){if(e.hydrate_init)return;e.hydrate_init=!0;let t=e.childNodes;if(e.nodeName==="HEAD"){const a=[];for(let o=0;o<t.length;o++){const _=t[o];_.claim_order!==void 0&&a.push(_)}t=a}const n=new Int32Array(t.length+1),l=new Int32Array(t.length);n[0]=-1;let r=0;for(let a=0;a<t.length;a++){const o=t[a].claim_order,_=(r>0&&t[n[r]].claim_order<=o?r+1:ze(1,r,m=>t[n[m]].claim_order,o))-1;l[a]=n[_]+1;const f=_+1;n[f]=a,r=Math.max(f,r)}const s=[],i=[];let u=t.length-1;for(let a=n[r]+1;a!=0;a=l[a-1]){for(s.push(t[a-1]);u>=a;u--)i.push(t[u]);u--}for(;u>=0;u--)i.push(t[u]);s.reverse(),i.sort((a,o)=>a.claim_order-o.claim_order);for(let a=0,o=0;a<i.length;a++){for(;o<s.length&&i[a].claim_order>=s[o].claim_order;)o++;const _=o<s.length?s[o]:null;e.insertBefore(i[a],_)}}function w(e,t){if(ee){for(Ee(e),(e.actual_end_child===void 0||e.actual_end_child!==null&&e.actual_end_child.parentElement!==e)&&(e.actual_end_child=e.firstChild);e.actual_end_child!==null&&e.actual_end_child.claim_order===void 0;)e.actual_end_child=e.actual_end_child.nextSibling;t!==e.actual_end_child?(t.claim_order!==void 0||t.parentNode!==e)&&e.insertBefore(t,e.actual_end_child):e.actual_end_child=t.nextSibling}else(t.parentNode!==e||t.nextSibling!==null)&&e.appendChild(t)}function j(e,t,n){ee&&!n?w(e,t):(t.parentNode!==e||t.nextSibling!=n)&&e.insertBefore(t,n||null)}function g(e){e.parentNode.removeChild(e)}function k(e){return document.createElement(e)}function O(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function H(e){return document.createTextNode(e)}function ce(){return H("")}function c(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function p(e){return Array.from(e.childNodes)}function ke(e){e.claim_info===void 0&&(e.claim_info={last_index:0,total_claimed:0})}function _e(e,t,n,l,r=!1){ke(e);const s=(()=>{for(let i=e.claim_info.last_index;i<e.length;i++){const u=e[i];if(t(u)){const a=n(u);return a===void 0?e.splice(i,1):e[i]=a,r||(e.claim_info.last_index=i),u}}for(let i=e.claim_info.last_index-1;i>=0;i--){const u=e[i];if(t(u)){const a=n(u);return a===void 0?e.splice(i,1):e[i]=a,r?a===void 0&&e.claim_info.last_index--:e.claim_info.last_index=i,u}}return l()})();return s.claim_order=e.claim_info.total_claimed,e.claim_info.total_claimed+=1,s}function de(e,t,n,l){return _e(e,r=>r.nodeName===t,r=>{const s=[];for(let i=0;i<r.attributes.length;i++){const u=r.attributes[i];n[u.name]||s.push(u.name)}s.forEach(i=>r.removeAttribute(i))},()=>l(t))}function M(e,t,n){return de(e,t,n,k)}function B(e,t,n){return de(e,t,n,O)}function J(e,t){return _e(e,n=>n.nodeType===3,n=>{const l=""+t;if(n.data.startsWith(l)){if(n.data.length!==l.length)return n.splitText(l.length)}else n.data=l},()=>H(t),!0)}function K(e,t,n){e.classList[n?"add":"remove"](t)}let re;function R(e){re=e}const D=[],se=[],U=[],oe=[],Me=Promise.resolve();let ne=!1;function Ae(){ne||(ne=!0,Me.then(ge))}function le(e){U.push(e)}const te=new Set;let Q=0;function ge(){const e=re;do{for(;Q<D.length;){const t=D[Q];Q++,R(t),Ne(t.$$)}for(R(null),D.length=0,Q=0;se.length;)se.pop()();for(let t=0;t<U.length;t+=1){const n=U[t];te.has(n)||(te.add(n),n())}U.length=0}while(D.length);for(;oe.length;)oe.pop()();ne=!1,te.clear(),R(e)}function Ne(e){if(e.fragment!==null){e.update(),$(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(le)}}const x=new Set;let Oe;function S(e,t){e&&e.i&&(x.delete(e),e.i(t))}function T(e,t,n,l){if(e&&e.o){if(x.has(e))return;x.add(e),Oe.c.push(()=>{x.delete(e),l&&(n&&e.d(1),l())}),e.o(t)}else l&&l()}function G(e){e&&e.c()}function I(e,t){e&&e.l(t)}function V(e,t,n,l){const{fragment:r,on_mount:s,on_destroy:i,after_update:u}=e.$$;r&&r.m(t,n),l||le(()=>{const a=s.map(me).filter(pe);i?i.push(...a):$(a),e.$$.on_mount=[]}),u.forEach(le)}function L(e,t){const n=e.$$;n.fragment!==null&&($(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function Se(e,t){e.$$.dirty[0]===-1&&(D.push(e),Ae(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function ye(e,t,n,l,r,s,i,u=[-1]){const a=re;R(e);const o=e.$$={fragment:null,ctx:null,props:s,update:W,not_equal:r,bound:fe(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(a?a.$$.context:[])),callbacks:fe(),dirty:u,skip_bound:!1,root:t.target||a.$$.root};i&&i(o.root);let _=!1;if(o.ctx=n?n(e,t.props||{},(f,m,...d)=>{const v=d.length?d[0]:m;return o.ctx&&r(o.ctx[f],o.ctx[f]=v)&&(!o.skip_bound&&o.bound[f]&&o.bound[f](v),_&&Se(e,f)),m}):[],o.update(),_=!0,$(o.before_update),o.fragment=l?l(o.ctx):!1,t.target){if(t.hydrate){be();const f=p(t.target);o.fragment&&o.fragment.l(f),f.forEach(g)}else o.fragment&&o.fragment.c();t.intro&&S(e.$$.fragment),V(e,t.target,t.anchor,t.customElement),Ce(),ge()}R(a)}class ve{$destroy(){L(this,1),this.$destroy=W}$on(t,n){const l=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return l.push(n),()=>{const r=l.indexOf(n);r!==-1&&l.splice(r,1)}}$set(t){this.$$set&&!we(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const Z=parseFloat;function ie(e,t=";"){let n;if(Array.isArray(e))n=e.filter(l=>l);else{n=[];for(const l in e)e[l]&&n.push(`${l}:${e[l]}`)}return n.join(t)}function Ve(e,t,n,l){let r,s;const i="1em";let u,a,o,_="-.125em";const f="visible";return l&&(o="center",s="1.25em"),n&&(r=n),t&&(t=="lg"?(a="1.33333em",u=".75em",_="-.225em"):t=="xs"?a=".75em":t=="sm"?a=".875em":a=t.replace("x","em")),ie([ie({float:r,width:s,height:i,"line-height":u,"font-size":a,"text-align":o,"vertical-align":_,"transform-origin":"center",overflow:f}),e])}function Le(e,t,n,l,r,s=1,i="",u=""){let a=1,o=1;return r&&(r=="horizontal"?a=-1:r=="vertical"?o=-1:a=o=-1),ie([`translate(${Z(t)*s}${i},${Z(n)*s}${i})`,`scale(${a*Z(e)},${o*Z(e)})`,l&&`rotate(${l}${u})`]," ")}function ue(e){let t,n,l,r,s,i,u,a;function o(m,d){return typeof m[10][4]=="string"?Be:He}let _=o(e),f=_(e);return{c(){t=O("svg"),n=O("g"),l=O("g"),f.c(),this.h()},l(m){t=B(m,"svg",{id:!0,class:!0,style:!0,viewBox:!0,"aria-hidden":!0,role:!0,xmlns:!0});var d=p(t);n=B(d,"g",{transform:!0,"transform-origin":!0});var v=p(n);l=B(v,"g",{transform:!0});var z=p(l);f.l(z),z.forEach(g),v.forEach(g),d.forEach(g),this.h()},h(){c(l,"transform",e[12]),c(n,"transform",r="translate("+e[10][0]/2+" "+e[10][1]/2+")"),c(n,"transform-origin",s=e[10][0]/4+" 0"),c(t,"id",i=e[1]||void 0),c(t,"class",u="svelte-fa "+e[0]+" svelte-1cj2gr0"),c(t,"style",e[11]),c(t,"viewBox",a="0 0 "+e[10][0]+" "+e[10][1]),c(t,"aria-hidden","true"),c(t,"role","img"),c(t,"xmlns","http://www.w3.org/2000/svg"),K(t,"pulse",e[4]),K(t,"spin",e[3])},m(m,d){j(m,t,d),w(t,n),w(n,l),f.m(l,null)},p(m,d){_===(_=o(m))&&f?f.p(m,d):(f.d(1),f=_(m),f&&(f.c(),f.m(l,null))),d&4096&&c(l,"transform",m[12]),d&1024&&r!==(r="translate("+m[10][0]/2+" "+m[10][1]/2+")")&&c(n,"transform",r),d&1024&&s!==(s=m[10][0]/4+" 0")&&c(n,"transform-origin",s),d&2&&i!==(i=m[1]||void 0)&&c(t,"id",i),d&1&&u!==(u="svelte-fa "+m[0]+" svelte-1cj2gr0")&&c(t,"class",u),d&2048&&c(t,"style",m[11]),d&1024&&a!==(a="0 0 "+m[10][0]+" "+m[10][1])&&c(t,"viewBox",a),d&17&&K(t,"pulse",m[4]),d&9&&K(t,"spin",m[3])},d(m){m&&g(t),f.d()}}}function He(e){let t,n,l,r,s,i,u,a,o,_;return{c(){t=O("path"),i=O("path"),this.h()},l(f){t=B(f,"path",{d:!0,fill:!0,"fill-opacity":!0,transform:!0}),p(t).forEach(g),i=B(f,"path",{d:!0,fill:!0,"fill-opacity":!0,transform:!0}),p(i).forEach(g),this.h()},h(){c(t,"d",n=e[10][4][0]),c(t,"fill",l=e[6]||e[2]||"currentColor"),c(t,"fill-opacity",r=e[9]!=!1?e[7]:e[8]),c(t,"transform",s="translate("+e[10][0]/-2+" "+e[10][1]/-2+")"),c(i,"d",u=e[10][4][1]),c(i,"fill",a=e[5]||e[2]||"currentColor"),c(i,"fill-opacity",o=e[9]!=!1?e[8]:e[7]),c(i,"transform",_="translate("+e[10][0]/-2+" "+e[10][1]/-2+")")},m(f,m){j(f,t,m),j(f,i,m)},p(f,m){m&1024&&n!==(n=f[10][4][0])&&c(t,"d",n),m&68&&l!==(l=f[6]||f[2]||"currentColor")&&c(t,"fill",l),m&896&&r!==(r=f[9]!=!1?f[7]:f[8])&&c(t,"fill-opacity",r),m&1024&&s!==(s="translate("+f[10][0]/-2+" "+f[10][1]/-2+")")&&c(t,"transform",s),m&1024&&u!==(u=f[10][4][1])&&c(i,"d",u),m&36&&a!==(a=f[5]||f[2]||"currentColor")&&c(i,"fill",a),m&896&&o!==(o=f[9]!=!1?f[8]:f[7])&&c(i,"fill-opacity",o),m&1024&&_!==(_="translate("+f[10][0]/-2+" "+f[10][1]/-2+")")&&c(i,"transform",_)},d(f){f&&g(t),f&&g(i)}}}function Be(e){let t,n,l,r;return{c(){t=O("path"),this.h()},l(s){t=B(s,"path",{d:!0,fill:!0,transform:!0}),p(t).forEach(g),this.h()},h(){c(t,"d",n=e[10][4]),c(t,"fill",l=e[2]||e[5]||"currentColor"),c(t,"transform",r="translate("+e[10][0]/-2+" "+e[10][1]/-2+")")},m(s,i){j(s,t,i)},p(s,i){i&1024&&n!==(n=s[10][4])&&c(t,"d",n),i&36&&l!==(l=s[2]||s[5]||"currentColor")&&c(t,"fill",l),i&1024&&r!==(r="translate("+s[10][0]/-2+" "+s[10][1]/-2+")")&&c(t,"transform",r)},d(s){s&&g(t)}}}function je(e){let t,n=e[10][4]&&ue(e);return{c(){n&&n.c(),t=ce()},l(l){n&&n.l(l),t=ce()},m(l,r){n&&n.m(l,r),j(l,t,r)},p(l,[r]){l[10][4]?n?n.p(l,r):(n=ue(l),n.c(),n.m(t.parentNode,t)):n&&(n.d(1),n=null)},i:W,o:W,d(l){n&&n.d(l),l&&g(t)}}}function Xe(e,t,n){let{class:l=""}=t,{id:r=""}=t,{style:s=""}=t,{icon:i}=t,{size:u=""}=t,{color:a=""}=t,{fw:o=!1}=t,{pull:_=""}=t,{scale:f=1}=t,{translateX:m=0}=t,{translateY:d=0}=t,{rotate:v=""}=t,{flip:z=!1}=t,{spin:C=!1}=t,{pulse:E=!1}=t,{primaryColor:A=""}=t,{secondaryColor:y=""}=t,{primaryOpacity:N=1}=t,{secondaryOpacity:X=.4}=t,{swapOpacity:b=!1}=t,Y,F,P;return e.$$set=h=>{"class"in h&&n(0,l=h.class),"id"in h&&n(1,r=h.id),"style"in h&&n(13,s=h.style),"icon"in h&&n(14,i=h.icon),"size"in h&&n(15,u=h.size),"color"in h&&n(2,a=h.color),"fw"in h&&n(16,o=h.fw),"pull"in h&&n(17,_=h.pull),"scale"in h&&n(18,f=h.scale),"translateX"in h&&n(19,m=h.translateX),"translateY"in h&&n(20,d=h.translateY),"rotate"in h&&n(21,v=h.rotate),"flip"in h&&n(22,z=h.flip),"spin"in h&&n(3,C=h.spin),"pulse"in h&&n(4,E=h.pulse),"primaryColor"in h&&n(5,A=h.primaryColor),"secondaryColor"in h&&n(6,y=h.secondaryColor),"primaryOpacity"in h&&n(7,N=h.primaryOpacity),"secondaryOpacity"in h&&n(8,X=h.secondaryOpacity),"swapOpacity"in h&&n(9,b=h.swapOpacity)},e.$$.update=()=>{e.$$.dirty&16384&&n(10,Y=i&&i.icon||[0,0,"",[],""]),e.$$.dirty&237568&&n(11,F=Ve(s,u,_,o)),e.$$.dirty&8126464&&n(12,P=Le(f,m,d,v,z,512))},[l,r,a,C,E,A,y,N,X,b,Y,F,P,s,i,u,o,_,f,m,d,v,z]}class q extends ve{constructor(t){super(),ye(this,t,Xe,je,he,{class:0,id:1,style:13,icon:14,size:15,color:2,fw:16,pull:17,scale:18,translateX:19,translateY:20,rotate:21,flip:22,spin:3,pulse:4,primaryColor:5,secondaryColor:6,primaryOpacity:7,secondaryOpacity:8,swapOpacity:9})}}/*!
 * Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2022 Fonticons, Inc.
 */var Ye={prefix:"fab",iconName:"github",icon:[496,512,[],"f09b","M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"]},Fe={prefix:"fab",iconName:"linkedin",icon:[448,512,[],"f08c","M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"]},Pe={prefix:"fab",iconName:"medium",icon:[640,512,[62407,"medium-m"],"f23a","M180.5 74.26C80.81 74.26 0 155.6 0 256S80.82 437.7 180.5 437.7 361 356.4 361 256 280.2 74.26 180.5 74.26zm288.3 10.65c-49.85 0-90.25 76.62-90.25 171.1s40.41 171.1 90.25 171.1 90.25-76.62 90.25-171.1H559C559 161.5 518.6 84.91 468.8 84.91zm139.5 17.82c-17.53 0-31.74 68.63-31.74 153.3s14.2 153.3 31.74 153.3S640 340.6 640 256C640 171.4 625.8 102.7 608.3 102.7z"]},Te=Pe,Ge={prefix:"fab",iconName:"stack-overflow",icon:[384,512,[],"f16c","M290.7 311L95 269.7 86.8 309l195.7 41zm51-87L188.2 95.7l-25.5 30.8 153.5 128.3zm-31.2 39.7L129.2 179l-16.7 36.5L293.7 300zM262 32l-32 24 119.3 160.3 32-24zm20.5 328h-200v39.7h200zm39.7 80H42.7V320h-40v160h359.5V320h-40z"]};/*!
 * Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2022 Fonticons, Inc.
 */var Ie={prefix:"fas",iconName:"envelope-open-text",icon:[512,512,[],"f658","M256 417.1c-16.38 0-32.88-4.1-46.88-15.12L0 250.9v213.1C0 490.5 21.5 512 48 512h416c26.5 0 48-21.5 48-47.1V250.9l-209.1 151.1C288.9 412 272.4 417.1 256 417.1zM493.6 163C484.8 156 476.4 149.5 464 140.1v-44.12c0-26.5-21.5-48-48-48l-77.5 .0016c-3.125-2.25-5.875-4.25-9.125-6.5C312.6 29.13 279.3-.3732 256 .0018C232.8-.3732 199.4 29.13 182.6 41.5c-3.25 2.25-6 4.25-9.125 6.5L96 48c-26.5 0-48 21.5-48 48v44.12C35.63 149.5 27.25 156 18.38 163C6.75 172 0 186 0 200.8v10.62l96 69.37V96h320v184.7l96-69.37V200.8C512 186 505.3 172 493.6 163zM176 255.1h160c8.836 0 16-7.164 16-15.1c0-8.838-7.164-16-16-16h-160c-8.836 0-16 7.162-16 16C160 248.8 167.2 255.1 176 255.1zM176 191.1h160c8.836 0 16-7.164 16-16c0-8.838-7.164-15.1-16-15.1h-160c-8.836 0-16 7.162-16 15.1C160 184.8 167.2 191.1 176 191.1z"]};function qe(e){let t,n,l,r,s,i,u,a,o,_,f,m,d,v,z,C,E,A;return s=new q({props:{icon:Ye}}),a=new q({props:{icon:Ge}}),f=new q({props:{icon:Fe}}),v=new q({props:{icon:Te}}),E=new q({props:{icon:Ie}}),{c(){t=k("main"),n=k("h1"),l=k("span"),r=k("a"),G(s.$$.fragment),i=H(`
      \xA0
      `),u=k("a"),G(a.$$.fragment),o=H(`
      \xA0
      `),_=k("a"),G(f.$$.fragment),m=H(`
      \xA0
      
      `),d=k("a"),G(v.$$.fragment),z=H(`
      \xA0
      `),C=k("a"),G(E.$$.fragment),this.h()},l(y){t=M(y,"MAIN",{});var N=p(t);n=M(N,"H1",{});var X=p(n);l=M(X,"SPAN",{class:!0});var b=p(l);r=M(b,"A",{class:!0,href:!0,title:!0,target:!0});var Y=p(r);I(s.$$.fragment,Y),Y.forEach(g),i=J(b,`
      \xA0
      `),u=M(b,"A",{class:!0,href:!0,title:!0,target:!0});var F=p(u);I(a.$$.fragment,F),F.forEach(g),o=J(b,`
      \xA0
      `),_=M(b,"A",{class:!0,href:!0,title:!0,target:!0});var P=p(_);I(f.$$.fragment,P),P.forEach(g),m=J(b,`
      \xA0
      
      `),d=M(b,"A",{class:!0,href:!0,title:!0,target:!0});var h=p(d);I(v.$$.fragment,h),h.forEach(g),z=J(b,`
      \xA0
      `),C=M(b,"A",{class:!0,href:!0,title:!0,target:!0});var ae=p(C);I(E.$$.fragment,ae),ae.forEach(g),b.forEach(g),X.forEach(g),N.forEach(g),this.h()},h(){c(r,"class","icon svelte-cwillh"),c(r,"href","https://github.com/auyer/"),c(r,"title","GitHub Page"),c(r,"target","_blank"),c(u,"class","icon svelte-cwillh"),c(u,"href","https://stackoverflow.com/users/5621569/auyer?tab=profile"),c(u,"title","Stack Overflow Profile"),c(u,"target","_blank"),c(_,"class","icon svelte-cwillh"),c(_,"href","https://www.linkedin.com/in/passosRafael"),c(_,"title","Follow on Linkedin"),c(_,"target","_blank"),c(d,"class","icon svelte-cwillh"),c(d,"href","https://medium.com/@rcpassos"),c(d,"title","Follow on Medium"),c(d,"target","_blank"),c(C,"class","icon svelte-cwillh"),c(C,"href","mailto:rafael@rcpassos.me"),c(C,"title","Email Me"),c(C,"target","_blank"),c(l,"class","role svelte-cwillh")},m(y,N){j(y,t,N),w(t,n),w(n,l),w(l,r),V(s,r,null),w(l,i),w(l,u),V(a,u,null),w(l,o),w(l,_),V(f,_,null),w(l,m),w(l,d),V(v,d,null),w(l,z),w(l,C),V(E,C,null),A=!0},p:W,i(y){A||(S(s.$$.fragment,y),S(a.$$.fragment,y),S(f.$$.fragment,y),S(v.$$.fragment,y),S(E.$$.fragment,y),A=!0)},o(y){T(s.$$.fragment,y),T(a.$$.fragment,y),T(f.$$.fragment,y),T(v.$$.fragment,y),T(E.$$.fragment,y),A=!1},d(y){y&&g(t),L(s),L(a),L(f),L(v),L(E)}}}class Re extends ve{constructor(t){super(),ye(this,t,null,qe,he,{})}}export{Re as default};
