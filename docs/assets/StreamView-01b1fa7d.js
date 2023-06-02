import{w as l,d as V,r as S,e as G,f as j,o as c,c as d,u as k,g as L,F as w,h as g,n as H,t as b,_ as $,i as I,a as n,j as p,p as E,k as O,l as X}from"./index-6ef5592e.js";const Y=async s=>{if(s.length===0)return"0-0";let e="0-999999999999";for(const o of s){const t=await z(o);e=K(t,e)}return e},z=async s=>{const e=await l.send(`XPENDING mystream ${s.name}`);if(console.log("result: ",e),e.XPENDING.msgs===0)return s.info[7];if(e.XPENDING.idmin)return"0-"+(+e.XPENDING.idmin.substring(2)-1);throw new Error("cannot get the housekeeping max id")},K=(s,e)=>{const o=+s.substring(2),t=+e.substring(2);return o<t?s:e},q=async s=>{const e=await l.send(`TYPE ${s}`);return console.log("result: ",e),e.TYPE[1]==="stream"},N=V("stream",()=>{const s=S(!1),e=S([]),o=S([]),t=S("0-0"),u=async()=>{await l.send("XADD mystream 0-* x 10 y 3"),await r()},a=async()=>{await l.send("DEL mystream"),await r()},v=()=>{e.value=[],o.value=[],t.value="0-0"},r=async()=>{if(console.log("refresh"),s.value=await q("mystream"),!s.value){v();return}const i=await l.send("XRANGE mystream - +");e.value=i.XRANGE;const _=await l.send("XINFO GROUPS mystream");if(!(_.XINFO.length===2&&_.XINFO[0]===!1)){o.value=_.XINFO.map(f=>({name:f[1],info:f,consumers:[]}));for(const f of o.value){const D=await l.send(`XINFO CONSUMERS mystream ${f.name}`);console.log("consumerListResult: ",D),f.consumers=D.XINFO.map(C=>({name:C[1],info:C,pendings:[]}));const A=await l.send(`XPENDING mystream ${f.name} - + ${f.info[5]}`);console.log("pendingResult: ",A);for(const C of A.XPENDING){console.log("pendingInfo: ",C);const U=C.owner,F=f.consumers.find(B=>B.name===U);if(F===void 0){console.log("consumer not found: ",U);continue}F.pendings.push(C)}}console.log("consumerGroups.value: ",o.value),t.value=await Y(o.value)}};return{exists:s,items:e,consumerGroups:o,maxHousekeepingId:t,refresh:r,add:u,reset:a,createConsumerGroup:async i=>{await l.send(`XGROUP CREATE mystream ${i} 0-0`),r()},deleteConsumerGroup:async i=>{await l.send(`XGROUP DESTROY mystream ${i}`),r()},createConsumer:async(i,_)=>{await l.send(`XGROUP CREATECONSUMER mystream ${i} ${_}`),r()},removeConsumer:async(i,_)=>{await l.send(`XGROUP DELCONSUMER mystream ${i} ${_}`),r()},pickOne:async(i,_)=>{await l.send(`XREADGROUP GROUP ${i} ${_} COUNT 1 STREAMS mystream >`),r()},ack:async(i,_)=>{await l.send(`XACK mystream ${i} ${_}`),r()},cleanProcessed:async()=>{const i=await l.send(`XRANGE mystream - ${t.value}`);console.log("result: ",i);const _=i.XRANGE.map(f=>f.id);await l.send(`XDEL mystream ${_.join(" ")}`),r()},claim:async(i,_)=>{await l.send(`XAUTOCLAIM mystream ${i} ${_} 10000 0-0 COUNT 1`),r()}}}),J={class:"stream"},Q={key:0,class:"no-stream"},W=G({__name:"StreamObject",setup(s){const e=(t,u)=>{console.log("canBeFlushed id: ",t,"x",u);const a=+t.substring(2),v=+u.substring(2);return a<=v},o=N();return j(async()=>{await o.refresh()}),(t,u)=>(c(),d("div",J,[k(o).exists?L("",!0):(c(),d("div",Q,"No Stream")),(c(!0),d(w,null,g(k(o).items,a=>(c(),d("div",{class:H({item:!0,flushable:e(a.id,k(o).maxHousekeepingId)}),key:a.id},b(a.id.substring(2)),3))),128))]))}});const Z=$(W,[["__scopeId","data-v-16d794cb"]]),x=s=>(E("data-v-6273e65d"),s=s(),O(),s),ee={class:"consumer"},se={class:"header"},ne=x(()=>n("span",null,"Consumer",-1)),oe={class:"main"},te={class:"keyvalue"},ae=x(()=>n("span",null,"Pick one entry",-1)),re=x(()=>n("span",null,"Claim pending >10s",-1)),ce={class:"pendings"},ue=["onClick"],ie=G({__name:"StreamConsumer",props:{consumer:{},consumerGroupName:{}},setup(s){const e=s,o=N(),t=async()=>{await o.removeConsumer(e.consumerGroupName,e.consumer.name)},u=async()=>{await o.pickOne(e.consumerGroupName,e.consumer.name)},a=async r=>{await o.ack(e.consumerGroupName,r)},v=async()=>{await o.claim(e.consumerGroupName,e.consumer.name)};return(r,m)=>{const h=I("font-awesome-icon");return c(),d("div",ee,[n("div",se,[ne,n("div",{class:"button",onClick:m[0]||(m[0]=y=>t())},[p(h,{icon:"fa-solid fa-trash-alt"})])]),n("div",oe,[n("div",te,[(c(!0),d(w,null,g(r.consumer.info,(y,R)=>(c(),d("div",{class:"item",key:R},b(y),1))),128))]),n("nav",null,[n("button",{onClick:m[1]||(m[1]=y=>u())},[p(h,{icon:"fa-solid fa-arrow-down"}),ae]),n("button",{onClick:m[2]||(m[2]=y=>v())},[p(h,{icon:"fa-solid fa-hourglass-end"}),re])]),n("div",ce,[(c(!0),d(w,null,g(r.consumer.pendings,y=>(c(),d("div",{class:"item",key:r.consumer.name+"-"+y.id,onClick:R=>a(y.id)},b(y.id.substring(2)),9,ue))),128))])])])}}});const me=$(ie,[["__scopeId","data-v-6273e65d"]]),M=s=>{let e=0;for(const o of s){const t=+o.replace(/^.*-(\d+)$/,"$1");t>e&&(e=t)}return e++,e},T=s=>(E("data-v-baad2d1f"),s=s(),O(),s),le={class:"consumer-group"},de={class:"header"},_e=T(()=>n("span",null,"Consumer Group",-1)),pe={class:"main"},fe={class:"keyvalue"},ve=T(()=>n("span",null,"Consumer",-1)),ye=G({__name:"ConsumerGroup",props:{consumerGroup:{}},setup(s){const e=s,o=async()=>{const a=M(e.consumerGroup.consumers.map(v=>v.name));await u.createConsumer(e.consumerGroup.name,`consumer-${a}`)},t=async()=>{await u.deleteConsumerGroup(e.consumerGroup.name)},u=N();return(a,v)=>{const r=I("font-awesome-icon");return c(),d("div",le,[n("div",de,[_e,n("div",{onClick:t,class:"button"},[p(r,{icon:"fa-solid fa-trash-alt"})])]),n("div",pe,[n("div",fe,[(c(!0),d(w,null,g(a.consumerGroup.info,(m,h)=>(c(),d("div",{class:"item",key:h},b(m),1))),128))]),n("nav",null,[n("button",{onClick:o},[p(r,{icon:"fa-solid fa-plus"}),ve])]),(c(!0),d(w,null,g(a.consumerGroup.consumers,m=>(c(),X(me,{key:m.name,consumer:m,"consumer-group-name":a.consumerGroup.name},null,8,["consumer","consumer-group-name"]))),128))])])}}});const he=$(ye,[["__scopeId","data-v-baad2d1f"]]),Ce={class:"consumer-group-list"},we=G({__name:"ListConsumerGroup",setup(s){const e=N();return(o,t)=>(c(),d("div",Ce,[(c(!0),d(w,null,g(k(e).consumerGroups,u=>(c(),X(he,{key:u.name,consumerGroup:u},null,8,["consumerGroup"]))),128))]))}});const ge=$(we,[["__scopeId","data-v-c110971c"]]),Ge=s=>(E("data-v-78abd35a"),s=s(),O(),s),$e={class:"consumer-groups"},Ne=Ge(()=>n("span",null,"Consumer Group",-1)),ke=G({__name:"StreamConsumerGroup",setup(s){const e=N(),o=async()=>{const t=e.consumerGroups,u=M(t.map(a=>a.name));e.createConsumerGroup(`group-${u}`)};return(t,u)=>{const a=I("font-awesome-icon");return c(),d("div",$e,[n("button",{onClick:o,title:"Add a new consumer group"},[p(a,{icon:"fa-solid fa-plus"}),Ne]),p(ge)])}}});const Se=$(ke,[["__scopeId","data-v-78abd35a"]]),P=s=>(E("data-v-cf281303"),s=s(),O(),s),be=P(()=>n("h1",null,"Streams",-1)),Ie={class:"content"},Ee={class:"buttons"},Oe=P(()=>n("span",null,"Entry",-1)),Re=P(()=>n("span",null,"Clean",-1)),Xe=G({__name:"StreamView",setup(s){const e=N(),o=async()=>{await e.add()},t=async()=>{await e.reset()},u=async()=>{await e.refresh()},a=async()=>{await e.cleanProcessed()};return(v,r)=>{const m=I("font-awesome-icon");return c(),d("main",null,[be,n("div",Ie,[n("div",Ee,[n("nav",null,[n("button",{onClick:u,title:"Refresh"},[p(m,{icon:"fa-solid fa-rotate-right"})]),n("button",{onClick:o,title:"Add a new entry to the stream"},[p(m,{icon:"fa-solid fa-plus"}),Oe]),n("button",{onClick:a},[p(m,{icon:"fa-solid fa-recycle"}),Re])]),n("nav",null,[n("button",{onClick:t,title:"Delete Stream"},[p(m,{icon:"fa-solid fa-trash-alt"})])])]),p(Z),k(e).exists?(c(),X(Se,{key:0})):L("",!0)])])}}});const Fe=$(Xe,[["__scopeId","data-v-cf281303"]]);export{Fe as default};