"use strict";(self.webpackChunkacme_client=self.webpackChunkacme_client||[]).push([[586],{6586:(e,t,a)=>{a.r(t),a.d(t,{default:()=>z});var s=a(402),o=a(7282),r=a(7758),i=a(8910),n=a(1554),c=a(5937),l=a(671),d=a(3191),m=a(219),u=a(2515),f=a(7374),p=a(5697),h=a(4406),g=a(8913),v=s.forwardRef((function(e,t){var a=e.action,o=e.avatar,r=e.classes,i=e.className,n=e.component,c=void 0===n?"div":n,l=e.disableTypography,d=void 0!==l&&l,m=e.subheader,h=e.subheaderTypographyProps,v=e.title,A=e.titleTypographyProps,y=(0,f.A)(e,["action","avatar","classes","className","component","disableTypography","subheader","subheaderTypographyProps","title","titleTypographyProps"]),N=v;null==N||N.type===g.A||d||(N=s.createElement(g.A,(0,u.A)({variant:o?"body2":"h5",className:r.title,component:"span",display:"block"},A),N));var x=m;return null==x||x.type===g.A||d||(x=s.createElement(g.A,(0,u.A)({variant:o?"body2":"body1",className:r.subheader,color:"textSecondary",component:"span",display:"block"},h),x)),s.createElement(c,(0,u.A)({className:(0,p.A)(r.root,i),ref:t},y),o&&s.createElement("div",{className:r.avatar},o),s.createElement("div",{className:r.content},N,x),a&&s.createElement("div",{className:r.action},a))}));const A=(0,h.A)({root:{display:"flex",alignItems:"center",padding:16},avatar:{flex:"0 0 auto",marginRight:16},action:{flex:"0 0 auto",alignSelf:"flex-start",marginTop:-8,marginRight:-8},content:{flex:"1 1 auto"},title:{},subheader:{}},{name:"MuiCardHeader"})(v);var y=a(1913),N=s.forwardRef((function(e,t){var a=e.disableSpacing,o=void 0!==a&&a,r=e.classes,i=e.className,n=(0,f.A)(e,["disableSpacing","classes","className"]);return s.createElement("div",(0,u.A)({className:(0,p.A)(r.root,i,!o&&r.spacing),ref:t},n))}));const x=(0,h.A)({root:{display:"flex",alignItems:"center",padding:8},spacing:{"& > :not(:first-child)":{marginLeft:8}}},{name:"MuiCardActions"})(N);var b=a(2668),S=a(8058);const j={pushNotifications:[]},E=(0,s.createContext)(j),w=(0,r.A)((e=>({root:{"& > *":{margin:e.spacing(1)}},notifications:{maxWidth:300,fontSize:"1.5em"},media:{maxHeight:300}})));function z(e){const{status:t,setStatus:a}=(0,s.useContext)(E),r=(0,o.W6)(),u=w();return console.log("Notifications - status.pushNotifications:",t.pushNotifications),console.log("Notifications - props.location.state:",e.location.state),(0,S.jsx)("div",{className:u.root,children:t.pushNotifications.map(((e,s)=>{console.log("Notifications state:",e);const o=e.data["google.c.a.ts"],f=new Intl.DateTimeFormat("it-IT",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(1e3*o);return(0,S.jsxs)(m.A,{className:u.root,children:[(0,S.jsx)(A,{avatar:(0,S.jsx)(i.A,{sx:{bgcolor:b.A},src:e.notification.image,"aria-label":"notification avatar"}),action:(0,S.jsx)(c.A,{"aria-label":"settings",children:(0,S.jsx)(d.A,{})}),title:e.notification.title,subheader:f}),(0,S.jsx)(y.A,{children:(0,S.jsx)("img",{src:e.notification.image,alt:"test",style:{maxHeight:300,maxWidth:300}})}),(0,S.jsx)(y.A,{children:(0,S.jsx)(g.A,{variant:"body2",color:"textSecondary",component:"p",children:e.notification.body})}),(0,S.jsxs)(x,{children:[(0,S.jsxs)(c.A,{"aria-label":"share",children:[(0,S.jsx)(n.A,{})," "]}),(0,S.jsxs)(c.A,{"aria-label":"delete forever",onClick:()=>(e=>{a({pushNotifications:t.pushNotifications.filter(((t,a)=>a!==e))}),console.log("Notifications - (!status.pushNotifications.length):",!t.pushNotifications.length),t.pushNotifications.length<=1&&r.goBack()})(s),children:[(0,S.jsx)(l.A,{})," "]})]})]},s)}))})}},8910:(e,t,a)=>{a.d(t,{A:()=>d});var s=a(2515),o=a(7374),r=a(402),i=a(5697),n=a(4406);const c=(0,a(5253).A)(r.createElement("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person");var l=r.forwardRef((function(e,t){var a=e.alt,n=e.children,l=e.classes,d=e.className,m=e.component,u=void 0===m?"div":m,f=e.imgProps,p=e.sizes,h=e.src,g=e.srcSet,v=e.variant,A=void 0===v?"circular":v,y=(0,o.A)(e,["alt","children","classes","className","component","imgProps","sizes","src","srcSet","variant"]),N=null,x=function(e){var t=e.src,a=e.srcSet,s=r.useState(!1),o=s[0],i=s[1];return r.useEffect((function(){if(t||a){i(!1);var e=!0,s=new Image;return s.src=t,s.srcSet=a,s.onload=function(){e&&i("loaded")},s.onerror=function(){e&&i("error")},function(){e=!1}}}),[t,a]),o}({src:h,srcSet:g}),b=h||g,S=b&&"error"!==x;return N=S?r.createElement("img",(0,s.A)({alt:a,src:h,srcSet:g,sizes:p,className:l.img},f)):null!=n?n:b&&a?a[0]:r.createElement(c,{className:l.fallback}),r.createElement(u,(0,s.A)({className:(0,i.A)(l.root,l.system,l[A],d,!S&&l.colorDefault),ref:t},y),N)}));const d=(0,n.A)((function(e){return{root:{position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none"},colorDefault:{color:e.palette.background.default,backgroundColor:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[600]},circle:{},circular:{},rounded:{borderRadius:e.shape.borderRadius},square:{borderRadius:0},img:{width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4},fallback:{width:"75%",height:"75%"}}}),{name:"MuiAvatar"})(l)},219:(e,t,a)=>{a.d(t,{A:()=>d});var s=a(2515),o=a(7374),r=a(402),i=a(5697),n=a(4173),c=a(4406),l=r.forwardRef((function(e,t){var a=e.classes,c=e.className,l=e.raised,d=void 0!==l&&l,m=(0,o.A)(e,["classes","className","raised"]);return r.createElement(n.A,(0,s.A)({className:(0,i.A)(a.root,c),elevation:d?8:1,ref:t},m))}));const d=(0,c.A)({root:{overflow:"hidden"}},{name:"MuiCard"})(l)},1913:(e,t,a)=>{a.d(t,{A:()=>l});var s=a(2515),o=a(7374),r=a(402),i=a(5697),n=a(4406),c=r.forwardRef((function(e,t){var a=e.classes,n=e.className,c=e.component,l=void 0===c?"div":c,d=(0,o.A)(e,["classes","className","component"]);return r.createElement(l,(0,s.A)({className:(0,i.A)(a.root,n),ref:t},d))}));const l=(0,n.A)({root:{padding:16,"&:last-child":{paddingBottom:24}}},{name:"MuiCardContent"})(c)},671:(e,t,a)=>{var s=a(6069),o=a(8968);t.A=void 0;var r=o(a(402)),i=(0,s(a(2212)).default)(r.createElement("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"}),"DeleteForever");t.A=i},3191:(e,t,a)=>{var s=a(6069),o=a(8968);t.A=void 0;var r=o(a(402)),i=(0,s(a(2212)).default)(r.createElement("path",{d:"M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"}),"MoreVert");t.A=i},1554:(e,t,a)=>{var s=a(6069),o=a(8968);t.A=void 0;var r=o(a(402)),i=(0,s(a(2212)).default)(r.createElement("path",{d:"M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"}),"Share");t.A=i}}]);
//# sourceMappingURL=586.ba9e632c.chunk.js.map