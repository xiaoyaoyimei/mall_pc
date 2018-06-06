<template>
<div class="sort">
	<div class="main-wdith mt20">
        <dl class='selector'>
            <dt>分类:</dt>
            <dd v-for="gameName in gameNames" :class="{active: activeName == gameName}" @click="selected(gameName)">
                {{gameName}}
             </dd>
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
                pageSize:4,
				title:'',
				keyword:'',
                value12: '',
                totalSize:0,
                opt_search_hover:false,
                gameNames: ['所有', '电竞椅', '电竞桌', '定制', '配件及周边'],
                activeName: '所有'
			}
        },
		methods:{
            selected: function(gameName) {
                this.activeName = gameName;
                if(gameName == "所有"){
                    gameName =''
                }
                this.$axios({
					method: 'GET',
					url:'/product/search?keyword='+gameName+'&startRow='+this.startRow+'&pageSize='+this.pageSize,
				}).then((res)=>{
					this.productList = res.itemsList;
					this.totalSize=res.total;
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
		      	console.log(data)
		        vm.keyword = data
		           this.selected(data);
		      });
		      this.getList()
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
    width:100%;
    line-height: 40px;
     border-width: 1px 0 1px 0;
    border-style: dashed;
    border-color:#ddd;
    margin-bottom: 40px;
    font-size: 14px;
     color:#333;
}
.selector dt, .selector dd{
	display: inline-block;
	height: 40px;
}
.selector dt{
	background: #f1f1f1;
	width: 100px;
	text-indent: 20px;
	font-weight: bold;
}
.selector dd{
	width:100px;
	cursor: pointer;
	text-align: center;
    }
.selector .active {
  color: #0099ff;
  font-weight: bold;
}
</style>
