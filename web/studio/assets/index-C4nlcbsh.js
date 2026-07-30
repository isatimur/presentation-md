const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-BGbRnZJ4.js","assets/jszip.min-CzDb6sHe.js","assets/_commonjsHelpers-Cpj98o6Y.js","assets/index-kRSGI-aH.js","assets/index-Ci0KYd1T.js"])))=>i.map(i=>d[i]);
(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function t(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(a){if(a.ep)return;a.ep=!0;const o=t(a);fetch(a.href,o)}})();var gl={exports:{}},fa={},hl={exports:{}},z={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var tr=Symbol.for("react.element"),fk=Symbol.for("react.portal"),gk=Symbol.for("react.fragment"),hk=Symbol.for("react.strict_mode"),mk=Symbol.for("react.profiler"),bk=Symbol.for("react.provider"),vk=Symbol.for("react.context"),yk=Symbol.for("react.forward_ref"),xk=Symbol.for("react.suspense"),kk=Symbol.for("react.memo"),wk=Symbol.for("react.lazy"),es=Symbol.iterator;function _k(e){return e===null||typeof e!="object"?null:(e=es&&e[es]||e["@@iterator"],typeof e=="function"?e:null)}var ml={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},bl=Object.assign,vl={};function pt(e,n,t){this.props=e,this.context=n,this.refs=vl,this.updater=t||ml}pt.prototype.isReactComponent={};pt.prototype.setState=function(e,n){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,n,"setState")};pt.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function yl(){}yl.prototype=pt.prototype;function Zo(e,n,t){this.props=e,this.context=n,this.refs=vl,this.updater=t||ml}var ei=Zo.prototype=new yl;ei.constructor=Zo;bl(ei,pt.prototype);ei.isPureReactComponent=!0;var ns=Array.isArray,xl=Object.prototype.hasOwnProperty,ni={current:null},kl={key:!0,ref:!0,__self:!0,__source:!0};function wl(e,n,t){var r,a={},o=null,i=null;if(n!=null)for(r in n.ref!==void 0&&(i=n.ref),n.key!==void 0&&(o=""+n.key),n)xl.call(n,r)&&!kl.hasOwnProperty(r)&&(a[r]=n[r]);var s=arguments.length-2;if(s===1)a.children=t;else if(1<s){for(var l=Array(s),c=0;c<s;c++)l[c]=arguments[c+2];a.children=l}if(e&&e.defaultProps)for(r in s=e.defaultProps,s)a[r]===void 0&&(a[r]=s[r]);return{$$typeof:tr,type:e,key:o,ref:i,props:a,_owner:ni.current}}function Sk(e,n){return{$$typeof:tr,type:e.type,key:n,ref:e.ref,props:e.props,_owner:e._owner}}function ti(e){return typeof e=="object"&&e!==null&&e.$$typeof===tr}function $k(e){var n={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(t){return n[t]})}var ts=/\/+/g;function Ma(e,n){return typeof e=="object"&&e!==null&&e.key!=null?$k(""+e.key):n.toString(36)}function jr(e,n,t,r,a){var o=typeof e;(o==="undefined"||o==="boolean")&&(e=null);var i=!1;if(e===null)i=!0;else switch(o){case"string":case"number":i=!0;break;case"object":switch(e.$$typeof){case tr:case fk:i=!0}}if(i)return i=e,a=a(i),e=r===""?"."+Ma(i,0):r,ns(a)?(t="",e!=null&&(t=e.replace(ts,"$&/")+"/"),jr(a,n,t,"",function(c){return c})):a!=null&&(ti(a)&&(a=Sk(a,t+(!a.key||i&&i.key===a.key?"":(""+a.key).replace(ts,"$&/")+"/")+e)),n.push(a)),1;if(i=0,r=r===""?".":r+":",ns(e))for(var s=0;s<e.length;s++){o=e[s];var l=r+Ma(o,s);i+=jr(o,n,t,l,a)}else if(l=_k(e),typeof l=="function")for(e=l.call(e),s=0;!(o=e.next()).done;)o=o.value,l=r+Ma(o,s++),i+=jr(o,n,t,l,a);else if(o==="object")throw n=String(e),Error("Objects are not valid as a React child (found: "+(n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n)+"). If you meant to render a collection of children, use an array instead.");return i}function dr(e,n,t){if(e==null)return e;var r=[],a=0;return jr(e,r,"","",function(o){return n.call(t,o,a++)}),r}function Fk(e){if(e._status===-1){var n=e._result;n=n(),n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var de={current:null},Tr={transition:null},Ek={ReactCurrentDispatcher:de,ReactCurrentBatchConfig:Tr,ReactCurrentOwner:ni};function _l(){throw Error("act(...) is not supported in production builds of React.")}z.Children={map:dr,forEach:function(e,n,t){dr(e,function(){n.apply(this,arguments)},t)},count:function(e){var n=0;return dr(e,function(){n++}),n},toArray:function(e){return dr(e,function(n){return n})||[]},only:function(e){if(!ti(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};z.Component=pt;z.Fragment=gk;z.Profiler=mk;z.PureComponent=Zo;z.StrictMode=hk;z.Suspense=xk;z.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Ek;z.act=_l;z.cloneElement=function(e,n,t){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=bl({},e.props),a=e.key,o=e.ref,i=e._owner;if(n!=null){if(n.ref!==void 0&&(o=n.ref,i=ni.current),n.key!==void 0&&(a=""+n.key),e.type&&e.type.defaultProps)var s=e.type.defaultProps;for(l in n)xl.call(n,l)&&!kl.hasOwnProperty(l)&&(r[l]=n[l]===void 0&&s!==void 0?s[l]:n[l])}var l=arguments.length-2;if(l===1)r.children=t;else if(1<l){s=Array(l);for(var c=0;c<l;c++)s[c]=arguments[c+2];r.children=s}return{$$typeof:tr,type:e.type,key:a,ref:o,props:r,_owner:i}};z.createContext=function(e){return e={$$typeof:vk,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:bk,_context:e},e.Consumer=e};z.createElement=wl;z.createFactory=function(e){var n=wl.bind(null,e);return n.type=e,n};z.createRef=function(){return{current:null}};z.forwardRef=function(e){return{$$typeof:yk,render:e}};z.isValidElement=ti;z.lazy=function(e){return{$$typeof:wk,_payload:{_status:-1,_result:e},_init:Fk}};z.memo=function(e,n){return{$$typeof:kk,type:e,compare:n===void 0?null:n}};z.startTransition=function(e){var n=Tr.transition;Tr.transition={};try{e()}finally{Tr.transition=n}};z.unstable_act=_l;z.useCallback=function(e,n){return de.current.useCallback(e,n)};z.useContext=function(e){return de.current.useContext(e)};z.useDebugValue=function(){};z.useDeferredValue=function(e){return de.current.useDeferredValue(e)};z.useEffect=function(e,n){return de.current.useEffect(e,n)};z.useId=function(){return de.current.useId()};z.useImperativeHandle=function(e,n,t){return de.current.useImperativeHandle(e,n,t)};z.useInsertionEffect=function(e,n){return de.current.useInsertionEffect(e,n)};z.useLayoutEffect=function(e,n){return de.current.useLayoutEffect(e,n)};z.useMemo=function(e,n){return de.current.useMemo(e,n)};z.useReducer=function(e,n,t){return de.current.useReducer(e,n,t)};z.useRef=function(e){return de.current.useRef(e)};z.useState=function(e){return de.current.useState(e)};z.useSyncExternalStore=function(e,n,t){return de.current.useSyncExternalStore(e,n,t)};z.useTransition=function(){return de.current.useTransition()};z.version="18.3.1";hl.exports=z;var D=hl.exports;/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ck=D,jk=Symbol.for("react.element"),Tk=Symbol.for("react.fragment"),Pk=Object.prototype.hasOwnProperty,Mk=Ck.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Nk={key:!0,ref:!0,__self:!0,__source:!0};function Sl(e,n,t){var r,a={},o=null,i=null;t!==void 0&&(o=""+t),n.key!==void 0&&(o=""+n.key),n.ref!==void 0&&(i=n.ref);for(r in n)Pk.call(n,r)&&!Nk.hasOwnProperty(r)&&(a[r]=n[r]);if(e&&e.defaultProps)for(r in n=e.defaultProps,n)a[r]===void 0&&(a[r]=n[r]);return{$$typeof:jk,type:e,key:o,ref:i,props:a,_owner:Mk.current}}fa.Fragment=Tk;fa.jsx=Sl;fa.jsxs=Sl;gl.exports=fa;var d=gl.exports,$l={exports:{}},_e={},Fl={exports:{}},El={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function n(E,P){var M=E.length;E.push(P);e:for(;0<M;){var V=M-1>>>1,X=E[V];if(0<a(X,P))E[V]=P,E[M]=X,M=V;else break e}}function t(E){return E.length===0?null:E[0]}function r(E){if(E.length===0)return null;var P=E[0],M=E.pop();if(M!==P){E[0]=M;e:for(var V=0,X=E.length,lr=X>>>1;V<lr;){var wn=2*(V+1)-1,Pa=E[wn],_n=wn+1,cr=E[_n];if(0>a(Pa,M))_n<X&&0>a(cr,Pa)?(E[V]=cr,E[_n]=M,V=_n):(E[V]=Pa,E[wn]=M,V=wn);else if(_n<X&&0>a(cr,M))E[V]=cr,E[_n]=M,V=_n;else break e}}return P}function a(E,P){var M=E.sortIndex-P.sortIndex;return M!==0?M:E.id-P.id}if(typeof performance=="object"&&typeof performance.now=="function"){var o=performance;e.unstable_now=function(){return o.now()}}else{var i=Date,s=i.now();e.unstable_now=function(){return i.now()-s}}var l=[],c=[],p=1,g=null,m=3,b=!1,v=!1,y=!1,j=typeof setTimeout=="function"?setTimeout:null,f=typeof clearTimeout=="function"?clearTimeout:null,u=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function h(E){for(var P=t(c);P!==null;){if(P.callback===null)r(c);else if(P.startTime<=E)r(c),P.sortIndex=P.expirationTime,n(l,P);else break;P=t(c)}}function x(E){if(y=!1,h(E),!v)if(t(l)!==null)v=!0,ja(_);else{var P=t(c);P!==null&&Ta(x,P.startTime-E)}}function _(E,P){v=!1,y&&(y=!1,f($),$=-1),b=!0;var M=m;try{for(h(P),g=t(l);g!==null&&(!(g.expirationTime>P)||E&&!Y());){var V=g.callback;if(typeof V=="function"){g.callback=null,m=g.priorityLevel;var X=V(g.expirationTime<=P);P=e.unstable_now(),typeof X=="function"?g.callback=X:g===t(l)&&r(l),h(P)}else r(l);g=t(l)}if(g!==null)var lr=!0;else{var wn=t(c);wn!==null&&Ta(x,wn.startTime-P),lr=!1}return lr}finally{g=null,m=M,b=!1}}var w=!1,C=null,$=-1,S=5,T=-1;function Y(){return!(e.unstable_now()-T<S)}function Ue(){if(C!==null){var E=e.unstable_now();T=E;var P=!0;try{P=C(!0,E)}finally{P?mt():(w=!1,C=null)}}else w=!1}var mt;if(typeof u=="function")mt=function(){u(Ue)};else if(typeof MessageChannel<"u"){var Zi=new MessageChannel,pk=Zi.port2;Zi.port1.onmessage=Ue,mt=function(){pk.postMessage(null)}}else mt=function(){j(Ue,0)};function ja(E){C=E,w||(w=!0,mt())}function Ta(E,P){$=j(function(){E(e.unstable_now())},P)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(E){E.callback=null},e.unstable_continueExecution=function(){v||b||(v=!0,ja(_))},e.unstable_forceFrameRate=function(E){0>E||125<E?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):S=0<E?Math.floor(1e3/E):5},e.unstable_getCurrentPriorityLevel=function(){return m},e.unstable_getFirstCallbackNode=function(){return t(l)},e.unstable_next=function(E){switch(m){case 1:case 2:case 3:var P=3;break;default:P=m}var M=m;m=P;try{return E()}finally{m=M}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(E,P){switch(E){case 1:case 2:case 3:case 4:case 5:break;default:E=3}var M=m;m=E;try{return P()}finally{m=M}},e.unstable_scheduleCallback=function(E,P,M){var V=e.unstable_now();switch(typeof M=="object"&&M!==null?(M=M.delay,M=typeof M=="number"&&0<M?V+M:V):M=V,E){case 1:var X=-1;break;case 2:X=250;break;case 5:X=1073741823;break;case 4:X=1e4;break;default:X=5e3}return X=M+X,E={id:p++,callback:P,priorityLevel:E,startTime:M,expirationTime:X,sortIndex:-1},M>V?(E.sortIndex=M,n(c,E),t(l)===null&&E===t(c)&&(y?(f($),$=-1):y=!0,Ta(x,M-V))):(E.sortIndex=X,n(l,E),v||b||(v=!0,ja(_))),E},e.unstable_shouldYield=Y,e.unstable_wrapCallback=function(E){var P=m;return function(){var M=m;m=P;try{return E.apply(this,arguments)}finally{m=M}}}})(El);Fl.exports=El;var zk=Fl.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ak=D,we=zk;function k(e){for(var n="https://reactjs.org/docs/error-decoder.html?invariant="+e,t=1;t<arguments.length;t++)n+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Cl=new Set,Ot={};function In(e,n){rt(e,n),rt(e+"Capture",n)}function rt(e,n){for(Ot[e]=n,e=0;e<n.length;e++)Cl.add(n[e])}var Ke=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),oo=Object.prototype.hasOwnProperty,Ik=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,rs={},as={};function Dk(e){return oo.call(as,e)?!0:oo.call(rs,e)?!1:Ik.test(e)?as[e]=!0:(rs[e]=!0,!1)}function Ok(e,n,t,r){if(t!==null&&t.type===0)return!1;switch(typeof n){case"function":case"symbol":return!0;case"boolean":return r?!1:t!==null?!t.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Bk(e,n,t,r){if(n===null||typeof n>"u"||Ok(e,n,t,r))return!0;if(r)return!1;if(t!==null)switch(t.type){case 3:return!n;case 4:return n===!1;case 5:return isNaN(n);case 6:return isNaN(n)||1>n}return!1}function ue(e,n,t,r,a,o,i){this.acceptsBooleans=n===2||n===3||n===4,this.attributeName=r,this.attributeNamespace=a,this.mustUseProperty=t,this.propertyName=e,this.type=n,this.sanitizeURL=o,this.removeEmptyString=i}var re={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){re[e]=new ue(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var n=e[0];re[n]=new ue(n,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){re[e]=new ue(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){re[e]=new ue(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){re[e]=new ue(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){re[e]=new ue(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){re[e]=new ue(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){re[e]=new ue(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){re[e]=new ue(e,5,!1,e.toLowerCase(),null,!1,!1)});var ri=/[\-:]([a-z])/g;function ai(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var n=e.replace(ri,ai);re[n]=new ue(n,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var n=e.replace(ri,ai);re[n]=new ue(n,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var n=e.replace(ri,ai);re[n]=new ue(n,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){re[e]=new ue(e,1,!1,e.toLowerCase(),null,!1,!1)});re.xlinkHref=new ue("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){re[e]=new ue(e,1,!1,e.toLowerCase(),null,!0,!0)});function oi(e,n,t,r){var a=re.hasOwnProperty(n)?re[n]:null;(a!==null?a.type!==0:r||!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(Bk(n,t,a,r)&&(t=null),r||a===null?Dk(n)&&(t===null?e.removeAttribute(n):e.setAttribute(n,""+t)):a.mustUseProperty?e[a.propertyName]=t===null?a.type===3?!1:"":t:(n=a.attributeName,r=a.attributeNamespace,t===null?e.removeAttribute(n):(a=a.type,t=a===3||a===4&&t===!0?"":""+t,r?e.setAttributeNS(r,n,t):e.setAttribute(n,t))))}var en=Ak.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ur=Symbol.for("react.element"),Bn=Symbol.for("react.portal"),Ln=Symbol.for("react.fragment"),ii=Symbol.for("react.strict_mode"),io=Symbol.for("react.profiler"),jl=Symbol.for("react.provider"),Tl=Symbol.for("react.context"),si=Symbol.for("react.forward_ref"),so=Symbol.for("react.suspense"),lo=Symbol.for("react.suspense_list"),li=Symbol.for("react.memo"),tn=Symbol.for("react.lazy"),Pl=Symbol.for("react.offscreen"),os=Symbol.iterator;function bt(e){return e===null||typeof e!="object"?null:(e=os&&e[os]||e["@@iterator"],typeof e=="function"?e:null)}var U=Object.assign,Na;function $t(e){if(Na===void 0)try{throw Error()}catch(t){var n=t.stack.trim().match(/\n( *(at )?)/);Na=n&&n[1]||""}return`
`+Na+e}var za=!1;function Aa(e,n){if(!e||za)return"";za=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(n)if(n=function(){throw Error()},Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(n,[])}catch(c){var r=c}Reflect.construct(e,[],n)}else{try{n.call()}catch(c){r=c}e.call(n.prototype)}else{try{throw Error()}catch(c){r=c}e()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var a=c.stack.split(`
`),o=r.stack.split(`
`),i=a.length-1,s=o.length-1;1<=i&&0<=s&&a[i]!==o[s];)s--;for(;1<=i&&0<=s;i--,s--)if(a[i]!==o[s]){if(i!==1||s!==1)do if(i--,s--,0>s||a[i]!==o[s]){var l=`
`+a[i].replace(" at new "," at ");return e.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",e.displayName)),l}while(1<=i&&0<=s);break}}}finally{za=!1,Error.prepareStackTrace=t}return(e=e?e.displayName||e.name:"")?$t(e):""}function Lk(e){switch(e.tag){case 5:return $t(e.type);case 16:return $t("Lazy");case 13:return $t("Suspense");case 19:return $t("SuspenseList");case 0:case 2:case 15:return e=Aa(e.type,!1),e;case 11:return e=Aa(e.type.render,!1),e;case 1:return e=Aa(e.type,!0),e;default:return""}}function co(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Ln:return"Fragment";case Bn:return"Portal";case io:return"Profiler";case ii:return"StrictMode";case so:return"Suspense";case lo:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Tl:return(e.displayName||"Context")+".Consumer";case jl:return(e._context.displayName||"Context")+".Provider";case si:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case li:return n=e.displayName||null,n!==null?n:co(e.type)||"Memo";case tn:n=e._payload,e=e._init;try{return co(e(n))}catch{}}return null}function Rk(e){var n=e.type;switch(e.tag){case 24:return"Cache";case 9:return(n.displayName||"Context")+".Consumer";case 10:return(n._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=n.render,e=e.displayName||e.name||"",n.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return n;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return co(n);case 8:return n===ii?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n}return null}function bn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Ml(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function Wk(e){var n=Ml(e)?"checked":"value",t=Object.getOwnPropertyDescriptor(e.constructor.prototype,n),r=""+e[n];if(!e.hasOwnProperty(n)&&typeof t<"u"&&typeof t.get=="function"&&typeof t.set=="function"){var a=t.get,o=t.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return a.call(this)},set:function(i){r=""+i,o.call(this,i)}}),Object.defineProperty(e,n,{enumerable:t.enumerable}),{getValue:function(){return r},setValue:function(i){r=""+i},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function pr(e){e._valueTracker||(e._valueTracker=Wk(e))}function Nl(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var t=n.getValue(),r="";return e&&(r=Ml(e)?e.checked?"true":"false":e.value),e=r,e!==t?(n.setValue(e),!0):!1}function Wr(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function uo(e,n){var t=n.checked;return U({},n,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:t??e._wrapperState.initialChecked})}function is(e,n){var t=n.defaultValue==null?"":n.defaultValue,r=n.checked!=null?n.checked:n.defaultChecked;t=bn(n.value!=null?n.value:t),e._wrapperState={initialChecked:r,initialValue:t,controlled:n.type==="checkbox"||n.type==="radio"?n.checked!=null:n.value!=null}}function zl(e,n){n=n.checked,n!=null&&oi(e,"checked",n,!1)}function po(e,n){zl(e,n);var t=bn(n.value),r=n.type;if(t!=null)r==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+t):e.value!==""+t&&(e.value=""+t);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}n.hasOwnProperty("value")?fo(e,n.type,t):n.hasOwnProperty("defaultValue")&&fo(e,n.type,bn(n.defaultValue)),n.checked==null&&n.defaultChecked!=null&&(e.defaultChecked=!!n.defaultChecked)}function ss(e,n,t){if(n.hasOwnProperty("value")||n.hasOwnProperty("defaultValue")){var r=n.type;if(!(r!=="submit"&&r!=="reset"||n.value!==void 0&&n.value!==null))return;n=""+e._wrapperState.initialValue,t||n===e.value||(e.value=n),e.defaultValue=n}t=e.name,t!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,t!==""&&(e.name=t)}function fo(e,n,t){(n!=="number"||Wr(e.ownerDocument)!==e)&&(t==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+t&&(e.defaultValue=""+t))}var Ft=Array.isArray;function Jn(e,n,t,r){if(e=e.options,n){n={};for(var a=0;a<t.length;a++)n["$"+t[a]]=!0;for(t=0;t<e.length;t++)a=n.hasOwnProperty("$"+e[t].value),e[t].selected!==a&&(e[t].selected=a),a&&r&&(e[t].defaultSelected=!0)}else{for(t=""+bn(t),n=null,a=0;a<e.length;a++){if(e[a].value===t){e[a].selected=!0,r&&(e[a].defaultSelected=!0);return}n!==null||e[a].disabled||(n=e[a])}n!==null&&(n.selected=!0)}}function go(e,n){if(n.dangerouslySetInnerHTML!=null)throw Error(k(91));return U({},n,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function ls(e,n){var t=n.value;if(t==null){if(t=n.children,n=n.defaultValue,t!=null){if(n!=null)throw Error(k(92));if(Ft(t)){if(1<t.length)throw Error(k(93));t=t[0]}n=t}n==null&&(n=""),t=n}e._wrapperState={initialValue:bn(t)}}function Al(e,n){var t=bn(n.value),r=bn(n.defaultValue);t!=null&&(t=""+t,t!==e.value&&(e.value=t),n.defaultValue==null&&e.defaultValue!==t&&(e.defaultValue=t)),r!=null&&(e.defaultValue=""+r)}function cs(e){var n=e.textContent;n===e._wrapperState.initialValue&&n!==""&&n!==null&&(e.value=n)}function Il(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function ho(e,n){return e==null||e==="http://www.w3.org/1999/xhtml"?Il(n):e==="http://www.w3.org/2000/svg"&&n==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var fr,Dl=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(n,t,r,a){MSApp.execUnsafeLocalFunction(function(){return e(n,t,r,a)})}:e}(function(e,n){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=n;else{for(fr=fr||document.createElement("div"),fr.innerHTML="<svg>"+n.valueOf().toString()+"</svg>",n=fr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;n.firstChild;)e.appendChild(n.firstChild)}});function Bt(e,n){if(n){var t=e.firstChild;if(t&&t===e.lastChild&&t.nodeType===3){t.nodeValue=n;return}}e.textContent=n}var jt={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Gk=["Webkit","ms","Moz","O"];Object.keys(jt).forEach(function(e){Gk.forEach(function(n){n=n+e.charAt(0).toUpperCase()+e.substring(1),jt[n]=jt[e]})});function Ol(e,n,t){return n==null||typeof n=="boolean"||n===""?"":t||typeof n!="number"||n===0||jt.hasOwnProperty(e)&&jt[e]?(""+n).trim():n+"px"}function Bl(e,n){e=e.style;for(var t in n)if(n.hasOwnProperty(t)){var r=t.indexOf("--")===0,a=Ol(t,n[t],r);t==="float"&&(t="cssFloat"),r?e.setProperty(t,a):e[t]=a}}var Uk=U({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function mo(e,n){if(n){if(Uk[e]&&(n.children!=null||n.dangerouslySetInnerHTML!=null))throw Error(k(137,e));if(n.dangerouslySetInnerHTML!=null){if(n.children!=null)throw Error(k(60));if(typeof n.dangerouslySetInnerHTML!="object"||!("__html"in n.dangerouslySetInnerHTML))throw Error(k(61))}if(n.style!=null&&typeof n.style!="object")throw Error(k(62))}}function bo(e,n){if(e.indexOf("-")===-1)return typeof n.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var vo=null;function ci(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var yo=null,Xn=null,Zn=null;function ds(e){if(e=or(e)){if(typeof yo!="function")throw Error(k(280));var n=e.stateNode;n&&(n=va(n),yo(e.stateNode,e.type,n))}}function Ll(e){Xn?Zn?Zn.push(e):Zn=[e]:Xn=e}function Rl(){if(Xn){var e=Xn,n=Zn;if(Zn=Xn=null,ds(e),n)for(e=0;e<n.length;e++)ds(n[e])}}function Wl(e,n){return e(n)}function Gl(){}var Ia=!1;function Ul(e,n,t){if(Ia)return e(n,t);Ia=!0;try{return Wl(e,n,t)}finally{Ia=!1,(Xn!==null||Zn!==null)&&(Gl(),Rl())}}function Lt(e,n){var t=e.stateNode;if(t===null)return null;var r=va(t);if(r===null)return null;t=r[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(t&&typeof t!="function")throw Error(k(231,n,typeof t));return t}var xo=!1;if(Ke)try{var vt={};Object.defineProperty(vt,"passive",{get:function(){xo=!0}}),window.addEventListener("test",vt,vt),window.removeEventListener("test",vt,vt)}catch{xo=!1}function Hk(e,n,t,r,a,o,i,s,l){var c=Array.prototype.slice.call(arguments,3);try{n.apply(t,c)}catch(p){this.onError(p)}}var Tt=!1,Gr=null,Ur=!1,ko=null,Vk={onError:function(e){Tt=!0,Gr=e}};function qk(e,n,t,r,a,o,i,s,l){Tt=!1,Gr=null,Hk.apply(Vk,arguments)}function Qk(e,n,t,r,a,o,i,s,l){if(qk.apply(this,arguments),Tt){if(Tt){var c=Gr;Tt=!1,Gr=null}else throw Error(k(198));Ur||(Ur=!0,ko=c)}}function Dn(e){var n=e,t=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,n.flags&4098&&(t=n.return),e=n.return;while(e)}return n.tag===3?t:null}function Hl(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function us(e){if(Dn(e)!==e)throw Error(k(188))}function Yk(e){var n=e.alternate;if(!n){if(n=Dn(e),n===null)throw Error(k(188));return n!==e?null:e}for(var t=e,r=n;;){var a=t.return;if(a===null)break;var o=a.alternate;if(o===null){if(r=a.return,r!==null){t=r;continue}break}if(a.child===o.child){for(o=a.child;o;){if(o===t)return us(a),e;if(o===r)return us(a),n;o=o.sibling}throw Error(k(188))}if(t.return!==r.return)t=a,r=o;else{for(var i=!1,s=a.child;s;){if(s===t){i=!0,t=a,r=o;break}if(s===r){i=!0,r=a,t=o;break}s=s.sibling}if(!i){for(s=o.child;s;){if(s===t){i=!0,t=o,r=a;break}if(s===r){i=!0,r=o,t=a;break}s=s.sibling}if(!i)throw Error(k(189))}}if(t.alternate!==r)throw Error(k(190))}if(t.tag!==3)throw Error(k(188));return t.stateNode.current===t?e:n}function Vl(e){return e=Yk(e),e!==null?ql(e):null}function ql(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var n=ql(e);if(n!==null)return n;e=e.sibling}return null}var Ql=we.unstable_scheduleCallback,ps=we.unstable_cancelCallback,Kk=we.unstable_shouldYield,Jk=we.unstable_requestPaint,q=we.unstable_now,Xk=we.unstable_getCurrentPriorityLevel,di=we.unstable_ImmediatePriority,Yl=we.unstable_UserBlockingPriority,Hr=we.unstable_NormalPriority,Zk=we.unstable_LowPriority,Kl=we.unstable_IdlePriority,ga=null,We=null;function e2(e){if(We&&typeof We.onCommitFiberRoot=="function")try{We.onCommitFiberRoot(ga,e,void 0,(e.current.flags&128)===128)}catch{}}var Ie=Math.clz32?Math.clz32:r2,n2=Math.log,t2=Math.LN2;function r2(e){return e>>>=0,e===0?32:31-(n2(e)/t2|0)|0}var gr=64,hr=4194304;function Et(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Vr(e,n){var t=e.pendingLanes;if(t===0)return 0;var r=0,a=e.suspendedLanes,o=e.pingedLanes,i=t&268435455;if(i!==0){var s=i&~a;s!==0?r=Et(s):(o&=i,o!==0&&(r=Et(o)))}else i=t&~a,i!==0?r=Et(i):o!==0&&(r=Et(o));if(r===0)return 0;if(n!==0&&n!==r&&!(n&a)&&(a=r&-r,o=n&-n,a>=o||a===16&&(o&4194240)!==0))return n;if(r&4&&(r|=t&16),n=e.entangledLanes,n!==0)for(e=e.entanglements,n&=r;0<n;)t=31-Ie(n),a=1<<t,r|=e[t],n&=~a;return r}function a2(e,n){switch(e){case 1:case 2:case 4:return n+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function o2(e,n){for(var t=e.suspendedLanes,r=e.pingedLanes,a=e.expirationTimes,o=e.pendingLanes;0<o;){var i=31-Ie(o),s=1<<i,l=a[i];l===-1?(!(s&t)||s&r)&&(a[i]=a2(s,n)):l<=n&&(e.expiredLanes|=s),o&=~s}}function wo(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Jl(){var e=gr;return gr<<=1,!(gr&4194240)&&(gr=64),e}function Da(e){for(var n=[],t=0;31>t;t++)n.push(e);return n}function rr(e,n,t){e.pendingLanes|=n,n!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,n=31-Ie(n),e[n]=t}function i2(e,n){var t=e.pendingLanes&~n;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=n,e.mutableReadLanes&=n,e.entangledLanes&=n,n=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<t;){var a=31-Ie(t),o=1<<a;n[a]=0,r[a]=-1,e[a]=-1,t&=~o}}function ui(e,n){var t=e.entangledLanes|=n;for(e=e.entanglements;t;){var r=31-Ie(t),a=1<<r;a&n|e[r]&n&&(e[r]|=n),t&=~a}}var I=0;function Xl(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Zl,pi,ec,nc,tc,_o=!1,mr=[],cn=null,dn=null,un=null,Rt=new Map,Wt=new Map,an=[],s2="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function fs(e,n){switch(e){case"focusin":case"focusout":cn=null;break;case"dragenter":case"dragleave":dn=null;break;case"mouseover":case"mouseout":un=null;break;case"pointerover":case"pointerout":Rt.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":Wt.delete(n.pointerId)}}function yt(e,n,t,r,a,o){return e===null||e.nativeEvent!==o?(e={blockedOn:n,domEventName:t,eventSystemFlags:r,nativeEvent:o,targetContainers:[a]},n!==null&&(n=or(n),n!==null&&pi(n)),e):(e.eventSystemFlags|=r,n=e.targetContainers,a!==null&&n.indexOf(a)===-1&&n.push(a),e)}function l2(e,n,t,r,a){switch(n){case"focusin":return cn=yt(cn,e,n,t,r,a),!0;case"dragenter":return dn=yt(dn,e,n,t,r,a),!0;case"mouseover":return un=yt(un,e,n,t,r,a),!0;case"pointerover":var o=a.pointerId;return Rt.set(o,yt(Rt.get(o)||null,e,n,t,r,a)),!0;case"gotpointercapture":return o=a.pointerId,Wt.set(o,yt(Wt.get(o)||null,e,n,t,r,a)),!0}return!1}function rc(e){var n=Fn(e.target);if(n!==null){var t=Dn(n);if(t!==null){if(n=t.tag,n===13){if(n=Hl(t),n!==null){e.blockedOn=n,tc(e.priority,function(){ec(t)});return}}else if(n===3&&t.stateNode.current.memoizedState.isDehydrated){e.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Pr(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var t=So(e.domEventName,e.eventSystemFlags,n[0],e.nativeEvent);if(t===null){t=e.nativeEvent;var r=new t.constructor(t.type,t);vo=r,t.target.dispatchEvent(r),vo=null}else return n=or(t),n!==null&&pi(n),e.blockedOn=t,!1;n.shift()}return!0}function gs(e,n,t){Pr(e)&&t.delete(n)}function c2(){_o=!1,cn!==null&&Pr(cn)&&(cn=null),dn!==null&&Pr(dn)&&(dn=null),un!==null&&Pr(un)&&(un=null),Rt.forEach(gs),Wt.forEach(gs)}function xt(e,n){e.blockedOn===n&&(e.blockedOn=null,_o||(_o=!0,we.unstable_scheduleCallback(we.unstable_NormalPriority,c2)))}function Gt(e){function n(a){return xt(a,e)}if(0<mr.length){xt(mr[0],e);for(var t=1;t<mr.length;t++){var r=mr[t];r.blockedOn===e&&(r.blockedOn=null)}}for(cn!==null&&xt(cn,e),dn!==null&&xt(dn,e),un!==null&&xt(un,e),Rt.forEach(n),Wt.forEach(n),t=0;t<an.length;t++)r=an[t],r.blockedOn===e&&(r.blockedOn=null);for(;0<an.length&&(t=an[0],t.blockedOn===null);)rc(t),t.blockedOn===null&&an.shift()}var et=en.ReactCurrentBatchConfig,qr=!0;function d2(e,n,t,r){var a=I,o=et.transition;et.transition=null;try{I=1,fi(e,n,t,r)}finally{I=a,et.transition=o}}function u2(e,n,t,r){var a=I,o=et.transition;et.transition=null;try{I=4,fi(e,n,t,r)}finally{I=a,et.transition=o}}function fi(e,n,t,r){if(qr){var a=So(e,n,t,r);if(a===null)qa(e,n,r,Qr,t),fs(e,r);else if(l2(a,e,n,t,r))r.stopPropagation();else if(fs(e,r),n&4&&-1<s2.indexOf(e)){for(;a!==null;){var o=or(a);if(o!==null&&Zl(o),o=So(e,n,t,r),o===null&&qa(e,n,r,Qr,t),o===a)break;a=o}a!==null&&r.stopPropagation()}else qa(e,n,r,null,t)}}var Qr=null;function So(e,n,t,r){if(Qr=null,e=ci(r),e=Fn(e),e!==null)if(n=Dn(e),n===null)e=null;else if(t=n.tag,t===13){if(e=Hl(n),e!==null)return e;e=null}else if(t===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null);return Qr=e,null}function ac(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Xk()){case di:return 1;case Yl:return 4;case Hr:case Zk:return 16;case Kl:return 536870912;default:return 16}default:return 16}}var sn=null,gi=null,Mr=null;function oc(){if(Mr)return Mr;var e,n=gi,t=n.length,r,a="value"in sn?sn.value:sn.textContent,o=a.length;for(e=0;e<t&&n[e]===a[e];e++);var i=t-e;for(r=1;r<=i&&n[t-r]===a[o-r];r++);return Mr=a.slice(e,1<r?1-r:void 0)}function Nr(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function br(){return!0}function hs(){return!1}function Se(e){function n(t,r,a,o,i){this._reactName=t,this._targetInst=a,this.type=r,this.nativeEvent=o,this.target=i,this.currentTarget=null;for(var s in e)e.hasOwnProperty(s)&&(t=e[s],this[s]=t?t(o):o[s]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?br:hs,this.isPropagationStopped=hs,this}return U(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=br)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=br)},persist:function(){},isPersistent:br}),n}var ft={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},hi=Se(ft),ar=U({},ft,{view:0,detail:0}),p2=Se(ar),Oa,Ba,kt,ha=U({},ar,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:mi,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==kt&&(kt&&e.type==="mousemove"?(Oa=e.screenX-kt.screenX,Ba=e.screenY-kt.screenY):Ba=Oa=0,kt=e),Oa)},movementY:function(e){return"movementY"in e?e.movementY:Ba}}),ms=Se(ha),f2=U({},ha,{dataTransfer:0}),g2=Se(f2),h2=U({},ar,{relatedTarget:0}),La=Se(h2),m2=U({},ft,{animationName:0,elapsedTime:0,pseudoElement:0}),b2=Se(m2),v2=U({},ft,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),y2=Se(v2),x2=U({},ft,{data:0}),bs=Se(x2),k2={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},w2={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},_2={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function S2(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=_2[e])?!!n[e]:!1}function mi(){return S2}var $2=U({},ar,{key:function(e){if(e.key){var n=k2[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=Nr(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?w2[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:mi,charCode:function(e){return e.type==="keypress"?Nr(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Nr(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),F2=Se($2),E2=U({},ha,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),vs=Se(E2),C2=U({},ar,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:mi}),j2=Se(C2),T2=U({},ft,{propertyName:0,elapsedTime:0,pseudoElement:0}),P2=Se(T2),M2=U({},ha,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),N2=Se(M2),z2=[9,13,27,32],bi=Ke&&"CompositionEvent"in window,Pt=null;Ke&&"documentMode"in document&&(Pt=document.documentMode);var A2=Ke&&"TextEvent"in window&&!Pt,ic=Ke&&(!bi||Pt&&8<Pt&&11>=Pt),ys=" ",xs=!1;function sc(e,n){switch(e){case"keyup":return z2.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function lc(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Rn=!1;function I2(e,n){switch(e){case"compositionend":return lc(n);case"keypress":return n.which!==32?null:(xs=!0,ys);case"textInput":return e=n.data,e===ys&&xs?null:e;default:return null}}function D2(e,n){if(Rn)return e==="compositionend"||!bi&&sc(e,n)?(e=oc(),Mr=gi=sn=null,Rn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return ic&&n.locale!=="ko"?null:n.data;default:return null}}var O2={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ks(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!O2[e.type]:n==="textarea"}function cc(e,n,t,r){Ll(r),n=Yr(n,"onChange"),0<n.length&&(t=new hi("onChange","change",null,t,r),e.push({event:t,listeners:n}))}var Mt=null,Ut=null;function B2(e){xc(e,0)}function ma(e){var n=Un(e);if(Nl(n))return e}function L2(e,n){if(e==="change")return n}var dc=!1;if(Ke){var Ra;if(Ke){var Wa="oninput"in document;if(!Wa){var ws=document.createElement("div");ws.setAttribute("oninput","return;"),Wa=typeof ws.oninput=="function"}Ra=Wa}else Ra=!1;dc=Ra&&(!document.documentMode||9<document.documentMode)}function _s(){Mt&&(Mt.detachEvent("onpropertychange",uc),Ut=Mt=null)}function uc(e){if(e.propertyName==="value"&&ma(Ut)){var n=[];cc(n,Ut,e,ci(e)),Ul(B2,n)}}function R2(e,n,t){e==="focusin"?(_s(),Mt=n,Ut=t,Mt.attachEvent("onpropertychange",uc)):e==="focusout"&&_s()}function W2(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return ma(Ut)}function G2(e,n){if(e==="click")return ma(n)}function U2(e,n){if(e==="input"||e==="change")return ma(n)}function H2(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var Oe=typeof Object.is=="function"?Object.is:H2;function Ht(e,n){if(Oe(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var t=Object.keys(e),r=Object.keys(n);if(t.length!==r.length)return!1;for(r=0;r<t.length;r++){var a=t[r];if(!oo.call(n,a)||!Oe(e[a],n[a]))return!1}return!0}function Ss(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function $s(e,n){var t=Ss(e);e=0;for(var r;t;){if(t.nodeType===3){if(r=e+t.textContent.length,e<=n&&r>=n)return{node:t,offset:n-e};e=r}e:{for(;t;){if(t.nextSibling){t=t.nextSibling;break e}t=t.parentNode}t=void 0}t=Ss(t)}}function pc(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?pc(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function fc(){for(var e=window,n=Wr();n instanceof e.HTMLIFrameElement;){try{var t=typeof n.contentWindow.location.href=="string"}catch{t=!1}if(t)e=n.contentWindow;else break;n=Wr(e.document)}return n}function vi(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}function V2(e){var n=fc(),t=e.focusedElem,r=e.selectionRange;if(n!==t&&t&&t.ownerDocument&&pc(t.ownerDocument.documentElement,t)){if(r!==null&&vi(t)){if(n=r.start,e=r.end,e===void 0&&(e=n),"selectionStart"in t)t.selectionStart=n,t.selectionEnd=Math.min(e,t.value.length);else if(e=(n=t.ownerDocument||document)&&n.defaultView||window,e.getSelection){e=e.getSelection();var a=t.textContent.length,o=Math.min(r.start,a);r=r.end===void 0?o:Math.min(r.end,a),!e.extend&&o>r&&(a=r,r=o,o=a),a=$s(t,o);var i=$s(t,r);a&&i&&(e.rangeCount!==1||e.anchorNode!==a.node||e.anchorOffset!==a.offset||e.focusNode!==i.node||e.focusOffset!==i.offset)&&(n=n.createRange(),n.setStart(a.node,a.offset),e.removeAllRanges(),o>r?(e.addRange(n),e.extend(i.node,i.offset)):(n.setEnd(i.node,i.offset),e.addRange(n)))}}for(n=[],e=t;e=e.parentNode;)e.nodeType===1&&n.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof t.focus=="function"&&t.focus(),t=0;t<n.length;t++)e=n[t],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var q2=Ke&&"documentMode"in document&&11>=document.documentMode,Wn=null,$o=null,Nt=null,Fo=!1;function Fs(e,n,t){var r=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;Fo||Wn==null||Wn!==Wr(r)||(r=Wn,"selectionStart"in r&&vi(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Nt&&Ht(Nt,r)||(Nt=r,r=Yr($o,"onSelect"),0<r.length&&(n=new hi("onSelect","select",null,n,t),e.push({event:n,listeners:r}),n.target=Wn)))}function vr(e,n){var t={};return t[e.toLowerCase()]=n.toLowerCase(),t["Webkit"+e]="webkit"+n,t["Moz"+e]="moz"+n,t}var Gn={animationend:vr("Animation","AnimationEnd"),animationiteration:vr("Animation","AnimationIteration"),animationstart:vr("Animation","AnimationStart"),transitionend:vr("Transition","TransitionEnd")},Ga={},gc={};Ke&&(gc=document.createElement("div").style,"AnimationEvent"in window||(delete Gn.animationend.animation,delete Gn.animationiteration.animation,delete Gn.animationstart.animation),"TransitionEvent"in window||delete Gn.transitionend.transition);function ba(e){if(Ga[e])return Ga[e];if(!Gn[e])return e;var n=Gn[e],t;for(t in n)if(n.hasOwnProperty(t)&&t in gc)return Ga[e]=n[t];return e}var hc=ba("animationend"),mc=ba("animationiteration"),bc=ba("animationstart"),vc=ba("transitionend"),yc=new Map,Es="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function yn(e,n){yc.set(e,n),In(n,[e])}for(var Ua=0;Ua<Es.length;Ua++){var Ha=Es[Ua],Q2=Ha.toLowerCase(),Y2=Ha[0].toUpperCase()+Ha.slice(1);yn(Q2,"on"+Y2)}yn(hc,"onAnimationEnd");yn(mc,"onAnimationIteration");yn(bc,"onAnimationStart");yn("dblclick","onDoubleClick");yn("focusin","onFocus");yn("focusout","onBlur");yn(vc,"onTransitionEnd");rt("onMouseEnter",["mouseout","mouseover"]);rt("onMouseLeave",["mouseout","mouseover"]);rt("onPointerEnter",["pointerout","pointerover"]);rt("onPointerLeave",["pointerout","pointerover"]);In("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));In("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));In("onBeforeInput",["compositionend","keypress","textInput","paste"]);In("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));In("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));In("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ct="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),K2=new Set("cancel close invalid load scroll toggle".split(" ").concat(Ct));function Cs(e,n,t){var r=e.type||"unknown-event";e.currentTarget=t,Qk(r,n,void 0,e),e.currentTarget=null}function xc(e,n){n=(n&4)!==0;for(var t=0;t<e.length;t++){var r=e[t],a=r.event;r=r.listeners;e:{var o=void 0;if(n)for(var i=r.length-1;0<=i;i--){var s=r[i],l=s.instance,c=s.currentTarget;if(s=s.listener,l!==o&&a.isPropagationStopped())break e;Cs(a,s,c),o=l}else for(i=0;i<r.length;i++){if(s=r[i],l=s.instance,c=s.currentTarget,s=s.listener,l!==o&&a.isPropagationStopped())break e;Cs(a,s,c),o=l}}}if(Ur)throw e=ko,Ur=!1,ko=null,e}function B(e,n){var t=n[Po];t===void 0&&(t=n[Po]=new Set);var r=e+"__bubble";t.has(r)||(kc(n,e,2,!1),t.add(r))}function Va(e,n,t){var r=0;n&&(r|=4),kc(t,e,r,n)}var yr="_reactListening"+Math.random().toString(36).slice(2);function Vt(e){if(!e[yr]){e[yr]=!0,Cl.forEach(function(t){t!=="selectionchange"&&(K2.has(t)||Va(t,!1,e),Va(t,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[yr]||(n[yr]=!0,Va("selectionchange",!1,n))}}function kc(e,n,t,r){switch(ac(n)){case 1:var a=d2;break;case 4:a=u2;break;default:a=fi}t=a.bind(null,n,t,e),a=void 0,!xo||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(a=!0),r?a!==void 0?e.addEventListener(n,t,{capture:!0,passive:a}):e.addEventListener(n,t,!0):a!==void 0?e.addEventListener(n,t,{passive:a}):e.addEventListener(n,t,!1)}function qa(e,n,t,r,a){var o=r;if(!(n&1)&&!(n&2)&&r!==null)e:for(;;){if(r===null)return;var i=r.tag;if(i===3||i===4){var s=r.stateNode.containerInfo;if(s===a||s.nodeType===8&&s.parentNode===a)break;if(i===4)for(i=r.return;i!==null;){var l=i.tag;if((l===3||l===4)&&(l=i.stateNode.containerInfo,l===a||l.nodeType===8&&l.parentNode===a))return;i=i.return}for(;s!==null;){if(i=Fn(s),i===null)return;if(l=i.tag,l===5||l===6){r=o=i;continue e}s=s.parentNode}}r=r.return}Ul(function(){var c=o,p=ci(t),g=[];e:{var m=yc.get(e);if(m!==void 0){var b=hi,v=e;switch(e){case"keypress":if(Nr(t)===0)break e;case"keydown":case"keyup":b=F2;break;case"focusin":v="focus",b=La;break;case"focusout":v="blur",b=La;break;case"beforeblur":case"afterblur":b=La;break;case"click":if(t.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":b=ms;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":b=g2;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":b=j2;break;case hc:case mc:case bc:b=b2;break;case vc:b=P2;break;case"scroll":b=p2;break;case"wheel":b=N2;break;case"copy":case"cut":case"paste":b=y2;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":b=vs}var y=(n&4)!==0,j=!y&&e==="scroll",f=y?m!==null?m+"Capture":null:m;y=[];for(var u=c,h;u!==null;){h=u;var x=h.stateNode;if(h.tag===5&&x!==null&&(h=x,f!==null&&(x=Lt(u,f),x!=null&&y.push(qt(u,x,h)))),j)break;u=u.return}0<y.length&&(m=new b(m,v,null,t,p),g.push({event:m,listeners:y}))}}if(!(n&7)){e:{if(m=e==="mouseover"||e==="pointerover",b=e==="mouseout"||e==="pointerout",m&&t!==vo&&(v=t.relatedTarget||t.fromElement)&&(Fn(v)||v[Je]))break e;if((b||m)&&(m=p.window===p?p:(m=p.ownerDocument)?m.defaultView||m.parentWindow:window,b?(v=t.relatedTarget||t.toElement,b=c,v=v?Fn(v):null,v!==null&&(j=Dn(v),v!==j||v.tag!==5&&v.tag!==6)&&(v=null)):(b=null,v=c),b!==v)){if(y=ms,x="onMouseLeave",f="onMouseEnter",u="mouse",(e==="pointerout"||e==="pointerover")&&(y=vs,x="onPointerLeave",f="onPointerEnter",u="pointer"),j=b==null?m:Un(b),h=v==null?m:Un(v),m=new y(x,u+"leave",b,t,p),m.target=j,m.relatedTarget=h,x=null,Fn(p)===c&&(y=new y(f,u+"enter",v,t,p),y.target=h,y.relatedTarget=j,x=y),j=x,b&&v)n:{for(y=b,f=v,u=0,h=y;h;h=On(h))u++;for(h=0,x=f;x;x=On(x))h++;for(;0<u-h;)y=On(y),u--;for(;0<h-u;)f=On(f),h--;for(;u--;){if(y===f||f!==null&&y===f.alternate)break n;y=On(y),f=On(f)}y=null}else y=null;b!==null&&js(g,m,b,y,!1),v!==null&&j!==null&&js(g,j,v,y,!0)}}e:{if(m=c?Un(c):window,b=m.nodeName&&m.nodeName.toLowerCase(),b==="select"||b==="input"&&m.type==="file")var _=L2;else if(ks(m))if(dc)_=U2;else{_=W2;var w=R2}else(b=m.nodeName)&&b.toLowerCase()==="input"&&(m.type==="checkbox"||m.type==="radio")&&(_=G2);if(_&&(_=_(e,c))){cc(g,_,t,p);break e}w&&w(e,m,c),e==="focusout"&&(w=m._wrapperState)&&w.controlled&&m.type==="number"&&fo(m,"number",m.value)}switch(w=c?Un(c):window,e){case"focusin":(ks(w)||w.contentEditable==="true")&&(Wn=w,$o=c,Nt=null);break;case"focusout":Nt=$o=Wn=null;break;case"mousedown":Fo=!0;break;case"contextmenu":case"mouseup":case"dragend":Fo=!1,Fs(g,t,p);break;case"selectionchange":if(q2)break;case"keydown":case"keyup":Fs(g,t,p)}var C;if(bi)e:{switch(e){case"compositionstart":var $="onCompositionStart";break e;case"compositionend":$="onCompositionEnd";break e;case"compositionupdate":$="onCompositionUpdate";break e}$=void 0}else Rn?sc(e,t)&&($="onCompositionEnd"):e==="keydown"&&t.keyCode===229&&($="onCompositionStart");$&&(ic&&t.locale!=="ko"&&(Rn||$!=="onCompositionStart"?$==="onCompositionEnd"&&Rn&&(C=oc()):(sn=p,gi="value"in sn?sn.value:sn.textContent,Rn=!0)),w=Yr(c,$),0<w.length&&($=new bs($,e,null,t,p),g.push({event:$,listeners:w}),C?$.data=C:(C=lc(t),C!==null&&($.data=C)))),(C=A2?I2(e,t):D2(e,t))&&(c=Yr(c,"onBeforeInput"),0<c.length&&(p=new bs("onBeforeInput","beforeinput",null,t,p),g.push({event:p,listeners:c}),p.data=C))}xc(g,n)})}function qt(e,n,t){return{instance:e,listener:n,currentTarget:t}}function Yr(e,n){for(var t=n+"Capture",r=[];e!==null;){var a=e,o=a.stateNode;a.tag===5&&o!==null&&(a=o,o=Lt(e,t),o!=null&&r.unshift(qt(e,o,a)),o=Lt(e,n),o!=null&&r.push(qt(e,o,a))),e=e.return}return r}function On(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function js(e,n,t,r,a){for(var o=n._reactName,i=[];t!==null&&t!==r;){var s=t,l=s.alternate,c=s.stateNode;if(l!==null&&l===r)break;s.tag===5&&c!==null&&(s=c,a?(l=Lt(t,o),l!=null&&i.unshift(qt(t,l,s))):a||(l=Lt(t,o),l!=null&&i.push(qt(t,l,s)))),t=t.return}i.length!==0&&e.push({event:n,listeners:i})}var J2=/\r\n?/g,X2=/\u0000|\uFFFD/g;function Ts(e){return(typeof e=="string"?e:""+e).replace(J2,`
`).replace(X2,"")}function xr(e,n,t){if(n=Ts(n),Ts(e)!==n&&t)throw Error(k(425))}function Kr(){}var Eo=null,Co=null;function jo(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var To=typeof setTimeout=="function"?setTimeout:void 0,Z2=typeof clearTimeout=="function"?clearTimeout:void 0,Ps=typeof Promise=="function"?Promise:void 0,ew=typeof queueMicrotask=="function"?queueMicrotask:typeof Ps<"u"?function(e){return Ps.resolve(null).then(e).catch(nw)}:To;function nw(e){setTimeout(function(){throw e})}function Qa(e,n){var t=n,r=0;do{var a=t.nextSibling;if(e.removeChild(t),a&&a.nodeType===8)if(t=a.data,t==="/$"){if(r===0){e.removeChild(a),Gt(n);return}r--}else t!=="$"&&t!=="$?"&&t!=="$!"||r++;t=a}while(t);Gt(n)}function pn(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?")break;if(n==="/$")return null}}return e}function Ms(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="$"||t==="$!"||t==="$?"){if(n===0)return e;n--}else t==="/$"&&n++}e=e.previousSibling}return null}var gt=Math.random().toString(36).slice(2),Re="__reactFiber$"+gt,Qt="__reactProps$"+gt,Je="__reactContainer$"+gt,Po="__reactEvents$"+gt,tw="__reactListeners$"+gt,rw="__reactHandles$"+gt;function Fn(e){var n=e[Re];if(n)return n;for(var t=e.parentNode;t;){if(n=t[Je]||t[Re]){if(t=n.alternate,n.child!==null||t!==null&&t.child!==null)for(e=Ms(e);e!==null;){if(t=e[Re])return t;e=Ms(e)}return n}e=t,t=e.parentNode}return null}function or(e){return e=e[Re]||e[Je],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Un(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(k(33))}function va(e){return e[Qt]||null}var Mo=[],Hn=-1;function xn(e){return{current:e}}function L(e){0>Hn||(e.current=Mo[Hn],Mo[Hn]=null,Hn--)}function O(e,n){Hn++,Mo[Hn]=e.current,e.current=n}var vn={},se=xn(vn),he=xn(!1),Pn=vn;function at(e,n){var t=e.type.contextTypes;if(!t)return vn;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===n)return r.__reactInternalMemoizedMaskedChildContext;var a={},o;for(o in t)a[o]=n[o];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=n,e.__reactInternalMemoizedMaskedChildContext=a),a}function me(e){return e=e.childContextTypes,e!=null}function Jr(){L(he),L(se)}function Ns(e,n,t){if(se.current!==vn)throw Error(k(168));O(se,n),O(he,t)}function wc(e,n,t){var r=e.stateNode;if(n=n.childContextTypes,typeof r.getChildContext!="function")return t;r=r.getChildContext();for(var a in r)if(!(a in n))throw Error(k(108,Rk(e)||"Unknown",a));return U({},t,r)}function Xr(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||vn,Pn=se.current,O(se,e),O(he,he.current),!0}function zs(e,n,t){var r=e.stateNode;if(!r)throw Error(k(169));t?(e=wc(e,n,Pn),r.__reactInternalMemoizedMergedChildContext=e,L(he),L(se),O(se,e)):L(he),O(he,t)}var Ve=null,ya=!1,Ya=!1;function _c(e){Ve===null?Ve=[e]:Ve.push(e)}function aw(e){ya=!0,_c(e)}function kn(){if(!Ya&&Ve!==null){Ya=!0;var e=0,n=I;try{var t=Ve;for(I=1;e<t.length;e++){var r=t[e];do r=r(!0);while(r!==null)}Ve=null,ya=!1}catch(a){throw Ve!==null&&(Ve=Ve.slice(e+1)),Ql(di,kn),a}finally{I=n,Ya=!1}}return null}var Vn=[],qn=0,Zr=null,ea=0,Fe=[],Ee=0,Mn=null,qe=1,Qe="";function Sn(e,n){Vn[qn++]=ea,Vn[qn++]=Zr,Zr=e,ea=n}function Sc(e,n,t){Fe[Ee++]=qe,Fe[Ee++]=Qe,Fe[Ee++]=Mn,Mn=e;var r=qe;e=Qe;var a=32-Ie(r)-1;r&=~(1<<a),t+=1;var o=32-Ie(n)+a;if(30<o){var i=a-a%5;o=(r&(1<<i)-1).toString(32),r>>=i,a-=i,qe=1<<32-Ie(n)+a|t<<a|r,Qe=o+e}else qe=1<<o|t<<a|r,Qe=e}function yi(e){e.return!==null&&(Sn(e,1),Sc(e,1,0))}function xi(e){for(;e===Zr;)Zr=Vn[--qn],Vn[qn]=null,ea=Vn[--qn],Vn[qn]=null;for(;e===Mn;)Mn=Fe[--Ee],Fe[Ee]=null,Qe=Fe[--Ee],Fe[Ee]=null,qe=Fe[--Ee],Fe[Ee]=null}var ke=null,xe=null,R=!1,Ae=null;function $c(e,n){var t=Ce(5,null,null,0);t.elementType="DELETED",t.stateNode=n,t.return=e,n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)}function As(e,n){switch(e.tag){case 5:var t=e.type;return n=n.nodeType!==1||t.toLowerCase()!==n.nodeName.toLowerCase()?null:n,n!==null?(e.stateNode=n,ke=e,xe=pn(n.firstChild),!0):!1;case 6:return n=e.pendingProps===""||n.nodeType!==3?null:n,n!==null?(e.stateNode=n,ke=e,xe=null,!0):!1;case 13:return n=n.nodeType!==8?null:n,n!==null?(t=Mn!==null?{id:qe,overflow:Qe}:null,e.memoizedState={dehydrated:n,treeContext:t,retryLane:1073741824},t=Ce(18,null,null,0),t.stateNode=n,t.return=e,e.child=t,ke=e,xe=null,!0):!1;default:return!1}}function No(e){return(e.mode&1)!==0&&(e.flags&128)===0}function zo(e){if(R){var n=xe;if(n){var t=n;if(!As(e,n)){if(No(e))throw Error(k(418));n=pn(t.nextSibling);var r=ke;n&&As(e,n)?$c(r,t):(e.flags=e.flags&-4097|2,R=!1,ke=e)}}else{if(No(e))throw Error(k(418));e.flags=e.flags&-4097|2,R=!1,ke=e}}}function Is(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;ke=e}function kr(e){if(e!==ke)return!1;if(!R)return Is(e),R=!0,!1;var n;if((n=e.tag!==3)&&!(n=e.tag!==5)&&(n=e.type,n=n!=="head"&&n!=="body"&&!jo(e.type,e.memoizedProps)),n&&(n=xe)){if(No(e))throw Fc(),Error(k(418));for(;n;)$c(e,n),n=pn(n.nextSibling)}if(Is(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(k(317));e:{for(e=e.nextSibling,n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="/$"){if(n===0){xe=pn(e.nextSibling);break e}n--}else t!=="$"&&t!=="$!"&&t!=="$?"||n++}e=e.nextSibling}xe=null}}else xe=ke?pn(e.stateNode.nextSibling):null;return!0}function Fc(){for(var e=xe;e;)e=pn(e.nextSibling)}function ot(){xe=ke=null,R=!1}function ki(e){Ae===null?Ae=[e]:Ae.push(e)}var ow=en.ReactCurrentBatchConfig;function wt(e,n,t){if(e=t.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(t._owner){if(t=t._owner,t){if(t.tag!==1)throw Error(k(309));var r=t.stateNode}if(!r)throw Error(k(147,e));var a=r,o=""+e;return n!==null&&n.ref!==null&&typeof n.ref=="function"&&n.ref._stringRef===o?n.ref:(n=function(i){var s=a.refs;i===null?delete s[o]:s[o]=i},n._stringRef=o,n)}if(typeof e!="string")throw Error(k(284));if(!t._owner)throw Error(k(290,e))}return e}function wr(e,n){throw e=Object.prototype.toString.call(n),Error(k(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e))}function Ds(e){var n=e._init;return n(e._payload)}function Ec(e){function n(f,u){if(e){var h=f.deletions;h===null?(f.deletions=[u],f.flags|=16):h.push(u)}}function t(f,u){if(!e)return null;for(;u!==null;)n(f,u),u=u.sibling;return null}function r(f,u){for(f=new Map;u!==null;)u.key!==null?f.set(u.key,u):f.set(u.index,u),u=u.sibling;return f}function a(f,u){return f=mn(f,u),f.index=0,f.sibling=null,f}function o(f,u,h){return f.index=h,e?(h=f.alternate,h!==null?(h=h.index,h<u?(f.flags|=2,u):h):(f.flags|=2,u)):(f.flags|=1048576,u)}function i(f){return e&&f.alternate===null&&(f.flags|=2),f}function s(f,u,h,x){return u===null||u.tag!==6?(u=to(h,f.mode,x),u.return=f,u):(u=a(u,h),u.return=f,u)}function l(f,u,h,x){var _=h.type;return _===Ln?p(f,u,h.props.children,x,h.key):u!==null&&(u.elementType===_||typeof _=="object"&&_!==null&&_.$$typeof===tn&&Ds(_)===u.type)?(x=a(u,h.props),x.ref=wt(f,u,h),x.return=f,x):(x=Lr(h.type,h.key,h.props,null,f.mode,x),x.ref=wt(f,u,h),x.return=f,x)}function c(f,u,h,x){return u===null||u.tag!==4||u.stateNode.containerInfo!==h.containerInfo||u.stateNode.implementation!==h.implementation?(u=ro(h,f.mode,x),u.return=f,u):(u=a(u,h.children||[]),u.return=f,u)}function p(f,u,h,x,_){return u===null||u.tag!==7?(u=Tn(h,f.mode,x,_),u.return=f,u):(u=a(u,h),u.return=f,u)}function g(f,u,h){if(typeof u=="string"&&u!==""||typeof u=="number")return u=to(""+u,f.mode,h),u.return=f,u;if(typeof u=="object"&&u!==null){switch(u.$$typeof){case ur:return h=Lr(u.type,u.key,u.props,null,f.mode,h),h.ref=wt(f,null,u),h.return=f,h;case Bn:return u=ro(u,f.mode,h),u.return=f,u;case tn:var x=u._init;return g(f,x(u._payload),h)}if(Ft(u)||bt(u))return u=Tn(u,f.mode,h,null),u.return=f,u;wr(f,u)}return null}function m(f,u,h,x){var _=u!==null?u.key:null;if(typeof h=="string"&&h!==""||typeof h=="number")return _!==null?null:s(f,u,""+h,x);if(typeof h=="object"&&h!==null){switch(h.$$typeof){case ur:return h.key===_?l(f,u,h,x):null;case Bn:return h.key===_?c(f,u,h,x):null;case tn:return _=h._init,m(f,u,_(h._payload),x)}if(Ft(h)||bt(h))return _!==null?null:p(f,u,h,x,null);wr(f,h)}return null}function b(f,u,h,x,_){if(typeof x=="string"&&x!==""||typeof x=="number")return f=f.get(h)||null,s(u,f,""+x,_);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case ur:return f=f.get(x.key===null?h:x.key)||null,l(u,f,x,_);case Bn:return f=f.get(x.key===null?h:x.key)||null,c(u,f,x,_);case tn:var w=x._init;return b(f,u,h,w(x._payload),_)}if(Ft(x)||bt(x))return f=f.get(h)||null,p(u,f,x,_,null);wr(u,x)}return null}function v(f,u,h,x){for(var _=null,w=null,C=u,$=u=0,S=null;C!==null&&$<h.length;$++){C.index>$?(S=C,C=null):S=C.sibling;var T=m(f,C,h[$],x);if(T===null){C===null&&(C=S);break}e&&C&&T.alternate===null&&n(f,C),u=o(T,u,$),w===null?_=T:w.sibling=T,w=T,C=S}if($===h.length)return t(f,C),R&&Sn(f,$),_;if(C===null){for(;$<h.length;$++)C=g(f,h[$],x),C!==null&&(u=o(C,u,$),w===null?_=C:w.sibling=C,w=C);return R&&Sn(f,$),_}for(C=r(f,C);$<h.length;$++)S=b(C,f,$,h[$],x),S!==null&&(e&&S.alternate!==null&&C.delete(S.key===null?$:S.key),u=o(S,u,$),w===null?_=S:w.sibling=S,w=S);return e&&C.forEach(function(Y){return n(f,Y)}),R&&Sn(f,$),_}function y(f,u,h,x){var _=bt(h);if(typeof _!="function")throw Error(k(150));if(h=_.call(h),h==null)throw Error(k(151));for(var w=_=null,C=u,$=u=0,S=null,T=h.next();C!==null&&!T.done;$++,T=h.next()){C.index>$?(S=C,C=null):S=C.sibling;var Y=m(f,C,T.value,x);if(Y===null){C===null&&(C=S);break}e&&C&&Y.alternate===null&&n(f,C),u=o(Y,u,$),w===null?_=Y:w.sibling=Y,w=Y,C=S}if(T.done)return t(f,C),R&&Sn(f,$),_;if(C===null){for(;!T.done;$++,T=h.next())T=g(f,T.value,x),T!==null&&(u=o(T,u,$),w===null?_=T:w.sibling=T,w=T);return R&&Sn(f,$),_}for(C=r(f,C);!T.done;$++,T=h.next())T=b(C,f,$,T.value,x),T!==null&&(e&&T.alternate!==null&&C.delete(T.key===null?$:T.key),u=o(T,u,$),w===null?_=T:w.sibling=T,w=T);return e&&C.forEach(function(Ue){return n(f,Ue)}),R&&Sn(f,$),_}function j(f,u,h,x){if(typeof h=="object"&&h!==null&&h.type===Ln&&h.key===null&&(h=h.props.children),typeof h=="object"&&h!==null){switch(h.$$typeof){case ur:e:{for(var _=h.key,w=u;w!==null;){if(w.key===_){if(_=h.type,_===Ln){if(w.tag===7){t(f,w.sibling),u=a(w,h.props.children),u.return=f,f=u;break e}}else if(w.elementType===_||typeof _=="object"&&_!==null&&_.$$typeof===tn&&Ds(_)===w.type){t(f,w.sibling),u=a(w,h.props),u.ref=wt(f,w,h),u.return=f,f=u;break e}t(f,w);break}else n(f,w);w=w.sibling}h.type===Ln?(u=Tn(h.props.children,f.mode,x,h.key),u.return=f,f=u):(x=Lr(h.type,h.key,h.props,null,f.mode,x),x.ref=wt(f,u,h),x.return=f,f=x)}return i(f);case Bn:e:{for(w=h.key;u!==null;){if(u.key===w)if(u.tag===4&&u.stateNode.containerInfo===h.containerInfo&&u.stateNode.implementation===h.implementation){t(f,u.sibling),u=a(u,h.children||[]),u.return=f,f=u;break e}else{t(f,u);break}else n(f,u);u=u.sibling}u=ro(h,f.mode,x),u.return=f,f=u}return i(f);case tn:return w=h._init,j(f,u,w(h._payload),x)}if(Ft(h))return v(f,u,h,x);if(bt(h))return y(f,u,h,x);wr(f,h)}return typeof h=="string"&&h!==""||typeof h=="number"?(h=""+h,u!==null&&u.tag===6?(t(f,u.sibling),u=a(u,h),u.return=f,f=u):(t(f,u),u=to(h,f.mode,x),u.return=f,f=u),i(f)):t(f,u)}return j}var it=Ec(!0),Cc=Ec(!1),na=xn(null),ta=null,Qn=null,wi=null;function _i(){wi=Qn=ta=null}function Si(e){var n=na.current;L(na),e._currentValue=n}function Ao(e,n,t){for(;e!==null;){var r=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,r!==null&&(r.childLanes|=n)):r!==null&&(r.childLanes&n)!==n&&(r.childLanes|=n),e===t)break;e=e.return}}function nt(e,n){ta=e,wi=Qn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&n&&(ge=!0),e.firstContext=null)}function Te(e){var n=e._currentValue;if(wi!==e)if(e={context:e,memoizedValue:n,next:null},Qn===null){if(ta===null)throw Error(k(308));Qn=e,ta.dependencies={lanes:0,firstContext:e}}else Qn=Qn.next=e;return n}var En=null;function $i(e){En===null?En=[e]:En.push(e)}function jc(e,n,t,r){var a=n.interleaved;return a===null?(t.next=t,$i(n)):(t.next=a.next,a.next=t),n.interleaved=t,Xe(e,r)}function Xe(e,n){e.lanes|=n;var t=e.alternate;for(t!==null&&(t.lanes|=n),t=e,e=e.return;e!==null;)e.childLanes|=n,t=e.alternate,t!==null&&(t.childLanes|=n),t=e,e=e.return;return t.tag===3?t.stateNode:null}var rn=!1;function Fi(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Tc(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Ye(e,n){return{eventTime:e,lane:n,tag:0,payload:null,callback:null,next:null}}function fn(e,n,t){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,A&2){var a=r.pending;return a===null?n.next=n:(n.next=a.next,a.next=n),r.pending=n,Xe(e,t)}return a=r.interleaved,a===null?(n.next=n,$i(r)):(n.next=a.next,a.next=n),r.interleaved=n,Xe(e,t)}function zr(e,n,t){if(n=n.updateQueue,n!==null&&(n=n.shared,(t&4194240)!==0)){var r=n.lanes;r&=e.pendingLanes,t|=r,n.lanes=t,ui(e,t)}}function Os(e,n){var t=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,t===r)){var a=null,o=null;if(t=t.firstBaseUpdate,t!==null){do{var i={eventTime:t.eventTime,lane:t.lane,tag:t.tag,payload:t.payload,callback:t.callback,next:null};o===null?a=o=i:o=o.next=i,t=t.next}while(t!==null);o===null?a=o=n:o=o.next=n}else a=o=n;t={baseState:r.baseState,firstBaseUpdate:a,lastBaseUpdate:o,shared:r.shared,effects:r.effects},e.updateQueue=t;return}e=t.lastBaseUpdate,e===null?t.firstBaseUpdate=n:e.next=n,t.lastBaseUpdate=n}function ra(e,n,t,r){var a=e.updateQueue;rn=!1;var o=a.firstBaseUpdate,i=a.lastBaseUpdate,s=a.shared.pending;if(s!==null){a.shared.pending=null;var l=s,c=l.next;l.next=null,i===null?o=c:i.next=c,i=l;var p=e.alternate;p!==null&&(p=p.updateQueue,s=p.lastBaseUpdate,s!==i&&(s===null?p.firstBaseUpdate=c:s.next=c,p.lastBaseUpdate=l))}if(o!==null){var g=a.baseState;i=0,p=c=l=null,s=o;do{var m=s.lane,b=s.eventTime;if((r&m)===m){p!==null&&(p=p.next={eventTime:b,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});e:{var v=e,y=s;switch(m=n,b=t,y.tag){case 1:if(v=y.payload,typeof v=="function"){g=v.call(b,g,m);break e}g=v;break e;case 3:v.flags=v.flags&-65537|128;case 0:if(v=y.payload,m=typeof v=="function"?v.call(b,g,m):v,m==null)break e;g=U({},g,m);break e;case 2:rn=!0}}s.callback!==null&&s.lane!==0&&(e.flags|=64,m=a.effects,m===null?a.effects=[s]:m.push(s))}else b={eventTime:b,lane:m,tag:s.tag,payload:s.payload,callback:s.callback,next:null},p===null?(c=p=b,l=g):p=p.next=b,i|=m;if(s=s.next,s===null){if(s=a.shared.pending,s===null)break;m=s,s=m.next,m.next=null,a.lastBaseUpdate=m,a.shared.pending=null}}while(!0);if(p===null&&(l=g),a.baseState=l,a.firstBaseUpdate=c,a.lastBaseUpdate=p,n=a.shared.interleaved,n!==null){a=n;do i|=a.lane,a=a.next;while(a!==n)}else o===null&&(a.shared.lanes=0);zn|=i,e.lanes=i,e.memoizedState=g}}function Bs(e,n,t){if(e=n.effects,n.effects=null,e!==null)for(n=0;n<e.length;n++){var r=e[n],a=r.callback;if(a!==null){if(r.callback=null,r=t,typeof a!="function")throw Error(k(191,a));a.call(r)}}}var ir={},Ge=xn(ir),Yt=xn(ir),Kt=xn(ir);function Cn(e){if(e===ir)throw Error(k(174));return e}function Ei(e,n){switch(O(Kt,n),O(Yt,e),O(Ge,ir),e=n.nodeType,e){case 9:case 11:n=(n=n.documentElement)?n.namespaceURI:ho(null,"");break;default:e=e===8?n.parentNode:n,n=e.namespaceURI||null,e=e.tagName,n=ho(n,e)}L(Ge),O(Ge,n)}function st(){L(Ge),L(Yt),L(Kt)}function Pc(e){Cn(Kt.current);var n=Cn(Ge.current),t=ho(n,e.type);n!==t&&(O(Yt,e),O(Ge,t))}function Ci(e){Yt.current===e&&(L(Ge),L(Yt))}var W=xn(0);function aa(e){for(var n=e;n!==null;){if(n.tag===13){var t=n.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||t.data==="$?"||t.data==="$!"))return n}else if(n.tag===19&&n.memoizedProps.revealOrder!==void 0){if(n.flags&128)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var Ka=[];function ji(){for(var e=0;e<Ka.length;e++)Ka[e]._workInProgressVersionPrimary=null;Ka.length=0}var Ar=en.ReactCurrentDispatcher,Ja=en.ReactCurrentBatchConfig,Nn=0,G=null,K=null,Z=null,oa=!1,zt=!1,Jt=0,iw=0;function ae(){throw Error(k(321))}function Ti(e,n){if(n===null)return!1;for(var t=0;t<n.length&&t<e.length;t++)if(!Oe(e[t],n[t]))return!1;return!0}function Pi(e,n,t,r,a,o){if(Nn=o,G=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,Ar.current=e===null||e.memoizedState===null?dw:uw,e=t(r,a),zt){o=0;do{if(zt=!1,Jt=0,25<=o)throw Error(k(301));o+=1,Z=K=null,n.updateQueue=null,Ar.current=pw,e=t(r,a)}while(zt)}if(Ar.current=ia,n=K!==null&&K.next!==null,Nn=0,Z=K=G=null,oa=!1,n)throw Error(k(300));return e}function Mi(){var e=Jt!==0;return Jt=0,e}function Le(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Z===null?G.memoizedState=Z=e:Z=Z.next=e,Z}function Pe(){if(K===null){var e=G.alternate;e=e!==null?e.memoizedState:null}else e=K.next;var n=Z===null?G.memoizedState:Z.next;if(n!==null)Z=n,K=e;else{if(e===null)throw Error(k(310));K=e,e={memoizedState:K.memoizedState,baseState:K.baseState,baseQueue:K.baseQueue,queue:K.queue,next:null},Z===null?G.memoizedState=Z=e:Z=Z.next=e}return Z}function Xt(e,n){return typeof n=="function"?n(e):n}function Xa(e){var n=Pe(),t=n.queue;if(t===null)throw Error(k(311));t.lastRenderedReducer=e;var r=K,a=r.baseQueue,o=t.pending;if(o!==null){if(a!==null){var i=a.next;a.next=o.next,o.next=i}r.baseQueue=a=o,t.pending=null}if(a!==null){o=a.next,r=r.baseState;var s=i=null,l=null,c=o;do{var p=c.lane;if((Nn&p)===p)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:e(r,c.action);else{var g={lane:p,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(s=l=g,i=r):l=l.next=g,G.lanes|=p,zn|=p}c=c.next}while(c!==null&&c!==o);l===null?i=r:l.next=s,Oe(r,n.memoizedState)||(ge=!0),n.memoizedState=r,n.baseState=i,n.baseQueue=l,t.lastRenderedState=r}if(e=t.interleaved,e!==null){a=e;do o=a.lane,G.lanes|=o,zn|=o,a=a.next;while(a!==e)}else a===null&&(t.lanes=0);return[n.memoizedState,t.dispatch]}function Za(e){var n=Pe(),t=n.queue;if(t===null)throw Error(k(311));t.lastRenderedReducer=e;var r=t.dispatch,a=t.pending,o=n.memoizedState;if(a!==null){t.pending=null;var i=a=a.next;do o=e(o,i.action),i=i.next;while(i!==a);Oe(o,n.memoizedState)||(ge=!0),n.memoizedState=o,n.baseQueue===null&&(n.baseState=o),t.lastRenderedState=o}return[o,r]}function Mc(){}function Nc(e,n){var t=G,r=Pe(),a=n(),o=!Oe(r.memoizedState,a);if(o&&(r.memoizedState=a,ge=!0),r=r.queue,Ni(Ic.bind(null,t,r,e),[e]),r.getSnapshot!==n||o||Z!==null&&Z.memoizedState.tag&1){if(t.flags|=2048,Zt(9,Ac.bind(null,t,r,a,n),void 0,null),ee===null)throw Error(k(349));Nn&30||zc(t,n,a)}return a}function zc(e,n,t){e.flags|=16384,e={getSnapshot:n,value:t},n=G.updateQueue,n===null?(n={lastEffect:null,stores:null},G.updateQueue=n,n.stores=[e]):(t=n.stores,t===null?n.stores=[e]:t.push(e))}function Ac(e,n,t,r){n.value=t,n.getSnapshot=r,Dc(n)&&Oc(e)}function Ic(e,n,t){return t(function(){Dc(n)&&Oc(e)})}function Dc(e){var n=e.getSnapshot;e=e.value;try{var t=n();return!Oe(e,t)}catch{return!0}}function Oc(e){var n=Xe(e,1);n!==null&&De(n,e,1,-1)}function Ls(e){var n=Le();return typeof e=="function"&&(e=e()),n.memoizedState=n.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Xt,lastRenderedState:e},n.queue=e,e=e.dispatch=cw.bind(null,G,e),[n.memoizedState,e]}function Zt(e,n,t,r){return e={tag:e,create:n,destroy:t,deps:r,next:null},n=G.updateQueue,n===null?(n={lastEffect:null,stores:null},G.updateQueue=n,n.lastEffect=e.next=e):(t=n.lastEffect,t===null?n.lastEffect=e.next=e:(r=t.next,t.next=e,e.next=r,n.lastEffect=e)),e}function Bc(){return Pe().memoizedState}function Ir(e,n,t,r){var a=Le();G.flags|=e,a.memoizedState=Zt(1|n,t,void 0,r===void 0?null:r)}function xa(e,n,t,r){var a=Pe();r=r===void 0?null:r;var o=void 0;if(K!==null){var i=K.memoizedState;if(o=i.destroy,r!==null&&Ti(r,i.deps)){a.memoizedState=Zt(n,t,o,r);return}}G.flags|=e,a.memoizedState=Zt(1|n,t,o,r)}function Rs(e,n){return Ir(8390656,8,e,n)}function Ni(e,n){return xa(2048,8,e,n)}function Lc(e,n){return xa(4,2,e,n)}function Rc(e,n){return xa(4,4,e,n)}function Wc(e,n){if(typeof n=="function")return e=e(),n(e),function(){n(null)};if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function Gc(e,n,t){return t=t!=null?t.concat([e]):null,xa(4,4,Wc.bind(null,n,e),t)}function zi(){}function Uc(e,n){var t=Pe();n=n===void 0?null:n;var r=t.memoizedState;return r!==null&&n!==null&&Ti(n,r[1])?r[0]:(t.memoizedState=[e,n],e)}function Hc(e,n){var t=Pe();n=n===void 0?null:n;var r=t.memoizedState;return r!==null&&n!==null&&Ti(n,r[1])?r[0]:(e=e(),t.memoizedState=[e,n],e)}function Vc(e,n,t){return Nn&21?(Oe(t,n)||(t=Jl(),G.lanes|=t,zn|=t,e.baseState=!0),n):(e.baseState&&(e.baseState=!1,ge=!0),e.memoizedState=t)}function sw(e,n){var t=I;I=t!==0&&4>t?t:4,e(!0);var r=Ja.transition;Ja.transition={};try{e(!1),n()}finally{I=t,Ja.transition=r}}function qc(){return Pe().memoizedState}function lw(e,n,t){var r=hn(e);if(t={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null},Qc(e))Yc(n,t);else if(t=jc(e,n,t,r),t!==null){var a=ce();De(t,e,r,a),Kc(t,n,r)}}function cw(e,n,t){var r=hn(e),a={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null};if(Qc(e))Yc(n,a);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=n.lastRenderedReducer,o!==null))try{var i=n.lastRenderedState,s=o(i,t);if(a.hasEagerState=!0,a.eagerState=s,Oe(s,i)){var l=n.interleaved;l===null?(a.next=a,$i(n)):(a.next=l.next,l.next=a),n.interleaved=a;return}}catch{}finally{}t=jc(e,n,a,r),t!==null&&(a=ce(),De(t,e,r,a),Kc(t,n,r))}}function Qc(e){var n=e.alternate;return e===G||n!==null&&n===G}function Yc(e,n){zt=oa=!0;var t=e.pending;t===null?n.next=n:(n.next=t.next,t.next=n),e.pending=n}function Kc(e,n,t){if(t&4194240){var r=n.lanes;r&=e.pendingLanes,t|=r,n.lanes=t,ui(e,t)}}var ia={readContext:Te,useCallback:ae,useContext:ae,useEffect:ae,useImperativeHandle:ae,useInsertionEffect:ae,useLayoutEffect:ae,useMemo:ae,useReducer:ae,useRef:ae,useState:ae,useDebugValue:ae,useDeferredValue:ae,useTransition:ae,useMutableSource:ae,useSyncExternalStore:ae,useId:ae,unstable_isNewReconciler:!1},dw={readContext:Te,useCallback:function(e,n){return Le().memoizedState=[e,n===void 0?null:n],e},useContext:Te,useEffect:Rs,useImperativeHandle:function(e,n,t){return t=t!=null?t.concat([e]):null,Ir(4194308,4,Wc.bind(null,n,e),t)},useLayoutEffect:function(e,n){return Ir(4194308,4,e,n)},useInsertionEffect:function(e,n){return Ir(4,2,e,n)},useMemo:function(e,n){var t=Le();return n=n===void 0?null:n,e=e(),t.memoizedState=[e,n],e},useReducer:function(e,n,t){var r=Le();return n=t!==void 0?t(n):n,r.memoizedState=r.baseState=n,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:n},r.queue=e,e=e.dispatch=lw.bind(null,G,e),[r.memoizedState,e]},useRef:function(e){var n=Le();return e={current:e},n.memoizedState=e},useState:Ls,useDebugValue:zi,useDeferredValue:function(e){return Le().memoizedState=e},useTransition:function(){var e=Ls(!1),n=e[0];return e=sw.bind(null,e[1]),Le().memoizedState=e,[n,e]},useMutableSource:function(){},useSyncExternalStore:function(e,n,t){var r=G,a=Le();if(R){if(t===void 0)throw Error(k(407));t=t()}else{if(t=n(),ee===null)throw Error(k(349));Nn&30||zc(r,n,t)}a.memoizedState=t;var o={value:t,getSnapshot:n};return a.queue=o,Rs(Ic.bind(null,r,o,e),[e]),r.flags|=2048,Zt(9,Ac.bind(null,r,o,t,n),void 0,null),t},useId:function(){var e=Le(),n=ee.identifierPrefix;if(R){var t=Qe,r=qe;t=(r&~(1<<32-Ie(r)-1)).toString(32)+t,n=":"+n+"R"+t,t=Jt++,0<t&&(n+="H"+t.toString(32)),n+=":"}else t=iw++,n=":"+n+"r"+t.toString(32)+":";return e.memoizedState=n},unstable_isNewReconciler:!1},uw={readContext:Te,useCallback:Uc,useContext:Te,useEffect:Ni,useImperativeHandle:Gc,useInsertionEffect:Lc,useLayoutEffect:Rc,useMemo:Hc,useReducer:Xa,useRef:Bc,useState:function(){return Xa(Xt)},useDebugValue:zi,useDeferredValue:function(e){var n=Pe();return Vc(n,K.memoizedState,e)},useTransition:function(){var e=Xa(Xt)[0],n=Pe().memoizedState;return[e,n]},useMutableSource:Mc,useSyncExternalStore:Nc,useId:qc,unstable_isNewReconciler:!1},pw={readContext:Te,useCallback:Uc,useContext:Te,useEffect:Ni,useImperativeHandle:Gc,useInsertionEffect:Lc,useLayoutEffect:Rc,useMemo:Hc,useReducer:Za,useRef:Bc,useState:function(){return Za(Xt)},useDebugValue:zi,useDeferredValue:function(e){var n=Pe();return K===null?n.memoizedState=e:Vc(n,K.memoizedState,e)},useTransition:function(){var e=Za(Xt)[0],n=Pe().memoizedState;return[e,n]},useMutableSource:Mc,useSyncExternalStore:Nc,useId:qc,unstable_isNewReconciler:!1};function Ne(e,n){if(e&&e.defaultProps){n=U({},n),e=e.defaultProps;for(var t in e)n[t]===void 0&&(n[t]=e[t]);return n}return n}function Io(e,n,t,r){n=e.memoizedState,t=t(r,n),t=t==null?n:U({},n,t),e.memoizedState=t,e.lanes===0&&(e.updateQueue.baseState=t)}var ka={isMounted:function(e){return(e=e._reactInternals)?Dn(e)===e:!1},enqueueSetState:function(e,n,t){e=e._reactInternals;var r=ce(),a=hn(e),o=Ye(r,a);o.payload=n,t!=null&&(o.callback=t),n=fn(e,o,a),n!==null&&(De(n,e,a,r),zr(n,e,a))},enqueueReplaceState:function(e,n,t){e=e._reactInternals;var r=ce(),a=hn(e),o=Ye(r,a);o.tag=1,o.payload=n,t!=null&&(o.callback=t),n=fn(e,o,a),n!==null&&(De(n,e,a,r),zr(n,e,a))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var t=ce(),r=hn(e),a=Ye(t,r);a.tag=2,n!=null&&(a.callback=n),n=fn(e,a,r),n!==null&&(De(n,e,r,t),zr(n,e,r))}};function Ws(e,n,t,r,a,o,i){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,o,i):n.prototype&&n.prototype.isPureReactComponent?!Ht(t,r)||!Ht(a,o):!0}function Jc(e,n,t){var r=!1,a=vn,o=n.contextType;return typeof o=="object"&&o!==null?o=Te(o):(a=me(n)?Pn:se.current,r=n.contextTypes,o=(r=r!=null)?at(e,a):vn),n=new n(t,o),e.memoizedState=n.state!==null&&n.state!==void 0?n.state:null,n.updater=ka,e.stateNode=n,n._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=a,e.__reactInternalMemoizedMaskedChildContext=o),n}function Gs(e,n,t,r){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(t,r),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(t,r),n.state!==e&&ka.enqueueReplaceState(n,n.state,null)}function Do(e,n,t,r){var a=e.stateNode;a.props=t,a.state=e.memoizedState,a.refs={},Fi(e);var o=n.contextType;typeof o=="object"&&o!==null?a.context=Te(o):(o=me(n)?Pn:se.current,a.context=at(e,o)),a.state=e.memoizedState,o=n.getDerivedStateFromProps,typeof o=="function"&&(Io(e,n,o,t),a.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof a.getSnapshotBeforeUpdate=="function"||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(n=a.state,typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount(),n!==a.state&&ka.enqueueReplaceState(a,a.state,null),ra(e,t,a,r),a.state=e.memoizedState),typeof a.componentDidMount=="function"&&(e.flags|=4194308)}function lt(e,n){try{var t="",r=n;do t+=Lk(r),r=r.return;while(r);var a=t}catch(o){a=`
Error generating stack: `+o.message+`
`+o.stack}return{value:e,source:n,stack:a,digest:null}}function eo(e,n,t){return{value:e,source:null,stack:t??null,digest:n??null}}function Oo(e,n){try{console.error(n.value)}catch(t){setTimeout(function(){throw t})}}var fw=typeof WeakMap=="function"?WeakMap:Map;function Xc(e,n,t){t=Ye(-1,t),t.tag=3,t.payload={element:null};var r=n.value;return t.callback=function(){la||(la=!0,Qo=r),Oo(e,n)},t}function Zc(e,n,t){t=Ye(-1,t),t.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var a=n.value;t.payload=function(){return r(a)},t.callback=function(){Oo(e,n)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(t.callback=function(){Oo(e,n),typeof r!="function"&&(gn===null?gn=new Set([this]):gn.add(this));var i=n.stack;this.componentDidCatch(n.value,{componentStack:i!==null?i:""})}),t}function Us(e,n,t){var r=e.pingCache;if(r===null){r=e.pingCache=new fw;var a=new Set;r.set(n,a)}else a=r.get(n),a===void 0&&(a=new Set,r.set(n,a));a.has(t)||(a.add(t),e=Ew.bind(null,e,n,t),n.then(e,e))}function Hs(e){do{var n;if((n=e.tag===13)&&(n=e.memoizedState,n=n!==null?n.dehydrated!==null:!0),n)return e;e=e.return}while(e!==null);return null}function Vs(e,n,t,r,a){return e.mode&1?(e.flags|=65536,e.lanes=a,e):(e===n?e.flags|=65536:(e.flags|=128,t.flags|=131072,t.flags&=-52805,t.tag===1&&(t.alternate===null?t.tag=17:(n=Ye(-1,1),n.tag=2,fn(t,n,1))),t.lanes|=1),e)}var gw=en.ReactCurrentOwner,ge=!1;function le(e,n,t,r){n.child=e===null?Cc(n,null,t,r):it(n,e.child,t,r)}function qs(e,n,t,r,a){t=t.render;var o=n.ref;return nt(n,a),r=Pi(e,n,t,r,o,a),t=Mi(),e!==null&&!ge?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~a,Ze(e,n,a)):(R&&t&&yi(n),n.flags|=1,le(e,n,r,a),n.child)}function Qs(e,n,t,r,a){if(e===null){var o=t.type;return typeof o=="function"&&!Wi(o)&&o.defaultProps===void 0&&t.compare===null&&t.defaultProps===void 0?(n.tag=15,n.type=o,ed(e,n,o,r,a)):(e=Lr(t.type,null,r,n,n.mode,a),e.ref=n.ref,e.return=n,n.child=e)}if(o=e.child,!(e.lanes&a)){var i=o.memoizedProps;if(t=t.compare,t=t!==null?t:Ht,t(i,r)&&e.ref===n.ref)return Ze(e,n,a)}return n.flags|=1,e=mn(o,r),e.ref=n.ref,e.return=n,n.child=e}function ed(e,n,t,r,a){if(e!==null){var o=e.memoizedProps;if(Ht(o,r)&&e.ref===n.ref)if(ge=!1,n.pendingProps=r=o,(e.lanes&a)!==0)e.flags&131072&&(ge=!0);else return n.lanes=e.lanes,Ze(e,n,a)}return Bo(e,n,t,r,a)}function nd(e,n,t){var r=n.pendingProps,a=r.children,o=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(n.mode&1))n.memoizedState={baseLanes:0,cachePool:null,transitions:null},O(Kn,ye),ye|=t;else{if(!(t&1073741824))return e=o!==null?o.baseLanes|t:t,n.lanes=n.childLanes=1073741824,n.memoizedState={baseLanes:e,cachePool:null,transitions:null},n.updateQueue=null,O(Kn,ye),ye|=e,null;n.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=o!==null?o.baseLanes:t,O(Kn,ye),ye|=r}else o!==null?(r=o.baseLanes|t,n.memoizedState=null):r=t,O(Kn,ye),ye|=r;return le(e,n,a,t),n.child}function td(e,n){var t=n.ref;(e===null&&t!==null||e!==null&&e.ref!==t)&&(n.flags|=512,n.flags|=2097152)}function Bo(e,n,t,r,a){var o=me(t)?Pn:se.current;return o=at(n,o),nt(n,a),t=Pi(e,n,t,r,o,a),r=Mi(),e!==null&&!ge?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~a,Ze(e,n,a)):(R&&r&&yi(n),n.flags|=1,le(e,n,t,a),n.child)}function Ys(e,n,t,r,a){if(me(t)){var o=!0;Xr(n)}else o=!1;if(nt(n,a),n.stateNode===null)Dr(e,n),Jc(n,t,r),Do(n,t,r,a),r=!0;else if(e===null){var i=n.stateNode,s=n.memoizedProps;i.props=s;var l=i.context,c=t.contextType;typeof c=="object"&&c!==null?c=Te(c):(c=me(t)?Pn:se.current,c=at(n,c));var p=t.getDerivedStateFromProps,g=typeof p=="function"||typeof i.getSnapshotBeforeUpdate=="function";g||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(s!==r||l!==c)&&Gs(n,i,r,c),rn=!1;var m=n.memoizedState;i.state=m,ra(n,r,i,a),l=n.memoizedState,s!==r||m!==l||he.current||rn?(typeof p=="function"&&(Io(n,t,p,r),l=n.memoizedState),(s=rn||Ws(n,t,s,r,m,l,c))?(g||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(n.flags|=4194308)):(typeof i.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=r,n.memoizedState=l),i.props=r,i.state=l,i.context=c,r=s):(typeof i.componentDidMount=="function"&&(n.flags|=4194308),r=!1)}else{i=n.stateNode,Tc(e,n),s=n.memoizedProps,c=n.type===n.elementType?s:Ne(n.type,s),i.props=c,g=n.pendingProps,m=i.context,l=t.contextType,typeof l=="object"&&l!==null?l=Te(l):(l=me(t)?Pn:se.current,l=at(n,l));var b=t.getDerivedStateFromProps;(p=typeof b=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(s!==g||m!==l)&&Gs(n,i,r,l),rn=!1,m=n.memoizedState,i.state=m,ra(n,r,i,a);var v=n.memoizedState;s!==g||m!==v||he.current||rn?(typeof b=="function"&&(Io(n,t,b,r),v=n.memoizedState),(c=rn||Ws(n,t,c,r,m,v,l)||!1)?(p||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(r,v,l),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(r,v,l)),typeof i.componentDidUpdate=="function"&&(n.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof i.componentDidUpdate!="function"||s===e.memoizedProps&&m===e.memoizedState||(n.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&m===e.memoizedState||(n.flags|=1024),n.memoizedProps=r,n.memoizedState=v),i.props=r,i.state=v,i.context=l,r=c):(typeof i.componentDidUpdate!="function"||s===e.memoizedProps&&m===e.memoizedState||(n.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&m===e.memoizedState||(n.flags|=1024),r=!1)}return Lo(e,n,t,r,o,a)}function Lo(e,n,t,r,a,o){td(e,n);var i=(n.flags&128)!==0;if(!r&&!i)return a&&zs(n,t,!1),Ze(e,n,o);r=n.stateNode,gw.current=n;var s=i&&typeof t.getDerivedStateFromError!="function"?null:r.render();return n.flags|=1,e!==null&&i?(n.child=it(n,e.child,null,o),n.child=it(n,null,s,o)):le(e,n,s,o),n.memoizedState=r.state,a&&zs(n,t,!0),n.child}function rd(e){var n=e.stateNode;n.pendingContext?Ns(e,n.pendingContext,n.pendingContext!==n.context):n.context&&Ns(e,n.context,!1),Ei(e,n.containerInfo)}function Ks(e,n,t,r,a){return ot(),ki(a),n.flags|=256,le(e,n,t,r),n.child}var Ro={dehydrated:null,treeContext:null,retryLane:0};function Wo(e){return{baseLanes:e,cachePool:null,transitions:null}}function ad(e,n,t){var r=n.pendingProps,a=W.current,o=!1,i=(n.flags&128)!==0,s;if((s=i)||(s=e!==null&&e.memoizedState===null?!1:(a&2)!==0),s?(o=!0,n.flags&=-129):(e===null||e.memoizedState!==null)&&(a|=1),O(W,a&1),e===null)return zo(n),e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(n.mode&1?e.data==="$!"?n.lanes=8:n.lanes=1073741824:n.lanes=1,null):(i=r.children,e=r.fallback,o?(r=n.mode,o=n.child,i={mode:"hidden",children:i},!(r&1)&&o!==null?(o.childLanes=0,o.pendingProps=i):o=Sa(i,r,0,null),e=Tn(e,r,t,null),o.return=n,e.return=n,o.sibling=e,n.child=o,n.child.memoizedState=Wo(t),n.memoizedState=Ro,e):Ai(n,i));if(a=e.memoizedState,a!==null&&(s=a.dehydrated,s!==null))return hw(e,n,i,r,s,a,t);if(o){o=r.fallback,i=n.mode,a=e.child,s=a.sibling;var l={mode:"hidden",children:r.children};return!(i&1)&&n.child!==a?(r=n.child,r.childLanes=0,r.pendingProps=l,n.deletions=null):(r=mn(a,l),r.subtreeFlags=a.subtreeFlags&14680064),s!==null?o=mn(s,o):(o=Tn(o,i,t,null),o.flags|=2),o.return=n,r.return=n,r.sibling=o,n.child=r,r=o,o=n.child,i=e.child.memoizedState,i=i===null?Wo(t):{baseLanes:i.baseLanes|t,cachePool:null,transitions:i.transitions},o.memoizedState=i,o.childLanes=e.childLanes&~t,n.memoizedState=Ro,r}return o=e.child,e=o.sibling,r=mn(o,{mode:"visible",children:r.children}),!(n.mode&1)&&(r.lanes=t),r.return=n,r.sibling=null,e!==null&&(t=n.deletions,t===null?(n.deletions=[e],n.flags|=16):t.push(e)),n.child=r,n.memoizedState=null,r}function Ai(e,n){return n=Sa({mode:"visible",children:n},e.mode,0,null),n.return=e,e.child=n}function _r(e,n,t,r){return r!==null&&ki(r),it(n,e.child,null,t),e=Ai(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function hw(e,n,t,r,a,o,i){if(t)return n.flags&256?(n.flags&=-257,r=eo(Error(k(422))),_r(e,n,i,r)):n.memoizedState!==null?(n.child=e.child,n.flags|=128,null):(o=r.fallback,a=n.mode,r=Sa({mode:"visible",children:r.children},a,0,null),o=Tn(o,a,i,null),o.flags|=2,r.return=n,o.return=n,r.sibling=o,n.child=r,n.mode&1&&it(n,e.child,null,i),n.child.memoizedState=Wo(i),n.memoizedState=Ro,o);if(!(n.mode&1))return _r(e,n,i,null);if(a.data==="$!"){if(r=a.nextSibling&&a.nextSibling.dataset,r)var s=r.dgst;return r=s,o=Error(k(419)),r=eo(o,r,void 0),_r(e,n,i,r)}if(s=(i&e.childLanes)!==0,ge||s){if(r=ee,r!==null){switch(i&-i){case 4:a=2;break;case 16:a=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:a=32;break;case 536870912:a=268435456;break;default:a=0}a=a&(r.suspendedLanes|i)?0:a,a!==0&&a!==o.retryLane&&(o.retryLane=a,Xe(e,a),De(r,e,a,-1))}return Ri(),r=eo(Error(k(421))),_r(e,n,i,r)}return a.data==="$?"?(n.flags|=128,n.child=e.child,n=Cw.bind(null,e),a._reactRetry=n,null):(e=o.treeContext,xe=pn(a.nextSibling),ke=n,R=!0,Ae=null,e!==null&&(Fe[Ee++]=qe,Fe[Ee++]=Qe,Fe[Ee++]=Mn,qe=e.id,Qe=e.overflow,Mn=n),n=Ai(n,r.children),n.flags|=4096,n)}function Js(e,n,t){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n),Ao(e.return,n,t)}function no(e,n,t,r,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:r,tail:t,tailMode:a}:(o.isBackwards=n,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=t,o.tailMode=a)}function od(e,n,t){var r=n.pendingProps,a=r.revealOrder,o=r.tail;if(le(e,n,r.children,t),r=W.current,r&2)r=r&1|2,n.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Js(e,t,n);else if(e.tag===19)Js(e,t,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break e;for(;e.sibling===null;){if(e.return===null||e.return===n)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(O(W,r),!(n.mode&1))n.memoizedState=null;else switch(a){case"forwards":for(t=n.child,a=null;t!==null;)e=t.alternate,e!==null&&aa(e)===null&&(a=t),t=t.sibling;t=a,t===null?(a=n.child,n.child=null):(a=t.sibling,t.sibling=null),no(n,!1,a,t,o);break;case"backwards":for(t=null,a=n.child,n.child=null;a!==null;){if(e=a.alternate,e!==null&&aa(e)===null){n.child=a;break}e=a.sibling,a.sibling=t,t=a,a=e}no(n,!0,t,null,o);break;case"together":no(n,!1,null,null,void 0);break;default:n.memoizedState=null}return n.child}function Dr(e,n){!(n.mode&1)&&e!==null&&(e.alternate=null,n.alternate=null,n.flags|=2)}function Ze(e,n,t){if(e!==null&&(n.dependencies=e.dependencies),zn|=n.lanes,!(t&n.childLanes))return null;if(e!==null&&n.child!==e.child)throw Error(k(153));if(n.child!==null){for(e=n.child,t=mn(e,e.pendingProps),n.child=t,t.return=n;e.sibling!==null;)e=e.sibling,t=t.sibling=mn(e,e.pendingProps),t.return=n;t.sibling=null}return n.child}function mw(e,n,t){switch(n.tag){case 3:rd(n),ot();break;case 5:Pc(n);break;case 1:me(n.type)&&Xr(n);break;case 4:Ei(n,n.stateNode.containerInfo);break;case 10:var r=n.type._context,a=n.memoizedProps.value;O(na,r._currentValue),r._currentValue=a;break;case 13:if(r=n.memoizedState,r!==null)return r.dehydrated!==null?(O(W,W.current&1),n.flags|=128,null):t&n.child.childLanes?ad(e,n,t):(O(W,W.current&1),e=Ze(e,n,t),e!==null?e.sibling:null);O(W,W.current&1);break;case 19:if(r=(t&n.childLanes)!==0,e.flags&128){if(r)return od(e,n,t);n.flags|=128}if(a=n.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),O(W,W.current),r)break;return null;case 22:case 23:return n.lanes=0,nd(e,n,t)}return Ze(e,n,t)}var id,Go,sd,ld;id=function(e,n){for(var t=n.child;t!==null;){if(t.tag===5||t.tag===6)e.appendChild(t.stateNode);else if(t.tag!==4&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break;for(;t.sibling===null;){if(t.return===null||t.return===n)return;t=t.return}t.sibling.return=t.return,t=t.sibling}};Go=function(){};sd=function(e,n,t,r){var a=e.memoizedProps;if(a!==r){e=n.stateNode,Cn(Ge.current);var o=null;switch(t){case"input":a=uo(e,a),r=uo(e,r),o=[];break;case"select":a=U({},a,{value:void 0}),r=U({},r,{value:void 0}),o=[];break;case"textarea":a=go(e,a),r=go(e,r),o=[];break;default:typeof a.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Kr)}mo(t,r);var i;t=null;for(c in a)if(!r.hasOwnProperty(c)&&a.hasOwnProperty(c)&&a[c]!=null)if(c==="style"){var s=a[c];for(i in s)s.hasOwnProperty(i)&&(t||(t={}),t[i]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Ot.hasOwnProperty(c)?o||(o=[]):(o=o||[]).push(c,null));for(c in r){var l=r[c];if(s=a!=null?a[c]:void 0,r.hasOwnProperty(c)&&l!==s&&(l!=null||s!=null))if(c==="style")if(s){for(i in s)!s.hasOwnProperty(i)||l&&l.hasOwnProperty(i)||(t||(t={}),t[i]="");for(i in l)l.hasOwnProperty(i)&&s[i]!==l[i]&&(t||(t={}),t[i]=l[i])}else t||(o||(o=[]),o.push(c,t)),t=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,s=s?s.__html:void 0,l!=null&&s!==l&&(o=o||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(o=o||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Ot.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&B("scroll",e),o||s===l||(o=[])):(o=o||[]).push(c,l))}t&&(o=o||[]).push("style",t);var c=o;(n.updateQueue=c)&&(n.flags|=4)}};ld=function(e,n,t,r){t!==r&&(n.flags|=4)};function _t(e,n){if(!R)switch(e.tailMode){case"hidden":n=e.tail;for(var t=null;n!==null;)n.alternate!==null&&(t=n),n=n.sibling;t===null?e.tail=null:t.sibling=null;break;case"collapsed":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function oe(e){var n=e.alternate!==null&&e.alternate.child===e.child,t=0,r=0;if(n)for(var a=e.child;a!==null;)t|=a.lanes|a.childLanes,r|=a.subtreeFlags&14680064,r|=a.flags&14680064,a.return=e,a=a.sibling;else for(a=e.child;a!==null;)t|=a.lanes|a.childLanes,r|=a.subtreeFlags,r|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=r,e.childLanes=t,n}function bw(e,n,t){var r=n.pendingProps;switch(xi(n),n.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return oe(n),null;case 1:return me(n.type)&&Jr(),oe(n),null;case 3:return r=n.stateNode,st(),L(he),L(se),ji(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(kr(n)?n.flags|=4:e===null||e.memoizedState.isDehydrated&&!(n.flags&256)||(n.flags|=1024,Ae!==null&&(Jo(Ae),Ae=null))),Go(e,n),oe(n),null;case 5:Ci(n);var a=Cn(Kt.current);if(t=n.type,e!==null&&n.stateNode!=null)sd(e,n,t,r,a),e.ref!==n.ref&&(n.flags|=512,n.flags|=2097152);else{if(!r){if(n.stateNode===null)throw Error(k(166));return oe(n),null}if(e=Cn(Ge.current),kr(n)){r=n.stateNode,t=n.type;var o=n.memoizedProps;switch(r[Re]=n,r[Qt]=o,e=(n.mode&1)!==0,t){case"dialog":B("cancel",r),B("close",r);break;case"iframe":case"object":case"embed":B("load",r);break;case"video":case"audio":for(a=0;a<Ct.length;a++)B(Ct[a],r);break;case"source":B("error",r);break;case"img":case"image":case"link":B("error",r),B("load",r);break;case"details":B("toggle",r);break;case"input":is(r,o),B("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!o.multiple},B("invalid",r);break;case"textarea":ls(r,o),B("invalid",r)}mo(t,o),a=null;for(var i in o)if(o.hasOwnProperty(i)){var s=o[i];i==="children"?typeof s=="string"?r.textContent!==s&&(o.suppressHydrationWarning!==!0&&xr(r.textContent,s,e),a=["children",s]):typeof s=="number"&&r.textContent!==""+s&&(o.suppressHydrationWarning!==!0&&xr(r.textContent,s,e),a=["children",""+s]):Ot.hasOwnProperty(i)&&s!=null&&i==="onScroll"&&B("scroll",r)}switch(t){case"input":pr(r),ss(r,o,!0);break;case"textarea":pr(r),cs(r);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(r.onclick=Kr)}r=a,n.updateQueue=r,r!==null&&(n.flags|=4)}else{i=a.nodeType===9?a:a.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Il(t)),e==="http://www.w3.org/1999/xhtml"?t==="script"?(e=i.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=i.createElement(t,{is:r.is}):(e=i.createElement(t),t==="select"&&(i=e,r.multiple?i.multiple=!0:r.size&&(i.size=r.size))):e=i.createElementNS(e,t),e[Re]=n,e[Qt]=r,id(e,n,!1,!1),n.stateNode=e;e:{switch(i=bo(t,r),t){case"dialog":B("cancel",e),B("close",e),a=r;break;case"iframe":case"object":case"embed":B("load",e),a=r;break;case"video":case"audio":for(a=0;a<Ct.length;a++)B(Ct[a],e);a=r;break;case"source":B("error",e),a=r;break;case"img":case"image":case"link":B("error",e),B("load",e),a=r;break;case"details":B("toggle",e),a=r;break;case"input":is(e,r),a=uo(e,r),B("invalid",e);break;case"option":a=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},a=U({},r,{value:void 0}),B("invalid",e);break;case"textarea":ls(e,r),a=go(e,r),B("invalid",e);break;default:a=r}mo(t,a),s=a;for(o in s)if(s.hasOwnProperty(o)){var l=s[o];o==="style"?Bl(e,l):o==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&Dl(e,l)):o==="children"?typeof l=="string"?(t!=="textarea"||l!=="")&&Bt(e,l):typeof l=="number"&&Bt(e,""+l):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(Ot.hasOwnProperty(o)?l!=null&&o==="onScroll"&&B("scroll",e):l!=null&&oi(e,o,l,i))}switch(t){case"input":pr(e),ss(e,r,!1);break;case"textarea":pr(e),cs(e);break;case"option":r.value!=null&&e.setAttribute("value",""+bn(r.value));break;case"select":e.multiple=!!r.multiple,o=r.value,o!=null?Jn(e,!!r.multiple,o,!1):r.defaultValue!=null&&Jn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof a.onClick=="function"&&(e.onclick=Kr)}switch(t){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(n.flags|=4)}n.ref!==null&&(n.flags|=512,n.flags|=2097152)}return oe(n),null;case 6:if(e&&n.stateNode!=null)ld(e,n,e.memoizedProps,r);else{if(typeof r!="string"&&n.stateNode===null)throw Error(k(166));if(t=Cn(Kt.current),Cn(Ge.current),kr(n)){if(r=n.stateNode,t=n.memoizedProps,r[Re]=n,(o=r.nodeValue!==t)&&(e=ke,e!==null))switch(e.tag){case 3:xr(r.nodeValue,t,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&xr(r.nodeValue,t,(e.mode&1)!==0)}o&&(n.flags|=4)}else r=(t.nodeType===9?t:t.ownerDocument).createTextNode(r),r[Re]=n,n.stateNode=r}return oe(n),null;case 13:if(L(W),r=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(R&&xe!==null&&n.mode&1&&!(n.flags&128))Fc(),ot(),n.flags|=98560,o=!1;else if(o=kr(n),r!==null&&r.dehydrated!==null){if(e===null){if(!o)throw Error(k(318));if(o=n.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(k(317));o[Re]=n}else ot(),!(n.flags&128)&&(n.memoizedState=null),n.flags|=4;oe(n),o=!1}else Ae!==null&&(Jo(Ae),Ae=null),o=!0;if(!o)return n.flags&65536?n:null}return n.flags&128?(n.lanes=t,n):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(n.child.flags|=8192,n.mode&1&&(e===null||W.current&1?J===0&&(J=3):Ri())),n.updateQueue!==null&&(n.flags|=4),oe(n),null);case 4:return st(),Go(e,n),e===null&&Vt(n.stateNode.containerInfo),oe(n),null;case 10:return Si(n.type._context),oe(n),null;case 17:return me(n.type)&&Jr(),oe(n),null;case 19:if(L(W),o=n.memoizedState,o===null)return oe(n),null;if(r=(n.flags&128)!==0,i=o.rendering,i===null)if(r)_t(o,!1);else{if(J!==0||e!==null&&e.flags&128)for(e=n.child;e!==null;){if(i=aa(e),i!==null){for(n.flags|=128,_t(o,!1),r=i.updateQueue,r!==null&&(n.updateQueue=r,n.flags|=4),n.subtreeFlags=0,r=t,t=n.child;t!==null;)o=t,e=r,o.flags&=14680066,i=o.alternate,i===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=i.childLanes,o.lanes=i.lanes,o.child=i.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=i.memoizedProps,o.memoizedState=i.memoizedState,o.updateQueue=i.updateQueue,o.type=i.type,e=i.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t=t.sibling;return O(W,W.current&1|2),n.child}e=e.sibling}o.tail!==null&&q()>ct&&(n.flags|=128,r=!0,_t(o,!1),n.lanes=4194304)}else{if(!r)if(e=aa(i),e!==null){if(n.flags|=128,r=!0,t=e.updateQueue,t!==null&&(n.updateQueue=t,n.flags|=4),_t(o,!0),o.tail===null&&o.tailMode==="hidden"&&!i.alternate&&!R)return oe(n),null}else 2*q()-o.renderingStartTime>ct&&t!==1073741824&&(n.flags|=128,r=!0,_t(o,!1),n.lanes=4194304);o.isBackwards?(i.sibling=n.child,n.child=i):(t=o.last,t!==null?t.sibling=i:n.child=i,o.last=i)}return o.tail!==null?(n=o.tail,o.rendering=n,o.tail=n.sibling,o.renderingStartTime=q(),n.sibling=null,t=W.current,O(W,r?t&1|2:t&1),n):(oe(n),null);case 22:case 23:return Li(),r=n.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(n.flags|=8192),r&&n.mode&1?ye&1073741824&&(oe(n),n.subtreeFlags&6&&(n.flags|=8192)):oe(n),null;case 24:return null;case 25:return null}throw Error(k(156,n.tag))}function vw(e,n){switch(xi(n),n.tag){case 1:return me(n.type)&&Jr(),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return st(),L(he),L(se),ji(),e=n.flags,e&65536&&!(e&128)?(n.flags=e&-65537|128,n):null;case 5:return Ci(n),null;case 13:if(L(W),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(k(340));ot()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return L(W),null;case 4:return st(),null;case 10:return Si(n.type._context),null;case 22:case 23:return Li(),null;case 24:return null;default:return null}}var Sr=!1,ie=!1,yw=typeof WeakSet=="function"?WeakSet:Set,F=null;function Yn(e,n){var t=e.ref;if(t!==null)if(typeof t=="function")try{t(null)}catch(r){H(e,n,r)}else t.current=null}function Uo(e,n,t){try{t()}catch(r){H(e,n,r)}}var Xs=!1;function xw(e,n){if(Eo=qr,e=fc(),vi(e)){if("selectionStart"in e)var t={start:e.selectionStart,end:e.selectionEnd};else e:{t=(t=e.ownerDocument)&&t.defaultView||window;var r=t.getSelection&&t.getSelection();if(r&&r.rangeCount!==0){t=r.anchorNode;var a=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{t.nodeType,o.nodeType}catch{t=null;break e}var i=0,s=-1,l=-1,c=0,p=0,g=e,m=null;n:for(;;){for(var b;g!==t||a!==0&&g.nodeType!==3||(s=i+a),g!==o||r!==0&&g.nodeType!==3||(l=i+r),g.nodeType===3&&(i+=g.nodeValue.length),(b=g.firstChild)!==null;)m=g,g=b;for(;;){if(g===e)break n;if(m===t&&++c===a&&(s=i),m===o&&++p===r&&(l=i),(b=g.nextSibling)!==null)break;g=m,m=g.parentNode}g=b}t=s===-1||l===-1?null:{start:s,end:l}}else t=null}t=t||{start:0,end:0}}else t=null;for(Co={focusedElem:e,selectionRange:t},qr=!1,F=n;F!==null;)if(n=F,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,F=e;else for(;F!==null;){n=F;try{var v=n.alternate;if(n.flags&1024)switch(n.tag){case 0:case 11:case 15:break;case 1:if(v!==null){var y=v.memoizedProps,j=v.memoizedState,f=n.stateNode,u=f.getSnapshotBeforeUpdate(n.elementType===n.type?y:Ne(n.type,y),j);f.__reactInternalSnapshotBeforeUpdate=u}break;case 3:var h=n.stateNode.containerInfo;h.nodeType===1?h.textContent="":h.nodeType===9&&h.documentElement&&h.removeChild(h.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(k(163))}}catch(x){H(n,n.return,x)}if(e=n.sibling,e!==null){e.return=n.return,F=e;break}F=n.return}return v=Xs,Xs=!1,v}function At(e,n,t){var r=n.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var a=r=r.next;do{if((a.tag&e)===e){var o=a.destroy;a.destroy=void 0,o!==void 0&&Uo(n,t,o)}a=a.next}while(a!==r)}}function wa(e,n){if(n=n.updateQueue,n=n!==null?n.lastEffect:null,n!==null){var t=n=n.next;do{if((t.tag&e)===e){var r=t.create;t.destroy=r()}t=t.next}while(t!==n)}}function Ho(e){var n=e.ref;if(n!==null){var t=e.stateNode;switch(e.tag){case 5:e=t;break;default:e=t}typeof n=="function"?n(e):n.current=e}}function cd(e){var n=e.alternate;n!==null&&(e.alternate=null,cd(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&(delete n[Re],delete n[Qt],delete n[Po],delete n[tw],delete n[rw])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function dd(e){return e.tag===5||e.tag===3||e.tag===4}function Zs(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||dd(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Vo(e,n,t){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?t.nodeType===8?t.parentNode.insertBefore(e,n):t.insertBefore(e,n):(t.nodeType===8?(n=t.parentNode,n.insertBefore(e,t)):(n=t,n.appendChild(e)),t=t._reactRootContainer,t!=null||n.onclick!==null||(n.onclick=Kr));else if(r!==4&&(e=e.child,e!==null))for(Vo(e,n,t),e=e.sibling;e!==null;)Vo(e,n,t),e=e.sibling}function qo(e,n,t){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?t.insertBefore(e,n):t.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(qo(e,n,t),e=e.sibling;e!==null;)qo(e,n,t),e=e.sibling}var ne=null,ze=!1;function nn(e,n,t){for(t=t.child;t!==null;)ud(e,n,t),t=t.sibling}function ud(e,n,t){if(We&&typeof We.onCommitFiberUnmount=="function")try{We.onCommitFiberUnmount(ga,t)}catch{}switch(t.tag){case 5:ie||Yn(t,n);case 6:var r=ne,a=ze;ne=null,nn(e,n,t),ne=r,ze=a,ne!==null&&(ze?(e=ne,t=t.stateNode,e.nodeType===8?e.parentNode.removeChild(t):e.removeChild(t)):ne.removeChild(t.stateNode));break;case 18:ne!==null&&(ze?(e=ne,t=t.stateNode,e.nodeType===8?Qa(e.parentNode,t):e.nodeType===1&&Qa(e,t),Gt(e)):Qa(ne,t.stateNode));break;case 4:r=ne,a=ze,ne=t.stateNode.containerInfo,ze=!0,nn(e,n,t),ne=r,ze=a;break;case 0:case 11:case 14:case 15:if(!ie&&(r=t.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){a=r=r.next;do{var o=a,i=o.destroy;o=o.tag,i!==void 0&&(o&2||o&4)&&Uo(t,n,i),a=a.next}while(a!==r)}nn(e,n,t);break;case 1:if(!ie&&(Yn(t,n),r=t.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=t.memoizedProps,r.state=t.memoizedState,r.componentWillUnmount()}catch(s){H(t,n,s)}nn(e,n,t);break;case 21:nn(e,n,t);break;case 22:t.mode&1?(ie=(r=ie)||t.memoizedState!==null,nn(e,n,t),ie=r):nn(e,n,t);break;default:nn(e,n,t)}}function el(e){var n=e.updateQueue;if(n!==null){e.updateQueue=null;var t=e.stateNode;t===null&&(t=e.stateNode=new yw),n.forEach(function(r){var a=jw.bind(null,e,r);t.has(r)||(t.add(r),r.then(a,a))})}}function Me(e,n){var t=n.deletions;if(t!==null)for(var r=0;r<t.length;r++){var a=t[r];try{var o=e,i=n,s=i;e:for(;s!==null;){switch(s.tag){case 5:ne=s.stateNode,ze=!1;break e;case 3:ne=s.stateNode.containerInfo,ze=!0;break e;case 4:ne=s.stateNode.containerInfo,ze=!0;break e}s=s.return}if(ne===null)throw Error(k(160));ud(o,i,a),ne=null,ze=!1;var l=a.alternate;l!==null&&(l.return=null),a.return=null}catch(c){H(a,n,c)}}if(n.subtreeFlags&12854)for(n=n.child;n!==null;)pd(n,e),n=n.sibling}function pd(e,n){var t=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Me(n,e),Be(e),r&4){try{At(3,e,e.return),wa(3,e)}catch(y){H(e,e.return,y)}try{At(5,e,e.return)}catch(y){H(e,e.return,y)}}break;case 1:Me(n,e),Be(e),r&512&&t!==null&&Yn(t,t.return);break;case 5:if(Me(n,e),Be(e),r&512&&t!==null&&Yn(t,t.return),e.flags&32){var a=e.stateNode;try{Bt(a,"")}catch(y){H(e,e.return,y)}}if(r&4&&(a=e.stateNode,a!=null)){var o=e.memoizedProps,i=t!==null?t.memoizedProps:o,s=e.type,l=e.updateQueue;if(e.updateQueue=null,l!==null)try{s==="input"&&o.type==="radio"&&o.name!=null&&zl(a,o),bo(s,i);var c=bo(s,o);for(i=0;i<l.length;i+=2){var p=l[i],g=l[i+1];p==="style"?Bl(a,g):p==="dangerouslySetInnerHTML"?Dl(a,g):p==="children"?Bt(a,g):oi(a,p,g,c)}switch(s){case"input":po(a,o);break;case"textarea":Al(a,o);break;case"select":var m=a._wrapperState.wasMultiple;a._wrapperState.wasMultiple=!!o.multiple;var b=o.value;b!=null?Jn(a,!!o.multiple,b,!1):m!==!!o.multiple&&(o.defaultValue!=null?Jn(a,!!o.multiple,o.defaultValue,!0):Jn(a,!!o.multiple,o.multiple?[]:"",!1))}a[Qt]=o}catch(y){H(e,e.return,y)}}break;case 6:if(Me(n,e),Be(e),r&4){if(e.stateNode===null)throw Error(k(162));a=e.stateNode,o=e.memoizedProps;try{a.nodeValue=o}catch(y){H(e,e.return,y)}}break;case 3:if(Me(n,e),Be(e),r&4&&t!==null&&t.memoizedState.isDehydrated)try{Gt(n.containerInfo)}catch(y){H(e,e.return,y)}break;case 4:Me(n,e),Be(e);break;case 13:Me(n,e),Be(e),a=e.child,a.flags&8192&&(o=a.memoizedState!==null,a.stateNode.isHidden=o,!o||a.alternate!==null&&a.alternate.memoizedState!==null||(Oi=q())),r&4&&el(e);break;case 22:if(p=t!==null&&t.memoizedState!==null,e.mode&1?(ie=(c=ie)||p,Me(n,e),ie=c):Me(n,e),Be(e),r&8192){if(c=e.memoizedState!==null,(e.stateNode.isHidden=c)&&!p&&e.mode&1)for(F=e,p=e.child;p!==null;){for(g=F=p;F!==null;){switch(m=F,b=m.child,m.tag){case 0:case 11:case 14:case 15:At(4,m,m.return);break;case 1:Yn(m,m.return);var v=m.stateNode;if(typeof v.componentWillUnmount=="function"){r=m,t=m.return;try{n=r,v.props=n.memoizedProps,v.state=n.memoizedState,v.componentWillUnmount()}catch(y){H(r,t,y)}}break;case 5:Yn(m,m.return);break;case 22:if(m.memoizedState!==null){tl(g);continue}}b!==null?(b.return=m,F=b):tl(g)}p=p.sibling}e:for(p=null,g=e;;){if(g.tag===5){if(p===null){p=g;try{a=g.stateNode,c?(o=a.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(s=g.stateNode,l=g.memoizedProps.style,i=l!=null&&l.hasOwnProperty("display")?l.display:null,s.style.display=Ol("display",i))}catch(y){H(e,e.return,y)}}}else if(g.tag===6){if(p===null)try{g.stateNode.nodeValue=c?"":g.memoizedProps}catch(y){H(e,e.return,y)}}else if((g.tag!==22&&g.tag!==23||g.memoizedState===null||g===e)&&g.child!==null){g.child.return=g,g=g.child;continue}if(g===e)break e;for(;g.sibling===null;){if(g.return===null||g.return===e)break e;p===g&&(p=null),g=g.return}p===g&&(p=null),g.sibling.return=g.return,g=g.sibling}}break;case 19:Me(n,e),Be(e),r&4&&el(e);break;case 21:break;default:Me(n,e),Be(e)}}function Be(e){var n=e.flags;if(n&2){try{e:{for(var t=e.return;t!==null;){if(dd(t)){var r=t;break e}t=t.return}throw Error(k(160))}switch(r.tag){case 5:var a=r.stateNode;r.flags&32&&(Bt(a,""),r.flags&=-33);var o=Zs(e);qo(e,o,a);break;case 3:case 4:var i=r.stateNode.containerInfo,s=Zs(e);Vo(e,s,i);break;default:throw Error(k(161))}}catch(l){H(e,e.return,l)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function kw(e,n,t){F=e,fd(e)}function fd(e,n,t){for(var r=(e.mode&1)!==0;F!==null;){var a=F,o=a.child;if(a.tag===22&&r){var i=a.memoizedState!==null||Sr;if(!i){var s=a.alternate,l=s!==null&&s.memoizedState!==null||ie;s=Sr;var c=ie;if(Sr=i,(ie=l)&&!c)for(F=a;F!==null;)i=F,l=i.child,i.tag===22&&i.memoizedState!==null?rl(a):l!==null?(l.return=i,F=l):rl(a);for(;o!==null;)F=o,fd(o),o=o.sibling;F=a,Sr=s,ie=c}nl(e)}else a.subtreeFlags&8772&&o!==null?(o.return=a,F=o):nl(e)}}function nl(e){for(;F!==null;){var n=F;if(n.flags&8772){var t=n.alternate;try{if(n.flags&8772)switch(n.tag){case 0:case 11:case 15:ie||wa(5,n);break;case 1:var r=n.stateNode;if(n.flags&4&&!ie)if(t===null)r.componentDidMount();else{var a=n.elementType===n.type?t.memoizedProps:Ne(n.type,t.memoizedProps);r.componentDidUpdate(a,t.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var o=n.updateQueue;o!==null&&Bs(n,o,r);break;case 3:var i=n.updateQueue;if(i!==null){if(t=null,n.child!==null)switch(n.child.tag){case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}Bs(n,i,t)}break;case 5:var s=n.stateNode;if(t===null&&n.flags&4){t=s;var l=n.memoizedProps;switch(n.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&t.focus();break;case"img":l.src&&(t.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(n.memoizedState===null){var c=n.alternate;if(c!==null){var p=c.memoizedState;if(p!==null){var g=p.dehydrated;g!==null&&Gt(g)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(k(163))}ie||n.flags&512&&Ho(n)}catch(m){H(n,n.return,m)}}if(n===e){F=null;break}if(t=n.sibling,t!==null){t.return=n.return,F=t;break}F=n.return}}function tl(e){for(;F!==null;){var n=F;if(n===e){F=null;break}var t=n.sibling;if(t!==null){t.return=n.return,F=t;break}F=n.return}}function rl(e){for(;F!==null;){var n=F;try{switch(n.tag){case 0:case 11:case 15:var t=n.return;try{wa(4,n)}catch(l){H(n,t,l)}break;case 1:var r=n.stateNode;if(typeof r.componentDidMount=="function"){var a=n.return;try{r.componentDidMount()}catch(l){H(n,a,l)}}var o=n.return;try{Ho(n)}catch(l){H(n,o,l)}break;case 5:var i=n.return;try{Ho(n)}catch(l){H(n,i,l)}}}catch(l){H(n,n.return,l)}if(n===e){F=null;break}var s=n.sibling;if(s!==null){s.return=n.return,F=s;break}F=n.return}}var ww=Math.ceil,sa=en.ReactCurrentDispatcher,Ii=en.ReactCurrentOwner,je=en.ReactCurrentBatchConfig,A=0,ee=null,Q=null,te=0,ye=0,Kn=xn(0),J=0,er=null,zn=0,_a=0,Di=0,It=null,fe=null,Oi=0,ct=1/0,He=null,la=!1,Qo=null,gn=null,$r=!1,ln=null,ca=0,Dt=0,Yo=null,Or=-1,Br=0;function ce(){return A&6?q():Or!==-1?Or:Or=q()}function hn(e){return e.mode&1?A&2&&te!==0?te&-te:ow.transition!==null?(Br===0&&(Br=Jl()),Br):(e=I,e!==0||(e=window.event,e=e===void 0?16:ac(e.type)),e):1}function De(e,n,t,r){if(50<Dt)throw Dt=0,Yo=null,Error(k(185));rr(e,t,r),(!(A&2)||e!==ee)&&(e===ee&&(!(A&2)&&(_a|=t),J===4&&on(e,te)),be(e,r),t===1&&A===0&&!(n.mode&1)&&(ct=q()+500,ya&&kn()))}function be(e,n){var t=e.callbackNode;o2(e,n);var r=Vr(e,e===ee?te:0);if(r===0)t!==null&&ps(t),e.callbackNode=null,e.callbackPriority=0;else if(n=r&-r,e.callbackPriority!==n){if(t!=null&&ps(t),n===1)e.tag===0?aw(al.bind(null,e)):_c(al.bind(null,e)),ew(function(){!(A&6)&&kn()}),t=null;else{switch(Xl(r)){case 1:t=di;break;case 4:t=Yl;break;case 16:t=Hr;break;case 536870912:t=Kl;break;default:t=Hr}t=kd(t,gd.bind(null,e))}e.callbackPriority=n,e.callbackNode=t}}function gd(e,n){if(Or=-1,Br=0,A&6)throw Error(k(327));var t=e.callbackNode;if(tt()&&e.callbackNode!==t)return null;var r=Vr(e,e===ee?te:0);if(r===0)return null;if(r&30||r&e.expiredLanes||n)n=da(e,r);else{n=r;var a=A;A|=2;var o=md();(ee!==e||te!==n)&&(He=null,ct=q()+500,jn(e,n));do try{$w();break}catch(s){hd(e,s)}while(!0);_i(),sa.current=o,A=a,Q!==null?n=0:(ee=null,te=0,n=J)}if(n!==0){if(n===2&&(a=wo(e),a!==0&&(r=a,n=Ko(e,a))),n===1)throw t=er,jn(e,0),on(e,r),be(e,q()),t;if(n===6)on(e,r);else{if(a=e.current.alternate,!(r&30)&&!_w(a)&&(n=da(e,r),n===2&&(o=wo(e),o!==0&&(r=o,n=Ko(e,o))),n===1))throw t=er,jn(e,0),on(e,r),be(e,q()),t;switch(e.finishedWork=a,e.finishedLanes=r,n){case 0:case 1:throw Error(k(345));case 2:$n(e,fe,He);break;case 3:if(on(e,r),(r&130023424)===r&&(n=Oi+500-q(),10<n)){if(Vr(e,0)!==0)break;if(a=e.suspendedLanes,(a&r)!==r){ce(),e.pingedLanes|=e.suspendedLanes&a;break}e.timeoutHandle=To($n.bind(null,e,fe,He),n);break}$n(e,fe,He);break;case 4:if(on(e,r),(r&4194240)===r)break;for(n=e.eventTimes,a=-1;0<r;){var i=31-Ie(r);o=1<<i,i=n[i],i>a&&(a=i),r&=~o}if(r=a,r=q()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*ww(r/1960))-r,10<r){e.timeoutHandle=To($n.bind(null,e,fe,He),r);break}$n(e,fe,He);break;case 5:$n(e,fe,He);break;default:throw Error(k(329))}}}return be(e,q()),e.callbackNode===t?gd.bind(null,e):null}function Ko(e,n){var t=It;return e.current.memoizedState.isDehydrated&&(jn(e,n).flags|=256),e=da(e,n),e!==2&&(n=fe,fe=t,n!==null&&Jo(n)),e}function Jo(e){fe===null?fe=e:fe.push.apply(fe,e)}function _w(e){for(var n=e;;){if(n.flags&16384){var t=n.updateQueue;if(t!==null&&(t=t.stores,t!==null))for(var r=0;r<t.length;r++){var a=t[r],o=a.getSnapshot;a=a.value;try{if(!Oe(o(),a))return!1}catch{return!1}}}if(t=n.child,n.subtreeFlags&16384&&t!==null)t.return=n,n=t;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function on(e,n){for(n&=~Di,n&=~_a,e.suspendedLanes|=n,e.pingedLanes&=~n,e=e.expirationTimes;0<n;){var t=31-Ie(n),r=1<<t;e[t]=-1,n&=~r}}function al(e){if(A&6)throw Error(k(327));tt();var n=Vr(e,0);if(!(n&1))return be(e,q()),null;var t=da(e,n);if(e.tag!==0&&t===2){var r=wo(e);r!==0&&(n=r,t=Ko(e,r))}if(t===1)throw t=er,jn(e,0),on(e,n),be(e,q()),t;if(t===6)throw Error(k(345));return e.finishedWork=e.current.alternate,e.finishedLanes=n,$n(e,fe,He),be(e,q()),null}function Bi(e,n){var t=A;A|=1;try{return e(n)}finally{A=t,A===0&&(ct=q()+500,ya&&kn())}}function An(e){ln!==null&&ln.tag===0&&!(A&6)&&tt();var n=A;A|=1;var t=je.transition,r=I;try{if(je.transition=null,I=1,e)return e()}finally{I=r,je.transition=t,A=n,!(A&6)&&kn()}}function Li(){ye=Kn.current,L(Kn)}function jn(e,n){e.finishedWork=null,e.finishedLanes=0;var t=e.timeoutHandle;if(t!==-1&&(e.timeoutHandle=-1,Z2(t)),Q!==null)for(t=Q.return;t!==null;){var r=t;switch(xi(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Jr();break;case 3:st(),L(he),L(se),ji();break;case 5:Ci(r);break;case 4:st();break;case 13:L(W);break;case 19:L(W);break;case 10:Si(r.type._context);break;case 22:case 23:Li()}t=t.return}if(ee=e,Q=e=mn(e.current,null),te=ye=n,J=0,er=null,Di=_a=zn=0,fe=It=null,En!==null){for(n=0;n<En.length;n++)if(t=En[n],r=t.interleaved,r!==null){t.interleaved=null;var a=r.next,o=t.pending;if(o!==null){var i=o.next;o.next=a,r.next=i}t.pending=r}En=null}return e}function hd(e,n){do{var t=Q;try{if(_i(),Ar.current=ia,oa){for(var r=G.memoizedState;r!==null;){var a=r.queue;a!==null&&(a.pending=null),r=r.next}oa=!1}if(Nn=0,Z=K=G=null,zt=!1,Jt=0,Ii.current=null,t===null||t.return===null){J=1,er=n,Q=null;break}e:{var o=e,i=t.return,s=t,l=n;if(n=te,s.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,p=s,g=p.tag;if(!(p.mode&1)&&(g===0||g===11||g===15)){var m=p.alternate;m?(p.updateQueue=m.updateQueue,p.memoizedState=m.memoizedState,p.lanes=m.lanes):(p.updateQueue=null,p.memoizedState=null)}var b=Hs(i);if(b!==null){b.flags&=-257,Vs(b,i,s,o,n),b.mode&1&&Us(o,c,n),n=b,l=c;var v=n.updateQueue;if(v===null){var y=new Set;y.add(l),n.updateQueue=y}else v.add(l);break e}else{if(!(n&1)){Us(o,c,n),Ri();break e}l=Error(k(426))}}else if(R&&s.mode&1){var j=Hs(i);if(j!==null){!(j.flags&65536)&&(j.flags|=256),Vs(j,i,s,o,n),ki(lt(l,s));break e}}o=l=lt(l,s),J!==4&&(J=2),It===null?It=[o]:It.push(o),o=i;do{switch(o.tag){case 3:o.flags|=65536,n&=-n,o.lanes|=n;var f=Xc(o,l,n);Os(o,f);break e;case 1:s=l;var u=o.type,h=o.stateNode;if(!(o.flags&128)&&(typeof u.getDerivedStateFromError=="function"||h!==null&&typeof h.componentDidCatch=="function"&&(gn===null||!gn.has(h)))){o.flags|=65536,n&=-n,o.lanes|=n;var x=Zc(o,s,n);Os(o,x);break e}}o=o.return}while(o!==null)}vd(t)}catch(_){n=_,Q===t&&t!==null&&(Q=t=t.return);continue}break}while(!0)}function md(){var e=sa.current;return sa.current=ia,e===null?ia:e}function Ri(){(J===0||J===3||J===2)&&(J=4),ee===null||!(zn&268435455)&&!(_a&268435455)||on(ee,te)}function da(e,n){var t=A;A|=2;var r=md();(ee!==e||te!==n)&&(He=null,jn(e,n));do try{Sw();break}catch(a){hd(e,a)}while(!0);if(_i(),A=t,sa.current=r,Q!==null)throw Error(k(261));return ee=null,te=0,J}function Sw(){for(;Q!==null;)bd(Q)}function $w(){for(;Q!==null&&!Kk();)bd(Q)}function bd(e){var n=xd(e.alternate,e,ye);e.memoizedProps=e.pendingProps,n===null?vd(e):Q=n,Ii.current=null}function vd(e){var n=e;do{var t=n.alternate;if(e=n.return,n.flags&32768){if(t=vw(t,n),t!==null){t.flags&=32767,Q=t;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{J=6,Q=null;return}}else if(t=bw(t,n,ye),t!==null){Q=t;return}if(n=n.sibling,n!==null){Q=n;return}Q=n=e}while(n!==null);J===0&&(J=5)}function $n(e,n,t){var r=I,a=je.transition;try{je.transition=null,I=1,Fw(e,n,t,r)}finally{je.transition=a,I=r}return null}function Fw(e,n,t,r){do tt();while(ln!==null);if(A&6)throw Error(k(327));t=e.finishedWork;var a=e.finishedLanes;if(t===null)return null;if(e.finishedWork=null,e.finishedLanes=0,t===e.current)throw Error(k(177));e.callbackNode=null,e.callbackPriority=0;var o=t.lanes|t.childLanes;if(i2(e,o),e===ee&&(Q=ee=null,te=0),!(t.subtreeFlags&2064)&&!(t.flags&2064)||$r||($r=!0,kd(Hr,function(){return tt(),null})),o=(t.flags&15990)!==0,t.subtreeFlags&15990||o){o=je.transition,je.transition=null;var i=I;I=1;var s=A;A|=4,Ii.current=null,xw(e,t),pd(t,e),V2(Co),qr=!!Eo,Co=Eo=null,e.current=t,kw(t),Jk(),A=s,I=i,je.transition=o}else e.current=t;if($r&&($r=!1,ln=e,ca=a),o=e.pendingLanes,o===0&&(gn=null),e2(t.stateNode),be(e,q()),n!==null)for(r=e.onRecoverableError,t=0;t<n.length;t++)a=n[t],r(a.value,{componentStack:a.stack,digest:a.digest});if(la)throw la=!1,e=Qo,Qo=null,e;return ca&1&&e.tag!==0&&tt(),o=e.pendingLanes,o&1?e===Yo?Dt++:(Dt=0,Yo=e):Dt=0,kn(),null}function tt(){if(ln!==null){var e=Xl(ca),n=je.transition,t=I;try{if(je.transition=null,I=16>e?16:e,ln===null)var r=!1;else{if(e=ln,ln=null,ca=0,A&6)throw Error(k(331));var a=A;for(A|=4,F=e.current;F!==null;){var o=F,i=o.child;if(F.flags&16){var s=o.deletions;if(s!==null){for(var l=0;l<s.length;l++){var c=s[l];for(F=c;F!==null;){var p=F;switch(p.tag){case 0:case 11:case 15:At(8,p,o)}var g=p.child;if(g!==null)g.return=p,F=g;else for(;F!==null;){p=F;var m=p.sibling,b=p.return;if(cd(p),p===c){F=null;break}if(m!==null){m.return=b,F=m;break}F=b}}}var v=o.alternate;if(v!==null){var y=v.child;if(y!==null){v.child=null;do{var j=y.sibling;y.sibling=null,y=j}while(y!==null)}}F=o}}if(o.subtreeFlags&2064&&i!==null)i.return=o,F=i;else e:for(;F!==null;){if(o=F,o.flags&2048)switch(o.tag){case 0:case 11:case 15:At(9,o,o.return)}var f=o.sibling;if(f!==null){f.return=o.return,F=f;break e}F=o.return}}var u=e.current;for(F=u;F!==null;){i=F;var h=i.child;if(i.subtreeFlags&2064&&h!==null)h.return=i,F=h;else e:for(i=u;F!==null;){if(s=F,s.flags&2048)try{switch(s.tag){case 0:case 11:case 15:wa(9,s)}}catch(_){H(s,s.return,_)}if(s===i){F=null;break e}var x=s.sibling;if(x!==null){x.return=s.return,F=x;break e}F=s.return}}if(A=a,kn(),We&&typeof We.onPostCommitFiberRoot=="function")try{We.onPostCommitFiberRoot(ga,e)}catch{}r=!0}return r}finally{I=t,je.transition=n}}return!1}function ol(e,n,t){n=lt(t,n),n=Xc(e,n,1),e=fn(e,n,1),n=ce(),e!==null&&(rr(e,1,n),be(e,n))}function H(e,n,t){if(e.tag===3)ol(e,e,t);else for(;n!==null;){if(n.tag===3){ol(n,e,t);break}else if(n.tag===1){var r=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(gn===null||!gn.has(r))){e=lt(t,e),e=Zc(n,e,1),n=fn(n,e,1),e=ce(),n!==null&&(rr(n,1,e),be(n,e));break}}n=n.return}}function Ew(e,n,t){var r=e.pingCache;r!==null&&r.delete(n),n=ce(),e.pingedLanes|=e.suspendedLanes&t,ee===e&&(te&t)===t&&(J===4||J===3&&(te&130023424)===te&&500>q()-Oi?jn(e,0):Di|=t),be(e,n)}function yd(e,n){n===0&&(e.mode&1?(n=hr,hr<<=1,!(hr&130023424)&&(hr=4194304)):n=1);var t=ce();e=Xe(e,n),e!==null&&(rr(e,n,t),be(e,t))}function Cw(e){var n=e.memoizedState,t=0;n!==null&&(t=n.retryLane),yd(e,t)}function jw(e,n){var t=0;switch(e.tag){case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(t=a.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(k(314))}r!==null&&r.delete(n),yd(e,t)}var xd;xd=function(e,n,t){if(e!==null)if(e.memoizedProps!==n.pendingProps||he.current)ge=!0;else{if(!(e.lanes&t)&&!(n.flags&128))return ge=!1,mw(e,n,t);ge=!!(e.flags&131072)}else ge=!1,R&&n.flags&1048576&&Sc(n,ea,n.index);switch(n.lanes=0,n.tag){case 2:var r=n.type;Dr(e,n),e=n.pendingProps;var a=at(n,se.current);nt(n,t),a=Pi(null,n,r,e,a,t);var o=Mi();return n.flags|=1,typeof a=="object"&&a!==null&&typeof a.render=="function"&&a.$$typeof===void 0?(n.tag=1,n.memoizedState=null,n.updateQueue=null,me(r)?(o=!0,Xr(n)):o=!1,n.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,Fi(n),a.updater=ka,n.stateNode=a,a._reactInternals=n,Do(n,r,e,t),n=Lo(null,n,r,!0,o,t)):(n.tag=0,R&&o&&yi(n),le(null,n,a,t),n=n.child),n;case 16:r=n.elementType;e:{switch(Dr(e,n),e=n.pendingProps,a=r._init,r=a(r._payload),n.type=r,a=n.tag=Pw(r),e=Ne(r,e),a){case 0:n=Bo(null,n,r,e,t);break e;case 1:n=Ys(null,n,r,e,t);break e;case 11:n=qs(null,n,r,e,t);break e;case 14:n=Qs(null,n,r,Ne(r.type,e),t);break e}throw Error(k(306,r,""))}return n;case 0:return r=n.type,a=n.pendingProps,a=n.elementType===r?a:Ne(r,a),Bo(e,n,r,a,t);case 1:return r=n.type,a=n.pendingProps,a=n.elementType===r?a:Ne(r,a),Ys(e,n,r,a,t);case 3:e:{if(rd(n),e===null)throw Error(k(387));r=n.pendingProps,o=n.memoizedState,a=o.element,Tc(e,n),ra(n,r,null,t);var i=n.memoizedState;if(r=i.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:i.cache,pendingSuspenseBoundaries:i.pendingSuspenseBoundaries,transitions:i.transitions},n.updateQueue.baseState=o,n.memoizedState=o,n.flags&256){a=lt(Error(k(423)),n),n=Ks(e,n,r,t,a);break e}else if(r!==a){a=lt(Error(k(424)),n),n=Ks(e,n,r,t,a);break e}else for(xe=pn(n.stateNode.containerInfo.firstChild),ke=n,R=!0,Ae=null,t=Cc(n,null,r,t),n.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling;else{if(ot(),r===a){n=Ze(e,n,t);break e}le(e,n,r,t)}n=n.child}return n;case 5:return Pc(n),e===null&&zo(n),r=n.type,a=n.pendingProps,o=e!==null?e.memoizedProps:null,i=a.children,jo(r,a)?i=null:o!==null&&jo(r,o)&&(n.flags|=32),td(e,n),le(e,n,i,t),n.child;case 6:return e===null&&zo(n),null;case 13:return ad(e,n,t);case 4:return Ei(n,n.stateNode.containerInfo),r=n.pendingProps,e===null?n.child=it(n,null,r,t):le(e,n,r,t),n.child;case 11:return r=n.type,a=n.pendingProps,a=n.elementType===r?a:Ne(r,a),qs(e,n,r,a,t);case 7:return le(e,n,n.pendingProps,t),n.child;case 8:return le(e,n,n.pendingProps.children,t),n.child;case 12:return le(e,n,n.pendingProps.children,t),n.child;case 10:e:{if(r=n.type._context,a=n.pendingProps,o=n.memoizedProps,i=a.value,O(na,r._currentValue),r._currentValue=i,o!==null)if(Oe(o.value,i)){if(o.children===a.children&&!he.current){n=Ze(e,n,t);break e}}else for(o=n.child,o!==null&&(o.return=n);o!==null;){var s=o.dependencies;if(s!==null){i=o.child;for(var l=s.firstContext;l!==null;){if(l.context===r){if(o.tag===1){l=Ye(-1,t&-t),l.tag=2;var c=o.updateQueue;if(c!==null){c=c.shared;var p=c.pending;p===null?l.next=l:(l.next=p.next,p.next=l),c.pending=l}}o.lanes|=t,l=o.alternate,l!==null&&(l.lanes|=t),Ao(o.return,t,n),s.lanes|=t;break}l=l.next}}else if(o.tag===10)i=o.type===n.type?null:o.child;else if(o.tag===18){if(i=o.return,i===null)throw Error(k(341));i.lanes|=t,s=i.alternate,s!==null&&(s.lanes|=t),Ao(i,t,n),i=o.sibling}else i=o.child;if(i!==null)i.return=o;else for(i=o;i!==null;){if(i===n){i=null;break}if(o=i.sibling,o!==null){o.return=i.return,i=o;break}i=i.return}o=i}le(e,n,a.children,t),n=n.child}return n;case 9:return a=n.type,r=n.pendingProps.children,nt(n,t),a=Te(a),r=r(a),n.flags|=1,le(e,n,r,t),n.child;case 14:return r=n.type,a=Ne(r,n.pendingProps),a=Ne(r.type,a),Qs(e,n,r,a,t);case 15:return ed(e,n,n.type,n.pendingProps,t);case 17:return r=n.type,a=n.pendingProps,a=n.elementType===r?a:Ne(r,a),Dr(e,n),n.tag=1,me(r)?(e=!0,Xr(n)):e=!1,nt(n,t),Jc(n,r,a),Do(n,r,a,t),Lo(null,n,r,!0,e,t);case 19:return od(e,n,t);case 22:return nd(e,n,t)}throw Error(k(156,n.tag))};function kd(e,n){return Ql(e,n)}function Tw(e,n,t,r){this.tag=e,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ce(e,n,t,r){return new Tw(e,n,t,r)}function Wi(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Pw(e){if(typeof e=="function")return Wi(e)?1:0;if(e!=null){if(e=e.$$typeof,e===si)return 11;if(e===li)return 14}return 2}function mn(e,n){var t=e.alternate;return t===null?(t=Ce(e.tag,n,e.key,e.mode),t.elementType=e.elementType,t.type=e.type,t.stateNode=e.stateNode,t.alternate=e,e.alternate=t):(t.pendingProps=n,t.type=e.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=e.flags&14680064,t.childLanes=e.childLanes,t.lanes=e.lanes,t.child=e.child,t.memoizedProps=e.memoizedProps,t.memoizedState=e.memoizedState,t.updateQueue=e.updateQueue,n=e.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},t.sibling=e.sibling,t.index=e.index,t.ref=e.ref,t}function Lr(e,n,t,r,a,o){var i=2;if(r=e,typeof e=="function")Wi(e)&&(i=1);else if(typeof e=="string")i=5;else e:switch(e){case Ln:return Tn(t.children,a,o,n);case ii:i=8,a|=8;break;case io:return e=Ce(12,t,n,a|2),e.elementType=io,e.lanes=o,e;case so:return e=Ce(13,t,n,a),e.elementType=so,e.lanes=o,e;case lo:return e=Ce(19,t,n,a),e.elementType=lo,e.lanes=o,e;case Pl:return Sa(t,a,o,n);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case jl:i=10;break e;case Tl:i=9;break e;case si:i=11;break e;case li:i=14;break e;case tn:i=16,r=null;break e}throw Error(k(130,e==null?e:typeof e,""))}return n=Ce(i,t,n,a),n.elementType=e,n.type=r,n.lanes=o,n}function Tn(e,n,t,r){return e=Ce(7,e,r,n),e.lanes=t,e}function Sa(e,n,t,r){return e=Ce(22,e,r,n),e.elementType=Pl,e.lanes=t,e.stateNode={isHidden:!1},e}function to(e,n,t){return e=Ce(6,e,null,n),e.lanes=t,e}function ro(e,n,t){return n=Ce(4,e.children!==null?e.children:[],e.key,n),n.lanes=t,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}function Mw(e,n,t,r,a){this.tag=n,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Da(0),this.expirationTimes=Da(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Da(0),this.identifierPrefix=r,this.onRecoverableError=a,this.mutableSourceEagerHydrationData=null}function Gi(e,n,t,r,a,o,i,s,l){return e=new Mw(e,n,t,s,l),n===1?(n=1,o===!0&&(n|=8)):n=0,o=Ce(3,null,null,n),e.current=o,o.stateNode=e,o.memoizedState={element:r,isDehydrated:t,cache:null,transitions:null,pendingSuspenseBoundaries:null},Fi(o),e}function Nw(e,n,t){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Bn,key:r==null?null:""+r,children:e,containerInfo:n,implementation:t}}function wd(e){if(!e)return vn;e=e._reactInternals;e:{if(Dn(e)!==e||e.tag!==1)throw Error(k(170));var n=e;do{switch(n.tag){case 3:n=n.stateNode.context;break e;case 1:if(me(n.type)){n=n.stateNode.__reactInternalMemoizedMergedChildContext;break e}}n=n.return}while(n!==null);throw Error(k(171))}if(e.tag===1){var t=e.type;if(me(t))return wc(e,t,n)}return n}function _d(e,n,t,r,a,o,i,s,l){return e=Gi(t,r,!0,e,a,o,i,s,l),e.context=wd(null),t=e.current,r=ce(),a=hn(t),o=Ye(r,a),o.callback=n??null,fn(t,o,a),e.current.lanes=a,rr(e,a,r),be(e,r),e}function $a(e,n,t,r){var a=n.current,o=ce(),i=hn(a);return t=wd(t),n.context===null?n.context=t:n.pendingContext=t,n=Ye(o,i),n.payload={element:e},r=r===void 0?null:r,r!==null&&(n.callback=r),e=fn(a,n,i),e!==null&&(De(e,a,i,o),zr(e,a,i)),i}function ua(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function il(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var t=e.retryLane;e.retryLane=t!==0&&t<n?t:n}}function Ui(e,n){il(e,n),(e=e.alternate)&&il(e,n)}function zw(){return null}var Sd=typeof reportError=="function"?reportError:function(e){console.error(e)};function Hi(e){this._internalRoot=e}Fa.prototype.render=Hi.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(k(409));$a(e,n,null,null)};Fa.prototype.unmount=Hi.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;An(function(){$a(null,e,null,null)}),n[Je]=null}};function Fa(e){this._internalRoot=e}Fa.prototype.unstable_scheduleHydration=function(e){if(e){var n=nc();e={blockedOn:null,target:e,priority:n};for(var t=0;t<an.length&&n!==0&&n<an[t].priority;t++);an.splice(t,0,e),t===0&&rc(e)}};function Vi(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Ea(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function sl(){}function Aw(e,n,t,r,a){if(a){if(typeof r=="function"){var o=r;r=function(){var c=ua(i);o.call(c)}}var i=_d(n,r,e,0,null,!1,!1,"",sl);return e._reactRootContainer=i,e[Je]=i.current,Vt(e.nodeType===8?e.parentNode:e),An(),i}for(;a=e.lastChild;)e.removeChild(a);if(typeof r=="function"){var s=r;r=function(){var c=ua(l);s.call(c)}}var l=Gi(e,0,!1,null,null,!1,!1,"",sl);return e._reactRootContainer=l,e[Je]=l.current,Vt(e.nodeType===8?e.parentNode:e),An(function(){$a(n,l,t,r)}),l}function Ca(e,n,t,r,a){var o=t._reactRootContainer;if(o){var i=o;if(typeof a=="function"){var s=a;a=function(){var l=ua(i);s.call(l)}}$a(n,i,e,a)}else i=Aw(t,n,e,a,r);return ua(i)}Zl=function(e){switch(e.tag){case 3:var n=e.stateNode;if(n.current.memoizedState.isDehydrated){var t=Et(n.pendingLanes);t!==0&&(ui(n,t|1),be(n,q()),!(A&6)&&(ct=q()+500,kn()))}break;case 13:An(function(){var r=Xe(e,1);if(r!==null){var a=ce();De(r,e,1,a)}}),Ui(e,1)}};pi=function(e){if(e.tag===13){var n=Xe(e,134217728);if(n!==null){var t=ce();De(n,e,134217728,t)}Ui(e,134217728)}};ec=function(e){if(e.tag===13){var n=hn(e),t=Xe(e,n);if(t!==null){var r=ce();De(t,e,n,r)}Ui(e,n)}};nc=function(){return I};tc=function(e,n){var t=I;try{return I=e,n()}finally{I=t}};yo=function(e,n,t){switch(n){case"input":if(po(e,t),n=t.name,t.type==="radio"&&n!=null){for(t=e;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll("input[name="+JSON.stringify(""+n)+'][type="radio"]'),n=0;n<t.length;n++){var r=t[n];if(r!==e&&r.form===e.form){var a=va(r);if(!a)throw Error(k(90));Nl(r),po(r,a)}}}break;case"textarea":Al(e,t);break;case"select":n=t.value,n!=null&&Jn(e,!!t.multiple,n,!1)}};Wl=Bi;Gl=An;var Iw={usingClientEntryPoint:!1,Events:[or,Un,va,Ll,Rl,Bi]},St={findFiberByHostInstance:Fn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Dw={bundleType:St.bundleType,version:St.version,rendererPackageName:St.rendererPackageName,rendererConfig:St.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:en.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Vl(e),e===null?null:e.stateNode},findFiberByHostInstance:St.findFiberByHostInstance||zw,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Fr=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Fr.isDisabled&&Fr.supportsFiber)try{ga=Fr.inject(Dw),We=Fr}catch{}}_e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Iw;_e.createPortal=function(e,n){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Vi(n))throw Error(k(200));return Nw(e,n,null,t)};_e.createRoot=function(e,n){if(!Vi(e))throw Error(k(299));var t=!1,r="",a=Sd;return n!=null&&(n.unstable_strictMode===!0&&(t=!0),n.identifierPrefix!==void 0&&(r=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),n=Gi(e,1,!1,null,null,t,!1,r,a),e[Je]=n.current,Vt(e.nodeType===8?e.parentNode:e),new Hi(n)};_e.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(k(188)):(e=Object.keys(e).join(","),Error(k(268,e)));return e=Vl(n),e=e===null?null:e.stateNode,e};_e.flushSync=function(e){return An(e)};_e.hydrate=function(e,n,t){if(!Ea(n))throw Error(k(200));return Ca(null,e,n,!0,t)};_e.hydrateRoot=function(e,n,t){if(!Vi(e))throw Error(k(405));var r=t!=null&&t.hydratedSources||null,a=!1,o="",i=Sd;if(t!=null&&(t.unstable_strictMode===!0&&(a=!0),t.identifierPrefix!==void 0&&(o=t.identifierPrefix),t.onRecoverableError!==void 0&&(i=t.onRecoverableError)),n=_d(n,null,e,1,t??null,a,!1,o,i),e[Je]=n.current,Vt(e),r)for(e=0;e<r.length;e++)t=r[e],a=t._getVersion,a=a(t._source),n.mutableSourceEagerHydrationData==null?n.mutableSourceEagerHydrationData=[t,a]:n.mutableSourceEagerHydrationData.push(t,a);return new Fa(n)};_e.render=function(e,n,t){if(!Ea(n))throw Error(k(200));return Ca(null,e,n,!1,t)};_e.unmountComponentAtNode=function(e){if(!Ea(e))throw Error(k(40));return e._reactRootContainer?(An(function(){Ca(null,null,e,!1,function(){e._reactRootContainer=null,e[Je]=null})}),!0):!1};_e.unstable_batchedUpdates=Bi;_e.unstable_renderSubtreeIntoContainer=function(e,n,t,r){if(!Ea(t))throw Error(k(200));if(e==null||e._reactInternals===void 0)throw Error(k(38));return Ca(e,n,t,!1,r)};_e.version="18.3.1-next-f1338f8080-20240426";function $d(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE($d)}catch(e){console.error(e)}}$d(),$l.exports=_e;var Ow=$l.exports,Fd,ll=Ow;Fd=ll.createRoot,ll.hydrateRoot;const Bw=["title","section","two-column","feature-grid","data-table","stat-row","timeline","quote","closing","image-hero","comparison","code"],Xo={title:"Title",section:"Section divider","two-column":"Two column","feature-grid":"Feature grid","data-table":"Data table","stat-row":"Stat row",timeline:"Timeline",quote:"Quote",closing:"Closing","image-hero":"Image hero",comparison:"Comparison",code:"Code"};function Lw(e){switch(e){case"title":return{layout:e,eyebrow:"Eyebrow",heading:"Title slide",lead:"Supporting line."};case"section":return{layout:e,number:"01",eyebrow:"Part",heading:"Section title",lead:""};case"two-column":return{layout:e,heading:"Heading",body:"Left column body text.",image:"",imageAlt:"Image"};case"image-hero":return{layout:e,eyebrow:"Story",heading:"Hero moment",lead:"Caption over a full-bleed image.",image:"",imageAlt:"Hero image"};case"comparison":return{layout:e,heading:"Before vs after",leftLabel:"Before",left:"The old way — slow, manual, error-prone.",rightLabel:"After",right:"The new way — automated, fast, reliable.",emphasis:"right"};case"code":return{layout:e,eyebrow:"API",heading:"Ship in five lines",filename:"example.ts",language:"ts",code:`const client = createClient({ apiKey });
const res = await client.run({ prompt });
console.log(res.ok);`};case"feature-grid":return{layout:e,heading:"Feature grid",columns:3,cards:[{title:"One",body:"First point."},{title:"Two",body:"Second point."},{title:"Three",body:"Third point."}]};case"data-table":return{layout:e,heading:"Table",columns:["Column A","Column B"],rows:[["a1","b1"],["a2","b2"]]};case"stat-row":return{layout:e,heading:"Stats",stats:[{value:"100%",label:"Metric"},{value:"2x",label:"Metric"}]};case"timeline":return{layout:e,heading:"Timeline",steps:[{title:"Step one",body:"Detail."},{title:"Step two",body:"Detail."}]};case"quote":return{layout:e,quote:"A memorable quote.",by:"Attribution"};case"closing":return{layout:e,eyebrow:"Thanks",heading:"Closing",lead:"Call to action.",cta:{label:"Get started",href:"https://example.com"}};default:return{layout:e,heading:"Slide"}}}const Ed={type:"deck",meta:{title:"Acme Q3",company:"Acme",theme:"signal",description:"Studio craft preview"},slides:[{layout:"title",eyebrow:"Q3 2026",heading:"Acme All-Hands",lead:"Momentum, metrics, and what's next."},{layout:"image-hero",eyebrow:"Moment",heading:"Ship the story, not the slide.",lead:"Full-bleed craft that still exports to editable PPTX.",image:"data:image/svg+xml,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#0B1220"/><stop offset="1" stop-color="#FF3B1F"/></linearGradient></defs><rect width="1600" height="900" fill="url(#g)"/><circle cx="1180" cy="280" r="180" fill="#0D9488" opacity=".35"/></svg>'),imageAlt:"Signal gradient field"},{layout:"section",number:"01",eyebrow:"Part one",heading:"Where we are"},{layout:"feature-grid",heading:"Three pillars",columns:"bento",cards:[{icon:"fa-solid fa-bolt",title:"Speed",body:"Ship 3x faster with schema craft."},{title:"Safety",body:"SOC2 in progress."},{title:"Simplicity",body:"One command install."},{title:"Export",body:"Native editable PPTX."},{title:"Themes",body:"75 swappable looks."}]},{layout:"comparison",heading:"Before vs after",leftLabel:"Prompt-only packs",left:"Opaque HTML. Hard to edit one slide. No native PowerPoint.",rightLabel:"presentation-md",right:"Schema-validated Deck JSON. Diff one slide. MCP + editable PPTX.",emphasis:"right"},{layout:"two-column",eyebrow:"Craft",heading:"Asymmetric layouts stay intentional.",body:"Ratio and reverse controls keep media and copy in tension — not a default 50/50 split.",aside:"2:1 copy · reverse media",ratio:"2-1"},{layout:"code",eyebrow:"Agent skill",heading:"One install. Any agent.",filename:"install.sh",language:"bash",code:`npx @presentation-md/install claude-code
# then: create a presentation about…`},{layout:"stat-row",heading:"By the numbers",stats:[{value:"75",label:"Themes"},{value:"12",label:"Layouts"},{value:"1",label:"Install"}]},{layout:"quote",quote:"Make it work, make it right, make it fast.",by:"Kent Beck"},{layout:"closing",heading:"Thank you",lead:"Questions?",cta:{label:"Get started",href:"https://presentation-md.vercel.app"}}]},Cd="claude",jd="0.1.0",Td="Anthropic / Claude-inspired theme: warm cream paper, clay-coral accent, grotesk + editorial-serif pairing.",Pd="Warm, human, editorial, high-craft, calm — cream paper, soft clay-coral signal, Styrene-style grotesk headings over a Tiempos-style serif body. Restrained, trustworthy, not corporate.",Md="MIT",Nd="Timur Isachenko",zd={bg:"#faf9f5",bg2:"#f4f3ee",text:"#141413",muted:"#73706a",accent:"#d97757",accent2:"#6a9bcc",cardBg:"#ffffff",border:"#e8e6dc"},Ad={headingFont:"'Space Grotesk', system-ui, sans-serif",bodyFont:"'Lora', Georgia, 'Times New Roman', serif",headingWeight:600,googleFonts:["Space+Grotesk:wght@500;600;700","Lora:wght@400;500;600"]},Id={radius:"12px",slideWidth:"1280px"},Rw={name:Cd,version:jd,extends:"default-tech",description:Td,vibe:Pd,license:Md,author:Nd,roles:zd,typography:Ad,geometry:Id},Ww=Object.freeze(Object.defineProperty({__proto__:null,author:Nd,default:Rw,description:Td,geometry:Id,license:Md,name:Cd,roles:zd,typography:Ad,version:jd,vibe:Pd},Symbol.toStringTag,{value:"Module"})),Dd="default-tech",Od="0.1.0",Bd="Edgy tech-startup default: dark canvas, violet + cyan accents, bold geometric sans.",Ld="Edgy tech startup — dark, confident, neon-accented.",Rd="MIT",Wd="Timur Isachenko",Gd={bg:"#0e0e12",bg2:"#16161d",text:"#f4f4f5",muted:"#a1a1aa",accent:"#7c3aed",accent2:"#22d3ee",cardBg:"rgba(255,255,255,0.04)",border:"rgba(255,255,255,0.08)"},Ud={headingFont:"'Montserrat', system-ui, sans-serif",bodyFont:"'Open Sans', system-ui, sans-serif",headingWeight:800,googleFonts:["Montserrat:wght@700;800","Open+Sans:wght@400;600"]},Hd={radius:"18px",slideWidth:"1280px"},Gw={name:Dd,version:Od,description:Bd,vibe:Ld,license:Rd,author:Wd,roles:Gd,typography:Ud,geometry:Hd},Uw=Object.freeze(Object.defineProperty({__proto__:null,author:Wd,default:Gw,description:Bd,geometry:Hd,license:Rd,name:Dd,roles:Gd,typography:Ud,version:Od,vibe:Ld},Symbol.toStringTag,{value:"Module"})),Vd="8-bit-orbit",qd="1.0.0",Qd="8-Bit Orbit — pixel-art neon arcade on deep navy, Tektur + Chakra Petch (frontend-slides bold-template-pack).",Yd="8-Bit Orbit — void #0A0E27, neon cyan/pink/yellow, Tektur + Chakra Petch + Space Mono (frontend-slides 8-bit-orbit).",Kd="MIT",Jd="Timur Isachenko",Xd={bg:"#0A0E27",bg2:"#0F1B3D",text:"#FFFFFF",muted:"#E2D5F2",accent:"#5EDCF4",accent2:"#F0A6CA",cardBg:"rgba(15,27,61,0.85)",border:"rgba(94,220,244,0.35)"},Zd={headingFont:"'Tektur', cursive",bodyFont:"'Chakra Petch', system-ui, sans-serif",headingWeight:700,googleFonts:["Tektur:wght@500;700;900","Chakra+Petch:wght@400;500;600;700","Space+Mono:wght@400;700"]},eu={radius:"0px",slideWidth:"1280px"},Hw={name:Vd,version:qd,extends:"default-tech",description:Qd,vibe:Yd,license:Kd,author:Jd,roles:Xd,typography:Zd,geometry:eu},Vw=Object.freeze(Object.defineProperty({__proto__:null,author:Jd,default:Hw,description:Qd,geometry:eu,license:Kd,name:Vd,roles:Xd,typography:Zd,version:qd,vibe:Yd},Symbol.toStringTag,{value:"Module"})),nu="aerospace-hud",tu="0.1.0",ru="Aerospace HUD — deep navy, cyan instruments, warning orange, blueprint grid.",au="Aerospace HUD — navy cockpit, cyan instruments, warning orange, Barlow Condensed (matches Axiom gallery).",ou="MIT",iu="Timur Isachenko",su={bg:"#0a1d3a",bg2:"#0d2347",text:"#f0f8ff",muted:"#62abd8",accent:"#5ec8ff",accent2:"#ff7a18",cardBg:"rgba(94,200,255,0.08)",border:"rgba(94,200,255,0.28)"},lu={headingFont:"'Barlow Condensed', system-ui, sans-serif",bodyFont:"'Barlow', system-ui, sans-serif",headingWeight:700,googleFonts:["Barlow+Condensed:wght@600;700","Barlow:wght@400;600","IBM+Plex+Mono:wght@500"]},cu={radius:"4px",slideWidth:"1280px"},qw={name:nu,version:tu,extends:"default-tech",description:ru,vibe:au,license:ou,author:iu,roles:su,typography:lu,geometry:cu},Qw=Object.freeze(Object.defineProperty({__proto__:null,author:iu,default:qw,description:ru,geometry:cu,license:ou,name:nu,roles:su,typography:lu,version:tu,vibe:au},Symbol.toStringTag,{value:"Module"})),du="art-deco",uu="0.1.0",pu="Art Deco investor — deep emerald, gold leaf, Cinzel display.",fu="Art Deco — #0c2a24 emerald, gold #c8a24a, Cinzel (matches Meridian Club gallery).",gu="MIT",hu="Timur Isachenko",mu={bg:"#0c2a24",bg2:"#113530",text:"#f5eed8",muted:"#c9bfa0",accent:"#c8a24a",accent2:"#e2c47a",cardBg:"rgba(200,162,74,0.08)",border:"rgba(200,162,74,0.35)"},bu={headingFont:"'Cinzel', Georgia, serif",bodyFont:"'Cormorant Garamond', Georgia, serif",headingWeight:600,googleFonts:["Cinzel:wght@500;600;700","Cormorant+Garamond:wght@400;600"]},vu={radius:"0px",slideWidth:"1280px"},Yw={name:du,version:uu,extends:"default-tech",description:pu,vibe:fu,license:gu,author:hu,roles:mu,typography:bu,geometry:vu},Kw=Object.freeze(Object.defineProperty({__proto__:null,author:hu,default:Yw,description:pu,geometry:vu,license:gu,name:du,roles:mu,typography:bu,version:uu,vibe:fu},Symbol.toStringTag,{value:"Module"})),yu="aurora-glass",xu="0.1.0",ku="Dark aurora glassmorphism — void canvas, frosted cards, violet + cyan glow.",wu="Aurora glass — pure black void, Syne + Inter, violet #a78bfa + cyan #67e8f9 (matches NovaSpark gallery).",_u="MIT",Su="Timur Isachenko",$u={bg:"#000000",bg2:"#0a0612",text:"#ffffff",muted:"#a5a0b8",accent:"#a78bfa",accent2:"#67e8f9",cardBg:"rgba(255,255,255,0.06)",border:"rgba(255,255,255,0.12)"},Fu={headingFont:"'Syne', system-ui, sans-serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:800,googleFonts:["Syne:wght@700;800","Inter:wght@400;600"]},Eu={radius:"16px",slideWidth:"1280px"},Jw={name:yu,version:xu,extends:"default-tech",description:ku,vibe:wu,license:_u,author:Su,roles:$u,typography:Fu,geometry:Eu},Xw=Object.freeze(Object.defineProperty({__proto__:null,author:Su,default:Jw,description:ku,geometry:Eu,license:_u,name:yu,roles:$u,typography:Fu,version:xu,vibe:wu},Symbol.toStringTag,{value:"Module"})),Cu="bauhaus",ju="0.1.0",Tu="Bauhaus primary system — cream field, red/yellow/blue geometry, bold grotesk.",Pu="Bauhaus — warm cream #f4f1ea, primary red #e63946 + blue #1f4ae0 (matches Primary gallery).",Mu="MIT",Nu="Timur Isachenko",zu={bg:"#f4f1ea",bg2:"#ede9e0",text:"#0d0d0d",muted:"#5f5b53",accent:"#e63946",accent2:"#1f4ae0",cardBg:"rgba(0,0,0,0.04)",border:"rgba(13,13,13,0.2)"},Au={headingFont:"'Archivo', system-ui, sans-serif",bodyFont:"'Space Grotesk', system-ui, sans-serif",headingWeight:800,googleFonts:["Archivo:wght@600;800","Space+Grotesk:wght@400;600"]},Iu={radius:"0px",slideWidth:"1280px"},Zw={name:Cu,version:ju,extends:"default-tech",description:Tu,vibe:Pu,license:Mu,author:Nu,roles:zu,typography:Au,geometry:Iu},e5=Object.freeze(Object.defineProperty({__proto__:null,author:Nu,default:Zw,description:Tu,geometry:Iu,license:Mu,name:Cu,roles:zu,typography:Au,version:ju,vibe:Pu},Symbol.toStringTag,{value:"Module"})),Du="biennale-yellow",Ou="1.0.0",Bu="Biennale Yellow — Instrument Serif on parchment with solar yellow bloom and deep indigo ink (frontend-slides / beautiful-html-templates).",Lu="Biennale Yellow — parchment #E9E5DB, sun #F1EE2E, indigo #1B2566, Instrument Serif + Archivo (frontend-slides biennale-yellow).",Ru="MIT",Wu="Timur Isachenko",Gu={bg:"#E9E5DB",bg2:"#DCD6C4",text:"#1B2566",muted:"#4A5480",accent:"#F1EE2E",accent2:"#E26B4A",cardBg:"rgba(255,255,255,0.35)",border:"rgba(27,37,102,0.22)"},Uu={headingFont:"'Instrument Serif', Georgia, serif",bodyFont:"'Archivo', system-ui, sans-serif",headingWeight:400,googleFonts:["Instrument+Serif:ital@0;1","Archivo:wght@400;500;600","JetBrains+Mono:wght@400"]},Hu={radius:"0px",slideWidth:"1280px"},n5={name:Du,version:Ou,extends:"default-tech",description:Bu,vibe:Lu,license:Ru,author:Wu,roles:Gu,typography:Uu,geometry:Hu},t5=Object.freeze(Object.defineProperty({__proto__:null,author:Wu,default:n5,description:Bu,geometry:Hu,license:Ru,name:Du,roles:Gu,typography:Uu,version:Ou,vibe:Lu},Symbol.toStringTag,{value:"Module"})),Vu="block-frame",qu="1.0.0",Qu="BlockFrame — neobrutalist pastel-neon blocks, 4px ink borders, hard offset shadows (frontend-slides bold-template-pack).",Yu="BlockFrame — offwhite #FFFDF5, pink/blue/green/yellow pastels, Inter 900 + Space Grotesk (frontend-slides block-frame).",Ku="MIT",Ju="Timur Isachenko",Xu={bg:"#FFFDF5",bg2:"#FFDC8B",text:"#000000",muted:"#444444",accent:"#FE90E8",accent2:"#99E885",cardBg:"#FFFFFF",border:"#000000"},Zu={headingFont:"'Inter', system-ui, sans-serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:900,googleFonts:["Inter:wght@500;700;800;900","Space+Grotesk:wght@500;600;700"]},ep={radius:"0px",slideWidth:"1280px"},r5={name:Vu,version:qu,extends:"default-tech",description:Qu,vibe:Yu,license:Ku,author:Ju,roles:Xu,typography:Zu,geometry:ep},a5=Object.freeze(Object.defineProperty({__proto__:null,author:Ju,default:r5,description:Qu,geometry:ep,license:Ku,name:Vu,roles:Xu,typography:Zu,version:qu,vibe:Yu},Symbol.toStringTag,{value:"Module"})),np="blue-professional",tp="1.0.0",rp="Blue Professional — cream paper + electric cobalt #1E2BFA (frontend-slides bold-template-pack).",ap="Blue Professional — cream #FDFAE7 + cobalt #1E2BFA, Space Grotesk + Inter (frontend-slides blue-professional).",op="MIT",ip="Timur Isachenko",sp={bg:"#FDFAE7",bg2:"#F5F2DC",text:"#111111",muted:"#5c5c5c",accent:"#1E2BFA",accent2:"#059669",cardBg:"rgba(30,43,250,0.04)",border:"rgba(30,43,250,0.2)"},lp={headingFont:"'Space Grotesk', sans-serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:700,googleFonts:["Space+Grotesk:wght@500;600;700","Inter:wght@400;500;600"]},cp={radius:"12px",slideWidth:"1280px"},o5={name:np,version:tp,extends:"default-tech",description:rp,vibe:ap,license:op,author:ip,roles:sp,typography:lp,geometry:cp},i5=Object.freeze(Object.defineProperty({__proto__:null,author:ip,default:o5,description:rp,geometry:cp,license:op,name:np,roles:sp,typography:lp,version:tp,vibe:ap},Symbol.toStringTag,{value:"Module"})),dp="blueprint",up="0.1.0",pp="Engineering blueprint — deep navy, cyan lines, Space Mono / Space Grotesk.",fp="Blueprint — #0a1f3d navy, cyan #00e5ff grid (matches Apsis Mission gallery).",gp="MIT",hp="Timur Isachenko",mp={bg:"#0a1f3d",bg2:"#0d2548",text:"#e8f4ff",muted:"#88b1ce",accent:"#00e5ff",accent2:"#ffffff",cardBg:"rgba(0,229,255,0.06)",border:"rgba(0,229,255,0.28)"},bp={headingFont:"'Space Grotesk', system-ui, sans-serif",bodyFont:"'Space Mono', monospace",headingWeight:700,googleFonts:["Space+Grotesk:wght@500;700","Space+Mono:wght@400;700","IBM+Plex+Mono:wght@500"]},vp={radius:"2px",slideWidth:"1280px"},s5={name:dp,version:up,extends:"default-tech",description:pp,vibe:fp,license:gp,author:hp,roles:mp,typography:bp,geometry:vp},l5=Object.freeze(Object.defineProperty({__proto__:null,author:hp,default:s5,description:pp,geometry:vp,license:gp,name:dp,roles:mp,typography:bp,version:up,vibe:fp},Symbol.toStringTag,{value:"Module"})),yp="bold-poster",xp="1.0.0",kp="Bold Poster — Shrikhand display, Libre Baskerville body, tomato red accent (frontend-slides / beautiful-html-templates).",wp="Bold Poster — white canvas, ink #1C1410, tomato #D8000F, Shrikhand + Libre Baskerville (frontend-slides bold-poster).",_p="MIT",Sp="Timur Isachenko",$p={bg:"#FFFFFF",bg2:"#F5F2EF",text:"#1C1410",muted:"#655950",accent:"#D8000F",accent2:"#1C1410",cardBg:"#F5F2EF",border:"rgba(28,20,16,0.85)"},Fp={headingFont:"'Shrikhand', cursive",bodyFont:"'Libre Baskerville', Georgia, serif",headingWeight:400,googleFonts:["Shrikhand","Libre+Baskerville:wght@400;700","Space+Grotesk:wght@500;600"]},Ep={radius:"0px",slideWidth:"1280px"},c5={name:yp,version:xp,extends:"default-tech",description:kp,vibe:wp,license:_p,author:Sp,roles:$p,typography:Fp,geometry:Ep},d5=Object.freeze(Object.defineProperty({__proto__:null,author:Sp,default:c5,description:kp,geometry:Ep,license:_p,name:yp,roles:$p,typography:Fp,version:xp,vibe:wp},Symbol.toStringTag,{value:"Module"})),Cp="bold-signal",jp="1.0.0",Tp="Bold Signal — Archivo Black on dark gradient with vibrant orange card focal (frontend-slides STYLE_PRESETS).",Pp="Bold Signal — #1a1a1a dark, orange card #FF5722, Archivo Black + Space Grotesk (frontend-slides Bold Signal).",Mp="MIT",Np="Timur Isachenko",zp={bg:"#1a1a1a",bg2:"#2d2d2d",text:"#ffffff",muted:"#b0b0b0",accent:"#FF5722",accent2:"#FF8A65",cardBg:"#43251b",border:"rgba(255,255,255,0.12)"},Ap={headingFont:"'Archivo Black', system-ui, sans-serif",bodyFont:"'Space Grotesk', system-ui, sans-serif",headingWeight:400,googleFonts:["Archivo+Black","Space+Grotesk:wght@400;500;600"]},Ip={radius:"16px",slideWidth:"1280px"},u5={name:Cp,version:jp,extends:"default-tech",description:Tp,vibe:Pp,license:Mp,author:Np,roles:zp,typography:Ap,geometry:Ip},p5=Object.freeze(Object.defineProperty({__proto__:null,author:Np,default:u5,description:Tp,geometry:Ip,license:Mp,name:Cp,roles:zp,typography:Ap,version:jp,vibe:Pp},Symbol.toStringTag,{value:"Module"})),Dp="botanical-luxe",Op="0.1.0",Bp="Botanical luxe — deep forest green, gold leaf, serif elegance for impact reports.",Lp="Botanical luxe — forest #1d3a2f, gold #bfa55a, Cormorant + DM Sans (matches Verdant gallery).",Rp="MIT",Wp="Timur Isachenko",Gp={bg:"#1d3a2f",bg2:"#162d24",text:"#f3efe4",muted:"#a3c3ad",accent:"#bfa55a",accent2:"#4a7c59",cardBg:"rgba(191,165,90,0.08)",border:"rgba(191,165,90,0.28)"},Up={headingFont:"'Cormorant Garamond', Georgia, serif",bodyFont:"'DM Sans', system-ui, sans-serif",headingWeight:600,googleFonts:["Cormorant+Garamond:wght@500;600;700","DM+Sans:wght@400;600"]},Hp={radius:"8px",slideWidth:"1280px"},f5={name:Dp,version:Op,extends:"default-tech",description:Bp,vibe:Lp,license:Rp,author:Wp,roles:Gp,typography:Up,geometry:Hp},g5=Object.freeze(Object.defineProperty({__proto__:null,author:Wp,default:f5,description:Bp,geometry:Hp,license:Rp,name:Dp,roles:Gp,typography:Up,version:Op,vibe:Lp},Symbol.toStringTag,{value:"Module"})),Vp="broadsheet",qp="0.1.0",Qp="Newspaper broadsheet — warm newsprint, deep ink, Pirata One masthead + Playfair.",Yp="Broadsheet — #f2ece0 newsprint, ink #1a1208, Pirata One masthead (matches Daily Ledger gallery).",Kp="MIT",Jp="Timur Isachenko",Xp={bg:"#f2ece0",bg2:"#e8dfc8",text:"#1a1208",muted:"#5a4c3e",accent:"#1a1208",accent2:"#5c4d38",cardBg:"rgba(26,18,8,0.04)",border:"rgba(26,18,8,0.18)"},Zp={headingFont:"'Playfair Display', Georgia, serif",bodyFont:"'Lora', Georgia, serif",headingWeight:700,googleFonts:["Pirata+One","Playfair+Display:wght@500;700","Lora:wght@400;600"]},ef={radius:"0px",slideWidth:"1280px"},h5={name:Vp,version:qp,extends:"default-tech",description:Qp,vibe:Yp,license:Kp,author:Jp,roles:Xp,typography:Zp,geometry:ef},m5=Object.freeze(Object.defineProperty({__proto__:null,author:Jp,default:h5,description:Qp,geometry:ef,license:Kp,name:Vp,roles:Xp,typography:Zp,version:qp,vibe:Yp},Symbol.toStringTag,{value:"Module"})),nf="broadside",tf="1.0.0",rf="Broadside — dark editorial canvas with fire-orange accent and massive Barlow type (frontend-slides).",af="Broadside — ink #111111, fire orange #E85D26, cream #F0ECE5, Barlow 900 + IBM Plex Mono (frontend-slides broadside).",of="MIT",sf="Timur Isachenko",lf={bg:"#111111",bg2:"#1A1A18",text:"#F0ECE5",muted:"#8d8d85",accent:"#E85D26",accent2:"#F0ECE5",cardBg:"rgba(232,93,38,0.12)",border:"rgba(40,40,38,1)"},cf={headingFont:"'Barlow', system-ui, sans-serif",bodyFont:"'Barlow', system-ui, sans-serif",headingWeight:900,googleFonts:["Barlow:wght@400;700;900","IBM+Plex+Mono:wght@400;500"]},df={radius:"0px",slideWidth:"1280px"},b5={name:nf,version:tf,extends:"default-tech",description:rf,vibe:af,license:of,author:sf,roles:lf,typography:cf,geometry:df},v5=Object.freeze(Object.defineProperty({__proto__:null,author:sf,default:b5,description:rf,geometry:df,license:of,name:nf,roles:lf,typography:cf,version:tf,vibe:af},Symbol.toStringTag,{value:"Module"})),uf="brutalist-acid",pf="0.1.0",ff="Dark acid brutalist — near-black concrete, #d6ff00 hazard lime, hard mono edges.",gf="Acid brutalist — #1c1c1c, electric lime, Space Mono + Barlow Condensed (matches MONOLITH gallery).",hf="MIT",mf="Timur Isachenko",bf={bg:"#1c1c1c",bg2:"#2a2a2a",text:"#e8e6e1",muted:"#b1b1b1",accent:"#d6ff00",accent2:"#ffffff",cardBg:"rgba(214,255,0,0.06)",border:"rgba(214,255,0,0.35)"},vf={headingFont:"'Space Mono', monospace",bodyFont:"'Barlow Condensed', system-ui, sans-serif",headingWeight:700,googleFonts:["Space+Mono:wght@400;700","Barlow+Condensed:wght@500;700"]},yf={radius:"0px",slideWidth:"1280px"},y5={name:uf,version:pf,extends:"default-tech",description:ff,vibe:gf,license:hf,author:mf,roles:bf,typography:vf,geometry:yf},x5=Object.freeze(Object.defineProperty({__proto__:null,author:mf,default:y5,description:ff,geometry:yf,license:hf,name:uf,roles:bf,typography:vf,version:pf,vibe:gf},Symbol.toStringTag,{value:"Module"})),xf="brutalist-mono",kf="0.1.0",wf="Raw brutalist theme with concrete-grey background, monospace type, hard square corners, and a single hazard-orange accent.",_f="Raw brutalist / technical — concrete off-white bg, near-black monospace ink, hazard-orange accent, thick black hairlines, zero radius.",Sf="MIT",$f="Timur Isachenko",Ff={bg:"#f0efe9",bg2:"#e3e1d8",text:"#0a0a0a",muted:"#57554c",accent:"#ff3600",accent2:"#0a0a0a",cardBg:"#ffffff",border:"rgba(10,10,10,0.85)"},Ef={headingFont:"'IBM Plex Mono', 'Courier New', monospace",bodyFont:"'IBM Plex Mono', 'Courier New', monospace",headingWeight:700,googleFonts:["IBM+Plex+Mono:wght@400;600;700"]},Cf={radius:"0px",slideWidth:"1280px"},k5={name:xf,version:kf,extends:"default-tech",description:wf,vibe:_f,license:Sf,author:$f,roles:Ff,typography:Ef,geometry:Cf},w5=Object.freeze(Object.defineProperty({__proto__:null,author:$f,default:k5,description:wf,geometry:Cf,license:Sf,name:xf,roles:Ff,typography:Ef,version:kf,vibe:_f},Symbol.toStringTag,{value:"Module"})),jf="candy-pop",Tf="0.1.0",Pf="Candy pop — cream canvas, hot pink + butter yellow, soft blobs, rounded type.",Mf="Candy pop — cream canvas, hot pink + jellybean blue, Fredoka + Poppins (matches Jellybean gallery).",Nf="MIT",zf="Timur Isachenko",Af={bg:"#fdf3e7",bg2:"#f7e8d4",text:"#1a1a2e",muted:"#6a5c6f",accent:"#ff5d8f",accent2:"#2d7dd2",cardBg:"rgba(255,93,143,0.08)",border:"rgba(26,26,46,0.14)"},If={headingFont:"'Fredoka', system-ui, sans-serif",bodyFont:"'Poppins', system-ui, sans-serif",headingWeight:700,googleFonts:["Fredoka:wght@500;700","Poppins:wght@400;600"]},Df={radius:"28px",slideWidth:"1280px"},_5={name:jf,version:Tf,extends:"default-tech",description:Pf,vibe:Mf,license:Nf,author:zf,roles:Af,typography:If,geometry:Df},S5=Object.freeze(Object.defineProperty({__proto__:null,author:zf,default:_5,description:Pf,geometry:Df,license:Nf,name:jf,roles:Af,typography:If,version:Tf,vibe:Mf},Symbol.toStringTag,{value:"Module"})),Of="capsule",Bf="1.0.0",Lf="Capsule — modular pill cards on warm bone, Bodoni Moda + Space Grotesk candy palette (frontend-slides bold-template-pack).",Rf="Capsule — cream #F5F5F0, coral/lime/lavender/sky pops, Bodoni Moda + Space Grotesk pills (frontend-slides capsule).",Wf="MIT",Gf="Timur Isachenko",Uf={bg:"#F5F5F0",bg2:"#FFFFFF",text:"#1A1A1A",muted:"#5A5A5A",accent:"#E85D4E",accent2:"#C4D94E",cardBg:"#FFFFFF",border:"#1E1E1E"},Hf={headingFont:"'Bodoni Moda', Georgia, serif",bodyFont:"'Space Grotesk', system-ui, sans-serif",headingWeight:700,googleFonts:["Bodoni+Moda:opsz,wght@6..96,400;700;800","Space+Grotesk:wght@400;500;600;700"]},Vf={radius:"9999px",slideWidth:"1280px"},$5={name:Of,version:Bf,extends:"default-tech",description:Lf,vibe:Rf,license:Wf,author:Gf,roles:Uf,typography:Hf,geometry:Vf},F5=Object.freeze(Object.defineProperty({__proto__:null,author:Gf,default:$5,description:Lf,geometry:Vf,license:Wf,name:Of,roles:Uf,typography:Hf,version:Bf,vibe:Rf},Symbol.toStringTag,{value:"Module"})),qf="cartesian",Qf="1.0.0",Yf="Cartesian — warm stone + Playfair, 1px taupe draft lines (frontend-slides bold-template-pack).",Kf="Cartesian — sandstone #EDE8E0, Playfair + Inter, taupe hairlines (frontend-slides cartesian).",Jf="MIT",Xf="Timur Isachenko",Zf={bg:"#EDE8E0",bg2:"#E2DBD1",text:"#1A1A1A",muted:"#5A5A5A",accent:"#8A8178",accent2:"#B8B0A4",cardBg:"#E2DBD1",border:"#B8B0A4"},eg={headingFont:"'Playfair Display', Georgia, serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:400,googleFonts:["Playfair+Display:wght@400;500;600","Inter:wght@400;500;600"]},ng={radius:"0px",slideWidth:"1280px"},E5={name:qf,version:Qf,extends:"default-tech",description:Yf,vibe:Kf,license:Jf,author:Xf,roles:Zf,typography:eg,geometry:ng},C5=Object.freeze(Object.defineProperty({__proto__:null,author:Xf,default:E5,description:Yf,geometry:ng,license:Jf,name:qf,roles:Zf,typography:eg,version:Qf,vibe:Kf},Symbol.toStringTag,{value:"Module"})),tg="cobalt-grid",rg="1.0.0",ag="Cobalt Grid — graph-paper canvas, electric cobalt Newsreader, stair-step panels (frontend-slides bold-template-pack).",og="Cobalt Grid — paper #F0EBDE, cobalt #1F2BE0, Newsreader + Hanken Grotesk (frontend-slides cobalt-grid).",ig="MIT",sg="Timur Isachenko",lg={bg:"#F0EBDE",bg2:"#E6E0CE",text:"#1F2BE0",muted:"#2937df",accent:"#1F2BE0",accent2:"#1F2BE0",cardBg:"rgba(255,255,255,0.55)",border:"rgba(31,43,224,0.18)"},cg={headingFont:"'Newsreader', Georgia, serif",bodyFont:"'Hanken Grotesk', system-ui, sans-serif",headingWeight:600,googleFonts:["Newsreader:opsz,wght@6..72,400;500;600;700","Hanken+Grotesk:wght@400;500;600;700","DM+Mono:wght@400;500"]},dg={radius:"0px",slideWidth:"1280px"},j5={name:tg,version:rg,extends:"default-tech",description:ag,vibe:og,license:ig,author:sg,roles:lg,typography:cg,geometry:dg},T5=Object.freeze(Object.defineProperty({__proto__:null,author:sg,default:j5,description:ag,geometry:dg,license:ig,name:tg,roles:lg,typography:cg,version:rg,vibe:og},Symbol.toStringTag,{value:"Module"})),ug="coral",pg="1.0.0",fg="Coral — cream/coral/ink planes, Bebas Neue caps, 45° hatch (frontend-slides bold-template-pack).",gg="Coral — cream #F5F0E8 + coral #E85D5D on ink #1A1A1A, Bebas Neue + Inter (frontend-slides coral).",hg="MIT",mg="Timur Isachenko",bg={bg:"#F5F0E8",bg2:"#E85D5D",text:"#1A1A1A",muted:"#616161",accent:"#E85D5D",accent2:"#1A1A1A",cardBg:"#FFFFFF",border:"rgba(26,26,26,0.85)"},vg={headingFont:"'Bebas Neue', sans-serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:400,googleFonts:["Bebas+Neue","Inter:wght@300;400;500;600"]},yg={radius:"0px",slideWidth:"1280px"},P5={name:ug,version:pg,extends:"default-tech",description:fg,vibe:gg,license:hg,author:mg,roles:bg,typography:vg,geometry:yg},M5=Object.freeze(Object.defineProperty({__proto__:null,author:mg,default:P5,description:fg,geometry:yg,license:hg,name:ug,roles:bg,typography:vg,version:pg,vibe:gg},Symbol.toStringTag,{value:"Module"})),xg="corporate",kg="0.1.0",wg="Formal corporate presentation theme with crisp white background and restrained navy/blue palette.",_g="Formal corporate — crisp white, navy text, single restrained blue accent, clean sans-serif, thin rules, minimal shadow.",Sg="MIT",$g="Timur Isachenko",Fg={bg:"#ffffff",bg2:"#f8f9fc",text:"#1a2035",muted:"#5d636f",accent:"#1d4ed8",accent2:"#0369a1",cardBg:"#f1f5f9",border:"rgba(0,0,0,0.08)"},Eg={headingFont:"'Inter', system-ui, sans-serif",bodyFont:"'Source Sans 3', system-ui, sans-serif",headingWeight:700,googleFonts:["Inter:wght@400;700","Source+Sans+3:wght@400;600"]},Cg={radius:"8px",slideWidth:"1280px"},N5={name:xg,version:kg,extends:"default-tech",description:wg,vibe:_g,license:Sg,author:$g,roles:Fg,typography:Eg,geometry:Cg},z5=Object.freeze(Object.defineProperty({__proto__:null,author:$g,default:N5,description:wg,geometry:Cg,license:Sg,name:xg,roles:Fg,typography:Eg,version:kg,vibe:_g},Symbol.toStringTag,{value:"Module"})),jg="creative-mode",Tg="1.0.0",Pg="Creative Mode — cream canvas, hard ink borders, forest/pink/orange/yellow blocks, Archivo Black (frontend-slides).",Mg="Creative Mode — cream #EFE9D9, ink #0F0F0F, green #1F8A4C + pink #F06CA8, Archivo Black + Space Grotesk (frontend-slides creative-mode).",Ng="MIT",zg="Timur Isachenko",Ag={bg:"#EFE9D9",bg2:"#E4DCC4",text:"#0F0F0F",muted:"#2A2A2A",accent:"#E85A1F",accent2:"#F06CA8",cardBg:"#F5C518",border:"rgba(15,15,15,0.95)"},Ig={headingFont:"'Archivo Black', system-ui, sans-serif",bodyFont:"'Space Grotesk', system-ui, sans-serif",headingWeight:400,googleFonts:["Archivo+Black","Space+Grotesk:wght@400;600","JetBrains+Mono:wght@400;500"]},Dg={radius:"0px",slideWidth:"1280px"},A5={name:jg,version:Tg,extends:"default-tech",description:Pg,vibe:Mg,license:Ng,author:zg,roles:Ag,typography:Ig,geometry:Dg},I5=Object.freeze(Object.defineProperty({__proto__:null,author:zg,default:A5,description:Pg,geometry:Dg,license:Ng,name:jg,roles:Ag,typography:Ig,version:Tg,vibe:Mg},Symbol.toStringTag,{value:"Module"})),Og="creative-voltage",Bg="1.0.0",Lg="Creative Voltage — electric blue + neon yellow, Syne + Space Mono (frontend-slides STYLE_PRESETS).",Rg="Creative Voltage — electric blue #0066ff, dark #1a1a2e, neon #d4ff00, Syne + Space Mono (frontend-slides Creative Voltage).",Wg="MIT",Gg="Timur Isachenko",Ug={bg:"#0066ff",bg2:"#1a1a2e",text:"#ffffff",muted:"#ffffff",accent:"#d4ff00",accent2:"#ffffff",cardBg:"#1a1a2e",border:"rgba(212,255,0,0.55)"},Hg={headingFont:"'Syne', system-ui, sans-serif",bodyFont:"'Space Mono', monospace",headingWeight:800,googleFonts:["Syne:wght@700;800","Space+Mono:wght@400;700"]},Vg={radius:"0px",slideWidth:"1280px"},D5={name:Og,version:Bg,extends:"default-tech",description:Lg,vibe:Rg,license:Wg,author:Gg,roles:Ug,typography:Hg,geometry:Vg},O5=Object.freeze(Object.defineProperty({__proto__:null,author:Gg,default:D5,description:Lg,geometry:Vg,license:Wg,name:Og,roles:Ug,typography:Hg,version:Bg,vibe:Rg},Symbol.toStringTag,{value:"Module"})),qg="crt-terminal",Qg="0.1.0",Yg="CRT phosphor terminal — near-black, acid green glow, cyan accents, monospace.",Kg="CRT terminal — void bg, cream type, phosphor green + cyan accents (matches RetroNet gallery).",Jg="MIT",Xg="Timur Isachenko",Zg={bg:"#06040a",bg2:"#1a1010",text:"#f5f0e8",muted:"#989488",accent:"#39ff14",accent2:"#00f5ff",cardBg:"rgba(57,255,20,0.06)",border:"rgba(57,255,20,0.28)"},eh={headingFont:"'VT323', monospace",bodyFont:"'Share Tech Mono', monospace",headingWeight:400,googleFonts:["VT323","Share+Tech+Mono","Courier+Prime"]},nh={radius:"0px",slideWidth:"1280px"},B5={name:qg,version:Qg,extends:"default-tech",description:Yg,vibe:Kg,license:Jg,author:Xg,roles:Zg,typography:eh,geometry:nh},L5=Object.freeze(Object.defineProperty({__proto__:null,author:Xg,default:B5,description:Yg,geometry:nh,license:Jg,name:qg,roles:Zg,typography:eh,version:Qg,vibe:Kg},Symbol.toStringTag,{value:"Module"})),th="daisy-days",rh="1.0.0",ah="Daisy Days — cream pastels, Fredoka One, hard charcoal outlines (frontend-slides bold-template-pack).",oh="Daisy Days — cream #F5F0E6 + turquoise/pink/butter, Fredoka One + Quicksand (frontend-slides daisy-days).",ih="MIT",sh="Timur Isachenko",lh={bg:"#F5F0E6",bg2:"#FFFDF8",text:"#2D2D2D",muted:"#666666",accent:"#7ECDC0",accent2:"#F7C8D4",cardBg:"#FFFFFF",border:"#2D2D2D"},ch={headingFont:"'Fredoka One', cursive",bodyFont:"'Quicksand', system-ui, sans-serif",headingWeight:400,googleFonts:["Fredoka+One","Quicksand:wght@500;600;700"]},dh={radius:"20px",slideWidth:"1280px"},R5={name:th,version:rh,extends:"default-tech",description:ah,vibe:oh,license:ih,author:sh,roles:lh,typography:ch,geometry:dh},W5=Object.freeze(Object.defineProperty({__proto__:null,author:sh,default:R5,description:ah,geometry:dh,license:ih,name:th,roles:lh,typography:ch,version:rh,vibe:oh},Symbol.toStringTag,{value:"Module"})),uh="dark-botanical",ph="1.0.0",fh="Dark Botanical — Cormorant on near-black with warm pink/gold accents (frontend-slides STYLE_PRESETS).",gh="Dark Botanical — #0f0f0f void, warm #d4a574/#e8b4b8 accents, Cormorant + IBM Plex Sans (frontend-slides Dark Botanical).",hh="MIT",mh="Timur Isachenko",bh={bg:"#0f0f0f",bg2:"#1a1816",text:"#e8e4df",muted:"#9a9590",accent:"#d4a574",accent2:"#e8b4b8",cardBg:"rgba(232,228,223,0.06)",border:"rgba(232,228,223,0.12)"},vh={headingFont:"'Cormorant', Georgia, serif",bodyFont:"'IBM Plex Sans', system-ui, sans-serif",headingWeight:600,googleFonts:["Cormorant:ital,wght@0,400;0,600;1,400;1,600","IBM+Plex+Sans:wght@300;400"]},yh={radius:"0px",slideWidth:"1280px"},G5={name:uh,version:ph,extends:"default-tech",description:fh,vibe:gh,license:hh,author:mh,roles:bh,typography:vh,geometry:yh},U5=Object.freeze(Object.defineProperty({__proto__:null,author:mh,default:G5,description:fh,geometry:yh,license:hh,name:uh,roles:bh,typography:vh,version:ph,vibe:gh},Symbol.toStringTag,{value:"Module"})),xh="data-editorial",kh="0.1.0",wh="Data editorial — white report field, navy + chart red, Source Serif + Inter.",_h="Data editorial — white/#1a1a1a, navy #2b6cb0 + signal #e63946 (matches Signalbox gallery).",Sh="MIT",$h="Timur Isachenko",Fh={bg:"#ffffff",bg2:"#f5f5f5",text:"#1a1a1a",muted:"#616161",accent:"#2b6cb0",accent2:"#e63946",cardBg:"rgba(26,26,26,0.03)",border:"rgba(26,26,26,0.12)"},Eh={headingFont:"'Source Serif 4', Georgia, serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:700,googleFonts:["Source+Serif+4:wght@600;700","Inter:wght@400;600"]},Ch={radius:"4px",slideWidth:"1280px"},H5={name:xh,version:kh,extends:"default-tech",description:wh,vibe:_h,license:Sh,author:$h,roles:Fh,typography:Eh,geometry:Ch},V5=Object.freeze(Object.defineProperty({__proto__:null,author:$h,default:H5,description:wh,geometry:Ch,license:Sh,name:xh,roles:Fh,typography:Eh,version:kh,vibe:_h},Symbol.toStringTag,{value:"Module"})),jh="developer-dark",Th="0.1.0",Ph="Developer dark — GitHub-night canvas, green success, blue links, JetBrains Mono.",Mh="Developer dark — #0d1117, #3fb950 + #58a6ff, JetBrains Mono + Inter (matches Forge gallery).",Nh="MIT",zh="Timur Isachenko",Ah={bg:"#0d1117",bg2:"#161b22",text:"#e6edf3",muted:"#8b949e",accent:"#3fb950",accent2:"#58a6ff",cardBg:"rgba(48,54,61,0.55)",border:"rgba(48,54,61,0.9)"},Ih={headingFont:"'Inter', system-ui, sans-serif",bodyFont:"'JetBrains Mono', monospace",headingWeight:700,googleFonts:["Inter:wght@600;700","JetBrains+Mono:wght@400;600"]},Dh={radius:"8px",slideWidth:"1280px"},q5={name:jh,version:Th,extends:"default-tech",description:Ph,vibe:Mh,license:Nh,author:zh,roles:Ah,typography:Ih,geometry:Dh},Q5=Object.freeze(Object.defineProperty({__proto__:null,author:zh,default:q5,description:Ph,geometry:Dh,license:Nh,name:jh,roles:Ah,typography:Ih,version:Th,vibe:Mh},Symbol.toStringTag,{value:"Module"})),Oh="editorial-forest",Bh="1.0.0",Lh="Editorial Forest — Source Serif 4 on oat-cream with forest green and dusty rose (frontend-slides).",Rh="Editorial Forest — cream #efe7d4, forest #2e4a2a + dusty rose #e89cb1, Source Serif 4 + JetBrains Mono (frontend-slides editorial-forest).",Wh="MIT",Gh="Timur Isachenko",Uh={bg:"#efe7d4",bg2:"#e6dcc4",text:"#1a1a17",muted:"#555049",accent:"#2e4a2a",accent2:"#e89cb1",cardBg:"rgba(46,74,42,0.06)",border:"rgba(26,26,23,0.16)"},Hh={headingFont:"'Source Serif 4', 'Source Serif Pro', Georgia, serif",bodyFont:"'Source Serif 4', Georgia, serif",headingWeight:500,googleFonts:["Source+Serif+4:opsz,wght@8..60,500;8..60,600","JetBrains+Mono:wght@400;500"]},Vh={radius:"4px",slideWidth:"1280px"},Y5={name:Oh,version:Bh,extends:"default-tech",description:Lh,vibe:Rh,license:Wh,author:Gh,roles:Uh,typography:Hh,geometry:Vh},K5=Object.freeze(Object.defineProperty({__proto__:null,author:Gh,default:Y5,description:Lh,geometry:Vh,license:Wh,name:Oh,roles:Uh,typography:Hh,version:Bh,vibe:Rh},Symbol.toStringTag,{value:"Module"})),qh="editorial-serif",Qh="0.1.0",Yh="Magazine-editorial theme with warm paper background, ink-black serif text, and a single masthead-crimson accent.",Kh="Print magazine editorial — warm cream paper, near-black serif ink, crimson masthead accent, thin hairline rules, square corners.",Jh="MIT",Xh="Timur Isachenko",Zh={bg:"#faf7f2",bg2:"#f2ede3",text:"#1c1a17",muted:"#5c574c",accent:"#9c1c1c",accent2:"#a67c1e",cardBg:"#f2ede3",border:"rgba(28,26,23,0.12)"},e0={headingFont:"'Playfair Display', Georgia, serif",bodyFont:"'Source Serif 4', Georgia, serif",headingWeight:700,googleFonts:["Playfair+Display:wght@700;900","Source+Serif+4:wght@400;600"]},n0={radius:"2px",slideWidth:"1280px"},J5={name:qh,version:Qh,extends:"default-tech",description:Yh,vibe:Kh,license:Jh,author:Xh,roles:Zh,typography:e0,geometry:n0},X5=Object.freeze(Object.defineProperty({__proto__:null,author:Xh,default:J5,description:Yh,geometry:n0,license:Jh,name:qh,roles:Zh,typography:e0,version:Qh,vibe:Kh},Symbol.toStringTag,{value:"Module"})),t0="editorial-tri-tone",r0="1.0.0",a0="Editorial Tri-Tone — blush pink, golden butter, burgundy wine; Bricolage Grotesque + Instrument Serif (frontend-slides).",o0="Editorial Tri-Tone — pink #F2B6C6, butter #F2D86A, burgundy #7A1F35, Bricolage Grotesque + Instrument Serif (frontend-slides editorial-tri-tone).",i0="MIT",s0="Timur Isachenko",l0={bg:"#F2B6C6",bg2:"#F2D86A",text:"#7A1F35",muted:"#61313d",accent:"#7A1F35",accent2:"#F2D86A",cardBg:"rgba(242,216,106,0.55)",border:"rgba(122,31,53,0.35)"},c0={headingFont:"'Bricolage Grotesque', system-ui, sans-serif",bodyFont:"'Instrument Serif', Georgia, serif",headingWeight:800,googleFonts:["Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800","Instrument+Serif:ital@0;1","JetBrains+Mono:wght@400;500"]},d0={radius:"0px",slideWidth:"1280px"},Z5={name:t0,version:r0,extends:"default-tech",description:a0,vibe:o0,license:i0,author:s0,roles:l0,typography:c0,geometry:d0},e4=Object.freeze(Object.defineProperty({__proto__:null,author:s0,default:Z5,description:a0,geometry:d0,license:i0,name:t0,roles:l0,typography:c0,version:r0,vibe:o0},Symbol.toStringTag,{value:"Module"})),u0="electric-studio",p0="1.0.0",f0="Electric Studio — split white/blue panels, Manrope, accent bar (frontend-slides STYLE_PRESETS).",g0="Electric Studio — white + #4361ee blue split, Manrope 800, white lead on blue panel (frontend-slides Electric Studio).",h0="MIT",m0="Timur Isachenko",b0={bg:"#ffffff",bg2:"#4361ee",text:"#0a0a0a",muted:"#5a5a5a",accent:"#4361ee",accent2:"#ffffff",cardBg:"rgba(67,97,238,0.08)",border:"rgba(10,10,10,0.12)"},v0={headingFont:"'Manrope', system-ui, sans-serif",bodyFont:"'Manrope', system-ui, sans-serif",headingWeight:800,googleFonts:["Manrope:wght@400;500;800"]},y0={radius:"0px",slideWidth:"1280px"},n4={name:u0,version:p0,extends:"default-tech",description:f0,vibe:g0,license:h0,author:m0,roles:b0,typography:v0,geometry:y0},t4=Object.freeze(Object.defineProperty({__proto__:null,author:m0,default:n4,description:f0,geometry:y0,license:h0,name:u0,roles:b0,typography:v0,version:p0,vibe:g0},Symbol.toStringTag,{value:"Module"})),x0="emerald-editorial",k0="1.0.0",w0="Emerald Editorial — saturated emerald canvas, navy ink, oat paper, Bodoni Moda (frontend-slides bold-template-pack).",_0="Emerald Editorial — emerald #3CD896, navy #0F1A5C, paper #F1E9D6, Bodoni Moda + Manrope (frontend-slides emerald-editorial).",S0="MIT",$0="Timur Isachenko",F0={bg:"#3CD896",bg2:"#2DC684",text:"#0F1A5C",muted:"#2a3168",accent:"#0F1A5C",accent2:"#F1E9D6",cardBg:"#F1E9D6",border:"rgba(15,26,92,0.85)"},E0={headingFont:"'Bodoni Moda', Georgia, serif",bodyFont:"'Manrope', system-ui, sans-serif",headingWeight:900,googleFonts:["Bodoni+Moda:opsz,wght@6..96,400;700;800;900","Manrope:wght@400;500;600;700"]},C0={radius:"0px",slideWidth:"1280px"},r4={name:x0,version:k0,extends:"default-tech",description:w0,vibe:_0,license:S0,author:$0,roles:F0,typography:E0,geometry:C0},a4=Object.freeze(Object.defineProperty({__proto__:null,author:$0,default:r4,description:w0,geometry:C0,license:S0,name:x0,roles:F0,typography:E0,version:k0,vibe:_0},Symbol.toStringTag,{value:"Module"})),j0="fintech-clean",T0="0.1.0",P0="Fintech clean — near-white, Stripe-like violet accent, mint success, Inter.",M0="Fintech clean — #fbfbfd, violet #635bff + mint #00d4b1, Inter (matches Ledgerline gallery).",N0="MIT",z0="Timur Isachenko",A0={bg:"#fbfbfd",bg2:"#f0eeff",text:"#0a0a0a",muted:"#5d636f",accent:"#635bff",accent2:"#00d4b1",cardBg:"#ffffff",border:"rgba(99,91,255,0.18)"},I0={headingFont:"'Inter', system-ui, sans-serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:700,googleFonts:["Inter:wght@400;600;700"]},D0={radius:"12px",slideWidth:"1280px"},o4={name:j0,version:T0,extends:"default-tech",description:P0,vibe:M0,license:N0,author:z0,roles:A0,typography:I0,geometry:D0},i4=Object.freeze(Object.defineProperty({__proto__:null,author:z0,default:o4,description:P0,geometry:D0,license:N0,name:j0,roles:A0,typography:I0,version:T0,vibe:M0},Symbol.toStringTag,{value:"Module"})),O0="ft-editorial",B0="0.1.0",L0="Financial Times–inspired broadsheet — warm paper, ink, FT blue + signal red.",R0="FT editorial — #f7f5f0 newsprint, Libre Baskerville + IBM Plex, FT blue + signal red (matches Meridian gallery).",W0="MIT",G0="Timur Isachenko",U0={bg:"#f7f5f0",bg2:"#f2efe8",text:"#0a0a0a",muted:"#605b56",accent:"#1a4fd8",accent2:"#c0392b",cardBg:"rgba(10,10,10,0.03)",border:"rgba(10,10,10,0.12)"},H0={headingFont:"'Libre Baskerville', Georgia, serif",bodyFont:"'IBM Plex Sans', system-ui, sans-serif",headingWeight:700,googleFonts:["Libre+Baskerville:wght@400;700","IBM+Plex+Sans:wght@400;600","IBM+Plex+Mono:wght@500"]},V0={radius:"0px",slideWidth:"1280px"},s4={name:O0,version:B0,extends:"default-tech",description:L0,vibe:R0,license:W0,author:G0,roles:U0,typography:H0,geometry:V0},l4=Object.freeze(Object.defineProperty({__proto__:null,author:G0,default:s4,description:L0,geometry:V0,license:W0,name:O0,roles:U0,typography:H0,version:B0,vibe:R0},Symbol.toStringTag,{value:"Module"})),q0="genz-bento",Q0="0.1.0",Y0="Gen-Z hard-shadow bento — hot coral, lime stickers, chunky ink borders.",K0="Gen-Z bento — #fff9f5, coral #ff4d2e + lime #b6f542, Nunito hard shadows (matches Bounce gallery).",J0="MIT",X0="Timur Isachenko",Z0={bg:"#fff9f5",bg2:"#fff3ea",text:"#0f0f1a",muted:"#5c5666",accent:"#ff4d2e",accent2:"#b6f542",cardBg:"#ffffff",border:"#0f0f1a"},em={headingFont:"'Nunito', system-ui, sans-serif",bodyFont:"'Nunito Sans', system-ui, sans-serif",headingWeight:900,googleFonts:["Nunito:wght@700;800;900","Nunito+Sans:wght@400;600"]},nm={radius:"18px",slideWidth:"1280px"},c4={name:q0,version:Q0,extends:"default-tech",description:Y0,vibe:K0,license:J0,author:X0,roles:Z0,typography:em,geometry:nm},d4=Object.freeze(Object.defineProperty({__proto__:null,author:X0,default:c4,description:Y0,geometry:nm,license:J0,name:q0,roles:Z0,typography:em,version:Q0,vibe:K0},Symbol.toStringTag,{value:"Module"})),tm="glassmorphism",rm="0.1.0",am="Soft glassmorphism — icy lavender field, indigo + cyan accents, Plus Jakarta Sans.",om="Glassmorphism — #f8f9ff mist, indigo #5b6af5 + cyan #22d3ee, Plus Jakarta Sans (matches CloudPeak gallery).",im="MIT",sm="Timur Isachenko",lm={bg:"#f8f9ff",bg2:"#f0f3fd",text:"#0f1333",muted:"#5a6285",accent:"#5b6af5",accent2:"#22d3ee",cardBg:"rgba(255,255,255,0.72)",border:"rgba(91,106,245,0.22)"},cm={headingFont:"'Plus Jakarta Sans', system-ui, sans-serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:700,googleFonts:["Plus+Jakarta+Sans:wght@500;700","Inter:wght@400;600"]},dm={radius:"20px",slideWidth:"1280px"},u4={name:tm,version:rm,extends:"default-tech",description:am,vibe:om,license:im,author:sm,roles:lm,typography:cm,geometry:dm},p4=Object.freeze(Object.defineProperty({__proto__:null,author:sm,default:u4,description:am,geometry:dm,license:im,name:tm,roles:lm,typography:cm,version:rm,vibe:om},Symbol.toStringTag,{value:"Module"})),um="grove",pm="1.0.0",fm="Grove — forest green monograph, Playfair 400 + rust accent (frontend-slides bold-template-pack).",gm="Grove — #192B1B forest + #D4CFBF cream + #C8524A rust, Playfair + Jost (frontend-slides grove).",hm="MIT",mm="Timur Isachenko",bm={bg:"#192B1B",bg2:"#1E3221",text:"#D4CFBF",muted:"#989c8d",accent:"#C8524A",accent2:"#E8E4D6",cardBg:"#1E3221",border:"rgba(212,207,191,0.12)"},vm={headingFont:"'Playfair Display', Georgia, serif",bodyFont:"'Jost', system-ui, sans-serif",headingWeight:400,googleFonts:["Playfair+Display:ital,wght@0,400;1,400","Jost:wght@300;400;500","JetBrains+Mono:wght@300"]},ym={radius:"0px",slideWidth:"1280px"},f4={name:um,version:pm,extends:"default-tech",description:fm,vibe:gm,license:hm,author:mm,roles:bm,typography:vm,geometry:ym},g4=Object.freeze(Object.defineProperty({__proto__:null,author:mm,default:f4,description:fm,geometry:ym,license:hm,name:um,roles:bm,typography:vm,version:pm,vibe:gm},Symbol.toStringTag,{value:"Module"})),xm="heritage-editorial",km="0.1.0",wm="Heritage editorial — warm parchment, terracotta blush, Playfair + Cormorant serif.",_m="Heritage editorial — #f4efe9 parchment, terracotta #c98b7a, Playfair Display (matches Atelier No. 9 gallery).",Sm="MIT",$m="Timur Isachenko",Fm={bg:"#f4efe9",bg2:"#ede6dd",text:"#16130f",muted:"#6b5d53",accent:"#c98b7a",accent2:"#a07854",cardBg:"rgba(22,19,15,0.04)",border:"rgba(22,19,15,0.12)"},Em={headingFont:"'Playfair Display', Georgia, serif",bodyFont:"'DM Sans', system-ui, sans-serif",headingWeight:700,googleFonts:["Playfair+Display:wght@500;700","Cormorant+Garamond:wght@500;600","DM+Sans:wght@400;600"]},Cm={radius:"6px",slideWidth:"1280px"},h4={name:xm,version:km,extends:"default-tech",description:wm,vibe:_m,license:Sm,author:$m,roles:Fm,typography:Em,geometry:Cm},m4=Object.freeze(Object.defineProperty({__proto__:null,author:$m,default:h4,description:wm,geometry:Cm,license:Sm,name:xm,roles:Fm,typography:Em,version:km,vibe:_m},Symbol.toStringTag,{value:"Module"})),jm="kinetic-wrapped",Tm="0.1.0",Pm="Kinetic Wrapped — acid lime on black, Archivo Black, year-in-review energy.",Mm="Kinetic Wrapped — black + #c8ff00 acid lime, Archivo Black (matches Pulse gallery).",Nm="MIT",zm="Timur Isachenko",Am={bg:"#0a0a0a",bg2:"#0d0d0d",text:"#ffffff",muted:"#9c9c9c",accent:"#c8ff00",accent2:"#ff00cc",cardBg:"rgba(200,255,0,0.08)",border:"rgba(200,255,0,0.4)"},Im={headingFont:"'Archivo Black', system-ui, sans-serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:400,googleFonts:["Archivo+Black","Inter:wght@400;600"]},Dm={radius:"0px",slideWidth:"1280px"},b4={name:jm,version:Tm,extends:"default-tech",description:Pm,vibe:Mm,license:Nm,author:zm,roles:Am,typography:Im,geometry:Dm},v4=Object.freeze(Object.defineProperty({__proto__:null,author:zm,default:b4,description:Pm,geometry:Dm,license:Nm,name:jm,roles:Am,typography:Im,version:Tm,vibe:Mm},Symbol.toStringTag,{value:"Module"})),Om="long-table",Bm="1.0.0",Lm="Long Table — single-ink rust on cream supper club (frontend-slides bold-template-pack).",Rm="Long Table — cream #FAF1E2 + rust #B53D2A, Bricolage Grotesque + Fraunces (frontend-slides long-table).",Wm="MIT",Gm="Timur Isachenko",Um={bg:"#FAF1E2",bg2:"#F2E5CF",text:"#B53D2A",muted:"#934232",accent:"#B53D2A",accent2:"#8E2D1F",cardBg:"#F2E5CF",border:"rgba(181,61,42,0.5)"},Hm={headingFont:"'Bricolage Grotesque', sans-serif",bodyFont:"'Fraunces', Georgia, serif",headingWeight:800,googleFonts:["Bricolage+Grotesque:wght@700;800","Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,400"]},Vm={radius:"9999px",slideWidth:"1280px"},y4={name:Om,version:Bm,extends:"default-tech",description:Lm,vibe:Rm,license:Wm,author:Gm,roles:Um,typography:Hm,geometry:Vm},x4=Object.freeze(Object.defineProperty({__proto__:null,author:Gm,default:y4,description:Lm,geometry:Vm,license:Wm,name:Om,roles:Um,typography:Hm,version:Bm,vibe:Rm},Symbol.toStringTag,{value:"Module"})),qm="luxury-minimalist",Qm="0.1.0",Ym="Luxury minimalist theme with warm off-white canvas, dark charcoal, hairline borders, and no gradients.",Km="Luxury minimalist — warm off-white canvas, dark charcoal text, near-zero decoration, generous whitespace, thin serif display, hairline borders, no gradients.",Jm="MIT",Xm="Timur Isachenko",Zm={bg:"#faf8f5",bg2:"#f5f2ee",text:"#1c1917",muted:"#635d59",accent:"#92400e",accent2:"#b45309",cardBg:"rgba(28,25,23,0.03)",border:"rgba(28,25,23,0.10)"},eb={headingFont:"'Cormorant Garamond', Georgia, serif",bodyFont:"'DM Sans', system-ui, sans-serif",headingWeight:600,googleFonts:["Cormorant+Garamond:wght@400;600","DM+Sans:wght@400;500"]},nb={radius:"4px",slideWidth:"1280px"},k4={name:qm,version:Qm,extends:"default-tech",description:Ym,vibe:Km,license:Jm,author:Xm,roles:Zm,typography:eb,geometry:nb},w4=Object.freeze(Object.defineProperty({__proto__:null,author:Xm,default:k4,description:Ym,geometry:nb,license:Jm,name:qm,roles:Zm,typography:eb,version:Qm,vibe:Km},Symbol.toStringTag,{value:"Module"})),tb="mat",rb="1.0.0",ab="Mat — dark sage + wood glow, Bricolage + burnt orange (frontend-slides bold-template-pack).",ob="Mat — sage #232E26 + cream #F0E8D2 + orange #C07030, Bricolage + DM Sans (frontend-slides mat).",ib="MIT",sb="Timur Isachenko",lb={bg:"#232E26",bg2:"#2E3D30",text:"#F0E8D2",muted:"#b8b4a4",accent:"#C07030",accent2:"#7A4E24",cardBg:"#EDE6D0",border:"rgba(240,232,210,0.12)"},cb={headingFont:"'Bricolage Grotesque', sans-serif",bodyFont:"'DM Sans', system-ui, sans-serif",headingWeight:800,googleFonts:["Bricolage+Grotesque:wght@600;700;800","DM+Sans:wght@400;500;600","DM+Mono:wght@400"]},db={radius:"0px",slideWidth:"1280px"},_4={name:tb,version:rb,extends:"default-tech",description:ab,vibe:ob,license:ib,author:sb,roles:lb,typography:cb,geometry:db},S4=Object.freeze(Object.defineProperty({__proto__:null,author:sb,default:_4,description:ab,geometry:db,license:ib,name:tb,roles:lb,typography:cb,version:rb,vibe:ob},Symbol.toStringTag,{value:"Module"})),ub="monochrome",pb="1.0.0",fb="Monochrome — ivory ledger, ultra-light Jost, no chromatic accents (frontend-slides bold-template-pack).",gb="Monochrome — ivory #FAFADF + ink #1A1A16, Jost 200 + Lora italic (frontend-slides monochrome).",hb="MIT",mb="Timur Isachenko",bb={bg:"#FAFADF",bg2:"#F5F0E4",text:"#1A1A16",muted:"#59594f",accent:"#1A1A16",accent2:"#8A8A80",cardBg:"#F5F0E4",border:"rgba(26,26,22,0.18)"},vb={headingFont:"'Jost', system-ui, sans-serif",bodyFont:"'Jost', system-ui, sans-serif",headingWeight:200,googleFonts:["Jost:wght@200;300;400;500","Lora:ital,wght@0,400;0,500;1,400","JetBrains+Mono:wght@400"]},yb={radius:"16px",slideWidth:"1280px"},$4={name:ub,version:pb,extends:"default-tech",description:fb,vibe:gb,license:hb,author:mb,roles:bb,typography:vb,geometry:yb},F4=Object.freeze(Object.defineProperty({__proto__:null,author:mb,default:$4,description:fb,geometry:yb,license:hb,name:ub,roles:bb,typography:vb,version:pb,vibe:gb},Symbol.toStringTag,{value:"Module"})),xb="neo-grid-bold",kb="1.0.0",wb="Neo-Grid Bold — putty ecru, ink black, electric lemon panels, Space Grotesk uppercase (frontend-slides).",_b="Neo-Grid Bold — putty #ECECE8, lemon #E6FF3D, Space Grotesk uppercase + JetBrains Mono (frontend-slides neo-grid-bold).",Sb="MIT",$b="Timur Isachenko",Fb={bg:"#ECECE8",bg2:"#F5F4EF",text:"#0A0A0A",muted:"#6b6b67",accent:"#E6FF3D",accent2:"#0A0A0A",cardBg:"#F5F4EF",border:"rgba(10,10,10,0.85)"},Eb={headingFont:"'Space Grotesk', Helvetica Neue, Arial, sans-serif",bodyFont:"'JetBrains Mono', monospace",headingWeight:700,googleFonts:["Space+Grotesk:wght@500;700","JetBrains+Mono:wght@400;500"]},Cb={radius:"0px",slideWidth:"1280px"},E4={name:xb,version:kb,extends:"default-tech",description:wb,vibe:_b,license:Sb,author:$b,roles:Fb,typography:Eb,geometry:Cb},C4=Object.freeze(Object.defineProperty({__proto__:null,author:$b,default:E4,description:wb,geometry:Cb,license:Sb,name:xb,roles:Fb,typography:Eb,version:kb,vibe:_b},Symbol.toStringTag,{value:"Module"})),jb="neon-noir",Tb="0.1.0",Pb="Neon noir — wet asphalt night, hot magenta + electric cyan, cinematic rain.",Mb="Neon noir — #050510 night, hot pink #ff2e97 + cyan #00e5ff, Orbitron (matches Neon District gallery).",Nb="MIT",zb="Timur Isachenko",Ab={bg:"#050510",bg2:"#0a0a1e",text:"#e8e4f0",muted:"#8884a8",accent:"#ff2e97",accent2:"#00e5ff",cardBg:"rgba(255,46,151,0.07)",border:"rgba(0,229,255,0.22)"},Ib={headingFont:"'Orbitron', system-ui, sans-serif",bodyFont:"'Share Tech Mono', monospace",headingWeight:700,googleFonts:["Orbitron:wght@600;700","Share+Tech+Mono"]},Db={radius:"10px",slideWidth:"1280px"},j4={name:jb,version:Tb,extends:"default-tech",description:Pb,vibe:Mb,license:Nb,author:zb,roles:Ab,typography:Ib,geometry:Db},T4=Object.freeze(Object.defineProperty({__proto__:null,author:zb,default:j4,description:Pb,geometry:Db,license:Nb,name:jb,roles:Ab,typography:Ib,version:Tb,vibe:Mb},Symbol.toStringTag,{value:"Module"})),Ob="notebook-tabs",Bb="1.0.0",Lb="Notebook Tabs — cream paper card on dark with mint/lavender/pink tabs, Bodoni Moda (frontend-slides STYLE_PRESETS).",Rb="Notebook Tabs — page #f8f6f1 on outer #2d2d2d, Bodoni Moda + DM Sans, pastel tabs (frontend-slides Notebook Tabs).",Wb="MIT",Gb="Timur Isachenko",Ub={bg:"#f8f6f1",bg2:"#efece4",text:"#1a1a1a",muted:"#5c574c",accent:"#98d4bb",accent2:"#c7b8ea",cardBg:"#ffffff",border:"rgba(26,26,26,0.12)"},Hb={headingFont:"'Bodoni Moda', Georgia, serif",bodyFont:"'DM Sans', system-ui, sans-serif",headingWeight:700,googleFonts:["Bodoni+Moda:opsz,wght@6..96,400;6..96,700","DM+Sans:wght@400;500"]},Vb={radius:"12px",slideWidth:"1280px"},P4={name:Ob,version:Bb,extends:"default-tech",description:Lb,vibe:Rb,license:Wb,author:Gb,roles:Ub,typography:Hb,geometry:Vb},M4=Object.freeze(Object.defineProperty({__proto__:null,author:Gb,default:P4,description:Lb,geometry:Vb,license:Wb,name:Ob,roles:Ub,typography:Hb,version:Bb,vibe:Rb},Symbol.toStringTag,{value:"Module"})),qb="paper-ink",Qb="1.0.0",Yb="Paper & Ink — Cormorant Garamond + Source Serif 4 on warm cream with crimson accent (frontend-slides STYLE_PRESETS).",Kb="Paper & Ink — cream #faf9f7, charcoal #1a1a1a, crimson #c41e3a, Cormorant Garamond + Source Serif 4 (frontend-slides Paper & Ink).",Jb="MIT",Xb="Timur Isachenko",Zb={bg:"#faf9f7",bg2:"#f0eeea",text:"#1a1a1a",muted:"#5c574c",accent:"#c41e3a",accent2:"#1a1a1a",cardBg:"#ffffff",border:"rgba(26,26,26,0.15)"},ev={headingFont:"'Cormorant Garamond', Garamond, Georgia, serif",bodyFont:"'Source Serif 4', Georgia, serif",headingWeight:600,googleFonts:["Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500","Source+Serif+4:opsz,wght@8..60,400;8..60,600"]},nv={radius:"0px",slideWidth:"1280px"},N4={name:qb,version:Qb,extends:"default-tech",description:Yb,vibe:Kb,license:Jb,author:Xb,roles:Zb,typography:ev,geometry:nv},z4=Object.freeze(Object.defineProperty({__proto__:null,author:Xb,default:N4,description:Yb,geometry:nv,license:Jb,name:qb,roles:Zb,typography:ev,version:Qb,vibe:Kb},Symbol.toStringTag,{value:"Module"})),tv="pastel-dreamy",rv="0.1.0",av="Soft pastel theme with lavender-blush background, deep plum text, and a blush/periwinkle accent pair.",ov="Soft pastel dreamy — lavender-blush bg, deep plum text for readability, blush-pink + periwinkle accent pair, generously rounded, gentle.",iv="MIT",sv="Timur Isachenko",lv={bg:"#fdf6fb",bg2:"#f5ecf9",text:"#3a2e4d",muted:"#6b5d82",accent:"#e893c2",accent2:"#8ab4f8",cardBg:"#f5ecf9",border:"rgba(58,46,77,0.10)"},cv={headingFont:"'Quicksand', system-ui, sans-serif",bodyFont:"'Mulish', system-ui, sans-serif",headingWeight:700,googleFonts:["Quicksand:wght@500;700","Mulish:wght@400;600"]},dv={radius:"28px",slideWidth:"1280px"},A4={name:tv,version:rv,extends:"default-tech",description:av,vibe:ov,license:iv,author:sv,roles:lv,typography:cv,geometry:dv},I4=Object.freeze(Object.defineProperty({__proto__:null,author:sv,default:A4,description:av,geometry:dv,license:iv,name:tv,roles:lv,typography:cv,version:rv,vibe:ov},Symbol.toStringTag,{value:"Module"})),uv="pastel-geometry",pv="1.0.0",fv="Pastel Geometry — Plus Jakarta Sans on sky pastel with vertical edge pills (frontend-slides STYLE_PRESETS).",gv="Pastel Geometry — sky #c8d9e6, card #faf9f7, vertical pastel pills, Plus Jakarta Sans (frontend-slides Pastel Geometry).",hv="MIT",mv="Timur Isachenko",bv={bg:"#c8d9e6",bg2:"#b8cddd",text:"#1a1a1a",muted:"#455e51",accent:"#f0b4d4",accent2:"#9b8dc4",cardBg:"#faf9f7",border:"rgba(26,26,26,0.1)"},vv={headingFont:"'Plus Jakarta Sans', system-ui, sans-serif",bodyFont:"'Plus Jakarta Sans', system-ui, sans-serif",headingWeight:800,googleFonts:["Plus+Jakarta+Sans:wght@400;500;700;800"]},yv={radius:"24px",slideWidth:"1280px"},D4={name:uv,version:pv,extends:"default-tech",description:fv,vibe:gv,license:hv,author:mv,roles:bv,typography:vv,geometry:yv},O4=Object.freeze(Object.defineProperty({__proto__:null,author:mv,default:D4,description:fv,geometry:yv,license:hv,name:uv,roles:bv,typography:vv,version:pv,vibe:gv},Symbol.toStringTag,{value:"Module"})),xv="peoples-platform",kv="1.0.0",wv="People's Platform — WPA poster energy, Alfa Slab + red text-shadow (frontend-slides bold-template-pack).",_v="People's Platform — paper #F5F2EA, cobalt #2C2CDC, amber #F2A03A, Alfa Slab One (frontend-slides peoples-platform).",Sv="MIT",$v="Timur Isachenko",Fv={bg:"#F5F2EA",bg2:"#F4E9D6",text:"#0E0E14",muted:"#1B1BB0",accent:"#2C2CDC",accent2:"#F2A03A",cardBg:"#FFFFFF",border:"#0E0E14"},Ev={headingFont:"'Alfa Slab One', serif",bodyFont:"'Archivo Narrow', system-ui, sans-serif",headingWeight:400,googleFonts:["Alfa+Slab+One","Caveat+Brush","Archivo+Narrow:wght@400;600;700","DM+Mono:wght@500"]},Cv={radius:"0px",slideWidth:"1280px"},B4={name:xv,version:kv,extends:"default-tech",description:wv,vibe:_v,license:Sv,author:$v,roles:Fv,typography:Ev,geometry:Cv},L4=Object.freeze(Object.defineProperty({__proto__:null,author:$v,default:B4,description:wv,geometry:Cv,license:Sv,name:xv,roles:Fv,typography:Ev,version:kv,vibe:_v},Symbol.toStringTag,{value:"Module"})),jv="pin-and-paper",Tv="1.0.0",Pv="Pin & Paper — yellow legal-pad field with cobalt ink, Space Grotesk + Caveat (frontend-slides).",Mv="Pin & Paper — legal pad #EFE56A, cobalt #1F3A8A, Space Grotesk + Caveat (frontend-slides pin-and-paper).",Nv="MIT",zv="Timur Isachenko",Av={bg:"#EFE56A",bg2:"#F5ECA0",text:"#1F3A8A",muted:"#2e4cac",accent:"#C2342B",accent2:"#D8702A",cardBg:"#F8F1D6",border:"rgba(31,58,138,0.22)"},Iv={headingFont:"'Space Grotesk', Helvetica Neue, Arial, sans-serif",bodyFont:"'Space Grotesk', system-ui, sans-serif",headingWeight:700,googleFonts:["Space+Grotesk:wght@500;700","Caveat:wght@500;700","DM+Mono:wght@400;500"]},Dv={radius:"8px",slideWidth:"1280px"},R4={name:jv,version:Tv,extends:"default-tech",description:Pv,vibe:Mv,license:Nv,author:zv,roles:Av,typography:Iv,geometry:Dv},W4=Object.freeze(Object.defineProperty({__proto__:null,author:zv,default:R4,description:Pv,geometry:Dv,license:Nv,name:jv,roles:Av,typography:Iv,version:Tv,vibe:Mv},Symbol.toStringTag,{value:"Module"})),Ov="pink-script",Bv="1.0.0",Lv="Pink Script (After Hours) — near-black canvas, fuchsia accent, pearl paper, DM Serif Display (frontend-slides bold-template-pack).",Rv="Pink Script — ink #060507, pink #ED3D8C, blush paper #F5EDF1, DM Serif Display + Inter (frontend-slides pink-script).",Wv="MIT",Gv="Timur Isachenko",Uv={bg:"#060507",bg2:"#0F0D11",text:"#F5EDF1",muted:"#898588",accent:"#ED3D8C",accent2:"#FF66A8",cardBg:"rgba(245,237,241,0.06)",border:"rgba(237,61,140,0.32)"},Hv={headingFont:"'DM Serif Display', Georgia, serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:400,googleFonts:["DM+Serif+Display:ital@0;1","Inter:wght@300;400;500;600","JetBrains+Mono:wght@400;500"]},Vv={radius:"0px",slideWidth:"1280px"},G4={name:Ov,version:Bv,extends:"default-tech",description:Lv,vibe:Rv,license:Wv,author:Gv,roles:Uv,typography:Hv,geometry:Vv},U4=Object.freeze(Object.defineProperty({__proto__:null,author:Gv,default:G4,description:Lv,geometry:Vv,license:Wv,name:Ov,roles:Uv,typography:Hv,version:Bv,vibe:Rv},Symbol.toStringTag,{value:"Module"})),qv="playful",Qv="0.1.0",Yv="Playful creative-agency theme with bold coral and lime accents, rounded corners, and sticker-style energy.",Kv="Playful creative agency — bright warm white, bold coral + lime accent pair, rounded everything, big type, sticker-style shadows.",Jv="MIT",Xv="Timur Isachenko",Zv={bg:"#fffbf0",bg2:"#fff9e6",text:"#1a1a2e",muted:"#62627f",accent:"#ff4757",accent2:"#2ed573",cardBg:"rgba(255,71,87,0.06)",border:"rgba(255,71,87,0.15)"},ey={headingFont:"'Nunito', system-ui, sans-serif",bodyFont:"'Nunito', system-ui, sans-serif",headingWeight:800,googleFonts:["Nunito:wght@400;700;800"]},ny={radius:"24px",slideWidth:"1280px"},H4={name:qv,version:Qv,extends:"default-tech",description:Yv,vibe:Kv,license:Jv,author:Xv,roles:Zv,typography:ey,geometry:ny},V4=Object.freeze(Object.defineProperty({__proto__:null,author:Xv,default:H4,description:Yv,geometry:ny,license:Jv,name:qv,roles:Zv,typography:ey,version:Qv,vibe:Kv},Symbol.toStringTag,{value:"Module"})),ty="raw-grid",ry="1.0.0",ay="Raw Grid — 3px black borders as layout, system sans 900 (frontend-slides bold-template-pack).",oy="Raw Grid — white + #0A0A0A borders, blush #F2D4CF / sage #E5EDD6 (frontend-slides raw-grid).",iy="MIT",sy="Timur Isachenko",ly={bg:"#FFFFFF",bg2:"#F5F5F5",text:"#0A0A0A",muted:"#333333",accent:"#F2D4CF",accent2:"#E5EDD6",cardBg:"#FFFFFF",border:"#0A0A0A"},cy={headingFont:"'Segoe UI', system-ui, -apple-system, Helvetica, Arial, sans-serif",bodyFont:"'Segoe UI', system-ui, -apple-system, Helvetica, Arial, sans-serif",headingWeight:900,googleFonts:[]},dy={radius:"0px",slideWidth:"1280px"},q4={name:ty,version:ry,extends:"default-tech",description:ay,vibe:oy,license:iy,author:sy,roles:ly,typography:cy,geometry:dy},Q4=Object.freeze(Object.defineProperty({__proto__:null,author:sy,default:q4,description:ay,geometry:dy,license:iy,name:ty,roles:ly,typography:cy,version:ry,vibe:oy},Symbol.toStringTag,{value:"Module"})),uy="retro-arcade",py="0.1.0",fy="Retro 80s arcade theme with deep purple-black background, magenta and cyan neon accents, and pixel display fonts.",gy="Retro 80s arcade — deep purple-black bg, magenta + electric cyan neon, glow text-shadow, pixel display font, scanline feel.",hy="MIT",my="Timur Isachenko",by={bg:"#0d0015",bg2:"#150025",text:"#e0e0ff",muted:"#9090cc",accent:"#ff00ff",accent2:"#00ffff",cardBg:"rgba(255,0,255,0.08)",border:"rgba(0,255,255,0.20)"},vy={headingFont:"'Orbitron', system-ui, sans-serif",bodyFont:"'Share Tech Mono', monospace",headingWeight:700,googleFonts:["Orbitron:wght@400;700","Share+Tech+Mono"]},yy={radius:"0px",slideWidth:"1280px"},Y4={name:uy,version:py,extends:"default-tech",description:fy,vibe:gy,license:hy,author:my,roles:by,typography:vy,geometry:yy},K4=Object.freeze(Object.defineProperty({__proto__:null,author:my,default:Y4,description:fy,geometry:yy,license:hy,name:uy,roles:by,typography:vy,version:py,vibe:gy},Symbol.toStringTag,{value:"Module"})),xy="retro-windows",ky="1.0.0",wy="Retro Windows — Win95 beveled chrome, navy title bar (frontend-slides bold-template-pack).",_y="Retro Windows — #C0C0C0 gray, navy #000080 title bar, MS Sans / Press Start 2P (frontend-slides retro-windows).",Sy="MIT",$y="Timur Isachenko",Fy={bg:"#C0C0C0",bg2:"#D4D0C8",text:"#222222",muted:"#323232",accent:"#000080",accent2:"#008080",cardBg:"#FFFFFF",border:"#000000"},Ey={headingFont:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",bodyFont:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",headingWeight:700,googleFonts:["Press+Start+2P","VT323"]},Cy={radius:"0px",slideWidth:"1280px"},J4={name:xy,version:ky,extends:"default-tech",description:wy,vibe:_y,license:Sy,author:$y,roles:Fy,typography:Ey,geometry:Cy},X4=Object.freeze(Object.defineProperty({__proto__:null,author:$y,default:J4,description:wy,geometry:Cy,license:Sy,name:xy,roles:Fy,typography:Ey,version:ky,vibe:_y},Symbol.toStringTag,{value:"Module"})),jy="retro-zine",Ty="1.0.0",Py="Retro Zine — khaki paper, forest green, Bebas Neue + Caveat (frontend-slides bold-template-pack).",My="Retro Zine — khaki #C8B99A + green #008F4D, Bebas Neue + Space Grotesk (frontend-slides retro-zine).",Ny="MIT",zy="Timur Isachenko",Ay={bg:"#C8B99A",bg2:"#B8A98A",text:"#1A1A1A",muted:"#004827",accent:"#008F4D",accent2:"#00A85D",cardBg:"#F4EFE6",border:"#1A1A1A"},Iy={headingFont:"'Bebas Neue', sans-serif",bodyFont:"'Space Grotesk', system-ui, sans-serif",headingWeight:400,googleFonts:["Bebas+Neue","Space+Grotesk:wght@300;400;500","Caveat:wght@400;600"]},Dy={radius:"0px",slideWidth:"1280px"},Z4={name:jy,version:Ty,extends:"default-tech",description:Py,vibe:My,license:Ny,author:zy,roles:Ay,typography:Iy,geometry:Dy},e8=Object.freeze(Object.defineProperty({__proto__:null,author:zy,default:Z4,description:Py,geometry:Dy,license:Ny,name:jy,roles:Ay,typography:Iy,version:Ty,vibe:My},Symbol.toStringTag,{value:"Module"})),Oy="risograph-zine",By="0.1.0",Ly="Risograph zine — warm paper, misregistered ink, magenta + teal print shop energy.",Ry="Risograph zine — kraft #f3ecdd, red #ff4f4f + blue #2b3aff overprint (matches Inkwell gallery).",Wy="MIT",Gy="Timur Isachenko",Uy={bg:"#f3ecdd",bg2:"#e8dfc8",text:"#1a1209",muted:"#685a46",accent:"#ff4f4f",accent2:"#2b3aff",cardBg:"rgba(255,79,79,0.06)",border:"rgba(26,18,9,0.18)"},Hy={headingFont:"'Archivo Black', system-ui, sans-serif",bodyFont:"'Space Mono', monospace",headingWeight:400,googleFonts:["Archivo+Black","Space+Mono:wght@400;700"]},Vy={radius:"2px",slideWidth:"1280px"},n8={name:Oy,version:By,extends:"default-tech",description:Ly,vibe:Ry,license:Wy,author:Gy,roles:Uy,typography:Hy,geometry:Vy},t8=Object.freeze(Object.defineProperty({__proto__:null,author:Gy,default:n8,description:Ly,geometry:Vy,license:Wy,name:Oy,roles:Uy,typography:Hy,version:By,vibe:Ry},Symbol.toStringTag,{value:"Module"})),qy="sakura-chroma",Qy="1.0.0",Yy="Sakura Chroma — cream paper cassette aesthetic, Big Shoulders Display, six-color chroma (frontend-slides bold-template-pack).",Ky="Sakura Chroma — paper #F1E6CB, ink #3A2516, red/pink/orange/green/blue/yellow stamps, Big Shoulders Display + Albert Sans (frontend-slides sakura-chroma).",Jy="MIT",Xy="Timur Isachenko",Zy={bg:"#F1E6CB",bg2:"#E5D6B0",text:"#3A2516",muted:"#6B5340",accent:"#E5392A",accent2:"#E54489",cardBg:"#FFF8E8",border:"rgba(58,37,22,0.85)"},ex={headingFont:"'Big Shoulders Display', Impact, sans-serif",bodyFont:"'Albert Sans', system-ui, sans-serif",headingWeight:900,googleFonts:["Big+Shoulders+Display:wght@700;800;900","Albert+Sans:wght@400;500;600;700","JetBrains+Mono:wght@400;500"]},nx={radius:"4px",slideWidth:"1280px"},r8={name:qy,version:Qy,extends:"default-tech",description:Yy,vibe:Ky,license:Jy,author:Xy,roles:Zy,typography:ex,geometry:nx},a8=Object.freeze(Object.defineProperty({__proto__:null,author:Xy,default:r8,description:Yy,geometry:nx,license:Jy,name:qy,roles:Zy,typography:ex,version:Qy,vibe:Ky},Symbol.toStringTag,{value:"Module"})),tx="scandinavian",rx="0.1.0",ax="Scandinavian hygge — warm linen, sage green, soft clay, Fraunces + Work Sans.",ox="Scandinavian — #efe9df linen, sage #9caf88 + clay #c9826b (matches Hygge gallery).",ix="MIT",sx="Timur Isachenko",lx={bg:"#efe9df",bg2:"#e6ddd1",text:"#2b2926",muted:"#65605c",accent:"#9caf88",accent2:"#c9826b",cardBg:"rgba(43,41,38,0.04)",border:"rgba(43,41,38,0.1)"},cx={headingFont:"'Fraunces', Georgia, serif",bodyFont:"'Work Sans', system-ui, sans-serif",headingWeight:600,googleFonts:["Fraunces:wght@500;600;700","Work+Sans:wght@400;600"]},dx={radius:"16px",slideWidth:"1280px"},o8={name:tx,version:rx,extends:"default-tech",description:ax,vibe:ox,license:ix,author:sx,roles:lx,typography:cx,geometry:dx},i8=Object.freeze(Object.defineProperty({__proto__:null,author:sx,default:o8,description:ax,geometry:dx,license:ix,name:tx,roles:lx,typography:cx,version:rx,vibe:ox},Symbol.toStringTag,{value:"Module"})),ux="scatterbrain",px="1.0.0",fx="Scatterbrain — post-it workshop board, Shrikhand + Caveat (frontend-slides bold-template-pack).",gx="Scatterbrain — cream cork #FAF8F3, sticky yellows/pinks, Shrikhand + Zilla Slab (frontend-slides scatterbrain).",hx="MIT",mx="Timur Isachenko",bx={bg:"#FAF8F3",bg2:"#F7F5F0",text:"#2D2A26",muted:"#5C5750",accent:"#FFE066",accent2:"#FFC9C9",cardBg:"#FFE066",border:"rgba(45,42,38,0.18)"},vx={headingFont:"'Shrikhand', cursive",bodyFont:"'Zilla Slab', Georgia, serif",headingWeight:400,googleFonts:["Shrikhand","Zilla+Slab:wght@400;500;600","Caveat:wght@400;600"]},yx={radius:"4px",slideWidth:"1280px"},s8={name:ux,version:px,extends:"default-tech",description:fx,vibe:gx,license:hx,author:mx,roles:bx,typography:vx,geometry:yx},l8=Object.freeze(Object.defineProperty({__proto__:null,author:mx,default:s8,description:fx,geometry:yx,license:hx,name:ux,roles:bx,typography:vx,version:px,vibe:gx},Symbol.toStringTag,{value:"Module"})),xx="signal",kx="1.0.0",wx="Signal — dual cream/navy editorial with antique gold accent, Source Serif 4 (frontend-slides).",_x="Signal — cream #F0ECE3 / navy #1C2644, gold #C8A870, Source Serif 4 + DM Sans (frontend-slides signal).",Sx="MIT",$x="Timur Isachenko",Fx={bg:"#F0ECE3",bg2:"#E6E0D4",text:"#1A2030",muted:"#5A6270",accent:"#C8A870",accent2:"#1C2644",cardBg:"rgba(28,38,68,0.05)",border:"rgba(202,196,180,1)"},Ex={headingFont:"'Source Serif 4', Georgia, serif",bodyFont:"'DM Sans', system-ui, sans-serif",headingWeight:600,googleFonts:["Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400","DM+Sans:wght@400;500","IBM+Plex+Mono:wght@400;500"]},Cx={radius:"2px",slideWidth:"1280px"},c8={name:xx,version:kx,extends:"default-tech",description:wx,vibe:_x,license:Sx,author:$x,roles:Fx,typography:Ex,geometry:Cx},d8=Object.freeze(Object.defineProperty({__proto__:null,author:$x,default:c8,description:wx,geometry:Cx,license:Sx,name:xx,roles:Fx,typography:Ex,version:kx,vibe:_x},Symbol.toStringTag,{value:"Module"})),jx="soft-editorial",Tx="1.0.0",Px="Soft Editorial — Cormorant Garamond on warm cream paper with sage, blush, lemon, and lilac accents (frontend-slides / beautiful-html-templates).",Mx="Soft Editorial — paper #F2EEDF, ink #2A241B, sage #B7C7A8 + blush #E1A4C2, Cormorant Garamond + Work Sans (frontend-slides soft-editorial).",Nx="MIT",zx="Timur Isachenko",Ax={bg:"#F2EEDF",bg2:"#ECE6D2",text:"#2A241B",muted:"#4A4338",accent:"#B7C7A8",accent2:"#E1A4C2",cardBg:"rgba(255,255,255,0.78)",border:"rgba(42,36,27,0.22)"},Ix={headingFont:"'Cormorant Garamond', Garamond, Georgia, serif",bodyFont:"'Work Sans', system-ui, sans-serif",headingWeight:500,googleFonts:["Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600","Work+Sans:wght@400;500;600"]},Dx={radius:"28px",slideWidth:"1280px"},u8={name:jx,version:Tx,extends:"default-tech",description:Px,vibe:Mx,license:Nx,author:zx,roles:Ax,typography:Ix,geometry:Dx},p8=Object.freeze(Object.defineProperty({__proto__:null,author:zx,default:u8,description:Px,geometry:Dx,license:Nx,name:jx,roles:Ax,typography:Ix,version:Tx,vibe:Mx},Symbol.toStringTag,{value:"Module"})),Ox="split-pastel",Bx="1.0.0",Lx="Split Pastel — peach/lavender vertical split, Outfit, playful badges (frontend-slides STYLE_PRESETS).",Rx="Split Pastel — peach #f5e6dc / lavender #e4dff0 split, Outfit, mint/yellow/pink badges (frontend-slides Split Pastel).",Wx="MIT",Gx="Timur Isachenko",Ux={bg:"#f5e6dc",bg2:"#e4dff0",text:"#1a1a1a",muted:"#6a6570",accent:"#c8f0d8",accent2:"#f0d4e0",cardBg:"rgba(255,255,255,0.65)",border:"rgba(26,26,26,0.1)"},Hx={headingFont:"'Outfit', system-ui, sans-serif",bodyFont:"'Outfit', system-ui, sans-serif",headingWeight:800,googleFonts:["Outfit:wght@400;500;700;800"]},Vx={radius:"20px",slideWidth:"1280px"},f8={name:Ox,version:Bx,extends:"default-tech",description:Lx,vibe:Rx,license:Wx,author:Gx,roles:Ux,typography:Hx,geometry:Vx},g8=Object.freeze(Object.defineProperty({__proto__:null,author:Gx,default:f8,description:Lx,geometry:Vx,license:Wx,name:Ox,roles:Ux,typography:Hx,version:Bx,vibe:Rx},Symbol.toStringTag,{value:"Module"})),qx="stencil-tablet",Qx="1.0.0",Yx="Stencil & Tablet — bone paper, Stardos Stencil, earth accents (frontend-slides bold-template-pack).",Kx="Stencil & Tablet — bone #E2DCC9 + ink, Stardos Stencil + sienna/magenta/teal blocks (frontend-slides stencil-tablet).",Jx="MIT",Xx="Timur Isachenko",Zx={bg:"#E2DCC9",bg2:"#F4EFE0",text:"#0A0A0A",muted:"#4e5520",accent:"#A06A3C",accent2:"#C73B7A",cardBg:"#F4EFE0",border:"#000000"},e1={headingFont:"'Stardos Stencil', serif",bodyFont:"'Inter', system-ui, sans-serif",headingWeight:700,googleFonts:["Stardos+Stencil:wght@700","Barlow+Condensed:wght@600;700;800;900","Inter:wght@400;500;600"]},n1={radius:"24px",slideWidth:"1280px"},h8={name:qx,version:Qx,extends:"default-tech",description:Yx,vibe:Kx,license:Jx,author:Xx,roles:Zx,typography:e1,geometry:n1},m8=Object.freeze(Object.defineProperty({__proto__:null,author:Xx,default:h8,description:Yx,geometry:n1,license:Jx,name:qx,roles:Zx,typography:e1,version:Qx,vibe:Kx},Symbol.toStringTag,{value:"Module"})),t1="studio",r1="1.0.0",a1="Studio — near-black + acid yellow binary, Barlow 900 uppercase (frontend-slides bold-template-pack).",o1="Studio — #1C1C1C field + #F5D200 acid yellow, Barlow 900 + IBM Plex Mono (frontend-slides studio).",i1="MIT",s1="Timur Isachenko",l1={bg:"#1C1C1C",bg2:"#242422",text:"#F5D200",muted:"#bfa70f",accent:"#F5D200",accent2:"#F0CC00",cardBg:"#242422",border:"#2E2E2C"},c1={headingFont:"'Barlow', sans-serif",bodyFont:"'Barlow', system-ui, sans-serif",headingWeight:900,googleFonts:["Barlow:wght@400;500;700;900","IBM+Plex+Mono:wght@500"]},d1={radius:"0px",slideWidth:"1280px"},b8={name:t1,version:r1,extends:"default-tech",description:a1,vibe:o1,license:i1,author:s1,roles:l1,typography:c1,geometry:d1},v8=Object.freeze(Object.defineProperty({__proto__:null,author:s1,default:b8,description:a1,geometry:d1,license:i1,name:t1,roles:l1,typography:c1,version:r1,vibe:o1},Symbol.toStringTag,{value:"Module"})),u1="swiss-typographic",p1="0.1.0",f1="Swiss International Typographic Style — white grid, signal red, Helvetica-like grotesk.",g1="Swiss typographic — pure white, Inter grotesk, signal red, zero radius, modular grid (matches Grid Systems gallery).",h1="MIT",m1="Timur Isachenko",b1={bg:"#ffffff",bg2:"#f5f5f5",text:"#0a0a0a",muted:"#636363",accent:"#e2231a",accent2:"#0a0a0a",cardBg:"rgba(0,0,0,0.03)",border:"rgba(0,0,0,0.12)"},v1={headingFont:"'Inter', Helvetica, Arial, sans-serif",bodyFont:"'Inter', Helvetica, Arial, sans-serif",headingWeight:800,googleFonts:["Inter:wght@400;600;800"]},y1={radius:"0px",slideWidth:"1280px"},y8={name:u1,version:p1,extends:"default-tech",description:f1,vibe:g1,license:h1,author:m1,roles:b1,typography:v1,geometry:y1},x8=Object.freeze(Object.defineProperty({__proto__:null,author:m1,default:y8,description:f1,geometry:y1,license:h1,name:u1,roles:b1,typography:v1,version:p1,vibe:g1},Symbol.toStringTag,{value:"Module"})),x1="vaporwave",k1="0.1.0",w1="Vaporwave — purple dusk, sunset gradient, chrome teal, nostalgic mall energy.",_1="Vaporwave — #1a0533 dusk, #ff6ad5 pink + #5ce1ff teal, Monoton (matches Mallsoft gallery).",S1="MIT",$1="Timur Isachenko",F1={bg:"#1a0533",bg2:"#2d1060",text:"#fff0f9",muted:"#c4a8ff",accent:"#ff6ad5",accent2:"#5ce1ff",cardBg:"rgba(255,106,213,0.08)",border:"rgba(92,225,255,0.28)"},E1={headingFont:"'Monoton', display, cursive",bodyFont:"'Space Mono', monospace",headingWeight:400,googleFonts:["Monoton","Space+Mono:wght@400;700","VT323"]},C1={radius:"6px",slideWidth:"1280px"},k8={name:x1,version:k1,extends:"default-tech",description:w1,vibe:_1,license:S1,author:$1,roles:F1,typography:E1,geometry:C1},w8=Object.freeze(Object.defineProperty({__proto__:null,author:$1,default:k8,description:w1,geometry:C1,license:S1,name:x1,roles:F1,typography:E1,version:k1,vibe:_1},Symbol.toStringTag,{value:"Module"})),j1="vellum",T1="1.0.0",P1="Vellum — deep periwinkle field with chartreuse italic Cormorant type (frontend-slides).",M1="Vellum — periwinkle #2A3870, chartreuse #E8D85C, italic Cormorant Garamond + DM Sans (frontend-slides vellum).",N1="MIT",z1="Timur Isachenko",A1={bg:"#2A3870",bg2:"#1F2858",text:"#E8D85C",muted:"#ceccb0",accent:"#E8D85C",accent2:"#3A7878",cardBg:"rgba(232,216,92,0.08)",border:"rgba(232,216,92,0.20)"},I1={headingFont:"'Cormorant Garamond', Georgia, serif",bodyFont:"'DM Sans', system-ui, sans-serif",headingWeight:400,googleFonts:["Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500","DM+Sans:wght@400;500","Courier+Prime:wght@400"]},D1={radius:"0px",slideWidth:"1280px"},_8={name:j1,version:T1,extends:"default-tech",description:P1,vibe:M1,license:N1,author:z1,roles:A1,typography:I1,geometry:D1},S8=Object.freeze(Object.defineProperty({__proto__:null,author:z1,default:_8,description:P1,geometry:D1,license:N1,name:j1,roles:A1,typography:I1,version:T1,vibe:M1},Symbol.toStringTag,{value:"Module"})),O1="vintage-editorial",B1="1.0.0",L1="Vintage Editorial — Fraunces on cream with geometric accents (frontend-slides STYLE_PRESETS).",R1="Vintage Editorial — cream #f5f3ee, Fraunces display + Work Sans, witty bordered CTAs (frontend-slides Vintage Editorial).",W1="MIT",G1="Timur Isachenko",U1={bg:"#f5f3ee",bg2:"#ebe7de",text:"#1a1a1a",muted:"#555555",accent:"#e8d4c0",accent2:"#1a1a1a",cardBg:"#ffffff",border:"rgba(26,26,26,0.2)"},H1={headingFont:"'Fraunces', Georgia, serif",bodyFont:"'Work Sans', system-ui, sans-serif",headingWeight:700,googleFonts:["Fraunces:opsz,wght@9..144,700;9..144,900","Work+Sans:wght@400;500"]},V1={radius:"4px",slideWidth:"1280px"},$8={name:O1,version:B1,extends:"default-tech",description:L1,vibe:R1,license:W1,author:G1,roles:U1,typography:H1,geometry:V1},F8=Object.freeze(Object.defineProperty({__proto__:null,author:G1,default:$8,description:L1,geometry:V1,license:W1,name:O1,roles:U1,typography:H1,version:B1,vibe:R1},Symbol.toStringTag,{value:"Module"})),q1="y2k-aero",Q1="0.1.0",Y1="Y2K aero — icy gradients, chrome cyan, soft bubbles, futuristic optimism.",K1="Y2K aero — icy #e0f7ff, sky #38bdf8 + lime #a3e635, Nunito (matches BubbleFlow gallery).",J1="MIT",X1="Timur Isachenko",Z1={bg:"#e0f7ff",bg2:"#bae6fd",text:"#0c4a6e",muted:"#0369a1",accent:"#38bdf8",accent2:"#a3e635",cardBg:"rgba(255,255,255,0.72)",border:"rgba(14,165,233,0.28)"},ek={headingFont:"'Nunito', system-ui, sans-serif",bodyFont:"'Nunito Sans', system-ui, sans-serif",headingWeight:800,googleFonts:["Nunito:wght@700;800","Nunito+Sans:wght@400;600"]},nk={radius:"32px",slideWidth:"1280px"},E8={name:q1,version:Q1,extends:"default-tech",description:Y1,vibe:K1,license:J1,author:X1,roles:Z1,typography:ek,geometry:nk},C8=Object.freeze(Object.defineProperty({__proto__:null,author:X1,default:E8,description:Y1,geometry:nk,license:J1,name:q1,roles:Z1,typography:ek,version:Q1,vibe:K1},Symbol.toStringTag,{value:"Module"})),j8={bg:"#0e0e12",bg2:"#16161d",text:"#f4f4f5",muted:"#a1a1aa",accent:"#7c3aed",accent2:"#22d3ee",cardBg:"rgba(255,255,255,0.04)",border:"rgba(255,255,255,0.08)"},T8={headingFont:"'Montserrat', system-ui, sans-serif",bodyFont:"'Open Sans', system-ui, sans-serif",headingWeight:800,googleFonts:["Montserrat:wght@700;800","Open+Sans:wght@400;600"]},P8={radius:"18px",slideWidth:"1280px"},M8={...Object.assign({"../../../core/themes/claude/theme.json":Ww,"../../../core/themes/default-tech/theme.json":Uw}),...Object.assign({"../../../themes/8-bit-orbit/theme.json":Vw,"../../../themes/aerospace-hud/theme.json":Qw,"../../../themes/art-deco/theme.json":Kw,"../../../themes/aurora-glass/theme.json":Xw,"../../../themes/bauhaus/theme.json":e5,"../../../themes/biennale-yellow/theme.json":t5,"../../../themes/block-frame/theme.json":a5,"../../../themes/blue-professional/theme.json":i5,"../../../themes/blueprint/theme.json":l5,"../../../themes/bold-poster/theme.json":d5,"../../../themes/bold-signal/theme.json":p5,"../../../themes/botanical-luxe/theme.json":g5,"../../../themes/broadsheet/theme.json":m5,"../../../themes/broadside/theme.json":v5,"../../../themes/brutalist-acid/theme.json":x5,"../../../themes/brutalist-mono/theme.json":w5,"../../../themes/candy-pop/theme.json":S5,"../../../themes/capsule/theme.json":F5,"../../../themes/cartesian/theme.json":C5,"../../../themes/cobalt-grid/theme.json":T5,"../../../themes/coral/theme.json":M5,"../../../themes/corporate/theme.json":z5,"../../../themes/creative-mode/theme.json":I5,"../../../themes/creative-voltage/theme.json":O5,"../../../themes/crt-terminal/theme.json":L5,"../../../themes/daisy-days/theme.json":W5,"../../../themes/dark-botanical/theme.json":U5,"../../../themes/data-editorial/theme.json":V5,"../../../themes/developer-dark/theme.json":Q5,"../../../themes/editorial-forest/theme.json":K5,"../../../themes/editorial-serif/theme.json":X5,"../../../themes/editorial-tri-tone/theme.json":e4,"../../../themes/electric-studio/theme.json":t4,"../../../themes/emerald-editorial/theme.json":a4,"../../../themes/fintech-clean/theme.json":i4,"../../../themes/ft-editorial/theme.json":l4,"../../../themes/genz-bento/theme.json":d4,"../../../themes/glassmorphism/theme.json":p4,"../../../themes/grove/theme.json":g4,"../../../themes/heritage-editorial/theme.json":m4,"../../../themes/kinetic-wrapped/theme.json":v4,"../../../themes/long-table/theme.json":x4,"../../../themes/luxury-minimalist/theme.json":w4,"../../../themes/mat/theme.json":S4,"../../../themes/monochrome/theme.json":F4,"../../../themes/neo-grid-bold/theme.json":C4,"../../../themes/neon-noir/theme.json":T4,"../../../themes/notebook-tabs/theme.json":M4,"../../../themes/paper-ink/theme.json":z4,"../../../themes/pastel-dreamy/theme.json":I4,"../../../themes/pastel-geometry/theme.json":O4,"../../../themes/peoples-platform/theme.json":L4,"../../../themes/pin-and-paper/theme.json":W4,"../../../themes/pink-script/theme.json":U4,"../../../themes/playful/theme.json":V4,"../../../themes/raw-grid/theme.json":Q4,"../../../themes/retro-arcade/theme.json":K4,"../../../themes/retro-windows/theme.json":X4,"../../../themes/retro-zine/theme.json":e8,"../../../themes/risograph-zine/theme.json":t8,"../../../themes/sakura-chroma/theme.json":a8,"../../../themes/scandinavian/theme.json":i8,"../../../themes/scatterbrain/theme.json":l8,"../../../themes/signal/theme.json":d8,"../../../themes/soft-editorial/theme.json":p8,"../../../themes/split-pastel/theme.json":g8,"../../../themes/stencil-tablet/theme.json":m8,"../../../themes/studio/theme.json":v8,"../../../themes/swiss-typographic/theme.json":x8,"../../../themes/vaporwave/theme.json":w8,"../../../themes/vellum/theme.json":S8,"../../../themes/vintage-editorial/theme.json":F8,"../../../themes/y2k-aero/theme.json":C8})},pa=new Map;for(const e of Object.values(M8)){const n="default"in e?e.default:e;n!=null&&n.name&&pa.set(n.name,n)}function tk(){return[...pa.keys()].sort()}function N8(){return tk().map(e=>{const n=dt(e),t=n.manifest.vibe??n.manifest.description??e;return{name:e,vibe:t,bg:n.palette.bg,accent:n.palette.accent}})}function dt(e){const n=[];let t=pa.has(e)?e:"default-tech";const r=new Set;for(;t&&!r.has(t);){r.add(t);const l=pa.get(t);if(!l)break;n.unshift(l),t=l.extends}const a={...j8},o={...T8},i={...P8};for(const l of n)Object.assign(a,l.roles??{}),Object.assign(o,l.typography??{}),Object.assign(i,l.geometry??{});const s=n[n.length-1]??{name:"default-tech",version:"0.0.0"};return{name:s.name,version:s.version,manifest:s,palette:a,typography:o,geometry:i}}const z8=`<section class="slide title-slide closing-slide" data-layout="closing">
  {{#eyebrow}}<span class="eyebrow">{{eyebrow}}</span>{{/eyebrow}}
  <h1>{{heading}}</h1>
  {{#lead}}<p class="lead">{{lead}}</p>{{/lead}}
  {{#cta}}<a class="btn" href="{{href}}"><i class="fa-solid fa-arrow-right"></i> {{label}}</a>{{/cta}}
</section>
`,A8=`<section class="slide code-slide" data-layout="code">
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
`,I8=`<section class="slide comparison-slide" data-layout="comparison">
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
`,D8=`<section class="slide data-table-slide" data-layout="data-table">
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
`,G8=`<section class="slide timeline-slide" data-layout="timeline">
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
`,U8=`<section class="slide title-slide" data-layout="title">
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
 */var V8=Object.prototype.toString,ht=Array.isArray||function(n){return V8.call(n)==="[object Array]"};function qi(e){return typeof e=="function"}function q8(e){return ht(e)?"array":typeof e}function ao(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function cl(e,n){return e!=null&&typeof e=="object"&&n in e}function Q8(e,n){return e!=null&&typeof e!="object"&&e.hasOwnProperty&&e.hasOwnProperty(n)}var Y8=RegExp.prototype.test;function K8(e,n){return Y8.call(e,n)}var J8=/\S/;function X8(e){return!K8(J8,e)}var Z8={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};function e_(e){return String(e).replace(/[&<>"'`=\/]/g,function(t){return Z8[t]})}var n_=/\s*/,t_=/\s+/,dl=/\s*=/,r_=/\s*\}/,a_=/#|\^|\/|>|\{|&|=|!/;function o_(e,n){if(!e)return[];var t=!1,r=[],a=[],o=[],i=!1,s=!1,l="",c=0;function p(){if(i&&!s)for(;o.length;)delete a[o.pop()];else o=[];i=!1,s=!1}var g,m,b;function v($){if(typeof $=="string"&&($=$.split(t_,2)),!ht($)||$.length!==2)throw new Error("Invalid tags: "+$);g=new RegExp(ao($[0])+"\\s*"),m=new RegExp("\\s*"+ao($[1])),b=new RegExp("\\s*"+ao("}"+$[1]))}v(n||ve.tags);for(var y=new sr(e),j,f,u,h,x,_;!y.eos();){if(j=y.pos,u=y.scanUntil(g),u)for(var w=0,C=u.length;w<C;++w)h=u.charAt(w),X8(h)?(o.push(a.length),l+=h):(s=!0,t=!0,l+=" "),a.push(["text",h,j,j+1]),j+=1,h===`
`&&(p(),l="",c=0,t=!1);if(!y.scan(g))break;if(i=!0,f=y.scan(a_)||"name",y.scan(n_),f==="="?(u=y.scanUntil(dl),y.scan(dl),y.scanUntil(m)):f==="{"?(u=y.scanUntil(b),y.scan(r_),y.scanUntil(m),f="&"):u=y.scanUntil(m),!y.scan(m))throw new Error("Unclosed tag at "+y.pos);if(f==">"?x=[f,u,j,y.pos,l,c,t]:x=[f,u,j,y.pos],c++,a.push(x),f==="#"||f==="^")r.push(x);else if(f==="/"){if(_=r.pop(),!_)throw new Error('Unopened section "'+u+'" at '+j);if(_[1]!==u)throw new Error('Unclosed section "'+_[1]+'" at '+j)}else f==="name"||f==="{"||f==="&"?s=!0:f==="="&&v(u)}if(p(),_=r.pop(),_)throw new Error('Unclosed section "'+_[1]+'" at '+y.pos);return s_(i_(a))}function i_(e){for(var n=[],t,r,a=0,o=e.length;a<o;++a)t=e[a],t&&(t[0]==="text"&&r&&r[0]==="text"?(r[1]+=t[1],r[3]=t[3]):(n.push(t),r=t));return n}function s_(e){for(var n=[],t=n,r=[],a,o,i=0,s=e.length;i<s;++i)switch(a=e[i],a[0]){case"#":case"^":t.push(a),r.push(a),t=a[4]=[];break;case"/":o=r.pop(),o[5]=a[2],t=r.length>0?r[r.length-1][4]:n;break;default:t.push(a)}return n}function sr(e){this.string=e,this.tail=e,this.pos=0}sr.prototype.eos=function(){return this.tail===""};sr.prototype.scan=function(n){var t=this.tail.match(n);if(!t||t.index!==0)return"";var r=t[0];return this.tail=this.tail.substring(r.length),this.pos+=r.length,r};sr.prototype.scanUntil=function(n){var t=this.tail.search(n),r;switch(t){case-1:r=this.tail,this.tail="";break;case 0:r="";break;default:r=this.tail.substring(0,t),this.tail=this.tail.substring(t)}return this.pos+=r.length,r};function ut(e,n){this.view=e,this.cache={".":this.view},this.parent=n}ut.prototype.push=function(n){return new ut(n,this)};ut.prototype.lookup=function(n){var t=this.cache,r;if(t.hasOwnProperty(n))r=t[n];else{for(var a=this,o,i,s,l=!1;a;){if(n.indexOf(".")>0)for(o=a.view,i=n.split("."),s=0;o!=null&&s<i.length;)s===i.length-1&&(l=cl(o,i[s])||Q8(o,i[s])),o=o[i[s++]];else o=a.view[n],l=cl(a.view,n);if(l){r=o;break}a=a.parent}t[n]=r}return qi(r)&&(r=r.call(this.view)),r};function pe(){this.templateCache={_cache:{},set:function(n,t){this._cache[n]=t},get:function(n){return this._cache[n]},clear:function(){this._cache={}}}}pe.prototype.clearCache=function(){typeof this.templateCache<"u"&&this.templateCache.clear()};pe.prototype.parse=function(n,t){var r=this.templateCache,a=n+":"+(t||ve.tags).join(":"),o=typeof r<"u",i=o?r.get(a):void 0;return i==null&&(i=o_(n,t),o&&r.set(a,i)),i};pe.prototype.render=function(n,t,r,a){var o=this.getConfigTags(a),i=this.parse(n,o),s=t instanceof ut?t:new ut(t,void 0);return this.renderTokens(i,s,r,n,a)};pe.prototype.renderTokens=function(n,t,r,a,o){for(var i="",s,l,c,p=0,g=n.length;p<g;++p)c=void 0,s=n[p],l=s[0],l==="#"?c=this.renderSection(s,t,r,a,o):l==="^"?c=this.renderInverted(s,t,r,a,o):l===">"?c=this.renderPartial(s,t,r,o):l==="&"?c=this.unescapedValue(s,t):l==="name"?c=this.escapedValue(s,t,o):l==="text"&&(c=this.rawValue(s)),c!==void 0&&(i+=c);return i};pe.prototype.renderSection=function(n,t,r,a,o){var i=this,s="",l=t.lookup(n[1]);function c(m){return i.render(m,t,r,o)}if(l){if(ht(l))for(var p=0,g=l.length;p<g;++p)s+=this.renderTokens(n[4],t.push(l[p]),r,a,o);else if(typeof l=="object"||typeof l=="string"||typeof l=="number")s+=this.renderTokens(n[4],t.push(l),r,a,o);else if(qi(l)){if(typeof a!="string")throw new Error("Cannot use higher-order sections without the original template");l=l.call(t.view,a.slice(n[3],n[5]),c),l!=null&&(s+=l)}else s+=this.renderTokens(n[4],t,r,a,o);return s}};pe.prototype.renderInverted=function(n,t,r,a,o){var i=t.lookup(n[1]);if(!i||ht(i)&&i.length===0)return this.renderTokens(n[4],t,r,a,o)};pe.prototype.indentPartial=function(n,t,r){for(var a=t.replace(/[^ \t]/g,""),o=n.split(`
`),i=0;i<o.length;i++)o[i].length&&(i>0||!r)&&(o[i]=a+o[i]);return o.join(`
`)};pe.prototype.renderPartial=function(n,t,r,a){if(r){var o=this.getConfigTags(a),i=qi(r)?r(n[1]):r[n[1]];if(i!=null){var s=n[6],l=n[5],c=n[4],p=i;l==0&&c&&(p=this.indentPartial(i,c,s));var g=this.parse(p,o);return this.renderTokens(g,t,r,p,a)}}};pe.prototype.unescapedValue=function(n,t){var r=t.lookup(n[1]);if(r!=null)return r};pe.prototype.escapedValue=function(n,t,r){var a=this.getConfigEscape(r)||ve.escape,o=t.lookup(n[1]);if(o!=null)return typeof o=="number"&&a===ve.escape?String(o):a(o)};pe.prototype.rawValue=function(n){return n[1]};pe.prototype.getConfigTags=function(n){return ht(n)?n:n&&typeof n=="object"?n.tags:void 0};pe.prototype.getConfigEscape=function(n){if(n&&typeof n=="object"&&!ht(n))return n.escape};var ve={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(e){nr.templateCache=e},get templateCache(){return nr.templateCache}},nr=new pe;ve.clearCache=function(){return nr.clearCache()};ve.parse=function(n,t){return nr.parse(n,t)};ve.render=function(n,t,r,a){if(typeof n!="string")throw new TypeError('Invalid template! Template should be a "string" but "'+q8(n)+'" was given as the first argument for mustache#render(template, view, partials)');return nr.render(n,t,r,a)};ve.escape=e_;ve.Scanner=sr;ve.Context=ut;ve.Writer=pe;const l_=`/* presentation-md base stylesheet.
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
`,ul=`/* Per-theme surface profiles — each theme gets a distinct stage, not one shared blob. */

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
`;function P_(e){return j_[e]??"gradient"}const M_=Object.assign({"../../../shared/layouts/closing.html":z8,"../../../shared/layouts/code.html":A8,"../../../shared/layouts/comparison.html":I8,"../../../shared/layouts/data-table.html":D8,"../../../shared/layouts/feature-grid.html":O8,"../../../shared/layouts/image-hero.html":B8,"../../../shared/layouts/quote.html":L8,"../../../shared/layouts/section.html":R8,"../../../shared/layouts/stat-row.html":W8,"../../../shared/layouts/timeline.html":G8,"../../../shared/layouts/title.html":U8,"../../../shared/layouts/two-column.html":H8}),rk=new Map;for(const[e,n]of Object.entries(M_)){const t=e.split("/").pop().replace(/\.html$/,"");rk.set(t,n)}function N_(e){return e.length===0?"":`https://fonts.googleapis.com/css2?family=${e.join("&family=")}&display=swap`}const z_=new Set(["http","https","mailto","tel"]);function ak(e){let n="";for(const t of e){const r=t.charCodeAt(0);r>31&&r!==127&&(n+=t)}return n}function ok(e){var n,t;return(t=(n=e.match(/^([a-zA-Z][a-zA-Z0-9+.-]*):/))==null?void 0:n[1])==null?void 0:t.toLowerCase()}function A_(e){if(typeof e!="string")return;const n=ak(e).trim(),t=ok(n);return t&&!z_.has(t)?"#":n}function I_(e){if(typeof e!="string")return;const n=ak(e).trim();if(/^data:image\//i.test(n))return n;const t=ok(n);return t&&t!=="http"&&t!=="https"?"":n}function D_(e){var t;const n={...e};return e.layout==="data-table"&&Array.isArray(e.rows)&&(n.rows=e.rows.map(r=>({cells:r}))),e.layout==="feature-grid"&&(e.columns==="bento"?n.columns="bento":typeof e.columns=="number"?n.columns=e.columns:e.columns||(n.columns=3)),((t=e.cta)==null?void 0:t.href)!==void 0&&(n.cta={...e.cta,href:A_(e.cta.href)}),e.image!==void 0&&(n.image=I_(e.image)),n}const O_='<footer class="pmd-attribution">Made with <a href="https://presentation-md.vercel.app/?ref=studio" target="_blank" rel="noopener">presentation-md</a></footer>',B_=`
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
@media print { .pmd-attribution { opacity: 0.5; } }`;function L_(e){return`<script type="application/json" id="pmd-deck">${JSON.stringify(e).replace(/</g,"\\u003c")}<\/script>`}function ik(e,n){var c,p,g;const t={bg:n.palette.bg,bg2:n.palette.bg2,text:n.palette.text,muted:n.palette.muted,accent:n.palette.accent,accent2:n.palette.accent2,cardBg:n.palette.cardBg,border:n.palette.border,radius:n.geometry.radius,slideW:n.geometry.slideWidth,headingFont:n.typography.headingFont,bodyFont:n.typography.bodyFont,headingWeight:String(n.typography.headingWeight)},r=ve.render(l_,t),a=N_(n.typography.googleFonts),o=P_(n.name);let i=a?`@import url('${a}');

${r}

${ul}`:`${r}

${ul}`;i+=`

${B_}`;const s=(Array.isArray(e.slides)?e.slides:[]).map(m=>{const b=rk.get(m.layout);return b?ve.render(b,D_(m)):`<section class="slide"><h2>Unknown layout: ${m.layout}</h2></section>`}).join(`
`),l=((c=e.meta)==null?void 0:c.title)??((p=e.meta)==null?void 0:p.company)??"Presentation";return ve.render(T_,{title:l,description:((g=e.meta)==null?void 0:g.description)??"",styles:i,slides:s,surface:o,attribution:O_,deckData:L_(e)})}const R_="modulepreload",W_=function(e){return"/studio/"+e},pl={},Qi=function(n,t,r){let a=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),s=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));a=Promise.allSettled(t.map(l=>{if(l=W_(l),l in pl)return;pl[l]=!0;const c=l.endsWith(".css"),p=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${p}`))return;const g=document.createElement("link");if(g.rel=c?"stylesheet":R_,c||(g.as="script"),g.crossOrigin="",g.href=l,s&&g.setAttribute("nonce",s),document.head.appendChild(g),c)return new Promise((m,b)=>{g.addEventListener("load",m),g.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${l}`)))})}))}function o(i){const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=i,window.dispatchEvent(s),!s.defaultPrevented)throw i}return a.then(i=>{for(const s of i||[])s.status==="rejected"&&o(s.reason);return n().catch(o)})};function Yi(e,n){const t=URL.createObjectURL(e),r=document.createElement("a");r.href=t,r.download=n,document.body.appendChild(r),r.click(),r.remove(),URL.revokeObjectURL(t)}function Ki(e,n){var r,a;return`${(((r=e.meta)==null?void 0:r.title)??((a=e.meta)==null?void 0:a.company)??"deck").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"deck"}.${n}`}function sk(e){var n;return((n=e.meta)==null?void 0:n.theme)??"default-tech"}async function G_(e){const n=[],t=dt(sk(e)),{deckToPptxBlob:r}=await Qi(async()=>{const{deckToPptxBlob:o}=await import("./index-BGbRnZJ4.js");return{deckToPptxBlob:o}},__vite__mapDeps([0,1,2])),a=await r(e,t,{prefetchImages:!0,onWarn:o=>n.push(o)});return Yi(a,Ki(e,"pptx")),{warnings:n}}function U_(e){const n=dt(sk(e)),t=ik(e,n);Yi(new Blob([t],{type:"text/html"}),Ki(e,"html"))}function H_(e){Yi(new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),Ki(e,"json"))}function Ji(e){const n=JSON.parse(e);if((n==null?void 0:n.type)!=="deck"||!Array.isArray(n.slides))throw new Error('Not a valid deck: expected { "type": "deck", "slides": [...] }');return n}async function V_(e,n="default-tech"){const{pptxToDeck:t}=await Qi(async()=>{const{pptxToDeck:i}=await import("./index-kRSGI-aH.js");return{pptxToDeck:i}},__vite__mapDeps([3,1,2])),r=[],{deck:a,warnings:o}=await t(new Uint8Array(e),{theme:n,onWarn:i=>r.push(i)});return{deck:a,warnings:[...r,...o]}}function q_(e){var r,a,o;const n=["pmd-deck","psp-deck"];if(typeof DOMParser<"u"){const i=new DOMParser().parseFromString(e,"text/html");for(const s of n){const l=(a=(r=i.getElementById(s))==null?void 0:r.textContent)==null?void 0:a.trim();if(l)return l}}const t=e.match(/<script[^>]*id=["'](?:pmd-deck|psp-deck)["'][^>]*>([\s\S]*?)<\/script>/i);return(o=t==null?void 0:t[1])==null?void 0:o.trim()}function Q_(e){const n=q_(e);if(!n)throw new Error("No editable deck found in this HTML. Only presentations created by presentation-md (with an embedded source) can be opened.");return Ji(n)}function Y_(e,n){return/\.html?$/i.test(e)?Q_(n):Ji(n)}function K_({deck:e,onChange:n,onLoadExample:t,onPresent:r,onGenerate:a}){var _,w,C,$;const o=D.useRef(null),[i,s]=D.useState(""),[l,c]=D.useState(!1),[p,g]=D.useState(""),m=D.useMemo(()=>N8(),[]),b=((_=e.meta)==null?void 0:_.theme)??"default-tech",v=m.find(S=>S.name===b)??{bg:dt(b).palette.bg,accent:dt(b).palette.accent},y=m.filter(S=>{if(!p.trim())return!0;const T=p.trim().toLowerCase();return S.name.toLowerCase().includes(T)||S.vibe.toLowerCase().includes(T)}),j=S=>n({...e,meta:{...e.meta,...S}}),f=S=>j({theme:S}),u=S=>j({title:S}),h=async S=>{try{if(/\.pptx$/i.test(S.name)){c(!0),s("Importing .pptx…");const{deck:Y,warnings:Ue}=await V_(await S.arrayBuffer(),b);n(Y),s(Ue.length?`Imported ${S.name} (${Ue.length} warning${Ue.length>1?"s":""})`:`Imported ${S.name}`);return}const T=Y_(S.name,await S.text());n(T),s(`Opened ${S.name}`)}catch(T){s(`Open failed: ${T.message}`)}finally{c(!1)}},x=async()=>{c(!0),s("Building .pptx…");try{const{warnings:S}=await G_(e);s(S.length?`Exported .pptx (${S.length} warning${S.length>1?"s":""})`:"Exported .pptx")}catch(S){s(`Export failed: ${S.message}`)}finally{c(!1)}};return d.jsxs("header",{className:"toolbar",children:[d.jsxs("div",{className:"brand",children:[d.jsx("a",{className:"brand-link",href:"https://presentation-md.vercel.app/",target:"_blank",rel:"noopener noreferrer",children:d.jsx("strong",{children:"presentation-md"})}),d.jsx("span",{className:"muted small",children:"Studio · live craft"})]}),d.jsx("input",{className:"text-input title-input",value:((w=e.meta)==null?void 0:w.title)??"",placeholder:"Deck title",onChange:S=>u(S.target.value)}),d.jsxs("details",{className:"theme-browser",onToggle:S=>{S.target.open||g("")},children:[d.jsxs("summary",{className:"btn btn-sm theme-trigger",title:"Browse 75 themes",children:[d.jsx("span",{className:"theme-swatch",style:{"--swatch-bg":v.bg,"--swatch-accent":v.accent},"aria-hidden":!0}),d.jsx("span",{children:b}),d.jsx("span",{"aria-hidden":!0,children:"▾"})]}),d.jsxs("div",{className:"theme-browser-panel",children:[d.jsx("input",{className:"text-input theme-search",value:p,placeholder:"Search themes…",autoFocus:!0,onChange:S=>g(S.target.value)}),d.jsxs("div",{className:"theme-count",children:[y.length," / ",m.length," themes"]}),d.jsx("ul",{className:"theme-list",children:y.map(S=>d.jsx("li",{children:d.jsxs("button",{type:"button",className:`theme-option${S.name===b?" active":""}`,onClick:T=>{f(S.name);const Y=T.currentTarget.closest("details");Y&&(Y.open=!1)},children:[d.jsx("span",{className:"theme-swatch",style:{"--swatch-bg":S.bg,"--swatch-accent":S.accent},"aria-hidden":!0}),d.jsxs("span",{className:"theme-option-meta",children:[d.jsx("span",{className:"theme-option-name",children:S.name}),d.jsx("span",{className:"theme-option-vibe",children:S.vibe})]})]})},S.name))})]})]}),d.jsxs("details",{className:"deck-details",children:[d.jsx("summary",{className:"btn btn-sm",children:"Details"}),d.jsxs("div",{className:"deck-details-body",children:[d.jsx("input",{className:"text-input",value:((C=e.meta)==null?void 0:C.company)??"",placeholder:"Company",onChange:S=>j({company:S.target.value})}),d.jsx("input",{className:"text-input",value:(($=e.meta)==null?void 0:$.description)??"",placeholder:"Description",onChange:S=>j({description:S.target.value})})]})]}),d.jsx("div",{className:"spacer"}),d.jsx("button",{className:"btn btn-generate",onClick:a,title:"Generate a deck from a prompt",children:"Generate"}),d.jsx("button",{className:"btn",onClick:t,children:"Example"}),d.jsx("button",{className:"btn",onClick:()=>{var S;return(S=o.current)==null?void 0:S.click()},title:"Open a deck .html, .json, or .pptx",children:"Open"}),d.jsx("button",{className:"btn",onClick:r,title:"Present fullscreen",children:"Present"}),d.jsx("button",{className:"btn",onClick:()=>H_(e),children:"JSON"}),d.jsx("button",{className:"btn",onClick:()=>U_(e),children:"HTML"}),d.jsx("button",{className:"btn btn-primary",disabled:l,onClick:x,children:l?"…":"Download .pptx"}),d.jsx("input",{ref:o,type:"file",accept:".html,.htm,.json,.pptx,application/json,text/html,application/vnd.openxmlformats-officedocument.presentationml.presentation",hidden:!0,onChange:S=>{var Y;const T=(Y=S.target.files)==null?void 0:Y[0];T&&h(T),S.target.value=""}}),i&&d.jsx("span",{className:"status muted small",children:i})]})}function J_({slides:e,selected:n,onSelect:t,onChange:r}){const[a,o]=D.useState("title"),i=()=>{const p=n+1,g=[...e.slice(0,p),Lw(a),...e.slice(p)];r(g,p)},s=p=>{const g=JSON.parse(JSON.stringify(e[p]));r([...e.slice(0,p+1),g,...e.slice(p+1)],p+1)},l=p=>{if(e.length<=1)return;const g=e.filter((m,b)=>b!==p);r(g,Math.max(0,Math.min(p,g.length-1)))},c=(p,g)=>{const m=p+g;if(m<0||m>=e.length)return;const b=e.slice();[b[p],b[m]]=[b[m],b[p]],r(b,m)};return d.jsxs("div",{className:"slide-list",children:[d.jsxs("div",{className:"add-row",children:[d.jsx("select",{className:"text-input",value:a,onChange:p=>o(p.target.value),children:Bw.map(p=>d.jsx("option",{value:p,children:Xo[p]},p))}),d.jsx("button",{className:"btn btn-sm",onClick:i,children:"+ Add"})]}),d.jsx("ul",{className:"slides",children:e.map((p,g)=>d.jsxs("li",{className:`slide-row ${g===n?"active":""}`,onClick:()=>t(g),children:[d.jsxs("div",{className:"slide-row-main",children:[d.jsx("span",{className:"slide-row-num",children:g+1}),d.jsxs("div",{className:"slide-row-text",children:[d.jsxs("span",{className:"slide-row-layout",children:[Xo[p.layout]??p.layout,(p.notes??"").trim()?d.jsx("span",{className:"notes-dot",title:"Has speaker notes","aria-label":"Has speaker notes",children:"N"}):null]}),d.jsx("span",{className:"slide-row-title",children:p.heading??p.quote??p.eyebrow??"—"})]})]}),d.jsxs("div",{className:"slide-row-actions",onClick:m=>m.stopPropagation(),children:[d.jsx("button",{className:"btn btn-icon",title:"Move up",onClick:()=>c(g,-1),children:"↑"}),d.jsx("button",{className:"btn btn-icon",title:"Move down",onClick:()=>c(g,1),children:"↓"}),d.jsx("button",{className:"btn btn-icon",title:"Duplicate",onClick:()=>s(g),children:"⧉"}),d.jsx("button",{className:"btn btn-icon btn-danger",title:"Delete",onClick:()=>l(g),children:"✕"})]})]},g))})]})}function Xi({label:e,children:n}){return d.jsxs("label",{className:"field",children:[d.jsx("span",{className:"field-label",children:e}),n]})}function N({label:e,value:n,onChange:t,placeholder:r}){return d.jsx(Xi,{label:e,children:d.jsx("input",{className:"text-input",type:"text",value:n??"",placeholder:r,onChange:a=>t(a.target.value)})})}function $e({label:e,value:n,onChange:t,rows:r=3}){return d.jsx(Xi,{label:e,children:d.jsx("textarea",{className:"text-input",rows:r,value:n??"",onChange:a=>t(a.target.value)})})}function Er({label:e,value:n,options:t,onChange:r}){return d.jsx(Xi,{label:e,children:d.jsx("select",{className:"text-input",value:n,onChange:a=>r(a.target.value),children:t.map(a=>d.jsx("option",{value:a.value,children:a.label},a.value))})})}function Rr({label:e,items:n,onChange:t,blank:r,renderItem:a}){const o=(s,l)=>t(n.map((c,p)=>p===s?l:c)),i=(s,l)=>{const c=s+l;if(c<0||c>=n.length)return;const p=n.slice();[p[s],p[c]]=[p[c],p[s]],t(p)};return d.jsxs("div",{className:"list-editor",children:[d.jsxs("div",{className:"list-editor-head",children:[d.jsx("span",{className:"field-label",children:e}),d.jsx("button",{className:"btn btn-sm",onClick:()=>t([...n,r()]),children:"+ Add"})]}),n.map((s,l)=>d.jsxs("div",{className:"list-item",children:[d.jsxs("div",{className:"list-item-controls",children:[d.jsx("span",{className:"list-item-index",children:l+1}),d.jsx("div",{className:"spacer"}),d.jsx("button",{className:"btn btn-icon",title:"Move up",onClick:()=>i(l,-1),children:"↑"}),d.jsx("button",{className:"btn btn-icon",title:"Move down",onClick:()=>i(l,1),children:"↓"}),d.jsx("button",{className:"btn btn-icon btn-danger",title:"Remove",onClick:()=>t(n.filter((c,p)=>p!==l)),children:"✕"})]}),a(s,c=>o(l,c),l)]},l)),n.length===0&&d.jsx("p",{className:"muted small",children:"No items yet."})]})}function X_({slide:e,onChange:n}){const t=o=>n({...e,...o}),r=e.layout;return d.jsxs("div",{className:"slide-form",children:[d.jsx("h2",{className:"panel-title",children:Xo[r]??e.layout}),a(),d.jsx($e,{label:"Speaker notes (exports to PPTX notes pane)",value:e.notes,onChange:o=>t({notes:o||void 0}),rows:3})]});function a(){var o,i;switch(e.layout){case"title":case"closing":return d.jsxs(d.Fragment,{children:[d.jsx(N,{label:"Eyebrow",value:e.eyebrow,onChange:s=>t({eyebrow:s})}),d.jsx(N,{label:"Heading",value:e.heading,onChange:s=>t({heading:s})}),d.jsx($e,{label:"Lead",value:e.lead,onChange:s=>t({lead:s})}),e.layout==="closing"&&d.jsxs(d.Fragment,{children:[d.jsx(N,{label:"CTA label",value:(o=e.cta)==null?void 0:o.label,onChange:s=>t({cta:{...e.cta,label:s}})}),d.jsx(N,{label:"CTA link",value:(i=e.cta)==null?void 0:i.href,onChange:s=>t({cta:{...e.cta,href:s}})})]})]});case"section":return d.jsxs(d.Fragment,{children:[d.jsx(N,{label:"Number",value:e.number,onChange:s=>t({number:s})}),d.jsx(N,{label:"Eyebrow",value:e.eyebrow,onChange:s=>t({eyebrow:s})}),d.jsx(N,{label:"Heading",value:e.heading,onChange:s=>t({heading:s})}),d.jsx($e,{label:"Lead",value:e.lead,onChange:s=>t({lead:s})})]});case"two-column":return d.jsxs(d.Fragment,{children:[d.jsx(N,{label:"Eyebrow",value:e.eyebrow,onChange:s=>t({eyebrow:s})}),d.jsx(N,{label:"Heading",value:e.heading,onChange:s=>t({heading:s})}),d.jsx($e,{label:"Body",value:e.body,onChange:s=>t({body:s}),rows:5}),d.jsx(Er,{label:"Ratio",value:typeof e.ratio=="string"?e.ratio:"1-1",options:[{value:"1-1",label:"1:1 balanced"},{value:"2-1",label:"2:1 copy-heavy"},{value:"1-2",label:"1:2 media-heavy"},{value:"3-2",label:"3:2"},{value:"2-3",label:"2:3"}],onChange:s=>t({ratio:s})}),d.jsx(Er,{label:"Media side",value:e.reverse?"left":"right",options:[{value:"right",label:"Media on right"},{value:"left",label:"Media on left (reverse)"}],onChange:s=>t({reverse:s==="left"})}),d.jsx(N,{label:"Image URL (remote images prefetched into PPTX)",value:e.image,onChange:s=>t({image:s})}),d.jsx(N,{label:"Image alt",value:e.imageAlt,onChange:s=>t({imageAlt:s})}),d.jsx($e,{label:"Aside (when no image)",value:e.aside,onChange:s=>t({aside:s}),rows:3})]});case"image-hero":return d.jsxs(d.Fragment,{children:[d.jsx(N,{label:"Eyebrow",value:e.eyebrow,onChange:s=>t({eyebrow:s})}),d.jsx(N,{label:"Heading",value:e.heading,onChange:s=>t({heading:s})}),d.jsx($e,{label:"Lead",value:e.lead,onChange:s=>t({lead:s}),rows:3}),d.jsx(N,{label:"Image URL (remote images prefetched into PPTX)",value:e.image,onChange:s=>t({image:s})}),d.jsx(N,{label:"Image alt",value:e.imageAlt,onChange:s=>t({imageAlt:s})})]});case"comparison":return d.jsxs(d.Fragment,{children:[d.jsx(N,{label:"Eyebrow",value:e.eyebrow,onChange:s=>t({eyebrow:s})}),d.jsx(N,{label:"Heading",value:e.heading,onChange:s=>t({heading:s})}),d.jsx(N,{label:"Left label",value:e.leftLabel,onChange:s=>t({leftLabel:s})}),d.jsx($e,{label:"Left body",value:e.left,onChange:s=>t({left:s}),rows:4}),d.jsx(N,{label:"Right label",value:e.rightLabel,onChange:s=>t({rightLabel:s})}),d.jsx($e,{label:"Right body",value:e.right,onChange:s=>t({right:s}),rows:4}),d.jsx(Er,{label:"Emphasis",value:e.emphasis==="left"||e.emphasis==="right"?e.emphasis:"right",options:[{value:"left",label:"Grow left"},{value:"right",label:"Grow right"}],onChange:s=>t({emphasis:s})})]});case"code":return d.jsxs(d.Fragment,{children:[d.jsx(N,{label:"Eyebrow",value:e.eyebrow,onChange:s=>t({eyebrow:s})}),d.jsx(N,{label:"Heading",value:e.heading,onChange:s=>t({heading:s})}),d.jsx(N,{label:"Filename",value:e.filename,onChange:s=>t({filename:s})}),d.jsx(N,{label:"Language",value:e.language,onChange:s=>t({language:s})}),d.jsx($e,{label:"Code",value:e.code,onChange:s=>t({code:s}),rows:8})]});case"quote":return d.jsxs(d.Fragment,{children:[d.jsx($e,{label:"Quote",value:e.quote,onChange:s=>t({quote:s}),rows:4}),d.jsx(N,{label:"Attribution",value:e.by,onChange:s=>t({by:s})})]});case"feature-grid":return d.jsxs(d.Fragment,{children:[d.jsx(N,{label:"Eyebrow",value:e.eyebrow,onChange:s=>t({eyebrow:s})}),d.jsx(N,{label:"Heading",value:e.heading,onChange:s=>t({heading:s})}),d.jsx(Er,{label:"Columns",value:e.columns==="bento"?"bento":String(typeof e.columns=="number"?e.columns:3),options:[{value:"2",label:"2 columns"},{value:"3",label:"3 columns"},{value:"4",label:"4 columns"},{value:"bento",label:"Bento (hero + satellites)"}],onChange:s=>t({columns:s==="bento"?"bento":Number(s)})}),d.jsx(Rr,{label:"Cards",items:e.cards??[],onChange:s=>t({cards:s}),blank:()=>({title:"New card",body:""}),renderItem:(s,l)=>d.jsxs(d.Fragment,{children:[d.jsx(N,{label:"Icon (FontAwesome class)",value:s.icon,onChange:c=>l({...s,icon:c})}),d.jsx(N,{label:"Title",value:s.title,onChange:c=>l({...s,title:c})}),d.jsx($e,{label:"Body",value:s.body,onChange:c=>l({...s,body:c}),rows:2})]})})]});case"stat-row":return d.jsxs(d.Fragment,{children:[d.jsx(N,{label:"Eyebrow",value:e.eyebrow,onChange:s=>t({eyebrow:s})}),d.jsx(N,{label:"Heading",value:e.heading,onChange:s=>t({heading:s})}),d.jsx(Rr,{label:"Stats",items:e.stats??[],onChange:s=>t({stats:s}),blank:()=>({value:"0",label:"Metric"}),renderItem:(s,l)=>d.jsxs(d.Fragment,{children:[d.jsx(N,{label:"Value",value:s.value,onChange:c=>l({...s,value:c})}),d.jsx(N,{label:"Label",value:s.label,onChange:c=>l({...s,label:c})})]})})]});case"timeline":return d.jsxs(d.Fragment,{children:[d.jsx(N,{label:"Eyebrow",value:e.eyebrow,onChange:s=>t({eyebrow:s})}),d.jsx(N,{label:"Heading",value:e.heading,onChange:s=>t({heading:s})}),d.jsx(Rr,{label:"Steps",items:e.steps??[],onChange:s=>t({steps:s}),blank:()=>({title:"New step",body:""}),renderItem:(s,l)=>d.jsxs(d.Fragment,{children:[d.jsx(N,{label:"Title",value:s.title,onChange:c=>l({...s,title:c})}),d.jsx($e,{label:"Body",value:s.body,onChange:c=>l({...s,body:c}),rows:2})]})})]});case"data-table":return d.jsx(Z_,{slide:e,set:t});default:return d.jsx("p",{className:"muted",children:"No editable fields for this layout."})}}}function Z_({slide:e,set:n}){const t=Array.isArray(e.columns)?e.columns:[],r=Array.isArray(e.rows)?e.rows:[],a=Math.max(t.length,...r.map(l=>l.length),1),o=(l,c)=>{const p=t.slice();p[l]=c,n({columns:p})},i=()=>{n({columns:[...t,`Column ${t.length+1}`],rows:r.map(l=>[...l,""])})},s=l=>{n({columns:t.filter((c,p)=>p!==l),rows:r.map(c=>c.filter((p,g)=>g!==l))})};return d.jsxs(d.Fragment,{children:[d.jsx(N,{label:"Eyebrow",value:e.eyebrow,onChange:l=>n({eyebrow:l})}),d.jsx(N,{label:"Heading",value:e.heading,onChange:l=>n({heading:l})}),d.jsxs("div",{className:"list-editor",children:[d.jsxs("div",{className:"list-editor-head",children:[d.jsx("span",{className:"field-label",children:"Columns"}),d.jsx("button",{className:"btn btn-sm",onClick:i,children:"+ Column"})]}),Array.from({length:a}).map((l,c)=>d.jsxs("div",{className:"row-inline",children:[d.jsx("input",{className:"text-input",value:t[c]??"",placeholder:`Column ${c+1}`,onChange:p=>o(c,p.target.value)}),d.jsx("button",{className:"btn btn-icon btn-danger",title:"Remove column",onClick:()=>s(c),children:"✕"})]},c))]}),d.jsx(Rr,{label:"Rows",items:r,onChange:l=>n({rows:l}),blank:()=>Array.from({length:a},()=>""),renderItem:(l,c)=>d.jsx("div",{className:"row-cells",children:Array.from({length:a}).map((p,g)=>d.jsx("input",{className:"text-input",value:l[g]??"",placeholder:t[g]??`Col ${g+1}`,onChange:m=>{const b=l.slice();for(;b.length<a;)b.push("");b[g]=m.target.value,c(b)}},g))})})]})}function eS({html:e}){return d.jsx("div",{className:"preview",children:d.jsx("iframe",{className:"preview-frame",title:"Deck preview",srcDoc:e,sandbox:"allow-same-origin",referrerPolicy:"no-referrer"})})}const nS=`
html { scroll-behavior: smooth; scroll-snap-type: y mandatory; }
body { gap: 0 !important; padding: 0 !important; }
.slide { min-height: 100vh !important; margin: 0 !important; border-radius: 0 !important; scroll-snap-align: start !important; scroll-snap-stop: always !important; }
.pmd-attribution { display: none !important; }
`;function tS({html:e,slideCount:n,notes:t=[],onClose:r}){const a=D.useRef(null),[o,i]=D.useState(0),[s,l]=D.useState(!0),c=e.replace("</head>",`<style>${nS}</style></head>`),p=(t[o]??"").trim(),g=t.some(b=>(b??"").trim().length>0),m=b=>i(v=>Math.max(0,Math.min(n-1,v+b)));return D.useEffect(()=>{const b=v=>{v.key==="Escape"?r():v.key==="s"||v.key==="S"?(v.preventDefault(),l(y=>!y)):v.key==="ArrowRight"||v.key===" "||v.key==="PageDown"?(v.preventDefault(),i(y=>Math.min(n-1,y+1))):(v.key==="ArrowLeft"||v.key==="PageUp")&&(v.preventDefault(),i(y=>Math.max(0,y-1)))};return window.addEventListener("keydown",b),()=>window.removeEventListener("keydown",b)},[r,n]),D.useEffect(()=>{var y,j;const b=(y=a.current)==null?void 0:y.contentDocument,v=b==null?void 0:b.querySelectorAll("section.slide");(j=v==null?void 0:v[o])==null||j.scrollIntoView({behavior:"smooth",block:"start"})},[o,c]),d.jsxs("div",{className:"present-overlay",children:[d.jsxs("div",{className:"present-main",children:[d.jsx("div",{className:"present-stage",children:d.jsx("iframe",{ref:a,className:"present-frame",title:"Present deck",srcDoc:c,sandbox:"allow-same-origin"})}),s&&d.jsxs("aside",{className:"present-notes","aria-label":"Speaker notes",children:[d.jsx("div",{className:"present-notes-label",children:"Speaker notes · S to hide"}),p?d.jsx("p",{className:"present-notes-body",children:p}):d.jsx("p",{className:"present-notes-empty",children:g?"No notes on this slide.":"No speaker notes yet — add them in the slide form (exports to PPTX)."})]})]}),d.jsxs("div",{className:"present-bar",children:[d.jsx("button",{className:"btn btn-icon",title:"Previous (←)",onClick:()=>m(-1),children:"←"}),d.jsxs("span",{className:"present-count",children:[o+1," / ",n]}),d.jsx("button",{className:"btn btn-icon",title:"Next (→)",onClick:()=>m(1),children:"→"}),d.jsx("button",{className:"btn",title:"Toggle speaker notes (S)",onClick:()=>l(b=>!b),children:s?"Hide notes · S":"Notes · S"}),d.jsx("button",{className:"btn",onClick:r,children:"Exit · Esc"})]})]})}const fl=[{id:"claude-opus-4-8",label:"Opus 4.8 — most capable"},{id:"claude-sonnet-4-6",label:"Sonnet 4.6 — faster, cheaper"},{id:"claude-haiku-4-5",label:"Haiku 4.5 — fastest"}],lk=`You author slide decks as a single JSON object matching this schema — the "Deck JSON" spec used by presentation-md.

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
- Only emit fields defined above. Do not invent new layouts or fields.`;function ck(e,n){return`Create a deck for the following brief. Set meta.theme to "${n}".

Brief:
${e.trim()}`}function rS(e,n){return`${lk}

${ck(e,n)}

Respond with ONLY the JSON object — no prose, no markdown fences.`}function aS(e){const n=e.match(/```(?:json)?\s*([\s\S]*?)```/i),t=((n==null?void 0:n[1])??e).trim(),r=t.indexOf("{"),a=t.lastIndexOf("}");return r===-1||a===-1||a<r?t:t.slice(r,a+1)}async function oS(e){const{apiKey:n,model:t,brief:r,theme:a,signal:o}=e;if(!r.trim())throw new Error("Describe your deck first.");if(!n.trim())throw new Error("Enter your Anthropic API key.");const{default:i}=await Qi(async()=>{const{default:g}=await import("./index-Ci0KYd1T.js");return{default:g}},__vite__mapDeps([4,2])),c=(await new i({apiKey:n.trim(),dangerouslyAllowBrowser:!0}).messages.create({model:t,max_tokens:8e3,system:lk,messages:[{role:"user",content:`${ck(r,a)}

Respond with ONLY the JSON object — no prose, no markdown fences.`}]},{signal:o})).content.map(g=>g.type==="text"?g.text:"").join("");if(!c.trim())throw new Error("The model returned an empty response. Try again.");let p;try{p=Ji(aS(c))}catch(g){throw new Error(`Couldn't parse the generated deck: ${g.message}`)}return p.meta={...p.meta,theme:a},p}const Cr="pmd-studio-anthropic-key",iS=["Q3 all-hands: momentum, key metrics, roadmap, and what's next.","Seed pitch for an AI-native analytics tool — problem, product, traction, ask.","Launch deck for a developer CLI: what it is, how it works, why it's fast."];function sS({currentTheme:e,onGenerate:n,onClose:t}){const[r,a]=D.useState(""),[o,i]=D.useState(e),[s,l]=D.useState(fl[0].id),[c,p]=D.useState(()=>localStorage.getItem(Cr)??""),[g,m]=D.useState(()=>!!localStorage.getItem(Cr)),[b,v]=D.useState(!1),[y,j]=D.useState(""),[f,u]=D.useState(!1),h=tk(),x=async()=>{v(!0),j("Generating your deck…");try{g?localStorage.setItem(Cr,c.trim()):localStorage.removeItem(Cr);const w=await oS({apiKey:c,model:s,brief:r,theme:o});n(w),t()}catch(w){j(w.message)}finally{v(!1)}},_=async()=>{try{await navigator.clipboard.writeText(rS(r,o)),u(!0),setTimeout(()=>u(!1),1800)}catch{j("Couldn't copy — select the prompt manually.")}};return d.jsx("div",{className:"modal-overlay",onClick:t,children:d.jsxs("div",{className:"modal",onClick:w=>w.stopPropagation(),children:[d.jsxs("header",{className:"modal-head",children:[d.jsxs("div",{children:[d.jsx("strong",{children:"Generate a deck"}),d.jsx("span",{className:"muted small",children:"Describe it — get an editable deck in seconds."})]}),d.jsx("button",{className:"btn btn-sm",onClick:t,"aria-label":"Close",children:"✕"})]}),d.jsxs("div",{className:"modal-body",children:[d.jsx("label",{className:"field-label",children:"What's the deck about?"}),d.jsx("textarea",{className:"text-input brief-input",value:r,placeholder:"e.g. Q3 all-hands covering revenue, product wins, and the roadmap for next quarter.",rows:4,onChange:w=>a(w.target.value)}),d.jsx("div",{className:"chip-row",children:iS.map(w=>d.jsx("button",{className:"chip",onClick:()=>a(w),title:"Use this brief",children:w.split(/[:—]/)[0].trim()},w))}),d.jsxs("div",{className:"field-grid",children:[d.jsxs("label",{className:"inline-field",children:[d.jsx("span",{className:"muted small",children:"Theme"}),d.jsx("select",{className:"text-input",value:o,onChange:w=>i(w.target.value),children:h.map(w=>d.jsx("option",{value:w,children:w},w))})]}),d.jsxs("label",{className:"inline-field",children:[d.jsx("span",{className:"muted small",children:"Model"}),d.jsx("select",{className:"text-input",value:s,onChange:w=>l(w.target.value),children:fl.map(w=>d.jsx("option",{value:w.id,children:w.label},w.id))})]})]}),d.jsxs("div",{className:"gen-panel",children:[d.jsx("label",{className:"field-label",children:"Your Anthropic API key"}),d.jsx("input",{className:"text-input",type:"password",value:c,placeholder:"sk-ant-…",autoComplete:"off",onChange:w=>p(w.target.value)}),d.jsxs("label",{className:"checkbox-field",children:[d.jsx("input",{type:"checkbox",checked:g,onChange:w=>m(w.target.checked)}),d.jsx("span",{className:"muted small",children:"Remember on this device (stored only in your browser)"})]}),d.jsxs("p",{className:"muted small privacy-note",children:["Your key stays in this browser. Requests go straight to Anthropic — nothing is sent to our servers. Get a key at ",d.jsx("a",{href:"https://console.anthropic.com/settings/keys",target:"_blank",rel:"noreferrer",children:"console.anthropic.com"}),"."]}),d.jsx("button",{className:"btn btn-primary btn-block",disabled:b,onClick:x,children:b?"Generating…":"Generate deck"})]}),d.jsx("div",{className:"gen-divider",children:d.jsx("span",{children:"or hand it to your agent"})}),d.jsxs("div",{className:"gen-panel",children:[d.jsx("p",{className:"muted small",children:"No key? Copy a ready-made prompt and paste it into Claude Code, Cursor, or any agent with the presentation skill installed — then open the resulting deck here."}),d.jsx("button",{className:"btn btn-block",onClick:_,disabled:!r.trim(),children:f?"Copied ✓":"Copy prompt for your agent"})]}),y&&d.jsx("p",{className:"status muted small gen-status",children:y})]})]})})}const dk="pmd-studio-deck-v1";function lS(){try{const e=localStorage.getItem(dk);if(e){const n=JSON.parse(e);if((n==null?void 0:n.type)==="deck"&&Array.isArray(n.slides)&&n.slides.length)return n}}catch{}return Ed}function cS(){var b;const[e,n]=D.useState(lS),[t,r]=D.useState(0),[a,o]=D.useState(!1),[i,s]=D.useState(!1);D.useEffect(()=>{try{localStorage.setItem(dk,JSON.stringify(e))}catch{}},[e]);const l=D.useMemo(()=>{var v;try{return ik(e,dt(((v=e.meta)==null?void 0:v.theme)??"default-tech"))}catch(y){return`<pre style="color:#d9695a;font-family:monospace;padding:24px">${String(y)}</pre>`}},[e]),c=(v,y)=>{n({...e,slides:v}),y!==void 0&&r(y)},p=v=>{n({...e,slides:e.slides.map((y,j)=>j===t?v:y)})},g=()=>{n(Ed),r(0)},m=e.slides[Math.min(t,e.slides.length-1)];return d.jsxs("div",{className:"app",children:[d.jsx(K_,{deck:e,onChange:n,onLoadExample:g,onPresent:()=>o(!0),onGenerate:()=>s(!0)}),d.jsxs("div",{className:"studio-strip",role:"note",children:[d.jsx("span",{children:"Live preview · Open HTML / JSON / PPTX · Present with notes · Export editable PPTX"}),d.jsx("a",{href:"https://presentation-md.vercel.app/",target:"_blank",rel:"noopener noreferrer",children:"Docs & gallery"})]}),d.jsxs("div",{className:"workspace",children:[d.jsx("aside",{className:"panel panel-left",children:d.jsx(J_,{slides:e.slides,selected:t,onSelect:r,onChange:c})}),d.jsx("main",{className:"panel panel-center",children:d.jsx(eS,{html:l})}),d.jsx("aside",{className:"panel panel-right",children:m?d.jsx(X_,{slide:m,onChange:p}):d.jsx("p",{className:"muted",children:"No slide selected."})})]}),a&&d.jsx(tS,{html:l,slideCount:e.slides.length,notes:e.slides.map(v=>v.notes),onClose:()=>o(!1)}),i&&d.jsx(sS,{currentTheme:((b=e.meta)==null?void 0:b.theme)??"claude",onGenerate:v=>{n(v),r(0)},onClose:()=>s(!1)})]})}const uk=document.getElementById("root");if(!uk)throw new Error("Missing #root element");Fd(uk).render(d.jsx(D.StrictMode,{children:d.jsx(cS,{})}));export{Qi as _};
