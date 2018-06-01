<template>

	<div class="sort2">
        <!-- S 商品筛选结果 list_wrap -->
        <ul class="search_list_wrap" id="searchListWrap">
        	<div class="empty_result" style="font-size:24px" v-if="productList.length<1">
                    <div class="icon_unit icon_unit_notice"></div>
                    <span class="desc">该区域没有符合条件的产品哦~</span>
             </div>
            <li class="hproduct"  v-for="(item, index) in productList" :key='index' v-else>
               <router-link :to="{ path: '/sort/sortDetail',query:{id:item.id} }" tag="a" class="category_cover">
                     <img :src='imageSrc + item.model_img'>
                </router-link>
                <div class="ft_message">
                    <div class="price_new">
                        <span class="price"><em>{{item.sale_price}}</em></span>
                     </div>
                </div>
                <a  class="fn">
                                {{item.model_name}}
                </a>
                <div class="sell_point">{{item.type_name}}</div>
                <div v-if="item.promotionTitle !=null" class="sku_tag sku_tag_important">{{item.promotionTitle}}</div> 
            </li>
            </ul>
        <!-- E 商品筛选结果 list_wrap -->
		<page class="page" :current="currentPage"  @on-change="handlePage"  :total="totalSize"></page>
        </div>
	</div>
</template>
<script>
	// 引入公共的bug，来做为中间传达的工具
	import Bus from '@/assets/js/bus.js'
	// 节流函数
	const delay = (function() {
	let timer = 0;
	return function(callback, ms) {
		clearTimeout(timer);
		timer = setTimeout(callback, ms);
	};
	})();
    export default {
        data () {
            return {
				theme1: 'light',
				productList:[],
				imageSrc:this.global_.imgurl,
				startRow:1,
                pageSize:20,
                currentPage:1,
				title:'',
				keyword: this.$route.query.keyword,
                value12: '',
                totalSize:1,
                ha2:false,
                hidden:false,
                hidden1:false,
                hidden2:false,
                opt_search_hover:false,
			}
			
        },
         
		methods:{
            handleChange2 (newTargetKeys) {
                this.targetKeys2 = newTargetKeys;
            },
            filterMethod (data, query) {
                return data.label.indexOf(query) > -1;
            },
			getList(){
				let routerParams = this.$route.query.keyword;
				if(routerParams!=""&&routerParams!=undefined){
                 this.keyword = routerParams;
                }
                this.$axios({
					method: 'GET',
					url:'/product/search?keyword='+this.keyword+'&startRow='+this.startRow+'&pageSize='+this.pageSize,
				}).then((res)=>{
                    console.log(res)
					this.productList = res.itemsList;
					this.totalSize=res.total;
				})
			
			},

			top(){
				document.querySelector(".ivu-scroll-container").scrollTop = 0; 
            },
            handlePage(value) {  
                this.startRow = value * this.pageSize - 19;  
                // this.$axios({
				// 		method: 'GET',
				// 		url:'/product/search?startRow='+this.startRow+'&pageSize='+this.pageSize,
				// 		}).then((res)=>{
				// 			var arr = this.productList.concat(res.itemsList);
				// 			this.productList = arr;
				// 			console.log(this.productList)
							
                // 		})
                this.getList();
            },
			ha(){
				alert(this.ha2)
				this.ha2 = false;
			},
			ha1(){
				this.ha2 = true;
			},
            changeCount(){
                 this.opt_search_hover=false;
            },
            enter(){
                this.hidden1 =true;
                this.hidden2 =false;
                this.hidden =false;
            },
            enter1(){
                this.hidden =true;
                this.hidden1 =false;
                this.hidden2 =false;
            },
             enter2(){
                this.hidden2 =true;
                this.hidden1 =false;
                this.hidden =false;
            },
            leave2(){
                this.hidden2 =false;
                this.hidden1 =false;
                this.hidden =false;
            },
			async fetchData(val) {
				const res = await this.$axios({
					url: '写上你的URL',
					method: 'GET',
					params: { title: this.title },
				});
				this.search = res.list;
			},
		},
		watch: {
			keyword: function(oldValue , newValue){
			 		 this.getList();
           },
		//watch title change
			title() {
			delay(() => {
				this.fetchData();
			}, 300);
			},
		},
		 mounted(){
		 	var vm = this
           // 用$on事件来接收参数
		      Bus.$on('val', (data) => {
		        vm.keyword = data
		      });
		   this.getList();
          },
    }
</script>

<style lang="scss" scoped="scoped">
.search_list_wrap {
    width: 1217px;
    overflow: hidden;
    margin-top: 16px;
}
.search_list_wrap .empty_result .icon_unit_notice {
    margin: 120px 20px 0 0;
        display: inline-block;
    width: 64px;
    height: 64px;
    background:url(../../assets/img/unit_sprite.png) no-repeat -100px -100px;
}
.search_list_wrap .empty_result .desc {
    display: inline-block;
    position: relative;
    bottom: 23px;
}
.search_list_wrap .empty_result {
    text-align: center;
}
</style>