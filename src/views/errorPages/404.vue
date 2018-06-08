<template>
<div class="page-404">
	    <img src="../../assets/img/404.png">
	 	<router-link :to="{ path: '/index'}">去首页</router-link>
    </div>
</template>
<script>
</script>
<style scoped="scoped" lang="scss">
.page-404{
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	height: 100vh;
	font-size: 28px;
	background: #fff;
}
.page-404 a{
	font-size: 26px;
	text-decoration: underline;
}
</style>