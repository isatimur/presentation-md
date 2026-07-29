const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-rT3NUMG4.js","assets/_commonjsHelpers-Cpj98o6Y.js","assets/index-BXnJRHAR.js"])))=>i.map(i=>d[i]);
(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function t(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(o){if(o.ep)return;o.ep=!0;const a=t(o);fetch(o.href,a)}})();var fs={exports:{}},fo={},ps={exports:{}},P={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var nr=Symbol.for("react.element"),Kg=Symbol.for("react.portal"),Yg=Symbol.for("react.fragment"),Xg=Symbol.for("react.strict_mode"),qg=Symbol.for("react.profiler"),Jg=Symbol.for("react.provider"),Zg=Symbol.for("react.context"),em=Symbol.for("react.forward_ref"),nm=Symbol.for("react.suspense"),tm=Symbol.for("react.memo"),rm=Symbol.for("react.lazy"),Jl=Symbol.iterator;function om(e){return e===null||typeof e!="object"?null:(e=Jl&&e[Jl]||e["@@iterator"],typeof e=="function"?e:null)}var hs={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},gs=Object.assign,ms={};function ct(e,n,t){this.props=e,this.context=n,this.refs=ms,this.updater=t||hs}ct.prototype.isReactComponent={};ct.prototype.setState=function(e,n){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,n,"setState")};ct.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function ys(){}ys.prototype=ct.prototype;function qa(e,n,t){this.props=e,this.context=n,this.refs=ms,this.updater=t||hs}var Ja=qa.prototype=new ys;Ja.constructor=qa;gs(Ja,ct.prototype);Ja.isPureReactComponent=!0;var Zl=Array.isArray,vs=Object.prototype.hasOwnProperty,Za={current:null},xs={key:!0,ref:!0,__self:!0,__source:!0};function ws(e,n,t){var r,o={},a=null,l=null;if(n!=null)for(r in n.ref!==void 0&&(l=n.ref),n.key!==void 0&&(a=""+n.key),n)vs.call(n,r)&&!xs.hasOwnProperty(r)&&(o[r]=n[r]);var i=arguments.length-2;if(i===1)o.children=t;else if(1<i){for(var s=Array(i),u=0;u<i;u++)s[u]=arguments[u+2];o.children=s}if(e&&e.defaultProps)for(r in i=e.defaultProps,i)o[r]===void 0&&(o[r]=i[r]);return{$$typeof:nr,type:e,key:a,ref:l,props:o,_owner:Za.current}}function am(e,n){return{$$typeof:nr,type:e.type,key:n,ref:e.ref,props:e.props,_owner:e._owner}}function el(e){return typeof e=="object"&&e!==null&&e.$$typeof===nr}function lm(e){var n={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(t){return n[t]})}var ei=/\/+/g;function Po(e,n){return typeof e=="object"&&e!==null&&e.key!=null?lm(""+e.key):n.toString(36)}function Er(e,n,t,r,o){var a=typeof e;(a==="undefined"||a==="boolean")&&(e=null);var l=!1;if(e===null)l=!0;else switch(a){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case nr:case Kg:l=!0}}if(l)return l=e,o=o(l),e=r===""?"."+Po(l,0):r,Zl(o)?(t="",e!=null&&(t=e.replace(ei,"$&/")+"/"),Er(o,n,t,"",function(u){return u})):o!=null&&(el(o)&&(o=am(o,t+(!o.key||l&&l.key===o.key?"":(""+o.key).replace(ei,"$&/")+"/")+e)),n.push(o)),1;if(l=0,r=r===""?".":r+":",Zl(e))for(var i=0;i<e.length;i++){a=e[i];var s=r+Po(a,i);l+=Er(a,n,t,s,o)}else if(s=om(e),typeof s=="function")for(e=s.call(e),i=0;!(a=e.next()).done;)a=a.value,s=r+Po(a,i++),l+=Er(a,n,t,s,o);else if(a==="object")throw n=String(e),Error("Objects are not valid as a React child (found: "+(n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n)+"). If you meant to render a collection of children, use an array instead.");return l}function ur(e,n,t){if(e==null)return e;var r=[],o=0;return Er(e,r,"","",function(a){return n.call(t,a,o++)}),r}function im(e){if(e._status===-1){var n=e._result;n=n(),n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var ue={current:null},$r={transition:null},sm={ReactCurrentDispatcher:ue,ReactCurrentBatchConfig:$r,ReactCurrentOwner:Za};function bs(){throw Error("act(...) is not supported in production builds of React.")}P.Children={map:ur,forEach:function(e,n,t){ur(e,function(){n.apply(this,arguments)},t)},count:function(e){var n=0;return ur(e,function(){n++}),n},toArray:function(e){return ur(e,function(n){return n})||[]},only:function(e){if(!el(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};P.Component=ct;P.Fragment=Yg;P.Profiler=qg;P.PureComponent=qa;P.StrictMode=Xg;P.Suspense=nm;P.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=sm;P.act=bs;P.cloneElement=function(e,n,t){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=gs({},e.props),o=e.key,a=e.ref,l=e._owner;if(n!=null){if(n.ref!==void 0&&(a=n.ref,l=Za.current),n.key!==void 0&&(o=""+n.key),e.type&&e.type.defaultProps)var i=e.type.defaultProps;for(s in n)vs.call(n,s)&&!xs.hasOwnProperty(s)&&(r[s]=n[s]===void 0&&i!==void 0?i[s]:n[s])}var s=arguments.length-2;if(s===1)r.children=t;else if(1<s){i=Array(s);for(var u=0;u<s;u++)i[u]=arguments[u+2];r.children=i}return{$$typeof:nr,type:e.type,key:o,ref:a,props:r,_owner:l}};P.createContext=function(e){return e={$$typeof:Zg,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Jg,_context:e},e.Consumer=e};P.createElement=ws;P.createFactory=function(e){var n=ws.bind(null,e);return n.type=e,n};P.createRef=function(){return{current:null}};P.forwardRef=function(e){return{$$typeof:em,render:e}};P.isValidElement=el;P.lazy=function(e){return{$$typeof:rm,_payload:{_status:-1,_result:e},_init:im}};P.memo=function(e,n){return{$$typeof:tm,type:e,compare:n===void 0?null:n}};P.startTransition=function(e){var n=$r.transition;$r.transition={};try{e()}finally{$r.transition=n}};P.unstable_act=bs;P.useCallback=function(e,n){return ue.current.useCallback(e,n)};P.useContext=function(e){return ue.current.useContext(e)};P.useDebugValue=function(){};P.useDeferredValue=function(e){return ue.current.useDeferredValue(e)};P.useEffect=function(e,n){return ue.current.useEffect(e,n)};P.useId=function(){return ue.current.useId()};P.useImperativeHandle=function(e,n,t){return ue.current.useImperativeHandle(e,n,t)};P.useInsertionEffect=function(e,n){return ue.current.useInsertionEffect(e,n)};P.useLayoutEffect=function(e,n){return ue.current.useLayoutEffect(e,n)};P.useMemo=function(e,n){return ue.current.useMemo(e,n)};P.useReducer=function(e,n,t){return ue.current.useReducer(e,n,t)};P.useRef=function(e){return ue.current.useRef(e)};P.useState=function(e){return ue.current.useState(e)};P.useSyncExternalStore=function(e,n,t){return ue.current.useSyncExternalStore(e,n,t)};P.useTransition=function(){return ue.current.useTransition()};P.version="18.3.1";ps.exports=P;var R=ps.exports;/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var um=R,cm=Symbol.for("react.element"),dm=Symbol.for("react.fragment"),fm=Object.prototype.hasOwnProperty,pm=um.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,hm={key:!0,ref:!0,__self:!0,__source:!0};function ks(e,n,t){var r,o={},a=null,l=null;t!==void 0&&(a=""+t),n.key!==void 0&&(a=""+n.key),n.ref!==void 0&&(l=n.ref);for(r in n)fm.call(n,r)&&!hm.hasOwnProperty(r)&&(o[r]=n[r]);if(e&&e.defaultProps)for(r in n=e.defaultProps,n)o[r]===void 0&&(o[r]=n[r]);return{$$typeof:cm,type:e,key:a,ref:l,props:o,_owner:pm.current}}fo.Fragment=dm;fo.jsx=ks;fo.jsxs=ks;fs.exports=fo;var d=fs.exports,Ss={exports:{}},ke={},_s={exports:{}},Cs={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function n(C,N){var T=C.length;C.push(N);e:for(;0<T;){var Q=T-1>>>1,q=C[Q];if(0<o(q,N))C[Q]=N,C[T]=q,T=Q;else break e}}function t(C){return C.length===0?null:C[0]}function r(C){if(C.length===0)return null;var N=C[0],T=C.pop();if(T!==N){C[0]=T;e:for(var Q=0,q=C.length,ir=q>>>1;Q<ir;){var bn=2*(Q+1)-1,To=C[bn],kn=bn+1,sr=C[kn];if(0>o(To,T))kn<q&&0>o(sr,To)?(C[Q]=sr,C[kn]=T,Q=kn):(C[Q]=To,C[bn]=T,Q=bn);else if(kn<q&&0>o(sr,T))C[Q]=sr,C[kn]=T,Q=kn;else break e}}return N}function o(C,N){var T=C.sortIndex-N.sortIndex;return T!==0?T:C.id-N.id}if(typeof performance=="object"&&typeof performance.now=="function"){var a=performance;e.unstable_now=function(){return a.now()}}else{var l=Date,i=l.now();e.unstable_now=function(){return l.now()-i}}var s=[],u=[],f=1,h=null,m=3,v=!1,S=!1,w=!1,$=typeof setTimeout=="function"?setTimeout:null,p=typeof clearTimeout=="function"?clearTimeout:null,c=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function g(C){for(var N=t(u);N!==null;){if(N.callback===null)r(u);else if(N.startTime<=C)r(u),N.sortIndex=N.expirationTime,n(s,N);else break;N=t(u)}}function x(C){if(w=!1,g(C),!S)if(t(s)!==null)S=!0,$o(y);else{var N=t(u);N!==null&&No(x,N.startTime-C)}}function y(C,N){S=!1,w&&(w=!1,p(j),j=-1),v=!0;var T=m;try{for(g(N),h=t(s);h!==null&&(!(h.expirationTime>N)||C&&!Te());){var Q=h.callback;if(typeof Q=="function"){h.callback=null,m=h.priorityLevel;var q=Q(h.expirationTime<=N);N=e.unstable_now(),typeof q=="function"?h.callback=q:h===t(s)&&r(s),g(N)}else r(s);h=t(s)}if(h!==null)var ir=!0;else{var bn=t(u);bn!==null&&No(x,bn.startTime-N),ir=!1}return ir}finally{h=null,m=T,v=!1}}var b=!1,E=null,j=-1,V=5,z=-1;function Te(){return!(e.unstable_now()-z<V)}function ht(){if(E!==null){var C=e.unstable_now();z=C;var N=!0;try{N=E(!0,C)}finally{N?gt():(b=!1,E=null)}}else b=!1}var gt;if(typeof c=="function")gt=function(){c(ht)};else if(typeof MessageChannel<"u"){var ql=new MessageChannel,Gg=ql.port2;ql.port1.onmessage=ht,gt=function(){Gg.postMessage(null)}}else gt=function(){$(ht,0)};function $o(C){E=C,b||(b=!0,gt())}function No(C,N){j=$(function(){C(e.unstable_now())},N)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(C){C.callback=null},e.unstable_continueExecution=function(){S||v||(S=!0,$o(y))},e.unstable_forceFrameRate=function(C){0>C||125<C?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):V=0<C?Math.floor(1e3/C):5},e.unstable_getCurrentPriorityLevel=function(){return m},e.unstable_getFirstCallbackNode=function(){return t(s)},e.unstable_next=function(C){switch(m){case 1:case 2:case 3:var N=3;break;default:N=m}var T=m;m=N;try{return C()}finally{m=T}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(C,N){switch(C){case 1:case 2:case 3:case 4:case 5:break;default:C=3}var T=m;m=C;try{return N()}finally{m=T}},e.unstable_scheduleCallback=function(C,N,T){var Q=e.unstable_now();switch(typeof T=="object"&&T!==null?(T=T.delay,T=typeof T=="number"&&0<T?Q+T:Q):T=Q,C){case 1:var q=-1;break;case 2:q=250;break;case 5:q=1073741823;break;case 4:q=1e4;break;default:q=5e3}return q=T+q,C={id:f++,callback:N,priorityLevel:C,startTime:T,expirationTime:q,sortIndex:-1},T>Q?(C.sortIndex=T,n(u,C),t(s)===null&&C===t(u)&&(w?(p(j),j=-1):w=!0,No(x,T-Q))):(C.sortIndex=q,n(s,C),S||v||(S=!0,$o(y))),C},e.unstable_shouldYield=Te,e.unstable_wrapCallback=function(C){var N=m;return function(){var T=m;m=N;try{return C.apply(this,arguments)}finally{m=T}}}})(Cs);_s.exports=Cs;var gm=_s.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var mm=R,be=gm;function k(e){for(var n="https://reactjs.org/docs/error-decoder.html?invariant="+e,t=1;t<arguments.length;t++)n+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var js=new Set,Lt={};function Fn(e,n){tt(e,n),tt(e+"Capture",n)}function tt(e,n){for(Lt[e]=n,e=0;e<n.length;e++)js.add(n[e])}var Ye=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),oa=Object.prototype.hasOwnProperty,ym=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,ni={},ti={};function vm(e){return oa.call(ti,e)?!0:oa.call(ni,e)?!1:ym.test(e)?ti[e]=!0:(ni[e]=!0,!1)}function xm(e,n,t,r){if(t!==null&&t.type===0)return!1;switch(typeof n){case"function":case"symbol":return!0;case"boolean":return r?!1:t!==null?!t.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function wm(e,n,t,r){if(n===null||typeof n>"u"||xm(e,n,t,r))return!0;if(r)return!1;if(t!==null)switch(t.type){case 3:return!n;case 4:return n===!1;case 5:return isNaN(n);case 6:return isNaN(n)||1>n}return!1}function ce(e,n,t,r,o,a,l){this.acceptsBooleans=n===2||n===3||n===4,this.attributeName=r,this.attributeNamespace=o,this.mustUseProperty=t,this.propertyName=e,this.type=n,this.sanitizeURL=a,this.removeEmptyString=l}var te={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){te[e]=new ce(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var n=e[0];te[n]=new ce(n,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){te[e]=new ce(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){te[e]=new ce(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){te[e]=new ce(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){te[e]=new ce(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){te[e]=new ce(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){te[e]=new ce(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){te[e]=new ce(e,5,!1,e.toLowerCase(),null,!1,!1)});var nl=/[\-:]([a-z])/g;function tl(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var n=e.replace(nl,tl);te[n]=new ce(n,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var n=e.replace(nl,tl);te[n]=new ce(n,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var n=e.replace(nl,tl);te[n]=new ce(n,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){te[e]=new ce(e,1,!1,e.toLowerCase(),null,!1,!1)});te.xlinkHref=new ce("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){te[e]=new ce(e,1,!1,e.toLowerCase(),null,!0,!0)});function rl(e,n,t,r){var o=te.hasOwnProperty(n)?te[n]:null;(o!==null?o.type!==0:r||!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(wm(n,t,o,r)&&(t=null),r||o===null?vm(n)&&(t===null?e.removeAttribute(n):e.setAttribute(n,""+t)):o.mustUseProperty?e[o.propertyName]=t===null?o.type===3?!1:"":t:(n=o.attributeName,r=o.attributeNamespace,t===null?e.removeAttribute(n):(o=o.type,t=o===3||o===4&&t===!0?"":""+t,r?e.setAttributeNS(r,n,t):e.setAttribute(n,t))))}var Ze=mm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,cr=Symbol.for("react.element"),Rn=Symbol.for("react.portal"),Dn=Symbol.for("react.fragment"),ol=Symbol.for("react.strict_mode"),aa=Symbol.for("react.profiler"),Es=Symbol.for("react.provider"),$s=Symbol.for("react.context"),al=Symbol.for("react.forward_ref"),la=Symbol.for("react.suspense"),ia=Symbol.for("react.suspense_list"),ll=Symbol.for("react.memo"),nn=Symbol.for("react.lazy"),Ns=Symbol.for("react.offscreen"),ri=Symbol.iterator;function mt(e){return e===null||typeof e!="object"?null:(e=ri&&e[ri]||e["@@iterator"],typeof e=="function"?e:null)}var W=Object.assign,zo;function _t(e){if(zo===void 0)try{throw Error()}catch(t){var n=t.stack.trim().match(/\n( *(at )?)/);zo=n&&n[1]||""}return`
`+zo+e}var Mo=!1;function Oo(e,n){if(!e||Mo)return"";Mo=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(n)if(n=function(){throw Error()},Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(n,[])}catch(u){var r=u}Reflect.construct(e,[],n)}else{try{n.call()}catch(u){r=u}e.call(n.prototype)}else{try{throw Error()}catch(u){r=u}e()}}catch(u){if(u&&r&&typeof u.stack=="string"){for(var o=u.stack.split(`
`),a=r.stack.split(`
`),l=o.length-1,i=a.length-1;1<=l&&0<=i&&o[l]!==a[i];)i--;for(;1<=l&&0<=i;l--,i--)if(o[l]!==a[i]){if(l!==1||i!==1)do if(l--,i--,0>i||o[l]!==a[i]){var s=`
`+o[l].replace(" at new "," at ");return e.displayName&&s.includes("<anonymous>")&&(s=s.replace("<anonymous>",e.displayName)),s}while(1<=l&&0<=i);break}}}finally{Mo=!1,Error.prepareStackTrace=t}return(e=e?e.displayName||e.name:"")?_t(e):""}function bm(e){switch(e.tag){case 5:return _t(e.type);case 16:return _t("Lazy");case 13:return _t("Suspense");case 19:return _t("SuspenseList");case 0:case 2:case 15:return e=Oo(e.type,!1),e;case 11:return e=Oo(e.type.render,!1),e;case 1:return e=Oo(e.type,!0),e;default:return""}}function sa(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Dn:return"Fragment";case Rn:return"Portal";case aa:return"Profiler";case ol:return"StrictMode";case la:return"Suspense";case ia:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case $s:return(e.displayName||"Context")+".Consumer";case Es:return(e._context.displayName||"Context")+".Provider";case al:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case ll:return n=e.displayName||null,n!==null?n:sa(e.type)||"Memo";case nn:n=e._payload,e=e._init;try{return sa(e(n))}catch{}}return null}function km(e){var n=e.type;switch(e.tag){case 24:return"Cache";case 9:return(n.displayName||"Context")+".Consumer";case 10:return(n._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=n.render,e=e.displayName||e.name||"",n.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return n;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return sa(n);case 8:return n===ol?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n}return null}function mn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Ts(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function Sm(e){var n=Ts(e)?"checked":"value",t=Object.getOwnPropertyDescriptor(e.constructor.prototype,n),r=""+e[n];if(!e.hasOwnProperty(n)&&typeof t<"u"&&typeof t.get=="function"&&typeof t.set=="function"){var o=t.get,a=t.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return o.call(this)},set:function(l){r=""+l,a.call(this,l)}}),Object.defineProperty(e,n,{enumerable:t.enumerable}),{getValue:function(){return r},setValue:function(l){r=""+l},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function dr(e){e._valueTracker||(e._valueTracker=Sm(e))}function Ps(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var t=n.getValue(),r="";return e&&(r=Ts(e)?e.checked?"true":"false":e.value),e=r,e!==t?(n.setValue(e),!0):!1}function Ar(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function ua(e,n){var t=n.checked;return W({},n,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:t??e._wrapperState.initialChecked})}function oi(e,n){var t=n.defaultValue==null?"":n.defaultValue,r=n.checked!=null?n.checked:n.defaultChecked;t=mn(n.value!=null?n.value:t),e._wrapperState={initialChecked:r,initialValue:t,controlled:n.type==="checkbox"||n.type==="radio"?n.checked!=null:n.value!=null}}function zs(e,n){n=n.checked,n!=null&&rl(e,"checked",n,!1)}function ca(e,n){zs(e,n);var t=mn(n.value),r=n.type;if(t!=null)r==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+t):e.value!==""+t&&(e.value=""+t);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}n.hasOwnProperty("value")?da(e,n.type,t):n.hasOwnProperty("defaultValue")&&da(e,n.type,mn(n.defaultValue)),n.checked==null&&n.defaultChecked!=null&&(e.defaultChecked=!!n.defaultChecked)}function ai(e,n,t){if(n.hasOwnProperty("value")||n.hasOwnProperty("defaultValue")){var r=n.type;if(!(r!=="submit"&&r!=="reset"||n.value!==void 0&&n.value!==null))return;n=""+e._wrapperState.initialValue,t||n===e.value||(e.value=n),e.defaultValue=n}t=e.name,t!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,t!==""&&(e.name=t)}function da(e,n,t){(n!=="number"||Ar(e.ownerDocument)!==e)&&(t==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+t&&(e.defaultValue=""+t))}var Ct=Array.isArray;function Xn(e,n,t,r){if(e=e.options,n){n={};for(var o=0;o<t.length;o++)n["$"+t[o]]=!0;for(t=0;t<e.length;t++)o=n.hasOwnProperty("$"+e[t].value),e[t].selected!==o&&(e[t].selected=o),o&&r&&(e[t].defaultSelected=!0)}else{for(t=""+mn(t),n=null,o=0;o<e.length;o++){if(e[o].value===t){e[o].selected=!0,r&&(e[o].defaultSelected=!0);return}n!==null||e[o].disabled||(n=e[o])}n!==null&&(n.selected=!0)}}function fa(e,n){if(n.dangerouslySetInnerHTML!=null)throw Error(k(91));return W({},n,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function li(e,n){var t=n.value;if(t==null){if(t=n.children,n=n.defaultValue,t!=null){if(n!=null)throw Error(k(92));if(Ct(t)){if(1<t.length)throw Error(k(93));t=t[0]}n=t}n==null&&(n=""),t=n}e._wrapperState={initialValue:mn(t)}}function Ms(e,n){var t=mn(n.value),r=mn(n.defaultValue);t!=null&&(t=""+t,t!==e.value&&(e.value=t),n.defaultValue==null&&e.defaultValue!==t&&(e.defaultValue=t)),r!=null&&(e.defaultValue=""+r)}function ii(e){var n=e.textContent;n===e._wrapperState.initialValue&&n!==""&&n!==null&&(e.value=n)}function Os(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function pa(e,n){return e==null||e==="http://www.w3.org/1999/xhtml"?Os(n):e==="http://www.w3.org/2000/svg"&&n==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var fr,Fs=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(n,t,r,o){MSApp.execUnsafeLocalFunction(function(){return e(n,t,r,o)})}:e}(function(e,n){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=n;else{for(fr=fr||document.createElement("div"),fr.innerHTML="<svg>"+n.valueOf().toString()+"</svg>",n=fr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;n.firstChild;)e.appendChild(n.firstChild)}});function Rt(e,n){if(n){var t=e.firstChild;if(t&&t===e.lastChild&&t.nodeType===3){t.nodeValue=n;return}}e.textContent=n}var $t={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},_m=["Webkit","ms","Moz","O"];Object.keys($t).forEach(function(e){_m.forEach(function(n){n=n+e.charAt(0).toUpperCase()+e.substring(1),$t[n]=$t[e]})});function Is(e,n,t){return n==null||typeof n=="boolean"||n===""?"":t||typeof n!="number"||n===0||$t.hasOwnProperty(e)&&$t[e]?(""+n).trim():n+"px"}function Ls(e,n){e=e.style;for(var t in n)if(n.hasOwnProperty(t)){var r=t.indexOf("--")===0,o=Is(t,n[t],r);t==="float"&&(t="cssFloat"),r?e.setProperty(t,o):e[t]=o}}var Cm=W({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ha(e,n){if(n){if(Cm[e]&&(n.children!=null||n.dangerouslySetInnerHTML!=null))throw Error(k(137,e));if(n.dangerouslySetInnerHTML!=null){if(n.children!=null)throw Error(k(60));if(typeof n.dangerouslySetInnerHTML!="object"||!("__html"in n.dangerouslySetInnerHTML))throw Error(k(61))}if(n.style!=null&&typeof n.style!="object")throw Error(k(62))}}function ga(e,n){if(e.indexOf("-")===-1)return typeof n.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ma=null;function il(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var ya=null,qn=null,Jn=null;function si(e){if(e=or(e)){if(typeof ya!="function")throw Error(k(280));var n=e.stateNode;n&&(n=yo(n),ya(e.stateNode,e.type,n))}}function Rs(e){qn?Jn?Jn.push(e):Jn=[e]:qn=e}function Ds(){if(qn){var e=qn,n=Jn;if(Jn=qn=null,si(e),n)for(e=0;e<n.length;e++)si(n[e])}}function As(e,n){return e(n)}function Bs(){}var Fo=!1;function Us(e,n,t){if(Fo)return e(n,t);Fo=!0;try{return As(e,n,t)}finally{Fo=!1,(qn!==null||Jn!==null)&&(Bs(),Ds())}}function Dt(e,n){var t=e.stateNode;if(t===null)return null;var r=yo(t);if(r===null)return null;t=r[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(t&&typeof t!="function")throw Error(k(231,n,typeof t));return t}var va=!1;if(Ye)try{var yt={};Object.defineProperty(yt,"passive",{get:function(){va=!0}}),window.addEventListener("test",yt,yt),window.removeEventListener("test",yt,yt)}catch{va=!1}function jm(e,n,t,r,o,a,l,i,s){var u=Array.prototype.slice.call(arguments,3);try{n.apply(t,u)}catch(f){this.onError(f)}}var Nt=!1,Br=null,Ur=!1,xa=null,Em={onError:function(e){Nt=!0,Br=e}};function $m(e,n,t,r,o,a,l,i,s){Nt=!1,Br=null,jm.apply(Em,arguments)}function Nm(e,n,t,r,o,a,l,i,s){if($m.apply(this,arguments),Nt){if(Nt){var u=Br;Nt=!1,Br=null}else throw Error(k(198));Ur||(Ur=!0,xa=u)}}function In(e){var n=e,t=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,n.flags&4098&&(t=n.return),e=n.return;while(e)}return n.tag===3?t:null}function Ws(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function ui(e){if(In(e)!==e)throw Error(k(188))}function Tm(e){var n=e.alternate;if(!n){if(n=In(e),n===null)throw Error(k(188));return n!==e?null:e}for(var t=e,r=n;;){var o=t.return;if(o===null)break;var a=o.alternate;if(a===null){if(r=o.return,r!==null){t=r;continue}break}if(o.child===a.child){for(a=o.child;a;){if(a===t)return ui(o),e;if(a===r)return ui(o),n;a=a.sibling}throw Error(k(188))}if(t.return!==r.return)t=o,r=a;else{for(var l=!1,i=o.child;i;){if(i===t){l=!0,t=o,r=a;break}if(i===r){l=!0,r=o,t=a;break}i=i.sibling}if(!l){for(i=a.child;i;){if(i===t){l=!0,t=a,r=o;break}if(i===r){l=!0,r=a,t=o;break}i=i.sibling}if(!l)throw Error(k(189))}}if(t.alternate!==r)throw Error(k(190))}if(t.tag!==3)throw Error(k(188));return t.stateNode.current===t?e:n}function Hs(e){return e=Tm(e),e!==null?Vs(e):null}function Vs(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var n=Vs(e);if(n!==null)return n;e=e.sibling}return null}var Qs=be.unstable_scheduleCallback,ci=be.unstable_cancelCallback,Pm=be.unstable_shouldYield,zm=be.unstable_requestPaint,G=be.unstable_now,Mm=be.unstable_getCurrentPriorityLevel,sl=be.unstable_ImmediatePriority,Gs=be.unstable_UserBlockingPriority,Wr=be.unstable_NormalPriority,Om=be.unstable_LowPriority,Ks=be.unstable_IdlePriority,po=null,Be=null;function Fm(e){if(Be&&typeof Be.onCommitFiberRoot=="function")try{Be.onCommitFiberRoot(po,e,void 0,(e.current.flags&128)===128)}catch{}}var Fe=Math.clz32?Math.clz32:Rm,Im=Math.log,Lm=Math.LN2;function Rm(e){return e>>>=0,e===0?32:31-(Im(e)/Lm|0)|0}var pr=64,hr=4194304;function jt(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Hr(e,n){var t=e.pendingLanes;if(t===0)return 0;var r=0,o=e.suspendedLanes,a=e.pingedLanes,l=t&268435455;if(l!==0){var i=l&~o;i!==0?r=jt(i):(a&=l,a!==0&&(r=jt(a)))}else l=t&~o,l!==0?r=jt(l):a!==0&&(r=jt(a));if(r===0)return 0;if(n!==0&&n!==r&&!(n&o)&&(o=r&-r,a=n&-n,o>=a||o===16&&(a&4194240)!==0))return n;if(r&4&&(r|=t&16),n=e.entangledLanes,n!==0)for(e=e.entanglements,n&=r;0<n;)t=31-Fe(n),o=1<<t,r|=e[t],n&=~o;return r}function Dm(e,n){switch(e){case 1:case 2:case 4:return n+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Am(e,n){for(var t=e.suspendedLanes,r=e.pingedLanes,o=e.expirationTimes,a=e.pendingLanes;0<a;){var l=31-Fe(a),i=1<<l,s=o[l];s===-1?(!(i&t)||i&r)&&(o[l]=Dm(i,n)):s<=n&&(e.expiredLanes|=i),a&=~i}}function wa(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Ys(){var e=pr;return pr<<=1,!(pr&4194240)&&(pr=64),e}function Io(e){for(var n=[],t=0;31>t;t++)n.push(e);return n}function tr(e,n,t){e.pendingLanes|=n,n!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,n=31-Fe(n),e[n]=t}function Bm(e,n){var t=e.pendingLanes&~n;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=n,e.mutableReadLanes&=n,e.entangledLanes&=n,n=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<t;){var o=31-Fe(t),a=1<<o;n[o]=0,r[o]=-1,e[o]=-1,t&=~a}}function ul(e,n){var t=e.entangledLanes|=n;for(e=e.entanglements;t;){var r=31-Fe(t),o=1<<r;o&n|e[r]&n&&(e[r]|=n),t&=~o}}var F=0;function Xs(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var qs,cl,Js,Zs,eu,ba=!1,gr=[],sn=null,un=null,cn=null,At=new Map,Bt=new Map,rn=[],Um="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function di(e,n){switch(e){case"focusin":case"focusout":sn=null;break;case"dragenter":case"dragleave":un=null;break;case"mouseover":case"mouseout":cn=null;break;case"pointerover":case"pointerout":At.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":Bt.delete(n.pointerId)}}function vt(e,n,t,r,o,a){return e===null||e.nativeEvent!==a?(e={blockedOn:n,domEventName:t,eventSystemFlags:r,nativeEvent:a,targetContainers:[o]},n!==null&&(n=or(n),n!==null&&cl(n)),e):(e.eventSystemFlags|=r,n=e.targetContainers,o!==null&&n.indexOf(o)===-1&&n.push(o),e)}function Wm(e,n,t,r,o){switch(n){case"focusin":return sn=vt(sn,e,n,t,r,o),!0;case"dragenter":return un=vt(un,e,n,t,r,o),!0;case"mouseover":return cn=vt(cn,e,n,t,r,o),!0;case"pointerover":var a=o.pointerId;return At.set(a,vt(At.get(a)||null,e,n,t,r,o)),!0;case"gotpointercapture":return a=o.pointerId,Bt.set(a,vt(Bt.get(a)||null,e,n,t,r,o)),!0}return!1}function nu(e){var n=Cn(e.target);if(n!==null){var t=In(n);if(t!==null){if(n=t.tag,n===13){if(n=Ws(t),n!==null){e.blockedOn=n,eu(e.priority,function(){Js(t)});return}}else if(n===3&&t.stateNode.current.memoizedState.isDehydrated){e.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Nr(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var t=ka(e.domEventName,e.eventSystemFlags,n[0],e.nativeEvent);if(t===null){t=e.nativeEvent;var r=new t.constructor(t.type,t);ma=r,t.target.dispatchEvent(r),ma=null}else return n=or(t),n!==null&&cl(n),e.blockedOn=t,!1;n.shift()}return!0}function fi(e,n,t){Nr(e)&&t.delete(n)}function Hm(){ba=!1,sn!==null&&Nr(sn)&&(sn=null),un!==null&&Nr(un)&&(un=null),cn!==null&&Nr(cn)&&(cn=null),At.forEach(fi),Bt.forEach(fi)}function xt(e,n){e.blockedOn===n&&(e.blockedOn=null,ba||(ba=!0,be.unstable_scheduleCallback(be.unstable_NormalPriority,Hm)))}function Ut(e){function n(o){return xt(o,e)}if(0<gr.length){xt(gr[0],e);for(var t=1;t<gr.length;t++){var r=gr[t];r.blockedOn===e&&(r.blockedOn=null)}}for(sn!==null&&xt(sn,e),un!==null&&xt(un,e),cn!==null&&xt(cn,e),At.forEach(n),Bt.forEach(n),t=0;t<rn.length;t++)r=rn[t],r.blockedOn===e&&(r.blockedOn=null);for(;0<rn.length&&(t=rn[0],t.blockedOn===null);)nu(t),t.blockedOn===null&&rn.shift()}var Zn=Ze.ReactCurrentBatchConfig,Vr=!0;function Vm(e,n,t,r){var o=F,a=Zn.transition;Zn.transition=null;try{F=1,dl(e,n,t,r)}finally{F=o,Zn.transition=a}}function Qm(e,n,t,r){var o=F,a=Zn.transition;Zn.transition=null;try{F=4,dl(e,n,t,r)}finally{F=o,Zn.transition=a}}function dl(e,n,t,r){if(Vr){var o=ka(e,n,t,r);if(o===null)Qo(e,n,r,Qr,t),di(e,r);else if(Wm(o,e,n,t,r))r.stopPropagation();else if(di(e,r),n&4&&-1<Um.indexOf(e)){for(;o!==null;){var a=or(o);if(a!==null&&qs(a),a=ka(e,n,t,r),a===null&&Qo(e,n,r,Qr,t),a===o)break;o=a}o!==null&&r.stopPropagation()}else Qo(e,n,r,null,t)}}var Qr=null;function ka(e,n,t,r){if(Qr=null,e=il(r),e=Cn(e),e!==null)if(n=In(e),n===null)e=null;else if(t=n.tag,t===13){if(e=Ws(n),e!==null)return e;e=null}else if(t===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null);return Qr=e,null}function tu(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Mm()){case sl:return 1;case Gs:return 4;case Wr:case Om:return 16;case Ks:return 536870912;default:return 16}default:return 16}}var an=null,fl=null,Tr=null;function ru(){if(Tr)return Tr;var e,n=fl,t=n.length,r,o="value"in an?an.value:an.textContent,a=o.length;for(e=0;e<t&&n[e]===o[e];e++);var l=t-e;for(r=1;r<=l&&n[t-r]===o[a-r];r++);return Tr=o.slice(e,1<r?1-r:void 0)}function Pr(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function mr(){return!0}function pi(){return!1}function Se(e){function n(t,r,o,a,l){this._reactName=t,this._targetInst=o,this.type=r,this.nativeEvent=a,this.target=l,this.currentTarget=null;for(var i in e)e.hasOwnProperty(i)&&(t=e[i],this[i]=t?t(a):a[i]);return this.isDefaultPrevented=(a.defaultPrevented!=null?a.defaultPrevented:a.returnValue===!1)?mr:pi,this.isPropagationStopped=pi,this}return W(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=mr)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=mr)},persist:function(){},isPersistent:mr}),n}var dt={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},pl=Se(dt),rr=W({},dt,{view:0,detail:0}),Gm=Se(rr),Lo,Ro,wt,ho=W({},rr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:hl,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==wt&&(wt&&e.type==="mousemove"?(Lo=e.screenX-wt.screenX,Ro=e.screenY-wt.screenY):Ro=Lo=0,wt=e),Lo)},movementY:function(e){return"movementY"in e?e.movementY:Ro}}),hi=Se(ho),Km=W({},ho,{dataTransfer:0}),Ym=Se(Km),Xm=W({},rr,{relatedTarget:0}),Do=Se(Xm),qm=W({},dt,{animationName:0,elapsedTime:0,pseudoElement:0}),Jm=Se(qm),Zm=W({},dt,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),e0=Se(Zm),n0=W({},dt,{data:0}),gi=Se(n0),t0={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},r0={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},o0={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function a0(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=o0[e])?!!n[e]:!1}function hl(){return a0}var l0=W({},rr,{key:function(e){if(e.key){var n=t0[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=Pr(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?r0[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:hl,charCode:function(e){return e.type==="keypress"?Pr(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Pr(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),i0=Se(l0),s0=W({},ho,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),mi=Se(s0),u0=W({},rr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:hl}),c0=Se(u0),d0=W({},dt,{propertyName:0,elapsedTime:0,pseudoElement:0}),f0=Se(d0),p0=W({},ho,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),h0=Se(p0),g0=[9,13,27,32],gl=Ye&&"CompositionEvent"in window,Tt=null;Ye&&"documentMode"in document&&(Tt=document.documentMode);var m0=Ye&&"TextEvent"in window&&!Tt,ou=Ye&&(!gl||Tt&&8<Tt&&11>=Tt),yi=" ",vi=!1;function au(e,n){switch(e){case"keyup":return g0.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function lu(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var An=!1;function y0(e,n){switch(e){case"compositionend":return lu(n);case"keypress":return n.which!==32?null:(vi=!0,yi);case"textInput":return e=n.data,e===yi&&vi?null:e;default:return null}}function v0(e,n){if(An)return e==="compositionend"||!gl&&au(e,n)?(e=ru(),Tr=fl=an=null,An=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return ou&&n.locale!=="ko"?null:n.data;default:return null}}var x0={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function xi(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!x0[e.type]:n==="textarea"}function iu(e,n,t,r){Rs(r),n=Gr(n,"onChange"),0<n.length&&(t=new pl("onChange","change",null,t,r),e.push({event:t,listeners:n}))}var Pt=null,Wt=null;function w0(e){vu(e,0)}function go(e){var n=Wn(e);if(Ps(n))return e}function b0(e,n){if(e==="change")return n}var su=!1;if(Ye){var Ao;if(Ye){var Bo="oninput"in document;if(!Bo){var wi=document.createElement("div");wi.setAttribute("oninput","return;"),Bo=typeof wi.oninput=="function"}Ao=Bo}else Ao=!1;su=Ao&&(!document.documentMode||9<document.documentMode)}function bi(){Pt&&(Pt.detachEvent("onpropertychange",uu),Wt=Pt=null)}function uu(e){if(e.propertyName==="value"&&go(Wt)){var n=[];iu(n,Wt,e,il(e)),Us(w0,n)}}function k0(e,n,t){e==="focusin"?(bi(),Pt=n,Wt=t,Pt.attachEvent("onpropertychange",uu)):e==="focusout"&&bi()}function S0(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return go(Wt)}function _0(e,n){if(e==="click")return go(n)}function C0(e,n){if(e==="input"||e==="change")return go(n)}function j0(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var Le=typeof Object.is=="function"?Object.is:j0;function Ht(e,n){if(Le(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var t=Object.keys(e),r=Object.keys(n);if(t.length!==r.length)return!1;for(r=0;r<t.length;r++){var o=t[r];if(!oa.call(n,o)||!Le(e[o],n[o]))return!1}return!0}function ki(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Si(e,n){var t=ki(e);e=0;for(var r;t;){if(t.nodeType===3){if(r=e+t.textContent.length,e<=n&&r>=n)return{node:t,offset:n-e};e=r}e:{for(;t;){if(t.nextSibling){t=t.nextSibling;break e}t=t.parentNode}t=void 0}t=ki(t)}}function cu(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?cu(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function du(){for(var e=window,n=Ar();n instanceof e.HTMLIFrameElement;){try{var t=typeof n.contentWindow.location.href=="string"}catch{t=!1}if(t)e=n.contentWindow;else break;n=Ar(e.document)}return n}function ml(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}function E0(e){var n=du(),t=e.focusedElem,r=e.selectionRange;if(n!==t&&t&&t.ownerDocument&&cu(t.ownerDocument.documentElement,t)){if(r!==null&&ml(t)){if(n=r.start,e=r.end,e===void 0&&(e=n),"selectionStart"in t)t.selectionStart=n,t.selectionEnd=Math.min(e,t.value.length);else if(e=(n=t.ownerDocument||document)&&n.defaultView||window,e.getSelection){e=e.getSelection();var o=t.textContent.length,a=Math.min(r.start,o);r=r.end===void 0?a:Math.min(r.end,o),!e.extend&&a>r&&(o=r,r=a,a=o),o=Si(t,a);var l=Si(t,r);o&&l&&(e.rangeCount!==1||e.anchorNode!==o.node||e.anchorOffset!==o.offset||e.focusNode!==l.node||e.focusOffset!==l.offset)&&(n=n.createRange(),n.setStart(o.node,o.offset),e.removeAllRanges(),a>r?(e.addRange(n),e.extend(l.node,l.offset)):(n.setEnd(l.node,l.offset),e.addRange(n)))}}for(n=[],e=t;e=e.parentNode;)e.nodeType===1&&n.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof t.focus=="function"&&t.focus(),t=0;t<n.length;t++)e=n[t],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var $0=Ye&&"documentMode"in document&&11>=document.documentMode,Bn=null,Sa=null,zt=null,_a=!1;function _i(e,n,t){var r=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;_a||Bn==null||Bn!==Ar(r)||(r=Bn,"selectionStart"in r&&ml(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),zt&&Ht(zt,r)||(zt=r,r=Gr(Sa,"onSelect"),0<r.length&&(n=new pl("onSelect","select",null,n,t),e.push({event:n,listeners:r}),n.target=Bn)))}function yr(e,n){var t={};return t[e.toLowerCase()]=n.toLowerCase(),t["Webkit"+e]="webkit"+n,t["Moz"+e]="moz"+n,t}var Un={animationend:yr("Animation","AnimationEnd"),animationiteration:yr("Animation","AnimationIteration"),animationstart:yr("Animation","AnimationStart"),transitionend:yr("Transition","TransitionEnd")},Uo={},fu={};Ye&&(fu=document.createElement("div").style,"AnimationEvent"in window||(delete Un.animationend.animation,delete Un.animationiteration.animation,delete Un.animationstart.animation),"TransitionEvent"in window||delete Un.transitionend.transition);function mo(e){if(Uo[e])return Uo[e];if(!Un[e])return e;var n=Un[e],t;for(t in n)if(n.hasOwnProperty(t)&&t in fu)return Uo[e]=n[t];return e}var pu=mo("animationend"),hu=mo("animationiteration"),gu=mo("animationstart"),mu=mo("transitionend"),yu=new Map,Ci="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function vn(e,n){yu.set(e,n),Fn(n,[e])}for(var Wo=0;Wo<Ci.length;Wo++){var Ho=Ci[Wo],N0=Ho.toLowerCase(),T0=Ho[0].toUpperCase()+Ho.slice(1);vn(N0,"on"+T0)}vn(pu,"onAnimationEnd");vn(hu,"onAnimationIteration");vn(gu,"onAnimationStart");vn("dblclick","onDoubleClick");vn("focusin","onFocus");vn("focusout","onBlur");vn(mu,"onTransitionEnd");tt("onMouseEnter",["mouseout","mouseover"]);tt("onMouseLeave",["mouseout","mouseover"]);tt("onPointerEnter",["pointerout","pointerover"]);tt("onPointerLeave",["pointerout","pointerover"]);Fn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Fn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Fn("onBeforeInput",["compositionend","keypress","textInput","paste"]);Fn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Fn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Fn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Et="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),P0=new Set("cancel close invalid load scroll toggle".split(" ").concat(Et));function ji(e,n,t){var r=e.type||"unknown-event";e.currentTarget=t,Nm(r,n,void 0,e),e.currentTarget=null}function vu(e,n){n=(n&4)!==0;for(var t=0;t<e.length;t++){var r=e[t],o=r.event;r=r.listeners;e:{var a=void 0;if(n)for(var l=r.length-1;0<=l;l--){var i=r[l],s=i.instance,u=i.currentTarget;if(i=i.listener,s!==a&&o.isPropagationStopped())break e;ji(o,i,u),a=s}else for(l=0;l<r.length;l++){if(i=r[l],s=i.instance,u=i.currentTarget,i=i.listener,s!==a&&o.isPropagationStopped())break e;ji(o,i,u),a=s}}}if(Ur)throw e=xa,Ur=!1,xa=null,e}function L(e,n){var t=n[Na];t===void 0&&(t=n[Na]=new Set);var r=e+"__bubble";t.has(r)||(xu(n,e,2,!1),t.add(r))}function Vo(e,n,t){var r=0;n&&(r|=4),xu(t,e,r,n)}var vr="_reactListening"+Math.random().toString(36).slice(2);function Vt(e){if(!e[vr]){e[vr]=!0,js.forEach(function(t){t!=="selectionchange"&&(P0.has(t)||Vo(t,!1,e),Vo(t,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[vr]||(n[vr]=!0,Vo("selectionchange",!1,n))}}function xu(e,n,t,r){switch(tu(n)){case 1:var o=Vm;break;case 4:o=Qm;break;default:o=dl}t=o.bind(null,n,t,e),o=void 0,!va||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(o=!0),r?o!==void 0?e.addEventListener(n,t,{capture:!0,passive:o}):e.addEventListener(n,t,!0):o!==void 0?e.addEventListener(n,t,{passive:o}):e.addEventListener(n,t,!1)}function Qo(e,n,t,r,o){var a=r;if(!(n&1)&&!(n&2)&&r!==null)e:for(;;){if(r===null)return;var l=r.tag;if(l===3||l===4){var i=r.stateNode.containerInfo;if(i===o||i.nodeType===8&&i.parentNode===o)break;if(l===4)for(l=r.return;l!==null;){var s=l.tag;if((s===3||s===4)&&(s=l.stateNode.containerInfo,s===o||s.nodeType===8&&s.parentNode===o))return;l=l.return}for(;i!==null;){if(l=Cn(i),l===null)return;if(s=l.tag,s===5||s===6){r=a=l;continue e}i=i.parentNode}}r=r.return}Us(function(){var u=a,f=il(t),h=[];e:{var m=yu.get(e);if(m!==void 0){var v=pl,S=e;switch(e){case"keypress":if(Pr(t)===0)break e;case"keydown":case"keyup":v=i0;break;case"focusin":S="focus",v=Do;break;case"focusout":S="blur",v=Do;break;case"beforeblur":case"afterblur":v=Do;break;case"click":if(t.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":v=hi;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":v=Ym;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":v=c0;break;case pu:case hu:case gu:v=Jm;break;case mu:v=f0;break;case"scroll":v=Gm;break;case"wheel":v=h0;break;case"copy":case"cut":case"paste":v=e0;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":v=mi}var w=(n&4)!==0,$=!w&&e==="scroll",p=w?m!==null?m+"Capture":null:m;w=[];for(var c=u,g;c!==null;){g=c;var x=g.stateNode;if(g.tag===5&&x!==null&&(g=x,p!==null&&(x=Dt(c,p),x!=null&&w.push(Qt(c,x,g)))),$)break;c=c.return}0<w.length&&(m=new v(m,S,null,t,f),h.push({event:m,listeners:w}))}}if(!(n&7)){e:{if(m=e==="mouseover"||e==="pointerover",v=e==="mouseout"||e==="pointerout",m&&t!==ma&&(S=t.relatedTarget||t.fromElement)&&(Cn(S)||S[Xe]))break e;if((v||m)&&(m=f.window===f?f:(m=f.ownerDocument)?m.defaultView||m.parentWindow:window,v?(S=t.relatedTarget||t.toElement,v=u,S=S?Cn(S):null,S!==null&&($=In(S),S!==$||S.tag!==5&&S.tag!==6)&&(S=null)):(v=null,S=u),v!==S)){if(w=hi,x="onMouseLeave",p="onMouseEnter",c="mouse",(e==="pointerout"||e==="pointerover")&&(w=mi,x="onPointerLeave",p="onPointerEnter",c="pointer"),$=v==null?m:Wn(v),g=S==null?m:Wn(S),m=new w(x,c+"leave",v,t,f),m.target=$,m.relatedTarget=g,x=null,Cn(f)===u&&(w=new w(p,c+"enter",S,t,f),w.target=g,w.relatedTarget=$,x=w),$=x,v&&S)n:{for(w=v,p=S,c=0,g=w;g;g=Ln(g))c++;for(g=0,x=p;x;x=Ln(x))g++;for(;0<c-g;)w=Ln(w),c--;for(;0<g-c;)p=Ln(p),g--;for(;c--;){if(w===p||p!==null&&w===p.alternate)break n;w=Ln(w),p=Ln(p)}w=null}else w=null;v!==null&&Ei(h,m,v,w,!1),S!==null&&$!==null&&Ei(h,$,S,w,!0)}}e:{if(m=u?Wn(u):window,v=m.nodeName&&m.nodeName.toLowerCase(),v==="select"||v==="input"&&m.type==="file")var y=b0;else if(xi(m))if(su)y=C0;else{y=S0;var b=k0}else(v=m.nodeName)&&v.toLowerCase()==="input"&&(m.type==="checkbox"||m.type==="radio")&&(y=_0);if(y&&(y=y(e,u))){iu(h,y,t,f);break e}b&&b(e,m,u),e==="focusout"&&(b=m._wrapperState)&&b.controlled&&m.type==="number"&&da(m,"number",m.value)}switch(b=u?Wn(u):window,e){case"focusin":(xi(b)||b.contentEditable==="true")&&(Bn=b,Sa=u,zt=null);break;case"focusout":zt=Sa=Bn=null;break;case"mousedown":_a=!0;break;case"contextmenu":case"mouseup":case"dragend":_a=!1,_i(h,t,f);break;case"selectionchange":if($0)break;case"keydown":case"keyup":_i(h,t,f)}var E;if(gl)e:{switch(e){case"compositionstart":var j="onCompositionStart";break e;case"compositionend":j="onCompositionEnd";break e;case"compositionupdate":j="onCompositionUpdate";break e}j=void 0}else An?au(e,t)&&(j="onCompositionEnd"):e==="keydown"&&t.keyCode===229&&(j="onCompositionStart");j&&(ou&&t.locale!=="ko"&&(An||j!=="onCompositionStart"?j==="onCompositionEnd"&&An&&(E=ru()):(an=f,fl="value"in an?an.value:an.textContent,An=!0)),b=Gr(u,j),0<b.length&&(j=new gi(j,e,null,t,f),h.push({event:j,listeners:b}),E?j.data=E:(E=lu(t),E!==null&&(j.data=E)))),(E=m0?y0(e,t):v0(e,t))&&(u=Gr(u,"onBeforeInput"),0<u.length&&(f=new gi("onBeforeInput","beforeinput",null,t,f),h.push({event:f,listeners:u}),f.data=E))}vu(h,n)})}function Qt(e,n,t){return{instance:e,listener:n,currentTarget:t}}function Gr(e,n){for(var t=n+"Capture",r=[];e!==null;){var o=e,a=o.stateNode;o.tag===5&&a!==null&&(o=a,a=Dt(e,t),a!=null&&r.unshift(Qt(e,a,o)),a=Dt(e,n),a!=null&&r.push(Qt(e,a,o))),e=e.return}return r}function Ln(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Ei(e,n,t,r,o){for(var a=n._reactName,l=[];t!==null&&t!==r;){var i=t,s=i.alternate,u=i.stateNode;if(s!==null&&s===r)break;i.tag===5&&u!==null&&(i=u,o?(s=Dt(t,a),s!=null&&l.unshift(Qt(t,s,i))):o||(s=Dt(t,a),s!=null&&l.push(Qt(t,s,i)))),t=t.return}l.length!==0&&e.push({event:n,listeners:l})}var z0=/\r\n?/g,M0=/\u0000|\uFFFD/g;function $i(e){return(typeof e=="string"?e:""+e).replace(z0,`
`).replace(M0,"")}function xr(e,n,t){if(n=$i(n),$i(e)!==n&&t)throw Error(k(425))}function Kr(){}var Ca=null,ja=null;function Ea(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var $a=typeof setTimeout=="function"?setTimeout:void 0,O0=typeof clearTimeout=="function"?clearTimeout:void 0,Ni=typeof Promise=="function"?Promise:void 0,F0=typeof queueMicrotask=="function"?queueMicrotask:typeof Ni<"u"?function(e){return Ni.resolve(null).then(e).catch(I0)}:$a;function I0(e){setTimeout(function(){throw e})}function Go(e,n){var t=n,r=0;do{var o=t.nextSibling;if(e.removeChild(t),o&&o.nodeType===8)if(t=o.data,t==="/$"){if(r===0){e.removeChild(o),Ut(n);return}r--}else t!=="$"&&t!=="$?"&&t!=="$!"||r++;t=o}while(t);Ut(n)}function dn(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?")break;if(n==="/$")return null}}return e}function Ti(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="$"||t==="$!"||t==="$?"){if(n===0)return e;n--}else t==="/$"&&n++}e=e.previousSibling}return null}var ft=Math.random().toString(36).slice(2),Ae="__reactFiber$"+ft,Gt="__reactProps$"+ft,Xe="__reactContainer$"+ft,Na="__reactEvents$"+ft,L0="__reactListeners$"+ft,R0="__reactHandles$"+ft;function Cn(e){var n=e[Ae];if(n)return n;for(var t=e.parentNode;t;){if(n=t[Xe]||t[Ae]){if(t=n.alternate,n.child!==null||t!==null&&t.child!==null)for(e=Ti(e);e!==null;){if(t=e[Ae])return t;e=Ti(e)}return n}e=t,t=e.parentNode}return null}function or(e){return e=e[Ae]||e[Xe],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Wn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(k(33))}function yo(e){return e[Gt]||null}var Ta=[],Hn=-1;function xn(e){return{current:e}}function D(e){0>Hn||(e.current=Ta[Hn],Ta[Hn]=null,Hn--)}function I(e,n){Hn++,Ta[Hn]=e.current,e.current=n}var yn={},le=xn(yn),he=xn(!1),Tn=yn;function rt(e,n){var t=e.type.contextTypes;if(!t)return yn;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===n)return r.__reactInternalMemoizedMaskedChildContext;var o={},a;for(a in t)o[a]=n[a];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=n,e.__reactInternalMemoizedMaskedChildContext=o),o}function ge(e){return e=e.childContextTypes,e!=null}function Yr(){D(he),D(le)}function Pi(e,n,t){if(le.current!==yn)throw Error(k(168));I(le,n),I(he,t)}function wu(e,n,t){var r=e.stateNode;if(n=n.childContextTypes,typeof r.getChildContext!="function")return t;r=r.getChildContext();for(var o in r)if(!(o in n))throw Error(k(108,km(e)||"Unknown",o));return W({},t,r)}function Xr(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||yn,Tn=le.current,I(le,e),I(he,he.current),!0}function zi(e,n,t){var r=e.stateNode;if(!r)throw Error(k(169));t?(e=wu(e,n,Tn),r.__reactInternalMemoizedMergedChildContext=e,D(he),D(le),I(le,e)):D(he),I(he,t)}var Ve=null,vo=!1,Ko=!1;function bu(e){Ve===null?Ve=[e]:Ve.push(e)}function D0(e){vo=!0,bu(e)}function wn(){if(!Ko&&Ve!==null){Ko=!0;var e=0,n=F;try{var t=Ve;for(F=1;e<t.length;e++){var r=t[e];do r=r(!0);while(r!==null)}Ve=null,vo=!1}catch(o){throw Ve!==null&&(Ve=Ve.slice(e+1)),Qs(sl,wn),o}finally{F=n,Ko=!1}}return null}var Vn=[],Qn=0,qr=null,Jr=0,_e=[],Ce=0,Pn=null,Qe=1,Ge="";function Sn(e,n){Vn[Qn++]=Jr,Vn[Qn++]=qr,qr=e,Jr=n}function ku(e,n,t){_e[Ce++]=Qe,_e[Ce++]=Ge,_e[Ce++]=Pn,Pn=e;var r=Qe;e=Ge;var o=32-Fe(r)-1;r&=~(1<<o),t+=1;var a=32-Fe(n)+o;if(30<a){var l=o-o%5;a=(r&(1<<l)-1).toString(32),r>>=l,o-=l,Qe=1<<32-Fe(n)+o|t<<o|r,Ge=a+e}else Qe=1<<a|t<<o|r,Ge=e}function yl(e){e.return!==null&&(Sn(e,1),ku(e,1,0))}function vl(e){for(;e===qr;)qr=Vn[--Qn],Vn[Qn]=null,Jr=Vn[--Qn],Vn[Qn]=null;for(;e===Pn;)Pn=_e[--Ce],_e[Ce]=null,Ge=_e[--Ce],_e[Ce]=null,Qe=_e[--Ce],_e[Ce]=null}var we=null,xe=null,A=!1,Oe=null;function Su(e,n){var t=je(5,null,null,0);t.elementType="DELETED",t.stateNode=n,t.return=e,n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)}function Mi(e,n){switch(e.tag){case 5:var t=e.type;return n=n.nodeType!==1||t.toLowerCase()!==n.nodeName.toLowerCase()?null:n,n!==null?(e.stateNode=n,we=e,xe=dn(n.firstChild),!0):!1;case 6:return n=e.pendingProps===""||n.nodeType!==3?null:n,n!==null?(e.stateNode=n,we=e,xe=null,!0):!1;case 13:return n=n.nodeType!==8?null:n,n!==null?(t=Pn!==null?{id:Qe,overflow:Ge}:null,e.memoizedState={dehydrated:n,treeContext:t,retryLane:1073741824},t=je(18,null,null,0),t.stateNode=n,t.return=e,e.child=t,we=e,xe=null,!0):!1;default:return!1}}function Pa(e){return(e.mode&1)!==0&&(e.flags&128)===0}function za(e){if(A){var n=xe;if(n){var t=n;if(!Mi(e,n)){if(Pa(e))throw Error(k(418));n=dn(t.nextSibling);var r=we;n&&Mi(e,n)?Su(r,t):(e.flags=e.flags&-4097|2,A=!1,we=e)}}else{if(Pa(e))throw Error(k(418));e.flags=e.flags&-4097|2,A=!1,we=e}}}function Oi(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;we=e}function wr(e){if(e!==we)return!1;if(!A)return Oi(e),A=!0,!1;var n;if((n=e.tag!==3)&&!(n=e.tag!==5)&&(n=e.type,n=n!=="head"&&n!=="body"&&!Ea(e.type,e.memoizedProps)),n&&(n=xe)){if(Pa(e))throw _u(),Error(k(418));for(;n;)Su(e,n),n=dn(n.nextSibling)}if(Oi(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(k(317));e:{for(e=e.nextSibling,n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="/$"){if(n===0){xe=dn(e.nextSibling);break e}n--}else t!=="$"&&t!=="$!"&&t!=="$?"||n++}e=e.nextSibling}xe=null}}else xe=we?dn(e.stateNode.nextSibling):null;return!0}function _u(){for(var e=xe;e;)e=dn(e.nextSibling)}function ot(){xe=we=null,A=!1}function xl(e){Oe===null?Oe=[e]:Oe.push(e)}var A0=Ze.ReactCurrentBatchConfig;function bt(e,n,t){if(e=t.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(t._owner){if(t=t._owner,t){if(t.tag!==1)throw Error(k(309));var r=t.stateNode}if(!r)throw Error(k(147,e));var o=r,a=""+e;return n!==null&&n.ref!==null&&typeof n.ref=="function"&&n.ref._stringRef===a?n.ref:(n=function(l){var i=o.refs;l===null?delete i[a]:i[a]=l},n._stringRef=a,n)}if(typeof e!="string")throw Error(k(284));if(!t._owner)throw Error(k(290,e))}return e}function br(e,n){throw e=Object.prototype.toString.call(n),Error(k(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e))}function Fi(e){var n=e._init;return n(e._payload)}function Cu(e){function n(p,c){if(e){var g=p.deletions;g===null?(p.deletions=[c],p.flags|=16):g.push(c)}}function t(p,c){if(!e)return null;for(;c!==null;)n(p,c),c=c.sibling;return null}function r(p,c){for(p=new Map;c!==null;)c.key!==null?p.set(c.key,c):p.set(c.index,c),c=c.sibling;return p}function o(p,c){return p=gn(p,c),p.index=0,p.sibling=null,p}function a(p,c,g){return p.index=g,e?(g=p.alternate,g!==null?(g=g.index,g<c?(p.flags|=2,c):g):(p.flags|=2,c)):(p.flags|=1048576,c)}function l(p){return e&&p.alternate===null&&(p.flags|=2),p}function i(p,c,g,x){return c===null||c.tag!==6?(c=na(g,p.mode,x),c.return=p,c):(c=o(c,g),c.return=p,c)}function s(p,c,g,x){var y=g.type;return y===Dn?f(p,c,g.props.children,x,g.key):c!==null&&(c.elementType===y||typeof y=="object"&&y!==null&&y.$$typeof===nn&&Fi(y)===c.type)?(x=o(c,g.props),x.ref=bt(p,c,g),x.return=p,x):(x=Rr(g.type,g.key,g.props,null,p.mode,x),x.ref=bt(p,c,g),x.return=p,x)}function u(p,c,g,x){return c===null||c.tag!==4||c.stateNode.containerInfo!==g.containerInfo||c.stateNode.implementation!==g.implementation?(c=ta(g,p.mode,x),c.return=p,c):(c=o(c,g.children||[]),c.return=p,c)}function f(p,c,g,x,y){return c===null||c.tag!==7?(c=Nn(g,p.mode,x,y),c.return=p,c):(c=o(c,g),c.return=p,c)}function h(p,c,g){if(typeof c=="string"&&c!==""||typeof c=="number")return c=na(""+c,p.mode,g),c.return=p,c;if(typeof c=="object"&&c!==null){switch(c.$$typeof){case cr:return g=Rr(c.type,c.key,c.props,null,p.mode,g),g.ref=bt(p,null,c),g.return=p,g;case Rn:return c=ta(c,p.mode,g),c.return=p,c;case nn:var x=c._init;return h(p,x(c._payload),g)}if(Ct(c)||mt(c))return c=Nn(c,p.mode,g,null),c.return=p,c;br(p,c)}return null}function m(p,c,g,x){var y=c!==null?c.key:null;if(typeof g=="string"&&g!==""||typeof g=="number")return y!==null?null:i(p,c,""+g,x);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case cr:return g.key===y?s(p,c,g,x):null;case Rn:return g.key===y?u(p,c,g,x):null;case nn:return y=g._init,m(p,c,y(g._payload),x)}if(Ct(g)||mt(g))return y!==null?null:f(p,c,g,x,null);br(p,g)}return null}function v(p,c,g,x,y){if(typeof x=="string"&&x!==""||typeof x=="number")return p=p.get(g)||null,i(c,p,""+x,y);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case cr:return p=p.get(x.key===null?g:x.key)||null,s(c,p,x,y);case Rn:return p=p.get(x.key===null?g:x.key)||null,u(c,p,x,y);case nn:var b=x._init;return v(p,c,g,b(x._payload),y)}if(Ct(x)||mt(x))return p=p.get(g)||null,f(c,p,x,y,null);br(c,x)}return null}function S(p,c,g,x){for(var y=null,b=null,E=c,j=c=0,V=null;E!==null&&j<g.length;j++){E.index>j?(V=E,E=null):V=E.sibling;var z=m(p,E,g[j],x);if(z===null){E===null&&(E=V);break}e&&E&&z.alternate===null&&n(p,E),c=a(z,c,j),b===null?y=z:b.sibling=z,b=z,E=V}if(j===g.length)return t(p,E),A&&Sn(p,j),y;if(E===null){for(;j<g.length;j++)E=h(p,g[j],x),E!==null&&(c=a(E,c,j),b===null?y=E:b.sibling=E,b=E);return A&&Sn(p,j),y}for(E=r(p,E);j<g.length;j++)V=v(E,p,j,g[j],x),V!==null&&(e&&V.alternate!==null&&E.delete(V.key===null?j:V.key),c=a(V,c,j),b===null?y=V:b.sibling=V,b=V);return e&&E.forEach(function(Te){return n(p,Te)}),A&&Sn(p,j),y}function w(p,c,g,x){var y=mt(g);if(typeof y!="function")throw Error(k(150));if(g=y.call(g),g==null)throw Error(k(151));for(var b=y=null,E=c,j=c=0,V=null,z=g.next();E!==null&&!z.done;j++,z=g.next()){E.index>j?(V=E,E=null):V=E.sibling;var Te=m(p,E,z.value,x);if(Te===null){E===null&&(E=V);break}e&&E&&Te.alternate===null&&n(p,E),c=a(Te,c,j),b===null?y=Te:b.sibling=Te,b=Te,E=V}if(z.done)return t(p,E),A&&Sn(p,j),y;if(E===null){for(;!z.done;j++,z=g.next())z=h(p,z.value,x),z!==null&&(c=a(z,c,j),b===null?y=z:b.sibling=z,b=z);return A&&Sn(p,j),y}for(E=r(p,E);!z.done;j++,z=g.next())z=v(E,p,j,z.value,x),z!==null&&(e&&z.alternate!==null&&E.delete(z.key===null?j:z.key),c=a(z,c,j),b===null?y=z:b.sibling=z,b=z);return e&&E.forEach(function(ht){return n(p,ht)}),A&&Sn(p,j),y}function $(p,c,g,x){if(typeof g=="object"&&g!==null&&g.type===Dn&&g.key===null&&(g=g.props.children),typeof g=="object"&&g!==null){switch(g.$$typeof){case cr:e:{for(var y=g.key,b=c;b!==null;){if(b.key===y){if(y=g.type,y===Dn){if(b.tag===7){t(p,b.sibling),c=o(b,g.props.children),c.return=p,p=c;break e}}else if(b.elementType===y||typeof y=="object"&&y!==null&&y.$$typeof===nn&&Fi(y)===b.type){t(p,b.sibling),c=o(b,g.props),c.ref=bt(p,b,g),c.return=p,p=c;break e}t(p,b);break}else n(p,b);b=b.sibling}g.type===Dn?(c=Nn(g.props.children,p.mode,x,g.key),c.return=p,p=c):(x=Rr(g.type,g.key,g.props,null,p.mode,x),x.ref=bt(p,c,g),x.return=p,p=x)}return l(p);case Rn:e:{for(b=g.key;c!==null;){if(c.key===b)if(c.tag===4&&c.stateNode.containerInfo===g.containerInfo&&c.stateNode.implementation===g.implementation){t(p,c.sibling),c=o(c,g.children||[]),c.return=p,p=c;break e}else{t(p,c);break}else n(p,c);c=c.sibling}c=ta(g,p.mode,x),c.return=p,p=c}return l(p);case nn:return b=g._init,$(p,c,b(g._payload),x)}if(Ct(g))return S(p,c,g,x);if(mt(g))return w(p,c,g,x);br(p,g)}return typeof g=="string"&&g!==""||typeof g=="number"?(g=""+g,c!==null&&c.tag===6?(t(p,c.sibling),c=o(c,g),c.return=p,p=c):(t(p,c),c=na(g,p.mode,x),c.return=p,p=c),l(p)):t(p,c)}return $}var at=Cu(!0),ju=Cu(!1),Zr=xn(null),eo=null,Gn=null,wl=null;function bl(){wl=Gn=eo=null}function kl(e){var n=Zr.current;D(Zr),e._currentValue=n}function Ma(e,n,t){for(;e!==null;){var r=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,r!==null&&(r.childLanes|=n)):r!==null&&(r.childLanes&n)!==n&&(r.childLanes|=n),e===t)break;e=e.return}}function et(e,n){eo=e,wl=Gn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&n&&(pe=!0),e.firstContext=null)}function $e(e){var n=e._currentValue;if(wl!==e)if(e={context:e,memoizedValue:n,next:null},Gn===null){if(eo===null)throw Error(k(308));Gn=e,eo.dependencies={lanes:0,firstContext:e}}else Gn=Gn.next=e;return n}var jn=null;function Sl(e){jn===null?jn=[e]:jn.push(e)}function Eu(e,n,t,r){var o=n.interleaved;return o===null?(t.next=t,Sl(n)):(t.next=o.next,o.next=t),n.interleaved=t,qe(e,r)}function qe(e,n){e.lanes|=n;var t=e.alternate;for(t!==null&&(t.lanes|=n),t=e,e=e.return;e!==null;)e.childLanes|=n,t=e.alternate,t!==null&&(t.childLanes|=n),t=e,e=e.return;return t.tag===3?t.stateNode:null}var tn=!1;function _l(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function $u(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Ke(e,n){return{eventTime:e,lane:n,tag:0,payload:null,callback:null,next:null}}function fn(e,n,t){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,O&2){var o=r.pending;return o===null?n.next=n:(n.next=o.next,o.next=n),r.pending=n,qe(e,t)}return o=r.interleaved,o===null?(n.next=n,Sl(r)):(n.next=o.next,o.next=n),r.interleaved=n,qe(e,t)}function zr(e,n,t){if(n=n.updateQueue,n!==null&&(n=n.shared,(t&4194240)!==0)){var r=n.lanes;r&=e.pendingLanes,t|=r,n.lanes=t,ul(e,t)}}function Ii(e,n){var t=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,t===r)){var o=null,a=null;if(t=t.firstBaseUpdate,t!==null){do{var l={eventTime:t.eventTime,lane:t.lane,tag:t.tag,payload:t.payload,callback:t.callback,next:null};a===null?o=a=l:a=a.next=l,t=t.next}while(t!==null);a===null?o=a=n:a=a.next=n}else o=a=n;t={baseState:r.baseState,firstBaseUpdate:o,lastBaseUpdate:a,shared:r.shared,effects:r.effects},e.updateQueue=t;return}e=t.lastBaseUpdate,e===null?t.firstBaseUpdate=n:e.next=n,t.lastBaseUpdate=n}function no(e,n,t,r){var o=e.updateQueue;tn=!1;var a=o.firstBaseUpdate,l=o.lastBaseUpdate,i=o.shared.pending;if(i!==null){o.shared.pending=null;var s=i,u=s.next;s.next=null,l===null?a=u:l.next=u,l=s;var f=e.alternate;f!==null&&(f=f.updateQueue,i=f.lastBaseUpdate,i!==l&&(i===null?f.firstBaseUpdate=u:i.next=u,f.lastBaseUpdate=s))}if(a!==null){var h=o.baseState;l=0,f=u=s=null,i=a;do{var m=i.lane,v=i.eventTime;if((r&m)===m){f!==null&&(f=f.next={eventTime:v,lane:0,tag:i.tag,payload:i.payload,callback:i.callback,next:null});e:{var S=e,w=i;switch(m=n,v=t,w.tag){case 1:if(S=w.payload,typeof S=="function"){h=S.call(v,h,m);break e}h=S;break e;case 3:S.flags=S.flags&-65537|128;case 0:if(S=w.payload,m=typeof S=="function"?S.call(v,h,m):S,m==null)break e;h=W({},h,m);break e;case 2:tn=!0}}i.callback!==null&&i.lane!==0&&(e.flags|=64,m=o.effects,m===null?o.effects=[i]:m.push(i))}else v={eventTime:v,lane:m,tag:i.tag,payload:i.payload,callback:i.callback,next:null},f===null?(u=f=v,s=h):f=f.next=v,l|=m;if(i=i.next,i===null){if(i=o.shared.pending,i===null)break;m=i,i=m.next,m.next=null,o.lastBaseUpdate=m,o.shared.pending=null}}while(!0);if(f===null&&(s=h),o.baseState=s,o.firstBaseUpdate=u,o.lastBaseUpdate=f,n=o.shared.interleaved,n!==null){o=n;do l|=o.lane,o=o.next;while(o!==n)}else a===null&&(o.shared.lanes=0);Mn|=l,e.lanes=l,e.memoizedState=h}}function Li(e,n,t){if(e=n.effects,n.effects=null,e!==null)for(n=0;n<e.length;n++){var r=e[n],o=r.callback;if(o!==null){if(r.callback=null,r=t,typeof o!="function")throw Error(k(191,o));o.call(r)}}}var ar={},Ue=xn(ar),Kt=xn(ar),Yt=xn(ar);function En(e){if(e===ar)throw Error(k(174));return e}function Cl(e,n){switch(I(Yt,n),I(Kt,e),I(Ue,ar),e=n.nodeType,e){case 9:case 11:n=(n=n.documentElement)?n.namespaceURI:pa(null,"");break;default:e=e===8?n.parentNode:n,n=e.namespaceURI||null,e=e.tagName,n=pa(n,e)}D(Ue),I(Ue,n)}function lt(){D(Ue),D(Kt),D(Yt)}function Nu(e){En(Yt.current);var n=En(Ue.current),t=pa(n,e.type);n!==t&&(I(Kt,e),I(Ue,t))}function jl(e){Kt.current===e&&(D(Ue),D(Kt))}var B=xn(0);function to(e){for(var n=e;n!==null;){if(n.tag===13){var t=n.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||t.data==="$?"||t.data==="$!"))return n}else if(n.tag===19&&n.memoizedProps.revealOrder!==void 0){if(n.flags&128)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var Yo=[];function El(){for(var e=0;e<Yo.length;e++)Yo[e]._workInProgressVersionPrimary=null;Yo.length=0}var Mr=Ze.ReactCurrentDispatcher,Xo=Ze.ReactCurrentBatchConfig,zn=0,U=null,Y=null,J=null,ro=!1,Mt=!1,Xt=0,B0=0;function re(){throw Error(k(321))}function $l(e,n){if(n===null)return!1;for(var t=0;t<n.length&&t<e.length;t++)if(!Le(e[t],n[t]))return!1;return!0}function Nl(e,n,t,r,o,a){if(zn=a,U=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,Mr.current=e===null||e.memoizedState===null?V0:Q0,e=t(r,o),Mt){a=0;do{if(Mt=!1,Xt=0,25<=a)throw Error(k(301));a+=1,J=Y=null,n.updateQueue=null,Mr.current=G0,e=t(r,o)}while(Mt)}if(Mr.current=oo,n=Y!==null&&Y.next!==null,zn=0,J=Y=U=null,ro=!1,n)throw Error(k(300));return e}function Tl(){var e=Xt!==0;return Xt=0,e}function De(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return J===null?U.memoizedState=J=e:J=J.next=e,J}function Ne(){if(Y===null){var e=U.alternate;e=e!==null?e.memoizedState:null}else e=Y.next;var n=J===null?U.memoizedState:J.next;if(n!==null)J=n,Y=e;else{if(e===null)throw Error(k(310));Y=e,e={memoizedState:Y.memoizedState,baseState:Y.baseState,baseQueue:Y.baseQueue,queue:Y.queue,next:null},J===null?U.memoizedState=J=e:J=J.next=e}return J}function qt(e,n){return typeof n=="function"?n(e):n}function qo(e){var n=Ne(),t=n.queue;if(t===null)throw Error(k(311));t.lastRenderedReducer=e;var r=Y,o=r.baseQueue,a=t.pending;if(a!==null){if(o!==null){var l=o.next;o.next=a.next,a.next=l}r.baseQueue=o=a,t.pending=null}if(o!==null){a=o.next,r=r.baseState;var i=l=null,s=null,u=a;do{var f=u.lane;if((zn&f)===f)s!==null&&(s=s.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),r=u.hasEagerState?u.eagerState:e(r,u.action);else{var h={lane:f,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};s===null?(i=s=h,l=r):s=s.next=h,U.lanes|=f,Mn|=f}u=u.next}while(u!==null&&u!==a);s===null?l=r:s.next=i,Le(r,n.memoizedState)||(pe=!0),n.memoizedState=r,n.baseState=l,n.baseQueue=s,t.lastRenderedState=r}if(e=t.interleaved,e!==null){o=e;do a=o.lane,U.lanes|=a,Mn|=a,o=o.next;while(o!==e)}else o===null&&(t.lanes=0);return[n.memoizedState,t.dispatch]}function Jo(e){var n=Ne(),t=n.queue;if(t===null)throw Error(k(311));t.lastRenderedReducer=e;var r=t.dispatch,o=t.pending,a=n.memoizedState;if(o!==null){t.pending=null;var l=o=o.next;do a=e(a,l.action),l=l.next;while(l!==o);Le(a,n.memoizedState)||(pe=!0),n.memoizedState=a,n.baseQueue===null&&(n.baseState=a),t.lastRenderedState=a}return[a,r]}function Tu(){}function Pu(e,n){var t=U,r=Ne(),o=n(),a=!Le(r.memoizedState,o);if(a&&(r.memoizedState=o,pe=!0),r=r.queue,Pl(Ou.bind(null,t,r,e),[e]),r.getSnapshot!==n||a||J!==null&&J.memoizedState.tag&1){if(t.flags|=2048,Jt(9,Mu.bind(null,t,r,o,n),void 0,null),Z===null)throw Error(k(349));zn&30||zu(t,n,o)}return o}function zu(e,n,t){e.flags|=16384,e={getSnapshot:n,value:t},n=U.updateQueue,n===null?(n={lastEffect:null,stores:null},U.updateQueue=n,n.stores=[e]):(t=n.stores,t===null?n.stores=[e]:t.push(e))}function Mu(e,n,t,r){n.value=t,n.getSnapshot=r,Fu(n)&&Iu(e)}function Ou(e,n,t){return t(function(){Fu(n)&&Iu(e)})}function Fu(e){var n=e.getSnapshot;e=e.value;try{var t=n();return!Le(e,t)}catch{return!0}}function Iu(e){var n=qe(e,1);n!==null&&Ie(n,e,1,-1)}function Ri(e){var n=De();return typeof e=="function"&&(e=e()),n.memoizedState=n.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:qt,lastRenderedState:e},n.queue=e,e=e.dispatch=H0.bind(null,U,e),[n.memoizedState,e]}function Jt(e,n,t,r){return e={tag:e,create:n,destroy:t,deps:r,next:null},n=U.updateQueue,n===null?(n={lastEffect:null,stores:null},U.updateQueue=n,n.lastEffect=e.next=e):(t=n.lastEffect,t===null?n.lastEffect=e.next=e:(r=t.next,t.next=e,e.next=r,n.lastEffect=e)),e}function Lu(){return Ne().memoizedState}function Or(e,n,t,r){var o=De();U.flags|=e,o.memoizedState=Jt(1|n,t,void 0,r===void 0?null:r)}function xo(e,n,t,r){var o=Ne();r=r===void 0?null:r;var a=void 0;if(Y!==null){var l=Y.memoizedState;if(a=l.destroy,r!==null&&$l(r,l.deps)){o.memoizedState=Jt(n,t,a,r);return}}U.flags|=e,o.memoizedState=Jt(1|n,t,a,r)}function Di(e,n){return Or(8390656,8,e,n)}function Pl(e,n){return xo(2048,8,e,n)}function Ru(e,n){return xo(4,2,e,n)}function Du(e,n){return xo(4,4,e,n)}function Au(e,n){if(typeof n=="function")return e=e(),n(e),function(){n(null)};if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function Bu(e,n,t){return t=t!=null?t.concat([e]):null,xo(4,4,Au.bind(null,n,e),t)}function zl(){}function Uu(e,n){var t=Ne();n=n===void 0?null:n;var r=t.memoizedState;return r!==null&&n!==null&&$l(n,r[1])?r[0]:(t.memoizedState=[e,n],e)}function Wu(e,n){var t=Ne();n=n===void 0?null:n;var r=t.memoizedState;return r!==null&&n!==null&&$l(n,r[1])?r[0]:(e=e(),t.memoizedState=[e,n],e)}function Hu(e,n,t){return zn&21?(Le(t,n)||(t=Ys(),U.lanes|=t,Mn|=t,e.baseState=!0),n):(e.baseState&&(e.baseState=!1,pe=!0),e.memoizedState=t)}function U0(e,n){var t=F;F=t!==0&&4>t?t:4,e(!0);var r=Xo.transition;Xo.transition={};try{e(!1),n()}finally{F=t,Xo.transition=r}}function Vu(){return Ne().memoizedState}function W0(e,n,t){var r=hn(e);if(t={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null},Qu(e))Gu(n,t);else if(t=Eu(e,n,t,r),t!==null){var o=se();Ie(t,e,r,o),Ku(t,n,r)}}function H0(e,n,t){var r=hn(e),o={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null};if(Qu(e))Gu(n,o);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=n.lastRenderedReducer,a!==null))try{var l=n.lastRenderedState,i=a(l,t);if(o.hasEagerState=!0,o.eagerState=i,Le(i,l)){var s=n.interleaved;s===null?(o.next=o,Sl(n)):(o.next=s.next,s.next=o),n.interleaved=o;return}}catch{}finally{}t=Eu(e,n,o,r),t!==null&&(o=se(),Ie(t,e,r,o),Ku(t,n,r))}}function Qu(e){var n=e.alternate;return e===U||n!==null&&n===U}function Gu(e,n){Mt=ro=!0;var t=e.pending;t===null?n.next=n:(n.next=t.next,t.next=n),e.pending=n}function Ku(e,n,t){if(t&4194240){var r=n.lanes;r&=e.pendingLanes,t|=r,n.lanes=t,ul(e,t)}}var oo={readContext:$e,useCallback:re,useContext:re,useEffect:re,useImperativeHandle:re,useInsertionEffect:re,useLayoutEffect:re,useMemo:re,useReducer:re,useRef:re,useState:re,useDebugValue:re,useDeferredValue:re,useTransition:re,useMutableSource:re,useSyncExternalStore:re,useId:re,unstable_isNewReconciler:!1},V0={readContext:$e,useCallback:function(e,n){return De().memoizedState=[e,n===void 0?null:n],e},useContext:$e,useEffect:Di,useImperativeHandle:function(e,n,t){return t=t!=null?t.concat([e]):null,Or(4194308,4,Au.bind(null,n,e),t)},useLayoutEffect:function(e,n){return Or(4194308,4,e,n)},useInsertionEffect:function(e,n){return Or(4,2,e,n)},useMemo:function(e,n){var t=De();return n=n===void 0?null:n,e=e(),t.memoizedState=[e,n],e},useReducer:function(e,n,t){var r=De();return n=t!==void 0?t(n):n,r.memoizedState=r.baseState=n,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:n},r.queue=e,e=e.dispatch=W0.bind(null,U,e),[r.memoizedState,e]},useRef:function(e){var n=De();return e={current:e},n.memoizedState=e},useState:Ri,useDebugValue:zl,useDeferredValue:function(e){return De().memoizedState=e},useTransition:function(){var e=Ri(!1),n=e[0];return e=U0.bind(null,e[1]),De().memoizedState=e,[n,e]},useMutableSource:function(){},useSyncExternalStore:function(e,n,t){var r=U,o=De();if(A){if(t===void 0)throw Error(k(407));t=t()}else{if(t=n(),Z===null)throw Error(k(349));zn&30||zu(r,n,t)}o.memoizedState=t;var a={value:t,getSnapshot:n};return o.queue=a,Di(Ou.bind(null,r,a,e),[e]),r.flags|=2048,Jt(9,Mu.bind(null,r,a,t,n),void 0,null),t},useId:function(){var e=De(),n=Z.identifierPrefix;if(A){var t=Ge,r=Qe;t=(r&~(1<<32-Fe(r)-1)).toString(32)+t,n=":"+n+"R"+t,t=Xt++,0<t&&(n+="H"+t.toString(32)),n+=":"}else t=B0++,n=":"+n+"r"+t.toString(32)+":";return e.memoizedState=n},unstable_isNewReconciler:!1},Q0={readContext:$e,useCallback:Uu,useContext:$e,useEffect:Pl,useImperativeHandle:Bu,useInsertionEffect:Ru,useLayoutEffect:Du,useMemo:Wu,useReducer:qo,useRef:Lu,useState:function(){return qo(qt)},useDebugValue:zl,useDeferredValue:function(e){var n=Ne();return Hu(n,Y.memoizedState,e)},useTransition:function(){var e=qo(qt)[0],n=Ne().memoizedState;return[e,n]},useMutableSource:Tu,useSyncExternalStore:Pu,useId:Vu,unstable_isNewReconciler:!1},G0={readContext:$e,useCallback:Uu,useContext:$e,useEffect:Pl,useImperativeHandle:Bu,useInsertionEffect:Ru,useLayoutEffect:Du,useMemo:Wu,useReducer:Jo,useRef:Lu,useState:function(){return Jo(qt)},useDebugValue:zl,useDeferredValue:function(e){var n=Ne();return Y===null?n.memoizedState=e:Hu(n,Y.memoizedState,e)},useTransition:function(){var e=Jo(qt)[0],n=Ne().memoizedState;return[e,n]},useMutableSource:Tu,useSyncExternalStore:Pu,useId:Vu,unstable_isNewReconciler:!1};function ze(e,n){if(e&&e.defaultProps){n=W({},n),e=e.defaultProps;for(var t in e)n[t]===void 0&&(n[t]=e[t]);return n}return n}function Oa(e,n,t,r){n=e.memoizedState,t=t(r,n),t=t==null?n:W({},n,t),e.memoizedState=t,e.lanes===0&&(e.updateQueue.baseState=t)}var wo={isMounted:function(e){return(e=e._reactInternals)?In(e)===e:!1},enqueueSetState:function(e,n,t){e=e._reactInternals;var r=se(),o=hn(e),a=Ke(r,o);a.payload=n,t!=null&&(a.callback=t),n=fn(e,a,o),n!==null&&(Ie(n,e,o,r),zr(n,e,o))},enqueueReplaceState:function(e,n,t){e=e._reactInternals;var r=se(),o=hn(e),a=Ke(r,o);a.tag=1,a.payload=n,t!=null&&(a.callback=t),n=fn(e,a,o),n!==null&&(Ie(n,e,o,r),zr(n,e,o))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var t=se(),r=hn(e),o=Ke(t,r);o.tag=2,n!=null&&(o.callback=n),n=fn(e,o,r),n!==null&&(Ie(n,e,r,t),zr(n,e,r))}};function Ai(e,n,t,r,o,a,l){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,a,l):n.prototype&&n.prototype.isPureReactComponent?!Ht(t,r)||!Ht(o,a):!0}function Yu(e,n,t){var r=!1,o=yn,a=n.contextType;return typeof a=="object"&&a!==null?a=$e(a):(o=ge(n)?Tn:le.current,r=n.contextTypes,a=(r=r!=null)?rt(e,o):yn),n=new n(t,a),e.memoizedState=n.state!==null&&n.state!==void 0?n.state:null,n.updater=wo,e.stateNode=n,n._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=o,e.__reactInternalMemoizedMaskedChildContext=a),n}function Bi(e,n,t,r){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(t,r),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(t,r),n.state!==e&&wo.enqueueReplaceState(n,n.state,null)}function Fa(e,n,t,r){var o=e.stateNode;o.props=t,o.state=e.memoizedState,o.refs={},_l(e);var a=n.contextType;typeof a=="object"&&a!==null?o.context=$e(a):(a=ge(n)?Tn:le.current,o.context=rt(e,a)),o.state=e.memoizedState,a=n.getDerivedStateFromProps,typeof a=="function"&&(Oa(e,n,a,t),o.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(n=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),n!==o.state&&wo.enqueueReplaceState(o,o.state,null),no(e,t,o,r),o.state=e.memoizedState),typeof o.componentDidMount=="function"&&(e.flags|=4194308)}function it(e,n){try{var t="",r=n;do t+=bm(r),r=r.return;while(r);var o=t}catch(a){o=`
Error generating stack: `+a.message+`
`+a.stack}return{value:e,source:n,stack:o,digest:null}}function Zo(e,n,t){return{value:e,source:null,stack:t??null,digest:n??null}}function Ia(e,n){try{console.error(n.value)}catch(t){setTimeout(function(){throw t})}}var K0=typeof WeakMap=="function"?WeakMap:Map;function Xu(e,n,t){t=Ke(-1,t),t.tag=3,t.payload={element:null};var r=n.value;return t.callback=function(){lo||(lo=!0,Qa=r),Ia(e,n)},t}function qu(e,n,t){t=Ke(-1,t),t.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var o=n.value;t.payload=function(){return r(o)},t.callback=function(){Ia(e,n)}}var a=e.stateNode;return a!==null&&typeof a.componentDidCatch=="function"&&(t.callback=function(){Ia(e,n),typeof r!="function"&&(pn===null?pn=new Set([this]):pn.add(this));var l=n.stack;this.componentDidCatch(n.value,{componentStack:l!==null?l:""})}),t}function Ui(e,n,t){var r=e.pingCache;if(r===null){r=e.pingCache=new K0;var o=new Set;r.set(n,o)}else o=r.get(n),o===void 0&&(o=new Set,r.set(n,o));o.has(t)||(o.add(t),e=sy.bind(null,e,n,t),n.then(e,e))}function Wi(e){do{var n;if((n=e.tag===13)&&(n=e.memoizedState,n=n!==null?n.dehydrated!==null:!0),n)return e;e=e.return}while(e!==null);return null}function Hi(e,n,t,r,o){return e.mode&1?(e.flags|=65536,e.lanes=o,e):(e===n?e.flags|=65536:(e.flags|=128,t.flags|=131072,t.flags&=-52805,t.tag===1&&(t.alternate===null?t.tag=17:(n=Ke(-1,1),n.tag=2,fn(t,n,1))),t.lanes|=1),e)}var Y0=Ze.ReactCurrentOwner,pe=!1;function ie(e,n,t,r){n.child=e===null?ju(n,null,t,r):at(n,e.child,t,r)}function Vi(e,n,t,r,o){t=t.render;var a=n.ref;return et(n,o),r=Nl(e,n,t,r,a,o),t=Tl(),e!==null&&!pe?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~o,Je(e,n,o)):(A&&t&&yl(n),n.flags|=1,ie(e,n,r,o),n.child)}function Qi(e,n,t,r,o){if(e===null){var a=t.type;return typeof a=="function"&&!Al(a)&&a.defaultProps===void 0&&t.compare===null&&t.defaultProps===void 0?(n.tag=15,n.type=a,Ju(e,n,a,r,o)):(e=Rr(t.type,null,r,n,n.mode,o),e.ref=n.ref,e.return=n,n.child=e)}if(a=e.child,!(e.lanes&o)){var l=a.memoizedProps;if(t=t.compare,t=t!==null?t:Ht,t(l,r)&&e.ref===n.ref)return Je(e,n,o)}return n.flags|=1,e=gn(a,r),e.ref=n.ref,e.return=n,n.child=e}function Ju(e,n,t,r,o){if(e!==null){var a=e.memoizedProps;if(Ht(a,r)&&e.ref===n.ref)if(pe=!1,n.pendingProps=r=a,(e.lanes&o)!==0)e.flags&131072&&(pe=!0);else return n.lanes=e.lanes,Je(e,n,o)}return La(e,n,t,r,o)}function Zu(e,n,t){var r=n.pendingProps,o=r.children,a=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(n.mode&1))n.memoizedState={baseLanes:0,cachePool:null,transitions:null},I(Yn,ve),ve|=t;else{if(!(t&1073741824))return e=a!==null?a.baseLanes|t:t,n.lanes=n.childLanes=1073741824,n.memoizedState={baseLanes:e,cachePool:null,transitions:null},n.updateQueue=null,I(Yn,ve),ve|=e,null;n.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=a!==null?a.baseLanes:t,I(Yn,ve),ve|=r}else a!==null?(r=a.baseLanes|t,n.memoizedState=null):r=t,I(Yn,ve),ve|=r;return ie(e,n,o,t),n.child}function ec(e,n){var t=n.ref;(e===null&&t!==null||e!==null&&e.ref!==t)&&(n.flags|=512,n.flags|=2097152)}function La(e,n,t,r,o){var a=ge(t)?Tn:le.current;return a=rt(n,a),et(n,o),t=Nl(e,n,t,r,a,o),r=Tl(),e!==null&&!pe?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~o,Je(e,n,o)):(A&&r&&yl(n),n.flags|=1,ie(e,n,t,o),n.child)}function Gi(e,n,t,r,o){if(ge(t)){var a=!0;Xr(n)}else a=!1;if(et(n,o),n.stateNode===null)Fr(e,n),Yu(n,t,r),Fa(n,t,r,o),r=!0;else if(e===null){var l=n.stateNode,i=n.memoizedProps;l.props=i;var s=l.context,u=t.contextType;typeof u=="object"&&u!==null?u=$e(u):(u=ge(t)?Tn:le.current,u=rt(n,u));var f=t.getDerivedStateFromProps,h=typeof f=="function"||typeof l.getSnapshotBeforeUpdate=="function";h||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(i!==r||s!==u)&&Bi(n,l,r,u),tn=!1;var m=n.memoizedState;l.state=m,no(n,r,l,o),s=n.memoizedState,i!==r||m!==s||he.current||tn?(typeof f=="function"&&(Oa(n,t,f,r),s=n.memoizedState),(i=tn||Ai(n,t,i,r,m,s,u))?(h||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount()),typeof l.componentDidMount=="function"&&(n.flags|=4194308)):(typeof l.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=r,n.memoizedState=s),l.props=r,l.state=s,l.context=u,r=i):(typeof l.componentDidMount=="function"&&(n.flags|=4194308),r=!1)}else{l=n.stateNode,$u(e,n),i=n.memoizedProps,u=n.type===n.elementType?i:ze(n.type,i),l.props=u,h=n.pendingProps,m=l.context,s=t.contextType,typeof s=="object"&&s!==null?s=$e(s):(s=ge(t)?Tn:le.current,s=rt(n,s));var v=t.getDerivedStateFromProps;(f=typeof v=="function"||typeof l.getSnapshotBeforeUpdate=="function")||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(i!==h||m!==s)&&Bi(n,l,r,s),tn=!1,m=n.memoizedState,l.state=m,no(n,r,l,o);var S=n.memoizedState;i!==h||m!==S||he.current||tn?(typeof v=="function"&&(Oa(n,t,v,r),S=n.memoizedState),(u=tn||Ai(n,t,u,r,m,S,s)||!1)?(f||typeof l.UNSAFE_componentWillUpdate!="function"&&typeof l.componentWillUpdate!="function"||(typeof l.componentWillUpdate=="function"&&l.componentWillUpdate(r,S,s),typeof l.UNSAFE_componentWillUpdate=="function"&&l.UNSAFE_componentWillUpdate(r,S,s)),typeof l.componentDidUpdate=="function"&&(n.flags|=4),typeof l.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof l.componentDidUpdate!="function"||i===e.memoizedProps&&m===e.memoizedState||(n.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||i===e.memoizedProps&&m===e.memoizedState||(n.flags|=1024),n.memoizedProps=r,n.memoizedState=S),l.props=r,l.state=S,l.context=s,r=u):(typeof l.componentDidUpdate!="function"||i===e.memoizedProps&&m===e.memoizedState||(n.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||i===e.memoizedProps&&m===e.memoizedState||(n.flags|=1024),r=!1)}return Ra(e,n,t,r,a,o)}function Ra(e,n,t,r,o,a){ec(e,n);var l=(n.flags&128)!==0;if(!r&&!l)return o&&zi(n,t,!1),Je(e,n,a);r=n.stateNode,Y0.current=n;var i=l&&typeof t.getDerivedStateFromError!="function"?null:r.render();return n.flags|=1,e!==null&&l?(n.child=at(n,e.child,null,a),n.child=at(n,null,i,a)):ie(e,n,i,a),n.memoizedState=r.state,o&&zi(n,t,!0),n.child}function nc(e){var n=e.stateNode;n.pendingContext?Pi(e,n.pendingContext,n.pendingContext!==n.context):n.context&&Pi(e,n.context,!1),Cl(e,n.containerInfo)}function Ki(e,n,t,r,o){return ot(),xl(o),n.flags|=256,ie(e,n,t,r),n.child}var Da={dehydrated:null,treeContext:null,retryLane:0};function Aa(e){return{baseLanes:e,cachePool:null,transitions:null}}function tc(e,n,t){var r=n.pendingProps,o=B.current,a=!1,l=(n.flags&128)!==0,i;if((i=l)||(i=e!==null&&e.memoizedState===null?!1:(o&2)!==0),i?(a=!0,n.flags&=-129):(e===null||e.memoizedState!==null)&&(o|=1),I(B,o&1),e===null)return za(n),e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(n.mode&1?e.data==="$!"?n.lanes=8:n.lanes=1073741824:n.lanes=1,null):(l=r.children,e=r.fallback,a?(r=n.mode,a=n.child,l={mode:"hidden",children:l},!(r&1)&&a!==null?(a.childLanes=0,a.pendingProps=l):a=So(l,r,0,null),e=Nn(e,r,t,null),a.return=n,e.return=n,a.sibling=e,n.child=a,n.child.memoizedState=Aa(t),n.memoizedState=Da,e):Ml(n,l));if(o=e.memoizedState,o!==null&&(i=o.dehydrated,i!==null))return X0(e,n,l,r,i,o,t);if(a){a=r.fallback,l=n.mode,o=e.child,i=o.sibling;var s={mode:"hidden",children:r.children};return!(l&1)&&n.child!==o?(r=n.child,r.childLanes=0,r.pendingProps=s,n.deletions=null):(r=gn(o,s),r.subtreeFlags=o.subtreeFlags&14680064),i!==null?a=gn(i,a):(a=Nn(a,l,t,null),a.flags|=2),a.return=n,r.return=n,r.sibling=a,n.child=r,r=a,a=n.child,l=e.child.memoizedState,l=l===null?Aa(t):{baseLanes:l.baseLanes|t,cachePool:null,transitions:l.transitions},a.memoizedState=l,a.childLanes=e.childLanes&~t,n.memoizedState=Da,r}return a=e.child,e=a.sibling,r=gn(a,{mode:"visible",children:r.children}),!(n.mode&1)&&(r.lanes=t),r.return=n,r.sibling=null,e!==null&&(t=n.deletions,t===null?(n.deletions=[e],n.flags|=16):t.push(e)),n.child=r,n.memoizedState=null,r}function Ml(e,n){return n=So({mode:"visible",children:n},e.mode,0,null),n.return=e,e.child=n}function kr(e,n,t,r){return r!==null&&xl(r),at(n,e.child,null,t),e=Ml(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function X0(e,n,t,r,o,a,l){if(t)return n.flags&256?(n.flags&=-257,r=Zo(Error(k(422))),kr(e,n,l,r)):n.memoizedState!==null?(n.child=e.child,n.flags|=128,null):(a=r.fallback,o=n.mode,r=So({mode:"visible",children:r.children},o,0,null),a=Nn(a,o,l,null),a.flags|=2,r.return=n,a.return=n,r.sibling=a,n.child=r,n.mode&1&&at(n,e.child,null,l),n.child.memoizedState=Aa(l),n.memoizedState=Da,a);if(!(n.mode&1))return kr(e,n,l,null);if(o.data==="$!"){if(r=o.nextSibling&&o.nextSibling.dataset,r)var i=r.dgst;return r=i,a=Error(k(419)),r=Zo(a,r,void 0),kr(e,n,l,r)}if(i=(l&e.childLanes)!==0,pe||i){if(r=Z,r!==null){switch(l&-l){case 4:o=2;break;case 16:o=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:o=32;break;case 536870912:o=268435456;break;default:o=0}o=o&(r.suspendedLanes|l)?0:o,o!==0&&o!==a.retryLane&&(a.retryLane=o,qe(e,o),Ie(r,e,o,-1))}return Dl(),r=Zo(Error(k(421))),kr(e,n,l,r)}return o.data==="$?"?(n.flags|=128,n.child=e.child,n=uy.bind(null,e),o._reactRetry=n,null):(e=a.treeContext,xe=dn(o.nextSibling),we=n,A=!0,Oe=null,e!==null&&(_e[Ce++]=Qe,_e[Ce++]=Ge,_e[Ce++]=Pn,Qe=e.id,Ge=e.overflow,Pn=n),n=Ml(n,r.children),n.flags|=4096,n)}function Yi(e,n,t){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n),Ma(e.return,n,t)}function ea(e,n,t,r,o){var a=e.memoizedState;a===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:r,tail:t,tailMode:o}:(a.isBackwards=n,a.rendering=null,a.renderingStartTime=0,a.last=r,a.tail=t,a.tailMode=o)}function rc(e,n,t){var r=n.pendingProps,o=r.revealOrder,a=r.tail;if(ie(e,n,r.children,t),r=B.current,r&2)r=r&1|2,n.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Yi(e,t,n);else if(e.tag===19)Yi(e,t,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break e;for(;e.sibling===null;){if(e.return===null||e.return===n)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(I(B,r),!(n.mode&1))n.memoizedState=null;else switch(o){case"forwards":for(t=n.child,o=null;t!==null;)e=t.alternate,e!==null&&to(e)===null&&(o=t),t=t.sibling;t=o,t===null?(o=n.child,n.child=null):(o=t.sibling,t.sibling=null),ea(n,!1,o,t,a);break;case"backwards":for(t=null,o=n.child,n.child=null;o!==null;){if(e=o.alternate,e!==null&&to(e)===null){n.child=o;break}e=o.sibling,o.sibling=t,t=o,o=e}ea(n,!0,t,null,a);break;case"together":ea(n,!1,null,null,void 0);break;default:n.memoizedState=null}return n.child}function Fr(e,n){!(n.mode&1)&&e!==null&&(e.alternate=null,n.alternate=null,n.flags|=2)}function Je(e,n,t){if(e!==null&&(n.dependencies=e.dependencies),Mn|=n.lanes,!(t&n.childLanes))return null;if(e!==null&&n.child!==e.child)throw Error(k(153));if(n.child!==null){for(e=n.child,t=gn(e,e.pendingProps),n.child=t,t.return=n;e.sibling!==null;)e=e.sibling,t=t.sibling=gn(e,e.pendingProps),t.return=n;t.sibling=null}return n.child}function q0(e,n,t){switch(n.tag){case 3:nc(n),ot();break;case 5:Nu(n);break;case 1:ge(n.type)&&Xr(n);break;case 4:Cl(n,n.stateNode.containerInfo);break;case 10:var r=n.type._context,o=n.memoizedProps.value;I(Zr,r._currentValue),r._currentValue=o;break;case 13:if(r=n.memoizedState,r!==null)return r.dehydrated!==null?(I(B,B.current&1),n.flags|=128,null):t&n.child.childLanes?tc(e,n,t):(I(B,B.current&1),e=Je(e,n,t),e!==null?e.sibling:null);I(B,B.current&1);break;case 19:if(r=(t&n.childLanes)!==0,e.flags&128){if(r)return rc(e,n,t);n.flags|=128}if(o=n.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),I(B,B.current),r)break;return null;case 22:case 23:return n.lanes=0,Zu(e,n,t)}return Je(e,n,t)}var oc,Ba,ac,lc;oc=function(e,n){for(var t=n.child;t!==null;){if(t.tag===5||t.tag===6)e.appendChild(t.stateNode);else if(t.tag!==4&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break;for(;t.sibling===null;){if(t.return===null||t.return===n)return;t=t.return}t.sibling.return=t.return,t=t.sibling}};Ba=function(){};ac=function(e,n,t,r){var o=e.memoizedProps;if(o!==r){e=n.stateNode,En(Ue.current);var a=null;switch(t){case"input":o=ua(e,o),r=ua(e,r),a=[];break;case"select":o=W({},o,{value:void 0}),r=W({},r,{value:void 0}),a=[];break;case"textarea":o=fa(e,o),r=fa(e,r),a=[];break;default:typeof o.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Kr)}ha(t,r);var l;t=null;for(u in o)if(!r.hasOwnProperty(u)&&o.hasOwnProperty(u)&&o[u]!=null)if(u==="style"){var i=o[u];for(l in i)i.hasOwnProperty(l)&&(t||(t={}),t[l]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(Lt.hasOwnProperty(u)?a||(a=[]):(a=a||[]).push(u,null));for(u in r){var s=r[u];if(i=o!=null?o[u]:void 0,r.hasOwnProperty(u)&&s!==i&&(s!=null||i!=null))if(u==="style")if(i){for(l in i)!i.hasOwnProperty(l)||s&&s.hasOwnProperty(l)||(t||(t={}),t[l]="");for(l in s)s.hasOwnProperty(l)&&i[l]!==s[l]&&(t||(t={}),t[l]=s[l])}else t||(a||(a=[]),a.push(u,t)),t=s;else u==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,i=i?i.__html:void 0,s!=null&&i!==s&&(a=a||[]).push(u,s)):u==="children"?typeof s!="string"&&typeof s!="number"||(a=a||[]).push(u,""+s):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(Lt.hasOwnProperty(u)?(s!=null&&u==="onScroll"&&L("scroll",e),a||i===s||(a=[])):(a=a||[]).push(u,s))}t&&(a=a||[]).push("style",t);var u=a;(n.updateQueue=u)&&(n.flags|=4)}};lc=function(e,n,t,r){t!==r&&(n.flags|=4)};function kt(e,n){if(!A)switch(e.tailMode){case"hidden":n=e.tail;for(var t=null;n!==null;)n.alternate!==null&&(t=n),n=n.sibling;t===null?e.tail=null:t.sibling=null;break;case"collapsed":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function oe(e){var n=e.alternate!==null&&e.alternate.child===e.child,t=0,r=0;if(n)for(var o=e.child;o!==null;)t|=o.lanes|o.childLanes,r|=o.subtreeFlags&14680064,r|=o.flags&14680064,o.return=e,o=o.sibling;else for(o=e.child;o!==null;)t|=o.lanes|o.childLanes,r|=o.subtreeFlags,r|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=r,e.childLanes=t,n}function J0(e,n,t){var r=n.pendingProps;switch(vl(n),n.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return oe(n),null;case 1:return ge(n.type)&&Yr(),oe(n),null;case 3:return r=n.stateNode,lt(),D(he),D(le),El(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(wr(n)?n.flags|=4:e===null||e.memoizedState.isDehydrated&&!(n.flags&256)||(n.flags|=1024,Oe!==null&&(Ya(Oe),Oe=null))),Ba(e,n),oe(n),null;case 5:jl(n);var o=En(Yt.current);if(t=n.type,e!==null&&n.stateNode!=null)ac(e,n,t,r,o),e.ref!==n.ref&&(n.flags|=512,n.flags|=2097152);else{if(!r){if(n.stateNode===null)throw Error(k(166));return oe(n),null}if(e=En(Ue.current),wr(n)){r=n.stateNode,t=n.type;var a=n.memoizedProps;switch(r[Ae]=n,r[Gt]=a,e=(n.mode&1)!==0,t){case"dialog":L("cancel",r),L("close",r);break;case"iframe":case"object":case"embed":L("load",r);break;case"video":case"audio":for(o=0;o<Et.length;o++)L(Et[o],r);break;case"source":L("error",r);break;case"img":case"image":case"link":L("error",r),L("load",r);break;case"details":L("toggle",r);break;case"input":oi(r,a),L("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!a.multiple},L("invalid",r);break;case"textarea":li(r,a),L("invalid",r)}ha(t,a),o=null;for(var l in a)if(a.hasOwnProperty(l)){var i=a[l];l==="children"?typeof i=="string"?r.textContent!==i&&(a.suppressHydrationWarning!==!0&&xr(r.textContent,i,e),o=["children",i]):typeof i=="number"&&r.textContent!==""+i&&(a.suppressHydrationWarning!==!0&&xr(r.textContent,i,e),o=["children",""+i]):Lt.hasOwnProperty(l)&&i!=null&&l==="onScroll"&&L("scroll",r)}switch(t){case"input":dr(r),ai(r,a,!0);break;case"textarea":dr(r),ii(r);break;case"select":case"option":break;default:typeof a.onClick=="function"&&(r.onclick=Kr)}r=o,n.updateQueue=r,r!==null&&(n.flags|=4)}else{l=o.nodeType===9?o:o.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Os(t)),e==="http://www.w3.org/1999/xhtml"?t==="script"?(e=l.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=l.createElement(t,{is:r.is}):(e=l.createElement(t),t==="select"&&(l=e,r.multiple?l.multiple=!0:r.size&&(l.size=r.size))):e=l.createElementNS(e,t),e[Ae]=n,e[Gt]=r,oc(e,n,!1,!1),n.stateNode=e;e:{switch(l=ga(t,r),t){case"dialog":L("cancel",e),L("close",e),o=r;break;case"iframe":case"object":case"embed":L("load",e),o=r;break;case"video":case"audio":for(o=0;o<Et.length;o++)L(Et[o],e);o=r;break;case"source":L("error",e),o=r;break;case"img":case"image":case"link":L("error",e),L("load",e),o=r;break;case"details":L("toggle",e),o=r;break;case"input":oi(e,r),o=ua(e,r),L("invalid",e);break;case"option":o=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},o=W({},r,{value:void 0}),L("invalid",e);break;case"textarea":li(e,r),o=fa(e,r),L("invalid",e);break;default:o=r}ha(t,o),i=o;for(a in i)if(i.hasOwnProperty(a)){var s=i[a];a==="style"?Ls(e,s):a==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,s!=null&&Fs(e,s)):a==="children"?typeof s=="string"?(t!=="textarea"||s!=="")&&Rt(e,s):typeof s=="number"&&Rt(e,""+s):a!=="suppressContentEditableWarning"&&a!=="suppressHydrationWarning"&&a!=="autoFocus"&&(Lt.hasOwnProperty(a)?s!=null&&a==="onScroll"&&L("scroll",e):s!=null&&rl(e,a,s,l))}switch(t){case"input":dr(e),ai(e,r,!1);break;case"textarea":dr(e),ii(e);break;case"option":r.value!=null&&e.setAttribute("value",""+mn(r.value));break;case"select":e.multiple=!!r.multiple,a=r.value,a!=null?Xn(e,!!r.multiple,a,!1):r.defaultValue!=null&&Xn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof o.onClick=="function"&&(e.onclick=Kr)}switch(t){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(n.flags|=4)}n.ref!==null&&(n.flags|=512,n.flags|=2097152)}return oe(n),null;case 6:if(e&&n.stateNode!=null)lc(e,n,e.memoizedProps,r);else{if(typeof r!="string"&&n.stateNode===null)throw Error(k(166));if(t=En(Yt.current),En(Ue.current),wr(n)){if(r=n.stateNode,t=n.memoizedProps,r[Ae]=n,(a=r.nodeValue!==t)&&(e=we,e!==null))switch(e.tag){case 3:xr(r.nodeValue,t,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&xr(r.nodeValue,t,(e.mode&1)!==0)}a&&(n.flags|=4)}else r=(t.nodeType===9?t:t.ownerDocument).createTextNode(r),r[Ae]=n,n.stateNode=r}return oe(n),null;case 13:if(D(B),r=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(A&&xe!==null&&n.mode&1&&!(n.flags&128))_u(),ot(),n.flags|=98560,a=!1;else if(a=wr(n),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(k(318));if(a=n.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(k(317));a[Ae]=n}else ot(),!(n.flags&128)&&(n.memoizedState=null),n.flags|=4;oe(n),a=!1}else Oe!==null&&(Ya(Oe),Oe=null),a=!0;if(!a)return n.flags&65536?n:null}return n.flags&128?(n.lanes=t,n):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(n.child.flags|=8192,n.mode&1&&(e===null||B.current&1?X===0&&(X=3):Dl())),n.updateQueue!==null&&(n.flags|=4),oe(n),null);case 4:return lt(),Ba(e,n),e===null&&Vt(n.stateNode.containerInfo),oe(n),null;case 10:return kl(n.type._context),oe(n),null;case 17:return ge(n.type)&&Yr(),oe(n),null;case 19:if(D(B),a=n.memoizedState,a===null)return oe(n),null;if(r=(n.flags&128)!==0,l=a.rendering,l===null)if(r)kt(a,!1);else{if(X!==0||e!==null&&e.flags&128)for(e=n.child;e!==null;){if(l=to(e),l!==null){for(n.flags|=128,kt(a,!1),r=l.updateQueue,r!==null&&(n.updateQueue=r,n.flags|=4),n.subtreeFlags=0,r=t,t=n.child;t!==null;)a=t,e=r,a.flags&=14680066,l=a.alternate,l===null?(a.childLanes=0,a.lanes=e,a.child=null,a.subtreeFlags=0,a.memoizedProps=null,a.memoizedState=null,a.updateQueue=null,a.dependencies=null,a.stateNode=null):(a.childLanes=l.childLanes,a.lanes=l.lanes,a.child=l.child,a.subtreeFlags=0,a.deletions=null,a.memoizedProps=l.memoizedProps,a.memoizedState=l.memoizedState,a.updateQueue=l.updateQueue,a.type=l.type,e=l.dependencies,a.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t=t.sibling;return I(B,B.current&1|2),n.child}e=e.sibling}a.tail!==null&&G()>st&&(n.flags|=128,r=!0,kt(a,!1),n.lanes=4194304)}else{if(!r)if(e=to(l),e!==null){if(n.flags|=128,r=!0,t=e.updateQueue,t!==null&&(n.updateQueue=t,n.flags|=4),kt(a,!0),a.tail===null&&a.tailMode==="hidden"&&!l.alternate&&!A)return oe(n),null}else 2*G()-a.renderingStartTime>st&&t!==1073741824&&(n.flags|=128,r=!0,kt(a,!1),n.lanes=4194304);a.isBackwards?(l.sibling=n.child,n.child=l):(t=a.last,t!==null?t.sibling=l:n.child=l,a.last=l)}return a.tail!==null?(n=a.tail,a.rendering=n,a.tail=n.sibling,a.renderingStartTime=G(),n.sibling=null,t=B.current,I(B,r?t&1|2:t&1),n):(oe(n),null);case 22:case 23:return Rl(),r=n.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(n.flags|=8192),r&&n.mode&1?ve&1073741824&&(oe(n),n.subtreeFlags&6&&(n.flags|=8192)):oe(n),null;case 24:return null;case 25:return null}throw Error(k(156,n.tag))}function Z0(e,n){switch(vl(n),n.tag){case 1:return ge(n.type)&&Yr(),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return lt(),D(he),D(le),El(),e=n.flags,e&65536&&!(e&128)?(n.flags=e&-65537|128,n):null;case 5:return jl(n),null;case 13:if(D(B),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(k(340));ot()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return D(B),null;case 4:return lt(),null;case 10:return kl(n.type._context),null;case 22:case 23:return Rl(),null;case 24:return null;default:return null}}var Sr=!1,ae=!1,ey=typeof WeakSet=="function"?WeakSet:Set,_=null;function Kn(e,n){var t=e.ref;if(t!==null)if(typeof t=="function")try{t(null)}catch(r){H(e,n,r)}else t.current=null}function Ua(e,n,t){try{t()}catch(r){H(e,n,r)}}var Xi=!1;function ny(e,n){if(Ca=Vr,e=du(),ml(e)){if("selectionStart"in e)var t={start:e.selectionStart,end:e.selectionEnd};else e:{t=(t=e.ownerDocument)&&t.defaultView||window;var r=t.getSelection&&t.getSelection();if(r&&r.rangeCount!==0){t=r.anchorNode;var o=r.anchorOffset,a=r.focusNode;r=r.focusOffset;try{t.nodeType,a.nodeType}catch{t=null;break e}var l=0,i=-1,s=-1,u=0,f=0,h=e,m=null;n:for(;;){for(var v;h!==t||o!==0&&h.nodeType!==3||(i=l+o),h!==a||r!==0&&h.nodeType!==3||(s=l+r),h.nodeType===3&&(l+=h.nodeValue.length),(v=h.firstChild)!==null;)m=h,h=v;for(;;){if(h===e)break n;if(m===t&&++u===o&&(i=l),m===a&&++f===r&&(s=l),(v=h.nextSibling)!==null)break;h=m,m=h.parentNode}h=v}t=i===-1||s===-1?null:{start:i,end:s}}else t=null}t=t||{start:0,end:0}}else t=null;for(ja={focusedElem:e,selectionRange:t},Vr=!1,_=n;_!==null;)if(n=_,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,_=e;else for(;_!==null;){n=_;try{var S=n.alternate;if(n.flags&1024)switch(n.tag){case 0:case 11:case 15:break;case 1:if(S!==null){var w=S.memoizedProps,$=S.memoizedState,p=n.stateNode,c=p.getSnapshotBeforeUpdate(n.elementType===n.type?w:ze(n.type,w),$);p.__reactInternalSnapshotBeforeUpdate=c}break;case 3:var g=n.stateNode.containerInfo;g.nodeType===1?g.textContent="":g.nodeType===9&&g.documentElement&&g.removeChild(g.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(k(163))}}catch(x){H(n,n.return,x)}if(e=n.sibling,e!==null){e.return=n.return,_=e;break}_=n.return}return S=Xi,Xi=!1,S}function Ot(e,n,t){var r=n.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var o=r=r.next;do{if((o.tag&e)===e){var a=o.destroy;o.destroy=void 0,a!==void 0&&Ua(n,t,a)}o=o.next}while(o!==r)}}function bo(e,n){if(n=n.updateQueue,n=n!==null?n.lastEffect:null,n!==null){var t=n=n.next;do{if((t.tag&e)===e){var r=t.create;t.destroy=r()}t=t.next}while(t!==n)}}function Wa(e){var n=e.ref;if(n!==null){var t=e.stateNode;switch(e.tag){case 5:e=t;break;default:e=t}typeof n=="function"?n(e):n.current=e}}function ic(e){var n=e.alternate;n!==null&&(e.alternate=null,ic(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&(delete n[Ae],delete n[Gt],delete n[Na],delete n[L0],delete n[R0])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function sc(e){return e.tag===5||e.tag===3||e.tag===4}function qi(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||sc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Ha(e,n,t){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?t.nodeType===8?t.parentNode.insertBefore(e,n):t.insertBefore(e,n):(t.nodeType===8?(n=t.parentNode,n.insertBefore(e,t)):(n=t,n.appendChild(e)),t=t._reactRootContainer,t!=null||n.onclick!==null||(n.onclick=Kr));else if(r!==4&&(e=e.child,e!==null))for(Ha(e,n,t),e=e.sibling;e!==null;)Ha(e,n,t),e=e.sibling}function Va(e,n,t){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?t.insertBefore(e,n):t.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Va(e,n,t),e=e.sibling;e!==null;)Va(e,n,t),e=e.sibling}var ee=null,Me=!1;function en(e,n,t){for(t=t.child;t!==null;)uc(e,n,t),t=t.sibling}function uc(e,n,t){if(Be&&typeof Be.onCommitFiberUnmount=="function")try{Be.onCommitFiberUnmount(po,t)}catch{}switch(t.tag){case 5:ae||Kn(t,n);case 6:var r=ee,o=Me;ee=null,en(e,n,t),ee=r,Me=o,ee!==null&&(Me?(e=ee,t=t.stateNode,e.nodeType===8?e.parentNode.removeChild(t):e.removeChild(t)):ee.removeChild(t.stateNode));break;case 18:ee!==null&&(Me?(e=ee,t=t.stateNode,e.nodeType===8?Go(e.parentNode,t):e.nodeType===1&&Go(e,t),Ut(e)):Go(ee,t.stateNode));break;case 4:r=ee,o=Me,ee=t.stateNode.containerInfo,Me=!0,en(e,n,t),ee=r,Me=o;break;case 0:case 11:case 14:case 15:if(!ae&&(r=t.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){o=r=r.next;do{var a=o,l=a.destroy;a=a.tag,l!==void 0&&(a&2||a&4)&&Ua(t,n,l),o=o.next}while(o!==r)}en(e,n,t);break;case 1:if(!ae&&(Kn(t,n),r=t.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=t.memoizedProps,r.state=t.memoizedState,r.componentWillUnmount()}catch(i){H(t,n,i)}en(e,n,t);break;case 21:en(e,n,t);break;case 22:t.mode&1?(ae=(r=ae)||t.memoizedState!==null,en(e,n,t),ae=r):en(e,n,t);break;default:en(e,n,t)}}function Ji(e){var n=e.updateQueue;if(n!==null){e.updateQueue=null;var t=e.stateNode;t===null&&(t=e.stateNode=new ey),n.forEach(function(r){var o=cy.bind(null,e,r);t.has(r)||(t.add(r),r.then(o,o))})}}function Pe(e,n){var t=n.deletions;if(t!==null)for(var r=0;r<t.length;r++){var o=t[r];try{var a=e,l=n,i=l;e:for(;i!==null;){switch(i.tag){case 5:ee=i.stateNode,Me=!1;break e;case 3:ee=i.stateNode.containerInfo,Me=!0;break e;case 4:ee=i.stateNode.containerInfo,Me=!0;break e}i=i.return}if(ee===null)throw Error(k(160));uc(a,l,o),ee=null,Me=!1;var s=o.alternate;s!==null&&(s.return=null),o.return=null}catch(u){H(o,n,u)}}if(n.subtreeFlags&12854)for(n=n.child;n!==null;)cc(n,e),n=n.sibling}function cc(e,n){var t=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Pe(n,e),Re(e),r&4){try{Ot(3,e,e.return),bo(3,e)}catch(w){H(e,e.return,w)}try{Ot(5,e,e.return)}catch(w){H(e,e.return,w)}}break;case 1:Pe(n,e),Re(e),r&512&&t!==null&&Kn(t,t.return);break;case 5:if(Pe(n,e),Re(e),r&512&&t!==null&&Kn(t,t.return),e.flags&32){var o=e.stateNode;try{Rt(o,"")}catch(w){H(e,e.return,w)}}if(r&4&&(o=e.stateNode,o!=null)){var a=e.memoizedProps,l=t!==null?t.memoizedProps:a,i=e.type,s=e.updateQueue;if(e.updateQueue=null,s!==null)try{i==="input"&&a.type==="radio"&&a.name!=null&&zs(o,a),ga(i,l);var u=ga(i,a);for(l=0;l<s.length;l+=2){var f=s[l],h=s[l+1];f==="style"?Ls(o,h):f==="dangerouslySetInnerHTML"?Fs(o,h):f==="children"?Rt(o,h):rl(o,f,h,u)}switch(i){case"input":ca(o,a);break;case"textarea":Ms(o,a);break;case"select":var m=o._wrapperState.wasMultiple;o._wrapperState.wasMultiple=!!a.multiple;var v=a.value;v!=null?Xn(o,!!a.multiple,v,!1):m!==!!a.multiple&&(a.defaultValue!=null?Xn(o,!!a.multiple,a.defaultValue,!0):Xn(o,!!a.multiple,a.multiple?[]:"",!1))}o[Gt]=a}catch(w){H(e,e.return,w)}}break;case 6:if(Pe(n,e),Re(e),r&4){if(e.stateNode===null)throw Error(k(162));o=e.stateNode,a=e.memoizedProps;try{o.nodeValue=a}catch(w){H(e,e.return,w)}}break;case 3:if(Pe(n,e),Re(e),r&4&&t!==null&&t.memoizedState.isDehydrated)try{Ut(n.containerInfo)}catch(w){H(e,e.return,w)}break;case 4:Pe(n,e),Re(e);break;case 13:Pe(n,e),Re(e),o=e.child,o.flags&8192&&(a=o.memoizedState!==null,o.stateNode.isHidden=a,!a||o.alternate!==null&&o.alternate.memoizedState!==null||(Il=G())),r&4&&Ji(e);break;case 22:if(f=t!==null&&t.memoizedState!==null,e.mode&1?(ae=(u=ae)||f,Pe(n,e),ae=u):Pe(n,e),Re(e),r&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!f&&e.mode&1)for(_=e,f=e.child;f!==null;){for(h=_=f;_!==null;){switch(m=_,v=m.child,m.tag){case 0:case 11:case 14:case 15:Ot(4,m,m.return);break;case 1:Kn(m,m.return);var S=m.stateNode;if(typeof S.componentWillUnmount=="function"){r=m,t=m.return;try{n=r,S.props=n.memoizedProps,S.state=n.memoizedState,S.componentWillUnmount()}catch(w){H(r,t,w)}}break;case 5:Kn(m,m.return);break;case 22:if(m.memoizedState!==null){es(h);continue}}v!==null?(v.return=m,_=v):es(h)}f=f.sibling}e:for(f=null,h=e;;){if(h.tag===5){if(f===null){f=h;try{o=h.stateNode,u?(a=o.style,typeof a.setProperty=="function"?a.setProperty("display","none","important"):a.display="none"):(i=h.stateNode,s=h.memoizedProps.style,l=s!=null&&s.hasOwnProperty("display")?s.display:null,i.style.display=Is("display",l))}catch(w){H(e,e.return,w)}}}else if(h.tag===6){if(f===null)try{h.stateNode.nodeValue=u?"":h.memoizedProps}catch(w){H(e,e.return,w)}}else if((h.tag!==22&&h.tag!==23||h.memoizedState===null||h===e)&&h.child!==null){h.child.return=h,h=h.child;continue}if(h===e)break e;for(;h.sibling===null;){if(h.return===null||h.return===e)break e;f===h&&(f=null),h=h.return}f===h&&(f=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:Pe(n,e),Re(e),r&4&&Ji(e);break;case 21:break;default:Pe(n,e),Re(e)}}function Re(e){var n=e.flags;if(n&2){try{e:{for(var t=e.return;t!==null;){if(sc(t)){var r=t;break e}t=t.return}throw Error(k(160))}switch(r.tag){case 5:var o=r.stateNode;r.flags&32&&(Rt(o,""),r.flags&=-33);var a=qi(e);Va(e,a,o);break;case 3:case 4:var l=r.stateNode.containerInfo,i=qi(e);Ha(e,i,l);break;default:throw Error(k(161))}}catch(s){H(e,e.return,s)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function ty(e,n,t){_=e,dc(e)}function dc(e,n,t){for(var r=(e.mode&1)!==0;_!==null;){var o=_,a=o.child;if(o.tag===22&&r){var l=o.memoizedState!==null||Sr;if(!l){var i=o.alternate,s=i!==null&&i.memoizedState!==null||ae;i=Sr;var u=ae;if(Sr=l,(ae=s)&&!u)for(_=o;_!==null;)l=_,s=l.child,l.tag===22&&l.memoizedState!==null?ns(o):s!==null?(s.return=l,_=s):ns(o);for(;a!==null;)_=a,dc(a),a=a.sibling;_=o,Sr=i,ae=u}Zi(e)}else o.subtreeFlags&8772&&a!==null?(a.return=o,_=a):Zi(e)}}function Zi(e){for(;_!==null;){var n=_;if(n.flags&8772){var t=n.alternate;try{if(n.flags&8772)switch(n.tag){case 0:case 11:case 15:ae||bo(5,n);break;case 1:var r=n.stateNode;if(n.flags&4&&!ae)if(t===null)r.componentDidMount();else{var o=n.elementType===n.type?t.memoizedProps:ze(n.type,t.memoizedProps);r.componentDidUpdate(o,t.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var a=n.updateQueue;a!==null&&Li(n,a,r);break;case 3:var l=n.updateQueue;if(l!==null){if(t=null,n.child!==null)switch(n.child.tag){case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}Li(n,l,t)}break;case 5:var i=n.stateNode;if(t===null&&n.flags&4){t=i;var s=n.memoizedProps;switch(n.type){case"button":case"input":case"select":case"textarea":s.autoFocus&&t.focus();break;case"img":s.src&&(t.src=s.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(n.memoizedState===null){var u=n.alternate;if(u!==null){var f=u.memoizedState;if(f!==null){var h=f.dehydrated;h!==null&&Ut(h)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(k(163))}ae||n.flags&512&&Wa(n)}catch(m){H(n,n.return,m)}}if(n===e){_=null;break}if(t=n.sibling,t!==null){t.return=n.return,_=t;break}_=n.return}}function es(e){for(;_!==null;){var n=_;if(n===e){_=null;break}var t=n.sibling;if(t!==null){t.return=n.return,_=t;break}_=n.return}}function ns(e){for(;_!==null;){var n=_;try{switch(n.tag){case 0:case 11:case 15:var t=n.return;try{bo(4,n)}catch(s){H(n,t,s)}break;case 1:var r=n.stateNode;if(typeof r.componentDidMount=="function"){var o=n.return;try{r.componentDidMount()}catch(s){H(n,o,s)}}var a=n.return;try{Wa(n)}catch(s){H(n,a,s)}break;case 5:var l=n.return;try{Wa(n)}catch(s){H(n,l,s)}}}catch(s){H(n,n.return,s)}if(n===e){_=null;break}var i=n.sibling;if(i!==null){i.return=n.return,_=i;break}_=n.return}}var ry=Math.ceil,ao=Ze.ReactCurrentDispatcher,Ol=Ze.ReactCurrentOwner,Ee=Ze.ReactCurrentBatchConfig,O=0,Z=null,K=null,ne=0,ve=0,Yn=xn(0),X=0,Zt=null,Mn=0,ko=0,Fl=0,Ft=null,fe=null,Il=0,st=1/0,He=null,lo=!1,Qa=null,pn=null,_r=!1,ln=null,io=0,It=0,Ga=null,Ir=-1,Lr=0;function se(){return O&6?G():Ir!==-1?Ir:Ir=G()}function hn(e){return e.mode&1?O&2&&ne!==0?ne&-ne:A0.transition!==null?(Lr===0&&(Lr=Ys()),Lr):(e=F,e!==0||(e=window.event,e=e===void 0?16:tu(e.type)),e):1}function Ie(e,n,t,r){if(50<It)throw It=0,Ga=null,Error(k(185));tr(e,t,r),(!(O&2)||e!==Z)&&(e===Z&&(!(O&2)&&(ko|=t),X===4&&on(e,ne)),me(e,r),t===1&&O===0&&!(n.mode&1)&&(st=G()+500,vo&&wn()))}function me(e,n){var t=e.callbackNode;Am(e,n);var r=Hr(e,e===Z?ne:0);if(r===0)t!==null&&ci(t),e.callbackNode=null,e.callbackPriority=0;else if(n=r&-r,e.callbackPriority!==n){if(t!=null&&ci(t),n===1)e.tag===0?D0(ts.bind(null,e)):bu(ts.bind(null,e)),F0(function(){!(O&6)&&wn()}),t=null;else{switch(Xs(r)){case 1:t=sl;break;case 4:t=Gs;break;case 16:t=Wr;break;case 536870912:t=Ks;break;default:t=Wr}t=xc(t,fc.bind(null,e))}e.callbackPriority=n,e.callbackNode=t}}function fc(e,n){if(Ir=-1,Lr=0,O&6)throw Error(k(327));var t=e.callbackNode;if(nt()&&e.callbackNode!==t)return null;var r=Hr(e,e===Z?ne:0);if(r===0)return null;if(r&30||r&e.expiredLanes||n)n=so(e,r);else{n=r;var o=O;O|=2;var a=hc();(Z!==e||ne!==n)&&(He=null,st=G()+500,$n(e,n));do try{ly();break}catch(i){pc(e,i)}while(!0);bl(),ao.current=a,O=o,K!==null?n=0:(Z=null,ne=0,n=X)}if(n!==0){if(n===2&&(o=wa(e),o!==0&&(r=o,n=Ka(e,o))),n===1)throw t=Zt,$n(e,0),on(e,r),me(e,G()),t;if(n===6)on(e,r);else{if(o=e.current.alternate,!(r&30)&&!oy(o)&&(n=so(e,r),n===2&&(a=wa(e),a!==0&&(r=a,n=Ka(e,a))),n===1))throw t=Zt,$n(e,0),on(e,r),me(e,G()),t;switch(e.finishedWork=o,e.finishedLanes=r,n){case 0:case 1:throw Error(k(345));case 2:_n(e,fe,He);break;case 3:if(on(e,r),(r&130023424)===r&&(n=Il+500-G(),10<n)){if(Hr(e,0)!==0)break;if(o=e.suspendedLanes,(o&r)!==r){se(),e.pingedLanes|=e.suspendedLanes&o;break}e.timeoutHandle=$a(_n.bind(null,e,fe,He),n);break}_n(e,fe,He);break;case 4:if(on(e,r),(r&4194240)===r)break;for(n=e.eventTimes,o=-1;0<r;){var l=31-Fe(r);a=1<<l,l=n[l],l>o&&(o=l),r&=~a}if(r=o,r=G()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*ry(r/1960))-r,10<r){e.timeoutHandle=$a(_n.bind(null,e,fe,He),r);break}_n(e,fe,He);break;case 5:_n(e,fe,He);break;default:throw Error(k(329))}}}return me(e,G()),e.callbackNode===t?fc.bind(null,e):null}function Ka(e,n){var t=Ft;return e.current.memoizedState.isDehydrated&&($n(e,n).flags|=256),e=so(e,n),e!==2&&(n=fe,fe=t,n!==null&&Ya(n)),e}function Ya(e){fe===null?fe=e:fe.push.apply(fe,e)}function oy(e){for(var n=e;;){if(n.flags&16384){var t=n.updateQueue;if(t!==null&&(t=t.stores,t!==null))for(var r=0;r<t.length;r++){var o=t[r],a=o.getSnapshot;o=o.value;try{if(!Le(a(),o))return!1}catch{return!1}}}if(t=n.child,n.subtreeFlags&16384&&t!==null)t.return=n,n=t;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function on(e,n){for(n&=~Fl,n&=~ko,e.suspendedLanes|=n,e.pingedLanes&=~n,e=e.expirationTimes;0<n;){var t=31-Fe(n),r=1<<t;e[t]=-1,n&=~r}}function ts(e){if(O&6)throw Error(k(327));nt();var n=Hr(e,0);if(!(n&1))return me(e,G()),null;var t=so(e,n);if(e.tag!==0&&t===2){var r=wa(e);r!==0&&(n=r,t=Ka(e,r))}if(t===1)throw t=Zt,$n(e,0),on(e,n),me(e,G()),t;if(t===6)throw Error(k(345));return e.finishedWork=e.current.alternate,e.finishedLanes=n,_n(e,fe,He),me(e,G()),null}function Ll(e,n){var t=O;O|=1;try{return e(n)}finally{O=t,O===0&&(st=G()+500,vo&&wn())}}function On(e){ln!==null&&ln.tag===0&&!(O&6)&&nt();var n=O;O|=1;var t=Ee.transition,r=F;try{if(Ee.transition=null,F=1,e)return e()}finally{F=r,Ee.transition=t,O=n,!(O&6)&&wn()}}function Rl(){ve=Yn.current,D(Yn)}function $n(e,n){e.finishedWork=null,e.finishedLanes=0;var t=e.timeoutHandle;if(t!==-1&&(e.timeoutHandle=-1,O0(t)),K!==null)for(t=K.return;t!==null;){var r=t;switch(vl(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Yr();break;case 3:lt(),D(he),D(le),El();break;case 5:jl(r);break;case 4:lt();break;case 13:D(B);break;case 19:D(B);break;case 10:kl(r.type._context);break;case 22:case 23:Rl()}t=t.return}if(Z=e,K=e=gn(e.current,null),ne=ve=n,X=0,Zt=null,Fl=ko=Mn=0,fe=Ft=null,jn!==null){for(n=0;n<jn.length;n++)if(t=jn[n],r=t.interleaved,r!==null){t.interleaved=null;var o=r.next,a=t.pending;if(a!==null){var l=a.next;a.next=o,r.next=l}t.pending=r}jn=null}return e}function pc(e,n){do{var t=K;try{if(bl(),Mr.current=oo,ro){for(var r=U.memoizedState;r!==null;){var o=r.queue;o!==null&&(o.pending=null),r=r.next}ro=!1}if(zn=0,J=Y=U=null,Mt=!1,Xt=0,Ol.current=null,t===null||t.return===null){X=1,Zt=n,K=null;break}e:{var a=e,l=t.return,i=t,s=n;if(n=ne,i.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){var u=s,f=i,h=f.tag;if(!(f.mode&1)&&(h===0||h===11||h===15)){var m=f.alternate;m?(f.updateQueue=m.updateQueue,f.memoizedState=m.memoizedState,f.lanes=m.lanes):(f.updateQueue=null,f.memoizedState=null)}var v=Wi(l);if(v!==null){v.flags&=-257,Hi(v,l,i,a,n),v.mode&1&&Ui(a,u,n),n=v,s=u;var S=n.updateQueue;if(S===null){var w=new Set;w.add(s),n.updateQueue=w}else S.add(s);break e}else{if(!(n&1)){Ui(a,u,n),Dl();break e}s=Error(k(426))}}else if(A&&i.mode&1){var $=Wi(l);if($!==null){!($.flags&65536)&&($.flags|=256),Hi($,l,i,a,n),xl(it(s,i));break e}}a=s=it(s,i),X!==4&&(X=2),Ft===null?Ft=[a]:Ft.push(a),a=l;do{switch(a.tag){case 3:a.flags|=65536,n&=-n,a.lanes|=n;var p=Xu(a,s,n);Ii(a,p);break e;case 1:i=s;var c=a.type,g=a.stateNode;if(!(a.flags&128)&&(typeof c.getDerivedStateFromError=="function"||g!==null&&typeof g.componentDidCatch=="function"&&(pn===null||!pn.has(g)))){a.flags|=65536,n&=-n,a.lanes|=n;var x=qu(a,i,n);Ii(a,x);break e}}a=a.return}while(a!==null)}mc(t)}catch(y){n=y,K===t&&t!==null&&(K=t=t.return);continue}break}while(!0)}function hc(){var e=ao.current;return ao.current=oo,e===null?oo:e}function Dl(){(X===0||X===3||X===2)&&(X=4),Z===null||!(Mn&268435455)&&!(ko&268435455)||on(Z,ne)}function so(e,n){var t=O;O|=2;var r=hc();(Z!==e||ne!==n)&&(He=null,$n(e,n));do try{ay();break}catch(o){pc(e,o)}while(!0);if(bl(),O=t,ao.current=r,K!==null)throw Error(k(261));return Z=null,ne=0,X}function ay(){for(;K!==null;)gc(K)}function ly(){for(;K!==null&&!Pm();)gc(K)}function gc(e){var n=vc(e.alternate,e,ve);e.memoizedProps=e.pendingProps,n===null?mc(e):K=n,Ol.current=null}function mc(e){var n=e;do{var t=n.alternate;if(e=n.return,n.flags&32768){if(t=Z0(t,n),t!==null){t.flags&=32767,K=t;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{X=6,K=null;return}}else if(t=J0(t,n,ve),t!==null){K=t;return}if(n=n.sibling,n!==null){K=n;return}K=n=e}while(n!==null);X===0&&(X=5)}function _n(e,n,t){var r=F,o=Ee.transition;try{Ee.transition=null,F=1,iy(e,n,t,r)}finally{Ee.transition=o,F=r}return null}function iy(e,n,t,r){do nt();while(ln!==null);if(O&6)throw Error(k(327));t=e.finishedWork;var o=e.finishedLanes;if(t===null)return null;if(e.finishedWork=null,e.finishedLanes=0,t===e.current)throw Error(k(177));e.callbackNode=null,e.callbackPriority=0;var a=t.lanes|t.childLanes;if(Bm(e,a),e===Z&&(K=Z=null,ne=0),!(t.subtreeFlags&2064)&&!(t.flags&2064)||_r||(_r=!0,xc(Wr,function(){return nt(),null})),a=(t.flags&15990)!==0,t.subtreeFlags&15990||a){a=Ee.transition,Ee.transition=null;var l=F;F=1;var i=O;O|=4,Ol.current=null,ny(e,t),cc(t,e),E0(ja),Vr=!!Ca,ja=Ca=null,e.current=t,ty(t),zm(),O=i,F=l,Ee.transition=a}else e.current=t;if(_r&&(_r=!1,ln=e,io=o),a=e.pendingLanes,a===0&&(pn=null),Fm(t.stateNode),me(e,G()),n!==null)for(r=e.onRecoverableError,t=0;t<n.length;t++)o=n[t],r(o.value,{componentStack:o.stack,digest:o.digest});if(lo)throw lo=!1,e=Qa,Qa=null,e;return io&1&&e.tag!==0&&nt(),a=e.pendingLanes,a&1?e===Ga?It++:(It=0,Ga=e):It=0,wn(),null}function nt(){if(ln!==null){var e=Xs(io),n=Ee.transition,t=F;try{if(Ee.transition=null,F=16>e?16:e,ln===null)var r=!1;else{if(e=ln,ln=null,io=0,O&6)throw Error(k(331));var o=O;for(O|=4,_=e.current;_!==null;){var a=_,l=a.child;if(_.flags&16){var i=a.deletions;if(i!==null){for(var s=0;s<i.length;s++){var u=i[s];for(_=u;_!==null;){var f=_;switch(f.tag){case 0:case 11:case 15:Ot(8,f,a)}var h=f.child;if(h!==null)h.return=f,_=h;else for(;_!==null;){f=_;var m=f.sibling,v=f.return;if(ic(f),f===u){_=null;break}if(m!==null){m.return=v,_=m;break}_=v}}}var S=a.alternate;if(S!==null){var w=S.child;if(w!==null){S.child=null;do{var $=w.sibling;w.sibling=null,w=$}while(w!==null)}}_=a}}if(a.subtreeFlags&2064&&l!==null)l.return=a,_=l;else e:for(;_!==null;){if(a=_,a.flags&2048)switch(a.tag){case 0:case 11:case 15:Ot(9,a,a.return)}var p=a.sibling;if(p!==null){p.return=a.return,_=p;break e}_=a.return}}var c=e.current;for(_=c;_!==null;){l=_;var g=l.child;if(l.subtreeFlags&2064&&g!==null)g.return=l,_=g;else e:for(l=c;_!==null;){if(i=_,i.flags&2048)try{switch(i.tag){case 0:case 11:case 15:bo(9,i)}}catch(y){H(i,i.return,y)}if(i===l){_=null;break e}var x=i.sibling;if(x!==null){x.return=i.return,_=x;break e}_=i.return}}if(O=o,wn(),Be&&typeof Be.onPostCommitFiberRoot=="function")try{Be.onPostCommitFiberRoot(po,e)}catch{}r=!0}return r}finally{F=t,Ee.transition=n}}return!1}function rs(e,n,t){n=it(t,n),n=Xu(e,n,1),e=fn(e,n,1),n=se(),e!==null&&(tr(e,1,n),me(e,n))}function H(e,n,t){if(e.tag===3)rs(e,e,t);else for(;n!==null;){if(n.tag===3){rs(n,e,t);break}else if(n.tag===1){var r=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(pn===null||!pn.has(r))){e=it(t,e),e=qu(n,e,1),n=fn(n,e,1),e=se(),n!==null&&(tr(n,1,e),me(n,e));break}}n=n.return}}function sy(e,n,t){var r=e.pingCache;r!==null&&r.delete(n),n=se(),e.pingedLanes|=e.suspendedLanes&t,Z===e&&(ne&t)===t&&(X===4||X===3&&(ne&130023424)===ne&&500>G()-Il?$n(e,0):Fl|=t),me(e,n)}function yc(e,n){n===0&&(e.mode&1?(n=hr,hr<<=1,!(hr&130023424)&&(hr=4194304)):n=1);var t=se();e=qe(e,n),e!==null&&(tr(e,n,t),me(e,t))}function uy(e){var n=e.memoizedState,t=0;n!==null&&(t=n.retryLane),yc(e,t)}function cy(e,n){var t=0;switch(e.tag){case 13:var r=e.stateNode,o=e.memoizedState;o!==null&&(t=o.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(k(314))}r!==null&&r.delete(n),yc(e,t)}var vc;vc=function(e,n,t){if(e!==null)if(e.memoizedProps!==n.pendingProps||he.current)pe=!0;else{if(!(e.lanes&t)&&!(n.flags&128))return pe=!1,q0(e,n,t);pe=!!(e.flags&131072)}else pe=!1,A&&n.flags&1048576&&ku(n,Jr,n.index);switch(n.lanes=0,n.tag){case 2:var r=n.type;Fr(e,n),e=n.pendingProps;var o=rt(n,le.current);et(n,t),o=Nl(null,n,r,e,o,t);var a=Tl();return n.flags|=1,typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0?(n.tag=1,n.memoizedState=null,n.updateQueue=null,ge(r)?(a=!0,Xr(n)):a=!1,n.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,_l(n),o.updater=wo,n.stateNode=o,o._reactInternals=n,Fa(n,r,e,t),n=Ra(null,n,r,!0,a,t)):(n.tag=0,A&&a&&yl(n),ie(null,n,o,t),n=n.child),n;case 16:r=n.elementType;e:{switch(Fr(e,n),e=n.pendingProps,o=r._init,r=o(r._payload),n.type=r,o=n.tag=fy(r),e=ze(r,e),o){case 0:n=La(null,n,r,e,t);break e;case 1:n=Gi(null,n,r,e,t);break e;case 11:n=Vi(null,n,r,e,t);break e;case 14:n=Qi(null,n,r,ze(r.type,e),t);break e}throw Error(k(306,r,""))}return n;case 0:return r=n.type,o=n.pendingProps,o=n.elementType===r?o:ze(r,o),La(e,n,r,o,t);case 1:return r=n.type,o=n.pendingProps,o=n.elementType===r?o:ze(r,o),Gi(e,n,r,o,t);case 3:e:{if(nc(n),e===null)throw Error(k(387));r=n.pendingProps,a=n.memoizedState,o=a.element,$u(e,n),no(n,r,null,t);var l=n.memoizedState;if(r=l.element,a.isDehydrated)if(a={element:r,isDehydrated:!1,cache:l.cache,pendingSuspenseBoundaries:l.pendingSuspenseBoundaries,transitions:l.transitions},n.updateQueue.baseState=a,n.memoizedState=a,n.flags&256){o=it(Error(k(423)),n),n=Ki(e,n,r,t,o);break e}else if(r!==o){o=it(Error(k(424)),n),n=Ki(e,n,r,t,o);break e}else for(xe=dn(n.stateNode.containerInfo.firstChild),we=n,A=!0,Oe=null,t=ju(n,null,r,t),n.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling;else{if(ot(),r===o){n=Je(e,n,t);break e}ie(e,n,r,t)}n=n.child}return n;case 5:return Nu(n),e===null&&za(n),r=n.type,o=n.pendingProps,a=e!==null?e.memoizedProps:null,l=o.children,Ea(r,o)?l=null:a!==null&&Ea(r,a)&&(n.flags|=32),ec(e,n),ie(e,n,l,t),n.child;case 6:return e===null&&za(n),null;case 13:return tc(e,n,t);case 4:return Cl(n,n.stateNode.containerInfo),r=n.pendingProps,e===null?n.child=at(n,null,r,t):ie(e,n,r,t),n.child;case 11:return r=n.type,o=n.pendingProps,o=n.elementType===r?o:ze(r,o),Vi(e,n,r,o,t);case 7:return ie(e,n,n.pendingProps,t),n.child;case 8:return ie(e,n,n.pendingProps.children,t),n.child;case 12:return ie(e,n,n.pendingProps.children,t),n.child;case 10:e:{if(r=n.type._context,o=n.pendingProps,a=n.memoizedProps,l=o.value,I(Zr,r._currentValue),r._currentValue=l,a!==null)if(Le(a.value,l)){if(a.children===o.children&&!he.current){n=Je(e,n,t);break e}}else for(a=n.child,a!==null&&(a.return=n);a!==null;){var i=a.dependencies;if(i!==null){l=a.child;for(var s=i.firstContext;s!==null;){if(s.context===r){if(a.tag===1){s=Ke(-1,t&-t),s.tag=2;var u=a.updateQueue;if(u!==null){u=u.shared;var f=u.pending;f===null?s.next=s:(s.next=f.next,f.next=s),u.pending=s}}a.lanes|=t,s=a.alternate,s!==null&&(s.lanes|=t),Ma(a.return,t,n),i.lanes|=t;break}s=s.next}}else if(a.tag===10)l=a.type===n.type?null:a.child;else if(a.tag===18){if(l=a.return,l===null)throw Error(k(341));l.lanes|=t,i=l.alternate,i!==null&&(i.lanes|=t),Ma(l,t,n),l=a.sibling}else l=a.child;if(l!==null)l.return=a;else for(l=a;l!==null;){if(l===n){l=null;break}if(a=l.sibling,a!==null){a.return=l.return,l=a;break}l=l.return}a=l}ie(e,n,o.children,t),n=n.child}return n;case 9:return o=n.type,r=n.pendingProps.children,et(n,t),o=$e(o),r=r(o),n.flags|=1,ie(e,n,r,t),n.child;case 14:return r=n.type,o=ze(r,n.pendingProps),o=ze(r.type,o),Qi(e,n,r,o,t);case 15:return Ju(e,n,n.type,n.pendingProps,t);case 17:return r=n.type,o=n.pendingProps,o=n.elementType===r?o:ze(r,o),Fr(e,n),n.tag=1,ge(r)?(e=!0,Xr(n)):e=!1,et(n,t),Yu(n,r,o),Fa(n,r,o,t),Ra(null,n,r,!0,e,t);case 19:return rc(e,n,t);case 22:return Zu(e,n,t)}throw Error(k(156,n.tag))};function xc(e,n){return Qs(e,n)}function dy(e,n,t,r){this.tag=e,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function je(e,n,t,r){return new dy(e,n,t,r)}function Al(e){return e=e.prototype,!(!e||!e.isReactComponent)}function fy(e){if(typeof e=="function")return Al(e)?1:0;if(e!=null){if(e=e.$$typeof,e===al)return 11;if(e===ll)return 14}return 2}function gn(e,n){var t=e.alternate;return t===null?(t=je(e.tag,n,e.key,e.mode),t.elementType=e.elementType,t.type=e.type,t.stateNode=e.stateNode,t.alternate=e,e.alternate=t):(t.pendingProps=n,t.type=e.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=e.flags&14680064,t.childLanes=e.childLanes,t.lanes=e.lanes,t.child=e.child,t.memoizedProps=e.memoizedProps,t.memoizedState=e.memoizedState,t.updateQueue=e.updateQueue,n=e.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},t.sibling=e.sibling,t.index=e.index,t.ref=e.ref,t}function Rr(e,n,t,r,o,a){var l=2;if(r=e,typeof e=="function")Al(e)&&(l=1);else if(typeof e=="string")l=5;else e:switch(e){case Dn:return Nn(t.children,o,a,n);case ol:l=8,o|=8;break;case aa:return e=je(12,t,n,o|2),e.elementType=aa,e.lanes=a,e;case la:return e=je(13,t,n,o),e.elementType=la,e.lanes=a,e;case ia:return e=je(19,t,n,o),e.elementType=ia,e.lanes=a,e;case Ns:return So(t,o,a,n);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Es:l=10;break e;case $s:l=9;break e;case al:l=11;break e;case ll:l=14;break e;case nn:l=16,r=null;break e}throw Error(k(130,e==null?e:typeof e,""))}return n=je(l,t,n,o),n.elementType=e,n.type=r,n.lanes=a,n}function Nn(e,n,t,r){return e=je(7,e,r,n),e.lanes=t,e}function So(e,n,t,r){return e=je(22,e,r,n),e.elementType=Ns,e.lanes=t,e.stateNode={isHidden:!1},e}function na(e,n,t){return e=je(6,e,null,n),e.lanes=t,e}function ta(e,n,t){return n=je(4,e.children!==null?e.children:[],e.key,n),n.lanes=t,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}function py(e,n,t,r,o){this.tag=n,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Io(0),this.expirationTimes=Io(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Io(0),this.identifierPrefix=r,this.onRecoverableError=o,this.mutableSourceEagerHydrationData=null}function Bl(e,n,t,r,o,a,l,i,s){return e=new py(e,n,t,i,s),n===1?(n=1,a===!0&&(n|=8)):n=0,a=je(3,null,null,n),e.current=a,a.stateNode=e,a.memoizedState={element:r,isDehydrated:t,cache:null,transitions:null,pendingSuspenseBoundaries:null},_l(a),e}function hy(e,n,t){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Rn,key:r==null?null:""+r,children:e,containerInfo:n,implementation:t}}function wc(e){if(!e)return yn;e=e._reactInternals;e:{if(In(e)!==e||e.tag!==1)throw Error(k(170));var n=e;do{switch(n.tag){case 3:n=n.stateNode.context;break e;case 1:if(ge(n.type)){n=n.stateNode.__reactInternalMemoizedMergedChildContext;break e}}n=n.return}while(n!==null);throw Error(k(171))}if(e.tag===1){var t=e.type;if(ge(t))return wu(e,t,n)}return n}function bc(e,n,t,r,o,a,l,i,s){return e=Bl(t,r,!0,e,o,a,l,i,s),e.context=wc(null),t=e.current,r=se(),o=hn(t),a=Ke(r,o),a.callback=n??null,fn(t,a,o),e.current.lanes=o,tr(e,o,r),me(e,r),e}function _o(e,n,t,r){var o=n.current,a=se(),l=hn(o);return t=wc(t),n.context===null?n.context=t:n.pendingContext=t,n=Ke(a,l),n.payload={element:e},r=r===void 0?null:r,r!==null&&(n.callback=r),e=fn(o,n,l),e!==null&&(Ie(e,o,l,a),zr(e,o,l)),l}function uo(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function os(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var t=e.retryLane;e.retryLane=t!==0&&t<n?t:n}}function Ul(e,n){os(e,n),(e=e.alternate)&&os(e,n)}function gy(){return null}var kc=typeof reportError=="function"?reportError:function(e){console.error(e)};function Wl(e){this._internalRoot=e}Co.prototype.render=Wl.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(k(409));_o(e,n,null,null)};Co.prototype.unmount=Wl.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;On(function(){_o(null,e,null,null)}),n[Xe]=null}};function Co(e){this._internalRoot=e}Co.prototype.unstable_scheduleHydration=function(e){if(e){var n=Zs();e={blockedOn:null,target:e,priority:n};for(var t=0;t<rn.length&&n!==0&&n<rn[t].priority;t++);rn.splice(t,0,e),t===0&&nu(e)}};function Hl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function jo(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function as(){}function my(e,n,t,r,o){if(o){if(typeof r=="function"){var a=r;r=function(){var u=uo(l);a.call(u)}}var l=bc(n,r,e,0,null,!1,!1,"",as);return e._reactRootContainer=l,e[Xe]=l.current,Vt(e.nodeType===8?e.parentNode:e),On(),l}for(;o=e.lastChild;)e.removeChild(o);if(typeof r=="function"){var i=r;r=function(){var u=uo(s);i.call(u)}}var s=Bl(e,0,!1,null,null,!1,!1,"",as);return e._reactRootContainer=s,e[Xe]=s.current,Vt(e.nodeType===8?e.parentNode:e),On(function(){_o(n,s,t,r)}),s}function Eo(e,n,t,r,o){var a=t._reactRootContainer;if(a){var l=a;if(typeof o=="function"){var i=o;o=function(){var s=uo(l);i.call(s)}}_o(n,l,e,o)}else l=my(t,n,e,o,r);return uo(l)}qs=function(e){switch(e.tag){case 3:var n=e.stateNode;if(n.current.memoizedState.isDehydrated){var t=jt(n.pendingLanes);t!==0&&(ul(n,t|1),me(n,G()),!(O&6)&&(st=G()+500,wn()))}break;case 13:On(function(){var r=qe(e,1);if(r!==null){var o=se();Ie(r,e,1,o)}}),Ul(e,1)}};cl=function(e){if(e.tag===13){var n=qe(e,134217728);if(n!==null){var t=se();Ie(n,e,134217728,t)}Ul(e,134217728)}};Js=function(e){if(e.tag===13){var n=hn(e),t=qe(e,n);if(t!==null){var r=se();Ie(t,e,n,r)}Ul(e,n)}};Zs=function(){return F};eu=function(e,n){var t=F;try{return F=e,n()}finally{F=t}};ya=function(e,n,t){switch(n){case"input":if(ca(e,t),n=t.name,t.type==="radio"&&n!=null){for(t=e;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll("input[name="+JSON.stringify(""+n)+'][type="radio"]'),n=0;n<t.length;n++){var r=t[n];if(r!==e&&r.form===e.form){var o=yo(r);if(!o)throw Error(k(90));Ps(r),ca(r,o)}}}break;case"textarea":Ms(e,t);break;case"select":n=t.value,n!=null&&Xn(e,!!t.multiple,n,!1)}};As=Ll;Bs=On;var yy={usingClientEntryPoint:!1,Events:[or,Wn,yo,Rs,Ds,Ll]},St={findFiberByHostInstance:Cn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},vy={bundleType:St.bundleType,version:St.version,rendererPackageName:St.rendererPackageName,rendererConfig:St.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Ze.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Hs(e),e===null?null:e.stateNode},findFiberByHostInstance:St.findFiberByHostInstance||gy,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Cr=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Cr.isDisabled&&Cr.supportsFiber)try{po=Cr.inject(vy),Be=Cr}catch{}}ke.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=yy;ke.createPortal=function(e,n){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Hl(n))throw Error(k(200));return hy(e,n,null,t)};ke.createRoot=function(e,n){if(!Hl(e))throw Error(k(299));var t=!1,r="",o=kc;return n!=null&&(n.unstable_strictMode===!0&&(t=!0),n.identifierPrefix!==void 0&&(r=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),n=Bl(e,1,!1,null,null,t,!1,r,o),e[Xe]=n.current,Vt(e.nodeType===8?e.parentNode:e),new Wl(n)};ke.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(k(188)):(e=Object.keys(e).join(","),Error(k(268,e)));return e=Hs(n),e=e===null?null:e.stateNode,e};ke.flushSync=function(e){return On(e)};ke.hydrate=function(e,n,t){if(!jo(n))throw Error(k(200));return Eo(null,e,n,!0,t)};ke.hydrateRoot=function(e,n,t){if(!Hl(e))throw Error(k(405));var r=t!=null&&t.hydratedSources||null,o=!1,a="",l=kc;if(t!=null&&(t.unstable_strictMode===!0&&(o=!0),t.identifierPrefix!==void 0&&(a=t.identifierPrefix),t.onRecoverableError!==void 0&&(l=t.onRecoverableError)),n=bc(n,null,e,1,t??null,o,!1,a,l),e[Xe]=n.current,Vt(e),r)for(e=0;e<r.length;e++)t=r[e],o=t._getVersion,o=o(t._source),n.mutableSourceEagerHydrationData==null?n.mutableSourceEagerHydrationData=[t,o]:n.mutableSourceEagerHydrationData.push(t,o);return new Co(n)};ke.render=function(e,n,t){if(!jo(n))throw Error(k(200));return Eo(null,e,n,!1,t)};ke.unmountComponentAtNode=function(e){if(!jo(e))throw Error(k(40));return e._reactRootContainer?(On(function(){Eo(null,null,e,!1,function(){e._reactRootContainer=null,e[Xe]=null})}),!0):!1};ke.unstable_batchedUpdates=Ll;ke.unstable_renderSubtreeIntoContainer=function(e,n,t,r){if(!jo(t))throw Error(k(200));if(e==null||e._reactInternals===void 0)throw Error(k(38));return Eo(e,n,t,!1,r)};ke.version="18.3.1-next-f1338f8080-20240426";function Sc(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Sc)}catch(e){console.error(e)}}Sc(),Ss.exports=ke;var xy=Ss.exports,_c,ls=xy;_c=ls.createRoot,ls.hydrateRoot;const wy=["title","section","two-column","feature-grid","data-table","stat-row","timeline","quote","closing","image-hero","comparison"],Xa={title:"Title",section:"Section divider","two-column":"Two column","feature-grid":"Feature grid","data-table":"Data table","stat-row":"Stat row",timeline:"Timeline",quote:"Quote",closing:"Closing","image-hero":"Image hero",comparison:"Comparison"};function by(e){switch(e){case"title":return{layout:e,eyebrow:"Eyebrow",heading:"Title slide",lead:"Supporting line."};case"section":return{layout:e,number:"01",eyebrow:"Part",heading:"Section title",lead:""};case"two-column":return{layout:e,heading:"Heading",body:"Left column body text.",image:"",imageAlt:"Image"};case"image-hero":return{layout:e,eyebrow:"Story",heading:"Hero moment",lead:"Caption over a full-bleed image.",image:"",imageAlt:"Hero image"};case"comparison":return{layout:e,heading:"Before vs after",leftLabel:"Before",left:"The old way — slow, manual, error-prone.",rightLabel:"After",right:"The new way — automated, fast, reliable."};case"feature-grid":return{layout:e,heading:"Feature grid",columns:3,cards:[{title:"One",body:"First point."},{title:"Two",body:"Second point."},{title:"Three",body:"Third point."}]};case"data-table":return{layout:e,heading:"Table",columns:["Column A","Column B"],rows:[["a1","b1"],["a2","b2"]]};case"stat-row":return{layout:e,heading:"Stats",stats:[{value:"100%",label:"Metric"},{value:"2x",label:"Metric"}]};case"timeline":return{layout:e,heading:"Timeline",steps:[{title:"Step one",body:"Detail."},{title:"Step two",body:"Detail."}]};case"quote":return{layout:e,quote:"A memorable quote.",by:"Attribution"};case"closing":return{layout:e,eyebrow:"Thanks",heading:"Closing",lead:"Call to action.",cta:{label:"Get started",href:"https://example.com"}};default:return{layout:e,heading:"Slide"}}}const Cc={type:"deck",meta:{title:"Acme Q3",company:"Acme",theme:"claude"},slides:[{layout:"title",eyebrow:"Q3 2026",heading:"Acme All-Hands",lead:"Momentum, metrics, and what's next."},{layout:"section",number:"01",eyebrow:"Part one",heading:"Where we are"},{layout:"feature-grid",heading:"Three pillars",columns:3,cards:[{icon:"fa-solid fa-bolt",title:"Speed",body:"Ship 3x faster."},{title:"Safety",body:"SOC2 in progress."},{title:"Simplicity",body:"One command."}]},{layout:"stat-row",heading:"By the numbers",stats:[{value:"98%",label:"Uptime"},{value:"$1.2M",label:"ARR"},{value:"3.1x",label:"YoY"}]},{layout:"data-table",heading:"Pipeline",columns:["Stage","Count","Value"],rows:[["Lead","120","$600k"],["POC","34","$340k"],["Closed","12","$210k"]]},{layout:"timeline",heading:"Roadmap",steps:[{title:"Now",body:"PPTX export."},{title:"Next",body:"Studio editor."},{title:"Later",body:"Templates."}]},{layout:"quote",quote:"Make it work, make it right, make it fast.",by:"Kent Beck"},{layout:"closing",heading:"Thank you",lead:"Questions?",cta:{label:"Get started",href:"https://acme.com"}}]},jc="claude",Ec="0.1.0",$c="Anthropic / Claude-inspired theme: warm cream paper, clay-coral accent, grotesk + editorial-serif pairing.",Nc="Warm, human, editorial, high-craft, calm — cream paper, soft clay-coral signal, Styrene-style grotesk headings over a Tiempos-style serif body. Restrained, trustworthy, not corporate.",Tc="MIT",Pc="Timur Isachenko",zc={bg:"#faf9f5",bg2:"#f4f3ee",text:"#141413",muted:"#73706a",accent:"#d97757",accent2:"#6a9bcc",cardBg:"#ffffff",border:"#e8e6dc"},Mc={headingFont:"'Space Grotesk', system-ui, sans-serif",bodyFont:"'Lora', Georgia, 'Times New Roman', serif",headingWeight:600,googleFonts:["Space+Grotesk:wght@500;600;700","Lora:wght@400;500;600"]},Oc={radius:"12px",slideWidth:"1280px"},ky={name:jc,version:Ec,extends:"default-tech",description:$c,vibe:Nc,license:Tc,author:Pc,roles:zc,typography:Mc,geometry:Oc},Sy=Object.freeze(Object.defineProperty({__proto__:null,author:Pc,default:ky,description:$c,geometry:Oc,license:Tc,name:jc,roles:zc,typography:Mc,version:Ec,vibe:Nc},Symbol.toStringTag,{value:"Module"})),Fc="default-tech",Ic="0.1.0",Lc="Edgy tech-startup default: dark canvas, violet + cyan accents, bold geometric sans.",Rc="Edgy tech startup — dark, confident, neon-accented.",Dc="MIT",Ac="Timur Isachenko",Bc={bg:"#0e0e12",bg2:"#16161d",text:"#f4f4f5",muted:"#a1a1aa",accent:"#7c3aed",accent2:"#22d3ee",cardBg:"rgba(255,255,255,0.04)",border:"rgba(255,255,255,0.08)"},Uc={headingFont:"'Montserrat', system-ui, sans-serif",bodyFont:"'Open Sans', system-ui, sans-serif",headingWeight:800,googleFonts:["Montserrat:wght@700;800","Open+Sans:wght@400;600"]},Wc={radius:"18px",slideWidth:"1280px"},_y={name:Fc,version:Ic,description:Lc,vibe:Rc,license:Dc,author:Ac,roles:Bc,typography:Uc,geometry:Wc},Cy=Object.freeze(Object.defineProperty({__proto__:null,author:Ac,default:_y,description:Lc,geometry:Wc,license:Dc,name:Fc,roles:Bc,typography:Uc,version:Ic,vibe:Rc},Symbol.toStringTag,{value:"Module"})),Hc="aerospace-hud",Vc="0.1.0",Qc="Aerospace HUD — deep navy, cyan instruments, warning orange, blueprint grid.",Gc="Aerospace HUD — navy cockpit, cyan instruments, warning orange, Barlow Condensed (matches Axiom gallery).",Kc="MIT",Yc="Timur Isachenko",Xc={bg:"#0a1d3a",bg2:"#0d2347",text:"#f0f8ff",muted:"#2a7aaa",accent:"#5ec8ff",accent2:"#ff7a18",cardBg:"rgba(94,200,255,0.08)",border:"rgba(94,200,255,0.28)"},qc={headingFont:"'Barlow Condensed', system-ui, sans-serif",bodyFont:"'Barlow', system-ui, sans-serif",headingWeight:700,googleFonts:["Barlow+Condensed:wght@600;700","Barlow:wght@400;600","IBM+Plex+Mono:wght@500"]},Jc={radius:"4px",slideWidth:"1280px"},jy={name:Hc,version:Vc,extends:"default-tech",description:Qc,vibe:Gc,license:Kc,author:Yc,roles:Xc,typography:qc,geometry:Jc},Ey=Object.freeze(Object.defineProperty({__proto__:null,author:Yc,default:jy,description:Qc,geometry:Jc,license:Kc,name:Hc,roles:Xc,typography:qc,version:Vc,vibe:Gc},Symbol.toStringTag,{value:"Module"})),Zc="art-deco",ed="0.1.0",nd="Art Deco investor — deep emerald, gold leaf, Cinzel display.",td="Art Deco — #0c2a24 emerald, gold #c8a24a, Cinzel (matches Meridian Club gallery).",rd="MIT",od="Timur Isachenko",ad={bg:"#0c2a24",bg2:"#113530",text:"#f5eed8",muted:"#c9bfa0",accent:"#c8a24a",accent2:"#e2c47a",cardBg:"rgba(200,162,74,0.08)",border:"rgba(200,162,74,0.35)"},ld={headingFont:"'Cinzel', Georgia, serif",bodyFont:"'Cormorant Garamond', Georgia, serif",headingWeight:600,googleFonts:["Cinzel:wght@500;600;700","Cormorant+Garamond:wght@400;600"]},id={radius:"0px",slideWidth:"1280px"},$y={name:Zc,version:ed,extends:"default-tech",description:nd,vibe:td,license:rd,author:od,roles:ad,typography:ld,geometry:id},Ny=Object.freeze(Object.defineProperty({__proto__:null,author:od,default:$y,description:nd,geometry:id,license:rd,name:Zc,roles:ad,typography:ld,version:ed,vibe:td},Symbol.toStringTag,{value:"Module"})),sd="aurora-glass",ud="0.1.0",cd="Dark aurora glassmorphism — void canvas, frosted cards, violet + cyan glow.",dd="Aurora glass — pure black void, Syne + Inter, violet #a78bfa + cyan #67e8f9 (matches NovaSpark gallery).",fd="MIT",pd="Timur Isachenko",hd={bg:"#000000",bg2:"#0a0612",text:"#ffffff",muted:"#a5a0b8",accent:"#a78bfa",accent2:"#67e8f9",cardBg:"rgba(255,255,255,0.06)",border:"rgba(255,255,255,0.12)"},gd={headingFont:"'Syne', system-ui, sans-serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:800,googleFonts:["Syne:wght@700;800","Inter:wght@400;600"]},md={radius:"16px",slideWidth:"1280px"},Ty={name:sd,version:ud,extends:"default-tech",description:cd,vibe:dd,license:fd,author:pd,roles:hd,typography:gd,geometry:md},Py=Object.freeze(Object.defineProperty({__proto__:null,author:pd,default:Ty,description:cd,geometry:md,license:fd,name:sd,roles:hd,typography:gd,version:ud,vibe:dd},Symbol.toStringTag,{value:"Module"})),yd="bauhaus",vd="0.1.0",xd="Bauhaus primary system — cream field, red/yellow/blue geometry, bold grotesk.",wd="Bauhaus — warm cream #f4f1ea, primary red #e63946 + blue #1f4ae0 (matches Primary gallery).",bd="MIT",kd="Timur Isachenko",Sd={bg:"#f4f1ea",bg2:"#ede9e0",text:"#0d0d0d",muted:"#6a655c",accent:"#e63946",accent2:"#1f4ae0",cardBg:"rgba(0,0,0,0.04)",border:"rgba(13,13,13,0.2)"},_d={headingFont:"'Archivo', system-ui, sans-serif",bodyFont:"'Space Grotesk', system-ui, sans-serif",headingWeight:800,googleFonts:["Archivo:wght@600;800","Space+Grotesk:wght@400;600"]},Cd={radius:"0px",slideWidth:"1280px"},zy={name:yd,version:vd,extends:"default-tech",description:xd,vibe:wd,license:bd,author:kd,roles:Sd,typography:_d,geometry:Cd},My=Object.freeze(Object.defineProperty({__proto__:null,author:kd,default:zy,description:xd,geometry:Cd,license:bd,name:yd,roles:Sd,typography:_d,version:vd,vibe:wd},Symbol.toStringTag,{value:"Module"})),jd="blueprint",Ed="0.1.0",$d="Engineering blueprint — deep navy, cyan lines, Space Mono / Space Grotesk.",Nd="Blueprint — #0a1f3d navy, cyan #00e5ff grid (matches Apsis Mission gallery).",Td="MIT",Pd="Timur Isachenko",zd={bg:"#0a1f3d",bg2:"#0d2548",text:"#e8f4ff",muted:"#7aa8c8",accent:"#00e5ff",accent2:"#ffffff",cardBg:"rgba(0,229,255,0.06)",border:"rgba(0,229,255,0.28)"},Md={headingFont:"'Space Grotesk', system-ui, sans-serif",bodyFont:"'Space Mono', monospace",headingWeight:700,googleFonts:["Space+Grotesk:wght@500;700","Space+Mono:wght@400;700","IBM+Plex+Mono:wght@500"]},Od={radius:"2px",slideWidth:"1280px"},Oy={name:jd,version:Ed,extends:"default-tech",description:$d,vibe:Nd,license:Td,author:Pd,roles:zd,typography:Md,geometry:Od},Fy=Object.freeze(Object.defineProperty({__proto__:null,author:Pd,default:Oy,description:$d,geometry:Od,license:Td,name:jd,roles:zd,typography:Md,version:Ed,vibe:Nd},Symbol.toStringTag,{value:"Module"})),Fd="botanical-luxe",Id="0.1.0",Ld="Botanical luxe — deep forest green, gold leaf, serif elegance for impact reports.",Rd="Botanical luxe — forest #1d3a2f, gold #bfa55a, Cormorant + DM Sans (matches Verdant gallery).",Dd="MIT",Ad="Timur Isachenko",Bd={bg:"#1d3a2f",bg2:"#162d24",text:"#f3efe4",muted:"#6b9e7a",accent:"#bfa55a",accent2:"#4a7c59",cardBg:"rgba(191,165,90,0.08)",border:"rgba(191,165,90,0.28)"},Ud={headingFont:"'Cormorant Garamond', Georgia, serif",bodyFont:"'DM Sans', system-ui, sans-serif",headingWeight:600,googleFonts:["Cormorant+Garamond:wght@500;600;700","DM+Sans:wght@400;600"]},Wd={radius:"8px",slideWidth:"1280px"},Iy={name:Fd,version:Id,extends:"default-tech",description:Ld,vibe:Rd,license:Dd,author:Ad,roles:Bd,typography:Ud,geometry:Wd},Ly=Object.freeze(Object.defineProperty({__proto__:null,author:Ad,default:Iy,description:Ld,geometry:Wd,license:Dd,name:Fd,roles:Bd,typography:Ud,version:Id,vibe:Rd},Symbol.toStringTag,{value:"Module"})),Hd="brutalist-acid",Vd="0.1.0",Qd="Dark acid brutalist — near-black concrete, #d6ff00 hazard lime, hard mono edges.",Gd="Acid brutalist — #1c1c1c, electric lime, Space Mono + Barlow Condensed (matches MONOLITH gallery).",Kd="MIT",Yd="Timur Isachenko",Xd={bg:"#1c1c1c",bg2:"#2a2a2a",text:"#e8e6e1",muted:"#888888",accent:"#d6ff00",accent2:"#ffffff",cardBg:"rgba(214,255,0,0.06)",border:"rgba(214,255,0,0.35)"},qd={headingFont:"'Space Mono', monospace",bodyFont:"'Barlow Condensed', system-ui, sans-serif",headingWeight:700,googleFonts:["Space+Mono:wght@400;700","Barlow+Condensed:wght@500;700"]},Jd={radius:"0px",slideWidth:"1280px"},Ry={name:Hd,version:Vd,extends:"default-tech",description:Qd,vibe:Gd,license:Kd,author:Yd,roles:Xd,typography:qd,geometry:Jd},Dy=Object.freeze(Object.defineProperty({__proto__:null,author:Yd,default:Ry,description:Qd,geometry:Jd,license:Kd,name:Hd,roles:Xd,typography:qd,version:Vd,vibe:Gd},Symbol.toStringTag,{value:"Module"})),Zd="brutalist-mono",ef="0.1.0",nf="Raw brutalist theme with concrete-grey background, monospace type, hard square corners, and a single hazard-orange accent.",tf="Raw brutalist / technical — concrete off-white bg, near-black monospace ink, hazard-orange accent, thick black hairlines, zero radius.",rf="MIT",of="Timur Isachenko",af={bg:"#f0efe9",bg2:"#e3e1d8",text:"#0a0a0a",muted:"#57554c",accent:"#ff3600",accent2:"#0a0a0a",cardBg:"#ffffff",border:"rgba(10,10,10,0.85)"},lf={headingFont:"'IBM Plex Mono', 'Courier New', monospace",bodyFont:"'IBM Plex Mono', 'Courier New', monospace",headingWeight:700,googleFonts:["IBM+Plex+Mono:wght@400;600;700"]},sf={radius:"0px",slideWidth:"1280px"},Ay={name:Zd,version:ef,extends:"default-tech",description:nf,vibe:tf,license:rf,author:of,roles:af,typography:lf,geometry:sf},By=Object.freeze(Object.defineProperty({__proto__:null,author:of,default:Ay,description:nf,geometry:sf,license:rf,name:Zd,roles:af,typography:lf,version:ef,vibe:tf},Symbol.toStringTag,{value:"Module"})),uf="candy-pop",cf="0.1.0",df="Candy pop — cream canvas, hot pink + butter yellow, soft blobs, rounded type.",ff="Candy pop — cream canvas, hot pink + jellybean blue, Fredoka + Poppins (matches Jellybean gallery).",pf="MIT",hf="Timur Isachenko",gf={bg:"#fdf3e7",bg2:"#f7e8d4",text:"#1a1a2e",muted:"#7a6a80",accent:"#ff5d8f",accent2:"#2d7dd2",cardBg:"rgba(255,93,143,0.08)",border:"rgba(26,26,46,0.14)"},mf={headingFont:"'Fredoka', system-ui, sans-serif",bodyFont:"'Poppins', system-ui, sans-serif",headingWeight:700,googleFonts:["Fredoka:wght@500;700","Poppins:wght@400;600"]},yf={radius:"28px",slideWidth:"1280px"},Uy={name:uf,version:cf,extends:"default-tech",description:df,vibe:ff,license:pf,author:hf,roles:gf,typography:mf,geometry:yf},Wy=Object.freeze(Object.defineProperty({__proto__:null,author:hf,default:Uy,description:df,geometry:yf,license:pf,name:uf,roles:gf,typography:mf,version:cf,vibe:ff},Symbol.toStringTag,{value:"Module"})),vf="corporate",xf="0.1.0",wf="Formal corporate presentation theme with crisp white background and restrained navy/blue palette.",bf="Formal corporate — crisp white, navy text, single restrained blue accent, clean sans-serif, thin rules, minimal shadow.",kf="MIT",Sf="Timur Isachenko",_f={bg:"#ffffff",bg2:"#f8f9fc",text:"#1a2035",muted:"#6b7280",accent:"#1d4ed8",accent2:"#0369a1",cardBg:"#f1f5f9",border:"rgba(0,0,0,0.08)"},Cf={headingFont:"'Inter', system-ui, sans-serif",bodyFont:"'Source Sans 3', system-ui, sans-serif",headingWeight:700,googleFonts:["Inter:wght@400;700","Source+Sans+3:wght@400;600"]},jf={radius:"8px",slideWidth:"1280px"},Hy={name:vf,version:xf,extends:"default-tech",description:wf,vibe:bf,license:kf,author:Sf,roles:_f,typography:Cf,geometry:jf},Vy=Object.freeze(Object.defineProperty({__proto__:null,author:Sf,default:Hy,description:wf,geometry:jf,license:kf,name:vf,roles:_f,typography:Cf,version:xf,vibe:bf},Symbol.toStringTag,{value:"Module"})),Ef="crt-terminal",$f="0.1.0",Nf="CRT phosphor terminal — near-black, acid green glow, cyan accents, monospace.",Tf="CRT terminal — void bg, cream type, phosphor green + cyan accents (matches RetroNet gallery).",Pf="MIT",zf="Timur Isachenko",Mf={bg:"#06040a",bg2:"#1a1010",text:"#f5f0e8",muted:"#8a8578",accent:"#39ff14",accent2:"#00f5ff",cardBg:"rgba(57,255,20,0.06)",border:"rgba(57,255,20,0.28)"},Of={headingFont:"'VT323', monospace",bodyFont:"'Share Tech Mono', monospace",headingWeight:400,googleFonts:["VT323","Share+Tech+Mono","Courier+Prime"]},Ff={radius:"0px",slideWidth:"1280px"},Qy={name:Ef,version:$f,extends:"default-tech",description:Nf,vibe:Tf,license:Pf,author:zf,roles:Mf,typography:Of,geometry:Ff},Gy=Object.freeze(Object.defineProperty({__proto__:null,author:zf,default:Qy,description:Nf,geometry:Ff,license:Pf,name:Ef,roles:Mf,typography:Of,version:$f,vibe:Tf},Symbol.toStringTag,{value:"Module"})),If="data-editorial",Lf="0.1.0",Rf="Data editorial — white report field, navy + chart red, Source Serif + Inter.",Df="Data editorial — white/#1a1a1a, navy #2b6cb0 + signal #e63946 (matches Signalbox gallery).",Af="MIT",Bf="Timur Isachenko",Uf={bg:"#ffffff",bg2:"#f5f5f5",text:"#1a1a1a",muted:"#616161",accent:"#2b6cb0",accent2:"#e63946",cardBg:"rgba(26,26,26,0.03)",border:"rgba(26,26,26,0.12)"},Wf={headingFont:"'Source Serif 4', Georgia, serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:700,googleFonts:["Source+Serif+4:wght@600;700","Inter:wght@400;600"]},Hf={radius:"4px",slideWidth:"1280px"},Ky={name:If,version:Lf,extends:"default-tech",description:Rf,vibe:Df,license:Af,author:Bf,roles:Uf,typography:Wf,geometry:Hf},Yy=Object.freeze(Object.defineProperty({__proto__:null,author:Bf,default:Ky,description:Rf,geometry:Hf,license:Af,name:If,roles:Uf,typography:Wf,version:Lf,vibe:Df},Symbol.toStringTag,{value:"Module"})),Vf="developer-dark",Qf="0.1.0",Gf="Developer dark — GitHub-night canvas, green success, blue links, JetBrains Mono.",Kf="Developer dark — #0d1117, #3fb950 + #58a6ff, JetBrains Mono + Inter (matches Forge gallery).",Yf="MIT",Xf="Timur Isachenko",qf={bg:"#0d1117",bg2:"#161b22",text:"#e6edf3",muted:"#8b949e",accent:"#3fb950",accent2:"#58a6ff",cardBg:"rgba(48,54,61,0.55)",border:"rgba(48,54,61,0.9)"},Jf={headingFont:"'Inter', system-ui, sans-serif",bodyFont:"'JetBrains Mono', monospace",headingWeight:700,googleFonts:["Inter:wght@600;700","JetBrains+Mono:wght@400;600"]},Zf={radius:"8px",slideWidth:"1280px"},Xy={name:Vf,version:Qf,extends:"default-tech",description:Gf,vibe:Kf,license:Yf,author:Xf,roles:qf,typography:Jf,geometry:Zf},qy=Object.freeze(Object.defineProperty({__proto__:null,author:Xf,default:Xy,description:Gf,geometry:Zf,license:Yf,name:Vf,roles:qf,typography:Jf,version:Qf,vibe:Kf},Symbol.toStringTag,{value:"Module"})),ep="editorial-serif",np="0.1.0",tp="Magazine-editorial theme with warm paper background, ink-black serif text, and a single masthead-crimson accent.",rp="Print magazine editorial — warm cream paper, near-black serif ink, crimson masthead accent, thin hairline rules, square corners.",op="MIT",ap="Timur Isachenko",lp={bg:"#faf7f2",bg2:"#f2ede3",text:"#1c1a17",muted:"#5c574c",accent:"#9c1c1c",accent2:"#a67c1e",cardBg:"#f2ede3",border:"rgba(28,26,23,0.12)"},ip={headingFont:"'Playfair Display', Georgia, serif",bodyFont:"'Source Serif 4', Georgia, serif",headingWeight:700,googleFonts:["Playfair+Display:wght@700;900","Source+Serif+4:wght@400;600"]},sp={radius:"2px",slideWidth:"1280px"},Jy={name:ep,version:np,extends:"default-tech",description:tp,vibe:rp,license:op,author:ap,roles:lp,typography:ip,geometry:sp},Zy=Object.freeze(Object.defineProperty({__proto__:null,author:ap,default:Jy,description:tp,geometry:sp,license:op,name:ep,roles:lp,typography:ip,version:np,vibe:rp},Symbol.toStringTag,{value:"Module"})),up="fintech-clean",cp="0.1.0",dp="Fintech clean — near-white, Stripe-like violet accent, mint success, Inter.",fp="Fintech clean — #fbfbfd, violet #635bff + mint #00d4b1, Inter (matches Ledgerline gallery).",pp="MIT",hp="Timur Isachenko",gp={bg:"#fbfbfd",bg2:"#f0eeff",text:"#0a0a0a",muted:"#6b7280",accent:"#635bff",accent2:"#00d4b1",cardBg:"#ffffff",border:"rgba(99,91,255,0.18)"},mp={headingFont:"'Inter', system-ui, sans-serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:700,googleFonts:["Inter:wght@400;600;700"]},yp={radius:"12px",slideWidth:"1280px"},ev={name:up,version:cp,extends:"default-tech",description:dp,vibe:fp,license:pp,author:hp,roles:gp,typography:mp,geometry:yp},nv=Object.freeze(Object.defineProperty({__proto__:null,author:hp,default:ev,description:dp,geometry:yp,license:pp,name:up,roles:gp,typography:mp,version:cp,vibe:fp},Symbol.toStringTag,{value:"Module"})),vp="ft-editorial",xp="0.1.0",wp="Financial Times–inspired broadsheet — warm paper, ink, FT blue + signal red.",bp="FT editorial — #f7f5f0 newsprint, Libre Baskerville + IBM Plex, FT blue + signal red (matches Meridian gallery).",kp="MIT",Sp="Timur Isachenko",_p={bg:"#f7f5f0",bg2:"#f2efe8",text:"#0a0a0a",muted:"#6b6560",accent:"#1a4fd8",accent2:"#c0392b",cardBg:"rgba(10,10,10,0.03)",border:"rgba(10,10,10,0.12)"},Cp={headingFont:"'Libre Baskerville', Georgia, serif",bodyFont:"'IBM Plex Sans', system-ui, sans-serif",headingWeight:700,googleFonts:["Libre+Baskerville:wght@400;700","IBM+Plex+Sans:wght@400;600","IBM+Plex+Mono:wght@500"]},jp={radius:"0px",slideWidth:"1280px"},tv={name:vp,version:xp,extends:"default-tech",description:wp,vibe:bp,license:kp,author:Sp,roles:_p,typography:Cp,geometry:jp},rv=Object.freeze(Object.defineProperty({__proto__:null,author:Sp,default:tv,description:wp,geometry:jp,license:kp,name:vp,roles:_p,typography:Cp,version:xp,vibe:bp},Symbol.toStringTag,{value:"Module"})),Ep="genz-bento",$p="0.1.0",Np="Gen-Z hard-shadow bento — hot coral, lime stickers, chunky ink borders.",Tp="Gen-Z bento — #fff9f5, coral #ff4d2e + lime #b6f542, Nunito hard shadows (matches Bounce gallery).",Pp="MIT",zp="Timur Isachenko",Mp={bg:"#fff9f5",bg2:"#fff3ea",text:"#0f0f1a",muted:"#5c5666",accent:"#ff4d2e",accent2:"#b6f542",cardBg:"#ffffff",border:"#0f0f1a"},Op={headingFont:"'Nunito', system-ui, sans-serif",bodyFont:"'Nunito Sans', system-ui, sans-serif",headingWeight:900,googleFonts:["Nunito:wght@700;800;900","Nunito+Sans:wght@400;600"]},Fp={radius:"18px",slideWidth:"1280px"},ov={name:Ep,version:$p,extends:"default-tech",description:Np,vibe:Tp,license:Pp,author:zp,roles:Mp,typography:Op,geometry:Fp},av=Object.freeze(Object.defineProperty({__proto__:null,author:zp,default:ov,description:Np,geometry:Fp,license:Pp,name:Ep,roles:Mp,typography:Op,version:$p,vibe:Tp},Symbol.toStringTag,{value:"Module"})),Ip="heritage-editorial",Lp="0.1.0",Rp="Heritage editorial — warm parchment, terracotta blush, Playfair + Cormorant serif.",Dp="Heritage editorial — #f4efe9 parchment, terracotta #c98b7a, Playfair Display (matches Atelier No. 9 gallery).",Ap="MIT",Bp="Timur Isachenko",Up={bg:"#f4efe9",bg2:"#ede6dd",text:"#16130f",muted:"#9c8b7e",accent:"#c98b7a",accent2:"#a07854",cardBg:"rgba(22,19,15,0.04)",border:"rgba(22,19,15,0.12)"},Wp={headingFont:"'Playfair Display', Georgia, serif",bodyFont:"'DM Sans', system-ui, sans-serif",headingWeight:700,googleFonts:["Playfair+Display:wght@500;700","Cormorant+Garamond:wght@500;600","DM+Sans:wght@400;600"]},Hp={radius:"6px",slideWidth:"1280px"},lv={name:Ip,version:Lp,extends:"default-tech",description:Rp,vibe:Dp,license:Ap,author:Bp,roles:Up,typography:Wp,geometry:Hp},iv=Object.freeze(Object.defineProperty({__proto__:null,author:Bp,default:lv,description:Rp,geometry:Hp,license:Ap,name:Ip,roles:Up,typography:Wp,version:Lp,vibe:Dp},Symbol.toStringTag,{value:"Module"})),Vp="kinetic-wrapped",Qp="0.1.0",Gp="Kinetic Wrapped — acid lime on black, Archivo Black, year-in-review energy.",Kp="Kinetic Wrapped — black + #c8ff00 acid lime, Archivo Black (matches Pulse gallery).",Yp="MIT",Xp="Timur Isachenko",qp={bg:"#0a0a0a",bg2:"#0d0d0d",text:"#ffffff",muted:"#888888",accent:"#c8ff00",accent2:"#ff00cc",cardBg:"rgba(200,255,0,0.08)",border:"rgba(200,255,0,0.4)"},Jp={headingFont:"'Archivo Black', system-ui, sans-serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:400,googleFonts:["Archivo+Black","Inter:wght@400;600"]},Zp={radius:"0px",slideWidth:"1280px"},sv={name:Vp,version:Qp,extends:"default-tech",description:Gp,vibe:Kp,license:Yp,author:Xp,roles:qp,typography:Jp,geometry:Zp},uv=Object.freeze(Object.defineProperty({__proto__:null,author:Xp,default:sv,description:Gp,geometry:Zp,license:Yp,name:Vp,roles:qp,typography:Jp,version:Qp,vibe:Kp},Symbol.toStringTag,{value:"Module"})),eh="luxury-minimalist",nh="0.1.0",th="Luxury minimalist theme with warm off-white canvas, dark charcoal, hairline borders, and no gradients.",rh="Luxury minimalist — warm off-white canvas, dark charcoal text, near-zero decoration, generous whitespace, thin serif display, hairline borders, no gradients.",oh="MIT",ah="Timur Isachenko",lh={bg:"#faf8f5",bg2:"#f5f2ee",text:"#1c1917",muted:"#78716c",accent:"#92400e",accent2:"#b45309",cardBg:"rgba(28,25,23,0.03)",border:"rgba(28,25,23,0.10)"},ih={headingFont:"'Cormorant Garamond', Georgia, serif",bodyFont:"'DM Sans', system-ui, sans-serif",headingWeight:600,googleFonts:["Cormorant+Garamond:wght@400;600","DM+Sans:wght@400;500"]},sh={radius:"4px",slideWidth:"1280px"},cv={name:eh,version:nh,extends:"default-tech",description:th,vibe:rh,license:oh,author:ah,roles:lh,typography:ih,geometry:sh},dv=Object.freeze(Object.defineProperty({__proto__:null,author:ah,default:cv,description:th,geometry:sh,license:oh,name:eh,roles:lh,typography:ih,version:nh,vibe:rh},Symbol.toStringTag,{value:"Module"})),uh="neon-noir",ch="0.1.0",dh="Neon noir — wet asphalt night, hot magenta + electric cyan, cinematic rain.",fh="Neon noir — #050510 night, hot pink #ff2e97 + cyan #00e5ff, Orbitron (matches Neon District gallery).",ph="MIT",hh="Timur Isachenko",gh={bg:"#050510",bg2:"#0a0a1e",text:"#e8e4f0",muted:"#8884a8",accent:"#ff2e97",accent2:"#00e5ff",cardBg:"rgba(255,46,151,0.07)",border:"rgba(0,229,255,0.22)"},mh={headingFont:"'Orbitron', system-ui, sans-serif",bodyFont:"'Share Tech Mono', monospace",headingWeight:700,googleFonts:["Orbitron:wght@600;700","Share+Tech+Mono"]},yh={radius:"10px",slideWidth:"1280px"},fv={name:uh,version:ch,extends:"default-tech",description:dh,vibe:fh,license:ph,author:hh,roles:gh,typography:mh,geometry:yh},pv=Object.freeze(Object.defineProperty({__proto__:null,author:hh,default:fv,description:dh,geometry:yh,license:ph,name:uh,roles:gh,typography:mh,version:ch,vibe:fh},Symbol.toStringTag,{value:"Module"})),vh="pastel-dreamy",xh="0.1.0",wh="Soft pastel theme with lavender-blush background, deep plum text, and a blush/periwinkle accent pair.",bh="Soft pastel dreamy — lavender-blush bg, deep plum text for readability, blush-pink + periwinkle accent pair, generously rounded, gentle.",kh="MIT",Sh="Timur Isachenko",_h={bg:"#fdf6fb",bg2:"#f5ecf9",text:"#3a2e4d",muted:"#6b5d82",accent:"#e893c2",accent2:"#8ab4f8",cardBg:"#f5ecf9",border:"rgba(58,46,77,0.10)"},Ch={headingFont:"'Quicksand', system-ui, sans-serif",bodyFont:"'Mulish', system-ui, sans-serif",headingWeight:700,googleFonts:["Quicksand:wght@500;700","Mulish:wght@400;600"]},jh={radius:"28px",slideWidth:"1280px"},hv={name:vh,version:xh,extends:"default-tech",description:wh,vibe:bh,license:kh,author:Sh,roles:_h,typography:Ch,geometry:jh},gv=Object.freeze(Object.defineProperty({__proto__:null,author:Sh,default:hv,description:wh,geometry:jh,license:kh,name:vh,roles:_h,typography:Ch,version:xh,vibe:bh},Symbol.toStringTag,{value:"Module"})),Eh="playful",$h="0.1.0",Nh="Playful creative-agency theme with bold coral and lime accents, rounded corners, and sticker-style energy.",Th="Playful creative agency — bright warm white, bold coral + lime accent pair, rounded everything, big type, sticker-style shadows.",Ph="MIT",zh="Timur Isachenko",Mh={bg:"#fffbf0",bg2:"#fff9e6",text:"#1a1a2e",muted:"#6b6b8a",accent:"#ff4757",accent2:"#2ed573",cardBg:"rgba(255,71,87,0.06)",border:"rgba(255,71,87,0.15)"},Oh={headingFont:"'Nunito', system-ui, sans-serif",bodyFont:"'Nunito', system-ui, sans-serif",headingWeight:800,googleFonts:["Nunito:wght@400;700;800"]},Fh={radius:"24px",slideWidth:"1280px"},mv={name:Eh,version:$h,extends:"default-tech",description:Nh,vibe:Th,license:Ph,author:zh,roles:Mh,typography:Oh,geometry:Fh},yv=Object.freeze(Object.defineProperty({__proto__:null,author:zh,default:mv,description:Nh,geometry:Fh,license:Ph,name:Eh,roles:Mh,typography:Oh,version:$h,vibe:Th},Symbol.toStringTag,{value:"Module"})),Ih="retro-arcade",Lh="0.1.0",Rh="Retro 80s arcade theme with deep purple-black background, magenta and cyan neon accents, and pixel display fonts.",Dh="Retro 80s arcade — deep purple-black bg, magenta + electric cyan neon, glow text-shadow, pixel display font, scanline feel.",Ah="MIT",Bh="Timur Isachenko",Uh={bg:"#0d0015",bg2:"#150025",text:"#e0e0ff",muted:"#9090cc",accent:"#ff00ff",accent2:"#00ffff",cardBg:"rgba(255,0,255,0.08)",border:"rgba(0,255,255,0.20)"},Wh={headingFont:"'Orbitron', system-ui, sans-serif",bodyFont:"'Share Tech Mono', monospace",headingWeight:700,googleFonts:["Orbitron:wght@400;700","Share+Tech+Mono"]},Hh={radius:"0px",slideWidth:"1280px"},vv={name:Ih,version:Lh,extends:"default-tech",description:Rh,vibe:Dh,license:Ah,author:Bh,roles:Uh,typography:Wh,geometry:Hh},xv=Object.freeze(Object.defineProperty({__proto__:null,author:Bh,default:vv,description:Rh,geometry:Hh,license:Ah,name:Ih,roles:Uh,typography:Wh,version:Lh,vibe:Dh},Symbol.toStringTag,{value:"Module"})),Vh="risograph-zine",Qh="0.1.0",Gh="Risograph zine — warm paper, misregistered ink, magenta + teal print shop energy.",Kh="Risograph zine — kraft #f3ecdd, red #ff4f4f + blue #2b3aff overprint (matches Inkwell gallery).",Yh="MIT",Xh="Timur Isachenko",qh={bg:"#f3ecdd",bg2:"#e8dfc8",text:"#1a1209",muted:"#7a6a52",accent:"#ff4f4f",accent2:"#2b3aff",cardBg:"rgba(255,79,79,0.06)",border:"rgba(26,18,9,0.18)"},Jh={headingFont:"'Archivo Black', system-ui, sans-serif",bodyFont:"'Space Mono', monospace",headingWeight:400,googleFonts:["Archivo+Black","Space+Mono:wght@400;700"]},Zh={radius:"2px",slideWidth:"1280px"},wv={name:Vh,version:Qh,extends:"default-tech",description:Gh,vibe:Kh,license:Yh,author:Xh,roles:qh,typography:Jh,geometry:Zh},bv=Object.freeze(Object.defineProperty({__proto__:null,author:Xh,default:wv,description:Gh,geometry:Zh,license:Yh,name:Vh,roles:qh,typography:Jh,version:Qh,vibe:Kh},Symbol.toStringTag,{value:"Module"})),eg="scandinavian",ng="0.1.0",tg="Scandinavian hygge — warm linen, sage green, soft clay, Fraunces + Work Sans.",rg="Scandinavian — #efe9df linen, sage #9caf88 + clay #c9826b (matches Hygge gallery).",og="MIT",ag="Timur Isachenko",lg={bg:"#efe9df",bg2:"#e6ddd1",text:"#2b2926",muted:"#7a7470",accent:"#9caf88",accent2:"#c9826b",cardBg:"rgba(43,41,38,0.04)",border:"rgba(43,41,38,0.1)"},ig={headingFont:"'Fraunces', Georgia, serif",bodyFont:"'Work Sans', system-ui, sans-serif",headingWeight:600,googleFonts:["Fraunces:wght@500;600;700","Work+Sans:wght@400;600"]},sg={radius:"16px",slideWidth:"1280px"},kv={name:eg,version:ng,extends:"default-tech",description:tg,vibe:rg,license:og,author:ag,roles:lg,typography:ig,geometry:sg},Sv=Object.freeze(Object.defineProperty({__proto__:null,author:ag,default:kv,description:tg,geometry:sg,license:og,name:eg,roles:lg,typography:ig,version:ng,vibe:rg},Symbol.toStringTag,{value:"Module"})),ug="swiss-typographic",cg="0.1.0",dg="Swiss International Typographic Style — white grid, signal red, Helvetica-like grotesk.",fg="Swiss typographic — pure white, Inter grotesk, signal red, zero radius, modular grid (matches Grid Systems gallery).",pg="MIT",hg="Timur Isachenko",gg={bg:"#ffffff",bg2:"#f5f5f5",text:"#0a0a0a",muted:"#636363",accent:"#e2231a",accent2:"#0a0a0a",cardBg:"rgba(0,0,0,0.03)",border:"rgba(0,0,0,0.12)"},mg={headingFont:"'Inter', Helvetica, Arial, sans-serif",bodyFont:"'Inter', Helvetica, Arial, sans-serif",headingWeight:800,googleFonts:["Inter:wght@400;600;800"]},yg={radius:"0px",slideWidth:"1280px"},_v={name:ug,version:cg,extends:"default-tech",description:dg,vibe:fg,license:pg,author:hg,roles:gg,typography:mg,geometry:yg},Cv=Object.freeze(Object.defineProperty({__proto__:null,author:hg,default:_v,description:dg,geometry:yg,license:pg,name:ug,roles:gg,typography:mg,version:cg,vibe:fg},Symbol.toStringTag,{value:"Module"})),vg="vaporwave",xg="0.1.0",wg="Vaporwave — purple dusk, sunset gradient, chrome teal, nostalgic mall energy.",bg="Vaporwave — #1a0533 dusk, #ff6ad5 pink + #5ce1ff teal, Monoton (matches Mallsoft gallery).",kg="MIT",Sg="Timur Isachenko",_g={bg:"#1a0533",bg2:"#2d1060",text:"#fff0f9",muted:"#c4a8ff",accent:"#ff6ad5",accent2:"#5ce1ff",cardBg:"rgba(255,106,213,0.08)",border:"rgba(92,225,255,0.28)"},Cg={headingFont:"'Monoton', display, cursive",bodyFont:"'Space Mono', monospace",headingWeight:400,googleFonts:["Monoton","Space+Mono:wght@400;700","VT323"]},jg={radius:"6px",slideWidth:"1280px"},jv={name:vg,version:xg,extends:"default-tech",description:wg,vibe:bg,license:kg,author:Sg,roles:_g,typography:Cg,geometry:jg},Ev=Object.freeze(Object.defineProperty({__proto__:null,author:Sg,default:jv,description:wg,geometry:jg,license:kg,name:vg,roles:_g,typography:Cg,version:xg,vibe:bg},Symbol.toStringTag,{value:"Module"})),Eg="y2k-aero",$g="0.1.0",Ng="Y2K aero — icy gradients, chrome cyan, soft bubbles, futuristic optimism.",Tg="Y2K aero — icy #e0f7ff, sky #38bdf8 + lime #a3e635, Nunito (matches BubbleFlow gallery).",Pg="MIT",zg="Timur Isachenko",Mg={bg:"#e0f7ff",bg2:"#bae6fd",text:"#0c4a6e",muted:"#0369a1",accent:"#38bdf8",accent2:"#a3e635",cardBg:"rgba(255,255,255,0.72)",border:"rgba(14,165,233,0.28)"},Og={headingFont:"'Nunito', system-ui, sans-serif",bodyFont:"'Nunito Sans', system-ui, sans-serif",headingWeight:800,googleFonts:["Nunito:wght@700;800","Nunito+Sans:wght@400;600"]},Fg={radius:"32px",slideWidth:"1280px"},$v={name:Eg,version:$g,extends:"default-tech",description:Ng,vibe:Tg,license:Pg,author:zg,roles:Mg,typography:Og,geometry:Fg},Nv=Object.freeze(Object.defineProperty({__proto__:null,author:zg,default:$v,description:Ng,geometry:Fg,license:Pg,name:Eg,roles:Mg,typography:Og,version:$g,vibe:Tg},Symbol.toStringTag,{value:"Module"})),Tv={bg:"#0e0e12",bg2:"#16161d",text:"#f4f4f5",muted:"#a1a1aa",accent:"#7c3aed",accent2:"#22d3ee",cardBg:"rgba(255,255,255,0.04)",border:"rgba(255,255,255,0.08)"},Pv={headingFont:"'Montserrat', system-ui, sans-serif",bodyFont:"'Open Sans', system-ui, sans-serif",headingWeight:800,googleFonts:["Montserrat:wght@700;800","Open+Sans:wght@400;600"]},zv={radius:"18px",slideWidth:"1280px"},Mv={...Object.assign({"../../../core/themes/claude/theme.json":Sy,"../../../core/themes/default-tech/theme.json":Cy}),...Object.assign({"../../../themes/aerospace-hud/theme.json":Ey,"../../../themes/art-deco/theme.json":Ny,"../../../themes/aurora-glass/theme.json":Py,"../../../themes/bauhaus/theme.json":My,"../../../themes/blueprint/theme.json":Fy,"../../../themes/botanical-luxe/theme.json":Ly,"../../../themes/brutalist-acid/theme.json":Dy,"../../../themes/brutalist-mono/theme.json":By,"../../../themes/candy-pop/theme.json":Wy,"../../../themes/corporate/theme.json":Vy,"../../../themes/crt-terminal/theme.json":Gy,"../../../themes/data-editorial/theme.json":Yy,"../../../themes/developer-dark/theme.json":qy,"../../../themes/editorial-serif/theme.json":Zy,"../../../themes/fintech-clean/theme.json":nv,"../../../themes/ft-editorial/theme.json":rv,"../../../themes/genz-bento/theme.json":av,"../../../themes/heritage-editorial/theme.json":iv,"../../../themes/kinetic-wrapped/theme.json":uv,"../../../themes/luxury-minimalist/theme.json":dv,"../../../themes/neon-noir/theme.json":pv,"../../../themes/pastel-dreamy/theme.json":gv,"../../../themes/playful/theme.json":yv,"../../../themes/retro-arcade/theme.json":xv,"../../../themes/risograph-zine/theme.json":bv,"../../../themes/scandinavian/theme.json":Sv,"../../../themes/swiss-typographic/theme.json":Cv,"../../../themes/vaporwave/theme.json":Ev,"../../../themes/y2k-aero/theme.json":Nv})},co=new Map;for(const e of Object.values(Mv)){const n="default"in e?e.default:e;n!=null&&n.name&&co.set(n.name,n)}function Ig(){return[...co.keys()].sort()}function Vl(e){const n=[];let t=co.has(e)?e:"default-tech";const r=new Set;for(;t&&!r.has(t);){r.add(t);const s=co.get(t);if(!s)break;n.unshift(s),t=s.extends}const o={...Tv},a={...Pv},l={...zv};for(const s of n)Object.assign(o,s.roles??{}),Object.assign(a,s.typography??{}),Object.assign(l,s.geometry??{});const i=n[n.length-1]??{name:"default-tech",version:"0.0.0"};return{name:i.name,version:i.version,manifest:i,palette:o,typography:a,geometry:l}}const Ov=`<section class="slide title-slide closing-slide">
  {{#eyebrow}}<span class="eyebrow">{{eyebrow}}</span>{{/eyebrow}}
  <h1>{{heading}}</h1>
  {{#lead}}<p class="lead">{{lead}}</p>{{/lead}}
  {{#cta}}<a class="btn" href="{{href}}"><i class="fa-solid fa-arrow-right"></i> {{label}}</a>{{/cta}}
</section>
`,Fv=`<section class="slide comparison-slide">
  {{#eyebrow}}<span class="eyebrow">{{eyebrow}}</span>{{/eyebrow}}
  {{#heading}}<h2>{{heading}}</h2>{{/heading}}
  <div class="comparison-cols">
    <div class="comparison-col">
      {{#leftLabel}}<span class="comparison-label">{{leftLabel}}</span>{{/leftLabel}}
      <p>{{left}}</p>
    </div>
    <div class="comparison-vs" aria-hidden="true">vs</div>
    <div class="comparison-col">
      {{#rightLabel}}<span class="comparison-label">{{rightLabel}}</span>{{/rightLabel}}
      <p>{{right}}</p>
    </div>
  </div>
</section>
`,Iv=`<section class="slide">
  {{#eyebrow}}<span class="eyebrow">{{eyebrow}}</span>{{/eyebrow}}
  {{#heading}}<h2>{{heading}}</h2>{{/heading}}
  <table>
    <thead>
      <tr>{{#columns}}<th>{{.}}</th>{{/columns}}</tr>
    </thead>
    <tbody>
      {{#rows}}
      <tr>{{#cells}}<td>{{.}}</td>{{/cells}}</tr>
      {{/rows}}
    </tbody>
  </table>
</section>
`,Lv=`<section class="slide">
  {{#eyebrow}}<span class="eyebrow">{{eyebrow}}</span>{{/eyebrow}}
  {{#heading}}<h2>{{heading}}</h2>{{/heading}}
  <div class="grid cols-{{columns}}">
    {{#cards}}
    <div class="card">
      {{#icon}}<i class="{{icon}}"></i>{{/icon}}
      <h3>{{title}}</h3>
      {{#body}}<p>{{body}}</p>{{/body}}
    </div>
    {{/cards}}
  </div>
</section>
`,Rv=`<section class="slide image-hero-slide">
  <div class="image-hero-bg">
    {{#image}}<img src="{{image}}" alt="{{imageAlt}}" />{{/image}}
    <div class="image-hero-scrim"></div>
  </div>
  <div class="image-hero-content">
    {{#eyebrow}}<span class="eyebrow">{{eyebrow}}</span>{{/eyebrow}}
    <h2>{{heading}}</h2>
    {{#lead}}<p class="lead">{{lead}}</p>{{/lead}}
  </div>
</section>
`,Dv=`<section class="slide quote-slide">
  <p class="quote">{{quote}}</p>
  {{#by}}<p class="quote-by">— {{by}}</p>{{/by}}
</section>
`,Av=`<section class="slide section-slide">
  {{#number}}<div class="section-number">{{number}}</div>{{/number}}
  <h2>{{heading}}</h2>
  {{#lead}}<p class="lead">{{lead}}</p>{{/lead}}
</section>
`,Bv=`<section class="slide">
  {{#eyebrow}}<span class="eyebrow">{{eyebrow}}</span>{{/eyebrow}}
  {{#heading}}<h2>{{heading}}</h2>{{/heading}}
  <div class="stats">
    {{#stats}}
    <div class="stat">
      <div class="value">{{value}}</div>
      <div class="label">{{label}}</div>
    </div>
    {{/stats}}
  </div>
</section>
`,Uv=`<section class="slide">
  {{#eyebrow}}<span class="eyebrow">{{eyebrow}}</span>{{/eyebrow}}
  {{#heading}}<h2>{{heading}}</h2>{{/heading}}
  <div class="timeline">
    {{#steps}}
    <div class="node">
      <div class="dot"></div>
      <h3>{{title}}</h3>
      {{#body}}<p>{{body}}</p>{{/body}}
    </div>
    {{/steps}}
  </div>
</section>
`,Wv=`<section class="slide title-slide">
  {{#eyebrow}}<span class="eyebrow">{{eyebrow}}</span>{{/eyebrow}}
  <h1>{{heading}}</h1>
  {{#lead}}<p class="lead">{{lead}}</p>{{/lead}}
</section>
`,Hv=`<section class="slide">
  <div class="cols">
    <div>
      {{#eyebrow}}<span class="eyebrow">{{eyebrow}}</span>{{/eyebrow}}
      <h2>{{heading}}</h2>
      {{#body}}<p class="lead">{{body}}</p>{{/body}}
    </div>
    {{#image}}<div class="media"><img src="{{image}}" alt="{{imageAlt}}" /></div>{{/image}}
  </div>
</section>
`;/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */var Vv=Object.prototype.toString,pt=Array.isArray||function(n){return Vv.call(n)==="[object Array]"};function Ql(e){return typeof e=="function"}function Qv(e){return pt(e)?"array":typeof e}function ra(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function is(e,n){return e!=null&&typeof e=="object"&&n in e}function Gv(e,n){return e!=null&&typeof e!="object"&&e.hasOwnProperty&&e.hasOwnProperty(n)}var Kv=RegExp.prototype.test;function Yv(e,n){return Kv.call(e,n)}var Xv=/\S/;function qv(e){return!Yv(Xv,e)}var Jv={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};function Zv(e){return String(e).replace(/[&<>"'`=\/]/g,function(t){return Jv[t]})}var e1=/\s*/,n1=/\s+/,ss=/\s*=/,t1=/\s*\}/,r1=/#|\^|\/|>|\{|&|=|!/;function o1(e,n){if(!e)return[];var t=!1,r=[],o=[],a=[],l=!1,i=!1,s="",u=0;function f(){if(l&&!i)for(;a.length;)delete o[a.pop()];else a=[];l=!1,i=!1}var h,m,v;function S(j){if(typeof j=="string"&&(j=j.split(n1,2)),!pt(j)||j.length!==2)throw new Error("Invalid tags: "+j);h=new RegExp(ra(j[0])+"\\s*"),m=new RegExp("\\s*"+ra(j[1])),v=new RegExp("\\s*"+ra("}"+j[1]))}S(n||ye.tags);for(var w=new lr(e),$,p,c,g,x,y;!w.eos();){if($=w.pos,c=w.scanUntil(h),c)for(var b=0,E=c.length;b<E;++b)g=c.charAt(b),qv(g)?(a.push(o.length),s+=g):(i=!0,t=!0,s+=" "),o.push(["text",g,$,$+1]),$+=1,g===`
`&&(f(),s="",u=0,t=!1);if(!w.scan(h))break;if(l=!0,p=w.scan(r1)||"name",w.scan(e1),p==="="?(c=w.scanUntil(ss),w.scan(ss),w.scanUntil(m)):p==="{"?(c=w.scanUntil(v),w.scan(t1),w.scanUntil(m),p="&"):c=w.scanUntil(m),!w.scan(m))throw new Error("Unclosed tag at "+w.pos);if(p==">"?x=[p,c,$,w.pos,s,u,t]:x=[p,c,$,w.pos],u++,o.push(x),p==="#"||p==="^")r.push(x);else if(p==="/"){if(y=r.pop(),!y)throw new Error('Unopened section "'+c+'" at '+$);if(y[1]!==c)throw new Error('Unclosed section "'+y[1]+'" at '+$)}else p==="name"||p==="{"||p==="&"?i=!0:p==="="&&S(c)}if(f(),y=r.pop(),y)throw new Error('Unclosed section "'+y[1]+'" at '+w.pos);return l1(a1(o))}function a1(e){for(var n=[],t,r,o=0,a=e.length;o<a;++o)t=e[o],t&&(t[0]==="text"&&r&&r[0]==="text"?(r[1]+=t[1],r[3]=t[3]):(n.push(t),r=t));return n}function l1(e){for(var n=[],t=n,r=[],o,a,l=0,i=e.length;l<i;++l)switch(o=e[l],o[0]){case"#":case"^":t.push(o),r.push(o),t=o[4]=[];break;case"/":a=r.pop(),a[5]=o[2],t=r.length>0?r[r.length-1][4]:n;break;default:t.push(o)}return n}function lr(e){this.string=e,this.tail=e,this.pos=0}lr.prototype.eos=function(){return this.tail===""};lr.prototype.scan=function(n){var t=this.tail.match(n);if(!t||t.index!==0)return"";var r=t[0];return this.tail=this.tail.substring(r.length),this.pos+=r.length,r};lr.prototype.scanUntil=function(n){var t=this.tail.search(n),r;switch(t){case-1:r=this.tail,this.tail="";break;case 0:r="";break;default:r=this.tail.substring(0,t),this.tail=this.tail.substring(t)}return this.pos+=r.length,r};function ut(e,n){this.view=e,this.cache={".":this.view},this.parent=n}ut.prototype.push=function(n){return new ut(n,this)};ut.prototype.lookup=function(n){var t=this.cache,r;if(t.hasOwnProperty(n))r=t[n];else{for(var o=this,a,l,i,s=!1;o;){if(n.indexOf(".")>0)for(a=o.view,l=n.split("."),i=0;a!=null&&i<l.length;)i===l.length-1&&(s=is(a,l[i])||Gv(a,l[i])),a=a[l[i++]];else a=o.view[n],s=is(o.view,n);if(s){r=a;break}o=o.parent}t[n]=r}return Ql(r)&&(r=r.call(this.view)),r};function de(){this.templateCache={_cache:{},set:function(n,t){this._cache[n]=t},get:function(n){return this._cache[n]},clear:function(){this._cache={}}}}de.prototype.clearCache=function(){typeof this.templateCache<"u"&&this.templateCache.clear()};de.prototype.parse=function(n,t){var r=this.templateCache,o=n+":"+(t||ye.tags).join(":"),a=typeof r<"u",l=a?r.get(o):void 0;return l==null&&(l=o1(n,t),a&&r.set(o,l)),l};de.prototype.render=function(n,t,r,o){var a=this.getConfigTags(o),l=this.parse(n,a),i=t instanceof ut?t:new ut(t,void 0);return this.renderTokens(l,i,r,n,o)};de.prototype.renderTokens=function(n,t,r,o,a){for(var l="",i,s,u,f=0,h=n.length;f<h;++f)u=void 0,i=n[f],s=i[0],s==="#"?u=this.renderSection(i,t,r,o,a):s==="^"?u=this.renderInverted(i,t,r,o,a):s===">"?u=this.renderPartial(i,t,r,a):s==="&"?u=this.unescapedValue(i,t):s==="name"?u=this.escapedValue(i,t,a):s==="text"&&(u=this.rawValue(i)),u!==void 0&&(l+=u);return l};de.prototype.renderSection=function(n,t,r,o,a){var l=this,i="",s=t.lookup(n[1]);function u(m){return l.render(m,t,r,a)}if(s){if(pt(s))for(var f=0,h=s.length;f<h;++f)i+=this.renderTokens(n[4],t.push(s[f]),r,o,a);else if(typeof s=="object"||typeof s=="string"||typeof s=="number")i+=this.renderTokens(n[4],t.push(s),r,o,a);else if(Ql(s)){if(typeof o!="string")throw new Error("Cannot use higher-order sections without the original template");s=s.call(t.view,o.slice(n[3],n[5]),u),s!=null&&(i+=s)}else i+=this.renderTokens(n[4],t,r,o,a);return i}};de.prototype.renderInverted=function(n,t,r,o,a){var l=t.lookup(n[1]);if(!l||pt(l)&&l.length===0)return this.renderTokens(n[4],t,r,o,a)};de.prototype.indentPartial=function(n,t,r){for(var o=t.replace(/[^ \t]/g,""),a=n.split(`
`),l=0;l<a.length;l++)a[l].length&&(l>0||!r)&&(a[l]=o+a[l]);return a.join(`
`)};de.prototype.renderPartial=function(n,t,r,o){if(r){var a=this.getConfigTags(o),l=Ql(r)?r(n[1]):r[n[1]];if(l!=null){var i=n[6],s=n[5],u=n[4],f=l;s==0&&u&&(f=this.indentPartial(l,u,i));var h=this.parse(f,a);return this.renderTokens(h,t,r,f,o)}}};de.prototype.unescapedValue=function(n,t){var r=t.lookup(n[1]);if(r!=null)return r};de.prototype.escapedValue=function(n,t,r){var o=this.getConfigEscape(r)||ye.escape,a=t.lookup(n[1]);if(a!=null)return typeof a=="number"&&o===ye.escape?String(a):o(a)};de.prototype.rawValue=function(n){return n[1]};de.prototype.getConfigTags=function(n){return pt(n)?n:n&&typeof n=="object"?n.tags:void 0};de.prototype.getConfigEscape=function(n){if(n&&typeof n=="object"&&!pt(n))return n.escape};var ye={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(e){er.templateCache=e},get templateCache(){return er.templateCache}},er=new de;ye.clearCache=function(){return er.clearCache()};ye.parse=function(n,t){return er.parse(n,t)};ye.render=function(n,t,r,o){if(typeof n!="string")throw new TypeError('Invalid template! Template should be a "string" but "'+Qv(n)+'" was given as the first argument for mustache#render(template, view, partials)');return er.render(n,t,r,o)};ye.escape=Zv;ye.Scanner=lr;ye.Context=ut;ye.Writer=de;const i1=`/* presentation-md base stylesheet.
   Theme tokens are injected via the :root block below. Layout fragments in
   ./layouts/*.html consume these CSS variables and class names. */

:root {
  --bg: {{bg}};
  --bg-2: {{bg2}};
  --text: {{text}};
  --muted: {{muted}};
  --accent: {{accent}};
  --accent-2: {{accent2}};
  --card-bg: {{cardBg}};
  --border: {{border}};
  --radius: {{radius}};
  --slide-w: {{slideW}};
  --heading-font: {{{headingFont}}};
  --body-font: {{{bodyFont}}};
  --heading-weight: {{headingWeight}};
}

* { margin: 0; padding: 0; box-sizing: border-box; }

html {
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--body-font);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  padding: 48px 0;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3 {
  font-family: var(--heading-font);
  font-weight: var(--heading-weight);
  line-height: 1.05;
  letter-spacing: -0.02em;
}

.deck {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  width: 100%;
}

.slide {
  position: relative;
  width: min(var(--slide-w), 95vw);
  aspect-ratio: 16 / 9;
  border-radius: var(--radius);
  overflow: hidden;
  padding: 64px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  scroll-snap-align: center;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.28);
  border: 1px solid var(--border);
}

.slide > * { position: relative; z-index: 1; }

.eyebrow {
  color: var(--accent-2);
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-size: 14px;
  margin-bottom: 14px;
}

.slide h1 { font-size: clamp(40px, 5.5vw, 84px); }
.slide h2 { font-size: clamp(30px, 3.4vw, 46px); margin-bottom: 8px; }

.lead {
  color: var(--muted);
  font-size: 20px;
  max-width: 62ch;
  margin-top: 16px;
}

/* two-column */
.cols { display: flex; gap: 48px; align-items: center; height: 100%; }
.cols > * { flex: 1; }
.cols .media { height: 100%; }
.cols img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius);
  display: block;
}

/* image-hero — full-bleed photo with bottom scrim */
.image-hero-slide { padding: 0; justify-content: flex-end; }
.image-hero-bg { position: absolute; inset: 0; z-index: 0; }
.image-hero-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.image-hero-scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, var(--bg) 0%, rgba(0, 0, 0, 0.15) 55%, transparent 100%);
}
.image-hero-content {
  position: relative;
  z-index: 1;
  padding: 64px;
  width: 100%;
}

/* comparison — side-by-side contrast */
.comparison-slide .comparison-cols {
  display: flex;
  gap: 20px;
  align-items: stretch;
  flex: 1;
  margin-top: 24px;
  min-height: 0;
}
.comparison-col {
  flex: 1;
  padding: 28px 32px;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: calc(var(--radius) * 0.75);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.comparison-col p {
  color: var(--muted);
  font-size: 17px;
  line-height: 1.45;
  white-space: pre-line;
}
.comparison-label {
  display: block;
  font-weight: 700;
  color: var(--accent-2);
  margin-bottom: 12px;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.1em;
}
.comparison-vs {
  display: flex;
  align-items: center;
  font-family: var(--heading-font);
  font-weight: var(--heading-weight);
  font-size: 14px;
  color: var(--accent);
  opacity: 0.55;
  flex-shrink: 0;
}

/* feature grid */
.grid { display: grid; gap: 24px; margin-top: 32px; }
.grid.cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid.cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid.cols-4 { grid-template-columns: repeat(4, 1fr); }

.card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 28px;
}
.card i { color: var(--accent); font-size: 28px; margin-bottom: 14px; display: block; }
.card h3 { font-size: 20px; margin-bottom: 8px; }
.card p { color: var(--muted); font-size: 15px; }

/* quote */
.quote-slide { align-items: center; text-align: center; }
.quote {
  font-family: var(--heading-font);
  font-weight: var(--heading-weight);
  font-size: clamp(28px, 3.6vw, 52px);
  max-width: 24ch;
  line-height: 1.18;
}
.quote-by { color: var(--muted); margin-top: 24px; font-size: 18px; }

/* data table */
table { width: 100%; border-collapse: collapse; margin-top: 24px; font-size: 17px; }
th, td { text-align: left; padding: 16px 20px; border-bottom: 1px solid var(--border); }
thead th {
  background: color-mix(in srgb, var(--accent) 20%, transparent);
  font-family: var(--heading-font);
}

/* stat row */
.stats { display: flex; gap: 48px; margin-top: 36px; flex-wrap: wrap; }
.stat .value {
  font-family: var(--heading-font);
  font-weight: var(--heading-weight);
  font-size: clamp(40px, 5vw, 72px);
  color: var(--accent);
  line-height: 1;
}
.stat .label { color: var(--muted); font-size: 16px; margin-top: 8px; }

/* timeline */
.timeline { display: flex; gap: 0; margin-top: 40px; }
.timeline .node { flex: 1; position: relative; padding-right: 24px; }
.timeline .node::before {
  content: "";
  position: absolute;
  top: 9px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--border);
}
.timeline .dot {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--accent);
  position: relative;
  z-index: 1;
}
.timeline .node h3 { font-size: 18px; margin: 18px 0 6px; }
.timeline .node p { color: var(--muted); font-size: 14px; }

/* section divider */
.section-slide { justify-content: center; }
.section-number {
  font-family: var(--heading-font);
  font-weight: var(--heading-weight);
  font-size: clamp(60px, 9vw, 140px);
  color: color-mix(in srgb, var(--accent) 60%, var(--text));
  line-height: 0.9;
}
.section-slide h2 { font-size: clamp(32px, 4vw, 56px); margin-top: 8px; }

/* closing / CTA */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 28px;
  padding: 14px 26px;
  border-radius: 999px;
  background: var(--accent);
  color: #fff;
  font-weight: 600;
  width: fit-content;
  text-decoration: none;
}

/* Entrance motion — applied when the deck loads; disabled under reduced-motion */
.slide {
  animation: pmd-fade-up 0.55s cubic-bezier(0.16, 1, 0.3, 1) both;
}
.slide:nth-child(1) { animation-delay: 0ms; }
.slide:nth-child(2) { animation-delay: 40ms; }
.slide:nth-child(3) { animation-delay: 80ms; }
.slide:nth-child(n+4) { animation-delay: 100ms; }

@keyframes pmd-fade-up {
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: translateY(0); }
}

.nav-hint {
  position: fixed;
  right: 20px;
  bottom: 18px;
  z-index: 40;
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--muted);
  background: color-mix(in srgb, var(--bg) 82%, transparent);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 8px 12px;
  backdrop-filter: blur(8px);
  pointer-events: none;
  opacity: 0.85;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .slide { animation: none !important; }
}

@media print {
  body { padding: 0; gap: 0; }
  .slide {
    box-shadow: none;
    border-radius: 0;
    page-break-after: always;
    width: 100vw;
    animation: none !important;
  }
  .nav-hint { display: none !important; }
}
`,us=`/* Per-theme surface profiles — each theme gets a distinct stage, not one shared blob. */

.deck[data-surface] .slide {
  background: var(--slide-bg, radial-gradient(125% 125% at 0% 0%, var(--bg-2), var(--bg)));
}

.deck[data-surface] .slide::after,
.deck[data-surface] .slide::before {
  content: "";
  position: absolute;
  pointer-events: none;
  z-index: 0;
}

.deck[data-surface] .slide > * { position: relative; z-index: 1; }

/* ── default fallback ── */
.deck[data-surface="gradient"] .slide::after {
  width: 520px;
  height: 520px;
  right: -160px;
  top: -160px;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--accent) 45%, transparent), transparent);
  filter: blur(8px);
}

/* ── neon-glow (default-tech) ── */
.deck[data-surface="neon-glow"] .slide {
  --slide-bg: radial-gradient(ellipse 120% 80% at 10% 0%, color-mix(in srgb, var(--accent) 22%, var(--bg)), var(--bg));
  box-shadow: 0 28px 80px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.06);
}
.deck[data-surface="neon-glow"] .slide::after {
  width: 640px;
  height: 640px;
  right: -220px;
  top: -200px;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--accent) 55%, transparent), transparent);
  filter: blur(12px);
}
.deck[data-surface="neon-glow"] .slide h1 {
  text-shadow: 0 0 40px color-mix(in srgb, var(--accent) 35%, transparent);
}

/* ── scanline-neon (retro-arcade) ── */
.deck[data-surface="scanline-neon"] .slide {
  --slide-bg: linear-gradient(180deg, var(--bg-2), var(--bg));
}
.deck[data-surface="scanline-neon"] .slide::before {
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.18) 2px,
    rgba(0, 0, 0, 0.18) 4px
  );
  opacity: 0.35;
}
.deck[data-surface="scanline-neon"] .slide::after {
  width: 100%;
  height: 3px;
  left: 0;
  top: 0;
  right: auto;
  background: linear-gradient(90deg, var(--accent), var(--accent2), var(--accent));
  filter: drop-shadow(0 0 12px var(--accent));
}
.deck[data-surface="scanline-neon"] .slide h1,
.deck[data-surface="scanline-neon"] .slide h2 {
  text-shadow: 0 0 20px color-mix(in srgb, var(--accent) 60%, transparent);
}

/* ── warm-paper (claude) ── */
.deck[data-surface="warm-paper"] .slide {
  --slide-bg: linear-gradient(165deg, var(--bg) 0%, color-mix(in srgb, var(--bg2) 80%, var(--bg)) 100%);
  box-shadow: 0 20px 50px rgba(20, 20, 19, 0.08);
  border: 1px solid color-mix(in srgb, var(--border) 80%, transparent);
}
.deck[data-surface="warm-paper"] .slide::after {
  width: 280px;
  height: 280px;
  left: -80px;
  bottom: -80px;
  top: auto;
  right: auto;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--accent) 18%, transparent), transparent);
}

/* ── clean-light (corporate) ── */
.deck[data-surface="clean-light"] .slide {
  --slide-bg: linear-gradient(180deg, #ffffff 0%, color-mix(in srgb, var(--bg2) 40%, #fff) 100%);
  box-shadow: 0 16px 48px rgba(26, 32, 53, 0.08);
}
.deck[data-surface="clean-light"] .slide::after {
  width: 6px;
  height: 72px;
  left: 48px;
  top: 48px;
  right: auto;
  background: var(--accent);
  border-radius: 3px;
  filter: none;
}

/* ── soft-bento (playful) ── */
.deck[data-surface="soft-bento"] .slide {
  --slide-bg: radial-gradient(circle at 90% 10%, color-mix(in srgb, var(--accent2) 25%, var(--bg)), var(--bg));
}
.deck[data-surface="soft-bento"] .slide::after {
  width: 120px;
  height: 120px;
  right: 48px;
  bottom: 48px;
  top: auto;
  border-radius: 28px;
  background: color-mix(in srgb, var(--accent) 20%, transparent);
  transform: rotate(12deg);
  filter: none;
}
.deck[data-surface="soft-bento"] .card {
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

/* ── quiet-luxe (luxury-minimalist) ── */
.deck[data-surface="quiet-luxe"] .slide {
  --slide-bg: var(--bg);
  box-shadow: none;
  border: 1px solid var(--border);
}
.deck[data-surface="quiet-luxe"] .slide::after {
  display: none;
}
.deck[data-surface="quiet-luxe"] .slide h1 {
  letter-spacing: -0.03em;
  font-weight: 400;
}

/* ── editorial-rule (editorial-serif) ── */
.deck[data-surface="editorial-rule"] .slide {
  --slide-bg: var(--bg);
}
.deck[data-surface="editorial-rule"] .slide::before {
  left: 64px;
  right: 64px;
  top: 48px;
  height: 4px;
  background: var(--accent);
}
.deck[data-surface="editorial-rule"] .slide::after {
  width: 48px;
  height: 48px;
  right: 64px;
  top: 64px;
  border: 2px solid var(--accent);
  border-radius: 50%;
  background: transparent;
  filter: none;
}

/* ── brutalist-grid (brutalist-mono) ── */
.deck[data-surface="brutalist-grid"] .slide {
  --slide-bg: var(--bg);
  border: 3px solid var(--text);
  border-radius: 0;
  box-shadow: 8px 8px 0 var(--text);
}
.deck[data-surface="brutalist-grid"] .slide::before {
  inset: 0;
  background-image:
    linear-gradient(color-mix(in srgb, var(--border) 60%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, var(--border) 60%, transparent) 1px, transparent 1px);
  background-size: 24px 24px;
  opacity: 0.4;
}
.deck[data-surface="brutalist-grid"] .slide::after {
  display: none;
}

/* ── pastel-cloud (pastel-dreamy) ── */
.deck[data-surface="pastel-cloud"] .slide {
  --slide-bg: radial-gradient(ellipse 80% 60% at 20% 20%, color-mix(in srgb, var(--accent2) 30%, var(--bg)), var(--bg));
}
.deck[data-surface="pastel-cloud"] .slide::after {
  width: 200px;
  height: 200px;
  left: 60%;
  top: 10%;
  border-radius: 50%;
  background: radial-gradient(circle, color-mix(in srgb, var(--accent) 25%, transparent), transparent);
  filter: blur(20px);
}

/* ── aurora-glass ── */
.deck[data-surface="aurora-glass"] .slide {
  --slide-bg: radial-gradient(ellipse 90% 70% at 80% 10%, color-mix(in srgb, var(--accent) 28%, transparent), transparent 55%),
              radial-gradient(ellipse 70% 60% at 10% 90%, color-mix(in srgb, var(--accent2) 22%, transparent), transparent 50%),
              var(--bg);
  box-shadow: 0 28px 80px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.deck[data-surface="aurora-glass"] .slide::after {
  width: 420px;
  height: 420px;
  right: -120px;
  top: -140px;
  border-radius: 50%;
  background: radial-gradient(circle, color-mix(in srgb, var(--accent) 40%, transparent), transparent 70%);
  filter: blur(28px);
}
.deck[data-surface="aurora-glass"] .card {
  backdrop-filter: blur(8px);
  background: color-mix(in srgb, var(--card-bg) 80%, transparent);
}

/* ── broadsheet-rule (ft-editorial) ── */
.deck[data-surface="broadsheet-rule"] .slide {
  --slide-bg: var(--bg);
  border-radius: 0;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
}
.deck[data-surface="broadsheet-rule"] .slide::before {
  left: 0;
  right: 0;
  top: 0;
  height: 28px;
  background: var(--text);
}
.deck[data-surface="broadsheet-rule"] .slide::after {
  left: 64px;
  right: 64px;
  top: auto;
  bottom: 48px;
  height: 2px;
  width: auto;
  background: var(--text);
  filter: none;
}

/* ── hard-bento (genz-bento) ── */
.deck[data-surface="hard-bento"] .slide {
  --slide-bg: var(--bg);
  border: 3px solid var(--text);
  box-shadow: 10px 10px 0 var(--text);
}
.deck[data-surface="hard-bento"] .slide::after {
  width: 140px;
  height: 140px;
  right: -30px;
  top: -30px;
  border-radius: 50%;
  background: var(--accent2);
  opacity: 0.55;
  filter: none;
}
.deck[data-surface="hard-bento"] .card {
  border: 2.5px solid var(--text);
  box-shadow: 4px 4px 0 var(--text);
  border-radius: 14px;
}

/* ── crt-phosphor (crt-terminal) ── */
.deck[data-surface="crt-phosphor"] .slide {
  --slide-bg: radial-gradient(ellipse 100% 80% at 50% 40%, #0a1808, var(--bg));
  border-radius: 0;
  box-shadow: inset 0 0 80px rgba(57, 255, 20, 0.08), 0 0 40px rgba(0, 245, 255, 0.12);
}
.deck[data-surface="crt-phosphor"] .slide::before {
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 1px,
    rgba(0, 0, 0, 0.28) 1px,
    rgba(0, 0, 0, 0.28) 3px
  );
  opacity: 0.45;
}
.deck[data-surface="crt-phosphor"] .slide::after {
  display: none;
}
.deck[data-surface="crt-phosphor"] .slide h1,
.deck[data-surface="crt-phosphor"] .slide h2 {
  text-shadow: 0 0 14px color-mix(in srgb, var(--accent) 65%, transparent),
    0 0 32px color-mix(in srgb, var(--accent2) 35%, transparent);
}
.deck[data-surface="crt-phosphor"] .eyebrow,
.deck[data-surface="crt-phosphor"] .comparison-label {
  color: var(--accent);
}

/* ── swiss-grid (swiss-typographic) ── */
.deck[data-surface="swiss-grid"] .slide {
  --slide-bg: var(--bg);
  border-radius: 0;
  border: 1px solid var(--border);
  box-shadow: none;
}
.deck[data-surface="swiss-grid"] .slide::before {
  inset: 0;
  background-image:
    linear-gradient(color-mix(in srgb, var(--border) 70%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, var(--border) 70%, transparent) 1px, transparent 1px);
  background-size: 64px 64px;
  opacity: 0.55;
}
.deck[data-surface="swiss-grid"] .slide::after {
  width: 8px;
  height: 100%;
  left: 0;
  top: 0;
  right: auto;
  background: var(--accent);
  filter: none;
}

/* ── candy-blob (candy-pop) ── */
.deck[data-surface="candy-blob"] .slide {
  --slide-bg: radial-gradient(circle at 12% 18%, color-mix(in srgb, var(--accent) 22%, var(--bg)), var(--bg) 42%),
              radial-gradient(circle at 88% 78%, color-mix(in srgb, var(--accent2) 35%, var(--bg)), var(--bg) 48%);
  border: 3px solid var(--text);
  box-shadow: 0 18px 0 color-mix(in srgb, var(--accent) 35%, transparent);
}
.deck[data-surface="candy-blob"] .slide::after {
  width: 180px;
  height: 180px;
  right: 48px;
  top: 40px;
  border-radius: 50%;
  background: var(--accent2);
  opacity: 0.55;
  filter: none;
  border: 3px solid var(--text);
}
.deck[data-surface="candy-blob"] .card {
  border: 2.5px solid var(--text);
  border-radius: 22px;
}

/* ── hud-grid (aerospace-hud) ── */
.deck[data-surface="hud-grid"] .slide {
  --slide-bg: linear-gradient(180deg, var(--bg-2), var(--bg));
  border: 1px solid color-mix(in srgb, var(--accent) 45%, transparent);
  box-shadow: 0 0 40px color-mix(in srgb, var(--accent) 18%, transparent),
    inset 0 0 60px rgba(0, 0, 0, 0.25);
}
.deck[data-surface="hud-grid"] .slide::before {
  inset: 0;
  background-image:
    linear-gradient(color-mix(in srgb, var(--accent) 18%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, var(--accent) 18%, transparent) 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.5;
}
.deck[data-surface="hud-grid"] .slide::after {
  width: 56px;
  height: 56px;
  right: 40px;
  top: 40px;
  border: 2px solid var(--accent);
  border-radius: 50%;
  background: transparent;
  box-shadow: inset 0 0 0 6px color-mix(in srgb, var(--accent) 25%, transparent);
  filter: none;
}
.deck[data-surface="hud-grid"] .slide h1 {
  text-shadow: 0 0 24px color-mix(in srgb, var(--accent) 40%, transparent);
}

/* ── acid-block (brutalist-acid) ── */
.deck[data-surface="acid-block"] .slide {
  --slide-bg: var(--bg);
  border: 3px solid var(--accent);
  border-radius: 0;
  box-shadow: 10px 10px 0 var(--accent);
}
.deck[data-surface="acid-block"] .slide::before {
  inset: 0;
  background-image:
    linear-gradient(color-mix(in srgb, var(--accent) 12%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, var(--accent) 12%, transparent) 1px, transparent 1px);
  background-size: 32px 32px;
  opacity: 0.5;
}
.deck[data-surface="acid-block"] .slide::after {
  width: 72px;
  height: 72px;
  right: 40px;
  top: 40px;
  background: var(--accent);
  filter: none;
}
.deck[data-surface="acid-block"] .card {
  border: 2px solid var(--accent);
  border-radius: 0;
}

/* ── bauhaus-blocks ── */
.deck[data-surface="bauhaus-blocks"] .slide {
  --slide-bg: var(--bg);
  border-radius: 0;
  border: 2px solid var(--text);
}
.deck[data-surface="bauhaus-blocks"] .slide::before {
  width: 96px;
  height: 96px;
  right: 64px;
  top: 56px;
  background: var(--accent);
  filter: none;
}
.deck[data-surface="bauhaus-blocks"] .slide::after {
  width: 96px;
  height: 96px;
  right: 120px;
  top: 112px;
  border-radius: 50%;
  background: var(--accent2);
  filter: none;
  opacity: 0.9;
}

/* ── aero-bubble (y2k-aero) ── */
.deck[data-surface="aero-bubble"] .slide {
  --slide-bg: linear-gradient(160deg, #ffffff 0%, var(--bg) 45%, color-mix(in srgb, var(--accent) 18%, var(--bg)) 100%);
  border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);
  box-shadow: 0 24px 60px color-mix(in srgb, var(--accent) 18%, transparent);
}
.deck[data-surface="aero-bubble"] .slide::after {
  width: 220px;
  height: 220px;
  right: -40px;
  top: -60px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #fff, color-mix(in srgb, var(--accent2) 55%, transparent));
  filter: blur(2px);
  opacity: 0.7;
}
.deck[data-surface="aero-bubble"] .slide::before {
  width: 140px;
  height: 140px;
  left: 8%;
  bottom: 10%;
  top: auto;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #fff, color-mix(in srgb, var(--accent) 50%, transparent));
  opacity: 0.55;
}

/* ── riso-print (risograph-zine) ── */
.deck[data-surface="riso-print"] .slide {
  --slide-bg: var(--bg);
  border: 2px solid var(--text);
  box-shadow: 6px 6px 0 color-mix(in srgb, var(--accent) 55%, transparent);
}
.deck[data-surface="riso-print"] .slide::before {
  width: 55%;
  height: 55%;
  right: -4%;
  top: -6%;
  background: color-mix(in srgb, var(--accent) 18%, transparent);
  mix-blend-mode: multiply;
  filter: none;
}
.deck[data-surface="riso-print"] .slide::after {
  width: 40%;
  height: 45%;
  left: -2%;
  bottom: -4%;
  top: auto;
  right: auto;
  background: color-mix(in srgb, var(--accent2) 20%, transparent);
  mix-blend-mode: multiply;
  filter: none;
}

/* ── neon-rain (neon-noir) ── */
.deck[data-surface="neon-rain"] .slide {
  --slide-bg: linear-gradient(180deg, #12121f 0%, var(--bg) 55%, #050508 100%);
  box-shadow: 0 0 50px color-mix(in srgb, var(--accent) 25%, transparent),
    inset 0 -40px 80px color-mix(in srgb, var(--accent2) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent2) 30%, transparent);
}
.deck[data-surface="neon-rain"] .slide::before {
  inset: 0;
  background: repeating-linear-gradient(
    100deg,
    transparent,
    transparent 6px,
    rgba(255, 255, 255, 0.015) 6px,
    rgba(255, 255, 255, 0.015) 7px
  );
  opacity: 0.7;
}
.deck[data-surface="neon-rain"] .slide::after {
  width: 480px;
  height: 480px;
  right: -160px;
  top: -120px;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--accent) 45%, transparent), transparent);
  filter: blur(10px);
}
.deck[data-surface="neon-rain"] .slide h1 {
  text-shadow: 0 0 18px color-mix(in srgb, var(--accent) 55%, transparent),
    0 0 40px color-mix(in srgb, var(--accent2) 35%, transparent);
}

/* ── vapor-horizon (vaporwave) ── */
.deck[data-surface="vapor-horizon"] .slide {
  --slide-bg: linear-gradient(180deg, var(--bg-2) 0%, var(--bg) 48%, #3a1048 100%);
  border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);
}
.deck[data-surface="vapor-horizon"] .slide::before {
  left: 0;
  right: 0;
  bottom: 0;
  top: auto;
  height: 42%;
  background-image:
    linear-gradient(color-mix(in srgb, var(--accent2) 35%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, var(--accent2) 35%, transparent) 1px, transparent 1px);
  background-size: 48px 48px;
  opacity: 0.45;
  transform: perspective(400px) rotateX(55deg);
  transform-origin: bottom center;
}
.deck[data-surface="vapor-horizon"] .slide::after {
  width: 100%;
  height: 3px;
  left: 0;
  top: 48%;
  right: auto;
  background: linear-gradient(90deg, transparent, var(--accent), var(--accent2), transparent);
  filter: drop-shadow(0 0 10px var(--accent));
}
.deck[data-surface="vapor-horizon"] .slide h1 {
  text-shadow: 2px 0 color-mix(in srgb, var(--accent2) 50%, transparent),
    -2px 0 color-mix(in srgb, var(--accent) 50%, transparent);
}

/* ── botanical-leaf (botanical-luxe) ── */
.deck[data-surface="botanical-leaf"] .slide {
  --slide-bg: radial-gradient(ellipse 90% 70% at 100% 0%, color-mix(in srgb, var(--accent2) 18%, var(--bg)), var(--bg));
  border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
}
.deck[data-surface="botanical-leaf"] .slide::before {
  left: 64px;
  right: 64px;
  top: 48px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
}
.deck[data-surface="botanical-leaf"] .slide::after {
  width: 120px;
  height: 120px;
  right: 56px;
  bottom: 48px;
  top: auto;
  border: 1px solid var(--accent);
  border-radius: 50% 0 50% 50%;
  background: transparent;
  transform: rotate(-25deg);
  filter: none;
  opacity: 0.55;
}
.deck[data-surface="botanical-leaf"] .slide h1 {
  font-style: italic;
}

/* ── heritage-wash (heritage-editorial) ── */
.deck[data-surface="heritage-wash"] .slide {
  --slide-bg: linear-gradient(165deg, var(--bg) 0%, var(--bg-2) 100%);
  box-shadow: 0 18px 50px rgba(22, 19, 15, 0.08);
}
.deck[data-surface="heritage-wash"] .slide::before {
  left: 64px;
  right: 64px;
  top: 52px;
  height: 1px;
  background: color-mix(in srgb, var(--accent) 55%, transparent);
}
.deck[data-surface="heritage-wash"] .slide::after {
  width: 72px;
  height: 1px;
  right: 64px;
  bottom: 52px;
  top: auto;
  background: var(--accent);
  filter: none;
}

/* ── fintech-soft ── */
.deck[data-surface="fintech-soft"] .slide {
  --slide-bg: radial-gradient(ellipse 80% 60% at 100% 0%, color-mix(in srgb, var(--accent) 10%, var(--bg)), var(--bg));
  border: 1px solid var(--border);
  box-shadow: 0 16px 48px rgba(15, 23, 42, 0.06);
}
.deck[data-surface="fintech-soft"] .slide::after {
  width: 280px;
  height: 280px;
  right: -80px;
  top: -100px;
  border-radius: 50%;
  background: radial-gradient(circle, color-mix(in srgb, var(--accent2) 22%, transparent), transparent 70%);
  filter: blur(12px);
}
.deck[data-surface="fintech-soft"] .card {
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
  border-radius: 12px;
}

/* ── dev-terminal (developer-dark) ── */
.deck[data-surface="dev-terminal"] .slide {
  --slide-bg: var(--bg);
  border: 1px solid var(--border);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);
}
.deck[data-surface="dev-terminal"] .slide::before {
  left: 0;
  right: 0;
  top: 0;
  height: 28px;
  background: var(--bg-2);
  border-bottom: 1px solid var(--border);
}
.deck[data-surface="dev-terminal"] .slide::after {
  width: 8px;
  height: 8px;
  left: 16px;
  top: 10px;
  right: auto;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 14px 0 0 #d29922, 28px 0 0 #f85149;
  filter: none;
}

/* ── data-rule (data-editorial) ── */
.deck[data-surface="data-rule"] .slide {
  --slide-bg: var(--bg);
  border-radius: 0;
  border: 1px solid var(--border);
}
.deck[data-surface="data-rule"] .slide::before {
  left: 64px;
  right: 64px;
  top: 48px;
  height: 3px;
  background: var(--accent);
}
.deck[data-surface="data-rule"] .slide::after {
  width: 3px;
  height: 48px;
  left: 64px;
  top: 48px;
  right: auto;
  background: var(--accent2);
  filter: none;
}

/* ── hygge-soft (scandinavian) ── */
.deck[data-surface="hygge-soft"] .slide {
  --slide-bg: radial-gradient(ellipse 70% 50% at 20% 10%, color-mix(in srgb, var(--accent) 18%, var(--bg)), var(--bg));
  box-shadow: 0 18px 40px rgba(43, 41, 38, 0.08);
  border: 1px solid color-mix(in srgb, var(--border) 80%, transparent);
}
.deck[data-surface="hygge-soft"] .slide::after {
  width: 160px;
  height: 160px;
  right: 48px;
  bottom: 40px;
  top: auto;
  border-radius: 50%;
  background: color-mix(in srgb, var(--accent2) 22%, transparent);
  filter: blur(8px);
}

/* ── deco-fan (art-deco) ── */
.deck[data-surface="deco-fan"] .slide {
  --slide-bg: radial-gradient(ellipse 100% 80% at 50% 0%, var(--bg-2), var(--bg));
  border: 1px solid color-mix(in srgb, var(--accent) 45%, transparent);
  border-radius: 0;
}
.deck[data-surface="deco-fan"] .slide::before {
  left: 64px;
  right: 64px;
  top: 48px;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
}
.deck[data-surface="deco-fan"] .slide::after {
  width: 56px;
  height: 56px;
  left: 50%;
  top: 36px;
  right: auto;
  margin-left: -28px;
  border: 2px solid var(--accent);
  border-radius: 50%;
  background: transparent;
  filter: none;
}
.deck[data-surface="deco-fan"] .slide h1 {
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

/* ── wrapped-block (kinetic-wrapped) ── */
.deck[data-surface="wrapped-block"] .slide {
  --slide-bg: var(--bg);
  border: 4px solid var(--accent);
  border-radius: 0;
  box-shadow: 12px 12px 0 var(--accent);
}
.deck[data-surface="wrapped-block"] .slide::after {
  width: 120px;
  height: 120px;
  right: -20px;
  top: -20px;
  background: var(--accent);
  filter: none;
}
.deck[data-surface="wrapped-block"] .slide h1 {
  text-transform: uppercase;
  letter-spacing: -0.03em;
}

/* ── blueprint-grid ── */
.deck[data-surface="blueprint-grid"] .slide {
  --slide-bg: var(--bg);
  border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent);
}
.deck[data-surface="blueprint-grid"] .slide::before {
  inset: 0;
  background-image:
    linear-gradient(color-mix(in srgb, var(--accent) 22%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, var(--accent) 22%, transparent) 1px, transparent 1px);
  background-size: 32px 32px;
  opacity: 0.45;
}
.deck[data-surface="blueprint-grid"] .slide::after {
  width: 64px;
  height: 64px;
  right: 40px;
  top: 40px;
  border: 1px solid var(--accent);
  background: transparent;
  filter: none;
}
.deck[data-surface="blueprint-grid"] .slide h1 {
  text-shadow: 0 0 20px color-mix(in srgb, var(--accent) 35%, transparent);
}

/* Scroll-triggered reveals (populated by document.html script) */
.slide .reveal {
  opacity: 0;
  transform: translateY(22px);
  transition:
    opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: var(--reveal-delay, 0ms);
}
.slide.in-view .reveal {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .slide .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
`,s1="warm-paper",u1="clean-light",c1="soft-bento",d1="bauhaus-blocks",f1="vapor-horizon",p1="hygge-soft",h1="blueprint-grid",g1={claude:s1,"default-tech":"neon-glow",corporate:u1,playful:c1,"luxury-minimalist":"quiet-luxe","retro-arcade":"scanline-neon","editorial-serif":"editorial-rule","brutalist-mono":"brutalist-grid","pastel-dreamy":"pastel-cloud","aurora-glass":"aurora-glass","ft-editorial":"broadsheet-rule","genz-bento":"hard-bento","crt-terminal":"crt-phosphor","swiss-typographic":"swiss-grid","candy-pop":"candy-blob","aerospace-hud":"hud-grid","brutalist-acid":"acid-block",bauhaus:d1,"y2k-aero":"aero-bubble","risograph-zine":"riso-print","neon-noir":"neon-rain",vaporwave:f1,"botanical-luxe":"botanical-leaf","heritage-editorial":"heritage-wash","fintech-clean":"fintech-soft","developer-dark":"dev-terminal","data-editorial":"data-rule",scandinavian:p1,"art-deco":"deco-fan","kinetic-wrapped":"wrapped-block",blueprint:h1},m1=`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>{{title}}</title>
<meta name="description" content="{{description}}" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
<style>
{{{styles}}}
</style>
</head>
<body>
<main class="deck" data-surface="{{surface}}">
{{{slides}}}
</main>
<div class="nav-hint" aria-hidden="true">← → to navigate</div>
{{{attribution}}}
{{{deckData}}}
<script>
(function () {
  var slides = Array.prototype.slice.call(document.querySelectorAll(".slide"));
  if (!slides.length) return;

  slides.forEach(function (slide) {
    var kids = slide.querySelectorAll("h1, h2, h3, .eyebrow, .lead, .card, .stat, .quote, .btn, table, .timeline .node");
    for (var i = 0; i < kids.length; i++) {
      kids[i].classList.add("reveal");
      kids[i].style.setProperty("--reveal-delay", String(Math.min(i * 70, 280)) + "ms");
    }
  });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) e.target.classList.add("in-view");
      });
    }, { threshold: 0.35 });
    slides.forEach(function (s) { io.observe(s); });
    slides[0].classList.add("in-view");
  } else {
    slides.forEach(function (s) { s.classList.add("in-view"); });
  }

  function go(delta) {
    var y = window.scrollY || window.pageYOffset;
    var target = null;
    if (delta > 0) {
      for (var i = 0; i < slides.length; i++) {
        if (slides[i].offsetTop > y + 8) { target = slides[i]; break; }
      }
    } else {
      for (var j = slides.length - 1; j >= 0; j--) {
        if (slides[j].offsetTop < y - 8) { target = slides[j]; break; }
      }
    }
    if (target) target.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  window.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "PageUp") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "Home") {
      e.preventDefault();
      slides[0].scrollIntoView({ behavior: "smooth", block: "center" });
    } else if (e.key === "End") {
      e.preventDefault();
      slides[slides.length - 1].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
})();
<\/script>
</body>
</html>
`;function y1(e){return g1[e]??"gradient"}const v1=Object.assign({"../../../shared/layouts/closing.html":Ov,"../../../shared/layouts/comparison.html":Fv,"../../../shared/layouts/data-table.html":Iv,"../../../shared/layouts/feature-grid.html":Lv,"../../../shared/layouts/image-hero.html":Rv,"../../../shared/layouts/quote.html":Dv,"../../../shared/layouts/section.html":Av,"../../../shared/layouts/stat-row.html":Bv,"../../../shared/layouts/timeline.html":Uv,"../../../shared/layouts/title.html":Wv,"../../../shared/layouts/two-column.html":Hv}),Lg=new Map;for(const[e,n]of Object.entries(v1)){const t=e.split("/").pop().replace(/\.html$/,"");Lg.set(t,n)}function x1(e){return e.length===0?"":`https://fonts.googleapis.com/css2?family=${e.join("&family=")}&display=swap`}const w1=new Set(["http","https","mailto","tel"]);function Rg(e){let n="";for(const t of e){const r=t.charCodeAt(0);r>31&&r!==127&&(n+=t)}return n}function Dg(e){var n,t;return(t=(n=e.match(/^([a-zA-Z][a-zA-Z0-9+.-]*):/))==null?void 0:n[1])==null?void 0:t.toLowerCase()}function b1(e){if(typeof e!="string")return;const n=Rg(e).trim(),t=Dg(n);return t&&!w1.has(t)?"#":n}function k1(e){if(typeof e!="string")return;const n=Rg(e).trim();if(/^data:image\//i.test(n))return n;const t=Dg(n);return t&&t!=="http"&&t!=="https"?"":n}function S1(e){var t;const n={...e};return e.layout==="data-table"&&Array.isArray(e.rows)&&(n.rows=e.rows.map(r=>({cells:r}))),e.layout==="feature-grid"&&(typeof e.columns=="number"?n.columns=e.columns:e.columns||(n.columns=3)),((t=e.cta)==null?void 0:t.href)!==void 0&&(n.cta={...e.cta,href:b1(e.cta.href)}),e.image!==void 0&&(n.image=k1(e.image)),n}const _1='<footer class="pmd-attribution">Made with <a href="https://presentation-md.vercel.app/?ref=studio" target="_blank" rel="noopener">presentation-md</a></footer>',C1=`
/* presentation-md attribution footer */
.pmd-attribution {
  font-family: var(--body-font);
  font-size: 13px;
  letter-spacing: 0.04em;
  color: var(--muted);
  opacity: 0.6;
  text-align: center;
  padding: 4px 0 16px;
}
.pmd-attribution a {
  color: var(--muted);
  text-decoration: none;
  border-bottom: 1px solid color-mix(in srgb, var(--muted) 40%, transparent);
  transition: color 0.15s ease, border-color 0.15s ease;
}
.pmd-attribution a:hover { color: var(--accent); border-color: var(--accent); }
@media print { .pmd-attribution { opacity: 0.5; } }`;function j1(e){return`<script type="application/json" id="pmd-deck">${JSON.stringify(e).replace(/</g,"\\u003c")}<\/script>`}function Ag(e,n){var u,f,h;const t={bg:n.palette.bg,bg2:n.palette.bg2,text:n.palette.text,muted:n.palette.muted,accent:n.palette.accent,accent2:n.palette.accent2,cardBg:n.palette.cardBg,border:n.palette.border,radius:n.geometry.radius,slideW:n.geometry.slideWidth,headingFont:n.typography.headingFont,bodyFont:n.typography.bodyFont,headingWeight:String(n.typography.headingWeight)},r=ye.render(i1,t),o=x1(n.typography.googleFonts),a=y1(n.name);let l=o?`@import url('${o}');

${r}

${us}`:`${r}

${us}`;l+=`

${C1}`;const i=(Array.isArray(e.slides)?e.slides:[]).map(m=>{const v=Lg.get(m.layout);return v?ye.render(v,S1(m)):`<section class="slide"><h2>Unknown layout: ${m.layout}</h2></section>`}).join(`
`),s=((u=e.meta)==null?void 0:u.title)??((f=e.meta)==null?void 0:f.company)??"Presentation";return ye.render(m1,{title:s,description:((h=e.meta)==null?void 0:h.description)??"",styles:l,slides:i,surface:a,attribution:_1,deckData:j1(e)})}const E1="modulepreload",$1=function(e){return"/studio/"+e},cs={},Bg=function(n,t,r){let o=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),i=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));o=Promise.allSettled(t.map(s=>{if(s=$1(s),s in cs)return;cs[s]=!0;const u=s.endsWith(".css"),f=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${s}"]${f}`))return;const h=document.createElement("link");if(h.rel=u?"stylesheet":E1,u||(h.as="script"),h.crossOrigin="",h.href=s,i&&h.setAttribute("nonce",i),document.head.appendChild(h),u)return new Promise((m,v)=>{h.addEventListener("load",m),h.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${s}`)))})}))}function a(l){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=l,window.dispatchEvent(i),!i.defaultPrevented)throw l}return o.then(l=>{for(const i of l||[])i.status==="rejected"&&a(i.reason);return n().catch(a)})};function Gl(e,n){const t=URL.createObjectURL(e),r=document.createElement("a");r.href=t,r.download=n,document.body.appendChild(r),r.click(),r.remove(),URL.revokeObjectURL(t)}function Kl(e,n){var r,o;return`${(((r=e.meta)==null?void 0:r.title)??((o=e.meta)==null?void 0:o.company)??"deck").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"deck"}.${n}`}function Ug(e){var n;return((n=e.meta)==null?void 0:n.theme)??"default-tech"}async function N1(e){const n=[],t=Vl(Ug(e)),{deckToPptxBlob:r}=await Bg(async()=>{const{deckToPptxBlob:a}=await import("./index-rT3NUMG4.js");return{deckToPptxBlob:a}},__vite__mapDeps([0,1])),o=await r(e,t,{onWarn:a=>n.push(a)});return Gl(o,Kl(e,"pptx")),{warnings:n}}function T1(e){const n=Vl(Ug(e)),t=Ag(e,n);Gl(new Blob([t],{type:"text/html"}),Kl(e,"html"))}function P1(e){Gl(new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),Kl(e,"json"))}function Yl(e){const n=JSON.parse(e);if((n==null?void 0:n.type)!=="deck"||!Array.isArray(n.slides))throw new Error('Not a valid deck: expected { "type": "deck", "slides": [...] }');return n}function z1(e){var r,o,a;const n=["pmd-deck","psp-deck"];if(typeof DOMParser<"u"){const l=new DOMParser().parseFromString(e,"text/html");for(const i of n){const s=(o=(r=l.getElementById(i))==null?void 0:r.textContent)==null?void 0:o.trim();if(s)return s}}const t=e.match(/<script[^>]*id=["'](?:pmd-deck|psp-deck)["'][^>]*>([\s\S]*?)<\/script>/i);return(a=t==null?void 0:t[1])==null?void 0:a.trim()}function M1(e){const n=z1(e);if(!n)throw new Error("No editable deck found in this HTML. Only presentations created by presentation-md (with an embedded source) can be opened.");return Yl(n)}function O1(e,n){return/\.html?$/i.test(e)?M1(n):Yl(n)}function F1({deck:e,onChange:n,onLoadExample:t,onPresent:r,onGenerate:o}){var p,c,g,x;const a=R.useRef(null),[l,i]=R.useState(""),[s,u]=R.useState(!1),f=Ig(),h=((p=e.meta)==null?void 0:p.theme)??"default-tech",m=y=>n({...e,meta:{...e.meta,...y}}),v=y=>m({theme:y}),S=y=>m({title:y}),w=async y=>{try{const b=O1(y.name,await y.text());n(b),i(`Opened ${y.name}`)}catch(b){i(`Open failed: ${b.message}`)}},$=async()=>{u(!0),i("Building .pptx…");try{const{warnings:y}=await N1(e);i(y.length?`Exported .pptx (${y.length} warning${y.length>1?"s":""})`:"Exported .pptx")}catch(y){i(`Export failed: ${y.message}`)}finally{u(!1)}};return d.jsxs("header",{className:"toolbar",children:[d.jsxs("div",{className:"brand",children:[d.jsx("strong",{children:"Studio"}),d.jsx("span",{className:"muted small",children:"presentation-md"})]}),d.jsx("input",{className:"text-input title-input",value:((c=e.meta)==null?void 0:c.title)??"",placeholder:"Deck title",onChange:y=>S(y.target.value)}),d.jsxs("label",{className:"inline-field",children:[d.jsx("span",{className:"muted small",children:"Theme"}),d.jsx("select",{className:"text-input",value:h,onChange:y=>v(y.target.value),children:f.map(y=>d.jsx("option",{value:y,children:y},y))})]}),d.jsxs("details",{className:"deck-details",children:[d.jsx("summary",{className:"btn btn-sm",children:"Details"}),d.jsxs("div",{className:"deck-details-body",children:[d.jsx("input",{className:"text-input",value:((g=e.meta)==null?void 0:g.company)??"",placeholder:"Company",onChange:y=>m({company:y.target.value})}),d.jsx("input",{className:"text-input",value:((x=e.meta)==null?void 0:x.description)??"",placeholder:"Description",onChange:y=>m({description:y.target.value})})]})]}),d.jsx("div",{className:"spacer"}),d.jsx("button",{className:"btn btn-generate",onClick:o,title:"Generate a deck from a prompt",children:"✨ Generate"}),d.jsx("button",{className:"btn",onClick:t,children:"Example"}),d.jsx("button",{className:"btn",onClick:()=>{var y;return(y=a.current)==null?void 0:y.click()},title:"Open a deck .html or .json",children:"Open"}),d.jsx("button",{className:"btn",onClick:r,title:"Present fullscreen",children:"Present"}),d.jsx("button",{className:"btn",onClick:()=>P1(e),children:"JSON"}),d.jsx("button",{className:"btn",onClick:()=>T1(e),children:"HTML"}),d.jsx("button",{className:"btn btn-primary",disabled:s,onClick:$,children:s?"…":"Download .pptx"}),d.jsx("input",{ref:a,type:"file",accept:".html,.htm,.json,application/json,text/html",hidden:!0,onChange:y=>{var E;const b=(E=y.target.files)==null?void 0:E[0];b&&w(b),y.target.value=""}}),l&&d.jsx("span",{className:"status muted small",children:l})]})}function I1({slides:e,selected:n,onSelect:t,onChange:r}){const[o,a]=R.useState("title"),l=()=>{const f=n+1,h=[...e.slice(0,f),by(o),...e.slice(f)];r(h,f)},i=f=>{const h=JSON.parse(JSON.stringify(e[f]));r([...e.slice(0,f+1),h,...e.slice(f+1)],f+1)},s=f=>{if(e.length<=1)return;const h=e.filter((m,v)=>v!==f);r(h,Math.max(0,Math.min(f,h.length-1)))},u=(f,h)=>{const m=f+h;if(m<0||m>=e.length)return;const v=e.slice();[v[f],v[m]]=[v[m],v[f]],r(v,m)};return d.jsxs("div",{className:"slide-list",children:[d.jsxs("div",{className:"add-row",children:[d.jsx("select",{className:"text-input",value:o,onChange:f=>a(f.target.value),children:wy.map(f=>d.jsx("option",{value:f,children:Xa[f]},f))}),d.jsx("button",{className:"btn btn-sm",onClick:l,children:"+ Add"})]}),d.jsx("ul",{className:"slides",children:e.map((f,h)=>d.jsxs("li",{className:`slide-row ${h===n?"active":""}`,onClick:()=>t(h),children:[d.jsxs("div",{className:"slide-row-main",children:[d.jsx("span",{className:"slide-row-num",children:h+1}),d.jsxs("div",{className:"slide-row-text",children:[d.jsx("span",{className:"slide-row-layout",children:Xa[f.layout]??f.layout}),d.jsx("span",{className:"slide-row-title",children:f.heading??f.quote??f.eyebrow??"—"})]})]}),d.jsxs("div",{className:"slide-row-actions",onClick:m=>m.stopPropagation(),children:[d.jsx("button",{className:"btn btn-icon",title:"Move up",onClick:()=>u(h,-1),children:"↑"}),d.jsx("button",{className:"btn btn-icon",title:"Move down",onClick:()=>u(h,1),children:"↓"}),d.jsx("button",{className:"btn btn-icon",title:"Duplicate",onClick:()=>i(h),children:"⧉"}),d.jsx("button",{className:"btn btn-icon btn-danger",title:"Delete",onClick:()=>s(h),children:"✕"})]})]},h))})]})}function Xl({label:e,children:n}){return d.jsxs("label",{className:"field",children:[d.jsx("span",{className:"field-label",children:e}),n]})}function M({label:e,value:n,onChange:t,placeholder:r}){return d.jsx(Xl,{label:e,children:d.jsx("input",{className:"text-input",type:"text",value:n??"",placeholder:r,onChange:o=>t(o.target.value)})})}function We({label:e,value:n,onChange:t,rows:r=3}){return d.jsx(Xl,{label:e,children:d.jsx("textarea",{className:"text-input",rows:r,value:n??"",onChange:o=>t(o.target.value)})})}function L1({label:e,value:n,options:t,onChange:r}){return d.jsx(Xl,{label:e,children:d.jsx("select",{className:"text-input",value:n,onChange:o=>r(Number(o.target.value)),children:t.map(o=>d.jsx("option",{value:o,children:o},o))})})}function Dr({label:e,items:n,onChange:t,blank:r,renderItem:o}){const a=(i,s)=>t(n.map((u,f)=>f===i?s:u)),l=(i,s)=>{const u=i+s;if(u<0||u>=n.length)return;const f=n.slice();[f[i],f[u]]=[f[u],f[i]],t(f)};return d.jsxs("div",{className:"list-editor",children:[d.jsxs("div",{className:"list-editor-head",children:[d.jsx("span",{className:"field-label",children:e}),d.jsx("button",{className:"btn btn-sm",onClick:()=>t([...n,r()]),children:"+ Add"})]}),n.map((i,s)=>d.jsxs("div",{className:"list-item",children:[d.jsxs("div",{className:"list-item-controls",children:[d.jsx("span",{className:"list-item-index",children:s+1}),d.jsx("div",{className:"spacer"}),d.jsx("button",{className:"btn btn-icon",title:"Move up",onClick:()=>l(s,-1),children:"↑"}),d.jsx("button",{className:"btn btn-icon",title:"Move down",onClick:()=>l(s,1),children:"↓"}),d.jsx("button",{className:"btn btn-icon btn-danger",title:"Remove",onClick:()=>t(n.filter((u,f)=>f!==s)),children:"✕"})]}),o(i,u=>a(s,u),s)]},s)),n.length===0&&d.jsx("p",{className:"muted small",children:"No items yet."})]})}function R1({slide:e,onChange:n}){const t=a=>n({...e,...a}),r=e.layout;return d.jsxs("div",{className:"slide-form",children:[d.jsx("h2",{className:"panel-title",children:Xa[r]??e.layout}),o()]});function o(){var a,l;switch(e.layout){case"title":case"closing":return d.jsxs(d.Fragment,{children:[d.jsx(M,{label:"Eyebrow",value:e.eyebrow,onChange:i=>t({eyebrow:i})}),d.jsx(M,{label:"Heading",value:e.heading,onChange:i=>t({heading:i})}),d.jsx(We,{label:"Lead",value:e.lead,onChange:i=>t({lead:i})}),e.layout==="closing"&&d.jsxs(d.Fragment,{children:[d.jsx(M,{label:"CTA label",value:(a=e.cta)==null?void 0:a.label,onChange:i=>t({cta:{...e.cta,label:i}})}),d.jsx(M,{label:"CTA link",value:(l=e.cta)==null?void 0:l.href,onChange:i=>t({cta:{...e.cta,href:i}})})]})]});case"section":return d.jsxs(d.Fragment,{children:[d.jsx(M,{label:"Number",value:e.number,onChange:i=>t({number:i})}),d.jsx(M,{label:"Eyebrow",value:e.eyebrow,onChange:i=>t({eyebrow:i})}),d.jsx(M,{label:"Heading",value:e.heading,onChange:i=>t({heading:i})}),d.jsx(We,{label:"Lead",value:e.lead,onChange:i=>t({lead:i})})]});case"two-column":return d.jsxs(d.Fragment,{children:[d.jsx(M,{label:"Eyebrow",value:e.eyebrow,onChange:i=>t({eyebrow:i})}),d.jsx(M,{label:"Heading",value:e.heading,onChange:i=>t({heading:i})}),d.jsx(We,{label:"Body",value:e.body,onChange:i=>t({body:i}),rows:5}),d.jsx(M,{label:"Image URL (data: URIs embed in PPTX)",value:e.image,onChange:i=>t({image:i})}),d.jsx(M,{label:"Image alt",value:e.imageAlt,onChange:i=>t({imageAlt:i})})]});case"image-hero":return d.jsxs(d.Fragment,{children:[d.jsx(M,{label:"Eyebrow",value:e.eyebrow,onChange:i=>t({eyebrow:i})}),d.jsx(M,{label:"Heading",value:e.heading,onChange:i=>t({heading:i})}),d.jsx(We,{label:"Lead",value:e.lead,onChange:i=>t({lead:i}),rows:3}),d.jsx(M,{label:"Image URL (data: URIs embed in PPTX)",value:e.image,onChange:i=>t({image:i})}),d.jsx(M,{label:"Image alt",value:e.imageAlt,onChange:i=>t({imageAlt:i})})]});case"comparison":return d.jsxs(d.Fragment,{children:[d.jsx(M,{label:"Eyebrow",value:e.eyebrow,onChange:i=>t({eyebrow:i})}),d.jsx(M,{label:"Heading",value:e.heading,onChange:i=>t({heading:i})}),d.jsx(M,{label:"Left label",value:e.leftLabel,onChange:i=>t({leftLabel:i})}),d.jsx(We,{label:"Left body",value:e.left,onChange:i=>t({left:i}),rows:4}),d.jsx(M,{label:"Right label",value:e.rightLabel,onChange:i=>t({rightLabel:i})}),d.jsx(We,{label:"Right body",value:e.right,onChange:i=>t({right:i}),rows:4})]});case"quote":return d.jsxs(d.Fragment,{children:[d.jsx(We,{label:"Quote",value:e.quote,onChange:i=>t({quote:i}),rows:4}),d.jsx(M,{label:"Attribution",value:e.by,onChange:i=>t({by:i})})]});case"feature-grid":return d.jsxs(d.Fragment,{children:[d.jsx(M,{label:"Eyebrow",value:e.eyebrow,onChange:i=>t({eyebrow:i})}),d.jsx(M,{label:"Heading",value:e.heading,onChange:i=>t({heading:i})}),d.jsx(L1,{label:"Columns",value:typeof e.columns=="number"?e.columns:3,options:[2,3,4],onChange:i=>t({columns:i})}),d.jsx(Dr,{label:"Cards",items:e.cards??[],onChange:i=>t({cards:i}),blank:()=>({title:"New card",body:""}),renderItem:(i,s)=>d.jsxs(d.Fragment,{children:[d.jsx(M,{label:"Icon (FontAwesome class)",value:i.icon,onChange:u=>s({...i,icon:u})}),d.jsx(M,{label:"Title",value:i.title,onChange:u=>s({...i,title:u})}),d.jsx(We,{label:"Body",value:i.body,onChange:u=>s({...i,body:u}),rows:2})]})})]});case"stat-row":return d.jsxs(d.Fragment,{children:[d.jsx(M,{label:"Eyebrow",value:e.eyebrow,onChange:i=>t({eyebrow:i})}),d.jsx(M,{label:"Heading",value:e.heading,onChange:i=>t({heading:i})}),d.jsx(Dr,{label:"Stats",items:e.stats??[],onChange:i=>t({stats:i}),blank:()=>({value:"0",label:"Metric"}),renderItem:(i,s)=>d.jsxs(d.Fragment,{children:[d.jsx(M,{label:"Value",value:i.value,onChange:u=>s({...i,value:u})}),d.jsx(M,{label:"Label",value:i.label,onChange:u=>s({...i,label:u})})]})})]});case"timeline":return d.jsxs(d.Fragment,{children:[d.jsx(M,{label:"Eyebrow",value:e.eyebrow,onChange:i=>t({eyebrow:i})}),d.jsx(M,{label:"Heading",value:e.heading,onChange:i=>t({heading:i})}),d.jsx(Dr,{label:"Steps",items:e.steps??[],onChange:i=>t({steps:i}),blank:()=>({title:"New step",body:""}),renderItem:(i,s)=>d.jsxs(d.Fragment,{children:[d.jsx(M,{label:"Title",value:i.title,onChange:u=>s({...i,title:u})}),d.jsx(We,{label:"Body",value:i.body,onChange:u=>s({...i,body:u}),rows:2})]})})]});case"data-table":return d.jsx(D1,{slide:e,set:t});default:return d.jsx("p",{className:"muted",children:"No editable fields for this layout."})}}}function D1({slide:e,set:n}){const t=Array.isArray(e.columns)?e.columns:[],r=Array.isArray(e.rows)?e.rows:[],o=Math.max(t.length,...r.map(s=>s.length),1),a=(s,u)=>{const f=t.slice();f[s]=u,n({columns:f})},l=()=>{n({columns:[...t,`Column ${t.length+1}`],rows:r.map(s=>[...s,""])})},i=s=>{n({columns:t.filter((u,f)=>f!==s),rows:r.map(u=>u.filter((f,h)=>h!==s))})};return d.jsxs(d.Fragment,{children:[d.jsx(M,{label:"Eyebrow",value:e.eyebrow,onChange:s=>n({eyebrow:s})}),d.jsx(M,{label:"Heading",value:e.heading,onChange:s=>n({heading:s})}),d.jsxs("div",{className:"list-editor",children:[d.jsxs("div",{className:"list-editor-head",children:[d.jsx("span",{className:"field-label",children:"Columns"}),d.jsx("button",{className:"btn btn-sm",onClick:l,children:"+ Column"})]}),Array.from({length:o}).map((s,u)=>d.jsxs("div",{className:"row-inline",children:[d.jsx("input",{className:"text-input",value:t[u]??"",placeholder:`Column ${u+1}`,onChange:f=>a(u,f.target.value)}),d.jsx("button",{className:"btn btn-icon btn-danger",title:"Remove column",onClick:()=>i(u),children:"✕"})]},u))]}),d.jsx(Dr,{label:"Rows",items:r,onChange:s=>n({rows:s}),blank:()=>Array.from({length:o},()=>""),renderItem:(s,u)=>d.jsx("div",{className:"row-cells",children:Array.from({length:o}).map((f,h)=>d.jsx("input",{className:"text-input",value:s[h]??"",placeholder:t[h]??`Col ${h+1}`,onChange:m=>{const v=s.slice();for(;v.length<o;)v.push("");v[h]=m.target.value,u(v)}},h))})})]})}function A1({html:e}){return d.jsx("div",{className:"preview",children:d.jsx("iframe",{className:"preview-frame",title:"Deck preview",srcDoc:e,sandbox:"allow-same-origin",referrerPolicy:"no-referrer"})})}const B1=`
html { scroll-behavior: smooth; scroll-snap-type: y mandatory; }
body { gap: 0 !important; padding: 0 !important; }
.slide { min-height: 100vh !important; margin: 0 !important; border-radius: 0 !important; scroll-snap-align: start !important; scroll-snap-stop: always !important; }
.pmd-attribution { display: none !important; }
`;function U1({html:e,slideCount:n,onClose:t}){const r=R.useRef(null),[o,a]=R.useState(0),l=e.replace("</head>",`<style>${B1}</style></head>`),i=s=>a(u=>Math.max(0,Math.min(n-1,u+s)));return R.useEffect(()=>{const s=u=>{u.key==="Escape"?t():u.key==="ArrowRight"||u.key===" "||u.key==="PageDown"?(u.preventDefault(),a(f=>Math.min(n-1,f+1))):(u.key==="ArrowLeft"||u.key==="PageUp")&&(u.preventDefault(),a(f=>Math.max(0,f-1)))};return window.addEventListener("keydown",s),()=>window.removeEventListener("keydown",s)},[t,n]),R.useEffect(()=>{var f,h;const s=(f=r.current)==null?void 0:f.contentDocument,u=s==null?void 0:s.querySelectorAll("section.slide");(h=u==null?void 0:u[o])==null||h.scrollIntoView({behavior:"smooth",block:"start"})},[o,l]),d.jsxs("div",{className:"present-overlay",children:[d.jsx("div",{className:"present-stage",children:d.jsx("iframe",{ref:r,className:"present-frame",title:"Present deck",srcDoc:l,sandbox:"allow-same-origin"})}),d.jsxs("div",{className:"present-bar",children:[d.jsx("button",{className:"btn btn-icon",title:"Previous (←)",onClick:()=>i(-1),children:"←"}),d.jsxs("span",{className:"present-count",children:[o+1," / ",n]}),d.jsx("button",{className:"btn btn-icon",title:"Next (→)",onClick:()=>i(1),children:"→"}),d.jsx("button",{className:"btn",onClick:t,children:"Exit · Esc"})]})]})}const ds=[{id:"claude-opus-4-8",label:"Opus 4.8 — most capable"},{id:"claude-sonnet-4-6",label:"Sonnet 4.6 — faster, cheaper"},{id:"claude-haiku-4-5",label:"Haiku 4.5 — fastest"}],Wg=`You author slide decks as a single JSON object matching this schema — the "Deck JSON" spec used by presentation-md.

Top level:
{ "type": "deck",
  "meta": { "title": string, "company"?: string, "description"?: string, "theme": string },
  "slides": Slide[] }

Every Slide has a "layout" and layout-specific fields. The eleven layouts:

- title        { layout, eyebrow?, heading, lead? }
- section      { layout, number, eyebrow?, heading, lead? }        // number like "01"
- two-column   { layout, heading, body, image?, imageAlt? }        // image is an https URL, optional
- image-hero   { layout, eyebrow?, heading, lead?, image, imageAlt? }  // full-bleed photo with caption overlay
- comparison   { layout, eyebrow?, heading?, leftLabel?, left, rightLabel?, right }  // before/after or vs
- feature-grid { layout, heading, columns, cards }                 // columns: 2|3|4; cards: [{ icon?, title, body }] (icon = a Font Awesome class e.g. "fa-solid fa-bolt")
- data-table   { layout, eyebrow?, heading, columns, rows }        // columns: string[]; rows: string[][] (each row = one string per column)
- stat-row     { layout, heading, stats }                          // stats: [{ value, label }] — value like "98%", "$1.2M"
- timeline     { layout, heading, steps }                          // steps: [{ title, body }]
- quote        { layout, quote, by? }
- closing      { layout, eyebrow?, heading, lead?, cta? }          // cta: { label, href } (href = https URL)

Authoring rules:
- Open with a "title" slide and end with a "closing" slide.
- 6–10 slides total. Use a mix of layouts that fits the content — section dividers for chapters, stat-row for metrics, data-table for tabular data, timeline for roadmaps, quote for a punchy line.
- Keep text tight and presentation-grade: headings are short, leads are one line, card/stat bodies are a phrase, not a paragraph.
- Prefer concrete, specific content over filler. No lorem ipsum.
- Only emit fields defined above. Do not invent new layouts or fields.`;function Hg(e,n){return`Create a deck for the following brief. Set meta.theme to "${n}".

Brief:
${e.trim()}`}function W1(e,n){return`${Wg}

${Hg(e,n)}

Respond with ONLY the JSON object — no prose, no markdown fences.`}function H1(e){const n=e.match(/```(?:json)?\s*([\s\S]*?)```/i),t=((n==null?void 0:n[1])??e).trim(),r=t.indexOf("{"),o=t.lastIndexOf("}");return r===-1||o===-1||o<r?t:t.slice(r,o+1)}async function V1(e){const{apiKey:n,model:t,brief:r,theme:o,signal:a}=e;if(!r.trim())throw new Error("Describe your deck first.");if(!n.trim())throw new Error("Enter your Anthropic API key.");const{default:l}=await Bg(async()=>{const{default:h}=await import("./index-BXnJRHAR.js");return{default:h}},__vite__mapDeps([2,1])),u=(await new l({apiKey:n.trim(),dangerouslyAllowBrowser:!0}).messages.create({model:t,max_tokens:8e3,system:Wg,messages:[{role:"user",content:`${Hg(r,o)}

Respond with ONLY the JSON object — no prose, no markdown fences.`}]},{signal:a})).content.map(h=>h.type==="text"?h.text:"").join("");if(!u.trim())throw new Error("The model returned an empty response. Try again.");let f;try{f=Yl(H1(u))}catch(h){throw new Error(`Couldn't parse the generated deck: ${h.message}`)}return f.meta={...f.meta,theme:o},f}const jr="pmd-studio-anthropic-key",Q1=["Q3 all-hands: momentum, key metrics, roadmap, and what's next.","Seed pitch for an AI-native analytics tool — problem, product, traction, ask.","Launch deck for a developer CLI: what it is, how it works, why it's fast."];function G1({currentTheme:e,onGenerate:n,onClose:t}){const[r,o]=R.useState(""),[a,l]=R.useState(e),[i,s]=R.useState(ds[0].id),[u,f]=R.useState(()=>localStorage.getItem(jr)??""),[h,m]=R.useState(()=>!!localStorage.getItem(jr)),[v,S]=R.useState(!1),[w,$]=R.useState(""),[p,c]=R.useState(!1),g=Ig(),x=async()=>{S(!0),$("Generating your deck…");try{h?localStorage.setItem(jr,u.trim()):localStorage.removeItem(jr);const b=await V1({apiKey:u,model:i,brief:r,theme:a});n(b),t()}catch(b){$(b.message)}finally{S(!1)}},y=async()=>{try{await navigator.clipboard.writeText(W1(r,a)),c(!0),setTimeout(()=>c(!1),1800)}catch{$("Couldn't copy — select the prompt manually.")}};return d.jsx("div",{className:"modal-overlay",onClick:t,children:d.jsxs("div",{className:"modal",onClick:b=>b.stopPropagation(),children:[d.jsxs("header",{className:"modal-head",children:[d.jsxs("div",{children:[d.jsx("strong",{children:"Generate a deck"}),d.jsx("span",{className:"muted small",children:"Describe it — get an editable deck in seconds."})]}),d.jsx("button",{className:"btn btn-sm",onClick:t,"aria-label":"Close",children:"✕"})]}),d.jsxs("div",{className:"modal-body",children:[d.jsx("label",{className:"field-label",children:"What's the deck about?"}),d.jsx("textarea",{className:"text-input brief-input",value:r,placeholder:"e.g. Q3 all-hands covering revenue, product wins, and the roadmap for next quarter.",rows:4,onChange:b=>o(b.target.value)}),d.jsx("div",{className:"chip-row",children:Q1.map(b=>d.jsx("button",{className:"chip",onClick:()=>o(b),title:"Use this brief",children:b.split(/[:—]/)[0].trim()},b))}),d.jsxs("div",{className:"field-grid",children:[d.jsxs("label",{className:"inline-field",children:[d.jsx("span",{className:"muted small",children:"Theme"}),d.jsx("select",{className:"text-input",value:a,onChange:b=>l(b.target.value),children:g.map(b=>d.jsx("option",{value:b,children:b},b))})]}),d.jsxs("label",{className:"inline-field",children:[d.jsx("span",{className:"muted small",children:"Model"}),d.jsx("select",{className:"text-input",value:i,onChange:b=>s(b.target.value),children:ds.map(b=>d.jsx("option",{value:b.id,children:b.label},b.id))})]})]}),d.jsxs("div",{className:"gen-panel",children:[d.jsx("label",{className:"field-label",children:"Your Anthropic API key"}),d.jsx("input",{className:"text-input",type:"password",value:u,placeholder:"sk-ant-…",autoComplete:"off",onChange:b=>f(b.target.value)}),d.jsxs("label",{className:"checkbox-field",children:[d.jsx("input",{type:"checkbox",checked:h,onChange:b=>m(b.target.checked)}),d.jsx("span",{className:"muted small",children:"Remember on this device (stored only in your browser)"})]}),d.jsxs("p",{className:"muted small privacy-note",children:["Your key stays in this browser. Requests go straight to Anthropic — nothing is sent to our servers. Get a key at ",d.jsx("a",{href:"https://console.anthropic.com/settings/keys",target:"_blank",rel:"noreferrer",children:"console.anthropic.com"}),"."]}),d.jsx("button",{className:"btn btn-primary btn-block",disabled:v,onClick:x,children:v?"Generating…":"Generate deck"})]}),d.jsx("div",{className:"gen-divider",children:d.jsx("span",{children:"or hand it to your agent"})}),d.jsxs("div",{className:"gen-panel",children:[d.jsx("p",{className:"muted small",children:"No key? Copy a ready-made prompt and paste it into Claude Code, Cursor, or any agent with the presentation skill installed — then open the resulting deck here."}),d.jsx("button",{className:"btn btn-block",onClick:y,disabled:!r.trim(),children:p?"Copied ✓":"Copy prompt for your agent"})]}),w&&d.jsx("p",{className:"status muted small gen-status",children:w})]})]})})}const Vg="pmd-studio-deck-v1";function K1(){try{const e=localStorage.getItem(Vg);if(e){const n=JSON.parse(e);if((n==null?void 0:n.type)==="deck"&&Array.isArray(n.slides)&&n.slides.length)return n}}catch{}return Cc}function Y1(){var v;const[e,n]=R.useState(K1),[t,r]=R.useState(0),[o,a]=R.useState(!1),[l,i]=R.useState(!1);R.useEffect(()=>{try{localStorage.setItem(Vg,JSON.stringify(e))}catch{}},[e]);const s=R.useMemo(()=>{var S;try{return Ag(e,Vl(((S=e.meta)==null?void 0:S.theme)??"default-tech"))}catch(w){return`<pre style="color:#d9695a;font-family:monospace;padding:24px">${String(w)}</pre>`}},[e]),u=(S,w)=>{n({...e,slides:S}),w!==void 0&&r(w)},f=S=>{n({...e,slides:e.slides.map((w,$)=>$===t?S:w)})},h=()=>{n(Cc),r(0)},m=e.slides[Math.min(t,e.slides.length-1)];return d.jsxs("div",{className:"app",children:[d.jsx(F1,{deck:e,onChange:n,onLoadExample:h,onPresent:()=>a(!0),onGenerate:()=>i(!0)}),d.jsxs("div",{className:"workspace",children:[d.jsx("aside",{className:"panel panel-left",children:d.jsx(I1,{slides:e.slides,selected:t,onSelect:r,onChange:u})}),d.jsx("main",{className:"panel panel-center",children:d.jsx(A1,{html:s})}),d.jsx("aside",{className:"panel panel-right",children:m?d.jsx(R1,{slide:m,onChange:f}):d.jsx("p",{className:"muted",children:"No slide selected."})})]}),o&&d.jsx(U1,{html:s,slideCount:e.slides.length,onClose:()=>a(!1)}),l&&d.jsx(G1,{currentTheme:((v=e.meta)==null?void 0:v.theme)??"claude",onGenerate:S=>{n(S),r(0)},onClose:()=>i(!1)})]})}const Qg=document.getElementById("root");if(!Qg)throw new Error("Missing #root element");_c(Qg).render(d.jsx(R.StrictMode,{children:d.jsx(Y1,{})}));export{Bg as _};
