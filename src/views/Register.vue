<template>
			<div class="login_wrap_main flex-center-h">
				<router-link :to="{ path: '/index'}" class="loginA" tag='a'>
					<img class="aImg" src="../assets/img/3.jpg" alt="">
				</router-link>
				<div class="login_wrap">
					<div class="div">
						<h3 class="lTitle h3">使用手机号注册</h3>
							<Form :model="regiForm" label-position="left" :label-width="0" :rules="ruleValidate" ref="regiForm">
								<FormItem label="" class="Rform" prop="loginName">
									<Input class="Rphone" v-model.trim="regiForm.loginName" placeholder="手机号"></Input>
									<Button  class='R-check' :loading="loadingtx"  @click="getTx">
										<span>获取图形码</span>
									</Button>
									<img  :src="verimg"  @click="getTx"/>
								</FormItem>
								<FormItem label="" class="Rform" prop="verificationCode">
									<Input  class="Rphone" v-model="regiForm.verificationCode" placeholder="图形验证码"></Input>
									<Button  class='R-check'  >
										<span v-if="sendMsgDisabled">{{time+'秒后获取'}}</span>
  										<span v-if="!sendMsgDisabled"  @click="getDx">获取短信码</span>
									</Button>
								</FormItem>
								<FormItem label="" prop="shortMessage">
									<Input v-model="regiForm.shortMessage" placeholder="短信验证码"></Input>
								</FormItem>
								<FormItem label="" prop="passWord">
									<Input v-model="regiForm.passWord" placeholder="密码"></Input>
								</FormItem>
									<FormItem>
								<button  class=' btn btn-40 btn-blue w-bai' @click="handleSubmit('regiForm')">注册</button>
									</FormItem>
							</Form>
							<div class="login-link">
								<router-link :to='{path:"/login"}' class='resetPassword' >已有账号，请登录</router-link>
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
            	time: 180, // 发送验证码倒计时
    			sendMsgDisabled: false,
            	loadingDx:false,
            	loadingtx:false,
            	txv:1,
            	verimg:'',
                regiForm: {
                	loginName:'',
                    passWord: '',
                    shortMessage: '',
                    verificationCode:''
                },
                ruleValidate: {
                    passWord:[
                      { required: true, message: '密码不能为空', trigger: 'blur' },
                      { type: 'string', min: 6, message: '密码不能少于6位', trigger: 'blur' }
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
          	//获取图形验证码
          	getDx(){
          		let verificationCode=this.regiForm.verificationCode;
          		if(verificationCode==null||verificationCode==''){
          			this.$Message.error('图形验证码不能为空!');
          			this.loadingDx = false;
          		}
          		else{
          		//短信验证码180秒倒计时
          		let _this = this;
			    _this.sendMsgDisabled = true;
			    let interval = setInterval(function() {
			     if ((_this.time--) <= 0) {
			      _this.time = 180;
			      _this.sendMsgDisabled = false;
			   	   clearTimeout(interval);
			     }
			    }, 1000);
          		this.$axios({
					    method: 'post',
					    url:'/customer/register/shortmessage',
					    data:{
					    		 "mobile":this.regiForm.loginName,
					    		  "verificationCode":this.regiForm.verificationCode
					    	},
					}).then((res)=>{
						     if (res.code !== 200) {
		                 		 this.$Message.error(res.msg);
		              		}
					});
					}
          	},
          	getTx(){
          			if(this.regiForm.loginName==""){
          			  this.$Message.error('手机号不能为空');
          			  return
          			}
          		    //验证用户名是否存在
          		 	this.$axios({
							    method: 'post',
							    url:'/customer/validate?userName='+this.regiForm.loginName,
							}).then((res)=>{
								if(res.code=='200'){
									     this.txv++;
											 	let urlo=window.location.origin;
          							this.verimg=urlo+'/mall/pc/customer/'+this.regiForm.loginName+'/verification.png?v='+this.txv;
								}else{
									  this.$Message.error(res.msg);
								}
							});
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
