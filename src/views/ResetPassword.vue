<template>
			<div class="login_wrap_main flex-center-h">
				<div class="login_wrap">
					<div class="div">
						<h3 class="lTitle h3">找回密码</h3>
							<Form :model="regiForm" label-position="left" :label-width="0" :rules="ruleValidate" ref="regiForm">
								<FormItem label="" class="Rform" prop="mobile">
									<Input class="Rphone" v-model.trim="regiForm.mobile" type="text" placeholder="手机号"></Input>
									<button  class='R-check'   @click="getTx" type="button">
										<span v-if="!loadingtx">获取图形码</span>
										<span v-else>Loading...</span>
									</button>
									<img  :src="verimg"  @click="getTx"/>
								</FormItem>
								<FormItem label="" class="Rform" prop="verificationCode">
									<Input  class="Rphone" v-model="regiForm.verificationCode" type="text" placeholder="图形验证码"></Input>
									<button  class='R-check'  v-if="sendMsgDisabled" type="button">
										<span>{{time+'秒后获取'}}</span>
									</button>
										<button  class='R-check'  v-else  @click="getDx" type="button">
  										<span>获取短信码</span>
									</button>
								</FormItem>
								<FormItem label="" prop="shortMessage">
									<Input v-model="regiForm.shortMessage" type="text" placeholder="短信验证码"></Input>
								</FormItem>
								<FormItem label="" prop="password">
									<Input v-model="regiForm.password" type='password' placeholder="请输入新的密码"></Input>
								</FormItem>
									<FormItem>
								<button type="button" class='btn btn-40 btn-blue w-bai' @click="handleSubmit('regiForm')">立即找回</button>
								</FormItem>
							</Form>
							<div class="login-link">
								<router-link :to='{path:"/login"}' class='resetPassword font-14'>账号密码登录>></router-link>
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
            	t:'',
            	time: 180, // 发送验证码倒计时
            	sendMsgDisabled: false,
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
          		let verificationCode=this.regiForm.verificationCode;
          		if(verificationCode==null||verificationCode==''){
          			this.$Message.error('图形码不能为空!');
          		}else{
          			
          		this.$axios({
					    method: 'post',
					    url:'/customer/register/shortmessage',
					    data:{
					    		 "mobile":this.regiForm.mobile,
					    		  "verificationCode":this.regiForm.verificationCode
					    	},
					}).then((res)=>{
						     if (res.code == 200) {
						     	  		//短信验证码180秒倒计时
				      		let _this = this;
							    _this.sendMsgDisabled = true;
							    _this.startTime();
		              		}else{
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
          			let mobile=this.regiForm.mobile;
          			if(mobile==null||mobile==''){
          			this.$Message.error('手机号不能为空!');
          			return ;
          			}
          		 	this.$axios({
							    method: 'post',
							    url:'/customer/validate?userName='+this.regiForm.mobile,
							}).then((res)=>{
								if(res.code!=='200'){
									this.txv++;
									let urlo=window.location.origin;
				          			this.verimg=urlo+'/mall/pc/customer/'+mobile+'/verification.png?v='+this.txv;
				          			//this.verimg=this.$axios.defaults.baseURL+'/customer/'+mobile+'/verification.png?v='+this.txv;;
								}else{
									   this.$Message.error('该手机号不存在，请注册');
								}
							});
          			
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
								              if (code == 200) {
								              	  this.$router.push({ path: '/login' ,params: { loginName: this.regiForm.mobile }});
								              } else {
								               this.$Message.error(res.object);
								              }
							});
							}
                      })
            },
        },
         destroyed: function () {
          	clearTimeout( this.t );
		},
       }
</script>
