<template>
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
    	     	 }else{
    	     	 	 	Bus.$emit('nologin', this.nologin)
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
