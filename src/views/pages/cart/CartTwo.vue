<template>
    <div class='paymoney'>
		<div id="addressWrap" class="">
    <div class="wrap-header">
        <h3>选择收货地址</h3>
        <span class="small-text js_address_tips">地址切换可能导致价格和库存变动，请仔细确认</span>
    </div>
    <div class="address-box clearfix" >
        <div class="adr js_adr_check"  :class="{checked: index == selectItem}"  v-for="(addritem,index) in addressList" :key="index" @click="chooseAddr(addritem.id,index)">
            <div class="adr-inner">
                <i class="icon_checked"></i>
                <div class="adr-head" >
                    <span class="adr-province">{{addritem.receiveProvince}}</span>
                    <span class="adr-city">{{addritem.receiveCity}}</span>
                    <span class="adr-name">{{addritem.person}}</span>
                </div>
                <div class="adr-body" title="addritem.address">
                    <p class="adr-text">
                        <span class="adr-detail">{{addritem.address}}</span>
                    </p>
                      <span v-if="addritem.isDefault=='Y'">(默认)</span>
                </div>
                <div class="adr-foot">
                    <a href="javascript:;" class="js_adr_edit" @click="editmodal(addritem)">编辑</a>
                    <a href="javascript:;" class="js_adr_delete" @click="handleDelete(addritem.id)">删除</a>
                </div>
            </div>
        </div>
        <div class="adr js_adr_add" ms-hover="'hover'" @click="modaladdr=true">
            <div class="adr-inner">
                <div class="adr-add">
                    <p class="adr-add-icon"><i class="icon_add">+</i></p>
                    <p class="adr-add-text">添加地址</p>
                </div>
            </div>
        </div>
        
    </div>
</div>
                <Modal v-model="modaladdr" title="新增收货地址" @on-ok="ok" :loading="loading">
				<Form :model="addForm" ref="addForm" label-position="left" :label-width="100" :rules="ruleValidate" > 
					<FormItem label="收货人" prop="person">
						<Input v-model="addForm.person" placeholder="收货人" autocomplete="off"></Input>
					</FormItem>
					<FormItem label="手机号" prop="phone">
						<Input v-model="addForm.phone" placeholder="联系电话" autocomplete="off"></Input>
					</FormItem>
					<FormItem label="固定电话" >
						<Input v-model="addForm.tel" placeholder="固定电话" autocomplete="off"></Input>
					</FormItem>
			        <FormItem label="所在地区"  prop="selectedOptionsAddr">
        		 <Cascader  v-model="addForm.selectedOptionsAddr" :data="addressOption"></Cascader>
        		</FormItem>
					<FormItem label="详细地址" prop="address">
						<Input v-model="addForm.address" placeholder="详细地址"></Input>
					</FormItem>
				</Form>
				  </Modal>
				   <Modal ref='modaleditaddr' v-model="modaleditaddr" title="编辑收货地址" @on-ok="editaddr" :loading="loading">
					  	<Form :model="editForm" ref="editForm" label-position="left" :label-width="100" :rules="ruleValidate"  > 
				        <FormItem label="收货人" prop="person">
				            <Input v-model="editForm.person" placeholder="收货人"></Input>
				        </FormItem>
				        <FormItem label="手机号" prop="phone">
				            <Input v-model="editForm.phone" placeholder="联系电话"></Input>
				        </FormItem>
				        <FormItem label="固定电话" >
				            <Input v-model="editForm.tel" placeholder="固定电话"></Input>
				        </FormItem>
				        <FormItem label="所在地区"  prop="selectedOptionsAddr">
				        	 <Cascader  v-model="editForm.selectedOptionsAddr" :data="addressOption"></Cascader>
				        </FormItem>
				         <FormItem label="详细地址" prop="address">
				            <Input v-model="editForm.address" placeholder="详细地址"></Input>
				        </FormItem>
				    </Form>
			    </Modal>
			        <div class="wrap-header">
        <h3>确认订单信息</h3>
    </div>
            <div class="carttwo">
<div class='carthead'>
			<Row>
				<Col  class='cartCol' span="24">
					<Col span="4" ><p >主图</p></Col>
					<Col span="11"><p >商品信息</p></Col>
					<Col span="2">
						<p >单价（元）</p>
					</Col>
					<Col span="3">
						<p >数量</p>
					</Col>
					<Col  span="2">
						<P >小计（元）</P>
					</Col>
				</Col>
			</Row>
		</div>
			<Row  class='cartCol' span="24" v-for="(x,index) in cartList" :key="index" > 
						<Col span="4" ><p class="paddingLeft"><img class='cartImg' :src="imageSrc+x.image"></p></Col>
						<Col span="11">
							<p class='cart_black paddingLeft'>{{x.productName}}</p>
							<p class='cart_gray paddingLeft'>{{x.productAttr}}</p>
							<label class="promotion" v-if="x.promotionTitle !=null">{{x.promotionTitle}}</label>
						</Col>
						<Col span="2">
						<p class='cart_price paddingLeft'>
							￥{{x.salePrice |pricefilter}}
							<span v-if="x.promotionTitle ==null&&xscoupon" class="color-coupon">
					       	 	￥{{couponprice(x.salePrice) |pricefilter }}
					       	 </span></p>
					</Col>
					<Col span="3">
						<p class='cart_qua paddingLeft'>*{{x.quantity}}</p>
						<p class='cart_qua paddingLeft color-coupon' v-if="x.promotionTitle ==null&&xscoupon">*{{x.quantity}}</p>
					</Col>
					<Col span="2">
						<p class='cart_price paddingLeft'>￥{{x.salePrice|pricefilter}} 
							<span v-if="x.promotionTitle ==null&&xscoupon" class="color-coupon">
					       	 	￥{{couponprice(x.salePrice) |pricefilter}}
					       	 </span></p>
					</Col>
				</Row>
			</div>
			<div class="exchange-code-inner" v-show="couponshow">
                    优惠券:     <input type="text" class="item-box-txt js_exchange_code_txt" placeholder="请输入优惠券" v-model.trim="couponCode">
                        <span class="item-box-btn-save js_exchange_code_confirm" @click='usecoupon'>确认</span>
			</div>
         <div class='cartfoot'>
			<strong>总价：￥<span>{{totalPrice}}</span></strong>
           <button  @click="confirm"  type="button"> 
				提交订单
			</button>
		</div>
    </div>
</template>
<script>
       export default {
        data () {
            return {
            	loading:true,
             addressOption: [],
             selectItem:null,
			  addForm: {
		                    person: '',
		                    phone: '',
		                    selectedOptionsAddr:[],
		                    address:'',
		                    tel:'',
		                },
		                	  editForm: {
		                    person: '',
		                    phone: '',
		                    selectedOptionsAddr:[],
		                    address:'',
		                    tel:'',
		                },
		            ruleValidate: {
	                    person: [
	                        { required: true, message: '收货人不能为空', trigger: 'blur' }
	                    ],
	                    phone: [
	                        { required: true, message: '手机号不能为空', trigger: 'blur' },
	                    ],
                    	address:[
	                        { required: true, message: '详细地址不能为空', trigger: 'blur' },
	                    ]
                   },
                 modaleditaddr:false,
            	modaladdr:false,
            	orderfail:false,
            	xscoupon:false,
            	couponCode:'',
                imageSrc:this.global_.imgurl,
                 indeterminate: true,
                checkAll: false,
				checkAllGroup: [],
				totalPrice:0,
				cartList:[],
				editface:true,
				zslcount:0,
				temp:[],
				addressList:{},
				tempcart:[],
				productItemIds:[],
				couponshow:true,
				couponmsg:{
					availableSku:'',
					availableCatalog:'',
					modeValue:'',
					couponMode:''
				}
            }
        },
        methods: {
        	chooseAddr(id,index){
        		this.addressId=id;
        		this.selectItem=index
        		
        	},
        //获得地址列表
		      getAddress(){
		      	var _this=this;
		      	  	this.$axios({
						    method: 'post',
						    url:'/address',
						}).then((res)=>{
							 if(res.length>0){
							 	_this.addressList=res
							}
						});
		      },
        	getAddressOption(){
    	      		  	this.$axios({
						    method: 'post',
						    url:'/common/address',
						}).then((res)=>{
							 this.addressOption=res;
						});
    	      	},
        	//新增地址
        	ok () {
                setTimeout(() => {
                    this.loading = false;
                    this.$nextTick(() => {
                        this.loading = true;
                                     this.$refs['addForm'].validate((valid) => {
					if (valid) {
							let temp=this.addForm;
							temp.receiveProvince=this.addForm.selectedOptionsAddr[0];
							temp.receiveCity=this.addForm.selectedOptionsAddr[1];
							temp.receiveDistrict=this.addForm.selectedOptionsAddr[2];
							delete temp['selectedOptionsAddr']
							let para = Object.assign({}, temp);
								this.$axios({
							    method: 'post',
							    url:'/address/insert',
							    data:para,
								}).then((res)=>{
									if(res.code=='200'){
								    this.modaladdr = false;
									this.$refs['addForm'].resetFields();
									this.getAddress();
									this.$Message.success('修改成功');
									}else if(res.code=='401'){
										this.$Message.error(res.msg);
										return ;
									}else{
										this.$Message.error(res.msg);
										return ;
									}
							});
					}
				});
                    });
                }, 2000);
       
            },
            editmodal(item){
            		this.modaleditaddr=true;
            	    this.editForm.id=item.id;
			        this.editForm.person=item.person;
			        this.editForm.phone=item.phone;
			        this.editForm.tel=item.tel;
			        this.editForm.selectedOptionsAddr=[item.receiveProvince,item.receiveCity,item.receiveDistrict];
			        this.editForm.address=item.address;
			        
            },
                    	//编辑地址
        	editaddr () {
                setTimeout(() => {
                    this.loading = false;
                    this.$nextTick(() => {
                        this.loading = true;
		                this.$refs['editForm'].validate((valid) => {
							if (valid) {
									let temp=this.editForm;
									let id=temp.id;
									temp.receiveProvince=this.editForm.selectedOptionsAddr[0];
									temp.receiveCity=this.editForm.selectedOptionsAddr[1];
									temp.receiveDistrict=this.editForm.selectedOptionsAddr[2];
									delete temp['selectedOptionsAddr']
									delete temp['id']
									let para = Object.assign({}, temp);
										this.$axios({
									    method: 'post',
									    url:'/address/update?id='+id,
									    data:para,
										}).then((res)=>{
											this.modaleditaddr = false;
											this.$refs['editForm'].resetFields();
											this.getAddress();
											this.$Message.success('提交成功');
									});
							}
						});
                    });
                }, 2000);
       
            },
            //删除地址
            handleDelete(value){
       	   	   this.$Modal.confirm({
                    title: '确认删除',
                    content: '<p>确认删除该地址</p>',
                    onOk: () => {
                         	this.$axios({
							    method: 'post',
							    url:'/address/delete?id='+value+'',
							}).then((res)=>{
								if(res.code=='200'){
									this.$Message.success('删除成功');
									this.getAddress();
								}
						})
                    },
                    onCancel: () => {
                        this.$Message.info('取消删除');
                    }
                });
       	   		
       	   },
        	//总价计算
        	jisuan(value){
        		let _this=this;
        		  //刚进入购物车页面
        		if(value==undefined){
        			  this.cartList.forEach(function(item,index) {
					    _this.totalPrice +=item.salePrice*item.quantity;
				   });
        		}
        		//使用优惠券
        		else{
        		  let couponmethod=value;
	        		  if(couponmethod.availableSku==""&&couponmethod.availableCatalog==""){
	        		      _this.totalPrice=0;
		        	      if(couponmethod.couponMode=='rate'){
		        		  	    this.cartList.forEach(function(item,index) {
		        		  	    	if(item.promotionTitle!=''&&item.promotionTitle!=null&&item.promotionTitle!=undefined){
		        		  	    		_this.totalPrice +=item.salePrice*item.quantity;
		        		  	    	}else{
		        		  	    		_this.totalPrice +=item.salePrice*(1-couponmethod.modeValue)*item.quantity
		        		  	    	}
						   });
		        		  }else{
		        		  	    this.cartList.forEach(function(item,index) {
		        		  	    	if(item.promotionTitle!=''&&item.promotionTitle!=null&&item.promotionTitle!=undefined){
		        		  	    		_this.totalPrice +=item.salePrice*item.quantity;
		        		  	    	}else{
		        		  	    		_this.totalPrice +=(item.salePrice-couponmethod.modeValue)*item.quantity
		        		  	    	}
						   });
		        		  }
	        		  }else if(couponmethod.availableSku!=""){
	        		  	   _this.totalPrice=0;
		        	      if(couponmethod.couponMode=='rate'){
		        		  	    this.cartList.forEach(function(item,index) {
		        		  	    	if(item.id==couponmethod.availableCatalog){
		        		  	    		_this.totalPrice +=item.salePrice*(1-couponmethod.modeValue)*item.quantity
		        		  	    	}else{
		        		  	    		_this.totalPrice +=item.salePrice*item.quantity;
		        		  	    	}
						   		});
		        		  }else{
		        		  	    this.cartList.forEach(function(item,index) {
		        		  	    	if(item.id==couponmethod.availableCatalog){
		        		  	    		_this.totalPrice +=(item.salePrice-couponmethod.modeValue)*item.quantity
		        		  	    	}else{
		        		  	    		_this.totalPrice +=item.salePrice*item.quantity;
		        		  	    	}
						   });
	        		  	}
	        		  }else{
	        		  	 _this.totalPrice=0;
		        	      if(couponmethod.couponMode=='rate'){
		        		  	    this.cartList.forEach(function(item,index) {
		        		  	    	if(item.productType==couponmethod.availableSku){
		        		  	    		_this.totalPrice +=item.salePrice*(1-couponmethod.modeValue)*item.quantity
		        		  	    	}else{
		        		  	    		_this.totalPrice +=item.salePrice*item.quantity;
		        		  	    	}
						   		});
		        		  }else{
		        		  	    this.cartList.forEach(function(item,index) {
		        		  	    	if(item.productType==couponmethod.availableSku){
		        		  	    		_this.totalPrice +=(item.salePrice-couponmethod.modeValue)*item.quantity
		        		  	    	}else{
		        		  	    		_this.totalPrice +=item.salePrice*item.quantity;
		        		  	    	}
						   });
	        		  	}
	        		  }
        		  }
        	},
		      getCartList(){
		        this.cartList =  JSON.parse(sessionStorage.getItem('cart')); 
		        var _this=this;
		         _this.productItemIds=[];
		          let n=0;
		          this.cartList.forEach(function(item,index) {
		          	   if(item.promotionTitle!=''&&item.promotionTitle!=null){
		          	     n+=1;
		          	   }
					    _this.productItemIds.push(item.id);
				   });
				      if(this.cartList.length==n){
				      	this.couponshow=false
				      }else{
				      		this.couponshow=true
				      }
		      },
		      //提交表单
            confirm(){
            	if(this.selectItem==null){
            	this.$Message.error('收货地址不能为空');
            	return
            	}
	          	let para={
						addressId:this.addressList[this.selectItem].id,
	                    productItemIds:this.productItemIds,
	                    couponCode:this.couponCode
	          	};
    	   	  	this.$axios({
				    method: 'post',
				    url:'/order/shopping/confirm',
				    data:para
				}).then((res)=>{
					if(res.code=='200'){
						 this.$router.push({name:'/cartthree',query: { orderNo: res.msg}});  
					}else{
				   this.$Modal.error({
				   	title:'失败提示',
                    content: res.msg,
               		 });
					}
				});
           },
           //使用优惠券
           usecoupon(){
           	this.xscoupon=false
           	if(this.couponCode==''){
           		this.$Message.error('优惠码不能为空');
           		return;
           	}
           	let para={
						addressId:this.addressList.id,
	                    productItemIds:this.productItemIds,
	                    couponCode:this.couponCode
	          	};
           	  	this.$axios({
				    method: 'post',
				    url:'/promotion/coupon',
				     data:para
				}).then((res)=>{
					if(res.code=='200'){
						this.xscoupon=true;
						this.couponmsg=Object.assign({}, res.object);
						this.jisuan(this.couponmsg);
					}else{
						this.xscoupon=false;
						this.$Message.error(res.object);
					}
				});
          },
          couponprice(value){
          	let couponmsg=this.couponmsg;
          	if(couponmsg.couponMode=='rate'){
          		return value*(1-couponmsg.modeValue)
          	}
          	else{
          		return value-couponmsg.modeValue
          	}
          }
        },
         mounted() {
         	this.getAddress();
         	this.getAddressOption();
         	this.getCartList();
         	this.jisuan();
		}
    }
</script>
<style lang="scss">
 @import '@/styles/color.scss';
 .clearfix:after {content: "."; display: block; height:0; clear:both; visibility: hidden;}
.clearfix { *zoom:1; }
 .paymoney{
	 width: 100%;
	 max-width: 1100px;
	 margin: 0 auto;
	 min-height: 700px;
	 .m_header_bar{
		 padding-bottom: 20px;
		.m_header_bar_title{
		 	font-size: 16px;
	 	}
	}
	.ivu-form{
		background-color:#f5f7f9; 
		margin-top:20px;
		width: 400px;
	}
	.ivu-col{
		height: 213px;
	}

 }
 .carttwo{
 	margin-top:15px;
 	padding-bottom: 10px;
 	background: #fff;
 	
 }
 .cartCol{
	padding-bottom:10px;
	padding-top: 15px;
	height: 213px;
	border: 1px solid #eee;
	border-bottom: none;
	.ivu-checkbox-wrapper{
		width:16px;
		overflow:hidden;
		height: 16px;
		line-height: 16px;
	}
	.paddingLeft{
		padding-left: 20px;
	}
 	img{
 		max-width: 100%;
 	}
 }
 .address li{
 	display: flex;
 	background:#fff;
 	padding:10px;
 	font-size: 1.2em;
 	cursor: pointer;
 }
  .address p{
  	flex:1;
  	strong{
  		display: block;
  		font-size: 1.125em;
  		color:#222
  	}
  }
  .cart_gray span{
  	float: right;
	   strong{ 
	  	color:$color-dx;
	  	font-size: 16px;
	  }
  }
   		.cartfoot{
			    background: #fff;
				height: 49px;
				line-height:49px;
				width: 100%;
				padding-left:10px;
				border:1px solid #eee;
				.ivu-row{
					.cartCol{
						height: 50px;
						line-height: 50px;
						background: #fff;
						padding-top:0px;
						border-bottom:1px solid #eee;
						margin-top: 20px;
					}
				}
				strong{
					color:$color-dx;
					font-size: 12px;
					display:inline-block;
					span{
						font-size: 1.125rem;
					}
				}
				button{
					float: right;
					height: 100%;
					background: #333;
					color:#fff;
					border:0 none;
					padding-left: 15px;
					padding-right: 15px;
					cursor: pointer;
				}
		}
		.carthead{
			   margin-bottom:20px;
			   border-bottom: 1px solid #eee;
			p{
				padding-left: 20px;
			}
			.ivu-row{
				.ivu-col{
					height: 51px;
					line-height: 50px;
					padding-top:0px;
					border-bottom:1px solid #eee;
					padding-bottom: 0px;
					background: #fff;
				}
			}
		}
		.chooseAddress{
			.zeroAddress{
				background: #fff;
				color:#fff;
				padding:10px
			}
		}
		/*地址样式-s*/

.address-box .checked .adr-inner {
    border: 2px solid #333;
    padding: 19px;
    color: #333;
    z-index: 1;
}
.address-box .adr-add {
    text-align: center;
}
.address-wrap {
    margin-top: 40px;
}
.wrap-header h3 {
    font-size: 24px;
    line-height: 24px;
    font-weight: 400;
    color: #333;
    margin-right: 15px;
}
.wrap-header .small-text {
    font-size: 12px;
    color: #999;
}
.address-box {
    margin-top: 20px;
}
.address-box .adr {
    float: left;
    margin-top: -1px;
    margin-left: -1px;
    background-color: #fff;
    cursor:pointer;
}
.address-box .adr-inner:hover {
    background-color: #fafafa;
}

.address-box .adr-inner {
    position: relative;
    width: 256.25px;
    height: 117px;
    padding: 20px;
    border: 1px solid #e9e9e9;
    color: #999;
}
.address-box .adr-body {
    margin-top: 10px;
}
.address-box .adr-inner .icon_checked {
    position: absolute;
    top: -2px;
    right: -2px;
    display: none;
}
.address-box .adr-head {
    font-size: 0;
}
.address-box .adr-head span {
    font-size: 14px;
    line-height: 14px;
}
.address-box .adr-head .adr-name {
    margin-left: 12px;
}
.address-box .adr-body .adr-detail {
    margin-right: 8px;
}
.address-box .adr-foot {
    display: none;
    position: absolute;
    bottom: 10px;
    left: 20px;
}
.address-box .checked .icon_checked {
    display: inline-block;
}
.address-box .adr-inner:hover  .adr-foot {
    display: block;
}
.address-box .adr-add .adr-add-icon {
    margin-top: 8px;
    font-size: 18px;
}
.confirm-order-box .coupon-wrap .exchange-code .item-box-txt {
    width: 438px;
    margin-right: 20px;
    float: left;
}
.item-box-txt {
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    font-size: 12px;
    height: 22px;
    line-height: 22px;
    padding: 0 10px;
}
.exchange-code-inner{
	background: #fff;
	padding: 10px ;
}
 .item-box-btn-save {
    width: 64px;
    height: 22px;
    line-height: 22px;
    border: 1px solid #333;
    border-radius: 2px;
    background: #333;
    text-align: center;
    color: #fff;
    cursor: pointer;
    display: inline-block;
}
.color-coupon{
	color:red
}
.wrap-header{
	margin-top:30px;
}
.promotion{
	padding-left:20px;
	color:red
}
/*地址样式-e*/
</style>
<style>
	
.P_received {
    margin: 0px 0 60px 0;
    font-size: 14px;
}
.P_received .P_rTit {
    color: #333;
    line-height: 36px;
    font-size: 16px;
}
.fl {
    float: left;
}

</style>
