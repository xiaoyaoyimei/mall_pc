// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router  from '@/router/route'
import store from '@/store/store'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import axios from './http';
import moment from 'moment/moment';
import VueBus from 'vue-bus';
Vue.use(VueBus);

//设置全局变量
import global_ from '@/base/baseParam';

// 导入所有的过滤器变量
import * as custom from '@/base/basefilters/'
// 导出的是对象，可以直接通过key和value来获得过滤器的名和过滤器的方法
Object.keys(custom).forEach(key => {
    Vue.filter(key, custom[key])
})
Vue.config.productionTip = false
Vue.use(iView);
Vue.prototype.global_=global_;
Vue.prototype.$axios = axios;
/* eslint-disable no-new */
var app =new Vue({
  el: '#app',
  router,
  store,//使用store
  components: { App },
  template: '<App/>'
})


