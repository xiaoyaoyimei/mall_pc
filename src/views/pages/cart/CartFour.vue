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

<style>
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
.center {
    margin: 0 auto;
    width: 1100px;
    /* background-color: pink; */
    /* height: 100px; */
}
.M_main .M_nav {
    height: 106px;
    background-color: #E5E5E5;
    margin: 16px 0;
    padding: 22px 76px;
}
.M_main .M_nav ul {
    text-align: center;
}
.fl {
    float: left;
}
.M_main .M_nav ul li {
    float: left;
    position: relative;
    margin-right: 245px;
}
.M_main .M_nav ul li div {
    width: 50px;
}
.M_main .M_nav ul li div i {
    display: block;
    width: 46px;
    height: 46px;
}
 .clearfix:after {content: "."; display: block; height:0; clear:both; visibility: hidden;}
.clearfix { *zoom:1; }
.S_iconCar i {
    background: url(../../../assets/img/spring1.png) 0px -6px no-repeat;
}
.S_iconCount i {
    background: url(../../../assets/img/spring1.png) 0px -60px no-repeat;
}
.S_iconPay i {
    background: url(../../../assets/img/spring1.png)  0px -120px no-repeat;
}
.S_iconSucceed i {
    background: url(../../../assets/img/spring1.png) -3px -174px no-repeat;
}
.M_main .M_nav ul .S_iconSucceed{
  margin-right: 0px;
}
.M_main .M_nav ul li div b {
    display: block;
    line-height: 30px;
}
.red {
    color: #E50011;
}
.M_main .M_nav ul li span {
    float: left;
    display: block;
    width: 275px;
    background-color: #CBCBCB;
    height: 1px;
    position: absolute;
    top: 20px;
    left: 46px;
}
.S_info {
    margin: 50px 260px;
}
.S_info h4 {
    font-size: 16px;
    font-weight: 900;
    line-height: 36px;
}
.S_info h4 i {
    position: relative;
    top: 10px;
    display: inline-block;
    width: 47px;
    height: 37px;
    background: url(../../../assets/img/spring1.png) -3px -250px no-repeat;
}
.S_info p {
    font-size: 14px;
    line-height: 36px;
}
a{
  color: #555;
}
</style>