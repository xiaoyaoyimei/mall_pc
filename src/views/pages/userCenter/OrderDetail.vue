<template>
	<div class="padding40">
                  <h2>订单详情</h2>
                     	<div class="font-14" v-show="orderdetail.shippingOrder.orderStatus=='01'||orderdetail.shippingOrder.orderStatus=='02'">
		 <span v-if='timerShow'>订单将在 <span class="color-red">{{protime}}</span>后 自动关闭，请及时付款~</span>
	     		</div>
                  <div class="orderdetailnum">
                      订单号：{{orderNo}} <span>{{statusfilter(orderdetail.shippingOrder.orderStatus)}}</span>
                  </div>
                  <ul>
                      <li class="clearfix orderteail" v-for="(item,index) in orderdetail.shippingOrderItems" :key="index">
                          <img :src="item.productItemImg | imgfilter" alt="">
                          <div class="orderdetailText">
                                <span>{{orderFeejun(item)|pricefilter}} x {{item.quantity}}</span>
                                <span>{{item.productTitle}}</span>
                          </div>
                      </li>
                  </ul>
                  <div class="orderdetailsend">
                        <div class="h5">收货信息</div>
                        <div class="p">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：  {{orderdetail.shippingAddress.receiverName}}</div>
                        <div class="p">联系电话： {{orderdetail.shippingAddress.receiverMobile}}</div>
                        <div class="p">收货地址：   {{orderdetail.shippingAddress.receiverState}}{{orderdetail.shippingAddress.receiverCity}} {{orderdetail.shippingAddress.receiverDistrict}}
                        {{orderdetail.shippingAddress.address}}</div>
                  </div>
                  <div class="orderdetail"  v-if="orderdetail.shippingOrder.orderStatus=='05'||orderdetail.shippingOrder.orderStatus=='06'">
                      <div class="h5">查看物流 </div>
                       <div class="p">物流公司：{{orderdetail.shippingOrder.logistics}}</div>
                      <div class="p">物流单号：{{orderdetail.shippingOrder.expressNo}}
                      	<a href="https://www.kuaidi100.com/" target="_blank" style="margin-left: 20px;color:#0099ff">去查看</a></div>
                  </div>
                  <div class="orderdetailfapiao">
                      <div class="h5">
                      	<button v-show="orderdetail.shippingOrder.orderStatus!='04'" v-if="orderdetail.shippingInvoice == ''" @click="modaladdorderNo=true" class="addEdit fr">新增</button>
				 		<button v-show="orderdetail.shippingOrder.orderStatus!='04'" v-if="orderdetail.shippingInvoice.invoiceStatus == 'created'" @click="geteditInvoice(orderdetail.shippingOrder.orderNo)" class="addEdit fr">编辑</button> 	发票信息</div>
                      <div class="p">发票类型：
                      	<span v-if="orderdetail.shippingInvoice != ''">{{orderdetail.shippingInvoice.invoiceType}}</span>
					   	
				      </div>
                      <div class="p">发票抬头：<span v-if="orderdetail.shippingInvoice != ''">{{orderdetail.shippingInvoice.invoiceTitle}} </span></div>
                  </div>
                  <div class="orderdetailtotal" >
                        <div class="orderdetailtotalAttr">
                            <p>商品总价:</p>
                            <p>活动优惠:</p>
                            <p>运费:</p>
                            <p>应付总额:</p>
                        </div>
                        <div class="orderdetailtotalValue">
                            <p>￥{{orderdetail.shippingOrder.productFee|pricefilter}}</p>
                            <p>-￥<label  v-if="orderdetail.shippingOrder.discountFee!=''">{{orderdetail.shippingOrder.discountFee|pricefilter}}</label><label v-else>0</label></p>
                            <p v-if="orderdetail.shippingOrder.postageFee!=''">
                            	￥{{orderdetail.shippingOrder.postageFee|pricefilter}}
                            </p>
                            <p v-else>￥0.00</p>
                            <p>￥ <span>{{orderdetail.shippingOrder.orderTotalFee|pricefilter}}</span></p>
                        </div>
                  </div>
                   <Modal v-model="modaladdorderNo" class="modaladdorderNo" title="新增发票信息" @on-ok="addinvoice()" :loading="loading" :mask-closable='false'>
			<Form :model="addInvoice" ref="addInvoice" label-position="left" style="padding: 15px;" :label-width="120" :rules="ruleValidate" >
					<FormItem label="订单编号" prop="orderNo">
					<Input v-model="addInvoice.orderNo" placeholder="订单编号" autocomplete="off" disabled ></Input>
					</FormItem>
				<FormItem label="发票抬头" prop="invoiceTitle">
					<Input v-model="addInvoice.invoiceTitle" placeholder="发票抬头" autocomplete="off"></Input>
				</FormItem>
				<FormItem label="发票类型" prop="invoiceType">
					  <RadioGroup v-model="addInvoice.invoiceType" >
				        <Radio label="增值税普通发票">增值税普通发票</Radio>
				        <Radio label="增值税专用发票">增值税专用发票</Radio>
   					 </RadioGroup>
				</FormItem>
				<FormItem label="所在地区"  prop="selectedOptionsAddr">
				        	 <Cascader  v-model="addInvoice.selectedOptionsAddr" 	  placeholder="选择所在区域"  :data="addressOption"></Cascader>
				</FormItem>
				<FormItem label="详细地址" prop='receiveAddress'>
					<Input v-model="addInvoice.receiveAddress" placeholder="详细地址" autocomplete="off"></Input>
				</FormItem>
				<FormItem label="收票人姓名" prop="receivePerson">
					<Input v-model="addInvoice.receivePerson" placeholder="收票人姓名" autocomplete="off"></Input>
				</FormItem>
				<FormItem label="收票人手机" prop="receivePhone">
					<Input v-model="addInvoice.receivePhone" placeholder="收票人手机" autocomplete="off"></Input>
				</FormItem>
				<div v-if="addInvoice.invoiceType=='增值税专用发票'">
					<h6 class="color-blue">专用发票必填信息:</h6>
				<FormItem label="开户行名称" prop="bankName">
					<Input v-model="addInvoice.bankName" placeholder="开户行名称" autocomplete="off"></Input>
				</FormItem>
				<FormItem label="银行账号" prop="bankNo">
					<Input v-model="addInvoice.bankNo" placeholder="银行账号" autocomplete="off"></Input>
				</FormItem>
				<FormItem label="纳税人识别码" prop='invoiceCode'>
					<Input v-model="addInvoice.invoiceCode" placeholder="纳税人识别码" autocomplete="off"></Input>
				</FormItem>
				<FormItem label="注册地址" prop="registerAddress">
					<Input v-model="addInvoice.registerAddress" placeholder="注册地址"></Input>
				</FormItem>
				</div>
			</Form>
		</Modal>
				<!-- 编辑发票 -->
		 <Modal v-model="modaleditorderNo"  class="modaladdorderNo"  ref='modaleditorderNo' title="编辑发票信息" @on-ok="editinvoice" :loading="loading" :mask-closable='false'>
			<Form :model="editInvoice" ref="editInvoice" label-position="left" style="padding: 15px;" :label-width="120" :rules="ruleValidate" >
				 <FormItem label="订单编号" prop="orderNo">
					<Input v-model="editInvoice.orderNo" placeholder="订单编号" autocomplete="off" disabled ></Input>
					</FormItem>
				<FormItem label="发票抬头" prop="invoiceTitle">
					<Input v-model="editInvoice.invoiceTitle" placeholder="发票抬头"></Input>
				</FormItem>
				<FormItem label="发票类型" prop="invoiceType">
					<RadioGroup v-model="editInvoice.invoiceType" >
				        <Radio label="增值税普通发票">增值税普通发票</Radio>
				        <Radio label="增值税专用发票" >增值税专用发票</Radio>
   					 </RadioGroup>
				</FormItem>
				<FormItem label="收票人姓名" prop="receivePerson">
					<Input v-model="editInvoice.receivePerson" placeholder="收票人姓名" autocomplete="off"></Input>
				</FormItem>
				<FormItem label="收票人手机" prop="receivePhone">
					<Input v-model="editInvoice.receivePhone" placeholder="收票人手机" autocomplete="off"></Input>
				</FormItem>
				<FormItem label="所在地区"  prop="selectedOptionsAddr">
				       <Cascader  v-model="editInvoice.selectedOptionsAddr" :data="addressOption"></Cascader>
				</FormItem>
				<FormItem label="详细地址" prop='receiveAddress'>
					<Input v-model="editInvoice.receiveAddress" placeholder="详细地址" autocomplete="off"></Input>
				</FormItem>
				<div v-if="editInvoice.invoiceType=='增值税专用发票'">
					<h6 class="color-blue">专用发票必填信息:</h6>
				<FormItem label="开户行名称" prop="bankName">
					<Input v-model="editInvoice.bankName" placeholder="开户行名称" autocomplete="off"></Input>
				</FormItem>
				<FormItem label="银行账号" prop="bankNo">
					<Input v-model="editInvoice.bankNo" placeholder="银行账号" autocomplete="off"></Input>
				</FormItem>
				<FormItem label="纳税人识别码" prop='invoiceCode'>
					<Input v-model="editInvoice.invoiceCode" placeholder="纳税人识别码" autocomplete="off"></Input>
				</FormItem>
				<FormItem label="注册地址" prop="registerAddress">
					<Input v-model="editInvoice.registerAddress" placeholder="注册地址"></Input>
				</FormItem>
				</div>
			</Form>
		</Modal>

		 <Spin size="large" fix v-if="spinShow"></Spin>
                </div>
</template>

<script>
   import { validatePHONE } from '@/assets/js/validate';
	export default {
    data () {
    		 const validatePhone = (rule, value, callback) => {
	      	 	if(value.length<0){
	      	 		 callback(new Error('手机号不能为空'));
	      	 	}
	          else if (!validatePHONE(value)) {
	            callback(new Error('请输入正确的手机号'));
	          } else {
	            callback();
	          }
        	};
      return {
      
      	timerShow:false,
      	spinShow:true,
      	timer:'',
      	protime:'',
      	orderdetail:{
      		shippingOrder:{},
      		shippingInvoice:{},
      		shippingAddress:{},
			shippingOrderItems:[],
		  },
		addressOption: [],
      	statusList:[],
		orderNo:'',
		loading:true,
		modaladdorderNo:false,
		modaleditorderNo:false,
		addInvoice:{
			bankName:'',
			bankNo:'',
			invoiceCode:'',
			invoiceTitle:'',
			invoiceType:'增值税普通发票',
			orderNo:'',
			receiveAddress:'',
			receivePerson:'',
			registerAddress:'',
			selectedOptionsAddr:[],
		},
		editInvoice:{
			bankName:'',
			bankNo:'',
			invoiceCode:'',
			invoiceTitle:'',
			invoiceType:'',
			orderNo:'',
			receiveAddress:'',
			receivePerson:'',
			receivePhone:'',
			registerAddress:'',
			selectedOptionsAddr:[],

		},
		ruleValidate:{
			 selectedOptionsAddr: [
                        { required: true, type: 'array',message: '请选择省市区', trigger: 'change' }
                    ],
			     	bankName: [
                        { required: true,message: '开户行名称不能为空', trigger: 'blur' }
                    ],
                    bankNo: [
                        { required: true, message: '银行账号不能为空', trigger: 'blur' }
                    ],
                    invoiceCode: [
                        { required: true, message: '纳税人识别码不能为空', trigger: 'blur' }
                    ],
                    invoiceTitle: [
                       { required: true, message: '发票抬头不能为空', trigger: 'blur' },
					],
					invoiceType: [
                        { required: true,message: '发票类型不能为空', trigger: 'change' }
                    ],
				    receiveAddress: [
                        { required: true, message: '详细地址不能为空', trigger: 'blur' }
					],
                    receivePerson: [
                        { required: true, message: '收票人姓名不能为空', trigger: 'blur' }
                    ],
                    receivePhone: [
                        { required: true, trigger: 'blur' ,validator: validatePhone, }
                    ],
                    registerAddress: [
                       { required: true, message: '注册地址不能为空', trigger: 'blur' },
                    ],
		}
      }
    },
    methods: {
		getAddressOption(){
			this.$axios({
				method: 'post',
				url:'/common/address',
			}).then((res)=>{
					this.addressOption=res;
			});
		},
		addinvoice(){
		this.loading = false;
		this.$nextTick(() => {
		this.loading = true;
		this.$refs['addInvoice'].validate((valid) => {
		if (valid) {
			let temp = this.addInvoice;
			temp.receiveProvince=this.addInvoice.selectedOptionsAddr[0];
			temp.receiveCity=this.addInvoice.selectedOptionsAddr[1];
			temp.receiveDistrict=this.addInvoice.selectedOptionsAddr[2];
			delete temp['selectedOptionsAddr']
			let params =  Object.assign({}, temp);
					this.$axios({
					method: 'post',
					url:'/order/invoice/save',
					data:params
				}).then((res)=>{
					if(res.code=='200'){
					this.modaladdorderNo = false;
					this.statusList = res.object;
					this.getOrder();
					this.$Message.success(res.object);
					}else{
					this.$Message.error(res.msg);
					}

				});
				}
			})
		},2000)
		},
		geteditInvoice(){
			this.modaleditorderNo=true;
			this.editInvoice.bankName= this.orderdetail.shippingInvoice.bankName
			this.editInvoice.bankNo= this.orderdetail.shippingInvoice.bankNo
			this.editInvoice.invoiceCode= this.orderdetail.shippingInvoice.invoiceCode
			this.editInvoice.invoiceTitle =this.orderdetail.shippingInvoice.invoiceTitle
			this.editInvoice.invoiceType =this.orderdetail.shippingInvoice.invoiceType
			this.editInvoice.orderNo= this.orderdetail.shippingInvoice.orderNo
			this.editInvoice.receiveAddress= this.orderdetail.shippingInvoice.receiveAddress
			this.editInvoice.receivePerson= this.orderdetail.shippingInvoice.receivePerson
			this.editInvoice.selectedOptionsAddr= [this.orderdetail.shippingInvoice.receiveProvince,this.orderdetail.shippingInvoice.receiveCity,this.orderdetail.shippingInvoice.receiveDistrict]
			this.editInvoice.registerAddress= this.orderdetail.shippingInvoice.registerAddress
			this.editInvoice.receivePhone= this.orderdetail.shippingInvoice.receivePhone
		},
		editinvoice(){
			setTimeout(() => {
			this.loading = false;
			this.$nextTick(() => {
			this.loading = true;
			this.$refs['editInvoice'].validate((valid) => {
			if (valid) {
				let temp = this.editInvoice;
				temp.receiveProvince=this.editInvoice.selectedOptionsAddr[0];
				temp.receiveCity=this.editInvoice.selectedOptionsAddr[1];
				temp.receiveDistrict=this.editInvoice.selectedOptionsAddr[2];
				delete temp['selectedOptionsAddr']
				let params =  Object.assign({}, temp);
						this.$axios({
						method: 'post',
						url:'/order/invoice/save',
						data:params
					}).then((res)=>{
						if(res.code=='200'){
						this.modaleditorderNo = false;
						this.statusList = res.object;
						this.getOrder();
						this.$Message.success(res.object);
						}else{
							this.$Message.error(res.msg);
						}

					});
					}
				})
			})
			},2000)
		},
    	  	getStatusEnum(){
    			this.$axios({
						    method: 'get',
						    url:'/order/enums',
						}).then((res)=>{
							if(res.code=='200'){
							this.statusList = res.object;
							}
						});
    	},
    		statusfilter(value){
    			for(var i = 0 ;i < this.statusList.length;i++){
					if(this.statusList[i].key == value){
						return this.statusList[i].value;
					}
				}
    		},
    	     cancel(){
                this.$Modal.confirm({
                    content: '<p>确定取消该订单？</p>',
                    onOk: () => {
                         		this.$axios({
					    method: 'post',
					    url:'/order/cancel/'+this.orderNo,
					}).then((res)=>{
						if(res.code=='200'){
							  this.$Message.info(res.msg);
							  this.getOrder();
						}
						else{
							 this.getOrder();
							  this.$Message.info(res.msg);
						}
					});
                    },
                    onCancel: () => {
                    }
                });
            },
    	//详情页均值
    	discountFeejun(item){
    		return item.discountFee/item.quantity
    	},
    	productFeejun(item){
    		return item.productFee/item.quantity
    	},
    	orderFeejun(item){
    		return item.orderFee/item.quantity
    	},
    	  getParams () {
                // 取到路由带过来的参数
                let routerParams = this.$route.query.orderNo;
                // 将数据放在当前组件的数据内
                this.orderNo = routerParams;
		  },
      getOrder(){
		this.$axios({
				method: 'get',
				url:'/order/'+this.orderNo,
			}).then((res)=>{
				this.orderdetail = res;
				this.addInvoice.orderNo=this.orderdetail.shippingOrder.orderNo
				this.editInvoice.orderNo=this.orderdetail.shippingOrder.orderNo
				this.spinShow=false;
				var ssss = this.orderdetail;
				this.pro = ssss;
				if(ssss.shippingOrder.orderStatus == "01"){
					this.getTimeout(ssss.shippingOrder.createTime);
				}
			});
		},
	getTimeout(inittime){
		let _this = this
			var timer=()=>{
				 _this.timer =	setTimeout(() => {
					var mm,ss = null;
					var time = new Date((inittime)).getTime()  - new Date().getTime();
					time = time + 30*60*1000;
					if(time<0){
						this.timerShow= false;
						this.getOrder();
					}else{
						mm = Math.floor((time/1000 / 60) % 60);
						ss = Math.floor(time /1000 % 60);
						this.protime = mm+"分"+ss+"秒";
						this.timerShow = true;
						timer()
					}
					}, 1000)
				}
			timer()
	}
	},
	mounted() {
			this.getParams();
			this.getOrder();
			this.getStatusEnum();
			this.getAddressOption();
	},
	 destroyed: function () {
          	clearTimeout(this.timer);
		},
  }
</script>

<style scoped="scoped" lang="scss">
    .newcenterbody{
                padding: 0px;
           }
			.newcenterbody h2{
                font-weight: 400;
                font-size: 24px;
                color: #666666;
            }
  .orderdetailnum{
                margin: 0 4px;
                margin-top: 70px;
                font-weight: 400;
                font-size: 18px;
                color: #000000;
                padding-bottom: 8px;
                border-bottom: 1px solid #cccccc;
            }
            .orderdetailnum span{
                float: right;
                font-weight: 400;
                font-size: 18px;
                color: #666666;
                text-align: right;
            }
            .orderteail{
                margin:0px 4px;
            }
            .orderteail img{
                height: 90px;
                width: 90px;
            }
            .orderdetailText{
                float: right;
                width: 750px;
            }
            .orderdetailText span{
                margin-top: 30px;
                width: 50%;
                text-align: left;
                font-weight: 400;
                font-size: 14px;
                color: #000000;
                height: 40px;
                overflow: hidden;
            }
            .newcenterbody ul{
                padding: 15px 0px;
            }
            .newcenterbody .orderteail{
                padding-top: 15px;
            }
            .orderdetailsend{
                margin: 15px 4px 0px;
                padding: 40px 0px 40px;
                border-bottom: 1px solid #cccccc;
                border-top: 1px solid #cccccc;
            }
            .h5{
                font-weight: 400;
                font-size: 18px;
                color: #000000;
                height: 30px;
                line-height: 30px;
                margin-bottom: 12px;
            }
            .p{
                font-weight: 400;
                font-size: 14px;
                color: #666666;
                line-height: 30px;
            }
            .orderdetail{
                margin: 15px 4px 0px;
                padding: 25px 0px 40px;
                border-bottom: 1px solid #cccccc;
            }
            .orderdetailfapiao{
                margin: 15px 4px 0px;
                padding: 25px 0px 40px;
                border-bottom: 1px solid #cccccc;                
            }
            .orderdetailtotal{
                padding: 55px 4px 88px;
            }
            .orderdetailtotal div{
                float: left;
                font-weight: 400;
                font-size: 14px;
                text-align: right;
                line-height: 30px;
                padding-bottom: 80px;
            }
            .orderdetailtotalAttr{
                width: 550px;
            }
            .orderdetailtotalValue{
                width: 300px;
            }
            .orderdetailtotal p{
                margin-bottom: 6px;
                color: #333333;
            }
            .orderdetailtotalValue p{
                color: #ff0000;
            }
            .orderdetailtotalValue p span{
                font-size: 30px
            }
            .orderdetailtotal p:hover{
                color: #333333;
            }
            .orderdetailtotalValue p:hover{
                color: #ff0000;
            }
            .addEdit{
				width: 80px;
				margin-right: 10px;
				height: 30px;
				line-height: 30px;
				border: none;
				background-color: #e1e1e1;
			}
	.modaladdorderNo{
		margin-bottom: 100px;
	}
</style>
<style>
	.modaladdorderNo .ivu-form-item-label{
		font-size: 14px;
		height: 45px;
		line-height: 45px;
		padding: 0px;
	}
	.modaladdorderNo .ivu-input{
		font-size: 14px;
		height: 45px;
		line-height: 45px;
		border-radius: 0px;
	}
	.modaladdorderNo .ivu-radio-group{
		font-size: 14px;
		height: 45px;
		line-height: 45px;		
	}
	.modaladdorderNo .ivu-modal-close {  
		width: 30px;
		height: 30px;
		border: 1px solid #d5d5d5;
		text-align: center;
		border-radius: 50%;
		line-height: 30px;
	}
	.modaladdorderNo .ivu-modal-header{
		border: none;
		background-color: #f0f0f0;
	}
	.modaladdorderNo .ivu-modal-header-inner{
		font-size: 18px;
		color: #333333;
	}
	.modaladdorderNo .ivu-modal-footer{
		border-top: none;
		text-align: center;
		padding-bottom: 40px;
		border-radius: 0px;
	}
	.modaladdorderNo .ivu-btn-text{
		width: 152px;
		height: 41px;
		font-weight: 400;
		font-size: 18px;
		border-radius:0px;
	}
	.modaladdorderNo .ivu-btn-primary{
		width: 152px;
		height: 41px;
		font-weight: 400;
		font-size: 18px;
		color: #FFFFFF;
		border-radius:0px;
	}
	.modaladdorderNo .ivu-modal-content{
		border-radius: 0px;
	}
</style>
