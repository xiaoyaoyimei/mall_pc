<template>

	<div class="sort2">
			<div class="content_wrap">
                <!-- <p  style='display:none'>{{keyword1}}</p> -->
        <!--S 商品筛选 -->
        <!-- S 商品筛选结果 list_wrap -->
        <ul class="search_list_wrap" id="searchListWrap">
            <input id="defaultDataNum" value="37" type="hidden">
            <li class="hproduct"  v-for="(item, index) in productList" :key='index'>
               <router-link :to="{ path: '/sort/sortDetail',query:{id:item.id} }" tag="a" class="category_cover">
                     <img :src='imageSrc + item.model_img'>
                </router-link>
                <div class="ft_message">
                    <div class="price_new">
                        <span class="price"><em>{{item.sale_price}}</em></span>
                     </div>
                    <!-- <div class="right_tip item_compare">
                         <div class="cart js_add_to_cart" data-click="" data-sku="1000000000100511132632">
                            <i class="cart_icon common_cart_icon"></i>
                            <span>购物车</span>
                        </div>
                    </div> -->
                </div>
                <a  class="fn">
                                {{item.model_name}}
                </a>
                <div class="sell_point">{{item.type_name}}</div>

                <div v-if="item.promotionTitle !=null" class="sku_tag sku_tag_important">{{item.promotionTitle}}</div> 
            </li>
           
            </ul>
        <!-- E 商品筛选结果 list_wrap -->
    </div>
		<page class="page" :current="currentPage"  @on-change="handlePage"  :total="totalSize"></page>
		<!-- <back-top :height="0" :bottom="200">
        	<div class="top" @click="top">返回顶端</div>
    	</back-top> -->
        </div>
	</div>
</template>
<script>
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
				value11: '',
                value12: '',
                totalSize:1,
                ha2:false,
                hidden:false,
                hidden1:false,
                hidden2:false,
                opt_search_hover:false,
			}
			
        },
        
		name: 'scroll-top',
		methods:{
			getMockData () {
            },
            getTargetKeys () {

            },
            handleChange2 (newTargetKeys) {
                this.targetKeys2 = newTargetKeys;
            },
            filterMethod (data, query) {
                return data.label.indexOf(query) > -1;
            },
			getList(value11){
                this.$axios({
					method: 'GET',
					url:'/product/search?keyword='+this.value11+'&startRow='+this.startRow+'&pageSize='+this.pageSize,
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
                console.log(value)
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
		//watch title change
			title() {
			delay(() => {
				this.fetchData();
			}, 300);
			},
		},
		 mounted(){
		   this.getList();
          },
    }
</script>

<style lang="scss">
 @import '@/styles/color.scss';
 .sort1{
     background: #f4f4f4;
 }
 .sort2{
    // 
    width:100%;
    max-width: 1100px;
    margin:  0 auto;
    min-height:900px;
}
 .cate_cell {
    *overflow: visible !important;
    *height: 28px;
    *line-height: 28px;
}
.col_10 {
    padding: 10px 24px;
}
.cate_cell {
    padding: 10px 24px;
    position: relative;
    border-top: 1px solid #eee;
}
.col_10 .cate_cell_hd {
    width: 120px;
    height: 21px;
    line-height: 21px;
}
.cate_cell .cate_cell_hd {
    float: left;
    color: #999;
}
.col_10 .cate_cell_bd {
    margin-left: 120px;
}
.col_10 .cate_cell_bd .cate_list {
    overflow: visible;
    height: auto;
}
.cate_cell .cate_cell_bd .cate_list {
    overflow: hidden;
    height: 21px;
    color: #666;
}
.col_10 .cate_cell_bd .cate_list li {
    float: left;
    height: 21px;
    line-height: 21px;
    margin-right: 50px;
}
a {
    text-decoration: none;
    color: #333;
}
.cate_cell .cate_cell_bd .cate_list .filter_cur a {
    color: #0092d8;
}
.filter_wrap {
    margin: 16px 0;
}
.cate_cells {
    background-color: #fff;
    font-size: 12px;
    border: 1px solid #eee;
    color: #333;
}
.filter_wrap .cate_bar {
    line-height: 22px;
    height: 22px;
	box-sizing: content-box;
}
.cate_cell:first-child {
    border: none;
}
.cate_cell {
    padding: 10px 24px;
    position: relative;
    border-top: 1px solid #eee;
}
.cate_bar {
    background: #fcfcfc;
}
.filter_wrap .filter_cur {
    color: #0092d8;
}
.filter_wrap .filter_price {
    margin-right: 24px;
    position: relative;
}
.filter_wrap .mod_filter_item {
    display: inline-block;
    *display: inline;
    margin-right: 38px;
    cursor: pointer;
    vertical-align: middle;
}
.filter_wrap .mod_filter_item {
    display: inline-block;
    *display: inline;
    margin-right: 38px;
    cursor: pointer;
    vertical-align: middle;
}
.filter_address .address_wrap .address_selected {
    border: none;
    height: 22px;
    line-height: 22px;
    padding: 0;
}

.address_wrap .address_selected .address_option {
    margin: 0 0 0 5px;
    padding: 0;
    cursor: pointer;
    display: block;
    float: left;
    max-width: 53px;
}
.address_wrap .address_selected .address_option {
    line-height: 22px;
}
.address_wrap .arrow {
    position: relative;
    top: -1px;
    *top: 11px;
}
.icon_atom {
    display: inline-block;
    *display: inline;
    *zoom: 1;
    width: 0;
    height: 0;
    background: url(//img.mdcdn.cn/pc/img/common/atom_sprite.png?t=201804271445) no-repeat 10000px 10000px;
}
 .filter_wrap .mod_filter_item .icon_atom {
    vertical-align: middle;
    margin: 0 8px;
}
.icon_down_arrow {
    width: 10px;
    height: 9px;
    background-position: 0 -42px;
}
.filter_address, .filter_address .address_wrap {
    height: 22px;
    line-height: 22px;
}
.filter_wrap .filter_price .price_box {
    display: none;
}
.filter_wrap .price_box {
    color: #333;
    position: absolute;
    width: 123px;
    height: 100px;
    border: 1px solid #eee;
        border-top-width: 1px;
        border-top-style: solid;
        border-top-color: rgb(238, 238, 238);
    top: -11px;
    padding: 24px;
    box-sizing: border-box;
    background: #fff;
    z-index: 50;
    left: -25px;
    border-top: none;
}
.address_wrap .arrow {
    position: relative;
    top: -1px;
    *top: 11px;
    margin-left: 7px;
    background: url(//img.mdcdn.cn//pc/img/common/atom_sprite.png?t=20160701) no-repeat;
        background-position-x: 0%;
        background-position-y: 0%;
}
.address_wrap .address_selected .arrow {
    width: 10px;
    height: 6px;
    background-position: 0 -44px;
    display: inline-block;
}
.cate_cell .cate_cell_ft {
    position: absolute;
    right: 24px;
    top: 12px;
    line-height: 19px;
}
.search_list_wrap {
    width: 1117px;
    overflow: hidden;
    margin-top: 16px;
}
.search_list_wrap .hproduct {
    padding: 0 24px 21px;
    float: left;
    position: relative;
    width: 263px;
    margin: 0 16px 10px 0;
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #eee;
}
.search_list_wrap .hproduct .category_cover {
    display: block;
    width: 210px;
    height: 210px;
    margin: 40px 0;
}
.search_list_wrap .hproduct .category_cover img {
    width: 210px;
    height: 210px;
}
.search_list_wrap .hproduct .ft_message {
    font-size: 18px;
    height: 27px;
}
.search_list_wrap .hproduct .ft_message .price_new {
    float: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.search_list_wrap .hproduct .ft_message .price_new .price {
    color: #f60;
}
.search_list_wrap .hproduct .ft_message .price_new .price em {
    margin-left: 4px;
}
.search_list_wrap .hproduct .ft_message .comment_box {
    color: #999;
}
.search_list_wrap .hproduct .ft_message .right_tip {
    float: right;
    font-size: 12px;
    line-height: 27px;
}
.search_list_wrap .hproduct .ft_message .comment_box em {
    padding-left: 4px;
}
.search_list_wrap .hproduct .fn {
    display: block;
    height: 42px;
    font-size: 14px;
    overflow: hidden;
    word-break: break-all;
    margin: 8px auto 9px;
}
.search_list_wrap .hproduct .sell_point {
    color: #999;
    font-size: 12px;
    height: 18px;
}
.recommend_list_wrap li .pro_name, .search_list_wrap .hproduct .sell_point {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.item_compare .cart {
    float: left;
}
.item_compare .cart, .item_compare .compare {
    cursor: pointer;
}
.item_compare .cart .common_cart_icon {
    background-position: -39px -33px;
}
.item_compare .cart i, .item_compare .compare i {
    width: 18px;
    height: 18px;
    background: url("//img.mdcdn.cn/wp/src/p_mall/img/item_compare.png") no-repeat;
        background-position-x: 0%;
        background-position-y: 0%;
        background-size: auto auto;
    background-size: 100px 100px;
    display: inline-block;
    vertical-align: bottom;
}
.item_compare .cart span, .item_compare .compare span {
    margin-left: 5px;
}
.item_compare .compare {
    float: right;
}

.search_list_wrap .hproduct .sku_tag {
    position: absolute;
    top: 0;
    right: 0;
    color: #fff;
    font-size: 12px;
    height: 30px;
    line-height: 30px;
    padding: 0 20px;
}
.search_list_wrap .hproduct .sku_tag_important {
    background-color: #ff6600;
}
.search_list_wrap .hproduct .sku_tag_notice {
    background-color: #1bce8d;
}
.item_compare .compare .compare_icon {
    background-position: -12px -9px;
}
.page{
    text-align:center;
    padding: 20px 0px;
}
</style>