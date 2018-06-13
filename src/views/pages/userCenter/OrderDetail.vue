<template>
<div>
	     <div class="details clearfix">
	     	<h2 class="left">{{statusfilter(orderdetail.shippingOrder.orderStatus)}}</h2>
	     	<div class="right"  v-show="orderdetail.shippingOrder.orderStatus=='01'||orderdetail.shippingOrder.orderStatus=='02'">	 
			 <span v-if='timerShow'>剩余支付时间{{protime}}</span>
			 <button @click="cancel()"  v-show="orderdetail.shippingOrder.orderStatus=='01'">取消订单</button>
			 <button class="btn-blue" @click="quzhifu()" >去支付</button>
	     		</div>
	     </div>
	<div class="order_situation">
		<h2>订单概况</h2>
		   		<p>订单编号:<span>{{orderdetail.shippingOrder.orderNo}}</span></p>
		   		<p>下单时间:<span>{{orderdetail.shippingOrder.createTime | formatDate}}</span></p>
		   		<p>收货信息:<span>{{orderdetail.shippingAddress.receiverName}}/{{orderdetail.shippingAddress.receiverMobile}}/{{orderdetail.shippingAddress.receiverState}}
		   			{{orderdetail.shippingAddress.receiverCity}}{{orderdetail.shippingAddress.receiverDistrict}}{{orderdetail.shippingAddress.receiverAddress}}</span></p>
		   		<p class="clearfix" v-show="orderdetail.shippingOrder.orderStatus!='04'">发票人信息:<span v-if="orderdetail.shippingInvoice != ''">{{orderdetail.shippingInvoice.receivePerson}}/{{orderdetail.shippingInvoice.receivePhone}}/{{orderdetail.shippingInvoice.receiveProvince}} {{orderdetail.shippingInvoice.receiveCity}} {{orderdetail.shippingInvoice.receiveDistrict}} {{orderdetail.shippingInvoice.receiveAddress}}</span>
				</p>
				<p class="clearfix" v-show="orderdetail.shippingOrder.orderStatus!='04'">发票详情信息:<span v-if="orderdetail.shippingInvoice != ''">{{orderdetail.shippingInvoice.invoiceType}}/{{orderdetail.shippingInvoice.invoiceTitle}}/{{orderdetail.shippingInvoice.bankName}}/{{orderdetail.shippingInvoice.bankNo}}/{{orderdetail.shippingInvoice.invoiceCode}}/{{orderdetail.shippingInvoice.registerAddress}}
				</span>
					   	<button v-show="orderdetail.shippingOrder.orderStatus!='04'" v-if="orderdetail.shippingInvoice == ''" @click="modaladdorderNo=true" class="addEdit">新增</button>
				 		<button v-show="orderdetail.shippingOrder.orderStatus!='04'" v-if="orderdetail.shippingInvoice.invoiceStatus == 'created'" @click="geteditInvoice(orderdetail.shippingOrder.orderNo)" class="addEdit">编辑</button> 				</p>
				   </div>
		 <div class="order_goods clearfix">
		   	<table class="order-tb">
		   		<thead><tr><th>主图</th><th>商品</th><th>单价</th><th>数量</th><th>优惠</th><th>总价</th></tr></thead>
		       <tbody> 
		       	<tr v-for="(item,index) in orderdetail.shippingOrderItems" :key="index">
		   		<td class="goods_pic"><img :src="item.productItemImg | imgfilter"></td>
		   		<td>	
		   			<p class="title">{{item.productTitle}}</p>
		   			<p>{{item.productAttrs}}</p>
		   		    <p>{{item.productItemNo}}</p></td>
		   			<td>
		   				<span class="color-blue">￥{{orderFeejun(item)|pricefilter}}</span>
		   				<span class="color-origin">￥{{productFeejun(item)|pricefilter}}</span>
		   			</td>
		   			<td>{{item.quantity}}</td>
		   			<td>￥{{item.discountFee |pricefilter}}</td><td>￥{{item.productFee |pricefilter}}</td>
		   	</tr></tbody>
		   	</table>
		   	<div class="order_price clearfix">
		   <div  class="order_wrap">
		   	<dl class="cf-wrap">
		     	<dt>商品总额:</dt><dd>￥{{orderdetail.shippingOrder.productFee|pricefilter}}</dd>
		   	 	<dt>商品优惠:</dt><dd><label  v-if="orderdetail.shippingOrder.discountFee!=''">￥{{orderdetail.shippingOrder.discountFee|pricefilter}}</label></dd>
		    	<dt>实付款:</dt><dd><span class="font-24">￥{{orderdetail.shippingOrder.orderTotalFee|pricefilter}}</span></dd>
		    </dl>
		     <button  @click="quzhifu"  type="button" class="btn_pay" v-show="orderdetail.shippingOrder.orderStatus=='01'||orderdetail.shippingOrder.orderStatus=='02'"> 
				立即支付
			</button>
		   </div>
		   </div>
		</div>

		<!-- 新增发票 -->
		 <Modal v-model="modaladdorderNo" title="新增发票信息" @on-ok="addinvoice()" :loading="loading" >
			<Form :model="addInvoice" ref="addInvoice" label-position="left" style="padding: 15px;" :label-width="120" :rules="ruleValidate" > 
				<FormItem label="订单编号" prop="orderNo">
					<Input v-model="addInvoice.orderNo" placeholder="订单编号" disabled  autocomplete="off"></Input>
				</FormItem>
				<FormItem label="开户行名称" prop="bankName">
					<Input v-model="addInvoice.bankName" placeholder="开户行名称" autocomplete="off"></Input>
				</FormItem>
				<FormItem label="银行账号" prop="bankNo">
					<Input v-model="addInvoice.bankNo" placeholder="银行账号" autocomplete="off"></Input>
				</FormItem>
				<FormItem label="纳税人识别码" prop='invoiceCode'>
					<Input v-model="addInvoice.invoiceCode" placeholder="纳税人识别码" autocomplete="off"></Input>
				</FormItem>
				<FormItem label="发票抬头" prop="invoiceTitle">
					<Input v-model="addInvoice.invoiceTitle" placeholder="发票抬头" autocomplete="off"></Input>
				</FormItem>
				<FormItem label="发票类型" prop="invoiceType">
					<Select v-model="addInvoice.invoiceType">
						<Option value="增值税普通发票">增值税普通发票</Option>
						<Option value="增值税专用发票 ">增值税专用发票 </Option>
					</Select>
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


				<FormItem label="注册地址" prop="registerAddress">
					<Input v-model="addInvoice.registerAddress" placeholder="注册地址"></Input>
				</FormItem>
			</Form>
		</Modal> 
				<!-- 编辑发票 -->
		 <Modal v-model="modaleditorderNo" ref='modaleditorderNo' title="编辑发票信息" @on-ok="editinvoice" :loading="loading" >
			<Form :model="editInvoice" ref="editInvoice" label-position="left" style="padding: 15px;" :label-width="120" :rules="ruleValidate" > 
				<FormItem label="订单编号" prop="orderNo">
					<Input v-model="editInvoice.orderNo" placeholder="订单编号" disabled  autocomplete="off"></Input>
				</FormItem>
				<FormItem label="开户行名称" prop="bankName">
					<Input v-model="editInvoice.bankName" placeholder="开户行名称" autocomplete="off"></Input>
				</FormItem>
				<FormItem label="银行账号" prop="bankNo">
					<Input v-model="editInvoice.bankNo" placeholder="银行账号" autocomplete="off"></Input>
				</FormItem>
				<FormItem label="纳税人识别码" prop='invoiceCode'>
					<Input v-model="editInvoice.invoiceCode" placeholder="纳税人识别码" autocomplete="off"></Input>
				</FormItem>
				<FormItem label="发票抬头" prop="invoiceTitle">
					<Input v-model="editInvoice.invoiceTitle" placeholder="发票抬头"></Input>
				</FormItem>
				<FormItem label="发票类型" prop="invoiceType">
					<Select v-model="editInvoice.invoiceType" placeholder="发票类型">
						<Option value="增值税普通发票">增值税普通发票</Option>
						<Option value="增值税专用发票 ">增值税专用发票 </Option>
					</Select>
				</FormItem>


				<FormItem label="收票人姓名" prop="receivePerson">
					<Input v-model="editInvoice.receivePerson" placeholder="收票人姓名" autocomplete="off"></Input>
				</FormItem>
				<FormItem label="收票人手机" prop="receivePhone">
					<Input v-model="editInvoice.receivePhone" placeholder="收票人手机" autocomplete="off"></Input>
				</FormItem>
				<FormItem label="省市区"  prop="selectedOptionsAddr">
				    <Cascader  v-model="editInvoice.selectedOptionsAddr"   :data="addressOption"></Cascader>
				</FormItem>
				<FormItem label="详细地址" prop='receiveAddress'>
					<Input v-model="editInvoice.receiveAddress" placeholder="详细地址" autocomplete="off"></Input>
				</FormItem>
				<FormItem label="注册地址" prop="registerAddress">
					<Input v-model="editInvoice.registerAddress" placeholder="注册地址"></Input>
				</FormItem>
			</Form>
		</Modal> 
		 <Spin size="large" fix v-if="spinShow"></Spin>
	</div>
</template>

<script>
 import { validatePHONE } from '@/assets/js/validate';
	import { formatDate } from '@/assets/js/date.js'
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
		  spinShow:true,
		  endTime:'',
		  timerShow:false,
		  pro:{},
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
			invoiceType:'',
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
                        { required: true,  validator: validatePhone, trigger: 'blur' }
                    ],
                    registerAddress: [
                       { required: true, message: '注册地址不能为空', trigger: 'blur' },
                    ],
		}
      }
    },
    filters: {
    formatDate(time) {
    var date = new Date(time);
    return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
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
			if(temp['selectedOptionsAddr'] == '' ||temp['selectedOptionsAddr'] == undefined){
						this.$Message.error("请选择省市区");
						return
			}
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
							  this.$router.go(0);
						}
						else{
							  this.$Message.info(res.msg);
						}
					});
                    },
                    onCancel: () => {
                        this.$Message.info('放弃取消');
                    }
                });
            },
    	quzhifu(){
    		this.$router.push({name:'/cartthree',query:{orderNo: this.orderNo}});  
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
			var timer=()=>{
				setTimeout(() => {
					var mm,ss = null;
					var time = new Date((inittime)).getTime()  - new Date().getTime();
					time = time + 30*60*1000;
					if(time<=0){
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
	}
  }
</script>

<style scoped="scoped" lang="scss">
.details{
	    background-color: #fff;
    position: relative;
    padding: 26px 0 29px 19px;
    border: 1px solid #e9e9e9;
}
.details .right{
	float: right;
	margin-right: 20px;
	button{
		cursor: pointer;
		    width: 90px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border: 1px solid #c8c8c8;
    border-radius: 2px;
    margin-left: 10px;
    background: #fff;
	}
	.btn-blue{
		background: #0099ff;
		color: #fff;
		border-color:  #0099ff;
	}
}
.order_situation{
	margin-bottom: 20px;
	    background-color: #fff;
    padding: 26px 0 18px 19px;
    border: solid #e9e9e9;
    border-width: 0 1px 1px 1px;
    h2{
    	    color: #333;
    font-size: 18px;
    font-weight: normal;
    margin-bottom: 22px;
    }
    p{
    	margin-bottom: 9px;
    	color:#333;
    	span{
    		color: #999;
    		margin-left: 5px;
    	}
	}
	.addEdit{
		float: right;
		padding: 5px 15px;
		margin-right: 20px;
		color: #fff;
		background-color:#0099ff;
		border: #0099ff 1px solid;
		cursor: pointer;
	}
}
.order_goods{
	background: #fff;
	margin-bottom: 50px;
}
</style>