<template>
		<div class="login">
			<div class="login_wrap_main">
				<div class="login_wrap">
					<div class="div">
						<h3 class="lTitle">找回密码</h3>
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
								<Button  class='login_btn' @click="handleSubmit('regiForm')">立即找回</Button>
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
.login_wrap {
    position: absolute;
    top: 0;
    right: 0;
    float: right;
    width: 380px;
    padding: 9px 38px 38px;
    margin: 66px 100px 0px 0px;
    background-color: #fff;
    border: 1px solid #d6d6d6;
    box-shadow: 0px 0px 4px 0px #d6d6d6;
    border-radius: 2px;
    min-height: 412px;
			.div{
				.lTitle{
					text-align: left;
					margin-bottom: 15px;
					font-size: 20px;
					color: #666;	
					margin-top: 20px;
				}
				.Rform{
					position: relative;
					.Rphone{
						width: 302px;
					}
					.R-check{
						position: absolute;
						right: 0px;
						top: 0px;
						background-color: #fff;
						height: 40px;
                        border-radius: 0;
					}
				}
			}
			.login_btn{
				display: block;
				width: 300px;
				height: 40px;
				padding:0px;
				line-height: 40px;
				text-align: center;
				background-color: #0092d8;
				color: #fff;
				margin: 20px 0px 17px 0px;
				border: 0px;
				cursor: pointer;
				border-radius: 2px;
				-webkit-transition: all .2s ease-in-out;
				-moz-transition: all .2s ease-in-out;
				-ms-transition: all .2s ease-in-out;
				-o-transition: all .2s ease-in-out;
				transition: all .2s ease-in-out;
			}
			.login-link{
				a{
					color:#999;
				}
				a:hover{
					color:#0092d8;
				}
				.resetPassword{
					float: right;
				}
			}
}
.login{
		margin: 0px auto;
		padding:0px 15px;
		background: #fff;
		overflow: hidden;
		width:100%;
		text-align:center;
		.login2{
			background: #fff;
			padding: 0px 15px;
			.R-check{
				margin-bottom:24px;
				width:100%;
				border-radius:0px;
				font-size:16px;
			}
		}
		h3{
			margin-bottom: 40px;
			font-size:20px;
		}
		.btn-login{
			width: 100%;
			border-radius: 0px;
			padding:10px 0;
			font-size:20px;
		}
		.re{
			float: right;
			margin-top:40px;
			color:#333;
			font-size:16px;
		}
	}
	.reg{
		padding: 20px;
		h3{
			margin-bottom: 20px;
		}
	
	}
	.login_wrap_main{
		display: flex;
		justify-content: center;
	}
</style>
<style lang="scss">
	.login{
		 .ivu-input{
			/* border:0 none; */
			font-size: 16px;
			height:40px;
			border-radius:0px;
			width:302px;
		}
		.ivu-form{
			overflow:hidden;
		}
		.ivu-btn:hover, .ivu-input:hover{
			border:1px solid #dddee1;
		}
		.ivu-form .ivu-form-item-label{
			font-size: 16px;
			border: 1px solid #bdbdbd;
			border-right:none;
			background:#f6f6f6;
			text-align:center;
			height:38px;
		}
		.ivu-form-item-error .ivu-input, .ivu-form-item-error .ivu-input:hover{
			border:1px solid #dddee1;
		}
		.ivu-form-item-error .ivu-input:focus, .ivu-input:focus,.ivu-btn:focus{
			box-shadow: 0 0 0 2px rgba(153, 153, 153, 0.2);
		}
		.login_btn{
			padding:0px;
			}
		}
</style>