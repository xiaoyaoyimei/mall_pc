<template>
<div>
		<div class="m_header_bar">
			<router-link   class="m_header_bar_back" to="/user/orderlist"><Icon type="ios-arrow-back"></Icon></router-link>
			<span class="m_header_bar_title">订单详情</span>
			<span class="m_header_bar_menu"></span>
		</div>
		<div class="detail">
		  	<ul class="address" >
			<li>
			<img src="../../../assets/img/地址.png">
		    <div> 
		    <p>{{orderdetail.shippingAddress.receiverName}} <b>{{orderdetail.shippingAddress.receiverMobile}}</b></p>
		    <p>{{orderdetail.shippingAddress.receiverState}}{{orderdetail.shippingAddress.receiverCity}}{{orderdetail.shippingAddress.receiverDistrict}}{{orderdetail.shippingAddress.receiverAddress}}</p>
			</div>
			</li>
		   </ul>
		 
		   	<ul class="spitem">
		    <li v-for="(item,index) in orderdetail.shippingOrderItems" :key="index">
		   		<img :src="item.productItemImg | imgfilter">
		   		<p>
		   			<span class="title">{{item.productTitle}}</span>
		   			<span>{{item.productAttrs}}</span>
		   			<span class="price">￥{{productFeejun(item)|pricefilter}}</span></p>
		   	</li>
		   	</ul>
		   	  <div class="sp">
		   		<span>订单编号：{{orderdetail.shippingOrder.orderNo}}</span>
		   		<span>下单时间：{{orderdetail.shippingOrder.createTime | formatDate}}</span>
		   		
		   			<span>发票类型：{{orderdetail.shippingInvoice}}</span>
		   			<span>发票抬头：</span>
		   			<span>发票内容：</span>
		   		</div>
		   	<ul class="sptotal">
		   	<li>	<span class="t">商品总额</span><span class="s">￥{{orderdetail.shippingOrder.productFee|pricefilter}}</span></li>
		   	 	<li>	<span class="t">商品优惠</span><span class="s">￥{{orderdetail.shippingOrder.discountFee|pricefilter}}</span></li>
		    		<li class="border"> <span class="t"></span><span>实付款：<label class="zjg">￥{{orderdetail.shippingOrder.orderTotalFee|pricefilter}}</label></span></li></ul>
		 
		</div>
		<div class="fixbottom" 
			 v-show="orderdetail.shippingOrder.orderStatus=='01'||orderdetail.shippingOrder.orderStatus=='02'">
			 <button class="btn-white" @click="cancel()" >取消订单</button>
			<button class="btn-red" @click="quzhifu()" v-show="orderdetail.shippingOrder.orderStatus=='01'">去支付</button></div>
	</div>
</template>

<script>
	import { formatDate } from '@/assets/js/date.js'
	export default {
    data () {
      return {
      	orderdetail:{
      		shippingOrder:{},
      		shippingInvoice:{},
      		shippingAddress:{},
      		shippingOrderItems:[]
      	},
        orderNo:'',
      }
    },
    filters: {
    formatDate(time) {
    var date = new Date(time);
    return formatDate(date, 'yyyy-MM-dd hh:mm');
   }
},
    methods: {
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
					});
     	 },
    },
         mounted() {
         	    this.getParams();
				this.getOrder();
		}
  }
</script>

<style scoped="scoped" lang="scss">
.fixbottom{
	width: 100%;
	padding: 0 0 0.9rem;
	box-sizing:content-box;
	height: 3.2rem;
	background: #fff;
	text-align: right;
	button{
		height: 3.2rem;
		margin-right:1rem;
		padding: 0  0.8rem;
		cursor: pointer;
	}
	.btn-white{
		background: #fff;
		border: 1px solid #eee;
	}
	.btn-red{
		background: red;
		border: 1px solid red;
		color: #fff;
	}
	
}
.detail {
		margin-bottom:1rem;
		font-size: 1.4rem;
		.address{ 
			background:#fff;
			li{
			display: flex;
			img{
				width:2.4rem;
				height:2.4rem;
				margin-right:1rem;
			}
		}
		}
	}
	.spitem{
		margin-top:1rem;
		background: #fff;
			li{
			padding: 0.5rem;
			display: flex;
			p{
				flex:1;
				.title{
					display: block;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
					width:270px;
				}
				.price{
					color:#222;
					display: block;
					margin-top:1rem;
					font-weight: bold;
				}
			}
			
		}
		img{
			max-width: 7rem;
			max-height: 7rem;
			margin-right:1rem;
		}
	}
	.sp{
		margin-top:1rem;
		background: #fff;
		padding: 1rem 1rem 0;
		span{
			display: block;
			margin-bottom: 0.5rem;
		}
	}
	.sptotal {
		border-top:1px solid #eee;
		background: #fff;
		.border{
			border-top:1px solid #eee;
		}
		li{
			padding: 0.5rem 1rem;
		display: flex;
		.t{
			flex: 1;
		}
		.s{
			color:#222;
			font-weight: bold;
		}
		.zjg{
			color:#d32122;
			font-size: 18px;
		}
	}
}
</style>