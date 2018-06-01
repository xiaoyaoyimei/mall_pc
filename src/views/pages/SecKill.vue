<template>
	<div class="miaosha">
		<div v-if='show' class="center">暂无秒杀活动</div>
		<div class="content_wrap" v-else>
			<ul class="search_list_wrap" id="searchListWrap">
				<li class="hproduct"  v-for="(item, index) in pro" :key='index'>
					<router-link :to="{ name: '/secdetail',params:{skuId:item.skuId} }  " tag="a" class="category_cover">
						<img :src='item.productItem.listImg |imgfilter'>
					</router-link>
					<div class="ft_message">
						<div class="price_new">
						<em>￥{{item.product.salePrice}}</em> <span class="price">￥{{item.crush.salePrice}}</span>
						</div>
					</div>
					<a  class="fn"> {{item.product.modelName}}</a>
					<a  class="fn">
						<span v-if="item.switch=='0'" class="nostart">
							距开始
						</span>
						<span v-else class="start">
							距结束
						</span>
							{{item.djs}}	
					</a>
					<div class="sell_point">{{item.type_name}}</div>
					<div v-if="item.promotionTitle !=null" class="sku_tag sku_tag_important">{{item.promotionTitle}}</div> 
					<div> <Progress  :percent="percent(item.crush)"></Progress></div>
				</li>
			
			</ul>
    	</div>
    </div>
</template>
<script>
function InitTime(endtime){
    var dd,hh,mm,ss = null;
    var time = new Date((endtime)).getTime() - new Date().getTime();
    if(time<=0){
        return '结束'
    }else{
        dd = Math.floor(time / 60 / 60 / 24);
        hh = Math.floor((time / 60 / 60) % 24);
        mm = Math.floor((time / 60) % 60);
        ss = Math.floor(time  % 60);
        var str = dd+"天"+hh+"小时"+mm+"分"+ss+"秒";
        return str;
    }
}
export default {
    data () {
	return {
		   pro:[],
            active: 'tab-container1',
            show:false,
            list: [],
    	}
      },
    created() {
    	this.getNewChannel();
    },
    mounted() {
        setInterval( ()=> {
            for (var key in this.pro) {
            	var aaa ='';
            	if(this.pro[key].switch=='0'){
            		aaa= this.pro[key].crush["startTime"]
            	}
            	else{
                 aaa = this.pro[key].crush["endTime"];
                }
                 aaa= new Date(aaa).getTime()
                var bbb = new Date().getTime();
                var rightTime = aaa - bbb;
                if (rightTime > 0) {
                    var dd = Math.floor(rightTime / 1000 / 60 / 60 / 24);
                    var hh = Math.floor((rightTime / 1000 / 60 / 60) % 24);
                    var mm = Math.floor((rightTime / 1000 / 60) % 60);
                    var ss = Math.floor((rightTime / 1000) % 60);
                }
                this.pro[key]["djs"] = dd + "天" + hh + "小时" + mm + "分" + ss + "秒";
            }
        }, 1000);
    },
    methods: {
    	     getNewChannel(){
    	     	this.$axios({
						    method: 'GET',
						    url:'/promotion/crush',
						}).then((res)=>{
							if(res.code=='200'){
							 this.pro=res.object;
							  var ssss=this.pro;
						        ssss.map( (obj,index)=>{
						         this.$set(  
						                obj,"djs",InitTime(obj.crush["endTime"])  
						            );
						        })  
							    this.pro = ssss; 
							}
							else{
								this.show=true;
							}
						});
						
    	      	},
    	      	percent(v){
    	      		return v.usedQuantity/v.totalQuantity*100
    	      	},
    }
}
</script>
<style scoped="scoped" lang="scss">
.miaosha{
	min-height: 900px;
	width: 100%;
	max-width: 1100px;
	margin: 0 auto;
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
</style>