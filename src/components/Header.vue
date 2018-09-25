<template>
    <!--<div class="new_header">
       <div class="inner clearfix">
       	<div class="main-wdith">
       	 <router-link  to="/index" class="logo"><img src="../assets/img/logo.png"></router-link>
        <div class="nav_wrap">
            <ul class="nav" >
               <router-link  to="/index" tag="li">首页</router-link>
               <router-link  to="/sort" tag="li">产品</router-link>
                <router-link  to="/seckill" tag="li">秒杀专区</router-link>
                  <router-link  to="/activity" tag="li">活动产品</router-link>
            </ul>
        </div>
        <div class="opt_wrap">
        	   <div class="opt_user" >
                <div v-if="nologin"><router-link  to="/login" >登录</router-link></div>
                <router-link  to="/user" > <i class="icon icon-login-blue" v-if="!nologin"></i></router-link>
                 <div class="common-wrap login-wrap" v-if="!nologin">
            		<i class="icon-arrow"></i>
            		<h3>WELCOME !<i class="icon icon-wel"></i></h3>
            		<p class="color-blue">{{account.nickName}}</p>
            		<p class="mb30">欢迎来到DXRACER官方商城  现在就开始您的购物之旅吧！</p>
                    <router-link  to="/user" class="btn-blue btn-normol btn-40 mr15" tag="button">个人中心</router-link>
                    <button class="btn-dark btn-normol btn-40" @click="logout">退出登录</button>
                  </div>
            </div>
        	  <div class="opt_cart">
            	<i class="icon icon-cart-gray" v-if="nologin"></i>
            	<router-link class="cart-num-wrap clearfix" to="/cart" v-else>
            		<i class="icon icon-cart-blue" ></i>
            		<span>({{cartListlength}})</span>
            	</router-link >
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
            <div class="opt_search" >
                <div  class="search_wrap">  
                     <input v-model="keyword"  placeholder="电竞椅" autocomplete="off"  type="search"  @keyup.enter="gosearch()"> 
                    <i class="icon_search" @click="gosearch()"></i> 
                </div> 
            </div>
        </div>
        </div>
    </div>-->
    <div>
    <header class="bg-black ">
			<div class="main-width">
				<div class="fl header-left">
					<router-link  to="/index">首页</router-link>
					<hr class="spacer mlr8">
					<a href="javascript:void(0)">合作招商</a>
					<hr class="spacer mlr8">
					 <router-link  to="/help">操作指南</router-link>
				</div>
				<div class="fr header-right">
					<div v-if="nologin" style="display: inline-block;"><router-link  to="/login"  >登录</router-link>
					<hr class="spacer">
					 <router-link  to="/register">注册</router-link></div>
					<router-link  to="/user"  v-if="!nologin" style="width: 100px;">
						{{account.nickName}}
						<span v-if="account.nickName==''">{{account.customerMobile}}</span>
					</router-link>
					<hr class="spacer">
					<a href="" class="message"><i class="icon-new icon-message"></i></a>
					<router-link  to="/cart" class="mini-cart"><i class="icon-new icon-minicart"></i></router-link >
				</div>
			</div>
		</header>

    </div>
</div>
</template>
<script>
   // 引入公共的bug，来做为中间传达的工具
   import store from '@/store/store'
   import Bus from '@/assets/js/bus.js'
	 export default {
        data () {
            return {
              nologin:true,
              account:{
              nickName:'',
              iconUrl:'',
              },
              cartList:[],
              totalPrice:0,
              //购物车是否为空
              cartListlength:0
            }
        },
         computed: {
            token() {
            	//获取store里面的token
                return store.state.token;
            },
        },
		methods:{
            isLogin(){
                if(this.token!=null){
	      				this.$axios({
					    method: 'post',
					    url:'/account',
					}).then((res)=>{
                        this.nologin=false;
                        this.account= Object.assign({},res);
                       	Bus.$emit('nologin', this.nologin)
					});
    	     	 }
            },
            getCartList(){
            	var _this=this;
            	this.totalPrice=0;
            	this.cartListlength=0;
        		if(this.token!=null){
        			this.$axios({
							    method: 'post',
							    url:'/order/shopping/list',
								}).then((res)=>{
									if(res.code=='200'){
                                        this.cartList=res.object;
                                        	  this.cartList.forEach(function(item,index) {
												    _this.totalPrice +=item.salePrice*item.quantity;
												    _this.cartListlength+=item.quantity;
											   });
									}
							});
					}
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
  		    Bus.$on('cartmsg', (data) => {
  				  	if(data=="again"){
		          	 this.getCartList();
		         	 }
		      });
		      
            this.isLogin();
            this.getCartList();
		}
    }
</script>

<style scoped="scoped"  lang="scss">
</style>
