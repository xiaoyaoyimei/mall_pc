<template>
<div class="sort">
	<div class="main-wdith mt20 ">
		<div class="selector mt20">
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
          	 	<span v-for="(item,index) in brand"  @click="getList('brand',item.id,index)" :class="{active: index == brandindex}">{{item.brandName}}</span></div> 
        	</div>
        </div>
        <ul class="search_list_wrap clearfix" >
        	<div class="empty_result flex-center"  v-if="productList.length<1">
                    <div class="icon icon_unit_notice"></div>
                    <span >该区域没有符合搜索条件的产品哦~</span>
             </div>
            <li  v-for="(item, index) in productList" :key='index' v-else>
               <router-link :to="{ path: '/sort/sortDetail',query:{id:item.id} }" tag="a" >
                     <img :src='item.model_img |imgfilter'>
                </router-link>
                <div  class="title">{{item.model_no}}</div>
                <div class="name">{{item.model_name}}</div>
                <div  class="sku_tag"v-if="item.promotionTitle !=null">{{item.promotionTitle}}</div> 
                <div class="price">{{item.sale_price}}</div>
            </li>
            </ul>
            <Page :total="totalSize" size="small" show-elevator class="page" :page-size='this.pageSize' @on-change="handlePage" v-if="productList.length>0"></Page>
        </div>
          <Spin size="large" fix v-if="spinShow"></Spin>
       </div>
</template>
<script>
	// 引入公共的bug，来做为中间传达的工具
	import Bus from '@/assets/js/bus.js';
    export default {
        data () {
            return {
            	spinShow:true,
				productList:[],
				startRow:0,
                pageSize:16,
				title:'',
                totalSize:0,
                catalog:[],
                type:[],
                series:[],
                brand:[],
                catalogindex:-1,
                typeindex:-1,
                seriesindex:-1,
                brandindex:-1,
                //顶部筛选条件
                searchfilter:{
                	catalog:'',
                	type:'',
               		series:'',
                	brand:'',
                },
			}
        },
		methods:{
			//获取顶部筛选
			  getParams () {
			  	if(this.$route.query.typeid!=undefined){
			        this.getList('type',this.$route.query.typeid,this.$route.query.typeindex)
			       }
		      },
            getTop(){
            	this.$axios({
					method: 'GET',
					url:'/product/catalog',
				}).then((res)=>{
					this.catalog = res;
				})
            	   this.$axios({
					method: 'GET',
					url:'/product/brand',
				}).then((res)=>{
					this.brand = res;
				})
				  this.$axios({
					method: 'GET',
					url:'/product/series',
				}).then((res)=>{
					this.series = res;
				})
				  this.$axios({
					method: 'GET',
					url:'/product/type',
				}).then((res)=>{
					this.type = res;
				})
				this.spinShow=false
            },
            //点击顶部筛选
			getList(type,value,index){
				if(type=='catalog'){
					this.catalogindex=index;
					this.searchfilter.catalog=value
				}
				if(type=='type'){
					this.typeindex=index;
					this.searchfilter.type=value
				}
				if(type=='series'){
					this.seriesindex=index;
					this.searchfilter.series=value
				}
				if(type=='brand'){
					this.brandindex=index;
					this.searchfilter.brand=value
				}
                this.$axios({
					method: 'GET',
					url:'/product/search?catalog='+this.searchfilter.catalog+'&series='+this.searchfilter.series+'&type='+this.searchfilter.type+'&brand='+this.searchfilter.brand+'&startRow='+this.startRow+'&pageSize='+this.pageSize,
				}).then((res)=>{
					this.productList = res.itemsList;
					this.totalSize=res.total;
				})
			},
			//点击header的搜索
			getTopList(searchdata){
				//首页若传typeid,则跳出。走getParams
				if(this.$route.query.typeid!=undefined){
					return ;
				}
				  this.$axios({
					method: 'GET',
					url:'/product/search?keyWord='+searchdata+'&startRow='+this.startRow+'&pageSize='+this.pageSize,
				}).then((res)=>{
					this.productList = res.itemsList;
					this.totalSize=res.total;
				})
			},
            handlePage(value) { 
                this.startRow =(value-1) * this.pageSize ;  
                this.getList();
            },
		},
		 mounted(){
		 	var vm = this
           // 用$on事件来接收参数
		      Bus.$on('val', (data) => {
		           this.getTopList(data);
		      });
		      this.getTopList('');
		      //得到顶部分类
		      this.getTop();
		      //首页点击左侧分类
		      this.getParams();
          },
    }
</script>

<style lang="scss" scoped="scoped">
 .empty_result .icon_unit_notice {
        display: inline-block;
    width: 64px;
    height: 64px;
    background-position:  -104px -248px;
}
 .empty_result span{
 	margin-top: 20px;
 	font-size: 16px;
 }
.page{
	margin-top:40px;
	text-align: center;
	padding-bottom: 50px;
}
.selector{
    line-height: 40px;
    
    font-size: 14px;
     color:#333;
}
.selector{
	border-top:1px solid #ccc
}
.selector dl{
	 border-width: 0 0 1px ;
    border-style: solid;
    border-color:#ddd;
}
.selector .dt{
	font-weight: bold;
	float: left;
    width: 100px;
    padding-left: 10px;
    white-space: nowrap;
    overflow: hidden;
    background: #f1f1f1;
}
.selector .dd{
    margin-left: 110px;
    padding-left: 10px;
    overflow: hidden;
    zoom: 1;
}
.selector .dd span{
	cursor: pointer;
	text-align: center;
	padding: 0 20px;
	display: inline-block;
    }
    .selector .dd span:hover{
    	color: #0099ff;
    }
.selector .active {
  color: #0099ff;
  font-weight: bold;
}
.search_list_wrap{
	margin-top: 30px;
}
.wrap{
	border-bottom: 1px solid #ddd;
}
</style>
