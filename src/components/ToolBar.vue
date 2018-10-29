<template>
	<div class="toolbar">
		<ul>
			<router-link v-if="sfloging" to="/login" tag="li">
				<img src="../assets/img/nologin.png"> 
				<span> 去登录</span></router-link>
			<router-link v-else to="/user" tag="li" class="color-red">
				<img src="../assets/img/yeslogin.png">
				<span>个人中心</span>
			</router-link>
			<router-link to="/cart" tag="li">
				<i class="icon-new icon-cart"></i>
				<span>购物车</span>
			</router-link>
			<router-link to="/tousu" tag="li">
				<Icon style="font-size:30px;" type="ios-create" />
				<span>投诉建议</span>
			</router-link>
			<li class="mt15" @click="goback()" v-show="searchBarFixed">
				<i class="icon-new icon-back"></i>
				<span>回到顶部</span>
			</li>
		</ul>
	</div>
</template>

<script>
	import store from '@/store/store'
	import Bus from '@/assets/js/bus.js'
	export default {
		data() {
			return {
				sfloging: true, //开始未登录
				searchBarFixed: false,
				scrollTop:0
			}
		},
		computed: {
			token() {
				//获取store里面的token
				return store.state.token;
			}
		},
		methods: {
			handleScroll() {
				 this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
				if(this.scrollTop > 700) {
					this.searchBarFixed = true
				} else {
					this.searchBarFixed = false
				}
			},
			goback() {
				this.scrollTop = 0;
				document.documentElement.scrollTop=document.body.scrollTop=0
			},
//			issfloging() {
//				 
//					this.$axios({
//						method: 'post',
//						url: '/account',
//					}).then((res) => {
//						this.sfloging = false;
//					});
//			},
		},
		mounted() {
			window.addEventListener('scroll', this.handleScroll)
			  Bus.$on('nologin', (data) => {
			  	this.sfloging=data;
		      });
		},
		destroyed() {
			window.removeEventListener('scroll', this.handleScroll)
		}
	}
</script>

<style scoped="scoped">
	.toolbar {
		position: fixed;
		right: 0;
		top: 200px;
	}
	
	.toolbar li {
		width: 80px;
		padding-top:15px;
		height: 80px;
		border: 1px solid #eee;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: #fff;
		cursor: pointer;
		text-align: center;
		
	}
		.toolbar li img{
			width:30px;
			height: 30px;
		}
		.toolbar li i,.toolbar li img{
			margin-left:25px\9;
			display: block;
		}
	.detailtoolbar li {
		background: #999;
		color: #fff;
	}
	
	.toolbar li:hover {
		background: #313131;
		color: #fff;
	}
	
	.toolbar li:not(:last-child) {
		margin-top: -1px
	}
	
	.toolbar .mt15 {
		margin-top: 15px;
	}
</style>