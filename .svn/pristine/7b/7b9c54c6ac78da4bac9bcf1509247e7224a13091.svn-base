<template>
  <div class="table">
    <el-table :data="tableData" border style="width: 100%" :row-key="getRowKeys">
      <template v-for="headitem in tableHead">

        <slot v-if="headitem.slot" :name="headitem.slot"></slot>
        
        <el-table-column  v-else
          :key="headitem.id" 
          :prop="headitem.prop" 
          :label="headitem.label" 
          :width="headitem.width" 
          >
          <template slot-scope="scope">
            <!-- 数字格式 -->
            <div v-if="headitem.prop&&headitem.type&&headitem.type=='number'">{{scope.row[headitem.prop] | formatNumberRgx}}</div>

            <!-- 文案 -->
            <div v-else-if="headitem.prop">{{scope.row[headitem.prop]}}</div>

          </template>
        </el-table-column>
      </template>
    </el-table>

  </div>
</template>

<script>
  import moment from 'moment';
  export default {
    name: 'Table',
    // props: ['pageInfo','tableData','tableHead'],
    props:{
      tableData:{ //表数据
        type: Array,
        default: function() {
          return [];
        }
      },
      tableHead:{ //表头
        type: Array,
        default: function() {
          return [];
        }
      }
    },
    data() {
      return {
        value: true,
      }
    },
    methods: {
      getRowKeys(row) {
        return row.id;
      },
    },
    // 展示前处理数据
    beforeUpdate(){
      
    }
  }
</script>

<style lang='stylus' scoped>
.el-table
  margin:16px 0;
.operaWarp
  display:inline-block;margin-right:8px
.strategyCompany .operaWarp,.strategySubAccount .operaWarp{display:block; text-align:center;margin-bottom: 8px;}
.switch-box{
  display:flex;
  flex-direction: row;
}
.switch-title{
  white-space: nowrap;
  margin-right:6px;
  font-weight: 600;
}
.el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
  background-color: #ececec;
}
</style>

