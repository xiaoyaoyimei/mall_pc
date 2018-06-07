<template>
	<div class="detail sortDetail ">
		<div class="tp main-wdith">
			<div class="goodDetails_name_img">  
				<div class="videoContent" style="width: 400px;height: 400px;">
					<div v-show="videoshow"  style="width: 400px;height: 400px;">
							<span class="guanbi"  @click="close()">x</span>
							<div class="youku" :id="detail.product.video" style="width:100%;height:95%;"></div>
					</div>   
					<img v-show="!videoshow" :src="detail.productItem.listImg |imgfilter" style="width: 100%;height: 100%">  
					<img class="videoIcon" v-if='videoIcon'  v-show="!videoshow"  @click='getVideo(detail.product.video)'  src="../../assets/img/video.png">
				</div>  
				<div class="little_img" > 
					<div class='imgContent'>
						<ul>  
							<li  class="clickproduct">  
								<img :src="detail.productItem.listImg |imgfilter" :class="{clickItem:detail.productItem.clickItem}" style="width: 50px; height: 50px" >  
							</li>  
						</ul>
					</div>

				</div>  
			</div> 
			<div class="delie">
				<div class="G_info">
					 <h3>{{detail.product.modelNo}}</h3>
					<p>{{detail.product.modelName}}</p> 
					<!--<div>距离结束</div>-->
					<div class="G_changeDetail">
						<p class="G_right"><strong class="strong">￥{{detail.crush.salePrice | pricefilter}} </strong> <span class='chooseSPPrice'>￥{{detail.productItem.salePrice | pricefilter}}</span></p>
						<div class="sNumber">数量 : <InputNumber  :min="1" v-model="quantity" :max="detail.crush.unitQuantity*1"></InputNumber></div>
					</div>
					<div class="chooseAddress">
							<ul class="address" v-if="youdizhi">
							<li>
								<p class="addressP">
									<strong class="addressStrong">{{addressList.person}} <label>{{addressList.phone}}</label></strong>
									<span>{{addressList.receiveProvince}}{{addressList.receiveCity}}{{addressList.receiveDistrict}}{{addressList.address}}</span>
								<button @click="addAdd" class="changeadd" type="button">更换地址</button>
								</p>
							</li>
						</ul>
							<div  class="zeroAddress" v-else @click="addAdd">
									请选择收货地址
							</div>
					</div>
						<div class="foot"> 
								<button :loading="loading" @click="confirm" class="miaoshagou">马上抢</button>
							</div> 
				</div>
        	</div> 
		</div>
	
				<Tabs class="spjs main-wdith">
				<TabPane label="商品介绍">
					<ul><li v-for="(item, index) in productimg" class="center1"  :key="index"><img :src="item.imgUrl |imgfilter"></li></ul>
				</TabPane>
				<TabPane label="规格参数" >
						<ul class="gk">
							<li v-for="(item, index) in productDesc"  :key="index">
							<span class="title">{{item.attrCode}}:</span> <span class="neirong">{{item.attrValue}}</span></li></ul>
				</TabPane>
			</Tabs>
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
				videoIcon:false,
				videoshow:false,
				ImgUrl:'',
	        }
	      },
	      methods:{
			getIndex(imgUrl,index){ 
				this.videoshow=false; 
				this.ImgUrl = imgUrl;  
			} ,
			getVideo(imgVideo){
				let _this=this;
				if(imgVideo!=""){
						_this.videoshow=true;
						let player = new YKU.Player(imgVideo, {
						styleid: '0',
						client_id: '0996850d68cf40fe',
						vid: imgVideo,
						newPlayer: true,
						isAutoPlay:true,
						});
				}
			},
			close(){
				this.videoshow=false;
			},
	      	//获取address中传来的数据
	      	getDD(){
                let routerParams = this.$route.query.address;
                if(routerParams!=undefined){
                	this.addressList=routerParams;
                	this.youdizhi=true
                }
        	},
        	//去往个人中心页面选择地址
	       addAdd(){
        		 this.$router.push({name: '/user/address',query:{skuId:this.$route.query.skuId,fromc:'secdetail'}}) ;
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
		          if(this.addressList.id==undefined){
		          	this.$Message.error('收货地址不能为空');
		          	return;
		          }
	          	let para={
						addressId:this.addressList.id,
						quantity:this.quantity,
	                    skuId:this.$route.query.skuId
	          	};
    	   	  	this.$axios({
				    method: 'post',
				    url:'/promotion/crush/confirm',
				    data:para
				}).then((res)=>{
					if(res.code=='200'){
						this.$router.push({name:'/cartthree',query: { orderNo: res.msg}});  
					}else{
						 this.$Message.error(res.object);
						 return;
					}
				});
           },
	      	getDetail(){
	      			this.$axios({
					    method: 'get',
					    url:'/promotion/crush/'+  this.$route.query.skuId,
					}).then((res)=>{
						if(res.code=='200'){
						this.detail = res.object;
						this.detail.productItem.clickItem =true;
						if(this.detail.product.video != ''){
							this.videoIcon = true;
						}
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
			  this.getDetail()
			  this.getDD();
			  this.getAddress();
	      }
    }
</script>

<style scoped="scoped" lang="scss">
	.detail {
		padding-top: 50px;
		background: #fff;
		.goodDetails_name_img{
            display: inline-block;
            width:400px;
			overflow: hidden;
			.little_img{
				overflow: hidden;
			}
			.clickproduct{
				float: left;
				width:50px;
				height:50px;
				margin:10px 7.5px;
				cursor: pointer;
			}
		}
        .ivu-carousel{
            width: 400px;
            height: 400px;
            display: inline-block;
        }
        .delie{
            display: inline-block;
            width:600px;
            margin-left: 40px;
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
        .biaoqian{
            width:50%;
        }
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
.sortDetail .addressStrong{
	color: #333;
	font-size: 18px;
}
.sortDetail .addressP{
	height: 60px;
	margin-bottom: 10px;
}
.sortDetail .G_info > h3 {
	font-size: 28px;
	color: black;
}
.sortDetail  .strong{
  	color:#0099ff;
  	display: inline;
    font-size: 28px;
	font-weight: normal;
}
.sortDetail .G_info > p {
    font-size: 15px;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
}
.sortDetail .G_info .G_changeDetail {
    font-size: 12px;
}
.sortDetail .chooseSPPrice{
	text-decoration: line-through;
	font-size: 15px;
	color: #999;
}
.sortDetail .G_info .G_right{
	padding-top: 20px;
	font-size: 32px;
	width:100%;
	color: black;
	padding-bottom: 20px;
	border-bottom: 1px solid #ccc;
}
.miaoshagou {
	background-color: #0099ff;
	border: 1px solid #0099ff;
	cursor: pointer;
	height:50px;
	width: 155px;
	color:#fff;
	font-size: 16px;
}
.little_img{
	position: relative;
	padding-left:5px;
	min-width: 400px;
	height: 70px;
}
.inlineBlock{
	display: inline-block;
	vertical-align: middle;
	position: absolute;
	top: 0px;
	font-size: 16px;
	z-index: 10;
	width: 20px;
	height: 50px;
	line-height: 70px;
	cursor: pointer;
}
.imgContent{
	min-width: 400px;
}
.leftBtn{
	left: 0px;
}
.rightBtn{
	right: 0px;
}
.rightBtn li{
	text-align: right;
}
.videoContent{
	width:400px;
	height: 400px;
	position: relative;
}
.videoIcon{
	width:50px!important;
	height:50px;
	position: absolute;
	left: 0px;
	bottom: 0px;
}
.youku{
	width:100%;
	height: 95%;
}
.guanbi{
	position: absolute;
	top:10px;
	right: 0px;
	font-size: 16px;
	height: 30px;
	width: 30px;
	cursor: pointer;
}
.sortDetail .addAddress{
	float: right;
	height: 60px;
	line-height: 60px;
	position: relative;
	top: -70px;
	font-size: 25px;
}
.sortDetail .neirong, .sortDetail .title{
	font-size: 15px;
	line-height: 35px;
}
.sortDetail .sNumber {
	border-bottom: 1px solid #ccc;
	padding-bottom: 20px;
	padding-top:20px;
	margin-bottom: 20px;
	font-size: 14px;
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
        width: 25%;
    }
}
.sortDetail .neirong, .sortDetail .title{
	font-size: 15px;
	line-height: 35px;
}
 .zeroAddress{
	height: 30px;
	font-size: 14px;
	color:#0099ff;
	text-decoration: underline;
	cursor: pointer;
}
.sortDetail .float{
	float: right;
	height: 60px;
	line-height:60px;
	cursor: pointer;
}
.sortDetail .clickItem{
	border:  1px solid #999;
}
.changeadd{
	border:1px solid #0099ff;
	color:#0099ff;
	padding: 2px;
	cursor: pointer;
	background: #fff;
}
</style>
<style>
	.spjs .ivu-tabs-nav{
		width:100%
	}
	.spjs .ivu-tabs-tab{
		font-size:20px;
		width:50%;
		text-align: center;
	}
	</style>