<template>
		<div class="page-reg">
	<div class="nav">
			<div class="main-width clearfix">
				<router-link  to="/index" class="logo fl "><img   src="../assets/img/logo-red.png"></router-link>
			</div>
        </div>
               <div class="signin register">
               		<div class="main-wdith pr">
            <div class="signinImg">
               <img  src="../assets/img/u108.jpg" alt="">
            </div>
                <Form :model="regiForm" label-position="left" :label-width="0" :rules="ruleValidate" ref="regiForm">
                	 <h4>账号注册<router-link :to='{path:"/login"}'  class="a">已有账号?  去登录&gt;</router-link></h4>
			    <FormItem  prop="loginName">
                <input type="text" placeholder="请输入手机号" v-model.trim="regiForm.loginName" v-on:blur.lazy="getTx">
                </FormItem>
                <FormItem  prop="verificationCode">
                <input type="text" class="input w128" placeholder="请输入图形码" v-model.trim="regiForm.verificationCode" >
                <img v-show="verimg!=''" :src="verimg" class="pic-yzm"><img src="../assets/img/refresh.png" class="refresh" @click="getTx">
                </FormItem>
                <FormItem  prop="passWord">
                <input type="text" class="input" placeholder="请输入密码" v-model="regiForm.passWord">
                    </FormItem>
                 <FormItem  prop="confirmpass">
                <input type="text" class="input" placeholder="请确认密码" v-model="regiForm.confirmpass">
                </FormItem>
                	<FormItem  prop="shortMessage">
                  <input type="text" class="input w128" placeholder="短信验证码" v-model="regiForm.shortMessage">
                   <button  class='btn-dxm'  v-if="sendMsgDisabled"  type="button">
										{{time+'秒后获取'}}
									</button>
									<button  class='btn-dxm'  v-else @click="getDx"  type="button">
										获取短信码
									</button>
                  
                   </FormItem>
                <Button class="btn" @click="handleSubmit('regiForm')">点击注册</Button>
                <p class="p">点击注册，即表示您同意并愿意遵守dxacer公司</p>
                <p class="pp"><span>《用户协议》</span> 和 <span>《隐私政策》</span></p>
            </Form>
            </div>
        </div>
       </div>

		
</template>
<script>
	 import { validatePHONE } from '@/assets/js/validate';
	  export default {
        data () {
        	       	      var validatePass = (rule, value, callback) => {            
                            if (value === '') {
                                callback(new Error('请再次输入密码'));
                              } else if (value !== this.regiForm.passWord) {
                                callback(new Error('两次输入密码不一致!'));
                              } else {
                                callback();
                              }
                      };
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
              	fwtkmodal:false,
            	fwtk:true,
            	t:'',
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
                    verificationCode:'',
                    confirmpass:''
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
                    ],
                    confirmpass:[
                     { required: true, validator: validatePass, trigger: 'blur'  }
                    ],
               },
          }
        },
          methods:{
          	//获取短信验证码
          	getDx(){
          		let verificationCode=this.regiForm.verificationCode;
          		if(verificationCode==null||verificationCode==''){
          			this.$Message.error('图形验证码不能为空!');
          			this.loadingDx = false;
          		}
          		else{
          		this.$axios({
					    method: 'post',
					    url:'/customer/register/shortmessage',
					    data:{
					    		 "mobile":this.regiForm.loginName,
					    		  "verificationCode":this.regiForm.verificationCode
					    	},
					}).then((res)=>{
						if(res.code==200){
								//短信验证码180秒倒计时
				     			let _this = this;
							    _this.sendMsgDisabled = true;
							    _this.startTime();
						}
						     else {
		                 		 this.$Message.error(res.msg);
		              		}
					});
					}
          	},
          	  startTime(){
          	 	if(this.time==0){
          	 		  this.time = 180;
				      this.sendMsgDisabled = false;
				      clearTimeout(this.t);
          	 		}
					else{
					    this.time--;
					 }
					 let self=this;
                      this.t= setTimeout(() => {
                                self.startTime();
                        }, 	1000);
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
									      this.verimg='http://10.0.0.53:8080/mall/pc/customer/'+this.regiForm.loginName+'/verification.png?v='+this.txv;
								         //this.verimg=this.$axios.defaults.baseURL+'/customer/'+this.regiForm.loginName+'/verification.png?v='+this.txv;
										 //	let urlo=window.location.origin;
      										//this.verimg=urlo+'/mall/pc/customer/'+this.regiForm.loginName+'/verification.png?v='+this.txv;
								}else{
									  this.$Message.error(res.msg);
								}
							});
          	},
            handleSubmit (name) {
            	if(this.fwtk==false){
            		this.$Message.error('请你阅读并同意《网站服务条款》');
          			  return
            	}else{
                this.$refs[name].validate((valid) => {
                    if (valid) {
                    	let para = Object.assign({}, this.regiForm);
                    	delete para['confirmpass']
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
								                this.$router.push({ name: '/login' ,params: { loginName: this.regiForm.loginName }});
								              }
							});
							}
                      })
                }
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        },
          destroyed: function () {
          	clearTimeout( this.t );
		},
       }
</script>
<style  scoped="scoped">
.register  .pp span{
    font-weight: 700;
}
.register .btn {
	margin-top: 10px;
    background-color: rgba(51, 153, 255, 1);
}

.refresh{
	cursor: pointer;
	margin-left:40px;
}

.page-reg form{
	height: 630px;
}
</style>
<style>
	
</style>
