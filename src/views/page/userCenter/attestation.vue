<template>
  <LoginHistory title="实名认证">
    <template #head>
      <div class="head-text">
        <div class="text">根据国家政策要求，请您进行实名认证</div>
        <div class="text">实名信息提交后不可修改，请谨慎填写</div>
      </div>
    </template>
    <template #body>
      <!-- 实名认证-->
      <div v-if="!isAttestation" class="auth-body flex-column flex-vertical-center">
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="0px" class="rule-form">
          <el-form-item prop="name">
            <el-input class="h50" v-model="ruleForm.name" placeholder="单行输入" />
            <div class="description">例如：华安</div>
          </el-form-item>
          <el-form-item prop="idNumber">
            <el-input class="h50" v-model="ruleForm.idNumber" placeholder="身份证号" />
            <div class="description">例如：320981202207079527</div>
          </el-form-item>
          <div style="margin-top: 35px">
            <el-button
              class="submit-btn h50"
              :type="canSubmit ? 'primary' : 'info'"
              @click="submit(ruleFormRef)"
              :disabled="!canSubmit"
              >提交认证</el-button
            >
          </div>
        </el-form>
      </div>

      <div v-else class="auth-body flex-column flex-vertical-center">
        <div class="flex-row flex-vertical-center">
          <svg-icon icon-class="ok" />
          <p class="label">完成身份认证</p>
        </div>
        <div class="getter-row flex-row flex-vertical-center flex-between" style="margin-top: 54px">
          <span class="label">真实姓名: </span>
          <span class="value"> {{ ruleForm.name }}</span>
        </div>
        <div class="getter-row flex-row flex-vertical-center flex-between" style="margin-top: 15px">
          <span class="label">身份证号: </span>
          <span class="value"> {{ ruleForm.idNumber }}</span>
        </div>
      </div>
    </template>
    <template #foot>
      <div class="line" />
    </template>
  </LoginHistory>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { validID } from '/@/utils/validate'
import { ElMessage } from 'element-plus'
import LoginHistory from './components/infoLayout'

const ruleFormRef = ref()

const isAttestation = ref( false )

const ruleForm = reactive( {
  name : '',
  idNumber : ''
} )

// 校验身份证号码
const checkIdNumber = ( rule, value, callback ) => {
  if ( value ) {
    if ( validID( value ) ) {
      callback()
    } else {
      callback( new Error( '您输入的身份证有误，请重新输入' ) )
    }
  } else {
    callback( new Error( '请输入身份证号' ) )
  }
}

const rules = {
  name : [
    { required : false, message : '请输入姓名', trigger : ['blur', 'change'] },
    {
      required : false,
      pattern : /^[\u4e00-\u9fa5]{2,5}$/,
      message : '您输入的姓名有误，请重新输入',
      trigger : ['blur', 'change']
    }
  ],
  idNumber : [
    { required : false, message : '请输入身份证号', trigger : 'blur' },
    {
      required : false,
      validator : checkIdNumber,
      trigger : 'blur'
    }
  ]
}

const canSubmit = computed( () => {
  return ruleForm.name && ruleForm.idNumber
} )

const submit = async formEl => {
  if ( !formEl ) return
  ;( await formEl ) &&
    formEl.validate( ( valid, fields ) => {
      if ( valid ) {
        ElMessage( {
          message : '您已提交实名认证',
          type : 'success'
        } )
        isAttestation.value = true
      }
    } )
}

const getHistory = async() => {
  try {
    // // 模拟了10w条数据，使用element 虚拟表格渲染
    // const { code, data } = await loginHistory()
    // if ( code == 200 ) {
    //   tableData.value = data
    // }
  } catch ( e ) {}
}
getHistory()

defineOptions( {
  name : 'Attestation'
} )
</script>

<style lang="scss" scoped>
::v-deep(.center-box) {
}
.head-text {
  text-align: center;
  padding-top: 140px;
  padding-bottom: 20px;
  .text {
    text-align: center;
    color: #606266;
    font-size: 18px;
    line-height: 26px;
  }
}

.auth-body {
  .h50 {
    height: 50px;
    border-radius: 5px;
    color: #101010;
    font-size: 14px;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.2);
  }
  .description {
    color: #b2b2b2;
    font-size: 12px;
    display: block;
  }
  .submit-btn {
    font-size: 16px;
    color: #fff;
    width: 100%;
  }

  .svg-icon {
    color: #67c23a;
    width: 28px;
    height: 28px;
    margin-right: 10px;
  }
  .label {
    color: rgba(51, 51, 51, 1);
    font-size: 16px;
  }
  .value {
    color: rgba(190, 190, 190, 1);
    font-size: 16px;
  }
}
</style>
