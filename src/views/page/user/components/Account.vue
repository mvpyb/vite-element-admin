<template>
  <el-form>
    <el-form-item label="Name">
      <el-input v-model.trim="user.name" />
    </el-form-item>
    <el-form-item label="Email">
      <el-input v-model.trim="user.email" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">Update</el-button>
    </el-form-item>
  </el-form>
</template>

<script>

defineProps( {
  user : {
    type : Object,
    default : () => {
      return {
        name : '',
        email : ''
      }
    }
  }
} )

// eslint-disable-next-line no-unused-vars
const submit = () => {
  console.log( 11 )
}
</script>
