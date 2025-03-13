import{a as L,b as P,R,d as T,r as m,A as F,o as _,f as M,u as O,p as G,j as e,B as a,c as t,T as l,C as S,q as U,F as $,s as v,L as I,k as B,m as z}from"./index-kZazlTzH.js";import{G as H,F as W}from"./Google-GoK6UuI5.js";import{P as Y}from"./Person-DZc_YTe7.js";import{T as q,L as J}from"./TextFieldPassword-BqjSt6Lq.js";import{S as K}from"./TextField-BpUCQOYc.js";import{A as Q}from"./Avatar-DcajoSMt.js";import{C as X}from"./Checkbox-Dr2wjAIy.js";import{I as Z}from"./Icon-CP_gbfIf.js";import"./Select-BP4I_6h9.js";const ee=L(P.jsx("path",{d:"M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2M9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9zm9 14H6V10h12zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2"}),"LockOutlined");function se(){const c=T(),[p,d]=m.useState(""),[h,f]=m.useState(""),[x,n]=m.useState({}),{signIn:y}=m.useContext(F),{showDialog:E}=_(),{showSnackbar:r}=M(),{t:i}=O(),[b,D]=m.useState(!1),N=G();N.state;const C=(s,o)=>{s.preventDefault(),window.location.replace(`${t.siteUrl}/api/auth/${o.toLowerCase()}`)},w=s=>{D(s.target.checked)},V=()=>{const s=z(p);if(s!==!0){let o;switch(s){case"ERROR_PLEASE_SUPPLY_AN_EMAIL":o=i("Please supply an email");break;case"ERROR_PLEASE_SUPPLY_A_VALID_EMAIL":o=i("Please supply a valid email");break;default:o=s}return n({email:!0}),r(o,"warning"),!1}if(!h){const o=i("Please supply a password");return n({password:!0}),r(o,"warning"),!1}return!0},k=async s=>{var u,g,j;if(s.preventDefault(),!V())return;n({});const o=await B("post","/auth/signin",{email:p,password:h,rememberMe:!b});if(o.err)switch((u=o.data)==null?void 0:u.code){case"ACCOUNT_WAITING_FOR_VERIFICATION":const A=(g=o.data)==null?void 0:g.codeDeliveryMedium;n({email:!0}),E({title:i("Account is waiting for verification"),message:o.data.message,confirmText:i("Ok"),onConfirm:()=>{c(`/signup/true/${A}`,{replace:!0})}});break;case"ACCOUNT_DELETED":n({email:!0}),r(o.message,"warning");break;default:n({}),r(o.message,"error")}else r(i("Sign in successful"),"success"),console.log("Email signin result:",o),y(o),d(""),f(""),c(((j=N.state)==null?void 0:j.returnUrl)??"/",{replace:!0})};return e.jsxDEV("form",{noValidate:!0,autoComplete:"on",children:e.jsxDEV(a,{sx:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"start",mt:6},children:e.jsxDEV(a,{sx:{width:"100%",maxWidth:400,p:2,border:"1px solid",borderColor:"primary.main",borderRadius:4},children:[e.jsxDEV(a,{sx:{display:"flex",justifyContent:"center",mt:0,mb:3},children:e.jsxDEV(Q,{sx:{backgroundColor:"primary.main"},children:e.jsxDEV(ee,{},void 0,!1,{fileName:"/home/marco/apps/sistemisolari/acme-client/src/components/auth/SignIn.jsx",lineNumber:174,columnNumber:15},this)},void 0,!1,{fileName:"/home/marco/apps/sistemisolari/acme-client/src/components/auth/SignIn.jsx",lineNumber:173,columnNumber:13},this)},void 0,!1,{fileName:"/home/marco/apps/sistemisolari/acme-client/src/components/auth/SignIn.jsx",lineNumber:165,columnNumber:11},this),e.jsxDEV(l,{variant:"body1",color:"textSecondary",sx:{display:"flex",justifyContent:"center",my:1},children:i("Sign in with email and password")},void 0,!1,{fileName:"/home/marco/apps/sistemisolari/acme-client/src/components/auth/SignIn.jsx",lineNumber:177,columnNumber:11},this),e.jsxDEV(K,{autoFocus:!0,id:"email",value:p,onChange:s=>d(s.target.value),placeholder:"Email",startIcon:e.jsxDEV(Y,{},void 0,!1,{fileName:"/home/marco/apps/sistemisolari/acme-client/src/components/auth/SignIn.jsx",lineNumber:192,columnNumber:24},this),autoComplete:"email",error:x.email},void 0,!1,{fileName:"/home/marco/apps/sistemisolari/acme-client/src/components/auth/SignIn.jsx",lineNumber:186,columnNumber:11},this),e.jsxDEV(q,{id:"password",type:"password",value:h,onChange:s=>f(s.target.value),placeholder:i("Password"),startIcon:e.jsxDEV(J,{},void 0,!1,{fileName:"/home/marco/apps/sistemisolari/acme-client/src/components/auth/SignIn.jsx",lineNumber:202,columnNumber:24},this),autoComplete:"current-password",error:x.password},void 0,!1,{fileName:"/home/marco/apps/sistemisolari/acme-client/src/components/auth/SignIn.jsx",lineNumber:196,columnNumber:11},this),e.jsxDEV(S,{type:"submit",onClick:k,sx:{mt:1,textAlign:"center"},children:i("Sign in")},void 0,!1,{fileName:"/home/marco/apps/sistemisolari/acme-client/src/components/auth/SignIn.jsx",lineNumber:206,columnNumber:11},this),e.jsxDEV(a,{display:"flex",justifyContent:"flex-end",children:e.jsxDEV(U,{placement:"bottom",title:i("It is recommended to check this flag if you are on a public computer, with low security")+`.
`+i(`If checked your session will last only for ${v(t.auth.refreshTokenExpirationDontRememberMeSeconds)}`)+", "+i(`otherwise it will last for ${v(t.auth.refreshTokenExpirationSeconds)}`)+".",children:e.jsxDEV($,{checked:b,onChange:w,labelPlacement:"start",control:e.jsxDEV(X,{size:"small",color:"primary",sx:{mr:-1}},void 0,!1,{fileName:"/home/marco/apps/sistemisolari/acme-client/src/components/auth/SignIn.jsx",lineNumber:227,columnNumber:19},this),label:i("Do not remember me"),color:"text.secondary",sx:{mr:0,"& .MuiFormControlLabel-label":{fontSize:"1rem"}}},void 0,!1,{fileName:"/home/marco/apps/sistemisolari/acme-client/src/components/auth/SignIn.jsx",lineNumber:222,columnNumber:15},this)},void 0,!1,{fileName:"/home/marco/apps/sistemisolari/acme-client/src/components/auth/SignIn.jsx",lineNumber:217,columnNumber:13},this)},void 0,!1,{fileName:"/home/marco/apps/sistemisolari/acme-client/src/components/auth/SignIn.jsx",lineNumber:213,columnNumber:11},this),e.jsxDEV(a,{sx:{display:"flex",justifyContent:"flex-end",mt:0},children:e.jsxDEV(l,{variant:"body2",color:"textSecondary",children:e.jsxDEV(I,{style:{cursor:"pointer"},underline:"hover",onClick:()=>c("/forgot-password",{replace:!0}),children:i("Forgot password?")},void 0,!1,{fileName:"/home/marco/apps/sistemisolari/acme-client/src/components/auth/SignIn.jsx",lineNumber:254,columnNumber:15},this)},void 0,!1,{fileName:"/home/marco/apps/sistemisolari/acme-client/src/components/auth/SignIn.jsx",lineNumber:253,columnNumber:13},this)},void 0,!1,{fileName:"/home/marco/apps/sistemisolari/acme-client/src/components/auth/SignIn.jsx",lineNumber:246,columnNumber:11},this),e.jsxDEV(a,{sx:{display:"flex",justifyContent:"center",mt:2},children:e.jsxDEV(l,{variant:"body2",color:"textSecondary",children:[i("Don't have an account?")," ",e.jsxDEV(I,{style:{cursor:"pointer"},underline:"hover",onClick:()=>c("/signup"),children:i("Register now!")},void 0,!1,{fileName:"/home/marco/apps/sistemisolari/acme-client/src/components/auth/SignIn.jsx",lineNumber:273,columnNumber:15},this)]},void 0,!0,{fileName:"/home/marco/apps/sistemisolari/acme-client/src/components/auth/SignIn.jsx",lineNumber:270,columnNumber:13},this)},void 0,!1,{fileName:"/home/marco/apps/sistemisolari/acme-client/src/components/auth/SignIn.jsx",lineNumber:263,columnNumber:11},this),t.oauth.federatedSigninProviders.length&&e.jsxDEV(a,{children:[e.jsxDEV(l,{variant:"body2",color:"textSecondary",sx:{display:"flex",justifyContent:"center",my:3},children:i("or")},void 0,!1,{fileName:"/home/marco/apps/sistemisolari/acme-client/src/components/auth/SignIn.jsx",lineNumber:284,columnNumber:15},this),e.jsxDEV(l,{variant:"body2",color:"textSecondary",sx:{display:"flex",justifyContent:"center",my:1},children:i("Sign in with a social account")},void 0,!1,{fileName:"/home/marco/apps/sistemisolari/acme-client/src/components/auth/SignIn.jsx",lineNumber:293,columnNumber:15},this),e.jsxDEV(a,{display:"flex",flexDirection:"row",children:t.oauth.federatedSigninProviders.map((s,o)=>e.jsxDEV(S,{startIcon:s==="Google"?e.jsxDEV(H,{sx:{color:"red"}},void 0,!1,{fileName:"/home/marco/apps/sistemisolari/acme-client/src/components/auth/SignIn.jsx",lineNumber:308,columnNumber:47},this):s==="Facebook"?e.jsxDEV(W,{sx:{color:"blue"}},void 0,!1,{fileName:"/home/marco/apps/sistemisolari/acme-client/src/components/auth/SignIn.jsx",lineNumber:309,columnNumber:49},this):e.jsxDEV(Z,{sx:{backgroundColor:"white",color:"red"},children:"G"},void 0,!1,{fileName:"/home/marco/apps/sistemisolari/acme-client/src/components/auth/SignIn.jsx",lineNumber:310,columnNumber:23},this),sx:{mr:o<t.oauth.federatedSigninProviders.length-1?1:0},type:s==="Google"?"socialAuthButtonGoogle":s==="Facebook"?"socialAuthButtonFacebook":"",onClick:u=>C(u,s),children:s},s,!1,{fileName:"/home/marco/apps/sistemisolari/acme-client/src/components/auth/SignIn.jsx",lineNumber:305,columnNumber:19},this))},void 0,!1,{fileName:"/home/marco/apps/sistemisolari/acme-client/src/components/auth/SignIn.jsx",lineNumber:302,columnNumber:15},this)]},void 0,!0,{fileName:"/home/marco/apps/sistemisolari/acme-client/src/components/auth/SignIn.jsx",lineNumber:283,columnNumber:13},this)]},void 0,!0,{fileName:"/home/marco/apps/sistemisolari/acme-client/src/components/auth/SignIn.jsx",lineNumber:155,columnNumber:9},this)},void 0,!1,{fileName:"/home/marco/apps/sistemisolari/acme-client/src/components/auth/SignIn.jsx",lineNumber:146,columnNumber:7},this)},void 0,!1,{fileName:"/home/marco/apps/sistemisolari/acme-client/src/components/auth/SignIn.jsx",lineNumber:145,columnNumber:5},this)}const ue=R.memo(se);export{ue as default};
