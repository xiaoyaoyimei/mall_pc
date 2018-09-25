<template>
<div >
                    <h3 class="myorder">我的订单
						<div class="myorderspan" >
							<span  :class="{red:'00' == numactive}">全部订单</span>
							<!--<span class="red" v-for="(item,index) in statusList">{{item.value}}</span>-->
							<span @click="changeStatus('01')" :class="{red:'01' == numactive}">待付款</span>
							<span @click="changeStatus('05')" :class="{red:'05' == numactive}">待发货</span>
							<span @click="changeStatus('06')" :class="{red:'06' == numactive}">已发货</span>
							<span @click="changeStatus('04')" :class="{red:'04' == numactive}">已取消</span>
							<span @click="changeStatus('07')" :class="{red:'04' == numactive}">已签收</span>
						</div>
					</h3>
                    <ul class="ul" v-if="pro.length>0">
                        <li v-for="(x,index) in pro" :key="index" >
							<h3 class="red"> {{statusfilter(x.order.orderStatus)}}</h3>
								<div class="myorderinformation clearfix">
									<span class="myorderOrder clearfix">{{x.order.createTime | formatDate}} 丨 {{x.order.orderNo}} <span class="span">订单金额: ￥<strong>{{x.order.orderTotalFee | pricefilter}}</strong></span></span>	
								</div>	
								<div class="myorderImg clearfix">
									<ul>
										<li v-for="(child,i) in x.orderItems" :key="i">
											<img :src="child.productItemImg | imgfilter" alt=""> <span>{{child.productTitle}}   {{child.productAttrs}}</span><span>￥{{child.orderFee | pricefilter}} x {{child.quantity}}</span>
										</li>
									</ul>
									<div class="myorderp">
										<router-link :to="{name:'/order/detail',query:{orderNo:x.order.orderNo}}">订单详情	</router-link>
									<!--	<button>售后服务</button>-->
											<button  @click="showrefund(x.order.orderNo)" v-if="x.canRefund==true">售后服务</button>
											<button  @click="evaluation(x.order.orderNo)" v-if="x.order.orderStatus=='07'">去评价</button>
									</div>
								</div>
						</li>
                    </ul>
                					<div class="myorderempty cartIcon iconIcon-order"  v-else >
						<h6>暂无记录~</h6>
							<router-link  to="/sort" >购物建议</router-link>
							<router-link  to="/sort" >去下单</router-link>
						
					</div>
                	<Spin size="large" fix v-if="spinShow"></Spin>
	
		
			<Modal v-model="refundModal" width="600" :mask-closable="false">
			<p slot="header" style="color:#f60;text-align:center">
				<Icon type="ios-information-circle"></Icon>
				<span>申请退货</span>
			</p>
			<div>
				<div class="refund">
					<p>售后原因</p>
					<Select v-model="reasonModel" style="width:200px" @on-change='img_must'>
						<Option v-for="item in reasonList" :value="item.causeId" :key="item.causeId"> {{ item.content }}</Option>
					</Select>
				</div>
				<div class="refund">
					<p>上传图片</p>
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
		
<!--		
			<Modal v-model="evaluationModal" width="600" :mask-closable="false">
			<p slot="header" style="color:#f60;text-align:center">
				<Icon type="ios-information-circle"></Icon>
				<span>申请退货</span>
			</p>
			<div>
				<div class="refund">
					<p>服务类型</p>
					<Select v-model="reasonModel" style="width:200px" @on-change='img_must'>
						<Option v-for="item in reasonList" :value="item.causeId" :key="item.causeId"> {{ item.content }}</Option>
					</Select>
				</div>
				<div class="refund">
					<p>上传图片</p>
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
		</Modal>-->
       </div>
                
	
</template>

<script>
	import { formatDate } from '@/assets/js/date.js'
	export default {
		data() {
			return {
				numactive:'00',
				orderStatus:'00',
				imgmust: 'N',
				reasonModel: '',
				infoModal: false,
				evaluationModal:false,
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
			changeStatus(v){
				this.numactive=v;
				this.orderStatus=v;
				this.getOrder()
			},
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
				const check = this.uploadList.length < 5;
				if(!check) {
					this.$Notice.warning({
						title: '最多可上传5张图片.'
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
				let status='';
				if(this.orderStatus!='00'){
					status=this.orderStatus;
				}
				this.$axios({
					method: 'get',
					url: `/order/list?orderStatus=${status}`,
				}).then((res) => {
					if(res.code == '200') {
						this.cartList = res.object;
						var ssss = this.cartList;
						this.pro = ssss;
					}else{
						this.cartList=[];
						this.pro = [];
					}
					this.spinShow = false;
				});

			},
			getRefundOrder(){
				this.$axios({
					method: 'get',
					url: '/refund/getRefundOrderList',
				}).then((res) => {
					this.refundList = res;
				});
			}
		},
		mounted() {
			this.getOrder();
			this.getRefundOrder();
			this.getStatusEnum();
			this.uploadList = this.$refs.upload.fileList;
		}
	}
</script>

<style scoped="scoped" lang="scss">
.newcenter h3{
    font-weight: 400;
    font-size: 24px;
    color: #999999;
    width: 100%;
    border-bottom: 1px solid #c6c6c6;
    padding-bottom: 18px;
}
	.newcenterbody{
    float: left;
    width: 940px;
    background-color: #FFFFFF;
    padding: 40px;
    position: relative;
}
.newcenterbody .myorder{
				color: #333333;
				padding-bottom: 0px;
			}
			.myorder .myorderspan{
				margin-top: 35px;
			}
			.myorder .myorderspan span{
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
			.myorder .myorderspan .red, .myorder .myorderspan span:hover{
				color: #FF0000;
			}
			.ul{
				padding: 0px;
			}
			 .ul li{
				padding: 28px 0px;
			}
		 .ul>li{
				border-bottom: 1px solid #c6c6c6;
				padding-bottom: 0px;
			}
			.ul .myorderinformation{
				height: 20px;
				font-weight: 400;
				font-size: 14px;
				color: #666666;
			}
			.ul .myorderOrder{
				float: left;
				width: 100%;
				height: 20px;
				font-weight: 400;
				font-size: 14px;
				color: #666666;
				text-align: left;
				margin: 0px 0px 10px;
			}
			.ul .span{
				float: right;
				background-color: #ffffff;
				color: #666666;
				padding: 0px;
			}
			.ul .span strong{
				font-weight: 400;
				font-style: normal;
				font-size: 30px;
				color: #1E1E1E;
				text-align: right;
			}
			.ul .red{
				border: none;
			}
			.myorderImg ul{
				padding: 0px;
				padding-top: 28px;
			}
			.ul .myorderImg li{
				float: left;
				width: 470px;
				padding-bottom: 0px;
				padding-top: 0px;

			}
			.myorderImg  img{
				display: inline-block;
				height: 60px;
				vertical-align: middle;
			}
			.ul .myorderImg{
				position: relative;
			}
			.ul .myorderImg span{
				float: right;
				width: 390px;
				font-weight: 400;
				height: 20px;
				overflow: hidden;
				font-style: normal;
				font-size: 14px;
				color: #666666;
			}
			.ul .myorderImg span:nth-of-type(2){
				position: relative;
				top: -30px;
			}
			.myorderImg .myorderp{
				/* float: right; */
				position: absolute;
				width: 375px;
				top: 40px;
				right: -10px;

			}
			.myorderImg .myorderp a,.myorderp button{
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
			.myorderImg .myorderp button:nth-last-of-type(n+2):hover{
				background-color: #cccccc;
			}
			.myorderImg .myorderp button:nth-last-of-type(1){
				background-color: #ffffff;
				border: 1px solid #f2191a;
				color: #FF0000;
			}
				.myorderempty{
				width: 400px;
				margin: 140px  auto;
				display: block;
				padding-left: 80px;
			}
			.myorderempty h6{
				font-weight: 700;
				font-style: normal;
				color: #777777;
				font-size: 24px;
				text-align: left;
			}
			.myorderempty a{
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
		 .demo-upload-list{
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
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
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