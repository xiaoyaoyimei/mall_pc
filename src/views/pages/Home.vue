<template>
	<div class="homepage">
		<div class="side_nav_wrap clear" style="">
			<div class="main-wdith">
				<Carousel v-model="value3" :autoplay="setting.autoplay" :autoplay-speed="setting.autoplaySpeed" :dots="setting.dots" :radius-dot="setting.radiusDot" :trigger="setting.trigger" :arrow="setting.arrow" class="banner">
					<CarouselItem v-for="(item, index) in Items" :key="index">
						<div class="demo-carousel">
							<a :href="item.linkUrl"><img :src="item.imgUrl |imgfilter"></a>
						</div>
					</CarouselItem>
				</Carousel>
				<ul class="minipro clearfix">
					<li v-for="(item, index) in basictype" :key='index'>
						<img :src="item.list.img_url |imgfilter">
						<span class="normol">{{item.list.type_name}}</span></li>

				</ul>
				<div class="floor">
					<div class="title">
						<span>热销单品</span></div>
					<ul class="clearfix one">
						<li v-for="(item, index) in hotitem" :key='index'><em>NEW</em>
							<router-link :to="{ path: '/sort/sortDetail',query:{id:item.list.product_id} }" >
							 	<img :src="item.list.img_url | imgfilter" :ref="item.list.id">
							<h6>{{item.list.model_no}}</h6>
							<p>{{item.list.describe1}}</p>
							<span class="color-newred">￥{{item.list.sale_price|pricefilter}}</span>
							</router-link>
							<div class="mn">
								<div class="mn-wrap">
									<div v-for="(child,index) in item.image" @click="switchimg($event,child.listImg,item.list.id)" v-show="child.smallImg!=''"> 
										<img :src="child.smallImg | imgfilter"  >
										</div>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="bg-gray mt40 pb105">
				<div class="main-width">
					<div class="floor">
						<div class="title">
							<div class="seemore fr" > 
							 <router-link :to="{ path: '/sort',query:{homeKeyword:'电竞'} }" >	查看更多
							<i class="icon-new icon-more" ></i>
							 </router-link>
							</div>
							<span>电竞</span></div>
						<div class="two clearfix">
							<div class="ad-wrap fl">
										 <router-link :to="{ path: '/sort/sortDetail',query:{id:gameproductone.product_id} }" ><img :src="gameproductone.img_url |imgfilter">
									<div class="ad ">
										<h5>{{gameproductone.model_no}}</h5>
										<h6>{{gameproductone.describe1}}</h6>
										<h6>{{gameproductone.describe2}}</h6>
										<span>¥ {{gameproductone.sale_price }}</span>
									</div>
											</router-link>
							</div>
							<ul class="clearfix fl w897 ml12">
								<li v-for="(item, index) in gameproduct" :key='index' v-if="index>0">
									 <router-link :to="{ path: '/sort/sortDetail',query:{id:item.list.product_id} }" >
									 	<img :src="item.list.img_url  |imgfilter" :ref="item.list.id">
									<h6>{{item.list.model_no}}</h6>
									<p>{{item.list.describe1}}</p>
									<span class="color-newred">¥ {{item.list.sale_price|pricefilter}}</span>
											</router-link>
									<div class="mn">
										<div class="mn-wrap">
											<div v-for="(child,index) in item.image" @click="switchimg($event,child.listImg,item.list.id)">
												<img :src="child.smallImg | imgfilter"></div>
										</div>
									</div>
								</li>

							</ul>
						</div>
						<div class="title">
							<div class="seemore fr" >
								<router-link :to="{ path: '/sort',query:{homeKeyword:'办公'} }" > 查看更多
											<i   class="icon-new icon-more" ></i>
								</router-link>
							</div>
							<span>办公</span></div>
						<div class=" three clearfix">
							<ul class=" fl  office">
								<li class="w594">
										 <router-link :to="{ path: '/sort/sortDetail',query:{id:officeproductone.product_id} }" >
										<img :src="officeproductone.img_url |imgfilter">
										<div class="ad ">
											<h5>{{officeproductone.model_no}}</h5>
											<h6>{{officeproductone.describe1}}</h6>
											<h6>{{officeproductone.describe2}}</h6>
											<span>¥ {{officeproductone.price }}</span>
										</div>
										</router-link>
								</li>
								<li v-for="(item, index) in officeproduct" :key='index' v-if="index>0">
									 <router-link :to="{ path: '/sort/sortDetail',query:{id:item.list.product_id} }" >
									<img :src="item.list.img_url  |imgfilter" :ref="item.list.id">
									<h6>{{item.list.model_no}}</h6>
									<p>{{item.list.describe1}}</p>
									<span class="color-newred">¥ {{item.list.sale_price|pricefilter}}</span>
											</router-link>
									<div class="mn">
										<div class="mn-wrap">
											<div v-for="(child,index) in item.image" @click="switchimg($event,child.listImg,item.list.id)">
												<img :src="child.smallImg | imgfilter"></div>
										</div>
									</div>
								</li>
							</ul>
						</div>
						<div class="title">
							<div class="seemore fr" >
								<router-link :to="{ path: '/sort',query:{homeKeyword:'家居'} }" > 查看更多
											<i   class="icon-new icon-more" ></i>
								</router-link>
							</div>
						<span>家居</span></div>
									<div class=" three clearfix">
							<ul class=" fl  office">
								<li class="w594">
											<router-link :to="{ path: '/sort/sortDetail',query:{id:houseproductone.product_id} }" >
										<img :src="houseproductone.img_url |imgfilter">
										<div class="ad ">
											<h5>{{houseproductone.model_no}}</h5>
											<h6>{{houseproductone.describe1}}</h6>
											<h6>{{houseproductone.describe2}}</h6>
											<span>¥ {{houseproductone.sale_price | pricefilter}}</span>
										</div>
										</router-link>
								</li>
								<li v-for="(item, index) in houseproduct" :key='index' v-if="index>0">
									 <router-link :to="{ path: '/sort/sortDetail',query:{id:item.list.product_id} }" >
									<img :src="item.list.img_url  |imgfilter" :ref="item.list.id">
									<h6>{{item.list.model_no}}</h6>
									<p>{{item.list.describe1}}</p>
									<span class="color-newred">¥ {{item.list.sale_price|pricefilter}}</span>
									</router-link>
									<div class="mn">
										<div class="mn-wrap">
											<div v-for="(child,index) in item.image" @click="switchimg($event,child.listImg,item.list.id)"><img :src="child.smallImg | imgfilter"></div>
										</div>
									</div>
								</li>
							</ul>
						</div>
						<div class="title">
						<span>电竞桌</span></div>
						<div class="floorad clearfix">
						<div class="fl bg-white ad-wrap" v-for="(item, index) in tableproduct" :key='index' v-if="index==1">
							<router-link :to="{ path: '/sort/sortDetail',query:{id:item.list.product_id} }" >
								<img :src="item.list.img_url  |imgfilter" class="zhuozi">
							<div class="ad">
								<h5>{{item.list.model_no}}</h5>
								<p>{{item.list.describe1}}</p>
								<span class="color-newred">¥{{item.list.sale_price}}</span></div>
										</router-link>
						   </div>
						   
						<div class="fr bg-darkgray text-center forward">
							<h4>DXRACER二代电竞桌</h4>
							<h3>敬请期待</h3></div>
					</div>
					<div class="title">
						<span>游戏座舱</span></div>
						<div class="floorad clearfix">
						<div class="fl bg-white ad-wrap yxzc" v-for="(item, index) in cockpitproduct" :key='index'>
								<router-link :to="{ path: '/sort/sortDetail',query:{id:item.list.product_id} }" >
							<img :src="item.list.img_url  |imgfilter" class="zhuozi">
							<div class="ad">
								<h5>{{item.list.model_no}}</h5>
								<p>{{item.list.describe1}}</p>
								<span class="color-newred">¥ {{item.list.sale_price|pricefilter}}</span></div>
							</router-link>
						</div>
					</div>
					<div class="title">
								<div class="seemore fr" >
								<router-link :to="{ path: '/sort',query:{homeKeyword:'座椅周边'} }" > 查看更多
											<i   class="icon-new icon-more" ></i>
								</router-link>
							</div>
						<span>座椅周边</span></div>
					
					<ul class="clearfix bgli-white mb105">
						<li  v-for="(item, index) in peripheryproduct" :key='index'>
							<router-link :to="{ path: '/sort/sortDetail',query:{id:item.list.product_id} }" >
							<img :src="item.list.img_url  |imgfilter" :ref="item.list.id">
							<h6>{{item.list.model_no}}</h6>
							<p>{{item.list.describe1}}</p>
							<span class="color-newred">¥ {{item.list.sale_price|pricefilter}}</span>
							</router-link>
								<div class="mn">
										<div class="mn-wrap">
											<div v-for="(child,index) in item.image" @click="switchimg($event,child.listImg,item.list.id)"><img :src="child.smallImg | imgfilter"></div>
										</div>
									</div>
						</li>

					</ul>
				</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Bus from '@/assets/js/bus.js'
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
				hotitem: [],
				aditems: [],
				gameproduct: [],
				gameproductone: {},
				officeproduct: [],
				officeproductone: {},
				houseproduct:[],
				houseproductone:{},
				type: [],
				basictype: [],
				tableproduct:[],
				cockpitproduct:[],
				peripheryproduct:[],
				toolbarNologin:{},//侧边栏个人中心是否登录
			};
		},
		computed: {

			token() {
				//获取store里面的token
				return this.$store.state.token;
			}
		},
		filters: {
			baifenhao(val) {
				return val + "%";
			}
		},
		methods: {
			goback(){
				document.documentElement.scrollTop = 0;
			},
			getBanner() {
				//判断是否已经登录
				if(this.token != null) {
					this.loginflag = false;
				}
				this.$axios({
					method: "GET",
					url: "/index/poster"
				}).then(res => {
					if(res.code == "200") {
						this.Items = res.object;
					}
				});
				this.$axios({
					method: "GET",
					url: "/index/basictype"
				}).then(res => {
					if(res.code == "200") {
						this.basictype = res.object;
					}
				});
				this.$axios({
					method: "GET",
					url: "/index/hotitem"
				}).then(res => {
					if(res.code == "200") {
						this.hotitem = res.object;
					}
				});
				this.$axios({
					method: 'GET',
					url: '/index/gameproduct',
				}).then((res) => {
					if(res.code == '200') {
						this.gameproduct = res.object;
						if(this.gameproduct.length>0){
							this.gameproductone = this.gameproduct[0].list;
						}
					}
				});
				this.$axios({
					method: 'GET',
					url: '/index/officeproduct',
				}).then((res) => {
					if(res.code == '200') {
						this.officeproduct = res.object;
						if(this.officeproduct.length>0){
							this.officeproductone = this.officeproduct[0].list;
						}
					}
				});
				this.$axios({
					method: 'GET',
					url: '/index/houseproduct',
				}).then((res) => {
					if(res.code == '200') {
						this.houseproduct = res.object;
						if(this.houseproductone.length>0){
							this.houseproductone = this.houseproductone[0].list;
						}
					}
				});
				this.$axios({
					method: 'GET',
					url: '/index/tableproduct',
				}).then((res) => {
					if(res.code == '200') {
						this.tableproduct = res.object;
					}
				});
				this.$axios({
					method: 'GET',
					url: '/index/cockpitproduct',
				}).then((res) => {
					if(res.code == '200') {
						this.cockpitproduct = res.object;
					}
				});
				this.$axios({
					method: 'GET',
					url: '/index/peripheryproduct',
				}).then((res) => {
					if(res.code == '200') {
						this.peripheryproduct = res.object;
					}
				});

			},
			switchimg(e,listImg,imgid){
				this.$refs[imgid][0].src=this.global_.imgurl+listImg;
			}
		},
		mounted() {
			this.getBanner();

		}
	};
</script>

<style lang="scss" scoped="scoped">
.yxzc:nth-child(1){
	margin-right: 10px;
}
	.w897 {
		width: 897px;
	}
	.minipro {
		margin-top: 10px;
	}
	
	.minipro li:hover img,
	.ad-wrap:hover,
	.forward:hover {
		opacity: 0.8;
	}
	
	.floor li span {
		font-weight: bold;
	}
	
	.minipro li {
		float: left;
		position: relative;
		cursor: pointer;
	}
	
	.normol {
		font-size: 24px;
		color: #fff;
		position: absolute;
		top: 35px;
		left: 40px;
	}
	
	.minipro li:last-child span {
		font-size: 31px;
		color: #fff;
		position: absolute;
		top: 110px;
		left: 85px;
	}
	
	.minipro li:nth-child(n+2) {
		margin-left: 12px;
	}
	
	.floor .title span {
		font-size: 25px;
		color: #313131;
	}
	
	.title {
		padding-top: 35px;
		padding-bottom: 8px;
	}
	
	.one li:nth-child(n+2) {
		margin-left: 12px;
	}
	
	.one li {
		background: #eee;
	}
	
	.seemore {
		font-size: 18px;
		color: #000;
		cursor: pointer;
	}
	
	.seemore:hover {
		color: #FF0037;
	}
	.seemore:hover i{
	 background-position: -172px 1px;
	}
	.ad-wrap {
		position: relative;
		cursor: pointer;
	}
	
	.ad {
		position: absolute;
		color: #fff;
		left: 25px;
		top: 40px;
		text-align: left;
	}
	
	.ad h5 {
		font-size: 26px;
	}
	
	.ad h6 {
		font-size: 20px;
		color: #fff;
		font-weight: 500;
	}
	
	.ad span {
		font-size: 24px;
		font-weight: bold;
		margin-top: 25px;
		display: block;
	}
	
	.two li {
		margin-left: 12px;
		background: #fff;
	}
	
	.two li:nth-child(3n+1) {
		margin-left: 0;
	}
	
	.two li:nth-child(-n+3) {
		margin-bottom: 12px;
	}
	
	li.w594 {
		width: 594px;
	}
	
	li.w594 img {
		margin-top: 0;
		margin-bottom: 0;
		max-width: 100%;
		max-height: 100%;
	}
	
	.three li {
		background: #fff;
		margin-bottom: 12px;
	}
	
	.three li:nth-child(n+2) {
		margin-left: 12px;
	}
	
	.three li.ml0 {
		margin-left: 0;
	}
	
	.mt40 {
		margin-top: 40px
	}
	
	.floorad>div {
		width: 594px;
		height: 370px;
	}
	
	.floorad h5 {
		color: #111;
	}
	
	.zhuozi {
		bottom: 0;
		right: 45px;
		position: absolute;
	}
	
	.floorad .ad {
		top: 30px;
	}
	
	.forward {
		color: #fff;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}
	
	.forward h4 {
		font-size: 24px;
	}
	
	.forward h3 {
		font-size: 41px;
	}
	
	.ml12 {
		margin-left: 12px;
	}
	
	.pb105 {
		padding-bottom: 105px;
	}
	
	.floor li:hover .mn {
		opacity: 0.95;
		bottom: 0px;
	}
	
	.mn {
		position: absolute;
		bottom: -25px;
		left: 0;
		z-index: 2;
		width: 100%;
		transition: all .4s linear;
		opacity: 0;
		text-align: left;
	}
	
	.mn-wrap {
		width: 100%;
		padding: 15px 0;
		background: #fff;
	}
	
	.mn-wrap div {
		display: inline-block;
		margin-left: 7px;
		border: 1px solid #ddd;
		padding: 1px;
		width: 44px;
		height: 44px;
		margin-right: 5px;
		margin-bottom: 5px;
	}
	.mn-wrap img {
		width: 40px;
		height: 40px;
	}
	
	.mn-wrap div:hover,
	.mn-wrap .active {
		padding: 0;
		border-width: 2px;
		border-color: #FF0030;
	}
	
	.office li:nth-child(4) {
		margin-left: 0;
	}

</style>