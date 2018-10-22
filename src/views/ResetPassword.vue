<template>
	<div class="forget">
            	<Form :model="regiForm"  :label-width="0" :rules="ruleValidate" ref="regiForm">
              <img   src="../assets/img/logo-red.png">
                <h4>重置密码</h4>
                <p>请输入注册的手机号码：</p>
                	<FormItem  prop="mobile">
                <input type="text" placeholder="手机号" v-model.trim="regiForm.mobile" v-on:blur.lazy="getTx">
                   </FormItem>
                <FormItem  prop="verificationCode" style="position:relative">
                <input type="text" class="input w128" placeholder="请输入图形码"  v-model.trim="regiForm.verificationCode">
                <img v-show="verimg!=''"  :src="verimg" class="pic-yzm marginTop"><img src="../assets/img/refresh.png" class="refresh marginTopF" @click="getTx">
                </FormItem>
                	<FormItem  prop="shortMessage">
                  <input type="text" class="input w207" placeholder="短信验证码" v-model="regiForm.shortMessage" v-on:blur.lazy="yzyyb">
                  	<button  class='btn-dxm'  v-if="sendMsgDisabled" type="button">
										<span>{{time+'秒后获取'}}</span>
									</button>
										<button  class='btn-dxm'  v-else  @click="getDx" type="button">
  										<span>获取短信码</span>
									</button>
                   </FormItem>
                   <button class="btn" :class="{'disabled':notnext}" @click="next">下一步</button>
             </Form>
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
            	notnext:true,
            	t:'',
            	time: 180, // 发送验证码倒计时
            	sendMsgDisabled: false,
            	loadingtx:false,
            	txv:1,
            	verimg:'',
                regiForm: {
                    mobile:'',
                },
                ruleValidate: {
                    mobile:[
                     	{ required: true,  trigger: 'blur',  validator: validatePhone }
                    ]
               },
          }
        },
          methods:{
          	//重置密码第二步
          	yzyyb(){
          			if(this.regiForm.shortMessage!=null){
          			this.notnext=false;}else{
          				this.notnext=true
          			}
          	},
          	next(){
          	
          			   		this.$axios({
					    method: 'post',
					    url:'/customer/reset/password/validate',
					    data:{
					    		 "mobile":this.regiForm.mobile,
					    		  "shortMessage":this.regiForm.shortMessage
					    	},
					}).then((res)=>{
						     if (res.code == 200) {
						     	  		//短信验证码180秒倒计时
				      	this.$router.push({
								name: '/resettwo',
							})
				      	
		              		}else{
		              			this.$Message.error(res.object);
		              		}
		              			this.notnext=true;
					});
          	},
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
.forget .disabled{
	background: #eee;
}
.forget .marginTop{
	position: absolute;
	top: 20px;
	right:275px;
}
.forget .marginTopF{
	position: absolute;
	top: 25px;
	right:235px;	
}
</style>
<style>
	.forget .ivu-form-item{
		margin-bottom: 0;
	}
</style>