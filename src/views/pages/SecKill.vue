<template>
	<div class="sort">
		<div v-if='show' class="center">暂无秒杀活动</div>
		<div class="main-wdith" v-else>
			 <ul class="search_list_wrap clearfix" >
        	<div class="empty_result font-24"  v-if="pro.length<1">
                    <div class=" icon_unit_notice"></div>
                    <span class="desc">该区域没有符合条件的产品哦~</span>
             </div>
            <li  v-for="(item, index) in pro" :key='index' v-else>
               <router-link :to="{ name: '/secdetail',query:{skuId:item.skuId}  }" tag="a" >
                    	<img :src='item.productItem.listImg |imgfilter'>
                </router-link>
                <div  class="title">
                      {{item.product.modelNo}}
                </div>
                <div class="name">{{item.product.modelName}}</div>
                	<div  class="fn">
						<span v-if="item.switch=='0'" class="nostart">
							距开始
						</span>
						<span v-else class="start">
							距结束
						</span>
							{{item.djs}}	
					</div>
                <div  class="sku_tag"v-if="item.promotionTitle !=null">{{item.promotionTitle}}</div> 
                  <div class="price">
                        <span class="origin">￥{{item.product.salePrice |pricefilter }}</span>
                        <span>￥{{item.crush.salePrice|pricefilter}}</span>
                   </div>
                   <div> <Progress  :percent="percent(item.crush)"></Progress></div>
            </li>
            </ul>
            
			<!--<ul class="search_list_wrap clearfix" >
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
					<div v-if="item.promotionTitle !=null" class="sku_tag sku_tag_important">{{item.promotionTitle}}</div> 
					<div> <Progress  :percent="percent(item.crush)"></Progress></div>
				</li>
			
			</ul>-->
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
.origin{
	color:#999;
	font-weight: normal;
	text-decoration: line-through;
}
.nostart{
	border:2px solid #000;
	color:#000;
	width: 51px;
	display: inline-block;
	height: 22px;
	text-align: center;
}
.fn{
	margin-bottom: 5px;
}
</style>