<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="less">
@import './my-theme/index.less';
</style>
<style lang="scss">
 @import '@/styles/common.scss';
  @import '@/styles/color.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #666;
  height:100vh;
  background: #f6f6f6;
}
.icon{
    cursor: pointer;
    background-image:url(./assets/img/header_sprite.png);
    background-repeat: no-repeat;
    background-attachment: scroll;
    display: inline-block;
}
ul,li{
	list-style: none;
}
</style>
