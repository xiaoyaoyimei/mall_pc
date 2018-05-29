<template>
	<div class="order">
		<h2><router-link to="/user/myinfo"><Icon type="ios-arrow-thin-left"></Icon> </router-link>修改性别<span  @click="handleNick">保存</span></h2>
		<div class="sex">
			<p @click="handleNick('M')"><span>男</span> <Icon type="checkmark" v-if="'M'==this.sex"></Icon></p>
			<p @click="handleNick('F')"><span>女</span><Icon type="checkmark" v-if="'F'==this.sex"></Icon></p>
			<p @click="handleNick('S')"><span>保密</span><Icon type="checkmark" v-if="'S'==this.sex"></Icon></p>
		</div>
	</div>
</template>

<script>
		 export default {
    data () {
      return {
        sex: ''
      }
    },
    methods: {
      getParams () {
        // 取到路由带过来的参数 
        let routerParams = this.$route.query.sex
        // 将数据放在当前组件的数据内
        this.sex = routerParams
      },
      handleNick(value){
	      	this.$axios({
						    method: 'post',
						    url:'/account/update',
						    data:{"sex":value}
						}).then((res)=>{
							if(res.data.code=='200'){
							// this.$Message.success('性别修改成功');
							 this.$router.push('/user/myinfo')  
							}
						});
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
.sex p{
	height:40px;
	background: #fff;
	border-bottom: 1px solid #eee;
	line-height: 40px;
	display: flex;
	padding:0 10px;
	cursor: pointer;
}
.sex p span{
	flex:1
}
.sex p i{
	position: relative;
	top: 15px;
	color: red;
}
</style>