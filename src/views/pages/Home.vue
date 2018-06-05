<template>
<div class="index1">
	<div class="index">
		<div class="side_nav_wrap clear" style="">
						<Carousel
						v-model="value3"
						:autoplay="setting.autoplay"
						:autoplay-speed="setting.autoplaySpeed"
						:dots="setting.dots"
						:radius-dot="setting.radiusDot"
						:trigger="setting.trigger"
						:arrow="setting.arrow" class="banner">
                <CarouselItem  v-for="(item, index) in Items"  :key="index">
                        <div class="demo-carousel"><img :src="imageSrc+item.phoneUrl"></div>
                </CarouselItem>
						</Carousel>
					</div>
					<div class="rec_wrap" >
							<ul v-for="(item,index) in aditems"  :key="index">
								<li >
                    <router-link class="url" :to="{name: '/typesort',params:{type:child.linkUrl}}" tag="span" v-for="(child,index) in item.list"  :key="index">	
                        <img class="photo"  :src="imageSrc+child.imgUrl"  :width="child.proportion | baifenhao" >
                    </router-link>
								</li>
							</ul>
						</div>
            <div v-if="(proList.length > 0)">
                <div class="floor_tit floor_tit_1">
                    <h2>推荐产品</h2>
                </div>
                <div class="floor floor_2">
                    <div v-for="(item,index) in proList" :key="index" v-if="(index % 5 == '0')" class="product product_1"   >
                        <router-link class="url" :title='item.model_name' :to="{ path: '/sort/sortDetail',query:{id:item.id} }">
                            <label class="promotionTitle">{{item.promotionTitle}}</label>
                            <img class="photo" :src='item.model_img |imgfilter'>
                            <span class="price_wrap">¥<span class="price">{{item.sale_price}}</span></span>
                        </router-link>
                        <div class="mask"></div>
                        <div class="cover">
                            <div class="title"></div>
                            <div class="desc"></div>
                            <div class="price_wrap">¥<span class="price">2899.00</span></div>
                            <router-link class="btn btn_buy" href="/detail/index?itemid=1000000000100511155557&amp;mtag=30022.1485.1">立即购买</router-link>
                        </div>
                    </div>
                    <div class="product product_2" v-for="(item,index) in proList" :key="index" v-if="(index % 5 == '1')">
                        <router-link class="url" :title='item.model_name' :to="{ path: '/sort/sortDetail',query:{id:item.id} }">
                            <label class="promotionTitle">{{item.promotionTitle}}</label>
                            <img class="photo" :src='item.model_img |imgfilter'>
                            <span class="title">{{item.model_name}}</span>
                            <span class="price_wrap">¥<span class="price">{{item.sale_price}}</span></span>
                        </router-link>
                        <div class="mask"></div>
                        <div class="cover">
                            <div class="title"></div>
                            <div class="desc"></div>
                            <div class="price_wrap">¥<span class="price">699.00</span>    </div>
                            <a class="btn btn_buy" href="/detail/index?itemid=1000000000100511105558&amp;mtag=30022.1485.2">立即购买</a>
                        </div>
                     </div>
                      <div class="product product_3" v-for="(item,index) in proList" :key="index" v-if="(index % 5 == '2')">
                            <router-link class="url" :title='item.model_name' :to="{ path: '/sort/sortDetail',query:{id:item.id} }">
                                  <label class="promotionTitle">{{item.promotionTitle}}</label>
                                  <img class="photo" :src='item.model_img |imgfilter'>
                                  <span class="title">{{item.model_name}}</span>
                                  <span class="price_wrap">¥<span class="price">{{item.sale_price}}</span></span>
                            </router-link>
                            <div class="mask"></div>
                            <div class="cover">
                                <div class="title">家用五叶静音落地扇 八档风速</div>
                                <div class="desc"></div>
                                <div class="price_wrap">¥<span class="price">269.00</span></div>
                                <a class="btn btn_buy" href="/detail/index?itemid=1000000000100511204453&amp;mtag=30022.1485.3">立即购买</a>
                            </div>
                      </div>
                        <div class="product product_4" v-for="(item,index) in proList" :key="index" v-if="(index % 5 == '3')">
                            <router-link class="url" :title='item.model_name' :to="{ path: '/sort/sortDetail',query:{id:item.id} }">
                                <label class="promotionTitle">{{item.promotionTitle}}</label>
                                  <img class="photo" :src='item.model_img |imgfilter'>
                                  <span class="title">{{item.model_name}}</span>
                                  <span class="price_wrap">¥<span class="price">{{item.sale_price}}</span></span>
                            </router-link>
                            <div class="mask"></div>
                            <div class="cover">
                                  <div class="title">下置隐藏水桶 HEPA空滤 外置沸腾胆</div>
                                  <div class="desc"></div>
                                  <div class="price_wrap">¥<span class="price">1688.00</span></div>
                                  <a class="btn btn_buy" href="/detail/index?itemid=1000000000100511155736&amp;mtag=30022.1485.4">立即购买</a>
                            </div>
                    </div>
                </div>

            </div>

		</div>	
	</div>
</div>
</template>

<script>
export default {
  data() {
    return {
      value3: 0,
      imageSrc: this.global_.imgurl,
      loginflag: true,
      cat_item_hover: false,
      setting: {
        autoplay: false,
        autoplaySpeed: 2000,
        dots: "inside",
        radiusDot: false,
        trigger: "click",
        arrow: "hover"
      },
      Items: [],
      aditems: [],
      productNew: [],
      proList: []
    };
  },
  filters: {
    baifenhao(val) {
      return val + "%";
    }
  },
  methods: {
    leave2() {
      this.cat_item_hover = false;
    },
    enter2() {
      this.cat_item_hover = true;
    },
    getBanner() {
      //判断是否已经登录
      // if (
      //   localStorage.getItem("token") != undefined &&
      //   localStorage.getItem("token") != ""
      // ) {
      //   this.loginflag = false;
      // }
      this.$axios({
        method: "GET",
        url: "/index/poster"
      }).then(res => {
        if (res.code == "200") {
          this.Items = res.object;
        }
      });
      this.$axios({
        method: "GET",
        url: "/index/advert"
      }).then(res => {
        if (res.code == "200") {
          this.aditems = res.object;
        }
      });
      this.$axios({
        method: "GET",
        url: "/index/index/product"
      }).then(res => {
        if (res.code == "200") {
          this.proList = res.object;
          console.log(this.proList)
        }
      });
    }
  },
  mounted() {
    this.getBanner();
  }
};
</script>

<style lang="scss" >
@import "@/styles/color.scss";
.index1 {
  background-color: #ffffff;
}
.index {
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
  min-height: 1000px;
  margin-bottom: 10px;
}
.index .demo-carousel img {
  max-width: 100%;
}
.banner {
  z-index: 1;
  width: 1100px;
  height: 480px;
  position: absolute;
  left: 0;
  margin: 0 auto;
  overflow: hidden;
}
.index .ivu-carousel-arrow.left {
  left: 26px;
}
.side_nav_wrap {
  background: #fff;
}
.side_nav_wrap {
  height: 480px;
  position: relative;
}

.rec_wrap {
  position: relative;
  z-index: 2;
  height: 200px;
  border: 1px solid #e0e0e0;
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: rgb(224, 224, 224);
  overflow: hidden;
  border-top: none;
}
.rec_wrap ul {
  width: 1100px;
}
.rec_wrap li {
  width: 100%;
  border-right: 1px solid #e0e0e0;
}
.rec_wrap li span {
  float: left;
  width: 270px;
  cursor: pointer;
}
.rec_wrap .photo {
  display: block;
  width: 200px;
  height: 180px;
  margin: 15px auto 5px;
  -webkit-transition: all 0.2s ease-in;
  -moz-transition: all 0.2s ease-in;
  -ms-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}
.rec_wrap .photo:hover {
  margin-top: 9px;
}
.floor_tit {
  overflow: hidden;
}

.floor_tit h2 {
  width: 160px;
  margin: 0 auto;
  margin-top: 0px;
  margin-bottom: 0px;
  overflow: hidden;
  background-position: 0 -60px;
}
.floor_tit_1 h2 {
  height: 67px;
  margin-top: 80px;
  margin-bottom: 40px;
  font-size: 20px;
  font-weight: normal;
}
.floor {
  max-width: 1098px;
  border: 1px solid #e0e0e0;
  height: 680px;
  position: relative;
  margin-bottom: -1px;
  overflow: hidden;
}

.floor .product {
  position: absolute;
  border: 1px solid #e0e0e0;
}

.floor .url,
.floor .photo,
.floor .title,
.floor .price_wrap {
  display: block;
}
.floor_2 .product_2 .photo {
  width: 458.33px;
  height: 540.82px;
  margin: 35px auto 10px;
}
.floor .product .photo {
  -webkit-transition: all 0.2s ease-in;
  -moz-transition: all 0.2s ease-in;
  -ms-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
  position: relative;
  top: 0;
}
.floor .photo {
  display: block;
  width: 200px;
  height: 200px;
  margin: 35px auto 40px;
}
.floor .price_wrap {
  font-size: 12px;
  line-height: 12px;
  height: 12px;
  color: #333;
  margin-top: 12px;
  text-align: center;
}

.floor .product {
  position: absolute;
  border: 1px solid #e0e0e0;
}
.floor .title {
  font-size: 14px;
  line-height: 14px;
  height: 14px;
  color: #333;
  text-align: center;
  overflow: hidden;
}
.floor_2 .product_1,
.floor_2 .product_2 {
  top: -1px;
}
.floor_2 .product_1,
.floor_2 .product_3 {
  left: -1px;
}
.floor_2 .product_2 {
  left: 548px;
  width: 550px;
  height: 680px;
}
.floor_2 .product_1 {
  width: 550px;
}
.floor_2 .product_3,
.floor_2 .product_4 {
  top: 338px;
  width: 275px;
  height: 341px;
}
.floor_2 .product_1 .photo {
  width: 495px;
  height: 282px;
  margin: 28px auto;
}
.floor_2 .product_4 {
  left: 273px;
  width: 276px;
}
.floor .mask,
.floor .cover {
  position: absolute;
  top: 0;
  right: 0;
  display: none;
}
.floor_2 .product_1 .url .price_wrap {
  position: absolute;
  bottom: 90px;
  left: 35px;
}
.floor .product:hover .price_wrap,
.floor .product:hover .title {
  color: #f30;
}
.floor .product:hover .photo {
  top: -6px;
}
.promotionTitle{
	position: absolute;
	top:0px;
	left: 0px;
	padding: 0px 20px;
	height: 40px;
	background: #f30;
	line-height: 40px;
	color: #fff;
	z-index: 1000;
}
.Sa{
	width:45%;
	text-align: center;
	display: inline-block;
	margin:0px 2%;

}
.Sa .photo{
	width: 320px;
	margin-top:10px;
}
</style>