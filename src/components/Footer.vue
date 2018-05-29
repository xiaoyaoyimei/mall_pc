<template>
  <div class="foot">
    <div class="footer center clearfix ">
        <div class="foot-left fl clearfix ">
            <p>友情链接：</p>
            <a href="http://i.youku.com/i/UMjU0MTI0Njg0?previewpage=1&spm=a2hzp.8244740.0.0 " target="_blank ">
                <img src="../assets/img/link-yk.png" alt=" "></a>
            <a href="http://tieba.baidu.com/f?kw=dxracer&ie=utf-8 " target="_blank "><img src="../assets/img/link-tb.png" alt=" "></a>
            <a href="http://weibo.com/dxracer " target="_blank "><img src="../assets/img/link-wb.png" alt=" "></a>
            <i class="wx"><img src="../assets/img/link-wx.png" alt=" "><img src="../assets/img/weiChat.png" alt="" class="wx-d"></i>
            <a href="https://dxracer.tmall.com " target="_blank "><img src="../assets/img/link-tm.png" alt=" "></a>
            <a href="http://dxracer.jd.com " target="_blank "><img src="../assets/img/link-jd.png" alt=" "></a>
            <a href="http://www.dxraceresports.cn " target="_blank "><img src="../assets/img/link-jf.png" alt=" "></a>
            <div class="wx-d"></div>
        </div>
        <div class="foot-right fr ">
            <div class="inline-block ">
                <img src="../assets/img/phone.png" alt=" ">
            </div>
            <div class="inline-block">
                <p>售前电话：400-990-5033 <br>售后电话：400-829-6033 <br>邮箱：sales@dxracer.com.cn<br></p>

            </div>
            <p>地址：江苏省无锡惠山经济开发区智慧路19号404室</p>
        </div>
    </div>
    <div class="clearfix center copy ">
        <div style="float:left">
            <p>版权所有 &copy; 2017 迪锐克斯DXRacer</p>
            <p style="text-align:left;"><a href="http://www.miitbeian.gov.cn">备案号：苏ICP备17005778号-2</a></p>

        </div>
        <a style="float:right" href="http://a.dxracer.cn">售后服务中心</a>
    </div>
  </div>
</template>

<script>
</script>

<style scoped="scoped"  lang="scss">
 @import '@/styles/color.scss';
 .clearfix:after {content: "."; display: block; height:0; clear:both; visibility: hidden;}
.clearfix { *zoom:1; }
.fr{
    float: right;
}
.fl{
    float: left;
}
.inline-block{
    display:inline-block;
}
.center{
    margin: 0 auto;
    width: 1100px;

}
a { color:#555; text-decoration:none; }

a:hover { text-decoration:none; }
.foot{
  width: 100%;
  margin:0 auto;
  background-color:$color-white;
  z-index:100;
}
 .footer{
    width:1100px;
    margin: 26px auto;
}
.foot-left{
    width:30%;
    position: relative;
}
.foot-left ul img{
    width:86%;
}
.foot-right{
     width:30%;
     text-align:right;
}
.footer .foot-left ul li{
    float: left;
    margin-right:.133rem;
}
.footer .foot-left p{
    line-height: 36px;
}
.copy{
    text-align:center;
}
.banner .swiper-container {
        width: 100%;
        height: 100%;
         padding-top:0;
    }
.banner .swiper-slide {
        background-position: center;
        background-size:  100% 100%;
    }
.banner .arrow-left,.banner .arrow-right{
        font-size:60px;
         top: 46%;
         color: rgba(225,225,225,.9);
    }
.banner .swiper-container .arrow-right{
        right:.8rem;
    }
.banner .swiper-container .arrow-left{
        left:.4rem;
    }

  .footBanner .arrow-left {
  color: rgba(225,225,225,.9);
  text-align: center;
}
.wx img:nth-of-type(2){
  display:none;
}
.footBanner .pagination{
  display:none;
}
 .footBanner .swiper-container {
        width: 96%;
        height: 1.8rem;
        margin: 10px auto;
    }
   .footBanner .swiper-slide {
        text-align: center;
        background-repeat: no-repeat;
    }

</style>