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
						<div class="rec_wrap" >
					    <div class="newpd">
							<router-link class='Sa' :to="{path: '/newchannel'}"   >
								<img class="photo" src="../../assets/img/xppd.jpg" >
									</router-link>
								<router-link class="Sa"  :to="{path: '/seckill'}"   >	  
								<img class="photo" src="../../assets/img/miao.png">
								</router-link>
						</div>
						</div>
						<div class="floor_tit floor_tit_1">
							<h2>推荐产品</h2>
						</div>
			<div class="floor floor_2">
						<div class="product product_1" v-for="(item,index) in proList" :key="index" v-if="(index % 5 == '0')" >
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
							<a class="btn btn_buy" href="/detail/index?itemid=1000000000100511155557&amp;mtag=30022.1485.1">立即购买</a>
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
							<div class="price_wrap">¥<span class="price">699.00</span></div>
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
      if (
        localStorage.getItem("token") != undefined &&
        localStorage.getItem("token") != ""
      ) {
        this.loginflag = false;
      }
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
          console.log(this.proList);
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
.cat_menu_wrap {
  position: relative;
  z-index: 2;
  float: left;
  width: 220px;
}
.cat_list {
  position: relative;
  background: rgba(0, 0, 0, 0.6);
  border-top: 1px solid #b9bec1;
  border-top: none;
  padding: 16px 0;
  *background: #41525b;
  background: #41525b �;
  z-index: 2;
}
dl {
  margin: 0;
  padding: 0;
  vertical-align: baseline;
}
.cat_item_tit_first {
  border-top: none;
}
.cat_item_tit {
  position: relative;
  height: 56px;
  line-height: 56px;
  padding-left: 72px;
  color: #333;
  overflow: hidden;
}
.cat_item_tit .ico_cat {
  background-image: url(//img.mdcdn.cn/pc/img/mall/index_sprite.png?t=201701032);
  background-repeat: no-repeat;
}
.cat_item1 .ico_cat {
  background-position: 0 0;
}
.cat_item_tit .ico_cat {
  position: absolute;
  left: 21px;
  top: 14px;
  width: 30px;
  height: 30px;
}
.cat_name {
  color: #ffffff;
}
.cat_des {
  margin-left: 10px;
  color: #f0f0f0;
  opacity: 0.5;
}
.cat_submenu {
  width: 700px;
  position: absolute;
  top: -1px;
  left: -100000px;
  width: 380px;
  height: 480px;
  overflow: hidden;
  background: #fff;
  border-top: 1px solid #f4f4f4;
  box-shadow: 8px 8px 10px rgba(0, 0, 0, 0.1);
  -webkit-transition: width 0.2s ease-in;
  -moz-transition: width 0.2s ease-in;
  -ms-transition: width 0.2s ease-in;
  -o-transition: width 0.2s ease-in;
  transition: width 0.2s ease-in;
}
.cat_submenu_col2 {
  float: left;
  height: 480px;
}
.cat_submenu_col2 .hotcat_list {
  padding: 24px 0px 0 16px;
  width: 220px;
  float: left;
  box-sizing: border-box;
  *width: 204px;
  max-height: 456px;
  overflow: hidden;
}
.cat_submenu_col2 .hotcat_item {
  margin-bottom: 14px;
}
.cat_submenu_col2 .hotcat_item a {
  display: inline-block;
  height: 40px;
  line-height: 40px;
}
.cat_submenu_col2 .hotcat_item .category_img {
  width: 32px;
  height: 32px;
  margin-right: 16px;
  vertical-align: middle;
  *vertical-align: middle;
}
.cat_submenu_col1 {
  float: left;
  width: 220px;
  *width: 219px;
  height: 480px;
  box-sizing: border-box;
  overflow: hidden;
  border-left: 1px solid #f4f4f4;
}
.cat_submenu_col1 .goods_list {
  margin-top: -1px;
}
.cat_submenu_col1 .goods_item:first-child {
  border-top: 0;
}
.goods_list .goods_item {
  position: relative;
}
.cat_submenu_col1 .goods_item {
  float: left;
  border-top: #f4f4f4 solid 1px;
  *width: 220px;
  *height: 120px;
  box-sizing: border-box;
}
.cat_submenu_col1 .goods_link {
  display: block;
  width: 220px;
  height: 120px;
  *width: 180px;
  padding: 20px 0;
  overflow: hidden;
  box-sizing: border-box;
}
.cat_submenu_col1 .goods_img {
  margin-left: 12px;
  top: 0;
  width: 80px;
  height: 80px;
  float: left;
  -webkit-transition: all 0.2s ease-in;
  -moz-transition: all 0.2s ease-in;
  -ms-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}
.cat_submenu_col1 .goods_name {
  margin-top: 18px;
  display: block;
  padding: 0 9px;
  *padding-top: 16px;
  max-height: 34px;
  *max-height: 32px;
  line-height: 16px;
  overflow: hidden;
}
.price_color {
  color: #ff6600;
}
.cat_submenu_col1 .price_wrap {
  display: block;
  padding: 0 9px;
  margin-top: 2px;
}
.cat_submenu_col1 .price_wrap,
.operate_wrap li .operate_name,
.operate_wrap li .operate_tip {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cat_submenu_col1 .price_wrap,
.operate_wrap li .operate_name,
.operate_wrap li .operate_tip {
  white-space: nowrap;
}
.operate_wrap {
  width: 220px;
  float: left;
  font-size: 14px;
  border-left: 1px solid #f4f4f4;
  height: 480px;
  overflow: hidden;
}
.operate_wrap li:first-child {
  border-top: 0;
}
.operate_wrap li {
  padding: 28px 50px;
  text-align: center;
  border-top: 1px solid #f4f4f4;
  height: 240px;
  *height: 185px;
  box-sizing: border-box;
}
.operate_wrap li img {
  width: 120px;
  height: 120px;
}
.operate_wrap li .operate_name {
  margin-top: 22px;
}
.operate_wrap li .operate_tip {
  margin-top: 5px;
  font-size: 12px;
  color: #999999;
}
.cat_item_hover .cat_submenu {
  display: block;
  left: 220px;
  width: 441px;
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
.floor_1 .product_1 {
  left: -1px;
  width: 550px;
  height: 680px;
}
.floor .product {
  position: absolute;
  border: 1px solid #e0e0e0;
}
.floor_1 .product_1 .url,
.floor_1 .product_1 .mask,
.floor_1 .product_1 .cover {
  width: 550px;
  height: 680px;
}
.floor .url,
.floor .photo,
.floor .title,
.floor .price_wrap {
  display: block;
}
.floor_1 .product_1 .photo,
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
.floor_1 .product_1,
.floor_1 .product_2,
.floor_1 .product_3 {
  top: -1px;
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
.floor_1 .product_2,
.floor_1 .product_3,
.floor_1 .product_4,
.floor_1 .product_5 {
  width: 275px;
  height: 341px;
}
.floor_1 .product_2 .url,
.floor_1 .product_2 .mask,
.floor_1 .product_2 .cover,
.floor_1 .product_3 .url,
.floor_1 .product_3 .mask,
.floor_1 .product_3 .cover,
.floor_1 .product_4 .url,
.floor_1 .product_4 .mask,
.floor_1 .product_4 .cover,
.floor_1 .product_5 .url,
.floor_1 .product_5 .mask,
.floor_1 .product_5 .cover {
  width: 275px;
  height: 340px;
}
.floor_1 .product_2,
.floor_1 .product_4 {
  left: 548px;
}
.floor_1 .product_3,
.floor_1 .product_5 {
  left: 822px;
}
.floor_1 .product_4,
.floor_1 .product_5 {
  top: 339px;
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
.newpd{
	// background: #e0e0e0;
}
</style>