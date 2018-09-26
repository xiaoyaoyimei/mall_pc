<template>
	<div class="padding40">
		<h3 class="myorder" style="padding-bottom: 48px;">售后服务
					</h3>
		<ul class="ul">
			<li class="" v-for="(x,index) in refundList" :key="index">
				<h3 class="red">{{statusrufundfilter(x.refundOrder.refundOrderStatus)}}</h3>
				<div class="myorderinformation clearfix">
					<span class="myorderOrder clearfix">
						{{x.refundOrder.createTime | formatDate}} 丨{{x.refundOrder.refundOrderNo}}丨{{reasonfilter(x.refundOrder.refundCauseId)}}  <span class="span">退款金额: ￥<strong>{{x.refundOrder.refundOrderTotalFee|pricefilter}}</strong></span></span>
				</div>
				<div class="myorderImg clearfix">
					<ul>
						<li v-for="(child,i) in x.refundOrderItems" :key="i">
							<img :src="child.productItemImg | imgfilter" alt=""> <span>{{child.productTitle}}   {{child.productAttrs}} </span>
							<span>{{child.refundOrderFee}} x{{child.quantity}}  </span>
						</li>
					</ul>
					<div class="myorderp">
						<router-link :to="{name:'/order/detail',query:{orderNo:x.refundOrder.orderNo}}">订单详情 </router-link>
						<button class="btn btn-dx" v-if="x.refundOrder.refundOrderStatus=='01'" @click="cancelrefund(x.refundOrder.refundOrderNo)">取消</button>
						<button class="btn btn-dx" v-if="x.refundOrder.refundOrderStatus=='02'||x.refundOrder.refundOrderStatus=='05'"   @click="show(x.refundOrder.refundOrderNo)">显示处理结果</button>
						<button class="btn btn-dx" v-if="x.refundOrder.refundOrderStatus=='02'" @click="showLogisticsInfo(x.refundOrder.refundOrderNo)">填写物流单号</button>
					</div>
				</div>

			</li>
		</ul>
	
						<Modal v-model="infoModal" width="500" :mask-closable="false">
			<p slot="header" style="color:#f60;text-align:center">
				<Icon type="ios-information-circle"></Icon>
				<span>填写物流单号</span>
			</p>
			<div>
				<div class="refund">
					<p>退款退货订单号</p><span>{{rfOrderNumer}}</span></div>
					<div class="refund">
					<p>物流公司</p><input placeholder="物流公司" v-model="logistics"></div>
				<div class="refund">
					<p>物流单号</p><input placeholder="物流单号" v-model="expressNo">
				</div>
				
			</div>
			<div slot="footer">
				<Button type="primary" size="large" long @click="submitLogisticsInfo">提交</Button>
			</div>
		</Modal>
				<Modal v-model="dealModal" width="500" :mask-closable="false">
			<p slot="header" style="color:#f60;text-align:center">
				<Icon type="ios-information-circle"></Icon>
				<span>审核结果</span>
			</p>
			<div>
				<div class="refund">
					<p>退款金额</p><span>{{refundAmount}}</span></div>
					<div class="refund">
					<p>退款说明</p><textarea>{{dealremark}}</textarea></div>
				
			</div>
			<div slot="footer">
				<Button type="primary" size="large" long @click="submitLogisticsInfo">提交</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import { formatDate } from '@/assets/js/date.js'
	export default {
		data() {
			return {
				dealModal:false,
				infoModal: false,
				refundenums: [],
				refundList: [],
				reasonList:[],
				rfOrderNumer: '',
				expressNo: '',
				logistics: '',
				refundAmount:0,
				dealremark:''
			}
		},
		filters: {
			formatDate(time) {
				var date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
			}
		},
		methods: {
			cancelrefund(value) {
				this.$Modal.confirm({
					content: '<p>确定取消该售后订单？</p>',
					onOk: () => {
						this.$axios({
							method: 'post',
							url: '/refund/cancel?refundOrderNo=' + value,
						}).then((res) => {
							if(res.code == '200') {
								this.$Message.info(res.msg);
								this.getRefundOrder();
							} else {
								this.$Message.info(res.msg);
								this.getRefundOrder();
							}
						});
					},
					onCancel: () => {
						this.$Message.info('放弃取消');
					}
				});
			},
			show(v){
				this.dealModal = true
			},
			showLogisticsInfo(value) {
				this.infoModal = true;
					this.rfOrderNumer = value;
			},
			//提交物流信息
			submitLogisticsInfo() {
				var _this = this;
				_this.$axios({
					method: 'post',
					url: `/refund/submitLogisticsInfo?refundOrderNo=${_this.rfOrderNumer}&expressNo=${_this.expressNo}&logistics=${_this.logistics}`,
				}).then((res) => {
					if(res.code == '200') {
						_this.$Message.info(res.msg);
						_this.infoModal = false;
						_this.getOrder();
					} else {
						_this.$Message.error(res.msg);
						_this.infoModal = false;
						_this.getOrder();
					}
				});
			},
			statusrufundfilter(value) {
				for(var i = 0; i < this.refundenums.length; i++) {
					if(this.refundenums[i].key == value) {
						return this.refundenums[i].value;
					}
				}
			},
					reasonfilter(value) {
				for(var i = 0; i < this.reasonList.length; i++) {
					if(this.reasonList[i].causeId == value) {
						return this.reasonList[i].content;
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
				this.$axios({
					method: 'get',
					url: '/refund/getRefundCauseList',
				}).then((res) => {
					this.reasonList = res;
				});
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

</style>