const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-6azyG_DF.js","assets/_commonjsHelpers-Cpj98o6Y.js","assets/index-C72SIOk6.js"])))=>i.map(i=>d[i]);
(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function t(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(a){if(a.ep)return;a.ep=!0;const o=t(a);fetch(a.href,o)}})();var fl={exports:{}},fa={},gl={exports:{}},z={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var tr=Symbol.for("react.element"),f2=Symbol.for("react.portal"),g2=Symbol.for("react.fragment"),h2=Symbol.for("react.strict_mode"),m2=Symbol.for("react.profiler"),b2=Symbol.for("react.provider"),v2=Symbol.for("react.context"),y2=Symbol.for("react.forward_ref"),x2=Symbol.for("react.suspense"),k2=Symbol.for("react.memo"),w2=Symbol.for("react.lazy"),Zi=Symbol.iterator;function _2(e){return e===null||typeof e!="object"?null:(e=Zi&&e[Zi]||e["@@iterator"],typeof e=="function"?e:null)}var hl={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},ml=Object.assign,bl={};function ut(e,n,t){this.props=e,this.context=n,this.refs=bl,this.updater=t||hl}ut.prototype.isReactComponent={};ut.prototype.setState=function(e,n){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,n,"setState")};ut.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function vl(){}vl.prototype=ut.prototype;function Zo(e,n,t){this.props=e,this.context=n,this.refs=bl,this.updater=t||hl}var ei=Zo.prototype=new vl;ei.constructor=Zo;ml(ei,ut.prototype);ei.isPureReactComponent=!0;var es=Array.isArray,yl=Object.prototype.hasOwnProperty,ni={current:null},xl={key:!0,ref:!0,__self:!0,__source:!0};function kl(e,n,t){var r,a={},o=null,i=null;if(n!=null)for(r in n.ref!==void 0&&(i=n.ref),n.key!==void 0&&(o=""+n.key),n)yl.call(n,r)&&!xl.hasOwnProperty(r)&&(a[r]=n[r]);var s=arguments.length-2;if(s===1)a.children=t;else if(1<s){for(var l=Array(s),c=0;c<s;c++)l[c]=arguments[c+2];a.children=l}if(e&&e.defaultProps)for(r in s=e.defaultProps,s)a[r]===void 0&&(a[r]=s[r]);return{$$typeof:tr,type:e,key:o,ref:i,props:a,_owner:ni.current}}function S2(e,n){return{$$typeof:tr,type:e.type,key:n,ref:e.ref,props:e.props,_owner:e._owner}}function ti(e){return typeof e=="object"&&e!==null&&e.$$typeof===tr}function $2(e){var n={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(t){return n[t]})}var ns=/\/+/g;function Ma(e,n){return typeof e=="object"&&e!==null&&e.key!=null?$2(""+e.key):n.toString(36)}function jr(e,n,t,r,a){var o=typeof e;(o==="undefined"||o==="boolean")&&(e=null);var i=!1;if(e===null)i=!0;else switch(o){case"string":case"number":i=!0;break;case"object":switch(e.$$typeof){case tr:case f2:i=!0}}if(i)return i=e,a=a(i),e=r===""?"."+Ma(i,0):r,es(a)?(t="",e!=null&&(t=e.replace(ns,"$&/")+"/"),jr(a,n,t,"",function(c){return c})):a!=null&&(ti(a)&&(a=S2(a,t+(!a.key||i&&i.key===a.key?"":(""+a.key).replace(ns,"$&/")+"/")+e)),n.push(a)),1;if(i=0,r=r===""?".":r+":",es(e))for(var s=0;s<e.length;s++){o=e[s];var l=r+Ma(o,s);i+=jr(o,n,t,l,a)}else if(l=_2(e),typeof l=="function")for(e=l.call(e),s=0;!(o=e.next()).done;)o=o.value,l=r+Ma(o,s++),i+=jr(o,n,t,l,a);else if(o==="object")throw n=String(e),Error("Objects are not valid as a React child (found: "+(n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n)+"). If you meant to render a collection of children, use an array instead.");return i}function dr(e,n,t){if(e==null)return e;var r=[],a=0;return jr(e,r,"","",function(o){return n.call(t,o,a++)}),r}function F2(e){if(e._status===-1){var n=e._result;n=n(),n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var de={current:null},Tr={transition:null},E2={ReactCurrentDispatcher:de,ReactCurrentBatchConfig:Tr,ReactCurrentOwner:ni};function wl(){throw Error("act(...) is not supported in production builds of React.")}z.Children={map:dr,forEach:function(e,n,t){dr(e,function(){n.apply(this,arguments)},t)},count:function(e){var n=0;return dr(e,function(){n++}),n},toArray:function(e){return dr(e,function(n){return n})||[]},only:function(e){if(!ti(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};z.Component=ut;z.Fragment=g2;z.Profiler=m2;z.PureComponent=Zo;z.StrictMode=h2;z.Suspense=x2;z.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=E2;z.act=wl;z.cloneElement=function(e,n,t){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=ml({},e.props),a=e.key,o=e.ref,i=e._owner;if(n!=null){if(n.ref!==void 0&&(o=n.ref,i=ni.current),n.key!==void 0&&(a=""+n.key),e.type&&e.type.defaultProps)var s=e.type.defaultProps;for(l in n)yl.call(n,l)&&!xl.hasOwnProperty(l)&&(r[l]=n[l]===void 0&&s!==void 0?s[l]:n[l])}var l=arguments.length-2;if(l===1)r.children=t;else if(1<l){s=Array(l);for(var c=0;c<l;c++)s[c]=arguments[c+2];r.children=s}return{$$typeof:tr,type:e.type,key:a,ref:o,props:r,_owner:i}};z.createContext=function(e){return e={$$typeof:v2,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:b2,_context:e},e.Consumer=e};z.createElement=kl;z.createFactory=function(e){var n=kl.bind(null,e);return n.type=e,n};z.createRef=function(){return{current:null}};z.forwardRef=function(e){return{$$typeof:y2,render:e}};z.isValidElement=ti;z.lazy=function(e){return{$$typeof:w2,_payload:{_status:-1,_result:e},_init:F2}};z.memo=function(e,n){return{$$typeof:k2,type:e,compare:n===void 0?null:n}};z.startTransition=function(e){var n=Tr.transition;Tr.transition={};try{e()}finally{Tr.transition=n}};z.unstable_act=wl;z.useCallback=function(e,n){return de.current.useCallback(e,n)};z.useContext=function(e){return de.current.useContext(e)};z.useDebugValue=function(){};z.useDeferredValue=function(e){return de.current.useDeferredValue(e)};z.useEffect=function(e,n){return de.current.useEffect(e,n)};z.useId=function(){return de.current.useId()};z.useImperativeHandle=function(e,n,t){return de.current.useImperativeHandle(e,n,t)};z.useInsertionEffect=function(e,n){return de.current.useInsertionEffect(e,n)};z.useLayoutEffect=function(e,n){return de.current.useLayoutEffect(e,n)};z.useMemo=function(e,n){return de.current.useMemo(e,n)};z.useReducer=function(e,n,t){return de.current.useReducer(e,n,t)};z.useRef=function(e){return de.current.useRef(e)};z.useState=function(e){return de.current.useState(e)};z.useSyncExternalStore=function(e,n,t){return de.current.useSyncExternalStore(e,n,t)};z.useTransition=function(){return de.current.useTransition()};z.version="18.3.1";gl.exports=z;var A=gl.exports;/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var C2=A,j2=Symbol.for("react.element"),T2=Symbol.for("react.fragment"),P2=Object.prototype.hasOwnProperty,M2=C2.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,N2={key:!0,ref:!0,__self:!0,__source:!0};function _l(e,n,t){var r,a={},o=null,i=null;t!==void 0&&(o=""+t),n.key!==void 0&&(o=""+n.key),n.ref!==void 0&&(i=n.ref);for(r in n)P2.call(n,r)&&!N2.hasOwnProperty(r)&&(a[r]=n[r]);if(e&&e.defaultProps)for(r in n=e.defaultProps,n)a[r]===void 0&&(a[r]=n[r]);return{$$typeof:j2,type:e,key:o,ref:i,props:a,_owner:M2.current}}fa.Fragment=T2;fa.jsx=_l;fa.jsxs=_l;fl.exports=fa;var d=fl.exports,Sl={exports:{}},_e={},$l={exports:{}},Fl={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function n(E,P){var M=E.length;E.push(P);e:for(;0<M;){var V=M-1>>>1,J=E[V];if(0<a(J,P))E[V]=P,E[M]=J,M=V;else break e}}function t(E){return E.length===0?null:E[0]}function r(E){if(E.length===0)return null;var P=E[0],M=E.pop();if(M!==P){E[0]=M;e:for(var V=0,J=E.length,lr=J>>>1;V<lr;){var kn=2*(V+1)-1,Pa=E[kn],wn=kn+1,cr=E[wn];if(0>a(Pa,M))wn<J&&0>a(cr,Pa)?(E[V]=cr,E[wn]=M,V=wn):(E[V]=Pa,E[kn]=M,V=kn);else if(wn<J&&0>a(cr,M))E[V]=cr,E[wn]=M,V=wn;else break e}}return P}function a(E,P){var M=E.sortIndex-P.sortIndex;return M!==0?M:E.id-P.id}if(typeof performance=="object"&&typeof performance.now=="function"){var o=performance;e.unstable_now=function(){return o.now()}}else{var i=Date,s=i.now();e.unstable_now=function(){return i.now()-s}}var l=[],c=[],p=1,g=null,m=3,b=!1,w=!1,y=!1,T=typeof setTimeout=="function"?setTimeout:null,f=typeof clearTimeout=="function"?clearTimeout:null,u=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function h(E){for(var P=t(c);P!==null;){if(P.callback===null)r(c);else if(P.startTime<=E)r(c),P.sortIndex=P.expirationTime,n(l,P);else break;P=t(c)}}function v(E){if(y=!1,h(E),!w)if(t(l)!==null)w=!0,ja(_);else{var P=t(c);P!==null&&Ta(v,P.startTime-E)}}function _(E,P){w=!1,y&&(y=!1,f(S),S=-1),b=!0;var M=m;try{for(h(P),g=t(l);g!==null&&(!(g.expirationTime>P)||E&&!ee());){var V=g.callback;if(typeof V=="function"){g.callback=null,m=g.priorityLevel;var J=V(g.expirationTime<=P);P=e.unstable_now(),typeof J=="function"?g.callback=J:g===t(l)&&r(l),h(P)}else r(l);g=t(l)}if(g!==null)var lr=!0;else{var kn=t(c);kn!==null&&Ta(v,kn.startTime-P),lr=!1}return lr}finally{g=null,m=M,b=!1}}var k=!1,C=null,S=-1,$=5,j=-1;function ee(){return!(e.unstable_now()-j<$)}function ht(){if(C!==null){var E=e.unstable_now();j=E;var P=!0;try{P=C(!0,E)}finally{P?mt():(k=!1,C=null)}}else k=!1}var mt;if(typeof u=="function")mt=function(){u(ht)};else if(typeof MessageChannel<"u"){var Xi=new MessageChannel,p2=Xi.port2;Xi.port1.onmessage=ht,mt=function(){p2.postMessage(null)}}else mt=function(){T(ht,0)};function ja(E){C=E,k||(k=!0,mt())}function Ta(E,P){S=T(function(){E(e.unstable_now())},P)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(E){E.callback=null},e.unstable_continueExecution=function(){w||b||(w=!0,ja(_))},e.unstable_forceFrameRate=function(E){0>E||125<E?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):$=0<E?Math.floor(1e3/E):5},e.unstable_getCurrentPriorityLevel=function(){return m},e.unstable_getFirstCallbackNode=function(){return t(l)},e.unstable_next=function(E){switch(m){case 1:case 2:case 3:var P=3;break;default:P=m}var M=m;m=P;try{return E()}finally{m=M}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(E,P){switch(E){case 1:case 2:case 3:case 4:case 5:break;default:E=3}var M=m;m=E;try{return P()}finally{m=M}},e.unstable_scheduleCallback=function(E,P,M){var V=e.unstable_now();switch(typeof M=="object"&&M!==null?(M=M.delay,M=typeof M=="number"&&0<M?V+M:V):M=V,E){case 1:var J=-1;break;case 2:J=250;break;case 5:J=1073741823;break;case 4:J=1e4;break;default:J=5e3}return J=M+J,E={id:p++,callback:P,priorityLevel:E,startTime:M,expirationTime:J,sortIndex:-1},M>V?(E.sortIndex=M,n(c,E),t(l)===null&&E===t(c)&&(y?(f(S),S=-1):y=!0,Ta(v,M-V))):(E.sortIndex=J,n(l,E),w||b||(w=!0,ja(_))),E},e.unstable_shouldYield=ee,e.unstable_wrapCallback=function(E){var P=m;return function(){var M=m;m=P;try{return E.apply(this,arguments)}finally{m=M}}}})(Fl);$l.exports=Fl;var z2=$l.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var I2=A,we=z2;function x(e){for(var n="https://reactjs.org/docs/error-decoder.html?invariant="+e,t=1;t<arguments.length;t++)n+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var El=new Set,Ot={};function In(e,n){tt(e,n),tt(e+"Capture",n)}function tt(e,n){for(Ot[e]=n,e=0;e<n.length;e++)El.add(n[e])}var Ye=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),oo=Object.prototype.hasOwnProperty,D2=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,ts={},rs={};function A2(e){return oo.call(rs,e)?!0:oo.call(ts,e)?!1:D2.test(e)?rs[e]=!0:(ts[e]=!0,!1)}function O2(e,n,t,r){if(t!==null&&t.type===0)return!1;switch(typeof n){case"function":case"symbol":return!0;case"boolean":return r?!1:t!==null?!t.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function B2(e,n,t,r){if(n===null||typeof n>"u"||O2(e,n,t,r))return!0;if(r)return!1;if(t!==null)switch(t.type){case 3:return!n;case 4:return n===!1;case 5:return isNaN(n);case 6:return isNaN(n)||1>n}return!1}function ue(e,n,t,r,a,o,i){this.acceptsBooleans=n===2||n===3||n===4,this.attributeName=r,this.attributeNamespace=a,this.mustUseProperty=t,this.propertyName=e,this.type=n,this.sanitizeURL=o,this.removeEmptyString=i}var re={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){re[e]=new ue(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var n=e[0];re[n]=new ue(n,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){re[e]=new ue(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){re[e]=new ue(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){re[e]=new ue(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){re[e]=new ue(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){re[e]=new ue(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){re[e]=new ue(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){re[e]=new ue(e,5,!1,e.toLowerCase(),null,!1,!1)});var ri=/[\-:]([a-z])/g;function ai(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var n=e.replace(ri,ai);re[n]=new ue(n,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var n=e.replace(ri,ai);re[n]=new ue(n,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var n=e.replace(ri,ai);re[n]=new ue(n,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){re[e]=new ue(e,1,!1,e.toLowerCase(),null,!1,!1)});re.xlinkHref=new ue("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){re[e]=new ue(e,1,!1,e.toLowerCase(),null,!0,!0)});function oi(e,n,t,r){var a=re.hasOwnProperty(n)?re[n]:null;(a!==null?a.type!==0:r||!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(B2(n,t,a,r)&&(t=null),r||a===null?A2(n)&&(t===null?e.removeAttribute(n):e.setAttribute(n,""+t)):a.mustUseProperty?e[a.propertyName]=t===null?a.type===3?!1:"":t:(n=a.attributeName,r=a.attributeNamespace,t===null?e.removeAttribute(n):(a=a.type,t=a===3||a===4&&t===!0?"":""+t,r?e.setAttributeNS(r,n,t):e.setAttribute(n,t))))}var Ze=I2.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ur=Symbol.for("react.element"),On=Symbol.for("react.portal"),Bn=Symbol.for("react.fragment"),ii=Symbol.for("react.strict_mode"),io=Symbol.for("react.profiler"),Cl=Symbol.for("react.provider"),jl=Symbol.for("react.context"),si=Symbol.for("react.forward_ref"),so=Symbol.for("react.suspense"),lo=Symbol.for("react.suspense_list"),li=Symbol.for("react.memo"),nn=Symbol.for("react.lazy"),Tl=Symbol.for("react.offscreen"),as=Symbol.iterator;function bt(e){return e===null||typeof e!="object"?null:(e=as&&e[as]||e["@@iterator"],typeof e=="function"?e:null)}var G=Object.assign,Na;function $t(e){if(Na===void 0)try{throw Error()}catch(t){var n=t.stack.trim().match(/\n( *(at )?)/);Na=n&&n[1]||""}return`
`+Na+e}var za=!1;function Ia(e,n){if(!e||za)return"";za=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(n)if(n=function(){throw Error()},Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(n,[])}catch(c){var r=c}Reflect.construct(e,[],n)}else{try{n.call()}catch(c){r=c}e.call(n.prototype)}else{try{throw Error()}catch(c){r=c}e()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var a=c.stack.split(`
`),o=r.stack.split(`
`),i=a.length-1,s=o.length-1;1<=i&&0<=s&&a[i]!==o[s];)s--;for(;1<=i&&0<=s;i--,s--)if(a[i]!==o[s]){if(i!==1||s!==1)do if(i--,s--,0>s||a[i]!==o[s]){var l=`
`+a[i].replace(" at new "," at ");return e.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",e.displayName)),l}while(1<=i&&0<=s);break}}}finally{za=!1,Error.prepareStackTrace=t}return(e=e?e.displayName||e.name:"")?$t(e):""}function L2(e){switch(e.tag){case 5:return $t(e.type);case 16:return $t("Lazy");case 13:return $t("Suspense");case 19:return $t("SuspenseList");case 0:case 2:case 15:return e=Ia(e.type,!1),e;case 11:return e=Ia(e.type.render,!1),e;case 1:return e=Ia(e.type,!0),e;default:return""}}function co(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Bn:return"Fragment";case On:return"Portal";case io:return"Profiler";case ii:return"StrictMode";case so:return"Suspense";case lo:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case jl:return(e.displayName||"Context")+".Consumer";case Cl:return(e._context.displayName||"Context")+".Provider";case si:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case li:return n=e.displayName||null,n!==null?n:co(e.type)||"Memo";case nn:n=e._payload,e=e._init;try{return co(e(n))}catch{}}return null}function R2(e){var n=e.type;switch(e.tag){case 24:return"Cache";case 9:return(n.displayName||"Context")+".Consumer";case 10:return(n._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=n.render,e=e.displayName||e.name||"",n.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return n;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return co(n);case 8:return n===ii?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n}return null}function mn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Pl(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function W2(e){var n=Pl(e)?"checked":"value",t=Object.getOwnPropertyDescriptor(e.constructor.prototype,n),r=""+e[n];if(!e.hasOwnProperty(n)&&typeof t<"u"&&typeof t.get=="function"&&typeof t.set=="function"){var a=t.get,o=t.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return a.call(this)},set:function(i){r=""+i,o.call(this,i)}}),Object.defineProperty(e,n,{enumerable:t.enumerable}),{getValue:function(){return r},setValue:function(i){r=""+i},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function pr(e){e._valueTracker||(e._valueTracker=W2(e))}function Ml(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var t=n.getValue(),r="";return e&&(r=Pl(e)?e.checked?"true":"false":e.value),e=r,e!==t?(n.setValue(e),!0):!1}function Wr(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function uo(e,n){var t=n.checked;return G({},n,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:t??e._wrapperState.initialChecked})}function os(e,n){var t=n.defaultValue==null?"":n.defaultValue,r=n.checked!=null?n.checked:n.defaultChecked;t=mn(n.value!=null?n.value:t),e._wrapperState={initialChecked:r,initialValue:t,controlled:n.type==="checkbox"||n.type==="radio"?n.checked!=null:n.value!=null}}function Nl(e,n){n=n.checked,n!=null&&oi(e,"checked",n,!1)}function po(e,n){Nl(e,n);var t=mn(n.value),r=n.type;if(t!=null)r==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+t):e.value!==""+t&&(e.value=""+t);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}n.hasOwnProperty("value")?fo(e,n.type,t):n.hasOwnProperty("defaultValue")&&fo(e,n.type,mn(n.defaultValue)),n.checked==null&&n.defaultChecked!=null&&(e.defaultChecked=!!n.defaultChecked)}function is(e,n,t){if(n.hasOwnProperty("value")||n.hasOwnProperty("defaultValue")){var r=n.type;if(!(r!=="submit"&&r!=="reset"||n.value!==void 0&&n.value!==null))return;n=""+e._wrapperState.initialValue,t||n===e.value||(e.value=n),e.defaultValue=n}t=e.name,t!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,t!==""&&(e.name=t)}function fo(e,n,t){(n!=="number"||Wr(e.ownerDocument)!==e)&&(t==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+t&&(e.defaultValue=""+t))}var Ft=Array.isArray;function Kn(e,n,t,r){if(e=e.options,n){n={};for(var a=0;a<t.length;a++)n["$"+t[a]]=!0;for(t=0;t<e.length;t++)a=n.hasOwnProperty("$"+e[t].value),e[t].selected!==a&&(e[t].selected=a),a&&r&&(e[t].defaultSelected=!0)}else{for(t=""+mn(t),n=null,a=0;a<e.length;a++){if(e[a].value===t){e[a].selected=!0,r&&(e[a].defaultSelected=!0);return}n!==null||e[a].disabled||(n=e[a])}n!==null&&(n.selected=!0)}}function go(e,n){if(n.dangerouslySetInnerHTML!=null)throw Error(x(91));return G({},n,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function ss(e,n){var t=n.value;if(t==null){if(t=n.children,n=n.defaultValue,t!=null){if(n!=null)throw Error(x(92));if(Ft(t)){if(1<t.length)throw Error(x(93));t=t[0]}n=t}n==null&&(n=""),t=n}e._wrapperState={initialValue:mn(t)}}function zl(e,n){var t=mn(n.value),r=mn(n.defaultValue);t!=null&&(t=""+t,t!==e.value&&(e.value=t),n.defaultValue==null&&e.defaultValue!==t&&(e.defaultValue=t)),r!=null&&(e.defaultValue=""+r)}function ls(e){var n=e.textContent;n===e._wrapperState.initialValue&&n!==""&&n!==null&&(e.value=n)}function Il(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function ho(e,n){return e==null||e==="http://www.w3.org/1999/xhtml"?Il(n):e==="http://www.w3.org/2000/svg"&&n==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var fr,Dl=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(n,t,r,a){MSApp.execUnsafeLocalFunction(function(){return e(n,t,r,a)})}:e}(function(e,n){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=n;else{for(fr=fr||document.createElement("div"),fr.innerHTML="<svg>"+n.valueOf().toString()+"</svg>",n=fr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;n.firstChild;)e.appendChild(n.firstChild)}});function Bt(e,n){if(n){var t=e.firstChild;if(t&&t===e.lastChild&&t.nodeType===3){t.nodeValue=n;return}}e.textContent=n}var jt={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},U2=["Webkit","ms","Moz","O"];Object.keys(jt).forEach(function(e){U2.forEach(function(n){n=n+e.charAt(0).toUpperCase()+e.substring(1),jt[n]=jt[e]})});function Al(e,n,t){return n==null||typeof n=="boolean"||n===""?"":t||typeof n!="number"||n===0||jt.hasOwnProperty(e)&&jt[e]?(""+n).trim():n+"px"}function Ol(e,n){e=e.style;for(var t in n)if(n.hasOwnProperty(t)){var r=t.indexOf("--")===0,a=Al(t,n[t],r);t==="float"&&(t="cssFloat"),r?e.setProperty(t,a):e[t]=a}}var G2=G({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function mo(e,n){if(n){if(G2[e]&&(n.children!=null||n.dangerouslySetInnerHTML!=null))throw Error(x(137,e));if(n.dangerouslySetInnerHTML!=null){if(n.children!=null)throw Error(x(60));if(typeof n.dangerouslySetInnerHTML!="object"||!("__html"in n.dangerouslySetInnerHTML))throw Error(x(61))}if(n.style!=null&&typeof n.style!="object")throw Error(x(62))}}function bo(e,n){if(e.indexOf("-")===-1)return typeof n.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var vo=null;function ci(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var yo=null,Jn=null,Xn=null;function cs(e){if(e=or(e)){if(typeof yo!="function")throw Error(x(280));var n=e.stateNode;n&&(n=va(n),yo(e.stateNode,e.type,n))}}function Bl(e){Jn?Xn?Xn.push(e):Xn=[e]:Jn=e}function Ll(){if(Jn){var e=Jn,n=Xn;if(Xn=Jn=null,cs(e),n)for(e=0;e<n.length;e++)cs(n[e])}}function Rl(e,n){return e(n)}function Wl(){}var Da=!1;function Ul(e,n,t){if(Da)return e(n,t);Da=!0;try{return Rl(e,n,t)}finally{Da=!1,(Jn!==null||Xn!==null)&&(Wl(),Ll())}}function Lt(e,n){var t=e.stateNode;if(t===null)return null;var r=va(t);if(r===null)return null;t=r[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(t&&typeof t!="function")throw Error(x(231,n,typeof t));return t}var xo=!1;if(Ye)try{var vt={};Object.defineProperty(vt,"passive",{get:function(){xo=!0}}),window.addEventListener("test",vt,vt),window.removeEventListener("test",vt,vt)}catch{xo=!1}function H2(e,n,t,r,a,o,i,s,l){var c=Array.prototype.slice.call(arguments,3);try{n.apply(t,c)}catch(p){this.onError(p)}}var Tt=!1,Ur=null,Gr=!1,ko=null,V2={onError:function(e){Tt=!0,Ur=e}};function q2(e,n,t,r,a,o,i,s,l){Tt=!1,Ur=null,H2.apply(V2,arguments)}function Q2(e,n,t,r,a,o,i,s,l){if(q2.apply(this,arguments),Tt){if(Tt){var c=Ur;Tt=!1,Ur=null}else throw Error(x(198));Gr||(Gr=!0,ko=c)}}function Dn(e){var n=e,t=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,n.flags&4098&&(t=n.return),e=n.return;while(e)}return n.tag===3?t:null}function Gl(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function ds(e){if(Dn(e)!==e)throw Error(x(188))}function Y2(e){var n=e.alternate;if(!n){if(n=Dn(e),n===null)throw Error(x(188));return n!==e?null:e}for(var t=e,r=n;;){var a=t.return;if(a===null)break;var o=a.alternate;if(o===null){if(r=a.return,r!==null){t=r;continue}break}if(a.child===o.child){for(o=a.child;o;){if(o===t)return ds(a),e;if(o===r)return ds(a),n;o=o.sibling}throw Error(x(188))}if(t.return!==r.return)t=a,r=o;else{for(var i=!1,s=a.child;s;){if(s===t){i=!0,t=a,r=o;break}if(s===r){i=!0,r=a,t=o;break}s=s.sibling}if(!i){for(s=o.child;s;){if(s===t){i=!0,t=o,r=a;break}if(s===r){i=!0,r=o,t=a;break}s=s.sibling}if(!i)throw Error(x(189))}}if(t.alternate!==r)throw Error(x(190))}if(t.tag!==3)throw Error(x(188));return t.stateNode.current===t?e:n}function Hl(e){return e=Y2(e),e!==null?Vl(e):null}function Vl(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var n=Vl(e);if(n!==null)return n;e=e.sibling}return null}var ql=we.unstable_scheduleCallback,us=we.unstable_cancelCallback,K2=we.unstable_shouldYield,J2=we.unstable_requestPaint,q=we.unstable_now,X2=we.unstable_getCurrentPriorityLevel,di=we.unstable_ImmediatePriority,Ql=we.unstable_UserBlockingPriority,Hr=we.unstable_NormalPriority,Z2=we.unstable_LowPriority,Yl=we.unstable_IdlePriority,ga=null,We=null;function ek(e){if(We&&typeof We.onCommitFiberRoot=="function")try{We.onCommitFiberRoot(ga,e,void 0,(e.current.flags&128)===128)}catch{}}var De=Math.clz32?Math.clz32:rk,nk=Math.log,tk=Math.LN2;function rk(e){return e>>>=0,e===0?32:31-(nk(e)/tk|0)|0}var gr=64,hr=4194304;function Et(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Vr(e,n){var t=e.pendingLanes;if(t===0)return 0;var r=0,a=e.suspendedLanes,o=e.pingedLanes,i=t&268435455;if(i!==0){var s=i&~a;s!==0?r=Et(s):(o&=i,o!==0&&(r=Et(o)))}else i=t&~a,i!==0?r=Et(i):o!==0&&(r=Et(o));if(r===0)return 0;if(n!==0&&n!==r&&!(n&a)&&(a=r&-r,o=n&-n,a>=o||a===16&&(o&4194240)!==0))return n;if(r&4&&(r|=t&16),n=e.entangledLanes,n!==0)for(e=e.entanglements,n&=r;0<n;)t=31-De(n),a=1<<t,r|=e[t],n&=~a;return r}function ak(e,n){switch(e){case 1:case 2:case 4:return n+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ok(e,n){for(var t=e.suspendedLanes,r=e.pingedLanes,a=e.expirationTimes,o=e.pendingLanes;0<o;){var i=31-De(o),s=1<<i,l=a[i];l===-1?(!(s&t)||s&r)&&(a[i]=ak(s,n)):l<=n&&(e.expiredLanes|=s),o&=~s}}function wo(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Kl(){var e=gr;return gr<<=1,!(gr&4194240)&&(gr=64),e}function Aa(e){for(var n=[],t=0;31>t;t++)n.push(e);return n}function rr(e,n,t){e.pendingLanes|=n,n!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,n=31-De(n),e[n]=t}function ik(e,n){var t=e.pendingLanes&~n;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=n,e.mutableReadLanes&=n,e.entangledLanes&=n,n=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<t;){var a=31-De(t),o=1<<a;n[a]=0,r[a]=-1,e[a]=-1,t&=~o}}function ui(e,n){var t=e.entangledLanes|=n;for(e=e.entanglements;t;){var r=31-De(t),a=1<<r;a&n|e[r]&n&&(e[r]|=n),t&=~a}}var D=0;function Jl(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Xl,pi,Zl,ec,nc,_o=!1,mr=[],ln=null,cn=null,dn=null,Rt=new Map,Wt=new Map,rn=[],sk="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function ps(e,n){switch(e){case"focusin":case"focusout":ln=null;break;case"dragenter":case"dragleave":cn=null;break;case"mouseover":case"mouseout":dn=null;break;case"pointerover":case"pointerout":Rt.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":Wt.delete(n.pointerId)}}function yt(e,n,t,r,a,o){return e===null||e.nativeEvent!==o?(e={blockedOn:n,domEventName:t,eventSystemFlags:r,nativeEvent:o,targetContainers:[a]},n!==null&&(n=or(n),n!==null&&pi(n)),e):(e.eventSystemFlags|=r,n=e.targetContainers,a!==null&&n.indexOf(a)===-1&&n.push(a),e)}function lk(e,n,t,r,a){switch(n){case"focusin":return ln=yt(ln,e,n,t,r,a),!0;case"dragenter":return cn=yt(cn,e,n,t,r,a),!0;case"mouseover":return dn=yt(dn,e,n,t,r,a),!0;case"pointerover":var o=a.pointerId;return Rt.set(o,yt(Rt.get(o)||null,e,n,t,r,a)),!0;case"gotpointercapture":return o=a.pointerId,Wt.set(o,yt(Wt.get(o)||null,e,n,t,r,a)),!0}return!1}function tc(e){var n=$n(e.target);if(n!==null){var t=Dn(n);if(t!==null){if(n=t.tag,n===13){if(n=Gl(t),n!==null){e.blockedOn=n,nc(e.priority,function(){Zl(t)});return}}else if(n===3&&t.stateNode.current.memoizedState.isDehydrated){e.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Pr(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var t=So(e.domEventName,e.eventSystemFlags,n[0],e.nativeEvent);if(t===null){t=e.nativeEvent;var r=new t.constructor(t.type,t);vo=r,t.target.dispatchEvent(r),vo=null}else return n=or(t),n!==null&&pi(n),e.blockedOn=t,!1;n.shift()}return!0}function fs(e,n,t){Pr(e)&&t.delete(n)}function ck(){_o=!1,ln!==null&&Pr(ln)&&(ln=null),cn!==null&&Pr(cn)&&(cn=null),dn!==null&&Pr(dn)&&(dn=null),Rt.forEach(fs),Wt.forEach(fs)}function xt(e,n){e.blockedOn===n&&(e.blockedOn=null,_o||(_o=!0,we.unstable_scheduleCallback(we.unstable_NormalPriority,ck)))}function Ut(e){function n(a){return xt(a,e)}if(0<mr.length){xt(mr[0],e);for(var t=1;t<mr.length;t++){var r=mr[t];r.blockedOn===e&&(r.blockedOn=null)}}for(ln!==null&&xt(ln,e),cn!==null&&xt(cn,e),dn!==null&&xt(dn,e),Rt.forEach(n),Wt.forEach(n),t=0;t<rn.length;t++)r=rn[t],r.blockedOn===e&&(r.blockedOn=null);for(;0<rn.length&&(t=rn[0],t.blockedOn===null);)tc(t),t.blockedOn===null&&rn.shift()}var Zn=Ze.ReactCurrentBatchConfig,qr=!0;function dk(e,n,t,r){var a=D,o=Zn.transition;Zn.transition=null;try{D=1,fi(e,n,t,r)}finally{D=a,Zn.transition=o}}function uk(e,n,t,r){var a=D,o=Zn.transition;Zn.transition=null;try{D=4,fi(e,n,t,r)}finally{D=a,Zn.transition=o}}function fi(e,n,t,r){if(qr){var a=So(e,n,t,r);if(a===null)qa(e,n,r,Qr,t),ps(e,r);else if(lk(a,e,n,t,r))r.stopPropagation();else if(ps(e,r),n&4&&-1<sk.indexOf(e)){for(;a!==null;){var o=or(a);if(o!==null&&Xl(o),o=So(e,n,t,r),o===null&&qa(e,n,r,Qr,t),o===a)break;a=o}a!==null&&r.stopPropagation()}else qa(e,n,r,null,t)}}var Qr=null;function So(e,n,t,r){if(Qr=null,e=ci(r),e=$n(e),e!==null)if(n=Dn(e),n===null)e=null;else if(t=n.tag,t===13){if(e=Gl(n),e!==null)return e;e=null}else if(t===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null);return Qr=e,null}function rc(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(X2()){case di:return 1;case Ql:return 4;case Hr:case Z2:return 16;case Yl:return 536870912;default:return 16}default:return 16}}var on=null,gi=null,Mr=null;function ac(){if(Mr)return Mr;var e,n=gi,t=n.length,r,a="value"in on?on.value:on.textContent,o=a.length;for(e=0;e<t&&n[e]===a[e];e++);var i=t-e;for(r=1;r<=i&&n[t-r]===a[o-r];r++);return Mr=a.slice(e,1<r?1-r:void 0)}function Nr(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function br(){return!0}function gs(){return!1}function Se(e){function n(t,r,a,o,i){this._reactName=t,this._targetInst=a,this.type=r,this.nativeEvent=o,this.target=i,this.currentTarget=null;for(var s in e)e.hasOwnProperty(s)&&(t=e[s],this[s]=t?t(o):o[s]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?br:gs,this.isPropagationStopped=gs,this}return G(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=br)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=br)},persist:function(){},isPersistent:br}),n}var pt={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},hi=Se(pt),ar=G({},pt,{view:0,detail:0}),pk=Se(ar),Oa,Ba,kt,ha=G({},ar,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:mi,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==kt&&(kt&&e.type==="mousemove"?(Oa=e.screenX-kt.screenX,Ba=e.screenY-kt.screenY):Ba=Oa=0,kt=e),Oa)},movementY:function(e){return"movementY"in e?e.movementY:Ba}}),hs=Se(ha),fk=G({},ha,{dataTransfer:0}),gk=Se(fk),hk=G({},ar,{relatedTarget:0}),La=Se(hk),mk=G({},pt,{animationName:0,elapsedTime:0,pseudoElement:0}),bk=Se(mk),vk=G({},pt,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),yk=Se(vk),xk=G({},pt,{data:0}),ms=Se(xk),kk={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},wk={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},_k={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Sk(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=_k[e])?!!n[e]:!1}function mi(){return Sk}var $k=G({},ar,{key:function(e){if(e.key){var n=kk[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=Nr(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?wk[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:mi,charCode:function(e){return e.type==="keypress"?Nr(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Nr(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Fk=Se($k),Ek=G({},ha,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),bs=Se(Ek),Ck=G({},ar,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:mi}),jk=Se(Ck),Tk=G({},pt,{propertyName:0,elapsedTime:0,pseudoElement:0}),Pk=Se(Tk),Mk=G({},ha,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Nk=Se(Mk),zk=[9,13,27,32],bi=Ye&&"CompositionEvent"in window,Pt=null;Ye&&"documentMode"in document&&(Pt=document.documentMode);var Ik=Ye&&"TextEvent"in window&&!Pt,oc=Ye&&(!bi||Pt&&8<Pt&&11>=Pt),vs=" ",ys=!1;function ic(e,n){switch(e){case"keyup":return zk.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function sc(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Ln=!1;function Dk(e,n){switch(e){case"compositionend":return sc(n);case"keypress":return n.which!==32?null:(ys=!0,vs);case"textInput":return e=n.data,e===vs&&ys?null:e;default:return null}}function Ak(e,n){if(Ln)return e==="compositionend"||!bi&&ic(e,n)?(e=ac(),Mr=gi=on=null,Ln=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return oc&&n.locale!=="ko"?null:n.data;default:return null}}var Ok={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function xs(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!Ok[e.type]:n==="textarea"}function lc(e,n,t,r){Bl(r),n=Yr(n,"onChange"),0<n.length&&(t=new hi("onChange","change",null,t,r),e.push({event:t,listeners:n}))}var Mt=null,Gt=null;function Bk(e){yc(e,0)}function ma(e){var n=Un(e);if(Ml(n))return e}function Lk(e,n){if(e==="change")return n}var cc=!1;if(Ye){var Ra;if(Ye){var Wa="oninput"in document;if(!Wa){var ks=document.createElement("div");ks.setAttribute("oninput","return;"),Wa=typeof ks.oninput=="function"}Ra=Wa}else Ra=!1;cc=Ra&&(!document.documentMode||9<document.documentMode)}function ws(){Mt&&(Mt.detachEvent("onpropertychange",dc),Gt=Mt=null)}function dc(e){if(e.propertyName==="value"&&ma(Gt)){var n=[];lc(n,Gt,e,ci(e)),Ul(Bk,n)}}function Rk(e,n,t){e==="focusin"?(ws(),Mt=n,Gt=t,Mt.attachEvent("onpropertychange",dc)):e==="focusout"&&ws()}function Wk(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return ma(Gt)}function Uk(e,n){if(e==="click")return ma(n)}function Gk(e,n){if(e==="input"||e==="change")return ma(n)}function Hk(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var Oe=typeof Object.is=="function"?Object.is:Hk;function Ht(e,n){if(Oe(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var t=Object.keys(e),r=Object.keys(n);if(t.length!==r.length)return!1;for(r=0;r<t.length;r++){var a=t[r];if(!oo.call(n,a)||!Oe(e[a],n[a]))return!1}return!0}function _s(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Ss(e,n){var t=_s(e);e=0;for(var r;t;){if(t.nodeType===3){if(r=e+t.textContent.length,e<=n&&r>=n)return{node:t,offset:n-e};e=r}e:{for(;t;){if(t.nextSibling){t=t.nextSibling;break e}t=t.parentNode}t=void 0}t=_s(t)}}function uc(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?uc(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function pc(){for(var e=window,n=Wr();n instanceof e.HTMLIFrameElement;){try{var t=typeof n.contentWindow.location.href=="string"}catch{t=!1}if(t)e=n.contentWindow;else break;n=Wr(e.document)}return n}function vi(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}function Vk(e){var n=pc(),t=e.focusedElem,r=e.selectionRange;if(n!==t&&t&&t.ownerDocument&&uc(t.ownerDocument.documentElement,t)){if(r!==null&&vi(t)){if(n=r.start,e=r.end,e===void 0&&(e=n),"selectionStart"in t)t.selectionStart=n,t.selectionEnd=Math.min(e,t.value.length);else if(e=(n=t.ownerDocument||document)&&n.defaultView||window,e.getSelection){e=e.getSelection();var a=t.textContent.length,o=Math.min(r.start,a);r=r.end===void 0?o:Math.min(r.end,a),!e.extend&&o>r&&(a=r,r=o,o=a),a=Ss(t,o);var i=Ss(t,r);a&&i&&(e.rangeCount!==1||e.anchorNode!==a.node||e.anchorOffset!==a.offset||e.focusNode!==i.node||e.focusOffset!==i.offset)&&(n=n.createRange(),n.setStart(a.node,a.offset),e.removeAllRanges(),o>r?(e.addRange(n),e.extend(i.node,i.offset)):(n.setEnd(i.node,i.offset),e.addRange(n)))}}for(n=[],e=t;e=e.parentNode;)e.nodeType===1&&n.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof t.focus=="function"&&t.focus(),t=0;t<n.length;t++)e=n[t],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var qk=Ye&&"documentMode"in document&&11>=document.documentMode,Rn=null,$o=null,Nt=null,Fo=!1;function $s(e,n,t){var r=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;Fo||Rn==null||Rn!==Wr(r)||(r=Rn,"selectionStart"in r&&vi(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Nt&&Ht(Nt,r)||(Nt=r,r=Yr($o,"onSelect"),0<r.length&&(n=new hi("onSelect","select",null,n,t),e.push({event:n,listeners:r}),n.target=Rn)))}function vr(e,n){var t={};return t[e.toLowerCase()]=n.toLowerCase(),t["Webkit"+e]="webkit"+n,t["Moz"+e]="moz"+n,t}var Wn={animationend:vr("Animation","AnimationEnd"),animationiteration:vr("Animation","AnimationIteration"),animationstart:vr("Animation","AnimationStart"),transitionend:vr("Transition","TransitionEnd")},Ua={},fc={};Ye&&(fc=document.createElement("div").style,"AnimationEvent"in window||(delete Wn.animationend.animation,delete Wn.animationiteration.animation,delete Wn.animationstart.animation),"TransitionEvent"in window||delete Wn.transitionend.transition);function ba(e){if(Ua[e])return Ua[e];if(!Wn[e])return e;var n=Wn[e],t;for(t in n)if(n.hasOwnProperty(t)&&t in fc)return Ua[e]=n[t];return e}var gc=ba("animationend"),hc=ba("animationiteration"),mc=ba("animationstart"),bc=ba("transitionend"),vc=new Map,Fs="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function vn(e,n){vc.set(e,n),In(n,[e])}for(var Ga=0;Ga<Fs.length;Ga++){var Ha=Fs[Ga],Qk=Ha.toLowerCase(),Yk=Ha[0].toUpperCase()+Ha.slice(1);vn(Qk,"on"+Yk)}vn(gc,"onAnimationEnd");vn(hc,"onAnimationIteration");vn(mc,"onAnimationStart");vn("dblclick","onDoubleClick");vn("focusin","onFocus");vn("focusout","onBlur");vn(bc,"onTransitionEnd");tt("onMouseEnter",["mouseout","mouseover"]);tt("onMouseLeave",["mouseout","mouseover"]);tt("onPointerEnter",["pointerout","pointerover"]);tt("onPointerLeave",["pointerout","pointerover"]);In("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));In("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));In("onBeforeInput",["compositionend","keypress","textInput","paste"]);In("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));In("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));In("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ct="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Kk=new Set("cancel close invalid load scroll toggle".split(" ").concat(Ct));function Es(e,n,t){var r=e.type||"unknown-event";e.currentTarget=t,Q2(r,n,void 0,e),e.currentTarget=null}function yc(e,n){n=(n&4)!==0;for(var t=0;t<e.length;t++){var r=e[t],a=r.event;r=r.listeners;e:{var o=void 0;if(n)for(var i=r.length-1;0<=i;i--){var s=r[i],l=s.instance,c=s.currentTarget;if(s=s.listener,l!==o&&a.isPropagationStopped())break e;Es(a,s,c),o=l}else for(i=0;i<r.length;i++){if(s=r[i],l=s.instance,c=s.currentTarget,s=s.listener,l!==o&&a.isPropagationStopped())break e;Es(a,s,c),o=l}}}if(Gr)throw e=ko,Gr=!1,ko=null,e}function B(e,n){var t=n[Po];t===void 0&&(t=n[Po]=new Set);var r=e+"__bubble";t.has(r)||(xc(n,e,2,!1),t.add(r))}function Va(e,n,t){var r=0;n&&(r|=4),xc(t,e,r,n)}var yr="_reactListening"+Math.random().toString(36).slice(2);function Vt(e){if(!e[yr]){e[yr]=!0,El.forEach(function(t){t!=="selectionchange"&&(Kk.has(t)||Va(t,!1,e),Va(t,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[yr]||(n[yr]=!0,Va("selectionchange",!1,n))}}function xc(e,n,t,r){switch(rc(n)){case 1:var a=dk;break;case 4:a=uk;break;default:a=fi}t=a.bind(null,n,t,e),a=void 0,!xo||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(a=!0),r?a!==void 0?e.addEventListener(n,t,{capture:!0,passive:a}):e.addEventListener(n,t,!0):a!==void 0?e.addEventListener(n,t,{passive:a}):e.addEventListener(n,t,!1)}function qa(e,n,t,r,a){var o=r;if(!(n&1)&&!(n&2)&&r!==null)e:for(;;){if(r===null)return;var i=r.tag;if(i===3||i===4){var s=r.stateNode.containerInfo;if(s===a||s.nodeType===8&&s.parentNode===a)break;if(i===4)for(i=r.return;i!==null;){var l=i.tag;if((l===3||l===4)&&(l=i.stateNode.containerInfo,l===a||l.nodeType===8&&l.parentNode===a))return;i=i.return}for(;s!==null;){if(i=$n(s),i===null)return;if(l=i.tag,l===5||l===6){r=o=i;continue e}s=s.parentNode}}r=r.return}Ul(function(){var c=o,p=ci(t),g=[];e:{var m=vc.get(e);if(m!==void 0){var b=hi,w=e;switch(e){case"keypress":if(Nr(t)===0)break e;case"keydown":case"keyup":b=Fk;break;case"focusin":w="focus",b=La;break;case"focusout":w="blur",b=La;break;case"beforeblur":case"afterblur":b=La;break;case"click":if(t.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":b=hs;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":b=gk;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":b=jk;break;case gc:case hc:case mc:b=bk;break;case bc:b=Pk;break;case"scroll":b=pk;break;case"wheel":b=Nk;break;case"copy":case"cut":case"paste":b=yk;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":b=bs}var y=(n&4)!==0,T=!y&&e==="scroll",f=y?m!==null?m+"Capture":null:m;y=[];for(var u=c,h;u!==null;){h=u;var v=h.stateNode;if(h.tag===5&&v!==null&&(h=v,f!==null&&(v=Lt(u,f),v!=null&&y.push(qt(u,v,h)))),T)break;u=u.return}0<y.length&&(m=new b(m,w,null,t,p),g.push({event:m,listeners:y}))}}if(!(n&7)){e:{if(m=e==="mouseover"||e==="pointerover",b=e==="mouseout"||e==="pointerout",m&&t!==vo&&(w=t.relatedTarget||t.fromElement)&&($n(w)||w[Ke]))break e;if((b||m)&&(m=p.window===p?p:(m=p.ownerDocument)?m.defaultView||m.parentWindow:window,b?(w=t.relatedTarget||t.toElement,b=c,w=w?$n(w):null,w!==null&&(T=Dn(w),w!==T||w.tag!==5&&w.tag!==6)&&(w=null)):(b=null,w=c),b!==w)){if(y=hs,v="onMouseLeave",f="onMouseEnter",u="mouse",(e==="pointerout"||e==="pointerover")&&(y=bs,v="onPointerLeave",f="onPointerEnter",u="pointer"),T=b==null?m:Un(b),h=w==null?m:Un(w),m=new y(v,u+"leave",b,t,p),m.target=T,m.relatedTarget=h,v=null,$n(p)===c&&(y=new y(f,u+"enter",w,t,p),y.target=h,y.relatedTarget=T,v=y),T=v,b&&w)n:{for(y=b,f=w,u=0,h=y;h;h=An(h))u++;for(h=0,v=f;v;v=An(v))h++;for(;0<u-h;)y=An(y),u--;for(;0<h-u;)f=An(f),h--;for(;u--;){if(y===f||f!==null&&y===f.alternate)break n;y=An(y),f=An(f)}y=null}else y=null;b!==null&&Cs(g,m,b,y,!1),w!==null&&T!==null&&Cs(g,T,w,y,!0)}}e:{if(m=c?Un(c):window,b=m.nodeName&&m.nodeName.toLowerCase(),b==="select"||b==="input"&&m.type==="file")var _=Lk;else if(xs(m))if(cc)_=Gk;else{_=Wk;var k=Rk}else(b=m.nodeName)&&b.toLowerCase()==="input"&&(m.type==="checkbox"||m.type==="radio")&&(_=Uk);if(_&&(_=_(e,c))){lc(g,_,t,p);break e}k&&k(e,m,c),e==="focusout"&&(k=m._wrapperState)&&k.controlled&&m.type==="number"&&fo(m,"number",m.value)}switch(k=c?Un(c):window,e){case"focusin":(xs(k)||k.contentEditable==="true")&&(Rn=k,$o=c,Nt=null);break;case"focusout":Nt=$o=Rn=null;break;case"mousedown":Fo=!0;break;case"contextmenu":case"mouseup":case"dragend":Fo=!1,$s(g,t,p);break;case"selectionchange":if(qk)break;case"keydown":case"keyup":$s(g,t,p)}var C;if(bi)e:{switch(e){case"compositionstart":var S="onCompositionStart";break e;case"compositionend":S="onCompositionEnd";break e;case"compositionupdate":S="onCompositionUpdate";break e}S=void 0}else Ln?ic(e,t)&&(S="onCompositionEnd"):e==="keydown"&&t.keyCode===229&&(S="onCompositionStart");S&&(oc&&t.locale!=="ko"&&(Ln||S!=="onCompositionStart"?S==="onCompositionEnd"&&Ln&&(C=ac()):(on=p,gi="value"in on?on.value:on.textContent,Ln=!0)),k=Yr(c,S),0<k.length&&(S=new ms(S,e,null,t,p),g.push({event:S,listeners:k}),C?S.data=C:(C=sc(t),C!==null&&(S.data=C)))),(C=Ik?Dk(e,t):Ak(e,t))&&(c=Yr(c,"onBeforeInput"),0<c.length&&(p=new ms("onBeforeInput","beforeinput",null,t,p),g.push({event:p,listeners:c}),p.data=C))}yc(g,n)})}function qt(e,n,t){return{instance:e,listener:n,currentTarget:t}}function Yr(e,n){for(var t=n+"Capture",r=[];e!==null;){var a=e,o=a.stateNode;a.tag===5&&o!==null&&(a=o,o=Lt(e,t),o!=null&&r.unshift(qt(e,o,a)),o=Lt(e,n),o!=null&&r.push(qt(e,o,a))),e=e.return}return r}function An(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Cs(e,n,t,r,a){for(var o=n._reactName,i=[];t!==null&&t!==r;){var s=t,l=s.alternate,c=s.stateNode;if(l!==null&&l===r)break;s.tag===5&&c!==null&&(s=c,a?(l=Lt(t,o),l!=null&&i.unshift(qt(t,l,s))):a||(l=Lt(t,o),l!=null&&i.push(qt(t,l,s)))),t=t.return}i.length!==0&&e.push({event:n,listeners:i})}var Jk=/\r\n?/g,Xk=/\u0000|\uFFFD/g;function js(e){return(typeof e=="string"?e:""+e).replace(Jk,`
`).replace(Xk,"")}function xr(e,n,t){if(n=js(n),js(e)!==n&&t)throw Error(x(425))}function Kr(){}var Eo=null,Co=null;function jo(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var To=typeof setTimeout=="function"?setTimeout:void 0,Zk=typeof clearTimeout=="function"?clearTimeout:void 0,Ts=typeof Promise=="function"?Promise:void 0,ew=typeof queueMicrotask=="function"?queueMicrotask:typeof Ts<"u"?function(e){return Ts.resolve(null).then(e).catch(nw)}:To;function nw(e){setTimeout(function(){throw e})}function Qa(e,n){var t=n,r=0;do{var a=t.nextSibling;if(e.removeChild(t),a&&a.nodeType===8)if(t=a.data,t==="/$"){if(r===0){e.removeChild(a),Ut(n);return}r--}else t!=="$"&&t!=="$?"&&t!=="$!"||r++;t=a}while(t);Ut(n)}function un(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?")break;if(n==="/$")return null}}return e}function Ps(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="$"||t==="$!"||t==="$?"){if(n===0)return e;n--}else t==="/$"&&n++}e=e.previousSibling}return null}var ft=Math.random().toString(36).slice(2),Re="__reactFiber$"+ft,Qt="__reactProps$"+ft,Ke="__reactContainer$"+ft,Po="__reactEvents$"+ft,tw="__reactListeners$"+ft,rw="__reactHandles$"+ft;function $n(e){var n=e[Re];if(n)return n;for(var t=e.parentNode;t;){if(n=t[Ke]||t[Re]){if(t=n.alternate,n.child!==null||t!==null&&t.child!==null)for(e=Ps(e);e!==null;){if(t=e[Re])return t;e=Ps(e)}return n}e=t,t=e.parentNode}return null}function or(e){return e=e[Re]||e[Ke],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Un(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(x(33))}function va(e){return e[Qt]||null}var Mo=[],Gn=-1;function yn(e){return{current:e}}function L(e){0>Gn||(e.current=Mo[Gn],Mo[Gn]=null,Gn--)}function O(e,n){Gn++,Mo[Gn]=e.current,e.current=n}var bn={},se=yn(bn),he=yn(!1),Tn=bn;function rt(e,n){var t=e.type.contextTypes;if(!t)return bn;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===n)return r.__reactInternalMemoizedMaskedChildContext;var a={},o;for(o in t)a[o]=n[o];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=n,e.__reactInternalMemoizedMaskedChildContext=a),a}function me(e){return e=e.childContextTypes,e!=null}function Jr(){L(he),L(se)}function Ms(e,n,t){if(se.current!==bn)throw Error(x(168));O(se,n),O(he,t)}function kc(e,n,t){var r=e.stateNode;if(n=n.childContextTypes,typeof r.getChildContext!="function")return t;r=r.getChildContext();for(var a in r)if(!(a in n))throw Error(x(108,R2(e)||"Unknown",a));return G({},t,r)}function Xr(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||bn,Tn=se.current,O(se,e),O(he,he.current),!0}function Ns(e,n,t){var r=e.stateNode;if(!r)throw Error(x(169));t?(e=kc(e,n,Tn),r.__reactInternalMemoizedMergedChildContext=e,L(he),L(se),O(se,e)):L(he),O(he,t)}var He=null,ya=!1,Ya=!1;function wc(e){He===null?He=[e]:He.push(e)}function aw(e){ya=!0,wc(e)}function xn(){if(!Ya&&He!==null){Ya=!0;var e=0,n=D;try{var t=He;for(D=1;e<t.length;e++){var r=t[e];do r=r(!0);while(r!==null)}He=null,ya=!1}catch(a){throw He!==null&&(He=He.slice(e+1)),ql(di,xn),a}finally{D=n,Ya=!1}}return null}var Hn=[],Vn=0,Zr=null,ea=0,$e=[],Fe=0,Pn=null,Ve=1,qe="";function _n(e,n){Hn[Vn++]=ea,Hn[Vn++]=Zr,Zr=e,ea=n}function _c(e,n,t){$e[Fe++]=Ve,$e[Fe++]=qe,$e[Fe++]=Pn,Pn=e;var r=Ve;e=qe;var a=32-De(r)-1;r&=~(1<<a),t+=1;var o=32-De(n)+a;if(30<o){var i=a-a%5;o=(r&(1<<i)-1).toString(32),r>>=i,a-=i,Ve=1<<32-De(n)+a|t<<a|r,qe=o+e}else Ve=1<<o|t<<a|r,qe=e}function yi(e){e.return!==null&&(_n(e,1),_c(e,1,0))}function xi(e){for(;e===Zr;)Zr=Hn[--Vn],Hn[Vn]=null,ea=Hn[--Vn],Hn[Vn]=null;for(;e===Pn;)Pn=$e[--Fe],$e[Fe]=null,qe=$e[--Fe],$e[Fe]=null,Ve=$e[--Fe],$e[Fe]=null}var ke=null,xe=null,R=!1,Ie=null;function Sc(e,n){var t=Ee(5,null,null,0);t.elementType="DELETED",t.stateNode=n,t.return=e,n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)}function zs(e,n){switch(e.tag){case 5:var t=e.type;return n=n.nodeType!==1||t.toLowerCase()!==n.nodeName.toLowerCase()?null:n,n!==null?(e.stateNode=n,ke=e,xe=un(n.firstChild),!0):!1;case 6:return n=e.pendingProps===""||n.nodeType!==3?null:n,n!==null?(e.stateNode=n,ke=e,xe=null,!0):!1;case 13:return n=n.nodeType!==8?null:n,n!==null?(t=Pn!==null?{id:Ve,overflow:qe}:null,e.memoizedState={dehydrated:n,treeContext:t,retryLane:1073741824},t=Ee(18,null,null,0),t.stateNode=n,t.return=e,e.child=t,ke=e,xe=null,!0):!1;default:return!1}}function No(e){return(e.mode&1)!==0&&(e.flags&128)===0}function zo(e){if(R){var n=xe;if(n){var t=n;if(!zs(e,n)){if(No(e))throw Error(x(418));n=un(t.nextSibling);var r=ke;n&&zs(e,n)?Sc(r,t):(e.flags=e.flags&-4097|2,R=!1,ke=e)}}else{if(No(e))throw Error(x(418));e.flags=e.flags&-4097|2,R=!1,ke=e}}}function Is(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;ke=e}function kr(e){if(e!==ke)return!1;if(!R)return Is(e),R=!0,!1;var n;if((n=e.tag!==3)&&!(n=e.tag!==5)&&(n=e.type,n=n!=="head"&&n!=="body"&&!jo(e.type,e.memoizedProps)),n&&(n=xe)){if(No(e))throw $c(),Error(x(418));for(;n;)Sc(e,n),n=un(n.nextSibling)}if(Is(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(x(317));e:{for(e=e.nextSibling,n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="/$"){if(n===0){xe=un(e.nextSibling);break e}n--}else t!=="$"&&t!=="$!"&&t!=="$?"||n++}e=e.nextSibling}xe=null}}else xe=ke?un(e.stateNode.nextSibling):null;return!0}function $c(){for(var e=xe;e;)e=un(e.nextSibling)}function at(){xe=ke=null,R=!1}function ki(e){Ie===null?Ie=[e]:Ie.push(e)}var ow=Ze.ReactCurrentBatchConfig;function wt(e,n,t){if(e=t.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(t._owner){if(t=t._owner,t){if(t.tag!==1)throw Error(x(309));var r=t.stateNode}if(!r)throw Error(x(147,e));var a=r,o=""+e;return n!==null&&n.ref!==null&&typeof n.ref=="function"&&n.ref._stringRef===o?n.ref:(n=function(i){var s=a.refs;i===null?delete s[o]:s[o]=i},n._stringRef=o,n)}if(typeof e!="string")throw Error(x(284));if(!t._owner)throw Error(x(290,e))}return e}function wr(e,n){throw e=Object.prototype.toString.call(n),Error(x(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e))}function Ds(e){var n=e._init;return n(e._payload)}function Fc(e){function n(f,u){if(e){var h=f.deletions;h===null?(f.deletions=[u],f.flags|=16):h.push(u)}}function t(f,u){if(!e)return null;for(;u!==null;)n(f,u),u=u.sibling;return null}function r(f,u){for(f=new Map;u!==null;)u.key!==null?f.set(u.key,u):f.set(u.index,u),u=u.sibling;return f}function a(f,u){return f=hn(f,u),f.index=0,f.sibling=null,f}function o(f,u,h){return f.index=h,e?(h=f.alternate,h!==null?(h=h.index,h<u?(f.flags|=2,u):h):(f.flags|=2,u)):(f.flags|=1048576,u)}function i(f){return e&&f.alternate===null&&(f.flags|=2),f}function s(f,u,h,v){return u===null||u.tag!==6?(u=to(h,f.mode,v),u.return=f,u):(u=a(u,h),u.return=f,u)}function l(f,u,h,v){var _=h.type;return _===Bn?p(f,u,h.props.children,v,h.key):u!==null&&(u.elementType===_||typeof _=="object"&&_!==null&&_.$$typeof===nn&&Ds(_)===u.type)?(v=a(u,h.props),v.ref=wt(f,u,h),v.return=f,v):(v=Lr(h.type,h.key,h.props,null,f.mode,v),v.ref=wt(f,u,h),v.return=f,v)}function c(f,u,h,v){return u===null||u.tag!==4||u.stateNode.containerInfo!==h.containerInfo||u.stateNode.implementation!==h.implementation?(u=ro(h,f.mode,v),u.return=f,u):(u=a(u,h.children||[]),u.return=f,u)}function p(f,u,h,v,_){return u===null||u.tag!==7?(u=jn(h,f.mode,v,_),u.return=f,u):(u=a(u,h),u.return=f,u)}function g(f,u,h){if(typeof u=="string"&&u!==""||typeof u=="number")return u=to(""+u,f.mode,h),u.return=f,u;if(typeof u=="object"&&u!==null){switch(u.$$typeof){case ur:return h=Lr(u.type,u.key,u.props,null,f.mode,h),h.ref=wt(f,null,u),h.return=f,h;case On:return u=ro(u,f.mode,h),u.return=f,u;case nn:var v=u._init;return g(f,v(u._payload),h)}if(Ft(u)||bt(u))return u=jn(u,f.mode,h,null),u.return=f,u;wr(f,u)}return null}function m(f,u,h,v){var _=u!==null?u.key:null;if(typeof h=="string"&&h!==""||typeof h=="number")return _!==null?null:s(f,u,""+h,v);if(typeof h=="object"&&h!==null){switch(h.$$typeof){case ur:return h.key===_?l(f,u,h,v):null;case On:return h.key===_?c(f,u,h,v):null;case nn:return _=h._init,m(f,u,_(h._payload),v)}if(Ft(h)||bt(h))return _!==null?null:p(f,u,h,v,null);wr(f,h)}return null}function b(f,u,h,v,_){if(typeof v=="string"&&v!==""||typeof v=="number")return f=f.get(h)||null,s(u,f,""+v,_);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case ur:return f=f.get(v.key===null?h:v.key)||null,l(u,f,v,_);case On:return f=f.get(v.key===null?h:v.key)||null,c(u,f,v,_);case nn:var k=v._init;return b(f,u,h,k(v._payload),_)}if(Ft(v)||bt(v))return f=f.get(h)||null,p(u,f,v,_,null);wr(u,v)}return null}function w(f,u,h,v){for(var _=null,k=null,C=u,S=u=0,$=null;C!==null&&S<h.length;S++){C.index>S?($=C,C=null):$=C.sibling;var j=m(f,C,h[S],v);if(j===null){C===null&&(C=$);break}e&&C&&j.alternate===null&&n(f,C),u=o(j,u,S),k===null?_=j:k.sibling=j,k=j,C=$}if(S===h.length)return t(f,C),R&&_n(f,S),_;if(C===null){for(;S<h.length;S++)C=g(f,h[S],v),C!==null&&(u=o(C,u,S),k===null?_=C:k.sibling=C,k=C);return R&&_n(f,S),_}for(C=r(f,C);S<h.length;S++)$=b(C,f,S,h[S],v),$!==null&&(e&&$.alternate!==null&&C.delete($.key===null?S:$.key),u=o($,u,S),k===null?_=$:k.sibling=$,k=$);return e&&C.forEach(function(ee){return n(f,ee)}),R&&_n(f,S),_}function y(f,u,h,v){var _=bt(h);if(typeof _!="function")throw Error(x(150));if(h=_.call(h),h==null)throw Error(x(151));for(var k=_=null,C=u,S=u=0,$=null,j=h.next();C!==null&&!j.done;S++,j=h.next()){C.index>S?($=C,C=null):$=C.sibling;var ee=m(f,C,j.value,v);if(ee===null){C===null&&(C=$);break}e&&C&&ee.alternate===null&&n(f,C),u=o(ee,u,S),k===null?_=ee:k.sibling=ee,k=ee,C=$}if(j.done)return t(f,C),R&&_n(f,S),_;if(C===null){for(;!j.done;S++,j=h.next())j=g(f,j.value,v),j!==null&&(u=o(j,u,S),k===null?_=j:k.sibling=j,k=j);return R&&_n(f,S),_}for(C=r(f,C);!j.done;S++,j=h.next())j=b(C,f,S,j.value,v),j!==null&&(e&&j.alternate!==null&&C.delete(j.key===null?S:j.key),u=o(j,u,S),k===null?_=j:k.sibling=j,k=j);return e&&C.forEach(function(ht){return n(f,ht)}),R&&_n(f,S),_}function T(f,u,h,v){if(typeof h=="object"&&h!==null&&h.type===Bn&&h.key===null&&(h=h.props.children),typeof h=="object"&&h!==null){switch(h.$$typeof){case ur:e:{for(var _=h.key,k=u;k!==null;){if(k.key===_){if(_=h.type,_===Bn){if(k.tag===7){t(f,k.sibling),u=a(k,h.props.children),u.return=f,f=u;break e}}else if(k.elementType===_||typeof _=="object"&&_!==null&&_.$$typeof===nn&&Ds(_)===k.type){t(f,k.sibling),u=a(k,h.props),u.ref=wt(f,k,h),u.return=f,f=u;break e}t(f,k);break}else n(f,k);k=k.sibling}h.type===Bn?(u=jn(h.props.children,f.mode,v,h.key),u.return=f,f=u):(v=Lr(h.type,h.key,h.props,null,f.mode,v),v.ref=wt(f,u,h),v.return=f,f=v)}return i(f);case On:e:{for(k=h.key;u!==null;){if(u.key===k)if(u.tag===4&&u.stateNode.containerInfo===h.containerInfo&&u.stateNode.implementation===h.implementation){t(f,u.sibling),u=a(u,h.children||[]),u.return=f,f=u;break e}else{t(f,u);break}else n(f,u);u=u.sibling}u=ro(h,f.mode,v),u.return=f,f=u}return i(f);case nn:return k=h._init,T(f,u,k(h._payload),v)}if(Ft(h))return w(f,u,h,v);if(bt(h))return y(f,u,h,v);wr(f,h)}return typeof h=="string"&&h!==""||typeof h=="number"?(h=""+h,u!==null&&u.tag===6?(t(f,u.sibling),u=a(u,h),u.return=f,f=u):(t(f,u),u=to(h,f.mode,v),u.return=f,f=u),i(f)):t(f,u)}return T}var ot=Fc(!0),Ec=Fc(!1),na=yn(null),ta=null,qn=null,wi=null;function _i(){wi=qn=ta=null}function Si(e){var n=na.current;L(na),e._currentValue=n}function Io(e,n,t){for(;e!==null;){var r=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,r!==null&&(r.childLanes|=n)):r!==null&&(r.childLanes&n)!==n&&(r.childLanes|=n),e===t)break;e=e.return}}function et(e,n){ta=e,wi=qn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&n&&(ge=!0),e.firstContext=null)}function je(e){var n=e._currentValue;if(wi!==e)if(e={context:e,memoizedValue:n,next:null},qn===null){if(ta===null)throw Error(x(308));qn=e,ta.dependencies={lanes:0,firstContext:e}}else qn=qn.next=e;return n}var Fn=null;function $i(e){Fn===null?Fn=[e]:Fn.push(e)}function Cc(e,n,t,r){var a=n.interleaved;return a===null?(t.next=t,$i(n)):(t.next=a.next,a.next=t),n.interleaved=t,Je(e,r)}function Je(e,n){e.lanes|=n;var t=e.alternate;for(t!==null&&(t.lanes|=n),t=e,e=e.return;e!==null;)e.childLanes|=n,t=e.alternate,t!==null&&(t.childLanes|=n),t=e,e=e.return;return t.tag===3?t.stateNode:null}var tn=!1;function Fi(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function jc(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Qe(e,n){return{eventTime:e,lane:n,tag:0,payload:null,callback:null,next:null}}function pn(e,n,t){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,I&2){var a=r.pending;return a===null?n.next=n:(n.next=a.next,a.next=n),r.pending=n,Je(e,t)}return a=r.interleaved,a===null?(n.next=n,$i(r)):(n.next=a.next,a.next=n),r.interleaved=n,Je(e,t)}function zr(e,n,t){if(n=n.updateQueue,n!==null&&(n=n.shared,(t&4194240)!==0)){var r=n.lanes;r&=e.pendingLanes,t|=r,n.lanes=t,ui(e,t)}}function As(e,n){var t=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,t===r)){var a=null,o=null;if(t=t.firstBaseUpdate,t!==null){do{var i={eventTime:t.eventTime,lane:t.lane,tag:t.tag,payload:t.payload,callback:t.callback,next:null};o===null?a=o=i:o=o.next=i,t=t.next}while(t!==null);o===null?a=o=n:o=o.next=n}else a=o=n;t={baseState:r.baseState,firstBaseUpdate:a,lastBaseUpdate:o,shared:r.shared,effects:r.effects},e.updateQueue=t;return}e=t.lastBaseUpdate,e===null?t.firstBaseUpdate=n:e.next=n,t.lastBaseUpdate=n}function ra(e,n,t,r){var a=e.updateQueue;tn=!1;var o=a.firstBaseUpdate,i=a.lastBaseUpdate,s=a.shared.pending;if(s!==null){a.shared.pending=null;var l=s,c=l.next;l.next=null,i===null?o=c:i.next=c,i=l;var p=e.alternate;p!==null&&(p=p.updateQueue,s=p.lastBaseUpdate,s!==i&&(s===null?p.firstBaseUpdate=c:s.next=c,p.lastBaseUpdate=l))}if(o!==null){var g=a.baseState;i=0,p=c=l=null,s=o;do{var m=s.lane,b=s.eventTime;if((r&m)===m){p!==null&&(p=p.next={eventTime:b,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});e:{var w=e,y=s;switch(m=n,b=t,y.tag){case 1:if(w=y.payload,typeof w=="function"){g=w.call(b,g,m);break e}g=w;break e;case 3:w.flags=w.flags&-65537|128;case 0:if(w=y.payload,m=typeof w=="function"?w.call(b,g,m):w,m==null)break e;g=G({},g,m);break e;case 2:tn=!0}}s.callback!==null&&s.lane!==0&&(e.flags|=64,m=a.effects,m===null?a.effects=[s]:m.push(s))}else b={eventTime:b,lane:m,tag:s.tag,payload:s.payload,callback:s.callback,next:null},p===null?(c=p=b,l=g):p=p.next=b,i|=m;if(s=s.next,s===null){if(s=a.shared.pending,s===null)break;m=s,s=m.next,m.next=null,a.lastBaseUpdate=m,a.shared.pending=null}}while(!0);if(p===null&&(l=g),a.baseState=l,a.firstBaseUpdate=c,a.lastBaseUpdate=p,n=a.shared.interleaved,n!==null){a=n;do i|=a.lane,a=a.next;while(a!==n)}else o===null&&(a.shared.lanes=0);Nn|=i,e.lanes=i,e.memoizedState=g}}function Os(e,n,t){if(e=n.effects,n.effects=null,e!==null)for(n=0;n<e.length;n++){var r=e[n],a=r.callback;if(a!==null){if(r.callback=null,r=t,typeof a!="function")throw Error(x(191,a));a.call(r)}}}var ir={},Ue=yn(ir),Yt=yn(ir),Kt=yn(ir);function En(e){if(e===ir)throw Error(x(174));return e}function Ei(e,n){switch(O(Kt,n),O(Yt,e),O(Ue,ir),e=n.nodeType,e){case 9:case 11:n=(n=n.documentElement)?n.namespaceURI:ho(null,"");break;default:e=e===8?n.parentNode:n,n=e.namespaceURI||null,e=e.tagName,n=ho(n,e)}L(Ue),O(Ue,n)}function it(){L(Ue),L(Yt),L(Kt)}function Tc(e){En(Kt.current);var n=En(Ue.current),t=ho(n,e.type);n!==t&&(O(Yt,e),O(Ue,t))}function Ci(e){Yt.current===e&&(L(Ue),L(Yt))}var W=yn(0);function aa(e){for(var n=e;n!==null;){if(n.tag===13){var t=n.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||t.data==="$?"||t.data==="$!"))return n}else if(n.tag===19&&n.memoizedProps.revealOrder!==void 0){if(n.flags&128)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var Ka=[];function ji(){for(var e=0;e<Ka.length;e++)Ka[e]._workInProgressVersionPrimary=null;Ka.length=0}var Ir=Ze.ReactCurrentDispatcher,Ja=Ze.ReactCurrentBatchConfig,Mn=0,U=null,Y=null,X=null,oa=!1,zt=!1,Jt=0,iw=0;function ae(){throw Error(x(321))}function Ti(e,n){if(n===null)return!1;for(var t=0;t<n.length&&t<e.length;t++)if(!Oe(e[t],n[t]))return!1;return!0}function Pi(e,n,t,r,a,o){if(Mn=o,U=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,Ir.current=e===null||e.memoizedState===null?dw:uw,e=t(r,a),zt){o=0;do{if(zt=!1,Jt=0,25<=o)throw Error(x(301));o+=1,X=Y=null,n.updateQueue=null,Ir.current=pw,e=t(r,a)}while(zt)}if(Ir.current=ia,n=Y!==null&&Y.next!==null,Mn=0,X=Y=U=null,oa=!1,n)throw Error(x(300));return e}function Mi(){var e=Jt!==0;return Jt=0,e}function Le(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return X===null?U.memoizedState=X=e:X=X.next=e,X}function Te(){if(Y===null){var e=U.alternate;e=e!==null?e.memoizedState:null}else e=Y.next;var n=X===null?U.memoizedState:X.next;if(n!==null)X=n,Y=e;else{if(e===null)throw Error(x(310));Y=e,e={memoizedState:Y.memoizedState,baseState:Y.baseState,baseQueue:Y.baseQueue,queue:Y.queue,next:null},X===null?U.memoizedState=X=e:X=X.next=e}return X}function Xt(e,n){return typeof n=="function"?n(e):n}function Xa(e){var n=Te(),t=n.queue;if(t===null)throw Error(x(311));t.lastRenderedReducer=e;var r=Y,a=r.baseQueue,o=t.pending;if(o!==null){if(a!==null){var i=a.next;a.next=o.next,o.next=i}r.baseQueue=a=o,t.pending=null}if(a!==null){o=a.next,r=r.baseState;var s=i=null,l=null,c=o;do{var p=c.lane;if((Mn&p)===p)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:e(r,c.action);else{var g={lane:p,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(s=l=g,i=r):l=l.next=g,U.lanes|=p,Nn|=p}c=c.next}while(c!==null&&c!==o);l===null?i=r:l.next=s,Oe(r,n.memoizedState)||(ge=!0),n.memoizedState=r,n.baseState=i,n.baseQueue=l,t.lastRenderedState=r}if(e=t.interleaved,e!==null){a=e;do o=a.lane,U.lanes|=o,Nn|=o,a=a.next;while(a!==e)}else a===null&&(t.lanes=0);return[n.memoizedState,t.dispatch]}function Za(e){var n=Te(),t=n.queue;if(t===null)throw Error(x(311));t.lastRenderedReducer=e;var r=t.dispatch,a=t.pending,o=n.memoizedState;if(a!==null){t.pending=null;var i=a=a.next;do o=e(o,i.action),i=i.next;while(i!==a);Oe(o,n.memoizedState)||(ge=!0),n.memoizedState=o,n.baseQueue===null&&(n.baseState=o),t.lastRenderedState=o}return[o,r]}function Pc(){}function Mc(e,n){var t=U,r=Te(),a=n(),o=!Oe(r.memoizedState,a);if(o&&(r.memoizedState=a,ge=!0),r=r.queue,Ni(Ic.bind(null,t,r,e),[e]),r.getSnapshot!==n||o||X!==null&&X.memoizedState.tag&1){if(t.flags|=2048,Zt(9,zc.bind(null,t,r,a,n),void 0,null),Z===null)throw Error(x(349));Mn&30||Nc(t,n,a)}return a}function Nc(e,n,t){e.flags|=16384,e={getSnapshot:n,value:t},n=U.updateQueue,n===null?(n={lastEffect:null,stores:null},U.updateQueue=n,n.stores=[e]):(t=n.stores,t===null?n.stores=[e]:t.push(e))}function zc(e,n,t,r){n.value=t,n.getSnapshot=r,Dc(n)&&Ac(e)}function Ic(e,n,t){return t(function(){Dc(n)&&Ac(e)})}function Dc(e){var n=e.getSnapshot;e=e.value;try{var t=n();return!Oe(e,t)}catch{return!0}}function Ac(e){var n=Je(e,1);n!==null&&Ae(n,e,1,-1)}function Bs(e){var n=Le();return typeof e=="function"&&(e=e()),n.memoizedState=n.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Xt,lastRenderedState:e},n.queue=e,e=e.dispatch=cw.bind(null,U,e),[n.memoizedState,e]}function Zt(e,n,t,r){return e={tag:e,create:n,destroy:t,deps:r,next:null},n=U.updateQueue,n===null?(n={lastEffect:null,stores:null},U.updateQueue=n,n.lastEffect=e.next=e):(t=n.lastEffect,t===null?n.lastEffect=e.next=e:(r=t.next,t.next=e,e.next=r,n.lastEffect=e)),e}function Oc(){return Te().memoizedState}function Dr(e,n,t,r){var a=Le();U.flags|=e,a.memoizedState=Zt(1|n,t,void 0,r===void 0?null:r)}function xa(e,n,t,r){var a=Te();r=r===void 0?null:r;var o=void 0;if(Y!==null){var i=Y.memoizedState;if(o=i.destroy,r!==null&&Ti(r,i.deps)){a.memoizedState=Zt(n,t,o,r);return}}U.flags|=e,a.memoizedState=Zt(1|n,t,o,r)}function Ls(e,n){return Dr(8390656,8,e,n)}function Ni(e,n){return xa(2048,8,e,n)}function Bc(e,n){return xa(4,2,e,n)}function Lc(e,n){return xa(4,4,e,n)}function Rc(e,n){if(typeof n=="function")return e=e(),n(e),function(){n(null)};if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function Wc(e,n,t){return t=t!=null?t.concat([e]):null,xa(4,4,Rc.bind(null,n,e),t)}function zi(){}function Uc(e,n){var t=Te();n=n===void 0?null:n;var r=t.memoizedState;return r!==null&&n!==null&&Ti(n,r[1])?r[0]:(t.memoizedState=[e,n],e)}function Gc(e,n){var t=Te();n=n===void 0?null:n;var r=t.memoizedState;return r!==null&&n!==null&&Ti(n,r[1])?r[0]:(e=e(),t.memoizedState=[e,n],e)}function Hc(e,n,t){return Mn&21?(Oe(t,n)||(t=Kl(),U.lanes|=t,Nn|=t,e.baseState=!0),n):(e.baseState&&(e.baseState=!1,ge=!0),e.memoizedState=t)}function sw(e,n){var t=D;D=t!==0&&4>t?t:4,e(!0);var r=Ja.transition;Ja.transition={};try{e(!1),n()}finally{D=t,Ja.transition=r}}function Vc(){return Te().memoizedState}function lw(e,n,t){var r=gn(e);if(t={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null},qc(e))Qc(n,t);else if(t=Cc(e,n,t,r),t!==null){var a=ce();Ae(t,e,r,a),Yc(t,n,r)}}function cw(e,n,t){var r=gn(e),a={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null};if(qc(e))Qc(n,a);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=n.lastRenderedReducer,o!==null))try{var i=n.lastRenderedState,s=o(i,t);if(a.hasEagerState=!0,a.eagerState=s,Oe(s,i)){var l=n.interleaved;l===null?(a.next=a,$i(n)):(a.next=l.next,l.next=a),n.interleaved=a;return}}catch{}finally{}t=Cc(e,n,a,r),t!==null&&(a=ce(),Ae(t,e,r,a),Yc(t,n,r))}}function qc(e){var n=e.alternate;return e===U||n!==null&&n===U}function Qc(e,n){zt=oa=!0;var t=e.pending;t===null?n.next=n:(n.next=t.next,t.next=n),e.pending=n}function Yc(e,n,t){if(t&4194240){var r=n.lanes;r&=e.pendingLanes,t|=r,n.lanes=t,ui(e,t)}}var ia={readContext:je,useCallback:ae,useContext:ae,useEffect:ae,useImperativeHandle:ae,useInsertionEffect:ae,useLayoutEffect:ae,useMemo:ae,useReducer:ae,useRef:ae,useState:ae,useDebugValue:ae,useDeferredValue:ae,useTransition:ae,useMutableSource:ae,useSyncExternalStore:ae,useId:ae,unstable_isNewReconciler:!1},dw={readContext:je,useCallback:function(e,n){return Le().memoizedState=[e,n===void 0?null:n],e},useContext:je,useEffect:Ls,useImperativeHandle:function(e,n,t){return t=t!=null?t.concat([e]):null,Dr(4194308,4,Rc.bind(null,n,e),t)},useLayoutEffect:function(e,n){return Dr(4194308,4,e,n)},useInsertionEffect:function(e,n){return Dr(4,2,e,n)},useMemo:function(e,n){var t=Le();return n=n===void 0?null:n,e=e(),t.memoizedState=[e,n],e},useReducer:function(e,n,t){var r=Le();return n=t!==void 0?t(n):n,r.memoizedState=r.baseState=n,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:n},r.queue=e,e=e.dispatch=lw.bind(null,U,e),[r.memoizedState,e]},useRef:function(e){var n=Le();return e={current:e},n.memoizedState=e},useState:Bs,useDebugValue:zi,useDeferredValue:function(e){return Le().memoizedState=e},useTransition:function(){var e=Bs(!1),n=e[0];return e=sw.bind(null,e[1]),Le().memoizedState=e,[n,e]},useMutableSource:function(){},useSyncExternalStore:function(e,n,t){var r=U,a=Le();if(R){if(t===void 0)throw Error(x(407));t=t()}else{if(t=n(),Z===null)throw Error(x(349));Mn&30||Nc(r,n,t)}a.memoizedState=t;var o={value:t,getSnapshot:n};return a.queue=o,Ls(Ic.bind(null,r,o,e),[e]),r.flags|=2048,Zt(9,zc.bind(null,r,o,t,n),void 0,null),t},useId:function(){var e=Le(),n=Z.identifierPrefix;if(R){var t=qe,r=Ve;t=(r&~(1<<32-De(r)-1)).toString(32)+t,n=":"+n+"R"+t,t=Jt++,0<t&&(n+="H"+t.toString(32)),n+=":"}else t=iw++,n=":"+n+"r"+t.toString(32)+":";return e.memoizedState=n},unstable_isNewReconciler:!1},uw={readContext:je,useCallback:Uc,useContext:je,useEffect:Ni,useImperativeHandle:Wc,useInsertionEffect:Bc,useLayoutEffect:Lc,useMemo:Gc,useReducer:Xa,useRef:Oc,useState:function(){return Xa(Xt)},useDebugValue:zi,useDeferredValue:function(e){var n=Te();return Hc(n,Y.memoizedState,e)},useTransition:function(){var e=Xa(Xt)[0],n=Te().memoizedState;return[e,n]},useMutableSource:Pc,useSyncExternalStore:Mc,useId:Vc,unstable_isNewReconciler:!1},pw={readContext:je,useCallback:Uc,useContext:je,useEffect:Ni,useImperativeHandle:Wc,useInsertionEffect:Bc,useLayoutEffect:Lc,useMemo:Gc,useReducer:Za,useRef:Oc,useState:function(){return Za(Xt)},useDebugValue:zi,useDeferredValue:function(e){var n=Te();return Y===null?n.memoizedState=e:Hc(n,Y.memoizedState,e)},useTransition:function(){var e=Za(Xt)[0],n=Te().memoizedState;return[e,n]},useMutableSource:Pc,useSyncExternalStore:Mc,useId:Vc,unstable_isNewReconciler:!1};function Ne(e,n){if(e&&e.defaultProps){n=G({},n),e=e.defaultProps;for(var t in e)n[t]===void 0&&(n[t]=e[t]);return n}return n}function Do(e,n,t,r){n=e.memoizedState,t=t(r,n),t=t==null?n:G({},n,t),e.memoizedState=t,e.lanes===0&&(e.updateQueue.baseState=t)}var ka={isMounted:function(e){return(e=e._reactInternals)?Dn(e)===e:!1},enqueueSetState:function(e,n,t){e=e._reactInternals;var r=ce(),a=gn(e),o=Qe(r,a);o.payload=n,t!=null&&(o.callback=t),n=pn(e,o,a),n!==null&&(Ae(n,e,a,r),zr(n,e,a))},enqueueReplaceState:function(e,n,t){e=e._reactInternals;var r=ce(),a=gn(e),o=Qe(r,a);o.tag=1,o.payload=n,t!=null&&(o.callback=t),n=pn(e,o,a),n!==null&&(Ae(n,e,a,r),zr(n,e,a))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var t=ce(),r=gn(e),a=Qe(t,r);a.tag=2,n!=null&&(a.callback=n),n=pn(e,a,r),n!==null&&(Ae(n,e,r,t),zr(n,e,r))}};function Rs(e,n,t,r,a,o,i){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,o,i):n.prototype&&n.prototype.isPureReactComponent?!Ht(t,r)||!Ht(a,o):!0}function Kc(e,n,t){var r=!1,a=bn,o=n.contextType;return typeof o=="object"&&o!==null?o=je(o):(a=me(n)?Tn:se.current,r=n.contextTypes,o=(r=r!=null)?rt(e,a):bn),n=new n(t,o),e.memoizedState=n.state!==null&&n.state!==void 0?n.state:null,n.updater=ka,e.stateNode=n,n._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=a,e.__reactInternalMemoizedMaskedChildContext=o),n}function Ws(e,n,t,r){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(t,r),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(t,r),n.state!==e&&ka.enqueueReplaceState(n,n.state,null)}function Ao(e,n,t,r){var a=e.stateNode;a.props=t,a.state=e.memoizedState,a.refs={},Fi(e);var o=n.contextType;typeof o=="object"&&o!==null?a.context=je(o):(o=me(n)?Tn:se.current,a.context=rt(e,o)),a.state=e.memoizedState,o=n.getDerivedStateFromProps,typeof o=="function"&&(Do(e,n,o,t),a.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof a.getSnapshotBeforeUpdate=="function"||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(n=a.state,typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount(),n!==a.state&&ka.enqueueReplaceState(a,a.state,null),ra(e,t,a,r),a.state=e.memoizedState),typeof a.componentDidMount=="function"&&(e.flags|=4194308)}function st(e,n){try{var t="",r=n;do t+=L2(r),r=r.return;while(r);var a=t}catch(o){a=`
Error generating stack: `+o.message+`
`+o.stack}return{value:e,source:n,stack:a,digest:null}}function eo(e,n,t){return{value:e,source:null,stack:t??null,digest:n??null}}function Oo(e,n){try{console.error(n.value)}catch(t){setTimeout(function(){throw t})}}var fw=typeof WeakMap=="function"?WeakMap:Map;function Jc(e,n,t){t=Qe(-1,t),t.tag=3,t.payload={element:null};var r=n.value;return t.callback=function(){la||(la=!0,Qo=r),Oo(e,n)},t}function Xc(e,n,t){t=Qe(-1,t),t.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var a=n.value;t.payload=function(){return r(a)},t.callback=function(){Oo(e,n)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(t.callback=function(){Oo(e,n),typeof r!="function"&&(fn===null?fn=new Set([this]):fn.add(this));var i=n.stack;this.componentDidCatch(n.value,{componentStack:i!==null?i:""})}),t}function Us(e,n,t){var r=e.pingCache;if(r===null){r=e.pingCache=new fw;var a=new Set;r.set(n,a)}else a=r.get(n),a===void 0&&(a=new Set,r.set(n,a));a.has(t)||(a.add(t),e=Ew.bind(null,e,n,t),n.then(e,e))}function Gs(e){do{var n;if((n=e.tag===13)&&(n=e.memoizedState,n=n!==null?n.dehydrated!==null:!0),n)return e;e=e.return}while(e!==null);return null}function Hs(e,n,t,r,a){return e.mode&1?(e.flags|=65536,e.lanes=a,e):(e===n?e.flags|=65536:(e.flags|=128,t.flags|=131072,t.flags&=-52805,t.tag===1&&(t.alternate===null?t.tag=17:(n=Qe(-1,1),n.tag=2,pn(t,n,1))),t.lanes|=1),e)}var gw=Ze.ReactCurrentOwner,ge=!1;function le(e,n,t,r){n.child=e===null?Ec(n,null,t,r):ot(n,e.child,t,r)}function Vs(e,n,t,r,a){t=t.render;var o=n.ref;return et(n,a),r=Pi(e,n,t,r,o,a),t=Mi(),e!==null&&!ge?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~a,Xe(e,n,a)):(R&&t&&yi(n),n.flags|=1,le(e,n,r,a),n.child)}function qs(e,n,t,r,a){if(e===null){var o=t.type;return typeof o=="function"&&!Wi(o)&&o.defaultProps===void 0&&t.compare===null&&t.defaultProps===void 0?(n.tag=15,n.type=o,Zc(e,n,o,r,a)):(e=Lr(t.type,null,r,n,n.mode,a),e.ref=n.ref,e.return=n,n.child=e)}if(o=e.child,!(e.lanes&a)){var i=o.memoizedProps;if(t=t.compare,t=t!==null?t:Ht,t(i,r)&&e.ref===n.ref)return Xe(e,n,a)}return n.flags|=1,e=hn(o,r),e.ref=n.ref,e.return=n,n.child=e}function Zc(e,n,t,r,a){if(e!==null){var o=e.memoizedProps;if(Ht(o,r)&&e.ref===n.ref)if(ge=!1,n.pendingProps=r=o,(e.lanes&a)!==0)e.flags&131072&&(ge=!0);else return n.lanes=e.lanes,Xe(e,n,a)}return Bo(e,n,t,r,a)}function ed(e,n,t){var r=n.pendingProps,a=r.children,o=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(n.mode&1))n.memoizedState={baseLanes:0,cachePool:null,transitions:null},O(Yn,ye),ye|=t;else{if(!(t&1073741824))return e=o!==null?o.baseLanes|t:t,n.lanes=n.childLanes=1073741824,n.memoizedState={baseLanes:e,cachePool:null,transitions:null},n.updateQueue=null,O(Yn,ye),ye|=e,null;n.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=o!==null?o.baseLanes:t,O(Yn,ye),ye|=r}else o!==null?(r=o.baseLanes|t,n.memoizedState=null):r=t,O(Yn,ye),ye|=r;return le(e,n,a,t),n.child}function nd(e,n){var t=n.ref;(e===null&&t!==null||e!==null&&e.ref!==t)&&(n.flags|=512,n.flags|=2097152)}function Bo(e,n,t,r,a){var o=me(t)?Tn:se.current;return o=rt(n,o),et(n,a),t=Pi(e,n,t,r,o,a),r=Mi(),e!==null&&!ge?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~a,Xe(e,n,a)):(R&&r&&yi(n),n.flags|=1,le(e,n,t,a),n.child)}function Qs(e,n,t,r,a){if(me(t)){var o=!0;Xr(n)}else o=!1;if(et(n,a),n.stateNode===null)Ar(e,n),Kc(n,t,r),Ao(n,t,r,a),r=!0;else if(e===null){var i=n.stateNode,s=n.memoizedProps;i.props=s;var l=i.context,c=t.contextType;typeof c=="object"&&c!==null?c=je(c):(c=me(t)?Tn:se.current,c=rt(n,c));var p=t.getDerivedStateFromProps,g=typeof p=="function"||typeof i.getSnapshotBeforeUpdate=="function";g||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(s!==r||l!==c)&&Ws(n,i,r,c),tn=!1;var m=n.memoizedState;i.state=m,ra(n,r,i,a),l=n.memoizedState,s!==r||m!==l||he.current||tn?(typeof p=="function"&&(Do(n,t,p,r),l=n.memoizedState),(s=tn||Rs(n,t,s,r,m,l,c))?(g||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(n.flags|=4194308)):(typeof i.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=r,n.memoizedState=l),i.props=r,i.state=l,i.context=c,r=s):(typeof i.componentDidMount=="function"&&(n.flags|=4194308),r=!1)}else{i=n.stateNode,jc(e,n),s=n.memoizedProps,c=n.type===n.elementType?s:Ne(n.type,s),i.props=c,g=n.pendingProps,m=i.context,l=t.contextType,typeof l=="object"&&l!==null?l=je(l):(l=me(t)?Tn:se.current,l=rt(n,l));var b=t.getDerivedStateFromProps;(p=typeof b=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(s!==g||m!==l)&&Ws(n,i,r,l),tn=!1,m=n.memoizedState,i.state=m,ra(n,r,i,a);var w=n.memoizedState;s!==g||m!==w||he.current||tn?(typeof b=="function"&&(Do(n,t,b,r),w=n.memoizedState),(c=tn||Rs(n,t,c,r,m,w,l)||!1)?(p||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(r,w,l),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(r,w,l)),typeof i.componentDidUpdate=="function"&&(n.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof i.componentDidUpdate!="function"||s===e.memoizedProps&&m===e.memoizedState||(n.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&m===e.memoizedState||(n.flags|=1024),n.memoizedProps=r,n.memoizedState=w),i.props=r,i.state=w,i.context=l,r=c):(typeof i.componentDidUpdate!="function"||s===e.memoizedProps&&m===e.memoizedState||(n.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&m===e.memoizedState||(n.flags|=1024),r=!1)}return Lo(e,n,t,r,o,a)}function Lo(e,n,t,r,a,o){nd(e,n);var i=(n.flags&128)!==0;if(!r&&!i)return a&&Ns(n,t,!1),Xe(e,n,o);r=n.stateNode,gw.current=n;var s=i&&typeof t.getDerivedStateFromError!="function"?null:r.render();return n.flags|=1,e!==null&&i?(n.child=ot(n,e.child,null,o),n.child=ot(n,null,s,o)):le(e,n,s,o),n.memoizedState=r.state,a&&Ns(n,t,!0),n.child}function td(e){var n=e.stateNode;n.pendingContext?Ms(e,n.pendingContext,n.pendingContext!==n.context):n.context&&Ms(e,n.context,!1),Ei(e,n.containerInfo)}function Ys(e,n,t,r,a){return at(),ki(a),n.flags|=256,le(e,n,t,r),n.child}var Ro={dehydrated:null,treeContext:null,retryLane:0};function Wo(e){return{baseLanes:e,cachePool:null,transitions:null}}function rd(e,n,t){var r=n.pendingProps,a=W.current,o=!1,i=(n.flags&128)!==0,s;if((s=i)||(s=e!==null&&e.memoizedState===null?!1:(a&2)!==0),s?(o=!0,n.flags&=-129):(e===null||e.memoizedState!==null)&&(a|=1),O(W,a&1),e===null)return zo(n),e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(n.mode&1?e.data==="$!"?n.lanes=8:n.lanes=1073741824:n.lanes=1,null):(i=r.children,e=r.fallback,o?(r=n.mode,o=n.child,i={mode:"hidden",children:i},!(r&1)&&o!==null?(o.childLanes=0,o.pendingProps=i):o=Sa(i,r,0,null),e=jn(e,r,t,null),o.return=n,e.return=n,o.sibling=e,n.child=o,n.child.memoizedState=Wo(t),n.memoizedState=Ro,e):Ii(n,i));if(a=e.memoizedState,a!==null&&(s=a.dehydrated,s!==null))return hw(e,n,i,r,s,a,t);if(o){o=r.fallback,i=n.mode,a=e.child,s=a.sibling;var l={mode:"hidden",children:r.children};return!(i&1)&&n.child!==a?(r=n.child,r.childLanes=0,r.pendingProps=l,n.deletions=null):(r=hn(a,l),r.subtreeFlags=a.subtreeFlags&14680064),s!==null?o=hn(s,o):(o=jn(o,i,t,null),o.flags|=2),o.return=n,r.return=n,r.sibling=o,n.child=r,r=o,o=n.child,i=e.child.memoizedState,i=i===null?Wo(t):{baseLanes:i.baseLanes|t,cachePool:null,transitions:i.transitions},o.memoizedState=i,o.childLanes=e.childLanes&~t,n.memoizedState=Ro,r}return o=e.child,e=o.sibling,r=hn(o,{mode:"visible",children:r.children}),!(n.mode&1)&&(r.lanes=t),r.return=n,r.sibling=null,e!==null&&(t=n.deletions,t===null?(n.deletions=[e],n.flags|=16):t.push(e)),n.child=r,n.memoizedState=null,r}function Ii(e,n){return n=Sa({mode:"visible",children:n},e.mode,0,null),n.return=e,e.child=n}function _r(e,n,t,r){return r!==null&&ki(r),ot(n,e.child,null,t),e=Ii(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function hw(e,n,t,r,a,o,i){if(t)return n.flags&256?(n.flags&=-257,r=eo(Error(x(422))),_r(e,n,i,r)):n.memoizedState!==null?(n.child=e.child,n.flags|=128,null):(o=r.fallback,a=n.mode,r=Sa({mode:"visible",children:r.children},a,0,null),o=jn(o,a,i,null),o.flags|=2,r.return=n,o.return=n,r.sibling=o,n.child=r,n.mode&1&&ot(n,e.child,null,i),n.child.memoizedState=Wo(i),n.memoizedState=Ro,o);if(!(n.mode&1))return _r(e,n,i,null);if(a.data==="$!"){if(r=a.nextSibling&&a.nextSibling.dataset,r)var s=r.dgst;return r=s,o=Error(x(419)),r=eo(o,r,void 0),_r(e,n,i,r)}if(s=(i&e.childLanes)!==0,ge||s){if(r=Z,r!==null){switch(i&-i){case 4:a=2;break;case 16:a=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:a=32;break;case 536870912:a=268435456;break;default:a=0}a=a&(r.suspendedLanes|i)?0:a,a!==0&&a!==o.retryLane&&(o.retryLane=a,Je(e,a),Ae(r,e,a,-1))}return Ri(),r=eo(Error(x(421))),_r(e,n,i,r)}return a.data==="$?"?(n.flags|=128,n.child=e.child,n=Cw.bind(null,e),a._reactRetry=n,null):(e=o.treeContext,xe=un(a.nextSibling),ke=n,R=!0,Ie=null,e!==null&&($e[Fe++]=Ve,$e[Fe++]=qe,$e[Fe++]=Pn,Ve=e.id,qe=e.overflow,Pn=n),n=Ii(n,r.children),n.flags|=4096,n)}function Ks(e,n,t){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n),Io(e.return,n,t)}function no(e,n,t,r,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:r,tail:t,tailMode:a}:(o.isBackwards=n,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=t,o.tailMode=a)}function ad(e,n,t){var r=n.pendingProps,a=r.revealOrder,o=r.tail;if(le(e,n,r.children,t),r=W.current,r&2)r=r&1|2,n.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Ks(e,t,n);else if(e.tag===19)Ks(e,t,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break e;for(;e.sibling===null;){if(e.return===null||e.return===n)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(O(W,r),!(n.mode&1))n.memoizedState=null;else switch(a){case"forwards":for(t=n.child,a=null;t!==null;)e=t.alternate,e!==null&&aa(e)===null&&(a=t),t=t.sibling;t=a,t===null?(a=n.child,n.child=null):(a=t.sibling,t.sibling=null),no(n,!1,a,t,o);break;case"backwards":for(t=null,a=n.child,n.child=null;a!==null;){if(e=a.alternate,e!==null&&aa(e)===null){n.child=a;break}e=a.sibling,a.sibling=t,t=a,a=e}no(n,!0,t,null,o);break;case"together":no(n,!1,null,null,void 0);break;default:n.memoizedState=null}return n.child}function Ar(e,n){!(n.mode&1)&&e!==null&&(e.alternate=null,n.alternate=null,n.flags|=2)}function Xe(e,n,t){if(e!==null&&(n.dependencies=e.dependencies),Nn|=n.lanes,!(t&n.childLanes))return null;if(e!==null&&n.child!==e.child)throw Error(x(153));if(n.child!==null){for(e=n.child,t=hn(e,e.pendingProps),n.child=t,t.return=n;e.sibling!==null;)e=e.sibling,t=t.sibling=hn(e,e.pendingProps),t.return=n;t.sibling=null}return n.child}function mw(e,n,t){switch(n.tag){case 3:td(n),at();break;case 5:Tc(n);break;case 1:me(n.type)&&Xr(n);break;case 4:Ei(n,n.stateNode.containerInfo);break;case 10:var r=n.type._context,a=n.memoizedProps.value;O(na,r._currentValue),r._currentValue=a;break;case 13:if(r=n.memoizedState,r!==null)return r.dehydrated!==null?(O(W,W.current&1),n.flags|=128,null):t&n.child.childLanes?rd(e,n,t):(O(W,W.current&1),e=Xe(e,n,t),e!==null?e.sibling:null);O(W,W.current&1);break;case 19:if(r=(t&n.childLanes)!==0,e.flags&128){if(r)return ad(e,n,t);n.flags|=128}if(a=n.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),O(W,W.current),r)break;return null;case 22:case 23:return n.lanes=0,ed(e,n,t)}return Xe(e,n,t)}var od,Uo,id,sd;od=function(e,n){for(var t=n.child;t!==null;){if(t.tag===5||t.tag===6)e.appendChild(t.stateNode);else if(t.tag!==4&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break;for(;t.sibling===null;){if(t.return===null||t.return===n)return;t=t.return}t.sibling.return=t.return,t=t.sibling}};Uo=function(){};id=function(e,n,t,r){var a=e.memoizedProps;if(a!==r){e=n.stateNode,En(Ue.current);var o=null;switch(t){case"input":a=uo(e,a),r=uo(e,r),o=[];break;case"select":a=G({},a,{value:void 0}),r=G({},r,{value:void 0}),o=[];break;case"textarea":a=go(e,a),r=go(e,r),o=[];break;default:typeof a.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Kr)}mo(t,r);var i;t=null;for(c in a)if(!r.hasOwnProperty(c)&&a.hasOwnProperty(c)&&a[c]!=null)if(c==="style"){var s=a[c];for(i in s)s.hasOwnProperty(i)&&(t||(t={}),t[i]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Ot.hasOwnProperty(c)?o||(o=[]):(o=o||[]).push(c,null));for(c in r){var l=r[c];if(s=a!=null?a[c]:void 0,r.hasOwnProperty(c)&&l!==s&&(l!=null||s!=null))if(c==="style")if(s){for(i in s)!s.hasOwnProperty(i)||l&&l.hasOwnProperty(i)||(t||(t={}),t[i]="");for(i in l)l.hasOwnProperty(i)&&s[i]!==l[i]&&(t||(t={}),t[i]=l[i])}else t||(o||(o=[]),o.push(c,t)),t=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,s=s?s.__html:void 0,l!=null&&s!==l&&(o=o||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(o=o||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Ot.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&B("scroll",e),o||s===l||(o=[])):(o=o||[]).push(c,l))}t&&(o=o||[]).push("style",t);var c=o;(n.updateQueue=c)&&(n.flags|=4)}};sd=function(e,n,t,r){t!==r&&(n.flags|=4)};function _t(e,n){if(!R)switch(e.tailMode){case"hidden":n=e.tail;for(var t=null;n!==null;)n.alternate!==null&&(t=n),n=n.sibling;t===null?e.tail=null:t.sibling=null;break;case"collapsed":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function oe(e){var n=e.alternate!==null&&e.alternate.child===e.child,t=0,r=0;if(n)for(var a=e.child;a!==null;)t|=a.lanes|a.childLanes,r|=a.subtreeFlags&14680064,r|=a.flags&14680064,a.return=e,a=a.sibling;else for(a=e.child;a!==null;)t|=a.lanes|a.childLanes,r|=a.subtreeFlags,r|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=r,e.childLanes=t,n}function bw(e,n,t){var r=n.pendingProps;switch(xi(n),n.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return oe(n),null;case 1:return me(n.type)&&Jr(),oe(n),null;case 3:return r=n.stateNode,it(),L(he),L(se),ji(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(kr(n)?n.flags|=4:e===null||e.memoizedState.isDehydrated&&!(n.flags&256)||(n.flags|=1024,Ie!==null&&(Jo(Ie),Ie=null))),Uo(e,n),oe(n),null;case 5:Ci(n);var a=En(Kt.current);if(t=n.type,e!==null&&n.stateNode!=null)id(e,n,t,r,a),e.ref!==n.ref&&(n.flags|=512,n.flags|=2097152);else{if(!r){if(n.stateNode===null)throw Error(x(166));return oe(n),null}if(e=En(Ue.current),kr(n)){r=n.stateNode,t=n.type;var o=n.memoizedProps;switch(r[Re]=n,r[Qt]=o,e=(n.mode&1)!==0,t){case"dialog":B("cancel",r),B("close",r);break;case"iframe":case"object":case"embed":B("load",r);break;case"video":case"audio":for(a=0;a<Ct.length;a++)B(Ct[a],r);break;case"source":B("error",r);break;case"img":case"image":case"link":B("error",r),B("load",r);break;case"details":B("toggle",r);break;case"input":os(r,o),B("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!o.multiple},B("invalid",r);break;case"textarea":ss(r,o),B("invalid",r)}mo(t,o),a=null;for(var i in o)if(o.hasOwnProperty(i)){var s=o[i];i==="children"?typeof s=="string"?r.textContent!==s&&(o.suppressHydrationWarning!==!0&&xr(r.textContent,s,e),a=["children",s]):typeof s=="number"&&r.textContent!==""+s&&(o.suppressHydrationWarning!==!0&&xr(r.textContent,s,e),a=["children",""+s]):Ot.hasOwnProperty(i)&&s!=null&&i==="onScroll"&&B("scroll",r)}switch(t){case"input":pr(r),is(r,o,!0);break;case"textarea":pr(r),ls(r);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(r.onclick=Kr)}r=a,n.updateQueue=r,r!==null&&(n.flags|=4)}else{i=a.nodeType===9?a:a.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Il(t)),e==="http://www.w3.org/1999/xhtml"?t==="script"?(e=i.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=i.createElement(t,{is:r.is}):(e=i.createElement(t),t==="select"&&(i=e,r.multiple?i.multiple=!0:r.size&&(i.size=r.size))):e=i.createElementNS(e,t),e[Re]=n,e[Qt]=r,od(e,n,!1,!1),n.stateNode=e;e:{switch(i=bo(t,r),t){case"dialog":B("cancel",e),B("close",e),a=r;break;case"iframe":case"object":case"embed":B("load",e),a=r;break;case"video":case"audio":for(a=0;a<Ct.length;a++)B(Ct[a],e);a=r;break;case"source":B("error",e),a=r;break;case"img":case"image":case"link":B("error",e),B("load",e),a=r;break;case"details":B("toggle",e),a=r;break;case"input":os(e,r),a=uo(e,r),B("invalid",e);break;case"option":a=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},a=G({},r,{value:void 0}),B("invalid",e);break;case"textarea":ss(e,r),a=go(e,r),B("invalid",e);break;default:a=r}mo(t,a),s=a;for(o in s)if(s.hasOwnProperty(o)){var l=s[o];o==="style"?Ol(e,l):o==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&Dl(e,l)):o==="children"?typeof l=="string"?(t!=="textarea"||l!=="")&&Bt(e,l):typeof l=="number"&&Bt(e,""+l):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(Ot.hasOwnProperty(o)?l!=null&&o==="onScroll"&&B("scroll",e):l!=null&&oi(e,o,l,i))}switch(t){case"input":pr(e),is(e,r,!1);break;case"textarea":pr(e),ls(e);break;case"option":r.value!=null&&e.setAttribute("value",""+mn(r.value));break;case"select":e.multiple=!!r.multiple,o=r.value,o!=null?Kn(e,!!r.multiple,o,!1):r.defaultValue!=null&&Kn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof a.onClick=="function"&&(e.onclick=Kr)}switch(t){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(n.flags|=4)}n.ref!==null&&(n.flags|=512,n.flags|=2097152)}return oe(n),null;case 6:if(e&&n.stateNode!=null)sd(e,n,e.memoizedProps,r);else{if(typeof r!="string"&&n.stateNode===null)throw Error(x(166));if(t=En(Kt.current),En(Ue.current),kr(n)){if(r=n.stateNode,t=n.memoizedProps,r[Re]=n,(o=r.nodeValue!==t)&&(e=ke,e!==null))switch(e.tag){case 3:xr(r.nodeValue,t,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&xr(r.nodeValue,t,(e.mode&1)!==0)}o&&(n.flags|=4)}else r=(t.nodeType===9?t:t.ownerDocument).createTextNode(r),r[Re]=n,n.stateNode=r}return oe(n),null;case 13:if(L(W),r=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(R&&xe!==null&&n.mode&1&&!(n.flags&128))$c(),at(),n.flags|=98560,o=!1;else if(o=kr(n),r!==null&&r.dehydrated!==null){if(e===null){if(!o)throw Error(x(318));if(o=n.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(x(317));o[Re]=n}else at(),!(n.flags&128)&&(n.memoizedState=null),n.flags|=4;oe(n),o=!1}else Ie!==null&&(Jo(Ie),Ie=null),o=!0;if(!o)return n.flags&65536?n:null}return n.flags&128?(n.lanes=t,n):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(n.child.flags|=8192,n.mode&1&&(e===null||W.current&1?K===0&&(K=3):Ri())),n.updateQueue!==null&&(n.flags|=4),oe(n),null);case 4:return it(),Uo(e,n),e===null&&Vt(n.stateNode.containerInfo),oe(n),null;case 10:return Si(n.type._context),oe(n),null;case 17:return me(n.type)&&Jr(),oe(n),null;case 19:if(L(W),o=n.memoizedState,o===null)return oe(n),null;if(r=(n.flags&128)!==0,i=o.rendering,i===null)if(r)_t(o,!1);else{if(K!==0||e!==null&&e.flags&128)for(e=n.child;e!==null;){if(i=aa(e),i!==null){for(n.flags|=128,_t(o,!1),r=i.updateQueue,r!==null&&(n.updateQueue=r,n.flags|=4),n.subtreeFlags=0,r=t,t=n.child;t!==null;)o=t,e=r,o.flags&=14680066,i=o.alternate,i===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=i.childLanes,o.lanes=i.lanes,o.child=i.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=i.memoizedProps,o.memoizedState=i.memoizedState,o.updateQueue=i.updateQueue,o.type=i.type,e=i.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t=t.sibling;return O(W,W.current&1|2),n.child}e=e.sibling}o.tail!==null&&q()>lt&&(n.flags|=128,r=!0,_t(o,!1),n.lanes=4194304)}else{if(!r)if(e=aa(i),e!==null){if(n.flags|=128,r=!0,t=e.updateQueue,t!==null&&(n.updateQueue=t,n.flags|=4),_t(o,!0),o.tail===null&&o.tailMode==="hidden"&&!i.alternate&&!R)return oe(n),null}else 2*q()-o.renderingStartTime>lt&&t!==1073741824&&(n.flags|=128,r=!0,_t(o,!1),n.lanes=4194304);o.isBackwards?(i.sibling=n.child,n.child=i):(t=o.last,t!==null?t.sibling=i:n.child=i,o.last=i)}return o.tail!==null?(n=o.tail,o.rendering=n,o.tail=n.sibling,o.renderingStartTime=q(),n.sibling=null,t=W.current,O(W,r?t&1|2:t&1),n):(oe(n),null);case 22:case 23:return Li(),r=n.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(n.flags|=8192),r&&n.mode&1?ye&1073741824&&(oe(n),n.subtreeFlags&6&&(n.flags|=8192)):oe(n),null;case 24:return null;case 25:return null}throw Error(x(156,n.tag))}function vw(e,n){switch(xi(n),n.tag){case 1:return me(n.type)&&Jr(),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return it(),L(he),L(se),ji(),e=n.flags,e&65536&&!(e&128)?(n.flags=e&-65537|128,n):null;case 5:return Ci(n),null;case 13:if(L(W),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(x(340));at()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return L(W),null;case 4:return it(),null;case 10:return Si(n.type._context),null;case 22:case 23:return Li(),null;case 24:return null;default:return null}}var Sr=!1,ie=!1,yw=typeof WeakSet=="function"?WeakSet:Set,F=null;function Qn(e,n){var t=e.ref;if(t!==null)if(typeof t=="function")try{t(null)}catch(r){H(e,n,r)}else t.current=null}function Go(e,n,t){try{t()}catch(r){H(e,n,r)}}var Js=!1;function xw(e,n){if(Eo=qr,e=pc(),vi(e)){if("selectionStart"in e)var t={start:e.selectionStart,end:e.selectionEnd};else e:{t=(t=e.ownerDocument)&&t.defaultView||window;var r=t.getSelection&&t.getSelection();if(r&&r.rangeCount!==0){t=r.anchorNode;var a=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{t.nodeType,o.nodeType}catch{t=null;break e}var i=0,s=-1,l=-1,c=0,p=0,g=e,m=null;n:for(;;){for(var b;g!==t||a!==0&&g.nodeType!==3||(s=i+a),g!==o||r!==0&&g.nodeType!==3||(l=i+r),g.nodeType===3&&(i+=g.nodeValue.length),(b=g.firstChild)!==null;)m=g,g=b;for(;;){if(g===e)break n;if(m===t&&++c===a&&(s=i),m===o&&++p===r&&(l=i),(b=g.nextSibling)!==null)break;g=m,m=g.parentNode}g=b}t=s===-1||l===-1?null:{start:s,end:l}}else t=null}t=t||{start:0,end:0}}else t=null;for(Co={focusedElem:e,selectionRange:t},qr=!1,F=n;F!==null;)if(n=F,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,F=e;else for(;F!==null;){n=F;try{var w=n.alternate;if(n.flags&1024)switch(n.tag){case 0:case 11:case 15:break;case 1:if(w!==null){var y=w.memoizedProps,T=w.memoizedState,f=n.stateNode,u=f.getSnapshotBeforeUpdate(n.elementType===n.type?y:Ne(n.type,y),T);f.__reactInternalSnapshotBeforeUpdate=u}break;case 3:var h=n.stateNode.containerInfo;h.nodeType===1?h.textContent="":h.nodeType===9&&h.documentElement&&h.removeChild(h.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(x(163))}}catch(v){H(n,n.return,v)}if(e=n.sibling,e!==null){e.return=n.return,F=e;break}F=n.return}return w=Js,Js=!1,w}function It(e,n,t){var r=n.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var a=r=r.next;do{if((a.tag&e)===e){var o=a.destroy;a.destroy=void 0,o!==void 0&&Go(n,t,o)}a=a.next}while(a!==r)}}function wa(e,n){if(n=n.updateQueue,n=n!==null?n.lastEffect:null,n!==null){var t=n=n.next;do{if((t.tag&e)===e){var r=t.create;t.destroy=r()}t=t.next}while(t!==n)}}function Ho(e){var n=e.ref;if(n!==null){var t=e.stateNode;switch(e.tag){case 5:e=t;break;default:e=t}typeof n=="function"?n(e):n.current=e}}function ld(e){var n=e.alternate;n!==null&&(e.alternate=null,ld(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&(delete n[Re],delete n[Qt],delete n[Po],delete n[tw],delete n[rw])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function cd(e){return e.tag===5||e.tag===3||e.tag===4}function Xs(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||cd(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Vo(e,n,t){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?t.nodeType===8?t.parentNode.insertBefore(e,n):t.insertBefore(e,n):(t.nodeType===8?(n=t.parentNode,n.insertBefore(e,t)):(n=t,n.appendChild(e)),t=t._reactRootContainer,t!=null||n.onclick!==null||(n.onclick=Kr));else if(r!==4&&(e=e.child,e!==null))for(Vo(e,n,t),e=e.sibling;e!==null;)Vo(e,n,t),e=e.sibling}function qo(e,n,t){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?t.insertBefore(e,n):t.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(qo(e,n,t),e=e.sibling;e!==null;)qo(e,n,t),e=e.sibling}var ne=null,ze=!1;function en(e,n,t){for(t=t.child;t!==null;)dd(e,n,t),t=t.sibling}function dd(e,n,t){if(We&&typeof We.onCommitFiberUnmount=="function")try{We.onCommitFiberUnmount(ga,t)}catch{}switch(t.tag){case 5:ie||Qn(t,n);case 6:var r=ne,a=ze;ne=null,en(e,n,t),ne=r,ze=a,ne!==null&&(ze?(e=ne,t=t.stateNode,e.nodeType===8?e.parentNode.removeChild(t):e.removeChild(t)):ne.removeChild(t.stateNode));break;case 18:ne!==null&&(ze?(e=ne,t=t.stateNode,e.nodeType===8?Qa(e.parentNode,t):e.nodeType===1&&Qa(e,t),Ut(e)):Qa(ne,t.stateNode));break;case 4:r=ne,a=ze,ne=t.stateNode.containerInfo,ze=!0,en(e,n,t),ne=r,ze=a;break;case 0:case 11:case 14:case 15:if(!ie&&(r=t.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){a=r=r.next;do{var o=a,i=o.destroy;o=o.tag,i!==void 0&&(o&2||o&4)&&Go(t,n,i),a=a.next}while(a!==r)}en(e,n,t);break;case 1:if(!ie&&(Qn(t,n),r=t.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=t.memoizedProps,r.state=t.memoizedState,r.componentWillUnmount()}catch(s){H(t,n,s)}en(e,n,t);break;case 21:en(e,n,t);break;case 22:t.mode&1?(ie=(r=ie)||t.memoizedState!==null,en(e,n,t),ie=r):en(e,n,t);break;default:en(e,n,t)}}function Zs(e){var n=e.updateQueue;if(n!==null){e.updateQueue=null;var t=e.stateNode;t===null&&(t=e.stateNode=new yw),n.forEach(function(r){var a=jw.bind(null,e,r);t.has(r)||(t.add(r),r.then(a,a))})}}function Pe(e,n){var t=n.deletions;if(t!==null)for(var r=0;r<t.length;r++){var a=t[r];try{var o=e,i=n,s=i;e:for(;s!==null;){switch(s.tag){case 5:ne=s.stateNode,ze=!1;break e;case 3:ne=s.stateNode.containerInfo,ze=!0;break e;case 4:ne=s.stateNode.containerInfo,ze=!0;break e}s=s.return}if(ne===null)throw Error(x(160));dd(o,i,a),ne=null,ze=!1;var l=a.alternate;l!==null&&(l.return=null),a.return=null}catch(c){H(a,n,c)}}if(n.subtreeFlags&12854)for(n=n.child;n!==null;)ud(n,e),n=n.sibling}function ud(e,n){var t=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Pe(n,e),Be(e),r&4){try{It(3,e,e.return),wa(3,e)}catch(y){H(e,e.return,y)}try{It(5,e,e.return)}catch(y){H(e,e.return,y)}}break;case 1:Pe(n,e),Be(e),r&512&&t!==null&&Qn(t,t.return);break;case 5:if(Pe(n,e),Be(e),r&512&&t!==null&&Qn(t,t.return),e.flags&32){var a=e.stateNode;try{Bt(a,"")}catch(y){H(e,e.return,y)}}if(r&4&&(a=e.stateNode,a!=null)){var o=e.memoizedProps,i=t!==null?t.memoizedProps:o,s=e.type,l=e.updateQueue;if(e.updateQueue=null,l!==null)try{s==="input"&&o.type==="radio"&&o.name!=null&&Nl(a,o),bo(s,i);var c=bo(s,o);for(i=0;i<l.length;i+=2){var p=l[i],g=l[i+1];p==="style"?Ol(a,g):p==="dangerouslySetInnerHTML"?Dl(a,g):p==="children"?Bt(a,g):oi(a,p,g,c)}switch(s){case"input":po(a,o);break;case"textarea":zl(a,o);break;case"select":var m=a._wrapperState.wasMultiple;a._wrapperState.wasMultiple=!!o.multiple;var b=o.value;b!=null?Kn(a,!!o.multiple,b,!1):m!==!!o.multiple&&(o.defaultValue!=null?Kn(a,!!o.multiple,o.defaultValue,!0):Kn(a,!!o.multiple,o.multiple?[]:"",!1))}a[Qt]=o}catch(y){H(e,e.return,y)}}break;case 6:if(Pe(n,e),Be(e),r&4){if(e.stateNode===null)throw Error(x(162));a=e.stateNode,o=e.memoizedProps;try{a.nodeValue=o}catch(y){H(e,e.return,y)}}break;case 3:if(Pe(n,e),Be(e),r&4&&t!==null&&t.memoizedState.isDehydrated)try{Ut(n.containerInfo)}catch(y){H(e,e.return,y)}break;case 4:Pe(n,e),Be(e);break;case 13:Pe(n,e),Be(e),a=e.child,a.flags&8192&&(o=a.memoizedState!==null,a.stateNode.isHidden=o,!o||a.alternate!==null&&a.alternate.memoizedState!==null||(Oi=q())),r&4&&Zs(e);break;case 22:if(p=t!==null&&t.memoizedState!==null,e.mode&1?(ie=(c=ie)||p,Pe(n,e),ie=c):Pe(n,e),Be(e),r&8192){if(c=e.memoizedState!==null,(e.stateNode.isHidden=c)&&!p&&e.mode&1)for(F=e,p=e.child;p!==null;){for(g=F=p;F!==null;){switch(m=F,b=m.child,m.tag){case 0:case 11:case 14:case 15:It(4,m,m.return);break;case 1:Qn(m,m.return);var w=m.stateNode;if(typeof w.componentWillUnmount=="function"){r=m,t=m.return;try{n=r,w.props=n.memoizedProps,w.state=n.memoizedState,w.componentWillUnmount()}catch(y){H(r,t,y)}}break;case 5:Qn(m,m.return);break;case 22:if(m.memoizedState!==null){nl(g);continue}}b!==null?(b.return=m,F=b):nl(g)}p=p.sibling}e:for(p=null,g=e;;){if(g.tag===5){if(p===null){p=g;try{a=g.stateNode,c?(o=a.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(s=g.stateNode,l=g.memoizedProps.style,i=l!=null&&l.hasOwnProperty("display")?l.display:null,s.style.display=Al("display",i))}catch(y){H(e,e.return,y)}}}else if(g.tag===6){if(p===null)try{g.stateNode.nodeValue=c?"":g.memoizedProps}catch(y){H(e,e.return,y)}}else if((g.tag!==22&&g.tag!==23||g.memoizedState===null||g===e)&&g.child!==null){g.child.return=g,g=g.child;continue}if(g===e)break e;for(;g.sibling===null;){if(g.return===null||g.return===e)break e;p===g&&(p=null),g=g.return}p===g&&(p=null),g.sibling.return=g.return,g=g.sibling}}break;case 19:Pe(n,e),Be(e),r&4&&Zs(e);break;case 21:break;default:Pe(n,e),Be(e)}}function Be(e){var n=e.flags;if(n&2){try{e:{for(var t=e.return;t!==null;){if(cd(t)){var r=t;break e}t=t.return}throw Error(x(160))}switch(r.tag){case 5:var a=r.stateNode;r.flags&32&&(Bt(a,""),r.flags&=-33);var o=Xs(e);qo(e,o,a);break;case 3:case 4:var i=r.stateNode.containerInfo,s=Xs(e);Vo(e,s,i);break;default:throw Error(x(161))}}catch(l){H(e,e.return,l)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function kw(e,n,t){F=e,pd(e)}function pd(e,n,t){for(var r=(e.mode&1)!==0;F!==null;){var a=F,o=a.child;if(a.tag===22&&r){var i=a.memoizedState!==null||Sr;if(!i){var s=a.alternate,l=s!==null&&s.memoizedState!==null||ie;s=Sr;var c=ie;if(Sr=i,(ie=l)&&!c)for(F=a;F!==null;)i=F,l=i.child,i.tag===22&&i.memoizedState!==null?tl(a):l!==null?(l.return=i,F=l):tl(a);for(;o!==null;)F=o,pd(o),o=o.sibling;F=a,Sr=s,ie=c}el(e)}else a.subtreeFlags&8772&&o!==null?(o.return=a,F=o):el(e)}}function el(e){for(;F!==null;){var n=F;if(n.flags&8772){var t=n.alternate;try{if(n.flags&8772)switch(n.tag){case 0:case 11:case 15:ie||wa(5,n);break;case 1:var r=n.stateNode;if(n.flags&4&&!ie)if(t===null)r.componentDidMount();else{var a=n.elementType===n.type?t.memoizedProps:Ne(n.type,t.memoizedProps);r.componentDidUpdate(a,t.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var o=n.updateQueue;o!==null&&Os(n,o,r);break;case 3:var i=n.updateQueue;if(i!==null){if(t=null,n.child!==null)switch(n.child.tag){case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}Os(n,i,t)}break;case 5:var s=n.stateNode;if(t===null&&n.flags&4){t=s;var l=n.memoizedProps;switch(n.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&t.focus();break;case"img":l.src&&(t.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(n.memoizedState===null){var c=n.alternate;if(c!==null){var p=c.memoizedState;if(p!==null){var g=p.dehydrated;g!==null&&Ut(g)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(x(163))}ie||n.flags&512&&Ho(n)}catch(m){H(n,n.return,m)}}if(n===e){F=null;break}if(t=n.sibling,t!==null){t.return=n.return,F=t;break}F=n.return}}function nl(e){for(;F!==null;){var n=F;if(n===e){F=null;break}var t=n.sibling;if(t!==null){t.return=n.return,F=t;break}F=n.return}}function tl(e){for(;F!==null;){var n=F;try{switch(n.tag){case 0:case 11:case 15:var t=n.return;try{wa(4,n)}catch(l){H(n,t,l)}break;case 1:var r=n.stateNode;if(typeof r.componentDidMount=="function"){var a=n.return;try{r.componentDidMount()}catch(l){H(n,a,l)}}var o=n.return;try{Ho(n)}catch(l){H(n,o,l)}break;case 5:var i=n.return;try{Ho(n)}catch(l){H(n,i,l)}}}catch(l){H(n,n.return,l)}if(n===e){F=null;break}var s=n.sibling;if(s!==null){s.return=n.return,F=s;break}F=n.return}}var ww=Math.ceil,sa=Ze.ReactCurrentDispatcher,Di=Ze.ReactCurrentOwner,Ce=Ze.ReactCurrentBatchConfig,I=0,Z=null,Q=null,te=0,ye=0,Yn=yn(0),K=0,er=null,Nn=0,_a=0,Ai=0,Dt=null,fe=null,Oi=0,lt=1/0,Ge=null,la=!1,Qo=null,fn=null,$r=!1,sn=null,ca=0,At=0,Yo=null,Or=-1,Br=0;function ce(){return I&6?q():Or!==-1?Or:Or=q()}function gn(e){return e.mode&1?I&2&&te!==0?te&-te:ow.transition!==null?(Br===0&&(Br=Kl()),Br):(e=D,e!==0||(e=window.event,e=e===void 0?16:rc(e.type)),e):1}function Ae(e,n,t,r){if(50<At)throw At=0,Yo=null,Error(x(185));rr(e,t,r),(!(I&2)||e!==Z)&&(e===Z&&(!(I&2)&&(_a|=t),K===4&&an(e,te)),be(e,r),t===1&&I===0&&!(n.mode&1)&&(lt=q()+500,ya&&xn()))}function be(e,n){var t=e.callbackNode;ok(e,n);var r=Vr(e,e===Z?te:0);if(r===0)t!==null&&us(t),e.callbackNode=null,e.callbackPriority=0;else if(n=r&-r,e.callbackPriority!==n){if(t!=null&&us(t),n===1)e.tag===0?aw(rl.bind(null,e)):wc(rl.bind(null,e)),ew(function(){!(I&6)&&xn()}),t=null;else{switch(Jl(r)){case 1:t=di;break;case 4:t=Ql;break;case 16:t=Hr;break;case 536870912:t=Yl;break;default:t=Hr}t=xd(t,fd.bind(null,e))}e.callbackPriority=n,e.callbackNode=t}}function fd(e,n){if(Or=-1,Br=0,I&6)throw Error(x(327));var t=e.callbackNode;if(nt()&&e.callbackNode!==t)return null;var r=Vr(e,e===Z?te:0);if(r===0)return null;if(r&30||r&e.expiredLanes||n)n=da(e,r);else{n=r;var a=I;I|=2;var o=hd();(Z!==e||te!==n)&&(Ge=null,lt=q()+500,Cn(e,n));do try{$w();break}catch(s){gd(e,s)}while(!0);_i(),sa.current=o,I=a,Q!==null?n=0:(Z=null,te=0,n=K)}if(n!==0){if(n===2&&(a=wo(e),a!==0&&(r=a,n=Ko(e,a))),n===1)throw t=er,Cn(e,0),an(e,r),be(e,q()),t;if(n===6)an(e,r);else{if(a=e.current.alternate,!(r&30)&&!_w(a)&&(n=da(e,r),n===2&&(o=wo(e),o!==0&&(r=o,n=Ko(e,o))),n===1))throw t=er,Cn(e,0),an(e,r),be(e,q()),t;switch(e.finishedWork=a,e.finishedLanes=r,n){case 0:case 1:throw Error(x(345));case 2:Sn(e,fe,Ge);break;case 3:if(an(e,r),(r&130023424)===r&&(n=Oi+500-q(),10<n)){if(Vr(e,0)!==0)break;if(a=e.suspendedLanes,(a&r)!==r){ce(),e.pingedLanes|=e.suspendedLanes&a;break}e.timeoutHandle=To(Sn.bind(null,e,fe,Ge),n);break}Sn(e,fe,Ge);break;case 4:if(an(e,r),(r&4194240)===r)break;for(n=e.eventTimes,a=-1;0<r;){var i=31-De(r);o=1<<i,i=n[i],i>a&&(a=i),r&=~o}if(r=a,r=q()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*ww(r/1960))-r,10<r){e.timeoutHandle=To(Sn.bind(null,e,fe,Ge),r);break}Sn(e,fe,Ge);break;case 5:Sn(e,fe,Ge);break;default:throw Error(x(329))}}}return be(e,q()),e.callbackNode===t?fd.bind(null,e):null}function Ko(e,n){var t=Dt;return e.current.memoizedState.isDehydrated&&(Cn(e,n).flags|=256),e=da(e,n),e!==2&&(n=fe,fe=t,n!==null&&Jo(n)),e}function Jo(e){fe===null?fe=e:fe.push.apply(fe,e)}function _w(e){for(var n=e;;){if(n.flags&16384){var t=n.updateQueue;if(t!==null&&(t=t.stores,t!==null))for(var r=0;r<t.length;r++){var a=t[r],o=a.getSnapshot;a=a.value;try{if(!Oe(o(),a))return!1}catch{return!1}}}if(t=n.child,n.subtreeFlags&16384&&t!==null)t.return=n,n=t;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function an(e,n){for(n&=~Ai,n&=~_a,e.suspendedLanes|=n,e.pingedLanes&=~n,e=e.expirationTimes;0<n;){var t=31-De(n),r=1<<t;e[t]=-1,n&=~r}}function rl(e){if(I&6)throw Error(x(327));nt();var n=Vr(e,0);if(!(n&1))return be(e,q()),null;var t=da(e,n);if(e.tag!==0&&t===2){var r=wo(e);r!==0&&(n=r,t=Ko(e,r))}if(t===1)throw t=er,Cn(e,0),an(e,n),be(e,q()),t;if(t===6)throw Error(x(345));return e.finishedWork=e.current.alternate,e.finishedLanes=n,Sn(e,fe,Ge),be(e,q()),null}function Bi(e,n){var t=I;I|=1;try{return e(n)}finally{I=t,I===0&&(lt=q()+500,ya&&xn())}}function zn(e){sn!==null&&sn.tag===0&&!(I&6)&&nt();var n=I;I|=1;var t=Ce.transition,r=D;try{if(Ce.transition=null,D=1,e)return e()}finally{D=r,Ce.transition=t,I=n,!(I&6)&&xn()}}function Li(){ye=Yn.current,L(Yn)}function Cn(e,n){e.finishedWork=null,e.finishedLanes=0;var t=e.timeoutHandle;if(t!==-1&&(e.timeoutHandle=-1,Zk(t)),Q!==null)for(t=Q.return;t!==null;){var r=t;switch(xi(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Jr();break;case 3:it(),L(he),L(se),ji();break;case 5:Ci(r);break;case 4:it();break;case 13:L(W);break;case 19:L(W);break;case 10:Si(r.type._context);break;case 22:case 23:Li()}t=t.return}if(Z=e,Q=e=hn(e.current,null),te=ye=n,K=0,er=null,Ai=_a=Nn=0,fe=Dt=null,Fn!==null){for(n=0;n<Fn.length;n++)if(t=Fn[n],r=t.interleaved,r!==null){t.interleaved=null;var a=r.next,o=t.pending;if(o!==null){var i=o.next;o.next=a,r.next=i}t.pending=r}Fn=null}return e}function gd(e,n){do{var t=Q;try{if(_i(),Ir.current=ia,oa){for(var r=U.memoizedState;r!==null;){var a=r.queue;a!==null&&(a.pending=null),r=r.next}oa=!1}if(Mn=0,X=Y=U=null,zt=!1,Jt=0,Di.current=null,t===null||t.return===null){K=1,er=n,Q=null;break}e:{var o=e,i=t.return,s=t,l=n;if(n=te,s.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,p=s,g=p.tag;if(!(p.mode&1)&&(g===0||g===11||g===15)){var m=p.alternate;m?(p.updateQueue=m.updateQueue,p.memoizedState=m.memoizedState,p.lanes=m.lanes):(p.updateQueue=null,p.memoizedState=null)}var b=Gs(i);if(b!==null){b.flags&=-257,Hs(b,i,s,o,n),b.mode&1&&Us(o,c,n),n=b,l=c;var w=n.updateQueue;if(w===null){var y=new Set;y.add(l),n.updateQueue=y}else w.add(l);break e}else{if(!(n&1)){Us(o,c,n),Ri();break e}l=Error(x(426))}}else if(R&&s.mode&1){var T=Gs(i);if(T!==null){!(T.flags&65536)&&(T.flags|=256),Hs(T,i,s,o,n),ki(st(l,s));break e}}o=l=st(l,s),K!==4&&(K=2),Dt===null?Dt=[o]:Dt.push(o),o=i;do{switch(o.tag){case 3:o.flags|=65536,n&=-n,o.lanes|=n;var f=Jc(o,l,n);As(o,f);break e;case 1:s=l;var u=o.type,h=o.stateNode;if(!(o.flags&128)&&(typeof u.getDerivedStateFromError=="function"||h!==null&&typeof h.componentDidCatch=="function"&&(fn===null||!fn.has(h)))){o.flags|=65536,n&=-n,o.lanes|=n;var v=Xc(o,s,n);As(o,v);break e}}o=o.return}while(o!==null)}bd(t)}catch(_){n=_,Q===t&&t!==null&&(Q=t=t.return);continue}break}while(!0)}function hd(){var e=sa.current;return sa.current=ia,e===null?ia:e}function Ri(){(K===0||K===3||K===2)&&(K=4),Z===null||!(Nn&268435455)&&!(_a&268435455)||an(Z,te)}function da(e,n){var t=I;I|=2;var r=hd();(Z!==e||te!==n)&&(Ge=null,Cn(e,n));do try{Sw();break}catch(a){gd(e,a)}while(!0);if(_i(),I=t,sa.current=r,Q!==null)throw Error(x(261));return Z=null,te=0,K}function Sw(){for(;Q!==null;)md(Q)}function $w(){for(;Q!==null&&!K2();)md(Q)}function md(e){var n=yd(e.alternate,e,ye);e.memoizedProps=e.pendingProps,n===null?bd(e):Q=n,Di.current=null}function bd(e){var n=e;do{var t=n.alternate;if(e=n.return,n.flags&32768){if(t=vw(t,n),t!==null){t.flags&=32767,Q=t;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{K=6,Q=null;return}}else if(t=bw(t,n,ye),t!==null){Q=t;return}if(n=n.sibling,n!==null){Q=n;return}Q=n=e}while(n!==null);K===0&&(K=5)}function Sn(e,n,t){var r=D,a=Ce.transition;try{Ce.transition=null,D=1,Fw(e,n,t,r)}finally{Ce.transition=a,D=r}return null}function Fw(e,n,t,r){do nt();while(sn!==null);if(I&6)throw Error(x(327));t=e.finishedWork;var a=e.finishedLanes;if(t===null)return null;if(e.finishedWork=null,e.finishedLanes=0,t===e.current)throw Error(x(177));e.callbackNode=null,e.callbackPriority=0;var o=t.lanes|t.childLanes;if(ik(e,o),e===Z&&(Q=Z=null,te=0),!(t.subtreeFlags&2064)&&!(t.flags&2064)||$r||($r=!0,xd(Hr,function(){return nt(),null})),o=(t.flags&15990)!==0,t.subtreeFlags&15990||o){o=Ce.transition,Ce.transition=null;var i=D;D=1;var s=I;I|=4,Di.current=null,xw(e,t),ud(t,e),Vk(Co),qr=!!Eo,Co=Eo=null,e.current=t,kw(t),J2(),I=s,D=i,Ce.transition=o}else e.current=t;if($r&&($r=!1,sn=e,ca=a),o=e.pendingLanes,o===0&&(fn=null),ek(t.stateNode),be(e,q()),n!==null)for(r=e.onRecoverableError,t=0;t<n.length;t++)a=n[t],r(a.value,{componentStack:a.stack,digest:a.digest});if(la)throw la=!1,e=Qo,Qo=null,e;return ca&1&&e.tag!==0&&nt(),o=e.pendingLanes,o&1?e===Yo?At++:(At=0,Yo=e):At=0,xn(),null}function nt(){if(sn!==null){var e=Jl(ca),n=Ce.transition,t=D;try{if(Ce.transition=null,D=16>e?16:e,sn===null)var r=!1;else{if(e=sn,sn=null,ca=0,I&6)throw Error(x(331));var a=I;for(I|=4,F=e.current;F!==null;){var o=F,i=o.child;if(F.flags&16){var s=o.deletions;if(s!==null){for(var l=0;l<s.length;l++){var c=s[l];for(F=c;F!==null;){var p=F;switch(p.tag){case 0:case 11:case 15:It(8,p,o)}var g=p.child;if(g!==null)g.return=p,F=g;else for(;F!==null;){p=F;var m=p.sibling,b=p.return;if(ld(p),p===c){F=null;break}if(m!==null){m.return=b,F=m;break}F=b}}}var w=o.alternate;if(w!==null){var y=w.child;if(y!==null){w.child=null;do{var T=y.sibling;y.sibling=null,y=T}while(y!==null)}}F=o}}if(o.subtreeFlags&2064&&i!==null)i.return=o,F=i;else e:for(;F!==null;){if(o=F,o.flags&2048)switch(o.tag){case 0:case 11:case 15:It(9,o,o.return)}var f=o.sibling;if(f!==null){f.return=o.return,F=f;break e}F=o.return}}var u=e.current;for(F=u;F!==null;){i=F;var h=i.child;if(i.subtreeFlags&2064&&h!==null)h.return=i,F=h;else e:for(i=u;F!==null;){if(s=F,s.flags&2048)try{switch(s.tag){case 0:case 11:case 15:wa(9,s)}}catch(_){H(s,s.return,_)}if(s===i){F=null;break e}var v=s.sibling;if(v!==null){v.return=s.return,F=v;break e}F=s.return}}if(I=a,xn(),We&&typeof We.onPostCommitFiberRoot=="function")try{We.onPostCommitFiberRoot(ga,e)}catch{}r=!0}return r}finally{D=t,Ce.transition=n}}return!1}function al(e,n,t){n=st(t,n),n=Jc(e,n,1),e=pn(e,n,1),n=ce(),e!==null&&(rr(e,1,n),be(e,n))}function H(e,n,t){if(e.tag===3)al(e,e,t);else for(;n!==null;){if(n.tag===3){al(n,e,t);break}else if(n.tag===1){var r=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(fn===null||!fn.has(r))){e=st(t,e),e=Xc(n,e,1),n=pn(n,e,1),e=ce(),n!==null&&(rr(n,1,e),be(n,e));break}}n=n.return}}function Ew(e,n,t){var r=e.pingCache;r!==null&&r.delete(n),n=ce(),e.pingedLanes|=e.suspendedLanes&t,Z===e&&(te&t)===t&&(K===4||K===3&&(te&130023424)===te&&500>q()-Oi?Cn(e,0):Ai|=t),be(e,n)}function vd(e,n){n===0&&(e.mode&1?(n=hr,hr<<=1,!(hr&130023424)&&(hr=4194304)):n=1);var t=ce();e=Je(e,n),e!==null&&(rr(e,n,t),be(e,t))}function Cw(e){var n=e.memoizedState,t=0;n!==null&&(t=n.retryLane),vd(e,t)}function jw(e,n){var t=0;switch(e.tag){case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(t=a.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(x(314))}r!==null&&r.delete(n),vd(e,t)}var yd;yd=function(e,n,t){if(e!==null)if(e.memoizedProps!==n.pendingProps||he.current)ge=!0;else{if(!(e.lanes&t)&&!(n.flags&128))return ge=!1,mw(e,n,t);ge=!!(e.flags&131072)}else ge=!1,R&&n.flags&1048576&&_c(n,ea,n.index);switch(n.lanes=0,n.tag){case 2:var r=n.type;Ar(e,n),e=n.pendingProps;var a=rt(n,se.current);et(n,t),a=Pi(null,n,r,e,a,t);var o=Mi();return n.flags|=1,typeof a=="object"&&a!==null&&typeof a.render=="function"&&a.$$typeof===void 0?(n.tag=1,n.memoizedState=null,n.updateQueue=null,me(r)?(o=!0,Xr(n)):o=!1,n.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,Fi(n),a.updater=ka,n.stateNode=a,a._reactInternals=n,Ao(n,r,e,t),n=Lo(null,n,r,!0,o,t)):(n.tag=0,R&&o&&yi(n),le(null,n,a,t),n=n.child),n;case 16:r=n.elementType;e:{switch(Ar(e,n),e=n.pendingProps,a=r._init,r=a(r._payload),n.type=r,a=n.tag=Pw(r),e=Ne(r,e),a){case 0:n=Bo(null,n,r,e,t);break e;case 1:n=Qs(null,n,r,e,t);break e;case 11:n=Vs(null,n,r,e,t);break e;case 14:n=qs(null,n,r,Ne(r.type,e),t);break e}throw Error(x(306,r,""))}return n;case 0:return r=n.type,a=n.pendingProps,a=n.elementType===r?a:Ne(r,a),Bo(e,n,r,a,t);case 1:return r=n.type,a=n.pendingProps,a=n.elementType===r?a:Ne(r,a),Qs(e,n,r,a,t);case 3:e:{if(td(n),e===null)throw Error(x(387));r=n.pendingProps,o=n.memoizedState,a=o.element,jc(e,n),ra(n,r,null,t);var i=n.memoizedState;if(r=i.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:i.cache,pendingSuspenseBoundaries:i.pendingSuspenseBoundaries,transitions:i.transitions},n.updateQueue.baseState=o,n.memoizedState=o,n.flags&256){a=st(Error(x(423)),n),n=Ys(e,n,r,t,a);break e}else if(r!==a){a=st(Error(x(424)),n),n=Ys(e,n,r,t,a);break e}else for(xe=un(n.stateNode.containerInfo.firstChild),ke=n,R=!0,Ie=null,t=Ec(n,null,r,t),n.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling;else{if(at(),r===a){n=Xe(e,n,t);break e}le(e,n,r,t)}n=n.child}return n;case 5:return Tc(n),e===null&&zo(n),r=n.type,a=n.pendingProps,o=e!==null?e.memoizedProps:null,i=a.children,jo(r,a)?i=null:o!==null&&jo(r,o)&&(n.flags|=32),nd(e,n),le(e,n,i,t),n.child;case 6:return e===null&&zo(n),null;case 13:return rd(e,n,t);case 4:return Ei(n,n.stateNode.containerInfo),r=n.pendingProps,e===null?n.child=ot(n,null,r,t):le(e,n,r,t),n.child;case 11:return r=n.type,a=n.pendingProps,a=n.elementType===r?a:Ne(r,a),Vs(e,n,r,a,t);case 7:return le(e,n,n.pendingProps,t),n.child;case 8:return le(e,n,n.pendingProps.children,t),n.child;case 12:return le(e,n,n.pendingProps.children,t),n.child;case 10:e:{if(r=n.type._context,a=n.pendingProps,o=n.memoizedProps,i=a.value,O(na,r._currentValue),r._currentValue=i,o!==null)if(Oe(o.value,i)){if(o.children===a.children&&!he.current){n=Xe(e,n,t);break e}}else for(o=n.child,o!==null&&(o.return=n);o!==null;){var s=o.dependencies;if(s!==null){i=o.child;for(var l=s.firstContext;l!==null;){if(l.context===r){if(o.tag===1){l=Qe(-1,t&-t),l.tag=2;var c=o.updateQueue;if(c!==null){c=c.shared;var p=c.pending;p===null?l.next=l:(l.next=p.next,p.next=l),c.pending=l}}o.lanes|=t,l=o.alternate,l!==null&&(l.lanes|=t),Io(o.return,t,n),s.lanes|=t;break}l=l.next}}else if(o.tag===10)i=o.type===n.type?null:o.child;else if(o.tag===18){if(i=o.return,i===null)throw Error(x(341));i.lanes|=t,s=i.alternate,s!==null&&(s.lanes|=t),Io(i,t,n),i=o.sibling}else i=o.child;if(i!==null)i.return=o;else for(i=o;i!==null;){if(i===n){i=null;break}if(o=i.sibling,o!==null){o.return=i.return,i=o;break}i=i.return}o=i}le(e,n,a.children,t),n=n.child}return n;case 9:return a=n.type,r=n.pendingProps.children,et(n,t),a=je(a),r=r(a),n.flags|=1,le(e,n,r,t),n.child;case 14:return r=n.type,a=Ne(r,n.pendingProps),a=Ne(r.type,a),qs(e,n,r,a,t);case 15:return Zc(e,n,n.type,n.pendingProps,t);case 17:return r=n.type,a=n.pendingProps,a=n.elementType===r?a:Ne(r,a),Ar(e,n),n.tag=1,me(r)?(e=!0,Xr(n)):e=!1,et(n,t),Kc(n,r,a),Ao(n,r,a,t),Lo(null,n,r,!0,e,t);case 19:return ad(e,n,t);case 22:return ed(e,n,t)}throw Error(x(156,n.tag))};function xd(e,n){return ql(e,n)}function Tw(e,n,t,r){this.tag=e,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ee(e,n,t,r){return new Tw(e,n,t,r)}function Wi(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Pw(e){if(typeof e=="function")return Wi(e)?1:0;if(e!=null){if(e=e.$$typeof,e===si)return 11;if(e===li)return 14}return 2}function hn(e,n){var t=e.alternate;return t===null?(t=Ee(e.tag,n,e.key,e.mode),t.elementType=e.elementType,t.type=e.type,t.stateNode=e.stateNode,t.alternate=e,e.alternate=t):(t.pendingProps=n,t.type=e.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=e.flags&14680064,t.childLanes=e.childLanes,t.lanes=e.lanes,t.child=e.child,t.memoizedProps=e.memoizedProps,t.memoizedState=e.memoizedState,t.updateQueue=e.updateQueue,n=e.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},t.sibling=e.sibling,t.index=e.index,t.ref=e.ref,t}function Lr(e,n,t,r,a,o){var i=2;if(r=e,typeof e=="function")Wi(e)&&(i=1);else if(typeof e=="string")i=5;else e:switch(e){case Bn:return jn(t.children,a,o,n);case ii:i=8,a|=8;break;case io:return e=Ee(12,t,n,a|2),e.elementType=io,e.lanes=o,e;case so:return e=Ee(13,t,n,a),e.elementType=so,e.lanes=o,e;case lo:return e=Ee(19,t,n,a),e.elementType=lo,e.lanes=o,e;case Tl:return Sa(t,a,o,n);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Cl:i=10;break e;case jl:i=9;break e;case si:i=11;break e;case li:i=14;break e;case nn:i=16,r=null;break e}throw Error(x(130,e==null?e:typeof e,""))}return n=Ee(i,t,n,a),n.elementType=e,n.type=r,n.lanes=o,n}function jn(e,n,t,r){return e=Ee(7,e,r,n),e.lanes=t,e}function Sa(e,n,t,r){return e=Ee(22,e,r,n),e.elementType=Tl,e.lanes=t,e.stateNode={isHidden:!1},e}function to(e,n,t){return e=Ee(6,e,null,n),e.lanes=t,e}function ro(e,n,t){return n=Ee(4,e.children!==null?e.children:[],e.key,n),n.lanes=t,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}function Mw(e,n,t,r,a){this.tag=n,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Aa(0),this.expirationTimes=Aa(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Aa(0),this.identifierPrefix=r,this.onRecoverableError=a,this.mutableSourceEagerHydrationData=null}function Ui(e,n,t,r,a,o,i,s,l){return e=new Mw(e,n,t,s,l),n===1?(n=1,o===!0&&(n|=8)):n=0,o=Ee(3,null,null,n),e.current=o,o.stateNode=e,o.memoizedState={element:r,isDehydrated:t,cache:null,transitions:null,pendingSuspenseBoundaries:null},Fi(o),e}function Nw(e,n,t){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:On,key:r==null?null:""+r,children:e,containerInfo:n,implementation:t}}function kd(e){if(!e)return bn;e=e._reactInternals;e:{if(Dn(e)!==e||e.tag!==1)throw Error(x(170));var n=e;do{switch(n.tag){case 3:n=n.stateNode.context;break e;case 1:if(me(n.type)){n=n.stateNode.__reactInternalMemoizedMergedChildContext;break e}}n=n.return}while(n!==null);throw Error(x(171))}if(e.tag===1){var t=e.type;if(me(t))return kc(e,t,n)}return n}function wd(e,n,t,r,a,o,i,s,l){return e=Ui(t,r,!0,e,a,o,i,s,l),e.context=kd(null),t=e.current,r=ce(),a=gn(t),o=Qe(r,a),o.callback=n??null,pn(t,o,a),e.current.lanes=a,rr(e,a,r),be(e,r),e}function $a(e,n,t,r){var a=n.current,o=ce(),i=gn(a);return t=kd(t),n.context===null?n.context=t:n.pendingContext=t,n=Qe(o,i),n.payload={element:e},r=r===void 0?null:r,r!==null&&(n.callback=r),e=pn(a,n,i),e!==null&&(Ae(e,a,i,o),zr(e,a,i)),i}function ua(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function ol(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var t=e.retryLane;e.retryLane=t!==0&&t<n?t:n}}function Gi(e,n){ol(e,n),(e=e.alternate)&&ol(e,n)}function zw(){return null}var _d=typeof reportError=="function"?reportError:function(e){console.error(e)};function Hi(e){this._internalRoot=e}Fa.prototype.render=Hi.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(x(409));$a(e,n,null,null)};Fa.prototype.unmount=Hi.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;zn(function(){$a(null,e,null,null)}),n[Ke]=null}};function Fa(e){this._internalRoot=e}Fa.prototype.unstable_scheduleHydration=function(e){if(e){var n=ec();e={blockedOn:null,target:e,priority:n};for(var t=0;t<rn.length&&n!==0&&n<rn[t].priority;t++);rn.splice(t,0,e),t===0&&tc(e)}};function Vi(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Ea(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function il(){}function Iw(e,n,t,r,a){if(a){if(typeof r=="function"){var o=r;r=function(){var c=ua(i);o.call(c)}}var i=wd(n,r,e,0,null,!1,!1,"",il);return e._reactRootContainer=i,e[Ke]=i.current,Vt(e.nodeType===8?e.parentNode:e),zn(),i}for(;a=e.lastChild;)e.removeChild(a);if(typeof r=="function"){var s=r;r=function(){var c=ua(l);s.call(c)}}var l=Ui(e,0,!1,null,null,!1,!1,"",il);return e._reactRootContainer=l,e[Ke]=l.current,Vt(e.nodeType===8?e.parentNode:e),zn(function(){$a(n,l,t,r)}),l}function Ca(e,n,t,r,a){var o=t._reactRootContainer;if(o){var i=o;if(typeof a=="function"){var s=a;a=function(){var l=ua(i);s.call(l)}}$a(n,i,e,a)}else i=Iw(t,n,e,a,r);return ua(i)}Xl=function(e){switch(e.tag){case 3:var n=e.stateNode;if(n.current.memoizedState.isDehydrated){var t=Et(n.pendingLanes);t!==0&&(ui(n,t|1),be(n,q()),!(I&6)&&(lt=q()+500,xn()))}break;case 13:zn(function(){var r=Je(e,1);if(r!==null){var a=ce();Ae(r,e,1,a)}}),Gi(e,1)}};pi=function(e){if(e.tag===13){var n=Je(e,134217728);if(n!==null){var t=ce();Ae(n,e,134217728,t)}Gi(e,134217728)}};Zl=function(e){if(e.tag===13){var n=gn(e),t=Je(e,n);if(t!==null){var r=ce();Ae(t,e,n,r)}Gi(e,n)}};ec=function(){return D};nc=function(e,n){var t=D;try{return D=e,n()}finally{D=t}};yo=function(e,n,t){switch(n){case"input":if(po(e,t),n=t.name,t.type==="radio"&&n!=null){for(t=e;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll("input[name="+JSON.stringify(""+n)+'][type="radio"]'),n=0;n<t.length;n++){var r=t[n];if(r!==e&&r.form===e.form){var a=va(r);if(!a)throw Error(x(90));Ml(r),po(r,a)}}}break;case"textarea":zl(e,t);break;case"select":n=t.value,n!=null&&Kn(e,!!t.multiple,n,!1)}};Rl=Bi;Wl=zn;var Dw={usingClientEntryPoint:!1,Events:[or,Un,va,Bl,Ll,Bi]},St={findFiberByHostInstance:$n,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Aw={bundleType:St.bundleType,version:St.version,rendererPackageName:St.rendererPackageName,rendererConfig:St.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Ze.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Hl(e),e===null?null:e.stateNode},findFiberByHostInstance:St.findFiberByHostInstance||zw,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Fr=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Fr.isDisabled&&Fr.supportsFiber)try{ga=Fr.inject(Aw),We=Fr}catch{}}_e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Dw;_e.createPortal=function(e,n){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Vi(n))throw Error(x(200));return Nw(e,n,null,t)};_e.createRoot=function(e,n){if(!Vi(e))throw Error(x(299));var t=!1,r="",a=_d;return n!=null&&(n.unstable_strictMode===!0&&(t=!0),n.identifierPrefix!==void 0&&(r=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),n=Ui(e,1,!1,null,null,t,!1,r,a),e[Ke]=n.current,Vt(e.nodeType===8?e.parentNode:e),new Hi(n)};_e.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(x(188)):(e=Object.keys(e).join(","),Error(x(268,e)));return e=Hl(n),e=e===null?null:e.stateNode,e};_e.flushSync=function(e){return zn(e)};_e.hydrate=function(e,n,t){if(!Ea(n))throw Error(x(200));return Ca(null,e,n,!0,t)};_e.hydrateRoot=function(e,n,t){if(!Vi(e))throw Error(x(405));var r=t!=null&&t.hydratedSources||null,a=!1,o="",i=_d;if(t!=null&&(t.unstable_strictMode===!0&&(a=!0),t.identifierPrefix!==void 0&&(o=t.identifierPrefix),t.onRecoverableError!==void 0&&(i=t.onRecoverableError)),n=wd(n,null,e,1,t??null,a,!1,o,i),e[Ke]=n.current,Vt(e),r)for(e=0;e<r.length;e++)t=r[e],a=t._getVersion,a=a(t._source),n.mutableSourceEagerHydrationData==null?n.mutableSourceEagerHydrationData=[t,a]:n.mutableSourceEagerHydrationData.push(t,a);return new Fa(n)};_e.render=function(e,n,t){if(!Ea(n))throw Error(x(200));return Ca(null,e,n,!1,t)};_e.unmountComponentAtNode=function(e){if(!Ea(e))throw Error(x(40));return e._reactRootContainer?(zn(function(){Ca(null,null,e,!1,function(){e._reactRootContainer=null,e[Ke]=null})}),!0):!1};_e.unstable_batchedUpdates=Bi;_e.unstable_renderSubtreeIntoContainer=function(e,n,t,r){if(!Ea(t))throw Error(x(200));if(e==null||e._reactInternals===void 0)throw Error(x(38));return Ca(e,n,t,!1,r)};_e.version="18.3.1-next-f1338f8080-20240426";function Sd(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Sd)}catch(e){console.error(e)}}Sd(),Sl.exports=_e;var Ow=Sl.exports,$d,sl=Ow;$d=sl.createRoot,sl.hydrateRoot;const Bw=["title","section","two-column","feature-grid","data-table","stat-row","timeline","quote","closing","image-hero","comparison","code"],Xo={title:"Title",section:"Section divider","two-column":"Two column","feature-grid":"Feature grid","data-table":"Data table","stat-row":"Stat row",timeline:"Timeline",quote:"Quote",closing:"Closing","image-hero":"Image hero",comparison:"Comparison",code:"Code"};function Lw(e){switch(e){case"title":return{layout:e,eyebrow:"Eyebrow",heading:"Title slide",lead:"Supporting line."};case"section":return{layout:e,number:"01",eyebrow:"Part",heading:"Section title",lead:""};case"two-column":return{layout:e,heading:"Heading",body:"Left column body text.",image:"",imageAlt:"Image"};case"image-hero":return{layout:e,eyebrow:"Story",heading:"Hero moment",lead:"Caption over a full-bleed image.",image:"",imageAlt:"Hero image"};case"comparison":return{layout:e,heading:"Before vs after",leftLabel:"Before",left:"The old way — slow, manual, error-prone.",rightLabel:"After",right:"The new way — automated, fast, reliable.",emphasis:"right"};case"code":return{layout:e,eyebrow:"API",heading:"Ship in five lines",filename:"example.ts",language:"ts",code:`const client = createClient({ apiKey });
const res = await client.run({ prompt });
console.log(res.ok);`};case"feature-grid":return{layout:e,heading:"Feature grid",columns:3,cards:[{title:"One",body:"First point."},{title:"Two",body:"Second point."},{title:"Three",body:"Third point."}]};case"data-table":return{layout:e,heading:"Table",columns:["Column A","Column B"],rows:[["a1","b1"],["a2","b2"]]};case"stat-row":return{layout:e,heading:"Stats",stats:[{value:"100%",label:"Metric"},{value:"2x",label:"Metric"}]};case"timeline":return{layout:e,heading:"Timeline",steps:[{title:"Step one",body:"Detail."},{title:"Step two",body:"Detail."}]};case"quote":return{layout:e,quote:"A memorable quote.",by:"Attribution"};case"closing":return{layout:e,eyebrow:"Thanks",heading:"Closing",lead:"Call to action.",cta:{label:"Get started",href:"https://example.com"}};default:return{layout:e,heading:"Slide"}}}const Fd={type:"deck",meta:{title:"Acme Q3",company:"Acme",theme:"signal",description:"Studio craft preview"},slides:[{layout:"title",eyebrow:"Q3 2026",heading:"Acme All-Hands",lead:"Momentum, metrics, and what's next."},{layout:"image-hero",eyebrow:"Moment",heading:"Ship the story, not the slide.",lead:"Full-bleed craft that still exports to editable PPTX.",image:"data:image/svg+xml,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#0B1220"/><stop offset="1" stop-color="#FF3B1F"/></linearGradient></defs><rect width="1600" height="900" fill="url(#g)"/><circle cx="1180" cy="280" r="180" fill="#0D9488" opacity=".35"/></svg>'),imageAlt:"Signal gradient field"},{layout:"section",number:"01",eyebrow:"Part one",heading:"Where we are"},{layout:"feature-grid",heading:"Three pillars",columns:"bento",cards:[{icon:"fa-solid fa-bolt",title:"Speed",body:"Ship 3x faster with schema craft."},{title:"Safety",body:"SOC2 in progress."},{title:"Simplicity",body:"One command install."},{title:"Export",body:"Native editable PPTX."},{title:"Themes",body:"75 swappable looks."}]},{layout:"comparison",heading:"Before vs after",leftLabel:"Prompt-only packs",left:"Opaque HTML. Hard to edit one slide. No native PowerPoint.",rightLabel:"presentation-md",right:"Schema-validated Deck JSON. Diff one slide. MCP + editable PPTX.",emphasis:"right"},{layout:"two-column",eyebrow:"Craft",heading:"Asymmetric layouts stay intentional.",body:"Ratio and reverse controls keep media and copy in tension — not a default 50/50 split.",aside:"2:1 copy · reverse media",ratio:"2-1"},{layout:"code",eyebrow:"Agent skill",heading:"One install. Any agent.",filename:"install.sh",language:"bash",code:`npx @presentation-md/install claude-code
# then: create a presentation about…`},{layout:"stat-row",heading:"By the numbers",stats:[{value:"75",label:"Themes"},{value:"12",label:"Layouts"},{value:"1",label:"Install"}]},{layout:"quote",quote:"Make it work, make it right, make it fast.",by:"Kent Beck"},{layout:"closing",heading:"Thank you",lead:"Questions?",cta:{label:"Get started",href:"https://presentation-md.vercel.app"}}]},Ed="claude",Cd="0.1.0",jd="Anthropic / Claude-inspired theme: warm cream paper, clay-coral accent, grotesk + editorial-serif pairing.",Td="Warm, human, editorial, high-craft, calm — cream paper, soft clay-coral signal, Styrene-style grotesk headings over a Tiempos-style serif body. Restrained, trustworthy, not corporate.",Pd="MIT",Md="Timur Isachenko",Nd={bg:"#faf9f5",bg2:"#f4f3ee",text:"#141413",muted:"#73706a",accent:"#d97757",accent2:"#6a9bcc",cardBg:"#ffffff",border:"#e8e6dc"},zd={headingFont:"'Space Grotesk', system-ui, sans-serif",bodyFont:"'Lora', Georgia, 'Times New Roman', serif",headingWeight:600,googleFonts:["Space+Grotesk:wght@500;600;700","Lora:wght@400;500;600"]},Id={radius:"12px",slideWidth:"1280px"},Rw={name:Ed,version:Cd,extends:"default-tech",description:jd,vibe:Td,license:Pd,author:Md,roles:Nd,typography:zd,geometry:Id},Ww=Object.freeze(Object.defineProperty({__proto__:null,author:Md,default:Rw,description:jd,geometry:Id,license:Pd,name:Ed,roles:Nd,typography:zd,version:Cd,vibe:Td},Symbol.toStringTag,{value:"Module"})),Dd="default-tech",Ad="0.1.0",Od="Edgy tech-startup default: dark canvas, violet + cyan accents, bold geometric sans.",Bd="Edgy tech startup — dark, confident, neon-accented.",Ld="MIT",Rd="Timur Isachenko",Wd={bg:"#0e0e12",bg2:"#16161d",text:"#f4f4f5",muted:"#a1a1aa",accent:"#7c3aed",accent2:"#22d3ee",cardBg:"rgba(255,255,255,0.04)",border:"rgba(255,255,255,0.08)"},Ud={headingFont:"'Montserrat', system-ui, sans-serif",bodyFont:"'Open Sans', system-ui, sans-serif",headingWeight:800,googleFonts:["Montserrat:wght@700;800","Open+Sans:wght@400;600"]},Gd={radius:"18px",slideWidth:"1280px"},Uw={name:Dd,version:Ad,description:Od,vibe:Bd,license:Ld,author:Rd,roles:Wd,typography:Ud,geometry:Gd},Gw=Object.freeze(Object.defineProperty({__proto__:null,author:Rd,default:Uw,description:Od,geometry:Gd,license:Ld,name:Dd,roles:Wd,typography:Ud,version:Ad,vibe:Bd},Symbol.toStringTag,{value:"Module"})),Hd="8-bit-orbit",Vd="1.0.0",qd="8-Bit Orbit — pixel-art neon arcade on deep navy, Tektur + Chakra Petch (frontend-slides bold-template-pack).",Qd="8-Bit Orbit — void #0A0E27, neon cyan/pink/yellow, Tektur + Chakra Petch + Space Mono (frontend-slides 8-bit-orbit).",Yd="MIT",Kd="Timur Isachenko",Jd={bg:"#0A0E27",bg2:"#0F1B3D",text:"#FFFFFF",muted:"#E2D5F2",accent:"#5EDCF4",accent2:"#F0A6CA",cardBg:"rgba(15,27,61,0.85)",border:"rgba(94,220,244,0.35)"},Xd={headingFont:"'Tektur', cursive",bodyFont:"'Chakra Petch', system-ui, sans-serif",headingWeight:700,googleFonts:["Tektur:wght@500;700;900","Chakra+Petch:wght@400;500;600;700","Space+Mono:wght@400;700"]},Zd={radius:"0px",slideWidth:"1280px"},Hw={name:Hd,version:Vd,extends:"default-tech",description:qd,vibe:Qd,license:Yd,author:Kd,roles:Jd,typography:Xd,geometry:Zd},Vw=Object.freeze(Object.defineProperty({__proto__:null,author:Kd,default:Hw,description:qd,geometry:Zd,license:Yd,name:Hd,roles:Jd,typography:Xd,version:Vd,vibe:Qd},Symbol.toStringTag,{value:"Module"})),eu="aerospace-hud",nu="0.1.0",tu="Aerospace HUD — deep navy, cyan instruments, warning orange, blueprint grid.",ru="Aerospace HUD — navy cockpit, cyan instruments, warning orange, Barlow Condensed (matches Axiom gallery).",au="MIT",ou="Timur Isachenko",iu={bg:"#0a1d3a",bg2:"#0d2347",text:"#f0f8ff",muted:"#2a7aaa",accent:"#5ec8ff",accent2:"#ff7a18",cardBg:"rgba(94,200,255,0.08)",border:"rgba(94,200,255,0.28)"},su={headingFont:"'Barlow Condensed', system-ui, sans-serif",bodyFont:"'Barlow', system-ui, sans-serif",headingWeight:700,googleFonts:["Barlow+Condensed:wght@600;700","Barlow:wght@400;600","IBM+Plex+Mono:wght@500"]},lu={radius:"4px",slideWidth:"1280px"},qw={name:eu,version:nu,extends:"default-tech",description:tu,vibe:ru,license:au,author:ou,roles:iu,typography:su,geometry:lu},Qw=Object.freeze(Object.defineProperty({__proto__:null,author:ou,default:qw,description:tu,geometry:lu,license:au,name:eu,roles:iu,typography:su,version:nu,vibe:ru},Symbol.toStringTag,{value:"Module"})),cu="art-deco",du="0.1.0",uu="Art Deco investor — deep emerald, gold leaf, Cinzel display.",pu="Art Deco — #0c2a24 emerald, gold #c8a24a, Cinzel (matches Meridian Club gallery).",fu="MIT",gu="Timur Isachenko",hu={bg:"#0c2a24",bg2:"#113530",text:"#f5eed8",muted:"#c9bfa0",accent:"#c8a24a",accent2:"#e2c47a",cardBg:"rgba(200,162,74,0.08)",border:"rgba(200,162,74,0.35)"},mu={headingFont:"'Cinzel', Georgia, serif",bodyFont:"'Cormorant Garamond', Georgia, serif",headingWeight:600,googleFonts:["Cinzel:wght@500;600;700","Cormorant+Garamond:wght@400;600"]},bu={radius:"0px",slideWidth:"1280px"},Yw={name:cu,version:du,extends:"default-tech",description:uu,vibe:pu,license:fu,author:gu,roles:hu,typography:mu,geometry:bu},Kw=Object.freeze(Object.defineProperty({__proto__:null,author:gu,default:Yw,description:uu,geometry:bu,license:fu,name:cu,roles:hu,typography:mu,version:du,vibe:pu},Symbol.toStringTag,{value:"Module"})),vu="aurora-glass",yu="0.1.0",xu="Dark aurora glassmorphism — void canvas, frosted cards, violet + cyan glow.",ku="Aurora glass — pure black void, Syne + Inter, violet #a78bfa + cyan #67e8f9 (matches NovaSpark gallery).",wu="MIT",_u="Timur Isachenko",Su={bg:"#000000",bg2:"#0a0612",text:"#ffffff",muted:"#a5a0b8",accent:"#a78bfa",accent2:"#67e8f9",cardBg:"rgba(255,255,255,0.06)",border:"rgba(255,255,255,0.12)"},$u={headingFont:"'Syne', system-ui, sans-serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:800,googleFonts:["Syne:wght@700;800","Inter:wght@400;600"]},Fu={radius:"16px",slideWidth:"1280px"},Jw={name:vu,version:yu,extends:"default-tech",description:xu,vibe:ku,license:wu,author:_u,roles:Su,typography:$u,geometry:Fu},Xw=Object.freeze(Object.defineProperty({__proto__:null,author:_u,default:Jw,description:xu,geometry:Fu,license:wu,name:vu,roles:Su,typography:$u,version:yu,vibe:ku},Symbol.toStringTag,{value:"Module"})),Eu="bauhaus",Cu="0.1.0",ju="Bauhaus primary system — cream field, red/yellow/blue geometry, bold grotesk.",Tu="Bauhaus — warm cream #f4f1ea, primary red #e63946 + blue #1f4ae0 (matches Primary gallery).",Pu="MIT",Mu="Timur Isachenko",Nu={bg:"#f4f1ea",bg2:"#ede9e0",text:"#0d0d0d",muted:"#6a655c",accent:"#e63946",accent2:"#1f4ae0",cardBg:"rgba(0,0,0,0.04)",border:"rgba(13,13,13,0.2)"},zu={headingFont:"'Archivo', system-ui, sans-serif",bodyFont:"'Space Grotesk', system-ui, sans-serif",headingWeight:800,googleFonts:["Archivo:wght@600;800","Space+Grotesk:wght@400;600"]},Iu={radius:"0px",slideWidth:"1280px"},Zw={name:Eu,version:Cu,extends:"default-tech",description:ju,vibe:Tu,license:Pu,author:Mu,roles:Nu,typography:zu,geometry:Iu},e4=Object.freeze(Object.defineProperty({__proto__:null,author:Mu,default:Zw,description:ju,geometry:Iu,license:Pu,name:Eu,roles:Nu,typography:zu,version:Cu,vibe:Tu},Symbol.toStringTag,{value:"Module"})),Du="biennale-yellow",Au="1.0.0",Ou="Biennale Yellow — Instrument Serif on parchment with solar yellow bloom and deep indigo ink (frontend-slides / beautiful-html-templates).",Bu="Biennale Yellow — parchment #E9E5DB, sun #F1EE2E, indigo #1B2566, Instrument Serif + Archivo (frontend-slides biennale-yellow).",Lu="MIT",Ru="Timur Isachenko",Wu={bg:"#E9E5DB",bg2:"#DCD6C4",text:"#1B2566",muted:"#4A5480",accent:"#F1EE2E",accent2:"#E26B4A",cardBg:"rgba(255,255,255,0.35)",border:"rgba(27,37,102,0.22)"},Uu={headingFont:"'Instrument Serif', Georgia, serif",bodyFont:"'Archivo', system-ui, sans-serif",headingWeight:400,googleFonts:["Instrument+Serif:ital@0;1","Archivo:wght@400;500;600","JetBrains+Mono:wght@400"]},Gu={radius:"0px",slideWidth:"1280px"},n4={name:Du,version:Au,extends:"default-tech",description:Ou,vibe:Bu,license:Lu,author:Ru,roles:Wu,typography:Uu,geometry:Gu},t4=Object.freeze(Object.defineProperty({__proto__:null,author:Ru,default:n4,description:Ou,geometry:Gu,license:Lu,name:Du,roles:Wu,typography:Uu,version:Au,vibe:Bu},Symbol.toStringTag,{value:"Module"})),Hu="block-frame",Vu="1.0.0",qu="BlockFrame — neobrutalist pastel-neon blocks, 4px ink borders, hard offset shadows (frontend-slides bold-template-pack).",Qu="BlockFrame — offwhite #FFFDF5, pink/blue/green/yellow pastels, Inter 900 + Space Grotesk (frontend-slides block-frame).",Yu="MIT",Ku="Timur Isachenko",Ju={bg:"#FFFDF5",bg2:"#FFDC8B",text:"#000000",muted:"#444444",accent:"#FE90E8",accent2:"#99E885",cardBg:"#FFFFFF",border:"#000000"},Xu={headingFont:"'Inter', system-ui, sans-serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:900,googleFonts:["Inter:wght@500;700;800;900","Space+Grotesk:wght@500;600;700"]},Zu={radius:"0px",slideWidth:"1280px"},r4={name:Hu,version:Vu,extends:"default-tech",description:qu,vibe:Qu,license:Yu,author:Ku,roles:Ju,typography:Xu,geometry:Zu},a4=Object.freeze(Object.defineProperty({__proto__:null,author:Ku,default:r4,description:qu,geometry:Zu,license:Yu,name:Hu,roles:Ju,typography:Xu,version:Vu,vibe:Qu},Symbol.toStringTag,{value:"Module"})),ep="blue-professional",np="1.0.0",tp="Blue Professional — cream paper + electric cobalt #1E2BFA (frontend-slides bold-template-pack).",rp="Blue Professional — cream #FDFAE7 + cobalt #1E2BFA, Space Grotesk + Inter (frontend-slides blue-professional).",ap="MIT",op="Timur Isachenko",ip={bg:"#FDFAE7",bg2:"#F5F2DC",text:"#111111",muted:"#6B6B6B",accent:"#1E2BFA",accent2:"#059669",cardBg:"rgba(30,43,250,0.04)",border:"rgba(30,43,250,0.2)"},sp={headingFont:"'Space Grotesk', sans-serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:700,googleFonts:["Space+Grotesk:wght@500;600;700","Inter:wght@400;500;600"]},lp={radius:"12px",slideWidth:"1280px"},o4={name:ep,version:np,extends:"default-tech",description:tp,vibe:rp,license:ap,author:op,roles:ip,typography:sp,geometry:lp},i4=Object.freeze(Object.defineProperty({__proto__:null,author:op,default:o4,description:tp,geometry:lp,license:ap,name:ep,roles:ip,typography:sp,version:np,vibe:rp},Symbol.toStringTag,{value:"Module"})),cp="blueprint",dp="0.1.0",up="Engineering blueprint — deep navy, cyan lines, Space Mono / Space Grotesk.",pp="Blueprint — #0a1f3d navy, cyan #00e5ff grid (matches Apsis Mission gallery).",fp="MIT",gp="Timur Isachenko",hp={bg:"#0a1f3d",bg2:"#0d2548",text:"#e8f4ff",muted:"#7aa8c8",accent:"#00e5ff",accent2:"#ffffff",cardBg:"rgba(0,229,255,0.06)",border:"rgba(0,229,255,0.28)"},mp={headingFont:"'Space Grotesk', system-ui, sans-serif",bodyFont:"'Space Mono', monospace",headingWeight:700,googleFonts:["Space+Grotesk:wght@500;700","Space+Mono:wght@400;700","IBM+Plex+Mono:wght@500"]},bp={radius:"2px",slideWidth:"1280px"},s4={name:cp,version:dp,extends:"default-tech",description:up,vibe:pp,license:fp,author:gp,roles:hp,typography:mp,geometry:bp},l4=Object.freeze(Object.defineProperty({__proto__:null,author:gp,default:s4,description:up,geometry:bp,license:fp,name:cp,roles:hp,typography:mp,version:dp,vibe:pp},Symbol.toStringTag,{value:"Module"})),vp="bold-poster",yp="1.0.0",xp="Bold Poster — Shrikhand display, Libre Baskerville body, tomato red accent (frontend-slides / beautiful-html-templates).",kp="Bold Poster — white canvas, ink #1C1410, tomato #D8000F, Shrikhand + Libre Baskerville (frontend-slides bold-poster).",wp="MIT",_p="Timur Isachenko",Sp={bg:"#FFFFFF",bg2:"#F5F2EF",text:"#1C1410",muted:"#6B5E54",accent:"#D8000F",accent2:"#1C1410",cardBg:"#F5F2EF",border:"rgba(28,20,16,0.85)"},$p={headingFont:"'Shrikhand', cursive",bodyFont:"'Libre Baskerville', Georgia, serif",headingWeight:400,googleFonts:["Shrikhand","Libre+Baskerville:wght@400;700","Space+Grotesk:wght@500;600"]},Fp={radius:"0px",slideWidth:"1280px"},c4={name:vp,version:yp,extends:"default-tech",description:xp,vibe:kp,license:wp,author:_p,roles:Sp,typography:$p,geometry:Fp},d4=Object.freeze(Object.defineProperty({__proto__:null,author:_p,default:c4,description:xp,geometry:Fp,license:wp,name:vp,roles:Sp,typography:$p,version:yp,vibe:kp},Symbol.toStringTag,{value:"Module"})),Ep="bold-signal",Cp="1.0.0",jp="Bold Signal — Archivo Black on dark gradient with vibrant orange card focal (frontend-slides STYLE_PRESETS).",Tp="Bold Signal — #1a1a1a dark, orange card #FF5722, Archivo Black + Space Grotesk (frontend-slides Bold Signal).",Pp="MIT",Mp="Timur Isachenko",Np={bg:"#1a1a1a",bg2:"#2d2d2d",text:"#ffffff",muted:"#a0a0a0",accent:"#FF5722",accent2:"#FF8A65",cardBg:"#FF5722",border:"rgba(255,255,255,0.12)"},zp={headingFont:"'Archivo Black', system-ui, sans-serif",bodyFont:"'Space Grotesk', system-ui, sans-serif",headingWeight:400,googleFonts:["Archivo+Black","Space+Grotesk:wght@400;500;600"]},Ip={radius:"16px",slideWidth:"1280px"},u4={name:Ep,version:Cp,extends:"default-tech",description:jp,vibe:Tp,license:Pp,author:Mp,roles:Np,typography:zp,geometry:Ip},p4=Object.freeze(Object.defineProperty({__proto__:null,author:Mp,default:u4,description:jp,geometry:Ip,license:Pp,name:Ep,roles:Np,typography:zp,version:Cp,vibe:Tp},Symbol.toStringTag,{value:"Module"})),Dp="botanical-luxe",Ap="0.1.0",Op="Botanical luxe — deep forest green, gold leaf, serif elegance for impact reports.",Bp="Botanical luxe — forest #1d3a2f, gold #bfa55a, Cormorant + DM Sans (matches Verdant gallery).",Lp="MIT",Rp="Timur Isachenko",Wp={bg:"#1d3a2f",bg2:"#162d24",text:"#f3efe4",muted:"#6b9e7a",accent:"#bfa55a",accent2:"#4a7c59",cardBg:"rgba(191,165,90,0.08)",border:"rgba(191,165,90,0.28)"},Up={headingFont:"'Cormorant Garamond', Georgia, serif",bodyFont:"'DM Sans', system-ui, sans-serif",headingWeight:600,googleFonts:["Cormorant+Garamond:wght@500;600;700","DM+Sans:wght@400;600"]},Gp={radius:"8px",slideWidth:"1280px"},f4={name:Dp,version:Ap,extends:"default-tech",description:Op,vibe:Bp,license:Lp,author:Rp,roles:Wp,typography:Up,geometry:Gp},g4=Object.freeze(Object.defineProperty({__proto__:null,author:Rp,default:f4,description:Op,geometry:Gp,license:Lp,name:Dp,roles:Wp,typography:Up,version:Ap,vibe:Bp},Symbol.toStringTag,{value:"Module"})),Hp="broadsheet",Vp="0.1.0",qp="Newspaper broadsheet — warm newsprint, deep ink, Pirata One masthead + Playfair.",Qp="Broadsheet — #f2ece0 newsprint, ink #1a1208, Pirata One masthead (matches Daily Ledger gallery).",Yp="MIT",Kp="Timur Isachenko",Jp={bg:"#f2ece0",bg2:"#e8dfc8",text:"#1a1208",muted:"#8a7560",accent:"#1a1208",accent2:"#5c4d38",cardBg:"rgba(26,18,8,0.04)",border:"rgba(26,18,8,0.18)"},Xp={headingFont:"'Playfair Display', Georgia, serif",bodyFont:"'Lora', Georgia, serif",headingWeight:700,googleFonts:["Pirata+One","Playfair+Display:wght@500;700","Lora:wght@400;600"]},Zp={radius:"0px",slideWidth:"1280px"},h4={name:Hp,version:Vp,extends:"default-tech",description:qp,vibe:Qp,license:Yp,author:Kp,roles:Jp,typography:Xp,geometry:Zp},m4=Object.freeze(Object.defineProperty({__proto__:null,author:Kp,default:h4,description:qp,geometry:Zp,license:Yp,name:Hp,roles:Jp,typography:Xp,version:Vp,vibe:Qp},Symbol.toStringTag,{value:"Module"})),ef="broadside",nf="1.0.0",tf="Broadside — dark editorial canvas with fire-orange accent and massive Barlow type (frontend-slides).",rf="Broadside — ink #111111, fire orange #E85D26, cream #F0ECE5, Barlow 900 + IBM Plex Mono (frontend-slides broadside).",af="MIT",of="Timur Isachenko",sf={bg:"#111111",bg2:"#1A1A18",text:"#F0ECE5",muted:"#888880",accent:"#E85D26",accent2:"#F0ECE5",cardBg:"rgba(232,93,38,0.12)",border:"rgba(40,40,38,1)"},lf={headingFont:"'Barlow', system-ui, sans-serif",bodyFont:"'Barlow', system-ui, sans-serif",headingWeight:900,googleFonts:["Barlow:wght@400;700;900","IBM+Plex+Mono:wght@400;500"]},cf={radius:"0px",slideWidth:"1280px"},b4={name:ef,version:nf,extends:"default-tech",description:tf,vibe:rf,license:af,author:of,roles:sf,typography:lf,geometry:cf},v4=Object.freeze(Object.defineProperty({__proto__:null,author:of,default:b4,description:tf,geometry:cf,license:af,name:ef,roles:sf,typography:lf,version:nf,vibe:rf},Symbol.toStringTag,{value:"Module"})),df="brutalist-acid",uf="0.1.0",pf="Dark acid brutalist — near-black concrete, #d6ff00 hazard lime, hard mono edges.",ff="Acid brutalist — #1c1c1c, electric lime, Space Mono + Barlow Condensed (matches MONOLITH gallery).",gf="MIT",hf="Timur Isachenko",mf={bg:"#1c1c1c",bg2:"#2a2a2a",text:"#e8e6e1",muted:"#888888",accent:"#d6ff00",accent2:"#ffffff",cardBg:"rgba(214,255,0,0.06)",border:"rgba(214,255,0,0.35)"},bf={headingFont:"'Space Mono', monospace",bodyFont:"'Barlow Condensed', system-ui, sans-serif",headingWeight:700,googleFonts:["Space+Mono:wght@400;700","Barlow+Condensed:wght@500;700"]},vf={radius:"0px",slideWidth:"1280px"},y4={name:df,version:uf,extends:"default-tech",description:pf,vibe:ff,license:gf,author:hf,roles:mf,typography:bf,geometry:vf},x4=Object.freeze(Object.defineProperty({__proto__:null,author:hf,default:y4,description:pf,geometry:vf,license:gf,name:df,roles:mf,typography:bf,version:uf,vibe:ff},Symbol.toStringTag,{value:"Module"})),yf="brutalist-mono",xf="0.1.0",kf="Raw brutalist theme with concrete-grey background, monospace type, hard square corners, and a single hazard-orange accent.",wf="Raw brutalist / technical — concrete off-white bg, near-black monospace ink, hazard-orange accent, thick black hairlines, zero radius.",_f="MIT",Sf="Timur Isachenko",$f={bg:"#f0efe9",bg2:"#e3e1d8",text:"#0a0a0a",muted:"#57554c",accent:"#ff3600",accent2:"#0a0a0a",cardBg:"#ffffff",border:"rgba(10,10,10,0.85)"},Ff={headingFont:"'IBM Plex Mono', 'Courier New', monospace",bodyFont:"'IBM Plex Mono', 'Courier New', monospace",headingWeight:700,googleFonts:["IBM+Plex+Mono:wght@400;600;700"]},Ef={radius:"0px",slideWidth:"1280px"},k4={name:yf,version:xf,extends:"default-tech",description:kf,vibe:wf,license:_f,author:Sf,roles:$f,typography:Ff,geometry:Ef},w4=Object.freeze(Object.defineProperty({__proto__:null,author:Sf,default:k4,description:kf,geometry:Ef,license:_f,name:yf,roles:$f,typography:Ff,version:xf,vibe:wf},Symbol.toStringTag,{value:"Module"})),Cf="candy-pop",jf="0.1.0",Tf="Candy pop — cream canvas, hot pink + butter yellow, soft blobs, rounded type.",Pf="Candy pop — cream canvas, hot pink + jellybean blue, Fredoka + Poppins (matches Jellybean gallery).",Mf="MIT",Nf="Timur Isachenko",zf={bg:"#fdf3e7",bg2:"#f7e8d4",text:"#1a1a2e",muted:"#7a6a80",accent:"#ff5d8f",accent2:"#2d7dd2",cardBg:"rgba(255,93,143,0.08)",border:"rgba(26,26,46,0.14)"},If={headingFont:"'Fredoka', system-ui, sans-serif",bodyFont:"'Poppins', system-ui, sans-serif",headingWeight:700,googleFonts:["Fredoka:wght@500;700","Poppins:wght@400;600"]},Df={radius:"28px",slideWidth:"1280px"},_4={name:Cf,version:jf,extends:"default-tech",description:Tf,vibe:Pf,license:Mf,author:Nf,roles:zf,typography:If,geometry:Df},S4=Object.freeze(Object.defineProperty({__proto__:null,author:Nf,default:_4,description:Tf,geometry:Df,license:Mf,name:Cf,roles:zf,typography:If,version:jf,vibe:Pf},Symbol.toStringTag,{value:"Module"})),Af="capsule",Of="1.0.0",Bf="Capsule — modular pill cards on warm bone, Bodoni Moda + Space Grotesk candy palette (frontend-slides bold-template-pack).",Lf="Capsule — cream #F5F5F0, coral/lime/lavender/sky pops, Bodoni Moda + Space Grotesk pills (frontend-slides capsule).",Rf="MIT",Wf="Timur Isachenko",Uf={bg:"#F5F5F0",bg2:"#FFFFFF",text:"#1A1A1A",muted:"#5A5A5A",accent:"#E85D4E",accent2:"#C4D94E",cardBg:"#FFFFFF",border:"#1E1E1E"},Gf={headingFont:"'Bodoni Moda', Georgia, serif",bodyFont:"'Space Grotesk', system-ui, sans-serif",headingWeight:700,googleFonts:["Bodoni+Moda:opsz,wght@6..96,400;700;800","Space+Grotesk:wght@400;500;600;700"]},Hf={radius:"9999px",slideWidth:"1280px"},$4={name:Af,version:Of,extends:"default-tech",description:Bf,vibe:Lf,license:Rf,author:Wf,roles:Uf,typography:Gf,geometry:Hf},F4=Object.freeze(Object.defineProperty({__proto__:null,author:Wf,default:$4,description:Bf,geometry:Hf,license:Rf,name:Af,roles:Uf,typography:Gf,version:Of,vibe:Lf},Symbol.toStringTag,{value:"Module"})),Vf="cartesian",qf="1.0.0",Qf="Cartesian — warm stone + Playfair, 1px taupe draft lines (frontend-slides bold-template-pack).",Yf="Cartesian — sandstone #EDE8E0, Playfair + Inter, taupe hairlines (frontend-slides cartesian).",Kf="MIT",Jf="Timur Isachenko",Xf={bg:"#EDE8E0",bg2:"#E2DBD1",text:"#1A1A1A",muted:"#5A5A5A",accent:"#8A8178",accent2:"#B8B0A4",cardBg:"#E2DBD1",border:"#B8B0A4"},Zf={headingFont:"'Playfair Display', Georgia, serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:400,googleFonts:["Playfair+Display:wght@400;500;600","Inter:wght@400;500;600"]},eg={radius:"0px",slideWidth:"1280px"},E4={name:Vf,version:qf,extends:"default-tech",description:Qf,vibe:Yf,license:Kf,author:Jf,roles:Xf,typography:Zf,geometry:eg},C4=Object.freeze(Object.defineProperty({__proto__:null,author:Jf,default:E4,description:Qf,geometry:eg,license:Kf,name:Vf,roles:Xf,typography:Zf,version:qf,vibe:Yf},Symbol.toStringTag,{value:"Module"})),ng="cobalt-grid",tg="1.0.0",rg="Cobalt Grid — graph-paper canvas, electric cobalt Newsreader, stair-step panels (frontend-slides bold-template-pack).",ag="Cobalt Grid — paper #F0EBDE, cobalt #1F2BE0, Newsreader + Hanken Grotesk (frontend-slides cobalt-grid).",og="MIT",ig="Timur Isachenko",sg={bg:"#F0EBDE",bg2:"#E6E0CE",text:"#1F2BE0",muted:"#5560E5",accent:"#1F2BE0",accent2:"#1F2BE0",cardBg:"rgba(255,255,255,0.55)",border:"rgba(31,43,224,0.18)"},lg={headingFont:"'Newsreader', Georgia, serif",bodyFont:"'Hanken Grotesk', system-ui, sans-serif",headingWeight:600,googleFonts:["Newsreader:opsz,wght@6..72,400;500;600;700","Hanken+Grotesk:wght@400;500;600;700","DM+Mono:wght@400;500"]},cg={radius:"0px",slideWidth:"1280px"},j4={name:ng,version:tg,extends:"default-tech",description:rg,vibe:ag,license:og,author:ig,roles:sg,typography:lg,geometry:cg},T4=Object.freeze(Object.defineProperty({__proto__:null,author:ig,default:j4,description:rg,geometry:cg,license:og,name:ng,roles:sg,typography:lg,version:tg,vibe:ag},Symbol.toStringTag,{value:"Module"})),dg="coral",ug="1.0.0",pg="Coral — cream/coral/ink planes, Bebas Neue caps, 45° hatch (frontend-slides bold-template-pack).",fg="Coral — cream #F5F0E8 + coral #E85D5D on ink #1A1A1A, Bebas Neue + Inter (frontend-slides coral).",gg="MIT",hg="Timur Isachenko",mg={bg:"#F5F0E8",bg2:"#E85D5D",text:"#1A1A1A",muted:"#6B6B6B",accent:"#E85D5D",accent2:"#1A1A1A",cardBg:"#FFFFFF",border:"rgba(26,26,26,0.85)"},bg={headingFont:"'Bebas Neue', sans-serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:400,googleFonts:["Bebas+Neue","Inter:wght@300;400;500;600"]},vg={radius:"0px",slideWidth:"1280px"},P4={name:dg,version:ug,extends:"default-tech",description:pg,vibe:fg,license:gg,author:hg,roles:mg,typography:bg,geometry:vg},M4=Object.freeze(Object.defineProperty({__proto__:null,author:hg,default:P4,description:pg,geometry:vg,license:gg,name:dg,roles:mg,typography:bg,version:ug,vibe:fg},Symbol.toStringTag,{value:"Module"})),yg="corporate",xg="0.1.0",kg="Formal corporate presentation theme with crisp white background and restrained navy/blue palette.",wg="Formal corporate — crisp white, navy text, single restrained blue accent, clean sans-serif, thin rules, minimal shadow.",_g="MIT",Sg="Timur Isachenko",$g={bg:"#ffffff",bg2:"#f8f9fc",text:"#1a2035",muted:"#6b7280",accent:"#1d4ed8",accent2:"#0369a1",cardBg:"#f1f5f9",border:"rgba(0,0,0,0.08)"},Fg={headingFont:"'Inter', system-ui, sans-serif",bodyFont:"'Source Sans 3', system-ui, sans-serif",headingWeight:700,googleFonts:["Inter:wght@400;700","Source+Sans+3:wght@400;600"]},Eg={radius:"8px",slideWidth:"1280px"},N4={name:yg,version:xg,extends:"default-tech",description:kg,vibe:wg,license:_g,author:Sg,roles:$g,typography:Fg,geometry:Eg},z4=Object.freeze(Object.defineProperty({__proto__:null,author:Sg,default:N4,description:kg,geometry:Eg,license:_g,name:yg,roles:$g,typography:Fg,version:xg,vibe:wg},Symbol.toStringTag,{value:"Module"})),Cg="creative-mode",jg="1.0.0",Tg="Creative Mode — cream canvas, hard ink borders, forest/pink/orange/yellow blocks, Archivo Black (frontend-slides).",Pg="Creative Mode — cream #EFE9D9, ink #0F0F0F, green #1F8A4C + pink #F06CA8, Archivo Black + Space Grotesk (frontend-slides creative-mode).",Mg="MIT",Ng="Timur Isachenko",zg={bg:"#EFE9D9",bg2:"#E4DCC4",text:"#0F0F0F",muted:"#2A2A2A",accent:"#E85A1F",accent2:"#F06CA8",cardBg:"#F5C518",border:"rgba(15,15,15,0.95)"},Ig={headingFont:"'Archivo Black', system-ui, sans-serif",bodyFont:"'Space Grotesk', system-ui, sans-serif",headingWeight:400,googleFonts:["Archivo+Black","Space+Grotesk:wght@400;600","JetBrains+Mono:wght@400;500"]},Dg={radius:"0px",slideWidth:"1280px"},I4={name:Cg,version:jg,extends:"default-tech",description:Tg,vibe:Pg,license:Mg,author:Ng,roles:zg,typography:Ig,geometry:Dg},D4=Object.freeze(Object.defineProperty({__proto__:null,author:Ng,default:I4,description:Tg,geometry:Dg,license:Mg,name:Cg,roles:zg,typography:Ig,version:jg,vibe:Pg},Symbol.toStringTag,{value:"Module"})),Ag="creative-voltage",Og="1.0.0",Bg="Creative Voltage — electric blue + neon yellow, Syne + Space Mono (frontend-slides STYLE_PRESETS).",Lg="Creative Voltage — electric blue #0066ff, dark #1a1a2e, neon #d4ff00, Syne + Space Mono (frontend-slides Creative Voltage).",Rg="MIT",Wg="Timur Isachenko",Ug={bg:"#0066ff",bg2:"#1a1a2e",text:"#ffffff",muted:"rgba(255,255,255,0.7)",accent:"#d4ff00",accent2:"#ffffff",cardBg:"rgba(26,26,46,0.55)",border:"rgba(212,255,0,0.45)"},Gg={headingFont:"'Syne', system-ui, sans-serif",bodyFont:"'Space Mono', monospace",headingWeight:800,googleFonts:["Syne:wght@700;800","Space+Mono:wght@400;700"]},Hg={radius:"0px",slideWidth:"1280px"},A4={name:Ag,version:Og,extends:"default-tech",description:Bg,vibe:Lg,license:Rg,author:Wg,roles:Ug,typography:Gg,geometry:Hg},O4=Object.freeze(Object.defineProperty({__proto__:null,author:Wg,default:A4,description:Bg,geometry:Hg,license:Rg,name:Ag,roles:Ug,typography:Gg,version:Og,vibe:Lg},Symbol.toStringTag,{value:"Module"})),Vg="crt-terminal",qg="0.1.0",Qg="CRT phosphor terminal — near-black, acid green glow, cyan accents, monospace.",Yg="CRT terminal — void bg, cream type, phosphor green + cyan accents (matches RetroNet gallery).",Kg="MIT",Jg="Timur Isachenko",Xg={bg:"#06040a",bg2:"#1a1010",text:"#f5f0e8",muted:"#8a8578",accent:"#39ff14",accent2:"#00f5ff",cardBg:"rgba(57,255,20,0.06)",border:"rgba(57,255,20,0.28)"},Zg={headingFont:"'VT323', monospace",bodyFont:"'Share Tech Mono', monospace",headingWeight:400,googleFonts:["VT323","Share+Tech+Mono","Courier+Prime"]},eh={radius:"0px",slideWidth:"1280px"},B4={name:Vg,version:qg,extends:"default-tech",description:Qg,vibe:Yg,license:Kg,author:Jg,roles:Xg,typography:Zg,geometry:eh},L4=Object.freeze(Object.defineProperty({__proto__:null,author:Jg,default:B4,description:Qg,geometry:eh,license:Kg,name:Vg,roles:Xg,typography:Zg,version:qg,vibe:Yg},Symbol.toStringTag,{value:"Module"})),nh="daisy-days",th="1.0.0",rh="Daisy Days — cream pastels, Fredoka One, hard charcoal outlines (frontend-slides bold-template-pack).",ah="Daisy Days — cream #F5F0E6 + turquoise/pink/butter, Fredoka One + Quicksand (frontend-slides daisy-days).",oh="MIT",ih="Timur Isachenko",sh={bg:"#F5F0E6",bg2:"#FFFDF8",text:"#2D2D2D",muted:"#6B6B6B",accent:"#7ECDC0",accent2:"#F7C8D4",cardBg:"#FFFFFF",border:"#2D2D2D"},lh={headingFont:"'Fredoka One', cursive",bodyFont:"'Quicksand', system-ui, sans-serif",headingWeight:400,googleFonts:["Fredoka+One","Quicksand:wght@500;600;700"]},ch={radius:"20px",slideWidth:"1280px"},R4={name:nh,version:th,extends:"default-tech",description:rh,vibe:ah,license:oh,author:ih,roles:sh,typography:lh,geometry:ch},W4=Object.freeze(Object.defineProperty({__proto__:null,author:ih,default:R4,description:rh,geometry:ch,license:oh,name:nh,roles:sh,typography:lh,version:th,vibe:ah},Symbol.toStringTag,{value:"Module"})),dh="dark-botanical",uh="1.0.0",ph="Dark Botanical — Cormorant on near-black with warm pink/gold accents (frontend-slides STYLE_PRESETS).",fh="Dark Botanical — #0f0f0f void, warm #d4a574/#e8b4b8 accents, Cormorant + IBM Plex Sans (frontend-slides Dark Botanical).",gh="MIT",hh="Timur Isachenko",mh={bg:"#0f0f0f",bg2:"#1a1816",text:"#e8e4df",muted:"#9a9590",accent:"#d4a574",accent2:"#e8b4b8",cardBg:"rgba(232,228,223,0.06)",border:"rgba(232,228,223,0.12)"},bh={headingFont:"'Cormorant', Georgia, serif",bodyFont:"'IBM Plex Sans', system-ui, sans-serif",headingWeight:600,googleFonts:["Cormorant:ital,wght@0,400;0,600;1,400;1,600","IBM+Plex+Sans:wght@300;400"]},vh={radius:"0px",slideWidth:"1280px"},U4={name:dh,version:uh,extends:"default-tech",description:ph,vibe:fh,license:gh,author:hh,roles:mh,typography:bh,geometry:vh},G4=Object.freeze(Object.defineProperty({__proto__:null,author:hh,default:U4,description:ph,geometry:vh,license:gh,name:dh,roles:mh,typography:bh,version:uh,vibe:fh},Symbol.toStringTag,{value:"Module"})),yh="data-editorial",xh="0.1.0",kh="Data editorial — white report field, navy + chart red, Source Serif + Inter.",wh="Data editorial — white/#1a1a1a, navy #2b6cb0 + signal #e63946 (matches Signalbox gallery).",_h="MIT",Sh="Timur Isachenko",$h={bg:"#ffffff",bg2:"#f5f5f5",text:"#1a1a1a",muted:"#616161",accent:"#2b6cb0",accent2:"#e63946",cardBg:"rgba(26,26,26,0.03)",border:"rgba(26,26,26,0.12)"},Fh={headingFont:"'Source Serif 4', Georgia, serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:700,googleFonts:["Source+Serif+4:wght@600;700","Inter:wght@400;600"]},Eh={radius:"4px",slideWidth:"1280px"},H4={name:yh,version:xh,extends:"default-tech",description:kh,vibe:wh,license:_h,author:Sh,roles:$h,typography:Fh,geometry:Eh},V4=Object.freeze(Object.defineProperty({__proto__:null,author:Sh,default:H4,description:kh,geometry:Eh,license:_h,name:yh,roles:$h,typography:Fh,version:xh,vibe:wh},Symbol.toStringTag,{value:"Module"})),Ch="developer-dark",jh="0.1.0",Th="Developer dark — GitHub-night canvas, green success, blue links, JetBrains Mono.",Ph="Developer dark — #0d1117, #3fb950 + #58a6ff, JetBrains Mono + Inter (matches Forge gallery).",Mh="MIT",Nh="Timur Isachenko",zh={bg:"#0d1117",bg2:"#161b22",text:"#e6edf3",muted:"#8b949e",accent:"#3fb950",accent2:"#58a6ff",cardBg:"rgba(48,54,61,0.55)",border:"rgba(48,54,61,0.9)"},Ih={headingFont:"'Inter', system-ui, sans-serif",bodyFont:"'JetBrains Mono', monospace",headingWeight:700,googleFonts:["Inter:wght@600;700","JetBrains+Mono:wght@400;600"]},Dh={radius:"8px",slideWidth:"1280px"},q4={name:Ch,version:jh,extends:"default-tech",description:Th,vibe:Ph,license:Mh,author:Nh,roles:zh,typography:Ih,geometry:Dh},Q4=Object.freeze(Object.defineProperty({__proto__:null,author:Nh,default:q4,description:Th,geometry:Dh,license:Mh,name:Ch,roles:zh,typography:Ih,version:jh,vibe:Ph},Symbol.toStringTag,{value:"Module"})),Ah="editorial-forest",Oh="1.0.0",Bh="Editorial Forest — Source Serif 4 on oat-cream with forest green and dusty rose (frontend-slides).",Lh="Editorial Forest — cream #efe7d4, forest #2e4a2a + dusty rose #e89cb1, Source Serif 4 + JetBrains Mono (frontend-slides editorial-forest).",Rh="MIT",Wh="Timur Isachenko",Uh={bg:"#efe7d4",bg2:"#e6dcc4",text:"#1a1a17",muted:"#6a655c",accent:"#2e4a2a",accent2:"#e89cb1",cardBg:"rgba(46,74,42,0.06)",border:"rgba(26,26,23,0.16)"},Gh={headingFont:"'Source Serif 4', 'Source Serif Pro', Georgia, serif",bodyFont:"'Source Serif 4', Georgia, serif",headingWeight:500,googleFonts:["Source+Serif+4:opsz,wght@8..60,500;8..60,600","JetBrains+Mono:wght@400;500"]},Hh={radius:"4px",slideWidth:"1280px"},Y4={name:Ah,version:Oh,extends:"default-tech",description:Bh,vibe:Lh,license:Rh,author:Wh,roles:Uh,typography:Gh,geometry:Hh},K4=Object.freeze(Object.defineProperty({__proto__:null,author:Wh,default:Y4,description:Bh,geometry:Hh,license:Rh,name:Ah,roles:Uh,typography:Gh,version:Oh,vibe:Lh},Symbol.toStringTag,{value:"Module"})),Vh="editorial-serif",qh="0.1.0",Qh="Magazine-editorial theme with warm paper background, ink-black serif text, and a single masthead-crimson accent.",Yh="Print magazine editorial — warm cream paper, near-black serif ink, crimson masthead accent, thin hairline rules, square corners.",Kh="MIT",Jh="Timur Isachenko",Xh={bg:"#faf7f2",bg2:"#f2ede3",text:"#1c1a17",muted:"#5c574c",accent:"#9c1c1c",accent2:"#a67c1e",cardBg:"#f2ede3",border:"rgba(28,26,23,0.12)"},Zh={headingFont:"'Playfair Display', Georgia, serif",bodyFont:"'Source Serif 4', Georgia, serif",headingWeight:700,googleFonts:["Playfair+Display:wght@700;900","Source+Serif+4:wght@400;600"]},e0={radius:"2px",slideWidth:"1280px"},J4={name:Vh,version:qh,extends:"default-tech",description:Qh,vibe:Yh,license:Kh,author:Jh,roles:Xh,typography:Zh,geometry:e0},X4=Object.freeze(Object.defineProperty({__proto__:null,author:Jh,default:J4,description:Qh,geometry:e0,license:Kh,name:Vh,roles:Xh,typography:Zh,version:qh,vibe:Yh},Symbol.toStringTag,{value:"Module"})),n0="editorial-tri-tone",t0="1.0.0",r0="Editorial Tri-Tone — blush pink, golden butter, burgundy wine; Bricolage Grotesque + Instrument Serif (frontend-slides).",a0="Editorial Tri-Tone — pink #F2B6C6, butter #F2D86A, burgundy #7A1F35, Bricolage Grotesque + Instrument Serif (frontend-slides editorial-tri-tone).",o0="MIT",i0="Timur Isachenko",s0={bg:"#F2B6C6",bg2:"#F2D86A",text:"#7A1F35",muted:"rgba(122,31,53,0.65)",accent:"#7A1F35",accent2:"#F2D86A",cardBg:"rgba(242,216,106,0.55)",border:"rgba(122,31,53,0.35)"},l0={headingFont:"'Bricolage Grotesque', system-ui, sans-serif",bodyFont:"'Instrument Serif', Georgia, serif",headingWeight:800,googleFonts:["Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800","Instrument+Serif:ital@0;1","JetBrains+Mono:wght@400;500"]},c0={radius:"0px",slideWidth:"1280px"},Z4={name:n0,version:t0,extends:"default-tech",description:r0,vibe:a0,license:o0,author:i0,roles:s0,typography:l0,geometry:c0},e5=Object.freeze(Object.defineProperty({__proto__:null,author:i0,default:Z4,description:r0,geometry:c0,license:o0,name:n0,roles:s0,typography:l0,version:t0,vibe:a0},Symbol.toStringTag,{value:"Module"})),d0="electric-studio",u0="1.0.0",p0="Electric Studio — split white/blue panels, Manrope, accent bar (frontend-slides STYLE_PRESETS).",f0="Electric Studio — white + #4361ee blue split, Manrope 800, white lead on blue panel (frontend-slides Electric Studio).",g0="MIT",h0="Timur Isachenko",m0={bg:"#ffffff",bg2:"#4361ee",text:"#0a0a0a",muted:"#5a5a5a",accent:"#4361ee",accent2:"#ffffff",cardBg:"rgba(67,97,238,0.08)",border:"rgba(10,10,10,0.12)"},b0={headingFont:"'Manrope', system-ui, sans-serif",bodyFont:"'Manrope', system-ui, sans-serif",headingWeight:800,googleFonts:["Manrope:wght@400;500;800"]},v0={radius:"0px",slideWidth:"1280px"},n5={name:d0,version:u0,extends:"default-tech",description:p0,vibe:f0,license:g0,author:h0,roles:m0,typography:b0,geometry:v0},t5=Object.freeze(Object.defineProperty({__proto__:null,author:h0,default:n5,description:p0,geometry:v0,license:g0,name:d0,roles:m0,typography:b0,version:u0,vibe:f0},Symbol.toStringTag,{value:"Module"})),y0="emerald-editorial",x0="1.0.0",k0="Emerald Editorial — saturated emerald canvas, navy ink, oat paper, Bodoni Moda (frontend-slides bold-template-pack).",w0="Emerald Editorial — emerald #3CD896, navy #0F1A5C, paper #F1E9D6, Bodoni Moda + Manrope (frontend-slides emerald-editorial).",_0="MIT",S0="Timur Isachenko",$0={bg:"#3CD896",bg2:"#2DC684",text:"#0F1A5C",muted:"#3A4593",accent:"#0F1A5C",accent2:"#F1E9D6",cardBg:"#F1E9D6",border:"rgba(15,26,92,0.85)"},F0={headingFont:"'Bodoni Moda', Georgia, serif",bodyFont:"'Manrope', system-ui, sans-serif",headingWeight:900,googleFonts:["Bodoni+Moda:opsz,wght@6..96,400;700;800;900","Manrope:wght@400;500;600;700"]},E0={radius:"0px",slideWidth:"1280px"},r5={name:y0,version:x0,extends:"default-tech",description:k0,vibe:w0,license:_0,author:S0,roles:$0,typography:F0,geometry:E0},a5=Object.freeze(Object.defineProperty({__proto__:null,author:S0,default:r5,description:k0,geometry:E0,license:_0,name:y0,roles:$0,typography:F0,version:x0,vibe:w0},Symbol.toStringTag,{value:"Module"})),C0="fintech-clean",j0="0.1.0",T0="Fintech clean — near-white, Stripe-like violet accent, mint success, Inter.",P0="Fintech clean — #fbfbfd, violet #635bff + mint #00d4b1, Inter (matches Ledgerline gallery).",M0="MIT",N0="Timur Isachenko",z0={bg:"#fbfbfd",bg2:"#f0eeff",text:"#0a0a0a",muted:"#6b7280",accent:"#635bff",accent2:"#00d4b1",cardBg:"#ffffff",border:"rgba(99,91,255,0.18)"},I0={headingFont:"'Inter', system-ui, sans-serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:700,googleFonts:["Inter:wght@400;600;700"]},D0={radius:"12px",slideWidth:"1280px"},o5={name:C0,version:j0,extends:"default-tech",description:T0,vibe:P0,license:M0,author:N0,roles:z0,typography:I0,geometry:D0},i5=Object.freeze(Object.defineProperty({__proto__:null,author:N0,default:o5,description:T0,geometry:D0,license:M0,name:C0,roles:z0,typography:I0,version:j0,vibe:P0},Symbol.toStringTag,{value:"Module"})),A0="ft-editorial",O0="0.1.0",B0="Financial Times–inspired broadsheet — warm paper, ink, FT blue + signal red.",L0="FT editorial — #f7f5f0 newsprint, Libre Baskerville + IBM Plex, FT blue + signal red (matches Meridian gallery).",R0="MIT",W0="Timur Isachenko",U0={bg:"#f7f5f0",bg2:"#f2efe8",text:"#0a0a0a",muted:"#6b6560",accent:"#1a4fd8",accent2:"#c0392b",cardBg:"rgba(10,10,10,0.03)",border:"rgba(10,10,10,0.12)"},G0={headingFont:"'Libre Baskerville', Georgia, serif",bodyFont:"'IBM Plex Sans', system-ui, sans-serif",headingWeight:700,googleFonts:["Libre+Baskerville:wght@400;700","IBM+Plex+Sans:wght@400;600","IBM+Plex+Mono:wght@500"]},H0={radius:"0px",slideWidth:"1280px"},s5={name:A0,version:O0,extends:"default-tech",description:B0,vibe:L0,license:R0,author:W0,roles:U0,typography:G0,geometry:H0},l5=Object.freeze(Object.defineProperty({__proto__:null,author:W0,default:s5,description:B0,geometry:H0,license:R0,name:A0,roles:U0,typography:G0,version:O0,vibe:L0},Symbol.toStringTag,{value:"Module"})),V0="genz-bento",q0="0.1.0",Q0="Gen-Z hard-shadow bento — hot coral, lime stickers, chunky ink borders.",Y0="Gen-Z bento — #fff9f5, coral #ff4d2e + lime #b6f542, Nunito hard shadows (matches Bounce gallery).",K0="MIT",J0="Timur Isachenko",X0={bg:"#fff9f5",bg2:"#fff3ea",text:"#0f0f1a",muted:"#5c5666",accent:"#ff4d2e",accent2:"#b6f542",cardBg:"#ffffff",border:"#0f0f1a"},Z0={headingFont:"'Nunito', system-ui, sans-serif",bodyFont:"'Nunito Sans', system-ui, sans-serif",headingWeight:900,googleFonts:["Nunito:wght@700;800;900","Nunito+Sans:wght@400;600"]},em={radius:"18px",slideWidth:"1280px"},c5={name:V0,version:q0,extends:"default-tech",description:Q0,vibe:Y0,license:K0,author:J0,roles:X0,typography:Z0,geometry:em},d5=Object.freeze(Object.defineProperty({__proto__:null,author:J0,default:c5,description:Q0,geometry:em,license:K0,name:V0,roles:X0,typography:Z0,version:q0,vibe:Y0},Symbol.toStringTag,{value:"Module"})),nm="glassmorphism",tm="0.1.0",rm="Soft glassmorphism — icy lavender field, indigo + cyan accents, Plus Jakarta Sans.",am="Glassmorphism — #f8f9ff mist, indigo #5b6af5 + cyan #22d3ee, Plus Jakarta Sans (matches CloudPeak gallery).",om="MIT",im="Timur Isachenko",sm={bg:"#f8f9ff",bg2:"#f0f3fd",text:"#0f1333",muted:"#7880a4",accent:"#5b6af5",accent2:"#22d3ee",cardBg:"rgba(255,255,255,0.72)",border:"rgba(91,106,245,0.22)"},lm={headingFont:"'Plus Jakarta Sans', system-ui, sans-serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:700,googleFonts:["Plus+Jakarta+Sans:wght@500;700","Inter:wght@400;600"]},cm={radius:"20px",slideWidth:"1280px"},u5={name:nm,version:tm,extends:"default-tech",description:rm,vibe:am,license:om,author:im,roles:sm,typography:lm,geometry:cm},p5=Object.freeze(Object.defineProperty({__proto__:null,author:im,default:u5,description:rm,geometry:cm,license:om,name:nm,roles:sm,typography:lm,version:tm,vibe:am},Symbol.toStringTag,{value:"Module"})),dm="grove",um="1.0.0",pm="Grove — forest green monograph, Playfair 400 + rust accent (frontend-slides bold-template-pack).",fm="Grove — #192B1B forest + #D4CFBF cream + #C8524A rust, Playfair + Jost (frontend-slides grove).",gm="MIT",hm="Timur Isachenko",mm={bg:"#192B1B",bg2:"#1E3221",text:"#D4CFBF",muted:"rgba(212,207,191,0.6)",accent:"#C8524A",accent2:"#E8E4D6",cardBg:"#1E3221",border:"rgba(212,207,191,0.12)"},bm={headingFont:"'Playfair Display', Georgia, serif",bodyFont:"'Jost', system-ui, sans-serif",headingWeight:400,googleFonts:["Playfair+Display:ital,wght@0,400;1,400","Jost:wght@300;400;500","JetBrains+Mono:wght@300"]},vm={radius:"0px",slideWidth:"1280px"},f5={name:dm,version:um,extends:"default-tech",description:pm,vibe:fm,license:gm,author:hm,roles:mm,typography:bm,geometry:vm},g5=Object.freeze(Object.defineProperty({__proto__:null,author:hm,default:f5,description:pm,geometry:vm,license:gm,name:dm,roles:mm,typography:bm,version:um,vibe:fm},Symbol.toStringTag,{value:"Module"})),ym="heritage-editorial",xm="0.1.0",km="Heritage editorial — warm parchment, terracotta blush, Playfair + Cormorant serif.",wm="Heritage editorial — #f4efe9 parchment, terracotta #c98b7a, Playfair Display (matches Atelier No. 9 gallery).",_m="MIT",Sm="Timur Isachenko",$m={bg:"#f4efe9",bg2:"#ede6dd",text:"#16130f",muted:"#9c8b7e",accent:"#c98b7a",accent2:"#a07854",cardBg:"rgba(22,19,15,0.04)",border:"rgba(22,19,15,0.12)"},Fm={headingFont:"'Playfair Display', Georgia, serif",bodyFont:"'DM Sans', system-ui, sans-serif",headingWeight:700,googleFonts:["Playfair+Display:wght@500;700","Cormorant+Garamond:wght@500;600","DM+Sans:wght@400;600"]},Em={radius:"6px",slideWidth:"1280px"},h5={name:ym,version:xm,extends:"default-tech",description:km,vibe:wm,license:_m,author:Sm,roles:$m,typography:Fm,geometry:Em},m5=Object.freeze(Object.defineProperty({__proto__:null,author:Sm,default:h5,description:km,geometry:Em,license:_m,name:ym,roles:$m,typography:Fm,version:xm,vibe:wm},Symbol.toStringTag,{value:"Module"})),Cm="kinetic-wrapped",jm="0.1.0",Tm="Kinetic Wrapped — acid lime on black, Archivo Black, year-in-review energy.",Pm="Kinetic Wrapped — black + #c8ff00 acid lime, Archivo Black (matches Pulse gallery).",Mm="MIT",Nm="Timur Isachenko",zm={bg:"#0a0a0a",bg2:"#0d0d0d",text:"#ffffff",muted:"#888888",accent:"#c8ff00",accent2:"#ff00cc",cardBg:"rgba(200,255,0,0.08)",border:"rgba(200,255,0,0.4)"},Im={headingFont:"'Archivo Black', system-ui, sans-serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:400,googleFonts:["Archivo+Black","Inter:wght@400;600"]},Dm={radius:"0px",slideWidth:"1280px"},b5={name:Cm,version:jm,extends:"default-tech",description:Tm,vibe:Pm,license:Mm,author:Nm,roles:zm,typography:Im,geometry:Dm},v5=Object.freeze(Object.defineProperty({__proto__:null,author:Nm,default:b5,description:Tm,geometry:Dm,license:Mm,name:Cm,roles:zm,typography:Im,version:jm,vibe:Pm},Symbol.toStringTag,{value:"Module"})),Am="long-table",Om="1.0.0",Bm="Long Table — single-ink rust on cream supper club (frontend-slides bold-template-pack).",Lm="Long Table — cream #FAF1E2 + rust #B53D2A, Bricolage Grotesque + Fraunces (frontend-slides long-table).",Rm="MIT",Wm="Timur Isachenko",Um={bg:"#FAF1E2",bg2:"#F2E5CF",text:"#B53D2A",muted:"rgba(181,61,42,0.78)",accent:"#B53D2A",accent2:"#8E2D1F",cardBg:"#F2E5CF",border:"rgba(181,61,42,0.5)"},Gm={headingFont:"'Bricolage Grotesque', sans-serif",bodyFont:"'Fraunces', Georgia, serif",headingWeight:800,googleFonts:["Bricolage+Grotesque:wght@700;800","Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,400"]},Hm={radius:"9999px",slideWidth:"1280px"},y5={name:Am,version:Om,extends:"default-tech",description:Bm,vibe:Lm,license:Rm,author:Wm,roles:Um,typography:Gm,geometry:Hm},x5=Object.freeze(Object.defineProperty({__proto__:null,author:Wm,default:y5,description:Bm,geometry:Hm,license:Rm,name:Am,roles:Um,typography:Gm,version:Om,vibe:Lm},Symbol.toStringTag,{value:"Module"})),Vm="luxury-minimalist",qm="0.1.0",Qm="Luxury minimalist theme with warm off-white canvas, dark charcoal, hairline borders, and no gradients.",Ym="Luxury minimalist — warm off-white canvas, dark charcoal text, near-zero decoration, generous whitespace, thin serif display, hairline borders, no gradients.",Km="MIT",Jm="Timur Isachenko",Xm={bg:"#faf8f5",bg2:"#f5f2ee",text:"#1c1917",muted:"#78716c",accent:"#92400e",accent2:"#b45309",cardBg:"rgba(28,25,23,0.03)",border:"rgba(28,25,23,0.10)"},Zm={headingFont:"'Cormorant Garamond', Georgia, serif",bodyFont:"'DM Sans', system-ui, sans-serif",headingWeight:600,googleFonts:["Cormorant+Garamond:wght@400;600","DM+Sans:wght@400;500"]},eb={radius:"4px",slideWidth:"1280px"},k5={name:Vm,version:qm,extends:"default-tech",description:Qm,vibe:Ym,license:Km,author:Jm,roles:Xm,typography:Zm,geometry:eb},w5=Object.freeze(Object.defineProperty({__proto__:null,author:Jm,default:k5,description:Qm,geometry:eb,license:Km,name:Vm,roles:Xm,typography:Zm,version:qm,vibe:Ym},Symbol.toStringTag,{value:"Module"})),nb="mat",tb="1.0.0",rb="Mat — dark sage + wood glow, Bricolage + burnt orange (frontend-slides bold-template-pack).",ab="Mat — sage #232E26 + cream #F0E8D2 + orange #C07030, Bricolage + DM Sans (frontend-slides mat).",ob="MIT",ib="Timur Isachenko",sb={bg:"#232E26",bg2:"#2E3D30",text:"#F0E8D2",muted:"rgba(240,232,210,0.58)",accent:"#C07030",accent2:"#7A4E24",cardBg:"#EDE6D0",border:"rgba(240,232,210,0.12)"},lb={headingFont:"'Bricolage Grotesque', sans-serif",bodyFont:"'DM Sans', system-ui, sans-serif",headingWeight:800,googleFonts:["Bricolage+Grotesque:wght@600;700;800","DM+Sans:wght@400;500;600","DM+Mono:wght@400"]},cb={radius:"0px",slideWidth:"1280px"},_5={name:nb,version:tb,extends:"default-tech",description:rb,vibe:ab,license:ob,author:ib,roles:sb,typography:lb,geometry:cb},S5=Object.freeze(Object.defineProperty({__proto__:null,author:ib,default:_5,description:rb,geometry:cb,license:ob,name:nb,roles:sb,typography:lb,version:tb,vibe:ab},Symbol.toStringTag,{value:"Module"})),db="monochrome",ub="1.0.0",pb="Monochrome — ivory ledger, ultra-light Jost, no chromatic accents (frontend-slides bold-template-pack).",fb="Monochrome — ivory #FAFADF + ink #1A1A16, Jost 200 + Lora italic (frontend-slides monochrome).",gb="MIT",hb="Timur Isachenko",mb={bg:"#FAFADF",bg2:"#F5F0E4",text:"#1A1A16",muted:"#5E5E54",accent:"#1A1A16",accent2:"#8A8A80",cardBg:"#F5F0E4",border:"rgba(26,26,22,0.18)"},bb={headingFont:"'Jost', system-ui, sans-serif",bodyFont:"'Jost', system-ui, sans-serif",headingWeight:200,googleFonts:["Jost:wght@200;300;400;500","Lora:ital,wght@0,400;0,500;1,400","JetBrains+Mono:wght@400"]},vb={radius:"16px",slideWidth:"1280px"},$5={name:db,version:ub,extends:"default-tech",description:pb,vibe:fb,license:gb,author:hb,roles:mb,typography:bb,geometry:vb},F5=Object.freeze(Object.defineProperty({__proto__:null,author:hb,default:$5,description:pb,geometry:vb,license:gb,name:db,roles:mb,typography:bb,version:ub,vibe:fb},Symbol.toStringTag,{value:"Module"})),yb="neo-grid-bold",xb="1.0.0",kb="Neo-Grid Bold — putty ecru, ink black, electric lemon panels, Space Grotesk uppercase (frontend-slides).",wb="Neo-Grid Bold — putty #ECECE8, lemon #E6FF3D, Space Grotesk uppercase + JetBrains Mono (frontend-slides neo-grid-bold).",_b="MIT",Sb="Timur Isachenko",$b={bg:"#ECECE8",bg2:"#F5F4EF",text:"#0A0A0A",muted:"#8A8A85",accent:"#E6FF3D",accent2:"#0A0A0A",cardBg:"#F5F4EF",border:"rgba(10,10,10,0.85)"},Fb={headingFont:"'Space Grotesk', Helvetica Neue, Arial, sans-serif",bodyFont:"'JetBrains Mono', monospace",headingWeight:700,googleFonts:["Space+Grotesk:wght@500;700","JetBrains+Mono:wght@400;500"]},Eb={radius:"0px",slideWidth:"1280px"},E5={name:yb,version:xb,extends:"default-tech",description:kb,vibe:wb,license:_b,author:Sb,roles:$b,typography:Fb,geometry:Eb},C5=Object.freeze(Object.defineProperty({__proto__:null,author:Sb,default:E5,description:kb,geometry:Eb,license:_b,name:yb,roles:$b,typography:Fb,version:xb,vibe:wb},Symbol.toStringTag,{value:"Module"})),Cb="neon-noir",jb="0.1.0",Tb="Neon noir — wet asphalt night, hot magenta + electric cyan, cinematic rain.",Pb="Neon noir — #050510 night, hot pink #ff2e97 + cyan #00e5ff, Orbitron (matches Neon District gallery).",Mb="MIT",Nb="Timur Isachenko",zb={bg:"#050510",bg2:"#0a0a1e",text:"#e8e4f0",muted:"#8884a8",accent:"#ff2e97",accent2:"#00e5ff",cardBg:"rgba(255,46,151,0.07)",border:"rgba(0,229,255,0.22)"},Ib={headingFont:"'Orbitron', system-ui, sans-serif",bodyFont:"'Share Tech Mono', monospace",headingWeight:700,googleFonts:["Orbitron:wght@600;700","Share+Tech+Mono"]},Db={radius:"10px",slideWidth:"1280px"},j5={name:Cb,version:jb,extends:"default-tech",description:Tb,vibe:Pb,license:Mb,author:Nb,roles:zb,typography:Ib,geometry:Db},T5=Object.freeze(Object.defineProperty({__proto__:null,author:Nb,default:j5,description:Tb,geometry:Db,license:Mb,name:Cb,roles:zb,typography:Ib,version:jb,vibe:Pb},Symbol.toStringTag,{value:"Module"})),Ab="notebook-tabs",Ob="1.0.0",Bb="Notebook Tabs — cream paper card on dark with mint/lavender/pink tabs, Bodoni Moda (frontend-slides STYLE_PRESETS).",Lb="Notebook Tabs — page #f8f6f1 on outer #2d2d2d, Bodoni Moda + DM Sans, pastel tabs (frontend-slides Notebook Tabs).",Rb="MIT",Wb="Timur Isachenko",Ub={bg:"#f8f6f1",bg2:"#efece4",text:"#1a1a1a",muted:"#5c574c",accent:"#98d4bb",accent2:"#c7b8ea",cardBg:"#ffffff",border:"rgba(26,26,26,0.12)"},Gb={headingFont:"'Bodoni Moda', Georgia, serif",bodyFont:"'DM Sans', system-ui, sans-serif",headingWeight:700,googleFonts:["Bodoni+Moda:opsz,wght@6..96,400;6..96,700","DM+Sans:wght@400;500"]},Hb={radius:"12px",slideWidth:"1280px"},P5={name:Ab,version:Ob,extends:"default-tech",description:Bb,vibe:Lb,license:Rb,author:Wb,roles:Ub,typography:Gb,geometry:Hb},M5=Object.freeze(Object.defineProperty({__proto__:null,author:Wb,default:P5,description:Bb,geometry:Hb,license:Rb,name:Ab,roles:Ub,typography:Gb,version:Ob,vibe:Lb},Symbol.toStringTag,{value:"Module"})),Vb="paper-ink",qb="1.0.0",Qb="Paper & Ink — Cormorant Garamond + Source Serif 4 on warm cream with crimson accent (frontend-slides STYLE_PRESETS).",Yb="Paper & Ink — cream #faf9f7, charcoal #1a1a1a, crimson #c41e3a, Cormorant Garamond + Source Serif 4 (frontend-slides Paper & Ink).",Kb="MIT",Jb="Timur Isachenko",Xb={bg:"#faf9f7",bg2:"#f0eeea",text:"#1a1a1a",muted:"#5c574c",accent:"#c41e3a",accent2:"#1a1a1a",cardBg:"#ffffff",border:"rgba(26,26,26,0.15)"},Zb={headingFont:"'Cormorant Garamond', Garamond, Georgia, serif",bodyFont:"'Source Serif 4', Georgia, serif",headingWeight:600,googleFonts:["Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500","Source+Serif+4:opsz,wght@8..60,400;8..60,600"]},ev={radius:"0px",slideWidth:"1280px"},N5={name:Vb,version:qb,extends:"default-tech",description:Qb,vibe:Yb,license:Kb,author:Jb,roles:Xb,typography:Zb,geometry:ev},z5=Object.freeze(Object.defineProperty({__proto__:null,author:Jb,default:N5,description:Qb,geometry:ev,license:Kb,name:Vb,roles:Xb,typography:Zb,version:qb,vibe:Yb},Symbol.toStringTag,{value:"Module"})),nv="pastel-dreamy",tv="0.1.0",rv="Soft pastel theme with lavender-blush background, deep plum text, and a blush/periwinkle accent pair.",av="Soft pastel dreamy — lavender-blush bg, deep plum text for readability, blush-pink + periwinkle accent pair, generously rounded, gentle.",ov="MIT",iv="Timur Isachenko",sv={bg:"#fdf6fb",bg2:"#f5ecf9",text:"#3a2e4d",muted:"#6b5d82",accent:"#e893c2",accent2:"#8ab4f8",cardBg:"#f5ecf9",border:"rgba(58,46,77,0.10)"},lv={headingFont:"'Quicksand', system-ui, sans-serif",bodyFont:"'Mulish', system-ui, sans-serif",headingWeight:700,googleFonts:["Quicksand:wght@500;700","Mulish:wght@400;600"]},cv={radius:"28px",slideWidth:"1280px"},I5={name:nv,version:tv,extends:"default-tech",description:rv,vibe:av,license:ov,author:iv,roles:sv,typography:lv,geometry:cv},D5=Object.freeze(Object.defineProperty({__proto__:null,author:iv,default:I5,description:rv,geometry:cv,license:ov,name:nv,roles:sv,typography:lv,version:tv,vibe:av},Symbol.toStringTag,{value:"Module"})),dv="pastel-geometry",uv="1.0.0",pv="Pastel Geometry — Plus Jakarta Sans on sky pastel with vertical edge pills (frontend-slides STYLE_PRESETS).",fv="Pastel Geometry — sky #c8d9e6, card #faf9f7, vertical pastel pills, Plus Jakarta Sans (frontend-slides Pastel Geometry).",gv="MIT",hv="Timur Isachenko",mv={bg:"#c8d9e6",bg2:"#b8cddd",text:"#1a1a1a",muted:"#5a7c6a",accent:"#f0b4d4",accent2:"#9b8dc4",cardBg:"#faf9f7",border:"rgba(26,26,26,0.1)"},bv={headingFont:"'Plus Jakarta Sans', system-ui, sans-serif",bodyFont:"'Plus Jakarta Sans', system-ui, sans-serif",headingWeight:800,googleFonts:["Plus+Jakarta+Sans:wght@400;500;700;800"]},vv={radius:"24px",slideWidth:"1280px"},A5={name:dv,version:uv,extends:"default-tech",description:pv,vibe:fv,license:gv,author:hv,roles:mv,typography:bv,geometry:vv},O5=Object.freeze(Object.defineProperty({__proto__:null,author:hv,default:A5,description:pv,geometry:vv,license:gv,name:dv,roles:mv,typography:bv,version:uv,vibe:fv},Symbol.toStringTag,{value:"Module"})),yv="peoples-platform",xv="1.0.0",kv="People's Platform — WPA poster energy, Alfa Slab + red text-shadow (frontend-slides bold-template-pack).",wv="People's Platform — paper #F5F2EA, cobalt #2C2CDC, amber #F2A03A, Alfa Slab One (frontend-slides peoples-platform).",_v="MIT",Sv="Timur Isachenko",$v={bg:"#F5F2EA",bg2:"#F4E9D6",text:"#0E0E14",muted:"#1B1BB0",accent:"#2C2CDC",accent2:"#F2A03A",cardBg:"#FFFFFF",border:"#0E0E14"},Fv={headingFont:"'Alfa Slab One', serif",bodyFont:"'Archivo Narrow', system-ui, sans-serif",headingWeight:400,googleFonts:["Alfa+Slab+One","Caveat+Brush","Archivo+Narrow:wght@400;600;700","DM+Mono:wght@500"]},Ev={radius:"0px",slideWidth:"1280px"},B5={name:yv,version:xv,extends:"default-tech",description:kv,vibe:wv,license:_v,author:Sv,roles:$v,typography:Fv,geometry:Ev},L5=Object.freeze(Object.defineProperty({__proto__:null,author:Sv,default:B5,description:kv,geometry:Ev,license:_v,name:yv,roles:$v,typography:Fv,version:xv,vibe:wv},Symbol.toStringTag,{value:"Module"})),Cv="pin-and-paper",jv="1.0.0",Tv="Pin & Paper — yellow legal-pad field with cobalt ink, Space Grotesk + Caveat (frontend-slides).",Pv="Pin & Paper — legal pad #EFE56A, cobalt #1F3A8A, Space Grotesk + Caveat (frontend-slides pin-and-paper).",Mv="MIT",Nv="Timur Isachenko",zv={bg:"#EFE56A",bg2:"#F5ECA0",text:"#1F3A8A",muted:"#3457C4",accent:"#C2342B",accent2:"#D8702A",cardBg:"#F8F1D6",border:"rgba(31,58,138,0.22)"},Iv={headingFont:"'Space Grotesk', Helvetica Neue, Arial, sans-serif",bodyFont:"'Space Grotesk', system-ui, sans-serif",headingWeight:700,googleFonts:["Space+Grotesk:wght@500;700","Caveat:wght@500;700","DM+Mono:wght@400;500"]},Dv={radius:"8px",slideWidth:"1280px"},R5={name:Cv,version:jv,extends:"default-tech",description:Tv,vibe:Pv,license:Mv,author:Nv,roles:zv,typography:Iv,geometry:Dv},W5=Object.freeze(Object.defineProperty({__proto__:null,author:Nv,default:R5,description:Tv,geometry:Dv,license:Mv,name:Cv,roles:zv,typography:Iv,version:jv,vibe:Pv},Symbol.toStringTag,{value:"Module"})),Av="pink-script",Ov="1.0.0",Bv="Pink Script (After Hours) — near-black canvas, fuchsia accent, pearl paper, DM Serif Display (frontend-slides bold-template-pack).",Lv="Pink Script — ink #060507, pink #ED3D8C, blush paper #F5EDF1, DM Serif Display + Inter (frontend-slides pink-script).",Rv="MIT",Wv="Timur Isachenko",Uv={bg:"#060507",bg2:"#0F0D11",text:"#F5EDF1",muted:"rgba(245,237,241,0.55)",accent:"#ED3D8C",accent2:"#FF66A8",cardBg:"rgba(245,237,241,0.06)",border:"rgba(237,61,140,0.32)"},Gv={headingFont:"'DM Serif Display', Georgia, serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:400,googleFonts:["DM+Serif+Display:ital@0;1","Inter:wght@300;400;500;600","JetBrains+Mono:wght@400;500"]},Hv={radius:"0px",slideWidth:"1280px"},U5={name:Av,version:Ov,extends:"default-tech",description:Bv,vibe:Lv,license:Rv,author:Wv,roles:Uv,typography:Gv,geometry:Hv},G5=Object.freeze(Object.defineProperty({__proto__:null,author:Wv,default:U5,description:Bv,geometry:Hv,license:Rv,name:Av,roles:Uv,typography:Gv,version:Ov,vibe:Lv},Symbol.toStringTag,{value:"Module"})),Vv="playful",qv="0.1.0",Qv="Playful creative-agency theme with bold coral and lime accents, rounded corners, and sticker-style energy.",Yv="Playful creative agency — bright warm white, bold coral + lime accent pair, rounded everything, big type, sticker-style shadows.",Kv="MIT",Jv="Timur Isachenko",Xv={bg:"#fffbf0",bg2:"#fff9e6",text:"#1a1a2e",muted:"#6b6b8a",accent:"#ff4757",accent2:"#2ed573",cardBg:"rgba(255,71,87,0.06)",border:"rgba(255,71,87,0.15)"},Zv={headingFont:"'Nunito', system-ui, sans-serif",bodyFont:"'Nunito', system-ui, sans-serif",headingWeight:800,googleFonts:["Nunito:wght@400;700;800"]},ey={radius:"24px",slideWidth:"1280px"},H5={name:Vv,version:qv,extends:"default-tech",description:Qv,vibe:Yv,license:Kv,author:Jv,roles:Xv,typography:Zv,geometry:ey},V5=Object.freeze(Object.defineProperty({__proto__:null,author:Jv,default:H5,description:Qv,geometry:ey,license:Kv,name:Vv,roles:Xv,typography:Zv,version:qv,vibe:Yv},Symbol.toStringTag,{value:"Module"})),ny="raw-grid",ty="1.0.0",ry="Raw Grid — 3px black borders as layout, system sans 900 (frontend-slides bold-template-pack).",ay="Raw Grid — white + #0A0A0A borders, blush #F2D4CF / sage #E5EDD6 (frontend-slides raw-grid).",oy="MIT",iy="Timur Isachenko",sy={bg:"#FFFFFF",bg2:"#F5F5F5",text:"#0A0A0A",muted:"#333333",accent:"#F2D4CF",accent2:"#E5EDD6",cardBg:"#FFFFFF",border:"#0A0A0A"},ly={headingFont:"'Segoe UI', system-ui, -apple-system, Helvetica, Arial, sans-serif",bodyFont:"'Segoe UI', system-ui, -apple-system, Helvetica, Arial, sans-serif",headingWeight:900,googleFonts:[]},cy={radius:"0px",slideWidth:"1280px"},q5={name:ny,version:ty,extends:"default-tech",description:ry,vibe:ay,license:oy,author:iy,roles:sy,typography:ly,geometry:cy},Q5=Object.freeze(Object.defineProperty({__proto__:null,author:iy,default:q5,description:ry,geometry:cy,license:oy,name:ny,roles:sy,typography:ly,version:ty,vibe:ay},Symbol.toStringTag,{value:"Module"})),dy="retro-arcade",uy="0.1.0",py="Retro 80s arcade theme with deep purple-black background, magenta and cyan neon accents, and pixel display fonts.",fy="Retro 80s arcade — deep purple-black bg, magenta + electric cyan neon, glow text-shadow, pixel display font, scanline feel.",gy="MIT",hy="Timur Isachenko",my={bg:"#0d0015",bg2:"#150025",text:"#e0e0ff",muted:"#9090cc",accent:"#ff00ff",accent2:"#00ffff",cardBg:"rgba(255,0,255,0.08)",border:"rgba(0,255,255,0.20)"},by={headingFont:"'Orbitron', system-ui, sans-serif",bodyFont:"'Share Tech Mono', monospace",headingWeight:700,googleFonts:["Orbitron:wght@400;700","Share+Tech+Mono"]},vy={radius:"0px",slideWidth:"1280px"},Y5={name:dy,version:uy,extends:"default-tech",description:py,vibe:fy,license:gy,author:hy,roles:my,typography:by,geometry:vy},K5=Object.freeze(Object.defineProperty({__proto__:null,author:hy,default:Y5,description:py,geometry:vy,license:gy,name:dy,roles:my,typography:by,version:uy,vibe:fy},Symbol.toStringTag,{value:"Module"})),yy="retro-windows",xy="1.0.0",ky="Retro Windows — Win95 beveled chrome, navy title bar (frontend-slides bold-template-pack).",wy="Retro Windows — #C0C0C0 gray, navy #000080 title bar, MS Sans / Press Start 2P (frontend-slides retro-windows).",_y="MIT",Sy="Timur Isachenko",$y={bg:"#C0C0C0",bg2:"#D4D0C8",text:"#222222",muted:"#555555",accent:"#000080",accent2:"#008080",cardBg:"#FFFFFF",border:"#000000"},Fy={headingFont:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",bodyFont:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",headingWeight:700,googleFonts:["Press+Start+2P","VT323"]},Ey={radius:"0px",slideWidth:"1280px"},J5={name:yy,version:xy,extends:"default-tech",description:ky,vibe:wy,license:_y,author:Sy,roles:$y,typography:Fy,geometry:Ey},X5=Object.freeze(Object.defineProperty({__proto__:null,author:Sy,default:J5,description:ky,geometry:Ey,license:_y,name:yy,roles:$y,typography:Fy,version:xy,vibe:wy},Symbol.toStringTag,{value:"Module"})),Cy="retro-zine",jy="1.0.0",Ty="Retro Zine — khaki paper, forest green, Bebas Neue + Caveat (frontend-slides bold-template-pack).",Py="Retro Zine — khaki #C8B99A + green #008F4D, Bebas Neue + Space Grotesk (frontend-slides retro-zine).",My="MIT",Ny="Timur Isachenko",zy={bg:"#C8B99A",bg2:"#B8A98A",text:"#1A1A1A",muted:"#008F4D",accent:"#008F4D",accent2:"#00A85D",cardBg:"#F4EFE6",border:"#1A1A1A"},Iy={headingFont:"'Bebas Neue', sans-serif",bodyFont:"'Space Grotesk', system-ui, sans-serif",headingWeight:400,googleFonts:["Bebas+Neue","Space+Grotesk:wght@300;400;500","Caveat:wght@400;600"]},Dy={radius:"0px",slideWidth:"1280px"},Z5={name:Cy,version:jy,extends:"default-tech",description:Ty,vibe:Py,license:My,author:Ny,roles:zy,typography:Iy,geometry:Dy},e8=Object.freeze(Object.defineProperty({__proto__:null,author:Ny,default:Z5,description:Ty,geometry:Dy,license:My,name:Cy,roles:zy,typography:Iy,version:jy,vibe:Py},Symbol.toStringTag,{value:"Module"})),Ay="risograph-zine",Oy="0.1.0",By="Risograph zine — warm paper, misregistered ink, magenta + teal print shop energy.",Ly="Risograph zine — kraft #f3ecdd, red #ff4f4f + blue #2b3aff overprint (matches Inkwell gallery).",Ry="MIT",Wy="Timur Isachenko",Uy={bg:"#f3ecdd",bg2:"#e8dfc8",text:"#1a1209",muted:"#7a6a52",accent:"#ff4f4f",accent2:"#2b3aff",cardBg:"rgba(255,79,79,0.06)",border:"rgba(26,18,9,0.18)"},Gy={headingFont:"'Archivo Black', system-ui, sans-serif",bodyFont:"'Space Mono', monospace",headingWeight:400,googleFonts:["Archivo+Black","Space+Mono:wght@400;700"]},Hy={radius:"2px",slideWidth:"1280px"},n8={name:Ay,version:Oy,extends:"default-tech",description:By,vibe:Ly,license:Ry,author:Wy,roles:Uy,typography:Gy,geometry:Hy},t8=Object.freeze(Object.defineProperty({__proto__:null,author:Wy,default:n8,description:By,geometry:Hy,license:Ry,name:Ay,roles:Uy,typography:Gy,version:Oy,vibe:Ly},Symbol.toStringTag,{value:"Module"})),Vy="sakura-chroma",qy="1.0.0",Qy="Sakura Chroma — cream paper cassette aesthetic, Big Shoulders Display, six-color chroma (frontend-slides bold-template-pack).",Yy="Sakura Chroma — paper #F1E6CB, ink #3A2516, red/pink/orange/green/blue/yellow stamps, Big Shoulders Display + Albert Sans (frontend-slides sakura-chroma).",Ky="MIT",Jy="Timur Isachenko",Xy={bg:"#F1E6CB",bg2:"#E5D6B0",text:"#3A2516",muted:"#6B5340",accent:"#E5392A",accent2:"#E54489",cardBg:"#FFF8E8",border:"rgba(58,37,22,0.85)"},Zy={headingFont:"'Big Shoulders Display', Impact, sans-serif",bodyFont:"'Albert Sans', system-ui, sans-serif",headingWeight:900,googleFonts:["Big+Shoulders+Display:wght@700;800;900","Albert+Sans:wght@400;500;600;700","JetBrains+Mono:wght@400;500"]},ex={radius:"4px",slideWidth:"1280px"},r8={name:Vy,version:qy,extends:"default-tech",description:Qy,vibe:Yy,license:Ky,author:Jy,roles:Xy,typography:Zy,geometry:ex},a8=Object.freeze(Object.defineProperty({__proto__:null,author:Jy,default:r8,description:Qy,geometry:ex,license:Ky,name:Vy,roles:Xy,typography:Zy,version:qy,vibe:Yy},Symbol.toStringTag,{value:"Module"})),nx="scandinavian",tx="0.1.0",rx="Scandinavian hygge — warm linen, sage green, soft clay, Fraunces + Work Sans.",ax="Scandinavian — #efe9df linen, sage #9caf88 + clay #c9826b (matches Hygge gallery).",ox="MIT",ix="Timur Isachenko",sx={bg:"#efe9df",bg2:"#e6ddd1",text:"#2b2926",muted:"#7a7470",accent:"#9caf88",accent2:"#c9826b",cardBg:"rgba(43,41,38,0.04)",border:"rgba(43,41,38,0.1)"},lx={headingFont:"'Fraunces', Georgia, serif",bodyFont:"'Work Sans', system-ui, sans-serif",headingWeight:600,googleFonts:["Fraunces:wght@500;600;700","Work+Sans:wght@400;600"]},cx={radius:"16px",slideWidth:"1280px"},o8={name:nx,version:tx,extends:"default-tech",description:rx,vibe:ax,license:ox,author:ix,roles:sx,typography:lx,geometry:cx},i8=Object.freeze(Object.defineProperty({__proto__:null,author:ix,default:o8,description:rx,geometry:cx,license:ox,name:nx,roles:sx,typography:lx,version:tx,vibe:ax},Symbol.toStringTag,{value:"Module"})),dx="scatterbrain",ux="1.0.0",px="Scatterbrain — post-it workshop board, Shrikhand + Caveat (frontend-slides bold-template-pack).",fx="Scatterbrain — cream cork #FAF8F3, sticky yellows/pinks, Shrikhand + Zilla Slab (frontend-slides scatterbrain).",gx="MIT",hx="Timur Isachenko",mx={bg:"#FAF8F3",bg2:"#F7F5F0",text:"#2D2A26",muted:"#5C5750",accent:"#FFE066",accent2:"#FFC9C9",cardBg:"#FFE066",border:"rgba(45,42,38,0.18)"},bx={headingFont:"'Shrikhand', cursive",bodyFont:"'Zilla Slab', Georgia, serif",headingWeight:400,googleFonts:["Shrikhand","Zilla+Slab:wght@400;500;600","Caveat:wght@400;600"]},vx={radius:"4px",slideWidth:"1280px"},s8={name:dx,version:ux,extends:"default-tech",description:px,vibe:fx,license:gx,author:hx,roles:mx,typography:bx,geometry:vx},l8=Object.freeze(Object.defineProperty({__proto__:null,author:hx,default:s8,description:px,geometry:vx,license:gx,name:dx,roles:mx,typography:bx,version:ux,vibe:fx},Symbol.toStringTag,{value:"Module"})),yx="signal",xx="1.0.0",kx="Signal — dual cream/navy editorial with antique gold accent, Source Serif 4 (frontend-slides).",wx="Signal — cream #F0ECE3 / navy #1C2644, gold #C8A870, Source Serif 4 + DM Sans (frontend-slides signal).",_x="MIT",Sx="Timur Isachenko",$x={bg:"#F0ECE3",bg2:"#E6E0D4",text:"#1A2030",muted:"#5A6270",accent:"#C8A870",accent2:"#1C2644",cardBg:"rgba(28,38,68,0.05)",border:"rgba(202,196,180,1)"},Fx={headingFont:"'Source Serif 4', Georgia, serif",bodyFont:"'DM Sans', system-ui, sans-serif",headingWeight:600,googleFonts:["Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400","DM+Sans:wght@400;500","IBM+Plex+Mono:wght@400;500"]},Ex={radius:"2px",slideWidth:"1280px"},c8={name:yx,version:xx,extends:"default-tech",description:kx,vibe:wx,license:_x,author:Sx,roles:$x,typography:Fx,geometry:Ex},d8=Object.freeze(Object.defineProperty({__proto__:null,author:Sx,default:c8,description:kx,geometry:Ex,license:_x,name:yx,roles:$x,typography:Fx,version:xx,vibe:wx},Symbol.toStringTag,{value:"Module"})),Cx="soft-editorial",jx="1.0.0",Tx="Soft Editorial — Cormorant Garamond on warm cream paper with sage, blush, lemon, and lilac accents (frontend-slides / beautiful-html-templates).",Px="Soft Editorial — paper #F2EEDF, ink #2A241B, sage #B7C7A8 + blush #E1A4C2, Cormorant Garamond + Work Sans (frontend-slides soft-editorial).",Mx="MIT",Nx="Timur Isachenko",zx={bg:"#F2EEDF",bg2:"#ECE6D2",text:"#2A241B",muted:"#5C5345",accent:"#B7C7A8",accent2:"#E1A4C2",cardBg:"rgba(255,255,255,0.55)",border:"rgba(42,36,27,0.18)"},Ix={headingFont:"'Cormorant Garamond', Garamond, Georgia, serif",bodyFont:"'Work Sans', system-ui, sans-serif",headingWeight:500,googleFonts:["Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600","Work+Sans:wght@400;500;600"]},Dx={radius:"28px",slideWidth:"1280px"},u8={name:Cx,version:jx,extends:"default-tech",description:Tx,vibe:Px,license:Mx,author:Nx,roles:zx,typography:Ix,geometry:Dx},p8=Object.freeze(Object.defineProperty({__proto__:null,author:Nx,default:u8,description:Tx,geometry:Dx,license:Mx,name:Cx,roles:zx,typography:Ix,version:jx,vibe:Px},Symbol.toStringTag,{value:"Module"})),Ax="split-pastel",Ox="1.0.0",Bx="Split Pastel — peach/lavender vertical split, Outfit, playful badges (frontend-slides STYLE_PRESETS).",Lx="Split Pastel — peach #f5e6dc / lavender #e4dff0 split, Outfit, mint/yellow/pink badges (frontend-slides Split Pastel).",Rx="MIT",Wx="Timur Isachenko",Ux={bg:"#f5e6dc",bg2:"#e4dff0",text:"#1a1a1a",muted:"#6a6570",accent:"#c8f0d8",accent2:"#f0d4e0",cardBg:"rgba(255,255,255,0.65)",border:"rgba(26,26,26,0.1)"},Gx={headingFont:"'Outfit', system-ui, sans-serif",bodyFont:"'Outfit', system-ui, sans-serif",headingWeight:800,googleFonts:["Outfit:wght@400;500;700;800"]},Hx={radius:"20px",slideWidth:"1280px"},f8={name:Ax,version:Ox,extends:"default-tech",description:Bx,vibe:Lx,license:Rx,author:Wx,roles:Ux,typography:Gx,geometry:Hx},g8=Object.freeze(Object.defineProperty({__proto__:null,author:Wx,default:f8,description:Bx,geometry:Hx,license:Rx,name:Ax,roles:Ux,typography:Gx,version:Ox,vibe:Lx},Symbol.toStringTag,{value:"Module"})),Vx="stencil-tablet",qx="1.0.0",Qx="Stencil & Tablet — bone paper, Stardos Stencil, earth accents (frontend-slides bold-template-pack).",Yx="Stencil & Tablet — bone #E2DCC9 + ink, Stardos Stencil + sienna/magenta/teal blocks (frontend-slides stencil-tablet).",Kx="MIT",Jx="Timur Isachenko",Xx={bg:"#E2DCC9",bg2:"#F4EFE0",text:"#0A0A0A",muted:"#6F7A2E",accent:"#A06A3C",accent2:"#C73B7A",cardBg:"#F4EFE0",border:"#000000"},Zx={headingFont:"'Stardos Stencil', serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:700,googleFonts:["Stardos+Stencil:wght@700","Barlow+Condensed:wght@600;700;800;900","Inter:wght@400;500;600"]},e1={radius:"24px",slideWidth:"1280px"},h8={name:Vx,version:qx,extends:"default-tech",description:Qx,vibe:Yx,license:Kx,author:Jx,roles:Xx,typography:Zx,geometry:e1},m8=Object.freeze(Object.defineProperty({__proto__:null,author:Jx,default:h8,description:Qx,geometry:e1,license:Kx,name:Vx,roles:Xx,typography:Zx,version:qx,vibe:Yx},Symbol.toStringTag,{value:"Module"})),n1="studio",t1="1.0.0",r1="Studio — near-black + acid yellow binary, Barlow 900 uppercase (frontend-slides bold-template-pack).",a1="Studio — #1C1C1C field + #F5D200 acid yellow, Barlow 900 + IBM Plex Mono (frontend-slides studio).",o1="MIT",i1="Timur Isachenko",s1={bg:"#1C1C1C",bg2:"#242422",text:"#F5D200",muted:"rgba(245,210,0,0.58)",accent:"#F5D200",accent2:"#F0CC00",cardBg:"#242422",border:"#2E2E2C"},l1={headingFont:"'Barlow', sans-serif",bodyFont:"'Barlow', system-ui, sans-serif",headingWeight:900,googleFonts:["Barlow:wght@400;500;700;900","IBM+Plex+Mono:wght@500"]},c1={radius:"0px",slideWidth:"1280px"},b8={name:n1,version:t1,extends:"default-tech",description:r1,vibe:a1,license:o1,author:i1,roles:s1,typography:l1,geometry:c1},v8=Object.freeze(Object.defineProperty({__proto__:null,author:i1,default:b8,description:r1,geometry:c1,license:o1,name:n1,roles:s1,typography:l1,version:t1,vibe:a1},Symbol.toStringTag,{value:"Module"})),d1="swiss-typographic",u1="0.1.0",p1="Swiss International Typographic Style — white grid, signal red, Helvetica-like grotesk.",f1="Swiss typographic — pure white, Inter grotesk, signal red, zero radius, modular grid (matches Grid Systems gallery).",g1="MIT",h1="Timur Isachenko",m1={bg:"#ffffff",bg2:"#f5f5f5",text:"#0a0a0a",muted:"#636363",accent:"#e2231a",accent2:"#0a0a0a",cardBg:"rgba(0,0,0,0.03)",border:"rgba(0,0,0,0.12)"},b1={headingFont:"'Inter', Helvetica, Arial, sans-serif",bodyFont:"'Inter', Helvetica, Arial, sans-serif",headingWeight:800,googleFonts:["Inter:wght@400;600;800"]},v1={radius:"0px",slideWidth:"1280px"},y8={name:d1,version:u1,extends:"default-tech",description:p1,vibe:f1,license:g1,author:h1,roles:m1,typography:b1,geometry:v1},x8=Object.freeze(Object.defineProperty({__proto__:null,author:h1,default:y8,description:p1,geometry:v1,license:g1,name:d1,roles:m1,typography:b1,version:u1,vibe:f1},Symbol.toStringTag,{value:"Module"})),y1="vaporwave",x1="0.1.0",k1="Vaporwave — purple dusk, sunset gradient, chrome teal, nostalgic mall energy.",w1="Vaporwave — #1a0533 dusk, #ff6ad5 pink + #5ce1ff teal, Monoton (matches Mallsoft gallery).",_1="MIT",S1="Timur Isachenko",$1={bg:"#1a0533",bg2:"#2d1060",text:"#fff0f9",muted:"#c4a8ff",accent:"#ff6ad5",accent2:"#5ce1ff",cardBg:"rgba(255,106,213,0.08)",border:"rgba(92,225,255,0.28)"},F1={headingFont:"'Monoton', display, cursive",bodyFont:"'Space Mono', monospace",headingWeight:400,googleFonts:["Monoton","Space+Mono:wght@400;700","VT323"]},E1={radius:"6px",slideWidth:"1280px"},k8={name:y1,version:x1,extends:"default-tech",description:k1,vibe:w1,license:_1,author:S1,roles:$1,typography:F1,geometry:E1},w8=Object.freeze(Object.defineProperty({__proto__:null,author:S1,default:k8,description:k1,geometry:E1,license:_1,name:y1,roles:$1,typography:F1,version:x1,vibe:w1},Symbol.toStringTag,{value:"Module"})),C1="vellum",j1="1.0.0",T1="Vellum — deep periwinkle field with chartreuse italic Cormorant type (frontend-slides).",P1="Vellum — periwinkle #2A3870, chartreuse #E8D85C, italic Cormorant Garamond + DM Sans (frontend-slides vellum).",M1="MIT",N1="Timur Isachenko",z1={bg:"#2A3870",bg2:"#1F2858",text:"#E8D85C",muted:"rgba(232,216,92,0.62)",accent:"#E8D85C",accent2:"#3A7878",cardBg:"rgba(232,216,92,0.08)",border:"rgba(232,216,92,0.20)"},I1={headingFont:"'Cormorant Garamond', Georgia, serif",bodyFont:"'DM Sans', system-ui, sans-serif",headingWeight:400,googleFonts:["Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500","DM+Sans:wght@400;500","Courier+Prime:wght@400"]},D1={radius:"0px",slideWidth:"1280px"},_8={name:C1,version:j1,extends:"default-tech",description:T1,vibe:P1,license:M1,author:N1,roles:z1,typography:I1,geometry:D1},S8=Object.freeze(Object.defineProperty({__proto__:null,author:N1,default:_8,description:T1,geometry:D1,license:M1,name:C1,roles:z1,typography:I1,version:j1,vibe:P1},Symbol.toStringTag,{value:"Module"})),A1="vintage-editorial",O1="1.0.0",B1="Vintage Editorial — Fraunces on cream with geometric accents (frontend-slides STYLE_PRESETS).",L1="Vintage Editorial — cream #f5f3ee, Fraunces display + Work Sans, witty bordered CTAs (frontend-slides Vintage Editorial).",R1="MIT",W1="Timur Isachenko",U1={bg:"#f5f3ee",bg2:"#ebe7de",text:"#1a1a1a",muted:"#555555",accent:"#e8d4c0",accent2:"#1a1a1a",cardBg:"#ffffff",border:"rgba(26,26,26,0.2)"},G1={headingFont:"'Fraunces', Georgia, serif",bodyFont:"'Work Sans', system-ui, sans-serif",headingWeight:700,googleFonts:["Fraunces:opsz,wght@9..144,700;9..144,900","Work+Sans:wght@400;500"]},H1={radius:"4px",slideWidth:"1280px"},$8={name:A1,version:O1,extends:"default-tech",description:B1,vibe:L1,license:R1,author:W1,roles:U1,typography:G1,geometry:H1},F8=Object.freeze(Object.defineProperty({__proto__:null,author:W1,default:$8,description:B1,geometry:H1,license:R1,name:A1,roles:U1,typography:G1,version:O1,vibe:L1},Symbol.toStringTag,{value:"Module"})),V1="y2k-aero",q1="0.1.0",Q1="Y2K aero — icy gradients, chrome cyan, soft bubbles, futuristic optimism.",Y1="Y2K aero — icy #e0f7ff, sky #38bdf8 + lime #a3e635, Nunito (matches BubbleFlow gallery).",K1="MIT",J1="Timur Isachenko",X1={bg:"#e0f7ff",bg2:"#bae6fd",text:"#0c4a6e",muted:"#0369a1",accent:"#38bdf8",accent2:"#a3e635",cardBg:"rgba(255,255,255,0.72)",border:"rgba(14,165,233,0.28)"},Z1={headingFont:"'Nunito', system-ui, sans-serif",bodyFont:"'Nunito Sans', system-ui, sans-serif",headingWeight:800,googleFonts:["Nunito:wght@700;800","Nunito+Sans:wght@400;600"]},e2={radius:"32px",slideWidth:"1280px"},E8={name:V1,version:q1,extends:"default-tech",description:Q1,vibe:Y1,license:K1,author:J1,roles:X1,typography:Z1,geometry:e2},C8=Object.freeze(Object.defineProperty({__proto__:null,author:J1,default:E8,description:Q1,geometry:e2,license:K1,name:V1,roles:X1,typography:Z1,version:q1,vibe:Y1},Symbol.toStringTag,{value:"Module"})),j8={bg:"#0e0e12",bg2:"#16161d",text:"#f4f4f5",muted:"#a1a1aa",accent:"#7c3aed",accent2:"#22d3ee",cardBg:"rgba(255,255,255,0.04)",border:"rgba(255,255,255,0.08)"},T8={headingFont:"'Montserrat', system-ui, sans-serif",bodyFont:"'Open Sans', system-ui, sans-serif",headingWeight:800,googleFonts:["Montserrat:wght@700;800","Open+Sans:wght@400;600"]},P8={radius:"18px",slideWidth:"1280px"},M8={...Object.assign({"../../../core/themes/claude/theme.json":Ww,"../../../core/themes/default-tech/theme.json":Gw}),...Object.assign({"../../../themes/8-bit-orbit/theme.json":Vw,"../../../themes/aerospace-hud/theme.json":Qw,"../../../themes/art-deco/theme.json":Kw,"../../../themes/aurora-glass/theme.json":Xw,"../../../themes/bauhaus/theme.json":e4,"../../../themes/biennale-yellow/theme.json":t4,"../../../themes/block-frame/theme.json":a4,"../../../themes/blue-professional/theme.json":i4,"../../../themes/blueprint/theme.json":l4,"../../../themes/bold-poster/theme.json":d4,"../../../themes/bold-signal/theme.json":p4,"../../../themes/botanical-luxe/theme.json":g4,"../../../themes/broadsheet/theme.json":m4,"../../../themes/broadside/theme.json":v4,"../../../themes/brutalist-acid/theme.json":x4,"../../../themes/brutalist-mono/theme.json":w4,"../../../themes/candy-pop/theme.json":S4,"../../../themes/capsule/theme.json":F4,"../../../themes/cartesian/theme.json":C4,"../../../themes/cobalt-grid/theme.json":T4,"../../../themes/coral/theme.json":M4,"../../../themes/corporate/theme.json":z4,"../../../themes/creative-mode/theme.json":D4,"../../../themes/creative-voltage/theme.json":O4,"../../../themes/crt-terminal/theme.json":L4,"../../../themes/daisy-days/theme.json":W4,"../../../themes/dark-botanical/theme.json":G4,"../../../themes/data-editorial/theme.json":V4,"../../../themes/developer-dark/theme.json":Q4,"../../../themes/editorial-forest/theme.json":K4,"../../../themes/editorial-serif/theme.json":X4,"../../../themes/editorial-tri-tone/theme.json":e5,"../../../themes/electric-studio/theme.json":t5,"../../../themes/emerald-editorial/theme.json":a5,"../../../themes/fintech-clean/theme.json":i5,"../../../themes/ft-editorial/theme.json":l5,"../../../themes/genz-bento/theme.json":d5,"../../../themes/glassmorphism/theme.json":p5,"../../../themes/grove/theme.json":g5,"../../../themes/heritage-editorial/theme.json":m5,"../../../themes/kinetic-wrapped/theme.json":v5,"../../../themes/long-table/theme.json":x5,"../../../themes/luxury-minimalist/theme.json":w5,"../../../themes/mat/theme.json":S5,"../../../themes/monochrome/theme.json":F5,"../../../themes/neo-grid-bold/theme.json":C5,"../../../themes/neon-noir/theme.json":T5,"../../../themes/notebook-tabs/theme.json":M5,"../../../themes/paper-ink/theme.json":z5,"../../../themes/pastel-dreamy/theme.json":D5,"../../../themes/pastel-geometry/theme.json":O5,"../../../themes/peoples-platform/theme.json":L5,"../../../themes/pin-and-paper/theme.json":W5,"../../../themes/pink-script/theme.json":G5,"../../../themes/playful/theme.json":V5,"../../../themes/raw-grid/theme.json":Q5,"../../../themes/retro-arcade/theme.json":K5,"../../../themes/retro-windows/theme.json":X5,"../../../themes/retro-zine/theme.json":e8,"../../../themes/risograph-zine/theme.json":t8,"../../../themes/sakura-chroma/theme.json":a8,"../../../themes/scandinavian/theme.json":i8,"../../../themes/scatterbrain/theme.json":l8,"../../../themes/signal/theme.json":d8,"../../../themes/soft-editorial/theme.json":p8,"../../../themes/split-pastel/theme.json":g8,"../../../themes/stencil-tablet/theme.json":m8,"../../../themes/studio/theme.json":v8,"../../../themes/swiss-typographic/theme.json":x8,"../../../themes/vaporwave/theme.json":w8,"../../../themes/vellum/theme.json":S8,"../../../themes/vintage-editorial/theme.json":F8,"../../../themes/y2k-aero/theme.json":C8})},pa=new Map;for(const e of Object.values(M8)){const n="default"in e?e.default:e;n!=null&&n.name&&pa.set(n.name,n)}function n2(){return[...pa.keys()].sort()}function N8(){return n2().map(e=>{const n=ct(e),t=n.manifest.vibe??n.manifest.description??e;return{name:e,vibe:t,bg:n.palette.bg,accent:n.palette.accent}})}function ct(e){const n=[];let t=pa.has(e)?e:"default-tech";const r=new Set;for(;t&&!r.has(t);){r.add(t);const l=pa.get(t);if(!l)break;n.unshift(l),t=l.extends}const a={...j8},o={...T8},i={...P8};for(const l of n)Object.assign(a,l.roles??{}),Object.assign(o,l.typography??{}),Object.assign(i,l.geometry??{});const s=n[n.length-1]??{name:"default-tech",version:"0.0.0"};return{name:s.name,version:s.version,manifest:s,palette:a,typography:o,geometry:i}}const z8=`<section class="slide title-slide closing-slide" data-layout="closing">
  {{#eyebrow}}<span class="eyebrow">{{eyebrow}}</span>{{/eyebrow}}
  <h1>{{heading}}</h1>
  {{#lead}}<p class="lead">{{lead}}</p>{{/lead}}
  {{#cta}}<a class="btn" href="{{href}}"><i class="fa-solid fa-arrow-right"></i> {{label}}</a>{{/cta}}
</section>
`,I8=`<section class="slide code-slide" data-layout="code">
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
`,D8=`<section class="slide comparison-slide" data-layout="comparison">
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
`,A8=`<section class="slide data-table-slide" data-layout="data-table">
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
`,O8=`<section class="slide feature-grid-slide" data-layout="feature-grid">
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
`,B8=`<section class="slide image-hero-slide" data-layout="image-hero">
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
`,L8=`<section class="slide quote-slide" data-layout="quote">
  <p class="quote">{{quote}}</p>
  {{#by}}<p class="quote-by">— {{by}}</p>{{/by}}
</section>
`,R8=`<section class="slide section-slide" data-layout="section">
  {{#number}}<div class="section-number">{{number}}</div>{{/number}}
  <h2>{{heading}}</h2>
  {{#lead}}<p class="lead">{{lead}}</p>{{/lead}}
</section>
`,W8=`<section class="slide stat-row-slide" data-layout="stat-row">
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
`,U8=`<section class="slide timeline-slide" data-layout="timeline">
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
`,G8=`<section class="slide title-slide" data-layout="title">
  {{#eyebrow}}<span class="eyebrow">{{eyebrow}}</span>{{/eyebrow}}
  <h1>{{heading}}</h1>
  {{#lead}}<p class="lead">{{lead}}</p>{{/lead}}
</section>
`,H8=`<section class="slide two-column-slide" data-layout="two-column">
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
 */var V8=Object.prototype.toString,gt=Array.isArray||function(n){return V8.call(n)==="[object Array]"};function qi(e){return typeof e=="function"}function q8(e){return gt(e)?"array":typeof e}function ao(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function ll(e,n){return e!=null&&typeof e=="object"&&n in e}function Q8(e,n){return e!=null&&typeof e!="object"&&e.hasOwnProperty&&e.hasOwnProperty(n)}var Y8=RegExp.prototype.test;function K8(e,n){return Y8.call(e,n)}var J8=/\S/;function X8(e){return!K8(J8,e)}var Z8={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};function e_(e){return String(e).replace(/[&<>"'`=\/]/g,function(t){return Z8[t]})}var n_=/\s*/,t_=/\s+/,cl=/\s*=/,r_=/\s*\}/,a_=/#|\^|\/|>|\{|&|=|!/;function o_(e,n){if(!e)return[];var t=!1,r=[],a=[],o=[],i=!1,s=!1,l="",c=0;function p(){if(i&&!s)for(;o.length;)delete a[o.pop()];else o=[];i=!1,s=!1}var g,m,b;function w(S){if(typeof S=="string"&&(S=S.split(t_,2)),!gt(S)||S.length!==2)throw new Error("Invalid tags: "+S);g=new RegExp(ao(S[0])+"\\s*"),m=new RegExp("\\s*"+ao(S[1])),b=new RegExp("\\s*"+ao("}"+S[1]))}w(n||ve.tags);for(var y=new sr(e),T,f,u,h,v,_;!y.eos();){if(T=y.pos,u=y.scanUntil(g),u)for(var k=0,C=u.length;k<C;++k)h=u.charAt(k),X8(h)?(o.push(a.length),l+=h):(s=!0,t=!0,l+=" "),a.push(["text",h,T,T+1]),T+=1,h===`
`&&(p(),l="",c=0,t=!1);if(!y.scan(g))break;if(i=!0,f=y.scan(a_)||"name",y.scan(n_),f==="="?(u=y.scanUntil(cl),y.scan(cl),y.scanUntil(m)):f==="{"?(u=y.scanUntil(b),y.scan(r_),y.scanUntil(m),f="&"):u=y.scanUntil(m),!y.scan(m))throw new Error("Unclosed tag at "+y.pos);if(f==">"?v=[f,u,T,y.pos,l,c,t]:v=[f,u,T,y.pos],c++,a.push(v),f==="#"||f==="^")r.push(v);else if(f==="/"){if(_=r.pop(),!_)throw new Error('Unopened section "'+u+'" at '+T);if(_[1]!==u)throw new Error('Unclosed section "'+_[1]+'" at '+T)}else f==="name"||f==="{"||f==="&"?s=!0:f==="="&&w(u)}if(p(),_=r.pop(),_)throw new Error('Unclosed section "'+_[1]+'" at '+y.pos);return s_(i_(a))}function i_(e){for(var n=[],t,r,a=0,o=e.length;a<o;++a)t=e[a],t&&(t[0]==="text"&&r&&r[0]==="text"?(r[1]+=t[1],r[3]=t[3]):(n.push(t),r=t));return n}function s_(e){for(var n=[],t=n,r=[],a,o,i=0,s=e.length;i<s;++i)switch(a=e[i],a[0]){case"#":case"^":t.push(a),r.push(a),t=a[4]=[];break;case"/":o=r.pop(),o[5]=a[2],t=r.length>0?r[r.length-1][4]:n;break;default:t.push(a)}return n}function sr(e){this.string=e,this.tail=e,this.pos=0}sr.prototype.eos=function(){return this.tail===""};sr.prototype.scan=function(n){var t=this.tail.match(n);if(!t||t.index!==0)return"";var r=t[0];return this.tail=this.tail.substring(r.length),this.pos+=r.length,r};sr.prototype.scanUntil=function(n){var t=this.tail.search(n),r;switch(t){case-1:r=this.tail,this.tail="";break;case 0:r="";break;default:r=this.tail.substring(0,t),this.tail=this.tail.substring(t)}return this.pos+=r.length,r};function dt(e,n){this.view=e,this.cache={".":this.view},this.parent=n}dt.prototype.push=function(n){return new dt(n,this)};dt.prototype.lookup=function(n){var t=this.cache,r;if(t.hasOwnProperty(n))r=t[n];else{for(var a=this,o,i,s,l=!1;a;){if(n.indexOf(".")>0)for(o=a.view,i=n.split("."),s=0;o!=null&&s<i.length;)s===i.length-1&&(l=ll(o,i[s])||Q8(o,i[s])),o=o[i[s++]];else o=a.view[n],l=ll(a.view,n);if(l){r=o;break}a=a.parent}t[n]=r}return qi(r)&&(r=r.call(this.view)),r};function pe(){this.templateCache={_cache:{},set:function(n,t){this._cache[n]=t},get:function(n){return this._cache[n]},clear:function(){this._cache={}}}}pe.prototype.clearCache=function(){typeof this.templateCache<"u"&&this.templateCache.clear()};pe.prototype.parse=function(n,t){var r=this.templateCache,a=n+":"+(t||ve.tags).join(":"),o=typeof r<"u",i=o?r.get(a):void 0;return i==null&&(i=o_(n,t),o&&r.set(a,i)),i};pe.prototype.render=function(n,t,r,a){var o=this.getConfigTags(a),i=this.parse(n,o),s=t instanceof dt?t:new dt(t,void 0);return this.renderTokens(i,s,r,n,a)};pe.prototype.renderTokens=function(n,t,r,a,o){for(var i="",s,l,c,p=0,g=n.length;p<g;++p)c=void 0,s=n[p],l=s[0],l==="#"?c=this.renderSection(s,t,r,a,o):l==="^"?c=this.renderInverted(s,t,r,a,o):l===">"?c=this.renderPartial(s,t,r,o):l==="&"?c=this.unescapedValue(s,t):l==="name"?c=this.escapedValue(s,t,o):l==="text"&&(c=this.rawValue(s)),c!==void 0&&(i+=c);return i};pe.prototype.renderSection=function(n,t,r,a,o){var i=this,s="",l=t.lookup(n[1]);function c(m){return i.render(m,t,r,o)}if(l){if(gt(l))for(var p=0,g=l.length;p<g;++p)s+=this.renderTokens(n[4],t.push(l[p]),r,a,o);else if(typeof l=="object"||typeof l=="string"||typeof l=="number")s+=this.renderTokens(n[4],t.push(l),r,a,o);else if(qi(l)){if(typeof a!="string")throw new Error("Cannot use higher-order sections without the original template");l=l.call(t.view,a.slice(n[3],n[5]),c),l!=null&&(s+=l)}else s+=this.renderTokens(n[4],t,r,a,o);return s}};pe.prototype.renderInverted=function(n,t,r,a,o){var i=t.lookup(n[1]);if(!i||gt(i)&&i.length===0)return this.renderTokens(n[4],t,r,a,o)};pe.prototype.indentPartial=function(n,t,r){for(var a=t.replace(/[^ \t]/g,""),o=n.split(`
`),i=0;i<o.length;i++)o[i].length&&(i>0||!r)&&(o[i]=a+o[i]);return o.join(`
`)};pe.prototype.renderPartial=function(n,t,r,a){if(r){var o=this.getConfigTags(a),i=qi(r)?r(n[1]):r[n[1]];if(i!=null){var s=n[6],l=n[5],c=n[4],p=i;l==0&&c&&(p=this.indentPartial(i,c,s));var g=this.parse(p,o);return this.renderTokens(g,t,r,p,a)}}};pe.prototype.unescapedValue=function(n,t){var r=t.lookup(n[1]);if(r!=null)return r};pe.prototype.escapedValue=function(n,t,r){var a=this.getConfigEscape(r)||ve.escape,o=t.lookup(n[1]);if(o!=null)return typeof o=="number"&&a===ve.escape?String(o):a(o)};pe.prototype.rawValue=function(n){return n[1]};pe.prototype.getConfigTags=function(n){return gt(n)?n:n&&typeof n=="object"?n.tags:void 0};pe.prototype.getConfigEscape=function(n){if(n&&typeof n=="object"&&!gt(n))return n.escape};var ve={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(e){nr.templateCache=e},get templateCache(){return nr.templateCache}},nr=new pe;ve.clearCache=function(){return nr.clearCache()};ve.parse=function(n,t){return nr.parse(n,t)};ve.render=function(n,t,r,a){if(typeof n!="string")throw new TypeError('Invalid template! Template should be a "string" but "'+q8(n)+'" was given as the first argument for mustache#render(template, view, partials)');return nr.render(n,t,r,a)};ve.escape=e_;ve.Scanner=sr;ve.Context=dt;ve.Writer=pe;const l_=`/* presentation-md base stylesheet.
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
`,dl=`/* Per-theme surface profiles — each theme gets a distinct stage, not one shared blob. */

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
  background: color-mix(in srgb, var(--accent) 14%, var(--card-bg));
  border-color: color-mix(in srgb, var(--accent) 55%, var(--border));
  box-shadow: 0 0 32px color-mix(in srgb, var(--accent) 18%, transparent);
}
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
  background: color-mix(in srgb, var(--accent) 18%, var(--card-bg));
  border-color: color-mix(in srgb, var(--accent) 50%, var(--border));
  box-shadow: 0 0 40px color-mix(in srgb, var(--accent) 22%, transparent);
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
  background: color-mix(in srgb, var(--accent) 18%, #1a1a1a);
  color: #ffffff;
  border-radius: 16px;
  border: 1px solid color-mix(in srgb, var(--accent) 45%, transparent);
}
.deck[data-surface="bold-signal-card"] .card i,
.deck[data-surface="bold-signal-card"] .card h3 { color: #ffffff; }
.deck[data-surface="bold-signal-card"] .card p { color: rgba(255,255,255,0.72); }
.deck[data-surface="bold-signal-card"] .comparison-col:last-child {
  background: color-mix(in srgb, var(--accent) 22%, #1a1a1a);
}
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
}
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
  --slide-bg:
    radial-gradient(ellipse 55% 45% at 88% 100%, color-mix(in srgb, var(--accent2) 48%, transparent), transparent 70%),
    radial-gradient(ellipse 30% 28% at 12% 18%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 70%),
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
  color: var(--text);
}
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
  color: #fff;
  border-color: var(--text);
}
.deck[data-surface="bauhaus-blocks"] .comparison-col:last-child .comparison-label,
.deck[data-surface="bauhaus-blocks"] .comparison-col:last-child p { color: #fff; }
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
  background: var(--accent2);
}
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
}

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
  background: color-mix(in srgb, var(--accent2) 18%, transparent);
  border-color: var(--accent);
}

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
  color: var(--text);
}
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
  background: color-mix(in srgb, var(--accent) 88%, #fff);
  color: #fff;
}
.deck[data-surface="coral-hatch"] .comparison-col:last-child .comparison-label,
.deck[data-surface="coral-hatch"] .comparison-col:last-child p { color: #fff; }
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
  color: var(--text);
}
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
  color: #fff;
}
.deck[data-surface="creative-mode-blocks"] .comparison-col:last-child .comparison-label,
.deck[data-surface="creative-mode-blocks"] .comparison-col:last-child p { color: #fff; }
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
  transform: rotate(1deg);
}
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
}
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
  background: #b8f0e8;
}
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
}
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
  background: var(--accent2);
  color: var(--text);
}
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
  background: var(--accent);
}
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
  background: var(--accent);
  color: #f0e8d2;
}
.deck[data-surface="mat-woodglow"] .comparison-col:last-child .comparison-label,
.deck[data-surface="mat-woodglow"] .comparison-col:last-child p { color: #f0e8d2; }
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
  border-color: var(--accent);
  box-shadow: 0 0 18px color-mix(in srgb, var(--accent) 35%, transparent);
}
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
  color: #fff;
  border-color: var(--text);
}
.deck[data-surface="brutalist-grid"] .comparison-col:last-child .comparison-label,
.deck[data-surface="brutalist-grid"] .comparison-col:last-child p { color: #fff; }
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
`,c_="warm-paper",d_="clean-light",u_="soft-bento",p_="bauhaus-blocks",f_="vapor-horizon",g_="hygge-soft",h_="blueprint-grid",m_="glass-mist",b_="newsprint-masthead",v_="vellum-colorfield",y_="broadside-fire",x_="signal-briefing",k_="coral-hatch",w_="capsule-pills",__="studio-acid",S_="grove-monograph",$_="scatterbrain-cork",F_="mat-woodglow",E_="cartesian-draft",C_="monochrome-ledger",j_={claude:c_,"default-tech":"neon-glow",corporate:d_,playful:u_,"luxury-minimalist":"quiet-luxe","retro-arcade":"scanline-neon","editorial-serif":"editorial-rule","brutalist-mono":"brutalist-grid","pastel-dreamy":"pastel-cloud","aurora-glass":"aurora-glass","ft-editorial":"broadsheet-rule","genz-bento":"hard-bento","crt-terminal":"crt-phosphor","swiss-typographic":"swiss-grid","candy-pop":"candy-blob","aerospace-hud":"hud-grid","brutalist-acid":"acid-block",bauhaus:p_,"y2k-aero":"aero-bubble","risograph-zine":"riso-print","neon-noir":"neon-rain",vaporwave:f_,"botanical-luxe":"botanical-leaf","heritage-editorial":"heritage-wash","fintech-clean":"fintech-soft","developer-dark":"dev-terminal","data-editorial":"data-rule",scandinavian:g_,"art-deco":"deco-fan","kinetic-wrapped":"wrapped-block",blueprint:h_,glassmorphism:m_,broadsheet:b_,"soft-editorial":"soft-editorial-paper","editorial-forest":"editorial-forest-paper","pin-and-paper":"pin-paper-pad",vellum:v_,"neo-grid-bold":"neo-grid-panels","editorial-tri-tone":"tri-tone-blocks","creative-mode":"creative-mode-blocks",broadside:y_,"bold-signal":"bold-signal-card","notebook-tabs":"notebook-tabs-page","creative-voltage":"creative-voltage-split",signal:x_,"electric-studio":"electric-studio-split","dark-botanical":"dark-botanical-bloom","pastel-geometry":"pastel-geometry-pills","split-pastel":"split-pastel-panels","vintage-editorial":"vintage-editorial-geo","paper-ink":"paper-ink-literary","biennale-yellow":"biennale-yellow-sun","bold-poster":"bold-poster-ink",coral:k_,"emerald-editorial":"emerald-editorial-masthead","sakura-chroma":"sakura-chroma-cassette","pink-script":"pink-script-afterhours","block-frame":"block-frame-brutal",capsule:w_,"cobalt-grid":"cobalt-grid-paper","8-bit-orbit":"bit-orbit-arcade",studio:__,grove:S_,scatterbrain:$_,"peoples-platform":"peoples-platform-poster","retro-windows":"retro-windows-chrome","raw-grid":"raw-grid-brutal","long-table":"long-table-supper",mat:F_,"stencil-tablet":"stencil-tablet-earth",cartesian:E_,monochrome:C_,"blue-professional":"blue-professional-clean","daisy-days":"daisy-days-pastel","retro-zine":"retro-zine-riso"},T_=`<!doctype html>
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
`;function P_(e){return j_[e]??"gradient"}const M_=Object.assign({"../../../shared/layouts/closing.html":z8,"../../../shared/layouts/code.html":I8,"../../../shared/layouts/comparison.html":D8,"../../../shared/layouts/data-table.html":A8,"../../../shared/layouts/feature-grid.html":O8,"../../../shared/layouts/image-hero.html":B8,"../../../shared/layouts/quote.html":L8,"../../../shared/layouts/section.html":R8,"../../../shared/layouts/stat-row.html":W8,"../../../shared/layouts/timeline.html":U8,"../../../shared/layouts/title.html":G8,"../../../shared/layouts/two-column.html":H8}),t2=new Map;for(const[e,n]of Object.entries(M_)){const t=e.split("/").pop().replace(/\.html$/,"");t2.set(t,n)}function N_(e){return e.length===0?"":`https://fonts.googleapis.com/css2?family=${e.join("&family=")}&display=swap`}const z_=new Set(["http","https","mailto","tel"]);function r2(e){let n="";for(const t of e){const r=t.charCodeAt(0);r>31&&r!==127&&(n+=t)}return n}function a2(e){var n,t;return(t=(n=e.match(/^([a-zA-Z][a-zA-Z0-9+.-]*):/))==null?void 0:n[1])==null?void 0:t.toLowerCase()}function I_(e){if(typeof e!="string")return;const n=r2(e).trim(),t=a2(n);return t&&!z_.has(t)?"#":n}function D_(e){if(typeof e!="string")return;const n=r2(e).trim();if(/^data:image\//i.test(n))return n;const t=a2(n);return t&&t!=="http"&&t!=="https"?"":n}function A_(e){var t;const n={...e};return e.layout==="data-table"&&Array.isArray(e.rows)&&(n.rows=e.rows.map(r=>({cells:r}))),e.layout==="feature-grid"&&(e.columns==="bento"?n.columns="bento":typeof e.columns=="number"?n.columns=e.columns:e.columns||(n.columns=3)),((t=e.cta)==null?void 0:t.href)!==void 0&&(n.cta={...e.cta,href:I_(e.cta.href)}),e.image!==void 0&&(n.image=D_(e.image)),n}const O_='<footer class="pmd-attribution">Made with <a href="https://presentation-md.vercel.app/?ref=studio" target="_blank" rel="noopener">presentation-md</a></footer>',B_=`
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
@media print { .pmd-attribution { opacity: 0.5; } }`;function L_(e){return`<script type="application/json" id="pmd-deck">${JSON.stringify(e).replace(/</g,"\\u003c")}<\/script>`}function o2(e,n){var c,p,g;const t={bg:n.palette.bg,bg2:n.palette.bg2,text:n.palette.text,muted:n.palette.muted,accent:n.palette.accent,accent2:n.palette.accent2,cardBg:n.palette.cardBg,border:n.palette.border,radius:n.geometry.radius,slideW:n.geometry.slideWidth,headingFont:n.typography.headingFont,bodyFont:n.typography.bodyFont,headingWeight:String(n.typography.headingWeight)},r=ve.render(l_,t),a=N_(n.typography.googleFonts),o=P_(n.name);let i=a?`@import url('${a}');

${r}

${dl}`:`${r}

${dl}`;i+=`

${B_}`;const s=(Array.isArray(e.slides)?e.slides:[]).map(m=>{const b=t2.get(m.layout);return b?ve.render(b,A_(m)):`<section class="slide"><h2>Unknown layout: ${m.layout}</h2></section>`}).join(`
`),l=((c=e.meta)==null?void 0:c.title)??((p=e.meta)==null?void 0:p.company)??"Presentation";return ve.render(T_,{title:l,description:((g=e.meta)==null?void 0:g.description)??"",styles:i,slides:s,surface:o,attribution:O_,deckData:L_(e)})}const R_="modulepreload",W_=function(e){return"/studio/"+e},ul={},i2=function(n,t,r){let a=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),s=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));a=Promise.allSettled(t.map(l=>{if(l=W_(l),l in ul)return;ul[l]=!0;const c=l.endsWith(".css"),p=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${p}`))return;const g=document.createElement("link");if(g.rel=c?"stylesheet":R_,c||(g.as="script"),g.crossOrigin="",g.href=l,s&&g.setAttribute("nonce",s),document.head.appendChild(g),c)return new Promise((m,b)=>{g.addEventListener("load",m),g.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${l}`)))})}))}function o(i){const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=i,window.dispatchEvent(s),!s.defaultPrevented)throw i}return a.then(i=>{for(const s of i||[])s.status==="rejected"&&o(s.reason);return n().catch(o)})};function Qi(e,n){const t=URL.createObjectURL(e),r=document.createElement("a");r.href=t,r.download=n,document.body.appendChild(r),r.click(),r.remove(),URL.revokeObjectURL(t)}function Yi(e,n){var r,a;return`${(((r=e.meta)==null?void 0:r.title)??((a=e.meta)==null?void 0:a.company)??"deck").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"deck"}.${n}`}function s2(e){var n;return((n=e.meta)==null?void 0:n.theme)??"default-tech"}async function U_(e){const n=await e.arrayBuffer(),t=new Uint8Array(n);let r="";const a=32768;for(let s=0;s<t.length;s+=a)r+=String.fromCharCode(...t.subarray(s,s+a));const o=btoa(r);return`data:${e.type||"image/png"};base64,${o}`}async function G_(e){const n=[],t=[];for(const r of e.slides??[]){const a=r.image;if(!a||a.startsWith("data:")||!/^https?:\/\//i.test(a)){t.push(r);continue}try{const o=await fetch(a);if(!o.ok)throw new Error(`HTTP ${o.status}`);const i=await U_(await o.blob());t.push({...r,image:i})}catch(o){n.push(`Could not prefetch image (${o.message}): ${a}`),t.push(r)}}return{deck:{...e,slides:t},warnings:n}}async function H_(e){const n=[],t=ct(s2(e)),r=await G_(e);n.push(...r.warnings);const{deckToPptxBlob:a}=await i2(async()=>{const{deckToPptxBlob:i}=await import("./index-6azyG_DF.js");return{deckToPptxBlob:i}},__vite__mapDeps([0,1])),o=await a(r.deck,t,{onWarn:i=>n.push(i)});return Qi(o,Yi(e,"pptx")),{warnings:n}}function V_(e){const n=ct(s2(e)),t=o2(e,n);Qi(new Blob([t],{type:"text/html"}),Yi(e,"html"))}function q_(e){Qi(new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),Yi(e,"json"))}function Ki(e){const n=JSON.parse(e);if((n==null?void 0:n.type)!=="deck"||!Array.isArray(n.slides))throw new Error('Not a valid deck: expected { "type": "deck", "slides": [...] }');return n}function Q_(e){var r,a,o;const n=["pmd-deck","psp-deck"];if(typeof DOMParser<"u"){const i=new DOMParser().parseFromString(e,"text/html");for(const s of n){const l=(a=(r=i.getElementById(s))==null?void 0:r.textContent)==null?void 0:a.trim();if(l)return l}}const t=e.match(/<script[^>]*id=["'](?:pmd-deck|psp-deck)["'][^>]*>([\s\S]*?)<\/script>/i);return(o=t==null?void 0:t[1])==null?void 0:o.trim()}function Y_(e){const n=Q_(e);if(!n)throw new Error("No editable deck found in this HTML. Only presentations created by presentation-md (with an embedded source) can be opened.");return Ki(n)}function K_(e,n){return/\.html?$/i.test(e)?Y_(n):Ki(n)}function J_({deck:e,onChange:n,onLoadExample:t,onPresent:r,onGenerate:a}){var _,k,C,S;const o=A.useRef(null),[i,s]=A.useState(""),[l,c]=A.useState(!1),[p,g]=A.useState(""),m=A.useMemo(()=>N8(),[]),b=((_=e.meta)==null?void 0:_.theme)??"default-tech",w=m.find($=>$.name===b)??{bg:ct(b).palette.bg,accent:ct(b).palette.accent},y=m.filter($=>{if(!p.trim())return!0;const j=p.trim().toLowerCase();return $.name.toLowerCase().includes(j)||$.vibe.toLowerCase().includes(j)}),T=$=>n({...e,meta:{...e.meta,...$}}),f=$=>T({theme:$}),u=$=>T({title:$}),h=async $=>{try{const j=K_($.name,await $.text());n(j),s(`Opened ${$.name}`)}catch(j){s(`Open failed: ${j.message}`)}},v=async()=>{c(!0),s("Building .pptx…");try{const{warnings:$}=await H_(e);s($.length?`Exported .pptx (${$.length} warning${$.length>1?"s":""})`:"Exported .pptx")}catch($){s(`Export failed: ${$.message}`)}finally{c(!1)}};return d.jsxs("header",{className:"toolbar",children:[d.jsxs("div",{className:"brand",children:[d.jsx("strong",{children:"Studio"}),d.jsx("span",{className:"muted small",children:"presentation-md"})]}),d.jsx("input",{className:"text-input title-input",value:((k=e.meta)==null?void 0:k.title)??"",placeholder:"Deck title",onChange:$=>u($.target.value)}),d.jsxs("details",{className:"theme-browser",onToggle:$=>{$.target.open||g("")},children:[d.jsxs("summary",{className:"btn btn-sm theme-trigger",title:"Browse 75 themes",children:[d.jsx("span",{className:"theme-swatch",style:{"--swatch-bg":w.bg,"--swatch-accent":w.accent},"aria-hidden":!0}),d.jsx("span",{children:b}),d.jsx("span",{"aria-hidden":!0,children:"▾"})]}),d.jsxs("div",{className:"theme-browser-panel",children:[d.jsx("input",{className:"text-input theme-search",value:p,placeholder:"Search themes…",autoFocus:!0,onChange:$=>g($.target.value)}),d.jsxs("div",{className:"theme-count",children:[y.length," / ",m.length," themes"]}),d.jsx("ul",{className:"theme-list",children:y.map($=>d.jsx("li",{children:d.jsxs("button",{type:"button",className:`theme-option${$.name===b?" active":""}`,onClick:j=>{f($.name);const ee=j.currentTarget.closest("details");ee&&(ee.open=!1)},children:[d.jsx("span",{className:"theme-swatch",style:{"--swatch-bg":$.bg,"--swatch-accent":$.accent},"aria-hidden":!0}),d.jsxs("span",{className:"theme-option-meta",children:[d.jsx("span",{className:"theme-option-name",children:$.name}),d.jsx("span",{className:"theme-option-vibe",children:$.vibe})]})]})},$.name))})]})]}),d.jsxs("details",{className:"deck-details",children:[d.jsx("summary",{className:"btn btn-sm",children:"Details"}),d.jsxs("div",{className:"deck-details-body",children:[d.jsx("input",{className:"text-input",value:((C=e.meta)==null?void 0:C.company)??"",placeholder:"Company",onChange:$=>T({company:$.target.value})}),d.jsx("input",{className:"text-input",value:((S=e.meta)==null?void 0:S.description)??"",placeholder:"Description",onChange:$=>T({description:$.target.value})})]})]}),d.jsx("div",{className:"spacer"}),d.jsx("button",{className:"btn btn-generate",onClick:a,title:"Generate a deck from a prompt",children:"✨ Generate"}),d.jsx("button",{className:"btn",onClick:t,children:"Example"}),d.jsx("button",{className:"btn",onClick:()=>{var $;return($=o.current)==null?void 0:$.click()},title:"Open a deck .html or .json",children:"Open"}),d.jsx("button",{className:"btn",onClick:r,title:"Present fullscreen",children:"Present"}),d.jsx("button",{className:"btn",onClick:()=>q_(e),children:"JSON"}),d.jsx("button",{className:"btn",onClick:()=>V_(e),children:"HTML"}),d.jsx("button",{className:"btn btn-primary",disabled:l,onClick:v,children:l?"…":"Download .pptx"}),d.jsx("input",{ref:o,type:"file",accept:".html,.htm,.json,application/json,text/html",hidden:!0,onChange:$=>{var ee;const j=(ee=$.target.files)==null?void 0:ee[0];j&&h(j),$.target.value=""}}),i&&d.jsx("span",{className:"status muted small",children:i})]})}function X_({slides:e,selected:n,onSelect:t,onChange:r}){const[a,o]=A.useState("title"),i=()=>{const p=n+1,g=[...e.slice(0,p),Lw(a),...e.slice(p)];r(g,p)},s=p=>{const g=JSON.parse(JSON.stringify(e[p]));r([...e.slice(0,p+1),g,...e.slice(p+1)],p+1)},l=p=>{if(e.length<=1)return;const g=e.filter((m,b)=>b!==p);r(g,Math.max(0,Math.min(p,g.length-1)))},c=(p,g)=>{const m=p+g;if(m<0||m>=e.length)return;const b=e.slice();[b[p],b[m]]=[b[m],b[p]],r(b,m)};return d.jsxs("div",{className:"slide-list",children:[d.jsxs("div",{className:"add-row",children:[d.jsx("select",{className:"text-input",value:a,onChange:p=>o(p.target.value),children:Bw.map(p=>d.jsx("option",{value:p,children:Xo[p]},p))}),d.jsx("button",{className:"btn btn-sm",onClick:i,children:"+ Add"})]}),d.jsx("ul",{className:"slides",children:e.map((p,g)=>d.jsxs("li",{className:`slide-row ${g===n?"active":""}`,onClick:()=>t(g),children:[d.jsxs("div",{className:"slide-row-main",children:[d.jsx("span",{className:"slide-row-num",children:g+1}),d.jsxs("div",{className:"slide-row-text",children:[d.jsx("span",{className:"slide-row-layout",children:Xo[p.layout]??p.layout}),d.jsx("span",{className:"slide-row-title",children:p.heading??p.quote??p.eyebrow??"—"})]})]}),d.jsxs("div",{className:"slide-row-actions",onClick:m=>m.stopPropagation(),children:[d.jsx("button",{className:"btn btn-icon",title:"Move up",onClick:()=>c(g,-1),children:"↑"}),d.jsx("button",{className:"btn btn-icon",title:"Move down",onClick:()=>c(g,1),children:"↓"}),d.jsx("button",{className:"btn btn-icon",title:"Duplicate",onClick:()=>s(g),children:"⧉"}),d.jsx("button",{className:"btn btn-icon btn-danger",title:"Delete",onClick:()=>l(g),children:"✕"})]})]},g))})]})}function Ji({label:e,children:n}){return d.jsxs("label",{className:"field",children:[d.jsx("span",{className:"field-label",children:e}),n]})}function N({label:e,value:n,onChange:t,placeholder:r}){return d.jsx(Ji,{label:e,children:d.jsx("input",{className:"text-input",type:"text",value:n??"",placeholder:r,onChange:a=>t(a.target.value)})})}function Me({label:e,value:n,onChange:t,rows:r=3}){return d.jsx(Ji,{label:e,children:d.jsx("textarea",{className:"text-input",rows:r,value:n??"",onChange:a=>t(a.target.value)})})}function Er({label:e,value:n,options:t,onChange:r}){return d.jsx(Ji,{label:e,children:d.jsx("select",{className:"text-input",value:n,onChange:a=>r(a.target.value),children:t.map(a=>d.jsx("option",{value:a.value,children:a.label},a.value))})})}function Rr({label:e,items:n,onChange:t,blank:r,renderItem:a}){const o=(s,l)=>t(n.map((c,p)=>p===s?l:c)),i=(s,l)=>{const c=s+l;if(c<0||c>=n.length)return;const p=n.slice();[p[s],p[c]]=[p[c],p[s]],t(p)};return d.jsxs("div",{className:"list-editor",children:[d.jsxs("div",{className:"list-editor-head",children:[d.jsx("span",{className:"field-label",children:e}),d.jsx("button",{className:"btn btn-sm",onClick:()=>t([...n,r()]),children:"+ Add"})]}),n.map((s,l)=>d.jsxs("div",{className:"list-item",children:[d.jsxs("div",{className:"list-item-controls",children:[d.jsx("span",{className:"list-item-index",children:l+1}),d.jsx("div",{className:"spacer"}),d.jsx("button",{className:"btn btn-icon",title:"Move up",onClick:()=>i(l,-1),children:"↑"}),d.jsx("button",{className:"btn btn-icon",title:"Move down",onClick:()=>i(l,1),children:"↓"}),d.jsx("button",{className:"btn btn-icon btn-danger",title:"Remove",onClick:()=>t(n.filter((c,p)=>p!==l)),children:"✕"})]}),a(s,c=>o(l,c),l)]},l)),n.length===0&&d.jsx("p",{className:"muted small",children:"No items yet."})]})}function Z_({slide:e,onChange:n}){const t=o=>n({...e,...o}),r=e.layout;return d.jsxs("div",{className:"slide-form",children:[d.jsx("h2",{className:"panel-title",children:Xo[r]??e.layout}),a()]});function a(){var o,i;switch(e.layout){case"title":case"closing":return d.jsxs(d.Fragment,{children:[d.jsx(N,{label:"Eyebrow",value:e.eyebrow,onChange:s=>t({eyebrow:s})}),d.jsx(N,{label:"Heading",value:e.heading,onChange:s=>t({heading:s})}),d.jsx(Me,{label:"Lead",value:e.lead,onChange:s=>t({lead:s})}),e.layout==="closing"&&d.jsxs(d.Fragment,{children:[d.jsx(N,{label:"CTA label",value:(o=e.cta)==null?void 0:o.label,onChange:s=>t({cta:{...e.cta,label:s}})}),d.jsx(N,{label:"CTA link",value:(i=e.cta)==null?void 0:i.href,onChange:s=>t({cta:{...e.cta,href:s}})})]})]});case"section":return d.jsxs(d.Fragment,{children:[d.jsx(N,{label:"Number",value:e.number,onChange:s=>t({number:s})}),d.jsx(N,{label:"Eyebrow",value:e.eyebrow,onChange:s=>t({eyebrow:s})}),d.jsx(N,{label:"Heading",value:e.heading,onChange:s=>t({heading:s})}),d.jsx(Me,{label:"Lead",value:e.lead,onChange:s=>t({lead:s})})]});case"two-column":return d.jsxs(d.Fragment,{children:[d.jsx(N,{label:"Eyebrow",value:e.eyebrow,onChange:s=>t({eyebrow:s})}),d.jsx(N,{label:"Heading",value:e.heading,onChange:s=>t({heading:s})}),d.jsx(Me,{label:"Body",value:e.body,onChange:s=>t({body:s}),rows:5}),d.jsx(Er,{label:"Ratio",value:typeof e.ratio=="string"?e.ratio:"1-1",options:[{value:"1-1",label:"1:1 balanced"},{value:"2-1",label:"2:1 copy-heavy"},{value:"1-2",label:"1:2 media-heavy"},{value:"3-2",label:"3:2"},{value:"2-3",label:"2:3"}],onChange:s=>t({ratio:s})}),d.jsx(Er,{label:"Media side",value:e.reverse?"left":"right",options:[{value:"right",label:"Media on right"},{value:"left",label:"Media on left (reverse)"}],onChange:s=>t({reverse:s==="left"})}),d.jsx(N,{label:"Image URL (remote images prefetched into PPTX)",value:e.image,onChange:s=>t({image:s})}),d.jsx(N,{label:"Image alt",value:e.imageAlt,onChange:s=>t({imageAlt:s})}),d.jsx(Me,{label:"Aside (when no image)",value:e.aside,onChange:s=>t({aside:s}),rows:3})]});case"image-hero":return d.jsxs(d.Fragment,{children:[d.jsx(N,{label:"Eyebrow",value:e.eyebrow,onChange:s=>t({eyebrow:s})}),d.jsx(N,{label:"Heading",value:e.heading,onChange:s=>t({heading:s})}),d.jsx(Me,{label:"Lead",value:e.lead,onChange:s=>t({lead:s}),rows:3}),d.jsx(N,{label:"Image URL (remote images prefetched into PPTX)",value:e.image,onChange:s=>t({image:s})}),d.jsx(N,{label:"Image alt",value:e.imageAlt,onChange:s=>t({imageAlt:s})})]});case"comparison":return d.jsxs(d.Fragment,{children:[d.jsx(N,{label:"Eyebrow",value:e.eyebrow,onChange:s=>t({eyebrow:s})}),d.jsx(N,{label:"Heading",value:e.heading,onChange:s=>t({heading:s})}),d.jsx(N,{label:"Left label",value:e.leftLabel,onChange:s=>t({leftLabel:s})}),d.jsx(Me,{label:"Left body",value:e.left,onChange:s=>t({left:s}),rows:4}),d.jsx(N,{label:"Right label",value:e.rightLabel,onChange:s=>t({rightLabel:s})}),d.jsx(Me,{label:"Right body",value:e.right,onChange:s=>t({right:s}),rows:4}),d.jsx(Er,{label:"Emphasis",value:e.emphasis==="left"||e.emphasis==="right"?e.emphasis:"right",options:[{value:"left",label:"Grow left"},{value:"right",label:"Grow right"}],onChange:s=>t({emphasis:s})})]});case"code":return d.jsxs(d.Fragment,{children:[d.jsx(N,{label:"Eyebrow",value:e.eyebrow,onChange:s=>t({eyebrow:s})}),d.jsx(N,{label:"Heading",value:e.heading,onChange:s=>t({heading:s})}),d.jsx(N,{label:"Filename",value:e.filename,onChange:s=>t({filename:s})}),d.jsx(N,{label:"Language",value:e.language,onChange:s=>t({language:s})}),d.jsx(Me,{label:"Code",value:e.code,onChange:s=>t({code:s}),rows:8})]});case"quote":return d.jsxs(d.Fragment,{children:[d.jsx(Me,{label:"Quote",value:e.quote,onChange:s=>t({quote:s}),rows:4}),d.jsx(N,{label:"Attribution",value:e.by,onChange:s=>t({by:s})})]});case"feature-grid":return d.jsxs(d.Fragment,{children:[d.jsx(N,{label:"Eyebrow",value:e.eyebrow,onChange:s=>t({eyebrow:s})}),d.jsx(N,{label:"Heading",value:e.heading,onChange:s=>t({heading:s})}),d.jsx(Er,{label:"Columns",value:e.columns==="bento"?"bento":String(typeof e.columns=="number"?e.columns:3),options:[{value:"2",label:"2 columns"},{value:"3",label:"3 columns"},{value:"4",label:"4 columns"},{value:"bento",label:"Bento (hero + satellites)"}],onChange:s=>t({columns:s==="bento"?"bento":Number(s)})}),d.jsx(Rr,{label:"Cards",items:e.cards??[],onChange:s=>t({cards:s}),blank:()=>({title:"New card",body:""}),renderItem:(s,l)=>d.jsxs(d.Fragment,{children:[d.jsx(N,{label:"Icon (FontAwesome class)",value:s.icon,onChange:c=>l({...s,icon:c})}),d.jsx(N,{label:"Title",value:s.title,onChange:c=>l({...s,title:c})}),d.jsx(Me,{label:"Body",value:s.body,onChange:c=>l({...s,body:c}),rows:2})]})})]});case"stat-row":return d.jsxs(d.Fragment,{children:[d.jsx(N,{label:"Eyebrow",value:e.eyebrow,onChange:s=>t({eyebrow:s})}),d.jsx(N,{label:"Heading",value:e.heading,onChange:s=>t({heading:s})}),d.jsx(Rr,{label:"Stats",items:e.stats??[],onChange:s=>t({stats:s}),blank:()=>({value:"0",label:"Metric"}),renderItem:(s,l)=>d.jsxs(d.Fragment,{children:[d.jsx(N,{label:"Value",value:s.value,onChange:c=>l({...s,value:c})}),d.jsx(N,{label:"Label",value:s.label,onChange:c=>l({...s,label:c})})]})})]});case"timeline":return d.jsxs(d.Fragment,{children:[d.jsx(N,{label:"Eyebrow",value:e.eyebrow,onChange:s=>t({eyebrow:s})}),d.jsx(N,{label:"Heading",value:e.heading,onChange:s=>t({heading:s})}),d.jsx(Rr,{label:"Steps",items:e.steps??[],onChange:s=>t({steps:s}),blank:()=>({title:"New step",body:""}),renderItem:(s,l)=>d.jsxs(d.Fragment,{children:[d.jsx(N,{label:"Title",value:s.title,onChange:c=>l({...s,title:c})}),d.jsx(Me,{label:"Body",value:s.body,onChange:c=>l({...s,body:c}),rows:2})]})})]});case"data-table":return d.jsx(eS,{slide:e,set:t});default:return d.jsx("p",{className:"muted",children:"No editable fields for this layout."})}}}function eS({slide:e,set:n}){const t=Array.isArray(e.columns)?e.columns:[],r=Array.isArray(e.rows)?e.rows:[],a=Math.max(t.length,...r.map(l=>l.length),1),o=(l,c)=>{const p=t.slice();p[l]=c,n({columns:p})},i=()=>{n({columns:[...t,`Column ${t.length+1}`],rows:r.map(l=>[...l,""])})},s=l=>{n({columns:t.filter((c,p)=>p!==l),rows:r.map(c=>c.filter((p,g)=>g!==l))})};return d.jsxs(d.Fragment,{children:[d.jsx(N,{label:"Eyebrow",value:e.eyebrow,onChange:l=>n({eyebrow:l})}),d.jsx(N,{label:"Heading",value:e.heading,onChange:l=>n({heading:l})}),d.jsxs("div",{className:"list-editor",children:[d.jsxs("div",{className:"list-editor-head",children:[d.jsx("span",{className:"field-label",children:"Columns"}),d.jsx("button",{className:"btn btn-sm",onClick:i,children:"+ Column"})]}),Array.from({length:a}).map((l,c)=>d.jsxs("div",{className:"row-inline",children:[d.jsx("input",{className:"text-input",value:t[c]??"",placeholder:`Column ${c+1}`,onChange:p=>o(c,p.target.value)}),d.jsx("button",{className:"btn btn-icon btn-danger",title:"Remove column",onClick:()=>s(c),children:"✕"})]},c))]}),d.jsx(Rr,{label:"Rows",items:r,onChange:l=>n({rows:l}),blank:()=>Array.from({length:a},()=>""),renderItem:(l,c)=>d.jsx("div",{className:"row-cells",children:Array.from({length:a}).map((p,g)=>d.jsx("input",{className:"text-input",value:l[g]??"",placeholder:t[g]??`Col ${g+1}`,onChange:m=>{const b=l.slice();for(;b.length<a;)b.push("");b[g]=m.target.value,c(b)}},g))})})]})}function nS({html:e}){return d.jsx("div",{className:"preview",children:d.jsx("iframe",{className:"preview-frame",title:"Deck preview",srcDoc:e,sandbox:"allow-same-origin",referrerPolicy:"no-referrer"})})}const tS=`
html { scroll-behavior: smooth; scroll-snap-type: y mandatory; }
body { gap: 0 !important; padding: 0 !important; }
.slide { min-height: 100vh !important; margin: 0 !important; border-radius: 0 !important; scroll-snap-align: start !important; scroll-snap-stop: always !important; }
.pmd-attribution { display: none !important; }
`;function rS({html:e,slideCount:n,onClose:t}){const r=A.useRef(null),[a,o]=A.useState(0),i=e.replace("</head>",`<style>${tS}</style></head>`),s=l=>o(c=>Math.max(0,Math.min(n-1,c+l)));return A.useEffect(()=>{const l=c=>{c.key==="Escape"?t():c.key==="ArrowRight"||c.key===" "||c.key==="PageDown"?(c.preventDefault(),o(p=>Math.min(n-1,p+1))):(c.key==="ArrowLeft"||c.key==="PageUp")&&(c.preventDefault(),o(p=>Math.max(0,p-1)))};return window.addEventListener("keydown",l),()=>window.removeEventListener("keydown",l)},[t,n]),A.useEffect(()=>{var p,g;const l=(p=r.current)==null?void 0:p.contentDocument,c=l==null?void 0:l.querySelectorAll("section.slide");(g=c==null?void 0:c[a])==null||g.scrollIntoView({behavior:"smooth",block:"start"})},[a,i]),d.jsxs("div",{className:"present-overlay",children:[d.jsx("div",{className:"present-stage",children:d.jsx("iframe",{ref:r,className:"present-frame",title:"Present deck",srcDoc:i,sandbox:"allow-same-origin"})}),d.jsxs("div",{className:"present-bar",children:[d.jsx("button",{className:"btn btn-icon",title:"Previous (←)",onClick:()=>s(-1),children:"←"}),d.jsxs("span",{className:"present-count",children:[a+1," / ",n]}),d.jsx("button",{className:"btn btn-icon",title:"Next (→)",onClick:()=>s(1),children:"→"}),d.jsx("button",{className:"btn",onClick:t,children:"Exit · Esc"})]})]})}const pl=[{id:"claude-opus-4-8",label:"Opus 4.8 — most capable"},{id:"claude-sonnet-4-6",label:"Sonnet 4.6 — faster, cheaper"},{id:"claude-haiku-4-5",label:"Haiku 4.5 — fastest"}],l2=`You author slide decks as a single JSON object matching this schema — the "Deck JSON" spec used by presentation-md.

Top level:
{ "type": "deck",
  "meta": { "title": string, "company"?: string, "description"?: string, "theme": string },
  "slides": Slide[] }

Every Slide has a "layout" and layout-specific fields. The twelve layouts:

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
- Only emit fields defined above. Do not invent new layouts or fields.`;function c2(e,n){return`Create a deck for the following brief. Set meta.theme to "${n}".

Brief:
${e.trim()}`}function aS(e,n){return`${l2}

${c2(e,n)}

Respond with ONLY the JSON object — no prose, no markdown fences.`}function oS(e){const n=e.match(/```(?:json)?\s*([\s\S]*?)```/i),t=((n==null?void 0:n[1])??e).trim(),r=t.indexOf("{"),a=t.lastIndexOf("}");return r===-1||a===-1||a<r?t:t.slice(r,a+1)}async function iS(e){const{apiKey:n,model:t,brief:r,theme:a,signal:o}=e;if(!r.trim())throw new Error("Describe your deck first.");if(!n.trim())throw new Error("Enter your Anthropic API key.");const{default:i}=await i2(async()=>{const{default:g}=await import("./index-C72SIOk6.js");return{default:g}},__vite__mapDeps([2,1])),c=(await new i({apiKey:n.trim(),dangerouslyAllowBrowser:!0}).messages.create({model:t,max_tokens:8e3,system:l2,messages:[{role:"user",content:`${c2(r,a)}

Respond with ONLY the JSON object — no prose, no markdown fences.`}]},{signal:o})).content.map(g=>g.type==="text"?g.text:"").join("");if(!c.trim())throw new Error("The model returned an empty response. Try again.");let p;try{p=Ki(oS(c))}catch(g){throw new Error(`Couldn't parse the generated deck: ${g.message}`)}return p.meta={...p.meta,theme:a},p}const Cr="pmd-studio-anthropic-key",sS=["Q3 all-hands: momentum, key metrics, roadmap, and what's next.","Seed pitch for an AI-native analytics tool — problem, product, traction, ask.","Launch deck for a developer CLI: what it is, how it works, why it's fast."];function lS({currentTheme:e,onGenerate:n,onClose:t}){const[r,a]=A.useState(""),[o,i]=A.useState(e),[s,l]=A.useState(pl[0].id),[c,p]=A.useState(()=>localStorage.getItem(Cr)??""),[g,m]=A.useState(()=>!!localStorage.getItem(Cr)),[b,w]=A.useState(!1),[y,T]=A.useState(""),[f,u]=A.useState(!1),h=n2(),v=async()=>{w(!0),T("Generating your deck…");try{g?localStorage.setItem(Cr,c.trim()):localStorage.removeItem(Cr);const k=await iS({apiKey:c,model:s,brief:r,theme:o});n(k),t()}catch(k){T(k.message)}finally{w(!1)}},_=async()=>{try{await navigator.clipboard.writeText(aS(r,o)),u(!0),setTimeout(()=>u(!1),1800)}catch{T("Couldn't copy — select the prompt manually.")}};return d.jsx("div",{className:"modal-overlay",onClick:t,children:d.jsxs("div",{className:"modal",onClick:k=>k.stopPropagation(),children:[d.jsxs("header",{className:"modal-head",children:[d.jsxs("div",{children:[d.jsx("strong",{children:"Generate a deck"}),d.jsx("span",{className:"muted small",children:"Describe it — get an editable deck in seconds."})]}),d.jsx("button",{className:"btn btn-sm",onClick:t,"aria-label":"Close",children:"✕"})]}),d.jsxs("div",{className:"modal-body",children:[d.jsx("label",{className:"field-label",children:"What's the deck about?"}),d.jsx("textarea",{className:"text-input brief-input",value:r,placeholder:"e.g. Q3 all-hands covering revenue, product wins, and the roadmap for next quarter.",rows:4,onChange:k=>a(k.target.value)}),d.jsx("div",{className:"chip-row",children:sS.map(k=>d.jsx("button",{className:"chip",onClick:()=>a(k),title:"Use this brief",children:k.split(/[:—]/)[0].trim()},k))}),d.jsxs("div",{className:"field-grid",children:[d.jsxs("label",{className:"inline-field",children:[d.jsx("span",{className:"muted small",children:"Theme"}),d.jsx("select",{className:"text-input",value:o,onChange:k=>i(k.target.value),children:h.map(k=>d.jsx("option",{value:k,children:k},k))})]}),d.jsxs("label",{className:"inline-field",children:[d.jsx("span",{className:"muted small",children:"Model"}),d.jsx("select",{className:"text-input",value:s,onChange:k=>l(k.target.value),children:pl.map(k=>d.jsx("option",{value:k.id,children:k.label},k.id))})]})]}),d.jsxs("div",{className:"gen-panel",children:[d.jsx("label",{className:"field-label",children:"Your Anthropic API key"}),d.jsx("input",{className:"text-input",type:"password",value:c,placeholder:"sk-ant-…",autoComplete:"off",onChange:k=>p(k.target.value)}),d.jsxs("label",{className:"checkbox-field",children:[d.jsx("input",{type:"checkbox",checked:g,onChange:k=>m(k.target.checked)}),d.jsx("span",{className:"muted small",children:"Remember on this device (stored only in your browser)"})]}),d.jsxs("p",{className:"muted small privacy-note",children:["Your key stays in this browser. Requests go straight to Anthropic — nothing is sent to our servers. Get a key at ",d.jsx("a",{href:"https://console.anthropic.com/settings/keys",target:"_blank",rel:"noreferrer",children:"console.anthropic.com"}),"."]}),d.jsx("button",{className:"btn btn-primary btn-block",disabled:b,onClick:v,children:b?"Generating…":"Generate deck"})]}),d.jsx("div",{className:"gen-divider",children:d.jsx("span",{children:"or hand it to your agent"})}),d.jsxs("div",{className:"gen-panel",children:[d.jsx("p",{className:"muted small",children:"No key? Copy a ready-made prompt and paste it into Claude Code, Cursor, or any agent with the presentation skill installed — then open the resulting deck here."}),d.jsx("button",{className:"btn btn-block",onClick:_,disabled:!r.trim(),children:f?"Copied ✓":"Copy prompt for your agent"})]}),y&&d.jsx("p",{className:"status muted small gen-status",children:y})]})]})})}const d2="pmd-studio-deck-v1";function cS(){try{const e=localStorage.getItem(d2);if(e){const n=JSON.parse(e);if((n==null?void 0:n.type)==="deck"&&Array.isArray(n.slides)&&n.slides.length)return n}}catch{}return Fd}function dS(){var b;const[e,n]=A.useState(cS),[t,r]=A.useState(0),[a,o]=A.useState(!1),[i,s]=A.useState(!1);A.useEffect(()=>{try{localStorage.setItem(d2,JSON.stringify(e))}catch{}},[e]);const l=A.useMemo(()=>{var w;try{return o2(e,ct(((w=e.meta)==null?void 0:w.theme)??"default-tech"))}catch(y){return`<pre style="color:#d9695a;font-family:monospace;padding:24px">${String(y)}</pre>`}},[e]),c=(w,y)=>{n({...e,slides:w}),y!==void 0&&r(y)},p=w=>{n({...e,slides:e.slides.map((y,T)=>T===t?w:y)})},g=()=>{n(Fd),r(0)},m=e.slides[Math.min(t,e.slides.length-1)];return d.jsxs("div",{className:"app",children:[d.jsx(J_,{deck:e,onChange:n,onLoadExample:g,onPresent:()=>o(!0),onGenerate:()=>s(!0)}),d.jsxs("div",{className:"workspace",children:[d.jsx("aside",{className:"panel panel-left",children:d.jsx(X_,{slides:e.slides,selected:t,onSelect:r,onChange:c})}),d.jsx("main",{className:"panel panel-center",children:d.jsx(nS,{html:l})}),d.jsx("aside",{className:"panel panel-right",children:m?d.jsx(Z_,{slide:m,onChange:p}):d.jsx("p",{className:"muted",children:"No slide selected."})})]}),a&&d.jsx(rS,{html:l,slideCount:e.slides.length,onClose:()=>o(!1)}),i&&d.jsx(lS,{currentTheme:((b=e.meta)==null?void 0:b.theme)??"claude",onGenerate:w=>{n(w),r(0)},onClose:()=>s(!1)})]})}const u2=document.getElementById("root");if(!u2)throw new Error("Missing #root element");$d(u2).render(d.jsx(A.StrictMode,{children:d.jsx(dS,{})}));export{i2 as _};
