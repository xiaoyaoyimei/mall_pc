<template>
	<div class='zhifu' >
		<div class="Mycar">
			<h3 class="center ">订单支付</h3>
		</div>
		<!-- <div class="M_main center clearfix">
		    <div class="M_nav">
				<ul class="fl">
					<li class="S_iconCar">
						<div><i></i><b class="red">购物车</b></div> <span></span></li>
					<li class="S_iconCount">
						<div><i></i><b class="red">结算</b></div> <span></span></li>
					<li class="S_iconPay">
						<div><i></i><b class="red">支付</b><span></span></div>
					</li>
					<li class="S_iconSucceed">
						<div><i></i><b>支付成功</b></div>
					</li>
				</ul>
    		</div>
		</div> -->
		  <Form ref="formValidate" action='/order/' :model="formValidate" :rules="ruleValidate">
		  	 <FormItem  prop="payType">
			  <ul class="order-list">
			  	<li><img  src="../../../assets/img/weipay.png"><i><input type="radio" name="zffs" v-model="formValidate.payType" value="wepay"> </i></li>
			  	<li><img  src="../../../assets/img/pay.png"><i><input type="radio" name="zffs"  v-model="formValidate.payType" value="alipay" > </i></li>
			  </ul>
		  </FormItem>
		    <Button type="success" long  @click="handleSubmit('formValidate')">去支付</Button>
    	</Form>
    	<!--<form ref="formValidate"  action='/order/'>
			  <ul class="order-list">
			  	<li><img  src="../../../assets/img/we.png">微信支付<i><input type="radio" name="zffs" v-model="formValidate.payType" value="wepay"> </i></li>
			  	<li><img  src="../../../assets/img/alipay.png">支付宝支付<i><input type="radio" name="zffs"  v-model="formValidate.payType" value="alipay" > </i></li>
			  </ul>
		    <button type="submit" >去支付</button>
    	</form >-->
    	<div id="zhifu" ref="zhifu"></div>
     </div>
</template>

<script>
	 export default {
        data () {
            return {
            	orderNo:'',
            	formValidate:{
            			payType:'',
            	},
            	ruleValidate: {
                    payType: [
                        { required: true, message: '请选择支付方式', trigger: 'blur' }
                    ],
                   }
            }
        },
        methods:{
	    	getParams () {
	                // 取到路由带过来的参数 
	                let routerParams = this.$route.params.orderNo;
	                // 将数据放在当前组件的数据内
	                this.orderNo = routerParams;
	          },
         handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$axios({
						    method: 'post',
						    url:'/order/'+this.formValidate.payType+'/'+this.orderNo,
						}).then((res)=>{
							this.$refs['zhifu'].innerHTML=res;
							document.getElementsByName('punchout_form')[0].submit()
						});
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
        },
           mounted() {
               this.getParams();
          }
       }
</script>

<style>
.zhifu{
	width: 100%;
	max-width: 1100px;
	margin: 0 auto;
	min-height: 700px;
}
.m_header_bar{
	padding: 20px 0px;
}
.m_header_bar_title{
	font-size: 16px;
}
.order-list{
	overflow: hidden;
}
.order-list li{
	height: 70px;
	line-height: 70px;
}
.order-list li img{
	height: 60px;
	width: 180px;
}
.order-list li i{
	height: 70px;
	line-height: 70px;
	float: right;
}
</style>
