import Vue from 'vue'  
import Vuex from 'vuex'  
Vue.use(Vuex)  
const store = new Vuex.Store({
	state:{  
	token:'' ,
	userId:''
	},  
mutations:{  
	set_token(state, payload) {  
	state.token = payload.token  
	state.userId = payload.userId  
	localStorage.token = payload.token   
	localStorage.userId = payload.userId   
	},  
	del_token(state) {  
	state.token = ''  
	state.userId = ''
	localStorage.removeItem('token')  
	localStorage.removeItem('userId')  
	},
	}  
})  

export default store