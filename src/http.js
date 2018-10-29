import axios from 'axios';
import {getToken,getUserId} from '@/base/auth'
import global_ from '@/base/baseParam';
import store from '@/store/store';
import router from '@/router/route';

// axios 配置
axios.defaults.timeout = 9000;
//修改flj
//生产环境
axios.defaults.baseURL =`/mall/pc`;
// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (store.state.token) {
<<<<<<< HEAD
          config.headers['token'] = store.state.token;
		  config.headers['loginUserId']=store.state.userId;
=======
                 config.headers['token'] = store.state.token;
		  config.headers['loginUserId']=store.state.userId
>>>>>>> b813c03046689f27a04107b7e58a6e0752b1cec7
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
    	
<<<<<<< HEAD
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
=======
//  	if(response.data.code=='401'){
////  		console.log( router.currentRoute);
////  		     	 store.dispatch('LogOut').then(() => {
////				          //  	_this.$router.push('/login');
////				          return false
////       				 })
//  		     	 
////  		 console.log(url)
//  		  router.replace({
//                      name: '/login',
//                      query: {redirect: router.currentRoute.fullPath}
//                  })
//  		  return false
//  	  }
//      return response.data;
            	if(response.data.code=='401'){
            		console.log(response)
    				 store.commit('LOGOUT');
    		//router.replace('/login');
    				 window.location.href=global_.originurl+'/#/login'
//  		  router.replace({
//                      name: '/login',
//                      query: {redirect: router.currentRoute.fullPath}
//                  })
    		    return false
>>>>>>> b813c03046689f27a04107b7e58a6e0752b1cec7
    	  }
        return response.data;
    },
    error => {
       // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        return Promise.reject(error.response)
    });

export default axios;
