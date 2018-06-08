<template>
<div style="background-color:#fff;position:relative;top:-0px;padding-top:20px;">
	<div class="sortDetail">
		<div class="goodDetails_name_img">  
			<div class="videoContent" style="width: 400px;height: 400px;">
				<div v-show="videoshow"  style="width: 400px;height: 400px;">
            			<span class="guanbi"  @click="close()">x</span>
        				<div class="youku" :id="shangp.product.video" style="width:100%;height:95%;"></div>
        		</div>   
				<img v-show="!videoshow" :src="ImgUrl |imgfilter" style="width: 100%;height: 100%">  
				<img class="videoIcon" v-if='videoIcon'  v-show="!videoshow"  @click='getVideo(shangp.product.video)'  src="../../assets/img/video.png">
			</div>  
			<div class="little_img" > 
				<!--小图片大于6张的时候才会显示左右按钮-->
				<ul class='inlineBlock leftBtn' @click='relativeLeft()' v-if="shangp.productImageList.lengt>6">
					<li >
						<Icon type="chevron-left" ></Icon>
					</li>
				</ul> 
				<div class='imgContent'>
					<ul  v-for="(item, index) in shangp.productImageList"  :key="index">  
						<li @mouseenter='getIndex(item.listImg,index)' class="clickproduct">  
							<img :src="item.listImg |imgfilter" :class="{clickItem:item.clickItem}"  style="width: 50px; height: 50px" >  
						</li>  
					</ul>
				</div>
				<ul class='inlineBlock rightBtn' @click='relativeRight()' v-if="shangp.productImageList.lengt>6">
					<li>
						<Icon type="chevron-right" ></Icon>
					</li>
				</ul>   
			</div>  
		</div>  
        <div class="delie">
            <div class="G_info hidden">
                <h3>{{shangp.product.modelNo}} 
                	<span v-if="cxshow" class="color-blue">
                    	{{choosesp.activityName}} 
                    </span></h3>
                <p>
                	{{shangp.product.modelName}}
                </p>
				<div class="G_changeDetail">
                    <p class="detail_price">
                    	<span v-if="choosesp.price==0">
                    		￥{{shangp.product.salePrice | pricefilter}}
                    	</span>
                    	<span v-else> 
                    		<span v-if="cxshow">
                    		<label class="color-blue">
                    			￥{{choosesp.cuxiaoprice | pricefilter}} 
                    		</label>
                    		 <label class="color-origin">￥{{choosesp.price | pricefilter}}</label>
                    		 </span>
                    		 <span v-else>￥{{choosesp.price | pricefilter}}</span>
                    	</span>
                    </p>
                    <div class="G_MEAS">
						<div v-if="xiajia" class="xiajia">
							<Icon type="information-circled">
							</Icon>该商品已下架
						</div>
						<div  v-if="firstshow" class='choosesp'>
						</div>
						<div v-for="(item, i) in shangp.productAttrList"  :key="i" class="attr_wrap">
							<div class="dt">{{item.attrKey.catalogAttrValue}} :</div>
							<div  class="dd">
								<span v-for="(child, index) in item.attrValues"  :key="index" @click="chooseSP($event,item,child)"   ref="dditem" :titleid="child.id" 
									:class="item.attrKey.isColorAttr == 'Y' ? 'pl35':''"
								v-bind:style="{backgroundImage:'url('+(item.attrKey.isColorAttr == 'Y' ? 'http://test-shop-img.dxracer.com.cn/'+child.listImg : '')+')'}"
								>
									{{child.modelAttrValue}}
								</span>
							</div>
						</div>
						<div class="sNumber">
							<span class="title">数量:</span>
							<InputNumber  :min="1" v-model="quantity"></InputNumber>
							<span class="stock" >
							 库存: <b v-if="kucunshow">{{choosesp.kucun}}</b><b v-else>0</b>
							</span>
						</div>
						<div>
							<Button v-if="wuhuotongzhi" size="large" class="goBtn"  disabled="disabled">暂时无货，到货通知</Button>
							<Button v-show="!wuhuotongzhi" class="goCart"  size="large"     disabled="disabled" v-if="xiajia">加入购物车</Button>
							<Button v-show="!wuhuotongzhi" class="goCart"  size="large"  :loading="modal_loading" @click="atc" type="error"  v-if="!xiajia">加入购物车</Button>
						</div>
                    </div>
                </div>
            </div>
        </div>
       <Tabs>
        <TabPane label="商品介绍">
        	<ul><li class="center1" v-for="(item, index) in productimg"  :key="index"><img :src="item.imgUrl |imgfilter"></li></ul>
        </TabPane>
        <TabPane label="规格参数" >
        		<ul class="gk">
        			<li  v-for="(item, index) in productDesc"  :key="index">
        			<span class="title">{{item.attrCode}}:</span> <span class="neirong">{{item.attrValue}}</span></li></ul>
        </TabPane>
    </Tabs>
        
    </div>
</div>
</template>
<script>
export default {
        data () {
            return {
            	//库存是否为0添加购物车显示按钮
            	kucunshow:false,
				videoshow:false,
				mousehidden:true,
				xiajia:false,
				wuhuotongzhi:false,
            	firstshow:false,
            	selectedId:-1,
				modal2: false,
				videoIcon:false,
            	modal_loading:false,
            	//商品最原始数据
            	oldshangp:{
            		product:{},
            		promotions:[],
            		productImageList:[],
            		productItemList:[],
            		inventory:[],
            		productAttrList:[],
            	},
            	//请求product之后的商品数据
            	shangp:{
            		product:{},
            		promotions:[],
            		productImageList:[],
            		productItemList:[],
            		inventory:[],
            		productAttrList:[],
            	},
            	productDesc:[],
            	productimg:[],
            	bigchoose:'',
				cxshow:false,
				stock:false,
            	choosesp:{
            		img:'',
            		itemNo:'',
            		price:0,
            		cuxiaoprice:'',
            		activityName:'',
            		startTime:'',
            		endTime:'',
            		kucun:'',
            	},
            	productItemId:'',
            	quantity:1,
            	max:100,
            	productId:'',
				ImgUrl:'',
				choosepPrice:false,
				productImageListNew:[],
            }
        },
          methods: {
          	        changeNumber: function(event){
						var obj=event.target;
						this.quantity = parseInt(obj.value);
					},
					relativeLeft(){
						if(this.productImageListNew.length > 0){
							var arr = this.productImageListNew.pop()
							this.shangp.productImageList.unshift(arr)
						}else{
							this.mousehidden = false
						}

					},
					relativeRight(){
						if(this.shangp.productImageList.length > 6){
							var arr = this.shangp.productImageList.shift()
							this.productImageListNew.push(arr)
						}else{
							this.mousehidden = false
						}
					},
					//添加
					jia:function(){
						if(this.quantity>=this.max){
						this.quantity=this.max
						}else{
						this.quantity=parseInt(this.quantity)+1; 
						  }
					},
					//减
					jian:function(){
						if(this.quantity==1){
						this.quantity==1
						}else{
						this.quantity=parseInt(this.quantity)-1; 
						}
					},
					getIndex(imgUrl,index){ 
						this.videoshow=false; 
						this.ImgUrl = imgUrl;  
						for (let i = 0; i < this.shangp.productImageList.length; i++) {
							if(index == i){
								this.shangp.productImageList[i].clickItem = true;
							}else{
								this.shangp.productImageList[i].clickItem = false;
							}
							
						}
					} ,
					close(){
						this.videoshow=false;
					},
					getVideo(imgVideo){
						let _this=this;
						if(imgVideo!="")
							{
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
          	//加入购物车
          	   atc () {
                 this.modal_loading = true;
	                if(localStorage.getItem('token')!=null&&localStorage.getItem('token')!=undefined){
	                	this.$axios({
								    method: 'post',
								    url:'/order/shopping/add',
								    data:{
								    	productItemId:this.productItemId,
								    	quantity:this.quantity
								    }
									}).then((res)=>{
										this.modal_loading = false;
										if(res.code=='200'){
											
											this.$router.push('/cart')  
										}
										else{
											this.$Message.error(res.msg);
											return ;
										}
							})
						}else{
							this.$router.push({  path: '/login', query: {redirect: this.$route.fullPath} })  
						}
            	},
            	//选择商品
            	chooseSP(e,pa,ch){
            		this.kucunshow=false;
            		this.cxshow=false;
            		var chooseId="",jishu=0;
       	            let p=e.target.parentNode.children;
       	            //商品属性高亮
       	             if(e.target.tagName=='IMG'){
            			p=e.target.parentNode.parentNode.children;
            		    for(let i =0;i<p.length;i++) {
       	            	p[i].className="";
						}
            			e.target.parentNode.className="active";
            		}else{
	            			   for(let i =0;i<p.length;i++) {
	       	            	p[i].className="";
						}
            			   e.target.className="active"; 
            		}
       	         
            		if(pa.attrKey.isColorAttr=='Y'){
            			this.ImgUrl=ch.listImg;
            		}
            		let dditem=this.$refs['dditem'];
            		this.bigchoose="";
            		for(let n=0;n<dditem.length;n++){
            			if(dditem[n].getAttribute("class")=='active'){
            				chooseId+=dditem[n].getAttribute("titleid")+',';
            				this.bigchoose +=dditem[n].innerHTML+',';
            				jishu++
            			}
            		}
            		//显示促销信息
            		if(this.shangp.promotions)
            		//商品详情页已选显示
            	   chooseId=(chooseId.slice(chooseId.length-1)==',')?chooseId.slice(0,-1):chooseId;
            	   this.bigchoose=(this.bigchoose.slice(this.bigchoose.length-1)==',')?this.bigchoose.slice(0,-1):this.bigchoose;
            	   var flag= false;
            	   //只有选择完属性才可以 读出选中商品的促销价格+促销类目
            	   if(jishu==this.shangp.productAttrList.length){
            	   	//通过选择属性读出productItemId
            	   	    for (let chooseItem of this.shangp.productItemList) {
							if(chooseItem.productModelAttrs==chooseId){
								this.shangp.product.modelNo = chooseItem.itemNo,
							   	this.choosesp.itemNo=chooseItem.itemNo,
								this.choosesp.price=chooseItem.salePrice;
							   	this.productItemId=chooseItem.id;
							   	if(this.shangp.promotions.length>0){
							   		 for (let cxitem of this.shangp.promotions) {
				            	   	 	if(cxitem.productItemId==this.productItemId){
				            	   	 		this.cxshow=true;
				            	   	 		this.choosesp.cuxiaoprice=cxitem.onSalePrice;
				            	   	 		this.choosesp.activityName=cxitem.activityName;
				            	   	 		this.choosesp.startTime=cxitem.startTime;
				            	   	 		this.choosesp.endTime=cxitem.endTime;
				            	   	 	}
				            	   	 }
							   		}
							   	flag= true;
							   	break;
							   }else{
							   		flag= false
							   }

							}
            	   	    if(flag == false){
            	   	    	this.choosesp.itemNo="";
            	   	    	this.choosesp.price="";
            	   	    	this.xiajia=true
            	   	    	this.firstshow=false
            	   	    }else{
            	   	    	this.xiajia=false;
            	   	    	this.firstshow=true
            	   	    }
            	   }
            	   //计算库存（库存需大于0才显示）
            	   if(this.shangp.inventory.length>0){
					for(let kucunitem of this.shangp.inventory){
						if(kucunitem.skuId==this.productItemId){
							this.choosesp.kucun=kucunitem.quantity-kucunitem.lockQuantity
						}
					}
					this.kucunshow=true;
					}
					if(this.choosesp.kucun < 1){
						this.wuhuotongzhi = true;
					}else{
						this.wuhuotongzhi = false;
					}
            	},
    	      	getParams () {
	       			 // 取到路由带过来的参数 
			        let routerParams = this.$route.query.id
			        this.productId=routerParams;
			    },
			    //获取该商品信息
			     getProduct(){
			     	let _this=this;
			     	_this.videoshow=false;
			     		this.$axios({
							    method: 'post',
							    url:'/product/'+this.productId,
								}).then((res)=>{
									if(res.code=='200'){
										this.shangp= Object.assign({},this.oldshangp,res.object);
										for (let a = 0; a < this.shangp.productImageList.length; a++) {
											this.shangp.productImageList[a].clickItem = false;
										}
										this.ImgUrl = this.shangp.product.modelImg;
										if(this.shangp.productImageList.length >0){
											
											this.shangp.productImageList[0].clickItem = true;
										}
										if(this.shangp.product.video != ''){
											this.videoIcon = true;
										}
									}
							});
			     },
			     getProductDesc(){
			     		this.$axios({
							    method: 'post',
							    url:'/product/desc/'+this.productId,
								}).then((res)=>{
										this.productDesc=res;
							});
								this.$axios({
							    method: 'post',
							    url:'/product/img/'+this.productId,
								}).then((res)=>{
										this.productimg=res;
							});
			     },
    	      	
    	     },
    	     
    	 mounted() {
				this.getParams();
				this.getProduct();
				this.getProductDesc();
        },
    }
       
</script>
<style lang="scss" scoped="scoped">
 @import '@/styles/color.scss';
    .sortDetail{
        max-width: 1100px;
        width:100%;
        margin: 0 auto;
        margin-bottom:50px;
        min-height: 900px;
        position: relative;
		margin-top: 30px;
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
            margin-left: 60px;
			margin-bottom: 100px;
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

    }
.sortDetail .G_info > h3 {
	font-size: 28px;
	color: black;
}
.sortDetail .G_info > p {
    font-size: 15px;
    line-height: 36px;
    border-bottom: 1px solid #e7e7e7;
    padding-bottom: 20px;
}
.G_changeDetail {
    font-size: 14px;
}
.sortDetail .G_info .G_changeDetail .G_MEAS form h5 {
    display: inline-block;
    font-weight: normal;
    font-size: 100%;
    position: relative;
    top: -15px;
}
.sortDetail .G_info .G_changeDetail .G_MEAS form p {
    position: relative;
    display: inline-block;
    margin-right: 6px;
    border: 1px solid #9b8888;
    text-align: center;
    line-height: 30px;
}

.sortDetail .G_info .G_changeDetail .G_MEAS form p input {
    height: 40px;
    min-width: 40px;
    text-align: center;
    padding: 0 3px;
    cursor: pointer;
    border: none;
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
 	margin: 10px 0px;
 	.cx{
 		margin-top:1rem;
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
.sortDetail  strong{
  	color:black;
  	display: inline;
    font-size: 32px;
	font-weight: normal;
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
 		color:black;
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
  .attr_wrap{
 	 overflow: hidden;
	 margin-top: 15px;
 	.dt{
    float: left;
    width: 85px;
    white-space: nowrap;
    overflow: hidden;
    line-height: 40px;
 	}
	 .dd{
		margin-left: 85px;
	    overflow: hidden;
	    zoom: 1;
	    cursor: pointer;
		img{
			width: 38px;
			height: 38px;
			vertical-align: middle;
			float: left;
		}
		span{
			display: inline-block;
			border:1px solid #ccc;
			height: 40px;
			margin-right: 10px;
			line-height: 40px;
			padding: 0 5px;
			margin-bottom: 10px;
			background-size: contain;
			background-repeat: no-repeat;
			vertical-align: middle;
}       .pl35{
		padding-left: 35px;
		}
		span.active{
			color:#0099ff;
	  	    border-color:#0099ff;
		}
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
.cxtime{
	color:#999;
	margin-top: 1rem;
}
.sortDetail .chooseSPPrice{
	text-decoration: line-through;
	font-size: 20px;
	color: #999;
}
.detail_price{
	font-size: 28px;
	color:#333;
	padding: 20px 20px 20px 0;
	border-bottom: 1px solid #ccc;
}
.detail_price .color-origin{
	font-size: 14px;
}
.goCart {
	background-color: #57a3f3;
	border: 1px solid #57a3f3;
}

.sortDetail .stock{
	padding-left: 20px;
	color: black;
}
.sortDetail .stock b{
	color:#57a3f3;
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
	width:50px;
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
.sortDetail .neirong, .sortDetail .title{
	font-size: 15px;
	line-height: 35px;
}
.sortDetail .sNumber {
	border-bottom: 1px solid #e7e7e7;
	padding-bottom: 30px;
	margin-top: 20px;
	margin-bottom: 50px;
}
.sNumber .title{
	width: 80px;
	display: inline-block;
}
.sortDetail .G_MEAS .ative img{
	width:20px;
}
.clickproduct img{
	border:1px solid #fff;
}
.sortDetail .clickItem{
	border:  1px solid #999;
}
.sortDetail .attrImg{
	width:20px;
	vertical-align: middle;
}
</style>
<style>
.sortDetail  .ivu-tabs-nav {
    width:100%;
}
.sortDetail   .ivu-tabs-nav .ivu-tabs-tab{
    width:48%;
    text-align:center;
	font-size: 20px;
}
.sortDetail  .goCart  {
	padding: 15px 50px;
}
.sortDetail .goBtn{
	padding: 15px 50px;
}
.sNumber .ivu-input-number{
	border-color:#ccc;
	border-radius: 0px;
	height: 40px;
	line-height: 40px;
}
</style>