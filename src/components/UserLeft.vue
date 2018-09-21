<template>
	<!--<div class="side_bar_wrap">
		<ul class="side_bar_nav">
			<li class="myrui"><span>我的瑞家</span></li>
			<li class="side_bar_nav_line"></li>
			<li><span>我的交易</span></li>
			<li>
				<router-link :to="{path: '/user/orderlist'}">我的订单 </router-link>
			</li>
			<li class="side_bar_nav_line"></li>
			<li><span>账户管理</span></li>
			<li>
				<router-link :to="{path: '/user/address'}">收货地址 </router-link>
			</li>
			<li>
				<router-link :to="{path: '/user/myinfo'}">个人信息 </router-link>
			</li>
			<li>
				<router-link :to="{path: '/user/changePwd'}">修改密码 </router-link>
			</li>
		</ul>
	</div>-->
	<div class="newcenternav">
					<h4>我的购物车</h4>
					<h4>订单中心</h4>
                    <p class="red"><router-link :to="{path: '/user/orderlist'}">我的订单</router-link></p>
                    <p>评价晒单</p>
                    <p>售后服务</p>
                    <h4>个人中心</h4>
					<p class=""><router-link :to="{path: '/user/myinfo'}">我的账户</router-link></p>
					<p>消息通知</p>
                    <p>喜欢的商品</p>
                    <h4>投诉建议</h4>
                    <h4 class="last">联系我们</h4>
                </div>
</template>

<script>
</script>
<style scoped="scoped" lang="scss">

	.newcenternav{
    float: left;
    width: 240px;
    margin-right: 15px;
    background-color: #FFFFFF;
    padding:0 40px;
    padding-bottom: 10px;
}

.newcenternav h4{
    font-weight: 700;
    font-size: 18px;
    color: #333333; 
    margin-top: 45px;
    margin-bottom: 25px;
}
.newcenternav .red{
    color: rgb(255, 0, 0);
}
.newcenternav p{
    font-weight: 400;
    font-size: 16px;
    color: #666666;
    margin-bottom: 16px;
    cursor: pointer;
}
.newcenternav p:hover{
    color: rgb(255, 0, 0);
}
.newcenternav .last{
    position: relative;
    top: -29px;
}
</style>