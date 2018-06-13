<template>
		<div class="login">
			<div class="login_wrap_main">
				<div class="login_wrap">
					<div class="div">
						<h3 class="lTitle h3">找回密码</h3>
							<Form :model="regiForm" label-position="left" :label-width="0" :rules="ruleValidate" ref="regiForm">
								<FormItem label="" class="Rform" prop="mobile">
									<Input class="Rphone" v-model.trim="regiForm.mobile" type="text" placeholder="手机号"></Input>
									<Button  class='R-check' :loading="loadingtx"  @click="getTx">
										<span v-if="!loadingtx">获取图形码</span>
										<span v-else>Loading...</span>
									</Button>
									<img style='float:right;'  :src="verimg"  @click="getTx"/>
								</FormItem>
	
								<FormItem label="" class="Rform" prop="verificationCode">
									<Input  class="Rphone" v-model="regiForm.verificationCode" type="text" placeholder="图形验证码"></Input>
									<Button  class='R-check' :loading="loadingDx"   @click="getDx">
										<span v-if="!loadingDx">获取短信验证码</span>
										<span v-else>Loading...</span>
									</Button>
									
								</FormItem> 
								<FormItem label="" prop="shortMessage">
									<Input v-model="regiForm.shortMessage" type="text" placeholder="短信验证码"></Input>
								</FormItem>
								<FormItem label="" prop="password">
									<Input v-model="regiForm.password" type='password' placeholder="请输入新的密码"></Input>
								</FormItem>
								<Button  class='loginBtn' @click="handleSubmit('regiForm')">立即找回</Button>
							</Form>
							<div class="login-link">
								<router-link :to='{path:"/login"}' class='resetPassword' tag="a">账号密码登录</router-link>
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
                    password: '',
                    mobile:'',
                    shortMessage: '',
                    verificationCode:''
                },
                ruleValidate: {
                    password:[
                      { required: true, message: '密码不能为空', trigger: 'blur' },
                       { type: 'string', min: 6, message: '密码不能少于6位', trigger: 'blur' }
                    ],
                    mobile:[
                     	{ required: true,  trigger: 'blur',  validator: validatePhone }
                    ],
                    verificationCode:[
                     { required: true, message: '图形验证不能为空', trigger: 'blur' }
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
          		let mobile=this.regiForm.mobile;
          		if(mobile==null||mobile==''){
          			this.$Message.error('手机号不能为空!');
          			this.loadingDx = false;
          		}else{
          		this.$axios({
					    method: 'post',
					    url:'/customer/register/shortmessage',
					    data:{
					    		 "mobile":mobile,
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
          			this.verimg=this.$axios.defaults.baseURL+'customer/'+this.regiForm.mobile+'/verification.png?v='+this.txv;
          	},
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let para = Object.assign({}, this.regiForm);
                        delete para['verificationCode']
		                    	this.$axios({
							    method: 'post',
							    url:'/customer/reset/password',
							    data:para,
							}).then((res)=>{
									this.loadingDx = false;
									      let { code, msg } = res;
								              if (code !== 200) {
								                this.$Message.error(res.msg);
								              } else {
								                this.$router.push({ path: '/Login' ,params: { mobile: this.regiForm.mobile }});
								              }
							});
							}
                      })
            },
        }
       }
</script>

<style scoped="scoped" lang="scss">
</style>