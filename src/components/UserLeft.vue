<template>
	<div class="newcenternav">
					<h4>我的购物车</h4>
					<h4>订单中心</h4>
                    <router-link :to="{path: '/user/orderlist'}" tag="p">我的订单</router-link>
                    <router-link :to="{path: '/user/evaluate'}" tag="p">评价晒单</router-link>
                    <router-link :to="{path: '/user/aftersales'}" tag="p">售后服务</router-link>
                    <h4>个人中心</h4>
					<router-link :to="{path: '/user/myinfo'}" tag="p">我的账户</router-link>
					<!-- <router-link :to="{path: '/user/news'}" tag="p">消息通知</router-link>-->
                     <router-link :to="{path: '/user/mylike'}" tag="p">喜欢的商品</router-link>
                    <router-link class="h4" :to="{path: '/user/complain'}" tag="h4">投诉建议</router-link>
                    <router-link class="last h4" :to="{path: '/user/contactus'}" tag="h4">联系我们</router-link>
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
.h4{
    cursor: pointer;
}
.h4:hover{
     color: rgb(255, 0, 0);
}
</style>