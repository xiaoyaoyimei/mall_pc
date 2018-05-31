<template>
	<div class='zhifu' >
		<div class="Mycar">
			<h3 class="center ">订单提交成功，请尽快付款！订单号：{{orderNo}}
				<router-link  :to="{name:'/order/detail',query:{orderNo:this.orderNo}}"> 订单详情</router-link>
			</h3>
		</div>
		  <Form ref="formValidate" action='/order/' :model="formValidate" :rules="ruleValidate">
		  	 <FormItem  prop="payType">
			  <ul class="payType">
			  	<li><img  src="../../../assets/img/wechatpay.png">
			  	<i><input type="radio" name="zffs" v-model="formValidate.payType" value="wepay"> </i></li>
			  	<li><img  src="../../../assets/img/zhifubao.png"><i><input type="radio" name="zffs"  v-model="formValidate.payType" value="alipay" > </i></li>
			  </ul>
		  </FormItem>
		    <Button type="success" long  @click="handleSubmit('formValidate')">去支付</Button>
    	</Form>
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

<style>
.zhifu{
	width: 100%;
	max-width: 1100px;
	margin: 0 auto;
	min-height: 700px;
}
.payType{
	background: #fff;
}
</style>
