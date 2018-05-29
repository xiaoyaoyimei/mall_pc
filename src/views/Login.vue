<template>
    <div class="login">
			<div class="login2">
    			<h3>账号登录</h3>
    <div id="canvascontainer" ref='can'></div>
    <Form ref="loginForm" autoComplete="on" :model="loginForm" :rules="loginRules"   label-position="left" :label-width="100">
        <Form-item prop="loginName" label="账号">
            <Input type="text" v-model="loginForm.loginName" placeholder="loginName" autoComplete="on">
            </Input>
        </Form-item>
        <Form-item prop="passWord" label="密码">
            <Input type="password" v-model="loginForm.passWord" placeholder="passWord" @keyup.enter.native="handleLogin">
            </Input>
        </Form-item>
             <Button type="primary" @click="handleLogin('loginForm')"  class="btn-login">登录</Button>
            <router-link :to="{path: '/register'}" class="re">新用户注册</router-link>
    </Form>
		</div>
    </div>
</template>

<script>
	import store from '@/store/store';
	import { mapMutations } from 'vuex';
    export default {
      name: 'login',
      data() {
        const validatePass = (rule, value, callback) => {
          if (value.length < 1) {
            callback(new Error('密码不能为空'));
          } else {
            callback();
          }
        };
        return {
          loginForm: {
            loginName: '18336077236',
            passWord: '0'
          },
          loginRules: {
            loginName: [
                   { required: true, message: '用户名不能为空', trigger: 'blur' }
            ],
            passWord: [
                { required: true, trigger: 'blur', validator: validatePass }
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
        this.loginName = routerParams
     	 },
          handleLogin() {
          this.$refs.loginForm.validate(valid => {
            if (valid) {
            	this.global_.loginName=this.loginForm.loginName;
            	this.global_.passWord=this.loginForm.passWord;
				this.$axios.post('customer/login', {  
				loginName: this.loginForm.loginName,  
				passWord: this.loginForm.passWord  
				}).then(res => {  
					this.logining = false;
	               	let { code, object } = res;
		              if (code !== 200) {
		                  this.$Message.error(object);
		              } else {
					        this.$Message.success('登录成功');
					 		let data = res;  
							//根据store中set_token方法将token保存至localStorage/sessionStorage中，data["Authentication-Token"]，获取token的value值  
							this.$store.commit('set_token',{token:data.object["token"],userId:data.object["userId"]});  
//							 ...mapMutations({
//   							 'set_token',{token:data.object["token"]} // 将 `this.add()` 映射为 `this.$store.commit('increment')`
// 								 })

							if (store.state.token) {  
							this.$router.push(this.$route.query.redirect || '/')
							} else {  
								this.$router.replace('/login');  
							}  
		              }
				}).catch(error => {  
						this.loading = false  
						this.loginBtn = "登录"  
						this.$Message.error('系统异常');
				})  
            } 
            else {
              console.log('登录验证失败!');
              return false;
            }
          });
        },
      },
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
		padding-top: 300px;
		text-align:center;
		.login2{
			background: #fff;
			padding: 30px 15px;
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
	</style>
	<style>
		 .ivu-input{
			/* border:0 none; */
			font-size: 16px;
			height:36px;
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
		.ivu-form-item-content{
			border:1px solid #bdbdbd;
			/* height:38px; */
		}
</style>
