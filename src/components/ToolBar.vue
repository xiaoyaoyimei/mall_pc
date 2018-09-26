<template>
	<div class="toolbar">
		<ul>
			<router-link v-if="sfloging" to="/login" tag="li"><i class="icon-new icon-user"></i>去登录</router-link>
			<router-link v-else to="/user" tag="li"><i class="icon-new icon-user"></i>个人中心</router-link>
			</li>
			<!--<li><i class="icon-new icon-kefu"></i>联系客服</li>-->
			<router-link to="/cart" tag="li"><i class="icon-new icon-cart"></i>购物车</router-link>
			<li class="mt15" @click="goback()" v-show="searchBarFixed">
				<i class="icon-new icon-back"></i>回到顶部
			</li>
		</ul>
	</div>
</template>

<script>
	import store from '@/store/store'
	export default {
		data() {
			return {
				sfloging: true, //开始未登录
				searchBarFixed: false
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
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
				if(scrollTop > 700) {
					this.searchBarFixed = true
				} else {
					this.searchBarFixed = false
				}
			},
			goback() {
				document.documentElement.scrollTop = 0;
			},
			issfloging() {
				if(this.token != null) {
					this.$axios({
						method: 'post',
						url: '/account',
					}).then((res) => {
						this.sfloging = false;
					});
				}
			},
		},
		mounted() {
			this.issfloging();
			window.addEventListener('scroll', this.handleScroll)
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
		height: 80px;
		border: 1px solid #eee;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: #fff;
		cursor: pointer;
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