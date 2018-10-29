<template>
	<div class="newcenternav">
		<router-link :to="{path: '/cart'}" tag="h4" style="cursor: pointer;">我的购物车</router-link>
		<h4>订单中心</h4>
		<p>
			<router-link :to="{path: '/user/orderlist'}">我的订单</router-link>
		</p>
		<p>
			<router-link :to="{path: '/user/evaluate'}">评价晒单</router-link>
		</p>
		<p>
			<router-link :to="{path: '/user/aftersales'}">售后服务</router-link>
		</p>
		<h4>个人中心</h4>
		<p>
			<router-link :to="{path: '/user/myinfo'}">我的账户</router-link>
		</p>
		<p>
			<router-link :to="{path: '/user/mylike'}">喜欢的商品</router-link>
		</p>
		<router-link class="last h4" :to="{path: '/user/contactus'}" tag="h4">联系我们</router-link>
	</div>
</template>

<script>
</script>
<style scoped="scoped" lang="scss">
	.newcenternav {
		float: left;
		width: 240px;
		margin-right: 15px;
		background-color: #FFFFFF;
		padding: 0 40px;
		padding-bottom: 10px;
	}
	
	.newcenternav h4 {
		font-weight: 700;
		font-size: 18px;
		color: #333333;
		margin-top: 45px;
		margin-bottom: 25px;
	}
	
	.newcenternav .red {
		color: rgb(255, 0, 0);
	}
	
	.newcenternav p {
		font-weight: 400;
		font-size: 16px;
		color: #666666;
		margin-bottom: 16px;
		cursor: pointer;
	}
	
	.newcenternav p:hover {
		color: rgb(255, 0, 0);
	}
	
	.newcenternav .last {
		position: relative;
		top: -29px;
		margin-top: 69px;
	}
	
	.h4 {
		cursor: pointer;
	}
	
	.h4:hover {
		color: rgb(255, 0, 0);
	}
</style>
<style>
	.newcenternav p.router-link-active {
		color: #ff0037;
	}
</style>