<template>
	<div class="order">
		<router-link tag="h2" to="/user/myinfo"><Icon type="ios-arrow-thin-left"></Icon>修改Email </router-link>
		<span  @click="handleNick">保存</span>
		<div>
	     <Input type="text" v-model="email" placeholder="请输入Email" >
	     </Input>
		</div>
	</div>
</template>

<script>
 export default {
    data () {
      return {
        email: ''
      }
    },
    methods: {
      getParams () {
        // 取到路由带过来的参数 
        let routerParams = this.$route.query.email
        // 将数据放在当前组件的数据内
        this.email = routerParams
      },
      handleNick(){
      	this.fang_.editUser({"email":this.email});
//	      	this.$axios({
//						    method: 'post',
//						    url:'/account/update',
//						    data:{"email":this.email}
//						}).then((res)=>{
//							if(res.data.code=='200'){
//							 this.$Message.success('Email修改成功');
//							}
//						});
      }
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
	.order >span{
	    position: fixed;
    right: 15px;
    top: 15px;
    color: #fff;
    cursor: pointer;
}
.color-gray{
	color:#999;
}
</style>