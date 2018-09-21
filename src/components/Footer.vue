<template>
	<div>
  <!--<div class="foot">
    <div class="footer main-wdith">
        <ul class="Ftitle clearfix">
            <li class="footerPaddingleft"><img src="../assets/img/zp.png"></li>
            <li><img src="../assets/img/sf.png"></li>
            <li><img src="../assets/img/jd.png"></li>
            <li><img src="../assets/img/qg.png"></li>
        </ul>
        <ol class="Ftitle1 clearfix">
            <li class="li1">
                <ul class="footerList">
                    <li>
                        <h4>购物相关</h4>
                       <p><router-link :to="{path: '/help/gwzn'}" >购物指南  </router-link></p>
										<p><router-link :to="{path: '/help/psfs'}" >配送方式  </router-link></p>
										<p><router-link :to="{path: '/help/zffs'}" >支付方式  </router-link></p>
										<p><router-link :to="{path: '/help/cjwt'}" >常见问题  </router-link></p>
                    </li>
                    <li>                        
                        <h4>保修与退换货</h4>
                        <p><router-link :to="{path: '/help/bxzc'}">保修政策 </router-link> </p>
												<p><router-link :to="{path: '/help/thhzc'}">退换货政策</router-link> </p>
												<p><router-link :to="{path: '/help/thhlc'}">退换货流程</router-link> </p>	
												<p><router-link :to="{path: '/help/bxzt'}">保修状态查询</router-link> </p>	
                    </li>
                    <li>
                        <h4>服务支持</h4>
                       		<p><router-link :to="{path: '/help/shfw'}">售后服务 </router-link> </p>
													<p><router-link :to="{path: '/help/xxty'}">线下体验</router-link> </p>
													<p><router-link :to="{path: '/help/azsp'}">安装视频</router-link> </p>	
													<p><router-link :to="{path: '/help/tsjy'}">投诉建议</router-link> </p>	
                    </li>
                    <li>
                        <h4>关于我们</h4>
                    		<p><router-link :to="{path: '/help/gsjs'}">公司介绍 </router-link> </p>
													<p><router-link :to="{path: '/help/scjj'}">商城简介 </router-link> </p>
													<p><router-link :to="{path: '/help/zzzc'}">赞助支持</router-link> </p>	
													<p><router-link :to="{path: '/help/lxwm'}">联系我们</router-link> </p>	
                    </li>
                </ul>
            </li>
             <li class="li2">
                <h3 class="blue">0510-83599633</h3>
                <p class="li2p">周一至周六</p>
                <p class="li3p">9:00-17:30</p>
                <p class="li4p"><img src="../assets/img/comments.png">联系在线客服</p>
                <p class="li5p">©DXRACER 苏ICP备17005778号-2 </p>
            </li>
        </ol>
    </div>-->
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
					<dd><a href="javascript:void(0)">关于运输</a></dd>
					<dd><a href="javascript:void(0)">
						安装方式</a></dd>
					<dd><a href="javascript:void(0)">
						售后政策</a></dd>
				</dl>
				<dl><dt>帮助中心</dt>
					<dd><a href="javascript:void(0)">账户管理</a></dd>
					<dd><a href="javascript:void(0)">

						购物指南</a></dd>
					<dd><a href="javascript:void(0)">
						关于发票</a></dd>
				</dl>
				<dl><dt>关于品牌</dt>
					<dd><a href="javascript:void(0)">了解迪瑞克斯</a></dd>
					<dd><a href="javascript:void(0)">

						加入迪瑞克斯</a></dd>
				</dl>
				<dl><dt>特色服务</dt>
					<dd><a href="javascript:void(0)">DIY定制</a></dd>
					<dd><a href="javascript:void(0)">优惠码通道</a></dd>
					<dd><a href="javascript:void(0)">查询真伪</a></dd>
				</dl>
				<dl><dt>DX全球</dt>
					<dd><a href="javascript:void(0)">USA</a></dd>
					<dd><a href="javascript:void(0)">JAPAN</a></dd>
					<dd><a href="javascript:void(0)">KOREA</a></dd>
				</dl>
				<hr class="ml60">
				<div class="fr linkus">
					<h1>400-990-5033</h1>
					<p>周一至周六 9:00-17:30
					</p>
					<p>(仅收市话费)</p><button>联系在线客服</button>
					<div class="pr"><i class="icon-new icon-wechat"></i><i class="icon-new icon-webo"></i><i class="icon-new icon-youku"></i></div>
				</div>
			</div>

		</div>
    <div class="bottom">
			<div class="main-width bottom-con"><img class="fl"  src="../assets/img/logo-red.png">
				<div class="bottom-dtl">
					<p>
						<a href="">服务协议 </a> |
						<a href="" class="ml10"> 隐私声明</a>© 2018 迪瑞克斯DXRacer</p>
					<p>本网站所列数据，除特殊说明，所有数据均出自我司实验室测试</p>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
</script>

<style scoped="scoped"  lang="scss">
 .clearfix:after {content: "."; display: block; height:0; clear:both; visibility: hidden;}
.fr{
    float: right;
}
.fl{
    float: left;
}
.foot{
    width: 100%;
    background-color: rgb(25, 25, 25);
    height: 400px;
    max-width: 1920px;
    padding-top: 50px;
}
.foot .footer .Ftitle{
    padding-bottom: 30px;
    border-bottom: 1px solid rgb(43, 43, 43);
    padding-left: 90px;
}
.foot .footer .Ftitle li{
    float: left;
    width:25%;
    text-align: left;
}
.foot .footer .Ftitle1{
    padding-left: 90px;
    padding-top: 40px;
}
.foot .footer .Ftitle1 li{
    float: left;
}
.foot .footer .Ftitle1 .li1{
    width: 60%;
}
.foot .footer .Ftitle1 .li1 .footerList li{
    color: white;
    width: 20%;
    
}
.foot .footer .Ftitle1 .li1 .footerList li h4{
    width:100%;
    min-width:140px;
    height: 40px;
    font-size: 16px;
    color: rgb(255, 255, 255)
}
.foot .footer .Ftitle1 .li1 .footerList li p{
    width:100%;
    min-width:140px;
    height: 30px;
    line-height:30px;
    font-size: 12px;
    color: rgb(153, 153, 153)
}
.foot .footer .Ftitle1 .li2{
    width: 40%;
    text-align: center;
}
.foot .footer .Ftitle1 .li2 .blue{
    color: rgb(0, 153, 255);
    font-size: 24px;
    line-height: 24px;
}
.foot .footer .Ftitle1 .li2 .li2p{
    padding: 10px 0px;
    line-height: 12px;
    font-size: 13px;
    color: rgb(153, 153, 153)
}
.foot .footer .Ftitle1 .li2 .li3p{
    padding-bottom: 10px;
    line-height: 12px;
    font-size: 13px;
    color: rgb(153, 153, 153)
}
.foot .footer .Ftitle1 .li2 .li4p{
    padding: 10px;
    padding-top: 15px;
    line-height: 12px;
    font-size: 13px;
    color: rgb(0, 153, 255);
    border: 1px solid rgb(0, 153, 255);
    width:150px;
    margin: 0 auto;
}
.foot .footer .Ftitle1 .li2 .li4p img{
    vertical-align: middle;
    margin-right: 10px;
}
.foot .footer .Ftitle1 .li2 .li5p{
    margin-top: 20px;
    font-size: 10px;
}
a{
	color:#fff
}
</style>