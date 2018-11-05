import { getToken,getUserId } from '@/base/auth'
const mutations = {
    GETSORT:(state,v)=>{
    	 state.searchkeyword= v   
    },
    SET_TOKEN: (state, payload) => {
      state.token = payload.token  
	  state.userId = payload.userId  
    },
   
    
}
export default mutations