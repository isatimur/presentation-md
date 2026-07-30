const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-rT3NUMG4.js","assets/_commonjsHelpers-Cpj98o6Y.js","assets/index-CPWM6sxn.js"])))=>i.map(i=>d[i]);
(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function t(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(o){if(o.ep)return;o.ep=!0;const a=t(o);fetch(o.href,a)}})();var pl={exports:{}},po={},fl={exports:{}},P={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var nr=Symbol.for("react.element"),Yb=Symbol.for("react.portal"),Kb=Symbol.for("react.fragment"),Jb=Symbol.for("react.strict_mode"),Xb=Symbol.for("react.profiler"),qb=Symbol.for("react.provider"),Zb=Symbol.for("react.context"),e1=Symbol.for("react.forward_ref"),n1=Symbol.for("react.suspense"),t1=Symbol.for("react.memo"),r1=Symbol.for("react.lazy"),qi=Symbol.iterator;function o1(e){return e===null||typeof e!="object"?null:(e=qi&&e[qi]||e["@@iterator"],typeof e=="function"?e:null)}var gl={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},hl=Object.assign,ml={};function ut(e,n,t){this.props=e,this.context=n,this.refs=ml,this.updater=t||gl}ut.prototype.isReactComponent={};ut.prototype.setState=function(e,n){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,n,"setState")};ut.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function yl(){}yl.prototype=ut.prototype;function Xa(e,n,t){this.props=e,this.context=n,this.refs=ml,this.updater=t||gl}var qa=Xa.prototype=new yl;qa.constructor=Xa;hl(qa,ut.prototype);qa.isPureReactComponent=!0;var Zi=Array.isArray,vl=Object.prototype.hasOwnProperty,Za={current:null},bl={key:!0,ref:!0,__self:!0,__source:!0};function xl(e,n,t){var r,o={},a=null,i=null;if(n!=null)for(r in n.ref!==void 0&&(i=n.ref),n.key!==void 0&&(a=""+n.key),n)vl.call(n,r)&&!bl.hasOwnProperty(r)&&(o[r]=n[r]);var s=arguments.length-2;if(s===1)o.children=t;else if(1<s){for(var l=Array(s),c=0;c<s;c++)l[c]=arguments[c+2];o.children=l}if(e&&e.defaultProps)for(r in s=e.defaultProps,s)o[r]===void 0&&(o[r]=s[r]);return{$$typeof:nr,type:e,key:a,ref:i,props:o,_owner:Za.current}}function a1(e,n){return{$$typeof:nr,type:e.type,key:n,ref:e.ref,props:e.props,_owner:e._owner}}function ei(e){return typeof e=="object"&&e!==null&&e.$$typeof===nr}function i1(e){var n={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(t){return n[t]})}var es=/\/+/g;function Po(e,n){return typeof e=="object"&&e!==null&&e.key!=null?i1(""+e.key):n.toString(36)}function Cr(e,n,t,r,o){var a=typeof e;(a==="undefined"||a==="boolean")&&(e=null);var i=!1;if(e===null)i=!0;else switch(a){case"string":case"number":i=!0;break;case"object":switch(e.$$typeof){case nr:case Yb:i=!0}}if(i)return i=e,o=o(i),e=r===""?"."+Po(i,0):r,Zi(o)?(t="",e!=null&&(t=e.replace(es,"$&/")+"/"),Cr(o,n,t,"",function(c){return c})):o!=null&&(ei(o)&&(o=a1(o,t+(!o.key||i&&i.key===o.key?"":(""+o.key).replace(es,"$&/")+"/")+e)),n.push(o)),1;if(i=0,r=r===""?".":r+":",Zi(e))for(var s=0;s<e.length;s++){a=e[s];var l=r+Po(a,s);i+=Cr(a,n,t,l,o)}else if(l=o1(e),typeof l=="function")for(e=l.call(e),s=0;!(a=e.next()).done;)a=a.value,l=r+Po(a,s++),i+=Cr(a,n,t,l,o);else if(a==="object")throw n=String(e),Error("Objects are not valid as a React child (found: "+(n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n)+"). If you meant to render a collection of children, use an array instead.");return i}function cr(e,n,t){if(e==null)return e;var r=[],o=0;return Cr(e,r,"","",function(a){return n.call(t,a,o++)}),r}function s1(e){if(e._status===-1){var n=e._result;n=n(),n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var ce={current:null},Fr={transition:null},l1={ReactCurrentDispatcher:ce,ReactCurrentBatchConfig:Fr,ReactCurrentOwner:Za};function kl(){throw Error("act(...) is not supported in production builds of React.")}P.Children={map:cr,forEach:function(e,n,t){cr(e,function(){n.apply(this,arguments)},t)},count:function(e){var n=0;return cr(e,function(){n++}),n},toArray:function(e){return cr(e,function(n){return n})||[]},only:function(e){if(!ei(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};P.Component=ut;P.Fragment=Kb;P.Profiler=Xb;P.PureComponent=Xa;P.StrictMode=Jb;P.Suspense=n1;P.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=l1;P.act=kl;P.cloneElement=function(e,n,t){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=hl({},e.props),o=e.key,a=e.ref,i=e._owner;if(n!=null){if(n.ref!==void 0&&(a=n.ref,i=Za.current),n.key!==void 0&&(o=""+n.key),e.type&&e.type.defaultProps)var s=e.type.defaultProps;for(l in n)vl.call(n,l)&&!bl.hasOwnProperty(l)&&(r[l]=n[l]===void 0&&s!==void 0?s[l]:n[l])}var l=arguments.length-2;if(l===1)r.children=t;else if(1<l){s=Array(l);for(var c=0;c<l;c++)s[c]=arguments[c+2];r.children=s}return{$$typeof:nr,type:e.type,key:o,ref:a,props:r,_owner:i}};P.createContext=function(e){return e={$$typeof:Zb,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:qb,_context:e},e.Consumer=e};P.createElement=xl;P.createFactory=function(e){var n=xl.bind(null,e);return n.type=e,n};P.createRef=function(){return{current:null}};P.forwardRef=function(e){return{$$typeof:e1,render:e}};P.isValidElement=ei;P.lazy=function(e){return{$$typeof:r1,_payload:{_status:-1,_result:e},_init:s1}};P.memo=function(e,n){return{$$typeof:t1,type:e,compare:n===void 0?null:n}};P.startTransition=function(e){var n=Fr.transition;Fr.transition={};try{e()}finally{Fr.transition=n}};P.unstable_act=kl;P.useCallback=function(e,n){return ce.current.useCallback(e,n)};P.useContext=function(e){return ce.current.useContext(e)};P.useDebugValue=function(){};P.useDeferredValue=function(e){return ce.current.useDeferredValue(e)};P.useEffect=function(e,n){return ce.current.useEffect(e,n)};P.useId=function(){return ce.current.useId()};P.useImperativeHandle=function(e,n,t){return ce.current.useImperativeHandle(e,n,t)};P.useInsertionEffect=function(e,n){return ce.current.useInsertionEffect(e,n)};P.useLayoutEffect=function(e,n){return ce.current.useLayoutEffect(e,n)};P.useMemo=function(e,n){return ce.current.useMemo(e,n)};P.useReducer=function(e,n,t){return ce.current.useReducer(e,n,t)};P.useRef=function(e){return ce.current.useRef(e)};P.useState=function(e){return ce.current.useState(e)};P.useSyncExternalStore=function(e,n,t){return ce.current.useSyncExternalStore(e,n,t)};P.useTransition=function(){return ce.current.useTransition()};P.version="18.3.1";fl.exports=P;var D=fl.exports;/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var c1=D,u1=Symbol.for("react.element"),d1=Symbol.for("react.fragment"),p1=Object.prototype.hasOwnProperty,f1=c1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,g1={key:!0,ref:!0,__self:!0,__source:!0};function wl(e,n,t){var r,o={},a=null,i=null;t!==void 0&&(a=""+t),n.key!==void 0&&(a=""+n.key),n.ref!==void 0&&(i=n.ref);for(r in n)p1.call(n,r)&&!g1.hasOwnProperty(r)&&(o[r]=n[r]);if(e&&e.defaultProps)for(r in n=e.defaultProps,n)o[r]===void 0&&(o[r]=n[r]);return{$$typeof:u1,type:e,key:a,ref:i,props:o,_owner:f1.current}}po.Fragment=d1;po.jsx=wl;po.jsxs=wl;pl.exports=po;var d=pl.exports,Sl={exports:{}},we={},_l={exports:{}},$l={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function n($,j){var T=$.length;$.push(j);e:for(;0<T;){var V=T-1>>>1,X=$[V];if(0<o(X,j))$[V]=j,$[T]=X,T=V;else break e}}function t($){return $.length===0?null:$[0]}function r($){if($.length===0)return null;var j=$[0],T=$.pop();if(T!==j){$[0]=T;e:for(var V=0,X=$.length,sr=X>>>1;V<sr;){var kn=2*(V+1)-1,To=$[kn],wn=kn+1,lr=$[wn];if(0>o(To,T))wn<X&&0>o(lr,To)?($[V]=lr,$[wn]=T,V=wn):($[V]=To,$[kn]=T,V=kn);else if(wn<X&&0>o(lr,T))$[V]=lr,$[wn]=T,V=wn;else break e}}return j}function o($,j){var T=$.sortIndex-j.sortIndex;return T!==0?T:$.id-j.id}if(typeof performance=="object"&&typeof performance.now=="function"){var a=performance;e.unstable_now=function(){return a.now()}}else{var i=Date,s=i.now();e.unstable_now=function(){return i.now()-s}}var l=[],c=[],p=1,g=null,m=3,v=!1,S=!1,x=!1,F=typeof setTimeout=="function"?setTimeout:null,f=typeof clearTimeout=="function"?clearTimeout:null,u=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function h($){for(var j=t(c);j!==null;){if(j.callback===null)r(c);else if(j.startTime<=$)r(c),j.sortIndex=j.expirationTime,n(l,j);else break;j=t(c)}}function b($){if(x=!1,h($),!S)if(t(l)!==null)S=!0,Fo(y);else{var j=t(c);j!==null&&jo(b,j.startTime-$)}}function y($,j){S=!1,x&&(x=!1,f(E),E=-1),v=!0;var T=m;try{for(h(j),g=t(l);g!==null&&(!(g.expirationTime>j)||$&&!Te());){var V=g.callback;if(typeof V=="function"){g.callback=null,m=g.priorityLevel;var X=V(g.expirationTime<=j);j=e.unstable_now(),typeof X=="function"?g.callback=X:g===t(l)&&r(l),h(j)}else r(l);g=t(l)}if(g!==null)var sr=!0;else{var kn=t(c);kn!==null&&jo(b,kn.startTime-j),sr=!1}return sr}finally{g=null,m=T,v=!1}}var k=!1,C=null,E=-1,H=5,M=-1;function Te(){return!(e.unstable_now()-M<H)}function gt(){if(C!==null){var $=e.unstable_now();M=$;var j=!0;try{j=C(!0,$)}finally{j?ht():(k=!1,C=null)}}else k=!1}var ht;if(typeof u=="function")ht=function(){u(gt)};else if(typeof MessageChannel<"u"){var Xi=new MessageChannel,Qb=Xi.port2;Xi.port1.onmessage=gt,ht=function(){Qb.postMessage(null)}}else ht=function(){F(gt,0)};function Fo($){C=$,k||(k=!0,ht())}function jo($,j){E=F(function(){$(e.unstable_now())},j)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function($){$.callback=null},e.unstable_continueExecution=function(){S||v||(S=!0,Fo(y))},e.unstable_forceFrameRate=function($){0>$||125<$?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):H=0<$?Math.floor(1e3/$):5},e.unstable_getCurrentPriorityLevel=function(){return m},e.unstable_getFirstCallbackNode=function(){return t(l)},e.unstable_next=function($){switch(m){case 1:case 2:case 3:var j=3;break;default:j=m}var T=m;m=j;try{return $()}finally{m=T}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function($,j){switch($){case 1:case 2:case 3:case 4:case 5:break;default:$=3}var T=m;m=$;try{return j()}finally{m=T}},e.unstable_scheduleCallback=function($,j,T){var V=e.unstable_now();switch(typeof T=="object"&&T!==null?(T=T.delay,T=typeof T=="number"&&0<T?V+T:V):T=V,$){case 1:var X=-1;break;case 2:X=250;break;case 5:X=1073741823;break;case 4:X=1e4;break;default:X=5e3}return X=T+X,$={id:p++,callback:j,priorityLevel:$,startTime:T,expirationTime:X,sortIndex:-1},T>V?($.sortIndex=T,n(c,$),t(l)===null&&$===t(c)&&(x?(f(E),E=-1):x=!0,jo(b,T-V))):($.sortIndex=X,n(l,$),S||v||(S=!0,Fo(y))),$},e.unstable_shouldYield=Te,e.unstable_wrapCallback=function($){var j=m;return function(){var T=m;m=j;try{return $.apply(this,arguments)}finally{m=T}}}})($l);_l.exports=$l;var h1=_l.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var m1=D,ke=h1;function w(e){for(var n="https://reactjs.org/docs/error-decoder.html?invariant="+e,t=1;t<arguments.length;t++)n+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var El=new Set,Bt={};function zn(e,n){tt(e,n),tt(e+"Capture",n)}function tt(e,n){for(Bt[e]=n,e=0;e<n.length;e++)El.add(n[e])}var Ke=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),oa=Object.prototype.hasOwnProperty,y1=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,ns={},ts={};function v1(e){return oa.call(ts,e)?!0:oa.call(ns,e)?!1:y1.test(e)?ts[e]=!0:(ns[e]=!0,!1)}function b1(e,n,t,r){if(t!==null&&t.type===0)return!1;switch(typeof n){case"function":case"symbol":return!0;case"boolean":return r?!1:t!==null?!t.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function x1(e,n,t,r){if(n===null||typeof n>"u"||b1(e,n,t,r))return!0;if(r)return!1;if(t!==null)switch(t.type){case 3:return!n;case 4:return n===!1;case 5:return isNaN(n);case 6:return isNaN(n)||1>n}return!1}function ue(e,n,t,r,o,a,i){this.acceptsBooleans=n===2||n===3||n===4,this.attributeName=r,this.attributeNamespace=o,this.mustUseProperty=t,this.propertyName=e,this.type=n,this.sanitizeURL=a,this.removeEmptyString=i}var te={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){te[e]=new ue(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var n=e[0];te[n]=new ue(n,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){te[e]=new ue(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){te[e]=new ue(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){te[e]=new ue(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){te[e]=new ue(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){te[e]=new ue(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){te[e]=new ue(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){te[e]=new ue(e,5,!1,e.toLowerCase(),null,!1,!1)});var ni=/[\-:]([a-z])/g;function ti(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var n=e.replace(ni,ti);te[n]=new ue(n,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var n=e.replace(ni,ti);te[n]=new ue(n,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var n=e.replace(ni,ti);te[n]=new ue(n,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){te[e]=new ue(e,1,!1,e.toLowerCase(),null,!1,!1)});te.xlinkHref=new ue("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){te[e]=new ue(e,1,!1,e.toLowerCase(),null,!0,!0)});function ri(e,n,t,r){var o=te.hasOwnProperty(n)?te[n]:null;(o!==null?o.type!==0:r||!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(x1(n,t,o,r)&&(t=null),r||o===null?v1(n)&&(t===null?e.removeAttribute(n):e.setAttribute(n,""+t)):o.mustUseProperty?e[o.propertyName]=t===null?o.type===3?!1:"":t:(n=o.attributeName,r=o.attributeNamespace,t===null?e.removeAttribute(n):(o=o.type,t=o===3||o===4&&t===!0?"":""+t,r?e.setAttributeNS(r,n,t):e.setAttribute(n,t))))}var Ze=m1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ur=Symbol.for("react.element"),Dn=Symbol.for("react.portal"),Ln=Symbol.for("react.fragment"),oi=Symbol.for("react.strict_mode"),aa=Symbol.for("react.profiler"),Cl=Symbol.for("react.provider"),Fl=Symbol.for("react.context"),ai=Symbol.for("react.forward_ref"),ia=Symbol.for("react.suspense"),sa=Symbol.for("react.suspense_list"),ii=Symbol.for("react.memo"),nn=Symbol.for("react.lazy"),jl=Symbol.for("react.offscreen"),rs=Symbol.iterator;function mt(e){return e===null||typeof e!="object"?null:(e=rs&&e[rs]||e["@@iterator"],typeof e=="function"?e:null)}var U=Object.assign,Mo;function _t(e){if(Mo===void 0)try{throw Error()}catch(t){var n=t.stack.trim().match(/\n( *(at )?)/);Mo=n&&n[1]||""}return`
`+Mo+e}var No=!1;function Io(e,n){if(!e||No)return"";No=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(n)if(n=function(){throw Error()},Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(n,[])}catch(c){var r=c}Reflect.construct(e,[],n)}else{try{n.call()}catch(c){r=c}e.call(n.prototype)}else{try{throw Error()}catch(c){r=c}e()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var o=c.stack.split(`
`),a=r.stack.split(`
`),i=o.length-1,s=a.length-1;1<=i&&0<=s&&o[i]!==a[s];)s--;for(;1<=i&&0<=s;i--,s--)if(o[i]!==a[s]){if(i!==1||s!==1)do if(i--,s--,0>s||o[i]!==a[s]){var l=`
`+o[i].replace(" at new "," at ");return e.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",e.displayName)),l}while(1<=i&&0<=s);break}}}finally{No=!1,Error.prepareStackTrace=t}return(e=e?e.displayName||e.name:"")?_t(e):""}function k1(e){switch(e.tag){case 5:return _t(e.type);case 16:return _t("Lazy");case 13:return _t("Suspense");case 19:return _t("SuspenseList");case 0:case 2:case 15:return e=Io(e.type,!1),e;case 11:return e=Io(e.type.render,!1),e;case 1:return e=Io(e.type,!0),e;default:return""}}function la(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Ln:return"Fragment";case Dn:return"Portal";case aa:return"Profiler";case oi:return"StrictMode";case ia:return"Suspense";case sa:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Fl:return(e.displayName||"Context")+".Consumer";case Cl:return(e._context.displayName||"Context")+".Provider";case ai:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case ii:return n=e.displayName||null,n!==null?n:la(e.type)||"Memo";case nn:n=e._payload,e=e._init;try{return la(e(n))}catch{}}return null}function w1(e){var n=e.type;switch(e.tag){case 24:return"Cache";case 9:return(n.displayName||"Context")+".Consumer";case 10:return(n._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=n.render,e=e.displayName||e.name||"",n.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return n;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return la(n);case 8:return n===oi?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n}return null}function mn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Tl(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function S1(e){var n=Tl(e)?"checked":"value",t=Object.getOwnPropertyDescriptor(e.constructor.prototype,n),r=""+e[n];if(!e.hasOwnProperty(n)&&typeof t<"u"&&typeof t.get=="function"&&typeof t.set=="function"){var o=t.get,a=t.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return o.call(this)},set:function(i){r=""+i,a.call(this,i)}}),Object.defineProperty(e,n,{enumerable:t.enumerable}),{getValue:function(){return r},setValue:function(i){r=""+i},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function dr(e){e._valueTracker||(e._valueTracker=S1(e))}function Pl(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var t=n.getValue(),r="";return e&&(r=Tl(e)?e.checked?"true":"false":e.value),e=r,e!==t?(n.setValue(e),!0):!1}function Ar(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function ca(e,n){var t=n.checked;return U({},n,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:t??e._wrapperState.initialChecked})}function os(e,n){var t=n.defaultValue==null?"":n.defaultValue,r=n.checked!=null?n.checked:n.defaultChecked;t=mn(n.value!=null?n.value:t),e._wrapperState={initialChecked:r,initialValue:t,controlled:n.type==="checkbox"||n.type==="radio"?n.checked!=null:n.value!=null}}function Ml(e,n){n=n.checked,n!=null&&ri(e,"checked",n,!1)}function ua(e,n){Ml(e,n);var t=mn(n.value),r=n.type;if(t!=null)r==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+t):e.value!==""+t&&(e.value=""+t);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}n.hasOwnProperty("value")?da(e,n.type,t):n.hasOwnProperty("defaultValue")&&da(e,n.type,mn(n.defaultValue)),n.checked==null&&n.defaultChecked!=null&&(e.defaultChecked=!!n.defaultChecked)}function as(e,n,t){if(n.hasOwnProperty("value")||n.hasOwnProperty("defaultValue")){var r=n.type;if(!(r!=="submit"&&r!=="reset"||n.value!==void 0&&n.value!==null))return;n=""+e._wrapperState.initialValue,t||n===e.value||(e.value=n),e.defaultValue=n}t=e.name,t!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,t!==""&&(e.name=t)}function da(e,n,t){(n!=="number"||Ar(e.ownerDocument)!==e)&&(t==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+t&&(e.defaultValue=""+t))}var $t=Array.isArray;function Jn(e,n,t,r){if(e=e.options,n){n={};for(var o=0;o<t.length;o++)n["$"+t[o]]=!0;for(t=0;t<e.length;t++)o=n.hasOwnProperty("$"+e[t].value),e[t].selected!==o&&(e[t].selected=o),o&&r&&(e[t].defaultSelected=!0)}else{for(t=""+mn(t),n=null,o=0;o<e.length;o++){if(e[o].value===t){e[o].selected=!0,r&&(e[o].defaultSelected=!0);return}n!==null||e[o].disabled||(n=e[o])}n!==null&&(n.selected=!0)}}function pa(e,n){if(n.dangerouslySetInnerHTML!=null)throw Error(w(91));return U({},n,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function is(e,n){var t=n.value;if(t==null){if(t=n.children,n=n.defaultValue,t!=null){if(n!=null)throw Error(w(92));if($t(t)){if(1<t.length)throw Error(w(93));t=t[0]}n=t}n==null&&(n=""),t=n}e._wrapperState={initialValue:mn(t)}}function Nl(e,n){var t=mn(n.value),r=mn(n.defaultValue);t!=null&&(t=""+t,t!==e.value&&(e.value=t),n.defaultValue==null&&e.defaultValue!==t&&(e.defaultValue=t)),r!=null&&(e.defaultValue=""+r)}function ss(e){var n=e.textContent;n===e._wrapperState.initialValue&&n!==""&&n!==null&&(e.value=n)}function Il(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function fa(e,n){return e==null||e==="http://www.w3.org/1999/xhtml"?Il(n):e==="http://www.w3.org/2000/svg"&&n==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var pr,zl=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(n,t,r,o){MSApp.execUnsafeLocalFunction(function(){return e(n,t,r,o)})}:e}(function(e,n){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=n;else{for(pr=pr||document.createElement("div"),pr.innerHTML="<svg>"+n.valueOf().toString()+"</svg>",n=pr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;n.firstChild;)e.appendChild(n.firstChild)}});function Dt(e,n){if(n){var t=e.firstChild;if(t&&t===e.lastChild&&t.nodeType===3){t.nodeValue=n;return}}e.textContent=n}var Ft={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},_1=["Webkit","ms","Moz","O"];Object.keys(Ft).forEach(function(e){_1.forEach(function(n){n=n+e.charAt(0).toUpperCase()+e.substring(1),Ft[n]=Ft[e]})});function Ol(e,n,t){return n==null||typeof n=="boolean"||n===""?"":t||typeof n!="number"||n===0||Ft.hasOwnProperty(e)&&Ft[e]?(""+n).trim():n+"px"}function Bl(e,n){e=e.style;for(var t in n)if(n.hasOwnProperty(t)){var r=t.indexOf("--")===0,o=Ol(t,n[t],r);t==="float"&&(t="cssFloat"),r?e.setProperty(t,o):e[t]=o}}var $1=U({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ga(e,n){if(n){if($1[e]&&(n.children!=null||n.dangerouslySetInnerHTML!=null))throw Error(w(137,e));if(n.dangerouslySetInnerHTML!=null){if(n.children!=null)throw Error(w(60));if(typeof n.dangerouslySetInnerHTML!="object"||!("__html"in n.dangerouslySetInnerHTML))throw Error(w(61))}if(n.style!=null&&typeof n.style!="object")throw Error(w(62))}}function ha(e,n){if(e.indexOf("-")===-1)return typeof n.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ma=null;function si(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var ya=null,Xn=null,qn=null;function ls(e){if(e=or(e)){if(typeof ya!="function")throw Error(w(280));var n=e.stateNode;n&&(n=yo(n),ya(e.stateNode,e.type,n))}}function Dl(e){Xn?qn?qn.push(e):qn=[e]:Xn=e}function Ll(){if(Xn){var e=Xn,n=qn;if(qn=Xn=null,ls(e),n)for(e=0;e<n.length;e++)ls(n[e])}}function Al(e,n){return e(n)}function Rl(){}var zo=!1;function Wl(e,n,t){if(zo)return e(n,t);zo=!0;try{return Al(e,n,t)}finally{zo=!1,(Xn!==null||qn!==null)&&(Rl(),Ll())}}function Lt(e,n){var t=e.stateNode;if(t===null)return null;var r=yo(t);if(r===null)return null;t=r[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(t&&typeof t!="function")throw Error(w(231,n,typeof t));return t}var va=!1;if(Ke)try{var yt={};Object.defineProperty(yt,"passive",{get:function(){va=!0}}),window.addEventListener("test",yt,yt),window.removeEventListener("test",yt,yt)}catch{va=!1}function E1(e,n,t,r,o,a,i,s,l){var c=Array.prototype.slice.call(arguments,3);try{n.apply(t,c)}catch(p){this.onError(p)}}var jt=!1,Rr=null,Wr=!1,ba=null,C1={onError:function(e){jt=!0,Rr=e}};function F1(e,n,t,r,o,a,i,s,l){jt=!1,Rr=null,E1.apply(C1,arguments)}function j1(e,n,t,r,o,a,i,s,l){if(F1.apply(this,arguments),jt){if(jt){var c=Rr;jt=!1,Rr=null}else throw Error(w(198));Wr||(Wr=!0,ba=c)}}function On(e){var n=e,t=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,n.flags&4098&&(t=n.return),e=n.return;while(e)}return n.tag===3?t:null}function Ul(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function cs(e){if(On(e)!==e)throw Error(w(188))}function T1(e){var n=e.alternate;if(!n){if(n=On(e),n===null)throw Error(w(188));return n!==e?null:e}for(var t=e,r=n;;){var o=t.return;if(o===null)break;var a=o.alternate;if(a===null){if(r=o.return,r!==null){t=r;continue}break}if(o.child===a.child){for(a=o.child;a;){if(a===t)return cs(o),e;if(a===r)return cs(o),n;a=a.sibling}throw Error(w(188))}if(t.return!==r.return)t=o,r=a;else{for(var i=!1,s=o.child;s;){if(s===t){i=!0,t=o,r=a;break}if(s===r){i=!0,r=o,t=a;break}s=s.sibling}if(!i){for(s=a.child;s;){if(s===t){i=!0,t=a,r=o;break}if(s===r){i=!0,r=a,t=o;break}s=s.sibling}if(!i)throw Error(w(189))}}if(t.alternate!==r)throw Error(w(190))}if(t.tag!==3)throw Error(w(188));return t.stateNode.current===t?e:n}function Gl(e){return e=T1(e),e!==null?Hl(e):null}function Hl(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var n=Hl(e);if(n!==null)return n;e=e.sibling}return null}var Vl=ke.unstable_scheduleCallback,us=ke.unstable_cancelCallback,P1=ke.unstable_shouldYield,M1=ke.unstable_requestPaint,Q=ke.unstable_now,N1=ke.unstable_getCurrentPriorityLevel,li=ke.unstable_ImmediatePriority,Ql=ke.unstable_UserBlockingPriority,Ur=ke.unstable_NormalPriority,I1=ke.unstable_LowPriority,Yl=ke.unstable_IdlePriority,fo=null,Re=null;function z1(e){if(Re&&typeof Re.onCommitFiberRoot=="function")try{Re.onCommitFiberRoot(fo,e,void 0,(e.current.flags&128)===128)}catch{}}var ze=Math.clz32?Math.clz32:D1,O1=Math.log,B1=Math.LN2;function D1(e){return e>>>=0,e===0?32:31-(O1(e)/B1|0)|0}var fr=64,gr=4194304;function Et(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Gr(e,n){var t=e.pendingLanes;if(t===0)return 0;var r=0,o=e.suspendedLanes,a=e.pingedLanes,i=t&268435455;if(i!==0){var s=i&~o;s!==0?r=Et(s):(a&=i,a!==0&&(r=Et(a)))}else i=t&~o,i!==0?r=Et(i):a!==0&&(r=Et(a));if(r===0)return 0;if(n!==0&&n!==r&&!(n&o)&&(o=r&-r,a=n&-n,o>=a||o===16&&(a&4194240)!==0))return n;if(r&4&&(r|=t&16),n=e.entangledLanes,n!==0)for(e=e.entanglements,n&=r;0<n;)t=31-ze(n),o=1<<t,r|=e[t],n&=~o;return r}function L1(e,n){switch(e){case 1:case 2:case 4:return n+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function A1(e,n){for(var t=e.suspendedLanes,r=e.pingedLanes,o=e.expirationTimes,a=e.pendingLanes;0<a;){var i=31-ze(a),s=1<<i,l=o[i];l===-1?(!(s&t)||s&r)&&(o[i]=L1(s,n)):l<=n&&(e.expiredLanes|=s),a&=~s}}function xa(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Kl(){var e=fr;return fr<<=1,!(fr&4194240)&&(fr=64),e}function Oo(e){for(var n=[],t=0;31>t;t++)n.push(e);return n}function tr(e,n,t){e.pendingLanes|=n,n!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,n=31-ze(n),e[n]=t}function R1(e,n){var t=e.pendingLanes&~n;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=n,e.mutableReadLanes&=n,e.entangledLanes&=n,n=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<t;){var o=31-ze(t),a=1<<o;n[o]=0,r[o]=-1,e[o]=-1,t&=~a}}function ci(e,n){var t=e.entangledLanes|=n;for(e=e.entanglements;t;){var r=31-ze(t),o=1<<r;o&n|e[r]&n&&(e[r]|=n),t&=~o}}var z=0;function Jl(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Xl,ui,ql,Zl,ec,ka=!1,hr=[],ln=null,cn=null,un=null,At=new Map,Rt=new Map,rn=[],W1="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function ds(e,n){switch(e){case"focusin":case"focusout":ln=null;break;case"dragenter":case"dragleave":cn=null;break;case"mouseover":case"mouseout":un=null;break;case"pointerover":case"pointerout":At.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":Rt.delete(n.pointerId)}}function vt(e,n,t,r,o,a){return e===null||e.nativeEvent!==a?(e={blockedOn:n,domEventName:t,eventSystemFlags:r,nativeEvent:a,targetContainers:[o]},n!==null&&(n=or(n),n!==null&&ui(n)),e):(e.eventSystemFlags|=r,n=e.targetContainers,o!==null&&n.indexOf(o)===-1&&n.push(o),e)}function U1(e,n,t,r,o){switch(n){case"focusin":return ln=vt(ln,e,n,t,r,o),!0;case"dragenter":return cn=vt(cn,e,n,t,r,o),!0;case"mouseover":return un=vt(un,e,n,t,r,o),!0;case"pointerover":var a=o.pointerId;return At.set(a,vt(At.get(a)||null,e,n,t,r,o)),!0;case"gotpointercapture":return a=o.pointerId,Rt.set(a,vt(Rt.get(a)||null,e,n,t,r,o)),!0}return!1}function nc(e){var n=$n(e.target);if(n!==null){var t=On(n);if(t!==null){if(n=t.tag,n===13){if(n=Ul(t),n!==null){e.blockedOn=n,ec(e.priority,function(){ql(t)});return}}else if(n===3&&t.stateNode.current.memoizedState.isDehydrated){e.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}e.blockedOn=null}function jr(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var t=wa(e.domEventName,e.eventSystemFlags,n[0],e.nativeEvent);if(t===null){t=e.nativeEvent;var r=new t.constructor(t.type,t);ma=r,t.target.dispatchEvent(r),ma=null}else return n=or(t),n!==null&&ui(n),e.blockedOn=t,!1;n.shift()}return!0}function ps(e,n,t){jr(e)&&t.delete(n)}function G1(){ka=!1,ln!==null&&jr(ln)&&(ln=null),cn!==null&&jr(cn)&&(cn=null),un!==null&&jr(un)&&(un=null),At.forEach(ps),Rt.forEach(ps)}function bt(e,n){e.blockedOn===n&&(e.blockedOn=null,ka||(ka=!0,ke.unstable_scheduleCallback(ke.unstable_NormalPriority,G1)))}function Wt(e){function n(o){return bt(o,e)}if(0<hr.length){bt(hr[0],e);for(var t=1;t<hr.length;t++){var r=hr[t];r.blockedOn===e&&(r.blockedOn=null)}}for(ln!==null&&bt(ln,e),cn!==null&&bt(cn,e),un!==null&&bt(un,e),At.forEach(n),Rt.forEach(n),t=0;t<rn.length;t++)r=rn[t],r.blockedOn===e&&(r.blockedOn=null);for(;0<rn.length&&(t=rn[0],t.blockedOn===null);)nc(t),t.blockedOn===null&&rn.shift()}var Zn=Ze.ReactCurrentBatchConfig,Hr=!0;function H1(e,n,t,r){var o=z,a=Zn.transition;Zn.transition=null;try{z=1,di(e,n,t,r)}finally{z=o,Zn.transition=a}}function V1(e,n,t,r){var o=z,a=Zn.transition;Zn.transition=null;try{z=4,di(e,n,t,r)}finally{z=o,Zn.transition=a}}function di(e,n,t,r){if(Hr){var o=wa(e,n,t,r);if(o===null)Vo(e,n,r,Vr,t),ds(e,r);else if(U1(o,e,n,t,r))r.stopPropagation();else if(ds(e,r),n&4&&-1<W1.indexOf(e)){for(;o!==null;){var a=or(o);if(a!==null&&Xl(a),a=wa(e,n,t,r),a===null&&Vo(e,n,r,Vr,t),a===o)break;o=a}o!==null&&r.stopPropagation()}else Vo(e,n,r,null,t)}}var Vr=null;function wa(e,n,t,r){if(Vr=null,e=si(r),e=$n(e),e!==null)if(n=On(e),n===null)e=null;else if(t=n.tag,t===13){if(e=Ul(n),e!==null)return e;e=null}else if(t===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null);return Vr=e,null}function tc(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(N1()){case li:return 1;case Ql:return 4;case Ur:case I1:return 16;case Yl:return 536870912;default:return 16}default:return 16}}var an=null,pi=null,Tr=null;function rc(){if(Tr)return Tr;var e,n=pi,t=n.length,r,o="value"in an?an.value:an.textContent,a=o.length;for(e=0;e<t&&n[e]===o[e];e++);var i=t-e;for(r=1;r<=i&&n[t-r]===o[a-r];r++);return Tr=o.slice(e,1<r?1-r:void 0)}function Pr(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function mr(){return!0}function fs(){return!1}function Se(e){function n(t,r,o,a,i){this._reactName=t,this._targetInst=o,this.type=r,this.nativeEvent=a,this.target=i,this.currentTarget=null;for(var s in e)e.hasOwnProperty(s)&&(t=e[s],this[s]=t?t(a):a[s]);return this.isDefaultPrevented=(a.defaultPrevented!=null?a.defaultPrevented:a.returnValue===!1)?mr:fs,this.isPropagationStopped=fs,this}return U(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=mr)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=mr)},persist:function(){},isPersistent:mr}),n}var dt={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},fi=Se(dt),rr=U({},dt,{view:0,detail:0}),Q1=Se(rr),Bo,Do,xt,go=U({},rr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:gi,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==xt&&(xt&&e.type==="mousemove"?(Bo=e.screenX-xt.screenX,Do=e.screenY-xt.screenY):Do=Bo=0,xt=e),Bo)},movementY:function(e){return"movementY"in e?e.movementY:Do}}),gs=Se(go),Y1=U({},go,{dataTransfer:0}),K1=Se(Y1),J1=U({},rr,{relatedTarget:0}),Lo=Se(J1),X1=U({},dt,{animationName:0,elapsedTime:0,pseudoElement:0}),q1=Se(X1),Z1=U({},dt,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),ex=Se(Z1),nx=U({},dt,{data:0}),hs=Se(nx),tx={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},rx={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},ox={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function ax(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=ox[e])?!!n[e]:!1}function gi(){return ax}var ix=U({},rr,{key:function(e){if(e.key){var n=tx[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=Pr(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?rx[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:gi,charCode:function(e){return e.type==="keypress"?Pr(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Pr(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),sx=Se(ix),lx=U({},go,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),ms=Se(lx),cx=U({},rr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:gi}),ux=Se(cx),dx=U({},dt,{propertyName:0,elapsedTime:0,pseudoElement:0}),px=Se(dx),fx=U({},go,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),gx=Se(fx),hx=[9,13,27,32],hi=Ke&&"CompositionEvent"in window,Tt=null;Ke&&"documentMode"in document&&(Tt=document.documentMode);var mx=Ke&&"TextEvent"in window&&!Tt,oc=Ke&&(!hi||Tt&&8<Tt&&11>=Tt),ys=" ",vs=!1;function ac(e,n){switch(e){case"keyup":return hx.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function ic(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var An=!1;function yx(e,n){switch(e){case"compositionend":return ic(n);case"keypress":return n.which!==32?null:(vs=!0,ys);case"textInput":return e=n.data,e===ys&&vs?null:e;default:return null}}function vx(e,n){if(An)return e==="compositionend"||!hi&&ac(e,n)?(e=rc(),Tr=pi=an=null,An=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return oc&&n.locale!=="ko"?null:n.data;default:return null}}var bx={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function bs(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!bx[e.type]:n==="textarea"}function sc(e,n,t,r){Dl(r),n=Qr(n,"onChange"),0<n.length&&(t=new fi("onChange","change",null,t,r),e.push({event:t,listeners:n}))}var Pt=null,Ut=null;function xx(e){vc(e,0)}function ho(e){var n=Un(e);if(Pl(n))return e}function kx(e,n){if(e==="change")return n}var lc=!1;if(Ke){var Ao;if(Ke){var Ro="oninput"in document;if(!Ro){var xs=document.createElement("div");xs.setAttribute("oninput","return;"),Ro=typeof xs.oninput=="function"}Ao=Ro}else Ao=!1;lc=Ao&&(!document.documentMode||9<document.documentMode)}function ks(){Pt&&(Pt.detachEvent("onpropertychange",cc),Ut=Pt=null)}function cc(e){if(e.propertyName==="value"&&ho(Ut)){var n=[];sc(n,Ut,e,si(e)),Wl(xx,n)}}function wx(e,n,t){e==="focusin"?(ks(),Pt=n,Ut=t,Pt.attachEvent("onpropertychange",cc)):e==="focusout"&&ks()}function Sx(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return ho(Ut)}function _x(e,n){if(e==="click")return ho(n)}function $x(e,n){if(e==="input"||e==="change")return ho(n)}function Ex(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var Be=typeof Object.is=="function"?Object.is:Ex;function Gt(e,n){if(Be(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var t=Object.keys(e),r=Object.keys(n);if(t.length!==r.length)return!1;for(r=0;r<t.length;r++){var o=t[r];if(!oa.call(n,o)||!Be(e[o],n[o]))return!1}return!0}function ws(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Ss(e,n){var t=ws(e);e=0;for(var r;t;){if(t.nodeType===3){if(r=e+t.textContent.length,e<=n&&r>=n)return{node:t,offset:n-e};e=r}e:{for(;t;){if(t.nextSibling){t=t.nextSibling;break e}t=t.parentNode}t=void 0}t=ws(t)}}function uc(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?uc(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function dc(){for(var e=window,n=Ar();n instanceof e.HTMLIFrameElement;){try{var t=typeof n.contentWindow.location.href=="string"}catch{t=!1}if(t)e=n.contentWindow;else break;n=Ar(e.document)}return n}function mi(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}function Cx(e){var n=dc(),t=e.focusedElem,r=e.selectionRange;if(n!==t&&t&&t.ownerDocument&&uc(t.ownerDocument.documentElement,t)){if(r!==null&&mi(t)){if(n=r.start,e=r.end,e===void 0&&(e=n),"selectionStart"in t)t.selectionStart=n,t.selectionEnd=Math.min(e,t.value.length);else if(e=(n=t.ownerDocument||document)&&n.defaultView||window,e.getSelection){e=e.getSelection();var o=t.textContent.length,a=Math.min(r.start,o);r=r.end===void 0?a:Math.min(r.end,o),!e.extend&&a>r&&(o=r,r=a,a=o),o=Ss(t,a);var i=Ss(t,r);o&&i&&(e.rangeCount!==1||e.anchorNode!==o.node||e.anchorOffset!==o.offset||e.focusNode!==i.node||e.focusOffset!==i.offset)&&(n=n.createRange(),n.setStart(o.node,o.offset),e.removeAllRanges(),a>r?(e.addRange(n),e.extend(i.node,i.offset)):(n.setEnd(i.node,i.offset),e.addRange(n)))}}for(n=[],e=t;e=e.parentNode;)e.nodeType===1&&n.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof t.focus=="function"&&t.focus(),t=0;t<n.length;t++)e=n[t],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Fx=Ke&&"documentMode"in document&&11>=document.documentMode,Rn=null,Sa=null,Mt=null,_a=!1;function _s(e,n,t){var r=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;_a||Rn==null||Rn!==Ar(r)||(r=Rn,"selectionStart"in r&&mi(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Mt&&Gt(Mt,r)||(Mt=r,r=Qr(Sa,"onSelect"),0<r.length&&(n=new fi("onSelect","select",null,n,t),e.push({event:n,listeners:r}),n.target=Rn)))}function yr(e,n){var t={};return t[e.toLowerCase()]=n.toLowerCase(),t["Webkit"+e]="webkit"+n,t["Moz"+e]="moz"+n,t}var Wn={animationend:yr("Animation","AnimationEnd"),animationiteration:yr("Animation","AnimationIteration"),animationstart:yr("Animation","AnimationStart"),transitionend:yr("Transition","TransitionEnd")},Wo={},pc={};Ke&&(pc=document.createElement("div").style,"AnimationEvent"in window||(delete Wn.animationend.animation,delete Wn.animationiteration.animation,delete Wn.animationstart.animation),"TransitionEvent"in window||delete Wn.transitionend.transition);function mo(e){if(Wo[e])return Wo[e];if(!Wn[e])return e;var n=Wn[e],t;for(t in n)if(n.hasOwnProperty(t)&&t in pc)return Wo[e]=n[t];return e}var fc=mo("animationend"),gc=mo("animationiteration"),hc=mo("animationstart"),mc=mo("transitionend"),yc=new Map,$s="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function vn(e,n){yc.set(e,n),zn(n,[e])}for(var Uo=0;Uo<$s.length;Uo++){var Go=$s[Uo],jx=Go.toLowerCase(),Tx=Go[0].toUpperCase()+Go.slice(1);vn(jx,"on"+Tx)}vn(fc,"onAnimationEnd");vn(gc,"onAnimationIteration");vn(hc,"onAnimationStart");vn("dblclick","onDoubleClick");vn("focusin","onFocus");vn("focusout","onBlur");vn(mc,"onTransitionEnd");tt("onMouseEnter",["mouseout","mouseover"]);tt("onMouseLeave",["mouseout","mouseover"]);tt("onPointerEnter",["pointerout","pointerover"]);tt("onPointerLeave",["pointerout","pointerover"]);zn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));zn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));zn("onBeforeInput",["compositionend","keypress","textInput","paste"]);zn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));zn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));zn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ct="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Px=new Set("cancel close invalid load scroll toggle".split(" ").concat(Ct));function Es(e,n,t){var r=e.type||"unknown-event";e.currentTarget=t,j1(r,n,void 0,e),e.currentTarget=null}function vc(e,n){n=(n&4)!==0;for(var t=0;t<e.length;t++){var r=e[t],o=r.event;r=r.listeners;e:{var a=void 0;if(n)for(var i=r.length-1;0<=i;i--){var s=r[i],l=s.instance,c=s.currentTarget;if(s=s.listener,l!==a&&o.isPropagationStopped())break e;Es(o,s,c),a=l}else for(i=0;i<r.length;i++){if(s=r[i],l=s.instance,c=s.currentTarget,s=s.listener,l!==a&&o.isPropagationStopped())break e;Es(o,s,c),a=l}}}if(Wr)throw e=ba,Wr=!1,ba=null,e}function B(e,n){var t=n[ja];t===void 0&&(t=n[ja]=new Set);var r=e+"__bubble";t.has(r)||(bc(n,e,2,!1),t.add(r))}function Ho(e,n,t){var r=0;n&&(r|=4),bc(t,e,r,n)}var vr="_reactListening"+Math.random().toString(36).slice(2);function Ht(e){if(!e[vr]){e[vr]=!0,El.forEach(function(t){t!=="selectionchange"&&(Px.has(t)||Ho(t,!1,e),Ho(t,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[vr]||(n[vr]=!0,Ho("selectionchange",!1,n))}}function bc(e,n,t,r){switch(tc(n)){case 1:var o=H1;break;case 4:o=V1;break;default:o=di}t=o.bind(null,n,t,e),o=void 0,!va||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(o=!0),r?o!==void 0?e.addEventListener(n,t,{capture:!0,passive:o}):e.addEventListener(n,t,!0):o!==void 0?e.addEventListener(n,t,{passive:o}):e.addEventListener(n,t,!1)}function Vo(e,n,t,r,o){var a=r;if(!(n&1)&&!(n&2)&&r!==null)e:for(;;){if(r===null)return;var i=r.tag;if(i===3||i===4){var s=r.stateNode.containerInfo;if(s===o||s.nodeType===8&&s.parentNode===o)break;if(i===4)for(i=r.return;i!==null;){var l=i.tag;if((l===3||l===4)&&(l=i.stateNode.containerInfo,l===o||l.nodeType===8&&l.parentNode===o))return;i=i.return}for(;s!==null;){if(i=$n(s),i===null)return;if(l=i.tag,l===5||l===6){r=a=i;continue e}s=s.parentNode}}r=r.return}Wl(function(){var c=a,p=si(t),g=[];e:{var m=yc.get(e);if(m!==void 0){var v=fi,S=e;switch(e){case"keypress":if(Pr(t)===0)break e;case"keydown":case"keyup":v=sx;break;case"focusin":S="focus",v=Lo;break;case"focusout":S="blur",v=Lo;break;case"beforeblur":case"afterblur":v=Lo;break;case"click":if(t.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":v=gs;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":v=K1;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":v=ux;break;case fc:case gc:case hc:v=q1;break;case mc:v=px;break;case"scroll":v=Q1;break;case"wheel":v=gx;break;case"copy":case"cut":case"paste":v=ex;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":v=ms}var x=(n&4)!==0,F=!x&&e==="scroll",f=x?m!==null?m+"Capture":null:m;x=[];for(var u=c,h;u!==null;){h=u;var b=h.stateNode;if(h.tag===5&&b!==null&&(h=b,f!==null&&(b=Lt(u,f),b!=null&&x.push(Vt(u,b,h)))),F)break;u=u.return}0<x.length&&(m=new v(m,S,null,t,p),g.push({event:m,listeners:x}))}}if(!(n&7)){e:{if(m=e==="mouseover"||e==="pointerover",v=e==="mouseout"||e==="pointerout",m&&t!==ma&&(S=t.relatedTarget||t.fromElement)&&($n(S)||S[Je]))break e;if((v||m)&&(m=p.window===p?p:(m=p.ownerDocument)?m.defaultView||m.parentWindow:window,v?(S=t.relatedTarget||t.toElement,v=c,S=S?$n(S):null,S!==null&&(F=On(S),S!==F||S.tag!==5&&S.tag!==6)&&(S=null)):(v=null,S=c),v!==S)){if(x=gs,b="onMouseLeave",f="onMouseEnter",u="mouse",(e==="pointerout"||e==="pointerover")&&(x=ms,b="onPointerLeave",f="onPointerEnter",u="pointer"),F=v==null?m:Un(v),h=S==null?m:Un(S),m=new x(b,u+"leave",v,t,p),m.target=F,m.relatedTarget=h,b=null,$n(p)===c&&(x=new x(f,u+"enter",S,t,p),x.target=h,x.relatedTarget=F,b=x),F=b,v&&S)n:{for(x=v,f=S,u=0,h=x;h;h=Bn(h))u++;for(h=0,b=f;b;b=Bn(b))h++;for(;0<u-h;)x=Bn(x),u--;for(;0<h-u;)f=Bn(f),h--;for(;u--;){if(x===f||f!==null&&x===f.alternate)break n;x=Bn(x),f=Bn(f)}x=null}else x=null;v!==null&&Cs(g,m,v,x,!1),S!==null&&F!==null&&Cs(g,F,S,x,!0)}}e:{if(m=c?Un(c):window,v=m.nodeName&&m.nodeName.toLowerCase(),v==="select"||v==="input"&&m.type==="file")var y=kx;else if(bs(m))if(lc)y=$x;else{y=Sx;var k=wx}else(v=m.nodeName)&&v.toLowerCase()==="input"&&(m.type==="checkbox"||m.type==="radio")&&(y=_x);if(y&&(y=y(e,c))){sc(g,y,t,p);break e}k&&k(e,m,c),e==="focusout"&&(k=m._wrapperState)&&k.controlled&&m.type==="number"&&da(m,"number",m.value)}switch(k=c?Un(c):window,e){case"focusin":(bs(k)||k.contentEditable==="true")&&(Rn=k,Sa=c,Mt=null);break;case"focusout":Mt=Sa=Rn=null;break;case"mousedown":_a=!0;break;case"contextmenu":case"mouseup":case"dragend":_a=!1,_s(g,t,p);break;case"selectionchange":if(Fx)break;case"keydown":case"keyup":_s(g,t,p)}var C;if(hi)e:{switch(e){case"compositionstart":var E="onCompositionStart";break e;case"compositionend":E="onCompositionEnd";break e;case"compositionupdate":E="onCompositionUpdate";break e}E=void 0}else An?ac(e,t)&&(E="onCompositionEnd"):e==="keydown"&&t.keyCode===229&&(E="onCompositionStart");E&&(oc&&t.locale!=="ko"&&(An||E!=="onCompositionStart"?E==="onCompositionEnd"&&An&&(C=rc()):(an=p,pi="value"in an?an.value:an.textContent,An=!0)),k=Qr(c,E),0<k.length&&(E=new hs(E,e,null,t,p),g.push({event:E,listeners:k}),C?E.data=C:(C=ic(t),C!==null&&(E.data=C)))),(C=mx?yx(e,t):vx(e,t))&&(c=Qr(c,"onBeforeInput"),0<c.length&&(p=new hs("onBeforeInput","beforeinput",null,t,p),g.push({event:p,listeners:c}),p.data=C))}vc(g,n)})}function Vt(e,n,t){return{instance:e,listener:n,currentTarget:t}}function Qr(e,n){for(var t=n+"Capture",r=[];e!==null;){var o=e,a=o.stateNode;o.tag===5&&a!==null&&(o=a,a=Lt(e,t),a!=null&&r.unshift(Vt(e,a,o)),a=Lt(e,n),a!=null&&r.push(Vt(e,a,o))),e=e.return}return r}function Bn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Cs(e,n,t,r,o){for(var a=n._reactName,i=[];t!==null&&t!==r;){var s=t,l=s.alternate,c=s.stateNode;if(l!==null&&l===r)break;s.tag===5&&c!==null&&(s=c,o?(l=Lt(t,a),l!=null&&i.unshift(Vt(t,l,s))):o||(l=Lt(t,a),l!=null&&i.push(Vt(t,l,s)))),t=t.return}i.length!==0&&e.push({event:n,listeners:i})}var Mx=/\r\n?/g,Nx=/\u0000|\uFFFD/g;function Fs(e){return(typeof e=="string"?e:""+e).replace(Mx,`
`).replace(Nx,"")}function br(e,n,t){if(n=Fs(n),Fs(e)!==n&&t)throw Error(w(425))}function Yr(){}var $a=null,Ea=null;function Ca(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var Fa=typeof setTimeout=="function"?setTimeout:void 0,Ix=typeof clearTimeout=="function"?clearTimeout:void 0,js=typeof Promise=="function"?Promise:void 0,zx=typeof queueMicrotask=="function"?queueMicrotask:typeof js<"u"?function(e){return js.resolve(null).then(e).catch(Ox)}:Fa;function Ox(e){setTimeout(function(){throw e})}function Qo(e,n){var t=n,r=0;do{var o=t.nextSibling;if(e.removeChild(t),o&&o.nodeType===8)if(t=o.data,t==="/$"){if(r===0){e.removeChild(o),Wt(n);return}r--}else t!=="$"&&t!=="$?"&&t!=="$!"||r++;t=o}while(t);Wt(n)}function dn(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?")break;if(n==="/$")return null}}return e}function Ts(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="$"||t==="$!"||t==="$?"){if(n===0)return e;n--}else t==="/$"&&n++}e=e.previousSibling}return null}var pt=Math.random().toString(36).slice(2),Ae="__reactFiber$"+pt,Qt="__reactProps$"+pt,Je="__reactContainer$"+pt,ja="__reactEvents$"+pt,Bx="__reactListeners$"+pt,Dx="__reactHandles$"+pt;function $n(e){var n=e[Ae];if(n)return n;for(var t=e.parentNode;t;){if(n=t[Je]||t[Ae]){if(t=n.alternate,n.child!==null||t!==null&&t.child!==null)for(e=Ts(e);e!==null;){if(t=e[Ae])return t;e=Ts(e)}return n}e=t,t=e.parentNode}return null}function or(e){return e=e[Ae]||e[Je],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Un(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(w(33))}function yo(e){return e[Qt]||null}var Ta=[],Gn=-1;function bn(e){return{current:e}}function L(e){0>Gn||(e.current=Ta[Gn],Ta[Gn]=null,Gn--)}function O(e,n){Gn++,Ta[Gn]=e.current,e.current=n}var yn={},ie=bn(yn),ge=bn(!1),Tn=yn;function rt(e,n){var t=e.type.contextTypes;if(!t)return yn;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===n)return r.__reactInternalMemoizedMaskedChildContext;var o={},a;for(a in t)o[a]=n[a];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=n,e.__reactInternalMemoizedMaskedChildContext=o),o}function he(e){return e=e.childContextTypes,e!=null}function Kr(){L(ge),L(ie)}function Ps(e,n,t){if(ie.current!==yn)throw Error(w(168));O(ie,n),O(ge,t)}function xc(e,n,t){var r=e.stateNode;if(n=n.childContextTypes,typeof r.getChildContext!="function")return t;r=r.getChildContext();for(var o in r)if(!(o in n))throw Error(w(108,w1(e)||"Unknown",o));return U({},t,r)}function Jr(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||yn,Tn=ie.current,O(ie,e),O(ge,ge.current),!0}function Ms(e,n,t){var r=e.stateNode;if(!r)throw Error(w(169));t?(e=xc(e,n,Tn),r.__reactInternalMemoizedMergedChildContext=e,L(ge),L(ie),O(ie,e)):L(ge),O(ge,t)}var He=null,vo=!1,Yo=!1;function kc(e){He===null?He=[e]:He.push(e)}function Lx(e){vo=!0,kc(e)}function xn(){if(!Yo&&He!==null){Yo=!0;var e=0,n=z;try{var t=He;for(z=1;e<t.length;e++){var r=t[e];do r=r(!0);while(r!==null)}He=null,vo=!1}catch(o){throw He!==null&&(He=He.slice(e+1)),Vl(li,xn),o}finally{z=n,Yo=!1}}return null}var Hn=[],Vn=0,Xr=null,qr=0,_e=[],$e=0,Pn=null,Ve=1,Qe="";function Sn(e,n){Hn[Vn++]=qr,Hn[Vn++]=Xr,Xr=e,qr=n}function wc(e,n,t){_e[$e++]=Ve,_e[$e++]=Qe,_e[$e++]=Pn,Pn=e;var r=Ve;e=Qe;var o=32-ze(r)-1;r&=~(1<<o),t+=1;var a=32-ze(n)+o;if(30<a){var i=o-o%5;a=(r&(1<<i)-1).toString(32),r>>=i,o-=i,Ve=1<<32-ze(n)+o|t<<o|r,Qe=a+e}else Ve=1<<a|t<<o|r,Qe=e}function yi(e){e.return!==null&&(Sn(e,1),wc(e,1,0))}function vi(e){for(;e===Xr;)Xr=Hn[--Vn],Hn[Vn]=null,qr=Hn[--Vn],Hn[Vn]=null;for(;e===Pn;)Pn=_e[--$e],_e[$e]=null,Qe=_e[--$e],_e[$e]=null,Ve=_e[--$e],_e[$e]=null}var xe=null,be=null,A=!1,Ie=null;function Sc(e,n){var t=Ee(5,null,null,0);t.elementType="DELETED",t.stateNode=n,t.return=e,n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)}function Ns(e,n){switch(e.tag){case 5:var t=e.type;return n=n.nodeType!==1||t.toLowerCase()!==n.nodeName.toLowerCase()?null:n,n!==null?(e.stateNode=n,xe=e,be=dn(n.firstChild),!0):!1;case 6:return n=e.pendingProps===""||n.nodeType!==3?null:n,n!==null?(e.stateNode=n,xe=e,be=null,!0):!1;case 13:return n=n.nodeType!==8?null:n,n!==null?(t=Pn!==null?{id:Ve,overflow:Qe}:null,e.memoizedState={dehydrated:n,treeContext:t,retryLane:1073741824},t=Ee(18,null,null,0),t.stateNode=n,t.return=e,e.child=t,xe=e,be=null,!0):!1;default:return!1}}function Pa(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Ma(e){if(A){var n=be;if(n){var t=n;if(!Ns(e,n)){if(Pa(e))throw Error(w(418));n=dn(t.nextSibling);var r=xe;n&&Ns(e,n)?Sc(r,t):(e.flags=e.flags&-4097|2,A=!1,xe=e)}}else{if(Pa(e))throw Error(w(418));e.flags=e.flags&-4097|2,A=!1,xe=e}}}function Is(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;xe=e}function xr(e){if(e!==xe)return!1;if(!A)return Is(e),A=!0,!1;var n;if((n=e.tag!==3)&&!(n=e.tag!==5)&&(n=e.type,n=n!=="head"&&n!=="body"&&!Ca(e.type,e.memoizedProps)),n&&(n=be)){if(Pa(e))throw _c(),Error(w(418));for(;n;)Sc(e,n),n=dn(n.nextSibling)}if(Is(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(w(317));e:{for(e=e.nextSibling,n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="/$"){if(n===0){be=dn(e.nextSibling);break e}n--}else t!=="$"&&t!=="$!"&&t!=="$?"||n++}e=e.nextSibling}be=null}}else be=xe?dn(e.stateNode.nextSibling):null;return!0}function _c(){for(var e=be;e;)e=dn(e.nextSibling)}function ot(){be=xe=null,A=!1}function bi(e){Ie===null?Ie=[e]:Ie.push(e)}var Ax=Ze.ReactCurrentBatchConfig;function kt(e,n,t){if(e=t.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(t._owner){if(t=t._owner,t){if(t.tag!==1)throw Error(w(309));var r=t.stateNode}if(!r)throw Error(w(147,e));var o=r,a=""+e;return n!==null&&n.ref!==null&&typeof n.ref=="function"&&n.ref._stringRef===a?n.ref:(n=function(i){var s=o.refs;i===null?delete s[a]:s[a]=i},n._stringRef=a,n)}if(typeof e!="string")throw Error(w(284));if(!t._owner)throw Error(w(290,e))}return e}function kr(e,n){throw e=Object.prototype.toString.call(n),Error(w(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e))}function zs(e){var n=e._init;return n(e._payload)}function $c(e){function n(f,u){if(e){var h=f.deletions;h===null?(f.deletions=[u],f.flags|=16):h.push(u)}}function t(f,u){if(!e)return null;for(;u!==null;)n(f,u),u=u.sibling;return null}function r(f,u){for(f=new Map;u!==null;)u.key!==null?f.set(u.key,u):f.set(u.index,u),u=u.sibling;return f}function o(f,u){return f=hn(f,u),f.index=0,f.sibling=null,f}function a(f,u,h){return f.index=h,e?(h=f.alternate,h!==null?(h=h.index,h<u?(f.flags|=2,u):h):(f.flags|=2,u)):(f.flags|=1048576,u)}function i(f){return e&&f.alternate===null&&(f.flags|=2),f}function s(f,u,h,b){return u===null||u.tag!==6?(u=na(h,f.mode,b),u.return=f,u):(u=o(u,h),u.return=f,u)}function l(f,u,h,b){var y=h.type;return y===Ln?p(f,u,h.props.children,b,h.key):u!==null&&(u.elementType===y||typeof y=="object"&&y!==null&&y.$$typeof===nn&&zs(y)===u.type)?(b=o(u,h.props),b.ref=kt(f,u,h),b.return=f,b):(b=Dr(h.type,h.key,h.props,null,f.mode,b),b.ref=kt(f,u,h),b.return=f,b)}function c(f,u,h,b){return u===null||u.tag!==4||u.stateNode.containerInfo!==h.containerInfo||u.stateNode.implementation!==h.implementation?(u=ta(h,f.mode,b),u.return=f,u):(u=o(u,h.children||[]),u.return=f,u)}function p(f,u,h,b,y){return u===null||u.tag!==7?(u=jn(h,f.mode,b,y),u.return=f,u):(u=o(u,h),u.return=f,u)}function g(f,u,h){if(typeof u=="string"&&u!==""||typeof u=="number")return u=na(""+u,f.mode,h),u.return=f,u;if(typeof u=="object"&&u!==null){switch(u.$$typeof){case ur:return h=Dr(u.type,u.key,u.props,null,f.mode,h),h.ref=kt(f,null,u),h.return=f,h;case Dn:return u=ta(u,f.mode,h),u.return=f,u;case nn:var b=u._init;return g(f,b(u._payload),h)}if($t(u)||mt(u))return u=jn(u,f.mode,h,null),u.return=f,u;kr(f,u)}return null}function m(f,u,h,b){var y=u!==null?u.key:null;if(typeof h=="string"&&h!==""||typeof h=="number")return y!==null?null:s(f,u,""+h,b);if(typeof h=="object"&&h!==null){switch(h.$$typeof){case ur:return h.key===y?l(f,u,h,b):null;case Dn:return h.key===y?c(f,u,h,b):null;case nn:return y=h._init,m(f,u,y(h._payload),b)}if($t(h)||mt(h))return y!==null?null:p(f,u,h,b,null);kr(f,h)}return null}function v(f,u,h,b,y){if(typeof b=="string"&&b!==""||typeof b=="number")return f=f.get(h)||null,s(u,f,""+b,y);if(typeof b=="object"&&b!==null){switch(b.$$typeof){case ur:return f=f.get(b.key===null?h:b.key)||null,l(u,f,b,y);case Dn:return f=f.get(b.key===null?h:b.key)||null,c(u,f,b,y);case nn:var k=b._init;return v(f,u,h,k(b._payload),y)}if($t(b)||mt(b))return f=f.get(h)||null,p(u,f,b,y,null);kr(u,b)}return null}function S(f,u,h,b){for(var y=null,k=null,C=u,E=u=0,H=null;C!==null&&E<h.length;E++){C.index>E?(H=C,C=null):H=C.sibling;var M=m(f,C,h[E],b);if(M===null){C===null&&(C=H);break}e&&C&&M.alternate===null&&n(f,C),u=a(M,u,E),k===null?y=M:k.sibling=M,k=M,C=H}if(E===h.length)return t(f,C),A&&Sn(f,E),y;if(C===null){for(;E<h.length;E++)C=g(f,h[E],b),C!==null&&(u=a(C,u,E),k===null?y=C:k.sibling=C,k=C);return A&&Sn(f,E),y}for(C=r(f,C);E<h.length;E++)H=v(C,f,E,h[E],b),H!==null&&(e&&H.alternate!==null&&C.delete(H.key===null?E:H.key),u=a(H,u,E),k===null?y=H:k.sibling=H,k=H);return e&&C.forEach(function(Te){return n(f,Te)}),A&&Sn(f,E),y}function x(f,u,h,b){var y=mt(h);if(typeof y!="function")throw Error(w(150));if(h=y.call(h),h==null)throw Error(w(151));for(var k=y=null,C=u,E=u=0,H=null,M=h.next();C!==null&&!M.done;E++,M=h.next()){C.index>E?(H=C,C=null):H=C.sibling;var Te=m(f,C,M.value,b);if(Te===null){C===null&&(C=H);break}e&&C&&Te.alternate===null&&n(f,C),u=a(Te,u,E),k===null?y=Te:k.sibling=Te,k=Te,C=H}if(M.done)return t(f,C),A&&Sn(f,E),y;if(C===null){for(;!M.done;E++,M=h.next())M=g(f,M.value,b),M!==null&&(u=a(M,u,E),k===null?y=M:k.sibling=M,k=M);return A&&Sn(f,E),y}for(C=r(f,C);!M.done;E++,M=h.next())M=v(C,f,E,M.value,b),M!==null&&(e&&M.alternate!==null&&C.delete(M.key===null?E:M.key),u=a(M,u,E),k===null?y=M:k.sibling=M,k=M);return e&&C.forEach(function(gt){return n(f,gt)}),A&&Sn(f,E),y}function F(f,u,h,b){if(typeof h=="object"&&h!==null&&h.type===Ln&&h.key===null&&(h=h.props.children),typeof h=="object"&&h!==null){switch(h.$$typeof){case ur:e:{for(var y=h.key,k=u;k!==null;){if(k.key===y){if(y=h.type,y===Ln){if(k.tag===7){t(f,k.sibling),u=o(k,h.props.children),u.return=f,f=u;break e}}else if(k.elementType===y||typeof y=="object"&&y!==null&&y.$$typeof===nn&&zs(y)===k.type){t(f,k.sibling),u=o(k,h.props),u.ref=kt(f,k,h),u.return=f,f=u;break e}t(f,k);break}else n(f,k);k=k.sibling}h.type===Ln?(u=jn(h.props.children,f.mode,b,h.key),u.return=f,f=u):(b=Dr(h.type,h.key,h.props,null,f.mode,b),b.ref=kt(f,u,h),b.return=f,f=b)}return i(f);case Dn:e:{for(k=h.key;u!==null;){if(u.key===k)if(u.tag===4&&u.stateNode.containerInfo===h.containerInfo&&u.stateNode.implementation===h.implementation){t(f,u.sibling),u=o(u,h.children||[]),u.return=f,f=u;break e}else{t(f,u);break}else n(f,u);u=u.sibling}u=ta(h,f.mode,b),u.return=f,f=u}return i(f);case nn:return k=h._init,F(f,u,k(h._payload),b)}if($t(h))return S(f,u,h,b);if(mt(h))return x(f,u,h,b);kr(f,h)}return typeof h=="string"&&h!==""||typeof h=="number"?(h=""+h,u!==null&&u.tag===6?(t(f,u.sibling),u=o(u,h),u.return=f,f=u):(t(f,u),u=na(h,f.mode,b),u.return=f,f=u),i(f)):t(f,u)}return F}var at=$c(!0),Ec=$c(!1),Zr=bn(null),eo=null,Qn=null,xi=null;function ki(){xi=Qn=eo=null}function wi(e){var n=Zr.current;L(Zr),e._currentValue=n}function Na(e,n,t){for(;e!==null;){var r=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,r!==null&&(r.childLanes|=n)):r!==null&&(r.childLanes&n)!==n&&(r.childLanes|=n),e===t)break;e=e.return}}function et(e,n){eo=e,xi=Qn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&n&&(fe=!0),e.firstContext=null)}function Fe(e){var n=e._currentValue;if(xi!==e)if(e={context:e,memoizedValue:n,next:null},Qn===null){if(eo===null)throw Error(w(308));Qn=e,eo.dependencies={lanes:0,firstContext:e}}else Qn=Qn.next=e;return n}var En=null;function Si(e){En===null?En=[e]:En.push(e)}function Cc(e,n,t,r){var o=n.interleaved;return o===null?(t.next=t,Si(n)):(t.next=o.next,o.next=t),n.interleaved=t,Xe(e,r)}function Xe(e,n){e.lanes|=n;var t=e.alternate;for(t!==null&&(t.lanes|=n),t=e,e=e.return;e!==null;)e.childLanes|=n,t=e.alternate,t!==null&&(t.childLanes|=n),t=e,e=e.return;return t.tag===3?t.stateNode:null}var tn=!1;function _i(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Fc(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Ye(e,n){return{eventTime:e,lane:n,tag:0,payload:null,callback:null,next:null}}function pn(e,n,t){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,I&2){var o=r.pending;return o===null?n.next=n:(n.next=o.next,o.next=n),r.pending=n,Xe(e,t)}return o=r.interleaved,o===null?(n.next=n,Si(r)):(n.next=o.next,o.next=n),r.interleaved=n,Xe(e,t)}function Mr(e,n,t){if(n=n.updateQueue,n!==null&&(n=n.shared,(t&4194240)!==0)){var r=n.lanes;r&=e.pendingLanes,t|=r,n.lanes=t,ci(e,t)}}function Os(e,n){var t=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,t===r)){var o=null,a=null;if(t=t.firstBaseUpdate,t!==null){do{var i={eventTime:t.eventTime,lane:t.lane,tag:t.tag,payload:t.payload,callback:t.callback,next:null};a===null?o=a=i:a=a.next=i,t=t.next}while(t!==null);a===null?o=a=n:a=a.next=n}else o=a=n;t={baseState:r.baseState,firstBaseUpdate:o,lastBaseUpdate:a,shared:r.shared,effects:r.effects},e.updateQueue=t;return}e=t.lastBaseUpdate,e===null?t.firstBaseUpdate=n:e.next=n,t.lastBaseUpdate=n}function no(e,n,t,r){var o=e.updateQueue;tn=!1;var a=o.firstBaseUpdate,i=o.lastBaseUpdate,s=o.shared.pending;if(s!==null){o.shared.pending=null;var l=s,c=l.next;l.next=null,i===null?a=c:i.next=c,i=l;var p=e.alternate;p!==null&&(p=p.updateQueue,s=p.lastBaseUpdate,s!==i&&(s===null?p.firstBaseUpdate=c:s.next=c,p.lastBaseUpdate=l))}if(a!==null){var g=o.baseState;i=0,p=c=l=null,s=a;do{var m=s.lane,v=s.eventTime;if((r&m)===m){p!==null&&(p=p.next={eventTime:v,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});e:{var S=e,x=s;switch(m=n,v=t,x.tag){case 1:if(S=x.payload,typeof S=="function"){g=S.call(v,g,m);break e}g=S;break e;case 3:S.flags=S.flags&-65537|128;case 0:if(S=x.payload,m=typeof S=="function"?S.call(v,g,m):S,m==null)break e;g=U({},g,m);break e;case 2:tn=!0}}s.callback!==null&&s.lane!==0&&(e.flags|=64,m=o.effects,m===null?o.effects=[s]:m.push(s))}else v={eventTime:v,lane:m,tag:s.tag,payload:s.payload,callback:s.callback,next:null},p===null?(c=p=v,l=g):p=p.next=v,i|=m;if(s=s.next,s===null){if(s=o.shared.pending,s===null)break;m=s,s=m.next,m.next=null,o.lastBaseUpdate=m,o.shared.pending=null}}while(!0);if(p===null&&(l=g),o.baseState=l,o.firstBaseUpdate=c,o.lastBaseUpdate=p,n=o.shared.interleaved,n!==null){o=n;do i|=o.lane,o=o.next;while(o!==n)}else a===null&&(o.shared.lanes=0);Nn|=i,e.lanes=i,e.memoizedState=g}}function Bs(e,n,t){if(e=n.effects,n.effects=null,e!==null)for(n=0;n<e.length;n++){var r=e[n],o=r.callback;if(o!==null){if(r.callback=null,r=t,typeof o!="function")throw Error(w(191,o));o.call(r)}}}var ar={},We=bn(ar),Yt=bn(ar),Kt=bn(ar);function Cn(e){if(e===ar)throw Error(w(174));return e}function $i(e,n){switch(O(Kt,n),O(Yt,e),O(We,ar),e=n.nodeType,e){case 9:case 11:n=(n=n.documentElement)?n.namespaceURI:fa(null,"");break;default:e=e===8?n.parentNode:n,n=e.namespaceURI||null,e=e.tagName,n=fa(n,e)}L(We),O(We,n)}function it(){L(We),L(Yt),L(Kt)}function jc(e){Cn(Kt.current);var n=Cn(We.current),t=fa(n,e.type);n!==t&&(O(Yt,e),O(We,t))}function Ei(e){Yt.current===e&&(L(We),L(Yt))}var R=bn(0);function to(e){for(var n=e;n!==null;){if(n.tag===13){var t=n.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||t.data==="$?"||t.data==="$!"))return n}else if(n.tag===19&&n.memoizedProps.revealOrder!==void 0){if(n.flags&128)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var Ko=[];function Ci(){for(var e=0;e<Ko.length;e++)Ko[e]._workInProgressVersionPrimary=null;Ko.length=0}var Nr=Ze.ReactCurrentDispatcher,Jo=Ze.ReactCurrentBatchConfig,Mn=0,W=null,K=null,q=null,ro=!1,Nt=!1,Jt=0,Rx=0;function re(){throw Error(w(321))}function Fi(e,n){if(n===null)return!1;for(var t=0;t<n.length&&t<e.length;t++)if(!Be(e[t],n[t]))return!1;return!0}function ji(e,n,t,r,o,a){if(Mn=a,W=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,Nr.current=e===null||e.memoizedState===null?Hx:Vx,e=t(r,o),Nt){a=0;do{if(Nt=!1,Jt=0,25<=a)throw Error(w(301));a+=1,q=K=null,n.updateQueue=null,Nr.current=Qx,e=t(r,o)}while(Nt)}if(Nr.current=oo,n=K!==null&&K.next!==null,Mn=0,q=K=W=null,ro=!1,n)throw Error(w(300));return e}function Ti(){var e=Jt!==0;return Jt=0,e}function Le(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return q===null?W.memoizedState=q=e:q=q.next=e,q}function je(){if(K===null){var e=W.alternate;e=e!==null?e.memoizedState:null}else e=K.next;var n=q===null?W.memoizedState:q.next;if(n!==null)q=n,K=e;else{if(e===null)throw Error(w(310));K=e,e={memoizedState:K.memoizedState,baseState:K.baseState,baseQueue:K.baseQueue,queue:K.queue,next:null},q===null?W.memoizedState=q=e:q=q.next=e}return q}function Xt(e,n){return typeof n=="function"?n(e):n}function Xo(e){var n=je(),t=n.queue;if(t===null)throw Error(w(311));t.lastRenderedReducer=e;var r=K,o=r.baseQueue,a=t.pending;if(a!==null){if(o!==null){var i=o.next;o.next=a.next,a.next=i}r.baseQueue=o=a,t.pending=null}if(o!==null){a=o.next,r=r.baseState;var s=i=null,l=null,c=a;do{var p=c.lane;if((Mn&p)===p)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:e(r,c.action);else{var g={lane:p,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(s=l=g,i=r):l=l.next=g,W.lanes|=p,Nn|=p}c=c.next}while(c!==null&&c!==a);l===null?i=r:l.next=s,Be(r,n.memoizedState)||(fe=!0),n.memoizedState=r,n.baseState=i,n.baseQueue=l,t.lastRenderedState=r}if(e=t.interleaved,e!==null){o=e;do a=o.lane,W.lanes|=a,Nn|=a,o=o.next;while(o!==e)}else o===null&&(t.lanes=0);return[n.memoizedState,t.dispatch]}function qo(e){var n=je(),t=n.queue;if(t===null)throw Error(w(311));t.lastRenderedReducer=e;var r=t.dispatch,o=t.pending,a=n.memoizedState;if(o!==null){t.pending=null;var i=o=o.next;do a=e(a,i.action),i=i.next;while(i!==o);Be(a,n.memoizedState)||(fe=!0),n.memoizedState=a,n.baseQueue===null&&(n.baseState=a),t.lastRenderedState=a}return[a,r]}function Tc(){}function Pc(e,n){var t=W,r=je(),o=n(),a=!Be(r.memoizedState,o);if(a&&(r.memoizedState=o,fe=!0),r=r.queue,Pi(Ic.bind(null,t,r,e),[e]),r.getSnapshot!==n||a||q!==null&&q.memoizedState.tag&1){if(t.flags|=2048,qt(9,Nc.bind(null,t,r,o,n),void 0,null),Z===null)throw Error(w(349));Mn&30||Mc(t,n,o)}return o}function Mc(e,n,t){e.flags|=16384,e={getSnapshot:n,value:t},n=W.updateQueue,n===null?(n={lastEffect:null,stores:null},W.updateQueue=n,n.stores=[e]):(t=n.stores,t===null?n.stores=[e]:t.push(e))}function Nc(e,n,t,r){n.value=t,n.getSnapshot=r,zc(n)&&Oc(e)}function Ic(e,n,t){return t(function(){zc(n)&&Oc(e)})}function zc(e){var n=e.getSnapshot;e=e.value;try{var t=n();return!Be(e,t)}catch{return!0}}function Oc(e){var n=Xe(e,1);n!==null&&Oe(n,e,1,-1)}function Ds(e){var n=Le();return typeof e=="function"&&(e=e()),n.memoizedState=n.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Xt,lastRenderedState:e},n.queue=e,e=e.dispatch=Gx.bind(null,W,e),[n.memoizedState,e]}function qt(e,n,t,r){return e={tag:e,create:n,destroy:t,deps:r,next:null},n=W.updateQueue,n===null?(n={lastEffect:null,stores:null},W.updateQueue=n,n.lastEffect=e.next=e):(t=n.lastEffect,t===null?n.lastEffect=e.next=e:(r=t.next,t.next=e,e.next=r,n.lastEffect=e)),e}function Bc(){return je().memoizedState}function Ir(e,n,t,r){var o=Le();W.flags|=e,o.memoizedState=qt(1|n,t,void 0,r===void 0?null:r)}function bo(e,n,t,r){var o=je();r=r===void 0?null:r;var a=void 0;if(K!==null){var i=K.memoizedState;if(a=i.destroy,r!==null&&Fi(r,i.deps)){o.memoizedState=qt(n,t,a,r);return}}W.flags|=e,o.memoizedState=qt(1|n,t,a,r)}function Ls(e,n){return Ir(8390656,8,e,n)}function Pi(e,n){return bo(2048,8,e,n)}function Dc(e,n){return bo(4,2,e,n)}function Lc(e,n){return bo(4,4,e,n)}function Ac(e,n){if(typeof n=="function")return e=e(),n(e),function(){n(null)};if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function Rc(e,n,t){return t=t!=null?t.concat([e]):null,bo(4,4,Ac.bind(null,n,e),t)}function Mi(){}function Wc(e,n){var t=je();n=n===void 0?null:n;var r=t.memoizedState;return r!==null&&n!==null&&Fi(n,r[1])?r[0]:(t.memoizedState=[e,n],e)}function Uc(e,n){var t=je();n=n===void 0?null:n;var r=t.memoizedState;return r!==null&&n!==null&&Fi(n,r[1])?r[0]:(e=e(),t.memoizedState=[e,n],e)}function Gc(e,n,t){return Mn&21?(Be(t,n)||(t=Kl(),W.lanes|=t,Nn|=t,e.baseState=!0),n):(e.baseState&&(e.baseState=!1,fe=!0),e.memoizedState=t)}function Wx(e,n){var t=z;z=t!==0&&4>t?t:4,e(!0);var r=Jo.transition;Jo.transition={};try{e(!1),n()}finally{z=t,Jo.transition=r}}function Hc(){return je().memoizedState}function Ux(e,n,t){var r=gn(e);if(t={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null},Vc(e))Qc(n,t);else if(t=Cc(e,n,t,r),t!==null){var o=le();Oe(t,e,r,o),Yc(t,n,r)}}function Gx(e,n,t){var r=gn(e),o={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null};if(Vc(e))Qc(n,o);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=n.lastRenderedReducer,a!==null))try{var i=n.lastRenderedState,s=a(i,t);if(o.hasEagerState=!0,o.eagerState=s,Be(s,i)){var l=n.interleaved;l===null?(o.next=o,Si(n)):(o.next=l.next,l.next=o),n.interleaved=o;return}}catch{}finally{}t=Cc(e,n,o,r),t!==null&&(o=le(),Oe(t,e,r,o),Yc(t,n,r))}}function Vc(e){var n=e.alternate;return e===W||n!==null&&n===W}function Qc(e,n){Nt=ro=!0;var t=e.pending;t===null?n.next=n:(n.next=t.next,t.next=n),e.pending=n}function Yc(e,n,t){if(t&4194240){var r=n.lanes;r&=e.pendingLanes,t|=r,n.lanes=t,ci(e,t)}}var oo={readContext:Fe,useCallback:re,useContext:re,useEffect:re,useImperativeHandle:re,useInsertionEffect:re,useLayoutEffect:re,useMemo:re,useReducer:re,useRef:re,useState:re,useDebugValue:re,useDeferredValue:re,useTransition:re,useMutableSource:re,useSyncExternalStore:re,useId:re,unstable_isNewReconciler:!1},Hx={readContext:Fe,useCallback:function(e,n){return Le().memoizedState=[e,n===void 0?null:n],e},useContext:Fe,useEffect:Ls,useImperativeHandle:function(e,n,t){return t=t!=null?t.concat([e]):null,Ir(4194308,4,Ac.bind(null,n,e),t)},useLayoutEffect:function(e,n){return Ir(4194308,4,e,n)},useInsertionEffect:function(e,n){return Ir(4,2,e,n)},useMemo:function(e,n){var t=Le();return n=n===void 0?null:n,e=e(),t.memoizedState=[e,n],e},useReducer:function(e,n,t){var r=Le();return n=t!==void 0?t(n):n,r.memoizedState=r.baseState=n,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:n},r.queue=e,e=e.dispatch=Ux.bind(null,W,e),[r.memoizedState,e]},useRef:function(e){var n=Le();return e={current:e},n.memoizedState=e},useState:Ds,useDebugValue:Mi,useDeferredValue:function(e){return Le().memoizedState=e},useTransition:function(){var e=Ds(!1),n=e[0];return e=Wx.bind(null,e[1]),Le().memoizedState=e,[n,e]},useMutableSource:function(){},useSyncExternalStore:function(e,n,t){var r=W,o=Le();if(A){if(t===void 0)throw Error(w(407));t=t()}else{if(t=n(),Z===null)throw Error(w(349));Mn&30||Mc(r,n,t)}o.memoizedState=t;var a={value:t,getSnapshot:n};return o.queue=a,Ls(Ic.bind(null,r,a,e),[e]),r.flags|=2048,qt(9,Nc.bind(null,r,a,t,n),void 0,null),t},useId:function(){var e=Le(),n=Z.identifierPrefix;if(A){var t=Qe,r=Ve;t=(r&~(1<<32-ze(r)-1)).toString(32)+t,n=":"+n+"R"+t,t=Jt++,0<t&&(n+="H"+t.toString(32)),n+=":"}else t=Rx++,n=":"+n+"r"+t.toString(32)+":";return e.memoizedState=n},unstable_isNewReconciler:!1},Vx={readContext:Fe,useCallback:Wc,useContext:Fe,useEffect:Pi,useImperativeHandle:Rc,useInsertionEffect:Dc,useLayoutEffect:Lc,useMemo:Uc,useReducer:Xo,useRef:Bc,useState:function(){return Xo(Xt)},useDebugValue:Mi,useDeferredValue:function(e){var n=je();return Gc(n,K.memoizedState,e)},useTransition:function(){var e=Xo(Xt)[0],n=je().memoizedState;return[e,n]},useMutableSource:Tc,useSyncExternalStore:Pc,useId:Hc,unstable_isNewReconciler:!1},Qx={readContext:Fe,useCallback:Wc,useContext:Fe,useEffect:Pi,useImperativeHandle:Rc,useInsertionEffect:Dc,useLayoutEffect:Lc,useMemo:Uc,useReducer:qo,useRef:Bc,useState:function(){return qo(Xt)},useDebugValue:Mi,useDeferredValue:function(e){var n=je();return K===null?n.memoizedState=e:Gc(n,K.memoizedState,e)},useTransition:function(){var e=qo(Xt)[0],n=je().memoizedState;return[e,n]},useMutableSource:Tc,useSyncExternalStore:Pc,useId:Hc,unstable_isNewReconciler:!1};function Me(e,n){if(e&&e.defaultProps){n=U({},n),e=e.defaultProps;for(var t in e)n[t]===void 0&&(n[t]=e[t]);return n}return n}function Ia(e,n,t,r){n=e.memoizedState,t=t(r,n),t=t==null?n:U({},n,t),e.memoizedState=t,e.lanes===0&&(e.updateQueue.baseState=t)}var xo={isMounted:function(e){return(e=e._reactInternals)?On(e)===e:!1},enqueueSetState:function(e,n,t){e=e._reactInternals;var r=le(),o=gn(e),a=Ye(r,o);a.payload=n,t!=null&&(a.callback=t),n=pn(e,a,o),n!==null&&(Oe(n,e,o,r),Mr(n,e,o))},enqueueReplaceState:function(e,n,t){e=e._reactInternals;var r=le(),o=gn(e),a=Ye(r,o);a.tag=1,a.payload=n,t!=null&&(a.callback=t),n=pn(e,a,o),n!==null&&(Oe(n,e,o,r),Mr(n,e,o))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var t=le(),r=gn(e),o=Ye(t,r);o.tag=2,n!=null&&(o.callback=n),n=pn(e,o,r),n!==null&&(Oe(n,e,r,t),Mr(n,e,r))}};function As(e,n,t,r,o,a,i){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,a,i):n.prototype&&n.prototype.isPureReactComponent?!Gt(t,r)||!Gt(o,a):!0}function Kc(e,n,t){var r=!1,o=yn,a=n.contextType;return typeof a=="object"&&a!==null?a=Fe(a):(o=he(n)?Tn:ie.current,r=n.contextTypes,a=(r=r!=null)?rt(e,o):yn),n=new n(t,a),e.memoizedState=n.state!==null&&n.state!==void 0?n.state:null,n.updater=xo,e.stateNode=n,n._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=o,e.__reactInternalMemoizedMaskedChildContext=a),n}function Rs(e,n,t,r){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(t,r),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(t,r),n.state!==e&&xo.enqueueReplaceState(n,n.state,null)}function za(e,n,t,r){var o=e.stateNode;o.props=t,o.state=e.memoizedState,o.refs={},_i(e);var a=n.contextType;typeof a=="object"&&a!==null?o.context=Fe(a):(a=he(n)?Tn:ie.current,o.context=rt(e,a)),o.state=e.memoizedState,a=n.getDerivedStateFromProps,typeof a=="function"&&(Ia(e,n,a,t),o.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(n=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),n!==o.state&&xo.enqueueReplaceState(o,o.state,null),no(e,t,o,r),o.state=e.memoizedState),typeof o.componentDidMount=="function"&&(e.flags|=4194308)}function st(e,n){try{var t="",r=n;do t+=k1(r),r=r.return;while(r);var o=t}catch(a){o=`
Error generating stack: `+a.message+`
`+a.stack}return{value:e,source:n,stack:o,digest:null}}function Zo(e,n,t){return{value:e,source:null,stack:t??null,digest:n??null}}function Oa(e,n){try{console.error(n.value)}catch(t){setTimeout(function(){throw t})}}var Yx=typeof WeakMap=="function"?WeakMap:Map;function Jc(e,n,t){t=Ye(-1,t),t.tag=3,t.payload={element:null};var r=n.value;return t.callback=function(){io||(io=!0,Va=r),Oa(e,n)},t}function Xc(e,n,t){t=Ye(-1,t),t.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var o=n.value;t.payload=function(){return r(o)},t.callback=function(){Oa(e,n)}}var a=e.stateNode;return a!==null&&typeof a.componentDidCatch=="function"&&(t.callback=function(){Oa(e,n),typeof r!="function"&&(fn===null?fn=new Set([this]):fn.add(this));var i=n.stack;this.componentDidCatch(n.value,{componentStack:i!==null?i:""})}),t}function Ws(e,n,t){var r=e.pingCache;if(r===null){r=e.pingCache=new Yx;var o=new Set;r.set(n,o)}else o=r.get(n),o===void 0&&(o=new Set,r.set(n,o));o.has(t)||(o.add(t),e=l2.bind(null,e,n,t),n.then(e,e))}function Us(e){do{var n;if((n=e.tag===13)&&(n=e.memoizedState,n=n!==null?n.dehydrated!==null:!0),n)return e;e=e.return}while(e!==null);return null}function Gs(e,n,t,r,o){return e.mode&1?(e.flags|=65536,e.lanes=o,e):(e===n?e.flags|=65536:(e.flags|=128,t.flags|=131072,t.flags&=-52805,t.tag===1&&(t.alternate===null?t.tag=17:(n=Ye(-1,1),n.tag=2,pn(t,n,1))),t.lanes|=1),e)}var Kx=Ze.ReactCurrentOwner,fe=!1;function se(e,n,t,r){n.child=e===null?Ec(n,null,t,r):at(n,e.child,t,r)}function Hs(e,n,t,r,o){t=t.render;var a=n.ref;return et(n,o),r=ji(e,n,t,r,a,o),t=Ti(),e!==null&&!fe?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~o,qe(e,n,o)):(A&&t&&yi(n),n.flags|=1,se(e,n,r,o),n.child)}function Vs(e,n,t,r,o){if(e===null){var a=t.type;return typeof a=="function"&&!Ai(a)&&a.defaultProps===void 0&&t.compare===null&&t.defaultProps===void 0?(n.tag=15,n.type=a,qc(e,n,a,r,o)):(e=Dr(t.type,null,r,n,n.mode,o),e.ref=n.ref,e.return=n,n.child=e)}if(a=e.child,!(e.lanes&o)){var i=a.memoizedProps;if(t=t.compare,t=t!==null?t:Gt,t(i,r)&&e.ref===n.ref)return qe(e,n,o)}return n.flags|=1,e=hn(a,r),e.ref=n.ref,e.return=n,n.child=e}function qc(e,n,t,r,o){if(e!==null){var a=e.memoizedProps;if(Gt(a,r)&&e.ref===n.ref)if(fe=!1,n.pendingProps=r=a,(e.lanes&o)!==0)e.flags&131072&&(fe=!0);else return n.lanes=e.lanes,qe(e,n,o)}return Ba(e,n,t,r,o)}function Zc(e,n,t){var r=n.pendingProps,o=r.children,a=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(n.mode&1))n.memoizedState={baseLanes:0,cachePool:null,transitions:null},O(Kn,ve),ve|=t;else{if(!(t&1073741824))return e=a!==null?a.baseLanes|t:t,n.lanes=n.childLanes=1073741824,n.memoizedState={baseLanes:e,cachePool:null,transitions:null},n.updateQueue=null,O(Kn,ve),ve|=e,null;n.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=a!==null?a.baseLanes:t,O(Kn,ve),ve|=r}else a!==null?(r=a.baseLanes|t,n.memoizedState=null):r=t,O(Kn,ve),ve|=r;return se(e,n,o,t),n.child}function eu(e,n){var t=n.ref;(e===null&&t!==null||e!==null&&e.ref!==t)&&(n.flags|=512,n.flags|=2097152)}function Ba(e,n,t,r,o){var a=he(t)?Tn:ie.current;return a=rt(n,a),et(n,o),t=ji(e,n,t,r,a,o),r=Ti(),e!==null&&!fe?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~o,qe(e,n,o)):(A&&r&&yi(n),n.flags|=1,se(e,n,t,o),n.child)}function Qs(e,n,t,r,o){if(he(t)){var a=!0;Jr(n)}else a=!1;if(et(n,o),n.stateNode===null)zr(e,n),Kc(n,t,r),za(n,t,r,o),r=!0;else if(e===null){var i=n.stateNode,s=n.memoizedProps;i.props=s;var l=i.context,c=t.contextType;typeof c=="object"&&c!==null?c=Fe(c):(c=he(t)?Tn:ie.current,c=rt(n,c));var p=t.getDerivedStateFromProps,g=typeof p=="function"||typeof i.getSnapshotBeforeUpdate=="function";g||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(s!==r||l!==c)&&Rs(n,i,r,c),tn=!1;var m=n.memoizedState;i.state=m,no(n,r,i,o),l=n.memoizedState,s!==r||m!==l||ge.current||tn?(typeof p=="function"&&(Ia(n,t,p,r),l=n.memoizedState),(s=tn||As(n,t,s,r,m,l,c))?(g||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(n.flags|=4194308)):(typeof i.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=r,n.memoizedState=l),i.props=r,i.state=l,i.context=c,r=s):(typeof i.componentDidMount=="function"&&(n.flags|=4194308),r=!1)}else{i=n.stateNode,Fc(e,n),s=n.memoizedProps,c=n.type===n.elementType?s:Me(n.type,s),i.props=c,g=n.pendingProps,m=i.context,l=t.contextType,typeof l=="object"&&l!==null?l=Fe(l):(l=he(t)?Tn:ie.current,l=rt(n,l));var v=t.getDerivedStateFromProps;(p=typeof v=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(s!==g||m!==l)&&Rs(n,i,r,l),tn=!1,m=n.memoizedState,i.state=m,no(n,r,i,o);var S=n.memoizedState;s!==g||m!==S||ge.current||tn?(typeof v=="function"&&(Ia(n,t,v,r),S=n.memoizedState),(c=tn||As(n,t,c,r,m,S,l)||!1)?(p||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(r,S,l),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(r,S,l)),typeof i.componentDidUpdate=="function"&&(n.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof i.componentDidUpdate!="function"||s===e.memoizedProps&&m===e.memoizedState||(n.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&m===e.memoizedState||(n.flags|=1024),n.memoizedProps=r,n.memoizedState=S),i.props=r,i.state=S,i.context=l,r=c):(typeof i.componentDidUpdate!="function"||s===e.memoizedProps&&m===e.memoizedState||(n.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&m===e.memoizedState||(n.flags|=1024),r=!1)}return Da(e,n,t,r,a,o)}function Da(e,n,t,r,o,a){eu(e,n);var i=(n.flags&128)!==0;if(!r&&!i)return o&&Ms(n,t,!1),qe(e,n,a);r=n.stateNode,Kx.current=n;var s=i&&typeof t.getDerivedStateFromError!="function"?null:r.render();return n.flags|=1,e!==null&&i?(n.child=at(n,e.child,null,a),n.child=at(n,null,s,a)):se(e,n,s,a),n.memoizedState=r.state,o&&Ms(n,t,!0),n.child}function nu(e){var n=e.stateNode;n.pendingContext?Ps(e,n.pendingContext,n.pendingContext!==n.context):n.context&&Ps(e,n.context,!1),$i(e,n.containerInfo)}function Ys(e,n,t,r,o){return ot(),bi(o),n.flags|=256,se(e,n,t,r),n.child}var La={dehydrated:null,treeContext:null,retryLane:0};function Aa(e){return{baseLanes:e,cachePool:null,transitions:null}}function tu(e,n,t){var r=n.pendingProps,o=R.current,a=!1,i=(n.flags&128)!==0,s;if((s=i)||(s=e!==null&&e.memoizedState===null?!1:(o&2)!==0),s?(a=!0,n.flags&=-129):(e===null||e.memoizedState!==null)&&(o|=1),O(R,o&1),e===null)return Ma(n),e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(n.mode&1?e.data==="$!"?n.lanes=8:n.lanes=1073741824:n.lanes=1,null):(i=r.children,e=r.fallback,a?(r=n.mode,a=n.child,i={mode:"hidden",children:i},!(r&1)&&a!==null?(a.childLanes=0,a.pendingProps=i):a=So(i,r,0,null),e=jn(e,r,t,null),a.return=n,e.return=n,a.sibling=e,n.child=a,n.child.memoizedState=Aa(t),n.memoizedState=La,e):Ni(n,i));if(o=e.memoizedState,o!==null&&(s=o.dehydrated,s!==null))return Jx(e,n,i,r,s,o,t);if(a){a=r.fallback,i=n.mode,o=e.child,s=o.sibling;var l={mode:"hidden",children:r.children};return!(i&1)&&n.child!==o?(r=n.child,r.childLanes=0,r.pendingProps=l,n.deletions=null):(r=hn(o,l),r.subtreeFlags=o.subtreeFlags&14680064),s!==null?a=hn(s,a):(a=jn(a,i,t,null),a.flags|=2),a.return=n,r.return=n,r.sibling=a,n.child=r,r=a,a=n.child,i=e.child.memoizedState,i=i===null?Aa(t):{baseLanes:i.baseLanes|t,cachePool:null,transitions:i.transitions},a.memoizedState=i,a.childLanes=e.childLanes&~t,n.memoizedState=La,r}return a=e.child,e=a.sibling,r=hn(a,{mode:"visible",children:r.children}),!(n.mode&1)&&(r.lanes=t),r.return=n,r.sibling=null,e!==null&&(t=n.deletions,t===null?(n.deletions=[e],n.flags|=16):t.push(e)),n.child=r,n.memoizedState=null,r}function Ni(e,n){return n=So({mode:"visible",children:n},e.mode,0,null),n.return=e,e.child=n}function wr(e,n,t,r){return r!==null&&bi(r),at(n,e.child,null,t),e=Ni(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function Jx(e,n,t,r,o,a,i){if(t)return n.flags&256?(n.flags&=-257,r=Zo(Error(w(422))),wr(e,n,i,r)):n.memoizedState!==null?(n.child=e.child,n.flags|=128,null):(a=r.fallback,o=n.mode,r=So({mode:"visible",children:r.children},o,0,null),a=jn(a,o,i,null),a.flags|=2,r.return=n,a.return=n,r.sibling=a,n.child=r,n.mode&1&&at(n,e.child,null,i),n.child.memoizedState=Aa(i),n.memoizedState=La,a);if(!(n.mode&1))return wr(e,n,i,null);if(o.data==="$!"){if(r=o.nextSibling&&o.nextSibling.dataset,r)var s=r.dgst;return r=s,a=Error(w(419)),r=Zo(a,r,void 0),wr(e,n,i,r)}if(s=(i&e.childLanes)!==0,fe||s){if(r=Z,r!==null){switch(i&-i){case 4:o=2;break;case 16:o=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:o=32;break;case 536870912:o=268435456;break;default:o=0}o=o&(r.suspendedLanes|i)?0:o,o!==0&&o!==a.retryLane&&(a.retryLane=o,Xe(e,o),Oe(r,e,o,-1))}return Li(),r=Zo(Error(w(421))),wr(e,n,i,r)}return o.data==="$?"?(n.flags|=128,n.child=e.child,n=c2.bind(null,e),o._reactRetry=n,null):(e=a.treeContext,be=dn(o.nextSibling),xe=n,A=!0,Ie=null,e!==null&&(_e[$e++]=Ve,_e[$e++]=Qe,_e[$e++]=Pn,Ve=e.id,Qe=e.overflow,Pn=n),n=Ni(n,r.children),n.flags|=4096,n)}function Ks(e,n,t){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n),Na(e.return,n,t)}function ea(e,n,t,r,o){var a=e.memoizedState;a===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:r,tail:t,tailMode:o}:(a.isBackwards=n,a.rendering=null,a.renderingStartTime=0,a.last=r,a.tail=t,a.tailMode=o)}function ru(e,n,t){var r=n.pendingProps,o=r.revealOrder,a=r.tail;if(se(e,n,r.children,t),r=R.current,r&2)r=r&1|2,n.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Ks(e,t,n);else if(e.tag===19)Ks(e,t,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break e;for(;e.sibling===null;){if(e.return===null||e.return===n)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(O(R,r),!(n.mode&1))n.memoizedState=null;else switch(o){case"forwards":for(t=n.child,o=null;t!==null;)e=t.alternate,e!==null&&to(e)===null&&(o=t),t=t.sibling;t=o,t===null?(o=n.child,n.child=null):(o=t.sibling,t.sibling=null),ea(n,!1,o,t,a);break;case"backwards":for(t=null,o=n.child,n.child=null;o!==null;){if(e=o.alternate,e!==null&&to(e)===null){n.child=o;break}e=o.sibling,o.sibling=t,t=o,o=e}ea(n,!0,t,null,a);break;case"together":ea(n,!1,null,null,void 0);break;default:n.memoizedState=null}return n.child}function zr(e,n){!(n.mode&1)&&e!==null&&(e.alternate=null,n.alternate=null,n.flags|=2)}function qe(e,n,t){if(e!==null&&(n.dependencies=e.dependencies),Nn|=n.lanes,!(t&n.childLanes))return null;if(e!==null&&n.child!==e.child)throw Error(w(153));if(n.child!==null){for(e=n.child,t=hn(e,e.pendingProps),n.child=t,t.return=n;e.sibling!==null;)e=e.sibling,t=t.sibling=hn(e,e.pendingProps),t.return=n;t.sibling=null}return n.child}function Xx(e,n,t){switch(n.tag){case 3:nu(n),ot();break;case 5:jc(n);break;case 1:he(n.type)&&Jr(n);break;case 4:$i(n,n.stateNode.containerInfo);break;case 10:var r=n.type._context,o=n.memoizedProps.value;O(Zr,r._currentValue),r._currentValue=o;break;case 13:if(r=n.memoizedState,r!==null)return r.dehydrated!==null?(O(R,R.current&1),n.flags|=128,null):t&n.child.childLanes?tu(e,n,t):(O(R,R.current&1),e=qe(e,n,t),e!==null?e.sibling:null);O(R,R.current&1);break;case 19:if(r=(t&n.childLanes)!==0,e.flags&128){if(r)return ru(e,n,t);n.flags|=128}if(o=n.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),O(R,R.current),r)break;return null;case 22:case 23:return n.lanes=0,Zc(e,n,t)}return qe(e,n,t)}var ou,Ra,au,iu;ou=function(e,n){for(var t=n.child;t!==null;){if(t.tag===5||t.tag===6)e.appendChild(t.stateNode);else if(t.tag!==4&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break;for(;t.sibling===null;){if(t.return===null||t.return===n)return;t=t.return}t.sibling.return=t.return,t=t.sibling}};Ra=function(){};au=function(e,n,t,r){var o=e.memoizedProps;if(o!==r){e=n.stateNode,Cn(We.current);var a=null;switch(t){case"input":o=ca(e,o),r=ca(e,r),a=[];break;case"select":o=U({},o,{value:void 0}),r=U({},r,{value:void 0}),a=[];break;case"textarea":o=pa(e,o),r=pa(e,r),a=[];break;default:typeof o.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Yr)}ga(t,r);var i;t=null;for(c in o)if(!r.hasOwnProperty(c)&&o.hasOwnProperty(c)&&o[c]!=null)if(c==="style"){var s=o[c];for(i in s)s.hasOwnProperty(i)&&(t||(t={}),t[i]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Bt.hasOwnProperty(c)?a||(a=[]):(a=a||[]).push(c,null));for(c in r){var l=r[c];if(s=o!=null?o[c]:void 0,r.hasOwnProperty(c)&&l!==s&&(l!=null||s!=null))if(c==="style")if(s){for(i in s)!s.hasOwnProperty(i)||l&&l.hasOwnProperty(i)||(t||(t={}),t[i]="");for(i in l)l.hasOwnProperty(i)&&s[i]!==l[i]&&(t||(t={}),t[i]=l[i])}else t||(a||(a=[]),a.push(c,t)),t=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,s=s?s.__html:void 0,l!=null&&s!==l&&(a=a||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(a=a||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Bt.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&B("scroll",e),a||s===l||(a=[])):(a=a||[]).push(c,l))}t&&(a=a||[]).push("style",t);var c=a;(n.updateQueue=c)&&(n.flags|=4)}};iu=function(e,n,t,r){t!==r&&(n.flags|=4)};function wt(e,n){if(!A)switch(e.tailMode){case"hidden":n=e.tail;for(var t=null;n!==null;)n.alternate!==null&&(t=n),n=n.sibling;t===null?e.tail=null:t.sibling=null;break;case"collapsed":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function oe(e){var n=e.alternate!==null&&e.alternate.child===e.child,t=0,r=0;if(n)for(var o=e.child;o!==null;)t|=o.lanes|o.childLanes,r|=o.subtreeFlags&14680064,r|=o.flags&14680064,o.return=e,o=o.sibling;else for(o=e.child;o!==null;)t|=o.lanes|o.childLanes,r|=o.subtreeFlags,r|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=r,e.childLanes=t,n}function qx(e,n,t){var r=n.pendingProps;switch(vi(n),n.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return oe(n),null;case 1:return he(n.type)&&Kr(),oe(n),null;case 3:return r=n.stateNode,it(),L(ge),L(ie),Ci(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(xr(n)?n.flags|=4:e===null||e.memoizedState.isDehydrated&&!(n.flags&256)||(n.flags|=1024,Ie!==null&&(Ka(Ie),Ie=null))),Ra(e,n),oe(n),null;case 5:Ei(n);var o=Cn(Kt.current);if(t=n.type,e!==null&&n.stateNode!=null)au(e,n,t,r,o),e.ref!==n.ref&&(n.flags|=512,n.flags|=2097152);else{if(!r){if(n.stateNode===null)throw Error(w(166));return oe(n),null}if(e=Cn(We.current),xr(n)){r=n.stateNode,t=n.type;var a=n.memoizedProps;switch(r[Ae]=n,r[Qt]=a,e=(n.mode&1)!==0,t){case"dialog":B("cancel",r),B("close",r);break;case"iframe":case"object":case"embed":B("load",r);break;case"video":case"audio":for(o=0;o<Ct.length;o++)B(Ct[o],r);break;case"source":B("error",r);break;case"img":case"image":case"link":B("error",r),B("load",r);break;case"details":B("toggle",r);break;case"input":os(r,a),B("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!a.multiple},B("invalid",r);break;case"textarea":is(r,a),B("invalid",r)}ga(t,a),o=null;for(var i in a)if(a.hasOwnProperty(i)){var s=a[i];i==="children"?typeof s=="string"?r.textContent!==s&&(a.suppressHydrationWarning!==!0&&br(r.textContent,s,e),o=["children",s]):typeof s=="number"&&r.textContent!==""+s&&(a.suppressHydrationWarning!==!0&&br(r.textContent,s,e),o=["children",""+s]):Bt.hasOwnProperty(i)&&s!=null&&i==="onScroll"&&B("scroll",r)}switch(t){case"input":dr(r),as(r,a,!0);break;case"textarea":dr(r),ss(r);break;case"select":case"option":break;default:typeof a.onClick=="function"&&(r.onclick=Yr)}r=o,n.updateQueue=r,r!==null&&(n.flags|=4)}else{i=o.nodeType===9?o:o.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Il(t)),e==="http://www.w3.org/1999/xhtml"?t==="script"?(e=i.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=i.createElement(t,{is:r.is}):(e=i.createElement(t),t==="select"&&(i=e,r.multiple?i.multiple=!0:r.size&&(i.size=r.size))):e=i.createElementNS(e,t),e[Ae]=n,e[Qt]=r,ou(e,n,!1,!1),n.stateNode=e;e:{switch(i=ha(t,r),t){case"dialog":B("cancel",e),B("close",e),o=r;break;case"iframe":case"object":case"embed":B("load",e),o=r;break;case"video":case"audio":for(o=0;o<Ct.length;o++)B(Ct[o],e);o=r;break;case"source":B("error",e),o=r;break;case"img":case"image":case"link":B("error",e),B("load",e),o=r;break;case"details":B("toggle",e),o=r;break;case"input":os(e,r),o=ca(e,r),B("invalid",e);break;case"option":o=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},o=U({},r,{value:void 0}),B("invalid",e);break;case"textarea":is(e,r),o=pa(e,r),B("invalid",e);break;default:o=r}ga(t,o),s=o;for(a in s)if(s.hasOwnProperty(a)){var l=s[a];a==="style"?Bl(e,l):a==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&zl(e,l)):a==="children"?typeof l=="string"?(t!=="textarea"||l!=="")&&Dt(e,l):typeof l=="number"&&Dt(e,""+l):a!=="suppressContentEditableWarning"&&a!=="suppressHydrationWarning"&&a!=="autoFocus"&&(Bt.hasOwnProperty(a)?l!=null&&a==="onScroll"&&B("scroll",e):l!=null&&ri(e,a,l,i))}switch(t){case"input":dr(e),as(e,r,!1);break;case"textarea":dr(e),ss(e);break;case"option":r.value!=null&&e.setAttribute("value",""+mn(r.value));break;case"select":e.multiple=!!r.multiple,a=r.value,a!=null?Jn(e,!!r.multiple,a,!1):r.defaultValue!=null&&Jn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof o.onClick=="function"&&(e.onclick=Yr)}switch(t){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(n.flags|=4)}n.ref!==null&&(n.flags|=512,n.flags|=2097152)}return oe(n),null;case 6:if(e&&n.stateNode!=null)iu(e,n,e.memoizedProps,r);else{if(typeof r!="string"&&n.stateNode===null)throw Error(w(166));if(t=Cn(Kt.current),Cn(We.current),xr(n)){if(r=n.stateNode,t=n.memoizedProps,r[Ae]=n,(a=r.nodeValue!==t)&&(e=xe,e!==null))switch(e.tag){case 3:br(r.nodeValue,t,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&br(r.nodeValue,t,(e.mode&1)!==0)}a&&(n.flags|=4)}else r=(t.nodeType===9?t:t.ownerDocument).createTextNode(r),r[Ae]=n,n.stateNode=r}return oe(n),null;case 13:if(L(R),r=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(A&&be!==null&&n.mode&1&&!(n.flags&128))_c(),ot(),n.flags|=98560,a=!1;else if(a=xr(n),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(w(318));if(a=n.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(w(317));a[Ae]=n}else ot(),!(n.flags&128)&&(n.memoizedState=null),n.flags|=4;oe(n),a=!1}else Ie!==null&&(Ka(Ie),Ie=null),a=!0;if(!a)return n.flags&65536?n:null}return n.flags&128?(n.lanes=t,n):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(n.child.flags|=8192,n.mode&1&&(e===null||R.current&1?J===0&&(J=3):Li())),n.updateQueue!==null&&(n.flags|=4),oe(n),null);case 4:return it(),Ra(e,n),e===null&&Ht(n.stateNode.containerInfo),oe(n),null;case 10:return wi(n.type._context),oe(n),null;case 17:return he(n.type)&&Kr(),oe(n),null;case 19:if(L(R),a=n.memoizedState,a===null)return oe(n),null;if(r=(n.flags&128)!==0,i=a.rendering,i===null)if(r)wt(a,!1);else{if(J!==0||e!==null&&e.flags&128)for(e=n.child;e!==null;){if(i=to(e),i!==null){for(n.flags|=128,wt(a,!1),r=i.updateQueue,r!==null&&(n.updateQueue=r,n.flags|=4),n.subtreeFlags=0,r=t,t=n.child;t!==null;)a=t,e=r,a.flags&=14680066,i=a.alternate,i===null?(a.childLanes=0,a.lanes=e,a.child=null,a.subtreeFlags=0,a.memoizedProps=null,a.memoizedState=null,a.updateQueue=null,a.dependencies=null,a.stateNode=null):(a.childLanes=i.childLanes,a.lanes=i.lanes,a.child=i.child,a.subtreeFlags=0,a.deletions=null,a.memoizedProps=i.memoizedProps,a.memoizedState=i.memoizedState,a.updateQueue=i.updateQueue,a.type=i.type,e=i.dependencies,a.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t=t.sibling;return O(R,R.current&1|2),n.child}e=e.sibling}a.tail!==null&&Q()>lt&&(n.flags|=128,r=!0,wt(a,!1),n.lanes=4194304)}else{if(!r)if(e=to(i),e!==null){if(n.flags|=128,r=!0,t=e.updateQueue,t!==null&&(n.updateQueue=t,n.flags|=4),wt(a,!0),a.tail===null&&a.tailMode==="hidden"&&!i.alternate&&!A)return oe(n),null}else 2*Q()-a.renderingStartTime>lt&&t!==1073741824&&(n.flags|=128,r=!0,wt(a,!1),n.lanes=4194304);a.isBackwards?(i.sibling=n.child,n.child=i):(t=a.last,t!==null?t.sibling=i:n.child=i,a.last=i)}return a.tail!==null?(n=a.tail,a.rendering=n,a.tail=n.sibling,a.renderingStartTime=Q(),n.sibling=null,t=R.current,O(R,r?t&1|2:t&1),n):(oe(n),null);case 22:case 23:return Di(),r=n.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(n.flags|=8192),r&&n.mode&1?ve&1073741824&&(oe(n),n.subtreeFlags&6&&(n.flags|=8192)):oe(n),null;case 24:return null;case 25:return null}throw Error(w(156,n.tag))}function Zx(e,n){switch(vi(n),n.tag){case 1:return he(n.type)&&Kr(),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return it(),L(ge),L(ie),Ci(),e=n.flags,e&65536&&!(e&128)?(n.flags=e&-65537|128,n):null;case 5:return Ei(n),null;case 13:if(L(R),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(w(340));ot()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return L(R),null;case 4:return it(),null;case 10:return wi(n.type._context),null;case 22:case 23:return Di(),null;case 24:return null;default:return null}}var Sr=!1,ae=!1,e2=typeof WeakSet=="function"?WeakSet:Set,_=null;function Yn(e,n){var t=e.ref;if(t!==null)if(typeof t=="function")try{t(null)}catch(r){G(e,n,r)}else t.current=null}function Wa(e,n,t){try{t()}catch(r){G(e,n,r)}}var Js=!1;function n2(e,n){if($a=Hr,e=dc(),mi(e)){if("selectionStart"in e)var t={start:e.selectionStart,end:e.selectionEnd};else e:{t=(t=e.ownerDocument)&&t.defaultView||window;var r=t.getSelection&&t.getSelection();if(r&&r.rangeCount!==0){t=r.anchorNode;var o=r.anchorOffset,a=r.focusNode;r=r.focusOffset;try{t.nodeType,a.nodeType}catch{t=null;break e}var i=0,s=-1,l=-1,c=0,p=0,g=e,m=null;n:for(;;){for(var v;g!==t||o!==0&&g.nodeType!==3||(s=i+o),g!==a||r!==0&&g.nodeType!==3||(l=i+r),g.nodeType===3&&(i+=g.nodeValue.length),(v=g.firstChild)!==null;)m=g,g=v;for(;;){if(g===e)break n;if(m===t&&++c===o&&(s=i),m===a&&++p===r&&(l=i),(v=g.nextSibling)!==null)break;g=m,m=g.parentNode}g=v}t=s===-1||l===-1?null:{start:s,end:l}}else t=null}t=t||{start:0,end:0}}else t=null;for(Ea={focusedElem:e,selectionRange:t},Hr=!1,_=n;_!==null;)if(n=_,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,_=e;else for(;_!==null;){n=_;try{var S=n.alternate;if(n.flags&1024)switch(n.tag){case 0:case 11:case 15:break;case 1:if(S!==null){var x=S.memoizedProps,F=S.memoizedState,f=n.stateNode,u=f.getSnapshotBeforeUpdate(n.elementType===n.type?x:Me(n.type,x),F);f.__reactInternalSnapshotBeforeUpdate=u}break;case 3:var h=n.stateNode.containerInfo;h.nodeType===1?h.textContent="":h.nodeType===9&&h.documentElement&&h.removeChild(h.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(w(163))}}catch(b){G(n,n.return,b)}if(e=n.sibling,e!==null){e.return=n.return,_=e;break}_=n.return}return S=Js,Js=!1,S}function It(e,n,t){var r=n.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var o=r=r.next;do{if((o.tag&e)===e){var a=o.destroy;o.destroy=void 0,a!==void 0&&Wa(n,t,a)}o=o.next}while(o!==r)}}function ko(e,n){if(n=n.updateQueue,n=n!==null?n.lastEffect:null,n!==null){var t=n=n.next;do{if((t.tag&e)===e){var r=t.create;t.destroy=r()}t=t.next}while(t!==n)}}function Ua(e){var n=e.ref;if(n!==null){var t=e.stateNode;switch(e.tag){case 5:e=t;break;default:e=t}typeof n=="function"?n(e):n.current=e}}function su(e){var n=e.alternate;n!==null&&(e.alternate=null,su(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&(delete n[Ae],delete n[Qt],delete n[ja],delete n[Bx],delete n[Dx])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function lu(e){return e.tag===5||e.tag===3||e.tag===4}function Xs(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||lu(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Ga(e,n,t){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?t.nodeType===8?t.parentNode.insertBefore(e,n):t.insertBefore(e,n):(t.nodeType===8?(n=t.parentNode,n.insertBefore(e,t)):(n=t,n.appendChild(e)),t=t._reactRootContainer,t!=null||n.onclick!==null||(n.onclick=Yr));else if(r!==4&&(e=e.child,e!==null))for(Ga(e,n,t),e=e.sibling;e!==null;)Ga(e,n,t),e=e.sibling}function Ha(e,n,t){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?t.insertBefore(e,n):t.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Ha(e,n,t),e=e.sibling;e!==null;)Ha(e,n,t),e=e.sibling}var ee=null,Ne=!1;function en(e,n,t){for(t=t.child;t!==null;)cu(e,n,t),t=t.sibling}function cu(e,n,t){if(Re&&typeof Re.onCommitFiberUnmount=="function")try{Re.onCommitFiberUnmount(fo,t)}catch{}switch(t.tag){case 5:ae||Yn(t,n);case 6:var r=ee,o=Ne;ee=null,en(e,n,t),ee=r,Ne=o,ee!==null&&(Ne?(e=ee,t=t.stateNode,e.nodeType===8?e.parentNode.removeChild(t):e.removeChild(t)):ee.removeChild(t.stateNode));break;case 18:ee!==null&&(Ne?(e=ee,t=t.stateNode,e.nodeType===8?Qo(e.parentNode,t):e.nodeType===1&&Qo(e,t),Wt(e)):Qo(ee,t.stateNode));break;case 4:r=ee,o=Ne,ee=t.stateNode.containerInfo,Ne=!0,en(e,n,t),ee=r,Ne=o;break;case 0:case 11:case 14:case 15:if(!ae&&(r=t.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){o=r=r.next;do{var a=o,i=a.destroy;a=a.tag,i!==void 0&&(a&2||a&4)&&Wa(t,n,i),o=o.next}while(o!==r)}en(e,n,t);break;case 1:if(!ae&&(Yn(t,n),r=t.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=t.memoizedProps,r.state=t.memoizedState,r.componentWillUnmount()}catch(s){G(t,n,s)}en(e,n,t);break;case 21:en(e,n,t);break;case 22:t.mode&1?(ae=(r=ae)||t.memoizedState!==null,en(e,n,t),ae=r):en(e,n,t);break;default:en(e,n,t)}}function qs(e){var n=e.updateQueue;if(n!==null){e.updateQueue=null;var t=e.stateNode;t===null&&(t=e.stateNode=new e2),n.forEach(function(r){var o=u2.bind(null,e,r);t.has(r)||(t.add(r),r.then(o,o))})}}function Pe(e,n){var t=n.deletions;if(t!==null)for(var r=0;r<t.length;r++){var o=t[r];try{var a=e,i=n,s=i;e:for(;s!==null;){switch(s.tag){case 5:ee=s.stateNode,Ne=!1;break e;case 3:ee=s.stateNode.containerInfo,Ne=!0;break e;case 4:ee=s.stateNode.containerInfo,Ne=!0;break e}s=s.return}if(ee===null)throw Error(w(160));cu(a,i,o),ee=null,Ne=!1;var l=o.alternate;l!==null&&(l.return=null),o.return=null}catch(c){G(o,n,c)}}if(n.subtreeFlags&12854)for(n=n.child;n!==null;)uu(n,e),n=n.sibling}function uu(e,n){var t=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Pe(n,e),De(e),r&4){try{It(3,e,e.return),ko(3,e)}catch(x){G(e,e.return,x)}try{It(5,e,e.return)}catch(x){G(e,e.return,x)}}break;case 1:Pe(n,e),De(e),r&512&&t!==null&&Yn(t,t.return);break;case 5:if(Pe(n,e),De(e),r&512&&t!==null&&Yn(t,t.return),e.flags&32){var o=e.stateNode;try{Dt(o,"")}catch(x){G(e,e.return,x)}}if(r&4&&(o=e.stateNode,o!=null)){var a=e.memoizedProps,i=t!==null?t.memoizedProps:a,s=e.type,l=e.updateQueue;if(e.updateQueue=null,l!==null)try{s==="input"&&a.type==="radio"&&a.name!=null&&Ml(o,a),ha(s,i);var c=ha(s,a);for(i=0;i<l.length;i+=2){var p=l[i],g=l[i+1];p==="style"?Bl(o,g):p==="dangerouslySetInnerHTML"?zl(o,g):p==="children"?Dt(o,g):ri(o,p,g,c)}switch(s){case"input":ua(o,a);break;case"textarea":Nl(o,a);break;case"select":var m=o._wrapperState.wasMultiple;o._wrapperState.wasMultiple=!!a.multiple;var v=a.value;v!=null?Jn(o,!!a.multiple,v,!1):m!==!!a.multiple&&(a.defaultValue!=null?Jn(o,!!a.multiple,a.defaultValue,!0):Jn(o,!!a.multiple,a.multiple?[]:"",!1))}o[Qt]=a}catch(x){G(e,e.return,x)}}break;case 6:if(Pe(n,e),De(e),r&4){if(e.stateNode===null)throw Error(w(162));o=e.stateNode,a=e.memoizedProps;try{o.nodeValue=a}catch(x){G(e,e.return,x)}}break;case 3:if(Pe(n,e),De(e),r&4&&t!==null&&t.memoizedState.isDehydrated)try{Wt(n.containerInfo)}catch(x){G(e,e.return,x)}break;case 4:Pe(n,e),De(e);break;case 13:Pe(n,e),De(e),o=e.child,o.flags&8192&&(a=o.memoizedState!==null,o.stateNode.isHidden=a,!a||o.alternate!==null&&o.alternate.memoizedState!==null||(Oi=Q())),r&4&&qs(e);break;case 22:if(p=t!==null&&t.memoizedState!==null,e.mode&1?(ae=(c=ae)||p,Pe(n,e),ae=c):Pe(n,e),De(e),r&8192){if(c=e.memoizedState!==null,(e.stateNode.isHidden=c)&&!p&&e.mode&1)for(_=e,p=e.child;p!==null;){for(g=_=p;_!==null;){switch(m=_,v=m.child,m.tag){case 0:case 11:case 14:case 15:It(4,m,m.return);break;case 1:Yn(m,m.return);var S=m.stateNode;if(typeof S.componentWillUnmount=="function"){r=m,t=m.return;try{n=r,S.props=n.memoizedProps,S.state=n.memoizedState,S.componentWillUnmount()}catch(x){G(r,t,x)}}break;case 5:Yn(m,m.return);break;case 22:if(m.memoizedState!==null){el(g);continue}}v!==null?(v.return=m,_=v):el(g)}p=p.sibling}e:for(p=null,g=e;;){if(g.tag===5){if(p===null){p=g;try{o=g.stateNode,c?(a=o.style,typeof a.setProperty=="function"?a.setProperty("display","none","important"):a.display="none"):(s=g.stateNode,l=g.memoizedProps.style,i=l!=null&&l.hasOwnProperty("display")?l.display:null,s.style.display=Ol("display",i))}catch(x){G(e,e.return,x)}}}else if(g.tag===6){if(p===null)try{g.stateNode.nodeValue=c?"":g.memoizedProps}catch(x){G(e,e.return,x)}}else if((g.tag!==22&&g.tag!==23||g.memoizedState===null||g===e)&&g.child!==null){g.child.return=g,g=g.child;continue}if(g===e)break e;for(;g.sibling===null;){if(g.return===null||g.return===e)break e;p===g&&(p=null),g=g.return}p===g&&(p=null),g.sibling.return=g.return,g=g.sibling}}break;case 19:Pe(n,e),De(e),r&4&&qs(e);break;case 21:break;default:Pe(n,e),De(e)}}function De(e){var n=e.flags;if(n&2){try{e:{for(var t=e.return;t!==null;){if(lu(t)){var r=t;break e}t=t.return}throw Error(w(160))}switch(r.tag){case 5:var o=r.stateNode;r.flags&32&&(Dt(o,""),r.flags&=-33);var a=Xs(e);Ha(e,a,o);break;case 3:case 4:var i=r.stateNode.containerInfo,s=Xs(e);Ga(e,s,i);break;default:throw Error(w(161))}}catch(l){G(e,e.return,l)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function t2(e,n,t){_=e,du(e)}function du(e,n,t){for(var r=(e.mode&1)!==0;_!==null;){var o=_,a=o.child;if(o.tag===22&&r){var i=o.memoizedState!==null||Sr;if(!i){var s=o.alternate,l=s!==null&&s.memoizedState!==null||ae;s=Sr;var c=ae;if(Sr=i,(ae=l)&&!c)for(_=o;_!==null;)i=_,l=i.child,i.tag===22&&i.memoizedState!==null?nl(o):l!==null?(l.return=i,_=l):nl(o);for(;a!==null;)_=a,du(a),a=a.sibling;_=o,Sr=s,ae=c}Zs(e)}else o.subtreeFlags&8772&&a!==null?(a.return=o,_=a):Zs(e)}}function Zs(e){for(;_!==null;){var n=_;if(n.flags&8772){var t=n.alternate;try{if(n.flags&8772)switch(n.tag){case 0:case 11:case 15:ae||ko(5,n);break;case 1:var r=n.stateNode;if(n.flags&4&&!ae)if(t===null)r.componentDidMount();else{var o=n.elementType===n.type?t.memoizedProps:Me(n.type,t.memoizedProps);r.componentDidUpdate(o,t.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var a=n.updateQueue;a!==null&&Bs(n,a,r);break;case 3:var i=n.updateQueue;if(i!==null){if(t=null,n.child!==null)switch(n.child.tag){case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}Bs(n,i,t)}break;case 5:var s=n.stateNode;if(t===null&&n.flags&4){t=s;var l=n.memoizedProps;switch(n.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&t.focus();break;case"img":l.src&&(t.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(n.memoizedState===null){var c=n.alternate;if(c!==null){var p=c.memoizedState;if(p!==null){var g=p.dehydrated;g!==null&&Wt(g)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(w(163))}ae||n.flags&512&&Ua(n)}catch(m){G(n,n.return,m)}}if(n===e){_=null;break}if(t=n.sibling,t!==null){t.return=n.return,_=t;break}_=n.return}}function el(e){for(;_!==null;){var n=_;if(n===e){_=null;break}var t=n.sibling;if(t!==null){t.return=n.return,_=t;break}_=n.return}}function nl(e){for(;_!==null;){var n=_;try{switch(n.tag){case 0:case 11:case 15:var t=n.return;try{ko(4,n)}catch(l){G(n,t,l)}break;case 1:var r=n.stateNode;if(typeof r.componentDidMount=="function"){var o=n.return;try{r.componentDidMount()}catch(l){G(n,o,l)}}var a=n.return;try{Ua(n)}catch(l){G(n,a,l)}break;case 5:var i=n.return;try{Ua(n)}catch(l){G(n,i,l)}}}catch(l){G(n,n.return,l)}if(n===e){_=null;break}var s=n.sibling;if(s!==null){s.return=n.return,_=s;break}_=n.return}}var r2=Math.ceil,ao=Ze.ReactCurrentDispatcher,Ii=Ze.ReactCurrentOwner,Ce=Ze.ReactCurrentBatchConfig,I=0,Z=null,Y=null,ne=0,ve=0,Kn=bn(0),J=0,Zt=null,Nn=0,wo=0,zi=0,zt=null,pe=null,Oi=0,lt=1/0,Ge=null,io=!1,Va=null,fn=null,_r=!1,sn=null,so=0,Ot=0,Qa=null,Or=-1,Br=0;function le(){return I&6?Q():Or!==-1?Or:Or=Q()}function gn(e){return e.mode&1?I&2&&ne!==0?ne&-ne:Ax.transition!==null?(Br===0&&(Br=Kl()),Br):(e=z,e!==0||(e=window.event,e=e===void 0?16:tc(e.type)),e):1}function Oe(e,n,t,r){if(50<Ot)throw Ot=0,Qa=null,Error(w(185));tr(e,t,r),(!(I&2)||e!==Z)&&(e===Z&&(!(I&2)&&(wo|=t),J===4&&on(e,ne)),me(e,r),t===1&&I===0&&!(n.mode&1)&&(lt=Q()+500,vo&&xn()))}function me(e,n){var t=e.callbackNode;A1(e,n);var r=Gr(e,e===Z?ne:0);if(r===0)t!==null&&us(t),e.callbackNode=null,e.callbackPriority=0;else if(n=r&-r,e.callbackPriority!==n){if(t!=null&&us(t),n===1)e.tag===0?Lx(tl.bind(null,e)):kc(tl.bind(null,e)),zx(function(){!(I&6)&&xn()}),t=null;else{switch(Jl(r)){case 1:t=li;break;case 4:t=Ql;break;case 16:t=Ur;break;case 536870912:t=Yl;break;default:t=Ur}t=bu(t,pu.bind(null,e))}e.callbackPriority=n,e.callbackNode=t}}function pu(e,n){if(Or=-1,Br=0,I&6)throw Error(w(327));var t=e.callbackNode;if(nt()&&e.callbackNode!==t)return null;var r=Gr(e,e===Z?ne:0);if(r===0)return null;if(r&30||r&e.expiredLanes||n)n=lo(e,r);else{n=r;var o=I;I|=2;var a=gu();(Z!==e||ne!==n)&&(Ge=null,lt=Q()+500,Fn(e,n));do try{i2();break}catch(s){fu(e,s)}while(!0);ki(),ao.current=a,I=o,Y!==null?n=0:(Z=null,ne=0,n=J)}if(n!==0){if(n===2&&(o=xa(e),o!==0&&(r=o,n=Ya(e,o))),n===1)throw t=Zt,Fn(e,0),on(e,r),me(e,Q()),t;if(n===6)on(e,r);else{if(o=e.current.alternate,!(r&30)&&!o2(o)&&(n=lo(e,r),n===2&&(a=xa(e),a!==0&&(r=a,n=Ya(e,a))),n===1))throw t=Zt,Fn(e,0),on(e,r),me(e,Q()),t;switch(e.finishedWork=o,e.finishedLanes=r,n){case 0:case 1:throw Error(w(345));case 2:_n(e,pe,Ge);break;case 3:if(on(e,r),(r&130023424)===r&&(n=Oi+500-Q(),10<n)){if(Gr(e,0)!==0)break;if(o=e.suspendedLanes,(o&r)!==r){le(),e.pingedLanes|=e.suspendedLanes&o;break}e.timeoutHandle=Fa(_n.bind(null,e,pe,Ge),n);break}_n(e,pe,Ge);break;case 4:if(on(e,r),(r&4194240)===r)break;for(n=e.eventTimes,o=-1;0<r;){var i=31-ze(r);a=1<<i,i=n[i],i>o&&(o=i),r&=~a}if(r=o,r=Q()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*r2(r/1960))-r,10<r){e.timeoutHandle=Fa(_n.bind(null,e,pe,Ge),r);break}_n(e,pe,Ge);break;case 5:_n(e,pe,Ge);break;default:throw Error(w(329))}}}return me(e,Q()),e.callbackNode===t?pu.bind(null,e):null}function Ya(e,n){var t=zt;return e.current.memoizedState.isDehydrated&&(Fn(e,n).flags|=256),e=lo(e,n),e!==2&&(n=pe,pe=t,n!==null&&Ka(n)),e}function Ka(e){pe===null?pe=e:pe.push.apply(pe,e)}function o2(e){for(var n=e;;){if(n.flags&16384){var t=n.updateQueue;if(t!==null&&(t=t.stores,t!==null))for(var r=0;r<t.length;r++){var o=t[r],a=o.getSnapshot;o=o.value;try{if(!Be(a(),o))return!1}catch{return!1}}}if(t=n.child,n.subtreeFlags&16384&&t!==null)t.return=n,n=t;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function on(e,n){for(n&=~zi,n&=~wo,e.suspendedLanes|=n,e.pingedLanes&=~n,e=e.expirationTimes;0<n;){var t=31-ze(n),r=1<<t;e[t]=-1,n&=~r}}function tl(e){if(I&6)throw Error(w(327));nt();var n=Gr(e,0);if(!(n&1))return me(e,Q()),null;var t=lo(e,n);if(e.tag!==0&&t===2){var r=xa(e);r!==0&&(n=r,t=Ya(e,r))}if(t===1)throw t=Zt,Fn(e,0),on(e,n),me(e,Q()),t;if(t===6)throw Error(w(345));return e.finishedWork=e.current.alternate,e.finishedLanes=n,_n(e,pe,Ge),me(e,Q()),null}function Bi(e,n){var t=I;I|=1;try{return e(n)}finally{I=t,I===0&&(lt=Q()+500,vo&&xn())}}function In(e){sn!==null&&sn.tag===0&&!(I&6)&&nt();var n=I;I|=1;var t=Ce.transition,r=z;try{if(Ce.transition=null,z=1,e)return e()}finally{z=r,Ce.transition=t,I=n,!(I&6)&&xn()}}function Di(){ve=Kn.current,L(Kn)}function Fn(e,n){e.finishedWork=null,e.finishedLanes=0;var t=e.timeoutHandle;if(t!==-1&&(e.timeoutHandle=-1,Ix(t)),Y!==null)for(t=Y.return;t!==null;){var r=t;switch(vi(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Kr();break;case 3:it(),L(ge),L(ie),Ci();break;case 5:Ei(r);break;case 4:it();break;case 13:L(R);break;case 19:L(R);break;case 10:wi(r.type._context);break;case 22:case 23:Di()}t=t.return}if(Z=e,Y=e=hn(e.current,null),ne=ve=n,J=0,Zt=null,zi=wo=Nn=0,pe=zt=null,En!==null){for(n=0;n<En.length;n++)if(t=En[n],r=t.interleaved,r!==null){t.interleaved=null;var o=r.next,a=t.pending;if(a!==null){var i=a.next;a.next=o,r.next=i}t.pending=r}En=null}return e}function fu(e,n){do{var t=Y;try{if(ki(),Nr.current=oo,ro){for(var r=W.memoizedState;r!==null;){var o=r.queue;o!==null&&(o.pending=null),r=r.next}ro=!1}if(Mn=0,q=K=W=null,Nt=!1,Jt=0,Ii.current=null,t===null||t.return===null){J=1,Zt=n,Y=null;break}e:{var a=e,i=t.return,s=t,l=n;if(n=ne,s.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,p=s,g=p.tag;if(!(p.mode&1)&&(g===0||g===11||g===15)){var m=p.alternate;m?(p.updateQueue=m.updateQueue,p.memoizedState=m.memoizedState,p.lanes=m.lanes):(p.updateQueue=null,p.memoizedState=null)}var v=Us(i);if(v!==null){v.flags&=-257,Gs(v,i,s,a,n),v.mode&1&&Ws(a,c,n),n=v,l=c;var S=n.updateQueue;if(S===null){var x=new Set;x.add(l),n.updateQueue=x}else S.add(l);break e}else{if(!(n&1)){Ws(a,c,n),Li();break e}l=Error(w(426))}}else if(A&&s.mode&1){var F=Us(i);if(F!==null){!(F.flags&65536)&&(F.flags|=256),Gs(F,i,s,a,n),bi(st(l,s));break e}}a=l=st(l,s),J!==4&&(J=2),zt===null?zt=[a]:zt.push(a),a=i;do{switch(a.tag){case 3:a.flags|=65536,n&=-n,a.lanes|=n;var f=Jc(a,l,n);Os(a,f);break e;case 1:s=l;var u=a.type,h=a.stateNode;if(!(a.flags&128)&&(typeof u.getDerivedStateFromError=="function"||h!==null&&typeof h.componentDidCatch=="function"&&(fn===null||!fn.has(h)))){a.flags|=65536,n&=-n,a.lanes|=n;var b=Xc(a,s,n);Os(a,b);break e}}a=a.return}while(a!==null)}mu(t)}catch(y){n=y,Y===t&&t!==null&&(Y=t=t.return);continue}break}while(!0)}function gu(){var e=ao.current;return ao.current=oo,e===null?oo:e}function Li(){(J===0||J===3||J===2)&&(J=4),Z===null||!(Nn&268435455)&&!(wo&268435455)||on(Z,ne)}function lo(e,n){var t=I;I|=2;var r=gu();(Z!==e||ne!==n)&&(Ge=null,Fn(e,n));do try{a2();break}catch(o){fu(e,o)}while(!0);if(ki(),I=t,ao.current=r,Y!==null)throw Error(w(261));return Z=null,ne=0,J}function a2(){for(;Y!==null;)hu(Y)}function i2(){for(;Y!==null&&!P1();)hu(Y)}function hu(e){var n=vu(e.alternate,e,ve);e.memoizedProps=e.pendingProps,n===null?mu(e):Y=n,Ii.current=null}function mu(e){var n=e;do{var t=n.alternate;if(e=n.return,n.flags&32768){if(t=Zx(t,n),t!==null){t.flags&=32767,Y=t;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{J=6,Y=null;return}}else if(t=qx(t,n,ve),t!==null){Y=t;return}if(n=n.sibling,n!==null){Y=n;return}Y=n=e}while(n!==null);J===0&&(J=5)}function _n(e,n,t){var r=z,o=Ce.transition;try{Ce.transition=null,z=1,s2(e,n,t,r)}finally{Ce.transition=o,z=r}return null}function s2(e,n,t,r){do nt();while(sn!==null);if(I&6)throw Error(w(327));t=e.finishedWork;var o=e.finishedLanes;if(t===null)return null;if(e.finishedWork=null,e.finishedLanes=0,t===e.current)throw Error(w(177));e.callbackNode=null,e.callbackPriority=0;var a=t.lanes|t.childLanes;if(R1(e,a),e===Z&&(Y=Z=null,ne=0),!(t.subtreeFlags&2064)&&!(t.flags&2064)||_r||(_r=!0,bu(Ur,function(){return nt(),null})),a=(t.flags&15990)!==0,t.subtreeFlags&15990||a){a=Ce.transition,Ce.transition=null;var i=z;z=1;var s=I;I|=4,Ii.current=null,n2(e,t),uu(t,e),Cx(Ea),Hr=!!$a,Ea=$a=null,e.current=t,t2(t),M1(),I=s,z=i,Ce.transition=a}else e.current=t;if(_r&&(_r=!1,sn=e,so=o),a=e.pendingLanes,a===0&&(fn=null),z1(t.stateNode),me(e,Q()),n!==null)for(r=e.onRecoverableError,t=0;t<n.length;t++)o=n[t],r(o.value,{componentStack:o.stack,digest:o.digest});if(io)throw io=!1,e=Va,Va=null,e;return so&1&&e.tag!==0&&nt(),a=e.pendingLanes,a&1?e===Qa?Ot++:(Ot=0,Qa=e):Ot=0,xn(),null}function nt(){if(sn!==null){var e=Jl(so),n=Ce.transition,t=z;try{if(Ce.transition=null,z=16>e?16:e,sn===null)var r=!1;else{if(e=sn,sn=null,so=0,I&6)throw Error(w(331));var o=I;for(I|=4,_=e.current;_!==null;){var a=_,i=a.child;if(_.flags&16){var s=a.deletions;if(s!==null){for(var l=0;l<s.length;l++){var c=s[l];for(_=c;_!==null;){var p=_;switch(p.tag){case 0:case 11:case 15:It(8,p,a)}var g=p.child;if(g!==null)g.return=p,_=g;else for(;_!==null;){p=_;var m=p.sibling,v=p.return;if(su(p),p===c){_=null;break}if(m!==null){m.return=v,_=m;break}_=v}}}var S=a.alternate;if(S!==null){var x=S.child;if(x!==null){S.child=null;do{var F=x.sibling;x.sibling=null,x=F}while(x!==null)}}_=a}}if(a.subtreeFlags&2064&&i!==null)i.return=a,_=i;else e:for(;_!==null;){if(a=_,a.flags&2048)switch(a.tag){case 0:case 11:case 15:It(9,a,a.return)}var f=a.sibling;if(f!==null){f.return=a.return,_=f;break e}_=a.return}}var u=e.current;for(_=u;_!==null;){i=_;var h=i.child;if(i.subtreeFlags&2064&&h!==null)h.return=i,_=h;else e:for(i=u;_!==null;){if(s=_,s.flags&2048)try{switch(s.tag){case 0:case 11:case 15:ko(9,s)}}catch(y){G(s,s.return,y)}if(s===i){_=null;break e}var b=s.sibling;if(b!==null){b.return=s.return,_=b;break e}_=s.return}}if(I=o,xn(),Re&&typeof Re.onPostCommitFiberRoot=="function")try{Re.onPostCommitFiberRoot(fo,e)}catch{}r=!0}return r}finally{z=t,Ce.transition=n}}return!1}function rl(e,n,t){n=st(t,n),n=Jc(e,n,1),e=pn(e,n,1),n=le(),e!==null&&(tr(e,1,n),me(e,n))}function G(e,n,t){if(e.tag===3)rl(e,e,t);else for(;n!==null;){if(n.tag===3){rl(n,e,t);break}else if(n.tag===1){var r=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(fn===null||!fn.has(r))){e=st(t,e),e=Xc(n,e,1),n=pn(n,e,1),e=le(),n!==null&&(tr(n,1,e),me(n,e));break}}n=n.return}}function l2(e,n,t){var r=e.pingCache;r!==null&&r.delete(n),n=le(),e.pingedLanes|=e.suspendedLanes&t,Z===e&&(ne&t)===t&&(J===4||J===3&&(ne&130023424)===ne&&500>Q()-Oi?Fn(e,0):zi|=t),me(e,n)}function yu(e,n){n===0&&(e.mode&1?(n=gr,gr<<=1,!(gr&130023424)&&(gr=4194304)):n=1);var t=le();e=Xe(e,n),e!==null&&(tr(e,n,t),me(e,t))}function c2(e){var n=e.memoizedState,t=0;n!==null&&(t=n.retryLane),yu(e,t)}function u2(e,n){var t=0;switch(e.tag){case 13:var r=e.stateNode,o=e.memoizedState;o!==null&&(t=o.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(w(314))}r!==null&&r.delete(n),yu(e,t)}var vu;vu=function(e,n,t){if(e!==null)if(e.memoizedProps!==n.pendingProps||ge.current)fe=!0;else{if(!(e.lanes&t)&&!(n.flags&128))return fe=!1,Xx(e,n,t);fe=!!(e.flags&131072)}else fe=!1,A&&n.flags&1048576&&wc(n,qr,n.index);switch(n.lanes=0,n.tag){case 2:var r=n.type;zr(e,n),e=n.pendingProps;var o=rt(n,ie.current);et(n,t),o=ji(null,n,r,e,o,t);var a=Ti();return n.flags|=1,typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0?(n.tag=1,n.memoizedState=null,n.updateQueue=null,he(r)?(a=!0,Jr(n)):a=!1,n.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,_i(n),o.updater=xo,n.stateNode=o,o._reactInternals=n,za(n,r,e,t),n=Da(null,n,r,!0,a,t)):(n.tag=0,A&&a&&yi(n),se(null,n,o,t),n=n.child),n;case 16:r=n.elementType;e:{switch(zr(e,n),e=n.pendingProps,o=r._init,r=o(r._payload),n.type=r,o=n.tag=p2(r),e=Me(r,e),o){case 0:n=Ba(null,n,r,e,t);break e;case 1:n=Qs(null,n,r,e,t);break e;case 11:n=Hs(null,n,r,e,t);break e;case 14:n=Vs(null,n,r,Me(r.type,e),t);break e}throw Error(w(306,r,""))}return n;case 0:return r=n.type,o=n.pendingProps,o=n.elementType===r?o:Me(r,o),Ba(e,n,r,o,t);case 1:return r=n.type,o=n.pendingProps,o=n.elementType===r?o:Me(r,o),Qs(e,n,r,o,t);case 3:e:{if(nu(n),e===null)throw Error(w(387));r=n.pendingProps,a=n.memoizedState,o=a.element,Fc(e,n),no(n,r,null,t);var i=n.memoizedState;if(r=i.element,a.isDehydrated)if(a={element:r,isDehydrated:!1,cache:i.cache,pendingSuspenseBoundaries:i.pendingSuspenseBoundaries,transitions:i.transitions},n.updateQueue.baseState=a,n.memoizedState=a,n.flags&256){o=st(Error(w(423)),n),n=Ys(e,n,r,t,o);break e}else if(r!==o){o=st(Error(w(424)),n),n=Ys(e,n,r,t,o);break e}else for(be=dn(n.stateNode.containerInfo.firstChild),xe=n,A=!0,Ie=null,t=Ec(n,null,r,t),n.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling;else{if(ot(),r===o){n=qe(e,n,t);break e}se(e,n,r,t)}n=n.child}return n;case 5:return jc(n),e===null&&Ma(n),r=n.type,o=n.pendingProps,a=e!==null?e.memoizedProps:null,i=o.children,Ca(r,o)?i=null:a!==null&&Ca(r,a)&&(n.flags|=32),eu(e,n),se(e,n,i,t),n.child;case 6:return e===null&&Ma(n),null;case 13:return tu(e,n,t);case 4:return $i(n,n.stateNode.containerInfo),r=n.pendingProps,e===null?n.child=at(n,null,r,t):se(e,n,r,t),n.child;case 11:return r=n.type,o=n.pendingProps,o=n.elementType===r?o:Me(r,o),Hs(e,n,r,o,t);case 7:return se(e,n,n.pendingProps,t),n.child;case 8:return se(e,n,n.pendingProps.children,t),n.child;case 12:return se(e,n,n.pendingProps.children,t),n.child;case 10:e:{if(r=n.type._context,o=n.pendingProps,a=n.memoizedProps,i=o.value,O(Zr,r._currentValue),r._currentValue=i,a!==null)if(Be(a.value,i)){if(a.children===o.children&&!ge.current){n=qe(e,n,t);break e}}else for(a=n.child,a!==null&&(a.return=n);a!==null;){var s=a.dependencies;if(s!==null){i=a.child;for(var l=s.firstContext;l!==null;){if(l.context===r){if(a.tag===1){l=Ye(-1,t&-t),l.tag=2;var c=a.updateQueue;if(c!==null){c=c.shared;var p=c.pending;p===null?l.next=l:(l.next=p.next,p.next=l),c.pending=l}}a.lanes|=t,l=a.alternate,l!==null&&(l.lanes|=t),Na(a.return,t,n),s.lanes|=t;break}l=l.next}}else if(a.tag===10)i=a.type===n.type?null:a.child;else if(a.tag===18){if(i=a.return,i===null)throw Error(w(341));i.lanes|=t,s=i.alternate,s!==null&&(s.lanes|=t),Na(i,t,n),i=a.sibling}else i=a.child;if(i!==null)i.return=a;else for(i=a;i!==null;){if(i===n){i=null;break}if(a=i.sibling,a!==null){a.return=i.return,i=a;break}i=i.return}a=i}se(e,n,o.children,t),n=n.child}return n;case 9:return o=n.type,r=n.pendingProps.children,et(n,t),o=Fe(o),r=r(o),n.flags|=1,se(e,n,r,t),n.child;case 14:return r=n.type,o=Me(r,n.pendingProps),o=Me(r.type,o),Vs(e,n,r,o,t);case 15:return qc(e,n,n.type,n.pendingProps,t);case 17:return r=n.type,o=n.pendingProps,o=n.elementType===r?o:Me(r,o),zr(e,n),n.tag=1,he(r)?(e=!0,Jr(n)):e=!1,et(n,t),Kc(n,r,o),za(n,r,o,t),Da(null,n,r,!0,e,t);case 19:return ru(e,n,t);case 22:return Zc(e,n,t)}throw Error(w(156,n.tag))};function bu(e,n){return Vl(e,n)}function d2(e,n,t,r){this.tag=e,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ee(e,n,t,r){return new d2(e,n,t,r)}function Ai(e){return e=e.prototype,!(!e||!e.isReactComponent)}function p2(e){if(typeof e=="function")return Ai(e)?1:0;if(e!=null){if(e=e.$$typeof,e===ai)return 11;if(e===ii)return 14}return 2}function hn(e,n){var t=e.alternate;return t===null?(t=Ee(e.tag,n,e.key,e.mode),t.elementType=e.elementType,t.type=e.type,t.stateNode=e.stateNode,t.alternate=e,e.alternate=t):(t.pendingProps=n,t.type=e.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=e.flags&14680064,t.childLanes=e.childLanes,t.lanes=e.lanes,t.child=e.child,t.memoizedProps=e.memoizedProps,t.memoizedState=e.memoizedState,t.updateQueue=e.updateQueue,n=e.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},t.sibling=e.sibling,t.index=e.index,t.ref=e.ref,t}function Dr(e,n,t,r,o,a){var i=2;if(r=e,typeof e=="function")Ai(e)&&(i=1);else if(typeof e=="string")i=5;else e:switch(e){case Ln:return jn(t.children,o,a,n);case oi:i=8,o|=8;break;case aa:return e=Ee(12,t,n,o|2),e.elementType=aa,e.lanes=a,e;case ia:return e=Ee(13,t,n,o),e.elementType=ia,e.lanes=a,e;case sa:return e=Ee(19,t,n,o),e.elementType=sa,e.lanes=a,e;case jl:return So(t,o,a,n);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Cl:i=10;break e;case Fl:i=9;break e;case ai:i=11;break e;case ii:i=14;break e;case nn:i=16,r=null;break e}throw Error(w(130,e==null?e:typeof e,""))}return n=Ee(i,t,n,o),n.elementType=e,n.type=r,n.lanes=a,n}function jn(e,n,t,r){return e=Ee(7,e,r,n),e.lanes=t,e}function So(e,n,t,r){return e=Ee(22,e,r,n),e.elementType=jl,e.lanes=t,e.stateNode={isHidden:!1},e}function na(e,n,t){return e=Ee(6,e,null,n),e.lanes=t,e}function ta(e,n,t){return n=Ee(4,e.children!==null?e.children:[],e.key,n),n.lanes=t,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}function f2(e,n,t,r,o){this.tag=n,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Oo(0),this.expirationTimes=Oo(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Oo(0),this.identifierPrefix=r,this.onRecoverableError=o,this.mutableSourceEagerHydrationData=null}function Ri(e,n,t,r,o,a,i,s,l){return e=new f2(e,n,t,s,l),n===1?(n=1,a===!0&&(n|=8)):n=0,a=Ee(3,null,null,n),e.current=a,a.stateNode=e,a.memoizedState={element:r,isDehydrated:t,cache:null,transitions:null,pendingSuspenseBoundaries:null},_i(a),e}function g2(e,n,t){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Dn,key:r==null?null:""+r,children:e,containerInfo:n,implementation:t}}function xu(e){if(!e)return yn;e=e._reactInternals;e:{if(On(e)!==e||e.tag!==1)throw Error(w(170));var n=e;do{switch(n.tag){case 3:n=n.stateNode.context;break e;case 1:if(he(n.type)){n=n.stateNode.__reactInternalMemoizedMergedChildContext;break e}}n=n.return}while(n!==null);throw Error(w(171))}if(e.tag===1){var t=e.type;if(he(t))return xc(e,t,n)}return n}function ku(e,n,t,r,o,a,i,s,l){return e=Ri(t,r,!0,e,o,a,i,s,l),e.context=xu(null),t=e.current,r=le(),o=gn(t),a=Ye(r,o),a.callback=n??null,pn(t,a,o),e.current.lanes=o,tr(e,o,r),me(e,r),e}function _o(e,n,t,r){var o=n.current,a=le(),i=gn(o);return t=xu(t),n.context===null?n.context=t:n.pendingContext=t,n=Ye(a,i),n.payload={element:e},r=r===void 0?null:r,r!==null&&(n.callback=r),e=pn(o,n,i),e!==null&&(Oe(e,o,i,a),Mr(e,o,i)),i}function co(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function ol(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var t=e.retryLane;e.retryLane=t!==0&&t<n?t:n}}function Wi(e,n){ol(e,n),(e=e.alternate)&&ol(e,n)}function h2(){return null}var wu=typeof reportError=="function"?reportError:function(e){console.error(e)};function Ui(e){this._internalRoot=e}$o.prototype.render=Ui.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(w(409));_o(e,n,null,null)};$o.prototype.unmount=Ui.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;In(function(){_o(null,e,null,null)}),n[Je]=null}};function $o(e){this._internalRoot=e}$o.prototype.unstable_scheduleHydration=function(e){if(e){var n=Zl();e={blockedOn:null,target:e,priority:n};for(var t=0;t<rn.length&&n!==0&&n<rn[t].priority;t++);rn.splice(t,0,e),t===0&&nc(e)}};function Gi(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Eo(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function al(){}function m2(e,n,t,r,o){if(o){if(typeof r=="function"){var a=r;r=function(){var c=co(i);a.call(c)}}var i=ku(n,r,e,0,null,!1,!1,"",al);return e._reactRootContainer=i,e[Je]=i.current,Ht(e.nodeType===8?e.parentNode:e),In(),i}for(;o=e.lastChild;)e.removeChild(o);if(typeof r=="function"){var s=r;r=function(){var c=co(l);s.call(c)}}var l=Ri(e,0,!1,null,null,!1,!1,"",al);return e._reactRootContainer=l,e[Je]=l.current,Ht(e.nodeType===8?e.parentNode:e),In(function(){_o(n,l,t,r)}),l}function Co(e,n,t,r,o){var a=t._reactRootContainer;if(a){var i=a;if(typeof o=="function"){var s=o;o=function(){var l=co(i);s.call(l)}}_o(n,i,e,o)}else i=m2(t,n,e,o,r);return co(i)}Xl=function(e){switch(e.tag){case 3:var n=e.stateNode;if(n.current.memoizedState.isDehydrated){var t=Et(n.pendingLanes);t!==0&&(ci(n,t|1),me(n,Q()),!(I&6)&&(lt=Q()+500,xn()))}break;case 13:In(function(){var r=Xe(e,1);if(r!==null){var o=le();Oe(r,e,1,o)}}),Wi(e,1)}};ui=function(e){if(e.tag===13){var n=Xe(e,134217728);if(n!==null){var t=le();Oe(n,e,134217728,t)}Wi(e,134217728)}};ql=function(e){if(e.tag===13){var n=gn(e),t=Xe(e,n);if(t!==null){var r=le();Oe(t,e,n,r)}Wi(e,n)}};Zl=function(){return z};ec=function(e,n){var t=z;try{return z=e,n()}finally{z=t}};ya=function(e,n,t){switch(n){case"input":if(ua(e,t),n=t.name,t.type==="radio"&&n!=null){for(t=e;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll("input[name="+JSON.stringify(""+n)+'][type="radio"]'),n=0;n<t.length;n++){var r=t[n];if(r!==e&&r.form===e.form){var o=yo(r);if(!o)throw Error(w(90));Pl(r),ua(r,o)}}}break;case"textarea":Nl(e,t);break;case"select":n=t.value,n!=null&&Jn(e,!!t.multiple,n,!1)}};Al=Bi;Rl=In;var y2={usingClientEntryPoint:!1,Events:[or,Un,yo,Dl,Ll,Bi]},St={findFiberByHostInstance:$n,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},v2={bundleType:St.bundleType,version:St.version,rendererPackageName:St.rendererPackageName,rendererConfig:St.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Ze.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Gl(e),e===null?null:e.stateNode},findFiberByHostInstance:St.findFiberByHostInstance||h2,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var $r=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!$r.isDisabled&&$r.supportsFiber)try{fo=$r.inject(v2),Re=$r}catch{}}we.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=y2;we.createPortal=function(e,n){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Gi(n))throw Error(w(200));return g2(e,n,null,t)};we.createRoot=function(e,n){if(!Gi(e))throw Error(w(299));var t=!1,r="",o=wu;return n!=null&&(n.unstable_strictMode===!0&&(t=!0),n.identifierPrefix!==void 0&&(r=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),n=Ri(e,1,!1,null,null,t,!1,r,o),e[Je]=n.current,Ht(e.nodeType===8?e.parentNode:e),new Ui(n)};we.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(w(188)):(e=Object.keys(e).join(","),Error(w(268,e)));return e=Gl(n),e=e===null?null:e.stateNode,e};we.flushSync=function(e){return In(e)};we.hydrate=function(e,n,t){if(!Eo(n))throw Error(w(200));return Co(null,e,n,!0,t)};we.hydrateRoot=function(e,n,t){if(!Gi(e))throw Error(w(405));var r=t!=null&&t.hydratedSources||null,o=!1,a="",i=wu;if(t!=null&&(t.unstable_strictMode===!0&&(o=!0),t.identifierPrefix!==void 0&&(a=t.identifierPrefix),t.onRecoverableError!==void 0&&(i=t.onRecoverableError)),n=ku(n,null,e,1,t??null,o,!1,a,i),e[Je]=n.current,Ht(e),r)for(e=0;e<r.length;e++)t=r[e],o=t._getVersion,o=o(t._source),n.mutableSourceEagerHydrationData==null?n.mutableSourceEagerHydrationData=[t,o]:n.mutableSourceEagerHydrationData.push(t,o);return new $o(n)};we.render=function(e,n,t){if(!Eo(n))throw Error(w(200));return Co(null,e,n,!1,t)};we.unmountComponentAtNode=function(e){if(!Eo(e))throw Error(w(40));return e._reactRootContainer?(In(function(){Co(null,null,e,!1,function(){e._reactRootContainer=null,e[Je]=null})}),!0):!1};we.unstable_batchedUpdates=Bi;we.unstable_renderSubtreeIntoContainer=function(e,n,t,r){if(!Eo(t))throw Error(w(200));if(e==null||e._reactInternals===void 0)throw Error(w(38));return Co(e,n,t,!1,r)};we.version="18.3.1-next-f1338f8080-20240426";function Su(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Su)}catch(e){console.error(e)}}Su(),Sl.exports=we;var b2=Sl.exports,_u,il=b2;_u=il.createRoot,il.hydrateRoot;const x2=["title","section","two-column","feature-grid","data-table","stat-row","timeline","quote","closing","image-hero","comparison"],Ja={title:"Title",section:"Section divider","two-column":"Two column","feature-grid":"Feature grid","data-table":"Data table","stat-row":"Stat row",timeline:"Timeline",quote:"Quote",closing:"Closing","image-hero":"Image hero",comparison:"Comparison"};function k2(e){switch(e){case"title":return{layout:e,eyebrow:"Eyebrow",heading:"Title slide",lead:"Supporting line."};case"section":return{layout:e,number:"01",eyebrow:"Part",heading:"Section title",lead:""};case"two-column":return{layout:e,heading:"Heading",body:"Left column body text.",image:"",imageAlt:"Image"};case"image-hero":return{layout:e,eyebrow:"Story",heading:"Hero moment",lead:"Caption over a full-bleed image.",image:"",imageAlt:"Hero image"};case"comparison":return{layout:e,heading:"Before vs after",leftLabel:"Before",left:"The old way — slow, manual, error-prone.",rightLabel:"After",right:"The new way — automated, fast, reliable."};case"feature-grid":return{layout:e,heading:"Feature grid",columns:3,cards:[{title:"One",body:"First point."},{title:"Two",body:"Second point."},{title:"Three",body:"Third point."}]};case"data-table":return{layout:e,heading:"Table",columns:["Column A","Column B"],rows:[["a1","b1"],["a2","b2"]]};case"stat-row":return{layout:e,heading:"Stats",stats:[{value:"100%",label:"Metric"},{value:"2x",label:"Metric"}]};case"timeline":return{layout:e,heading:"Timeline",steps:[{title:"Step one",body:"Detail."},{title:"Step two",body:"Detail."}]};case"quote":return{layout:e,quote:"A memorable quote.",by:"Attribution"};case"closing":return{layout:e,eyebrow:"Thanks",heading:"Closing",lead:"Call to action.",cta:{label:"Get started",href:"https://example.com"}};default:return{layout:e,heading:"Slide"}}}const $u={type:"deck",meta:{title:"Acme Q3",company:"Acme",theme:"claude"},slides:[{layout:"title",eyebrow:"Q3 2026",heading:"Acme All-Hands",lead:"Momentum, metrics, and what's next."},{layout:"section",number:"01",eyebrow:"Part one",heading:"Where we are"},{layout:"feature-grid",heading:"Three pillars",columns:3,cards:[{icon:"fa-solid fa-bolt",title:"Speed",body:"Ship 3x faster."},{title:"Safety",body:"SOC2 in progress."},{title:"Simplicity",body:"One command."}]},{layout:"stat-row",heading:"By the numbers",stats:[{value:"98%",label:"Uptime"},{value:"$1.2M",label:"ARR"},{value:"3.1x",label:"YoY"}]},{layout:"data-table",heading:"Pipeline",columns:["Stage","Count","Value"],rows:[["Lead","120","$600k"],["POC","34","$340k"],["Closed","12","$210k"]]},{layout:"timeline",heading:"Roadmap",steps:[{title:"Now",body:"PPTX export."},{title:"Next",body:"Studio editor."},{title:"Later",body:"Templates."}]},{layout:"quote",quote:"Make it work, make it right, make it fast.",by:"Kent Beck"},{layout:"closing",heading:"Thank you",lead:"Questions?",cta:{label:"Get started",href:"https://acme.com"}}]},Eu="claude",Cu="0.1.0",Fu="Anthropic / Claude-inspired theme: warm cream paper, clay-coral accent, grotesk + editorial-serif pairing.",ju="Warm, human, editorial, high-craft, calm — cream paper, soft clay-coral signal, Styrene-style grotesk headings over a Tiempos-style serif body. Restrained, trustworthy, not corporate.",Tu="MIT",Pu="Timur Isachenko",Mu={bg:"#faf9f5",bg2:"#f4f3ee",text:"#141413",muted:"#73706a",accent:"#d97757",accent2:"#6a9bcc",cardBg:"#ffffff",border:"#e8e6dc"},Nu={headingFont:"'Space Grotesk', system-ui, sans-serif",bodyFont:"'Lora', Georgia, 'Times New Roman', serif",headingWeight:600,googleFonts:["Space+Grotesk:wght@500;600;700","Lora:wght@400;500;600"]},Iu={radius:"12px",slideWidth:"1280px"},w2={name:Eu,version:Cu,extends:"default-tech",description:Fu,vibe:ju,license:Tu,author:Pu,roles:Mu,typography:Nu,geometry:Iu},S2=Object.freeze(Object.defineProperty({__proto__:null,author:Pu,default:w2,description:Fu,geometry:Iu,license:Tu,name:Eu,roles:Mu,typography:Nu,version:Cu,vibe:ju},Symbol.toStringTag,{value:"Module"})),zu="default-tech",Ou="0.1.0",Bu="Edgy tech-startup default: dark canvas, violet + cyan accents, bold geometric sans.",Du="Edgy tech startup — dark, confident, neon-accented.",Lu="MIT",Au="Timur Isachenko",Ru={bg:"#0e0e12",bg2:"#16161d",text:"#f4f4f5",muted:"#a1a1aa",accent:"#7c3aed",accent2:"#22d3ee",cardBg:"rgba(255,255,255,0.04)",border:"rgba(255,255,255,0.08)"},Wu={headingFont:"'Montserrat', system-ui, sans-serif",bodyFont:"'Open Sans', system-ui, sans-serif",headingWeight:800,googleFonts:["Montserrat:wght@700;800","Open+Sans:wght@400;600"]},Uu={radius:"18px",slideWidth:"1280px"},_2={name:zu,version:Ou,description:Bu,vibe:Du,license:Lu,author:Au,roles:Ru,typography:Wu,geometry:Uu},$2=Object.freeze(Object.defineProperty({__proto__:null,author:Au,default:_2,description:Bu,geometry:Uu,license:Lu,name:zu,roles:Ru,typography:Wu,version:Ou,vibe:Du},Symbol.toStringTag,{value:"Module"})),Gu="8-bit-orbit",Hu="1.0.0",Vu="8-Bit Orbit — pixel-art neon arcade on deep navy, Tektur + Chakra Petch (frontend-slides bold-template-pack).",Qu="8-Bit Orbit — void #0A0E27, neon cyan/pink/yellow, Tektur + Chakra Petch + Space Mono (frontend-slides 8-bit-orbit).",Yu="MIT",Ku="Timur Isachenko",Ju={bg:"#0A0E27",bg2:"#0F1B3D",text:"#FFFFFF",muted:"#E2D5F2",accent:"#5EDCF4",accent2:"#F0A6CA",cardBg:"rgba(15,27,61,0.85)",border:"rgba(94,220,244,0.35)"},Xu={headingFont:"'Tektur', cursive",bodyFont:"'Chakra Petch', system-ui, sans-serif",headingWeight:700,googleFonts:["Tektur:wght@500;700;900","Chakra+Petch:wght@400;500;600;700","Space+Mono:wght@400;700"]},qu={radius:"0px",slideWidth:"1280px"},E2={name:Gu,version:Hu,extends:"default-tech",description:Vu,vibe:Qu,license:Yu,author:Ku,roles:Ju,typography:Xu,geometry:qu},C2=Object.freeze(Object.defineProperty({__proto__:null,author:Ku,default:E2,description:Vu,geometry:qu,license:Yu,name:Gu,roles:Ju,typography:Xu,version:Hu,vibe:Qu},Symbol.toStringTag,{value:"Module"})),Zu="aerospace-hud",ed="0.1.0",nd="Aerospace HUD — deep navy, cyan instruments, warning orange, blueprint grid.",td="Aerospace HUD — navy cockpit, cyan instruments, warning orange, Barlow Condensed (matches Axiom gallery).",rd="MIT",od="Timur Isachenko",ad={bg:"#0a1d3a",bg2:"#0d2347",text:"#f0f8ff",muted:"#2a7aaa",accent:"#5ec8ff",accent2:"#ff7a18",cardBg:"rgba(94,200,255,0.08)",border:"rgba(94,200,255,0.28)"},id={headingFont:"'Barlow Condensed', system-ui, sans-serif",bodyFont:"'Barlow', system-ui, sans-serif",headingWeight:700,googleFonts:["Barlow+Condensed:wght@600;700","Barlow:wght@400;600","IBM+Plex+Mono:wght@500"]},sd={radius:"4px",slideWidth:"1280px"},F2={name:Zu,version:ed,extends:"default-tech",description:nd,vibe:td,license:rd,author:od,roles:ad,typography:id,geometry:sd},j2=Object.freeze(Object.defineProperty({__proto__:null,author:od,default:F2,description:nd,geometry:sd,license:rd,name:Zu,roles:ad,typography:id,version:ed,vibe:td},Symbol.toStringTag,{value:"Module"})),ld="art-deco",cd="0.1.0",ud="Art Deco investor — deep emerald, gold leaf, Cinzel display.",dd="Art Deco — #0c2a24 emerald, gold #c8a24a, Cinzel (matches Meridian Club gallery).",pd="MIT",fd="Timur Isachenko",gd={bg:"#0c2a24",bg2:"#113530",text:"#f5eed8",muted:"#c9bfa0",accent:"#c8a24a",accent2:"#e2c47a",cardBg:"rgba(200,162,74,0.08)",border:"rgba(200,162,74,0.35)"},hd={headingFont:"'Cinzel', Georgia, serif",bodyFont:"'Cormorant Garamond', Georgia, serif",headingWeight:600,googleFonts:["Cinzel:wght@500;600;700","Cormorant+Garamond:wght@400;600"]},md={radius:"0px",slideWidth:"1280px"},T2={name:ld,version:cd,extends:"default-tech",description:ud,vibe:dd,license:pd,author:fd,roles:gd,typography:hd,geometry:md},P2=Object.freeze(Object.defineProperty({__proto__:null,author:fd,default:T2,description:ud,geometry:md,license:pd,name:ld,roles:gd,typography:hd,version:cd,vibe:dd},Symbol.toStringTag,{value:"Module"})),yd="aurora-glass",vd="0.1.0",bd="Dark aurora glassmorphism — void canvas, frosted cards, violet + cyan glow.",xd="Aurora glass — pure black void, Syne + Inter, violet #a78bfa + cyan #67e8f9 (matches NovaSpark gallery).",kd="MIT",wd="Timur Isachenko",Sd={bg:"#000000",bg2:"#0a0612",text:"#ffffff",muted:"#a5a0b8",accent:"#a78bfa",accent2:"#67e8f9",cardBg:"rgba(255,255,255,0.06)",border:"rgba(255,255,255,0.12)"},_d={headingFont:"'Syne', system-ui, sans-serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:800,googleFonts:["Syne:wght@700;800","Inter:wght@400;600"]},$d={radius:"16px",slideWidth:"1280px"},M2={name:yd,version:vd,extends:"default-tech",description:bd,vibe:xd,license:kd,author:wd,roles:Sd,typography:_d,geometry:$d},N2=Object.freeze(Object.defineProperty({__proto__:null,author:wd,default:M2,description:bd,geometry:$d,license:kd,name:yd,roles:Sd,typography:_d,version:vd,vibe:xd},Symbol.toStringTag,{value:"Module"})),Ed="bauhaus",Cd="0.1.0",Fd="Bauhaus primary system — cream field, red/yellow/blue geometry, bold grotesk.",jd="Bauhaus — warm cream #f4f1ea, primary red #e63946 + blue #1f4ae0 (matches Primary gallery).",Td="MIT",Pd="Timur Isachenko",Md={bg:"#f4f1ea",bg2:"#ede9e0",text:"#0d0d0d",muted:"#6a655c",accent:"#e63946",accent2:"#1f4ae0",cardBg:"rgba(0,0,0,0.04)",border:"rgba(13,13,13,0.2)"},Nd={headingFont:"'Archivo', system-ui, sans-serif",bodyFont:"'Space Grotesk', system-ui, sans-serif",headingWeight:800,googleFonts:["Archivo:wght@600;800","Space+Grotesk:wght@400;600"]},Id={radius:"0px",slideWidth:"1280px"},I2={name:Ed,version:Cd,extends:"default-tech",description:Fd,vibe:jd,license:Td,author:Pd,roles:Md,typography:Nd,geometry:Id},z2=Object.freeze(Object.defineProperty({__proto__:null,author:Pd,default:I2,description:Fd,geometry:Id,license:Td,name:Ed,roles:Md,typography:Nd,version:Cd,vibe:jd},Symbol.toStringTag,{value:"Module"})),zd="biennale-yellow",Od="1.0.0",Bd="Biennale Yellow — Instrument Serif on parchment with solar yellow bloom and deep indigo ink (frontend-slides / beautiful-html-templates).",Dd="Biennale Yellow — parchment #E9E5DB, sun #F1EE2E, indigo #1B2566, Instrument Serif + Archivo (frontend-slides biennale-yellow).",Ld="MIT",Ad="Timur Isachenko",Rd={bg:"#E9E5DB",bg2:"#DCD6C4",text:"#1B2566",muted:"#4A5480",accent:"#F1EE2E",accent2:"#E26B4A",cardBg:"rgba(255,255,255,0.35)",border:"rgba(27,37,102,0.22)"},Wd={headingFont:"'Instrument Serif', Georgia, serif",bodyFont:"'Archivo', system-ui, sans-serif",headingWeight:400,googleFonts:["Instrument+Serif:ital@0;1","Archivo:wght@400;500;600","JetBrains+Mono:wght@400"]},Ud={radius:"0px",slideWidth:"1280px"},O2={name:zd,version:Od,extends:"default-tech",description:Bd,vibe:Dd,license:Ld,author:Ad,roles:Rd,typography:Wd,geometry:Ud},B2=Object.freeze(Object.defineProperty({__proto__:null,author:Ad,default:O2,description:Bd,geometry:Ud,license:Ld,name:zd,roles:Rd,typography:Wd,version:Od,vibe:Dd},Symbol.toStringTag,{value:"Module"})),Gd="block-frame",Hd="1.0.0",Vd="BlockFrame — neobrutalist pastel-neon blocks, 4px ink borders, hard offset shadows (frontend-slides bold-template-pack).",Qd="BlockFrame — offwhite #FFFDF5, pink/blue/green/yellow pastels, Inter 900 + Space Grotesk (frontend-slides block-frame).",Yd="MIT",Kd="Timur Isachenko",Jd={bg:"#FFFDF5",bg2:"#FFDC8B",text:"#000000",muted:"#444444",accent:"#FE90E8",accent2:"#99E885",cardBg:"#FFFFFF",border:"#000000"},Xd={headingFont:"'Inter', system-ui, sans-serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:900,googleFonts:["Inter:wght@500;700;800;900","Space+Grotesk:wght@500;600;700"]},qd={radius:"0px",slideWidth:"1280px"},D2={name:Gd,version:Hd,extends:"default-tech",description:Vd,vibe:Qd,license:Yd,author:Kd,roles:Jd,typography:Xd,geometry:qd},L2=Object.freeze(Object.defineProperty({__proto__:null,author:Kd,default:D2,description:Vd,geometry:qd,license:Yd,name:Gd,roles:Jd,typography:Xd,version:Hd,vibe:Qd},Symbol.toStringTag,{value:"Module"})),Zd="blueprint",ep="0.1.0",np="Engineering blueprint — deep navy, cyan lines, Space Mono / Space Grotesk.",tp="Blueprint — #0a1f3d navy, cyan #00e5ff grid (matches Apsis Mission gallery).",rp="MIT",op="Timur Isachenko",ap={bg:"#0a1f3d",bg2:"#0d2548",text:"#e8f4ff",muted:"#7aa8c8",accent:"#00e5ff",accent2:"#ffffff",cardBg:"rgba(0,229,255,0.06)",border:"rgba(0,229,255,0.28)"},ip={headingFont:"'Space Grotesk', system-ui, sans-serif",bodyFont:"'Space Mono', monospace",headingWeight:700,googleFonts:["Space+Grotesk:wght@500;700","Space+Mono:wght@400;700","IBM+Plex+Mono:wght@500"]},sp={radius:"2px",slideWidth:"1280px"},A2={name:Zd,version:ep,extends:"default-tech",description:np,vibe:tp,license:rp,author:op,roles:ap,typography:ip,geometry:sp},R2=Object.freeze(Object.defineProperty({__proto__:null,author:op,default:A2,description:np,geometry:sp,license:rp,name:Zd,roles:ap,typography:ip,version:ep,vibe:tp},Symbol.toStringTag,{value:"Module"})),lp="bold-poster",cp="1.0.0",up="Bold Poster — Shrikhand display, Libre Baskerville body, tomato red accent (frontend-slides / beautiful-html-templates).",dp="Bold Poster — white canvas, ink #1C1410, tomato #D8000F, Shrikhand + Libre Baskerville (frontend-slides bold-poster).",pp="MIT",fp="Timur Isachenko",gp={bg:"#FFFFFF",bg2:"#F5F2EF",text:"#1C1410",muted:"#6B5E54",accent:"#D8000F",accent2:"#1C1410",cardBg:"#F5F2EF",border:"rgba(28,20,16,0.85)"},hp={headingFont:"'Shrikhand', cursive",bodyFont:"'Libre Baskerville', Georgia, serif",headingWeight:400,googleFonts:["Shrikhand","Libre+Baskerville:wght@400;700","Space+Grotesk:wght@500;600"]},mp={radius:"0px",slideWidth:"1280px"},W2={name:lp,version:cp,extends:"default-tech",description:up,vibe:dp,license:pp,author:fp,roles:gp,typography:hp,geometry:mp},U2=Object.freeze(Object.defineProperty({__proto__:null,author:fp,default:W2,description:up,geometry:mp,license:pp,name:lp,roles:gp,typography:hp,version:cp,vibe:dp},Symbol.toStringTag,{value:"Module"})),yp="bold-signal",vp="1.0.0",bp="Bold Signal — Archivo Black on dark gradient with vibrant orange card focal (frontend-slides STYLE_PRESETS).",xp="Bold Signal — #1a1a1a dark, orange card #FF5722, Archivo Black + Space Grotesk (frontend-slides Bold Signal).",kp="MIT",wp="Timur Isachenko",Sp={bg:"#1a1a1a",bg2:"#2d2d2d",text:"#ffffff",muted:"#a0a0a0",accent:"#FF5722",accent2:"#FF8A65",cardBg:"#FF5722",border:"rgba(255,255,255,0.12)"},_p={headingFont:"'Archivo Black', system-ui, sans-serif",bodyFont:"'Space Grotesk', system-ui, sans-serif",headingWeight:400,googleFonts:["Archivo+Black","Space+Grotesk:wght@400;500;600"]},$p={radius:"16px",slideWidth:"1280px"},G2={name:yp,version:vp,extends:"default-tech",description:bp,vibe:xp,license:kp,author:wp,roles:Sp,typography:_p,geometry:$p},H2=Object.freeze(Object.defineProperty({__proto__:null,author:wp,default:G2,description:bp,geometry:$p,license:kp,name:yp,roles:Sp,typography:_p,version:vp,vibe:xp},Symbol.toStringTag,{value:"Module"})),Ep="botanical-luxe",Cp="0.1.0",Fp="Botanical luxe — deep forest green, gold leaf, serif elegance for impact reports.",jp="Botanical luxe — forest #1d3a2f, gold #bfa55a, Cormorant + DM Sans (matches Verdant gallery).",Tp="MIT",Pp="Timur Isachenko",Mp={bg:"#1d3a2f",bg2:"#162d24",text:"#f3efe4",muted:"#6b9e7a",accent:"#bfa55a",accent2:"#4a7c59",cardBg:"rgba(191,165,90,0.08)",border:"rgba(191,165,90,0.28)"},Np={headingFont:"'Cormorant Garamond', Georgia, serif",bodyFont:"'DM Sans', system-ui, sans-serif",headingWeight:600,googleFonts:["Cormorant+Garamond:wght@500;600;700","DM+Sans:wght@400;600"]},Ip={radius:"8px",slideWidth:"1280px"},V2={name:Ep,version:Cp,extends:"default-tech",description:Fp,vibe:jp,license:Tp,author:Pp,roles:Mp,typography:Np,geometry:Ip},Q2=Object.freeze(Object.defineProperty({__proto__:null,author:Pp,default:V2,description:Fp,geometry:Ip,license:Tp,name:Ep,roles:Mp,typography:Np,version:Cp,vibe:jp},Symbol.toStringTag,{value:"Module"})),zp="broadsheet",Op="0.1.0",Bp="Newspaper broadsheet — warm newsprint, deep ink, Pirata One masthead + Playfair.",Dp="Broadsheet — #f2ece0 newsprint, ink #1a1208, Pirata One masthead (matches Daily Ledger gallery).",Lp="MIT",Ap="Timur Isachenko",Rp={bg:"#f2ece0",bg2:"#e8dfc8",text:"#1a1208",muted:"#8a7560",accent:"#1a1208",accent2:"#5c4d38",cardBg:"rgba(26,18,8,0.04)",border:"rgba(26,18,8,0.18)"},Wp={headingFont:"'Playfair Display', Georgia, serif",bodyFont:"'Lora', Georgia, serif",headingWeight:700,googleFonts:["Pirata+One","Playfair+Display:wght@500;700","Lora:wght@400;600"]},Up={radius:"0px",slideWidth:"1280px"},Y2={name:zp,version:Op,extends:"default-tech",description:Bp,vibe:Dp,license:Lp,author:Ap,roles:Rp,typography:Wp,geometry:Up},K2=Object.freeze(Object.defineProperty({__proto__:null,author:Ap,default:Y2,description:Bp,geometry:Up,license:Lp,name:zp,roles:Rp,typography:Wp,version:Op,vibe:Dp},Symbol.toStringTag,{value:"Module"})),Gp="broadside",Hp="1.0.0",Vp="Broadside — dark editorial canvas with fire-orange accent and massive Barlow type (frontend-slides).",Qp="Broadside — ink #111111, fire orange #E85D26, cream #F0ECE5, Barlow 900 + IBM Plex Mono (frontend-slides broadside).",Yp="MIT",Kp="Timur Isachenko",Jp={bg:"#111111",bg2:"#1A1A18",text:"#F0ECE5",muted:"#888880",accent:"#E85D26",accent2:"#F0ECE5",cardBg:"rgba(232,93,38,0.12)",border:"rgba(40,40,38,1)"},Xp={headingFont:"'Barlow', system-ui, sans-serif",bodyFont:"'Barlow', system-ui, sans-serif",headingWeight:900,googleFonts:["Barlow:wght@400;700;900","IBM+Plex+Mono:wght@400;500"]},qp={radius:"0px",slideWidth:"1280px"},J2={name:Gp,version:Hp,extends:"default-tech",description:Vp,vibe:Qp,license:Yp,author:Kp,roles:Jp,typography:Xp,geometry:qp},X2=Object.freeze(Object.defineProperty({__proto__:null,author:Kp,default:J2,description:Vp,geometry:qp,license:Yp,name:Gp,roles:Jp,typography:Xp,version:Hp,vibe:Qp},Symbol.toStringTag,{value:"Module"})),Zp="brutalist-acid",ef="0.1.0",nf="Dark acid brutalist — near-black concrete, #d6ff00 hazard lime, hard mono edges.",tf="Acid brutalist — #1c1c1c, electric lime, Space Mono + Barlow Condensed (matches MONOLITH gallery).",rf="MIT",of="Timur Isachenko",af={bg:"#1c1c1c",bg2:"#2a2a2a",text:"#e8e6e1",muted:"#888888",accent:"#d6ff00",accent2:"#ffffff",cardBg:"rgba(214,255,0,0.06)",border:"rgba(214,255,0,0.35)"},sf={headingFont:"'Space Mono', monospace",bodyFont:"'Barlow Condensed', system-ui, sans-serif",headingWeight:700,googleFonts:["Space+Mono:wght@400;700","Barlow+Condensed:wght@500;700"]},lf={radius:"0px",slideWidth:"1280px"},q2={name:Zp,version:ef,extends:"default-tech",description:nf,vibe:tf,license:rf,author:of,roles:af,typography:sf,geometry:lf},Z2=Object.freeze(Object.defineProperty({__proto__:null,author:of,default:q2,description:nf,geometry:lf,license:rf,name:Zp,roles:af,typography:sf,version:ef,vibe:tf},Symbol.toStringTag,{value:"Module"})),cf="brutalist-mono",uf="0.1.0",df="Raw brutalist theme with concrete-grey background, monospace type, hard square corners, and a single hazard-orange accent.",pf="Raw brutalist / technical — concrete off-white bg, near-black monospace ink, hazard-orange accent, thick black hairlines, zero radius.",ff="MIT",gf="Timur Isachenko",hf={bg:"#f0efe9",bg2:"#e3e1d8",text:"#0a0a0a",muted:"#57554c",accent:"#ff3600",accent2:"#0a0a0a",cardBg:"#ffffff",border:"rgba(10,10,10,0.85)"},mf={headingFont:"'IBM Plex Mono', 'Courier New', monospace",bodyFont:"'IBM Plex Mono', 'Courier New', monospace",headingWeight:700,googleFonts:["IBM+Plex+Mono:wght@400;600;700"]},yf={radius:"0px",slideWidth:"1280px"},ek={name:cf,version:uf,extends:"default-tech",description:df,vibe:pf,license:ff,author:gf,roles:hf,typography:mf,geometry:yf},nk=Object.freeze(Object.defineProperty({__proto__:null,author:gf,default:ek,description:df,geometry:yf,license:ff,name:cf,roles:hf,typography:mf,version:uf,vibe:pf},Symbol.toStringTag,{value:"Module"})),vf="candy-pop",bf="0.1.0",xf="Candy pop — cream canvas, hot pink + butter yellow, soft blobs, rounded type.",kf="Candy pop — cream canvas, hot pink + jellybean blue, Fredoka + Poppins (matches Jellybean gallery).",wf="MIT",Sf="Timur Isachenko",_f={bg:"#fdf3e7",bg2:"#f7e8d4",text:"#1a1a2e",muted:"#7a6a80",accent:"#ff5d8f",accent2:"#2d7dd2",cardBg:"rgba(255,93,143,0.08)",border:"rgba(26,26,46,0.14)"},$f={headingFont:"'Fredoka', system-ui, sans-serif",bodyFont:"'Poppins', system-ui, sans-serif",headingWeight:700,googleFonts:["Fredoka:wght@500;700","Poppins:wght@400;600"]},Ef={radius:"28px",slideWidth:"1280px"},tk={name:vf,version:bf,extends:"default-tech",description:xf,vibe:kf,license:wf,author:Sf,roles:_f,typography:$f,geometry:Ef},rk=Object.freeze(Object.defineProperty({__proto__:null,author:Sf,default:tk,description:xf,geometry:Ef,license:wf,name:vf,roles:_f,typography:$f,version:bf,vibe:kf},Symbol.toStringTag,{value:"Module"})),Cf="capsule",Ff="1.0.0",jf="Capsule — modular pill cards on warm bone, Bodoni Moda + Space Grotesk candy palette (frontend-slides bold-template-pack).",Tf="Capsule — cream #F5F5F0, coral/lime/lavender/sky pops, Bodoni Moda + Space Grotesk pills (frontend-slides capsule).",Pf="MIT",Mf="Timur Isachenko",Nf={bg:"#F5F5F0",bg2:"#FFFFFF",text:"#1A1A1A",muted:"#5A5A5A",accent:"#E85D4E",accent2:"#C4D94E",cardBg:"#FFFFFF",border:"#1E1E1E"},If={headingFont:"'Bodoni Moda', Georgia, serif",bodyFont:"'Space Grotesk', system-ui, sans-serif",headingWeight:700,googleFonts:["Bodoni+Moda:opsz,wght@6..96,400;700;800","Space+Grotesk:wght@400;500;600;700"]},zf={radius:"9999px",slideWidth:"1280px"},ok={name:Cf,version:Ff,extends:"default-tech",description:jf,vibe:Tf,license:Pf,author:Mf,roles:Nf,typography:If,geometry:zf},ak=Object.freeze(Object.defineProperty({__proto__:null,author:Mf,default:ok,description:jf,geometry:zf,license:Pf,name:Cf,roles:Nf,typography:If,version:Ff,vibe:Tf},Symbol.toStringTag,{value:"Module"})),Of="cobalt-grid",Bf="1.0.0",Df="Cobalt Grid — graph-paper canvas, electric cobalt Newsreader, stair-step panels (frontend-slides bold-template-pack).",Lf="Cobalt Grid — paper #F0EBDE, cobalt #1F2BE0, Newsreader + Hanken Grotesk (frontend-slides cobalt-grid).",Af="MIT",Rf="Timur Isachenko",Wf={bg:"#F0EBDE",bg2:"#E6E0CE",text:"#1F2BE0",muted:"#5560E5",accent:"#1F2BE0",accent2:"#1F2BE0",cardBg:"rgba(255,255,255,0.55)",border:"rgba(31,43,224,0.18)"},Uf={headingFont:"'Newsreader', Georgia, serif",bodyFont:"'Hanken Grotesk', system-ui, sans-serif",headingWeight:600,googleFonts:["Newsreader:opsz,wght@6..72,400;500;600;700","Hanken+Grotesk:wght@400;500;600;700","DM+Mono:wght@400;500"]},Gf={radius:"0px",slideWidth:"1280px"},ik={name:Of,version:Bf,extends:"default-tech",description:Df,vibe:Lf,license:Af,author:Rf,roles:Wf,typography:Uf,geometry:Gf},sk=Object.freeze(Object.defineProperty({__proto__:null,author:Rf,default:ik,description:Df,geometry:Gf,license:Af,name:Of,roles:Wf,typography:Uf,version:Bf,vibe:Lf},Symbol.toStringTag,{value:"Module"})),Hf="coral",Vf="1.0.0",Qf="Coral — cream/coral/ink planes, Bebas Neue caps, 45° hatch (frontend-slides bold-template-pack).",Yf="Coral — cream #F5F0E8 + coral #E85D5D on ink #1A1A1A, Bebas Neue + Inter (frontend-slides coral).",Kf="MIT",Jf="Timur Isachenko",Xf={bg:"#F5F0E8",bg2:"#E85D5D",text:"#1A1A1A",muted:"#6B6B6B",accent:"#E85D5D",accent2:"#1A1A1A",cardBg:"#FFFFFF",border:"rgba(26,26,26,0.85)"},qf={headingFont:"'Bebas Neue', sans-serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:400,googleFonts:["Bebas+Neue","Inter:wght@300;400;500;600"]},Zf={radius:"0px",slideWidth:"1280px"},lk={name:Hf,version:Vf,extends:"default-tech",description:Qf,vibe:Yf,license:Kf,author:Jf,roles:Xf,typography:qf,geometry:Zf},ck=Object.freeze(Object.defineProperty({__proto__:null,author:Jf,default:lk,description:Qf,geometry:Zf,license:Kf,name:Hf,roles:Xf,typography:qf,version:Vf,vibe:Yf},Symbol.toStringTag,{value:"Module"})),eg="corporate",ng="0.1.0",tg="Formal corporate presentation theme with crisp white background and restrained navy/blue palette.",rg="Formal corporate — crisp white, navy text, single restrained blue accent, clean sans-serif, thin rules, minimal shadow.",og="MIT",ag="Timur Isachenko",ig={bg:"#ffffff",bg2:"#f8f9fc",text:"#1a2035",muted:"#6b7280",accent:"#1d4ed8",accent2:"#0369a1",cardBg:"#f1f5f9",border:"rgba(0,0,0,0.08)"},sg={headingFont:"'Inter', system-ui, sans-serif",bodyFont:"'Source Sans 3', system-ui, sans-serif",headingWeight:700,googleFonts:["Inter:wght@400;700","Source+Sans+3:wght@400;600"]},lg={radius:"8px",slideWidth:"1280px"},uk={name:eg,version:ng,extends:"default-tech",description:tg,vibe:rg,license:og,author:ag,roles:ig,typography:sg,geometry:lg},dk=Object.freeze(Object.defineProperty({__proto__:null,author:ag,default:uk,description:tg,geometry:lg,license:og,name:eg,roles:ig,typography:sg,version:ng,vibe:rg},Symbol.toStringTag,{value:"Module"})),cg="creative-mode",ug="1.0.0",dg="Creative Mode — cream canvas, hard ink borders, forest/pink/orange/yellow blocks, Archivo Black (frontend-slides).",pg="Creative Mode — cream #EFE9D9, ink #0F0F0F, green #1F8A4C + pink #F06CA8, Archivo Black + Space Grotesk (frontend-slides creative-mode).",fg="MIT",gg="Timur Isachenko",hg={bg:"#EFE9D9",bg2:"#E4DCC4",text:"#0F0F0F",muted:"#2A2A2A",accent:"#E85A1F",accent2:"#F06CA8",cardBg:"#F5C518",border:"rgba(15,15,15,0.95)"},mg={headingFont:"'Archivo Black', system-ui, sans-serif",bodyFont:"'Space Grotesk', system-ui, sans-serif",headingWeight:400,googleFonts:["Archivo+Black","Space+Grotesk:wght@400;600","JetBrains+Mono:wght@400;500"]},yg={radius:"0px",slideWidth:"1280px"},pk={name:cg,version:ug,extends:"default-tech",description:dg,vibe:pg,license:fg,author:gg,roles:hg,typography:mg,geometry:yg},fk=Object.freeze(Object.defineProperty({__proto__:null,author:gg,default:pk,description:dg,geometry:yg,license:fg,name:cg,roles:hg,typography:mg,version:ug,vibe:pg},Symbol.toStringTag,{value:"Module"})),vg="creative-voltage",bg="1.0.0",xg="Creative Voltage — electric blue + neon yellow, Syne + Space Mono (frontend-slides STYLE_PRESETS).",kg="Creative Voltage — electric blue #0066ff, dark #1a1a2e, neon #d4ff00, Syne + Space Mono (frontend-slides Creative Voltage).",wg="MIT",Sg="Timur Isachenko",_g={bg:"#0066ff",bg2:"#1a1a2e",text:"#ffffff",muted:"rgba(255,255,255,0.7)",accent:"#d4ff00",accent2:"#ffffff",cardBg:"rgba(26,26,46,0.55)",border:"rgba(212,255,0,0.45)"},$g={headingFont:"'Syne', system-ui, sans-serif",bodyFont:"'Space Mono', monospace",headingWeight:800,googleFonts:["Syne:wght@700;800","Space+Mono:wght@400;700"]},Eg={radius:"0px",slideWidth:"1280px"},gk={name:vg,version:bg,extends:"default-tech",description:xg,vibe:kg,license:wg,author:Sg,roles:_g,typography:$g,geometry:Eg},hk=Object.freeze(Object.defineProperty({__proto__:null,author:Sg,default:gk,description:xg,geometry:Eg,license:wg,name:vg,roles:_g,typography:$g,version:bg,vibe:kg},Symbol.toStringTag,{value:"Module"})),Cg="crt-terminal",Fg="0.1.0",jg="CRT phosphor terminal — near-black, acid green glow, cyan accents, monospace.",Tg="CRT terminal — void bg, cream type, phosphor green + cyan accents (matches RetroNet gallery).",Pg="MIT",Mg="Timur Isachenko",Ng={bg:"#06040a",bg2:"#1a1010",text:"#f5f0e8",muted:"#8a8578",accent:"#39ff14",accent2:"#00f5ff",cardBg:"rgba(57,255,20,0.06)",border:"rgba(57,255,20,0.28)"},Ig={headingFont:"'VT323', monospace",bodyFont:"'Share Tech Mono', monospace",headingWeight:400,googleFonts:["VT323","Share+Tech+Mono","Courier+Prime"]},zg={radius:"0px",slideWidth:"1280px"},mk={name:Cg,version:Fg,extends:"default-tech",description:jg,vibe:Tg,license:Pg,author:Mg,roles:Ng,typography:Ig,geometry:zg},yk=Object.freeze(Object.defineProperty({__proto__:null,author:Mg,default:mk,description:jg,geometry:zg,license:Pg,name:Cg,roles:Ng,typography:Ig,version:Fg,vibe:Tg},Symbol.toStringTag,{value:"Module"})),Og="dark-botanical",Bg="1.0.0",Dg="Dark Botanical — Cormorant on near-black with warm pink/gold accents (frontend-slides STYLE_PRESETS).",Lg="Dark Botanical — #0f0f0f void, warm #d4a574/#e8b4b8 accents, Cormorant + IBM Plex Sans (frontend-slides Dark Botanical).",Ag="MIT",Rg="Timur Isachenko",Wg={bg:"#0f0f0f",bg2:"#1a1816",text:"#e8e4df",muted:"#9a9590",accent:"#d4a574",accent2:"#e8b4b8",cardBg:"rgba(232,228,223,0.06)",border:"rgba(232,228,223,0.12)"},Ug={headingFont:"'Cormorant', Georgia, serif",bodyFont:"'IBM Plex Sans', system-ui, sans-serif",headingWeight:600,googleFonts:["Cormorant:ital,wght@0,400;0,600;1,400;1,600","IBM+Plex+Sans:wght@300;400"]},Gg={radius:"0px",slideWidth:"1280px"},vk={name:Og,version:Bg,extends:"default-tech",description:Dg,vibe:Lg,license:Ag,author:Rg,roles:Wg,typography:Ug,geometry:Gg},bk=Object.freeze(Object.defineProperty({__proto__:null,author:Rg,default:vk,description:Dg,geometry:Gg,license:Ag,name:Og,roles:Wg,typography:Ug,version:Bg,vibe:Lg},Symbol.toStringTag,{value:"Module"})),Hg="data-editorial",Vg="0.1.0",Qg="Data editorial — white report field, navy + chart red, Source Serif + Inter.",Yg="Data editorial — white/#1a1a1a, navy #2b6cb0 + signal #e63946 (matches Signalbox gallery).",Kg="MIT",Jg="Timur Isachenko",Xg={bg:"#ffffff",bg2:"#f5f5f5",text:"#1a1a1a",muted:"#616161",accent:"#2b6cb0",accent2:"#e63946",cardBg:"rgba(26,26,26,0.03)",border:"rgba(26,26,26,0.12)"},qg={headingFont:"'Source Serif 4', Georgia, serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:700,googleFonts:["Source+Serif+4:wght@600;700","Inter:wght@400;600"]},Zg={radius:"4px",slideWidth:"1280px"},xk={name:Hg,version:Vg,extends:"default-tech",description:Qg,vibe:Yg,license:Kg,author:Jg,roles:Xg,typography:qg,geometry:Zg},kk=Object.freeze(Object.defineProperty({__proto__:null,author:Jg,default:xk,description:Qg,geometry:Zg,license:Kg,name:Hg,roles:Xg,typography:qg,version:Vg,vibe:Yg},Symbol.toStringTag,{value:"Module"})),eh="developer-dark",nh="0.1.0",th="Developer dark — GitHub-night canvas, green success, blue links, JetBrains Mono.",rh="Developer dark — #0d1117, #3fb950 + #58a6ff, JetBrains Mono + Inter (matches Forge gallery).",oh="MIT",ah="Timur Isachenko",ih={bg:"#0d1117",bg2:"#161b22",text:"#e6edf3",muted:"#8b949e",accent:"#3fb950",accent2:"#58a6ff",cardBg:"rgba(48,54,61,0.55)",border:"rgba(48,54,61,0.9)"},sh={headingFont:"'Inter', system-ui, sans-serif",bodyFont:"'JetBrains Mono', monospace",headingWeight:700,googleFonts:["Inter:wght@600;700","JetBrains+Mono:wght@400;600"]},lh={radius:"8px",slideWidth:"1280px"},wk={name:eh,version:nh,extends:"default-tech",description:th,vibe:rh,license:oh,author:ah,roles:ih,typography:sh,geometry:lh},Sk=Object.freeze(Object.defineProperty({__proto__:null,author:ah,default:wk,description:th,geometry:lh,license:oh,name:eh,roles:ih,typography:sh,version:nh,vibe:rh},Symbol.toStringTag,{value:"Module"})),ch="editorial-forest",uh="1.0.0",dh="Editorial Forest — Source Serif 4 on oat-cream with forest green and dusty rose (frontend-slides).",ph="Editorial Forest — cream #efe7d4, forest #2e4a2a + dusty rose #e89cb1, Source Serif 4 + JetBrains Mono (frontend-slides editorial-forest).",fh="MIT",gh="Timur Isachenko",hh={bg:"#efe7d4",bg2:"#e6dcc4",text:"#1a1a17",muted:"#6a655c",accent:"#2e4a2a",accent2:"#e89cb1",cardBg:"rgba(46,74,42,0.06)",border:"rgba(26,26,23,0.16)"},mh={headingFont:"'Source Serif 4', 'Source Serif Pro', Georgia, serif",bodyFont:"'Source Serif 4', Georgia, serif",headingWeight:500,googleFonts:["Source+Serif+4:opsz,wght@8..60,500;8..60,600","JetBrains+Mono:wght@400;500"]},yh={radius:"4px",slideWidth:"1280px"},_k={name:ch,version:uh,extends:"default-tech",description:dh,vibe:ph,license:fh,author:gh,roles:hh,typography:mh,geometry:yh},$k=Object.freeze(Object.defineProperty({__proto__:null,author:gh,default:_k,description:dh,geometry:yh,license:fh,name:ch,roles:hh,typography:mh,version:uh,vibe:ph},Symbol.toStringTag,{value:"Module"})),vh="editorial-serif",bh="0.1.0",xh="Magazine-editorial theme with warm paper background, ink-black serif text, and a single masthead-crimson accent.",kh="Print magazine editorial — warm cream paper, near-black serif ink, crimson masthead accent, thin hairline rules, square corners.",wh="MIT",Sh="Timur Isachenko",_h={bg:"#faf7f2",bg2:"#f2ede3",text:"#1c1a17",muted:"#5c574c",accent:"#9c1c1c",accent2:"#a67c1e",cardBg:"#f2ede3",border:"rgba(28,26,23,0.12)"},$h={headingFont:"'Playfair Display', Georgia, serif",bodyFont:"'Source Serif 4', Georgia, serif",headingWeight:700,googleFonts:["Playfair+Display:wght@700;900","Source+Serif+4:wght@400;600"]},Eh={radius:"2px",slideWidth:"1280px"},Ek={name:vh,version:bh,extends:"default-tech",description:xh,vibe:kh,license:wh,author:Sh,roles:_h,typography:$h,geometry:Eh},Ck=Object.freeze(Object.defineProperty({__proto__:null,author:Sh,default:Ek,description:xh,geometry:Eh,license:wh,name:vh,roles:_h,typography:$h,version:bh,vibe:kh},Symbol.toStringTag,{value:"Module"})),Ch="editorial-tri-tone",Fh="1.0.0",jh="Editorial Tri-Tone — blush pink, golden butter, burgundy wine; Bricolage Grotesque + Instrument Serif (frontend-slides).",Th="Editorial Tri-Tone — pink #F2B6C6, butter #F2D86A, burgundy #7A1F35, Bricolage Grotesque + Instrument Serif (frontend-slides editorial-tri-tone).",Ph="MIT",Mh="Timur Isachenko",Nh={bg:"#F2B6C6",bg2:"#F2D86A",text:"#7A1F35",muted:"rgba(122,31,53,0.65)",accent:"#7A1F35",accent2:"#F2D86A",cardBg:"rgba(242,216,106,0.55)",border:"rgba(122,31,53,0.35)"},Ih={headingFont:"'Bricolage Grotesque', system-ui, sans-serif",bodyFont:"'Instrument Serif', Georgia, serif",headingWeight:800,googleFonts:["Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800","Instrument+Serif:ital@0;1","JetBrains+Mono:wght@400;500"]},zh={radius:"0px",slideWidth:"1280px"},Fk={name:Ch,version:Fh,extends:"default-tech",description:jh,vibe:Th,license:Ph,author:Mh,roles:Nh,typography:Ih,geometry:zh},jk=Object.freeze(Object.defineProperty({__proto__:null,author:Mh,default:Fk,description:jh,geometry:zh,license:Ph,name:Ch,roles:Nh,typography:Ih,version:Fh,vibe:Th},Symbol.toStringTag,{value:"Module"})),Oh="electric-studio",Bh="1.0.0",Dh="Electric Studio — split white/blue panels, Manrope, accent bar (frontend-slides STYLE_PRESETS).",Lh="Electric Studio — white + #4361ee blue split, Manrope 800, high-contrast studio panels (frontend-slides Electric Studio).",Ah="MIT",Rh="Timur Isachenko",Wh={bg:"#ffffff",bg2:"#4361ee",text:"#0a0a0a",muted:"#5a5a5a",accent:"#4361ee",accent2:"#ffffff",cardBg:"rgba(67,97,238,0.08)",border:"rgba(10,10,10,0.12)"},Uh={headingFont:"'Manrope', system-ui, sans-serif",bodyFont:"'Manrope', system-ui, sans-serif",headingWeight:800,googleFonts:["Manrope:wght@400;500;800"]},Gh={radius:"0px",slideWidth:"1280px"},Tk={name:Oh,version:Bh,extends:"default-tech",description:Dh,vibe:Lh,license:Ah,author:Rh,roles:Wh,typography:Uh,geometry:Gh},Pk=Object.freeze(Object.defineProperty({__proto__:null,author:Rh,default:Tk,description:Dh,geometry:Gh,license:Ah,name:Oh,roles:Wh,typography:Uh,version:Bh,vibe:Lh},Symbol.toStringTag,{value:"Module"})),Hh="emerald-editorial",Vh="1.0.0",Qh="Emerald Editorial — saturated emerald canvas, navy ink, oat paper, Bodoni Moda (frontend-slides bold-template-pack).",Yh="Emerald Editorial — emerald #3CD896, navy #0F1A5C, paper #F1E9D6, Bodoni Moda + Manrope (frontend-slides emerald-editorial).",Kh="MIT",Jh="Timur Isachenko",Xh={bg:"#3CD896",bg2:"#2DC684",text:"#0F1A5C",muted:"#3A4593",accent:"#0F1A5C",accent2:"#F1E9D6",cardBg:"#F1E9D6",border:"rgba(15,26,92,0.85)"},qh={headingFont:"'Bodoni Moda', Georgia, serif",bodyFont:"'Manrope', system-ui, sans-serif",headingWeight:900,googleFonts:["Bodoni+Moda:opsz,wght@6..96,400;700;800;900","Manrope:wght@400;500;600;700"]},Zh={radius:"0px",slideWidth:"1280px"},Mk={name:Hh,version:Vh,extends:"default-tech",description:Qh,vibe:Yh,license:Kh,author:Jh,roles:Xh,typography:qh,geometry:Zh},Nk=Object.freeze(Object.defineProperty({__proto__:null,author:Jh,default:Mk,description:Qh,geometry:Zh,license:Kh,name:Hh,roles:Xh,typography:qh,version:Vh,vibe:Yh},Symbol.toStringTag,{value:"Module"})),e0="fintech-clean",n0="0.1.0",t0="Fintech clean — near-white, Stripe-like violet accent, mint success, Inter.",r0="Fintech clean — #fbfbfd, violet #635bff + mint #00d4b1, Inter (matches Ledgerline gallery).",o0="MIT",a0="Timur Isachenko",i0={bg:"#fbfbfd",bg2:"#f0eeff",text:"#0a0a0a",muted:"#6b7280",accent:"#635bff",accent2:"#00d4b1",cardBg:"#ffffff",border:"rgba(99,91,255,0.18)"},s0={headingFont:"'Inter', system-ui, sans-serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:700,googleFonts:["Inter:wght@400;600;700"]},l0={radius:"12px",slideWidth:"1280px"},Ik={name:e0,version:n0,extends:"default-tech",description:t0,vibe:r0,license:o0,author:a0,roles:i0,typography:s0,geometry:l0},zk=Object.freeze(Object.defineProperty({__proto__:null,author:a0,default:Ik,description:t0,geometry:l0,license:o0,name:e0,roles:i0,typography:s0,version:n0,vibe:r0},Symbol.toStringTag,{value:"Module"})),c0="ft-editorial",u0="0.1.0",d0="Financial Times–inspired broadsheet — warm paper, ink, FT blue + signal red.",p0="FT editorial — #f7f5f0 newsprint, Libre Baskerville + IBM Plex, FT blue + signal red (matches Meridian gallery).",f0="MIT",g0="Timur Isachenko",h0={bg:"#f7f5f0",bg2:"#f2efe8",text:"#0a0a0a",muted:"#6b6560",accent:"#1a4fd8",accent2:"#c0392b",cardBg:"rgba(10,10,10,0.03)",border:"rgba(10,10,10,0.12)"},m0={headingFont:"'Libre Baskerville', Georgia, serif",bodyFont:"'IBM Plex Sans', system-ui, sans-serif",headingWeight:700,googleFonts:["Libre+Baskerville:wght@400;700","IBM+Plex+Sans:wght@400;600","IBM+Plex+Mono:wght@500"]},y0={radius:"0px",slideWidth:"1280px"},Ok={name:c0,version:u0,extends:"default-tech",description:d0,vibe:p0,license:f0,author:g0,roles:h0,typography:m0,geometry:y0},Bk=Object.freeze(Object.defineProperty({__proto__:null,author:g0,default:Ok,description:d0,geometry:y0,license:f0,name:c0,roles:h0,typography:m0,version:u0,vibe:p0},Symbol.toStringTag,{value:"Module"})),v0="genz-bento",b0="0.1.0",x0="Gen-Z hard-shadow bento — hot coral, lime stickers, chunky ink borders.",k0="Gen-Z bento — #fff9f5, coral #ff4d2e + lime #b6f542, Nunito hard shadows (matches Bounce gallery).",w0="MIT",S0="Timur Isachenko",_0={bg:"#fff9f5",bg2:"#fff3ea",text:"#0f0f1a",muted:"#5c5666",accent:"#ff4d2e",accent2:"#b6f542",cardBg:"#ffffff",border:"#0f0f1a"},$0={headingFont:"'Nunito', system-ui, sans-serif",bodyFont:"'Nunito Sans', system-ui, sans-serif",headingWeight:900,googleFonts:["Nunito:wght@700;800;900","Nunito+Sans:wght@400;600"]},E0={radius:"18px",slideWidth:"1280px"},Dk={name:v0,version:b0,extends:"default-tech",description:x0,vibe:k0,license:w0,author:S0,roles:_0,typography:$0,geometry:E0},Lk=Object.freeze(Object.defineProperty({__proto__:null,author:S0,default:Dk,description:x0,geometry:E0,license:w0,name:v0,roles:_0,typography:$0,version:b0,vibe:k0},Symbol.toStringTag,{value:"Module"})),C0="glassmorphism",F0="0.1.0",j0="Soft glassmorphism — icy lavender field, indigo + cyan accents, Plus Jakarta Sans.",T0="Glassmorphism — #f8f9ff mist, indigo #5b6af5 + cyan #22d3ee, Plus Jakarta Sans (matches CloudPeak gallery).",P0="MIT",M0="Timur Isachenko",N0={bg:"#f8f9ff",bg2:"#f0f3fd",text:"#0f1333",muted:"#7880a4",accent:"#5b6af5",accent2:"#22d3ee",cardBg:"rgba(255,255,255,0.72)",border:"rgba(91,106,245,0.22)"},I0={headingFont:"'Plus Jakarta Sans', system-ui, sans-serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:700,googleFonts:["Plus+Jakarta+Sans:wght@500;700","Inter:wght@400;600"]},z0={radius:"20px",slideWidth:"1280px"},Ak={name:C0,version:F0,extends:"default-tech",description:j0,vibe:T0,license:P0,author:M0,roles:N0,typography:I0,geometry:z0},Rk=Object.freeze(Object.defineProperty({__proto__:null,author:M0,default:Ak,description:j0,geometry:z0,license:P0,name:C0,roles:N0,typography:I0,version:F0,vibe:T0},Symbol.toStringTag,{value:"Module"})),O0="heritage-editorial",B0="0.1.0",D0="Heritage editorial — warm parchment, terracotta blush, Playfair + Cormorant serif.",L0="Heritage editorial — #f4efe9 parchment, terracotta #c98b7a, Playfair Display (matches Atelier No. 9 gallery).",A0="MIT",R0="Timur Isachenko",W0={bg:"#f4efe9",bg2:"#ede6dd",text:"#16130f",muted:"#9c8b7e",accent:"#c98b7a",accent2:"#a07854",cardBg:"rgba(22,19,15,0.04)",border:"rgba(22,19,15,0.12)"},U0={headingFont:"'Playfair Display', Georgia, serif",bodyFont:"'DM Sans', system-ui, sans-serif",headingWeight:700,googleFonts:["Playfair+Display:wght@500;700","Cormorant+Garamond:wght@500;600","DM+Sans:wght@400;600"]},G0={radius:"6px",slideWidth:"1280px"},Wk={name:O0,version:B0,extends:"default-tech",description:D0,vibe:L0,license:A0,author:R0,roles:W0,typography:U0,geometry:G0},Uk=Object.freeze(Object.defineProperty({__proto__:null,author:R0,default:Wk,description:D0,geometry:G0,license:A0,name:O0,roles:W0,typography:U0,version:B0,vibe:L0},Symbol.toStringTag,{value:"Module"})),H0="kinetic-wrapped",V0="0.1.0",Q0="Kinetic Wrapped — acid lime on black, Archivo Black, year-in-review energy.",Y0="Kinetic Wrapped — black + #c8ff00 acid lime, Archivo Black (matches Pulse gallery).",K0="MIT",J0="Timur Isachenko",X0={bg:"#0a0a0a",bg2:"#0d0d0d",text:"#ffffff",muted:"#888888",accent:"#c8ff00",accent2:"#ff00cc",cardBg:"rgba(200,255,0,0.08)",border:"rgba(200,255,0,0.4)"},q0={headingFont:"'Archivo Black', system-ui, sans-serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:400,googleFonts:["Archivo+Black","Inter:wght@400;600"]},Z0={radius:"0px",slideWidth:"1280px"},Gk={name:H0,version:V0,extends:"default-tech",description:Q0,vibe:Y0,license:K0,author:J0,roles:X0,typography:q0,geometry:Z0},Hk=Object.freeze(Object.defineProperty({__proto__:null,author:J0,default:Gk,description:Q0,geometry:Z0,license:K0,name:H0,roles:X0,typography:q0,version:V0,vibe:Y0},Symbol.toStringTag,{value:"Module"})),em="luxury-minimalist",nm="0.1.0",tm="Luxury minimalist theme with warm off-white canvas, dark charcoal, hairline borders, and no gradients.",rm="Luxury minimalist — warm off-white canvas, dark charcoal text, near-zero decoration, generous whitespace, thin serif display, hairline borders, no gradients.",om="MIT",am="Timur Isachenko",im={bg:"#faf8f5",bg2:"#f5f2ee",text:"#1c1917",muted:"#78716c",accent:"#92400e",accent2:"#b45309",cardBg:"rgba(28,25,23,0.03)",border:"rgba(28,25,23,0.10)"},sm={headingFont:"'Cormorant Garamond', Georgia, serif",bodyFont:"'DM Sans', system-ui, sans-serif",headingWeight:600,googleFonts:["Cormorant+Garamond:wght@400;600","DM+Sans:wght@400;500"]},lm={radius:"4px",slideWidth:"1280px"},Vk={name:em,version:nm,extends:"default-tech",description:tm,vibe:rm,license:om,author:am,roles:im,typography:sm,geometry:lm},Qk=Object.freeze(Object.defineProperty({__proto__:null,author:am,default:Vk,description:tm,geometry:lm,license:om,name:em,roles:im,typography:sm,version:nm,vibe:rm},Symbol.toStringTag,{value:"Module"})),cm="neo-grid-bold",um="1.0.0",dm="Neo-Grid Bold — putty ecru, ink black, electric lemon panels, Space Grotesk uppercase (frontend-slides).",pm="Neo-Grid Bold — putty #ECECE8, lemon #E6FF3D, Space Grotesk uppercase + JetBrains Mono (frontend-slides neo-grid-bold).",fm="MIT",gm="Timur Isachenko",hm={bg:"#ECECE8",bg2:"#F5F4EF",text:"#0A0A0A",muted:"#8A8A85",accent:"#E6FF3D",accent2:"#0A0A0A",cardBg:"#F5F4EF",border:"rgba(10,10,10,0.85)"},mm={headingFont:"'Space Grotesk', Helvetica Neue, Arial, sans-serif",bodyFont:"'JetBrains Mono', monospace",headingWeight:700,googleFonts:["Space+Grotesk:wght@500;700","JetBrains+Mono:wght@400;500"]},ym={radius:"0px",slideWidth:"1280px"},Yk={name:cm,version:um,extends:"default-tech",description:dm,vibe:pm,license:fm,author:gm,roles:hm,typography:mm,geometry:ym},Kk=Object.freeze(Object.defineProperty({__proto__:null,author:gm,default:Yk,description:dm,geometry:ym,license:fm,name:cm,roles:hm,typography:mm,version:um,vibe:pm},Symbol.toStringTag,{value:"Module"})),vm="neon-noir",bm="0.1.0",xm="Neon noir — wet asphalt night, hot magenta + electric cyan, cinematic rain.",km="Neon noir — #050510 night, hot pink #ff2e97 + cyan #00e5ff, Orbitron (matches Neon District gallery).",wm="MIT",Sm="Timur Isachenko",_m={bg:"#050510",bg2:"#0a0a1e",text:"#e8e4f0",muted:"#8884a8",accent:"#ff2e97",accent2:"#00e5ff",cardBg:"rgba(255,46,151,0.07)",border:"rgba(0,229,255,0.22)"},$m={headingFont:"'Orbitron', system-ui, sans-serif",bodyFont:"'Share Tech Mono', monospace",headingWeight:700,googleFonts:["Orbitron:wght@600;700","Share+Tech+Mono"]},Em={radius:"10px",slideWidth:"1280px"},Jk={name:vm,version:bm,extends:"default-tech",description:xm,vibe:km,license:wm,author:Sm,roles:_m,typography:$m,geometry:Em},Xk=Object.freeze(Object.defineProperty({__proto__:null,author:Sm,default:Jk,description:xm,geometry:Em,license:wm,name:vm,roles:_m,typography:$m,version:bm,vibe:km},Symbol.toStringTag,{value:"Module"})),Cm="notebook-tabs",Fm="1.0.0",jm="Notebook Tabs — cream paper card on dark with mint/lavender/pink tabs, Bodoni Moda (frontend-slides STYLE_PRESETS).",Tm="Notebook Tabs — page #f8f6f1 on outer #2d2d2d, Bodoni Moda + DM Sans, pastel tabs (frontend-slides Notebook Tabs).",Pm="MIT",Mm="Timur Isachenko",Nm={bg:"#f8f6f1",bg2:"#efece4",text:"#1a1a1a",muted:"#5c574c",accent:"#98d4bb",accent2:"#c7b8ea",cardBg:"#ffffff",border:"rgba(26,26,26,0.12)"},Im={headingFont:"'Bodoni Moda', Georgia, serif",bodyFont:"'DM Sans', system-ui, sans-serif",headingWeight:700,googleFonts:["Bodoni+Moda:opsz,wght@6..96,400;6..96,700","DM+Sans:wght@400;500"]},zm={radius:"12px",slideWidth:"1280px"},qk={name:Cm,version:Fm,extends:"default-tech",description:jm,vibe:Tm,license:Pm,author:Mm,roles:Nm,typography:Im,geometry:zm},Zk=Object.freeze(Object.defineProperty({__proto__:null,author:Mm,default:qk,description:jm,geometry:zm,license:Pm,name:Cm,roles:Nm,typography:Im,version:Fm,vibe:Tm},Symbol.toStringTag,{value:"Module"})),Om="paper-ink",Bm="1.0.0",Dm="Paper & Ink — Cormorant Garamond + Source Serif 4 on warm cream with crimson accent (frontend-slides STYLE_PRESETS).",Lm="Paper & Ink — cream #faf9f7, charcoal #1a1a1a, crimson #c41e3a, Cormorant Garamond + Source Serif 4 (frontend-slides Paper & Ink).",Am="MIT",Rm="Timur Isachenko",Wm={bg:"#faf9f7",bg2:"#f0eeea",text:"#1a1a1a",muted:"#5c574c",accent:"#c41e3a",accent2:"#1a1a1a",cardBg:"#ffffff",border:"rgba(26,26,26,0.15)"},Um={headingFont:"'Cormorant Garamond', Garamond, Georgia, serif",bodyFont:"'Source Serif 4', Georgia, serif",headingWeight:600,googleFonts:["Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500","Source+Serif+4:opsz,wght@8..60,400;8..60,600"]},Gm={radius:"0px",slideWidth:"1280px"},ew={name:Om,version:Bm,extends:"default-tech",description:Dm,vibe:Lm,license:Am,author:Rm,roles:Wm,typography:Um,geometry:Gm},nw=Object.freeze(Object.defineProperty({__proto__:null,author:Rm,default:ew,description:Dm,geometry:Gm,license:Am,name:Om,roles:Wm,typography:Um,version:Bm,vibe:Lm},Symbol.toStringTag,{value:"Module"})),Hm="pastel-dreamy",Vm="0.1.0",Qm="Soft pastel theme with lavender-blush background, deep plum text, and a blush/periwinkle accent pair.",Ym="Soft pastel dreamy — lavender-blush bg, deep plum text for readability, blush-pink + periwinkle accent pair, generously rounded, gentle.",Km="MIT",Jm="Timur Isachenko",Xm={bg:"#fdf6fb",bg2:"#f5ecf9",text:"#3a2e4d",muted:"#6b5d82",accent:"#e893c2",accent2:"#8ab4f8",cardBg:"#f5ecf9",border:"rgba(58,46,77,0.10)"},qm={headingFont:"'Quicksand', system-ui, sans-serif",bodyFont:"'Mulish', system-ui, sans-serif",headingWeight:700,googleFonts:["Quicksand:wght@500;700","Mulish:wght@400;600"]},Zm={radius:"28px",slideWidth:"1280px"},tw={name:Hm,version:Vm,extends:"default-tech",description:Qm,vibe:Ym,license:Km,author:Jm,roles:Xm,typography:qm,geometry:Zm},rw=Object.freeze(Object.defineProperty({__proto__:null,author:Jm,default:tw,description:Qm,geometry:Zm,license:Km,name:Hm,roles:Xm,typography:qm,version:Vm,vibe:Ym},Symbol.toStringTag,{value:"Module"})),ey="pastel-geometry",ny="1.0.0",ty="Pastel Geometry — Plus Jakarta Sans on sky pastel with vertical edge pills (frontend-slides STYLE_PRESETS).",ry="Pastel Geometry — sky #c8d9e6, card #faf9f7, vertical pastel pills, Plus Jakarta Sans (frontend-slides Pastel Geometry).",oy="MIT",ay="Timur Isachenko",iy={bg:"#c8d9e6",bg2:"#b8cddd",text:"#1a1a1a",muted:"#5a7c6a",accent:"#f0b4d4",accent2:"#9b8dc4",cardBg:"#faf9f7",border:"rgba(26,26,26,0.1)"},sy={headingFont:"'Plus Jakarta Sans', system-ui, sans-serif",bodyFont:"'Plus Jakarta Sans', system-ui, sans-serif",headingWeight:800,googleFonts:["Plus+Jakarta+Sans:wght@400;500;700;800"]},ly={radius:"24px",slideWidth:"1280px"},ow={name:ey,version:ny,extends:"default-tech",description:ty,vibe:ry,license:oy,author:ay,roles:iy,typography:sy,geometry:ly},aw=Object.freeze(Object.defineProperty({__proto__:null,author:ay,default:ow,description:ty,geometry:ly,license:oy,name:ey,roles:iy,typography:sy,version:ny,vibe:ry},Symbol.toStringTag,{value:"Module"})),cy="pin-and-paper",uy="1.0.0",dy="Pin & Paper — yellow legal-pad field with cobalt ink, Space Grotesk + Caveat (frontend-slides).",py="Pin & Paper — legal pad #EFE56A, cobalt #1F3A8A, Space Grotesk + Caveat (frontend-slides pin-and-paper).",fy="MIT",gy="Timur Isachenko",hy={bg:"#EFE56A",bg2:"#F5ECA0",text:"#1F3A8A",muted:"#3457C4",accent:"#C2342B",accent2:"#D8702A",cardBg:"#F8F1D6",border:"rgba(31,58,138,0.22)"},my={headingFont:"'Space Grotesk', Helvetica Neue, Arial, sans-serif",bodyFont:"'Space Grotesk', system-ui, sans-serif",headingWeight:700,googleFonts:["Space+Grotesk:wght@500;700","Caveat:wght@500;700","DM+Mono:wght@400;500"]},yy={radius:"8px",slideWidth:"1280px"},iw={name:cy,version:uy,extends:"default-tech",description:dy,vibe:py,license:fy,author:gy,roles:hy,typography:my,geometry:yy},sw=Object.freeze(Object.defineProperty({__proto__:null,author:gy,default:iw,description:dy,geometry:yy,license:fy,name:cy,roles:hy,typography:my,version:uy,vibe:py},Symbol.toStringTag,{value:"Module"})),vy="pink-script",by="1.0.0",xy="Pink Script (After Hours) — near-black canvas, fuchsia accent, pearl paper, DM Serif Display (frontend-slides bold-template-pack).",ky="Pink Script — ink #060507, pink #ED3D8C, blush paper #F5EDF1, DM Serif Display + Inter (frontend-slides pink-script).",wy="MIT",Sy="Timur Isachenko",_y={bg:"#060507",bg2:"#0F0D11",text:"#F5EDF1",muted:"rgba(245,237,241,0.55)",accent:"#ED3D8C",accent2:"#FF66A8",cardBg:"rgba(245,237,241,0.06)",border:"rgba(237,61,140,0.32)"},$y={headingFont:"'DM Serif Display', Georgia, serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:400,googleFonts:["DM+Serif+Display:ital@0;1","Inter:wght@300;400;500;600","JetBrains+Mono:wght@400;500"]},Ey={radius:"0px",slideWidth:"1280px"},lw={name:vy,version:by,extends:"default-tech",description:xy,vibe:ky,license:wy,author:Sy,roles:_y,typography:$y,geometry:Ey},cw=Object.freeze(Object.defineProperty({__proto__:null,author:Sy,default:lw,description:xy,geometry:Ey,license:wy,name:vy,roles:_y,typography:$y,version:by,vibe:ky},Symbol.toStringTag,{value:"Module"})),Cy="playful",Fy="0.1.0",jy="Playful creative-agency theme with bold coral and lime accents, rounded corners, and sticker-style energy.",Ty="Playful creative agency — bright warm white, bold coral + lime accent pair, rounded everything, big type, sticker-style shadows.",Py="MIT",My="Timur Isachenko",Ny={bg:"#fffbf0",bg2:"#fff9e6",text:"#1a1a2e",muted:"#6b6b8a",accent:"#ff4757",accent2:"#2ed573",cardBg:"rgba(255,71,87,0.06)",border:"rgba(255,71,87,0.15)"},Iy={headingFont:"'Nunito', system-ui, sans-serif",bodyFont:"'Nunito', system-ui, sans-serif",headingWeight:800,googleFonts:["Nunito:wght@400;700;800"]},zy={radius:"24px",slideWidth:"1280px"},uw={name:Cy,version:Fy,extends:"default-tech",description:jy,vibe:Ty,license:Py,author:My,roles:Ny,typography:Iy,geometry:zy},dw=Object.freeze(Object.defineProperty({__proto__:null,author:My,default:uw,description:jy,geometry:zy,license:Py,name:Cy,roles:Ny,typography:Iy,version:Fy,vibe:Ty},Symbol.toStringTag,{value:"Module"})),Oy="retro-arcade",By="0.1.0",Dy="Retro 80s arcade theme with deep purple-black background, magenta and cyan neon accents, and pixel display fonts.",Ly="Retro 80s arcade — deep purple-black bg, magenta + electric cyan neon, glow text-shadow, pixel display font, scanline feel.",Ay="MIT",Ry="Timur Isachenko",Wy={bg:"#0d0015",bg2:"#150025",text:"#e0e0ff",muted:"#9090cc",accent:"#ff00ff",accent2:"#00ffff",cardBg:"rgba(255,0,255,0.08)",border:"rgba(0,255,255,0.20)"},Uy={headingFont:"'Orbitron', system-ui, sans-serif",bodyFont:"'Share Tech Mono', monospace",headingWeight:700,googleFonts:["Orbitron:wght@400;700","Share+Tech+Mono"]},Gy={radius:"0px",slideWidth:"1280px"},pw={name:Oy,version:By,extends:"default-tech",description:Dy,vibe:Ly,license:Ay,author:Ry,roles:Wy,typography:Uy,geometry:Gy},fw=Object.freeze(Object.defineProperty({__proto__:null,author:Ry,default:pw,description:Dy,geometry:Gy,license:Ay,name:Oy,roles:Wy,typography:Uy,version:By,vibe:Ly},Symbol.toStringTag,{value:"Module"})),Hy="risograph-zine",Vy="0.1.0",Qy="Risograph zine — warm paper, misregistered ink, magenta + teal print shop energy.",Yy="Risograph zine — kraft #f3ecdd, red #ff4f4f + blue #2b3aff overprint (matches Inkwell gallery).",Ky="MIT",Jy="Timur Isachenko",Xy={bg:"#f3ecdd",bg2:"#e8dfc8",text:"#1a1209",muted:"#7a6a52",accent:"#ff4f4f",accent2:"#2b3aff",cardBg:"rgba(255,79,79,0.06)",border:"rgba(26,18,9,0.18)"},qy={headingFont:"'Archivo Black', system-ui, sans-serif",bodyFont:"'Space Mono', monospace",headingWeight:400,googleFonts:["Archivo+Black","Space+Mono:wght@400;700"]},Zy={radius:"2px",slideWidth:"1280px"},gw={name:Hy,version:Vy,extends:"default-tech",description:Qy,vibe:Yy,license:Ky,author:Jy,roles:Xy,typography:qy,geometry:Zy},hw=Object.freeze(Object.defineProperty({__proto__:null,author:Jy,default:gw,description:Qy,geometry:Zy,license:Ky,name:Hy,roles:Xy,typography:qy,version:Vy,vibe:Yy},Symbol.toStringTag,{value:"Module"})),ev="sakura-chroma",nv="1.0.0",tv="Sakura Chroma — cream paper cassette aesthetic, Big Shoulders Display, six-color chroma (frontend-slides bold-template-pack).",rv="Sakura Chroma — paper #F1E6CB, ink #3A2516, red/pink/orange/green/blue/yellow stamps, Big Shoulders Display + Albert Sans (frontend-slides sakura-chroma).",ov="MIT",av="Timur Isachenko",iv={bg:"#F1E6CB",bg2:"#E5D6B0",text:"#3A2516",muted:"#6B5340",accent:"#E5392A",accent2:"#E54489",cardBg:"#FFF8E8",border:"rgba(58,37,22,0.85)"},sv={headingFont:"'Big Shoulders Display', Impact, sans-serif",bodyFont:"'Albert Sans', system-ui, sans-serif",headingWeight:900,googleFonts:["Big+Shoulders+Display:wght@700;800;900","Albert+Sans:wght@400;500;600;700","JetBrains+Mono:wght@400;500"]},lv={radius:"4px",slideWidth:"1280px"},mw={name:ev,version:nv,extends:"default-tech",description:tv,vibe:rv,license:ov,author:av,roles:iv,typography:sv,geometry:lv},yw=Object.freeze(Object.defineProperty({__proto__:null,author:av,default:mw,description:tv,geometry:lv,license:ov,name:ev,roles:iv,typography:sv,version:nv,vibe:rv},Symbol.toStringTag,{value:"Module"})),cv="scandinavian",uv="0.1.0",dv="Scandinavian hygge — warm linen, sage green, soft clay, Fraunces + Work Sans.",pv="Scandinavian — #efe9df linen, sage #9caf88 + clay #c9826b (matches Hygge gallery).",fv="MIT",gv="Timur Isachenko",hv={bg:"#efe9df",bg2:"#e6ddd1",text:"#2b2926",muted:"#7a7470",accent:"#9caf88",accent2:"#c9826b",cardBg:"rgba(43,41,38,0.04)",border:"rgba(43,41,38,0.1)"},mv={headingFont:"'Fraunces', Georgia, serif",bodyFont:"'Work Sans', system-ui, sans-serif",headingWeight:600,googleFonts:["Fraunces:wght@500;600;700","Work+Sans:wght@400;600"]},yv={radius:"16px",slideWidth:"1280px"},vw={name:cv,version:uv,extends:"default-tech",description:dv,vibe:pv,license:fv,author:gv,roles:hv,typography:mv,geometry:yv},bw=Object.freeze(Object.defineProperty({__proto__:null,author:gv,default:vw,description:dv,geometry:yv,license:fv,name:cv,roles:hv,typography:mv,version:uv,vibe:pv},Symbol.toStringTag,{value:"Module"})),vv="signal",bv="1.0.0",xv="Signal — dual cream/navy editorial with antique gold accent, Source Serif 4 (frontend-slides).",kv="Signal — cream #F0ECE3 / navy #1C2644, gold #C8A870, Source Serif 4 + DM Sans (frontend-slides signal).",wv="MIT",Sv="Timur Isachenko",_v={bg:"#F0ECE3",bg2:"#E6E0D4",text:"#1A2030",muted:"#5A6270",accent:"#C8A870",accent2:"#1C2644",cardBg:"rgba(28,38,68,0.05)",border:"rgba(202,196,180,1)"},$v={headingFont:"'Source Serif 4', Georgia, serif",bodyFont:"'DM Sans', system-ui, sans-serif",headingWeight:600,googleFonts:["Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400","DM+Sans:wght@400;500","IBM+Plex+Mono:wght@400;500"]},Ev={radius:"2px",slideWidth:"1280px"},xw={name:vv,version:bv,extends:"default-tech",description:xv,vibe:kv,license:wv,author:Sv,roles:_v,typography:$v,geometry:Ev},kw=Object.freeze(Object.defineProperty({__proto__:null,author:Sv,default:xw,description:xv,geometry:Ev,license:wv,name:vv,roles:_v,typography:$v,version:bv,vibe:kv},Symbol.toStringTag,{value:"Module"})),Cv="soft-editorial",Fv="1.0.0",jv="Soft Editorial — Cormorant Garamond on warm cream paper with sage, blush, lemon, and lilac accents (frontend-slides / beautiful-html-templates).",Tv="Soft Editorial — paper #F2EEDF, ink #2A241B, sage #B7C7A8 + blush #E1A4C2, Cormorant Garamond + Work Sans (frontend-slides soft-editorial).",Pv="MIT",Mv="Timur Isachenko",Nv={bg:"#F2EEDF",bg2:"#ECE6D2",text:"#2A241B",muted:"#5C5345",accent:"#B7C7A8",accent2:"#E1A4C2",cardBg:"rgba(255,255,255,0.55)",border:"rgba(42,36,27,0.18)"},Iv={headingFont:"'Cormorant Garamond', Garamond, Georgia, serif",bodyFont:"'Work Sans', system-ui, sans-serif",headingWeight:500,googleFonts:["Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600","Work+Sans:wght@400;500;600"]},zv={radius:"28px",slideWidth:"1280px"},ww={name:Cv,version:Fv,extends:"default-tech",description:jv,vibe:Tv,license:Pv,author:Mv,roles:Nv,typography:Iv,geometry:zv},Sw=Object.freeze(Object.defineProperty({__proto__:null,author:Mv,default:ww,description:jv,geometry:zv,license:Pv,name:Cv,roles:Nv,typography:Iv,version:Fv,vibe:Tv},Symbol.toStringTag,{value:"Module"})),Ov="split-pastel",Bv="1.0.0",Dv="Split Pastel — peach/lavender vertical split, Outfit, playful badges (frontend-slides STYLE_PRESETS).",Lv="Split Pastel — peach #f5e6dc / lavender #e4dff0 split, Outfit, mint/yellow/pink badges (frontend-slides Split Pastel).",Av="MIT",Rv="Timur Isachenko",Wv={bg:"#f5e6dc",bg2:"#e4dff0",text:"#1a1a1a",muted:"#6a6570",accent:"#c8f0d8",accent2:"#f0d4e0",cardBg:"rgba(255,255,255,0.65)",border:"rgba(26,26,26,0.1)"},Uv={headingFont:"'Outfit', system-ui, sans-serif",bodyFont:"'Outfit', system-ui, sans-serif",headingWeight:800,googleFonts:["Outfit:wght@400;500;700;800"]},Gv={radius:"20px",slideWidth:"1280px"},_w={name:Ov,version:Bv,extends:"default-tech",description:Dv,vibe:Lv,license:Av,author:Rv,roles:Wv,typography:Uv,geometry:Gv},$w=Object.freeze(Object.defineProperty({__proto__:null,author:Rv,default:_w,description:Dv,geometry:Gv,license:Av,name:Ov,roles:Wv,typography:Uv,version:Bv,vibe:Lv},Symbol.toStringTag,{value:"Module"})),Hv="swiss-typographic",Vv="0.1.0",Qv="Swiss International Typographic Style — white grid, signal red, Helvetica-like grotesk.",Yv="Swiss typographic — pure white, Inter grotesk, signal red, zero radius, modular grid (matches Grid Systems gallery).",Kv="MIT",Jv="Timur Isachenko",Xv={bg:"#ffffff",bg2:"#f5f5f5",text:"#0a0a0a",muted:"#636363",accent:"#e2231a",accent2:"#0a0a0a",cardBg:"rgba(0,0,0,0.03)",border:"rgba(0,0,0,0.12)"},qv={headingFont:"'Inter', Helvetica, Arial, sans-serif",bodyFont:"'Inter', Helvetica, Arial, sans-serif",headingWeight:800,googleFonts:["Inter:wght@400;600;800"]},Zv={radius:"0px",slideWidth:"1280px"},Ew={name:Hv,version:Vv,extends:"default-tech",description:Qv,vibe:Yv,license:Kv,author:Jv,roles:Xv,typography:qv,geometry:Zv},Cw=Object.freeze(Object.defineProperty({__proto__:null,author:Jv,default:Ew,description:Qv,geometry:Zv,license:Kv,name:Hv,roles:Xv,typography:qv,version:Vv,vibe:Yv},Symbol.toStringTag,{value:"Module"})),eb="vaporwave",nb="0.1.0",tb="Vaporwave — purple dusk, sunset gradient, chrome teal, nostalgic mall energy.",rb="Vaporwave — #1a0533 dusk, #ff6ad5 pink + #5ce1ff teal, Monoton (matches Mallsoft gallery).",ob="MIT",ab="Timur Isachenko",ib={bg:"#1a0533",bg2:"#2d1060",text:"#fff0f9",muted:"#c4a8ff",accent:"#ff6ad5",accent2:"#5ce1ff",cardBg:"rgba(255,106,213,0.08)",border:"rgba(92,225,255,0.28)"},sb={headingFont:"'Monoton', display, cursive",bodyFont:"'Space Mono', monospace",headingWeight:400,googleFonts:["Monoton","Space+Mono:wght@400;700","VT323"]},lb={radius:"6px",slideWidth:"1280px"},Fw={name:eb,version:nb,extends:"default-tech",description:tb,vibe:rb,license:ob,author:ab,roles:ib,typography:sb,geometry:lb},jw=Object.freeze(Object.defineProperty({__proto__:null,author:ab,default:Fw,description:tb,geometry:lb,license:ob,name:eb,roles:ib,typography:sb,version:nb,vibe:rb},Symbol.toStringTag,{value:"Module"})),cb="vellum",ub="1.0.0",db="Vellum — deep periwinkle field with chartreuse italic Cormorant type (frontend-slides).",pb="Vellum — periwinkle #2A3870, chartreuse #E8D85C, italic Cormorant Garamond + DM Sans (frontend-slides vellum).",fb="MIT",gb="Timur Isachenko",hb={bg:"#2A3870",bg2:"#1F2858",text:"#E8D85C",muted:"rgba(232,216,92,0.62)",accent:"#E8D85C",accent2:"#3A7878",cardBg:"rgba(232,216,92,0.08)",border:"rgba(232,216,92,0.20)"},mb={headingFont:"'Cormorant Garamond', Georgia, serif",bodyFont:"'DM Sans', system-ui, sans-serif",headingWeight:400,googleFonts:["Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500","DM+Sans:wght@400;500","Courier+Prime:wght@400"]},yb={radius:"0px",slideWidth:"1280px"},Tw={name:cb,version:ub,extends:"default-tech",description:db,vibe:pb,license:fb,author:gb,roles:hb,typography:mb,geometry:yb},Pw=Object.freeze(Object.defineProperty({__proto__:null,author:gb,default:Tw,description:db,geometry:yb,license:fb,name:cb,roles:hb,typography:mb,version:ub,vibe:pb},Symbol.toStringTag,{value:"Module"})),vb="vintage-editorial",bb="1.0.0",xb="Vintage Editorial — Fraunces on cream with geometric accents (frontend-slides STYLE_PRESETS).",kb="Vintage Editorial — cream #f5f3ee, Fraunces display + Work Sans, witty bordered CTAs (frontend-slides Vintage Editorial).",wb="MIT",Sb="Timur Isachenko",_b={bg:"#f5f3ee",bg2:"#ebe7de",text:"#1a1a1a",muted:"#555555",accent:"#e8d4c0",accent2:"#1a1a1a",cardBg:"#ffffff",border:"rgba(26,26,26,0.2)"},$b={headingFont:"'Fraunces', Georgia, serif",bodyFont:"'Work Sans', system-ui, sans-serif",headingWeight:700,googleFonts:["Fraunces:opsz,wght@9..144,700;9..144,900","Work+Sans:wght@400;500"]},Eb={radius:"4px",slideWidth:"1280px"},Mw={name:vb,version:bb,extends:"default-tech",description:xb,vibe:kb,license:wb,author:Sb,roles:_b,typography:$b,geometry:Eb},Nw=Object.freeze(Object.defineProperty({__proto__:null,author:Sb,default:Mw,description:xb,geometry:Eb,license:wb,name:vb,roles:_b,typography:$b,version:bb,vibe:kb},Symbol.toStringTag,{value:"Module"})),Cb="y2k-aero",Fb="0.1.0",jb="Y2K aero — icy gradients, chrome cyan, soft bubbles, futuristic optimism.",Tb="Y2K aero — icy #e0f7ff, sky #38bdf8 + lime #a3e635, Nunito (matches BubbleFlow gallery).",Pb="MIT",Mb="Timur Isachenko",Nb={bg:"#e0f7ff",bg2:"#bae6fd",text:"#0c4a6e",muted:"#0369a1",accent:"#38bdf8",accent2:"#a3e635",cardBg:"rgba(255,255,255,0.72)",border:"rgba(14,165,233,0.28)"},Ib={headingFont:"'Nunito', system-ui, sans-serif",bodyFont:"'Nunito Sans', system-ui, sans-serif",headingWeight:800,googleFonts:["Nunito:wght@700;800","Nunito+Sans:wght@400;600"]},zb={radius:"32px",slideWidth:"1280px"},Iw={name:Cb,version:Fb,extends:"default-tech",description:jb,vibe:Tb,license:Pb,author:Mb,roles:Nb,typography:Ib,geometry:zb},zw=Object.freeze(Object.defineProperty({__proto__:null,author:Mb,default:Iw,description:jb,geometry:zb,license:Pb,name:Cb,roles:Nb,typography:Ib,version:Fb,vibe:Tb},Symbol.toStringTag,{value:"Module"})),Ow={bg:"#0e0e12",bg2:"#16161d",text:"#f4f4f5",muted:"#a1a1aa",accent:"#7c3aed",accent2:"#22d3ee",cardBg:"rgba(255,255,255,0.04)",border:"rgba(255,255,255,0.08)"},Bw={headingFont:"'Montserrat', system-ui, sans-serif",bodyFont:"'Open Sans', system-ui, sans-serif",headingWeight:800,googleFonts:["Montserrat:wght@700;800","Open+Sans:wght@400;600"]},Dw={radius:"18px",slideWidth:"1280px"},Lw={...Object.assign({"../../../core/themes/claude/theme.json":S2,"../../../core/themes/default-tech/theme.json":$2}),...Object.assign({"../../../themes/8-bit-orbit/theme.json":C2,"../../../themes/aerospace-hud/theme.json":j2,"../../../themes/art-deco/theme.json":P2,"../../../themes/aurora-glass/theme.json":N2,"../../../themes/bauhaus/theme.json":z2,"../../../themes/biennale-yellow/theme.json":B2,"../../../themes/block-frame/theme.json":L2,"../../../themes/blueprint/theme.json":R2,"../../../themes/bold-poster/theme.json":U2,"../../../themes/bold-signal/theme.json":H2,"../../../themes/botanical-luxe/theme.json":Q2,"../../../themes/broadsheet/theme.json":K2,"../../../themes/broadside/theme.json":X2,"../../../themes/brutalist-acid/theme.json":Z2,"../../../themes/brutalist-mono/theme.json":nk,"../../../themes/candy-pop/theme.json":rk,"../../../themes/capsule/theme.json":ak,"../../../themes/cobalt-grid/theme.json":sk,"../../../themes/coral/theme.json":ck,"../../../themes/corporate/theme.json":dk,"../../../themes/creative-mode/theme.json":fk,"../../../themes/creative-voltage/theme.json":hk,"../../../themes/crt-terminal/theme.json":yk,"../../../themes/dark-botanical/theme.json":bk,"../../../themes/data-editorial/theme.json":kk,"../../../themes/developer-dark/theme.json":Sk,"../../../themes/editorial-forest/theme.json":$k,"../../../themes/editorial-serif/theme.json":Ck,"../../../themes/editorial-tri-tone/theme.json":jk,"../../../themes/electric-studio/theme.json":Pk,"../../../themes/emerald-editorial/theme.json":Nk,"../../../themes/fintech-clean/theme.json":zk,"../../../themes/ft-editorial/theme.json":Bk,"../../../themes/genz-bento/theme.json":Lk,"../../../themes/glassmorphism/theme.json":Rk,"../../../themes/heritage-editorial/theme.json":Uk,"../../../themes/kinetic-wrapped/theme.json":Hk,"../../../themes/luxury-minimalist/theme.json":Qk,"../../../themes/neo-grid-bold/theme.json":Kk,"../../../themes/neon-noir/theme.json":Xk,"../../../themes/notebook-tabs/theme.json":Zk,"../../../themes/paper-ink/theme.json":nw,"../../../themes/pastel-dreamy/theme.json":rw,"../../../themes/pastel-geometry/theme.json":aw,"../../../themes/pin-and-paper/theme.json":sw,"../../../themes/pink-script/theme.json":cw,"../../../themes/playful/theme.json":dw,"../../../themes/retro-arcade/theme.json":fw,"../../../themes/risograph-zine/theme.json":hw,"../../../themes/sakura-chroma/theme.json":yw,"../../../themes/scandinavian/theme.json":bw,"../../../themes/signal/theme.json":kw,"../../../themes/soft-editorial/theme.json":Sw,"../../../themes/split-pastel/theme.json":$w,"../../../themes/swiss-typographic/theme.json":Cw,"../../../themes/vaporwave/theme.json":jw,"../../../themes/vellum/theme.json":Pw,"../../../themes/vintage-editorial/theme.json":Nw,"../../../themes/y2k-aero/theme.json":zw})},uo=new Map;for(const e of Object.values(Lw)){const n="default"in e?e.default:e;n!=null&&n.name&&uo.set(n.name,n)}function Ob(){return[...uo.keys()].sort()}function Hi(e){const n=[];let t=uo.has(e)?e:"default-tech";const r=new Set;for(;t&&!r.has(t);){r.add(t);const l=uo.get(t);if(!l)break;n.unshift(l),t=l.extends}const o={...Ow},a={...Bw},i={...Dw};for(const l of n)Object.assign(o,l.roles??{}),Object.assign(a,l.typography??{}),Object.assign(i,l.geometry??{});const s=n[n.length-1]??{name:"default-tech",version:"0.0.0"};return{name:s.name,version:s.version,manifest:s,palette:o,typography:a,geometry:i}}const Aw=`<section class="slide title-slide closing-slide">
  {{#eyebrow}}<span class="eyebrow">{{eyebrow}}</span>{{/eyebrow}}
  <h1>{{heading}}</h1>
  {{#lead}}<p class="lead">{{lead}}</p>{{/lead}}
  {{#cta}}<a class="btn" href="{{href}}"><i class="fa-solid fa-arrow-right"></i> {{label}}</a>{{/cta}}
</section>
`,Rw=`<section class="slide comparison-slide">
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
`,Ww=`<section class="slide">
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
`,Uw=`<section class="slide">
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
`,Gw=`<section class="slide image-hero-slide">
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
`,Hw=`<section class="slide quote-slide">
  <p class="quote">{{quote}}</p>
  {{#by}}<p class="quote-by">— {{by}}</p>{{/by}}
</section>
`,Vw=`<section class="slide section-slide">
  {{#number}}<div class="section-number">{{number}}</div>{{/number}}
  <h2>{{heading}}</h2>
  {{#lead}}<p class="lead">{{lead}}</p>{{/lead}}
</section>
`,Qw=`<section class="slide">
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
`,Yw=`<section class="slide">
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
`,Kw=`<section class="slide title-slide">
  {{#eyebrow}}<span class="eyebrow">{{eyebrow}}</span>{{/eyebrow}}
  <h1>{{heading}}</h1>
  {{#lead}}<p class="lead">{{lead}}</p>{{/lead}}
</section>
`,Jw=`<section class="slide">
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
 */var Xw=Object.prototype.toString,ft=Array.isArray||function(n){return Xw.call(n)==="[object Array]"};function Vi(e){return typeof e=="function"}function qw(e){return ft(e)?"array":typeof e}function ra(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function sl(e,n){return e!=null&&typeof e=="object"&&n in e}function Zw(e,n){return e!=null&&typeof e!="object"&&e.hasOwnProperty&&e.hasOwnProperty(n)}var e5=RegExp.prototype.test;function n5(e,n){return e5.call(e,n)}var t5=/\S/;function r5(e){return!n5(t5,e)}var o5={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};function a5(e){return String(e).replace(/[&<>"'`=\/]/g,function(t){return o5[t]})}var i5=/\s*/,s5=/\s+/,ll=/\s*=/,l5=/\s*\}/,c5=/#|\^|\/|>|\{|&|=|!/;function u5(e,n){if(!e)return[];var t=!1,r=[],o=[],a=[],i=!1,s=!1,l="",c=0;function p(){if(i&&!s)for(;a.length;)delete o[a.pop()];else a=[];i=!1,s=!1}var g,m,v;function S(E){if(typeof E=="string"&&(E=E.split(s5,2)),!ft(E)||E.length!==2)throw new Error("Invalid tags: "+E);g=new RegExp(ra(E[0])+"\\s*"),m=new RegExp("\\s*"+ra(E[1])),v=new RegExp("\\s*"+ra("}"+E[1]))}S(n||ye.tags);for(var x=new ir(e),F,f,u,h,b,y;!x.eos();){if(F=x.pos,u=x.scanUntil(g),u)for(var k=0,C=u.length;k<C;++k)h=u.charAt(k),r5(h)?(a.push(o.length),l+=h):(s=!0,t=!0,l+=" "),o.push(["text",h,F,F+1]),F+=1,h===`
`&&(p(),l="",c=0,t=!1);if(!x.scan(g))break;if(i=!0,f=x.scan(c5)||"name",x.scan(i5),f==="="?(u=x.scanUntil(ll),x.scan(ll),x.scanUntil(m)):f==="{"?(u=x.scanUntil(v),x.scan(l5),x.scanUntil(m),f="&"):u=x.scanUntil(m),!x.scan(m))throw new Error("Unclosed tag at "+x.pos);if(f==">"?b=[f,u,F,x.pos,l,c,t]:b=[f,u,F,x.pos],c++,o.push(b),f==="#"||f==="^")r.push(b);else if(f==="/"){if(y=r.pop(),!y)throw new Error('Unopened section "'+u+'" at '+F);if(y[1]!==u)throw new Error('Unclosed section "'+y[1]+'" at '+F)}else f==="name"||f==="{"||f==="&"?s=!0:f==="="&&S(u)}if(p(),y=r.pop(),y)throw new Error('Unclosed section "'+y[1]+'" at '+x.pos);return p5(d5(o))}function d5(e){for(var n=[],t,r,o=0,a=e.length;o<a;++o)t=e[o],t&&(t[0]==="text"&&r&&r[0]==="text"?(r[1]+=t[1],r[3]=t[3]):(n.push(t),r=t));return n}function p5(e){for(var n=[],t=n,r=[],o,a,i=0,s=e.length;i<s;++i)switch(o=e[i],o[0]){case"#":case"^":t.push(o),r.push(o),t=o[4]=[];break;case"/":a=r.pop(),a[5]=o[2],t=r.length>0?r[r.length-1][4]:n;break;default:t.push(o)}return n}function ir(e){this.string=e,this.tail=e,this.pos=0}ir.prototype.eos=function(){return this.tail===""};ir.prototype.scan=function(n){var t=this.tail.match(n);if(!t||t.index!==0)return"";var r=t[0];return this.tail=this.tail.substring(r.length),this.pos+=r.length,r};ir.prototype.scanUntil=function(n){var t=this.tail.search(n),r;switch(t){case-1:r=this.tail,this.tail="";break;case 0:r="";break;default:r=this.tail.substring(0,t),this.tail=this.tail.substring(t)}return this.pos+=r.length,r};function ct(e,n){this.view=e,this.cache={".":this.view},this.parent=n}ct.prototype.push=function(n){return new ct(n,this)};ct.prototype.lookup=function(n){var t=this.cache,r;if(t.hasOwnProperty(n))r=t[n];else{for(var o=this,a,i,s,l=!1;o;){if(n.indexOf(".")>0)for(a=o.view,i=n.split("."),s=0;a!=null&&s<i.length;)s===i.length-1&&(l=sl(a,i[s])||Zw(a,i[s])),a=a[i[s++]];else a=o.view[n],l=sl(o.view,n);if(l){r=a;break}o=o.parent}t[n]=r}return Vi(r)&&(r=r.call(this.view)),r};function de(){this.templateCache={_cache:{},set:function(n,t){this._cache[n]=t},get:function(n){return this._cache[n]},clear:function(){this._cache={}}}}de.prototype.clearCache=function(){typeof this.templateCache<"u"&&this.templateCache.clear()};de.prototype.parse=function(n,t){var r=this.templateCache,o=n+":"+(t||ye.tags).join(":"),a=typeof r<"u",i=a?r.get(o):void 0;return i==null&&(i=u5(n,t),a&&r.set(o,i)),i};de.prototype.render=function(n,t,r,o){var a=this.getConfigTags(o),i=this.parse(n,a),s=t instanceof ct?t:new ct(t,void 0);return this.renderTokens(i,s,r,n,o)};de.prototype.renderTokens=function(n,t,r,o,a){for(var i="",s,l,c,p=0,g=n.length;p<g;++p)c=void 0,s=n[p],l=s[0],l==="#"?c=this.renderSection(s,t,r,o,a):l==="^"?c=this.renderInverted(s,t,r,o,a):l===">"?c=this.renderPartial(s,t,r,a):l==="&"?c=this.unescapedValue(s,t):l==="name"?c=this.escapedValue(s,t,a):l==="text"&&(c=this.rawValue(s)),c!==void 0&&(i+=c);return i};de.prototype.renderSection=function(n,t,r,o,a){var i=this,s="",l=t.lookup(n[1]);function c(m){return i.render(m,t,r,a)}if(l){if(ft(l))for(var p=0,g=l.length;p<g;++p)s+=this.renderTokens(n[4],t.push(l[p]),r,o,a);else if(typeof l=="object"||typeof l=="string"||typeof l=="number")s+=this.renderTokens(n[4],t.push(l),r,o,a);else if(Vi(l)){if(typeof o!="string")throw new Error("Cannot use higher-order sections without the original template");l=l.call(t.view,o.slice(n[3],n[5]),c),l!=null&&(s+=l)}else s+=this.renderTokens(n[4],t,r,o,a);return s}};de.prototype.renderInverted=function(n,t,r,o,a){var i=t.lookup(n[1]);if(!i||ft(i)&&i.length===0)return this.renderTokens(n[4],t,r,o,a)};de.prototype.indentPartial=function(n,t,r){for(var o=t.replace(/[^ \t]/g,""),a=n.split(`
`),i=0;i<a.length;i++)a[i].length&&(i>0||!r)&&(a[i]=o+a[i]);return a.join(`
`)};de.prototype.renderPartial=function(n,t,r,o){if(r){var a=this.getConfigTags(o),i=Vi(r)?r(n[1]):r[n[1]];if(i!=null){var s=n[6],l=n[5],c=n[4],p=i;l==0&&c&&(p=this.indentPartial(i,c,s));var g=this.parse(p,a);return this.renderTokens(g,t,r,p,o)}}};de.prototype.unescapedValue=function(n,t){var r=t.lookup(n[1]);if(r!=null)return r};de.prototype.escapedValue=function(n,t,r){var o=this.getConfigEscape(r)||ye.escape,a=t.lookup(n[1]);if(a!=null)return typeof a=="number"&&o===ye.escape?String(a):o(a)};de.prototype.rawValue=function(n){return n[1]};de.prototype.getConfigTags=function(n){return ft(n)?n:n&&typeof n=="object"?n.tags:void 0};de.prototype.getConfigEscape=function(n){if(n&&typeof n=="object"&&!ft(n))return n.escape};var ye={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(e){er.templateCache=e},get templateCache(){return er.templateCache}},er=new de;ye.clearCache=function(){return er.clearCache()};ye.parse=function(n,t){return er.parse(n,t)};ye.render=function(n,t,r,o){if(typeof n!="string")throw new TypeError('Invalid template! Template should be a "string" but "'+qw(n)+'" was given as the first argument for mustache#render(template, view, partials)');return er.render(n,t,r,o)};ye.escape=a5;ye.Scanner=ir;ye.Context=ct;ye.Writer=de;const f5=`/* presentation-md base stylesheet.
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
`,cl=`/* Per-theme surface profiles — each theme gets a distinct stage, not one shared blob. */

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

/* ── coral-hatch (coral) ── */
.deck[data-surface="coral-hatch"] .slide {
  --slide-bg:
    repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 10px,
      rgba(26, 26, 26, 0.045) 10px,
      rgba(26, 26, 26, 0.045) 12px
    ),
    linear-gradient(135deg, var(--bg) 0 62%, var(--bg-2) 62% 100%);
  border-radius: 0;
  border: 3px solid var(--text);
}
.deck[data-surface="coral-hatch"] .slide::before {
  left: 0;
  top: 0;
  bottom: 0;
  width: 42%;
  background: color-mix(in srgb, var(--accent) 92%, transparent);
  opacity: 0.18;
  pointer-events: none;
}
.deck[data-surface="coral-hatch"] .slide::after {
  display: none;
}
.deck[data-surface="coral-hatch"] .slide h1 {
  font-weight: 400;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  line-height: 0.92;
}
.deck[data-surface="coral-hatch"] .card {
  background: #fff;
  border: 2px solid var(--text);
  border-radius: 0;
}

/* ── emerald-editorial-masthead (emerald-editorial) ── */
.deck[data-surface="emerald-editorial-masthead"] .slide {
  --slide-bg: var(--bg);
  border-radius: 0;
  border: none;
  box-shadow: inset 0 0 0 18px var(--bg), inset 0 0 0 20px color-mix(in srgb, var(--text) 75%, transparent);
}
.deck[data-surface="emerald-editorial-masthead"] .slide::before {
  left: 12%;
  right: 12%;
  top: 14%;
  height: 3px;
  background: linear-gradient(
    180deg,
    var(--text) 0 1px,
    transparent 1px 2px,
    var(--text) 2px 3px
  );
}
.deck[data-surface="emerald-editorial-masthead"] .slide::after {
  left: 12%;
  right: 12%;
  bottom: 14%;
  top: auto;
  height: 3px;
  background: linear-gradient(
    180deg,
    var(--text) 0 1px,
    transparent 1px 2px,
    var(--text) 2px 3px
  );
  filter: none;
  opacity: 1;
  border-radius: 0;
}
.deck[data-surface="emerald-editorial-masthead"] .slide h1 {
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 0.95;
}
.deck[data-surface="emerald-editorial-masthead"] .card {
  background: var(--card-bg);
  color: var(--text);
  border: 2px solid var(--text);
  border-radius: 0;
}

/* ── sakura-chroma-cassette (sakura-chroma) ── */
.deck[data-surface="sakura-chroma-cassette"] .slide {
  --slide-bg:
    linear-gradient(135deg, #E5392A 0 8%, #E54489 8% 16%, #F09131 16% 24%, #3D9F47 24% 32%, #3F8BC4 32% 40%, #F0BC2A 40% 48%, transparent 48%),
    var(--bg);
  border-radius: 6px;
  border: 2px solid var(--text);
  box-shadow: 10px 10px 0 color-mix(in srgb, var(--accent) 35%, transparent);
}
.deck[data-surface="sakura-chroma-cassette"] .slide::before {
  width: 72px;
  height: 72px;
  right: 48px;
  top: 40px;
  border-radius: 50%;
  background:
    radial-gradient(circle at 30% 30%, #E54489 0 28%, transparent 29%),
    radial-gradient(circle at 70% 35%, #F09131 0 24%, transparent 25%),
    radial-gradient(circle at 50% 70%, #3F8BC4 0 26%, transparent 27%),
    radial-gradient(circle at 35% 65%, #3D9F47 0 22%, transparent 23%);
  filter: none;
  opacity: 0.95;
}
.deck[data-surface="sakura-chroma-cassette"] .slide::after {
  width: 56px;
  height: 22px;
  left: 48px;
  bottom: 40px;
  top: auto;
  background: var(--accent);
  border: 2px solid var(--text);
  filter: none;
  border-radius: 2px;
}
.deck[data-surface="sakura-chroma-cassette"] .slide h1 {
  font-weight: 900;
  letter-spacing: -0.025em;
  line-height: 0.88;
  text-transform: uppercase;
}
.deck[data-surface="sakura-chroma-cassette"] .card {
  background: var(--card-bg);
  border: 2px solid var(--text);
  border-radius: 4px;
}

/* ── pink-script-afterhours (pink-script) ── */
.deck[data-surface="pink-script-afterhours"] .slide {
  --slide-bg:
    radial-gradient(ellipse 70% 55% at 80% 15%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 60%),
    var(--bg);
  border-radius: 0;
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--accent) 45%, transparent),
    inset 0 0 0 18px transparent,
    inset 0 0 0 19px rgba(245, 237, 241, 0.12);
}
.deck[data-surface="pink-script-afterhours"] .slide::before {
  left: 28px;
  right: 28px;
  top: 28px;
  bottom: 28px;
  width: auto;
  height: auto;
  border: 1px solid rgba(245, 237, 241, 0.14);
  background: transparent;
}
.deck[data-surface="pink-script-afterhours"] .slide::after {
  width: 120px;
  height: 3px;
  right: 56px;
  bottom: 56px;
  top: auto;
  background: var(--accent);
  filter: none;
  border-radius: 0;
}
.deck[data-surface="pink-script-afterhours"] .slide h1 {
  font-weight: 400;
  font-style: italic;
  letter-spacing: -0.02em;
  color: var(--accent);
}
.deck[data-surface="pink-script-afterhours"] .card {
  background: rgba(245, 237, 241, 0.05);
  border: 1px solid rgba(237, 61, 140, 0.28);
  border-radius: 0;
}

/* ── block-frame-brutal (block-frame) ── */
.deck[data-surface="block-frame-brutal"] .slide {
  --slide-bg: var(--bg);
  border-radius: 0;
  border: 4px solid #000;
  box-shadow: 8px 8px 0 #000;
}
.deck[data-surface="block-frame-brutal"] .slide::before {
  width: 28%;
  height: 18%;
  right: -2%;
  top: 12%;
  background: var(--accent);
  border: 4px solid #000;
  box-shadow: 6px 6px 0 #000;
  transform: rotate(6deg);
  filter: none;
}
.deck[data-surface="block-frame-brutal"] .slide::after {
  width: 16%;
  height: 22%;
  left: 6%;
  bottom: 10%;
  top: auto;
  background: #C0F7FE;
  border: 4px solid #000;
  box-shadow: 6px 6px 0 #000;
  transform: rotate(-8deg);
  filter: none;
}
.deck[data-surface="block-frame-brutal"] .slide h1 {
  font-weight: 900;
  letter-spacing: -0.04em;
  text-transform: uppercase;
  line-height: 0.95;
}
.deck[data-surface="block-frame-brutal"] .card {
  background: #fff;
  border: 4px solid #000;
  border-radius: 0;
  box-shadow: 6px 6px 0 #000;
}

/* ── capsule-pills (capsule) ── */
.deck[data-surface="capsule-pills"] .slide {
  --slide-bg:
    radial-gradient(circle at 12% 78%, color-mix(in srgb, #C5B5E0 70%, transparent) 0 28px, transparent 29px),
    radial-gradient(circle at 88% 18%, color-mix(in srgb, #8BB4F7 70%, transparent) 0 22px, transparent 23px),
    radial-gradient(circle at 78% 82%, color-mix(in srgb, #C4D94E 70%, transparent) 0 18px, transparent 19px),
    var(--bg);
  border-radius: 28px;
  border: 2px solid var(--border);
  box-shadow: 8px 10px 0 rgba(26, 26, 26, 0.08);
}
.deck[data-surface="capsule-pills"] .slide::before {
  width: 120px;
  height: 36px;
  right: 48px;
  top: 40px;
  border-radius: 9999px;
  background: var(--accent);
  border: 2px solid var(--border);
  box-shadow: 4px 4px 0 rgba(26, 26, 26, 0.1);
  filter: none;
}
.deck[data-surface="capsule-pills"] .slide::after {
  width: 72px;
  height: 72px;
  left: 44px;
  bottom: 40px;
  top: auto;
  border-radius: 50%;
  background: var(--accent2);
  border: 2px solid var(--border);
  filter: none;
}
.deck[data-surface="capsule-pills"] .slide h1 {
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1;
}
.deck[data-surface="capsule-pills"] .card {
  background: #fff;
  border: 2px solid var(--border);
  border-radius: 2rem;
  box-shadow: 6px 8px 0 rgba(26, 26, 26, 0.08);
}

/* ── cobalt-grid-paper (cobalt-grid) ── */
.deck[data-surface="cobalt-grid-paper"] .slide {
  --slide-bg:
    linear-gradient(rgba(31, 43, 224, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(31, 43, 224, 0.1) 1px, transparent 1px),
    var(--bg);
  background-size: 28px 28px, 28px 28px, auto;
  border-radius: 0;
  border: 1px solid rgba(31, 43, 224, 0.18);
}
.deck[data-surface="cobalt-grid-paper"] .slide::before {
  width: 42%;
  height: 42%;
  right: 0;
  bottom: 0;
  top: auto;
  background:
    linear-gradient(to top left, transparent 49.5%, rgba(31, 43, 224, 0.55) 49.5% 50.5%, transparent 50.5%),
    linear-gradient(to top left, transparent 0 50%, color-mix(in srgb, var(--accent) 12%, transparent) 50%);
  filter: none;
  opacity: 1;
  border-radius: 0;
}
.deck[data-surface="cobalt-grid-paper"] .slide::after {
  display: none;
}
.deck[data-surface="cobalt-grid-paper"] .slide h1 {
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.05;
}
.deck[data-surface="cobalt-grid-paper"] .card {
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(31, 43, 224, 0.22);
  border-radius: 0;
}

/* ── bit-orbit-arcade (8-bit-orbit) ── */
.deck[data-surface="bit-orbit-arcade"] .slide {
  --slide-bg:
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 3px,
      rgba(0, 0, 0, 0.18) 3px,
      rgba(0, 0, 0, 0.18) 4px
    ),
    radial-gradient(ellipse 60% 50% at 70% 20%, color-mix(in srgb, var(--accent) 18%, transparent), transparent 65%),
    radial-gradient(ellipse 40% 35% at 20% 80%, color-mix(in srgb, var(--accent2) 16%, transparent), transparent 70%),
    var(--bg);
  border-radius: 0;
  border: 3px solid var(--accent);
  box-shadow:
    0 0 0 4px var(--bg),
    4px 4px 0 #F4D03F,
    8px 8px 0 var(--accent2);
}
.deck[data-surface="bit-orbit-arcade"] .slide::before {
  width: 10px;
  height: 10px;
  left: 36px;
  top: 36px;
  background: #F4D03F;
  box-shadow:
    24px 8px 0 var(--accent),
    48px 0 0 var(--accent2),
    72px 12px 0 #fff;
  filter: none;
  border-radius: 0;
}
.deck[data-surface="bit-orbit-arcade"] .slide::after {
  width: 64px;
  height: 18px;
  right: 40px;
  bottom: 40px;
  top: auto;
  background: var(--accent);
  border: 2px solid #fff;
  box-shadow: 4px 4px 0 #F4D03F;
  filter: none;
  border-radius: 0;
}
.deck[data-surface="bit-orbit-arcade"] .slide h1 {
  font-weight: 900;
  letter-spacing: -0.01em;
  text-shadow: 3px 3px 0 #F4D03F, 6px 6px 0 var(--accent2);
}
.deck[data-surface="bit-orbit-arcade"] .card {
  background: rgba(15, 27, 61, 0.9);
  border: 2px solid var(--accent);
  border-radius: 0;
  box-shadow: 4px 4px 0 var(--accent2);
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
`,g5="warm-paper",h5="clean-light",m5="soft-bento",y5="bauhaus-blocks",v5="vapor-horizon",b5="hygge-soft",x5="blueprint-grid",k5="glass-mist",w5="newsprint-masthead",S5="vellum-colorfield",_5="broadside-fire",$5="signal-briefing",E5="coral-hatch",C5="capsule-pills",F5={claude:g5,"default-tech":"neon-glow",corporate:h5,playful:m5,"luxury-minimalist":"quiet-luxe","retro-arcade":"scanline-neon","editorial-serif":"editorial-rule","brutalist-mono":"brutalist-grid","pastel-dreamy":"pastel-cloud","aurora-glass":"aurora-glass","ft-editorial":"broadsheet-rule","genz-bento":"hard-bento","crt-terminal":"crt-phosphor","swiss-typographic":"swiss-grid","candy-pop":"candy-blob","aerospace-hud":"hud-grid","brutalist-acid":"acid-block",bauhaus:y5,"y2k-aero":"aero-bubble","risograph-zine":"riso-print","neon-noir":"neon-rain",vaporwave:v5,"botanical-luxe":"botanical-leaf","heritage-editorial":"heritage-wash","fintech-clean":"fintech-soft","developer-dark":"dev-terminal","data-editorial":"data-rule",scandinavian:b5,"art-deco":"deco-fan","kinetic-wrapped":"wrapped-block",blueprint:x5,glassmorphism:k5,broadsheet:w5,"soft-editorial":"soft-editorial-paper","editorial-forest":"editorial-forest-paper","pin-and-paper":"pin-paper-pad",vellum:S5,"neo-grid-bold":"neo-grid-panels","editorial-tri-tone":"tri-tone-blocks","creative-mode":"creative-mode-blocks",broadside:_5,"bold-signal":"bold-signal-card","notebook-tabs":"notebook-tabs-page","creative-voltage":"creative-voltage-split",signal:$5,"electric-studio":"electric-studio-split","dark-botanical":"dark-botanical-bloom","pastel-geometry":"pastel-geometry-pills","split-pastel":"split-pastel-panels","vintage-editorial":"vintage-editorial-geo","paper-ink":"paper-ink-literary","biennale-yellow":"biennale-yellow-sun","bold-poster":"bold-poster-ink",coral:E5,"emerald-editorial":"emerald-editorial-masthead","sakura-chroma":"sakura-chroma-cassette","pink-script":"pink-script-afterhours","block-frame":"block-frame-brutal",capsule:C5,"cobalt-grid":"cobalt-grid-paper","8-bit-orbit":"bit-orbit-arcade"},j5=`<!doctype html>
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
`;function T5(e){return F5[e]??"gradient"}const P5=Object.assign({"../../../shared/layouts/closing.html":Aw,"../../../shared/layouts/comparison.html":Rw,"../../../shared/layouts/data-table.html":Ww,"../../../shared/layouts/feature-grid.html":Uw,"../../../shared/layouts/image-hero.html":Gw,"../../../shared/layouts/quote.html":Hw,"../../../shared/layouts/section.html":Vw,"../../../shared/layouts/stat-row.html":Qw,"../../../shared/layouts/timeline.html":Yw,"../../../shared/layouts/title.html":Kw,"../../../shared/layouts/two-column.html":Jw}),Bb=new Map;for(const[e,n]of Object.entries(P5)){const t=e.split("/").pop().replace(/\.html$/,"");Bb.set(t,n)}function M5(e){return e.length===0?"":`https://fonts.googleapis.com/css2?family=${e.join("&family=")}&display=swap`}const N5=new Set(["http","https","mailto","tel"]);function Db(e){let n="";for(const t of e){const r=t.charCodeAt(0);r>31&&r!==127&&(n+=t)}return n}function Lb(e){var n,t;return(t=(n=e.match(/^([a-zA-Z][a-zA-Z0-9+.-]*):/))==null?void 0:n[1])==null?void 0:t.toLowerCase()}function I5(e){if(typeof e!="string")return;const n=Db(e).trim(),t=Lb(n);return t&&!N5.has(t)?"#":n}function z5(e){if(typeof e!="string")return;const n=Db(e).trim();if(/^data:image\//i.test(n))return n;const t=Lb(n);return t&&t!=="http"&&t!=="https"?"":n}function O5(e){var t;const n={...e};return e.layout==="data-table"&&Array.isArray(e.rows)&&(n.rows=e.rows.map(r=>({cells:r}))),e.layout==="feature-grid"&&(typeof e.columns=="number"?n.columns=e.columns:e.columns||(n.columns=3)),((t=e.cta)==null?void 0:t.href)!==void 0&&(n.cta={...e.cta,href:I5(e.cta.href)}),e.image!==void 0&&(n.image=z5(e.image)),n}const B5='<footer class="pmd-attribution">Made with <a href="https://presentation-md.vercel.app/?ref=studio" target="_blank" rel="noopener">presentation-md</a></footer>',D5=`
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
@media print { .pmd-attribution { opacity: 0.5; } }`;function L5(e){return`<script type="application/json" id="pmd-deck">${JSON.stringify(e).replace(/</g,"\\u003c")}<\/script>`}function Ab(e,n){var c,p,g;const t={bg:n.palette.bg,bg2:n.palette.bg2,text:n.palette.text,muted:n.palette.muted,accent:n.palette.accent,accent2:n.palette.accent2,cardBg:n.palette.cardBg,border:n.palette.border,radius:n.geometry.radius,slideW:n.geometry.slideWidth,headingFont:n.typography.headingFont,bodyFont:n.typography.bodyFont,headingWeight:String(n.typography.headingWeight)},r=ye.render(f5,t),o=M5(n.typography.googleFonts),a=T5(n.name);let i=o?`@import url('${o}');

${r}

${cl}`:`${r}

${cl}`;i+=`

${D5}`;const s=(Array.isArray(e.slides)?e.slides:[]).map(m=>{const v=Bb.get(m.layout);return v?ye.render(v,O5(m)):`<section class="slide"><h2>Unknown layout: ${m.layout}</h2></section>`}).join(`
`),l=((c=e.meta)==null?void 0:c.title)??((p=e.meta)==null?void 0:p.company)??"Presentation";return ye.render(j5,{title:l,description:((g=e.meta)==null?void 0:g.description)??"",styles:i,slides:s,surface:a,attribution:B5,deckData:L5(e)})}const A5="modulepreload",R5=function(e){return"/studio/"+e},ul={},Rb=function(n,t,r){let o=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),s=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));o=Promise.allSettled(t.map(l=>{if(l=R5(l),l in ul)return;ul[l]=!0;const c=l.endsWith(".css"),p=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${p}`))return;const g=document.createElement("link");if(g.rel=c?"stylesheet":A5,c||(g.as="script"),g.crossOrigin="",g.href=l,s&&g.setAttribute("nonce",s),document.head.appendChild(g),c)return new Promise((m,v)=>{g.addEventListener("load",m),g.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${l}`)))})}))}function a(i){const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=i,window.dispatchEvent(s),!s.defaultPrevented)throw i}return o.then(i=>{for(const s of i||[])s.status==="rejected"&&a(s.reason);return n().catch(a)})};function Qi(e,n){const t=URL.createObjectURL(e),r=document.createElement("a");r.href=t,r.download=n,document.body.appendChild(r),r.click(),r.remove(),URL.revokeObjectURL(t)}function Yi(e,n){var r,o;return`${(((r=e.meta)==null?void 0:r.title)??((o=e.meta)==null?void 0:o.company)??"deck").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"deck"}.${n}`}function Wb(e){var n;return((n=e.meta)==null?void 0:n.theme)??"default-tech"}async function W5(e){const n=[],t=Hi(Wb(e)),{deckToPptxBlob:r}=await Rb(async()=>{const{deckToPptxBlob:a}=await import("./index-rT3NUMG4.js");return{deckToPptxBlob:a}},__vite__mapDeps([0,1])),o=await r(e,t,{onWarn:a=>n.push(a)});return Qi(o,Yi(e,"pptx")),{warnings:n}}function U5(e){const n=Hi(Wb(e)),t=Ab(e,n);Qi(new Blob([t],{type:"text/html"}),Yi(e,"html"))}function G5(e){Qi(new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),Yi(e,"json"))}function Ki(e){const n=JSON.parse(e);if((n==null?void 0:n.type)!=="deck"||!Array.isArray(n.slides))throw new Error('Not a valid deck: expected { "type": "deck", "slides": [...] }');return n}function H5(e){var r,o,a;const n=["pmd-deck","psp-deck"];if(typeof DOMParser<"u"){const i=new DOMParser().parseFromString(e,"text/html");for(const s of n){const l=(o=(r=i.getElementById(s))==null?void 0:r.textContent)==null?void 0:o.trim();if(l)return l}}const t=e.match(/<script[^>]*id=["'](?:pmd-deck|psp-deck)["'][^>]*>([\s\S]*?)<\/script>/i);return(a=t==null?void 0:t[1])==null?void 0:a.trim()}function V5(e){const n=H5(e);if(!n)throw new Error("No editable deck found in this HTML. Only presentations created by presentation-md (with an embedded source) can be opened.");return Ki(n)}function Q5(e,n){return/\.html?$/i.test(e)?V5(n):Ki(n)}function Y5({deck:e,onChange:n,onLoadExample:t,onPresent:r,onGenerate:o}){var f,u,h,b;const a=D.useRef(null),[i,s]=D.useState(""),[l,c]=D.useState(!1),p=Ob(),g=((f=e.meta)==null?void 0:f.theme)??"default-tech",m=y=>n({...e,meta:{...e.meta,...y}}),v=y=>m({theme:y}),S=y=>m({title:y}),x=async y=>{try{const k=Q5(y.name,await y.text());n(k),s(`Opened ${y.name}`)}catch(k){s(`Open failed: ${k.message}`)}},F=async()=>{c(!0),s("Building .pptx…");try{const{warnings:y}=await W5(e);s(y.length?`Exported .pptx (${y.length} warning${y.length>1?"s":""})`:"Exported .pptx")}catch(y){s(`Export failed: ${y.message}`)}finally{c(!1)}};return d.jsxs("header",{className:"toolbar",children:[d.jsxs("div",{className:"brand",children:[d.jsx("strong",{children:"Studio"}),d.jsx("span",{className:"muted small",children:"presentation-md"})]}),d.jsx("input",{className:"text-input title-input",value:((u=e.meta)==null?void 0:u.title)??"",placeholder:"Deck title",onChange:y=>S(y.target.value)}),d.jsxs("label",{className:"inline-field",children:[d.jsx("span",{className:"muted small",children:"Theme"}),d.jsx("select",{className:"text-input",value:g,onChange:y=>v(y.target.value),children:p.map(y=>d.jsx("option",{value:y,children:y},y))})]}),d.jsxs("details",{className:"deck-details",children:[d.jsx("summary",{className:"btn btn-sm",children:"Details"}),d.jsxs("div",{className:"deck-details-body",children:[d.jsx("input",{className:"text-input",value:((h=e.meta)==null?void 0:h.company)??"",placeholder:"Company",onChange:y=>m({company:y.target.value})}),d.jsx("input",{className:"text-input",value:((b=e.meta)==null?void 0:b.description)??"",placeholder:"Description",onChange:y=>m({description:y.target.value})})]})]}),d.jsx("div",{className:"spacer"}),d.jsx("button",{className:"btn btn-generate",onClick:o,title:"Generate a deck from a prompt",children:"✨ Generate"}),d.jsx("button",{className:"btn",onClick:t,children:"Example"}),d.jsx("button",{className:"btn",onClick:()=>{var y;return(y=a.current)==null?void 0:y.click()},title:"Open a deck .html or .json",children:"Open"}),d.jsx("button",{className:"btn",onClick:r,title:"Present fullscreen",children:"Present"}),d.jsx("button",{className:"btn",onClick:()=>G5(e),children:"JSON"}),d.jsx("button",{className:"btn",onClick:()=>U5(e),children:"HTML"}),d.jsx("button",{className:"btn btn-primary",disabled:l,onClick:F,children:l?"…":"Download .pptx"}),d.jsx("input",{ref:a,type:"file",accept:".html,.htm,.json,application/json,text/html",hidden:!0,onChange:y=>{var C;const k=(C=y.target.files)==null?void 0:C[0];k&&x(k),y.target.value=""}}),i&&d.jsx("span",{className:"status muted small",children:i})]})}function K5({slides:e,selected:n,onSelect:t,onChange:r}){const[o,a]=D.useState("title"),i=()=>{const p=n+1,g=[...e.slice(0,p),k2(o),...e.slice(p)];r(g,p)},s=p=>{const g=JSON.parse(JSON.stringify(e[p]));r([...e.slice(0,p+1),g,...e.slice(p+1)],p+1)},l=p=>{if(e.length<=1)return;const g=e.filter((m,v)=>v!==p);r(g,Math.max(0,Math.min(p,g.length-1)))},c=(p,g)=>{const m=p+g;if(m<0||m>=e.length)return;const v=e.slice();[v[p],v[m]]=[v[m],v[p]],r(v,m)};return d.jsxs("div",{className:"slide-list",children:[d.jsxs("div",{className:"add-row",children:[d.jsx("select",{className:"text-input",value:o,onChange:p=>a(p.target.value),children:x2.map(p=>d.jsx("option",{value:p,children:Ja[p]},p))}),d.jsx("button",{className:"btn btn-sm",onClick:i,children:"+ Add"})]}),d.jsx("ul",{className:"slides",children:e.map((p,g)=>d.jsxs("li",{className:`slide-row ${g===n?"active":""}`,onClick:()=>t(g),children:[d.jsxs("div",{className:"slide-row-main",children:[d.jsx("span",{className:"slide-row-num",children:g+1}),d.jsxs("div",{className:"slide-row-text",children:[d.jsx("span",{className:"slide-row-layout",children:Ja[p.layout]??p.layout}),d.jsx("span",{className:"slide-row-title",children:p.heading??p.quote??p.eyebrow??"—"})]})]}),d.jsxs("div",{className:"slide-row-actions",onClick:m=>m.stopPropagation(),children:[d.jsx("button",{className:"btn btn-icon",title:"Move up",onClick:()=>c(g,-1),children:"↑"}),d.jsx("button",{className:"btn btn-icon",title:"Move down",onClick:()=>c(g,1),children:"↓"}),d.jsx("button",{className:"btn btn-icon",title:"Duplicate",onClick:()=>s(g),children:"⧉"}),d.jsx("button",{className:"btn btn-icon btn-danger",title:"Delete",onClick:()=>l(g),children:"✕"})]})]},g))})]})}function Ji({label:e,children:n}){return d.jsxs("label",{className:"field",children:[d.jsx("span",{className:"field-label",children:e}),n]})}function N({label:e,value:n,onChange:t,placeholder:r}){return d.jsx(Ji,{label:e,children:d.jsx("input",{className:"text-input",type:"text",value:n??"",placeholder:r,onChange:o=>t(o.target.value)})})}function Ue({label:e,value:n,onChange:t,rows:r=3}){return d.jsx(Ji,{label:e,children:d.jsx("textarea",{className:"text-input",rows:r,value:n??"",onChange:o=>t(o.target.value)})})}function J5({label:e,value:n,options:t,onChange:r}){return d.jsx(Ji,{label:e,children:d.jsx("select",{className:"text-input",value:n,onChange:o=>r(Number(o.target.value)),children:t.map(o=>d.jsx("option",{value:o,children:o},o))})})}function Lr({label:e,items:n,onChange:t,blank:r,renderItem:o}){const a=(s,l)=>t(n.map((c,p)=>p===s?l:c)),i=(s,l)=>{const c=s+l;if(c<0||c>=n.length)return;const p=n.slice();[p[s],p[c]]=[p[c],p[s]],t(p)};return d.jsxs("div",{className:"list-editor",children:[d.jsxs("div",{className:"list-editor-head",children:[d.jsx("span",{className:"field-label",children:e}),d.jsx("button",{className:"btn btn-sm",onClick:()=>t([...n,r()]),children:"+ Add"})]}),n.map((s,l)=>d.jsxs("div",{className:"list-item",children:[d.jsxs("div",{className:"list-item-controls",children:[d.jsx("span",{className:"list-item-index",children:l+1}),d.jsx("div",{className:"spacer"}),d.jsx("button",{className:"btn btn-icon",title:"Move up",onClick:()=>i(l,-1),children:"↑"}),d.jsx("button",{className:"btn btn-icon",title:"Move down",onClick:()=>i(l,1),children:"↓"}),d.jsx("button",{className:"btn btn-icon btn-danger",title:"Remove",onClick:()=>t(n.filter((c,p)=>p!==l)),children:"✕"})]}),o(s,c=>a(l,c),l)]},l)),n.length===0&&d.jsx("p",{className:"muted small",children:"No items yet."})]})}function X5({slide:e,onChange:n}){const t=a=>n({...e,...a}),r=e.layout;return d.jsxs("div",{className:"slide-form",children:[d.jsx("h2",{className:"panel-title",children:Ja[r]??e.layout}),o()]});function o(){var a,i;switch(e.layout){case"title":case"closing":return d.jsxs(d.Fragment,{children:[d.jsx(N,{label:"Eyebrow",value:e.eyebrow,onChange:s=>t({eyebrow:s})}),d.jsx(N,{label:"Heading",value:e.heading,onChange:s=>t({heading:s})}),d.jsx(Ue,{label:"Lead",value:e.lead,onChange:s=>t({lead:s})}),e.layout==="closing"&&d.jsxs(d.Fragment,{children:[d.jsx(N,{label:"CTA label",value:(a=e.cta)==null?void 0:a.label,onChange:s=>t({cta:{...e.cta,label:s}})}),d.jsx(N,{label:"CTA link",value:(i=e.cta)==null?void 0:i.href,onChange:s=>t({cta:{...e.cta,href:s}})})]})]});case"section":return d.jsxs(d.Fragment,{children:[d.jsx(N,{label:"Number",value:e.number,onChange:s=>t({number:s})}),d.jsx(N,{label:"Eyebrow",value:e.eyebrow,onChange:s=>t({eyebrow:s})}),d.jsx(N,{label:"Heading",value:e.heading,onChange:s=>t({heading:s})}),d.jsx(Ue,{label:"Lead",value:e.lead,onChange:s=>t({lead:s})})]});case"two-column":return d.jsxs(d.Fragment,{children:[d.jsx(N,{label:"Eyebrow",value:e.eyebrow,onChange:s=>t({eyebrow:s})}),d.jsx(N,{label:"Heading",value:e.heading,onChange:s=>t({heading:s})}),d.jsx(Ue,{label:"Body",value:e.body,onChange:s=>t({body:s}),rows:5}),d.jsx(N,{label:"Image URL (data: URIs embed in PPTX)",value:e.image,onChange:s=>t({image:s})}),d.jsx(N,{label:"Image alt",value:e.imageAlt,onChange:s=>t({imageAlt:s})})]});case"image-hero":return d.jsxs(d.Fragment,{children:[d.jsx(N,{label:"Eyebrow",value:e.eyebrow,onChange:s=>t({eyebrow:s})}),d.jsx(N,{label:"Heading",value:e.heading,onChange:s=>t({heading:s})}),d.jsx(Ue,{label:"Lead",value:e.lead,onChange:s=>t({lead:s}),rows:3}),d.jsx(N,{label:"Image URL (data: URIs embed in PPTX)",value:e.image,onChange:s=>t({image:s})}),d.jsx(N,{label:"Image alt",value:e.imageAlt,onChange:s=>t({imageAlt:s})})]});case"comparison":return d.jsxs(d.Fragment,{children:[d.jsx(N,{label:"Eyebrow",value:e.eyebrow,onChange:s=>t({eyebrow:s})}),d.jsx(N,{label:"Heading",value:e.heading,onChange:s=>t({heading:s})}),d.jsx(N,{label:"Left label",value:e.leftLabel,onChange:s=>t({leftLabel:s})}),d.jsx(Ue,{label:"Left body",value:e.left,onChange:s=>t({left:s}),rows:4}),d.jsx(N,{label:"Right label",value:e.rightLabel,onChange:s=>t({rightLabel:s})}),d.jsx(Ue,{label:"Right body",value:e.right,onChange:s=>t({right:s}),rows:4})]});case"quote":return d.jsxs(d.Fragment,{children:[d.jsx(Ue,{label:"Quote",value:e.quote,onChange:s=>t({quote:s}),rows:4}),d.jsx(N,{label:"Attribution",value:e.by,onChange:s=>t({by:s})})]});case"feature-grid":return d.jsxs(d.Fragment,{children:[d.jsx(N,{label:"Eyebrow",value:e.eyebrow,onChange:s=>t({eyebrow:s})}),d.jsx(N,{label:"Heading",value:e.heading,onChange:s=>t({heading:s})}),d.jsx(J5,{label:"Columns",value:typeof e.columns=="number"?e.columns:3,options:[2,3,4],onChange:s=>t({columns:s})}),d.jsx(Lr,{label:"Cards",items:e.cards??[],onChange:s=>t({cards:s}),blank:()=>({title:"New card",body:""}),renderItem:(s,l)=>d.jsxs(d.Fragment,{children:[d.jsx(N,{label:"Icon (FontAwesome class)",value:s.icon,onChange:c=>l({...s,icon:c})}),d.jsx(N,{label:"Title",value:s.title,onChange:c=>l({...s,title:c})}),d.jsx(Ue,{label:"Body",value:s.body,onChange:c=>l({...s,body:c}),rows:2})]})})]});case"stat-row":return d.jsxs(d.Fragment,{children:[d.jsx(N,{label:"Eyebrow",value:e.eyebrow,onChange:s=>t({eyebrow:s})}),d.jsx(N,{label:"Heading",value:e.heading,onChange:s=>t({heading:s})}),d.jsx(Lr,{label:"Stats",items:e.stats??[],onChange:s=>t({stats:s}),blank:()=>({value:"0",label:"Metric"}),renderItem:(s,l)=>d.jsxs(d.Fragment,{children:[d.jsx(N,{label:"Value",value:s.value,onChange:c=>l({...s,value:c})}),d.jsx(N,{label:"Label",value:s.label,onChange:c=>l({...s,label:c})})]})})]});case"timeline":return d.jsxs(d.Fragment,{children:[d.jsx(N,{label:"Eyebrow",value:e.eyebrow,onChange:s=>t({eyebrow:s})}),d.jsx(N,{label:"Heading",value:e.heading,onChange:s=>t({heading:s})}),d.jsx(Lr,{label:"Steps",items:e.steps??[],onChange:s=>t({steps:s}),blank:()=>({title:"New step",body:""}),renderItem:(s,l)=>d.jsxs(d.Fragment,{children:[d.jsx(N,{label:"Title",value:s.title,onChange:c=>l({...s,title:c})}),d.jsx(Ue,{label:"Body",value:s.body,onChange:c=>l({...s,body:c}),rows:2})]})})]});case"data-table":return d.jsx(q5,{slide:e,set:t});default:return d.jsx("p",{className:"muted",children:"No editable fields for this layout."})}}}function q5({slide:e,set:n}){const t=Array.isArray(e.columns)?e.columns:[],r=Array.isArray(e.rows)?e.rows:[],o=Math.max(t.length,...r.map(l=>l.length),1),a=(l,c)=>{const p=t.slice();p[l]=c,n({columns:p})},i=()=>{n({columns:[...t,`Column ${t.length+1}`],rows:r.map(l=>[...l,""])})},s=l=>{n({columns:t.filter((c,p)=>p!==l),rows:r.map(c=>c.filter((p,g)=>g!==l))})};return d.jsxs(d.Fragment,{children:[d.jsx(N,{label:"Eyebrow",value:e.eyebrow,onChange:l=>n({eyebrow:l})}),d.jsx(N,{label:"Heading",value:e.heading,onChange:l=>n({heading:l})}),d.jsxs("div",{className:"list-editor",children:[d.jsxs("div",{className:"list-editor-head",children:[d.jsx("span",{className:"field-label",children:"Columns"}),d.jsx("button",{className:"btn btn-sm",onClick:i,children:"+ Column"})]}),Array.from({length:o}).map((l,c)=>d.jsxs("div",{className:"row-inline",children:[d.jsx("input",{className:"text-input",value:t[c]??"",placeholder:`Column ${c+1}`,onChange:p=>a(c,p.target.value)}),d.jsx("button",{className:"btn btn-icon btn-danger",title:"Remove column",onClick:()=>s(c),children:"✕"})]},c))]}),d.jsx(Lr,{label:"Rows",items:r,onChange:l=>n({rows:l}),blank:()=>Array.from({length:o},()=>""),renderItem:(l,c)=>d.jsx("div",{className:"row-cells",children:Array.from({length:o}).map((p,g)=>d.jsx("input",{className:"text-input",value:l[g]??"",placeholder:t[g]??`Col ${g+1}`,onChange:m=>{const v=l.slice();for(;v.length<o;)v.push("");v[g]=m.target.value,c(v)}},g))})})]})}function Z5({html:e}){return d.jsx("div",{className:"preview",children:d.jsx("iframe",{className:"preview-frame",title:"Deck preview",srcDoc:e,sandbox:"allow-same-origin",referrerPolicy:"no-referrer"})})}const e4=`
html { scroll-behavior: smooth; scroll-snap-type: y mandatory; }
body { gap: 0 !important; padding: 0 !important; }
.slide { min-height: 100vh !important; margin: 0 !important; border-radius: 0 !important; scroll-snap-align: start !important; scroll-snap-stop: always !important; }
.pmd-attribution { display: none !important; }
`;function n4({html:e,slideCount:n,onClose:t}){const r=D.useRef(null),[o,a]=D.useState(0),i=e.replace("</head>",`<style>${e4}</style></head>`),s=l=>a(c=>Math.max(0,Math.min(n-1,c+l)));return D.useEffect(()=>{const l=c=>{c.key==="Escape"?t():c.key==="ArrowRight"||c.key===" "||c.key==="PageDown"?(c.preventDefault(),a(p=>Math.min(n-1,p+1))):(c.key==="ArrowLeft"||c.key==="PageUp")&&(c.preventDefault(),a(p=>Math.max(0,p-1)))};return window.addEventListener("keydown",l),()=>window.removeEventListener("keydown",l)},[t,n]),D.useEffect(()=>{var p,g;const l=(p=r.current)==null?void 0:p.contentDocument,c=l==null?void 0:l.querySelectorAll("section.slide");(g=c==null?void 0:c[o])==null||g.scrollIntoView({behavior:"smooth",block:"start"})},[o,i]),d.jsxs("div",{className:"present-overlay",children:[d.jsx("div",{className:"present-stage",children:d.jsx("iframe",{ref:r,className:"present-frame",title:"Present deck",srcDoc:i,sandbox:"allow-same-origin"})}),d.jsxs("div",{className:"present-bar",children:[d.jsx("button",{className:"btn btn-icon",title:"Previous (←)",onClick:()=>s(-1),children:"←"}),d.jsxs("span",{className:"present-count",children:[o+1," / ",n]}),d.jsx("button",{className:"btn btn-icon",title:"Next (→)",onClick:()=>s(1),children:"→"}),d.jsx("button",{className:"btn",onClick:t,children:"Exit · Esc"})]})]})}const dl=[{id:"claude-opus-4-8",label:"Opus 4.8 — most capable"},{id:"claude-sonnet-4-6",label:"Sonnet 4.6 — faster, cheaper"},{id:"claude-haiku-4-5",label:"Haiku 4.5 — fastest"}],Ub=`You author slide decks as a single JSON object matching this schema — the "Deck JSON" spec used by presentation-md.

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
- Only emit fields defined above. Do not invent new layouts or fields.`;function Gb(e,n){return`Create a deck for the following brief. Set meta.theme to "${n}".

Brief:
${e.trim()}`}function t4(e,n){return`${Ub}

${Gb(e,n)}

Respond with ONLY the JSON object — no prose, no markdown fences.`}function r4(e){const n=e.match(/```(?:json)?\s*([\s\S]*?)```/i),t=((n==null?void 0:n[1])??e).trim(),r=t.indexOf("{"),o=t.lastIndexOf("}");return r===-1||o===-1||o<r?t:t.slice(r,o+1)}async function o4(e){const{apiKey:n,model:t,brief:r,theme:o,signal:a}=e;if(!r.trim())throw new Error("Describe your deck first.");if(!n.trim())throw new Error("Enter your Anthropic API key.");const{default:i}=await Rb(async()=>{const{default:g}=await import("./index-CPWM6sxn.js");return{default:g}},__vite__mapDeps([2,1])),c=(await new i({apiKey:n.trim(),dangerouslyAllowBrowser:!0}).messages.create({model:t,max_tokens:8e3,system:Ub,messages:[{role:"user",content:`${Gb(r,o)}

Respond with ONLY the JSON object — no prose, no markdown fences.`}]},{signal:a})).content.map(g=>g.type==="text"?g.text:"").join("");if(!c.trim())throw new Error("The model returned an empty response. Try again.");let p;try{p=Ki(r4(c))}catch(g){throw new Error(`Couldn't parse the generated deck: ${g.message}`)}return p.meta={...p.meta,theme:o},p}const Er="pmd-studio-anthropic-key",a4=["Q3 all-hands: momentum, key metrics, roadmap, and what's next.","Seed pitch for an AI-native analytics tool — problem, product, traction, ask.","Launch deck for a developer CLI: what it is, how it works, why it's fast."];function i4({currentTheme:e,onGenerate:n,onClose:t}){const[r,o]=D.useState(""),[a,i]=D.useState(e),[s,l]=D.useState(dl[0].id),[c,p]=D.useState(()=>localStorage.getItem(Er)??""),[g,m]=D.useState(()=>!!localStorage.getItem(Er)),[v,S]=D.useState(!1),[x,F]=D.useState(""),[f,u]=D.useState(!1),h=Ob(),b=async()=>{S(!0),F("Generating your deck…");try{g?localStorage.setItem(Er,c.trim()):localStorage.removeItem(Er);const k=await o4({apiKey:c,model:s,brief:r,theme:a});n(k),t()}catch(k){F(k.message)}finally{S(!1)}},y=async()=>{try{await navigator.clipboard.writeText(t4(r,a)),u(!0),setTimeout(()=>u(!1),1800)}catch{F("Couldn't copy — select the prompt manually.")}};return d.jsx("div",{className:"modal-overlay",onClick:t,children:d.jsxs("div",{className:"modal",onClick:k=>k.stopPropagation(),children:[d.jsxs("header",{className:"modal-head",children:[d.jsxs("div",{children:[d.jsx("strong",{children:"Generate a deck"}),d.jsx("span",{className:"muted small",children:"Describe it — get an editable deck in seconds."})]}),d.jsx("button",{className:"btn btn-sm",onClick:t,"aria-label":"Close",children:"✕"})]}),d.jsxs("div",{className:"modal-body",children:[d.jsx("label",{className:"field-label",children:"What's the deck about?"}),d.jsx("textarea",{className:"text-input brief-input",value:r,placeholder:"e.g. Q3 all-hands covering revenue, product wins, and the roadmap for next quarter.",rows:4,onChange:k=>o(k.target.value)}),d.jsx("div",{className:"chip-row",children:a4.map(k=>d.jsx("button",{className:"chip",onClick:()=>o(k),title:"Use this brief",children:k.split(/[:—]/)[0].trim()},k))}),d.jsxs("div",{className:"field-grid",children:[d.jsxs("label",{className:"inline-field",children:[d.jsx("span",{className:"muted small",children:"Theme"}),d.jsx("select",{className:"text-input",value:a,onChange:k=>i(k.target.value),children:h.map(k=>d.jsx("option",{value:k,children:k},k))})]}),d.jsxs("label",{className:"inline-field",children:[d.jsx("span",{className:"muted small",children:"Model"}),d.jsx("select",{className:"text-input",value:s,onChange:k=>l(k.target.value),children:dl.map(k=>d.jsx("option",{value:k.id,children:k.label},k.id))})]})]}),d.jsxs("div",{className:"gen-panel",children:[d.jsx("label",{className:"field-label",children:"Your Anthropic API key"}),d.jsx("input",{className:"text-input",type:"password",value:c,placeholder:"sk-ant-…",autoComplete:"off",onChange:k=>p(k.target.value)}),d.jsxs("label",{className:"checkbox-field",children:[d.jsx("input",{type:"checkbox",checked:g,onChange:k=>m(k.target.checked)}),d.jsx("span",{className:"muted small",children:"Remember on this device (stored only in your browser)"})]}),d.jsxs("p",{className:"muted small privacy-note",children:["Your key stays in this browser. Requests go straight to Anthropic — nothing is sent to our servers. Get a key at ",d.jsx("a",{href:"https://console.anthropic.com/settings/keys",target:"_blank",rel:"noreferrer",children:"console.anthropic.com"}),"."]}),d.jsx("button",{className:"btn btn-primary btn-block",disabled:v,onClick:b,children:v?"Generating…":"Generate deck"})]}),d.jsx("div",{className:"gen-divider",children:d.jsx("span",{children:"or hand it to your agent"})}),d.jsxs("div",{className:"gen-panel",children:[d.jsx("p",{className:"muted small",children:"No key? Copy a ready-made prompt and paste it into Claude Code, Cursor, or any agent with the presentation skill installed — then open the resulting deck here."}),d.jsx("button",{className:"btn btn-block",onClick:y,disabled:!r.trim(),children:f?"Copied ✓":"Copy prompt for your agent"})]}),x&&d.jsx("p",{className:"status muted small gen-status",children:x})]})]})})}const Hb="pmd-studio-deck-v1";function s4(){try{const e=localStorage.getItem(Hb);if(e){const n=JSON.parse(e);if((n==null?void 0:n.type)==="deck"&&Array.isArray(n.slides)&&n.slides.length)return n}}catch{}return $u}function l4(){var v;const[e,n]=D.useState(s4),[t,r]=D.useState(0),[o,a]=D.useState(!1),[i,s]=D.useState(!1);D.useEffect(()=>{try{localStorage.setItem(Hb,JSON.stringify(e))}catch{}},[e]);const l=D.useMemo(()=>{var S;try{return Ab(e,Hi(((S=e.meta)==null?void 0:S.theme)??"default-tech"))}catch(x){return`<pre style="color:#d9695a;font-family:monospace;padding:24px">${String(x)}</pre>`}},[e]),c=(S,x)=>{n({...e,slides:S}),x!==void 0&&r(x)},p=S=>{n({...e,slides:e.slides.map((x,F)=>F===t?S:x)})},g=()=>{n($u),r(0)},m=e.slides[Math.min(t,e.slides.length-1)];return d.jsxs("div",{className:"app",children:[d.jsx(Y5,{deck:e,onChange:n,onLoadExample:g,onPresent:()=>a(!0),onGenerate:()=>s(!0)}),d.jsxs("div",{className:"workspace",children:[d.jsx("aside",{className:"panel panel-left",children:d.jsx(K5,{slides:e.slides,selected:t,onSelect:r,onChange:c})}),d.jsx("main",{className:"panel panel-center",children:d.jsx(Z5,{html:l})}),d.jsx("aside",{className:"panel panel-right",children:m?d.jsx(X5,{slide:m,onChange:p}):d.jsx("p",{className:"muted",children:"No slide selected."})})]}),o&&d.jsx(n4,{html:l,slideCount:e.slides.length,onClose:()=>a(!1)}),i&&d.jsx(i4,{currentTheme:((v=e.meta)==null?void 0:v.theme)??"claude",onGenerate:S=>{n(S),r(0)},onClose:()=>s(!1)})]})}const Vb=document.getElementById("root");if(!Vb)throw new Error("Missing #root element");_u(Vb).render(d.jsx(D.StrictMode,{children:d.jsx(l4,{})}));export{Rb as _};
