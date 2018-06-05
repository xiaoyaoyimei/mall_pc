<template>
		<div class="login">
			<div class="login2">
			<h3>注册</h3>
	   <Form :model="regiForm" label-position="left" :label-width="120" :rules="ruleValidate" ref="regiForm">
           <FormItem label="手机号" prop="loginName">
            <Input v-model.trim="regiForm.loginName" placeholder="请输入手机号"></Input>
        </FormItem>
		<Button type="primary" class='R-check' :loading="loadingtx"  @click="getTx">
	    	<span v-if="!loadingtx">获取图形码</span>
	        <span v-else>Loading...</span>
   		</Button>
        <FormItem label="图形验证码" prop="verificationCode">
      		<Input v-model="regiForm.verificationCode" placeholder="请输入图形验证码"></Input>
             <img style='float:right;margin-top:24px;'  :src="verimg"  @click="getTx"/>
        </FormItem>
		<Button type="primary" class='R-check' :loading="loadingDx"   @click="getDx">
	        <span v-if="!loadingDx">获取短信验证码</span>
	        <span v-else>Loading...</span>
   		</Button>
        <FormItem label="短信验证码" prop="shortMessage">
            <Input v-model="regiForm.shortMessage" placeholder="请输入短信验证码"></Input>
        </FormItem>
     	<FormItem label="密码" prop="passWord">
            <Input v-model="regiForm.passWord" placeholder="请输入密码"></Input>
        </FormItem>
        <Button type="primary" class='R-check' @click="handleSubmit('regiForm')">提交</Button>
		<Button type="ghost" class='R-check' @click="handleReset('regiForm')" >重置</Button>
    </Form>
	</div>
    </div>
</template>

<script>
	  export default {
        data () {
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
                      { required: true, message: 'The passWord cannot be empty', trigger: 'blur' }
                    ],
                    loginName:[
                      { required: true, message: 'The loginName cannot be empty', trigger: 'blur' }
                    ],
                    verificationCode:[
                     { required: true, message: 'The verificationCode cannot be empty', trigger: 'blur' }
                    ],
                    shortMessage:[
                     { required: true, message: 'The shortMessage cannot be empty', trigger: 'blur' }
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
@import '@/styles/color.scss';
.login{
		max-width:600px;
		margin: 0px auto;
		padding:30px 15px;
		background: #f6f6f6;
		overflow: hidden;
		width:100%;
		padding-top: 150px;
		text-align:center;
		.login2{
			background: #fff;
			padding: 30px 15px;
			.R-check{
				margin-bottom:24px;
				width:100%;
				border-radius:0px;
				font-size:16px;
			}
		}
		h3{
			margin-bottom: 40px;
			color:$color-dx;
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
	
</style>
<style lang="scss">
	.login2{
		 .ivu-input{
			/* border:0 none; */
			font-size: 16px;
			height:38px;
			border-radius:0px;
		}
		.ivu-form{
			overflow:hidden;
		}
		.ivu-form .ivu-form-item-label{
			font-size: 16px;
			border: 1px solid #bdbdbd;
			border-right:none;
			background:#f6f6f6;
			text-align:center;
			height:38px;
		}
		}
</style>