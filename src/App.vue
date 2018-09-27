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
  font-family: "Microsoft YaHei",'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #888;
  height:100vh;
}

.icon{
    cursor: pointer;
    background-image:url(./assets/img/header_sprite.png);
    background-repeat: no-repeat;
    background-attachment: scroll;
    display: inline-block;
}
.cartIcon {
	  background-image: url(./assets/img/icon.png) ;
    background-repeat: no-repeat;
    background-attachment: scroll;
    display: inline-block;
}
.icon-new{
    cursor: pointer;
    background-image:url(./assets/img/script.png);
    background-repeat: no-repeat;
    background-attachment: scroll;
    display: inline-block;
}
ul,li{
	list-style: none;
}
</style>
