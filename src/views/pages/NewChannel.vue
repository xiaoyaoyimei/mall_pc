<template>
	<div>
		<div class="floor">
				<!-- <div   class="spdetail"    v-for="(item, index) in productNew" :key='index'>
							<router-link :to="{ path: '/sort/sortDetail',query:{id:item.id} }">
								<img  :src='item.model_img |imgfilter'>
							   <div class="right">	<p class="sP">{{item.model_name}}
								</p>
								<p class="font-14">{{item.type_name}}</p>
								<p>
									<span v-if="item.promotionTitle !=null" class="promotion">{{item.promotionTitle}}</span>
									<span v-else></span>
								</p>
								<p class="sh6">{{item.sale_price | pricefilter}}</p>
								</div>
							</router-link>
						</div> -->
       <ul class="search_list_wrap" id="searchListWrap">
            <!-- <input id="defaultDataNum" value="37" type="hidden"> -->
            <li class="hproduct"  v-for="(item, index) in productNew" :key='index'>
               <router-link :to="{ path: '/sort/sortDetail',query:{id:item.id} }" tag="a" class="category_cover">
                     <img :src='item.model_img |imgfilter'>
                </router-link>
				<router-link :to="{ path: '/sort/sortDetail',query:{id:item.id} }" tag="a"  class="fn">
                               {{item.model_name}}
                </router-link>
                <div class="ft_message">
                    <div class="price_new">
                        <span class="price"><em>{{item.sale_price}}</em></span>
                     </div>
					<div class="right_tip comment_box">
                        <span>{{item.type_name}}</span>
                	</div>
                </div>
                <div v-if="item.promotionTitle !=null" class="sku_tag sku_tag_important">{{item.promotionTitle}}</div> 
            </li>
           
            </ul>
	    </div>
	</div>
</template>
	
<script>
	export default {
        data () {
            return {
                productNew:[]
                
            }
        },
        methods: {
    	     getNewChannel(){
    	     	this.$axios({
						    method: 'GET',
						    url:'/index/product/new',
						}).then((res)=>{
							if(res.code=='200'){
                             this.productNew=res.object;
                             console.log(this.productNew)
							}
						});
						
    	      	},
    	},
        mounted() {
			this.getNewChannel();
		}
    }
</script>
<style>
.floor{
	max-width: 1098px;
border: 1px solid #e0e0e0;
min-height: 900px;
position: relative;
margin-bottom: -1px;
overflow: hidden;
margin:  0  auto;
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