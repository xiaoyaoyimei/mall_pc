<template>
	<div><div class="nav Nav">
			<div class="main-width clearfix">
                <router-link  to="/index" class="logo fl navcart"><img    src="../../../assets/img/logo-red.png"></router-link>
                <a href="" class="fl mycart">支付订单</a>
			</div>
		</div>
		<div class="pay">
            <div class="paylist clearfix">
                <div class="payList clearfix">
                    <div class="payImg cartIcon iconIcon-pay">
                    </div>
                    <div class="payInformation">
                        <h4>订单提交成功，去付款！</h4>
                        <p>请在 <span class="red">0小时30分</span> 内完成支付，超时后将取消订单</p>
                        <p>收货信息：{{pro.receiverName}} {{pro.receiverMobile}} {{pro.receiverState}}  {{pro.receiverCity}} {{pro.receiverDistrict}} {{pro.receiverAddress}}</p>
                        <div class="payorderdetail" v-if="orderdetail == true">
                            <p>订单详情</p>
                            <p class="clearfix">
                                <span class="detailname">交易金额：</span>
                                <span class="detailvalue">￥ {{orderTotalFee | pricefilter}}</span>
                            </p>
                            <p class="clearfix">
                                <span class="detailname">订单号：</span>
                                <span class="detailvalue">  {{orderNo}}</span>
                            </p>
                            <p class="clearfix">
                                <span class="detailname">购买时间：</span>
                                <span class="detailvalue"> {{ordertime | formatDate('yyyy-MM-dd hh:mm:ss')}}</span>
                            </p>
                        </div>
                    </div>
                    <div class="payprice">
                        <p>应付总额：<span class="red">￥<strong> {{orderTotalFee | pricefilter}}</strong></span></p>
                        <router-link :to="{path:'/user/orderlist'}" tag="button">订单中心 <Icon type="ios-arrow-forward"></Icon></router-link>
                        <button @click="orderdetailshow('alipay')" :to="{name:'/order/detail',query:{orderNo:this.orderNo}}">订单详情

                       <Icon type="ios-arrow-down" v-if="chevrondown == true"/> 
                                           <Icon type="ios-arrow-up"  v-else/>   
                        </button>
                    </div>
                </div>
                <div class="paymethod">
                    <h4>选择以下支付方式付款</h4>
                    <div class="clearfix">
                        <span class="cartIcon iconIcon-weixin" @click="showweixin()"></span>
                        <span class="cartIcon iconIcon-zhifubao" @click="handleSubmit('alipay')"></span>
                    </div>
                </div>
            </div>
        </div>
      <Modal v-model="weixinModal" width="400" class="weixinModal" :mask-closable="false">
			<p slot="header" style="text-align:left">
				<Icon type="ios-information-circle"></Icon>
				<span>微信支付</span>
			</p>
			<div>
               <img :src="verimg"/>
                <p>请使用 <span style="color:#f60;">微信</span> 扫一扫</p>
                <p>二维码完成支付</p>
			</div>
		</Modal>
	</div>
</template>

<script>
	  export default {
        data () {
            return {
            	payshow:false,
            	orderNo:this.$route.query.orderNo,
            	verimg:'',
            	pay:this.$axios.defaults.baseURL+'order/alipay/'+this.$route.query.orderNo,
                t:'',
                pro:'',
                ordertime:'',
                orderTotalFee:0,
                orderdetail:false,
                weixinModal:false,
                chevrondown:true
            }
        },
        methods:{
        	//切换num的值切换支付方式
        	showweixin(){
      		 		this.weixinModal = true
                    let urlo=window.location.origin;
                    this.verimg=urlo+'/mall/pc/order/weixin/'+this.$route.query.orderNo;
        	},
        	wexinpaycheck(){
        		var _this=this;
        		   	this.$axios({
						    method: 'post',
							    url:'/order/payment/check/'+this.$route.query.orderNo,
							}).then((res)=>{
								if(res.msg=='yes'){
									clearTimeout( _this.t );
									_this.$router.push({ name:'/order/detail',query:{orderNo:this.$route.query.orderNo}});
								}
							});
							  _this.t = setTimeout(function(){ _this.wexinpaycheck() }, 1000);
        	},
        	cancelpay(){
        		this.payshow=true;
        	},
        	continueshow(){
        		this.payshow=false;
        	},
        	level(){
        		this.$router.push({name:'/order/detail',query:{orderNo:this.orderNo}});
            },
            orderdetailshow(){
                this.orderdetail = !this.orderdetail;
                this.chevrondown =!this.chevrondown;
            },
	    	getParams () {
	                // 取到路由带过来的参数
                    let routerParams = this.$route.query.orderNo;
	                // 将数据放在当前组件的数据内
                    this.orderNo = routerParams;
                    this.$axios({
                        method: 'get',
                        url:'/order/'+this.orderNo,
                    }).then((res)=>{
                        this.ordertime = res.shippingOrder.createTime;
                        this.orderTotalFee = res.shippingOrder.orderTotalFee;
                        this.pro = res.shippingAddress;
                    });
            },
        	handleSubmit (name) {
                this.$axios({
				    method: 'post',
				    url:'/order/'+name+'/'+this.$route.query.orderNo,
				}).then((res)=>{
                    //获取得到alipay信息
                    console.log(res)
					localStorage.setItem('alipay',res)
					let routeData = this.$router.resolve({ name: '/gopay'});
 			     	window.open(routeData.href, '_blank');
			});
            },
        },
           mounted() {
           	    this.wexinpaycheck();
               this.getParams();
          },
          //离开页面时，清空检验支付的计时器
        destroyed: function () {
          	clearTimeout( this.t );
		},
       }
</script>

<style scoped="scoped" lang="scss">
	.pay{
   width:100%;
   padding: 90px 0px;
   background-color: #f2f2f2;
}
.paylist{
    width: 1200px;
    margin: 0 auto;
    background-color: #FFFFFF;
    padding: 83px 60px;
}
.payList{
    border-bottom: 1px solid #c6c6c6;
    padding-bottom: 50px;
}
.pay .payImg{
    float: left;
    width: 100px;
}
.pay .payInformation{
    float: left;
    width: 700px;
    padding-left: 30px;
    position: relative;
    top: -5px;
}
.pay .payprice{
    float: right;
}
.payInformation h4{
    font-size: 24px;
    text-align: left;
    font-weight: 400;
    color: #333333;
    margin-bottom: 10px;
}
.payInformation p{
    font-size: 14px;
    font-weight: 400px;
    color: #666666;;

}
.payInformation .red{
    font-weight: 700;
    color: #FF0000;
}
.payprice{
    font-size: 18px;
    font-weight: 400;
    color: #666666;
}
.payprice p{
    margin-bottom: 30px;
}
.payprice .red strong{
    font-size: 30px;
    font-weight: 400;
}
.payprice .red{
    font-size: 14px;
    font-weight: 400;
    color: #FF0000;
}
.payprice button{
    font-weight: 400;
    font-style: normal;
    color: #666666;
    font-size: 14px;
    background-color: #FFFFFF;
    border: none;
    float: right;
    margin-right: 25px;
}
.pay .payorderdetail{
    margin-top: 15px;
}
.pay .payorderdetail p{
    line-height: 24px;
}
.payorderdetail span{
    float: left;
}
.payorderdetail .detailname{
    width: 100px;
    text-align: left;
    line-height: 24px;
}
.payorderdetail .detailvalue{
    float: left;
    width: 500px;
    text-align: left;
}
.pay .paymethod{
    margin-top: 30px;
    margin-left: 10px;
}
.pay .paymethod h4{
    font-size: 24px;
    text-align: left;
    font-weight: 400;
    font-style: normal;
    color: #666666;
}
.pay .paymethod div{
    margin-top: 35px;
}
.pay .paymethod span{
    margin-right: 15px;
    cursor: pointer;
}
.weixinModal div{
    text-align: center;
}
.weixinModal div img{
    margin-bottom: 20px;
}
</style>
<style>
.weixinModal .ivu-modal-footer{
    display: none;
}
</style>
