<template>
		<div class="order page-pwd">
			<div class="order_h2">修改密码</div>
				<Form ref="pwd" :model="pwd"  :label-width="150"  :rules="pwdValidate" >
					<FormItem label="新密码:" prop="newpass">
						<i-input v-model="pwd.newpass" placeholder="请输入新密码" type="password"></i-input>
					</FormItem>
					<FormItem label="确认密码:" prop="newpassagian">
						<i-input v-model="pwd.newpassagian" placeholder="请确认新密码" type="password"></i-input>
					</FormItem>
					<FormItem>
						<i-button type="primary" @click.native="handleOk('pwd')" :loading="loading" class="btn-blue btn-40 btn-normol">确认修改</i-button>
					</FormItem>
				</Form>
   			 </modal>
		</div>
</template>

<script>
		export default {
	    data () {
	        return {
	        	loading:false,
				pwd: {
                    newpass: '',
                    newpassagian: '',
                },
                pwdValidate: {
                    newpass: [
                        { required: true, message: '请输入新密码', trigger: 'blur' },
					    { type: 'string', min: 6, message: '新密码不能少于6位', trigger: 'blur' }
                    ],
                    newpassagian: [
                       { required: true, message: '请输入确认密码', trigger: 'blur' },
					    { type: 'string', min: 6, message: '确认密码不能少于6位', trigger: 'blur' }
                    ],

                },
			}
	      },
	      methods:{
            handleOk(name) {
            	this.loading=false
            	if(this.pwd.newpass!=this.pwd.newpassagian){
            		 this.$Message.error('两次密码不一致,请重新输入');
            		 return;
            	}
            	this.$refs[name].validate((valid) => {
                    if (valid) {
                    	this.loading=true
            	      	this.$axios({
						    method: 'post',
						    url:'/customer/update/password?password='+this.pwd.newpass,
						}).then((res)=>{
							if(res.code=='200'){
							 this.$Message.success('密码修改成功');
							 this.loading=false
							}
						});
					}
                })
		 	 },
		},
	}

</script>

<style scoped="scoped">
	.order{
		background: #fff;
		padding: 20px;
	}
.order_h2{
	font-size: 20px;
font-weight: normal;
margin-bottom: 20px;
}
   
</style>
<style>
	.page-pwd .ivu-form .ivu-form-item-label{
		padding-right: 25px;
	}
	.page-pwd .ivu-input{
		width:250px
	}
</style>