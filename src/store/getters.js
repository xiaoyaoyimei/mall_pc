//test
//export const getToken = state => {
//  return state.token
//}
//export const getuserId = state => {
//  return state.userId
//}
//
//export const getgoddsNumber=state=>{
//	 return state.goodsList.length
//}
const getters = {
  getToken: state => state.token,
  getuserId: state => state.userId,
  searchkeyword: state => state.searchkeyword,
};
export default getters
