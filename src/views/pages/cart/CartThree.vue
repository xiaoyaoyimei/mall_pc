<template>
	<div class='zhifu' >
		<div class="pay_info_wrap">
			<div class="scan_code_wrap ">
				<p class="tips_info">订单提交成功，请尽快付款！</p>
				<p>订单号：{{orderNo}}<router-link  :to="{name:'/order/detail',query:{orderNo:this.orderNo}}"> 订单详情</router-link></p>
			</div>
		</div>
		<div class="scan_code_wrap">
		  <Form ref="formValidate" action='/order/' :model="formValidate" :rules="ruleValidate">
		  	 <FormItem  prop="payType">
		  	 	<ul class="pay_tab js_pay_tab">
                        <li class="wechat" data-target="wechat">
                <i class="icon-wechat"></i>
                                               微信支付
            </li>
            <li class="alipay " data-target="alipay">
                <i class="icon-alipay"></i>
                                                     支付宝
            </li>
                    </ul>
                    <div class="js_target_wrap">
                    	
                    </div>
			  <!--<ul class="payType">
			  	<li><img  src="../../../assets/img/wechatpay.png">
			  	<i><input type="radio" name="zffs" v-model="formValidate.payType" value="wepay"> </i></li>
			  	<li><img  src="../../../assets/img/zhifubao.png"><i><input type="radio" name="zffs"  v-model="formValidate.payType" value="alipay" > </i></li>
			  </ul>-->
		  </FormItem>
		    <Button type="success" long  @click="handleSubmit('formValidate')">去支付</Button>
    	</Form>
    </div>
    	<div id="zhifu" ref="zhifu"></div>
     </div>
</template>

<script>
	  export default {
        data () {
            return {
            	payshow:false,
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
        	 handleSubmit () {
                this.$refs['formValidate'].validate((valid) => {
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

<style scoped="scoped">
	ul,li{
		margin: 0;
		padding: 0;
	}
.pay_info_wrap{
	background: #fff;
}
.scan_code_wrap{
	    padding: 20px 0 12px;
	    width: 990px;
       margin: 0 auto;
}
.scan_code_wrap  p a{
	margin-left: 20px;
}
.tips_info{
    font-size: 16px;
    font-weight: 700;
    color: #333;
    }
    .pay_tab{
    	border-width: 1px 1px 1px 0;
    	border-style: solid;
    	border-color:#e9e9e9;
        display: inline-block;
        }
    .pay_tab li {
    float: left;
    position: relative;
    width: 196px;
    height: 60px;
    line-height: 60px;
    font-size: 14px;
    text-align: center;
    background-color: #fafafa;
    cursor: pointer;
    z-index: 1;
        
    border-left: 1px solid #e9e9e9;
    color: #666;
}
.pay_tab .icon-wechat {
    background-position: -277px -275px;
    width: 27px;
    height: 24px;
}
.pay_tab i {
	background:url(../../../assets/img/payway.png) no-repeat scroll 0 0;
    position: relative;
    top: 6px;
    margin-right: 6px;
    display: inline-block;
}
.pay_tab .icon-alipay {
    background-position: -368px -275px;
    width: 24px;
    height: 24px;
}
 .js_target_wrap{
    background-color: #fff;
    border: 1px solid #e9e9e9;
    margin-top: -13px;
    height: 480px;
    margin-bottom: 40px;
    }
</style>
