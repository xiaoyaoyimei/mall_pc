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
		               <router-link :to="{ name: '/secdetail',query:{skuId:item.skuId}  }" tag="a" >
		                    	<img :src='item.productItem.listImg |imgfilter'>
		                </router-link>
		                <div  class="title">
		                      {{item.product.modelNo}}
		                </div>
		                <div class="name">{{item.product.modelName}}</div>
		                	<div  class="fn">
									距离结束:    {{item.djs}}	
							</div>
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
		               <router-link :to="{ name: '/secdetail',query:{skuId:item.skuId}  }" tag="a" >
		                    	<img :src='item.productItem.listImg |imgfilter'>
		                </router-link>
		                <div  class="title">
		                      {{item.product.modelNo}}
		                </div>
		                <div class="name">{{item.product.modelName}}</div>
		                	<div  class="fn">
									距开始:{{item.djs}}	
							</div>
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
            startpro:[],
            nostartpro:[]
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
    	     	 var _this=this;
    	     	this.$axios({
						    method: 'GET',
						    url:'/promotion/crush',
						}).then((res)=>{
							if(res.code=='200'){
							 this.pro=res.object;
							  var ssss=this.pro;
							  debugger
						        ssss.map( (obj,index)=>{
						         this.$set(  
						                obj,"djs",InitTime(obj.crush["endTime"])  
						            );
						        })  
							    this.pro = ssss; 
							    _this.startpro=[];
							    _this.nostartpro=[];
							    this.pro.map(function (item) {
										if(item.switch=='1'){
											_this.startpro.push(item)
										}else{
											_this.nostartpro.push(item)
										}
									})
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
.fn{
	margin-bottom: 5px;
}
.start{
	border-bottom:2px solid #333;
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
	padding-top: 30px;
	.fn{
		color:#333;
	}
}
.nostart h6{
	color:#000;
}
</style>