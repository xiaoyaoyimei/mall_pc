<template>
<div>
	<div class="sortDetail">
        <Carousel v-model="value3" :autoplay="setting.autoplay" :autoplay-speed="setting.autoplaySpeed" :dots="setting.dots"
            :radius-dot="setting.radiusDot" :trigger="setting.trigger" :arrow="setting.arrow">
            <CarouselItem>
              	  <iframe style="width:400px;height:400px" ref="video" frameborder=0 allowfullscreen></iframe>  
            </CarouselItem> 
            <CarouselItem v-for="(item, index) in shangp.productImageList"  :key="index">
                    <div class="demo-carousel" ><img-zoom :src="item.listImg |imgfilter"  width="450" :bigsrc="item.originImg | imgfilter" :configs="configs"></img-zoom></div>
            </CarouselItem>
    	</Carousel>
        <div class="delie">
            <div class="G_info hidden">
                            <h3>{{shangp.product.modelName}}</h3>
                            <p>迪锐克斯DXRACER R011蓝黑色单件</p>
                            <div class="G_changeDetail">
                                <input id="product_id" name="product_id" value="173" type="hidden">
                                <p><span class="G_left"> 零售价：&nbsp;</span> <span class="G_right" style=""><b>{{shangp.product.salePrice | pricefilter}}</b>  </span></p>
                                <input value="29" id="hidden_inventory" type="hidden">
                                
                                <div class="G_MEAS">
                                <form id="attrform">
                                    <div slot="header" >
                                                <div v-if="xiajia" class="xiajia"><Icon type="information-circled">
                                                </Icon>该商品已下架
                                                </div>
                                                <div  v-if="firstshow" class='choosesp'>
                                                    <img :src="choosesp.img |imgfilter" style="display:block">
                                                    <div>
                                                    <span class="cx" v-if="cxshow"><strong>{{choosesp.cuxiaoprice}}</strong>
                                                        促销活动:<label>{{choosesp.activityName}}</label>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="cxtime" v-if="cxshow"> 促销时间：{{choosesp.startTime}}-{{choosesp.endTime}}</div>
                                            </div>
                                            <dl v-for="(item, index) in shangp.productAttrList"  :key="index">
                                            <dt>{{item.attrKey.catalogAttrValue}}</dt>
                                            <dd v-for="(child, index) in item.attrValues"  :key="index" @click="chooseSP($event,item,child)"   ref="dditem" :title="child.id">
                                                {{child.modelAttrValue}}
                                            </dd>
                                            </dl>
                                            <div>数量 <InputNumber  :min="1" v-model="quantity"></InputNumber></div>
                                            <div slot="footer">
                                                <Button  size="large"  :loading="modal_loading" @click="atc" type="error"  v-if="!xiajia" class="btn-orange">立即购买</Button>
                                                <Button  size="large"     disabled="disabled" v-if="xiajia">加入购物车</Button>
                                                <Button  size="large"  :loading="modal_loading" @click="atc" type="error"  v-if="!xiajia">加入购物车</Button>
                                            </div>
                                </form>
                                </div>

                            </div>
                        </div>
        </div>
       <Tabs class="spjs">
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
import imgZoom from 'vue2.0-zoom'
    	export default {
        data () {
            return {
            	xiajia:false,
            	firstshow:false,
            	selectedId:-1,
            	modal2: false,
            	modal_loading:false,
            	shangp:{
            		product:{},
            		promotions:[],
            		productImageList:[],
            		productItemList:[],
            		productAttrList:[]
            	},
            	productDesc:[],
            	productimg:[],
            	bigchoose:'',
            	cxshow:false,
            	choosesp:{
            		img:'',
            		itemNo:'',
            		price:'',
            		cuxiaoprice:'',
            		activityName:'',
            		startTime:'',
            		endTime:''
            	},
            	productItemId:'',
            	quantity:1,
            	productId:'',
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
                    height:300,
                    maskWidth:100,
                    maskHeight:100,
                    maskColor:'red',
                    maskOpacity:0.2
                },
            }
        },
          methods: {
          	//加入购物车
          	getshipin(){
//        		     let youkuUrl = 'http://player.youku.com/embed/' + "XMzQ0MDIwMTAzMg=="
//						          this.$refs.video.src = youkuUrl  
//        		   	this.$axios({
//							    method: 'get',
//							    url:'http://player.youku.com/embed/XMzQ0MDIwMTAzMg==',
//								}).then((res)=>{
//						        if (resresponseHeader.returnCode === 0) {  
//						          let data = res.video  
//						          //  保存数据  
//						          this.video = data  
//						          let id = data.source_id  
//						          let youkuUrl = 'http://player.youku.com/embed/' + "XMzQ0MDIwMTAzMg=="
//						          this.$refs.video.src = youkuUrl  
//						          }
//     					 })
          		},
          	   atc () {
                this.modal_loading = true;
                	this.$axios({
							    method: 'post',
							    url:'/order/shopping/add',
							    data:{
							    	productItemId:this.productItemId,
							    	quantity:this.quantity
							    }
								}).then((res)=>{
									if(res.code=='200'){
										this.modal_loading = false;
										this.$router.push('/cart')  
									}
						})
            	},
            	chooseSP(e,pa,ch){
            		this.cxshow=false;
            		var chooseId="",jishu=0;
       	            let  p=e.target.parentNode.children;
       	            for(let i =1;i<p.length;i++) {
       	            	p[i].className="";
					}
       	             e.target.className="active"; 
            		if(pa.attrKey.isColorAttr=='Y'){
            			this.choosesp.img=ch.listImg;
            		}
            		let dditem=this.$refs['dditem'];
            		 this.bigchoose="";
            		for(let n=0;n<dditem.length;n++){
            			if(dditem[n].getAttribute("class")=='active'){
            				chooseId+=dditem[n].getAttribute("title")+',';
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
            	   if(jishu==this.shangp.productAttrList.length){
            	   	//读出选中商品的促销价格+促销类目
            	   
            	   	    for (let chooseItem of this.shangp.productItemList) {
							   if(chooseItem.productModelAttrs==chooseId){
							   	this.choosesp.itemNo=chooseItem.itemNo,
							   	this.choosesp.price=chooseItem.salePrice,
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
            		
            	},
    	      	getParams () {
	       			 // 取到路由带过来的参数 
			        let routerParams = this.$route.query.id
			        this.productId=routerParams;
			    },
			     getProduct(){
			     		this.$axios({
							    method: 'post',
							    url:'/product/'+this.productId,
								}).then((res)=>{
									if(res.code=='200'){
										this.shangp=res.object;
										 if(res.object.product.video!="")
										 {
						                 this.$refs.video.src = 'http://player.youku.com/embed/' + res.object.product.video;
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
			     setdefault(){
			     		//找出默认选中
//										var result=this.product.productItemList[0].productModelAttrs.split(",");
//									    let dditem=this.$refs['dditem'];
//									     this.bigchoose="";
//										for(let i=0;i<result.length;i++){
//												for(let n=0;n<dditem.length;n++){
//						            			if(dditem[n].getAttribute("title")==result[i]){
//						            				dditem[n].setAttribute("class",'active');
//						            				this.bigchoose +=dditem[n].innerHTML+',';
//						            			}
//						            		}
//										}
			     }
    	      	
    	     },
    	     
    	 mounted() {
				this.getParams();
				this.getProduct();
				this.getProductDesc();
				this.setdefault();
				//this.getshipin();
		},
        components: { imgZoom }
    }
</script>
<style lang="scss">
 @import '@/styles/color.scss';
    .sortDetail{
        max-width: 1100px;
        width:100%;
        margin: 0 auto;
        margin-bottom:50px;
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
            .sdh4{
                color:$color-dx;
                font-size:14px;
            }
            .sdprice{
                padding-left:1.5em;
            }
            .sdyuan{
                color:$color-gray;
                text-decoration:line-through;
            }
            .sdnum{
                color:$color-gray;
            }
            .sdspan{
                float:right;
                padding-right:20px;
                color:$color-gray;
            }
            .sdShare{
                font-size:20px;
                color:$color-gray;
            }
            .sdp{
                color:$color-primary;
                font-size:20px;
                padding-left:1em;
            }
        }
        .sMar{
            height:30px;
            line-height:30px;
        }
        .biaoqian{
            width:50%;
        }
        .ivu-tabs-nav {
            width:100%;
        }
        .ivu-tabs-nav .ivu-tabs-tab{
            width:48%;
            text-align:center;
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
</style>