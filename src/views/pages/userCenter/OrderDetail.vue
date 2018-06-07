<template>
<div>
	     <div class="details clearfix">
	     	<h2 class="left">{{statusfilter(orderdetail.shippingOrder.orderStatus)}}</h2>
	     	<div class="right"  v-show="orderdetail.shippingOrder.orderStatus=='01'||orderdetail.shippingOrder.orderStatus=='02'">	 
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
      		shippingOrderItems:[],
      	},
      	statusList:[],
        orderNo:'',
      }
    },
    filters: {
    formatDate(time) {
    var date = new Date(time);
    return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
   }
},
    methods: {
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
					});
     	 },
    },
         mounted() {
         	    this.getParams();
				this.getOrder();
				this.getStatusEnum();
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
}
.order_goods{
	background: #fff;
	margin-bottom: 50px;
}
</style>