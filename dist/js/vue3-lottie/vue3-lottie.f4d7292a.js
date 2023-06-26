import{L as ht}from"../lottie-web/lottie-web.b83481e1.js";import{G as bt,h as _e,m as _t,i as $t,f as mt,o as Tt,c as At,X as Ot}from"../@vue/@vue.15611f31.js";var wt=typeof global=="object"&&global&&global.Object===Object&&global,qe=wt,St=typeof self=="object"&&self&&self.Object===Object&&self,jt=qe||St||Function("return this")(),A=jt,Pt=A.Symbol,j=Pt,Ye=Object.prototype,Et=Ye.hasOwnProperty,Lt=Ye.toString,N=j?j.toStringTag:void 0;function Ct(e){var t=Et.call(e,N),r=e[N];try{e[N]=void 0;var n=!0}catch{}var i=Lt.call(e);return n&&(t?e[N]=r:delete e[N]),i}var xt=Object.prototype,It=xt.toString;function Dt(e){return It.call(e)}var Mt="[object Null]",Ft="[object Undefined]",$e=j?j.toStringTag:void 0;function q(e){return e==null?e===void 0?Ft:Mt:$e&&$e in Object(e)?Ct(e):Dt(e)}function L(e){return e!=null&&typeof e=="object"}var Bt=Array.isArray,G=Bt;function Y(e){var t=typeof e;return e!=null&&(t=="object"||t=="function")}var Ht="[object AsyncFunction]",Nt="[object Function]",Rt="[object GeneratorFunction]",Gt="[object Proxy]";function We(e){if(!Y(e))return!1;var t=q(e);return t==Nt||t==Rt||t==Ht||t==Gt}var Ut=A["__core-js_shared__"],re=Ut,me=function(){var e=/[^.]+$/.exec(re&&re.keys&&re.keys.IE_PROTO||"");return e?"Symbol(src)_1."+e:""}();function Kt(e){return!!me&&me in e}var zt=Function.prototype,qt=zt.toString;function x(e){if(e!=null){try{return qt.call(e)}catch{}try{return e+""}catch{}}return""}var Yt=/[\\^$.*+?()[\]{}|]/g,Wt=/^\[object .+?Constructor\]$/,Xt=Function.prototype,Jt=Object.prototype,Vt=Xt.toString,Zt=Jt.hasOwnProperty,Qt=RegExp("^"+Vt.call(Zt).replace(Yt,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function kt(e){if(!Y(e)||Kt(e))return!1;var t=We(e)?Qt:Wt;return t.test(x(e))}function er(e,t){return e==null?void 0:e[t]}function I(e,t){var r=er(e,t);return kt(r)?r:void 0}var tr=I(A,"WeakMap"),ie=tr,Te=Object.create,rr=function(){function e(){}return function(t){if(!Y(t))return{};if(Te)return Te(t);e.prototype=t;var r=new e;return e.prototype=void 0,r}}(),nr=rr;function ar(e,t){var r=-1,n=e.length;for(t||(t=Array(n));++r<n;)t[r]=e[r];return t}var or=function(){try{var e=I(Object,"defineProperty");return e({},"",{}),e}catch{}}(),Ae=or;function ir(e,t){for(var r=-1,n=e==null?0:e.length;++r<n&&t(e[r],r,e)!==!1;);return e}var sr=9007199254740991,ur=/^(?:0|[1-9]\d*)$/;function fr(e,t){var r=typeof e;return t=t??sr,!!t&&(r=="number"||r!="symbol"&&ur.test(e))&&e>-1&&e%1==0&&e<t}function Xe(e,t,r){t=="__proto__"&&Ae?Ae(e,t,{configurable:!0,enumerable:!0,value:r,writable:!0}):e[t]=r}function le(e,t){return e===t||e!==e&&t!==t}var cr=Object.prototype,lr=cr.hasOwnProperty;function Je(e,t,r){var n=e[t];(!(lr.call(e,t)&&le(n,r))||r===void 0&&!(t in e))&&Xe(e,t,r)}function k(e,t,r,n){var i=!r;r||(r={});for(var a=-1,o=t.length;++a<o;){var s=t[a],u=n?n(r[s],e[s],s,r,e):void 0;u===void 0&&(u=e[s]),i?Xe(r,s,u):Je(r,s,u)}return r}var pr=9007199254740991;function Ve(e){return typeof e=="number"&&e>-1&&e%1==0&&e<=pr}function Ze(e){return e!=null&&Ve(e.length)&&!We(e)}var gr=Object.prototype;function pe(e){var t=e&&e.constructor,r=typeof t=="function"&&t.prototype||gr;return e===r}function dr(e,t){for(var r=-1,n=Array(e);++r<e;)n[r]=t(r);return n}var vr="[object Arguments]";function Oe(e){return L(e)&&q(e)==vr}var Qe=Object.prototype,yr=Qe.hasOwnProperty,hr=Qe.propertyIsEnumerable,br=Oe(function(){return arguments}())?Oe:function(e){return L(e)&&yr.call(e,"callee")&&!hr.call(e,"callee")},_r=br;function $r(){return!1}var ke=typeof exports=="object"&&exports&&!exports.nodeType&&exports,we=ke&&typeof module=="object"&&module&&!module.nodeType&&module,mr=we&&we.exports===ke,Se=mr?A.Buffer:void 0,Tr=Se?Se.isBuffer:void 0,Ar=Tr||$r,V=Ar,Or="[object Arguments]",wr="[object Array]",Sr="[object Boolean]",jr="[object Date]",Pr="[object Error]",Er="[object Function]",Lr="[object Map]",Cr="[object Number]",xr="[object Object]",Ir="[object RegExp]",Dr="[object Set]",Mr="[object String]",Fr="[object WeakMap]",Br="[object ArrayBuffer]",Hr="[object DataView]",Nr="[object Float32Array]",Rr="[object Float64Array]",Gr="[object Int8Array]",Ur="[object Int16Array]",Kr="[object Int32Array]",zr="[object Uint8Array]",qr="[object Uint8ClampedArray]",Yr="[object Uint16Array]",Wr="[object Uint32Array]",p={};p[Nr]=p[Rr]=p[Gr]=p[Ur]=p[Kr]=p[zr]=p[qr]=p[Yr]=p[Wr]=!0;p[Or]=p[wr]=p[Br]=p[Sr]=p[Hr]=p[jr]=p[Pr]=p[Er]=p[Lr]=p[Cr]=p[xr]=p[Ir]=p[Dr]=p[Mr]=p[Fr]=!1;function Xr(e){return L(e)&&Ve(e.length)&&!!p[q(e)]}function ge(e){return function(t){return e(t)}}var et=typeof exports=="object"&&exports&&!exports.nodeType&&exports,R=et&&typeof module=="object"&&module&&!module.nodeType&&module,Jr=R&&R.exports===et,ne=Jr&&qe.process,Vr=function(){try{var e=R&&R.require&&R.require("util").types;return e||ne&&ne.binding&&ne.binding("util")}catch{}}(),B=Vr,je=B&&B.isTypedArray,Zr=je?ge(je):Xr,tt=Zr,Qr=Object.prototype,kr=Qr.hasOwnProperty;function rt(e,t){var r=G(e),n=!r&&_r(e),i=!r&&!n&&V(e),a=!r&&!n&&!i&&tt(e),o=r||n||i||a,s=o?dr(e.length,String):[],u=s.length;for(var c in e)(t||kr.call(e,c))&&!(o&&(c=="length"||i&&(c=="offset"||c=="parent")||a&&(c=="buffer"||c=="byteLength"||c=="byteOffset")||fr(c,u)))&&s.push(c);return s}function nt(e,t){return function(r){return e(t(r))}}var en=nt(Object.keys,Object),tn=en,rn=Object.prototype,nn=rn.hasOwnProperty;function an(e){if(!pe(e))return tn(e);var t=[];for(var r in Object(e))nn.call(e,r)&&r!="constructor"&&t.push(r);return t}function de(e){return Ze(e)?rt(e):an(e)}function on(e){var t=[];if(e!=null)for(var r in Object(e))t.push(r);return t}var sn=Object.prototype,un=sn.hasOwnProperty;function fn(e){if(!Y(e))return on(e);var t=pe(e),r=[];for(var n in e)n=="constructor"&&(t||!un.call(e,n))||r.push(n);return r}function ve(e){return Ze(e)?rt(e,!0):fn(e)}var cn=I(Object,"create"),U=cn;function ln(){this.__data__=U?U(null):{},this.size=0}function pn(e){var t=this.has(e)&&delete this.__data__[e];return this.size-=t?1:0,t}var gn="__lodash_hash_undefined__",dn=Object.prototype,vn=dn.hasOwnProperty;function yn(e){var t=this.__data__;if(U){var r=t[e];return r===gn?void 0:r}return vn.call(t,e)?t[e]:void 0}var hn=Object.prototype,bn=hn.hasOwnProperty;function _n(e){var t=this.__data__;return U?t[e]!==void 0:bn.call(t,e)}var $n="__lodash_hash_undefined__";function mn(e,t){var r=this.__data__;return this.size+=this.has(e)?0:1,r[e]=U&&t===void 0?$n:t,this}function C(e){var t=-1,r=e==null?0:e.length;for(this.clear();++t<r;){var n=e[t];this.set(n[0],n[1])}}C.prototype.clear=ln;C.prototype.delete=pn;C.prototype.get=yn;C.prototype.has=_n;C.prototype.set=mn;function Tn(){this.__data__=[],this.size=0}function ee(e,t){for(var r=e.length;r--;)if(le(e[r][0],t))return r;return-1}var An=Array.prototype,On=An.splice;function wn(e){var t=this.__data__,r=ee(t,e);if(r<0)return!1;var n=t.length-1;return r==n?t.pop():On.call(t,r,1),--this.size,!0}function Sn(e){var t=this.__data__,r=ee(t,e);return r<0?void 0:t[r][1]}function jn(e){return ee(this.__data__,e)>-1}function Pn(e,t){var r=this.__data__,n=ee(r,e);return n<0?(++this.size,r.push([e,t])):r[n][1]=t,this}function S(e){var t=-1,r=e==null?0:e.length;for(this.clear();++t<r;){var n=e[t];this.set(n[0],n[1])}}S.prototype.clear=Tn;S.prototype.delete=wn;S.prototype.get=Sn;S.prototype.has=jn;S.prototype.set=Pn;var En=I(A,"Map"),K=En;function Ln(){this.size=0,this.__data__={hash:new C,map:new(K||S),string:new C}}function Cn(e){var t=typeof e;return t=="string"||t=="number"||t=="symbol"||t=="boolean"?e!=="__proto__":e===null}function te(e,t){var r=e.__data__;return Cn(t)?r[typeof t=="string"?"string":"hash"]:r.map}function xn(e){var t=te(this,e).delete(e);return this.size-=t?1:0,t}function In(e){return te(this,e).get(e)}function Dn(e){return te(this,e).has(e)}function Mn(e,t){var r=te(this,e),n=r.size;return r.set(e,t),this.size+=r.size==n?0:1,this}function D(e){var t=-1,r=e==null?0:e.length;for(this.clear();++t<r;){var n=e[t];this.set(n[0],n[1])}}D.prototype.clear=Ln;D.prototype.delete=xn;D.prototype.get=In;D.prototype.has=Dn;D.prototype.set=Mn;function at(e,t){for(var r=-1,n=t.length,i=e.length;++r<n;)e[i+r]=t[r];return e}var Fn=nt(Object.getPrototypeOf,Object),ot=Fn;function Bn(){this.__data__=new S,this.size=0}function Hn(e){var t=this.__data__,r=t.delete(e);return this.size=t.size,r}function Nn(e){return this.__data__.get(e)}function Rn(e){return this.__data__.has(e)}var Gn=200;function Un(e,t){var r=this.__data__;if(r instanceof S){var n=r.__data__;if(!K||n.length<Gn-1)return n.push([e,t]),this.size=++r.size,this;r=this.__data__=new D(n)}return r.set(e,t),this.size=r.size,this}function w(e){var t=this.__data__=new S(e);this.size=t.size}w.prototype.clear=Bn;w.prototype.delete=Hn;w.prototype.get=Nn;w.prototype.has=Rn;w.prototype.set=Un;function Kn(e,t){return e&&k(t,de(t),e)}function zn(e,t){return e&&k(t,ve(t),e)}var it=typeof exports=="object"&&exports&&!exports.nodeType&&exports,Pe=it&&typeof module=="object"&&module&&!module.nodeType&&module,qn=Pe&&Pe.exports===it,Ee=qn?A.Buffer:void 0,Le=Ee?Ee.allocUnsafe:void 0;function Yn(e,t){if(t)return e.slice();var r=e.length,n=Le?Le(r):new e.constructor(r);return e.copy(n),n}function Wn(e,t){for(var r=-1,n=e==null?0:e.length,i=0,a=[];++r<n;){var o=e[r];t(o,r,e)&&(a[i++]=o)}return a}function st(){return[]}var Xn=Object.prototype,Jn=Xn.propertyIsEnumerable,Ce=Object.getOwnPropertySymbols,Vn=Ce?function(e){return e==null?[]:(e=Object(e),Wn(Ce(e),function(t){return Jn.call(e,t)}))}:st,ye=Vn;function Zn(e,t){return k(e,ye(e),t)}var Qn=Object.getOwnPropertySymbols,kn=Qn?function(e){for(var t=[];e;)at(t,ye(e)),e=ot(e);return t}:st,ut=kn;function ea(e,t){return k(e,ut(e),t)}function ft(e,t,r){var n=t(e);return G(e)?n:at(n,r(e))}function se(e){return ft(e,de,ye)}function ta(e){return ft(e,ve,ut)}var ra=I(A,"DataView"),ue=ra,na=I(A,"Promise"),fe=na,aa=I(A,"Set"),ce=aa,xe="[object Map]",oa="[object Object]",Ie="[object Promise]",De="[object Set]",Me="[object WeakMap]",Fe="[object DataView]",ia=x(ue),sa=x(K),ua=x(fe),fa=x(ce),ca=x(ie),E=q;(ue&&E(new ue(new ArrayBuffer(1)))!=Fe||K&&E(new K)!=xe||fe&&E(fe.resolve())!=Ie||ce&&E(new ce)!=De||ie&&E(new ie)!=Me)&&(E=function(e){var t=q(e),r=t==oa?e.constructor:void 0,n=r?x(r):"";if(n)switch(n){case ia:return Fe;case sa:return xe;case ua:return Ie;case fa:return De;case ca:return Me}return t});var z=E,la=Object.prototype,pa=la.hasOwnProperty;function ga(e){var t=e.length,r=new e.constructor(t);return t&&typeof e[0]=="string"&&pa.call(e,"index")&&(r.index=e.index,r.input=e.input),r}var da=A.Uint8Array,Z=da;function he(e){var t=new e.constructor(e.byteLength);return new Z(t).set(new Z(e)),t}function va(e,t){var r=t?he(e.buffer):e.buffer;return new e.constructor(r,e.byteOffset,e.byteLength)}var ya=/\w*$/;function ha(e){var t=new e.constructor(e.source,ya.exec(e));return t.lastIndex=e.lastIndex,t}var Be=j?j.prototype:void 0,He=Be?Be.valueOf:void 0;function ba(e){return He?Object(He.call(e)):{}}function _a(e,t){var r=t?he(e.buffer):e.buffer;return new e.constructor(r,e.byteOffset,e.length)}var $a="[object Boolean]",ma="[object Date]",Ta="[object Map]",Aa="[object Number]",Oa="[object RegExp]",wa="[object Set]",Sa="[object String]",ja="[object Symbol]",Pa="[object ArrayBuffer]",Ea="[object DataView]",La="[object Float32Array]",Ca="[object Float64Array]",xa="[object Int8Array]",Ia="[object Int16Array]",Da="[object Int32Array]",Ma="[object Uint8Array]",Fa="[object Uint8ClampedArray]",Ba="[object Uint16Array]",Ha="[object Uint32Array]";function Na(e,t,r){var n=e.constructor;switch(t){case Pa:return he(e);case $a:case ma:return new n(+e);case Ea:return va(e,r);case La:case Ca:case xa:case Ia:case Da:case Ma:case Fa:case Ba:case Ha:return _a(e,r);case Ta:return new n;case Aa:case Sa:return new n(e);case Oa:return ha(e);case wa:return new n;case ja:return ba(e)}}function Ra(e){return typeof e.constructor=="function"&&!pe(e)?nr(ot(e)):{}}var Ga="[object Map]";function Ua(e){return L(e)&&z(e)==Ga}var Ne=B&&B.isMap,Ka=Ne?ge(Ne):Ua,za=Ka,qa="[object Set]";function Ya(e){return L(e)&&z(e)==qa}var Re=B&&B.isSet,Wa=Re?ge(Re):Ya,Xa=Wa,Ja=1,Va=2,Za=4,ct="[object Arguments]",Qa="[object Array]",ka="[object Boolean]",eo="[object Date]",to="[object Error]",lt="[object Function]",ro="[object GeneratorFunction]",no="[object Map]",ao="[object Number]",pt="[object Object]",oo="[object RegExp]",io="[object Set]",so="[object String]",uo="[object Symbol]",fo="[object WeakMap]",co="[object ArrayBuffer]",lo="[object DataView]",po="[object Float32Array]",go="[object Float64Array]",vo="[object Int8Array]",yo="[object Int16Array]",ho="[object Int32Array]",bo="[object Uint8Array]",_o="[object Uint8ClampedArray]",$o="[object Uint16Array]",mo="[object Uint32Array]",l={};l[ct]=l[Qa]=l[co]=l[lo]=l[ka]=l[eo]=l[po]=l[go]=l[vo]=l[yo]=l[ho]=l[no]=l[ao]=l[pt]=l[oo]=l[io]=l[so]=l[uo]=l[bo]=l[_o]=l[$o]=l[mo]=!0;l[to]=l[lt]=l[fo]=!1;function J(e,t,r,n,i,a){var o,s=t&Ja,u=t&Va,c=t&Za;if(r&&(o=i?r(e,n,i,a):r(e)),o!==void 0)return o;if(!Y(e))return e;var $=G(e);if($){if(o=ga(e),!s)return ar(e,o)}else{var d=z(e),g=d==lt||d==ro;if(V(e))return Yn(e,s);if(d==pt||d==ct||g&&!i){if(o=u||g?{}:Ra(e),!s)return u?ea(e,zn(o,e)):Zn(e,Kn(o,e))}else{if(!l[d])return i?e:{};o=Na(e,d,s)}}a||(a=new w);var m=a.get(e);if(m)return m;a.set(e,o),Xa(e)?e.forEach(function(y){o.add(J(y,t,r,y,e,a))}):za(e)&&e.forEach(function(y,h){o.set(h,J(y,t,r,h,e,a))});var b=c?u?ta:se:u?ve:de,_=$?void 0:b(e);return ir(_||e,function(y,h){_&&(h=y,y=e[h]),Je(o,h,J(y,t,r,h,e,a))}),o}var To=1,Ao=4;function Oo(e){return J(e,To|Ao)}var wo="__lodash_hash_undefined__";function So(e){return this.__data__.set(e,wo),this}function jo(e){return this.__data__.has(e)}function Q(e){var t=-1,r=e==null?0:e.length;for(this.__data__=new D;++t<r;)this.add(e[t])}Q.prototype.add=Q.prototype.push=So;Q.prototype.has=jo;function Po(e,t){for(var r=-1,n=e==null?0:e.length;++r<n;)if(t(e[r],r,e))return!0;return!1}function Eo(e,t){return e.has(t)}var Lo=1,Co=2;function gt(e,t,r,n,i,a){var o=r&Lo,s=e.length,u=t.length;if(s!=u&&!(o&&u>s))return!1;var c=a.get(e),$=a.get(t);if(c&&$)return c==t&&$==e;var d=-1,g=!0,m=r&Co?new Q:void 0;for(a.set(e,t),a.set(t,e);++d<s;){var b=e[d],_=t[d];if(n)var y=o?n(_,b,d,t,e,a):n(b,_,d,e,t,a);if(y!==void 0){if(y)continue;g=!1;break}if(m){if(!Po(t,function(h,O){if(!Eo(m,O)&&(b===h||i(b,h,r,n,a)))return m.push(O)})){g=!1;break}}else if(!(b===_||i(b,_,r,n,a))){g=!1;break}}return a.delete(e),a.delete(t),g}function xo(e){var t=-1,r=Array(e.size);return e.forEach(function(n,i){r[++t]=[i,n]}),r}function Io(e){var t=-1,r=Array(e.size);return e.forEach(function(n){r[++t]=n}),r}var Do=1,Mo=2,Fo="[object Boolean]",Bo="[object Date]",Ho="[object Error]",No="[object Map]",Ro="[object Number]",Go="[object RegExp]",Uo="[object Set]",Ko="[object String]",zo="[object Symbol]",qo="[object ArrayBuffer]",Yo="[object DataView]",Ge=j?j.prototype:void 0,ae=Ge?Ge.valueOf:void 0;function Wo(e,t,r,n,i,a,o){switch(r){case Yo:if(e.byteLength!=t.byteLength||e.byteOffset!=t.byteOffset)return!1;e=e.buffer,t=t.buffer;case qo:return!(e.byteLength!=t.byteLength||!a(new Z(e),new Z(t)));case Fo:case Bo:case Ro:return le(+e,+t);case Ho:return e.name==t.name&&e.message==t.message;case Go:case Ko:return e==t+"";case No:var s=xo;case Uo:var u=n&Do;if(s||(s=Io),e.size!=t.size&&!u)return!1;var c=o.get(e);if(c)return c==t;n|=Mo,o.set(e,t);var $=gt(s(e),s(t),n,i,a,o);return o.delete(e),$;case zo:if(ae)return ae.call(e)==ae.call(t)}return!1}var Xo=1,Jo=Object.prototype,Vo=Jo.hasOwnProperty;function Zo(e,t,r,n,i,a){var o=r&Xo,s=se(e),u=s.length,c=se(t),$=c.length;if(u!=$&&!o)return!1;for(var d=u;d--;){var g=s[d];if(!(o?g in t:Vo.call(t,g)))return!1}var m=a.get(e),b=a.get(t);if(m&&b)return m==t&&b==e;var _=!0;a.set(e,t),a.set(t,e);for(var y=o;++d<u;){g=s[d];var h=e[g],O=t[g];if(n)var W=o?n(O,h,g,t,e,a):n(h,O,g,e,t,a);if(!(W===void 0?h===O||i(h,O,r,n,a):W)){_=!1;break}y||(y=g=="constructor")}if(_&&!y){var M=e.constructor,F=t.constructor;M!=F&&"constructor"in e&&"constructor"in t&&!(typeof M=="function"&&M instanceof M&&typeof F=="function"&&F instanceof F)&&(_=!1)}return a.delete(e),a.delete(t),_}var Qo=1,Ue="[object Arguments]",Ke="[object Array]",X="[object Object]",ko=Object.prototype,ze=ko.hasOwnProperty;function ei(e,t,r,n,i,a){var o=G(e),s=G(t),u=o?Ke:z(e),c=s?Ke:z(t);u=u==Ue?X:u,c=c==Ue?X:c;var $=u==X,d=c==X,g=u==c;if(g&&V(e)){if(!V(t))return!1;o=!0,$=!1}if(g&&!$)return a||(a=new w),o||tt(e)?gt(e,t,r,n,i,a):Wo(e,t,u,r,n,i,a);if(!(r&Qo)){var m=$&&ze.call(e,"__wrapped__"),b=d&&ze.call(t,"__wrapped__");if(m||b){var _=m?e.value():e,y=b?t.value():t;return a||(a=new w),i(_,y,r,n,a)}}return g?(a||(a=new w),Zo(e,t,r,n,i,a)):!1}function dt(e,t,r,n,i){return e===t?!0:e==null||t==null||!L(e)&&!L(t)?e!==e&&t!==t:ei(e,t,r,n,dt,i)}function oe(e,t){return dt(e,t)}var ti=(e,t)=>{const r=e.__vccOpts||e;for(const[n,i]of t)r[n]=i;return r};const ri=bt({props:{animationData:{type:Object,default:()=>({})},animationLink:{type:String,default:""},loop:{type:[Boolean,Number],default:!0},autoPlay:{type:Boolean,default:!0},width:{type:[Number,String],default:"100%"},height:{type:[Number,String],default:"100%"},speed:{type:Number,default:1},delay:{type:Number,default:0},direction:{type:String,default:"forward"},pauseOnHover:{type:Boolean,default:!1},playOnHover:{type:Boolean,default:!1},backgroundColor:{type:String,default:"transparent"},pauseAnimation:{type:Boolean,default:!1},renderer:{type:String,default:"svg"},rendererSettings:{type:Object,default:()=>({})}},emits:{onComplete:null,onLoopComplete:null,onEnterFrame:null,onSegmentStart:null,onAnimationLoaded:null},setup(e,{emit:t}){let r=_e(null);const n=_e("");let i=1;const a=f=>document.querySelector(`[data-id="${f}"]`)!==null,o=async f=>{let v=e.autoPlay;e.playOnHover&&(v=!1);let T={};if(oe(e.animationData,{})===!1&&(T=Oo(e.animationData)),e.animationLink!="")try{T=await(await fetch(e.animationLink)).json()}catch(be){console.error(be);return}let P=e.loop;typeof P=="number"&&P>0&&(P=P-1),e.delay>0&&(v=!1);const H={container:f,renderer:e.renderer,loop:P,autoplay:v,animationData:T};oe(e.rendererSettings,{})===!1&&(H.rendererSettings=e.rendererSettings),r=ht.loadAnimation(H),setTimeout(()=>{v=e.autoPlay,e.playOnHover?r.pause():v?r.play():r.pause(),t("onAnimationLoaded")},e.delay),r.setSpeed(e.speed),e.direction==="reverse"&&r.setDirection(-1),e.direction==="normal"&&r.setDirection(1),(e.pauseAnimation||e.playOnHover)&&r.pause(),r.addEventListener("loopComplete",()=>{e.direction==="alternate"&&(r.stop(),i=i*-1,r.setDirection(i),r.play()),t("onLoopComplete")}),r.addEventListener("complete",()=>{t("onComplete")}),r.addEventListener("enterFrame",()=>{t("onEnterFrame")}),r.addEventListener("segmentStart",()=>{t("onSegmentStart")})},s=_t(()=>{let f=e.width,v=e.height;return typeof e.width=="number"&&(f=`${e.width}px`),typeof e.height=="number"&&(v=`${e.height}px`),{"--lottie-animation-container-width":f,"--lottie-animation-container-height":v,"--lottie-animation-container-background-color":e.backgroundColor}}),u=()=>{r&&e.pauseOnHover&&r.pause(),r&&e.playOnHover&&r.play()},c=()=>{r&&e.pauseOnHover&&r.play(),r&&e.playOnHover&&r.pause()};$t(()=>e.pauseAnimation,()=>{if((e.pauseOnHover||e.playOnHover)&&e.pauseAnimation){console.error("If you are using pauseAnimation prop for Vue3-Lottie, please remove the props pauseOnHover and playOnHover");return}r&&(e.pauseAnimation?r.pause():r.play())});const $=()=>{r&&r.play()},d=()=>{r&&r.pause()},g=()=>{r&&r.stop()},m=()=>{r&&r.destroy()},b=(f=1)=>{if(f<=0)throw new Error("Speed must be greater than 0");r&&r.setSpeed(f)},_=f=>{r&&(f==="forward"?r.setDirection(1):f==="reverse"&&r.setDirection(-1))},y=(f,v=!0)=>{r&&r.goToAndStop(f,v)},h=(f,v=!0)=>{r&&r.goToAndPlay(f,v)},O=(f,v=!1)=>{r&&r.playSegments(f,v)},W=(f=!0)=>{r&&r.setSubframe(f)},M=(f=!0)=>{if(r)return r.getDuration(f)},F=(f,v=0)=>{r&&r.renderer.elements[v].updateDocumentData(f)},vt=f=>{for(var v="",T="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",P=T.length,H=0;H<f;H++)v+=T.charAt(Math.floor(Math.random()*P));return v},yt=f=>{if(e.pauseOnHover&&e.playOnHover)throw new Error("You cannot set pauseOnHover and playOnHover for Vue3-Lottie at the same time.");if(e.animationLink===""&&oe(e.animationData,{}))throw console.log(e.animationData,"animationData",e.animationLink,"animationLink"),new Error("You must provide either animationLink or animationData");const v=setInterval(()=>{if(a(f)){clearInterval(v);const T=document.querySelector(`[data-id="${f}" ]`);T&&o(T)}},0)};return mt(async()=>{n.value=vt(20),yt(n.value)}),{elementid:n,hoverEnded:c,hoverStarted:u,getCurrentStyle:s,play:$,pause:d,stop:g,destroy:m,setSpeed:b,setDirection:_,goToAndStop:y,goToAndPlay:h,playSegments:O,setSubFrame:W,getDuration:M,updateDocumentData:F}}}),ni=["data-id"];function ai(e,t,r,n,i,a){return Tt(),At("div",{"data-id":e.elementid,class:"lottie-animation-container",style:Ot(e.getCurrentStyle),onMouseenter:t[0]||(t[0]=(...o)=>e.hoverStarted&&e.hoverStarted(...o)),onMouseleave:t[1]||(t[1]=(...o)=>e.hoverEnded&&e.hoverEnded(...o))},null,44,ni)}var oi=ti(ri,[["render",ai]]);function ii(e,t){const r=Object.assign({},{name:"Vue3Lottie"},t);e.component(`${r.name}`,oi)}const ci={version:"2.5.0",install:ii};export{ci as p};