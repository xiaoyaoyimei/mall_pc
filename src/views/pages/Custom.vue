<template>
	<div class="customPage">

		<div class="main-wdith">
			<h1 class="headline">{{pro.itemNo}} </h1>
			<div class="wrap clearfix">
				<div class="main" id="radom">
					<canvas id="imgCanvas" width="514" height="50"></canvas>
					<canvas id="textCanvas" width="514" height="230"></canvas>
					<img :src="pro.img | imgfilter" ref="fatherImg"></div>
				<div class="section">
					<dl><dt>商品单价<span class="waring">￥{{pro.cuxiaoprice | pricefilter}}</span></dt></dl>
					<dl><dt>上传logo<span class="waring">(定制价格<strong>￥{{custom.logoPrice | pricefilter}}</strong>)</span>
						<Upload :action="uploadUrl" :on-success="handleSuccess" :on-remove="handleRemove" ref="upload" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :format="['ai','png']">
							<Button icon="ios-cloud-upload-outline" >上传LOGO</Button>
						</Upload>
						<img :src="childImg | imgfilter" ref="childImgremove" class="max250" /></dt></dl>
					<dl><dt>输入文字<span class="waring">(定制价格<strong>￥{{custom.textPrice | pricefilter}}</strong>)</span>
						<label style="color: #e98e0b;">(提示:中文最多8个字,英文最多16个字)</label></dt>
						<dd>
							<Select style="width:100px" v-model="modelFont" @on-change="drawfont()">
								<Option v-for="item in fontList" :value="item.font" :key="item.font">{{ item.name }}</Option>
							</Select>
							<Select v-model="modelColor" style="width:100px" @on-change="drawfont()">
								<Option v-for="item in colorList" :value="item.color" :key="item.color">{{ item.name}}</Option>
							</Select>
							<Select v-model="modelSize" style="width:100px" @on-change="drawfont()">
								<Option v-for="item in sizeList" :value="item.size" :key="item.size">{{ item.name }}</Option>
							</Select>
							<Input @on-blur="drawfont()" v-model="fonttext" placeholder="输入你要的定制文字" style="text-align: center;width: 200px;" />
							<div>
							</div>
						</dd>
					</dl>
					<!--<div class="number">
						<input value="1" type="text" v-model="quantity" v-on:blur="changeNumber($event)">
						<i class="icon-new icon-add" @click="jia"></i><i class="icon-new icon-minus" @click="jian"></i></div>-->
					<Button @click="buynow()" type="primary">立即下单</Button>
					<div class="mt5">请注意:点击立即下单，即表示您同意并愿意遵守DXRacer<strong style="cursor: pointer;" @click="mzsmModel=true">《免责申明》</strong></div>
				</div>
			</div>
		</div>
		<div class="bg-lightgray padding40">
			<div class="main-wdith">
				<ul class="swith-tab pt50 clearfix">
					<li @click="toggletab(0)" :class="{active:0 == num}">定制说明</li>
					<li @click="toggletab(1)" :class="{active:1 == num}">免责申明</li>
				</ul>
				<div class="intro_bg">
					<div v-show=" 0 == num" class="pro_intro">
						<p>1、迪瑞克斯定制商品类型共三种：图形（logo）定制 、文字（logo）定制、文字+图形（logo）定制，您可以按照需求自行选择，单件即可定制；</p>

						<p>2、定制类商品的购买价格：所选商品基础价格+定制服务费；</p>

						<p>3、定制类型上传格式：图形（logo）定制上传logo格式仅支持AI格式源文件或透明底png图片，具体请咨询客服；</p>

						<p>4、由于工厂在定制过程中采用的是绣花工艺，为了保证质量和效果，客户上传的图形logo不可出现渐变色，只可以是纯色，</p>

						<p>5、若客户上传的图形logo过于复杂，则需要客户根据我方工艺条件对logo进行适当简化，或者由我方根据实际工艺调整logo线条，因此客户可根据logo的复杂程度提前联系客服沟通方案的可行性后，再确认拍下 注：若超出我方工艺限制的图形logo在未联系客服了解前盲目下单，所上传信息格式或内容不正确，后台系统将会视为定制失败，进行退款处理，因此定制前有任何疑虑，请联系客服；
						</p>

						<p>6、字体选择：三种字体可供选择，标准体（宋体，思源黑体，思源黑体粗体）、少女体（贤二体，站酷小微体，站酷快乐体）、艺术体（庞门正道标题体，站酷高端黑，站酷酷黑），客户可在三种字体中任选一种进行定制； 注：考虑到客户系统中或许没有安装以上字体或者配置过低会影响字体展示效果，若在选择完后会无法显示所选字体式样，大家可在下方的定制文字说明中先行比较后再选择字体类型；
						</p>
						<dl>
							<dt>定制价格说明:</dt>
							<dd>本款定制LOGO<strong class="waring">￥{{custom.logoPrice | pricefilter}}</strong>
								本款定制文字<strong class="waring">￥{{custom.textPrice | pricefilter}}</strong> </dd>
							<dt>定制文字说明:</dt>
							<dd><img src="../../assets/img/customfont.png"></dd>
						</dl>
					</div>
					<div v-show=" 1 == num" class="pro_intro">
						<mzsm></mzsm>
					</div>
				</div>

			</div>
		</div>
			<Modal v-model="mzsmModel" title="免责申明" width="760px">
			<mzsm></mzsm>
		</Modal>
		<modal title="查看 定制大图" class="Myinfo" v-model="visible">
			<img :src="finalImg" style="width: 100%">
		</modal>
	</div>
</template>

<script>
	//	import img2 from "../../assets/img/zp.png"
	import Mzsm from '@/components/Mzsm'
	import store from '@/store/store';
	export default {
		data() {
			return {
				mzsmModel:false,
				visible: false,
				num: 0,
				cartOne: {
					id: '',
					image: '',
					originSalePrice: 0,
					productName: '',
					quantity: 1,
					salePrice: 0,
					productType: '',
				},
				quantity: 1,
				finalImg: '',
				modelSize: '14px',
				sizeList: [],
				fontList: [],
				modelFont: 'Microsoft YaHei',
				colorList: [],
				modelColor: '#ffffff',
				fonttext: "",
				uploadUrl: this.$axios.defaults.baseURL + '/upload/upload?path=custom',
				custom: {
					show: false, //是否显示定制按钮
					logoPrice: 0,
					textPrice: 0
				},
				pro: {},
				childImg: "",
				customImg: "",
				imgdata: [],
				len: 0,
				cartList: [],
				cartTwoCustom: {
					logoPrice: 0,
					textPrice: 0
				},
				orderCustom: {
					finalPic: '',
					customLogo: '',
					customText: '',
					textFont: '',
					textColor: ''
				}
			}
		},
		components: {
			Mzsm
		},
		computed: {
			token() {
				//获取store里面的token
				return store.state.token;
			},
		},
		methods: {
			getBase() {
				this.$axios({
					method: 'POST',
					url: '/config/configColor',
				}).then((res) => {
					this.colorList = res;
				})
				this.$axios({
					method: 'POST',
					url: '/config/configFont',
				}).then((res) => {
					this.fontList = res;
				})
				this.$axios({
					method: 'POST',
					url: '/config/configSize',
				}).then((res) => {
					this.sizeList = res;
				})
			},
			handleFormatError(file) {
				this.$Notice.warning({
					title: '图片格式不符要求',
					desc: '该 ' + file.name + ' 图片格式不正确, 请选择 .ai或者.png图片'
				});
			},
			handleMaxSize(file) {
				this.$Notice.warning({
					title: '图片过大',
					desc: '该  ' + file.name + ' 图片过大, 请小于 5M.'
				});
			},
			toggletab(num) {
				this.num = num;
			},
			getParams() {
				// 取到路由带过来的参数
				this.custom = JSON.parse(localStorage.getItem('custom'));
				this.pro = JSON.parse(localStorage.getItem('custompro'));
			},
			buynow() {
				if(this.childImg == '' && this.fonttext == '') {
					this.$Message.info('请至少选择LOGO或文字里面的一样进行定制');
					return false;
				}
				this.draw().then(() => {
					if(this.token != null && this.token != "" && this.token != undefined) {
						this.cartOne.id = this.pro.id;
						this.cartOne.productId = this.pro.productId;
						this.cartOne.image = this.pro.img;
						this.cartOne.productName = this.pro.itemNo;
						this.cartOne.quantity = this.quantity;
						this.cartOne.originSalePrice = this.pro.price;
						if(this.childImg != '') {
							this.cartTwoCustom.logoPrice = this.custom.logoPrice * this.quantity;
						}
						if(this.fonttext != '') {
							this.cartTwoCustom.textPrice = this.custom.textPrice * this.quantity;
						}
						this.cartOne.salePrice = this.pro.cuxiaoprice;
						this.cartOne.promotionTitle = this.pro.activityName;
						this.cartOne.productType = this.pro.productType;
						this.cartOne.productCatalog = this.pro.productCatalog;
						this.cartList[0] = this.cartOne;
						//0为单个立即下单，1为推荐组合中的立即下单
						sessionStorage.removeItem('cart');
						sessionStorage.setItem('cart', JSON.stringify(this.cartList));
						sessionStorage.setItem('cartTwoCustom', JSON.stringify(this.cartTwoCustom));
						sessionStorage.removeItem('orderCustom');
						//finalImg可以不要
						this.orderCustom.finalPic = this.finalImg;
						this.orderCustom.customLogo = this.childImg;
						this.orderCustom.customText = this.fonttext;
						this.orderCustom.textFont = this.modelFont;
						this.orderCustom.textColor = this.modelColor;
						sessionStorage.setItem('orderCustom', JSON.stringify(this.orderCustom));
						this.$router.push({
							name: '/carttwo',
							query: {
								orderfrom: 'C'
							}
						});
					} else {
						this.$router.push({
							path: '/login',
							query: {
								redirect: this.$route.fullPath
							}
						})
					}
				}).catch((value) => {

				})

			},
			changeNumber: function(event) {
				var obj = event.target;
				this.quantity = parseInt(obj.value);
				let n = /^[1-9]\d*$/;
				if(!n.test(obj.value)) {
					this.$Message.warning('商品数量须大于0个，请输入正整数');
					obj.value = 1
					this.quantity = 1
					return false;
				}
			},
			//添加
			jia: function() {
				this.quantity = parseInt(this.quantity) + 1;
			},
			//减
			jian: function() {
				if(this.quantity <= 1) {
					this.quantity = 1
				} else {
					this.quantity = parseInt(this.quantity) - 1;
				}
			},
			//绘制TEXT
			drawfont: function() {
				let c = document.getElementById("textCanvas");
				let ctx = c.getContext("2d");
				ctx.clearRect(0, 0, 514, 230);
				if(this.fonttext != "") {
					let fs = this.modelSize + ' ' + 'xianer';
					ctx.font = fs;
					ctx.textAlign = "center";
					ctx.fillStyle = this.modelColor;
					if(this.childImg != '') {
						ctx.fillText(this.fonttext, 257, 190);
					} else {
						ctx.fillText(this.fonttext, 257, 140);
					}
				}

			},
			handleRemove() {
				var c = document.getElementById("imgCanvas");
				var ctx = c.getContext("2d");
				ctx.clearRect(0, 0, 514, 50);
				this.$refs['childImgremove'].src = "";
			},
			handleSuccess(res, file) {
				const fileList = this.$refs.upload.fileList;
				if(fileList.length > 1) {
					this.$refs.upload.fileList.splice(0, 1);
				}

				file.url = res.msg;
				this.childImg = res.msg;
				//绘制LOGO
				let c1 = document.getElementById("textCanvas");
				let ctx1 = c1.getContext("2d");
				ctx1.clearRect(0, 0, 514, 140);
				var c = document.getElementById("imgCanvas");
				var ctx = c.getContext("2d");
				ctx.clearRect(0, 0, 514, 50);
				var img = new Image;
				img.crossOrigin = '*'; //解决跨域
				img.src = this.global_.imgurl + res.msg;
				img.onload = function() {
					ctx.drawImage(img, 232, 0, 50, 50);
				}
			},
			draw() {
				var self = this;
				return new Promise(function(resolve, reject) {

					var c = document.createElement('canvas');
					var ctx = c.getContext('2d');
					c.width = 514;
					c.height = 514;
					ctx.rect(0, 0, c.width, c.height);
					ctx.fillStyle = '#fff';
					ctx.fill();
					var img = new Image;
					img.setAttribute("crossOrigin", 'Anonymous')
					img.src = self.global_.imgurl + self.pro.img;
					img.onload = function() { //图片加载完，再draw 和 toDataURL
						ctx.drawImage(img, 0, 0, 514, 514);
						if(self.fonttext != '') {
							let fs = self.modelSize + ' ' + self.modelFont;
							ctx.font = fs;
							ctx.fillStyle = self.modelColor;
							ctx.textAlign = "center";
							if(self.childImg != '') {
								ctx.fillText(self.fonttext, 257, 190);
							} else {
								ctx.fillText(self.fonttext, 257, 140);
							}

						}
						self.finalImg = c.toDataURL("image/png");
						resolve();
					};
					if(self.childImg != '') {
						var img2 = new Image;
						img2.setAttribute("crossOrigin", 'Anonymous')
						img2.src = self.global_.imgurl + self.childImg;
						img2.onload = function() { //图片加载完，再draw 和 toDataURL
							ctx.drawImage(img2, 232, 130, 50, 50);
							self.finalImg = c.toDataURL("image/png");
							resolve();
						};
					}
				})

			}

		},
		mounted() {
			this.getParams();
			this.getBase();
		}
	}
</script>

<style scoped="scoped">
	#imgCanvas {
		position: absolute;
		left: 0;
		top: 24%;
	}
	
	#textCanvas {
		position: absolute;
		left: 0%;
		top: 0;
		text-align: center;
	}
	
	.headline {
		font-size: 2.25rem;
		line-height: 3.5rem;
		padding-bottom: 0;
		color: #000;
		font-size: 18px;
	}
	
	.main {
		box-shadow: 0 0 5px #ccc;
		width: 514px;
		display: inline-block;
		position: relative;
		float: left;
	}
	
	.main image {
		max-width: 514px;
	}
	
	.section {
		margin-left: 15px;
		font-size: 14px;
		display: inline-block;
	}
	
	.section dl {
		margin-bottom: 15px;
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
	
	.waring {
		color: #ea2f3d;
	}
	
	.textcenter {
		text-align: center;
	}
	
	.max250 {
		max-width: 250px;
		max-height: 250px;
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
	
	.intro_bg {
		background: #fff;
	}
	
	.pro_intro {
		font-size: 14px;
		padding: 50px;
	}
	
	.pro_intro dt {
		padding-bottom: 30px;
		padding-top: 30px;
		color: #333
	}
	
.mt5{
	margin-top: 5px;
}
</style>
<style>
	.customPage .ivu-input {
		text-align: center;
	}
</style>