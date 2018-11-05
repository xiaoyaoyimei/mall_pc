//test
import axios from '@/http';
import { removeToken, removeUserId } from '@/base/auth'
const actions = {
	//后台登出
	LogOut: ({
		commit,
		state
	}) => {
		return new Promise((resolve, reject) => {
			axios({
				method: 'post',
				url: '/customer/logout',
			}).then((res) => {
				commit('SET_TOKEN', {
					token: '',
					userId: ''
				})
				removeToken()
				removeUserId()
				resolve()
			}).catch(error => {
				reject(error)
			});
		})
	},
	    // 前端 登出
//  FedLogOut:({ commit }) =>{
//    return new Promise(resolve => {
//     commit('SET_TOKEN', {
//					token: '',
//					userId: ''
//				})
//      removeToken()
//      removeUserId()
//      resolve()
//    })
//  },
}
export default actions