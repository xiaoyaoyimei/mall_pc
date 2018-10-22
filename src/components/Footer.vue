<template>
	<div >
    <div class="newfooter">
			<div class="main-width clearfix">
				<ul class="fl icon-classes">
					<li><i class="icon-new icon-qi"></i>7天无理由退货</li>
					<li><i class="icon-new icon-express"></i>快速送达</li>
					<li><i class="icon-new icon-freein"></i>免费上门安装</li>
					<li><i class="icon-new icon-outline"></i>线下门店</li>
				</ul>
				<hr>
				<dl><dt>服务支持</dt>
					<dd><router-link :to="{path: '/help/psfs'}" >关于运输</router-link></dd>
					<dd><router-link :to="{path: '/help/azsp'}">
						安装方式</router-link></dd>
					<dd><router-link :to="{path: '/help/shfw'}">
						售后政策</router-link></dd>
				</dl>
				<dl><dt>帮助中心</dt>
					<dd><router-link :to="{path: '/help/cjwt'}" >常见问题  </router-link></dd>
					<dd><router-link :to="{path: '/help/gwzn'}" >购物指南</router-link></dd>
					<!--<dd><a href="javascript:void(0)">
						关于发票</a></dd>-->
				</dl>
				<dl><dt>关于品牌</dt>
					<dd><a href="http://blog.dxracer.cn/" target="_blank"> 
						迪瑞克斯官网</a></dd>
					<dd><router-link :to="{path: '/help/scjj'}">了解迪瑞克斯</router-link></dd>
				</dl>
				<dl><dt>服务支持</dt>
					<dd><router-link :to="{path: '/help/shfw'}">售后服务 </router-link> </dd>
					<dd><router-link :to="{path: '/help/xxty'}">线下体验</router-link></dd>
					<dd><router-link :to="{path: '/help/azsp'}">安装视频</router-link></dd>
				<dd><router-link :to="{path: '/help/tsjy'}">投诉建议</router-link></dd>
				</dl>
				<dl><dt>DX全球</dt>
					<dd><a href="https://www.dxracer.com/us/en-us/">USA</a></dd>
					<dd><a href="https://dxracer.jp/">JAPAN</a></dd>
					<dd><a href="http://www.dxracer.kr/">KOREA</a></dd>
				</dl>
				<hr class="ml60">
				<div class="fr linkus">
					<h1>400-990-5033</h1>
					<p>周一至周六 9:00-17:30
					</p>
					<p>(仅收市话费)</p><!--<button>联系在线客服</button>-->
					<div class="pr"><i class="icon-new icon-wechat"></i>
					<a href="http://weibo.com/dxracer" target="_blank">	<i class="icon-new icon-webo"></i></a>
					<a href="http://i.youku.com/i/UMjU0MTI0Njg0?previewpage=1&spm=a2hzp.8244740.0.0" target="_blank"><i class="icon-new icon-youku"></i></a></div>
				</div>
			</div>

		</div>
    <div class="bottom">
			<div class="main-width bottom-con"><img class="fl"  src="../assets/img/logo-red.png">
				<div class="bottom-dtl">
					<p>
						<router-link :to="{path: '/help/fwtk'}">服务协议 </router-link>|
					<router-link :to="{path: '/help/yszc'}"  class="ml10"> 隐私声明</router-link>© 2018 迪瑞克斯DXRacer</p>
					<p>本网站所列数据，除特殊说明，所有数据均出自我司实验室测试</p>
				</div>
			</div>
		</div>
  </div>
  </div>
</template>

<script>
</script>

<style scoped="scoped"  lang="scss">
</style>