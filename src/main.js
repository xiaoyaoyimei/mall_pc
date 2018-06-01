// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import routes from '@/router/route'
import store from '@/store/store'
import iView from 'iview';
import axios from './http';
import '@/my-theme/index.less'
import moment from 'moment/moment'
import fang_ from '@/assets/js/user.js'
import imgZoom from 'vue2.0-zoom'
//设置全局变量
import global_ from '@/base/baseParam';

// 导入所有的过滤器变量
import * as custom from '@/base/basefilters/'
// 导出的是对象，可以直接通过key和value来获得过滤器的名和过滤器的方法
Object.keys(custom).forEach(key => {
    Vue.filter(key, custom[key])
})
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(iView);
Vue.prototype.global_=global_;
Vue.prototype.$axios = axios;
Vue.prototype.fang_ = fang_;
// 页面刷新时，重新赋值token  
if (localStorage.getItem('token')) {  
store.commit('LOGIN',{token: localStorage.getItem('token'),userId:localStorage.getItem('userId')})  
}  
const router = new VueRouter({  
routes  
});  
router.beforeEach((to, from, next) => {  
		if (to.matched.some(r => r.meta.requireAuth)) { 
			if (store.state.token) {  
			next();  
			}  
			else {  
			next({  
					path: '/login',  
					query: {redirect: to.fullPath}  
			})  
			}  
		}  
		else {  
		next();  
		}  
}) 
/* eslint-disable no-new */
var app =new Vue({
  el: '#app',
  router,
  store,//使用store
  components: { App },
  template: '<App/>'
})


