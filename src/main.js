// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import routes from '@/router/route'
import store from '@/store/store'
import iView from 'iview';
import axios from 'axios';
import 'iview/dist/styles/iview.css';
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
store.commit('set_token',{token: localStorage.getItem('token'),userId:localStorage.getItem('userId')})  
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
//设置拦截器
axios.defaults.baseURL = 'http://10.0.0.2:8081/mall/pc/';
// axios.defaults.baseURL = 'http://test-shop.dxracer.com.cn:8084/mall/pc/';
axios.interceptors.request.use(config => {  
// 在发送请求之前做些什么  
//判断是否存在token，如果存在将每个页面header都添加token  
if(store.state.token){
 	config.headers['token'] = store.state.token;
	config.headers['loginUserId']=store.state.userId  
}  
  
return config;  
}, error => {  
// 对请求错误做些什么  
return Promise.reject(error);  
});  
  
// http response 拦截器  
axios.interceptors.response.use(  
response => {  
return response.data;  
},  
error => {  
if (error.response) {  
		switch (error.response.status) {  
		case 401:  
		this.$store.commit('del_token');  
		router.replace({  
		path: '/login',  
		query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面  
		})  
}  
}  
return Promise.reject(error.response.data)  
}); 
/* eslint-disable no-new */
var app =new Vue({
  el: '#app',
  router,
  store,//使用store
  components: { App },
  template: '<App/>'
})
