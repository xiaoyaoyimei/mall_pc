<template>
	<div class="side_bar_wrap">
	<ul class="side_bar_nav">
		<li class="myrui"><span>我的瑞家</span></li>
		<li class="side_bar_nav_line"></li>
		<li><span>我的交易</span></li>
		<li ><router-link :to="{path: '/user/orderlist'}" >我的订单  </router-link></li>
		<li ><router-link :to="{path: '/user/refundlist'}" >售后订单  </router-link></li>
		<!--<li class="side_bar_nav_line"></li>
		<li><span>会员中心</span></li>
		<li>我的优惠券  </li>
		<li>我的收藏  </li>-->
		<li class="side_bar_nav_line"></li>
		<li><span>账户管理</span></li>
		<li><router-link :to="{path: '/user/address'}">收货地址  </router-link> </li>
		<li><router-link :to="{path: '/user/myinfo'}">个人信息 </router-link> </li>
		<li><router-link :to="{path: '/user/changePwd'}">修改密码 </router-link> </li>			
	</ul>
   </div>
</template>

<script>
</script>
<style scoped="scoped"  lang="scss">
.side_bar_wrap {
    float: left;
    width: 140px;
}
 .side_bar_nav  li{
 	 line-height: 28px;
 	 color:#333;
	  a{
		    font-size: 12px;
	    color: #333;
	    position: relative;
	}
}
 .side_bar_nav  li .router-link-active{
	color:#2D8cF0;
	
}
.side_bar_nav_line{
	    border-bottom: #e3e3e3 1px solid;
    width: 140px;
    margin: 30px 0 17px -10px;
    }
     .side_bar_nav span{
    	 font-weight: 600;
    margin-bottom: 10px;
    
}
.side_bar_nav .myrui{
	color:#0099ff
}
</style>
