<template>
	<div class="forget page-forget">
		<Form :model="regiForm" :label-width="0" :rules="ruleValidate" ref="regiForm">
			<img src="../assets/img/logo-red.png">
			<h4>重置密码</h4>
			<p>请输入注册的手机号码：</p>
			<FormItem prop="mobile">
				<input type="text" placeholder="手机号" v-model.trim="regiForm.mobile" v-on:blur.lazy="getTx">
			</FormItem>
			<FormItem prop="verificationCode" style="position:relative">
				<input type="text" class="input w128" placeholder="请输入图形码" v-model.trim="regiForm.verificationCode" >
				<img v-show="verimg!=''" :src="verimg" class="pic-yzm marginTop"><img src="../assets/img/refresh.png" class="refresh marginTopF" @click="getTx">
			</FormItem>
			<FormItem prop="shortMessage">
				<input type="text" class="input w207" placeholder="短信验证码" v-model="regiForm.shortMessage" >
				<button class='btn-dxm' v-if="sendMsgDisabled" type="button" disabled="disabled">
										<span>{{time+'秒后获取'}}</span>
									</button>
				<button class='btn-dxm' v-else @click="getDx" type="button">
  										<span>获取短信码</span>
									</button>
			</FormItem>
			<button class="btn" @click="next" type="button" >下一步</button>
		</Form>
	</div>
</template>

<script>
	import { validatePHONE } from '@/assets/js/validate';
	export default {
		data() {
			const validatePhone = (rule, value, callback) => {
				if(value.length < 0) {
					callback(new Error('手机号不能为空'));
				} else if(!validatePHONE(value)) {
					callback(new Error('请输入正确的手机号'));
				} else {
					callback();
				}
			};
			return {
				t: '',
				time: 90, // 发送验证码倒计时
				sendMsgDisabled: false,
				loadingtx: false,
				txv: 1,
				verimg: '',
				regiForm: {
					mobile: '',
					verificationCode:'',
				},
				ruleValidate: {
					mobile: [{
						required: true,
						trigger: 'blur',
						validator: validatePhone
					}],
						verificationCode: [
									{ required: true, message: '图形码不能为空', trigger: 'blur' },
							],
									shortMessage: [
									{ required: true, message: '短信验证码不能为空', trigger: 'blur' },
							]
				},
			}
		},
		methods: {
			//重置密码第二步
			next() {
		    this.$refs.regiForm.validate(valid => {
            if (valid) {
				this.$axios({
					method: 'post',
					url: '/customer/reset/password/validate',
					data: {
						"mobile": this.regiForm.mobile,
						"shortMessage": this.regiForm.shortMessage
					},
				}).then((res) => {
					if(res.code == 200) {
						//短信验证码180秒倒计时
						this.$router.push({name: '/resettwo',query:{mobile:this.regiForm.mobile}})
					} else {
						this.$Message.error(res.object);
					}
					this.notnext = true;
				});
            }
                else {
             	this.loading = false  
                 return false;
            }
              })
			},
			
				getTx() {
				let mobile = this.regiForm.mobile;
				if(mobile == "") {
					this.$Message.error('手机号不能为空');
					return
				}
				this.$axios({
					method: 'post',
					url: '/customer/validate?userName=' + this.regiForm.mobile,
				}).then((res) => {
					if(res.code !== 200) {
						this.txv++;
						this.verimg = this.global_.originurl + '/mall/pc/customer/' + mobile + '/verification.png?v=' + this.txv;
					} else {
						this.$Message.error(res.msg);
						return;
					}
				});

			},
			getDx() {
				let verificationCode = this.regiForm.verificationCode;
				if(verificationCode == null || verificationCode == '') {
					this.$Message.error('图形码不能为空!');
					return;
				} else {
					this.$axios({
						method: 'post',
						url: '/customer/register/shortmessage',
						data: {
							"mobile": this.regiForm.mobile,
							"verificationCode": this.regiForm.verificationCode
						},
					}).then((res) => {
						if(res.code == 200) {
						    this.sendMsgDisabled = true;
				  			 this.startTime();
						} else {
							this.$Message.error(res.msg);
							return;
						}
					});
				}
			},
			startTime() {
				if(this.time == 0) {
					this.time = 90;
					this.sendMsgDisabled = false;
					clearTimeout(this.t);
					return 
				} else {
					this.time--;
				}
				let self = this;
				this.t = setTimeout(() => {
					self.startTime();
				}, 1000);
			},
		
		},
		destroyed: function() {
			clearTimeout(this.t);
		},
	}
</script>
<style>
	.forget {
		width: 100%;
		background-color: #F2F2F2;
		padding: 58px 0;
	}
	
	.forget form {
		width: 870px;
		height: 590px;
		background-color: #FFFFFF;
		margin: 0px auto;
		padding-top: 31px;
		text-align: center;
	}
	
	.forget h4 {
		margin-top: 49px;
		margin-bottom: 42px;
		height: 39px;
		font-weight: 400;
		font-size: 30px;
		color: #333333;
		text-align: center;
	}
	
	.forget p {
		height: 20px;
		width: 320px;
		font-weight: 400;
		font-size: 14px;
		color: #333333;
		margin: 0 auto;
		text-align: left;
	}
	
	.forget input {
		width: 320px;
		height: 50px;
		margin-top: 20px;
		border: 1px solid #CCCCCC;
		padding-left: 15px;
	}
	
	.forget .input {
		margin-top: 20px;
	}
	
	.forget .yanzheng {
		width: 201px;
		margin-right: 13px;
	}
	
	.forget .img {
		width: 100px;
		height: 50px;
		background-color: #999999;
		position: relative;
		top: -2px;
		cursor: pointer;
	}
	
	.forget .btn {
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
	
	.forget .disabled {
		background: #eee;
	}
	
	.forget .marginTop {
		position: absolute;
		top: 20px;
		right: 0px;
	}
	
	.forget .marginTopF {
		position: absolute;
		top: 25px;
		right: -40px;
	}
</style>
<style>
	.forget .ivu-form-item{
		margin:0 auto;
		margin-bottom: 0;
		width:320px;
	}
</style>