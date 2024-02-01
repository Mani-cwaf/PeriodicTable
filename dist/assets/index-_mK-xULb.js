(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const p of i.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&s(p)}).observe(document,{childList:!0,subtree:!0});function l(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=l(r);fetch(r.href,i)}})();const o=[...document.querySelectorAll(".element")],g=[...document.querySelectorAll(".card")],E=document.querySelector("html"),n=document.querySelector(".info-container"),y=document.querySelector(".info"),m=document.querySelector(".indicators"),L=document.querySelector(".indicators-button"),H=[...document.querySelectorAll(".indicators span")];let v=0;H.forEach(e=>{v<4?e.style.boxShadow=`0 0 calc(0.5 * var(--scale)) calc(0.75 * var(--scale)) var(--state-${e.dataset.name})`:e.style.boxShadow=`0 0 calc(0.5 * var(--scale)) calc(0.75 * var(--scale)) var(--type-${e.dataset.name})`,v++});let c=[...y.querySelectorAll("*")],h=[...n.querySelectorAll(".info-container > p")];const S=e=>{T();let t=o[e-1];n.removeAttribute("hidden"),n.style.backgroundColor=`var(--type-${t.dataset.type})`,n.style.boxShadow="0 0 calc(0.5 * var(--scale)) calc(0.5 * var(--scale)) black",y.style.backgroundColor=`var(--type-${t.dataset.type})`,y.style.boxShadow="0 0 calc(0.5 * var(--scale)) calc(0.5 * var(--scale)) black",c[0].innerHTML=e,c[1].innerHTML=t.innerHTML,c[2].innerHTML=t.dataset.name,c[3].innerHTML=t.dataset.weight;let l=document.querySelector(`.indicators span[data-name='${t.dataset.state}']`),s=document.querySelector(`.indicators span[data-name='${t.dataset.type}']`);h[0].innerHTML=`State: ${l.innerHTML}`,h[1].innerHTML=`Category: ${s.innerHTML}`},M=()=>{n.setAttribute("hidden",""),n.style.backgroundColor="",n.style.boxShadow="",y.style.backgroundColor="",y.style.boxShadow="",c[0].innerHTML="",c[1].innerHTML="",c[2].innerHTML="",c[3].innerHTML="",h[0].innerHTML="",h[1].innerHTML=""},T=()=>{L.innerHTML="Show Indicators",m.setAttribute("hidden","")},x=()=>{L.innerHTML="Hide Indicators",m.removeAttribute("hidden")};L.addEventListener("click",()=>{m.hasAttribute("hidden")?x():T()});let b=0,f=0;E.addEventListener("click",()=>{n.hasAttribute("hidden")||(b<1?b++:(M(),b=0),f=0),a!=0&&n.hasAttribute("hidden")&&(f<1?f++:(o.forEach(e=>{e.style.opacity="1",e.style.transform="scale(1)",e.style.filter="brightness(1)"}),g.forEach(e=>{e.style.opacity="1",e.style.transform="scale(1)",e.style.filter="brightness(1)"}),a=0,d="",f=0))});let u=1,a=0,d="";o.forEach(e=>{let t=u,l=e.dataset.type;e.classList.add(`element-${u}`),e.dataset.index=`${u}`,e.style.color=`var(--state-${e.dataset.state})`,e.style.backgroundColor=`var(--type-${e.dataset.type})`,e.style.boxShadow=` 0 0 2px 2px var(--type-${e.dataset.type})`,e.addEventListener("click",()=>{if(n.hasAttribute("hidden")){if(a==t&&(a=0,o.forEach(s=>{s.style.opacity="1",s.style.transform="scale(1)"}),g.forEach(s=>{s.style.opacity="1",s.style.transform="scale(1)"})),d==l)d="",o[a-1].style.transform="scale(1)",o[a-1].style.filter="brightness(1)",S(a),a=t;else{o.forEach(r=>{r.style.opacity="1",r.style.transform="scale(1)",e.style.filter="brightness(1)"});let s=e.dataset.type;o.forEach(r=>{r.dataset.type!=s&&(r.style.opacity="0.5")}),a!=0&&(o[a-1].style.transform="scale(1)",o[a-1].style.filter="brightness(1)")}e.style.transform="scale(1.25)",e.style.filter="brightness(1.2)",d=l,a=t,g.forEach(s=>{s.style.opacity="0.5"}),S(a)}}),e.addEventListener("mouseenter",()=>{n.hasAttribute("hidden")&&(d==""&&o.forEach(s=>{s.dataset.index==`${t}`&&(s.style.filter="brightness(1.2)")}),e.style.transform="scale(1.25)")}),e.addEventListener("mouseleave",()=>{n.hasAttribute("hidden")&&(d==""?o.forEach(s=>{s.style.filter="brightness(1)"}):o[a-1].style.filter="brightness(1.2)",a!=t&&(e.style.transform="scale(1)"))}),u++});for(let e=57;e<72;e++){const t=o[e-1];t.style.gridRow="8",t.style.gridColumn=`${e-56+2}`,t.style.marginTop="calc(2 * var(--scale))"}for(let e=89;e<104;e++){const t=o[e-1];t.style.gridRow="9",t.style.gridColumn=`${e-88+2}`}