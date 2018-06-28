<template>
			<div class="login_wrap_main  flex-center-h">
				<router-link :to="{ path: '/index'}" class="loginA">
					<img class="aImg" src="../assets/img/3.jpg" alt="">
				</router-link>
			<div class="login_wrap">
    			<div class="div">
						<!--<h3 class="lTitle">使用合作号登录</h3>
						<ul class="ul">
							<li class="li">
								<router-link :to="{  }">
									<img src="../assets/img/link-qq.png" alt="QQ登录">
								</router-link>
							</li>
							<li class="li">
								<router-link :to="{  }" >
									<img src="../assets/img/link-wx.png" alt="微信登录">
								</router-link>
							</li>
						</ul>-->
						<h3 class="lTitle">账号密码登录</h3>
						<Form ref="loginForm" :model="loginForm" :rules="ruleInline" inline>
								<FormItem prop="loginName">
										<Input type="text" class="loginInput" v-model="loginForm.loginName" autoComplete="off" placeholder="手机号">
										</Input>
								</FormItem>
								<FormItem prop="passWord">
										<Input type="password" class="loginInput"  v-model="loginForm.passWord" placeholder="密码">
										</Input>
								</FormItem>
								<FormItem>
										<Button  :loading="loading" class='btn btn-40 btn-blue w-bai' @click="handleLogin()">登录</Button>
								</FormItem>
						</Form>
						<div class="login-link">
							<router-link :to='{path:"/register"}'>注册</router-link>
							 <router-link :to='{path:"/resetPassword"}' class='resetPassword'>找回密码</router-link> 
						</div>
					</div>
		</div>
		</div>
</template>
<script>
	import store from '@/store/store';
	import { validatePHONE } from '@/assets/js/validate';
	import { mapMutations } from 'vuex';
    export default {
      name: 'login',
      data() {
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
                     loginForm:{
						loginName: '',
						passWord: ''
					},
					ruleInline: {
							loginName: [
									{ required: true,  trigger: 'blur',  validator: validatePhone }
							],
							passWord: [
									{ required: true, message: '请输入密码', trigger: 'blur' },
									 { type: 'string', min: 6, message: '密码不能少于6位', trigger: 'blur' }
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
      	     getParams () {
		        // 取到路由带过来的参数 
		        let routerParams = this.$route.params.loginName
		        // 将数据放在当前组件的数据内
		        this.loginForm.loginName = routerParams
     	 	},
          handleLogin() {
          	var _this=this;
          	_this.loading=true;
         	_this.$refs.loginForm.validate(valid => {
            if (valid) {
            	_this.loading = false;
				_this.$axios.post('customer/login', {  
					loginName: _this.loginForm.loginName,  
					passWord: _this.loginForm.passWord  
				}).then(res => {  
	               	let { code, object } = res;
		              if (code !== 200) {
		                  _this.$Message.error(object);
		              } else {
					        _this.$Message.success('登录成功');
					 		let data = res;  
							//根据store中set_token方法将token保存至localStorage/sessionStorage中，data["Authentication-Token"]，获取token的value值  
						    store.commit('LOGIN',{token:data.object["token"],userId:data.object["userId"]});
						    	 _this.$router.push( '/' );
						    	 }
							
				}).catch(error => {  
						_this.$router.replace('/login');  
						_this.$Message.error('系统异常');
						_this.loading = false  
				})  
            } 
            else {
            	this.loading = false  
              return false;
            }
          });
        },
      },
    }
</script>
