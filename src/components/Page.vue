<template>
  <div class="page">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pageInfo.page"
      :page-sizes.sync="sizes"
      :page-size="pageInfo.limit"
      layout="total,sizes, prev, pager, next"
      :total="pageInfo.count">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    name:'Page',
    props:{
      // "pageInfo"
      pageInfo:{
        type:Object,
        default:function(){
          return {page:1,limit:10,count:0}
        }
      }
    },
    data(){
      return {
        sizes:[10,20,30,50,80,100],
      }
    },
    methods:{
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageInfo.limit = val;
        this.pageInfo.page = 1;
        this.$emit('changePage',this.pageInfo)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pageInfo.page = val;
        this.$emit('changePage',this.pageInfo) 
      },
    }
  }
</script>
<style>
  
</style>