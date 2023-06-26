import{u as B,d as D,_ as E}from"../../assets/index-aa0accf1.js";import{e as I}from"../index/index.2353ae24.js";import{a as N}from"../vue-router/vue-router.08ae9a36.js";import{T as R}from"../index/index.01996811.js";import{E as O}from"../element-plus/element-plus.64272016.js";import{h as x,p as M,m as p,c as y,a as e,a5 as n,a3 as l,_ as c,a4 as r,$ as _,a2 as C,a0 as U,u as k,G as j,an as m,au as G,bf as L,bd as W,o as s}from"../@vue/@vue.15611f31.js";import"../pinia/pinia.61d2c5ab.js";import"../js-cookie/js-cookie.cf83ad76.js";import"../axios/axios.aba6f0e0.js";import"../geotiff/geotiff.41c905a7.js";import"../path-to-regexp/path-to-regexp.36ea9d8d.js";import"../fuse.js/fuse.js.88e2763d.js";import"../path-browserify/path-browserify.188d1ff8.js";import"../screenfull/screenfull.b3e6dc1f.js";import"../vue-i18n/vue-i18n.d59688b3.js";import"../@intlify/@intlify.771bffe6.js";import"../mitt/mitt.f7ef348c.js";import"../lodash-es/lodash-es.3689fb67.js";import"../@element-plus/@element-plus.81e9c93c.js";import"../@amap/@amap.39c0400f.js";import"../@vueuse/@vueuse.36301670.js";import"../nprogress/nprogress.d4529c63.js";/* empty css                                 */import"../clipboard/clipboard.a49fd553.js";import"../xe-utils/xe-utils.ae8f073f.js";import"../vxe-table/vxe-table.4635309e.js";import"../vue3-lottie/vue3-lottie.f4d7292a.js";import"../lottie-web/lottie-web.b83481e1.js";import"../vite-plugin-mock/vite-plugin-mock.f2e75bf1.js";import"../mockjs/mockjs.21d1b872.js";import"../@popperjs/@popperjs.4b6c69cf.js";import"../@ctrl/@ctrl.eaff329e.js";import"../dayjs/dayjs.c6f15c19.js";import"../async-validator/async-validator.acfb96ca.js";import"../memoize-one/memoize-one.0376b3d0.js";import"../escape-html/escape-html.1d60d822.js";import"../normalize-wheel-es/normalize-wheel-es.4ffea87d.js";import"../@floating-ui/@floating-ui.ef00999f.js";import"../vue/vue.4879d68e.js";import"../lodash-unified/lodash-unified.128e8e20.js";const A=f=>(L("data-v-c6af8a0e"),f=f(),W(),f),q={class:"account-container flex-row flex-level-center"},z={class:"center-box"},F={class:"flex-row"},J={class:"card purple"},Q={class:"flex-row flex-vertical-center"},X={class:"circle"},Y={class:"tips-info flex-column flex-vertical-center"},Z={class:"f1"},ee={class:"f2"},te={class:"card orange"},se={class:"flex-row flex-vertical-center"},oe={class:"circle"},ie={class:"tips-info flex-column flex-vertical-center"},ne={class:"f1"},ae={class:"f2"},ce={class:"card green"},le={class:"flex-row flex-vertical-center"},re={class:"circle"},de={class:"tips-info flex-column flex-vertical-center"},_e={class:"f1"},pe={class:"f2"},me={class:"card blue"},fe={class:"flex-row flex-vertical-center"},ve={class:"circle"},ue={class:"tips-info flex-column flex-vertical-center"},he={class:"f1"},ye={class:"f2"},ge={class:"card-section"},xe={class:"login-title flex-row flex-between flex-vertical-center"},ke=A(()=>e("span",{class:"title"},"登录历史",-1)),we={style:{cursor:"pointer"}},be=A(()=>e("div",{class:"card-section",style:{height:"330px"}},null,-1)),Ce={class:"avatar-box flex-column flex-level-center flex-vertical-center"},Ae={class:"user-name ellipsis"},Te={class:"phone"},Se={key:0},$e={key:1},He=j({name:"UserCenter"}),Ke=Object.assign(He,{setup(f){const w=N(),g=x(!1),a=B(),T={0:"未知",1:"密码登录",2:"验证码登录",3:"第三方登录"},t=M({avatar:p(()=>a.avatar),name:p(()=>a.name),phone:p(()=>a.phone),email:p(()=>a.email),identity:p(()=>a.identity),isPerfect:p(()=>a.avatar&&a.name&&a.phone&&a.email&&a.identity)}),S=x([{key:"method",title:"登录方式",dataKey:"method",align:"center",width:106,cellRenderer:({rowData:d})=>n("div",null,[T[d.method]])},{key:"deviceType",title:"设备名称",dataKey:"deviceType",align:"center",width:231},{key:"deviceOs",title:"系统",dataKey:"deviceOs",align:"center",width:110},{key:"loginAddr",title:"登录地点",dataKey:"loginAddr",align:"center",width:231},{key:"loginTime",title:"最后登录时间",dataKey:"loginTime",align:"center",width:231}]),b=x([]);(async()=>{g.value=!0;try{const{code:d,data:o}=await D();d==200&&(b.value=o)}catch{}finally{g.value=!1}})();const v=async d=>{if(d!=2){O({message:"此组件还未开发",type:"warning"});return}w.push("/user/attestation")};return(d,o)=>{const i=m("svg-icon"),u=m("el-button"),$=m("el-tooltip"),H=m("ArrowRight"),K=m("el-icon"),P=m("el-table-v2"),V=G("loading");return s(),y("div",q,[e("div",z,[e("div",F,[e("div",J,[e("div",Q,[e("div",X,[n(i,{"icon-class":"phone_1",class:"icon"})]),e("div",Y,[e("div",Z,[l(" 绑定手机 "),t.phone?(s(),c(i,{key:0,"icon-class":"ok",class:"status-ok"})):(s(),c(i,{key:1,"icon-class":"warning_1",class:"status-warning"}))]),e("div",ee,r(t.phone?"已绑定手机":"未绑定，请尽快绑定"),1)])]),n(u,{class:"btn",type:"info",onClick:o[0]||(o[0]=h=>v(1))},{default:_(()=>[l(r(t.phone?"更换手机":"去绑定"),1)]),_:1})]),e("div",te,[e("div",se,[e("div",oe,[n(i,{"icon-class":"safe",class:"icon"})]),e("div",ie,[e("div",ne,[l(" 实名认证 "),t.identity?(s(),c(i,{key:0,"icon-class":"ok",class:"status-ok"})):(s(),c(i,{key:1,"icon-class":"warning_1",class:"status-warning"}))]),e("div",ae,r(t.identity?"已实名认证":"请尽快完成实名认证"),1)])]),t.identity?C("",!0):(s(),c(u,{key:0,class:"btn",type:"info",onClick:o[1]||(o[1]=h=>v(2))},{default:_(()=>[l("去认证")]),_:1}))]),e("div",ce,[e("div",le,[e("div",re,[n(i,{"icon-class":"msg_1",class:"icon"})]),e("div",de,[e("div",_e,[l(" 绑定邮箱 "),t.phone?(s(),c(i,{key:0,"icon-class":"ok",class:"status-ok"})):(s(),c(i,{key:1,"icon-class":"warning_1",class:"status-warning"}))]),e("div",pe,r(t.email?"已绑定邮箱":"未绑定，请尽快绑定"),1)])]),n(u,{class:"btn",type:"info",onClick:o[2]||(o[2]=h=>v(3))},{default:_(()=>[l(r(t.email?"更换邮箱":"去绑定"),1)]),_:1})]),e("div",me,[e("div",fe,[e("div",ve,[n(i,{"icon-class":"text",class:"icon"})]),e("div",ue,[e("div",he,[l(" 个人信息 "),t.isPerfect?(s(),c(i,{key:0,"icon-class":"ok",class:"status-ok"})):(s(),c(i,{key:1,"icon-class":"warning_1",class:"status-warning"}))]),e("div",ye,r(t.isPerfect?"个人信息已完善":"个人信息未完善"),1)])]),t.isPerfect?C("",!0):(s(),c(u,{key:0,class:"btn",type:"info",onClick:o[3]||(o[3]=h=>v(4))},{default:_(()=>[l("去完善")]),_:1}))])]),U((s(),y("div",ge,[e("div",xe,[n($,{class:"box-item",effect:"dark",content:"此处模拟了10W条数据",placement:"top-start"},{default:_(()=>[ke]),_:1}),e("p",we,[e("span",{class:"right-tips",onClick:o[4]||(o[4]=h=>k(w).push("/user/history"))},"查看更多"),n(K,{color:"#1890ff"},{default:_(()=>[n(H)]),_:1})])]),n(P,{class:"login-history-table",columns:S.value,data:b.value,width:910,height:210,fixed:!1},null,8,["columns","data"])])),[[V,g.value]]),be]),e("div",Ce,[n(k(R),{width:"150px",height:"150px",image:t.avatar},{default:_(()=>[l("Vite Element Admin Admin Admin Admin")]),_:1},8,["image"]),e("span",Ae," Hi,"+r(t.name||"小灰灰"),1),e("span",Te,[t.phone?(s(),y("span",Se,r(k(I)(t.phone)),1)):(s(),y("span",$e," 你还未绑定手机 "))])])])}}});const yt=E(Ke,[["__scopeId","data-v-c6af8a0e"]]);export{yt as default};