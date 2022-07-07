<template>
  <div class="info-layout">
    <div class="title flex-row flex-vertical-center">{{ title }}</div>
    <div class="center-box">
      <div class="card-section">
        <div class="head">
          <slot name="head" />
        </div>

        <div class="body">
          <slot name="body" />
        </div>
      </div>
      <div class="foot">
        <slot name="foot" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent( {
  name : 'InfoLayout',
  props : {
    title : {
      type : String,
      default : ''
    }
  },
  setup() {}
} )
</script>

<style lang="scss" scoped>
.info-layout {
  margin: 20px;
  min-width: 1180px;
  background: #fff;
  min-height: 798px;
  border-radius: 10px;
  box-shadow: 1px 1px 1px #f2f6fc;
}
.title {
  height: 58px;
  border-radius: 8px 8px 0 0;
  background-color: rgba(80, 180, 255, 1);
  padding-left: 21px;
  color: rgba(255, 255, 255, 1);
  font-size: 24px;
  text-align: left;
}

.center-box {
}
</style>
