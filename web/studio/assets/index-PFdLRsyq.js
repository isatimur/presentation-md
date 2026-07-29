const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-rT3NUMG4.js","assets/_commonjsHelpers-Cpj98o6Y.js","assets/index-BxVt1hOc.js"])))=>i.map(i=>d[i]);
(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const a of l.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(o){if(o.ep)return;o.ep=!0;const l=t(o);fetch(o.href,l)}})();var fs={exports:{}},fo={},ps={exports:{}},P={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var nr=Symbol.for("react.element"),$h=Symbol.for("react.portal"),Ph=Symbol.for("react.fragment"),zh=Symbol.for("react.strict_mode"),Lh=Symbol.for("react.profiler"),Mh=Symbol.for("react.provider"),Oh=Symbol.for("react.context"),Fh=Symbol.for("react.forward_ref"),Ih=Symbol.for("react.suspense"),Rh=Symbol.for("react.memo"),Dh=Symbol.for("react.lazy"),qa=Symbol.iterator;function Ah(e){return e===null||typeof e!="object"?null:(e=qa&&e[qa]||e["@@iterator"],typeof e=="function"?e:null)}var hs={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},gs=Object.assign,ms={};function ct(e,n,t){this.props=e,this.context=n,this.refs=ms,this.updater=t||hs}ct.prototype.isReactComponent={};ct.prototype.setState=function(e,n){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,n,"setState")};ct.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function ys(){}ys.prototype=ct.prototype;function Jl(e,n,t){this.props=e,this.context=n,this.refs=ms,this.updater=t||hs}var ql=Jl.prototype=new ys;ql.constructor=Jl;gs(ql,ct.prototype);ql.isPureReactComponent=!0;var Za=Array.isArray,vs=Object.prototype.hasOwnProperty,Zl={current:null},xs={key:!0,ref:!0,__self:!0,__source:!0};function ws(e,n,t){var r,o={},l=null,a=null;if(n!=null)for(r in n.ref!==void 0&&(a=n.ref),n.key!==void 0&&(l=""+n.key),n)vs.call(n,r)&&!xs.hasOwnProperty(r)&&(o[r]=n[r]);var i=arguments.length-2;if(i===1)o.children=t;else if(1<i){for(var s=Array(i),u=0;u<i;u++)s[u]=arguments[u+2];o.children=s}if(e&&e.defaultProps)for(r in i=e.defaultProps,i)o[r]===void 0&&(o[r]=i[r]);return{$$typeof:nr,type:e,key:l,ref:a,props:o,_owner:Zl.current}}function Uh(e,n){return{$$typeof:nr,type:e.type,key:n,ref:e.ref,props:e.props,_owner:e._owner}}function ea(e){return typeof e=="object"&&e!==null&&e.$$typeof===nr}function Bh(e){var n={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(t){return n[t]})}var ei=/\/+/g;function Po(e,n){return typeof e=="object"&&e!==null&&e.key!=null?Bh(""+e.key):n.toString(36)}function jr(e,n,t,r,o){var l=typeof e;(l==="undefined"||l==="boolean")&&(e=null);var a=!1;if(e===null)a=!0;else switch(l){case"string":case"number":a=!0;break;case"object":switch(e.$$typeof){case nr:case $h:a=!0}}if(a)return a=e,o=o(a),e=r===""?"."+Po(a,0):r,Za(o)?(t="",e!=null&&(t=e.replace(ei,"$&/")+"/"),jr(o,n,t,"",function(u){return u})):o!=null&&(ea(o)&&(o=Uh(o,t+(!o.key||a&&a.key===o.key?"":(""+o.key).replace(ei,"$&/")+"/")+e)),n.push(o)),1;if(a=0,r=r===""?".":r+":",Za(e))for(var i=0;i<e.length;i++){l=e[i];var s=r+Po(l,i);a+=jr(l,n,t,s,o)}else if(s=Ah(e),typeof s=="function")for(e=s.call(e),i=0;!(l=e.next()).done;)l=l.value,s=r+Po(l,i++),a+=jr(l,n,t,s,o);else if(l==="object")throw n=String(e),Error("Objects are not valid as a React child (found: "+(n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n)+"). If you meant to render a collection of children, use an array instead.");return a}function ur(e,n,t){if(e==null)return e;var r=[],o=0;return jr(e,r,"","",function(l){return n.call(t,l,o++)}),r}function Wh(e){if(e._status===-1){var n=e._result;n=n(),n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var ue={current:null},Nr={transition:null},Hh={ReactCurrentDispatcher:ue,ReactCurrentBatchConfig:Nr,ReactCurrentOwner:Zl};function ks(){throw Error("act(...) is not supported in production builds of React.")}P.Children={map:ur,forEach:function(e,n,t){ur(e,function(){n.apply(this,arguments)},t)},count:function(e){var n=0;return ur(e,function(){n++}),n},toArray:function(e){return ur(e,function(n){return n})||[]},only:function(e){if(!ea(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};P.Component=ct;P.Fragment=Ph;P.Profiler=Lh;P.PureComponent=Jl;P.StrictMode=zh;P.Suspense=Ih;P.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Hh;P.act=ks;P.cloneElement=function(e,n,t){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=gs({},e.props),o=e.key,l=e.ref,a=e._owner;if(n!=null){if(n.ref!==void 0&&(l=n.ref,a=Zl.current),n.key!==void 0&&(o=""+n.key),e.type&&e.type.defaultProps)var i=e.type.defaultProps;for(s in n)vs.call(n,s)&&!xs.hasOwnProperty(s)&&(r[s]=n[s]===void 0&&i!==void 0?i[s]:n[s])}var s=arguments.length-2;if(s===1)r.children=t;else if(1<s){i=Array(s);for(var u=0;u<s;u++)i[u]=arguments[u+2];r.children=i}return{$$typeof:nr,type:e.type,key:o,ref:l,props:r,_owner:a}};P.createContext=function(e){return e={$$typeof:Oh,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Mh,_context:e},e.Consumer=e};P.createElement=ws;P.createFactory=function(e){var n=ws.bind(null,e);return n.type=e,n};P.createRef=function(){return{current:null}};P.forwardRef=function(e){return{$$typeof:Fh,render:e}};P.isValidElement=ea;P.lazy=function(e){return{$$typeof:Dh,_payload:{_status:-1,_result:e},_init:Wh}};P.memo=function(e,n){return{$$typeof:Rh,type:e,compare:n===void 0?null:n}};P.startTransition=function(e){var n=Nr.transition;Nr.transition={};try{e()}finally{Nr.transition=n}};P.unstable_act=ks;P.useCallback=function(e,n){return ue.current.useCallback(e,n)};P.useContext=function(e){return ue.current.useContext(e)};P.useDebugValue=function(){};P.useDeferredValue=function(e){return ue.current.useDeferredValue(e)};P.useEffect=function(e,n){return ue.current.useEffect(e,n)};P.useId=function(){return ue.current.useId()};P.useImperativeHandle=function(e,n,t){return ue.current.useImperativeHandle(e,n,t)};P.useInsertionEffect=function(e,n){return ue.current.useInsertionEffect(e,n)};P.useLayoutEffect=function(e,n){return ue.current.useLayoutEffect(e,n)};P.useMemo=function(e,n){return ue.current.useMemo(e,n)};P.useReducer=function(e,n,t){return ue.current.useReducer(e,n,t)};P.useRef=function(e){return ue.current.useRef(e)};P.useState=function(e){return ue.current.useState(e)};P.useSyncExternalStore=function(e,n,t){return ue.current.useSyncExternalStore(e,n,t)};P.useTransition=function(){return ue.current.useTransition()};P.version="18.3.1";ps.exports=P;var R=ps.exports;/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Vh=R,Qh=Symbol.for("react.element"),Gh=Symbol.for("react.fragment"),Kh=Object.prototype.hasOwnProperty,Yh=Vh.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Xh={key:!0,ref:!0,__self:!0,__source:!0};function bs(e,n,t){var r,o={},l=null,a=null;t!==void 0&&(l=""+t),n.key!==void 0&&(l=""+n.key),n.ref!==void 0&&(a=n.ref);for(r in n)Kh.call(n,r)&&!Xh.hasOwnProperty(r)&&(o[r]=n[r]);if(e&&e.defaultProps)for(r in n=e.defaultProps,n)o[r]===void 0&&(o[r]=n[r]);return{$$typeof:Qh,type:e,key:l,ref:a,props:o,_owner:Yh.current}}fo.Fragment=Gh;fo.jsx=bs;fo.jsxs=bs;fs.exports=fo;var d=fs.exports,Ss={exports:{}},be={},_s={exports:{}},Cs={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function n(C,T){var $=C.length;C.push(T);e:for(;0<$;){var Q=$-1>>>1,J=C[Q];if(0<o(J,T))C[Q]=T,C[$]=J,$=Q;else break e}}function t(C){return C.length===0?null:C[0]}function r(C){if(C.length===0)return null;var T=C[0],$=C.pop();if($!==T){C[0]=$;e:for(var Q=0,J=C.length,ir=J>>>1;Q<ir;){var kn=2*(Q+1)-1,$o=C[kn],bn=kn+1,sr=C[bn];if(0>o($o,$))bn<J&&0>o(sr,$o)?(C[Q]=sr,C[bn]=$,Q=bn):(C[Q]=$o,C[kn]=$,Q=kn);else if(bn<J&&0>o(sr,$))C[Q]=sr,C[bn]=$,Q=bn;else break e}}return T}function o(C,T){var $=C.sortIndex-T.sortIndex;return $!==0?$:C.id-T.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;e.unstable_now=function(){return l.now()}}else{var a=Date,i=a.now();e.unstable_now=function(){return a.now()-i}}var s=[],u=[],f=1,h=null,m=3,v=!1,S=!1,w=!1,N=typeof setTimeout=="function"?setTimeout:null,p=typeof clearTimeout=="function"?clearTimeout:null,c=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function g(C){for(var T=t(u);T!==null;){if(T.callback===null)r(u);else if(T.startTime<=C)r(u),T.sortIndex=T.expirationTime,n(s,T);else break;T=t(u)}}function x(C){if(w=!1,g(C),!S)if(t(s)!==null)S=!0,No(y);else{var T=t(u);T!==null&&To(x,T.startTime-C)}}function y(C,T){S=!1,w&&(w=!1,p(E),E=-1),v=!0;var $=m;try{for(g(T),h=t(s);h!==null&&(!(h.expirationTime>T)||C&&!$e());){var Q=h.callback;if(typeof Q=="function"){h.callback=null,m=h.priorityLevel;var J=Q(h.expirationTime<=T);T=e.unstable_now(),typeof J=="function"?h.callback=J:h===t(s)&&r(s),g(T)}else r(s);h=t(s)}if(h!==null)var ir=!0;else{var kn=t(u);kn!==null&&To(x,kn.startTime-T),ir=!1}return ir}finally{h=null,m=$,v=!1}}var k=!1,j=null,E=-1,V=5,z=-1;function $e(){return!(e.unstable_now()-z<V)}function ht(){if(j!==null){var C=e.unstable_now();z=C;var T=!0;try{T=j(!0,C)}finally{T?gt():(k=!1,j=null)}}else k=!1}var gt;if(typeof c=="function")gt=function(){c(ht)};else if(typeof MessageChannel<"u"){var Ja=new MessageChannel,Th=Ja.port2;Ja.port1.onmessage=ht,gt=function(){Th.postMessage(null)}}else gt=function(){N(ht,0)};function No(C){j=C,k||(k=!0,gt())}function To(C,T){E=N(function(){C(e.unstable_now())},T)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(C){C.callback=null},e.unstable_continueExecution=function(){S||v||(S=!0,No(y))},e.unstable_forceFrameRate=function(C){0>C||125<C?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):V=0<C?Math.floor(1e3/C):5},e.unstable_getCurrentPriorityLevel=function(){return m},e.unstable_getFirstCallbackNode=function(){return t(s)},e.unstable_next=function(C){switch(m){case 1:case 2:case 3:var T=3;break;default:T=m}var $=m;m=T;try{return C()}finally{m=$}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(C,T){switch(C){case 1:case 2:case 3:case 4:case 5:break;default:C=3}var $=m;m=C;try{return T()}finally{m=$}},e.unstable_scheduleCallback=function(C,T,$){var Q=e.unstable_now();switch(typeof $=="object"&&$!==null?($=$.delay,$=typeof $=="number"&&0<$?Q+$:Q):$=Q,C){case 1:var J=-1;break;case 2:J=250;break;case 5:J=1073741823;break;case 4:J=1e4;break;default:J=5e3}return J=$+J,C={id:f++,callback:T,priorityLevel:C,startTime:$,expirationTime:J,sortIndex:-1},$>Q?(C.sortIndex=$,n(u,C),t(s)===null&&C===t(u)&&(w?(p(E),E=-1):w=!0,To(x,$-Q))):(C.sortIndex=J,n(s,C),S||v||(S=!0,No(y))),C},e.unstable_shouldYield=$e,e.unstable_wrapCallback=function(C){var T=m;return function(){var $=m;m=T;try{return C.apply(this,arguments)}finally{m=$}}}})(Cs);_s.exports=Cs;var Jh=_s.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var qh=R,ke=Jh;function b(e){for(var n="https://reactjs.org/docs/error-decoder.html?invariant="+e,t=1;t<arguments.length;t++)n+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Es=new Set,It={};function On(e,n){tt(e,n),tt(e+"Capture",n)}function tt(e,n){for(It[e]=n,e=0;e<n.length;e++)Es.add(n[e])}var Ye=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ol=Object.prototype.hasOwnProperty,Zh=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,ni={},ti={};function eg(e){return ol.call(ti,e)?!0:ol.call(ni,e)?!1:Zh.test(e)?ti[e]=!0:(ni[e]=!0,!1)}function ng(e,n,t,r){if(t!==null&&t.type===0)return!1;switch(typeof n){case"function":case"symbol":return!0;case"boolean":return r?!1:t!==null?!t.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function tg(e,n,t,r){if(n===null||typeof n>"u"||ng(e,n,t,r))return!0;if(r)return!1;if(t!==null)switch(t.type){case 3:return!n;case 4:return n===!1;case 5:return isNaN(n);case 6:return isNaN(n)||1>n}return!1}function ce(e,n,t,r,o,l,a){this.acceptsBooleans=n===2||n===3||n===4,this.attributeName=r,this.attributeNamespace=o,this.mustUseProperty=t,this.propertyName=e,this.type=n,this.sanitizeURL=l,this.removeEmptyString=a}var te={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){te[e]=new ce(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var n=e[0];te[n]=new ce(n,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){te[e]=new ce(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){te[e]=new ce(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){te[e]=new ce(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){te[e]=new ce(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){te[e]=new ce(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){te[e]=new ce(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){te[e]=new ce(e,5,!1,e.toLowerCase(),null,!1,!1)});var na=/[\-:]([a-z])/g;function ta(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var n=e.replace(na,ta);te[n]=new ce(n,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var n=e.replace(na,ta);te[n]=new ce(n,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var n=e.replace(na,ta);te[n]=new ce(n,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){te[e]=new ce(e,1,!1,e.toLowerCase(),null,!1,!1)});te.xlinkHref=new ce("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){te[e]=new ce(e,1,!1,e.toLowerCase(),null,!0,!0)});function ra(e,n,t,r){var o=te.hasOwnProperty(n)?te[n]:null;(o!==null?o.type!==0:r||!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(tg(n,t,o,r)&&(t=null),r||o===null?eg(n)&&(t===null?e.removeAttribute(n):e.setAttribute(n,""+t)):o.mustUseProperty?e[o.propertyName]=t===null?o.type===3?!1:"":t:(n=o.attributeName,r=o.attributeNamespace,t===null?e.removeAttribute(n):(o=o.type,t=o===3||o===4&&t===!0?"":""+t,r?e.setAttributeNS(r,n,t):e.setAttribute(n,t))))}var Ze=qh.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,cr=Symbol.for("react.element"),Rn=Symbol.for("react.portal"),Dn=Symbol.for("react.fragment"),oa=Symbol.for("react.strict_mode"),ll=Symbol.for("react.profiler"),js=Symbol.for("react.provider"),Ns=Symbol.for("react.context"),la=Symbol.for("react.forward_ref"),al=Symbol.for("react.suspense"),il=Symbol.for("react.suspense_list"),aa=Symbol.for("react.memo"),nn=Symbol.for("react.lazy"),Ts=Symbol.for("react.offscreen"),ri=Symbol.iterator;function mt(e){return e===null||typeof e!="object"?null:(e=ri&&e[ri]||e["@@iterator"],typeof e=="function"?e:null)}var W=Object.assign,zo;function _t(e){if(zo===void 0)try{throw Error()}catch(t){var n=t.stack.trim().match(/\n( *(at )?)/);zo=n&&n[1]||""}return`
`+zo+e}var Lo=!1;function Mo(e,n){if(!e||Lo)return"";Lo=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(n)if(n=function(){throw Error()},Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(n,[])}catch(u){var r=u}Reflect.construct(e,[],n)}else{try{n.call()}catch(u){r=u}e.call(n.prototype)}else{try{throw Error()}catch(u){r=u}e()}}catch(u){if(u&&r&&typeof u.stack=="string"){for(var o=u.stack.split(`
`),l=r.stack.split(`
`),a=o.length-1,i=l.length-1;1<=a&&0<=i&&o[a]!==l[i];)i--;for(;1<=a&&0<=i;a--,i--)if(o[a]!==l[i]){if(a!==1||i!==1)do if(a--,i--,0>i||o[a]!==l[i]){var s=`
`+o[a].replace(" at new "," at ");return e.displayName&&s.includes("<anonymous>")&&(s=s.replace("<anonymous>",e.displayName)),s}while(1<=a&&0<=i);break}}}finally{Lo=!1,Error.prepareStackTrace=t}return(e=e?e.displayName||e.name:"")?_t(e):""}function rg(e){switch(e.tag){case 5:return _t(e.type);case 16:return _t("Lazy");case 13:return _t("Suspense");case 19:return _t("SuspenseList");case 0:case 2:case 15:return e=Mo(e.type,!1),e;case 11:return e=Mo(e.type.render,!1),e;case 1:return e=Mo(e.type,!0),e;default:return""}}function sl(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Dn:return"Fragment";case Rn:return"Portal";case ll:return"Profiler";case oa:return"StrictMode";case al:return"Suspense";case il:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Ns:return(e.displayName||"Context")+".Consumer";case js:return(e._context.displayName||"Context")+".Provider";case la:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case aa:return n=e.displayName||null,n!==null?n:sl(e.type)||"Memo";case nn:n=e._payload,e=e._init;try{return sl(e(n))}catch{}}return null}function og(e){var n=e.type;switch(e.tag){case 24:return"Cache";case 9:return(n.displayName||"Context")+".Consumer";case 10:return(n._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=n.render,e=e.displayName||e.name||"",n.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return n;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return sl(n);case 8:return n===oa?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n}return null}function mn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function $s(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function lg(e){var n=$s(e)?"checked":"value",t=Object.getOwnPropertyDescriptor(e.constructor.prototype,n),r=""+e[n];if(!e.hasOwnProperty(n)&&typeof t<"u"&&typeof t.get=="function"&&typeof t.set=="function"){var o=t.get,l=t.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return o.call(this)},set:function(a){r=""+a,l.call(this,a)}}),Object.defineProperty(e,n,{enumerable:t.enumerable}),{getValue:function(){return r},setValue:function(a){r=""+a},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function dr(e){e._valueTracker||(e._valueTracker=lg(e))}function Ps(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var t=n.getValue(),r="";return e&&(r=$s(e)?e.checked?"true":"false":e.value),e=r,e!==t?(n.setValue(e),!0):!1}function Ar(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function ul(e,n){var t=n.checked;return W({},n,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:t??e._wrapperState.initialChecked})}function oi(e,n){var t=n.defaultValue==null?"":n.defaultValue,r=n.checked!=null?n.checked:n.defaultChecked;t=mn(n.value!=null?n.value:t),e._wrapperState={initialChecked:r,initialValue:t,controlled:n.type==="checkbox"||n.type==="radio"?n.checked!=null:n.value!=null}}function zs(e,n){n=n.checked,n!=null&&ra(e,"checked",n,!1)}function cl(e,n){zs(e,n);var t=mn(n.value),r=n.type;if(t!=null)r==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+t):e.value!==""+t&&(e.value=""+t);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}n.hasOwnProperty("value")?dl(e,n.type,t):n.hasOwnProperty("defaultValue")&&dl(e,n.type,mn(n.defaultValue)),n.checked==null&&n.defaultChecked!=null&&(e.defaultChecked=!!n.defaultChecked)}function li(e,n,t){if(n.hasOwnProperty("value")||n.hasOwnProperty("defaultValue")){var r=n.type;if(!(r!=="submit"&&r!=="reset"||n.value!==void 0&&n.value!==null))return;n=""+e._wrapperState.initialValue,t||n===e.value||(e.value=n),e.defaultValue=n}t=e.name,t!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,t!==""&&(e.name=t)}function dl(e,n,t){(n!=="number"||Ar(e.ownerDocument)!==e)&&(t==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+t&&(e.defaultValue=""+t))}var Ct=Array.isArray;function Xn(e,n,t,r){if(e=e.options,n){n={};for(var o=0;o<t.length;o++)n["$"+t[o]]=!0;for(t=0;t<e.length;t++)o=n.hasOwnProperty("$"+e[t].value),e[t].selected!==o&&(e[t].selected=o),o&&r&&(e[t].defaultSelected=!0)}else{for(t=""+mn(t),n=null,o=0;o<e.length;o++){if(e[o].value===t){e[o].selected=!0,r&&(e[o].defaultSelected=!0);return}n!==null||e[o].disabled||(n=e[o])}n!==null&&(n.selected=!0)}}function fl(e,n){if(n.dangerouslySetInnerHTML!=null)throw Error(b(91));return W({},n,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function ai(e,n){var t=n.value;if(t==null){if(t=n.children,n=n.defaultValue,t!=null){if(n!=null)throw Error(b(92));if(Ct(t)){if(1<t.length)throw Error(b(93));t=t[0]}n=t}n==null&&(n=""),t=n}e._wrapperState={initialValue:mn(t)}}function Ls(e,n){var t=mn(n.value),r=mn(n.defaultValue);t!=null&&(t=""+t,t!==e.value&&(e.value=t),n.defaultValue==null&&e.defaultValue!==t&&(e.defaultValue=t)),r!=null&&(e.defaultValue=""+r)}function ii(e){var n=e.textContent;n===e._wrapperState.initialValue&&n!==""&&n!==null&&(e.value=n)}function Ms(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function pl(e,n){return e==null||e==="http://www.w3.org/1999/xhtml"?Ms(n):e==="http://www.w3.org/2000/svg"&&n==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var fr,Os=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(n,t,r,o){MSApp.execUnsafeLocalFunction(function(){return e(n,t,r,o)})}:e}(function(e,n){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=n;else{for(fr=fr||document.createElement("div"),fr.innerHTML="<svg>"+n.valueOf().toString()+"</svg>",n=fr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;n.firstChild;)e.appendChild(n.firstChild)}});function Rt(e,n){if(n){var t=e.firstChild;if(t&&t===e.lastChild&&t.nodeType===3){t.nodeValue=n;return}}e.textContent=n}var Nt={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},ag=["Webkit","ms","Moz","O"];Object.keys(Nt).forEach(function(e){ag.forEach(function(n){n=n+e.charAt(0).toUpperCase()+e.substring(1),Nt[n]=Nt[e]})});function Fs(e,n,t){return n==null||typeof n=="boolean"||n===""?"":t||typeof n!="number"||n===0||Nt.hasOwnProperty(e)&&Nt[e]?(""+n).trim():n+"px"}function Is(e,n){e=e.style;for(var t in n)if(n.hasOwnProperty(t)){var r=t.indexOf("--")===0,o=Fs(t,n[t],r);t==="float"&&(t="cssFloat"),r?e.setProperty(t,o):e[t]=o}}var ig=W({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function hl(e,n){if(n){if(ig[e]&&(n.children!=null||n.dangerouslySetInnerHTML!=null))throw Error(b(137,e));if(n.dangerouslySetInnerHTML!=null){if(n.children!=null)throw Error(b(60));if(typeof n.dangerouslySetInnerHTML!="object"||!("__html"in n.dangerouslySetInnerHTML))throw Error(b(61))}if(n.style!=null&&typeof n.style!="object")throw Error(b(62))}}function gl(e,n){if(e.indexOf("-")===-1)return typeof n.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ml=null;function ia(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var yl=null,Jn=null,qn=null;function si(e){if(e=or(e)){if(typeof yl!="function")throw Error(b(280));var n=e.stateNode;n&&(n=yo(n),yl(e.stateNode,e.type,n))}}function Rs(e){Jn?qn?qn.push(e):qn=[e]:Jn=e}function Ds(){if(Jn){var e=Jn,n=qn;if(qn=Jn=null,si(e),n)for(e=0;e<n.length;e++)si(n[e])}}function As(e,n){return e(n)}function Us(){}var Oo=!1;function Bs(e,n,t){if(Oo)return e(n,t);Oo=!0;try{return As(e,n,t)}finally{Oo=!1,(Jn!==null||qn!==null)&&(Us(),Ds())}}function Dt(e,n){var t=e.stateNode;if(t===null)return null;var r=yo(t);if(r===null)return null;t=r[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(t&&typeof t!="function")throw Error(b(231,n,typeof t));return t}var vl=!1;if(Ye)try{var yt={};Object.defineProperty(yt,"passive",{get:function(){vl=!0}}),window.addEventListener("test",yt,yt),window.removeEventListener("test",yt,yt)}catch{vl=!1}function sg(e,n,t,r,o,l,a,i,s){var u=Array.prototype.slice.call(arguments,3);try{n.apply(t,u)}catch(f){this.onError(f)}}var Tt=!1,Ur=null,Br=!1,xl=null,ug={onError:function(e){Tt=!0,Ur=e}};function cg(e,n,t,r,o,l,a,i,s){Tt=!1,Ur=null,sg.apply(ug,arguments)}function dg(e,n,t,r,o,l,a,i,s){if(cg.apply(this,arguments),Tt){if(Tt){var u=Ur;Tt=!1,Ur=null}else throw Error(b(198));Br||(Br=!0,xl=u)}}function Fn(e){var n=e,t=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,n.flags&4098&&(t=n.return),e=n.return;while(e)}return n.tag===3?t:null}function Ws(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function ui(e){if(Fn(e)!==e)throw Error(b(188))}function fg(e){var n=e.alternate;if(!n){if(n=Fn(e),n===null)throw Error(b(188));return n!==e?null:e}for(var t=e,r=n;;){var o=t.return;if(o===null)break;var l=o.alternate;if(l===null){if(r=o.return,r!==null){t=r;continue}break}if(o.child===l.child){for(l=o.child;l;){if(l===t)return ui(o),e;if(l===r)return ui(o),n;l=l.sibling}throw Error(b(188))}if(t.return!==r.return)t=o,r=l;else{for(var a=!1,i=o.child;i;){if(i===t){a=!0,t=o,r=l;break}if(i===r){a=!0,r=o,t=l;break}i=i.sibling}if(!a){for(i=l.child;i;){if(i===t){a=!0,t=l,r=o;break}if(i===r){a=!0,r=l,t=o;break}i=i.sibling}if(!a)throw Error(b(189))}}if(t.alternate!==r)throw Error(b(190))}if(t.tag!==3)throw Error(b(188));return t.stateNode.current===t?e:n}function Hs(e){return e=fg(e),e!==null?Vs(e):null}function Vs(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var n=Vs(e);if(n!==null)return n;e=e.sibling}return null}var Qs=ke.unstable_scheduleCallback,ci=ke.unstable_cancelCallback,pg=ke.unstable_shouldYield,hg=ke.unstable_requestPaint,G=ke.unstable_now,gg=ke.unstable_getCurrentPriorityLevel,sa=ke.unstable_ImmediatePriority,Gs=ke.unstable_UserBlockingPriority,Wr=ke.unstable_NormalPriority,mg=ke.unstable_LowPriority,Ks=ke.unstable_IdlePriority,po=null,Ue=null;function yg(e){if(Ue&&typeof Ue.onCommitFiberRoot=="function")try{Ue.onCommitFiberRoot(po,e,void 0,(e.current.flags&128)===128)}catch{}}var Oe=Math.clz32?Math.clz32:wg,vg=Math.log,xg=Math.LN2;function wg(e){return e>>>=0,e===0?32:31-(vg(e)/xg|0)|0}var pr=64,hr=4194304;function Et(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Hr(e,n){var t=e.pendingLanes;if(t===0)return 0;var r=0,o=e.suspendedLanes,l=e.pingedLanes,a=t&268435455;if(a!==0){var i=a&~o;i!==0?r=Et(i):(l&=a,l!==0&&(r=Et(l)))}else a=t&~o,a!==0?r=Et(a):l!==0&&(r=Et(l));if(r===0)return 0;if(n!==0&&n!==r&&!(n&o)&&(o=r&-r,l=n&-n,o>=l||o===16&&(l&4194240)!==0))return n;if(r&4&&(r|=t&16),n=e.entangledLanes,n!==0)for(e=e.entanglements,n&=r;0<n;)t=31-Oe(n),o=1<<t,r|=e[t],n&=~o;return r}function kg(e,n){switch(e){case 1:case 2:case 4:return n+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function bg(e,n){for(var t=e.suspendedLanes,r=e.pingedLanes,o=e.expirationTimes,l=e.pendingLanes;0<l;){var a=31-Oe(l),i=1<<a,s=o[a];s===-1?(!(i&t)||i&r)&&(o[a]=kg(i,n)):s<=n&&(e.expiredLanes|=i),l&=~i}}function wl(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Ys(){var e=pr;return pr<<=1,!(pr&4194240)&&(pr=64),e}function Fo(e){for(var n=[],t=0;31>t;t++)n.push(e);return n}function tr(e,n,t){e.pendingLanes|=n,n!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,n=31-Oe(n),e[n]=t}function Sg(e,n){var t=e.pendingLanes&~n;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=n,e.mutableReadLanes&=n,e.entangledLanes&=n,n=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<t;){var o=31-Oe(t),l=1<<o;n[o]=0,r[o]=-1,e[o]=-1,t&=~l}}function ua(e,n){var t=e.entangledLanes|=n;for(e=e.entanglements;t;){var r=31-Oe(t),o=1<<r;o&n|e[r]&n&&(e[r]|=n),t&=~o}}var O=0;function Xs(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Js,ca,qs,Zs,eu,kl=!1,gr=[],sn=null,un=null,cn=null,At=new Map,Ut=new Map,rn=[],_g="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function di(e,n){switch(e){case"focusin":case"focusout":sn=null;break;case"dragenter":case"dragleave":un=null;break;case"mouseover":case"mouseout":cn=null;break;case"pointerover":case"pointerout":At.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ut.delete(n.pointerId)}}function vt(e,n,t,r,o,l){return e===null||e.nativeEvent!==l?(e={blockedOn:n,domEventName:t,eventSystemFlags:r,nativeEvent:l,targetContainers:[o]},n!==null&&(n=or(n),n!==null&&ca(n)),e):(e.eventSystemFlags|=r,n=e.targetContainers,o!==null&&n.indexOf(o)===-1&&n.push(o),e)}function Cg(e,n,t,r,o){switch(n){case"focusin":return sn=vt(sn,e,n,t,r,o),!0;case"dragenter":return un=vt(un,e,n,t,r,o),!0;case"mouseover":return cn=vt(cn,e,n,t,r,o),!0;case"pointerover":var l=o.pointerId;return At.set(l,vt(At.get(l)||null,e,n,t,r,o)),!0;case"gotpointercapture":return l=o.pointerId,Ut.set(l,vt(Ut.get(l)||null,e,n,t,r,o)),!0}return!1}function nu(e){var n=Cn(e.target);if(n!==null){var t=Fn(n);if(t!==null){if(n=t.tag,n===13){if(n=Ws(t),n!==null){e.blockedOn=n,eu(e.priority,function(){qs(t)});return}}else if(n===3&&t.stateNode.current.memoizedState.isDehydrated){e.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Tr(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var t=bl(e.domEventName,e.eventSystemFlags,n[0],e.nativeEvent);if(t===null){t=e.nativeEvent;var r=new t.constructor(t.type,t);ml=r,t.target.dispatchEvent(r),ml=null}else return n=or(t),n!==null&&ca(n),e.blockedOn=t,!1;n.shift()}return!0}function fi(e,n,t){Tr(e)&&t.delete(n)}function Eg(){kl=!1,sn!==null&&Tr(sn)&&(sn=null),un!==null&&Tr(un)&&(un=null),cn!==null&&Tr(cn)&&(cn=null),At.forEach(fi),Ut.forEach(fi)}function xt(e,n){e.blockedOn===n&&(e.blockedOn=null,kl||(kl=!0,ke.unstable_scheduleCallback(ke.unstable_NormalPriority,Eg)))}function Bt(e){function n(o){return xt(o,e)}if(0<gr.length){xt(gr[0],e);for(var t=1;t<gr.length;t++){var r=gr[t];r.blockedOn===e&&(r.blockedOn=null)}}for(sn!==null&&xt(sn,e),un!==null&&xt(un,e),cn!==null&&xt(cn,e),At.forEach(n),Ut.forEach(n),t=0;t<rn.length;t++)r=rn[t],r.blockedOn===e&&(r.blockedOn=null);for(;0<rn.length&&(t=rn[0],t.blockedOn===null);)nu(t),t.blockedOn===null&&rn.shift()}var Zn=Ze.ReactCurrentBatchConfig,Vr=!0;function jg(e,n,t,r){var o=O,l=Zn.transition;Zn.transition=null;try{O=1,da(e,n,t,r)}finally{O=o,Zn.transition=l}}function Ng(e,n,t,r){var o=O,l=Zn.transition;Zn.transition=null;try{O=4,da(e,n,t,r)}finally{O=o,Zn.transition=l}}function da(e,n,t,r){if(Vr){var o=bl(e,n,t,r);if(o===null)Qo(e,n,r,Qr,t),di(e,r);else if(Cg(o,e,n,t,r))r.stopPropagation();else if(di(e,r),n&4&&-1<_g.indexOf(e)){for(;o!==null;){var l=or(o);if(l!==null&&Js(l),l=bl(e,n,t,r),l===null&&Qo(e,n,r,Qr,t),l===o)break;o=l}o!==null&&r.stopPropagation()}else Qo(e,n,r,null,t)}}var Qr=null;function bl(e,n,t,r){if(Qr=null,e=ia(r),e=Cn(e),e!==null)if(n=Fn(e),n===null)e=null;else if(t=n.tag,t===13){if(e=Ws(n),e!==null)return e;e=null}else if(t===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null);return Qr=e,null}function tu(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(gg()){case sa:return 1;case Gs:return 4;case Wr:case mg:return 16;case Ks:return 536870912;default:return 16}default:return 16}}var ln=null,fa=null,$r=null;function ru(){if($r)return $r;var e,n=fa,t=n.length,r,o="value"in ln?ln.value:ln.textContent,l=o.length;for(e=0;e<t&&n[e]===o[e];e++);var a=t-e;for(r=1;r<=a&&n[t-r]===o[l-r];r++);return $r=o.slice(e,1<r?1-r:void 0)}function Pr(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function mr(){return!0}function pi(){return!1}function Se(e){function n(t,r,o,l,a){this._reactName=t,this._targetInst=o,this.type=r,this.nativeEvent=l,this.target=a,this.currentTarget=null;for(var i in e)e.hasOwnProperty(i)&&(t=e[i],this[i]=t?t(l):l[i]);return this.isDefaultPrevented=(l.defaultPrevented!=null?l.defaultPrevented:l.returnValue===!1)?mr:pi,this.isPropagationStopped=pi,this}return W(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=mr)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=mr)},persist:function(){},isPersistent:mr}),n}var dt={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},pa=Se(dt),rr=W({},dt,{view:0,detail:0}),Tg=Se(rr),Io,Ro,wt,ho=W({},rr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ha,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==wt&&(wt&&e.type==="mousemove"?(Io=e.screenX-wt.screenX,Ro=e.screenY-wt.screenY):Ro=Io=0,wt=e),Io)},movementY:function(e){return"movementY"in e?e.movementY:Ro}}),hi=Se(ho),$g=W({},ho,{dataTransfer:0}),Pg=Se($g),zg=W({},rr,{relatedTarget:0}),Do=Se(zg),Lg=W({},dt,{animationName:0,elapsedTime:0,pseudoElement:0}),Mg=Se(Lg),Og=W({},dt,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Fg=Se(Og),Ig=W({},dt,{data:0}),gi=Se(Ig),Rg={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Dg={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Ag={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Ug(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=Ag[e])?!!n[e]:!1}function ha(){return Ug}var Bg=W({},rr,{key:function(e){if(e.key){var n=Rg[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=Pr(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Dg[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ha,charCode:function(e){return e.type==="keypress"?Pr(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Pr(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Wg=Se(Bg),Hg=W({},ho,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),mi=Se(Hg),Vg=W({},rr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ha}),Qg=Se(Vg),Gg=W({},dt,{propertyName:0,elapsedTime:0,pseudoElement:0}),Kg=Se(Gg),Yg=W({},ho,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Xg=Se(Yg),Jg=[9,13,27,32],ga=Ye&&"CompositionEvent"in window,$t=null;Ye&&"documentMode"in document&&($t=document.documentMode);var qg=Ye&&"TextEvent"in window&&!$t,ou=Ye&&(!ga||$t&&8<$t&&11>=$t),yi=" ",vi=!1;function lu(e,n){switch(e){case"keyup":return Jg.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function au(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var An=!1;function Zg(e,n){switch(e){case"compositionend":return au(n);case"keypress":return n.which!==32?null:(vi=!0,yi);case"textInput":return e=n.data,e===yi&&vi?null:e;default:return null}}function em(e,n){if(An)return e==="compositionend"||!ga&&lu(e,n)?(e=ru(),$r=fa=ln=null,An=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return ou&&n.locale!=="ko"?null:n.data;default:return null}}var nm={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function xi(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!nm[e.type]:n==="textarea"}function iu(e,n,t,r){Rs(r),n=Gr(n,"onChange"),0<n.length&&(t=new pa("onChange","change",null,t,r),e.push({event:t,listeners:n}))}var Pt=null,Wt=null;function tm(e){vu(e,0)}function go(e){var n=Wn(e);if(Ps(n))return e}function rm(e,n){if(e==="change")return n}var su=!1;if(Ye){var Ao;if(Ye){var Uo="oninput"in document;if(!Uo){var wi=document.createElement("div");wi.setAttribute("oninput","return;"),Uo=typeof wi.oninput=="function"}Ao=Uo}else Ao=!1;su=Ao&&(!document.documentMode||9<document.documentMode)}function ki(){Pt&&(Pt.detachEvent("onpropertychange",uu),Wt=Pt=null)}function uu(e){if(e.propertyName==="value"&&go(Wt)){var n=[];iu(n,Wt,e,ia(e)),Bs(tm,n)}}function om(e,n,t){e==="focusin"?(ki(),Pt=n,Wt=t,Pt.attachEvent("onpropertychange",uu)):e==="focusout"&&ki()}function lm(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return go(Wt)}function am(e,n){if(e==="click")return go(n)}function im(e,n){if(e==="input"||e==="change")return go(n)}function sm(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var Ie=typeof Object.is=="function"?Object.is:sm;function Ht(e,n){if(Ie(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var t=Object.keys(e),r=Object.keys(n);if(t.length!==r.length)return!1;for(r=0;r<t.length;r++){var o=t[r];if(!ol.call(n,o)||!Ie(e[o],n[o]))return!1}return!0}function bi(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Si(e,n){var t=bi(e);e=0;for(var r;t;){if(t.nodeType===3){if(r=e+t.textContent.length,e<=n&&r>=n)return{node:t,offset:n-e};e=r}e:{for(;t;){if(t.nextSibling){t=t.nextSibling;break e}t=t.parentNode}t=void 0}t=bi(t)}}function cu(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?cu(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function du(){for(var e=window,n=Ar();n instanceof e.HTMLIFrameElement;){try{var t=typeof n.contentWindow.location.href=="string"}catch{t=!1}if(t)e=n.contentWindow;else break;n=Ar(e.document)}return n}function ma(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}function um(e){var n=du(),t=e.focusedElem,r=e.selectionRange;if(n!==t&&t&&t.ownerDocument&&cu(t.ownerDocument.documentElement,t)){if(r!==null&&ma(t)){if(n=r.start,e=r.end,e===void 0&&(e=n),"selectionStart"in t)t.selectionStart=n,t.selectionEnd=Math.min(e,t.value.length);else if(e=(n=t.ownerDocument||document)&&n.defaultView||window,e.getSelection){e=e.getSelection();var o=t.textContent.length,l=Math.min(r.start,o);r=r.end===void 0?l:Math.min(r.end,o),!e.extend&&l>r&&(o=r,r=l,l=o),o=Si(t,l);var a=Si(t,r);o&&a&&(e.rangeCount!==1||e.anchorNode!==o.node||e.anchorOffset!==o.offset||e.focusNode!==a.node||e.focusOffset!==a.offset)&&(n=n.createRange(),n.setStart(o.node,o.offset),e.removeAllRanges(),l>r?(e.addRange(n),e.extend(a.node,a.offset)):(n.setEnd(a.node,a.offset),e.addRange(n)))}}for(n=[],e=t;e=e.parentNode;)e.nodeType===1&&n.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof t.focus=="function"&&t.focus(),t=0;t<n.length;t++)e=n[t],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var cm=Ye&&"documentMode"in document&&11>=document.documentMode,Un=null,Sl=null,zt=null,_l=!1;function _i(e,n,t){var r=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;_l||Un==null||Un!==Ar(r)||(r=Un,"selectionStart"in r&&ma(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),zt&&Ht(zt,r)||(zt=r,r=Gr(Sl,"onSelect"),0<r.length&&(n=new pa("onSelect","select",null,n,t),e.push({event:n,listeners:r}),n.target=Un)))}function yr(e,n){var t={};return t[e.toLowerCase()]=n.toLowerCase(),t["Webkit"+e]="webkit"+n,t["Moz"+e]="moz"+n,t}var Bn={animationend:yr("Animation","AnimationEnd"),animationiteration:yr("Animation","AnimationIteration"),animationstart:yr("Animation","AnimationStart"),transitionend:yr("Transition","TransitionEnd")},Bo={},fu={};Ye&&(fu=document.createElement("div").style,"AnimationEvent"in window||(delete Bn.animationend.animation,delete Bn.animationiteration.animation,delete Bn.animationstart.animation),"TransitionEvent"in window||delete Bn.transitionend.transition);function mo(e){if(Bo[e])return Bo[e];if(!Bn[e])return e;var n=Bn[e],t;for(t in n)if(n.hasOwnProperty(t)&&t in fu)return Bo[e]=n[t];return e}var pu=mo("animationend"),hu=mo("animationiteration"),gu=mo("animationstart"),mu=mo("transitionend"),yu=new Map,Ci="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function vn(e,n){yu.set(e,n),On(n,[e])}for(var Wo=0;Wo<Ci.length;Wo++){var Ho=Ci[Wo],dm=Ho.toLowerCase(),fm=Ho[0].toUpperCase()+Ho.slice(1);vn(dm,"on"+fm)}vn(pu,"onAnimationEnd");vn(hu,"onAnimationIteration");vn(gu,"onAnimationStart");vn("dblclick","onDoubleClick");vn("focusin","onFocus");vn("focusout","onBlur");vn(mu,"onTransitionEnd");tt("onMouseEnter",["mouseout","mouseover"]);tt("onMouseLeave",["mouseout","mouseover"]);tt("onPointerEnter",["pointerout","pointerover"]);tt("onPointerLeave",["pointerout","pointerover"]);On("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));On("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));On("onBeforeInput",["compositionend","keypress","textInput","paste"]);On("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));On("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));On("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var jt="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),pm=new Set("cancel close invalid load scroll toggle".split(" ").concat(jt));function Ei(e,n,t){var r=e.type||"unknown-event";e.currentTarget=t,dg(r,n,void 0,e),e.currentTarget=null}function vu(e,n){n=(n&4)!==0;for(var t=0;t<e.length;t++){var r=e[t],o=r.event;r=r.listeners;e:{var l=void 0;if(n)for(var a=r.length-1;0<=a;a--){var i=r[a],s=i.instance,u=i.currentTarget;if(i=i.listener,s!==l&&o.isPropagationStopped())break e;Ei(o,i,u),l=s}else for(a=0;a<r.length;a++){if(i=r[a],s=i.instance,u=i.currentTarget,i=i.listener,s!==l&&o.isPropagationStopped())break e;Ei(o,i,u),l=s}}}if(Br)throw e=xl,Br=!1,xl=null,e}function I(e,n){var t=n[Tl];t===void 0&&(t=n[Tl]=new Set);var r=e+"__bubble";t.has(r)||(xu(n,e,2,!1),t.add(r))}function Vo(e,n,t){var r=0;n&&(r|=4),xu(t,e,r,n)}var vr="_reactListening"+Math.random().toString(36).slice(2);function Vt(e){if(!e[vr]){e[vr]=!0,Es.forEach(function(t){t!=="selectionchange"&&(pm.has(t)||Vo(t,!1,e),Vo(t,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[vr]||(n[vr]=!0,Vo("selectionchange",!1,n))}}function xu(e,n,t,r){switch(tu(n)){case 1:var o=jg;break;case 4:o=Ng;break;default:o=da}t=o.bind(null,n,t,e),o=void 0,!vl||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(o=!0),r?o!==void 0?e.addEventListener(n,t,{capture:!0,passive:o}):e.addEventListener(n,t,!0):o!==void 0?e.addEventListener(n,t,{passive:o}):e.addEventListener(n,t,!1)}function Qo(e,n,t,r,o){var l=r;if(!(n&1)&&!(n&2)&&r!==null)e:for(;;){if(r===null)return;var a=r.tag;if(a===3||a===4){var i=r.stateNode.containerInfo;if(i===o||i.nodeType===8&&i.parentNode===o)break;if(a===4)for(a=r.return;a!==null;){var s=a.tag;if((s===3||s===4)&&(s=a.stateNode.containerInfo,s===o||s.nodeType===8&&s.parentNode===o))return;a=a.return}for(;i!==null;){if(a=Cn(i),a===null)return;if(s=a.tag,s===5||s===6){r=l=a;continue e}i=i.parentNode}}r=r.return}Bs(function(){var u=l,f=ia(t),h=[];e:{var m=yu.get(e);if(m!==void 0){var v=pa,S=e;switch(e){case"keypress":if(Pr(t)===0)break e;case"keydown":case"keyup":v=Wg;break;case"focusin":S="focus",v=Do;break;case"focusout":S="blur",v=Do;break;case"beforeblur":case"afterblur":v=Do;break;case"click":if(t.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":v=hi;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":v=Pg;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":v=Qg;break;case pu:case hu:case gu:v=Mg;break;case mu:v=Kg;break;case"scroll":v=Tg;break;case"wheel":v=Xg;break;case"copy":case"cut":case"paste":v=Fg;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":v=mi}var w=(n&4)!==0,N=!w&&e==="scroll",p=w?m!==null?m+"Capture":null:m;w=[];for(var c=u,g;c!==null;){g=c;var x=g.stateNode;if(g.tag===5&&x!==null&&(g=x,p!==null&&(x=Dt(c,p),x!=null&&w.push(Qt(c,x,g)))),N)break;c=c.return}0<w.length&&(m=new v(m,S,null,t,f),h.push({event:m,listeners:w}))}}if(!(n&7)){e:{if(m=e==="mouseover"||e==="pointerover",v=e==="mouseout"||e==="pointerout",m&&t!==ml&&(S=t.relatedTarget||t.fromElement)&&(Cn(S)||S[Xe]))break e;if((v||m)&&(m=f.window===f?f:(m=f.ownerDocument)?m.defaultView||m.parentWindow:window,v?(S=t.relatedTarget||t.toElement,v=u,S=S?Cn(S):null,S!==null&&(N=Fn(S),S!==N||S.tag!==5&&S.tag!==6)&&(S=null)):(v=null,S=u),v!==S)){if(w=hi,x="onMouseLeave",p="onMouseEnter",c="mouse",(e==="pointerout"||e==="pointerover")&&(w=mi,x="onPointerLeave",p="onPointerEnter",c="pointer"),N=v==null?m:Wn(v),g=S==null?m:Wn(S),m=new w(x,c+"leave",v,t,f),m.target=N,m.relatedTarget=g,x=null,Cn(f)===u&&(w=new w(p,c+"enter",S,t,f),w.target=g,w.relatedTarget=N,x=w),N=x,v&&S)n:{for(w=v,p=S,c=0,g=w;g;g=In(g))c++;for(g=0,x=p;x;x=In(x))g++;for(;0<c-g;)w=In(w),c--;for(;0<g-c;)p=In(p),g--;for(;c--;){if(w===p||p!==null&&w===p.alternate)break n;w=In(w),p=In(p)}w=null}else w=null;v!==null&&ji(h,m,v,w,!1),S!==null&&N!==null&&ji(h,N,S,w,!0)}}e:{if(m=u?Wn(u):window,v=m.nodeName&&m.nodeName.toLowerCase(),v==="select"||v==="input"&&m.type==="file")var y=rm;else if(xi(m))if(su)y=im;else{y=lm;var k=om}else(v=m.nodeName)&&v.toLowerCase()==="input"&&(m.type==="checkbox"||m.type==="radio")&&(y=am);if(y&&(y=y(e,u))){iu(h,y,t,f);break e}k&&k(e,m,u),e==="focusout"&&(k=m._wrapperState)&&k.controlled&&m.type==="number"&&dl(m,"number",m.value)}switch(k=u?Wn(u):window,e){case"focusin":(xi(k)||k.contentEditable==="true")&&(Un=k,Sl=u,zt=null);break;case"focusout":zt=Sl=Un=null;break;case"mousedown":_l=!0;break;case"contextmenu":case"mouseup":case"dragend":_l=!1,_i(h,t,f);break;case"selectionchange":if(cm)break;case"keydown":case"keyup":_i(h,t,f)}var j;if(ga)e:{switch(e){case"compositionstart":var E="onCompositionStart";break e;case"compositionend":E="onCompositionEnd";break e;case"compositionupdate":E="onCompositionUpdate";break e}E=void 0}else An?lu(e,t)&&(E="onCompositionEnd"):e==="keydown"&&t.keyCode===229&&(E="onCompositionStart");E&&(ou&&t.locale!=="ko"&&(An||E!=="onCompositionStart"?E==="onCompositionEnd"&&An&&(j=ru()):(ln=f,fa="value"in ln?ln.value:ln.textContent,An=!0)),k=Gr(u,E),0<k.length&&(E=new gi(E,e,null,t,f),h.push({event:E,listeners:k}),j?E.data=j:(j=au(t),j!==null&&(E.data=j)))),(j=qg?Zg(e,t):em(e,t))&&(u=Gr(u,"onBeforeInput"),0<u.length&&(f=new gi("onBeforeInput","beforeinput",null,t,f),h.push({event:f,listeners:u}),f.data=j))}vu(h,n)})}function Qt(e,n,t){return{instance:e,listener:n,currentTarget:t}}function Gr(e,n){for(var t=n+"Capture",r=[];e!==null;){var o=e,l=o.stateNode;o.tag===5&&l!==null&&(o=l,l=Dt(e,t),l!=null&&r.unshift(Qt(e,l,o)),l=Dt(e,n),l!=null&&r.push(Qt(e,l,o))),e=e.return}return r}function In(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function ji(e,n,t,r,o){for(var l=n._reactName,a=[];t!==null&&t!==r;){var i=t,s=i.alternate,u=i.stateNode;if(s!==null&&s===r)break;i.tag===5&&u!==null&&(i=u,o?(s=Dt(t,l),s!=null&&a.unshift(Qt(t,s,i))):o||(s=Dt(t,l),s!=null&&a.push(Qt(t,s,i)))),t=t.return}a.length!==0&&e.push({event:n,listeners:a})}var hm=/\r\n?/g,gm=/\u0000|\uFFFD/g;function Ni(e){return(typeof e=="string"?e:""+e).replace(hm,`
`).replace(gm,"")}function xr(e,n,t){if(n=Ni(n),Ni(e)!==n&&t)throw Error(b(425))}function Kr(){}var Cl=null,El=null;function jl(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var Nl=typeof setTimeout=="function"?setTimeout:void 0,mm=typeof clearTimeout=="function"?clearTimeout:void 0,Ti=typeof Promise=="function"?Promise:void 0,ym=typeof queueMicrotask=="function"?queueMicrotask:typeof Ti<"u"?function(e){return Ti.resolve(null).then(e).catch(vm)}:Nl;function vm(e){setTimeout(function(){throw e})}function Go(e,n){var t=n,r=0;do{var o=t.nextSibling;if(e.removeChild(t),o&&o.nodeType===8)if(t=o.data,t==="/$"){if(r===0){e.removeChild(o),Bt(n);return}r--}else t!=="$"&&t!=="$?"&&t!=="$!"||r++;t=o}while(t);Bt(n)}function dn(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?")break;if(n==="/$")return null}}return e}function $i(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="$"||t==="$!"||t==="$?"){if(n===0)return e;n--}else t==="/$"&&n++}e=e.previousSibling}return null}var ft=Math.random().toString(36).slice(2),Ae="__reactFiber$"+ft,Gt="__reactProps$"+ft,Xe="__reactContainer$"+ft,Tl="__reactEvents$"+ft,xm="__reactListeners$"+ft,wm="__reactHandles$"+ft;function Cn(e){var n=e[Ae];if(n)return n;for(var t=e.parentNode;t;){if(n=t[Xe]||t[Ae]){if(t=n.alternate,n.child!==null||t!==null&&t.child!==null)for(e=$i(e);e!==null;){if(t=e[Ae])return t;e=$i(e)}return n}e=t,t=e.parentNode}return null}function or(e){return e=e[Ae]||e[Xe],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Wn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(b(33))}function yo(e){return e[Gt]||null}var $l=[],Hn=-1;function xn(e){return{current:e}}function D(e){0>Hn||(e.current=$l[Hn],$l[Hn]=null,Hn--)}function F(e,n){Hn++,$l[Hn]=e.current,e.current=n}var yn={},ae=xn(yn),he=xn(!1),$n=yn;function rt(e,n){var t=e.type.contextTypes;if(!t)return yn;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===n)return r.__reactInternalMemoizedMaskedChildContext;var o={},l;for(l in t)o[l]=n[l];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=n,e.__reactInternalMemoizedMaskedChildContext=o),o}function ge(e){return e=e.childContextTypes,e!=null}function Yr(){D(he),D(ae)}function Pi(e,n,t){if(ae.current!==yn)throw Error(b(168));F(ae,n),F(he,t)}function wu(e,n,t){var r=e.stateNode;if(n=n.childContextTypes,typeof r.getChildContext!="function")return t;r=r.getChildContext();for(var o in r)if(!(o in n))throw Error(b(108,og(e)||"Unknown",o));return W({},t,r)}function Xr(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||yn,$n=ae.current,F(ae,e),F(he,he.current),!0}function zi(e,n,t){var r=e.stateNode;if(!r)throw Error(b(169));t?(e=wu(e,n,$n),r.__reactInternalMemoizedMergedChildContext=e,D(he),D(ae),F(ae,e)):D(he),F(he,t)}var Ve=null,vo=!1,Ko=!1;function ku(e){Ve===null?Ve=[e]:Ve.push(e)}function km(e){vo=!0,ku(e)}function wn(){if(!Ko&&Ve!==null){Ko=!0;var e=0,n=O;try{var t=Ve;for(O=1;e<t.length;e++){var r=t[e];do r=r(!0);while(r!==null)}Ve=null,vo=!1}catch(o){throw Ve!==null&&(Ve=Ve.slice(e+1)),Qs(sa,wn),o}finally{O=n,Ko=!1}}return null}var Vn=[],Qn=0,Jr=null,qr=0,_e=[],Ce=0,Pn=null,Qe=1,Ge="";function Sn(e,n){Vn[Qn++]=qr,Vn[Qn++]=Jr,Jr=e,qr=n}function bu(e,n,t){_e[Ce++]=Qe,_e[Ce++]=Ge,_e[Ce++]=Pn,Pn=e;var r=Qe;e=Ge;var o=32-Oe(r)-1;r&=~(1<<o),t+=1;var l=32-Oe(n)+o;if(30<l){var a=o-o%5;l=(r&(1<<a)-1).toString(32),r>>=a,o-=a,Qe=1<<32-Oe(n)+o|t<<o|r,Ge=l+e}else Qe=1<<l|t<<o|r,Ge=e}function ya(e){e.return!==null&&(Sn(e,1),bu(e,1,0))}function va(e){for(;e===Jr;)Jr=Vn[--Qn],Vn[Qn]=null,qr=Vn[--Qn],Vn[Qn]=null;for(;e===Pn;)Pn=_e[--Ce],_e[Ce]=null,Ge=_e[--Ce],_e[Ce]=null,Qe=_e[--Ce],_e[Ce]=null}var we=null,xe=null,A=!1,Me=null;function Su(e,n){var t=Ee(5,null,null,0);t.elementType="DELETED",t.stateNode=n,t.return=e,n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)}function Li(e,n){switch(e.tag){case 5:var t=e.type;return n=n.nodeType!==1||t.toLowerCase()!==n.nodeName.toLowerCase()?null:n,n!==null?(e.stateNode=n,we=e,xe=dn(n.firstChild),!0):!1;case 6:return n=e.pendingProps===""||n.nodeType!==3?null:n,n!==null?(e.stateNode=n,we=e,xe=null,!0):!1;case 13:return n=n.nodeType!==8?null:n,n!==null?(t=Pn!==null?{id:Qe,overflow:Ge}:null,e.memoizedState={dehydrated:n,treeContext:t,retryLane:1073741824},t=Ee(18,null,null,0),t.stateNode=n,t.return=e,e.child=t,we=e,xe=null,!0):!1;default:return!1}}function Pl(e){return(e.mode&1)!==0&&(e.flags&128)===0}function zl(e){if(A){var n=xe;if(n){var t=n;if(!Li(e,n)){if(Pl(e))throw Error(b(418));n=dn(t.nextSibling);var r=we;n&&Li(e,n)?Su(r,t):(e.flags=e.flags&-4097|2,A=!1,we=e)}}else{if(Pl(e))throw Error(b(418));e.flags=e.flags&-4097|2,A=!1,we=e}}}function Mi(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;we=e}function wr(e){if(e!==we)return!1;if(!A)return Mi(e),A=!0,!1;var n;if((n=e.tag!==3)&&!(n=e.tag!==5)&&(n=e.type,n=n!=="head"&&n!=="body"&&!jl(e.type,e.memoizedProps)),n&&(n=xe)){if(Pl(e))throw _u(),Error(b(418));for(;n;)Su(e,n),n=dn(n.nextSibling)}if(Mi(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(b(317));e:{for(e=e.nextSibling,n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="/$"){if(n===0){xe=dn(e.nextSibling);break e}n--}else t!=="$"&&t!=="$!"&&t!=="$?"||n++}e=e.nextSibling}xe=null}}else xe=we?dn(e.stateNode.nextSibling):null;return!0}function _u(){for(var e=xe;e;)e=dn(e.nextSibling)}function ot(){xe=we=null,A=!1}function xa(e){Me===null?Me=[e]:Me.push(e)}var bm=Ze.ReactCurrentBatchConfig;function kt(e,n,t){if(e=t.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(t._owner){if(t=t._owner,t){if(t.tag!==1)throw Error(b(309));var r=t.stateNode}if(!r)throw Error(b(147,e));var o=r,l=""+e;return n!==null&&n.ref!==null&&typeof n.ref=="function"&&n.ref._stringRef===l?n.ref:(n=function(a){var i=o.refs;a===null?delete i[l]:i[l]=a},n._stringRef=l,n)}if(typeof e!="string")throw Error(b(284));if(!t._owner)throw Error(b(290,e))}return e}function kr(e,n){throw e=Object.prototype.toString.call(n),Error(b(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e))}function Oi(e){var n=e._init;return n(e._payload)}function Cu(e){function n(p,c){if(e){var g=p.deletions;g===null?(p.deletions=[c],p.flags|=16):g.push(c)}}function t(p,c){if(!e)return null;for(;c!==null;)n(p,c),c=c.sibling;return null}function r(p,c){for(p=new Map;c!==null;)c.key!==null?p.set(c.key,c):p.set(c.index,c),c=c.sibling;return p}function o(p,c){return p=gn(p,c),p.index=0,p.sibling=null,p}function l(p,c,g){return p.index=g,e?(g=p.alternate,g!==null?(g=g.index,g<c?(p.flags|=2,c):g):(p.flags|=2,c)):(p.flags|=1048576,c)}function a(p){return e&&p.alternate===null&&(p.flags|=2),p}function i(p,c,g,x){return c===null||c.tag!==6?(c=nl(g,p.mode,x),c.return=p,c):(c=o(c,g),c.return=p,c)}function s(p,c,g,x){var y=g.type;return y===Dn?f(p,c,g.props.children,x,g.key):c!==null&&(c.elementType===y||typeof y=="object"&&y!==null&&y.$$typeof===nn&&Oi(y)===c.type)?(x=o(c,g.props),x.ref=kt(p,c,g),x.return=p,x):(x=Rr(g.type,g.key,g.props,null,p.mode,x),x.ref=kt(p,c,g),x.return=p,x)}function u(p,c,g,x){return c===null||c.tag!==4||c.stateNode.containerInfo!==g.containerInfo||c.stateNode.implementation!==g.implementation?(c=tl(g,p.mode,x),c.return=p,c):(c=o(c,g.children||[]),c.return=p,c)}function f(p,c,g,x,y){return c===null||c.tag!==7?(c=Tn(g,p.mode,x,y),c.return=p,c):(c=o(c,g),c.return=p,c)}function h(p,c,g){if(typeof c=="string"&&c!==""||typeof c=="number")return c=nl(""+c,p.mode,g),c.return=p,c;if(typeof c=="object"&&c!==null){switch(c.$$typeof){case cr:return g=Rr(c.type,c.key,c.props,null,p.mode,g),g.ref=kt(p,null,c),g.return=p,g;case Rn:return c=tl(c,p.mode,g),c.return=p,c;case nn:var x=c._init;return h(p,x(c._payload),g)}if(Ct(c)||mt(c))return c=Tn(c,p.mode,g,null),c.return=p,c;kr(p,c)}return null}function m(p,c,g,x){var y=c!==null?c.key:null;if(typeof g=="string"&&g!==""||typeof g=="number")return y!==null?null:i(p,c,""+g,x);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case cr:return g.key===y?s(p,c,g,x):null;case Rn:return g.key===y?u(p,c,g,x):null;case nn:return y=g._init,m(p,c,y(g._payload),x)}if(Ct(g)||mt(g))return y!==null?null:f(p,c,g,x,null);kr(p,g)}return null}function v(p,c,g,x,y){if(typeof x=="string"&&x!==""||typeof x=="number")return p=p.get(g)||null,i(c,p,""+x,y);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case cr:return p=p.get(x.key===null?g:x.key)||null,s(c,p,x,y);case Rn:return p=p.get(x.key===null?g:x.key)||null,u(c,p,x,y);case nn:var k=x._init;return v(p,c,g,k(x._payload),y)}if(Ct(x)||mt(x))return p=p.get(g)||null,f(c,p,x,y,null);kr(c,x)}return null}function S(p,c,g,x){for(var y=null,k=null,j=c,E=c=0,V=null;j!==null&&E<g.length;E++){j.index>E?(V=j,j=null):V=j.sibling;var z=m(p,j,g[E],x);if(z===null){j===null&&(j=V);break}e&&j&&z.alternate===null&&n(p,j),c=l(z,c,E),k===null?y=z:k.sibling=z,k=z,j=V}if(E===g.length)return t(p,j),A&&Sn(p,E),y;if(j===null){for(;E<g.length;E++)j=h(p,g[E],x),j!==null&&(c=l(j,c,E),k===null?y=j:k.sibling=j,k=j);return A&&Sn(p,E),y}for(j=r(p,j);E<g.length;E++)V=v(j,p,E,g[E],x),V!==null&&(e&&V.alternate!==null&&j.delete(V.key===null?E:V.key),c=l(V,c,E),k===null?y=V:k.sibling=V,k=V);return e&&j.forEach(function($e){return n(p,$e)}),A&&Sn(p,E),y}function w(p,c,g,x){var y=mt(g);if(typeof y!="function")throw Error(b(150));if(g=y.call(g),g==null)throw Error(b(151));for(var k=y=null,j=c,E=c=0,V=null,z=g.next();j!==null&&!z.done;E++,z=g.next()){j.index>E?(V=j,j=null):V=j.sibling;var $e=m(p,j,z.value,x);if($e===null){j===null&&(j=V);break}e&&j&&$e.alternate===null&&n(p,j),c=l($e,c,E),k===null?y=$e:k.sibling=$e,k=$e,j=V}if(z.done)return t(p,j),A&&Sn(p,E),y;if(j===null){for(;!z.done;E++,z=g.next())z=h(p,z.value,x),z!==null&&(c=l(z,c,E),k===null?y=z:k.sibling=z,k=z);return A&&Sn(p,E),y}for(j=r(p,j);!z.done;E++,z=g.next())z=v(j,p,E,z.value,x),z!==null&&(e&&z.alternate!==null&&j.delete(z.key===null?E:z.key),c=l(z,c,E),k===null?y=z:k.sibling=z,k=z);return e&&j.forEach(function(ht){return n(p,ht)}),A&&Sn(p,E),y}function N(p,c,g,x){if(typeof g=="object"&&g!==null&&g.type===Dn&&g.key===null&&(g=g.props.children),typeof g=="object"&&g!==null){switch(g.$$typeof){case cr:e:{for(var y=g.key,k=c;k!==null;){if(k.key===y){if(y=g.type,y===Dn){if(k.tag===7){t(p,k.sibling),c=o(k,g.props.children),c.return=p,p=c;break e}}else if(k.elementType===y||typeof y=="object"&&y!==null&&y.$$typeof===nn&&Oi(y)===k.type){t(p,k.sibling),c=o(k,g.props),c.ref=kt(p,k,g),c.return=p,p=c;break e}t(p,k);break}else n(p,k);k=k.sibling}g.type===Dn?(c=Tn(g.props.children,p.mode,x,g.key),c.return=p,p=c):(x=Rr(g.type,g.key,g.props,null,p.mode,x),x.ref=kt(p,c,g),x.return=p,p=x)}return a(p);case Rn:e:{for(k=g.key;c!==null;){if(c.key===k)if(c.tag===4&&c.stateNode.containerInfo===g.containerInfo&&c.stateNode.implementation===g.implementation){t(p,c.sibling),c=o(c,g.children||[]),c.return=p,p=c;break e}else{t(p,c);break}else n(p,c);c=c.sibling}c=tl(g,p.mode,x),c.return=p,p=c}return a(p);case nn:return k=g._init,N(p,c,k(g._payload),x)}if(Ct(g))return S(p,c,g,x);if(mt(g))return w(p,c,g,x);kr(p,g)}return typeof g=="string"&&g!==""||typeof g=="number"?(g=""+g,c!==null&&c.tag===6?(t(p,c.sibling),c=o(c,g),c.return=p,p=c):(t(p,c),c=nl(g,p.mode,x),c.return=p,p=c),a(p)):t(p,c)}return N}var lt=Cu(!0),Eu=Cu(!1),Zr=xn(null),eo=null,Gn=null,wa=null;function ka(){wa=Gn=eo=null}function ba(e){var n=Zr.current;D(Zr),e._currentValue=n}function Ll(e,n,t){for(;e!==null;){var r=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,r!==null&&(r.childLanes|=n)):r!==null&&(r.childLanes&n)!==n&&(r.childLanes|=n),e===t)break;e=e.return}}function et(e,n){eo=e,wa=Gn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&n&&(pe=!0),e.firstContext=null)}function Ne(e){var n=e._currentValue;if(wa!==e)if(e={context:e,memoizedValue:n,next:null},Gn===null){if(eo===null)throw Error(b(308));Gn=e,eo.dependencies={lanes:0,firstContext:e}}else Gn=Gn.next=e;return n}var En=null;function Sa(e){En===null?En=[e]:En.push(e)}function ju(e,n,t,r){var o=n.interleaved;return o===null?(t.next=t,Sa(n)):(t.next=o.next,o.next=t),n.interleaved=t,Je(e,r)}function Je(e,n){e.lanes|=n;var t=e.alternate;for(t!==null&&(t.lanes|=n),t=e,e=e.return;e!==null;)e.childLanes|=n,t=e.alternate,t!==null&&(t.childLanes|=n),t=e,e=e.return;return t.tag===3?t.stateNode:null}var tn=!1;function _a(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Nu(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Ke(e,n){return{eventTime:e,lane:n,tag:0,payload:null,callback:null,next:null}}function fn(e,n,t){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,M&2){var o=r.pending;return o===null?n.next=n:(n.next=o.next,o.next=n),r.pending=n,Je(e,t)}return o=r.interleaved,o===null?(n.next=n,Sa(r)):(n.next=o.next,o.next=n),r.interleaved=n,Je(e,t)}function zr(e,n,t){if(n=n.updateQueue,n!==null&&(n=n.shared,(t&4194240)!==0)){var r=n.lanes;r&=e.pendingLanes,t|=r,n.lanes=t,ua(e,t)}}function Fi(e,n){var t=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,t===r)){var o=null,l=null;if(t=t.firstBaseUpdate,t!==null){do{var a={eventTime:t.eventTime,lane:t.lane,tag:t.tag,payload:t.payload,callback:t.callback,next:null};l===null?o=l=a:l=l.next=a,t=t.next}while(t!==null);l===null?o=l=n:l=l.next=n}else o=l=n;t={baseState:r.baseState,firstBaseUpdate:o,lastBaseUpdate:l,shared:r.shared,effects:r.effects},e.updateQueue=t;return}e=t.lastBaseUpdate,e===null?t.firstBaseUpdate=n:e.next=n,t.lastBaseUpdate=n}function no(e,n,t,r){var o=e.updateQueue;tn=!1;var l=o.firstBaseUpdate,a=o.lastBaseUpdate,i=o.shared.pending;if(i!==null){o.shared.pending=null;var s=i,u=s.next;s.next=null,a===null?l=u:a.next=u,a=s;var f=e.alternate;f!==null&&(f=f.updateQueue,i=f.lastBaseUpdate,i!==a&&(i===null?f.firstBaseUpdate=u:i.next=u,f.lastBaseUpdate=s))}if(l!==null){var h=o.baseState;a=0,f=u=s=null,i=l;do{var m=i.lane,v=i.eventTime;if((r&m)===m){f!==null&&(f=f.next={eventTime:v,lane:0,tag:i.tag,payload:i.payload,callback:i.callback,next:null});e:{var S=e,w=i;switch(m=n,v=t,w.tag){case 1:if(S=w.payload,typeof S=="function"){h=S.call(v,h,m);break e}h=S;break e;case 3:S.flags=S.flags&-65537|128;case 0:if(S=w.payload,m=typeof S=="function"?S.call(v,h,m):S,m==null)break e;h=W({},h,m);break e;case 2:tn=!0}}i.callback!==null&&i.lane!==0&&(e.flags|=64,m=o.effects,m===null?o.effects=[i]:m.push(i))}else v={eventTime:v,lane:m,tag:i.tag,payload:i.payload,callback:i.callback,next:null},f===null?(u=f=v,s=h):f=f.next=v,a|=m;if(i=i.next,i===null){if(i=o.shared.pending,i===null)break;m=i,i=m.next,m.next=null,o.lastBaseUpdate=m,o.shared.pending=null}}while(!0);if(f===null&&(s=h),o.baseState=s,o.firstBaseUpdate=u,o.lastBaseUpdate=f,n=o.shared.interleaved,n!==null){o=n;do a|=o.lane,o=o.next;while(o!==n)}else l===null&&(o.shared.lanes=0);Ln|=a,e.lanes=a,e.memoizedState=h}}function Ii(e,n,t){if(e=n.effects,n.effects=null,e!==null)for(n=0;n<e.length;n++){var r=e[n],o=r.callback;if(o!==null){if(r.callback=null,r=t,typeof o!="function")throw Error(b(191,o));o.call(r)}}}var lr={},Be=xn(lr),Kt=xn(lr),Yt=xn(lr);function jn(e){if(e===lr)throw Error(b(174));return e}function Ca(e,n){switch(F(Yt,n),F(Kt,e),F(Be,lr),e=n.nodeType,e){case 9:case 11:n=(n=n.documentElement)?n.namespaceURI:pl(null,"");break;default:e=e===8?n.parentNode:n,n=e.namespaceURI||null,e=e.tagName,n=pl(n,e)}D(Be),F(Be,n)}function at(){D(Be),D(Kt),D(Yt)}function Tu(e){jn(Yt.current);var n=jn(Be.current),t=pl(n,e.type);n!==t&&(F(Kt,e),F(Be,t))}function Ea(e){Kt.current===e&&(D(Be),D(Kt))}var U=xn(0);function to(e){for(var n=e;n!==null;){if(n.tag===13){var t=n.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||t.data==="$?"||t.data==="$!"))return n}else if(n.tag===19&&n.memoizedProps.revealOrder!==void 0){if(n.flags&128)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var Yo=[];function ja(){for(var e=0;e<Yo.length;e++)Yo[e]._workInProgressVersionPrimary=null;Yo.length=0}var Lr=Ze.ReactCurrentDispatcher,Xo=Ze.ReactCurrentBatchConfig,zn=0,B=null,Y=null,q=null,ro=!1,Lt=!1,Xt=0,Sm=0;function re(){throw Error(b(321))}function Na(e,n){if(n===null)return!1;for(var t=0;t<n.length&&t<e.length;t++)if(!Ie(e[t],n[t]))return!1;return!0}function Ta(e,n,t,r,o,l){if(zn=l,B=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,Lr.current=e===null||e.memoizedState===null?jm:Nm,e=t(r,o),Lt){l=0;do{if(Lt=!1,Xt=0,25<=l)throw Error(b(301));l+=1,q=Y=null,n.updateQueue=null,Lr.current=Tm,e=t(r,o)}while(Lt)}if(Lr.current=oo,n=Y!==null&&Y.next!==null,zn=0,q=Y=B=null,ro=!1,n)throw Error(b(300));return e}function $a(){var e=Xt!==0;return Xt=0,e}function De(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return q===null?B.memoizedState=q=e:q=q.next=e,q}function Te(){if(Y===null){var e=B.alternate;e=e!==null?e.memoizedState:null}else e=Y.next;var n=q===null?B.memoizedState:q.next;if(n!==null)q=n,Y=e;else{if(e===null)throw Error(b(310));Y=e,e={memoizedState:Y.memoizedState,baseState:Y.baseState,baseQueue:Y.baseQueue,queue:Y.queue,next:null},q===null?B.memoizedState=q=e:q=q.next=e}return q}function Jt(e,n){return typeof n=="function"?n(e):n}function Jo(e){var n=Te(),t=n.queue;if(t===null)throw Error(b(311));t.lastRenderedReducer=e;var r=Y,o=r.baseQueue,l=t.pending;if(l!==null){if(o!==null){var a=o.next;o.next=l.next,l.next=a}r.baseQueue=o=l,t.pending=null}if(o!==null){l=o.next,r=r.baseState;var i=a=null,s=null,u=l;do{var f=u.lane;if((zn&f)===f)s!==null&&(s=s.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),r=u.hasEagerState?u.eagerState:e(r,u.action);else{var h={lane:f,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};s===null?(i=s=h,a=r):s=s.next=h,B.lanes|=f,Ln|=f}u=u.next}while(u!==null&&u!==l);s===null?a=r:s.next=i,Ie(r,n.memoizedState)||(pe=!0),n.memoizedState=r,n.baseState=a,n.baseQueue=s,t.lastRenderedState=r}if(e=t.interleaved,e!==null){o=e;do l=o.lane,B.lanes|=l,Ln|=l,o=o.next;while(o!==e)}else o===null&&(t.lanes=0);return[n.memoizedState,t.dispatch]}function qo(e){var n=Te(),t=n.queue;if(t===null)throw Error(b(311));t.lastRenderedReducer=e;var r=t.dispatch,o=t.pending,l=n.memoizedState;if(o!==null){t.pending=null;var a=o=o.next;do l=e(l,a.action),a=a.next;while(a!==o);Ie(l,n.memoizedState)||(pe=!0),n.memoizedState=l,n.baseQueue===null&&(n.baseState=l),t.lastRenderedState=l}return[l,r]}function $u(){}function Pu(e,n){var t=B,r=Te(),o=n(),l=!Ie(r.memoizedState,o);if(l&&(r.memoizedState=o,pe=!0),r=r.queue,Pa(Mu.bind(null,t,r,e),[e]),r.getSnapshot!==n||l||q!==null&&q.memoizedState.tag&1){if(t.flags|=2048,qt(9,Lu.bind(null,t,r,o,n),void 0,null),Z===null)throw Error(b(349));zn&30||zu(t,n,o)}return o}function zu(e,n,t){e.flags|=16384,e={getSnapshot:n,value:t},n=B.updateQueue,n===null?(n={lastEffect:null,stores:null},B.updateQueue=n,n.stores=[e]):(t=n.stores,t===null?n.stores=[e]:t.push(e))}function Lu(e,n,t,r){n.value=t,n.getSnapshot=r,Ou(n)&&Fu(e)}function Mu(e,n,t){return t(function(){Ou(n)&&Fu(e)})}function Ou(e){var n=e.getSnapshot;e=e.value;try{var t=n();return!Ie(e,t)}catch{return!0}}function Fu(e){var n=Je(e,1);n!==null&&Fe(n,e,1,-1)}function Ri(e){var n=De();return typeof e=="function"&&(e=e()),n.memoizedState=n.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Jt,lastRenderedState:e},n.queue=e,e=e.dispatch=Em.bind(null,B,e),[n.memoizedState,e]}function qt(e,n,t,r){return e={tag:e,create:n,destroy:t,deps:r,next:null},n=B.updateQueue,n===null?(n={lastEffect:null,stores:null},B.updateQueue=n,n.lastEffect=e.next=e):(t=n.lastEffect,t===null?n.lastEffect=e.next=e:(r=t.next,t.next=e,e.next=r,n.lastEffect=e)),e}function Iu(){return Te().memoizedState}function Mr(e,n,t,r){var o=De();B.flags|=e,o.memoizedState=qt(1|n,t,void 0,r===void 0?null:r)}function xo(e,n,t,r){var o=Te();r=r===void 0?null:r;var l=void 0;if(Y!==null){var a=Y.memoizedState;if(l=a.destroy,r!==null&&Na(r,a.deps)){o.memoizedState=qt(n,t,l,r);return}}B.flags|=e,o.memoizedState=qt(1|n,t,l,r)}function Di(e,n){return Mr(8390656,8,e,n)}function Pa(e,n){return xo(2048,8,e,n)}function Ru(e,n){return xo(4,2,e,n)}function Du(e,n){return xo(4,4,e,n)}function Au(e,n){if(typeof n=="function")return e=e(),n(e),function(){n(null)};if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function Uu(e,n,t){return t=t!=null?t.concat([e]):null,xo(4,4,Au.bind(null,n,e),t)}function za(){}function Bu(e,n){var t=Te();n=n===void 0?null:n;var r=t.memoizedState;return r!==null&&n!==null&&Na(n,r[1])?r[0]:(t.memoizedState=[e,n],e)}function Wu(e,n){var t=Te();n=n===void 0?null:n;var r=t.memoizedState;return r!==null&&n!==null&&Na(n,r[1])?r[0]:(e=e(),t.memoizedState=[e,n],e)}function Hu(e,n,t){return zn&21?(Ie(t,n)||(t=Ys(),B.lanes|=t,Ln|=t,e.baseState=!0),n):(e.baseState&&(e.baseState=!1,pe=!0),e.memoizedState=t)}function _m(e,n){var t=O;O=t!==0&&4>t?t:4,e(!0);var r=Xo.transition;Xo.transition={};try{e(!1),n()}finally{O=t,Xo.transition=r}}function Vu(){return Te().memoizedState}function Cm(e,n,t){var r=hn(e);if(t={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null},Qu(e))Gu(n,t);else if(t=ju(e,n,t,r),t!==null){var o=se();Fe(t,e,r,o),Ku(t,n,r)}}function Em(e,n,t){var r=hn(e),o={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null};if(Qu(e))Gu(n,o);else{var l=e.alternate;if(e.lanes===0&&(l===null||l.lanes===0)&&(l=n.lastRenderedReducer,l!==null))try{var a=n.lastRenderedState,i=l(a,t);if(o.hasEagerState=!0,o.eagerState=i,Ie(i,a)){var s=n.interleaved;s===null?(o.next=o,Sa(n)):(o.next=s.next,s.next=o),n.interleaved=o;return}}catch{}finally{}t=ju(e,n,o,r),t!==null&&(o=se(),Fe(t,e,r,o),Ku(t,n,r))}}function Qu(e){var n=e.alternate;return e===B||n!==null&&n===B}function Gu(e,n){Lt=ro=!0;var t=e.pending;t===null?n.next=n:(n.next=t.next,t.next=n),e.pending=n}function Ku(e,n,t){if(t&4194240){var r=n.lanes;r&=e.pendingLanes,t|=r,n.lanes=t,ua(e,t)}}var oo={readContext:Ne,useCallback:re,useContext:re,useEffect:re,useImperativeHandle:re,useInsertionEffect:re,useLayoutEffect:re,useMemo:re,useReducer:re,useRef:re,useState:re,useDebugValue:re,useDeferredValue:re,useTransition:re,useMutableSource:re,useSyncExternalStore:re,useId:re,unstable_isNewReconciler:!1},jm={readContext:Ne,useCallback:function(e,n){return De().memoizedState=[e,n===void 0?null:n],e},useContext:Ne,useEffect:Di,useImperativeHandle:function(e,n,t){return t=t!=null?t.concat([e]):null,Mr(4194308,4,Au.bind(null,n,e),t)},useLayoutEffect:function(e,n){return Mr(4194308,4,e,n)},useInsertionEffect:function(e,n){return Mr(4,2,e,n)},useMemo:function(e,n){var t=De();return n=n===void 0?null:n,e=e(),t.memoizedState=[e,n],e},useReducer:function(e,n,t){var r=De();return n=t!==void 0?t(n):n,r.memoizedState=r.baseState=n,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:n},r.queue=e,e=e.dispatch=Cm.bind(null,B,e),[r.memoizedState,e]},useRef:function(e){var n=De();return e={current:e},n.memoizedState=e},useState:Ri,useDebugValue:za,useDeferredValue:function(e){return De().memoizedState=e},useTransition:function(){var e=Ri(!1),n=e[0];return e=_m.bind(null,e[1]),De().memoizedState=e,[n,e]},useMutableSource:function(){},useSyncExternalStore:function(e,n,t){var r=B,o=De();if(A){if(t===void 0)throw Error(b(407));t=t()}else{if(t=n(),Z===null)throw Error(b(349));zn&30||zu(r,n,t)}o.memoizedState=t;var l={value:t,getSnapshot:n};return o.queue=l,Di(Mu.bind(null,r,l,e),[e]),r.flags|=2048,qt(9,Lu.bind(null,r,l,t,n),void 0,null),t},useId:function(){var e=De(),n=Z.identifierPrefix;if(A){var t=Ge,r=Qe;t=(r&~(1<<32-Oe(r)-1)).toString(32)+t,n=":"+n+"R"+t,t=Xt++,0<t&&(n+="H"+t.toString(32)),n+=":"}else t=Sm++,n=":"+n+"r"+t.toString(32)+":";return e.memoizedState=n},unstable_isNewReconciler:!1},Nm={readContext:Ne,useCallback:Bu,useContext:Ne,useEffect:Pa,useImperativeHandle:Uu,useInsertionEffect:Ru,useLayoutEffect:Du,useMemo:Wu,useReducer:Jo,useRef:Iu,useState:function(){return Jo(Jt)},useDebugValue:za,useDeferredValue:function(e){var n=Te();return Hu(n,Y.memoizedState,e)},useTransition:function(){var e=Jo(Jt)[0],n=Te().memoizedState;return[e,n]},useMutableSource:$u,useSyncExternalStore:Pu,useId:Vu,unstable_isNewReconciler:!1},Tm={readContext:Ne,useCallback:Bu,useContext:Ne,useEffect:Pa,useImperativeHandle:Uu,useInsertionEffect:Ru,useLayoutEffect:Du,useMemo:Wu,useReducer:qo,useRef:Iu,useState:function(){return qo(Jt)},useDebugValue:za,useDeferredValue:function(e){var n=Te();return Y===null?n.memoizedState=e:Hu(n,Y.memoizedState,e)},useTransition:function(){var e=qo(Jt)[0],n=Te().memoizedState;return[e,n]},useMutableSource:$u,useSyncExternalStore:Pu,useId:Vu,unstable_isNewReconciler:!1};function ze(e,n){if(e&&e.defaultProps){n=W({},n),e=e.defaultProps;for(var t in e)n[t]===void 0&&(n[t]=e[t]);return n}return n}function Ml(e,n,t,r){n=e.memoizedState,t=t(r,n),t=t==null?n:W({},n,t),e.memoizedState=t,e.lanes===0&&(e.updateQueue.baseState=t)}var wo={isMounted:function(e){return(e=e._reactInternals)?Fn(e)===e:!1},enqueueSetState:function(e,n,t){e=e._reactInternals;var r=se(),o=hn(e),l=Ke(r,o);l.payload=n,t!=null&&(l.callback=t),n=fn(e,l,o),n!==null&&(Fe(n,e,o,r),zr(n,e,o))},enqueueReplaceState:function(e,n,t){e=e._reactInternals;var r=se(),o=hn(e),l=Ke(r,o);l.tag=1,l.payload=n,t!=null&&(l.callback=t),n=fn(e,l,o),n!==null&&(Fe(n,e,o,r),zr(n,e,o))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var t=se(),r=hn(e),o=Ke(t,r);o.tag=2,n!=null&&(o.callback=n),n=fn(e,o,r),n!==null&&(Fe(n,e,r,t),zr(n,e,r))}};function Ai(e,n,t,r,o,l,a){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,l,a):n.prototype&&n.prototype.isPureReactComponent?!Ht(t,r)||!Ht(o,l):!0}function Yu(e,n,t){var r=!1,o=yn,l=n.contextType;return typeof l=="object"&&l!==null?l=Ne(l):(o=ge(n)?$n:ae.current,r=n.contextTypes,l=(r=r!=null)?rt(e,o):yn),n=new n(t,l),e.memoizedState=n.state!==null&&n.state!==void 0?n.state:null,n.updater=wo,e.stateNode=n,n._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=o,e.__reactInternalMemoizedMaskedChildContext=l),n}function Ui(e,n,t,r){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(t,r),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(t,r),n.state!==e&&wo.enqueueReplaceState(n,n.state,null)}function Ol(e,n,t,r){var o=e.stateNode;o.props=t,o.state=e.memoizedState,o.refs={},_a(e);var l=n.contextType;typeof l=="object"&&l!==null?o.context=Ne(l):(l=ge(n)?$n:ae.current,o.context=rt(e,l)),o.state=e.memoizedState,l=n.getDerivedStateFromProps,typeof l=="function"&&(Ml(e,n,l,t),o.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(n=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),n!==o.state&&wo.enqueueReplaceState(o,o.state,null),no(e,t,o,r),o.state=e.memoizedState),typeof o.componentDidMount=="function"&&(e.flags|=4194308)}function it(e,n){try{var t="",r=n;do t+=rg(r),r=r.return;while(r);var o=t}catch(l){o=`
Error generating stack: `+l.message+`
`+l.stack}return{value:e,source:n,stack:o,digest:null}}function Zo(e,n,t){return{value:e,source:null,stack:t??null,digest:n??null}}function Fl(e,n){try{console.error(n.value)}catch(t){setTimeout(function(){throw t})}}var $m=typeof WeakMap=="function"?WeakMap:Map;function Xu(e,n,t){t=Ke(-1,t),t.tag=3,t.payload={element:null};var r=n.value;return t.callback=function(){ao||(ao=!0,Ql=r),Fl(e,n)},t}function Ju(e,n,t){t=Ke(-1,t),t.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var o=n.value;t.payload=function(){return r(o)},t.callback=function(){Fl(e,n)}}var l=e.stateNode;return l!==null&&typeof l.componentDidCatch=="function"&&(t.callback=function(){Fl(e,n),typeof r!="function"&&(pn===null?pn=new Set([this]):pn.add(this));var a=n.stack;this.componentDidCatch(n.value,{componentStack:a!==null?a:""})}),t}function Bi(e,n,t){var r=e.pingCache;if(r===null){r=e.pingCache=new $m;var o=new Set;r.set(n,o)}else o=r.get(n),o===void 0&&(o=new Set,r.set(n,o));o.has(t)||(o.add(t),e=Hm.bind(null,e,n,t),n.then(e,e))}function Wi(e){do{var n;if((n=e.tag===13)&&(n=e.memoizedState,n=n!==null?n.dehydrated!==null:!0),n)return e;e=e.return}while(e!==null);return null}function Hi(e,n,t,r,o){return e.mode&1?(e.flags|=65536,e.lanes=o,e):(e===n?e.flags|=65536:(e.flags|=128,t.flags|=131072,t.flags&=-52805,t.tag===1&&(t.alternate===null?t.tag=17:(n=Ke(-1,1),n.tag=2,fn(t,n,1))),t.lanes|=1),e)}var Pm=Ze.ReactCurrentOwner,pe=!1;function ie(e,n,t,r){n.child=e===null?Eu(n,null,t,r):lt(n,e.child,t,r)}function Vi(e,n,t,r,o){t=t.render;var l=n.ref;return et(n,o),r=Ta(e,n,t,r,l,o),t=$a(),e!==null&&!pe?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~o,qe(e,n,o)):(A&&t&&ya(n),n.flags|=1,ie(e,n,r,o),n.child)}function Qi(e,n,t,r,o){if(e===null){var l=t.type;return typeof l=="function"&&!Aa(l)&&l.defaultProps===void 0&&t.compare===null&&t.defaultProps===void 0?(n.tag=15,n.type=l,qu(e,n,l,r,o)):(e=Rr(t.type,null,r,n,n.mode,o),e.ref=n.ref,e.return=n,n.child=e)}if(l=e.child,!(e.lanes&o)){var a=l.memoizedProps;if(t=t.compare,t=t!==null?t:Ht,t(a,r)&&e.ref===n.ref)return qe(e,n,o)}return n.flags|=1,e=gn(l,r),e.ref=n.ref,e.return=n,n.child=e}function qu(e,n,t,r,o){if(e!==null){var l=e.memoizedProps;if(Ht(l,r)&&e.ref===n.ref)if(pe=!1,n.pendingProps=r=l,(e.lanes&o)!==0)e.flags&131072&&(pe=!0);else return n.lanes=e.lanes,qe(e,n,o)}return Il(e,n,t,r,o)}function Zu(e,n,t){var r=n.pendingProps,o=r.children,l=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(n.mode&1))n.memoizedState={baseLanes:0,cachePool:null,transitions:null},F(Yn,ve),ve|=t;else{if(!(t&1073741824))return e=l!==null?l.baseLanes|t:t,n.lanes=n.childLanes=1073741824,n.memoizedState={baseLanes:e,cachePool:null,transitions:null},n.updateQueue=null,F(Yn,ve),ve|=e,null;n.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=l!==null?l.baseLanes:t,F(Yn,ve),ve|=r}else l!==null?(r=l.baseLanes|t,n.memoizedState=null):r=t,F(Yn,ve),ve|=r;return ie(e,n,o,t),n.child}function ec(e,n){var t=n.ref;(e===null&&t!==null||e!==null&&e.ref!==t)&&(n.flags|=512,n.flags|=2097152)}function Il(e,n,t,r,o){var l=ge(t)?$n:ae.current;return l=rt(n,l),et(n,o),t=Ta(e,n,t,r,l,o),r=$a(),e!==null&&!pe?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~o,qe(e,n,o)):(A&&r&&ya(n),n.flags|=1,ie(e,n,t,o),n.child)}function Gi(e,n,t,r,o){if(ge(t)){var l=!0;Xr(n)}else l=!1;if(et(n,o),n.stateNode===null)Or(e,n),Yu(n,t,r),Ol(n,t,r,o),r=!0;else if(e===null){var a=n.stateNode,i=n.memoizedProps;a.props=i;var s=a.context,u=t.contextType;typeof u=="object"&&u!==null?u=Ne(u):(u=ge(t)?$n:ae.current,u=rt(n,u));var f=t.getDerivedStateFromProps,h=typeof f=="function"||typeof a.getSnapshotBeforeUpdate=="function";h||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(i!==r||s!==u)&&Ui(n,a,r,u),tn=!1;var m=n.memoizedState;a.state=m,no(n,r,a,o),s=n.memoizedState,i!==r||m!==s||he.current||tn?(typeof f=="function"&&(Ml(n,t,f,r),s=n.memoizedState),(i=tn||Ai(n,t,i,r,m,s,u))?(h||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(n.flags|=4194308)):(typeof a.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=r,n.memoizedState=s),a.props=r,a.state=s,a.context=u,r=i):(typeof a.componentDidMount=="function"&&(n.flags|=4194308),r=!1)}else{a=n.stateNode,Nu(e,n),i=n.memoizedProps,u=n.type===n.elementType?i:ze(n.type,i),a.props=u,h=n.pendingProps,m=a.context,s=t.contextType,typeof s=="object"&&s!==null?s=Ne(s):(s=ge(t)?$n:ae.current,s=rt(n,s));var v=t.getDerivedStateFromProps;(f=typeof v=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(i!==h||m!==s)&&Ui(n,a,r,s),tn=!1,m=n.memoizedState,a.state=m,no(n,r,a,o);var S=n.memoizedState;i!==h||m!==S||he.current||tn?(typeof v=="function"&&(Ml(n,t,v,r),S=n.memoizedState),(u=tn||Ai(n,t,u,r,m,S,s)||!1)?(f||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(r,S,s),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(r,S,s)),typeof a.componentDidUpdate=="function"&&(n.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof a.componentDidUpdate!="function"||i===e.memoizedProps&&m===e.memoizedState||(n.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||i===e.memoizedProps&&m===e.memoizedState||(n.flags|=1024),n.memoizedProps=r,n.memoizedState=S),a.props=r,a.state=S,a.context=s,r=u):(typeof a.componentDidUpdate!="function"||i===e.memoizedProps&&m===e.memoizedState||(n.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||i===e.memoizedProps&&m===e.memoizedState||(n.flags|=1024),r=!1)}return Rl(e,n,t,r,l,o)}function Rl(e,n,t,r,o,l){ec(e,n);var a=(n.flags&128)!==0;if(!r&&!a)return o&&zi(n,t,!1),qe(e,n,l);r=n.stateNode,Pm.current=n;var i=a&&typeof t.getDerivedStateFromError!="function"?null:r.render();return n.flags|=1,e!==null&&a?(n.child=lt(n,e.child,null,l),n.child=lt(n,null,i,l)):ie(e,n,i,l),n.memoizedState=r.state,o&&zi(n,t,!0),n.child}function nc(e){var n=e.stateNode;n.pendingContext?Pi(e,n.pendingContext,n.pendingContext!==n.context):n.context&&Pi(e,n.context,!1),Ca(e,n.containerInfo)}function Ki(e,n,t,r,o){return ot(),xa(o),n.flags|=256,ie(e,n,t,r),n.child}var Dl={dehydrated:null,treeContext:null,retryLane:0};function Al(e){return{baseLanes:e,cachePool:null,transitions:null}}function tc(e,n,t){var r=n.pendingProps,o=U.current,l=!1,a=(n.flags&128)!==0,i;if((i=a)||(i=e!==null&&e.memoizedState===null?!1:(o&2)!==0),i?(l=!0,n.flags&=-129):(e===null||e.memoizedState!==null)&&(o|=1),F(U,o&1),e===null)return zl(n),e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(n.mode&1?e.data==="$!"?n.lanes=8:n.lanes=1073741824:n.lanes=1,null):(a=r.children,e=r.fallback,l?(r=n.mode,l=n.child,a={mode:"hidden",children:a},!(r&1)&&l!==null?(l.childLanes=0,l.pendingProps=a):l=So(a,r,0,null),e=Tn(e,r,t,null),l.return=n,e.return=n,l.sibling=e,n.child=l,n.child.memoizedState=Al(t),n.memoizedState=Dl,e):La(n,a));if(o=e.memoizedState,o!==null&&(i=o.dehydrated,i!==null))return zm(e,n,a,r,i,o,t);if(l){l=r.fallback,a=n.mode,o=e.child,i=o.sibling;var s={mode:"hidden",children:r.children};return!(a&1)&&n.child!==o?(r=n.child,r.childLanes=0,r.pendingProps=s,n.deletions=null):(r=gn(o,s),r.subtreeFlags=o.subtreeFlags&14680064),i!==null?l=gn(i,l):(l=Tn(l,a,t,null),l.flags|=2),l.return=n,r.return=n,r.sibling=l,n.child=r,r=l,l=n.child,a=e.child.memoizedState,a=a===null?Al(t):{baseLanes:a.baseLanes|t,cachePool:null,transitions:a.transitions},l.memoizedState=a,l.childLanes=e.childLanes&~t,n.memoizedState=Dl,r}return l=e.child,e=l.sibling,r=gn(l,{mode:"visible",children:r.children}),!(n.mode&1)&&(r.lanes=t),r.return=n,r.sibling=null,e!==null&&(t=n.deletions,t===null?(n.deletions=[e],n.flags|=16):t.push(e)),n.child=r,n.memoizedState=null,r}function La(e,n){return n=So({mode:"visible",children:n},e.mode,0,null),n.return=e,e.child=n}function br(e,n,t,r){return r!==null&&xa(r),lt(n,e.child,null,t),e=La(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function zm(e,n,t,r,o,l,a){if(t)return n.flags&256?(n.flags&=-257,r=Zo(Error(b(422))),br(e,n,a,r)):n.memoizedState!==null?(n.child=e.child,n.flags|=128,null):(l=r.fallback,o=n.mode,r=So({mode:"visible",children:r.children},o,0,null),l=Tn(l,o,a,null),l.flags|=2,r.return=n,l.return=n,r.sibling=l,n.child=r,n.mode&1&&lt(n,e.child,null,a),n.child.memoizedState=Al(a),n.memoizedState=Dl,l);if(!(n.mode&1))return br(e,n,a,null);if(o.data==="$!"){if(r=o.nextSibling&&o.nextSibling.dataset,r)var i=r.dgst;return r=i,l=Error(b(419)),r=Zo(l,r,void 0),br(e,n,a,r)}if(i=(a&e.childLanes)!==0,pe||i){if(r=Z,r!==null){switch(a&-a){case 4:o=2;break;case 16:o=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:o=32;break;case 536870912:o=268435456;break;default:o=0}o=o&(r.suspendedLanes|a)?0:o,o!==0&&o!==l.retryLane&&(l.retryLane=o,Je(e,o),Fe(r,e,o,-1))}return Da(),r=Zo(Error(b(421))),br(e,n,a,r)}return o.data==="$?"?(n.flags|=128,n.child=e.child,n=Vm.bind(null,e),o._reactRetry=n,null):(e=l.treeContext,xe=dn(o.nextSibling),we=n,A=!0,Me=null,e!==null&&(_e[Ce++]=Qe,_e[Ce++]=Ge,_e[Ce++]=Pn,Qe=e.id,Ge=e.overflow,Pn=n),n=La(n,r.children),n.flags|=4096,n)}function Yi(e,n,t){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n),Ll(e.return,n,t)}function el(e,n,t,r,o){var l=e.memoizedState;l===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:r,tail:t,tailMode:o}:(l.isBackwards=n,l.rendering=null,l.renderingStartTime=0,l.last=r,l.tail=t,l.tailMode=o)}function rc(e,n,t){var r=n.pendingProps,o=r.revealOrder,l=r.tail;if(ie(e,n,r.children,t),r=U.current,r&2)r=r&1|2,n.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Yi(e,t,n);else if(e.tag===19)Yi(e,t,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break e;for(;e.sibling===null;){if(e.return===null||e.return===n)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(F(U,r),!(n.mode&1))n.memoizedState=null;else switch(o){case"forwards":for(t=n.child,o=null;t!==null;)e=t.alternate,e!==null&&to(e)===null&&(o=t),t=t.sibling;t=o,t===null?(o=n.child,n.child=null):(o=t.sibling,t.sibling=null),el(n,!1,o,t,l);break;case"backwards":for(t=null,o=n.child,n.child=null;o!==null;){if(e=o.alternate,e!==null&&to(e)===null){n.child=o;break}e=o.sibling,o.sibling=t,t=o,o=e}el(n,!0,t,null,l);break;case"together":el(n,!1,null,null,void 0);break;default:n.memoizedState=null}return n.child}function Or(e,n){!(n.mode&1)&&e!==null&&(e.alternate=null,n.alternate=null,n.flags|=2)}function qe(e,n,t){if(e!==null&&(n.dependencies=e.dependencies),Ln|=n.lanes,!(t&n.childLanes))return null;if(e!==null&&n.child!==e.child)throw Error(b(153));if(n.child!==null){for(e=n.child,t=gn(e,e.pendingProps),n.child=t,t.return=n;e.sibling!==null;)e=e.sibling,t=t.sibling=gn(e,e.pendingProps),t.return=n;t.sibling=null}return n.child}function Lm(e,n,t){switch(n.tag){case 3:nc(n),ot();break;case 5:Tu(n);break;case 1:ge(n.type)&&Xr(n);break;case 4:Ca(n,n.stateNode.containerInfo);break;case 10:var r=n.type._context,o=n.memoizedProps.value;F(Zr,r._currentValue),r._currentValue=o;break;case 13:if(r=n.memoizedState,r!==null)return r.dehydrated!==null?(F(U,U.current&1),n.flags|=128,null):t&n.child.childLanes?tc(e,n,t):(F(U,U.current&1),e=qe(e,n,t),e!==null?e.sibling:null);F(U,U.current&1);break;case 19:if(r=(t&n.childLanes)!==0,e.flags&128){if(r)return rc(e,n,t);n.flags|=128}if(o=n.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),F(U,U.current),r)break;return null;case 22:case 23:return n.lanes=0,Zu(e,n,t)}return qe(e,n,t)}var oc,Ul,lc,ac;oc=function(e,n){for(var t=n.child;t!==null;){if(t.tag===5||t.tag===6)e.appendChild(t.stateNode);else if(t.tag!==4&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break;for(;t.sibling===null;){if(t.return===null||t.return===n)return;t=t.return}t.sibling.return=t.return,t=t.sibling}};Ul=function(){};lc=function(e,n,t,r){var o=e.memoizedProps;if(o!==r){e=n.stateNode,jn(Be.current);var l=null;switch(t){case"input":o=ul(e,o),r=ul(e,r),l=[];break;case"select":o=W({},o,{value:void 0}),r=W({},r,{value:void 0}),l=[];break;case"textarea":o=fl(e,o),r=fl(e,r),l=[];break;default:typeof o.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Kr)}hl(t,r);var a;t=null;for(u in o)if(!r.hasOwnProperty(u)&&o.hasOwnProperty(u)&&o[u]!=null)if(u==="style"){var i=o[u];for(a in i)i.hasOwnProperty(a)&&(t||(t={}),t[a]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(It.hasOwnProperty(u)?l||(l=[]):(l=l||[]).push(u,null));for(u in r){var s=r[u];if(i=o!=null?o[u]:void 0,r.hasOwnProperty(u)&&s!==i&&(s!=null||i!=null))if(u==="style")if(i){for(a in i)!i.hasOwnProperty(a)||s&&s.hasOwnProperty(a)||(t||(t={}),t[a]="");for(a in s)s.hasOwnProperty(a)&&i[a]!==s[a]&&(t||(t={}),t[a]=s[a])}else t||(l||(l=[]),l.push(u,t)),t=s;else u==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,i=i?i.__html:void 0,s!=null&&i!==s&&(l=l||[]).push(u,s)):u==="children"?typeof s!="string"&&typeof s!="number"||(l=l||[]).push(u,""+s):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(It.hasOwnProperty(u)?(s!=null&&u==="onScroll"&&I("scroll",e),l||i===s||(l=[])):(l=l||[]).push(u,s))}t&&(l=l||[]).push("style",t);var u=l;(n.updateQueue=u)&&(n.flags|=4)}};ac=function(e,n,t,r){t!==r&&(n.flags|=4)};function bt(e,n){if(!A)switch(e.tailMode){case"hidden":n=e.tail;for(var t=null;n!==null;)n.alternate!==null&&(t=n),n=n.sibling;t===null?e.tail=null:t.sibling=null;break;case"collapsed":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function oe(e){var n=e.alternate!==null&&e.alternate.child===e.child,t=0,r=0;if(n)for(var o=e.child;o!==null;)t|=o.lanes|o.childLanes,r|=o.subtreeFlags&14680064,r|=o.flags&14680064,o.return=e,o=o.sibling;else for(o=e.child;o!==null;)t|=o.lanes|o.childLanes,r|=o.subtreeFlags,r|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=r,e.childLanes=t,n}function Mm(e,n,t){var r=n.pendingProps;switch(va(n),n.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return oe(n),null;case 1:return ge(n.type)&&Yr(),oe(n),null;case 3:return r=n.stateNode,at(),D(he),D(ae),ja(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(wr(n)?n.flags|=4:e===null||e.memoizedState.isDehydrated&&!(n.flags&256)||(n.flags|=1024,Me!==null&&(Yl(Me),Me=null))),Ul(e,n),oe(n),null;case 5:Ea(n);var o=jn(Yt.current);if(t=n.type,e!==null&&n.stateNode!=null)lc(e,n,t,r,o),e.ref!==n.ref&&(n.flags|=512,n.flags|=2097152);else{if(!r){if(n.stateNode===null)throw Error(b(166));return oe(n),null}if(e=jn(Be.current),wr(n)){r=n.stateNode,t=n.type;var l=n.memoizedProps;switch(r[Ae]=n,r[Gt]=l,e=(n.mode&1)!==0,t){case"dialog":I("cancel",r),I("close",r);break;case"iframe":case"object":case"embed":I("load",r);break;case"video":case"audio":for(o=0;o<jt.length;o++)I(jt[o],r);break;case"source":I("error",r);break;case"img":case"image":case"link":I("error",r),I("load",r);break;case"details":I("toggle",r);break;case"input":oi(r,l),I("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!l.multiple},I("invalid",r);break;case"textarea":ai(r,l),I("invalid",r)}hl(t,l),o=null;for(var a in l)if(l.hasOwnProperty(a)){var i=l[a];a==="children"?typeof i=="string"?r.textContent!==i&&(l.suppressHydrationWarning!==!0&&xr(r.textContent,i,e),o=["children",i]):typeof i=="number"&&r.textContent!==""+i&&(l.suppressHydrationWarning!==!0&&xr(r.textContent,i,e),o=["children",""+i]):It.hasOwnProperty(a)&&i!=null&&a==="onScroll"&&I("scroll",r)}switch(t){case"input":dr(r),li(r,l,!0);break;case"textarea":dr(r),ii(r);break;case"select":case"option":break;default:typeof l.onClick=="function"&&(r.onclick=Kr)}r=o,n.updateQueue=r,r!==null&&(n.flags|=4)}else{a=o.nodeType===9?o:o.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Ms(t)),e==="http://www.w3.org/1999/xhtml"?t==="script"?(e=a.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=a.createElement(t,{is:r.is}):(e=a.createElement(t),t==="select"&&(a=e,r.multiple?a.multiple=!0:r.size&&(a.size=r.size))):e=a.createElementNS(e,t),e[Ae]=n,e[Gt]=r,oc(e,n,!1,!1),n.stateNode=e;e:{switch(a=gl(t,r),t){case"dialog":I("cancel",e),I("close",e),o=r;break;case"iframe":case"object":case"embed":I("load",e),o=r;break;case"video":case"audio":for(o=0;o<jt.length;o++)I(jt[o],e);o=r;break;case"source":I("error",e),o=r;break;case"img":case"image":case"link":I("error",e),I("load",e),o=r;break;case"details":I("toggle",e),o=r;break;case"input":oi(e,r),o=ul(e,r),I("invalid",e);break;case"option":o=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},o=W({},r,{value:void 0}),I("invalid",e);break;case"textarea":ai(e,r),o=fl(e,r),I("invalid",e);break;default:o=r}hl(t,o),i=o;for(l in i)if(i.hasOwnProperty(l)){var s=i[l];l==="style"?Is(e,s):l==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,s!=null&&Os(e,s)):l==="children"?typeof s=="string"?(t!=="textarea"||s!=="")&&Rt(e,s):typeof s=="number"&&Rt(e,""+s):l!=="suppressContentEditableWarning"&&l!=="suppressHydrationWarning"&&l!=="autoFocus"&&(It.hasOwnProperty(l)?s!=null&&l==="onScroll"&&I("scroll",e):s!=null&&ra(e,l,s,a))}switch(t){case"input":dr(e),li(e,r,!1);break;case"textarea":dr(e),ii(e);break;case"option":r.value!=null&&e.setAttribute("value",""+mn(r.value));break;case"select":e.multiple=!!r.multiple,l=r.value,l!=null?Xn(e,!!r.multiple,l,!1):r.defaultValue!=null&&Xn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof o.onClick=="function"&&(e.onclick=Kr)}switch(t){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(n.flags|=4)}n.ref!==null&&(n.flags|=512,n.flags|=2097152)}return oe(n),null;case 6:if(e&&n.stateNode!=null)ac(e,n,e.memoizedProps,r);else{if(typeof r!="string"&&n.stateNode===null)throw Error(b(166));if(t=jn(Yt.current),jn(Be.current),wr(n)){if(r=n.stateNode,t=n.memoizedProps,r[Ae]=n,(l=r.nodeValue!==t)&&(e=we,e!==null))switch(e.tag){case 3:xr(r.nodeValue,t,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&xr(r.nodeValue,t,(e.mode&1)!==0)}l&&(n.flags|=4)}else r=(t.nodeType===9?t:t.ownerDocument).createTextNode(r),r[Ae]=n,n.stateNode=r}return oe(n),null;case 13:if(D(U),r=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(A&&xe!==null&&n.mode&1&&!(n.flags&128))_u(),ot(),n.flags|=98560,l=!1;else if(l=wr(n),r!==null&&r.dehydrated!==null){if(e===null){if(!l)throw Error(b(318));if(l=n.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(b(317));l[Ae]=n}else ot(),!(n.flags&128)&&(n.memoizedState=null),n.flags|=4;oe(n),l=!1}else Me!==null&&(Yl(Me),Me=null),l=!0;if(!l)return n.flags&65536?n:null}return n.flags&128?(n.lanes=t,n):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(n.child.flags|=8192,n.mode&1&&(e===null||U.current&1?X===0&&(X=3):Da())),n.updateQueue!==null&&(n.flags|=4),oe(n),null);case 4:return at(),Ul(e,n),e===null&&Vt(n.stateNode.containerInfo),oe(n),null;case 10:return ba(n.type._context),oe(n),null;case 17:return ge(n.type)&&Yr(),oe(n),null;case 19:if(D(U),l=n.memoizedState,l===null)return oe(n),null;if(r=(n.flags&128)!==0,a=l.rendering,a===null)if(r)bt(l,!1);else{if(X!==0||e!==null&&e.flags&128)for(e=n.child;e!==null;){if(a=to(e),a!==null){for(n.flags|=128,bt(l,!1),r=a.updateQueue,r!==null&&(n.updateQueue=r,n.flags|=4),n.subtreeFlags=0,r=t,t=n.child;t!==null;)l=t,e=r,l.flags&=14680066,a=l.alternate,a===null?(l.childLanes=0,l.lanes=e,l.child=null,l.subtreeFlags=0,l.memoizedProps=null,l.memoizedState=null,l.updateQueue=null,l.dependencies=null,l.stateNode=null):(l.childLanes=a.childLanes,l.lanes=a.lanes,l.child=a.child,l.subtreeFlags=0,l.deletions=null,l.memoizedProps=a.memoizedProps,l.memoizedState=a.memoizedState,l.updateQueue=a.updateQueue,l.type=a.type,e=a.dependencies,l.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t=t.sibling;return F(U,U.current&1|2),n.child}e=e.sibling}l.tail!==null&&G()>st&&(n.flags|=128,r=!0,bt(l,!1),n.lanes=4194304)}else{if(!r)if(e=to(a),e!==null){if(n.flags|=128,r=!0,t=e.updateQueue,t!==null&&(n.updateQueue=t,n.flags|=4),bt(l,!0),l.tail===null&&l.tailMode==="hidden"&&!a.alternate&&!A)return oe(n),null}else 2*G()-l.renderingStartTime>st&&t!==1073741824&&(n.flags|=128,r=!0,bt(l,!1),n.lanes=4194304);l.isBackwards?(a.sibling=n.child,n.child=a):(t=l.last,t!==null?t.sibling=a:n.child=a,l.last=a)}return l.tail!==null?(n=l.tail,l.rendering=n,l.tail=n.sibling,l.renderingStartTime=G(),n.sibling=null,t=U.current,F(U,r?t&1|2:t&1),n):(oe(n),null);case 22:case 23:return Ra(),r=n.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(n.flags|=8192),r&&n.mode&1?ve&1073741824&&(oe(n),n.subtreeFlags&6&&(n.flags|=8192)):oe(n),null;case 24:return null;case 25:return null}throw Error(b(156,n.tag))}function Om(e,n){switch(va(n),n.tag){case 1:return ge(n.type)&&Yr(),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return at(),D(he),D(ae),ja(),e=n.flags,e&65536&&!(e&128)?(n.flags=e&-65537|128,n):null;case 5:return Ea(n),null;case 13:if(D(U),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(b(340));ot()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return D(U),null;case 4:return at(),null;case 10:return ba(n.type._context),null;case 22:case 23:return Ra(),null;case 24:return null;default:return null}}var Sr=!1,le=!1,Fm=typeof WeakSet=="function"?WeakSet:Set,_=null;function Kn(e,n){var t=e.ref;if(t!==null)if(typeof t=="function")try{t(null)}catch(r){H(e,n,r)}else t.current=null}function Bl(e,n,t){try{t()}catch(r){H(e,n,r)}}var Xi=!1;function Im(e,n){if(Cl=Vr,e=du(),ma(e)){if("selectionStart"in e)var t={start:e.selectionStart,end:e.selectionEnd};else e:{t=(t=e.ownerDocument)&&t.defaultView||window;var r=t.getSelection&&t.getSelection();if(r&&r.rangeCount!==0){t=r.anchorNode;var o=r.anchorOffset,l=r.focusNode;r=r.focusOffset;try{t.nodeType,l.nodeType}catch{t=null;break e}var a=0,i=-1,s=-1,u=0,f=0,h=e,m=null;n:for(;;){for(var v;h!==t||o!==0&&h.nodeType!==3||(i=a+o),h!==l||r!==0&&h.nodeType!==3||(s=a+r),h.nodeType===3&&(a+=h.nodeValue.length),(v=h.firstChild)!==null;)m=h,h=v;for(;;){if(h===e)break n;if(m===t&&++u===o&&(i=a),m===l&&++f===r&&(s=a),(v=h.nextSibling)!==null)break;h=m,m=h.parentNode}h=v}t=i===-1||s===-1?null:{start:i,end:s}}else t=null}t=t||{start:0,end:0}}else t=null;for(El={focusedElem:e,selectionRange:t},Vr=!1,_=n;_!==null;)if(n=_,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,_=e;else for(;_!==null;){n=_;try{var S=n.alternate;if(n.flags&1024)switch(n.tag){case 0:case 11:case 15:break;case 1:if(S!==null){var w=S.memoizedProps,N=S.memoizedState,p=n.stateNode,c=p.getSnapshotBeforeUpdate(n.elementType===n.type?w:ze(n.type,w),N);p.__reactInternalSnapshotBeforeUpdate=c}break;case 3:var g=n.stateNode.containerInfo;g.nodeType===1?g.textContent="":g.nodeType===9&&g.documentElement&&g.removeChild(g.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(b(163))}}catch(x){H(n,n.return,x)}if(e=n.sibling,e!==null){e.return=n.return,_=e;break}_=n.return}return S=Xi,Xi=!1,S}function Mt(e,n,t){var r=n.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var o=r=r.next;do{if((o.tag&e)===e){var l=o.destroy;o.destroy=void 0,l!==void 0&&Bl(n,t,l)}o=o.next}while(o!==r)}}function ko(e,n){if(n=n.updateQueue,n=n!==null?n.lastEffect:null,n!==null){var t=n=n.next;do{if((t.tag&e)===e){var r=t.create;t.destroy=r()}t=t.next}while(t!==n)}}function Wl(e){var n=e.ref;if(n!==null){var t=e.stateNode;switch(e.tag){case 5:e=t;break;default:e=t}typeof n=="function"?n(e):n.current=e}}function ic(e){var n=e.alternate;n!==null&&(e.alternate=null,ic(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&(delete n[Ae],delete n[Gt],delete n[Tl],delete n[xm],delete n[wm])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function sc(e){return e.tag===5||e.tag===3||e.tag===4}function Ji(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||sc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Hl(e,n,t){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?t.nodeType===8?t.parentNode.insertBefore(e,n):t.insertBefore(e,n):(t.nodeType===8?(n=t.parentNode,n.insertBefore(e,t)):(n=t,n.appendChild(e)),t=t._reactRootContainer,t!=null||n.onclick!==null||(n.onclick=Kr));else if(r!==4&&(e=e.child,e!==null))for(Hl(e,n,t),e=e.sibling;e!==null;)Hl(e,n,t),e=e.sibling}function Vl(e,n,t){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?t.insertBefore(e,n):t.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Vl(e,n,t),e=e.sibling;e!==null;)Vl(e,n,t),e=e.sibling}var ee=null,Le=!1;function en(e,n,t){for(t=t.child;t!==null;)uc(e,n,t),t=t.sibling}function uc(e,n,t){if(Ue&&typeof Ue.onCommitFiberUnmount=="function")try{Ue.onCommitFiberUnmount(po,t)}catch{}switch(t.tag){case 5:le||Kn(t,n);case 6:var r=ee,o=Le;ee=null,en(e,n,t),ee=r,Le=o,ee!==null&&(Le?(e=ee,t=t.stateNode,e.nodeType===8?e.parentNode.removeChild(t):e.removeChild(t)):ee.removeChild(t.stateNode));break;case 18:ee!==null&&(Le?(e=ee,t=t.stateNode,e.nodeType===8?Go(e.parentNode,t):e.nodeType===1&&Go(e,t),Bt(e)):Go(ee,t.stateNode));break;case 4:r=ee,o=Le,ee=t.stateNode.containerInfo,Le=!0,en(e,n,t),ee=r,Le=o;break;case 0:case 11:case 14:case 15:if(!le&&(r=t.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){o=r=r.next;do{var l=o,a=l.destroy;l=l.tag,a!==void 0&&(l&2||l&4)&&Bl(t,n,a),o=o.next}while(o!==r)}en(e,n,t);break;case 1:if(!le&&(Kn(t,n),r=t.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=t.memoizedProps,r.state=t.memoizedState,r.componentWillUnmount()}catch(i){H(t,n,i)}en(e,n,t);break;case 21:en(e,n,t);break;case 22:t.mode&1?(le=(r=le)||t.memoizedState!==null,en(e,n,t),le=r):en(e,n,t);break;default:en(e,n,t)}}function qi(e){var n=e.updateQueue;if(n!==null){e.updateQueue=null;var t=e.stateNode;t===null&&(t=e.stateNode=new Fm),n.forEach(function(r){var o=Qm.bind(null,e,r);t.has(r)||(t.add(r),r.then(o,o))})}}function Pe(e,n){var t=n.deletions;if(t!==null)for(var r=0;r<t.length;r++){var o=t[r];try{var l=e,a=n,i=a;e:for(;i!==null;){switch(i.tag){case 5:ee=i.stateNode,Le=!1;break e;case 3:ee=i.stateNode.containerInfo,Le=!0;break e;case 4:ee=i.stateNode.containerInfo,Le=!0;break e}i=i.return}if(ee===null)throw Error(b(160));uc(l,a,o),ee=null,Le=!1;var s=o.alternate;s!==null&&(s.return=null),o.return=null}catch(u){H(o,n,u)}}if(n.subtreeFlags&12854)for(n=n.child;n!==null;)cc(n,e),n=n.sibling}function cc(e,n){var t=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Pe(n,e),Re(e),r&4){try{Mt(3,e,e.return),ko(3,e)}catch(w){H(e,e.return,w)}try{Mt(5,e,e.return)}catch(w){H(e,e.return,w)}}break;case 1:Pe(n,e),Re(e),r&512&&t!==null&&Kn(t,t.return);break;case 5:if(Pe(n,e),Re(e),r&512&&t!==null&&Kn(t,t.return),e.flags&32){var o=e.stateNode;try{Rt(o,"")}catch(w){H(e,e.return,w)}}if(r&4&&(o=e.stateNode,o!=null)){var l=e.memoizedProps,a=t!==null?t.memoizedProps:l,i=e.type,s=e.updateQueue;if(e.updateQueue=null,s!==null)try{i==="input"&&l.type==="radio"&&l.name!=null&&zs(o,l),gl(i,a);var u=gl(i,l);for(a=0;a<s.length;a+=2){var f=s[a],h=s[a+1];f==="style"?Is(o,h):f==="dangerouslySetInnerHTML"?Os(o,h):f==="children"?Rt(o,h):ra(o,f,h,u)}switch(i){case"input":cl(o,l);break;case"textarea":Ls(o,l);break;case"select":var m=o._wrapperState.wasMultiple;o._wrapperState.wasMultiple=!!l.multiple;var v=l.value;v!=null?Xn(o,!!l.multiple,v,!1):m!==!!l.multiple&&(l.defaultValue!=null?Xn(o,!!l.multiple,l.defaultValue,!0):Xn(o,!!l.multiple,l.multiple?[]:"",!1))}o[Gt]=l}catch(w){H(e,e.return,w)}}break;case 6:if(Pe(n,e),Re(e),r&4){if(e.stateNode===null)throw Error(b(162));o=e.stateNode,l=e.memoizedProps;try{o.nodeValue=l}catch(w){H(e,e.return,w)}}break;case 3:if(Pe(n,e),Re(e),r&4&&t!==null&&t.memoizedState.isDehydrated)try{Bt(n.containerInfo)}catch(w){H(e,e.return,w)}break;case 4:Pe(n,e),Re(e);break;case 13:Pe(n,e),Re(e),o=e.child,o.flags&8192&&(l=o.memoizedState!==null,o.stateNode.isHidden=l,!l||o.alternate!==null&&o.alternate.memoizedState!==null||(Fa=G())),r&4&&qi(e);break;case 22:if(f=t!==null&&t.memoizedState!==null,e.mode&1?(le=(u=le)||f,Pe(n,e),le=u):Pe(n,e),Re(e),r&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!f&&e.mode&1)for(_=e,f=e.child;f!==null;){for(h=_=f;_!==null;){switch(m=_,v=m.child,m.tag){case 0:case 11:case 14:case 15:Mt(4,m,m.return);break;case 1:Kn(m,m.return);var S=m.stateNode;if(typeof S.componentWillUnmount=="function"){r=m,t=m.return;try{n=r,S.props=n.memoizedProps,S.state=n.memoizedState,S.componentWillUnmount()}catch(w){H(r,t,w)}}break;case 5:Kn(m,m.return);break;case 22:if(m.memoizedState!==null){es(h);continue}}v!==null?(v.return=m,_=v):es(h)}f=f.sibling}e:for(f=null,h=e;;){if(h.tag===5){if(f===null){f=h;try{o=h.stateNode,u?(l=o.style,typeof l.setProperty=="function"?l.setProperty("display","none","important"):l.display="none"):(i=h.stateNode,s=h.memoizedProps.style,a=s!=null&&s.hasOwnProperty("display")?s.display:null,i.style.display=Fs("display",a))}catch(w){H(e,e.return,w)}}}else if(h.tag===6){if(f===null)try{h.stateNode.nodeValue=u?"":h.memoizedProps}catch(w){H(e,e.return,w)}}else if((h.tag!==22&&h.tag!==23||h.memoizedState===null||h===e)&&h.child!==null){h.child.return=h,h=h.child;continue}if(h===e)break e;for(;h.sibling===null;){if(h.return===null||h.return===e)break e;f===h&&(f=null),h=h.return}f===h&&(f=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:Pe(n,e),Re(e),r&4&&qi(e);break;case 21:break;default:Pe(n,e),Re(e)}}function Re(e){var n=e.flags;if(n&2){try{e:{for(var t=e.return;t!==null;){if(sc(t)){var r=t;break e}t=t.return}throw Error(b(160))}switch(r.tag){case 5:var o=r.stateNode;r.flags&32&&(Rt(o,""),r.flags&=-33);var l=Ji(e);Vl(e,l,o);break;case 3:case 4:var a=r.stateNode.containerInfo,i=Ji(e);Hl(e,i,a);break;default:throw Error(b(161))}}catch(s){H(e,e.return,s)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function Rm(e,n,t){_=e,dc(e)}function dc(e,n,t){for(var r=(e.mode&1)!==0;_!==null;){var o=_,l=o.child;if(o.tag===22&&r){var a=o.memoizedState!==null||Sr;if(!a){var i=o.alternate,s=i!==null&&i.memoizedState!==null||le;i=Sr;var u=le;if(Sr=a,(le=s)&&!u)for(_=o;_!==null;)a=_,s=a.child,a.tag===22&&a.memoizedState!==null?ns(o):s!==null?(s.return=a,_=s):ns(o);for(;l!==null;)_=l,dc(l),l=l.sibling;_=o,Sr=i,le=u}Zi(e)}else o.subtreeFlags&8772&&l!==null?(l.return=o,_=l):Zi(e)}}function Zi(e){for(;_!==null;){var n=_;if(n.flags&8772){var t=n.alternate;try{if(n.flags&8772)switch(n.tag){case 0:case 11:case 15:le||ko(5,n);break;case 1:var r=n.stateNode;if(n.flags&4&&!le)if(t===null)r.componentDidMount();else{var o=n.elementType===n.type?t.memoizedProps:ze(n.type,t.memoizedProps);r.componentDidUpdate(o,t.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var l=n.updateQueue;l!==null&&Ii(n,l,r);break;case 3:var a=n.updateQueue;if(a!==null){if(t=null,n.child!==null)switch(n.child.tag){case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}Ii(n,a,t)}break;case 5:var i=n.stateNode;if(t===null&&n.flags&4){t=i;var s=n.memoizedProps;switch(n.type){case"button":case"input":case"select":case"textarea":s.autoFocus&&t.focus();break;case"img":s.src&&(t.src=s.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(n.memoizedState===null){var u=n.alternate;if(u!==null){var f=u.memoizedState;if(f!==null){var h=f.dehydrated;h!==null&&Bt(h)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(b(163))}le||n.flags&512&&Wl(n)}catch(m){H(n,n.return,m)}}if(n===e){_=null;break}if(t=n.sibling,t!==null){t.return=n.return,_=t;break}_=n.return}}function es(e){for(;_!==null;){var n=_;if(n===e){_=null;break}var t=n.sibling;if(t!==null){t.return=n.return,_=t;break}_=n.return}}function ns(e){for(;_!==null;){var n=_;try{switch(n.tag){case 0:case 11:case 15:var t=n.return;try{ko(4,n)}catch(s){H(n,t,s)}break;case 1:var r=n.stateNode;if(typeof r.componentDidMount=="function"){var o=n.return;try{r.componentDidMount()}catch(s){H(n,o,s)}}var l=n.return;try{Wl(n)}catch(s){H(n,l,s)}break;case 5:var a=n.return;try{Wl(n)}catch(s){H(n,a,s)}}}catch(s){H(n,n.return,s)}if(n===e){_=null;break}var i=n.sibling;if(i!==null){i.return=n.return,_=i;break}_=n.return}}var Dm=Math.ceil,lo=Ze.ReactCurrentDispatcher,Ma=Ze.ReactCurrentOwner,je=Ze.ReactCurrentBatchConfig,M=0,Z=null,K=null,ne=0,ve=0,Yn=xn(0),X=0,Zt=null,Ln=0,bo=0,Oa=0,Ot=null,fe=null,Fa=0,st=1/0,He=null,ao=!1,Ql=null,pn=null,_r=!1,an=null,io=0,Ft=0,Gl=null,Fr=-1,Ir=0;function se(){return M&6?G():Fr!==-1?Fr:Fr=G()}function hn(e){return e.mode&1?M&2&&ne!==0?ne&-ne:bm.transition!==null?(Ir===0&&(Ir=Ys()),Ir):(e=O,e!==0||(e=window.event,e=e===void 0?16:tu(e.type)),e):1}function Fe(e,n,t,r){if(50<Ft)throw Ft=0,Gl=null,Error(b(185));tr(e,t,r),(!(M&2)||e!==Z)&&(e===Z&&(!(M&2)&&(bo|=t),X===4&&on(e,ne)),me(e,r),t===1&&M===0&&!(n.mode&1)&&(st=G()+500,vo&&wn()))}function me(e,n){var t=e.callbackNode;bg(e,n);var r=Hr(e,e===Z?ne:0);if(r===0)t!==null&&ci(t),e.callbackNode=null,e.callbackPriority=0;else if(n=r&-r,e.callbackPriority!==n){if(t!=null&&ci(t),n===1)e.tag===0?km(ts.bind(null,e)):ku(ts.bind(null,e)),ym(function(){!(M&6)&&wn()}),t=null;else{switch(Xs(r)){case 1:t=sa;break;case 4:t=Gs;break;case 16:t=Wr;break;case 536870912:t=Ks;break;default:t=Wr}t=xc(t,fc.bind(null,e))}e.callbackPriority=n,e.callbackNode=t}}function fc(e,n){if(Fr=-1,Ir=0,M&6)throw Error(b(327));var t=e.callbackNode;if(nt()&&e.callbackNode!==t)return null;var r=Hr(e,e===Z?ne:0);if(r===0)return null;if(r&30||r&e.expiredLanes||n)n=so(e,r);else{n=r;var o=M;M|=2;var l=hc();(Z!==e||ne!==n)&&(He=null,st=G()+500,Nn(e,n));do try{Bm();break}catch(i){pc(e,i)}while(!0);ka(),lo.current=l,M=o,K!==null?n=0:(Z=null,ne=0,n=X)}if(n!==0){if(n===2&&(o=wl(e),o!==0&&(r=o,n=Kl(e,o))),n===1)throw t=Zt,Nn(e,0),on(e,r),me(e,G()),t;if(n===6)on(e,r);else{if(o=e.current.alternate,!(r&30)&&!Am(o)&&(n=so(e,r),n===2&&(l=wl(e),l!==0&&(r=l,n=Kl(e,l))),n===1))throw t=Zt,Nn(e,0),on(e,r),me(e,G()),t;switch(e.finishedWork=o,e.finishedLanes=r,n){case 0:case 1:throw Error(b(345));case 2:_n(e,fe,He);break;case 3:if(on(e,r),(r&130023424)===r&&(n=Fa+500-G(),10<n)){if(Hr(e,0)!==0)break;if(o=e.suspendedLanes,(o&r)!==r){se(),e.pingedLanes|=e.suspendedLanes&o;break}e.timeoutHandle=Nl(_n.bind(null,e,fe,He),n);break}_n(e,fe,He);break;case 4:if(on(e,r),(r&4194240)===r)break;for(n=e.eventTimes,o=-1;0<r;){var a=31-Oe(r);l=1<<a,a=n[a],a>o&&(o=a),r&=~l}if(r=o,r=G()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Dm(r/1960))-r,10<r){e.timeoutHandle=Nl(_n.bind(null,e,fe,He),r);break}_n(e,fe,He);break;case 5:_n(e,fe,He);break;default:throw Error(b(329))}}}return me(e,G()),e.callbackNode===t?fc.bind(null,e):null}function Kl(e,n){var t=Ot;return e.current.memoizedState.isDehydrated&&(Nn(e,n).flags|=256),e=so(e,n),e!==2&&(n=fe,fe=t,n!==null&&Yl(n)),e}function Yl(e){fe===null?fe=e:fe.push.apply(fe,e)}function Am(e){for(var n=e;;){if(n.flags&16384){var t=n.updateQueue;if(t!==null&&(t=t.stores,t!==null))for(var r=0;r<t.length;r++){var o=t[r],l=o.getSnapshot;o=o.value;try{if(!Ie(l(),o))return!1}catch{return!1}}}if(t=n.child,n.subtreeFlags&16384&&t!==null)t.return=n,n=t;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function on(e,n){for(n&=~Oa,n&=~bo,e.suspendedLanes|=n,e.pingedLanes&=~n,e=e.expirationTimes;0<n;){var t=31-Oe(n),r=1<<t;e[t]=-1,n&=~r}}function ts(e){if(M&6)throw Error(b(327));nt();var n=Hr(e,0);if(!(n&1))return me(e,G()),null;var t=so(e,n);if(e.tag!==0&&t===2){var r=wl(e);r!==0&&(n=r,t=Kl(e,r))}if(t===1)throw t=Zt,Nn(e,0),on(e,n),me(e,G()),t;if(t===6)throw Error(b(345));return e.finishedWork=e.current.alternate,e.finishedLanes=n,_n(e,fe,He),me(e,G()),null}function Ia(e,n){var t=M;M|=1;try{return e(n)}finally{M=t,M===0&&(st=G()+500,vo&&wn())}}function Mn(e){an!==null&&an.tag===0&&!(M&6)&&nt();var n=M;M|=1;var t=je.transition,r=O;try{if(je.transition=null,O=1,e)return e()}finally{O=r,je.transition=t,M=n,!(M&6)&&wn()}}function Ra(){ve=Yn.current,D(Yn)}function Nn(e,n){e.finishedWork=null,e.finishedLanes=0;var t=e.timeoutHandle;if(t!==-1&&(e.timeoutHandle=-1,mm(t)),K!==null)for(t=K.return;t!==null;){var r=t;switch(va(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Yr();break;case 3:at(),D(he),D(ae),ja();break;case 5:Ea(r);break;case 4:at();break;case 13:D(U);break;case 19:D(U);break;case 10:ba(r.type._context);break;case 22:case 23:Ra()}t=t.return}if(Z=e,K=e=gn(e.current,null),ne=ve=n,X=0,Zt=null,Oa=bo=Ln=0,fe=Ot=null,En!==null){for(n=0;n<En.length;n++)if(t=En[n],r=t.interleaved,r!==null){t.interleaved=null;var o=r.next,l=t.pending;if(l!==null){var a=l.next;l.next=o,r.next=a}t.pending=r}En=null}return e}function pc(e,n){do{var t=K;try{if(ka(),Lr.current=oo,ro){for(var r=B.memoizedState;r!==null;){var o=r.queue;o!==null&&(o.pending=null),r=r.next}ro=!1}if(zn=0,q=Y=B=null,Lt=!1,Xt=0,Ma.current=null,t===null||t.return===null){X=1,Zt=n,K=null;break}e:{var l=e,a=t.return,i=t,s=n;if(n=ne,i.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){var u=s,f=i,h=f.tag;if(!(f.mode&1)&&(h===0||h===11||h===15)){var m=f.alternate;m?(f.updateQueue=m.updateQueue,f.memoizedState=m.memoizedState,f.lanes=m.lanes):(f.updateQueue=null,f.memoizedState=null)}var v=Wi(a);if(v!==null){v.flags&=-257,Hi(v,a,i,l,n),v.mode&1&&Bi(l,u,n),n=v,s=u;var S=n.updateQueue;if(S===null){var w=new Set;w.add(s),n.updateQueue=w}else S.add(s);break e}else{if(!(n&1)){Bi(l,u,n),Da();break e}s=Error(b(426))}}else if(A&&i.mode&1){var N=Wi(a);if(N!==null){!(N.flags&65536)&&(N.flags|=256),Hi(N,a,i,l,n),xa(it(s,i));break e}}l=s=it(s,i),X!==4&&(X=2),Ot===null?Ot=[l]:Ot.push(l),l=a;do{switch(l.tag){case 3:l.flags|=65536,n&=-n,l.lanes|=n;var p=Xu(l,s,n);Fi(l,p);break e;case 1:i=s;var c=l.type,g=l.stateNode;if(!(l.flags&128)&&(typeof c.getDerivedStateFromError=="function"||g!==null&&typeof g.componentDidCatch=="function"&&(pn===null||!pn.has(g)))){l.flags|=65536,n&=-n,l.lanes|=n;var x=Ju(l,i,n);Fi(l,x);break e}}l=l.return}while(l!==null)}mc(t)}catch(y){n=y,K===t&&t!==null&&(K=t=t.return);continue}break}while(!0)}function hc(){var e=lo.current;return lo.current=oo,e===null?oo:e}function Da(){(X===0||X===3||X===2)&&(X=4),Z===null||!(Ln&268435455)&&!(bo&268435455)||on(Z,ne)}function so(e,n){var t=M;M|=2;var r=hc();(Z!==e||ne!==n)&&(He=null,Nn(e,n));do try{Um();break}catch(o){pc(e,o)}while(!0);if(ka(),M=t,lo.current=r,K!==null)throw Error(b(261));return Z=null,ne=0,X}function Um(){for(;K!==null;)gc(K)}function Bm(){for(;K!==null&&!pg();)gc(K)}function gc(e){var n=vc(e.alternate,e,ve);e.memoizedProps=e.pendingProps,n===null?mc(e):K=n,Ma.current=null}function mc(e){var n=e;do{var t=n.alternate;if(e=n.return,n.flags&32768){if(t=Om(t,n),t!==null){t.flags&=32767,K=t;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{X=6,K=null;return}}else if(t=Mm(t,n,ve),t!==null){K=t;return}if(n=n.sibling,n!==null){K=n;return}K=n=e}while(n!==null);X===0&&(X=5)}function _n(e,n,t){var r=O,o=je.transition;try{je.transition=null,O=1,Wm(e,n,t,r)}finally{je.transition=o,O=r}return null}function Wm(e,n,t,r){do nt();while(an!==null);if(M&6)throw Error(b(327));t=e.finishedWork;var o=e.finishedLanes;if(t===null)return null;if(e.finishedWork=null,e.finishedLanes=0,t===e.current)throw Error(b(177));e.callbackNode=null,e.callbackPriority=0;var l=t.lanes|t.childLanes;if(Sg(e,l),e===Z&&(K=Z=null,ne=0),!(t.subtreeFlags&2064)&&!(t.flags&2064)||_r||(_r=!0,xc(Wr,function(){return nt(),null})),l=(t.flags&15990)!==0,t.subtreeFlags&15990||l){l=je.transition,je.transition=null;var a=O;O=1;var i=M;M|=4,Ma.current=null,Im(e,t),cc(t,e),um(El),Vr=!!Cl,El=Cl=null,e.current=t,Rm(t),hg(),M=i,O=a,je.transition=l}else e.current=t;if(_r&&(_r=!1,an=e,io=o),l=e.pendingLanes,l===0&&(pn=null),yg(t.stateNode),me(e,G()),n!==null)for(r=e.onRecoverableError,t=0;t<n.length;t++)o=n[t],r(o.value,{componentStack:o.stack,digest:o.digest});if(ao)throw ao=!1,e=Ql,Ql=null,e;return io&1&&e.tag!==0&&nt(),l=e.pendingLanes,l&1?e===Gl?Ft++:(Ft=0,Gl=e):Ft=0,wn(),null}function nt(){if(an!==null){var e=Xs(io),n=je.transition,t=O;try{if(je.transition=null,O=16>e?16:e,an===null)var r=!1;else{if(e=an,an=null,io=0,M&6)throw Error(b(331));var o=M;for(M|=4,_=e.current;_!==null;){var l=_,a=l.child;if(_.flags&16){var i=l.deletions;if(i!==null){for(var s=0;s<i.length;s++){var u=i[s];for(_=u;_!==null;){var f=_;switch(f.tag){case 0:case 11:case 15:Mt(8,f,l)}var h=f.child;if(h!==null)h.return=f,_=h;else for(;_!==null;){f=_;var m=f.sibling,v=f.return;if(ic(f),f===u){_=null;break}if(m!==null){m.return=v,_=m;break}_=v}}}var S=l.alternate;if(S!==null){var w=S.child;if(w!==null){S.child=null;do{var N=w.sibling;w.sibling=null,w=N}while(w!==null)}}_=l}}if(l.subtreeFlags&2064&&a!==null)a.return=l,_=a;else e:for(;_!==null;){if(l=_,l.flags&2048)switch(l.tag){case 0:case 11:case 15:Mt(9,l,l.return)}var p=l.sibling;if(p!==null){p.return=l.return,_=p;break e}_=l.return}}var c=e.current;for(_=c;_!==null;){a=_;var g=a.child;if(a.subtreeFlags&2064&&g!==null)g.return=a,_=g;else e:for(a=c;_!==null;){if(i=_,i.flags&2048)try{switch(i.tag){case 0:case 11:case 15:ko(9,i)}}catch(y){H(i,i.return,y)}if(i===a){_=null;break e}var x=i.sibling;if(x!==null){x.return=i.return,_=x;break e}_=i.return}}if(M=o,wn(),Ue&&typeof Ue.onPostCommitFiberRoot=="function")try{Ue.onPostCommitFiberRoot(po,e)}catch{}r=!0}return r}finally{O=t,je.transition=n}}return!1}function rs(e,n,t){n=it(t,n),n=Xu(e,n,1),e=fn(e,n,1),n=se(),e!==null&&(tr(e,1,n),me(e,n))}function H(e,n,t){if(e.tag===3)rs(e,e,t);else for(;n!==null;){if(n.tag===3){rs(n,e,t);break}else if(n.tag===1){var r=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(pn===null||!pn.has(r))){e=it(t,e),e=Ju(n,e,1),n=fn(n,e,1),e=se(),n!==null&&(tr(n,1,e),me(n,e));break}}n=n.return}}function Hm(e,n,t){var r=e.pingCache;r!==null&&r.delete(n),n=se(),e.pingedLanes|=e.suspendedLanes&t,Z===e&&(ne&t)===t&&(X===4||X===3&&(ne&130023424)===ne&&500>G()-Fa?Nn(e,0):Oa|=t),me(e,n)}function yc(e,n){n===0&&(e.mode&1?(n=hr,hr<<=1,!(hr&130023424)&&(hr=4194304)):n=1);var t=se();e=Je(e,n),e!==null&&(tr(e,n,t),me(e,t))}function Vm(e){var n=e.memoizedState,t=0;n!==null&&(t=n.retryLane),yc(e,t)}function Qm(e,n){var t=0;switch(e.tag){case 13:var r=e.stateNode,o=e.memoizedState;o!==null&&(t=o.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(b(314))}r!==null&&r.delete(n),yc(e,t)}var vc;vc=function(e,n,t){if(e!==null)if(e.memoizedProps!==n.pendingProps||he.current)pe=!0;else{if(!(e.lanes&t)&&!(n.flags&128))return pe=!1,Lm(e,n,t);pe=!!(e.flags&131072)}else pe=!1,A&&n.flags&1048576&&bu(n,qr,n.index);switch(n.lanes=0,n.tag){case 2:var r=n.type;Or(e,n),e=n.pendingProps;var o=rt(n,ae.current);et(n,t),o=Ta(null,n,r,e,o,t);var l=$a();return n.flags|=1,typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0?(n.tag=1,n.memoizedState=null,n.updateQueue=null,ge(r)?(l=!0,Xr(n)):l=!1,n.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,_a(n),o.updater=wo,n.stateNode=o,o._reactInternals=n,Ol(n,r,e,t),n=Rl(null,n,r,!0,l,t)):(n.tag=0,A&&l&&ya(n),ie(null,n,o,t),n=n.child),n;case 16:r=n.elementType;e:{switch(Or(e,n),e=n.pendingProps,o=r._init,r=o(r._payload),n.type=r,o=n.tag=Km(r),e=ze(r,e),o){case 0:n=Il(null,n,r,e,t);break e;case 1:n=Gi(null,n,r,e,t);break e;case 11:n=Vi(null,n,r,e,t);break e;case 14:n=Qi(null,n,r,ze(r.type,e),t);break e}throw Error(b(306,r,""))}return n;case 0:return r=n.type,o=n.pendingProps,o=n.elementType===r?o:ze(r,o),Il(e,n,r,o,t);case 1:return r=n.type,o=n.pendingProps,o=n.elementType===r?o:ze(r,o),Gi(e,n,r,o,t);case 3:e:{if(nc(n),e===null)throw Error(b(387));r=n.pendingProps,l=n.memoizedState,o=l.element,Nu(e,n),no(n,r,null,t);var a=n.memoizedState;if(r=a.element,l.isDehydrated)if(l={element:r,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},n.updateQueue.baseState=l,n.memoizedState=l,n.flags&256){o=it(Error(b(423)),n),n=Ki(e,n,r,t,o);break e}else if(r!==o){o=it(Error(b(424)),n),n=Ki(e,n,r,t,o);break e}else for(xe=dn(n.stateNode.containerInfo.firstChild),we=n,A=!0,Me=null,t=Eu(n,null,r,t),n.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling;else{if(ot(),r===o){n=qe(e,n,t);break e}ie(e,n,r,t)}n=n.child}return n;case 5:return Tu(n),e===null&&zl(n),r=n.type,o=n.pendingProps,l=e!==null?e.memoizedProps:null,a=o.children,jl(r,o)?a=null:l!==null&&jl(r,l)&&(n.flags|=32),ec(e,n),ie(e,n,a,t),n.child;case 6:return e===null&&zl(n),null;case 13:return tc(e,n,t);case 4:return Ca(n,n.stateNode.containerInfo),r=n.pendingProps,e===null?n.child=lt(n,null,r,t):ie(e,n,r,t),n.child;case 11:return r=n.type,o=n.pendingProps,o=n.elementType===r?o:ze(r,o),Vi(e,n,r,o,t);case 7:return ie(e,n,n.pendingProps,t),n.child;case 8:return ie(e,n,n.pendingProps.children,t),n.child;case 12:return ie(e,n,n.pendingProps.children,t),n.child;case 10:e:{if(r=n.type._context,o=n.pendingProps,l=n.memoizedProps,a=o.value,F(Zr,r._currentValue),r._currentValue=a,l!==null)if(Ie(l.value,a)){if(l.children===o.children&&!he.current){n=qe(e,n,t);break e}}else for(l=n.child,l!==null&&(l.return=n);l!==null;){var i=l.dependencies;if(i!==null){a=l.child;for(var s=i.firstContext;s!==null;){if(s.context===r){if(l.tag===1){s=Ke(-1,t&-t),s.tag=2;var u=l.updateQueue;if(u!==null){u=u.shared;var f=u.pending;f===null?s.next=s:(s.next=f.next,f.next=s),u.pending=s}}l.lanes|=t,s=l.alternate,s!==null&&(s.lanes|=t),Ll(l.return,t,n),i.lanes|=t;break}s=s.next}}else if(l.tag===10)a=l.type===n.type?null:l.child;else if(l.tag===18){if(a=l.return,a===null)throw Error(b(341));a.lanes|=t,i=a.alternate,i!==null&&(i.lanes|=t),Ll(a,t,n),a=l.sibling}else a=l.child;if(a!==null)a.return=l;else for(a=l;a!==null;){if(a===n){a=null;break}if(l=a.sibling,l!==null){l.return=a.return,a=l;break}a=a.return}l=a}ie(e,n,o.children,t),n=n.child}return n;case 9:return o=n.type,r=n.pendingProps.children,et(n,t),o=Ne(o),r=r(o),n.flags|=1,ie(e,n,r,t),n.child;case 14:return r=n.type,o=ze(r,n.pendingProps),o=ze(r.type,o),Qi(e,n,r,o,t);case 15:return qu(e,n,n.type,n.pendingProps,t);case 17:return r=n.type,o=n.pendingProps,o=n.elementType===r?o:ze(r,o),Or(e,n),n.tag=1,ge(r)?(e=!0,Xr(n)):e=!1,et(n,t),Yu(n,r,o),Ol(n,r,o,t),Rl(null,n,r,!0,e,t);case 19:return rc(e,n,t);case 22:return Zu(e,n,t)}throw Error(b(156,n.tag))};function xc(e,n){return Qs(e,n)}function Gm(e,n,t,r){this.tag=e,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ee(e,n,t,r){return new Gm(e,n,t,r)}function Aa(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Km(e){if(typeof e=="function")return Aa(e)?1:0;if(e!=null){if(e=e.$$typeof,e===la)return 11;if(e===aa)return 14}return 2}function gn(e,n){var t=e.alternate;return t===null?(t=Ee(e.tag,n,e.key,e.mode),t.elementType=e.elementType,t.type=e.type,t.stateNode=e.stateNode,t.alternate=e,e.alternate=t):(t.pendingProps=n,t.type=e.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=e.flags&14680064,t.childLanes=e.childLanes,t.lanes=e.lanes,t.child=e.child,t.memoizedProps=e.memoizedProps,t.memoizedState=e.memoizedState,t.updateQueue=e.updateQueue,n=e.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},t.sibling=e.sibling,t.index=e.index,t.ref=e.ref,t}function Rr(e,n,t,r,o,l){var a=2;if(r=e,typeof e=="function")Aa(e)&&(a=1);else if(typeof e=="string")a=5;else e:switch(e){case Dn:return Tn(t.children,o,l,n);case oa:a=8,o|=8;break;case ll:return e=Ee(12,t,n,o|2),e.elementType=ll,e.lanes=l,e;case al:return e=Ee(13,t,n,o),e.elementType=al,e.lanes=l,e;case il:return e=Ee(19,t,n,o),e.elementType=il,e.lanes=l,e;case Ts:return So(t,o,l,n);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case js:a=10;break e;case Ns:a=9;break e;case la:a=11;break e;case aa:a=14;break e;case nn:a=16,r=null;break e}throw Error(b(130,e==null?e:typeof e,""))}return n=Ee(a,t,n,o),n.elementType=e,n.type=r,n.lanes=l,n}function Tn(e,n,t,r){return e=Ee(7,e,r,n),e.lanes=t,e}function So(e,n,t,r){return e=Ee(22,e,r,n),e.elementType=Ts,e.lanes=t,e.stateNode={isHidden:!1},e}function nl(e,n,t){return e=Ee(6,e,null,n),e.lanes=t,e}function tl(e,n,t){return n=Ee(4,e.children!==null?e.children:[],e.key,n),n.lanes=t,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}function Ym(e,n,t,r,o){this.tag=n,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Fo(0),this.expirationTimes=Fo(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Fo(0),this.identifierPrefix=r,this.onRecoverableError=o,this.mutableSourceEagerHydrationData=null}function Ua(e,n,t,r,o,l,a,i,s){return e=new Ym(e,n,t,i,s),n===1?(n=1,l===!0&&(n|=8)):n=0,l=Ee(3,null,null,n),e.current=l,l.stateNode=e,l.memoizedState={element:r,isDehydrated:t,cache:null,transitions:null,pendingSuspenseBoundaries:null},_a(l),e}function Xm(e,n,t){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Rn,key:r==null?null:""+r,children:e,containerInfo:n,implementation:t}}function wc(e){if(!e)return yn;e=e._reactInternals;e:{if(Fn(e)!==e||e.tag!==1)throw Error(b(170));var n=e;do{switch(n.tag){case 3:n=n.stateNode.context;break e;case 1:if(ge(n.type)){n=n.stateNode.__reactInternalMemoizedMergedChildContext;break e}}n=n.return}while(n!==null);throw Error(b(171))}if(e.tag===1){var t=e.type;if(ge(t))return wu(e,t,n)}return n}function kc(e,n,t,r,o,l,a,i,s){return e=Ua(t,r,!0,e,o,l,a,i,s),e.context=wc(null),t=e.current,r=se(),o=hn(t),l=Ke(r,o),l.callback=n??null,fn(t,l,o),e.current.lanes=o,tr(e,o,r),me(e,r),e}function _o(e,n,t,r){var o=n.current,l=se(),a=hn(o);return t=wc(t),n.context===null?n.context=t:n.pendingContext=t,n=Ke(l,a),n.payload={element:e},r=r===void 0?null:r,r!==null&&(n.callback=r),e=fn(o,n,a),e!==null&&(Fe(e,o,a,l),zr(e,o,a)),a}function uo(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function os(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var t=e.retryLane;e.retryLane=t!==0&&t<n?t:n}}function Ba(e,n){os(e,n),(e=e.alternate)&&os(e,n)}function Jm(){return null}var bc=typeof reportError=="function"?reportError:function(e){console.error(e)};function Wa(e){this._internalRoot=e}Co.prototype.render=Wa.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(b(409));_o(e,n,null,null)};Co.prototype.unmount=Wa.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;Mn(function(){_o(null,e,null,null)}),n[Xe]=null}};function Co(e){this._internalRoot=e}Co.prototype.unstable_scheduleHydration=function(e){if(e){var n=Zs();e={blockedOn:null,target:e,priority:n};for(var t=0;t<rn.length&&n!==0&&n<rn[t].priority;t++);rn.splice(t,0,e),t===0&&nu(e)}};function Ha(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Eo(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function ls(){}function qm(e,n,t,r,o){if(o){if(typeof r=="function"){var l=r;r=function(){var u=uo(a);l.call(u)}}var a=kc(n,r,e,0,null,!1,!1,"",ls);return e._reactRootContainer=a,e[Xe]=a.current,Vt(e.nodeType===8?e.parentNode:e),Mn(),a}for(;o=e.lastChild;)e.removeChild(o);if(typeof r=="function"){var i=r;r=function(){var u=uo(s);i.call(u)}}var s=Ua(e,0,!1,null,null,!1,!1,"",ls);return e._reactRootContainer=s,e[Xe]=s.current,Vt(e.nodeType===8?e.parentNode:e),Mn(function(){_o(n,s,t,r)}),s}function jo(e,n,t,r,o){var l=t._reactRootContainer;if(l){var a=l;if(typeof o=="function"){var i=o;o=function(){var s=uo(a);i.call(s)}}_o(n,a,e,o)}else a=qm(t,n,e,o,r);return uo(a)}Js=function(e){switch(e.tag){case 3:var n=e.stateNode;if(n.current.memoizedState.isDehydrated){var t=Et(n.pendingLanes);t!==0&&(ua(n,t|1),me(n,G()),!(M&6)&&(st=G()+500,wn()))}break;case 13:Mn(function(){var r=Je(e,1);if(r!==null){var o=se();Fe(r,e,1,o)}}),Ba(e,1)}};ca=function(e){if(e.tag===13){var n=Je(e,134217728);if(n!==null){var t=se();Fe(n,e,134217728,t)}Ba(e,134217728)}};qs=function(e){if(e.tag===13){var n=hn(e),t=Je(e,n);if(t!==null){var r=se();Fe(t,e,n,r)}Ba(e,n)}};Zs=function(){return O};eu=function(e,n){var t=O;try{return O=e,n()}finally{O=t}};yl=function(e,n,t){switch(n){case"input":if(cl(e,t),n=t.name,t.type==="radio"&&n!=null){for(t=e;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll("input[name="+JSON.stringify(""+n)+'][type="radio"]'),n=0;n<t.length;n++){var r=t[n];if(r!==e&&r.form===e.form){var o=yo(r);if(!o)throw Error(b(90));Ps(r),cl(r,o)}}}break;case"textarea":Ls(e,t);break;case"select":n=t.value,n!=null&&Xn(e,!!t.multiple,n,!1)}};As=Ia;Us=Mn;var Zm={usingClientEntryPoint:!1,Events:[or,Wn,yo,Rs,Ds,Ia]},St={findFiberByHostInstance:Cn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},e0={bundleType:St.bundleType,version:St.version,rendererPackageName:St.rendererPackageName,rendererConfig:St.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Ze.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Hs(e),e===null?null:e.stateNode},findFiberByHostInstance:St.findFiberByHostInstance||Jm,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Cr=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Cr.isDisabled&&Cr.supportsFiber)try{po=Cr.inject(e0),Ue=Cr}catch{}}be.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Zm;be.createPortal=function(e,n){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Ha(n))throw Error(b(200));return Xm(e,n,null,t)};be.createRoot=function(e,n){if(!Ha(e))throw Error(b(299));var t=!1,r="",o=bc;return n!=null&&(n.unstable_strictMode===!0&&(t=!0),n.identifierPrefix!==void 0&&(r=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),n=Ua(e,1,!1,null,null,t,!1,r,o),e[Xe]=n.current,Vt(e.nodeType===8?e.parentNode:e),new Wa(n)};be.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(b(188)):(e=Object.keys(e).join(","),Error(b(268,e)));return e=Hs(n),e=e===null?null:e.stateNode,e};be.flushSync=function(e){return Mn(e)};be.hydrate=function(e,n,t){if(!Eo(n))throw Error(b(200));return jo(null,e,n,!0,t)};be.hydrateRoot=function(e,n,t){if(!Ha(e))throw Error(b(405));var r=t!=null&&t.hydratedSources||null,o=!1,l="",a=bc;if(t!=null&&(t.unstable_strictMode===!0&&(o=!0),t.identifierPrefix!==void 0&&(l=t.identifierPrefix),t.onRecoverableError!==void 0&&(a=t.onRecoverableError)),n=kc(n,null,e,1,t??null,o,!1,l,a),e[Xe]=n.current,Vt(e),r)for(e=0;e<r.length;e++)t=r[e],o=t._getVersion,o=o(t._source),n.mutableSourceEagerHydrationData==null?n.mutableSourceEagerHydrationData=[t,o]:n.mutableSourceEagerHydrationData.push(t,o);return new Co(n)};be.render=function(e,n,t){if(!Eo(n))throw Error(b(200));return jo(null,e,n,!1,t)};be.unmountComponentAtNode=function(e){if(!Eo(e))throw Error(b(40));return e._reactRootContainer?(Mn(function(){jo(null,null,e,!1,function(){e._reactRootContainer=null,e[Xe]=null})}),!0):!1};be.unstable_batchedUpdates=Ia;be.unstable_renderSubtreeIntoContainer=function(e,n,t,r){if(!Eo(t))throw Error(b(200));if(e==null||e._reactInternals===void 0)throw Error(b(38));return jo(e,n,t,!1,r)};be.version="18.3.1-next-f1338f8080-20240426";function Sc(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Sc)}catch(e){console.error(e)}}Sc(),Ss.exports=be;var n0=Ss.exports,_c,as=n0;_c=as.createRoot,as.hydrateRoot;const t0=["title","section","two-column","feature-grid","data-table","stat-row","timeline","quote","closing","image-hero","comparison"],Xl={title:"Title",section:"Section divider","two-column":"Two column","feature-grid":"Feature grid","data-table":"Data table","stat-row":"Stat row",timeline:"Timeline",quote:"Quote",closing:"Closing","image-hero":"Image hero",comparison:"Comparison"};function r0(e){switch(e){case"title":return{layout:e,eyebrow:"Eyebrow",heading:"Title slide",lead:"Supporting line."};case"section":return{layout:e,number:"01",eyebrow:"Part",heading:"Section title",lead:""};case"two-column":return{layout:e,heading:"Heading",body:"Left column body text.",image:"",imageAlt:"Image"};case"image-hero":return{layout:e,eyebrow:"Story",heading:"Hero moment",lead:"Caption over a full-bleed image.",image:"",imageAlt:"Hero image"};case"comparison":return{layout:e,heading:"Before vs after",leftLabel:"Before",left:"The old way — slow, manual, error-prone.",rightLabel:"After",right:"The new way — automated, fast, reliable."};case"feature-grid":return{layout:e,heading:"Feature grid",columns:3,cards:[{title:"One",body:"First point."},{title:"Two",body:"Second point."},{title:"Three",body:"Third point."}]};case"data-table":return{layout:e,heading:"Table",columns:["Column A","Column B"],rows:[["a1","b1"],["a2","b2"]]};case"stat-row":return{layout:e,heading:"Stats",stats:[{value:"100%",label:"Metric"},{value:"2x",label:"Metric"}]};case"timeline":return{layout:e,heading:"Timeline",steps:[{title:"Step one",body:"Detail."},{title:"Step two",body:"Detail."}]};case"quote":return{layout:e,quote:"A memorable quote.",by:"Attribution"};case"closing":return{layout:e,eyebrow:"Thanks",heading:"Closing",lead:"Call to action.",cta:{label:"Get started",href:"https://example.com"}};default:return{layout:e,heading:"Slide"}}}const Cc={type:"deck",meta:{title:"Acme Q3",company:"Acme",theme:"claude"},slides:[{layout:"title",eyebrow:"Q3 2026",heading:"Acme All-Hands",lead:"Momentum, metrics, and what's next."},{layout:"section",number:"01",eyebrow:"Part one",heading:"Where we are"},{layout:"feature-grid",heading:"Three pillars",columns:3,cards:[{icon:"fa-solid fa-bolt",title:"Speed",body:"Ship 3x faster."},{title:"Safety",body:"SOC2 in progress."},{title:"Simplicity",body:"One command."}]},{layout:"stat-row",heading:"By the numbers",stats:[{value:"98%",label:"Uptime"},{value:"$1.2M",label:"ARR"},{value:"3.1x",label:"YoY"}]},{layout:"data-table",heading:"Pipeline",columns:["Stage","Count","Value"],rows:[["Lead","120","$600k"],["POC","34","$340k"],["Closed","12","$210k"]]},{layout:"timeline",heading:"Roadmap",steps:[{title:"Now",body:"PPTX export."},{title:"Next",body:"Studio editor."},{title:"Later",body:"Templates."}]},{layout:"quote",quote:"Make it work, make it right, make it fast.",by:"Kent Beck"},{layout:"closing",heading:"Thank you",lead:"Questions?",cta:{label:"Get started",href:"https://acme.com"}}]},Ec="claude",jc="0.1.0",Nc="Anthropic / Claude-inspired theme: warm cream paper, clay-coral accent, grotesk + editorial-serif pairing.",Tc="Warm, human, editorial, high-craft, calm — cream paper, soft clay-coral signal, Styrene-style grotesk headings over a Tiempos-style serif body. Restrained, trustworthy, not corporate.",$c="MIT",Pc="Timur Isachenko",zc={bg:"#faf9f5",bg2:"#f4f3ee",text:"#141413",muted:"#73706a",accent:"#d97757",accent2:"#6a9bcc",cardBg:"#ffffff",border:"#e8e6dc"},Lc={headingFont:"'Space Grotesk', system-ui, sans-serif",bodyFont:"'Lora', Georgia, 'Times New Roman', serif",headingWeight:600,googleFonts:["Space+Grotesk:wght@500;600;700","Lora:wght@400;500;600"]},Mc={radius:"12px",slideWidth:"1280px"},o0={name:Ec,version:jc,extends:"default-tech",description:Nc,vibe:Tc,license:$c,author:Pc,roles:zc,typography:Lc,geometry:Mc},l0=Object.freeze(Object.defineProperty({__proto__:null,author:Pc,default:o0,description:Nc,geometry:Mc,license:$c,name:Ec,roles:zc,typography:Lc,version:jc,vibe:Tc},Symbol.toStringTag,{value:"Module"})),Oc="default-tech",Fc="0.1.0",Ic="Edgy tech-startup default: dark canvas, violet + cyan accents, bold geometric sans.",Rc="Edgy tech startup — dark, confident, neon-accented.",Dc="MIT",Ac="Timur Isachenko",Uc={bg:"#0e0e12",bg2:"#16161d",text:"#f4f4f5",muted:"#a1a1aa",accent:"#7c3aed",accent2:"#22d3ee",cardBg:"rgba(255,255,255,0.04)",border:"rgba(255,255,255,0.08)"},Bc={headingFont:"'Montserrat', system-ui, sans-serif",bodyFont:"'Open Sans', system-ui, sans-serif",headingWeight:800,googleFonts:["Montserrat:wght@700;800","Open+Sans:wght@400;600"]},Wc={radius:"18px",slideWidth:"1280px"},a0={name:Oc,version:Fc,description:Ic,vibe:Rc,license:Dc,author:Ac,roles:Uc,typography:Bc,geometry:Wc},i0=Object.freeze(Object.defineProperty({__proto__:null,author:Ac,default:a0,description:Ic,geometry:Wc,license:Dc,name:Oc,roles:Uc,typography:Bc,version:Fc,vibe:Rc},Symbol.toStringTag,{value:"Module"})),Hc="aerospace-hud",Vc="0.1.0",Qc="Aerospace HUD — deep navy, cyan instruments, warning orange, blueprint grid.",Gc="Aerospace HUD — navy cockpit, cyan instruments, warning orange, Barlow Condensed (matches Axiom gallery).",Kc="MIT",Yc="Timur Isachenko",Xc={bg:"#0a1d3a",bg2:"#0d2347",text:"#f0f8ff",muted:"#2a7aaa",accent:"#5ec8ff",accent2:"#ff7a18",cardBg:"rgba(94,200,255,0.08)",border:"rgba(94,200,255,0.28)"},Jc={headingFont:"'Barlow Condensed', system-ui, sans-serif",bodyFont:"'Barlow', system-ui, sans-serif",headingWeight:700,googleFonts:["Barlow+Condensed:wght@600;700","Barlow:wght@400;600","IBM+Plex+Mono:wght@500"]},qc={radius:"4px",slideWidth:"1280px"},s0={name:Hc,version:Vc,extends:"default-tech",description:Qc,vibe:Gc,license:Kc,author:Yc,roles:Xc,typography:Jc,geometry:qc},u0=Object.freeze(Object.defineProperty({__proto__:null,author:Yc,default:s0,description:Qc,geometry:qc,license:Kc,name:Hc,roles:Xc,typography:Jc,version:Vc,vibe:Gc},Symbol.toStringTag,{value:"Module"})),Zc="aurora-glass",ed="0.1.0",nd="Dark aurora glassmorphism — void canvas, frosted cards, violet + cyan glow.",td="Aurora glass — pure black void, Syne + Inter, violet #a78bfa + cyan #67e8f9 (matches NovaSpark gallery).",rd="MIT",od="Timur Isachenko",ld={bg:"#000000",bg2:"#0a0612",text:"#ffffff",muted:"#a5a0b8",accent:"#a78bfa",accent2:"#67e8f9",cardBg:"rgba(255,255,255,0.06)",border:"rgba(255,255,255,0.12)"},ad={headingFont:"'Syne', system-ui, sans-serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:800,googleFonts:["Syne:wght@700;800","Inter:wght@400;600"]},id={radius:"16px",slideWidth:"1280px"},c0={name:Zc,version:ed,extends:"default-tech",description:nd,vibe:td,license:rd,author:od,roles:ld,typography:ad,geometry:id},d0=Object.freeze(Object.defineProperty({__proto__:null,author:od,default:c0,description:nd,geometry:id,license:rd,name:Zc,roles:ld,typography:ad,version:ed,vibe:td},Symbol.toStringTag,{value:"Module"})),sd="bauhaus",ud="0.1.0",cd="Bauhaus primary system — cream field, red/yellow/blue geometry, bold grotesk.",dd="Bauhaus — warm cream #f4f1ea, primary red #e63946 + blue #1f4ae0 (matches Primary gallery).",fd="MIT",pd="Timur Isachenko",hd={bg:"#f4f1ea",bg2:"#ede9e0",text:"#0d0d0d",muted:"#6a655c",accent:"#e63946",accent2:"#1f4ae0",cardBg:"rgba(0,0,0,0.04)",border:"rgba(13,13,13,0.2)"},gd={headingFont:"'Archivo', system-ui, sans-serif",bodyFont:"'Space Grotesk', system-ui, sans-serif",headingWeight:800,googleFonts:["Archivo:wght@600;800","Space+Grotesk:wght@400;600"]},md={radius:"0px",slideWidth:"1280px"},f0={name:sd,version:ud,extends:"default-tech",description:cd,vibe:dd,license:fd,author:pd,roles:hd,typography:gd,geometry:md},p0=Object.freeze(Object.defineProperty({__proto__:null,author:pd,default:f0,description:cd,geometry:md,license:fd,name:sd,roles:hd,typography:gd,version:ud,vibe:dd},Symbol.toStringTag,{value:"Module"})),yd="botanical-luxe",vd="0.1.0",xd="Botanical luxe — deep forest green, gold leaf, serif elegance for impact reports.",wd="Botanical luxe — forest #1d3a2f, gold #bfa55a, Cormorant + DM Sans (matches Verdant gallery).",kd="MIT",bd="Timur Isachenko",Sd={bg:"#1d3a2f",bg2:"#162d24",text:"#f3efe4",muted:"#6b9e7a",accent:"#bfa55a",accent2:"#4a7c59",cardBg:"rgba(191,165,90,0.08)",border:"rgba(191,165,90,0.28)"},_d={headingFont:"'Cormorant Garamond', Georgia, serif",bodyFont:"'DM Sans', system-ui, sans-serif",headingWeight:600,googleFonts:["Cormorant+Garamond:wght@500;600;700","DM+Sans:wght@400;600"]},Cd={radius:"8px",slideWidth:"1280px"},h0={name:yd,version:vd,extends:"default-tech",description:xd,vibe:wd,license:kd,author:bd,roles:Sd,typography:_d,geometry:Cd},g0=Object.freeze(Object.defineProperty({__proto__:null,author:bd,default:h0,description:xd,geometry:Cd,license:kd,name:yd,roles:Sd,typography:_d,version:vd,vibe:wd},Symbol.toStringTag,{value:"Module"})),Ed="brutalist-acid",jd="0.1.0",Nd="Dark acid brutalist — near-black concrete, #d6ff00 hazard lime, hard mono edges.",Td="Acid brutalist — #1c1c1c, electric lime, Space Mono + Barlow Condensed (matches MONOLITH gallery).",$d="MIT",Pd="Timur Isachenko",zd={bg:"#1c1c1c",bg2:"#2a2a2a",text:"#e8e6e1",muted:"#888888",accent:"#d6ff00",accent2:"#ffffff",cardBg:"rgba(214,255,0,0.06)",border:"rgba(214,255,0,0.35)"},Ld={headingFont:"'Space Mono', monospace",bodyFont:"'Barlow Condensed', system-ui, sans-serif",headingWeight:700,googleFonts:["Space+Mono:wght@400;700","Barlow+Condensed:wght@500;700"]},Md={radius:"0px",slideWidth:"1280px"},m0={name:Ed,version:jd,extends:"default-tech",description:Nd,vibe:Td,license:$d,author:Pd,roles:zd,typography:Ld,geometry:Md},y0=Object.freeze(Object.defineProperty({__proto__:null,author:Pd,default:m0,description:Nd,geometry:Md,license:$d,name:Ed,roles:zd,typography:Ld,version:jd,vibe:Td},Symbol.toStringTag,{value:"Module"})),Od="brutalist-mono",Fd="0.1.0",Id="Raw brutalist theme with concrete-grey background, monospace type, hard square corners, and a single hazard-orange accent.",Rd="Raw brutalist / technical — concrete off-white bg, near-black monospace ink, hazard-orange accent, thick black hairlines, zero radius.",Dd="MIT",Ad="Timur Isachenko",Ud={bg:"#f0efe9",bg2:"#e3e1d8",text:"#0a0a0a",muted:"#57554c",accent:"#ff3600",accent2:"#0a0a0a",cardBg:"#ffffff",border:"rgba(10,10,10,0.85)"},Bd={headingFont:"'IBM Plex Mono', 'Courier New', monospace",bodyFont:"'IBM Plex Mono', 'Courier New', monospace",headingWeight:700,googleFonts:["IBM+Plex+Mono:wght@400;600;700"]},Wd={radius:"0px",slideWidth:"1280px"},v0={name:Od,version:Fd,extends:"default-tech",description:Id,vibe:Rd,license:Dd,author:Ad,roles:Ud,typography:Bd,geometry:Wd},x0=Object.freeze(Object.defineProperty({__proto__:null,author:Ad,default:v0,description:Id,geometry:Wd,license:Dd,name:Od,roles:Ud,typography:Bd,version:Fd,vibe:Rd},Symbol.toStringTag,{value:"Module"})),Hd="candy-pop",Vd="0.1.0",Qd="Candy pop — cream canvas, hot pink + butter yellow, soft blobs, rounded type.",Gd="Candy pop — cream canvas, hot pink + jellybean blue, Fredoka + Poppins (matches Jellybean gallery).",Kd="MIT",Yd="Timur Isachenko",Xd={bg:"#fdf3e7",bg2:"#f7e8d4",text:"#1a1a2e",muted:"#7a6a80",accent:"#ff5d8f",accent2:"#2d7dd2",cardBg:"rgba(255,93,143,0.08)",border:"rgba(26,26,46,0.14)"},Jd={headingFont:"'Fredoka', system-ui, sans-serif",bodyFont:"'Poppins', system-ui, sans-serif",headingWeight:700,googleFonts:["Fredoka:wght@500;700","Poppins:wght@400;600"]},qd={radius:"28px",slideWidth:"1280px"},w0={name:Hd,version:Vd,extends:"default-tech",description:Qd,vibe:Gd,license:Kd,author:Yd,roles:Xd,typography:Jd,geometry:qd},k0=Object.freeze(Object.defineProperty({__proto__:null,author:Yd,default:w0,description:Qd,geometry:qd,license:Kd,name:Hd,roles:Xd,typography:Jd,version:Vd,vibe:Gd},Symbol.toStringTag,{value:"Module"})),Zd="corporate",ef="0.1.0",nf="Formal corporate presentation theme with crisp white background and restrained navy/blue palette.",tf="Formal corporate — crisp white, navy text, single restrained blue accent, clean sans-serif, thin rules, minimal shadow.",rf="MIT",of="Timur Isachenko",lf={bg:"#ffffff",bg2:"#f8f9fc",text:"#1a2035",muted:"#6b7280",accent:"#1d4ed8",accent2:"#0369a1",cardBg:"#f1f5f9",border:"rgba(0,0,0,0.08)"},af={headingFont:"'Inter', system-ui, sans-serif",bodyFont:"'Source Sans 3', system-ui, sans-serif",headingWeight:700,googleFonts:["Inter:wght@400;700","Source+Sans+3:wght@400;600"]},sf={radius:"8px",slideWidth:"1280px"},b0={name:Zd,version:ef,extends:"default-tech",description:nf,vibe:tf,license:rf,author:of,roles:lf,typography:af,geometry:sf},S0=Object.freeze(Object.defineProperty({__proto__:null,author:of,default:b0,description:nf,geometry:sf,license:rf,name:Zd,roles:lf,typography:af,version:ef,vibe:tf},Symbol.toStringTag,{value:"Module"})),uf="crt-terminal",cf="0.1.0",df="CRT phosphor terminal — near-black, acid green glow, cyan accents, monospace.",ff="CRT terminal — void bg, cream type, phosphor green + cyan accents (matches RetroNet gallery).",pf="MIT",hf="Timur Isachenko",gf={bg:"#06040a",bg2:"#1a1010",text:"#f5f0e8",muted:"#8a8578",accent:"#39ff14",accent2:"#00f5ff",cardBg:"rgba(57,255,20,0.06)",border:"rgba(57,255,20,0.28)"},mf={headingFont:"'VT323', monospace",bodyFont:"'Share Tech Mono', monospace",headingWeight:400,googleFonts:["VT323","Share+Tech+Mono","Courier+Prime"]},yf={radius:"0px",slideWidth:"1280px"},_0={name:uf,version:cf,extends:"default-tech",description:df,vibe:ff,license:pf,author:hf,roles:gf,typography:mf,geometry:yf},C0=Object.freeze(Object.defineProperty({__proto__:null,author:hf,default:_0,description:df,geometry:yf,license:pf,name:uf,roles:gf,typography:mf,version:cf,vibe:ff},Symbol.toStringTag,{value:"Module"})),vf="editorial-serif",xf="0.1.0",wf="Magazine-editorial theme with warm paper background, ink-black serif text, and a single masthead-crimson accent.",kf="Print magazine editorial — warm cream paper, near-black serif ink, crimson masthead accent, thin hairline rules, square corners.",bf="MIT",Sf="Timur Isachenko",_f={bg:"#faf7f2",bg2:"#f2ede3",text:"#1c1a17",muted:"#5c574c",accent:"#9c1c1c",accent2:"#a67c1e",cardBg:"#f2ede3",border:"rgba(28,26,23,0.12)"},Cf={headingFont:"'Playfair Display', Georgia, serif",bodyFont:"'Source Serif 4', Georgia, serif",headingWeight:700,googleFonts:["Playfair+Display:wght@700;900","Source+Serif+4:wght@400;600"]},Ef={radius:"2px",slideWidth:"1280px"},E0={name:vf,version:xf,extends:"default-tech",description:wf,vibe:kf,license:bf,author:Sf,roles:_f,typography:Cf,geometry:Ef},j0=Object.freeze(Object.defineProperty({__proto__:null,author:Sf,default:E0,description:wf,geometry:Ef,license:bf,name:vf,roles:_f,typography:Cf,version:xf,vibe:kf},Symbol.toStringTag,{value:"Module"})),jf="ft-editorial",Nf="0.1.0",Tf="Financial Times–inspired broadsheet — warm paper, ink, FT blue + signal red.",$f="FT editorial — #f7f5f0 newsprint, Libre Baskerville + IBM Plex, FT blue + signal red (matches Meridian gallery).",Pf="MIT",zf="Timur Isachenko",Lf={bg:"#f7f5f0",bg2:"#f2efe8",text:"#0a0a0a",muted:"#6b6560",accent:"#1a4fd8",accent2:"#c0392b",cardBg:"rgba(10,10,10,0.03)",border:"rgba(10,10,10,0.12)"},Mf={headingFont:"'Libre Baskerville', Georgia, serif",bodyFont:"'IBM Plex Sans', system-ui, sans-serif",headingWeight:700,googleFonts:["Libre+Baskerville:wght@400;700","IBM+Plex+Sans:wght@400;600","IBM+Plex+Mono:wght@500"]},Of={radius:"0px",slideWidth:"1280px"},N0={name:jf,version:Nf,extends:"default-tech",description:Tf,vibe:$f,license:Pf,author:zf,roles:Lf,typography:Mf,geometry:Of},T0=Object.freeze(Object.defineProperty({__proto__:null,author:zf,default:N0,description:Tf,geometry:Of,license:Pf,name:jf,roles:Lf,typography:Mf,version:Nf,vibe:$f},Symbol.toStringTag,{value:"Module"})),Ff="genz-bento",If="0.1.0",Rf="Gen-Z hard-shadow bento — hot coral, lime stickers, chunky ink borders.",Df="Gen-Z bento — #fff9f5, coral #ff4d2e + lime #b6f542, Nunito hard shadows (matches Bounce gallery).",Af="MIT",Uf="Timur Isachenko",Bf={bg:"#fff9f5",bg2:"#fff3ea",text:"#0f0f1a",muted:"#5c5666",accent:"#ff4d2e",accent2:"#b6f542",cardBg:"#ffffff",border:"#0f0f1a"},Wf={headingFont:"'Nunito', system-ui, sans-serif",bodyFont:"'Nunito Sans', system-ui, sans-serif",headingWeight:900,googleFonts:["Nunito:wght@700;800;900","Nunito+Sans:wght@400;600"]},Hf={radius:"18px",slideWidth:"1280px"},$0={name:Ff,version:If,extends:"default-tech",description:Rf,vibe:Df,license:Af,author:Uf,roles:Bf,typography:Wf,geometry:Hf},P0=Object.freeze(Object.defineProperty({__proto__:null,author:Uf,default:$0,description:Rf,geometry:Hf,license:Af,name:Ff,roles:Bf,typography:Wf,version:If,vibe:Df},Symbol.toStringTag,{value:"Module"})),Vf="luxury-minimalist",Qf="0.1.0",Gf="Luxury minimalist theme with warm off-white canvas, dark charcoal, hairline borders, and no gradients.",Kf="Luxury minimalist — warm off-white canvas, dark charcoal text, near-zero decoration, generous whitespace, thin serif display, hairline borders, no gradients.",Yf="MIT",Xf="Timur Isachenko",Jf={bg:"#faf8f5",bg2:"#f5f2ee",text:"#1c1917",muted:"#78716c",accent:"#92400e",accent2:"#b45309",cardBg:"rgba(28,25,23,0.03)",border:"rgba(28,25,23,0.10)"},qf={headingFont:"'Cormorant Garamond', Georgia, serif",bodyFont:"'DM Sans', system-ui, sans-serif",headingWeight:600,googleFonts:["Cormorant+Garamond:wght@400;600","DM+Sans:wght@400;500"]},Zf={radius:"4px",slideWidth:"1280px"},z0={name:Vf,version:Qf,extends:"default-tech",description:Gf,vibe:Kf,license:Yf,author:Xf,roles:Jf,typography:qf,geometry:Zf},L0=Object.freeze(Object.defineProperty({__proto__:null,author:Xf,default:z0,description:Gf,geometry:Zf,license:Yf,name:Vf,roles:Jf,typography:qf,version:Qf,vibe:Kf},Symbol.toStringTag,{value:"Module"})),ep="neon-noir",np="0.1.0",tp="Neon noir — wet asphalt night, hot magenta + electric cyan, cinematic rain.",rp="Neon noir — #050510 night, hot pink #ff2e97 + cyan #00e5ff, Orbitron (matches Neon District gallery).",op="MIT",lp="Timur Isachenko",ap={bg:"#050510",bg2:"#0a0a1e",text:"#e8e4f0",muted:"#8884a8",accent:"#ff2e97",accent2:"#00e5ff",cardBg:"rgba(255,46,151,0.07)",border:"rgba(0,229,255,0.22)"},ip={headingFont:"'Orbitron', system-ui, sans-serif",bodyFont:"'Share Tech Mono', monospace",headingWeight:700,googleFonts:["Orbitron:wght@600;700","Share+Tech+Mono"]},sp={radius:"10px",slideWidth:"1280px"},M0={name:ep,version:np,extends:"default-tech",description:tp,vibe:rp,license:op,author:lp,roles:ap,typography:ip,geometry:sp},O0=Object.freeze(Object.defineProperty({__proto__:null,author:lp,default:M0,description:tp,geometry:sp,license:op,name:ep,roles:ap,typography:ip,version:np,vibe:rp},Symbol.toStringTag,{value:"Module"})),up="pastel-dreamy",cp="0.1.0",dp="Soft pastel theme with lavender-blush background, deep plum text, and a blush/periwinkle accent pair.",fp="Soft pastel dreamy — lavender-blush bg, deep plum text for readability, blush-pink + periwinkle accent pair, generously rounded, gentle.",pp="MIT",hp="Timur Isachenko",gp={bg:"#fdf6fb",bg2:"#f5ecf9",text:"#3a2e4d",muted:"#6b5d82",accent:"#e893c2",accent2:"#8ab4f8",cardBg:"#f5ecf9",border:"rgba(58,46,77,0.10)"},mp={headingFont:"'Quicksand', system-ui, sans-serif",bodyFont:"'Mulish', system-ui, sans-serif",headingWeight:700,googleFonts:["Quicksand:wght@500;700","Mulish:wght@400;600"]},yp={radius:"28px",slideWidth:"1280px"},F0={name:up,version:cp,extends:"default-tech",description:dp,vibe:fp,license:pp,author:hp,roles:gp,typography:mp,geometry:yp},I0=Object.freeze(Object.defineProperty({__proto__:null,author:hp,default:F0,description:dp,geometry:yp,license:pp,name:up,roles:gp,typography:mp,version:cp,vibe:fp},Symbol.toStringTag,{value:"Module"})),vp="playful",xp="0.1.0",wp="Playful creative-agency theme with bold coral and lime accents, rounded corners, and sticker-style energy.",kp="Playful creative agency — bright warm white, bold coral + lime accent pair, rounded everything, big type, sticker-style shadows.",bp="MIT",Sp="Timur Isachenko",_p={bg:"#fffbf0",bg2:"#fff9e6",text:"#1a1a2e",muted:"#6b6b8a",accent:"#ff4757",accent2:"#2ed573",cardBg:"rgba(255,71,87,0.06)",border:"rgba(255,71,87,0.15)"},Cp={headingFont:"'Nunito', system-ui, sans-serif",bodyFont:"'Nunito', system-ui, sans-serif",headingWeight:800,googleFonts:["Nunito:wght@400;700;800"]},Ep={radius:"24px",slideWidth:"1280px"},R0={name:vp,version:xp,extends:"default-tech",description:wp,vibe:kp,license:bp,author:Sp,roles:_p,typography:Cp,geometry:Ep},D0=Object.freeze(Object.defineProperty({__proto__:null,author:Sp,default:R0,description:wp,geometry:Ep,license:bp,name:vp,roles:_p,typography:Cp,version:xp,vibe:kp},Symbol.toStringTag,{value:"Module"})),jp="retro-arcade",Np="0.1.0",Tp="Retro 80s arcade theme with deep purple-black background, magenta and cyan neon accents, and pixel display fonts.",$p="Retro 80s arcade — deep purple-black bg, magenta + electric cyan neon, glow text-shadow, pixel display font, scanline feel.",Pp="MIT",zp="Timur Isachenko",Lp={bg:"#0d0015",bg2:"#150025",text:"#e0e0ff",muted:"#9090cc",accent:"#ff00ff",accent2:"#00ffff",cardBg:"rgba(255,0,255,0.08)",border:"rgba(0,255,255,0.20)"},Mp={headingFont:"'Orbitron', system-ui, sans-serif",bodyFont:"'Share Tech Mono', monospace",headingWeight:700,googleFonts:["Orbitron:wght@400;700","Share+Tech+Mono"]},Op={radius:"0px",slideWidth:"1280px"},A0={name:jp,version:Np,extends:"default-tech",description:Tp,vibe:$p,license:Pp,author:zp,roles:Lp,typography:Mp,geometry:Op},U0=Object.freeze(Object.defineProperty({__proto__:null,author:zp,default:A0,description:Tp,geometry:Op,license:Pp,name:jp,roles:Lp,typography:Mp,version:Np,vibe:$p},Symbol.toStringTag,{value:"Module"})),Fp="risograph-zine",Ip="0.1.0",Rp="Risograph zine — warm paper, misregistered ink, magenta + teal print shop energy.",Dp="Risograph zine — kraft #f3ecdd, red #ff4f4f + blue #2b3aff overprint (matches Inkwell gallery).",Ap="MIT",Up="Timur Isachenko",Bp={bg:"#f3ecdd",bg2:"#e8dfc8",text:"#1a1209",muted:"#7a6a52",accent:"#ff4f4f",accent2:"#2b3aff",cardBg:"rgba(255,79,79,0.06)",border:"rgba(26,18,9,0.18)"},Wp={headingFont:"'Archivo Black', system-ui, sans-serif",bodyFont:"'Space Mono', monospace",headingWeight:400,googleFonts:["Archivo+Black","Space+Mono:wght@400;700"]},Hp={radius:"2px",slideWidth:"1280px"},B0={name:Fp,version:Ip,extends:"default-tech",description:Rp,vibe:Dp,license:Ap,author:Up,roles:Bp,typography:Wp,geometry:Hp},W0=Object.freeze(Object.defineProperty({__proto__:null,author:Up,default:B0,description:Rp,geometry:Hp,license:Ap,name:Fp,roles:Bp,typography:Wp,version:Ip,vibe:Dp},Symbol.toStringTag,{value:"Module"})),Vp="swiss-typographic",Qp="0.1.0",Gp="Swiss International Typographic Style — white grid, signal red, Helvetica-like grotesk.",Kp="Swiss typographic — pure white, Inter grotesk, signal red, zero radius, modular grid (matches Grid Systems gallery).",Yp="MIT",Xp="Timur Isachenko",Jp={bg:"#ffffff",bg2:"#f5f5f5",text:"#0a0a0a",muted:"#636363",accent:"#e2231a",accent2:"#0a0a0a",cardBg:"rgba(0,0,0,0.03)",border:"rgba(0,0,0,0.12)"},qp={headingFont:"'Inter', Helvetica, Arial, sans-serif",bodyFont:"'Inter', Helvetica, Arial, sans-serif",headingWeight:800,googleFonts:["Inter:wght@400;600;800"]},Zp={radius:"0px",slideWidth:"1280px"},H0={name:Vp,version:Qp,extends:"default-tech",description:Gp,vibe:Kp,license:Yp,author:Xp,roles:Jp,typography:qp,geometry:Zp},V0=Object.freeze(Object.defineProperty({__proto__:null,author:Xp,default:H0,description:Gp,geometry:Zp,license:Yp,name:Vp,roles:Jp,typography:qp,version:Qp,vibe:Kp},Symbol.toStringTag,{value:"Module"})),eh="vaporwave",nh="0.1.0",th="Vaporwave — purple dusk, sunset gradient, chrome teal, nostalgic mall energy.",rh="Vaporwave — #1a0533 dusk, #ff6ad5 pink + #5ce1ff teal, Monoton (matches Mallsoft gallery).",oh="MIT",lh="Timur Isachenko",ah={bg:"#1a0533",bg2:"#2d1060",text:"#fff0f9",muted:"#c4a8ff",accent:"#ff6ad5",accent2:"#5ce1ff",cardBg:"rgba(255,106,213,0.08)",border:"rgba(92,225,255,0.28)"},ih={headingFont:"'Monoton', display, cursive",bodyFont:"'Space Mono', monospace",headingWeight:400,googleFonts:["Monoton","Space+Mono:wght@400;700","VT323"]},sh={radius:"6px",slideWidth:"1280px"},Q0={name:eh,version:nh,extends:"default-tech",description:th,vibe:rh,license:oh,author:lh,roles:ah,typography:ih,geometry:sh},G0=Object.freeze(Object.defineProperty({__proto__:null,author:lh,default:Q0,description:th,geometry:sh,license:oh,name:eh,roles:ah,typography:ih,version:nh,vibe:rh},Symbol.toStringTag,{value:"Module"})),uh="y2k-aero",ch="0.1.0",dh="Y2K aero — icy gradients, chrome cyan, soft bubbles, futuristic optimism.",fh="Y2K aero — icy #e0f7ff, sky #38bdf8 + lime #a3e635, Nunito (matches BubbleFlow gallery).",ph="MIT",hh="Timur Isachenko",gh={bg:"#e0f7ff",bg2:"#bae6fd",text:"#0c4a6e",muted:"#0369a1",accent:"#38bdf8",accent2:"#a3e635",cardBg:"rgba(255,255,255,0.72)",border:"rgba(14,165,233,0.28)"},mh={headingFont:"'Nunito', system-ui, sans-serif",bodyFont:"'Nunito Sans', system-ui, sans-serif",headingWeight:800,googleFonts:["Nunito:wght@700;800","Nunito+Sans:wght@400;600"]},yh={radius:"32px",slideWidth:"1280px"},K0={name:uh,version:ch,extends:"default-tech",description:dh,vibe:fh,license:ph,author:hh,roles:gh,typography:mh,geometry:yh},Y0=Object.freeze(Object.defineProperty({__proto__:null,author:hh,default:K0,description:dh,geometry:yh,license:ph,name:uh,roles:gh,typography:mh,version:ch,vibe:fh},Symbol.toStringTag,{value:"Module"})),X0={bg:"#0e0e12",bg2:"#16161d",text:"#f4f4f5",muted:"#a1a1aa",accent:"#7c3aed",accent2:"#22d3ee",cardBg:"rgba(255,255,255,0.04)",border:"rgba(255,255,255,0.08)"},J0={headingFont:"'Montserrat', system-ui, sans-serif",bodyFont:"'Open Sans', system-ui, sans-serif",headingWeight:800,googleFonts:["Montserrat:wght@700;800","Open+Sans:wght@400;600"]},q0={radius:"18px",slideWidth:"1280px"},Z0={...Object.assign({"../../../core/themes/claude/theme.json":l0,"../../../core/themes/default-tech/theme.json":i0}),...Object.assign({"../../../themes/aerospace-hud/theme.json":u0,"../../../themes/aurora-glass/theme.json":d0,"../../../themes/bauhaus/theme.json":p0,"../../../themes/botanical-luxe/theme.json":g0,"../../../themes/brutalist-acid/theme.json":y0,"../../../themes/brutalist-mono/theme.json":x0,"../../../themes/candy-pop/theme.json":k0,"../../../themes/corporate/theme.json":S0,"../../../themes/crt-terminal/theme.json":C0,"../../../themes/editorial-serif/theme.json":j0,"../../../themes/ft-editorial/theme.json":T0,"../../../themes/genz-bento/theme.json":P0,"../../../themes/luxury-minimalist/theme.json":L0,"../../../themes/neon-noir/theme.json":O0,"../../../themes/pastel-dreamy/theme.json":I0,"../../../themes/playful/theme.json":D0,"../../../themes/retro-arcade/theme.json":U0,"../../../themes/risograph-zine/theme.json":W0,"../../../themes/swiss-typographic/theme.json":V0,"../../../themes/vaporwave/theme.json":G0,"../../../themes/y2k-aero/theme.json":Y0})},co=new Map;for(const e of Object.values(Z0)){const n="default"in e?e.default:e;n!=null&&n.name&&co.set(n.name,n)}function vh(){return[...co.keys()].sort()}function Va(e){const n=[];let t=co.has(e)?e:"default-tech";const r=new Set;for(;t&&!r.has(t);){r.add(t);const s=co.get(t);if(!s)break;n.unshift(s),t=s.extends}const o={...X0},l={...J0},a={...q0};for(const s of n)Object.assign(o,s.roles??{}),Object.assign(l,s.typography??{}),Object.assign(a,s.geometry??{});const i=n[n.length-1]??{name:"default-tech",version:"0.0.0"};return{name:i.name,version:i.version,manifest:i,palette:o,typography:l,geometry:a}}const ey=`<section class="slide title-slide closing-slide">
  {{#eyebrow}}<span class="eyebrow">{{eyebrow}}</span>{{/eyebrow}}
  <h1>{{heading}}</h1>
  {{#lead}}<p class="lead">{{lead}}</p>{{/lead}}
  {{#cta}}<a class="btn" href="{{href}}"><i class="fa-solid fa-arrow-right"></i> {{label}}</a>{{/cta}}
</section>
`,ny=`<section class="slide comparison-slide">
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
`,ty=`<section class="slide">
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
`,ry=`<section class="slide">
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
`,oy=`<section class="slide image-hero-slide">
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
`,ly=`<section class="slide quote-slide">
  <p class="quote">{{quote}}</p>
  {{#by}}<p class="quote-by">— {{by}}</p>{{/by}}
</section>
`,ay=`<section class="slide section-slide">
  {{#number}}<div class="section-number">{{number}}</div>{{/number}}
  <h2>{{heading}}</h2>
  {{#lead}}<p class="lead">{{lead}}</p>{{/lead}}
</section>
`,iy=`<section class="slide">
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
`,sy=`<section class="slide">
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
`,uy=`<section class="slide title-slide">
  {{#eyebrow}}<span class="eyebrow">{{eyebrow}}</span>{{/eyebrow}}
  <h1>{{heading}}</h1>
  {{#lead}}<p class="lead">{{lead}}</p>{{/lead}}
</section>
`,cy=`<section class="slide">
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
 */var dy=Object.prototype.toString,pt=Array.isArray||function(n){return dy.call(n)==="[object Array]"};function Qa(e){return typeof e=="function"}function fy(e){return pt(e)?"array":typeof e}function rl(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function is(e,n){return e!=null&&typeof e=="object"&&n in e}function py(e,n){return e!=null&&typeof e!="object"&&e.hasOwnProperty&&e.hasOwnProperty(n)}var hy=RegExp.prototype.test;function gy(e,n){return hy.call(e,n)}var my=/\S/;function yy(e){return!gy(my,e)}var vy={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};function xy(e){return String(e).replace(/[&<>"'`=\/]/g,function(t){return vy[t]})}var wy=/\s*/,ky=/\s+/,ss=/\s*=/,by=/\s*\}/,Sy=/#|\^|\/|>|\{|&|=|!/;function _y(e,n){if(!e)return[];var t=!1,r=[],o=[],l=[],a=!1,i=!1,s="",u=0;function f(){if(a&&!i)for(;l.length;)delete o[l.pop()];else l=[];a=!1,i=!1}var h,m,v;function S(E){if(typeof E=="string"&&(E=E.split(ky,2)),!pt(E)||E.length!==2)throw new Error("Invalid tags: "+E);h=new RegExp(rl(E[0])+"\\s*"),m=new RegExp("\\s*"+rl(E[1])),v=new RegExp("\\s*"+rl("}"+E[1]))}S(n||ye.tags);for(var w=new ar(e),N,p,c,g,x,y;!w.eos();){if(N=w.pos,c=w.scanUntil(h),c)for(var k=0,j=c.length;k<j;++k)g=c.charAt(k),yy(g)?(l.push(o.length),s+=g):(i=!0,t=!0,s+=" "),o.push(["text",g,N,N+1]),N+=1,g===`
`&&(f(),s="",u=0,t=!1);if(!w.scan(h))break;if(a=!0,p=w.scan(Sy)||"name",w.scan(wy),p==="="?(c=w.scanUntil(ss),w.scan(ss),w.scanUntil(m)):p==="{"?(c=w.scanUntil(v),w.scan(by),w.scanUntil(m),p="&"):c=w.scanUntil(m),!w.scan(m))throw new Error("Unclosed tag at "+w.pos);if(p==">"?x=[p,c,N,w.pos,s,u,t]:x=[p,c,N,w.pos],u++,o.push(x),p==="#"||p==="^")r.push(x);else if(p==="/"){if(y=r.pop(),!y)throw new Error('Unopened section "'+c+'" at '+N);if(y[1]!==c)throw new Error('Unclosed section "'+y[1]+'" at '+N)}else p==="name"||p==="{"||p==="&"?i=!0:p==="="&&S(c)}if(f(),y=r.pop(),y)throw new Error('Unclosed section "'+y[1]+'" at '+w.pos);return Ey(Cy(o))}function Cy(e){for(var n=[],t,r,o=0,l=e.length;o<l;++o)t=e[o],t&&(t[0]==="text"&&r&&r[0]==="text"?(r[1]+=t[1],r[3]=t[3]):(n.push(t),r=t));return n}function Ey(e){for(var n=[],t=n,r=[],o,l,a=0,i=e.length;a<i;++a)switch(o=e[a],o[0]){case"#":case"^":t.push(o),r.push(o),t=o[4]=[];break;case"/":l=r.pop(),l[5]=o[2],t=r.length>0?r[r.length-1][4]:n;break;default:t.push(o)}return n}function ar(e){this.string=e,this.tail=e,this.pos=0}ar.prototype.eos=function(){return this.tail===""};ar.prototype.scan=function(n){var t=this.tail.match(n);if(!t||t.index!==0)return"";var r=t[0];return this.tail=this.tail.substring(r.length),this.pos+=r.length,r};ar.prototype.scanUntil=function(n){var t=this.tail.search(n),r;switch(t){case-1:r=this.tail,this.tail="";break;case 0:r="";break;default:r=this.tail.substring(0,t),this.tail=this.tail.substring(t)}return this.pos+=r.length,r};function ut(e,n){this.view=e,this.cache={".":this.view},this.parent=n}ut.prototype.push=function(n){return new ut(n,this)};ut.prototype.lookup=function(n){var t=this.cache,r;if(t.hasOwnProperty(n))r=t[n];else{for(var o=this,l,a,i,s=!1;o;){if(n.indexOf(".")>0)for(l=o.view,a=n.split("."),i=0;l!=null&&i<a.length;)i===a.length-1&&(s=is(l,a[i])||py(l,a[i])),l=l[a[i++]];else l=o.view[n],s=is(o.view,n);if(s){r=l;break}o=o.parent}t[n]=r}return Qa(r)&&(r=r.call(this.view)),r};function de(){this.templateCache={_cache:{},set:function(n,t){this._cache[n]=t},get:function(n){return this._cache[n]},clear:function(){this._cache={}}}}de.prototype.clearCache=function(){typeof this.templateCache<"u"&&this.templateCache.clear()};de.prototype.parse=function(n,t){var r=this.templateCache,o=n+":"+(t||ye.tags).join(":"),l=typeof r<"u",a=l?r.get(o):void 0;return a==null&&(a=_y(n,t),l&&r.set(o,a)),a};de.prototype.render=function(n,t,r,o){var l=this.getConfigTags(o),a=this.parse(n,l),i=t instanceof ut?t:new ut(t,void 0);return this.renderTokens(a,i,r,n,o)};de.prototype.renderTokens=function(n,t,r,o,l){for(var a="",i,s,u,f=0,h=n.length;f<h;++f)u=void 0,i=n[f],s=i[0],s==="#"?u=this.renderSection(i,t,r,o,l):s==="^"?u=this.renderInverted(i,t,r,o,l):s===">"?u=this.renderPartial(i,t,r,l):s==="&"?u=this.unescapedValue(i,t):s==="name"?u=this.escapedValue(i,t,l):s==="text"&&(u=this.rawValue(i)),u!==void 0&&(a+=u);return a};de.prototype.renderSection=function(n,t,r,o,l){var a=this,i="",s=t.lookup(n[1]);function u(m){return a.render(m,t,r,l)}if(s){if(pt(s))for(var f=0,h=s.length;f<h;++f)i+=this.renderTokens(n[4],t.push(s[f]),r,o,l);else if(typeof s=="object"||typeof s=="string"||typeof s=="number")i+=this.renderTokens(n[4],t.push(s),r,o,l);else if(Qa(s)){if(typeof o!="string")throw new Error("Cannot use higher-order sections without the original template");s=s.call(t.view,o.slice(n[3],n[5]),u),s!=null&&(i+=s)}else i+=this.renderTokens(n[4],t,r,o,l);return i}};de.prototype.renderInverted=function(n,t,r,o,l){var a=t.lookup(n[1]);if(!a||pt(a)&&a.length===0)return this.renderTokens(n[4],t,r,o,l)};de.prototype.indentPartial=function(n,t,r){for(var o=t.replace(/[^ \t]/g,""),l=n.split(`
`),a=0;a<l.length;a++)l[a].length&&(a>0||!r)&&(l[a]=o+l[a]);return l.join(`
`)};de.prototype.renderPartial=function(n,t,r,o){if(r){var l=this.getConfigTags(o),a=Qa(r)?r(n[1]):r[n[1]];if(a!=null){var i=n[6],s=n[5],u=n[4],f=a;s==0&&u&&(f=this.indentPartial(a,u,i));var h=this.parse(f,l);return this.renderTokens(h,t,r,f,o)}}};de.prototype.unescapedValue=function(n,t){var r=t.lookup(n[1]);if(r!=null)return r};de.prototype.escapedValue=function(n,t,r){var o=this.getConfigEscape(r)||ye.escape,l=t.lookup(n[1]);if(l!=null)return typeof l=="number"&&o===ye.escape?String(l):o(l)};de.prototype.rawValue=function(n){return n[1]};de.prototype.getConfigTags=function(n){return pt(n)?n:n&&typeof n=="object"?n.tags:void 0};de.prototype.getConfigEscape=function(n){if(n&&typeof n=="object"&&!pt(n))return n.escape};var ye={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(e){er.templateCache=e},get templateCache(){return er.templateCache}},er=new de;ye.clearCache=function(){return er.clearCache()};ye.parse=function(n,t){return er.parse(n,t)};ye.render=function(n,t,r,o){if(typeof n!="string")throw new TypeError('Invalid template! Template should be a "string" but "'+fy(n)+'" was given as the first argument for mustache#render(template, view, partials)');return er.render(n,t,r,o)};ye.escape=xy;ye.Scanner=ar;ye.Context=ut;ye.Writer=de;const jy=`/* presentation-md base stylesheet.
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
`,Ny="warm-paper",Ty="clean-light",$y="soft-bento",Py="bauhaus-blocks",zy="vapor-horizon",Ly={claude:Ny,"default-tech":"neon-glow",corporate:Ty,playful:$y,"luxury-minimalist":"quiet-luxe","retro-arcade":"scanline-neon","editorial-serif":"editorial-rule","brutalist-mono":"brutalist-grid","pastel-dreamy":"pastel-cloud","aurora-glass":"aurora-glass","ft-editorial":"broadsheet-rule","genz-bento":"hard-bento","crt-terminal":"crt-phosphor","swiss-typographic":"swiss-grid","candy-pop":"candy-blob","aerospace-hud":"hud-grid","brutalist-acid":"acid-block",bauhaus:Py,"y2k-aero":"aero-bubble","risograph-zine":"riso-print","neon-noir":"neon-rain",vaporwave:zy,"botanical-luxe":"botanical-leaf"},My=`<!doctype html>
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
`;function Oy(e){return Ly[e]??"gradient"}const Fy=Object.assign({"../../../shared/layouts/closing.html":ey,"../../../shared/layouts/comparison.html":ny,"../../../shared/layouts/data-table.html":ty,"../../../shared/layouts/feature-grid.html":ry,"../../../shared/layouts/image-hero.html":oy,"../../../shared/layouts/quote.html":ly,"../../../shared/layouts/section.html":ay,"../../../shared/layouts/stat-row.html":iy,"../../../shared/layouts/timeline.html":sy,"../../../shared/layouts/title.html":uy,"../../../shared/layouts/two-column.html":cy}),xh=new Map;for(const[e,n]of Object.entries(Fy)){const t=e.split("/").pop().replace(/\.html$/,"");xh.set(t,n)}function Iy(e){return e.length===0?"":`https://fonts.googleapis.com/css2?family=${e.join("&family=")}&display=swap`}const Ry=new Set(["http","https","mailto","tel"]);function wh(e){let n="";for(const t of e){const r=t.charCodeAt(0);r>31&&r!==127&&(n+=t)}return n}function kh(e){var n,t;return(t=(n=e.match(/^([a-zA-Z][a-zA-Z0-9+.-]*):/))==null?void 0:n[1])==null?void 0:t.toLowerCase()}function Dy(e){if(typeof e!="string")return;const n=wh(e).trim(),t=kh(n);return t&&!Ry.has(t)?"#":n}function Ay(e){if(typeof e!="string")return;const n=wh(e).trim();if(/^data:image\//i.test(n))return n;const t=kh(n);return t&&t!=="http"&&t!=="https"?"":n}function Uy(e){var t;const n={...e};return e.layout==="data-table"&&Array.isArray(e.rows)&&(n.rows=e.rows.map(r=>({cells:r}))),e.layout==="feature-grid"&&(typeof e.columns=="number"?n.columns=e.columns:e.columns||(n.columns=3)),((t=e.cta)==null?void 0:t.href)!==void 0&&(n.cta={...e.cta,href:Dy(e.cta.href)}),e.image!==void 0&&(n.image=Ay(e.image)),n}const By='<footer class="pmd-attribution">Made with <a href="https://presentation-md.vercel.app/?ref=studio" target="_blank" rel="noopener">presentation-md</a></footer>',Wy=`
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
@media print { .pmd-attribution { opacity: 0.5; } }`;function Hy(e){return`<script type="application/json" id="pmd-deck">${JSON.stringify(e).replace(/</g,"\\u003c")}<\/script>`}function bh(e,n){var u,f,h;const t={bg:n.palette.bg,bg2:n.palette.bg2,text:n.palette.text,muted:n.palette.muted,accent:n.palette.accent,accent2:n.palette.accent2,cardBg:n.palette.cardBg,border:n.palette.border,radius:n.geometry.radius,slideW:n.geometry.slideWidth,headingFont:n.typography.headingFont,bodyFont:n.typography.bodyFont,headingWeight:String(n.typography.headingWeight)},r=ye.render(jy,t),o=Iy(n.typography.googleFonts),l=Oy(n.name);let a=o?`@import url('${o}');

${r}

${us}`:`${r}

${us}`;a+=`

${Wy}`;const i=(Array.isArray(e.slides)?e.slides:[]).map(m=>{const v=xh.get(m.layout);return v?ye.render(v,Uy(m)):`<section class="slide"><h2>Unknown layout: ${m.layout}</h2></section>`}).join(`
`),s=((u=e.meta)==null?void 0:u.title)??((f=e.meta)==null?void 0:f.company)??"Presentation";return ye.render(My,{title:s,description:((h=e.meta)==null?void 0:h.description)??"",styles:a,slides:i,surface:l,attribution:By,deckData:Hy(e)})}const Vy="modulepreload",Qy=function(e){return"/studio/"+e},cs={},Sh=function(n,t,r){let o=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),i=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));o=Promise.allSettled(t.map(s=>{if(s=Qy(s),s in cs)return;cs[s]=!0;const u=s.endsWith(".css"),f=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${s}"]${f}`))return;const h=document.createElement("link");if(h.rel=u?"stylesheet":Vy,u||(h.as="script"),h.crossOrigin="",h.href=s,i&&h.setAttribute("nonce",i),document.head.appendChild(h),u)return new Promise((m,v)=>{h.addEventListener("load",m),h.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${s}`)))})}))}function l(a){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=a,window.dispatchEvent(i),!i.defaultPrevented)throw a}return o.then(a=>{for(const i of a||[])i.status==="rejected"&&l(i.reason);return n().catch(l)})};function Ga(e,n){const t=URL.createObjectURL(e),r=document.createElement("a");r.href=t,r.download=n,document.body.appendChild(r),r.click(),r.remove(),URL.revokeObjectURL(t)}function Ka(e,n){var r,o;return`${(((r=e.meta)==null?void 0:r.title)??((o=e.meta)==null?void 0:o.company)??"deck").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"deck"}.${n}`}function _h(e){var n;return((n=e.meta)==null?void 0:n.theme)??"default-tech"}async function Gy(e){const n=[],t=Va(_h(e)),{deckToPptxBlob:r}=await Sh(async()=>{const{deckToPptxBlob:l}=await import("./index-rT3NUMG4.js");return{deckToPptxBlob:l}},__vite__mapDeps([0,1])),o=await r(e,t,{onWarn:l=>n.push(l)});return Ga(o,Ka(e,"pptx")),{warnings:n}}function Ky(e){const n=Va(_h(e)),t=bh(e,n);Ga(new Blob([t],{type:"text/html"}),Ka(e,"html"))}function Yy(e){Ga(new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),Ka(e,"json"))}function Ya(e){const n=JSON.parse(e);if((n==null?void 0:n.type)!=="deck"||!Array.isArray(n.slides))throw new Error('Not a valid deck: expected { "type": "deck", "slides": [...] }');return n}function Xy(e){var r,o,l;const n=["pmd-deck","psp-deck"];if(typeof DOMParser<"u"){const a=new DOMParser().parseFromString(e,"text/html");for(const i of n){const s=(o=(r=a.getElementById(i))==null?void 0:r.textContent)==null?void 0:o.trim();if(s)return s}}const t=e.match(/<script[^>]*id=["'](?:pmd-deck|psp-deck)["'][^>]*>([\s\S]*?)<\/script>/i);return(l=t==null?void 0:t[1])==null?void 0:l.trim()}function Jy(e){const n=Xy(e);if(!n)throw new Error("No editable deck found in this HTML. Only presentations created by presentation-md (with an embedded source) can be opened.");return Ya(n)}function qy(e,n){return/\.html?$/i.test(e)?Jy(n):Ya(n)}function Zy({deck:e,onChange:n,onLoadExample:t,onPresent:r,onGenerate:o}){var p,c,g,x;const l=R.useRef(null),[a,i]=R.useState(""),[s,u]=R.useState(!1),f=vh(),h=((p=e.meta)==null?void 0:p.theme)??"default-tech",m=y=>n({...e,meta:{...e.meta,...y}}),v=y=>m({theme:y}),S=y=>m({title:y}),w=async y=>{try{const k=qy(y.name,await y.text());n(k),i(`Opened ${y.name}`)}catch(k){i(`Open failed: ${k.message}`)}},N=async()=>{u(!0),i("Building .pptx…");try{const{warnings:y}=await Gy(e);i(y.length?`Exported .pptx (${y.length} warning${y.length>1?"s":""})`:"Exported .pptx")}catch(y){i(`Export failed: ${y.message}`)}finally{u(!1)}};return d.jsxs("header",{className:"toolbar",children:[d.jsxs("div",{className:"brand",children:[d.jsx("strong",{children:"Studio"}),d.jsx("span",{className:"muted small",children:"presentation-md"})]}),d.jsx("input",{className:"text-input title-input",value:((c=e.meta)==null?void 0:c.title)??"",placeholder:"Deck title",onChange:y=>S(y.target.value)}),d.jsxs("label",{className:"inline-field",children:[d.jsx("span",{className:"muted small",children:"Theme"}),d.jsx("select",{className:"text-input",value:h,onChange:y=>v(y.target.value),children:f.map(y=>d.jsx("option",{value:y,children:y},y))})]}),d.jsxs("details",{className:"deck-details",children:[d.jsx("summary",{className:"btn btn-sm",children:"Details"}),d.jsxs("div",{className:"deck-details-body",children:[d.jsx("input",{className:"text-input",value:((g=e.meta)==null?void 0:g.company)??"",placeholder:"Company",onChange:y=>m({company:y.target.value})}),d.jsx("input",{className:"text-input",value:((x=e.meta)==null?void 0:x.description)??"",placeholder:"Description",onChange:y=>m({description:y.target.value})})]})]}),d.jsx("div",{className:"spacer"}),d.jsx("button",{className:"btn btn-generate",onClick:o,title:"Generate a deck from a prompt",children:"✨ Generate"}),d.jsx("button",{className:"btn",onClick:t,children:"Example"}),d.jsx("button",{className:"btn",onClick:()=>{var y;return(y=l.current)==null?void 0:y.click()},title:"Open a deck .html or .json",children:"Open"}),d.jsx("button",{className:"btn",onClick:r,title:"Present fullscreen",children:"Present"}),d.jsx("button",{className:"btn",onClick:()=>Yy(e),children:"JSON"}),d.jsx("button",{className:"btn",onClick:()=>Ky(e),children:"HTML"}),d.jsx("button",{className:"btn btn-primary",disabled:s,onClick:N,children:s?"…":"Download .pptx"}),d.jsx("input",{ref:l,type:"file",accept:".html,.htm,.json,application/json,text/html",hidden:!0,onChange:y=>{var j;const k=(j=y.target.files)==null?void 0:j[0];k&&w(k),y.target.value=""}}),a&&d.jsx("span",{className:"status muted small",children:a})]})}function ev({slides:e,selected:n,onSelect:t,onChange:r}){const[o,l]=R.useState("title"),a=()=>{const f=n+1,h=[...e.slice(0,f),r0(o),...e.slice(f)];r(h,f)},i=f=>{const h=JSON.parse(JSON.stringify(e[f]));r([...e.slice(0,f+1),h,...e.slice(f+1)],f+1)},s=f=>{if(e.length<=1)return;const h=e.filter((m,v)=>v!==f);r(h,Math.max(0,Math.min(f,h.length-1)))},u=(f,h)=>{const m=f+h;if(m<0||m>=e.length)return;const v=e.slice();[v[f],v[m]]=[v[m],v[f]],r(v,m)};return d.jsxs("div",{className:"slide-list",children:[d.jsxs("div",{className:"add-row",children:[d.jsx("select",{className:"text-input",value:o,onChange:f=>l(f.target.value),children:t0.map(f=>d.jsx("option",{value:f,children:Xl[f]},f))}),d.jsx("button",{className:"btn btn-sm",onClick:a,children:"+ Add"})]}),d.jsx("ul",{className:"slides",children:e.map((f,h)=>d.jsxs("li",{className:`slide-row ${h===n?"active":""}`,onClick:()=>t(h),children:[d.jsxs("div",{className:"slide-row-main",children:[d.jsx("span",{className:"slide-row-num",children:h+1}),d.jsxs("div",{className:"slide-row-text",children:[d.jsx("span",{className:"slide-row-layout",children:Xl[f.layout]??f.layout}),d.jsx("span",{className:"slide-row-title",children:f.heading??f.quote??f.eyebrow??"—"})]})]}),d.jsxs("div",{className:"slide-row-actions",onClick:m=>m.stopPropagation(),children:[d.jsx("button",{className:"btn btn-icon",title:"Move up",onClick:()=>u(h,-1),children:"↑"}),d.jsx("button",{className:"btn btn-icon",title:"Move down",onClick:()=>u(h,1),children:"↓"}),d.jsx("button",{className:"btn btn-icon",title:"Duplicate",onClick:()=>i(h),children:"⧉"}),d.jsx("button",{className:"btn btn-icon btn-danger",title:"Delete",onClick:()=>s(h),children:"✕"})]})]},h))})]})}function Xa({label:e,children:n}){return d.jsxs("label",{className:"field",children:[d.jsx("span",{className:"field-label",children:e}),n]})}function L({label:e,value:n,onChange:t,placeholder:r}){return d.jsx(Xa,{label:e,children:d.jsx("input",{className:"text-input",type:"text",value:n??"",placeholder:r,onChange:o=>t(o.target.value)})})}function We({label:e,value:n,onChange:t,rows:r=3}){return d.jsx(Xa,{label:e,children:d.jsx("textarea",{className:"text-input",rows:r,value:n??"",onChange:o=>t(o.target.value)})})}function nv({label:e,value:n,options:t,onChange:r}){return d.jsx(Xa,{label:e,children:d.jsx("select",{className:"text-input",value:n,onChange:o=>r(Number(o.target.value)),children:t.map(o=>d.jsx("option",{value:o,children:o},o))})})}function Dr({label:e,items:n,onChange:t,blank:r,renderItem:o}){const l=(i,s)=>t(n.map((u,f)=>f===i?s:u)),a=(i,s)=>{const u=i+s;if(u<0||u>=n.length)return;const f=n.slice();[f[i],f[u]]=[f[u],f[i]],t(f)};return d.jsxs("div",{className:"list-editor",children:[d.jsxs("div",{className:"list-editor-head",children:[d.jsx("span",{className:"field-label",children:e}),d.jsx("button",{className:"btn btn-sm",onClick:()=>t([...n,r()]),children:"+ Add"})]}),n.map((i,s)=>d.jsxs("div",{className:"list-item",children:[d.jsxs("div",{className:"list-item-controls",children:[d.jsx("span",{className:"list-item-index",children:s+1}),d.jsx("div",{className:"spacer"}),d.jsx("button",{className:"btn btn-icon",title:"Move up",onClick:()=>a(s,-1),children:"↑"}),d.jsx("button",{className:"btn btn-icon",title:"Move down",onClick:()=>a(s,1),children:"↓"}),d.jsx("button",{className:"btn btn-icon btn-danger",title:"Remove",onClick:()=>t(n.filter((u,f)=>f!==s)),children:"✕"})]}),o(i,u=>l(s,u),s)]},s)),n.length===0&&d.jsx("p",{className:"muted small",children:"No items yet."})]})}function tv({slide:e,onChange:n}){const t=l=>n({...e,...l}),r=e.layout;return d.jsxs("div",{className:"slide-form",children:[d.jsx("h2",{className:"panel-title",children:Xl[r]??e.layout}),o()]});function o(){var l,a;switch(e.layout){case"title":case"closing":return d.jsxs(d.Fragment,{children:[d.jsx(L,{label:"Eyebrow",value:e.eyebrow,onChange:i=>t({eyebrow:i})}),d.jsx(L,{label:"Heading",value:e.heading,onChange:i=>t({heading:i})}),d.jsx(We,{label:"Lead",value:e.lead,onChange:i=>t({lead:i})}),e.layout==="closing"&&d.jsxs(d.Fragment,{children:[d.jsx(L,{label:"CTA label",value:(l=e.cta)==null?void 0:l.label,onChange:i=>t({cta:{...e.cta,label:i}})}),d.jsx(L,{label:"CTA link",value:(a=e.cta)==null?void 0:a.href,onChange:i=>t({cta:{...e.cta,href:i}})})]})]});case"section":return d.jsxs(d.Fragment,{children:[d.jsx(L,{label:"Number",value:e.number,onChange:i=>t({number:i})}),d.jsx(L,{label:"Eyebrow",value:e.eyebrow,onChange:i=>t({eyebrow:i})}),d.jsx(L,{label:"Heading",value:e.heading,onChange:i=>t({heading:i})}),d.jsx(We,{label:"Lead",value:e.lead,onChange:i=>t({lead:i})})]});case"two-column":return d.jsxs(d.Fragment,{children:[d.jsx(L,{label:"Eyebrow",value:e.eyebrow,onChange:i=>t({eyebrow:i})}),d.jsx(L,{label:"Heading",value:e.heading,onChange:i=>t({heading:i})}),d.jsx(We,{label:"Body",value:e.body,onChange:i=>t({body:i}),rows:5}),d.jsx(L,{label:"Image URL (data: URIs embed in PPTX)",value:e.image,onChange:i=>t({image:i})}),d.jsx(L,{label:"Image alt",value:e.imageAlt,onChange:i=>t({imageAlt:i})})]});case"image-hero":return d.jsxs(d.Fragment,{children:[d.jsx(L,{label:"Eyebrow",value:e.eyebrow,onChange:i=>t({eyebrow:i})}),d.jsx(L,{label:"Heading",value:e.heading,onChange:i=>t({heading:i})}),d.jsx(We,{label:"Lead",value:e.lead,onChange:i=>t({lead:i}),rows:3}),d.jsx(L,{label:"Image URL (data: URIs embed in PPTX)",value:e.image,onChange:i=>t({image:i})}),d.jsx(L,{label:"Image alt",value:e.imageAlt,onChange:i=>t({imageAlt:i})})]});case"comparison":return d.jsxs(d.Fragment,{children:[d.jsx(L,{label:"Eyebrow",value:e.eyebrow,onChange:i=>t({eyebrow:i})}),d.jsx(L,{label:"Heading",value:e.heading,onChange:i=>t({heading:i})}),d.jsx(L,{label:"Left label",value:e.leftLabel,onChange:i=>t({leftLabel:i})}),d.jsx(We,{label:"Left body",value:e.left,onChange:i=>t({left:i}),rows:4}),d.jsx(L,{label:"Right label",value:e.rightLabel,onChange:i=>t({rightLabel:i})}),d.jsx(We,{label:"Right body",value:e.right,onChange:i=>t({right:i}),rows:4})]});case"quote":return d.jsxs(d.Fragment,{children:[d.jsx(We,{label:"Quote",value:e.quote,onChange:i=>t({quote:i}),rows:4}),d.jsx(L,{label:"Attribution",value:e.by,onChange:i=>t({by:i})})]});case"feature-grid":return d.jsxs(d.Fragment,{children:[d.jsx(L,{label:"Eyebrow",value:e.eyebrow,onChange:i=>t({eyebrow:i})}),d.jsx(L,{label:"Heading",value:e.heading,onChange:i=>t({heading:i})}),d.jsx(nv,{label:"Columns",value:typeof e.columns=="number"?e.columns:3,options:[2,3,4],onChange:i=>t({columns:i})}),d.jsx(Dr,{label:"Cards",items:e.cards??[],onChange:i=>t({cards:i}),blank:()=>({title:"New card",body:""}),renderItem:(i,s)=>d.jsxs(d.Fragment,{children:[d.jsx(L,{label:"Icon (FontAwesome class)",value:i.icon,onChange:u=>s({...i,icon:u})}),d.jsx(L,{label:"Title",value:i.title,onChange:u=>s({...i,title:u})}),d.jsx(We,{label:"Body",value:i.body,onChange:u=>s({...i,body:u}),rows:2})]})})]});case"stat-row":return d.jsxs(d.Fragment,{children:[d.jsx(L,{label:"Eyebrow",value:e.eyebrow,onChange:i=>t({eyebrow:i})}),d.jsx(L,{label:"Heading",value:e.heading,onChange:i=>t({heading:i})}),d.jsx(Dr,{label:"Stats",items:e.stats??[],onChange:i=>t({stats:i}),blank:()=>({value:"0",label:"Metric"}),renderItem:(i,s)=>d.jsxs(d.Fragment,{children:[d.jsx(L,{label:"Value",value:i.value,onChange:u=>s({...i,value:u})}),d.jsx(L,{label:"Label",value:i.label,onChange:u=>s({...i,label:u})})]})})]});case"timeline":return d.jsxs(d.Fragment,{children:[d.jsx(L,{label:"Eyebrow",value:e.eyebrow,onChange:i=>t({eyebrow:i})}),d.jsx(L,{label:"Heading",value:e.heading,onChange:i=>t({heading:i})}),d.jsx(Dr,{label:"Steps",items:e.steps??[],onChange:i=>t({steps:i}),blank:()=>({title:"New step",body:""}),renderItem:(i,s)=>d.jsxs(d.Fragment,{children:[d.jsx(L,{label:"Title",value:i.title,onChange:u=>s({...i,title:u})}),d.jsx(We,{label:"Body",value:i.body,onChange:u=>s({...i,body:u}),rows:2})]})})]});case"data-table":return d.jsx(rv,{slide:e,set:t});default:return d.jsx("p",{className:"muted",children:"No editable fields for this layout."})}}}function rv({slide:e,set:n}){const t=Array.isArray(e.columns)?e.columns:[],r=Array.isArray(e.rows)?e.rows:[],o=Math.max(t.length,...r.map(s=>s.length),1),l=(s,u)=>{const f=t.slice();f[s]=u,n({columns:f})},a=()=>{n({columns:[...t,`Column ${t.length+1}`],rows:r.map(s=>[...s,""])})},i=s=>{n({columns:t.filter((u,f)=>f!==s),rows:r.map(u=>u.filter((f,h)=>h!==s))})};return d.jsxs(d.Fragment,{children:[d.jsx(L,{label:"Eyebrow",value:e.eyebrow,onChange:s=>n({eyebrow:s})}),d.jsx(L,{label:"Heading",value:e.heading,onChange:s=>n({heading:s})}),d.jsxs("div",{className:"list-editor",children:[d.jsxs("div",{className:"list-editor-head",children:[d.jsx("span",{className:"field-label",children:"Columns"}),d.jsx("button",{className:"btn btn-sm",onClick:a,children:"+ Column"})]}),Array.from({length:o}).map((s,u)=>d.jsxs("div",{className:"row-inline",children:[d.jsx("input",{className:"text-input",value:t[u]??"",placeholder:`Column ${u+1}`,onChange:f=>l(u,f.target.value)}),d.jsx("button",{className:"btn btn-icon btn-danger",title:"Remove column",onClick:()=>i(u),children:"✕"})]},u))]}),d.jsx(Dr,{label:"Rows",items:r,onChange:s=>n({rows:s}),blank:()=>Array.from({length:o},()=>""),renderItem:(s,u)=>d.jsx("div",{className:"row-cells",children:Array.from({length:o}).map((f,h)=>d.jsx("input",{className:"text-input",value:s[h]??"",placeholder:t[h]??`Col ${h+1}`,onChange:m=>{const v=s.slice();for(;v.length<o;)v.push("");v[h]=m.target.value,u(v)}},h))})})]})}function ov({html:e}){return d.jsx("div",{className:"preview",children:d.jsx("iframe",{className:"preview-frame",title:"Deck preview",srcDoc:e,sandbox:"allow-same-origin",referrerPolicy:"no-referrer"})})}const lv=`
html { scroll-behavior: smooth; scroll-snap-type: y mandatory; }
body { gap: 0 !important; padding: 0 !important; }
.slide { min-height: 100vh !important; margin: 0 !important; border-radius: 0 !important; scroll-snap-align: start !important; scroll-snap-stop: always !important; }
.pmd-attribution { display: none !important; }
`;function av({html:e,slideCount:n,onClose:t}){const r=R.useRef(null),[o,l]=R.useState(0),a=e.replace("</head>",`<style>${lv}</style></head>`),i=s=>l(u=>Math.max(0,Math.min(n-1,u+s)));return R.useEffect(()=>{const s=u=>{u.key==="Escape"?t():u.key==="ArrowRight"||u.key===" "||u.key==="PageDown"?(u.preventDefault(),l(f=>Math.min(n-1,f+1))):(u.key==="ArrowLeft"||u.key==="PageUp")&&(u.preventDefault(),l(f=>Math.max(0,f-1)))};return window.addEventListener("keydown",s),()=>window.removeEventListener("keydown",s)},[t,n]),R.useEffect(()=>{var f,h;const s=(f=r.current)==null?void 0:f.contentDocument,u=s==null?void 0:s.querySelectorAll("section.slide");(h=u==null?void 0:u[o])==null||h.scrollIntoView({behavior:"smooth",block:"start"})},[o,a]),d.jsxs("div",{className:"present-overlay",children:[d.jsx("div",{className:"present-stage",children:d.jsx("iframe",{ref:r,className:"present-frame",title:"Present deck",srcDoc:a,sandbox:"allow-same-origin"})}),d.jsxs("div",{className:"present-bar",children:[d.jsx("button",{className:"btn btn-icon",title:"Previous (←)",onClick:()=>i(-1),children:"←"}),d.jsxs("span",{className:"present-count",children:[o+1," / ",n]}),d.jsx("button",{className:"btn btn-icon",title:"Next (→)",onClick:()=>i(1),children:"→"}),d.jsx("button",{className:"btn",onClick:t,children:"Exit · Esc"})]})]})}const ds=[{id:"claude-opus-4-8",label:"Opus 4.8 — most capable"},{id:"claude-sonnet-4-6",label:"Sonnet 4.6 — faster, cheaper"},{id:"claude-haiku-4-5",label:"Haiku 4.5 — fastest"}],Ch=`You author slide decks as a single JSON object matching this schema — the "Deck JSON" spec used by presentation-md.

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
- Only emit fields defined above. Do not invent new layouts or fields.`;function Eh(e,n){return`Create a deck for the following brief. Set meta.theme to "${n}".

Brief:
${e.trim()}`}function iv(e,n){return`${Ch}

${Eh(e,n)}

Respond with ONLY the JSON object — no prose, no markdown fences.`}function sv(e){const n=e.match(/```(?:json)?\s*([\s\S]*?)```/i),t=((n==null?void 0:n[1])??e).trim(),r=t.indexOf("{"),o=t.lastIndexOf("}");return r===-1||o===-1||o<r?t:t.slice(r,o+1)}async function uv(e){const{apiKey:n,model:t,brief:r,theme:o,signal:l}=e;if(!r.trim())throw new Error("Describe your deck first.");if(!n.trim())throw new Error("Enter your Anthropic API key.");const{default:a}=await Sh(async()=>{const{default:h}=await import("./index-BxVt1hOc.js");return{default:h}},__vite__mapDeps([2,1])),u=(await new a({apiKey:n.trim(),dangerouslyAllowBrowser:!0}).messages.create({model:t,max_tokens:8e3,system:Ch,messages:[{role:"user",content:`${Eh(r,o)}

Respond with ONLY the JSON object — no prose, no markdown fences.`}]},{signal:l})).content.map(h=>h.type==="text"?h.text:"").join("");if(!u.trim())throw new Error("The model returned an empty response. Try again.");let f;try{f=Ya(sv(u))}catch(h){throw new Error(`Couldn't parse the generated deck: ${h.message}`)}return f.meta={...f.meta,theme:o},f}const Er="pmd-studio-anthropic-key",cv=["Q3 all-hands: momentum, key metrics, roadmap, and what's next.","Seed pitch for an AI-native analytics tool — problem, product, traction, ask.","Launch deck for a developer CLI: what it is, how it works, why it's fast."];function dv({currentTheme:e,onGenerate:n,onClose:t}){const[r,o]=R.useState(""),[l,a]=R.useState(e),[i,s]=R.useState(ds[0].id),[u,f]=R.useState(()=>localStorage.getItem(Er)??""),[h,m]=R.useState(()=>!!localStorage.getItem(Er)),[v,S]=R.useState(!1),[w,N]=R.useState(""),[p,c]=R.useState(!1),g=vh(),x=async()=>{S(!0),N("Generating your deck…");try{h?localStorage.setItem(Er,u.trim()):localStorage.removeItem(Er);const k=await uv({apiKey:u,model:i,brief:r,theme:l});n(k),t()}catch(k){N(k.message)}finally{S(!1)}},y=async()=>{try{await navigator.clipboard.writeText(iv(r,l)),c(!0),setTimeout(()=>c(!1),1800)}catch{N("Couldn't copy — select the prompt manually.")}};return d.jsx("div",{className:"modal-overlay",onClick:t,children:d.jsxs("div",{className:"modal",onClick:k=>k.stopPropagation(),children:[d.jsxs("header",{className:"modal-head",children:[d.jsxs("div",{children:[d.jsx("strong",{children:"Generate a deck"}),d.jsx("span",{className:"muted small",children:"Describe it — get an editable deck in seconds."})]}),d.jsx("button",{className:"btn btn-sm",onClick:t,"aria-label":"Close",children:"✕"})]}),d.jsxs("div",{className:"modal-body",children:[d.jsx("label",{className:"field-label",children:"What's the deck about?"}),d.jsx("textarea",{className:"text-input brief-input",value:r,placeholder:"e.g. Q3 all-hands covering revenue, product wins, and the roadmap for next quarter.",rows:4,onChange:k=>o(k.target.value)}),d.jsx("div",{className:"chip-row",children:cv.map(k=>d.jsx("button",{className:"chip",onClick:()=>o(k),title:"Use this brief",children:k.split(/[:—]/)[0].trim()},k))}),d.jsxs("div",{className:"field-grid",children:[d.jsxs("label",{className:"inline-field",children:[d.jsx("span",{className:"muted small",children:"Theme"}),d.jsx("select",{className:"text-input",value:l,onChange:k=>a(k.target.value),children:g.map(k=>d.jsx("option",{value:k,children:k},k))})]}),d.jsxs("label",{className:"inline-field",children:[d.jsx("span",{className:"muted small",children:"Model"}),d.jsx("select",{className:"text-input",value:i,onChange:k=>s(k.target.value),children:ds.map(k=>d.jsx("option",{value:k.id,children:k.label},k.id))})]})]}),d.jsxs("div",{className:"gen-panel",children:[d.jsx("label",{className:"field-label",children:"Your Anthropic API key"}),d.jsx("input",{className:"text-input",type:"password",value:u,placeholder:"sk-ant-…",autoComplete:"off",onChange:k=>f(k.target.value)}),d.jsxs("label",{className:"checkbox-field",children:[d.jsx("input",{type:"checkbox",checked:h,onChange:k=>m(k.target.checked)}),d.jsx("span",{className:"muted small",children:"Remember on this device (stored only in your browser)"})]}),d.jsxs("p",{className:"muted small privacy-note",children:["Your key stays in this browser. Requests go straight to Anthropic — nothing is sent to our servers. Get a key at ",d.jsx("a",{href:"https://console.anthropic.com/settings/keys",target:"_blank",rel:"noreferrer",children:"console.anthropic.com"}),"."]}),d.jsx("button",{className:"btn btn-primary btn-block",disabled:v,onClick:x,children:v?"Generating…":"Generate deck"})]}),d.jsx("div",{className:"gen-divider",children:d.jsx("span",{children:"or hand it to your agent"})}),d.jsxs("div",{className:"gen-panel",children:[d.jsx("p",{className:"muted small",children:"No key? Copy a ready-made prompt and paste it into Claude Code, Cursor, or any agent with the presentation skill installed — then open the resulting deck here."}),d.jsx("button",{className:"btn btn-block",onClick:y,disabled:!r.trim(),children:p?"Copied ✓":"Copy prompt for your agent"})]}),w&&d.jsx("p",{className:"status muted small gen-status",children:w})]})]})})}const jh="pmd-studio-deck-v1";function fv(){try{const e=localStorage.getItem(jh);if(e){const n=JSON.parse(e);if((n==null?void 0:n.type)==="deck"&&Array.isArray(n.slides)&&n.slides.length)return n}}catch{}return Cc}function pv(){var v;const[e,n]=R.useState(fv),[t,r]=R.useState(0),[o,l]=R.useState(!1),[a,i]=R.useState(!1);R.useEffect(()=>{try{localStorage.setItem(jh,JSON.stringify(e))}catch{}},[e]);const s=R.useMemo(()=>{var S;try{return bh(e,Va(((S=e.meta)==null?void 0:S.theme)??"default-tech"))}catch(w){return`<pre style="color:#d9695a;font-family:monospace;padding:24px">${String(w)}</pre>`}},[e]),u=(S,w)=>{n({...e,slides:S}),w!==void 0&&r(w)},f=S=>{n({...e,slides:e.slides.map((w,N)=>N===t?S:w)})},h=()=>{n(Cc),r(0)},m=e.slides[Math.min(t,e.slides.length-1)];return d.jsxs("div",{className:"app",children:[d.jsx(Zy,{deck:e,onChange:n,onLoadExample:h,onPresent:()=>l(!0),onGenerate:()=>i(!0)}),d.jsxs("div",{className:"workspace",children:[d.jsx("aside",{className:"panel panel-left",children:d.jsx(ev,{slides:e.slides,selected:t,onSelect:r,onChange:u})}),d.jsx("main",{className:"panel panel-center",children:d.jsx(ov,{html:s})}),d.jsx("aside",{className:"panel panel-right",children:m?d.jsx(tv,{slide:m,onChange:f}):d.jsx("p",{className:"muted",children:"No slide selected."})})]}),o&&d.jsx(av,{html:s,slideCount:e.slides.length,onClose:()=>l(!1)}),a&&d.jsx(dv,{currentTheme:((v=e.meta)==null?void 0:v.theme)??"claude",onGenerate:S=>{n(S),r(0)},onClose:()=>i(!1)})]})}const Nh=document.getElementById("root");if(!Nh)throw new Error("Missing #root element");_c(Nh).render(d.jsx(R.StrictMode,{children:d.jsx(pv,{})}));export{Sh as _};
