<template>
	<div class="side_bar_wrap">
	<ul class="side_bar_nav">
		<li class="myrui"><span>帮助中心</span></li>
		<li class="side_bar_nav_line"></li>
		<li><span>购物相关</span></li>
		<li ><router-link :to="{path: '/help/gwzn'}" >购物指南  </router-link></li>
		<li ><router-link :to="{path: '/help/psfs'}" >配送方式  </router-link></li>
		<li ><router-link :to="{path: '/help/zffs'}" >支付方式  </router-link></li>
		<li ><router-link :to="{path: '/help/cjwt'}" >常见问题  </router-link></li>
		<li class="side_bar_nav_line"></li>
		<li><span>保修与退换货</span></li>
		<li><router-link :to="{path: '/help/bxzc'}">保修政策 </router-link> </li>
		<li><router-link :to="{path: '/help/thhzc'}">退换货政策</router-link> </li>
		<li><router-link :to="{path: '/help/thhlc'}">退换货流程</router-link> </li>	
		<li><router-link :to="{path: '/help/bxzt'}">保修状态查询</router-link> </li>	
		<li class="side_bar_nav_line"></li>
		<li><span>服务支持</span></li>
		<li><router-link :to="{path: '/help/shfw'}">售后服务 </router-link> </li>
		<li><router-link :to="{path: '/help/xxty'}">线下体验</router-link> </li>
		<li><router-link :to="{path: '/help/azsp'}">安装视频</router-link> </li>	
		<li><router-link :to="{path: '/help/tsjy'}">投诉建议</router-link> </li>	
			<li class="side_bar_nav_line"></li>
		<li><span>关于我们</span></li>
		<li><router-link :to="{path: '/help/gsjs'}">公司介绍 </router-link> </li>
		<li><router-link :to="{path: '/help/scjj'}">商城简介 </router-link> </li>
		<li><router-link :to="{path: '/help/zzzc'}">赞助支持</router-link> </li>	
		<li><router-link :to="{path: '/help/lxwm'}">联系我们</router-link> </li>	
				<li class="side_bar_nav_line"></li>
				<li><span>其他</span></li>
		<li><router-link :to="{path: '/help/fwtk'}">服务条款 </router-link> </li>
		<li><router-link :to="{path: '/help/xyfw'}">信用服务协议 </router-link> </li>
		<li><router-link :to="{path: '/help/zffw'}">支付用户服务协议</router-link> </li>	
		<li><router-link :to="{path: '/help/yszc'}">隐私政策</router-link> </li>	
	</ul>
   </div>
</template>

<script>
</script>
<style scoped="scoped"  lang="scss">
.side_bar_wrap {
    float: left;
    width: 140px;
}
 .side_bar_nav  li{
 	 line-height: 28px;
 	 color:#333;
	  a{
		    font-size: 12px;
	    color: #333;
	    position: relative;
	}
}
 .side_bar_nav  li .router-link-active{
	color:#2D8cF0;
	
}
.side_bar_nav_line{
	    border-bottom: #e3e3e3 1px solid;
    width: 140px;
    margin: 30px 0 17px -10px;
    }
     .side_bar_nav span{
    	 font-weight: 600;
    margin-bottom: 10px;
    
}
.side_bar_nav .myrui{
	color:#0099ff
}
</style>
