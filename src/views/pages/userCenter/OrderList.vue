<template>
<div class="padding40">
                    <h3 class="myorder">我的订单
						<div class="myorderspan" >
							<span  @click="changeStatus('00')" :class="{red:'00' == numactive}" >全部订单</span>
							<span @click="changeStatus('01')" :class="{red:'01' == numactive}">待付款</span>
							<span @click="changeStatus('02')" :class="{red:'02' == numactive}">已付款</span>
							<span @click="changeStatus('05')" :class="{red:'05' == numactive}">待发货</span>
							<span @click="changeStatus('06')" :class="{red:'06' == numactive}">已发货</span>
							<span @click="changeStatus('07')" :class="{red:'07' == numactive}">已签收</span>
							<span @click="changeStatus('04')" :class="{red:'04' == numactive}">已取消</span>
						</div>
					</h3>
                    <ul class="ul" v-if="pro.length>0">
                        <li v-for="(x,index) in pro" :key="index" >
							<h3 class="red"> {{statusfilter(x.order.orderStatus)}}</h3>
								<div class="myorderinformation clearfix">
									<span class="myorderOrder clearfix">{{x.order.createTime | formatDate('yyyy-MM-dd hh:mm:ss')}} 丨 {{x.orderAddress.receiverMobile }} 丨{{x.order.orderNo}} 
										<span class="span">订单金额: ￥<strong>{{x.order.orderTotalFee | pricefilter}}</strong></span></span>	
								</div>	
								<div class="myorderImg clearfix">
									<ul>
										<li v-for="(child,i) in x.orderItems" :key="i">
											<img :src="child.productItemImg | imgfilter" alt=""> 
											<div><span>{{child.productTitle}}   {{child.productAttrs}}</span>
											<div>￥{{unitprice(child.orderFee, child.quantity)| pricefilter}} x {{child.quantity}}
												<span  v-if="x.order.orderStatus=='07'&&!child.pinglun" class="color-red pingjia" @click="showevaluation(child,x.order.orderNo)" >去评价</span>
											</div>
											</div>
										</li>
									</ul>
									<div class="myorderp">
										<router-link :to="{name:'/order/detail',query:{orderNo:x.order.orderNo}}">订单详情	</router-link>
										<button  @click="cancel(x.order.orderNo)"  v-if="x.order.orderStatus=='01'||x.order.orderStatus=='02'||x.order.orderStatus=='05'">取消订单</button>
											<button  @click="showrefund(x.orderItems,x.order.orderNo)" v-if="x.canRefund==true">售后服务</button>
											<button  class="btn-red" @click="qianshou(x.order.orderNo)" v-if="x.order.orderStatus=='06'">确认收货</button>
											<button  class="btn-red" @click="paynow(x.order.orderNo)" v-if="x.order.orderStatus=='01'">立即支付</button>
									</div>
								</div>
						</li>
                    </ul>
                	<div class="myorderempty "  v-else >
                		<i class="cartIcon iconIcon-order"></i>
						<div><h6>您还没有下过订单哦~</h6>
							<router-link  to="/sort" >购物建议</router-link>
							<router-link class="red" :to="{ path: '/sort',query:{keyword:''} }" >去下单</router-link>
							</div>
					</div>
                	<Spin size="large" fix v-if="spinShow"></Spin>
			<Modal v-model="refundModal" class="refundModal" width="600" :mask-closable="false">
			<p slot="header">
				<!--<Icon type="ios-information-circle"></Icon>-->
				<span class="tuihuo">申请售后</span>
			</p>
			<div>
				<div class="refundname clearfix">
					<p>售后商品:</p>
					<ul>
						<li class="clearfix" v-for="(child,i) in refunditem" :key="i">
							<img class="refundImg" :src="child.productItemImg | imgfilter" alt="">
							<div class="refundText">
								<p class="p">{{child.productTitle}} </p>
								<p class="p">{{child.productAttrs}}</p>
							</div>
						</li>
					</ul>
				</div>
				<Form :model="refundForm" ref="refundForm" class="refundForm" :label-width="70">
					<FormItem label="服务类型:">
						<span  >退款退货</span>
					</FormItem>
					<FormItem label="售后原因:">
						<Select v-model="refundForm.refundCauseId" class='select' @on-change='img_must'>
							<Option v-for="item in reasonList" :value="item.causeId" :key="item.causeId"> {{ item.content }}</Option>
						</Select>
					</FormItem>
					<FormItem label="退款说明:">
							<i-input v-model="refundForm.refundreason" class="refundFormPro" placeholder=""  type="textarea"></i-input>
					</FormItem>
					<FormItem label="上传图片:">
						<div class="user-con-wrap ">
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
							<Upload ref="upload" :show-upload-list="false" :default-file-list="defaultList" :on-success="handleSuccess" 
								:format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError" 
								:on-exceeded-size="handleMaxSize" 
								:before-upload="handleBeforeUpload" 
								multiple type="drag" :action="uploadUrl" 
								style="display: inline-block;width:78px;">
								<div style="width: 78px;height:78px;line-height: 78px;">
									<Icon type="ios-camera" size="20"></Icon>
								</div>
							</Upload>
						</div>
					</FormItem>
					<FormItem label="上传视频:">
								<Upload ref="video"  :action="uploadUrl" :on-success="videoSuccess"  :on-format-error="videohandleFormatError"  style="display: inline-block;width:78px;">
									<Icon type="ios-camera" size="20"></Icon>
								</Upload>
					</FormItem>
					
				</Form>
			</div>
			<div slot="footer">
				<Button type="primary" size="large" long @click="refund">提交</Button>
			</div>
		</Modal>
		
			<Modal title="查看大图" v-model="visible" class="imglarger">
							<img :src="imgName | imgfilter" v-if="visible" style="width: 100%">
						</Modal>
		
		<!--评价-->
			<Modal v-model="evaluationModal" width="660" class="evaluationModal" :mask-closable="false">
			<p slot="header" style="">
				<Icon type="ios-information-circle"></Icon>
				<span>商品评价</span>
			</p>
			<div class="evaluation"  >
				<div class="refund clearfix">
					<p>商品名称</p>
					<div class="refundImg"  >
						<img :src="evaItem.productItemImg | imgfilter" alt="">
						<div class="evaluationText">
							<p class="p">{{evaItem.productTitle}}</p>
							<p class="p">{{evaItem.productAttrs}}</p>
						</div>
					</div>
				</div>
				<div class="refund ">
					<p>商品评价</p>
					<i-input class="evaluationreason" v-model="evaluationreason" type="textarea"></i-input>
				</div>
				<div class="refund">
					<p>上传图片</p>
					<div>
						<div class="demo-upload-list" v-for="item in evauploadList">
							<template v-if="item.status === 'finished'">
								<img :src="item.url  | imgfilter">
								<div class="demo-upload-list-cover">
									<Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
									<Icon type="ios-trash-outline" @click.native="evahandleRemove(item)"></Icon>
								</div>
							</template>
							<template v-else>
								<Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
							</template>
						</div>
						<Upload ref="evaupload" :show-upload-list="false" 
							:default-file-list="evaluationList" 
							:on-success="evauploadhandleSuccess" :format="['jpg','jpeg','png']" 
							:max-size="2048" :on-format-error="handleFormatError" 
							:on-exceeded-size="handleMaxSize" 
							:before-upload="evahandleBeforeUpload" multiple type="drag" :action="uploadUrl" style="display: inline-block;width:78px;">
							<div style="width: 78px;height:78px;line-height: 78px;">
								<Icon type="ios-camera" size="20"></Icon>
							</div>
						</Upload>
					</div>
				</div>
			</div>
			<div slot="footer">
				<Button type="primary"  long @click="evaluation">提交</Button>
			</div>
		</Modal>
       </div>
                
	
</template>

<script>
	export default {
		data() {
			return {
				numactive:'00',
				orderStatus:'00',
				imgmust: 'N',
				reasonModel: '',
				evaluationModal:false,
				evaluationorder:'',
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
				//评论图片
				evauploadList:[],
				evaImgs:[],
				//商品评价
				evaluationModal:false,
				evaluationreason:'',
				evaluationList:[],
				refundForm:{
					refundCauseId:'',
					refundImgs:'',
					remarks:'',
					refundVideo:''
				},
				refunditem:[],
				evaItem:{},//评论弹窗
				evaItemId:'',
				evaProId:'',
			}
		},
		methods: {
			//去支付
			paynow(value){
    		this.$router.push({name:'/cartthree',query:{orderNo: value}});
    	},
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
			evahandleRemove(file) {
				const fileList = this.$refs.eva.fileList;
				this.$refs.eva.fileList.splice(fileList.indexOf(file), 1);
			},
			videoSuccess(res, file) {
				if(res.code == '200') {
					file.url = res.msg;
					this.refundForm.refundVideo=res.msg
				}
			},
			handleSuccess(res, file) {
				if(res.code == '200') {
					file.url = res.msg;
					file.name = res.msg;
					
				}
			},
			evauploadhandleSuccess(res, file){
					if(res.code == '200') {
					file.url = res.msg;
					file.name = res.msg;
					console.log(this.uploadList)
				}
			},
			handleFormatError(file) {
				this.$Notice.warning({
					title: '文件格式不正确',
					desc: '文件格式不正确,请选择 jpg 或 png.'
				});
			},
			videohandleFormatError(file) {
				this.$Notice.warning({
					title: '文件格式不正确',
					desc: '文件格式不正确,请选择 mp4 或 avi 或flv.'
				});
			},
			handleMaxSize(file) {
				this.$Notice.warning({
					title: '文件大小超过限制',
					desc: '上传文件 太大，不超过2M.'
				});
			},
			handleBeforeUpload() {
				let check = this.uploadList.length < 5;
				
				if(!check) {
					this.$Notice.warning({
						title: '最多可上传5张图片.'
					});
				}
				return check;
			},
evahandleBeforeUpload(){
	let checkeva = this.evauploadList.length < 5;
			if(!checkeva) {
					this.$Notice.warning({
						title: '最多可上传5张图片.'
					});
				}
				return checkeva;
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
			showrefund(item,value) {
				this.refunditem=item;
				this.refundModal = true;
				this.refundorder = value;
			},
			//显示评论
			showevaluation(item,value){
				this.evaItem=item;
				this.evaItemId=item.orderItemsId;
				this.evaProId=item.productItemId;
				this.evaluationModal = true;
				this.evaluationorder = value;
			},
	
			refund() {
				if(this.imgmust == 'Y' && this.uploadList.length == 0) {
					this.$Message.warning('请上传退货凭证');
					return;
				} else {
					this.uploadList.forEach((item, index) => {
						this.uploadImgs[index] = item.url+','
					})
					//将提交的图片数组转成字符串
					var imgs="";
					this.uploadImgs.forEach((item, index) => {
						imgs += item
					})
						imgs = (imgs.slice(imgs.length - 1) == ',') ? imgs.slice(0, -1) : imgs;
					let _this = this;
					this.$axios({
						method: 'post',
						url: `/refund/create`,
						data: {
							orderNo: _this.refundorder,
							refundCauseId: _this.refundForm.refundCauseId,
							refundImgs:imgs,
							remarks: _this.refundForm.refundreason,
							refundVideo:_this.refundForm.refundVideo
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
			//提交评价
	       evaluation() {
	       		  let isimgs=0;
	       		  if(this.evauploadList.length>0){
	       		  	isimgs=1
	       		  }else{
	       		  	isimgs=0;
	       		  }
					this.evauploadList.forEach((item, index) => {
						this.evaImgs[index] = item.url+','
					})
					//将提交的图片数组转成字符串
					var imgs="";
					this.evaImgs.forEach((item, index) => {
						imgs += item
					})
						imgs = (imgs.slice(imgs.length - 1) == ',') ? imgs.slice(0, -1) : imgs;
					let _this = this;
					this.$axios({
						method: 'post',
						url: `/comment/create`,
						data: {
							commentContent: _this.evaluationreason,
							commentPics:imgs,
							orderItemsId: _this.evaItemId,
							productId: _this.evaProId,
							isImg:isimgs
						}
					}).then((res) => {
						if(res.code == '200') {
							this.$Message.info(res.msg);
							this.evaluationModal = false;
							this.getOrder();
						} else {
							this.$Message.error(res.msg);
							this.evaluationModal = false;
							this.getOrder();
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
			maopao(item){
				 for(let j=0;j<item.commentList.length;j++){
							 	for(let n=0;n<item.orderItems.length;n++){
							 		if(item.commentList[j].orderItemsId==item.orderItems[n].orderItemsId){
							 		    item.orderItems[n].pinglun=item.commentList[j].canComment
							 		}
							 	}
							 }
			},
			getOrder() {
				let status='',url='';
				if(this.orderStatus!='00'){
					status=this.orderStatus;
					url=`/order/list?orderStatus=${status}`
				}else{
					url='/order/list'
				}
				this.$axios({
					method: 'get',
					url: url,
				}).then((res) => {
					if(res.code == '200') {
						this.cartList = res.object;
						for(let i=0;i<this.cartList.length;i++){
							this.maopao(this.cartList[i])
						}
						
						var ssss = this.cartList;
						this.pro = ssss;
					}else{
						this.cartList=[];
						this.pro = [];
					}
					this.spinShow = false;
				});

			},
		},
		mounted() {
			this.getOrder();
			this.getStatusEnum();
			this.uploadList = this.$refs.upload.fileList;
			this.evauploadList=this.$refs.evaupload.fileList;
		}
	}
</script>

<style scoped="scoped" lang="scss">
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
	.evaluationModal .evaluation{
		margin-top: 17px;
	}
	.evaluationModal .refund{
		width: 500px;
		margin: 0 auto;
	}
	.refund p{
		float: left;
		width: 100px;

	}
	.refund .refundImg{
		width: 400px;
	}
	.refundname p{
		float: left;
		width: 60px;
		font-weight: 400;
		font-size: 14px;
		color: #666666;
		text-align: right;
	}
	.refundname{
		margin-bottom: 20px;
	}
	.refundname ul{
		float: left;
		width: 400px;
	}
	.refundname ul li{
		margin-bottom: 20px;
	}
	.refundname .refundImg{
		width: 65px;
	}
	.refundText{
		width: 335px;
		float: right;
		margin-top: 10px;
	}
	.refundText .p{
		width: 100%;
		text-align: left;
		height: 20px;
		font-weight: 400;
		font-size: 14px;
		color: #666666;
		line-height: 20px;
		overflow: hidden;
	}
	.refundModal .tuihuo{
		font-weight: 400;
		font-size: 18px;
		text-align: left;
		color: #333333;
		padding-left:27px; 
	}
	.evaluationModal .refundImg img{
		width: 64px;
		height: 64px;
	}
	.refund p{
		height: 45px;
		line-height: 45px;
	
	}
	.refund{
		margin-bottom: 20px;
	}
	.refund .select{
		width: 300px;
		border-radius: 0px;
		height: 45px;
		line-height: 45px;
	}
	.refundFormPro{
		height: 125px;
	}
	.evaluation .evaluationText{
		margin-top: 10px;
		float: right;
		width: 320px;
		margin-bottom: 40px;
	}
	.evaluationText .p{
		width: 320px;
		height: 20px;
		line-height: 20px;
		overflow: hidden;
	}
	.evaluation .refundImg{
		width: 500px;
	}
	.evaluationreason{
		width: 400px;
		height: 125px;
		line-height: 125px;
		margin-bottom: 20px;
	}
	.evaluation{
		margin-bottom: 50px;
	}
	.pingjia{
		cursor: pointer;
		margin-left:20px;
	}
</style>
<style>
	.imglarger .ivu-modal-wrap {
		z-index: 1001;
	}
	.evaluationModal .ivu-modal-content{
		background-color: #f0f0f0;
		border-radius: 0px;
	}
	.refundModal .ivu-modal-body{
		margin: 0 auto;
		width: 500px;
	}
	.refundForm .ivu-select-single .ivu-select-selection{
		height: 45px;
		line-height: 45px;
		border-radius: 0px;
	}
	.refundForm .ivu-select-single .ivu-select-selection .ivu-select-placeholder, .refundForm  .ivu-select-single .ivu-select-selection .ivu-select-selected-value{
		height: 45px;
		line-height: 45px;	
	}
	.refundFormPro .ivu-input{
		height: 125px;
	}
	.evaluationreason .ivu-input{
		height: 125px;
	}
	.refundModal .ivu-modal-footer{
		border-top: none;
		padding-bottom: 50px;
		text-align:center;
	}
	.evaluationModal .demo-upload-list:nth-of-type(4n+1){
		margin-left: 100px;
	}
		.evaluationModal .demo-upload-list:nth-of-type(1){
		margin-left: 0px;
	}
	.refundModal .ivu-btn-primary{
		font-weight: 400;
		font-size: 18px;
		color: #FFFFFF;
		background-color: #f2191a;
		width: 254px;
		height: 41px;
		line-height: 41px;
		padding: 0px;
	}
	.evaluationModal .ivu-modal-footer{
		border-top: none;
		padding-bottom: 50px;
		text-align:center;
		background-color: #FFFFFF;
	}
	.evaluationModal .ivu-btn-primary{
		font-weight: 400;
		font-size: 18px;
		color: #FFFFFF;
		background-color: #f2191a;
		width: 254px;
		height: 41px;
		line-height: 41px;
		padding: 0px;
	}
	.evaluationModal .ivu-modal-body {
		background-color: #FFFFFF;		
	}
</style>