<template>
		<div class="page-reg">
			<div class="login_wrap_main">
				<router-link :to='{}' class="loginA" tag='a'>
					<img class="aImg" src="../assets/img/3.jpg" alt="">
				</router-link>
				<div class="login_wrap">
					<div class="div">
						<h3 class="lTitle h3">使用手机号注册</h3>
							<Form :model="regiForm" label-position="left" :label-width="0" :rules="ruleValidate" ref="regiForm">
								<FormItem label="" class="Rform" prop="loginName">
									<Input class="Rphone" v-model.trim="regiForm.loginName" placeholder="手机号"></Input>
									<Button  class='R-check' :loading="loadingtx"  @click="getTx">
										<span v-if="!loadingtx">获取图形码</span>
										<span v-else>Loading...</span>
									</Button>
									<img style='float:right;margin-top:24px;'  :src="verimg"  @click="getTx"/>
								</FormItem>
	
								<FormItem label="" class="Rform" prop="verificationCode">
									<Input  class="Rphone" v-model="regiForm.verificationCode" placeholder="图形验证码"></Input>
									<Button  class='R-check' :loading="loadingDx"   @click="getDx">
										<span v-if="!loadingDx">获取短信验证码</span>
										<span v-else>Loading...</span>
									</Button>
									
								</FormItem> 

								<FormItem label="" prop="shortMessage">
									<Input v-model="regiForm.shortMessage" placeholder="短信验证码"></Input>
								</FormItem>
								<FormItem label="" prop="passWord">
									<Input v-model="regiForm.passWord" placeholder="密码"></Input>
								</FormItem>
								<Button  class='loginBtn' @click="handleSubmit('regiForm')">注册</Button>
							</Form>
							<div class="login-link">
								<router-link :to='{path:"/login"}' class='resetPassword' tag="a">已有账号，请登录</router-link>
							</div>
					</div>
				</div>
			</div>
    	</div>
</template>
<script>
	 import { validatePHONE } from '@/assets/js/validate';
	  export default {
        data () {
        	 	 const validatePhone = (rule, value, callback) => {
      	 	if(value.length<0){
      	 		 callback(new Error('手机号不能为空'));
      	 	}
          else if (!validatePHONE(value)) {
            callback(new Error('请输入正确的手机号'));
          } else {
            callback();
          }
        };
            return {
            	loadingDx:false,
            	loadingtx:false,
            	txv:1,
            	verimg:'',
                regiForm: {
                    passWord: '',
                    loginName:'',
                    shortMessage: '',
                    verificationCode:''
                },
                ruleValidate: {
                    passWord:[
                      { required: true, message: '密码不能为空', trigger: 'blur' }
                    ],
                    loginName:[
                      { required: true, validator:validatePhone, trigger: 'blur' }
                    ],
                    verificationCode:[
                     { required: true, message: '图形码不能为空', trigger: 'blur' }
                    ],
                    shortMessage:[
                     { required: true, message: '短信验证码不能为空', trigger: 'blur' }
                    ]
               },
          }
        },
          methods:{
          	getDx(){
          		this.loadingDx = true;
          		let loginName=this.regiForm.loginName;
          		if(loginName==null||loginName==''){
          			this.$Message.error('手机号不能为空!');
          			this.loadingDx = false;
          		}else{
          		this.$axios({
					    method: 'post',
					    url:'/customer/register/shortmessage',
					    data:{
					    		 "mobile":loginName,
					    		  "verificationCode":this.regiForm.verificationCode
					    	},
					}).then((res)=>{
						     if (res.code !== 200) {
		                 		 this.$Message.error(res.msg);
		              		} 
							this.loadingDx = false;
					});
					}
          	},
          	getTx(){
          			this.txv++;
          			this.verimg=this.$axios.defaults.baseURL+'customer/'+this.regiForm.loginName+'/verification.png?v='+this.txv;
          	},
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                    	let para = Object.assign({}, this.regiForm);
		                    	this.$axios({
							    method: 'post',
							    url:'/customer/register',
							    data:para,
							}).then((res)=>{
									this.loadingDx = false;
									      let { code, msg } = res;
								              if (code !== 200) {
								                this.$Message.error(res.msg);
								              } else {
								                this.$router.push({ path: '/Login' ,params: { loginName: this.regiForm.loginName }});
								              }
							});
							}
                      })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
       }
</script>

<style scoped="scoped" lang="scss">
.page-reg .login_wrap{
	    position: absolute;
	top: 0;
    right: 0;
    float: right;
}
</style>