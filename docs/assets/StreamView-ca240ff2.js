import{w as l,d as B,r as S,e as g,f as V,o as r,c as i,u as N,g as U,F as C,h as w,n as j,t as k,_ as G,i as b,a as o,j as f,p as I,k as E,l as O}from"./index-97bea82c.js";const H=async s=>{if(s.length===0)return"0-0";let e="0-999999999999";for(const n of s){const t=await Y(n);e=z(t,e)}return e},Y=async s=>{const e=await l.send(`XPENDING mystream ${s.name}`);if(console.log("result: ",e),e.XPENDING.msgs===0)return s.info[7];if(e.XPENDING.idmin)return"0-"+(+e.XPENDING.idmin.substring(2)-1);throw new Error("cannot get the housekeeping max id")},z=(s,e)=>{const n=+s.substring(2),t=+e.substring(2);return n<t?s:e},K=async s=>{const e=await l.send(`TYPE ${s}`);return console.log("result: ",e),e.TYPE[1]==="stream"},$=B("stream",()=>{const s=S(!1),e=S([]),n=S([]),t=S("0-0"),u=async()=>{await l.send("XADD mystream 0-* x 10 y 3"),await c()},a=async()=>{await l.send("DEL mystream"),await c()},d=()=>{e.value=[],n.value=[],t.value="0-0"},c=async()=>{if(console.log("refresh"),s.value=await K("mystream"),!s.value){d();return}const m=await l.send("XRANGE mystream - +");e.value=m.XRANGE;const p=await l.send("XINFO GROUPS mystream");if(!(p.XINFO.length===2&&p.XINFO[0]===!1)){n.value=p.XINFO.map(y=>({name:y[1],info:y,consumers:[]}));for(const y of n.value){const x=await l.send(`XINFO CONSUMERS mystream ${y.name}`);console.log("consumerListResult: ",x),y.consumers=x.XINFO.map(h=>({name:h[1],info:h,pendings:[]}));const P=await l.send(`XPENDING mystream ${y.name} - + ${y.info[5]}`);console.log("pendingResult: ",P);for(const h of P.XPENDING){console.log("pendingInfo: ",h);const D=h.owner,A=y.consumers.find(T=>T.name===D);if(A===void 0){console.log("consumer not found: ",D);continue}A.pendings.push(h)}}console.log("consumerGroups.value: ",n.value),t.value=await H(n.value)}};return{exists:s,items:e,consumerGroups:n,maxHousekeepingId:t,refresh:c,add:u,reset:a,createConsumerGroup:async m=>{await l.send(`XGROUP CREATE mystream ${m} 0-0`),c()},deleteConsumerGroup:async m=>{await l.send(`XGROUP DESTROY mystream ${m}`),c()},createConsumer:async(m,p)=>{await l.send(`XGROUP CREATECONSUMER mystream ${m} ${p}`),c()},removeConsumer:async(m,p)=>{await l.send(`XGROUP DELCONSUMER mystream ${m} ${p}`),c()},pickOne:async(m,p)=>{await l.send(`XREADGROUP GROUP ${m} ${p} COUNT 1 STREAMS mystream >`),c()},ack:async(m,p)=>{await l.send(`XACK mystream ${m} ${p}`),c()},cleanProcessed:async()=>{const m=await l.send(`XRANGE mystream - ${t.value}`);console.log("result: ",m);const p=m.XRANGE.map(y=>y.id);await l.send(`XDEL mystream ${p.join(" ")}`),c()}}}),q={class:"stream"},J={key:0,class:"no-stream"},Q=g({__name:"StreamObject",setup(s){const e=(t,u)=>{console.log("canBeFlushed id: ",t,"x",u);const a=+t.substring(2),d=+u.substring(2);return a<=d},n=$();return V(async()=>{await n.refresh()}),(t,u)=>(r(),i("div",q,[N(n).exists?U("",!0):(r(),i("div",J,"No Stream")),(r(!0),i(C,null,w(N(n).items,a=>(r(),i("div",{class:j({item:!0,flushable:e(a.id,N(n).maxHousekeepingId)}),key:a.id},k(a.id.substring(2)),3))),128))]))}});const W=G(Q,[["__scopeId","data-v-16d794cb"]]),F=s=>(I("data-v-83a62e1c"),s=s(),E(),s),Z={class:"consumer"},ee={class:"header"},se=F(()=>o("span",null,"Consumer",-1)),ne={class:"main"},oe={class:"keyvalue"},te=F(()=>o("span",null,"Pick one entry",-1)),ae={class:"pendings"},re=["onClick"],ce=g({__name:"StreamConsumer",props:{consumer:{},consumerGroupName:{}},setup(s){const e=s,n=$(),t=async()=>{await n.removeConsumer(e.consumerGroupName,e.consumer.name)},u=async()=>{await n.pickOne(e.consumerGroupName,e.consumer.name)},a=async d=>{await n.ack(e.consumerGroupName,d)};return(d,c)=>{const _=b("font-awesome-icon");return r(),i("div",Z,[o("div",ee,[se,o("div",{class:"button",onClick:c[0]||(c[0]=v=>t())},[f(_,{icon:"fa-solid fa-trash-alt"})])]),o("div",ne,[o("div",oe,[(r(!0),i(C,null,w(d.consumer.info,(v,R)=>(r(),i("div",{class:"item",key:R},k(v),1))),128))]),o("button",{onClick:c[1]||(c[1]=v=>u())},[f(_,{icon:"fa-solid fa-arrow-down"}),te]),o("div",ae,[(r(!0),i(C,null,w(d.consumer.pendings,v=>(r(),i("div",{class:"item",key:d.consumer.name+"-"+v.id,onClick:R=>a(v.id)},k(v.id.substring(2)),9,re))),128))])])])}}});const ue=G(ce,[["__scopeId","data-v-83a62e1c"]]),L=s=>{let e=0;for(const n of s){const t=+n.replace(/^.*-(\d+)$/,"$1");t>e&&(e=t)}return e++,e},M=s=>(I("data-v-baad2d1f"),s=s(),E(),s),ie={class:"consumer-group"},me={class:"header"},le=M(()=>o("span",null,"Consumer Group",-1)),de={class:"main"},_e={class:"keyvalue"},pe=M(()=>o("span",null,"Consumer",-1)),fe=g({__name:"ConsumerGroup",props:{consumerGroup:{}},setup(s){const e=s,n=async()=>{const a=L(e.consumerGroup.consumers.map(d=>d.name));await u.createConsumer(e.consumerGroup.name,`consumer-${a}`)},t=async()=>{await u.deleteConsumerGroup(e.consumerGroup.name)},u=$();return(a,d)=>{const c=b("font-awesome-icon");return r(),i("div",ie,[o("div",me,[le,o("div",{onClick:t,class:"button"},[f(c,{icon:"fa-solid fa-trash-alt"})])]),o("div",de,[o("div",_e,[(r(!0),i(C,null,w(a.consumerGroup.info,(_,v)=>(r(),i("div",{class:"item",key:v},k(_),1))),128))]),o("nav",null,[o("button",{onClick:n},[f(c,{icon:"fa-solid fa-plus"}),pe])]),(r(!0),i(C,null,w(a.consumerGroup.consumers,_=>(r(),O(ue,{key:_.name,consumer:_,"consumer-group-name":a.consumerGroup.name},null,8,["consumer","consumer-group-name"]))),128))])])}}});const ve=G(fe,[["__scopeId","data-v-baad2d1f"]]),ye={class:"consumer-group-list"},he=g({__name:"ListConsumerGroup",setup(s){const e=$();return(n,t)=>(r(),i("div",ye,[(r(!0),i(C,null,w(N(e).consumerGroups,u=>(r(),O(ve,{key:u.name,consumerGroup:u},null,8,["consumerGroup"]))),128))]))}});const Ce=G(he,[["__scopeId","data-v-c110971c"]]),we=s=>(I("data-v-78abd35a"),s=s(),E(),s),ge={class:"consumer-groups"},Ge=we(()=>o("span",null,"Consumer Group",-1)),$e=g({__name:"StreamConsumerGroup",setup(s){const e=$(),n=async()=>{const t=e.consumerGroups,u=L(t.map(a=>a.name));e.createConsumerGroup(`group-${u}`)};return(t,u)=>{const a=b("font-awesome-icon");return r(),i("div",ge,[o("button",{onClick:n,title:"Add a new consumer group"},[f(a,{icon:"fa-solid fa-plus"}),Ge]),f(Ce)])}}});const Ne=G($e,[["__scopeId","data-v-78abd35a"]]),X=s=>(I("data-v-cf281303"),s=s(),E(),s),Se=X(()=>o("h1",null,"Streams",-1)),ke={class:"content"},be={class:"buttons"},Ie=X(()=>o("span",null,"Entry",-1)),Ee=X(()=>o("span",null,"Clean",-1)),Re=g({__name:"StreamView",setup(s){const e=$(),n=async()=>{await e.add()},t=async()=>{await e.reset()},u=async()=>{await e.refresh()},a=async()=>{await e.cleanProcessed()};return(d,c)=>{const _=b("font-awesome-icon");return r(),i("main",null,[Se,o("div",ke,[o("div",be,[o("nav",null,[o("button",{onClick:u,title:"Refresh"},[f(_,{icon:"fa-solid fa-rotate-right"})]),o("button",{onClick:n,title:"Add a new entry to the stream"},[f(_,{icon:"fa-solid fa-plus"}),Ie]),o("button",{onClick:a},[f(_,{icon:"fa-solid fa-recycle"}),Ee])]),o("nav",null,[o("button",{onClick:t,title:"Delete Stream"},[f(_,{icon:"fa-solid fa-trash-alt"})])])]),f(W),N(e).exists?(r(),O(Ne,{key:0})):U("",!0)])])}}});const Ae=G(Re,[["__scopeId","data-v-cf281303"]]);export{Ae as default};
