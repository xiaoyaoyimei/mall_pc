<template>
    <div class="new_header">
    	<div >
       <div class="inner">
       	 <router-link  to="/index" class="logo"><img src="../assets/img/logo.png"></router-link>
        <div class="nav_wrap">
            <ul class="nav" >
               <router-link  class='navItem' to="/index" tag="li">首页</router-link>
               <router-link  class='navItem' to="/sort" tag="li">分类页</router-link>
                <router-link class='navItem'  to="/newchannel" tag="li">新品推荐</router-link>
               <router-link  class='navItem' to="/seckill" tag="li">限时秒杀</router-link>
            </ul> 
        </div>
        <div class="opt_wrap">
            <div class="opt_search" >
                <!-- dxracer商城_PC版_首页_搜索 -->
                <div  class="search_wrap">  
                    <form> 
                            <input v-model="keyword" v-on:blur="changeCount()" placeholder="电竞椅" autocomplete="off"  type="search"  @keyup.enter="gosearch()"> 
                      </form>   
                    <i class="icon_search" @click="showsearch()"></i> 
                </div> 
            </div>
                    <!-- S 未登陆 -->
            <div class="opt_user" >
            	<i class="icon icon-login-gray"></i>
            	<div class="nologin-wrap"><h3>登录</h3>
            	<Form :model="formLogin" label-position="top">
		        <FormItem label="用户名">
		            <Input v-model="formLogin.loginName"></Input>
		        </FormItem>
		        <FormItem label="密码">
		            <Input v-model="formLogin.passWord"></Input>
		        </FormItem>
		        </Form>
                  </div>
            </div>
            
        </div>
    </div>
            </div>
    </div>
            <!-- S 购物车-->
            <!--<div class="opt opt_cart" @mouseenter="enter" >
                <i class="icon_opt icon_cart_small"></i>
                <span class="header_cart_num js_header_cart_num"></span>
            </div>-->
            <!-- E 购物车-->

    

            <!-- S 登陆成功-->
            <!--<div class="opt opt_user opt_user_login_success js_opt_user_login_success" @mouseenter="enter1" :class="{loginflag:!nologin}" @click="gotouser">
                <i class="icon_opt icon_user_main"  v-if="account.iconUrl==''"></i>
                <img class="user_login_img js_user_login_img" :src="account.iconUrl|imgfilter" alt="用户头像" width="20" height="20" v-else>
                <i class="icon_atom icon_user_point_new js_act_dot" id="dot"></i>
                <span class="user_login_name js_user_login_name">{{account.nickName}}</span>
            </div>-->

    <!--<div class="user_wrap user_unlogin_wrap JS_user_unlogin_wrap" :class="{hidden:hidden}" style="display:none">
        <div class="row row_my_order">
            <router-link :to="{ path: '/user/orderlist'}">
                <i class="icon_atom icon_my_order"></i>
                <span class="fn">我的订单</span>
            </router-link>
           </div>
        <div class="row row_address">
            <router-link :to="{ path: '/user/address' }" >
                <i class="icon_atom icon_address"></i>
                <span class="fn">地址管理</span>
            </router-link>
        </div>
        <div class="row row_account row_last">
            <router-link :to="{ path: '/user/myinfo' }">
                <i class="icon icon_account"></i>
                <span class="fn">账户设置</span>
            </router-link>
        </div>
        <div class="row row_login_out row_last" @click="logout">
            <i class="icon icon_login_out"></i>
            <span class="fn">退出登录</span>
        </div>
    </div>-->
    <!-- E 用户未登陆时的hover -->

    <!-- S 购物车顶部导航弹窗 -->
    <!--<div class="common_cart_wrap" :class="{hidden1:hidden1}" style="right: 86px;">
        <div class="common_cart_login"  :class="{loginflag:nologin}" >
                  立即<a href="#/login">登录</a>，查看购物车商品
        </div>-->
        <!-- E 购物车未登录 -->

        <!-- S 购物车无商品 -->
        <!--<div class="common_cart_nothing cartnone" :class="{loginflag:!nologin}"  v-if="!nologin&&cartzero">
            <div class="icon_opt icon_cart_middle"></div>
                         购物车中还没有商品，赶紧选购吧！
        </div>-->
        <!-- E 购物车无商品 -->

        <!-- S 购物车有商品 -->
        <!--<div class="common_cart_something cartnone" :class="{loginflag:!nologin}" v-if="!nologin&&!cartzero">
            <div class="icon_opt icon_cart_middle"></div>
                              
               <ul class="common_cart_list js_common_cart_list">  
               	<li class="common_cart_item" v-for="(item,index) in cartList" :key="index">
			    <div class="product_img">
			      <img  :src="item.image |imgfilter">
			    </div>
			    <div class="product_info">
			                <div class="product_title">
			              {{item.productName}}         
			                    </div>
			        <div class="product_sku">
			                  {{item.productAttr}}
			        </div>
			    </div>
			    <div class="cart_operation">
			        <span class="cart_price">{{item.salePrice |pricefilter}}</span>
			        <span class="operation_delete" @click="deletepro(item.id)">删除</span>
			    </div>
			</li>
			</ul>
			
            <div class="common_cart_bottom">
                <a class="to_cart" href="#/cart">
                                                    查看购物车
                </a>
            </div>
        </div>-->
        <!-- E 购物车有商品 -->
    <!-- E 购物车顶部导航弹窗 -->
</template>

<script>
   // 引入公共的bug，来做为中间传达的工具
	import Bus from '@/assets/js/bus.js'
	 export default {
        data () {
            return {
            	formLogin:{
            		loginName:'',
            		passWord:''
            	},
                keyword: '',
                  opt_search_hover:false,
                  nologin:true,
                  account:{
                  nickName:'',
                  iconUrl:'',
                  },
                  cartList:[],
                  //购物车是否为空
                  cartzero:true,
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
                        console.log(res)
                        this.account= Object.assign({},res);
					});
    	     	 }
            },
            getCartList(){
        		if(localStorage.getItem('token')!=undefined){
        			this.nologin=false;
        			this.$axios({
							    method: 'post',
							    url:'/order/shopping/list',
								}).then((res)=>{
									if(res.code=='200'){
                                        this.cartList=res.object;
                                        if(this.cartList.length > 0){
                                            this.cartzero = false
                                        }else{
                                             this.cartzero = true
                                        }
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
            logout(){
				var _this = this;
				   this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确认退出吗?</p>',
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
	height: 68px;
	background: #191919;
}
.inner{
	padding: 15px 0;
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
			line-height: 36px;;
		}
		
	}
	.opt_wrap{
		float: left;
		padding-top: 8px ;
	}
}
.opt_search{
	float: left;
}
.search_wrap{
	position: relative;
	margin-left: 700px;
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
.opt_user{
	float: left;
	margin-left: 30px;
	position: relative;
}
.icon{
	cursor: pointer;
	background-image: url(../assets/img/header_sprite.png);
	background-repeat: no-repeat;
	background-attachment: scroll;
	display: inline-block;
}
.icon-login-gray{
	width: 25px;
	height: 25px;
	background-position: -35px -3px;
}
.icon-login-gray:hover{
	background-position: -3px -2px;
}
.nologin-wrap{
position: absolute;
    right: 0;
    width: 320px;
    top: 36px;
    z-index: 2;
    background: #fff;
    padding: 20px;
    border: 1px solid #e8e8e8;
}
.nav .navItem{
    cursor: pointer;
}
</style>
