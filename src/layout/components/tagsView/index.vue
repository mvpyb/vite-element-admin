
<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper" @scroll="handleScroll">
      <router-link
          v-for="tag in visitedViews"
          ref="tag"
          :key="tag.path"
          :class="isActive(tag)?'active':''"
          :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
          tag="span"
          class="tags-view-item"
          @click.middle.native="!isAffix(tag)?closeSelectedTag(tag):''"
          @contextmenu.prevent.native="openMenu(tag,$event)"
      >
        {{ tag.title }}
        <span v-if="!isAffix(tag)" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
    </scroll-pane>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">关闭</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags(selectedTag)">关闭全部</li>
    </ul>
  </div>
</template>

<script>
  import ScrollPane from './ScrollPane.vue'
  import path from 'path'
  import {
    ref,
    reactive,
    computed,
    toRefs,
    watch,
    nextTick,
    onMounted,
    onBeforeMount,
    getCurrentInstance
  } from "vue"
  import { useRouter, useRoute } from "vue-router"
  import { useStore } from "vuex"
  
  export default {
    name : 'TagsView',
    components: { ScrollPane },
    setup() {
      const store = useStore()
      const router = useRouter()
      const route = useRoute()
      
      const { ctx } = getCurrentInstance()
      
      let scrollPane = ref(null)
      let tag = ref(null)
      
      let visible = ref(false)
      let top = ref(0)
      let left = ref(0)
      let selectedTag = ref({})
      let affixTags = ref([])
     
      const set = reactive({
        visitedViews: computed(() => {
          const result = store.state.tagsView.visitedViews
          return result
        }),
        routes: computed(() => {
          return store.state.permission.routes
        })
      })
      
      watch(
          () => visible.value,
          value => {
            if ( value ) {
              document.body.addEventListener("click", closeMenu)
            } else {
              document.body.removeEventListener("click", closeMenu)
            }
          }
      )
  
      watch(
          route,
          () => {
            addTags()
            moveToCurrentTag()
          }
      )
  
      function closeMenu() {
        visible.value = false
      }
      function addTags() {
        const { name } = route
        if (name) {
          store.dispatch('tagsView/addView', route)
        }
        return false
      }
      function moveToCurrentTag() {
        nextTick( () => {
          const tags = tag.value
          console.log( 'tags', tags, Array.isArray( tags ) )
          if ( !tags && !Array.isArray( tags ) ) return false
          for (const item of tags) {
            if (item.to.path === route.path) {
              scrollPane.value.moveToTarget( item )
              if ( item.to.fullPath !== route.fullPath ) {
                store.dispatch('tagsView/updateVisitedView', route )
              }
              break
            }
          }
        } )
      }
      function initTags() {
        const affixs = affixTags.value = filterAffixTags( set.routes )
        for ( const item of affixs ) {
          if ( item.name ) {
            store.dispatch('tagsView/addVisitedView', item )
          }
        }
      }
      function filterAffixTags( routes, basePath = '/') {
        let tags = []
        routes.forEach(route => {
          if (route.meta && route.meta.affix) {
            const tagPath = path.resolve(basePath, route.path)
            tags.push({
              fullPath: tagPath,
              path: tagPath,
              name: route.name,
              meta: { ...route.meta }
            })
          }
          if (route.children) {
            const tempTags = filterAffixTags(route.children, route.path)
            if (tempTags.length >= 1) {
              tags = [...tags, ...tempTags]
            }
          }
        })
        return tags
      }
  
      function isActive(currentRoute) {
        return currentRoute.path === route.path
      }
      function isAffix( item ) {
        return item && item.meta && item.meta.affix
      }
      function refreshSelectedTag(view) {
        store.dispatch('tagsView/delCachedView', view).then(() => {
          const { fullPath } = view
          nextTick(() => {
            router.replace({
              // path: '/redirect' + fullPath
              path: fullPath
            })
          })
        })
      }
      function closeSelectedTag(view) {
        store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
          if (isActive(view)) {
            toLastView(visitedViews, view)
          }
        })
      }
      function closeOthersTags() {
        router.push(selectedTag.value)
        store.dispatch('tagsView/delOthersViews', selectedTag.value).then(() => {
          moveToCurrentTag()
        })
      }
      function closeAllTags(view) {
        store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
          if (affixTags.value.some(item => item.path === view.path)) {
            return
          }
          toLastView(visitedViews, view)
        })
      }
      function toLastView(visitedViews, view) {
        const latestView = visitedViews.slice(-1)[0]
        if (latestView) {
          router.push(latestView.fullPath)
        } else {
          // now the default is to redirect to the home page if there is no tags-view,
          // you can adjust it according to your needs.
          if (view.name === 'Dashboard') {
            // to reload home page
            // router.replace({ path: '/redirect' + view.fullPath })
            router.replace({ path: view.fullPath })
          } else {
            router.push('/')
          }
        }
      }
      function openMenu( item, e ) {
        const menuMinWidth = 105
        const offsetLeft = ctx.$el.getBoundingClientRect().left // container margin left
        const offsetWidth = ctx.$el.offsetWidth // container width
        const maxLeft = offsetWidth - menuMinWidth // left boundary
        const l = e.clientX - offsetLeft + 15 // 鼠标相对于父级的left 值
    
        if (l > maxLeft) {
          left.value = maxLeft
        } else {
          left.value = l
        }
    
        top.value = e.clientY
        visible.value = true
        selectedTag.value = item
      }
      function handleScroll() {
        closeMenu()
      }
  
      onMounted(() => {
        initTags()
        addTags()
      });
      
      onBeforeMount(() => {
        // useEventListener("resize", $_resizeHandler);
      });
      
      return {
        ...toRefs(set),
        scrollPane,
        tag,
  
        visible,
        top,
        left,
        selectedTag,
        affixTags,
        
        closeMenu,
        addTags,
        moveToCurrentTag,
        initTags,
        filterAffixTags,
        isActive,
        isAffix,
        refreshSelectedTag,
        closeSelectedTag,
        closeOthersTags,
        closeAllTags,
        toLastView,
        openMenu,
        handleScroll,
      }
    }
  }
</script>

<!--<script>
  import ScrollPane from './ScrollPane.vue'
  import path from 'path'
  
  export default {
    components: { ScrollPane },
    data() {
      return {
        visible: false,
        top: 0,
        left: 0,
        selectedTag: {},
        affixTags: []
      }
    },
    computed: {
      visitedViews() {
        return this.$store.state.tagsView.visitedViews
      },
      routes() {
        return this.$store.state.permission.routes
      }
    },
    watch: {
      $route() {
        this.addTags()
        this.moveToCurrentTag()
      },
      visible(value) {
        if (value) {
          document.body.addEventListener('click', this.closeMenu)
        } else {
          document.body.removeEventListener('click', this.closeMenu)
        }
      }
    },
    mounted() {
      this.initTags()
      this.addTags()
    },
    methods: {
      isActive(route) {
        return route.path === this.$route.path
      },
      isAffix(tag) {
        return tag.meta && tag.meta.affix
      },
      filterAffixTags(routes, basePath = '/') {
        let tags = []
        routes.forEach(route => {
          if (route.meta && route.meta.affix) {
            const tagPath = path.resolve(basePath, route.path)
            tags.push({
              fullPath: tagPath,
              path: tagPath,
              name: route.name,
              meta: { ...route.meta }
            })
          }
          if (route.children) {
            const tempTags = this.filterAffixTags(route.children, route.path)
            if (tempTags.length >= 1) {
              tags = [...tags, ...tempTags]
            }
          }
        })
        return tags
      },
      initTags() {
        const affixTags = this.affixTags = this.filterAffixTags(this.routes)
        for (const tag of affixTags) {
          // Must have tag name
          if (tag.name) {
            this.$store.dispatch('tagsView/addVisitedView', tag)
          }
        }
      },
      addTags() {
        const { name } = this.$route
        if (name) {
          this.$store.dispatch('tagsView/addView', this.$route)
        }
        return false
      },
      moveToCurrentTag() {
        const tags = this.$refs.tag
        const isIterable = obj => obj != null && typeof obj[Symbol.iterator] === 'function'
        
        console.log( '2 test', isIterable(tags ), tags )
        
        this.$nextTick(() => {
          if ( !tags ) return false
          for (const tag of tags) {
            if (tag.to.path === this.$route.path) {
              this.$refs.scrollPane.moveToTarget(tag)
              // when query is different then update
              if (tag.to.fullPath !== this.$route.fullPath) {
                this.$store.dispatch('tagsView/updateVisitedView', this.$route)
              }
              break
            }
          }
        })
      },
      refreshSelectedTag(view) {
        this.$store.dispatch('tagsView/delCachedView', view).then(() => {
          const { fullPath } = view
          this.$nextTick(() => {
            this.$router.replace({
              // path: '/redirect' + fullPath
              path: fullPath
            })
          })
        })
      },
      closeSelectedTag(view) {
        this.$store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
          if (this.isActive(view)) {
            this.toLastView(visitedViews, view)
          }
        })
      },
      closeOthersTags() {
        this.$router.push(this.selectedTag)
        this.$store.dispatch('tagsView/delOthersViews', this.selectedTag).then(() => {
          this.moveToCurrentTag()
        })
      },
      closeAllTags(view) {
        this.$store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
          if (this.affixTags.some(tag => tag.path === view.path)) {
            return
          }
          this.toLastView(visitedViews, view)
        })
      },
      toLastView(visitedViews, view) {
        const latestView = visitedViews.slice(-1)[0]
        if (latestView) {
          this.$router.push(latestView.fullPath)
        } else {
          // now the default is to redirect to the home page if there is no tags-view,
          // you can adjust it according to your needs.
          if (view.name === 'Dashboard') {
            // to reload home page
            // this.$router.replace({ path: '/redirect' + view.fullPath })
            this.$router.replace({ path: view.fullPath })
          } else {
            this.$router.push('/')
          }
        }
      },
      openMenu(tag, e) {
        const menuMinWidth = 105
        const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
        const offsetWidth = this.$el.offsetWidth // container width
        const maxLeft = offsetWidth - menuMinWidth // left boundary
        const left = e.clientX - offsetLeft + 15 // 15: margin right
        
        if (left > maxLeft) {
          this.left = maxLeft
        } else {
          this.left = left
        }
        
        this.top = e.clientY
        this.visible = true
        this.selectedTag = tag
      },
      closeMenu() {
        this.visible = false
      },
      handleScroll() {
        this.closeMenu()
      }
    }
  }
</script>-->

<style lang="scss" scoped>
  .tags-view-container {
    height: 34px;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
    .tags-view-wrapper {
      .tags-view-item {
        display: inline-block;
        position: relative;
        cursor: pointer;
        height: 26px;
        line-height: 26px;
        border: 1px solid #d8dce5;
        color: #495060;
        background: #fff;
        padding: 0 8px;
        font-size: 12px;
        margin-left: 5px;
        margin-top: 4px;
        &:first-of-type {
          margin-left: 15px;
        }
        &:last-of-type {
          margin-right: 15px;
        }
        &.active {
          background-color: #42b983;
          color: #fff;
          border-color: #42b983;
          &::before {
            content: '';
            background: #fff;
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            position: relative;
            margin-right: 2px;
          }
        }
      }
    }
    .contextmenu {
      margin: 0;
      background: #fff;
      z-index: 3000;
      position: absolute;
      list-style-type: none;
      padding: 5px 0;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 400;
      color: #333;
      box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
      li {
        margin: 0;
        padding: 7px 16px;
        cursor: pointer;
        &:hover {
          background: #eee;
        }
      }
    }
  }
</style>

<style lang="scss">
  //reset element css of el-icon-close
  .tags-view-wrapper {
    .tags-view-item {
      .el-icon-close {
        width: 16px;
        height: 16px;
        vertical-align: 2px;
        border-radius: 50%;
        text-align: center;
        transition: all .3s cubic-bezier(.645, .045, .355, 1);
        transform-origin: 100% 50%;
        &:before {
          transform: scale(.6);
          display: inline-block;
          vertical-align: -3px;
        }
        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }
    }
  }
</style>


