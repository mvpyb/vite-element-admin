import{_ as O,b as G}from"../../assets/index-aa0accf1.js";import{l as h}from"../element-plus/element-plus.64272016.js";import{L as U}from"../index/index.9a3e0863.js";import{G as $,h as b,_ as n,$ as e,u as E,an as p,au as _,o as a,a as t,a5 as s,a0 as r,a3 as i,c as q,a4 as A,bf as F,bd as H}from"../@vue/@vue.15611f31.js";import"../pinia/pinia.61d2c5ab.js";import"../js-cookie/js-cookie.cf83ad76.js";import"../axios/axios.aba6f0e0.js";import"../geotiff/geotiff.41c905a7.js";import"../vue-router/vue-router.08ae9a36.js";import"../path-to-regexp/path-to-regexp.36ea9d8d.js";import"../fuse.js/fuse.js.88e2763d.js";import"../path-browserify/path-browserify.188d1ff8.js";import"../screenfull/screenfull.b3e6dc1f.js";import"../vue-i18n/vue-i18n.d59688b3.js";import"../@intlify/@intlify.771bffe6.js";import"../mitt/mitt.f7ef348c.js";import"../lodash-es/lodash-es.3689fb67.js";import"../@element-plus/@element-plus.81e9c93c.js";import"../@amap/@amap.39c0400f.js";import"../@vueuse/@vueuse.36301670.js";import"../nprogress/nprogress.d4529c63.js";/* empty css                                 */import"../clipboard/clipboard.a49fd553.js";import"../xe-utils/xe-utils.ae8f073f.js";import"../vxe-table/vxe-table.4635309e.js";import"../vue3-lottie/vue3-lottie.f4d7292a.js";import"../lottie-web/lottie-web.b83481e1.js";import"../vite-plugin-mock/vite-plugin-mock.f2e75bf1.js";import"../mockjs/mockjs.21d1b872.js";import"../@popperjs/@popperjs.4b6c69cf.js";import"../@ctrl/@ctrl.eaff329e.js";import"../dayjs/dayjs.c6f15c19.js";import"../async-validator/async-validator.acfb96ca.js";import"../memoize-one/memoize-one.0376b3d0.js";import"../escape-html/escape-html.1d60d822.js";import"../normalize-wheel-es/normalize-wheel-es.4ffea87d.js";import"../@floating-ui/@floating-ui.ef00999f.js";import"../vue/vue.4879d68e.js";import"../lodash-unified/lodash-unified.128e8e20.js";const d=m=>(F("data-v-1c58c2f8"),m=m(),H(),m),J={class:"section-container"},K=d(()=>t("div",{class:"card-header"},[t("span",null,"复制 v-copy")],-1)),Q={class:"h50"},W=d(()=>t("div",{class:"card-header"},[t("span",null,"水波纹动效 v-waves")],-1)),X={class:"h50"},Y=d(()=>t("div",{class:"card-header"},[t("span",null,"长按指令 v-longpress")],-1)),Z={class:"h50"},ee=d(()=>t("div",{class:"card-header"},[t("span",null,"防抖指令 v-dobounce")],-1)),te={class:"h50"},se=d(()=>t("div",{class:"card-header"},[t("span",null,"水印 v-waterMarker")],-1)),oe={class:"water-marker h200"},ae=d(()=>t("div",{class:"card-header"},[t("span",null,"拖拽指令 v-draggable")],-1)),re={class:"drag-container h200"},ie={class:"drag-box"},le=d(()=>t("div",{class:"card-header"},[t("span",null,"权限指令 v-permission")],-1)),ne={class:"item"},de={class:"item"},ce={class:"item"},_e={class:"item"},pe=d(()=>t("div",{class:"card-header"},[t("span",null,"coming soon")],-1)),ue=d(()=>t("div",{class:"h50"},"即将推出一些其他常用指令，如懒加载等",-1)),me=$({name:"Directive"}),ve=Object.assign(me,{setup(m){const C=G(),S=()=>{h.ElMessage.success("复制成功")},V=()=>{h.ElMessage.error("复制失败")},I=()=>{h.ElMessage.error("你按疼我了...")},M=()=>{h.ElMessage.warning("嗯，你说的都对。。。")},f=b(""),g=b([]),u=b(0),D=async()=>{const w=["admin","editor","user"];u.value++,u.value>2&&(u.value=0),g.value=w.splice(u.value,1),await C.SET_DIRECTIVE_ROLE(E(g))};return(w,x)=>{const z=p("el-input"),o=p("el-col"),l=p("el-button"),k=p("el-row"),c=p("el-card"),B=p("el-tag"),y=_("clipboard"),R=_("wave"),L=_("longpress"),N=_("dobounce"),P=_("waterMarker"),T=_("draggable"),v=_("permission");return a(),n(E(U),{title:"自定义指令",subtitle:"非常实用的Vue自定义指令"},{body:e(()=>[t("div",J,[s(k,{gutter:25},{default:e(()=>[s(o,{span:12},{default:e(()=>[s(c,null,{header:e(()=>[K]),default:e(()=>[t("div",Q,[s(k,{gutter:10},{default:e(()=>[s(o,{span:18},{default:e(()=>[s(z,{placeholder:"请输入",modelValue:f.value,"onUpdate:modelValue":x[0]||(x[0]=j=>f.value=j)},null,8,["modelValue"])]),_:1}),s(o,{span:6},{default:e(()=>[r((a(),n(l,{type:"primary"},{default:e(()=>[i(" 复制 ")]),_:1})),[[y,f.value,"copy"],[y,S,"success"],[y,V,"error"]])]),_:1})]),_:1})])]),_:1})]),_:1}),s(o,{span:12},{default:e(()=>[s(c,null,{header:e(()=>[W]),default:e(()=>[t("div",X,[r((a(),n(l,{type:"primary"},{default:e(()=>[i(" 点我点我快点我 ")]),_:1})),[[R]])])]),_:1})]),_:1}),s(o,{span:12},{default:e(()=>[s(c,null,{header:e(()=>[Y]),default:e(()=>[t("div",Z,[r((a(),n(l,{type:"primary"},{default:e(()=>[i(" 长按我1s以上 ")]),_:1})),[[L,I]])])]),_:1})]),_:1}),s(o,{span:12},{default:e(()=>[s(c,null,{header:e(()=>[ee]),default:e(()=>[t("div",te,[r((a(),n(l,{type:"primary"},{default:e(()=>[i(" 点我看看 ")]),_:1})),[[N,M]])])]),_:1})]),_:1}),s(o,{span:12},{default:e(()=>[s(c,null,{header:e(()=>[se]),default:e(()=>[r(t("div",oe,null,512),[[P,{text:"小灰灰版权所有",textColor:"rgba(239,53,54,0.4)"}]])]),_:1})]),_:1}),s(o,{span:12},{default:e(()=>[s(c,null,{header:e(()=>[ae]),default:e(()=>[t("div",re,[r(t("div",ie,null,512),[[T]])])]),_:1})]),_:1}),s(o,{span:24},{default:e(()=>[s(c,null,{header:e(()=>[le]),default:e(()=>[s(l,{style:{margin:"10px 0"},type:"primary",onClick:D,size:"small"},{default:e(()=>[i(" 切换权限 ")]),_:1}),(a(),q("div",{key:u.value},[s(B,{class:"permission-sourceCode",type:"info"},{default:e(()=>[i(" 当前权限 ："+A(g.value.join("_")),1)]),_:1}),t("div",ne,[r((a(),n(l,{type:"success",size:"small"},{default:e(()=>[i(" 有权限 admin ")]),_:1})),[[v,["admin"]]])]),t("div",de,[r((a(),n(l,{type:"warning",size:"small"},{default:e(()=>[i(" 有权限 editor ")]),_:1})),[[v,["editor"]]])]),t("div",ce,[r((a(),n(l,{type:"danger",size:"small"},{default:e(()=>[i(" 有权限 admin + editor")]),_:1})),[[v,["admin","editor"]]])]),t("div",_e,[r((a(),n(l,{type:"primary",size:"small"},{default:e(()=>[i("有权限 user")]),_:1})),[[v,["user"]]])])]))]),_:1})]),_:1}),s(o,{span:24},{default:e(()=>[s(c,null,{header:e(()=>[pe]),default:e(()=>[ue]),_:1})]),_:1})]),_:1})])]),_:1})}}}),tt=O(ve,[["__scopeId","data-v-1c58c2f8"]]);export{tt as default};
