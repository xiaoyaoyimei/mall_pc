import Vue from 'vue'  
import Vuex from 'vuex'  
import  getters from './getters'
import mutations from './mutations'
Vue.use(Vuex)  
const state = {
    token: null,
    userId:null,
    searchkeyword:'',
}
// 创建 store 实例
export default new Vuex.Store({
    //actions,
    getters,
    state,
    mutations
})