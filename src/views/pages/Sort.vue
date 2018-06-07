<template>
<div class="sort">
	<div class="main-wdith mt20 selector">
		   <div class="wrap">
	            <div class="dt">类型:</div>
	            <div class="dd"><span v-for="item in catalog" >{{item.catalogName}}</span></div>
            </div>
            <div class="wrap">
	            <div class="dt">分类:</div>
	           	<div class="dd"> <span v-for="item in type">{{item.typeName}}</span></div>
            </div>
            <div class="wrap">
	            <div class="dt">系列:</div>
	            <div class="dd"><span v-for="item in series">{{item.seriesName}}</span></div>
             </div>
            <div class="wrap">
            <div class="dt">品牌:</div>
          	 <div class="dd"><span v-for="item in brand">{{item.brandName}}</span></div> 
        	</div>
            <!--<dd v-for="gameName in gameNames" :class="{active: activeName == gameName}" @click="selected(gameName)">
                {{gameName}}
             </dd>-->
        </dl>
        <ul class="search_list_wrap clearfix" >
        	<div class="empty_result flex-center font-24"  v-if="productList.length<1">
                    <div class="icon icon_unit_notice"></div>
                    <span >该区域没有符合条件的产品哦~</span>
             </div>
            <li  v-for="(item, index) in productList" :key='index' v-else>
               <router-link :to="{ path: '/sort/sortDetail',query:{id:item.id} }" tag="a" >
                     <img :src='item.model_img |imgfilter'>
                </router-link>
                <div  class="title">
                      {{item.model_no}}
                </div>
                <div class="name">{{item.model_name}}</div>
                <div  class="sku_tag"v-if="item.promotionTitle !=null">{{item.promotionTitle}}</div> 
                  <div class="price">
                        {{item.sale_price}}
                   </div>
            </li>
            </ul>
            <Page :total="totalSize" size="small" show-elevator class="page" :page-size='this.pageSize' @on-change="handlePage" v-if="productList.length>0"></Page>
        </div>
       </div>
</template>
<script>
	// 引入公共的bug，来做为中间传达的工具
	import Bus from '@/assets/js/bus.js';
    export default {
        data () {
            return {
				theme1: 'light',
				productList:[],
				startRow:0,
                pageSize:8,
				title:'',
				keyword:'',
                value12: '',
                totalSize:0,
                opt_search_hover:false,
                brand:[],
                catalog:[],
                series:[],
                type:[],
                gameNames: ['所有', '电竞椅', '电竞桌', '定制', '配件及周边'],
                activeName: '所有'
			}
        },
		methods:{
//          selected: function(gameName) {
//              this.activeName = gameName;
//              if(gameName == "所有"){
//                  gameName =''
//              }
//              this.$axios({
//					method: 'GET',
//					url:'/product/search?keyword='+gameName+'&startRow='+this.startRow+'&pageSize='+this.pageSize,
//				}).then((res)=>{
//					this.productList = res.itemsList;
//					this.totalSize=res.total;
//				})
//          },
			//获取顶部筛选
            getTop(){
            	   this.$axios({
					method: 'GET',
					url:'/product/brand',
				}).then((res)=>{
					this.brand = res;
				})
				   this.$axios({
					method: 'GET',
					url:'/product/catalog',
				}).then((res)=>{
					this.catalog = res;
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
            },
			getList(){
                this.$axios({
					method: 'GET',
					url:'/product/search?keyword='+this.keyword+'&startRow='+this.startRow+'&pageSize='+this.pageSize,
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
		        vm.keyword = data
		           this.selected(data);
		      });
		      this.getList();
		      //得到顶部分类
		      this.getTop();
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
	margin-top: 20px;
}
.wrap{
	border-bottom: 1px solid #ddd;
}
</style>
