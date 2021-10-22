<template>
  <div class="card-panel" @click="handleClick">
    <div class="card-panel-icon-wrapper" :class="'icon-' + type">
      <svg-icon :icon-class="icon" class-name="card-panel-icon" />
    </div>
    <div class="card-panel-description">
      <div class="card-panel-text">
        {{ message }}
      </div>
      <yu-count-to
        :start-val="start"
        :end-val="end"
        :duration="duration"
        class="card-panel-num"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import YuCountTo from '/@/components/YuCountTo'

export default defineComponent( {
  name : 'YuPanelCard',
  props : {
    icon : {
      type : String,
      required : true,
      default : 'about'
    },
    message : {
      type : String,
      required : true,
      default : 'Panel Card'
    },
    start : {
      type : Number,
      default : 0
    },
    end : {
      type : Number,
      default : 102400
    },
    duration : {
      type : Number,
      default : 3000
    },
    type : {
      type : String,
      default : 'people'
    }
  },
  components : { YuCountTo },
  emits : ['handleClick'],
  setup( props, { emit } ) {
    function handleClick() {
      emit( 'handleClick' )
    }
    return {
      handleClick
    }
  }
} )
</script>

<style lang="scss" scoped>
.card-panel {
  height: 108px;
  cursor: pointer;
  font-size: 12px;
  position: relative;
  overflow: hidden;
  color: #666;
  background: #fff;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.05);
  &:hover {
    .card-panel-icon-wrapper {
      color: #fff;
    }
    .icon-people {
      background: #40c9c6;
    }
    .icon-message {
      background: #36a3f7;
    }
    .icon-money {
      background: #f4516c;
    }
    .icon-shopping {
      background: #34bfa3;
    }
  }
  .icon-people {
    color: #40c9c6;
  }
  .icon-message {
    color: #36a3f7;
  }
  .icon-money {
    color: #f4516c;
  }
  .icon-shopping {
    color: #34bfa3;
  }
  .card-panel-icon-wrapper {
    float: left;
    margin: 14px 0 0 14px;
    padding: 16px;
    transition: all 0.38s ease-out;
    border-radius: 6px;
  }
  .card-panel-icon {
    float: left;
    font-size: 48px;
  }
  .card-panel-description {
    float: right;
    font-weight: bold;
    margin: 26px 26px 26px 0;
    .card-panel-text {
      line-height: 18px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 16px;
      margin-bottom: 12px;
    }
    .card-panel-num {
      font-size: 20px;
    }
  }
}
@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }
  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;
    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
