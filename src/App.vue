<template>
  <!--  <p class="test">{{ $t('header.home') }}</p>-->
  <el-config-provider :locale="locale" :size="size">
    <router-view />
  </el-config-provider>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
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

    const langList = {
      zh,
      en
    }
    const appStore = useAppStore()
    const language = ref( langList.zh )
    const size = ref( 'default' )

    watch(
      () => appStore.lang,
      val => {
        language.value = langList[val]
      },
      {
        immediate : true
      }
    )

    watch(
      () => appStore.size,
      val => {
        size.value = val
      },
      {
        immediate : true
      }
    )

    return {
      locale : language,
      size
    }
  }
} )
</script>
