<template>
	<div class="order">
		<h2><router-link  to="/user/myinfo"><Icon type="ios-arrow-thin-left"></Icon></router-link>修改昵称 <span  @click="handleNick">保存</span></h2>
		<div>
	     <Input type="text" v-model="name" placeholder="请输入昵称" >
	     </Input>
	     <span class="color-gray">2-40个字符，可由中英文、数字、"_"、"-"组成</span>
		</div>
	</div>
</template>

<script>
  export default {
    data () {
      return {
        name: ''
      }
    },
    methods: {
      getParams () {
        // 取到路由带过来的参数 
        let routerParams = this.$route.query.nickname
        // 将数据放在当前组件的数据内
        this.name = routerParams
      },
      handleNick(){
      	var self=this;
	      	this.fang_.editUser(self,{'nickName':this.name});
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
