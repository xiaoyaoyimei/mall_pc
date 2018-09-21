<template>
	    <div class="nav">
			<div class="main-width clearfix">
				<router-link  to="/index" class="logo fl"><img   src="../assets/img/logo-red.png"></router-link>
				<ul class="nav_title fl">
					<li>LPL赛事用椅</li>
					<li>电竞座椅</li>
					<li>办公座椅</li>
					<li>家居座椅</li>
					<li>新品</li>
					<li>电脑桌</li>
					<li>配件</li>
					<li>选款建议</li>
				</ul>
				<div class="search_wrap fr"><input v-model="keyword" @keyup.enter="gosearch()">
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
            }
        },
		methods:{
			gosearch(){
			    Bus.$emit('val', this.keyword)
                this.$router.push({path: '/sort',query:{keyword:this.keyword}});  
            },
        },
    }
</script>

<style>
</style>