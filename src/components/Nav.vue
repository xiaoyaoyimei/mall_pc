<template>
	<div class="nav">
		<div class="main-width clearfix">
			<router-link to="/index" class="logo fl"><img src="../assets/img/logo-red.png"></router-link>
			<ul class="nav_title fl">
				<li v-for="(item,index) in type" :key="index" v-if="item.status=='Y'">
					<router-link :to="{ path: '/sort',query:{typeid:item.id,typeindex:index} }"> {{item.typeName}}</router-link>
				</li>
				<!--	<li> <router-link >选款建议</router-link></li>-->
			</ul>
			<div class="search_wrap fr"><input v-model.trim="keyword">
				<button class="search_btn" @click="gosearch()"><i class="icon-new icon-search"></i></button></div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				opt_search_hover: false,
				type: [],
				v:0
			}
		},
		methods: {
			getType() {
				this.$axios({
					method: 'GET',
					url: '/product/type',
				}).then((res) => {
					this.type = res;
				})
			},
			gosearch() {
				//用版本控制$route
				this.v+=1;
				this.$router.push({
					path: '/sort',
					query: {
						keyword: this.keyword,
						v:this.v
					}
				});
			},
		},
		mounted() {
			this.getType();
		},
	}
</script>

<style scoped="scoped">
	li .router-link-exact-active {
		color: #FF0037
	}
	
	.nav .main-width {
		overflow: hidden;
	}
</style>