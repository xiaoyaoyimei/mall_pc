# mall_pc
迪瑞克斯科技商城---方方大魔王
IVIEW
IVIEW:
1：弹出窗口button必须loading才不会被关闭。
2：修改默认样式的时候极不方便，不能写在scoped里面。必须直接写在<style></style>
此外很感激作者。

由于没改过里面的数据请求地址，为真实的地址，若想参考。请勿攻击网站，谢谢。

错误集锦：

在这个项目中axios跨域请求时，低级错误。
就是直接config文件下dev.env.js中配置的  API_HOST:'"http://x.x.x.x:x"'此处有单双引号没有注意到，
导致index.js文件配置proxyTable一直以为无效。真心是坑死了自己。

router配置history模式时会导致npm run build以后有bug.没有解决。一直还是带#的配置。

加入购物车的方法没有使用到VUEX，没有单独拎除localstorage.login中的token在VUEX中维护。

router带参数时跳到下一界面不使用name中params的传参，一刷新就会丢失参数。故一直使用query的方法传参。
