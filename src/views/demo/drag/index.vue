<template>
  <yu-layout title="拖拽排序" subtitle="拖拽排序的简单使用">
    <template #head>
      <ul style="padding-left: 15px">
        <li>
          Vue.Draggable是一款基于Sortable.js实现的vue拖拽插件。支持移动设备、拖拽和选择文本、智能滚动，可以在不同列表间拖拽、不依赖jQuery为基础、vue
          2过渡动画兼容、支持撤销操作，总之是一款非常优秀的vue拖拽组件。本篇将介绍如何搭建环境及简单的例子，使用起来特别简单对被拖拽元素也没有CSS样式的特殊要求。
          官方地址 ：
          <a
            class="link-item"
            href="https://github.com/SortableJS/Vue.Draggable"
            >戳我前往</a
          >
        </li>

        <li>
          Sortable.js是一款优秀的js拖拽库，支持ie9及以上版本ie浏览器和现代浏览器，也可以运行在移动触摸设备中。不依赖jQuery。支持
          Meteor、AngularJS、React、Vue、Knockout框架和任何CSS库，如Bootstrap、Element
          UI。你可以用来拖拽div、table等元素。 官方地址 ：
          <a class="link-item" href="https://github.com/SortableJS/Sortable"
            >戳我前往</a
          >
        </li>
      </ul>
    </template>

    <template #body>
      <div class="section-container drag-container">
        <el-row :gutter="25">
          <el-col :span="12">
            <el-card>
              <template #header>
                <div class="card-header">
                  <span>拖拽</span>
                </div>
              </template>
              <draggable
                v-model="gridLists"
                class="grid-container"
                item-key="grid"
                animation="300"
                chosenClass="chosen"
                forceFallback="true"
              >
                <template #item="{ element }">
                  <div :class="'item-' + element.id">
                    <el-avatar
                      shape="square"
                      :draggable="false"
                      :size="100"
                      :fit="element.fit"
                      :src="element.url"
                    ></el-avatar>
                  </div>
                </template>
              </draggable>
            </el-card>
          </el-col>

          <el-col :span="12">
            <el-card>
              <template #header>
                <div class="card-header">
                  <span>列表拖拽</span>
                </div>
              </template>
              <!-- 单列拖拽 -->
              <draggable
                v-model="lists"
                item-key="name"
                chosen-class="chosen"
                force-fallback="true"
                animation="300"
              >
                <template #item="{ element }">
                  <div class="drag-list">
                    ID:{{ element.id }}, name：{{ element.name }}
                  </div>
                </template>
              </draggable>
            </el-card>
          </el-col>

          <el-col :span="24">
            <el-card>
              <template #header>
                <div class="card-header">
                  <span>多列表相互拖拽</span>
                </div>
              </template>
            </el-card>
          </el-col>

          <el-col :span="12">
            <el-card>
              <div id="left" ref="sortGroupLeft" class="list-group">
                <div
                  class="list-group-item tinted"
                  v-for="item in 6"
                  :key="item"
                  :class="{ filtered: item === 2 }"
                >
                  Left Item {{ item }}
                </div>
              </div>
            </el-card>
          </el-col>

          <el-col :span="12">
            <el-card>
              <div id="right" ref="sortGroupRight" class="list-group">
                <div
                  class="list-group-item tinted"
                  v-for="item in 6"
                  :key="item"
                  :class="{ filtered: item === 4 }"
                >
                  Right Item {{ item }}
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </template>
  </yu-layout>
</template>

<script>
import draggable from 'vuedraggable/src/vuedraggable'
import { defineComponent, reactive, toRefs, onMounted, ref } from 'vue'
import YuLayout from '/@/components/YuLayout'

export default defineComponent( {
  name : 'Drag',
  components : { draggable, YuLayout },
  setup() {
    const gridLists = []
    for ( let i = 1; i < 10; i++ ) {
      gridLists.push( {
        id : i,
        fit : 'fill',
        url : 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      } )
    }
    const myArray = reactive( {
      gridLists,
      lists : [
        { people : 'cn', id : 1, name : 'vue' },
        { people : 'cn', id : 2, name : 'react' },
        { people : 'cn', id : 3, name : 'angular' },
        { people : 'cn', id : 4, name : 'jquery' }
      ]
    } )

    const sortGroupLeft = ref()
    const sortGroupRight = ref()

    onMounted( () => {
      // eslint-disable-next-line no-undef
      new Sortable( sortGroupLeft.value, {
        swap : true,
        forceFallback : true,
        chosenClass : 'chosen',
        swapClass : 'highlight',
        filter : '.filtered', // 'filtered' class is not draggable
        group : 'shared',
        animation : 300
      } )

      // eslint-disable-next-line no-undef
      new Sortable( sortGroupRight.value, {
        swap : true,
        forceFallback : true,
        chosenClass : 'chosen',
        filter : '.filtered',
        swapClass : 'highlight',
        group : 'shared',
        animation : 300
      } )
    } )

    return {
      ...toRefs( myArray ),
      sortGroupLeft,
      sortGroupRight
    }
  }
} )
</script>

<style lang="scss" scoped>
.grid-container {
  display: grid;
  grid-template-columns: 33.3% 33.3% 33.3%;
  grid-template-rows: 33.3% 33.3% 33.3%;
}
.drag-list {
  font-size: 1.5em;
  height: 77px;
  text-align: center;
  line-height: 85px;
  border: 1px solid #e5e4e9;
  cursor: move;
}
.chosen {
  border: solid 2px #3089dc !important;
}
.list-group {
  display: flex;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
}
.list-group-item:first-child {
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
}
.list-group-item {
  position: relative;
  display: block;
  padding: 0.75rem 1.25rem;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
}
.filtered {
  background-color: #dc3545 !important;
  cursor: not-allowed;
}

:deep .el-col {
  margin-bottom: 15px;
}
</style>
