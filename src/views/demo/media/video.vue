<template>
  <yu-layout title="视频组件" subtitle="视频组件的简单使用">
    <template #body>
      <div class="section-container">
        <el-divider content-position="left"
          >XGPlayer : 西瓜视频播放器</el-divider
        >
        <div class="description">
          更多配置请参考：https://v2.h5player.bytedance.com/config/
        </div>
        <div id="xgContainer" class="container--video"></div>

        <el-divider content-position="left">Chimee</el-divider>
        <div class="description">
          更多配置请参考：http://chimee.org/docs/start.html
        </div>
        <div id="chimee" class="container--video"></div>
      </div>
    </template>
  </yu-layout>
</template>

<script setup>
import { onMounted, nextTick } from 'vue'
import YuLayout from '/@/components/YuLayout'

const videoURL =
  'http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4'
import Player from 'xgplayer'

import chimee from 'chimee'
import chimeePluginControlbar from 'chimee-plugin-controlbar'
chimee.install( chimeePluginControlbar )

function initXG() {
  // eslint-disable-next-line no-unused-vars
  const xgInstance = new Player( {
    id : 'xgContainer',
    poster :
      'https://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg',
    url : videoURL,

    width : 600,
    height : 337.5,
    fluid : true,
    fitVideoSize : 'auto',
    volume : 0.6, // 0 - 1
    autoplay : false,
    loop : true,
    videoInit : true, // 初始化显示视频首帧 !important 与 autoplay 不可同时为true
    playbackRate : [0.5, 0.75, 1, 1.5, 2], // 传入倍速可选数组
    lastPlayTime : 20, // 视频起播时间（单位：秒）
    lastPlayTimeHideDelay : 5, // 提示文字展示时长（单位：秒）
    rotateFullscreen : true // 样式横屏全屏
  } )
}

function initChimee() {
  // eslint-disable-next-line no-unused-vars,new-cap
  const chimeeIntance = new chimee( {
    wrapper : document.getElementById( 'chimee' ), // video dom容器
    // wrapper: '#chimee',  // video dom容器
    src : videoURL,
    isLive : false,
    controls : true
  } )
}

onMounted( () => {
  nextTick( () => {
    initXG()
    initChimee()
  } )
} )
</script>

<style lang="scss" scoped>
.container--video {
  flex: auto;
}
.description {
  margin: 15px;
  font-size: 14px;
  color: #ccc;
  line-height: 1.5;
}
</style>
