<template>
    <div>
    <header class="bg-black ">
			<div class="main-width">
				<div class="fl header-left">
					<router-link  to="/index">首页</router-link>
					<hr class="spacer mlr8">
					 <router-link  to="/help/hzzs">合作招商</router-link>
					<hr class="spacer mlr8">
					 <router-link  to="/help">操作指南</router-link>
				</div>
				<div class="fr header-right">
					<div v-if="nologin" style="display: inline-block;"><router-link  to="/login"  >登录</router-link>
					<hr class="spacer">
					 <router-link  to="/register">注册</router-link></div>
					<div @mouseover="qiehuanfunction()" class="qiehuan" @mouseout="qiehuanfunction()"  v-if="!nologin" style="">
						
						<span class="overflow" v-if="account.nickName==''">{{account.customerMobile}}</span>
						<span class="a overflow" v-else>{{account.nickName}}</span> <Icon type="ios-arrow-down" />
						<div :class="{'none':qiehuan}" style="display:none">
						<router-link  class="a" to='/user'>我的订单</router-link>	
						<router-link  class="a" to='/user/mylike'>我的喜欢</router-link>	
						<router-link  class="a" to='/user/myinfo'>我的账户</router-link>	
						<span   @click="logout" class="a" >退出登录</span>
						</div>
					</div>
					<hr class="spacer">
					<router-link  to="/cart" class="mini-cart"><i class="icon-new icon-minicart"></i></router-link >
				</div>
			</div>
		</header>

    </div>
</div>
</template>
<script>
   // 引入公共的bug，来做为中间传达的工具
   	import { getToken, setToken, removeToken,getUserId,setUserId,removeUserId } from '@/base/auth'
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
			  cartListlength:0,
			  qiehuan:false
            }
        },
         computed: {
            token() {
            	//获取store里面的token
                return store.state.token;
            },
        },
		methods:{
			//退出登录
				logout: function () {
				var _this = this;
				   this.$Modal.confirm({
                    title: '登出',
                    content: '<p>确认登出吗?</p>',
                    onOk: () => {
                    	 store.dispatch('LogOut').then(() => {
				            	_this.$router.push('/login');
				            	return false
         				 })
                    },
                });
			},
			qiehuanfunction(){
				this.qiehuan = !this.qiehuan
			},
            isLogin(){
                if(this.token!=null&&this.token!=""&&this.token!=undefined){
	      				this.$axios({
					    method: 'post',
					    url:'/account',
					}).then((res)=>{
                        this.nologin=false;
                        this.account= Object.assign({},res);
                       	Bus.$emit('nologin', this.nologin)
                       	this.getCartList()
					});
    	     	 }else{
    	     	 	 	Bus.$emit('nologin', this.nologin)
    	     	 }
            },
            getCartList(){
            	var _this=this;
            	this.totalPrice=0;
            	this.cartListlength=0;
        			this.$axios({
							    method: 'post',
							    url:'/order/shopping/list',
								}).then((res)=>{
							if(res!=undefined){
								if(res.code=='200'){
	                                        this.cartList=res.object;
	                                        	  this.cartList.forEach(function(item,index) {
													    _this.totalPrice +=item.salePrice*item.quantity;
													    _this.cartListlength+=item.quantity;
												   });
										}
							}
							});
        	},
            gotologin(){
            	this.$router.push('/login');
            },
             gotouser(){
            	this.$router.push('/user');
            },

        },
  		mounted(){
  		    Bus.$on('cartmsg', (data) => {
  				  	if(data=="again"){
		          	 this.getCartList();
		         	 }
		      });
            this.isLogin();
        
		}
    }
</script>

<style scoped="scoped"  lang="scss">
.header-right{
	
}
.none{
	display: inline-block!important;
	position: absolute;
	top: 50px;
	left: 0px;
	background-color:#1b1b1b;
	z-index: 100000;
}
.qiehuan{
	width: 120px;
	display:inline-block;
	background-color:#1b1b1b;
	position: relative;
	cursor: pointer;
	min-height: 50px;
}

.qiehuan .a{
	width: 120px;
	display: inline-block;
	text-align: center;
	height: 31px;
	cursor: pointer;
	line-height: 31px;
}
.qiehuan .overflow{
	overflow: hidden;
	text-overflow: ellipsis;
	display: inline-block;
	width: 100px;
	height: 30px;
	line-height: 30px;
	position: relative;
	top: 10px;
}

.qiehuan .a:hover{
	color: #ff0000;
}
.qiehuan .overflow:hover{
	color: #ff0000;
}
</style>
<style>
.qiehuan .ivu-icon-ios-arrow-forward{
	transform: rotate(90deg);
}
.overflow:hover + .ivu-icon:before{
	color: #ff0000!important;
}
</style>

