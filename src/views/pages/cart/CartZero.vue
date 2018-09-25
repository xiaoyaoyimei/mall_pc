<template>
	<div class="successCart clearfix">
		<div class="succeessImg">
			<img src="../../../assets/img/queren.png" alt="">
			<div class="succeessText">
				<h4>已成功加入购物车！</h4>
				<h6>{{routerParams.itemNo}} </h6>
			</div>
		</div>
		<div class="successBtn">
			<a class="goback" @click="$router.go(-1)">返回上一页</a>
			<router-link :to="{ path: '/cart',query:{zeroid:routerParams.id} }" class="gocart">去购物车结算</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				routerParams:{}
			}
			},
			methods: {
				getParams() {
					// 取到路由带过来的参数 
					 this.routerParams = this.$route.params.cartBefore
					// 将数据放在当前组件的数据内
				}
			},
			mounted() {
				this.getParams();
			},
		}
</script>

<style scoped="scoped">
	.successCart {
		margin: 53px auto 70px;
		width: 100%;
		max-width: 1200px;
	}
	
	.successCart .succeessImg {
		float: left;
		width: 50%;
		padding-left: 13px;
	}
	
	.successCart .succeessImg>img {
		float: left;
		vertical-align: middle;
	}
	
	.successCart .succeessText {
		padding-left: 13px;
		height: 64px;
		line-height: 32px;
		float: left;
	}
	
	.successCart .succeessText h4 {
		font-size: 30px;
		color: black;
	}
	
	.successCart .succeessText h6 {
		font-size: 14px;
		font-family: "微软雅黑";
		color: rgb(141, 141, 141);
	}
	
	.successCart .successBtn {
		float: right;
		margin-top: 15px;
	}
	
	.successCart .successBtn a {
		text-align: center;
		padding: 15px 55px;
		box-sizing: border-box;
		font-size: 16px;
	}
	
	.successCart .goback {
		border: 1px solid rgb(210, 210, 210);
		color: rgb(160, 160, 160);
		margin-right: 12px;
	}
	
	.successCart .gocart {
		background-color: rgb(226, 24, 24);
		color: rgb(255, 255, 255);
	}
</style>