<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app',
  mounted(){
    let _this = this;
    document.onkeydown=function(){
      var e=window.event||arguments[0];
      if(e.keyCode==123){
        return false;
      }else if((e.ctrlKey)&&(e.shiftKey)&&(e.keyCode==73)){
        return false;
      }
    };
    document.oncontextmenu=function(){
      if(!_this.$isMobile()){return false;}
    }
  }
}
</script>

<style>
@import url('./assets/font/iconfont.css');
@import url("./assets/css/common.css");
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
