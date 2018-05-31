<template>
	<div class="miaosha">
		<div v-if='show' class="center">暂无秒杀活动</div>
		<div class="floor" v-else>
				<div   class="spdetail"    v-for="(item, index) in pro" :key='index'>
							<router-link :to="{ params: '/secdetail',params:{skuId:item.id} }">
							<img  :src='item.productItem.listImg |imgfilter'>
							   <div class="right">	
							   	<p class="sP">{{item.product.modelName}}</p>
							   	<div class="time"> 
							   		<span v-if="item.switch=='0'" class="nostart">
							   			距开始
							   		</span>
							   		  		<span v-else class="start">
							   			距结束
							   		</span>
							   	     {{item.djs}}	
							   	</div>
								<div class="crush">
									<div class="left">
										<span>￥{{item.crush.salePrice}}</span>
										<em>￥{{item.product.salePrice}}</em>
									</div>
									<div class="r">
									</div>
								</div>
								<div> <Progress  :percent="percent(item.crush)"></Progress></div>
								</div>
							</router-link>
						</div>
	    </div>
		
    </div>
</template>
<script>
function InitTime(endtime){
    var dd,hh,mm,ss = null;
    var time = parseInt(endtime) - new Date().getTime();
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
.center{
	text-align: center;
	margin-top:1rem;
}
.crush{
	display: flex;
	.left{
		flex:1;
		span{
		color:#D32112;
		display: block;
		font-weight: 600;
			}
	 em{
		text-decoration: line-through;
		font-size: 0.8rem;
		color:#999
	}
	}
	.r{
		text-align: right;
	}
}
.time{
	color:#d32122;
	margin-top:1rem;
	margin-bottom: 1rem;
}
.nostart,.start{
	
	color:#fff;
	padding: 0.2rem;
}
.nostart{
	background: green;
}
.start{
	background: red;
}
</style>