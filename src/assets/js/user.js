/* 进入子页面*/
let fang_={
		editUser(self,para){
			self.$axios({
						    method: 'post',
						    url:'/account/update',
						    data:para,
						}).then((res)=>{
							if(res.data.code=='200'){
							  self.$Message.success('修改成功');
							  self.$router.go(-1)
							}
						});
		},
		login(self){
//				self.$axios({
//						    method: 'post',
//						    url:'/account/update',
//						    data:para,
//						}).then((res)=>{
//							if(res.data.code=='200'){
//							  self.$Message.success('修改成功');
//							  self.$router.go(-1)
//							}
//						});
		}
}

export default fang_;