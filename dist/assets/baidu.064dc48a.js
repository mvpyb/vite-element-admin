import{b as a}from"./index.a7c90c79.js";import{L as e}from"./index.f3301aa0.js";import{j as o,A as t,P as n,f as s,w as r,H as c,o as i,i as l}from"./vendor.71a11aaa.js";const p={class:"section-container"},d={setup(d){const M=o();return t((()=>{n((()=>{a("ov7zC5g8Ac0ScLPp1zG8TZDuiGfty9Hh").then((()=>{const a=new BMap.Map(M.value);a.centerAndZoom(new BMap.Point(116.404,39.915),11),a.addControl(new BMap.MapTypeControl({mapTypes:[BMAP_NORMAL_MAP,BMAP_HYBRID_MAP]})),a.setCurrentCity("北京"),a.enableScrollWheelZoom(!0)})).catch((a=>{console.log("err",a)}))}))})),(a,o)=>(i(),s(c(e),{title:"百度地图",subtitle:"百度地图的简单使用，最新版GL地图命名空间为BMapGL, 可按住鼠标右键控制地图旋转、修改倾斜角度。"},{body:r((()=>[l("div",p,[l("div",{id:"container",ref:(a,e)=>{e.container=a,M.value=a}},null,512)])])),_:1}))},__scopeId:"data-v-c43b3f14"};export default d;