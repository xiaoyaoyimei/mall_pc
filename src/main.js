// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router  from '@/router/route';
import store from '@/store/store';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import './my-theme/index.less';  
import axios from './http';
import moment from 'moment/moment';
console.log(process.env)
//设置全局变量
import global_ from '@/base/baseParam';

// 导入所有的过滤器变量
import * as custom from '@/base/basefilters/'
// 导出的是对象，可以直接通过key和value来获得过滤器的名和过滤器的方法
Object.keys(custom).forEach(key => {
    Vue.filter(key, custom[key])
})
Vue.filter('moment', function (value, formatString) {
  formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
  // return moment(value).format(formatString); // value可以是普通日期 20170723
  return moment.unix(value).format(formatString); // 这是时间戳转时间
});
Vue.config.productionTip = false
Vue.use(iView);
Vue.prototype.global_=global_;
Vue.prototype.$axios = axios;
/* eslint-disable no-new */
var app =new Vue({
  el: '#app',
  router,
  store,//使用store
  // render: h => h(App)
  components: { App },
  template: '<App/>'
})


