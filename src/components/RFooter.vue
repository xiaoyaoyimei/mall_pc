<template>
	<div style="text-align: center;">
	<div class="footer-link">
	<router-link  :to="{ path: '/help/gsjs' }" >关于我们</router-link> | 
	<router-link :to="{ path: '/help/lxwm'}">联系我们</router-link> |
	<router-link :to="{ path: '/help/gwzn'}">操作说明</router-link> |
	<router-link :to="{ path: '/help/fwtk'}">服务协议</router-link> |
	<router-link :to="{ path: '/help/yszc'}">隐私说明</router-link>
	</div>
	 <div class="foot">
		©DXRACER 苏ICP备17005778号-2
  	</div>
  	</div>
</template>

<script>
</script>

<style scoped="scoped">
	.footer-link{
			height: 60px;
	}
	.footer-link,.foot{
				display: flex;
	
		justify-content: center;
		align-items: center;
		font-size: 14px;
	}
	.footer-link a{
		margin-left: 25px;
		margin-right: 25px;
		color: #999999;
	}
	.foot{
		padding-bottom: 20px;
	}
</style>