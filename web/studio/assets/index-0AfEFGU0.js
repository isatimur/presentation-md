const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-rT3NUMG4.js","assets/_commonjsHelpers-Cpj98o6Y.js","assets/index-CwyONTjH.js"])))=>i.map(i=>d[i]);
(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function t(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(o){if(o.ep)return;o.ep=!0;const a=t(o);fetch(o.href,a)}})();var fs={exports:{}},fo={},ps={exports:{}},P={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var nr=Symbol.for("react.element"),fv=Symbol.for("react.portal"),pv=Symbol.for("react.fragment"),gv=Symbol.for("react.strict_mode"),hv=Symbol.for("react.profiler"),mv=Symbol.for("react.provider"),vv=Symbol.for("react.context"),yv=Symbol.for("react.forward_ref"),bv=Symbol.for("react.suspense"),xv=Symbol.for("react.memo"),wv=Symbol.for("react.lazy"),Xi=Symbol.iterator;function kv(e){return e===null||typeof e!="object"?null:(e=Xi&&e[Xi]||e["@@iterator"],typeof e=="function"?e:null)}var gs={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},hs=Object.assign,ms={};function ct(e,n,t){this.props=e,this.context=n,this.refs=ms,this.updater=t||gs}ct.prototype.isReactComponent={};ct.prototype.setState=function(e,n){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,n,"setState")};ct.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function vs(){}vs.prototype=ct.prototype;function qa(e,n,t){this.props=e,this.context=n,this.refs=ms,this.updater=t||gs}var Xa=qa.prototype=new vs;Xa.constructor=qa;hs(Xa,ct.prototype);Xa.isPureReactComponent=!0;var Zi=Array.isArray,ys=Object.prototype.hasOwnProperty,Za={current:null},bs={key:!0,ref:!0,__self:!0,__source:!0};function xs(e,n,t){var r,o={},a=null,i=null;if(n!=null)for(r in n.ref!==void 0&&(i=n.ref),n.key!==void 0&&(a=""+n.key),n)ys.call(n,r)&&!bs.hasOwnProperty(r)&&(o[r]=n[r]);var l=arguments.length-2;if(l===1)o.children=t;else if(1<l){for(var s=Array(l),u=0;u<l;u++)s[u]=arguments[u+2];o.children=s}if(e&&e.defaultProps)for(r in l=e.defaultProps,l)o[r]===void 0&&(o[r]=l[r]);return{$$typeof:nr,type:e,key:a,ref:i,props:o,_owner:Za.current}}function Sv(e,n){return{$$typeof:nr,type:e.type,key:n,ref:e.ref,props:e.props,_owner:e._owner}}function ei(e){return typeof e=="object"&&e!==null&&e.$$typeof===nr}function _v(e){var n={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(t){return n[t]})}var el=/\/+/g;function Po(e,n){return typeof e=="object"&&e!==null&&e.key!=null?_v(""+e.key):n.toString(36)}function Er(e,n,t,r,o){var a=typeof e;(a==="undefined"||a==="boolean")&&(e=null);var i=!1;if(e===null)i=!0;else switch(a){case"string":case"number":i=!0;break;case"object":switch(e.$$typeof){case nr:case fv:i=!0}}if(i)return i=e,o=o(i),e=r===""?"."+Po(i,0):r,Zi(o)?(t="",e!=null&&(t=e.replace(el,"$&/")+"/"),Er(o,n,t,"",function(u){return u})):o!=null&&(ei(o)&&(o=Sv(o,t+(!o.key||i&&i.key===o.key?"":(""+o.key).replace(el,"$&/")+"/")+e)),n.push(o)),1;if(i=0,r=r===""?".":r+":",Zi(e))for(var l=0;l<e.length;l++){a=e[l];var s=r+Po(a,l);i+=Er(a,n,t,s,o)}else if(s=kv(e),typeof s=="function")for(e=s.call(e),l=0;!(a=e.next()).done;)a=a.value,s=r+Po(a,l++),i+=Er(a,n,t,s,o);else if(a==="object")throw n=String(e),Error("Objects are not valid as a React child (found: "+(n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n)+"). If you meant to render a collection of children, use an array instead.");return i}function ur(e,n,t){if(e==null)return e;var r=[],o=0;return Er(e,r,"","",function(a){return n.call(t,a,o++)}),r}function $v(e){if(e._status===-1){var n=e._result;n=n(),n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var ue={current:null},jr={transition:null},Cv={ReactCurrentDispatcher:ue,ReactCurrentBatchConfig:jr,ReactCurrentOwner:Za};function ws(){throw Error("act(...) is not supported in production builds of React.")}P.Children={map:ur,forEach:function(e,n,t){ur(e,function(){n.apply(this,arguments)},t)},count:function(e){var n=0;return ur(e,function(){n++}),n},toArray:function(e){return ur(e,function(n){return n})||[]},only:function(e){if(!ei(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};P.Component=ct;P.Fragment=pv;P.Profiler=hv;P.PureComponent=qa;P.StrictMode=gv;P.Suspense=bv;P.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Cv;P.act=ws;P.cloneElement=function(e,n,t){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=hs({},e.props),o=e.key,a=e.ref,i=e._owner;if(n!=null){if(n.ref!==void 0&&(a=n.ref,i=Za.current),n.key!==void 0&&(o=""+n.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(s in n)ys.call(n,s)&&!bs.hasOwnProperty(s)&&(r[s]=n[s]===void 0&&l!==void 0?l[s]:n[s])}var s=arguments.length-2;if(s===1)r.children=t;else if(1<s){l=Array(s);for(var u=0;u<s;u++)l[u]=arguments[u+2];r.children=l}return{$$typeof:nr,type:e.type,key:o,ref:a,props:r,_owner:i}};P.createContext=function(e){return e={$$typeof:vv,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:mv,_context:e},e.Consumer=e};P.createElement=xs;P.createFactory=function(e){var n=xs.bind(null,e);return n.type=e,n};P.createRef=function(){return{current:null}};P.forwardRef=function(e){return{$$typeof:yv,render:e}};P.isValidElement=ei;P.lazy=function(e){return{$$typeof:wv,_payload:{_status:-1,_result:e},_init:$v}};P.memo=function(e,n){return{$$typeof:xv,type:e,compare:n===void 0?null:n}};P.startTransition=function(e){var n=jr.transition;jr.transition={};try{e()}finally{jr.transition=n}};P.unstable_act=ws;P.useCallback=function(e,n){return ue.current.useCallback(e,n)};P.useContext=function(e){return ue.current.useContext(e)};P.useDebugValue=function(){};P.useDeferredValue=function(e){return ue.current.useDeferredValue(e)};P.useEffect=function(e,n){return ue.current.useEffect(e,n)};P.useId=function(){return ue.current.useId()};P.useImperativeHandle=function(e,n,t){return ue.current.useImperativeHandle(e,n,t)};P.useInsertionEffect=function(e,n){return ue.current.useInsertionEffect(e,n)};P.useLayoutEffect=function(e,n){return ue.current.useLayoutEffect(e,n)};P.useMemo=function(e,n){return ue.current.useMemo(e,n)};P.useReducer=function(e,n,t){return ue.current.useReducer(e,n,t)};P.useRef=function(e){return ue.current.useRef(e)};P.useState=function(e){return ue.current.useState(e)};P.useSyncExternalStore=function(e,n,t){return ue.current.useSyncExternalStore(e,n,t)};P.useTransition=function(){return ue.current.useTransition()};P.version="18.3.1";ps.exports=P;var A=ps.exports;/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ev=A,jv=Symbol.for("react.element"),Tv=Symbol.for("react.fragment"),Nv=Object.prototype.hasOwnProperty,Pv=Ev.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Fv={key:!0,ref:!0,__self:!0,__source:!0};function ks(e,n,t){var r,o={},a=null,i=null;t!==void 0&&(a=""+t),n.key!==void 0&&(a=""+n.key),n.ref!==void 0&&(i=n.ref);for(r in n)Nv.call(n,r)&&!Fv.hasOwnProperty(r)&&(o[r]=n[r]);if(e&&e.defaultProps)for(r in n=e.defaultProps,n)o[r]===void 0&&(o[r]=n[r]);return{$$typeof:jv,type:e,key:a,ref:i,props:o,_owner:Pv.current}}fo.Fragment=Tv;fo.jsx=ks;fo.jsxs=ks;fs.exports=fo;var d=fs.exports,Ss={exports:{}},ke={},_s={exports:{}},$s={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function n($,T){var N=$.length;$.push(T);e:for(;0<N;){var V=N-1>>>1,q=$[V];if(0<o(q,T))$[V]=T,$[N]=q,N=V;else break e}}function t($){return $.length===0?null:$[0]}function r($){if($.length===0)return null;var T=$[0],N=$.pop();if(N!==T){$[0]=N;e:for(var V=0,q=$.length,lr=q>>>1;V<lr;){var wn=2*(V+1)-1,No=$[wn],kn=wn+1,sr=$[kn];if(0>o(No,N))kn<q&&0>o(sr,No)?($[V]=sr,$[kn]=N,V=kn):($[V]=No,$[wn]=N,V=wn);else if(kn<q&&0>o(sr,N))$[V]=sr,$[kn]=N,V=kn;else break e}}return T}function o($,T){var N=$.sortIndex-T.sortIndex;return N!==0?N:$.id-T.id}if(typeof performance=="object"&&typeof performance.now=="function"){var a=performance;e.unstable_now=function(){return a.now()}}else{var i=Date,l=i.now();e.unstable_now=function(){return i.now()-l}}var s=[],u=[],f=1,g=null,m=3,y=!1,S=!1,x=!1,j=typeof setTimeout=="function"?setTimeout:null,p=typeof clearTimeout=="function"?clearTimeout:null,c=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function h($){for(var T=t(u);T!==null;){if(T.callback===null)r(u);else if(T.startTime<=$)r(u),T.sortIndex=T.expirationTime,n(s,T);else break;T=t(u)}}function b($){if(x=!1,h($),!S)if(t(s)!==null)S=!0,jo(v);else{var T=t(u);T!==null&&To(b,T.startTime-$)}}function v($,T){S=!1,x&&(x=!1,p(C),C=-1),y=!0;var N=m;try{for(h(T),g=t(s);g!==null&&(!(g.expirationTime>T)||$&&!Ne());){var V=g.callback;if(typeof V=="function"){g.callback=null,m=g.priorityLevel;var q=V(g.expirationTime<=T);T=e.unstable_now(),typeof q=="function"?g.callback=q:g===t(s)&&r(s),h(T)}else r(s);g=t(s)}if(g!==null)var lr=!0;else{var wn=t(u);wn!==null&&To(b,wn.startTime-T),lr=!1}return lr}finally{g=null,m=N,y=!1}}var w=!1,E=null,C=-1,G=5,F=-1;function Ne(){return!(e.unstable_now()-F<G)}function gt(){if(E!==null){var $=e.unstable_now();F=$;var T=!0;try{T=E(!0,$)}finally{T?ht():(w=!1,E=null)}}else w=!1}var ht;if(typeof c=="function")ht=function(){c(gt)};else if(typeof MessageChannel<"u"){var qi=new MessageChannel,dv=qi.port2;qi.port1.onmessage=gt,ht=function(){dv.postMessage(null)}}else ht=function(){j(gt,0)};function jo($){E=$,w||(w=!0,ht())}function To($,T){C=j(function(){$(e.unstable_now())},T)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function($){$.callback=null},e.unstable_continueExecution=function(){S||y||(S=!0,jo(v))},e.unstable_forceFrameRate=function($){0>$||125<$?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):G=0<$?Math.floor(1e3/$):5},e.unstable_getCurrentPriorityLevel=function(){return m},e.unstable_getFirstCallbackNode=function(){return t(s)},e.unstable_next=function($){switch(m){case 1:case 2:case 3:var T=3;break;default:T=m}var N=m;m=T;try{return $()}finally{m=N}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function($,T){switch($){case 1:case 2:case 3:case 4:case 5:break;default:$=3}var N=m;m=$;try{return T()}finally{m=N}},e.unstable_scheduleCallback=function($,T,N){var V=e.unstable_now();switch(typeof N=="object"&&N!==null?(N=N.delay,N=typeof N=="number"&&0<N?V+N:V):N=V,$){case 1:var q=-1;break;case 2:q=250;break;case 5:q=1073741823;break;case 4:q=1e4;break;default:q=5e3}return q=N+q,$={id:f++,callback:T,priorityLevel:$,startTime:N,expirationTime:q,sortIndex:-1},N>V?($.sortIndex=N,n(u,$),t(s)===null&&$===t(u)&&(x?(p(C),C=-1):x=!0,To(b,N-V))):($.sortIndex=q,n(s,$),S||y||(S=!0,jo(v))),$},e.unstable_shouldYield=Ne,e.unstable_wrapCallback=function($){var T=m;return function(){var N=m;m=T;try{return $.apply(this,arguments)}finally{m=N}}}})($s);_s.exports=$s;var Mv=_s.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var zv=A,we=Mv;function k(e){for(var n="https://reactjs.org/docs/error-decoder.html?invariant="+e,t=1;t<arguments.length;t++)n+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Cs=new Set,Lt={};function In(e,n){tt(e,n),tt(e+"Capture",n)}function tt(e,n){for(Lt[e]=n,e=0;e<n.length;e++)Cs.add(n[e])}var Ke=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),oa=Object.prototype.hasOwnProperty,Iv=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,nl={},tl={};function Ov(e){return oa.call(tl,e)?!0:oa.call(nl,e)?!1:Iv.test(e)?tl[e]=!0:(nl[e]=!0,!1)}function Lv(e,n,t,r){if(t!==null&&t.type===0)return!1;switch(typeof n){case"function":case"symbol":return!0;case"boolean":return r?!1:t!==null?!t.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Av(e,n,t,r){if(n===null||typeof n>"u"||Lv(e,n,t,r))return!0;if(r)return!1;if(t!==null)switch(t.type){case 3:return!n;case 4:return n===!1;case 5:return isNaN(n);case 6:return isNaN(n)||1>n}return!1}function ce(e,n,t,r,o,a,i){this.acceptsBooleans=n===2||n===3||n===4,this.attributeName=r,this.attributeNamespace=o,this.mustUseProperty=t,this.propertyName=e,this.type=n,this.sanitizeURL=a,this.removeEmptyString=i}var te={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){te[e]=new ce(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var n=e[0];te[n]=new ce(n,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){te[e]=new ce(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){te[e]=new ce(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){te[e]=new ce(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){te[e]=new ce(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){te[e]=new ce(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){te[e]=new ce(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){te[e]=new ce(e,5,!1,e.toLowerCase(),null,!1,!1)});var ni=/[\-:]([a-z])/g;function ti(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var n=e.replace(ni,ti);te[n]=new ce(n,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var n=e.replace(ni,ti);te[n]=new ce(n,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var n=e.replace(ni,ti);te[n]=new ce(n,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){te[e]=new ce(e,1,!1,e.toLowerCase(),null,!1,!1)});te.xlinkHref=new ce("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){te[e]=new ce(e,1,!1,e.toLowerCase(),null,!0,!0)});function ri(e,n,t,r){var o=te.hasOwnProperty(n)?te[n]:null;(o!==null?o.type!==0:r||!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(Av(n,t,o,r)&&(t=null),r||o===null?Ov(n)&&(t===null?e.removeAttribute(n):e.setAttribute(n,""+t)):o.mustUseProperty?e[o.propertyName]=t===null?o.type===3?!1:"":t:(n=o.attributeName,r=o.attributeNamespace,t===null?e.removeAttribute(n):(o=o.type,t=o===3||o===4&&t===!0?"":""+t,r?e.setAttributeNS(r,n,t):e.setAttribute(n,t))))}var Ze=zv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,cr=Symbol.for("react.element"),An=Symbol.for("react.portal"),Dn=Symbol.for("react.fragment"),oi=Symbol.for("react.strict_mode"),aa=Symbol.for("react.profiler"),Es=Symbol.for("react.provider"),js=Symbol.for("react.context"),ai=Symbol.for("react.forward_ref"),ia=Symbol.for("react.suspense"),la=Symbol.for("react.suspense_list"),ii=Symbol.for("react.memo"),nn=Symbol.for("react.lazy"),Ts=Symbol.for("react.offscreen"),rl=Symbol.iterator;function mt(e){return e===null||typeof e!="object"?null:(e=rl&&e[rl]||e["@@iterator"],typeof e=="function"?e:null)}var U=Object.assign,Fo;function _t(e){if(Fo===void 0)try{throw Error()}catch(t){var n=t.stack.trim().match(/\n( *(at )?)/);Fo=n&&n[1]||""}return`
`+Fo+e}var Mo=!1;function zo(e,n){if(!e||Mo)return"";Mo=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(n)if(n=function(){throw Error()},Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(n,[])}catch(u){var r=u}Reflect.construct(e,[],n)}else{try{n.call()}catch(u){r=u}e.call(n.prototype)}else{try{throw Error()}catch(u){r=u}e()}}catch(u){if(u&&r&&typeof u.stack=="string"){for(var o=u.stack.split(`
`),a=r.stack.split(`
`),i=o.length-1,l=a.length-1;1<=i&&0<=l&&o[i]!==a[l];)l--;for(;1<=i&&0<=l;i--,l--)if(o[i]!==a[l]){if(i!==1||l!==1)do if(i--,l--,0>l||o[i]!==a[l]){var s=`
`+o[i].replace(" at new "," at ");return e.displayName&&s.includes("<anonymous>")&&(s=s.replace("<anonymous>",e.displayName)),s}while(1<=i&&0<=l);break}}}finally{Mo=!1,Error.prepareStackTrace=t}return(e=e?e.displayName||e.name:"")?_t(e):""}function Dv(e){switch(e.tag){case 5:return _t(e.type);case 16:return _t("Lazy");case 13:return _t("Suspense");case 19:return _t("SuspenseList");case 0:case 2:case 15:return e=zo(e.type,!1),e;case 11:return e=zo(e.type.render,!1),e;case 1:return e=zo(e.type,!0),e;default:return""}}function sa(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Dn:return"Fragment";case An:return"Portal";case aa:return"Profiler";case oi:return"StrictMode";case ia:return"Suspense";case la:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case js:return(e.displayName||"Context")+".Consumer";case Es:return(e._context.displayName||"Context")+".Provider";case ai:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case ii:return n=e.displayName||null,n!==null?n:sa(e.type)||"Memo";case nn:n=e._payload,e=e._init;try{return sa(e(n))}catch{}}return null}function Rv(e){var n=e.type;switch(e.tag){case 24:return"Cache";case 9:return(n.displayName||"Context")+".Consumer";case 10:return(n._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=n.render,e=e.displayName||e.name||"",n.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return n;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return sa(n);case 8:return n===oi?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n}return null}function mn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Ns(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function Bv(e){var n=Ns(e)?"checked":"value",t=Object.getOwnPropertyDescriptor(e.constructor.prototype,n),r=""+e[n];if(!e.hasOwnProperty(n)&&typeof t<"u"&&typeof t.get=="function"&&typeof t.set=="function"){var o=t.get,a=t.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return o.call(this)},set:function(i){r=""+i,a.call(this,i)}}),Object.defineProperty(e,n,{enumerable:t.enumerable}),{getValue:function(){return r},setValue:function(i){r=""+i},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function dr(e){e._valueTracker||(e._valueTracker=Bv(e))}function Ps(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var t=n.getValue(),r="";return e&&(r=Ns(e)?e.checked?"true":"false":e.value),e=r,e!==t?(n.setValue(e),!0):!1}function Rr(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function ua(e,n){var t=n.checked;return U({},n,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:t??e._wrapperState.initialChecked})}function ol(e,n){var t=n.defaultValue==null?"":n.defaultValue,r=n.checked!=null?n.checked:n.defaultChecked;t=mn(n.value!=null?n.value:t),e._wrapperState={initialChecked:r,initialValue:t,controlled:n.type==="checkbox"||n.type==="radio"?n.checked!=null:n.value!=null}}function Fs(e,n){n=n.checked,n!=null&&ri(e,"checked",n,!1)}function ca(e,n){Fs(e,n);var t=mn(n.value),r=n.type;if(t!=null)r==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+t):e.value!==""+t&&(e.value=""+t);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}n.hasOwnProperty("value")?da(e,n.type,t):n.hasOwnProperty("defaultValue")&&da(e,n.type,mn(n.defaultValue)),n.checked==null&&n.defaultChecked!=null&&(e.defaultChecked=!!n.defaultChecked)}function al(e,n,t){if(n.hasOwnProperty("value")||n.hasOwnProperty("defaultValue")){var r=n.type;if(!(r!=="submit"&&r!=="reset"||n.value!==void 0&&n.value!==null))return;n=""+e._wrapperState.initialValue,t||n===e.value||(e.value=n),e.defaultValue=n}t=e.name,t!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,t!==""&&(e.name=t)}function da(e,n,t){(n!=="number"||Rr(e.ownerDocument)!==e)&&(t==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+t&&(e.defaultValue=""+t))}var $t=Array.isArray;function Jn(e,n,t,r){if(e=e.options,n){n={};for(var o=0;o<t.length;o++)n["$"+t[o]]=!0;for(t=0;t<e.length;t++)o=n.hasOwnProperty("$"+e[t].value),e[t].selected!==o&&(e[t].selected=o),o&&r&&(e[t].defaultSelected=!0)}else{for(t=""+mn(t),n=null,o=0;o<e.length;o++){if(e[o].value===t){e[o].selected=!0,r&&(e[o].defaultSelected=!0);return}n!==null||e[o].disabled||(n=e[o])}n!==null&&(n.selected=!0)}}function fa(e,n){if(n.dangerouslySetInnerHTML!=null)throw Error(k(91));return U({},n,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function il(e,n){var t=n.value;if(t==null){if(t=n.children,n=n.defaultValue,t!=null){if(n!=null)throw Error(k(92));if($t(t)){if(1<t.length)throw Error(k(93));t=t[0]}n=t}n==null&&(n=""),t=n}e._wrapperState={initialValue:mn(t)}}function Ms(e,n){var t=mn(n.value),r=mn(n.defaultValue);t!=null&&(t=""+t,t!==e.value&&(e.value=t),n.defaultValue==null&&e.defaultValue!==t&&(e.defaultValue=t)),r!=null&&(e.defaultValue=""+r)}function ll(e){var n=e.textContent;n===e._wrapperState.initialValue&&n!==""&&n!==null&&(e.value=n)}function zs(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function pa(e,n){return e==null||e==="http://www.w3.org/1999/xhtml"?zs(n):e==="http://www.w3.org/2000/svg"&&n==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var fr,Is=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(n,t,r,o){MSApp.execUnsafeLocalFunction(function(){return e(n,t,r,o)})}:e}(function(e,n){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=n;else{for(fr=fr||document.createElement("div"),fr.innerHTML="<svg>"+n.valueOf().toString()+"</svg>",n=fr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;n.firstChild;)e.appendChild(n.firstChild)}});function At(e,n){if(n){var t=e.firstChild;if(t&&t===e.lastChild&&t.nodeType===3){t.nodeValue=n;return}}e.textContent=n}var jt={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Wv=["Webkit","ms","Moz","O"];Object.keys(jt).forEach(function(e){Wv.forEach(function(n){n=n+e.charAt(0).toUpperCase()+e.substring(1),jt[n]=jt[e]})});function Os(e,n,t){return n==null||typeof n=="boolean"||n===""?"":t||typeof n!="number"||n===0||jt.hasOwnProperty(e)&&jt[e]?(""+n).trim():n+"px"}function Ls(e,n){e=e.style;for(var t in n)if(n.hasOwnProperty(t)){var r=t.indexOf("--")===0,o=Os(t,n[t],r);t==="float"&&(t="cssFloat"),r?e.setProperty(t,o):e[t]=o}}var Uv=U({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ga(e,n){if(n){if(Uv[e]&&(n.children!=null||n.dangerouslySetInnerHTML!=null))throw Error(k(137,e));if(n.dangerouslySetInnerHTML!=null){if(n.children!=null)throw Error(k(60));if(typeof n.dangerouslySetInnerHTML!="object"||!("__html"in n.dangerouslySetInnerHTML))throw Error(k(61))}if(n.style!=null&&typeof n.style!="object")throw Error(k(62))}}function ha(e,n){if(e.indexOf("-")===-1)return typeof n.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ma=null;function li(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var va=null,qn=null,Xn=null;function sl(e){if(e=or(e)){if(typeof va!="function")throw Error(k(280));var n=e.stateNode;n&&(n=vo(n),va(e.stateNode,e.type,n))}}function As(e){qn?Xn?Xn.push(e):Xn=[e]:qn=e}function Ds(){if(qn){var e=qn,n=Xn;if(Xn=qn=null,sl(e),n)for(e=0;e<n.length;e++)sl(n[e])}}function Rs(e,n){return e(n)}function Bs(){}var Io=!1;function Ws(e,n,t){if(Io)return e(n,t);Io=!0;try{return Rs(e,n,t)}finally{Io=!1,(qn!==null||Xn!==null)&&(Bs(),Ds())}}function Dt(e,n){var t=e.stateNode;if(t===null)return null;var r=vo(t);if(r===null)return null;t=r[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(t&&typeof t!="function")throw Error(k(231,n,typeof t));return t}var ya=!1;if(Ke)try{var vt={};Object.defineProperty(vt,"passive",{get:function(){ya=!0}}),window.addEventListener("test",vt,vt),window.removeEventListener("test",vt,vt)}catch{ya=!1}function Hv(e,n,t,r,o,a,i,l,s){var u=Array.prototype.slice.call(arguments,3);try{n.apply(t,u)}catch(f){this.onError(f)}}var Tt=!1,Br=null,Wr=!1,ba=null,Gv={onError:function(e){Tt=!0,Br=e}};function Vv(e,n,t,r,o,a,i,l,s){Tt=!1,Br=null,Hv.apply(Gv,arguments)}function Qv(e,n,t,r,o,a,i,l,s){if(Vv.apply(this,arguments),Tt){if(Tt){var u=Br;Tt=!1,Br=null}else throw Error(k(198));Wr||(Wr=!0,ba=u)}}function On(e){var n=e,t=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,n.flags&4098&&(t=n.return),e=n.return;while(e)}return n.tag===3?t:null}function Us(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function ul(e){if(On(e)!==e)throw Error(k(188))}function Yv(e){var n=e.alternate;if(!n){if(n=On(e),n===null)throw Error(k(188));return n!==e?null:e}for(var t=e,r=n;;){var o=t.return;if(o===null)break;var a=o.alternate;if(a===null){if(r=o.return,r!==null){t=r;continue}break}if(o.child===a.child){for(a=o.child;a;){if(a===t)return ul(o),e;if(a===r)return ul(o),n;a=a.sibling}throw Error(k(188))}if(t.return!==r.return)t=o,r=a;else{for(var i=!1,l=o.child;l;){if(l===t){i=!0,t=o,r=a;break}if(l===r){i=!0,r=o,t=a;break}l=l.sibling}if(!i){for(l=a.child;l;){if(l===t){i=!0,t=a,r=o;break}if(l===r){i=!0,r=a,t=o;break}l=l.sibling}if(!i)throw Error(k(189))}}if(t.alternate!==r)throw Error(k(190))}if(t.tag!==3)throw Error(k(188));return t.stateNode.current===t?e:n}function Hs(e){return e=Yv(e),e!==null?Gs(e):null}function Gs(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var n=Gs(e);if(n!==null)return n;e=e.sibling}return null}var Vs=we.unstable_scheduleCallback,cl=we.unstable_cancelCallback,Kv=we.unstable_shouldYield,Jv=we.unstable_requestPaint,Q=we.unstable_now,qv=we.unstable_getCurrentPriorityLevel,si=we.unstable_ImmediatePriority,Qs=we.unstable_UserBlockingPriority,Ur=we.unstable_NormalPriority,Xv=we.unstable_LowPriority,Ys=we.unstable_IdlePriority,po=null,Be=null;function Zv(e){if(Be&&typeof Be.onCommitFiberRoot=="function")try{Be.onCommitFiberRoot(po,e,void 0,(e.current.flags&128)===128)}catch{}}var Ie=Math.clz32?Math.clz32:ty,ey=Math.log,ny=Math.LN2;function ty(e){return e>>>=0,e===0?32:31-(ey(e)/ny|0)|0}var pr=64,gr=4194304;function Ct(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Hr(e,n){var t=e.pendingLanes;if(t===0)return 0;var r=0,o=e.suspendedLanes,a=e.pingedLanes,i=t&268435455;if(i!==0){var l=i&~o;l!==0?r=Ct(l):(a&=i,a!==0&&(r=Ct(a)))}else i=t&~o,i!==0?r=Ct(i):a!==0&&(r=Ct(a));if(r===0)return 0;if(n!==0&&n!==r&&!(n&o)&&(o=r&-r,a=n&-n,o>=a||o===16&&(a&4194240)!==0))return n;if(r&4&&(r|=t&16),n=e.entangledLanes,n!==0)for(e=e.entanglements,n&=r;0<n;)t=31-Ie(n),o=1<<t,r|=e[t],n&=~o;return r}function ry(e,n){switch(e){case 1:case 2:case 4:return n+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function oy(e,n){for(var t=e.suspendedLanes,r=e.pingedLanes,o=e.expirationTimes,a=e.pendingLanes;0<a;){var i=31-Ie(a),l=1<<i,s=o[i];s===-1?(!(l&t)||l&r)&&(o[i]=ry(l,n)):s<=n&&(e.expiredLanes|=l),a&=~l}}function xa(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Ks(){var e=pr;return pr<<=1,!(pr&4194240)&&(pr=64),e}function Oo(e){for(var n=[],t=0;31>t;t++)n.push(e);return n}function tr(e,n,t){e.pendingLanes|=n,n!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,n=31-Ie(n),e[n]=t}function ay(e,n){var t=e.pendingLanes&~n;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=n,e.mutableReadLanes&=n,e.entangledLanes&=n,n=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<t;){var o=31-Ie(t),a=1<<o;n[o]=0,r[o]=-1,e[o]=-1,t&=~a}}function ui(e,n){var t=e.entangledLanes|=n;for(e=e.entanglements;t;){var r=31-Ie(t),o=1<<r;o&n|e[r]&n&&(e[r]|=n),t&=~o}}var I=0;function Js(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var qs,ci,Xs,Zs,eu,wa=!1,hr=[],sn=null,un=null,cn=null,Rt=new Map,Bt=new Map,rn=[],iy="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function dl(e,n){switch(e){case"focusin":case"focusout":sn=null;break;case"dragenter":case"dragleave":un=null;break;case"mouseover":case"mouseout":cn=null;break;case"pointerover":case"pointerout":Rt.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":Bt.delete(n.pointerId)}}function yt(e,n,t,r,o,a){return e===null||e.nativeEvent!==a?(e={blockedOn:n,domEventName:t,eventSystemFlags:r,nativeEvent:a,targetContainers:[o]},n!==null&&(n=or(n),n!==null&&ci(n)),e):(e.eventSystemFlags|=r,n=e.targetContainers,o!==null&&n.indexOf(o)===-1&&n.push(o),e)}function ly(e,n,t,r,o){switch(n){case"focusin":return sn=yt(sn,e,n,t,r,o),!0;case"dragenter":return un=yt(un,e,n,t,r,o),!0;case"mouseover":return cn=yt(cn,e,n,t,r,o),!0;case"pointerover":var a=o.pointerId;return Rt.set(a,yt(Rt.get(a)||null,e,n,t,r,o)),!0;case"gotpointercapture":return a=o.pointerId,Bt.set(a,yt(Bt.get(a)||null,e,n,t,r,o)),!0}return!1}function nu(e){var n=$n(e.target);if(n!==null){var t=On(n);if(t!==null){if(n=t.tag,n===13){if(n=Us(t),n!==null){e.blockedOn=n,eu(e.priority,function(){Xs(t)});return}}else if(n===3&&t.stateNode.current.memoizedState.isDehydrated){e.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Tr(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var t=ka(e.domEventName,e.eventSystemFlags,n[0],e.nativeEvent);if(t===null){t=e.nativeEvent;var r=new t.constructor(t.type,t);ma=r,t.target.dispatchEvent(r),ma=null}else return n=or(t),n!==null&&ci(n),e.blockedOn=t,!1;n.shift()}return!0}function fl(e,n,t){Tr(e)&&t.delete(n)}function sy(){wa=!1,sn!==null&&Tr(sn)&&(sn=null),un!==null&&Tr(un)&&(un=null),cn!==null&&Tr(cn)&&(cn=null),Rt.forEach(fl),Bt.forEach(fl)}function bt(e,n){e.blockedOn===n&&(e.blockedOn=null,wa||(wa=!0,we.unstable_scheduleCallback(we.unstable_NormalPriority,sy)))}function Wt(e){function n(o){return bt(o,e)}if(0<hr.length){bt(hr[0],e);for(var t=1;t<hr.length;t++){var r=hr[t];r.blockedOn===e&&(r.blockedOn=null)}}for(sn!==null&&bt(sn,e),un!==null&&bt(un,e),cn!==null&&bt(cn,e),Rt.forEach(n),Bt.forEach(n),t=0;t<rn.length;t++)r=rn[t],r.blockedOn===e&&(r.blockedOn=null);for(;0<rn.length&&(t=rn[0],t.blockedOn===null);)nu(t),t.blockedOn===null&&rn.shift()}var Zn=Ze.ReactCurrentBatchConfig,Gr=!0;function uy(e,n,t,r){var o=I,a=Zn.transition;Zn.transition=null;try{I=1,di(e,n,t,r)}finally{I=o,Zn.transition=a}}function cy(e,n,t,r){var o=I,a=Zn.transition;Zn.transition=null;try{I=4,di(e,n,t,r)}finally{I=o,Zn.transition=a}}function di(e,n,t,r){if(Gr){var o=ka(e,n,t,r);if(o===null)Vo(e,n,r,Vr,t),dl(e,r);else if(ly(o,e,n,t,r))r.stopPropagation();else if(dl(e,r),n&4&&-1<iy.indexOf(e)){for(;o!==null;){var a=or(o);if(a!==null&&qs(a),a=ka(e,n,t,r),a===null&&Vo(e,n,r,Vr,t),a===o)break;o=a}o!==null&&r.stopPropagation()}else Vo(e,n,r,null,t)}}var Vr=null;function ka(e,n,t,r){if(Vr=null,e=li(r),e=$n(e),e!==null)if(n=On(e),n===null)e=null;else if(t=n.tag,t===13){if(e=Us(n),e!==null)return e;e=null}else if(t===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null);return Vr=e,null}function tu(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(qv()){case si:return 1;case Qs:return 4;case Ur:case Xv:return 16;case Ys:return 536870912;default:return 16}default:return 16}}var an=null,fi=null,Nr=null;function ru(){if(Nr)return Nr;var e,n=fi,t=n.length,r,o="value"in an?an.value:an.textContent,a=o.length;for(e=0;e<t&&n[e]===o[e];e++);var i=t-e;for(r=1;r<=i&&n[t-r]===o[a-r];r++);return Nr=o.slice(e,1<r?1-r:void 0)}function Pr(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function mr(){return!0}function pl(){return!1}function Se(e){function n(t,r,o,a,i){this._reactName=t,this._targetInst=o,this.type=r,this.nativeEvent=a,this.target=i,this.currentTarget=null;for(var l in e)e.hasOwnProperty(l)&&(t=e[l],this[l]=t?t(a):a[l]);return this.isDefaultPrevented=(a.defaultPrevented!=null?a.defaultPrevented:a.returnValue===!1)?mr:pl,this.isPropagationStopped=pl,this}return U(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=mr)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=mr)},persist:function(){},isPersistent:mr}),n}var dt={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},pi=Se(dt),rr=U({},dt,{view:0,detail:0}),dy=Se(rr),Lo,Ao,xt,go=U({},rr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:gi,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==xt&&(xt&&e.type==="mousemove"?(Lo=e.screenX-xt.screenX,Ao=e.screenY-xt.screenY):Ao=Lo=0,xt=e),Lo)},movementY:function(e){return"movementY"in e?e.movementY:Ao}}),gl=Se(go),fy=U({},go,{dataTransfer:0}),py=Se(fy),gy=U({},rr,{relatedTarget:0}),Do=Se(gy),hy=U({},dt,{animationName:0,elapsedTime:0,pseudoElement:0}),my=Se(hy),vy=U({},dt,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),yy=Se(vy),by=U({},dt,{data:0}),hl=Se(by),xy={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},wy={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},ky={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Sy(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=ky[e])?!!n[e]:!1}function gi(){return Sy}var _y=U({},rr,{key:function(e){if(e.key){var n=xy[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=Pr(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?wy[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:gi,charCode:function(e){return e.type==="keypress"?Pr(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Pr(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),$y=Se(_y),Cy=U({},go,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),ml=Se(Cy),Ey=U({},rr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:gi}),jy=Se(Ey),Ty=U({},dt,{propertyName:0,elapsedTime:0,pseudoElement:0}),Ny=Se(Ty),Py=U({},go,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Fy=Se(Py),My=[9,13,27,32],hi=Ke&&"CompositionEvent"in window,Nt=null;Ke&&"documentMode"in document&&(Nt=document.documentMode);var zy=Ke&&"TextEvent"in window&&!Nt,ou=Ke&&(!hi||Nt&&8<Nt&&11>=Nt),vl=" ",yl=!1;function au(e,n){switch(e){case"keyup":return My.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function iu(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Rn=!1;function Iy(e,n){switch(e){case"compositionend":return iu(n);case"keypress":return n.which!==32?null:(yl=!0,vl);case"textInput":return e=n.data,e===vl&&yl?null:e;default:return null}}function Oy(e,n){if(Rn)return e==="compositionend"||!hi&&au(e,n)?(e=ru(),Nr=fi=an=null,Rn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return ou&&n.locale!=="ko"?null:n.data;default:return null}}var Ly={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function bl(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!Ly[e.type]:n==="textarea"}function lu(e,n,t,r){As(r),n=Qr(n,"onChange"),0<n.length&&(t=new pi("onChange","change",null,t,r),e.push({event:t,listeners:n}))}var Pt=null,Ut=null;function Ay(e){yu(e,0)}function ho(e){var n=Un(e);if(Ps(n))return e}function Dy(e,n){if(e==="change")return n}var su=!1;if(Ke){var Ro;if(Ke){var Bo="oninput"in document;if(!Bo){var xl=document.createElement("div");xl.setAttribute("oninput","return;"),Bo=typeof xl.oninput=="function"}Ro=Bo}else Ro=!1;su=Ro&&(!document.documentMode||9<document.documentMode)}function wl(){Pt&&(Pt.detachEvent("onpropertychange",uu),Ut=Pt=null)}function uu(e){if(e.propertyName==="value"&&ho(Ut)){var n=[];lu(n,Ut,e,li(e)),Ws(Ay,n)}}function Ry(e,n,t){e==="focusin"?(wl(),Pt=n,Ut=t,Pt.attachEvent("onpropertychange",uu)):e==="focusout"&&wl()}function By(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return ho(Ut)}function Wy(e,n){if(e==="click")return ho(n)}function Uy(e,n){if(e==="input"||e==="change")return ho(n)}function Hy(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var Le=typeof Object.is=="function"?Object.is:Hy;function Ht(e,n){if(Le(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var t=Object.keys(e),r=Object.keys(n);if(t.length!==r.length)return!1;for(r=0;r<t.length;r++){var o=t[r];if(!oa.call(n,o)||!Le(e[o],n[o]))return!1}return!0}function kl(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Sl(e,n){var t=kl(e);e=0;for(var r;t;){if(t.nodeType===3){if(r=e+t.textContent.length,e<=n&&r>=n)return{node:t,offset:n-e};e=r}e:{for(;t;){if(t.nextSibling){t=t.nextSibling;break e}t=t.parentNode}t=void 0}t=kl(t)}}function cu(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?cu(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function du(){for(var e=window,n=Rr();n instanceof e.HTMLIFrameElement;){try{var t=typeof n.contentWindow.location.href=="string"}catch{t=!1}if(t)e=n.contentWindow;else break;n=Rr(e.document)}return n}function mi(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}function Gy(e){var n=du(),t=e.focusedElem,r=e.selectionRange;if(n!==t&&t&&t.ownerDocument&&cu(t.ownerDocument.documentElement,t)){if(r!==null&&mi(t)){if(n=r.start,e=r.end,e===void 0&&(e=n),"selectionStart"in t)t.selectionStart=n,t.selectionEnd=Math.min(e,t.value.length);else if(e=(n=t.ownerDocument||document)&&n.defaultView||window,e.getSelection){e=e.getSelection();var o=t.textContent.length,a=Math.min(r.start,o);r=r.end===void 0?a:Math.min(r.end,o),!e.extend&&a>r&&(o=r,r=a,a=o),o=Sl(t,a);var i=Sl(t,r);o&&i&&(e.rangeCount!==1||e.anchorNode!==o.node||e.anchorOffset!==o.offset||e.focusNode!==i.node||e.focusOffset!==i.offset)&&(n=n.createRange(),n.setStart(o.node,o.offset),e.removeAllRanges(),a>r?(e.addRange(n),e.extend(i.node,i.offset)):(n.setEnd(i.node,i.offset),e.addRange(n)))}}for(n=[],e=t;e=e.parentNode;)e.nodeType===1&&n.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof t.focus=="function"&&t.focus(),t=0;t<n.length;t++)e=n[t],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Vy=Ke&&"documentMode"in document&&11>=document.documentMode,Bn=null,Sa=null,Ft=null,_a=!1;function _l(e,n,t){var r=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;_a||Bn==null||Bn!==Rr(r)||(r=Bn,"selectionStart"in r&&mi(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Ft&&Ht(Ft,r)||(Ft=r,r=Qr(Sa,"onSelect"),0<r.length&&(n=new pi("onSelect","select",null,n,t),e.push({event:n,listeners:r}),n.target=Bn)))}function vr(e,n){var t={};return t[e.toLowerCase()]=n.toLowerCase(),t["Webkit"+e]="webkit"+n,t["Moz"+e]="moz"+n,t}var Wn={animationend:vr("Animation","AnimationEnd"),animationiteration:vr("Animation","AnimationIteration"),animationstart:vr("Animation","AnimationStart"),transitionend:vr("Transition","TransitionEnd")},Wo={},fu={};Ke&&(fu=document.createElement("div").style,"AnimationEvent"in window||(delete Wn.animationend.animation,delete Wn.animationiteration.animation,delete Wn.animationstart.animation),"TransitionEvent"in window||delete Wn.transitionend.transition);function mo(e){if(Wo[e])return Wo[e];if(!Wn[e])return e;var n=Wn[e],t;for(t in n)if(n.hasOwnProperty(t)&&t in fu)return Wo[e]=n[t];return e}var pu=mo("animationend"),gu=mo("animationiteration"),hu=mo("animationstart"),mu=mo("transitionend"),vu=new Map,$l="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function yn(e,n){vu.set(e,n),In(n,[e])}for(var Uo=0;Uo<$l.length;Uo++){var Ho=$l[Uo],Qy=Ho.toLowerCase(),Yy=Ho[0].toUpperCase()+Ho.slice(1);yn(Qy,"on"+Yy)}yn(pu,"onAnimationEnd");yn(gu,"onAnimationIteration");yn(hu,"onAnimationStart");yn("dblclick","onDoubleClick");yn("focusin","onFocus");yn("focusout","onBlur");yn(mu,"onTransitionEnd");tt("onMouseEnter",["mouseout","mouseover"]);tt("onMouseLeave",["mouseout","mouseover"]);tt("onPointerEnter",["pointerout","pointerover"]);tt("onPointerLeave",["pointerout","pointerover"]);In("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));In("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));In("onBeforeInput",["compositionend","keypress","textInput","paste"]);In("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));In("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));In("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Et="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Ky=new Set("cancel close invalid load scroll toggle".split(" ").concat(Et));function Cl(e,n,t){var r=e.type||"unknown-event";e.currentTarget=t,Qv(r,n,void 0,e),e.currentTarget=null}function yu(e,n){n=(n&4)!==0;for(var t=0;t<e.length;t++){var r=e[t],o=r.event;r=r.listeners;e:{var a=void 0;if(n)for(var i=r.length-1;0<=i;i--){var l=r[i],s=l.instance,u=l.currentTarget;if(l=l.listener,s!==a&&o.isPropagationStopped())break e;Cl(o,l,u),a=s}else for(i=0;i<r.length;i++){if(l=r[i],s=l.instance,u=l.currentTarget,l=l.listener,s!==a&&o.isPropagationStopped())break e;Cl(o,l,u),a=s}}}if(Wr)throw e=ba,Wr=!1,ba=null,e}function L(e,n){var t=n[Ta];t===void 0&&(t=n[Ta]=new Set);var r=e+"__bubble";t.has(r)||(bu(n,e,2,!1),t.add(r))}function Go(e,n,t){var r=0;n&&(r|=4),bu(t,e,r,n)}var yr="_reactListening"+Math.random().toString(36).slice(2);function Gt(e){if(!e[yr]){e[yr]=!0,Cs.forEach(function(t){t!=="selectionchange"&&(Ky.has(t)||Go(t,!1,e),Go(t,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[yr]||(n[yr]=!0,Go("selectionchange",!1,n))}}function bu(e,n,t,r){switch(tu(n)){case 1:var o=uy;break;case 4:o=cy;break;default:o=di}t=o.bind(null,n,t,e),o=void 0,!ya||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(o=!0),r?o!==void 0?e.addEventListener(n,t,{capture:!0,passive:o}):e.addEventListener(n,t,!0):o!==void 0?e.addEventListener(n,t,{passive:o}):e.addEventListener(n,t,!1)}function Vo(e,n,t,r,o){var a=r;if(!(n&1)&&!(n&2)&&r!==null)e:for(;;){if(r===null)return;var i=r.tag;if(i===3||i===4){var l=r.stateNode.containerInfo;if(l===o||l.nodeType===8&&l.parentNode===o)break;if(i===4)for(i=r.return;i!==null;){var s=i.tag;if((s===3||s===4)&&(s=i.stateNode.containerInfo,s===o||s.nodeType===8&&s.parentNode===o))return;i=i.return}for(;l!==null;){if(i=$n(l),i===null)return;if(s=i.tag,s===5||s===6){r=a=i;continue e}l=l.parentNode}}r=r.return}Ws(function(){var u=a,f=li(t),g=[];e:{var m=vu.get(e);if(m!==void 0){var y=pi,S=e;switch(e){case"keypress":if(Pr(t)===0)break e;case"keydown":case"keyup":y=$y;break;case"focusin":S="focus",y=Do;break;case"focusout":S="blur",y=Do;break;case"beforeblur":case"afterblur":y=Do;break;case"click":if(t.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":y=gl;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":y=py;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":y=jy;break;case pu:case gu:case hu:y=my;break;case mu:y=Ny;break;case"scroll":y=dy;break;case"wheel":y=Fy;break;case"copy":case"cut":case"paste":y=yy;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":y=ml}var x=(n&4)!==0,j=!x&&e==="scroll",p=x?m!==null?m+"Capture":null:m;x=[];for(var c=u,h;c!==null;){h=c;var b=h.stateNode;if(h.tag===5&&b!==null&&(h=b,p!==null&&(b=Dt(c,p),b!=null&&x.push(Vt(c,b,h)))),j)break;c=c.return}0<x.length&&(m=new y(m,S,null,t,f),g.push({event:m,listeners:x}))}}if(!(n&7)){e:{if(m=e==="mouseover"||e==="pointerover",y=e==="mouseout"||e==="pointerout",m&&t!==ma&&(S=t.relatedTarget||t.fromElement)&&($n(S)||S[Je]))break e;if((y||m)&&(m=f.window===f?f:(m=f.ownerDocument)?m.defaultView||m.parentWindow:window,y?(S=t.relatedTarget||t.toElement,y=u,S=S?$n(S):null,S!==null&&(j=On(S),S!==j||S.tag!==5&&S.tag!==6)&&(S=null)):(y=null,S=u),y!==S)){if(x=gl,b="onMouseLeave",p="onMouseEnter",c="mouse",(e==="pointerout"||e==="pointerover")&&(x=ml,b="onPointerLeave",p="onPointerEnter",c="pointer"),j=y==null?m:Un(y),h=S==null?m:Un(S),m=new x(b,c+"leave",y,t,f),m.target=j,m.relatedTarget=h,b=null,$n(f)===u&&(x=new x(p,c+"enter",S,t,f),x.target=h,x.relatedTarget=j,b=x),j=b,y&&S)n:{for(x=y,p=S,c=0,h=x;h;h=Ln(h))c++;for(h=0,b=p;b;b=Ln(b))h++;for(;0<c-h;)x=Ln(x),c--;for(;0<h-c;)p=Ln(p),h--;for(;c--;){if(x===p||p!==null&&x===p.alternate)break n;x=Ln(x),p=Ln(p)}x=null}else x=null;y!==null&&El(g,m,y,x,!1),S!==null&&j!==null&&El(g,j,S,x,!0)}}e:{if(m=u?Un(u):window,y=m.nodeName&&m.nodeName.toLowerCase(),y==="select"||y==="input"&&m.type==="file")var v=Dy;else if(bl(m))if(su)v=Uy;else{v=By;var w=Ry}else(y=m.nodeName)&&y.toLowerCase()==="input"&&(m.type==="checkbox"||m.type==="radio")&&(v=Wy);if(v&&(v=v(e,u))){lu(g,v,t,f);break e}w&&w(e,m,u),e==="focusout"&&(w=m._wrapperState)&&w.controlled&&m.type==="number"&&da(m,"number",m.value)}switch(w=u?Un(u):window,e){case"focusin":(bl(w)||w.contentEditable==="true")&&(Bn=w,Sa=u,Ft=null);break;case"focusout":Ft=Sa=Bn=null;break;case"mousedown":_a=!0;break;case"contextmenu":case"mouseup":case"dragend":_a=!1,_l(g,t,f);break;case"selectionchange":if(Vy)break;case"keydown":case"keyup":_l(g,t,f)}var E;if(hi)e:{switch(e){case"compositionstart":var C="onCompositionStart";break e;case"compositionend":C="onCompositionEnd";break e;case"compositionupdate":C="onCompositionUpdate";break e}C=void 0}else Rn?au(e,t)&&(C="onCompositionEnd"):e==="keydown"&&t.keyCode===229&&(C="onCompositionStart");C&&(ou&&t.locale!=="ko"&&(Rn||C!=="onCompositionStart"?C==="onCompositionEnd"&&Rn&&(E=ru()):(an=f,fi="value"in an?an.value:an.textContent,Rn=!0)),w=Qr(u,C),0<w.length&&(C=new hl(C,e,null,t,f),g.push({event:C,listeners:w}),E?C.data=E:(E=iu(t),E!==null&&(C.data=E)))),(E=zy?Iy(e,t):Oy(e,t))&&(u=Qr(u,"onBeforeInput"),0<u.length&&(f=new hl("onBeforeInput","beforeinput",null,t,f),g.push({event:f,listeners:u}),f.data=E))}yu(g,n)})}function Vt(e,n,t){return{instance:e,listener:n,currentTarget:t}}function Qr(e,n){for(var t=n+"Capture",r=[];e!==null;){var o=e,a=o.stateNode;o.tag===5&&a!==null&&(o=a,a=Dt(e,t),a!=null&&r.unshift(Vt(e,a,o)),a=Dt(e,n),a!=null&&r.push(Vt(e,a,o))),e=e.return}return r}function Ln(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function El(e,n,t,r,o){for(var a=n._reactName,i=[];t!==null&&t!==r;){var l=t,s=l.alternate,u=l.stateNode;if(s!==null&&s===r)break;l.tag===5&&u!==null&&(l=u,o?(s=Dt(t,a),s!=null&&i.unshift(Vt(t,s,l))):o||(s=Dt(t,a),s!=null&&i.push(Vt(t,s,l)))),t=t.return}i.length!==0&&e.push({event:n,listeners:i})}var Jy=/\r\n?/g,qy=/\u0000|\uFFFD/g;function jl(e){return(typeof e=="string"?e:""+e).replace(Jy,`
`).replace(qy,"")}function br(e,n,t){if(n=jl(n),jl(e)!==n&&t)throw Error(k(425))}function Yr(){}var $a=null,Ca=null;function Ea(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var ja=typeof setTimeout=="function"?setTimeout:void 0,Xy=typeof clearTimeout=="function"?clearTimeout:void 0,Tl=typeof Promise=="function"?Promise:void 0,Zy=typeof queueMicrotask=="function"?queueMicrotask:typeof Tl<"u"?function(e){return Tl.resolve(null).then(e).catch(e1)}:ja;function e1(e){setTimeout(function(){throw e})}function Qo(e,n){var t=n,r=0;do{var o=t.nextSibling;if(e.removeChild(t),o&&o.nodeType===8)if(t=o.data,t==="/$"){if(r===0){e.removeChild(o),Wt(n);return}r--}else t!=="$"&&t!=="$?"&&t!=="$!"||r++;t=o}while(t);Wt(n)}function dn(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?")break;if(n==="/$")return null}}return e}function Nl(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="$"||t==="$!"||t==="$?"){if(n===0)return e;n--}else t==="/$"&&n++}e=e.previousSibling}return null}var ft=Math.random().toString(36).slice(2),Re="__reactFiber$"+ft,Qt="__reactProps$"+ft,Je="__reactContainer$"+ft,Ta="__reactEvents$"+ft,n1="__reactListeners$"+ft,t1="__reactHandles$"+ft;function $n(e){var n=e[Re];if(n)return n;for(var t=e.parentNode;t;){if(n=t[Je]||t[Re]){if(t=n.alternate,n.child!==null||t!==null&&t.child!==null)for(e=Nl(e);e!==null;){if(t=e[Re])return t;e=Nl(e)}return n}e=t,t=e.parentNode}return null}function or(e){return e=e[Re]||e[Je],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Un(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(k(33))}function vo(e){return e[Qt]||null}var Na=[],Hn=-1;function bn(e){return{current:e}}function D(e){0>Hn||(e.current=Na[Hn],Na[Hn]=null,Hn--)}function O(e,n){Hn++,Na[Hn]=e.current,e.current=n}var vn={},ie=bn(vn),ge=bn(!1),Nn=vn;function rt(e,n){var t=e.type.contextTypes;if(!t)return vn;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===n)return r.__reactInternalMemoizedMaskedChildContext;var o={},a;for(a in t)o[a]=n[a];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=n,e.__reactInternalMemoizedMaskedChildContext=o),o}function he(e){return e=e.childContextTypes,e!=null}function Kr(){D(ge),D(ie)}function Pl(e,n,t){if(ie.current!==vn)throw Error(k(168));O(ie,n),O(ge,t)}function xu(e,n,t){var r=e.stateNode;if(n=n.childContextTypes,typeof r.getChildContext!="function")return t;r=r.getChildContext();for(var o in r)if(!(o in n))throw Error(k(108,Rv(e)||"Unknown",o));return U({},t,r)}function Jr(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||vn,Nn=ie.current,O(ie,e),O(ge,ge.current),!0}function Fl(e,n,t){var r=e.stateNode;if(!r)throw Error(k(169));t?(e=xu(e,n,Nn),r.__reactInternalMemoizedMergedChildContext=e,D(ge),D(ie),O(ie,e)):D(ge),O(ge,t)}var Ge=null,yo=!1,Yo=!1;function wu(e){Ge===null?Ge=[e]:Ge.push(e)}function r1(e){yo=!0,wu(e)}function xn(){if(!Yo&&Ge!==null){Yo=!0;var e=0,n=I;try{var t=Ge;for(I=1;e<t.length;e++){var r=t[e];do r=r(!0);while(r!==null)}Ge=null,yo=!1}catch(o){throw Ge!==null&&(Ge=Ge.slice(e+1)),Vs(si,xn),o}finally{I=n,Yo=!1}}return null}var Gn=[],Vn=0,qr=null,Xr=0,_e=[],$e=0,Pn=null,Ve=1,Qe="";function Sn(e,n){Gn[Vn++]=Xr,Gn[Vn++]=qr,qr=e,Xr=n}function ku(e,n,t){_e[$e++]=Ve,_e[$e++]=Qe,_e[$e++]=Pn,Pn=e;var r=Ve;e=Qe;var o=32-Ie(r)-1;r&=~(1<<o),t+=1;var a=32-Ie(n)+o;if(30<a){var i=o-o%5;a=(r&(1<<i)-1).toString(32),r>>=i,o-=i,Ve=1<<32-Ie(n)+o|t<<o|r,Qe=a+e}else Ve=1<<a|t<<o|r,Qe=e}function vi(e){e.return!==null&&(Sn(e,1),ku(e,1,0))}function yi(e){for(;e===qr;)qr=Gn[--Vn],Gn[Vn]=null,Xr=Gn[--Vn],Gn[Vn]=null;for(;e===Pn;)Pn=_e[--$e],_e[$e]=null,Qe=_e[--$e],_e[$e]=null,Ve=_e[--$e],_e[$e]=null}var xe=null,be=null,R=!1,ze=null;function Su(e,n){var t=Ce(5,null,null,0);t.elementType="DELETED",t.stateNode=n,t.return=e,n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)}function Ml(e,n){switch(e.tag){case 5:var t=e.type;return n=n.nodeType!==1||t.toLowerCase()!==n.nodeName.toLowerCase()?null:n,n!==null?(e.stateNode=n,xe=e,be=dn(n.firstChild),!0):!1;case 6:return n=e.pendingProps===""||n.nodeType!==3?null:n,n!==null?(e.stateNode=n,xe=e,be=null,!0):!1;case 13:return n=n.nodeType!==8?null:n,n!==null?(t=Pn!==null?{id:Ve,overflow:Qe}:null,e.memoizedState={dehydrated:n,treeContext:t,retryLane:1073741824},t=Ce(18,null,null,0),t.stateNode=n,t.return=e,e.child=t,xe=e,be=null,!0):!1;default:return!1}}function Pa(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Fa(e){if(R){var n=be;if(n){var t=n;if(!Ml(e,n)){if(Pa(e))throw Error(k(418));n=dn(t.nextSibling);var r=xe;n&&Ml(e,n)?Su(r,t):(e.flags=e.flags&-4097|2,R=!1,xe=e)}}else{if(Pa(e))throw Error(k(418));e.flags=e.flags&-4097|2,R=!1,xe=e}}}function zl(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;xe=e}function xr(e){if(e!==xe)return!1;if(!R)return zl(e),R=!0,!1;var n;if((n=e.tag!==3)&&!(n=e.tag!==5)&&(n=e.type,n=n!=="head"&&n!=="body"&&!Ea(e.type,e.memoizedProps)),n&&(n=be)){if(Pa(e))throw _u(),Error(k(418));for(;n;)Su(e,n),n=dn(n.nextSibling)}if(zl(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(k(317));e:{for(e=e.nextSibling,n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="/$"){if(n===0){be=dn(e.nextSibling);break e}n--}else t!=="$"&&t!=="$!"&&t!=="$?"||n++}e=e.nextSibling}be=null}}else be=xe?dn(e.stateNode.nextSibling):null;return!0}function _u(){for(var e=be;e;)e=dn(e.nextSibling)}function ot(){be=xe=null,R=!1}function bi(e){ze===null?ze=[e]:ze.push(e)}var o1=Ze.ReactCurrentBatchConfig;function wt(e,n,t){if(e=t.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(t._owner){if(t=t._owner,t){if(t.tag!==1)throw Error(k(309));var r=t.stateNode}if(!r)throw Error(k(147,e));var o=r,a=""+e;return n!==null&&n.ref!==null&&typeof n.ref=="function"&&n.ref._stringRef===a?n.ref:(n=function(i){var l=o.refs;i===null?delete l[a]:l[a]=i},n._stringRef=a,n)}if(typeof e!="string")throw Error(k(284));if(!t._owner)throw Error(k(290,e))}return e}function wr(e,n){throw e=Object.prototype.toString.call(n),Error(k(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e))}function Il(e){var n=e._init;return n(e._payload)}function $u(e){function n(p,c){if(e){var h=p.deletions;h===null?(p.deletions=[c],p.flags|=16):h.push(c)}}function t(p,c){if(!e)return null;for(;c!==null;)n(p,c),c=c.sibling;return null}function r(p,c){for(p=new Map;c!==null;)c.key!==null?p.set(c.key,c):p.set(c.index,c),c=c.sibling;return p}function o(p,c){return p=hn(p,c),p.index=0,p.sibling=null,p}function a(p,c,h){return p.index=h,e?(h=p.alternate,h!==null?(h=h.index,h<c?(p.flags|=2,c):h):(p.flags|=2,c)):(p.flags|=1048576,c)}function i(p){return e&&p.alternate===null&&(p.flags|=2),p}function l(p,c,h,b){return c===null||c.tag!==6?(c=na(h,p.mode,b),c.return=p,c):(c=o(c,h),c.return=p,c)}function s(p,c,h,b){var v=h.type;return v===Dn?f(p,c,h.props.children,b,h.key):c!==null&&(c.elementType===v||typeof v=="object"&&v!==null&&v.$$typeof===nn&&Il(v)===c.type)?(b=o(c,h.props),b.ref=wt(p,c,h),b.return=p,b):(b=Ar(h.type,h.key,h.props,null,p.mode,b),b.ref=wt(p,c,h),b.return=p,b)}function u(p,c,h,b){return c===null||c.tag!==4||c.stateNode.containerInfo!==h.containerInfo||c.stateNode.implementation!==h.implementation?(c=ta(h,p.mode,b),c.return=p,c):(c=o(c,h.children||[]),c.return=p,c)}function f(p,c,h,b,v){return c===null||c.tag!==7?(c=Tn(h,p.mode,b,v),c.return=p,c):(c=o(c,h),c.return=p,c)}function g(p,c,h){if(typeof c=="string"&&c!==""||typeof c=="number")return c=na(""+c,p.mode,h),c.return=p,c;if(typeof c=="object"&&c!==null){switch(c.$$typeof){case cr:return h=Ar(c.type,c.key,c.props,null,p.mode,h),h.ref=wt(p,null,c),h.return=p,h;case An:return c=ta(c,p.mode,h),c.return=p,c;case nn:var b=c._init;return g(p,b(c._payload),h)}if($t(c)||mt(c))return c=Tn(c,p.mode,h,null),c.return=p,c;wr(p,c)}return null}function m(p,c,h,b){var v=c!==null?c.key:null;if(typeof h=="string"&&h!==""||typeof h=="number")return v!==null?null:l(p,c,""+h,b);if(typeof h=="object"&&h!==null){switch(h.$$typeof){case cr:return h.key===v?s(p,c,h,b):null;case An:return h.key===v?u(p,c,h,b):null;case nn:return v=h._init,m(p,c,v(h._payload),b)}if($t(h)||mt(h))return v!==null?null:f(p,c,h,b,null);wr(p,h)}return null}function y(p,c,h,b,v){if(typeof b=="string"&&b!==""||typeof b=="number")return p=p.get(h)||null,l(c,p,""+b,v);if(typeof b=="object"&&b!==null){switch(b.$$typeof){case cr:return p=p.get(b.key===null?h:b.key)||null,s(c,p,b,v);case An:return p=p.get(b.key===null?h:b.key)||null,u(c,p,b,v);case nn:var w=b._init;return y(p,c,h,w(b._payload),v)}if($t(b)||mt(b))return p=p.get(h)||null,f(c,p,b,v,null);wr(c,b)}return null}function S(p,c,h,b){for(var v=null,w=null,E=c,C=c=0,G=null;E!==null&&C<h.length;C++){E.index>C?(G=E,E=null):G=E.sibling;var F=m(p,E,h[C],b);if(F===null){E===null&&(E=G);break}e&&E&&F.alternate===null&&n(p,E),c=a(F,c,C),w===null?v=F:w.sibling=F,w=F,E=G}if(C===h.length)return t(p,E),R&&Sn(p,C),v;if(E===null){for(;C<h.length;C++)E=g(p,h[C],b),E!==null&&(c=a(E,c,C),w===null?v=E:w.sibling=E,w=E);return R&&Sn(p,C),v}for(E=r(p,E);C<h.length;C++)G=y(E,p,C,h[C],b),G!==null&&(e&&G.alternate!==null&&E.delete(G.key===null?C:G.key),c=a(G,c,C),w===null?v=G:w.sibling=G,w=G);return e&&E.forEach(function(Ne){return n(p,Ne)}),R&&Sn(p,C),v}function x(p,c,h,b){var v=mt(h);if(typeof v!="function")throw Error(k(150));if(h=v.call(h),h==null)throw Error(k(151));for(var w=v=null,E=c,C=c=0,G=null,F=h.next();E!==null&&!F.done;C++,F=h.next()){E.index>C?(G=E,E=null):G=E.sibling;var Ne=m(p,E,F.value,b);if(Ne===null){E===null&&(E=G);break}e&&E&&Ne.alternate===null&&n(p,E),c=a(Ne,c,C),w===null?v=Ne:w.sibling=Ne,w=Ne,E=G}if(F.done)return t(p,E),R&&Sn(p,C),v;if(E===null){for(;!F.done;C++,F=h.next())F=g(p,F.value,b),F!==null&&(c=a(F,c,C),w===null?v=F:w.sibling=F,w=F);return R&&Sn(p,C),v}for(E=r(p,E);!F.done;C++,F=h.next())F=y(E,p,C,F.value,b),F!==null&&(e&&F.alternate!==null&&E.delete(F.key===null?C:F.key),c=a(F,c,C),w===null?v=F:w.sibling=F,w=F);return e&&E.forEach(function(gt){return n(p,gt)}),R&&Sn(p,C),v}function j(p,c,h,b){if(typeof h=="object"&&h!==null&&h.type===Dn&&h.key===null&&(h=h.props.children),typeof h=="object"&&h!==null){switch(h.$$typeof){case cr:e:{for(var v=h.key,w=c;w!==null;){if(w.key===v){if(v=h.type,v===Dn){if(w.tag===7){t(p,w.sibling),c=o(w,h.props.children),c.return=p,p=c;break e}}else if(w.elementType===v||typeof v=="object"&&v!==null&&v.$$typeof===nn&&Il(v)===w.type){t(p,w.sibling),c=o(w,h.props),c.ref=wt(p,w,h),c.return=p,p=c;break e}t(p,w);break}else n(p,w);w=w.sibling}h.type===Dn?(c=Tn(h.props.children,p.mode,b,h.key),c.return=p,p=c):(b=Ar(h.type,h.key,h.props,null,p.mode,b),b.ref=wt(p,c,h),b.return=p,p=b)}return i(p);case An:e:{for(w=h.key;c!==null;){if(c.key===w)if(c.tag===4&&c.stateNode.containerInfo===h.containerInfo&&c.stateNode.implementation===h.implementation){t(p,c.sibling),c=o(c,h.children||[]),c.return=p,p=c;break e}else{t(p,c);break}else n(p,c);c=c.sibling}c=ta(h,p.mode,b),c.return=p,p=c}return i(p);case nn:return w=h._init,j(p,c,w(h._payload),b)}if($t(h))return S(p,c,h,b);if(mt(h))return x(p,c,h,b);wr(p,h)}return typeof h=="string"&&h!==""||typeof h=="number"?(h=""+h,c!==null&&c.tag===6?(t(p,c.sibling),c=o(c,h),c.return=p,p=c):(t(p,c),c=na(h,p.mode,b),c.return=p,p=c),i(p)):t(p,c)}return j}var at=$u(!0),Cu=$u(!1),Zr=bn(null),eo=null,Qn=null,xi=null;function wi(){xi=Qn=eo=null}function ki(e){var n=Zr.current;D(Zr),e._currentValue=n}function Ma(e,n,t){for(;e!==null;){var r=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,r!==null&&(r.childLanes|=n)):r!==null&&(r.childLanes&n)!==n&&(r.childLanes|=n),e===t)break;e=e.return}}function et(e,n){eo=e,xi=Qn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&n&&(pe=!0),e.firstContext=null)}function je(e){var n=e._currentValue;if(xi!==e)if(e={context:e,memoizedValue:n,next:null},Qn===null){if(eo===null)throw Error(k(308));Qn=e,eo.dependencies={lanes:0,firstContext:e}}else Qn=Qn.next=e;return n}var Cn=null;function Si(e){Cn===null?Cn=[e]:Cn.push(e)}function Eu(e,n,t,r){var o=n.interleaved;return o===null?(t.next=t,Si(n)):(t.next=o.next,o.next=t),n.interleaved=t,qe(e,r)}function qe(e,n){e.lanes|=n;var t=e.alternate;for(t!==null&&(t.lanes|=n),t=e,e=e.return;e!==null;)e.childLanes|=n,t=e.alternate,t!==null&&(t.childLanes|=n),t=e,e=e.return;return t.tag===3?t.stateNode:null}var tn=!1;function _i(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function ju(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Ye(e,n){return{eventTime:e,lane:n,tag:0,payload:null,callback:null,next:null}}function fn(e,n,t){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,z&2){var o=r.pending;return o===null?n.next=n:(n.next=o.next,o.next=n),r.pending=n,qe(e,t)}return o=r.interleaved,o===null?(n.next=n,Si(r)):(n.next=o.next,o.next=n),r.interleaved=n,qe(e,t)}function Fr(e,n,t){if(n=n.updateQueue,n!==null&&(n=n.shared,(t&4194240)!==0)){var r=n.lanes;r&=e.pendingLanes,t|=r,n.lanes=t,ui(e,t)}}function Ol(e,n){var t=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,t===r)){var o=null,a=null;if(t=t.firstBaseUpdate,t!==null){do{var i={eventTime:t.eventTime,lane:t.lane,tag:t.tag,payload:t.payload,callback:t.callback,next:null};a===null?o=a=i:a=a.next=i,t=t.next}while(t!==null);a===null?o=a=n:a=a.next=n}else o=a=n;t={baseState:r.baseState,firstBaseUpdate:o,lastBaseUpdate:a,shared:r.shared,effects:r.effects},e.updateQueue=t;return}e=t.lastBaseUpdate,e===null?t.firstBaseUpdate=n:e.next=n,t.lastBaseUpdate=n}function no(e,n,t,r){var o=e.updateQueue;tn=!1;var a=o.firstBaseUpdate,i=o.lastBaseUpdate,l=o.shared.pending;if(l!==null){o.shared.pending=null;var s=l,u=s.next;s.next=null,i===null?a=u:i.next=u,i=s;var f=e.alternate;f!==null&&(f=f.updateQueue,l=f.lastBaseUpdate,l!==i&&(l===null?f.firstBaseUpdate=u:l.next=u,f.lastBaseUpdate=s))}if(a!==null){var g=o.baseState;i=0,f=u=s=null,l=a;do{var m=l.lane,y=l.eventTime;if((r&m)===m){f!==null&&(f=f.next={eventTime:y,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var S=e,x=l;switch(m=n,y=t,x.tag){case 1:if(S=x.payload,typeof S=="function"){g=S.call(y,g,m);break e}g=S;break e;case 3:S.flags=S.flags&-65537|128;case 0:if(S=x.payload,m=typeof S=="function"?S.call(y,g,m):S,m==null)break e;g=U({},g,m);break e;case 2:tn=!0}}l.callback!==null&&l.lane!==0&&(e.flags|=64,m=o.effects,m===null?o.effects=[l]:m.push(l))}else y={eventTime:y,lane:m,tag:l.tag,payload:l.payload,callback:l.callback,next:null},f===null?(u=f=y,s=g):f=f.next=y,i|=m;if(l=l.next,l===null){if(l=o.shared.pending,l===null)break;m=l,l=m.next,m.next=null,o.lastBaseUpdate=m,o.shared.pending=null}}while(!0);if(f===null&&(s=g),o.baseState=s,o.firstBaseUpdate=u,o.lastBaseUpdate=f,n=o.shared.interleaved,n!==null){o=n;do i|=o.lane,o=o.next;while(o!==n)}else a===null&&(o.shared.lanes=0);Mn|=i,e.lanes=i,e.memoizedState=g}}function Ll(e,n,t){if(e=n.effects,n.effects=null,e!==null)for(n=0;n<e.length;n++){var r=e[n],o=r.callback;if(o!==null){if(r.callback=null,r=t,typeof o!="function")throw Error(k(191,o));o.call(r)}}}var ar={},We=bn(ar),Yt=bn(ar),Kt=bn(ar);function En(e){if(e===ar)throw Error(k(174));return e}function $i(e,n){switch(O(Kt,n),O(Yt,e),O(We,ar),e=n.nodeType,e){case 9:case 11:n=(n=n.documentElement)?n.namespaceURI:pa(null,"");break;default:e=e===8?n.parentNode:n,n=e.namespaceURI||null,e=e.tagName,n=pa(n,e)}D(We),O(We,n)}function it(){D(We),D(Yt),D(Kt)}function Tu(e){En(Kt.current);var n=En(We.current),t=pa(n,e.type);n!==t&&(O(Yt,e),O(We,t))}function Ci(e){Yt.current===e&&(D(We),D(Yt))}var B=bn(0);function to(e){for(var n=e;n!==null;){if(n.tag===13){var t=n.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||t.data==="$?"||t.data==="$!"))return n}else if(n.tag===19&&n.memoizedProps.revealOrder!==void 0){if(n.flags&128)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var Ko=[];function Ei(){for(var e=0;e<Ko.length;e++)Ko[e]._workInProgressVersionPrimary=null;Ko.length=0}var Mr=Ze.ReactCurrentDispatcher,Jo=Ze.ReactCurrentBatchConfig,Fn=0,W=null,K=null,X=null,ro=!1,Mt=!1,Jt=0,a1=0;function re(){throw Error(k(321))}function ji(e,n){if(n===null)return!1;for(var t=0;t<n.length&&t<e.length;t++)if(!Le(e[t],n[t]))return!1;return!0}function Ti(e,n,t,r,o,a){if(Fn=a,W=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,Mr.current=e===null||e.memoizedState===null?u1:c1,e=t(r,o),Mt){a=0;do{if(Mt=!1,Jt=0,25<=a)throw Error(k(301));a+=1,X=K=null,n.updateQueue=null,Mr.current=d1,e=t(r,o)}while(Mt)}if(Mr.current=oo,n=K!==null&&K.next!==null,Fn=0,X=K=W=null,ro=!1,n)throw Error(k(300));return e}function Ni(){var e=Jt!==0;return Jt=0,e}function De(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return X===null?W.memoizedState=X=e:X=X.next=e,X}function Te(){if(K===null){var e=W.alternate;e=e!==null?e.memoizedState:null}else e=K.next;var n=X===null?W.memoizedState:X.next;if(n!==null)X=n,K=e;else{if(e===null)throw Error(k(310));K=e,e={memoizedState:K.memoizedState,baseState:K.baseState,baseQueue:K.baseQueue,queue:K.queue,next:null},X===null?W.memoizedState=X=e:X=X.next=e}return X}function qt(e,n){return typeof n=="function"?n(e):n}function qo(e){var n=Te(),t=n.queue;if(t===null)throw Error(k(311));t.lastRenderedReducer=e;var r=K,o=r.baseQueue,a=t.pending;if(a!==null){if(o!==null){var i=o.next;o.next=a.next,a.next=i}r.baseQueue=o=a,t.pending=null}if(o!==null){a=o.next,r=r.baseState;var l=i=null,s=null,u=a;do{var f=u.lane;if((Fn&f)===f)s!==null&&(s=s.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),r=u.hasEagerState?u.eagerState:e(r,u.action);else{var g={lane:f,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};s===null?(l=s=g,i=r):s=s.next=g,W.lanes|=f,Mn|=f}u=u.next}while(u!==null&&u!==a);s===null?i=r:s.next=l,Le(r,n.memoizedState)||(pe=!0),n.memoizedState=r,n.baseState=i,n.baseQueue=s,t.lastRenderedState=r}if(e=t.interleaved,e!==null){o=e;do a=o.lane,W.lanes|=a,Mn|=a,o=o.next;while(o!==e)}else o===null&&(t.lanes=0);return[n.memoizedState,t.dispatch]}function Xo(e){var n=Te(),t=n.queue;if(t===null)throw Error(k(311));t.lastRenderedReducer=e;var r=t.dispatch,o=t.pending,a=n.memoizedState;if(o!==null){t.pending=null;var i=o=o.next;do a=e(a,i.action),i=i.next;while(i!==o);Le(a,n.memoizedState)||(pe=!0),n.memoizedState=a,n.baseQueue===null&&(n.baseState=a),t.lastRenderedState=a}return[a,r]}function Nu(){}function Pu(e,n){var t=W,r=Te(),o=n(),a=!Le(r.memoizedState,o);if(a&&(r.memoizedState=o,pe=!0),r=r.queue,Pi(zu.bind(null,t,r,e),[e]),r.getSnapshot!==n||a||X!==null&&X.memoizedState.tag&1){if(t.flags|=2048,Xt(9,Mu.bind(null,t,r,o,n),void 0,null),Z===null)throw Error(k(349));Fn&30||Fu(t,n,o)}return o}function Fu(e,n,t){e.flags|=16384,e={getSnapshot:n,value:t},n=W.updateQueue,n===null?(n={lastEffect:null,stores:null},W.updateQueue=n,n.stores=[e]):(t=n.stores,t===null?n.stores=[e]:t.push(e))}function Mu(e,n,t,r){n.value=t,n.getSnapshot=r,Iu(n)&&Ou(e)}function zu(e,n,t){return t(function(){Iu(n)&&Ou(e)})}function Iu(e){var n=e.getSnapshot;e=e.value;try{var t=n();return!Le(e,t)}catch{return!0}}function Ou(e){var n=qe(e,1);n!==null&&Oe(n,e,1,-1)}function Al(e){var n=De();return typeof e=="function"&&(e=e()),n.memoizedState=n.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:qt,lastRenderedState:e},n.queue=e,e=e.dispatch=s1.bind(null,W,e),[n.memoizedState,e]}function Xt(e,n,t,r){return e={tag:e,create:n,destroy:t,deps:r,next:null},n=W.updateQueue,n===null?(n={lastEffect:null,stores:null},W.updateQueue=n,n.lastEffect=e.next=e):(t=n.lastEffect,t===null?n.lastEffect=e.next=e:(r=t.next,t.next=e,e.next=r,n.lastEffect=e)),e}function Lu(){return Te().memoizedState}function zr(e,n,t,r){var o=De();W.flags|=e,o.memoizedState=Xt(1|n,t,void 0,r===void 0?null:r)}function bo(e,n,t,r){var o=Te();r=r===void 0?null:r;var a=void 0;if(K!==null){var i=K.memoizedState;if(a=i.destroy,r!==null&&ji(r,i.deps)){o.memoizedState=Xt(n,t,a,r);return}}W.flags|=e,o.memoizedState=Xt(1|n,t,a,r)}function Dl(e,n){return zr(8390656,8,e,n)}function Pi(e,n){return bo(2048,8,e,n)}function Au(e,n){return bo(4,2,e,n)}function Du(e,n){return bo(4,4,e,n)}function Ru(e,n){if(typeof n=="function")return e=e(),n(e),function(){n(null)};if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function Bu(e,n,t){return t=t!=null?t.concat([e]):null,bo(4,4,Ru.bind(null,n,e),t)}function Fi(){}function Wu(e,n){var t=Te();n=n===void 0?null:n;var r=t.memoizedState;return r!==null&&n!==null&&ji(n,r[1])?r[0]:(t.memoizedState=[e,n],e)}function Uu(e,n){var t=Te();n=n===void 0?null:n;var r=t.memoizedState;return r!==null&&n!==null&&ji(n,r[1])?r[0]:(e=e(),t.memoizedState=[e,n],e)}function Hu(e,n,t){return Fn&21?(Le(t,n)||(t=Ks(),W.lanes|=t,Mn|=t,e.baseState=!0),n):(e.baseState&&(e.baseState=!1,pe=!0),e.memoizedState=t)}function i1(e,n){var t=I;I=t!==0&&4>t?t:4,e(!0);var r=Jo.transition;Jo.transition={};try{e(!1),n()}finally{I=t,Jo.transition=r}}function Gu(){return Te().memoizedState}function l1(e,n,t){var r=gn(e);if(t={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null},Vu(e))Qu(n,t);else if(t=Eu(e,n,t,r),t!==null){var o=se();Oe(t,e,r,o),Yu(t,n,r)}}function s1(e,n,t){var r=gn(e),o={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null};if(Vu(e))Qu(n,o);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=n.lastRenderedReducer,a!==null))try{var i=n.lastRenderedState,l=a(i,t);if(o.hasEagerState=!0,o.eagerState=l,Le(l,i)){var s=n.interleaved;s===null?(o.next=o,Si(n)):(o.next=s.next,s.next=o),n.interleaved=o;return}}catch{}finally{}t=Eu(e,n,o,r),t!==null&&(o=se(),Oe(t,e,r,o),Yu(t,n,r))}}function Vu(e){var n=e.alternate;return e===W||n!==null&&n===W}function Qu(e,n){Mt=ro=!0;var t=e.pending;t===null?n.next=n:(n.next=t.next,t.next=n),e.pending=n}function Yu(e,n,t){if(t&4194240){var r=n.lanes;r&=e.pendingLanes,t|=r,n.lanes=t,ui(e,t)}}var oo={readContext:je,useCallback:re,useContext:re,useEffect:re,useImperativeHandle:re,useInsertionEffect:re,useLayoutEffect:re,useMemo:re,useReducer:re,useRef:re,useState:re,useDebugValue:re,useDeferredValue:re,useTransition:re,useMutableSource:re,useSyncExternalStore:re,useId:re,unstable_isNewReconciler:!1},u1={readContext:je,useCallback:function(e,n){return De().memoizedState=[e,n===void 0?null:n],e},useContext:je,useEffect:Dl,useImperativeHandle:function(e,n,t){return t=t!=null?t.concat([e]):null,zr(4194308,4,Ru.bind(null,n,e),t)},useLayoutEffect:function(e,n){return zr(4194308,4,e,n)},useInsertionEffect:function(e,n){return zr(4,2,e,n)},useMemo:function(e,n){var t=De();return n=n===void 0?null:n,e=e(),t.memoizedState=[e,n],e},useReducer:function(e,n,t){var r=De();return n=t!==void 0?t(n):n,r.memoizedState=r.baseState=n,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:n},r.queue=e,e=e.dispatch=l1.bind(null,W,e),[r.memoizedState,e]},useRef:function(e){var n=De();return e={current:e},n.memoizedState=e},useState:Al,useDebugValue:Fi,useDeferredValue:function(e){return De().memoizedState=e},useTransition:function(){var e=Al(!1),n=e[0];return e=i1.bind(null,e[1]),De().memoizedState=e,[n,e]},useMutableSource:function(){},useSyncExternalStore:function(e,n,t){var r=W,o=De();if(R){if(t===void 0)throw Error(k(407));t=t()}else{if(t=n(),Z===null)throw Error(k(349));Fn&30||Fu(r,n,t)}o.memoizedState=t;var a={value:t,getSnapshot:n};return o.queue=a,Dl(zu.bind(null,r,a,e),[e]),r.flags|=2048,Xt(9,Mu.bind(null,r,a,t,n),void 0,null),t},useId:function(){var e=De(),n=Z.identifierPrefix;if(R){var t=Qe,r=Ve;t=(r&~(1<<32-Ie(r)-1)).toString(32)+t,n=":"+n+"R"+t,t=Jt++,0<t&&(n+="H"+t.toString(32)),n+=":"}else t=a1++,n=":"+n+"r"+t.toString(32)+":";return e.memoizedState=n},unstable_isNewReconciler:!1},c1={readContext:je,useCallback:Wu,useContext:je,useEffect:Pi,useImperativeHandle:Bu,useInsertionEffect:Au,useLayoutEffect:Du,useMemo:Uu,useReducer:qo,useRef:Lu,useState:function(){return qo(qt)},useDebugValue:Fi,useDeferredValue:function(e){var n=Te();return Hu(n,K.memoizedState,e)},useTransition:function(){var e=qo(qt)[0],n=Te().memoizedState;return[e,n]},useMutableSource:Nu,useSyncExternalStore:Pu,useId:Gu,unstable_isNewReconciler:!1},d1={readContext:je,useCallback:Wu,useContext:je,useEffect:Pi,useImperativeHandle:Bu,useInsertionEffect:Au,useLayoutEffect:Du,useMemo:Uu,useReducer:Xo,useRef:Lu,useState:function(){return Xo(qt)},useDebugValue:Fi,useDeferredValue:function(e){var n=Te();return K===null?n.memoizedState=e:Hu(n,K.memoizedState,e)},useTransition:function(){var e=Xo(qt)[0],n=Te().memoizedState;return[e,n]},useMutableSource:Nu,useSyncExternalStore:Pu,useId:Gu,unstable_isNewReconciler:!1};function Fe(e,n){if(e&&e.defaultProps){n=U({},n),e=e.defaultProps;for(var t in e)n[t]===void 0&&(n[t]=e[t]);return n}return n}function za(e,n,t,r){n=e.memoizedState,t=t(r,n),t=t==null?n:U({},n,t),e.memoizedState=t,e.lanes===0&&(e.updateQueue.baseState=t)}var xo={isMounted:function(e){return(e=e._reactInternals)?On(e)===e:!1},enqueueSetState:function(e,n,t){e=e._reactInternals;var r=se(),o=gn(e),a=Ye(r,o);a.payload=n,t!=null&&(a.callback=t),n=fn(e,a,o),n!==null&&(Oe(n,e,o,r),Fr(n,e,o))},enqueueReplaceState:function(e,n,t){e=e._reactInternals;var r=se(),o=gn(e),a=Ye(r,o);a.tag=1,a.payload=n,t!=null&&(a.callback=t),n=fn(e,a,o),n!==null&&(Oe(n,e,o,r),Fr(n,e,o))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var t=se(),r=gn(e),o=Ye(t,r);o.tag=2,n!=null&&(o.callback=n),n=fn(e,o,r),n!==null&&(Oe(n,e,r,t),Fr(n,e,r))}};function Rl(e,n,t,r,o,a,i){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,a,i):n.prototype&&n.prototype.isPureReactComponent?!Ht(t,r)||!Ht(o,a):!0}function Ku(e,n,t){var r=!1,o=vn,a=n.contextType;return typeof a=="object"&&a!==null?a=je(a):(o=he(n)?Nn:ie.current,r=n.contextTypes,a=(r=r!=null)?rt(e,o):vn),n=new n(t,a),e.memoizedState=n.state!==null&&n.state!==void 0?n.state:null,n.updater=xo,e.stateNode=n,n._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=o,e.__reactInternalMemoizedMaskedChildContext=a),n}function Bl(e,n,t,r){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(t,r),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(t,r),n.state!==e&&xo.enqueueReplaceState(n,n.state,null)}function Ia(e,n,t,r){var o=e.stateNode;o.props=t,o.state=e.memoizedState,o.refs={},_i(e);var a=n.contextType;typeof a=="object"&&a!==null?o.context=je(a):(a=he(n)?Nn:ie.current,o.context=rt(e,a)),o.state=e.memoizedState,a=n.getDerivedStateFromProps,typeof a=="function"&&(za(e,n,a,t),o.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(n=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),n!==o.state&&xo.enqueueReplaceState(o,o.state,null),no(e,t,o,r),o.state=e.memoizedState),typeof o.componentDidMount=="function"&&(e.flags|=4194308)}function lt(e,n){try{var t="",r=n;do t+=Dv(r),r=r.return;while(r);var o=t}catch(a){o=`
Error generating stack: `+a.message+`
`+a.stack}return{value:e,source:n,stack:o,digest:null}}function Zo(e,n,t){return{value:e,source:null,stack:t??null,digest:n??null}}function Oa(e,n){try{console.error(n.value)}catch(t){setTimeout(function(){throw t})}}var f1=typeof WeakMap=="function"?WeakMap:Map;function Ju(e,n,t){t=Ye(-1,t),t.tag=3,t.payload={element:null};var r=n.value;return t.callback=function(){io||(io=!0,Va=r),Oa(e,n)},t}function qu(e,n,t){t=Ye(-1,t),t.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var o=n.value;t.payload=function(){return r(o)},t.callback=function(){Oa(e,n)}}var a=e.stateNode;return a!==null&&typeof a.componentDidCatch=="function"&&(t.callback=function(){Oa(e,n),typeof r!="function"&&(pn===null?pn=new Set([this]):pn.add(this));var i=n.stack;this.componentDidCatch(n.value,{componentStack:i!==null?i:""})}),t}function Wl(e,n,t){var r=e.pingCache;if(r===null){r=e.pingCache=new f1;var o=new Set;r.set(n,o)}else o=r.get(n),o===void 0&&(o=new Set,r.set(n,o));o.has(t)||(o.add(t),e=C1.bind(null,e,n,t),n.then(e,e))}function Ul(e){do{var n;if((n=e.tag===13)&&(n=e.memoizedState,n=n!==null?n.dehydrated!==null:!0),n)return e;e=e.return}while(e!==null);return null}function Hl(e,n,t,r,o){return e.mode&1?(e.flags|=65536,e.lanes=o,e):(e===n?e.flags|=65536:(e.flags|=128,t.flags|=131072,t.flags&=-52805,t.tag===1&&(t.alternate===null?t.tag=17:(n=Ye(-1,1),n.tag=2,fn(t,n,1))),t.lanes|=1),e)}var p1=Ze.ReactCurrentOwner,pe=!1;function le(e,n,t,r){n.child=e===null?Cu(n,null,t,r):at(n,e.child,t,r)}function Gl(e,n,t,r,o){t=t.render;var a=n.ref;return et(n,o),r=Ti(e,n,t,r,a,o),t=Ni(),e!==null&&!pe?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~o,Xe(e,n,o)):(R&&t&&vi(n),n.flags|=1,le(e,n,r,o),n.child)}function Vl(e,n,t,r,o){if(e===null){var a=t.type;return typeof a=="function"&&!Ri(a)&&a.defaultProps===void 0&&t.compare===null&&t.defaultProps===void 0?(n.tag=15,n.type=a,Xu(e,n,a,r,o)):(e=Ar(t.type,null,r,n,n.mode,o),e.ref=n.ref,e.return=n,n.child=e)}if(a=e.child,!(e.lanes&o)){var i=a.memoizedProps;if(t=t.compare,t=t!==null?t:Ht,t(i,r)&&e.ref===n.ref)return Xe(e,n,o)}return n.flags|=1,e=hn(a,r),e.ref=n.ref,e.return=n,n.child=e}function Xu(e,n,t,r,o){if(e!==null){var a=e.memoizedProps;if(Ht(a,r)&&e.ref===n.ref)if(pe=!1,n.pendingProps=r=a,(e.lanes&o)!==0)e.flags&131072&&(pe=!0);else return n.lanes=e.lanes,Xe(e,n,o)}return La(e,n,t,r,o)}function Zu(e,n,t){var r=n.pendingProps,o=r.children,a=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(n.mode&1))n.memoizedState={baseLanes:0,cachePool:null,transitions:null},O(Kn,ye),ye|=t;else{if(!(t&1073741824))return e=a!==null?a.baseLanes|t:t,n.lanes=n.childLanes=1073741824,n.memoizedState={baseLanes:e,cachePool:null,transitions:null},n.updateQueue=null,O(Kn,ye),ye|=e,null;n.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=a!==null?a.baseLanes:t,O(Kn,ye),ye|=r}else a!==null?(r=a.baseLanes|t,n.memoizedState=null):r=t,O(Kn,ye),ye|=r;return le(e,n,o,t),n.child}function ec(e,n){var t=n.ref;(e===null&&t!==null||e!==null&&e.ref!==t)&&(n.flags|=512,n.flags|=2097152)}function La(e,n,t,r,o){var a=he(t)?Nn:ie.current;return a=rt(n,a),et(n,o),t=Ti(e,n,t,r,a,o),r=Ni(),e!==null&&!pe?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~o,Xe(e,n,o)):(R&&r&&vi(n),n.flags|=1,le(e,n,t,o),n.child)}function Ql(e,n,t,r,o){if(he(t)){var a=!0;Jr(n)}else a=!1;if(et(n,o),n.stateNode===null)Ir(e,n),Ku(n,t,r),Ia(n,t,r,o),r=!0;else if(e===null){var i=n.stateNode,l=n.memoizedProps;i.props=l;var s=i.context,u=t.contextType;typeof u=="object"&&u!==null?u=je(u):(u=he(t)?Nn:ie.current,u=rt(n,u));var f=t.getDerivedStateFromProps,g=typeof f=="function"||typeof i.getSnapshotBeforeUpdate=="function";g||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(l!==r||s!==u)&&Bl(n,i,r,u),tn=!1;var m=n.memoizedState;i.state=m,no(n,r,i,o),s=n.memoizedState,l!==r||m!==s||ge.current||tn?(typeof f=="function"&&(za(n,t,f,r),s=n.memoizedState),(l=tn||Rl(n,t,l,r,m,s,u))?(g||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(n.flags|=4194308)):(typeof i.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=r,n.memoizedState=s),i.props=r,i.state=s,i.context=u,r=l):(typeof i.componentDidMount=="function"&&(n.flags|=4194308),r=!1)}else{i=n.stateNode,ju(e,n),l=n.memoizedProps,u=n.type===n.elementType?l:Fe(n.type,l),i.props=u,g=n.pendingProps,m=i.context,s=t.contextType,typeof s=="object"&&s!==null?s=je(s):(s=he(t)?Nn:ie.current,s=rt(n,s));var y=t.getDerivedStateFromProps;(f=typeof y=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(l!==g||m!==s)&&Bl(n,i,r,s),tn=!1,m=n.memoizedState,i.state=m,no(n,r,i,o);var S=n.memoizedState;l!==g||m!==S||ge.current||tn?(typeof y=="function"&&(za(n,t,y,r),S=n.memoizedState),(u=tn||Rl(n,t,u,r,m,S,s)||!1)?(f||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(r,S,s),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(r,S,s)),typeof i.componentDidUpdate=="function"&&(n.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof i.componentDidUpdate!="function"||l===e.memoizedProps&&m===e.memoizedState||(n.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&m===e.memoizedState||(n.flags|=1024),n.memoizedProps=r,n.memoizedState=S),i.props=r,i.state=S,i.context=s,r=u):(typeof i.componentDidUpdate!="function"||l===e.memoizedProps&&m===e.memoizedState||(n.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&m===e.memoizedState||(n.flags|=1024),r=!1)}return Aa(e,n,t,r,a,o)}function Aa(e,n,t,r,o,a){ec(e,n);var i=(n.flags&128)!==0;if(!r&&!i)return o&&Fl(n,t,!1),Xe(e,n,a);r=n.stateNode,p1.current=n;var l=i&&typeof t.getDerivedStateFromError!="function"?null:r.render();return n.flags|=1,e!==null&&i?(n.child=at(n,e.child,null,a),n.child=at(n,null,l,a)):le(e,n,l,a),n.memoizedState=r.state,o&&Fl(n,t,!0),n.child}function nc(e){var n=e.stateNode;n.pendingContext?Pl(e,n.pendingContext,n.pendingContext!==n.context):n.context&&Pl(e,n.context,!1),$i(e,n.containerInfo)}function Yl(e,n,t,r,o){return ot(),bi(o),n.flags|=256,le(e,n,t,r),n.child}var Da={dehydrated:null,treeContext:null,retryLane:0};function Ra(e){return{baseLanes:e,cachePool:null,transitions:null}}function tc(e,n,t){var r=n.pendingProps,o=B.current,a=!1,i=(n.flags&128)!==0,l;if((l=i)||(l=e!==null&&e.memoizedState===null?!1:(o&2)!==0),l?(a=!0,n.flags&=-129):(e===null||e.memoizedState!==null)&&(o|=1),O(B,o&1),e===null)return Fa(n),e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(n.mode&1?e.data==="$!"?n.lanes=8:n.lanes=1073741824:n.lanes=1,null):(i=r.children,e=r.fallback,a?(r=n.mode,a=n.child,i={mode:"hidden",children:i},!(r&1)&&a!==null?(a.childLanes=0,a.pendingProps=i):a=So(i,r,0,null),e=Tn(e,r,t,null),a.return=n,e.return=n,a.sibling=e,n.child=a,n.child.memoizedState=Ra(t),n.memoizedState=Da,e):Mi(n,i));if(o=e.memoizedState,o!==null&&(l=o.dehydrated,l!==null))return g1(e,n,i,r,l,o,t);if(a){a=r.fallback,i=n.mode,o=e.child,l=o.sibling;var s={mode:"hidden",children:r.children};return!(i&1)&&n.child!==o?(r=n.child,r.childLanes=0,r.pendingProps=s,n.deletions=null):(r=hn(o,s),r.subtreeFlags=o.subtreeFlags&14680064),l!==null?a=hn(l,a):(a=Tn(a,i,t,null),a.flags|=2),a.return=n,r.return=n,r.sibling=a,n.child=r,r=a,a=n.child,i=e.child.memoizedState,i=i===null?Ra(t):{baseLanes:i.baseLanes|t,cachePool:null,transitions:i.transitions},a.memoizedState=i,a.childLanes=e.childLanes&~t,n.memoizedState=Da,r}return a=e.child,e=a.sibling,r=hn(a,{mode:"visible",children:r.children}),!(n.mode&1)&&(r.lanes=t),r.return=n,r.sibling=null,e!==null&&(t=n.deletions,t===null?(n.deletions=[e],n.flags|=16):t.push(e)),n.child=r,n.memoizedState=null,r}function Mi(e,n){return n=So({mode:"visible",children:n},e.mode,0,null),n.return=e,e.child=n}function kr(e,n,t,r){return r!==null&&bi(r),at(n,e.child,null,t),e=Mi(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function g1(e,n,t,r,o,a,i){if(t)return n.flags&256?(n.flags&=-257,r=Zo(Error(k(422))),kr(e,n,i,r)):n.memoizedState!==null?(n.child=e.child,n.flags|=128,null):(a=r.fallback,o=n.mode,r=So({mode:"visible",children:r.children},o,0,null),a=Tn(a,o,i,null),a.flags|=2,r.return=n,a.return=n,r.sibling=a,n.child=r,n.mode&1&&at(n,e.child,null,i),n.child.memoizedState=Ra(i),n.memoizedState=Da,a);if(!(n.mode&1))return kr(e,n,i,null);if(o.data==="$!"){if(r=o.nextSibling&&o.nextSibling.dataset,r)var l=r.dgst;return r=l,a=Error(k(419)),r=Zo(a,r,void 0),kr(e,n,i,r)}if(l=(i&e.childLanes)!==0,pe||l){if(r=Z,r!==null){switch(i&-i){case 4:o=2;break;case 16:o=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:o=32;break;case 536870912:o=268435456;break;default:o=0}o=o&(r.suspendedLanes|i)?0:o,o!==0&&o!==a.retryLane&&(a.retryLane=o,qe(e,o),Oe(r,e,o,-1))}return Di(),r=Zo(Error(k(421))),kr(e,n,i,r)}return o.data==="$?"?(n.flags|=128,n.child=e.child,n=E1.bind(null,e),o._reactRetry=n,null):(e=a.treeContext,be=dn(o.nextSibling),xe=n,R=!0,ze=null,e!==null&&(_e[$e++]=Ve,_e[$e++]=Qe,_e[$e++]=Pn,Ve=e.id,Qe=e.overflow,Pn=n),n=Mi(n,r.children),n.flags|=4096,n)}function Kl(e,n,t){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n),Ma(e.return,n,t)}function ea(e,n,t,r,o){var a=e.memoizedState;a===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:r,tail:t,tailMode:o}:(a.isBackwards=n,a.rendering=null,a.renderingStartTime=0,a.last=r,a.tail=t,a.tailMode=o)}function rc(e,n,t){var r=n.pendingProps,o=r.revealOrder,a=r.tail;if(le(e,n,r.children,t),r=B.current,r&2)r=r&1|2,n.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Kl(e,t,n);else if(e.tag===19)Kl(e,t,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break e;for(;e.sibling===null;){if(e.return===null||e.return===n)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(O(B,r),!(n.mode&1))n.memoizedState=null;else switch(o){case"forwards":for(t=n.child,o=null;t!==null;)e=t.alternate,e!==null&&to(e)===null&&(o=t),t=t.sibling;t=o,t===null?(o=n.child,n.child=null):(o=t.sibling,t.sibling=null),ea(n,!1,o,t,a);break;case"backwards":for(t=null,o=n.child,n.child=null;o!==null;){if(e=o.alternate,e!==null&&to(e)===null){n.child=o;break}e=o.sibling,o.sibling=t,t=o,o=e}ea(n,!0,t,null,a);break;case"together":ea(n,!1,null,null,void 0);break;default:n.memoizedState=null}return n.child}function Ir(e,n){!(n.mode&1)&&e!==null&&(e.alternate=null,n.alternate=null,n.flags|=2)}function Xe(e,n,t){if(e!==null&&(n.dependencies=e.dependencies),Mn|=n.lanes,!(t&n.childLanes))return null;if(e!==null&&n.child!==e.child)throw Error(k(153));if(n.child!==null){for(e=n.child,t=hn(e,e.pendingProps),n.child=t,t.return=n;e.sibling!==null;)e=e.sibling,t=t.sibling=hn(e,e.pendingProps),t.return=n;t.sibling=null}return n.child}function h1(e,n,t){switch(n.tag){case 3:nc(n),ot();break;case 5:Tu(n);break;case 1:he(n.type)&&Jr(n);break;case 4:$i(n,n.stateNode.containerInfo);break;case 10:var r=n.type._context,o=n.memoizedProps.value;O(Zr,r._currentValue),r._currentValue=o;break;case 13:if(r=n.memoizedState,r!==null)return r.dehydrated!==null?(O(B,B.current&1),n.flags|=128,null):t&n.child.childLanes?tc(e,n,t):(O(B,B.current&1),e=Xe(e,n,t),e!==null?e.sibling:null);O(B,B.current&1);break;case 19:if(r=(t&n.childLanes)!==0,e.flags&128){if(r)return rc(e,n,t);n.flags|=128}if(o=n.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),O(B,B.current),r)break;return null;case 22:case 23:return n.lanes=0,Zu(e,n,t)}return Xe(e,n,t)}var oc,Ba,ac,ic;oc=function(e,n){for(var t=n.child;t!==null;){if(t.tag===5||t.tag===6)e.appendChild(t.stateNode);else if(t.tag!==4&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break;for(;t.sibling===null;){if(t.return===null||t.return===n)return;t=t.return}t.sibling.return=t.return,t=t.sibling}};Ba=function(){};ac=function(e,n,t,r){var o=e.memoizedProps;if(o!==r){e=n.stateNode,En(We.current);var a=null;switch(t){case"input":o=ua(e,o),r=ua(e,r),a=[];break;case"select":o=U({},o,{value:void 0}),r=U({},r,{value:void 0}),a=[];break;case"textarea":o=fa(e,o),r=fa(e,r),a=[];break;default:typeof o.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Yr)}ga(t,r);var i;t=null;for(u in o)if(!r.hasOwnProperty(u)&&o.hasOwnProperty(u)&&o[u]!=null)if(u==="style"){var l=o[u];for(i in l)l.hasOwnProperty(i)&&(t||(t={}),t[i]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(Lt.hasOwnProperty(u)?a||(a=[]):(a=a||[]).push(u,null));for(u in r){var s=r[u];if(l=o!=null?o[u]:void 0,r.hasOwnProperty(u)&&s!==l&&(s!=null||l!=null))if(u==="style")if(l){for(i in l)!l.hasOwnProperty(i)||s&&s.hasOwnProperty(i)||(t||(t={}),t[i]="");for(i in s)s.hasOwnProperty(i)&&l[i]!==s[i]&&(t||(t={}),t[i]=s[i])}else t||(a||(a=[]),a.push(u,t)),t=s;else u==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,l=l?l.__html:void 0,s!=null&&l!==s&&(a=a||[]).push(u,s)):u==="children"?typeof s!="string"&&typeof s!="number"||(a=a||[]).push(u,""+s):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(Lt.hasOwnProperty(u)?(s!=null&&u==="onScroll"&&L("scroll",e),a||l===s||(a=[])):(a=a||[]).push(u,s))}t&&(a=a||[]).push("style",t);var u=a;(n.updateQueue=u)&&(n.flags|=4)}};ic=function(e,n,t,r){t!==r&&(n.flags|=4)};function kt(e,n){if(!R)switch(e.tailMode){case"hidden":n=e.tail;for(var t=null;n!==null;)n.alternate!==null&&(t=n),n=n.sibling;t===null?e.tail=null:t.sibling=null;break;case"collapsed":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function oe(e){var n=e.alternate!==null&&e.alternate.child===e.child,t=0,r=0;if(n)for(var o=e.child;o!==null;)t|=o.lanes|o.childLanes,r|=o.subtreeFlags&14680064,r|=o.flags&14680064,o.return=e,o=o.sibling;else for(o=e.child;o!==null;)t|=o.lanes|o.childLanes,r|=o.subtreeFlags,r|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=r,e.childLanes=t,n}function m1(e,n,t){var r=n.pendingProps;switch(yi(n),n.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return oe(n),null;case 1:return he(n.type)&&Kr(),oe(n),null;case 3:return r=n.stateNode,it(),D(ge),D(ie),Ei(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(xr(n)?n.flags|=4:e===null||e.memoizedState.isDehydrated&&!(n.flags&256)||(n.flags|=1024,ze!==null&&(Ka(ze),ze=null))),Ba(e,n),oe(n),null;case 5:Ci(n);var o=En(Kt.current);if(t=n.type,e!==null&&n.stateNode!=null)ac(e,n,t,r,o),e.ref!==n.ref&&(n.flags|=512,n.flags|=2097152);else{if(!r){if(n.stateNode===null)throw Error(k(166));return oe(n),null}if(e=En(We.current),xr(n)){r=n.stateNode,t=n.type;var a=n.memoizedProps;switch(r[Re]=n,r[Qt]=a,e=(n.mode&1)!==0,t){case"dialog":L("cancel",r),L("close",r);break;case"iframe":case"object":case"embed":L("load",r);break;case"video":case"audio":for(o=0;o<Et.length;o++)L(Et[o],r);break;case"source":L("error",r);break;case"img":case"image":case"link":L("error",r),L("load",r);break;case"details":L("toggle",r);break;case"input":ol(r,a),L("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!a.multiple},L("invalid",r);break;case"textarea":il(r,a),L("invalid",r)}ga(t,a),o=null;for(var i in a)if(a.hasOwnProperty(i)){var l=a[i];i==="children"?typeof l=="string"?r.textContent!==l&&(a.suppressHydrationWarning!==!0&&br(r.textContent,l,e),o=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(a.suppressHydrationWarning!==!0&&br(r.textContent,l,e),o=["children",""+l]):Lt.hasOwnProperty(i)&&l!=null&&i==="onScroll"&&L("scroll",r)}switch(t){case"input":dr(r),al(r,a,!0);break;case"textarea":dr(r),ll(r);break;case"select":case"option":break;default:typeof a.onClick=="function"&&(r.onclick=Yr)}r=o,n.updateQueue=r,r!==null&&(n.flags|=4)}else{i=o.nodeType===9?o:o.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=zs(t)),e==="http://www.w3.org/1999/xhtml"?t==="script"?(e=i.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=i.createElement(t,{is:r.is}):(e=i.createElement(t),t==="select"&&(i=e,r.multiple?i.multiple=!0:r.size&&(i.size=r.size))):e=i.createElementNS(e,t),e[Re]=n,e[Qt]=r,oc(e,n,!1,!1),n.stateNode=e;e:{switch(i=ha(t,r),t){case"dialog":L("cancel",e),L("close",e),o=r;break;case"iframe":case"object":case"embed":L("load",e),o=r;break;case"video":case"audio":for(o=0;o<Et.length;o++)L(Et[o],e);o=r;break;case"source":L("error",e),o=r;break;case"img":case"image":case"link":L("error",e),L("load",e),o=r;break;case"details":L("toggle",e),o=r;break;case"input":ol(e,r),o=ua(e,r),L("invalid",e);break;case"option":o=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},o=U({},r,{value:void 0}),L("invalid",e);break;case"textarea":il(e,r),o=fa(e,r),L("invalid",e);break;default:o=r}ga(t,o),l=o;for(a in l)if(l.hasOwnProperty(a)){var s=l[a];a==="style"?Ls(e,s):a==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,s!=null&&Is(e,s)):a==="children"?typeof s=="string"?(t!=="textarea"||s!=="")&&At(e,s):typeof s=="number"&&At(e,""+s):a!=="suppressContentEditableWarning"&&a!=="suppressHydrationWarning"&&a!=="autoFocus"&&(Lt.hasOwnProperty(a)?s!=null&&a==="onScroll"&&L("scroll",e):s!=null&&ri(e,a,s,i))}switch(t){case"input":dr(e),al(e,r,!1);break;case"textarea":dr(e),ll(e);break;case"option":r.value!=null&&e.setAttribute("value",""+mn(r.value));break;case"select":e.multiple=!!r.multiple,a=r.value,a!=null?Jn(e,!!r.multiple,a,!1):r.defaultValue!=null&&Jn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof o.onClick=="function"&&(e.onclick=Yr)}switch(t){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(n.flags|=4)}n.ref!==null&&(n.flags|=512,n.flags|=2097152)}return oe(n),null;case 6:if(e&&n.stateNode!=null)ic(e,n,e.memoizedProps,r);else{if(typeof r!="string"&&n.stateNode===null)throw Error(k(166));if(t=En(Kt.current),En(We.current),xr(n)){if(r=n.stateNode,t=n.memoizedProps,r[Re]=n,(a=r.nodeValue!==t)&&(e=xe,e!==null))switch(e.tag){case 3:br(r.nodeValue,t,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&br(r.nodeValue,t,(e.mode&1)!==0)}a&&(n.flags|=4)}else r=(t.nodeType===9?t:t.ownerDocument).createTextNode(r),r[Re]=n,n.stateNode=r}return oe(n),null;case 13:if(D(B),r=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(R&&be!==null&&n.mode&1&&!(n.flags&128))_u(),ot(),n.flags|=98560,a=!1;else if(a=xr(n),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(k(318));if(a=n.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(k(317));a[Re]=n}else ot(),!(n.flags&128)&&(n.memoizedState=null),n.flags|=4;oe(n),a=!1}else ze!==null&&(Ka(ze),ze=null),a=!0;if(!a)return n.flags&65536?n:null}return n.flags&128?(n.lanes=t,n):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(n.child.flags|=8192,n.mode&1&&(e===null||B.current&1?J===0&&(J=3):Di())),n.updateQueue!==null&&(n.flags|=4),oe(n),null);case 4:return it(),Ba(e,n),e===null&&Gt(n.stateNode.containerInfo),oe(n),null;case 10:return ki(n.type._context),oe(n),null;case 17:return he(n.type)&&Kr(),oe(n),null;case 19:if(D(B),a=n.memoizedState,a===null)return oe(n),null;if(r=(n.flags&128)!==0,i=a.rendering,i===null)if(r)kt(a,!1);else{if(J!==0||e!==null&&e.flags&128)for(e=n.child;e!==null;){if(i=to(e),i!==null){for(n.flags|=128,kt(a,!1),r=i.updateQueue,r!==null&&(n.updateQueue=r,n.flags|=4),n.subtreeFlags=0,r=t,t=n.child;t!==null;)a=t,e=r,a.flags&=14680066,i=a.alternate,i===null?(a.childLanes=0,a.lanes=e,a.child=null,a.subtreeFlags=0,a.memoizedProps=null,a.memoizedState=null,a.updateQueue=null,a.dependencies=null,a.stateNode=null):(a.childLanes=i.childLanes,a.lanes=i.lanes,a.child=i.child,a.subtreeFlags=0,a.deletions=null,a.memoizedProps=i.memoizedProps,a.memoizedState=i.memoizedState,a.updateQueue=i.updateQueue,a.type=i.type,e=i.dependencies,a.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t=t.sibling;return O(B,B.current&1|2),n.child}e=e.sibling}a.tail!==null&&Q()>st&&(n.flags|=128,r=!0,kt(a,!1),n.lanes=4194304)}else{if(!r)if(e=to(i),e!==null){if(n.flags|=128,r=!0,t=e.updateQueue,t!==null&&(n.updateQueue=t,n.flags|=4),kt(a,!0),a.tail===null&&a.tailMode==="hidden"&&!i.alternate&&!R)return oe(n),null}else 2*Q()-a.renderingStartTime>st&&t!==1073741824&&(n.flags|=128,r=!0,kt(a,!1),n.lanes=4194304);a.isBackwards?(i.sibling=n.child,n.child=i):(t=a.last,t!==null?t.sibling=i:n.child=i,a.last=i)}return a.tail!==null?(n=a.tail,a.rendering=n,a.tail=n.sibling,a.renderingStartTime=Q(),n.sibling=null,t=B.current,O(B,r?t&1|2:t&1),n):(oe(n),null);case 22:case 23:return Ai(),r=n.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(n.flags|=8192),r&&n.mode&1?ye&1073741824&&(oe(n),n.subtreeFlags&6&&(n.flags|=8192)):oe(n),null;case 24:return null;case 25:return null}throw Error(k(156,n.tag))}function v1(e,n){switch(yi(n),n.tag){case 1:return he(n.type)&&Kr(),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return it(),D(ge),D(ie),Ei(),e=n.flags,e&65536&&!(e&128)?(n.flags=e&-65537|128,n):null;case 5:return Ci(n),null;case 13:if(D(B),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(k(340));ot()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return D(B),null;case 4:return it(),null;case 10:return ki(n.type._context),null;case 22:case 23:return Ai(),null;case 24:return null;default:return null}}var Sr=!1,ae=!1,y1=typeof WeakSet=="function"?WeakSet:Set,_=null;function Yn(e,n){var t=e.ref;if(t!==null)if(typeof t=="function")try{t(null)}catch(r){H(e,n,r)}else t.current=null}function Wa(e,n,t){try{t()}catch(r){H(e,n,r)}}var Jl=!1;function b1(e,n){if($a=Gr,e=du(),mi(e)){if("selectionStart"in e)var t={start:e.selectionStart,end:e.selectionEnd};else e:{t=(t=e.ownerDocument)&&t.defaultView||window;var r=t.getSelection&&t.getSelection();if(r&&r.rangeCount!==0){t=r.anchorNode;var o=r.anchorOffset,a=r.focusNode;r=r.focusOffset;try{t.nodeType,a.nodeType}catch{t=null;break e}var i=0,l=-1,s=-1,u=0,f=0,g=e,m=null;n:for(;;){for(var y;g!==t||o!==0&&g.nodeType!==3||(l=i+o),g!==a||r!==0&&g.nodeType!==3||(s=i+r),g.nodeType===3&&(i+=g.nodeValue.length),(y=g.firstChild)!==null;)m=g,g=y;for(;;){if(g===e)break n;if(m===t&&++u===o&&(l=i),m===a&&++f===r&&(s=i),(y=g.nextSibling)!==null)break;g=m,m=g.parentNode}g=y}t=l===-1||s===-1?null:{start:l,end:s}}else t=null}t=t||{start:0,end:0}}else t=null;for(Ca={focusedElem:e,selectionRange:t},Gr=!1,_=n;_!==null;)if(n=_,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,_=e;else for(;_!==null;){n=_;try{var S=n.alternate;if(n.flags&1024)switch(n.tag){case 0:case 11:case 15:break;case 1:if(S!==null){var x=S.memoizedProps,j=S.memoizedState,p=n.stateNode,c=p.getSnapshotBeforeUpdate(n.elementType===n.type?x:Fe(n.type,x),j);p.__reactInternalSnapshotBeforeUpdate=c}break;case 3:var h=n.stateNode.containerInfo;h.nodeType===1?h.textContent="":h.nodeType===9&&h.documentElement&&h.removeChild(h.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(k(163))}}catch(b){H(n,n.return,b)}if(e=n.sibling,e!==null){e.return=n.return,_=e;break}_=n.return}return S=Jl,Jl=!1,S}function zt(e,n,t){var r=n.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var o=r=r.next;do{if((o.tag&e)===e){var a=o.destroy;o.destroy=void 0,a!==void 0&&Wa(n,t,a)}o=o.next}while(o!==r)}}function wo(e,n){if(n=n.updateQueue,n=n!==null?n.lastEffect:null,n!==null){var t=n=n.next;do{if((t.tag&e)===e){var r=t.create;t.destroy=r()}t=t.next}while(t!==n)}}function Ua(e){var n=e.ref;if(n!==null){var t=e.stateNode;switch(e.tag){case 5:e=t;break;default:e=t}typeof n=="function"?n(e):n.current=e}}function lc(e){var n=e.alternate;n!==null&&(e.alternate=null,lc(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&(delete n[Re],delete n[Qt],delete n[Ta],delete n[n1],delete n[t1])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function sc(e){return e.tag===5||e.tag===3||e.tag===4}function ql(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||sc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Ha(e,n,t){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?t.nodeType===8?t.parentNode.insertBefore(e,n):t.insertBefore(e,n):(t.nodeType===8?(n=t.parentNode,n.insertBefore(e,t)):(n=t,n.appendChild(e)),t=t._reactRootContainer,t!=null||n.onclick!==null||(n.onclick=Yr));else if(r!==4&&(e=e.child,e!==null))for(Ha(e,n,t),e=e.sibling;e!==null;)Ha(e,n,t),e=e.sibling}function Ga(e,n,t){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?t.insertBefore(e,n):t.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Ga(e,n,t),e=e.sibling;e!==null;)Ga(e,n,t),e=e.sibling}var ee=null,Me=!1;function en(e,n,t){for(t=t.child;t!==null;)uc(e,n,t),t=t.sibling}function uc(e,n,t){if(Be&&typeof Be.onCommitFiberUnmount=="function")try{Be.onCommitFiberUnmount(po,t)}catch{}switch(t.tag){case 5:ae||Yn(t,n);case 6:var r=ee,o=Me;ee=null,en(e,n,t),ee=r,Me=o,ee!==null&&(Me?(e=ee,t=t.stateNode,e.nodeType===8?e.parentNode.removeChild(t):e.removeChild(t)):ee.removeChild(t.stateNode));break;case 18:ee!==null&&(Me?(e=ee,t=t.stateNode,e.nodeType===8?Qo(e.parentNode,t):e.nodeType===1&&Qo(e,t),Wt(e)):Qo(ee,t.stateNode));break;case 4:r=ee,o=Me,ee=t.stateNode.containerInfo,Me=!0,en(e,n,t),ee=r,Me=o;break;case 0:case 11:case 14:case 15:if(!ae&&(r=t.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){o=r=r.next;do{var a=o,i=a.destroy;a=a.tag,i!==void 0&&(a&2||a&4)&&Wa(t,n,i),o=o.next}while(o!==r)}en(e,n,t);break;case 1:if(!ae&&(Yn(t,n),r=t.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=t.memoizedProps,r.state=t.memoizedState,r.componentWillUnmount()}catch(l){H(t,n,l)}en(e,n,t);break;case 21:en(e,n,t);break;case 22:t.mode&1?(ae=(r=ae)||t.memoizedState!==null,en(e,n,t),ae=r):en(e,n,t);break;default:en(e,n,t)}}function Xl(e){var n=e.updateQueue;if(n!==null){e.updateQueue=null;var t=e.stateNode;t===null&&(t=e.stateNode=new y1),n.forEach(function(r){var o=j1.bind(null,e,r);t.has(r)||(t.add(r),r.then(o,o))})}}function Pe(e,n){var t=n.deletions;if(t!==null)for(var r=0;r<t.length;r++){var o=t[r];try{var a=e,i=n,l=i;e:for(;l!==null;){switch(l.tag){case 5:ee=l.stateNode,Me=!1;break e;case 3:ee=l.stateNode.containerInfo,Me=!0;break e;case 4:ee=l.stateNode.containerInfo,Me=!0;break e}l=l.return}if(ee===null)throw Error(k(160));uc(a,i,o),ee=null,Me=!1;var s=o.alternate;s!==null&&(s.return=null),o.return=null}catch(u){H(o,n,u)}}if(n.subtreeFlags&12854)for(n=n.child;n!==null;)cc(n,e),n=n.sibling}function cc(e,n){var t=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Pe(n,e),Ae(e),r&4){try{zt(3,e,e.return),wo(3,e)}catch(x){H(e,e.return,x)}try{zt(5,e,e.return)}catch(x){H(e,e.return,x)}}break;case 1:Pe(n,e),Ae(e),r&512&&t!==null&&Yn(t,t.return);break;case 5:if(Pe(n,e),Ae(e),r&512&&t!==null&&Yn(t,t.return),e.flags&32){var o=e.stateNode;try{At(o,"")}catch(x){H(e,e.return,x)}}if(r&4&&(o=e.stateNode,o!=null)){var a=e.memoizedProps,i=t!==null?t.memoizedProps:a,l=e.type,s=e.updateQueue;if(e.updateQueue=null,s!==null)try{l==="input"&&a.type==="radio"&&a.name!=null&&Fs(o,a),ha(l,i);var u=ha(l,a);for(i=0;i<s.length;i+=2){var f=s[i],g=s[i+1];f==="style"?Ls(o,g):f==="dangerouslySetInnerHTML"?Is(o,g):f==="children"?At(o,g):ri(o,f,g,u)}switch(l){case"input":ca(o,a);break;case"textarea":Ms(o,a);break;case"select":var m=o._wrapperState.wasMultiple;o._wrapperState.wasMultiple=!!a.multiple;var y=a.value;y!=null?Jn(o,!!a.multiple,y,!1):m!==!!a.multiple&&(a.defaultValue!=null?Jn(o,!!a.multiple,a.defaultValue,!0):Jn(o,!!a.multiple,a.multiple?[]:"",!1))}o[Qt]=a}catch(x){H(e,e.return,x)}}break;case 6:if(Pe(n,e),Ae(e),r&4){if(e.stateNode===null)throw Error(k(162));o=e.stateNode,a=e.memoizedProps;try{o.nodeValue=a}catch(x){H(e,e.return,x)}}break;case 3:if(Pe(n,e),Ae(e),r&4&&t!==null&&t.memoizedState.isDehydrated)try{Wt(n.containerInfo)}catch(x){H(e,e.return,x)}break;case 4:Pe(n,e),Ae(e);break;case 13:Pe(n,e),Ae(e),o=e.child,o.flags&8192&&(a=o.memoizedState!==null,o.stateNode.isHidden=a,!a||o.alternate!==null&&o.alternate.memoizedState!==null||(Oi=Q())),r&4&&Xl(e);break;case 22:if(f=t!==null&&t.memoizedState!==null,e.mode&1?(ae=(u=ae)||f,Pe(n,e),ae=u):Pe(n,e),Ae(e),r&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!f&&e.mode&1)for(_=e,f=e.child;f!==null;){for(g=_=f;_!==null;){switch(m=_,y=m.child,m.tag){case 0:case 11:case 14:case 15:zt(4,m,m.return);break;case 1:Yn(m,m.return);var S=m.stateNode;if(typeof S.componentWillUnmount=="function"){r=m,t=m.return;try{n=r,S.props=n.memoizedProps,S.state=n.memoizedState,S.componentWillUnmount()}catch(x){H(r,t,x)}}break;case 5:Yn(m,m.return);break;case 22:if(m.memoizedState!==null){es(g);continue}}y!==null?(y.return=m,_=y):es(g)}f=f.sibling}e:for(f=null,g=e;;){if(g.tag===5){if(f===null){f=g;try{o=g.stateNode,u?(a=o.style,typeof a.setProperty=="function"?a.setProperty("display","none","important"):a.display="none"):(l=g.stateNode,s=g.memoizedProps.style,i=s!=null&&s.hasOwnProperty("display")?s.display:null,l.style.display=Os("display",i))}catch(x){H(e,e.return,x)}}}else if(g.tag===6){if(f===null)try{g.stateNode.nodeValue=u?"":g.memoizedProps}catch(x){H(e,e.return,x)}}else if((g.tag!==22&&g.tag!==23||g.memoizedState===null||g===e)&&g.child!==null){g.child.return=g,g=g.child;continue}if(g===e)break e;for(;g.sibling===null;){if(g.return===null||g.return===e)break e;f===g&&(f=null),g=g.return}f===g&&(f=null),g.sibling.return=g.return,g=g.sibling}}break;case 19:Pe(n,e),Ae(e),r&4&&Xl(e);break;case 21:break;default:Pe(n,e),Ae(e)}}function Ae(e){var n=e.flags;if(n&2){try{e:{for(var t=e.return;t!==null;){if(sc(t)){var r=t;break e}t=t.return}throw Error(k(160))}switch(r.tag){case 5:var o=r.stateNode;r.flags&32&&(At(o,""),r.flags&=-33);var a=ql(e);Ga(e,a,o);break;case 3:case 4:var i=r.stateNode.containerInfo,l=ql(e);Ha(e,l,i);break;default:throw Error(k(161))}}catch(s){H(e,e.return,s)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function x1(e,n,t){_=e,dc(e)}function dc(e,n,t){for(var r=(e.mode&1)!==0;_!==null;){var o=_,a=o.child;if(o.tag===22&&r){var i=o.memoizedState!==null||Sr;if(!i){var l=o.alternate,s=l!==null&&l.memoizedState!==null||ae;l=Sr;var u=ae;if(Sr=i,(ae=s)&&!u)for(_=o;_!==null;)i=_,s=i.child,i.tag===22&&i.memoizedState!==null?ns(o):s!==null?(s.return=i,_=s):ns(o);for(;a!==null;)_=a,dc(a),a=a.sibling;_=o,Sr=l,ae=u}Zl(e)}else o.subtreeFlags&8772&&a!==null?(a.return=o,_=a):Zl(e)}}function Zl(e){for(;_!==null;){var n=_;if(n.flags&8772){var t=n.alternate;try{if(n.flags&8772)switch(n.tag){case 0:case 11:case 15:ae||wo(5,n);break;case 1:var r=n.stateNode;if(n.flags&4&&!ae)if(t===null)r.componentDidMount();else{var o=n.elementType===n.type?t.memoizedProps:Fe(n.type,t.memoizedProps);r.componentDidUpdate(o,t.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var a=n.updateQueue;a!==null&&Ll(n,a,r);break;case 3:var i=n.updateQueue;if(i!==null){if(t=null,n.child!==null)switch(n.child.tag){case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}Ll(n,i,t)}break;case 5:var l=n.stateNode;if(t===null&&n.flags&4){t=l;var s=n.memoizedProps;switch(n.type){case"button":case"input":case"select":case"textarea":s.autoFocus&&t.focus();break;case"img":s.src&&(t.src=s.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(n.memoizedState===null){var u=n.alternate;if(u!==null){var f=u.memoizedState;if(f!==null){var g=f.dehydrated;g!==null&&Wt(g)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(k(163))}ae||n.flags&512&&Ua(n)}catch(m){H(n,n.return,m)}}if(n===e){_=null;break}if(t=n.sibling,t!==null){t.return=n.return,_=t;break}_=n.return}}function es(e){for(;_!==null;){var n=_;if(n===e){_=null;break}var t=n.sibling;if(t!==null){t.return=n.return,_=t;break}_=n.return}}function ns(e){for(;_!==null;){var n=_;try{switch(n.tag){case 0:case 11:case 15:var t=n.return;try{wo(4,n)}catch(s){H(n,t,s)}break;case 1:var r=n.stateNode;if(typeof r.componentDidMount=="function"){var o=n.return;try{r.componentDidMount()}catch(s){H(n,o,s)}}var a=n.return;try{Ua(n)}catch(s){H(n,a,s)}break;case 5:var i=n.return;try{Ua(n)}catch(s){H(n,i,s)}}}catch(s){H(n,n.return,s)}if(n===e){_=null;break}var l=n.sibling;if(l!==null){l.return=n.return,_=l;break}_=n.return}}var w1=Math.ceil,ao=Ze.ReactCurrentDispatcher,zi=Ze.ReactCurrentOwner,Ee=Ze.ReactCurrentBatchConfig,z=0,Z=null,Y=null,ne=0,ye=0,Kn=bn(0),J=0,Zt=null,Mn=0,ko=0,Ii=0,It=null,fe=null,Oi=0,st=1/0,He=null,io=!1,Va=null,pn=null,_r=!1,ln=null,lo=0,Ot=0,Qa=null,Or=-1,Lr=0;function se(){return z&6?Q():Or!==-1?Or:Or=Q()}function gn(e){return e.mode&1?z&2&&ne!==0?ne&-ne:o1.transition!==null?(Lr===0&&(Lr=Ks()),Lr):(e=I,e!==0||(e=window.event,e=e===void 0?16:tu(e.type)),e):1}function Oe(e,n,t,r){if(50<Ot)throw Ot=0,Qa=null,Error(k(185));tr(e,t,r),(!(z&2)||e!==Z)&&(e===Z&&(!(z&2)&&(ko|=t),J===4&&on(e,ne)),me(e,r),t===1&&z===0&&!(n.mode&1)&&(st=Q()+500,yo&&xn()))}function me(e,n){var t=e.callbackNode;oy(e,n);var r=Hr(e,e===Z?ne:0);if(r===0)t!==null&&cl(t),e.callbackNode=null,e.callbackPriority=0;else if(n=r&-r,e.callbackPriority!==n){if(t!=null&&cl(t),n===1)e.tag===0?r1(ts.bind(null,e)):wu(ts.bind(null,e)),Zy(function(){!(z&6)&&xn()}),t=null;else{switch(Js(r)){case 1:t=si;break;case 4:t=Qs;break;case 16:t=Ur;break;case 536870912:t=Ys;break;default:t=Ur}t=bc(t,fc.bind(null,e))}e.callbackPriority=n,e.callbackNode=t}}function fc(e,n){if(Or=-1,Lr=0,z&6)throw Error(k(327));var t=e.callbackNode;if(nt()&&e.callbackNode!==t)return null;var r=Hr(e,e===Z?ne:0);if(r===0)return null;if(r&30||r&e.expiredLanes||n)n=so(e,r);else{n=r;var o=z;z|=2;var a=gc();(Z!==e||ne!==n)&&(He=null,st=Q()+500,jn(e,n));do try{_1();break}catch(l){pc(e,l)}while(!0);wi(),ao.current=a,z=o,Y!==null?n=0:(Z=null,ne=0,n=J)}if(n!==0){if(n===2&&(o=xa(e),o!==0&&(r=o,n=Ya(e,o))),n===1)throw t=Zt,jn(e,0),on(e,r),me(e,Q()),t;if(n===6)on(e,r);else{if(o=e.current.alternate,!(r&30)&&!k1(o)&&(n=so(e,r),n===2&&(a=xa(e),a!==0&&(r=a,n=Ya(e,a))),n===1))throw t=Zt,jn(e,0),on(e,r),me(e,Q()),t;switch(e.finishedWork=o,e.finishedLanes=r,n){case 0:case 1:throw Error(k(345));case 2:_n(e,fe,He);break;case 3:if(on(e,r),(r&130023424)===r&&(n=Oi+500-Q(),10<n)){if(Hr(e,0)!==0)break;if(o=e.suspendedLanes,(o&r)!==r){se(),e.pingedLanes|=e.suspendedLanes&o;break}e.timeoutHandle=ja(_n.bind(null,e,fe,He),n);break}_n(e,fe,He);break;case 4:if(on(e,r),(r&4194240)===r)break;for(n=e.eventTimes,o=-1;0<r;){var i=31-Ie(r);a=1<<i,i=n[i],i>o&&(o=i),r&=~a}if(r=o,r=Q()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*w1(r/1960))-r,10<r){e.timeoutHandle=ja(_n.bind(null,e,fe,He),r);break}_n(e,fe,He);break;case 5:_n(e,fe,He);break;default:throw Error(k(329))}}}return me(e,Q()),e.callbackNode===t?fc.bind(null,e):null}function Ya(e,n){var t=It;return e.current.memoizedState.isDehydrated&&(jn(e,n).flags|=256),e=so(e,n),e!==2&&(n=fe,fe=t,n!==null&&Ka(n)),e}function Ka(e){fe===null?fe=e:fe.push.apply(fe,e)}function k1(e){for(var n=e;;){if(n.flags&16384){var t=n.updateQueue;if(t!==null&&(t=t.stores,t!==null))for(var r=0;r<t.length;r++){var o=t[r],a=o.getSnapshot;o=o.value;try{if(!Le(a(),o))return!1}catch{return!1}}}if(t=n.child,n.subtreeFlags&16384&&t!==null)t.return=n,n=t;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function on(e,n){for(n&=~Ii,n&=~ko,e.suspendedLanes|=n,e.pingedLanes&=~n,e=e.expirationTimes;0<n;){var t=31-Ie(n),r=1<<t;e[t]=-1,n&=~r}}function ts(e){if(z&6)throw Error(k(327));nt();var n=Hr(e,0);if(!(n&1))return me(e,Q()),null;var t=so(e,n);if(e.tag!==0&&t===2){var r=xa(e);r!==0&&(n=r,t=Ya(e,r))}if(t===1)throw t=Zt,jn(e,0),on(e,n),me(e,Q()),t;if(t===6)throw Error(k(345));return e.finishedWork=e.current.alternate,e.finishedLanes=n,_n(e,fe,He),me(e,Q()),null}function Li(e,n){var t=z;z|=1;try{return e(n)}finally{z=t,z===0&&(st=Q()+500,yo&&xn())}}function zn(e){ln!==null&&ln.tag===0&&!(z&6)&&nt();var n=z;z|=1;var t=Ee.transition,r=I;try{if(Ee.transition=null,I=1,e)return e()}finally{I=r,Ee.transition=t,z=n,!(z&6)&&xn()}}function Ai(){ye=Kn.current,D(Kn)}function jn(e,n){e.finishedWork=null,e.finishedLanes=0;var t=e.timeoutHandle;if(t!==-1&&(e.timeoutHandle=-1,Xy(t)),Y!==null)for(t=Y.return;t!==null;){var r=t;switch(yi(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Kr();break;case 3:it(),D(ge),D(ie),Ei();break;case 5:Ci(r);break;case 4:it();break;case 13:D(B);break;case 19:D(B);break;case 10:ki(r.type._context);break;case 22:case 23:Ai()}t=t.return}if(Z=e,Y=e=hn(e.current,null),ne=ye=n,J=0,Zt=null,Ii=ko=Mn=0,fe=It=null,Cn!==null){for(n=0;n<Cn.length;n++)if(t=Cn[n],r=t.interleaved,r!==null){t.interleaved=null;var o=r.next,a=t.pending;if(a!==null){var i=a.next;a.next=o,r.next=i}t.pending=r}Cn=null}return e}function pc(e,n){do{var t=Y;try{if(wi(),Mr.current=oo,ro){for(var r=W.memoizedState;r!==null;){var o=r.queue;o!==null&&(o.pending=null),r=r.next}ro=!1}if(Fn=0,X=K=W=null,Mt=!1,Jt=0,zi.current=null,t===null||t.return===null){J=1,Zt=n,Y=null;break}e:{var a=e,i=t.return,l=t,s=n;if(n=ne,l.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){var u=s,f=l,g=f.tag;if(!(f.mode&1)&&(g===0||g===11||g===15)){var m=f.alternate;m?(f.updateQueue=m.updateQueue,f.memoizedState=m.memoizedState,f.lanes=m.lanes):(f.updateQueue=null,f.memoizedState=null)}var y=Ul(i);if(y!==null){y.flags&=-257,Hl(y,i,l,a,n),y.mode&1&&Wl(a,u,n),n=y,s=u;var S=n.updateQueue;if(S===null){var x=new Set;x.add(s),n.updateQueue=x}else S.add(s);break e}else{if(!(n&1)){Wl(a,u,n),Di();break e}s=Error(k(426))}}else if(R&&l.mode&1){var j=Ul(i);if(j!==null){!(j.flags&65536)&&(j.flags|=256),Hl(j,i,l,a,n),bi(lt(s,l));break e}}a=s=lt(s,l),J!==4&&(J=2),It===null?It=[a]:It.push(a),a=i;do{switch(a.tag){case 3:a.flags|=65536,n&=-n,a.lanes|=n;var p=Ju(a,s,n);Ol(a,p);break e;case 1:l=s;var c=a.type,h=a.stateNode;if(!(a.flags&128)&&(typeof c.getDerivedStateFromError=="function"||h!==null&&typeof h.componentDidCatch=="function"&&(pn===null||!pn.has(h)))){a.flags|=65536,n&=-n,a.lanes|=n;var b=qu(a,l,n);Ol(a,b);break e}}a=a.return}while(a!==null)}mc(t)}catch(v){n=v,Y===t&&t!==null&&(Y=t=t.return);continue}break}while(!0)}function gc(){var e=ao.current;return ao.current=oo,e===null?oo:e}function Di(){(J===0||J===3||J===2)&&(J=4),Z===null||!(Mn&268435455)&&!(ko&268435455)||on(Z,ne)}function so(e,n){var t=z;z|=2;var r=gc();(Z!==e||ne!==n)&&(He=null,jn(e,n));do try{S1();break}catch(o){pc(e,o)}while(!0);if(wi(),z=t,ao.current=r,Y!==null)throw Error(k(261));return Z=null,ne=0,J}function S1(){for(;Y!==null;)hc(Y)}function _1(){for(;Y!==null&&!Kv();)hc(Y)}function hc(e){var n=yc(e.alternate,e,ye);e.memoizedProps=e.pendingProps,n===null?mc(e):Y=n,zi.current=null}function mc(e){var n=e;do{var t=n.alternate;if(e=n.return,n.flags&32768){if(t=v1(t,n),t!==null){t.flags&=32767,Y=t;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{J=6,Y=null;return}}else if(t=m1(t,n,ye),t!==null){Y=t;return}if(n=n.sibling,n!==null){Y=n;return}Y=n=e}while(n!==null);J===0&&(J=5)}function _n(e,n,t){var r=I,o=Ee.transition;try{Ee.transition=null,I=1,$1(e,n,t,r)}finally{Ee.transition=o,I=r}return null}function $1(e,n,t,r){do nt();while(ln!==null);if(z&6)throw Error(k(327));t=e.finishedWork;var o=e.finishedLanes;if(t===null)return null;if(e.finishedWork=null,e.finishedLanes=0,t===e.current)throw Error(k(177));e.callbackNode=null,e.callbackPriority=0;var a=t.lanes|t.childLanes;if(ay(e,a),e===Z&&(Y=Z=null,ne=0),!(t.subtreeFlags&2064)&&!(t.flags&2064)||_r||(_r=!0,bc(Ur,function(){return nt(),null})),a=(t.flags&15990)!==0,t.subtreeFlags&15990||a){a=Ee.transition,Ee.transition=null;var i=I;I=1;var l=z;z|=4,zi.current=null,b1(e,t),cc(t,e),Gy(Ca),Gr=!!$a,Ca=$a=null,e.current=t,x1(t),Jv(),z=l,I=i,Ee.transition=a}else e.current=t;if(_r&&(_r=!1,ln=e,lo=o),a=e.pendingLanes,a===0&&(pn=null),Zv(t.stateNode),me(e,Q()),n!==null)for(r=e.onRecoverableError,t=0;t<n.length;t++)o=n[t],r(o.value,{componentStack:o.stack,digest:o.digest});if(io)throw io=!1,e=Va,Va=null,e;return lo&1&&e.tag!==0&&nt(),a=e.pendingLanes,a&1?e===Qa?Ot++:(Ot=0,Qa=e):Ot=0,xn(),null}function nt(){if(ln!==null){var e=Js(lo),n=Ee.transition,t=I;try{if(Ee.transition=null,I=16>e?16:e,ln===null)var r=!1;else{if(e=ln,ln=null,lo=0,z&6)throw Error(k(331));var o=z;for(z|=4,_=e.current;_!==null;){var a=_,i=a.child;if(_.flags&16){var l=a.deletions;if(l!==null){for(var s=0;s<l.length;s++){var u=l[s];for(_=u;_!==null;){var f=_;switch(f.tag){case 0:case 11:case 15:zt(8,f,a)}var g=f.child;if(g!==null)g.return=f,_=g;else for(;_!==null;){f=_;var m=f.sibling,y=f.return;if(lc(f),f===u){_=null;break}if(m!==null){m.return=y,_=m;break}_=y}}}var S=a.alternate;if(S!==null){var x=S.child;if(x!==null){S.child=null;do{var j=x.sibling;x.sibling=null,x=j}while(x!==null)}}_=a}}if(a.subtreeFlags&2064&&i!==null)i.return=a,_=i;else e:for(;_!==null;){if(a=_,a.flags&2048)switch(a.tag){case 0:case 11:case 15:zt(9,a,a.return)}var p=a.sibling;if(p!==null){p.return=a.return,_=p;break e}_=a.return}}var c=e.current;for(_=c;_!==null;){i=_;var h=i.child;if(i.subtreeFlags&2064&&h!==null)h.return=i,_=h;else e:for(i=c;_!==null;){if(l=_,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:wo(9,l)}}catch(v){H(l,l.return,v)}if(l===i){_=null;break e}var b=l.sibling;if(b!==null){b.return=l.return,_=b;break e}_=l.return}}if(z=o,xn(),Be&&typeof Be.onPostCommitFiberRoot=="function")try{Be.onPostCommitFiberRoot(po,e)}catch{}r=!0}return r}finally{I=t,Ee.transition=n}}return!1}function rs(e,n,t){n=lt(t,n),n=Ju(e,n,1),e=fn(e,n,1),n=se(),e!==null&&(tr(e,1,n),me(e,n))}function H(e,n,t){if(e.tag===3)rs(e,e,t);else for(;n!==null;){if(n.tag===3){rs(n,e,t);break}else if(n.tag===1){var r=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(pn===null||!pn.has(r))){e=lt(t,e),e=qu(n,e,1),n=fn(n,e,1),e=se(),n!==null&&(tr(n,1,e),me(n,e));break}}n=n.return}}function C1(e,n,t){var r=e.pingCache;r!==null&&r.delete(n),n=se(),e.pingedLanes|=e.suspendedLanes&t,Z===e&&(ne&t)===t&&(J===4||J===3&&(ne&130023424)===ne&&500>Q()-Oi?jn(e,0):Ii|=t),me(e,n)}function vc(e,n){n===0&&(e.mode&1?(n=gr,gr<<=1,!(gr&130023424)&&(gr=4194304)):n=1);var t=se();e=qe(e,n),e!==null&&(tr(e,n,t),me(e,t))}function E1(e){var n=e.memoizedState,t=0;n!==null&&(t=n.retryLane),vc(e,t)}function j1(e,n){var t=0;switch(e.tag){case 13:var r=e.stateNode,o=e.memoizedState;o!==null&&(t=o.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(k(314))}r!==null&&r.delete(n),vc(e,t)}var yc;yc=function(e,n,t){if(e!==null)if(e.memoizedProps!==n.pendingProps||ge.current)pe=!0;else{if(!(e.lanes&t)&&!(n.flags&128))return pe=!1,h1(e,n,t);pe=!!(e.flags&131072)}else pe=!1,R&&n.flags&1048576&&ku(n,Xr,n.index);switch(n.lanes=0,n.tag){case 2:var r=n.type;Ir(e,n),e=n.pendingProps;var o=rt(n,ie.current);et(n,t),o=Ti(null,n,r,e,o,t);var a=Ni();return n.flags|=1,typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0?(n.tag=1,n.memoizedState=null,n.updateQueue=null,he(r)?(a=!0,Jr(n)):a=!1,n.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,_i(n),o.updater=xo,n.stateNode=o,o._reactInternals=n,Ia(n,r,e,t),n=Aa(null,n,r,!0,a,t)):(n.tag=0,R&&a&&vi(n),le(null,n,o,t),n=n.child),n;case 16:r=n.elementType;e:{switch(Ir(e,n),e=n.pendingProps,o=r._init,r=o(r._payload),n.type=r,o=n.tag=N1(r),e=Fe(r,e),o){case 0:n=La(null,n,r,e,t);break e;case 1:n=Ql(null,n,r,e,t);break e;case 11:n=Gl(null,n,r,e,t);break e;case 14:n=Vl(null,n,r,Fe(r.type,e),t);break e}throw Error(k(306,r,""))}return n;case 0:return r=n.type,o=n.pendingProps,o=n.elementType===r?o:Fe(r,o),La(e,n,r,o,t);case 1:return r=n.type,o=n.pendingProps,o=n.elementType===r?o:Fe(r,o),Ql(e,n,r,o,t);case 3:e:{if(nc(n),e===null)throw Error(k(387));r=n.pendingProps,a=n.memoizedState,o=a.element,ju(e,n),no(n,r,null,t);var i=n.memoizedState;if(r=i.element,a.isDehydrated)if(a={element:r,isDehydrated:!1,cache:i.cache,pendingSuspenseBoundaries:i.pendingSuspenseBoundaries,transitions:i.transitions},n.updateQueue.baseState=a,n.memoizedState=a,n.flags&256){o=lt(Error(k(423)),n),n=Yl(e,n,r,t,o);break e}else if(r!==o){o=lt(Error(k(424)),n),n=Yl(e,n,r,t,o);break e}else for(be=dn(n.stateNode.containerInfo.firstChild),xe=n,R=!0,ze=null,t=Cu(n,null,r,t),n.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling;else{if(ot(),r===o){n=Xe(e,n,t);break e}le(e,n,r,t)}n=n.child}return n;case 5:return Tu(n),e===null&&Fa(n),r=n.type,o=n.pendingProps,a=e!==null?e.memoizedProps:null,i=o.children,Ea(r,o)?i=null:a!==null&&Ea(r,a)&&(n.flags|=32),ec(e,n),le(e,n,i,t),n.child;case 6:return e===null&&Fa(n),null;case 13:return tc(e,n,t);case 4:return $i(n,n.stateNode.containerInfo),r=n.pendingProps,e===null?n.child=at(n,null,r,t):le(e,n,r,t),n.child;case 11:return r=n.type,o=n.pendingProps,o=n.elementType===r?o:Fe(r,o),Gl(e,n,r,o,t);case 7:return le(e,n,n.pendingProps,t),n.child;case 8:return le(e,n,n.pendingProps.children,t),n.child;case 12:return le(e,n,n.pendingProps.children,t),n.child;case 10:e:{if(r=n.type._context,o=n.pendingProps,a=n.memoizedProps,i=o.value,O(Zr,r._currentValue),r._currentValue=i,a!==null)if(Le(a.value,i)){if(a.children===o.children&&!ge.current){n=Xe(e,n,t);break e}}else for(a=n.child,a!==null&&(a.return=n);a!==null;){var l=a.dependencies;if(l!==null){i=a.child;for(var s=l.firstContext;s!==null;){if(s.context===r){if(a.tag===1){s=Ye(-1,t&-t),s.tag=2;var u=a.updateQueue;if(u!==null){u=u.shared;var f=u.pending;f===null?s.next=s:(s.next=f.next,f.next=s),u.pending=s}}a.lanes|=t,s=a.alternate,s!==null&&(s.lanes|=t),Ma(a.return,t,n),l.lanes|=t;break}s=s.next}}else if(a.tag===10)i=a.type===n.type?null:a.child;else if(a.tag===18){if(i=a.return,i===null)throw Error(k(341));i.lanes|=t,l=i.alternate,l!==null&&(l.lanes|=t),Ma(i,t,n),i=a.sibling}else i=a.child;if(i!==null)i.return=a;else for(i=a;i!==null;){if(i===n){i=null;break}if(a=i.sibling,a!==null){a.return=i.return,i=a;break}i=i.return}a=i}le(e,n,o.children,t),n=n.child}return n;case 9:return o=n.type,r=n.pendingProps.children,et(n,t),o=je(o),r=r(o),n.flags|=1,le(e,n,r,t),n.child;case 14:return r=n.type,o=Fe(r,n.pendingProps),o=Fe(r.type,o),Vl(e,n,r,o,t);case 15:return Xu(e,n,n.type,n.pendingProps,t);case 17:return r=n.type,o=n.pendingProps,o=n.elementType===r?o:Fe(r,o),Ir(e,n),n.tag=1,he(r)?(e=!0,Jr(n)):e=!1,et(n,t),Ku(n,r,o),Ia(n,r,o,t),Aa(null,n,r,!0,e,t);case 19:return rc(e,n,t);case 22:return Zu(e,n,t)}throw Error(k(156,n.tag))};function bc(e,n){return Vs(e,n)}function T1(e,n,t,r){this.tag=e,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ce(e,n,t,r){return new T1(e,n,t,r)}function Ri(e){return e=e.prototype,!(!e||!e.isReactComponent)}function N1(e){if(typeof e=="function")return Ri(e)?1:0;if(e!=null){if(e=e.$$typeof,e===ai)return 11;if(e===ii)return 14}return 2}function hn(e,n){var t=e.alternate;return t===null?(t=Ce(e.tag,n,e.key,e.mode),t.elementType=e.elementType,t.type=e.type,t.stateNode=e.stateNode,t.alternate=e,e.alternate=t):(t.pendingProps=n,t.type=e.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=e.flags&14680064,t.childLanes=e.childLanes,t.lanes=e.lanes,t.child=e.child,t.memoizedProps=e.memoizedProps,t.memoizedState=e.memoizedState,t.updateQueue=e.updateQueue,n=e.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},t.sibling=e.sibling,t.index=e.index,t.ref=e.ref,t}function Ar(e,n,t,r,o,a){var i=2;if(r=e,typeof e=="function")Ri(e)&&(i=1);else if(typeof e=="string")i=5;else e:switch(e){case Dn:return Tn(t.children,o,a,n);case oi:i=8,o|=8;break;case aa:return e=Ce(12,t,n,o|2),e.elementType=aa,e.lanes=a,e;case ia:return e=Ce(13,t,n,o),e.elementType=ia,e.lanes=a,e;case la:return e=Ce(19,t,n,o),e.elementType=la,e.lanes=a,e;case Ts:return So(t,o,a,n);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Es:i=10;break e;case js:i=9;break e;case ai:i=11;break e;case ii:i=14;break e;case nn:i=16,r=null;break e}throw Error(k(130,e==null?e:typeof e,""))}return n=Ce(i,t,n,o),n.elementType=e,n.type=r,n.lanes=a,n}function Tn(e,n,t,r){return e=Ce(7,e,r,n),e.lanes=t,e}function So(e,n,t,r){return e=Ce(22,e,r,n),e.elementType=Ts,e.lanes=t,e.stateNode={isHidden:!1},e}function na(e,n,t){return e=Ce(6,e,null,n),e.lanes=t,e}function ta(e,n,t){return n=Ce(4,e.children!==null?e.children:[],e.key,n),n.lanes=t,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}function P1(e,n,t,r,o){this.tag=n,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Oo(0),this.expirationTimes=Oo(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Oo(0),this.identifierPrefix=r,this.onRecoverableError=o,this.mutableSourceEagerHydrationData=null}function Bi(e,n,t,r,o,a,i,l,s){return e=new P1(e,n,t,l,s),n===1?(n=1,a===!0&&(n|=8)):n=0,a=Ce(3,null,null,n),e.current=a,a.stateNode=e,a.memoizedState={element:r,isDehydrated:t,cache:null,transitions:null,pendingSuspenseBoundaries:null},_i(a),e}function F1(e,n,t){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:An,key:r==null?null:""+r,children:e,containerInfo:n,implementation:t}}function xc(e){if(!e)return vn;e=e._reactInternals;e:{if(On(e)!==e||e.tag!==1)throw Error(k(170));var n=e;do{switch(n.tag){case 3:n=n.stateNode.context;break e;case 1:if(he(n.type)){n=n.stateNode.__reactInternalMemoizedMergedChildContext;break e}}n=n.return}while(n!==null);throw Error(k(171))}if(e.tag===1){var t=e.type;if(he(t))return xu(e,t,n)}return n}function wc(e,n,t,r,o,a,i,l,s){return e=Bi(t,r,!0,e,o,a,i,l,s),e.context=xc(null),t=e.current,r=se(),o=gn(t),a=Ye(r,o),a.callback=n??null,fn(t,a,o),e.current.lanes=o,tr(e,o,r),me(e,r),e}function _o(e,n,t,r){var o=n.current,a=se(),i=gn(o);return t=xc(t),n.context===null?n.context=t:n.pendingContext=t,n=Ye(a,i),n.payload={element:e},r=r===void 0?null:r,r!==null&&(n.callback=r),e=fn(o,n,i),e!==null&&(Oe(e,o,i,a),Fr(e,o,i)),i}function uo(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function os(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var t=e.retryLane;e.retryLane=t!==0&&t<n?t:n}}function Wi(e,n){os(e,n),(e=e.alternate)&&os(e,n)}function M1(){return null}var kc=typeof reportError=="function"?reportError:function(e){console.error(e)};function Ui(e){this._internalRoot=e}$o.prototype.render=Ui.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(k(409));_o(e,n,null,null)};$o.prototype.unmount=Ui.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;zn(function(){_o(null,e,null,null)}),n[Je]=null}};function $o(e){this._internalRoot=e}$o.prototype.unstable_scheduleHydration=function(e){if(e){var n=Zs();e={blockedOn:null,target:e,priority:n};for(var t=0;t<rn.length&&n!==0&&n<rn[t].priority;t++);rn.splice(t,0,e),t===0&&nu(e)}};function Hi(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Co(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function as(){}function z1(e,n,t,r,o){if(o){if(typeof r=="function"){var a=r;r=function(){var u=uo(i);a.call(u)}}var i=wc(n,r,e,0,null,!1,!1,"",as);return e._reactRootContainer=i,e[Je]=i.current,Gt(e.nodeType===8?e.parentNode:e),zn(),i}for(;o=e.lastChild;)e.removeChild(o);if(typeof r=="function"){var l=r;r=function(){var u=uo(s);l.call(u)}}var s=Bi(e,0,!1,null,null,!1,!1,"",as);return e._reactRootContainer=s,e[Je]=s.current,Gt(e.nodeType===8?e.parentNode:e),zn(function(){_o(n,s,t,r)}),s}function Eo(e,n,t,r,o){var a=t._reactRootContainer;if(a){var i=a;if(typeof o=="function"){var l=o;o=function(){var s=uo(i);l.call(s)}}_o(n,i,e,o)}else i=z1(t,n,e,o,r);return uo(i)}qs=function(e){switch(e.tag){case 3:var n=e.stateNode;if(n.current.memoizedState.isDehydrated){var t=Ct(n.pendingLanes);t!==0&&(ui(n,t|1),me(n,Q()),!(z&6)&&(st=Q()+500,xn()))}break;case 13:zn(function(){var r=qe(e,1);if(r!==null){var o=se();Oe(r,e,1,o)}}),Wi(e,1)}};ci=function(e){if(e.tag===13){var n=qe(e,134217728);if(n!==null){var t=se();Oe(n,e,134217728,t)}Wi(e,134217728)}};Xs=function(e){if(e.tag===13){var n=gn(e),t=qe(e,n);if(t!==null){var r=se();Oe(t,e,n,r)}Wi(e,n)}};Zs=function(){return I};eu=function(e,n){var t=I;try{return I=e,n()}finally{I=t}};va=function(e,n,t){switch(n){case"input":if(ca(e,t),n=t.name,t.type==="radio"&&n!=null){for(t=e;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll("input[name="+JSON.stringify(""+n)+'][type="radio"]'),n=0;n<t.length;n++){var r=t[n];if(r!==e&&r.form===e.form){var o=vo(r);if(!o)throw Error(k(90));Ps(r),ca(r,o)}}}break;case"textarea":Ms(e,t);break;case"select":n=t.value,n!=null&&Jn(e,!!t.multiple,n,!1)}};Rs=Li;Bs=zn;var I1={usingClientEntryPoint:!1,Events:[or,Un,vo,As,Ds,Li]},St={findFiberByHostInstance:$n,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},O1={bundleType:St.bundleType,version:St.version,rendererPackageName:St.rendererPackageName,rendererConfig:St.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Ze.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Hs(e),e===null?null:e.stateNode},findFiberByHostInstance:St.findFiberByHostInstance||M1,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var $r=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!$r.isDisabled&&$r.supportsFiber)try{po=$r.inject(O1),Be=$r}catch{}}ke.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=I1;ke.createPortal=function(e,n){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Hi(n))throw Error(k(200));return F1(e,n,null,t)};ke.createRoot=function(e,n){if(!Hi(e))throw Error(k(299));var t=!1,r="",o=kc;return n!=null&&(n.unstable_strictMode===!0&&(t=!0),n.identifierPrefix!==void 0&&(r=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),n=Bi(e,1,!1,null,null,t,!1,r,o),e[Je]=n.current,Gt(e.nodeType===8?e.parentNode:e),new Ui(n)};ke.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(k(188)):(e=Object.keys(e).join(","),Error(k(268,e)));return e=Hs(n),e=e===null?null:e.stateNode,e};ke.flushSync=function(e){return zn(e)};ke.hydrate=function(e,n,t){if(!Co(n))throw Error(k(200));return Eo(null,e,n,!0,t)};ke.hydrateRoot=function(e,n,t){if(!Hi(e))throw Error(k(405));var r=t!=null&&t.hydratedSources||null,o=!1,a="",i=kc;if(t!=null&&(t.unstable_strictMode===!0&&(o=!0),t.identifierPrefix!==void 0&&(a=t.identifierPrefix),t.onRecoverableError!==void 0&&(i=t.onRecoverableError)),n=wc(n,null,e,1,t??null,o,!1,a,i),e[Je]=n.current,Gt(e),r)for(e=0;e<r.length;e++)t=r[e],o=t._getVersion,o=o(t._source),n.mutableSourceEagerHydrationData==null?n.mutableSourceEagerHydrationData=[t,o]:n.mutableSourceEagerHydrationData.push(t,o);return new $o(n)};ke.render=function(e,n,t){if(!Co(n))throw Error(k(200));return Eo(null,e,n,!1,t)};ke.unmountComponentAtNode=function(e){if(!Co(e))throw Error(k(40));return e._reactRootContainer?(zn(function(){Eo(null,null,e,!1,function(){e._reactRootContainer=null,e[Je]=null})}),!0):!1};ke.unstable_batchedUpdates=Li;ke.unstable_renderSubtreeIntoContainer=function(e,n,t,r){if(!Co(t))throw Error(k(200));if(e==null||e._reactInternals===void 0)throw Error(k(38));return Eo(e,n,t,!1,r)};ke.version="18.3.1-next-f1338f8080-20240426";function Sc(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Sc)}catch(e){console.error(e)}}Sc(),Ss.exports=ke;var L1=Ss.exports,_c,is=L1;_c=is.createRoot,is.hydrateRoot;const A1=["title","section","two-column","feature-grid","data-table","stat-row","timeline","quote","closing","image-hero","comparison"],Ja={title:"Title",section:"Section divider","two-column":"Two column","feature-grid":"Feature grid","data-table":"Data table","stat-row":"Stat row",timeline:"Timeline",quote:"Quote",closing:"Closing","image-hero":"Image hero",comparison:"Comparison"};function D1(e){switch(e){case"title":return{layout:e,eyebrow:"Eyebrow",heading:"Title slide",lead:"Supporting line."};case"section":return{layout:e,number:"01",eyebrow:"Part",heading:"Section title",lead:""};case"two-column":return{layout:e,heading:"Heading",body:"Left column body text.",image:"",imageAlt:"Image"};case"image-hero":return{layout:e,eyebrow:"Story",heading:"Hero moment",lead:"Caption over a full-bleed image.",image:"",imageAlt:"Hero image"};case"comparison":return{layout:e,heading:"Before vs after",leftLabel:"Before",left:"The old way — slow, manual, error-prone.",rightLabel:"After",right:"The new way — automated, fast, reliable."};case"feature-grid":return{layout:e,heading:"Feature grid",columns:3,cards:[{title:"One",body:"First point."},{title:"Two",body:"Second point."},{title:"Three",body:"Third point."}]};case"data-table":return{layout:e,heading:"Table",columns:["Column A","Column B"],rows:[["a1","b1"],["a2","b2"]]};case"stat-row":return{layout:e,heading:"Stats",stats:[{value:"100%",label:"Metric"},{value:"2x",label:"Metric"}]};case"timeline":return{layout:e,heading:"Timeline",steps:[{title:"Step one",body:"Detail."},{title:"Step two",body:"Detail."}]};case"quote":return{layout:e,quote:"A memorable quote.",by:"Attribution"};case"closing":return{layout:e,eyebrow:"Thanks",heading:"Closing",lead:"Call to action.",cta:{label:"Get started",href:"https://example.com"}};default:return{layout:e,heading:"Slide"}}}const $c={type:"deck",meta:{title:"Acme Q3",company:"Acme",theme:"claude"},slides:[{layout:"title",eyebrow:"Q3 2026",heading:"Acme All-Hands",lead:"Momentum, metrics, and what's next."},{layout:"section",number:"01",eyebrow:"Part one",heading:"Where we are"},{layout:"feature-grid",heading:"Three pillars",columns:3,cards:[{icon:"fa-solid fa-bolt",title:"Speed",body:"Ship 3x faster."},{title:"Safety",body:"SOC2 in progress."},{title:"Simplicity",body:"One command."}]},{layout:"stat-row",heading:"By the numbers",stats:[{value:"98%",label:"Uptime"},{value:"$1.2M",label:"ARR"},{value:"3.1x",label:"YoY"}]},{layout:"data-table",heading:"Pipeline",columns:["Stage","Count","Value"],rows:[["Lead","120","$600k"],["POC","34","$340k"],["Closed","12","$210k"]]},{layout:"timeline",heading:"Roadmap",steps:[{title:"Now",body:"PPTX export."},{title:"Next",body:"Studio editor."},{title:"Later",body:"Templates."}]},{layout:"quote",quote:"Make it work, make it right, make it fast.",by:"Kent Beck"},{layout:"closing",heading:"Thank you",lead:"Questions?",cta:{label:"Get started",href:"https://acme.com"}}]},Cc="claude",Ec="0.1.0",jc="Anthropic / Claude-inspired theme: warm cream paper, clay-coral accent, grotesk + editorial-serif pairing.",Tc="Warm, human, editorial, high-craft, calm — cream paper, soft clay-coral signal, Styrene-style grotesk headings over a Tiempos-style serif body. Restrained, trustworthy, not corporate.",Nc="MIT",Pc="Timur Isachenko",Fc={bg:"#faf9f5",bg2:"#f4f3ee",text:"#141413",muted:"#73706a",accent:"#d97757",accent2:"#6a9bcc",cardBg:"#ffffff",border:"#e8e6dc"},Mc={headingFont:"'Space Grotesk', system-ui, sans-serif",bodyFont:"'Lora', Georgia, 'Times New Roman', serif",headingWeight:600,googleFonts:["Space+Grotesk:wght@500;600;700","Lora:wght@400;500;600"]},zc={radius:"12px",slideWidth:"1280px"},R1={name:Cc,version:Ec,extends:"default-tech",description:jc,vibe:Tc,license:Nc,author:Pc,roles:Fc,typography:Mc,geometry:zc},B1=Object.freeze(Object.defineProperty({__proto__:null,author:Pc,default:R1,description:jc,geometry:zc,license:Nc,name:Cc,roles:Fc,typography:Mc,version:Ec,vibe:Tc},Symbol.toStringTag,{value:"Module"})),Ic="default-tech",Oc="0.1.0",Lc="Edgy tech-startup default: dark canvas, violet + cyan accents, bold geometric sans.",Ac="Edgy tech startup — dark, confident, neon-accented.",Dc="MIT",Rc="Timur Isachenko",Bc={bg:"#0e0e12",bg2:"#16161d",text:"#f4f4f5",muted:"#a1a1aa",accent:"#7c3aed",accent2:"#22d3ee",cardBg:"rgba(255,255,255,0.04)",border:"rgba(255,255,255,0.08)"},Wc={headingFont:"'Montserrat', system-ui, sans-serif",bodyFont:"'Open Sans', system-ui, sans-serif",headingWeight:800,googleFonts:["Montserrat:wght@700;800","Open+Sans:wght@400;600"]},Uc={radius:"18px",slideWidth:"1280px"},W1={name:Ic,version:Oc,description:Lc,vibe:Ac,license:Dc,author:Rc,roles:Bc,typography:Wc,geometry:Uc},U1=Object.freeze(Object.defineProperty({__proto__:null,author:Rc,default:W1,description:Lc,geometry:Uc,license:Dc,name:Ic,roles:Bc,typography:Wc,version:Oc,vibe:Ac},Symbol.toStringTag,{value:"Module"})),Hc="aerospace-hud",Gc="0.1.0",Vc="Aerospace HUD — deep navy, cyan instruments, warning orange, blueprint grid.",Qc="Aerospace HUD — navy cockpit, cyan instruments, warning orange, Barlow Condensed (matches Axiom gallery).",Yc="MIT",Kc="Timur Isachenko",Jc={bg:"#0a1d3a",bg2:"#0d2347",text:"#f0f8ff",muted:"#2a7aaa",accent:"#5ec8ff",accent2:"#ff7a18",cardBg:"rgba(94,200,255,0.08)",border:"rgba(94,200,255,0.28)"},qc={headingFont:"'Barlow Condensed', system-ui, sans-serif",bodyFont:"'Barlow', system-ui, sans-serif",headingWeight:700,googleFonts:["Barlow+Condensed:wght@600;700","Barlow:wght@400;600","IBM+Plex+Mono:wght@500"]},Xc={radius:"4px",slideWidth:"1280px"},H1={name:Hc,version:Gc,extends:"default-tech",description:Vc,vibe:Qc,license:Yc,author:Kc,roles:Jc,typography:qc,geometry:Xc},G1=Object.freeze(Object.defineProperty({__proto__:null,author:Kc,default:H1,description:Vc,geometry:Xc,license:Yc,name:Hc,roles:Jc,typography:qc,version:Gc,vibe:Qc},Symbol.toStringTag,{value:"Module"})),Zc="art-deco",ed="0.1.0",nd="Art Deco investor — deep emerald, gold leaf, Cinzel display.",td="Art Deco — #0c2a24 emerald, gold #c8a24a, Cinzel (matches Meridian Club gallery).",rd="MIT",od="Timur Isachenko",ad={bg:"#0c2a24",bg2:"#113530",text:"#f5eed8",muted:"#c9bfa0",accent:"#c8a24a",accent2:"#e2c47a",cardBg:"rgba(200,162,74,0.08)",border:"rgba(200,162,74,0.35)"},id={headingFont:"'Cinzel', Georgia, serif",bodyFont:"'Cormorant Garamond', Georgia, serif",headingWeight:600,googleFonts:["Cinzel:wght@500;600;700","Cormorant+Garamond:wght@400;600"]},ld={radius:"0px",slideWidth:"1280px"},V1={name:Zc,version:ed,extends:"default-tech",description:nd,vibe:td,license:rd,author:od,roles:ad,typography:id,geometry:ld},Q1=Object.freeze(Object.defineProperty({__proto__:null,author:od,default:V1,description:nd,geometry:ld,license:rd,name:Zc,roles:ad,typography:id,version:ed,vibe:td},Symbol.toStringTag,{value:"Module"})),sd="aurora-glass",ud="0.1.0",cd="Dark aurora glassmorphism — void canvas, frosted cards, violet + cyan glow.",dd="Aurora glass — pure black void, Syne + Inter, violet #a78bfa + cyan #67e8f9 (matches NovaSpark gallery).",fd="MIT",pd="Timur Isachenko",gd={bg:"#000000",bg2:"#0a0612",text:"#ffffff",muted:"#a5a0b8",accent:"#a78bfa",accent2:"#67e8f9",cardBg:"rgba(255,255,255,0.06)",border:"rgba(255,255,255,0.12)"},hd={headingFont:"'Syne', system-ui, sans-serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:800,googleFonts:["Syne:wght@700;800","Inter:wght@400;600"]},md={radius:"16px",slideWidth:"1280px"},Y1={name:sd,version:ud,extends:"default-tech",description:cd,vibe:dd,license:fd,author:pd,roles:gd,typography:hd,geometry:md},K1=Object.freeze(Object.defineProperty({__proto__:null,author:pd,default:Y1,description:cd,geometry:md,license:fd,name:sd,roles:gd,typography:hd,version:ud,vibe:dd},Symbol.toStringTag,{value:"Module"})),vd="bauhaus",yd="0.1.0",bd="Bauhaus primary system — cream field, red/yellow/blue geometry, bold grotesk.",xd="Bauhaus — warm cream #f4f1ea, primary red #e63946 + blue #1f4ae0 (matches Primary gallery).",wd="MIT",kd="Timur Isachenko",Sd={bg:"#f4f1ea",bg2:"#ede9e0",text:"#0d0d0d",muted:"#6a655c",accent:"#e63946",accent2:"#1f4ae0",cardBg:"rgba(0,0,0,0.04)",border:"rgba(13,13,13,0.2)"},_d={headingFont:"'Archivo', system-ui, sans-serif",bodyFont:"'Space Grotesk', system-ui, sans-serif",headingWeight:800,googleFonts:["Archivo:wght@600;800","Space+Grotesk:wght@400;600"]},$d={radius:"0px",slideWidth:"1280px"},J1={name:vd,version:yd,extends:"default-tech",description:bd,vibe:xd,license:wd,author:kd,roles:Sd,typography:_d,geometry:$d},q1=Object.freeze(Object.defineProperty({__proto__:null,author:kd,default:J1,description:bd,geometry:$d,license:wd,name:vd,roles:Sd,typography:_d,version:yd,vibe:xd},Symbol.toStringTag,{value:"Module"})),Cd="blueprint",Ed="0.1.0",jd="Engineering blueprint — deep navy, cyan lines, Space Mono / Space Grotesk.",Td="Blueprint — #0a1f3d navy, cyan #00e5ff grid (matches Apsis Mission gallery).",Nd="MIT",Pd="Timur Isachenko",Fd={bg:"#0a1f3d",bg2:"#0d2548",text:"#e8f4ff",muted:"#7aa8c8",accent:"#00e5ff",accent2:"#ffffff",cardBg:"rgba(0,229,255,0.06)",border:"rgba(0,229,255,0.28)"},Md={headingFont:"'Space Grotesk', system-ui, sans-serif",bodyFont:"'Space Mono', monospace",headingWeight:700,googleFonts:["Space+Grotesk:wght@500;700","Space+Mono:wght@400;700","IBM+Plex+Mono:wght@500"]},zd={radius:"2px",slideWidth:"1280px"},X1={name:Cd,version:Ed,extends:"default-tech",description:jd,vibe:Td,license:Nd,author:Pd,roles:Fd,typography:Md,geometry:zd},Z1=Object.freeze(Object.defineProperty({__proto__:null,author:Pd,default:X1,description:jd,geometry:zd,license:Nd,name:Cd,roles:Fd,typography:Md,version:Ed,vibe:Td},Symbol.toStringTag,{value:"Module"})),Id="bold-signal",Od="1.0.0",Ld="Bold Signal — Archivo Black on dark gradient with vibrant orange card focal (frontend-slides STYLE_PRESETS).",Ad="Bold Signal — #1a1a1a dark, orange card #FF5722, Archivo Black + Space Grotesk (frontend-slides Bold Signal).",Dd="MIT",Rd="Timur Isachenko",Bd={bg:"#1a1a1a",bg2:"#2d2d2d",text:"#ffffff",muted:"#a0a0a0",accent:"#FF5722",accent2:"#FF8A65",cardBg:"#FF5722",border:"rgba(255,255,255,0.12)"},Wd={headingFont:"'Archivo Black', system-ui, sans-serif",bodyFont:"'Space Grotesk', system-ui, sans-serif",headingWeight:400,googleFonts:["Archivo+Black","Space+Grotesk:wght@400;500;600"]},Ud={radius:"16px",slideWidth:"1280px"},eb={name:Id,version:Od,extends:"default-tech",description:Ld,vibe:Ad,license:Dd,author:Rd,roles:Bd,typography:Wd,geometry:Ud},nb=Object.freeze(Object.defineProperty({__proto__:null,author:Rd,default:eb,description:Ld,geometry:Ud,license:Dd,name:Id,roles:Bd,typography:Wd,version:Od,vibe:Ad},Symbol.toStringTag,{value:"Module"})),Hd="botanical-luxe",Gd="0.1.0",Vd="Botanical luxe — deep forest green, gold leaf, serif elegance for impact reports.",Qd="Botanical luxe — forest #1d3a2f, gold #bfa55a, Cormorant + DM Sans (matches Verdant gallery).",Yd="MIT",Kd="Timur Isachenko",Jd={bg:"#1d3a2f",bg2:"#162d24",text:"#f3efe4",muted:"#6b9e7a",accent:"#bfa55a",accent2:"#4a7c59",cardBg:"rgba(191,165,90,0.08)",border:"rgba(191,165,90,0.28)"},qd={headingFont:"'Cormorant Garamond', Georgia, serif",bodyFont:"'DM Sans', system-ui, sans-serif",headingWeight:600,googleFonts:["Cormorant+Garamond:wght@500;600;700","DM+Sans:wght@400;600"]},Xd={radius:"8px",slideWidth:"1280px"},tb={name:Hd,version:Gd,extends:"default-tech",description:Vd,vibe:Qd,license:Yd,author:Kd,roles:Jd,typography:qd,geometry:Xd},rb=Object.freeze(Object.defineProperty({__proto__:null,author:Kd,default:tb,description:Vd,geometry:Xd,license:Yd,name:Hd,roles:Jd,typography:qd,version:Gd,vibe:Qd},Symbol.toStringTag,{value:"Module"})),Zd="broadsheet",ef="0.1.0",nf="Newspaper broadsheet — warm newsprint, deep ink, Pirata One masthead + Playfair.",tf="Broadsheet — #f2ece0 newsprint, ink #1a1208, Pirata One masthead (matches Daily Ledger gallery).",rf="MIT",of="Timur Isachenko",af={bg:"#f2ece0",bg2:"#e8dfc8",text:"#1a1208",muted:"#8a7560",accent:"#1a1208",accent2:"#5c4d38",cardBg:"rgba(26,18,8,0.04)",border:"rgba(26,18,8,0.18)"},lf={headingFont:"'Playfair Display', Georgia, serif",bodyFont:"'Lora', Georgia, serif",headingWeight:700,googleFonts:["Pirata+One","Playfair+Display:wght@500;700","Lora:wght@400;600"]},sf={radius:"0px",slideWidth:"1280px"},ob={name:Zd,version:ef,extends:"default-tech",description:nf,vibe:tf,license:rf,author:of,roles:af,typography:lf,geometry:sf},ab=Object.freeze(Object.defineProperty({__proto__:null,author:of,default:ob,description:nf,geometry:sf,license:rf,name:Zd,roles:af,typography:lf,version:ef,vibe:tf},Symbol.toStringTag,{value:"Module"})),uf="broadside",cf="1.0.0",df="Broadside — dark editorial canvas with fire-orange accent and massive Barlow type (frontend-slides).",ff="Broadside — ink #111111, fire orange #E85D26, cream #F0ECE5, Barlow 900 + IBM Plex Mono (frontend-slides broadside).",pf="MIT",gf="Timur Isachenko",hf={bg:"#111111",bg2:"#1A1A18",text:"#F0ECE5",muted:"#888880",accent:"#E85D26",accent2:"#F0ECE5",cardBg:"rgba(232,93,38,0.12)",border:"rgba(40,40,38,1)"},mf={headingFont:"'Barlow', system-ui, sans-serif",bodyFont:"'Barlow', system-ui, sans-serif",headingWeight:900,googleFonts:["Barlow:wght@400;700;900","IBM+Plex+Mono:wght@400;500"]},vf={radius:"0px",slideWidth:"1280px"},ib={name:uf,version:cf,extends:"default-tech",description:df,vibe:ff,license:pf,author:gf,roles:hf,typography:mf,geometry:vf},lb=Object.freeze(Object.defineProperty({__proto__:null,author:gf,default:ib,description:df,geometry:vf,license:pf,name:uf,roles:hf,typography:mf,version:cf,vibe:ff},Symbol.toStringTag,{value:"Module"})),yf="brutalist-acid",bf="0.1.0",xf="Dark acid brutalist — near-black concrete, #d6ff00 hazard lime, hard mono edges.",wf="Acid brutalist — #1c1c1c, electric lime, Space Mono + Barlow Condensed (matches MONOLITH gallery).",kf="MIT",Sf="Timur Isachenko",_f={bg:"#1c1c1c",bg2:"#2a2a2a",text:"#e8e6e1",muted:"#888888",accent:"#d6ff00",accent2:"#ffffff",cardBg:"rgba(214,255,0,0.06)",border:"rgba(214,255,0,0.35)"},$f={headingFont:"'Space Mono', monospace",bodyFont:"'Barlow Condensed', system-ui, sans-serif",headingWeight:700,googleFonts:["Space+Mono:wght@400;700","Barlow+Condensed:wght@500;700"]},Cf={radius:"0px",slideWidth:"1280px"},sb={name:yf,version:bf,extends:"default-tech",description:xf,vibe:wf,license:kf,author:Sf,roles:_f,typography:$f,geometry:Cf},ub=Object.freeze(Object.defineProperty({__proto__:null,author:Sf,default:sb,description:xf,geometry:Cf,license:kf,name:yf,roles:_f,typography:$f,version:bf,vibe:wf},Symbol.toStringTag,{value:"Module"})),Ef="brutalist-mono",jf="0.1.0",Tf="Raw brutalist theme with concrete-grey background, monospace type, hard square corners, and a single hazard-orange accent.",Nf="Raw brutalist / technical — concrete off-white bg, near-black monospace ink, hazard-orange accent, thick black hairlines, zero radius.",Pf="MIT",Ff="Timur Isachenko",Mf={bg:"#f0efe9",bg2:"#e3e1d8",text:"#0a0a0a",muted:"#57554c",accent:"#ff3600",accent2:"#0a0a0a",cardBg:"#ffffff",border:"rgba(10,10,10,0.85)"},zf={headingFont:"'IBM Plex Mono', 'Courier New', monospace",bodyFont:"'IBM Plex Mono', 'Courier New', monospace",headingWeight:700,googleFonts:["IBM+Plex+Mono:wght@400;600;700"]},If={radius:"0px",slideWidth:"1280px"},cb={name:Ef,version:jf,extends:"default-tech",description:Tf,vibe:Nf,license:Pf,author:Ff,roles:Mf,typography:zf,geometry:If},db=Object.freeze(Object.defineProperty({__proto__:null,author:Ff,default:cb,description:Tf,geometry:If,license:Pf,name:Ef,roles:Mf,typography:zf,version:jf,vibe:Nf},Symbol.toStringTag,{value:"Module"})),Of="candy-pop",Lf="0.1.0",Af="Candy pop — cream canvas, hot pink + butter yellow, soft blobs, rounded type.",Df="Candy pop — cream canvas, hot pink + jellybean blue, Fredoka + Poppins (matches Jellybean gallery).",Rf="MIT",Bf="Timur Isachenko",Wf={bg:"#fdf3e7",bg2:"#f7e8d4",text:"#1a1a2e",muted:"#7a6a80",accent:"#ff5d8f",accent2:"#2d7dd2",cardBg:"rgba(255,93,143,0.08)",border:"rgba(26,26,46,0.14)"},Uf={headingFont:"'Fredoka', system-ui, sans-serif",bodyFont:"'Poppins', system-ui, sans-serif",headingWeight:700,googleFonts:["Fredoka:wght@500;700","Poppins:wght@400;600"]},Hf={radius:"28px",slideWidth:"1280px"},fb={name:Of,version:Lf,extends:"default-tech",description:Af,vibe:Df,license:Rf,author:Bf,roles:Wf,typography:Uf,geometry:Hf},pb=Object.freeze(Object.defineProperty({__proto__:null,author:Bf,default:fb,description:Af,geometry:Hf,license:Rf,name:Of,roles:Wf,typography:Uf,version:Lf,vibe:Df},Symbol.toStringTag,{value:"Module"})),Gf="corporate",Vf="0.1.0",Qf="Formal corporate presentation theme with crisp white background and restrained navy/blue palette.",Yf="Formal corporate — crisp white, navy text, single restrained blue accent, clean sans-serif, thin rules, minimal shadow.",Kf="MIT",Jf="Timur Isachenko",qf={bg:"#ffffff",bg2:"#f8f9fc",text:"#1a2035",muted:"#6b7280",accent:"#1d4ed8",accent2:"#0369a1",cardBg:"#f1f5f9",border:"rgba(0,0,0,0.08)"},Xf={headingFont:"'Inter', system-ui, sans-serif",bodyFont:"'Source Sans 3', system-ui, sans-serif",headingWeight:700,googleFonts:["Inter:wght@400;700","Source+Sans+3:wght@400;600"]},Zf={radius:"8px",slideWidth:"1280px"},gb={name:Gf,version:Vf,extends:"default-tech",description:Qf,vibe:Yf,license:Kf,author:Jf,roles:qf,typography:Xf,geometry:Zf},hb=Object.freeze(Object.defineProperty({__proto__:null,author:Jf,default:gb,description:Qf,geometry:Zf,license:Kf,name:Gf,roles:qf,typography:Xf,version:Vf,vibe:Yf},Symbol.toStringTag,{value:"Module"})),ep="creative-mode",np="1.0.0",tp="Creative Mode — cream canvas, hard ink borders, forest/pink/orange/yellow blocks, Archivo Black (frontend-slides).",rp="Creative Mode — cream #EFE9D9, ink #0F0F0F, green #1F8A4C + pink #F06CA8, Archivo Black + Space Grotesk (frontend-slides creative-mode).",op="MIT",ap="Timur Isachenko",ip={bg:"#EFE9D9",bg2:"#E4DCC4",text:"#0F0F0F",muted:"#2A2A2A",accent:"#E85A1F",accent2:"#F06CA8",cardBg:"#F5C518",border:"rgba(15,15,15,0.95)"},lp={headingFont:"'Archivo Black', system-ui, sans-serif",bodyFont:"'Space Grotesk', system-ui, sans-serif",headingWeight:400,googleFonts:["Archivo+Black","Space+Grotesk:wght@400;600","JetBrains+Mono:wght@400;500"]},sp={radius:"0px",slideWidth:"1280px"},mb={name:ep,version:np,extends:"default-tech",description:tp,vibe:rp,license:op,author:ap,roles:ip,typography:lp,geometry:sp},vb=Object.freeze(Object.defineProperty({__proto__:null,author:ap,default:mb,description:tp,geometry:sp,license:op,name:ep,roles:ip,typography:lp,version:np,vibe:rp},Symbol.toStringTag,{value:"Module"})),up="creative-voltage",cp="1.0.0",dp="Creative Voltage — electric blue + neon yellow, Syne + Space Mono (frontend-slides STYLE_PRESETS).",fp="Creative Voltage — electric blue #0066ff, dark #1a1a2e, neon #d4ff00, Syne + Space Mono (frontend-slides Creative Voltage).",pp="MIT",gp="Timur Isachenko",hp={bg:"#0066ff",bg2:"#1a1a2e",text:"#ffffff",muted:"rgba(255,255,255,0.7)",accent:"#d4ff00",accent2:"#ffffff",cardBg:"rgba(26,26,46,0.55)",border:"rgba(212,255,0,0.45)"},mp={headingFont:"'Syne', system-ui, sans-serif",bodyFont:"'Space Mono', monospace",headingWeight:800,googleFonts:["Syne:wght@700;800","Space+Mono:wght@400;700"]},vp={radius:"0px",slideWidth:"1280px"},yb={name:up,version:cp,extends:"default-tech",description:dp,vibe:fp,license:pp,author:gp,roles:hp,typography:mp,geometry:vp},bb=Object.freeze(Object.defineProperty({__proto__:null,author:gp,default:yb,description:dp,geometry:vp,license:pp,name:up,roles:hp,typography:mp,version:cp,vibe:fp},Symbol.toStringTag,{value:"Module"})),yp="crt-terminal",bp="0.1.0",xp="CRT phosphor terminal — near-black, acid green glow, cyan accents, monospace.",wp="CRT terminal — void bg, cream type, phosphor green + cyan accents (matches RetroNet gallery).",kp="MIT",Sp="Timur Isachenko",_p={bg:"#06040a",bg2:"#1a1010",text:"#f5f0e8",muted:"#8a8578",accent:"#39ff14",accent2:"#00f5ff",cardBg:"rgba(57,255,20,0.06)",border:"rgba(57,255,20,0.28)"},$p={headingFont:"'VT323', monospace",bodyFont:"'Share Tech Mono', monospace",headingWeight:400,googleFonts:["VT323","Share+Tech+Mono","Courier+Prime"]},Cp={radius:"0px",slideWidth:"1280px"},xb={name:yp,version:bp,extends:"default-tech",description:xp,vibe:wp,license:kp,author:Sp,roles:_p,typography:$p,geometry:Cp},wb=Object.freeze(Object.defineProperty({__proto__:null,author:Sp,default:xb,description:xp,geometry:Cp,license:kp,name:yp,roles:_p,typography:$p,version:bp,vibe:wp},Symbol.toStringTag,{value:"Module"})),Ep="data-editorial",jp="0.1.0",Tp="Data editorial — white report field, navy + chart red, Source Serif + Inter.",Np="Data editorial — white/#1a1a1a, navy #2b6cb0 + signal #e63946 (matches Signalbox gallery).",Pp="MIT",Fp="Timur Isachenko",Mp={bg:"#ffffff",bg2:"#f5f5f5",text:"#1a1a1a",muted:"#616161",accent:"#2b6cb0",accent2:"#e63946",cardBg:"rgba(26,26,26,0.03)",border:"rgba(26,26,26,0.12)"},zp={headingFont:"'Source Serif 4', Georgia, serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:700,googleFonts:["Source+Serif+4:wght@600;700","Inter:wght@400;600"]},Ip={radius:"4px",slideWidth:"1280px"},kb={name:Ep,version:jp,extends:"default-tech",description:Tp,vibe:Np,license:Pp,author:Fp,roles:Mp,typography:zp,geometry:Ip},Sb=Object.freeze(Object.defineProperty({__proto__:null,author:Fp,default:kb,description:Tp,geometry:Ip,license:Pp,name:Ep,roles:Mp,typography:zp,version:jp,vibe:Np},Symbol.toStringTag,{value:"Module"})),Op="developer-dark",Lp="0.1.0",Ap="Developer dark — GitHub-night canvas, green success, blue links, JetBrains Mono.",Dp="Developer dark — #0d1117, #3fb950 + #58a6ff, JetBrains Mono + Inter (matches Forge gallery).",Rp="MIT",Bp="Timur Isachenko",Wp={bg:"#0d1117",bg2:"#161b22",text:"#e6edf3",muted:"#8b949e",accent:"#3fb950",accent2:"#58a6ff",cardBg:"rgba(48,54,61,0.55)",border:"rgba(48,54,61,0.9)"},Up={headingFont:"'Inter', system-ui, sans-serif",bodyFont:"'JetBrains Mono', monospace",headingWeight:700,googleFonts:["Inter:wght@600;700","JetBrains+Mono:wght@400;600"]},Hp={radius:"8px",slideWidth:"1280px"},_b={name:Op,version:Lp,extends:"default-tech",description:Ap,vibe:Dp,license:Rp,author:Bp,roles:Wp,typography:Up,geometry:Hp},$b=Object.freeze(Object.defineProperty({__proto__:null,author:Bp,default:_b,description:Ap,geometry:Hp,license:Rp,name:Op,roles:Wp,typography:Up,version:Lp,vibe:Dp},Symbol.toStringTag,{value:"Module"})),Gp="editorial-forest",Vp="1.0.0",Qp="Editorial Forest — Source Serif 4 on oat-cream with forest green and dusty rose (frontend-slides).",Yp="Editorial Forest — cream #efe7d4, forest #2e4a2a + dusty rose #e89cb1, Source Serif 4 + JetBrains Mono (frontend-slides editorial-forest).",Kp="MIT",Jp="Timur Isachenko",qp={bg:"#efe7d4",bg2:"#e6dcc4",text:"#1a1a17",muted:"#6a655c",accent:"#2e4a2a",accent2:"#e89cb1",cardBg:"rgba(46,74,42,0.06)",border:"rgba(26,26,23,0.16)"},Xp={headingFont:"'Source Serif 4', 'Source Serif Pro', Georgia, serif",bodyFont:"'Source Serif 4', Georgia, serif",headingWeight:500,googleFonts:["Source+Serif+4:opsz,wght@8..60,500;8..60,600","JetBrains+Mono:wght@400;500"]},Zp={radius:"4px",slideWidth:"1280px"},Cb={name:Gp,version:Vp,extends:"default-tech",description:Qp,vibe:Yp,license:Kp,author:Jp,roles:qp,typography:Xp,geometry:Zp},Eb=Object.freeze(Object.defineProperty({__proto__:null,author:Jp,default:Cb,description:Qp,geometry:Zp,license:Kp,name:Gp,roles:qp,typography:Xp,version:Vp,vibe:Yp},Symbol.toStringTag,{value:"Module"})),eg="editorial-serif",ng="0.1.0",tg="Magazine-editorial theme with warm paper background, ink-black serif text, and a single masthead-crimson accent.",rg="Print magazine editorial — warm cream paper, near-black serif ink, crimson masthead accent, thin hairline rules, square corners.",og="MIT",ag="Timur Isachenko",ig={bg:"#faf7f2",bg2:"#f2ede3",text:"#1c1a17",muted:"#5c574c",accent:"#9c1c1c",accent2:"#a67c1e",cardBg:"#f2ede3",border:"rgba(28,26,23,0.12)"},lg={headingFont:"'Playfair Display', Georgia, serif",bodyFont:"'Source Serif 4', Georgia, serif",headingWeight:700,googleFonts:["Playfair+Display:wght@700;900","Source+Serif+4:wght@400;600"]},sg={radius:"2px",slideWidth:"1280px"},jb={name:eg,version:ng,extends:"default-tech",description:tg,vibe:rg,license:og,author:ag,roles:ig,typography:lg,geometry:sg},Tb=Object.freeze(Object.defineProperty({__proto__:null,author:ag,default:jb,description:tg,geometry:sg,license:og,name:eg,roles:ig,typography:lg,version:ng,vibe:rg},Symbol.toStringTag,{value:"Module"})),ug="editorial-tri-tone",cg="1.0.0",dg="Editorial Tri-Tone — blush pink, golden butter, burgundy wine; Bricolage Grotesque + Instrument Serif (frontend-slides).",fg="Editorial Tri-Tone — pink #F2B6C6, butter #F2D86A, burgundy #7A1F35, Bricolage Grotesque + Instrument Serif (frontend-slides editorial-tri-tone).",pg="MIT",gg="Timur Isachenko",hg={bg:"#F2B6C6",bg2:"#F2D86A",text:"#7A1F35",muted:"rgba(122,31,53,0.65)",accent:"#7A1F35",accent2:"#F2D86A",cardBg:"rgba(242,216,106,0.55)",border:"rgba(122,31,53,0.35)"},mg={headingFont:"'Bricolage Grotesque', system-ui, sans-serif",bodyFont:"'Instrument Serif', Georgia, serif",headingWeight:800,googleFonts:["Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800","Instrument+Serif:ital@0;1","JetBrains+Mono:wght@400;500"]},vg={radius:"0px",slideWidth:"1280px"},Nb={name:ug,version:cg,extends:"default-tech",description:dg,vibe:fg,license:pg,author:gg,roles:hg,typography:mg,geometry:vg},Pb=Object.freeze(Object.defineProperty({__proto__:null,author:gg,default:Nb,description:dg,geometry:vg,license:pg,name:ug,roles:hg,typography:mg,version:cg,vibe:fg},Symbol.toStringTag,{value:"Module"})),yg="fintech-clean",bg="0.1.0",xg="Fintech clean — near-white, Stripe-like violet accent, mint success, Inter.",wg="Fintech clean — #fbfbfd, violet #635bff + mint #00d4b1, Inter (matches Ledgerline gallery).",kg="MIT",Sg="Timur Isachenko",_g={bg:"#fbfbfd",bg2:"#f0eeff",text:"#0a0a0a",muted:"#6b7280",accent:"#635bff",accent2:"#00d4b1",cardBg:"#ffffff",border:"rgba(99,91,255,0.18)"},$g={headingFont:"'Inter', system-ui, sans-serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:700,googleFonts:["Inter:wght@400;600;700"]},Cg={radius:"12px",slideWidth:"1280px"},Fb={name:yg,version:bg,extends:"default-tech",description:xg,vibe:wg,license:kg,author:Sg,roles:_g,typography:$g,geometry:Cg},Mb=Object.freeze(Object.defineProperty({__proto__:null,author:Sg,default:Fb,description:xg,geometry:Cg,license:kg,name:yg,roles:_g,typography:$g,version:bg,vibe:wg},Symbol.toStringTag,{value:"Module"})),Eg="ft-editorial",jg="0.1.0",Tg="Financial Times–inspired broadsheet — warm paper, ink, FT blue + signal red.",Ng="FT editorial — #f7f5f0 newsprint, Libre Baskerville + IBM Plex, FT blue + signal red (matches Meridian gallery).",Pg="MIT",Fg="Timur Isachenko",Mg={bg:"#f7f5f0",bg2:"#f2efe8",text:"#0a0a0a",muted:"#6b6560",accent:"#1a4fd8",accent2:"#c0392b",cardBg:"rgba(10,10,10,0.03)",border:"rgba(10,10,10,0.12)"},zg={headingFont:"'Libre Baskerville', Georgia, serif",bodyFont:"'IBM Plex Sans', system-ui, sans-serif",headingWeight:700,googleFonts:["Libre+Baskerville:wght@400;700","IBM+Plex+Sans:wght@400;600","IBM+Plex+Mono:wght@500"]},Ig={radius:"0px",slideWidth:"1280px"},zb={name:Eg,version:jg,extends:"default-tech",description:Tg,vibe:Ng,license:Pg,author:Fg,roles:Mg,typography:zg,geometry:Ig},Ib=Object.freeze(Object.defineProperty({__proto__:null,author:Fg,default:zb,description:Tg,geometry:Ig,license:Pg,name:Eg,roles:Mg,typography:zg,version:jg,vibe:Ng},Symbol.toStringTag,{value:"Module"})),Og="genz-bento",Lg="0.1.0",Ag="Gen-Z hard-shadow bento — hot coral, lime stickers, chunky ink borders.",Dg="Gen-Z bento — #fff9f5, coral #ff4d2e + lime #b6f542, Nunito hard shadows (matches Bounce gallery).",Rg="MIT",Bg="Timur Isachenko",Wg={bg:"#fff9f5",bg2:"#fff3ea",text:"#0f0f1a",muted:"#5c5666",accent:"#ff4d2e",accent2:"#b6f542",cardBg:"#ffffff",border:"#0f0f1a"},Ug={headingFont:"'Nunito', system-ui, sans-serif",bodyFont:"'Nunito Sans', system-ui, sans-serif",headingWeight:900,googleFonts:["Nunito:wght@700;800;900","Nunito+Sans:wght@400;600"]},Hg={radius:"18px",slideWidth:"1280px"},Ob={name:Og,version:Lg,extends:"default-tech",description:Ag,vibe:Dg,license:Rg,author:Bg,roles:Wg,typography:Ug,geometry:Hg},Lb=Object.freeze(Object.defineProperty({__proto__:null,author:Bg,default:Ob,description:Ag,geometry:Hg,license:Rg,name:Og,roles:Wg,typography:Ug,version:Lg,vibe:Dg},Symbol.toStringTag,{value:"Module"})),Gg="glassmorphism",Vg="0.1.0",Qg="Soft glassmorphism — icy lavender field, indigo + cyan accents, Plus Jakarta Sans.",Yg="Glassmorphism — #f8f9ff mist, indigo #5b6af5 + cyan #22d3ee, Plus Jakarta Sans (matches CloudPeak gallery).",Kg="MIT",Jg="Timur Isachenko",qg={bg:"#f8f9ff",bg2:"#f0f3fd",text:"#0f1333",muted:"#7880a4",accent:"#5b6af5",accent2:"#22d3ee",cardBg:"rgba(255,255,255,0.72)",border:"rgba(91,106,245,0.22)"},Xg={headingFont:"'Plus Jakarta Sans', system-ui, sans-serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:700,googleFonts:["Plus+Jakarta+Sans:wght@500;700","Inter:wght@400;600"]},Zg={radius:"20px",slideWidth:"1280px"},Ab={name:Gg,version:Vg,extends:"default-tech",description:Qg,vibe:Yg,license:Kg,author:Jg,roles:qg,typography:Xg,geometry:Zg},Db=Object.freeze(Object.defineProperty({__proto__:null,author:Jg,default:Ab,description:Qg,geometry:Zg,license:Kg,name:Gg,roles:qg,typography:Xg,version:Vg,vibe:Yg},Symbol.toStringTag,{value:"Module"})),eh="heritage-editorial",nh="0.1.0",th="Heritage editorial — warm parchment, terracotta blush, Playfair + Cormorant serif.",rh="Heritage editorial — #f4efe9 parchment, terracotta #c98b7a, Playfair Display (matches Atelier No. 9 gallery).",oh="MIT",ah="Timur Isachenko",ih={bg:"#f4efe9",bg2:"#ede6dd",text:"#16130f",muted:"#9c8b7e",accent:"#c98b7a",accent2:"#a07854",cardBg:"rgba(22,19,15,0.04)",border:"rgba(22,19,15,0.12)"},lh={headingFont:"'Playfair Display', Georgia, serif",bodyFont:"'DM Sans', system-ui, sans-serif",headingWeight:700,googleFonts:["Playfair+Display:wght@500;700","Cormorant+Garamond:wght@500;600","DM+Sans:wght@400;600"]},sh={radius:"6px",slideWidth:"1280px"},Rb={name:eh,version:nh,extends:"default-tech",description:th,vibe:rh,license:oh,author:ah,roles:ih,typography:lh,geometry:sh},Bb=Object.freeze(Object.defineProperty({__proto__:null,author:ah,default:Rb,description:th,geometry:sh,license:oh,name:eh,roles:ih,typography:lh,version:nh,vibe:rh},Symbol.toStringTag,{value:"Module"})),uh="kinetic-wrapped",ch="0.1.0",dh="Kinetic Wrapped — acid lime on black, Archivo Black, year-in-review energy.",fh="Kinetic Wrapped — black + #c8ff00 acid lime, Archivo Black (matches Pulse gallery).",ph="MIT",gh="Timur Isachenko",hh={bg:"#0a0a0a",bg2:"#0d0d0d",text:"#ffffff",muted:"#888888",accent:"#c8ff00",accent2:"#ff00cc",cardBg:"rgba(200,255,0,0.08)",border:"rgba(200,255,0,0.4)"},mh={headingFont:"'Archivo Black', system-ui, sans-serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:400,googleFonts:["Archivo+Black","Inter:wght@400;600"]},vh={radius:"0px",slideWidth:"1280px"},Wb={name:uh,version:ch,extends:"default-tech",description:dh,vibe:fh,license:ph,author:gh,roles:hh,typography:mh,geometry:vh},Ub=Object.freeze(Object.defineProperty({__proto__:null,author:gh,default:Wb,description:dh,geometry:vh,license:ph,name:uh,roles:hh,typography:mh,version:ch,vibe:fh},Symbol.toStringTag,{value:"Module"})),yh="luxury-minimalist",bh="0.1.0",xh="Luxury minimalist theme with warm off-white canvas, dark charcoal, hairline borders, and no gradients.",wh="Luxury minimalist — warm off-white canvas, dark charcoal text, near-zero decoration, generous whitespace, thin serif display, hairline borders, no gradients.",kh="MIT",Sh="Timur Isachenko",_h={bg:"#faf8f5",bg2:"#f5f2ee",text:"#1c1917",muted:"#78716c",accent:"#92400e",accent2:"#b45309",cardBg:"rgba(28,25,23,0.03)",border:"rgba(28,25,23,0.10)"},$h={headingFont:"'Cormorant Garamond', Georgia, serif",bodyFont:"'DM Sans', system-ui, sans-serif",headingWeight:600,googleFonts:["Cormorant+Garamond:wght@400;600","DM+Sans:wght@400;500"]},Ch={radius:"4px",slideWidth:"1280px"},Hb={name:yh,version:bh,extends:"default-tech",description:xh,vibe:wh,license:kh,author:Sh,roles:_h,typography:$h,geometry:Ch},Gb=Object.freeze(Object.defineProperty({__proto__:null,author:Sh,default:Hb,description:xh,geometry:Ch,license:kh,name:yh,roles:_h,typography:$h,version:bh,vibe:wh},Symbol.toStringTag,{value:"Module"})),Eh="neo-grid-bold",jh="1.0.0",Th="Neo-Grid Bold — putty ecru, ink black, electric lemon panels, Space Grotesk uppercase (frontend-slides).",Nh="Neo-Grid Bold — putty #ECECE8, lemon #E6FF3D, Space Grotesk uppercase + JetBrains Mono (frontend-slides neo-grid-bold).",Ph="MIT",Fh="Timur Isachenko",Mh={bg:"#ECECE8",bg2:"#F5F4EF",text:"#0A0A0A",muted:"#8A8A85",accent:"#E6FF3D",accent2:"#0A0A0A",cardBg:"#F5F4EF",border:"rgba(10,10,10,0.85)"},zh={headingFont:"'Space Grotesk', Helvetica Neue, Arial, sans-serif",bodyFont:"'JetBrains Mono', monospace",headingWeight:700,googleFonts:["Space+Grotesk:wght@500;700","JetBrains+Mono:wght@400;500"]},Ih={radius:"0px",slideWidth:"1280px"},Vb={name:Eh,version:jh,extends:"default-tech",description:Th,vibe:Nh,license:Ph,author:Fh,roles:Mh,typography:zh,geometry:Ih},Qb=Object.freeze(Object.defineProperty({__proto__:null,author:Fh,default:Vb,description:Th,geometry:Ih,license:Ph,name:Eh,roles:Mh,typography:zh,version:jh,vibe:Nh},Symbol.toStringTag,{value:"Module"})),Oh="neon-noir",Lh="0.1.0",Ah="Neon noir — wet asphalt night, hot magenta + electric cyan, cinematic rain.",Dh="Neon noir — #050510 night, hot pink #ff2e97 + cyan #00e5ff, Orbitron (matches Neon District gallery).",Rh="MIT",Bh="Timur Isachenko",Wh={bg:"#050510",bg2:"#0a0a1e",text:"#e8e4f0",muted:"#8884a8",accent:"#ff2e97",accent2:"#00e5ff",cardBg:"rgba(255,46,151,0.07)",border:"rgba(0,229,255,0.22)"},Uh={headingFont:"'Orbitron', system-ui, sans-serif",bodyFont:"'Share Tech Mono', monospace",headingWeight:700,googleFonts:["Orbitron:wght@600;700","Share+Tech+Mono"]},Hh={radius:"10px",slideWidth:"1280px"},Yb={name:Oh,version:Lh,extends:"default-tech",description:Ah,vibe:Dh,license:Rh,author:Bh,roles:Wh,typography:Uh,geometry:Hh},Kb=Object.freeze(Object.defineProperty({__proto__:null,author:Bh,default:Yb,description:Ah,geometry:Hh,license:Rh,name:Oh,roles:Wh,typography:Uh,version:Lh,vibe:Dh},Symbol.toStringTag,{value:"Module"})),Gh="notebook-tabs",Vh="1.0.0",Qh="Notebook Tabs — cream paper card on dark with mint/lavender/pink tabs, Bodoni Moda (frontend-slides STYLE_PRESETS).",Yh="Notebook Tabs — page #f8f6f1 on outer #2d2d2d, Bodoni Moda + DM Sans, pastel tabs (frontend-slides Notebook Tabs).",Kh="MIT",Jh="Timur Isachenko",qh={bg:"#f8f6f1",bg2:"#efece4",text:"#1a1a1a",muted:"#5c574c",accent:"#98d4bb",accent2:"#c7b8ea",cardBg:"#ffffff",border:"rgba(26,26,26,0.12)"},Xh={headingFont:"'Bodoni Moda', Georgia, serif",bodyFont:"'DM Sans', system-ui, sans-serif",headingWeight:700,googleFonts:["Bodoni+Moda:opsz,wght@6..96,400;6..96,700","DM+Sans:wght@400;500"]},Zh={radius:"12px",slideWidth:"1280px"},Jb={name:Gh,version:Vh,extends:"default-tech",description:Qh,vibe:Yh,license:Kh,author:Jh,roles:qh,typography:Xh,geometry:Zh},qb=Object.freeze(Object.defineProperty({__proto__:null,author:Jh,default:Jb,description:Qh,geometry:Zh,license:Kh,name:Gh,roles:qh,typography:Xh,version:Vh,vibe:Yh},Symbol.toStringTag,{value:"Module"})),em="pastel-dreamy",nm="0.1.0",tm="Soft pastel theme with lavender-blush background, deep plum text, and a blush/periwinkle accent pair.",rm="Soft pastel dreamy — lavender-blush bg, deep plum text for readability, blush-pink + periwinkle accent pair, generously rounded, gentle.",om="MIT",am="Timur Isachenko",im={bg:"#fdf6fb",bg2:"#f5ecf9",text:"#3a2e4d",muted:"#6b5d82",accent:"#e893c2",accent2:"#8ab4f8",cardBg:"#f5ecf9",border:"rgba(58,46,77,0.10)"},lm={headingFont:"'Quicksand', system-ui, sans-serif",bodyFont:"'Mulish', system-ui, sans-serif",headingWeight:700,googleFonts:["Quicksand:wght@500;700","Mulish:wght@400;600"]},sm={radius:"28px",slideWidth:"1280px"},Xb={name:em,version:nm,extends:"default-tech",description:tm,vibe:rm,license:om,author:am,roles:im,typography:lm,geometry:sm},Zb=Object.freeze(Object.defineProperty({__proto__:null,author:am,default:Xb,description:tm,geometry:sm,license:om,name:em,roles:im,typography:lm,version:nm,vibe:rm},Symbol.toStringTag,{value:"Module"})),um="pin-and-paper",cm="1.0.0",dm="Pin & Paper — yellow legal-pad field with cobalt ink, Space Grotesk + Caveat (frontend-slides).",fm="Pin & Paper — legal pad #EFE56A, cobalt #1F3A8A, Space Grotesk + Caveat (frontend-slides pin-and-paper).",pm="MIT",gm="Timur Isachenko",hm={bg:"#EFE56A",bg2:"#F5ECA0",text:"#1F3A8A",muted:"#3457C4",accent:"#C2342B",accent2:"#D8702A",cardBg:"#F8F1D6",border:"rgba(31,58,138,0.22)"},mm={headingFont:"'Space Grotesk', Helvetica Neue, Arial, sans-serif",bodyFont:"'Space Grotesk', system-ui, sans-serif",headingWeight:700,googleFonts:["Space+Grotesk:wght@500;700","Caveat:wght@500;700","DM+Mono:wght@400;500"]},vm={radius:"8px",slideWidth:"1280px"},ex={name:um,version:cm,extends:"default-tech",description:dm,vibe:fm,license:pm,author:gm,roles:hm,typography:mm,geometry:vm},nx=Object.freeze(Object.defineProperty({__proto__:null,author:gm,default:ex,description:dm,geometry:vm,license:pm,name:um,roles:hm,typography:mm,version:cm,vibe:fm},Symbol.toStringTag,{value:"Module"})),ym="playful",bm="0.1.0",xm="Playful creative-agency theme with bold coral and lime accents, rounded corners, and sticker-style energy.",wm="Playful creative agency — bright warm white, bold coral + lime accent pair, rounded everything, big type, sticker-style shadows.",km="MIT",Sm="Timur Isachenko",_m={bg:"#fffbf0",bg2:"#fff9e6",text:"#1a1a2e",muted:"#6b6b8a",accent:"#ff4757",accent2:"#2ed573",cardBg:"rgba(255,71,87,0.06)",border:"rgba(255,71,87,0.15)"},$m={headingFont:"'Nunito', system-ui, sans-serif",bodyFont:"'Nunito', system-ui, sans-serif",headingWeight:800,googleFonts:["Nunito:wght@400;700;800"]},Cm={radius:"24px",slideWidth:"1280px"},tx={name:ym,version:bm,extends:"default-tech",description:xm,vibe:wm,license:km,author:Sm,roles:_m,typography:$m,geometry:Cm},rx=Object.freeze(Object.defineProperty({__proto__:null,author:Sm,default:tx,description:xm,geometry:Cm,license:km,name:ym,roles:_m,typography:$m,version:bm,vibe:wm},Symbol.toStringTag,{value:"Module"})),Em="retro-arcade",jm="0.1.0",Tm="Retro 80s arcade theme with deep purple-black background, magenta and cyan neon accents, and pixel display fonts.",Nm="Retro 80s arcade — deep purple-black bg, magenta + electric cyan neon, glow text-shadow, pixel display font, scanline feel.",Pm="MIT",Fm="Timur Isachenko",Mm={bg:"#0d0015",bg2:"#150025",text:"#e0e0ff",muted:"#9090cc",accent:"#ff00ff",accent2:"#00ffff",cardBg:"rgba(255,0,255,0.08)",border:"rgba(0,255,255,0.20)"},zm={headingFont:"'Orbitron', system-ui, sans-serif",bodyFont:"'Share Tech Mono', monospace",headingWeight:700,googleFonts:["Orbitron:wght@400;700","Share+Tech+Mono"]},Im={radius:"0px",slideWidth:"1280px"},ox={name:Em,version:jm,extends:"default-tech",description:Tm,vibe:Nm,license:Pm,author:Fm,roles:Mm,typography:zm,geometry:Im},ax=Object.freeze(Object.defineProperty({__proto__:null,author:Fm,default:ox,description:Tm,geometry:Im,license:Pm,name:Em,roles:Mm,typography:zm,version:jm,vibe:Nm},Symbol.toStringTag,{value:"Module"})),Om="risograph-zine",Lm="0.1.0",Am="Risograph zine — warm paper, misregistered ink, magenta + teal print shop energy.",Dm="Risograph zine — kraft #f3ecdd, red #ff4f4f + blue #2b3aff overprint (matches Inkwell gallery).",Rm="MIT",Bm="Timur Isachenko",Wm={bg:"#f3ecdd",bg2:"#e8dfc8",text:"#1a1209",muted:"#7a6a52",accent:"#ff4f4f",accent2:"#2b3aff",cardBg:"rgba(255,79,79,0.06)",border:"rgba(26,18,9,0.18)"},Um={headingFont:"'Archivo Black', system-ui, sans-serif",bodyFont:"'Space Mono', monospace",headingWeight:400,googleFonts:["Archivo+Black","Space+Mono:wght@400;700"]},Hm={radius:"2px",slideWidth:"1280px"},ix={name:Om,version:Lm,extends:"default-tech",description:Am,vibe:Dm,license:Rm,author:Bm,roles:Wm,typography:Um,geometry:Hm},lx=Object.freeze(Object.defineProperty({__proto__:null,author:Bm,default:ix,description:Am,geometry:Hm,license:Rm,name:Om,roles:Wm,typography:Um,version:Lm,vibe:Dm},Symbol.toStringTag,{value:"Module"})),Gm="scandinavian",Vm="0.1.0",Qm="Scandinavian hygge — warm linen, sage green, soft clay, Fraunces + Work Sans.",Ym="Scandinavian — #efe9df linen, sage #9caf88 + clay #c9826b (matches Hygge gallery).",Km="MIT",Jm="Timur Isachenko",qm={bg:"#efe9df",bg2:"#e6ddd1",text:"#2b2926",muted:"#7a7470",accent:"#9caf88",accent2:"#c9826b",cardBg:"rgba(43,41,38,0.04)",border:"rgba(43,41,38,0.1)"},Xm={headingFont:"'Fraunces', Georgia, serif",bodyFont:"'Work Sans', system-ui, sans-serif",headingWeight:600,googleFonts:["Fraunces:wght@500;600;700","Work+Sans:wght@400;600"]},Zm={radius:"16px",slideWidth:"1280px"},sx={name:Gm,version:Vm,extends:"default-tech",description:Qm,vibe:Ym,license:Km,author:Jm,roles:qm,typography:Xm,geometry:Zm},ux=Object.freeze(Object.defineProperty({__proto__:null,author:Jm,default:sx,description:Qm,geometry:Zm,license:Km,name:Gm,roles:qm,typography:Xm,version:Vm,vibe:Ym},Symbol.toStringTag,{value:"Module"})),e0="signal",n0="1.0.0",t0="Signal — dual cream/navy editorial with antique gold accent, Source Serif 4 (frontend-slides).",r0="Signal — cream #F0ECE3 / navy #1C2644, gold #C8A870, Source Serif 4 + DM Sans (frontend-slides signal).",o0="MIT",a0="Timur Isachenko",i0={bg:"#F0ECE3",bg2:"#E6E0D4",text:"#1A2030",muted:"#5A6270",accent:"#C8A870",accent2:"#1C2644",cardBg:"rgba(28,38,68,0.05)",border:"rgba(202,196,180,1)"},l0={headingFont:"'Source Serif 4', Georgia, serif",bodyFont:"'DM Sans', system-ui, sans-serif",headingWeight:600,googleFonts:["Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400","DM+Sans:wght@400;500","IBM+Plex+Mono:wght@400;500"]},s0={radius:"2px",slideWidth:"1280px"},cx={name:e0,version:n0,extends:"default-tech",description:t0,vibe:r0,license:o0,author:a0,roles:i0,typography:l0,geometry:s0},dx=Object.freeze(Object.defineProperty({__proto__:null,author:a0,default:cx,description:t0,geometry:s0,license:o0,name:e0,roles:i0,typography:l0,version:n0,vibe:r0},Symbol.toStringTag,{value:"Module"})),u0="soft-editorial",c0="1.0.0",d0="Soft Editorial — Cormorant Garamond on warm cream paper with sage, blush, lemon, and lilac accents (frontend-slides / beautiful-html-templates).",f0="Soft Editorial — paper #F2EEDF, ink #2A241B, sage #B7C7A8 + blush #E1A4C2, Cormorant Garamond + Work Sans (frontend-slides soft-editorial).",p0="MIT",g0="Timur Isachenko",h0={bg:"#F2EEDF",bg2:"#ECE6D2",text:"#2A241B",muted:"#5C5345",accent:"#B7C7A8",accent2:"#E1A4C2",cardBg:"rgba(255,255,255,0.55)",border:"rgba(42,36,27,0.18)"},m0={headingFont:"'Cormorant Garamond', Garamond, Georgia, serif",bodyFont:"'Work Sans', system-ui, sans-serif",headingWeight:500,googleFonts:["Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600","Work+Sans:wght@400;500;600"]},v0={radius:"28px",slideWidth:"1280px"},fx={name:u0,version:c0,extends:"default-tech",description:d0,vibe:f0,license:p0,author:g0,roles:h0,typography:m0,geometry:v0},px=Object.freeze(Object.defineProperty({__proto__:null,author:g0,default:fx,description:d0,geometry:v0,license:p0,name:u0,roles:h0,typography:m0,version:c0,vibe:f0},Symbol.toStringTag,{value:"Module"})),y0="swiss-typographic",b0="0.1.0",x0="Swiss International Typographic Style — white grid, signal red, Helvetica-like grotesk.",w0="Swiss typographic — pure white, Inter grotesk, signal red, zero radius, modular grid (matches Grid Systems gallery).",k0="MIT",S0="Timur Isachenko",_0={bg:"#ffffff",bg2:"#f5f5f5",text:"#0a0a0a",muted:"#636363",accent:"#e2231a",accent2:"#0a0a0a",cardBg:"rgba(0,0,0,0.03)",border:"rgba(0,0,0,0.12)"},$0={headingFont:"'Inter', Helvetica, Arial, sans-serif",bodyFont:"'Inter', Helvetica, Arial, sans-serif",headingWeight:800,googleFonts:["Inter:wght@400;600;800"]},C0={radius:"0px",slideWidth:"1280px"},gx={name:y0,version:b0,extends:"default-tech",description:x0,vibe:w0,license:k0,author:S0,roles:_0,typography:$0,geometry:C0},hx=Object.freeze(Object.defineProperty({__proto__:null,author:S0,default:gx,description:x0,geometry:C0,license:k0,name:y0,roles:_0,typography:$0,version:b0,vibe:w0},Symbol.toStringTag,{value:"Module"})),E0="vaporwave",j0="0.1.0",T0="Vaporwave — purple dusk, sunset gradient, chrome teal, nostalgic mall energy.",N0="Vaporwave — #1a0533 dusk, #ff6ad5 pink + #5ce1ff teal, Monoton (matches Mallsoft gallery).",P0="MIT",F0="Timur Isachenko",M0={bg:"#1a0533",bg2:"#2d1060",text:"#fff0f9",muted:"#c4a8ff",accent:"#ff6ad5",accent2:"#5ce1ff",cardBg:"rgba(255,106,213,0.08)",border:"rgba(92,225,255,0.28)"},z0={headingFont:"'Monoton', display, cursive",bodyFont:"'Space Mono', monospace",headingWeight:400,googleFonts:["Monoton","Space+Mono:wght@400;700","VT323"]},I0={radius:"6px",slideWidth:"1280px"},mx={name:E0,version:j0,extends:"default-tech",description:T0,vibe:N0,license:P0,author:F0,roles:M0,typography:z0,geometry:I0},vx=Object.freeze(Object.defineProperty({__proto__:null,author:F0,default:mx,description:T0,geometry:I0,license:P0,name:E0,roles:M0,typography:z0,version:j0,vibe:N0},Symbol.toStringTag,{value:"Module"})),O0="vellum",L0="1.0.0",A0="Vellum — deep periwinkle field with chartreuse italic Cormorant type (frontend-slides).",D0="Vellum — periwinkle #2A3870, chartreuse #E8D85C, italic Cormorant Garamond + DM Sans (frontend-slides vellum).",R0="MIT",B0="Timur Isachenko",W0={bg:"#2A3870",bg2:"#1F2858",text:"#E8D85C",muted:"rgba(232,216,92,0.62)",accent:"#E8D85C",accent2:"#3A7878",cardBg:"rgba(232,216,92,0.08)",border:"rgba(232,216,92,0.20)"},U0={headingFont:"'Cormorant Garamond', Georgia, serif",bodyFont:"'DM Sans', system-ui, sans-serif",headingWeight:400,googleFonts:["Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500","DM+Sans:wght@400;500","Courier+Prime:wght@400"]},H0={radius:"0px",slideWidth:"1280px"},yx={name:O0,version:L0,extends:"default-tech",description:A0,vibe:D0,license:R0,author:B0,roles:W0,typography:U0,geometry:H0},bx=Object.freeze(Object.defineProperty({__proto__:null,author:B0,default:yx,description:A0,geometry:H0,license:R0,name:O0,roles:W0,typography:U0,version:L0,vibe:D0},Symbol.toStringTag,{value:"Module"})),G0="y2k-aero",V0="0.1.0",Q0="Y2K aero — icy gradients, chrome cyan, soft bubbles, futuristic optimism.",Y0="Y2K aero — icy #e0f7ff, sky #38bdf8 + lime #a3e635, Nunito (matches BubbleFlow gallery).",K0="MIT",J0="Timur Isachenko",q0={bg:"#e0f7ff",bg2:"#bae6fd",text:"#0c4a6e",muted:"#0369a1",accent:"#38bdf8",accent2:"#a3e635",cardBg:"rgba(255,255,255,0.72)",border:"rgba(14,165,233,0.28)"},X0={headingFont:"'Nunito', system-ui, sans-serif",bodyFont:"'Nunito Sans', system-ui, sans-serif",headingWeight:800,googleFonts:["Nunito:wght@700;800","Nunito+Sans:wght@400;600"]},Z0={radius:"32px",slideWidth:"1280px"},xx={name:G0,version:V0,extends:"default-tech",description:Q0,vibe:Y0,license:K0,author:J0,roles:q0,typography:X0,geometry:Z0},wx=Object.freeze(Object.defineProperty({__proto__:null,author:J0,default:xx,description:Q0,geometry:Z0,license:K0,name:G0,roles:q0,typography:X0,version:V0,vibe:Y0},Symbol.toStringTag,{value:"Module"})),kx={bg:"#0e0e12",bg2:"#16161d",text:"#f4f4f5",muted:"#a1a1aa",accent:"#7c3aed",accent2:"#22d3ee",cardBg:"rgba(255,255,255,0.04)",border:"rgba(255,255,255,0.08)"},Sx={headingFont:"'Montserrat', system-ui, sans-serif",bodyFont:"'Open Sans', system-ui, sans-serif",headingWeight:800,googleFonts:["Montserrat:wght@700;800","Open+Sans:wght@400;600"]},_x={radius:"18px",slideWidth:"1280px"},$x={...Object.assign({"../../../core/themes/claude/theme.json":B1,"../../../core/themes/default-tech/theme.json":U1}),...Object.assign({"../../../themes/aerospace-hud/theme.json":G1,"../../../themes/art-deco/theme.json":Q1,"../../../themes/aurora-glass/theme.json":K1,"../../../themes/bauhaus/theme.json":q1,"../../../themes/blueprint/theme.json":Z1,"../../../themes/bold-signal/theme.json":nb,"../../../themes/botanical-luxe/theme.json":rb,"../../../themes/broadsheet/theme.json":ab,"../../../themes/broadside/theme.json":lb,"../../../themes/brutalist-acid/theme.json":ub,"../../../themes/brutalist-mono/theme.json":db,"../../../themes/candy-pop/theme.json":pb,"../../../themes/corporate/theme.json":hb,"../../../themes/creative-mode/theme.json":vb,"../../../themes/creative-voltage/theme.json":bb,"../../../themes/crt-terminal/theme.json":wb,"../../../themes/data-editorial/theme.json":Sb,"../../../themes/developer-dark/theme.json":$b,"../../../themes/editorial-forest/theme.json":Eb,"../../../themes/editorial-serif/theme.json":Tb,"../../../themes/editorial-tri-tone/theme.json":Pb,"../../../themes/fintech-clean/theme.json":Mb,"../../../themes/ft-editorial/theme.json":Ib,"../../../themes/genz-bento/theme.json":Lb,"../../../themes/glassmorphism/theme.json":Db,"../../../themes/heritage-editorial/theme.json":Bb,"../../../themes/kinetic-wrapped/theme.json":Ub,"../../../themes/luxury-minimalist/theme.json":Gb,"../../../themes/neo-grid-bold/theme.json":Qb,"../../../themes/neon-noir/theme.json":Kb,"../../../themes/notebook-tabs/theme.json":qb,"../../../themes/pastel-dreamy/theme.json":Zb,"../../../themes/pin-and-paper/theme.json":nx,"../../../themes/playful/theme.json":rx,"../../../themes/retro-arcade/theme.json":ax,"../../../themes/risograph-zine/theme.json":lx,"../../../themes/scandinavian/theme.json":ux,"../../../themes/signal/theme.json":dx,"../../../themes/soft-editorial/theme.json":px,"../../../themes/swiss-typographic/theme.json":hx,"../../../themes/vaporwave/theme.json":vx,"../../../themes/vellum/theme.json":bx,"../../../themes/y2k-aero/theme.json":wx})},co=new Map;for(const e of Object.values($x)){const n="default"in e?e.default:e;n!=null&&n.name&&co.set(n.name,n)}function ev(){return[...co.keys()].sort()}function Gi(e){const n=[];let t=co.has(e)?e:"default-tech";const r=new Set;for(;t&&!r.has(t);){r.add(t);const s=co.get(t);if(!s)break;n.unshift(s),t=s.extends}const o={...kx},a={...Sx},i={..._x};for(const s of n)Object.assign(o,s.roles??{}),Object.assign(a,s.typography??{}),Object.assign(i,s.geometry??{});const l=n[n.length-1]??{name:"default-tech",version:"0.0.0"};return{name:l.name,version:l.version,manifest:l,palette:o,typography:a,geometry:i}}const Cx=`<section class="slide title-slide closing-slide">
  {{#eyebrow}}<span class="eyebrow">{{eyebrow}}</span>{{/eyebrow}}
  <h1>{{heading}}</h1>
  {{#lead}}<p class="lead">{{lead}}</p>{{/lead}}
  {{#cta}}<a class="btn" href="{{href}}"><i class="fa-solid fa-arrow-right"></i> {{label}}</a>{{/cta}}
</section>
`,Ex=`<section class="slide comparison-slide">
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
`,jx=`<section class="slide">
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
`,Tx=`<section class="slide">
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
`,Nx=`<section class="slide image-hero-slide">
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
`,Px=`<section class="slide quote-slide">
  <p class="quote">{{quote}}</p>
  {{#by}}<p class="quote-by">— {{by}}</p>{{/by}}
</section>
`,Fx=`<section class="slide section-slide">
  {{#number}}<div class="section-number">{{number}}</div>{{/number}}
  <h2>{{heading}}</h2>
  {{#lead}}<p class="lead">{{lead}}</p>{{/lead}}
</section>
`,Mx=`<section class="slide">
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
`,zx=`<section class="slide">
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
`,Ix=`<section class="slide title-slide">
  {{#eyebrow}}<span class="eyebrow">{{eyebrow}}</span>{{/eyebrow}}
  <h1>{{heading}}</h1>
  {{#lead}}<p class="lead">{{lead}}</p>{{/lead}}
</section>
`,Ox=`<section class="slide">
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
 */var Lx=Object.prototype.toString,pt=Array.isArray||function(n){return Lx.call(n)==="[object Array]"};function Vi(e){return typeof e=="function"}function Ax(e){return pt(e)?"array":typeof e}function ra(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function ls(e,n){return e!=null&&typeof e=="object"&&n in e}function Dx(e,n){return e!=null&&typeof e!="object"&&e.hasOwnProperty&&e.hasOwnProperty(n)}var Rx=RegExp.prototype.test;function Bx(e,n){return Rx.call(e,n)}var Wx=/\S/;function Ux(e){return!Bx(Wx,e)}var Hx={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};function Gx(e){return String(e).replace(/[&<>"'`=\/]/g,function(t){return Hx[t]})}var Vx=/\s*/,Qx=/\s+/,ss=/\s*=/,Yx=/\s*\}/,Kx=/#|\^|\/|>|\{|&|=|!/;function Jx(e,n){if(!e)return[];var t=!1,r=[],o=[],a=[],i=!1,l=!1,s="",u=0;function f(){if(i&&!l)for(;a.length;)delete o[a.pop()];else a=[];i=!1,l=!1}var g,m,y;function S(C){if(typeof C=="string"&&(C=C.split(Qx,2)),!pt(C)||C.length!==2)throw new Error("Invalid tags: "+C);g=new RegExp(ra(C[0])+"\\s*"),m=new RegExp("\\s*"+ra(C[1])),y=new RegExp("\\s*"+ra("}"+C[1]))}S(n||ve.tags);for(var x=new ir(e),j,p,c,h,b,v;!x.eos();){if(j=x.pos,c=x.scanUntil(g),c)for(var w=0,E=c.length;w<E;++w)h=c.charAt(w),Ux(h)?(a.push(o.length),s+=h):(l=!0,t=!0,s+=" "),o.push(["text",h,j,j+1]),j+=1,h===`
`&&(f(),s="",u=0,t=!1);if(!x.scan(g))break;if(i=!0,p=x.scan(Kx)||"name",x.scan(Vx),p==="="?(c=x.scanUntil(ss),x.scan(ss),x.scanUntil(m)):p==="{"?(c=x.scanUntil(y),x.scan(Yx),x.scanUntil(m),p="&"):c=x.scanUntil(m),!x.scan(m))throw new Error("Unclosed tag at "+x.pos);if(p==">"?b=[p,c,j,x.pos,s,u,t]:b=[p,c,j,x.pos],u++,o.push(b),p==="#"||p==="^")r.push(b);else if(p==="/"){if(v=r.pop(),!v)throw new Error('Unopened section "'+c+'" at '+j);if(v[1]!==c)throw new Error('Unclosed section "'+v[1]+'" at '+j)}else p==="name"||p==="{"||p==="&"?l=!0:p==="="&&S(c)}if(f(),v=r.pop(),v)throw new Error('Unclosed section "'+v[1]+'" at '+x.pos);return Xx(qx(o))}function qx(e){for(var n=[],t,r,o=0,a=e.length;o<a;++o)t=e[o],t&&(t[0]==="text"&&r&&r[0]==="text"?(r[1]+=t[1],r[3]=t[3]):(n.push(t),r=t));return n}function Xx(e){for(var n=[],t=n,r=[],o,a,i=0,l=e.length;i<l;++i)switch(o=e[i],o[0]){case"#":case"^":t.push(o),r.push(o),t=o[4]=[];break;case"/":a=r.pop(),a[5]=o[2],t=r.length>0?r[r.length-1][4]:n;break;default:t.push(o)}return n}function ir(e){this.string=e,this.tail=e,this.pos=0}ir.prototype.eos=function(){return this.tail===""};ir.prototype.scan=function(n){var t=this.tail.match(n);if(!t||t.index!==0)return"";var r=t[0];return this.tail=this.tail.substring(r.length),this.pos+=r.length,r};ir.prototype.scanUntil=function(n){var t=this.tail.search(n),r;switch(t){case-1:r=this.tail,this.tail="";break;case 0:r="";break;default:r=this.tail.substring(0,t),this.tail=this.tail.substring(t)}return this.pos+=r.length,r};function ut(e,n){this.view=e,this.cache={".":this.view},this.parent=n}ut.prototype.push=function(n){return new ut(n,this)};ut.prototype.lookup=function(n){var t=this.cache,r;if(t.hasOwnProperty(n))r=t[n];else{for(var o=this,a,i,l,s=!1;o;){if(n.indexOf(".")>0)for(a=o.view,i=n.split("."),l=0;a!=null&&l<i.length;)l===i.length-1&&(s=ls(a,i[l])||Dx(a,i[l])),a=a[i[l++]];else a=o.view[n],s=ls(o.view,n);if(s){r=a;break}o=o.parent}t[n]=r}return Vi(r)&&(r=r.call(this.view)),r};function de(){this.templateCache={_cache:{},set:function(n,t){this._cache[n]=t},get:function(n){return this._cache[n]},clear:function(){this._cache={}}}}de.prototype.clearCache=function(){typeof this.templateCache<"u"&&this.templateCache.clear()};de.prototype.parse=function(n,t){var r=this.templateCache,o=n+":"+(t||ve.tags).join(":"),a=typeof r<"u",i=a?r.get(o):void 0;return i==null&&(i=Jx(n,t),a&&r.set(o,i)),i};de.prototype.render=function(n,t,r,o){var a=this.getConfigTags(o),i=this.parse(n,a),l=t instanceof ut?t:new ut(t,void 0);return this.renderTokens(i,l,r,n,o)};de.prototype.renderTokens=function(n,t,r,o,a){for(var i="",l,s,u,f=0,g=n.length;f<g;++f)u=void 0,l=n[f],s=l[0],s==="#"?u=this.renderSection(l,t,r,o,a):s==="^"?u=this.renderInverted(l,t,r,o,a):s===">"?u=this.renderPartial(l,t,r,a):s==="&"?u=this.unescapedValue(l,t):s==="name"?u=this.escapedValue(l,t,a):s==="text"&&(u=this.rawValue(l)),u!==void 0&&(i+=u);return i};de.prototype.renderSection=function(n,t,r,o,a){var i=this,l="",s=t.lookup(n[1]);function u(m){return i.render(m,t,r,a)}if(s){if(pt(s))for(var f=0,g=s.length;f<g;++f)l+=this.renderTokens(n[4],t.push(s[f]),r,o,a);else if(typeof s=="object"||typeof s=="string"||typeof s=="number")l+=this.renderTokens(n[4],t.push(s),r,o,a);else if(Vi(s)){if(typeof o!="string")throw new Error("Cannot use higher-order sections without the original template");s=s.call(t.view,o.slice(n[3],n[5]),u),s!=null&&(l+=s)}else l+=this.renderTokens(n[4],t,r,o,a);return l}};de.prototype.renderInverted=function(n,t,r,o,a){var i=t.lookup(n[1]);if(!i||pt(i)&&i.length===0)return this.renderTokens(n[4],t,r,o,a)};de.prototype.indentPartial=function(n,t,r){for(var o=t.replace(/[^ \t]/g,""),a=n.split(`
`),i=0;i<a.length;i++)a[i].length&&(i>0||!r)&&(a[i]=o+a[i]);return a.join(`
`)};de.prototype.renderPartial=function(n,t,r,o){if(r){var a=this.getConfigTags(o),i=Vi(r)?r(n[1]):r[n[1]];if(i!=null){var l=n[6],s=n[5],u=n[4],f=i;s==0&&u&&(f=this.indentPartial(i,u,l));var g=this.parse(f,a);return this.renderTokens(g,t,r,f,o)}}};de.prototype.unescapedValue=function(n,t){var r=t.lookup(n[1]);if(r!=null)return r};de.prototype.escapedValue=function(n,t,r){var o=this.getConfigEscape(r)||ve.escape,a=t.lookup(n[1]);if(a!=null)return typeof a=="number"&&o===ve.escape?String(a):o(a)};de.prototype.rawValue=function(n){return n[1]};de.prototype.getConfigTags=function(n){return pt(n)?n:n&&typeof n=="object"?n.tags:void 0};de.prototype.getConfigEscape=function(n){if(n&&typeof n=="object"&&!pt(n))return n.escape};var ve={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(e){er.templateCache=e},get templateCache(){return er.templateCache}},er=new de;ve.clearCache=function(){return er.clearCache()};ve.parse=function(n,t){return er.parse(n,t)};ve.render=function(n,t,r,o){if(typeof n!="string")throw new TypeError('Invalid template! Template should be a "string" but "'+Ax(n)+'" was given as the first argument for mustache#render(template, view, partials)');return er.render(n,t,r,o)};ve.escape=Gx;ve.Scanner=ir;ve.Context=ut;ve.Writer=de;const Zx=`/* presentation-md base stylesheet.
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


/* ── glass-mist (glassmorphism) ── */
.deck[data-surface="glass-mist"] .slide {
  --slide-bg: radial-gradient(ellipse 90% 70% at 10% 0%, color-mix(in srgb, var(--accent) 12%, var(--bg)), var(--bg));
  border: 1px solid color-mix(in srgb, var(--accent) 22%, transparent);
  box-shadow: 0 24px 60px rgba(15, 19, 51, 0.08);
}
.deck[data-surface="glass-mist"] .slide::after {
  width: 320px;
  height: 320px;
  right: -100px;
  top: -80px;
  border-radius: 50%;
  background: radial-gradient(circle, color-mix(in srgb, var(--accent2) 28%, transparent), transparent 70%);
  filter: blur(18px);
}
.deck[data-surface="glass-mist"] .card {
  backdrop-filter: blur(10px);
  background: color-mix(in srgb, var(--card-bg) 85%, transparent);
  border: 1px solid rgba(255,255,255,0.65);
  box-shadow: 0 8px 28px rgba(15, 19, 51, 0.06);
}

/* ── newsprint-masthead (broadsheet) ── */
.deck[data-surface="newsprint-masthead"] .slide {
  --slide-bg: var(--bg);
  border-radius: 0;
  border: 1px solid color-mix(in srgb, var(--text) 25%, transparent);
  box-shadow: 0 12px 36px rgba(26, 18, 8, 0.1);
}
.deck[data-surface="newsprint-masthead"] .slide::before {
  left: 0;
  right: 0;
  top: 0;
  height: 36px;
  background: var(--text);
}
.deck[data-surface="newsprint-masthead"] .slide::after {
  left: 64px;
  right: 64px;
  top: auto;
  bottom: 48px;
  height: 2px;
  width: auto;
  background: var(--text);
  filter: none;
}
.deck[data-surface="newsprint-masthead"] .eyebrow {
  color: var(--muted);
  letter-spacing: 0.18em;
}



/* ── soft-editorial-paper (soft-editorial) ── */
.deck[data-surface="soft-editorial-paper"] .slide {
  --slide-bg: radial-gradient(ellipse 80% 60% at 100% 0%, color-mix(in srgb, var(--accent) 18%, var(--bg)), var(--bg));
  border-radius: 28px;
  box-shadow: 0 18px 48px rgba(42, 36, 27, 0.1);
}
.deck[data-surface="soft-editorial-paper"] .slide::after {
  width: 160px;
  height: 160px;
  right: 40px;
  top: 36px;
  border-radius: 28px;
  background: color-mix(in srgb, var(--accent2) 55%, transparent);
  filter: none;
  opacity: 0.75;
}
.deck[data-surface="soft-editorial-paper"] .card {
  background: rgba(255,255,255,0.55);
  border-radius: 24px;
  border: 1px solid color-mix(in srgb, var(--text) 12%, transparent);
}
.deck[data-surface="soft-editorial-paper"] .slide h1 {
  font-style: italic;
  font-weight: 500;
}

/* ── editorial-forest-paper (editorial-forest) ── */
.deck[data-surface="editorial-forest-paper"] .slide {
  --slide-bg: var(--bg);
  border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);
  box-shadow: 0 16px 40px rgba(26, 26, 23, 0.08);
}
.deck[data-surface="editorial-forest-paper"] .slide::before {
  left: 64px;
  right: 64px;
  top: 48px;
  height: 2px;
  background: var(--accent);
}
.deck[data-surface="editorial-forest-paper"] .slide::after {
  width: 72px;
  height: 72px;
  right: 56px;
  bottom: 48px;
  top: auto;
  border-radius: 50%;
  background: color-mix(in srgb, var(--accent2) 70%, transparent);
  filter: none;
  opacity: 0.85;
}

/* ── pin-paper-pad (pin-and-paper) ── */
.deck[data-surface="pin-paper-pad"] .slide {
  --slide-bg: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 27px,
    rgba(31, 58, 138, 0.12) 27px,
    rgba(31, 58, 138, 0.12) 28px
  ), var(--bg);
  border: 1px solid color-mix(in srgb, var(--text) 25%, transparent);
  box-shadow: 0 14px 36px rgba(14, 20, 48, 0.12);
}
.deck[data-surface="pin-paper-pad"] .slide::before {
  left: 72px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: color-mix(in srgb, var(--accent) 55%, transparent);
}
.deck[data-surface="pin-paper-pad"] .slide::after {
  width: 18px;
  height: 18px;
  right: 48px;
  top: 40px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #ddd, #666 55%, #222 70%);
  box-shadow: 0 2px 0 rgba(0,0,0,0.25);
  filter: none;
}
.deck[data-surface="pin-paper-pad"] .card {
  background: var(--card-bg);
  border: 1px solid color-mix(in srgb, var(--text) 18%, transparent);
  box-shadow: 2px 3px 0 rgba(31, 58, 138, 0.12);
}

/* ── vellum-colorfield (vellum) ── */
.deck[data-surface="vellum-colorfield"] .slide {
  --slide-bg: radial-gradient(ellipse 90% 70% at 50% 40%, var(--bg-2), var(--bg));
  border-radius: 0;
  box-shadow: none;
}
.deck[data-surface="vellum-colorfield"] .slide::after {
  display: none;
}
.deck[data-surface="vellum-colorfield"] .slide h1,
.deck[data-surface="vellum-colorfield"] .slide h2 {
  font-style: italic;
  font-weight: 400;
  color: var(--accent);
}
.deck[data-surface="vellum-colorfield"] .eyebrow,
.deck[data-surface="vellum-colorfield"] .comparison-label {
  font-family: 'Courier Prime', ui-monospace, monospace;
  color: color-mix(in srgb, var(--accent) 70%, transparent);
  letter-spacing: 0.08em;
}

/* ── neo-grid-panels (neo-grid-bold) ── */
.deck[data-surface="neo-grid-panels"] .slide {
  --slide-bg: var(--bg);
  border: 3px solid var(--text);
  border-radius: 0;
  box-shadow: 8px 8px 0 var(--accent);
}
.deck[data-surface="neo-grid-panels"] .slide::before {
  inset: 0;
  background-image:
    linear-gradient(color-mix(in srgb, var(--text) 10%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, var(--text) 10%, transparent) 1px, transparent 1px);
  background-size: 80px 80px;
  opacity: 0.55;
}
.deck[data-surface="neo-grid-panels"] .slide::after {
  width: 96px;
  height: 96px;
  right: 40px;
  top: 40px;
  background: var(--accent);
  filter: none;
}
.deck[data-surface="neo-grid-panels"] .slide h1 {
  text-transform: uppercase;
  letter-spacing: -0.02em;
}
.deck[data-surface="neo-grid-panels"] .card {
  border: 2px solid var(--text);
  border-radius: 0;
  background: var(--card-bg);
}

/* ── tri-tone-blocks (editorial-tri-tone) ── */
.deck[data-surface="tri-tone-blocks"] .slide {
  --slide-bg: linear-gradient(135deg, var(--bg) 0%, var(--bg) 55%, var(--bg-2) 55%, var(--bg-2) 100%);
  border-radius: 0;
  border: 3px solid var(--text);
}
.deck[data-surface="tri-tone-blocks"] .slide::after {
  width: 28%;
  height: 100%;
  right: 0;
  top: 0;
  background: var(--text);
  filter: none;
  opacity: 0.12;
}
.deck[data-surface="tri-tone-blocks"] .slide h1 {
  letter-spacing: -0.04em;
  font-weight: 800;
}
.deck[data-surface="tri-tone-blocks"] .card {
  background: var(--bg-2);
  border: 2px solid var(--text);
  border-radius: 0;
}

/* ── creative-mode-blocks (creative-mode) ── */
.deck[data-surface="creative-mode-blocks"] .slide {
  --slide-bg: var(--bg);
  border: 4px solid var(--text);
  border-radius: 0;
  box-shadow: 10px 10px 0 var(--text);
}
.deck[data-surface="creative-mode-blocks"] .slide::before {
  width: 120px;
  height: 120px;
  right: 48px;
  top: 40px;
  background: var(--accent2);
  filter: none;
}
.deck[data-surface="creative-mode-blocks"] .slide::after {
  width: 72px;
  height: 72px;
  right: 140px;
  top: 120px;
  background: var(--accent);
  filter: none;
}
.deck[data-surface="creative-mode-blocks"] .slide h1 {
  text-transform: uppercase;
  letter-spacing: -0.01em;
}
.deck[data-surface="creative-mode-blocks"] .card {
  border: 3px solid var(--text);
  border-radius: 0;
  box-shadow: 4px 4px 0 var(--text);
}

/* ── broadside-fire (broadside) ── */
.deck[data-surface="broadside-fire"] .slide {
  --slide-bg: var(--bg);
  border-radius: 0;
  border: 1px solid var(--border);
}
.deck[data-surface="broadside-fire"] .slide::before {
  left: 0;
  top: 0;
  bottom: 0;
  width: 10px;
  background: var(--accent);
}
.deck[data-surface="broadside-fire"] .slide::after {
  width: 140px;
  height: 140px;
  right: -20px;
  bottom: -20px;
  top: auto;
  background: var(--accent);
  filter: none;
  opacity: 0.95;
}
.deck[data-surface="broadside-fire"] .slide h1 {
  font-weight: 900;
  letter-spacing: -0.03em;
  text-transform: lowercase;
}

/* ── bold-signal-card (bold-signal) ── */
.deck[data-surface="bold-signal-card"] .slide {
  --slide-bg: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%);
  border-radius: 16px;
  box-shadow: 0 24px 60px rgba(0,0,0,0.45);
}
.deck[data-surface="bold-signal-card"] .slide::after {
  width: 42%;
  height: 58%;
  right: 48px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 18px;
  background: var(--accent);
  filter: none;
  opacity: 0.95;
}
.deck[data-surface="bold-signal-card"] .slide h1 {
  font-weight: 400;
  letter-spacing: -0.02em;
}
.deck[data-surface="bold-signal-card"] .card {
  background: var(--accent);
  color: #1a1a1a;
  border-radius: 16px;
  border: none;
}

/* ── notebook-tabs-page (notebook-tabs) ── */
.deck[data-surface="notebook-tabs-page"] .slide {
  --slide-bg: var(--bg);
  border-radius: 12px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.28), 0 0 0 18px #2d2d2d;
  border: 1px solid color-mix(in srgb, var(--text) 10%, transparent);
}
.deck[data-surface="notebook-tabs-page"] .slide::before {
  width: 14px;
  height: 72%;
  right: -7px;
  top: 14%;
  background: linear-gradient(
    180deg,
    #98d4bb 0% 18%,
    #c7b8ea 18% 36%,
    #f4b8c5 36% 54%,
    #a8d8ea 54% 72%,
    #ffe6a7 72% 100%
  );
  border-radius: 0 6px 6px 0;
  filter: none;
}
.deck[data-surface="notebook-tabs-page"] .slide::after {
  width: 10px;
  height: 10px;
  left: 28px;
  top: 36px;
  border-radius: 50%;
  background: #d0ccc4;
  box-shadow: 0 48px 0 #d0ccc4, 0 96px 0 #d0ccc4, 0 144px 0 #d0ccc4;
  filter: none;
}

/* ── creative-voltage-split (creative-voltage) ── */
.deck[data-surface="creative-voltage-split"] .slide {
  --slide-bg: linear-gradient(90deg, #0066ff 0 48%, #1a1a2e 48% 100%);
  border-radius: 0;
  border: 2px solid var(--accent);
  box-shadow: 8px 8px 0 var(--accent);
}
.deck[data-surface="creative-voltage-split"] .slide::after {
  width: 88px;
  height: 88px;
  right: 48px;
  top: 40px;
  background: var(--accent);
  filter: none;
  border-radius: 50%;
}
.deck[data-surface="creative-voltage-split"] .slide h1 {
  text-shadow: 0 0 24px color-mix(in srgb, var(--accent) 45%, transparent);
}
.deck[data-surface="creative-voltage-split"] .card {
  background: rgba(26,26,46,0.65);
  border: 1px solid var(--accent);
  border-radius: 0;
}

/* ── signal-briefing (signal) ── */
.deck[data-surface="signal-briefing"] .slide {
  --slide-bg: linear-gradient(165deg, var(--bg) 0%, var(--bg-2) 100%);
  border: 1px solid var(--border);
  box-shadow: 0 18px 44px rgba(26, 32, 48, 0.08);
}
.deck[data-surface="signal-briefing"] .slide::before {
  left: 64px;
  right: 64px;
  top: 48px;
  height: 1px;
  background: var(--accent);
}
.deck[data-surface="signal-briefing"] .slide::after {
  width: 48px;
  height: 48px;
  right: 56px;
  bottom: 48px;
  top: auto;
  border: 1px solid var(--accent2);
  background: transparent;
  filter: none;
}
.deck[data-surface="signal-briefing"] .slide h1 em,
.deck[data-surface="signal-briefing"] .slide h1 i {
  color: var(--accent);
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
`,e2="warm-paper",n2="clean-light",t2="soft-bento",r2="bauhaus-blocks",o2="vapor-horizon",a2="hygge-soft",i2="blueprint-grid",l2="glass-mist",s2="newsprint-masthead",u2="vellum-colorfield",c2="broadside-fire",d2="signal-briefing",f2={claude:e2,"default-tech":"neon-glow",corporate:n2,playful:t2,"luxury-minimalist":"quiet-luxe","retro-arcade":"scanline-neon","editorial-serif":"editorial-rule","brutalist-mono":"brutalist-grid","pastel-dreamy":"pastel-cloud","aurora-glass":"aurora-glass","ft-editorial":"broadsheet-rule","genz-bento":"hard-bento","crt-terminal":"crt-phosphor","swiss-typographic":"swiss-grid","candy-pop":"candy-blob","aerospace-hud":"hud-grid","brutalist-acid":"acid-block",bauhaus:r2,"y2k-aero":"aero-bubble","risograph-zine":"riso-print","neon-noir":"neon-rain",vaporwave:o2,"botanical-luxe":"botanical-leaf","heritage-editorial":"heritage-wash","fintech-clean":"fintech-soft","developer-dark":"dev-terminal","data-editorial":"data-rule",scandinavian:a2,"art-deco":"deco-fan","kinetic-wrapped":"wrapped-block",blueprint:i2,glassmorphism:l2,broadsheet:s2,"soft-editorial":"soft-editorial-paper","editorial-forest":"editorial-forest-paper","pin-and-paper":"pin-paper-pad",vellum:u2,"neo-grid-bold":"neo-grid-panels","editorial-tri-tone":"tri-tone-blocks","creative-mode":"creative-mode-blocks",broadside:c2,"bold-signal":"bold-signal-card","notebook-tabs":"notebook-tabs-page","creative-voltage":"creative-voltage-split",signal:d2},p2=`<!doctype html>
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
`;function g2(e){return f2[e]??"gradient"}const h2=Object.assign({"../../../shared/layouts/closing.html":Cx,"../../../shared/layouts/comparison.html":Ex,"../../../shared/layouts/data-table.html":jx,"../../../shared/layouts/feature-grid.html":Tx,"../../../shared/layouts/image-hero.html":Nx,"../../../shared/layouts/quote.html":Px,"../../../shared/layouts/section.html":Fx,"../../../shared/layouts/stat-row.html":Mx,"../../../shared/layouts/timeline.html":zx,"../../../shared/layouts/title.html":Ix,"../../../shared/layouts/two-column.html":Ox}),nv=new Map;for(const[e,n]of Object.entries(h2)){const t=e.split("/").pop().replace(/\.html$/,"");nv.set(t,n)}function m2(e){return e.length===0?"":`https://fonts.googleapis.com/css2?family=${e.join("&family=")}&display=swap`}const v2=new Set(["http","https","mailto","tel"]);function tv(e){let n="";for(const t of e){const r=t.charCodeAt(0);r>31&&r!==127&&(n+=t)}return n}function rv(e){var n,t;return(t=(n=e.match(/^([a-zA-Z][a-zA-Z0-9+.-]*):/))==null?void 0:n[1])==null?void 0:t.toLowerCase()}function y2(e){if(typeof e!="string")return;const n=tv(e).trim(),t=rv(n);return t&&!v2.has(t)?"#":n}function b2(e){if(typeof e!="string")return;const n=tv(e).trim();if(/^data:image\//i.test(n))return n;const t=rv(n);return t&&t!=="http"&&t!=="https"?"":n}function x2(e){var t;const n={...e};return e.layout==="data-table"&&Array.isArray(e.rows)&&(n.rows=e.rows.map(r=>({cells:r}))),e.layout==="feature-grid"&&(typeof e.columns=="number"?n.columns=e.columns:e.columns||(n.columns=3)),((t=e.cta)==null?void 0:t.href)!==void 0&&(n.cta={...e.cta,href:y2(e.cta.href)}),e.image!==void 0&&(n.image=b2(e.image)),n}const w2='<footer class="pmd-attribution">Made with <a href="https://presentation-md.vercel.app/?ref=studio" target="_blank" rel="noopener">presentation-md</a></footer>',k2=`
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
@media print { .pmd-attribution { opacity: 0.5; } }`;function S2(e){return`<script type="application/json" id="pmd-deck">${JSON.stringify(e).replace(/</g,"\\u003c")}<\/script>`}function ov(e,n){var u,f,g;const t={bg:n.palette.bg,bg2:n.palette.bg2,text:n.palette.text,muted:n.palette.muted,accent:n.palette.accent,accent2:n.palette.accent2,cardBg:n.palette.cardBg,border:n.palette.border,radius:n.geometry.radius,slideW:n.geometry.slideWidth,headingFont:n.typography.headingFont,bodyFont:n.typography.bodyFont,headingWeight:String(n.typography.headingWeight)},r=ve.render(Zx,t),o=m2(n.typography.googleFonts),a=g2(n.name);let i=o?`@import url('${o}');

${r}

${us}`:`${r}

${us}`;i+=`

${k2}`;const l=(Array.isArray(e.slides)?e.slides:[]).map(m=>{const y=nv.get(m.layout);return y?ve.render(y,x2(m)):`<section class="slide"><h2>Unknown layout: ${m.layout}</h2></section>`}).join(`
`),s=((u=e.meta)==null?void 0:u.title)??((f=e.meta)==null?void 0:f.company)??"Presentation";return ve.render(p2,{title:s,description:((g=e.meta)==null?void 0:g.description)??"",styles:i,slides:l,surface:a,attribution:w2,deckData:S2(e)})}const _2="modulepreload",$2=function(e){return"/studio/"+e},cs={},av=function(n,t,r){let o=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),l=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));o=Promise.allSettled(t.map(s=>{if(s=$2(s),s in cs)return;cs[s]=!0;const u=s.endsWith(".css"),f=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${s}"]${f}`))return;const g=document.createElement("link");if(g.rel=u?"stylesheet":_2,u||(g.as="script"),g.crossOrigin="",g.href=s,l&&g.setAttribute("nonce",l),document.head.appendChild(g),u)return new Promise((m,y)=>{g.addEventListener("load",m),g.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${s}`)))})}))}function a(i){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=i,window.dispatchEvent(l),!l.defaultPrevented)throw i}return o.then(i=>{for(const l of i||[])l.status==="rejected"&&a(l.reason);return n().catch(a)})};function Qi(e,n){const t=URL.createObjectURL(e),r=document.createElement("a");r.href=t,r.download=n,document.body.appendChild(r),r.click(),r.remove(),URL.revokeObjectURL(t)}function Yi(e,n){var r,o;return`${(((r=e.meta)==null?void 0:r.title)??((o=e.meta)==null?void 0:o.company)??"deck").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"deck"}.${n}`}function iv(e){var n;return((n=e.meta)==null?void 0:n.theme)??"default-tech"}async function C2(e){const n=[],t=Gi(iv(e)),{deckToPptxBlob:r}=await av(async()=>{const{deckToPptxBlob:a}=await import("./index-rT3NUMG4.js");return{deckToPptxBlob:a}},__vite__mapDeps([0,1])),o=await r(e,t,{onWarn:a=>n.push(a)});return Qi(o,Yi(e,"pptx")),{warnings:n}}function E2(e){const n=Gi(iv(e)),t=ov(e,n);Qi(new Blob([t],{type:"text/html"}),Yi(e,"html"))}function j2(e){Qi(new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),Yi(e,"json"))}function Ki(e){const n=JSON.parse(e);if((n==null?void 0:n.type)!=="deck"||!Array.isArray(n.slides))throw new Error('Not a valid deck: expected { "type": "deck", "slides": [...] }');return n}function T2(e){var r,o,a;const n=["pmd-deck","psp-deck"];if(typeof DOMParser<"u"){const i=new DOMParser().parseFromString(e,"text/html");for(const l of n){const s=(o=(r=i.getElementById(l))==null?void 0:r.textContent)==null?void 0:o.trim();if(s)return s}}const t=e.match(/<script[^>]*id=["'](?:pmd-deck|psp-deck)["'][^>]*>([\s\S]*?)<\/script>/i);return(a=t==null?void 0:t[1])==null?void 0:a.trim()}function N2(e){const n=T2(e);if(!n)throw new Error("No editable deck found in this HTML. Only presentations created by presentation-md (with an embedded source) can be opened.");return Ki(n)}function P2(e,n){return/\.html?$/i.test(e)?N2(n):Ki(n)}function F2({deck:e,onChange:n,onLoadExample:t,onPresent:r,onGenerate:o}){var p,c,h,b;const a=A.useRef(null),[i,l]=A.useState(""),[s,u]=A.useState(!1),f=ev(),g=((p=e.meta)==null?void 0:p.theme)??"default-tech",m=v=>n({...e,meta:{...e.meta,...v}}),y=v=>m({theme:v}),S=v=>m({title:v}),x=async v=>{try{const w=P2(v.name,await v.text());n(w),l(`Opened ${v.name}`)}catch(w){l(`Open failed: ${w.message}`)}},j=async()=>{u(!0),l("Building .pptx…");try{const{warnings:v}=await C2(e);l(v.length?`Exported .pptx (${v.length} warning${v.length>1?"s":""})`:"Exported .pptx")}catch(v){l(`Export failed: ${v.message}`)}finally{u(!1)}};return d.jsxs("header",{className:"toolbar",children:[d.jsxs("div",{className:"brand",children:[d.jsx("strong",{children:"Studio"}),d.jsx("span",{className:"muted small",children:"presentation-md"})]}),d.jsx("input",{className:"text-input title-input",value:((c=e.meta)==null?void 0:c.title)??"",placeholder:"Deck title",onChange:v=>S(v.target.value)}),d.jsxs("label",{className:"inline-field",children:[d.jsx("span",{className:"muted small",children:"Theme"}),d.jsx("select",{className:"text-input",value:g,onChange:v=>y(v.target.value),children:f.map(v=>d.jsx("option",{value:v,children:v},v))})]}),d.jsxs("details",{className:"deck-details",children:[d.jsx("summary",{className:"btn btn-sm",children:"Details"}),d.jsxs("div",{className:"deck-details-body",children:[d.jsx("input",{className:"text-input",value:((h=e.meta)==null?void 0:h.company)??"",placeholder:"Company",onChange:v=>m({company:v.target.value})}),d.jsx("input",{className:"text-input",value:((b=e.meta)==null?void 0:b.description)??"",placeholder:"Description",onChange:v=>m({description:v.target.value})})]})]}),d.jsx("div",{className:"spacer"}),d.jsx("button",{className:"btn btn-generate",onClick:o,title:"Generate a deck from a prompt",children:"✨ Generate"}),d.jsx("button",{className:"btn",onClick:t,children:"Example"}),d.jsx("button",{className:"btn",onClick:()=>{var v;return(v=a.current)==null?void 0:v.click()},title:"Open a deck .html or .json",children:"Open"}),d.jsx("button",{className:"btn",onClick:r,title:"Present fullscreen",children:"Present"}),d.jsx("button",{className:"btn",onClick:()=>j2(e),children:"JSON"}),d.jsx("button",{className:"btn",onClick:()=>E2(e),children:"HTML"}),d.jsx("button",{className:"btn btn-primary",disabled:s,onClick:j,children:s?"…":"Download .pptx"}),d.jsx("input",{ref:a,type:"file",accept:".html,.htm,.json,application/json,text/html",hidden:!0,onChange:v=>{var E;const w=(E=v.target.files)==null?void 0:E[0];w&&x(w),v.target.value=""}}),i&&d.jsx("span",{className:"status muted small",children:i})]})}function M2({slides:e,selected:n,onSelect:t,onChange:r}){const[o,a]=A.useState("title"),i=()=>{const f=n+1,g=[...e.slice(0,f),D1(o),...e.slice(f)];r(g,f)},l=f=>{const g=JSON.parse(JSON.stringify(e[f]));r([...e.slice(0,f+1),g,...e.slice(f+1)],f+1)},s=f=>{if(e.length<=1)return;const g=e.filter((m,y)=>y!==f);r(g,Math.max(0,Math.min(f,g.length-1)))},u=(f,g)=>{const m=f+g;if(m<0||m>=e.length)return;const y=e.slice();[y[f],y[m]]=[y[m],y[f]],r(y,m)};return d.jsxs("div",{className:"slide-list",children:[d.jsxs("div",{className:"add-row",children:[d.jsx("select",{className:"text-input",value:o,onChange:f=>a(f.target.value),children:A1.map(f=>d.jsx("option",{value:f,children:Ja[f]},f))}),d.jsx("button",{className:"btn btn-sm",onClick:i,children:"+ Add"})]}),d.jsx("ul",{className:"slides",children:e.map((f,g)=>d.jsxs("li",{className:`slide-row ${g===n?"active":""}`,onClick:()=>t(g),children:[d.jsxs("div",{className:"slide-row-main",children:[d.jsx("span",{className:"slide-row-num",children:g+1}),d.jsxs("div",{className:"slide-row-text",children:[d.jsx("span",{className:"slide-row-layout",children:Ja[f.layout]??f.layout}),d.jsx("span",{className:"slide-row-title",children:f.heading??f.quote??f.eyebrow??"—"})]})]}),d.jsxs("div",{className:"slide-row-actions",onClick:m=>m.stopPropagation(),children:[d.jsx("button",{className:"btn btn-icon",title:"Move up",onClick:()=>u(g,-1),children:"↑"}),d.jsx("button",{className:"btn btn-icon",title:"Move down",onClick:()=>u(g,1),children:"↓"}),d.jsx("button",{className:"btn btn-icon",title:"Duplicate",onClick:()=>l(g),children:"⧉"}),d.jsx("button",{className:"btn btn-icon btn-danger",title:"Delete",onClick:()=>s(g),children:"✕"})]})]},g))})]})}function Ji({label:e,children:n}){return d.jsxs("label",{className:"field",children:[d.jsx("span",{className:"field-label",children:e}),n]})}function M({label:e,value:n,onChange:t,placeholder:r}){return d.jsx(Ji,{label:e,children:d.jsx("input",{className:"text-input",type:"text",value:n??"",placeholder:r,onChange:o=>t(o.target.value)})})}function Ue({label:e,value:n,onChange:t,rows:r=3}){return d.jsx(Ji,{label:e,children:d.jsx("textarea",{className:"text-input",rows:r,value:n??"",onChange:o=>t(o.target.value)})})}function z2({label:e,value:n,options:t,onChange:r}){return d.jsx(Ji,{label:e,children:d.jsx("select",{className:"text-input",value:n,onChange:o=>r(Number(o.target.value)),children:t.map(o=>d.jsx("option",{value:o,children:o},o))})})}function Dr({label:e,items:n,onChange:t,blank:r,renderItem:o}){const a=(l,s)=>t(n.map((u,f)=>f===l?s:u)),i=(l,s)=>{const u=l+s;if(u<0||u>=n.length)return;const f=n.slice();[f[l],f[u]]=[f[u],f[l]],t(f)};return d.jsxs("div",{className:"list-editor",children:[d.jsxs("div",{className:"list-editor-head",children:[d.jsx("span",{className:"field-label",children:e}),d.jsx("button",{className:"btn btn-sm",onClick:()=>t([...n,r()]),children:"+ Add"})]}),n.map((l,s)=>d.jsxs("div",{className:"list-item",children:[d.jsxs("div",{className:"list-item-controls",children:[d.jsx("span",{className:"list-item-index",children:s+1}),d.jsx("div",{className:"spacer"}),d.jsx("button",{className:"btn btn-icon",title:"Move up",onClick:()=>i(s,-1),children:"↑"}),d.jsx("button",{className:"btn btn-icon",title:"Move down",onClick:()=>i(s,1),children:"↓"}),d.jsx("button",{className:"btn btn-icon btn-danger",title:"Remove",onClick:()=>t(n.filter((u,f)=>f!==s)),children:"✕"})]}),o(l,u=>a(s,u),s)]},s)),n.length===0&&d.jsx("p",{className:"muted small",children:"No items yet."})]})}function I2({slide:e,onChange:n}){const t=a=>n({...e,...a}),r=e.layout;return d.jsxs("div",{className:"slide-form",children:[d.jsx("h2",{className:"panel-title",children:Ja[r]??e.layout}),o()]});function o(){var a,i;switch(e.layout){case"title":case"closing":return d.jsxs(d.Fragment,{children:[d.jsx(M,{label:"Eyebrow",value:e.eyebrow,onChange:l=>t({eyebrow:l})}),d.jsx(M,{label:"Heading",value:e.heading,onChange:l=>t({heading:l})}),d.jsx(Ue,{label:"Lead",value:e.lead,onChange:l=>t({lead:l})}),e.layout==="closing"&&d.jsxs(d.Fragment,{children:[d.jsx(M,{label:"CTA label",value:(a=e.cta)==null?void 0:a.label,onChange:l=>t({cta:{...e.cta,label:l}})}),d.jsx(M,{label:"CTA link",value:(i=e.cta)==null?void 0:i.href,onChange:l=>t({cta:{...e.cta,href:l}})})]})]});case"section":return d.jsxs(d.Fragment,{children:[d.jsx(M,{label:"Number",value:e.number,onChange:l=>t({number:l})}),d.jsx(M,{label:"Eyebrow",value:e.eyebrow,onChange:l=>t({eyebrow:l})}),d.jsx(M,{label:"Heading",value:e.heading,onChange:l=>t({heading:l})}),d.jsx(Ue,{label:"Lead",value:e.lead,onChange:l=>t({lead:l})})]});case"two-column":return d.jsxs(d.Fragment,{children:[d.jsx(M,{label:"Eyebrow",value:e.eyebrow,onChange:l=>t({eyebrow:l})}),d.jsx(M,{label:"Heading",value:e.heading,onChange:l=>t({heading:l})}),d.jsx(Ue,{label:"Body",value:e.body,onChange:l=>t({body:l}),rows:5}),d.jsx(M,{label:"Image URL (data: URIs embed in PPTX)",value:e.image,onChange:l=>t({image:l})}),d.jsx(M,{label:"Image alt",value:e.imageAlt,onChange:l=>t({imageAlt:l})})]});case"image-hero":return d.jsxs(d.Fragment,{children:[d.jsx(M,{label:"Eyebrow",value:e.eyebrow,onChange:l=>t({eyebrow:l})}),d.jsx(M,{label:"Heading",value:e.heading,onChange:l=>t({heading:l})}),d.jsx(Ue,{label:"Lead",value:e.lead,onChange:l=>t({lead:l}),rows:3}),d.jsx(M,{label:"Image URL (data: URIs embed in PPTX)",value:e.image,onChange:l=>t({image:l})}),d.jsx(M,{label:"Image alt",value:e.imageAlt,onChange:l=>t({imageAlt:l})})]});case"comparison":return d.jsxs(d.Fragment,{children:[d.jsx(M,{label:"Eyebrow",value:e.eyebrow,onChange:l=>t({eyebrow:l})}),d.jsx(M,{label:"Heading",value:e.heading,onChange:l=>t({heading:l})}),d.jsx(M,{label:"Left label",value:e.leftLabel,onChange:l=>t({leftLabel:l})}),d.jsx(Ue,{label:"Left body",value:e.left,onChange:l=>t({left:l}),rows:4}),d.jsx(M,{label:"Right label",value:e.rightLabel,onChange:l=>t({rightLabel:l})}),d.jsx(Ue,{label:"Right body",value:e.right,onChange:l=>t({right:l}),rows:4})]});case"quote":return d.jsxs(d.Fragment,{children:[d.jsx(Ue,{label:"Quote",value:e.quote,onChange:l=>t({quote:l}),rows:4}),d.jsx(M,{label:"Attribution",value:e.by,onChange:l=>t({by:l})})]});case"feature-grid":return d.jsxs(d.Fragment,{children:[d.jsx(M,{label:"Eyebrow",value:e.eyebrow,onChange:l=>t({eyebrow:l})}),d.jsx(M,{label:"Heading",value:e.heading,onChange:l=>t({heading:l})}),d.jsx(z2,{label:"Columns",value:typeof e.columns=="number"?e.columns:3,options:[2,3,4],onChange:l=>t({columns:l})}),d.jsx(Dr,{label:"Cards",items:e.cards??[],onChange:l=>t({cards:l}),blank:()=>({title:"New card",body:""}),renderItem:(l,s)=>d.jsxs(d.Fragment,{children:[d.jsx(M,{label:"Icon (FontAwesome class)",value:l.icon,onChange:u=>s({...l,icon:u})}),d.jsx(M,{label:"Title",value:l.title,onChange:u=>s({...l,title:u})}),d.jsx(Ue,{label:"Body",value:l.body,onChange:u=>s({...l,body:u}),rows:2})]})})]});case"stat-row":return d.jsxs(d.Fragment,{children:[d.jsx(M,{label:"Eyebrow",value:e.eyebrow,onChange:l=>t({eyebrow:l})}),d.jsx(M,{label:"Heading",value:e.heading,onChange:l=>t({heading:l})}),d.jsx(Dr,{label:"Stats",items:e.stats??[],onChange:l=>t({stats:l}),blank:()=>({value:"0",label:"Metric"}),renderItem:(l,s)=>d.jsxs(d.Fragment,{children:[d.jsx(M,{label:"Value",value:l.value,onChange:u=>s({...l,value:u})}),d.jsx(M,{label:"Label",value:l.label,onChange:u=>s({...l,label:u})})]})})]});case"timeline":return d.jsxs(d.Fragment,{children:[d.jsx(M,{label:"Eyebrow",value:e.eyebrow,onChange:l=>t({eyebrow:l})}),d.jsx(M,{label:"Heading",value:e.heading,onChange:l=>t({heading:l})}),d.jsx(Dr,{label:"Steps",items:e.steps??[],onChange:l=>t({steps:l}),blank:()=>({title:"New step",body:""}),renderItem:(l,s)=>d.jsxs(d.Fragment,{children:[d.jsx(M,{label:"Title",value:l.title,onChange:u=>s({...l,title:u})}),d.jsx(Ue,{label:"Body",value:l.body,onChange:u=>s({...l,body:u}),rows:2})]})})]});case"data-table":return d.jsx(O2,{slide:e,set:t});default:return d.jsx("p",{className:"muted",children:"No editable fields for this layout."})}}}function O2({slide:e,set:n}){const t=Array.isArray(e.columns)?e.columns:[],r=Array.isArray(e.rows)?e.rows:[],o=Math.max(t.length,...r.map(s=>s.length),1),a=(s,u)=>{const f=t.slice();f[s]=u,n({columns:f})},i=()=>{n({columns:[...t,`Column ${t.length+1}`],rows:r.map(s=>[...s,""])})},l=s=>{n({columns:t.filter((u,f)=>f!==s),rows:r.map(u=>u.filter((f,g)=>g!==s))})};return d.jsxs(d.Fragment,{children:[d.jsx(M,{label:"Eyebrow",value:e.eyebrow,onChange:s=>n({eyebrow:s})}),d.jsx(M,{label:"Heading",value:e.heading,onChange:s=>n({heading:s})}),d.jsxs("div",{className:"list-editor",children:[d.jsxs("div",{className:"list-editor-head",children:[d.jsx("span",{className:"field-label",children:"Columns"}),d.jsx("button",{className:"btn btn-sm",onClick:i,children:"+ Column"})]}),Array.from({length:o}).map((s,u)=>d.jsxs("div",{className:"row-inline",children:[d.jsx("input",{className:"text-input",value:t[u]??"",placeholder:`Column ${u+1}`,onChange:f=>a(u,f.target.value)}),d.jsx("button",{className:"btn btn-icon btn-danger",title:"Remove column",onClick:()=>l(u),children:"✕"})]},u))]}),d.jsx(Dr,{label:"Rows",items:r,onChange:s=>n({rows:s}),blank:()=>Array.from({length:o},()=>""),renderItem:(s,u)=>d.jsx("div",{className:"row-cells",children:Array.from({length:o}).map((f,g)=>d.jsx("input",{className:"text-input",value:s[g]??"",placeholder:t[g]??`Col ${g+1}`,onChange:m=>{const y=s.slice();for(;y.length<o;)y.push("");y[g]=m.target.value,u(y)}},g))})})]})}function L2({html:e}){return d.jsx("div",{className:"preview",children:d.jsx("iframe",{className:"preview-frame",title:"Deck preview",srcDoc:e,sandbox:"allow-same-origin",referrerPolicy:"no-referrer"})})}const A2=`
html { scroll-behavior: smooth; scroll-snap-type: y mandatory; }
body { gap: 0 !important; padding: 0 !important; }
.slide { min-height: 100vh !important; margin: 0 !important; border-radius: 0 !important; scroll-snap-align: start !important; scroll-snap-stop: always !important; }
.pmd-attribution { display: none !important; }
`;function D2({html:e,slideCount:n,onClose:t}){const r=A.useRef(null),[o,a]=A.useState(0),i=e.replace("</head>",`<style>${A2}</style></head>`),l=s=>a(u=>Math.max(0,Math.min(n-1,u+s)));return A.useEffect(()=>{const s=u=>{u.key==="Escape"?t():u.key==="ArrowRight"||u.key===" "||u.key==="PageDown"?(u.preventDefault(),a(f=>Math.min(n-1,f+1))):(u.key==="ArrowLeft"||u.key==="PageUp")&&(u.preventDefault(),a(f=>Math.max(0,f-1)))};return window.addEventListener("keydown",s),()=>window.removeEventListener("keydown",s)},[t,n]),A.useEffect(()=>{var f,g;const s=(f=r.current)==null?void 0:f.contentDocument,u=s==null?void 0:s.querySelectorAll("section.slide");(g=u==null?void 0:u[o])==null||g.scrollIntoView({behavior:"smooth",block:"start"})},[o,i]),d.jsxs("div",{className:"present-overlay",children:[d.jsx("div",{className:"present-stage",children:d.jsx("iframe",{ref:r,className:"present-frame",title:"Present deck",srcDoc:i,sandbox:"allow-same-origin"})}),d.jsxs("div",{className:"present-bar",children:[d.jsx("button",{className:"btn btn-icon",title:"Previous (←)",onClick:()=>l(-1),children:"←"}),d.jsxs("span",{className:"present-count",children:[o+1," / ",n]}),d.jsx("button",{className:"btn btn-icon",title:"Next (→)",onClick:()=>l(1),children:"→"}),d.jsx("button",{className:"btn",onClick:t,children:"Exit · Esc"})]})]})}const ds=[{id:"claude-opus-4-8",label:"Opus 4.8 — most capable"},{id:"claude-sonnet-4-6",label:"Sonnet 4.6 — faster, cheaper"},{id:"claude-haiku-4-5",label:"Haiku 4.5 — fastest"}],lv=`You author slide decks as a single JSON object matching this schema — the "Deck JSON" spec used by presentation-md.

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
- Only emit fields defined above. Do not invent new layouts or fields.`;function sv(e,n){return`Create a deck for the following brief. Set meta.theme to "${n}".

Brief:
${e.trim()}`}function R2(e,n){return`${lv}

${sv(e,n)}

Respond with ONLY the JSON object — no prose, no markdown fences.`}function B2(e){const n=e.match(/```(?:json)?\s*([\s\S]*?)```/i),t=((n==null?void 0:n[1])??e).trim(),r=t.indexOf("{"),o=t.lastIndexOf("}");return r===-1||o===-1||o<r?t:t.slice(r,o+1)}async function W2(e){const{apiKey:n,model:t,brief:r,theme:o,signal:a}=e;if(!r.trim())throw new Error("Describe your deck first.");if(!n.trim())throw new Error("Enter your Anthropic API key.");const{default:i}=await av(async()=>{const{default:g}=await import("./index-CwyONTjH.js");return{default:g}},__vite__mapDeps([2,1])),u=(await new i({apiKey:n.trim(),dangerouslyAllowBrowser:!0}).messages.create({model:t,max_tokens:8e3,system:lv,messages:[{role:"user",content:`${sv(r,o)}

Respond with ONLY the JSON object — no prose, no markdown fences.`}]},{signal:a})).content.map(g=>g.type==="text"?g.text:"").join("");if(!u.trim())throw new Error("The model returned an empty response. Try again.");let f;try{f=Ki(B2(u))}catch(g){throw new Error(`Couldn't parse the generated deck: ${g.message}`)}return f.meta={...f.meta,theme:o},f}const Cr="pmd-studio-anthropic-key",U2=["Q3 all-hands: momentum, key metrics, roadmap, and what's next.","Seed pitch for an AI-native analytics tool — problem, product, traction, ask.","Launch deck for a developer CLI: what it is, how it works, why it's fast."];function H2({currentTheme:e,onGenerate:n,onClose:t}){const[r,o]=A.useState(""),[a,i]=A.useState(e),[l,s]=A.useState(ds[0].id),[u,f]=A.useState(()=>localStorage.getItem(Cr)??""),[g,m]=A.useState(()=>!!localStorage.getItem(Cr)),[y,S]=A.useState(!1),[x,j]=A.useState(""),[p,c]=A.useState(!1),h=ev(),b=async()=>{S(!0),j("Generating your deck…");try{g?localStorage.setItem(Cr,u.trim()):localStorage.removeItem(Cr);const w=await W2({apiKey:u,model:l,brief:r,theme:a});n(w),t()}catch(w){j(w.message)}finally{S(!1)}},v=async()=>{try{await navigator.clipboard.writeText(R2(r,a)),c(!0),setTimeout(()=>c(!1),1800)}catch{j("Couldn't copy — select the prompt manually.")}};return d.jsx("div",{className:"modal-overlay",onClick:t,children:d.jsxs("div",{className:"modal",onClick:w=>w.stopPropagation(),children:[d.jsxs("header",{className:"modal-head",children:[d.jsxs("div",{children:[d.jsx("strong",{children:"Generate a deck"}),d.jsx("span",{className:"muted small",children:"Describe it — get an editable deck in seconds."})]}),d.jsx("button",{className:"btn btn-sm",onClick:t,"aria-label":"Close",children:"✕"})]}),d.jsxs("div",{className:"modal-body",children:[d.jsx("label",{className:"field-label",children:"What's the deck about?"}),d.jsx("textarea",{className:"text-input brief-input",value:r,placeholder:"e.g. Q3 all-hands covering revenue, product wins, and the roadmap for next quarter.",rows:4,onChange:w=>o(w.target.value)}),d.jsx("div",{className:"chip-row",children:U2.map(w=>d.jsx("button",{className:"chip",onClick:()=>o(w),title:"Use this brief",children:w.split(/[:—]/)[0].trim()},w))}),d.jsxs("div",{className:"field-grid",children:[d.jsxs("label",{className:"inline-field",children:[d.jsx("span",{className:"muted small",children:"Theme"}),d.jsx("select",{className:"text-input",value:a,onChange:w=>i(w.target.value),children:h.map(w=>d.jsx("option",{value:w,children:w},w))})]}),d.jsxs("label",{className:"inline-field",children:[d.jsx("span",{className:"muted small",children:"Model"}),d.jsx("select",{className:"text-input",value:l,onChange:w=>s(w.target.value),children:ds.map(w=>d.jsx("option",{value:w.id,children:w.label},w.id))})]})]}),d.jsxs("div",{className:"gen-panel",children:[d.jsx("label",{className:"field-label",children:"Your Anthropic API key"}),d.jsx("input",{className:"text-input",type:"password",value:u,placeholder:"sk-ant-…",autoComplete:"off",onChange:w=>f(w.target.value)}),d.jsxs("label",{className:"checkbox-field",children:[d.jsx("input",{type:"checkbox",checked:g,onChange:w=>m(w.target.checked)}),d.jsx("span",{className:"muted small",children:"Remember on this device (stored only in your browser)"})]}),d.jsxs("p",{className:"muted small privacy-note",children:["Your key stays in this browser. Requests go straight to Anthropic — nothing is sent to our servers. Get a key at ",d.jsx("a",{href:"https://console.anthropic.com/settings/keys",target:"_blank",rel:"noreferrer",children:"console.anthropic.com"}),"."]}),d.jsx("button",{className:"btn btn-primary btn-block",disabled:y,onClick:b,children:y?"Generating…":"Generate deck"})]}),d.jsx("div",{className:"gen-divider",children:d.jsx("span",{children:"or hand it to your agent"})}),d.jsxs("div",{className:"gen-panel",children:[d.jsx("p",{className:"muted small",children:"No key? Copy a ready-made prompt and paste it into Claude Code, Cursor, or any agent with the presentation skill installed — then open the resulting deck here."}),d.jsx("button",{className:"btn btn-block",onClick:v,disabled:!r.trim(),children:p?"Copied ✓":"Copy prompt for your agent"})]}),x&&d.jsx("p",{className:"status muted small gen-status",children:x})]})]})})}const uv="pmd-studio-deck-v1";function G2(){try{const e=localStorage.getItem(uv);if(e){const n=JSON.parse(e);if((n==null?void 0:n.type)==="deck"&&Array.isArray(n.slides)&&n.slides.length)return n}}catch{}return $c}function V2(){var y;const[e,n]=A.useState(G2),[t,r]=A.useState(0),[o,a]=A.useState(!1),[i,l]=A.useState(!1);A.useEffect(()=>{try{localStorage.setItem(uv,JSON.stringify(e))}catch{}},[e]);const s=A.useMemo(()=>{var S;try{return ov(e,Gi(((S=e.meta)==null?void 0:S.theme)??"default-tech"))}catch(x){return`<pre style="color:#d9695a;font-family:monospace;padding:24px">${String(x)}</pre>`}},[e]),u=(S,x)=>{n({...e,slides:S}),x!==void 0&&r(x)},f=S=>{n({...e,slides:e.slides.map((x,j)=>j===t?S:x)})},g=()=>{n($c),r(0)},m=e.slides[Math.min(t,e.slides.length-1)];return d.jsxs("div",{className:"app",children:[d.jsx(F2,{deck:e,onChange:n,onLoadExample:g,onPresent:()=>a(!0),onGenerate:()=>l(!0)}),d.jsxs("div",{className:"workspace",children:[d.jsx("aside",{className:"panel panel-left",children:d.jsx(M2,{slides:e.slides,selected:t,onSelect:r,onChange:u})}),d.jsx("main",{className:"panel panel-center",children:d.jsx(L2,{html:s})}),d.jsx("aside",{className:"panel panel-right",children:m?d.jsx(I2,{slide:m,onChange:f}):d.jsx("p",{className:"muted",children:"No slide selected."})})]}),o&&d.jsx(D2,{html:s,slideCount:e.slides.length,onClose:()=>a(!1)}),i&&d.jsx(H2,{currentTheme:((y=e.meta)==null?void 0:y.theme)??"claude",onGenerate:S=>{n(S),r(0)},onClose:()=>l(!1)})]})}const cv=document.getElementById("root");if(!cv)throw new Error("Missing #root element");_c(cv).render(d.jsx(A.StrictMode,{children:d.jsx(V2,{})}));export{av as _};
