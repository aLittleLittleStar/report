<template>
  <div class="wrapper">
    <v-head></v-head>
    <div class="contener">
      <!-- <v-left></v-left> -->
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  import vHead from '../components/Header.vue'
  // import vLeft from '../components/Left.vue'
  export default {
    name: 'Index',
    components: {
      vHead
    },
  }
</script>
<style lang="stylus" scoped>
.wrapper
  height: 100%
  width:100%;
  overflow: auto
  background: #f0f0f0
.contener
  position: relative;
  display:flex;
  width:100%;
  height: 100%;
  padding-top:60px;
  box-sizing: border-box;
  overflow: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling:touch;
.content{
  flex:1;
  height: 100%;
  padding:10px;
  box-sizing: border-box;
  overflow-y:auto;
}
</style>
