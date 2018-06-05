<template>
<div class="homepage">
		<div class="side_nav_wrap clear" style="">
			<div class="main-wdith">
			<div class="cat_nav">
				<ul><li>
					<img src="../../assets/img/desk.png">电竞桌
					</li><li><img src="../../assets/img/chair.png">电竞椅</li><li><img src="../../assets/img/custom.png">定制</li><li><img src="../../assets/img/other.png">配件及周边</li></ul>
			</div>
			<Carousel
						v-model="value3"
						:autoplay="setting.autoplay"
						:autoplay-speed="setting.autoplaySpeed"
						:dots="setting.dots"
						:radius-dot="setting.radiusDot"
						:trigger="setting.trigger"
						:arrow="setting.arrow" class="banner">
		                <CarouselItem  v-for="(item, index) in Items"  :key="index">
		                        <div class="demo-carousel"><img :src="item.imgUrl |imgfilter"></div>
		                </CarouselItem>
			</Carousel>
					
					
					<!--<div class="rec_wrap" >
							<ul v-for="(item,index) in aditems"  :key="index">
								<li >
				                    <router-link class="url" :to="{name: '/typesort',params:{type:child.linkUrl}}" tag="span" v-for="(child,index) in item.list"  :key="index">	
				                        <img class="photo"  :src="imageSrc+child.imgUrl"  :width="child.proportion | baifenhao" >
				                    </router-link>
								</li>
							</ul>
						</div>-->
						<div class="floor">
							<h2><p>新品专区</p></h2>
						 <ul class="search_list_wrap clearfix">
			             <li  v-for="(item, index) in productNew" :key='index'>
			               <router-link :to="{ path: '/sort/sortDetail',query:{id:item.id} }" tag="a" >
			                     <img :src=' item.model_img |imgfilter'>
			                </router-link>
			                <div  class="title">
			                      {{item.model_no}}
			                </div>
			                <div class="name">{{item.model_name}}</div>
			                <div v-if="item.promotionTitle !=null" class="sku_tag ">{{item.promotionTitle}}</div> 
			                  <div class="price">
			                           ￥{{item.sale_price|pricefilter}}
			                   </div>
			               </li>
			            </ul>
						</div>
							<div class="floor" v-if="proList.length>0">
							<h2><p>推荐</p></h2>
						 <ul class="search_list_wrap clearfix">
			             <li  v-for="(item, index) in proList" :key='index'>
			               <router-link :to="{ path: '/sort/sortDetail',query:{id:item.id} }" tag="a" >
			                     <img :src=' item.model_img |imgfilter'>
			                </router-link>
			                <div  class="title">
			                      {{item.model_no}}
			                </div>
			                <div class="name">{{item.model_name}}</div>
			                <div v-if="item.promotionTitle !=null" class="sku_tag ">{{item.promotionTitle}}</div> 
			                  <div class="price">
			                       ￥ {{item.sale_price|pricefilter}}
			                   </div>
			               </li>
			            </ul>
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
      loginflag: true,
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
    getBanner() {
      //判断是否已经登录
      if (localStorage.getItem("token") != undefined &&localStorage.getItem("token") != "") {
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
      //新品专区
    	     	this.$axios({
						    method: 'GET',
						    url:'/index/product/new',
						}).then((res)=>{
							if(res.code=='200'){
                             this.productNew=res.object;
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

<style lang="scss"  scoped="scoped">
.cat_nav{
	    position: absolute;
    background: rgba(0, 0, 0, 0.6);
    border-top: none;
    padding: 16px 0;
    z-index: 2;
    width: 220px;
    color: #fff;
    height: 480px;
    li{
    	height: 56px;
    	line-height: 56px;
    	cursor:pointer;
    	img{
    		width: 24px;
		    height: 24px;
		    margin-left: 30px;
		    margin-right: 30px;
		    position: relative;
		    top: 9px;
    	}
    }
    li:hover{
    	 background: rgba(0, 0, 0, 0.6);
    }

}
.homepage{
	background: #fff;
	padding-bottom: 50px;
}
.homepage img{
	max-width: 100%;
}
.floor h2{
	font-size: 30px;
	font-weight: normal;
	text-align: center;
	color:#333;
	height:180px;
	line-height: 180px;
}
.floor .search_list_wrap{
border: 1px solid #ccc;
    padding-top: 30px;}

</style>