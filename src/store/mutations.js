import { getToken,getUserId } from '@/base/auth'
const mutations = {
//	LOGIN:(state,payload)=>{
//		state.token = payload.token  
//			state.userId = payload.userId  
//			localStorage.token = payload.token   
//			localStorage.userId = payload.userId 
//	},
//  LOGOUT:state =>{
//        state.token = null
//		  state.userId = null
//		  localStorage.removeItem('token')  
//		  localStorage.removeItem('userId') 
//  },
    GETSORT:(state,v)=>{
    	 state.searchkeyword= v   
    },
    SET_TOKEN: (state, payload) => {
      state.token = payload.token  
	  state.userId = payload.userId  
    },
   
    
}
export default mutations