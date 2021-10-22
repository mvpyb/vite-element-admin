<template>
  <el-form
    ref="ruleForm"
    :model="formState"
    :rules="rules"
    label-width="0"
    status-icon
    class="login-ruleForm"
  >
    <el-form-item prop="account">
      <el-input
        ref="account"
        v-model="formState.account"
        name="account"
        placeholder="邮箱/手机"
        :clearable="true"
        tabindex="1"
        type="text"
        maxlength="100"
        autocomplete="off"
      />
    </el-form-item>

    <el-form-item prop="password" class="">
      <el-input
        ref="password"
        v-model="formState.password"
        show-password
        name="password"
        placeholder="请输入密码"
        :clearable="true"
        tabindex="2"
        maxlength="16"
        type="password"
        autocomplete="off"
        @keyup.enter="loginHandle"
      />
    </el-form-item>

    <el-form-item v-if="showCaptcha" prop="captcha" class="">
      <div style="position: relative">
        <div class="code-inp">
          <el-input
            ref="captcha"
            v-model="formState.captcha"
            type="text"
            name="captcha"
            placeholder="请输入校验码"
            :clearable="true"
            tabindex="3"
            maxlength="6"
            autocomplete="off"
            @keyup.enter="loginHandle"
          />
        </div>
        <div class="code">
          <img :src="captchaImg" alt="" @click="updateImage" />
        </div>
      </div>
    </el-form-item>

    <el-form-item class="h40" style="margin-bottom: 0">
      <el-button
        :loading="loading"
        :disabled="disabledLogin"
        type="primary"
        class="h40"
        style="width: 100%"
        @click.prevent="loginHandle"
      >
        快速登录
      </el-button>

      <el-button
        :loading="loading"
        type="text"
        class="h40"
        style="width: 100%"
        @click.prevent="freeLogin"
      >
        免登录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { ref, defineComponent, onBeforeMount, reactive, computed } from 'vue'
import { login } from '/@/api/user'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent( {
  name : 'LoginPwd',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()

    const ruleForm = ref()
    const trigger = ['blur', 'change']
    const formState = reactive( {
      country : '86',
      captcha : '',
      account : '',
      password : ''
    } )
    const rules = {
      account : [{ required : true, message : '请输入手机或邮箱账号', trigger }],
      password : [{ required : true, message : '请输入密码', trigger }],
      captcha : [{ required : true, message : '请输入校验码', trigger }]
    }
    const bindToken = ref( '' )
    const showCaptcha = ref( false )
    const captchaImg = ref( '' )
    const captchaId = ref( '' )
    const loading = ref( false )

    const disabledLogin = computed( () => {
      const { captcha, account, password } = formState
      if ( showCaptcha.value ) {
        return !captcha || !account || !password
      } else {
        return !account || !password
      }
    } )

    onBeforeMount( () => {
      getQueryParams()
    } )

    function getQueryParams() {
      const query = route.query
      // 微信 登录
      bindToken.value = query.bindToken || ''
    }

    async function updateImage() {
      // try {
      //   const { code, data } = await request.getCaptcha()
      //   if ( code == 200 ) {
      //     const { captchaId, bs64 } = data
      //     captchaImg.value = bs64
      //     captchaId.value = captchaId
      //   }
      // } catch ( e ) {
      //   captchaImg.value = ''
      //   captchaId.value = ''
      // }
    }

    async function freeLogin() {
      loading.value = true
      try {
        await store.dispatch( 'user/saveToken', {
          token : 'token'
        } )
        router.push( '/' )
      } catch ( e ) {
      } finally {
        loading.value = false
      }
    }

    function loginHandle() {
      loading.value = true
      ruleForm.value.validate( async( valid ) => {
        if ( valid ) {
          try {
            const params = {
              username : formState.account,
              password : formState.password
            }
            if ( showCaptcha.value ) {
              params.captchaId = captchaId.value
              params.captchaValue = formState.captcha
            }
            const { data } = await login( { params } )
            const { token } = data
            await store.dispatch( 'user/saveToken', {
              token
            } )
            router.push( '/' )
          } catch ( e ) {
          } finally {
            loading.value = false
            if ( showCaptcha.value ) {
              await updateImage()
            }
          }
        }
      } )
    }

    return {
      trigger,
      ruleForm,
      formState,
      rules,
      bindToken,
      showCaptcha,
      captchaImg,
      captchaId,
      loading,
      disabledLogin,
      getQueryParams,
      updateImage,
      loginHandle,
      freeLogin
    }
  }
} )
</script>

<style lang="scss" scoped>
img {
  display: inline-block;
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
}
/*验证码*/
.code-inp {
  width: calc(100% - 125px);
  display: inline-block;
  vertical-align: middle;
  margin-right: 15px;
}
.code {
  display: inline-block;
  height: 40px;
  width: 110px;
  cursor: pointer;
  vertical-align: middle;
  &:hover {
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>
