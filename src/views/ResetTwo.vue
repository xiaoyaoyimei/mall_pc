<template>
	<div class="forget">
            	<Form :model="regiForm"  :label-width="0" :rules="ruleValidate" ref="regiForm">
              <img   src="../assets/img/logo-red.png">
                <h4>重置密码</h4>
                <p>为了保护账号安全，需要验证手机有效性：</p>
                	<FormItem  prop="mobile">
                <input type="text" placeholder="请输入手机号" v-model.trim="regiForm.mobile" >
                   </FormItem>
                   	<FormItem  prop="passWord">
                <input type="text" placeholder="请输入密码" v-model.trim="regiForm.passWord" >
                   </FormItem>
                 <FormItem  prop="confirmpass">
                <input type="text" class="input" placeholder="请确认密码" v-model.trim="regiForm.confirmpass" >
                </FormItem>
                <button class="btn" @click="handleSubmit('regiForm')">确定</button>
             </Form>
        </div>
</template>

<script>
			 import { validatePHONE } from '@/assets/js/validate';
	  export default {
        data () {
        	      var validatePass = (rule, value, callback) => {    
        	      	console.log(this.regiForm);
                            if (value === '') {
                                callback(new Error('请输入确认密码'));
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
            	t:'',
            	time: 180, // 发送验证码倒计时
            	sendMsgDisabled: false,
            	loadingtx:false,
            	txv:1,
            	verimg:'',
                regiForm: {
                    mobile:'',
                    passWord:'',
                    confirmpass:''
                },
                ruleValidate: {
                    mobile:[
                     	{ required: true,  trigger: 'blur',  validator: validatePhone }
                    ],
                    passWord:[
                      { required: true, message: '密码不能为空', trigger: 'blur' },
                      { type: 'string', min: 6, message: '密码不能少于6位', trigger: 'blur' }
                    ],
                       confirmpass:[
                     { required: true, validator: validatePass, trigger: 'blur' }
                    ],
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
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        
		                    	this.$axios({
							    method: 'post',
							    url:'/customer/reset/password',
							    data:{
					    		 "mobile":this.regiForm.mobile,
					    		  "password":this.regiForm.passWord
					    	},
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
<style>
	.forget{
    width: 100%;
    background-color: #F2F2F2;
    padding: 58px 0 ;
}
.forget form{
    width: 870px;
    height: 590px;
    background-color: #FFFFFF;
    margin: 0px auto;
    padding-top: 31px;
    text-align: center;
}
.forget h4{
    margin-top: 49px;
    margin-bottom: 42px;
    height: 39px;
    font-weight: 400;
    font-size: 30px;
    color: #333333;
    text-align: center;
}
.forget p{
    height: 20px;
    width: 320px;
    font-weight: 400;
    font-size: 14px;
    color: #333333;
    margin:  0 auto;
    text-align: left;
}
.forget input{
    width: 320px;
    height: 50px;
    margin-top: 20px;
    border: 1px solid #CCCCCC;
    padding-left: 15px;
}
.forget .input{
    margin-top: 20px;
}
.forget .yanzheng{
    width: 201px;
    margin-right: 13px;
}
.forget .img{
    width: 100px;
    height: 50px;
    background-color: #999999;
    position: relative;
    top: -2px;
    cursor: pointer;
}
.forget .btn{
    margin-top: 37px;
    width: 320px;
    height: 50px;
    background-color: rgba(255, 0, 0, 1);
    font-weight: 400;
    font-size: 18px;
    color: #FFFFFF;
    border: none;
    display: inline-block;
    line-height: 50px;
}
</style>
<style>
	.ivu-form-item{
		margin-bottom: 0;
	}
</style>