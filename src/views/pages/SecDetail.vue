<template>
	<div class="detail sortDetail ">
		<div class="tp main-wdith">
			<div class="goodDetails_name_img">
				<div class="videoContent" style="border: 3px solid #e5e5e5;width: 520px;height: 520px; position:relative">
					<div v-show="videoshow" style="width: 514px;height: 514px;">
						<span class="guanbi" @click="close()"><Icon type="ios-close-circle-outline" /></span>
						<div class="youku" :id="detail.product.video" style="width:100%;height:100%;"></div>
					</div>
					<img v-show="!videoshow" :src="detail.productItem.listImg |imgfilter" style="width: 100%;height: 100%">
					<img class="videoIcon" v-if='videoIcon' v-show="!videoshow" @click='getVideo(detail.product.video)' src="../../assets/img/video.png">
				</div>
				<div class="little_img">
					<div class='imgContent'>
						<ul class="small">
							<li class="clickproduct">
								<img :src="detail.productItem.listImg |imgfilter" :class="{clickItem:detail.productItem.clickItem}" style="width: 50px; height: 50px">
							</li>
						</ul>
					</div>

				</div>
			</div>
			<div class="delie">
				<div class="G_info">
					<h3>
					 	{{detail.product.modelNo}}
					 	<span class="djs" >
					 		<em v-if="detail.switch==0">距开始</em>
					 		<em v-else class="jishu">距结束</em>{{ `${day}天 ${hr}小时 ${min}分钟 ${sec}秒` }}</span>
					 </h3>
					<p>{{detail.product.modelName}}</p>
					<div class="G_changeDetail">
						<p class="G_right"><strong class="strong">￥{{detail.crush.salePrice | pricefilter}} </strong> <span class='chooseSPPrice'>￥{{detail.productItem.salePrice | pricefilter}}</span></p>
						<div class="sNumber">数量 :
							<InputNumber :min="1" v-model="quantity" :max="detail.crush.unitQuantity*1"></InputNumber>
						</div>
					</div>
					<div class="chooseAddress">
						<ul class="address" v-if="youdizhi">
							<li>
								<p class="addressP">
									<strong class="addressStrong">{{addressList.person}} <label>{{addressList.phone}}</label></strong>
									<span>{{addressList.receiveProvince}}{{addressList.receiveCity}}{{addressList.receiveDistrict}}{{addressList.address}}</span>
									<button @click="addAdd" class="changeadd" type="button">更换地址</button>
								</p>
							</li>
							<li class="freight">运费:<span class="color-newred">￥{{freight | pricefilter}}</span></li>
						</ul>
						<div class="zeroAddress" v-else @click="addAdd">
							请选择收货地址
						</div>
						
					</div>
					<div class="foot">
						<button class="btn-disabled" v-if="detail.switch==0">尚未开始</button>
						<button :loading="loading" @click="confirm" class="miaoshagou" v-else>马上抢</button>
					</div>
				</div>
			</div>
		</div>
		<div class="recommend" v-if="recomm.length>0">
			<div class="main-width clearfix">
				<h6><span>粉丝推荐</span><em></em></h6>
				<div class="rec-con">
					<ul class="pro">
						<li v-for="(item,index) in recomm " :key="index" :class="{none:item.show}" style="display:none">
							<router-link :to="{ path: '/sort/sortDetail',query:{id:item.list.product_bind_id} }" target="_blank">
								<img :src="item.list.list_img | imgfilter">
								<p>{{item.list.model_no}}</p>
							</router-link>
							<span v-if="JSON.stringify(item.promotion)=='{}'">¥{{item.list.sale_price | pricefilter}}</span>
							<span v-else>¥{{item.promotion.onSalePrice | pricefilter}} <em  class="abandoned" >{{item.list.sale_price | pricefilter}}</em></span>

						</li>
					</ul>
					<div class="changepage fl"><i @click="prev()">&lt;</i> <i @click="next()">&gt;</i></div>
				</div>
			</div>
		</div>
		<div class="bg-lightgray">
			<div class="main-width clearfix">
				<ul class="swith-tab pt50 clearfix">
					<li @click="toggletab(0)" :class="{active:0 == num}">商品详情</li>
					<li @click="toggletab(1)" :class="{active:1 == num}">商品参数</li>
					<li @click="toggletab(2)" :class="{active:2 == num}">评价晒单</li>
				</ul>
				<div class="intro_bg">
					<div v-show=" 0 == num" class="pro_intro">
						<div v-for="(item, index) in productimg" :key="index"><img :src="item.imgUrl |imgfilter"></div>
					</div>
					<div v-show=" 1 == num" class="pro_size">
						<p v-for="(item, index) in productDesc" :key="index">
							<span class="title">{{item.attrCode}}:</span> <span>{{item.attrValue}}</span>
						</p>
					</div>
					<div class="eval pt50 " v-show=" 2 == num">
						<div class="clearfix">
							<div class="eval-fl">
								<h5><span class="big-title">商品评价</span>
							<span class="onlyimg" @click="toggleimg()">
							<i class="icon-new icon-onlyimg"  :class="{'icon-allimg':!onlyimg }"></i>只显示到带图评价
							</span></h5>
								<ul class="eval-ul">
									<li v-for="(item, index) in commentList" :key="index">
										<h6><img :src="item.list.iconUrl | imgfilter">{{item.list.nickName}}</h6>
										<p>{{item.list.commentContent}}</p>
										<div class="sz" :key="index"><span v-for="(child, index) in item.imgList"><img :src="child | imgfilter"></span></div>
										<div class="zan"><span class="fr"><i class="icon-new icon-zan" :class="{'icon-zan-active':item.isZan=='Y' }" @click='zan(item.list.id,item.isZan)' ></i>{{item.number}}</span>{{item.list.commentTime | formatDate}}</div>
									</li>
								</ul>
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
				//运费
				freight: 0,
				freightPrice: 0,
				freightTypeId: '',
				day: 0,
				hr: 0,
				min: 0,
				sec: 0,
				t: '',
				jsqtime: 0,
				detail: {
					productItem: {
						salePrice: 0
					},
					product: {
						salePrice: 0,
						typeId: ''
					},
					crush: {
						salePrice: 0
					}
				},
				skuId: '',
				productId: '',
				quantity: 1,
				loading: true,
				youdizhi: false,
				proId: '',
				productDesc: [],
				productimg: [],
				temp: '',
				addressList: {},
				videoIcon: false,
				videoshow: false,
				ImgUrl: '',
				num: 0,
				commentList: [],
				onlyimg: false, //0为img为空。1显示图片
				recomm: [],
				dpjiage: 0,
				dpnum: 0,
				compine: [],
				compineList: [],
				choosesp: {
					id: '',
					img: '',
					itemNo: '',
					price: 0,
					cuxiaoprice: 0,
					activityName: '',
					startTime: '',
					endTime: '',
					kucun: 0,
				},
				//请求product之后的商品数据
				shangp: {
					product: {
						modelNo: '',
						salePrice: 0
					},
					promotions: [],
					productImageList: [],
					productItemList: [],
					inventory: [],
					productAttrList: [],
				},
				wuhuotongzhi: false,
				index: 6,
			}
		},
		methods: {
			checkAllGroupChange(data) {
				var _this = this;
				_this.dpnum = data.length;
				_this.dpjiage = 0;
				this.compineList = [];
				data.forEach((item, index) => {
					if(JSON.stringify(this.recomm[item].promotion) == "{}") {
						this.compineList.push({
							id: this.recomm[item].list.id,
							image: this.recomm[item].list.list_img,
							productName: this.recomm[item].list.item_no,
							quantity: 1,
							originSalePrice: this.recomm[item].list.sale_price,
							salePrice: this.recomm[item].list.sale_price,
							productType: this.recomm[item].list.catalogId
						})
						this.dpjiage += parseFloat(this.recomm[item].list.sale_price);
					} else {
						this.compineList.push({
							id: this.recomm[item].list.id,
							image: this.recomm[item].list.list_img,
							productName: this.recomm[item].list.item_no,
							quantity: 1,
							originSalePrice: this.recomm[item].list.sale_price,
							salePrice: this.recomm[item].promotion.onSalePrice,
							promotionTitle: this.recomm[item].promotion.activityName,
							productType: this.recomm[item].list.catalogId
						})
						this.dpjiage += parseFloat(this.recomm[item].promotion.onSalePrice);
					}
					this.compineId.push(this.recomm[item].list.id)
				});
				if(this.choosesp.cuxiaoprice > 0) {
					this.dpjiage += parseFloat(this.choosesp.cuxiaoprice);
				} else {
					this.dpjiage += parseFloat(this.choosesp.price);
				}

			},
			next() {
				if(this.index < this.recomm.length) {
					let i = this.index - 6
					this.recomm[this.index].show = true;
					this.recomm[i].show = false;
					this.index++;
				}
			},
			prev() {
				if(this.index > 6) {
					let i = this.index - 7;
					this.recomm[this.index - 1].show = false;
					this.recomm[i].show = true;
					this.index--
				}
			},
			getIndex(imgUrl, index) {
				this.videoshow = false;
				this.ImgUrl = imgUrl;
			},
			getVideo(imgVideo) {
				let _this = this;
				if(imgVideo != "") {
					_this.videoshow = true;
					let player = new YKU.Player(imgVideo, {
						styleid: '0',
						client_id: '0996850d68cf40fe',
						vid: imgVideo,
						newPlayer: true,
						isAutoPlay: true,
					});
				}
			},
			close() {
				this.videoshow = false;
			},
			//点赞
			zan(value, isZan) {
				let zanid = value;
				let Like = isZan;
				if(Like == 'N') {
					Like = 'Y'
				} else {
					Like = 'N'
				}
				this.$axios({
					method: 'post',
					url: `/comment/beLike/${zanid}/${Like}`,
				}).then((res) => {
					if(res.code == '200') {
						this.showcomments()
					}
				})
			},
			//只显示带图评论
			toggleimg() {
				this.onlyimg = !this.onlyimg;
				this.showcomments();
			},
			//切换商品介绍和规格
			toggletab(num) {
				this.num = num;
			},
			//获取address中传来的数据
			getDD() {
				let routerParams = localStorage.getItem('secaddress');
				if(routerParams != undefined) {
					this.addressList = JSON.parse(routerParams);
					this.youdizhi = true
				}
			},
			//去往个人中心页面选择地址
			addAdd() {
				this.$router.push({
					name: '/user/address',
					query: {
						skuId: this.$route.query.skuId,
						fromc: 'secdetail'
					}
				});
			},
			getAddress() {
				let token = localStorage.getItem('token');
				if(token != undefined && token != null) {
					var _this = this;
					this.$axios({
						method: 'post',
						url: '/address',
					}).then((res) => {
						if(res.length > 0) {
							res.map(function(i) {
								if(i.isDefault == 'Y' && JSON.stringify(_this.addressList) == "{}") {
									_this.addressList = i;
									_this.youdizhi = true
								}
							});

						}
						if(_this.youdizhi){
							this.getExpressPrice();
						}
					});
				}
			},
			confirm() {
				if(this.addressList.id == undefined) {
					this.$Message.error('收货地址不能为空');
					return;
				}
				let para = {
					addressId: this.addressList.id,
					quantity: this.quantity,
					skuId: this.$route.query.skuId
				};
				this.$axios({
					method: 'post',
					url: '/promotion/crush/confirm',
					data: para
				}).then((res) => {
					if(res.code == '200') {
						this.$router.push({
							path: '/cartthree',
							query: {
								orderNo: res.object
							}
						});
					} else {
						this.$Message.error(res.object);
						return;
					}
				});
			},
			countdown: function() {
				const end = Date.parse(new Date(this.jsqtime));
				const now = Date.parse(new Date());
				const msec = end - now;
				//当秒杀开始时
				if(msec == 0) {
					this.detail.switch = 1;
					this.jsqtime = this.detail.crush["endTime"];
				}
				let day = parseInt(msec / 1000 / 60 / 60 / 24);
				let hr = parseInt(msec / 1000 / 60 / 60 % 24);
				let min = parseInt(msec / 1000 / 60 % 60);
				let sec = parseInt(msec / 1000 % 60);
				this.day = day;
				this.hr = hr > 9 ? hr : '0' + hr;
				this.min = min > 9 ? min : '0' + min;
				this.sec = sec > 9 ? sec : '0' + sec;
				let self = this;
				this.t = setTimeout(() => {
					self.countdown();
				}, 1000);
			},
			getDetail() {
				this.$axios({
					method: 'get',
					url: '/promotion/crush/' + this.$route.query.skuId,
				}).then((res) => {
					if(res.code == '200') {
						this.detail = res.object;
						this.freightPrice = this.detail.product.salePrice;
						this.freightTypeId = this.detail.product.catalogId;
						if(this.detail.switch == '0') {
							this.jsqtime = this.detail.crush["startTime"]
						} else {
							this.jsqtime = this.detail.crush["endTime"];
						}
						//计时器
						this.countdown();
						this.detail.productItem.clickItem = true;
						if(this.detail.product.video != '') {
							this.videoIcon = true;
						}
						this.proId = res.object.productItem.productId;
						this.$axios({
							method: "GET",
							url: "/product/match/" + this.proId,
						}).then(res => {
							if(res.code == 200) {
								for(let i = 0; i < res.object.length; i++) {
									if(i < this.index) {
										res.object[i].show = true;
									} else {
										res.object[i].show = false
									}
								}
								this.recomm = res.object;
							}

						});
						this.$axios({
							method: 'post',
							url: '/product/desc/' + this.proId,
						}).then((res) => {
							this.productDesc = res;
						});
						this.$axios({
							method: 'post',
							url: '/product/img/' + this.proId,
						}).then((res) => {
							this.productimg = res;
						});
						//获取邮费
						this.getExpressPrice()
					}
				});

			},
			//显示评论。0位全部评论，1为显示带图评论
			showcomments() {
				let imgshow = this.onlyimg;
				if(imgshow == true) {
					imgshow = 1
				} else {
					imgshow = 0
				}
				this.$axios({
					method: 'get',
					url: `/comment/search/${this.skuId}/${imgshow}`,
				}).then((res) => {
					if(res.code == "200") {
						this.commentList = res.object;
					}
				});
			},
			getParams() {
				// 取到路由带过来的参数 
				let routerParams = this.$route.query.productId
				this.productId = routerParams;
			},
			getExpressPrice() {
				this.$axios({
					method: 'post',
					url: '/order/getShipPrice',
					data: {
						"price": [this.freightPrice],
						"province": this.addressList.receiveProvince,
						"quantity": [this.quantity],
						"typeIds": [this.freightTypeId]
					}
				}).then((res) => {
					if(res.code == 200) {
						this.freight = res.object;
					}

				});
			}
		},
		watch: {
			//当数量改变时重新计算运费
			quantity(newValue, oldValue) {
				this.getExpressPrice();
			}
		},
		created() {
			this.getDetail()
		},
		mounted() {
			this.getParams()
			this.getDD();
			this.getAddress();
		},
		destroyed() {
			clearTimeout(this.t);
			localStorage.removeItem('secaddress');
		},
	}
</script>

<style scoped="scoped" lang="scss">
	.detail {
		padding-top: 50px;
		background: #fff;
		.goodDetails_name_img {
			display: inline-block;
			width: 520px;
			overflow: hidden;
		}
		.delie {
			display: inline-block;
			width: 480px;
			margin-left: 40px;
			vertical-align: top;
			overflow: hidden;
		}
		img {
			max-width: 100%;
		}
	}
	
	.videoIcon {
		width: 40px;
		height: 40px;
		position: absolute;
		left: 10px;
		bottom: 10px;
		z-index: 2;
		cursor: pointer;
	}
	
	.sortDetail .addressStrong {
		color: #333;
		font-size: 18px;
	}
	
	.sortDetail .addressP {
		margin-bottom: 10px;
	}
	
	.sortDetail .G_info>h3 {
		font-size: 28px;
		color: black;
	}
	
	.sortDetail .strong {
		color: #FF0030;
		display: inline;
		font-size: 28px;
		font-weight: normal;
	}
	
	.sortDetail .G_info>p {
		font-size: 15px;
		line-height: 50px;
		border-bottom: 1px solid #ccc;
	}
	
	.sortDetail .G_info .G_changeDetail {
		font-size: 12px;
	}
	
	.sortDetail .chooseSPPrice {
		text-decoration: line-through;
		font-size: 15px;
		color: #999;
	}
	
	.G_info .G_right {
		padding-top: 20px;
		font-size: 32px;
		width: 100%;
		color: black;
		padding-bottom: 20px;
		border-bottom: 1px solid #ccc;
	}
	
	.miaoshagou {
		background-color: #FF0030;
		border: 1px solid #FF0030;
		color: #fff;
	}
	
	.miaoshagou,
	.btn-disabled {
		cursor: pointer;
		height: 50px;
		width: 155px;
		font-size: 16px;
	}
	
	.btn-disabled {
		border: 1px solid #ccc;
		background-color: #f3f3f3;
		color: #999;
		cursor: not-allowed;
	}
	
	.sortDetail .addAddress {
		float: right;
		height: 60px;
		line-height: 60px;
		position: relative;
		top: -70px;
		font-size: 25px;
	}
	
	.sortDetail .sNumber {
		border-bottom: 1px solid #ccc;
		padding-bottom: 20px;
		padding-top: 20px;
		margin-bottom: 20px;
		font-size: 14px;
	}
	
	.center1 {
		text-align: center;
		img {
			width: 100%;
		}
	}
	
	.gk {
		overflow: hidden;
		li {
			float: left;
			width: 25%;
		}
	}
	
	.sortDetail .neirong,
	.sortDetail .title {
		font-size: 15px;
		line-height: 35px;
	}
	
	.zeroAddress {
		height: 30px;
		font-size: 14px;
		color: #FF0030;
		text-decoration: underline;
		cursor: pointer;
	}
	
	.sortDetail .float {
		float: right;
		height: 60px;
		line-height: 60px;
		cursor: pointer;
	}
	
	.sortDetail .clickItem {
		border: 1px solid #999;
	}
	
	.changeadd {
		border: 1px solid #FF0030;
		color: #FF0030;
		padding: 2px;
		cursor: pointer;
		background: #fff;
	}
	
	.djs {
		em {
			font-size: 12px;
			font-style: normal;
			margin-right: 5px;
			color: #FF0030;
		}
		float: right;
		font-size: 16px;
	}
	
	.swith-tab li {
		width: 133px;
		height: 41px;
		background: #d2d2d2;
		color: #3f3f3f;
		text-align: center;
		line-height: 41px;
		font-size: 14px;
		float: left;
		margin-right: 1px;
		cursor: pointer;
	}
	
	.swith-tab li.active {
		background: #fff;
		color: #6b6b6b;
	}
	
	.big-title {
		color: #242424;
		font-size: 34px;
		position: relative;
		top: -10px;
	}
	
	.intro_bg {
		background: #fff;
	}
	
	.eval-fl {
		padding-left: 40px;
	}
	
	.eval-fr {
		width: 360px;
		padding-left: 35px;
		padding-right: 35px;
	}
	
	.pro_intro {
		text-align: center;
		padding: 20px;
	}
	
	.pro_size {
		padding: 20px;
		line-height: 30px;
		overflow: hidden;
		font-size: 14px;
		p {
			width: 50%;
			float: left;
		}
		.title {
			width: 160px;
			display: inline-block;
			text-align: right;
			padding-right: 20px;
		}
	}
	
	.onlyimg {
		float: right;
		margin-right: 35px;
		color: #2c2c2c;
		font-size: 16px;
		font-weight: normal;
		cursor: pointer;
	}
	
	.icon-onlyimg {
		margin-right: 10px;
	}
	
	.eval-ul h6 {
		font-size: 16px;
		font-weight: normal;
		color: #a0a0a0;
		margin-top: 25px;
		margin-bottom: 20px;
	}
	
	.eval-ul h6 img {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		margin-right: 10px;
		border: 1px solid #f0f0f0;
	}
	
	.eval-fl .eval-ul {
		padding-right: 40px;
		padding-bottom: 100px;
	}
	
	.eval-fl p {
		color: #242424;
		font-size: 24px;
		margin-bottom: 30px;
	}
	
	.eval-fr p {
		color: #565656;
		font-size: 16px;
		margin-bottom: 25px;
	}
	
	.sz img {
		width: 150px;
		height: 150px;
		margin-right: 20px;
		margin-bottom: 35px;
	}
	
	.zan {
		font-size: 16px;
	}
	
	.zan i {
		margin-right: 5px;
		position: relative;
		top: 4px;
	}
	
	.moreeval {
		color: #2c2c2c;
		text-align: center;
		font-size: 16px;
		padding-bottom: 40px;
		padding-top: 140px;
		cursor: pointer;
	}
	
	.mt50 {
		margin-top: 50px;
	}
	
	.small {
		margin-top: 23px;
	}
	
	.center {
		text-align: center;
	}
	
	.none {
		display: block!important;
	}
	
	.recommend {
		border-top: 1px solid #e5e5e5;
		margin-top: 40px;
		padding-top: 20px;
	}
	
	.recommend h6 {
		margin-bottom: 20px;
		padding-left: 40px;
	}
	
	.recommend h6 span {
		color: #FF0030;
		font-size: 16px;
		border-bottom: 1px solid #FF0030;
		padding-bottom: 5px;
		font-weight: normal;
		margin-right: 10px;
	}
	
	.li-pro {
		padding-left: 40px;
	}
	
	.li-pro,
	.pro li {
		width: 146px;
		text-align: center;
		float: left;
		cursor: pointer;
	}
	
	.li-pro p,
	.pro li p {
		font-size: 14px;
		color: #111;
		margin-top: 10px;
		margin-bottom: 10px;
		height: 42px;
	}
	
	.li-pro img,
	.pro img,
	{
		max-width: 125px;
	}
	
	.li-pro span,
	.pro li span {
		font-size: 12px;
		color: #FF0030;
	}
	
	.rec-con {
		display: flex;
		align-items: center;
		float: left;
		padding-bottom: 45px;
	}
	
	.icon-recadd {
		margin: 0 20px;
	}
	
	.pro input {
		margin-right: 5px;
		position: relative;
		top: 2px;
	}
	
	.compine {
		width: 122px;
		font-size: 14px;
		color: #111;
		margin-left: 55px;
	}
	
	.compine button {
		margin-top: 10px;
		color: #fff;
		font-size: 14px;
		width: 122px;
		border: 0 none;
		height: 31px;
	}
	.freight{
		font-size: 14px;
		margin-bottom: 20px;
	}
	.freight span{
		font-size: 16px;
		font-weight: bold;
	}
	.guanbi {
				position: absolute;
    right: 0;
    top: 0;
	}
	.guanbi i{

    font-size: 25px;
    cursor: pointer;
    color: #000;
	}
</style>