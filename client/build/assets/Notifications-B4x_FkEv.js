import{c as n,j as t,r as l,R as p,a as g,d8 as u,I as e,H as j,T as N}from"./index-ElTvjqUw.js";import{C as v,a as r}from"./CardContent-ZPKk0Atb.js";import{a as C,C as b}from"./CardHeader-BFl3PJOW.js";import{A as y}from"./Avatar-Brc1y1dd.js";const I=n(t.jsx("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zm2.46-7.12 1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"}),"DeleteForever"),M=n(t.jsx("path",{d:"M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"}),"MoreVert"),S=n(t.jsx("path",{d:"M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92"}),"Share"),L={pushNotifications:[]},H=l.createContext(L),F=d=>{const{status:a,setStatus:h}=l.useContext(H),m=g(),c={},x=o=>{h({pushNotifications:a.pushNotifications.filter((s,i)=>i!==o)}),a.pushNotifications.length<=1&&m(-1)};return console.log("Notifications - status.pushNotifications:",a.pushNotifications),console.log("Notifications - props.location.state:",d.location.state),t.jsx("div",{className:c.root,children:a.pushNotifications.map((o,s)=>{console.log("Notifications state:",o);const i=o.data["google.c.a.ts"],f=new Intl.DateTimeFormat(u.language,{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(i*1e3);return t.jsxs(v,{className:c.root,children:[t.jsx(C,{avatar:t.jsx(y,{sx:{bgcolor:j},src:o.notification.image,"aria-label":"notification avatar"}),action:t.jsx(e,{"aria-label":"settings",children:t.jsx(M,{})}),title:o.notification.title,subheader:f}),t.jsx(r,{children:t.jsx("img",{src:o.notification.image,alt:"test",style:{maxHeight:300,maxWidth:300}})}),t.jsx(r,{children:t.jsx(N,{variant:"body2",color:"textSecondary",component:"p",children:o.notification.body})}),t.jsxs(b,{children:[t.jsxs(e,{"aria-label":"share",children:[t.jsx(S,{})," "]}),t.jsxs(e,{"aria-label":"delete forever",onClick:()=>x(s),children:[t.jsx(I,{})," "]})]})]},s)})})},R=p.memo(F);export{R as default};
