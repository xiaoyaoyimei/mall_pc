<template>
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
        			this.verimg=this.$axios.defaults.baseURL+'order/weixin/'+this.$route.query.orderNo;
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
	ul,li{
		margin: 0;
		padding: 0;
	}
.pay_info_wrap{
	background: #fff;
}
.scan_code_wrap{
	width: 990px;
}
.scan_code_wrap{
	    padding: 20px 0 12px;
       margin: 0 auto;
}

.ali img{
	cursor: pointer;
}
.pay_content div{
	         display: flex;
            justify-content: center;
            height: 100%;
            align-items: center;
            min-height: 480px;
}
.pay_tab .icon-wechat {
    background-position: -68px -37px;
    width: 27px;
    height: 24px;
}
.pay_tab i {
    position: relative;
    top: 6px;
    margin-right: 6px;
}
.pay_tab .icon-alipay {
    background-position: -104px -38px;
    width: 24px;
    height: 24px;
}
</style>
