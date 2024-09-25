"use strict";(self.webpackChunkacme_client=self.webpackChunkacme_client||[]).push([[261],{9261:(e,r,s)=>{s.r(r),s.d(r,{default:()=>b});var a=s(402),t=s(7282),o=s(7847),n=s(1619),l=s(7758),c=s(8910),i=s(1919),d=s(2209),u=s(3567),m=s(8913),h=s(4391),p=s(3481),f=s(5649),v=s(2737),A=s(8876),S=s(1237),w=s(4302),x=s(2338),E=s(2335),g=s(2704),j=s(9785),y=s(9509),C=s(6749),R=s(8058);const P=(0,l.A)((e=>(e=>({avatar:{backgroundColor:e.palette.success.main},fieldset:{border:0}}))(e)));function _(){const e=P(),[r,s]=(0,a.useState)(""),[l,_]=(0,a.useState)(""),[b,k]=(0,a.useState)(""),[O,D]=(0,a.useState)({email:null,password:null,passwordConfirmed:null,code:null}),[z,N]=(0,a.useState)(!1),[M,H]=(0,a.useState)(""),[L,I]=(0,a.useState)(""),T=(0,t.W6)(),{promiseInProgress:V}=(0,o.H8)({delay:C.A.spinner.delay}),[W,F]=(0,a.useState)(!1),[U,Y]=(0,a.useState)(null),[Q,Z]=(0,a.useState)(null),[q,B]=(0,a.useState)(null),[G,K]=(0,a.useState)(!1),[X,J]=(0,a.useState)(null),[$,ee]=(0,a.useState)(null),[re,se]=(0,a.useState)(!1),[ae,te]=(0,a.useState)(null),[oe,ne]=(0,a.useState)(null),{t:le}=(0,n.B)(),ce=(e,r,s)=>{Y(e),Z(r),F(!0),B(s)},ie=()=>{F(!1),q&&(B(null),q())},de=()=>{if(!z){const e=(0,y.DT)(r);if(!0!==e){let r;switch(e){case"ERROR_PLEASE_SUPPLY_AN_EMAIL":r=le("Please supply an email");break;case"ERROR_PLEASE_SUPPLY_A_VALID_EMAIL":r=le("Please supply a valid email");break;default:r=e}return g.o.warning(r),D({email:r}),!1}}if(z){const e=(0,y.Oj)(l,b);if(!0!==e){let r;switch(e){case"ERROR_PLEASE_SUPPLY_A_PASSWORD":r=le("Please supply a password");break;case"ERROR_PLEASE_SUPPLY_A_MORE_COMPLEX_PASSWORD":r=le("Please supply a more complex password");break;case"PLEASE_CONFIRM_THE_PASSWORD":r=le("Please confirm the password");break;case"ERROR_THE_CONFIRMED_PASSWORD_DOES_NOT_MATCH_THE_PASSWORD":r=le("The confirmed password does not match the password");break;default:r=e}return g.o.warning(r),D({password:r}),!1}}return!0};return(0,R.jsxs)(d.A,{maxWidth:"xs",children:[(0,R.jsx)("form",{className:e.form,noValidate:!0,autoComplete:"off",children:(0,R.jsxs)("fieldset",{disabled:V,className:e.fieldset,children:[!z&&(0,R.jsxs)(R.Fragment,{children:[(0,R.jsx)(u.A,{m:1}),(0,R.jsx)(i.A,{container:!0,justifyContent:"center",children:(0,R.jsx)(c.A,{className:e.avatar,children:(0,R.jsx)(A.A,{})})}),(0,R.jsx)(u.A,{m:3}),(0,R.jsx)(i.A,{container:!0,justifyContent:"flex-start",children:(0,R.jsx)(j.ay,{children:le("Reset password")})}),(0,R.jsx)(u.A,{m:1}),(0,R.jsx)(j.ZQ,{autoFocus:!0,id:"email",value:r,onChange:s,placeholder:le("Email"),startAdornmentIcon:(0,R.jsx)(x.A,{}),error:O.email}),(0,R.jsx)(u.A,{m:1}),(0,R.jsx)(j.pr,{onClick:e=>{e.preventDefault(),de()&&(D({}),(0,E.BD)({email:r}).then((e=>{if(!e.ok)return console.warn("forgotPassword error:",e),g.o.error(le(e.message)),void D({email:e.message});N(!0),_("");const r=e.codeDeliveryMedium,s=e.codeDeliveryEmail;H(r),ce(le("Confirmation code sent"),le("Confirmation code sent via {{medium}} to {{email}}.\nPlease copy and paste it here.",{medium:r,email:s}),(()=>{}))})))},children:le("Request password reset")})]}),z&&(0,R.jsxs)(R.Fragment,{children:[(0,R.jsx)(j.ZQ,{id:"password",type:"password",value:l,onChange:_,placeholder:le("New password"),startAdornmentIcon:(0,R.jsx)(w.A,{}),error:O.password}),(0,R.jsx)(j.ZQ,{id:"passwordConfirmed",type:"password",value:b,onChange:k,placeholder:le("New password confirmation"),startAdornmentIcon:(0,R.jsx)(w.A,{}),error:O.passwordConfirmed}),(0,R.jsx)(j.ZQ,{id:"confirmationCode",type:"number",value:L,onChange:I,placeholder:le("Numeric code just received by {{codeDeliveryMedium}}",{codeDeliveryMedium:M}),startAdornmentIcon:(0,R.jsx)(S.A,{}),error:O.confirmationCode}),(0,R.jsx)(u.A,{m:1}),(0,R.jsx)(j.pr,{onClick:e=>{e.preventDefault(),de()&&(D({}),(0,E.fM)({email:r,code:L,password:l,passwordConfirmed:b}).then((e=>{if(!e.ok)return console.warn("forgotPasswordSubmit error:",e),g.o.error(le(e.message)),void D({password:e.message});N(!1),s(""),_(""),k(""),I(""),ce(le("Password reset success"),le("You can now sign in with your new password"),(()=>{T.push("/signin")}))})))},children:le("Confirm Password Reset")}),(0,R.jsx)(i.A,{container:!0,justifyContent:"flex-end",children:(0,R.jsx)(j.pr,{onClick:e=>{e.preventDefault(),D({}),(0,E.TL)({email:r}).then((e=>{if(e.ok)console.log("TODO: CHECK IF IN DATA WE HAVE MESSAGE TO SHOW TO THE USER resendResetPasswordCode success data:",e),g.o.info("Code resent successfully");else{if(console.warn("formResendResetPasswordCode error:",e),"ExpiredCodeException"===e.code)D({confirmationCode:e});else D({});g.o.error(le(e.message))}}))},fullWidth:!1,className:"buttonSecondary",children:le("Resend code")})})]})]})}),(0,R.jsxs)(h.A,{open:W,onClose:ie,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[(0,R.jsx)(v.A,{id:"alert-dialog-title",children:U}),(0,R.jsx)(f.A,{id:"alert-dialog-description",children:(0,R.jsx)(m.A,{variant:"body1",style:{whiteSpace:"pre-line"},children:Q})}),(0,R.jsx)(p.A,{children:(0,R.jsx)(j.pr,{onClick:ie,fullWidth:!1,className:"buttonSecondary",autoFocus:!0,children:le("Ok")})})]})]})}const b=a.memo(_)},8910:(e,r,s)=>{s.d(r,{A:()=>d});var a=s(2515),t=s(7374),o=s(402),n=s(5697),l=s(4406);const c=(0,s(5253).A)(o.createElement("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person");var i=o.forwardRef((function(e,r){var s=e.alt,l=e.children,i=e.classes,d=e.className,u=e.component,m=void 0===u?"div":u,h=e.imgProps,p=e.sizes,f=e.src,v=e.srcSet,A=e.variant,S=void 0===A?"circular":A,w=(0,t.A)(e,["alt","children","classes","className","component","imgProps","sizes","src","srcSet","variant"]),x=null,E=function(e){var r=e.src,s=e.srcSet,a=o.useState(!1),t=a[0],n=a[1];return o.useEffect((function(){if(r||s){n(!1);var e=!0,a=new Image;return a.src=r,a.srcSet=s,a.onload=function(){e&&n("loaded")},a.onerror=function(){e&&n("error")},function(){e=!1}}}),[r,s]),t}({src:f,srcSet:v}),g=f||v,j=g&&"error"!==E;return x=j?o.createElement("img",(0,a.A)({alt:s,src:f,srcSet:v,sizes:p,className:i.img},h)):null!=l?l:g&&s?s[0]:o.createElement(c,{className:i.fallback}),o.createElement(m,(0,a.A)({className:(0,n.A)(i.root,i.system,i[S],d,!j&&i.colorDefault),ref:r},w),x)}));const d=(0,l.A)((function(e){return{root:{position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none"},colorDefault:{color:e.palette.background.default,backgroundColor:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[600]},circle:{},circular:{},rounded:{borderRadius:e.shape.borderRadius},square:{borderRadius:0},img:{width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4},fallback:{width:"75%",height:"75%"}}}),{name:"MuiAvatar"})(i)},1237:(e,r,s)=>{var a=s(6069),t=s(8968);r.A=void 0;var o=t(s(402)),n=(0,a(s(2212)).default)(o.createElement("path",{d:"M22 10V6c0-1.11-.9-2-2-2H4c-1.1 0-1.99.89-1.99 2v4c1.1 0 1.99.9 1.99 2s-.89 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2s.9-2 2-2zm-9 7.5h-2v-2h2v2zm0-4.5h-2v-2h2v2zm0-4.5h-2v-2h2v2z"}),"ConfirmationNumber");r.A=n},4302:(e,r,s)=>{var a=s(6069),t=s(8968);r.A=void 0;var o=t(s(402)),n=(0,a(s(2212)).default)(o.createElement("path",{d:"M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"}),"Lock");r.A=n},2338:(e,r,s)=>{var a=s(6069),t=s(8968);r.A=void 0;var o=t(s(402)),n=(0,a(s(2212)).default)(o.createElement("path",{d:"M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z"}),"LockOpen");r.A=n},8876:(e,r,s)=>{var a=s(6069),t=s(8968);r.A=void 0;var o=t(s(402)),n=(0,a(s(2212)).default)(o.createElement("path",{d:"M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h2c0-1.66 1.34-3 3-3s3 1.34 3 3v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"}),"LockOpenOutlined");r.A=n}}]);
//# sourceMappingURL=261.a6c7e7d6.chunk.js.map