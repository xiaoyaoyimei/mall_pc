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
				<div class="search_wrap fr"><input v-model="keyword" >
					<button class="search_btn" @click="gosearch()"><i class="icon-new icon-search"></i></button></div>
			</div>
		</div>
</template>

<script>
//    import Bus from '@/assets/js/bus.js'
	 export default {
        data () {
            return {
              keyword: '',
              opt_search_hover:false,
            }
        },
		methods:{
			
			gosearch(){
//<<<<<<< HEAD
//				 console.log('离开A页面了。')
////     Bus.$emit('get', {
////      keyword:this.keyword
////    })
// Bus.$emit('get', this.keyword)
//
//              this.$router.push({path: '/sort',query:{keyword:this.keyword}});  
//          },
//      },

				this.$router.push({path: '/sort',query:{keyword:this.keyword}});
				console.log('A页面'+this.keyword);
				this.$bus.$emit('val', this.keyword)  
            },
		},
		beforeDestroy () {
				this.$bus.$off('val')
		},
    }
</script>

<style>
</style>