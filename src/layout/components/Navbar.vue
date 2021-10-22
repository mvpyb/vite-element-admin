<template>
  <div class="navbar clearfix">
    <yu-ham-burger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <yu-bread-crumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <yu-screen-full v-show="device !== 'mobile'" />

      <!-- 退出登陆 -->
      <el-dropdown trigger="click">
        <div class="el-dropdown-link avatar-wrapper">
          <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" />
          <p>{{ userName }}</p>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">
              <i class="el-icon-switch-button"></i>
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, computed, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { sessionStorageHandle } from '/@/utils/storages'
import { emitter } from '/@/utils/mitt'
import { isMobile } from '/@/utils/device'
import favicon from '/favicon.ico'
import YuHamBurger from '/@/components/YuHamBurger'
import YuBreadCrumb from '/@/components/YuBreadCrumb'
import YuScreenFull from '/@/components/YuScreenFull'

export default defineComponent( {
  name : 'Navbar',
  components : {
    YuBreadCrumb,
    YuHamBurger,
    YuScreenFull
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const re = sessionStorageHandle.get( 'info' )
    const userName = re ? re.username : ''

    const set = reactive( {
      sidebar : computed( () => {
        return store.getters.sidebar
      } ),
      avatar : computed( () => {
        return store.getters.avatar
      } ),
      userName : computed( () => {
        return store.getters.name
      } ),
      device : computed( () => {
        return store.getters.device
      } )
    } )

    // 退出登录
    const logout = async() => {
      await store.dispatch( 'user/logout' )
      await router.push( `/login` )
      window.location.reload()
    }

    function onPanel() {
      emitter.emit( 'openPanel' )
    }

    function toggleSideBar() {
      store.dispatch( 'app/toggleSideBar' )
    }

    onMounted( () => {
      const html1 = document.querySelector( '.el-dropdown__popper' )
      const html2 = document.querySelector( '.el-popper__arrow' )
      html1 && html1.setAttribute( 'class', 'resetTop' )
      html2 && html2.setAttribute( 'class', 'hidden' )
    } )

    return {
      ...toRefs( set ),
      logout,
      toggleSideBar,
      userName,
      favicon,
      onPanel,
      isMobile
    }
  }
} )
</script>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 50px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    position: absolute;
    right: 0;
    display: flex;
    align-items: center;
    height: 48px;
    line-height: 48px;
    .inter {
      width: 40px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      &:hover {
        cursor: pointer;
        background: #f0f0f0;
      }
      img {
        width: 25px;
      }
    }
    .hsset {
      width: 40px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-right: 5px;
      &:hover {
        cursor: pointer;
        background: #f0f0f0;
      }
    }
    .el-dropdown-link {
      width: 70px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-right: 10px;
      cursor: pointer;
      p {
        font-size: 14px;
      }
      &.avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
// single element-plus reset
.el-dropdown-menu__item {
  padding: 0 10px;
}
.el-dropdown-menu {
  padding: 0;
}
.el-dropdown-menu__item:focus,
.el-dropdown-menu__item:not(.is-disabled):hover {
  color: #606266;
  background: #f0f0f0;
}
</style>
