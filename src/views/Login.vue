<template>
	<div class="page-login">
		<div class="nav">
			<div class="main-width clearfix">
				<router-link to="/index" class="logo fl "><img src="../assets/img/logo-red.png"></router-link>
			</div>
		</div>
		<div class="signin">
			<div class="main-wdith pr">
				<div class="signinImg">
					<img src="../assets/img/u108.jpg" alt="">
				</div>
				<Form ref="loginForm" :model="loginForm" :rules="ruleInline" inline>
					<h4>账号登录</h4>
					<FormItem prop="loginName">
						<input type="text" placeholder="请输入手机号" v-model="loginForm.loginName">
					</FormItem>
					<FormItem prop="passWord">
						<input type="password" class="input" placeholder="请输入密码" v-model="loginForm.passWord" @keyup.enter="handleLogin">
					</FormItem>
					<Button class="btn" long :loading="loading" @click="handleLogin()">登录</Button>
					<p class="clearfix">
						<router-link :to='{path:"/resetPassword"}'>忘记密码?</router-link>
						<router-link :to='{path:"/register"}' class="a">没有账号? 去注册&gt;</router-link>
					</p>
				</Form>
			</div>
		</div>
	</div>
</template>
<script>
	import store from '@/store/store';
	import { validatePHONE } from '@/assets/js/validate';
	export default {
		name: 'login',
		data() {
			const validatePhone = (rule, value, callback) => {
				if(value == undefined) {
					callback(new Error('手机号不能为空'));
				} else if(!validatePHONE(value)) {
					callback(new Error('请输入正确的手机号'));
				} else {

					callback();
				}
			};
			return {
				loginForm: {
					loginName: '',
					passWord: ''
				},
				ruleInline: {
					loginName: [{
						required: true,
						trigger: 'blur',
						validator: validatePhone
					}],
					passWord: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							type: 'string',
							min: 6,
							message: '密码不能少于6位',
							trigger: 'blur'
						}
					]
				},
				loading: false,
				showDialog: false
			}
		},
		watch: {
			// 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
			'$route': 'getParams'
		},
		mounted() {
			this.getParams();
		},
		methods: {
			getParams() {
				// 取到路由带过来的参数 
				let routerParams = this.$route.params.loginName
				// 将数据放在当前组件的数据内
				this.loginForm.loginName = routerParams
			},
			handleLogin() {
				var _this = this;
					this.$nextTick(() => {
						_this.loading = true;
						_this.$refs.loginForm.validate(valid => {
							if(valid) {
								_this.$axios.post(`customer/validate?userName=${_this.loginForm.loginName}`).then(res => {
									//500用户名已存在,可以登录
									if(res.code !== 500) {
										_this.loading = false;
										_this.$Message.error(res.msg);
									} else {
										_this.$axios.post('customer/login', {
											loginName: _this.loginForm.loginName,
											passWord: _this.loginForm.passWord
										}).then(res => {
											_this.loading = false;
											let {
												code,
												object
											} = res;
											if(code !== 200) {
												_this.$Message.error(object);
											} else {
												_this.$Message.success('登录成功');
												let data = res;
												localStorage.setItem('mobile', _this.loginForm.loginName);
												//根据store中set_token方法将token保存至localStorage/sessionStorage中，data["Authentication-Token"]，获取token的value值  
//												 this.setCookie('token',data.object["token"]); //设置Session
//      this.setCookie('userId',data.object["userId"]);
												store.commit('LOGIN', {
													token: data.object["token"],
													userId: data.object["userId"]
												});
												
												_this.$router.push('/index');
											}

										}).catch(error => {
											_this.$router.replace('/login');
											_this.$Message.error('系统异常');
											_this.loading = false
										})
									}
								})

							} else {
								this.loading = false
								return false;
							}
						})
						});
		}
	}
		}
</script>