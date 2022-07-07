<template>
  <el-table ref="multipleTable" :data="set.newList" tooltip-effect="dark" style="width: 100%">
    <el-table-column label="Date">
      <template #default="scope">{{ scope.row.date }}</template>
    </el-table-column>

    <el-table-column label="Order_No" min-width="100">
      <template #default="scope">
        {{ scope.row.orderNoStr }}
      </template>
    </el-table-column>

    <el-table-column label="Status" width="100" align="center">
      <template #default="scope">
        <el-tag :type="scope.row.statusStr">
          {{ scope.row.status }}
        </el-tag>
      </template>
    </el-table-column>

    <el-table-column label="Price" min-width="100" align="center">
      <template #default="scope"> ¥{{ scope.row.price }} </template>
    </el-table-column>

    <el-table-column prop="name" label="Name"></el-table-column>

    <el-table-column prop="address" label="Address" show-overflow-tooltip />
  </el-table>
</template>

<script setup>
import { ref, reactive, computed, onBeforeMount } from 'vue'

// eslint-disable-next-line prefer-const
let list = ref( [] )

const set = reactive( {
  newList : computed( () => {
    const statusMap = {
      Completed : 'success',
      Pending : 'warning',
      Cancelled : 'danger'
    }
    if ( list.value && list.value.length > 0 ) {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      list.value = list.value.map( item => {
        return {
          ...item,
          orderNoStr : item.order_no.substring( 0, 30 ),
          statusStr : statusMap[item.status]
        }
      } )
    } else {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      list.value = []
    }
    return list.value
  } )
} )

onBeforeMount( () => {
  fetchData()
} )

const fetchData = () => {
  list.value = [
    {
      date : '2017-05-13',
      name : '招财',
      status : 'Completed',
      price : '9527',
      order_no : '123456789123456789',
      address : '上海市浦东新区洲海路 920 弄'
    },
    {
      date : '2018-05-23',
      name : '进宝',
      status : 'Pending',
      price : '6666',
      order_no : '123456789123456781',
      address : '上海市浦东新区洲海路 920 弄'
    },
    {
      date : '2019-05-12',
      name : '张三',
      status : 'Cancelled',
      price : '8888',
      order_no : '89897898562554545',
      address : '上海市浦东新区洲海路 920 弄'
    },
    {
      date : '2020-05-14',
      name : '李四',
      status : 'Cancelled',
      price : '9528',
      order_no : '56125578785125',
      address : '上海市浦东新区洲海路 920 弄'
    },
    {
      date : '2021-05-22',
      name : '王五',
      status : 'Cancelled',
      price : '0',
      order_no : '32659898775888',
      address : '上海市浦东新区洲海路 920 弄'
    },
    {
      date : '2021-05-22',
      name : '王六',
      status : 'Cancelled',
      price : '0',
      order_no : '32659898775888',
      address : '上海市浦东新区洲海路 920 弄'
    },
    {
      date : '2021-05-22',
      name : '王七',
      status : 'Cancelled',
      price : '0',
      order_no : '32659898775888',
      address : '上海市浦东新区洲海路 920 弄'
    }
  ]
}

defineOptions( {
  name : 'TransactionTable'
} )
</script>
