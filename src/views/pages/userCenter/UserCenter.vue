<template>
	<div class="user">
		<!-- <div class="user-header">
			<div class="portrait">
				 	<router-link :to="{path: '/user/myinfo'}"> <img :src="userinfo.iconUrl" class="tx" >		</router-link>
				    <span class="color-white"  ></span>
				<span class="shdz">
					<router-link :to="{path: '/user/setting'}">
						<img src="../../../assets/img/setting.png"/>
					</router-link>
				</span>
			</div>
		<div class="integral"><span>积分 0</span><router-link class="discount" :to="{ name: '/sort'}">去购物车抵扣     ></router-link></div></div>
	 <div class="myorder"><h3>我的订单</h3>
	  	<router-link :to="{ path: '/user/orderlist', query: { tabname: '待付款' }}"><img  src="../../../assets/img/待付款.png"><p>待付款</p></router-link>
		<router-link :to="{ path: '/user/orderlist', query: { tabname: '待发货'}}"><img  src="../../../assets/img/待发货.png"><p>待发货</p></router-link>
		<router-link :to="{ path: '/user/orderlist', query: { tabname: '待收货' }}"><img  src="../../../assets/img/待收货.png"><p>待收货</p></router-link>
		<router-link :to="{ path: '/user/orderlist', query: { tabname: '已完成' }}"> <img  src="../../../assets/img/已完成.png"><p>已完成</p></router-link>
		<router-link :to="{ path: '/user/orderlist', query: { tabname: '售后' }}"> <img  src="../../../assets/img/售后.png"><p>售后</p></router-link>
   </div>
   <ul class="order-list"> 
   	<router-link :to="{ path: '/user/mycoupon' }" tag="li"><img  src="../../../assets/img/a1.png">我的优惠券<i>></i></router-link>
   		<router-link :to="{ path: '/user/couponcenter' }" tag="li"><img  src="../../../assets/img/a2.png">领券中心<i>></i></router-link>	
   <router-link :to="{ path: '/user/mylove' }" tag="li"><img  src="../../../assets/img/a3.png">我的收藏<i>></i></li></router-link>	
   	<li><img  src="../../../assets/img/a4.png">在线客服<i>></i></li>
   		<li><img  src="../../../assets/img/a5.png">联系我们<i>></i></li>
   		<li><img  src="../../../assets/img/a6.png">关于我们<i>></i></li>
   </ul> -->
		<!-- <div class='uLeft'>
			<ul>
				<li>个人信息</li>
				<li>我的订单</li>
				<li>我的优惠券</li>
				<li>领券中心</li>
				<li>我的收藏</li>
				<li>在线客服</li>
				<li>收货地址</li>
				<li>关于我们</li>
			</ul>
		</div>
		<div class="uRight">

		</div> -->
		<div class="C_main clearfix">
			<div class="C_info center">

				<div class="C_option fl">
					<ul>
						<li class="customer"><router-link :to="{path: '/user/myinfo'}">更多个人信息 <i></i></router-link> </li>
						<li class="shipp_Address"><router-link :to="{path: '/user/address'}">收货地址 <i></i> </router-link> </li>
						<li class="my_order">我的订单 <i></i> </li>
						<li class="my_APIorder">历史消费订单 <i></i></li>
						<li class="my_event">我的优惠券 <i></i> </li>
						<li class="my_vote">我的收藏 <i></i> </li>
						<li class="my_invoice">在线客服 <i></i> </li>
						<li class="my_question">关于我们 <i></i> </li>
					</ul>
				</div>
				<div class="C_detail hidden">
					<ul class="C_deList">
						<li class="C_module">
							<div id="myDx">
							</div>
						</li>

					</ul>
				</div>


			</div>
		

		</div>
   </div>
</template>

<script>
	export default {
	    data () {
	        return {
	        	userinfo:{
					 iconUrl: '',
					  },
				spanLeft: 5,
                spanRight: 19
	        }
	      },
	      methods:{
	      	getUser(){
	      				this.$axios({
					    method: 'post',
					    url:'/account',
					}).then((res)=>{
						this.userinfo = Object.assign({},res.data);
					});
			  },
			  toggleClick () {
                if (this.spanLeft === 5) {
                    this.spanLeft = 2;
                    this.spanRight = 22;
                } else {
                    this.spanLeft = 5;
                    this.spanRight = 19;
                }
            }	      
			 },
	      mounted(){
			this.getUser();
		  },
		  computed: {
            iconSize () {
                return this.spanLeft === 5 ? 14 : 24;
            }
        },
    }
</script>

<style lang="scss"> 
 @import '@/styles/color.scss';
 /*头部样式*/
	.user-header a{
		color:#fff;
	}
.user{
	width:100%;
	max-width:1100px;
	margin: 0px auto;
}

.C_main {
  margin-top: 20px;
  padding-bottom: 50px;
}
.C_main .C_info .C_option {
  height: 500px;
  width: 126px;
}
.C_main .C_info .C_option ul {
 /*  background-color: #EEEEEE;
  height: 100%; */
}
.C_main .C_info .C_option ul li {
 font-size: 12px;
line-height: 30px;
height: 30px;
background-color: #e7e7e7;
margin-bottom: 6px;
text-indent: 1em;
cursor: pointer;
position: relative;
border-bottom-radius: 3px;
border-bottom-left-radius: 20px;
text-shadow: 1px;
box-shadow: 1px 3px 0px rgba(0, 0, 0, .2);
}
.C_main .C_info .C_option ul li i {
  border-width: 6px;
  border-style: solid;
  border-color: transparent transparent transparent #999;
  position: absolute;
  top: 10px;
  right: 0px;
}
.C_main .C_info .C_option ul li .C_arrow {
  border-color: #e1e1e1  transparent transparent transparent ;
  position: absolute;
  top: 12px;
  right: 6px;
}
.C_main .C_info .C_detail {
  position: relative;
}
.C_main .C_info .C_detail > ul > li {
  padding: 36px;
  padding-top: 0;
  position: absolute;
  top: 0;
  left: 0;
  display: none;
}
.C_main .C_info .C_detail > ul > li ul > li {
  height: 26px;
}
.C_changePass table td {
  line-height: 34px;
}
//  .user-header{
//  	background: url(../../../assets/img/bg.png) repeat scroll 0 0 ;
//  	height: 150px;
//  	position:relative;
//  	.portrait{
 		
//  		padding-left:20px;
//  		padding-top:30px;
//  		overflow:hidden;
//  		padding-bottom:30px;
//  		.tx{
//  			width:60px;
//  			border:2px solid #fff;
//  			border-radius: 60px;
//  			float: left;
//  			margin-right:20px;
//  			height:60px;
//  		}
//  		.color-white{
//  			color:$color-white;
//  			font-size: 16px;
//  		}
//  		.shdz{
//  			float: right;
//  			color:#fff;
//  			img{
//  				width:20px;
//  				float: left;
//  				margin-right:20px;
//  			}
//  		}
//  	}
//  }
	// .myorder {
	//  	background: #fff;
	//  	overflow: hidden;
	//  	h3{
	//  		border-bottom:1px solid $color-border;
	//  		padding: 10px 0;
	//  		font-weight: normal;
	//  		text-indent: 10px;;
	//  	}
	//  	a{
	//  		padding: 10px 0;
	//  		display: inline-block;
	//  		width:20%;
	//  		float: left;
	//  		text-align: center;
	//  		color:$color-default;
	//  		img{
	//  		   width:25px;
	//  		}
	//  	}
	//  	margin-bottom:10px
	// }
	// .order-list{
	// 	    padding:0 10px;
	//  		background: #fff;
	//  		li{
	//  			padding:10px 0;
	//  			border-bottom:1px solid $color-border;
	//  			font-size: 14px;
	//  			display: flex;
	//  			cursor: pointer;
	//  		}
	//  		img{
	//  			height: 20px;
	//  			width:20px;
	//  			margin-right:15px;
	//  		}
	//  		i{
	//  			position: fixed;
	// 			right: 15px;
	//  			font-size: 16px;
	//  		}
	//  	}
	 	// .integral{
	 	// 	background: rgba(168,168,168,0.1);
	 	// 	width: 100%;
	 	// 	position:absolute;
	 	// 	bottom:0px;
	 	// 	padding: 10px 30px 10px 20px;
	 	// 	font-size: 14px;
	 	// 	.discount{
	 	// 		float: right;
	 	// 		color: #666;
	 	// 	}
	 	// }
</style>