import{r as A,ar as T,a as f,aw as b,V as D,Z as R,cm as C,aj as u,aJ as L,M as i}from"./index-DQQjlUOR.js";const S=e=>{const{absolute:t,children:r,classes:s,flexItem:p,light:n,orientation:o,textAlign:a,variant:l}=e;return R({root:["root",t&&"absolute",l,n&&"light",o==="vertical"&&"vertical",p&&"flexItem",r&&"withChildren",r&&o==="vertical"&&"withChildrenVertical",a==="right"&&o!=="vertical"&&"textAlignRight",a==="left"&&o!=="vertical"&&"textAlignLeft"],wrapper:["wrapper",o==="vertical"&&"wrapperVertical"]},C,s)},W=b("div",{name:"MuiDivider",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,r.absolute&&t.absolute,t[r.variant],r.light&&t.light,r.orientation==="vertical"&&t.vertical,r.flexItem&&t.flexItem,r.children&&t.withChildren,r.children&&r.orientation==="vertical"&&t.withChildrenVertical,r.textAlign==="right"&&r.orientation!=="vertical"&&t.textAlignRight,r.textAlign==="left"&&r.orientation!=="vertical"&&t.textAlignLeft]}})(u(({theme:e})=>({margin:0,flexShrink:0,borderWidth:0,borderStyle:"solid",borderColor:(e.vars||e).palette.divider,borderBottomWidth:"thin",variants:[{props:{absolute:!0},style:{position:"absolute",bottom:0,left:0,width:"100%"}},{props:{light:!0},style:{borderColor:e.vars?`rgba(${e.vars.palette.dividerChannel} / 0.08)`:L(e.palette.divider,.08)}},{props:{variant:"inset"},style:{marginLeft:72}},{props:{variant:"middle",orientation:"horizontal"},style:{marginLeft:e.spacing(2),marginRight:e.spacing(2)}},{props:{variant:"middle",orientation:"vertical"},style:{marginTop:e.spacing(1),marginBottom:e.spacing(1)}},{props:{orientation:"vertical"},style:{height:"100%",borderBottomWidth:0,borderRightWidth:"thin"}},{props:{flexItem:!0},style:{alignSelf:"stretch",height:"auto"}},{props:({ownerState:t})=>!!t.children,style:{display:"flex",textAlign:"center",border:0,borderTopStyle:"solid",borderLeftStyle:"solid","&::before, &::after":{content:'""',alignSelf:"center"}}},{props:({ownerState:t})=>t.children&&t.orientation!=="vertical",style:{"&::before, &::after":{width:"100%",borderTop:`thin solid ${(e.vars||e).palette.divider}`,borderTopStyle:"inherit"}}},{props:({ownerState:t})=>t.orientation==="vertical"&&t.children,style:{flexDirection:"column","&::before, &::after":{height:"100%",borderLeft:`thin solid ${(e.vars||e).palette.divider}`,borderLeftStyle:"inherit"}}},{props:({ownerState:t})=>t.textAlign==="right"&&t.orientation!=="vertical",style:{"&::before":{width:"90%"},"&::after":{width:"10%"}}},{props:({ownerState:t})=>t.textAlign==="left"&&t.orientation!=="vertical",style:{"&::before":{width:"10%"},"&::after":{width:"90%"}}}]}))),j=b("span",{name:"MuiDivider",slot:"Wrapper",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.wrapper,r.orientation==="vertical"&&t.wrapperVertical]}})(u(({theme:e})=>({display:"inline-block",paddingLeft:`calc(${e.spacing(1)} * 1.2)`,paddingRight:`calc(${e.spacing(1)} * 1.2)`,whiteSpace:"nowrap",variants:[{props:{orientation:"vertical"},style:{paddingTop:`calc(${e.spacing(1)} * 1.2)`,paddingBottom:`calc(${e.spacing(1)} * 1.2)`}}]}))),g=A.forwardRef(function(t,r){const s=T({props:t,name:"MuiDivider"}),{absolute:p=!1,children:n,className:o,orientation:a="horizontal",component:l=n||a==="vertical"?"div":"hr",flexItem:h=!1,light:x=!1,role:c=l!=="hr"?"separator":void 0,textAlign:m="center",variant:y="fullWidth",...w}=s,d={...s,absolute:p,component:l,flexItem:h,light:x,orientation:a,role:c,textAlign:m,variant:y},v=S(d);return f.jsx(W,{as:l,className:D(v.root,o),role:c,ref:r,ownerState:d,"aria-orientation":c==="separator"&&(l!=="hr"||a==="vertical")?a:void 0,...w,children:n?f.jsx(j,{className:v.wrapper,ownerState:d,children:n}):null})});g&&(g.muiSkipListHighlight=!0);g.propTypes={absolute:i.bool,children:i.node,classes:i.object,className:i.string,component:i.elementType,flexItem:i.bool,light:i.bool,orientation:i.oneOf(["horizontal","vertical"]),role:i.string,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),textAlign:i.oneOf(["center","left","right"]),variant:i.oneOfType([i.oneOf(["fullWidth","inset","middle"]),i.string])};export{g as D};
