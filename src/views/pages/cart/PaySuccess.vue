<template>
	<div>
		订单支付成功 
		查看已支付订单
	</div>
</template>

<script>
	 export default {
    data () {
      return {
      }
    },
    methods: {
      getParams () {
        // 取到路由带过来的参数 
        let routerParams = this.$route.fullPath
        let n= routerParams.indexOf('?')
        // 将数据放在当前组件的数据内
         let payparams = routerParams.substring(n,this.$route.fullPath.length)
          	this.$axios({
							    method: 'post',
							    url:'/order/alipay/check'+payparams,
								}).then((res)=>{
									if(res.code=='200'){
										localStorage.removeItem('alipay');
										 this.$router.push({ name:'/order/detail',query:{orderNo:res.msg}});
									}
							});
      },
    },
    mounted() {
			this.getParams();
		}
  }
</script>

<style>
</style>