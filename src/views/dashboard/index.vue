<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="32">
      <el-col :xs="24" :sm="12" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="8">
        <div class="chart-wrapper">
          <bar-chart class-name="test" />
        </div>
      </el-col>
    </el-row>
    
    <el-row :gutter="8">
      <el-col
          :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <todo-list />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <box-card />
      </el-col>
    </el-row>
  
  </div>
</template>

<script>
  import RaddarChart from '../components/RaddarChart.vue'
  import PieChart from '../components/PieChart.vue'
  import BarChart from '../components/BarChart.vue'

  import TodoList from '../components/TodoList/index.vue'
  import BoxCard from '../components/BoxCard.vue'
  import TransactionTable from '../components/TransactionTable.vue'
  
  import { testRequest } from '/@/api/user'
  
  export default {
    name: "Dashboard",
    components: {
      TodoList, BoxCard, TransactionTable,
      RaddarChart, PieChart, BarChart
    },
    setup() {
      const openDepot = () => {
        // window.open("https://github.com/xiaoxian521/vue-pure-admin");
      }
      return {
        openDepot
      }
    }
  };
</script>

<style lang="scss" scoped>
  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;
    
    .top-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 120px;
      background: #fff;
      padding: 20px;
      border-bottom: 0.5px solid rgba($color: #ccc, $alpha: 0.3);
      .left-mark {
        display: flex;
        align-items: center;
        img {
          display: block;
          width: 72px;
          height: 72px;
          border-radius: 50%;
          margin-right: 10px;
          cursor: pointer;
        }
      }
    }
    .box-card {
      width: 80vw;
      margin: 10px auto;
      position: relative;
      #brokenLine {
        width: 100%;
        height: 50vh;
      }
    }
  }
</style>
