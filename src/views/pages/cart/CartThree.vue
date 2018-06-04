<template>
	<div class='zhifu' >
		<div class="pay_info_wrap">
			<div class="scan_code_wrap ">
				<p class="tips_info">订单提交成功，请尽快付款！</p>
				<p>订单号：{{orderNo}}<router-link  :to="{name:'/order/detail',query:{orderNo:this.orderNo}}"> 订单详情</router-link></p>
			</div>
		</div>
		<div class="scan_code_wrap">
		  	 	<ul class="pay_tab js_pay_tab">
		  	 		 <li class="alipay " data-target="alipay" @click="toggletab(0)" :class="{checked:0 == num}">
		                <i class="icon-alipay"></i>
		                                             支付宝
		            </li>
                    <li class="wechat" data-target="wechat" @click="toggletab(1)" :class="{checked:1 == num}">
		                <i class="icon-wechat"></i>
		                                                            微信支付
		            </li>
           			 </ul>
                    <div class="pay_content">
                    <div v-show=" 0 == num"  class="ali">
                    		<img src="../../../assets/img/alipay.png" @click="handleSubmit()">
                    	</div>
                    	<div v-show=" 1 == num" >
                    		<img src="../../../assets/img/weiChat.png">
                    	</div>
                    </div>
		<div id="zhifu" ref="zhifu"></div>
    	</Form>
    </div>
     </div>
</template>

<script>
	  export default {
        data () {
            return {
            	payshow:false,
            	orderNo:'',
            	num:0,
            }
        },
        methods:{
        	//切换num的值切换支付方式
        	toggletab(num){
        		this.num=num;
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
        	handleSubmit () {
        		
                this.$axios({
				    method: 'post',
				    url:'/order/alipay/'+this.orderNo,
				}).then((res)=>{
					this.$refs['zhifu'].innerHTML=res;
					document.getElementsByName('punchout_form')[0].submit()
				});
            },
        },
           mounted() {
               this.getParams();
          }
       }
</script>

<style scoped="scoped" lang="scss">
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
.pay_content{
    background-color: #fff;
    border: 1px solid #e9e9e9;
    margin-top: -6px;
    height: 480px;
    margin-bottom: 40px;
    	div{
    		  display: flex;
    justify-content: center;
    height: 100%;
    img{
    	align-self: center;
    }
    	}
    }
    .pay_tab .checked {
    	height: 61px;
    background-color: #fff;
    border-bottom: 1px solid #fff;
    margin-bottom: -1px;
}
.ali img{
	cursor: pointer;
}
</style>
