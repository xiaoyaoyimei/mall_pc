<template>
	<div>
	<div class="detail sortDetail">
		<Carousel v-model="value3" :autoplay="setting.autoplay" :autoplay-speed="setting.autoplaySpeed" :dots="setting.dots"
            :radius-dot="setting.radiusDot" :trigger="setting.trigger" :arrow="setting.arrow">
            <CarouselItem >
                    <div class="demo-carousel" ><img-zoom :src="detail.productItem.listImg | imgfilter"  width="450" :bigsrc="detail.productItem.originImg | imgfilter" :configs="configs"></img-zoom></div>
            </CarouselItem>
    	</Carousel>

		<div class="delie">
            <div class="G_info hidden">
				<p>{{detail.product.modelName}}</p>
				<div class="G_changeDetail">
					<input id="product_id" name="product_id" value="173" type="hidden">
					<p><span class="G_left"> 零售价：&nbsp;</span> <span class="G_right" style=""><b>{{detail.productItem.salePrice | pricefilter}}</b>  </span></p>
					<div class="G_MEAS">
					<form id="attrform">
						<div slot="header" >
							<div  class='choosesp'>
								<div>
									<span class="cx">优惠价：￥{{detail.crush.salePrice | pricefilter}}</span>
								</div>
							</div>
						</div>
						<div>数量 <InputNumber  :min="1"  v-model="quantity" :max="detail.crush.unitQuantity*1"></InputNumber></div>
					</form>
					</div>

				</div>
			</div>
       
		      <div class="SDchooseAddress">
            	<ul class="SDaddress" v-if="youdizhi">
				<li>
					<p><strong>{{addressList.person}} <label>{{addressList.phone}}</label></strong>
					<span>{{addressList.receiveProvince}}{{addressList.receiveCity}}{{addressList.receiveDistrict}}{{addressList.address}}</span></p>
						<Icon type="chevron-right" class="SDaddaddress"  @click.native="addAdd"></Icon>
				</li>
			   </ul>
                <div  class="zeroAddress" v-else >
                	<div @click="addAdd">
                		请选择收货地址
                	<Icon class='float float1' type="ios-arrow-right"></Icon>
                  </div>
                </div>
            </div>
			<div class="SDfoot"> 
	    	<button :loading="loading" @click="confirm" class="miaoshagou">马上抢</button>
  		  </div>  
		 </div>
	       <Tabs class="spjs">
        <TabPane label="商品介绍">
        	<ul><li v-for="(item, index) in productimg"  :key="index"><img class="SDImg" :src="item.imgUrl |imgfilter"></li></ul>
        </TabPane>
        <TabPane label="规格参数" >
        		<ul class="gk">
        			<li v-for="(item, index) in productDesc"  :key="index">
        			<span class="title">{{item.attrCode}}:</span> <span class="neirong">{{item.attrValue}}</span></li></ul>
        </TabPane>
    </Tabs>

	</div>
	</div>
</template>
<script>
import imgZoom from 'vue2.0-zoom'
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
					debugger
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
		  },
		   components: { imgZoom }
    }
</script>

<style  lang="scss">
@import '@/styles/color.scss';
    .sortDetail{
        max-width: 1100px;
        width:100%;
        margin: 0 auto;
        margin-bottom:50px;
        min-height: 900px;
        position: relative;
        .ivu-carousel{
            width: 400px;
            height: 400px;
            display: inline-block;
        }
        .delie{
            // position: absolute;
            // top: 0px;
            // left: 500px;
            display: inline-block;
            width:600px;
            margin-left: 20px;
            vertical-align: top;
            overflow: hidden;
        }
        img{
            max-width:100%;
        }
        h4{
            text-align:left;
            text-indent:1.5em;
            height:40px;
        }
        p{
            text-align:left;
            height:40px;
            overflow:hidden;
        }
    }

.sortDetail .G_info > h3 {
    font: 24px/42px "å¾®è½¯éé»";
}
.sortDetail .G_info > p {
    font-size: 16px;
    line-height: 36px;
    border-bottom: 1px solid #e7e7e7;
}
.sortDetail .G_info .G_changeDetail {
    font-size: 14px;
}
.sortDetail .G_info .G_changeDetail > p {
    line-height: 34px;
}
.sortDetail .G_info .G_changeDetail > div {
    line-height: 50px;
}
.sortDetail .G_info .G_changeDetail .G_MEAS form h5 {
    display: inline-block;
    font-weight: normal;
    font-size: 100%;
    position: relative;
    top: -15px;
}
.sortDetail .G_info .G_changeDetail .G_MEAS form .G_checked {
    border: 1px solid #E50011;
}
.sortDetail .G_info .G_changeDetail .G_MEAS form p {
    position: relative;
    display: inline-block;
    margin-right: 6px;
    border: 1px solid #9b8888;
    text-align: center;
    line-height: 30px;
}
.sortDetail .G_info .G_changeDetail .G_MEAS form .G_checked input {
    height: 40px;
}
.sortDetail .G_info .G_changeDetail .G_MEAS form p input {
    height: 40px;
    min-width: 40px;
    text-align: center;
    padding: 0 3px;
    cursor: pointer;
    border: none;
}
.sortDetail .G_info .G_changeDetail .G_MEAS form .G_checked s {
    display: inline-block;
    position: absolute;
    top: 24px;
    right: 0px;
    height: 14px;
    width: 17px;
    background: url(../../assets/img/spring1.png) -144px -16px no-repeat;
}
.sortDetail .G_info .G_changeDetail .G_changeQTY #G_minus {
    border-radius: 5px 0px 0px 5px;
        position: relative;
        top: 2px;
}
.sortDetail .G_info .G_changeDetail .G_changeQTY #G_minus, .sortDetail .G_info .G_changeDetail .G_changeQTY #G_add {
    width: 34px;
    height: 30px;
    background-color: #B2B2B2;
    color: #fff;
    cursor: pointer;
    line-height: 30px;
}
.center1{
    text-align: center;
    img{
        width: 100%;
    }
}
.gk{
    overflow: hidden;
    li{
        float: left;
        width: 33.33%;
        text-align: center;
    }
}
.sortDetail .G_info .G_changeDetail .G_changeQTY #G_QTY {
    width: 42px;
    height: 28px;
    border: 1px solid #B2B2B2;
    text-align: center;
}
.sortDetail .G_info .G_changeDetail .G_changeQTY #G_add {
    border-radius: 0px 5px 5px 0px;
    position: relative;
    left: -4px;
    top: 2px;
}
.sortDetail .G_info > a {
    display: block;
    height: 50px;
    width: 208px;
    background-color: #E50011;
    font-size: 20px;
    text-align: center;
    color: #fff;
    line-height: 50px;
    margin-top: 24px;
    margin-left: 36px;
}
.xiajia{
    min-height: 6.5rem;
    font-size: 1.6rem;
    display: flex;
    align-items: center;
    i{
    	margin-right:1rem;
    }
 }
 .choosesp{
 	display: flex;
 	.cx{
		color: #E50011;
		margin: 0px; 
 		label{
 			color:#333;
 		}
 	}
 }
  .choosesp span {
  	margin-left:1rem;
  	color:#999;
  	display: block;
    line-height: 25px!important;
  }
  strong{
  	margin-bottom: 0.5rem;
  	color:$color-dx;
  	display: block;
  	font-size: 1.4rem;
      font-size: 20px;
  }
 .back{
 	    background: rgba(64, 64, 64, 0.6);
    width: 3.2rem;
    height: 3.2rem;
    line-height:2.2rem;
    border-radius: 3.2rem;
    display: inline-block;
    text-align: center;
    font-size: 2em;
    color: #fff;
    position: absolute;
    left: 1rem;
    top: 1rem;
    z-index: 1;
    cursor: pointer;
 	}
 .xiangqiang{
 	background: #fff;
 	padding:  1rem;
 	font-size: 1.6rem;
 	div{
 		margin-bottom:0.5rem;
 		color: #333;
 	}
 	strong{
 		color:$color-dx;
 		font-size: 1.1rem;
 	}
 }
 .choose{
 	margin-top:1rem;
 	margin-bottom: 1rem;
 	background: #fff;
 	padding: 1.5rem 1rem;
 	display: flex;
 	cursor: pointer;
 	span{
 		flex: 1;
 	}
 	i{
 		color:#333;
 		font-weight: bold;
 		font-style: normal;
 		margin-left:1rem
 	}
 }
  dl{
 	overflow: hidden;
 	margin-bottom: 20px;
 	dt{
 	margin-bottom:20px;
    line-height: 20px!important;
    height: 20px!important;
 	}
	 dd{
	  	border:1px solid $color-border;
	  	float: left;
	  	padding: 6px 10px;
	  	margin-right: 10px;
	  	border-radius: 10px;
	  	color: #222;
	  	cursor: pointer;
	  	margin-bottom: 10px;
        line-height: 20px!important;
	  }
	  dd.active{
	  	color:$color-dx;
	  	border-color:$color-dx;
	  }
 }
 .choosesp img{
 	width: 120px;
    height: 120px;
    background: #fff;
    position: relative;
    top: 0px;
    border-radius: 10px;
    padding:10px;
 }
.demo-carousel img{
	max-width: 100%;
}
.cxtime{
	color:#999;
	margin-top: 1rem;
}
.G_right{
	text-decoration: line-through;
}
.detail .SDchooseAddress{
	width:300px;
}
.detail .SDchooseAddress .SDaddress p{
	height:50px;
	line-height: 20px;
}
.detail .SDchooseAddress .SDaddress .SDaddaddress{
	float: right;
	position: relative;
	top: -45px;
	font-size: 40px;
	color: #e7e7e7;
}
.SDfoot{
	text-align: left;
	text-indent: 2em;
}
.SDfoot button{
	background: #d32122;
    color: #fff;
    height: 100%;
    border: 0 none;
    padding-left: 15px;
    padding-right: 15px;
	padding: 20px 60px;
    cursor: pointer;
	margin-top: 20px;

}
.SDImg{
	width:100%;
}
.ivu-tabs-nav {
	width:100%;
}
.sortDetail .ivu-tabs-nav .ivu-tabs-tab {
    width: 48%;
    text-align: center;
}
	</style>