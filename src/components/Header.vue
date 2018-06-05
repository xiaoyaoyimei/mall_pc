<template>
    <div class="new_header">
       <div class="inner clearfix">
       	<div class="main-wdith">
       	 <router-link  to="/index" class="logo"><img src="../assets/img/logo.png"></router-link>
        <div class="nav_wrap">
            <ul class="nav" >
               <router-link  to="/index" tag="li">首页</router-link>
               <router-link  to="/sort" tag="li">产品</router-link>
                <router-link  to="/seckill" tag="li">秒杀专区</router-link>
            </ul>
        </div>
        <div class="opt_wrap">
        	  <div class="opt_cart">
            	<i class="icon icon-cart-gray" v-if="nologin"></i>
            	<i class="icon icon-cart-blue" v-else></i>
            	<div class="common-wrap cart-wrap" v-if="nologin">
            		<i class="icon-arrow"></i>
            		您还未登录  ? <router-link  to="/login">请登录</router-link>
            	</div>
            	<div class="common-wrap cart-wrap" v-else>
            		<i class="icon-arrow"></i>
            		<div class="cartList" v-if="cartList.length>0">
            			<ul>
            				<li v-for="(item,index) in cartList" :key="index"  class="clearfix">
            					<img :src="item.image|imgfilter">
            					<div><p class="title">{{item.productName}}</p><p>￥{{item.salePrice|pricefilter}}</p></div>
            				</li></ul>
            		<div class="divider"><span>金额</span><span class="total">￥{{totalPrice|pricefilter}}</span></div>
            		<router-link  to="/cart" tag="button"  class="btn-long btn-blue btn-40">结账去~</router-link >
            		</div>
            		<div class="cart_empty" v-else>
            		 <img src="../assets/img/cartempty.png">	
            		 购物车暂无商品,赶紧选购吧
            		</div>
            	   </div>
            </div>
                 <div class="opt_user" >
            	<i class="icon icon-login-gray"  v-if="nologin"></i>
            	<i class="icon icon-login-blue" v-else></i>
            	<!-- 未登陆 -->
            	<div class="common-wrap" v-if="nologin">
            		<i class="icon-arrow"></i>
            		<h3>登录</h3>
            	<Form :model="loginForm" label-position="top" ref="loginForm" :rules="loginRules" autoComplete="on" >
		        <FormItem label="用户名" prop="loginName"> 
		            <Input v-model="loginForm.loginName" type="text"></Input>
		        </FormItem>
		        <FormItem label="密码" prop="passWord">
		            <Input v-model="loginForm.passWord" type="text"></Input>
		        </FormItem>
		        <button class="btn-long btn-blue btn-40 mb30" @click="login">登录</button>
		         <router-link to="/register" class="btn-long btn-dark btn-40" tag="button" >注册</router-link>
		        </Form>
                  </div>
                 <div class="common-wrap login-wrap" v-else>
            		<i class="icon-arrow"></i>
            		<h3>WELCOME !<i class="icon icon-wel"></i></h3>
            		<p class="color-blue">用户ID</p>
            		<p class="mb30">欢迎来到DXRACER旗下ZERO官网
                                                              现在就开始您的购物之旅吧！</p>
                    <router-link  to="/user" class="btn-blue btn-normol btn-40 mr15" tag="button">个人中心</router-link>
                    <button class="btn-dark btn-normol btn-40" @click="logout">退出登录</button>
                  </div>
            </div>
            <div class="opt_search" >
                <div  class="search_wrap">  
                    <form> 
                            <input v-model="keyword"  placeholder="电竞椅" autocomplete="off"  type="search"  @keyup.enter="gosearch()"> 
                      </form>   
                    <i class="icon_search" @click="showsearch()"></i> 
                </div> 
            </div>
        </div>
        </div>
    </div>
    </div>

</template>
<script>
   // 引入公共的bug，来做为中间传达的工具
	import Bus from '@/assets/js/bus.js'
	 export default {
        data () {
            return {
            	loginForm:{
            		loginName:'',
            		passWord:''
            	},
		         loginRules: {
		         loginName: [
		                   { required: true, message: '用户名不能为空', trigger: 'blur' }
		            ],
		            passWord: [
		                { required: true, message: '密码不能为空', trigger: 'blur' }
		            ]
		          },
              keyword: '',
              opt_search_hover:false,
              nologin:true,
              account:{
              nickName:'',
              iconUrl:'',
              },
                  cartList:[],
                  totalPrice:0,
                  //购物车是否为空
                  cartListlength:''
            }
        },
		methods:{
					deletepro(id){
					let ids=[id];
				    this.$Modal.confirm({
                    title: '删除提示',
                    content: '<p><strong>确定要删除该商品？</strong></p>',
                    cancelText: '取消',
                     onOk: () => {
                       	this.$axios({
							    method: 'post',
							    url:'/order/shopping/deleByIds',
							    data:ids
								}).then((res)=>{
									if(res.code==200){
									this.$Message.info(res.object);
									this.getCartList()
									}
							});
                    },
                    onCancel: () => {
                        this.$Message.info('取消成功');
                    }
                });
			},
            isLogin(){
                if(localStorage.getItem("token")!=undefined&&localStorage.getItem("token")!=""){
	      				this.$axios({
					    method: 'post',
					    url:'/account',
					}).then((res)=>{
                        this.nologin=false;
                        this.account= Object.assign({},res);
					});
    	     	 }
            },
            getCartList(){
            	var _this=this;
            	this.totalPrice=0;
        		if(localStorage.getItem('token')!=undefined){
        			this.$axios({
							    method: 'post',
							    url:'/order/shopping/list',
								}).then((res)=>{
									if(res.code=='200'){
                                        this.cartList=res.object;
                                        	  this.cartList.forEach(function(item,index) {
												    _this.totalPrice +=item.salePrice*item.quantity;
											   });
									}
							});
					}
        	},
			showsearch(){
				  this.opt_search_hover=true;
			},
			gosearch(){
			    Bus.$emit('val', this.keyword)
                this.$router.push({name: '/sort',query:{keyword:this.keyword}});  
            },
            gotologin(){
            	this.$router.push('/login');
            },
             gotouser(){
            	this.$router.push('/user');
            },
            login(){
             this.$refs.loginForm.validate(valid => {
            	if (valid) {
				this.$axios.post('customer/login', {  
				loginName: this.loginForm.loginName,  
				passWord: this.loginForm.passWord  
				}).then(res => {  
	               	let { code, object } = res;
		              if (code !== 200) {
		                  this.$Message.error(object);
		              } else {
					        this.$Message.success('登录成功');
					 		let data = res;  
							this.$store.commit('LOGIN',{token:data.object["token"],userId:data.object["userId"]});  
							this.logining = false;
							if (store.state.token) {  
							this.$router.push(this.$route.query.redirect || '/')
							} else {  
								this.$router.replace('/login');  
							}  
		              }
				}).catch(error => {  
						this.$Message.error('系统异常');
						this.loading = false  
				})  
            } 
            else {
              return false;
            }
          });
            },
            logout(){
				var _this = this;
				   this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确认退出登录吗</p>',
                    onOk: () => {
		                    this.$axios({
							    method: 'post',
							    url:'/customer/logout',
							}).then((res)=>{
								     if (res.code !== 200) {
				                 		 this.$Message.error(res.msg);
				              		} 
				              		else{
										this.$store.commit('LOGOUT');  
				    					_this.$router.push('/login');
			    					}
							});
		                       
                    },
                    onCancel: () => {
                        this.$Message.info('取消退出');
                    }
                });
            }
    	    
        },
  		mounted(){
            this.isLogin();
            this.getCartList();
		}
    }
</script>

<style scoped="scoped"  lang="scss">
.new_header{
	background: #191919;
}
.inner{
	padding-top: 15px;
	.logo{
		float: left;
	}
	.nav_wrap{
		float: left;
		display: block;
		margin-left: 100px;
		li{
			float: left;
			color: #fff;
			margin-left: 80px;
			height: 36px;
			line-height: 36px;
			cursor: pointer;
			font-size: 14px;
		}
		
	}
}
.search_wrap input{
	border: 1px solid #fff;
	height: 22px;
	width: 136px;
	background: #191919;
	color: #fff;
	text-align: center;
	font-weight: bold;
}
.icon_search{
	background:url(../assets/img/search_header.png) scroll no-repeat 0 0;
	width:16px;
	height: 16px;
	display: inline-block;
	position: absolute;
	left: 5px;
	top: 1px;
}
.opt_wrap{
		float: right;
		padding-top: 8px ;
		position: relative;
		right:10px
	}
.opt_cart,.opt_user,.opt_search{
		position: relative;
	float: right;
	
}
.opt_user{
	padding-left: 30px;
	padding-right: 30px;
	padding-bottom: 15px;
}
.icon{
	cursor: pointer;
	background-image: url(../assets/img/header_sprite.png);
	background-repeat: no-repeat;
	background-attachment: scroll;
	display: inline-block;
}
.icon-login-gray,.icon-login-blue{
		width: 25px;
	height: 25px;
}
.icon-login-gray{
	background-position: -35px -3px;
}
.icon-login-gray:hover,.icon-login-blue{
	background-position: -3px -2px;
}
.opt_user:hover .common-wrap,.opt_cart:hover .common-wrap{
	display: block;
}
.common-wrap{
	display: none;
     position: absolute;
    right: -49px;
    width: 320px;
    top: 45px;
    z-index: 2;
    background: #fff;
    border: 1px solid #ccc;
    padding-left: 27px;
    padding-top: 25px;
    padding-right: 26px;
    padding-bottom: 20px;
    .icon-arrow{
    	background: url(../assets/img/header_sprite.png) no-repeat scroll -68px -1px;
    	width:31px;
    	height: 15px;
    	display: inline-block;
    	position: absolute;
    	top:-15px;
    	right: 80px;
    	
    }
    h3{
    	font-weight: bold;
    	color:#0099ff;
    	margin-bottom: 20px;
    	font-size: 15px;
    }
}
.cart-wrap{
	right:-81px
}
.login-wrap p{
	font-size: 15px;
}
.login-wrap .color-blue{
	margin-bottom: 5px;
}
.icon-wel{
	background-position: -110px -2px;
	width: 26px;
	height: 26px;
	position: relative;
	top: 4px;
	left: 5px;
}
.icon-cart-gray,.icon-cart-blue{
	width: 30px;
height: 30px;
display: inline-block;
}
.icon-cart-gray{
background-position: -36px -37px;

}
.icon-cart-gray:hover,.icon-cart-blue{
	background-position: -1px -36px;
}

.cartList{
	img{
	width: 80px;
	float: left;
	}
	.total{
		float: right;
		font-size: 16px;
		}
 p{
	color:#111;
	font-weight: bold;
}

 .title{
	white-space: nowrap;
	text-overflow: ellipsis;
	width:185px;
	overflow: hidden;
}
.divider{
	margin-left:-27px;
	margin-right: -26px;
	border-top:1px solid #ccc;
	margin-top: 20px;
	padding-top:15px;
	padding-bottom: 15px;
	padding-left: 27px;
	padding-right: 26px;
}
}
.cart_empty {
	    display: flex;
    justify-content: center;
    align-items: center;
	img{
	width: 50px;
	margin-right: 20px;
	}
}

</style>
<style> 
	 .ivu-input{
    	height: 40px;
    	line-height:40px;
    	width:267px;
    	border-radius: 0;
    }
    .ivu-form .ivu-form-item-label{
    		font-size: 15px;
    	color:#999
    }
</style>
