<template>
	<div class="padding40">
		<h2>{{statusfilter(refundOrderdetail.shoppingRefundOrder.refundOrderStatus)}}</h2>
		<p style="margin-top:5px;font-size:14px;">申请时间：{{refundOrderdetail.shoppingRefundOrder.createTime | formatDate('yyyy-MM-dd hh:mm:ss')}}</p>
		<div class="orderdetailnum">
			退款金额：￥ <em style="font-size:30px;"> {{refundOrderdetail.shoppingRefundOrder.refundOrderTotalFee | pricefilter}}</em>
		</div>
		<ul>
			<li class="clearfix orderteail" v-for="(item,index) in orderdetail.shippingOrderItems" :key="index">
				<img :src="item.productItemImg | imgfilter" :alt="item.productTitle">
				<div class="orderdetailText">
					<span>{{orderFeejun(item)|pricefilter}} x {{item.quantity}}</span>
					<span>{{item.productTitle}}</span>
				</div>
			</li>
		</ul>
		<div class="orderdetailtotal clearfix">
			<div class="orderdetailtotalAttr">
				<p>订单编号：</p>
				<p>成交时间：</p>
				<p>商品总价：</p>
				<p>活动优惠：</p>
				<p>运&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;费：</p>
				<p>应付总额：</p>
			</div>
			<div class="orderdetailtotalValue">
				<p>{{orderdetail.shippingOrder.orderNo}}</p>
				<p>{{orderdetail.shippingOrder.createTime | formatDate('yyyy-MM-dd hh:mm:ss')}}</p>
				<p>￥{{orderdetail.shippingOrder.productFee|pricefilter}}</p>
				<p>-￥<label v-if="orderdetail.shippingOrder.discountFee!=''">{{orderdetail.shippingOrder.discountFee|pricefilter}}</label><label v-else>0</label></p>
				<p v-if="orderdetail.shippingOrder.postageFee!=''">
					￥{{orderdetail.shippingOrder.postageFee|pricefilter}}
				</p>
				<p v-else>￥0.00</p>
				<p>￥ {{orderdetail.shippingOrder.orderTotalFee|pricefilter}}</p>
			</div>
		</div>
		<div class="orderdetailtotal">
			<div class="orderdetailtotalAttr">
				<p>退款编号：</p>
				<p>退款金额：</p>
				<p>要&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;求：</p>
				<p>退货快递：</p>
				<p>退货单号：</p>
			</div>
			<div class="orderdetailtotalValue">
				<p>{{refundOrderdetail.shoppingRefundOrder.refundOrderNo}}</p>
				<p>￥{{refundOrderdetail.shoppingRefundOrder.refundOrderTotalFee | pricefilter}}</p>
				<p>{{refundOrderdetail.shoppingRefundOrder.remarks}}</p>
				<p>{{refundOrderdetail.shoppingRefundOrder.logistics}}</p>
				<p>{{refundOrderdetail.shoppingRefundOrder.expressNo}}</p>
			</div>
		</div>
		<Spin size="large" fix v-if="spinShow"></Spin>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				spinShow: true,
				orderdetail: {
					shippingOrder: {postageFee:0,orderTotalFee:0},
					shippingInvoice: {},
					shippingAddress: {},
					shoppingOrderItems: [],
				},
				refundOrderdetail: {
					shoppingRefundOrder: {refundOrderTotalFee:0},
					shippingInvoice: {},
					shippingAddress: {},
					shoppingRefundOrderItems: [],
				},
				statusList: [],
				orderNo: '',
			}
		},
		methods: {
			getStatusEnum() {
				this.$axios({
					method: 'get',
					url: '/refund/enums',
				}).then((res) => {
					if(res.code == '200') {
						this.statusList = res.object;
					}
				});
			},
			statusfilter(value) {
				for(var i = 0; i < this.statusList.length; i++) {
					if(this.statusList[i].key == value) {
						return this.statusList[i].value;
					}
				}
			},
			cancel() {
				this.$Modal.confirm({
					content: '<p>确定取消该售后服务订单？</p>',
					onOk: () => {
						this.$axios({
							method: 'post',
							url: '/order/cancel/' + this.orderNo,
						}).then((res) => {
							if(res.code == '200') {
								this.$Message.info(res.msg);
								this.getOrder();
							} else {
								this.getOrder();
								this.$Message.info(res.msg);
							}
						});
					},
					onCancel: () => {}
				});
			},
			//详情页均值
			discountFeejun(item) {
				return item.discountFee / item.quantity
			},
			productFeejun(item) {
				return item.productFee / item.quantity
			},
			orderFeejun(item) {
				return item.orderFee / item.quantity
			},
			getParams() {
				// 取到路由带过来的参数
				let routerParams = this.$route.query.orderNo;
				// 将数据放在当前组件的数据内
				this.orderNo = routerParams;
			},
			getOrder() {
				this.$axios({
					method: 'get',
					url: '/refund/' + this.$route.query.refundOrderNo,
				}).then((res) => {
					this.refundOrderdetail = res;
				});
				this.$axios({
					method: 'get',
					url: '/order/' + this.orderNo,
				}).then((res) => {
					this.orderdetail = res;
					this.spinShow = false;
				});
			},
		},
		mounted() {
			this.getParams();
			this.getOrder();
			this.getStatusEnum();
		},
	}
</script>

<style scoped="scoped" lang="scss">
	.newcenterbody {
		padding: 0px;
	}
	
	.newcenterbody h2 {
		font-weight: 400;
		font-size: 24px;
		color: #666666;
	}
	
	.orderdetailnum {
		margin: 0 4px;
		margin-top: 40px;
		font-weight: 400;
		font-size: 18px;
		color: #000000;
		padding-bottom: 35px;
		border-bottom: 1px solid #cccccc;
	}
	
	.orderdetailnum span {
		float: right;
		font-weight: 400;
		font-size: 18px;
		color: #666666;
		text-align: right;
	}
	
	.orderdetailnum em {
		font-weight: 400;
		font-size: 18px;
		color: #ff0000;
	}
	
	.orderteail {
		margin: 0px 4px;
	}
	
	.orderteail img {
		height: 90px;
		width: 90px;
	}
	
	.orderdetailText {
		float: right;
		width: 750px;
	}
	
	.orderdetailText span {
		margin-top: 30px;
		width: 50%;
		text-align: left;
		font-weight: 400;
		font-size: 14px;
		color: #000000;
		height: 40px;
		overflow: hidden;
	}
	
	.newcenterbody ul {
		padding: 15px 0px;
	}
	
	.newcenterbody .orderteail {
		padding-top: 15px;
	}
	
	.orderdetailsend {
		margin: 15px 4px 0px;
		padding: 40px 0px 40px;
		border-bottom: 1px solid #cccccc;
		border-top: 1px solid #cccccc;
	}
	
	.h5 {
		font-weight: 400;
		font-size: 18px;
		color: #000000;
		height: 30px;
		line-height: 30px;
		margin-bottom: 12px;
	}
	
	.p {
		font-weight: 400;
		font-size: 14px;
		color: #666666;
		line-height: 30px;
	}
	
	.orderdetail {
		margin: 15px 4px 0px;
		padding: 25px 0px 40px;
		border-bottom: 1px solid #cccccc;
	}
	
	.orderdetailfapiao {
		margin: 15px 4px 0px;
		padding: 25px 0px 40px;
		border-bottom: 1px solid #cccccc;
	}
	
	.orderdetailtotal {
		padding: 30px 4px 0px;
		border-top: 1px solid #cccccc;
	}
	
	.orderdetailtotal div {
		float: left;
		font-weight: 400;
		font-size: 14px;
		text-align: left;
		line-height: 30px;
		padding-bottom: 25px;
	}
	
	.orderdetailtotal:nth-last-of-type(1) div {
		padding-bottom: 80px;
	}
	
	.orderdetailtotalAttr {
		width: 75px;
	}
	
	.orderdetailtotalValue {
		width: 300px;
	}
	
	.orderdetailtotal p {
		margin-bottom: 0px;
		color: #333333;
		line-height: 23px;
	}
	
	.orderdetailtotal p:hover {
		color: #333333;
	}
</style>