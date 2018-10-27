//test
//export const login = ({commit}) => {
//  commit('LOGIN')
//}
//export const logout = ({commit}) => {
//  commit('LOGOUT')
//}
import axios from '@/http';
import { removeToken,removeUserId } from '@/base/auth'
const actions = {
  LogOut:({ commit, state })=> {
    return new Promise((resolve, reject) => {
    				axios({
							method: 'post',
							url: '/customer/logout',
						}).then((res) => {
								commit('SET_TOKEN', {token: '',userId:''})
								        removeToken()
								        removeUserId()
								          resolve()
						}).catch(error => {
        			reject(error)
      });
//    logout(state.token).then(() => {
//      commit('SET_TOKEN', '')
//      commit('SET_ROLES', [])
//      removeToken()
//      resolve()
//    }).catch(error => {
//      reject(error)
//    })
    })
  }
}
export default actions