<template>
	<div class="padding40">
		<h3 class="myorder">售后服务
					</h3>
		<ul class="ul">
			<li class="" v-for="(x,index) in refundList" :key="index">
				<h3 class="red">{{statusrufundfilter(x.refundOrder.refundOrderStatus)}}</h3>
				<div class="myorderinformation clearfix">
					<span class="myorderOrder clearfix">
						{{x.refundOrder.createTime | formatDate}} 丨{{x.refundOrder.refundOrderNo}}丨{{x.refundOrder.refundOrderType}}  <span class="span">退款金额: ￥<strong>{{x.refundOrder.refundOrderTotalFee|pricefilter}}</strong></span></span>
				</div>
				<div class="myorderImg clearfix">
					<ul>
						<li v-for="(child,i) in x.refundOrderItems" :key="i">
							<img :src="child.productItemImg | imgfilter" alt=""> <span>{{child.productTitle}}   {{child.productAttrs}} </span>
							<span>{{child.refundOrderFee}} x{{child.quantity}}  </span>
						</li>
					</ul>
					<div class="myorderp">
						<router-link :to="{name:'/order/detail',query:{orderNo:x.refundOrder.orderNo}}">订单详情	</router-link>
										<button class="btn btn-dx" v-if="x.refundOrder.refundOrderStatus=='01'" @click="cancelrefund(x.refundOrder.refundOrderNo)">取消</button>
								<button class="btn btn-dx" v-if="x.refundOrder.refundOrderStatus=='02'" @click="showLogisticsInfo(x.refundOrder.refundOrderNo)">填写物流单号</button>
					</div>
				</div>

			</li>
		</ul>
	</div>
</template>

<script>
	import { formatDate } from '@/assets/js/date.js'
	export default {
		data() {
			return {
				refundenums: [],
				refundList:[]
			}
		},
		filters: {
			formatDate(time) {
				var date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
			}
		},
		methods: {
			statusrufundfilter(value) {
				for(var i = 0; i < this.refundenums.length; i++) {
					if(this.refundenums[i].key == value) {
						return this.refundenums[i].value;
					}
				}
			},
			getStatusEnum() {
				this.$axios({
					method: 'get',
					url: '/refund/enums',
				}).then((res) => {
					if(res.code == '200') {
						this.refundenums = res.object;
					}
				});
//				this.$axios({
//					method: 'get',
//					url: '/refund/getRefundCauseList',
//				}).then((res) => {
//					this.reasonList = res;
//				});
			},
			getRefundOrder() {
				this.$axios({
					method: 'get',
					url: '/refund/getRefundOrderList',
				}).then((res) => {
					this.refundList = res;
				});
			}
		},
		mounted() {
			this.getRefundOrder();
			this.getStatusEnum();
		}
	}
</script>

<style scoped="scoped">
	.padding40 {
		padding: 40px;
	}
	
	.newcenter h3 {
		font-weight: 400;
		font-size: 24px;
		color: #333333;
		width: 100%;
		border-bottom: 1px solid #c6c6c6;
		padding-bottom: 18px;
	}
	
	h3.red {
		color: rgb(255, 0, 0);
	}
	h3.myorder{
		padding-bottom: 48px;
	}
	.myorder .myorderspan {
		margin-top: 35px;
	}
	
	.myorder .myorderspan span {
		display: inline-block;
		width: 125px;
		height: 40px;
		font-weight: 400;
		font-style: normal;
		font-size: 16px;
		color: #666666;
		text-align: center;
		line-height: 40px;
		cursor: pointer;
	}
	
	.myorder .myorderspan .red,
	.myorder .myorderspan span:hover {
		color: #FF0000;
	}
	
	.new .ul {
		padding: 0px;
	}
	
	.new .ul li {
		padding: 28px 0px;
	}
	
	.new .ul>li {
		border-bottom: 1px solid #c6c6c6;
		padding-bottom: 0px;
	}
	
	.ul .myorderinformation {
		height: 20px;
		font-weight: 400;
		font-size: 14px;
		color: #666666;
	}
	
	.ul .myorderOrder {
		float: left;
		width: 100%;
		height: 20px;
		font-weight: 400;
		font-size: 14px;
		color: #666666;
		text-align: left;
		margin: 0px 0px 10px;
	}
	
	.ul .span {
		float: right;
		background-color: #ffffff;
		color: #666666;
		padding: 0px;
	}
	
	.ul .span strong {
		font-weight: 400;
		font-style: normal;
		font-size: 30px;
		color: #1E1E1E;
		text-align: right;
	}
	
	.ul .red {
		border: none;
	}
	
	.myorderImg ul {
		padding: 0px;
		padding-top: 28px;
	}
	
	.ul .myorderImg li {
		float: left;
		width: 470px;
		padding-bottom: 0px;
		padding-top: 0px;
	}
	
	.myorderImg img {
		height: 60px;
		vertical-align: middle;
	}
	
	.ul .myorderImg {
		position: relative;
	}
	
	.ul .myorderImg span {
		float: right;
		width: 390px;
		font-weight: 400;
		height: 20px;
		overflow: hidden;
		font-style: normal;
		font-size: 14px;
		color: #666666;
	}
	
	.ul .myorderImg span:nth-of-type(2) {
		position: relative;
		top: -30px;
	}
	
	.myorderImg .myorderp {
		/* float: right; */
		position: absolute;
		width: 375px;
		top: 40px;
		right: -10px;
	}
	
	.myorderImg .myorderp button {
		display: inline-block;
		width: 80px;
		margin-right: 10px;
		height: 30px;
		line-height: 30px;
		border: none;
		background-color: #e1e1e1;
		font-weight: 400;
		font-size: 13px;
		color: #333333;
		text-align: center;
	}
	
	.myorderImg .myorderp button:nth-last-of-type(n+2):hover {
		background-color: #cccccc;
	}
	
	.myorderImg .myorderp button:nth-last-of-type(1) {
		background-color: #ffffff;
		border: 1px solid #f2191a;
		color: #FF0000;
	}
	
	.myorderempty {
		width: 400px;
		margin: 140px auto;
		display: block;
		padding-left: 80px;
	}
	
	.myorderempty span {
		font-weight: 700;
		font-style: normal;
		color: #777777;
		font-size: 24px;
		text-align: left;
	}
	
	.myorderempty a {
		font-size: 18px;
		color: #777777;
		font-weight: 400;
		text-align: center;
		margin-right: 8px;
		background-color: #d7d7d7;
		width: 111px;
		height: 24px;
		display: inline-block;
		line-height: 24px;
	}
	 .ul>li {
    border-bottom: 1px solid #c6c6c6;
        padding-top: 28px ;
}
</style>