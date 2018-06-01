<template>
	<div>
	<div class="detail">
		<Carousel v-model="value3" :autoplay="setting.autoplay" :autoplay-speed="setting.autoplaySpeed" :dots="setting.dots"
            :radius-dot="setting.radiusDot" :trigger="setting.trigger" :arrow="setting.arrow">
            <CarouselItem >
                    <div class="demo-carousel" ><img-zoom :src="detail.productItem.listImg | imgfilter"  width="450" :bigsrc="detail.productItem.originImg | imgfilter" :configs="configs"></img-zoom></div>
            </CarouselItem>
    	</Carousel>

		        <div class="delie">
            <div class="G_info hidden">
                            <h3>{{detail.product.modelName}}</h3>
                            <p></p>
                            <div class="G_changeDetail">
                                <input id="product_id" name="product_id" value="173" type="hidden">
                                <p><span class="G_left"> 零售价：&nbsp;</span> <span class="G_right" style=""><b>{{detail.productItem.salePrice | pricefilter}}</b>  </span></p>
                                <div class="G_MEAS">
                                <form id="attrform">
                                    <div slot="header" >
                          
                                                <div  class='choosesp'>
                                                    
                                                    <div>
                                                    <span class="cx"><strong>优惠价：￥{{detail.crush.salePrice | pricefilter}}</strong>
                                                    </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>数量 <InputNumber  :min="1" v-model="quantity"></InputNumber></div>
                                </form>
                                </div>

                            </div>
                        </div>
        </div>
		<div class="tp">
		<p class="jg">
		<span>{{detail.crush.salePrice | pricefilter}}</span>
		<span class="yj">{{detail.productItem.salePrice | pricefilter}}</span>	
		</p>
		</div>
		      <div class="chooseAddress">
            	<ul class="address" v-if="youdizhi">
				<li>
					<p><strong>{{addressList.person}} <label>{{addressList.phone}}</label></strong>
					<span>{{addressList.receiveProvince}}{{addressList.receiveCity}}{{addressList.receiveDistrict}}{{addressList.address}}</span></p>
						<Icon type="chevron-right"  @click.native="addAdd"></Icon>
				</li>
			   </ul>
                <div  class="zeroAddress" v-else >
                	<div @click="addAdd">
                		请选择收货地址
                	<Icon class='float float1' type="ios-arrow-right"></Icon>
                  </div>
                </div>
            </div>
		<div class="xq">
		<p>{{detail.product.modelName}}</p>	
		 <div>数量 <InputNumber  :min="1"  v-model="quantity" :max="detail.crush.unitQuantity*1"></InputNumber></div>
		 </div>
	</div>
	       <Tabs class="spjs">
        <TabPane label="商品介绍">
        	<ul><li v-for="(item, index) in productimg"  :key="index"><img :src="item.imgUrl |imgfilter"></li></ul>
        </TabPane>
        <TabPane label="规格参数" >
        		<ul class="gk">
        			<li v-for="(item, index) in productDesc"  :key="index">
        			<span class="title">{{item.attrCode}}:</span> <span class="neirong">{{item.attrValue}}</span></li></ul>
        </TabPane>
    </Tabs>
	    <div class="foot"> 
	    	<button :loading="loading" @click="confirm" class="miaoshagou">马上抢</button>
  		  </div>  
	</div>
</template>
<script>
		export default {
	    data () {
	        return {
	        	detail:{
	        		productItem:{},
	        		product:{},
	        		crush:{}
	        	},
	        	skuId:'',
	        	quantity:1,
	        	loading:true,
	        	youdizhi:false,
	        	proId:'',
	        	productDesc:[],
	        	productimg:[],
	        	temp:'',
	        	addressList:{},
				value3: 0,
				setting: {
                    autoplay: false,
                    autoplaySpeed: 2000,
                    dots: 'inside',
                    radiusDot: false,
                    trigger: 'click',
                    arrow: 'hover'
                },
                configs: {
                    width:650,
                    height:350,
                    maskWidth:100,
                    maskHeight:100,
                    maskColor:'red',
                    maskOpacity:0.2
                }
	        }
	      },
	      methods:{
	      	//获取address中传来的数据
	      	getDD(){
                let routerParams = this.$route.params.address;
                if(routerParams!=undefined){
                	this.addressList=routerParams;
                	this.youdizhi=true
                }
        	},
	       addAdd(){
	       	     localStorage.setItem('fromc','miaosha')
        		 this.$router.push({name: '/user/address'}) ;
        	},
		    getAddress(){
		      	var _this=this;
		      	  	this.$axios({
						    method: 'post',
						    url:'/address',
						}).then((res)=>{
							 if(res.length>0){
							 	res.map(function (i) {
							 		if(i.isDefault=='Y'&&JSON.stringify(_this.addressList) == "{}"){
							 			_this.addressList=i;
							 			 _this.youdizhi=true
							 		}
							 	});
								
							}
						});
		      },
		      confirm(){
	          	let para={
						addressId:this.addressList.id,
						quantity:this.quantity,
	                    skuId:this.temp
	          	};
    	   	  	this.$axios({
				    method: 'post',
				    url:'/promotion/crush/confirm',
				    data:para
				}).then((res)=>{
					if(res.code=='200'){
						 this.$router.push({name:'/cartthree',params: { orderNo: res.msg}});  
					}else{
						 this.$Message.error(res.msg);
					}
				});
           },
	      	getDetail(){
	      		if(this.$route.params.skuId!=null&&this.$route.params.skuId!=undefined){
	      			  sessionStorage.setItem('temp',this.$route.params.skuId);
	      		}
	      		   if(sessionStorage.getItem('temp')!="undefined"&&sessionStorage.getItem('temp')!=null){
	      		   	this.temp=sessionStorage.getItem('temp');
	      		   }
	      		   else{
	      		   	 sessionStorage.setItem('temp',this.$route.params.skuId);
	      		   	 this.temp  =this.$route.params.skuId;
					 }
	      			this.$axios({
					    method: 'get',
					    url:'/promotion/crush/'+  this.temp,
					}).then((res)=>{
						if(res.code=='200'){
						this.detail = res.object;
						this.proId=res.object.productItem.productId;
								this.$axios({
							    method: 'post',
							    url:'/product/desc/'+this.proId,
								}).then((res)=>{
								this.productDesc=res;
							});
								this.$axios({
							    method: 'post',
							    url:'/product/img/'+this.proId,
								}).then((res)=>{
										this.productimg=res;
							});
						}
					});
					
					}
			 },
	      mounted(){
	      	this.getAddress();
			  this.getDetail()
			  this.getDD();
	      }
    }
</script>

<style scoped="scoped" lang="scss">
	.detail {
		.tp{
		 position:relative;
		img{
			display: block;
			width:100%;
			text-align: center;
		}
		}
	}
	.jg {
		color: #fff;
		background: #d71777;
		position: absolute;
		bottom:0;
		left: 0;
		text-align: center;
		padding: 5px;
		span{
		color:#fff;
		display: block;
		}
		.yj{
			text-decoration:line-through;
			font-size: 1.2rem;
		}
	}
	.xq{
		padding: 1rem;
		margin-bottom: 1rem;
		margin-top: 1rem;
		background: #fff;
		p{
			margin-bottom: 1rem;
		}
	}
	.chooseAddress{
		margin-top: 10px;;
	}

</style>
<style>
	.spjs .ivu-tabs-nav{
		width:100%
	}
	.spjs .ivu-tabs-tab{
		font-size: 1.6rem;
		width:50%;
		text-align: center;
	}
	</style>