<template>
<div class="zhifu">
<div class="Mycar">
    <h3 class="center ">订单支付</h3>
</div>
<div class="M_main center clearfix">
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
                <div><i></i><b class="red">支付成功</b></div>
            </li>
        </ul>
    </div>
 
    <div class="S_info">
        <h4><i> </i>订单已支付成功</h4>
        <p>您的订单号<a href="#" class="red"></a><a>已提交给工作人员，我们会尽快给您安排发货。</a></p><a>
    </a></div><a>
</a></div>
</div>
</template>

<script>
	 export default {
    data () {
      return {
        pay: ''
      }
    },
    methods: {
      getParams () {
      	// debugger
        // // 取到路由带过来的参数 
        // let routerParams = this.$route.fullPath
        // let n= routerParams.indexOf('?')
        // // 将数据放在当前组件的数据内
        // this.pay = routerParams.substring(n)
        //   	this.$axios({
				// 			    method: 'post',
				// 			    url:'/order/alipay/check'+this.pay,
				// 				}).then((res)=>{
				// 					if(res.code=='200'){
				// 							this.$router.push({push:'/order/detail',params:{orderNo:res.msg}})
				// 					}
				// 			});
      },
    },
    watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      '$route': 'getParams'
    },
    mounted() {
			this.getParams();
		}
  }
</script>

<style scoped="scoped">
.zhifu{
  min-height: 600px;
}
.Mycar {
    border-bottom: 1px solid #e7e7e7;
}
.Mycar h3 {
    font-size: 18px;
    font-weight: 900;
    line-height: 34px;
    height: 34px;
}
</style>