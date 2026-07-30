const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-rT3NUMG4.js","assets/_commonjsHelpers-Cpj98o6Y.js","assets/index-D9BOkcv1.js"])))=>i.map(i=>d[i]);
(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function t(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(o){if(o.ep)return;o.ep=!0;const a=t(o);fetch(o.href,a)}})();var ps={exports:{}},po={},fs={exports:{}},P={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var nr=Symbol.for("react.element"),Fy=Symbol.for("react.portal"),Py=Symbol.for("react.fragment"),Ny=Symbol.for("react.strict_mode"),My=Symbol.for("react.profiler"),zy=Symbol.for("react.provider"),Iy=Symbol.for("react.context"),Oy=Symbol.for("react.forward_ref"),Ly=Symbol.for("react.suspense"),Dy=Symbol.for("react.memo"),By=Symbol.for("react.lazy"),Xi=Symbol.iterator;function Ay(e){return e===null||typeof e!="object"?null:(e=Xi&&e[Xi]||e["@@iterator"],typeof e=="function"?e:null)}var gs={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},hs=Object.assign,ms={};function ut(e,n,t){this.props=e,this.context=n,this.refs=ms,this.updater=t||gs}ut.prototype.isReactComponent={};ut.prototype.setState=function(e,n){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,n,"setState")};ut.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function vs(){}vs.prototype=ut.prototype;function qa(e,n,t){this.props=e,this.context=n,this.refs=ms,this.updater=t||gs}var Xa=qa.prototype=new vs;Xa.constructor=qa;hs(Xa,ut.prototype);Xa.isPureReactComponent=!0;var Zi=Array.isArray,ys=Object.prototype.hasOwnProperty,Za={current:null},bs={key:!0,ref:!0,__self:!0,__source:!0};function xs(e,n,t){var r,o={},a=null,i=null;if(n!=null)for(r in n.ref!==void 0&&(i=n.ref),n.key!==void 0&&(a=""+n.key),n)ys.call(n,r)&&!bs.hasOwnProperty(r)&&(o[r]=n[r]);var l=arguments.length-2;if(l===1)o.children=t;else if(1<l){for(var s=Array(l),c=0;c<l;c++)s[c]=arguments[c+2];o.children=s}if(e&&e.defaultProps)for(r in l=e.defaultProps,l)o[r]===void 0&&(o[r]=l[r]);return{$$typeof:nr,type:e,key:a,ref:i,props:o,_owner:Za.current}}function Ry(e,n){return{$$typeof:nr,type:e.type,key:n,ref:e.ref,props:e.props,_owner:e._owner}}function ei(e){return typeof e=="object"&&e!==null&&e.$$typeof===nr}function Wy(e){var n={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(t){return n[t]})}var el=/\/+/g;function Po(e,n){return typeof e=="object"&&e!==null&&e.key!=null?Wy(""+e.key):n.toString(36)}function Cr(e,n,t,r,o){var a=typeof e;(a==="undefined"||a==="boolean")&&(e=null);var i=!1;if(e===null)i=!0;else switch(a){case"string":case"number":i=!0;break;case"object":switch(e.$$typeof){case nr:case Fy:i=!0}}if(i)return i=e,o=o(i),e=r===""?"."+Po(i,0):r,Zi(o)?(t="",e!=null&&(t=e.replace(el,"$&/")+"/"),Cr(o,n,t,"",function(c){return c})):o!=null&&(ei(o)&&(o=Ry(o,t+(!o.key||i&&i.key===o.key?"":(""+o.key).replace(el,"$&/")+"/")+e)),n.push(o)),1;if(i=0,r=r===""?".":r+":",Zi(e))for(var l=0;l<e.length;l++){a=e[l];var s=r+Po(a,l);i+=Cr(a,n,t,s,o)}else if(s=Ay(e),typeof s=="function")for(e=s.call(e),l=0;!(a=e.next()).done;)a=a.value,s=r+Po(a,l++),i+=Cr(a,n,t,s,o);else if(a==="object")throw n=String(e),Error("Objects are not valid as a React child (found: "+(n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n)+"). If you meant to render a collection of children, use an array instead.");return i}function cr(e,n,t){if(e==null)return e;var r=[],o=0;return Cr(e,r,"","",function(a){return n.call(t,a,o++)}),r}function Uy(e){if(e._status===-1){var n=e._result;n=n(),n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var ce={current:null},jr={transition:null},Gy={ReactCurrentDispatcher:ce,ReactCurrentBatchConfig:jr,ReactCurrentOwner:Za};function ws(){throw Error("act(...) is not supported in production builds of React.")}P.Children={map:cr,forEach:function(e,n,t){cr(e,function(){n.apply(this,arguments)},t)},count:function(e){var n=0;return cr(e,function(){n++}),n},toArray:function(e){return cr(e,function(n){return n})||[]},only:function(e){if(!ei(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};P.Component=ut;P.Fragment=Py;P.Profiler=My;P.PureComponent=qa;P.StrictMode=Ny;P.Suspense=Ly;P.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Gy;P.act=ws;P.cloneElement=function(e,n,t){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=hs({},e.props),o=e.key,a=e.ref,i=e._owner;if(n!=null){if(n.ref!==void 0&&(a=n.ref,i=Za.current),n.key!==void 0&&(o=""+n.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(s in n)ys.call(n,s)&&!bs.hasOwnProperty(s)&&(r[s]=n[s]===void 0&&l!==void 0?l[s]:n[s])}var s=arguments.length-2;if(s===1)r.children=t;else if(1<s){l=Array(s);for(var c=0;c<s;c++)l[c]=arguments[c+2];r.children=l}return{$$typeof:nr,type:e.type,key:o,ref:a,props:r,_owner:i}};P.createContext=function(e){return e={$$typeof:Iy,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:zy,_context:e},e.Consumer=e};P.createElement=xs;P.createFactory=function(e){var n=xs.bind(null,e);return n.type=e,n};P.createRef=function(){return{current:null}};P.forwardRef=function(e){return{$$typeof:Oy,render:e}};P.isValidElement=ei;P.lazy=function(e){return{$$typeof:By,_payload:{_status:-1,_result:e},_init:Uy}};P.memo=function(e,n){return{$$typeof:Dy,type:e,compare:n===void 0?null:n}};P.startTransition=function(e){var n=jr.transition;jr.transition={};try{e()}finally{jr.transition=n}};P.unstable_act=ws;P.useCallback=function(e,n){return ce.current.useCallback(e,n)};P.useContext=function(e){return ce.current.useContext(e)};P.useDebugValue=function(){};P.useDeferredValue=function(e){return ce.current.useDeferredValue(e)};P.useEffect=function(e,n){return ce.current.useEffect(e,n)};P.useId=function(){return ce.current.useId()};P.useImperativeHandle=function(e,n,t){return ce.current.useImperativeHandle(e,n,t)};P.useInsertionEffect=function(e,n){return ce.current.useInsertionEffect(e,n)};P.useLayoutEffect=function(e,n){return ce.current.useLayoutEffect(e,n)};P.useMemo=function(e,n){return ce.current.useMemo(e,n)};P.useReducer=function(e,n,t){return ce.current.useReducer(e,n,t)};P.useRef=function(e){return ce.current.useRef(e)};P.useState=function(e){return ce.current.useState(e)};P.useSyncExternalStore=function(e,n,t){return ce.current.useSyncExternalStore(e,n,t)};P.useTransition=function(){return ce.current.useTransition()};P.version="18.3.1";fs.exports=P;var D=fs.exports;/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Hy=D,Vy=Symbol.for("react.element"),Qy=Symbol.for("react.fragment"),Ky=Object.prototype.hasOwnProperty,Yy=Hy.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Jy={key:!0,ref:!0,__self:!0,__source:!0};function ks(e,n,t){var r,o={},a=null,i=null;t!==void 0&&(a=""+t),n.key!==void 0&&(a=""+n.key),n.ref!==void 0&&(i=n.ref);for(r in n)Ky.call(n,r)&&!Jy.hasOwnProperty(r)&&(o[r]=n[r]);if(e&&e.defaultProps)for(r in n=e.defaultProps,n)o[r]===void 0&&(o[r]=n[r]);return{$$typeof:Vy,type:e,key:a,ref:i,props:o,_owner:Yy.current}}po.Fragment=Qy;po.jsx=ks;po.jsxs=ks;ps.exports=po;var d=ps.exports,Ss={exports:{}},ke={},_s={exports:{}},$s={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function n($,T){var F=$.length;$.push(T);e:for(;0<F;){var V=F-1>>>1,q=$[V];if(0<o(q,T))$[V]=T,$[F]=q,F=V;else break e}}function t($){return $.length===0?null:$[0]}function r($){if($.length===0)return null;var T=$[0],F=$.pop();if(F!==T){$[0]=F;e:for(var V=0,q=$.length,lr=q>>>1;V<lr;){var wn=2*(V+1)-1,Fo=$[wn],kn=wn+1,sr=$[kn];if(0>o(Fo,F))kn<q&&0>o(sr,Fo)?($[V]=sr,$[kn]=F,V=kn):($[V]=Fo,$[wn]=F,V=wn);else if(kn<q&&0>o(sr,F))$[V]=sr,$[kn]=F,V=kn;else break e}}return T}function o($,T){var F=$.sortIndex-T.sortIndex;return F!==0?F:$.id-T.id}if(typeof performance=="object"&&typeof performance.now=="function"){var a=performance;e.unstable_now=function(){return a.now()}}else{var i=Date,l=i.now();e.unstable_now=function(){return i.now()-l}}var s=[],c=[],p=1,g=null,m=3,y=!1,S=!1,x=!1,j=typeof setTimeout=="function"?setTimeout:null,f=typeof clearTimeout=="function"?clearTimeout:null,u=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function h($){for(var T=t(c);T!==null;){if(T.callback===null)r(c);else if(T.startTime<=$)r(c),T.sortIndex=T.expirationTime,n(s,T);else break;T=t(c)}}function b($){if(x=!1,h($),!S)if(t(s)!==null)S=!0,jo(v);else{var T=t(c);T!==null&&To(b,T.startTime-$)}}function v($,T){S=!1,x&&(x=!1,f(E),E=-1),y=!0;var F=m;try{for(h(T),g=t(s);g!==null&&(!(g.expirationTime>T)||$&&!Fe());){var V=g.callback;if(typeof V=="function"){g.callback=null,m=g.priorityLevel;var q=V(g.expirationTime<=T);T=e.unstable_now(),typeof q=="function"?g.callback=q:g===t(s)&&r(s),h(T)}else r(s);g=t(s)}if(g!==null)var lr=!0;else{var wn=t(c);wn!==null&&To(b,wn.startTime-T),lr=!1}return lr}finally{g=null,m=F,y=!1}}var w=!1,C=null,E=-1,H=5,N=-1;function Fe(){return!(e.unstable_now()-N<H)}function gt(){if(C!==null){var $=e.unstable_now();N=$;var T=!0;try{T=C(!0,$)}finally{T?ht():(w=!1,C=null)}}else w=!1}var ht;if(typeof u=="function")ht=function(){u(gt)};else if(typeof MessageChannel<"u"){var qi=new MessageChannel,Ty=qi.port2;qi.port1.onmessage=gt,ht=function(){Ty.postMessage(null)}}else ht=function(){j(gt,0)};function jo($){C=$,w||(w=!0,ht())}function To($,T){E=j(function(){$(e.unstable_now())},T)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function($){$.callback=null},e.unstable_continueExecution=function(){S||y||(S=!0,jo(v))},e.unstable_forceFrameRate=function($){0>$||125<$?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):H=0<$?Math.floor(1e3/$):5},e.unstable_getCurrentPriorityLevel=function(){return m},e.unstable_getFirstCallbackNode=function(){return t(s)},e.unstable_next=function($){switch(m){case 1:case 2:case 3:var T=3;break;default:T=m}var F=m;m=T;try{return $()}finally{m=F}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function($,T){switch($){case 1:case 2:case 3:case 4:case 5:break;default:$=3}var F=m;m=$;try{return T()}finally{m=F}},e.unstable_scheduleCallback=function($,T,F){var V=e.unstable_now();switch(typeof F=="object"&&F!==null?(F=F.delay,F=typeof F=="number"&&0<F?V+F:V):F=V,$){case 1:var q=-1;break;case 2:q=250;break;case 5:q=1073741823;break;case 4:q=1e4;break;default:q=5e3}return q=F+q,$={id:p++,callback:T,priorityLevel:$,startTime:F,expirationTime:q,sortIndex:-1},F>V?($.sortIndex=F,n(c,$),t(s)===null&&$===t(c)&&(x?(f(E),E=-1):x=!0,To(b,F-V))):($.sortIndex=q,n(s,$),S||y||(S=!0,jo(v))),$},e.unstable_shouldYield=Fe,e.unstable_wrapCallback=function($){var T=m;return function(){var F=m;m=T;try{return $.apply(this,arguments)}finally{m=F}}}})($s);_s.exports=$s;var qy=_s.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Xy=D,we=qy;function k(e){for(var n="https://reactjs.org/docs/error-decoder.html?invariant="+e,t=1;t<arguments.length;t++)n+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Es=new Set,Lt={};function In(e,n){tt(e,n),tt(e+"Capture",n)}function tt(e,n){for(Lt[e]=n,e=0;e<n.length;e++)Es.add(n[e])}var Ye=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),oa=Object.prototype.hasOwnProperty,Zy=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,nl={},tl={};function eb(e){return oa.call(tl,e)?!0:oa.call(nl,e)?!1:Zy.test(e)?tl[e]=!0:(nl[e]=!0,!1)}function nb(e,n,t,r){if(t!==null&&t.type===0)return!1;switch(typeof n){case"function":case"symbol":return!0;case"boolean":return r?!1:t!==null?!t.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function tb(e,n,t,r){if(n===null||typeof n>"u"||nb(e,n,t,r))return!0;if(r)return!1;if(t!==null)switch(t.type){case 3:return!n;case 4:return n===!1;case 5:return isNaN(n);case 6:return isNaN(n)||1>n}return!1}function ue(e,n,t,r,o,a,i){this.acceptsBooleans=n===2||n===3||n===4,this.attributeName=r,this.attributeNamespace=o,this.mustUseProperty=t,this.propertyName=e,this.type=n,this.sanitizeURL=a,this.removeEmptyString=i}var te={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){te[e]=new ue(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var n=e[0];te[n]=new ue(n,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){te[e]=new ue(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){te[e]=new ue(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){te[e]=new ue(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){te[e]=new ue(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){te[e]=new ue(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){te[e]=new ue(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){te[e]=new ue(e,5,!1,e.toLowerCase(),null,!1,!1)});var ni=/[\-:]([a-z])/g;function ti(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var n=e.replace(ni,ti);te[n]=new ue(n,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var n=e.replace(ni,ti);te[n]=new ue(n,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var n=e.replace(ni,ti);te[n]=new ue(n,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){te[e]=new ue(e,1,!1,e.toLowerCase(),null,!1,!1)});te.xlinkHref=new ue("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){te[e]=new ue(e,1,!1,e.toLowerCase(),null,!0,!0)});function ri(e,n,t,r){var o=te.hasOwnProperty(n)?te[n]:null;(o!==null?o.type!==0:r||!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(tb(n,t,o,r)&&(t=null),r||o===null?eb(n)&&(t===null?e.removeAttribute(n):e.setAttribute(n,""+t)):o.mustUseProperty?e[o.propertyName]=t===null?o.type===3?!1:"":t:(n=o.attributeName,r=o.attributeNamespace,t===null?e.removeAttribute(n):(o=o.type,t=o===3||o===4&&t===!0?"":""+t,r?e.setAttributeNS(r,n,t):e.setAttribute(n,t))))}var Ze=Xy.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ur=Symbol.for("react.element"),Dn=Symbol.for("react.portal"),Bn=Symbol.for("react.fragment"),oi=Symbol.for("react.strict_mode"),aa=Symbol.for("react.profiler"),Cs=Symbol.for("react.provider"),js=Symbol.for("react.context"),ai=Symbol.for("react.forward_ref"),ia=Symbol.for("react.suspense"),la=Symbol.for("react.suspense_list"),ii=Symbol.for("react.memo"),nn=Symbol.for("react.lazy"),Ts=Symbol.for("react.offscreen"),rl=Symbol.iterator;function mt(e){return e===null||typeof e!="object"?null:(e=rl&&e[rl]||e["@@iterator"],typeof e=="function"?e:null)}var U=Object.assign,No;function _t(e){if(No===void 0)try{throw Error()}catch(t){var n=t.stack.trim().match(/\n( *(at )?)/);No=n&&n[1]||""}return`
`+No+e}var Mo=!1;function zo(e,n){if(!e||Mo)return"";Mo=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(n)if(n=function(){throw Error()},Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(n,[])}catch(c){var r=c}Reflect.construct(e,[],n)}else{try{n.call()}catch(c){r=c}e.call(n.prototype)}else{try{throw Error()}catch(c){r=c}e()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var o=c.stack.split(`
`),a=r.stack.split(`
`),i=o.length-1,l=a.length-1;1<=i&&0<=l&&o[i]!==a[l];)l--;for(;1<=i&&0<=l;i--,l--)if(o[i]!==a[l]){if(i!==1||l!==1)do if(i--,l--,0>l||o[i]!==a[l]){var s=`
`+o[i].replace(" at new "," at ");return e.displayName&&s.includes("<anonymous>")&&(s=s.replace("<anonymous>",e.displayName)),s}while(1<=i&&0<=l);break}}}finally{Mo=!1,Error.prepareStackTrace=t}return(e=e?e.displayName||e.name:"")?_t(e):""}function rb(e){switch(e.tag){case 5:return _t(e.type);case 16:return _t("Lazy");case 13:return _t("Suspense");case 19:return _t("SuspenseList");case 0:case 2:case 15:return e=zo(e.type,!1),e;case 11:return e=zo(e.type.render,!1),e;case 1:return e=zo(e.type,!0),e;default:return""}}function sa(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Bn:return"Fragment";case Dn:return"Portal";case aa:return"Profiler";case oi:return"StrictMode";case ia:return"Suspense";case la:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case js:return(e.displayName||"Context")+".Consumer";case Cs:return(e._context.displayName||"Context")+".Provider";case ai:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case ii:return n=e.displayName||null,n!==null?n:sa(e.type)||"Memo";case nn:n=e._payload,e=e._init;try{return sa(e(n))}catch{}}return null}function ob(e){var n=e.type;switch(e.tag){case 24:return"Cache";case 9:return(n.displayName||"Context")+".Consumer";case 10:return(n._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=n.render,e=e.displayName||e.name||"",n.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return n;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return sa(n);case 8:return n===oi?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n}return null}function mn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Fs(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function ab(e){var n=Fs(e)?"checked":"value",t=Object.getOwnPropertyDescriptor(e.constructor.prototype,n),r=""+e[n];if(!e.hasOwnProperty(n)&&typeof t<"u"&&typeof t.get=="function"&&typeof t.set=="function"){var o=t.get,a=t.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return o.call(this)},set:function(i){r=""+i,a.call(this,i)}}),Object.defineProperty(e,n,{enumerable:t.enumerable}),{getValue:function(){return r},setValue:function(i){r=""+i},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function dr(e){e._valueTracker||(e._valueTracker=ab(e))}function Ps(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var t=n.getValue(),r="";return e&&(r=Fs(e)?e.checked?"true":"false":e.value),e=r,e!==t?(n.setValue(e),!0):!1}function Ar(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function ca(e,n){var t=n.checked;return U({},n,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:t??e._wrapperState.initialChecked})}function ol(e,n){var t=n.defaultValue==null?"":n.defaultValue,r=n.checked!=null?n.checked:n.defaultChecked;t=mn(n.value!=null?n.value:t),e._wrapperState={initialChecked:r,initialValue:t,controlled:n.type==="checkbox"||n.type==="radio"?n.checked!=null:n.value!=null}}function Ns(e,n){n=n.checked,n!=null&&ri(e,"checked",n,!1)}function ua(e,n){Ns(e,n);var t=mn(n.value),r=n.type;if(t!=null)r==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+t):e.value!==""+t&&(e.value=""+t);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}n.hasOwnProperty("value")?da(e,n.type,t):n.hasOwnProperty("defaultValue")&&da(e,n.type,mn(n.defaultValue)),n.checked==null&&n.defaultChecked!=null&&(e.defaultChecked=!!n.defaultChecked)}function al(e,n,t){if(n.hasOwnProperty("value")||n.hasOwnProperty("defaultValue")){var r=n.type;if(!(r!=="submit"&&r!=="reset"||n.value!==void 0&&n.value!==null))return;n=""+e._wrapperState.initialValue,t||n===e.value||(e.value=n),e.defaultValue=n}t=e.name,t!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,t!==""&&(e.name=t)}function da(e,n,t){(n!=="number"||Ar(e.ownerDocument)!==e)&&(t==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+t&&(e.defaultValue=""+t))}var $t=Array.isArray;function Jn(e,n,t,r){if(e=e.options,n){n={};for(var o=0;o<t.length;o++)n["$"+t[o]]=!0;for(t=0;t<e.length;t++)o=n.hasOwnProperty("$"+e[t].value),e[t].selected!==o&&(e[t].selected=o),o&&r&&(e[t].defaultSelected=!0)}else{for(t=""+mn(t),n=null,o=0;o<e.length;o++){if(e[o].value===t){e[o].selected=!0,r&&(e[o].defaultSelected=!0);return}n!==null||e[o].disabled||(n=e[o])}n!==null&&(n.selected=!0)}}function pa(e,n){if(n.dangerouslySetInnerHTML!=null)throw Error(k(91));return U({},n,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function il(e,n){var t=n.value;if(t==null){if(t=n.children,n=n.defaultValue,t!=null){if(n!=null)throw Error(k(92));if($t(t)){if(1<t.length)throw Error(k(93));t=t[0]}n=t}n==null&&(n=""),t=n}e._wrapperState={initialValue:mn(t)}}function Ms(e,n){var t=mn(n.value),r=mn(n.defaultValue);t!=null&&(t=""+t,t!==e.value&&(e.value=t),n.defaultValue==null&&e.defaultValue!==t&&(e.defaultValue=t)),r!=null&&(e.defaultValue=""+r)}function ll(e){var n=e.textContent;n===e._wrapperState.initialValue&&n!==""&&n!==null&&(e.value=n)}function zs(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function fa(e,n){return e==null||e==="http://www.w3.org/1999/xhtml"?zs(n):e==="http://www.w3.org/2000/svg"&&n==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var pr,Is=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(n,t,r,o){MSApp.execUnsafeLocalFunction(function(){return e(n,t,r,o)})}:e}(function(e,n){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=n;else{for(pr=pr||document.createElement("div"),pr.innerHTML="<svg>"+n.valueOf().toString()+"</svg>",n=pr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;n.firstChild;)e.appendChild(n.firstChild)}});function Dt(e,n){if(n){var t=e.firstChild;if(t&&t===e.lastChild&&t.nodeType===3){t.nodeValue=n;return}}e.textContent=n}var jt={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},ib=["Webkit","ms","Moz","O"];Object.keys(jt).forEach(function(e){ib.forEach(function(n){n=n+e.charAt(0).toUpperCase()+e.substring(1),jt[n]=jt[e]})});function Os(e,n,t){return n==null||typeof n=="boolean"||n===""?"":t||typeof n!="number"||n===0||jt.hasOwnProperty(e)&&jt[e]?(""+n).trim():n+"px"}function Ls(e,n){e=e.style;for(var t in n)if(n.hasOwnProperty(t)){var r=t.indexOf("--")===0,o=Os(t,n[t],r);t==="float"&&(t="cssFloat"),r?e.setProperty(t,o):e[t]=o}}var lb=U({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ga(e,n){if(n){if(lb[e]&&(n.children!=null||n.dangerouslySetInnerHTML!=null))throw Error(k(137,e));if(n.dangerouslySetInnerHTML!=null){if(n.children!=null)throw Error(k(60));if(typeof n.dangerouslySetInnerHTML!="object"||!("__html"in n.dangerouslySetInnerHTML))throw Error(k(61))}if(n.style!=null&&typeof n.style!="object")throw Error(k(62))}}function ha(e,n){if(e.indexOf("-")===-1)return typeof n.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ma=null;function li(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var va=null,qn=null,Xn=null;function sl(e){if(e=or(e)){if(typeof va!="function")throw Error(k(280));var n=e.stateNode;n&&(n=vo(n),va(e.stateNode,e.type,n))}}function Ds(e){qn?Xn?Xn.push(e):Xn=[e]:qn=e}function Bs(){if(qn){var e=qn,n=Xn;if(Xn=qn=null,sl(e),n)for(e=0;e<n.length;e++)sl(n[e])}}function As(e,n){return e(n)}function Rs(){}var Io=!1;function Ws(e,n,t){if(Io)return e(n,t);Io=!0;try{return As(e,n,t)}finally{Io=!1,(qn!==null||Xn!==null)&&(Rs(),Bs())}}function Bt(e,n){var t=e.stateNode;if(t===null)return null;var r=vo(t);if(r===null)return null;t=r[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(t&&typeof t!="function")throw Error(k(231,n,typeof t));return t}var ya=!1;if(Ye)try{var vt={};Object.defineProperty(vt,"passive",{get:function(){ya=!0}}),window.addEventListener("test",vt,vt),window.removeEventListener("test",vt,vt)}catch{ya=!1}function sb(e,n,t,r,o,a,i,l,s){var c=Array.prototype.slice.call(arguments,3);try{n.apply(t,c)}catch(p){this.onError(p)}}var Tt=!1,Rr=null,Wr=!1,ba=null,cb={onError:function(e){Tt=!0,Rr=e}};function ub(e,n,t,r,o,a,i,l,s){Tt=!1,Rr=null,sb.apply(cb,arguments)}function db(e,n,t,r,o,a,i,l,s){if(ub.apply(this,arguments),Tt){if(Tt){var c=Rr;Tt=!1,Rr=null}else throw Error(k(198));Wr||(Wr=!0,ba=c)}}function On(e){var n=e,t=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,n.flags&4098&&(t=n.return),e=n.return;while(e)}return n.tag===3?t:null}function Us(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function cl(e){if(On(e)!==e)throw Error(k(188))}function pb(e){var n=e.alternate;if(!n){if(n=On(e),n===null)throw Error(k(188));return n!==e?null:e}for(var t=e,r=n;;){var o=t.return;if(o===null)break;var a=o.alternate;if(a===null){if(r=o.return,r!==null){t=r;continue}break}if(o.child===a.child){for(a=o.child;a;){if(a===t)return cl(o),e;if(a===r)return cl(o),n;a=a.sibling}throw Error(k(188))}if(t.return!==r.return)t=o,r=a;else{for(var i=!1,l=o.child;l;){if(l===t){i=!0,t=o,r=a;break}if(l===r){i=!0,r=o,t=a;break}l=l.sibling}if(!i){for(l=a.child;l;){if(l===t){i=!0,t=a,r=o;break}if(l===r){i=!0,r=a,t=o;break}l=l.sibling}if(!i)throw Error(k(189))}}if(t.alternate!==r)throw Error(k(190))}if(t.tag!==3)throw Error(k(188));return t.stateNode.current===t?e:n}function Gs(e){return e=pb(e),e!==null?Hs(e):null}function Hs(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var n=Hs(e);if(n!==null)return n;e=e.sibling}return null}var Vs=we.unstable_scheduleCallback,ul=we.unstable_cancelCallback,fb=we.unstable_shouldYield,gb=we.unstable_requestPaint,Q=we.unstable_now,hb=we.unstable_getCurrentPriorityLevel,si=we.unstable_ImmediatePriority,Qs=we.unstable_UserBlockingPriority,Ur=we.unstable_NormalPriority,mb=we.unstable_LowPriority,Ks=we.unstable_IdlePriority,fo=null,Re=null;function vb(e){if(Re&&typeof Re.onCommitFiberRoot=="function")try{Re.onCommitFiberRoot(fo,e,void 0,(e.current.flags&128)===128)}catch{}}var Ie=Math.clz32?Math.clz32:xb,yb=Math.log,bb=Math.LN2;function xb(e){return e>>>=0,e===0?32:31-(yb(e)/bb|0)|0}var fr=64,gr=4194304;function Et(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Gr(e,n){var t=e.pendingLanes;if(t===0)return 0;var r=0,o=e.suspendedLanes,a=e.pingedLanes,i=t&268435455;if(i!==0){var l=i&~o;l!==0?r=Et(l):(a&=i,a!==0&&(r=Et(a)))}else i=t&~o,i!==0?r=Et(i):a!==0&&(r=Et(a));if(r===0)return 0;if(n!==0&&n!==r&&!(n&o)&&(o=r&-r,a=n&-n,o>=a||o===16&&(a&4194240)!==0))return n;if(r&4&&(r|=t&16),n=e.entangledLanes,n!==0)for(e=e.entanglements,n&=r;0<n;)t=31-Ie(n),o=1<<t,r|=e[t],n&=~o;return r}function wb(e,n){switch(e){case 1:case 2:case 4:return n+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function kb(e,n){for(var t=e.suspendedLanes,r=e.pingedLanes,o=e.expirationTimes,a=e.pendingLanes;0<a;){var i=31-Ie(a),l=1<<i,s=o[i];s===-1?(!(l&t)||l&r)&&(o[i]=wb(l,n)):s<=n&&(e.expiredLanes|=l),a&=~l}}function xa(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Ys(){var e=fr;return fr<<=1,!(fr&4194240)&&(fr=64),e}function Oo(e){for(var n=[],t=0;31>t;t++)n.push(e);return n}function tr(e,n,t){e.pendingLanes|=n,n!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,n=31-Ie(n),e[n]=t}function Sb(e,n){var t=e.pendingLanes&~n;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=n,e.mutableReadLanes&=n,e.entangledLanes&=n,n=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<t;){var o=31-Ie(t),a=1<<o;n[o]=0,r[o]=-1,e[o]=-1,t&=~a}}function ci(e,n){var t=e.entangledLanes|=n;for(e=e.entanglements;t;){var r=31-Ie(t),o=1<<r;o&n|e[r]&n&&(e[r]|=n),t&=~o}}var I=0;function Js(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var qs,ui,Xs,Zs,ec,wa=!1,hr=[],sn=null,cn=null,un=null,At=new Map,Rt=new Map,rn=[],_b="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function dl(e,n){switch(e){case"focusin":case"focusout":sn=null;break;case"dragenter":case"dragleave":cn=null;break;case"mouseover":case"mouseout":un=null;break;case"pointerover":case"pointerout":At.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":Rt.delete(n.pointerId)}}function yt(e,n,t,r,o,a){return e===null||e.nativeEvent!==a?(e={blockedOn:n,domEventName:t,eventSystemFlags:r,nativeEvent:a,targetContainers:[o]},n!==null&&(n=or(n),n!==null&&ui(n)),e):(e.eventSystemFlags|=r,n=e.targetContainers,o!==null&&n.indexOf(o)===-1&&n.push(o),e)}function $b(e,n,t,r,o){switch(n){case"focusin":return sn=yt(sn,e,n,t,r,o),!0;case"dragenter":return cn=yt(cn,e,n,t,r,o),!0;case"mouseover":return un=yt(un,e,n,t,r,o),!0;case"pointerover":var a=o.pointerId;return At.set(a,yt(At.get(a)||null,e,n,t,r,o)),!0;case"gotpointercapture":return a=o.pointerId,Rt.set(a,yt(Rt.get(a)||null,e,n,t,r,o)),!0}return!1}function nc(e){var n=$n(e.target);if(n!==null){var t=On(n);if(t!==null){if(n=t.tag,n===13){if(n=Us(t),n!==null){e.blockedOn=n,ec(e.priority,function(){Xs(t)});return}}else if(n===3&&t.stateNode.current.memoizedState.isDehydrated){e.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Tr(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var t=ka(e.domEventName,e.eventSystemFlags,n[0],e.nativeEvent);if(t===null){t=e.nativeEvent;var r=new t.constructor(t.type,t);ma=r,t.target.dispatchEvent(r),ma=null}else return n=or(t),n!==null&&ui(n),e.blockedOn=t,!1;n.shift()}return!0}function pl(e,n,t){Tr(e)&&t.delete(n)}function Eb(){wa=!1,sn!==null&&Tr(sn)&&(sn=null),cn!==null&&Tr(cn)&&(cn=null),un!==null&&Tr(un)&&(un=null),At.forEach(pl),Rt.forEach(pl)}function bt(e,n){e.blockedOn===n&&(e.blockedOn=null,wa||(wa=!0,we.unstable_scheduleCallback(we.unstable_NormalPriority,Eb)))}function Wt(e){function n(o){return bt(o,e)}if(0<hr.length){bt(hr[0],e);for(var t=1;t<hr.length;t++){var r=hr[t];r.blockedOn===e&&(r.blockedOn=null)}}for(sn!==null&&bt(sn,e),cn!==null&&bt(cn,e),un!==null&&bt(un,e),At.forEach(n),Rt.forEach(n),t=0;t<rn.length;t++)r=rn[t],r.blockedOn===e&&(r.blockedOn=null);for(;0<rn.length&&(t=rn[0],t.blockedOn===null);)nc(t),t.blockedOn===null&&rn.shift()}var Zn=Ze.ReactCurrentBatchConfig,Hr=!0;function Cb(e,n,t,r){var o=I,a=Zn.transition;Zn.transition=null;try{I=1,di(e,n,t,r)}finally{I=o,Zn.transition=a}}function jb(e,n,t,r){var o=I,a=Zn.transition;Zn.transition=null;try{I=4,di(e,n,t,r)}finally{I=o,Zn.transition=a}}function di(e,n,t,r){if(Hr){var o=ka(e,n,t,r);if(o===null)Vo(e,n,r,Vr,t),dl(e,r);else if($b(o,e,n,t,r))r.stopPropagation();else if(dl(e,r),n&4&&-1<_b.indexOf(e)){for(;o!==null;){var a=or(o);if(a!==null&&qs(a),a=ka(e,n,t,r),a===null&&Vo(e,n,r,Vr,t),a===o)break;o=a}o!==null&&r.stopPropagation()}else Vo(e,n,r,null,t)}}var Vr=null;function ka(e,n,t,r){if(Vr=null,e=li(r),e=$n(e),e!==null)if(n=On(e),n===null)e=null;else if(t=n.tag,t===13){if(e=Us(n),e!==null)return e;e=null}else if(t===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null);return Vr=e,null}function tc(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(hb()){case si:return 1;case Qs:return 4;case Ur:case mb:return 16;case Ks:return 536870912;default:return 16}default:return 16}}var an=null,pi=null,Fr=null;function rc(){if(Fr)return Fr;var e,n=pi,t=n.length,r,o="value"in an?an.value:an.textContent,a=o.length;for(e=0;e<t&&n[e]===o[e];e++);var i=t-e;for(r=1;r<=i&&n[t-r]===o[a-r];r++);return Fr=o.slice(e,1<r?1-r:void 0)}function Pr(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function mr(){return!0}function fl(){return!1}function Se(e){function n(t,r,o,a,i){this._reactName=t,this._targetInst=o,this.type=r,this.nativeEvent=a,this.target=i,this.currentTarget=null;for(var l in e)e.hasOwnProperty(l)&&(t=e[l],this[l]=t?t(a):a[l]);return this.isDefaultPrevented=(a.defaultPrevented!=null?a.defaultPrevented:a.returnValue===!1)?mr:fl,this.isPropagationStopped=fl,this}return U(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=mr)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=mr)},persist:function(){},isPersistent:mr}),n}var dt={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},fi=Se(dt),rr=U({},dt,{view:0,detail:0}),Tb=Se(rr),Lo,Do,xt,go=U({},rr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:gi,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==xt&&(xt&&e.type==="mousemove"?(Lo=e.screenX-xt.screenX,Do=e.screenY-xt.screenY):Do=Lo=0,xt=e),Lo)},movementY:function(e){return"movementY"in e?e.movementY:Do}}),gl=Se(go),Fb=U({},go,{dataTransfer:0}),Pb=Se(Fb),Nb=U({},rr,{relatedTarget:0}),Bo=Se(Nb),Mb=U({},dt,{animationName:0,elapsedTime:0,pseudoElement:0}),zb=Se(Mb),Ib=U({},dt,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Ob=Se(Ib),Lb=U({},dt,{data:0}),hl=Se(Lb),Db={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Bb={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Ab={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Rb(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=Ab[e])?!!n[e]:!1}function gi(){return Rb}var Wb=U({},rr,{key:function(e){if(e.key){var n=Db[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=Pr(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Bb[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:gi,charCode:function(e){return e.type==="keypress"?Pr(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Pr(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Ub=Se(Wb),Gb=U({},go,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),ml=Se(Gb),Hb=U({},rr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:gi}),Vb=Se(Hb),Qb=U({},dt,{propertyName:0,elapsedTime:0,pseudoElement:0}),Kb=Se(Qb),Yb=U({},go,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Jb=Se(Yb),qb=[9,13,27,32],hi=Ye&&"CompositionEvent"in window,Ft=null;Ye&&"documentMode"in document&&(Ft=document.documentMode);var Xb=Ye&&"TextEvent"in window&&!Ft,oc=Ye&&(!hi||Ft&&8<Ft&&11>=Ft),vl=" ",yl=!1;function ac(e,n){switch(e){case"keyup":return qb.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function ic(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var An=!1;function Zb(e,n){switch(e){case"compositionend":return ic(n);case"keypress":return n.which!==32?null:(yl=!0,vl);case"textInput":return e=n.data,e===vl&&yl?null:e;default:return null}}function e1(e,n){if(An)return e==="compositionend"||!hi&&ac(e,n)?(e=rc(),Fr=pi=an=null,An=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return oc&&n.locale!=="ko"?null:n.data;default:return null}}var n1={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function bl(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!n1[e.type]:n==="textarea"}function lc(e,n,t,r){Ds(r),n=Qr(n,"onChange"),0<n.length&&(t=new fi("onChange","change",null,t,r),e.push({event:t,listeners:n}))}var Pt=null,Ut=null;function t1(e){yc(e,0)}function ho(e){var n=Un(e);if(Ps(n))return e}function r1(e,n){if(e==="change")return n}var sc=!1;if(Ye){var Ao;if(Ye){var Ro="oninput"in document;if(!Ro){var xl=document.createElement("div");xl.setAttribute("oninput","return;"),Ro=typeof xl.oninput=="function"}Ao=Ro}else Ao=!1;sc=Ao&&(!document.documentMode||9<document.documentMode)}function wl(){Pt&&(Pt.detachEvent("onpropertychange",cc),Ut=Pt=null)}function cc(e){if(e.propertyName==="value"&&ho(Ut)){var n=[];lc(n,Ut,e,li(e)),Ws(t1,n)}}function o1(e,n,t){e==="focusin"?(wl(),Pt=n,Ut=t,Pt.attachEvent("onpropertychange",cc)):e==="focusout"&&wl()}function a1(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return ho(Ut)}function i1(e,n){if(e==="click")return ho(n)}function l1(e,n){if(e==="input"||e==="change")return ho(n)}function s1(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var Le=typeof Object.is=="function"?Object.is:s1;function Gt(e,n){if(Le(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var t=Object.keys(e),r=Object.keys(n);if(t.length!==r.length)return!1;for(r=0;r<t.length;r++){var o=t[r];if(!oa.call(n,o)||!Le(e[o],n[o]))return!1}return!0}function kl(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Sl(e,n){var t=kl(e);e=0;for(var r;t;){if(t.nodeType===3){if(r=e+t.textContent.length,e<=n&&r>=n)return{node:t,offset:n-e};e=r}e:{for(;t;){if(t.nextSibling){t=t.nextSibling;break e}t=t.parentNode}t=void 0}t=kl(t)}}function uc(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?uc(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function dc(){for(var e=window,n=Ar();n instanceof e.HTMLIFrameElement;){try{var t=typeof n.contentWindow.location.href=="string"}catch{t=!1}if(t)e=n.contentWindow;else break;n=Ar(e.document)}return n}function mi(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}function c1(e){var n=dc(),t=e.focusedElem,r=e.selectionRange;if(n!==t&&t&&t.ownerDocument&&uc(t.ownerDocument.documentElement,t)){if(r!==null&&mi(t)){if(n=r.start,e=r.end,e===void 0&&(e=n),"selectionStart"in t)t.selectionStart=n,t.selectionEnd=Math.min(e,t.value.length);else if(e=(n=t.ownerDocument||document)&&n.defaultView||window,e.getSelection){e=e.getSelection();var o=t.textContent.length,a=Math.min(r.start,o);r=r.end===void 0?a:Math.min(r.end,o),!e.extend&&a>r&&(o=r,r=a,a=o),o=Sl(t,a);var i=Sl(t,r);o&&i&&(e.rangeCount!==1||e.anchorNode!==o.node||e.anchorOffset!==o.offset||e.focusNode!==i.node||e.focusOffset!==i.offset)&&(n=n.createRange(),n.setStart(o.node,o.offset),e.removeAllRanges(),a>r?(e.addRange(n),e.extend(i.node,i.offset)):(n.setEnd(i.node,i.offset),e.addRange(n)))}}for(n=[],e=t;e=e.parentNode;)e.nodeType===1&&n.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof t.focus=="function"&&t.focus(),t=0;t<n.length;t++)e=n[t],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var u1=Ye&&"documentMode"in document&&11>=document.documentMode,Rn=null,Sa=null,Nt=null,_a=!1;function _l(e,n,t){var r=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;_a||Rn==null||Rn!==Ar(r)||(r=Rn,"selectionStart"in r&&mi(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Nt&&Gt(Nt,r)||(Nt=r,r=Qr(Sa,"onSelect"),0<r.length&&(n=new fi("onSelect","select",null,n,t),e.push({event:n,listeners:r}),n.target=Rn)))}function vr(e,n){var t={};return t[e.toLowerCase()]=n.toLowerCase(),t["Webkit"+e]="webkit"+n,t["Moz"+e]="moz"+n,t}var Wn={animationend:vr("Animation","AnimationEnd"),animationiteration:vr("Animation","AnimationIteration"),animationstart:vr("Animation","AnimationStart"),transitionend:vr("Transition","TransitionEnd")},Wo={},pc={};Ye&&(pc=document.createElement("div").style,"AnimationEvent"in window||(delete Wn.animationend.animation,delete Wn.animationiteration.animation,delete Wn.animationstart.animation),"TransitionEvent"in window||delete Wn.transitionend.transition);function mo(e){if(Wo[e])return Wo[e];if(!Wn[e])return e;var n=Wn[e],t;for(t in n)if(n.hasOwnProperty(t)&&t in pc)return Wo[e]=n[t];return e}var fc=mo("animationend"),gc=mo("animationiteration"),hc=mo("animationstart"),mc=mo("transitionend"),vc=new Map,$l="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function yn(e,n){vc.set(e,n),In(n,[e])}for(var Uo=0;Uo<$l.length;Uo++){var Go=$l[Uo],d1=Go.toLowerCase(),p1=Go[0].toUpperCase()+Go.slice(1);yn(d1,"on"+p1)}yn(fc,"onAnimationEnd");yn(gc,"onAnimationIteration");yn(hc,"onAnimationStart");yn("dblclick","onDoubleClick");yn("focusin","onFocus");yn("focusout","onBlur");yn(mc,"onTransitionEnd");tt("onMouseEnter",["mouseout","mouseover"]);tt("onMouseLeave",["mouseout","mouseover"]);tt("onPointerEnter",["pointerout","pointerover"]);tt("onPointerLeave",["pointerout","pointerover"]);In("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));In("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));In("onBeforeInput",["compositionend","keypress","textInput","paste"]);In("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));In("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));In("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ct="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),f1=new Set("cancel close invalid load scroll toggle".split(" ").concat(Ct));function El(e,n,t){var r=e.type||"unknown-event";e.currentTarget=t,db(r,n,void 0,e),e.currentTarget=null}function yc(e,n){n=(n&4)!==0;for(var t=0;t<e.length;t++){var r=e[t],o=r.event;r=r.listeners;e:{var a=void 0;if(n)for(var i=r.length-1;0<=i;i--){var l=r[i],s=l.instance,c=l.currentTarget;if(l=l.listener,s!==a&&o.isPropagationStopped())break e;El(o,l,c),a=s}else for(i=0;i<r.length;i++){if(l=r[i],s=l.instance,c=l.currentTarget,l=l.listener,s!==a&&o.isPropagationStopped())break e;El(o,l,c),a=s}}}if(Wr)throw e=ba,Wr=!1,ba=null,e}function L(e,n){var t=n[Ta];t===void 0&&(t=n[Ta]=new Set);var r=e+"__bubble";t.has(r)||(bc(n,e,2,!1),t.add(r))}function Ho(e,n,t){var r=0;n&&(r|=4),bc(t,e,r,n)}var yr="_reactListening"+Math.random().toString(36).slice(2);function Ht(e){if(!e[yr]){e[yr]=!0,Es.forEach(function(t){t!=="selectionchange"&&(f1.has(t)||Ho(t,!1,e),Ho(t,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[yr]||(n[yr]=!0,Ho("selectionchange",!1,n))}}function bc(e,n,t,r){switch(tc(n)){case 1:var o=Cb;break;case 4:o=jb;break;default:o=di}t=o.bind(null,n,t,e),o=void 0,!ya||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(o=!0),r?o!==void 0?e.addEventListener(n,t,{capture:!0,passive:o}):e.addEventListener(n,t,!0):o!==void 0?e.addEventListener(n,t,{passive:o}):e.addEventListener(n,t,!1)}function Vo(e,n,t,r,o){var a=r;if(!(n&1)&&!(n&2)&&r!==null)e:for(;;){if(r===null)return;var i=r.tag;if(i===3||i===4){var l=r.stateNode.containerInfo;if(l===o||l.nodeType===8&&l.parentNode===o)break;if(i===4)for(i=r.return;i!==null;){var s=i.tag;if((s===3||s===4)&&(s=i.stateNode.containerInfo,s===o||s.nodeType===8&&s.parentNode===o))return;i=i.return}for(;l!==null;){if(i=$n(l),i===null)return;if(s=i.tag,s===5||s===6){r=a=i;continue e}l=l.parentNode}}r=r.return}Ws(function(){var c=a,p=li(t),g=[];e:{var m=vc.get(e);if(m!==void 0){var y=fi,S=e;switch(e){case"keypress":if(Pr(t)===0)break e;case"keydown":case"keyup":y=Ub;break;case"focusin":S="focus",y=Bo;break;case"focusout":S="blur",y=Bo;break;case"beforeblur":case"afterblur":y=Bo;break;case"click":if(t.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":y=gl;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":y=Pb;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":y=Vb;break;case fc:case gc:case hc:y=zb;break;case mc:y=Kb;break;case"scroll":y=Tb;break;case"wheel":y=Jb;break;case"copy":case"cut":case"paste":y=Ob;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":y=ml}var x=(n&4)!==0,j=!x&&e==="scroll",f=x?m!==null?m+"Capture":null:m;x=[];for(var u=c,h;u!==null;){h=u;var b=h.stateNode;if(h.tag===5&&b!==null&&(h=b,f!==null&&(b=Bt(u,f),b!=null&&x.push(Vt(u,b,h)))),j)break;u=u.return}0<x.length&&(m=new y(m,S,null,t,p),g.push({event:m,listeners:x}))}}if(!(n&7)){e:{if(m=e==="mouseover"||e==="pointerover",y=e==="mouseout"||e==="pointerout",m&&t!==ma&&(S=t.relatedTarget||t.fromElement)&&($n(S)||S[Je]))break e;if((y||m)&&(m=p.window===p?p:(m=p.ownerDocument)?m.defaultView||m.parentWindow:window,y?(S=t.relatedTarget||t.toElement,y=c,S=S?$n(S):null,S!==null&&(j=On(S),S!==j||S.tag!==5&&S.tag!==6)&&(S=null)):(y=null,S=c),y!==S)){if(x=gl,b="onMouseLeave",f="onMouseEnter",u="mouse",(e==="pointerout"||e==="pointerover")&&(x=ml,b="onPointerLeave",f="onPointerEnter",u="pointer"),j=y==null?m:Un(y),h=S==null?m:Un(S),m=new x(b,u+"leave",y,t,p),m.target=j,m.relatedTarget=h,b=null,$n(p)===c&&(x=new x(f,u+"enter",S,t,p),x.target=h,x.relatedTarget=j,b=x),j=b,y&&S)n:{for(x=y,f=S,u=0,h=x;h;h=Ln(h))u++;for(h=0,b=f;b;b=Ln(b))h++;for(;0<u-h;)x=Ln(x),u--;for(;0<h-u;)f=Ln(f),h--;for(;u--;){if(x===f||f!==null&&x===f.alternate)break n;x=Ln(x),f=Ln(f)}x=null}else x=null;y!==null&&Cl(g,m,y,x,!1),S!==null&&j!==null&&Cl(g,j,S,x,!0)}}e:{if(m=c?Un(c):window,y=m.nodeName&&m.nodeName.toLowerCase(),y==="select"||y==="input"&&m.type==="file")var v=r1;else if(bl(m))if(sc)v=l1;else{v=a1;var w=o1}else(y=m.nodeName)&&y.toLowerCase()==="input"&&(m.type==="checkbox"||m.type==="radio")&&(v=i1);if(v&&(v=v(e,c))){lc(g,v,t,p);break e}w&&w(e,m,c),e==="focusout"&&(w=m._wrapperState)&&w.controlled&&m.type==="number"&&da(m,"number",m.value)}switch(w=c?Un(c):window,e){case"focusin":(bl(w)||w.contentEditable==="true")&&(Rn=w,Sa=c,Nt=null);break;case"focusout":Nt=Sa=Rn=null;break;case"mousedown":_a=!0;break;case"contextmenu":case"mouseup":case"dragend":_a=!1,_l(g,t,p);break;case"selectionchange":if(u1)break;case"keydown":case"keyup":_l(g,t,p)}var C;if(hi)e:{switch(e){case"compositionstart":var E="onCompositionStart";break e;case"compositionend":E="onCompositionEnd";break e;case"compositionupdate":E="onCompositionUpdate";break e}E=void 0}else An?ac(e,t)&&(E="onCompositionEnd"):e==="keydown"&&t.keyCode===229&&(E="onCompositionStart");E&&(oc&&t.locale!=="ko"&&(An||E!=="onCompositionStart"?E==="onCompositionEnd"&&An&&(C=rc()):(an=p,pi="value"in an?an.value:an.textContent,An=!0)),w=Qr(c,E),0<w.length&&(E=new hl(E,e,null,t,p),g.push({event:E,listeners:w}),C?E.data=C:(C=ic(t),C!==null&&(E.data=C)))),(C=Xb?Zb(e,t):e1(e,t))&&(c=Qr(c,"onBeforeInput"),0<c.length&&(p=new hl("onBeforeInput","beforeinput",null,t,p),g.push({event:p,listeners:c}),p.data=C))}yc(g,n)})}function Vt(e,n,t){return{instance:e,listener:n,currentTarget:t}}function Qr(e,n){for(var t=n+"Capture",r=[];e!==null;){var o=e,a=o.stateNode;o.tag===5&&a!==null&&(o=a,a=Bt(e,t),a!=null&&r.unshift(Vt(e,a,o)),a=Bt(e,n),a!=null&&r.push(Vt(e,a,o))),e=e.return}return r}function Ln(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Cl(e,n,t,r,o){for(var a=n._reactName,i=[];t!==null&&t!==r;){var l=t,s=l.alternate,c=l.stateNode;if(s!==null&&s===r)break;l.tag===5&&c!==null&&(l=c,o?(s=Bt(t,a),s!=null&&i.unshift(Vt(t,s,l))):o||(s=Bt(t,a),s!=null&&i.push(Vt(t,s,l)))),t=t.return}i.length!==0&&e.push({event:n,listeners:i})}var g1=/\r\n?/g,h1=/\u0000|\uFFFD/g;function jl(e){return(typeof e=="string"?e:""+e).replace(g1,`
`).replace(h1,"")}function br(e,n,t){if(n=jl(n),jl(e)!==n&&t)throw Error(k(425))}function Kr(){}var $a=null,Ea=null;function Ca(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var ja=typeof setTimeout=="function"?setTimeout:void 0,m1=typeof clearTimeout=="function"?clearTimeout:void 0,Tl=typeof Promise=="function"?Promise:void 0,v1=typeof queueMicrotask=="function"?queueMicrotask:typeof Tl<"u"?function(e){return Tl.resolve(null).then(e).catch(y1)}:ja;function y1(e){setTimeout(function(){throw e})}function Qo(e,n){var t=n,r=0;do{var o=t.nextSibling;if(e.removeChild(t),o&&o.nodeType===8)if(t=o.data,t==="/$"){if(r===0){e.removeChild(o),Wt(n);return}r--}else t!=="$"&&t!=="$?"&&t!=="$!"||r++;t=o}while(t);Wt(n)}function dn(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?")break;if(n==="/$")return null}}return e}function Fl(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="$"||t==="$!"||t==="$?"){if(n===0)return e;n--}else t==="/$"&&n++}e=e.previousSibling}return null}var pt=Math.random().toString(36).slice(2),Ae="__reactFiber$"+pt,Qt="__reactProps$"+pt,Je="__reactContainer$"+pt,Ta="__reactEvents$"+pt,b1="__reactListeners$"+pt,x1="__reactHandles$"+pt;function $n(e){var n=e[Ae];if(n)return n;for(var t=e.parentNode;t;){if(n=t[Je]||t[Ae]){if(t=n.alternate,n.child!==null||t!==null&&t.child!==null)for(e=Fl(e);e!==null;){if(t=e[Ae])return t;e=Fl(e)}return n}e=t,t=e.parentNode}return null}function or(e){return e=e[Ae]||e[Je],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Un(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(k(33))}function vo(e){return e[Qt]||null}var Fa=[],Gn=-1;function bn(e){return{current:e}}function B(e){0>Gn||(e.current=Fa[Gn],Fa[Gn]=null,Gn--)}function O(e,n){Gn++,Fa[Gn]=e.current,e.current=n}var vn={},ie=bn(vn),ge=bn(!1),Fn=vn;function rt(e,n){var t=e.type.contextTypes;if(!t)return vn;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===n)return r.__reactInternalMemoizedMaskedChildContext;var o={},a;for(a in t)o[a]=n[a];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=n,e.__reactInternalMemoizedMaskedChildContext=o),o}function he(e){return e=e.childContextTypes,e!=null}function Yr(){B(ge),B(ie)}function Pl(e,n,t){if(ie.current!==vn)throw Error(k(168));O(ie,n),O(ge,t)}function xc(e,n,t){var r=e.stateNode;if(n=n.childContextTypes,typeof r.getChildContext!="function")return t;r=r.getChildContext();for(var o in r)if(!(o in n))throw Error(k(108,ob(e)||"Unknown",o));return U({},t,r)}function Jr(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||vn,Fn=ie.current,O(ie,e),O(ge,ge.current),!0}function Nl(e,n,t){var r=e.stateNode;if(!r)throw Error(k(169));t?(e=xc(e,n,Fn),r.__reactInternalMemoizedMergedChildContext=e,B(ge),B(ie),O(ie,e)):B(ge),O(ge,t)}var He=null,yo=!1,Ko=!1;function wc(e){He===null?He=[e]:He.push(e)}function w1(e){yo=!0,wc(e)}function xn(){if(!Ko&&He!==null){Ko=!0;var e=0,n=I;try{var t=He;for(I=1;e<t.length;e++){var r=t[e];do r=r(!0);while(r!==null)}He=null,yo=!1}catch(o){throw He!==null&&(He=He.slice(e+1)),Vs(si,xn),o}finally{I=n,Ko=!1}}return null}var Hn=[],Vn=0,qr=null,Xr=0,_e=[],$e=0,Pn=null,Ve=1,Qe="";function Sn(e,n){Hn[Vn++]=Xr,Hn[Vn++]=qr,qr=e,Xr=n}function kc(e,n,t){_e[$e++]=Ve,_e[$e++]=Qe,_e[$e++]=Pn,Pn=e;var r=Ve;e=Qe;var o=32-Ie(r)-1;r&=~(1<<o),t+=1;var a=32-Ie(n)+o;if(30<a){var i=o-o%5;a=(r&(1<<i)-1).toString(32),r>>=i,o-=i,Ve=1<<32-Ie(n)+o|t<<o|r,Qe=a+e}else Ve=1<<a|t<<o|r,Qe=e}function vi(e){e.return!==null&&(Sn(e,1),kc(e,1,0))}function yi(e){for(;e===qr;)qr=Hn[--Vn],Hn[Vn]=null,Xr=Hn[--Vn],Hn[Vn]=null;for(;e===Pn;)Pn=_e[--$e],_e[$e]=null,Qe=_e[--$e],_e[$e]=null,Ve=_e[--$e],_e[$e]=null}var xe=null,be=null,A=!1,ze=null;function Sc(e,n){var t=Ee(5,null,null,0);t.elementType="DELETED",t.stateNode=n,t.return=e,n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)}function Ml(e,n){switch(e.tag){case 5:var t=e.type;return n=n.nodeType!==1||t.toLowerCase()!==n.nodeName.toLowerCase()?null:n,n!==null?(e.stateNode=n,xe=e,be=dn(n.firstChild),!0):!1;case 6:return n=e.pendingProps===""||n.nodeType!==3?null:n,n!==null?(e.stateNode=n,xe=e,be=null,!0):!1;case 13:return n=n.nodeType!==8?null:n,n!==null?(t=Pn!==null?{id:Ve,overflow:Qe}:null,e.memoizedState={dehydrated:n,treeContext:t,retryLane:1073741824},t=Ee(18,null,null,0),t.stateNode=n,t.return=e,e.child=t,xe=e,be=null,!0):!1;default:return!1}}function Pa(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Na(e){if(A){var n=be;if(n){var t=n;if(!Ml(e,n)){if(Pa(e))throw Error(k(418));n=dn(t.nextSibling);var r=xe;n&&Ml(e,n)?Sc(r,t):(e.flags=e.flags&-4097|2,A=!1,xe=e)}}else{if(Pa(e))throw Error(k(418));e.flags=e.flags&-4097|2,A=!1,xe=e}}}function zl(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;xe=e}function xr(e){if(e!==xe)return!1;if(!A)return zl(e),A=!0,!1;var n;if((n=e.tag!==3)&&!(n=e.tag!==5)&&(n=e.type,n=n!=="head"&&n!=="body"&&!Ca(e.type,e.memoizedProps)),n&&(n=be)){if(Pa(e))throw _c(),Error(k(418));for(;n;)Sc(e,n),n=dn(n.nextSibling)}if(zl(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(k(317));e:{for(e=e.nextSibling,n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="/$"){if(n===0){be=dn(e.nextSibling);break e}n--}else t!=="$"&&t!=="$!"&&t!=="$?"||n++}e=e.nextSibling}be=null}}else be=xe?dn(e.stateNode.nextSibling):null;return!0}function _c(){for(var e=be;e;)e=dn(e.nextSibling)}function ot(){be=xe=null,A=!1}function bi(e){ze===null?ze=[e]:ze.push(e)}var k1=Ze.ReactCurrentBatchConfig;function wt(e,n,t){if(e=t.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(t._owner){if(t=t._owner,t){if(t.tag!==1)throw Error(k(309));var r=t.stateNode}if(!r)throw Error(k(147,e));var o=r,a=""+e;return n!==null&&n.ref!==null&&typeof n.ref=="function"&&n.ref._stringRef===a?n.ref:(n=function(i){var l=o.refs;i===null?delete l[a]:l[a]=i},n._stringRef=a,n)}if(typeof e!="string")throw Error(k(284));if(!t._owner)throw Error(k(290,e))}return e}function wr(e,n){throw e=Object.prototype.toString.call(n),Error(k(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e))}function Il(e){var n=e._init;return n(e._payload)}function $c(e){function n(f,u){if(e){var h=f.deletions;h===null?(f.deletions=[u],f.flags|=16):h.push(u)}}function t(f,u){if(!e)return null;for(;u!==null;)n(f,u),u=u.sibling;return null}function r(f,u){for(f=new Map;u!==null;)u.key!==null?f.set(u.key,u):f.set(u.index,u),u=u.sibling;return f}function o(f,u){return f=hn(f,u),f.index=0,f.sibling=null,f}function a(f,u,h){return f.index=h,e?(h=f.alternate,h!==null?(h=h.index,h<u?(f.flags|=2,u):h):(f.flags|=2,u)):(f.flags|=1048576,u)}function i(f){return e&&f.alternate===null&&(f.flags|=2),f}function l(f,u,h,b){return u===null||u.tag!==6?(u=na(h,f.mode,b),u.return=f,u):(u=o(u,h),u.return=f,u)}function s(f,u,h,b){var v=h.type;return v===Bn?p(f,u,h.props.children,b,h.key):u!==null&&(u.elementType===v||typeof v=="object"&&v!==null&&v.$$typeof===nn&&Il(v)===u.type)?(b=o(u,h.props),b.ref=wt(f,u,h),b.return=f,b):(b=Dr(h.type,h.key,h.props,null,f.mode,b),b.ref=wt(f,u,h),b.return=f,b)}function c(f,u,h,b){return u===null||u.tag!==4||u.stateNode.containerInfo!==h.containerInfo||u.stateNode.implementation!==h.implementation?(u=ta(h,f.mode,b),u.return=f,u):(u=o(u,h.children||[]),u.return=f,u)}function p(f,u,h,b,v){return u===null||u.tag!==7?(u=Tn(h,f.mode,b,v),u.return=f,u):(u=o(u,h),u.return=f,u)}function g(f,u,h){if(typeof u=="string"&&u!==""||typeof u=="number")return u=na(""+u,f.mode,h),u.return=f,u;if(typeof u=="object"&&u!==null){switch(u.$$typeof){case ur:return h=Dr(u.type,u.key,u.props,null,f.mode,h),h.ref=wt(f,null,u),h.return=f,h;case Dn:return u=ta(u,f.mode,h),u.return=f,u;case nn:var b=u._init;return g(f,b(u._payload),h)}if($t(u)||mt(u))return u=Tn(u,f.mode,h,null),u.return=f,u;wr(f,u)}return null}function m(f,u,h,b){var v=u!==null?u.key:null;if(typeof h=="string"&&h!==""||typeof h=="number")return v!==null?null:l(f,u,""+h,b);if(typeof h=="object"&&h!==null){switch(h.$$typeof){case ur:return h.key===v?s(f,u,h,b):null;case Dn:return h.key===v?c(f,u,h,b):null;case nn:return v=h._init,m(f,u,v(h._payload),b)}if($t(h)||mt(h))return v!==null?null:p(f,u,h,b,null);wr(f,h)}return null}function y(f,u,h,b,v){if(typeof b=="string"&&b!==""||typeof b=="number")return f=f.get(h)||null,l(u,f,""+b,v);if(typeof b=="object"&&b!==null){switch(b.$$typeof){case ur:return f=f.get(b.key===null?h:b.key)||null,s(u,f,b,v);case Dn:return f=f.get(b.key===null?h:b.key)||null,c(u,f,b,v);case nn:var w=b._init;return y(f,u,h,w(b._payload),v)}if($t(b)||mt(b))return f=f.get(h)||null,p(u,f,b,v,null);wr(u,b)}return null}function S(f,u,h,b){for(var v=null,w=null,C=u,E=u=0,H=null;C!==null&&E<h.length;E++){C.index>E?(H=C,C=null):H=C.sibling;var N=m(f,C,h[E],b);if(N===null){C===null&&(C=H);break}e&&C&&N.alternate===null&&n(f,C),u=a(N,u,E),w===null?v=N:w.sibling=N,w=N,C=H}if(E===h.length)return t(f,C),A&&Sn(f,E),v;if(C===null){for(;E<h.length;E++)C=g(f,h[E],b),C!==null&&(u=a(C,u,E),w===null?v=C:w.sibling=C,w=C);return A&&Sn(f,E),v}for(C=r(f,C);E<h.length;E++)H=y(C,f,E,h[E],b),H!==null&&(e&&H.alternate!==null&&C.delete(H.key===null?E:H.key),u=a(H,u,E),w===null?v=H:w.sibling=H,w=H);return e&&C.forEach(function(Fe){return n(f,Fe)}),A&&Sn(f,E),v}function x(f,u,h,b){var v=mt(h);if(typeof v!="function")throw Error(k(150));if(h=v.call(h),h==null)throw Error(k(151));for(var w=v=null,C=u,E=u=0,H=null,N=h.next();C!==null&&!N.done;E++,N=h.next()){C.index>E?(H=C,C=null):H=C.sibling;var Fe=m(f,C,N.value,b);if(Fe===null){C===null&&(C=H);break}e&&C&&Fe.alternate===null&&n(f,C),u=a(Fe,u,E),w===null?v=Fe:w.sibling=Fe,w=Fe,C=H}if(N.done)return t(f,C),A&&Sn(f,E),v;if(C===null){for(;!N.done;E++,N=h.next())N=g(f,N.value,b),N!==null&&(u=a(N,u,E),w===null?v=N:w.sibling=N,w=N);return A&&Sn(f,E),v}for(C=r(f,C);!N.done;E++,N=h.next())N=y(C,f,E,N.value,b),N!==null&&(e&&N.alternate!==null&&C.delete(N.key===null?E:N.key),u=a(N,u,E),w===null?v=N:w.sibling=N,w=N);return e&&C.forEach(function(gt){return n(f,gt)}),A&&Sn(f,E),v}function j(f,u,h,b){if(typeof h=="object"&&h!==null&&h.type===Bn&&h.key===null&&(h=h.props.children),typeof h=="object"&&h!==null){switch(h.$$typeof){case ur:e:{for(var v=h.key,w=u;w!==null;){if(w.key===v){if(v=h.type,v===Bn){if(w.tag===7){t(f,w.sibling),u=o(w,h.props.children),u.return=f,f=u;break e}}else if(w.elementType===v||typeof v=="object"&&v!==null&&v.$$typeof===nn&&Il(v)===w.type){t(f,w.sibling),u=o(w,h.props),u.ref=wt(f,w,h),u.return=f,f=u;break e}t(f,w);break}else n(f,w);w=w.sibling}h.type===Bn?(u=Tn(h.props.children,f.mode,b,h.key),u.return=f,f=u):(b=Dr(h.type,h.key,h.props,null,f.mode,b),b.ref=wt(f,u,h),b.return=f,f=b)}return i(f);case Dn:e:{for(w=h.key;u!==null;){if(u.key===w)if(u.tag===4&&u.stateNode.containerInfo===h.containerInfo&&u.stateNode.implementation===h.implementation){t(f,u.sibling),u=o(u,h.children||[]),u.return=f,f=u;break e}else{t(f,u);break}else n(f,u);u=u.sibling}u=ta(h,f.mode,b),u.return=f,f=u}return i(f);case nn:return w=h._init,j(f,u,w(h._payload),b)}if($t(h))return S(f,u,h,b);if(mt(h))return x(f,u,h,b);wr(f,h)}return typeof h=="string"&&h!==""||typeof h=="number"?(h=""+h,u!==null&&u.tag===6?(t(f,u.sibling),u=o(u,h),u.return=f,f=u):(t(f,u),u=na(h,f.mode,b),u.return=f,f=u),i(f)):t(f,u)}return j}var at=$c(!0),Ec=$c(!1),Zr=bn(null),eo=null,Qn=null,xi=null;function wi(){xi=Qn=eo=null}function ki(e){var n=Zr.current;B(Zr),e._currentValue=n}function Ma(e,n,t){for(;e!==null;){var r=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,r!==null&&(r.childLanes|=n)):r!==null&&(r.childLanes&n)!==n&&(r.childLanes|=n),e===t)break;e=e.return}}function et(e,n){eo=e,xi=Qn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&n&&(fe=!0),e.firstContext=null)}function je(e){var n=e._currentValue;if(xi!==e)if(e={context:e,memoizedValue:n,next:null},Qn===null){if(eo===null)throw Error(k(308));Qn=e,eo.dependencies={lanes:0,firstContext:e}}else Qn=Qn.next=e;return n}var En=null;function Si(e){En===null?En=[e]:En.push(e)}function Cc(e,n,t,r){var o=n.interleaved;return o===null?(t.next=t,Si(n)):(t.next=o.next,o.next=t),n.interleaved=t,qe(e,r)}function qe(e,n){e.lanes|=n;var t=e.alternate;for(t!==null&&(t.lanes|=n),t=e,e=e.return;e!==null;)e.childLanes|=n,t=e.alternate,t!==null&&(t.childLanes|=n),t=e,e=e.return;return t.tag===3?t.stateNode:null}var tn=!1;function _i(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function jc(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Ke(e,n){return{eventTime:e,lane:n,tag:0,payload:null,callback:null,next:null}}function pn(e,n,t){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,z&2){var o=r.pending;return o===null?n.next=n:(n.next=o.next,o.next=n),r.pending=n,qe(e,t)}return o=r.interleaved,o===null?(n.next=n,Si(r)):(n.next=o.next,o.next=n),r.interleaved=n,qe(e,t)}function Nr(e,n,t){if(n=n.updateQueue,n!==null&&(n=n.shared,(t&4194240)!==0)){var r=n.lanes;r&=e.pendingLanes,t|=r,n.lanes=t,ci(e,t)}}function Ol(e,n){var t=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,t===r)){var o=null,a=null;if(t=t.firstBaseUpdate,t!==null){do{var i={eventTime:t.eventTime,lane:t.lane,tag:t.tag,payload:t.payload,callback:t.callback,next:null};a===null?o=a=i:a=a.next=i,t=t.next}while(t!==null);a===null?o=a=n:a=a.next=n}else o=a=n;t={baseState:r.baseState,firstBaseUpdate:o,lastBaseUpdate:a,shared:r.shared,effects:r.effects},e.updateQueue=t;return}e=t.lastBaseUpdate,e===null?t.firstBaseUpdate=n:e.next=n,t.lastBaseUpdate=n}function no(e,n,t,r){var o=e.updateQueue;tn=!1;var a=o.firstBaseUpdate,i=o.lastBaseUpdate,l=o.shared.pending;if(l!==null){o.shared.pending=null;var s=l,c=s.next;s.next=null,i===null?a=c:i.next=c,i=s;var p=e.alternate;p!==null&&(p=p.updateQueue,l=p.lastBaseUpdate,l!==i&&(l===null?p.firstBaseUpdate=c:l.next=c,p.lastBaseUpdate=s))}if(a!==null){var g=o.baseState;i=0,p=c=s=null,l=a;do{var m=l.lane,y=l.eventTime;if((r&m)===m){p!==null&&(p=p.next={eventTime:y,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var S=e,x=l;switch(m=n,y=t,x.tag){case 1:if(S=x.payload,typeof S=="function"){g=S.call(y,g,m);break e}g=S;break e;case 3:S.flags=S.flags&-65537|128;case 0:if(S=x.payload,m=typeof S=="function"?S.call(y,g,m):S,m==null)break e;g=U({},g,m);break e;case 2:tn=!0}}l.callback!==null&&l.lane!==0&&(e.flags|=64,m=o.effects,m===null?o.effects=[l]:m.push(l))}else y={eventTime:y,lane:m,tag:l.tag,payload:l.payload,callback:l.callback,next:null},p===null?(c=p=y,s=g):p=p.next=y,i|=m;if(l=l.next,l===null){if(l=o.shared.pending,l===null)break;m=l,l=m.next,m.next=null,o.lastBaseUpdate=m,o.shared.pending=null}}while(!0);if(p===null&&(s=g),o.baseState=s,o.firstBaseUpdate=c,o.lastBaseUpdate=p,n=o.shared.interleaved,n!==null){o=n;do i|=o.lane,o=o.next;while(o!==n)}else a===null&&(o.shared.lanes=0);Mn|=i,e.lanes=i,e.memoizedState=g}}function Ll(e,n,t){if(e=n.effects,n.effects=null,e!==null)for(n=0;n<e.length;n++){var r=e[n],o=r.callback;if(o!==null){if(r.callback=null,r=t,typeof o!="function")throw Error(k(191,o));o.call(r)}}}var ar={},We=bn(ar),Kt=bn(ar),Yt=bn(ar);function Cn(e){if(e===ar)throw Error(k(174));return e}function $i(e,n){switch(O(Yt,n),O(Kt,e),O(We,ar),e=n.nodeType,e){case 9:case 11:n=(n=n.documentElement)?n.namespaceURI:fa(null,"");break;default:e=e===8?n.parentNode:n,n=e.namespaceURI||null,e=e.tagName,n=fa(n,e)}B(We),O(We,n)}function it(){B(We),B(Kt),B(Yt)}function Tc(e){Cn(Yt.current);var n=Cn(We.current),t=fa(n,e.type);n!==t&&(O(Kt,e),O(We,t))}function Ei(e){Kt.current===e&&(B(We),B(Kt))}var R=bn(0);function to(e){for(var n=e;n!==null;){if(n.tag===13){var t=n.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||t.data==="$?"||t.data==="$!"))return n}else if(n.tag===19&&n.memoizedProps.revealOrder!==void 0){if(n.flags&128)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var Yo=[];function Ci(){for(var e=0;e<Yo.length;e++)Yo[e]._workInProgressVersionPrimary=null;Yo.length=0}var Mr=Ze.ReactCurrentDispatcher,Jo=Ze.ReactCurrentBatchConfig,Nn=0,W=null,Y=null,X=null,ro=!1,Mt=!1,Jt=0,S1=0;function re(){throw Error(k(321))}function ji(e,n){if(n===null)return!1;for(var t=0;t<n.length&&t<e.length;t++)if(!Le(e[t],n[t]))return!1;return!0}function Ti(e,n,t,r,o,a){if(Nn=a,W=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,Mr.current=e===null||e.memoizedState===null?C1:j1,e=t(r,o),Mt){a=0;do{if(Mt=!1,Jt=0,25<=a)throw Error(k(301));a+=1,X=Y=null,n.updateQueue=null,Mr.current=T1,e=t(r,o)}while(Mt)}if(Mr.current=oo,n=Y!==null&&Y.next!==null,Nn=0,X=Y=W=null,ro=!1,n)throw Error(k(300));return e}function Fi(){var e=Jt!==0;return Jt=0,e}function Be(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return X===null?W.memoizedState=X=e:X=X.next=e,X}function Te(){if(Y===null){var e=W.alternate;e=e!==null?e.memoizedState:null}else e=Y.next;var n=X===null?W.memoizedState:X.next;if(n!==null)X=n,Y=e;else{if(e===null)throw Error(k(310));Y=e,e={memoizedState:Y.memoizedState,baseState:Y.baseState,baseQueue:Y.baseQueue,queue:Y.queue,next:null},X===null?W.memoizedState=X=e:X=X.next=e}return X}function qt(e,n){return typeof n=="function"?n(e):n}function qo(e){var n=Te(),t=n.queue;if(t===null)throw Error(k(311));t.lastRenderedReducer=e;var r=Y,o=r.baseQueue,a=t.pending;if(a!==null){if(o!==null){var i=o.next;o.next=a.next,a.next=i}r.baseQueue=o=a,t.pending=null}if(o!==null){a=o.next,r=r.baseState;var l=i=null,s=null,c=a;do{var p=c.lane;if((Nn&p)===p)s!==null&&(s=s.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:e(r,c.action);else{var g={lane:p,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};s===null?(l=s=g,i=r):s=s.next=g,W.lanes|=p,Mn|=p}c=c.next}while(c!==null&&c!==a);s===null?i=r:s.next=l,Le(r,n.memoizedState)||(fe=!0),n.memoizedState=r,n.baseState=i,n.baseQueue=s,t.lastRenderedState=r}if(e=t.interleaved,e!==null){o=e;do a=o.lane,W.lanes|=a,Mn|=a,o=o.next;while(o!==e)}else o===null&&(t.lanes=0);return[n.memoizedState,t.dispatch]}function Xo(e){var n=Te(),t=n.queue;if(t===null)throw Error(k(311));t.lastRenderedReducer=e;var r=t.dispatch,o=t.pending,a=n.memoizedState;if(o!==null){t.pending=null;var i=o=o.next;do a=e(a,i.action),i=i.next;while(i!==o);Le(a,n.memoizedState)||(fe=!0),n.memoizedState=a,n.baseQueue===null&&(n.baseState=a),t.lastRenderedState=a}return[a,r]}function Fc(){}function Pc(e,n){var t=W,r=Te(),o=n(),a=!Le(r.memoizedState,o);if(a&&(r.memoizedState=o,fe=!0),r=r.queue,Pi(zc.bind(null,t,r,e),[e]),r.getSnapshot!==n||a||X!==null&&X.memoizedState.tag&1){if(t.flags|=2048,Xt(9,Mc.bind(null,t,r,o,n),void 0,null),Z===null)throw Error(k(349));Nn&30||Nc(t,n,o)}return o}function Nc(e,n,t){e.flags|=16384,e={getSnapshot:n,value:t},n=W.updateQueue,n===null?(n={lastEffect:null,stores:null},W.updateQueue=n,n.stores=[e]):(t=n.stores,t===null?n.stores=[e]:t.push(e))}function Mc(e,n,t,r){n.value=t,n.getSnapshot=r,Ic(n)&&Oc(e)}function zc(e,n,t){return t(function(){Ic(n)&&Oc(e)})}function Ic(e){var n=e.getSnapshot;e=e.value;try{var t=n();return!Le(e,t)}catch{return!0}}function Oc(e){var n=qe(e,1);n!==null&&Oe(n,e,1,-1)}function Dl(e){var n=Be();return typeof e=="function"&&(e=e()),n.memoizedState=n.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:qt,lastRenderedState:e},n.queue=e,e=e.dispatch=E1.bind(null,W,e),[n.memoizedState,e]}function Xt(e,n,t,r){return e={tag:e,create:n,destroy:t,deps:r,next:null},n=W.updateQueue,n===null?(n={lastEffect:null,stores:null},W.updateQueue=n,n.lastEffect=e.next=e):(t=n.lastEffect,t===null?n.lastEffect=e.next=e:(r=t.next,t.next=e,e.next=r,n.lastEffect=e)),e}function Lc(){return Te().memoizedState}function zr(e,n,t,r){var o=Be();W.flags|=e,o.memoizedState=Xt(1|n,t,void 0,r===void 0?null:r)}function bo(e,n,t,r){var o=Te();r=r===void 0?null:r;var a=void 0;if(Y!==null){var i=Y.memoizedState;if(a=i.destroy,r!==null&&ji(r,i.deps)){o.memoizedState=Xt(n,t,a,r);return}}W.flags|=e,o.memoizedState=Xt(1|n,t,a,r)}function Bl(e,n){return zr(8390656,8,e,n)}function Pi(e,n){return bo(2048,8,e,n)}function Dc(e,n){return bo(4,2,e,n)}function Bc(e,n){return bo(4,4,e,n)}function Ac(e,n){if(typeof n=="function")return e=e(),n(e),function(){n(null)};if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function Rc(e,n,t){return t=t!=null?t.concat([e]):null,bo(4,4,Ac.bind(null,n,e),t)}function Ni(){}function Wc(e,n){var t=Te();n=n===void 0?null:n;var r=t.memoizedState;return r!==null&&n!==null&&ji(n,r[1])?r[0]:(t.memoizedState=[e,n],e)}function Uc(e,n){var t=Te();n=n===void 0?null:n;var r=t.memoizedState;return r!==null&&n!==null&&ji(n,r[1])?r[0]:(e=e(),t.memoizedState=[e,n],e)}function Gc(e,n,t){return Nn&21?(Le(t,n)||(t=Ys(),W.lanes|=t,Mn|=t,e.baseState=!0),n):(e.baseState&&(e.baseState=!1,fe=!0),e.memoizedState=t)}function _1(e,n){var t=I;I=t!==0&&4>t?t:4,e(!0);var r=Jo.transition;Jo.transition={};try{e(!1),n()}finally{I=t,Jo.transition=r}}function Hc(){return Te().memoizedState}function $1(e,n,t){var r=gn(e);if(t={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null},Vc(e))Qc(n,t);else if(t=Cc(e,n,t,r),t!==null){var o=se();Oe(t,e,r,o),Kc(t,n,r)}}function E1(e,n,t){var r=gn(e),o={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null};if(Vc(e))Qc(n,o);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=n.lastRenderedReducer,a!==null))try{var i=n.lastRenderedState,l=a(i,t);if(o.hasEagerState=!0,o.eagerState=l,Le(l,i)){var s=n.interleaved;s===null?(o.next=o,Si(n)):(o.next=s.next,s.next=o),n.interleaved=o;return}}catch{}finally{}t=Cc(e,n,o,r),t!==null&&(o=se(),Oe(t,e,r,o),Kc(t,n,r))}}function Vc(e){var n=e.alternate;return e===W||n!==null&&n===W}function Qc(e,n){Mt=ro=!0;var t=e.pending;t===null?n.next=n:(n.next=t.next,t.next=n),e.pending=n}function Kc(e,n,t){if(t&4194240){var r=n.lanes;r&=e.pendingLanes,t|=r,n.lanes=t,ci(e,t)}}var oo={readContext:je,useCallback:re,useContext:re,useEffect:re,useImperativeHandle:re,useInsertionEffect:re,useLayoutEffect:re,useMemo:re,useReducer:re,useRef:re,useState:re,useDebugValue:re,useDeferredValue:re,useTransition:re,useMutableSource:re,useSyncExternalStore:re,useId:re,unstable_isNewReconciler:!1},C1={readContext:je,useCallback:function(e,n){return Be().memoizedState=[e,n===void 0?null:n],e},useContext:je,useEffect:Bl,useImperativeHandle:function(e,n,t){return t=t!=null?t.concat([e]):null,zr(4194308,4,Ac.bind(null,n,e),t)},useLayoutEffect:function(e,n){return zr(4194308,4,e,n)},useInsertionEffect:function(e,n){return zr(4,2,e,n)},useMemo:function(e,n){var t=Be();return n=n===void 0?null:n,e=e(),t.memoizedState=[e,n],e},useReducer:function(e,n,t){var r=Be();return n=t!==void 0?t(n):n,r.memoizedState=r.baseState=n,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:n},r.queue=e,e=e.dispatch=$1.bind(null,W,e),[r.memoizedState,e]},useRef:function(e){var n=Be();return e={current:e},n.memoizedState=e},useState:Dl,useDebugValue:Ni,useDeferredValue:function(e){return Be().memoizedState=e},useTransition:function(){var e=Dl(!1),n=e[0];return e=_1.bind(null,e[1]),Be().memoizedState=e,[n,e]},useMutableSource:function(){},useSyncExternalStore:function(e,n,t){var r=W,o=Be();if(A){if(t===void 0)throw Error(k(407));t=t()}else{if(t=n(),Z===null)throw Error(k(349));Nn&30||Nc(r,n,t)}o.memoizedState=t;var a={value:t,getSnapshot:n};return o.queue=a,Bl(zc.bind(null,r,a,e),[e]),r.flags|=2048,Xt(9,Mc.bind(null,r,a,t,n),void 0,null),t},useId:function(){var e=Be(),n=Z.identifierPrefix;if(A){var t=Qe,r=Ve;t=(r&~(1<<32-Ie(r)-1)).toString(32)+t,n=":"+n+"R"+t,t=Jt++,0<t&&(n+="H"+t.toString(32)),n+=":"}else t=S1++,n=":"+n+"r"+t.toString(32)+":";return e.memoizedState=n},unstable_isNewReconciler:!1},j1={readContext:je,useCallback:Wc,useContext:je,useEffect:Pi,useImperativeHandle:Rc,useInsertionEffect:Dc,useLayoutEffect:Bc,useMemo:Uc,useReducer:qo,useRef:Lc,useState:function(){return qo(qt)},useDebugValue:Ni,useDeferredValue:function(e){var n=Te();return Gc(n,Y.memoizedState,e)},useTransition:function(){var e=qo(qt)[0],n=Te().memoizedState;return[e,n]},useMutableSource:Fc,useSyncExternalStore:Pc,useId:Hc,unstable_isNewReconciler:!1},T1={readContext:je,useCallback:Wc,useContext:je,useEffect:Pi,useImperativeHandle:Rc,useInsertionEffect:Dc,useLayoutEffect:Bc,useMemo:Uc,useReducer:Xo,useRef:Lc,useState:function(){return Xo(qt)},useDebugValue:Ni,useDeferredValue:function(e){var n=Te();return Y===null?n.memoizedState=e:Gc(n,Y.memoizedState,e)},useTransition:function(){var e=Xo(qt)[0],n=Te().memoizedState;return[e,n]},useMutableSource:Fc,useSyncExternalStore:Pc,useId:Hc,unstable_isNewReconciler:!1};function Ne(e,n){if(e&&e.defaultProps){n=U({},n),e=e.defaultProps;for(var t in e)n[t]===void 0&&(n[t]=e[t]);return n}return n}function za(e,n,t,r){n=e.memoizedState,t=t(r,n),t=t==null?n:U({},n,t),e.memoizedState=t,e.lanes===0&&(e.updateQueue.baseState=t)}var xo={isMounted:function(e){return(e=e._reactInternals)?On(e)===e:!1},enqueueSetState:function(e,n,t){e=e._reactInternals;var r=se(),o=gn(e),a=Ke(r,o);a.payload=n,t!=null&&(a.callback=t),n=pn(e,a,o),n!==null&&(Oe(n,e,o,r),Nr(n,e,o))},enqueueReplaceState:function(e,n,t){e=e._reactInternals;var r=se(),o=gn(e),a=Ke(r,o);a.tag=1,a.payload=n,t!=null&&(a.callback=t),n=pn(e,a,o),n!==null&&(Oe(n,e,o,r),Nr(n,e,o))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var t=se(),r=gn(e),o=Ke(t,r);o.tag=2,n!=null&&(o.callback=n),n=pn(e,o,r),n!==null&&(Oe(n,e,r,t),Nr(n,e,r))}};function Al(e,n,t,r,o,a,i){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,a,i):n.prototype&&n.prototype.isPureReactComponent?!Gt(t,r)||!Gt(o,a):!0}function Yc(e,n,t){var r=!1,o=vn,a=n.contextType;return typeof a=="object"&&a!==null?a=je(a):(o=he(n)?Fn:ie.current,r=n.contextTypes,a=(r=r!=null)?rt(e,o):vn),n=new n(t,a),e.memoizedState=n.state!==null&&n.state!==void 0?n.state:null,n.updater=xo,e.stateNode=n,n._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=o,e.__reactInternalMemoizedMaskedChildContext=a),n}function Rl(e,n,t,r){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(t,r),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(t,r),n.state!==e&&xo.enqueueReplaceState(n,n.state,null)}function Ia(e,n,t,r){var o=e.stateNode;o.props=t,o.state=e.memoizedState,o.refs={},_i(e);var a=n.contextType;typeof a=="object"&&a!==null?o.context=je(a):(a=he(n)?Fn:ie.current,o.context=rt(e,a)),o.state=e.memoizedState,a=n.getDerivedStateFromProps,typeof a=="function"&&(za(e,n,a,t),o.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(n=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),n!==o.state&&xo.enqueueReplaceState(o,o.state,null),no(e,t,o,r),o.state=e.memoizedState),typeof o.componentDidMount=="function"&&(e.flags|=4194308)}function lt(e,n){try{var t="",r=n;do t+=rb(r),r=r.return;while(r);var o=t}catch(a){o=`
Error generating stack: `+a.message+`
`+a.stack}return{value:e,source:n,stack:o,digest:null}}function Zo(e,n,t){return{value:e,source:null,stack:t??null,digest:n??null}}function Oa(e,n){try{console.error(n.value)}catch(t){setTimeout(function(){throw t})}}var F1=typeof WeakMap=="function"?WeakMap:Map;function Jc(e,n,t){t=Ke(-1,t),t.tag=3,t.payload={element:null};var r=n.value;return t.callback=function(){io||(io=!0,Va=r),Oa(e,n)},t}function qc(e,n,t){t=Ke(-1,t),t.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var o=n.value;t.payload=function(){return r(o)},t.callback=function(){Oa(e,n)}}var a=e.stateNode;return a!==null&&typeof a.componentDidCatch=="function"&&(t.callback=function(){Oa(e,n),typeof r!="function"&&(fn===null?fn=new Set([this]):fn.add(this));var i=n.stack;this.componentDidCatch(n.value,{componentStack:i!==null?i:""})}),t}function Wl(e,n,t){var r=e.pingCache;if(r===null){r=e.pingCache=new F1;var o=new Set;r.set(n,o)}else o=r.get(n),o===void 0&&(o=new Set,r.set(n,o));o.has(t)||(o.add(t),e=G1.bind(null,e,n,t),n.then(e,e))}function Ul(e){do{var n;if((n=e.tag===13)&&(n=e.memoizedState,n=n!==null?n.dehydrated!==null:!0),n)return e;e=e.return}while(e!==null);return null}function Gl(e,n,t,r,o){return e.mode&1?(e.flags|=65536,e.lanes=o,e):(e===n?e.flags|=65536:(e.flags|=128,t.flags|=131072,t.flags&=-52805,t.tag===1&&(t.alternate===null?t.tag=17:(n=Ke(-1,1),n.tag=2,pn(t,n,1))),t.lanes|=1),e)}var P1=Ze.ReactCurrentOwner,fe=!1;function le(e,n,t,r){n.child=e===null?Ec(n,null,t,r):at(n,e.child,t,r)}function Hl(e,n,t,r,o){t=t.render;var a=n.ref;return et(n,o),r=Ti(e,n,t,r,a,o),t=Fi(),e!==null&&!fe?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~o,Xe(e,n,o)):(A&&t&&vi(n),n.flags|=1,le(e,n,r,o),n.child)}function Vl(e,n,t,r,o){if(e===null){var a=t.type;return typeof a=="function"&&!Ai(a)&&a.defaultProps===void 0&&t.compare===null&&t.defaultProps===void 0?(n.tag=15,n.type=a,Xc(e,n,a,r,o)):(e=Dr(t.type,null,r,n,n.mode,o),e.ref=n.ref,e.return=n,n.child=e)}if(a=e.child,!(e.lanes&o)){var i=a.memoizedProps;if(t=t.compare,t=t!==null?t:Gt,t(i,r)&&e.ref===n.ref)return Xe(e,n,o)}return n.flags|=1,e=hn(a,r),e.ref=n.ref,e.return=n,n.child=e}function Xc(e,n,t,r,o){if(e!==null){var a=e.memoizedProps;if(Gt(a,r)&&e.ref===n.ref)if(fe=!1,n.pendingProps=r=a,(e.lanes&o)!==0)e.flags&131072&&(fe=!0);else return n.lanes=e.lanes,Xe(e,n,o)}return La(e,n,t,r,o)}function Zc(e,n,t){var r=n.pendingProps,o=r.children,a=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(n.mode&1))n.memoizedState={baseLanes:0,cachePool:null,transitions:null},O(Yn,ye),ye|=t;else{if(!(t&1073741824))return e=a!==null?a.baseLanes|t:t,n.lanes=n.childLanes=1073741824,n.memoizedState={baseLanes:e,cachePool:null,transitions:null},n.updateQueue=null,O(Yn,ye),ye|=e,null;n.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=a!==null?a.baseLanes:t,O(Yn,ye),ye|=r}else a!==null?(r=a.baseLanes|t,n.memoizedState=null):r=t,O(Yn,ye),ye|=r;return le(e,n,o,t),n.child}function eu(e,n){var t=n.ref;(e===null&&t!==null||e!==null&&e.ref!==t)&&(n.flags|=512,n.flags|=2097152)}function La(e,n,t,r,o){var a=he(t)?Fn:ie.current;return a=rt(n,a),et(n,o),t=Ti(e,n,t,r,a,o),r=Fi(),e!==null&&!fe?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~o,Xe(e,n,o)):(A&&r&&vi(n),n.flags|=1,le(e,n,t,o),n.child)}function Ql(e,n,t,r,o){if(he(t)){var a=!0;Jr(n)}else a=!1;if(et(n,o),n.stateNode===null)Ir(e,n),Yc(n,t,r),Ia(n,t,r,o),r=!0;else if(e===null){var i=n.stateNode,l=n.memoizedProps;i.props=l;var s=i.context,c=t.contextType;typeof c=="object"&&c!==null?c=je(c):(c=he(t)?Fn:ie.current,c=rt(n,c));var p=t.getDerivedStateFromProps,g=typeof p=="function"||typeof i.getSnapshotBeforeUpdate=="function";g||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(l!==r||s!==c)&&Rl(n,i,r,c),tn=!1;var m=n.memoizedState;i.state=m,no(n,r,i,o),s=n.memoizedState,l!==r||m!==s||ge.current||tn?(typeof p=="function"&&(za(n,t,p,r),s=n.memoizedState),(l=tn||Al(n,t,l,r,m,s,c))?(g||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(n.flags|=4194308)):(typeof i.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=r,n.memoizedState=s),i.props=r,i.state=s,i.context=c,r=l):(typeof i.componentDidMount=="function"&&(n.flags|=4194308),r=!1)}else{i=n.stateNode,jc(e,n),l=n.memoizedProps,c=n.type===n.elementType?l:Ne(n.type,l),i.props=c,g=n.pendingProps,m=i.context,s=t.contextType,typeof s=="object"&&s!==null?s=je(s):(s=he(t)?Fn:ie.current,s=rt(n,s));var y=t.getDerivedStateFromProps;(p=typeof y=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(l!==g||m!==s)&&Rl(n,i,r,s),tn=!1,m=n.memoizedState,i.state=m,no(n,r,i,o);var S=n.memoizedState;l!==g||m!==S||ge.current||tn?(typeof y=="function"&&(za(n,t,y,r),S=n.memoizedState),(c=tn||Al(n,t,c,r,m,S,s)||!1)?(p||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(r,S,s),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(r,S,s)),typeof i.componentDidUpdate=="function"&&(n.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof i.componentDidUpdate!="function"||l===e.memoizedProps&&m===e.memoizedState||(n.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&m===e.memoizedState||(n.flags|=1024),n.memoizedProps=r,n.memoizedState=S),i.props=r,i.state=S,i.context=s,r=c):(typeof i.componentDidUpdate!="function"||l===e.memoizedProps&&m===e.memoizedState||(n.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&m===e.memoizedState||(n.flags|=1024),r=!1)}return Da(e,n,t,r,a,o)}function Da(e,n,t,r,o,a){eu(e,n);var i=(n.flags&128)!==0;if(!r&&!i)return o&&Nl(n,t,!1),Xe(e,n,a);r=n.stateNode,P1.current=n;var l=i&&typeof t.getDerivedStateFromError!="function"?null:r.render();return n.flags|=1,e!==null&&i?(n.child=at(n,e.child,null,a),n.child=at(n,null,l,a)):le(e,n,l,a),n.memoizedState=r.state,o&&Nl(n,t,!0),n.child}function nu(e){var n=e.stateNode;n.pendingContext?Pl(e,n.pendingContext,n.pendingContext!==n.context):n.context&&Pl(e,n.context,!1),$i(e,n.containerInfo)}function Kl(e,n,t,r,o){return ot(),bi(o),n.flags|=256,le(e,n,t,r),n.child}var Ba={dehydrated:null,treeContext:null,retryLane:0};function Aa(e){return{baseLanes:e,cachePool:null,transitions:null}}function tu(e,n,t){var r=n.pendingProps,o=R.current,a=!1,i=(n.flags&128)!==0,l;if((l=i)||(l=e!==null&&e.memoizedState===null?!1:(o&2)!==0),l?(a=!0,n.flags&=-129):(e===null||e.memoizedState!==null)&&(o|=1),O(R,o&1),e===null)return Na(n),e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(n.mode&1?e.data==="$!"?n.lanes=8:n.lanes=1073741824:n.lanes=1,null):(i=r.children,e=r.fallback,a?(r=n.mode,a=n.child,i={mode:"hidden",children:i},!(r&1)&&a!==null?(a.childLanes=0,a.pendingProps=i):a=So(i,r,0,null),e=Tn(e,r,t,null),a.return=n,e.return=n,a.sibling=e,n.child=a,n.child.memoizedState=Aa(t),n.memoizedState=Ba,e):Mi(n,i));if(o=e.memoizedState,o!==null&&(l=o.dehydrated,l!==null))return N1(e,n,i,r,l,o,t);if(a){a=r.fallback,i=n.mode,o=e.child,l=o.sibling;var s={mode:"hidden",children:r.children};return!(i&1)&&n.child!==o?(r=n.child,r.childLanes=0,r.pendingProps=s,n.deletions=null):(r=hn(o,s),r.subtreeFlags=o.subtreeFlags&14680064),l!==null?a=hn(l,a):(a=Tn(a,i,t,null),a.flags|=2),a.return=n,r.return=n,r.sibling=a,n.child=r,r=a,a=n.child,i=e.child.memoizedState,i=i===null?Aa(t):{baseLanes:i.baseLanes|t,cachePool:null,transitions:i.transitions},a.memoizedState=i,a.childLanes=e.childLanes&~t,n.memoizedState=Ba,r}return a=e.child,e=a.sibling,r=hn(a,{mode:"visible",children:r.children}),!(n.mode&1)&&(r.lanes=t),r.return=n,r.sibling=null,e!==null&&(t=n.deletions,t===null?(n.deletions=[e],n.flags|=16):t.push(e)),n.child=r,n.memoizedState=null,r}function Mi(e,n){return n=So({mode:"visible",children:n},e.mode,0,null),n.return=e,e.child=n}function kr(e,n,t,r){return r!==null&&bi(r),at(n,e.child,null,t),e=Mi(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function N1(e,n,t,r,o,a,i){if(t)return n.flags&256?(n.flags&=-257,r=Zo(Error(k(422))),kr(e,n,i,r)):n.memoizedState!==null?(n.child=e.child,n.flags|=128,null):(a=r.fallback,o=n.mode,r=So({mode:"visible",children:r.children},o,0,null),a=Tn(a,o,i,null),a.flags|=2,r.return=n,a.return=n,r.sibling=a,n.child=r,n.mode&1&&at(n,e.child,null,i),n.child.memoizedState=Aa(i),n.memoizedState=Ba,a);if(!(n.mode&1))return kr(e,n,i,null);if(o.data==="$!"){if(r=o.nextSibling&&o.nextSibling.dataset,r)var l=r.dgst;return r=l,a=Error(k(419)),r=Zo(a,r,void 0),kr(e,n,i,r)}if(l=(i&e.childLanes)!==0,fe||l){if(r=Z,r!==null){switch(i&-i){case 4:o=2;break;case 16:o=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:o=32;break;case 536870912:o=268435456;break;default:o=0}o=o&(r.suspendedLanes|i)?0:o,o!==0&&o!==a.retryLane&&(a.retryLane=o,qe(e,o),Oe(r,e,o,-1))}return Bi(),r=Zo(Error(k(421))),kr(e,n,i,r)}return o.data==="$?"?(n.flags|=128,n.child=e.child,n=H1.bind(null,e),o._reactRetry=n,null):(e=a.treeContext,be=dn(o.nextSibling),xe=n,A=!0,ze=null,e!==null&&(_e[$e++]=Ve,_e[$e++]=Qe,_e[$e++]=Pn,Ve=e.id,Qe=e.overflow,Pn=n),n=Mi(n,r.children),n.flags|=4096,n)}function Yl(e,n,t){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n),Ma(e.return,n,t)}function ea(e,n,t,r,o){var a=e.memoizedState;a===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:r,tail:t,tailMode:o}:(a.isBackwards=n,a.rendering=null,a.renderingStartTime=0,a.last=r,a.tail=t,a.tailMode=o)}function ru(e,n,t){var r=n.pendingProps,o=r.revealOrder,a=r.tail;if(le(e,n,r.children,t),r=R.current,r&2)r=r&1|2,n.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Yl(e,t,n);else if(e.tag===19)Yl(e,t,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break e;for(;e.sibling===null;){if(e.return===null||e.return===n)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(O(R,r),!(n.mode&1))n.memoizedState=null;else switch(o){case"forwards":for(t=n.child,o=null;t!==null;)e=t.alternate,e!==null&&to(e)===null&&(o=t),t=t.sibling;t=o,t===null?(o=n.child,n.child=null):(o=t.sibling,t.sibling=null),ea(n,!1,o,t,a);break;case"backwards":for(t=null,o=n.child,n.child=null;o!==null;){if(e=o.alternate,e!==null&&to(e)===null){n.child=o;break}e=o.sibling,o.sibling=t,t=o,o=e}ea(n,!0,t,null,a);break;case"together":ea(n,!1,null,null,void 0);break;default:n.memoizedState=null}return n.child}function Ir(e,n){!(n.mode&1)&&e!==null&&(e.alternate=null,n.alternate=null,n.flags|=2)}function Xe(e,n,t){if(e!==null&&(n.dependencies=e.dependencies),Mn|=n.lanes,!(t&n.childLanes))return null;if(e!==null&&n.child!==e.child)throw Error(k(153));if(n.child!==null){for(e=n.child,t=hn(e,e.pendingProps),n.child=t,t.return=n;e.sibling!==null;)e=e.sibling,t=t.sibling=hn(e,e.pendingProps),t.return=n;t.sibling=null}return n.child}function M1(e,n,t){switch(n.tag){case 3:nu(n),ot();break;case 5:Tc(n);break;case 1:he(n.type)&&Jr(n);break;case 4:$i(n,n.stateNode.containerInfo);break;case 10:var r=n.type._context,o=n.memoizedProps.value;O(Zr,r._currentValue),r._currentValue=o;break;case 13:if(r=n.memoizedState,r!==null)return r.dehydrated!==null?(O(R,R.current&1),n.flags|=128,null):t&n.child.childLanes?tu(e,n,t):(O(R,R.current&1),e=Xe(e,n,t),e!==null?e.sibling:null);O(R,R.current&1);break;case 19:if(r=(t&n.childLanes)!==0,e.flags&128){if(r)return ru(e,n,t);n.flags|=128}if(o=n.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),O(R,R.current),r)break;return null;case 22:case 23:return n.lanes=0,Zc(e,n,t)}return Xe(e,n,t)}var ou,Ra,au,iu;ou=function(e,n){for(var t=n.child;t!==null;){if(t.tag===5||t.tag===6)e.appendChild(t.stateNode);else if(t.tag!==4&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break;for(;t.sibling===null;){if(t.return===null||t.return===n)return;t=t.return}t.sibling.return=t.return,t=t.sibling}};Ra=function(){};au=function(e,n,t,r){var o=e.memoizedProps;if(o!==r){e=n.stateNode,Cn(We.current);var a=null;switch(t){case"input":o=ca(e,o),r=ca(e,r),a=[];break;case"select":o=U({},o,{value:void 0}),r=U({},r,{value:void 0}),a=[];break;case"textarea":o=pa(e,o),r=pa(e,r),a=[];break;default:typeof o.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Kr)}ga(t,r);var i;t=null;for(c in o)if(!r.hasOwnProperty(c)&&o.hasOwnProperty(c)&&o[c]!=null)if(c==="style"){var l=o[c];for(i in l)l.hasOwnProperty(i)&&(t||(t={}),t[i]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Lt.hasOwnProperty(c)?a||(a=[]):(a=a||[]).push(c,null));for(c in r){var s=r[c];if(l=o!=null?o[c]:void 0,r.hasOwnProperty(c)&&s!==l&&(s!=null||l!=null))if(c==="style")if(l){for(i in l)!l.hasOwnProperty(i)||s&&s.hasOwnProperty(i)||(t||(t={}),t[i]="");for(i in s)s.hasOwnProperty(i)&&l[i]!==s[i]&&(t||(t={}),t[i]=s[i])}else t||(a||(a=[]),a.push(c,t)),t=s;else c==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,l=l?l.__html:void 0,s!=null&&l!==s&&(a=a||[]).push(c,s)):c==="children"?typeof s!="string"&&typeof s!="number"||(a=a||[]).push(c,""+s):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Lt.hasOwnProperty(c)?(s!=null&&c==="onScroll"&&L("scroll",e),a||l===s||(a=[])):(a=a||[]).push(c,s))}t&&(a=a||[]).push("style",t);var c=a;(n.updateQueue=c)&&(n.flags|=4)}};iu=function(e,n,t,r){t!==r&&(n.flags|=4)};function kt(e,n){if(!A)switch(e.tailMode){case"hidden":n=e.tail;for(var t=null;n!==null;)n.alternate!==null&&(t=n),n=n.sibling;t===null?e.tail=null:t.sibling=null;break;case"collapsed":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function oe(e){var n=e.alternate!==null&&e.alternate.child===e.child,t=0,r=0;if(n)for(var o=e.child;o!==null;)t|=o.lanes|o.childLanes,r|=o.subtreeFlags&14680064,r|=o.flags&14680064,o.return=e,o=o.sibling;else for(o=e.child;o!==null;)t|=o.lanes|o.childLanes,r|=o.subtreeFlags,r|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=r,e.childLanes=t,n}function z1(e,n,t){var r=n.pendingProps;switch(yi(n),n.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return oe(n),null;case 1:return he(n.type)&&Yr(),oe(n),null;case 3:return r=n.stateNode,it(),B(ge),B(ie),Ci(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(xr(n)?n.flags|=4:e===null||e.memoizedState.isDehydrated&&!(n.flags&256)||(n.flags|=1024,ze!==null&&(Ya(ze),ze=null))),Ra(e,n),oe(n),null;case 5:Ei(n);var o=Cn(Yt.current);if(t=n.type,e!==null&&n.stateNode!=null)au(e,n,t,r,o),e.ref!==n.ref&&(n.flags|=512,n.flags|=2097152);else{if(!r){if(n.stateNode===null)throw Error(k(166));return oe(n),null}if(e=Cn(We.current),xr(n)){r=n.stateNode,t=n.type;var a=n.memoizedProps;switch(r[Ae]=n,r[Qt]=a,e=(n.mode&1)!==0,t){case"dialog":L("cancel",r),L("close",r);break;case"iframe":case"object":case"embed":L("load",r);break;case"video":case"audio":for(o=0;o<Ct.length;o++)L(Ct[o],r);break;case"source":L("error",r);break;case"img":case"image":case"link":L("error",r),L("load",r);break;case"details":L("toggle",r);break;case"input":ol(r,a),L("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!a.multiple},L("invalid",r);break;case"textarea":il(r,a),L("invalid",r)}ga(t,a),o=null;for(var i in a)if(a.hasOwnProperty(i)){var l=a[i];i==="children"?typeof l=="string"?r.textContent!==l&&(a.suppressHydrationWarning!==!0&&br(r.textContent,l,e),o=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(a.suppressHydrationWarning!==!0&&br(r.textContent,l,e),o=["children",""+l]):Lt.hasOwnProperty(i)&&l!=null&&i==="onScroll"&&L("scroll",r)}switch(t){case"input":dr(r),al(r,a,!0);break;case"textarea":dr(r),ll(r);break;case"select":case"option":break;default:typeof a.onClick=="function"&&(r.onclick=Kr)}r=o,n.updateQueue=r,r!==null&&(n.flags|=4)}else{i=o.nodeType===9?o:o.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=zs(t)),e==="http://www.w3.org/1999/xhtml"?t==="script"?(e=i.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=i.createElement(t,{is:r.is}):(e=i.createElement(t),t==="select"&&(i=e,r.multiple?i.multiple=!0:r.size&&(i.size=r.size))):e=i.createElementNS(e,t),e[Ae]=n,e[Qt]=r,ou(e,n,!1,!1),n.stateNode=e;e:{switch(i=ha(t,r),t){case"dialog":L("cancel",e),L("close",e),o=r;break;case"iframe":case"object":case"embed":L("load",e),o=r;break;case"video":case"audio":for(o=0;o<Ct.length;o++)L(Ct[o],e);o=r;break;case"source":L("error",e),o=r;break;case"img":case"image":case"link":L("error",e),L("load",e),o=r;break;case"details":L("toggle",e),o=r;break;case"input":ol(e,r),o=ca(e,r),L("invalid",e);break;case"option":o=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},o=U({},r,{value:void 0}),L("invalid",e);break;case"textarea":il(e,r),o=pa(e,r),L("invalid",e);break;default:o=r}ga(t,o),l=o;for(a in l)if(l.hasOwnProperty(a)){var s=l[a];a==="style"?Ls(e,s):a==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,s!=null&&Is(e,s)):a==="children"?typeof s=="string"?(t!=="textarea"||s!=="")&&Dt(e,s):typeof s=="number"&&Dt(e,""+s):a!=="suppressContentEditableWarning"&&a!=="suppressHydrationWarning"&&a!=="autoFocus"&&(Lt.hasOwnProperty(a)?s!=null&&a==="onScroll"&&L("scroll",e):s!=null&&ri(e,a,s,i))}switch(t){case"input":dr(e),al(e,r,!1);break;case"textarea":dr(e),ll(e);break;case"option":r.value!=null&&e.setAttribute("value",""+mn(r.value));break;case"select":e.multiple=!!r.multiple,a=r.value,a!=null?Jn(e,!!r.multiple,a,!1):r.defaultValue!=null&&Jn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof o.onClick=="function"&&(e.onclick=Kr)}switch(t){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(n.flags|=4)}n.ref!==null&&(n.flags|=512,n.flags|=2097152)}return oe(n),null;case 6:if(e&&n.stateNode!=null)iu(e,n,e.memoizedProps,r);else{if(typeof r!="string"&&n.stateNode===null)throw Error(k(166));if(t=Cn(Yt.current),Cn(We.current),xr(n)){if(r=n.stateNode,t=n.memoizedProps,r[Ae]=n,(a=r.nodeValue!==t)&&(e=xe,e!==null))switch(e.tag){case 3:br(r.nodeValue,t,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&br(r.nodeValue,t,(e.mode&1)!==0)}a&&(n.flags|=4)}else r=(t.nodeType===9?t:t.ownerDocument).createTextNode(r),r[Ae]=n,n.stateNode=r}return oe(n),null;case 13:if(B(R),r=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(A&&be!==null&&n.mode&1&&!(n.flags&128))_c(),ot(),n.flags|=98560,a=!1;else if(a=xr(n),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(k(318));if(a=n.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(k(317));a[Ae]=n}else ot(),!(n.flags&128)&&(n.memoizedState=null),n.flags|=4;oe(n),a=!1}else ze!==null&&(Ya(ze),ze=null),a=!0;if(!a)return n.flags&65536?n:null}return n.flags&128?(n.lanes=t,n):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(n.child.flags|=8192,n.mode&1&&(e===null||R.current&1?J===0&&(J=3):Bi())),n.updateQueue!==null&&(n.flags|=4),oe(n),null);case 4:return it(),Ra(e,n),e===null&&Ht(n.stateNode.containerInfo),oe(n),null;case 10:return ki(n.type._context),oe(n),null;case 17:return he(n.type)&&Yr(),oe(n),null;case 19:if(B(R),a=n.memoizedState,a===null)return oe(n),null;if(r=(n.flags&128)!==0,i=a.rendering,i===null)if(r)kt(a,!1);else{if(J!==0||e!==null&&e.flags&128)for(e=n.child;e!==null;){if(i=to(e),i!==null){for(n.flags|=128,kt(a,!1),r=i.updateQueue,r!==null&&(n.updateQueue=r,n.flags|=4),n.subtreeFlags=0,r=t,t=n.child;t!==null;)a=t,e=r,a.flags&=14680066,i=a.alternate,i===null?(a.childLanes=0,a.lanes=e,a.child=null,a.subtreeFlags=0,a.memoizedProps=null,a.memoizedState=null,a.updateQueue=null,a.dependencies=null,a.stateNode=null):(a.childLanes=i.childLanes,a.lanes=i.lanes,a.child=i.child,a.subtreeFlags=0,a.deletions=null,a.memoizedProps=i.memoizedProps,a.memoizedState=i.memoizedState,a.updateQueue=i.updateQueue,a.type=i.type,e=i.dependencies,a.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t=t.sibling;return O(R,R.current&1|2),n.child}e=e.sibling}a.tail!==null&&Q()>st&&(n.flags|=128,r=!0,kt(a,!1),n.lanes=4194304)}else{if(!r)if(e=to(i),e!==null){if(n.flags|=128,r=!0,t=e.updateQueue,t!==null&&(n.updateQueue=t,n.flags|=4),kt(a,!0),a.tail===null&&a.tailMode==="hidden"&&!i.alternate&&!A)return oe(n),null}else 2*Q()-a.renderingStartTime>st&&t!==1073741824&&(n.flags|=128,r=!0,kt(a,!1),n.lanes=4194304);a.isBackwards?(i.sibling=n.child,n.child=i):(t=a.last,t!==null?t.sibling=i:n.child=i,a.last=i)}return a.tail!==null?(n=a.tail,a.rendering=n,a.tail=n.sibling,a.renderingStartTime=Q(),n.sibling=null,t=R.current,O(R,r?t&1|2:t&1),n):(oe(n),null);case 22:case 23:return Di(),r=n.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(n.flags|=8192),r&&n.mode&1?ye&1073741824&&(oe(n),n.subtreeFlags&6&&(n.flags|=8192)):oe(n),null;case 24:return null;case 25:return null}throw Error(k(156,n.tag))}function I1(e,n){switch(yi(n),n.tag){case 1:return he(n.type)&&Yr(),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return it(),B(ge),B(ie),Ci(),e=n.flags,e&65536&&!(e&128)?(n.flags=e&-65537|128,n):null;case 5:return Ei(n),null;case 13:if(B(R),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(k(340));ot()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return B(R),null;case 4:return it(),null;case 10:return ki(n.type._context),null;case 22:case 23:return Di(),null;case 24:return null;default:return null}}var Sr=!1,ae=!1,O1=typeof WeakSet=="function"?WeakSet:Set,_=null;function Kn(e,n){var t=e.ref;if(t!==null)if(typeof t=="function")try{t(null)}catch(r){G(e,n,r)}else t.current=null}function Wa(e,n,t){try{t()}catch(r){G(e,n,r)}}var Jl=!1;function L1(e,n){if($a=Hr,e=dc(),mi(e)){if("selectionStart"in e)var t={start:e.selectionStart,end:e.selectionEnd};else e:{t=(t=e.ownerDocument)&&t.defaultView||window;var r=t.getSelection&&t.getSelection();if(r&&r.rangeCount!==0){t=r.anchorNode;var o=r.anchorOffset,a=r.focusNode;r=r.focusOffset;try{t.nodeType,a.nodeType}catch{t=null;break e}var i=0,l=-1,s=-1,c=0,p=0,g=e,m=null;n:for(;;){for(var y;g!==t||o!==0&&g.nodeType!==3||(l=i+o),g!==a||r!==0&&g.nodeType!==3||(s=i+r),g.nodeType===3&&(i+=g.nodeValue.length),(y=g.firstChild)!==null;)m=g,g=y;for(;;){if(g===e)break n;if(m===t&&++c===o&&(l=i),m===a&&++p===r&&(s=i),(y=g.nextSibling)!==null)break;g=m,m=g.parentNode}g=y}t=l===-1||s===-1?null:{start:l,end:s}}else t=null}t=t||{start:0,end:0}}else t=null;for(Ea={focusedElem:e,selectionRange:t},Hr=!1,_=n;_!==null;)if(n=_,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,_=e;else for(;_!==null;){n=_;try{var S=n.alternate;if(n.flags&1024)switch(n.tag){case 0:case 11:case 15:break;case 1:if(S!==null){var x=S.memoizedProps,j=S.memoizedState,f=n.stateNode,u=f.getSnapshotBeforeUpdate(n.elementType===n.type?x:Ne(n.type,x),j);f.__reactInternalSnapshotBeforeUpdate=u}break;case 3:var h=n.stateNode.containerInfo;h.nodeType===1?h.textContent="":h.nodeType===9&&h.documentElement&&h.removeChild(h.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(k(163))}}catch(b){G(n,n.return,b)}if(e=n.sibling,e!==null){e.return=n.return,_=e;break}_=n.return}return S=Jl,Jl=!1,S}function zt(e,n,t){var r=n.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var o=r=r.next;do{if((o.tag&e)===e){var a=o.destroy;o.destroy=void 0,a!==void 0&&Wa(n,t,a)}o=o.next}while(o!==r)}}function wo(e,n){if(n=n.updateQueue,n=n!==null?n.lastEffect:null,n!==null){var t=n=n.next;do{if((t.tag&e)===e){var r=t.create;t.destroy=r()}t=t.next}while(t!==n)}}function Ua(e){var n=e.ref;if(n!==null){var t=e.stateNode;switch(e.tag){case 5:e=t;break;default:e=t}typeof n=="function"?n(e):n.current=e}}function lu(e){var n=e.alternate;n!==null&&(e.alternate=null,lu(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&(delete n[Ae],delete n[Qt],delete n[Ta],delete n[b1],delete n[x1])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function su(e){return e.tag===5||e.tag===3||e.tag===4}function ql(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||su(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Ga(e,n,t){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?t.nodeType===8?t.parentNode.insertBefore(e,n):t.insertBefore(e,n):(t.nodeType===8?(n=t.parentNode,n.insertBefore(e,t)):(n=t,n.appendChild(e)),t=t._reactRootContainer,t!=null||n.onclick!==null||(n.onclick=Kr));else if(r!==4&&(e=e.child,e!==null))for(Ga(e,n,t),e=e.sibling;e!==null;)Ga(e,n,t),e=e.sibling}function Ha(e,n,t){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?t.insertBefore(e,n):t.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Ha(e,n,t),e=e.sibling;e!==null;)Ha(e,n,t),e=e.sibling}var ee=null,Me=!1;function en(e,n,t){for(t=t.child;t!==null;)cu(e,n,t),t=t.sibling}function cu(e,n,t){if(Re&&typeof Re.onCommitFiberUnmount=="function")try{Re.onCommitFiberUnmount(fo,t)}catch{}switch(t.tag){case 5:ae||Kn(t,n);case 6:var r=ee,o=Me;ee=null,en(e,n,t),ee=r,Me=o,ee!==null&&(Me?(e=ee,t=t.stateNode,e.nodeType===8?e.parentNode.removeChild(t):e.removeChild(t)):ee.removeChild(t.stateNode));break;case 18:ee!==null&&(Me?(e=ee,t=t.stateNode,e.nodeType===8?Qo(e.parentNode,t):e.nodeType===1&&Qo(e,t),Wt(e)):Qo(ee,t.stateNode));break;case 4:r=ee,o=Me,ee=t.stateNode.containerInfo,Me=!0,en(e,n,t),ee=r,Me=o;break;case 0:case 11:case 14:case 15:if(!ae&&(r=t.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){o=r=r.next;do{var a=o,i=a.destroy;a=a.tag,i!==void 0&&(a&2||a&4)&&Wa(t,n,i),o=o.next}while(o!==r)}en(e,n,t);break;case 1:if(!ae&&(Kn(t,n),r=t.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=t.memoizedProps,r.state=t.memoizedState,r.componentWillUnmount()}catch(l){G(t,n,l)}en(e,n,t);break;case 21:en(e,n,t);break;case 22:t.mode&1?(ae=(r=ae)||t.memoizedState!==null,en(e,n,t),ae=r):en(e,n,t);break;default:en(e,n,t)}}function Xl(e){var n=e.updateQueue;if(n!==null){e.updateQueue=null;var t=e.stateNode;t===null&&(t=e.stateNode=new O1),n.forEach(function(r){var o=V1.bind(null,e,r);t.has(r)||(t.add(r),r.then(o,o))})}}function Pe(e,n){var t=n.deletions;if(t!==null)for(var r=0;r<t.length;r++){var o=t[r];try{var a=e,i=n,l=i;e:for(;l!==null;){switch(l.tag){case 5:ee=l.stateNode,Me=!1;break e;case 3:ee=l.stateNode.containerInfo,Me=!0;break e;case 4:ee=l.stateNode.containerInfo,Me=!0;break e}l=l.return}if(ee===null)throw Error(k(160));cu(a,i,o),ee=null,Me=!1;var s=o.alternate;s!==null&&(s.return=null),o.return=null}catch(c){G(o,n,c)}}if(n.subtreeFlags&12854)for(n=n.child;n!==null;)uu(n,e),n=n.sibling}function uu(e,n){var t=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Pe(n,e),De(e),r&4){try{zt(3,e,e.return),wo(3,e)}catch(x){G(e,e.return,x)}try{zt(5,e,e.return)}catch(x){G(e,e.return,x)}}break;case 1:Pe(n,e),De(e),r&512&&t!==null&&Kn(t,t.return);break;case 5:if(Pe(n,e),De(e),r&512&&t!==null&&Kn(t,t.return),e.flags&32){var o=e.stateNode;try{Dt(o,"")}catch(x){G(e,e.return,x)}}if(r&4&&(o=e.stateNode,o!=null)){var a=e.memoizedProps,i=t!==null?t.memoizedProps:a,l=e.type,s=e.updateQueue;if(e.updateQueue=null,s!==null)try{l==="input"&&a.type==="radio"&&a.name!=null&&Ns(o,a),ha(l,i);var c=ha(l,a);for(i=0;i<s.length;i+=2){var p=s[i],g=s[i+1];p==="style"?Ls(o,g):p==="dangerouslySetInnerHTML"?Is(o,g):p==="children"?Dt(o,g):ri(o,p,g,c)}switch(l){case"input":ua(o,a);break;case"textarea":Ms(o,a);break;case"select":var m=o._wrapperState.wasMultiple;o._wrapperState.wasMultiple=!!a.multiple;var y=a.value;y!=null?Jn(o,!!a.multiple,y,!1):m!==!!a.multiple&&(a.defaultValue!=null?Jn(o,!!a.multiple,a.defaultValue,!0):Jn(o,!!a.multiple,a.multiple?[]:"",!1))}o[Qt]=a}catch(x){G(e,e.return,x)}}break;case 6:if(Pe(n,e),De(e),r&4){if(e.stateNode===null)throw Error(k(162));o=e.stateNode,a=e.memoizedProps;try{o.nodeValue=a}catch(x){G(e,e.return,x)}}break;case 3:if(Pe(n,e),De(e),r&4&&t!==null&&t.memoizedState.isDehydrated)try{Wt(n.containerInfo)}catch(x){G(e,e.return,x)}break;case 4:Pe(n,e),De(e);break;case 13:Pe(n,e),De(e),o=e.child,o.flags&8192&&(a=o.memoizedState!==null,o.stateNode.isHidden=a,!a||o.alternate!==null&&o.alternate.memoizedState!==null||(Oi=Q())),r&4&&Xl(e);break;case 22:if(p=t!==null&&t.memoizedState!==null,e.mode&1?(ae=(c=ae)||p,Pe(n,e),ae=c):Pe(n,e),De(e),r&8192){if(c=e.memoizedState!==null,(e.stateNode.isHidden=c)&&!p&&e.mode&1)for(_=e,p=e.child;p!==null;){for(g=_=p;_!==null;){switch(m=_,y=m.child,m.tag){case 0:case 11:case 14:case 15:zt(4,m,m.return);break;case 1:Kn(m,m.return);var S=m.stateNode;if(typeof S.componentWillUnmount=="function"){r=m,t=m.return;try{n=r,S.props=n.memoizedProps,S.state=n.memoizedState,S.componentWillUnmount()}catch(x){G(r,t,x)}}break;case 5:Kn(m,m.return);break;case 22:if(m.memoizedState!==null){es(g);continue}}y!==null?(y.return=m,_=y):es(g)}p=p.sibling}e:for(p=null,g=e;;){if(g.tag===5){if(p===null){p=g;try{o=g.stateNode,c?(a=o.style,typeof a.setProperty=="function"?a.setProperty("display","none","important"):a.display="none"):(l=g.stateNode,s=g.memoizedProps.style,i=s!=null&&s.hasOwnProperty("display")?s.display:null,l.style.display=Os("display",i))}catch(x){G(e,e.return,x)}}}else if(g.tag===6){if(p===null)try{g.stateNode.nodeValue=c?"":g.memoizedProps}catch(x){G(e,e.return,x)}}else if((g.tag!==22&&g.tag!==23||g.memoizedState===null||g===e)&&g.child!==null){g.child.return=g,g=g.child;continue}if(g===e)break e;for(;g.sibling===null;){if(g.return===null||g.return===e)break e;p===g&&(p=null),g=g.return}p===g&&(p=null),g.sibling.return=g.return,g=g.sibling}}break;case 19:Pe(n,e),De(e),r&4&&Xl(e);break;case 21:break;default:Pe(n,e),De(e)}}function De(e){var n=e.flags;if(n&2){try{e:{for(var t=e.return;t!==null;){if(su(t)){var r=t;break e}t=t.return}throw Error(k(160))}switch(r.tag){case 5:var o=r.stateNode;r.flags&32&&(Dt(o,""),r.flags&=-33);var a=ql(e);Ha(e,a,o);break;case 3:case 4:var i=r.stateNode.containerInfo,l=ql(e);Ga(e,l,i);break;default:throw Error(k(161))}}catch(s){G(e,e.return,s)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function D1(e,n,t){_=e,du(e)}function du(e,n,t){for(var r=(e.mode&1)!==0;_!==null;){var o=_,a=o.child;if(o.tag===22&&r){var i=o.memoizedState!==null||Sr;if(!i){var l=o.alternate,s=l!==null&&l.memoizedState!==null||ae;l=Sr;var c=ae;if(Sr=i,(ae=s)&&!c)for(_=o;_!==null;)i=_,s=i.child,i.tag===22&&i.memoizedState!==null?ns(o):s!==null?(s.return=i,_=s):ns(o);for(;a!==null;)_=a,du(a),a=a.sibling;_=o,Sr=l,ae=c}Zl(e)}else o.subtreeFlags&8772&&a!==null?(a.return=o,_=a):Zl(e)}}function Zl(e){for(;_!==null;){var n=_;if(n.flags&8772){var t=n.alternate;try{if(n.flags&8772)switch(n.tag){case 0:case 11:case 15:ae||wo(5,n);break;case 1:var r=n.stateNode;if(n.flags&4&&!ae)if(t===null)r.componentDidMount();else{var o=n.elementType===n.type?t.memoizedProps:Ne(n.type,t.memoizedProps);r.componentDidUpdate(o,t.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var a=n.updateQueue;a!==null&&Ll(n,a,r);break;case 3:var i=n.updateQueue;if(i!==null){if(t=null,n.child!==null)switch(n.child.tag){case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}Ll(n,i,t)}break;case 5:var l=n.stateNode;if(t===null&&n.flags&4){t=l;var s=n.memoizedProps;switch(n.type){case"button":case"input":case"select":case"textarea":s.autoFocus&&t.focus();break;case"img":s.src&&(t.src=s.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(n.memoizedState===null){var c=n.alternate;if(c!==null){var p=c.memoizedState;if(p!==null){var g=p.dehydrated;g!==null&&Wt(g)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(k(163))}ae||n.flags&512&&Ua(n)}catch(m){G(n,n.return,m)}}if(n===e){_=null;break}if(t=n.sibling,t!==null){t.return=n.return,_=t;break}_=n.return}}function es(e){for(;_!==null;){var n=_;if(n===e){_=null;break}var t=n.sibling;if(t!==null){t.return=n.return,_=t;break}_=n.return}}function ns(e){for(;_!==null;){var n=_;try{switch(n.tag){case 0:case 11:case 15:var t=n.return;try{wo(4,n)}catch(s){G(n,t,s)}break;case 1:var r=n.stateNode;if(typeof r.componentDidMount=="function"){var o=n.return;try{r.componentDidMount()}catch(s){G(n,o,s)}}var a=n.return;try{Ua(n)}catch(s){G(n,a,s)}break;case 5:var i=n.return;try{Ua(n)}catch(s){G(n,i,s)}}}catch(s){G(n,n.return,s)}if(n===e){_=null;break}var l=n.sibling;if(l!==null){l.return=n.return,_=l;break}_=n.return}}var B1=Math.ceil,ao=Ze.ReactCurrentDispatcher,zi=Ze.ReactCurrentOwner,Ce=Ze.ReactCurrentBatchConfig,z=0,Z=null,K=null,ne=0,ye=0,Yn=bn(0),J=0,Zt=null,Mn=0,ko=0,Ii=0,It=null,pe=null,Oi=0,st=1/0,Ge=null,io=!1,Va=null,fn=null,_r=!1,ln=null,lo=0,Ot=0,Qa=null,Or=-1,Lr=0;function se(){return z&6?Q():Or!==-1?Or:Or=Q()}function gn(e){return e.mode&1?z&2&&ne!==0?ne&-ne:k1.transition!==null?(Lr===0&&(Lr=Ys()),Lr):(e=I,e!==0||(e=window.event,e=e===void 0?16:tc(e.type)),e):1}function Oe(e,n,t,r){if(50<Ot)throw Ot=0,Qa=null,Error(k(185));tr(e,t,r),(!(z&2)||e!==Z)&&(e===Z&&(!(z&2)&&(ko|=t),J===4&&on(e,ne)),me(e,r),t===1&&z===0&&!(n.mode&1)&&(st=Q()+500,yo&&xn()))}function me(e,n){var t=e.callbackNode;kb(e,n);var r=Gr(e,e===Z?ne:0);if(r===0)t!==null&&ul(t),e.callbackNode=null,e.callbackPriority=0;else if(n=r&-r,e.callbackPriority!==n){if(t!=null&&ul(t),n===1)e.tag===0?w1(ts.bind(null,e)):wc(ts.bind(null,e)),v1(function(){!(z&6)&&xn()}),t=null;else{switch(Js(r)){case 1:t=si;break;case 4:t=Qs;break;case 16:t=Ur;break;case 536870912:t=Ks;break;default:t=Ur}t=bu(t,pu.bind(null,e))}e.callbackPriority=n,e.callbackNode=t}}function pu(e,n){if(Or=-1,Lr=0,z&6)throw Error(k(327));var t=e.callbackNode;if(nt()&&e.callbackNode!==t)return null;var r=Gr(e,e===Z?ne:0);if(r===0)return null;if(r&30||r&e.expiredLanes||n)n=so(e,r);else{n=r;var o=z;z|=2;var a=gu();(Z!==e||ne!==n)&&(Ge=null,st=Q()+500,jn(e,n));do try{W1();break}catch(l){fu(e,l)}while(!0);wi(),ao.current=a,z=o,K!==null?n=0:(Z=null,ne=0,n=J)}if(n!==0){if(n===2&&(o=xa(e),o!==0&&(r=o,n=Ka(e,o))),n===1)throw t=Zt,jn(e,0),on(e,r),me(e,Q()),t;if(n===6)on(e,r);else{if(o=e.current.alternate,!(r&30)&&!A1(o)&&(n=so(e,r),n===2&&(a=xa(e),a!==0&&(r=a,n=Ka(e,a))),n===1))throw t=Zt,jn(e,0),on(e,r),me(e,Q()),t;switch(e.finishedWork=o,e.finishedLanes=r,n){case 0:case 1:throw Error(k(345));case 2:_n(e,pe,Ge);break;case 3:if(on(e,r),(r&130023424)===r&&(n=Oi+500-Q(),10<n)){if(Gr(e,0)!==0)break;if(o=e.suspendedLanes,(o&r)!==r){se(),e.pingedLanes|=e.suspendedLanes&o;break}e.timeoutHandle=ja(_n.bind(null,e,pe,Ge),n);break}_n(e,pe,Ge);break;case 4:if(on(e,r),(r&4194240)===r)break;for(n=e.eventTimes,o=-1;0<r;){var i=31-Ie(r);a=1<<i,i=n[i],i>o&&(o=i),r&=~a}if(r=o,r=Q()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*B1(r/1960))-r,10<r){e.timeoutHandle=ja(_n.bind(null,e,pe,Ge),r);break}_n(e,pe,Ge);break;case 5:_n(e,pe,Ge);break;default:throw Error(k(329))}}}return me(e,Q()),e.callbackNode===t?pu.bind(null,e):null}function Ka(e,n){var t=It;return e.current.memoizedState.isDehydrated&&(jn(e,n).flags|=256),e=so(e,n),e!==2&&(n=pe,pe=t,n!==null&&Ya(n)),e}function Ya(e){pe===null?pe=e:pe.push.apply(pe,e)}function A1(e){for(var n=e;;){if(n.flags&16384){var t=n.updateQueue;if(t!==null&&(t=t.stores,t!==null))for(var r=0;r<t.length;r++){var o=t[r],a=o.getSnapshot;o=o.value;try{if(!Le(a(),o))return!1}catch{return!1}}}if(t=n.child,n.subtreeFlags&16384&&t!==null)t.return=n,n=t;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function on(e,n){for(n&=~Ii,n&=~ko,e.suspendedLanes|=n,e.pingedLanes&=~n,e=e.expirationTimes;0<n;){var t=31-Ie(n),r=1<<t;e[t]=-1,n&=~r}}function ts(e){if(z&6)throw Error(k(327));nt();var n=Gr(e,0);if(!(n&1))return me(e,Q()),null;var t=so(e,n);if(e.tag!==0&&t===2){var r=xa(e);r!==0&&(n=r,t=Ka(e,r))}if(t===1)throw t=Zt,jn(e,0),on(e,n),me(e,Q()),t;if(t===6)throw Error(k(345));return e.finishedWork=e.current.alternate,e.finishedLanes=n,_n(e,pe,Ge),me(e,Q()),null}function Li(e,n){var t=z;z|=1;try{return e(n)}finally{z=t,z===0&&(st=Q()+500,yo&&xn())}}function zn(e){ln!==null&&ln.tag===0&&!(z&6)&&nt();var n=z;z|=1;var t=Ce.transition,r=I;try{if(Ce.transition=null,I=1,e)return e()}finally{I=r,Ce.transition=t,z=n,!(z&6)&&xn()}}function Di(){ye=Yn.current,B(Yn)}function jn(e,n){e.finishedWork=null,e.finishedLanes=0;var t=e.timeoutHandle;if(t!==-1&&(e.timeoutHandle=-1,m1(t)),K!==null)for(t=K.return;t!==null;){var r=t;switch(yi(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Yr();break;case 3:it(),B(ge),B(ie),Ci();break;case 5:Ei(r);break;case 4:it();break;case 13:B(R);break;case 19:B(R);break;case 10:ki(r.type._context);break;case 22:case 23:Di()}t=t.return}if(Z=e,K=e=hn(e.current,null),ne=ye=n,J=0,Zt=null,Ii=ko=Mn=0,pe=It=null,En!==null){for(n=0;n<En.length;n++)if(t=En[n],r=t.interleaved,r!==null){t.interleaved=null;var o=r.next,a=t.pending;if(a!==null){var i=a.next;a.next=o,r.next=i}t.pending=r}En=null}return e}function fu(e,n){do{var t=K;try{if(wi(),Mr.current=oo,ro){for(var r=W.memoizedState;r!==null;){var o=r.queue;o!==null&&(o.pending=null),r=r.next}ro=!1}if(Nn=0,X=Y=W=null,Mt=!1,Jt=0,zi.current=null,t===null||t.return===null){J=1,Zt=n,K=null;break}e:{var a=e,i=t.return,l=t,s=n;if(n=ne,l.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){var c=s,p=l,g=p.tag;if(!(p.mode&1)&&(g===0||g===11||g===15)){var m=p.alternate;m?(p.updateQueue=m.updateQueue,p.memoizedState=m.memoizedState,p.lanes=m.lanes):(p.updateQueue=null,p.memoizedState=null)}var y=Ul(i);if(y!==null){y.flags&=-257,Gl(y,i,l,a,n),y.mode&1&&Wl(a,c,n),n=y,s=c;var S=n.updateQueue;if(S===null){var x=new Set;x.add(s),n.updateQueue=x}else S.add(s);break e}else{if(!(n&1)){Wl(a,c,n),Bi();break e}s=Error(k(426))}}else if(A&&l.mode&1){var j=Ul(i);if(j!==null){!(j.flags&65536)&&(j.flags|=256),Gl(j,i,l,a,n),bi(lt(s,l));break e}}a=s=lt(s,l),J!==4&&(J=2),It===null?It=[a]:It.push(a),a=i;do{switch(a.tag){case 3:a.flags|=65536,n&=-n,a.lanes|=n;var f=Jc(a,s,n);Ol(a,f);break e;case 1:l=s;var u=a.type,h=a.stateNode;if(!(a.flags&128)&&(typeof u.getDerivedStateFromError=="function"||h!==null&&typeof h.componentDidCatch=="function"&&(fn===null||!fn.has(h)))){a.flags|=65536,n&=-n,a.lanes|=n;var b=qc(a,l,n);Ol(a,b);break e}}a=a.return}while(a!==null)}mu(t)}catch(v){n=v,K===t&&t!==null&&(K=t=t.return);continue}break}while(!0)}function gu(){var e=ao.current;return ao.current=oo,e===null?oo:e}function Bi(){(J===0||J===3||J===2)&&(J=4),Z===null||!(Mn&268435455)&&!(ko&268435455)||on(Z,ne)}function so(e,n){var t=z;z|=2;var r=gu();(Z!==e||ne!==n)&&(Ge=null,jn(e,n));do try{R1();break}catch(o){fu(e,o)}while(!0);if(wi(),z=t,ao.current=r,K!==null)throw Error(k(261));return Z=null,ne=0,J}function R1(){for(;K!==null;)hu(K)}function W1(){for(;K!==null&&!fb();)hu(K)}function hu(e){var n=yu(e.alternate,e,ye);e.memoizedProps=e.pendingProps,n===null?mu(e):K=n,zi.current=null}function mu(e){var n=e;do{var t=n.alternate;if(e=n.return,n.flags&32768){if(t=I1(t,n),t!==null){t.flags&=32767,K=t;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{J=6,K=null;return}}else if(t=z1(t,n,ye),t!==null){K=t;return}if(n=n.sibling,n!==null){K=n;return}K=n=e}while(n!==null);J===0&&(J=5)}function _n(e,n,t){var r=I,o=Ce.transition;try{Ce.transition=null,I=1,U1(e,n,t,r)}finally{Ce.transition=o,I=r}return null}function U1(e,n,t,r){do nt();while(ln!==null);if(z&6)throw Error(k(327));t=e.finishedWork;var o=e.finishedLanes;if(t===null)return null;if(e.finishedWork=null,e.finishedLanes=0,t===e.current)throw Error(k(177));e.callbackNode=null,e.callbackPriority=0;var a=t.lanes|t.childLanes;if(Sb(e,a),e===Z&&(K=Z=null,ne=0),!(t.subtreeFlags&2064)&&!(t.flags&2064)||_r||(_r=!0,bu(Ur,function(){return nt(),null})),a=(t.flags&15990)!==0,t.subtreeFlags&15990||a){a=Ce.transition,Ce.transition=null;var i=I;I=1;var l=z;z|=4,zi.current=null,L1(e,t),uu(t,e),c1(Ea),Hr=!!$a,Ea=$a=null,e.current=t,D1(t),gb(),z=l,I=i,Ce.transition=a}else e.current=t;if(_r&&(_r=!1,ln=e,lo=o),a=e.pendingLanes,a===0&&(fn=null),vb(t.stateNode),me(e,Q()),n!==null)for(r=e.onRecoverableError,t=0;t<n.length;t++)o=n[t],r(o.value,{componentStack:o.stack,digest:o.digest});if(io)throw io=!1,e=Va,Va=null,e;return lo&1&&e.tag!==0&&nt(),a=e.pendingLanes,a&1?e===Qa?Ot++:(Ot=0,Qa=e):Ot=0,xn(),null}function nt(){if(ln!==null){var e=Js(lo),n=Ce.transition,t=I;try{if(Ce.transition=null,I=16>e?16:e,ln===null)var r=!1;else{if(e=ln,ln=null,lo=0,z&6)throw Error(k(331));var o=z;for(z|=4,_=e.current;_!==null;){var a=_,i=a.child;if(_.flags&16){var l=a.deletions;if(l!==null){for(var s=0;s<l.length;s++){var c=l[s];for(_=c;_!==null;){var p=_;switch(p.tag){case 0:case 11:case 15:zt(8,p,a)}var g=p.child;if(g!==null)g.return=p,_=g;else for(;_!==null;){p=_;var m=p.sibling,y=p.return;if(lu(p),p===c){_=null;break}if(m!==null){m.return=y,_=m;break}_=y}}}var S=a.alternate;if(S!==null){var x=S.child;if(x!==null){S.child=null;do{var j=x.sibling;x.sibling=null,x=j}while(x!==null)}}_=a}}if(a.subtreeFlags&2064&&i!==null)i.return=a,_=i;else e:for(;_!==null;){if(a=_,a.flags&2048)switch(a.tag){case 0:case 11:case 15:zt(9,a,a.return)}var f=a.sibling;if(f!==null){f.return=a.return,_=f;break e}_=a.return}}var u=e.current;for(_=u;_!==null;){i=_;var h=i.child;if(i.subtreeFlags&2064&&h!==null)h.return=i,_=h;else e:for(i=u;_!==null;){if(l=_,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:wo(9,l)}}catch(v){G(l,l.return,v)}if(l===i){_=null;break e}var b=l.sibling;if(b!==null){b.return=l.return,_=b;break e}_=l.return}}if(z=o,xn(),Re&&typeof Re.onPostCommitFiberRoot=="function")try{Re.onPostCommitFiberRoot(fo,e)}catch{}r=!0}return r}finally{I=t,Ce.transition=n}}return!1}function rs(e,n,t){n=lt(t,n),n=Jc(e,n,1),e=pn(e,n,1),n=se(),e!==null&&(tr(e,1,n),me(e,n))}function G(e,n,t){if(e.tag===3)rs(e,e,t);else for(;n!==null;){if(n.tag===3){rs(n,e,t);break}else if(n.tag===1){var r=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(fn===null||!fn.has(r))){e=lt(t,e),e=qc(n,e,1),n=pn(n,e,1),e=se(),n!==null&&(tr(n,1,e),me(n,e));break}}n=n.return}}function G1(e,n,t){var r=e.pingCache;r!==null&&r.delete(n),n=se(),e.pingedLanes|=e.suspendedLanes&t,Z===e&&(ne&t)===t&&(J===4||J===3&&(ne&130023424)===ne&&500>Q()-Oi?jn(e,0):Ii|=t),me(e,n)}function vu(e,n){n===0&&(e.mode&1?(n=gr,gr<<=1,!(gr&130023424)&&(gr=4194304)):n=1);var t=se();e=qe(e,n),e!==null&&(tr(e,n,t),me(e,t))}function H1(e){var n=e.memoizedState,t=0;n!==null&&(t=n.retryLane),vu(e,t)}function V1(e,n){var t=0;switch(e.tag){case 13:var r=e.stateNode,o=e.memoizedState;o!==null&&(t=o.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(k(314))}r!==null&&r.delete(n),vu(e,t)}var yu;yu=function(e,n,t){if(e!==null)if(e.memoizedProps!==n.pendingProps||ge.current)fe=!0;else{if(!(e.lanes&t)&&!(n.flags&128))return fe=!1,M1(e,n,t);fe=!!(e.flags&131072)}else fe=!1,A&&n.flags&1048576&&kc(n,Xr,n.index);switch(n.lanes=0,n.tag){case 2:var r=n.type;Ir(e,n),e=n.pendingProps;var o=rt(n,ie.current);et(n,t),o=Ti(null,n,r,e,o,t);var a=Fi();return n.flags|=1,typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0?(n.tag=1,n.memoizedState=null,n.updateQueue=null,he(r)?(a=!0,Jr(n)):a=!1,n.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,_i(n),o.updater=xo,n.stateNode=o,o._reactInternals=n,Ia(n,r,e,t),n=Da(null,n,r,!0,a,t)):(n.tag=0,A&&a&&vi(n),le(null,n,o,t),n=n.child),n;case 16:r=n.elementType;e:{switch(Ir(e,n),e=n.pendingProps,o=r._init,r=o(r._payload),n.type=r,o=n.tag=K1(r),e=Ne(r,e),o){case 0:n=La(null,n,r,e,t);break e;case 1:n=Ql(null,n,r,e,t);break e;case 11:n=Hl(null,n,r,e,t);break e;case 14:n=Vl(null,n,r,Ne(r.type,e),t);break e}throw Error(k(306,r,""))}return n;case 0:return r=n.type,o=n.pendingProps,o=n.elementType===r?o:Ne(r,o),La(e,n,r,o,t);case 1:return r=n.type,o=n.pendingProps,o=n.elementType===r?o:Ne(r,o),Ql(e,n,r,o,t);case 3:e:{if(nu(n),e===null)throw Error(k(387));r=n.pendingProps,a=n.memoizedState,o=a.element,jc(e,n),no(n,r,null,t);var i=n.memoizedState;if(r=i.element,a.isDehydrated)if(a={element:r,isDehydrated:!1,cache:i.cache,pendingSuspenseBoundaries:i.pendingSuspenseBoundaries,transitions:i.transitions},n.updateQueue.baseState=a,n.memoizedState=a,n.flags&256){o=lt(Error(k(423)),n),n=Kl(e,n,r,t,o);break e}else if(r!==o){o=lt(Error(k(424)),n),n=Kl(e,n,r,t,o);break e}else for(be=dn(n.stateNode.containerInfo.firstChild),xe=n,A=!0,ze=null,t=Ec(n,null,r,t),n.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling;else{if(ot(),r===o){n=Xe(e,n,t);break e}le(e,n,r,t)}n=n.child}return n;case 5:return Tc(n),e===null&&Na(n),r=n.type,o=n.pendingProps,a=e!==null?e.memoizedProps:null,i=o.children,Ca(r,o)?i=null:a!==null&&Ca(r,a)&&(n.flags|=32),eu(e,n),le(e,n,i,t),n.child;case 6:return e===null&&Na(n),null;case 13:return tu(e,n,t);case 4:return $i(n,n.stateNode.containerInfo),r=n.pendingProps,e===null?n.child=at(n,null,r,t):le(e,n,r,t),n.child;case 11:return r=n.type,o=n.pendingProps,o=n.elementType===r?o:Ne(r,o),Hl(e,n,r,o,t);case 7:return le(e,n,n.pendingProps,t),n.child;case 8:return le(e,n,n.pendingProps.children,t),n.child;case 12:return le(e,n,n.pendingProps.children,t),n.child;case 10:e:{if(r=n.type._context,o=n.pendingProps,a=n.memoizedProps,i=o.value,O(Zr,r._currentValue),r._currentValue=i,a!==null)if(Le(a.value,i)){if(a.children===o.children&&!ge.current){n=Xe(e,n,t);break e}}else for(a=n.child,a!==null&&(a.return=n);a!==null;){var l=a.dependencies;if(l!==null){i=a.child;for(var s=l.firstContext;s!==null;){if(s.context===r){if(a.tag===1){s=Ke(-1,t&-t),s.tag=2;var c=a.updateQueue;if(c!==null){c=c.shared;var p=c.pending;p===null?s.next=s:(s.next=p.next,p.next=s),c.pending=s}}a.lanes|=t,s=a.alternate,s!==null&&(s.lanes|=t),Ma(a.return,t,n),l.lanes|=t;break}s=s.next}}else if(a.tag===10)i=a.type===n.type?null:a.child;else if(a.tag===18){if(i=a.return,i===null)throw Error(k(341));i.lanes|=t,l=i.alternate,l!==null&&(l.lanes|=t),Ma(i,t,n),i=a.sibling}else i=a.child;if(i!==null)i.return=a;else for(i=a;i!==null;){if(i===n){i=null;break}if(a=i.sibling,a!==null){a.return=i.return,i=a;break}i=i.return}a=i}le(e,n,o.children,t),n=n.child}return n;case 9:return o=n.type,r=n.pendingProps.children,et(n,t),o=je(o),r=r(o),n.flags|=1,le(e,n,r,t),n.child;case 14:return r=n.type,o=Ne(r,n.pendingProps),o=Ne(r.type,o),Vl(e,n,r,o,t);case 15:return Xc(e,n,n.type,n.pendingProps,t);case 17:return r=n.type,o=n.pendingProps,o=n.elementType===r?o:Ne(r,o),Ir(e,n),n.tag=1,he(r)?(e=!0,Jr(n)):e=!1,et(n,t),Yc(n,r,o),Ia(n,r,o,t),Da(null,n,r,!0,e,t);case 19:return ru(e,n,t);case 22:return Zc(e,n,t)}throw Error(k(156,n.tag))};function bu(e,n){return Vs(e,n)}function Q1(e,n,t,r){this.tag=e,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ee(e,n,t,r){return new Q1(e,n,t,r)}function Ai(e){return e=e.prototype,!(!e||!e.isReactComponent)}function K1(e){if(typeof e=="function")return Ai(e)?1:0;if(e!=null){if(e=e.$$typeof,e===ai)return 11;if(e===ii)return 14}return 2}function hn(e,n){var t=e.alternate;return t===null?(t=Ee(e.tag,n,e.key,e.mode),t.elementType=e.elementType,t.type=e.type,t.stateNode=e.stateNode,t.alternate=e,e.alternate=t):(t.pendingProps=n,t.type=e.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=e.flags&14680064,t.childLanes=e.childLanes,t.lanes=e.lanes,t.child=e.child,t.memoizedProps=e.memoizedProps,t.memoizedState=e.memoizedState,t.updateQueue=e.updateQueue,n=e.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},t.sibling=e.sibling,t.index=e.index,t.ref=e.ref,t}function Dr(e,n,t,r,o,a){var i=2;if(r=e,typeof e=="function")Ai(e)&&(i=1);else if(typeof e=="string")i=5;else e:switch(e){case Bn:return Tn(t.children,o,a,n);case oi:i=8,o|=8;break;case aa:return e=Ee(12,t,n,o|2),e.elementType=aa,e.lanes=a,e;case ia:return e=Ee(13,t,n,o),e.elementType=ia,e.lanes=a,e;case la:return e=Ee(19,t,n,o),e.elementType=la,e.lanes=a,e;case Ts:return So(t,o,a,n);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Cs:i=10;break e;case js:i=9;break e;case ai:i=11;break e;case ii:i=14;break e;case nn:i=16,r=null;break e}throw Error(k(130,e==null?e:typeof e,""))}return n=Ee(i,t,n,o),n.elementType=e,n.type=r,n.lanes=a,n}function Tn(e,n,t,r){return e=Ee(7,e,r,n),e.lanes=t,e}function So(e,n,t,r){return e=Ee(22,e,r,n),e.elementType=Ts,e.lanes=t,e.stateNode={isHidden:!1},e}function na(e,n,t){return e=Ee(6,e,null,n),e.lanes=t,e}function ta(e,n,t){return n=Ee(4,e.children!==null?e.children:[],e.key,n),n.lanes=t,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}function Y1(e,n,t,r,o){this.tag=n,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Oo(0),this.expirationTimes=Oo(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Oo(0),this.identifierPrefix=r,this.onRecoverableError=o,this.mutableSourceEagerHydrationData=null}function Ri(e,n,t,r,o,a,i,l,s){return e=new Y1(e,n,t,l,s),n===1?(n=1,a===!0&&(n|=8)):n=0,a=Ee(3,null,null,n),e.current=a,a.stateNode=e,a.memoizedState={element:r,isDehydrated:t,cache:null,transitions:null,pendingSuspenseBoundaries:null},_i(a),e}function J1(e,n,t){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Dn,key:r==null?null:""+r,children:e,containerInfo:n,implementation:t}}function xu(e){if(!e)return vn;e=e._reactInternals;e:{if(On(e)!==e||e.tag!==1)throw Error(k(170));var n=e;do{switch(n.tag){case 3:n=n.stateNode.context;break e;case 1:if(he(n.type)){n=n.stateNode.__reactInternalMemoizedMergedChildContext;break e}}n=n.return}while(n!==null);throw Error(k(171))}if(e.tag===1){var t=e.type;if(he(t))return xc(e,t,n)}return n}function wu(e,n,t,r,o,a,i,l,s){return e=Ri(t,r,!0,e,o,a,i,l,s),e.context=xu(null),t=e.current,r=se(),o=gn(t),a=Ke(r,o),a.callback=n??null,pn(t,a,o),e.current.lanes=o,tr(e,o,r),me(e,r),e}function _o(e,n,t,r){var o=n.current,a=se(),i=gn(o);return t=xu(t),n.context===null?n.context=t:n.pendingContext=t,n=Ke(a,i),n.payload={element:e},r=r===void 0?null:r,r!==null&&(n.callback=r),e=pn(o,n,i),e!==null&&(Oe(e,o,i,a),Nr(e,o,i)),i}function co(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function os(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var t=e.retryLane;e.retryLane=t!==0&&t<n?t:n}}function Wi(e,n){os(e,n),(e=e.alternate)&&os(e,n)}function q1(){return null}var ku=typeof reportError=="function"?reportError:function(e){console.error(e)};function Ui(e){this._internalRoot=e}$o.prototype.render=Ui.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(k(409));_o(e,n,null,null)};$o.prototype.unmount=Ui.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;zn(function(){_o(null,e,null,null)}),n[Je]=null}};function $o(e){this._internalRoot=e}$o.prototype.unstable_scheduleHydration=function(e){if(e){var n=Zs();e={blockedOn:null,target:e,priority:n};for(var t=0;t<rn.length&&n!==0&&n<rn[t].priority;t++);rn.splice(t,0,e),t===0&&nc(e)}};function Gi(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Eo(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function as(){}function X1(e,n,t,r,o){if(o){if(typeof r=="function"){var a=r;r=function(){var c=co(i);a.call(c)}}var i=wu(n,r,e,0,null,!1,!1,"",as);return e._reactRootContainer=i,e[Je]=i.current,Ht(e.nodeType===8?e.parentNode:e),zn(),i}for(;o=e.lastChild;)e.removeChild(o);if(typeof r=="function"){var l=r;r=function(){var c=co(s);l.call(c)}}var s=Ri(e,0,!1,null,null,!1,!1,"",as);return e._reactRootContainer=s,e[Je]=s.current,Ht(e.nodeType===8?e.parentNode:e),zn(function(){_o(n,s,t,r)}),s}function Co(e,n,t,r,o){var a=t._reactRootContainer;if(a){var i=a;if(typeof o=="function"){var l=o;o=function(){var s=co(i);l.call(s)}}_o(n,i,e,o)}else i=X1(t,n,e,o,r);return co(i)}qs=function(e){switch(e.tag){case 3:var n=e.stateNode;if(n.current.memoizedState.isDehydrated){var t=Et(n.pendingLanes);t!==0&&(ci(n,t|1),me(n,Q()),!(z&6)&&(st=Q()+500,xn()))}break;case 13:zn(function(){var r=qe(e,1);if(r!==null){var o=se();Oe(r,e,1,o)}}),Wi(e,1)}};ui=function(e){if(e.tag===13){var n=qe(e,134217728);if(n!==null){var t=se();Oe(n,e,134217728,t)}Wi(e,134217728)}};Xs=function(e){if(e.tag===13){var n=gn(e),t=qe(e,n);if(t!==null){var r=se();Oe(t,e,n,r)}Wi(e,n)}};Zs=function(){return I};ec=function(e,n){var t=I;try{return I=e,n()}finally{I=t}};va=function(e,n,t){switch(n){case"input":if(ua(e,t),n=t.name,t.type==="radio"&&n!=null){for(t=e;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll("input[name="+JSON.stringify(""+n)+'][type="radio"]'),n=0;n<t.length;n++){var r=t[n];if(r!==e&&r.form===e.form){var o=vo(r);if(!o)throw Error(k(90));Ps(r),ua(r,o)}}}break;case"textarea":Ms(e,t);break;case"select":n=t.value,n!=null&&Jn(e,!!t.multiple,n,!1)}};As=Li;Rs=zn;var Z1={usingClientEntryPoint:!1,Events:[or,Un,vo,Ds,Bs,Li]},St={findFiberByHostInstance:$n,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},ex={bundleType:St.bundleType,version:St.version,rendererPackageName:St.rendererPackageName,rendererConfig:St.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Ze.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Gs(e),e===null?null:e.stateNode},findFiberByHostInstance:St.findFiberByHostInstance||q1,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var $r=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!$r.isDisabled&&$r.supportsFiber)try{fo=$r.inject(ex),Re=$r}catch{}}ke.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Z1;ke.createPortal=function(e,n){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Gi(n))throw Error(k(200));return J1(e,n,null,t)};ke.createRoot=function(e,n){if(!Gi(e))throw Error(k(299));var t=!1,r="",o=ku;return n!=null&&(n.unstable_strictMode===!0&&(t=!0),n.identifierPrefix!==void 0&&(r=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),n=Ri(e,1,!1,null,null,t,!1,r,o),e[Je]=n.current,Ht(e.nodeType===8?e.parentNode:e),new Ui(n)};ke.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(k(188)):(e=Object.keys(e).join(","),Error(k(268,e)));return e=Gs(n),e=e===null?null:e.stateNode,e};ke.flushSync=function(e){return zn(e)};ke.hydrate=function(e,n,t){if(!Eo(n))throw Error(k(200));return Co(null,e,n,!0,t)};ke.hydrateRoot=function(e,n,t){if(!Gi(e))throw Error(k(405));var r=t!=null&&t.hydratedSources||null,o=!1,a="",i=ku;if(t!=null&&(t.unstable_strictMode===!0&&(o=!0),t.identifierPrefix!==void 0&&(a=t.identifierPrefix),t.onRecoverableError!==void 0&&(i=t.onRecoverableError)),n=wu(n,null,e,1,t??null,o,!1,a,i),e[Je]=n.current,Ht(e),r)for(e=0;e<r.length;e++)t=r[e],o=t._getVersion,o=o(t._source),n.mutableSourceEagerHydrationData==null?n.mutableSourceEagerHydrationData=[t,o]:n.mutableSourceEagerHydrationData.push(t,o);return new $o(n)};ke.render=function(e,n,t){if(!Eo(n))throw Error(k(200));return Co(null,e,n,!1,t)};ke.unmountComponentAtNode=function(e){if(!Eo(e))throw Error(k(40));return e._reactRootContainer?(zn(function(){Co(null,null,e,!1,function(){e._reactRootContainer=null,e[Je]=null})}),!0):!1};ke.unstable_batchedUpdates=Li;ke.unstable_renderSubtreeIntoContainer=function(e,n,t,r){if(!Eo(t))throw Error(k(200));if(e==null||e._reactInternals===void 0)throw Error(k(38));return Co(e,n,t,!1,r)};ke.version="18.3.1-next-f1338f8080-20240426";function Su(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Su)}catch(e){console.error(e)}}Su(),Ss.exports=ke;var nx=Ss.exports,_u,is=nx;_u=is.createRoot,is.hydrateRoot;const tx=["title","section","two-column","feature-grid","data-table","stat-row","timeline","quote","closing","image-hero","comparison"],Ja={title:"Title",section:"Section divider","two-column":"Two column","feature-grid":"Feature grid","data-table":"Data table","stat-row":"Stat row",timeline:"Timeline",quote:"Quote",closing:"Closing","image-hero":"Image hero",comparison:"Comparison"};function rx(e){switch(e){case"title":return{layout:e,eyebrow:"Eyebrow",heading:"Title slide",lead:"Supporting line."};case"section":return{layout:e,number:"01",eyebrow:"Part",heading:"Section title",lead:""};case"two-column":return{layout:e,heading:"Heading",body:"Left column body text.",image:"",imageAlt:"Image"};case"image-hero":return{layout:e,eyebrow:"Story",heading:"Hero moment",lead:"Caption over a full-bleed image.",image:"",imageAlt:"Hero image"};case"comparison":return{layout:e,heading:"Before vs after",leftLabel:"Before",left:"The old way — slow, manual, error-prone.",rightLabel:"After",right:"The new way — automated, fast, reliable."};case"feature-grid":return{layout:e,heading:"Feature grid",columns:3,cards:[{title:"One",body:"First point."},{title:"Two",body:"Second point."},{title:"Three",body:"Third point."}]};case"data-table":return{layout:e,heading:"Table",columns:["Column A","Column B"],rows:[["a1","b1"],["a2","b2"]]};case"stat-row":return{layout:e,heading:"Stats",stats:[{value:"100%",label:"Metric"},{value:"2x",label:"Metric"}]};case"timeline":return{layout:e,heading:"Timeline",steps:[{title:"Step one",body:"Detail."},{title:"Step two",body:"Detail."}]};case"quote":return{layout:e,quote:"A memorable quote.",by:"Attribution"};case"closing":return{layout:e,eyebrow:"Thanks",heading:"Closing",lead:"Call to action.",cta:{label:"Get started",href:"https://example.com"}};default:return{layout:e,heading:"Slide"}}}const $u={type:"deck",meta:{title:"Acme Q3",company:"Acme",theme:"claude"},slides:[{layout:"title",eyebrow:"Q3 2026",heading:"Acme All-Hands",lead:"Momentum, metrics, and what's next."},{layout:"section",number:"01",eyebrow:"Part one",heading:"Where we are"},{layout:"feature-grid",heading:"Three pillars",columns:3,cards:[{icon:"fa-solid fa-bolt",title:"Speed",body:"Ship 3x faster."},{title:"Safety",body:"SOC2 in progress."},{title:"Simplicity",body:"One command."}]},{layout:"stat-row",heading:"By the numbers",stats:[{value:"98%",label:"Uptime"},{value:"$1.2M",label:"ARR"},{value:"3.1x",label:"YoY"}]},{layout:"data-table",heading:"Pipeline",columns:["Stage","Count","Value"],rows:[["Lead","120","$600k"],["POC","34","$340k"],["Closed","12","$210k"]]},{layout:"timeline",heading:"Roadmap",steps:[{title:"Now",body:"PPTX export."},{title:"Next",body:"Studio editor."},{title:"Later",body:"Templates."}]},{layout:"quote",quote:"Make it work, make it right, make it fast.",by:"Kent Beck"},{layout:"closing",heading:"Thank you",lead:"Questions?",cta:{label:"Get started",href:"https://acme.com"}}]},Eu="claude",Cu="0.1.0",ju="Anthropic / Claude-inspired theme: warm cream paper, clay-coral accent, grotesk + editorial-serif pairing.",Tu="Warm, human, editorial, high-craft, calm — cream paper, soft clay-coral signal, Styrene-style grotesk headings over a Tiempos-style serif body. Restrained, trustworthy, not corporate.",Fu="MIT",Pu="Timur Isachenko",Nu={bg:"#faf9f5",bg2:"#f4f3ee",text:"#141413",muted:"#73706a",accent:"#d97757",accent2:"#6a9bcc",cardBg:"#ffffff",border:"#e8e6dc"},Mu={headingFont:"'Space Grotesk', system-ui, sans-serif",bodyFont:"'Lora', Georgia, 'Times New Roman', serif",headingWeight:600,googleFonts:["Space+Grotesk:wght@500;600;700","Lora:wght@400;500;600"]},zu={radius:"12px",slideWidth:"1280px"},ox={name:Eu,version:Cu,extends:"default-tech",description:ju,vibe:Tu,license:Fu,author:Pu,roles:Nu,typography:Mu,geometry:zu},ax=Object.freeze(Object.defineProperty({__proto__:null,author:Pu,default:ox,description:ju,geometry:zu,license:Fu,name:Eu,roles:Nu,typography:Mu,version:Cu,vibe:Tu},Symbol.toStringTag,{value:"Module"})),Iu="default-tech",Ou="0.1.0",Lu="Edgy tech-startup default: dark canvas, violet + cyan accents, bold geometric sans.",Du="Edgy tech startup — dark, confident, neon-accented.",Bu="MIT",Au="Timur Isachenko",Ru={bg:"#0e0e12",bg2:"#16161d",text:"#f4f4f5",muted:"#a1a1aa",accent:"#7c3aed",accent2:"#22d3ee",cardBg:"rgba(255,255,255,0.04)",border:"rgba(255,255,255,0.08)"},Wu={headingFont:"'Montserrat', system-ui, sans-serif",bodyFont:"'Open Sans', system-ui, sans-serif",headingWeight:800,googleFonts:["Montserrat:wght@700;800","Open+Sans:wght@400;600"]},Uu={radius:"18px",slideWidth:"1280px"},ix={name:Iu,version:Ou,description:Lu,vibe:Du,license:Bu,author:Au,roles:Ru,typography:Wu,geometry:Uu},lx=Object.freeze(Object.defineProperty({__proto__:null,author:Au,default:ix,description:Lu,geometry:Uu,license:Bu,name:Iu,roles:Ru,typography:Wu,version:Ou,vibe:Du},Symbol.toStringTag,{value:"Module"})),Gu="aerospace-hud",Hu="0.1.0",Vu="Aerospace HUD — deep navy, cyan instruments, warning orange, blueprint grid.",Qu="Aerospace HUD — navy cockpit, cyan instruments, warning orange, Barlow Condensed (matches Axiom gallery).",Ku="MIT",Yu="Timur Isachenko",Ju={bg:"#0a1d3a",bg2:"#0d2347",text:"#f0f8ff",muted:"#2a7aaa",accent:"#5ec8ff",accent2:"#ff7a18",cardBg:"rgba(94,200,255,0.08)",border:"rgba(94,200,255,0.28)"},qu={headingFont:"'Barlow Condensed', system-ui, sans-serif",bodyFont:"'Barlow', system-ui, sans-serif",headingWeight:700,googleFonts:["Barlow+Condensed:wght@600;700","Barlow:wght@400;600","IBM+Plex+Mono:wght@500"]},Xu={radius:"4px",slideWidth:"1280px"},sx={name:Gu,version:Hu,extends:"default-tech",description:Vu,vibe:Qu,license:Ku,author:Yu,roles:Ju,typography:qu,geometry:Xu},cx=Object.freeze(Object.defineProperty({__proto__:null,author:Yu,default:sx,description:Vu,geometry:Xu,license:Ku,name:Gu,roles:Ju,typography:qu,version:Hu,vibe:Qu},Symbol.toStringTag,{value:"Module"})),Zu="art-deco",ed="0.1.0",nd="Art Deco investor — deep emerald, gold leaf, Cinzel display.",td="Art Deco — #0c2a24 emerald, gold #c8a24a, Cinzel (matches Meridian Club gallery).",rd="MIT",od="Timur Isachenko",ad={bg:"#0c2a24",bg2:"#113530",text:"#f5eed8",muted:"#c9bfa0",accent:"#c8a24a",accent2:"#e2c47a",cardBg:"rgba(200,162,74,0.08)",border:"rgba(200,162,74,0.35)"},id={headingFont:"'Cinzel', Georgia, serif",bodyFont:"'Cormorant Garamond', Georgia, serif",headingWeight:600,googleFonts:["Cinzel:wght@500;600;700","Cormorant+Garamond:wght@400;600"]},ld={radius:"0px",slideWidth:"1280px"},ux={name:Zu,version:ed,extends:"default-tech",description:nd,vibe:td,license:rd,author:od,roles:ad,typography:id,geometry:ld},dx=Object.freeze(Object.defineProperty({__proto__:null,author:od,default:ux,description:nd,geometry:ld,license:rd,name:Zu,roles:ad,typography:id,version:ed,vibe:td},Symbol.toStringTag,{value:"Module"})),sd="aurora-glass",cd="0.1.0",ud="Dark aurora glassmorphism — void canvas, frosted cards, violet + cyan glow.",dd="Aurora glass — pure black void, Syne + Inter, violet #a78bfa + cyan #67e8f9 (matches NovaSpark gallery).",pd="MIT",fd="Timur Isachenko",gd={bg:"#000000",bg2:"#0a0612",text:"#ffffff",muted:"#a5a0b8",accent:"#a78bfa",accent2:"#67e8f9",cardBg:"rgba(255,255,255,0.06)",border:"rgba(255,255,255,0.12)"},hd={headingFont:"'Syne', system-ui, sans-serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:800,googleFonts:["Syne:wght@700;800","Inter:wght@400;600"]},md={radius:"16px",slideWidth:"1280px"},px={name:sd,version:cd,extends:"default-tech",description:ud,vibe:dd,license:pd,author:fd,roles:gd,typography:hd,geometry:md},fx=Object.freeze(Object.defineProperty({__proto__:null,author:fd,default:px,description:ud,geometry:md,license:pd,name:sd,roles:gd,typography:hd,version:cd,vibe:dd},Symbol.toStringTag,{value:"Module"})),vd="bauhaus",yd="0.1.0",bd="Bauhaus primary system — cream field, red/yellow/blue geometry, bold grotesk.",xd="Bauhaus — warm cream #f4f1ea, primary red #e63946 + blue #1f4ae0 (matches Primary gallery).",wd="MIT",kd="Timur Isachenko",Sd={bg:"#f4f1ea",bg2:"#ede9e0",text:"#0d0d0d",muted:"#6a655c",accent:"#e63946",accent2:"#1f4ae0",cardBg:"rgba(0,0,0,0.04)",border:"rgba(13,13,13,0.2)"},_d={headingFont:"'Archivo', system-ui, sans-serif",bodyFont:"'Space Grotesk', system-ui, sans-serif",headingWeight:800,googleFonts:["Archivo:wght@600;800","Space+Grotesk:wght@400;600"]},$d={radius:"0px",slideWidth:"1280px"},gx={name:vd,version:yd,extends:"default-tech",description:bd,vibe:xd,license:wd,author:kd,roles:Sd,typography:_d,geometry:$d},hx=Object.freeze(Object.defineProperty({__proto__:null,author:kd,default:gx,description:bd,geometry:$d,license:wd,name:vd,roles:Sd,typography:_d,version:yd,vibe:xd},Symbol.toStringTag,{value:"Module"})),Ed="biennale-yellow",Cd="1.0.0",jd="Biennale Yellow — Instrument Serif on parchment with solar yellow bloom and deep indigo ink (frontend-slides / beautiful-html-templates).",Td="Biennale Yellow — parchment #E9E5DB, sun #F1EE2E, indigo #1B2566, Instrument Serif + Archivo (frontend-slides biennale-yellow).",Fd="MIT",Pd="Timur Isachenko",Nd={bg:"#E9E5DB",bg2:"#DCD6C4",text:"#1B2566",muted:"#4A5480",accent:"#F1EE2E",accent2:"#E26B4A",cardBg:"rgba(255,255,255,0.35)",border:"rgba(27,37,102,0.22)"},Md={headingFont:"'Instrument Serif', Georgia, serif",bodyFont:"'Archivo', system-ui, sans-serif",headingWeight:400,googleFonts:["Instrument+Serif:ital@0;1","Archivo:wght@400;500;600","JetBrains+Mono:wght@400"]},zd={radius:"0px",slideWidth:"1280px"},mx={name:Ed,version:Cd,extends:"default-tech",description:jd,vibe:Td,license:Fd,author:Pd,roles:Nd,typography:Md,geometry:zd},vx=Object.freeze(Object.defineProperty({__proto__:null,author:Pd,default:mx,description:jd,geometry:zd,license:Fd,name:Ed,roles:Nd,typography:Md,version:Cd,vibe:Td},Symbol.toStringTag,{value:"Module"})),Id="blueprint",Od="0.1.0",Ld="Engineering blueprint — deep navy, cyan lines, Space Mono / Space Grotesk.",Dd="Blueprint — #0a1f3d navy, cyan #00e5ff grid (matches Apsis Mission gallery).",Bd="MIT",Ad="Timur Isachenko",Rd={bg:"#0a1f3d",bg2:"#0d2548",text:"#e8f4ff",muted:"#7aa8c8",accent:"#00e5ff",accent2:"#ffffff",cardBg:"rgba(0,229,255,0.06)",border:"rgba(0,229,255,0.28)"},Wd={headingFont:"'Space Grotesk', system-ui, sans-serif",bodyFont:"'Space Mono', monospace",headingWeight:700,googleFonts:["Space+Grotesk:wght@500;700","Space+Mono:wght@400;700","IBM+Plex+Mono:wght@500"]},Ud={radius:"2px",slideWidth:"1280px"},yx={name:Id,version:Od,extends:"default-tech",description:Ld,vibe:Dd,license:Bd,author:Ad,roles:Rd,typography:Wd,geometry:Ud},bx=Object.freeze(Object.defineProperty({__proto__:null,author:Ad,default:yx,description:Ld,geometry:Ud,license:Bd,name:Id,roles:Rd,typography:Wd,version:Od,vibe:Dd},Symbol.toStringTag,{value:"Module"})),Gd="bold-poster",Hd="1.0.0",Vd="Bold Poster — Shrikhand display, Libre Baskerville body, tomato red accent (frontend-slides / beautiful-html-templates).",Qd="Bold Poster — white canvas, ink #1C1410, tomato #D8000F, Shrikhand + Libre Baskerville (frontend-slides bold-poster).",Kd="MIT",Yd="Timur Isachenko",Jd={bg:"#FFFFFF",bg2:"#F5F2EF",text:"#1C1410",muted:"#6B5E54",accent:"#D8000F",accent2:"#1C1410",cardBg:"#F5F2EF",border:"rgba(28,20,16,0.85)"},qd={headingFont:"'Shrikhand', cursive",bodyFont:"'Libre Baskerville', Georgia, serif",headingWeight:400,googleFonts:["Shrikhand","Libre+Baskerville:wght@400;700","Space+Grotesk:wght@500;600"]},Xd={radius:"0px",slideWidth:"1280px"},xx={name:Gd,version:Hd,extends:"default-tech",description:Vd,vibe:Qd,license:Kd,author:Yd,roles:Jd,typography:qd,geometry:Xd},wx=Object.freeze(Object.defineProperty({__proto__:null,author:Yd,default:xx,description:Vd,geometry:Xd,license:Kd,name:Gd,roles:Jd,typography:qd,version:Hd,vibe:Qd},Symbol.toStringTag,{value:"Module"})),Zd="bold-signal",ep="1.0.0",np="Bold Signal — Archivo Black on dark gradient with vibrant orange card focal (frontend-slides STYLE_PRESETS).",tp="Bold Signal — #1a1a1a dark, orange card #FF5722, Archivo Black + Space Grotesk (frontend-slides Bold Signal).",rp="MIT",op="Timur Isachenko",ap={bg:"#1a1a1a",bg2:"#2d2d2d",text:"#ffffff",muted:"#a0a0a0",accent:"#FF5722",accent2:"#FF8A65",cardBg:"#FF5722",border:"rgba(255,255,255,0.12)"},ip={headingFont:"'Archivo Black', system-ui, sans-serif",bodyFont:"'Space Grotesk', system-ui, sans-serif",headingWeight:400,googleFonts:["Archivo+Black","Space+Grotesk:wght@400;500;600"]},lp={radius:"16px",slideWidth:"1280px"},kx={name:Zd,version:ep,extends:"default-tech",description:np,vibe:tp,license:rp,author:op,roles:ap,typography:ip,geometry:lp},Sx=Object.freeze(Object.defineProperty({__proto__:null,author:op,default:kx,description:np,geometry:lp,license:rp,name:Zd,roles:ap,typography:ip,version:ep,vibe:tp},Symbol.toStringTag,{value:"Module"})),sp="botanical-luxe",cp="0.1.0",up="Botanical luxe — deep forest green, gold leaf, serif elegance for impact reports.",dp="Botanical luxe — forest #1d3a2f, gold #bfa55a, Cormorant + DM Sans (matches Verdant gallery).",pp="MIT",fp="Timur Isachenko",gp={bg:"#1d3a2f",bg2:"#162d24",text:"#f3efe4",muted:"#6b9e7a",accent:"#bfa55a",accent2:"#4a7c59",cardBg:"rgba(191,165,90,0.08)",border:"rgba(191,165,90,0.28)"},hp={headingFont:"'Cormorant Garamond', Georgia, serif",bodyFont:"'DM Sans', system-ui, sans-serif",headingWeight:600,googleFonts:["Cormorant+Garamond:wght@500;600;700","DM+Sans:wght@400;600"]},mp={radius:"8px",slideWidth:"1280px"},_x={name:sp,version:cp,extends:"default-tech",description:up,vibe:dp,license:pp,author:fp,roles:gp,typography:hp,geometry:mp},$x=Object.freeze(Object.defineProperty({__proto__:null,author:fp,default:_x,description:up,geometry:mp,license:pp,name:sp,roles:gp,typography:hp,version:cp,vibe:dp},Symbol.toStringTag,{value:"Module"})),vp="broadsheet",yp="0.1.0",bp="Newspaper broadsheet — warm newsprint, deep ink, Pirata One masthead + Playfair.",xp="Broadsheet — #f2ece0 newsprint, ink #1a1208, Pirata One masthead (matches Daily Ledger gallery).",wp="MIT",kp="Timur Isachenko",Sp={bg:"#f2ece0",bg2:"#e8dfc8",text:"#1a1208",muted:"#8a7560",accent:"#1a1208",accent2:"#5c4d38",cardBg:"rgba(26,18,8,0.04)",border:"rgba(26,18,8,0.18)"},_p={headingFont:"'Playfair Display', Georgia, serif",bodyFont:"'Lora', Georgia, serif",headingWeight:700,googleFonts:["Pirata+One","Playfair+Display:wght@500;700","Lora:wght@400;600"]},$p={radius:"0px",slideWidth:"1280px"},Ex={name:vp,version:yp,extends:"default-tech",description:bp,vibe:xp,license:wp,author:kp,roles:Sp,typography:_p,geometry:$p},Cx=Object.freeze(Object.defineProperty({__proto__:null,author:kp,default:Ex,description:bp,geometry:$p,license:wp,name:vp,roles:Sp,typography:_p,version:yp,vibe:xp},Symbol.toStringTag,{value:"Module"})),Ep="broadside",Cp="1.0.0",jp="Broadside — dark editorial canvas with fire-orange accent and massive Barlow type (frontend-slides).",Tp="Broadside — ink #111111, fire orange #E85D26, cream #F0ECE5, Barlow 900 + IBM Plex Mono (frontend-slides broadside).",Fp="MIT",Pp="Timur Isachenko",Np={bg:"#111111",bg2:"#1A1A18",text:"#F0ECE5",muted:"#888880",accent:"#E85D26",accent2:"#F0ECE5",cardBg:"rgba(232,93,38,0.12)",border:"rgba(40,40,38,1)"},Mp={headingFont:"'Barlow', system-ui, sans-serif",bodyFont:"'Barlow', system-ui, sans-serif",headingWeight:900,googleFonts:["Barlow:wght@400;700;900","IBM+Plex+Mono:wght@400;500"]},zp={radius:"0px",slideWidth:"1280px"},jx={name:Ep,version:Cp,extends:"default-tech",description:jp,vibe:Tp,license:Fp,author:Pp,roles:Np,typography:Mp,geometry:zp},Tx=Object.freeze(Object.defineProperty({__proto__:null,author:Pp,default:jx,description:jp,geometry:zp,license:Fp,name:Ep,roles:Np,typography:Mp,version:Cp,vibe:Tp},Symbol.toStringTag,{value:"Module"})),Ip="brutalist-acid",Op="0.1.0",Lp="Dark acid brutalist — near-black concrete, #d6ff00 hazard lime, hard mono edges.",Dp="Acid brutalist — #1c1c1c, electric lime, Space Mono + Barlow Condensed (matches MONOLITH gallery).",Bp="MIT",Ap="Timur Isachenko",Rp={bg:"#1c1c1c",bg2:"#2a2a2a",text:"#e8e6e1",muted:"#888888",accent:"#d6ff00",accent2:"#ffffff",cardBg:"rgba(214,255,0,0.06)",border:"rgba(214,255,0,0.35)"},Wp={headingFont:"'Space Mono', monospace",bodyFont:"'Barlow Condensed', system-ui, sans-serif",headingWeight:700,googleFonts:["Space+Mono:wght@400;700","Barlow+Condensed:wght@500;700"]},Up={radius:"0px",slideWidth:"1280px"},Fx={name:Ip,version:Op,extends:"default-tech",description:Lp,vibe:Dp,license:Bp,author:Ap,roles:Rp,typography:Wp,geometry:Up},Px=Object.freeze(Object.defineProperty({__proto__:null,author:Ap,default:Fx,description:Lp,geometry:Up,license:Bp,name:Ip,roles:Rp,typography:Wp,version:Op,vibe:Dp},Symbol.toStringTag,{value:"Module"})),Gp="brutalist-mono",Hp="0.1.0",Vp="Raw brutalist theme with concrete-grey background, monospace type, hard square corners, and a single hazard-orange accent.",Qp="Raw brutalist / technical — concrete off-white bg, near-black monospace ink, hazard-orange accent, thick black hairlines, zero radius.",Kp="MIT",Yp="Timur Isachenko",Jp={bg:"#f0efe9",bg2:"#e3e1d8",text:"#0a0a0a",muted:"#57554c",accent:"#ff3600",accent2:"#0a0a0a",cardBg:"#ffffff",border:"rgba(10,10,10,0.85)"},qp={headingFont:"'IBM Plex Mono', 'Courier New', monospace",bodyFont:"'IBM Plex Mono', 'Courier New', monospace",headingWeight:700,googleFonts:["IBM+Plex+Mono:wght@400;600;700"]},Xp={radius:"0px",slideWidth:"1280px"},Nx={name:Gp,version:Hp,extends:"default-tech",description:Vp,vibe:Qp,license:Kp,author:Yp,roles:Jp,typography:qp,geometry:Xp},Mx=Object.freeze(Object.defineProperty({__proto__:null,author:Yp,default:Nx,description:Vp,geometry:Xp,license:Kp,name:Gp,roles:Jp,typography:qp,version:Hp,vibe:Qp},Symbol.toStringTag,{value:"Module"})),Zp="candy-pop",ef="0.1.0",nf="Candy pop — cream canvas, hot pink + butter yellow, soft blobs, rounded type.",tf="Candy pop — cream canvas, hot pink + jellybean blue, Fredoka + Poppins (matches Jellybean gallery).",rf="MIT",of="Timur Isachenko",af={bg:"#fdf3e7",bg2:"#f7e8d4",text:"#1a1a2e",muted:"#7a6a80",accent:"#ff5d8f",accent2:"#2d7dd2",cardBg:"rgba(255,93,143,0.08)",border:"rgba(26,26,46,0.14)"},lf={headingFont:"'Fredoka', system-ui, sans-serif",bodyFont:"'Poppins', system-ui, sans-serif",headingWeight:700,googleFonts:["Fredoka:wght@500;700","Poppins:wght@400;600"]},sf={radius:"28px",slideWidth:"1280px"},zx={name:Zp,version:ef,extends:"default-tech",description:nf,vibe:tf,license:rf,author:of,roles:af,typography:lf,geometry:sf},Ix=Object.freeze(Object.defineProperty({__proto__:null,author:of,default:zx,description:nf,geometry:sf,license:rf,name:Zp,roles:af,typography:lf,version:ef,vibe:tf},Symbol.toStringTag,{value:"Module"})),cf="corporate",uf="0.1.0",df="Formal corporate presentation theme with crisp white background and restrained navy/blue palette.",pf="Formal corporate — crisp white, navy text, single restrained blue accent, clean sans-serif, thin rules, minimal shadow.",ff="MIT",gf="Timur Isachenko",hf={bg:"#ffffff",bg2:"#f8f9fc",text:"#1a2035",muted:"#6b7280",accent:"#1d4ed8",accent2:"#0369a1",cardBg:"#f1f5f9",border:"rgba(0,0,0,0.08)"},mf={headingFont:"'Inter', system-ui, sans-serif",bodyFont:"'Source Sans 3', system-ui, sans-serif",headingWeight:700,googleFonts:["Inter:wght@400;700","Source+Sans+3:wght@400;600"]},vf={radius:"8px",slideWidth:"1280px"},Ox={name:cf,version:uf,extends:"default-tech",description:df,vibe:pf,license:ff,author:gf,roles:hf,typography:mf,geometry:vf},Lx=Object.freeze(Object.defineProperty({__proto__:null,author:gf,default:Ox,description:df,geometry:vf,license:ff,name:cf,roles:hf,typography:mf,version:uf,vibe:pf},Symbol.toStringTag,{value:"Module"})),yf="creative-mode",bf="1.0.0",xf="Creative Mode — cream canvas, hard ink borders, forest/pink/orange/yellow blocks, Archivo Black (frontend-slides).",wf="Creative Mode — cream #EFE9D9, ink #0F0F0F, green #1F8A4C + pink #F06CA8, Archivo Black + Space Grotesk (frontend-slides creative-mode).",kf="MIT",Sf="Timur Isachenko",_f={bg:"#EFE9D9",bg2:"#E4DCC4",text:"#0F0F0F",muted:"#2A2A2A",accent:"#E85A1F",accent2:"#F06CA8",cardBg:"#F5C518",border:"rgba(15,15,15,0.95)"},$f={headingFont:"'Archivo Black', system-ui, sans-serif",bodyFont:"'Space Grotesk', system-ui, sans-serif",headingWeight:400,googleFonts:["Archivo+Black","Space+Grotesk:wght@400;600","JetBrains+Mono:wght@400;500"]},Ef={radius:"0px",slideWidth:"1280px"},Dx={name:yf,version:bf,extends:"default-tech",description:xf,vibe:wf,license:kf,author:Sf,roles:_f,typography:$f,geometry:Ef},Bx=Object.freeze(Object.defineProperty({__proto__:null,author:Sf,default:Dx,description:xf,geometry:Ef,license:kf,name:yf,roles:_f,typography:$f,version:bf,vibe:wf},Symbol.toStringTag,{value:"Module"})),Cf="creative-voltage",jf="1.0.0",Tf="Creative Voltage — electric blue + neon yellow, Syne + Space Mono (frontend-slides STYLE_PRESETS).",Ff="Creative Voltage — electric blue #0066ff, dark #1a1a2e, neon #d4ff00, Syne + Space Mono (frontend-slides Creative Voltage).",Pf="MIT",Nf="Timur Isachenko",Mf={bg:"#0066ff",bg2:"#1a1a2e",text:"#ffffff",muted:"rgba(255,255,255,0.7)",accent:"#d4ff00",accent2:"#ffffff",cardBg:"rgba(26,26,46,0.55)",border:"rgba(212,255,0,0.45)"},zf={headingFont:"'Syne', system-ui, sans-serif",bodyFont:"'Space Mono', monospace",headingWeight:800,googleFonts:["Syne:wght@700;800","Space+Mono:wght@400;700"]},If={radius:"0px",slideWidth:"1280px"},Ax={name:Cf,version:jf,extends:"default-tech",description:Tf,vibe:Ff,license:Pf,author:Nf,roles:Mf,typography:zf,geometry:If},Rx=Object.freeze(Object.defineProperty({__proto__:null,author:Nf,default:Ax,description:Tf,geometry:If,license:Pf,name:Cf,roles:Mf,typography:zf,version:jf,vibe:Ff},Symbol.toStringTag,{value:"Module"})),Of="crt-terminal",Lf="0.1.0",Df="CRT phosphor terminal — near-black, acid green glow, cyan accents, monospace.",Bf="CRT terminal — void bg, cream type, phosphor green + cyan accents (matches RetroNet gallery).",Af="MIT",Rf="Timur Isachenko",Wf={bg:"#06040a",bg2:"#1a1010",text:"#f5f0e8",muted:"#8a8578",accent:"#39ff14",accent2:"#00f5ff",cardBg:"rgba(57,255,20,0.06)",border:"rgba(57,255,20,0.28)"},Uf={headingFont:"'VT323', monospace",bodyFont:"'Share Tech Mono', monospace",headingWeight:400,googleFonts:["VT323","Share+Tech+Mono","Courier+Prime"]},Gf={radius:"0px",slideWidth:"1280px"},Wx={name:Of,version:Lf,extends:"default-tech",description:Df,vibe:Bf,license:Af,author:Rf,roles:Wf,typography:Uf,geometry:Gf},Ux=Object.freeze(Object.defineProperty({__proto__:null,author:Rf,default:Wx,description:Df,geometry:Gf,license:Af,name:Of,roles:Wf,typography:Uf,version:Lf,vibe:Bf},Symbol.toStringTag,{value:"Module"})),Hf="dark-botanical",Vf="1.0.0",Qf="Dark Botanical — Cormorant on near-black with warm pink/gold accents (frontend-slides STYLE_PRESETS).",Kf="Dark Botanical — #0f0f0f void, warm #d4a574/#e8b4b8 accents, Cormorant + IBM Plex Sans (frontend-slides Dark Botanical).",Yf="MIT",Jf="Timur Isachenko",qf={bg:"#0f0f0f",bg2:"#1a1816",text:"#e8e4df",muted:"#9a9590",accent:"#d4a574",accent2:"#e8b4b8",cardBg:"rgba(232,228,223,0.06)",border:"rgba(232,228,223,0.12)"},Xf={headingFont:"'Cormorant', Georgia, serif",bodyFont:"'IBM Plex Sans', system-ui, sans-serif",headingWeight:600,googleFonts:["Cormorant:ital,wght@0,400;0,600;1,400;1,600","IBM+Plex+Sans:wght@300;400"]},Zf={radius:"0px",slideWidth:"1280px"},Gx={name:Hf,version:Vf,extends:"default-tech",description:Qf,vibe:Kf,license:Yf,author:Jf,roles:qf,typography:Xf,geometry:Zf},Hx=Object.freeze(Object.defineProperty({__proto__:null,author:Jf,default:Gx,description:Qf,geometry:Zf,license:Yf,name:Hf,roles:qf,typography:Xf,version:Vf,vibe:Kf},Symbol.toStringTag,{value:"Module"})),eg="data-editorial",ng="0.1.0",tg="Data editorial — white report field, navy + chart red, Source Serif + Inter.",rg="Data editorial — white/#1a1a1a, navy #2b6cb0 + signal #e63946 (matches Signalbox gallery).",og="MIT",ag="Timur Isachenko",ig={bg:"#ffffff",bg2:"#f5f5f5",text:"#1a1a1a",muted:"#616161",accent:"#2b6cb0",accent2:"#e63946",cardBg:"rgba(26,26,26,0.03)",border:"rgba(26,26,26,0.12)"},lg={headingFont:"'Source Serif 4', Georgia, serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:700,googleFonts:["Source+Serif+4:wght@600;700","Inter:wght@400;600"]},sg={radius:"4px",slideWidth:"1280px"},Vx={name:eg,version:ng,extends:"default-tech",description:tg,vibe:rg,license:og,author:ag,roles:ig,typography:lg,geometry:sg},Qx=Object.freeze(Object.defineProperty({__proto__:null,author:ag,default:Vx,description:tg,geometry:sg,license:og,name:eg,roles:ig,typography:lg,version:ng,vibe:rg},Symbol.toStringTag,{value:"Module"})),cg="developer-dark",ug="0.1.0",dg="Developer dark — GitHub-night canvas, green success, blue links, JetBrains Mono.",pg="Developer dark — #0d1117, #3fb950 + #58a6ff, JetBrains Mono + Inter (matches Forge gallery).",fg="MIT",gg="Timur Isachenko",hg={bg:"#0d1117",bg2:"#161b22",text:"#e6edf3",muted:"#8b949e",accent:"#3fb950",accent2:"#58a6ff",cardBg:"rgba(48,54,61,0.55)",border:"rgba(48,54,61,0.9)"},mg={headingFont:"'Inter', system-ui, sans-serif",bodyFont:"'JetBrains Mono', monospace",headingWeight:700,googleFonts:["Inter:wght@600;700","JetBrains+Mono:wght@400;600"]},vg={radius:"8px",slideWidth:"1280px"},Kx={name:cg,version:ug,extends:"default-tech",description:dg,vibe:pg,license:fg,author:gg,roles:hg,typography:mg,geometry:vg},Yx=Object.freeze(Object.defineProperty({__proto__:null,author:gg,default:Kx,description:dg,geometry:vg,license:fg,name:cg,roles:hg,typography:mg,version:ug,vibe:pg},Symbol.toStringTag,{value:"Module"})),yg="editorial-forest",bg="1.0.0",xg="Editorial Forest — Source Serif 4 on oat-cream with forest green and dusty rose (frontend-slides).",wg="Editorial Forest — cream #efe7d4, forest #2e4a2a + dusty rose #e89cb1, Source Serif 4 + JetBrains Mono (frontend-slides editorial-forest).",kg="MIT",Sg="Timur Isachenko",_g={bg:"#efe7d4",bg2:"#e6dcc4",text:"#1a1a17",muted:"#6a655c",accent:"#2e4a2a",accent2:"#e89cb1",cardBg:"rgba(46,74,42,0.06)",border:"rgba(26,26,23,0.16)"},$g={headingFont:"'Source Serif 4', 'Source Serif Pro', Georgia, serif",bodyFont:"'Source Serif 4', Georgia, serif",headingWeight:500,googleFonts:["Source+Serif+4:opsz,wght@8..60,500;8..60,600","JetBrains+Mono:wght@400;500"]},Eg={radius:"4px",slideWidth:"1280px"},Jx={name:yg,version:bg,extends:"default-tech",description:xg,vibe:wg,license:kg,author:Sg,roles:_g,typography:$g,geometry:Eg},qx=Object.freeze(Object.defineProperty({__proto__:null,author:Sg,default:Jx,description:xg,geometry:Eg,license:kg,name:yg,roles:_g,typography:$g,version:bg,vibe:wg},Symbol.toStringTag,{value:"Module"})),Cg="editorial-serif",jg="0.1.0",Tg="Magazine-editorial theme with warm paper background, ink-black serif text, and a single masthead-crimson accent.",Fg="Print magazine editorial — warm cream paper, near-black serif ink, crimson masthead accent, thin hairline rules, square corners.",Pg="MIT",Ng="Timur Isachenko",Mg={bg:"#faf7f2",bg2:"#f2ede3",text:"#1c1a17",muted:"#5c574c",accent:"#9c1c1c",accent2:"#a67c1e",cardBg:"#f2ede3",border:"rgba(28,26,23,0.12)"},zg={headingFont:"'Playfair Display', Georgia, serif",bodyFont:"'Source Serif 4', Georgia, serif",headingWeight:700,googleFonts:["Playfair+Display:wght@700;900","Source+Serif+4:wght@400;600"]},Ig={radius:"2px",slideWidth:"1280px"},Xx={name:Cg,version:jg,extends:"default-tech",description:Tg,vibe:Fg,license:Pg,author:Ng,roles:Mg,typography:zg,geometry:Ig},Zx=Object.freeze(Object.defineProperty({__proto__:null,author:Ng,default:Xx,description:Tg,geometry:Ig,license:Pg,name:Cg,roles:Mg,typography:zg,version:jg,vibe:Fg},Symbol.toStringTag,{value:"Module"})),Og="editorial-tri-tone",Lg="1.0.0",Dg="Editorial Tri-Tone — blush pink, golden butter, burgundy wine; Bricolage Grotesque + Instrument Serif (frontend-slides).",Bg="Editorial Tri-Tone — pink #F2B6C6, butter #F2D86A, burgundy #7A1F35, Bricolage Grotesque + Instrument Serif (frontend-slides editorial-tri-tone).",Ag="MIT",Rg="Timur Isachenko",Wg={bg:"#F2B6C6",bg2:"#F2D86A",text:"#7A1F35",muted:"rgba(122,31,53,0.65)",accent:"#7A1F35",accent2:"#F2D86A",cardBg:"rgba(242,216,106,0.55)",border:"rgba(122,31,53,0.35)"},Ug={headingFont:"'Bricolage Grotesque', system-ui, sans-serif",bodyFont:"'Instrument Serif', Georgia, serif",headingWeight:800,googleFonts:["Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800","Instrument+Serif:ital@0;1","JetBrains+Mono:wght@400;500"]},Gg={radius:"0px",slideWidth:"1280px"},e2={name:Og,version:Lg,extends:"default-tech",description:Dg,vibe:Bg,license:Ag,author:Rg,roles:Wg,typography:Ug,geometry:Gg},n2=Object.freeze(Object.defineProperty({__proto__:null,author:Rg,default:e2,description:Dg,geometry:Gg,license:Ag,name:Og,roles:Wg,typography:Ug,version:Lg,vibe:Bg},Symbol.toStringTag,{value:"Module"})),Hg="electric-studio",Vg="1.0.0",Qg="Electric Studio — split white/blue panels, Manrope, accent bar (frontend-slides STYLE_PRESETS).",Kg="Electric Studio — white + #4361ee blue split, Manrope 800, high-contrast studio panels (frontend-slides Electric Studio).",Yg="MIT",Jg="Timur Isachenko",qg={bg:"#ffffff",bg2:"#4361ee",text:"#0a0a0a",muted:"#5a5a5a",accent:"#4361ee",accent2:"#ffffff",cardBg:"rgba(67,97,238,0.08)",border:"rgba(10,10,10,0.12)"},Xg={headingFont:"'Manrope', system-ui, sans-serif",bodyFont:"'Manrope', system-ui, sans-serif",headingWeight:800,googleFonts:["Manrope:wght@400;500;800"]},Zg={radius:"0px",slideWidth:"1280px"},t2={name:Hg,version:Vg,extends:"default-tech",description:Qg,vibe:Kg,license:Yg,author:Jg,roles:qg,typography:Xg,geometry:Zg},r2=Object.freeze(Object.defineProperty({__proto__:null,author:Jg,default:t2,description:Qg,geometry:Zg,license:Yg,name:Hg,roles:qg,typography:Xg,version:Vg,vibe:Kg},Symbol.toStringTag,{value:"Module"})),eh="fintech-clean",nh="0.1.0",th="Fintech clean — near-white, Stripe-like violet accent, mint success, Inter.",rh="Fintech clean — #fbfbfd, violet #635bff + mint #00d4b1, Inter (matches Ledgerline gallery).",oh="MIT",ah="Timur Isachenko",ih={bg:"#fbfbfd",bg2:"#f0eeff",text:"#0a0a0a",muted:"#6b7280",accent:"#635bff",accent2:"#00d4b1",cardBg:"#ffffff",border:"rgba(99,91,255,0.18)"},lh={headingFont:"'Inter', system-ui, sans-serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:700,googleFonts:["Inter:wght@400;600;700"]},sh={radius:"12px",slideWidth:"1280px"},o2={name:eh,version:nh,extends:"default-tech",description:th,vibe:rh,license:oh,author:ah,roles:ih,typography:lh,geometry:sh},a2=Object.freeze(Object.defineProperty({__proto__:null,author:ah,default:o2,description:th,geometry:sh,license:oh,name:eh,roles:ih,typography:lh,version:nh,vibe:rh},Symbol.toStringTag,{value:"Module"})),ch="ft-editorial",uh="0.1.0",dh="Financial Times–inspired broadsheet — warm paper, ink, FT blue + signal red.",ph="FT editorial — #f7f5f0 newsprint, Libre Baskerville + IBM Plex, FT blue + signal red (matches Meridian gallery).",fh="MIT",gh="Timur Isachenko",hh={bg:"#f7f5f0",bg2:"#f2efe8",text:"#0a0a0a",muted:"#6b6560",accent:"#1a4fd8",accent2:"#c0392b",cardBg:"rgba(10,10,10,0.03)",border:"rgba(10,10,10,0.12)"},mh={headingFont:"'Libre Baskerville', Georgia, serif",bodyFont:"'IBM Plex Sans', system-ui, sans-serif",headingWeight:700,googleFonts:["Libre+Baskerville:wght@400;700","IBM+Plex+Sans:wght@400;600","IBM+Plex+Mono:wght@500"]},vh={radius:"0px",slideWidth:"1280px"},i2={name:ch,version:uh,extends:"default-tech",description:dh,vibe:ph,license:fh,author:gh,roles:hh,typography:mh,geometry:vh},l2=Object.freeze(Object.defineProperty({__proto__:null,author:gh,default:i2,description:dh,geometry:vh,license:fh,name:ch,roles:hh,typography:mh,version:uh,vibe:ph},Symbol.toStringTag,{value:"Module"})),yh="genz-bento",bh="0.1.0",xh="Gen-Z hard-shadow bento — hot coral, lime stickers, chunky ink borders.",wh="Gen-Z bento — #fff9f5, coral #ff4d2e + lime #b6f542, Nunito hard shadows (matches Bounce gallery).",kh="MIT",Sh="Timur Isachenko",_h={bg:"#fff9f5",bg2:"#fff3ea",text:"#0f0f1a",muted:"#5c5666",accent:"#ff4d2e",accent2:"#b6f542",cardBg:"#ffffff",border:"#0f0f1a"},$h={headingFont:"'Nunito', system-ui, sans-serif",bodyFont:"'Nunito Sans', system-ui, sans-serif",headingWeight:900,googleFonts:["Nunito:wght@700;800;900","Nunito+Sans:wght@400;600"]},Eh={radius:"18px",slideWidth:"1280px"},s2={name:yh,version:bh,extends:"default-tech",description:xh,vibe:wh,license:kh,author:Sh,roles:_h,typography:$h,geometry:Eh},c2=Object.freeze(Object.defineProperty({__proto__:null,author:Sh,default:s2,description:xh,geometry:Eh,license:kh,name:yh,roles:_h,typography:$h,version:bh,vibe:wh},Symbol.toStringTag,{value:"Module"})),Ch="glassmorphism",jh="0.1.0",Th="Soft glassmorphism — icy lavender field, indigo + cyan accents, Plus Jakarta Sans.",Fh="Glassmorphism — #f8f9ff mist, indigo #5b6af5 + cyan #22d3ee, Plus Jakarta Sans (matches CloudPeak gallery).",Ph="MIT",Nh="Timur Isachenko",Mh={bg:"#f8f9ff",bg2:"#f0f3fd",text:"#0f1333",muted:"#7880a4",accent:"#5b6af5",accent2:"#22d3ee",cardBg:"rgba(255,255,255,0.72)",border:"rgba(91,106,245,0.22)"},zh={headingFont:"'Plus Jakarta Sans', system-ui, sans-serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:700,googleFonts:["Plus+Jakarta+Sans:wght@500;700","Inter:wght@400;600"]},Ih={radius:"20px",slideWidth:"1280px"},u2={name:Ch,version:jh,extends:"default-tech",description:Th,vibe:Fh,license:Ph,author:Nh,roles:Mh,typography:zh,geometry:Ih},d2=Object.freeze(Object.defineProperty({__proto__:null,author:Nh,default:u2,description:Th,geometry:Ih,license:Ph,name:Ch,roles:Mh,typography:zh,version:jh,vibe:Fh},Symbol.toStringTag,{value:"Module"})),Oh="heritage-editorial",Lh="0.1.0",Dh="Heritage editorial — warm parchment, terracotta blush, Playfair + Cormorant serif.",Bh="Heritage editorial — #f4efe9 parchment, terracotta #c98b7a, Playfair Display (matches Atelier No. 9 gallery).",Ah="MIT",Rh="Timur Isachenko",Wh={bg:"#f4efe9",bg2:"#ede6dd",text:"#16130f",muted:"#9c8b7e",accent:"#c98b7a",accent2:"#a07854",cardBg:"rgba(22,19,15,0.04)",border:"rgba(22,19,15,0.12)"},Uh={headingFont:"'Playfair Display', Georgia, serif",bodyFont:"'DM Sans', system-ui, sans-serif",headingWeight:700,googleFonts:["Playfair+Display:wght@500;700","Cormorant+Garamond:wght@500;600","DM+Sans:wght@400;600"]},Gh={radius:"6px",slideWidth:"1280px"},p2={name:Oh,version:Lh,extends:"default-tech",description:Dh,vibe:Bh,license:Ah,author:Rh,roles:Wh,typography:Uh,geometry:Gh},f2=Object.freeze(Object.defineProperty({__proto__:null,author:Rh,default:p2,description:Dh,geometry:Gh,license:Ah,name:Oh,roles:Wh,typography:Uh,version:Lh,vibe:Bh},Symbol.toStringTag,{value:"Module"})),Hh="kinetic-wrapped",Vh="0.1.0",Qh="Kinetic Wrapped — acid lime on black, Archivo Black, year-in-review energy.",Kh="Kinetic Wrapped — black + #c8ff00 acid lime, Archivo Black (matches Pulse gallery).",Yh="MIT",Jh="Timur Isachenko",qh={bg:"#0a0a0a",bg2:"#0d0d0d",text:"#ffffff",muted:"#888888",accent:"#c8ff00",accent2:"#ff00cc",cardBg:"rgba(200,255,0,0.08)",border:"rgba(200,255,0,0.4)"},Xh={headingFont:"'Archivo Black', system-ui, sans-serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:400,googleFonts:["Archivo+Black","Inter:wght@400;600"]},Zh={radius:"0px",slideWidth:"1280px"},g2={name:Hh,version:Vh,extends:"default-tech",description:Qh,vibe:Kh,license:Yh,author:Jh,roles:qh,typography:Xh,geometry:Zh},h2=Object.freeze(Object.defineProperty({__proto__:null,author:Jh,default:g2,description:Qh,geometry:Zh,license:Yh,name:Hh,roles:qh,typography:Xh,version:Vh,vibe:Kh},Symbol.toStringTag,{value:"Module"})),em="luxury-minimalist",nm="0.1.0",tm="Luxury minimalist theme with warm off-white canvas, dark charcoal, hairline borders, and no gradients.",rm="Luxury minimalist — warm off-white canvas, dark charcoal text, near-zero decoration, generous whitespace, thin serif display, hairline borders, no gradients.",om="MIT",am="Timur Isachenko",im={bg:"#faf8f5",bg2:"#f5f2ee",text:"#1c1917",muted:"#78716c",accent:"#92400e",accent2:"#b45309",cardBg:"rgba(28,25,23,0.03)",border:"rgba(28,25,23,0.10)"},lm={headingFont:"'Cormorant Garamond', Georgia, serif",bodyFont:"'DM Sans', system-ui, sans-serif",headingWeight:600,googleFonts:["Cormorant+Garamond:wght@400;600","DM+Sans:wght@400;500"]},sm={radius:"4px",slideWidth:"1280px"},m2={name:em,version:nm,extends:"default-tech",description:tm,vibe:rm,license:om,author:am,roles:im,typography:lm,geometry:sm},v2=Object.freeze(Object.defineProperty({__proto__:null,author:am,default:m2,description:tm,geometry:sm,license:om,name:em,roles:im,typography:lm,version:nm,vibe:rm},Symbol.toStringTag,{value:"Module"})),cm="neo-grid-bold",um="1.0.0",dm="Neo-Grid Bold — putty ecru, ink black, electric lemon panels, Space Grotesk uppercase (frontend-slides).",pm="Neo-Grid Bold — putty #ECECE8, lemon #E6FF3D, Space Grotesk uppercase + JetBrains Mono (frontend-slides neo-grid-bold).",fm="MIT",gm="Timur Isachenko",hm={bg:"#ECECE8",bg2:"#F5F4EF",text:"#0A0A0A",muted:"#8A8A85",accent:"#E6FF3D",accent2:"#0A0A0A",cardBg:"#F5F4EF",border:"rgba(10,10,10,0.85)"},mm={headingFont:"'Space Grotesk', Helvetica Neue, Arial, sans-serif",bodyFont:"'JetBrains Mono', monospace",headingWeight:700,googleFonts:["Space+Grotesk:wght@500;700","JetBrains+Mono:wght@400;500"]},vm={radius:"0px",slideWidth:"1280px"},y2={name:cm,version:um,extends:"default-tech",description:dm,vibe:pm,license:fm,author:gm,roles:hm,typography:mm,geometry:vm},b2=Object.freeze(Object.defineProperty({__proto__:null,author:gm,default:y2,description:dm,geometry:vm,license:fm,name:cm,roles:hm,typography:mm,version:um,vibe:pm},Symbol.toStringTag,{value:"Module"})),ym="neon-noir",bm="0.1.0",xm="Neon noir — wet asphalt night, hot magenta + electric cyan, cinematic rain.",wm="Neon noir — #050510 night, hot pink #ff2e97 + cyan #00e5ff, Orbitron (matches Neon District gallery).",km="MIT",Sm="Timur Isachenko",_m={bg:"#050510",bg2:"#0a0a1e",text:"#e8e4f0",muted:"#8884a8",accent:"#ff2e97",accent2:"#00e5ff",cardBg:"rgba(255,46,151,0.07)",border:"rgba(0,229,255,0.22)"},$m={headingFont:"'Orbitron', system-ui, sans-serif",bodyFont:"'Share Tech Mono', monospace",headingWeight:700,googleFonts:["Orbitron:wght@600;700","Share+Tech+Mono"]},Em={radius:"10px",slideWidth:"1280px"},x2={name:ym,version:bm,extends:"default-tech",description:xm,vibe:wm,license:km,author:Sm,roles:_m,typography:$m,geometry:Em},w2=Object.freeze(Object.defineProperty({__proto__:null,author:Sm,default:x2,description:xm,geometry:Em,license:km,name:ym,roles:_m,typography:$m,version:bm,vibe:wm},Symbol.toStringTag,{value:"Module"})),Cm="notebook-tabs",jm="1.0.0",Tm="Notebook Tabs — cream paper card on dark with mint/lavender/pink tabs, Bodoni Moda (frontend-slides STYLE_PRESETS).",Fm="Notebook Tabs — page #f8f6f1 on outer #2d2d2d, Bodoni Moda + DM Sans, pastel tabs (frontend-slides Notebook Tabs).",Pm="MIT",Nm="Timur Isachenko",Mm={bg:"#f8f6f1",bg2:"#efece4",text:"#1a1a1a",muted:"#5c574c",accent:"#98d4bb",accent2:"#c7b8ea",cardBg:"#ffffff",border:"rgba(26,26,26,0.12)"},zm={headingFont:"'Bodoni Moda', Georgia, serif",bodyFont:"'DM Sans', system-ui, sans-serif",headingWeight:700,googleFonts:["Bodoni+Moda:opsz,wght@6..96,400;6..96,700","DM+Sans:wght@400;500"]},Im={radius:"12px",slideWidth:"1280px"},k2={name:Cm,version:jm,extends:"default-tech",description:Tm,vibe:Fm,license:Pm,author:Nm,roles:Mm,typography:zm,geometry:Im},S2=Object.freeze(Object.defineProperty({__proto__:null,author:Nm,default:k2,description:Tm,geometry:Im,license:Pm,name:Cm,roles:Mm,typography:zm,version:jm,vibe:Fm},Symbol.toStringTag,{value:"Module"})),Om="paper-ink",Lm="1.0.0",Dm="Paper & Ink — Cormorant Garamond + Source Serif 4 on warm cream with crimson accent (frontend-slides STYLE_PRESETS).",Bm="Paper & Ink — cream #faf9f7, charcoal #1a1a1a, crimson #c41e3a, Cormorant Garamond + Source Serif 4 (frontend-slides Paper & Ink).",Am="MIT",Rm="Timur Isachenko",Wm={bg:"#faf9f7",bg2:"#f0eeea",text:"#1a1a1a",muted:"#5c574c",accent:"#c41e3a",accent2:"#1a1a1a",cardBg:"#ffffff",border:"rgba(26,26,26,0.15)"},Um={headingFont:"'Cormorant Garamond', Garamond, Georgia, serif",bodyFont:"'Source Serif 4', Georgia, serif",headingWeight:600,googleFonts:["Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500","Source+Serif+4:opsz,wght@8..60,400;8..60,600"]},Gm={radius:"0px",slideWidth:"1280px"},_2={name:Om,version:Lm,extends:"default-tech",description:Dm,vibe:Bm,license:Am,author:Rm,roles:Wm,typography:Um,geometry:Gm},$2=Object.freeze(Object.defineProperty({__proto__:null,author:Rm,default:_2,description:Dm,geometry:Gm,license:Am,name:Om,roles:Wm,typography:Um,version:Lm,vibe:Bm},Symbol.toStringTag,{value:"Module"})),Hm="pastel-dreamy",Vm="0.1.0",Qm="Soft pastel theme with lavender-blush background, deep plum text, and a blush/periwinkle accent pair.",Km="Soft pastel dreamy — lavender-blush bg, deep plum text for readability, blush-pink + periwinkle accent pair, generously rounded, gentle.",Ym="MIT",Jm="Timur Isachenko",qm={bg:"#fdf6fb",bg2:"#f5ecf9",text:"#3a2e4d",muted:"#6b5d82",accent:"#e893c2",accent2:"#8ab4f8",cardBg:"#f5ecf9",border:"rgba(58,46,77,0.10)"},Xm={headingFont:"'Quicksand', system-ui, sans-serif",bodyFont:"'Mulish', system-ui, sans-serif",headingWeight:700,googleFonts:["Quicksand:wght@500;700","Mulish:wght@400;600"]},Zm={radius:"28px",slideWidth:"1280px"},E2={name:Hm,version:Vm,extends:"default-tech",description:Qm,vibe:Km,license:Ym,author:Jm,roles:qm,typography:Xm,geometry:Zm},C2=Object.freeze(Object.defineProperty({__proto__:null,author:Jm,default:E2,description:Qm,geometry:Zm,license:Ym,name:Hm,roles:qm,typography:Xm,version:Vm,vibe:Km},Symbol.toStringTag,{value:"Module"})),e0="pastel-geometry",n0="1.0.0",t0="Pastel Geometry — Plus Jakarta Sans on sky pastel with vertical edge pills (frontend-slides STYLE_PRESETS).",r0="Pastel Geometry — sky #c8d9e6, card #faf9f7, vertical pastel pills, Plus Jakarta Sans (frontend-slides Pastel Geometry).",o0="MIT",a0="Timur Isachenko",i0={bg:"#c8d9e6",bg2:"#b8cddd",text:"#1a1a1a",muted:"#5a7c6a",accent:"#f0b4d4",accent2:"#9b8dc4",cardBg:"#faf9f7",border:"rgba(26,26,26,0.1)"},l0={headingFont:"'Plus Jakarta Sans', system-ui, sans-serif",bodyFont:"'Plus Jakarta Sans', system-ui, sans-serif",headingWeight:800,googleFonts:["Plus+Jakarta+Sans:wght@400;500;700;800"]},s0={radius:"24px",slideWidth:"1280px"},j2={name:e0,version:n0,extends:"default-tech",description:t0,vibe:r0,license:o0,author:a0,roles:i0,typography:l0,geometry:s0},T2=Object.freeze(Object.defineProperty({__proto__:null,author:a0,default:j2,description:t0,geometry:s0,license:o0,name:e0,roles:i0,typography:l0,version:n0,vibe:r0},Symbol.toStringTag,{value:"Module"})),c0="pin-and-paper",u0="1.0.0",d0="Pin & Paper — yellow legal-pad field with cobalt ink, Space Grotesk + Caveat (frontend-slides).",p0="Pin & Paper — legal pad #EFE56A, cobalt #1F3A8A, Space Grotesk + Caveat (frontend-slides pin-and-paper).",f0="MIT",g0="Timur Isachenko",h0={bg:"#EFE56A",bg2:"#F5ECA0",text:"#1F3A8A",muted:"#3457C4",accent:"#C2342B",accent2:"#D8702A",cardBg:"#F8F1D6",border:"rgba(31,58,138,0.22)"},m0={headingFont:"'Space Grotesk', Helvetica Neue, Arial, sans-serif",bodyFont:"'Space Grotesk', system-ui, sans-serif",headingWeight:700,googleFonts:["Space+Grotesk:wght@500;700","Caveat:wght@500;700","DM+Mono:wght@400;500"]},v0={radius:"8px",slideWidth:"1280px"},F2={name:c0,version:u0,extends:"default-tech",description:d0,vibe:p0,license:f0,author:g0,roles:h0,typography:m0,geometry:v0},P2=Object.freeze(Object.defineProperty({__proto__:null,author:g0,default:F2,description:d0,geometry:v0,license:f0,name:c0,roles:h0,typography:m0,version:u0,vibe:p0},Symbol.toStringTag,{value:"Module"})),y0="playful",b0="0.1.0",x0="Playful creative-agency theme with bold coral and lime accents, rounded corners, and sticker-style energy.",w0="Playful creative agency — bright warm white, bold coral + lime accent pair, rounded everything, big type, sticker-style shadows.",k0="MIT",S0="Timur Isachenko",_0={bg:"#fffbf0",bg2:"#fff9e6",text:"#1a1a2e",muted:"#6b6b8a",accent:"#ff4757",accent2:"#2ed573",cardBg:"rgba(255,71,87,0.06)",border:"rgba(255,71,87,0.15)"},$0={headingFont:"'Nunito', system-ui, sans-serif",bodyFont:"'Nunito', system-ui, sans-serif",headingWeight:800,googleFonts:["Nunito:wght@400;700;800"]},E0={radius:"24px",slideWidth:"1280px"},N2={name:y0,version:b0,extends:"default-tech",description:x0,vibe:w0,license:k0,author:S0,roles:_0,typography:$0,geometry:E0},M2=Object.freeze(Object.defineProperty({__proto__:null,author:S0,default:N2,description:x0,geometry:E0,license:k0,name:y0,roles:_0,typography:$0,version:b0,vibe:w0},Symbol.toStringTag,{value:"Module"})),C0="retro-arcade",j0="0.1.0",T0="Retro 80s arcade theme with deep purple-black background, magenta and cyan neon accents, and pixel display fonts.",F0="Retro 80s arcade — deep purple-black bg, magenta + electric cyan neon, glow text-shadow, pixel display font, scanline feel.",P0="MIT",N0="Timur Isachenko",M0={bg:"#0d0015",bg2:"#150025",text:"#e0e0ff",muted:"#9090cc",accent:"#ff00ff",accent2:"#00ffff",cardBg:"rgba(255,0,255,0.08)",border:"rgba(0,255,255,0.20)"},z0={headingFont:"'Orbitron', system-ui, sans-serif",bodyFont:"'Share Tech Mono', monospace",headingWeight:700,googleFonts:["Orbitron:wght@400;700","Share+Tech+Mono"]},I0={radius:"0px",slideWidth:"1280px"},z2={name:C0,version:j0,extends:"default-tech",description:T0,vibe:F0,license:P0,author:N0,roles:M0,typography:z0,geometry:I0},I2=Object.freeze(Object.defineProperty({__proto__:null,author:N0,default:z2,description:T0,geometry:I0,license:P0,name:C0,roles:M0,typography:z0,version:j0,vibe:F0},Symbol.toStringTag,{value:"Module"})),O0="risograph-zine",L0="0.1.0",D0="Risograph zine — warm paper, misregistered ink, magenta + teal print shop energy.",B0="Risograph zine — kraft #f3ecdd, red #ff4f4f + blue #2b3aff overprint (matches Inkwell gallery).",A0="MIT",R0="Timur Isachenko",W0={bg:"#f3ecdd",bg2:"#e8dfc8",text:"#1a1209",muted:"#7a6a52",accent:"#ff4f4f",accent2:"#2b3aff",cardBg:"rgba(255,79,79,0.06)",border:"rgba(26,18,9,0.18)"},U0={headingFont:"'Archivo Black', system-ui, sans-serif",bodyFont:"'Space Mono', monospace",headingWeight:400,googleFonts:["Archivo+Black","Space+Mono:wght@400;700"]},G0={radius:"2px",slideWidth:"1280px"},O2={name:O0,version:L0,extends:"default-tech",description:D0,vibe:B0,license:A0,author:R0,roles:W0,typography:U0,geometry:G0},L2=Object.freeze(Object.defineProperty({__proto__:null,author:R0,default:O2,description:D0,geometry:G0,license:A0,name:O0,roles:W0,typography:U0,version:L0,vibe:B0},Symbol.toStringTag,{value:"Module"})),H0="scandinavian",V0="0.1.0",Q0="Scandinavian hygge — warm linen, sage green, soft clay, Fraunces + Work Sans.",K0="Scandinavian — #efe9df linen, sage #9caf88 + clay #c9826b (matches Hygge gallery).",Y0="MIT",J0="Timur Isachenko",q0={bg:"#efe9df",bg2:"#e6ddd1",text:"#2b2926",muted:"#7a7470",accent:"#9caf88",accent2:"#c9826b",cardBg:"rgba(43,41,38,0.04)",border:"rgba(43,41,38,0.1)"},X0={headingFont:"'Fraunces', Georgia, serif",bodyFont:"'Work Sans', system-ui, sans-serif",headingWeight:600,googleFonts:["Fraunces:wght@500;600;700","Work+Sans:wght@400;600"]},Z0={radius:"16px",slideWidth:"1280px"},D2={name:H0,version:V0,extends:"default-tech",description:Q0,vibe:K0,license:Y0,author:J0,roles:q0,typography:X0,geometry:Z0},B2=Object.freeze(Object.defineProperty({__proto__:null,author:J0,default:D2,description:Q0,geometry:Z0,license:Y0,name:H0,roles:q0,typography:X0,version:V0,vibe:K0},Symbol.toStringTag,{value:"Module"})),ev="signal",nv="1.0.0",tv="Signal — dual cream/navy editorial with antique gold accent, Source Serif 4 (frontend-slides).",rv="Signal — cream #F0ECE3 / navy #1C2644, gold #C8A870, Source Serif 4 + DM Sans (frontend-slides signal).",ov="MIT",av="Timur Isachenko",iv={bg:"#F0ECE3",bg2:"#E6E0D4",text:"#1A2030",muted:"#5A6270",accent:"#C8A870",accent2:"#1C2644",cardBg:"rgba(28,38,68,0.05)",border:"rgba(202,196,180,1)"},lv={headingFont:"'Source Serif 4', Georgia, serif",bodyFont:"'DM Sans', system-ui, sans-serif",headingWeight:600,googleFonts:["Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400","DM+Sans:wght@400;500","IBM+Plex+Mono:wght@400;500"]},sv={radius:"2px",slideWidth:"1280px"},A2={name:ev,version:nv,extends:"default-tech",description:tv,vibe:rv,license:ov,author:av,roles:iv,typography:lv,geometry:sv},R2=Object.freeze(Object.defineProperty({__proto__:null,author:av,default:A2,description:tv,geometry:sv,license:ov,name:ev,roles:iv,typography:lv,version:nv,vibe:rv},Symbol.toStringTag,{value:"Module"})),cv="soft-editorial",uv="1.0.0",dv="Soft Editorial — Cormorant Garamond on warm cream paper with sage, blush, lemon, and lilac accents (frontend-slides / beautiful-html-templates).",pv="Soft Editorial — paper #F2EEDF, ink #2A241B, sage #B7C7A8 + blush #E1A4C2, Cormorant Garamond + Work Sans (frontend-slides soft-editorial).",fv="MIT",gv="Timur Isachenko",hv={bg:"#F2EEDF",bg2:"#ECE6D2",text:"#2A241B",muted:"#5C5345",accent:"#B7C7A8",accent2:"#E1A4C2",cardBg:"rgba(255,255,255,0.55)",border:"rgba(42,36,27,0.18)"},mv={headingFont:"'Cormorant Garamond', Garamond, Georgia, serif",bodyFont:"'Work Sans', system-ui, sans-serif",headingWeight:500,googleFonts:["Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600","Work+Sans:wght@400;500;600"]},vv={radius:"28px",slideWidth:"1280px"},W2={name:cv,version:uv,extends:"default-tech",description:dv,vibe:pv,license:fv,author:gv,roles:hv,typography:mv,geometry:vv},U2=Object.freeze(Object.defineProperty({__proto__:null,author:gv,default:W2,description:dv,geometry:vv,license:fv,name:cv,roles:hv,typography:mv,version:uv,vibe:pv},Symbol.toStringTag,{value:"Module"})),yv="split-pastel",bv="1.0.0",xv="Split Pastel — peach/lavender vertical split, Outfit, playful badges (frontend-slides STYLE_PRESETS).",wv="Split Pastel — peach #f5e6dc / lavender #e4dff0 split, Outfit, mint/yellow/pink badges (frontend-slides Split Pastel).",kv="MIT",Sv="Timur Isachenko",_v={bg:"#f5e6dc",bg2:"#e4dff0",text:"#1a1a1a",muted:"#6a6570",accent:"#c8f0d8",accent2:"#f0d4e0",cardBg:"rgba(255,255,255,0.65)",border:"rgba(26,26,26,0.1)"},$v={headingFont:"'Outfit', system-ui, sans-serif",bodyFont:"'Outfit', system-ui, sans-serif",headingWeight:800,googleFonts:["Outfit:wght@400;500;700;800"]},Ev={radius:"20px",slideWidth:"1280px"},G2={name:yv,version:bv,extends:"default-tech",description:xv,vibe:wv,license:kv,author:Sv,roles:_v,typography:$v,geometry:Ev},H2=Object.freeze(Object.defineProperty({__proto__:null,author:Sv,default:G2,description:xv,geometry:Ev,license:kv,name:yv,roles:_v,typography:$v,version:bv,vibe:wv},Symbol.toStringTag,{value:"Module"})),Cv="swiss-typographic",jv="0.1.0",Tv="Swiss International Typographic Style — white grid, signal red, Helvetica-like grotesk.",Fv="Swiss typographic — pure white, Inter grotesk, signal red, zero radius, modular grid (matches Grid Systems gallery).",Pv="MIT",Nv="Timur Isachenko",Mv={bg:"#ffffff",bg2:"#f5f5f5",text:"#0a0a0a",muted:"#636363",accent:"#e2231a",accent2:"#0a0a0a",cardBg:"rgba(0,0,0,0.03)",border:"rgba(0,0,0,0.12)"},zv={headingFont:"'Inter', Helvetica, Arial, sans-serif",bodyFont:"'Inter', Helvetica, Arial, sans-serif",headingWeight:800,googleFonts:["Inter:wght@400;600;800"]},Iv={radius:"0px",slideWidth:"1280px"},V2={name:Cv,version:jv,extends:"default-tech",description:Tv,vibe:Fv,license:Pv,author:Nv,roles:Mv,typography:zv,geometry:Iv},Q2=Object.freeze(Object.defineProperty({__proto__:null,author:Nv,default:V2,description:Tv,geometry:Iv,license:Pv,name:Cv,roles:Mv,typography:zv,version:jv,vibe:Fv},Symbol.toStringTag,{value:"Module"})),Ov="vaporwave",Lv="0.1.0",Dv="Vaporwave — purple dusk, sunset gradient, chrome teal, nostalgic mall energy.",Bv="Vaporwave — #1a0533 dusk, #ff6ad5 pink + #5ce1ff teal, Monoton (matches Mallsoft gallery).",Av="MIT",Rv="Timur Isachenko",Wv={bg:"#1a0533",bg2:"#2d1060",text:"#fff0f9",muted:"#c4a8ff",accent:"#ff6ad5",accent2:"#5ce1ff",cardBg:"rgba(255,106,213,0.08)",border:"rgba(92,225,255,0.28)"},Uv={headingFont:"'Monoton', display, cursive",bodyFont:"'Space Mono', monospace",headingWeight:400,googleFonts:["Monoton","Space+Mono:wght@400;700","VT323"]},Gv={radius:"6px",slideWidth:"1280px"},K2={name:Ov,version:Lv,extends:"default-tech",description:Dv,vibe:Bv,license:Av,author:Rv,roles:Wv,typography:Uv,geometry:Gv},Y2=Object.freeze(Object.defineProperty({__proto__:null,author:Rv,default:K2,description:Dv,geometry:Gv,license:Av,name:Ov,roles:Wv,typography:Uv,version:Lv,vibe:Bv},Symbol.toStringTag,{value:"Module"})),Hv="vellum",Vv="1.0.0",Qv="Vellum — deep periwinkle field with chartreuse italic Cormorant type (frontend-slides).",Kv="Vellum — periwinkle #2A3870, chartreuse #E8D85C, italic Cormorant Garamond + DM Sans (frontend-slides vellum).",Yv="MIT",Jv="Timur Isachenko",qv={bg:"#2A3870",bg2:"#1F2858",text:"#E8D85C",muted:"rgba(232,216,92,0.62)",accent:"#E8D85C",accent2:"#3A7878",cardBg:"rgba(232,216,92,0.08)",border:"rgba(232,216,92,0.20)"},Xv={headingFont:"'Cormorant Garamond', Georgia, serif",bodyFont:"'DM Sans', system-ui, sans-serif",headingWeight:400,googleFonts:["Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500","DM+Sans:wght@400;500","Courier+Prime:wght@400"]},Zv={radius:"0px",slideWidth:"1280px"},J2={name:Hv,version:Vv,extends:"default-tech",description:Qv,vibe:Kv,license:Yv,author:Jv,roles:qv,typography:Xv,geometry:Zv},q2=Object.freeze(Object.defineProperty({__proto__:null,author:Jv,default:J2,description:Qv,geometry:Zv,license:Yv,name:Hv,roles:qv,typography:Xv,version:Vv,vibe:Kv},Symbol.toStringTag,{value:"Module"})),ey="vintage-editorial",ny="1.0.0",ty="Vintage Editorial — Fraunces on cream with geometric accents (frontend-slides STYLE_PRESETS).",ry="Vintage Editorial — cream #f5f3ee, Fraunces display + Work Sans, witty bordered CTAs (frontend-slides Vintage Editorial).",oy="MIT",ay="Timur Isachenko",iy={bg:"#f5f3ee",bg2:"#ebe7de",text:"#1a1a1a",muted:"#555555",accent:"#e8d4c0",accent2:"#1a1a1a",cardBg:"#ffffff",border:"rgba(26,26,26,0.2)"},ly={headingFont:"'Fraunces', Georgia, serif",bodyFont:"'Work Sans', system-ui, sans-serif",headingWeight:700,googleFonts:["Fraunces:opsz,wght@9..144,700;9..144,900","Work+Sans:wght@400;500"]},sy={radius:"4px",slideWidth:"1280px"},X2={name:ey,version:ny,extends:"default-tech",description:ty,vibe:ry,license:oy,author:ay,roles:iy,typography:ly,geometry:sy},Z2=Object.freeze(Object.defineProperty({__proto__:null,author:ay,default:X2,description:ty,geometry:sy,license:oy,name:ey,roles:iy,typography:ly,version:ny,vibe:ry},Symbol.toStringTag,{value:"Module"})),cy="y2k-aero",uy="0.1.0",dy="Y2K aero — icy gradients, chrome cyan, soft bubbles, futuristic optimism.",py="Y2K aero — icy #e0f7ff, sky #38bdf8 + lime #a3e635, Nunito (matches BubbleFlow gallery).",fy="MIT",gy="Timur Isachenko",hy={bg:"#e0f7ff",bg2:"#bae6fd",text:"#0c4a6e",muted:"#0369a1",accent:"#38bdf8",accent2:"#a3e635",cardBg:"rgba(255,255,255,0.72)",border:"rgba(14,165,233,0.28)"},my={headingFont:"'Nunito', system-ui, sans-serif",bodyFont:"'Nunito Sans', system-ui, sans-serif",headingWeight:800,googleFonts:["Nunito:wght@700;800","Nunito+Sans:wght@400;600"]},vy={radius:"32px",slideWidth:"1280px"},ew={name:cy,version:uy,extends:"default-tech",description:dy,vibe:py,license:fy,author:gy,roles:hy,typography:my,geometry:vy},nw=Object.freeze(Object.defineProperty({__proto__:null,author:gy,default:ew,description:dy,geometry:vy,license:fy,name:cy,roles:hy,typography:my,version:uy,vibe:py},Symbol.toStringTag,{value:"Module"})),tw={bg:"#0e0e12",bg2:"#16161d",text:"#f4f4f5",muted:"#a1a1aa",accent:"#7c3aed",accent2:"#22d3ee",cardBg:"rgba(255,255,255,0.04)",border:"rgba(255,255,255,0.08)"},rw={headingFont:"'Montserrat', system-ui, sans-serif",bodyFont:"'Open Sans', system-ui, sans-serif",headingWeight:800,googleFonts:["Montserrat:wght@700;800","Open+Sans:wght@400;600"]},ow={radius:"18px",slideWidth:"1280px"},aw={...Object.assign({"../../../core/themes/claude/theme.json":ax,"../../../core/themes/default-tech/theme.json":lx}),...Object.assign({"../../../themes/aerospace-hud/theme.json":cx,"../../../themes/art-deco/theme.json":dx,"../../../themes/aurora-glass/theme.json":fx,"../../../themes/bauhaus/theme.json":hx,"../../../themes/biennale-yellow/theme.json":vx,"../../../themes/blueprint/theme.json":bx,"../../../themes/bold-poster/theme.json":wx,"../../../themes/bold-signal/theme.json":Sx,"../../../themes/botanical-luxe/theme.json":$x,"../../../themes/broadsheet/theme.json":Cx,"../../../themes/broadside/theme.json":Tx,"../../../themes/brutalist-acid/theme.json":Px,"../../../themes/brutalist-mono/theme.json":Mx,"../../../themes/candy-pop/theme.json":Ix,"../../../themes/corporate/theme.json":Lx,"../../../themes/creative-mode/theme.json":Bx,"../../../themes/creative-voltage/theme.json":Rx,"../../../themes/crt-terminal/theme.json":Ux,"../../../themes/dark-botanical/theme.json":Hx,"../../../themes/data-editorial/theme.json":Qx,"../../../themes/developer-dark/theme.json":Yx,"../../../themes/editorial-forest/theme.json":qx,"../../../themes/editorial-serif/theme.json":Zx,"../../../themes/editorial-tri-tone/theme.json":n2,"../../../themes/electric-studio/theme.json":r2,"../../../themes/fintech-clean/theme.json":a2,"../../../themes/ft-editorial/theme.json":l2,"../../../themes/genz-bento/theme.json":c2,"../../../themes/glassmorphism/theme.json":d2,"../../../themes/heritage-editorial/theme.json":f2,"../../../themes/kinetic-wrapped/theme.json":h2,"../../../themes/luxury-minimalist/theme.json":v2,"../../../themes/neo-grid-bold/theme.json":b2,"../../../themes/neon-noir/theme.json":w2,"../../../themes/notebook-tabs/theme.json":S2,"../../../themes/paper-ink/theme.json":$2,"../../../themes/pastel-dreamy/theme.json":C2,"../../../themes/pastel-geometry/theme.json":T2,"../../../themes/pin-and-paper/theme.json":P2,"../../../themes/playful/theme.json":M2,"../../../themes/retro-arcade/theme.json":I2,"../../../themes/risograph-zine/theme.json":L2,"../../../themes/scandinavian/theme.json":B2,"../../../themes/signal/theme.json":R2,"../../../themes/soft-editorial/theme.json":U2,"../../../themes/split-pastel/theme.json":H2,"../../../themes/swiss-typographic/theme.json":Q2,"../../../themes/vaporwave/theme.json":Y2,"../../../themes/vellum/theme.json":q2,"../../../themes/vintage-editorial/theme.json":Z2,"../../../themes/y2k-aero/theme.json":nw})},uo=new Map;for(const e of Object.values(aw)){const n="default"in e?e.default:e;n!=null&&n.name&&uo.set(n.name,n)}function yy(){return[...uo.keys()].sort()}function Hi(e){const n=[];let t=uo.has(e)?e:"default-tech";const r=new Set;for(;t&&!r.has(t);){r.add(t);const s=uo.get(t);if(!s)break;n.unshift(s),t=s.extends}const o={...tw},a={...rw},i={...ow};for(const s of n)Object.assign(o,s.roles??{}),Object.assign(a,s.typography??{}),Object.assign(i,s.geometry??{});const l=n[n.length-1]??{name:"default-tech",version:"0.0.0"};return{name:l.name,version:l.version,manifest:l,palette:o,typography:a,geometry:i}}const iw=`<section class="slide title-slide closing-slide">
  {{#eyebrow}}<span class="eyebrow">{{eyebrow}}</span>{{/eyebrow}}
  <h1>{{heading}}</h1>
  {{#lead}}<p class="lead">{{lead}}</p>{{/lead}}
  {{#cta}}<a class="btn" href="{{href}}"><i class="fa-solid fa-arrow-right"></i> {{label}}</a>{{/cta}}
</section>
`,lw=`<section class="slide comparison-slide">
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
`,sw=`<section class="slide">
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
`,cw=`<section class="slide">
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
`,uw=`<section class="slide image-hero-slide">
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
`,dw=`<section class="slide quote-slide">
  <p class="quote">{{quote}}</p>
  {{#by}}<p class="quote-by">— {{by}}</p>{{/by}}
</section>
`,pw=`<section class="slide section-slide">
  {{#number}}<div class="section-number">{{number}}</div>{{/number}}
  <h2>{{heading}}</h2>
  {{#lead}}<p class="lead">{{lead}}</p>{{/lead}}
</section>
`,fw=`<section class="slide">
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
`,gw=`<section class="slide">
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
`,hw=`<section class="slide title-slide">
  {{#eyebrow}}<span class="eyebrow">{{eyebrow}}</span>{{/eyebrow}}
  <h1>{{heading}}</h1>
  {{#lead}}<p class="lead">{{lead}}</p>{{/lead}}
</section>
`,mw=`<section class="slide">
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
 */var vw=Object.prototype.toString,ft=Array.isArray||function(n){return vw.call(n)==="[object Array]"};function Vi(e){return typeof e=="function"}function yw(e){return ft(e)?"array":typeof e}function ra(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function ls(e,n){return e!=null&&typeof e=="object"&&n in e}function bw(e,n){return e!=null&&typeof e!="object"&&e.hasOwnProperty&&e.hasOwnProperty(n)}var xw=RegExp.prototype.test;function ww(e,n){return xw.call(e,n)}var kw=/\S/;function Sw(e){return!ww(kw,e)}var _w={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};function $w(e){return String(e).replace(/[&<>"'`=\/]/g,function(t){return _w[t]})}var Ew=/\s*/,Cw=/\s+/,ss=/\s*=/,jw=/\s*\}/,Tw=/#|\^|\/|>|\{|&|=|!/;function Fw(e,n){if(!e)return[];var t=!1,r=[],o=[],a=[],i=!1,l=!1,s="",c=0;function p(){if(i&&!l)for(;a.length;)delete o[a.pop()];else a=[];i=!1,l=!1}var g,m,y;function S(E){if(typeof E=="string"&&(E=E.split(Cw,2)),!ft(E)||E.length!==2)throw new Error("Invalid tags: "+E);g=new RegExp(ra(E[0])+"\\s*"),m=new RegExp("\\s*"+ra(E[1])),y=new RegExp("\\s*"+ra("}"+E[1]))}S(n||ve.tags);for(var x=new ir(e),j,f,u,h,b,v;!x.eos();){if(j=x.pos,u=x.scanUntil(g),u)for(var w=0,C=u.length;w<C;++w)h=u.charAt(w),Sw(h)?(a.push(o.length),s+=h):(l=!0,t=!0,s+=" "),o.push(["text",h,j,j+1]),j+=1,h===`
`&&(p(),s="",c=0,t=!1);if(!x.scan(g))break;if(i=!0,f=x.scan(Tw)||"name",x.scan(Ew),f==="="?(u=x.scanUntil(ss),x.scan(ss),x.scanUntil(m)):f==="{"?(u=x.scanUntil(y),x.scan(jw),x.scanUntil(m),f="&"):u=x.scanUntil(m),!x.scan(m))throw new Error("Unclosed tag at "+x.pos);if(f==">"?b=[f,u,j,x.pos,s,c,t]:b=[f,u,j,x.pos],c++,o.push(b),f==="#"||f==="^")r.push(b);else if(f==="/"){if(v=r.pop(),!v)throw new Error('Unopened section "'+u+'" at '+j);if(v[1]!==u)throw new Error('Unclosed section "'+v[1]+'" at '+j)}else f==="name"||f==="{"||f==="&"?l=!0:f==="="&&S(u)}if(p(),v=r.pop(),v)throw new Error('Unclosed section "'+v[1]+'" at '+x.pos);return Nw(Pw(o))}function Pw(e){for(var n=[],t,r,o=0,a=e.length;o<a;++o)t=e[o],t&&(t[0]==="text"&&r&&r[0]==="text"?(r[1]+=t[1],r[3]=t[3]):(n.push(t),r=t));return n}function Nw(e){for(var n=[],t=n,r=[],o,a,i=0,l=e.length;i<l;++i)switch(o=e[i],o[0]){case"#":case"^":t.push(o),r.push(o),t=o[4]=[];break;case"/":a=r.pop(),a[5]=o[2],t=r.length>0?r[r.length-1][4]:n;break;default:t.push(o)}return n}function ir(e){this.string=e,this.tail=e,this.pos=0}ir.prototype.eos=function(){return this.tail===""};ir.prototype.scan=function(n){var t=this.tail.match(n);if(!t||t.index!==0)return"";var r=t[0];return this.tail=this.tail.substring(r.length),this.pos+=r.length,r};ir.prototype.scanUntil=function(n){var t=this.tail.search(n),r;switch(t){case-1:r=this.tail,this.tail="";break;case 0:r="";break;default:r=this.tail.substring(0,t),this.tail=this.tail.substring(t)}return this.pos+=r.length,r};function ct(e,n){this.view=e,this.cache={".":this.view},this.parent=n}ct.prototype.push=function(n){return new ct(n,this)};ct.prototype.lookup=function(n){var t=this.cache,r;if(t.hasOwnProperty(n))r=t[n];else{for(var o=this,a,i,l,s=!1;o;){if(n.indexOf(".")>0)for(a=o.view,i=n.split("."),l=0;a!=null&&l<i.length;)l===i.length-1&&(s=ls(a,i[l])||bw(a,i[l])),a=a[i[l++]];else a=o.view[n],s=ls(o.view,n);if(s){r=a;break}o=o.parent}t[n]=r}return Vi(r)&&(r=r.call(this.view)),r};function de(){this.templateCache={_cache:{},set:function(n,t){this._cache[n]=t},get:function(n){return this._cache[n]},clear:function(){this._cache={}}}}de.prototype.clearCache=function(){typeof this.templateCache<"u"&&this.templateCache.clear()};de.prototype.parse=function(n,t){var r=this.templateCache,o=n+":"+(t||ve.tags).join(":"),a=typeof r<"u",i=a?r.get(o):void 0;return i==null&&(i=Fw(n,t),a&&r.set(o,i)),i};de.prototype.render=function(n,t,r,o){var a=this.getConfigTags(o),i=this.parse(n,a),l=t instanceof ct?t:new ct(t,void 0);return this.renderTokens(i,l,r,n,o)};de.prototype.renderTokens=function(n,t,r,o,a){for(var i="",l,s,c,p=0,g=n.length;p<g;++p)c=void 0,l=n[p],s=l[0],s==="#"?c=this.renderSection(l,t,r,o,a):s==="^"?c=this.renderInverted(l,t,r,o,a):s===">"?c=this.renderPartial(l,t,r,a):s==="&"?c=this.unescapedValue(l,t):s==="name"?c=this.escapedValue(l,t,a):s==="text"&&(c=this.rawValue(l)),c!==void 0&&(i+=c);return i};de.prototype.renderSection=function(n,t,r,o,a){var i=this,l="",s=t.lookup(n[1]);function c(m){return i.render(m,t,r,a)}if(s){if(ft(s))for(var p=0,g=s.length;p<g;++p)l+=this.renderTokens(n[4],t.push(s[p]),r,o,a);else if(typeof s=="object"||typeof s=="string"||typeof s=="number")l+=this.renderTokens(n[4],t.push(s),r,o,a);else if(Vi(s)){if(typeof o!="string")throw new Error("Cannot use higher-order sections without the original template");s=s.call(t.view,o.slice(n[3],n[5]),c),s!=null&&(l+=s)}else l+=this.renderTokens(n[4],t,r,o,a);return l}};de.prototype.renderInverted=function(n,t,r,o,a){var i=t.lookup(n[1]);if(!i||ft(i)&&i.length===0)return this.renderTokens(n[4],t,r,o,a)};de.prototype.indentPartial=function(n,t,r){for(var o=t.replace(/[^ \t]/g,""),a=n.split(`
`),i=0;i<a.length;i++)a[i].length&&(i>0||!r)&&(a[i]=o+a[i]);return a.join(`
`)};de.prototype.renderPartial=function(n,t,r,o){if(r){var a=this.getConfigTags(o),i=Vi(r)?r(n[1]):r[n[1]];if(i!=null){var l=n[6],s=n[5],c=n[4],p=i;s==0&&c&&(p=this.indentPartial(i,c,l));var g=this.parse(p,a);return this.renderTokens(g,t,r,p,o)}}};de.prototype.unescapedValue=function(n,t){var r=t.lookup(n[1]);if(r!=null)return r};de.prototype.escapedValue=function(n,t,r){var o=this.getConfigEscape(r)||ve.escape,a=t.lookup(n[1]);if(a!=null)return typeof a=="number"&&o===ve.escape?String(a):o(a)};de.prototype.rawValue=function(n){return n[1]};de.prototype.getConfigTags=function(n){return ft(n)?n:n&&typeof n=="object"?n.tags:void 0};de.prototype.getConfigEscape=function(n){if(n&&typeof n=="object"&&!ft(n))return n.escape};var ve={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(e){er.templateCache=e},get templateCache(){return er.templateCache}},er=new de;ve.clearCache=function(){return er.clearCache()};ve.parse=function(n,t){return er.parse(n,t)};ve.render=function(n,t,r,o){if(typeof n!="string")throw new TypeError('Invalid template! Template should be a "string" but "'+yw(n)+'" was given as the first argument for mustache#render(template, view, partials)');return er.render(n,t,r,o)};ve.escape=$w;ve.Scanner=ir;ve.Context=ct;ve.Writer=de;const Mw=`/* presentation-md base stylesheet.
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
`,cs=`/* Per-theme surface profiles — each theme gets a distinct stage, not one shared blob. */

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

/* ── electric-studio-split (electric-studio) ── */
.deck[data-surface="electric-studio-split"] .slide {
  --slide-bg: linear-gradient(180deg, var(--bg) 0 52%, var(--bg-2) 52% 100%);
  border-radius: 0;
  border: 1px solid color-mix(in srgb, var(--text) 18%, transparent);
  box-shadow: 0 18px 48px rgba(10, 10, 10, 0.12);
}
.deck[data-surface="electric-studio-split"] .slide::before {
  left: 0;
  top: 52%;
  bottom: 0;
  width: 8px;
  background: var(--accent);
}
.deck[data-surface="electric-studio-split"] .slide::after {
  display: none;
}
.deck[data-surface="electric-studio-split"] .slide h1 {
  font-weight: 800;
  letter-spacing: -0.03em;
}
.deck[data-surface="electric-studio-split"] .card {
  background: rgba(255,255,255,0.92);
  border-radius: 0;
  border: 1px solid color-mix(in srgb, var(--text) 12%, transparent);
}

/* ── dark-botanical-bloom (dark-botanical) ── */
.deck[data-surface="dark-botanical-bloom"] .slide {
  --slide-bg: radial-gradient(ellipse 55% 50% at 88% 12%, color-mix(in srgb, var(--accent2) 28%, transparent), transparent 60%),
    radial-gradient(ellipse 45% 40% at 78% 28%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 65%),
    var(--bg);
  border-radius: 0;
  box-shadow: 0 20px 50px rgba(0,0,0,0.45);
}
.deck[data-surface="dark-botanical-bloom"] .slide::before {
  left: 48px;
  top: 64px;
  bottom: 64px;
  width: 1px;
  background: color-mix(in srgb, var(--accent) 55%, transparent);
}
.deck[data-surface="dark-botanical-bloom"] .slide::after {
  width: 180px;
  height: 180px;
  right: 36px;
  top: 28px;
  border-radius: 50%;
  background: radial-gradient(circle at 40% 40%, color-mix(in srgb, var(--accent2) 45%, transparent), transparent 70%);
  filter: blur(2px);
  opacity: 0.9;
}
.deck[data-surface="dark-botanical-bloom"] .slide h1 {
  font-weight: 400;
  font-style: italic;
}
.deck[data-surface="dark-botanical-bloom"] .card {
  background: rgba(232,228,223,0.06);
  border: 1px solid color-mix(in srgb, var(--text) 12%, transparent);
  border-radius: 0;
}

/* ── pastel-geometry-pills (pastel-geometry) ── */
.deck[data-surface="pastel-geometry-pills"] .slide {
  --slide-bg: var(--card-bg);
  border-radius: 24px;
  box-shadow:
    0 0 0 22px var(--bg),
    0 18px 44px rgba(60, 90, 120, 0.18);
  border: 1px solid color-mix(in srgb, var(--text) 8%, transparent);
}
.deck[data-surface="pastel-geometry-pills"] .slide::after {
  width: 18px;
  height: 72%;
  right: -31px;
  top: 14%;
  border-radius: 999px;
  background: linear-gradient(
    180deg,
    #f0b4d4 0% 16%,
    #a8d4c4 16% 34%,
    #5a7c6a 34% 55%,
    #9b8dc4 55% 74%,
    #7c6aad 74% 100%
  );
  filter: none;
  opacity: 0.95;
}
.deck[data-surface="pastel-geometry-pills"] .slide h1 {
  font-weight: 800;
  letter-spacing: -0.03em;
}
.deck[data-surface="pastel-geometry-pills"] .card {
  background: #ffffff;
  border-radius: 18px;
  border: 1px solid color-mix(in srgb, var(--text) 8%, transparent);
}

/* ── split-pastel-panels (split-pastel) ── */
.deck[data-surface="split-pastel-panels"] .slide {
  --slide-bg: linear-gradient(90deg, var(--bg) 0 50%, var(--bg-2) 50% 100%);
  border-radius: 24px;
  box-shadow: 0 16px 40px rgba(80, 60, 90, 0.12);
}
.deck[data-surface="split-pastel-panels"] .slide::before {
  width: 42%;
  height: 42%;
  right: 8%;
  top: 12%;
  background-image:
    linear-gradient(color-mix(in srgb, var(--text) 8%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, var(--text) 8%, transparent) 1px, transparent 1px);
  background-size: 28px 28px;
  filter: none;
  opacity: 0.55;
  border-radius: 16px;
}
.deck[data-surface="split-pastel-panels"] .slide::after {
  width: 72px;
  height: 28px;
  right: 48px;
  bottom: 48px;
  top: auto;
  border-radius: 999px;
  background: var(--accent);
  filter: none;
  box-shadow: 0 -40px 0 var(--accent2), 0 -80px 0 #f0f0c8;
}
.deck[data-surface="split-pastel-panels"] .slide h1 {
  font-weight: 800;
  letter-spacing: -0.03em;
}
.deck[data-surface="split-pastel-panels"] .card {
  background: rgba(255,255,255,0.7);
  border-radius: 18px;
  border: none;
}

/* ── vintage-editorial-geo (vintage-editorial) ── */
.deck[data-surface="vintage-editorial-geo"] .slide {
  --slide-bg: var(--bg);
  border-radius: 4px;
  border: 1.5px solid color-mix(in srgb, var(--text) 28%, transparent);
  box-shadow: 0 14px 36px rgba(26, 26, 26, 0.08);
}
.deck[data-surface="vintage-editorial-geo"] .slide::before {
  width: 120px;
  height: 120px;
  right: 56px;
  top: 48px;
  border-radius: 50%;
  border: 2px solid color-mix(in srgb, var(--text) 35%, transparent);
  background: transparent;
  filter: none;
}
.deck[data-surface="vintage-editorial-geo"] .slide::after {
  width: 10px;
  height: 10px;
  right: 108px;
  top: 100px;
  border-radius: 50%;
  background: var(--text);
  filter: none;
  box-shadow: 40px 36px 0 0 color-mix(in srgb, var(--accent) 90%, transparent);
}
.deck[data-surface="vintage-editorial-geo"] .slide h1 {
  font-weight: 900;
  letter-spacing: -0.02em;
}
.deck[data-surface="vintage-editorial-geo"] .card {
  background: #fff;
  border: 2px solid var(--text);
  border-radius: 4px;
}

/* ── paper-ink-literary (paper-ink) ── */
.deck[data-surface="paper-ink-literary"] .slide {
  --slide-bg: var(--bg);
  border-radius: 0;
  border: 1px solid color-mix(in srgb, var(--text) 12%, transparent);
  box-shadow: 0 12px 32px rgba(26, 18, 12, 0.08);
}
.deck[data-surface="paper-ink-literary"] .slide::before {
  left: 64px;
  right: 64px;
  top: 52px;
  height: 2px;
  background: var(--accent);
}
.deck[data-surface="paper-ink-literary"] .slide::after {
  left: 64px;
  right: 64px;
  top: auto;
  bottom: 52px;
  height: 1px;
  width: auto;
  background: color-mix(in srgb, var(--text) 35%, transparent);
  filter: none;
}
.deck[data-surface="paper-ink-literary"] .slide h1 {
  font-weight: 600;
  letter-spacing: -0.01em;
}
.deck[data-surface="paper-ink-literary"] .slide h1::first-letter {
  color: var(--accent);
  font-weight: 700;
}
.deck[data-surface="paper-ink-literary"] .card {
  background: #fff;
  border-left: 3px solid var(--accent);
  border-radius: 0;
}

/* ── biennale-yellow-sun (biennale-yellow) ── */
.deck[data-surface="biennale-yellow-sun"] .slide {
  --slide-bg: radial-gradient(ellipse 75% 65% at 85% 15%, color-mix(in srgb, var(--accent) 85%, transparent), transparent 62%),
    radial-gradient(ellipse 50% 45% at 70% 35%, color-mix(in srgb, #F8F39B 55%, transparent), transparent 70%),
    var(--bg);
  border-radius: 0;
  border: 1px solid color-mix(in srgb, var(--text) 18%, transparent);
}
.deck[data-surface="biennale-yellow-sun"] .slide::before {
  left: 64px;
  right: 64px;
  top: 48px;
  height: 1px;
  background: var(--text);
}
.deck[data-surface="biennale-yellow-sun"] .slide::after {
  display: none;
}
.deck[data-surface="biennale-yellow-sun"] .slide h1 {
  font-weight: 400;
  font-style: italic;
  letter-spacing: -0.018em;
}
.deck[data-surface="biennale-yellow-sun"] .card {
  background: transparent;
  border-top: 1px solid color-mix(in srgb, var(--text) 22%, transparent);
  border-radius: 0;
}

/* ── bold-poster-ink (bold-poster) ── */
.deck[data-surface="bold-poster-ink"] .slide {
  --slide-bg: var(--bg);
  border-radius: 0;
  border: 2.5px solid var(--text);
  box-shadow: 8px 8px 0 color-mix(in srgb, var(--accent) 35%, transparent);
}
.deck[data-surface="bold-poster-ink"] .slide::before {
  left: 0;
  right: 0;
  top: 0;
  height: 10px;
  background: var(--accent);
}
.deck[data-surface="bold-poster-ink"] .slide::after {
  width: 28%;
  height: 28%;
  right: 40px;
  bottom: 40px;
  top: auto;
  background: var(--bg-2);
  border: 2px solid var(--text);
  filter: none;
}
.deck[data-surface="bold-poster-ink"] .slide h1 {
  font-weight: 400;
  letter-spacing: 0.01em;
  color: var(--accent);
  text-shadow: 3px 3px 0 rgba(28,20,16,0.12);
}
.deck[data-surface="bold-poster-ink"] .card {
  background: var(--bg-2);
  border: 2px solid var(--text);
  border-radius: 0;
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
`,zw="warm-paper",Iw="clean-light",Ow="soft-bento",Lw="bauhaus-blocks",Dw="vapor-horizon",Bw="hygge-soft",Aw="blueprint-grid",Rw="glass-mist",Ww="newsprint-masthead",Uw="vellum-colorfield",Gw="broadside-fire",Hw="signal-briefing",Vw={claude:zw,"default-tech":"neon-glow",corporate:Iw,playful:Ow,"luxury-minimalist":"quiet-luxe","retro-arcade":"scanline-neon","editorial-serif":"editorial-rule","brutalist-mono":"brutalist-grid","pastel-dreamy":"pastel-cloud","aurora-glass":"aurora-glass","ft-editorial":"broadsheet-rule","genz-bento":"hard-bento","crt-terminal":"crt-phosphor","swiss-typographic":"swiss-grid","candy-pop":"candy-blob","aerospace-hud":"hud-grid","brutalist-acid":"acid-block",bauhaus:Lw,"y2k-aero":"aero-bubble","risograph-zine":"riso-print","neon-noir":"neon-rain",vaporwave:Dw,"botanical-luxe":"botanical-leaf","heritage-editorial":"heritage-wash","fintech-clean":"fintech-soft","developer-dark":"dev-terminal","data-editorial":"data-rule",scandinavian:Bw,"art-deco":"deco-fan","kinetic-wrapped":"wrapped-block",blueprint:Aw,glassmorphism:Rw,broadsheet:Ww,"soft-editorial":"soft-editorial-paper","editorial-forest":"editorial-forest-paper","pin-and-paper":"pin-paper-pad",vellum:Uw,"neo-grid-bold":"neo-grid-panels","editorial-tri-tone":"tri-tone-blocks","creative-mode":"creative-mode-blocks",broadside:Gw,"bold-signal":"bold-signal-card","notebook-tabs":"notebook-tabs-page","creative-voltage":"creative-voltage-split",signal:Hw,"electric-studio":"electric-studio-split","dark-botanical":"dark-botanical-bloom","pastel-geometry":"pastel-geometry-pills","split-pastel":"split-pastel-panels","vintage-editorial":"vintage-editorial-geo","paper-ink":"paper-ink-literary","biennale-yellow":"biennale-yellow-sun","bold-poster":"bold-poster-ink"},Qw=`<!doctype html>
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
`;function Kw(e){return Vw[e]??"gradient"}const Yw=Object.assign({"../../../shared/layouts/closing.html":iw,"../../../shared/layouts/comparison.html":lw,"../../../shared/layouts/data-table.html":sw,"../../../shared/layouts/feature-grid.html":cw,"../../../shared/layouts/image-hero.html":uw,"../../../shared/layouts/quote.html":dw,"../../../shared/layouts/section.html":pw,"../../../shared/layouts/stat-row.html":fw,"../../../shared/layouts/timeline.html":gw,"../../../shared/layouts/title.html":hw,"../../../shared/layouts/two-column.html":mw}),by=new Map;for(const[e,n]of Object.entries(Yw)){const t=e.split("/").pop().replace(/\.html$/,"");by.set(t,n)}function Jw(e){return e.length===0?"":`https://fonts.googleapis.com/css2?family=${e.join("&family=")}&display=swap`}const qw=new Set(["http","https","mailto","tel"]);function xy(e){let n="";for(const t of e){const r=t.charCodeAt(0);r>31&&r!==127&&(n+=t)}return n}function wy(e){var n,t;return(t=(n=e.match(/^([a-zA-Z][a-zA-Z0-9+.-]*):/))==null?void 0:n[1])==null?void 0:t.toLowerCase()}function Xw(e){if(typeof e!="string")return;const n=xy(e).trim(),t=wy(n);return t&&!qw.has(t)?"#":n}function Zw(e){if(typeof e!="string")return;const n=xy(e).trim();if(/^data:image\//i.test(n))return n;const t=wy(n);return t&&t!=="http"&&t!=="https"?"":n}function ek(e){var t;const n={...e};return e.layout==="data-table"&&Array.isArray(e.rows)&&(n.rows=e.rows.map(r=>({cells:r}))),e.layout==="feature-grid"&&(typeof e.columns=="number"?n.columns=e.columns:e.columns||(n.columns=3)),((t=e.cta)==null?void 0:t.href)!==void 0&&(n.cta={...e.cta,href:Xw(e.cta.href)}),e.image!==void 0&&(n.image=Zw(e.image)),n}const nk='<footer class="pmd-attribution">Made with <a href="https://presentation-md.vercel.app/?ref=studio" target="_blank" rel="noopener">presentation-md</a></footer>',tk=`
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
@media print { .pmd-attribution { opacity: 0.5; } }`;function rk(e){return`<script type="application/json" id="pmd-deck">${JSON.stringify(e).replace(/</g,"\\u003c")}<\/script>`}function ky(e,n){var c,p,g;const t={bg:n.palette.bg,bg2:n.palette.bg2,text:n.palette.text,muted:n.palette.muted,accent:n.palette.accent,accent2:n.palette.accent2,cardBg:n.palette.cardBg,border:n.palette.border,radius:n.geometry.radius,slideW:n.geometry.slideWidth,headingFont:n.typography.headingFont,bodyFont:n.typography.bodyFont,headingWeight:String(n.typography.headingWeight)},r=ve.render(Mw,t),o=Jw(n.typography.googleFonts),a=Kw(n.name);let i=o?`@import url('${o}');

${r}

${cs}`:`${r}

${cs}`;i+=`

${tk}`;const l=(Array.isArray(e.slides)?e.slides:[]).map(m=>{const y=by.get(m.layout);return y?ve.render(y,ek(m)):`<section class="slide"><h2>Unknown layout: ${m.layout}</h2></section>`}).join(`
`),s=((c=e.meta)==null?void 0:c.title)??((p=e.meta)==null?void 0:p.company)??"Presentation";return ve.render(Qw,{title:s,description:((g=e.meta)==null?void 0:g.description)??"",styles:i,slides:l,surface:a,attribution:nk,deckData:rk(e)})}const ok="modulepreload",ak=function(e){return"/studio/"+e},us={},Sy=function(n,t,r){let o=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),l=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));o=Promise.allSettled(t.map(s=>{if(s=ak(s),s in us)return;us[s]=!0;const c=s.endsWith(".css"),p=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${s}"]${p}`))return;const g=document.createElement("link");if(g.rel=c?"stylesheet":ok,c||(g.as="script"),g.crossOrigin="",g.href=s,l&&g.setAttribute("nonce",l),document.head.appendChild(g),c)return new Promise((m,y)=>{g.addEventListener("load",m),g.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${s}`)))})}))}function a(i){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=i,window.dispatchEvent(l),!l.defaultPrevented)throw i}return o.then(i=>{for(const l of i||[])l.status==="rejected"&&a(l.reason);return n().catch(a)})};function Qi(e,n){const t=URL.createObjectURL(e),r=document.createElement("a");r.href=t,r.download=n,document.body.appendChild(r),r.click(),r.remove(),URL.revokeObjectURL(t)}function Ki(e,n){var r,o;return`${(((r=e.meta)==null?void 0:r.title)??((o=e.meta)==null?void 0:o.company)??"deck").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"deck"}.${n}`}function _y(e){var n;return((n=e.meta)==null?void 0:n.theme)??"default-tech"}async function ik(e){const n=[],t=Hi(_y(e)),{deckToPptxBlob:r}=await Sy(async()=>{const{deckToPptxBlob:a}=await import("./index-rT3NUMG4.js");return{deckToPptxBlob:a}},__vite__mapDeps([0,1])),o=await r(e,t,{onWarn:a=>n.push(a)});return Qi(o,Ki(e,"pptx")),{warnings:n}}function lk(e){const n=Hi(_y(e)),t=ky(e,n);Qi(new Blob([t],{type:"text/html"}),Ki(e,"html"))}function sk(e){Qi(new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),Ki(e,"json"))}function Yi(e){const n=JSON.parse(e);if((n==null?void 0:n.type)!=="deck"||!Array.isArray(n.slides))throw new Error('Not a valid deck: expected { "type": "deck", "slides": [...] }');return n}function ck(e){var r,o,a;const n=["pmd-deck","psp-deck"];if(typeof DOMParser<"u"){const i=new DOMParser().parseFromString(e,"text/html");for(const l of n){const s=(o=(r=i.getElementById(l))==null?void 0:r.textContent)==null?void 0:o.trim();if(s)return s}}const t=e.match(/<script[^>]*id=["'](?:pmd-deck|psp-deck)["'][^>]*>([\s\S]*?)<\/script>/i);return(a=t==null?void 0:t[1])==null?void 0:a.trim()}function uk(e){const n=ck(e);if(!n)throw new Error("No editable deck found in this HTML. Only presentations created by presentation-md (with an embedded source) can be opened.");return Yi(n)}function dk(e,n){return/\.html?$/i.test(e)?uk(n):Yi(n)}function pk({deck:e,onChange:n,onLoadExample:t,onPresent:r,onGenerate:o}){var f,u,h,b;const a=D.useRef(null),[i,l]=D.useState(""),[s,c]=D.useState(!1),p=yy(),g=((f=e.meta)==null?void 0:f.theme)??"default-tech",m=v=>n({...e,meta:{...e.meta,...v}}),y=v=>m({theme:v}),S=v=>m({title:v}),x=async v=>{try{const w=dk(v.name,await v.text());n(w),l(`Opened ${v.name}`)}catch(w){l(`Open failed: ${w.message}`)}},j=async()=>{c(!0),l("Building .pptx…");try{const{warnings:v}=await ik(e);l(v.length?`Exported .pptx (${v.length} warning${v.length>1?"s":""})`:"Exported .pptx")}catch(v){l(`Export failed: ${v.message}`)}finally{c(!1)}};return d.jsxs("header",{className:"toolbar",children:[d.jsxs("div",{className:"brand",children:[d.jsx("strong",{children:"Studio"}),d.jsx("span",{className:"muted small",children:"presentation-md"})]}),d.jsx("input",{className:"text-input title-input",value:((u=e.meta)==null?void 0:u.title)??"",placeholder:"Deck title",onChange:v=>S(v.target.value)}),d.jsxs("label",{className:"inline-field",children:[d.jsx("span",{className:"muted small",children:"Theme"}),d.jsx("select",{className:"text-input",value:g,onChange:v=>y(v.target.value),children:p.map(v=>d.jsx("option",{value:v,children:v},v))})]}),d.jsxs("details",{className:"deck-details",children:[d.jsx("summary",{className:"btn btn-sm",children:"Details"}),d.jsxs("div",{className:"deck-details-body",children:[d.jsx("input",{className:"text-input",value:((h=e.meta)==null?void 0:h.company)??"",placeholder:"Company",onChange:v=>m({company:v.target.value})}),d.jsx("input",{className:"text-input",value:((b=e.meta)==null?void 0:b.description)??"",placeholder:"Description",onChange:v=>m({description:v.target.value})})]})]}),d.jsx("div",{className:"spacer"}),d.jsx("button",{className:"btn btn-generate",onClick:o,title:"Generate a deck from a prompt",children:"✨ Generate"}),d.jsx("button",{className:"btn",onClick:t,children:"Example"}),d.jsx("button",{className:"btn",onClick:()=>{var v;return(v=a.current)==null?void 0:v.click()},title:"Open a deck .html or .json",children:"Open"}),d.jsx("button",{className:"btn",onClick:r,title:"Present fullscreen",children:"Present"}),d.jsx("button",{className:"btn",onClick:()=>sk(e),children:"JSON"}),d.jsx("button",{className:"btn",onClick:()=>lk(e),children:"HTML"}),d.jsx("button",{className:"btn btn-primary",disabled:s,onClick:j,children:s?"…":"Download .pptx"}),d.jsx("input",{ref:a,type:"file",accept:".html,.htm,.json,application/json,text/html",hidden:!0,onChange:v=>{var C;const w=(C=v.target.files)==null?void 0:C[0];w&&x(w),v.target.value=""}}),i&&d.jsx("span",{className:"status muted small",children:i})]})}function fk({slides:e,selected:n,onSelect:t,onChange:r}){const[o,a]=D.useState("title"),i=()=>{const p=n+1,g=[...e.slice(0,p),rx(o),...e.slice(p)];r(g,p)},l=p=>{const g=JSON.parse(JSON.stringify(e[p]));r([...e.slice(0,p+1),g,...e.slice(p+1)],p+1)},s=p=>{if(e.length<=1)return;const g=e.filter((m,y)=>y!==p);r(g,Math.max(0,Math.min(p,g.length-1)))},c=(p,g)=>{const m=p+g;if(m<0||m>=e.length)return;const y=e.slice();[y[p],y[m]]=[y[m],y[p]],r(y,m)};return d.jsxs("div",{className:"slide-list",children:[d.jsxs("div",{className:"add-row",children:[d.jsx("select",{className:"text-input",value:o,onChange:p=>a(p.target.value),children:tx.map(p=>d.jsx("option",{value:p,children:Ja[p]},p))}),d.jsx("button",{className:"btn btn-sm",onClick:i,children:"+ Add"})]}),d.jsx("ul",{className:"slides",children:e.map((p,g)=>d.jsxs("li",{className:`slide-row ${g===n?"active":""}`,onClick:()=>t(g),children:[d.jsxs("div",{className:"slide-row-main",children:[d.jsx("span",{className:"slide-row-num",children:g+1}),d.jsxs("div",{className:"slide-row-text",children:[d.jsx("span",{className:"slide-row-layout",children:Ja[p.layout]??p.layout}),d.jsx("span",{className:"slide-row-title",children:p.heading??p.quote??p.eyebrow??"—"})]})]}),d.jsxs("div",{className:"slide-row-actions",onClick:m=>m.stopPropagation(),children:[d.jsx("button",{className:"btn btn-icon",title:"Move up",onClick:()=>c(g,-1),children:"↑"}),d.jsx("button",{className:"btn btn-icon",title:"Move down",onClick:()=>c(g,1),children:"↓"}),d.jsx("button",{className:"btn btn-icon",title:"Duplicate",onClick:()=>l(g),children:"⧉"}),d.jsx("button",{className:"btn btn-icon btn-danger",title:"Delete",onClick:()=>s(g),children:"✕"})]})]},g))})]})}function Ji({label:e,children:n}){return d.jsxs("label",{className:"field",children:[d.jsx("span",{className:"field-label",children:e}),n]})}function M({label:e,value:n,onChange:t,placeholder:r}){return d.jsx(Ji,{label:e,children:d.jsx("input",{className:"text-input",type:"text",value:n??"",placeholder:r,onChange:o=>t(o.target.value)})})}function Ue({label:e,value:n,onChange:t,rows:r=3}){return d.jsx(Ji,{label:e,children:d.jsx("textarea",{className:"text-input",rows:r,value:n??"",onChange:o=>t(o.target.value)})})}function gk({label:e,value:n,options:t,onChange:r}){return d.jsx(Ji,{label:e,children:d.jsx("select",{className:"text-input",value:n,onChange:o=>r(Number(o.target.value)),children:t.map(o=>d.jsx("option",{value:o,children:o},o))})})}function Br({label:e,items:n,onChange:t,blank:r,renderItem:o}){const a=(l,s)=>t(n.map((c,p)=>p===l?s:c)),i=(l,s)=>{const c=l+s;if(c<0||c>=n.length)return;const p=n.slice();[p[l],p[c]]=[p[c],p[l]],t(p)};return d.jsxs("div",{className:"list-editor",children:[d.jsxs("div",{className:"list-editor-head",children:[d.jsx("span",{className:"field-label",children:e}),d.jsx("button",{className:"btn btn-sm",onClick:()=>t([...n,r()]),children:"+ Add"})]}),n.map((l,s)=>d.jsxs("div",{className:"list-item",children:[d.jsxs("div",{className:"list-item-controls",children:[d.jsx("span",{className:"list-item-index",children:s+1}),d.jsx("div",{className:"spacer"}),d.jsx("button",{className:"btn btn-icon",title:"Move up",onClick:()=>i(s,-1),children:"↑"}),d.jsx("button",{className:"btn btn-icon",title:"Move down",onClick:()=>i(s,1),children:"↓"}),d.jsx("button",{className:"btn btn-icon btn-danger",title:"Remove",onClick:()=>t(n.filter((c,p)=>p!==s)),children:"✕"})]}),o(l,c=>a(s,c),s)]},s)),n.length===0&&d.jsx("p",{className:"muted small",children:"No items yet."})]})}function hk({slide:e,onChange:n}){const t=a=>n({...e,...a}),r=e.layout;return d.jsxs("div",{className:"slide-form",children:[d.jsx("h2",{className:"panel-title",children:Ja[r]??e.layout}),o()]});function o(){var a,i;switch(e.layout){case"title":case"closing":return d.jsxs(d.Fragment,{children:[d.jsx(M,{label:"Eyebrow",value:e.eyebrow,onChange:l=>t({eyebrow:l})}),d.jsx(M,{label:"Heading",value:e.heading,onChange:l=>t({heading:l})}),d.jsx(Ue,{label:"Lead",value:e.lead,onChange:l=>t({lead:l})}),e.layout==="closing"&&d.jsxs(d.Fragment,{children:[d.jsx(M,{label:"CTA label",value:(a=e.cta)==null?void 0:a.label,onChange:l=>t({cta:{...e.cta,label:l}})}),d.jsx(M,{label:"CTA link",value:(i=e.cta)==null?void 0:i.href,onChange:l=>t({cta:{...e.cta,href:l}})})]})]});case"section":return d.jsxs(d.Fragment,{children:[d.jsx(M,{label:"Number",value:e.number,onChange:l=>t({number:l})}),d.jsx(M,{label:"Eyebrow",value:e.eyebrow,onChange:l=>t({eyebrow:l})}),d.jsx(M,{label:"Heading",value:e.heading,onChange:l=>t({heading:l})}),d.jsx(Ue,{label:"Lead",value:e.lead,onChange:l=>t({lead:l})})]});case"two-column":return d.jsxs(d.Fragment,{children:[d.jsx(M,{label:"Eyebrow",value:e.eyebrow,onChange:l=>t({eyebrow:l})}),d.jsx(M,{label:"Heading",value:e.heading,onChange:l=>t({heading:l})}),d.jsx(Ue,{label:"Body",value:e.body,onChange:l=>t({body:l}),rows:5}),d.jsx(M,{label:"Image URL (data: URIs embed in PPTX)",value:e.image,onChange:l=>t({image:l})}),d.jsx(M,{label:"Image alt",value:e.imageAlt,onChange:l=>t({imageAlt:l})})]});case"image-hero":return d.jsxs(d.Fragment,{children:[d.jsx(M,{label:"Eyebrow",value:e.eyebrow,onChange:l=>t({eyebrow:l})}),d.jsx(M,{label:"Heading",value:e.heading,onChange:l=>t({heading:l})}),d.jsx(Ue,{label:"Lead",value:e.lead,onChange:l=>t({lead:l}),rows:3}),d.jsx(M,{label:"Image URL (data: URIs embed in PPTX)",value:e.image,onChange:l=>t({image:l})}),d.jsx(M,{label:"Image alt",value:e.imageAlt,onChange:l=>t({imageAlt:l})})]});case"comparison":return d.jsxs(d.Fragment,{children:[d.jsx(M,{label:"Eyebrow",value:e.eyebrow,onChange:l=>t({eyebrow:l})}),d.jsx(M,{label:"Heading",value:e.heading,onChange:l=>t({heading:l})}),d.jsx(M,{label:"Left label",value:e.leftLabel,onChange:l=>t({leftLabel:l})}),d.jsx(Ue,{label:"Left body",value:e.left,onChange:l=>t({left:l}),rows:4}),d.jsx(M,{label:"Right label",value:e.rightLabel,onChange:l=>t({rightLabel:l})}),d.jsx(Ue,{label:"Right body",value:e.right,onChange:l=>t({right:l}),rows:4})]});case"quote":return d.jsxs(d.Fragment,{children:[d.jsx(Ue,{label:"Quote",value:e.quote,onChange:l=>t({quote:l}),rows:4}),d.jsx(M,{label:"Attribution",value:e.by,onChange:l=>t({by:l})})]});case"feature-grid":return d.jsxs(d.Fragment,{children:[d.jsx(M,{label:"Eyebrow",value:e.eyebrow,onChange:l=>t({eyebrow:l})}),d.jsx(M,{label:"Heading",value:e.heading,onChange:l=>t({heading:l})}),d.jsx(gk,{label:"Columns",value:typeof e.columns=="number"?e.columns:3,options:[2,3,4],onChange:l=>t({columns:l})}),d.jsx(Br,{label:"Cards",items:e.cards??[],onChange:l=>t({cards:l}),blank:()=>({title:"New card",body:""}),renderItem:(l,s)=>d.jsxs(d.Fragment,{children:[d.jsx(M,{label:"Icon (FontAwesome class)",value:l.icon,onChange:c=>s({...l,icon:c})}),d.jsx(M,{label:"Title",value:l.title,onChange:c=>s({...l,title:c})}),d.jsx(Ue,{label:"Body",value:l.body,onChange:c=>s({...l,body:c}),rows:2})]})})]});case"stat-row":return d.jsxs(d.Fragment,{children:[d.jsx(M,{label:"Eyebrow",value:e.eyebrow,onChange:l=>t({eyebrow:l})}),d.jsx(M,{label:"Heading",value:e.heading,onChange:l=>t({heading:l})}),d.jsx(Br,{label:"Stats",items:e.stats??[],onChange:l=>t({stats:l}),blank:()=>({value:"0",label:"Metric"}),renderItem:(l,s)=>d.jsxs(d.Fragment,{children:[d.jsx(M,{label:"Value",value:l.value,onChange:c=>s({...l,value:c})}),d.jsx(M,{label:"Label",value:l.label,onChange:c=>s({...l,label:c})})]})})]});case"timeline":return d.jsxs(d.Fragment,{children:[d.jsx(M,{label:"Eyebrow",value:e.eyebrow,onChange:l=>t({eyebrow:l})}),d.jsx(M,{label:"Heading",value:e.heading,onChange:l=>t({heading:l})}),d.jsx(Br,{label:"Steps",items:e.steps??[],onChange:l=>t({steps:l}),blank:()=>({title:"New step",body:""}),renderItem:(l,s)=>d.jsxs(d.Fragment,{children:[d.jsx(M,{label:"Title",value:l.title,onChange:c=>s({...l,title:c})}),d.jsx(Ue,{label:"Body",value:l.body,onChange:c=>s({...l,body:c}),rows:2})]})})]});case"data-table":return d.jsx(mk,{slide:e,set:t});default:return d.jsx("p",{className:"muted",children:"No editable fields for this layout."})}}}function mk({slide:e,set:n}){const t=Array.isArray(e.columns)?e.columns:[],r=Array.isArray(e.rows)?e.rows:[],o=Math.max(t.length,...r.map(s=>s.length),1),a=(s,c)=>{const p=t.slice();p[s]=c,n({columns:p})},i=()=>{n({columns:[...t,`Column ${t.length+1}`],rows:r.map(s=>[...s,""])})},l=s=>{n({columns:t.filter((c,p)=>p!==s),rows:r.map(c=>c.filter((p,g)=>g!==s))})};return d.jsxs(d.Fragment,{children:[d.jsx(M,{label:"Eyebrow",value:e.eyebrow,onChange:s=>n({eyebrow:s})}),d.jsx(M,{label:"Heading",value:e.heading,onChange:s=>n({heading:s})}),d.jsxs("div",{className:"list-editor",children:[d.jsxs("div",{className:"list-editor-head",children:[d.jsx("span",{className:"field-label",children:"Columns"}),d.jsx("button",{className:"btn btn-sm",onClick:i,children:"+ Column"})]}),Array.from({length:o}).map((s,c)=>d.jsxs("div",{className:"row-inline",children:[d.jsx("input",{className:"text-input",value:t[c]??"",placeholder:`Column ${c+1}`,onChange:p=>a(c,p.target.value)}),d.jsx("button",{className:"btn btn-icon btn-danger",title:"Remove column",onClick:()=>l(c),children:"✕"})]},c))]}),d.jsx(Br,{label:"Rows",items:r,onChange:s=>n({rows:s}),blank:()=>Array.from({length:o},()=>""),renderItem:(s,c)=>d.jsx("div",{className:"row-cells",children:Array.from({length:o}).map((p,g)=>d.jsx("input",{className:"text-input",value:s[g]??"",placeholder:t[g]??`Col ${g+1}`,onChange:m=>{const y=s.slice();for(;y.length<o;)y.push("");y[g]=m.target.value,c(y)}},g))})})]})}function vk({html:e}){return d.jsx("div",{className:"preview",children:d.jsx("iframe",{className:"preview-frame",title:"Deck preview",srcDoc:e,sandbox:"allow-same-origin",referrerPolicy:"no-referrer"})})}const yk=`
html { scroll-behavior: smooth; scroll-snap-type: y mandatory; }
body { gap: 0 !important; padding: 0 !important; }
.slide { min-height: 100vh !important; margin: 0 !important; border-radius: 0 !important; scroll-snap-align: start !important; scroll-snap-stop: always !important; }
.pmd-attribution { display: none !important; }
`;function bk({html:e,slideCount:n,onClose:t}){const r=D.useRef(null),[o,a]=D.useState(0),i=e.replace("</head>",`<style>${yk}</style></head>`),l=s=>a(c=>Math.max(0,Math.min(n-1,c+s)));return D.useEffect(()=>{const s=c=>{c.key==="Escape"?t():c.key==="ArrowRight"||c.key===" "||c.key==="PageDown"?(c.preventDefault(),a(p=>Math.min(n-1,p+1))):(c.key==="ArrowLeft"||c.key==="PageUp")&&(c.preventDefault(),a(p=>Math.max(0,p-1)))};return window.addEventListener("keydown",s),()=>window.removeEventListener("keydown",s)},[t,n]),D.useEffect(()=>{var p,g;const s=(p=r.current)==null?void 0:p.contentDocument,c=s==null?void 0:s.querySelectorAll("section.slide");(g=c==null?void 0:c[o])==null||g.scrollIntoView({behavior:"smooth",block:"start"})},[o,i]),d.jsxs("div",{className:"present-overlay",children:[d.jsx("div",{className:"present-stage",children:d.jsx("iframe",{ref:r,className:"present-frame",title:"Present deck",srcDoc:i,sandbox:"allow-same-origin"})}),d.jsxs("div",{className:"present-bar",children:[d.jsx("button",{className:"btn btn-icon",title:"Previous (←)",onClick:()=>l(-1),children:"←"}),d.jsxs("span",{className:"present-count",children:[o+1," / ",n]}),d.jsx("button",{className:"btn btn-icon",title:"Next (→)",onClick:()=>l(1),children:"→"}),d.jsx("button",{className:"btn",onClick:t,children:"Exit · Esc"})]})]})}const ds=[{id:"claude-opus-4-8",label:"Opus 4.8 — most capable"},{id:"claude-sonnet-4-6",label:"Sonnet 4.6 — faster, cheaper"},{id:"claude-haiku-4-5",label:"Haiku 4.5 — fastest"}],$y=`You author slide decks as a single JSON object matching this schema — the "Deck JSON" spec used by presentation-md.

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
- Only emit fields defined above. Do not invent new layouts or fields.`;function Ey(e,n){return`Create a deck for the following brief. Set meta.theme to "${n}".

Brief:
${e.trim()}`}function xk(e,n){return`${$y}

${Ey(e,n)}

Respond with ONLY the JSON object — no prose, no markdown fences.`}function wk(e){const n=e.match(/```(?:json)?\s*([\s\S]*?)```/i),t=((n==null?void 0:n[1])??e).trim(),r=t.indexOf("{"),o=t.lastIndexOf("}");return r===-1||o===-1||o<r?t:t.slice(r,o+1)}async function kk(e){const{apiKey:n,model:t,brief:r,theme:o,signal:a}=e;if(!r.trim())throw new Error("Describe your deck first.");if(!n.trim())throw new Error("Enter your Anthropic API key.");const{default:i}=await Sy(async()=>{const{default:g}=await import("./index-D9BOkcv1.js");return{default:g}},__vite__mapDeps([2,1])),c=(await new i({apiKey:n.trim(),dangerouslyAllowBrowser:!0}).messages.create({model:t,max_tokens:8e3,system:$y,messages:[{role:"user",content:`${Ey(r,o)}

Respond with ONLY the JSON object — no prose, no markdown fences.`}]},{signal:a})).content.map(g=>g.type==="text"?g.text:"").join("");if(!c.trim())throw new Error("The model returned an empty response. Try again.");let p;try{p=Yi(wk(c))}catch(g){throw new Error(`Couldn't parse the generated deck: ${g.message}`)}return p.meta={...p.meta,theme:o},p}const Er="pmd-studio-anthropic-key",Sk=["Q3 all-hands: momentum, key metrics, roadmap, and what's next.","Seed pitch for an AI-native analytics tool — problem, product, traction, ask.","Launch deck for a developer CLI: what it is, how it works, why it's fast."];function _k({currentTheme:e,onGenerate:n,onClose:t}){const[r,o]=D.useState(""),[a,i]=D.useState(e),[l,s]=D.useState(ds[0].id),[c,p]=D.useState(()=>localStorage.getItem(Er)??""),[g,m]=D.useState(()=>!!localStorage.getItem(Er)),[y,S]=D.useState(!1),[x,j]=D.useState(""),[f,u]=D.useState(!1),h=yy(),b=async()=>{S(!0),j("Generating your deck…");try{g?localStorage.setItem(Er,c.trim()):localStorage.removeItem(Er);const w=await kk({apiKey:c,model:l,brief:r,theme:a});n(w),t()}catch(w){j(w.message)}finally{S(!1)}},v=async()=>{try{await navigator.clipboard.writeText(xk(r,a)),u(!0),setTimeout(()=>u(!1),1800)}catch{j("Couldn't copy — select the prompt manually.")}};return d.jsx("div",{className:"modal-overlay",onClick:t,children:d.jsxs("div",{className:"modal",onClick:w=>w.stopPropagation(),children:[d.jsxs("header",{className:"modal-head",children:[d.jsxs("div",{children:[d.jsx("strong",{children:"Generate a deck"}),d.jsx("span",{className:"muted small",children:"Describe it — get an editable deck in seconds."})]}),d.jsx("button",{className:"btn btn-sm",onClick:t,"aria-label":"Close",children:"✕"})]}),d.jsxs("div",{className:"modal-body",children:[d.jsx("label",{className:"field-label",children:"What's the deck about?"}),d.jsx("textarea",{className:"text-input brief-input",value:r,placeholder:"e.g. Q3 all-hands covering revenue, product wins, and the roadmap for next quarter.",rows:4,onChange:w=>o(w.target.value)}),d.jsx("div",{className:"chip-row",children:Sk.map(w=>d.jsx("button",{className:"chip",onClick:()=>o(w),title:"Use this brief",children:w.split(/[:—]/)[0].trim()},w))}),d.jsxs("div",{className:"field-grid",children:[d.jsxs("label",{className:"inline-field",children:[d.jsx("span",{className:"muted small",children:"Theme"}),d.jsx("select",{className:"text-input",value:a,onChange:w=>i(w.target.value),children:h.map(w=>d.jsx("option",{value:w,children:w},w))})]}),d.jsxs("label",{className:"inline-field",children:[d.jsx("span",{className:"muted small",children:"Model"}),d.jsx("select",{className:"text-input",value:l,onChange:w=>s(w.target.value),children:ds.map(w=>d.jsx("option",{value:w.id,children:w.label},w.id))})]})]}),d.jsxs("div",{className:"gen-panel",children:[d.jsx("label",{className:"field-label",children:"Your Anthropic API key"}),d.jsx("input",{className:"text-input",type:"password",value:c,placeholder:"sk-ant-…",autoComplete:"off",onChange:w=>p(w.target.value)}),d.jsxs("label",{className:"checkbox-field",children:[d.jsx("input",{type:"checkbox",checked:g,onChange:w=>m(w.target.checked)}),d.jsx("span",{className:"muted small",children:"Remember on this device (stored only in your browser)"})]}),d.jsxs("p",{className:"muted small privacy-note",children:["Your key stays in this browser. Requests go straight to Anthropic — nothing is sent to our servers. Get a key at ",d.jsx("a",{href:"https://console.anthropic.com/settings/keys",target:"_blank",rel:"noreferrer",children:"console.anthropic.com"}),"."]}),d.jsx("button",{className:"btn btn-primary btn-block",disabled:y,onClick:b,children:y?"Generating…":"Generate deck"})]}),d.jsx("div",{className:"gen-divider",children:d.jsx("span",{children:"or hand it to your agent"})}),d.jsxs("div",{className:"gen-panel",children:[d.jsx("p",{className:"muted small",children:"No key? Copy a ready-made prompt and paste it into Claude Code, Cursor, or any agent with the presentation skill installed — then open the resulting deck here."}),d.jsx("button",{className:"btn btn-block",onClick:v,disabled:!r.trim(),children:f?"Copied ✓":"Copy prompt for your agent"})]}),x&&d.jsx("p",{className:"status muted small gen-status",children:x})]})]})})}const Cy="pmd-studio-deck-v1";function $k(){try{const e=localStorage.getItem(Cy);if(e){const n=JSON.parse(e);if((n==null?void 0:n.type)==="deck"&&Array.isArray(n.slides)&&n.slides.length)return n}}catch{}return $u}function Ek(){var y;const[e,n]=D.useState($k),[t,r]=D.useState(0),[o,a]=D.useState(!1),[i,l]=D.useState(!1);D.useEffect(()=>{try{localStorage.setItem(Cy,JSON.stringify(e))}catch{}},[e]);const s=D.useMemo(()=>{var S;try{return ky(e,Hi(((S=e.meta)==null?void 0:S.theme)??"default-tech"))}catch(x){return`<pre style="color:#d9695a;font-family:monospace;padding:24px">${String(x)}</pre>`}},[e]),c=(S,x)=>{n({...e,slides:S}),x!==void 0&&r(x)},p=S=>{n({...e,slides:e.slides.map((x,j)=>j===t?S:x)})},g=()=>{n($u),r(0)},m=e.slides[Math.min(t,e.slides.length-1)];return d.jsxs("div",{className:"app",children:[d.jsx(pk,{deck:e,onChange:n,onLoadExample:g,onPresent:()=>a(!0),onGenerate:()=>l(!0)}),d.jsxs("div",{className:"workspace",children:[d.jsx("aside",{className:"panel panel-left",children:d.jsx(fk,{slides:e.slides,selected:t,onSelect:r,onChange:c})}),d.jsx("main",{className:"panel panel-center",children:d.jsx(vk,{html:s})}),d.jsx("aside",{className:"panel panel-right",children:m?d.jsx(hk,{slide:m,onChange:p}):d.jsx("p",{className:"muted",children:"No slide selected."})})]}),o&&d.jsx(bk,{html:s,slideCount:e.slides.length,onClose:()=>a(!1)}),i&&d.jsx(_k,{currentTheme:((y=e.meta)==null?void 0:y.theme)??"claude",onGenerate:S=>{n(S),r(0)},onClose:()=>l(!1)})]})}const jy=document.getElementById("root");if(!jy)throw new Error("Missing #root element");_u(jy).render(d.jsx(D.StrictMode,{children:d.jsx(Ek,{})}));export{Sy as _};
