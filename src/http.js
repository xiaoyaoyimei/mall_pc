import axios from 'axios';
import {getToken,getUserId} from '@/base/auth'
import store from '@/store/store';
import router from '@/router/route';

// axios 配置
axios.defaults.timeout = 9000;
//测试环境
//axios.defaults.baseURL =`/pc`;
//修改flj
//生产环境
axios.defaults.baseURL =`/mall/pc`;
//axios.defaults.baseURL='http://www.dxracer.cn/mall/pc'
// http request 拦截器
axios.interceptors.request.use(
    config => {
//  const token = getCookie('token'); //获取Cookie
//  const loginUserId=getCookie('userId')
//  config.data = JSON.stringify(config.data);
//  config.headers = {
//    'Content-Type':'application/x-www-form-urlencoded' //设置跨域头部
//  };
//  if (token) {
//    config.params = {'token': token,'loginUserId':loginUserId} //后台接收的参数，后面我们将说明后台如何接收
//  }
//  return config;
//},
        if (store.state.token) {
          config.headers['token'] = store.state.token;
		  config.headers['loginUserId']=store.state.userId;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
    	
    	if(response.data.code=='401'){
  		console.log( router.currentRoute);
    		     	//  store.dispatch('LogOut').then(() => {
				    //       //  	_this.$router.push('/login');
				    //       return false
         			// 	 })
    		     	 
//  		 console.log(url)
 		  router.replace({
                     name: '/login',
                     query: {redirect: router.currentRoute.fullPath}
                 })
    		  return false
    	  }
        return response.data;
    },
    error => {
       // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        return Promise.reject(error.response)
    });

export default axios;
