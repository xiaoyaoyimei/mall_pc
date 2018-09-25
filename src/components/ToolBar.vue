<template>
	<div class="toolbar">
			<ul>
				<li><i class="icon-new icon-user"></i>个人中心</li>
				<li><i class="icon-new icon-kefu"></i>联系客服</li>
				<router-link  to="/cart"  tag="li"><i class="icon-new icon-cart"></i>购物车</router-link>
				<li class="mt15">
					<i class="icon-new icon-back"></i>回到顶部</li>
			</ul>
		</div>
</template>

<script>
	
</script>

<style scoped="scoped">
	.toolbar {
	position: fixed;
	right: 0;
	top: 200px;
}

.toolbar li {
	width: 80px;
	height: 80px;
	border: 1px solid #eee;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: #fff;
	cursor: pointer;
}
.detailtoolbar li {
	background: #999;
	color: #fff;
}
.toolbar li:hover {
	background: #313131;
	color: #fff;
}
.toolbar li:not(:last-child) {
	margin-top: -1px
}

.toolbar .mt15 {
	margin-top: 15px;
}
</style>