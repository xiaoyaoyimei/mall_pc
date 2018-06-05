import axios from 'axios'
import store from '@/store/store'
import router from '@/router/route'

// axios 配置
axios.defaults.timeout = 5000;
//设置拦截器
//axios.defaults.baseURL = 'http://10.0.0.2:8081/mall/pc/';
axios.defaults.baseURL = 'http://test-shop.dxracer.com.cn:8084/mall/pc/';
// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (store.state.token) {
          config.headers['token'] = store.state.token;
		  config.headers['loginUserId']=store.state.userId  
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
    	
    	if(error.message.indexOf("Network")!=-1){
    		        store.commit('LOGOUT');
                    router.replace({
                        path: 'login',
                        query: {redirect: router.currentRoute.fullPath}
                    })
    	}
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 401 清除token信息并跳转到登录页面
                    store.commit('LOGOUT');
                    router.replace({
                        path: 'login',
                        query: {redirect: router.currentRoute.fullPath}
                    })
            }
        }
        console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        return Promise.reject(error.response.data)
    });

export default axios;
