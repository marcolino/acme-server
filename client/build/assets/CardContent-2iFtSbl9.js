import{_ as d,aq as p,r as C,ar as u,a as f,aw as m,V as y,Z as b,P as v,M as s,aA as g}from"./index-DQQjlUOR.js";function M(o){return d("MuiCard",o)}const O=p("MuiCard",["root"]),h=o=>{const{classes:t}=o;return b({root:["root"]},M,t)},j=m(v,{name:"MuiCard",slot:"Root",overridesResolver:(o,t)=>t.root})({overflow:"hidden"}),x=C.forwardRef(function(t,e){const a=u({props:t,name:"MuiCard"}),{className:c,raised:r=!1,...i}=a,n={...a,raised:r},l=h(n);return f.jsx(j,{className:y(l.root,c),elevation:r?8:void 0,ref:e,ownerState:n,...i})});x.propTypes={children:s.node,classes:s.object,className:s.string,raised:g(s.bool,o=>o.raised&&o.variant==="outlined"?new Error('MUI: Combining `raised={true}` with `variant="outlined"` has no effect.'):null),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object])};function R(o){return d("MuiCardContent",o)}const P=p("MuiCardContent",["root"]),T=o=>{const{classes:t}=o;return b({root:["root"]},R,t)},w=m("div",{name:"MuiCardContent",slot:"Root",overridesResolver:(o,t)=>t.root})({padding:16,"&:last-child":{paddingBottom:24}}),U=C.forwardRef(function(t,e){const a=u({props:t,name:"MuiCardContent"}),{className:c,component:r="div",...i}=a,n={...a,component:r},l=T(n);return f.jsx(w,{as:r,className:y(l.root,c),ownerState:n,ref:e,...i})});U.propTypes={children:s.node,classes:s.object,className:s.string,component:s.elementType,sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object])};export{x as C,U as a,P as b,O as c,M as d,R as g};
