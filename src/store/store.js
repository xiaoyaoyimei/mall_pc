import Vue from 'vue'  
import Vuex from 'vuex'  
Vue.use(Vuex)  
export default new Vuex.Store({  
	state:{  
	token:'' ,
	userId:''
	},  
mutations:{  
	set_token(state, payload) {  
	state.token = payload.token  
	state.userId = payload.userId  
	sessionStorage.token = payload.token   
	sessionStorage.userId = payload.userId   
	},  
	del_token(state) {  
	state.token = ''  
	state.userId = ''
	sessionStorage.removeItem('token')  
	sessionStorage.removeItem('userId')  
	},
	}  
})  