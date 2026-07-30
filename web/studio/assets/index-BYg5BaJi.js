const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-Cusqe-qR.js","assets/jszip.min-CzDb6sHe.js","assets/_commonjsHelpers-Cpj98o6Y.js","assets/index-Bfaa0F9D.js","assets/index-BMZ5ciqn.js"])))=>i.map(i=>d[i]);
(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(a){if(a.ep)return;a.ep=!0;const o=n(a);fetch(a.href,o)}})();var vl={exports:{}},ha={},xl={exports:{}},M={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ar=Symbol.for("react.element"),y1=Symbol.for("react.portal"),v1=Symbol.for("react.fragment"),x1=Symbol.for("react.strict_mode"),k1=Symbol.for("react.profiler"),w1=Symbol.for("react.provider"),D1=Symbol.for("react.context"),C1=Symbol.for("react.forward_ref"),F1=Symbol.for("react.suspense"),E1=Symbol.for("react.memo"),S1=Symbol.for("react.lazy"),os=Symbol.iterator;function A1(e){return e===null||typeof e!="object"?null:(e=os&&e[os]||e["@@iterator"],typeof e=="function"?e:null)}var kl={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},wl=Object.assign,Dl={};function hn(e,t,n){this.props=e,this.context=t,this.refs=Dl,this.updater=n||kl}hn.prototype.isReactComponent={};hn.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};hn.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Cl(){}Cl.prototype=hn.prototype;function ri(e,t,n){this.props=e,this.context=t,this.refs=Dl,this.updater=n||kl}var ai=ri.prototype=new Cl;ai.constructor=ri;wl(ai,hn.prototype);ai.isPureReactComponent=!0;var is=Array.isArray,Fl=Object.prototype.hasOwnProperty,oi={current:null},El={key:!0,ref:!0,__self:!0,__source:!0};function Sl(e,t,n){var r,a={},o=null,i=null;if(t!=null)for(r in t.ref!==void 0&&(i=t.ref),t.key!==void 0&&(o=""+t.key),t)Fl.call(t,r)&&!El.hasOwnProperty(r)&&(a[r]=t[r]);var s=arguments.length-2;if(s===1)a.children=n;else if(1<s){for(var l=Array(s),d=0;d<s;d++)l[d]=arguments[d+2];a.children=l}if(e&&e.defaultProps)for(r in s=e.defaultProps,s)a[r]===void 0&&(a[r]=s[r]);return{$$typeof:ar,type:e,key:o,ref:i,props:a,_owner:oi.current}}function _1(e,t){return{$$typeof:ar,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function ii(e){return typeof e=="object"&&e!==null&&e.$$typeof===ar}function $1(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var ss=/\/+/g;function Ma(e,t){return typeof e=="object"&&e!==null&&e.key!=null?$1(""+e.key):t.toString(36)}function Tr(e,t,n,r,a){var o=typeof e;(o==="undefined"||o==="boolean")&&(e=null);var i=!1;if(e===null)i=!0;else switch(o){case"string":case"number":i=!0;break;case"object":switch(e.$$typeof){case ar:case y1:i=!0}}if(i)return i=e,a=a(i),e=r===""?"."+Ma(i,0):r,is(a)?(n="",e!=null&&(n=e.replace(ss,"$&/")+"/"),Tr(a,t,n,"",function(d){return d})):a!=null&&(ii(a)&&(a=_1(a,n+(!a.key||i&&i.key===a.key?"":(""+a.key).replace(ss,"$&/")+"/")+e)),t.push(a)),1;if(i=0,r=r===""?".":r+":",is(e))for(var s=0;s<e.length;s++){o=e[s];var l=r+Ma(o,s);i+=Tr(o,t,n,l,a)}else if(l=A1(e),typeof l=="function")for(e=l.call(e),s=0;!(o=e.next()).done;)o=o.value,l=r+Ma(o,s++),i+=Tr(o,t,n,l,a);else if(o==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return i}function pr(e,t,n){if(e==null)return e;var r=[],a=0;return Tr(e,r,"","",function(o){return t.call(n,o,a++)}),r}function T1(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var pe={current:null},jr={transition:null},j1={ReactCurrentDispatcher:pe,ReactCurrentBatchConfig:jr,ReactCurrentOwner:oi};function Al(){throw Error("act(...) is not supported in production builds of React.")}M.Children={map:pr,forEach:function(e,t,n){pr(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return pr(e,function(){t++}),t},toArray:function(e){return pr(e,function(t){return t})||[]},only:function(e){if(!ii(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};M.Component=hn;M.Fragment=v1;M.Profiler=k1;M.PureComponent=ri;M.StrictMode=x1;M.Suspense=F1;M.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=j1;M.act=Al;M.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=wl({},e.props),a=e.key,o=e.ref,i=e._owner;if(t!=null){if(t.ref!==void 0&&(o=t.ref,i=oi.current),t.key!==void 0&&(a=""+t.key),e.type&&e.type.defaultProps)var s=e.type.defaultProps;for(l in t)Fl.call(t,l)&&!El.hasOwnProperty(l)&&(r[l]=t[l]===void 0&&s!==void 0?s[l]:t[l])}var l=arguments.length-2;if(l===1)r.children=n;else if(1<l){s=Array(l);for(var d=0;d<l;d++)s[d]=arguments[d+2];r.children=s}return{$$typeof:ar,type:e.type,key:a,ref:o,props:r,_owner:i}};M.createContext=function(e){return e={$$typeof:D1,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:w1,_context:e},e.Consumer=e};M.createElement=Sl;M.createFactory=function(e){var t=Sl.bind(null,e);return t.type=e,t};M.createRef=function(){return{current:null}};M.forwardRef=function(e){return{$$typeof:C1,render:e}};M.isValidElement=ii;M.lazy=function(e){return{$$typeof:S1,_payload:{_status:-1,_result:e},_init:T1}};M.memo=function(e,t){return{$$typeof:E1,type:e,compare:t===void 0?null:t}};M.startTransition=function(e){var t=jr.transition;jr.transition={};try{e()}finally{jr.transition=t}};M.unstable_act=Al;M.useCallback=function(e,t){return pe.current.useCallback(e,t)};M.useContext=function(e){return pe.current.useContext(e)};M.useDebugValue=function(){};M.useDeferredValue=function(e){return pe.current.useDeferredValue(e)};M.useEffect=function(e,t){return pe.current.useEffect(e,t)};M.useId=function(){return pe.current.useId()};M.useImperativeHandle=function(e,t,n){return pe.current.useImperativeHandle(e,t,n)};M.useInsertionEffect=function(e,t){return pe.current.useInsertionEffect(e,t)};M.useLayoutEffect=function(e,t){return pe.current.useLayoutEffect(e,t)};M.useMemo=function(e,t){return pe.current.useMemo(e,t)};M.useReducer=function(e,t,n){return pe.current.useReducer(e,t,n)};M.useRef=function(e){return pe.current.useRef(e)};M.useState=function(e){return pe.current.useState(e)};M.useSyncExternalStore=function(e,t,n){return pe.current.useSyncExternalStore(e,t,n)};M.useTransition=function(){return pe.current.useTransition()};M.version="18.3.1";xl.exports=M;var I=xl.exports;/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var P1=I,M1=Symbol.for("react.element"),N1=Symbol.for("react.fragment"),I1=Object.prototype.hasOwnProperty,B1=P1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,z1={key:!0,ref:!0,__self:!0,__source:!0};function _l(e,t,n){var r,a={},o=null,i=null;n!==void 0&&(o=""+n),t.key!==void 0&&(o=""+t.key),t.ref!==void 0&&(i=t.ref);for(r in t)I1.call(t,r)&&!z1.hasOwnProperty(r)&&(a[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)a[r]===void 0&&(a[r]=t[r]);return{$$typeof:M1,type:e,key:o,ref:i,props:a,_owner:B1.current}}ha.Fragment=N1;ha.jsx=_l;ha.jsxs=_l;vl.exports=ha;var c=vl.exports,$l={exports:{}},Fe={},Tl={exports:{}},jl={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(S,$){var j=S.length;S.push($);e:for(;0<j;){var Q=j-1>>>1,ee=S[Q];if(0<a(ee,$))S[Q]=$,S[j]=ee,j=Q;else break e}}function n(S){return S.length===0?null:S[0]}function r(S){if(S.length===0)return null;var $=S[0],j=S.pop();if(j!==$){S[0]=j;e:for(var Q=0,ee=S.length,dr=ee>>>1;Q<dr;){var wt=2*(Q+1)-1,Pa=S[wt],Dt=wt+1,ur=S[Dt];if(0>a(Pa,j))Dt<ee&&0>a(ur,Pa)?(S[Q]=ur,S[Dt]=j,Q=Dt):(S[Q]=Pa,S[wt]=j,Q=wt);else if(Dt<ee&&0>a(ur,j))S[Q]=ur,S[Dt]=j,Q=Dt;else break e}}return $}function a(S,$){var j=S.sortIndex-$.sortIndex;return j!==0?j:S.id-$.id}if(typeof performance=="object"&&typeof performance.now=="function"){var o=performance;e.unstable_now=function(){return o.now()}}else{var i=Date,s=i.now();e.unstable_now=function(){return i.now()-s}}var l=[],d=[],f=1,h=null,m=3,b=!1,y=!1,v=!1,_=typeof setTimeout=="function"?setTimeout:null,p=typeof clearTimeout=="function"?clearTimeout:null,u=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function g(S){for(var $=n(d);$!==null;){if($.callback===null)r(d);else if($.startTime<=S)r(d),$.sortIndex=$.expirationTime,t(l,$);else break;$=n(d)}}function x(S){if(v=!1,g(S),!y)if(n(l)!==null)y=!0,Ta(D);else{var $=n(d);$!==null&&ja(x,$.startTime-S)}}function D(S,$){y=!1,v&&(v=!1,p(C),C=-1),b=!0;var j=m;try{for(g($),h=n(l);h!==null&&(!(h.expirationTime>$)||S&&!F());){var Q=h.callback;if(typeof Q=="function"){h.callback=null,m=h.priorityLevel;var ee=Q(h.expirationTime<=$);$=e.unstable_now(),typeof ee=="function"?h.callback=ee:h===n(l)&&r(l),g($)}else r(l);h=n(l)}if(h!==null)var dr=!0;else{var wt=n(d);wt!==null&&ja(x,wt.startTime-$),dr=!1}return dr}finally{h=null,m=j,b=!1}}var w=!1,A=null,C=-1,G=5,T=-1;function F(){return!(e.unstable_now()-T<G)}function R(){if(A!==null){var S=e.unstable_now();T=S;var $=!0;try{$=A(!0,S)}finally{$?J():(w=!1,A=null)}}else w=!1}var J;if(typeof u=="function")J=function(){u(R)};else if(typeof MessageChannel<"u"){var zt=new MessageChannel,b1=zt.port2;zt.port1.onmessage=R,J=function(){b1.postMessage(null)}}else J=function(){_(R,0)};function Ta(S){A=S,w||(w=!0,J())}function ja(S,$){C=_(function(){S(e.unstable_now())},$)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(S){S.callback=null},e.unstable_continueExecution=function(){y||b||(y=!0,Ta(D))},e.unstable_forceFrameRate=function(S){0>S||125<S?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):G=0<S?Math.floor(1e3/S):5},e.unstable_getCurrentPriorityLevel=function(){return m},e.unstable_getFirstCallbackNode=function(){return n(l)},e.unstable_next=function(S){switch(m){case 1:case 2:case 3:var $=3;break;default:$=m}var j=m;m=$;try{return S()}finally{m=j}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(S,$){switch(S){case 1:case 2:case 3:case 4:case 5:break;default:S=3}var j=m;m=S;try{return $()}finally{m=j}},e.unstable_scheduleCallback=function(S,$,j){var Q=e.unstable_now();switch(typeof j=="object"&&j!==null?(j=j.delay,j=typeof j=="number"&&0<j?Q+j:Q):j=Q,S){case 1:var ee=-1;break;case 2:ee=250;break;case 5:ee=1073741823;break;case 4:ee=1e4;break;default:ee=5e3}return ee=j+ee,S={id:f++,callback:$,priorityLevel:S,startTime:j,expirationTime:ee,sortIndex:-1},j>Q?(S.sortIndex=j,t(d,S),n(l)===null&&S===n(d)&&(v?(p(C),C=-1):v=!0,ja(x,j-Q))):(S.sortIndex=ee,t(l,S),y||b||(y=!0,Ta(D))),S},e.unstable_shouldYield=F,e.unstable_wrapCallback=function(S){var $=m;return function(){var j=m;m=$;try{return S.apply(this,arguments)}finally{m=j}}}})(jl);Tl.exports=jl;var O1=Tl.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var L1=I,Ce=O1;function k(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Pl=new Set,Ln={};function It(e,t){an(e,t),an(e+"Capture",t)}function an(e,t){for(Ln[e]=t,e=0;e<t.length;e++)Pl.add(t[e])}var Je=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),lo=Object.prototype.hasOwnProperty,G1=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,ls={},cs={};function R1(e){return lo.call(cs,e)?!0:lo.call(ls,e)?!1:G1.test(e)?cs[e]=!0:(ls[e]=!0,!1)}function W1(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function U1(e,t,n,r){if(t===null||typeof t>"u"||W1(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function fe(e,t,n,r,a,o,i){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=a,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=i}var oe={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){oe[e]=new fe(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];oe[t]=new fe(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){oe[e]=new fe(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){oe[e]=new fe(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){oe[e]=new fe(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){oe[e]=new fe(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){oe[e]=new fe(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){oe[e]=new fe(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){oe[e]=new fe(e,5,!1,e.toLowerCase(),null,!1,!1)});var si=/[\-:]([a-z])/g;function li(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(si,li);oe[t]=new fe(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(si,li);oe[t]=new fe(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(si,li);oe[t]=new fe(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){oe[e]=new fe(e,1,!1,e.toLowerCase(),null,!1,!1)});oe.xlinkHref=new fe("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){oe[e]=new fe(e,1,!1,e.toLowerCase(),null,!0,!0)});function ci(e,t,n,r){var a=oe.hasOwnProperty(t)?oe[t]:null;(a!==null?a.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(U1(t,n,a,r)&&(n=null),r||a===null?R1(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):a.mustUseProperty?e[a.propertyName]=n===null?a.type===3?!1:"":n:(t=a.attributeName,r=a.attributeNamespace,n===null?e.removeAttribute(t):(a=a.type,n=a===3||a===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var tt=L1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,fr=Symbol.for("react.element"),Lt=Symbol.for("react.portal"),Gt=Symbol.for("react.fragment"),di=Symbol.for("react.strict_mode"),co=Symbol.for("react.profiler"),Ml=Symbol.for("react.provider"),Nl=Symbol.for("react.context"),ui=Symbol.for("react.forward_ref"),uo=Symbol.for("react.suspense"),po=Symbol.for("react.suspense_list"),pi=Symbol.for("react.memo"),rt=Symbol.for("react.lazy"),Il=Symbol.for("react.offscreen"),ds=Symbol.iterator;function vn(e){return e===null||typeof e!="object"?null:(e=ds&&e[ds]||e["@@iterator"],typeof e=="function"?e:null)}var q=Object.assign,Na;function Sn(e){if(Na===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Na=t&&t[1]||""}return`
`+Na+e}var Ia=!1;function Ba(e,t){if(!e||Ia)return"";Ia=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(d){var r=d}Reflect.construct(e,[],t)}else{try{t.call()}catch(d){r=d}e.call(t.prototype)}else{try{throw Error()}catch(d){r=d}e()}}catch(d){if(d&&r&&typeof d.stack=="string"){for(var a=d.stack.split(`
`),o=r.stack.split(`
`),i=a.length-1,s=o.length-1;1<=i&&0<=s&&a[i]!==o[s];)s--;for(;1<=i&&0<=s;i--,s--)if(a[i]!==o[s]){if(i!==1||s!==1)do if(i--,s--,0>s||a[i]!==o[s]){var l=`
`+a[i].replace(" at new "," at ");return e.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",e.displayName)),l}while(1<=i&&0<=s);break}}}finally{Ia=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Sn(e):""}function H1(e){switch(e.tag){case 5:return Sn(e.type);case 16:return Sn("Lazy");case 13:return Sn("Suspense");case 19:return Sn("SuspenseList");case 0:case 2:case 15:return e=Ba(e.type,!1),e;case 11:return e=Ba(e.type.render,!1),e;case 1:return e=Ba(e.type,!0),e;default:return""}}function fo(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Gt:return"Fragment";case Lt:return"Portal";case co:return"Profiler";case di:return"StrictMode";case uo:return"Suspense";case po:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Nl:return(e.displayName||"Context")+".Consumer";case Ml:return(e._context.displayName||"Context")+".Provider";case ui:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case pi:return t=e.displayName||null,t!==null?t:fo(e.type)||"Memo";case rt:t=e._payload,e=e._init;try{return fo(e(t))}catch{}}return null}function q1(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return fo(t);case 8:return t===di?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function bt(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Bl(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function V1(e){var t=Bl(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var a=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return a.call(this)},set:function(i){r=""+i,o.call(this,i)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(i){r=""+i},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function gr(e){e._valueTracker||(e._valueTracker=V1(e))}function zl(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Bl(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Ur(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function go(e,t){var n=t.checked;return q({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function us(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=bt(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Ol(e,t){t=t.checked,t!=null&&ci(e,"checked",t,!1)}function ho(e,t){Ol(e,t);var n=bt(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?mo(e,t.type,n):t.hasOwnProperty("defaultValue")&&mo(e,t.type,bt(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function ps(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function mo(e,t,n){(t!=="number"||Ur(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var An=Array.isArray;function Xt(e,t,n,r){if(e=e.options,t){t={};for(var a=0;a<n.length;a++)t["$"+n[a]]=!0;for(n=0;n<e.length;n++)a=t.hasOwnProperty("$"+e[n].value),e[n].selected!==a&&(e[n].selected=a),a&&r&&(e[n].defaultSelected=!0)}else{for(n=""+bt(n),t=null,a=0;a<e.length;a++){if(e[a].value===n){e[a].selected=!0,r&&(e[a].defaultSelected=!0);return}t!==null||e[a].disabled||(t=e[a])}t!==null&&(t.selected=!0)}}function bo(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(k(91));return q({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function fs(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(k(92));if(An(n)){if(1<n.length)throw Error(k(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:bt(n)}}function Ll(e,t){var n=bt(t.value),r=bt(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function gs(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Gl(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function yo(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Gl(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var hr,Rl=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,a){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,a)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(hr=hr||document.createElement("div"),hr.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=hr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Gn(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Tn={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Q1=["Webkit","ms","Moz","O"];Object.keys(Tn).forEach(function(e){Q1.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Tn[t]=Tn[e]})});function Wl(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Tn.hasOwnProperty(e)&&Tn[e]?(""+t).trim():t+"px"}function Ul(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,a=Wl(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,a):e[n]=a}}var Y1=q({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function vo(e,t){if(t){if(Y1[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(k(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(k(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(k(61))}if(t.style!=null&&typeof t.style!="object")throw Error(k(62))}}function xo(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ko=null;function fi(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var wo=null,Zt=null,en=null;function hs(e){if(e=sr(e)){if(typeof wo!="function")throw Error(k(280));var t=e.stateNode;t&&(t=xa(t),wo(e.stateNode,e.type,t))}}function Hl(e){Zt?en?en.push(e):en=[e]:Zt=e}function ql(){if(Zt){var e=Zt,t=en;if(en=Zt=null,hs(e),t)for(e=0;e<t.length;e++)hs(t[e])}}function Vl(e,t){return e(t)}function Ql(){}var za=!1;function Yl(e,t,n){if(za)return e(t,n);za=!0;try{return Vl(e,t,n)}finally{za=!1,(Zt!==null||en!==null)&&(Ql(),ql())}}function Rn(e,t){var n=e.stateNode;if(n===null)return null;var r=xa(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(k(231,t,typeof n));return n}var Do=!1;if(Je)try{var xn={};Object.defineProperty(xn,"passive",{get:function(){Do=!0}}),window.addEventListener("test",xn,xn),window.removeEventListener("test",xn,xn)}catch{Do=!1}function K1(e,t,n,r,a,o,i,s,l){var d=Array.prototype.slice.call(arguments,3);try{t.apply(n,d)}catch(f){this.onError(f)}}var jn=!1,Hr=null,qr=!1,Co=null,J1={onError:function(e){jn=!0,Hr=e}};function X1(e,t,n,r,a,o,i,s,l){jn=!1,Hr=null,K1.apply(J1,arguments)}function Z1(e,t,n,r,a,o,i,s,l){if(X1.apply(this,arguments),jn){if(jn){var d=Hr;jn=!1,Hr=null}else throw Error(k(198));qr||(qr=!0,Co=d)}}function Bt(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Kl(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function ms(e){if(Bt(e)!==e)throw Error(k(188))}function ex(e){var t=e.alternate;if(!t){if(t=Bt(e),t===null)throw Error(k(188));return t!==e?null:e}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var o=a.alternate;if(o===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===o.child){for(o=a.child;o;){if(o===n)return ms(a),e;if(o===r)return ms(a),t;o=o.sibling}throw Error(k(188))}if(n.return!==r.return)n=a,r=o;else{for(var i=!1,s=a.child;s;){if(s===n){i=!0,n=a,r=o;break}if(s===r){i=!0,r=a,n=o;break}s=s.sibling}if(!i){for(s=o.child;s;){if(s===n){i=!0,n=o,r=a;break}if(s===r){i=!0,r=o,n=a;break}s=s.sibling}if(!i)throw Error(k(189))}}if(n.alternate!==r)throw Error(k(190))}if(n.tag!==3)throw Error(k(188));return n.stateNode.current===n?e:t}function Jl(e){return e=ex(e),e!==null?Xl(e):null}function Xl(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Xl(e);if(t!==null)return t;e=e.sibling}return null}var Zl=Ce.unstable_scheduleCallback,bs=Ce.unstable_cancelCallback,tx=Ce.unstable_shouldYield,nx=Ce.unstable_requestPaint,Y=Ce.unstable_now,rx=Ce.unstable_getCurrentPriorityLevel,gi=Ce.unstable_ImmediatePriority,e2=Ce.unstable_UserBlockingPriority,Vr=Ce.unstable_NormalPriority,ax=Ce.unstable_LowPriority,t2=Ce.unstable_IdlePriority,ma=null,Ue=null;function ox(e){if(Ue&&typeof Ue.onCommitFiberRoot=="function")try{Ue.onCommitFiberRoot(ma,e,void 0,(e.current.flags&128)===128)}catch{}}var ze=Math.clz32?Math.clz32:lx,ix=Math.log,sx=Math.LN2;function lx(e){return e>>>=0,e===0?32:31-(ix(e)/sx|0)|0}var mr=64,br=4194304;function _n(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Qr(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,a=e.suspendedLanes,o=e.pingedLanes,i=n&268435455;if(i!==0){var s=i&~a;s!==0?r=_n(s):(o&=i,o!==0&&(r=_n(o)))}else i=n&~a,i!==0?r=_n(i):o!==0&&(r=_n(o));if(r===0)return 0;if(t!==0&&t!==r&&!(t&a)&&(a=r&-r,o=t&-t,a>=o||a===16&&(o&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-ze(t),a=1<<n,r|=e[n],t&=~a;return r}function cx(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function dx(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,a=e.expirationTimes,o=e.pendingLanes;0<o;){var i=31-ze(o),s=1<<i,l=a[i];l===-1?(!(s&n)||s&r)&&(a[i]=cx(s,t)):l<=t&&(e.expiredLanes|=s),o&=~s}}function Fo(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function n2(){var e=mr;return mr<<=1,!(mr&4194240)&&(mr=64),e}function Oa(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function or(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-ze(t),e[t]=n}function ux(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var a=31-ze(n),o=1<<a;t[a]=0,r[a]=-1,e[a]=-1,n&=~o}}function hi(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-ze(n),a=1<<r;a&t|e[r]&t&&(e[r]|=t),n&=~a}}var B=0;function r2(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var a2,mi,o2,i2,s2,Eo=!1,yr=[],ct=null,dt=null,ut=null,Wn=new Map,Un=new Map,ot=[],px="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function ys(e,t){switch(e){case"focusin":case"focusout":ct=null;break;case"dragenter":case"dragleave":dt=null;break;case"mouseover":case"mouseout":ut=null;break;case"pointerover":case"pointerout":Wn.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Un.delete(t.pointerId)}}function kn(e,t,n,r,a,o){return e===null||e.nativeEvent!==o?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:o,targetContainers:[a]},t!==null&&(t=sr(t),t!==null&&mi(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,a!==null&&t.indexOf(a)===-1&&t.push(a),e)}function fx(e,t,n,r,a){switch(t){case"focusin":return ct=kn(ct,e,t,n,r,a),!0;case"dragenter":return dt=kn(dt,e,t,n,r,a),!0;case"mouseover":return ut=kn(ut,e,t,n,r,a),!0;case"pointerover":var o=a.pointerId;return Wn.set(o,kn(Wn.get(o)||null,e,t,n,r,a)),!0;case"gotpointercapture":return o=a.pointerId,Un.set(o,kn(Un.get(o)||null,e,t,n,r,a)),!0}return!1}function l2(e){var t=Et(e.target);if(t!==null){var n=Bt(t);if(n!==null){if(t=n.tag,t===13){if(t=Kl(n),t!==null){e.blockedOn=t,s2(e.priority,function(){o2(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Pr(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=So(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);ko=r,n.target.dispatchEvent(r),ko=null}else return t=sr(n),t!==null&&mi(t),e.blockedOn=n,!1;t.shift()}return!0}function vs(e,t,n){Pr(e)&&n.delete(t)}function gx(){Eo=!1,ct!==null&&Pr(ct)&&(ct=null),dt!==null&&Pr(dt)&&(dt=null),ut!==null&&Pr(ut)&&(ut=null),Wn.forEach(vs),Un.forEach(vs)}function wn(e,t){e.blockedOn===t&&(e.blockedOn=null,Eo||(Eo=!0,Ce.unstable_scheduleCallback(Ce.unstable_NormalPriority,gx)))}function Hn(e){function t(a){return wn(a,e)}if(0<yr.length){wn(yr[0],e);for(var n=1;n<yr.length;n++){var r=yr[n];r.blockedOn===e&&(r.blockedOn=null)}}for(ct!==null&&wn(ct,e),dt!==null&&wn(dt,e),ut!==null&&wn(ut,e),Wn.forEach(t),Un.forEach(t),n=0;n<ot.length;n++)r=ot[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<ot.length&&(n=ot[0],n.blockedOn===null);)l2(n),n.blockedOn===null&&ot.shift()}var tn=tt.ReactCurrentBatchConfig,Yr=!0;function hx(e,t,n,r){var a=B,o=tn.transition;tn.transition=null;try{B=1,bi(e,t,n,r)}finally{B=a,tn.transition=o}}function mx(e,t,n,r){var a=B,o=tn.transition;tn.transition=null;try{B=4,bi(e,t,n,r)}finally{B=a,tn.transition=o}}function bi(e,t,n,r){if(Yr){var a=So(e,t,n,r);if(a===null)Ya(e,t,r,Kr,n),ys(e,r);else if(fx(a,e,t,n,r))r.stopPropagation();else if(ys(e,r),t&4&&-1<px.indexOf(e)){for(;a!==null;){var o=sr(a);if(o!==null&&a2(o),o=So(e,t,n,r),o===null&&Ya(e,t,r,Kr,n),o===a)break;a=o}a!==null&&r.stopPropagation()}else Ya(e,t,r,null,n)}}var Kr=null;function So(e,t,n,r){if(Kr=null,e=fi(r),e=Et(e),e!==null)if(t=Bt(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Kl(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Kr=e,null}function c2(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(rx()){case gi:return 1;case e2:return 4;case Vr:case ax:return 16;case t2:return 536870912;default:return 16}default:return 16}}var st=null,yi=null,Mr=null;function d2(){if(Mr)return Mr;var e,t=yi,n=t.length,r,a="value"in st?st.value:st.textContent,o=a.length;for(e=0;e<n&&t[e]===a[e];e++);var i=n-e;for(r=1;r<=i&&t[n-r]===a[o-r];r++);return Mr=a.slice(e,1<r?1-r:void 0)}function Nr(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function vr(){return!0}function xs(){return!1}function Ee(e){function t(n,r,a,o,i){this._reactName=n,this._targetInst=a,this.type=r,this.nativeEvent=o,this.target=i,this.currentTarget=null;for(var s in e)e.hasOwnProperty(s)&&(n=e[s],this[s]=n?n(o):o[s]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?vr:xs,this.isPropagationStopped=xs,this}return q(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=vr)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=vr)},persist:function(){},isPersistent:vr}),t}var mn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},vi=Ee(mn),ir=q({},mn,{view:0,detail:0}),bx=Ee(ir),La,Ga,Dn,ba=q({},ir,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:xi,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Dn&&(Dn&&e.type==="mousemove"?(La=e.screenX-Dn.screenX,Ga=e.screenY-Dn.screenY):Ga=La=0,Dn=e),La)},movementY:function(e){return"movementY"in e?e.movementY:Ga}}),ks=Ee(ba),yx=q({},ba,{dataTransfer:0}),vx=Ee(yx),xx=q({},ir,{relatedTarget:0}),Ra=Ee(xx),kx=q({},mn,{animationName:0,elapsedTime:0,pseudoElement:0}),wx=Ee(kx),Dx=q({},mn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Cx=Ee(Dx),Fx=q({},mn,{data:0}),ws=Ee(Fx),Ex={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Sx={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Ax={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function _x(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Ax[e])?!!t[e]:!1}function xi(){return _x}var $x=q({},ir,{key:function(e){if(e.key){var t=Ex[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Nr(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Sx[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:xi,charCode:function(e){return e.type==="keypress"?Nr(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Nr(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Tx=Ee($x),jx=q({},ba,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Ds=Ee(jx),Px=q({},ir,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:xi}),Mx=Ee(Px),Nx=q({},mn,{propertyName:0,elapsedTime:0,pseudoElement:0}),Ix=Ee(Nx),Bx=q({},ba,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),zx=Ee(Bx),Ox=[9,13,27,32],ki=Je&&"CompositionEvent"in window,Pn=null;Je&&"documentMode"in document&&(Pn=document.documentMode);var Lx=Je&&"TextEvent"in window&&!Pn,u2=Je&&(!ki||Pn&&8<Pn&&11>=Pn),Cs=" ",Fs=!1;function p2(e,t){switch(e){case"keyup":return Ox.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function f2(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Rt=!1;function Gx(e,t){switch(e){case"compositionend":return f2(t);case"keypress":return t.which!==32?null:(Fs=!0,Cs);case"textInput":return e=t.data,e===Cs&&Fs?null:e;default:return null}}function Rx(e,t){if(Rt)return e==="compositionend"||!ki&&p2(e,t)?(e=d2(),Mr=yi=st=null,Rt=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return u2&&t.locale!=="ko"?null:t.data;default:return null}}var Wx={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Es(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Wx[e.type]:t==="textarea"}function g2(e,t,n,r){Hl(r),t=Jr(t,"onChange"),0<t.length&&(n=new vi("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Mn=null,qn=null;function Ux(e){F2(e,0)}function ya(e){var t=Ht(e);if(zl(t))return e}function Hx(e,t){if(e==="change")return t}var h2=!1;if(Je){var Wa;if(Je){var Ua="oninput"in document;if(!Ua){var Ss=document.createElement("div");Ss.setAttribute("oninput","return;"),Ua=typeof Ss.oninput=="function"}Wa=Ua}else Wa=!1;h2=Wa&&(!document.documentMode||9<document.documentMode)}function As(){Mn&&(Mn.detachEvent("onpropertychange",m2),qn=Mn=null)}function m2(e){if(e.propertyName==="value"&&ya(qn)){var t=[];g2(t,qn,e,fi(e)),Yl(Ux,t)}}function qx(e,t,n){e==="focusin"?(As(),Mn=t,qn=n,Mn.attachEvent("onpropertychange",m2)):e==="focusout"&&As()}function Vx(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return ya(qn)}function Qx(e,t){if(e==="click")return ya(t)}function Yx(e,t){if(e==="input"||e==="change")return ya(t)}function Kx(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Le=typeof Object.is=="function"?Object.is:Kx;function Vn(e,t){if(Le(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var a=n[r];if(!lo.call(t,a)||!Le(e[a],t[a]))return!1}return!0}function _s(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function $s(e,t){var n=_s(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=_s(n)}}function b2(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?b2(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function y2(){for(var e=window,t=Ur();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Ur(e.document)}return t}function wi(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Jx(e){var t=y2(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&b2(n.ownerDocument.documentElement,n)){if(r!==null&&wi(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var a=n.textContent.length,o=Math.min(r.start,a);r=r.end===void 0?o:Math.min(r.end,a),!e.extend&&o>r&&(a=r,r=o,o=a),a=$s(n,o);var i=$s(n,r);a&&i&&(e.rangeCount!==1||e.anchorNode!==a.node||e.anchorOffset!==a.offset||e.focusNode!==i.node||e.focusOffset!==i.offset)&&(t=t.createRange(),t.setStart(a.node,a.offset),e.removeAllRanges(),o>r?(e.addRange(t),e.extend(i.node,i.offset)):(t.setEnd(i.node,i.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Xx=Je&&"documentMode"in document&&11>=document.documentMode,Wt=null,Ao=null,Nn=null,_o=!1;function Ts(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;_o||Wt==null||Wt!==Ur(r)||(r=Wt,"selectionStart"in r&&wi(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Nn&&Vn(Nn,r)||(Nn=r,r=Jr(Ao,"onSelect"),0<r.length&&(t=new vi("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=Wt)))}function xr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Ut={animationend:xr("Animation","AnimationEnd"),animationiteration:xr("Animation","AnimationIteration"),animationstart:xr("Animation","AnimationStart"),transitionend:xr("Transition","TransitionEnd")},Ha={},v2={};Je&&(v2=document.createElement("div").style,"AnimationEvent"in window||(delete Ut.animationend.animation,delete Ut.animationiteration.animation,delete Ut.animationstart.animation),"TransitionEvent"in window||delete Ut.transitionend.transition);function va(e){if(Ha[e])return Ha[e];if(!Ut[e])return e;var t=Ut[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in v2)return Ha[e]=t[n];return e}var x2=va("animationend"),k2=va("animationiteration"),w2=va("animationstart"),D2=va("transitionend"),C2=new Map,js="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function vt(e,t){C2.set(e,t),It(t,[e])}for(var qa=0;qa<js.length;qa++){var Va=js[qa],Zx=Va.toLowerCase(),ek=Va[0].toUpperCase()+Va.slice(1);vt(Zx,"on"+ek)}vt(x2,"onAnimationEnd");vt(k2,"onAnimationIteration");vt(w2,"onAnimationStart");vt("dblclick","onDoubleClick");vt("focusin","onFocus");vt("focusout","onBlur");vt(D2,"onTransitionEnd");an("onMouseEnter",["mouseout","mouseover"]);an("onMouseLeave",["mouseout","mouseover"]);an("onPointerEnter",["pointerout","pointerover"]);an("onPointerLeave",["pointerout","pointerover"]);It("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));It("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));It("onBeforeInput",["compositionend","keypress","textInput","paste"]);It("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));It("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));It("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var $n="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),tk=new Set("cancel close invalid load scroll toggle".split(" ").concat($n));function Ps(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,Z1(r,t,void 0,e),e.currentTarget=null}function F2(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],a=r.event;r=r.listeners;e:{var o=void 0;if(t)for(var i=r.length-1;0<=i;i--){var s=r[i],l=s.instance,d=s.currentTarget;if(s=s.listener,l!==o&&a.isPropagationStopped())break e;Ps(a,s,d),o=l}else for(i=0;i<r.length;i++){if(s=r[i],l=s.instance,d=s.currentTarget,s=s.listener,l!==o&&a.isPropagationStopped())break e;Ps(a,s,d),o=l}}}if(qr)throw e=Co,qr=!1,Co=null,e}function O(e,t){var n=t[Mo];n===void 0&&(n=t[Mo]=new Set);var r=e+"__bubble";n.has(r)||(E2(t,e,2,!1),n.add(r))}function Qa(e,t,n){var r=0;t&&(r|=4),E2(n,e,r,t)}var kr="_reactListening"+Math.random().toString(36).slice(2);function Qn(e){if(!e[kr]){e[kr]=!0,Pl.forEach(function(n){n!=="selectionchange"&&(tk.has(n)||Qa(n,!1,e),Qa(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[kr]||(t[kr]=!0,Qa("selectionchange",!1,t))}}function E2(e,t,n,r){switch(c2(t)){case 1:var a=hx;break;case 4:a=mx;break;default:a=bi}n=a.bind(null,t,n,e),a=void 0,!Do||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(a=!0),r?a!==void 0?e.addEventListener(t,n,{capture:!0,passive:a}):e.addEventListener(t,n,!0):a!==void 0?e.addEventListener(t,n,{passive:a}):e.addEventListener(t,n,!1)}function Ya(e,t,n,r,a){var o=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var i=r.tag;if(i===3||i===4){var s=r.stateNode.containerInfo;if(s===a||s.nodeType===8&&s.parentNode===a)break;if(i===4)for(i=r.return;i!==null;){var l=i.tag;if((l===3||l===4)&&(l=i.stateNode.containerInfo,l===a||l.nodeType===8&&l.parentNode===a))return;i=i.return}for(;s!==null;){if(i=Et(s),i===null)return;if(l=i.tag,l===5||l===6){r=o=i;continue e}s=s.parentNode}}r=r.return}Yl(function(){var d=o,f=fi(n),h=[];e:{var m=C2.get(e);if(m!==void 0){var b=vi,y=e;switch(e){case"keypress":if(Nr(n)===0)break e;case"keydown":case"keyup":b=Tx;break;case"focusin":y="focus",b=Ra;break;case"focusout":y="blur",b=Ra;break;case"beforeblur":case"afterblur":b=Ra;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":b=ks;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":b=vx;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":b=Mx;break;case x2:case k2:case w2:b=wx;break;case D2:b=Ix;break;case"scroll":b=bx;break;case"wheel":b=zx;break;case"copy":case"cut":case"paste":b=Cx;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":b=Ds}var v=(t&4)!==0,_=!v&&e==="scroll",p=v?m!==null?m+"Capture":null:m;v=[];for(var u=d,g;u!==null;){g=u;var x=g.stateNode;if(g.tag===5&&x!==null&&(g=x,p!==null&&(x=Rn(u,p),x!=null&&v.push(Yn(u,x,g)))),_)break;u=u.return}0<v.length&&(m=new b(m,y,null,n,f),h.push({event:m,listeners:v}))}}if(!(t&7)){e:{if(m=e==="mouseover"||e==="pointerover",b=e==="mouseout"||e==="pointerout",m&&n!==ko&&(y=n.relatedTarget||n.fromElement)&&(Et(y)||y[Xe]))break e;if((b||m)&&(m=f.window===f?f:(m=f.ownerDocument)?m.defaultView||m.parentWindow:window,b?(y=n.relatedTarget||n.toElement,b=d,y=y?Et(y):null,y!==null&&(_=Bt(y),y!==_||y.tag!==5&&y.tag!==6)&&(y=null)):(b=null,y=d),b!==y)){if(v=ks,x="onMouseLeave",p="onMouseEnter",u="mouse",(e==="pointerout"||e==="pointerover")&&(v=Ds,x="onPointerLeave",p="onPointerEnter",u="pointer"),_=b==null?m:Ht(b),g=y==null?m:Ht(y),m=new v(x,u+"leave",b,n,f),m.target=_,m.relatedTarget=g,x=null,Et(f)===d&&(v=new v(p,u+"enter",y,n,f),v.target=g,v.relatedTarget=_,x=v),_=x,b&&y)t:{for(v=b,p=y,u=0,g=v;g;g=Ot(g))u++;for(g=0,x=p;x;x=Ot(x))g++;for(;0<u-g;)v=Ot(v),u--;for(;0<g-u;)p=Ot(p),g--;for(;u--;){if(v===p||p!==null&&v===p.alternate)break t;v=Ot(v),p=Ot(p)}v=null}else v=null;b!==null&&Ms(h,m,b,v,!1),y!==null&&_!==null&&Ms(h,_,y,v,!0)}}e:{if(m=d?Ht(d):window,b=m.nodeName&&m.nodeName.toLowerCase(),b==="select"||b==="input"&&m.type==="file")var D=Hx;else if(Es(m))if(h2)D=Yx;else{D=Vx;var w=qx}else(b=m.nodeName)&&b.toLowerCase()==="input"&&(m.type==="checkbox"||m.type==="radio")&&(D=Qx);if(D&&(D=D(e,d))){g2(h,D,n,f);break e}w&&w(e,m,d),e==="focusout"&&(w=m._wrapperState)&&w.controlled&&m.type==="number"&&mo(m,"number",m.value)}switch(w=d?Ht(d):window,e){case"focusin":(Es(w)||w.contentEditable==="true")&&(Wt=w,Ao=d,Nn=null);break;case"focusout":Nn=Ao=Wt=null;break;case"mousedown":_o=!0;break;case"contextmenu":case"mouseup":case"dragend":_o=!1,Ts(h,n,f);break;case"selectionchange":if(Xx)break;case"keydown":case"keyup":Ts(h,n,f)}var A;if(ki)e:{switch(e){case"compositionstart":var C="onCompositionStart";break e;case"compositionend":C="onCompositionEnd";break e;case"compositionupdate":C="onCompositionUpdate";break e}C=void 0}else Rt?p2(e,n)&&(C="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(C="onCompositionStart");C&&(u2&&n.locale!=="ko"&&(Rt||C!=="onCompositionStart"?C==="onCompositionEnd"&&Rt&&(A=d2()):(st=f,yi="value"in st?st.value:st.textContent,Rt=!0)),w=Jr(d,C),0<w.length&&(C=new ws(C,e,null,n,f),h.push({event:C,listeners:w}),A?C.data=A:(A=f2(n),A!==null&&(C.data=A)))),(A=Lx?Gx(e,n):Rx(e,n))&&(d=Jr(d,"onBeforeInput"),0<d.length&&(f=new ws("onBeforeInput","beforeinput",null,n,f),h.push({event:f,listeners:d}),f.data=A))}F2(h,t)})}function Yn(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Jr(e,t){for(var n=t+"Capture",r=[];e!==null;){var a=e,o=a.stateNode;a.tag===5&&o!==null&&(a=o,o=Rn(e,n),o!=null&&r.unshift(Yn(e,o,a)),o=Rn(e,t),o!=null&&r.push(Yn(e,o,a))),e=e.return}return r}function Ot(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Ms(e,t,n,r,a){for(var o=t._reactName,i=[];n!==null&&n!==r;){var s=n,l=s.alternate,d=s.stateNode;if(l!==null&&l===r)break;s.tag===5&&d!==null&&(s=d,a?(l=Rn(n,o),l!=null&&i.unshift(Yn(n,l,s))):a||(l=Rn(n,o),l!=null&&i.push(Yn(n,l,s)))),n=n.return}i.length!==0&&e.push({event:t,listeners:i})}var nk=/\r\n?/g,rk=/\u0000|\uFFFD/g;function Ns(e){return(typeof e=="string"?e:""+e).replace(nk,`
`).replace(rk,"")}function wr(e,t,n){if(t=Ns(t),Ns(e)!==t&&n)throw Error(k(425))}function Xr(){}var $o=null,To=null;function jo(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Po=typeof setTimeout=="function"?setTimeout:void 0,ak=typeof clearTimeout=="function"?clearTimeout:void 0,Is=typeof Promise=="function"?Promise:void 0,ok=typeof queueMicrotask=="function"?queueMicrotask:typeof Is<"u"?function(e){return Is.resolve(null).then(e).catch(ik)}:Po;function ik(e){setTimeout(function(){throw e})}function Ka(e,t){var n=t,r=0;do{var a=n.nextSibling;if(e.removeChild(n),a&&a.nodeType===8)if(n=a.data,n==="/$"){if(r===0){e.removeChild(a),Hn(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=a}while(n);Hn(t)}function pt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Bs(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var bn=Math.random().toString(36).slice(2),We="__reactFiber$"+bn,Kn="__reactProps$"+bn,Xe="__reactContainer$"+bn,Mo="__reactEvents$"+bn,sk="__reactListeners$"+bn,lk="__reactHandles$"+bn;function Et(e){var t=e[We];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Xe]||n[We]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Bs(e);e!==null;){if(n=e[We])return n;e=Bs(e)}return t}e=n,n=e.parentNode}return null}function sr(e){return e=e[We]||e[Xe],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Ht(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(k(33))}function xa(e){return e[Kn]||null}var No=[],qt=-1;function xt(e){return{current:e}}function L(e){0>qt||(e.current=No[qt],No[qt]=null,qt--)}function z(e,t){qt++,No[qt]=e.current,e.current=t}var yt={},ce=xt(yt),be=xt(!1),Tt=yt;function on(e,t){var n=e.type.contextTypes;if(!n)return yt;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var a={},o;for(o in n)a[o]=t[o];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=a),a}function ye(e){return e=e.childContextTypes,e!=null}function Zr(){L(be),L(ce)}function zs(e,t,n){if(ce.current!==yt)throw Error(k(168));z(ce,t),z(be,n)}function S2(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var a in r)if(!(a in t))throw Error(k(108,q1(e)||"Unknown",a));return q({},n,r)}function ea(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||yt,Tt=ce.current,z(ce,e),z(be,be.current),!0}function Os(e,t,n){var r=e.stateNode;if(!r)throw Error(k(169));n?(e=S2(e,t,Tt),r.__reactInternalMemoizedMergedChildContext=e,L(be),L(ce),z(ce,e)):L(be),z(be,n)}var Ve=null,ka=!1,Ja=!1;function A2(e){Ve===null?Ve=[e]:Ve.push(e)}function ck(e){ka=!0,A2(e)}function kt(){if(!Ja&&Ve!==null){Ja=!0;var e=0,t=B;try{var n=Ve;for(B=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}Ve=null,ka=!1}catch(a){throw Ve!==null&&(Ve=Ve.slice(e+1)),Zl(gi,kt),a}finally{B=t,Ja=!1}}return null}var Vt=[],Qt=0,ta=null,na=0,Ae=[],_e=0,jt=null,Qe=1,Ye="";function Ct(e,t){Vt[Qt++]=na,Vt[Qt++]=ta,ta=e,na=t}function _2(e,t,n){Ae[_e++]=Qe,Ae[_e++]=Ye,Ae[_e++]=jt,jt=e;var r=Qe;e=Ye;var a=32-ze(r)-1;r&=~(1<<a),n+=1;var o=32-ze(t)+a;if(30<o){var i=a-a%5;o=(r&(1<<i)-1).toString(32),r>>=i,a-=i,Qe=1<<32-ze(t)+a|n<<a|r,Ye=o+e}else Qe=1<<o|n<<a|r,Ye=e}function Di(e){e.return!==null&&(Ct(e,1),_2(e,1,0))}function Ci(e){for(;e===ta;)ta=Vt[--Qt],Vt[Qt]=null,na=Vt[--Qt],Vt[Qt]=null;for(;e===jt;)jt=Ae[--_e],Ae[_e]=null,Ye=Ae[--_e],Ae[_e]=null,Qe=Ae[--_e],Ae[_e]=null}var De=null,we=null,W=!1,Be=null;function $2(e,t){var n=$e(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Ls(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,De=e,we=pt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,De=e,we=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=jt!==null?{id:Qe,overflow:Ye}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=$e(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,De=e,we=null,!0):!1;default:return!1}}function Io(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Bo(e){if(W){var t=we;if(t){var n=t;if(!Ls(e,t)){if(Io(e))throw Error(k(418));t=pt(n.nextSibling);var r=De;t&&Ls(e,t)?$2(r,n):(e.flags=e.flags&-4097|2,W=!1,De=e)}}else{if(Io(e))throw Error(k(418));e.flags=e.flags&-4097|2,W=!1,De=e}}}function Gs(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;De=e}function Dr(e){if(e!==De)return!1;if(!W)return Gs(e),W=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!jo(e.type,e.memoizedProps)),t&&(t=we)){if(Io(e))throw T2(),Error(k(418));for(;t;)$2(e,t),t=pt(t.nextSibling)}if(Gs(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(k(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){we=pt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}we=null}}else we=De?pt(e.stateNode.nextSibling):null;return!0}function T2(){for(var e=we;e;)e=pt(e.nextSibling)}function sn(){we=De=null,W=!1}function Fi(e){Be===null?Be=[e]:Be.push(e)}var dk=tt.ReactCurrentBatchConfig;function Cn(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(k(309));var r=n.stateNode}if(!r)throw Error(k(147,e));var a=r,o=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===o?t.ref:(t=function(i){var s=a.refs;i===null?delete s[o]:s[o]=i},t._stringRef=o,t)}if(typeof e!="string")throw Error(k(284));if(!n._owner)throw Error(k(290,e))}return e}function Cr(e,t){throw e=Object.prototype.toString.call(t),Error(k(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Rs(e){var t=e._init;return t(e._payload)}function j2(e){function t(p,u){if(e){var g=p.deletions;g===null?(p.deletions=[u],p.flags|=16):g.push(u)}}function n(p,u){if(!e)return null;for(;u!==null;)t(p,u),u=u.sibling;return null}function r(p,u){for(p=new Map;u!==null;)u.key!==null?p.set(u.key,u):p.set(u.index,u),u=u.sibling;return p}function a(p,u){return p=mt(p,u),p.index=0,p.sibling=null,p}function o(p,u,g){return p.index=g,e?(g=p.alternate,g!==null?(g=g.index,g<u?(p.flags|=2,u):g):(p.flags|=2,u)):(p.flags|=1048576,u)}function i(p){return e&&p.alternate===null&&(p.flags|=2),p}function s(p,u,g,x){return u===null||u.tag!==6?(u=ao(g,p.mode,x),u.return=p,u):(u=a(u,g),u.return=p,u)}function l(p,u,g,x){var D=g.type;return D===Gt?f(p,u,g.props.children,x,g.key):u!==null&&(u.elementType===D||typeof D=="object"&&D!==null&&D.$$typeof===rt&&Rs(D)===u.type)?(x=a(u,g.props),x.ref=Cn(p,u,g),x.return=p,x):(x=Rr(g.type,g.key,g.props,null,p.mode,x),x.ref=Cn(p,u,g),x.return=p,x)}function d(p,u,g,x){return u===null||u.tag!==4||u.stateNode.containerInfo!==g.containerInfo||u.stateNode.implementation!==g.implementation?(u=oo(g,p.mode,x),u.return=p,u):(u=a(u,g.children||[]),u.return=p,u)}function f(p,u,g,x,D){return u===null||u.tag!==7?(u=$t(g,p.mode,x,D),u.return=p,u):(u=a(u,g),u.return=p,u)}function h(p,u,g){if(typeof u=="string"&&u!==""||typeof u=="number")return u=ao(""+u,p.mode,g),u.return=p,u;if(typeof u=="object"&&u!==null){switch(u.$$typeof){case fr:return g=Rr(u.type,u.key,u.props,null,p.mode,g),g.ref=Cn(p,null,u),g.return=p,g;case Lt:return u=oo(u,p.mode,g),u.return=p,u;case rt:var x=u._init;return h(p,x(u._payload),g)}if(An(u)||vn(u))return u=$t(u,p.mode,g,null),u.return=p,u;Cr(p,u)}return null}function m(p,u,g,x){var D=u!==null?u.key:null;if(typeof g=="string"&&g!==""||typeof g=="number")return D!==null?null:s(p,u,""+g,x);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case fr:return g.key===D?l(p,u,g,x):null;case Lt:return g.key===D?d(p,u,g,x):null;case rt:return D=g._init,m(p,u,D(g._payload),x)}if(An(g)||vn(g))return D!==null?null:f(p,u,g,x,null);Cr(p,g)}return null}function b(p,u,g,x,D){if(typeof x=="string"&&x!==""||typeof x=="number")return p=p.get(g)||null,s(u,p,""+x,D);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case fr:return p=p.get(x.key===null?g:x.key)||null,l(u,p,x,D);case Lt:return p=p.get(x.key===null?g:x.key)||null,d(u,p,x,D);case rt:var w=x._init;return b(p,u,g,w(x._payload),D)}if(An(x)||vn(x))return p=p.get(g)||null,f(u,p,x,D,null);Cr(u,x)}return null}function y(p,u,g,x){for(var D=null,w=null,A=u,C=u=0,G=null;A!==null&&C<g.length;C++){A.index>C?(G=A,A=null):G=A.sibling;var T=m(p,A,g[C],x);if(T===null){A===null&&(A=G);break}e&&A&&T.alternate===null&&t(p,A),u=o(T,u,C),w===null?D=T:w.sibling=T,w=T,A=G}if(C===g.length)return n(p,A),W&&Ct(p,C),D;if(A===null){for(;C<g.length;C++)A=h(p,g[C],x),A!==null&&(u=o(A,u,C),w===null?D=A:w.sibling=A,w=A);return W&&Ct(p,C),D}for(A=r(p,A);C<g.length;C++)G=b(A,p,C,g[C],x),G!==null&&(e&&G.alternate!==null&&A.delete(G.key===null?C:G.key),u=o(G,u,C),w===null?D=G:w.sibling=G,w=G);return e&&A.forEach(function(F){return t(p,F)}),W&&Ct(p,C),D}function v(p,u,g,x){var D=vn(g);if(typeof D!="function")throw Error(k(150));if(g=D.call(g),g==null)throw Error(k(151));for(var w=D=null,A=u,C=u=0,G=null,T=g.next();A!==null&&!T.done;C++,T=g.next()){A.index>C?(G=A,A=null):G=A.sibling;var F=m(p,A,T.value,x);if(F===null){A===null&&(A=G);break}e&&A&&F.alternate===null&&t(p,A),u=o(F,u,C),w===null?D=F:w.sibling=F,w=F,A=G}if(T.done)return n(p,A),W&&Ct(p,C),D;if(A===null){for(;!T.done;C++,T=g.next())T=h(p,T.value,x),T!==null&&(u=o(T,u,C),w===null?D=T:w.sibling=T,w=T);return W&&Ct(p,C),D}for(A=r(p,A);!T.done;C++,T=g.next())T=b(A,p,C,T.value,x),T!==null&&(e&&T.alternate!==null&&A.delete(T.key===null?C:T.key),u=o(T,u,C),w===null?D=T:w.sibling=T,w=T);return e&&A.forEach(function(R){return t(p,R)}),W&&Ct(p,C),D}function _(p,u,g,x){if(typeof g=="object"&&g!==null&&g.type===Gt&&g.key===null&&(g=g.props.children),typeof g=="object"&&g!==null){switch(g.$$typeof){case fr:e:{for(var D=g.key,w=u;w!==null;){if(w.key===D){if(D=g.type,D===Gt){if(w.tag===7){n(p,w.sibling),u=a(w,g.props.children),u.return=p,p=u;break e}}else if(w.elementType===D||typeof D=="object"&&D!==null&&D.$$typeof===rt&&Rs(D)===w.type){n(p,w.sibling),u=a(w,g.props),u.ref=Cn(p,w,g),u.return=p,p=u;break e}n(p,w);break}else t(p,w);w=w.sibling}g.type===Gt?(u=$t(g.props.children,p.mode,x,g.key),u.return=p,p=u):(x=Rr(g.type,g.key,g.props,null,p.mode,x),x.ref=Cn(p,u,g),x.return=p,p=x)}return i(p);case Lt:e:{for(w=g.key;u!==null;){if(u.key===w)if(u.tag===4&&u.stateNode.containerInfo===g.containerInfo&&u.stateNode.implementation===g.implementation){n(p,u.sibling),u=a(u,g.children||[]),u.return=p,p=u;break e}else{n(p,u);break}else t(p,u);u=u.sibling}u=oo(g,p.mode,x),u.return=p,p=u}return i(p);case rt:return w=g._init,_(p,u,w(g._payload),x)}if(An(g))return y(p,u,g,x);if(vn(g))return v(p,u,g,x);Cr(p,g)}return typeof g=="string"&&g!==""||typeof g=="number"?(g=""+g,u!==null&&u.tag===6?(n(p,u.sibling),u=a(u,g),u.return=p,p=u):(n(p,u),u=ao(g,p.mode,x),u.return=p,p=u),i(p)):n(p,u)}return _}var ln=j2(!0),P2=j2(!1),ra=xt(null),aa=null,Yt=null,Ei=null;function Si(){Ei=Yt=aa=null}function Ai(e){var t=ra.current;L(ra),e._currentValue=t}function zo(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function nn(e,t){aa=e,Ei=Yt=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(me=!0),e.firstContext=null)}function je(e){var t=e._currentValue;if(Ei!==e)if(e={context:e,memoizedValue:t,next:null},Yt===null){if(aa===null)throw Error(k(308));Yt=e,aa.dependencies={lanes:0,firstContext:e}}else Yt=Yt.next=e;return t}var St=null;function _i(e){St===null?St=[e]:St.push(e)}function M2(e,t,n,r){var a=t.interleaved;return a===null?(n.next=n,_i(t)):(n.next=a.next,a.next=n),t.interleaved=n,Ze(e,r)}function Ze(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var at=!1;function $i(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function N2(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Ke(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function ft(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,N&2){var a=r.pending;return a===null?t.next=t:(t.next=a.next,a.next=t),r.pending=t,Ze(e,n)}return a=r.interleaved,a===null?(t.next=t,_i(r)):(t.next=a.next,a.next=t),r.interleaved=t,Ze(e,n)}function Ir(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,hi(e,n)}}function Ws(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var a=null,o=null;if(n=n.firstBaseUpdate,n!==null){do{var i={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};o===null?a=o=i:o=o.next=i,n=n.next}while(n!==null);o===null?a=o=t:o=o.next=t}else a=o=t;n={baseState:r.baseState,firstBaseUpdate:a,lastBaseUpdate:o,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function oa(e,t,n,r){var a=e.updateQueue;at=!1;var o=a.firstBaseUpdate,i=a.lastBaseUpdate,s=a.shared.pending;if(s!==null){a.shared.pending=null;var l=s,d=l.next;l.next=null,i===null?o=d:i.next=d,i=l;var f=e.alternate;f!==null&&(f=f.updateQueue,s=f.lastBaseUpdate,s!==i&&(s===null?f.firstBaseUpdate=d:s.next=d,f.lastBaseUpdate=l))}if(o!==null){var h=a.baseState;i=0,f=d=l=null,s=o;do{var m=s.lane,b=s.eventTime;if((r&m)===m){f!==null&&(f=f.next={eventTime:b,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});e:{var y=e,v=s;switch(m=t,b=n,v.tag){case 1:if(y=v.payload,typeof y=="function"){h=y.call(b,h,m);break e}h=y;break e;case 3:y.flags=y.flags&-65537|128;case 0:if(y=v.payload,m=typeof y=="function"?y.call(b,h,m):y,m==null)break e;h=q({},h,m);break e;case 2:at=!0}}s.callback!==null&&s.lane!==0&&(e.flags|=64,m=a.effects,m===null?a.effects=[s]:m.push(s))}else b={eventTime:b,lane:m,tag:s.tag,payload:s.payload,callback:s.callback,next:null},f===null?(d=f=b,l=h):f=f.next=b,i|=m;if(s=s.next,s===null){if(s=a.shared.pending,s===null)break;m=s,s=m.next,m.next=null,a.lastBaseUpdate=m,a.shared.pending=null}}while(!0);if(f===null&&(l=h),a.baseState=l,a.firstBaseUpdate=d,a.lastBaseUpdate=f,t=a.shared.interleaved,t!==null){a=t;do i|=a.lane,a=a.next;while(a!==t)}else o===null&&(a.shared.lanes=0);Mt|=i,e.lanes=i,e.memoizedState=h}}function Us(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],a=r.callback;if(a!==null){if(r.callback=null,r=n,typeof a!="function")throw Error(k(191,a));a.call(r)}}}var lr={},He=xt(lr),Jn=xt(lr),Xn=xt(lr);function At(e){if(e===lr)throw Error(k(174));return e}function Ti(e,t){switch(z(Xn,t),z(Jn,e),z(He,lr),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:yo(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=yo(t,e)}L(He),z(He,t)}function cn(){L(He),L(Jn),L(Xn)}function I2(e){At(Xn.current);var t=At(He.current),n=yo(t,e.type);t!==n&&(z(Jn,e),z(He,n))}function ji(e){Jn.current===e&&(L(He),L(Jn))}var U=xt(0);function ia(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Xa=[];function Pi(){for(var e=0;e<Xa.length;e++)Xa[e]._workInProgressVersionPrimary=null;Xa.length=0}var Br=tt.ReactCurrentDispatcher,Za=tt.ReactCurrentBatchConfig,Pt=0,H=null,X=null,te=null,sa=!1,In=!1,Zn=0,uk=0;function ie(){throw Error(k(321))}function Mi(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Le(e[n],t[n]))return!1;return!0}function Ni(e,t,n,r,a,o){if(Pt=o,H=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Br.current=e===null||e.memoizedState===null?hk:mk,e=n(r,a),In){o=0;do{if(In=!1,Zn=0,25<=o)throw Error(k(301));o+=1,te=X=null,t.updateQueue=null,Br.current=bk,e=n(r,a)}while(In)}if(Br.current=la,t=X!==null&&X.next!==null,Pt=0,te=X=H=null,sa=!1,t)throw Error(k(300));return e}function Ii(){var e=Zn!==0;return Zn=0,e}function Re(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return te===null?H.memoizedState=te=e:te=te.next=e,te}function Pe(){if(X===null){var e=H.alternate;e=e!==null?e.memoizedState:null}else e=X.next;var t=te===null?H.memoizedState:te.next;if(t!==null)te=t,X=e;else{if(e===null)throw Error(k(310));X=e,e={memoizedState:X.memoizedState,baseState:X.baseState,baseQueue:X.baseQueue,queue:X.queue,next:null},te===null?H.memoizedState=te=e:te=te.next=e}return te}function er(e,t){return typeof t=="function"?t(e):t}function eo(e){var t=Pe(),n=t.queue;if(n===null)throw Error(k(311));n.lastRenderedReducer=e;var r=X,a=r.baseQueue,o=n.pending;if(o!==null){if(a!==null){var i=a.next;a.next=o.next,o.next=i}r.baseQueue=a=o,n.pending=null}if(a!==null){o=a.next,r=r.baseState;var s=i=null,l=null,d=o;do{var f=d.lane;if((Pt&f)===f)l!==null&&(l=l.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),r=d.hasEagerState?d.eagerState:e(r,d.action);else{var h={lane:f,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};l===null?(s=l=h,i=r):l=l.next=h,H.lanes|=f,Mt|=f}d=d.next}while(d!==null&&d!==o);l===null?i=r:l.next=s,Le(r,t.memoizedState)||(me=!0),t.memoizedState=r,t.baseState=i,t.baseQueue=l,n.lastRenderedState=r}if(e=n.interleaved,e!==null){a=e;do o=a.lane,H.lanes|=o,Mt|=o,a=a.next;while(a!==e)}else a===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function to(e){var t=Pe(),n=t.queue;if(n===null)throw Error(k(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var i=a=a.next;do o=e(o,i.action),i=i.next;while(i!==a);Le(o,t.memoizedState)||(me=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function B2(){}function z2(e,t){var n=H,r=Pe(),a=t(),o=!Le(r.memoizedState,a);if(o&&(r.memoizedState=a,me=!0),r=r.queue,Bi(G2.bind(null,n,r,e),[e]),r.getSnapshot!==t||o||te!==null&&te.memoizedState.tag&1){if(n.flags|=2048,tr(9,L2.bind(null,n,r,a,t),void 0,null),ne===null)throw Error(k(349));Pt&30||O2(n,t,a)}return a}function O2(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=H.updateQueue,t===null?(t={lastEffect:null,stores:null},H.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function L2(e,t,n,r){t.value=n,t.getSnapshot=r,R2(t)&&W2(e)}function G2(e,t,n){return n(function(){R2(t)&&W2(e)})}function R2(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Le(e,n)}catch{return!0}}function W2(e){var t=Ze(e,1);t!==null&&Oe(t,e,1,-1)}function Hs(e){var t=Re();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:er,lastRenderedState:e},t.queue=e,e=e.dispatch=gk.bind(null,H,e),[t.memoizedState,e]}function tr(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=H.updateQueue,t===null?(t={lastEffect:null,stores:null},H.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function U2(){return Pe().memoizedState}function zr(e,t,n,r){var a=Re();H.flags|=e,a.memoizedState=tr(1|t,n,void 0,r===void 0?null:r)}function wa(e,t,n,r){var a=Pe();r=r===void 0?null:r;var o=void 0;if(X!==null){var i=X.memoizedState;if(o=i.destroy,r!==null&&Mi(r,i.deps)){a.memoizedState=tr(t,n,o,r);return}}H.flags|=e,a.memoizedState=tr(1|t,n,o,r)}function qs(e,t){return zr(8390656,8,e,t)}function Bi(e,t){return wa(2048,8,e,t)}function H2(e,t){return wa(4,2,e,t)}function q2(e,t){return wa(4,4,e,t)}function V2(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Q2(e,t,n){return n=n!=null?n.concat([e]):null,wa(4,4,V2.bind(null,t,e),n)}function zi(){}function Y2(e,t){var n=Pe();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Mi(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function K2(e,t){var n=Pe();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Mi(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function J2(e,t,n){return Pt&21?(Le(n,t)||(n=n2(),H.lanes|=n,Mt|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,me=!0),e.memoizedState=n)}function pk(e,t){var n=B;B=n!==0&&4>n?n:4,e(!0);var r=Za.transition;Za.transition={};try{e(!1),t()}finally{B=n,Za.transition=r}}function X2(){return Pe().memoizedState}function fk(e,t,n){var r=ht(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Z2(e))ec(t,n);else if(n=M2(e,t,n,r),n!==null){var a=ue();Oe(n,e,r,a),tc(n,t,r)}}function gk(e,t,n){var r=ht(e),a={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Z2(e))ec(t,a);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=t.lastRenderedReducer,o!==null))try{var i=t.lastRenderedState,s=o(i,n);if(a.hasEagerState=!0,a.eagerState=s,Le(s,i)){var l=t.interleaved;l===null?(a.next=a,_i(t)):(a.next=l.next,l.next=a),t.interleaved=a;return}}catch{}finally{}n=M2(e,t,a,r),n!==null&&(a=ue(),Oe(n,e,r,a),tc(n,t,r))}}function Z2(e){var t=e.alternate;return e===H||t!==null&&t===H}function ec(e,t){In=sa=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function tc(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,hi(e,n)}}var la={readContext:je,useCallback:ie,useContext:ie,useEffect:ie,useImperativeHandle:ie,useInsertionEffect:ie,useLayoutEffect:ie,useMemo:ie,useReducer:ie,useRef:ie,useState:ie,useDebugValue:ie,useDeferredValue:ie,useTransition:ie,useMutableSource:ie,useSyncExternalStore:ie,useId:ie,unstable_isNewReconciler:!1},hk={readContext:je,useCallback:function(e,t){return Re().memoizedState=[e,t===void 0?null:t],e},useContext:je,useEffect:qs,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,zr(4194308,4,V2.bind(null,t,e),n)},useLayoutEffect:function(e,t){return zr(4194308,4,e,t)},useInsertionEffect:function(e,t){return zr(4,2,e,t)},useMemo:function(e,t){var n=Re();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=Re();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=fk.bind(null,H,e),[r.memoizedState,e]},useRef:function(e){var t=Re();return e={current:e},t.memoizedState=e},useState:Hs,useDebugValue:zi,useDeferredValue:function(e){return Re().memoizedState=e},useTransition:function(){var e=Hs(!1),t=e[0];return e=pk.bind(null,e[1]),Re().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=H,a=Re();if(W){if(n===void 0)throw Error(k(407));n=n()}else{if(n=t(),ne===null)throw Error(k(349));Pt&30||O2(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,qs(G2.bind(null,r,o,e),[e]),r.flags|=2048,tr(9,L2.bind(null,r,o,n,t),void 0,null),n},useId:function(){var e=Re(),t=ne.identifierPrefix;if(W){var n=Ye,r=Qe;n=(r&~(1<<32-ze(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=Zn++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=uk++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},mk={readContext:je,useCallback:Y2,useContext:je,useEffect:Bi,useImperativeHandle:Q2,useInsertionEffect:H2,useLayoutEffect:q2,useMemo:K2,useReducer:eo,useRef:U2,useState:function(){return eo(er)},useDebugValue:zi,useDeferredValue:function(e){var t=Pe();return J2(t,X.memoizedState,e)},useTransition:function(){var e=eo(er)[0],t=Pe().memoizedState;return[e,t]},useMutableSource:B2,useSyncExternalStore:z2,useId:X2,unstable_isNewReconciler:!1},bk={readContext:je,useCallback:Y2,useContext:je,useEffect:Bi,useImperativeHandle:Q2,useInsertionEffect:H2,useLayoutEffect:q2,useMemo:K2,useReducer:to,useRef:U2,useState:function(){return to(er)},useDebugValue:zi,useDeferredValue:function(e){var t=Pe();return X===null?t.memoizedState=e:J2(t,X.memoizedState,e)},useTransition:function(){var e=to(er)[0],t=Pe().memoizedState;return[e,t]},useMutableSource:B2,useSyncExternalStore:z2,useId:X2,unstable_isNewReconciler:!1};function Ne(e,t){if(e&&e.defaultProps){t=q({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Oo(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:q({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Da={isMounted:function(e){return(e=e._reactInternals)?Bt(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=ue(),a=ht(e),o=Ke(r,a);o.payload=t,n!=null&&(o.callback=n),t=ft(e,o,a),t!==null&&(Oe(t,e,a,r),Ir(t,e,a))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=ue(),a=ht(e),o=Ke(r,a);o.tag=1,o.payload=t,n!=null&&(o.callback=n),t=ft(e,o,a),t!==null&&(Oe(t,e,a,r),Ir(t,e,a))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=ue(),r=ht(e),a=Ke(n,r);a.tag=2,t!=null&&(a.callback=t),t=ft(e,a,r),t!==null&&(Oe(t,e,r,n),Ir(t,e,r))}};function Vs(e,t,n,r,a,o,i){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,o,i):t.prototype&&t.prototype.isPureReactComponent?!Vn(n,r)||!Vn(a,o):!0}function nc(e,t,n){var r=!1,a=yt,o=t.contextType;return typeof o=="object"&&o!==null?o=je(o):(a=ye(t)?Tt:ce.current,r=t.contextTypes,o=(r=r!=null)?on(e,a):yt),t=new t(n,o),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Da,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=a,e.__reactInternalMemoizedMaskedChildContext=o),t}function Qs(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Da.enqueueReplaceState(t,t.state,null)}function Lo(e,t,n,r){var a=e.stateNode;a.props=n,a.state=e.memoizedState,a.refs={},$i(e);var o=t.contextType;typeof o=="object"&&o!==null?a.context=je(o):(o=ye(t)?Tt:ce.current,a.context=on(e,o)),a.state=e.memoizedState,o=t.getDerivedStateFromProps,typeof o=="function"&&(Oo(e,t,o,n),a.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof a.getSnapshotBeforeUpdate=="function"||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(t=a.state,typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount(),t!==a.state&&Da.enqueueReplaceState(a,a.state,null),oa(e,n,a,r),a.state=e.memoizedState),typeof a.componentDidMount=="function"&&(e.flags|=4194308)}function dn(e,t){try{var n="",r=t;do n+=H1(r),r=r.return;while(r);var a=n}catch(o){a=`
Error generating stack: `+o.message+`
`+o.stack}return{value:e,source:t,stack:a,digest:null}}function no(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Go(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var yk=typeof WeakMap=="function"?WeakMap:Map;function rc(e,t,n){n=Ke(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){da||(da=!0,Jo=r),Go(e,t)},n}function ac(e,t,n){n=Ke(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var a=t.value;n.payload=function(){return r(a)},n.callback=function(){Go(e,t)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(n.callback=function(){Go(e,t),typeof r!="function"&&(gt===null?gt=new Set([this]):gt.add(this));var i=t.stack;this.componentDidCatch(t.value,{componentStack:i!==null?i:""})}),n}function Ys(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new yk;var a=new Set;r.set(t,a)}else a=r.get(t),a===void 0&&(a=new Set,r.set(t,a));a.has(n)||(a.add(n),e=jk.bind(null,e,t,n),t.then(e,e))}function Ks(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Js(e,t,n,r,a){return e.mode&1?(e.flags|=65536,e.lanes=a,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Ke(-1,1),t.tag=2,ft(n,t,1))),n.lanes|=1),e)}var vk=tt.ReactCurrentOwner,me=!1;function de(e,t,n,r){t.child=e===null?P2(t,null,n,r):ln(t,e.child,n,r)}function Xs(e,t,n,r,a){n=n.render;var o=t.ref;return nn(t,a),r=Ni(e,t,n,r,o,a),n=Ii(),e!==null&&!me?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a,et(e,t,a)):(W&&n&&Di(t),t.flags|=1,de(e,t,r,a),t.child)}function Zs(e,t,n,r,a){if(e===null){var o=n.type;return typeof o=="function"&&!qi(o)&&o.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=o,oc(e,t,o,r,a)):(e=Rr(n.type,null,r,t,t.mode,a),e.ref=t.ref,e.return=t,t.child=e)}if(o=e.child,!(e.lanes&a)){var i=o.memoizedProps;if(n=n.compare,n=n!==null?n:Vn,n(i,r)&&e.ref===t.ref)return et(e,t,a)}return t.flags|=1,e=mt(o,r),e.ref=t.ref,e.return=t,t.child=e}function oc(e,t,n,r,a){if(e!==null){var o=e.memoizedProps;if(Vn(o,r)&&e.ref===t.ref)if(me=!1,t.pendingProps=r=o,(e.lanes&a)!==0)e.flags&131072&&(me=!0);else return t.lanes=e.lanes,et(e,t,a)}return Ro(e,t,n,r,a)}function ic(e,t,n){var r=t.pendingProps,a=r.children,o=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},z(Jt,ke),ke|=n;else{if(!(n&1073741824))return e=o!==null?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,z(Jt,ke),ke|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=o!==null?o.baseLanes:n,z(Jt,ke),ke|=r}else o!==null?(r=o.baseLanes|n,t.memoizedState=null):r=n,z(Jt,ke),ke|=r;return de(e,t,a,n),t.child}function sc(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Ro(e,t,n,r,a){var o=ye(n)?Tt:ce.current;return o=on(t,o),nn(t,a),n=Ni(e,t,n,r,o,a),r=Ii(),e!==null&&!me?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a,et(e,t,a)):(W&&r&&Di(t),t.flags|=1,de(e,t,n,a),t.child)}function el(e,t,n,r,a){if(ye(n)){var o=!0;ea(t)}else o=!1;if(nn(t,a),t.stateNode===null)Or(e,t),nc(t,n,r),Lo(t,n,r,a),r=!0;else if(e===null){var i=t.stateNode,s=t.memoizedProps;i.props=s;var l=i.context,d=n.contextType;typeof d=="object"&&d!==null?d=je(d):(d=ye(n)?Tt:ce.current,d=on(t,d));var f=n.getDerivedStateFromProps,h=typeof f=="function"||typeof i.getSnapshotBeforeUpdate=="function";h||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(s!==r||l!==d)&&Qs(t,i,r,d),at=!1;var m=t.memoizedState;i.state=m,oa(t,r,i,a),l=t.memoizedState,s!==r||m!==l||be.current||at?(typeof f=="function"&&(Oo(t,n,f,r),l=t.memoizedState),(s=at||Vs(t,n,s,r,m,l,d))?(h||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(t.flags|=4194308)):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),i.props=r,i.state=l,i.context=d,r=s):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{i=t.stateNode,N2(e,t),s=t.memoizedProps,d=t.type===t.elementType?s:Ne(t.type,s),i.props=d,h=t.pendingProps,m=i.context,l=n.contextType,typeof l=="object"&&l!==null?l=je(l):(l=ye(n)?Tt:ce.current,l=on(t,l));var b=n.getDerivedStateFromProps;(f=typeof b=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(s!==h||m!==l)&&Qs(t,i,r,l),at=!1,m=t.memoizedState,i.state=m,oa(t,r,i,a);var y=t.memoizedState;s!==h||m!==y||be.current||at?(typeof b=="function"&&(Oo(t,n,b,r),y=t.memoizedState),(d=at||Vs(t,n,d,r,m,y,l)||!1)?(f||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(r,y,l),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(r,y,l)),typeof i.componentDidUpdate=="function"&&(t.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof i.componentDidUpdate!="function"||s===e.memoizedProps&&m===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&m===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=y),i.props=r,i.state=y,i.context=l,r=d):(typeof i.componentDidUpdate!="function"||s===e.memoizedProps&&m===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&m===e.memoizedState||(t.flags|=1024),r=!1)}return Wo(e,t,n,r,o,a)}function Wo(e,t,n,r,a,o){sc(e,t);var i=(t.flags&128)!==0;if(!r&&!i)return a&&Os(t,n,!1),et(e,t,o);r=t.stateNode,vk.current=t;var s=i&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&i?(t.child=ln(t,e.child,null,o),t.child=ln(t,null,s,o)):de(e,t,s,o),t.memoizedState=r.state,a&&Os(t,n,!0),t.child}function lc(e){var t=e.stateNode;t.pendingContext?zs(e,t.pendingContext,t.pendingContext!==t.context):t.context&&zs(e,t.context,!1),Ti(e,t.containerInfo)}function tl(e,t,n,r,a){return sn(),Fi(a),t.flags|=256,de(e,t,n,r),t.child}var Uo={dehydrated:null,treeContext:null,retryLane:0};function Ho(e){return{baseLanes:e,cachePool:null,transitions:null}}function cc(e,t,n){var r=t.pendingProps,a=U.current,o=!1,i=(t.flags&128)!==0,s;if((s=i)||(s=e!==null&&e.memoizedState===null?!1:(a&2)!==0),s?(o=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(a|=1),z(U,a&1),e===null)return Bo(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(i=r.children,e=r.fallback,o?(r=t.mode,o=t.child,i={mode:"hidden",children:i},!(r&1)&&o!==null?(o.childLanes=0,o.pendingProps=i):o=Ea(i,r,0,null),e=$t(e,r,n,null),o.return=t,e.return=t,o.sibling=e,t.child=o,t.child.memoizedState=Ho(n),t.memoizedState=Uo,e):Oi(t,i));if(a=e.memoizedState,a!==null&&(s=a.dehydrated,s!==null))return xk(e,t,i,r,s,a,n);if(o){o=r.fallback,i=t.mode,a=e.child,s=a.sibling;var l={mode:"hidden",children:r.children};return!(i&1)&&t.child!==a?(r=t.child,r.childLanes=0,r.pendingProps=l,t.deletions=null):(r=mt(a,l),r.subtreeFlags=a.subtreeFlags&14680064),s!==null?o=mt(s,o):(o=$t(o,i,n,null),o.flags|=2),o.return=t,r.return=t,r.sibling=o,t.child=r,r=o,o=t.child,i=e.child.memoizedState,i=i===null?Ho(n):{baseLanes:i.baseLanes|n,cachePool:null,transitions:i.transitions},o.memoizedState=i,o.childLanes=e.childLanes&~n,t.memoizedState=Uo,r}return o=e.child,e=o.sibling,r=mt(o,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Oi(e,t){return t=Ea({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Fr(e,t,n,r){return r!==null&&Fi(r),ln(t,e.child,null,n),e=Oi(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function xk(e,t,n,r,a,o,i){if(n)return t.flags&256?(t.flags&=-257,r=no(Error(k(422))),Fr(e,t,i,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(o=r.fallback,a=t.mode,r=Ea({mode:"visible",children:r.children},a,0,null),o=$t(o,a,i,null),o.flags|=2,r.return=t,o.return=t,r.sibling=o,t.child=r,t.mode&1&&ln(t,e.child,null,i),t.child.memoizedState=Ho(i),t.memoizedState=Uo,o);if(!(t.mode&1))return Fr(e,t,i,null);if(a.data==="$!"){if(r=a.nextSibling&&a.nextSibling.dataset,r)var s=r.dgst;return r=s,o=Error(k(419)),r=no(o,r,void 0),Fr(e,t,i,r)}if(s=(i&e.childLanes)!==0,me||s){if(r=ne,r!==null){switch(i&-i){case 4:a=2;break;case 16:a=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:a=32;break;case 536870912:a=268435456;break;default:a=0}a=a&(r.suspendedLanes|i)?0:a,a!==0&&a!==o.retryLane&&(o.retryLane=a,Ze(e,a),Oe(r,e,a,-1))}return Hi(),r=no(Error(k(421))),Fr(e,t,i,r)}return a.data==="$?"?(t.flags|=128,t.child=e.child,t=Pk.bind(null,e),a._reactRetry=t,null):(e=o.treeContext,we=pt(a.nextSibling),De=t,W=!0,Be=null,e!==null&&(Ae[_e++]=Qe,Ae[_e++]=Ye,Ae[_e++]=jt,Qe=e.id,Ye=e.overflow,jt=t),t=Oi(t,r.children),t.flags|=4096,t)}function nl(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),zo(e.return,t,n)}function ro(e,t,n,r,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=a)}function dc(e,t,n){var r=t.pendingProps,a=r.revealOrder,o=r.tail;if(de(e,t,r.children,n),r=U.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&nl(e,n,t);else if(e.tag===19)nl(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(z(U,r),!(t.mode&1))t.memoizedState=null;else switch(a){case"forwards":for(n=t.child,a=null;n!==null;)e=n.alternate,e!==null&&ia(e)===null&&(a=n),n=n.sibling;n=a,n===null?(a=t.child,t.child=null):(a=n.sibling,n.sibling=null),ro(t,!1,a,n,o);break;case"backwards":for(n=null,a=t.child,t.child=null;a!==null;){if(e=a.alternate,e!==null&&ia(e)===null){t.child=a;break}e=a.sibling,a.sibling=n,n=a,a=e}ro(t,!0,n,null,o);break;case"together":ro(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Or(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function et(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Mt|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(k(153));if(t.child!==null){for(e=t.child,n=mt(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=mt(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function kk(e,t,n){switch(t.tag){case 3:lc(t),sn();break;case 5:I2(t);break;case 1:ye(t.type)&&ea(t);break;case 4:Ti(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,a=t.memoizedProps.value;z(ra,r._currentValue),r._currentValue=a;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(z(U,U.current&1),t.flags|=128,null):n&t.child.childLanes?cc(e,t,n):(z(U,U.current&1),e=et(e,t,n),e!==null?e.sibling:null);z(U,U.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return dc(e,t,n);t.flags|=128}if(a=t.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),z(U,U.current),r)break;return null;case 22:case 23:return t.lanes=0,ic(e,t,n)}return et(e,t,n)}var uc,qo,pc,fc;uc=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};qo=function(){};pc=function(e,t,n,r){var a=e.memoizedProps;if(a!==r){e=t.stateNode,At(He.current);var o=null;switch(n){case"input":a=go(e,a),r=go(e,r),o=[];break;case"select":a=q({},a,{value:void 0}),r=q({},r,{value:void 0}),o=[];break;case"textarea":a=bo(e,a),r=bo(e,r),o=[];break;default:typeof a.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Xr)}vo(n,r);var i;n=null;for(d in a)if(!r.hasOwnProperty(d)&&a.hasOwnProperty(d)&&a[d]!=null)if(d==="style"){var s=a[d];for(i in s)s.hasOwnProperty(i)&&(n||(n={}),n[i]="")}else d!=="dangerouslySetInnerHTML"&&d!=="children"&&d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&d!=="autoFocus"&&(Ln.hasOwnProperty(d)?o||(o=[]):(o=o||[]).push(d,null));for(d in r){var l=r[d];if(s=a!=null?a[d]:void 0,r.hasOwnProperty(d)&&l!==s&&(l!=null||s!=null))if(d==="style")if(s){for(i in s)!s.hasOwnProperty(i)||l&&l.hasOwnProperty(i)||(n||(n={}),n[i]="");for(i in l)l.hasOwnProperty(i)&&s[i]!==l[i]&&(n||(n={}),n[i]=l[i])}else n||(o||(o=[]),o.push(d,n)),n=l;else d==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,s=s?s.__html:void 0,l!=null&&s!==l&&(o=o||[]).push(d,l)):d==="children"?typeof l!="string"&&typeof l!="number"||(o=o||[]).push(d,""+l):d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&(Ln.hasOwnProperty(d)?(l!=null&&d==="onScroll"&&O("scroll",e),o||s===l||(o=[])):(o=o||[]).push(d,l))}n&&(o=o||[]).push("style",n);var d=o;(t.updateQueue=d)&&(t.flags|=4)}};fc=function(e,t,n,r){n!==r&&(t.flags|=4)};function Fn(e,t){if(!W)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function se(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var a=e.child;a!==null;)n|=a.lanes|a.childLanes,r|=a.subtreeFlags&14680064,r|=a.flags&14680064,a.return=e,a=a.sibling;else for(a=e.child;a!==null;)n|=a.lanes|a.childLanes,r|=a.subtreeFlags,r|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function wk(e,t,n){var r=t.pendingProps;switch(Ci(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return se(t),null;case 1:return ye(t.type)&&Zr(),se(t),null;case 3:return r=t.stateNode,cn(),L(be),L(ce),Pi(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Dr(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Be!==null&&(ei(Be),Be=null))),qo(e,t),se(t),null;case 5:ji(t);var a=At(Xn.current);if(n=t.type,e!==null&&t.stateNode!=null)pc(e,t,n,r,a),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(k(166));return se(t),null}if(e=At(He.current),Dr(t)){r=t.stateNode,n=t.type;var o=t.memoizedProps;switch(r[We]=t,r[Kn]=o,e=(t.mode&1)!==0,n){case"dialog":O("cancel",r),O("close",r);break;case"iframe":case"object":case"embed":O("load",r);break;case"video":case"audio":for(a=0;a<$n.length;a++)O($n[a],r);break;case"source":O("error",r);break;case"img":case"image":case"link":O("error",r),O("load",r);break;case"details":O("toggle",r);break;case"input":us(r,o),O("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!o.multiple},O("invalid",r);break;case"textarea":fs(r,o),O("invalid",r)}vo(n,o),a=null;for(var i in o)if(o.hasOwnProperty(i)){var s=o[i];i==="children"?typeof s=="string"?r.textContent!==s&&(o.suppressHydrationWarning!==!0&&wr(r.textContent,s,e),a=["children",s]):typeof s=="number"&&r.textContent!==""+s&&(o.suppressHydrationWarning!==!0&&wr(r.textContent,s,e),a=["children",""+s]):Ln.hasOwnProperty(i)&&s!=null&&i==="onScroll"&&O("scroll",r)}switch(n){case"input":gr(r),ps(r,o,!0);break;case"textarea":gr(r),gs(r);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(r.onclick=Xr)}r=a,t.updateQueue=r,r!==null&&(t.flags|=4)}else{i=a.nodeType===9?a:a.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Gl(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=i.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=i.createElement(n,{is:r.is}):(e=i.createElement(n),n==="select"&&(i=e,r.multiple?i.multiple=!0:r.size&&(i.size=r.size))):e=i.createElementNS(e,n),e[We]=t,e[Kn]=r,uc(e,t,!1,!1),t.stateNode=e;e:{switch(i=xo(n,r),n){case"dialog":O("cancel",e),O("close",e),a=r;break;case"iframe":case"object":case"embed":O("load",e),a=r;break;case"video":case"audio":for(a=0;a<$n.length;a++)O($n[a],e);a=r;break;case"source":O("error",e),a=r;break;case"img":case"image":case"link":O("error",e),O("load",e),a=r;break;case"details":O("toggle",e),a=r;break;case"input":us(e,r),a=go(e,r),O("invalid",e);break;case"option":a=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},a=q({},r,{value:void 0}),O("invalid",e);break;case"textarea":fs(e,r),a=bo(e,r),O("invalid",e);break;default:a=r}vo(n,a),s=a;for(o in s)if(s.hasOwnProperty(o)){var l=s[o];o==="style"?Ul(e,l):o==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&Rl(e,l)):o==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&Gn(e,l):typeof l=="number"&&Gn(e,""+l):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(Ln.hasOwnProperty(o)?l!=null&&o==="onScroll"&&O("scroll",e):l!=null&&ci(e,o,l,i))}switch(n){case"input":gr(e),ps(e,r,!1);break;case"textarea":gr(e),gs(e);break;case"option":r.value!=null&&e.setAttribute("value",""+bt(r.value));break;case"select":e.multiple=!!r.multiple,o=r.value,o!=null?Xt(e,!!r.multiple,o,!1):r.defaultValue!=null&&Xt(e,!!r.multiple,r.defaultValue,!0);break;default:typeof a.onClick=="function"&&(e.onclick=Xr)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return se(t),null;case 6:if(e&&t.stateNode!=null)fc(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(k(166));if(n=At(Xn.current),At(He.current),Dr(t)){if(r=t.stateNode,n=t.memoizedProps,r[We]=t,(o=r.nodeValue!==n)&&(e=De,e!==null))switch(e.tag){case 3:wr(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&wr(r.nodeValue,n,(e.mode&1)!==0)}o&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[We]=t,t.stateNode=r}return se(t),null;case 13:if(L(U),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(W&&we!==null&&t.mode&1&&!(t.flags&128))T2(),sn(),t.flags|=98560,o=!1;else if(o=Dr(t),r!==null&&r.dehydrated!==null){if(e===null){if(!o)throw Error(k(318));if(o=t.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(k(317));o[We]=t}else sn(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;se(t),o=!1}else Be!==null&&(ei(Be),Be=null),o=!0;if(!o)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||U.current&1?Z===0&&(Z=3):Hi())),t.updateQueue!==null&&(t.flags|=4),se(t),null);case 4:return cn(),qo(e,t),e===null&&Qn(t.stateNode.containerInfo),se(t),null;case 10:return Ai(t.type._context),se(t),null;case 17:return ye(t.type)&&Zr(),se(t),null;case 19:if(L(U),o=t.memoizedState,o===null)return se(t),null;if(r=(t.flags&128)!==0,i=o.rendering,i===null)if(r)Fn(o,!1);else{if(Z!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(i=ia(e),i!==null){for(t.flags|=128,Fn(o,!1),r=i.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)o=n,e=r,o.flags&=14680066,i=o.alternate,i===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=i.childLanes,o.lanes=i.lanes,o.child=i.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=i.memoizedProps,o.memoizedState=i.memoizedState,o.updateQueue=i.updateQueue,o.type=i.type,e=i.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return z(U,U.current&1|2),t.child}e=e.sibling}o.tail!==null&&Y()>un&&(t.flags|=128,r=!0,Fn(o,!1),t.lanes=4194304)}else{if(!r)if(e=ia(i),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Fn(o,!0),o.tail===null&&o.tailMode==="hidden"&&!i.alternate&&!W)return se(t),null}else 2*Y()-o.renderingStartTime>un&&n!==1073741824&&(t.flags|=128,r=!0,Fn(o,!1),t.lanes=4194304);o.isBackwards?(i.sibling=t.child,t.child=i):(n=o.last,n!==null?n.sibling=i:t.child=i,o.last=i)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=Y(),t.sibling=null,n=U.current,z(U,r?n&1|2:n&1),t):(se(t),null);case 22:case 23:return Ui(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?ke&1073741824&&(se(t),t.subtreeFlags&6&&(t.flags|=8192)):se(t),null;case 24:return null;case 25:return null}throw Error(k(156,t.tag))}function Dk(e,t){switch(Ci(t),t.tag){case 1:return ye(t.type)&&Zr(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return cn(),L(be),L(ce),Pi(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return ji(t),null;case 13:if(L(U),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(k(340));sn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return L(U),null;case 4:return cn(),null;case 10:return Ai(t.type._context),null;case 22:case 23:return Ui(),null;case 24:return null;default:return null}}var Er=!1,le=!1,Ck=typeof WeakSet=="function"?WeakSet:Set,E=null;function Kt(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){V(e,t,r)}else n.current=null}function Vo(e,t,n){try{n()}catch(r){V(e,t,r)}}var rl=!1;function Fk(e,t){if($o=Yr,e=y2(),wi(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var a=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break e}var i=0,s=-1,l=-1,d=0,f=0,h=e,m=null;t:for(;;){for(var b;h!==n||a!==0&&h.nodeType!==3||(s=i+a),h!==o||r!==0&&h.nodeType!==3||(l=i+r),h.nodeType===3&&(i+=h.nodeValue.length),(b=h.firstChild)!==null;)m=h,h=b;for(;;){if(h===e)break t;if(m===n&&++d===a&&(s=i),m===o&&++f===r&&(l=i),(b=h.nextSibling)!==null)break;h=m,m=h.parentNode}h=b}n=s===-1||l===-1?null:{start:s,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(To={focusedElem:e,selectionRange:n},Yr=!1,E=t;E!==null;)if(t=E,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,E=e;else for(;E!==null;){t=E;try{var y=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(y!==null){var v=y.memoizedProps,_=y.memoizedState,p=t.stateNode,u=p.getSnapshotBeforeUpdate(t.elementType===t.type?v:Ne(t.type,v),_);p.__reactInternalSnapshotBeforeUpdate=u}break;case 3:var g=t.stateNode.containerInfo;g.nodeType===1?g.textContent="":g.nodeType===9&&g.documentElement&&g.removeChild(g.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(k(163))}}catch(x){V(t,t.return,x)}if(e=t.sibling,e!==null){e.return=t.return,E=e;break}E=t.return}return y=rl,rl=!1,y}function Bn(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var a=r=r.next;do{if((a.tag&e)===e){var o=a.destroy;a.destroy=void 0,o!==void 0&&Vo(t,n,o)}a=a.next}while(a!==r)}}function Ca(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function Qo(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function gc(e){var t=e.alternate;t!==null&&(e.alternate=null,gc(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[We],delete t[Kn],delete t[Mo],delete t[sk],delete t[lk])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function hc(e){return e.tag===5||e.tag===3||e.tag===4}function al(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||hc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Yo(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Xr));else if(r!==4&&(e=e.child,e!==null))for(Yo(e,t,n),e=e.sibling;e!==null;)Yo(e,t,n),e=e.sibling}function Ko(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Ko(e,t,n),e=e.sibling;e!==null;)Ko(e,t,n),e=e.sibling}var re=null,Ie=!1;function nt(e,t,n){for(n=n.child;n!==null;)mc(e,t,n),n=n.sibling}function mc(e,t,n){if(Ue&&typeof Ue.onCommitFiberUnmount=="function")try{Ue.onCommitFiberUnmount(ma,n)}catch{}switch(n.tag){case 5:le||Kt(n,t);case 6:var r=re,a=Ie;re=null,nt(e,t,n),re=r,Ie=a,re!==null&&(Ie?(e=re,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):re.removeChild(n.stateNode));break;case 18:re!==null&&(Ie?(e=re,n=n.stateNode,e.nodeType===8?Ka(e.parentNode,n):e.nodeType===1&&Ka(e,n),Hn(e)):Ka(re,n.stateNode));break;case 4:r=re,a=Ie,re=n.stateNode.containerInfo,Ie=!0,nt(e,t,n),re=r,Ie=a;break;case 0:case 11:case 14:case 15:if(!le&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){a=r=r.next;do{var o=a,i=o.destroy;o=o.tag,i!==void 0&&(o&2||o&4)&&Vo(n,t,i),a=a.next}while(a!==r)}nt(e,t,n);break;case 1:if(!le&&(Kt(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(s){V(n,t,s)}nt(e,t,n);break;case 21:nt(e,t,n);break;case 22:n.mode&1?(le=(r=le)||n.memoizedState!==null,nt(e,t,n),le=r):nt(e,t,n);break;default:nt(e,t,n)}}function ol(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Ck),t.forEach(function(r){var a=Mk.bind(null,e,r);n.has(r)||(n.add(r),r.then(a,a))})}}function Me(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var a=n[r];try{var o=e,i=t,s=i;e:for(;s!==null;){switch(s.tag){case 5:re=s.stateNode,Ie=!1;break e;case 3:re=s.stateNode.containerInfo,Ie=!0;break e;case 4:re=s.stateNode.containerInfo,Ie=!0;break e}s=s.return}if(re===null)throw Error(k(160));mc(o,i,a),re=null,Ie=!1;var l=a.alternate;l!==null&&(l.return=null),a.return=null}catch(d){V(a,t,d)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)bc(t,e),t=t.sibling}function bc(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Me(t,e),Ge(e),r&4){try{Bn(3,e,e.return),Ca(3,e)}catch(v){V(e,e.return,v)}try{Bn(5,e,e.return)}catch(v){V(e,e.return,v)}}break;case 1:Me(t,e),Ge(e),r&512&&n!==null&&Kt(n,n.return);break;case 5:if(Me(t,e),Ge(e),r&512&&n!==null&&Kt(n,n.return),e.flags&32){var a=e.stateNode;try{Gn(a,"")}catch(v){V(e,e.return,v)}}if(r&4&&(a=e.stateNode,a!=null)){var o=e.memoizedProps,i=n!==null?n.memoizedProps:o,s=e.type,l=e.updateQueue;if(e.updateQueue=null,l!==null)try{s==="input"&&o.type==="radio"&&o.name!=null&&Ol(a,o),xo(s,i);var d=xo(s,o);for(i=0;i<l.length;i+=2){var f=l[i],h=l[i+1];f==="style"?Ul(a,h):f==="dangerouslySetInnerHTML"?Rl(a,h):f==="children"?Gn(a,h):ci(a,f,h,d)}switch(s){case"input":ho(a,o);break;case"textarea":Ll(a,o);break;case"select":var m=a._wrapperState.wasMultiple;a._wrapperState.wasMultiple=!!o.multiple;var b=o.value;b!=null?Xt(a,!!o.multiple,b,!1):m!==!!o.multiple&&(o.defaultValue!=null?Xt(a,!!o.multiple,o.defaultValue,!0):Xt(a,!!o.multiple,o.multiple?[]:"",!1))}a[Kn]=o}catch(v){V(e,e.return,v)}}break;case 6:if(Me(t,e),Ge(e),r&4){if(e.stateNode===null)throw Error(k(162));a=e.stateNode,o=e.memoizedProps;try{a.nodeValue=o}catch(v){V(e,e.return,v)}}break;case 3:if(Me(t,e),Ge(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Hn(t.containerInfo)}catch(v){V(e,e.return,v)}break;case 4:Me(t,e),Ge(e);break;case 13:Me(t,e),Ge(e),a=e.child,a.flags&8192&&(o=a.memoizedState!==null,a.stateNode.isHidden=o,!o||a.alternate!==null&&a.alternate.memoizedState!==null||(Ri=Y())),r&4&&ol(e);break;case 22:if(f=n!==null&&n.memoizedState!==null,e.mode&1?(le=(d=le)||f,Me(t,e),le=d):Me(t,e),Ge(e),r&8192){if(d=e.memoizedState!==null,(e.stateNode.isHidden=d)&&!f&&e.mode&1)for(E=e,f=e.child;f!==null;){for(h=E=f;E!==null;){switch(m=E,b=m.child,m.tag){case 0:case 11:case 14:case 15:Bn(4,m,m.return);break;case 1:Kt(m,m.return);var y=m.stateNode;if(typeof y.componentWillUnmount=="function"){r=m,n=m.return;try{t=r,y.props=t.memoizedProps,y.state=t.memoizedState,y.componentWillUnmount()}catch(v){V(r,n,v)}}break;case 5:Kt(m,m.return);break;case 22:if(m.memoizedState!==null){sl(h);continue}}b!==null?(b.return=m,E=b):sl(h)}f=f.sibling}e:for(f=null,h=e;;){if(h.tag===5){if(f===null){f=h;try{a=h.stateNode,d?(o=a.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(s=h.stateNode,l=h.memoizedProps.style,i=l!=null&&l.hasOwnProperty("display")?l.display:null,s.style.display=Wl("display",i))}catch(v){V(e,e.return,v)}}}else if(h.tag===6){if(f===null)try{h.stateNode.nodeValue=d?"":h.memoizedProps}catch(v){V(e,e.return,v)}}else if((h.tag!==22&&h.tag!==23||h.memoizedState===null||h===e)&&h.child!==null){h.child.return=h,h=h.child;continue}if(h===e)break e;for(;h.sibling===null;){if(h.return===null||h.return===e)break e;f===h&&(f=null),h=h.return}f===h&&(f=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:Me(t,e),Ge(e),r&4&&ol(e);break;case 21:break;default:Me(t,e),Ge(e)}}function Ge(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(hc(n)){var r=n;break e}n=n.return}throw Error(k(160))}switch(r.tag){case 5:var a=r.stateNode;r.flags&32&&(Gn(a,""),r.flags&=-33);var o=al(e);Ko(e,o,a);break;case 3:case 4:var i=r.stateNode.containerInfo,s=al(e);Yo(e,s,i);break;default:throw Error(k(161))}}catch(l){V(e,e.return,l)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Ek(e,t,n){E=e,yc(e)}function yc(e,t,n){for(var r=(e.mode&1)!==0;E!==null;){var a=E,o=a.child;if(a.tag===22&&r){var i=a.memoizedState!==null||Er;if(!i){var s=a.alternate,l=s!==null&&s.memoizedState!==null||le;s=Er;var d=le;if(Er=i,(le=l)&&!d)for(E=a;E!==null;)i=E,l=i.child,i.tag===22&&i.memoizedState!==null?ll(a):l!==null?(l.return=i,E=l):ll(a);for(;o!==null;)E=o,yc(o),o=o.sibling;E=a,Er=s,le=d}il(e)}else a.subtreeFlags&8772&&o!==null?(o.return=a,E=o):il(e)}}function il(e){for(;E!==null;){var t=E;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:le||Ca(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!le)if(n===null)r.componentDidMount();else{var a=t.elementType===t.type?n.memoizedProps:Ne(t.type,n.memoizedProps);r.componentDidUpdate(a,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;o!==null&&Us(t,o,r);break;case 3:var i=t.updateQueue;if(i!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Us(t,i,n)}break;case 5:var s=t.stateNode;if(n===null&&t.flags&4){n=s;var l=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var d=t.alternate;if(d!==null){var f=d.memoizedState;if(f!==null){var h=f.dehydrated;h!==null&&Hn(h)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(k(163))}le||t.flags&512&&Qo(t)}catch(m){V(t,t.return,m)}}if(t===e){E=null;break}if(n=t.sibling,n!==null){n.return=t.return,E=n;break}E=t.return}}function sl(e){for(;E!==null;){var t=E;if(t===e){E=null;break}var n=t.sibling;if(n!==null){n.return=t.return,E=n;break}E=t.return}}function ll(e){for(;E!==null;){var t=E;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Ca(4,t)}catch(l){V(t,n,l)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var a=t.return;try{r.componentDidMount()}catch(l){V(t,a,l)}}var o=t.return;try{Qo(t)}catch(l){V(t,o,l)}break;case 5:var i=t.return;try{Qo(t)}catch(l){V(t,i,l)}}}catch(l){V(t,t.return,l)}if(t===e){E=null;break}var s=t.sibling;if(s!==null){s.return=t.return,E=s;break}E=t.return}}var Sk=Math.ceil,ca=tt.ReactCurrentDispatcher,Li=tt.ReactCurrentOwner,Te=tt.ReactCurrentBatchConfig,N=0,ne=null,K=null,ae=0,ke=0,Jt=xt(0),Z=0,nr=null,Mt=0,Fa=0,Gi=0,zn=null,he=null,Ri=0,un=1/0,qe=null,da=!1,Jo=null,gt=null,Sr=!1,lt=null,ua=0,On=0,Xo=null,Lr=-1,Gr=0;function ue(){return N&6?Y():Lr!==-1?Lr:Lr=Y()}function ht(e){return e.mode&1?N&2&&ae!==0?ae&-ae:dk.transition!==null?(Gr===0&&(Gr=n2()),Gr):(e=B,e!==0||(e=window.event,e=e===void 0?16:c2(e.type)),e):1}function Oe(e,t,n,r){if(50<On)throw On=0,Xo=null,Error(k(185));or(e,n,r),(!(N&2)||e!==ne)&&(e===ne&&(!(N&2)&&(Fa|=n),Z===4&&it(e,ae)),ve(e,r),n===1&&N===0&&!(t.mode&1)&&(un=Y()+500,ka&&kt()))}function ve(e,t){var n=e.callbackNode;dx(e,t);var r=Qr(e,e===ne?ae:0);if(r===0)n!==null&&bs(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&bs(n),t===1)e.tag===0?ck(cl.bind(null,e)):A2(cl.bind(null,e)),ok(function(){!(N&6)&&kt()}),n=null;else{switch(r2(r)){case 1:n=gi;break;case 4:n=e2;break;case 16:n=Vr;break;case 536870912:n=t2;break;default:n=Vr}n=Ec(n,vc.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function vc(e,t){if(Lr=-1,Gr=0,N&6)throw Error(k(327));var n=e.callbackNode;if(rn()&&e.callbackNode!==n)return null;var r=Qr(e,e===ne?ae:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=pa(e,r);else{t=r;var a=N;N|=2;var o=kc();(ne!==e||ae!==t)&&(qe=null,un=Y()+500,_t(e,t));do try{$k();break}catch(s){xc(e,s)}while(!0);Si(),ca.current=o,N=a,K!==null?t=0:(ne=null,ae=0,t=Z)}if(t!==0){if(t===2&&(a=Fo(e),a!==0&&(r=a,t=Zo(e,a))),t===1)throw n=nr,_t(e,0),it(e,r),ve(e,Y()),n;if(t===6)it(e,r);else{if(a=e.current.alternate,!(r&30)&&!Ak(a)&&(t=pa(e,r),t===2&&(o=Fo(e),o!==0&&(r=o,t=Zo(e,o))),t===1))throw n=nr,_t(e,0),it(e,r),ve(e,Y()),n;switch(e.finishedWork=a,e.finishedLanes=r,t){case 0:case 1:throw Error(k(345));case 2:Ft(e,he,qe);break;case 3:if(it(e,r),(r&130023424)===r&&(t=Ri+500-Y(),10<t)){if(Qr(e,0)!==0)break;if(a=e.suspendedLanes,(a&r)!==r){ue(),e.pingedLanes|=e.suspendedLanes&a;break}e.timeoutHandle=Po(Ft.bind(null,e,he,qe),t);break}Ft(e,he,qe);break;case 4:if(it(e,r),(r&4194240)===r)break;for(t=e.eventTimes,a=-1;0<r;){var i=31-ze(r);o=1<<i,i=t[i],i>a&&(a=i),r&=~o}if(r=a,r=Y()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Sk(r/1960))-r,10<r){e.timeoutHandle=Po(Ft.bind(null,e,he,qe),r);break}Ft(e,he,qe);break;case 5:Ft(e,he,qe);break;default:throw Error(k(329))}}}return ve(e,Y()),e.callbackNode===n?vc.bind(null,e):null}function Zo(e,t){var n=zn;return e.current.memoizedState.isDehydrated&&(_t(e,t).flags|=256),e=pa(e,t),e!==2&&(t=he,he=n,t!==null&&ei(t)),e}function ei(e){he===null?he=e:he.push.apply(he,e)}function Ak(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var a=n[r],o=a.getSnapshot;a=a.value;try{if(!Le(o(),a))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function it(e,t){for(t&=~Gi,t&=~Fa,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-ze(t),r=1<<n;e[n]=-1,t&=~r}}function cl(e){if(N&6)throw Error(k(327));rn();var t=Qr(e,0);if(!(t&1))return ve(e,Y()),null;var n=pa(e,t);if(e.tag!==0&&n===2){var r=Fo(e);r!==0&&(t=r,n=Zo(e,r))}if(n===1)throw n=nr,_t(e,0),it(e,t),ve(e,Y()),n;if(n===6)throw Error(k(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Ft(e,he,qe),ve(e,Y()),null}function Wi(e,t){var n=N;N|=1;try{return e(t)}finally{N=n,N===0&&(un=Y()+500,ka&&kt())}}function Nt(e){lt!==null&&lt.tag===0&&!(N&6)&&rn();var t=N;N|=1;var n=Te.transition,r=B;try{if(Te.transition=null,B=1,e)return e()}finally{B=r,Te.transition=n,N=t,!(N&6)&&kt()}}function Ui(){ke=Jt.current,L(Jt)}function _t(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,ak(n)),K!==null)for(n=K.return;n!==null;){var r=n;switch(Ci(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Zr();break;case 3:cn(),L(be),L(ce),Pi();break;case 5:ji(r);break;case 4:cn();break;case 13:L(U);break;case 19:L(U);break;case 10:Ai(r.type._context);break;case 22:case 23:Ui()}n=n.return}if(ne=e,K=e=mt(e.current,null),ae=ke=t,Z=0,nr=null,Gi=Fa=Mt=0,he=zn=null,St!==null){for(t=0;t<St.length;t++)if(n=St[t],r=n.interleaved,r!==null){n.interleaved=null;var a=r.next,o=n.pending;if(o!==null){var i=o.next;o.next=a,r.next=i}n.pending=r}St=null}return e}function xc(e,t){do{var n=K;try{if(Si(),Br.current=la,sa){for(var r=H.memoizedState;r!==null;){var a=r.queue;a!==null&&(a.pending=null),r=r.next}sa=!1}if(Pt=0,te=X=H=null,In=!1,Zn=0,Li.current=null,n===null||n.return===null){Z=1,nr=t,K=null;break}e:{var o=e,i=n.return,s=n,l=t;if(t=ae,s.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var d=l,f=s,h=f.tag;if(!(f.mode&1)&&(h===0||h===11||h===15)){var m=f.alternate;m?(f.updateQueue=m.updateQueue,f.memoizedState=m.memoizedState,f.lanes=m.lanes):(f.updateQueue=null,f.memoizedState=null)}var b=Ks(i);if(b!==null){b.flags&=-257,Js(b,i,s,o,t),b.mode&1&&Ys(o,d,t),t=b,l=d;var y=t.updateQueue;if(y===null){var v=new Set;v.add(l),t.updateQueue=v}else y.add(l);break e}else{if(!(t&1)){Ys(o,d,t),Hi();break e}l=Error(k(426))}}else if(W&&s.mode&1){var _=Ks(i);if(_!==null){!(_.flags&65536)&&(_.flags|=256),Js(_,i,s,o,t),Fi(dn(l,s));break e}}o=l=dn(l,s),Z!==4&&(Z=2),zn===null?zn=[o]:zn.push(o),o=i;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t;var p=rc(o,l,t);Ws(o,p);break e;case 1:s=l;var u=o.type,g=o.stateNode;if(!(o.flags&128)&&(typeof u.getDerivedStateFromError=="function"||g!==null&&typeof g.componentDidCatch=="function"&&(gt===null||!gt.has(g)))){o.flags|=65536,t&=-t,o.lanes|=t;var x=ac(o,s,t);Ws(o,x);break e}}o=o.return}while(o!==null)}Dc(n)}catch(D){t=D,K===n&&n!==null&&(K=n=n.return);continue}break}while(!0)}function kc(){var e=ca.current;return ca.current=la,e===null?la:e}function Hi(){(Z===0||Z===3||Z===2)&&(Z=4),ne===null||!(Mt&268435455)&&!(Fa&268435455)||it(ne,ae)}function pa(e,t){var n=N;N|=2;var r=kc();(ne!==e||ae!==t)&&(qe=null,_t(e,t));do try{_k();break}catch(a){xc(e,a)}while(!0);if(Si(),N=n,ca.current=r,K!==null)throw Error(k(261));return ne=null,ae=0,Z}function _k(){for(;K!==null;)wc(K)}function $k(){for(;K!==null&&!tx();)wc(K)}function wc(e){var t=Fc(e.alternate,e,ke);e.memoizedProps=e.pendingProps,t===null?Dc(e):K=t,Li.current=null}function Dc(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=Dk(n,t),n!==null){n.flags&=32767,K=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Z=6,K=null;return}}else if(n=wk(n,t,ke),n!==null){K=n;return}if(t=t.sibling,t!==null){K=t;return}K=t=e}while(t!==null);Z===0&&(Z=5)}function Ft(e,t,n){var r=B,a=Te.transition;try{Te.transition=null,B=1,Tk(e,t,n,r)}finally{Te.transition=a,B=r}return null}function Tk(e,t,n,r){do rn();while(lt!==null);if(N&6)throw Error(k(327));n=e.finishedWork;var a=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(k(177));e.callbackNode=null,e.callbackPriority=0;var o=n.lanes|n.childLanes;if(ux(e,o),e===ne&&(K=ne=null,ae=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Sr||(Sr=!0,Ec(Vr,function(){return rn(),null})),o=(n.flags&15990)!==0,n.subtreeFlags&15990||o){o=Te.transition,Te.transition=null;var i=B;B=1;var s=N;N|=4,Li.current=null,Fk(e,n),bc(n,e),Jx(To),Yr=!!$o,To=$o=null,e.current=n,Ek(n),nx(),N=s,B=i,Te.transition=o}else e.current=n;if(Sr&&(Sr=!1,lt=e,ua=a),o=e.pendingLanes,o===0&&(gt=null),ox(n.stateNode),ve(e,Y()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)a=t[n],r(a.value,{componentStack:a.stack,digest:a.digest});if(da)throw da=!1,e=Jo,Jo=null,e;return ua&1&&e.tag!==0&&rn(),o=e.pendingLanes,o&1?e===Xo?On++:(On=0,Xo=e):On=0,kt(),null}function rn(){if(lt!==null){var e=r2(ua),t=Te.transition,n=B;try{if(Te.transition=null,B=16>e?16:e,lt===null)var r=!1;else{if(e=lt,lt=null,ua=0,N&6)throw Error(k(331));var a=N;for(N|=4,E=e.current;E!==null;){var o=E,i=o.child;if(E.flags&16){var s=o.deletions;if(s!==null){for(var l=0;l<s.length;l++){var d=s[l];for(E=d;E!==null;){var f=E;switch(f.tag){case 0:case 11:case 15:Bn(8,f,o)}var h=f.child;if(h!==null)h.return=f,E=h;else for(;E!==null;){f=E;var m=f.sibling,b=f.return;if(gc(f),f===d){E=null;break}if(m!==null){m.return=b,E=m;break}E=b}}}var y=o.alternate;if(y!==null){var v=y.child;if(v!==null){y.child=null;do{var _=v.sibling;v.sibling=null,v=_}while(v!==null)}}E=o}}if(o.subtreeFlags&2064&&i!==null)i.return=o,E=i;else e:for(;E!==null;){if(o=E,o.flags&2048)switch(o.tag){case 0:case 11:case 15:Bn(9,o,o.return)}var p=o.sibling;if(p!==null){p.return=o.return,E=p;break e}E=o.return}}var u=e.current;for(E=u;E!==null;){i=E;var g=i.child;if(i.subtreeFlags&2064&&g!==null)g.return=i,E=g;else e:for(i=u;E!==null;){if(s=E,s.flags&2048)try{switch(s.tag){case 0:case 11:case 15:Ca(9,s)}}catch(D){V(s,s.return,D)}if(s===i){E=null;break e}var x=s.sibling;if(x!==null){x.return=s.return,E=x;break e}E=s.return}}if(N=a,kt(),Ue&&typeof Ue.onPostCommitFiberRoot=="function")try{Ue.onPostCommitFiberRoot(ma,e)}catch{}r=!0}return r}finally{B=n,Te.transition=t}}return!1}function dl(e,t,n){t=dn(n,t),t=rc(e,t,1),e=ft(e,t,1),t=ue(),e!==null&&(or(e,1,t),ve(e,t))}function V(e,t,n){if(e.tag===3)dl(e,e,n);else for(;t!==null;){if(t.tag===3){dl(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(gt===null||!gt.has(r))){e=dn(n,e),e=ac(t,e,1),t=ft(t,e,1),e=ue(),t!==null&&(or(t,1,e),ve(t,e));break}}t=t.return}}function jk(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=ue(),e.pingedLanes|=e.suspendedLanes&n,ne===e&&(ae&n)===n&&(Z===4||Z===3&&(ae&130023424)===ae&&500>Y()-Ri?_t(e,0):Gi|=n),ve(e,t)}function Cc(e,t){t===0&&(e.mode&1?(t=br,br<<=1,!(br&130023424)&&(br=4194304)):t=1);var n=ue();e=Ze(e,t),e!==null&&(or(e,t,n),ve(e,n))}function Pk(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Cc(e,n)}function Mk(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(k(314))}r!==null&&r.delete(t),Cc(e,n)}var Fc;Fc=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||be.current)me=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return me=!1,kk(e,t,n);me=!!(e.flags&131072)}else me=!1,W&&t.flags&1048576&&_2(t,na,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Or(e,t),e=t.pendingProps;var a=on(t,ce.current);nn(t,n),a=Ni(null,t,r,e,a,n);var o=Ii();return t.flags|=1,typeof a=="object"&&a!==null&&typeof a.render=="function"&&a.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,ye(r)?(o=!0,ea(t)):o=!1,t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,$i(t),a.updater=Da,t.stateNode=a,a._reactInternals=t,Lo(t,r,e,n),t=Wo(null,t,r,!0,o,n)):(t.tag=0,W&&o&&Di(t),de(null,t,a,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Or(e,t),e=t.pendingProps,a=r._init,r=a(r._payload),t.type=r,a=t.tag=Ik(r),e=Ne(r,e),a){case 0:t=Ro(null,t,r,e,n);break e;case 1:t=el(null,t,r,e,n);break e;case 11:t=Xs(null,t,r,e,n);break e;case 14:t=Zs(null,t,r,Ne(r.type,e),n);break e}throw Error(k(306,r,""))}return t;case 0:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:Ne(r,a),Ro(e,t,r,a,n);case 1:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:Ne(r,a),el(e,t,r,a,n);case 3:e:{if(lc(t),e===null)throw Error(k(387));r=t.pendingProps,o=t.memoizedState,a=o.element,N2(e,t),oa(t,r,null,n);var i=t.memoizedState;if(r=i.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:i.cache,pendingSuspenseBoundaries:i.pendingSuspenseBoundaries,transitions:i.transitions},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){a=dn(Error(k(423)),t),t=tl(e,t,r,n,a);break e}else if(r!==a){a=dn(Error(k(424)),t),t=tl(e,t,r,n,a);break e}else for(we=pt(t.stateNode.containerInfo.firstChild),De=t,W=!0,Be=null,n=P2(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(sn(),r===a){t=et(e,t,n);break e}de(e,t,r,n)}t=t.child}return t;case 5:return I2(t),e===null&&Bo(t),r=t.type,a=t.pendingProps,o=e!==null?e.memoizedProps:null,i=a.children,jo(r,a)?i=null:o!==null&&jo(r,o)&&(t.flags|=32),sc(e,t),de(e,t,i,n),t.child;case 6:return e===null&&Bo(t),null;case 13:return cc(e,t,n);case 4:return Ti(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=ln(t,null,r,n):de(e,t,r,n),t.child;case 11:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:Ne(r,a),Xs(e,t,r,a,n);case 7:return de(e,t,t.pendingProps,n),t.child;case 8:return de(e,t,t.pendingProps.children,n),t.child;case 12:return de(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,a=t.pendingProps,o=t.memoizedProps,i=a.value,z(ra,r._currentValue),r._currentValue=i,o!==null)if(Le(o.value,i)){if(o.children===a.children&&!be.current){t=et(e,t,n);break e}}else for(o=t.child,o!==null&&(o.return=t);o!==null;){var s=o.dependencies;if(s!==null){i=o.child;for(var l=s.firstContext;l!==null;){if(l.context===r){if(o.tag===1){l=Ke(-1,n&-n),l.tag=2;var d=o.updateQueue;if(d!==null){d=d.shared;var f=d.pending;f===null?l.next=l:(l.next=f.next,f.next=l),d.pending=l}}o.lanes|=n,l=o.alternate,l!==null&&(l.lanes|=n),zo(o.return,n,t),s.lanes|=n;break}l=l.next}}else if(o.tag===10)i=o.type===t.type?null:o.child;else if(o.tag===18){if(i=o.return,i===null)throw Error(k(341));i.lanes|=n,s=i.alternate,s!==null&&(s.lanes|=n),zo(i,n,t),i=o.sibling}else i=o.child;if(i!==null)i.return=o;else for(i=o;i!==null;){if(i===t){i=null;break}if(o=i.sibling,o!==null){o.return=i.return,i=o;break}i=i.return}o=i}de(e,t,a.children,n),t=t.child}return t;case 9:return a=t.type,r=t.pendingProps.children,nn(t,n),a=je(a),r=r(a),t.flags|=1,de(e,t,r,n),t.child;case 14:return r=t.type,a=Ne(r,t.pendingProps),a=Ne(r.type,a),Zs(e,t,r,a,n);case 15:return oc(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:Ne(r,a),Or(e,t),t.tag=1,ye(r)?(e=!0,ea(t)):e=!1,nn(t,n),nc(t,r,a),Lo(t,r,a,n),Wo(null,t,r,!0,e,n);case 19:return dc(e,t,n);case 22:return ic(e,t,n)}throw Error(k(156,t.tag))};function Ec(e,t){return Zl(e,t)}function Nk(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function $e(e,t,n,r){return new Nk(e,t,n,r)}function qi(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Ik(e){if(typeof e=="function")return qi(e)?1:0;if(e!=null){if(e=e.$$typeof,e===ui)return 11;if(e===pi)return 14}return 2}function mt(e,t){var n=e.alternate;return n===null?(n=$e(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Rr(e,t,n,r,a,o){var i=2;if(r=e,typeof e=="function")qi(e)&&(i=1);else if(typeof e=="string")i=5;else e:switch(e){case Gt:return $t(n.children,a,o,t);case di:i=8,a|=8;break;case co:return e=$e(12,n,t,a|2),e.elementType=co,e.lanes=o,e;case uo:return e=$e(13,n,t,a),e.elementType=uo,e.lanes=o,e;case po:return e=$e(19,n,t,a),e.elementType=po,e.lanes=o,e;case Il:return Ea(n,a,o,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Ml:i=10;break e;case Nl:i=9;break e;case ui:i=11;break e;case pi:i=14;break e;case rt:i=16,r=null;break e}throw Error(k(130,e==null?e:typeof e,""))}return t=$e(i,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function $t(e,t,n,r){return e=$e(7,e,r,t),e.lanes=n,e}function Ea(e,t,n,r){return e=$e(22,e,r,t),e.elementType=Il,e.lanes=n,e.stateNode={isHidden:!1},e}function ao(e,t,n){return e=$e(6,e,null,t),e.lanes=n,e}function oo(e,t,n){return t=$e(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Bk(e,t,n,r,a){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Oa(0),this.expirationTimes=Oa(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Oa(0),this.identifierPrefix=r,this.onRecoverableError=a,this.mutableSourceEagerHydrationData=null}function Vi(e,t,n,r,a,o,i,s,l){return e=new Bk(e,t,n,s,l),t===1?(t=1,o===!0&&(t|=8)):t=0,o=$e(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},$i(o),e}function zk(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Lt,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function Sc(e){if(!e)return yt;e=e._reactInternals;e:{if(Bt(e)!==e||e.tag!==1)throw Error(k(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(ye(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(k(171))}if(e.tag===1){var n=e.type;if(ye(n))return S2(e,n,t)}return t}function Ac(e,t,n,r,a,o,i,s,l){return e=Vi(n,r,!0,e,a,o,i,s,l),e.context=Sc(null),n=e.current,r=ue(),a=ht(n),o=Ke(r,a),o.callback=t??null,ft(n,o,a),e.current.lanes=a,or(e,a,r),ve(e,r),e}function Sa(e,t,n,r){var a=t.current,o=ue(),i=ht(a);return n=Sc(n),t.context===null?t.context=n:t.pendingContext=n,t=Ke(o,i),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=ft(a,t,i),e!==null&&(Oe(e,a,i,o),Ir(e,a,i)),i}function fa(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function ul(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Qi(e,t){ul(e,t),(e=e.alternate)&&ul(e,t)}function Ok(){return null}var _c=typeof reportError=="function"?reportError:function(e){console.error(e)};function Yi(e){this._internalRoot=e}Aa.prototype.render=Yi.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(k(409));Sa(e,t,null,null)};Aa.prototype.unmount=Yi.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Nt(function(){Sa(null,e,null,null)}),t[Xe]=null}};function Aa(e){this._internalRoot=e}Aa.prototype.unstable_scheduleHydration=function(e){if(e){var t=i2();e={blockedOn:null,target:e,priority:t};for(var n=0;n<ot.length&&t!==0&&t<ot[n].priority;n++);ot.splice(n,0,e),n===0&&l2(e)}};function Ki(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function _a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function pl(){}function Lk(e,t,n,r,a){if(a){if(typeof r=="function"){var o=r;r=function(){var d=fa(i);o.call(d)}}var i=Ac(t,r,e,0,null,!1,!1,"",pl);return e._reactRootContainer=i,e[Xe]=i.current,Qn(e.nodeType===8?e.parentNode:e),Nt(),i}for(;a=e.lastChild;)e.removeChild(a);if(typeof r=="function"){var s=r;r=function(){var d=fa(l);s.call(d)}}var l=Vi(e,0,!1,null,null,!1,!1,"",pl);return e._reactRootContainer=l,e[Xe]=l.current,Qn(e.nodeType===8?e.parentNode:e),Nt(function(){Sa(t,l,n,r)}),l}function $a(e,t,n,r,a){var o=n._reactRootContainer;if(o){var i=o;if(typeof a=="function"){var s=a;a=function(){var l=fa(i);s.call(l)}}Sa(t,i,e,a)}else i=Lk(n,t,e,a,r);return fa(i)}a2=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=_n(t.pendingLanes);n!==0&&(hi(t,n|1),ve(t,Y()),!(N&6)&&(un=Y()+500,kt()))}break;case 13:Nt(function(){var r=Ze(e,1);if(r!==null){var a=ue();Oe(r,e,1,a)}}),Qi(e,1)}};mi=function(e){if(e.tag===13){var t=Ze(e,134217728);if(t!==null){var n=ue();Oe(t,e,134217728,n)}Qi(e,134217728)}};o2=function(e){if(e.tag===13){var t=ht(e),n=Ze(e,t);if(n!==null){var r=ue();Oe(n,e,t,r)}Qi(e,t)}};i2=function(){return B};s2=function(e,t){var n=B;try{return B=e,t()}finally{B=n}};wo=function(e,t,n){switch(t){case"input":if(ho(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=xa(r);if(!a)throw Error(k(90));zl(r),ho(r,a)}}}break;case"textarea":Ll(e,n);break;case"select":t=n.value,t!=null&&Xt(e,!!n.multiple,t,!1)}};Vl=Wi;Ql=Nt;var Gk={usingClientEntryPoint:!1,Events:[sr,Ht,xa,Hl,ql,Wi]},En={findFiberByHostInstance:Et,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Rk={bundleType:En.bundleType,version:En.version,rendererPackageName:En.rendererPackageName,rendererConfig:En.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:tt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Jl(e),e===null?null:e.stateNode},findFiberByHostInstance:En.findFiberByHostInstance||Ok,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ar=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ar.isDisabled&&Ar.supportsFiber)try{ma=Ar.inject(Rk),Ue=Ar}catch{}}Fe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Gk;Fe.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Ki(t))throw Error(k(200));return zk(e,t,null,n)};Fe.createRoot=function(e,t){if(!Ki(e))throw Error(k(299));var n=!1,r="",a=_c;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(a=t.onRecoverableError)),t=Vi(e,1,!1,null,null,n,!1,r,a),e[Xe]=t.current,Qn(e.nodeType===8?e.parentNode:e),new Yi(t)};Fe.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(k(188)):(e=Object.keys(e).join(","),Error(k(268,e)));return e=Jl(t),e=e===null?null:e.stateNode,e};Fe.flushSync=function(e){return Nt(e)};Fe.hydrate=function(e,t,n){if(!_a(t))throw Error(k(200));return $a(null,e,t,!0,n)};Fe.hydrateRoot=function(e,t,n){if(!Ki(e))throw Error(k(405));var r=n!=null&&n.hydratedSources||null,a=!1,o="",i=_c;if(n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onRecoverableError!==void 0&&(i=n.onRecoverableError)),t=Ac(t,null,e,1,n??null,a,!1,o,i),e[Xe]=t.current,Qn(e),r)for(e=0;e<r.length;e++)n=r[e],a=n._getVersion,a=a(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,a]:t.mutableSourceEagerHydrationData.push(n,a);return new Aa(t)};Fe.render=function(e,t,n){if(!_a(t))throw Error(k(200));return $a(null,e,t,!1,n)};Fe.unmountComponentAtNode=function(e){if(!_a(e))throw Error(k(40));return e._reactRootContainer?(Nt(function(){$a(null,null,e,!1,function(){e._reactRootContainer=null,e[Xe]=null})}),!0):!1};Fe.unstable_batchedUpdates=Wi;Fe.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!_a(n))throw Error(k(200));if(e==null||e._reactInternals===void 0)throw Error(k(38));return $a(e,t,n,!1,r)};Fe.version="18.3.1-next-f1338f8080-20240426";function $c(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE($c)}catch(e){console.error(e)}}$c(),$l.exports=Fe;var Wk=$l.exports,Tc,fl=Wk;Tc=fl.createRoot,fl.hydrateRoot;const Uk=["title","section","two-column","feature-grid","data-table","stat-row","timeline","quote","closing","image-hero","comparison","code"],ti={title:"Title",section:"Section divider","two-column":"Two column","feature-grid":"Feature grid","data-table":"Data table","stat-row":"Stat row",timeline:"Timeline",quote:"Quote",closing:"Closing","image-hero":"Image hero",comparison:"Comparison",code:"Code"};function Hk(e){switch(e){case"title":return{layout:e,eyebrow:"Eyebrow",heading:"Title slide",lead:"Supporting line."};case"section":return{layout:e,number:"01",eyebrow:"Part",heading:"Section title",lead:""};case"two-column":return{layout:e,heading:"Heading",body:"Left column body text.",image:"",imageAlt:"Image"};case"image-hero":return{layout:e,eyebrow:"Story",heading:"Hero moment",lead:"Caption over a full-bleed image.",image:"",imageAlt:"Hero image"};case"comparison":return{layout:e,heading:"Before vs after",leftLabel:"Before",left:"The old way — slow, manual, error-prone.",rightLabel:"After",right:"The new way — automated, fast, reliable.",emphasis:"right"};case"code":return{layout:e,eyebrow:"API",heading:"Ship in five lines",filename:"example.ts",language:"ts",code:`const client = createClient({ apiKey });
const res = await client.run({ prompt });
console.log(res.ok);`};case"feature-grid":return{layout:e,heading:"Feature grid",columns:3,cards:[{title:"One",body:"First point."},{title:"Two",body:"Second point."},{title:"Three",body:"Third point."}]};case"data-table":return{layout:e,heading:"Table",columns:["Column A","Column B"],rows:[["a1","b1"],["a2","b2"]]};case"stat-row":return{layout:e,heading:"Stats",stats:[{value:"100%",label:"Metric"},{value:"2x",label:"Metric"}]};case"timeline":return{layout:e,heading:"Timeline",steps:[{title:"Step one",body:"Detail."},{title:"Step two",body:"Detail."}]};case"quote":return{layout:e,quote:"A memorable quote.",by:"Attribution"};case"closing":return{layout:e,eyebrow:"Thanks",heading:"Closing",lead:"Call to action.",cta:{label:"Get started",href:"https://example.com"}};default:return{layout:e,heading:"Slide"}}}const Ji={type:"deck",meta:{title:"Acme Q3",company:"Acme",theme:"signal",description:"Studio craft preview"},slides:[{layout:"title",eyebrow:"Q3 2026",heading:"Acme All-Hands",lead:"Momentum, metrics, and what's next."},{layout:"image-hero",eyebrow:"Moment",heading:"Ship the story, not the slide.",lead:"Full-bleed craft that still exports to editable PPTX.",image:"data:image/svg+xml,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#0B1220"/><stop offset="1" stop-color="#FF3B1F"/></linearGradient></defs><rect width="1600" height="900" fill="url(#g)"/><circle cx="1180" cy="280" r="180" fill="#0D9488" opacity=".35"/></svg>'),imageAlt:"Signal gradient field"},{layout:"section",number:"01",eyebrow:"Part one",heading:"Where we are"},{layout:"feature-grid",heading:"Three pillars",columns:"bento",cards:[{icon:"fa-solid fa-bolt",title:"Speed",body:"Ship 3x faster with schema craft."},{title:"Safety",body:"SOC2 in progress."},{title:"Simplicity",body:"One command install."},{title:"Export",body:"Native editable PPTX."},{title:"Themes",body:"75 swappable looks."}]},{layout:"comparison",heading:"Before vs after",leftLabel:"Prompt-only packs",left:"Opaque HTML. Hard to edit one slide. No native PowerPoint.",rightLabel:"presentation-md",right:"Schema-validated Deck JSON. Diff one slide. MCP + editable PPTX.",emphasis:"right"},{layout:"two-column",eyebrow:"Craft",heading:"Asymmetric layouts stay intentional.",body:"Ratio and reverse controls keep media and copy in tension — not a default 50/50 split.",aside:"2:1 copy · reverse media",ratio:"2-1"},{layout:"code",eyebrow:"Agent skill",heading:"One install. Any agent.",filename:"install.sh",language:"bash",code:`npx @presentation-md/install claude-code
# then: create a presentation about…`},{layout:"stat-row",heading:"By the numbers",stats:[{value:"75",label:"Themes"},{value:"12",label:"Layouts"},{value:"1",label:"Install"}]},{layout:"quote",quote:"Make it work, make it right, make it fast.",by:"Kent Beck"},{layout:"closing",heading:"Thank you",lead:"Questions?",cta:{label:"Get started",href:"https://presentation-md.vercel.app"}}]},qk="deck",Vk={title:"Jellybean — Product Launch",company:"Jellybean",description:"DTC candy / consumer launch — candy-pop multi-slide proof.",theme:"candy-pop"},Qk=[{layout:"title",eyebrow:"Drop · Summer",heading:"Snack energy. Serious craft.",lead:"Hot pink + jellybean blue for brands that refuse beige."},{layout:"image-hero",eyebrow:"Drop · Summer",heading:"Snack energy. Serious craft.",lead:"Hot pink + jellybean blue for brands that refuse beige.",image:"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201600%20900%22%20width%3D%221600%22%20height%3D%22900%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%3Cfilter%20id%3D%22grain%22%20x%3D%22-20%25%22%20y%3D%22-20%25%22%20width%3D%22140%25%22%20height%3D%22140%25%22%3E%0A%20%20%20%20%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.85%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%20result%3D%22n%22%2F%3E%0A%20%20%20%20%3CfeColorMatrix%20type%3D%22matrix%22%20values%3D%220%200%200%200%201%20%200%200%200%200%201%20%200%200%200%200%201%20%200%200%200%200.18%200%22%20in%3D%22n%22%20result%3D%22g%22%2F%3E%0A%20%20%20%20%3CfeBlend%20in%3D%22SourceGraphic%22%20in2%3D%22g%22%20mode%3D%22soft-light%22%2F%3E%0A%20%20%3C%2Ffilter%3E%0A%20%20%3Cfilter%20id%3D%22soft%22%20x%3D%22-30%25%22%20y%3D%22-30%25%22%20width%3D%22160%25%22%20height%3D%22160%25%22%3E%0A%20%20%20%20%3CfeGaussianBlur%20stdDeviation%3D%2228%22%2F%3E%0A%20%20%3C%2Ffilter%3E%0A%20%20%3Cfilter%20id%3D%22soft2%22%20x%3D%22-30%25%22%20y%3D%22-30%25%22%20width%3D%22160%25%22%20height%3D%22160%25%22%3E%0A%20%20%20%20%3CfeGaussianBlur%20stdDeviation%3D%2248%22%2F%3E%0A%20%20%3C%2Ffilter%3E%0A%20%20%3CradialGradient%20id%3D%22vig%22%20cx%3D%2250%25%22%20cy%3D%2245%25%22%20r%3D%2270%25%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23f7e8d4%22%20stop-opacity%3D%220%22%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%2270%25%22%20stop-color%3D%22%23fdf3e7%22%20stop-opacity%3D%220.15%22%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23000%22%20stop-opacity%3D%220.55%22%2F%3E%0A%20%20%3C%2FradialGradient%3E%0A%20%20%3ClinearGradient%20id%3D%22floor%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22rgba%28255%2C93%2C143%2C0.000%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22rgba%28255%2C93%2C143%2C0.280%29%22%20%2F%3E%0A%20%20%3C%2FlinearGradient%3E%0A%20%20%3ClinearGradient%20id%3D%22beam%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22rgba%2845%2C125%2C210%2C0.550%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%2245%25%22%20stop-color%3D%22rgba%28255%2C93%2C143%2C0.180%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22rgba%28247%2C232%2C212%2C0.000%29%22%20%2F%3E%0A%20%20%3C%2FlinearGradient%3E%0A%20%20%3CradialGradient%20id%3D%22orb1%22%20cx%3D%2235%25%22%20cy%3D%2230%25%22%20r%3D%2245%25%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22rgba%28255%2C93%2C143%2C0.750%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%2255%25%22%20stop-color%3D%22rgba%28255%2C93%2C143%2C0.180%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22rgba%28255%2C93%2C143%2C0.000%29%22%20%2F%3E%0A%20%20%3C%2FradialGradient%3E%0A%20%20%3CradialGradient%20id%3D%22orb2%22%20cx%3D%2272%25%22%20cy%3D%2258%25%22%20r%3D%2240%25%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22rgba%2845%2C125%2C210%2C0.650%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%2260%25%22%20stop-color%3D%22rgba%2845%2C125%2C210%2C0.160%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22rgba%2845%2C125%2C210%2C0.000%29%22%20%2F%3E%0A%20%20%3C%2FradialGradient%3E%0A%20%20%3CradialGradient%20id%3D%22bokeh%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220.55%22%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%2240%25%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220.12%22%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%2F%3E%0A%20%20%3C%2FradialGradient%3E%0A%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Cg%20filter%3D%22url%28%23grain%29%22%3E%0A%0A%20%20%3Crect%20width%3D%221600%22%20height%3D%22900%22%20fill%3D%22%23fdf3e7%22%2F%3E%0A%20%20%3Cellipse%20cx%3D%22800%22%20cy%3D%22820%22%20rx%3D%22700%22%20ry%3D%22120%22%20fill%3D%22rgba%280%2C0%2C0%2C0.350%29%22%20filter%3D%22url%28%23soft%29%22%2F%3E%0A%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%221600%22%20height%3D%22900%22%20fill%3D%22url%28%23floor%29%22%2F%3E%0A%20%20%3Cellipse%20cx%3D%22520%22%20cy%3D%22260%22%20rx%3D%22360%22%20ry%3D%22260%22%20fill%3D%22url%28%23orb1%29%22%20filter%3D%22url%28%23soft2%29%22%2F%3E%0A%20%20%3Cellipse%20cx%3D%221180%22%20cy%3D%22220%22%20rx%3D%22300%22%20ry%3D%22220%22%20fill%3D%22url%28%23orb2%29%22%20filter%3D%22url%28%23soft2%29%22%2F%3E%0A%20%20%3C%21--%20desk%20product%20frame%20--%3E%0A%20%20%3Cg%20transform%3D%22translate%28430%2C170%29%22%3E%0A%20%20%20%20%3Crect%20x%3D%2218%22%20y%3D%2228%22%20width%3D%22720%22%20height%3D%22460%22%20rx%3D%2228%22%20fill%3D%22rgba%280%2C0%2C0%2C0.350%29%22%20filter%3D%22url%28%23soft%29%22%2F%3E%0A%20%20%20%20%3Crect%20width%3D%22720%22%20height%3D%22450%22%20rx%3D%2226%22%20fill%3D%22%23f7e8d4%22%20stroke%3D%22rgba%28255%2C93%2C143%2C0.350%29%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%2222%22%20y%3D%2222%22%20width%3D%22676%22%20height%3D%22360%22%20rx%3D%2216%22%20fill%3D%22%23fdf3e7%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%2222%22%20y%3D%2222%22%20width%3D%22676%22%20height%3D%22360%22%20rx%3D%2216%22%20fill%3D%22url%28%23beam%29%22%20opacity%3D%220.55%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%2270%22%20y%3D%2290%22%20width%3D%22220%22%20height%3D%2218%22%20rx%3D%226%22%20fill%3D%22rgba%28255%2C93%2C143%2C0.850%29%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%2270%22%20y%3D%22130%22%20width%3D%22380%22%20height%3D%2212%22%20rx%3D%224%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.350%29%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%2270%22%20y%3D%22158%22%20width%3D%22320%22%20height%3D%2212%22%20rx%3D%224%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.220%29%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%2270%22%20y%3D%22210%22%20width%3D%22200%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22rgba%2845%2C125%2C210%2C0.280%29%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%22290%22%20y%3D%22210%22%20width%3D%22200%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22rgba%28255%2C93%2C143%2C0.220%29%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%22510%22%20y%3D%22210%22%20width%3D%22140%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.080%29%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%22280%22%20y%3D%22400%22%20width%3D%22160%22%20height%3D%2210%22%20rx%3D%225%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.180%29%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Crect%20width%3D%221600%22%20height%3D%22900%22%20fill%3D%22url%28%23vig%29%22%2F%3E%0A%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E",imageAlt:"Jellybean craft visual"},{layout:"feature-grid",eyebrow:"Lineup",heading:"Four SKUs. One smile.",columns:"bento",cards:[{icon:"fa-solid fa-candy-cane",title:"Core chews",body:"Six flavors, zero mystery ingredients."},{icon:"fa-solid fa-gift",title:"Gift tins",body:"Designed to photograph and to last."},{icon:"fa-solid fa-store",title:"Pop-ups",body:"Weekend installs that sell out by Sunday."},{icon:"fa-solid fa-mobile-screen",title:"Refill app",body:"Subscribe without the soft-sell trap."},{icon:"fa-solid fa-layer-group",title:"Stack for scan",body:"Hierarchy first. Decoration second. Decoration never."}]},{layout:"stat-row",eyebrow:"Proof",heading:"Sweet numbers.",stats:[{value:"2.4M",label:"Units shipped"},{value:"61%",label:"Repeat rate"},{value:"4.9★",label:"Store rating"}]},{layout:"quote",quote:"It looks like a toy and tastes like a decision.",by:"Harper Lin · Food editor"},{layout:"closing",eyebrow:"Try it",heading:"Grab a tin. Skip the beige aisle.",lead:"Retail partners open now for Q4.",cta:{label:"Order samples",href:"#"}}],Yk={type:qk,meta:Vk,slides:Qk},Kk="deck",Jk={title:"Mallsoft — Launch",company:"Mallsoft",description:"Vaporwave consumer launch — vaporwave multi-slide proof.",theme:"vaporwave"},Xk=[{layout:"title",eyebrow:"Opening soon",heading:"AESTHETIC MALL.",lead:"Dusk purple. Pink chrome. Teal grid. Nostalgia with a checkout."},{layout:"image-hero",eyebrow:"Opening soon",heading:"AESTHETIC MALL.",lead:"Dusk purple. Pink chrome. Teal grid. Nostalgia with a checkout.",image:"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201600%20900%22%20width%3D%221600%22%20height%3D%22900%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%3Cfilter%20id%3D%22grain%22%20x%3D%22-20%25%22%20y%3D%22-20%25%22%20width%3D%22140%25%22%20height%3D%22140%25%22%3E%0A%20%20%20%20%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.85%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%20result%3D%22n%22%2F%3E%0A%20%20%20%20%3CfeColorMatrix%20type%3D%22matrix%22%20values%3D%220%200%200%200%201%20%200%200%200%200%201%20%200%200%200%200%201%20%200%200%200%200.18%200%22%20in%3D%22n%22%20result%3D%22g%22%2F%3E%0A%20%20%20%20%3CfeBlend%20in%3D%22SourceGraphic%22%20in2%3D%22g%22%20mode%3D%22soft-light%22%2F%3E%0A%20%20%3C%2Ffilter%3E%0A%20%20%3Cfilter%20id%3D%22soft%22%20x%3D%22-30%25%22%20y%3D%22-30%25%22%20width%3D%22160%25%22%20height%3D%22160%25%22%3E%0A%20%20%20%20%3CfeGaussianBlur%20stdDeviation%3D%2228%22%2F%3E%0A%20%20%3C%2Ffilter%3E%0A%20%20%3Cfilter%20id%3D%22soft2%22%20x%3D%22-30%25%22%20y%3D%22-30%25%22%20width%3D%22160%25%22%20height%3D%22160%25%22%3E%0A%20%20%20%20%3CfeGaussianBlur%20stdDeviation%3D%2248%22%2F%3E%0A%20%20%3C%2Ffilter%3E%0A%20%20%3CradialGradient%20id%3D%22vig%22%20cx%3D%2250%25%22%20cy%3D%2245%25%22%20r%3D%2270%25%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%232d1060%22%20stop-opacity%3D%220%22%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%2270%25%22%20stop-color%3D%22%231a0533%22%20stop-opacity%3D%220.15%22%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23000%22%20stop-opacity%3D%220.55%22%2F%3E%0A%20%20%3C%2FradialGradient%3E%0A%20%20%3ClinearGradient%20id%3D%22floor%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22rgba%28255%2C106%2C213%2C0.000%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22rgba%28255%2C106%2C213%2C0.280%29%22%20%2F%3E%0A%20%20%3C%2FlinearGradient%3E%0A%20%20%3ClinearGradient%20id%3D%22beam%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22rgba%2892%2C225%2C255%2C0.550%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%2245%25%22%20stop-color%3D%22rgba%28255%2C106%2C213%2C0.180%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22rgba%2845%2C16%2C96%2C0.000%29%22%20%2F%3E%0A%20%20%3C%2FlinearGradient%3E%0A%20%20%3CradialGradient%20id%3D%22orb1%22%20cx%3D%2235%25%22%20cy%3D%2230%25%22%20r%3D%2245%25%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22rgba%28255%2C106%2C213%2C0.750%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%2255%25%22%20stop-color%3D%22rgba%28255%2C106%2C213%2C0.180%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22rgba%28255%2C106%2C213%2C0.000%29%22%20%2F%3E%0A%20%20%3C%2FradialGradient%3E%0A%20%20%3CradialGradient%20id%3D%22orb2%22%20cx%3D%2272%25%22%20cy%3D%2258%25%22%20r%3D%2240%25%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22rgba%2892%2C225%2C255%2C0.650%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%2260%25%22%20stop-color%3D%22rgba%2892%2C225%2C255%2C0.160%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22rgba%2892%2C225%2C255%2C0.000%29%22%20%2F%3E%0A%20%20%3C%2FradialGradient%3E%0A%20%20%3CradialGradient%20id%3D%22bokeh%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220.55%22%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%2240%25%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220.12%22%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%2F%3E%0A%20%20%3C%2FradialGradient%3E%0A%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Cg%20filter%3D%22url%28%23grain%29%22%3E%0A%0A%20%20%3Crect%20width%3D%221600%22%20height%3D%22900%22%20fill%3D%22%231a0533%22%2F%3E%0A%20%20%3Crect%20width%3D%221600%22%20height%3D%22900%22%20fill%3D%22url%28%23beam%29%22%20opacity%3D%220.9%22%2F%3E%0A%20%20%3Cellipse%20cx%3D%22420%22%20cy%3D%22280%22%20rx%3D%22520%22%20ry%3D%22340%22%20fill%3D%22url%28%23orb1%29%22%20filter%3D%22url%28%23soft2%29%22%2F%3E%0A%20%20%3Cellipse%20cx%3D%221180%22%20cy%3D%22620%22%20rx%3D%22480%22%20ry%3D%22300%22%20fill%3D%22url%28%23orb2%29%22%20filter%3D%22url%28%23soft2%29%22%2F%3E%0A%20%20%3Cellipse%20cx%3D%22880%22%20cy%3D%22220%22%20rx%3D%22220%22%20ry%3D%22140%22%20fill%3D%22rgba%2892%2C225%2C255%2C0.220%29%22%20filter%3D%22url%28%23soft%29%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M0%20640%20C320%20520%20640%20780%20960%20600%20S1400%20480%201600%20560%20L1600%20900%20L0%20900%20Z%22%20fill%3D%22rgba%28255%2C106%2C213%2C0.120%29%22%2F%3E%0A%20%20%3Cg%20opacity%3D%220.55%22%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22260%22%20cy%3D%22180%22%20r%3D%2218%22%20fill%3D%22url%28%23bokeh%29%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22520%22%20cy%3D%22140%22%20r%3D%2210%22%20fill%3D%22url%28%23bokeh%29%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22980%22%20cy%3D%22210%22%20r%3D%2214%22%20fill%3D%22url%28%23bokeh%29%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%221320%22%20cy%3D%22320%22%20r%3D%2222%22%20fill%3D%22url%28%23bokeh%29%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%221100%22%20cy%3D%22120%22%20r%3D%228%22%20fill%3D%22url%28%23bokeh%29%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Crect%20width%3D%221600%22%20height%3D%22900%22%20fill%3D%22url%28%23vig%29%22%2F%3E%0A%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E",imageAlt:"Mallsoft craft visual"},{layout:"feature-grid",eyebrow:"Floors",heading:"Three levels of dusk",columns:"bento",cards:[{icon:"fa-solid fa-shirt",title:"Arcade apparel",body:"Drops that look like 1992 and ship tomorrow."},{icon:"fa-solid fa-music",title:"Lobby mixes",body:"Playlists curated like fountain music."},{icon:"fa-solid fa-bag-shopping",title:"Food court NFT",body:"Just kidding — real snacks, real lines."},{icon:"fa-solid fa-eye",title:"Show, don't pad",body:"Asymmetry beats another identical third column."},{icon:"fa-solid fa-compass",title:"Clear north star",body:"One decisive story beat — not a wall of equal tiles."}]},{layout:"stat-row",eyebrow:"Hype",heading:"The mall is metric.",stats:[{value:"120k",label:"Waitlist"},{value:"8",label:"City pop-ups"},{value:"∞",label:"Sunset loops"}]},{layout:"comparison",eyebrow:"Vibe check",heading:"Generic drop vs. mallsoft.",leftLabel:"Hype cycle",left:`Black tees.
Same font.
Gone in a week.`,rightLabel:"Mallsoft",right:`Dusk palette.
Monoton titles.
A world you revisit.`,emphasis:"right"},{layout:"closing",eyebrow:"Enter",heading:"Take the escalator.",lead:"Membership opens Friday at dusk.",cta:{label:"Join the mall",href:"#"}}],Zk={type:Kk,meta:Jk,slides:Xk},e5="deck",t5={title:"Neon District — Platform Launch",company:"Neon District",description:"Neon Cyber / neon-noir structured proof.",theme:"neon-noir"},n5=[{layout:"title",eyebrow:"Platform · Night drop",heading:"The city never sleeps. Neither should your stack.",lead:"Realtime nightlife infrastructure — pink signal, cyan telemetry."},{layout:"image-hero",eyebrow:"Platform · Night drop",heading:"The city never sleeps. Neither should your stack.",lead:"Realtime nightlife infrastructure — pink signal, cyan telemetry.",image:"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201600%20900%22%20width%3D%221600%22%20height%3D%22900%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%3Cfilter%20id%3D%22grain%22%20x%3D%22-20%25%22%20y%3D%22-20%25%22%20width%3D%22140%25%22%20height%3D%22140%25%22%3E%0A%20%20%20%20%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.85%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%20result%3D%22n%22%2F%3E%0A%20%20%20%20%3CfeColorMatrix%20type%3D%22matrix%22%20values%3D%220%200%200%200%201%20%200%200%200%200%201%20%200%200%200%200%201%20%200%200%200%200.18%200%22%20in%3D%22n%22%20result%3D%22g%22%2F%3E%0A%20%20%20%20%3CfeBlend%20in%3D%22SourceGraphic%22%20in2%3D%22g%22%20mode%3D%22soft-light%22%2F%3E%0A%20%20%3C%2Ffilter%3E%0A%20%20%3Cfilter%20id%3D%22soft%22%20x%3D%22-30%25%22%20y%3D%22-30%25%22%20width%3D%22160%25%22%20height%3D%22160%25%22%3E%0A%20%20%20%20%3CfeGaussianBlur%20stdDeviation%3D%2228%22%2F%3E%0A%20%20%3C%2Ffilter%3E%0A%20%20%3Cfilter%20id%3D%22soft2%22%20x%3D%22-30%25%22%20y%3D%22-30%25%22%20width%3D%22160%25%22%20height%3D%22160%25%22%3E%0A%20%20%20%20%3CfeGaussianBlur%20stdDeviation%3D%2248%22%2F%3E%0A%20%20%3C%2Ffilter%3E%0A%20%20%3CradialGradient%20id%3D%22vig%22%20cx%3D%2250%25%22%20cy%3D%2245%25%22%20r%3D%2270%25%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230a0a1e%22%20stop-opacity%3D%220%22%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%2270%25%22%20stop-color%3D%22%23050510%22%20stop-opacity%3D%220.15%22%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23000%22%20stop-opacity%3D%220.55%22%2F%3E%0A%20%20%3C%2FradialGradient%3E%0A%20%20%3ClinearGradient%20id%3D%22floor%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22rgba%28255%2C46%2C151%2C0.000%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22rgba%28255%2C46%2C151%2C0.280%29%22%20%2F%3E%0A%20%20%3C%2FlinearGradient%3E%0A%20%20%3ClinearGradient%20id%3D%22beam%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22rgba%280%2C229%2C255%2C0.550%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%2245%25%22%20stop-color%3D%22rgba%28255%2C46%2C151%2C0.180%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22rgba%2810%2C10%2C30%2C0.000%29%22%20%2F%3E%0A%20%20%3C%2FlinearGradient%3E%0A%20%20%3CradialGradient%20id%3D%22orb1%22%20cx%3D%2235%25%22%20cy%3D%2230%25%22%20r%3D%2245%25%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22rgba%28255%2C46%2C151%2C0.750%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%2255%25%22%20stop-color%3D%22rgba%28255%2C46%2C151%2C0.180%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22rgba%28255%2C46%2C151%2C0.000%29%22%20%2F%3E%0A%20%20%3C%2FradialGradient%3E%0A%20%20%3CradialGradient%20id%3D%22orb2%22%20cx%3D%2272%25%22%20cy%3D%2258%25%22%20r%3D%2240%25%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22rgba%280%2C229%2C255%2C0.650%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%2260%25%22%20stop-color%3D%22rgba%280%2C229%2C255%2C0.160%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22rgba%280%2C229%2C255%2C0.000%29%22%20%2F%3E%0A%20%20%3C%2FradialGradient%3E%0A%20%20%3CradialGradient%20id%3D%22bokeh%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220.55%22%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%2240%25%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220.12%22%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%2F%3E%0A%20%20%3C%2FradialGradient%3E%0A%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Cg%20filter%3D%22url%28%23grain%29%22%3E%0A%0A%20%20%3Crect%20width%3D%221600%22%20height%3D%22900%22%20fill%3D%22%23050510%22%2F%3E%0A%20%20%3Cellipse%20cx%3D%22800%22%20cy%3D%22820%22%20rx%3D%22700%22%20ry%3D%22120%22%20fill%3D%22rgba%280%2C0%2C0%2C0.350%29%22%20filter%3D%22url%28%23soft%29%22%2F%3E%0A%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%221600%22%20height%3D%22900%22%20fill%3D%22url%28%23floor%29%22%2F%3E%0A%20%20%3Cellipse%20cx%3D%22520%22%20cy%3D%22260%22%20rx%3D%22360%22%20ry%3D%22260%22%20fill%3D%22url%28%23orb1%29%22%20filter%3D%22url%28%23soft2%29%22%2F%3E%0A%20%20%3Cellipse%20cx%3D%221180%22%20cy%3D%22220%22%20rx%3D%22300%22%20ry%3D%22220%22%20fill%3D%22url%28%23orb2%29%22%20filter%3D%22url%28%23soft2%29%22%2F%3E%0A%20%20%3C%21--%20desk%20product%20frame%20--%3E%0A%20%20%3Cg%20transform%3D%22translate%28430%2C170%29%22%3E%0A%20%20%20%20%3Crect%20x%3D%2218%22%20y%3D%2228%22%20width%3D%22720%22%20height%3D%22460%22%20rx%3D%2228%22%20fill%3D%22rgba%280%2C0%2C0%2C0.350%29%22%20filter%3D%22url%28%23soft%29%22%2F%3E%0A%20%20%20%20%3Crect%20width%3D%22720%22%20height%3D%22450%22%20rx%3D%2226%22%20fill%3D%22%230a0a1e%22%20stroke%3D%22rgba%28255%2C46%2C151%2C0.350%29%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%2222%22%20y%3D%2222%22%20width%3D%22676%22%20height%3D%22360%22%20rx%3D%2216%22%20fill%3D%22%23050510%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%2222%22%20y%3D%2222%22%20width%3D%22676%22%20height%3D%22360%22%20rx%3D%2216%22%20fill%3D%22url%28%23beam%29%22%20opacity%3D%220.55%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%2270%22%20y%3D%2290%22%20width%3D%22220%22%20height%3D%2218%22%20rx%3D%226%22%20fill%3D%22rgba%28255%2C46%2C151%2C0.850%29%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%2270%22%20y%3D%22130%22%20width%3D%22380%22%20height%3D%2212%22%20rx%3D%224%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.350%29%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%2270%22%20y%3D%22158%22%20width%3D%22320%22%20height%3D%2212%22%20rx%3D%224%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.220%29%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%2270%22%20y%3D%22210%22%20width%3D%22200%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22rgba%280%2C229%2C255%2C0.280%29%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%22290%22%20y%3D%22210%22%20width%3D%22200%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22rgba%28255%2C46%2C151%2C0.220%29%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%22510%22%20y%3D%22210%22%20width%3D%22140%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.080%29%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%22280%22%20y%3D%22400%22%20width%3D%22160%22%20height%3D%2210%22%20rx%3D%225%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.180%29%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Crect%20width%3D%221600%22%20height%3D%22900%22%20fill%3D%22url%28%23vig%29%22%2F%3E%0A%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E",imageAlt:"Neon District craft visual"},{layout:"feature-grid",eyebrow:"Layers",heading:"Three rails under the neon",columns:"bento",cards:[{icon:"fa-solid fa-location-dot",title:"Venue mesh",body:"Live capacity, door status, and VIP flow across every partner club."},{icon:"fa-solid fa-ticket",title:"Ticket pulse",body:"Fraud-resistant tickets with instant secondary market controls."},{icon:"fa-solid fa-wave-square",title:"Night ops",body:"Security, bar, and talent in one ops board — latency under 80ms."},{icon:"fa-solid fa-layer-group",title:"Stack for scan",body:"Hierarchy first. Decoration second. Decoration never."},{icon:"fa-solid fa-bolt",title:"Ship the punchline",body:"Lead with the claim that survives the hallway test."}]},{layout:"comparison",eyebrow:"Migration",heading:"From radio to realtime.",leftLabel:"Legacy night",left:`Walkie-talkies.
Spreadsheets at the door.
No shared inventory.`,rightLabel:"Neon District",right:`One mesh.
One inventory.
One pulse for the whole district.`,emphasis:"right"},{layout:"two-column",eyebrow:"Ops",heading:"One pulse for the whole district.",body:"Security, bar, and talent share the same board. Capacity and VIP flow update under 80ms — so door decisions aren't radio folklore.",aside:"Pink signal for alerts. Cyan for telemetry. Hierarchy that holds under neon.",ratio:"2-1"},{layout:"stat-row",eyebrow:"Network",heading:"Live across three cities.",stats:[{value:"120+",label:"Partner venues"},{value:"2.4M",label:"Tickets / quarter"},{value:"47ms",label:"p95 ops latency"}]},{layout:"quote",quote:"Opening night felt like a control tower — in a good way.",by:"Rico Alvarez · GM · Club Meridian"},{layout:"closing",eyebrow:"Drop",heading:"Plug into the district.",lead:"Venue onboarding in under a week. Operators and promoters welcome.",cta:{label:"Request access",href:"#"}}],r5={type:e5,meta:t5,slides:n5},a5="deck",o5={title:"Bounce — Product Launch",company:"Bounce",description:"Gen-Z social app launch deck.",theme:"genz-bento"},i5=[{layout:"title",eyebrow:"Gen-Z only · Anti-algorithm · Free",heading:"A social app that doesn't make you feel bad.",lead:"Intentional design. Real friends. No performance metrics."},{layout:"image-hero",eyebrow:"Gen-Z only · Anti-algorithm · Free",heading:"A social app that doesn't make you feel bad.",lead:"Intentional design. Real friends. No performance metrics.",image:"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201600%20900%22%20width%3D%221600%22%20height%3D%22900%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%3Cfilter%20id%3D%22grain%22%20x%3D%22-20%25%22%20y%3D%22-20%25%22%20width%3D%22140%25%22%20height%3D%22140%25%22%3E%0A%20%20%20%20%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.85%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%20result%3D%22n%22%2F%3E%0A%20%20%20%20%3CfeColorMatrix%20type%3D%22matrix%22%20values%3D%220%200%200%200%201%20%200%200%200%200%201%20%200%200%200%200%201%20%200%200%200%200.18%200%22%20in%3D%22n%22%20result%3D%22g%22%2F%3E%0A%20%20%20%20%3CfeBlend%20in%3D%22SourceGraphic%22%20in2%3D%22g%22%20mode%3D%22soft-light%22%2F%3E%0A%20%20%3C%2Ffilter%3E%0A%20%20%3Cfilter%20id%3D%22soft%22%20x%3D%22-30%25%22%20y%3D%22-30%25%22%20width%3D%22160%25%22%20height%3D%22160%25%22%3E%0A%20%20%20%20%3CfeGaussianBlur%20stdDeviation%3D%2228%22%2F%3E%0A%20%20%3C%2Ffilter%3E%0A%20%20%3Cfilter%20id%3D%22soft2%22%20x%3D%22-30%25%22%20y%3D%22-30%25%22%20width%3D%22160%25%22%20height%3D%22160%25%22%3E%0A%20%20%20%20%3CfeGaussianBlur%20stdDeviation%3D%2248%22%2F%3E%0A%20%20%3C%2Ffilter%3E%0A%20%20%3CradialGradient%20id%3D%22vig%22%20cx%3D%2250%25%22%20cy%3D%2245%25%22%20r%3D%2270%25%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23fff3ea%22%20stop-opacity%3D%220%22%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%2270%25%22%20stop-color%3D%22%23fff9f5%22%20stop-opacity%3D%220.15%22%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23000%22%20stop-opacity%3D%220.55%22%2F%3E%0A%20%20%3C%2FradialGradient%3E%0A%20%20%3ClinearGradient%20id%3D%22floor%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22rgba%28255%2C77%2C46%2C0.000%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22rgba%28255%2C77%2C46%2C0.280%29%22%20%2F%3E%0A%20%20%3C%2FlinearGradient%3E%0A%20%20%3ClinearGradient%20id%3D%22beam%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22rgba%28182%2C245%2C66%2C0.550%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%2245%25%22%20stop-color%3D%22rgba%28255%2C77%2C46%2C0.180%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22rgba%28255%2C243%2C234%2C0.000%29%22%20%2F%3E%0A%20%20%3C%2FlinearGradient%3E%0A%20%20%3CradialGradient%20id%3D%22orb1%22%20cx%3D%2235%25%22%20cy%3D%2230%25%22%20r%3D%2245%25%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22rgba%28255%2C77%2C46%2C0.750%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%2255%25%22%20stop-color%3D%22rgba%28255%2C77%2C46%2C0.180%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22rgba%28255%2C77%2C46%2C0.000%29%22%20%2F%3E%0A%20%20%3C%2FradialGradient%3E%0A%20%20%3CradialGradient%20id%3D%22orb2%22%20cx%3D%2272%25%22%20cy%3D%2258%25%22%20r%3D%2240%25%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22rgba%28182%2C245%2C66%2C0.650%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%2260%25%22%20stop-color%3D%22rgba%28182%2C245%2C66%2C0.160%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22rgba%28182%2C245%2C66%2C0.000%29%22%20%2F%3E%0A%20%20%3C%2FradialGradient%3E%0A%20%20%3CradialGradient%20id%3D%22bokeh%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220.55%22%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%2240%25%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220.12%22%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%2F%3E%0A%20%20%3C%2FradialGradient%3E%0A%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Cg%20filter%3D%22url%28%23grain%29%22%3E%0A%0A%20%20%3Crect%20width%3D%221600%22%20height%3D%22900%22%20fill%3D%22%23fff9f5%22%2F%3E%0A%20%20%3Cellipse%20cx%3D%22300%22%20cy%3D%22700%22%20rx%3D%22520%22%20ry%3D%22360%22%20fill%3D%22rgba%28255%2C77%2C46%2C0.220%29%22%20filter%3D%22url%28%23soft2%29%22%2F%3E%0A%20%20%3Cellipse%20cx%3D%221300%22%20cy%3D%22160%22%20rx%3D%22420%22%20ry%3D%22300%22%20fill%3D%22rgba%28182%2C245%2C66%2C0.280%29%22%20filter%3D%22url%28%23soft2%29%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M180%20780%20C260%20520%20420%20420%20520%20280%20C560%20360%20620%20460%20640%20620%20C480%20640%20300%20700%20180%20780%20Z%22%20fill%3D%22rgba%28255%2C77%2C46%2C0.450%29%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M1180%20120%20C1280%20180%201380%20260%201460%20380%20C1340%20360%201240%20300%201180%20120%20Z%22%20fill%3D%22rgba%28182%2C245%2C66%2C0.400%29%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M980%20700%20C1080%20560%201220%20500%201360%20420%20C1380%20540%201320%20660%201220%20760%20Z%22%20fill%3D%22rgba%28255%2C77%2C46%2C0.250%29%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22860%22%20cy%3D%22240%22%20r%3D%2290%22%20fill%3D%22rgba%28182%2C245%2C66%2C0.200%29%22%20filter%3D%22url%28%23soft%29%22%2F%3E%0A%20%20%3Crect%20x%3D%22640%22%20y%3D%22360%22%20width%3D%22360%22%20height%3D%22220%22%20rx%3D%2218%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.080%29%22%20stroke%3D%22rgba%28255%2C77%2C46%2C0.250%29%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Crect%20x%3D%22680%22%20y%3D%22420%22%20width%3D%22200%22%20height%3D%2214%22%20rx%3D%225%22%20fill%3D%22rgba%28255%2C77%2C46%2C0.700%29%22%2F%3E%0A%20%20%3Crect%20x%3D%22680%22%20y%3D%22455%22%20width%3D%22260%22%20height%3D%2210%22%20rx%3D%224%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.280%29%22%2F%3E%0A%20%20%3Crect%20width%3D%221600%22%20height%3D%22900%22%20fill%3D%22url%28%23vig%29%22%2F%3E%0A%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E",imageAlt:"Bounce craft visual"},{layout:"feature-grid",eyebrow:"The problem",heading:"Social media is broken.",columns:"bento",cards:[{icon:"fa-solid fa-heart-crack",title:"Comparison trap",body:"73% of Gen-Z feel worse after 30 minutes on Instagram — the feed is a scoreboard, not a living room."},{icon:"fa-solid fa-robot",title:"Algorithm hijacking",body:"You don't see friends — you see what maximizes outrage and envy."},{icon:"fa-solid fa-eye",title:"Public scoreboards",body:"Follower counts and likes turn every post into a performance."},{icon:"fa-solid fa-clock",title:"Infinite scroll",body:"Dwell time is the product. Your evening is the inventory."},{icon:"fa-solid fa-user-slash",title:"Stranger theater",body:"Creators you don't know crowd out people you do."}]},{layout:"comparison",eyebrow:"The Bounce difference",heading:"Rebuilt from zero",leftLabel:"Legacy feeds",left:`Public metrics.
Stranger algorithms.
Ads optimized for dwell time.
Anxiety by design.`,rightLabel:"Bounce",right:`No follower counts.
Friends only, chronological.
Zero ads.
Reactions over performance.`,emphasis:"right"},{layout:"stat-row",eyebrow:"Early signals",heading:"Off the charts — zero paid acquisition",stats:[{value:"240k",label:"Waitlist"},{value:"4.8★",label:"Beta App Store"},{value:"68%",label:"D7 retention"},{value:"0$",label:"Paid ads spent"}]},{layout:"quote",quote:"I open Bounce when I want to feel closer to people — not worse about myself.",by:"Beta user, age 19"},{layout:"timeline",eyebrow:"How it works",heading:"Three moves. That's it.",steps:[{title:"See",body:"Open a chronological feed of real friends only — no strangers, no ads."},{title:"Share",body:"Drop a photo, voice note, or vibe. No editing theater."},{title:"React",body:"Honest reactions. Instant. No public scoreboard."}]},{layout:"feature-grid",eyebrow:"Pricing",heading:"Simple. No dark patterns.",columns:"bento",cards:[{title:"Free",body:"$0 forever — core feed, friends, reactions."},{title:"Plus",body:"$4/mo — themes, longer voice notes, custom reacts."},{title:"Crew",body:"$9/mo — shared spaces for friend groups up to 12."},{icon:"fa-solid fa-eye",title:"Show, don't pad",body:"Asymmetry beats another identical third column."},{icon:"fa-solid fa-compass",title:"Clear north star",body:"One decisive story beat — not a wall of equal tiles."}]},{layout:"section",number:"↓",eyebrow:"Get Bounce",heading:"Get your feed back.",lead:"Free on iOS & Android. No ads. No algorithm. Just friends."},{layout:"closing",eyebrow:"Be one of the first",heading:"Built by Gen-Z for Gen-Z.",lead:"Free forever · No credit card · No ads · No BS",cta:{label:"Download Bounce",href:"https://bounce.example"}}],s5={type:a5,meta:o5,slides:i5},l5="deck",c5={title:"NovaSpark AI — Series A",company:"NovaSpark AI",description:"Series A pitch — AI inference infrastructure.",theme:"aurora-glass"},d5=[{layout:"title",eyebrow:"Series A · YC W24",heading:"AI doesn't need more compute.",lead:"It needs infrastructure that delivers it."},{layout:"image-hero",eyebrow:"Series A · YC W24",heading:"AI doesn't need more compute.",lead:"It needs infrastructure that delivers it.",image:"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201600%20900%22%20width%3D%221600%22%20height%3D%22900%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%3Cfilter%20id%3D%22grain%22%20x%3D%22-20%25%22%20y%3D%22-20%25%22%20width%3D%22140%25%22%20height%3D%22140%25%22%3E%0A%20%20%20%20%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.85%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%20result%3D%22n%22%2F%3E%0A%20%20%20%20%3CfeColorMatrix%20type%3D%22matrix%22%20values%3D%220%200%200%200%201%20%200%200%200%200%201%20%200%200%200%200%201%20%200%200%200%200.18%200%22%20in%3D%22n%22%20result%3D%22g%22%2F%3E%0A%20%20%20%20%3CfeBlend%20in%3D%22SourceGraphic%22%20in2%3D%22g%22%20mode%3D%22soft-light%22%2F%3E%0A%20%20%3C%2Ffilter%3E%0A%20%20%3Cfilter%20id%3D%22soft%22%20x%3D%22-30%25%22%20y%3D%22-30%25%22%20width%3D%22160%25%22%20height%3D%22160%25%22%3E%0A%20%20%20%20%3CfeGaussianBlur%20stdDeviation%3D%2228%22%2F%3E%0A%20%20%3C%2Ffilter%3E%0A%20%20%3Cfilter%20id%3D%22soft2%22%20x%3D%22-30%25%22%20y%3D%22-30%25%22%20width%3D%22160%25%22%20height%3D%22160%25%22%3E%0A%20%20%20%20%3CfeGaussianBlur%20stdDeviation%3D%2248%22%2F%3E%0A%20%20%3C%2Ffilter%3E%0A%20%20%3CradialGradient%20id%3D%22vig%22%20cx%3D%2250%25%22%20cy%3D%2245%25%22%20r%3D%2270%25%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230a0612%22%20stop-opacity%3D%220%22%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%2270%25%22%20stop-color%3D%22%23000000%22%20stop-opacity%3D%220.15%22%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23000%22%20stop-opacity%3D%220.55%22%2F%3E%0A%20%20%3C%2FradialGradient%3E%0A%20%20%3ClinearGradient%20id%3D%22floor%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22rgba%28167%2C139%2C250%2C0.000%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22rgba%28167%2C139%2C250%2C0.280%29%22%20%2F%3E%0A%20%20%3C%2FlinearGradient%3E%0A%20%20%3ClinearGradient%20id%3D%22beam%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22rgba%28103%2C232%2C249%2C0.550%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%2245%25%22%20stop-color%3D%22rgba%28167%2C139%2C250%2C0.180%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22rgba%2810%2C6%2C18%2C0.000%29%22%20%2F%3E%0A%20%20%3C%2FlinearGradient%3E%0A%20%20%3CradialGradient%20id%3D%22orb1%22%20cx%3D%2235%25%22%20cy%3D%2230%25%22%20r%3D%2245%25%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22rgba%28167%2C139%2C250%2C0.750%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%2255%25%22%20stop-color%3D%22rgba%28167%2C139%2C250%2C0.180%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22rgba%28167%2C139%2C250%2C0.000%29%22%20%2F%3E%0A%20%20%3C%2FradialGradient%3E%0A%20%20%3CradialGradient%20id%3D%22orb2%22%20cx%3D%2272%25%22%20cy%3D%2258%25%22%20r%3D%2240%25%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22rgba%28103%2C232%2C249%2C0.650%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%2260%25%22%20stop-color%3D%22rgba%28103%2C232%2C249%2C0.160%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22rgba%28103%2C232%2C249%2C0.000%29%22%20%2F%3E%0A%20%20%3C%2FradialGradient%3E%0A%20%20%3CradialGradient%20id%3D%22bokeh%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220.55%22%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%2240%25%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220.12%22%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%2F%3E%0A%20%20%3C%2FradialGradient%3E%0A%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Cg%20filter%3D%22url%28%23grain%29%22%3E%0A%0A%20%20%3Crect%20width%3D%221600%22%20height%3D%22900%22%20fill%3D%22%23000000%22%2F%3E%0A%20%20%3Crect%20width%3D%221600%22%20height%3D%22900%22%20fill%3D%22url%28%23beam%29%22%20opacity%3D%220.9%22%2F%3E%0A%20%20%3Cellipse%20cx%3D%22420%22%20cy%3D%22280%22%20rx%3D%22520%22%20ry%3D%22340%22%20fill%3D%22url%28%23orb1%29%22%20filter%3D%22url%28%23soft2%29%22%2F%3E%0A%20%20%3Cellipse%20cx%3D%221180%22%20cy%3D%22620%22%20rx%3D%22480%22%20ry%3D%22300%22%20fill%3D%22url%28%23orb2%29%22%20filter%3D%22url%28%23soft2%29%22%2F%3E%0A%20%20%3Cellipse%20cx%3D%22880%22%20cy%3D%22220%22%20rx%3D%22220%22%20ry%3D%22140%22%20fill%3D%22rgba%28103%2C232%2C249%2C0.220%29%22%20filter%3D%22url%28%23soft%29%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M0%20640%20C320%20520%20640%20780%20960%20600%20S1400%20480%201600%20560%20L1600%20900%20L0%20900%20Z%22%20fill%3D%22rgba%28167%2C139%2C250%2C0.120%29%22%2F%3E%0A%20%20%3Cg%20opacity%3D%220.55%22%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22260%22%20cy%3D%22180%22%20r%3D%2218%22%20fill%3D%22url%28%23bokeh%29%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22520%22%20cy%3D%22140%22%20r%3D%2210%22%20fill%3D%22url%28%23bokeh%29%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22980%22%20cy%3D%22210%22%20r%3D%2214%22%20fill%3D%22url%28%23bokeh%29%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%221320%22%20cy%3D%22320%22%20r%3D%2222%22%20fill%3D%22url%28%23bokeh%29%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%221100%22%20cy%3D%22120%22%20r%3D%228%22%20fill%3D%22url%28%23bokeh%29%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Crect%20width%3D%221600%22%20height%3D%22900%22%20fill%3D%22url%28%23vig%29%22%2F%3E%0A%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E",imageAlt:"NovaSpark AI craft visual"},{layout:"quote",quote:"Every frontier model today is bottlenecked not by algorithms, but by the infrastructure that delivers them.",by:"Dr. Maya Reeves, Co-Founder & CEO"},{layout:"feature-grid",eyebrow:"The Problem",heading:"Three bottlenecks every AI deployment hits",columns:"bento",cards:[{icon:"fa-solid fa-route",title:"Routing chaos",body:"Teams juggle 12 providers with brittle failover and unpredictable latency."},{icon:"fa-solid fa-globe",title:"Edge distance",body:"Users wait on distant regions — p95 climbs past 800ms outside the US."},{icon:"fa-solid fa-receipt",title:"Cost blindness",body:"Spend spikes without quality signal. Finance finds out after the invoice."},{icon:"fa-solid fa-scissors",title:"Cut the filler",body:"If a card doesn't change the decision, it doesn't earn the pixel."},{icon:"fa-solid fa-layer-group",title:"Stack for scan",body:"Hierarchy first. Decoration second. Decoration never."}]},{layout:"feature-grid",eyebrow:"The Solution",heading:"One unified inference layer",columns:3,cards:[{icon:"fa-solid fa-shuffle",title:"Smart routing",body:"Real-time selection across 12 providers — fastest, cheapest path per request."},{icon:"fa-solid fa-server",title:"Global edge",body:"50+ nodes. Sub-200ms for 95% of the world's population."},{icon:"fa-solid fa-chart-line",title:"Live cost & quality",body:"Dashboards, latency histograms, quality scoring — before the bill."}]},{layout:"comparison",eyebrow:"Migration",heading:"Drop in. Route smarter.",leftLabel:"Before",left:`Direct OpenAI / Anthropic / custom clients.
Manual failover.
No shared observability.`,rightLabel:"With NovaSpark",right:`Same OpenAI-compatible API.
Automatic routing + failover.
One pane for cost, latency, quality.`,emphasis:"right"},{layout:"two-column",eyebrow:"Why now",heading:"Inference is the new cloud spend line.",body:"Every frontier team is bottlenecked on delivery, not algorithms. NovaSpark turns multi-provider chaos into one contract — with latency and cost visible before the invoice.",aside:"Sub-200ms for 95% of the world's population. One pane for quality.",ratio:"2-1"},{layout:"stat-row",eyebrow:"Traction",heading:"18 months. Zero paid acquisition.",stats:[{value:"$2.1M",label:"ARR"},{value:"412",label:"Enterprise customers"},{value:"99.97%",label:"Uptime SLA"},{value:"847ms",label:"Avg response (global)"}]},{layout:"data-table",eyebrow:"Market",heading:"A category being created now",columns:["Segment","2026E"],rows:[["AI API Orchestration","$18.2B"],["Edge AI Serving","$9.4B"],["Inference Observability","$3.1B"]]},{layout:"timeline",eyebrow:"Roadmap",heading:"18 months to Series B readiness",steps:[{title:"Now",body:"Core platform + enterprise SSO."},{title:"Q+2",body:"Partnerships with AWS / GCP marketplace."},{title:"Q+4",body:"Team 2× · $8M ARR target."},{title:"Series B",body:"Category leadership narrative locked."}]},{layout:"section",number:"01",eyebrow:"The Ask",heading:"$14M Series A",lead:"Lead $8M · Co-investors filling $6M · 18 months runway to $8M ARR."},{layout:"closing",eyebrow:"The Opportunity",heading:"AI deserves better plumbing.",lead:"investors@novaspark.ai · novaspark.ai",cta:{label:"Book a meeting",href:"https://novaspark.ai"}}],u5={type:l5,meta:c5,slides:d5},p5="deck",f5={title:"Northline — Strategy Briefing",company:"Northline",description:"Long-form strategy briefing — signal theme multi-slide proof.",theme:"signal"},g5=[{layout:"title",eyebrow:"Board briefing · Q3",heading:"Where we double down. Where we walk away.",lead:"A single narrative for capital allocation — not a slide dump of initiatives."},{layout:"image-hero",eyebrow:"Board briefing · Q3",heading:"Where we double down. Where we walk away.",lead:"A single narrative for capital allocation — not a slide dump of initiatives.",image:"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201600%20900%22%20width%3D%221600%22%20height%3D%22900%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%3Cfilter%20id%3D%22grain%22%20x%3D%22-20%25%22%20y%3D%22-20%25%22%20width%3D%22140%25%22%20height%3D%22140%25%22%3E%0A%20%20%20%20%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.85%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%20result%3D%22n%22%2F%3E%0A%20%20%20%20%3CfeColorMatrix%20type%3D%22matrix%22%20values%3D%220%200%200%200%201%20%200%200%200%200%201%20%200%200%200%200%201%20%200%200%200%200.18%200%22%20in%3D%22n%22%20result%3D%22g%22%2F%3E%0A%20%20%20%20%3CfeBlend%20in%3D%22SourceGraphic%22%20in2%3D%22g%22%20mode%3D%22soft-light%22%2F%3E%0A%20%20%3C%2Ffilter%3E%0A%20%20%3Cfilter%20id%3D%22soft%22%20x%3D%22-30%25%22%20y%3D%22-30%25%22%20width%3D%22160%25%22%20height%3D%22160%25%22%3E%0A%20%20%20%20%3CfeGaussianBlur%20stdDeviation%3D%2228%22%2F%3E%0A%20%20%3C%2Ffilter%3E%0A%20%20%3Cfilter%20id%3D%22soft2%22%20x%3D%22-30%25%22%20y%3D%22-30%25%22%20width%3D%22160%25%22%20height%3D%22160%25%22%3E%0A%20%20%20%20%3CfeGaussianBlur%20stdDeviation%3D%2248%22%2F%3E%0A%20%20%3C%2Ffilter%3E%0A%20%20%3CradialGradient%20id%3D%22vig%22%20cx%3D%2250%25%22%20cy%3D%2245%25%22%20r%3D%2270%25%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23E6E0D4%22%20stop-opacity%3D%220%22%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%2270%25%22%20stop-color%3D%22%23F0ECE3%22%20stop-opacity%3D%220.15%22%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23000%22%20stop-opacity%3D%220.55%22%2F%3E%0A%20%20%3C%2FradialGradient%3E%0A%20%20%3ClinearGradient%20id%3D%22floor%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22rgba%28200%2C168%2C112%2C0.000%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22rgba%28200%2C168%2C112%2C0.280%29%22%20%2F%3E%0A%20%20%3C%2FlinearGradient%3E%0A%20%20%3ClinearGradient%20id%3D%22beam%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22rgba%2828%2C38%2C68%2C0.550%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%2245%25%22%20stop-color%3D%22rgba%28200%2C168%2C112%2C0.180%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22rgba%28230%2C224%2C212%2C0.000%29%22%20%2F%3E%0A%20%20%3C%2FlinearGradient%3E%0A%20%20%3CradialGradient%20id%3D%22orb1%22%20cx%3D%2235%25%22%20cy%3D%2230%25%22%20r%3D%2245%25%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22rgba%28200%2C168%2C112%2C0.750%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%2255%25%22%20stop-color%3D%22rgba%28200%2C168%2C112%2C0.180%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22rgba%28200%2C168%2C112%2C0.000%29%22%20%2F%3E%0A%20%20%3C%2FradialGradient%3E%0A%20%20%3CradialGradient%20id%3D%22orb2%22%20cx%3D%2272%25%22%20cy%3D%2258%25%22%20r%3D%2240%25%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22rgba%2828%2C38%2C68%2C0.650%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%2260%25%22%20stop-color%3D%22rgba%2828%2C38%2C68%2C0.160%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22rgba%2828%2C38%2C68%2C0.000%29%22%20%2F%3E%0A%20%20%3C%2FradialGradient%3E%0A%20%20%3CradialGradient%20id%3D%22bokeh%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220.55%22%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%2240%25%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220.12%22%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%2F%3E%0A%20%20%3C%2FradialGradient%3E%0A%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Cg%20filter%3D%22url%28%23grain%29%22%3E%0A%0A%20%20%3Crect%20width%3D%221600%22%20height%3D%22900%22%20fill%3D%22%23F0ECE3%22%2F%3E%0A%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%221600%22%20height%3D%22900%22%20fill%3D%22rgba%28200%2C168%2C112%2C0.080%29%22%2F%3E%0A%20%20%3Crect%20x%3D%22120%22%20y%3D%22110%22%20width%3D%22880%22%20height%3D%22680%22%20fill%3D%22%23E6E0D4%22%20stroke%3D%22rgba%28200%2C168%2C112%2C0.250%29%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Crect%20x%3D%22160%22%20y%3D%22150%22%20width%3D%22800%22%20height%3D%22420%22%20fill%3D%22rgba%2828%2C38%2C68%2C0.180%29%22%2F%3E%0A%20%20%3Crect%20x%3D%22160%22%20y%3D%22150%22%20width%3D%22800%22%20height%3D%22420%22%20fill%3D%22url%28%23orb1%29%22%20opacity%3D%220.55%22%2F%3E%0A%20%20%3Crect%20x%3D%22200%22%20y%3D%22600%22%20width%3D%22280%22%20height%3D%2222%22%20fill%3D%22%23C8A870%22%2F%3E%0A%20%20%3Crect%20x%3D%22200%22%20y%3D%22640%22%20width%3D%22520%22%20height%3D%2212%22%20fill%3D%22rgba%280%2C0%2C0%2C0.350%29%22%2F%3E%0A%20%20%3Crect%20x%3D%22200%22%20y%3D%22670%22%20width%3D%22440%22%20height%3D%2212%22%20fill%3D%22rgba%280%2C0%2C0%2C0.200%29%22%2F%3E%0A%20%20%3Crect%20x%3D%221080%22%20y%3D%22160%22%20width%3D%22380%22%20height%3D%22520%22%20fill%3D%22rgba%28200%2C168%2C112%2C0.150%29%22%20stroke%3D%22rgba%2828%2C38%2C68%2C0.300%29%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Crect%20x%3D%221120%22%20y%3D%22210%22%20width%3D%22300%22%20height%3D%2214%22%20fill%3D%22rgba%2828%2C38%2C68%2C0.700%29%22%2F%3E%0A%20%20%3Crect%20x%3D%221120%22%20y%3D%22250%22%20width%3D%22260%22%20height%3D%2210%22%20fill%3D%22rgba%280%2C0%2C0%2C0.280%29%22%2F%3E%0A%20%20%3Crect%20x%3D%221120%22%20y%3D%22280%22%20width%3D%22220%22%20height%3D%2210%22%20fill%3D%22rgba%280%2C0%2C0%2C0.180%29%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%221270%22%20cy%3D%22460%22%20r%3D%2290%22%20fill%3D%22rgba%2828%2C38%2C68%2C0.250%29%22%20filter%3D%22url%28%23soft%29%22%2F%3E%0A%20%20%3Crect%20width%3D%221600%22%20height%3D%22900%22%20fill%3D%22url%28%23vig%29%22%20opacity%3D%220.55%22%2F%3E%0A%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E",imageAlt:"Northline craft visual"},{layout:"section",number:"01",heading:"The operating thesis",lead:"Fewer bets. Sharper edges. Measurable kill criteria."},{layout:"two-column",eyebrow:"Focus",heading:"Three bets that earn the right to grow",body:"Enterprise core: Defend the $84M ARR franchise — expand seats, not SKUs. Adjacent wedge — Compliance workflow — $12M ARR path with existing buyers.",aside:"Consumer app, marketplace, and hardware R&D stay parked.",ratio:"3-2"},{layout:"data-table",eyebrow:"Allocation",heading:"Next four quarters of spend",columns:["Bet","OpEx","Headcount","Kill criteria"],rows:[["Enterprise core","$28M","+18","NRR < 110%"],["Compliance wedge","$9M","+22","<40 logos by Q2"],["Platform debt","$6M","+8","p95 > 400ms"]]},{layout:"comparison",eyebrow:"Decision",heading:"Continue vs. cut — same facts.",leftLabel:"Continue",left:`NRR ≥ 118%.
Pipeline coverage ≥ 3.2×.
Support CSAT ≥ 4.6.`,rightLabel:"Cut / reallocate",right:`Any KPI miss for two quarters.
Or a competitor closes the wedge first.`,emphasis:"left"},{layout:"closing",eyebrow:"Ask",heading:"Approve the thesis. Hold us to the kill criteria.",lead:"Next review: first Monday after quarter close.",cta:{label:"Open the memo",href:"#"}}],h5={type:p5,meta:f5,slides:g5},m5="deck",b5={title:"BubbleFlow — Launch",company:"BubbleFlow",description:"Y2K aero consumer launch — y2k-aero multi-slide proof.",theme:"y2k-aero"},y5=[{layout:"title",eyebrow:"Launch · Aqua",heading:"Icy UI. Lime pops.",lead:"Sky bubbles. Nunito softness. Y2K energy without the clipart."},{layout:"image-hero",eyebrow:"Launch · Aqua",heading:"Icy UI. Lime pops.",lead:"Sky bubbles. Nunito softness. Y2K energy without the clipart.",image:"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201600%20900%22%20width%3D%221600%22%20height%3D%22900%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%3Cfilter%20id%3D%22grain%22%20x%3D%22-20%25%22%20y%3D%22-20%25%22%20width%3D%22140%25%22%20height%3D%22140%25%22%3E%0A%20%20%20%20%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.85%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%20result%3D%22n%22%2F%3E%0A%20%20%20%20%3CfeColorMatrix%20type%3D%22matrix%22%20values%3D%220%200%200%200%201%20%200%200%200%200%201%20%200%200%200%200%201%20%200%200%200%200.18%200%22%20in%3D%22n%22%20result%3D%22g%22%2F%3E%0A%20%20%20%20%3CfeBlend%20in%3D%22SourceGraphic%22%20in2%3D%22g%22%20mode%3D%22soft-light%22%2F%3E%0A%20%20%3C%2Ffilter%3E%0A%20%20%3Cfilter%20id%3D%22soft%22%20x%3D%22-30%25%22%20y%3D%22-30%25%22%20width%3D%22160%25%22%20height%3D%22160%25%22%3E%0A%20%20%20%20%3CfeGaussianBlur%20stdDeviation%3D%2228%22%2F%3E%0A%20%20%3C%2Ffilter%3E%0A%20%20%3Cfilter%20id%3D%22soft2%22%20x%3D%22-30%25%22%20y%3D%22-30%25%22%20width%3D%22160%25%22%20height%3D%22160%25%22%3E%0A%20%20%20%20%3CfeGaussianBlur%20stdDeviation%3D%2248%22%2F%3E%0A%20%20%3C%2Ffilter%3E%0A%20%20%3CradialGradient%20id%3D%22vig%22%20cx%3D%2250%25%22%20cy%3D%2245%25%22%20r%3D%2270%25%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23bae6fd%22%20stop-opacity%3D%220%22%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%2270%25%22%20stop-color%3D%22%23e0f7ff%22%20stop-opacity%3D%220.15%22%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23000%22%20stop-opacity%3D%220.55%22%2F%3E%0A%20%20%3C%2FradialGradient%3E%0A%20%20%3ClinearGradient%20id%3D%22floor%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22rgba%2856%2C189%2C248%2C0.000%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22rgba%2856%2C189%2C248%2C0.280%29%22%20%2F%3E%0A%20%20%3C%2FlinearGradient%3E%0A%20%20%3ClinearGradient%20id%3D%22beam%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22rgba%28163%2C230%2C53%2C0.550%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%2245%25%22%20stop-color%3D%22rgba%2856%2C189%2C248%2C0.180%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22rgba%28186%2C230%2C253%2C0.000%29%22%20%2F%3E%0A%20%20%3C%2FlinearGradient%3E%0A%20%20%3CradialGradient%20id%3D%22orb1%22%20cx%3D%2235%25%22%20cy%3D%2230%25%22%20r%3D%2245%25%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22rgba%2856%2C189%2C248%2C0.750%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%2255%25%22%20stop-color%3D%22rgba%2856%2C189%2C248%2C0.180%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22rgba%2856%2C189%2C248%2C0.000%29%22%20%2F%3E%0A%20%20%3C%2FradialGradient%3E%0A%20%20%3CradialGradient%20id%3D%22orb2%22%20cx%3D%2272%25%22%20cy%3D%2258%25%22%20r%3D%2240%25%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22rgba%28163%2C230%2C53%2C0.650%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%2260%25%22%20stop-color%3D%22rgba%28163%2C230%2C53%2C0.160%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22rgba%28163%2C230%2C53%2C0.000%29%22%20%2F%3E%0A%20%20%3C%2FradialGradient%3E%0A%20%20%3CradialGradient%20id%3D%22bokeh%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220.55%22%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%2240%25%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220.12%22%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%2F%3E%0A%20%20%3C%2FradialGradient%3E%0A%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Cg%20filter%3D%22url%28%23grain%29%22%3E%0A%0A%20%20%3Crect%20width%3D%221600%22%20height%3D%22900%22%20fill%3D%22%23e0f7ff%22%2F%3E%0A%20%20%3Crect%20width%3D%221600%22%20height%3D%22900%22%20fill%3D%22url%28%23beam%29%22%20opacity%3D%220.65%22%2F%3E%0A%20%20%3Cellipse%20cx%3D%22800%22%20cy%3D%22420%22%20rx%3D%22640%22%20ry%3D%22220%22%20fill%3D%22rgba%2856%2C189%2C248%2C0.180%29%22%20filter%3D%22url%28%23soft2%29%22%2F%3E%0A%20%20%3C%21--%20neon%20tunnel%20rings%20--%3E%0A%20%20%3Cg%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%3E%0A%20%20%20%20%3Cellipse%20cx%3D%22800%22%20cy%3D%22450%22%20rx%3D%22520%22%20ry%3D%22210%22%20stroke%3D%22rgba%2856%2C189%2C248%2C0.350%29%22%20stroke-width%3D%223%22%2F%3E%0A%20%20%20%20%3Cellipse%20cx%3D%22800%22%20cy%3D%22450%22%20rx%3D%22400%22%20ry%3D%22160%22%20stroke%3D%22rgba%28163%2C230%2C53%2C0.450%29%22%20stroke-width%3D%222.5%22%2F%3E%0A%20%20%20%20%3Cellipse%20cx%3D%22800%22%20cy%3D%22450%22%20rx%3D%22280%22%20ry%3D%22110%22%20stroke%3D%22rgba%2856%2C189%2C248%2C0.550%29%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%20%20%3Cellipse%20cx%3D%22800%22%20cy%3D%22450%22%20rx%3D%22160%22%20ry%3D%2262%22%20stroke%3D%22rgba%28163%2C230%2C53%2C0.700%29%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Crect%20x%3D%22470%22%20y%3D%22300%22%20width%3D%22660%22%20height%3D%22300%22%20rx%3D%2222%22%20fill%3D%22rgba%28186%2C230%2C253%2C0.720%29%22%20stroke%3D%22rgba%2856%2C189%2C248%2C0.400%29%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Crect%20x%3D%22510%22%20y%3D%22350%22%20width%3D%22240%22%20height%3D%2216%22%20rx%3D%226%22%20fill%3D%22rgba%2856%2C189%2C248%2C0.900%29%22%2F%3E%0A%20%20%3Crect%20x%3D%22510%22%20y%3D%22390%22%20width%3D%22420%22%20height%3D%2211%22%20rx%3D%224%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.320%29%22%2F%3E%0A%20%20%3Crect%20x%3D%22510%22%20y%3D%22420%22%20width%3D%22360%22%20height%3D%2211%22%20rx%3D%224%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.180%29%22%2F%3E%0A%20%20%3Crect%20x%3D%22510%22%20y%3D%22470%22%20width%3D%22140%22%20height%3D%2270%22%20rx%3D%2212%22%20fill%3D%22rgba%28163%2C230%2C53%2C0.350%29%22%2F%3E%0A%20%20%3Crect%20x%3D%22670%22%20y%3D%22470%22%20width%3D%22140%22%20height%3D%2270%22%20rx%3D%2212%22%20fill%3D%22rgba%2856%2C189%2C248%2C0.280%29%22%2F%3E%0A%20%20%3Crect%20x%3D%22830%22%20y%3D%22470%22%20width%3D%22140%22%20height%3D%2270%22%20rx%3D%2212%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.080%29%22%2F%3E%0A%20%20%3Cg%20opacity%3D%220.5%22%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22240%22%20cy%3D%22180%22%20r%3D%2216%22%20fill%3D%22url%28%23bokeh%29%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%221360%22%20cy%3D%22220%22%20r%3D%2222%22%20fill%3D%22url%28%23bokeh%29%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%221480%22%20cy%3D%22680%22%20r%3D%2212%22%20fill%3D%22url%28%23bokeh%29%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Crect%20width%3D%221600%22%20height%3D%22900%22%20fill%3D%22url%28%23vig%29%22%2F%3E%0A%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E",imageAlt:"BubbleFlow craft visual"},{layout:"feature-grid",eyebrow:"Product",heading:"Flow in three bubbles",columns:"bento",cards:[{icon:"fa-solid fa-wand-magic-sparkles",title:"BubbleAssist",body:"Sketch to structured ideas in one tap."},{icon:"fa-solid fa-water",title:"Aqua boards",body:"Boards that feel like glass, not gray SaaS."},{icon:"fa-solid fa-share-nodes",title:"Share orbs",body:"Invite links that look like invitations."},{icon:"fa-solid fa-compass",title:"Clear north star",body:"One decisive story beat — not a wall of equal tiles."},{icon:"fa-solid fa-scissors",title:"Cut the filler",body:"If a card doesn't change the decision, it doesn't earn the pixel."}]},{layout:"stat-row",eyebrow:"Beta",heading:"Bubbles that retained.",stats:[{value:"55k",label:"Creators"},{value:"3.4×",label:"Ideas / week"},{value:"4.9★",label:"Delight score"}]},{layout:"comparison",eyebrow:"Feel",heading:"Gray tools vs. aero.",leftLabel:"Default SaaS",left:`Slate sidebars.
Inter everywhere.
Joy optional.`,rightLabel:"BubbleFlow",right:`Icy canvas.
Lime accents.
Joy built in.`,emphasis:"left"},{layout:"closing",eyebrow:"Splash",heading:"Start floating.",lead:"Free for individuals. Teams on Ridge pricing.",cta:{label:"Open BubbleFlow",href:"#"}}],v5={type:m5,meta:b5,slides:y5},x5="deck",k5={title:"Primary — Design Keynote",company:"Primary",description:"Design system keynote — bauhaus multi-slide proof.",theme:"bauhaus"},w5=[{layout:"title",eyebrow:"Keynote · Form",heading:"Primary colors. Primary rules.",lead:"Red, blue, yellow — geometry that scales without decoration."},{layout:"image-hero",eyebrow:"Keynote · Form",heading:"Primary colors. Primary rules.",lead:"Red, blue, yellow — geometry that scales without decoration.",image:"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201600%20900%22%20width%3D%221600%22%20height%3D%22900%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%3Cfilter%20id%3D%22grain%22%20x%3D%22-20%25%22%20y%3D%22-20%25%22%20width%3D%22140%25%22%20height%3D%22140%25%22%3E%0A%20%20%20%20%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.85%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%20result%3D%22n%22%2F%3E%0A%20%20%20%20%3CfeColorMatrix%20type%3D%22matrix%22%20values%3D%220%200%200%200%201%20%200%200%200%200%201%20%200%200%200%200%201%20%200%200%200%200.18%200%22%20in%3D%22n%22%20result%3D%22g%22%2F%3E%0A%20%20%20%20%3CfeBlend%20in%3D%22SourceGraphic%22%20in2%3D%22g%22%20mode%3D%22soft-light%22%2F%3E%0A%20%20%3C%2Ffilter%3E%0A%20%20%3Cfilter%20id%3D%22soft%22%20x%3D%22-30%25%22%20y%3D%22-30%25%22%20width%3D%22160%25%22%20height%3D%22160%25%22%3E%0A%20%20%20%20%3CfeGaussianBlur%20stdDeviation%3D%2228%22%2F%3E%0A%20%20%3C%2Ffilter%3E%0A%20%20%3Cfilter%20id%3D%22soft2%22%20x%3D%22-30%25%22%20y%3D%22-30%25%22%20width%3D%22160%25%22%20height%3D%22160%25%22%3E%0A%20%20%20%20%3CfeGaussianBlur%20stdDeviation%3D%2248%22%2F%3E%0A%20%20%3C%2Ffilter%3E%0A%20%20%3CradialGradient%20id%3D%22vig%22%20cx%3D%2250%25%22%20cy%3D%2245%25%22%20r%3D%2270%25%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23ede9e0%22%20stop-opacity%3D%220%22%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%2270%25%22%20stop-color%3D%22%23f4f1ea%22%20stop-opacity%3D%220.15%22%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23000%22%20stop-opacity%3D%220.55%22%2F%3E%0A%20%20%3C%2FradialGradient%3E%0A%20%20%3ClinearGradient%20id%3D%22floor%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22rgba%28230%2C57%2C70%2C0.000%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22rgba%28230%2C57%2C70%2C0.280%29%22%20%2F%3E%0A%20%20%3C%2FlinearGradient%3E%0A%20%20%3ClinearGradient%20id%3D%22beam%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22rgba%2831%2C74%2C224%2C0.550%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%2245%25%22%20stop-color%3D%22rgba%28230%2C57%2C70%2C0.180%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22rgba%28237%2C233%2C224%2C0.000%29%22%20%2F%3E%0A%20%20%3C%2FlinearGradient%3E%0A%20%20%3CradialGradient%20id%3D%22orb1%22%20cx%3D%2235%25%22%20cy%3D%2230%25%22%20r%3D%2245%25%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22rgba%28230%2C57%2C70%2C0.750%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%2255%25%22%20stop-color%3D%22rgba%28230%2C57%2C70%2C0.180%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22rgba%28230%2C57%2C70%2C0.000%29%22%20%2F%3E%0A%20%20%3C%2FradialGradient%3E%0A%20%20%3CradialGradient%20id%3D%22orb2%22%20cx%3D%2272%25%22%20cy%3D%2258%25%22%20r%3D%2240%25%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22rgba%2831%2C74%2C224%2C0.650%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%2260%25%22%20stop-color%3D%22rgba%2831%2C74%2C224%2C0.160%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22rgba%2831%2C74%2C224%2C0.000%29%22%20%2F%3E%0A%20%20%3C%2FradialGradient%3E%0A%20%20%3CradialGradient%20id%3D%22bokeh%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220.55%22%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%2240%25%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220.12%22%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%2F%3E%0A%20%20%3C%2FradialGradient%3E%0A%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Cg%20filter%3D%22url%28%23grain%29%22%3E%0A%0A%20%20%3Crect%20width%3D%221600%22%20height%3D%22900%22%20fill%3D%22%23f4f1ea%22%2F%3E%0A%20%20%3Cellipse%20cx%3D%22800%22%20cy%3D%22820%22%20rx%3D%22700%22%20ry%3D%22120%22%20fill%3D%22rgba%280%2C0%2C0%2C0.350%29%22%20filter%3D%22url%28%23soft%29%22%2F%3E%0A%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%221600%22%20height%3D%22900%22%20fill%3D%22url%28%23floor%29%22%2F%3E%0A%20%20%3Cellipse%20cx%3D%22520%22%20cy%3D%22260%22%20rx%3D%22360%22%20ry%3D%22260%22%20fill%3D%22url%28%23orb1%29%22%20filter%3D%22url%28%23soft2%29%22%2F%3E%0A%20%20%3Cellipse%20cx%3D%221180%22%20cy%3D%22220%22%20rx%3D%22300%22%20ry%3D%22220%22%20fill%3D%22url%28%23orb2%29%22%20filter%3D%22url%28%23soft2%29%22%2F%3E%0A%20%20%3C%21--%20desk%20product%20frame%20--%3E%0A%20%20%3Cg%20transform%3D%22translate%28430%2C170%29%22%3E%0A%20%20%20%20%3Crect%20x%3D%2218%22%20y%3D%2228%22%20width%3D%22720%22%20height%3D%22460%22%20rx%3D%2228%22%20fill%3D%22rgba%280%2C0%2C0%2C0.350%29%22%20filter%3D%22url%28%23soft%29%22%2F%3E%0A%20%20%20%20%3Crect%20width%3D%22720%22%20height%3D%22450%22%20rx%3D%2226%22%20fill%3D%22%23ede9e0%22%20stroke%3D%22rgba%28230%2C57%2C70%2C0.350%29%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%2222%22%20y%3D%2222%22%20width%3D%22676%22%20height%3D%22360%22%20rx%3D%2216%22%20fill%3D%22%23f4f1ea%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%2222%22%20y%3D%2222%22%20width%3D%22676%22%20height%3D%22360%22%20rx%3D%2216%22%20fill%3D%22url%28%23beam%29%22%20opacity%3D%220.55%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%2270%22%20y%3D%2290%22%20width%3D%22220%22%20height%3D%2218%22%20rx%3D%226%22%20fill%3D%22rgba%28230%2C57%2C70%2C0.850%29%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%2270%22%20y%3D%22130%22%20width%3D%22380%22%20height%3D%2212%22%20rx%3D%224%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.350%29%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%2270%22%20y%3D%22158%22%20width%3D%22320%22%20height%3D%2212%22%20rx%3D%224%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.220%29%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%2270%22%20y%3D%22210%22%20width%3D%22200%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22rgba%2831%2C74%2C224%2C0.280%29%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%22290%22%20y%3D%22210%22%20width%3D%22200%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22rgba%28230%2C57%2C70%2C0.220%29%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%22510%22%20y%3D%22210%22%20width%3D%22140%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.080%29%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%22280%22%20y%3D%22400%22%20width%3D%22160%22%20height%3D%2210%22%20rx%3D%225%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.180%29%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Crect%20width%3D%221600%22%20height%3D%22900%22%20fill%3D%22url%28%23vig%29%22%2F%3E%0A%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E",imageAlt:"Primary craft visual"},{layout:"feature-grid",eyebrow:"System",heading:"Three laws of Primary",columns:"bento",cards:[{icon:"fa-solid fa-square",title:"Block first",body:"Every layout starts as a rectangle with a job."},{icon:"fa-solid fa-circle",title:"Accent once",body:"One primary accent per surface — never a rainbow."},{icon:"fa-solid fa-grip",title:"Grid or nothing",body:"If it doesn't snap, it doesn't ship."},{icon:"fa-solid fa-layer-group",title:"Stack for scan",body:"Hierarchy first. Decoration second. Decoration never."},{icon:"fa-solid fa-bolt",title:"Ship the punchline",body:"Lead with the claim that survives the hallway test."}]},{layout:"comparison",eyebrow:"Discipline",heading:"Style vs. system.",leftLabel:"Style deck",left:`Moodboards without tokens.
Fonts that fight.
One-off hero slides.`,rightLabel:"Primary",right:`Tokens before taste.
Two fonts max.
Layouts that reuse.`,emphasis:"right"},{layout:"timeline",eyebrow:"Rollout",heading:"From keynote to kit",steps:[{title:"Week 1 — Audit",body:"Strip decorative debt."},{title:"Week 3 — Tokens",body:"Color + type locked."},{title:"Week 6 — Ship",body:"Figma + code kit live."}]},{layout:"closing",eyebrow:"Adopt",heading:"Build with primaries.",lead:"Download the Primary kit. Ship the next surface without inventing a palette.",cta:{label:"Get the kit",href:"#"}}],D5={type:x5,meta:k5,slides:w5},C5="deck",F5={title:"Posterforge — Campaign",company:"Posterforge",description:"Campaign studio credentials — bold-poster multi-slide proof.",theme:"bold-poster"},E5=[{layout:"title",eyebrow:"Campaign studio",heading:"Tomato ink. Loud type.",lead:"Shrikhand titles. Libre Baskerville body. Posters that stop the scroll."},{layout:"image-hero",eyebrow:"Campaign studio",heading:"Tomato ink. Loud type.",lead:"Shrikhand titles. Libre Baskerville body. Posters that stop the scroll.",image:"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201600%20900%22%20width%3D%221600%22%20height%3D%22900%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%3Cfilter%20id%3D%22grain%22%20x%3D%22-20%25%22%20y%3D%22-20%25%22%20width%3D%22140%25%22%20height%3D%22140%25%22%3E%0A%20%20%20%20%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.85%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%20result%3D%22n%22%2F%3E%0A%20%20%20%20%3CfeColorMatrix%20type%3D%22matrix%22%20values%3D%220%200%200%200%201%20%200%200%200%200%201%20%200%200%200%200%201%20%200%200%200%200.18%200%22%20in%3D%22n%22%20result%3D%22g%22%2F%3E%0A%20%20%20%20%3CfeBlend%20in%3D%22SourceGraphic%22%20in2%3D%22g%22%20mode%3D%22soft-light%22%2F%3E%0A%20%20%3C%2Ffilter%3E%0A%20%20%3Cfilter%20id%3D%22soft%22%20x%3D%22-30%25%22%20y%3D%22-30%25%22%20width%3D%22160%25%22%20height%3D%22160%25%22%3E%0A%20%20%20%20%3CfeGaussianBlur%20stdDeviation%3D%2228%22%2F%3E%0A%20%20%3C%2Ffilter%3E%0A%20%20%3Cfilter%20id%3D%22soft2%22%20x%3D%22-30%25%22%20y%3D%22-30%25%22%20width%3D%22160%25%22%20height%3D%22160%25%22%3E%0A%20%20%20%20%3CfeGaussianBlur%20stdDeviation%3D%2248%22%2F%3E%0A%20%20%3C%2Ffilter%3E%0A%20%20%3CradialGradient%20id%3D%22vig%22%20cx%3D%2250%25%22%20cy%3D%2245%25%22%20r%3D%2270%25%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23F5F2EF%22%20stop-opacity%3D%220%22%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%2270%25%22%20stop-color%3D%22%23FFFFFF%22%20stop-opacity%3D%220.15%22%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23000%22%20stop-opacity%3D%220.55%22%2F%3E%0A%20%20%3C%2FradialGradient%3E%0A%20%20%3ClinearGradient%20id%3D%22floor%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22rgba%28216%2C0%2C15%2C0.000%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22rgba%28216%2C0%2C15%2C0.280%29%22%20%2F%3E%0A%20%20%3C%2FlinearGradient%3E%0A%20%20%3ClinearGradient%20id%3D%22beam%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22rgba%2828%2C20%2C16%2C0.550%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%2245%25%22%20stop-color%3D%22rgba%28216%2C0%2C15%2C0.180%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22rgba%28245%2C242%2C239%2C0.000%29%22%20%2F%3E%0A%20%20%3C%2FlinearGradient%3E%0A%20%20%3CradialGradient%20id%3D%22orb1%22%20cx%3D%2235%25%22%20cy%3D%2230%25%22%20r%3D%2245%25%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22rgba%28216%2C0%2C15%2C0.750%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%2255%25%22%20stop-color%3D%22rgba%28216%2C0%2C15%2C0.180%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22rgba%28216%2C0%2C15%2C0.000%29%22%20%2F%3E%0A%20%20%3C%2FradialGradient%3E%0A%20%20%3CradialGradient%20id%3D%22orb2%22%20cx%3D%2272%25%22%20cy%3D%2258%25%22%20r%3D%2240%25%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22rgba%2828%2C20%2C16%2C0.650%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%2260%25%22%20stop-color%3D%22rgba%2828%2C20%2C16%2C0.160%29%22%20%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22rgba%2828%2C20%2C16%2C0.000%29%22%20%2F%3E%0A%20%20%3C%2FradialGradient%3E%0A%20%20%3CradialGradient%20id%3D%22bokeh%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220.55%22%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%2240%25%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220.12%22%2F%3E%0A%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23fff%22%20stop-opacity%3D%220%22%2F%3E%0A%20%20%3C%2FradialGradient%3E%0A%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Cg%20filter%3D%22url%28%23grain%29%22%3E%0A%0A%20%20%3Crect%20width%3D%221600%22%20height%3D%22900%22%20fill%3D%22%23FFFFFF%22%2F%3E%0A%20%20%3Cpolygon%20points%3D%220%2C0%20980%2C0%20640%2C900%200%2C900%22%20fill%3D%22rgba%28216%2C0%2C15%2C0.280%29%22%2F%3E%0A%20%20%3Cpolygon%20points%3D%22980%2C0%201600%2C0%201600%2C900%20640%2C900%22%20fill%3D%22rgba%2828%2C20%2C16%2C0.180%29%22%2F%3E%0A%20%20%3Cellipse%20cx%3D%221180%22%20cy%3D%22280%22%20rx%3D%22260%22%20ry%3D%22200%22%20fill%3D%22rgba%28216%2C0%2C15%2C0.350%29%22%20filter%3D%22url%28%23soft%29%22%2F%3E%0A%20%20%3Crect%20x%3D%22120%22%20y%3D%22220%22%20width%3D%22620%22%20height%3D%2272%22%20fill%3D%22%23D8000F%22%2F%3E%0A%20%20%3Crect%20x%3D%22120%22%20y%3D%22320%22%20width%3D%22460%22%20height%3D%2228%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.550%29%22%2F%3E%0A%20%20%3Crect%20x%3D%22120%22%20y%3D%22370%22%20width%3D%22380%22%20height%3D%2222%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.280%29%22%2F%3E%0A%20%20%3Crect%20x%3D%22980%22%20y%3D%22520%22%20width%3D%22420%22%20height%3D%22220%22%20fill%3D%22rgba%280%2C0%2C0%2C0.220%29%22%2F%3E%0A%20%20%3Crect%20x%3D%221000%22%20y%3D%22540%22%20width%3D%22380%22%20height%3D%22180%22%20fill%3D%22rgba%2828%2C20%2C16%2C0.450%29%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%221320%22%20cy%3D%22630%22%20r%3D%2254%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.550%29%22%2F%3E%0A%20%20%3Crect%20width%3D%221600%22%20height%3D%22900%22%20fill%3D%22url%28%23vig%29%22%20opacity%3D%220.7%22%2F%3E%0A%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E",imageAlt:"Posterforge cinematic surface"},{layout:"two-column",eyebrow:"Work",heading:"What we print",body:"Launch walls: City-scale type for product days. Tour posters — Ink that survives rain and phones.",aside:"One poster system, many SKUs.",ratio:"2-1",reverse:!0},{layout:"comparison",eyebrow:"Craft",heading:"Template vs. poster.",leftLabel:"Canva default",left:`Centered everything.
Soft shadows.
Forgettable.`,rightLabel:"Posterforge",right:`Edge-to-edge type.
Tomato rules.
You remember.`,emphasis:"right"},{layout:"stat-row",eyebrow:"Impact",heading:"Paper that performed.",stats:[{value:"180+",label:"Campaigns"},{value:"12",label:"Award years"},{value:"3.8×",label:"Avg CTR lift"}]},{layout:"closing",eyebrow:"Brief us",heading:"Send the product. Get the wall.",lead:"Two-week sprint from brief to press-ready.",cta:{label:"Start a brief",href:"#"}}],S5={type:C5,meta:F5,slides:E5},Xi=[{slug:"acme",label:"Acme Q3 (signal)",deck:Ji},{slug:"briefing-signal",label:"Northline briefing",deck:h5},{slug:"novaspark-pitch",label:"NovaSpark pitch",deck:u5},{slug:"jellybean-launch",label:"Jellybean (candy-pop)",deck:Yk},{slug:"mallsoft-launch",label:"Mallsoft (vaporwave)",deck:Zk},{slug:"neondistrict-platform",label:"Neon District",deck:r5},{slug:"bounce-launch",label:"Bounce (genz-bento)",deck:s5},{slug:"bubbleflow-launch",label:"BubbleFlow (y2k)",deck:v5},{slug:"primary-keynote",label:"Primary (bauhaus)",deck:D5},{slug:"posterforge-campaign",label:"Posterforge",deck:S5}],A5={default:"acme",example:"acme",signal:"briefing-signal",candy:"jellybean-launch",vapor:"mallsoft-launch",neon:"neondistrict-platform",bounce:"bounce-launch"};function pn(e){if(!e)return null;const t=e.trim().toLowerCase();if(!t)return null;const n=A5[t]??t;return Xi.some(r=>r.slug===n)?n:null}function jc(e){const t=pn(e);if(!t)return null;const n=Xi.find(r=>r.slug===t);return n?structuredClone(n.deck):null}function _5(e){const t=pn(e)??"acme",n=typeof window<"u"?`${window.location.origin}${window.location.pathname}`:"/studio/",r=new URL(n,"https://presentation-md.vercel.app");return r.searchParams.set("example",t),r.searchParams.set("fresh","1"),r.pathname.startsWith("/studio")?`${r.pathname}?${r.searchParams.toString()}`:`/studio/?example=${t}&fresh=1`}const Pc="claude",Mc="0.1.0",Nc="Anthropic / Claude-inspired theme: warm cream paper, clay-coral accent, grotesk + editorial-serif pairing.",Ic="Warm, human, editorial, high-craft, calm — cream paper, soft clay-coral signal, Styrene-style grotesk headings over a Tiempos-style serif body. Restrained, trustworthy, not corporate.",Bc="MIT",zc="Timur Isachenko",Oc={bg:"#faf9f5",bg2:"#f4f3ee",text:"#141413",muted:"#73706a",accent:"#d97757",accent2:"#6a9bcc",cardBg:"#ffffff",border:"#e8e6dc"},Lc={headingFont:"'Space Grotesk', system-ui, sans-serif",bodyFont:"'Lora', Georgia, 'Times New Roman', serif",headingWeight:600,googleFonts:["Space+Grotesk:wght@500;600;700","Lora:wght@400;500;600"]},Gc={radius:"12px",slideWidth:"1280px"},$5={name:Pc,version:Mc,extends:"default-tech",description:Nc,vibe:Ic,license:Bc,author:zc,roles:Oc,typography:Lc,geometry:Gc},T5=Object.freeze(Object.defineProperty({__proto__:null,author:zc,default:$5,description:Nc,geometry:Gc,license:Bc,name:Pc,roles:Oc,typography:Lc,version:Mc,vibe:Ic},Symbol.toStringTag,{value:"Module"})),Rc="default-tech",Wc="0.1.0",Uc="Edgy tech-startup default: dark canvas, violet + cyan accents, bold geometric sans.",Hc="Edgy tech startup — dark, confident, neon-accented.",qc="MIT",Vc="Timur Isachenko",Qc={bg:"#0e0e12",bg2:"#16161d",text:"#f4f4f5",muted:"#a1a1aa",accent:"#7c3aed",accent2:"#22d3ee",cardBg:"rgba(255,255,255,0.04)",border:"rgba(255,255,255,0.08)"},Yc={headingFont:"'Montserrat', system-ui, sans-serif",bodyFont:"'Open Sans', system-ui, sans-serif",headingWeight:800,googleFonts:["Montserrat:wght@700;800","Open+Sans:wght@400;600"]},Kc={radius:"18px",slideWidth:"1280px"},j5={name:Rc,version:Wc,description:Uc,vibe:Hc,license:qc,author:Vc,roles:Qc,typography:Yc,geometry:Kc},P5=Object.freeze(Object.defineProperty({__proto__:null,author:Vc,default:j5,description:Uc,geometry:Kc,license:qc,name:Rc,roles:Qc,typography:Yc,version:Wc,vibe:Hc},Symbol.toStringTag,{value:"Module"})),Jc="8-bit-orbit",Xc="1.0.0",Zc="8-Bit Orbit — pixel-art neon arcade on deep navy, Tektur + Chakra Petch (frontend-slides bold-template-pack).",ed="8-Bit Orbit — void #0A0E27, neon cyan/pink/yellow, Tektur + Chakra Petch + Space Mono (frontend-slides 8-bit-orbit).",td="MIT",nd="Timur Isachenko",rd={bg:"#0A0E27",bg2:"#0F1B3D",text:"#FFFFFF",muted:"#E2D5F2",accent:"#5EDCF4",accent2:"#F0A6CA",cardBg:"rgba(15,27,61,0.85)",border:"rgba(94,220,244,0.35)"},ad={headingFont:"'Tektur', cursive",bodyFont:"'Chakra Petch', system-ui, sans-serif",headingWeight:700,googleFonts:["Tektur:wght@500;700;900","Chakra+Petch:wght@400;500;600;700","Space+Mono:wght@400;700"]},od={radius:"0px",slideWidth:"1280px"},M5={name:Jc,version:Xc,extends:"default-tech",description:Zc,vibe:ed,license:td,author:nd,roles:rd,typography:ad,geometry:od},N5=Object.freeze(Object.defineProperty({__proto__:null,author:nd,default:M5,description:Zc,geometry:od,license:td,name:Jc,roles:rd,typography:ad,version:Xc,vibe:ed},Symbol.toStringTag,{value:"Module"})),id="aerospace-hud",sd="0.1.0",ld="Aerospace HUD — deep navy, cyan instruments, warning orange, blueprint grid.",cd="Aerospace HUD — navy cockpit, cyan instruments, warning orange, Barlow Condensed (matches Axiom gallery).",dd="MIT",ud="Timur Isachenko",pd={bg:"#0a1d3a",bg2:"#0d2347",text:"#f0f8ff",muted:"#62abd8",accent:"#5ec8ff",accent2:"#ff7a18",cardBg:"rgba(94,200,255,0.08)",border:"rgba(94,200,255,0.28)"},fd={headingFont:"'Barlow Condensed', system-ui, sans-serif",bodyFont:"'Barlow', system-ui, sans-serif",headingWeight:700,googleFonts:["Barlow+Condensed:wght@600;700","Barlow:wght@400;600","IBM+Plex+Mono:wght@500"]},gd={radius:"4px",slideWidth:"1280px"},I5={name:id,version:sd,extends:"default-tech",description:ld,vibe:cd,license:dd,author:ud,roles:pd,typography:fd,geometry:gd},B5=Object.freeze(Object.defineProperty({__proto__:null,author:ud,default:I5,description:ld,geometry:gd,license:dd,name:id,roles:pd,typography:fd,version:sd,vibe:cd},Symbol.toStringTag,{value:"Module"})),hd="art-deco",md="0.1.0",bd="Art Deco investor — deep emerald, gold leaf, Cinzel display.",yd="Art Deco — #0c2a24 emerald, gold #c8a24a, Cinzel (matches Meridian Club gallery).",vd="MIT",xd="Timur Isachenko",kd={bg:"#0c2a24",bg2:"#113530",text:"#f5eed8",muted:"#c9bfa0",accent:"#c8a24a",accent2:"#e2c47a",cardBg:"rgba(200,162,74,0.08)",border:"rgba(200,162,74,0.35)"},wd={headingFont:"'Cinzel', Georgia, serif",bodyFont:"'Cormorant Garamond', Georgia, serif",headingWeight:600,googleFonts:["Cinzel:wght@500;600;700","Cormorant+Garamond:wght@400;600"]},Dd={radius:"0px",slideWidth:"1280px"},z5={name:hd,version:md,extends:"default-tech",description:bd,vibe:yd,license:vd,author:xd,roles:kd,typography:wd,geometry:Dd},O5=Object.freeze(Object.defineProperty({__proto__:null,author:xd,default:z5,description:bd,geometry:Dd,license:vd,name:hd,roles:kd,typography:wd,version:md,vibe:yd},Symbol.toStringTag,{value:"Module"})),Cd="aurora-glass",Fd="0.1.0",Ed="Dark aurora glassmorphism — void canvas, frosted cards, violet + cyan glow.",Sd="Aurora glass — pure black void, Syne + Inter, violet #a78bfa + cyan #67e8f9 (matches NovaSpark gallery).",Ad="MIT",_d="Timur Isachenko",$d={bg:"#000000",bg2:"#0a0612",text:"#ffffff",muted:"#a5a0b8",accent:"#a78bfa",accent2:"#67e8f9",cardBg:"rgba(255,255,255,0.06)",border:"rgba(255,255,255,0.12)"},Td={headingFont:"'Syne', system-ui, sans-serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:800,googleFonts:["Syne:wght@700;800","Inter:wght@400;600"]},jd={radius:"16px",slideWidth:"1280px"},L5={name:Cd,version:Fd,extends:"default-tech",description:Ed,vibe:Sd,license:Ad,author:_d,roles:$d,typography:Td,geometry:jd},G5=Object.freeze(Object.defineProperty({__proto__:null,author:_d,default:L5,description:Ed,geometry:jd,license:Ad,name:Cd,roles:$d,typography:Td,version:Fd,vibe:Sd},Symbol.toStringTag,{value:"Module"})),Pd="bauhaus",Md="0.1.0",Nd="Bauhaus primary system — cream field, red/yellow/blue geometry, bold grotesk.",Id="Bauhaus — warm cream #f4f1ea, primary red #e63946 + blue #1f4ae0 (matches Primary gallery).",Bd="MIT",zd="Timur Isachenko",Od={bg:"#f4f1ea",bg2:"#ede9e0",text:"#0d0d0d",muted:"#5f5b53",accent:"#e63946",accent2:"#1f4ae0",cardBg:"rgba(0,0,0,0.04)",border:"rgba(13,13,13,0.2)"},Ld={headingFont:"'Archivo', system-ui, sans-serif",bodyFont:"'Space Grotesk', system-ui, sans-serif",headingWeight:800,googleFonts:["Archivo:wght@600;800","Space+Grotesk:wght@400;600"]},Gd={radius:"0px",slideWidth:"1280px"},R5={name:Pd,version:Md,extends:"default-tech",description:Nd,vibe:Id,license:Bd,author:zd,roles:Od,typography:Ld,geometry:Gd},W5=Object.freeze(Object.defineProperty({__proto__:null,author:zd,default:R5,description:Nd,geometry:Gd,license:Bd,name:Pd,roles:Od,typography:Ld,version:Md,vibe:Id},Symbol.toStringTag,{value:"Module"})),Rd="biennale-yellow",Wd="1.0.0",Ud="Biennale Yellow — Instrument Serif on parchment with solar yellow bloom and deep indigo ink (frontend-slides / beautiful-html-templates).",Hd="Biennale Yellow — parchment #E9E5DB, sun #F1EE2E, indigo #1B2566, Instrument Serif + Archivo (frontend-slides biennale-yellow).",qd="MIT",Vd="Timur Isachenko",Qd={bg:"#E9E5DB",bg2:"#DCD6C4",text:"#1B2566",muted:"#4A5480",accent:"#F1EE2E",accent2:"#E26B4A",cardBg:"rgba(255,255,255,0.35)",border:"rgba(27,37,102,0.22)"},Yd={headingFont:"'Instrument Serif', Georgia, serif",bodyFont:"'Archivo', system-ui, sans-serif",headingWeight:400,googleFonts:["Instrument+Serif:ital@0;1","Archivo:wght@400;500;600","JetBrains+Mono:wght@400"]},Kd={radius:"0px",slideWidth:"1280px"},U5={name:Rd,version:Wd,extends:"default-tech",description:Ud,vibe:Hd,license:qd,author:Vd,roles:Qd,typography:Yd,geometry:Kd},H5=Object.freeze(Object.defineProperty({__proto__:null,author:Vd,default:U5,description:Ud,geometry:Kd,license:qd,name:Rd,roles:Qd,typography:Yd,version:Wd,vibe:Hd},Symbol.toStringTag,{value:"Module"})),Jd="block-frame",Xd="1.0.0",Zd="BlockFrame — neobrutalist pastel-neon blocks, 4px ink borders, hard offset shadows (frontend-slides bold-template-pack).",e0="BlockFrame — offwhite #FFFDF5, pink/blue/green/yellow pastels, Inter 900 + Space Grotesk (frontend-slides block-frame).",t0="MIT",n0="Timur Isachenko",r0={bg:"#FFFDF5",bg2:"#FFDC8B",text:"#000000",muted:"#444444",accent:"#FE90E8",accent2:"#99E885",cardBg:"#FFFFFF",border:"#000000"},a0={headingFont:"'Inter', system-ui, sans-serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:900,googleFonts:["Inter:wght@500;700;800;900","Space+Grotesk:wght@500;600;700"]},o0={radius:"0px",slideWidth:"1280px"},q5={name:Jd,version:Xd,extends:"default-tech",description:Zd,vibe:e0,license:t0,author:n0,roles:r0,typography:a0,geometry:o0},V5=Object.freeze(Object.defineProperty({__proto__:null,author:n0,default:q5,description:Zd,geometry:o0,license:t0,name:Jd,roles:r0,typography:a0,version:Xd,vibe:e0},Symbol.toStringTag,{value:"Module"})),i0="blue-professional",s0="1.0.0",l0="Blue Professional — cream paper + electric cobalt #1E2BFA (frontend-slides bold-template-pack).",c0="Blue Professional — cream #FDFAE7 + cobalt #1E2BFA, Space Grotesk + Inter (frontend-slides blue-professional).",d0="MIT",u0="Timur Isachenko",p0={bg:"#FDFAE7",bg2:"#F5F2DC",text:"#111111",muted:"#5c5c5c",accent:"#1E2BFA",accent2:"#059669",cardBg:"rgba(30,43,250,0.04)",border:"rgba(30,43,250,0.2)"},f0={headingFont:"'Space Grotesk', sans-serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:700,googleFonts:["Space+Grotesk:wght@500;600;700","Inter:wght@400;500;600"]},g0={radius:"12px",slideWidth:"1280px"},Q5={name:i0,version:s0,extends:"default-tech",description:l0,vibe:c0,license:d0,author:u0,roles:p0,typography:f0,geometry:g0},Y5=Object.freeze(Object.defineProperty({__proto__:null,author:u0,default:Q5,description:l0,geometry:g0,license:d0,name:i0,roles:p0,typography:f0,version:s0,vibe:c0},Symbol.toStringTag,{value:"Module"})),h0="blueprint",m0="0.1.0",b0="Engineering blueprint — deep navy, cyan lines, Space Mono / Space Grotesk.",y0="Blueprint — #0a1f3d navy, cyan #00e5ff grid (matches Apsis Mission gallery).",v0="MIT",x0="Timur Isachenko",k0={bg:"#0a1f3d",bg2:"#0d2548",text:"#e8f4ff",muted:"#88b1ce",accent:"#00e5ff",accent2:"#ffffff",cardBg:"rgba(0,229,255,0.06)",border:"rgba(0,229,255,0.28)"},w0={headingFont:"'Space Grotesk', system-ui, sans-serif",bodyFont:"'Space Mono', monospace",headingWeight:700,googleFonts:["Space+Grotesk:wght@500;700","Space+Mono:wght@400;700","IBM+Plex+Mono:wght@500"]},D0={radius:"2px",slideWidth:"1280px"},K5={name:h0,version:m0,extends:"default-tech",description:b0,vibe:y0,license:v0,author:x0,roles:k0,typography:w0,geometry:D0},J5=Object.freeze(Object.defineProperty({__proto__:null,author:x0,default:K5,description:b0,geometry:D0,license:v0,name:h0,roles:k0,typography:w0,version:m0,vibe:y0},Symbol.toStringTag,{value:"Module"})),C0="bold-poster",F0="1.0.0",E0="Bold Poster — Shrikhand display, Libre Baskerville body, tomato red accent (frontend-slides / beautiful-html-templates).",S0="Bold Poster — white canvas, ink #1C1410, tomato #D8000F, Shrikhand + Libre Baskerville (frontend-slides bold-poster).",A0="MIT",_0="Timur Isachenko",$0={bg:"#FFFFFF",bg2:"#F5F2EF",text:"#1C1410",muted:"#655950",accent:"#D8000F",accent2:"#1C1410",cardBg:"#F5F2EF",border:"rgba(28,20,16,0.85)"},T0={headingFont:"'Shrikhand', cursive",bodyFont:"'Libre Baskerville', Georgia, serif",headingWeight:400,googleFonts:["Shrikhand","Libre+Baskerville:wght@400;700","Space+Grotesk:wght@500;600"]},j0={radius:"0px",slideWidth:"1280px"},X5={name:C0,version:F0,extends:"default-tech",description:E0,vibe:S0,license:A0,author:_0,roles:$0,typography:T0,geometry:j0},Z5=Object.freeze(Object.defineProperty({__proto__:null,author:_0,default:X5,description:E0,geometry:j0,license:A0,name:C0,roles:$0,typography:T0,version:F0,vibe:S0},Symbol.toStringTag,{value:"Module"})),P0="bold-signal",M0="1.0.0",N0="Bold Signal — Archivo Black on dark gradient with vibrant orange card focal (frontend-slides STYLE_PRESETS).",I0="Bold Signal — #1a1a1a dark, orange card #FF5722, Archivo Black + Space Grotesk (frontend-slides Bold Signal).",B0="MIT",z0="Timur Isachenko",O0={bg:"#1a1a1a",bg2:"#2d2d2d",text:"#ffffff",muted:"#b0b0b0",accent:"#FF5722",accent2:"#FF8A65",cardBg:"#43251b",border:"rgba(255,255,255,0.12)"},L0={headingFont:"'Archivo Black', system-ui, sans-serif",bodyFont:"'Space Grotesk', system-ui, sans-serif",headingWeight:400,googleFonts:["Archivo+Black","Space+Grotesk:wght@400;500;600"]},G0={radius:"16px",slideWidth:"1280px"},ew={name:P0,version:M0,extends:"default-tech",description:N0,vibe:I0,license:B0,author:z0,roles:O0,typography:L0,geometry:G0},tw=Object.freeze(Object.defineProperty({__proto__:null,author:z0,default:ew,description:N0,geometry:G0,license:B0,name:P0,roles:O0,typography:L0,version:M0,vibe:I0},Symbol.toStringTag,{value:"Module"})),R0="botanical-luxe",W0="0.1.0",U0="Botanical luxe — deep forest green, gold leaf, serif elegance for impact reports.",H0="Botanical luxe — forest #1d3a2f, gold #bfa55a, Cormorant + DM Sans (matches Verdant gallery).",q0="MIT",V0="Timur Isachenko",Q0={bg:"#1d3a2f",bg2:"#162d24",text:"#f3efe4",muted:"#a3c3ad",accent:"#bfa55a",accent2:"#4a7c59",cardBg:"rgba(191,165,90,0.08)",border:"rgba(191,165,90,0.28)"},Y0={headingFont:"'Cormorant Garamond', Georgia, serif",bodyFont:"'DM Sans', system-ui, sans-serif",headingWeight:600,googleFonts:["Cormorant+Garamond:wght@500;600;700","DM+Sans:wght@400;600"]},K0={radius:"8px",slideWidth:"1280px"},nw={name:R0,version:W0,extends:"default-tech",description:U0,vibe:H0,license:q0,author:V0,roles:Q0,typography:Y0,geometry:K0},rw=Object.freeze(Object.defineProperty({__proto__:null,author:V0,default:nw,description:U0,geometry:K0,license:q0,name:R0,roles:Q0,typography:Y0,version:W0,vibe:H0},Symbol.toStringTag,{value:"Module"})),J0="broadsheet",X0="0.1.0",Z0="Newspaper broadsheet — warm newsprint, deep ink, Pirata One masthead + Playfair.",eu="Broadsheet — #f2ece0 newsprint, ink #1a1208, Pirata One masthead (matches Daily Ledger gallery).",tu="MIT",nu="Timur Isachenko",ru={bg:"#f2ece0",bg2:"#e8dfc8",text:"#1a1208",muted:"#5a4c3e",accent:"#1a1208",accent2:"#5c4d38",cardBg:"rgba(26,18,8,0.04)",border:"rgba(26,18,8,0.18)"},au={headingFont:"'Playfair Display', Georgia, serif",bodyFont:"'Lora', Georgia, serif",headingWeight:700,googleFonts:["Pirata+One","Playfair+Display:wght@500;700","Lora:wght@400;600"]},ou={radius:"0px",slideWidth:"1280px"},aw={name:J0,version:X0,extends:"default-tech",description:Z0,vibe:eu,license:tu,author:nu,roles:ru,typography:au,geometry:ou},ow=Object.freeze(Object.defineProperty({__proto__:null,author:nu,default:aw,description:Z0,geometry:ou,license:tu,name:J0,roles:ru,typography:au,version:X0,vibe:eu},Symbol.toStringTag,{value:"Module"})),iu="broadside",su="1.0.0",lu="Broadside — dark editorial canvas with fire-orange accent and massive Barlow type (frontend-slides).",cu="Broadside — ink #111111, fire orange #E85D26, cream #F0ECE5, Barlow 900 + IBM Plex Mono (frontend-slides broadside).",du="MIT",uu="Timur Isachenko",pu={bg:"#111111",bg2:"#1A1A18",text:"#F0ECE5",muted:"#8d8d85",accent:"#E85D26",accent2:"#F0ECE5",cardBg:"rgba(232,93,38,0.12)",border:"rgba(40,40,38,1)"},fu={headingFont:"'Barlow', system-ui, sans-serif",bodyFont:"'Barlow', system-ui, sans-serif",headingWeight:900,googleFonts:["Barlow:wght@400;700;900","IBM+Plex+Mono:wght@400;500"]},gu={radius:"0px",slideWidth:"1280px"},iw={name:iu,version:su,extends:"default-tech",description:lu,vibe:cu,license:du,author:uu,roles:pu,typography:fu,geometry:gu},sw=Object.freeze(Object.defineProperty({__proto__:null,author:uu,default:iw,description:lu,geometry:gu,license:du,name:iu,roles:pu,typography:fu,version:su,vibe:cu},Symbol.toStringTag,{value:"Module"})),hu="brutalist-acid",mu="0.1.0",bu="Dark acid brutalist — near-black concrete, #d6ff00 hazard lime, hard mono edges.",yu="Acid brutalist — #1c1c1c, electric lime, Space Mono + Barlow Condensed (matches MONOLITH gallery).",vu="MIT",xu="Timur Isachenko",ku={bg:"#1c1c1c",bg2:"#2a2a2a",text:"#e8e6e1",muted:"#b1b1b1",accent:"#d6ff00",accent2:"#ffffff",cardBg:"rgba(214,255,0,0.06)",border:"rgba(214,255,0,0.35)"},wu={headingFont:"'Space Mono', monospace",bodyFont:"'Barlow Condensed', system-ui, sans-serif",headingWeight:700,googleFonts:["Space+Mono:wght@400;700","Barlow+Condensed:wght@500;700"]},Du={radius:"0px",slideWidth:"1280px"},lw={name:hu,version:mu,extends:"default-tech",description:bu,vibe:yu,license:vu,author:xu,roles:ku,typography:wu,geometry:Du},cw=Object.freeze(Object.defineProperty({__proto__:null,author:xu,default:lw,description:bu,geometry:Du,license:vu,name:hu,roles:ku,typography:wu,version:mu,vibe:yu},Symbol.toStringTag,{value:"Module"})),Cu="brutalist-mono",Fu="0.1.0",Eu="Raw brutalist theme with concrete-grey background, monospace type, hard square corners, and a single hazard-orange accent.",Su="Raw brutalist / technical — concrete off-white bg, near-black monospace ink, hazard-orange accent, thick black hairlines, zero radius.",Au="MIT",_u="Timur Isachenko",$u={bg:"#f0efe9",bg2:"#e3e1d8",text:"#0a0a0a",muted:"#57554c",accent:"#ff3600",accent2:"#0a0a0a",cardBg:"#ffffff",border:"rgba(10,10,10,0.85)"},Tu={headingFont:"'IBM Plex Mono', 'Courier New', monospace",bodyFont:"'IBM Plex Mono', 'Courier New', monospace",headingWeight:700,googleFonts:["IBM+Plex+Mono:wght@400;600;700"]},ju={radius:"0px",slideWidth:"1280px"},dw={name:Cu,version:Fu,extends:"default-tech",description:Eu,vibe:Su,license:Au,author:_u,roles:$u,typography:Tu,geometry:ju},uw=Object.freeze(Object.defineProperty({__proto__:null,author:_u,default:dw,description:Eu,geometry:ju,license:Au,name:Cu,roles:$u,typography:Tu,version:Fu,vibe:Su},Symbol.toStringTag,{value:"Module"})),Pu="candy-pop",Mu="0.1.0",Nu="Candy pop — cream canvas, hot pink + butter yellow, soft blobs, rounded type.",Iu="Candy pop — cream canvas, hot pink + jellybean blue, Fredoka + Poppins (matches Jellybean gallery).",Bu="MIT",zu="Timur Isachenko",Ou={bg:"#fdf3e7",bg2:"#f7e8d4",text:"#1a1a2e",muted:"#6a5c6f",accent:"#ff5d8f",accent2:"#2d7dd2",cardBg:"rgba(255,93,143,0.08)",border:"rgba(26,26,46,0.14)"},Lu={headingFont:"'Fredoka', system-ui, sans-serif",bodyFont:"'Poppins', system-ui, sans-serif",headingWeight:700,googleFonts:["Fredoka:wght@500;700","Poppins:wght@400;600"]},Gu={radius:"28px",slideWidth:"1280px"},pw={name:Pu,version:Mu,extends:"default-tech",description:Nu,vibe:Iu,license:Bu,author:zu,roles:Ou,typography:Lu,geometry:Gu},fw=Object.freeze(Object.defineProperty({__proto__:null,author:zu,default:pw,description:Nu,geometry:Gu,license:Bu,name:Pu,roles:Ou,typography:Lu,version:Mu,vibe:Iu},Symbol.toStringTag,{value:"Module"})),Ru="capsule",Wu="1.0.0",Uu="Capsule — modular pill cards on warm bone, Bodoni Moda + Space Grotesk candy palette (frontend-slides bold-template-pack).",Hu="Capsule — cream #F5F5F0, coral/lime/lavender/sky pops, Bodoni Moda + Space Grotesk pills (frontend-slides capsule).",qu="MIT",Vu="Timur Isachenko",Qu={bg:"#F5F5F0",bg2:"#FFFFFF",text:"#1A1A1A",muted:"#5A5A5A",accent:"#E85D4E",accent2:"#C4D94E",cardBg:"#FFFFFF",border:"#1E1E1E"},Yu={headingFont:"'Bodoni Moda', Georgia, serif",bodyFont:"'Space Grotesk', system-ui, sans-serif",headingWeight:700,googleFonts:["Bodoni+Moda:opsz,wght@6..96,400;700;800","Space+Grotesk:wght@400;500;600;700"]},Ku={radius:"9999px",slideWidth:"1280px"},gw={name:Ru,version:Wu,extends:"default-tech",description:Uu,vibe:Hu,license:qu,author:Vu,roles:Qu,typography:Yu,geometry:Ku},hw=Object.freeze(Object.defineProperty({__proto__:null,author:Vu,default:gw,description:Uu,geometry:Ku,license:qu,name:Ru,roles:Qu,typography:Yu,version:Wu,vibe:Hu},Symbol.toStringTag,{value:"Module"})),Ju="cartesian",Xu="1.0.0",Zu="Cartesian — warm stone + Playfair, 1px taupe draft lines (frontend-slides bold-template-pack).",ep="Cartesian — sandstone #EDE8E0, Playfair + Inter, taupe hairlines (frontend-slides cartesian).",tp="MIT",np="Timur Isachenko",rp={bg:"#EDE8E0",bg2:"#E2DBD1",text:"#1A1A1A",muted:"#5A5A5A",accent:"#8A8178",accent2:"#B8B0A4",cardBg:"#E2DBD1",border:"#B8B0A4"},ap={headingFont:"'Playfair Display', Georgia, serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:400,googleFonts:["Playfair+Display:wght@400;500;600","Inter:wght@400;500;600"]},op={radius:"0px",slideWidth:"1280px"},mw={name:Ju,version:Xu,extends:"default-tech",description:Zu,vibe:ep,license:tp,author:np,roles:rp,typography:ap,geometry:op},bw=Object.freeze(Object.defineProperty({__proto__:null,author:np,default:mw,description:Zu,geometry:op,license:tp,name:Ju,roles:rp,typography:ap,version:Xu,vibe:ep},Symbol.toStringTag,{value:"Module"})),ip="cobalt-grid",sp="1.0.0",lp="Cobalt Grid — graph-paper canvas, electric cobalt Newsreader, stair-step panels (frontend-slides bold-template-pack).",cp="Cobalt Grid — paper #F0EBDE, cobalt #1F2BE0, Newsreader + Hanken Grotesk (frontend-slides cobalt-grid).",dp="MIT",up="Timur Isachenko",pp={bg:"#F0EBDE",bg2:"#E6E0CE",text:"#1F2BE0",muted:"#2937df",accent:"#1F2BE0",accent2:"#1F2BE0",cardBg:"rgba(255,255,255,0.55)",border:"rgba(31,43,224,0.18)"},fp={headingFont:"'Newsreader', Georgia, serif",bodyFont:"'Hanken Grotesk', system-ui, sans-serif",headingWeight:600,googleFonts:["Newsreader:opsz,wght@6..72,400;500;600;700","Hanken+Grotesk:wght@400;500;600;700","DM+Mono:wght@400;500"]},gp={radius:"0px",slideWidth:"1280px"},yw={name:ip,version:sp,extends:"default-tech",description:lp,vibe:cp,license:dp,author:up,roles:pp,typography:fp,geometry:gp},vw=Object.freeze(Object.defineProperty({__proto__:null,author:up,default:yw,description:lp,geometry:gp,license:dp,name:ip,roles:pp,typography:fp,version:sp,vibe:cp},Symbol.toStringTag,{value:"Module"})),hp="coral",mp="1.0.0",bp="Coral — cream/coral/ink planes, Bebas Neue caps, 45° hatch (frontend-slides bold-template-pack).",yp="Coral — cream #F5F0E8 + coral #E85D5D on ink #1A1A1A, Bebas Neue + Inter (frontend-slides coral).",vp="MIT",xp="Timur Isachenko",kp={bg:"#F5F0E8",bg2:"#E85D5D",text:"#1A1A1A",muted:"#616161",accent:"#E85D5D",accent2:"#1A1A1A",cardBg:"#FFFFFF",border:"rgba(26,26,26,0.85)"},wp={headingFont:"'Bebas Neue', sans-serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:400,googleFonts:["Bebas+Neue","Inter:wght@300;400;500;600"]},Dp={radius:"0px",slideWidth:"1280px"},xw={name:hp,version:mp,extends:"default-tech",description:bp,vibe:yp,license:vp,author:xp,roles:kp,typography:wp,geometry:Dp},kw=Object.freeze(Object.defineProperty({__proto__:null,author:xp,default:xw,description:bp,geometry:Dp,license:vp,name:hp,roles:kp,typography:wp,version:mp,vibe:yp},Symbol.toStringTag,{value:"Module"})),Cp="corporate",Fp="0.1.0",Ep="Formal corporate presentation theme with crisp white background and restrained navy/blue palette.",Sp="Formal corporate — crisp white, navy text, single restrained blue accent, clean sans-serif, thin rules, minimal shadow.",Ap="MIT",_p="Timur Isachenko",$p={bg:"#ffffff",bg2:"#f8f9fc",text:"#1a2035",muted:"#5d636f",accent:"#1d4ed8",accent2:"#0369a1",cardBg:"#f1f5f9",border:"rgba(0,0,0,0.08)"},Tp={headingFont:"'Inter', system-ui, sans-serif",bodyFont:"'Source Sans 3', system-ui, sans-serif",headingWeight:700,googleFonts:["Inter:wght@400;700","Source+Sans+3:wght@400;600"]},jp={radius:"8px",slideWidth:"1280px"},ww={name:Cp,version:Fp,extends:"default-tech",description:Ep,vibe:Sp,license:Ap,author:_p,roles:$p,typography:Tp,geometry:jp},Dw=Object.freeze(Object.defineProperty({__proto__:null,author:_p,default:ww,description:Ep,geometry:jp,license:Ap,name:Cp,roles:$p,typography:Tp,version:Fp,vibe:Sp},Symbol.toStringTag,{value:"Module"})),Pp="creative-mode",Mp="1.0.0",Np="Creative Mode — cream canvas, hard ink borders, forest/pink/orange/yellow blocks, Archivo Black (frontend-slides).",Ip="Creative Mode — cream #EFE9D9, ink #0F0F0F, green #1F8A4C + pink #F06CA8, Archivo Black + Space Grotesk (frontend-slides creative-mode).",Bp="MIT",zp="Timur Isachenko",Op={bg:"#EFE9D9",bg2:"#E4DCC4",text:"#0F0F0F",muted:"#2A2A2A",accent:"#E85A1F",accent2:"#F06CA8",cardBg:"#F5C518",border:"rgba(15,15,15,0.95)"},Lp={headingFont:"'Archivo Black', system-ui, sans-serif",bodyFont:"'Space Grotesk', system-ui, sans-serif",headingWeight:400,googleFonts:["Archivo+Black","Space+Grotesk:wght@400;600","JetBrains+Mono:wght@400;500"]},Gp={radius:"0px",slideWidth:"1280px"},Cw={name:Pp,version:Mp,extends:"default-tech",description:Np,vibe:Ip,license:Bp,author:zp,roles:Op,typography:Lp,geometry:Gp},Fw=Object.freeze(Object.defineProperty({__proto__:null,author:zp,default:Cw,description:Np,geometry:Gp,license:Bp,name:Pp,roles:Op,typography:Lp,version:Mp,vibe:Ip},Symbol.toStringTag,{value:"Module"})),Rp="creative-voltage",Wp="1.0.0",Up="Creative Voltage — electric blue + neon yellow, Syne + Space Mono (frontend-slides STYLE_PRESETS).",Hp="Creative Voltage — electric blue #0066ff, dark #1a1a2e, neon #d4ff00, Syne + Space Mono (frontend-slides Creative Voltage).",qp="MIT",Vp="Timur Isachenko",Qp={bg:"#0066ff",bg2:"#1a1a2e",text:"#ffffff",muted:"#ffffff",accent:"#d4ff00",accent2:"#ffffff",cardBg:"#1a1a2e",border:"rgba(212,255,0,0.55)"},Yp={headingFont:"'Syne', system-ui, sans-serif",bodyFont:"'Space Mono', monospace",headingWeight:800,googleFonts:["Syne:wght@700;800","Space+Mono:wght@400;700"]},Kp={radius:"0px",slideWidth:"1280px"},Ew={name:Rp,version:Wp,extends:"default-tech",description:Up,vibe:Hp,license:qp,author:Vp,roles:Qp,typography:Yp,geometry:Kp},Sw=Object.freeze(Object.defineProperty({__proto__:null,author:Vp,default:Ew,description:Up,geometry:Kp,license:qp,name:Rp,roles:Qp,typography:Yp,version:Wp,vibe:Hp},Symbol.toStringTag,{value:"Module"})),Jp="crt-terminal",Xp="0.1.0",Zp="CRT phosphor terminal — near-black, acid green glow, cyan accents, monospace.",ef="CRT terminal — void bg, cream type, phosphor green + cyan accents (matches RetroNet gallery).",tf="MIT",nf="Timur Isachenko",rf={bg:"#06040a",bg2:"#1a1010",text:"#f5f0e8",muted:"#989488",accent:"#39ff14",accent2:"#00f5ff",cardBg:"rgba(57,255,20,0.06)",border:"rgba(57,255,20,0.28)"},af={headingFont:"'VT323', monospace",bodyFont:"'Share Tech Mono', monospace",headingWeight:400,googleFonts:["VT323","Share+Tech+Mono","Courier+Prime"]},of={radius:"0px",slideWidth:"1280px"},Aw={name:Jp,version:Xp,extends:"default-tech",description:Zp,vibe:ef,license:tf,author:nf,roles:rf,typography:af,geometry:of},_w=Object.freeze(Object.defineProperty({__proto__:null,author:nf,default:Aw,description:Zp,geometry:of,license:tf,name:Jp,roles:rf,typography:af,version:Xp,vibe:ef},Symbol.toStringTag,{value:"Module"})),sf="daisy-days",lf="1.0.0",cf="Daisy Days — cream pastels, Fredoka One, hard charcoal outlines (frontend-slides bold-template-pack).",df="Daisy Days — cream #F5F0E6 + turquoise/pink/butter, Fredoka One + Quicksand (frontend-slides daisy-days).",uf="MIT",pf="Timur Isachenko",ff={bg:"#F5F0E6",bg2:"#FFFDF8",text:"#2D2D2D",muted:"#666666",accent:"#7ECDC0",accent2:"#F7C8D4",cardBg:"#FFFFFF",border:"#2D2D2D"},gf={headingFont:"'Fredoka One', cursive",bodyFont:"'Quicksand', system-ui, sans-serif",headingWeight:400,googleFonts:["Fredoka+One","Quicksand:wght@500;600;700"]},hf={radius:"20px",slideWidth:"1280px"},$w={name:sf,version:lf,extends:"default-tech",description:cf,vibe:df,license:uf,author:pf,roles:ff,typography:gf,geometry:hf},Tw=Object.freeze(Object.defineProperty({__proto__:null,author:pf,default:$w,description:cf,geometry:hf,license:uf,name:sf,roles:ff,typography:gf,version:lf,vibe:df},Symbol.toStringTag,{value:"Module"})),mf="dark-botanical",bf="1.0.0",yf="Dark Botanical — Cormorant on near-black with warm pink/gold accents (frontend-slides STYLE_PRESETS).",vf="Dark Botanical — #0f0f0f void, warm #d4a574/#e8b4b8 accents, Cormorant + IBM Plex Sans (frontend-slides Dark Botanical).",xf="MIT",kf="Timur Isachenko",wf={bg:"#0f0f0f",bg2:"#1a1816",text:"#e8e4df",muted:"#9a9590",accent:"#d4a574",accent2:"#e8b4b8",cardBg:"rgba(232,228,223,0.06)",border:"rgba(232,228,223,0.12)"},Df={headingFont:"'Cormorant', Georgia, serif",bodyFont:"'IBM Plex Sans', system-ui, sans-serif",headingWeight:600,googleFonts:["Cormorant:ital,wght@0,400;0,600;1,400;1,600","IBM+Plex+Sans:wght@300;400"]},Cf={radius:"0px",slideWidth:"1280px"},jw={name:mf,version:bf,extends:"default-tech",description:yf,vibe:vf,license:xf,author:kf,roles:wf,typography:Df,geometry:Cf},Pw=Object.freeze(Object.defineProperty({__proto__:null,author:kf,default:jw,description:yf,geometry:Cf,license:xf,name:mf,roles:wf,typography:Df,version:bf,vibe:vf},Symbol.toStringTag,{value:"Module"})),Ff="data-editorial",Ef="0.1.0",Sf="Data editorial — white report field, navy + chart red, Source Serif + Inter.",Af="Data editorial — white/#1a1a1a, navy #2b6cb0 + signal #e63946 (matches Signalbox gallery).",_f="MIT",$f="Timur Isachenko",Tf={bg:"#ffffff",bg2:"#f5f5f5",text:"#1a1a1a",muted:"#616161",accent:"#2b6cb0",accent2:"#e63946",cardBg:"rgba(26,26,26,0.03)",border:"rgba(26,26,26,0.12)"},jf={headingFont:"'Source Serif 4', Georgia, serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:700,googleFonts:["Source+Serif+4:wght@600;700","Inter:wght@400;600"]},Pf={radius:"4px",slideWidth:"1280px"},Mw={name:Ff,version:Ef,extends:"default-tech",description:Sf,vibe:Af,license:_f,author:$f,roles:Tf,typography:jf,geometry:Pf},Nw=Object.freeze(Object.defineProperty({__proto__:null,author:$f,default:Mw,description:Sf,geometry:Pf,license:_f,name:Ff,roles:Tf,typography:jf,version:Ef,vibe:Af},Symbol.toStringTag,{value:"Module"})),Mf="developer-dark",Nf="0.1.0",If="Developer dark — GitHub-night canvas, green success, blue links, JetBrains Mono.",Bf="Developer dark — #0d1117, #3fb950 + #58a6ff, JetBrains Mono + Inter (matches Forge gallery).",zf="MIT",Of="Timur Isachenko",Lf={bg:"#0d1117",bg2:"#161b22",text:"#e6edf3",muted:"#8b949e",accent:"#3fb950",accent2:"#58a6ff",cardBg:"rgba(48,54,61,0.55)",border:"rgba(48,54,61,0.9)"},Gf={headingFont:"'Inter', system-ui, sans-serif",bodyFont:"'JetBrains Mono', monospace",headingWeight:700,googleFonts:["Inter:wght@600;700","JetBrains+Mono:wght@400;600"]},Rf={radius:"8px",slideWidth:"1280px"},Iw={name:Mf,version:Nf,extends:"default-tech",description:If,vibe:Bf,license:zf,author:Of,roles:Lf,typography:Gf,geometry:Rf},Bw=Object.freeze(Object.defineProperty({__proto__:null,author:Of,default:Iw,description:If,geometry:Rf,license:zf,name:Mf,roles:Lf,typography:Gf,version:Nf,vibe:Bf},Symbol.toStringTag,{value:"Module"})),Wf="editorial-forest",Uf="1.0.0",Hf="Editorial Forest — Source Serif 4 on oat-cream with forest green and dusty rose (frontend-slides).",qf="Editorial Forest — cream #efe7d4, forest #2e4a2a + dusty rose #e89cb1, Source Serif 4 + JetBrains Mono (frontend-slides editorial-forest).",Vf="MIT",Qf="Timur Isachenko",Yf={bg:"#efe7d4",bg2:"#e6dcc4",text:"#1a1a17",muted:"#555049",accent:"#2e4a2a",accent2:"#e89cb1",cardBg:"rgba(46,74,42,0.06)",border:"rgba(26,26,23,0.16)"},Kf={headingFont:"'Source Serif 4', 'Source Serif Pro', Georgia, serif",bodyFont:"'Source Serif 4', Georgia, serif",headingWeight:500,googleFonts:["Source+Serif+4:opsz,wght@8..60,500;8..60,600","JetBrains+Mono:wght@400;500"]},Jf={radius:"4px",slideWidth:"1280px"},zw={name:Wf,version:Uf,extends:"default-tech",description:Hf,vibe:qf,license:Vf,author:Qf,roles:Yf,typography:Kf,geometry:Jf},Ow=Object.freeze(Object.defineProperty({__proto__:null,author:Qf,default:zw,description:Hf,geometry:Jf,license:Vf,name:Wf,roles:Yf,typography:Kf,version:Uf,vibe:qf},Symbol.toStringTag,{value:"Module"})),Xf="editorial-serif",Zf="0.1.0",eg="Magazine-editorial theme with warm paper background, ink-black serif text, and a single masthead-crimson accent.",tg="Print magazine editorial — warm cream paper, near-black serif ink, crimson masthead accent, thin hairline rules, square corners.",ng="MIT",rg="Timur Isachenko",ag={bg:"#faf7f2",bg2:"#f2ede3",text:"#1c1a17",muted:"#5c574c",accent:"#9c1c1c",accent2:"#a67c1e",cardBg:"#f2ede3",border:"rgba(28,26,23,0.12)"},og={headingFont:"'Playfair Display', Georgia, serif",bodyFont:"'Source Serif 4', Georgia, serif",headingWeight:700,googleFonts:["Playfair+Display:wght@700;900","Source+Serif+4:wght@400;600"]},ig={radius:"2px",slideWidth:"1280px"},Lw={name:Xf,version:Zf,extends:"default-tech",description:eg,vibe:tg,license:ng,author:rg,roles:ag,typography:og,geometry:ig},Gw=Object.freeze(Object.defineProperty({__proto__:null,author:rg,default:Lw,description:eg,geometry:ig,license:ng,name:Xf,roles:ag,typography:og,version:Zf,vibe:tg},Symbol.toStringTag,{value:"Module"})),sg="editorial-tri-tone",lg="1.0.0",cg="Editorial Tri-Tone — blush pink, golden butter, burgundy wine; Bricolage Grotesque + Instrument Serif (frontend-slides).",dg="Editorial Tri-Tone — pink #F2B6C6, butter #F2D86A, burgundy #7A1F35, Bricolage Grotesque + Instrument Serif (frontend-slides editorial-tri-tone).",ug="MIT",pg="Timur Isachenko",fg={bg:"#F2B6C6",bg2:"#F2D86A",text:"#7A1F35",muted:"#61313d",accent:"#7A1F35",accent2:"#F2D86A",cardBg:"rgba(242,216,106,0.55)",border:"rgba(122,31,53,0.35)"},gg={headingFont:"'Bricolage Grotesque', system-ui, sans-serif",bodyFont:"'Instrument Serif', Georgia, serif",headingWeight:800,googleFonts:["Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800","Instrument+Serif:ital@0;1","JetBrains+Mono:wght@400;500"]},hg={radius:"0px",slideWidth:"1280px"},Rw={name:sg,version:lg,extends:"default-tech",description:cg,vibe:dg,license:ug,author:pg,roles:fg,typography:gg,geometry:hg},Ww=Object.freeze(Object.defineProperty({__proto__:null,author:pg,default:Rw,description:cg,geometry:hg,license:ug,name:sg,roles:fg,typography:gg,version:lg,vibe:dg},Symbol.toStringTag,{value:"Module"})),mg="electric-studio",bg="1.0.0",yg="Electric Studio — split white/blue panels, Manrope, accent bar (frontend-slides STYLE_PRESETS).",vg="Electric Studio — white + #4361ee blue split, Manrope 800, white lead on blue panel (frontend-slides Electric Studio).",xg="MIT",kg="Timur Isachenko",wg={bg:"#ffffff",bg2:"#4361ee",text:"#0a0a0a",muted:"#5a5a5a",accent:"#4361ee",accent2:"#ffffff",cardBg:"rgba(67,97,238,0.08)",border:"rgba(10,10,10,0.12)"},Dg={headingFont:"'Manrope', system-ui, sans-serif",bodyFont:"'Manrope', system-ui, sans-serif",headingWeight:800,googleFonts:["Manrope:wght@400;500;800"]},Cg={radius:"0px",slideWidth:"1280px"},Uw={name:mg,version:bg,extends:"default-tech",description:yg,vibe:vg,license:xg,author:kg,roles:wg,typography:Dg,geometry:Cg},Hw=Object.freeze(Object.defineProperty({__proto__:null,author:kg,default:Uw,description:yg,geometry:Cg,license:xg,name:mg,roles:wg,typography:Dg,version:bg,vibe:vg},Symbol.toStringTag,{value:"Module"})),Fg="emerald-editorial",Eg="1.0.0",Sg="Emerald Editorial — saturated emerald canvas, navy ink, oat paper, Bodoni Moda (frontend-slides bold-template-pack).",Ag="Emerald Editorial — emerald #3CD896, navy #0F1A5C, paper #F1E9D6, Bodoni Moda + Manrope (frontend-slides emerald-editorial).",_g="MIT",$g="Timur Isachenko",Tg={bg:"#3CD896",bg2:"#2DC684",text:"#0F1A5C",muted:"#2a3168",accent:"#0F1A5C",accent2:"#F1E9D6",cardBg:"#F1E9D6",border:"rgba(15,26,92,0.85)"},jg={headingFont:"'Bodoni Moda', Georgia, serif",bodyFont:"'Manrope', system-ui, sans-serif",headingWeight:900,googleFonts:["Bodoni+Moda:opsz,wght@6..96,400;700;800;900","Manrope:wght@400;500;600;700"]},Pg={radius:"0px",slideWidth:"1280px"},qw={name:Fg,version:Eg,extends:"default-tech",description:Sg,vibe:Ag,license:_g,author:$g,roles:Tg,typography:jg,geometry:Pg},Vw=Object.freeze(Object.defineProperty({__proto__:null,author:$g,default:qw,description:Sg,geometry:Pg,license:_g,name:Fg,roles:Tg,typography:jg,version:Eg,vibe:Ag},Symbol.toStringTag,{value:"Module"})),Mg="fintech-clean",Ng="0.1.0",Ig="Fintech clean — near-white, Stripe-like violet accent, mint success, Inter.",Bg="Fintech clean — #fbfbfd, violet #635bff + mint #00d4b1, Inter (matches Ledgerline gallery).",zg="MIT",Og="Timur Isachenko",Lg={bg:"#fbfbfd",bg2:"#f0eeff",text:"#0a0a0a",muted:"#5d636f",accent:"#635bff",accent2:"#00d4b1",cardBg:"#ffffff",border:"rgba(99,91,255,0.18)"},Gg={headingFont:"'Inter', system-ui, sans-serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:700,googleFonts:["Inter:wght@400;600;700"]},Rg={radius:"12px",slideWidth:"1280px"},Qw={name:Mg,version:Ng,extends:"default-tech",description:Ig,vibe:Bg,license:zg,author:Og,roles:Lg,typography:Gg,geometry:Rg},Yw=Object.freeze(Object.defineProperty({__proto__:null,author:Og,default:Qw,description:Ig,geometry:Rg,license:zg,name:Mg,roles:Lg,typography:Gg,version:Ng,vibe:Bg},Symbol.toStringTag,{value:"Module"})),Wg="ft-editorial",Ug="0.1.0",Hg="Financial Times–inspired broadsheet — warm paper, ink, FT blue + signal red.",qg="FT editorial — #f7f5f0 newsprint, Libre Baskerville + IBM Plex, FT blue + signal red (matches Meridian gallery).",Vg="MIT",Qg="Timur Isachenko",Yg={bg:"#f7f5f0",bg2:"#f2efe8",text:"#0a0a0a",muted:"#605b56",accent:"#1a4fd8",accent2:"#c0392b",cardBg:"rgba(10,10,10,0.03)",border:"rgba(10,10,10,0.12)"},Kg={headingFont:"'Libre Baskerville', Georgia, serif",bodyFont:"'IBM Plex Sans', system-ui, sans-serif",headingWeight:700,googleFonts:["Libre+Baskerville:wght@400;700","IBM+Plex+Sans:wght@400;600","IBM+Plex+Mono:wght@500"]},Jg={radius:"0px",slideWidth:"1280px"},Kw={name:Wg,version:Ug,extends:"default-tech",description:Hg,vibe:qg,license:Vg,author:Qg,roles:Yg,typography:Kg,geometry:Jg},Jw=Object.freeze(Object.defineProperty({__proto__:null,author:Qg,default:Kw,description:Hg,geometry:Jg,license:Vg,name:Wg,roles:Yg,typography:Kg,version:Ug,vibe:qg},Symbol.toStringTag,{value:"Module"})),Xg="genz-bento",Zg="0.1.0",eh="Gen-Z hard-shadow bento — hot coral, lime stickers, chunky ink borders.",th="Gen-Z bento — #fff9f5, coral #ff4d2e + lime #b6f542, Nunito hard shadows (matches Bounce gallery).",nh="MIT",rh="Timur Isachenko",ah={bg:"#fff9f5",bg2:"#fff3ea",text:"#0f0f1a",muted:"#5c5666",accent:"#ff4d2e",accent2:"#b6f542",cardBg:"#ffffff",border:"#0f0f1a"},oh={headingFont:"'Nunito', system-ui, sans-serif",bodyFont:"'Nunito Sans', system-ui, sans-serif",headingWeight:900,googleFonts:["Nunito:wght@700;800;900","Nunito+Sans:wght@400;600"]},ih={radius:"18px",slideWidth:"1280px"},Xw={name:Xg,version:Zg,extends:"default-tech",description:eh,vibe:th,license:nh,author:rh,roles:ah,typography:oh,geometry:ih},Zw=Object.freeze(Object.defineProperty({__proto__:null,author:rh,default:Xw,description:eh,geometry:ih,license:nh,name:Xg,roles:ah,typography:oh,version:Zg,vibe:th},Symbol.toStringTag,{value:"Module"})),sh="glassmorphism",lh="0.1.0",ch="Soft glassmorphism — icy lavender field, indigo + cyan accents, Plus Jakarta Sans.",dh="Glassmorphism — #f8f9ff mist, indigo #5b6af5 + cyan #22d3ee, Plus Jakarta Sans (matches CloudPeak gallery).",uh="MIT",ph="Timur Isachenko",fh={bg:"#f8f9ff",bg2:"#f0f3fd",text:"#0f1333",muted:"#5a6285",accent:"#5b6af5",accent2:"#22d3ee",cardBg:"rgba(255,255,255,0.72)",border:"rgba(91,106,245,0.22)"},gh={headingFont:"'Plus Jakarta Sans', system-ui, sans-serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:700,googleFonts:["Plus+Jakarta+Sans:wght@500;700","Inter:wght@400;600"]},hh={radius:"20px",slideWidth:"1280px"},eD={name:sh,version:lh,extends:"default-tech",description:ch,vibe:dh,license:uh,author:ph,roles:fh,typography:gh,geometry:hh},tD=Object.freeze(Object.defineProperty({__proto__:null,author:ph,default:eD,description:ch,geometry:hh,license:uh,name:sh,roles:fh,typography:gh,version:lh,vibe:dh},Symbol.toStringTag,{value:"Module"})),mh="grove",bh="1.0.0",yh="Grove — forest green monograph, Playfair 400 + rust accent (frontend-slides bold-template-pack).",vh="Grove — #192B1B forest + #D4CFBF cream + #C8524A rust, Playfair + Jost (frontend-slides grove).",xh="MIT",kh="Timur Isachenko",wh={bg:"#192B1B",bg2:"#1E3221",text:"#D4CFBF",muted:"#989c8d",accent:"#C8524A",accent2:"#E8E4D6",cardBg:"#1E3221",border:"rgba(212,207,191,0.12)"},Dh={headingFont:"'Playfair Display', Georgia, serif",bodyFont:"'Jost', system-ui, sans-serif",headingWeight:400,googleFonts:["Playfair+Display:ital,wght@0,400;1,400","Jost:wght@300;400;500","JetBrains+Mono:wght@300"]},Ch={radius:"0px",slideWidth:"1280px"},nD={name:mh,version:bh,extends:"default-tech",description:yh,vibe:vh,license:xh,author:kh,roles:wh,typography:Dh,geometry:Ch},rD=Object.freeze(Object.defineProperty({__proto__:null,author:kh,default:nD,description:yh,geometry:Ch,license:xh,name:mh,roles:wh,typography:Dh,version:bh,vibe:vh},Symbol.toStringTag,{value:"Module"})),Fh="heritage-editorial",Eh="0.1.0",Sh="Heritage editorial — warm parchment, terracotta blush, Playfair + Cormorant serif.",Ah="Heritage editorial — #f4efe9 parchment, terracotta #c98b7a, Playfair Display (matches Atelier No. 9 gallery).",_h="MIT",$h="Timur Isachenko",Th={bg:"#f4efe9",bg2:"#ede6dd",text:"#16130f",muted:"#6b5d53",accent:"#c98b7a",accent2:"#a07854",cardBg:"rgba(22,19,15,0.04)",border:"rgba(22,19,15,0.12)"},jh={headingFont:"'Playfair Display', Georgia, serif",bodyFont:"'DM Sans', system-ui, sans-serif",headingWeight:700,googleFonts:["Playfair+Display:wght@500;700","Cormorant+Garamond:wght@500;600","DM+Sans:wght@400;600"]},Ph={radius:"6px",slideWidth:"1280px"},aD={name:Fh,version:Eh,extends:"default-tech",description:Sh,vibe:Ah,license:_h,author:$h,roles:Th,typography:jh,geometry:Ph},oD=Object.freeze(Object.defineProperty({__proto__:null,author:$h,default:aD,description:Sh,geometry:Ph,license:_h,name:Fh,roles:Th,typography:jh,version:Eh,vibe:Ah},Symbol.toStringTag,{value:"Module"})),Mh="kinetic-wrapped",Nh="0.1.0",Ih="Kinetic Wrapped — acid lime on black, Archivo Black, year-in-review energy.",Bh="Kinetic Wrapped — black + #c8ff00 acid lime, Archivo Black (matches Pulse gallery).",zh="MIT",Oh="Timur Isachenko",Lh={bg:"#0a0a0a",bg2:"#0d0d0d",text:"#ffffff",muted:"#9c9c9c",accent:"#c8ff00",accent2:"#ff00cc",cardBg:"rgba(200,255,0,0.08)",border:"rgba(200,255,0,0.4)"},Gh={headingFont:"'Archivo Black', system-ui, sans-serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:400,googleFonts:["Archivo+Black","Inter:wght@400;600"]},Rh={radius:"0px",slideWidth:"1280px"},iD={name:Mh,version:Nh,extends:"default-tech",description:Ih,vibe:Bh,license:zh,author:Oh,roles:Lh,typography:Gh,geometry:Rh},sD=Object.freeze(Object.defineProperty({__proto__:null,author:Oh,default:iD,description:Ih,geometry:Rh,license:zh,name:Mh,roles:Lh,typography:Gh,version:Nh,vibe:Bh},Symbol.toStringTag,{value:"Module"})),Wh="long-table",Uh="1.0.0",Hh="Long Table — single-ink rust on cream supper club (frontend-slides bold-template-pack).",qh="Long Table — cream #FAF1E2 + rust #B53D2A, Bricolage Grotesque + Fraunces (frontend-slides long-table).",Vh="MIT",Qh="Timur Isachenko",Yh={bg:"#FAF1E2",bg2:"#F2E5CF",text:"#B53D2A",muted:"#934232",accent:"#B53D2A",accent2:"#8E2D1F",cardBg:"#F2E5CF",border:"rgba(181,61,42,0.5)"},Kh={headingFont:"'Bricolage Grotesque', sans-serif",bodyFont:"'Fraunces', Georgia, serif",headingWeight:800,googleFonts:["Bricolage+Grotesque:wght@700;800","Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,400"]},Jh={radius:"9999px",slideWidth:"1280px"},lD={name:Wh,version:Uh,extends:"default-tech",description:Hh,vibe:qh,license:Vh,author:Qh,roles:Yh,typography:Kh,geometry:Jh},cD=Object.freeze(Object.defineProperty({__proto__:null,author:Qh,default:lD,description:Hh,geometry:Jh,license:Vh,name:Wh,roles:Yh,typography:Kh,version:Uh,vibe:qh},Symbol.toStringTag,{value:"Module"})),Xh="luxury-minimalist",Zh="0.1.0",em="Luxury minimalist theme with warm off-white canvas, dark charcoal, hairline borders, and no gradients.",tm="Luxury minimalist — warm off-white canvas, dark charcoal text, near-zero decoration, generous whitespace, thin serif display, hairline borders, no gradients.",nm="MIT",rm="Timur Isachenko",am={bg:"#faf8f5",bg2:"#f5f2ee",text:"#1c1917",muted:"#635d59",accent:"#92400e",accent2:"#b45309",cardBg:"rgba(28,25,23,0.03)",border:"rgba(28,25,23,0.10)"},om={headingFont:"'Cormorant Garamond', Georgia, serif",bodyFont:"'DM Sans', system-ui, sans-serif",headingWeight:600,googleFonts:["Cormorant+Garamond:wght@400;600","DM+Sans:wght@400;500"]},im={radius:"4px",slideWidth:"1280px"},dD={name:Xh,version:Zh,extends:"default-tech",description:em,vibe:tm,license:nm,author:rm,roles:am,typography:om,geometry:im},uD=Object.freeze(Object.defineProperty({__proto__:null,author:rm,default:dD,description:em,geometry:im,license:nm,name:Xh,roles:am,typography:om,version:Zh,vibe:tm},Symbol.toStringTag,{value:"Module"})),sm="mat",lm="1.0.0",cm="Mat — dark sage + wood glow, Bricolage + burnt orange (frontend-slides bold-template-pack).",dm="Mat — sage #232E26 + cream #F0E8D2 + orange #C07030, Bricolage + DM Sans (frontend-slides mat).",um="MIT",pm="Timur Isachenko",fm={bg:"#232E26",bg2:"#2E3D30",text:"#F0E8D2",muted:"#b8b4a4",accent:"#C07030",accent2:"#7A4E24",cardBg:"#EDE6D0",border:"rgba(240,232,210,0.12)"},gm={headingFont:"'Bricolage Grotesque', sans-serif",bodyFont:"'DM Sans', system-ui, sans-serif",headingWeight:800,googleFonts:["Bricolage+Grotesque:wght@600;700;800","DM+Sans:wght@400;500;600","DM+Mono:wght@400"]},hm={radius:"0px",slideWidth:"1280px"},pD={name:sm,version:lm,extends:"default-tech",description:cm,vibe:dm,license:um,author:pm,roles:fm,typography:gm,geometry:hm},fD=Object.freeze(Object.defineProperty({__proto__:null,author:pm,default:pD,description:cm,geometry:hm,license:um,name:sm,roles:fm,typography:gm,version:lm,vibe:dm},Symbol.toStringTag,{value:"Module"})),mm="monochrome",bm="1.0.0",ym="Monochrome — ivory ledger, ultra-light Jost, no chromatic accents (frontend-slides bold-template-pack).",vm="Monochrome — ivory #FAFADF + ink #1A1A16, Jost 200 + Lora italic (frontend-slides monochrome).",xm="MIT",km="Timur Isachenko",wm={bg:"#FAFADF",bg2:"#F5F0E4",text:"#1A1A16",muted:"#59594f",accent:"#1A1A16",accent2:"#8A8A80",cardBg:"#F5F0E4",border:"rgba(26,26,22,0.18)"},Dm={headingFont:"'Jost', system-ui, sans-serif",bodyFont:"'Jost', system-ui, sans-serif",headingWeight:200,googleFonts:["Jost:wght@200;300;400;500","Lora:ital,wght@0,400;0,500;1,400","JetBrains+Mono:wght@400"]},Cm={radius:"16px",slideWidth:"1280px"},gD={name:mm,version:bm,extends:"default-tech",description:ym,vibe:vm,license:xm,author:km,roles:wm,typography:Dm,geometry:Cm},hD=Object.freeze(Object.defineProperty({__proto__:null,author:km,default:gD,description:ym,geometry:Cm,license:xm,name:mm,roles:wm,typography:Dm,version:bm,vibe:vm},Symbol.toStringTag,{value:"Module"})),Fm="neo-grid-bold",Em="1.0.0",Sm="Neo-Grid Bold — putty ecru, ink black, electric lemon panels, Space Grotesk uppercase (frontend-slides).",Am="Neo-Grid Bold — putty #ECECE8, lemon #E6FF3D, Space Grotesk uppercase + JetBrains Mono (frontend-slides neo-grid-bold).",_m="MIT",$m="Timur Isachenko",Tm={bg:"#ECECE8",bg2:"#F5F4EF",text:"#0A0A0A",muted:"#6b6b67",accent:"#E6FF3D",accent2:"#0A0A0A",cardBg:"#F5F4EF",border:"rgba(10,10,10,0.85)"},jm={headingFont:"'Space Grotesk', Helvetica Neue, Arial, sans-serif",bodyFont:"'JetBrains Mono', monospace",headingWeight:700,googleFonts:["Space+Grotesk:wght@500;700","JetBrains+Mono:wght@400;500"]},Pm={radius:"0px",slideWidth:"1280px"},mD={name:Fm,version:Em,extends:"default-tech",description:Sm,vibe:Am,license:_m,author:$m,roles:Tm,typography:jm,geometry:Pm},bD=Object.freeze(Object.defineProperty({__proto__:null,author:$m,default:mD,description:Sm,geometry:Pm,license:_m,name:Fm,roles:Tm,typography:jm,version:Em,vibe:Am},Symbol.toStringTag,{value:"Module"})),Mm="neon-noir",Nm="0.1.0",Im="Neon noir — wet asphalt night, hot magenta + electric cyan, cinematic rain.",Bm="Neon noir — #050510 night, hot pink #ff2e97 + cyan #00e5ff, Orbitron (matches Neon District gallery).",zm="MIT",Om="Timur Isachenko",Lm={bg:"#050510",bg2:"#0a0a1e",text:"#e8e4f0",muted:"#8884a8",accent:"#ff2e97",accent2:"#00e5ff",cardBg:"rgba(255,46,151,0.07)",border:"rgba(0,229,255,0.22)"},Gm={headingFont:"'Orbitron', system-ui, sans-serif",bodyFont:"'Share Tech Mono', monospace",headingWeight:700,googleFonts:["Orbitron:wght@600;700","Share+Tech+Mono"]},Rm={radius:"10px",slideWidth:"1280px"},yD={name:Mm,version:Nm,extends:"default-tech",description:Im,vibe:Bm,license:zm,author:Om,roles:Lm,typography:Gm,geometry:Rm},vD=Object.freeze(Object.defineProperty({__proto__:null,author:Om,default:yD,description:Im,geometry:Rm,license:zm,name:Mm,roles:Lm,typography:Gm,version:Nm,vibe:Bm},Symbol.toStringTag,{value:"Module"})),Wm="notebook-tabs",Um="1.0.0",Hm="Notebook Tabs — cream paper card on dark with mint/lavender/pink tabs, Bodoni Moda (frontend-slides STYLE_PRESETS).",qm="Notebook Tabs — page #f8f6f1 on outer #2d2d2d, Bodoni Moda + DM Sans, pastel tabs (frontend-slides Notebook Tabs).",Vm="MIT",Qm="Timur Isachenko",Ym={bg:"#f8f6f1",bg2:"#efece4",text:"#1a1a1a",muted:"#5c574c",accent:"#98d4bb",accent2:"#c7b8ea",cardBg:"#ffffff",border:"rgba(26,26,26,0.12)"},Km={headingFont:"'Bodoni Moda', Georgia, serif",bodyFont:"'DM Sans', system-ui, sans-serif",headingWeight:700,googleFonts:["Bodoni+Moda:opsz,wght@6..96,400;6..96,700","DM+Sans:wght@400;500"]},Jm={radius:"12px",slideWidth:"1280px"},xD={name:Wm,version:Um,extends:"default-tech",description:Hm,vibe:qm,license:Vm,author:Qm,roles:Ym,typography:Km,geometry:Jm},kD=Object.freeze(Object.defineProperty({__proto__:null,author:Qm,default:xD,description:Hm,geometry:Jm,license:Vm,name:Wm,roles:Ym,typography:Km,version:Um,vibe:qm},Symbol.toStringTag,{value:"Module"})),Xm="paper-ink",Zm="1.0.0",eb="Paper & Ink — Cormorant Garamond + Source Serif 4 on warm cream with crimson accent (frontend-slides STYLE_PRESETS).",tb="Paper & Ink — cream #faf9f7, charcoal #1a1a1a, crimson #c41e3a, Cormorant Garamond + Source Serif 4 (frontend-slides Paper & Ink).",nb="MIT",rb="Timur Isachenko",ab={bg:"#faf9f7",bg2:"#f0eeea",text:"#1a1a1a",muted:"#5c574c",accent:"#c41e3a",accent2:"#1a1a1a",cardBg:"#ffffff",border:"rgba(26,26,26,0.15)"},ob={headingFont:"'Cormorant Garamond', Garamond, Georgia, serif",bodyFont:"'Source Serif 4', Georgia, serif",headingWeight:600,googleFonts:["Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500","Source+Serif+4:opsz,wght@8..60,400;8..60,600"]},ib={radius:"0px",slideWidth:"1280px"},wD={name:Xm,version:Zm,extends:"default-tech",description:eb,vibe:tb,license:nb,author:rb,roles:ab,typography:ob,geometry:ib},DD=Object.freeze(Object.defineProperty({__proto__:null,author:rb,default:wD,description:eb,geometry:ib,license:nb,name:Xm,roles:ab,typography:ob,version:Zm,vibe:tb},Symbol.toStringTag,{value:"Module"})),sb="pastel-dreamy",lb="0.1.0",cb="Soft pastel theme with lavender-blush background, deep plum text, and a blush/periwinkle accent pair.",db="Soft pastel dreamy — lavender-blush bg, deep plum text for readability, blush-pink + periwinkle accent pair, generously rounded, gentle.",ub="MIT",pb="Timur Isachenko",fb={bg:"#fdf6fb",bg2:"#f5ecf9",text:"#3a2e4d",muted:"#6b5d82",accent:"#e893c2",accent2:"#8ab4f8",cardBg:"#f5ecf9",border:"rgba(58,46,77,0.10)"},gb={headingFont:"'Quicksand', system-ui, sans-serif",bodyFont:"'Mulish', system-ui, sans-serif",headingWeight:700,googleFonts:["Quicksand:wght@500;700","Mulish:wght@400;600"]},hb={radius:"28px",slideWidth:"1280px"},CD={name:sb,version:lb,extends:"default-tech",description:cb,vibe:db,license:ub,author:pb,roles:fb,typography:gb,geometry:hb},FD=Object.freeze(Object.defineProperty({__proto__:null,author:pb,default:CD,description:cb,geometry:hb,license:ub,name:sb,roles:fb,typography:gb,version:lb,vibe:db},Symbol.toStringTag,{value:"Module"})),mb="pastel-geometry",bb="1.0.0",yb="Pastel Geometry — Plus Jakarta Sans on sky pastel with vertical edge pills (frontend-slides STYLE_PRESETS).",vb="Pastel Geometry — sky #c8d9e6, card #faf9f7, vertical pastel pills, Plus Jakarta Sans (frontend-slides Pastel Geometry).",xb="MIT",kb="Timur Isachenko",wb={bg:"#c8d9e6",bg2:"#b8cddd",text:"#1a1a1a",muted:"#455e51",accent:"#f0b4d4",accent2:"#9b8dc4",cardBg:"#faf9f7",border:"rgba(26,26,26,0.1)"},Db={headingFont:"'Plus Jakarta Sans', system-ui, sans-serif",bodyFont:"'Plus Jakarta Sans', system-ui, sans-serif",headingWeight:800,googleFonts:["Plus+Jakarta+Sans:wght@400;500;700;800"]},Cb={radius:"24px",slideWidth:"1280px"},ED={name:mb,version:bb,extends:"default-tech",description:yb,vibe:vb,license:xb,author:kb,roles:wb,typography:Db,geometry:Cb},SD=Object.freeze(Object.defineProperty({__proto__:null,author:kb,default:ED,description:yb,geometry:Cb,license:xb,name:mb,roles:wb,typography:Db,version:bb,vibe:vb},Symbol.toStringTag,{value:"Module"})),Fb="peoples-platform",Eb="1.0.0",Sb="People's Platform — WPA poster energy, Alfa Slab + red text-shadow (frontend-slides bold-template-pack).",Ab="People's Platform — paper #F5F2EA, cobalt #2C2CDC, amber #F2A03A, Alfa Slab One (frontend-slides peoples-platform).",_b="MIT",$b="Timur Isachenko",Tb={bg:"#F5F2EA",bg2:"#F4E9D6",text:"#0E0E14",muted:"#1B1BB0",accent:"#2C2CDC",accent2:"#F2A03A",cardBg:"#FFFFFF",border:"#0E0E14"},jb={headingFont:"'Alfa Slab One', serif",bodyFont:"'Archivo Narrow', system-ui, sans-serif",headingWeight:400,googleFonts:["Alfa+Slab+One","Caveat+Brush","Archivo+Narrow:wght@400;600;700","DM+Mono:wght@500"]},Pb={radius:"0px",slideWidth:"1280px"},AD={name:Fb,version:Eb,extends:"default-tech",description:Sb,vibe:Ab,license:_b,author:$b,roles:Tb,typography:jb,geometry:Pb},_D=Object.freeze(Object.defineProperty({__proto__:null,author:$b,default:AD,description:Sb,geometry:Pb,license:_b,name:Fb,roles:Tb,typography:jb,version:Eb,vibe:Ab},Symbol.toStringTag,{value:"Module"})),Mb="pin-and-paper",Nb="1.0.0",Ib="Pin & Paper — yellow legal-pad field with cobalt ink, Space Grotesk + Caveat (frontend-slides).",Bb="Pin & Paper — legal pad #EFE56A, cobalt #1F3A8A, Space Grotesk + Caveat (frontend-slides pin-and-paper).",zb="MIT",Ob="Timur Isachenko",Lb={bg:"#EFE56A",bg2:"#F5ECA0",text:"#1F3A8A",muted:"#2e4cac",accent:"#C2342B",accent2:"#D8702A",cardBg:"#F8F1D6",border:"rgba(31,58,138,0.22)"},Gb={headingFont:"'Space Grotesk', Helvetica Neue, Arial, sans-serif",bodyFont:"'Space Grotesk', system-ui, sans-serif",headingWeight:700,googleFonts:["Space+Grotesk:wght@500;700","Caveat:wght@500;700","DM+Mono:wght@400;500"]},Rb={radius:"8px",slideWidth:"1280px"},$D={name:Mb,version:Nb,extends:"default-tech",description:Ib,vibe:Bb,license:zb,author:Ob,roles:Lb,typography:Gb,geometry:Rb},TD=Object.freeze(Object.defineProperty({__proto__:null,author:Ob,default:$D,description:Ib,geometry:Rb,license:zb,name:Mb,roles:Lb,typography:Gb,version:Nb,vibe:Bb},Symbol.toStringTag,{value:"Module"})),Wb="pink-script",Ub="1.0.0",Hb="Pink Script (After Hours) — near-black canvas, fuchsia accent, pearl paper, DM Serif Display (frontend-slides bold-template-pack).",qb="Pink Script — ink #060507, pink #ED3D8C, blush paper #F5EDF1, DM Serif Display + Inter (frontend-slides pink-script).",Vb="MIT",Qb="Timur Isachenko",Yb={bg:"#060507",bg2:"#0F0D11",text:"#F5EDF1",muted:"#898588",accent:"#ED3D8C",accent2:"#FF66A8",cardBg:"rgba(245,237,241,0.06)",border:"rgba(237,61,140,0.32)"},Kb={headingFont:"'DM Serif Display', Georgia, serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:400,googleFonts:["DM+Serif+Display:ital@0;1","Inter:wght@300;400;500;600","JetBrains+Mono:wght@400;500"]},Jb={radius:"0px",slideWidth:"1280px"},jD={name:Wb,version:Ub,extends:"default-tech",description:Hb,vibe:qb,license:Vb,author:Qb,roles:Yb,typography:Kb,geometry:Jb},PD=Object.freeze(Object.defineProperty({__proto__:null,author:Qb,default:jD,description:Hb,geometry:Jb,license:Vb,name:Wb,roles:Yb,typography:Kb,version:Ub,vibe:qb},Symbol.toStringTag,{value:"Module"})),Xb="playful",Zb="0.1.0",e3="Playful creative-agency theme with bold coral and lime accents, rounded corners, and sticker-style energy.",t3="Playful creative agency — bright warm white, bold coral + lime accent pair, rounded everything, big type, sticker-style shadows.",n3="MIT",r3="Timur Isachenko",a3={bg:"#fffbf0",bg2:"#fff9e6",text:"#1a1a2e",muted:"#62627f",accent:"#ff4757",accent2:"#2ed573",cardBg:"rgba(255,71,87,0.06)",border:"rgba(255,71,87,0.15)"},o3={headingFont:"'Nunito', system-ui, sans-serif",bodyFont:"'Nunito', system-ui, sans-serif",headingWeight:800,googleFonts:["Nunito:wght@400;700;800"]},i3={radius:"24px",slideWidth:"1280px"},MD={name:Xb,version:Zb,extends:"default-tech",description:e3,vibe:t3,license:n3,author:r3,roles:a3,typography:o3,geometry:i3},ND=Object.freeze(Object.defineProperty({__proto__:null,author:r3,default:MD,description:e3,geometry:i3,license:n3,name:Xb,roles:a3,typography:o3,version:Zb,vibe:t3},Symbol.toStringTag,{value:"Module"})),s3="raw-grid",l3="1.0.0",c3="Raw Grid — 3px black borders as layout, system sans 900 (frontend-slides bold-template-pack).",d3="Raw Grid — white + #0A0A0A borders, blush #F2D4CF / sage #E5EDD6 (frontend-slides raw-grid).",u3="MIT",p3="Timur Isachenko",f3={bg:"#FFFFFF",bg2:"#F5F5F5",text:"#0A0A0A",muted:"#333333",accent:"#F2D4CF",accent2:"#E5EDD6",cardBg:"#FFFFFF",border:"#0A0A0A"},g3={headingFont:"'Segoe UI', system-ui, -apple-system, Helvetica, Arial, sans-serif",bodyFont:"'Segoe UI', system-ui, -apple-system, Helvetica, Arial, sans-serif",headingWeight:900,googleFonts:[]},h3={radius:"0px",slideWidth:"1280px"},ID={name:s3,version:l3,extends:"default-tech",description:c3,vibe:d3,license:u3,author:p3,roles:f3,typography:g3,geometry:h3},BD=Object.freeze(Object.defineProperty({__proto__:null,author:p3,default:ID,description:c3,geometry:h3,license:u3,name:s3,roles:f3,typography:g3,version:l3,vibe:d3},Symbol.toStringTag,{value:"Module"})),m3="retro-arcade",b3="0.1.0",y3="Retro 80s arcade theme with deep purple-black background, magenta and cyan neon accents, and pixel display fonts.",v3="Retro 80s arcade — deep purple-black bg, magenta + electric cyan neon, glow text-shadow, pixel display font, scanline feel.",x3="MIT",k3="Timur Isachenko",w3={bg:"#0d0015",bg2:"#150025",text:"#e0e0ff",muted:"#9090cc",accent:"#ff00ff",accent2:"#00ffff",cardBg:"rgba(255,0,255,0.08)",border:"rgba(0,255,255,0.20)"},D3={headingFont:"'Orbitron', system-ui, sans-serif",bodyFont:"'Share Tech Mono', monospace",headingWeight:700,googleFonts:["Orbitron:wght@400;700","Share+Tech+Mono"]},C3={radius:"0px",slideWidth:"1280px"},zD={name:m3,version:b3,extends:"default-tech",description:y3,vibe:v3,license:x3,author:k3,roles:w3,typography:D3,geometry:C3},OD=Object.freeze(Object.defineProperty({__proto__:null,author:k3,default:zD,description:y3,geometry:C3,license:x3,name:m3,roles:w3,typography:D3,version:b3,vibe:v3},Symbol.toStringTag,{value:"Module"})),F3="retro-windows",E3="1.0.0",S3="Retro Windows — Win95 beveled chrome, navy title bar (frontend-slides bold-template-pack).",A3="Retro Windows — #C0C0C0 gray, navy #000080 title bar, MS Sans / Press Start 2P (frontend-slides retro-windows).",_3="MIT",$3="Timur Isachenko",T3={bg:"#C0C0C0",bg2:"#D4D0C8",text:"#222222",muted:"#323232",accent:"#000080",accent2:"#008080",cardBg:"#FFFFFF",border:"#000000"},j3={headingFont:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",bodyFont:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",headingWeight:700,googleFonts:["Press+Start+2P","VT323"]},P3={radius:"0px",slideWidth:"1280px"},LD={name:F3,version:E3,extends:"default-tech",description:S3,vibe:A3,license:_3,author:$3,roles:T3,typography:j3,geometry:P3},GD=Object.freeze(Object.defineProperty({__proto__:null,author:$3,default:LD,description:S3,geometry:P3,license:_3,name:F3,roles:T3,typography:j3,version:E3,vibe:A3},Symbol.toStringTag,{value:"Module"})),M3="retro-zine",N3="1.0.0",I3="Retro Zine — khaki paper, forest green, Bebas Neue + Caveat (frontend-slides bold-template-pack).",B3="Retro Zine — khaki #C8B99A + green #008F4D, Bebas Neue + Space Grotesk (frontend-slides retro-zine).",z3="MIT",O3="Timur Isachenko",L3={bg:"#C8B99A",bg2:"#B8A98A",text:"#1A1A1A",muted:"#004827",accent:"#008F4D",accent2:"#00A85D",cardBg:"#F4EFE6",border:"#1A1A1A"},G3={headingFont:"'Bebas Neue', sans-serif",bodyFont:"'Space Grotesk', system-ui, sans-serif",headingWeight:400,googleFonts:["Bebas+Neue","Space+Grotesk:wght@300;400;500","Caveat:wght@400;600"]},R3={radius:"0px",slideWidth:"1280px"},RD={name:M3,version:N3,extends:"default-tech",description:I3,vibe:B3,license:z3,author:O3,roles:L3,typography:G3,geometry:R3},WD=Object.freeze(Object.defineProperty({__proto__:null,author:O3,default:RD,description:I3,geometry:R3,license:z3,name:M3,roles:L3,typography:G3,version:N3,vibe:B3},Symbol.toStringTag,{value:"Module"})),W3="risograph-zine",U3="0.1.0",H3="Risograph zine — warm paper, misregistered ink, magenta + teal print shop energy.",q3="Risograph zine — kraft #f3ecdd, red #ff4f4f + blue #2b3aff overprint (matches Inkwell gallery).",V3="MIT",Q3="Timur Isachenko",Y3={bg:"#f3ecdd",bg2:"#e8dfc8",text:"#1a1209",muted:"#685a46",accent:"#ff4f4f",accent2:"#2b3aff",cardBg:"rgba(255,79,79,0.06)",border:"rgba(26,18,9,0.18)"},K3={headingFont:"'Archivo Black', system-ui, sans-serif",bodyFont:"'Space Mono', monospace",headingWeight:400,googleFonts:["Archivo+Black","Space+Mono:wght@400;700"]},J3={radius:"2px",slideWidth:"1280px"},UD={name:W3,version:U3,extends:"default-tech",description:H3,vibe:q3,license:V3,author:Q3,roles:Y3,typography:K3,geometry:J3},HD=Object.freeze(Object.defineProperty({__proto__:null,author:Q3,default:UD,description:H3,geometry:J3,license:V3,name:W3,roles:Y3,typography:K3,version:U3,vibe:q3},Symbol.toStringTag,{value:"Module"})),X3="sakura-chroma",Z3="1.0.0",ey="Sakura Chroma — cream paper cassette aesthetic, Big Shoulders Display, six-color chroma (frontend-slides bold-template-pack).",ty="Sakura Chroma — paper #F1E6CB, ink #3A2516, red/pink/orange/green/blue/yellow stamps, Big Shoulders Display + Albert Sans (frontend-slides sakura-chroma).",ny="MIT",ry="Timur Isachenko",ay={bg:"#F1E6CB",bg2:"#E5D6B0",text:"#3A2516",muted:"#6B5340",accent:"#E5392A",accent2:"#E54489",cardBg:"#FFF8E8",border:"rgba(58,37,22,0.85)"},oy={headingFont:"'Big Shoulders Display', Impact, sans-serif",bodyFont:"'Albert Sans', system-ui, sans-serif",headingWeight:900,googleFonts:["Big+Shoulders+Display:wght@700;800;900","Albert+Sans:wght@400;500;600;700","JetBrains+Mono:wght@400;500"]},iy={radius:"4px",slideWidth:"1280px"},qD={name:X3,version:Z3,extends:"default-tech",description:ey,vibe:ty,license:ny,author:ry,roles:ay,typography:oy,geometry:iy},VD=Object.freeze(Object.defineProperty({__proto__:null,author:ry,default:qD,description:ey,geometry:iy,license:ny,name:X3,roles:ay,typography:oy,version:Z3,vibe:ty},Symbol.toStringTag,{value:"Module"})),sy="scandinavian",ly="0.1.0",cy="Scandinavian hygge — warm linen, sage green, soft clay, Fraunces + Work Sans.",dy="Scandinavian — #efe9df linen, sage #9caf88 + clay #c9826b (matches Hygge gallery).",uy="MIT",py="Timur Isachenko",fy={bg:"#efe9df",bg2:"#e6ddd1",text:"#2b2926",muted:"#65605c",accent:"#9caf88",accent2:"#c9826b",cardBg:"rgba(43,41,38,0.04)",border:"rgba(43,41,38,0.1)"},gy={headingFont:"'Fraunces', Georgia, serif",bodyFont:"'Work Sans', system-ui, sans-serif",headingWeight:600,googleFonts:["Fraunces:wght@500;600;700","Work+Sans:wght@400;600"]},hy={radius:"16px",slideWidth:"1280px"},QD={name:sy,version:ly,extends:"default-tech",description:cy,vibe:dy,license:uy,author:py,roles:fy,typography:gy,geometry:hy},YD=Object.freeze(Object.defineProperty({__proto__:null,author:py,default:QD,description:cy,geometry:hy,license:uy,name:sy,roles:fy,typography:gy,version:ly,vibe:dy},Symbol.toStringTag,{value:"Module"})),my="scatterbrain",by="1.0.0",yy="Scatterbrain — post-it workshop board, Shrikhand + Caveat (frontend-slides bold-template-pack).",vy="Scatterbrain — cream cork #FAF8F3, sticky yellows/pinks, Shrikhand + Zilla Slab (frontend-slides scatterbrain).",xy="MIT",ky="Timur Isachenko",wy={bg:"#FAF8F3",bg2:"#F7F5F0",text:"#2D2A26",muted:"#5C5750",accent:"#FFE066",accent2:"#FFC9C9",cardBg:"#FFE066",border:"rgba(45,42,38,0.18)"},Dy={headingFont:"'Shrikhand', cursive",bodyFont:"'Zilla Slab', Georgia, serif",headingWeight:400,googleFonts:["Shrikhand","Zilla+Slab:wght@400;500;600","Caveat:wght@400;600"]},Cy={radius:"4px",slideWidth:"1280px"},KD={name:my,version:by,extends:"default-tech",description:yy,vibe:vy,license:xy,author:ky,roles:wy,typography:Dy,geometry:Cy},JD=Object.freeze(Object.defineProperty({__proto__:null,author:ky,default:KD,description:yy,geometry:Cy,license:xy,name:my,roles:wy,typography:Dy,version:by,vibe:vy},Symbol.toStringTag,{value:"Module"})),Fy="signal",Ey="1.0.0",Sy="Signal — dual cream/navy editorial with antique gold accent, Source Serif 4 (frontend-slides).",Ay="Signal — cream #F0ECE3 / navy #1C2644, gold #C8A870, Source Serif 4 + DM Sans (frontend-slides signal).",_y="MIT",$y="Timur Isachenko",Ty={bg:"#F0ECE3",bg2:"#E6E0D4",text:"#1A2030",muted:"#5A6270",accent:"#C8A870",accent2:"#1C2644",cardBg:"rgba(28,38,68,0.05)",border:"rgba(202,196,180,1)"},jy={headingFont:"'Source Serif 4', Georgia, serif",bodyFont:"'DM Sans', system-ui, sans-serif",headingWeight:600,googleFonts:["Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400","DM+Sans:wght@400;500","IBM+Plex+Mono:wght@400;500"]},Py={radius:"2px",slideWidth:"1280px"},XD={name:Fy,version:Ey,extends:"default-tech",description:Sy,vibe:Ay,license:_y,author:$y,roles:Ty,typography:jy,geometry:Py},ZD=Object.freeze(Object.defineProperty({__proto__:null,author:$y,default:XD,description:Sy,geometry:Py,license:_y,name:Fy,roles:Ty,typography:jy,version:Ey,vibe:Ay},Symbol.toStringTag,{value:"Module"})),My="soft-editorial",Ny="1.0.0",Iy="Soft Editorial — Cormorant Garamond on warm cream paper with sage, blush, lemon, and lilac accents (frontend-slides / beautiful-html-templates).",By="Soft Editorial — paper #F2EEDF, ink #2A241B, sage #B7C7A8 + blush #E1A4C2, Cormorant Garamond + Work Sans (frontend-slides soft-editorial).",zy="MIT",Oy="Timur Isachenko",Ly={bg:"#F2EEDF",bg2:"#ECE6D2",text:"#2A241B",muted:"#4A4338",accent:"#B7C7A8",accent2:"#E1A4C2",cardBg:"rgba(255,255,255,0.78)",border:"rgba(42,36,27,0.22)"},Gy={headingFont:"'Cormorant Garamond', Garamond, Georgia, serif",bodyFont:"'Work Sans', system-ui, sans-serif",headingWeight:500,googleFonts:["Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600","Work+Sans:wght@400;500;600"]},Ry={radius:"28px",slideWidth:"1280px"},eC={name:My,version:Ny,extends:"default-tech",description:Iy,vibe:By,license:zy,author:Oy,roles:Ly,typography:Gy,geometry:Ry},tC=Object.freeze(Object.defineProperty({__proto__:null,author:Oy,default:eC,description:Iy,geometry:Ry,license:zy,name:My,roles:Ly,typography:Gy,version:Ny,vibe:By},Symbol.toStringTag,{value:"Module"})),Wy="split-pastel",Uy="1.0.0",Hy="Split Pastel — peach/lavender vertical split, Outfit, playful badges (frontend-slides STYLE_PRESETS).",qy="Split Pastel — peach #f5e6dc / lavender #e4dff0 split, Outfit, mint/yellow/pink badges (frontend-slides Split Pastel).",Vy="MIT",Qy="Timur Isachenko",Yy={bg:"#f5e6dc",bg2:"#e4dff0",text:"#1a1a1a",muted:"#6a6570",accent:"#c8f0d8",accent2:"#f0d4e0",cardBg:"rgba(255,255,255,0.65)",border:"rgba(26,26,26,0.1)"},Ky={headingFont:"'Outfit', system-ui, sans-serif",bodyFont:"'Outfit', system-ui, sans-serif",headingWeight:800,googleFonts:["Outfit:wght@400;500;700;800"]},Jy={radius:"20px",slideWidth:"1280px"},nC={name:Wy,version:Uy,extends:"default-tech",description:Hy,vibe:qy,license:Vy,author:Qy,roles:Yy,typography:Ky,geometry:Jy},rC=Object.freeze(Object.defineProperty({__proto__:null,author:Qy,default:nC,description:Hy,geometry:Jy,license:Vy,name:Wy,roles:Yy,typography:Ky,version:Uy,vibe:qy},Symbol.toStringTag,{value:"Module"})),Xy="stencil-tablet",Zy="1.0.0",ev="Stencil & Tablet — bone paper, Stardos Stencil, earth accents (frontend-slides bold-template-pack).",tv="Stencil & Tablet — bone #E2DCC9 + ink, Stardos Stencil + sienna/magenta/teal blocks (frontend-slides stencil-tablet).",nv="MIT",rv="Timur Isachenko",av={bg:"#E2DCC9",bg2:"#F4EFE0",text:"#0A0A0A",muted:"#4e5520",accent:"#A06A3C",accent2:"#C73B7A",cardBg:"#F4EFE0",border:"#000000"},ov={headingFont:"'Stardos Stencil', serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:700,googleFonts:["Stardos+Stencil:wght@700","Barlow+Condensed:wght@600;700;800;900","Inter:wght@400;500;600"]},iv={radius:"24px",slideWidth:"1280px"},aC={name:Xy,version:Zy,extends:"default-tech",description:ev,vibe:tv,license:nv,author:rv,roles:av,typography:ov,geometry:iv},oC=Object.freeze(Object.defineProperty({__proto__:null,author:rv,default:aC,description:ev,geometry:iv,license:nv,name:Xy,roles:av,typography:ov,version:Zy,vibe:tv},Symbol.toStringTag,{value:"Module"})),sv="studio",lv="1.0.0",cv="Studio — near-black + acid yellow binary, Barlow 900 uppercase (frontend-slides bold-template-pack).",dv="Studio — #1C1C1C field + #F5D200 acid yellow, Barlow 900 + IBM Plex Mono (frontend-slides studio).",uv="MIT",pv="Timur Isachenko",fv={bg:"#1C1C1C",bg2:"#242422",text:"#F5D200",muted:"#bfa70f",accent:"#F5D200",accent2:"#F0CC00",cardBg:"#242422",border:"#2E2E2C"},gv={headingFont:"'Barlow', sans-serif",bodyFont:"'Barlow', system-ui, sans-serif",headingWeight:900,googleFonts:["Barlow:wght@400;500;700;900","IBM+Plex+Mono:wght@500"]},hv={radius:"0px",slideWidth:"1280px"},iC={name:sv,version:lv,extends:"default-tech",description:cv,vibe:dv,license:uv,author:pv,roles:fv,typography:gv,geometry:hv},sC=Object.freeze(Object.defineProperty({__proto__:null,author:pv,default:iC,description:cv,geometry:hv,license:uv,name:sv,roles:fv,typography:gv,version:lv,vibe:dv},Symbol.toStringTag,{value:"Module"})),mv="swiss-typographic",bv="0.1.0",yv="Swiss International Typographic Style — white grid, signal red, Helvetica-like grotesk.",vv="Swiss typographic — pure white, Inter grotesk, signal red, zero radius, modular grid (matches Grid Systems gallery).",xv="MIT",kv="Timur Isachenko",wv={bg:"#ffffff",bg2:"#f5f5f5",text:"#0a0a0a",muted:"#636363",accent:"#e2231a",accent2:"#0a0a0a",cardBg:"rgba(0,0,0,0.03)",border:"rgba(0,0,0,0.12)"},Dv={headingFont:"'Inter', Helvetica, Arial, sans-serif",bodyFont:"'Inter', Helvetica, Arial, sans-serif",headingWeight:800,googleFonts:["Inter:wght@400;600;800"]},Cv={radius:"0px",slideWidth:"1280px"},lC={name:mv,version:bv,extends:"default-tech",description:yv,vibe:vv,license:xv,author:kv,roles:wv,typography:Dv,geometry:Cv},cC=Object.freeze(Object.defineProperty({__proto__:null,author:kv,default:lC,description:yv,geometry:Cv,license:xv,name:mv,roles:wv,typography:Dv,version:bv,vibe:vv},Symbol.toStringTag,{value:"Module"})),Fv="vaporwave",Ev="0.1.0",Sv="Vaporwave — purple dusk, sunset gradient, chrome teal, nostalgic mall energy.",Av="Vaporwave — #1a0533 dusk, #ff6ad5 pink + #5ce1ff teal, Monoton (matches Mallsoft gallery).",_v="MIT",$v="Timur Isachenko",Tv={bg:"#1a0533",bg2:"#2d1060",text:"#fff0f9",muted:"#c4a8ff",accent:"#ff6ad5",accent2:"#5ce1ff",cardBg:"rgba(255,106,213,0.08)",border:"rgba(92,225,255,0.28)"},jv={headingFont:"'Monoton', display, cursive",bodyFont:"'Space Mono', monospace",headingWeight:400,googleFonts:["Monoton","Space+Mono:wght@400;700","VT323"]},Pv={radius:"6px",slideWidth:"1280px"},dC={name:Fv,version:Ev,extends:"default-tech",description:Sv,vibe:Av,license:_v,author:$v,roles:Tv,typography:jv,geometry:Pv},uC=Object.freeze(Object.defineProperty({__proto__:null,author:$v,default:dC,description:Sv,geometry:Pv,license:_v,name:Fv,roles:Tv,typography:jv,version:Ev,vibe:Av},Symbol.toStringTag,{value:"Module"})),Mv="vellum",Nv="1.0.0",Iv="Vellum — deep periwinkle field with chartreuse italic Cormorant type (frontend-slides).",Bv="Vellum — periwinkle #2A3870, chartreuse #E8D85C, italic Cormorant Garamond + DM Sans (frontend-slides vellum).",zv="MIT",Ov="Timur Isachenko",Lv={bg:"#2A3870",bg2:"#1F2858",text:"#E8D85C",muted:"#ceccb0",accent:"#E8D85C",accent2:"#3A7878",cardBg:"rgba(232,216,92,0.08)",border:"rgba(232,216,92,0.20)"},Gv={headingFont:"'Cormorant Garamond', Georgia, serif",bodyFont:"'DM Sans', system-ui, sans-serif",headingWeight:400,googleFonts:["Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500","DM+Sans:wght@400;500","Courier+Prime:wght@400"]},Rv={radius:"0px",slideWidth:"1280px"},pC={name:Mv,version:Nv,extends:"default-tech",description:Iv,vibe:Bv,license:zv,author:Ov,roles:Lv,typography:Gv,geometry:Rv},fC=Object.freeze(Object.defineProperty({__proto__:null,author:Ov,default:pC,description:Iv,geometry:Rv,license:zv,name:Mv,roles:Lv,typography:Gv,version:Nv,vibe:Bv},Symbol.toStringTag,{value:"Module"})),Wv="vintage-editorial",Uv="1.0.0",Hv="Vintage Editorial — Fraunces on cream with geometric accents (frontend-slides STYLE_PRESETS).",qv="Vintage Editorial — cream #f5f3ee, Fraunces display + Work Sans, witty bordered CTAs (frontend-slides Vintage Editorial).",Vv="MIT",Qv="Timur Isachenko",Yv={bg:"#f5f3ee",bg2:"#ebe7de",text:"#1a1a1a",muted:"#555555",accent:"#e8d4c0",accent2:"#1a1a1a",cardBg:"#ffffff",border:"rgba(26,26,26,0.2)"},Kv={headingFont:"'Fraunces', Georgia, serif",bodyFont:"'Work Sans', system-ui, sans-serif",headingWeight:700,googleFonts:["Fraunces:opsz,wght@9..144,700;9..144,900","Work+Sans:wght@400;500"]},Jv={radius:"4px",slideWidth:"1280px"},gC={name:Wv,version:Uv,extends:"default-tech",description:Hv,vibe:qv,license:Vv,author:Qv,roles:Yv,typography:Kv,geometry:Jv},hC=Object.freeze(Object.defineProperty({__proto__:null,author:Qv,default:gC,description:Hv,geometry:Jv,license:Vv,name:Wv,roles:Yv,typography:Kv,version:Uv,vibe:qv},Symbol.toStringTag,{value:"Module"})),Xv="y2k-aero",Zv="0.1.0",e1="Y2K aero — icy gradients, chrome cyan, soft bubbles, futuristic optimism.",t1="Y2K aero — icy #e0f7ff, sky #38bdf8 + lime #a3e635, Nunito (matches BubbleFlow gallery).",n1="MIT",r1="Timur Isachenko",a1={bg:"#e0f7ff",bg2:"#bae6fd",text:"#0c4a6e",muted:"#0369a1",accent:"#38bdf8",accent2:"#a3e635",cardBg:"rgba(255,255,255,0.72)",border:"rgba(14,165,233,0.28)"},o1={headingFont:"'Nunito', system-ui, sans-serif",bodyFont:"'Nunito Sans', system-ui, sans-serif",headingWeight:800,googleFonts:["Nunito:wght@700;800","Nunito+Sans:wght@400;600"]},i1={radius:"32px",slideWidth:"1280px"},mC={name:Xv,version:Zv,extends:"default-tech",description:e1,vibe:t1,license:n1,author:r1,roles:a1,typography:o1,geometry:i1},bC=Object.freeze(Object.defineProperty({__proto__:null,author:r1,default:mC,description:e1,geometry:i1,license:n1,name:Xv,roles:a1,typography:o1,version:Zv,vibe:t1},Symbol.toStringTag,{value:"Module"})),yC={bg:"#0e0e12",bg2:"#16161d",text:"#f4f4f5",muted:"#a1a1aa",accent:"#7c3aed",accent2:"#22d3ee",cardBg:"rgba(255,255,255,0.04)",border:"rgba(255,255,255,0.08)"},vC={headingFont:"'Montserrat', system-ui, sans-serif",bodyFont:"'Open Sans', system-ui, sans-serif",headingWeight:800,googleFonts:["Montserrat:wght@700;800","Open+Sans:wght@400;600"]},xC={radius:"18px",slideWidth:"1280px"},kC={...Object.assign({"../../../core/themes/claude/theme.json":T5,"../../../core/themes/default-tech/theme.json":P5}),...Object.assign({"../../../themes/8-bit-orbit/theme.json":N5,"../../../themes/aerospace-hud/theme.json":B5,"../../../themes/art-deco/theme.json":O5,"../../../themes/aurora-glass/theme.json":G5,"../../../themes/bauhaus/theme.json":W5,"../../../themes/biennale-yellow/theme.json":H5,"../../../themes/block-frame/theme.json":V5,"../../../themes/blue-professional/theme.json":Y5,"../../../themes/blueprint/theme.json":J5,"../../../themes/bold-poster/theme.json":Z5,"../../../themes/bold-signal/theme.json":tw,"../../../themes/botanical-luxe/theme.json":rw,"../../../themes/broadsheet/theme.json":ow,"../../../themes/broadside/theme.json":sw,"../../../themes/brutalist-acid/theme.json":cw,"../../../themes/brutalist-mono/theme.json":uw,"../../../themes/candy-pop/theme.json":fw,"../../../themes/capsule/theme.json":hw,"../../../themes/cartesian/theme.json":bw,"../../../themes/cobalt-grid/theme.json":vw,"../../../themes/coral/theme.json":kw,"../../../themes/corporate/theme.json":Dw,"../../../themes/creative-mode/theme.json":Fw,"../../../themes/creative-voltage/theme.json":Sw,"../../../themes/crt-terminal/theme.json":_w,"../../../themes/daisy-days/theme.json":Tw,"../../../themes/dark-botanical/theme.json":Pw,"../../../themes/data-editorial/theme.json":Nw,"../../../themes/developer-dark/theme.json":Bw,"../../../themes/editorial-forest/theme.json":Ow,"../../../themes/editorial-serif/theme.json":Gw,"../../../themes/editorial-tri-tone/theme.json":Ww,"../../../themes/electric-studio/theme.json":Hw,"../../../themes/emerald-editorial/theme.json":Vw,"../../../themes/fintech-clean/theme.json":Yw,"../../../themes/ft-editorial/theme.json":Jw,"../../../themes/genz-bento/theme.json":Zw,"../../../themes/glassmorphism/theme.json":tD,"../../../themes/grove/theme.json":rD,"../../../themes/heritage-editorial/theme.json":oD,"../../../themes/kinetic-wrapped/theme.json":sD,"../../../themes/long-table/theme.json":cD,"../../../themes/luxury-minimalist/theme.json":uD,"../../../themes/mat/theme.json":fD,"../../../themes/monochrome/theme.json":hD,"../../../themes/neo-grid-bold/theme.json":bD,"../../../themes/neon-noir/theme.json":vD,"../../../themes/notebook-tabs/theme.json":kD,"../../../themes/paper-ink/theme.json":DD,"../../../themes/pastel-dreamy/theme.json":FD,"../../../themes/pastel-geometry/theme.json":SD,"../../../themes/peoples-platform/theme.json":_D,"../../../themes/pin-and-paper/theme.json":TD,"../../../themes/pink-script/theme.json":PD,"../../../themes/playful/theme.json":ND,"../../../themes/raw-grid/theme.json":BD,"../../../themes/retro-arcade/theme.json":OD,"../../../themes/retro-windows/theme.json":GD,"../../../themes/retro-zine/theme.json":WD,"../../../themes/risograph-zine/theme.json":HD,"../../../themes/sakura-chroma/theme.json":VD,"../../../themes/scandinavian/theme.json":YD,"../../../themes/scatterbrain/theme.json":JD,"../../../themes/signal/theme.json":ZD,"../../../themes/soft-editorial/theme.json":tC,"../../../themes/split-pastel/theme.json":rC,"../../../themes/stencil-tablet/theme.json":oC,"../../../themes/studio/theme.json":sC,"../../../themes/swiss-typographic/theme.json":cC,"../../../themes/vaporwave/theme.json":uC,"../../../themes/vellum/theme.json":fC,"../../../themes/vintage-editorial/theme.json":hC,"../../../themes/y2k-aero/theme.json":bC})},ga=new Map;for(const e of Object.values(kC)){const t="default"in e?e.default:e;t!=null&&t.name&&ga.set(t.name,t)}function s1(){return[...ga.keys()].sort()}function wC(){return s1().map(e=>{const t=fn(e),n=t.manifest.vibe??t.manifest.description??e;return{name:e,vibe:n,bg:t.palette.bg,accent:t.palette.accent}})}function fn(e){const t=[];let n=ga.has(e)?e:"default-tech";const r=new Set;for(;n&&!r.has(n);){r.add(n);const l=ga.get(n);if(!l)break;t.unshift(l),n=l.extends}const a={...yC},o={...vC},i={...xC};for(const l of t)Object.assign(a,l.roles??{}),Object.assign(o,l.typography??{}),Object.assign(i,l.geometry??{});const s=t[t.length-1]??{name:"default-tech",version:"0.0.0"};return{name:s.name,version:s.version,manifest:s,palette:a,typography:o,geometry:i}}const DC=`<section class="slide title-slide closing-slide" data-layout="closing">
  {{#eyebrow}}<span class="eyebrow">{{eyebrow}}</span>{{/eyebrow}}
  <h1>{{heading}}</h1>
  {{#lead}}<p class="lead">{{lead}}</p>{{/lead}}
  {{#cta}}<a class="btn" href="{{href}}"><i class="fa-solid fa-arrow-right"></i> {{label}}</a>{{/cta}}
</section>
`,CC=`<section class="slide code-slide" data-layout="code">
  {{#eyebrow}}<span class="eyebrow">{{eyebrow}}</span>{{/eyebrow}}
  {{#heading}}<h2>{{heading}}</h2>{{/heading}}
  {{#lead}}<p class="lead">{{lead}}</p>{{/lead}}
  <div class="code-window">
    <div class="code-chrome" aria-hidden="true">
      <span class="code-dot code-dot-red"></span>
      <span class="code-dot code-dot-amber"></span>
      <span class="code-dot code-dot-green"></span>
      {{#filename}}<span class="code-filename">{{filename}}</span>{{/filename}}
      {{^filename}}{{#language}}<span class="code-filename">{{language}}</span>{{/language}}{{/filename}}
    </div>
    <pre class="code-block"><code>{{code}}</code></pre>
  </div>
</section>
`,FC=`<section class="slide comparison-slide" data-layout="comparison">
  {{#eyebrow}}<span class="eyebrow">{{eyebrow}}</span>{{/eyebrow}}
  {{#heading}}<h2>{{heading}}</h2>{{/heading}}
  <div class="comparison-cols{{#emphasis}} emphasis-{{emphasis}}{{/emphasis}}">
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
`,EC=`<section class="slide data-table-slide" data-layout="data-table">
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
`,SC=`<section class="slide feature-grid-slide" data-layout="feature-grid">
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
`,AC=`<section class="slide image-hero-slide" data-layout="image-hero">
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
`,_C=`<section class="slide quote-slide" data-layout="quote">
  <p class="quote">{{quote}}</p>
  {{#by}}<p class="quote-by">— {{by}}</p>{{/by}}
</section>
`,$C=`<section class="slide section-slide" data-layout="section">
  {{#number}}<div class="section-number">{{number}}</div>{{/number}}
  <h2>{{heading}}</h2>
  {{#lead}}<p class="lead">{{lead}}</p>{{/lead}}
</section>
`,TC=`<section class="slide stat-row-slide" data-layout="stat-row">
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
`,jC=`<section class="slide timeline-slide" data-layout="timeline">
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
`,PC=`<section class="slide title-slide" data-layout="title">
  {{#eyebrow}}<span class="eyebrow">{{eyebrow}}</span>{{/eyebrow}}
  <h1>{{heading}}</h1>
  {{#lead}}<p class="lead">{{lead}}</p>{{/lead}}
</section>
`,MC=`<section class="slide two-column-slide" data-layout="two-column">
  <div class="cols{{#ratio}} ratio-{{ratio}}{{/ratio}}{{#reverse}} cols-reverse{{/reverse}}">
    <div class="cols-copy">
      {{#eyebrow}}<span class="eyebrow">{{eyebrow}}</span>{{/eyebrow}}
      <h2>{{heading}}</h2>
      {{#body}}<p class="lead">{{body}}</p>{{/body}}
    </div>
    {{#image}}<div class="media"><img src="{{image}}" alt="{{imageAlt}}" /></div>{{/image}}
    {{^image}}{{#aside}}<div class="cols-aside"><p>{{aside}}</p></div>{{/aside}}{{/image}}
  </div>
</section>
`;/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */var NC=Object.prototype.toString,yn=Array.isArray||function(t){return NC.call(t)==="[object Array]"};function Zi(e){return typeof e=="function"}function IC(e){return yn(e)?"array":typeof e}function io(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function gl(e,t){return e!=null&&typeof e=="object"&&t in e}function BC(e,t){return e!=null&&typeof e!="object"&&e.hasOwnProperty&&e.hasOwnProperty(t)}var zC=RegExp.prototype.test;function OC(e,t){return zC.call(e,t)}var LC=/\S/;function GC(e){return!OC(LC,e)}var RC={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};function WC(e){return String(e).replace(/[&<>"'`=\/]/g,function(n){return RC[n]})}var UC=/\s*/,HC=/\s+/,hl=/\s*=/,qC=/\s*\}/,VC=/#|\^|\/|>|\{|&|=|!/;function QC(e,t){if(!e)return[];var n=!1,r=[],a=[],o=[],i=!1,s=!1,l="",d=0;function f(){if(i&&!s)for(;o.length;)delete a[o.pop()];else o=[];i=!1,s=!1}var h,m,b;function y(C){if(typeof C=="string"&&(C=C.split(HC,2)),!yn(C)||C.length!==2)throw new Error("Invalid tags: "+C);h=new RegExp(io(C[0])+"\\s*"),m=new RegExp("\\s*"+io(C[1])),b=new RegExp("\\s*"+io("}"+C[1]))}y(t||xe.tags);for(var v=new cr(e),_,p,u,g,x,D;!v.eos();){if(_=v.pos,u=v.scanUntil(h),u)for(var w=0,A=u.length;w<A;++w)g=u.charAt(w),GC(g)?(o.push(a.length),l+=g):(s=!0,n=!0,l+=" "),a.push(["text",g,_,_+1]),_+=1,g===`
`&&(f(),l="",d=0,n=!1);if(!v.scan(h))break;if(i=!0,p=v.scan(VC)||"name",v.scan(UC),p==="="?(u=v.scanUntil(hl),v.scan(hl),v.scanUntil(m)):p==="{"?(u=v.scanUntil(b),v.scan(qC),v.scanUntil(m),p="&"):u=v.scanUntil(m),!v.scan(m))throw new Error("Unclosed tag at "+v.pos);if(p==">"?x=[p,u,_,v.pos,l,d,n]:x=[p,u,_,v.pos],d++,a.push(x),p==="#"||p==="^")r.push(x);else if(p==="/"){if(D=r.pop(),!D)throw new Error('Unopened section "'+u+'" at '+_);if(D[1]!==u)throw new Error('Unclosed section "'+D[1]+'" at '+_)}else p==="name"||p==="{"||p==="&"?s=!0:p==="="&&y(u)}if(f(),D=r.pop(),D)throw new Error('Unclosed section "'+D[1]+'" at '+v.pos);return KC(YC(a))}function YC(e){for(var t=[],n,r,a=0,o=e.length;a<o;++a)n=e[a],n&&(n[0]==="text"&&r&&r[0]==="text"?(r[1]+=n[1],r[3]=n[3]):(t.push(n),r=n));return t}function KC(e){for(var t=[],n=t,r=[],a,o,i=0,s=e.length;i<s;++i)switch(a=e[i],a[0]){case"#":case"^":n.push(a),r.push(a),n=a[4]=[];break;case"/":o=r.pop(),o[5]=a[2],n=r.length>0?r[r.length-1][4]:t;break;default:n.push(a)}return t}function cr(e){this.string=e,this.tail=e,this.pos=0}cr.prototype.eos=function(){return this.tail===""};cr.prototype.scan=function(t){var n=this.tail.match(t);if(!n||n.index!==0)return"";var r=n[0];return this.tail=this.tail.substring(r.length),this.pos+=r.length,r};cr.prototype.scanUntil=function(t){var n=this.tail.search(t),r;switch(n){case-1:r=this.tail,this.tail="";break;case 0:r="";break;default:r=this.tail.substring(0,n),this.tail=this.tail.substring(n)}return this.pos+=r.length,r};function gn(e,t){this.view=e,this.cache={".":this.view},this.parent=t}gn.prototype.push=function(t){return new gn(t,this)};gn.prototype.lookup=function(t){var n=this.cache,r;if(n.hasOwnProperty(t))r=n[t];else{for(var a=this,o,i,s,l=!1;a;){if(t.indexOf(".")>0)for(o=a.view,i=t.split("."),s=0;o!=null&&s<i.length;)s===i.length-1&&(l=gl(o,i[s])||BC(o,i[s])),o=o[i[s++]];else o=a.view[t],l=gl(a.view,t);if(l){r=o;break}a=a.parent}n[t]=r}return Zi(r)&&(r=r.call(this.view)),r};function ge(){this.templateCache={_cache:{},set:function(t,n){this._cache[t]=n},get:function(t){return this._cache[t]},clear:function(){this._cache={}}}}ge.prototype.clearCache=function(){typeof this.templateCache<"u"&&this.templateCache.clear()};ge.prototype.parse=function(t,n){var r=this.templateCache,a=t+":"+(n||xe.tags).join(":"),o=typeof r<"u",i=o?r.get(a):void 0;return i==null&&(i=QC(t,n),o&&r.set(a,i)),i};ge.prototype.render=function(t,n,r,a){var o=this.getConfigTags(a),i=this.parse(t,o),s=n instanceof gn?n:new gn(n,void 0);return this.renderTokens(i,s,r,t,a)};ge.prototype.renderTokens=function(t,n,r,a,o){for(var i="",s,l,d,f=0,h=t.length;f<h;++f)d=void 0,s=t[f],l=s[0],l==="#"?d=this.renderSection(s,n,r,a,o):l==="^"?d=this.renderInverted(s,n,r,a,o):l===">"?d=this.renderPartial(s,n,r,o):l==="&"?d=this.unescapedValue(s,n):l==="name"?d=this.escapedValue(s,n,o):l==="text"&&(d=this.rawValue(s)),d!==void 0&&(i+=d);return i};ge.prototype.renderSection=function(t,n,r,a,o){var i=this,s="",l=n.lookup(t[1]);function d(m){return i.render(m,n,r,o)}if(l){if(yn(l))for(var f=0,h=l.length;f<h;++f)s+=this.renderTokens(t[4],n.push(l[f]),r,a,o);else if(typeof l=="object"||typeof l=="string"||typeof l=="number")s+=this.renderTokens(t[4],n.push(l),r,a,o);else if(Zi(l)){if(typeof a!="string")throw new Error("Cannot use higher-order sections without the original template");l=l.call(n.view,a.slice(t[3],t[5]),d),l!=null&&(s+=l)}else s+=this.renderTokens(t[4],n,r,a,o);return s}};ge.prototype.renderInverted=function(t,n,r,a,o){var i=n.lookup(t[1]);if(!i||yn(i)&&i.length===0)return this.renderTokens(t[4],n,r,a,o)};ge.prototype.indentPartial=function(t,n,r){for(var a=n.replace(/[^ \t]/g,""),o=t.split(`
`),i=0;i<o.length;i++)o[i].length&&(i>0||!r)&&(o[i]=a+o[i]);return o.join(`
`)};ge.prototype.renderPartial=function(t,n,r,a){if(r){var o=this.getConfigTags(a),i=Zi(r)?r(t[1]):r[t[1]];if(i!=null){var s=t[6],l=t[5],d=t[4],f=i;l==0&&d&&(f=this.indentPartial(i,d,s));var h=this.parse(f,o);return this.renderTokens(h,n,r,f,a)}}};ge.prototype.unescapedValue=function(t,n){var r=n.lookup(t[1]);if(r!=null)return r};ge.prototype.escapedValue=function(t,n,r){var a=this.getConfigEscape(r)||xe.escape,o=n.lookup(t[1]);if(o!=null)return typeof o=="number"&&a===xe.escape?String(o):a(o)};ge.prototype.rawValue=function(t){return t[1]};ge.prototype.getConfigTags=function(t){return yn(t)?t:t&&typeof t=="object"?t.tags:void 0};ge.prototype.getConfigEscape=function(t){if(t&&typeof t=="object"&&!yn(t))return t.escape};var xe={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(e){rr.templateCache=e},get templateCache(){return rr.templateCache}},rr=new ge;xe.clearCache=function(){return rr.clearCache()};xe.parse=function(t,n){return rr.parse(t,n)};xe.render=function(t,n,r,a){if(typeof t!="string")throw new TypeError('Invalid template! Template should be a "string" but "'+IC(t)+'" was given as the first argument for mustache#render(template, view, partials)');return rr.render(t,n,r,a)};xe.escape=WC;xe.Scanner=cr;xe.Context=gn;xe.Writer=ge;const JC=`/* presentation-md base stylesheet.
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

/* two-column — balanced by default; ratio-* for asymmetric craft */
.two-column-slide { justify-content: stretch; }
.cols {
  display: flex;
  gap: clamp(28px, 4vw, 56px);
  align-items: center;
  height: 100%;
  min-height: 0;
  width: 100%;
}
.cols > * { flex: 1; min-width: 0; }
.cols.cols-reverse { flex-direction: row-reverse; }
.cols.ratio-2-1 > .cols-copy { flex: 2.1; }
.cols.ratio-2-1 > .media,
.cols.ratio-2-1 > .cols-aside { flex: 1; }
.cols.ratio-1-2 > .cols-copy { flex: 1; }
.cols.ratio-1-2 > .media,
.cols.ratio-1-2 > .cols-aside { flex: 2.1; }
.cols.ratio-3-2 > .cols-copy { flex: 1.55; }
.cols.ratio-3-2 > .media,
.cols.ratio-3-2 > .cols-aside { flex: 1; }
.cols.ratio-2-3 > .cols-copy { flex: 1; }
.cols.ratio-2-3 > .media,
.cols.ratio-2-3 > .cols-aside { flex: 1.55; }
.cols .cols-copy h2 { max-width: 18ch; }
.cols .media { height: 100%; align-self: stretch; }
.cols img {
  width: 100%;
  height: 100%;
  min-height: 280px;
  object-fit: cover;
  border-radius: var(--radius);
  display: block;
}
.cols-aside {
  align-self: stretch;
  display: flex;
  align-items: center;
  padding: 36px 40px;
  background: color-mix(in srgb, var(--accent) 10%, var(--card-bg));
  border: 1px solid color-mix(in srgb, var(--accent) 28%, var(--border));
  border-radius: var(--radius);
  border-left: 4px solid var(--accent);
  position: relative;
}
.cols-aside::before {
  content: "";
  position: absolute;
  top: 28px;
  left: 40px;
  width: 36px;
  height: 3px;
  background: var(--accent);
  border-radius: 2px;
}
.cols-aside p {
  font-family: var(--heading-font);
  font-weight: var(--heading-weight);
  font-size: clamp(22px, 2.6vw, 34px);
  line-height: 1.25;
  letter-spacing: -0.02em;
  color: var(--text);
  margin: 0;
  padding-top: 18px;
}
.cols .cols-copy .lead,
.cols .cols-copy > p.lead {
  font-size: 18px;
  line-height: 1.5;
  max-width: 42ch;
}

/* image-hero — full-bleed photo with bottom scrim + light storytelling motion */
.image-hero-slide { padding: 0; justify-content: flex-end; }
.image-hero-bg { position: absolute; inset: 0; z-index: 0; overflow: hidden; }
.image-hero-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transform: scale(1.06);
  animation: pmd-hero-ken 14s ease-in-out alternate infinite;
}
.image-hero-scrim {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to top, var(--bg) 0%, color-mix(in srgb, var(--bg) 55%, transparent) 42%, transparent 72%),
    linear-gradient(105deg, color-mix(in srgb, var(--bg) 55%, transparent) 0%, transparent 46%);
}
.image-hero-content {
  position: relative;
  z-index: 1;
  padding: 64px;
  width: 100%;
  max-width: 52ch;
  animation: pmd-hero-copy 0.85s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: 120ms;
}
.image-hero-content h2 {
  font-size: clamp(36px, 4.6vw, 64px);
  max-width: 16ch;
  text-shadow: 0 12px 40px color-mix(in srgb, var(--bg) 55%, transparent);
}
.image-hero-content .lead {
  color: color-mix(in srgb, var(--text) 78%, var(--muted));
  max-width: 36ch;
}
@keyframes pmd-hero-ken {
  from { transform: scale(1.06) translate3d(0, 0, 0); }
  to { transform: scale(1.12) translate3d(-1.2%, -0.8%, 0); }
}
@keyframes pmd-hero-copy {
  from { opacity: 0; transform: translateY(22px); }
  to { opacity: 1; transform: translateY(0); }
}

/* comparison — side-by-side contrast */
.comparison-slide { justify-content: flex-start; }
.comparison-slide .comparison-cols {
  display: flex;
  gap: 16px;
  align-items: stretch;
  flex: 1;
  margin-top: 28px;
  min-height: 0;
}
.comparison-col {
  flex: 1;
  padding: 32px 36px;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: calc(var(--radius) * 0.75);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  min-width: 0;
}
.comparison-col:first-child {
  border-color: color-mix(in srgb, var(--muted) 35%, var(--border));
}
.comparison-col:last-child {
  border-color: color-mix(in srgb, var(--accent) 45%, var(--border));
  background: color-mix(in srgb, var(--accent) 8%, var(--card-bg));
}
/* Asymmetric emphasis — grow the winning column */
.comparison-cols.emphasis-right .comparison-col:last-child,
.comparison-cols.emphasis-left .comparison-col:first-child {
  flex: 1.42;
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--accent) 35%, transparent);
}
.comparison-cols.emphasis-right .comparison-col:first-child,
.comparison-cols.emphasis-left .comparison-col:last-child {
  flex: 0.78;
  opacity: 0.88;
  transform: scale(0.985);
  transform-origin: center;
}
.comparison-cols.emphasis-right .comparison-col:last-child .comparison-label,
.comparison-cols.emphasis-left .comparison-col:first-child .comparison-label {
  font-size: 13px;
}
.comparison-col p {
  color: var(--muted);
  font-size: 18px;
  line-height: 1.5;
  white-space: pre-line;
  flex: 1;
}
.comparison-label {
  display: block;
  font-weight: 700;
  color: var(--accent-2);
  margin-bottom: 14px;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.12em;
}
.comparison-col:last-child .comparison-label { color: var(--accent); }
.comparison-vs {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--heading-font);
  font-weight: var(--heading-weight);
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
  opacity: 0.7;
  flex-shrink: 0;
  width: 36px;
}

/* feature grid */
.feature-grid-slide { justify-content: flex-start; }
.grid { display: grid; gap: 20px; margin-top: 28px; flex: 1; align-content: stretch; }
.grid.cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid.cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid.cols-4 { grid-template-columns: repeat(4, 1fr); }
/* Asymmetric bento when agents pass columns: "bento" (5-up: hero + 4) */
.grid.cols-bento {
  grid-template-columns: 1.55fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 14px;
  min-height: 0;
}
.grid.cols-bento .card:first-child {
  grid-row: 1 / span 2;
  justify-content: center;
  padding: 40px 36px;
  background:
    linear-gradient(160deg, color-mix(in srgb, var(--accent) 18%, var(--card-bg)), var(--card-bg) 70%);
  border-color: color-mix(in srgb, var(--accent) 40%, var(--border));
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--accent) 18%, transparent);
}
.grid.cols-bento .card:first-child i { font-size: 32px; margin-bottom: 20px; }
.grid.cols-bento .card:first-child h3 { font-size: clamp(24px, 2.6vw, 34px); margin-bottom: 14px; }
.grid.cols-bento .card:first-child p { font-size: 16px; line-height: 1.5; max-width: 28ch; }
.grid.cols-bento .card:not(:first-child) { padding: 22px 20px; }
.grid.cols-bento .card:not(:first-child) h3 { font-size: 17px; }
.grid.cols-bento .card:not(:first-child) p { font-size: 14px; }

/* Dense two-column compositions — tighter when both panes carry weight */
.cols.ratio-2-1,
.cols.ratio-3-2,
.cols.ratio-1-2,
.cols.ratio-2-3 {
  gap: clamp(22px, 3.2vw, 44px);
}
.cols .cols-copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 0;
}
.cols.ratio-1-2 > .cols-copy h2,
.cols.ratio-2-3 > .cols-copy h2 {
  font-size: clamp(28px, 3.2vw, 42px);
  max-width: 14ch;
}
.cols-aside {
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--accent) 12%, transparent);
}

.card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: calc(var(--radius) * 0.85);
  padding: 28px 26px;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
.card i { color: var(--accent); font-size: 26px; margin-bottom: 16px; display: block; }
.card h3 { font-size: 20px; margin-bottom: 10px; letter-spacing: -0.01em; }
.card p { color: var(--muted); font-size: 15px; line-height: 1.45; }

/* quote */
.quote-slide {
  align-items: flex-start;
  text-align: left;
  justify-content: center;
}
.quote {
  font-family: var(--heading-font);
  font-weight: var(--heading-weight);
  font-size: clamp(30px, 3.8vw, 54px);
  max-width: 28ch;
  line-height: 1.15;
  letter-spacing: -0.02em;
  position: relative;
  padding-left: 28px;
  border-left: 3px solid var(--accent);
}
.quote-by {
  color: var(--muted);
  margin-top: 28px;
  margin-left: 28px;
  font-size: 17px;
  letter-spacing: 0.02em;
}

/* data table */
.data-table-slide { justify-content: flex-start; }
table { width: 100%; border-collapse: collapse; margin-top: 28px; font-size: 17px; }
th, td { text-align: left; padding: 18px 22px; border-bottom: 1px solid var(--border); }
thead th {
  background: color-mix(in srgb, var(--accent) 16%, transparent);
  font-family: var(--heading-font);
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text);
}
tbody tr:last-child td { border-bottom: none; }
tbody tr:hover td {
  background: color-mix(in srgb, var(--accent) 6%, transparent);
}

/* stat row */
.stat-row-slide { justify-content: flex-start; }
.stats {
  display: flex;
  gap: 20px;
  margin-top: 40px;
  flex-wrap: wrap;
  flex: 1;
  align-items: stretch;
}
.stat {
  flex: 1;
  min-width: 140px;
  padding: 8px 8px 8px 0;
  border-top: 2px solid color-mix(in srgb, var(--accent) 55%, var(--border));
  padding-top: 20px;
}
.stat .value {
  font-family: var(--heading-font);
  font-weight: var(--heading-weight);
  font-size: clamp(44px, 5.4vw, 76px);
  color: var(--accent);
  line-height: 0.95;
  letter-spacing: -0.03em;
}
.stat .label {
  color: var(--muted);
  font-size: 15px;
  margin-top: 12px;
  max-width: 18ch;
  line-height: 1.35;
}

/* timeline — horizontal flow with connected rail */
.timeline-slide { justify-content: flex-start; }
.timeline { display: flex; gap: 0; margin-top: 48px; flex: 1; }
.timeline .node { flex: 1; position: relative; padding-right: 28px; min-width: 0; }
.timeline .node::before {
  content: "";
  position: absolute;
  top: 9px;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--accent), var(--border));
}
.timeline .node:last-child::before { right: 60%; }
.timeline .dot {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--accent);
  position: relative;
  z-index: 1;
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 22%, transparent);
}
.timeline .node h3 { font-size: 18px; margin: 22px 0 8px; letter-spacing: -0.01em; }
.timeline .node p { color: var(--muted); font-size: 14px; line-height: 1.4; }

/* code — API / snippet proof slide */
.code-slide { justify-content: flex-start; }
.code-slide .lead { margin-bottom: 8px; }
.code-window {
  margin-top: 24px;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border);
  border-radius: calc(var(--radius) * 0.9);
  overflow: hidden;
  background: color-mix(in srgb, var(--text) 92%, var(--bg));
  box-shadow: 0 18px 48px color-mix(in srgb, var(--text) 12%, transparent);
}
.code-chrome {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: color-mix(in srgb, var(--text) 88%, var(--bg));
  border-bottom: 1px solid color-mix(in srgb, var(--text) 78%, var(--bg));
  flex-shrink: 0;
}
.code-dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  display: inline-block;
}
.code-dot-red { background: #ff5f57; }
.code-dot-amber { background: #ffbd2e; }
.code-dot-green { background: #28ca41; }
.code-filename {
  margin-left: 8px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 12px;
  letter-spacing: 0.04em;
  color: color-mix(in srgb, #fff 55%, transparent);
}
.code-block {
  margin: 0;
  padding: 22px 26px 28px;
  overflow: auto;
  flex: 1;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: clamp(13px, 1.15vw, 15.5px);
  line-height: 1.65;
  color: #e8eaed;
  white-space: pre;
  tab-size: 2;
}
.code-block code {
  font: inherit;
  color: inherit;
  background: none;
  padding: 0;
  border: 0;
}

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
  .slide,
  .image-hero-bg img,
  .image-hero-content { animation: none !important; }
  .image-hero-bg img { transform: none; }
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
`,ml=`/* Per-theme surface profiles — each theme gets a distinct stage, not one shared blob. */

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
/* Content slides: keep glow off the reading plane */
.deck[data-surface="neon-glow"] .slide:not(.title-slide):not(.closing-slide)::after {
  opacity: 0.45;
  width: 420px;
  height: 420px;
  right: -180px;
  top: -160px;
}
.deck[data-surface="neon-glow"] .comparison-col:last-child {
  /* Darken violet fill so white winner copy clears WCAG AA (accent-on-bg labels fail) */
  background: color-mix(in srgb, var(--accent) 72%, #050508);
  color: #fff;
  border-color: color-mix(in srgb, var(--accent) 55%, var(--border));
  box-shadow: 0 0 32px color-mix(in srgb, var(--accent) 28%, transparent);
}
.deck[data-surface="neon-glow"] .comparison-col:last-child .comparison-label,
.deck[data-surface="neon-glow"] .comparison-col:last-child p { color: #fff; }
.deck[data-surface="neon-glow"] .stat .value {
  text-shadow: 0 0 24px color-mix(in srgb, var(--accent) 40%, transparent);
}
.deck[data-surface="neon-glow"] .code-window {
  border-color: color-mix(in srgb, var(--accent2) 35%, var(--border));
  box-shadow: 0 20px 56px rgba(0, 0, 0, 0.45), 0 0 0 1px color-mix(in srgb, var(--accent) 20%, transparent);
}
.deck[data-surface="neon-glow"] .cols-aside {
  background: color-mix(in srgb, var(--accent) 16%, var(--card-bg));
  border-color: color-mix(in srgb, var(--accent) 45%, var(--border));
  box-shadow: inset 0 0 40px color-mix(in srgb, var(--accent) 12%, transparent);
}
.deck[data-surface="neon-glow"] .grid.cols-bento .card:first-child {
  background: color-mix(in srgb, var(--accent) 72%, #050508);
  color: #fff;
  border-color: color-mix(in srgb, var(--accent) 50%, var(--border));
  box-shadow: 0 0 40px color-mix(in srgb, var(--accent) 28%, transparent);
}
.deck[data-surface="neon-glow"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="neon-glow"] .grid.cols-bento .card:first-child p,
.deck[data-surface="neon-glow"] .grid.cols-bento .card:first-child i { color: #fff; }

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
.deck[data-surface="warm-paper"] .slide:not(.title-slide):not(.closing-slide)::after {
  opacity: 0.55;
  width: 200px;
  height: 200px;
}
.deck[data-surface="warm-paper"] .cols-aside {
  background: color-mix(in srgb, var(--accent) 8%, #fff);
  border-color: color-mix(in srgb, var(--accent) 35%, var(--border));
}
.deck[data-surface="warm-paper"] .comparison-col:last-child {
  background: color-mix(in srgb, var(--accent) 6%, #fff);
  border-color: color-mix(in srgb, var(--accent) 40%, var(--border));
}
.deck[data-surface="warm-paper"] .stat {
  border-top: 1px solid color-mix(in srgb, var(--accent) 55%, var(--border));
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
  background: rgba(255,255,255,0.82);
  border-radius: 24px;
  border: 1px solid color-mix(in srgb, var(--text) 16%, transparent);
}
.deck[data-surface="soft-editorial-paper"] .card p,
.deck[data-surface="soft-editorial-paper"] .lead,
.deck[data-surface="soft-editorial-paper"] .eyebrow,
.deck[data-surface="soft-editorial-paper"] .stat .label {
  color: #4A4338;
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
/* Orange focal panel — title/closing only; content slides need full width */
.deck[data-surface="bold-signal-card"] .title-slide::after,
.deck[data-surface="bold-signal-card"] .closing-slide::after {
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
.deck[data-surface="bold-signal-card"] .slide:not(.title-slide):not(.closing-slide)::after {
  display: none;
}
.deck[data-surface="bold-signal-card"] .slide h1 {
  font-weight: 400;
  letter-spacing: -0.02em;
}
.deck[data-surface="bold-signal-card"] .card {
  /* Match roles.cardBg (#43251b) — orange cardBg broke muted/PPTX dual-surface */
  background: color-mix(in srgb, var(--accent) 18%, #1a1a1a);
  color: #ffffff;
  border-radius: 16px;
  border: 1px solid color-mix(in srgb, var(--accent) 45%, transparent);
}
.deck[data-surface="bold-signal-card"] .card i,
.deck[data-surface="bold-signal-card"] .card h3 { color: #ffffff; }
.deck[data-surface="bold-signal-card"] .card p,
.deck[data-surface="bold-signal-card"] .card .lead { color: rgba(255,255,255,0.90); }
.deck[data-surface="bold-signal-card"] .eyebrow,
.deck[data-surface="bold-signal-card"] .stat .label { color: #c8c8c8; }
.deck[data-surface="bold-signal-card"] .comparison-col:last-child {
  /* Orange accent fails white at full strength — keep darkened mix */
  background: color-mix(in srgb, var(--accent) 55%, #1a1a1a);
  color: #fff;
}
.deck[data-surface="bold-signal-card"] .comparison-col:last-child .comparison-label,
.deck[data-surface="bold-signal-card"] .comparison-col:last-child p { color: #fff; }
.deck[data-surface="bold-signal-card"] .grid.cols-bento .card:first-child {
  background: color-mix(in srgb, var(--accent) 55%, #1a1a1a);
  color: #fff;
  border-color: color-mix(in srgb, var(--accent) 45%, transparent);
}
.deck[data-surface="bold-signal-card"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="bold-signal-card"] .grid.cols-bento .card:first-child p,
.deck[data-surface="bold-signal-card"] .grid.cols-bento .card:first-child i { color: #fff; }
.deck[data-surface="bold-signal-card"] .stat {
  border-top-color: var(--accent);
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
  --slide-bg: #1a1a2e;
  border-radius: 0;
  border: 2px solid var(--accent);
  box-shadow: 8px 8px 0 var(--accent);
}
.deck[data-surface="creative-voltage-split"] .title-slide,
.deck[data-surface="creative-voltage-split"] .closing-slide {
  --slide-bg: linear-gradient(90deg, #0066ff 0 48%, #1a1a2e 48% 100%);
}
.deck[data-surface="creative-voltage-split"] .title-slide::after,
.deck[data-surface="creative-voltage-split"] .closing-slide::after {
  width: 88px;
  height: 88px;
  right: 48px;
  top: 40px;
  background: var(--accent);
  filter: none;
  border-radius: 50%;
}
.deck[data-surface="creative-voltage-split"] .slide:not(.title-slide):not(.closing-slide)::after {
  display: none;
}
.deck[data-surface="creative-voltage-split"] .slide h1 {
  text-shadow: 0 0 24px color-mix(in srgb, var(--accent) 45%, transparent);
}
.deck[data-surface="creative-voltage-split"] .card {
  background: #1a1a2e;
  border: 1px solid var(--accent);
  border-radius: 0;
}
.deck[data-surface="creative-voltage-split"] .card p,
.deck[data-surface="creative-voltage-split"] .card .lead { color: rgba(255,255,255,0.92); }
/* Pure white — translucent white fails AA on the electric blue half */
.deck[data-surface="creative-voltage-split"] .title-slide .lead,
.deck[data-surface="creative-voltage-split"] .closing-slide .lead,
.deck[data-surface="creative-voltage-split"] .title-slide .subtitle,
.deck[data-surface="creative-voltage-split"] .closing-slide .subtitle,
.deck[data-surface="creative-voltage-split"] .title-slide .eyebrow,
.deck[data-surface="creative-voltage-split"] .closing-slide .eyebrow {
  color: #ffffff;
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
  --slide-bg: var(--bg);
  border-radius: 0;
  border: 1px solid color-mix(in srgb, var(--text) 18%, transparent);
  box-shadow: 0 18px 48px rgba(10, 10, 10, 0.12);
}
/* Title/closing keep the white→blue split; content slides stay readable white */
.deck[data-surface="electric-studio-split"] .title-slide,
.deck[data-surface="electric-studio-split"] .closing-slide {
  --slide-bg: linear-gradient(180deg, var(--bg) 0 52%, var(--bg-2) 52% 100%);
}
.deck[data-surface="electric-studio-split"] .title-slide::before,
.deck[data-surface="electric-studio-split"] .closing-slide::before {
  left: 0;
  top: 52%;
  bottom: 0;
  width: 8px;
  background: #0a0a0a;
}
.deck[data-surface="electric-studio-split"] .slide:not(.title-slide):not(.closing-slide)::before {
  left: 0;
  top: 0;
  bottom: 0;
  width: 8px;
  background: var(--accent);
}
.deck[data-surface="electric-studio-split"] .slide::after {
  display: none;
}
.deck[data-surface="electric-studio-split"] .slide h1,
.deck[data-surface="electric-studio-split"] .slide h2 {
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #0a0a0a;
  mix-blend-mode: normal;
}
.deck[data-surface="electric-studio-split"] .title-slide .lead,
.deck[data-surface="electric-studio-split"] .title-slide > p,
.deck[data-surface="electric-studio-split"] .title-slide .eyebrow,
.deck[data-surface="electric-studio-split"] .closing-slide .lead,
.deck[data-surface="electric-studio-split"] .closing-slide > p,
.deck[data-surface="electric-studio-split"] .closing-slide .eyebrow {
  color: #ffffff;
}
.deck[data-surface="electric-studio-split"] .slide:not(.title-slide):not(.closing-slide) .lead,
.deck[data-surface="electric-studio-split"] .slide:not(.title-slide):not(.closing-slide) .eyebrow,
.deck[data-surface="electric-studio-split"] .slide:not(.title-slide):not(.closing-slide) p {
  color: var(--muted);
}
.deck[data-surface="electric-studio-split"] .card {
  background: color-mix(in srgb, var(--accent) 8%, #ffffff);
  border-radius: 0;
  border: 1px solid color-mix(in srgb, var(--text) 12%, transparent);
}
.deck[data-surface="electric-studio-split"] .card p { color: var(--muted); }
.deck[data-surface="electric-studio-split"] .comparison-col:last-child {
  background: color-mix(in srgb, var(--accent) 12%, #ffffff);
  color: #0a0a0a;
}
.deck[data-surface="electric-studio-split"] .comparison-col:last-child .comparison-label,
.deck[data-surface="electric-studio-split"] .comparison-col:last-child p { color: #0a0a0a; }
.deck[data-surface="electric-studio-split"] .quote {
  border-left-color: var(--accent);
  color: #0a0a0a;
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
  --slide-bg: var(--bg);
  border-radius: 24px;
  box-shadow: 0 16px 40px rgba(80, 60, 90, 0.12);
}
.deck[data-surface="split-pastel-panels"] .title-slide,
.deck[data-surface="split-pastel-panels"] .closing-slide {
  --slide-bg: linear-gradient(90deg, var(--bg) 0 50%, var(--bg-2) 50% 100%);
}
.deck[data-surface="split-pastel-panels"] .title-slide::before,
.deck[data-surface="split-pastel-panels"] .closing-slide::before {
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
.deck[data-surface="split-pastel-panels"] .slide:not(.title-slide):not(.closing-slide)::before {
  display: none;
}
.deck[data-surface="split-pastel-panels"] .title-slide::after,
.deck[data-surface="split-pastel-panels"] .closing-slide::after {
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
.deck[data-surface="split-pastel-panels"] .slide:not(.title-slide):not(.closing-slide)::after {
  display: none;
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
.deck[data-surface="emerald-editorial-masthead"] .card p,
.deck[data-surface="emerald-editorial-masthead"] .card .lead {
  color: color-mix(in srgb, var(--text) 78%, var(--card-bg));
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
.deck[data-surface="sakura-chroma-cassette"] .title-slide::before,
.deck[data-surface="sakura-chroma-cassette"] .closing-slide::before {
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
.deck[data-surface="sakura-chroma-cassette"] .slide:not(.title-slide):not(.closing-slide)::before {
  display: none;
}
.deck[data-surface="sakura-chroma-cassette"] .title-slide::after,
.deck[data-surface="sakura-chroma-cassette"] .closing-slide::after {
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
.deck[data-surface="sakura-chroma-cassette"] .slide:not(.title-slide):not(.closing-slide)::after {
  display: none;
}
.deck[data-surface="sakura-chroma-cassette"] .slide:not(.title-slide):not(.closing-slide) {
  --slide-bg: var(--bg);
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
.deck[data-surface="block-frame-brutal"] .title-slide::before,
.deck[data-surface="block-frame-brutal"] .closing-slide::before {
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
.deck[data-surface="block-frame-brutal"] .slide:not(.title-slide):not(.closing-slide)::before {
  display: none;
}
.deck[data-surface="block-frame-brutal"] .title-slide::after,
.deck[data-surface="block-frame-brutal"] .closing-slide::after {
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
.deck[data-surface="block-frame-brutal"] .slide:not(.title-slide):not(.closing-slide)::after {
  display: none;
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

/* ── studio-acid (studio) ── */
.deck[data-surface="studio-acid"] .slide {
  --slide-bg: var(--bg);
  border-radius: 0;
  border: 1px solid var(--border);
  box-shadow: none;
}
.deck[data-surface="studio-acid"] .slide::before {
  left: 0;
  right: 0;
  top: 0;
  height: 1px;
  background: var(--border);
  filter: none;
  opacity: 1;
}
.deck[data-surface="studio-acid"] .slide::after {
  left: 0;
  right: 0;
  bottom: 0;
  top: auto;
  height: 1px;
  background: var(--border);
  filter: none;
  opacity: 1;
  border-radius: 0;
}
.deck[data-surface="studio-acid"] .slide h1 {
  font-weight: 900;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  line-height: 0.9;
  color: var(--accent);
}
.deck[data-surface="studio-acid"] .card {
  background: var(--bg-2);
  border: 1px solid var(--border);
  border-radius: 0;
  color: var(--text);
}
/* ── grove-monograph (grove) ── */
.deck[data-surface="grove-monograph"] .slide {
  --slide-bg: var(--bg);
  border-radius: 0;
  border: none;
  box-shadow: inset 0 0 0 1px rgba(212, 207, 191, 0.08);
}
.deck[data-surface="grove-monograph"] .slide::before {
  left: 5%;
  right: 5%;
  top: 6%;
  height: 1px;
  background: rgba(212, 207, 191, 0.18);
  filter: none;
  opacity: 1;
}
.deck[data-surface="grove-monograph"] .slide::after {
  width: 36px;
  height: 2px;
  left: 5%;
  bottom: 8%;
  top: auto;
  background: var(--accent);
  filter: none;
  border-radius: 0;
}
.deck[data-surface="grove-monograph"] .slide h1 {
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 1.08;
}
.deck[data-surface="grove-monograph"] .card {
  background: var(--bg-2);
  border: 1px solid rgba(212, 207, 191, 0.12);
  border-radius: 0;
  color: var(--text);
}
/* ── scatterbrain-cork (scatterbrain) ── */
.deck[data-surface="scatterbrain-cork"] .slide {
  --slide-bg:
    linear-gradient(135deg, #FFE066 0%, #FFD43B 100%) no-repeat 72% 12% / 180px 140px,
    linear-gradient(160deg, #A5D8FF 0%, #74C0FC 100%) no-repeat 88% 58% / 150px 120px,
    linear-gradient(200deg, #FFC9C9 0%, #FF9F9F 100%) no-repeat 8% 62% / 130px 110px,
    radial-gradient(ellipse 80% 60% at 20% 30%, rgba(255, 224, 102, 0.22), transparent 55%),
    repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(45, 42, 38, 0.05) 39px, rgba(45, 42, 38, 0.05) 40px),
    var(--bg);
  border-radius: 8px;
  border: 1px solid rgba(45, 42, 38, 0.12);
  box-shadow:
    6px 8px 0 rgba(45, 42, 38, 0.06),
    inset 0 0 0 1px rgba(255, 255, 255, 0.4);
}
.deck[data-surface="scatterbrain-cork"] .slide::before {
  width: 16px;
  height: 16px;
  right: calc(28% + 72px);
  top: calc(12% + 8px);
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #ff6b6b, #c92a2a 70%);
  box-shadow:
    0 2px 4px rgba(45, 42, 38, 0.25),
    210px 180px 0 0 #74c0fc,
    210px 180px 0 2px rgba(45, 42, 38, 0.15);
  filter: none;
}
.deck[data-surface="scatterbrain-cork"] .slide::after {
  width: 88px;
  height: 22px;
  left: 48px;
  bottom: 48px;
  top: auto;
  background: rgba(255, 236, 153, 0.7);
  border: 1px solid rgba(45, 42, 38, 0.12);
  transform: rotate(-8deg);
  filter: none;
  border-radius: 2px;
  box-shadow: 2px 3px 0 rgba(45, 42, 38, 0.12);
}
.deck[data-surface="scatterbrain-cork"] .slide h1 {
  font-weight: 400;
  letter-spacing: 0.02em;
  line-height: 1.05;
}
.deck[data-surface="scatterbrain-cork"] .card {
  background: linear-gradient(180deg, #FFE066 0%, #FFD43B 100%);
  border: none;
  border-radius: 2px;
  box-shadow: 4px 6px 12px rgba(45, 42, 38, 0.18);
  transform: rotate(-1.2deg);
}
/* ── peoples-platform-poster (peoples-platform) ── */
.deck[data-surface="peoples-platform-poster"] .slide {
  --slide-bg:
    radial-gradient(circle at 1px 1px, rgba(14, 14, 20, 0.06) 1px, transparent 0),
    var(--bg);
  background-size: 4px 4px, auto;
  border-radius: 0;
  border: 6px solid var(--text);
}
.deck[data-surface="peoples-platform-poster"] .slide::before {
  left: 0;
  right: 0;
  top: 0;
  height: 18px;
  background: var(--accent);
  filter: none;
  opacity: 1;
}
.deck[data-surface="peoples-platform-poster"] .slide::after {
  width: 28%;
  height: 14px;
  right: 0;
  bottom: 0;
  top: auto;
  background: var(--accent2);
  filter: none;
  border-radius: 0;
}
.deck[data-surface="peoples-platform-poster"] .slide h1 {
  font-weight: 400;
  letter-spacing: 0.005em;
  text-transform: uppercase;
  line-height: 0.88;
  color: var(--accent);
  text-shadow: 4px 4px 0 #E83A2A, 8px 8px 0 #B7281C;
}
.deck[data-surface="peoples-platform-poster"] .card {
  background: #fff;
  border: 4px solid var(--text);
  border-radius: 0;
  box-shadow: 6px 6px 0 #E83A2A;
}
/* ── retro-windows-chrome (retro-windows) ── */
.deck[data-surface="retro-windows-chrome"] .slide {
  --slide-bg:
    repeating-linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.03) 0px,
      rgba(0, 0, 0, 0.03) 1px,
      transparent 1px,
      transparent 3px
    ),
    var(--bg);
  border-radius: 0;
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  border-right: 2px solid #000;
  border-bottom: 2px solid #000;
  box-shadow: inset 1px 1px 0 #fff, inset -1px -1px 0 #404040;
}
.deck[data-surface="retro-windows-chrome"] .slide::before {
  left: 2px;
  right: 2px;
  top: 2px;
  height: 22px;
  background: linear-gradient(90deg, #000080 0%, #0000A0 100%);
  filter: none;
  opacity: 1;
  border-radius: 0;
}
.deck[data-surface="retro-windows-chrome"] .slide::after {
  width: 54px;
  height: 16px;
  right: 8px;
  top: 5px;
  background:
    linear-gradient(#c0c0c0, #c0c0c0) 0 0 / 16px 14px no-repeat,
    linear-gradient(#c0c0c0, #c0c0c0) 19px 0 / 16px 14px no-repeat,
    linear-gradient(#c0c0c0, #c0c0c0) 38px 0 / 16px 14px no-repeat;
  border: none;
  filter: none;
  box-shadow:
    0 0 0 1px #fff, 1px 1px 0 #000,
    19px 0 0 0 #c0c0c0, 19px 0 0 1px #fff, 20px 1px 0 #000,
    38px 0 0 0 #c0c0c0, 38px 0 0 1px #fff, 39px 1px 0 #000;
}
.deck[data-surface="retro-windows-chrome"] .slide h1 {
  font-weight: 700;
  letter-spacing: 0;
  line-height: 1.2;
  margin-top: 1.2rem;
}
.deck[data-surface="retro-windows-chrome"] .card {
  background: #fff;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  border-radius: 0;
  box-shadow: inset 1px 1px 0 #000;
}
/* ── raw-grid-brutal (raw-grid) ── */
.deck[data-surface="raw-grid-brutal"] .slide {
  --slide-bg:
    linear-gradient(#F2D4CF 0 28%, transparent 28%),
    linear-gradient(90deg, #E5EDD6 0 22%, transparent 22%),
    #FFFFFF;
  border-radius: 0;
  border: 3px solid #0A0A0A;
  box-shadow: 6px 6px 0 #0A0A0A;
}
.deck[data-surface="raw-grid-brutal"] .slide::before {
  width: auto;
  left: 0;
  right: 0;
  top: 28%;
  height: 3px;
  background: #0A0A0A;
  filter: none;
  opacity: 1;
}
.deck[data-surface="raw-grid-brutal"] .slide::after {
  width: 3px;
  left: 22%;
  top: 0;
  bottom: 0;
  height: auto;
  background: #0A0A0A;
  filter: none;
  border-radius: 0;
}
.deck[data-surface="raw-grid-brutal"] .slide h1 {
  font-weight: 900;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  line-height: 1.05;
}
.deck[data-surface="raw-grid-brutal"] .card {
  background: #fff;
  border: 3px solid #0A0A0A;
  border-radius: 0;
  box-shadow: 4px 4px 0 #0A0A0A;
}
/* ── long-table-supper (long-table) ── */
.deck[data-surface="long-table-supper"] .slide {
  --slide-bg:
    radial-gradient(circle, rgba(181, 61, 42, 0.1) 1.1px, transparent 1.2px),
    var(--bg);
  background-size: 12px 12px, auto;
  border-radius: 0;
  border: 1.5px solid rgba(181, 61, 42, 0.5);
}
.deck[data-surface="long-table-supper"] .slide::before {
  width: 88px;
  height: 32px;
  right: 48px;
  top: 40px;
  border-radius: 9999px;
  border: 1.5px solid var(--accent);
  background: transparent;
  filter: none;
}
.deck[data-surface="long-table-supper"] .slide::after {
  width: 48px;
  height: 1.5px;
  left: 48px;
  bottom: 48px;
  top: auto;
  background: var(--accent);
  filter: none;
  border-radius: 0;
}
.deck[data-surface="long-table-supper"] .slide h1 {
  font-weight: 800;
  letter-spacing: -0.012em;
  text-transform: uppercase;
  line-height: 0.92;
  color: var(--accent);
}
.deck[data-surface="long-table-supper"] .card {
  background: var(--bg-2);
  border: 1.5px dashed rgba(181, 61, 42, 0.45);
  border-radius: 1.25rem;
  color: var(--text);
}
/* ── mat-woodglow (mat) ── */
.deck[data-surface="mat-woodglow"] .slide {
  /* Soften wood tint so muted cream stays AA on the wash */
  --slide-bg:
    radial-gradient(ellipse 55% 45% at 88% 100%, color-mix(in srgb, var(--accent2) 28%, transparent), transparent 70%),
    radial-gradient(ellipse 30% 28% at 12% 18%, color-mix(in srgb, var(--accent) 8%, transparent), transparent 70%),
    var(--bg);
  border-radius: 0;
  border: none;
  box-shadow: inset 0 0 0 1px rgba(240, 232, 210, 0.08);
}
.deck[data-surface="mat-woodglow"] .slide::before {
  width: 32px;
  height: 1px;
  left: 5.5%;
  top: 12%;
  background: var(--accent);
  filter: none;
  opacity: 1;
}
.deck[data-surface="mat-woodglow"] .slide::after {
  width: 14%;
  height: 3px;
  right: 5.5%;
  bottom: 10%;
  top: auto;
  background: var(--accent);
  filter: none;
  border-radius: 0;
  opacity: 0.9;
}
.deck[data-surface="mat-woodglow"] .slide h1 {
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 0.92;
  text-transform: none;
}
.deck[data-surface="mat-woodglow"] .card {
  background: var(--card-bg);
  color: #1E2820;
  border: 1px solid rgba(30, 40, 32, 0.14);
  border-radius: 0;
}
/* Dual-surface: cream cards need dark muted; roles.muted stays light for sage slides */
.deck[data-surface="mat-woodglow"] .card p,
.deck[data-surface="mat-woodglow"] .card .lead,
.deck[data-surface="mat-woodglow"] .stat .label {
  color: #454038;
}
.deck[data-surface="mat-woodglow"] .card h3,
.deck[data-surface="mat-woodglow"] .card i {
  color: #1E2820;
}
.deck[data-surface="mat-woodglow"] .eyebrow {
  color: #b8b4a4;
}
.deck[data-surface="mat-woodglow"] .card .eyebrow {
  color: #454038;
}

/* ── stencil-tablet-earth (stencil-tablet) ── */
.deck[data-surface="stencil-tablet-earth"] .slide {
  --slide-bg: var(--bg);
  border-radius: 0;
  border: 2px solid #000;
}
.deck[data-surface="stencil-tablet-earth"] .slide::before {
  width: 18%;
  height: 22%;
  right: 5%;
  top: 10%;
  border-radius: 24px;
  background: var(--accent);
  filter: none;
  opacity: 1;
}
.deck[data-surface="stencil-tablet-earth"] .slide::after {
  width: 14%;
  height: 18%;
  left: 5%;
  bottom: 8%;
  top: auto;
  border-radius: 22px;
  background: var(--accent2);
  filter: none;
}
.deck[data-surface="stencil-tablet-earth"] .slide h1 {
  font-weight: 700;
  letter-spacing: -0.015em;
  text-transform: uppercase;
  line-height: 0.88;
}
.deck[data-surface="stencil-tablet-earth"] .card {
  background: var(--card-bg);
  border: 2px solid #000;
  border-radius: 24px;
}
/* ── cartesian-draft (cartesian) ── */
.deck[data-surface="cartesian-draft"] .slide {
  --slide-bg:
    radial-gradient(circle at 88% 18%, transparent 48px, rgba(184, 176, 164, 0.35) 49px, transparent 50px),
    radial-gradient(circle at 88% 18%, transparent 72px, rgba(184, 176, 164, 0.22) 73px, transparent 74px),
    var(--bg);
  border-radius: 0;
  border: 1px solid var(--border);
  box-shadow: none;
}
.deck[data-surface="cartesian-draft"] .slide::before {
  left: 6%;
  right: 6%;
  top: 10%;
  height: 1px;
  background: var(--border);
  filter: none;
  opacity: 1;
}
.deck[data-surface="cartesian-draft"] .slide::after {
  width: 1px;
  left: 6%;
  top: 10%;
  bottom: 10%;
  height: auto;
  background: var(--border);
  filter: none;
  border-radius: 0;
}
.deck[data-surface="cartesian-draft"] .slide h1 {
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 1.08;
}
.deck[data-surface="cartesian-draft"] .card {
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 0;
  box-shadow: none;
}
/* ── monochrome-ledger (monochrome) ── */
.deck[data-surface="monochrome-ledger"] .slide {
  --slide-bg: var(--bg);
  border-radius: 0;
  border: 1px solid rgba(26, 26, 22, 0.12);
  box-shadow: none;
}
.deck[data-surface="monochrome-ledger"] .slide::before {
  left: 6%;
  right: 6%;
  top: 8%;
  height: 1px;
  background: rgba(26, 26, 22, 0.16);
  filter: none;
  opacity: 1;
}
.deck[data-surface="monochrome-ledger"] .slide::after {
  width: 24px;
  height: 1px;
  left: 6%;
  bottom: 8%;
  top: auto;
  background: var(--text);
  filter: none;
  border-radius: 0;
}
.deck[data-surface="monochrome-ledger"] .slide h1 {
  font-weight: 200;
  letter-spacing: -0.02em;
  line-height: 0.98;
}
.deck[data-surface="monochrome-ledger"] .card {
  background: var(--card-bg);
  border: 1px solid rgba(26, 26, 22, 0.12);
  border-radius: 16px;
  box-shadow: none;
}
/* ── blue-professional-clean (blue-professional) ── */
.deck[data-surface="blue-professional-clean"] .slide {
  --slide-bg:
    linear-gradient(180deg, rgba(30, 43, 250, 0.06) 0 18%, transparent 18%),
    var(--bg);
  border-radius: 16px;
  border: 1px solid rgba(30, 43, 250, 0.16);
}
.deck[data-surface="blue-professional-clean"] .slide::before {
  width: 48px;
  height: 4px;
  left: 48px;
  top: 40px;
  background: var(--accent);
  filter: none;
  border-radius: 2px;
}
.deck[data-surface="blue-professional-clean"] .slide::after {
  display: none;
}
.deck[data-surface="blue-professional-clean"] .slide h1 {
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.08;
  color: var(--text);
}
.deck[data-surface="blue-professional-clean"] .card {
  background: rgba(30, 43, 250, 0.04);
  border: 1px solid rgba(30, 43, 250, 0.16);
  border-radius: 12px;
}
/* ── daisy-days-pastel (daisy-days) ── */
.deck[data-surface="daisy-days-pastel"] .slide {
  --slide-bg:
    radial-gradient(circle at 12% 18%, #FDE68A 0 14px, transparent 15px),
    radial-gradient(circle at 88% 22%, #F7C8D4 0 18px, transparent 19px),
    radial-gradient(circle at 78% 82%, #7ECDC0 0 16px, transparent 17px),
    radial-gradient(circle at 18% 78%, #D4A5E8 0 12px, transparent 13px),
    var(--bg);
  border-radius: 28px;
  border: 3px solid #2D2D2D;
  box-shadow: 6px 6px 0 #2D2D2D;
}
.deck[data-surface="daisy-days-pastel"] .slide::before {
  width: 56px;
  height: 56px;
  right: 48px;
  top: 40px;
  border-radius: 50%;
  background:
    radial-gradient(circle at 50% 50%, #FDE68A 0 10px, transparent 11px),
    radial-gradient(circle at 50% 18%, #fff 0 8px, transparent 9px),
    radial-gradient(circle at 50% 82%, #fff 0 8px, transparent 9px),
    radial-gradient(circle at 18% 50%, #fff 0 8px, transparent 9px),
    radial-gradient(circle at 82% 50%, #fff 0 8px, transparent 9px);
  border: 3px solid #2D2D2D;
  filter: none;
}
.deck[data-surface="daisy-days-pastel"] .slide::after {
  width: 72px;
  height: 28px;
  left: 44px;
  bottom: 40px;
  top: auto;
  border-radius: 9999px;
  background: #A8D8F0;
  border: 3px solid #2D2D2D;
  box-shadow: 3px 3px 0 #2D2D2D;
  filter: none;
}
.deck[data-surface="daisy-days-pastel"] .slide h1 {
  font-weight: 400;
  letter-spacing: 0.02em;
  line-height: 1.08;
  text-shadow: 3px 3px 0 #2D2D2D;
}
.deck[data-surface="daisy-days-pastel"] .card {
  background: #fff;
  border: 3px solid #2D2D2D;
  border-radius: 20px;
  box-shadow: 4px 4px 0 #2D2D2D;
}
/* ── retro-zine-riso (retro-zine) ── */
.deck[data-surface="retro-zine-riso"] .slide {
  --slide-bg:
    radial-gradient(circle at 1px 1px, rgba(26, 26, 26, 0.08) 1px, transparent 0),
    var(--bg);
  background-size: 3px 3px, auto;
  border-radius: 0;
  border: 3px solid #1A1A1A;
}
.deck[data-surface="retro-zine-riso"] .slide::before {
  width: 26%;
  height: 34%;
  right: 6%;
  top: 14%;
  background: var(--accent);
  filter: none;
  opacity: 1;
  transform: translate(10px, 10px);
}
.deck[data-surface="retro-zine-riso"] .slide::after {
  width: 26%;
  height: 34%;
  right: 6%;
  top: 14%;
  background: var(--card-bg);
  border: 2px solid #1A1A1A;
  filter: none;
  border-radius: 0;
}
.deck[data-surface="retro-zine-riso"] .slide h1 {
  font-weight: 400;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  line-height: 0.9;
}
.deck[data-surface="retro-zine-riso"] .card {
  background: var(--card-bg);
  border: 2px solid #1A1A1A;
  border-radius: 0;
  box-shadow: 8px 8px 0 var(--accent);
}
.deck[data-surface="retro-zine-riso"] .card p,
.deck[data-surface="retro-zine-riso"] .card .lead {
  color: #3a342c;
}

/* ═══════════════════════════════════════════════════════════════════════════
   Content-slide fidelity — layout chrome that survives beyond title slides
   ═══════════════════════════════════════════════════════════════════════════ */

/* Soften title-only ornaments that crowd content layouts */
.deck[data-surface="daisy-days-pastel"] .slide:not(.title-slide):not(.closing-slide)::before,
.deck[data-surface="daisy-days-pastel"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="capsule-pills"] .slide:not(.title-slide):not(.closing-slide)::before,
.deck[data-surface="capsule-pills"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="pastel-geometry-pills"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="retro-zine-riso"] .slide:not(.title-slide):not(.closing-slide)::before,
.deck[data-surface="retro-zine-riso"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="vintage-editorial-geo"] .slide:not(.title-slide):not(.closing-slide)::before,
.deck[data-surface="vintage-editorial-geo"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="bauhaus-blocks"] .slide:not(.title-slide):not(.closing-slide)::before,
.deck[data-surface="bauhaus-blocks"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="deco-fan"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="candy-blob"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="wrapped-block"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="bold-poster-ink"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="acid-block"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="neo-grid-panels"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="botanical-leaf"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="aero-bubble"] .slide:not(.title-slide):not(.closing-slide)::before,
.deck[data-surface="aero-bubble"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="coral-hatch"] .slide:not(.title-slide):not(.closing-slide)::before {
  display: none;
}

/* Swiss / editorial: ruled comparison + stats */
.deck[data-surface="swiss-grid"] .comparison-col,
.deck[data-surface="broadsheet-rule"] .comparison-col,
.deck[data-surface="newsprint-masthead"] .comparison-col {
  border-radius: 0;
  border-width: 1px 0 0 0;
  background: transparent;
  padding-left: 0;
  padding-right: 24px;
}
.deck[data-surface="swiss-grid"] .comparison-col:last-child {
  border-left: 3px solid var(--accent);
  padding-left: 28px;
  background: transparent;
}
.deck[data-surface="swiss-grid"] .stat {
  border-top: 3px solid var(--accent);
}
.deck[data-surface="swiss-grid"] .card {
  border-radius: 0;
  border: 1px solid var(--border);
}

/* CRT / neon / terminal: glowing metrics + code-like cards */
.deck[data-surface="crt-phosphor"] .stat .value,
.deck[data-surface="neon-rain"] .stat .value,
.deck[data-surface="dev-terminal"] .stat .value,
.deck[data-surface="scanline-neon"] .stat .value {
  text-shadow: 0 0 18px color-mix(in srgb, var(--accent) 55%, transparent);
}
.deck[data-surface="crt-phosphor"] .comparison-col,
.deck[data-surface="neon-rain"] .comparison-col,
.deck[data-surface="dev-terminal"] .comparison-col {
  border-radius: 0;
  background: color-mix(in srgb, var(--accent) 6%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);
}
.deck[data-surface="neon-rain"] .comparison-col:last-child {
  /* Hot magenta fills fail white text — darken for AA winner copy */
  background: color-mix(in srgb, var(--accent) 72%, #050508);
  color: #fff;
  border-color: var(--accent);
  box-shadow: 0 0 24px color-mix(in srgb, var(--accent) 35%, transparent);
}
.deck[data-surface="neon-rain"] .comparison-col:last-child .comparison-label,
.deck[data-surface="neon-rain"] .comparison-col:last-child p { color: #fff; }
.deck[data-surface="neon-rain"] .grid.cols-bento .card:first-child {
  background: color-mix(in srgb, var(--accent) 72%, #050508);
  color: #fff;
  border-color: var(--accent2);
}
.deck[data-surface="neon-rain"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="neon-rain"] .grid.cols-bento .card:first-child p,
.deck[data-surface="neon-rain"] .grid.cols-bento .card:first-child i { color: #fff; }
.deck[data-surface="crt-phosphor"] .quote,
.deck[data-surface="neon-rain"] .quote,
.deck[data-surface="dev-terminal"] .quote {
  border-left-color: var(--accent);
  text-shadow: 0 0 12px color-mix(in srgb, var(--accent) 30%, transparent);
}

/* Soft editorial / paper themes: magazine pull-quote + ruled stats */
.deck[data-surface="soft-editorial-paper"] .quote,
.deck[data-surface="warm-paper"] .quote,
.deck[data-surface="editorial-rule"] .quote,
.deck[data-surface="paper-ink-literary"] .quote,
.deck[data-surface="heritage-wash"] .quote {
  border-left: none;
  padding-left: 0;
  max-width: 32ch;
  font-style: normal;
}
.deck[data-surface="soft-editorial-paper"] .quote::before,
.deck[data-surface="warm-paper"] .quote::before,
.deck[data-surface="editorial-rule"] .quote::before {
  content: "";
  display: block;
  width: 48px;
  height: 3px;
  background: var(--accent);
  margin-bottom: 24px;
}
.deck[data-surface="soft-editorial-paper"] .stat,
.deck[data-surface="editorial-forest-paper"] .stat,
.deck[data-surface="fintech-soft"] .stat {
  border-top-width: 1px;
  border-top-style: solid;
}

/* Brutal / poster: hard-edged comparison */
.deck[data-surface="brutalist-grid"] .comparison-col,
.deck[data-surface="block-frame-brutal"] .comparison-col,
.deck[data-surface="hard-bento"] .comparison-col,
.deck[data-surface="acid-block"] .comparison-col {
  border-radius: 0;
  border-width: 2px;
}
.deck[data-surface="brutalist-grid"] .comparison-vs,
.deck[data-surface="block-frame-brutal"] .comparison-vs {
  font-weight: 900;
  opacity: 1;
}
.deck[data-surface="block-frame-brutal"] .comparison-col:last-child {
  /* Pastel pink accent fails white — keep ink */
  background: var(--accent);
  color: #000;
  border-color: #000;
}
.deck[data-surface="block-frame-brutal"] .comparison-col:last-child .comparison-label,
.deck[data-surface="block-frame-brutal"] .comparison-col:last-child p { color: #000; }
.deck[data-surface="block-frame-brutal"] .grid.cols-bento .card:first-child {
  background: var(--accent);
  color: #000;
  border-color: #000;
}
.deck[data-surface="block-frame-brutal"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="block-frame-brutal"] .grid.cols-bento .card:first-child p,
.deck[data-surface="block-frame-brutal"] .grid.cols-bento .card:first-child i { color: #000; }

/* Aurora / glass: frosted layout shells */
.deck[data-surface="aurora-glass"] .comparison-col,
.deck[data-surface="glass-mist"] .comparison-col {
  backdrop-filter: blur(12px);
  background: color-mix(in srgb, var(--card-bg) 70%, transparent);
}
.deck[data-surface="aurora-glass"] .stat .value,
.deck[data-surface="glass-mist"] .stat .value {
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* ── Wave: deeper content chrome for distinctive STYLE_PRESETS / gallery themes ── */

/* Quiet luxe — hairline stats, gold pull-quote */
.deck[data-surface="quiet-luxe"] .stat {
  border-top: 1px solid var(--accent);
  padding-top: 18px;
}
.deck[data-surface="quiet-luxe"] .stat .value {
  font-weight: 400;
  letter-spacing: -0.03em;
}
.deck[data-surface="quiet-luxe"] .quote {
  border-left: none;
  padding-left: 0;
  max-width: 28ch;
  font-weight: 400;
}
.deck[data-surface="quiet-luxe"] .quote::before {
  content: "";
  display: block;
  width: 40px;
  height: 1px;
  background: var(--accent);
  margin-bottom: 28px;
}
.deck[data-surface="quiet-luxe"] .comparison-col {
  background: transparent;
  border-radius: 0;
  border-top: 1px solid var(--border);
  padding-left: 0;
}
.deck[data-surface="quiet-luxe"] .comparison-col:last-child {
  border-top-color: var(--accent);
}

/* Hard bento — chunky comparison + stats */
.deck[data-surface="hard-bento"] .stat {
  border-top: 4px solid var(--text);
  border-radius: 0;
}
.deck[data-surface="hard-bento"] .stat .value {
  font-weight: 900;
}
.deck[data-surface="hard-bento"] .comparison-col:last-child {
  background: var(--accent2);
  color: #0f0f1a;
}
.deck[data-surface="hard-bento"] .comparison-col:last-child .comparison-label,
.deck[data-surface="hard-bento"] .comparison-col:last-child p { color: #0f0f1a; }
.deck[data-surface="hard-bento"] .grid.cols-bento .card:first-child {
  background: var(--accent2);
  color: #0f0f1a;
  border-color: var(--text);
}
.deck[data-surface="hard-bento"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="hard-bento"] .grid.cols-bento .card:first-child p,
.deck[data-surface="hard-bento"] .grid.cols-bento .card:first-child i { color: #0f0f1a; }
.deck[data-surface="hard-bento"] .quote {
  border-left: 6px solid var(--text);
  font-weight: 800;
}

/* HUD / blueprint — instrument metrics + table rules */
.deck[data-surface="hud-grid"] .stat .value,
.deck[data-surface="blueprint-grid"] .stat .value {
  font-family: ui-monospace, "Barlow Condensed", monospace;
  text-shadow: 0 0 16px color-mix(in srgb, var(--accent) 45%, transparent);
  letter-spacing: 0.04em;
}
.deck[data-surface="hud-grid"] .comparison-col,
.deck[data-surface="blueprint-grid"] .comparison-col {
  border-radius: 0;
  background: color-mix(in srgb, var(--accent) 8%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent);
}
.deck[data-surface="hud-grid"] .card,
.deck[data-surface="blueprint-grid"] .card {
  border-radius: 0;
  border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);
  background: color-mix(in srgb, var(--bg-2) 80%, transparent);
}
.deck[data-surface="hud-grid"] table th,
.deck[data-surface="blueprint-grid"] table th {
  border-bottom: 1px solid var(--accent);
  color: var(--accent);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-size: 12px;
}

/* Bauhaus — primary-bar stats, hard cards */
.deck[data-surface="bauhaus-blocks"] .stat {
  border-top: 8px solid var(--accent);
  border-radius: 0;
}
.deck[data-surface="bauhaus-blocks"] .stat:nth-child(2) { border-top-color: var(--accent2); }
.deck[data-surface="bauhaus-blocks"] .stat:nth-child(3) { border-top-color: #f4d35e; }
.deck[data-surface="bauhaus-blocks"] .card {
  border-radius: 0;
  border: 2px solid var(--text);
  background: #fff;
}
.deck[data-surface="bauhaus-blocks"] .comparison-col {
  border-radius: 0;
  border: 2px solid var(--text);
  background: #fff;
}
.deck[data-surface="bauhaus-blocks"] .comparison-col:last-child {
  background: var(--accent);
  color: #0d0d0d;
  border-color: var(--text);
}
.deck[data-surface="bauhaus-blocks"] .comparison-col:last-child .comparison-label,
.deck[data-surface="bauhaus-blocks"] .comparison-col:last-child p { color: #0d0d0d; }
.deck[data-surface="bauhaus-blocks"] .grid.cols-bento .card:first-child {
  background: var(--accent);
  color: #0d0d0d;
  border-color: var(--text);
}
.deck[data-surface="bauhaus-blocks"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="bauhaus-blocks"] .grid.cols-bento .card:first-child p,
.deck[data-surface="bauhaus-blocks"] .grid.cols-bento .card:first-child i { color: #0d0d0d; }
.deck[data-surface="bauhaus-blocks"] .timeline .dot {
  background: var(--accent);
  border-radius: 0;
}

/* Art deco — gold rules on content */
.deck[data-surface="deco-fan"] .stat {
  border-top: 2px solid var(--accent);
}
.deck[data-surface="deco-fan"] .stat .value {
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-size: clamp(28px, 3.2vw, 42px);
}
.deck[data-surface="deco-fan"] .comparison-col {
  border-radius: 0;
  background: transparent;
  border-top: 2px solid color-mix(in srgb, var(--accent) 55%, transparent);
}
.deck[data-surface="deco-fan"] .quote {
  border-left: none;
  text-align: center;
  max-width: 36ch;
  margin-inline: auto;
  letter-spacing: 0.04em;
}
.deck[data-surface="deco-fan"] .quote::before {
  content: "◆";
  display: block;
  color: var(--accent);
  margin-bottom: 20px;
  font-size: 14px;
}

/* Candy / pastel geometry / aero — playful but readable shells */
.deck[data-surface="candy-blob"] .stat {
  border-top: 4px solid var(--text);
}
.deck[data-surface="candy-blob"] .comparison-col {
  border: 3px solid var(--text);
  border-radius: 22px;
}
.deck[data-surface="candy-blob"] .comparison-col:last-child {
  /* Darken jellybean blue so white body copy clears WCAG AA */
  background: color-mix(in srgb, var(--accent2) 78%, #0a1628);
  color: #fff;
}
.deck[data-surface="candy-blob"] .comparison-col:last-child .comparison-label,
.deck[data-surface="candy-blob"] .comparison-col:last-child p { color: #fff; }
.deck[data-surface="candy-blob"] .grid.cols-bento .card:first-child {
  background: color-mix(in srgb, var(--accent2) 78%, #0a1628);
  color: #fff;
  border-color: var(--text);
}
.deck[data-surface="candy-blob"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="candy-blob"] .grid.cols-bento .card:first-child p,
.deck[data-surface="candy-blob"] .grid.cols-bento .card:first-child i { color: #fff; }
.deck[data-surface="pastel-geometry-pills"] .stat {
  border-top: 3px solid var(--accent);
  background: #fff;
  border-radius: 16px;
  padding: 16px 18px;
}
.deck[data-surface="pastel-geometry-pills"] .comparison-col {
  border-radius: 18px;
  background: #fff;
  border: 1px solid color-mix(in srgb, var(--text) 10%, transparent);
}
.deck[data-surface="aero-bubble"] .stat .value {
  color: var(--accent);
}
.deck[data-surface="aero-bubble"] .card {
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid color-mix(in srgb, var(--accent) 28%, transparent);
  box-shadow: 0 12px 32px color-mix(in srgb, var(--accent) 12%, transparent);
}
.deck[data-surface="aero-bubble"] .comparison-col:last-child {
  background: color-mix(in srgb, var(--accent2) 35%, #fff);
  border-radius: 20px;
  color: #0c4a6e;
}
.deck[data-surface="aero-bubble"] .comparison-col:last-child .comparison-label,
.deck[data-surface="aero-bubble"] .comparison-col:last-child p { color: #0c4a6e; }

/* Data editorial / newsprint — ruled tables + stats */
.deck[data-surface="data-rule"] .stat {
  border-top: 3px solid var(--accent);
}
.deck[data-surface="data-rule"] .stat:nth-child(2) { border-top-color: var(--accent2); }
.deck[data-surface="data-rule"] table {
  border-collapse: collapse;
  width: 100%;
}
.deck[data-surface="data-rule"] table th {
  border-bottom: 3px solid var(--accent);
  text-align: left;
  padding: 10px 12px;
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.deck[data-surface="data-rule"] table td {
  border-bottom: 1px solid var(--border);
  padding: 12px;
}
.deck[data-surface="newsprint-masthead"] .stat {
  border-top: 2px solid var(--text);
}
.deck[data-surface="newsprint-masthead"] table th {
  border-bottom: 2px double var(--text);
  font-family: var(--heading-font);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-size: 13px;
}
.deck[data-surface="newsprint-masthead"] table td {
  border-bottom: 1px solid color-mix(in srgb, var(--text) 22%, transparent);
  padding: 10px 8px;
}
.deck[data-surface="newsprint-masthead"] .card {
  border-radius: 0;
  border: 1px solid color-mix(in srgb, var(--text) 28%, transparent);
  background: transparent;
}

/* Heritage / paper-ink / hygge — editorial content fidelity */
.deck[data-surface="heritage-wash"] .stat,
.deck[data-surface="paper-ink-literary"] .stat,
.deck[data-surface="hygge-soft"] .stat {
  border-top: 1px solid var(--accent);
}
.deck[data-surface="heritage-wash"] .card,
.deck[data-surface="paper-ink-literary"] .card {
  background: #fff;
  border-radius: 0;
}
.deck[data-surface="hygge-soft"] .card {
  border-radius: 16px;
  background: color-mix(in srgb, var(--card-bg) 90%, #fff);
  border: 1px solid color-mix(in srgb, var(--border) 80%, transparent);
}
.deck[data-surface="paper-ink-literary"] .quote::before {
  content: "";
  display: block;
  width: 48px;
  height: 2px;
  background: var(--accent);
  margin-bottom: 24px;
}
.deck[data-surface="heritage-wash"] .quote::before {
  content: "";
  display: block;
  width: 40px;
  height: 1px;
  background: var(--accent);
  margin-bottom: 24px;
}

/* Kinetic wrapped — acid lime content chrome */
.deck[data-surface="wrapped-block"] .stat {
  border-top: 4px solid var(--accent);
}
.deck[data-surface="wrapped-block"] .stat .value {
  text-transform: uppercase;
  letter-spacing: -0.04em;
  color: var(--accent);
}
.deck[data-surface="wrapped-block"] .card {
  border: 3px solid var(--accent);
  border-radius: 0;
  background: #0a0a0a;
}
.deck[data-surface="wrapped-block"] .comparison-col {
  border: 3px solid var(--accent);
  border-radius: 0;
}
.deck[data-surface="wrapped-block"] .comparison-col:last-child {
  background: var(--accent);
  color: #0a0a0a;
}
.deck[data-surface="wrapped-block"] .comparison-col:last-child .comparison-label,
.deck[data-surface="wrapped-block"] .comparison-col:last-child p { color: #0a0a0a; }
.deck[data-surface="wrapped-block"] .grid.cols-bento .card:first-child {
  background: var(--accent);
  color: #0a0a0a;
  border-color: var(--text);
}
.deck[data-surface="wrapped-block"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="wrapped-block"] .grid.cols-bento .card:first-child p,
.deck[data-surface="wrapped-block"] .grid.cols-bento .card:first-child i { color: #0a0a0a; }
.deck[data-surface="wrapped-block"] .quote {
  border-left: 6px solid var(--accent);
  text-transform: uppercase;
  letter-spacing: -0.02em;
}

/* Notebook tabs — keep side tabs; enrich cards/stats */
.deck[data-surface="notebook-tabs-page"] .stat {
  border-top: 2px solid var(--accent);
  background: #fff;
  border-radius: 8px;
  padding: 14px 16px;
}
.deck[data-surface="notebook-tabs-page"] .card {
  background: #fff;
  border-radius: 10px;
  border: 1px solid color-mix(in srgb, var(--text) 10%, transparent);
  box-shadow: 0 4px 0 color-mix(in srgb, var(--accent2) 35%, transparent);
}
.deck[data-surface="notebook-tabs-page"] .comparison-col {
  background: #fff;
  border-radius: 10px;
  border: 1px solid color-mix(in srgb, var(--text) 12%, transparent);
}
.deck[data-surface="notebook-tabs-page"] .comparison-col:last-child {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 25%, transparent);
}

/* Vaporwave — horizon chrome on content */
.deck[data-surface="vapor-horizon"] .stat .value {
  text-shadow: 2px 0 color-mix(in srgb, var(--accent2) 50%, transparent),
    -2px 0 color-mix(in srgb, var(--accent) 50%, transparent);
}
.deck[data-surface="vapor-horizon"] .card {
  border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent);
  background: color-mix(in srgb, var(--bg-2) 70%, transparent);
  border-radius: 6px;
}
.deck[data-surface="vapor-horizon"] .comparison-col {
  border: 1px solid color-mix(in srgb, var(--accent2) 45%, transparent);
  background: color-mix(in srgb, var(--accent) 10%, transparent);
}
.deck[data-surface="vapor-horizon"] .comparison-col:last-child {
  /* Pink/teal neons fail white — ink on lightened accent clears AA */
  background: color-mix(in srgb, var(--accent) 82%, #fff);
  color: #1a0533;
  border-color: var(--accent2);
}
.deck[data-surface="vapor-horizon"] .comparison-col:last-child .comparison-label,
.deck[data-surface="vapor-horizon"] .comparison-col:last-child p { color: #1a0533; }
.deck[data-surface="vapor-horizon"] .grid.cols-bento .card:first-child {
  background: color-mix(in srgb, var(--accent) 82%, #fff);
  color: #1a0533;
  border-color: var(--accent2);
}
.deck[data-surface="vapor-horizon"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="vapor-horizon"] .grid.cols-bento .card:first-child p,
.deck[data-surface="vapor-horizon"] .grid.cols-bento .card:first-child i { color: #1a0533; }

/* Vintage / bold poster / acid / neo-grid / riso / coral / botanical */
.deck[data-surface="vintage-editorial-geo"] .stat {
  border-top: 2px solid var(--text);
}
.deck[data-surface="vintage-editorial-geo"] .comparison-col {
  border: 2px solid var(--text);
  border-radius: 4px;
  background: #fff;
}
.deck[data-surface="bold-poster-ink"] .stat {
  border-top: 4px solid var(--accent);
}
.deck[data-surface="bold-poster-ink"] .stat .value {
  color: var(--accent);
  font-family: var(--heading-font);
}
.deck[data-surface="bold-poster-ink"] .comparison-col {
  border: 2px solid var(--text);
  border-radius: 0;
}
.deck[data-surface="bold-poster-ink"] .comparison-col:last-child {
  background: var(--accent);
  color: #fff;
}
.deck[data-surface="bold-poster-ink"] .comparison-col:last-child .comparison-label,
.deck[data-surface="bold-poster-ink"] .comparison-col:last-child p { color: #fff; }
.deck[data-surface="bold-poster-ink"] .grid.cols-bento .card:first-child {
  background: var(--accent);
  color: #fff;
  border-color: var(--text);
}
.deck[data-surface="bold-poster-ink"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="bold-poster-ink"] .grid.cols-bento .card:first-child p,
.deck[data-surface="bold-poster-ink"] .grid.cols-bento .card:first-child i { color: #fff; }
.deck[data-surface="acid-block"] .stat {
  border-top: 4px solid var(--accent);
}
.deck[data-surface="acid-block"] .stat .value {
  color: var(--accent);
  font-family: ui-monospace, "Space Mono", monospace;
}
.deck[data-surface="acid-block"] .comparison-col:last-child {
  background: var(--accent);
  color: #1c1c1c;
}
.deck[data-surface="acid-block"] .comparison-col:last-child .comparison-label,
.deck[data-surface="acid-block"] .comparison-col:last-child p { color: #1c1c1c; }
.deck[data-surface="acid-block"] .grid.cols-bento .card:first-child {
  background: var(--accent);
  color: #1c1c1c;
  border-color: var(--text);
}
.deck[data-surface="acid-block"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="acid-block"] .grid.cols-bento .card:first-child p,
.deck[data-surface="acid-block"] .grid.cols-bento .card:first-child i { color: #1c1c1c; }
.deck[data-surface="neo-grid-panels"] .stat {
  border-top: 4px solid var(--accent);
}
.deck[data-surface="neo-grid-panels"] .stat .value {
  text-transform: uppercase;
  letter-spacing: -0.03em;
}
.deck[data-surface="neo-grid-panels"] .comparison-col {
  border: 2px solid var(--text);
  border-radius: 0;
}
.deck[data-surface="neo-grid-panels"] .comparison-col:last-child {
  background: var(--accent);
  color: #0a0a0a;
}
.deck[data-surface="neo-grid-panels"] .comparison-col:last-child .comparison-label,
.deck[data-surface="neo-grid-panels"] .comparison-col:last-child p { color: #0a0a0a; }
.deck[data-surface="neo-grid-panels"] .grid.cols-bento .card:first-child {
  background: var(--accent);
  color: #0a0a0a;
  border-color: var(--text);
}
.deck[data-surface="neo-grid-panels"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="neo-grid-panels"] .grid.cols-bento .card:first-child p,
.deck[data-surface="neo-grid-panels"] .grid.cols-bento .card:first-child i { color: #0a0a0a; }
.deck[data-surface="riso-print"] .stat {
  border-top: 3px solid var(--accent);
}
.deck[data-surface="riso-print"] .comparison-col {
  border: 2px solid var(--text);
  mix-blend-mode: multiply;
}
.deck[data-surface="riso-print"] .comparison-col:last-child {
  background: color-mix(in srgb, var(--accent2) 22%, transparent);
}
.deck[data-surface="riso-print"] .quote {
  border-left: 4px solid var(--accent);
}
.deck[data-surface="coral-hatch"] .stat {
  border-top: 3px solid var(--text);
}
.deck[data-surface="coral-hatch"] .stat .value {
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-family: var(--heading-font);
}
.deck[data-surface="coral-hatch"] .comparison-col {
  border: 2px solid var(--text);
  border-radius: 0;
  background: #fff;
}
.deck[data-surface="coral-hatch"] .comparison-col:last-child {
  /* Coral fill reads muddy with white — keep ink for AA */
  background: color-mix(in srgb, var(--accent) 88%, #fff);
  color: #1a1a1a;
}
.deck[data-surface="coral-hatch"] .comparison-col:last-child .comparison-label,
.deck[data-surface="coral-hatch"] .comparison-col:last-child p { color: #1a1a1a; }
.deck[data-surface="coral-hatch"] .grid.cols-bento .card:first-child {
  background: color-mix(in srgb, var(--accent) 88%, #fff);
  color: #1a1a1a;
  border-color: var(--text);
}
.deck[data-surface="coral-hatch"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="coral-hatch"] .grid.cols-bento .card:first-child p,
.deck[data-surface="coral-hatch"] .grid.cols-bento .card:first-child i { color: #1a1a1a; }
.deck[data-surface="botanical-leaf"] .stat {
  border-top: 1px solid var(--accent);
}
.deck[data-surface="botanical-leaf"] .stat .value {
  color: var(--accent);
  font-style: italic;
}
.deck[data-surface="botanical-leaf"] .card {
  border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);
  border-radius: 0;
  background: color-mix(in srgb, var(--bg-2) 55%, transparent);
}
.deck[data-surface="botanical-leaf"] .quote {
  border-left: none;
  font-style: italic;
  max-width: 30ch;
}
.deck[data-surface="botanical-leaf"] .quote::before {
  content: "";
  display: block;
  width: 48px;
  height: 1px;
  background: var(--accent);
  margin-bottom: 24px;
}

/* Soft-editorial / pastel-cloud content polish */
.deck[data-surface="pastel-cloud"] .card {
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.65);
  border: none;
  box-shadow: 0 8px 24px rgba(80, 40, 90, 0.08);
}
.deck[data-surface="pastel-cloud"] .stat {
  border-top: 2px solid var(--accent);
}

/* ── Wave: content chrome for remaining distinctive surfaces (full coverage) ── */

/* Soften loud title ornaments on content layouts */
.deck[data-surface="biennale-yellow-sun"] .slide:not(.title-slide):not(.closing-slide)::before,
.deck[data-surface="biennale-yellow-sun"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="broadside-fire"] .slide:not(.title-slide):not(.closing-slide)::before,
.deck[data-surface="broadside-fire"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="studio-acid"] .slide:not(.title-slide):not(.closing-slide)::before,
.deck[data-surface="studio-acid"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="creative-mode-blocks"] .slide:not(.title-slide):not(.closing-slide)::before,
.deck[data-surface="creative-mode-blocks"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="scatterbrain-cork"] .slide:not(.title-slide):not(.closing-slide)::before,
.deck[data-surface="scatterbrain-cork"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="tri-tone-blocks"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="peoples-platform-poster"] .slide:not(.title-slide):not(.closing-slide)::before,
.deck[data-surface="peoples-platform-poster"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="pink-script-afterhours"] .slide:not(.title-slide):not(.closing-slide)::before,
.deck[data-surface="pink-script-afterhours"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="stencil-tablet-earth"] .slide:not(.title-slide):not(.closing-slide)::before,
.deck[data-surface="stencil-tablet-earth"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="raw-grid-brutal"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="soft-bento"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="clean-light"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="notebook-tabs-page"] .slide:not(.title-slide):not(.closing-slide)::before,
.deck[data-surface="notebook-tabs-page"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="long-table-supper"] .slide:not(.title-slide):not(.closing-slide)::before,
.deck[data-surface="long-table-supper"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="mat-woodglow"] .slide:not(.title-slide):not(.closing-slide)::before,
.deck[data-surface="mat-woodglow"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="soft-editorial-paper"] .slide:not(.title-slide):not(.closing-slide)::after {
  display: none;
}

/* Biennale yellow — parchment stats + indigo cards */
.deck[data-surface="biennale-yellow-sun"] .stat {
  border-top: 4px solid var(--accent);
}
.deck[data-surface="biennale-yellow-sun"] .stat .value {
  color: var(--text);
  font-family: var(--heading-font);
  font-weight: 400;
}
.deck[data-surface="biennale-yellow-sun"] .comparison-col {
  border-radius: 0;
  background: rgba(255, 255, 255, 0.45);
  border: 1px solid color-mix(in srgb, var(--text) 22%, transparent);
}
.deck[data-surface="biennale-yellow-sun"] .comparison-col:last-child {
  background: var(--accent);
  color: #1b2566;
}
.deck[data-surface="biennale-yellow-sun"] .comparison-col:last-child .comparison-label,
.deck[data-surface="biennale-yellow-sun"] .comparison-col:last-child p { color: #1b2566; }
.deck[data-surface="biennale-yellow-sun"] .grid.cols-bento .card:first-child {
  background: var(--accent);
  color: #1b2566;
  border-color: var(--text);
}
.deck[data-surface="biennale-yellow-sun"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="biennale-yellow-sun"] .grid.cols-bento .card:first-child p,
.deck[data-surface="biennale-yellow-sun"] .grid.cols-bento .card:first-child i { color: #1b2566; }
.deck[data-surface="biennale-yellow-sun"] .quote {
  border-left: none;
  font-family: var(--heading-font);
  font-style: italic;
  max-width: 30ch;
}
.deck[data-surface="biennale-yellow-sun"] .quote::before {
  content: "";
  display: block;
  width: 48px;
  height: 8px;
  background: var(--accent);
  margin-bottom: 20px;
}

/* Broadside — fire-orange content chrome */
.deck[data-surface="broadside-fire"] .stat {
  border-top: 4px solid var(--accent);
}
.deck[data-surface="broadside-fire"] .stat .value {
  color: var(--accent);
  font-weight: 900;
  text-transform: uppercase;
}
.deck[data-surface="broadside-fire"] .comparison-col {
  border-radius: 0;
  border: 2px solid color-mix(in srgb, var(--text) 35%, transparent);
  background: color-mix(in srgb, var(--accent) 10%, transparent);
}
.deck[data-surface="broadside-fire"] .comparison-col:last-child {
  background: var(--accent);
  color: #111;
  border-color: var(--accent);
}
.deck[data-surface="broadside-fire"] .comparison-col:last-child .comparison-label,
.deck[data-surface="broadside-fire"] .comparison-col:last-child p { color: #111; }
.deck[data-surface="broadside-fire"] .grid.cols-bento .card:first-child {
  background: var(--accent);
  color: #111;
  border-color: var(--accent);
}
.deck[data-surface="broadside-fire"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="broadside-fire"] .grid.cols-bento .card:first-child p,
.deck[data-surface="broadside-fire"] .grid.cols-bento .card:first-child i { color: #111; }
.deck[data-surface="broadside-fire"] .quote {
  border-left: 6px solid var(--accent);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.02em;
}
.deck[data-surface="broadside-fire"] .card {
  border-radius: 0;
  border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent);
  background: color-mix(in srgb, var(--accent) 12%, transparent);
}

/* Studio acid — yellow metrics on black */
.deck[data-surface="studio-acid"] .stat {
  border-top: 3px solid var(--accent);
}
.deck[data-surface="studio-acid"] .stat .value {
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: -0.03em;
  font-weight: 900;
}
.deck[data-surface="studio-acid"] .comparison-col {
  border-radius: 0;
  border: 2px solid var(--accent);
  background: #242422;
}
.deck[data-surface="studio-acid"] .comparison-col:last-child {
  background: var(--accent);
  color: #1c1c1c;
}
.deck[data-surface="studio-acid"] .comparison-col:last-child .comparison-label,
.deck[data-surface="studio-acid"] .comparison-col:last-child p { color: #1c1c1c; }
.deck[data-surface="studio-acid"] .grid.cols-bento .card:first-child {
  background: var(--accent);
  color: #1c1c1c;
  border-color: var(--accent);
}
.deck[data-surface="studio-acid"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="studio-acid"] .grid.cols-bento .card:first-child p,
.deck[data-surface="studio-acid"] .grid.cols-bento .card:first-child i { color: #1c1c1c; }
.deck[data-surface="studio-acid"] .quote {
  border-left: 4px solid var(--accent);
  text-transform: uppercase;
  color: var(--accent);
}
.deck[data-surface="studio-acid"] .card {
  border: 1px solid #2e2e2c;
  border-radius: 0;
  background: #242422;
}

/* Vellum — chartreuse italic content */
.deck[data-surface="vellum-colorfield"] .stat {
  border-top: 1px solid var(--accent);
}
.deck[data-surface="vellum-colorfield"] .stat .value {
  color: var(--accent);
  font-family: var(--heading-font);
  font-style: italic;
  font-weight: 400;
}
.deck[data-surface="vellum-colorfield"] .comparison-col {
  border-radius: 0;
  background: color-mix(in srgb, var(--accent) 8%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent) 28%, transparent);
}
.deck[data-surface="vellum-colorfield"] .quote {
  border-left: none;
  font-family: var(--heading-font);
  font-style: italic;
  color: var(--accent);
  max-width: 28ch;
}
.deck[data-surface="vellum-colorfield"] .quote::before {
  content: "";
  display: block;
  width: 40px;
  height: 1px;
  background: var(--accent);
  margin-bottom: 24px;
}
.deck[data-surface="vellum-colorfield"] .card {
  border-radius: 0;
  border: 1px solid color-mix(in srgb, var(--accent) 22%, transparent);
  background: color-mix(in srgb, var(--accent) 6%, transparent);
}

/* Creative mode — hard block comparison */
.deck[data-surface="creative-mode-blocks"] .stat {
  border-top: 6px solid var(--text);
}
.deck[data-surface="creative-mode-blocks"] .stat:nth-child(2) { border-top-color: var(--accent); }
.deck[data-surface="creative-mode-blocks"] .stat:nth-child(3) { border-top-color: var(--accent2); }
.deck[data-surface="creative-mode-blocks"] .comparison-col {
  border-radius: 0;
  border: 3px solid var(--text);
  background: #fff;
}
.deck[data-surface="creative-mode-blocks"] .comparison-col:last-child {
  background: var(--accent);
  color: #111;
}
.deck[data-surface="creative-mode-blocks"] .comparison-col:last-child .comparison-label,
.deck[data-surface="creative-mode-blocks"] .comparison-col:last-child p { color: #111; }
.deck[data-surface="creative-mode-blocks"] .grid.cols-bento .card:first-child {
  background: var(--accent);
  color: #111;
  border-color: var(--text);
}
.deck[data-surface="creative-mode-blocks"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="creative-mode-blocks"] .grid.cols-bento .card:first-child p,
.deck[data-surface="creative-mode-blocks"] .grid.cols-bento .card:first-child i { color: #111; }
.deck[data-surface="creative-mode-blocks"] .quote {
  border-left: 8px solid var(--text);
  font-weight: 800;
}
.deck[data-surface="creative-mode-blocks"] .card {
  border: 3px solid var(--text);
  border-radius: 0;
}

/* Scatterbrain — sticky note cards/stats */
.deck[data-surface="scatterbrain-cork"] .stat {
  border-top: none;
  background: var(--accent);
  border-radius: 2px;
  padding: 16px 14px;
  box-shadow: 2px 3px 0 rgba(45, 42, 38, 0.15);
  transform: rotate(-1deg);
}
.deck[data-surface="scatterbrain-cork"] .stat:nth-child(2) {
  background: var(--accent2);
  transform: rotate(1.2deg);
}
.deck[data-surface="scatterbrain-cork"] .stat:nth-child(3) {
  background: #c9e4ff;
  transform: rotate(-0.6deg);
}
.deck[data-surface="scatterbrain-cork"] .comparison-col {
  background: #ffe066;
  border-radius: 2px;
  border: none;
  box-shadow: 3px 4px 0 rgba(45, 42, 38, 0.12);
  transform: rotate(-0.8deg);
}
.deck[data-surface="scatterbrain-cork"] .comparison-col:last-child {
  background: #ffc9c9;
  color: #2d2a26;
  transform: rotate(1deg);
}
.deck[data-surface="scatterbrain-cork"] .comparison-col:last-child .comparison-label,
.deck[data-surface="scatterbrain-cork"] .comparison-col:last-child p { color: #2d2a26; }
.deck[data-surface="scatterbrain-cork"] .grid.cols-bento .card:first-child {
  background: #ffc9c9;
  color: #2d2a26;
  border: none;
}
.deck[data-surface="scatterbrain-cork"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="scatterbrain-cork"] .grid.cols-bento .card:first-child p,
.deck[data-surface="scatterbrain-cork"] .grid.cols-bento .card:first-child i { color: #2d2a26; }
.deck[data-surface="scatterbrain-cork"] .quote {
  border-left: none;
  font-family: "Caveat", cursive;
  font-size: clamp(28px, 3.2vw, 40px);
  max-width: 28ch;
}
.deck[data-surface="scatterbrain-cork"] .card {
  background: #ffe066;
  border: none;
  border-radius: 2px;
  box-shadow: 2px 3px 0 rgba(45, 42, 38, 0.12);
}

/* Capsule / daisy / retro-zine — pill & pastel content shells */
.deck[data-surface="capsule-pills"] .stat {
  border-top: none;
  background: #fff;
  border: 2px solid var(--text);
  border-radius: 9999px;
  padding: 14px 22px;
}
.deck[data-surface="capsule-pills"] .stat .value { color: var(--accent); }
.deck[data-surface="capsule-pills"] .comparison-col {
  border: 2px solid var(--text);
  border-radius: 9999px;
  background: #fff;
  padding: 28px 32px;
}
.deck[data-surface="capsule-pills"] .comparison-col:last-child {
  background: var(--accent2);
  color: #1a1a1a;
}
.deck[data-surface="capsule-pills"] .comparison-col:last-child .comparison-label,
.deck[data-surface="capsule-pills"] .comparison-col:last-child p { color: #1a1a1a; }
.deck[data-surface="capsule-pills"] .grid.cols-bento .card:first-child {
  background: var(--accent2);
  color: #1a1a1a;
  border-color: var(--text);
}
.deck[data-surface="capsule-pills"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="capsule-pills"] .grid.cols-bento .card:first-child p,
.deck[data-surface="capsule-pills"] .grid.cols-bento .card:first-child i { color: #1a1a1a; }
.deck[data-surface="daisy-days-pastel"] .stat {
  border-top: 4px solid var(--text);
  background: #fff;
  border-radius: 16px;
  padding: 14px 16px;
  border: 2px solid var(--text);
}
.deck[data-surface="daisy-days-pastel"] .comparison-col {
  border: 2px solid var(--text);
  border-radius: 18px;
  background: #fff;
}
.deck[data-surface="daisy-days-pastel"] .comparison-col:last-child {
  /* Soft mint — muted/accent labels wash out; use ink */
  background: #b8f0e8;
  color: #2d2d2d;
}
.deck[data-surface="daisy-days-pastel"] .comparison-col:last-child .comparison-label,
.deck[data-surface="daisy-days-pastel"] .comparison-col:last-child p { color: #2d2d2d; }
.deck[data-surface="daisy-days-pastel"] .grid.cols-bento .card:first-child {
  background: #b8f0e8;
  color: #2d2d2d;
  border-color: var(--text);
}
.deck[data-surface="daisy-days-pastel"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="daisy-days-pastel"] .grid.cols-bento .card:first-child p,
.deck[data-surface="daisy-days-pastel"] .grid.cols-bento .card:first-child i { color: #2d2d2d; }
.deck[data-surface="daisy-days-pastel"] .quote {
  border-left: 4px solid var(--text);
  font-weight: 700;
}
.deck[data-surface="retro-zine-riso"] .stat {
  border-top: 3px solid var(--accent);
}
.deck[data-surface="retro-zine-riso"] .stat .value {
  font-family: var(--heading-font);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--accent);
}
.deck[data-surface="retro-zine-riso"] .comparison-col {
  border: 2px solid var(--text);
  border-radius: 0;
  background: var(--card-bg);
  mix-blend-mode: multiply;
}
.deck[data-surface="retro-zine-riso"] .comparison-col:last-child {
  background: color-mix(in srgb, var(--accent) 18%, var(--card-bg));
}
.deck[data-surface="retro-zine-riso"] .quote {
  border-left: 4px solid var(--accent);
  font-family: "Caveat", cursive;
  font-size: clamp(26px, 3vw, 36px);
}

/* Raw grid / peoples platform / stencil — poster content */
.deck[data-surface="raw-grid-brutal"] .stat {
  border-top: 3px solid var(--text);
}
.deck[data-surface="raw-grid-brutal"] .stat .value {
  font-weight: 900;
  text-transform: uppercase;
}
.deck[data-surface="raw-grid-brutal"] .comparison-col {
  border: 3px solid var(--text);
  border-radius: 0;
  background: #fff;
}
.deck[data-surface="raw-grid-brutal"] .comparison-col:last-child {
  background: var(--accent);
  color: #0a0a0a;
}
.deck[data-surface="raw-grid-brutal"] .comparison-col:last-child .comparison-label,
.deck[data-surface="raw-grid-brutal"] .comparison-col:last-child p { color: #0a0a0a; }
.deck[data-surface="raw-grid-brutal"] .grid.cols-bento .card:first-child {
  background: var(--accent);
  color: #0a0a0a;
  border-color: var(--text);
}
.deck[data-surface="raw-grid-brutal"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="raw-grid-brutal"] .grid.cols-bento .card:first-child p,
.deck[data-surface="raw-grid-brutal"] .grid.cols-bento .card:first-child i { color: #0a0a0a; }
.deck[data-surface="raw-grid-brutal"] .card {
  border: 3px solid var(--text);
  border-radius: 0;
}
.deck[data-surface="raw-grid-brutal"] .quote {
  border-left: 6px solid var(--text);
  font-weight: 900;
  text-transform: uppercase;
}
.deck[data-surface="peoples-platform-poster"] .stat {
  border-top: 4px solid var(--accent);
}
.deck[data-surface="peoples-platform-poster"] .stat .value {
  color: var(--accent);
  font-family: var(--heading-font);
}
.deck[data-surface="peoples-platform-poster"] .comparison-col {
  border: 3px solid var(--text);
  border-radius: 0;
  background: #fff;
}
.deck[data-surface="peoples-platform-poster"] .comparison-col:last-child {
  /* Orange accent2 — blue accent labels fail AA; keep ink */
  background: var(--accent2);
  color: #1a1a1a;
}
.deck[data-surface="peoples-platform-poster"] .comparison-col:last-child .comparison-label,
.deck[data-surface="peoples-platform-poster"] .comparison-col:last-child p { color: #1a1a1a; }
.deck[data-surface="peoples-platform-poster"] .grid.cols-bento .card:first-child {
  background: var(--accent2);
  color: #1a1a1a;
  border-color: var(--text);
}
.deck[data-surface="peoples-platform-poster"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="peoples-platform-poster"] .grid.cols-bento .card:first-child p,
.deck[data-surface="peoples-platform-poster"] .grid.cols-bento .card:first-child i { color: #1a1a1a; }
.deck[data-surface="peoples-platform-poster"] .quote {
  border-left: 6px solid var(--accent);
  font-weight: 800;
}
.deck[data-surface="stencil-tablet-earth"] .stat {
  border-top: 4px solid var(--text);
}
.deck[data-surface="stencil-tablet-earth"] .stat .value {
  font-family: var(--heading-font);
  letter-spacing: 0.02em;
  text-transform: uppercase;
}
.deck[data-surface="stencil-tablet-earth"] .comparison-col {
  border: 2px solid var(--text);
  border-radius: 20px;
  background: var(--card-bg);
}
.deck[data-surface="stencil-tablet-earth"] .comparison-col:last-child {
  background: var(--accent2);
  color: #fff;
}
.deck[data-surface="stencil-tablet-earth"] .comparison-col:last-child .comparison-label,
.deck[data-surface="stencil-tablet-earth"] .comparison-col:last-child p { color: #fff; }
.deck[data-surface="stencil-tablet-earth"] .quote {
  border-left: 5px solid var(--accent);
  font-family: var(--heading-font);
  text-transform: uppercase;
}

/* Cobalt grid / cartesian / pin-paper — draft & pad content */
.deck[data-surface="cobalt-grid-paper"] .stat {
  border-top: 2px solid var(--accent);
}
.deck[data-surface="cobalt-grid-paper"] .stat .value {
  color: var(--accent);
  font-family: var(--heading-font);
}
.deck[data-surface="cobalt-grid-paper"] .comparison-col {
  border-radius: 0;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid color-mix(in srgb, var(--accent) 25%, transparent);
}
.deck[data-surface="cobalt-grid-paper"] .comparison-col:last-child {
  border-left: 4px solid var(--accent);
}
.deck[data-surface="cobalt-grid-paper"] .card {
  border-radius: 0;
  background: rgba(255, 255, 255, 0.65);
  border: 1px solid color-mix(in srgb, var(--accent) 20%, transparent);
}
.deck[data-surface="cartesian-draft"] .stat {
  border-top: 1px solid var(--accent);
}
.deck[data-surface="cartesian-draft"] .stat .value {
  font-family: var(--heading-font);
  font-weight: 400;
}
.deck[data-surface="cartesian-draft"] .comparison-col {
  border-radius: 0;
  background: transparent;
  border-top: 1px solid var(--border);
  padding-left: 0;
}
.deck[data-surface="cartesian-draft"] .comparison-col:last-child {
  border-top-color: var(--text);
}
.deck[data-surface="cartesian-draft"] .quote {
  border-left: none;
  font-family: var(--heading-font);
  font-style: italic;
  max-width: 30ch;
}
.deck[data-surface="cartesian-draft"] .quote::before {
  content: "";
  display: block;
  width: 48px;
  height: 1px;
  background: var(--accent);
  margin-bottom: 22px;
}
.deck[data-surface="pin-paper-pad"] .stat {
  border-top: 2px solid var(--accent);
  background: rgba(255, 255, 255, 0.55);
  padding: 12px 14px;
}
.deck[data-surface="pin-paper-pad"] .comparison-col {
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid color-mix(in srgb, var(--text) 18%, transparent);
  border-radius: 4px;
  box-shadow: 2px 3px 0 rgba(31, 58, 138, 0.1);
}
.deck[data-surface="pin-paper-pad"] .comparison-col:last-child {
  border-color: var(--accent);
}
.deck[data-surface="pin-paper-pad"] .quote {
  border-left: 3px solid var(--accent);
  font-family: "Caveat", cursive;
  font-size: clamp(26px, 3vw, 36px);
}

/* Pink script / split pastel / tri-tone — fashion & night content */
.deck[data-surface="pink-script-afterhours"] .stat {
  border-top: 2px solid var(--accent);
}
.deck[data-surface="pink-script-afterhours"] .stat .value {
  color: var(--accent);
  font-family: var(--heading-font);
  font-style: italic;
}
.deck[data-surface="pink-script-afterhours"] .comparison-col {
  border-radius: 0;
  border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);
  background: color-mix(in srgb, var(--accent) 8%, transparent);
}
.deck[data-surface="pink-script-afterhours"] .comparison-col:last-child {
  background: var(--accent);
  color: #060507;
}
.deck[data-surface="pink-script-afterhours"] .comparison-col:last-child .comparison-label,
.deck[data-surface="pink-script-afterhours"] .comparison-col:last-child p { color: #060507; }
.deck[data-surface="pink-script-afterhours"] .grid.cols-bento .card:first-child {
  background: var(--accent);
  color: #060507;
  border-color: var(--accent);
}
.deck[data-surface="pink-script-afterhours"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="pink-script-afterhours"] .grid.cols-bento .card:first-child p,
.deck[data-surface="pink-script-afterhours"] .grid.cols-bento .card:first-child i { color: #060507; }
.deck[data-surface="pink-script-afterhours"] .quote {
  border-left: none;
  font-family: var(--heading-font);
  font-style: italic;
  color: var(--accent);
  max-width: 28ch;
}
.deck[data-surface="split-pastel-panels"] .stat {
  border-top: 3px solid var(--text);
  background: rgba(255, 255, 255, 0.7);
  border-radius: 16px;
  padding: 14px 16px;
}
.deck[data-surface="split-pastel-panels"] .comparison-col {
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.75);
  border: none;
}
.deck[data-surface="split-pastel-panels"] .comparison-col:last-child {
  /* Mint accent fails accent-colored labels — force ink */
  background: var(--accent);
  color: #1a1a1a;
}
.deck[data-surface="split-pastel-panels"] .comparison-col:last-child .comparison-label,
.deck[data-surface="split-pastel-panels"] .comparison-col:last-child p { color: #1a1a1a; }
.deck[data-surface="split-pastel-panels"] .grid.cols-bento .card:first-child {
  background: var(--accent);
  color: #1a1a1a;
  border-color: var(--text);
}
.deck[data-surface="split-pastel-panels"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="split-pastel-panels"] .grid.cols-bento .card:first-child p,
.deck[data-surface="split-pastel-panels"] .grid.cols-bento .card:first-child i { color: #1a1a1a; }
.deck[data-surface="split-pastel-panels"] .quote {
  border-left: 5px solid var(--text);
  font-weight: 800;
}
.deck[data-surface="tri-tone-blocks"] .stat {
  border-top: 6px solid #f2b6c6;
}
.deck[data-surface="tri-tone-blocks"] .stat:nth-child(2) { border-top-color: #f2d86a; }
.deck[data-surface="tri-tone-blocks"] .stat:nth-child(3) { border-top-color: #7a1f35; }
.deck[data-surface="tri-tone-blocks"] .comparison-col {
  border-radius: 0;
  border: 2px solid var(--text);
  background: #fff;
}
.deck[data-surface="tri-tone-blocks"] .comparison-col:last-child {
  background: #7a1f35;
  color: #fff;
}
.deck[data-surface="tri-tone-blocks"] .comparison-col:last-child .comparison-label,
.deck[data-surface="tri-tone-blocks"] .comparison-col:last-child p { color: #fff; }
.deck[data-surface="tri-tone-blocks"] .quote {
  border-left: none;
  font-family: var(--heading-font);
  font-style: italic;
  max-width: 30ch;
}
.deck[data-surface="tri-tone-blocks"] .quote::before {
  content: "";
  display: block;
  width: 48px;
  height: 6px;
  background: #f2d86a;
  margin-bottom: 20px;
}

/* Grove / emerald / editorial forest / long-table / mat — editorial earth */
.deck[data-surface="grove-monograph"] .stat {
  border-top: 2px solid var(--accent2);
}
.deck[data-surface="grove-monograph"] .stat .value {
  font-family: var(--heading-font);
  font-style: italic;
  color: var(--accent2);
}
.deck[data-surface="grove-monograph"] .comparison-col {
  border-radius: 0;
  background: color-mix(in srgb, var(--bg-2) 70%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent2) 35%, transparent);
}
.deck[data-surface="grove-monograph"] .quote {
  border-left: none;
  font-family: var(--heading-font);
  font-style: italic;
  max-width: 30ch;
}
.deck[data-surface="grove-monograph"] .quote::before {
  content: "";
  display: block;
  width: 40px;
  height: 1px;
  background: var(--accent2);
  margin-bottom: 22px;
}
.deck[data-surface="emerald-editorial-masthead"] .stat {
  border-top: 3px solid var(--accent);
}
.deck[data-surface="emerald-editorial-masthead"] .stat .value {
  font-family: var(--heading-font);
  color: var(--text);
}
.deck[data-surface="emerald-editorial-masthead"] .comparison-col {
  border-radius: 0;
  background: transparent;
  border-top: 2px solid var(--accent);
  padding-left: 0;
}
.deck[data-surface="emerald-editorial-masthead"] .quote {
  border-left: none;
  font-family: var(--heading-font);
  max-width: 32ch;
}
.deck[data-surface="emerald-editorial-masthead"] .quote::before {
  content: "";
  display: block;
  width: 56px;
  height: 3px;
  background: var(--accent);
  margin-bottom: 22px;
}
.deck[data-surface="editorial-forest-paper"] .comparison-col {
  border-radius: 0;
  background: transparent;
  border-top: 1px solid color-mix(in srgb, var(--text) 25%, transparent);
  padding-left: 0;
}
.deck[data-surface="editorial-forest-paper"] .comparison-col:last-child {
  border-top-color: var(--accent);
}
.deck[data-surface="editorial-forest-paper"] .quote {
  border-left: none;
  font-family: var(--heading-font);
  font-style: italic;
  max-width: 30ch;
}
.deck[data-surface="editorial-forest-paper"] .quote::before {
  content: "";
  display: block;
  width: 40px;
  height: 2px;
  background: var(--accent2);
  margin-bottom: 20px;
}
.deck[data-surface="editorial-forest-paper"] .card {
  border-radius: 0;
  background: color-mix(in srgb, #fff 70%, transparent);
  border: 1px solid color-mix(in srgb, var(--text) 15%, transparent);
}
.deck[data-surface="long-table-supper"] .stat {
  border-top: 2px solid var(--accent);
}
.deck[data-surface="long-table-supper"] .stat .value {
  font-family: var(--heading-font);
  font-style: italic;
}
.deck[data-surface="long-table-supper"] .comparison-col {
  border-radius: 0;
  background: transparent;
  border-top: 1px solid var(--accent);
}
.deck[data-surface="long-table-supper"] .quote {
  border-left: none;
  font-family: var(--heading-font);
  font-style: italic;
  max-width: 28ch;
}
.deck[data-surface="long-table-supper"] .quote::before {
  content: "";
  display: block;
  width: 64px;
  height: 1px;
  background: var(--accent);
  margin-bottom: 22px;
}
.deck[data-surface="mat-woodglow"] .stat {
  border-top: 3px solid var(--accent);
}
.deck[data-surface="mat-woodglow"] .stat .value {
  color: var(--accent);
}
.deck[data-surface="mat-woodglow"] .comparison-col {
  border-radius: 0;
  background: color-mix(in srgb, var(--bg-2) 55%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);
}
.deck[data-surface="mat-woodglow"] .comparison-col:last-child {
  /* Amber fill fails cream copy — ink clears WCAG AA */
  background: var(--accent);
  color: #1a1208;
}
.deck[data-surface="mat-woodglow"] .comparison-col:last-child .comparison-label,
.deck[data-surface="mat-woodglow"] .comparison-col:last-child p { color: #1a1208; }
.deck[data-surface="mat-woodglow"] .grid.cols-bento .card:first-child {
  background: var(--accent);
  color: #1a1208;
  border-color: var(--text);
}
.deck[data-surface="mat-woodglow"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="mat-woodglow"] .grid.cols-bento .card:first-child p,
.deck[data-surface="mat-woodglow"] .grid.cols-bento .card:first-child i { color: #1a1208; }
.deck[data-surface="mat-woodglow"] .quote {
  border-left: 4px solid var(--accent);
}

/* Monochrome / blue-professional / corporate / playful / retro-windows / arcade polish */
.deck[data-surface="monochrome-ledger"] .stat {
  border-top: 1px solid var(--text);
}
.deck[data-surface="monochrome-ledger"] .stat .value {
  font-family: var(--heading-font);
  font-weight: 200;
  letter-spacing: -0.04em;
}
.deck[data-surface="monochrome-ledger"] .comparison-col {
  border-radius: 0;
  background: transparent;
  border-top: 1px solid color-mix(in srgb, var(--text) 30%, transparent);
  padding-left: 0;
}
.deck[data-surface="monochrome-ledger"] .quote {
  border-left: none;
  font-family: var(--body-font);
  font-style: italic;
  max-width: 28ch;
}
.deck[data-surface="monochrome-ledger"] .quote::before {
  content: "";
  display: block;
  width: 32px;
  height: 1px;
  background: var(--text);
  margin-bottom: 24px;
}
.deck[data-surface="monochrome-ledger"] .card {
  border-radius: 0;
  background: transparent;
  border: 1px solid color-mix(in srgb, var(--text) 22%, transparent);
}
.deck[data-surface="blue-professional-clean"] .stat {
  border-top: 3px solid var(--accent);
}
.deck[data-surface="blue-professional-clean"] .stat .value {
  color: var(--accent);
  font-weight: 700;
}
.deck[data-surface="blue-professional-clean"] .comparison-col {
  border-radius: 12px;
  background: color-mix(in srgb, var(--accent) 4%, #fff);
  border: 1px solid color-mix(in srgb, var(--accent) 18%, transparent);
}
.deck[data-surface="blue-professional-clean"] .comparison-col:last-child {
  background: var(--accent);
  color: #fff;
}
.deck[data-surface="blue-professional-clean"] .comparison-col:last-child .comparison-label,
.deck[data-surface="blue-professional-clean"] .comparison-col:last-child p { color: #fff; }
.deck[data-surface="blue-professional-clean"] .grid.cols-bento .card:first-child {
  background: var(--accent);
  color: #fff;
  border-color: color-mix(in srgb, var(--accent) 40%, transparent);
}
.deck[data-surface="blue-professional-clean"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="blue-professional-clean"] .grid.cols-bento .card:first-child p,
.deck[data-surface="blue-professional-clean"] .grid.cols-bento .card:first-child i { color: #fff; }
.deck[data-surface="blue-professional-clean"] .card {
  border-radius: 12px;
  border: 1px solid color-mix(in srgb, var(--accent) 16%, transparent);
  background: color-mix(in srgb, var(--accent) 4%, #fff);
}
.deck[data-surface="clean-light"] .stat {
  border-top: 3px solid var(--accent);
}
.deck[data-surface="clean-light"] .comparison-col {
  border-radius: 8px;
  background: var(--card-bg);
  border: 1px solid var(--border);
}
.deck[data-surface="clean-light"] .comparison-col:last-child {
  border-color: var(--accent);
  box-shadow: inset 3px 0 0 var(--accent);
}
.deck[data-surface="clean-light"] .quote {
  border-left: 3px solid var(--accent);
}
.deck[data-surface="soft-bento"] .stat {
  border-top: 4px solid var(--accent);
  border-radius: 16px;
  background: color-mix(in srgb, var(--accent) 6%, #fff);
  padding: 14px 16px;
}
.deck[data-surface="soft-bento"] .comparison-col {
  border-radius: 20px;
  border: 2px solid color-mix(in srgb, var(--accent) 25%, transparent);
  background: #fff;
}
.deck[data-surface="soft-bento"] .comparison-col:last-child {
  background: var(--accent2);
  border-color: var(--accent2);
  color: #1a1a2e;
}
.deck[data-surface="soft-bento"] .comparison-col:last-child .comparison-label,
.deck[data-surface="soft-bento"] .comparison-col:last-child p { color: #1a1a2e; }
.deck[data-surface="soft-bento"] .grid.cols-bento .card:first-child {
  background: var(--accent2);
  color: #1a1a2e;
  border-color: var(--accent2);
}
.deck[data-surface="soft-bento"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="soft-bento"] .grid.cols-bento .card:first-child p,
.deck[data-surface="soft-bento"] .grid.cols-bento .card:first-child i { color: #1a1a2e; }
.deck[data-surface="soft-bento"] .quote {
  border-left: 5px solid var(--accent);
  font-weight: 800;
}
.deck[data-surface="retro-windows-chrome"] .stat {
  border-top: none;
  background: #fff;
  border: 2px solid #000;
  box-shadow: inset -2px -2px 0 #808080, inset 2px 2px 0 #fff;
  padding: 12px 14px;
  border-radius: 0;
}
.deck[data-surface="retro-windows-chrome"] .comparison-col {
  border-radius: 0;
  background: #fff;
  border: 2px solid #000;
  box-shadow: inset -2px -2px 0 #808080, inset 2px 2px 0 #fff;
}
.deck[data-surface="retro-windows-chrome"] .comparison-col:last-child {
  background: #000080;
  color: #fff;
  box-shadow: none;
}
.deck[data-surface="retro-windows-chrome"] .comparison-col:last-child .comparison-label,
.deck[data-surface="retro-windows-chrome"] .comparison-col:last-child p { color: #fff; }
.deck[data-surface="retro-windows-chrome"] .quote {
  border-left: 4px solid #000080;
  font-family: "VT323", monospace;
  font-size: clamp(28px, 3.2vw, 40px);
}
.deck[data-surface="retro-windows-chrome"] .card {
  border-radius: 0;
  background: #fff;
  border: 2px solid #000;
  box-shadow: inset -2px -2px 0 #808080, inset 2px 2px 0 #fff;
}
.deck[data-surface="scanline-neon"] .comparison-col {
  border-radius: 0;
  background: color-mix(in srgb, var(--accent) 8%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent2) 45%, transparent);
}
.deck[data-surface="scanline-neon"] .comparison-col:last-child {
  /* Arcade magenta fails pure white — darken fill for AA */
  background: color-mix(in srgb, var(--accent) 72%, #050008);
  color: #fff;
  border-color: var(--accent);
  box-shadow: 0 0 18px color-mix(in srgb, var(--accent) 35%, transparent);
}
.deck[data-surface="scanline-neon"] .comparison-col:last-child .comparison-label,
.deck[data-surface="scanline-neon"] .comparison-col:last-child p { color: #fff; }
.deck[data-surface="scanline-neon"] .grid.cols-bento .card:first-child {
  background: color-mix(in srgb, var(--accent) 72%, #050008);
  color: #fff;
  border-color: var(--accent2);
}
.deck[data-surface="scanline-neon"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="scanline-neon"] .grid.cols-bento .card:first-child p,
.deck[data-surface="scanline-neon"] .grid.cols-bento .card:first-child i { color: #fff; }
.deck[data-surface="scanline-neon"] .card {
  border-radius: 0;
  border: 1px solid color-mix(in srgb, var(--accent2) 35%, transparent);
  background: color-mix(in srgb, var(--accent) 6%, transparent);
}
.deck[data-surface="scanline-neon"] .quote {
  border-left: 3px solid var(--accent);
  text-shadow: 0 0 12px color-mix(in srgb, var(--accent) 40%, transparent);
}
.deck[data-surface="brutalist-grid"] .stat {
  border-top: 3px solid var(--text);
}
.deck[data-surface="brutalist-grid"] .stat .value {
  font-family: var(--heading-font);
  color: var(--accent);
}
.deck[data-surface="brutalist-grid"] .comparison-col:last-child {
  background: var(--accent);
  color: #111;
  border-color: var(--text);
}
.deck[data-surface="brutalist-grid"] .comparison-col:last-child .comparison-label,
.deck[data-surface="brutalist-grid"] .comparison-col:last-child p { color: #111; }
.deck[data-surface="brutalist-grid"] .grid.cols-bento .card:first-child {
  background: var(--accent);
  color: #111;
  border-color: var(--text);
}
.deck[data-surface="brutalist-grid"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="brutalist-grid"] .grid.cols-bento .card:first-child p,
.deck[data-surface="brutalist-grid"] .grid.cols-bento .card:first-child i { color: #111; }
.deck[data-surface="brutalist-grid"] .quote {
  border-left: 4px solid var(--accent);
  font-family: var(--heading-font);
  text-transform: uppercase;
}
.deck[data-surface="editorial-rule"] .stat {
  border-top: 2px solid var(--accent);
}
.deck[data-surface="editorial-rule"] .comparison-col {
  border-radius: 0;
  background: transparent;
  border-top: 1px solid color-mix(in srgb, var(--text) 28%, transparent);
  padding-left: 0;
}
.deck[data-surface="editorial-rule"] .comparison-col:last-child {
  border-top-color: var(--accent);
}
.deck[data-surface="editorial-rule"] .card {
  border-radius: 0;
  background: transparent;
  border: 1px solid color-mix(in srgb, var(--text) 18%, transparent);
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
`,XC="warm-paper",ZC="clean-light",e8="soft-bento",t8="bauhaus-blocks",n8="vapor-horizon",r8="hygge-soft",a8="blueprint-grid",o8="glass-mist",i8="newsprint-masthead",s8="vellum-colorfield",l8="broadside-fire",c8="signal-briefing",d8="coral-hatch",u8="capsule-pills",p8="studio-acid",f8="grove-monograph",g8="scatterbrain-cork",h8="mat-woodglow",m8="cartesian-draft",b8="monochrome-ledger",y8={claude:XC,"default-tech":"neon-glow",corporate:ZC,playful:e8,"luxury-minimalist":"quiet-luxe","retro-arcade":"scanline-neon","editorial-serif":"editorial-rule","brutalist-mono":"brutalist-grid","pastel-dreamy":"pastel-cloud","aurora-glass":"aurora-glass","ft-editorial":"broadsheet-rule","genz-bento":"hard-bento","crt-terminal":"crt-phosphor","swiss-typographic":"swiss-grid","candy-pop":"candy-blob","aerospace-hud":"hud-grid","brutalist-acid":"acid-block",bauhaus:t8,"y2k-aero":"aero-bubble","risograph-zine":"riso-print","neon-noir":"neon-rain",vaporwave:n8,"botanical-luxe":"botanical-leaf","heritage-editorial":"heritage-wash","fintech-clean":"fintech-soft","developer-dark":"dev-terminal","data-editorial":"data-rule",scandinavian:r8,"art-deco":"deco-fan","kinetic-wrapped":"wrapped-block",blueprint:a8,glassmorphism:o8,broadsheet:i8,"soft-editorial":"soft-editorial-paper","editorial-forest":"editorial-forest-paper","pin-and-paper":"pin-paper-pad",vellum:s8,"neo-grid-bold":"neo-grid-panels","editorial-tri-tone":"tri-tone-blocks","creative-mode":"creative-mode-blocks",broadside:l8,"bold-signal":"bold-signal-card","notebook-tabs":"notebook-tabs-page","creative-voltage":"creative-voltage-split",signal:c8,"electric-studio":"electric-studio-split","dark-botanical":"dark-botanical-bloom","pastel-geometry":"pastel-geometry-pills","split-pastel":"split-pastel-panels","vintage-editorial":"vintage-editorial-geo","paper-ink":"paper-ink-literary","biennale-yellow":"biennale-yellow-sun","bold-poster":"bold-poster-ink",coral:d8,"emerald-editorial":"emerald-editorial-masthead","sakura-chroma":"sakura-chroma-cassette","pink-script":"pink-script-afterhours","block-frame":"block-frame-brutal",capsule:u8,"cobalt-grid":"cobalt-grid-paper","8-bit-orbit":"bit-orbit-arcade",studio:p8,grove:f8,scatterbrain:g8,"peoples-platform":"peoples-platform-poster","retro-windows":"retro-windows-chrome","raw-grid":"raw-grid-brutal","long-table":"long-table-supper",mat:h8,"stencil-tablet":"stencil-tablet-earth",cartesian:m8,monochrome:b8,"blue-professional":"blue-professional-clean","daisy-days":"daisy-days-pastel","retro-zine":"retro-zine-riso"},v8=`<!doctype html>
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
`;function x8(e){return y8[e]??"gradient"}const k8=Object.assign({"../../../shared/layouts/closing.html":DC,"../../../shared/layouts/code.html":CC,"../../../shared/layouts/comparison.html":FC,"../../../shared/layouts/data-table.html":EC,"../../../shared/layouts/feature-grid.html":SC,"../../../shared/layouts/image-hero.html":AC,"../../../shared/layouts/quote.html":_C,"../../../shared/layouts/section.html":$C,"../../../shared/layouts/stat-row.html":TC,"../../../shared/layouts/timeline.html":jC,"../../../shared/layouts/title.html":PC,"../../../shared/layouts/two-column.html":MC}),l1=new Map;for(const[e,t]of Object.entries(k8)){const n=e.split("/").pop().replace(/\.html$/,"");l1.set(n,t)}function w8(e){return e.length===0?"":`https://fonts.googleapis.com/css2?family=${e.join("&family=")}&display=swap`}const D8=new Set(["http","https","mailto","tel"]);function c1(e){let t="";for(const n of e){const r=n.charCodeAt(0);r>31&&r!==127&&(t+=n)}return t}function d1(e){var t,n;return(n=(t=e.match(/^([a-zA-Z][a-zA-Z0-9+.-]*):/))==null?void 0:t[1])==null?void 0:n.toLowerCase()}function C8(e){if(typeof e!="string")return;const t=c1(e).trim(),n=d1(t);return n&&!D8.has(n)?"#":t}function F8(e){if(typeof e!="string")return;const t=c1(e).trim();if(/^data:image\//i.test(t))return t;const n=d1(t);return n&&n!=="http"&&n!=="https"?"":t}function E8(e){var n;const t={...e};return e.layout==="data-table"&&Array.isArray(e.rows)&&(t.rows=e.rows.map(r=>({cells:r}))),e.layout==="feature-grid"&&(e.columns==="bento"?t.columns="bento":typeof e.columns=="number"?t.columns=e.columns:e.columns||(t.columns=3)),((n=e.cta)==null?void 0:n.href)!==void 0&&(t.cta={...e.cta,href:C8(e.cta.href)}),e.image!==void 0&&(t.image=F8(e.image)),t}const S8='<footer class="pmd-attribution">Made with <a href="https://presentation-md.vercel.app/?ref=studio" target="_blank" rel="noopener">presentation-md</a></footer>',A8=`
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
@media print { .pmd-attribution { opacity: 0.5; } }`;function _8(e){return`<script type="application/json" id="pmd-deck">${JSON.stringify(e).replace(/</g,"\\u003c")}<\/script>`}function u1(e,t){var d,f,h;const n={bg:t.palette.bg,bg2:t.palette.bg2,text:t.palette.text,muted:t.palette.muted,accent:t.palette.accent,accent2:t.palette.accent2,cardBg:t.palette.cardBg,border:t.palette.border,radius:t.geometry.radius,slideW:t.geometry.slideWidth,headingFont:t.typography.headingFont,bodyFont:t.typography.bodyFont,headingWeight:String(t.typography.headingWeight)},r=xe.render(JC,n),a=w8(t.typography.googleFonts),o=x8(t.name);let i=a?`@import url('${a}');

${r}

${ml}`:`${r}

${ml}`;i+=`

${A8}`;const s=(Array.isArray(e.slides)?e.slides:[]).map(m=>{const b=l1.get(m.layout);return b?xe.render(b,E8(m)):`<section class="slide"><h2>Unknown layout: ${m.layout}</h2></section>`}).join(`
`),l=((d=e.meta)==null?void 0:d.title)??((f=e.meta)==null?void 0:f.company)??"Presentation";return xe.render(v8,{title:l,description:((h=e.meta)==null?void 0:h.description)??"",styles:i,slides:s,surface:o,attribution:S8,deckData:_8(e)})}const $8="modulepreload",T8=function(e){return"/studio/"+e},bl={},es=function(t,n,r){let a=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),s=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));a=Promise.allSettled(n.map(l=>{if(l=T8(l),l in bl)return;bl[l]=!0;const d=l.endsWith(".css"),f=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${f}`))return;const h=document.createElement("link");if(h.rel=d?"stylesheet":$8,d||(h.as="script"),h.crossOrigin="",h.href=l,s&&h.setAttribute("nonce",s),document.head.appendChild(h),d)return new Promise((m,b)=>{h.addEventListener("load",m),h.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${l}`)))})}))}function o(i){const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=i,window.dispatchEvent(s),!s.defaultPrevented)throw i}return a.then(i=>{for(const s of i||[])s.status==="rejected"&&o(s.reason);return t().catch(o)})};function ts(e,t){const n=URL.createObjectURL(e),r=document.createElement("a");r.href=n,r.download=t,document.body.appendChild(r),r.click(),r.remove(),URL.revokeObjectURL(n)}function ns(e,t){var r,a;return`${(((r=e.meta)==null?void 0:r.title)??((a=e.meta)==null?void 0:a.company)??"deck").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"deck"}.${t}`}function p1(e){var t;return((t=e.meta)==null?void 0:t.theme)??"default-tech"}async function j8(e){const t=[],n=fn(p1(e)),{deckToPptxBlob:r}=await es(async()=>{const{deckToPptxBlob:o}=await import("./index-Cusqe-qR.js");return{deckToPptxBlob:o}},__vite__mapDeps([0,1,2])),a=await r(e,n,{prefetchImages:!0,onWarn:o=>t.push(o)});return ts(a,ns(e,"pptx")),{warnings:t}}function P8(e){const t=fn(p1(e)),n=u1(e,t);ts(new Blob([n],{type:"text/html"}),ns(e,"html"))}function M8(e){ts(new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),ns(e,"json"))}function rs(e){const t=JSON.parse(e);if((t==null?void 0:t.type)!=="deck"||!Array.isArray(t.slides))throw new Error('Not a valid deck: expected { "type": "deck", "slides": [...] }');return t}async function N8(e,t="default-tech"){const{pptxToDeck:n}=await es(async()=>{const{pptxToDeck:i}=await import("./index-Bfaa0F9D.js");return{pptxToDeck:i}},__vite__mapDeps([3,1,2])),r=[],{deck:a,warnings:o}=await n(new Uint8Array(e),{theme:t,onWarn:i=>r.push(i)});return{deck:a,warnings:[...r,...o]}}function I8(e){var r,a,o;const t=["pmd-deck","psp-deck"];if(typeof DOMParser<"u"){const i=new DOMParser().parseFromString(e,"text/html");for(const s of t){const l=(a=(r=i.getElementById(s))==null?void 0:r.textContent)==null?void 0:a.trim();if(l)return l}}const n=e.match(/<script[^>]*id=["'](?:pmd-deck|psp-deck)["'][^>]*>([\s\S]*?)<\/script>/i);return(o=n==null?void 0:n[1])==null?void 0:o.trim()}function B8(e){const t=I8(e);if(!t)throw new Error("No editable deck found in this HTML. Only presentations created by presentation-md (with an embedded source) can be opened.");return rs(t)}function z8(e,t){return/\.html?$/i.test(e)?B8(t):rs(t)}function O8({deck:e,exampleSlug:t,onChange:n,onLoadExample:r,onPresent:a,onGenerate:o}){var A,C,G,T;const i=I.useRef(null),[s,l]=I.useState(""),[d,f]=I.useState(!1),[h,m]=I.useState(""),b=I.useMemo(()=>wC(),[]),y=((A=e.meta)==null?void 0:A.theme)??"default-tech",v=b.find(F=>F.name===y)??{bg:fn(y).palette.bg,accent:fn(y).palette.accent},_=b.filter(F=>{if(!h.trim())return!0;const R=h.trim().toLowerCase();return F.name.toLowerCase().includes(R)||F.vibe.toLowerCase().includes(R)}),p=F=>n({...e,meta:{...e.meta,...F}}),u=F=>p({theme:F}),g=F=>p({title:F}),x=async F=>{try{if(/\.pptx$/i.test(F.name)){f(!0),l("Importing .pptx…");const{deck:J,warnings:zt}=await N8(await F.arrayBuffer(),y);n(J),l(zt.length?`Imported ${F.name} (${zt.length} warning${zt.length>1?"s":""})`:`Imported ${F.name}`);return}const R=z8(F.name,await F.text());n(R),l(`Opened ${F.name}`)}catch(R){l(`Open failed: ${R.message}`)}finally{f(!1)}},D=async()=>{f(!0),l("Building .pptx…");try{const{warnings:F}=await j8(e);l(F.length?`Exported .pptx (${F.length} warning${F.length>1?"s":""})`:"Exported .pptx")}catch(F){l(`Export failed: ${F.message}`)}finally{f(!1)}},w=async()=>{const R=_5(t??"acme"),J=typeof window<"u"?`${window.location.origin}${R.startsWith("/")?R:`/${R}`}`:R;try{await navigator.clipboard.writeText(J),l("Copied Studio link")}catch{l(J)}};return c.jsxs("header",{className:"toolbar",children:[c.jsxs("div",{className:"brand",children:[c.jsx("a",{className:"brand-link",href:"https://presentation-md.vercel.app/",target:"_blank",rel:"noopener noreferrer",children:c.jsx("strong",{children:"presentation-md"})}),c.jsx("span",{className:"muted small",children:"Studio · live craft"})]}),c.jsx("input",{className:"text-input title-input",value:((C=e.meta)==null?void 0:C.title)??"",placeholder:"Deck title",onChange:F=>g(F.target.value)}),c.jsxs("details",{className:"theme-browser",onToggle:F=>{F.target.open||m("")},children:[c.jsxs("summary",{className:"btn btn-sm theme-trigger",title:"Browse 75 themes",children:[c.jsx("span",{className:"theme-swatch",style:{"--swatch-bg":v.bg,"--swatch-accent":v.accent},"aria-hidden":!0}),c.jsx("span",{children:y}),c.jsx("span",{"aria-hidden":!0,children:"▾"})]}),c.jsxs("div",{className:"theme-browser-panel",children:[c.jsx("input",{className:"text-input theme-search",value:h,placeholder:"Search themes…",autoFocus:!0,onChange:F=>m(F.target.value)}),c.jsxs("div",{className:"theme-count",children:[_.length," / ",b.length," themes"]}),c.jsx("ul",{className:"theme-list",children:_.map(F=>c.jsx("li",{children:c.jsxs("button",{type:"button",className:`theme-option${F.name===y?" active":""}`,onClick:R=>{u(F.name);const J=R.currentTarget.closest("details");J&&(J.open=!1)},children:[c.jsx("span",{className:"theme-swatch",style:{"--swatch-bg":F.bg,"--swatch-accent":F.accent},"aria-hidden":!0}),c.jsxs("span",{className:"theme-option-meta",children:[c.jsx("span",{className:"theme-option-name",children:F.name}),c.jsx("span",{className:"theme-option-vibe",children:F.vibe})]})]})},F.name))})]})]}),c.jsxs("details",{className:"deck-details",children:[c.jsx("summary",{className:"btn btn-sm",children:"Details"}),c.jsxs("div",{className:"deck-details-body",children:[c.jsx("input",{className:"text-input",value:((G=e.meta)==null?void 0:G.company)??"",placeholder:"Company",onChange:F=>p({company:F.target.value})}),c.jsx("input",{className:"text-input",value:((T=e.meta)==null?void 0:T.description)??"",placeholder:"Description",onChange:F=>p({description:F.target.value})})]})]}),c.jsx("div",{className:"spacer"}),c.jsx("button",{className:"btn btn-generate",onClick:o,title:"Generate a deck from a prompt",children:"Generate"}),c.jsxs("details",{className:"example-browser",children:[c.jsx("summary",{className:"btn",title:"Load a curated example deck",children:"Example ▾"}),c.jsx("div",{className:"example-browser-panel",children:c.jsx("ul",{className:"example-list",children:Xi.map(F=>c.jsx("li",{children:c.jsx("button",{type:"button",className:t===F.slug?"active":void 0,onClick:R=>{r(F.slug);const J=R.currentTarget.closest("details");J&&(J.open=!1)},children:F.label})},F.slug))})})]}),c.jsx("button",{className:"btn",onClick:()=>void w(),title:"Copy a shareable Studio deep-link",children:"Copy link"}),c.jsx("button",{className:"btn",onClick:()=>{var F;return(F=i.current)==null?void 0:F.click()},title:"Open a deck .html, .json, or .pptx",children:"Open"}),c.jsx("button",{className:"btn",onClick:a,title:"Present fullscreen",children:"Present"}),c.jsx("button",{className:"btn",onClick:()=>M8(e),children:"JSON"}),c.jsx("button",{className:"btn",onClick:()=>P8(e),children:"HTML"}),c.jsx("button",{className:"btn btn-primary",disabled:d,onClick:D,children:d?"…":"Download .pptx"}),c.jsx("input",{ref:i,type:"file",accept:".html,.htm,.json,.pptx,application/json,text/html,application/vnd.openxmlformats-officedocument.presentationml.presentation",hidden:!0,onChange:F=>{var J;const R=(J=F.target.files)==null?void 0:J[0];R&&x(R),F.target.value=""}}),s&&c.jsx("span",{className:"status muted small",children:s})]})}function L8({slides:e,selected:t,onSelect:n,onChange:r}){const[a,o]=I.useState("title"),i=()=>{const f=t+1,h=[...e.slice(0,f),Hk(a),...e.slice(f)];r(h,f)},s=f=>{const h=JSON.parse(JSON.stringify(e[f]));r([...e.slice(0,f+1),h,...e.slice(f+1)],f+1)},l=f=>{if(e.length<=1)return;const h=e.filter((m,b)=>b!==f);r(h,Math.max(0,Math.min(f,h.length-1)))},d=(f,h)=>{const m=f+h;if(m<0||m>=e.length)return;const b=e.slice();[b[f],b[m]]=[b[m],b[f]],r(b,m)};return c.jsxs("div",{className:"slide-list",children:[c.jsxs("div",{className:"add-row",children:[c.jsx("select",{className:"text-input",value:a,onChange:f=>o(f.target.value),children:Uk.map(f=>c.jsx("option",{value:f,children:ti[f]},f))}),c.jsx("button",{className:"btn btn-sm",onClick:i,children:"+ Add"})]}),c.jsx("ul",{className:"slides",children:e.map((f,h)=>c.jsxs("li",{className:`slide-row ${h===t?"active":""}`,onClick:()=>n(h),children:[c.jsxs("div",{className:"slide-row-main",children:[c.jsx("span",{className:"slide-row-num",children:h+1}),c.jsxs("div",{className:"slide-row-text",children:[c.jsxs("span",{className:"slide-row-layout",children:[ti[f.layout]??f.layout,(f.notes??"").trim()?c.jsx("span",{className:"notes-dot",title:"Has speaker notes","aria-label":"Has speaker notes",children:"N"}):null]}),c.jsx("span",{className:"slide-row-title",children:f.heading??f.quote??f.eyebrow??"—"})]})]}),c.jsxs("div",{className:"slide-row-actions",onClick:m=>m.stopPropagation(),children:[c.jsx("button",{className:"btn btn-icon",title:"Move up",onClick:()=>d(h,-1),children:"↑"}),c.jsx("button",{className:"btn btn-icon",title:"Move down",onClick:()=>d(h,1),children:"↓"}),c.jsx("button",{className:"btn btn-icon",title:"Duplicate",onClick:()=>s(h),children:"⧉"}),c.jsx("button",{className:"btn btn-icon btn-danger",title:"Delete",onClick:()=>l(h),children:"✕"})]})]},h))})]})}function as({label:e,children:t}){return c.jsxs("label",{className:"field",children:[c.jsx("span",{className:"field-label",children:e}),t]})}function P({label:e,value:t,onChange:n,placeholder:r}){return c.jsx(as,{label:e,children:c.jsx("input",{className:"text-input",type:"text",value:t??"",placeholder:r,onChange:a=>n(a.target.value)})})}function Se({label:e,value:t,onChange:n,rows:r=3}){return c.jsx(as,{label:e,children:c.jsx("textarea",{className:"text-input",rows:r,value:t??"",onChange:a=>n(a.target.value)})})}function _r({label:e,value:t,options:n,onChange:r}){return c.jsx(as,{label:e,children:c.jsx("select",{className:"text-input",value:t,onChange:a=>r(a.target.value),children:n.map(a=>c.jsx("option",{value:a.value,children:a.label},a.value))})})}function Wr({label:e,items:t,onChange:n,blank:r,renderItem:a}){const o=(s,l)=>n(t.map((d,f)=>f===s?l:d)),i=(s,l)=>{const d=s+l;if(d<0||d>=t.length)return;const f=t.slice();[f[s],f[d]]=[f[d],f[s]],n(f)};return c.jsxs("div",{className:"list-editor",children:[c.jsxs("div",{className:"list-editor-head",children:[c.jsx("span",{className:"field-label",children:e}),c.jsx("button",{className:"btn btn-sm",onClick:()=>n([...t,r()]),children:"+ Add"})]}),t.map((s,l)=>c.jsxs("div",{className:"list-item",children:[c.jsxs("div",{className:"list-item-controls",children:[c.jsx("span",{className:"list-item-index",children:l+1}),c.jsx("div",{className:"spacer"}),c.jsx("button",{className:"btn btn-icon",title:"Move up",onClick:()=>i(l,-1),children:"↑"}),c.jsx("button",{className:"btn btn-icon",title:"Move down",onClick:()=>i(l,1),children:"↓"}),c.jsx("button",{className:"btn btn-icon btn-danger",title:"Remove",onClick:()=>n(t.filter((d,f)=>f!==l)),children:"✕"})]}),a(s,d=>o(l,d),l)]},l)),t.length===0&&c.jsx("p",{className:"muted small",children:"No items yet."})]})}function G8({slide:e,onChange:t}){const n=o=>t({...e,...o}),r=e.layout;return c.jsxs("div",{className:"slide-form",children:[c.jsx("h2",{className:"panel-title",children:ti[r]??e.layout}),a(),c.jsx(Se,{label:"Speaker notes (exports to PPTX notes pane)",value:e.notes,onChange:o=>n({notes:o||void 0}),rows:3})]});function a(){var o,i;switch(e.layout){case"title":case"closing":return c.jsxs(c.Fragment,{children:[c.jsx(P,{label:"Eyebrow",value:e.eyebrow,onChange:s=>n({eyebrow:s})}),c.jsx(P,{label:"Heading",value:e.heading,onChange:s=>n({heading:s})}),c.jsx(Se,{label:"Lead",value:e.lead,onChange:s=>n({lead:s})}),e.layout==="closing"&&c.jsxs(c.Fragment,{children:[c.jsx(P,{label:"CTA label",value:(o=e.cta)==null?void 0:o.label,onChange:s=>n({cta:{...e.cta,label:s}})}),c.jsx(P,{label:"CTA link",value:(i=e.cta)==null?void 0:i.href,onChange:s=>n({cta:{...e.cta,href:s}})})]})]});case"section":return c.jsxs(c.Fragment,{children:[c.jsx(P,{label:"Number",value:e.number,onChange:s=>n({number:s})}),c.jsx(P,{label:"Eyebrow",value:e.eyebrow,onChange:s=>n({eyebrow:s})}),c.jsx(P,{label:"Heading",value:e.heading,onChange:s=>n({heading:s})}),c.jsx(Se,{label:"Lead",value:e.lead,onChange:s=>n({lead:s})})]});case"two-column":return c.jsxs(c.Fragment,{children:[c.jsx(P,{label:"Eyebrow",value:e.eyebrow,onChange:s=>n({eyebrow:s})}),c.jsx(P,{label:"Heading",value:e.heading,onChange:s=>n({heading:s})}),c.jsx(Se,{label:"Body",value:e.body,onChange:s=>n({body:s}),rows:5}),c.jsx(_r,{label:"Ratio",value:typeof e.ratio=="string"?e.ratio:"1-1",options:[{value:"1-1",label:"1:1 balanced"},{value:"2-1",label:"2:1 copy-heavy"},{value:"1-2",label:"1:2 media-heavy"},{value:"3-2",label:"3:2"},{value:"2-3",label:"2:3"}],onChange:s=>n({ratio:s})}),c.jsx(_r,{label:"Media side",value:e.reverse?"left":"right",options:[{value:"right",label:"Media on right"},{value:"left",label:"Media on left (reverse)"}],onChange:s=>n({reverse:s==="left"})}),c.jsx(P,{label:"Image URL (remote images prefetched into PPTX)",value:e.image,onChange:s=>n({image:s})}),c.jsx(P,{label:"Image alt",value:e.imageAlt,onChange:s=>n({imageAlt:s})}),c.jsx(Se,{label:"Aside (when no image)",value:e.aside,onChange:s=>n({aside:s}),rows:3})]});case"image-hero":return c.jsxs(c.Fragment,{children:[c.jsx(P,{label:"Eyebrow",value:e.eyebrow,onChange:s=>n({eyebrow:s})}),c.jsx(P,{label:"Heading",value:e.heading,onChange:s=>n({heading:s})}),c.jsx(Se,{label:"Lead",value:e.lead,onChange:s=>n({lead:s}),rows:3}),c.jsx(P,{label:"Image URL (remote images prefetched into PPTX)",value:e.image,onChange:s=>n({image:s})}),c.jsx(P,{label:"Image alt",value:e.imageAlt,onChange:s=>n({imageAlt:s})})]});case"comparison":return c.jsxs(c.Fragment,{children:[c.jsx(P,{label:"Eyebrow",value:e.eyebrow,onChange:s=>n({eyebrow:s})}),c.jsx(P,{label:"Heading",value:e.heading,onChange:s=>n({heading:s})}),c.jsx(P,{label:"Left label",value:e.leftLabel,onChange:s=>n({leftLabel:s})}),c.jsx(Se,{label:"Left body",value:e.left,onChange:s=>n({left:s}),rows:4}),c.jsx(P,{label:"Right label",value:e.rightLabel,onChange:s=>n({rightLabel:s})}),c.jsx(Se,{label:"Right body",value:e.right,onChange:s=>n({right:s}),rows:4}),c.jsx(_r,{label:"Emphasis",value:e.emphasis==="left"||e.emphasis==="right"?e.emphasis:"right",options:[{value:"left",label:"Grow left"},{value:"right",label:"Grow right"}],onChange:s=>n({emphasis:s})})]});case"code":return c.jsxs(c.Fragment,{children:[c.jsx(P,{label:"Eyebrow",value:e.eyebrow,onChange:s=>n({eyebrow:s})}),c.jsx(P,{label:"Heading",value:e.heading,onChange:s=>n({heading:s})}),c.jsx(P,{label:"Filename",value:e.filename,onChange:s=>n({filename:s})}),c.jsx(P,{label:"Language",value:e.language,onChange:s=>n({language:s})}),c.jsx(Se,{label:"Code",value:e.code,onChange:s=>n({code:s}),rows:8})]});case"quote":return c.jsxs(c.Fragment,{children:[c.jsx(Se,{label:"Quote",value:e.quote,onChange:s=>n({quote:s}),rows:4}),c.jsx(P,{label:"Attribution",value:e.by,onChange:s=>n({by:s})})]});case"feature-grid":return c.jsxs(c.Fragment,{children:[c.jsx(P,{label:"Eyebrow",value:e.eyebrow,onChange:s=>n({eyebrow:s})}),c.jsx(P,{label:"Heading",value:e.heading,onChange:s=>n({heading:s})}),c.jsx(_r,{label:"Columns",value:e.columns==="bento"?"bento":String(typeof e.columns=="number"?e.columns:3),options:[{value:"2",label:"2 columns"},{value:"3",label:"3 columns"},{value:"4",label:"4 columns"},{value:"bento",label:"Bento (hero + satellites)"}],onChange:s=>n({columns:s==="bento"?"bento":Number(s)})}),c.jsx(Wr,{label:"Cards",items:e.cards??[],onChange:s=>n({cards:s}),blank:()=>({title:"New card",body:""}),renderItem:(s,l)=>c.jsxs(c.Fragment,{children:[c.jsx(P,{label:"Icon (FontAwesome class)",value:s.icon,onChange:d=>l({...s,icon:d})}),c.jsx(P,{label:"Title",value:s.title,onChange:d=>l({...s,title:d})}),c.jsx(Se,{label:"Body",value:s.body,onChange:d=>l({...s,body:d}),rows:2})]})})]});case"stat-row":return c.jsxs(c.Fragment,{children:[c.jsx(P,{label:"Eyebrow",value:e.eyebrow,onChange:s=>n({eyebrow:s})}),c.jsx(P,{label:"Heading",value:e.heading,onChange:s=>n({heading:s})}),c.jsx(Wr,{label:"Stats",items:e.stats??[],onChange:s=>n({stats:s}),blank:()=>({value:"0",label:"Metric"}),renderItem:(s,l)=>c.jsxs(c.Fragment,{children:[c.jsx(P,{label:"Value",value:s.value,onChange:d=>l({...s,value:d})}),c.jsx(P,{label:"Label",value:s.label,onChange:d=>l({...s,label:d})})]})})]});case"timeline":return c.jsxs(c.Fragment,{children:[c.jsx(P,{label:"Eyebrow",value:e.eyebrow,onChange:s=>n({eyebrow:s})}),c.jsx(P,{label:"Heading",value:e.heading,onChange:s=>n({heading:s})}),c.jsx(Wr,{label:"Steps",items:e.steps??[],onChange:s=>n({steps:s}),blank:()=>({title:"New step",body:""}),renderItem:(s,l)=>c.jsxs(c.Fragment,{children:[c.jsx(P,{label:"Title",value:s.title,onChange:d=>l({...s,title:d})}),c.jsx(Se,{label:"Body",value:s.body,onChange:d=>l({...s,body:d}),rows:2})]})})]});case"data-table":return c.jsx(R8,{slide:e,set:n});default:return c.jsx("p",{className:"muted",children:"No editable fields for this layout."})}}}function R8({slide:e,set:t}){const n=Array.isArray(e.columns)?e.columns:[],r=Array.isArray(e.rows)?e.rows:[],a=Math.max(n.length,...r.map(l=>l.length),1),o=(l,d)=>{const f=n.slice();f[l]=d,t({columns:f})},i=()=>{t({columns:[...n,`Column ${n.length+1}`],rows:r.map(l=>[...l,""])})},s=l=>{t({columns:n.filter((d,f)=>f!==l),rows:r.map(d=>d.filter((f,h)=>h!==l))})};return c.jsxs(c.Fragment,{children:[c.jsx(P,{label:"Eyebrow",value:e.eyebrow,onChange:l=>t({eyebrow:l})}),c.jsx(P,{label:"Heading",value:e.heading,onChange:l=>t({heading:l})}),c.jsxs("div",{className:"list-editor",children:[c.jsxs("div",{className:"list-editor-head",children:[c.jsx("span",{className:"field-label",children:"Columns"}),c.jsx("button",{className:"btn btn-sm",onClick:i,children:"+ Column"})]}),Array.from({length:a}).map((l,d)=>c.jsxs("div",{className:"row-inline",children:[c.jsx("input",{className:"text-input",value:n[d]??"",placeholder:`Column ${d+1}`,onChange:f=>o(d,f.target.value)}),c.jsx("button",{className:"btn btn-icon btn-danger",title:"Remove column",onClick:()=>s(d),children:"✕"})]},d))]}),c.jsx(Wr,{label:"Rows",items:r,onChange:l=>t({rows:l}),blank:()=>Array.from({length:a},()=>""),renderItem:(l,d)=>c.jsx("div",{className:"row-cells",children:Array.from({length:a}).map((f,h)=>c.jsx("input",{className:"text-input",value:l[h]??"",placeholder:n[h]??`Col ${h+1}`,onChange:m=>{const b=l.slice();for(;b.length<a;)b.push("");b[h]=m.target.value,d(b)}},h))})})]})}function W8({html:e}){return c.jsx("div",{className:"preview",children:c.jsx("iframe",{className:"preview-frame",title:"Deck preview",srcDoc:e,sandbox:"allow-same-origin",referrerPolicy:"no-referrer"})})}const U8=`
html { scroll-behavior: smooth; scroll-snap-type: y mandatory; }
body { gap: 0 !important; padding: 0 !important; }
.slide { min-height: 100vh !important; margin: 0 !important; border-radius: 0 !important; scroll-snap-align: start !important; scroll-snap-stop: always !important; }
.pmd-attribution { display: none !important; }
`;function H8({html:e,slideCount:t,notes:n=[],onClose:r}){const a=I.useRef(null),[o,i]=I.useState(0),[s,l]=I.useState(!0),d=e.replace("</head>",`<style>${U8}</style></head>`),f=(n[o]??"").trim(),h=n.some(b=>(b??"").trim().length>0),m=b=>i(y=>Math.max(0,Math.min(t-1,y+b)));return I.useEffect(()=>{const b=y=>{y.key==="Escape"?r():y.key==="s"||y.key==="S"?(y.preventDefault(),l(v=>!v)):y.key==="ArrowRight"||y.key===" "||y.key==="PageDown"?(y.preventDefault(),i(v=>Math.min(t-1,v+1))):(y.key==="ArrowLeft"||y.key==="PageUp")&&(y.preventDefault(),i(v=>Math.max(0,v-1)))};return window.addEventListener("keydown",b),()=>window.removeEventListener("keydown",b)},[r,t]),I.useEffect(()=>{var v,_;const b=(v=a.current)==null?void 0:v.contentDocument,y=b==null?void 0:b.querySelectorAll("section.slide");(_=y==null?void 0:y[o])==null||_.scrollIntoView({behavior:"smooth",block:"start"})},[o,d]),c.jsxs("div",{className:"present-overlay",children:[c.jsxs("div",{className:"present-main",children:[c.jsx("div",{className:"present-stage",children:c.jsx("iframe",{ref:a,className:"present-frame",title:"Present deck",srcDoc:d,sandbox:"allow-same-origin"})}),s&&c.jsxs("aside",{className:"present-notes","aria-label":"Speaker notes",children:[c.jsx("div",{className:"present-notes-label",children:"Speaker notes · S to hide"}),f?c.jsx("p",{className:"present-notes-body",children:f}):c.jsx("p",{className:"present-notes-empty",children:h?"No notes on this slide.":"No speaker notes yet — add them in the slide form (exports to PPTX)."})]})]}),c.jsxs("div",{className:"present-bar",children:[c.jsx("button",{className:"btn btn-icon",title:"Previous (←)",onClick:()=>m(-1),children:"←"}),c.jsxs("span",{className:"present-count",children:[o+1," / ",t]}),c.jsx("button",{className:"btn btn-icon",title:"Next (→)",onClick:()=>m(1),children:"→"}),c.jsx("button",{className:"btn",title:"Toggle speaker notes (S)",onClick:()=>l(b=>!b),children:s?"Hide notes · S":"Notes · S"}),c.jsx("button",{className:"btn",onClick:r,children:"Exit · Esc"})]})]})}const yl=[{id:"claude-opus-4-8",label:"Opus 4.8 — most capable"},{id:"claude-sonnet-4-6",label:"Sonnet 4.6 — faster, cheaper"},{id:"claude-haiku-4-5",label:"Haiku 4.5 — fastest"}],f1=`You author slide decks as a single JSON object matching this schema — the "Deck JSON" spec used by presentation-md.

Top level:
{ "type": "deck",
  "meta": { "title": string, "company"?: string, "description"?: string, "theme": string },
  "slides": Slide[] }

Every Slide has a "layout" and layout-specific fields. Optional on every slide: "notes"?: string (speaker notes — shown in Studio present mode and exported to PPTX notes pane; not rendered on the HTML slide face).

The twelve layouts:

- title        { layout, eyebrow?, heading, lead? }
- section      { layout, number, eyebrow?, heading, lead? }        // number like "01"
- two-column   { layout, heading, body?, image?, imageAlt?, aside?, ratio?: "1-1"|"2-1"|"1-2"|"3-2"|"2-3", reverse? }
- image-hero   { layout, eyebrow?, heading, lead?, image, imageAlt? }  // full-bleed photo with caption overlay
- comparison   { layout, eyebrow?, heading?, leftLabel?, left, rightLabel?, right, emphasis?: "left"|"right" }
- feature-grid { layout, heading, columns, cards }                 // columns: 2|3|4|"bento"; cards: [{ icon?, title, body }]
- data-table   { layout, eyebrow?, heading, columns, rows }        // columns: string[]; rows: string[][] (each row = one string per column)
- stat-row     { layout, heading, stats }                          // stats: [{ value, label }] — value like "98%", "$1.2M"
- timeline     { layout, heading, steps }                          // steps: [{ title, body }]
- quote        { layout, quote, by? }
- code         { layout, eyebrow?, heading?, lead?, code, language?, filename? }  // plain-text snippet in a window chrome
- closing      { layout, eyebrow?, heading, lead?, cta?: { label, href } }

Authoring rules:
- Open with a "title" slide and end with a "closing" slide.
- 6–10 slides total. Use a mix of layouts that fits the content — section dividers for chapters, stat-row for metrics, data-table for tabular data, timeline for roadmaps, quote for a punchy line.
- Keep text tight and presentation-grade: headings are short, leads are one line, card/stat bodies are a phrase, not a paragraph.
- Prefer concrete, specific content over filler. No lorem ipsum.
- Craft (required when the layout supports it):
  - comparison: always set "emphasis" to "left" or "right" — never leave the default balanced look.
  - two-column: prefer a non-1-1 "ratio" ("2-1", "1-2", "3-2", or "2-3") unless the content is truly equal weight; use "reverse" when the image/aside should lead.
  - feature-grid with 5 cards: set columns to "bento" so one hero card dominates.
  - Include at least one "image-hero" when the brief implies a visual product, place, or atmosphere.
  - Add brief "notes" on 2–4 key slides (talking points for the presenter).
- Only emit fields defined above. Do not invent new layouts or fields.`;function g1(e,t){return`Create a deck for the following brief. Set meta.theme to "${t}".

Brief:
${e.trim()}`}function q8(e,t){return`${f1}

${g1(e,t)}

Respond with ONLY the JSON object — no prose, no markdown fences.`}function V8(e){const t=e.match(/```(?:json)?\s*([\s\S]*?)```/i),n=((t==null?void 0:t[1])??e).trim(),r=n.indexOf("{"),a=n.lastIndexOf("}");return r===-1||a===-1||a<r?n:n.slice(r,a+1)}async function Q8(e){const{apiKey:t,model:n,brief:r,theme:a,signal:o}=e;if(!r.trim())throw new Error("Describe your deck first.");if(!t.trim())throw new Error("Enter your Anthropic API key.");const{default:i}=await es(async()=>{const{default:h}=await import("./index-BMZ5ciqn.js");return{default:h}},__vite__mapDeps([4,2])),d=(await new i({apiKey:t.trim(),dangerouslyAllowBrowser:!0}).messages.create({model:n,max_tokens:8e3,system:f1,messages:[{role:"user",content:`${g1(r,a)}

Respond with ONLY the JSON object — no prose, no markdown fences.`}]},{signal:o})).content.map(h=>h.type==="text"?h.text:"").join("");if(!d.trim())throw new Error("The model returned an empty response. Try again.");let f;try{f=rs(V8(d))}catch(h){throw new Error(`Couldn't parse the generated deck: ${h.message}`)}return f.meta={...f.meta,theme:a},f}const $r="pmd-studio-anthropic-key",Y8=["Q3 all-hands: momentum, key metrics, roadmap, and what's next.","Seed pitch for an AI-native analytics tool — problem, product, traction, ask.","Launch deck for a developer CLI: what it is, how it works, why it's fast."];function K8({currentTheme:e,onGenerate:t,onClose:n}){const[r,a]=I.useState(""),[o,i]=I.useState(e),[s,l]=I.useState(yl[0].id),[d,f]=I.useState(()=>localStorage.getItem($r)??""),[h,m]=I.useState(()=>!!localStorage.getItem($r)),[b,y]=I.useState(!1),[v,_]=I.useState(""),[p,u]=I.useState(!1),g=s1(),x=async()=>{y(!0),_("Generating your deck…");try{h?localStorage.setItem($r,d.trim()):localStorage.removeItem($r);const w=await Q8({apiKey:d,model:s,brief:r,theme:o});t(w),n()}catch(w){_(w.message)}finally{y(!1)}},D=async()=>{try{await navigator.clipboard.writeText(q8(r,o)),u(!0),setTimeout(()=>u(!1),1800)}catch{_("Couldn't copy — select the prompt manually.")}};return c.jsx("div",{className:"modal-overlay",onClick:n,children:c.jsxs("div",{className:"modal",onClick:w=>w.stopPropagation(),children:[c.jsxs("header",{className:"modal-head",children:[c.jsxs("div",{children:[c.jsx("strong",{children:"Generate a deck"}),c.jsx("span",{className:"muted small",children:"Describe it — get an editable deck in seconds."})]}),c.jsx("button",{className:"btn btn-sm",onClick:n,"aria-label":"Close",children:"✕"})]}),c.jsxs("div",{className:"modal-body",children:[c.jsx("label",{className:"field-label",children:"What's the deck about?"}),c.jsx("textarea",{className:"text-input brief-input",value:r,placeholder:"e.g. Q3 all-hands covering revenue, product wins, and the roadmap for next quarter.",rows:4,onChange:w=>a(w.target.value)}),c.jsx("div",{className:"chip-row",children:Y8.map(w=>c.jsx("button",{className:"chip",onClick:()=>a(w),title:"Use this brief",children:w.split(/[:—]/)[0].trim()},w))}),c.jsxs("div",{className:"field-grid",children:[c.jsxs("label",{className:"inline-field",children:[c.jsx("span",{className:"muted small",children:"Theme"}),c.jsx("select",{className:"text-input",value:o,onChange:w=>i(w.target.value),children:g.map(w=>c.jsx("option",{value:w,children:w},w))})]}),c.jsxs("label",{className:"inline-field",children:[c.jsx("span",{className:"muted small",children:"Model"}),c.jsx("select",{className:"text-input",value:s,onChange:w=>l(w.target.value),children:yl.map(w=>c.jsx("option",{value:w.id,children:w.label},w.id))})]})]}),c.jsxs("div",{className:"gen-panel",children:[c.jsx("label",{className:"field-label",children:"Your Anthropic API key"}),c.jsx("input",{className:"text-input",type:"password",value:d,placeholder:"sk-ant-…",autoComplete:"off",onChange:w=>f(w.target.value)}),c.jsxs("label",{className:"checkbox-field",children:[c.jsx("input",{type:"checkbox",checked:h,onChange:w=>m(w.target.checked)}),c.jsx("span",{className:"muted small",children:"Remember on this device (stored only in your browser)"})]}),c.jsxs("p",{className:"muted small privacy-note",children:["Your key stays in this browser. Requests go straight to Anthropic — nothing is sent to our servers. Get a key at ",c.jsx("a",{href:"https://console.anthropic.com/settings/keys",target:"_blank",rel:"noreferrer",children:"console.anthropic.com"}),"."]}),c.jsx("button",{className:"btn btn-primary btn-block",disabled:b,onClick:x,children:b?"Generating…":"Generate deck"})]}),c.jsx("div",{className:"gen-divider",children:c.jsx("span",{children:"or hand it to your agent"})}),c.jsxs("div",{className:"gen-panel",children:[c.jsx("p",{className:"muted small",children:"No key? Copy a ready-made prompt and paste it into Claude Code, Cursor, or any agent with the presentation skill installed — then open the resulting deck here."}),c.jsx("button",{className:"btn btn-block",onClick:D,disabled:!r.trim(),children:p?"Copied ✓":"Copy prompt for your agent"})]}),v&&c.jsx("p",{className:"status muted small gen-status",children:v})]})]})})}const h1="pmd-studio-deck-v1",ni="pmd-studio-example-slug";function J8(){var e;try{const t=new URLSearchParams(window.location.search);return{example:pn(t.get("example")),theme:((e=t.get("theme"))==null?void 0:e.trim())||null,fresh:t.get("fresh")==="1"||t.get("fresh")==="true"}}catch{return{example:null,theme:null,fresh:!1}}}function X8(){try{const e=localStorage.getItem(h1);if(e){const t=JSON.parse(e);if((t==null?void 0:t.type)==="deck"&&Array.isArray(t.slides)&&t.slides.length)return t}}catch{}return null}function so(e,t){return t?{...e,meta:{...e.meta,theme:t}}:e}function Z8(){const{example:e,theme:t,fresh:n}=J8();if(e){const r=jc(e);if(r)return{deck:so(r,t),exampleSlug:e}}if(!n){const r=X8();if(r){const a=(()=>{try{return localStorage.getItem(ni)}catch{return null}})();return{deck:so(r,t),exampleSlug:pn(a)}}}return{deck:so(Ji,t),exampleSlug:"acme"}}function e4(){try{const e=new URLSearchParams(window.location.search);if(!e.has("example")&&!e.has("fresh")&&!e.has("theme"))return;e.delete("fresh");const t=e.toString(),n=`${window.location.pathname}${t?`?${t}`:""}${window.location.hash}`;window.history.replaceState({},"",n)}catch{}}function t4(){var _;const e=I.useMemo(()=>Z8(),[]),[t,n]=I.useState(e.deck),[r,a]=I.useState(e.exampleSlug),[o,i]=I.useState(0),[s,l]=I.useState(!1),[d,f]=I.useState(!1);I.useEffect(()=>{e4()},[]),I.useEffect(()=>{try{localStorage.setItem(h1,JSON.stringify(t)),r?localStorage.setItem(ni,r):localStorage.removeItem(ni)}catch{}},[t,r]);const h=I.useMemo(()=>{var p;try{return u1(t,fn(((p=t.meta)==null?void 0:p.theme)??"default-tech"))}catch(u){return`<pre style="color:#d9695a;font-family:monospace;padding:24px">${String(u)}</pre>`}},[t]),m=(p,u)=>{n({...t,slides:p}),u!==void 0&&i(u)},b=p=>{n({...t,slides:t.slides.map((u,g)=>g===o?p:u)})},y=(p="acme")=>{const u=jc(p)??Ji;n(u),a(pn(p)??"acme"),i(0);try{const g=new URL(window.location.href);g.searchParams.set("example",pn(p)??"acme"),g.searchParams.delete("fresh"),window.history.replaceState({},"",`${g.pathname}?${g.searchParams.toString()}`)}catch{}},v=t.slides[Math.min(o,t.slides.length-1)];return c.jsxs("div",{className:"app",children:[c.jsx(O8,{deck:t,exampleSlug:r,onChange:p=>{n(p),a(null)},onLoadExample:y,onPresent:()=>l(!0),onGenerate:()=>f(!0)}),c.jsxs("div",{className:"studio-strip",role:"note",children:[c.jsx("span",{children:"Live preview · Deep-link examples · Open HTML / JSON / PPTX · Present with notes · Export editable PPTX"}),c.jsx("a",{href:"https://presentation-md.vercel.app/",target:"_blank",rel:"noopener noreferrer",children:"Docs & gallery"})]}),c.jsxs("div",{className:"workspace",children:[c.jsx("aside",{className:"panel panel-left",children:c.jsx(L8,{slides:t.slides,selected:o,onSelect:i,onChange:m})}),c.jsx("main",{className:"panel panel-center",children:c.jsx(W8,{html:h})}),c.jsx("aside",{className:"panel panel-right",children:v?c.jsx(G8,{slide:v,onChange:b}):c.jsx("p",{className:"muted",children:"No slide selected."})})]}),s&&c.jsx(H8,{html:h,slideCount:t.slides.length,notes:t.slides.map(p=>p.notes),onClose:()=>l(!1)}),d&&c.jsx(K8,{currentTheme:((_=t.meta)==null?void 0:_.theme)??"claude",onGenerate:p=>{n(p),a(null),i(0)},onClose:()=>f(!1)})]})}const m1=document.getElementById("root");if(!m1)throw new Error("Missing #root element");Tc(m1).render(c.jsx(I.StrictMode,{children:c.jsx(t4,{})}));export{es as _};
