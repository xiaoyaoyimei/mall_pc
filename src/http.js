import axios from 'axios';
import { getToken, getUserId,removeToken,removeUserId } from '@/base/auth'
import global_ from '@/base/baseParam';
import store from '@/store/store';
import router from '@/router/route';
import Vue from 'vue';
import {Modal,Message} from 'iview'
Vue.prototype.$Modal = Modal
Vue.prototype.$Message = Message
// axios 配置
axios.defaults.timeout = 9000;
//修改flj
//生产环境
axios.defaults.baseURL = `/mall/pc`;
// http request 拦截器
axios.interceptors.request.use(
	config => {
		if(getToken()) {
			config.headers['token'] = getToken();
			config.headers['loginUserId'] = getUserId();
		}
		return config;
	},
	err => {
		return Promise.reject(err);
	});

// http response 拦截器
axios.interceptors.response.use(
	response => {
		if(response.data.code ===401) {
			if(getToken()!=''&&getToken()!=undefined){
				        removeToken();//避免回调地狱
					  store.dispatch('LogOut').then(() => {
			            Message.error( '验证已过期, 请重新登录')
				        //   window.location.href=global_.originurl+'/#/login'
				           		router.replace({
			                        path: '/login',
			                        query: {redirect: router.currentRoute.fullPath}
                        //redirect 登录以后回到上一页面
                    		})
				             return false
				          })
			}else{
				  return false
			}
			}else{
				  return response.data
			}
//			 Modal.confirm({
//               title: '登出提示',
//               content: '<p>你已被登出，请重新登录</p>',
//               okText: '确定登出',
//                onOk: () => {
//                    store.dispatch('LogOut').then(() => {
//				            Message.error( '验证已过期, 请重新登录')
//				            window.location.href=global_.originurl+'/#/login'
//				             return false
//				          })
//               }
//              });
		//}
	},
	error => {
		// console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
		return Promise.reject(error.response)
	});

export default axios;