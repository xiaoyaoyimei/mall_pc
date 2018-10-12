<template>
	<div class="sort">
		<div  class="flex-center" v-if="show">
			<img src="../../assets/img/lightning.png">
			<p>暂无秒杀活动 敬请期待</p>
		</div>
		<div class="main-wdith" v-else>
			<div class="start" v-if="startpro.length>0">
				<h6>立即秒杀</h6>
				<ul class="search_list_wrap clearfix" >
		            <li  v-for="(item, index) in startpro" :key='index'  >
		               <router-link :to="{ name: '/secdetail',query:{skuId:item.skuId,productId:item.product.id}  }" tag="a" >
		                    	<img :src='item.productItem.listImg |imgfilter'>
		                </router-link>
		                <div  class="title">
		                      {{item.product.modelNo}}
		                </div>
		                <div class="name">{{item.product.modelName}}</div>
		                <div class="color-dx">开始:{{item.crush.startTime}}</div>
		                <div>结束:{{item.crush.endTime}}</div>
		                	<!--<div  class="fn">
									距离结束:    {{item.djs}}	
							</div>-->
		                <div  class="sku_tag" v-if="item.promotionTitle !=null">{{item.promotionTitle}}</div> 
		                  <div class="price">
		                        <span class="origin">￥{{item.product.salePrice |pricefilter }}</span>
		                        <span>￥{{item.crush.salePrice|pricefilter}}</span>
		                   </div>
		                   <div> <Progress  :percent="percent(item.crush)"></Progress></div>
		            </li>
	            </ul>
            </div>
            <div class="nostart" v-if="nostartpro.length>0">
				<h6>即将开始</h6>
				<ul class="search_list_wrap clearfix" >
		            <li  v-for="(item, index) in nostartpro" :key='index'  >
		               <router-link :to="{ name: '/secdetail',query:{skuId:item.skuId,productId:item.product.id}  }" tag="a" >
		                    	<img :src='item.productItem.listImg |imgfilter'>
		                </router-link>
		                <div  class="title">
		                      {{item.product.modelNo}}
		                </div>
		                <div class="name">{{item.product.modelName}}</div>
		                	 <div class="color-dx">开始:{{item.crush.startTime}}</div>
		                <div>结束:{{item.crush.endTime}}</div>
		                <div  class="sku_tag" v-if="item.promotionTitle !=null">{{item.promotionTitle}}</div> 
		                  <div class="price">
		                        <span class="origin">￥{{item.product.salePrice |pricefilter }}</span>
		                        <span>￥{{item.crush.salePrice|pricefilter}}</span>
		                   </div>
		                   <div> <Progress  :percent="percent(item.crush)"></Progress></div>
		            </li>
	            </ul>
            </div>
    	</div>
    </div>
</template>
<script>
export default {
    data () {
	return {
		    pro:[],
            show:false,
            list: [],
            startpro:[],
            nostartpro:[]
    	}
      },
    mounted() {
    	this.getNewChannel();
    },
    methods: {
    	     getNewChannel(){
    	     	 var _this=this;
    	     	this.$axios({
						    method: 'GET',
						    url:'/promotion/crush',
						}).then((res)=>{
							if(res.code=='200'){
							 this.pro=res.object;
							    _this.startpro=[];
							    _this.nostartpro=[];
							    this.pro.map(function (item) {
										if(item.switch=='1'){
											_this.startpro.push(item)
										}else{
											_this.nostartpro.push(item)
										}
									})
									console.log(_this.startpro.length)
										console.log(_this.nostartpro)
							   }
							else{
								this.show=true;
							}
						});
						
    	      	},
    	      	percent(v){
    	      		return v.usedQuantity/v.totalQuantity*100
    	      	},
    },
}
</script>
<style scoped="scoped" lang="scss">
.color-dx{
	color:#0099ff;
}
.origin{
	color:#999;
	font-weight: normal;
	text-decoration: line-through;
}
.fn{
	margin-bottom: 5px;
}
.start .fn{
	color:#0099ff;
}
.start h6,.nostart h6{
	font-size: 18px;
}
.start h6{
	color:#0099ff;
}
.nostart{
	border-top:2px solid #333;
	padding-top: 30px;
	.fn{
		color:#333;
	}
}
.nostart h6{
	color:#000;
}
</style>