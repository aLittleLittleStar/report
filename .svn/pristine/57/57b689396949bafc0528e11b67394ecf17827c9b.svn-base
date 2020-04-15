<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item 
      v-for="menuitem in menuData" 
      :to='menuitem.path' 
      :key="menuitem.id" >{{menuitem.name}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
export default {
  name: 'menuData',
  props: ['menuData'],
  data(){
    return{

    }
  }
}
</script>
<style scoped>
.el-breadcrumb{margin-bottom: 16px;}
</style>
