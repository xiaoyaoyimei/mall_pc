<template>
	<div class="side_bar_wrap">
	<ul class="side_bar_nav">
						<li ><router-link :to="{path: '/user/orderlist'}" >我的订单  </router-link></li>
						<li ><router-link :to="{path: '/user/address'}">收货地址  </router-link> </li>
						<li ><router-link :to="{path: '/user/myinfo'}">个人信息 </router-link> </li>
						<li>我的优惠券  </li>
						<li>我的收藏  </li>
						<li>在线客服  </li>
						<li>关于我们  </li>
					</ul>
   </div>
</template>

<script>
</script>
<style scoped="scoped">
	.side_bar_wrap {
    float: left;
    width: 140px;
    font-family: '\5FAE\8F6F\96C5\9ED1';
}
 .side_bar_nav  li a{
	    font-size: 12px;
    color: #333;
      line-height: 28px;
    position: relative;
}
 .side_bar_nav  li .router-link-active{
	color:#2D8cF0
}
</style>
