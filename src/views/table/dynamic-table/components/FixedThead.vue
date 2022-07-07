<template>
  <div class="app-container">
    <div class="filter-container">
      <el-checkbox-group v-model="checkboxVal">
        <el-checkbox label="apple"> apple </el-checkbox>
        <el-checkbox label="banana"> banana </el-checkbox>
        <el-checkbox label="orange"> orange </el-checkbox>
      </el-checkbox-group>
    </div>

    <el-divider content-position="left">Element Plus Table</el-divider>

    <el-table :key="key" :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column prop="name" label="fruitName" width="180" />
      <el-table-column v-for="fruit in formThead" :key="fruit" :label="fruit">
        <template #default="scope">
          {{ scope.row[fruit] }}
        </template>
      </el-table-column>
    </el-table>

    <el-divider content-position="left">Vxe Table</el-divider>

    <vxe-table :key="key" round border :data="tableData">
      <vxe-column field="name" title="fruitName" width="180" />
      <vxe-column v-for="fruit in formThead" :key="fruit" :field="fruit" :title="fruit" />
    </vxe-table>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
const defaultFormThead = ['apple', 'banana']

const tableData = ref( [
  {
    name : 'fruit-1',
    apple : 'apple-10',
    banana : 'banana-10',
    orange : 'orange-10'
  },
  {
    name : 'fruit-2',
    apple : 'apple-20',
    banana : 'banana-20',
    orange : 'orange-20'
  }
] )
const key = ref( 1 )
const formTheadOptions = ref( ['apple', 'banana', 'orange'] )
const checkboxVal = ref( defaultFormThead )
const formThead = ref( defaultFormThead )

watch( checkboxVal, valArr => {
  formThead.value = formTheadOptions.value.filter( i => valArr.indexOf( i ) >= 0 )
  key.value = key.value + 1
} )

defineOptions( {
  name : 'FixedThead'
} )
</script>
