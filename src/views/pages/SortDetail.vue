<template>
	<div>
		<div class="main-width clearfix mt50">
			<div class="fl spec ">
				<div class="big">
					<div v-show="videoshow" style="width: 514px;height: 514px;">
						<span class="guanbi" @click="close()"><Icon type="ios-close-circle-outline" /></span>
						<div class="youku" :id="shangp.product.video" style="width:100%;height:100%;"></div>
					</div>
					<img v-show="!videoshow" :src="ImgUrl |imgfilter" style="width: 100%;height: 100%">
					<img class="videoIcon" v-if='videoIcon' v-show="!videoshow" @click='getVideo(shangp.product.video)' src="../../assets/img/video.png"></div>
				<ul class="small">
					<li class="nextp" @click="pervlist()" v-show="shangp.productImageList.length>5"><Icon type="ios-arrow-back" /></li>
					<li v-for="(item, index) in shangp.productImageList" :key="index" @click='getIndex(item.listImg,index)' 
					:class="{active:item.clickItem,none:item.show}"  style="display:none">
						<img :src="item.smallImg |imgfilter">
					</li>
					<li class="nextp"  @click="nextlist()" v-show="shangp.productImageList.length>5"><Icon type="ios-arrow-forward" /></li>
				</ul>
			</div>
			<div class="fl iteminfo ml40">
				<h1><span class="prf10">{{shangp.product.modelNo}} </span></h1>
				<p class="itemtitle"><span class="color-newred">{{shangp.product.modelName}} </span></p>
				<div class="summary">
					<dl class="dl-base"><dt>价  &nbsp;&nbsp;&nbsp;&nbsp;格</dt>
						<dd class="sku-price color-newred">
							<span v-if="choosesp.price==0">￥{{shangp.product.salePrice | pricefilter}}</span>
							<span v-else> 
                    		<span v-if="cxshow">
                    		<span class="color-red">￥{{choosesp.cuxiaoprice | pricefilter}} </span>
							<label class="color-origin">￥{{choosesp.price | pricefilter}}</label>
							</span>
							<span v-else>￥{{choosesp.price | pricefilter}}</span>
							</span>
						</dd>
					</dl>
					<dl v-if="choosesp.activityName!=null&&choosesp.activityName!=''"><dt><em class="act">{{choosesp.activityName}}</em></dt>
						<dd class="color-black">{{choosesp.activityName}} </dd>
					</dl>
					<dl class="noborder" v-for="(item, i) in shangp.productAttrList" :key="i">
						<dt>{{item.attrKey.catalogAttrValue}}</dt>
						<dd>
							<ul class="color-sel">
								<li :class="choosesp.kucun==0?'disabled':'abled'" v-for="(child, index) in item.attrValues" :key="index" @click="chooseSP($event,item)" >
									<span v-bind:class="item.attrValues.length==1?'active':''" :titleid="child.id" ref="dditem">
										<img :src="child.smallImg |imgfilter " v-if="item.attrKey.isColorAttr == 'Y'">{{child.modelAttrValue}}</span>
								</li>
							</ul>
						</dd>
					</dl>
					<dl class="dl-base"><dt>数    &nbsp;&nbsp; &nbsp;&nbsp; 量</dt>
						<dd>
							<div class="number">
								<input value="1" type="number" v-model="quantity"><i class="icon-new icon-add" @click="jia"></i><i class="icon-new icon-minus" @click="jian"></i></div>
							<span v-show="!xiajia">
						 	库存: {{choosesp.kucun}}件
							</span>
							<div v-if="xiajia" class="xiajia">
								<Icon type="information-circled">
								</Icon>该商品已下架
							</div>
						</dd>
					</dl>
				</div>
				<div class="opt">
					<button class="btn-cart" @click="atc" v-show="!wuhuotongzhi" v-if="!xiajia"><i class="icon-new icon-minicart"></i>加入购物车</button>
					<button class="btn-xorder" v-show="!wuhuotongzhi" @click="buynow(0)"><i class="icon-new icon-minicart"  ></i>立即下单</button>
					<button v-if="wuhuotongzhi" size="large" class="btn-nopro" disabled="disabled">暂时无货，到货通知</button>
					<button class="btn-like" @click="likepro" :class="{'btn-like-active':likeshow}">
					<i class="icon-new icon-like"></i>喜欢</button>
				</div>
			</div>
		</div>
		<div class="recommend" v-if="recomm.length>0">
			<div class="main-width clearfix">
				<h6><span>推荐搭配</span><em>温馨提示:购买组合时,组合内各商品购买数量为1</em></h6>
				<div class="rec-con">
					<div class="li-pro" v-if="choosesp.price==0">
						<img :src="shangp.product.modelImg | imgfilter">
						<p>
							<!--{{shangp.product.modelNo}}-->
							{{choosesp.itemNo}}
						</p><span v-if="choosesp.cuxiaoprice>0">¥{{choosesp.cuxiaoprice}}</span>
						<span v-else>¥{{choosesp.price}}</span>
					</div>
					<div class="li-pro" v-else>
						<img :src="choosesp.img | imgfilter">
						<p>{{choosesp.itemNo}}
						</p><span v-if="choosesp.cuxiaoprice>0">¥{{choosesp.cuxiaoprice}}</span><span v-else>¥{{choosesp.price}}</span>
					</div>
					<i class="icon-new icon-recadd"></i>
					<ul class="pro">
						<CheckboxGroup v-model="compine" @on-change="checkAllGroupChange">
							<li v-for="(item,index) in recomm " :key="index" :class="{none:item.show}" style="display:none">
								<router-link :to="{ path: '/sort/sortDetail',query:{id:item.list.product_bind_id} }" target="_blank">
									<img :src="item.list.list_img | imgfilter">
									<p>{{item.list.model_no}}</p>
								</router-link>
								<Checkbox :label="index" :key="index">
									<span v-if="JSON.stringify(item.promotion)=='{}'">¥{{item.list.sale_price | pricefilter}}</span>
									<span v-else>¥{{item.promotion.onSalePrice | pricefilter}} <em  class="abandoned" >{{item.list.sale_price | pricefilter}}</em></span>
								</Checkbox>

							</li>
						</CheckboxGroup>
					</ul>
					<div class="changepage fl"> <Icon type="ios-arrow-back"  @click="prev()"/><Icon type="ios-arrow-forward"  @click="next()"/>
						</div>
					<div class="compine fr">
						<p>已选择{{dpnum}}个配件
						</p>
						<p>组合价: ¥
							<span v-if="choosesp.cuxiaoprice>0&&dpjiage==0" class="color-newred">{{choosesp.cuxiaoprice}}</span>
							<span class="color-newred" v-if="choosesp.cuxiaoprice==0&&dpjiage==0">{{choosesp.price}}</span>
							<span class="color-newred" v-if="dpjiage>0">{{dpjiage}}</span></p>
						<button class="btn-cart" @click="atc" v-show="!wuhuotongzhi">加入购物车</button><button class="btn-xorder" v-show="!wuhuotongzhi" @click="buynow(1)">立即下单</button>
						<button class="btn-nopro" v-show="wuhuotongzhi">暂时无货</button>
					</div>
				</div>
			</div>
		</div>
		<div class="bg-lightgray padding40">
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
										<div class="zan"><span class="fr"><i class="icon-new icon-zan" :class="{'icon-zan-active':item.isZan=='Y' }" @click='zan(item.list.id,item.isZan)' ></i>{{item.number}}</span>{{item.list.commentTime | formatDate('yyyy-MM-dd hh:mm:ss')}}</div>
									</li>
								</ul>
							</div>
						</div>
						<!-- <p class="moreeval" @click="getcommentList" v-if="commentList.length>1">查看更多评价</p> -->
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
				cartList:[],
				cartOne:{
					id:'',
					image:'',
					originSalePrice:0,
					productName:'',
					quantity:1,
					salePrice:0,
					productType:'',
				},
				compine: [],
				compineList:[],
				onlyimg: false, //0为img为空。1显示图片
				//库存是否为0添加购物车显示按钮
				num: 0,
				isActive: false,
				videoshow: false,
				mousehidden: true,
				xiajia: false,
				wuhuotongzhi: false,
				firstshow: false,
				selectedId: -1,
				modal2: false,
				videoIcon: false,
				//商品最原始数据
				oldshangp: {
					product: {
						modelNo: ''
					},
					promotions: [],
					productImageList: [],
					productItemList: [],
					inventory: [],
					productAttrList: [],
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
				productDesc: [],
				productimg: [],
				cxshow: false,
				stock: false,
				choosesp: {
					id:'',
					img: '',
					itemNo: '',
					price: 0,//现价
					cuxiaoprice: 0,
					activityName: '',
					startTime: '',
					endTime: '',
					kucun: 0,
				},
				productItemId: '',
				quantity: 1,
				max: 100,
				productId: '',
				ImgUrl: '',
				choosepPrice: false,
				productImageListNew: [],
				recomm: [],
				commentList: [],
				dpjiage: 0,
				dpnum: 0,
				compineId: [],
				likeshow: false,
				index:4,
				listindex:5,
			}
		},
		methods: {
			checkAllGroupChange(data) {
				var _this = this;
				_this.dpnum = data.length;
				_this.dpjiage = 0;
				this.compineList=[];
				data.forEach((item,index) => {
					if(JSON.stringify(this.recomm[item].promotion)=="{}"){
						this.compineList.push({id:this.recomm[item].list.id,image:this.recomm[item].list.list_img,
							productName:this.recomm[item].list.item_no,quantity:1,originSalePrice:this.recomm[item].list.sale_price,
							salePrice:this.recomm[item].list.sale_price,
							productType:this.recomm[item].list.catalogId})
						this.dpjiage += parseFloat(this.recomm[item].list.sale_price);
					}else{
						this.compineList.push({id:this.recomm[item].list.id,image:this.recomm[item].list.list_img,
							productName:this.recomm[item].list.item_no,quantity:1,originSalePrice:this.recomm[item].list.sale_price,
							salePrice:this.recomm[item].promotion.onSalePrice,promotionTitle:this.recomm[item].promotion.activityName,
							productType:this.recomm[item].list.catalogId})
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
			//喜欢
			likepro() {
				let id = this.shangp.product.id;
				if(localStorage.getItem('token') != null && localStorage.getItem('token') != undefined) {
					this.$axios({
						method: 'post',
						url: `/like/queryIsLiked/${id}`,
					}).then((res) => {
						if(res) {
							this.$Message.info('该商品已在收藏列表');
						} else {
							this.likeshow = !this.likeshow;
							this.$axios({
								method: 'post',
								url: `/like/insert/${id}`,
							}).then((res) => {
								if(res.code == '200') {
									this.$Message.info('收藏成功');
								} else {
									this.$Message.error('收藏失败');
								}
							})
						}
					})
				} else {
					this.$Message.error('您尚未登录,请先登录');
				}

			},
			getlikepro(){
				let	id = this.shangp.product.id
				this.$axios({
						method: 'post',
						url: `/like/queryIsLiked/${id}`,
					}).then((res) => {
						this.likeshow = res;
					})
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
			changeNumber: function(event) {
				var obj = event.target;
				this.quantity = parseInt(obj.value);
			},
			//添加
			jia: function() {
				if(this.quantity >= this.max) {
					this.quantity = this.max
				} else {
					this.quantity = parseInt(this.quantity) + 1;
				}
			},
			//减
			jian: function() {
				if(this.quantity == 1) {
					this.quantity == 1
				} else {
					this.quantity = parseInt(this.quantity) - 1;
				}
			},
			pervlist(){
				this.$forceUpdate();
                if(this.listindex > 5){
                    let i = this.listindex-6;
                    this.shangp.productImageList[this.listindex-1].show = false;
                    this.shangp.productImageList[i].show =true;
					this.listindex--
				}
			},
			nextlist(){
				this.$forceUpdate();
				if(this.listindex < this.shangp.productImageList.length){
					let i =this.listindex-5
					this.shangp.productImageList[this.listindex].show = true;
					this.shangp.productImageList[i].show =false;
					this.listindex++;
				}
			},
			next(){
				if(this.index < this.recomm.length){
					let i =this.index-4
					this.recomm[this.index].show = true;
					this.recomm[i].show =false;
					this.index++;
				}
              },
            prev(){
                if(this.index > 4){
                    let i = this.index-5;
                    this.recomm[this.index-1].show = false;
                    this.recomm[i].show =true;
                    this.index--
                }
            },
			getIndex(imgUrl, index) {
				this.videoshow = false;
				this.ImgUrl = imgUrl;
				for(let i = 0; i < this.shangp.productImageList.length; i++) {
					if(index == i) {
						this.shangp.productImageList[i].clickItem = true;
					} else {
						this.shangp.productImageList[i].clickItem = false;
					}

				}
			},
			close() {
				this.videoshow = false;
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
			buynow(v) {
					if(localStorage.getItem('token') != null && localStorage.getItem('token') != undefined) {
				if(this.productItemId == "") {
					this.$Message.error('请选择商品属性');
					return
				}
				this.cartOne.id=this.choosesp.id;
				this.cartOne.image=this.choosesp.img;
				this.cartOne.productName=this.choosesp.itemNo;
				this.cartOne.quantity=this.quantity;
				this.cartOne.originSalePrice=this.choosesp.price;
				this.cartOne.salePrice=this.choosesp.cuxiaoprice;
				this.cartOne.promotionTitle=this.choosesp.activityName;
				this.cartOne.productType=this.shangp.product.catalogId;
				this.cartList[0]=this.cartOne;
				//0为单个立即下单，1为推荐组合中的立即下单
				if(v==1){
					this.cartList=this.cartList.concat(this.compineList)
				}
				sessionStorage.removeItem('cart');
				sessionStorage.setItem('cart', JSON.stringify(this.cartList));
				this.$router.push({ name:'/carttwo',query:{orderfrom:'A'}});
				}else{
				this.$router.push({
						path: '/login',
						query: {
							redirect: this.$route.fullPath
						}
					})	
				}
			},
			//加入购物车addtocart
			atc() {
				if(localStorage.getItem('token') != null && localStorage.getItem('token') != undefined) {
					if(this.productItemId == "") {
						this.$Message.error('请选择商品属性');
						return
					}
					let productItemIds = [];
					productItemIds.push(this.productItemId);
					if(this.compineId.length > 0) {
						productItemIds = this.compineId.concat(productItemIds);
						this.quantity = 1;
					}
					this.$axios({
						method: 'post',
						url: '/order/shopping/add',
						data: {
							productItemIds: productItemIds,
							quantity: this.quantity
						}
					}).then((res) => {
						if(res.code == '200') {
							Bus.$emit('cartmsg', "again");
							//this.$router.push({name:'/cartthree',query: { orderNo: res.msg}});  
							this.$router.push({
								name: '/cartzero',
								query: {
									cartBefore: this.choosesp.id
								}
							});
						} else {
							this.$Message.error('加入购物车失败');
						}
					})
				} else {
					this.$router.push({
						path: '/login',
						query: {
							redirect: this.$route.fullPath
						}
					})
				}
			},
			//选择商品
			detail() {
				var chooseId = "",
					jishu = 0;
				let dditem = this.$refs['dditem'];
				if(dditem!=null) {
					for(let n = 0; n < dditem.length; n++) {
						if(dditem[n].getAttribute("class") == 'active') {
							chooseId += dditem[n].getAttribute("titleid") + ',';
							jishu++
						}
					}
				}
				chooseId = (chooseId.slice(chooseId.length - 1) == ',') ? chooseId.slice(0, -1) : chooseId;
				var flag = false;
				if(jishu == this.shangp.productAttrList.length) {
					//通过选择属性读出productItemId
					for(let chooseItem of this.shangp.productItemList) {
						if(chooseItem.productModelAttrs == chooseId) {
							this.shangp.product.modelNo = chooseItem.itemNo;
							this.ImgUrl = chooseItem.listImg;
							this.choosesp.id=chooseItem.id;
							this.choosesp.img = chooseItem.listImg;
							this.choosesp.itemNo = chooseItem.itemNo;
							this.choosesp.price = chooseItem.salePrice;
							//若无促销，则促销价为原价
							this.choosesp.cuxiaoprice =chooseItem.salePrice;
							this.productItemId = chooseItem.id;
							if(this.shangp.promotions.length > 0) {
								for(let cxitem of this.shangp.promotions) {
									if(cxitem.productItemId == this.productItemId) {
										this.cxshow = true;
										this.choosesp.cuxiaoprice = cxitem.onSalePrice;
										this.choosesp.activityName = cxitem.activityName;
										this.choosesp.startTime = cxitem.startTime;
										this.choosesp.endTime = cxitem.endTime;
									}
								}
							}
							flag = true;
							break;
						} else {
							flag = false
						}
					}
					if(flag == false) {
						this.choosesp.itemNo = "";
						this.choosesp.price = "";
						this.xiajia = true
						this.firstshow = false
					} else {
						this.xiajia = false;
						this.firstshow = true
					}
					//计算库存（库存需大于0才显示）
					var kucunflag = false;
					if(this.shangp.inventory.length > 0) {
						for(let kucunitem of this.shangp.inventory) {
							if(kucunitem.skuId == this.productItemId) {
								kucunflag = true;
								this.choosesp.kucun = kucunitem.quantity - kucunitem.lockQuantity;
								if(this.choosesp.kucun < 0) {
									this.choosesp.kucun = 0;
								}
							}
						}
					}
					if(!kucunflag) {
						this.choosesp.kucun = 0;
					}
					if(this.choosesp.kucun < 1) {
						this.wuhuotongzhi = true;
					} else {
						this.wuhuotongzhi = false;
					}
					 this.getlikepro(this.productItemId);

				} else {
					return;
				}

			},
			//选择属性
			chooseSP(e, pa) {
				this.cxshow = false;
				let p = [];
				var i = 0;
				if(e.target.tagName == "IMG") {
					p = e.target.parentNode.parentNode.parentNode.children;
					for(i = 0; i < p.length; i++) {
						p[i].children[0].className = "";
					}
					e.target.parentNode.className = "active";
				} else {
					p = e.target.parentNode.parentNode.children;
					for(i = 0; i < p.length; i++) {
						p[i].children[0].className = "";
					}
					e.target.className = "active";
				}
				this.detail();
			},
			getParams() {
				// 取到路由带过来的参数 
				let routerParams = this.$route.query.id
				this.productId = routerParams;
			},

			//获取该商品信息
			getProduct() {
				let _this = this;
				_this.videoshow = false;
				this.$axios({
					method: 'post',
					url: '/product/' + this.productId,
				}).then((res) => {
					if(res.code == '200') {
						//原始数据用于合并求得的数据=>新数据
						_this.shangp = Object.assign({}, this.oldshangp, res.object);
						if(_this.shangp.inventory.length > 0) {
							for(let kucunitem of _this.shangp.inventory) {
								_this.choosesp.kucun += kucunitem.quantity - kucunitem.lockQuantity;
							}
							if(_this.choosesp.kucun < 0) {
								_this.choosesp.kucun = 0
							}
						}

						if(_this.choosesp.kucun < 1) {
							_this.wuhuotongzhi = true;
						} else {
							_this.wuhuotongzhi = false;
						}
						for(let a = 0; a < _this.shangp.productImageList.length; a++) {
							_this.shangp.productImageList[a].clickItem = false;
							if(a<5){
								_this.shangp.productImageList[a].show = true
							}else{
								_this.shangp.productImageList[a].show =false
							}
						}
						_this.ImgUrl = _this.shangp.product.modelImg;
						if(_this.shangp.productImageList.length > 0) {
							_this.shangp.productImageList[0].clickItem = true;
						}
						if(_this.shangp.product.video != '') {
							_this.videoIcon = true;
						}

					}
						this.getlikepro();
				});
			},
			getProductDesc() {
				//获得搭配
				this.$axios({
					method: "GET",
					url: "/product/match/" + this.productId,
				}).then(res => {
					if(res.code==200){
						for(let i =0; i<res.object.length;i++){
							if(i<4){
								res.object[i].show = true;
							}else{
								res.object[i].show =false
							}
						}
							this.recomm = res.object;
					}
				
				});
				this.$axios({
					method: 'post',
					url: '/product/desc/' + this.productId,
				}).then((res) => {
					this.productDesc = res;
				});

				//comment/search/{productId}/{isImg}
				this.$axios({
					method: 'post',
					url: '/product/img/' + this.productId,
				}).then((res) => {
					this.productimg = res;
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
					url: `/comment/search/${this.productId}/${imgshow}`,
				}).then((res) => {
					if(res.code == "200") {
						this.commentList = res.object;
					}
				});
			},
			// getcommentList(){
			// 	d
			// }
		},
		mounted() {
			this.getParams();
			this.getProduct();
			this.showcomments();
			setTimeout(() => {
				this.detail();
			}, 1000)
			this.getProductDesc();
		
		},
	}
</script>
<style lang="scss" scoped="scoped">
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
			width: 150px;
			display: inline-block;
			text-align: right;
			padding-right: 20px;
		}
	}
	
	.spec {
		width: 520px;
	}
	
	.big {
		width: 520px;
		height: 520px;
		border: 3px solid #e5e5e5;
		align-items: center;
		display: flex;
		justify-content: center;
		margin-bottom: 23px;
		position: relative;
	}
	
	.small li {
		cursor: pointer;
		float: left;
		border: 1px solid transparent;
	}
	
	.small li img {
		width: 84px;
		height: 84px;
	}
	.small .nextp{
		width: 20px;
		text-align: center;
		line-height: 80px;
		font-size: 50px;
		position: relative;
		left: -20px;
	}
	.small li:nth-last-of-type(1) {
			float: right;
	}
	.small li:nth-child(n+2) {
		margin-left: 8px;
	}
	.small li:hover,
	.small .active {
		border-color: #000000;
	}
	.small .nextp:hover{
		border: none;
	}	
	.iteminfo {
		font-size: 15px;
	}
	
	.iteminfo h1 {
		font-size: 28px;
		color: #111;
		height: 35px;
	}
	
	.itemtitle span {
		color: #f00;
	}
	
	.summary dl {
		border-bottom: 1px solid #e5e5e5;
		padding-top: 15px;
		padding-bottom: 20px;
		display: flex;
	}
	
	dl.noborder {
		border-bottom: 0 none;
		padding-bottom: 5px;
	}
	
	.summary dt {
		width: 80px;
		font-size: 15px;
		float: left;
	}
	
	.summary dd {
		float: left;
		width: 560px;
	}
	
	.sku-price {
		font-size: 28px;
	}
	
	dl.dl-base {
		align-items: baseline;
	}
	
	.summary {
		width: 640px;
	}
	.none{
		display: block!important;
	}
	.act {
		width: 65px;
		height: 25px;
		text-align: center;
		display: inline-block;
		background: #FF0037;
		color: #fff;
	}
	
	.color-sel li {
		float: left;
	}
	
	.color-sel li span {
		display: inline-block;
		width: 270px;
		height: 50px;
		border: 1px solid #E5E5E5;
		margin-bottom: 15px;
		cursor: pointer;
		text-align: center;
		line-height: 50px;
	}
	
	.color-sel li:hover span,
	.color-sel li span.active {
		border-color: #FF0030;
	}
	
	.color-sel li:nth-child(2n) {
		margin-left: 20px;
	}
	
	.number {
		position: relative;
		width: 73px;
		display: inline-block;
		margin-right: 20px;
	}
	
	.number input {
		border: 1px solid #e5e5e5;
		width: 73px;
		height: 45px;
		padding-left: 20px;
	}
	
	.opt {
		margin-top: 30px;
		padding-left: 54px;
	}
	
	.opt button {
		height: 50px;
		border: 0 none;
		font-size: 14px;
		color: #fff;
		line-height: 50px;
		margin-left: 13px;
	}
	
	.opt button i {
		margin-right: 5px;
	}
	
	.btn-cart,
	.btn-xorder,
	.btn-nopro {
		width: 215px;
	}
	
	.btn-cart {
		background: #eb6100;
	}
	
	.btn-nopro {
		background: #666;
		cursor: not-allowed;
	}
	
	.btn-xorder {
		background: #e21818;
	}
	
	.btn-like {
		width: 108px;
		background: #ccc;
	}
	
	.btn-like-active {
		background: #FF0000;
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
		margin-right:10px;
	}
	.recommend h6 em{
		font-size: 12px;
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
	
	.swith-tab {}
	
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
	/*	width: 840px;*/
		padding-left: 40px;
		/*border-right: 1px solid #777;*/
	}
	
	.eval-fr {
		width: 360px;
		padding-left: 35px;
		padding-right: 35px;
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
		max-width: 150px;
		max-height: 150px;
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
	
	.maybe h5 {
		text-align: center;
		margin-top: 115px;
		position: relative;
		margin-bottom: 45px;
	}
	
	.maybe h5 span {
		font-size: 27px;
		color: #333;
		position: absolute;
		z-index: 2;
		left: 50%;
		top: -9px;
		background: #f0f0f0;
		width: 206px;
		margin-left: -103px;
	}
	
	.maybe h5 hr {
		overflow: hidden;
		width: 100%;
		height: 1px;
		background-color: #cccccc;
		display: inline-block;
		border: 0 none;
		position: relative;
		top: 0px;
		left: 0;
	}
	
	.maybe .changepage {
		margin-top: 25px;
		padding-bottom: 55px;
		text-align: center;
	}
	
	.mt50 {
		margin-top: 50px;
	}
	
	.color-sel img {
		width: 40px;
		height: 40px;
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
	
	.youku {
		width: 100%;
		height: 95%;
	}
	.pro li a {
		display: block;
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