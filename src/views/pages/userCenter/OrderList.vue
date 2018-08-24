<template>

	<div class="mb30">
		<Tabs value="name1">
			<TabPane label="全部订单" name="name1">
				<table class="order-tb">
					<thead>
						<tr>
							<th width='100'>主图</th>
							<th>商品</th>
							<th width='100'>单价</th>
							<th width='50'>数量</th>
							<th width='100'>总价</th>
							<th width='100'>状态</th>
							<th width='150'>操作</th>
						</tr>
					</thead>
				</table>
				<table class="order-tb orderitem-tb" v-for="(x,index) in pro" :key="index" v-if="pro.length>0">
					<tbody>
						<tr class="toptitle">
							<td colspan="7">
								<span>订单号：{{x.order.orderNo}}</span>
								<span class="date">{{x.order.createTime | formatDate}}</span>
								<span class="right"> {{statusfilter(x.order.orderStatus)}}</span>
							</td>
						</tr>
						<tr v-for="(child,i) in x.orderItems" :key="i">
							<td class="goods_pic" width='100'>
								<a href="javascript:void(0)"><img :src="child.productItemImg | imgfilter" alt=""></a>
							</td>
							<td>
								<div class="goods_title">
									<p>{{child.productTitle}}</p>
									<p>{{child.productAttrs}}</p>
								</div>
							</td>
							<td width='100'>￥{{unitprice(child.orderFee,child.quantity) | pricefilter}}</td>
							<td width='50'> {{child.quantity}}</td>
							<td width='100'> ￥{{child.orderFee| pricefilter}}</td>
							<td width='100'>
								<router-link :to="{name:'/order/detail',query:{orderNo:x.order.orderNo}}">订单详情</router-link>
							</td>
							<td width='200'>
								<div class="cz">
									<button class="btn" @click="cancel(x.order.orderNo)" v-if="x.order.orderStatus=='01'||x.order.orderStatus=='02'||x.order.orderStatus=='05'">取消订单</button>
									<button class="btn btn-dx" @click="quzhifu(x.order.orderNo)" v-if="x.order.orderStatus=='01'">去支付</button>
									<button class="btn btn-dx" @click="qianshou(x.order.orderNo)" v-if="x.order.orderStatus=='06'">签收订单</button>
									<button class="btn btn-dx" @click="showrefund(x.order.orderNo)" v-if="x.canRefund==true">退款退货</button>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
				<div class="flex-center" v-else>
					<img src="../../../assets/img/order_empty.png">
					<p>没有订单哦,
						<router-link :to="{path: '/index'}">去首页看看</router-link>
					</p>
				</div>
			</TabPane>
			<TabPane label="售后订单" name="name2">
				<table class="order-tb">
					<thead>
						<tr>
							<th width='100'>主图</th>
							<th>商品</th>
							<th width='100'>单价</th>
							<th width='50'>数量</th>
							<th width='100'>总价</th>
							<th width='100'>状态</th>
							<th width='150'>操作</th>
						</tr>
					</thead>
				</table>
				<table class="order-tb orderitem-tb" v-for="(x,index) in refundList" :key="index" v-if="refundList.length>0">
					<tbody>
						<tr class="toptitle">
							<td colspan="7">
								<span>退款退货订单号：{{x.refundOrder.refundOrderNo}}</span>
								<span class="date">申请时间:{{x.refundOrder.createTime | formatDate}}</span>
								<span class="right"> </span>
							</td>
						</tr>
						<tr v-for="(child,i) in x.refundOrderItems" :key="i">
							<td class="goods_pic" width='100'>
								<a href="javascript:void(0)"><img :src="child.productItemImg | imgfilter" alt=""></a>
							</td>
							<td>
								<div class="goods_title">
									<p>{{child.productTitle}}</p>
									<p>{{child.productAttrs}}</p>
								</div>

							</td>
							<td width='100'>￥{{unitprice(child.refundOrderFee,child.quantity) | pricefilter}}</td>
							<td width='50'> {{child.quantity}}</td>
							<td width='100'> ￥{{child.refundOrderFee| pricefilter}}</td>
							<td width='150'>
								<span class="color-blue">{{statusrufundfilter(x.refundOrder.refundOrderStatus)}}</span>
							</td>
							<td width='200'>
								<button class="btn btn-dx" v-if="x.refundOrder.refundOrderStatus=='02'" @click="showLogisticsInfo(x.refundOrder.refundOrderNo)">填写物流单号</button>
							</td>
						</tr>
					</tbody>
				</table>
			</TabPane>
		</Tabs>
		<Spin size="large" fix v-if="spinShow"></Spin>
		<!--退货-->
		<Modal v-model="refundModal" width="600" :mask-closable="false">
			<p slot="header" style="color:#f60;text-align:center">
				<Icon type="ios-information-circle"></Icon>
				<span>申请退货</span>
			</p>
			<div>

				<div class="refund">
					<p>退货原因</p>
					<Select v-model="reasonModel" style="width:200px" @on-change='img_must'>
						<Option v-for="item in reasonList" :value="item.causeId" :key="item.causeId"> {{ item.content }}</Option>
					</Select>
				</div>
				<div class="refund">
					<p>上传退货凭证</p>
					<div>
						<div class="demo-upload-list" v-for="item in uploadList">
							<template v-if="item.status === 'finished'">
								<img :src="item.url  | imgfilter">
								<div class="demo-upload-list-cover">
									<Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
									<Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
								</div>
							</template>
							<template v-else>
								<Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
							</template>
						</div>
						<Upload ref="upload" :show-upload-list="false" :default-file-list="defaultList" :on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" multiple type="drag" :action="uploadUrl" style="display: inline-block;width:78px;">
							<div style="width: 78px;height:78px;line-height: 78px;">
								<Icon type="ios-camera" size="20"></Icon>
							</div>
						</Upload>
						<Modal title="查看大图" v-model="visible" class="imglarger">
							<img :src="imgName | imgfilter" v-if="visible" style="width: 100%">
						</Modal>
					</div>
				</div>
				<div class="refund">
					<p>退款说明</p><textarea v-model="refundreason"></textarea></div>
			</div>
			<div slot="footer">
				<Button type="primary" size="large" long @click="refund">提交</Button>
			</div>
		</Modal>
		<!--		填写物流单号-->
		<Modal v-model="infoModal" width="500" :mask-closable="false">
			<p slot="header" style="color:#f60;text-align:center">
				<Icon type="ios-information-circle"></Icon>
				<span>填写物流单号</span>
			</p>
			<div>
				<div class="refund">
					<p>退款退货订单号</p><span>{{rfOrderNumer}}</span></div>
				<div class="refund">
					<p>物流单号</p><input placeholder="物流单号" v-model="expressNo">
				</div>
				<div class="refund">
					<p>物流公司</p><input placeholder="物流公司" v-model="logistics"></div>
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
				imgmust: 'N',
				reasonModel: '',
				infoModal: false,
				refundreason: '',
				refundModal: false,
				refundenums: [],
				spinShow: true,
				refundList: [],
				cartList: [],
				statusList: [],
				pro: [],
				refundorder: '',
				refundOderTypeEnums: [],
				reasonList: [],
				defaultList: [],
				imgName: '',
				visible: false,
				uploadList: [],
				uploadUrl: this.$axios.defaults.baseURL + '/upload/upload?path=account',
				uploadImgs: [],
				rfOrderNumer: '',
				expressNo: '',
				logistics: '',
			}
		},
		filters: {
			formatDate(time) {
				var date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
			}
		},
		methods: {
			img_must(v) {
				for(var i = 0; i < this.reasonList.length; i++) {
					if(this.reasonList[i].causeId == v) {

						this.imgmust = this.reasonList[i].isImg;
					}
				}
			},
			handleView(name) {
				this.imgName = name;
				this.visible = true;
			},
			handleRemove(file) {
				const fileList = this.$refs.upload.fileList;
				this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
			},
			handleSuccess(res, file) {
				if(res.code == '200') {
					file.url = res.msg;
					file.name = res.msg;
				}
			},
			handleFormatError(file) {
				this.$Notice.warning({
					title: '文件格式不正确',
					desc: '文件格式不正确,请选择 jpg 或 png.'
				});
			},
			handleMaxSize(file) {
				this.$Notice.warning({
					title: '文件大小超过限制',
					desc: '上传文件 太大，不超过2M.'
				});
			},
			handleBeforeUpload() {
				const check = this.uploadList.length < 9;
				if(!check) {
					this.$Notice.warning({
						title: '最多可上传9张图片.'
					});
				}
				return check;
			},

			//切换refund
			unitprice(p, q) {
				return p / q;
			},
			quzhifu(value) {
				this.$router.push({
					name: '/cartthree',
					query: {
						orderNo: value
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
			statusrufundfilter(value) {
				for(var i = 0; i < this.refundenums.length; i++) {
					if(this.refundenums[i].key == value) {
						return this.refundenums[i].value;
					}
				}
			},
			seeDetail(value) {
				this.$router.push({
					name: '/order/detail',
					params: {
						orderNo: value
					}
				});
			},
			showrefund(value) {
				this.refundModal = true
				this.refundorder = value;
			},
			showLogisticsInfo(value) {
				this.infoModal = true,
					this.rfOrderNumer = value;
			},
			refund() {
				if(this.imgmust == 'Y' && this.uploadList.length == 0) {
					this.$Message.warning('请上传退货凭证');
					return;
				} else {
					this.uploadList.forEach((item, index) => {
						this.uploadImgs[index] = item.url
					})
					let _this = this;
					this.$axios({
						method: 'post',
						url: `/refund/creare`,
						data: {
							orderNo: _this.refundorder,
							refundCauseId: _this.reasonModel,
							refundImgs: _this.uploadImgs,
							remarks: _this.refundreason,
						}
					}).then((res) => {
						if(res.code == '200') {
							this.$Message.info(res.object);
							this.refundModal = false;
							this.getOrder();
						} else {
							this.$Message.error(res.msg);
							this.refundModal = false;
							this.getOrder();
						}
					});

				}

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
			getStatusEnum() {
				this.$axios({
					method: 'get',
					url: '/order/enums',
				}).then((res) => {
					if(res.code == '200') {
						this.statusList = res.object;
					}
				});
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

			cancel(value) {
				this.$Modal.confirm({
					content: '<p>确定取消该订单？</p>',
					onOk: () => {
						this.$axios({
							method: 'post',
							url: '/order/cancel/' + value,
						}).then((res) => {
							if(res.code == '200') {
								this.$Message.info(res.msg);
								this.getOrder();
							} else {
								this.$Message.info(res.msg);
								this.getOrder();
							}
						});
					},
					onCancel: () => {
						this.$Message.info('放弃取消');
					}
				});
			},
			qianshou(value) {
				this.$Modal.confirm({
					content: '<p>确定签收该订单？</p>',
					onOk: () => {
						this.$axios({
							method: 'post',
							url: '/order/receive/' + value,
						}).then((res) => {
							if(res.code == '200') {
								this.$Message.info(res.msg);
								this.getOrder();
							} else {
								this.$Message.info(res.msg);

							}
						});
					},
					onCancel: () => {
						this.$Message.info('放弃签收');
					}
				});
			},
			getOrder() {
				this.$axios({
					method: 'get',
					url: '/order/list',
				}).then((res) => {
					if(res.code == '200') {
						this.cartList = res.object;
						var ssss = this.cartList;
						this.pro = ssss;
					}
					this.spinShow = false;
				});
				this.$axios({
					method: 'get',
					url: '/refund/getRefundOrderList',
				}).then((res) => {
					this.refundList = res;
				});

			},
		},
		mounted() {
			this.getOrder();
			this.getStatusEnum();
			this.uploadList = this.$refs.upload.fileList;
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.order-tb {
		width: 100%;
	}
	
	.goods_title {
		float: left;
		width: 300px;
		text-align: left;
	}
	
	.date {
		margin-left: 10px;
	}
	
	.right {
		float: right;
	}
	
	.orderitem-tb {
		margin-top: 20px;
	}
	
	.orderitem-tb .toptitle {
		background: #efefef;
	}
	
	.toptitle td {
		text-align: left;
	}
	
	.btn {
		background: #fff;
		border: 1px solid #333;
		padding: 2px;
		cursor: pointer;
	}
	
	.btn:hover {
		background: #f3f3f3;
	}
	
	.btn-dx {
		border-color: #0099ff;
		color: #0099ff;
	}
	
	.refund {
		display: flex;
		margin-bottom: 10px;
		p {
			width: 100px;
		}
		textarea {
			min-height: 60px;
		}
		textarea,
		input {
			flex: 1;
			border: 1px solid #ccc;
			text-indent: 5px;
		}
		input {
			min-height: 32px;
		}
	}
	
	.demo-upload-list {
		display: inline-block;
		width: 80px;
		height: 80px;
		text-align: center;
		line-height: 80px;
		border: 1px solid transparent;
		border-radius: 4px;
		overflow: hidden;
		background: #fff;
		position: relative;
		box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
		margin-right: 4px;
	}
	
	.demo-upload-list img {
		width: 100%;
		height: 100%;
	}
	
	.demo-upload-list-cover {
		display: none;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, .6);
	}
	
	.demo-upload-list:hover .demo-upload-list-cover {
		display: block;
	}
	
	.demo-upload-list-cover i {
		color: #fff;
		font-size: 20px;
		cursor: pointer;
		margin: 0 2px;
	}
</style>
<style>
	.imglarger .ivu-modal-wrap {
		z-index: 1001;
	}
</style>