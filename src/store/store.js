import Vue from 'vue'  
import Vuex from 'vuex'  
import  getters from './getters'
import mutations from './mutations'
import actions from './actions'
import { getToken,getUserId } from '@/base/auth'
Vue.use(Vuex)  
const state = {
    token:getToken(),
    userId:getUserId(),
    searchkeyword:'',
}
// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})