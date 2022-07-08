<template>
  <div class="bg-primary card-item">
    <div class="card-body">
      <div class="card-body-icon">
        <slot name="icon"></slot>
      </div>
      <div class="text-white">
        <h6 class="text-uppercase text-white">{{ title }}</h6>
        <h2 class="text-white mb24">
          <yu-count-to :start-val="start" :end-val="end" :duration="duration" :prefix="prefix" class="card-panel-num" />
        </h2>
        <div class="badge-box">
          <slot name="badge"></slot>
        </div>
        <div class="card-info">
          <slot name="info"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import YuCountTo from '/@/components/YuCountTo'

defineProps( {
  start : {
    type : Number,
    default : 1
  },
  end : {
    type : Number,
    default : 9527
  },
  duration : {
    type : Number,
    default : 3000
  },
  title : {
    type : String,
    default : 'Title'
  },
  prefix : {
    type : String,
    default : ''
  }
} )

defineOptions( {
  name : 'Card'
} )
</script>

<style lang="scss">
.text-white {
  color: #fff;
}
.card-item {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  flex-direction: column;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border-radius: 8px;
  margin-bottom: 24px;
  box-shadow: 0 -3px 31px 0 rgb(0 0 0 / 5%), 0 6px 20px 0 rgb(0 0 0 / 2%);
  border: none;
  &.bg-primary {
    background-color: #7a6fbe;
  }
  &:hover {
    transition: all 0.3s;
    transform: translateY(-6px);
  }
  .card-body {
    -webkit-box-flex: 1;
    flex: 1 1 auto;
    padding: 1.25rem 1.25rem;
    background-image: url('/@/assets/imgs/bg-1.png');
    background-size: cover;
    .card-body-icon i {
      font-size: 30px;
      width: 64px;
      height: 64px;
      line-height: 64px;
      text-align: center;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      display: inline-block;
      @extend .text-white;
    }
    .text-uppercase {
      font-size: 16px;
      margin-bottom: 16px;
    }
    .mb24 {
      margin-bottom: 24px;
      height: 28px;
      line-height: 28px;
      :deep(.card-panel-num) {
        font-size: 14px;
        display: inline-block;
      }
    }
    .badge-box {
      display: inline-block;
    }
    .badge {
      display: inline-block;
      padding: 0.25em 0.4em;
      font-size: 75%;
      font-weight: 500;
      line-height: 1;
      color: #fff;
      text-align: center;
      white-space: nowrap;
      vertical-align: baseline;
      border-radius: 0.25rem;
      &.bg-info {
        background-color: #29bbe3;
      }
      &.bg-danger {
        background-color: #ec536c;
      }
      &.bg-warning {
        background-color: #f5b225;
      }
    }
    .card-info {
      display: inline-block;
      margin-left: 0.5rem;
    }
  }
}
</style>
