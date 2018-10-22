<template>
	<div class="padding40">
                  <h2>{{statusfilter(refundOrderdetail.shoppingRefundOrder.refundOrderStatus)}}</h2>
                  <p style="margin-top:5px;font-size:14px;">申请时间：{{refundOrderdetail.shoppingRefundOrder.createTime | formatDate('yyyy-MM-dd hh:mm:ss')}}</p>
                     	<!-- <div class="font-14" v-show="orderdetail.shoppingRefundOrder.refundOrderStatus=='01'||orderdetail.shoppingRefundOrder.refundOrderStatus=='02'">
		 <span v-if='timerShow'>订单将在 <span class="color-red">{{protime}}</span>后 自动关闭，请及时付款~</span>
	     		</div> -->
                  <div class="orderdetailnum">
                      退款金额：￥ <em style="font-size:30px;"> {{refundOrderdetail.shoppingRefundOrder.refundOrderTotalFee | pricefilter}}</em>
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
                  <div class="orderdetailtotal clearfix" >
                        <div class="orderdetailtotalAttr">
                            <p>订单编号：</p>
                            <p>成交时间：</p>
                            <p>商品总价：</p>
                            <p>活动优惠：</p>
                            <p>运&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;费：</p>
                            <p>应付总额：</p>
                        </div>
                        <div class="orderdetailtotalValue">
                            <p>{{orderdetail.shippingOrder.orderNo}}</p>
                            <p>{{orderdetail.shippingOrder.createTime | formatDate('yyyy-MM-dd hh:mm:ss')}}</p>
                            <p>￥{{orderdetail.shippingOrder.productFee|pricefilter}}</p>
                            <p>-￥<label  v-if="orderdetail.shippingOrder.discountFee!=''">{{orderdetail.shippingOrder.discountFee|pricefilter}}</label><label v-else>0</label></p>
                            <p v-if="orderdetail.shippingOrder.postageFee!=''">
                            	￥{{orderdetail.shippingOrder.postageFee|pricefilter}}
                            </p>
                            <p v-else>￥0.00</p>
                            <p>￥ {{orderdetail.shippingOrder.orderTotalFee|pricefilter}}</p>
                        </div>
                  </div>
				  <div class="orderdetailtotal" >
                        <div class="orderdetailtotalAttr">
                            <p>退款编号：</p>
                            <p>退款金额：</p>
                            <p>要&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;求：</p>
                        </div>
                        <div class="orderdetailtotalValue">
                            <p>{{refundOrderdetail.shoppingRefundOrder.refundOrderNo}}</p>
                            <p>￥{{refundOrderdetail.shoppingRefundOrder.refundOrderTotalFee}}</p>
                            <p>{{refundOrderdetail.shoppingRefundOrder.remarks}}</p>
                        </div>
                  </div>
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
			shoppingOrderItems:[],
          },
        refundOrderdetail:{
      		shoppingRefundOrder:{},
      		shippingInvoice:{},
      		shippingAddress:{},
			shoppingRefundOrderItems:[],
          
        },
		addressOption: [],
      	statusList:[],
		orderNo:'',
		loading:true,
		modaladdorderNo:false,
		modaleditorderNo:false,
	
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
    	getStatusEnum(){
			this.$axios({
				method: 'get',
				url:'/refund/enums',
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
				url:'/refund/'+this.$route.query.refundOrderNo,
			}).then((res)=>{
                this.refundOrderdetail = res;
				this.spinShow=false;
				var ssss = this.refundOrderdetail;
                this.pro = ssss;
            });
            this.$axios({
				method: 'get',
				url:'/order/'+ this.orderNo,
			}).then((res)=>{
                this.orderdetail = res;
                 console.log(this.orderdetail)
				this.spinShow=false;
				var ssss = this.orderdetail;
                this.pro = ssss;
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
                margin-top: 40px;
                font-weight: 400;
                font-size: 18px;
                color: #000000;
                padding-bottom: 35px;
                border-bottom: 1px solid #cccccc;
            }
            .orderdetailnum span{
                float: right;
                font-weight: 400;
                font-size: 18px;
                color: #666666;
                text-align: right;
			}
			.orderdetailnum em{
                font-weight: 400;
                font-size: 18px;
                color: #ff0000;
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
				padding: 30px 4px 0px;
				border-top: 1px solid #cccccc;
            }
            .orderdetailtotal div{
                float: left;
                font-weight: 400;
                font-size: 14px;
                text-align: left;
                line-height: 30px;
                padding-bottom: 25px;
			}
			.orderdetailtotal:nth-last-of-type(1) div{

                padding-bottom: 80px;
            }
            .orderdetailtotalAttr{
                width: 75px;
            }
            .orderdetailtotalValue{
                width: 300px;
            }
            .orderdetailtotal p{
                margin-bottom:0px;
				color: #333333;
				line-height: 23px;
            }
            .orderdetailtotal p:hover{
                color: #333333;
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
