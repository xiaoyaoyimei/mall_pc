<template>
	<div class="new">
		<div class="selector mt20 main-wdith">
			<p>
				<router-link to="/">首页</router-link> &gt; 全部结果 </p>
				{{totalSize}}{{productList}}
			<div v-if="totalSize>0">
				<div class="wrap">
					<div class="dt">类型:</div>
					<div class="dd">
						<span @click="getList('catalog','',-1)" :class="{active: '-1' == catalogindex}">全部</span>
						<span v-for="(item,index) in catalog" @click="getList('catalog',item.id,index)" :class="{active: index ==catalogindex}">{{item.catalogName}}</span>
					</div>
				</div>
				<div class="wrap">
					<div class="dt">分类:</div>
					<div class="dd">
						<span @click="getList('type','',-1)" :class="{active: '-1' == typeindex}">全部</span>
						<span v-for="(item,index) in type" @click="getList('type',item.id,index)" :class="{active: index ==typeindex}">{{item.typeName}}</span>
					</div>
				</div>
				<div class="wrap">
					<div class="dt">系列:</div>
					<div class="dd">
						<span @click="getList('series','',-1)" :class="{active: '-1' == seriesindex}">全部</span>
						<span v-for="(item,index) in series" @click="getList('series',item.id,index)" :class="{active: index == seriesindex}">{{item.seriesName}}</span></div>
				</div>
				<div class="wrap">
					<div class="dt">品牌:</div>
					<div class="dd">
						<span @click="getList('brand','',-1)" :class="{active: '-1' == brandindex}">全部</span>
						<span v-for="(item,index) in brand" @click="getList('brand',item.id,index)" :class="{active: index == brandindex}">{{item.brandName}}</span></div>
				</div>
				<ul class="clearfix mylike">
					<li v-for="(item, index) in productList" :key='index'>
						<router-link :to="{ path: '/sort/sortDetail',query:{id:item.id} }">
							<i v-if="item.promotionTitle !=null">{{item.promotionTitle}}</i>

							<img :src='item.model_img |imgfilter' alt="">
							<p class="ptitle">{{item.model_name}}</p>
							<p class="red">{{item.sale_price}}</p>
						</router-link>
					</li>
				</ul>
				<Page :total="totalSize" size="small" show-elevator class="page" :page-size='this.pageSize' @on-change="handlePage" v-if="productList.length>0"></Page>
			</div>
		<div class="empty_result flex-center"   v-else>
				<Icon type="ios-warning" />
				<span>该区域没有符合搜索条件的产品哦,试试其他关键字~</span>
			</div>
		</div>
		<Spin size="large" fix v-if="spinShow"></Spin>
	</div>
	</div>
</template>
<script>
	// 引入公共的bug，来做为中间传达的工具
	import Bus from '@/assets/js/bus.js';
	export default {
		data() {
			return {
				searchdate: '',
				spinShow: false,
				productList: [],
				startRow: 0,
				pageSize: 16,
				title: '',
				totalSize: 0,
				catalog: [],
				type: [],
				series: [],
				brand: [],
				catalogindex: -1,
				typeindex: -1,
				seriesindex: -1,
				brandindex: -1,
				//顶部筛选条件
				searchfilter: {
					catalog: '',
					type: '',
					series: '',
					brand: '',
				},
				flag: true,
			}
		},
		methods: {
			//获取顶部筛选
			getParams() {
				if(this.$route.query.typeid != undefined) {
					this.getList('type', this.$route.query.typeid, this.$route.query.typeindex)
				}
			},
			getTop() {
				this.$axios({
					method: 'GET',
					url: '/product/catalog',
				}).then((res) => {
					this.catalog = res;
				})
				this.$axios({
					method: 'GET',
					url: '/product/brand',
				}).then((res) => {
					this.brand = res;
				})
				this.$axios({
					method: 'GET',
					url: '/product/series',
				}).then((res) => {
					this.series = res;
				})
				this.$axios({
					method: 'GET',
					url: '/product/type',
				}).then((res) => {
					this.type = res;
				})
				this.spinShow = false
			},
			//点击顶部筛选
			getList(type, value, index) {
				if(type == 'catalog') {
					this.catalogindex = index;
					this.searchfilter.catalog = value
				}
				if(type == 'type') {
					this.typeindex = index;
					this.searchfilter.type = value
				}
				if(type == 'series') {
					this.seriesindex = index;
					this.searchfilter.series = value
				}
				if(type == 'brand') {
					this.brandindex = index;
					this.searchfilter.brand = value
				}
				this.$axios({
					method: 'GET',
					url: '/product/search?catalog=' + this.searchfilter.catalog + '&series=' + this.searchfilter.series + '&type=' + this.searchfilter.type + '&brand=' + this.searchfilter.brand + '&startRow=' + this.startRow + '&pageSize=' + this.pageSize,
				}).then((res) => {
					this.productList = res.itemsList;
					this.totalSize = res.total;
				})
			},

			//点击header的搜索
			getTopList(searchdata) {
				//console.log(searchdata)
				//首页若传typeid,则跳出。走getParams
				if(this.$route.query.typeid != undefined) {
					return;
				}
//				if( searchdata == undefined){
//					searchdata =	this.$route.query.keyword
//				}
				this.$axios({
					method: 'GET',
					url: '/product/search?keyWord=' + searchdata + '&startRow=' + this.startRow + '&pageSize=' + this.pageSize,
				}).then((res) => {
					this.productList = res.itemsList;
					this.totalSize = res.total;
				})

			},
			handlePage(value) {
				this.startRow = (value - 1) * this.pageSize;
				this.getList();
			},
		   myhandle (val) {
		      console.log(val, '这是从上个页面传递过来的参数')
		   },
		},
		beforeCreate(){
		console.log("beforeCreate")
	
		},
		created() {
				console.log("created")
		
		},
		beforeMount(){
			console.log("beforeMount")
		},
		mounted() {
			console.log("mounted")
				
			this.getTop();
			//首页点击左侧分类
			this.getParams();
				   Bus.$on('val', (data) => {
							console.log('B页面mounted'+data)
							})
				//this.getTopList();
		},
		beforeUpdate(){
		//	Bus.$off('val')
			console.log("beforeUpdate")
		},
			updated(){
			console.log("updated")
		},
		beforeDestroy(){
			console.log("beforeDestroy")
			Bus.$off('val')
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.new {
		width: 100%;
		background-color: #F2F2F2;
		padding: 29px 0px 75px;
	}

	.mylike li {
		cursor: pointer;
		float: left;
		width: 290px;
		margin-right: 10px;
		position: relative;
		text-align: center;
		margin-top: 15px;
		background-color: #ffffff;
	}

	.mylike li:nth-of-type(4n) {
		margin-right: 0px;
	}

	.mylike img {
		margin-top: 60px;
		width: 260px;
		height: 260px;
		display: inline-block;
	}

	.mylike li span {
		position: absolute;
		top: 10px;
		right: 10px;
		color: #c6c6c6;
		font-weight: 400;
		font-size: 24px;
		border: none;
		padding: 0px;
		cursor: pointer;
	}

	.mylike li i {
		position: absolute;
		border: 1px solid #ff0000;
		top: 15px;
		left: 20px;
		width: 60px;
		height: 24px;
		color: #FF0000;
		font-weight: 400;
		font-size: 13px;
		text-align: center;
		line-height: 20px;
		cursor: pointer;
	}

	.mylike li span.red {
		position: absolute;
		top: 18px;
		right: 10px;
		color: #ff0000;
		font-size: 24px;
		margin: 0;
	}

	.mylike .ptitle {
		font-weight: 400;
		font-size: 14px;
		text-align: center;
		color: #333333;
		height: 30px;
		line-height: 30px;
		margin: 0px;
		padding: 0px;
		text-overflow: ellipsis;
		margin-top: 10px;
		white-space: nowrap;
		overflow: hidden;
		text-align: center;
		padding: 0 20px;
	}

	.new .mylike .ptitle:hover {
		color: #333333;
	}
	.mylike .pt {
		font-weight: 400;
		font-size: 14px;
		text-align: center;
		color: #999999;
		height: 21px;
		line-height: 21px;
		margin: 0px;
		padding: 0px;
	}

	.new .mylike .pt:hover {
		color: #999999;
	}

	.new .mylike .red:hover {
		color: #FF0000;
	}

	.mylike .red {
		height: 21px;
		line-height: 21px;
		margin: 0px;
		padding: 0px;
		font-weight: 400;
		font-style: normal;
		font-size: 14px;
		color: #FF0000;
		text-align: center;
		margin-bottom: 28px;
	}

	.shoppinglistnav {
		margin-top: 25px;
		margin-bottom: 0px;
		height: 41px;
	}

	.shoppinglistnav span {
		float: left;
		width: 90px;
		height: 41px;
		text-align: center;
		line-height: 41px;
		font-weight: 400;
		font-size: 14px;
		color: #666666;
	}

	.shoppinglistnav span:hover {
		color: #ff0000;
	}

	.selector {
		line-height: 40px;
		font-size: 14px;
		color: #333;
	}

	.selector dl {
		border-width: 0 0 1px;
		border-style: solid;
		border-color: #ddd;
	}

	.selector .dt {
		font-weight: bold;
		float: left;
		width: 100px;
		padding-left: 10px;
		white-space: nowrap;
		overflow: hidden;
		background: #f1f1f1;
	}

	.selector .dd {
		margin-left: 110px;
		padding-left: 10px;
		overflow: hidden;
		zoom: 1;
	}

	.selector .dd span {
		cursor: pointer;
		text-align: center;
		padding: 0 20px;
		display: inline-block;
	}

	.selector .dd span:hover {
		color: #ff0037;
	}

	.mylike {
		margin-bottom: 20px;
	}

	.selector .active {
		color: #ff0037;
		font-weight: bold;
	}

	.search_list_wrap {
		margin-top: 30px;
	}

	.wrap {
		border-bottom: 1px solid #ddd;
	}

	.page {
		text-align: center;
	}
</style>
