<template>
  <!--  <p class="test">{{ $t('header.home') }}</p>-->
  <el-config-provider :locale="locale" :size="size">
    <router-view />
  </el-config-provider>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zh from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import { useAppStore } from '/@/store'
// import { useI18n } from 'vue-i18n'

export default defineComponent( {
  name : 'App',
  components : {
    [ElConfigProvider.name] : ElConfigProvider
  },
  setup() {
    // const { t } = useI18n()
    const appStore = useAppStore()
    const locale = computed( () => ( appStore.lang === 'zh' ? zh : en ) )
    const size = computed( () => appStore.size )
    return {
      locale,
      size
    }
  }
} )
</script>
