<template>
	<!--<div><div class="nav Nav">
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
                        <p>收货信息：姓名 手机号码  地址</p>
                        <div class="payorderdetail">
                            <p>订单详情</p>
                            <p class="clearfix">
                                <span class="detailname">交易金额：</span>
                                <span class="detailvalue"> 1699.00元</span>
                            </p>
                            <p class="clearfix">
                                <span class="detailname">订单号：</span>
                                <span class="detailvalue">  {{orderNo}}</span>
                            </p>
                            <p class="clearfix">
                                <span class="detailname">购买时间：</span>
                                <span class="detailvalue"> 2018年09月12日 16:01:39</span>
                            </p>
                        </div>
                    </div>
                    <div class="payprice">
                        <p>应付总额：<span class="red"><strong>1966</strong>元</span></p>
                        <router-link  :to="{name:'/order/detail',query:{orderNo:this.orderNo}}"> 订单详情</router-link>
                    </div>
                </div>
                <div class="paymethod">
                    <h4>选择以下支付方式付款</h4>
                    <div class="clearfix">
                        <span class="cartIcon iconIcon-weixin" @click="toggletab(1)"></span>
                        <span class="cartIcon iconIcon-zhifubao" @click="toggletab(0)"></span>
                    </div>
                          <div class="pay_content">
                <div v-show=" 0 == num"  class="ali">
                	<form :action="pay" method="post" ref="payfang" id="myForm">
                		<img src="../../../assets/img/alipay.png" @click="handleSubmit('alipay')">
					</form>
                	</div>
                	<div v-show=" 1 == num" >
                		<img :src="verimg"/>
                	</div>
                </div>
                </div>
            </div>

        </div>
		</div>-->
	<div class='zhifu' >
		<div class="pay_info_wrap">
			<div class="scan_code_wrap ">
				<p class="tips_info">订单提交成功，请在<b class="color-blue">半小时</b>以内完成付款！</p>
				<p>订单号：{{orderNo}}<router-link  :to="{name:'/order/detail',query:{orderNo:this.orderNo}}"> 订单详情</router-link></p>
			</div>
		</div>
		<div class="scan_code_wrap">
	  	 	<ul class="pay_tab ">
	  	 		 <li class="alipay " data-target="alipay" @click="toggletab(0)" :class="{checked:0 == num}">
	                <i class="icon icon-alipay"></i>
	                                     支付宝
	            </li>
                <li class="wechat" data-target="wechat" @click="toggletab(1)" :class="{checked:1 == num}"  >
	                <i class="icon icon-wechat"></i>
	                                    微信支付  
	            </li>
       			 </ul>
                <div class="pay_content">
                <div v-show=" 0 == num"  class="ali">
                	<form :action="pay" method="post" ref="payfang" id="myForm">
                		<img src="../../../assets/img/alipay.png" @click="handleSubmit('alipay')">
					</form>
                	</div>
                	<div v-show=" 1 == num" >
                		<img :src="verimg"/>
                	</div>
                </div>
   	 	</div>
     </div>
</template>

<script>
	  export default {
        data () {
            return {
            	payshow:false,
            	orderNo:this.$route.query.orderNo,
            	num:0,
            	verimg:'',
            	pay:this.$axios.defaults.baseURL+'order/alipay/'+this.$route.query.orderNo,
            	t:'',
            }
        },
        methods:{
        	//切换num的值切换支付方式
        	toggletab(num){
        		this.num=num;
        		if(num==1){
        				let urlo=window.location.origin;
        			this.verimg=urlo+'/mall/pc/order/weixin/'+this.$route.query.orderNo;
        		}
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
						//	 _this.t = setTimeout(function(){ _this.wexinpaycheck() }, 1000);
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
	    	getParams () {
	                // 取到路由带过来的参数 
	                let routerParams = this.$route.query.orderNo;
	                // 将数据放在当前组件的数据内
	                this.orderNo = routerParams;
	          },
        	handleSubmit (name) {
                this.$axios({
				    method: 'post',
				    url:'/order/'+name+'/'+this.$route.query.orderNo,
				}).then((res)=>{
					//获取得到alipay信息
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
    width: 200px;
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
</style>
