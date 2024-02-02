(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const m of n.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&a(m)}).observe(document,{childList:!0,subtree:!0});function i(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(r){if(r.ep)return;r.ep=!0;const n=i(r);fetch(r.href,n)}})();const o=[...document.querySelectorAll(".element")],p=[...document.querySelectorAll(".card")],v=document.querySelector("html"),L=document.querySelector(".full-container"),c=document.querySelector(".info-container"),y=document.querySelector(".info"),T=document.querySelector(".indicators"),M=[...document.querySelectorAll(".indicators span")],E=document.querySelector(".indicators-button");L.addEventListener("mousewheel",e=>{e.preventDefault(),e.stopPropagation()},!1);L.addEventListener("DOMMouseScroll",e=>{e.preventDefault(),e.stopPropagation()},!1);document.body.onmousedown=function(e){if(e.button===1)return!1};E.addEventListener("click",()=>{T.scrollIntoView()});M.forEach(e=>{e.classList.contains("state-indicator")?e.style.boxShadow=`0 0 calc(0.5 * var(--scale)) calc(0.75 * var(--scale)) var(--state-${e.dataset.name})`:(e.style.boxShadow=`0 0 calc(0.5 * var(--scale)) calc(0.75 * var(--scale)) var(--type-${e.dataset.name})`,e.addEventListener("click",()=>{v.scroll(0,0),setTimeout(()=>{S(e.dataset.name)},1)}))});const l=[...y.querySelectorAll("*")],h=[...c.querySelectorAll(".info-container > p")],g=e=>{let t=o[e];c.removeAttribute("hidden"),c.style.backgroundColor=`var(--type-${t.dataset.type})`,c.style.boxShadow="0 0 calc(0.5 * var(--scale)) calc(0.5 * var(--scale)) black",y.style.backgroundColor=`var(--type-${t.dataset.type})`,y.style.boxShadow="0 0 calc(0.5 * var(--scale)) calc(0.5 * var(--scale)) black",l[0].innerHTML=e,l[1].innerHTML=t.innerHTML,l[2].innerHTML=t.dataset.name,l[3].innerHTML=t.dataset.weight;let i=document.querySelector(`.indicators span[data-name='${t.dataset.state}']`),a=document.querySelector(`.indicators span[data-name='${t.dataset.type}']`);h[0].innerHTML=`State: ${i.innerHTML}`,h[1].innerHTML=`Category: ${a.innerHTML}`},$=()=>{c.setAttribute("hidden",""),c.style.backgroundColor="",c.style.boxShadow="",y.style.backgroundColor="",y.style.boxShadow="",l[0].innerHTML="",l[1].innerHTML="",l[2].innerHTML="",l[3].innerHTML="",h[0].innerHTML="",h[1].innerHTML=""},f=e=>{e.forEach(t=>{t.style.opacity="1",t.style.transform="scale(1)",t.style.filter="brightness(1)"})},S=e=>{f(o),o.forEach(t=>{t.dataset.type!=e&&(t.style.opacity="0.5")}),p.forEach(t=>{t.dataset.type!=e&&(t.style.opacity="0.5")})};let b=0,u=0;v.addEventListener("click",()=>{c.hasAttribute("hidden")||(b<1?b++:($(),b=0),u=0),c.hasAttribute("hidden")&&(u<1&&s!=-1?u++:(f(o),f(p),s=-1,d="",u=0))});let s=-1,d="";o.forEach((e,t)=>{let i=e.dataset.type;e.classList.add(`element-${t+1}`),e.dataset.index=`${t+1}`,e.style.color=`var(--state-${e.dataset.state})`,e.style.backgroundColor=`var(--type-${e.dataset.type})`,e.style.boxShadow=` 0 0 2px 2px var(--type-${e.dataset.type})`,e.addEventListener("click",()=>{if(c.hasAttribute("hidden")){if(s==t&&(s=-1,f(o),f(p)),d==i)d="",o[s].style.transform="scale(1)",o[s].style.filter="brightness(1)",g(s),s=t;else{let a=e.dataset.type;S(a),s!=-1&&(o[s].style.transform="scale(1)",o[s].style.filter="brightness(1)")}e.style.transform="scale(1.25)",e.style.filter="brightness(1.2)",d=i,s=t,p.forEach(a=>{a.style.opacity="0.5"}),g(s)}}),e.addEventListener("mouseenter",()=>{e.style.transform="scale(1.25)",d==""&&o.forEach(a=>{a.dataset.index==`${t+1}`&&(a.style.filter="brightness(1.2)")})}),e.addEventListener("mouseleave",()=>{e.style.filter="brightness(1)",d!=""&&(o[s].style.filter="brightness(1.2)"),s!=t&&(e.style.transform="scale(1)")})});for(let e=57;e<72;e++){const t=o[e-1];t.style.gridRow="8",t.style.gridColumn=`${e-56+2}`,t.style.marginTop="calc(2 * var(--scale))"}for(let e=89;e<104;e++){const t=o[e-1];t.style.gridRow="9",t.style.gridColumn=`${e-88+2}`}