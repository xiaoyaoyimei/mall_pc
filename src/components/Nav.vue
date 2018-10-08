<template>
	    <div class="nav">
			<div class="main-width clearfix">
				<router-link  to="/index" class="logo fl"><img   src="../assets/img/logo-red.png"></router-link>
				<ul class="nav_title fl">
					<li v-for="(item,index) in type" :key="index" :class="{'none':!item.status}" >
					 <router-link   :to="{ path: '/sort',query:{typeid:item.id,typeindex:index} }"  >{{item.typeName}}</router-link>
					</li>
					<li> <router-link tag="">选款建议</router-link></li>
				</ul>
				<div class="search_wrap fr"><input v-model="keyword" >
					<button class="search_btn" @click="gosearch()"><i class="icon-new icon-search"></i></button></div>
			</div>
		</div>
</template>

<script>
    import Bus from '@/assets/js/bus.js'
	 export default {
        data () {
            return {
              keyword: '',
              opt_search_hover:false,
              type:[]
            }
        },
		methods:{
			getType(){
				     this.$axios({
					method: 'GET',
					url:'/product/type',
				}).then((res)=>{
					for(let i=0;i<res.length;i++){
						if(res[i].status == "Y"){
							res[i].status = true
						}else{
							res[i].status = false
						}
					}
					this.type = res;
					console.log(this.type)
				})
			},
			gosearch(){
				this.$router.push({path: '/sort',query:{keyword:this.keyword}});
				Bus.$emit('val', this.keyword)
            },
		},
			mounted() {
			Bus.$emit('val', this.keyword)
			this.getType();
			},
		beforeDestroy () {
				console.log('A页面beforeDestroy')
				this.$bus.$off('val')
		},
    }
</script>

<style>
.none{
	display: none!important;
}
</style>