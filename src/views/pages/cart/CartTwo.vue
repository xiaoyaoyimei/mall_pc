<template>
    <div class='main-wdith'>
     <div class="wrap-header">
        <h3>选择收货地址</h3>
        <span class="small-text js_address_tips">地址切换可能导致价格和库存变动，请仔细确认</span>
    </div>
    <div class="address-box clearfix" >
        <div class="adr js_adr_check"  :class="{checked: index == selectItem}"  v-for="(addritem,index) in addressList" :key="index" >
            <div class="adr-inner">
            	<div @click="chooseAddr(addritem.id,index)">
                <i class="icon icon_checked"></i>
                <div class="adr-head" >
                    <span class="adr-province">{{addritem.receiveProvince}}</span>
                    <span class="adr-city">{{addritem.receiveCity}}</span>
                    <span class="adr-name">{{addritem.person}}</span>
                </div>
                <div class="adr-body" title="addritem.address">
                    <p class="adr-text">
                        <span class="adr-detail">{{addritem.address}}</span>
                    </p>
                      <span v-if="addritem.isDefault=='Y'" class="color-blue">(默认)</span>
                </div>
                  </div>
                <div class="adr-foot">
                    <a href="javascript:void(0);" @click="editmodal(addritem)">编辑</a>
                    <a href="javascript:void(0);"  @click="handleDelete(addritem.id)">删除</a>
                </div>
             
            </div>
        </div>
        <div class="adr js_adr_add" ms-hover="'hover'" @click="modaladdr=true">
            <div class="adr-inner">
                <div class="adr-add">
                    <p class="adr-add-icon"><i class="icon icon_add_address"></i></p>
                    <p class="adr-add-text">添加地址</p>
                </div>
            </div>
        </div>
    </div>
                <Modal v-model="modaladdr" title="新增收货地址" @on-ok="ok" :loading="loading">
				<Form :model="addForm" ref="addForm" label-position="left" :label-width="110" :rules="ruleValidate" style="padding: 15px;"> 
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
				   <Modal ref='modaleditaddr' v-model="modaleditaddr" title="编辑收货地址" @on-ok="editaddr" :loading="loading"  >
					  	<Form :model="editForm" ref="editForm" label-position="left" :label-width="110" :rules="ruleValidate" style="padding: 15px;" > 
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
            <table class="order-tb cart2">
				<thead>
						<tr>
							<th>主图</th>
							<th>商品信息</th>
							<th>单价(元)</th>
							<th>数量</th>
							<th>小计(元)</th>
						</tr>
				</thead>
						<tbody>
							<tr   span="24" v-for="(x,index) in cartList" :key="index" > 
										<td><img  :src="imageSrc+x.image"></td>
										<td>
											<p class="title_name">{{x.productName}}</p>
											<p class="title_attr">{{x.productAttr}}</p>
											<label class="color-blue" v-if="x.promotionTitle !=null">{{x.promotionTitle}}</label>
										</td>
										<td>
										<p class="cart_price">￥{{x.salePrice |pricefilter}}
											<span v-if="x.promotionTitle ==null&&xscoupon" >
									       	 	￥{{couponprice(x.salePrice) |pricefilter }}
									      </span></p>
							                 </td>
									<td>
										<p>{{x.quantity}}</p>
										<p v-if="x.promotionTitle ==null&&xscoupon">{{x.quantity}}</p>
									</td>
									<td>
										<p class="cart_price">￥{{x.salePrice|pricefilter}} 
											<span v-if="x.promotionTitle ==null&&xscoupon" >
									       	 	￥{{couponprice(x.salePrice) |pricefilter}}
									       	 </span></p>
									</td>
								</tr>
						</tbody>
			</table>
			   <div class="wrap-header" v-show="couponshow">
				        <h3>优惠信息</h3>
				        <div class="coupon-wrap"> <input type="text"  placeholder="请输入优惠券" v-model.trim="couponCode">
                         <span @click='usecoupon'>确认</span>
                        </div>
				    	</div>
				    	<div class="cart2_price">
         <div  class="price_wrap">	
         	<dl class="cf-wrap">
         	<dt>商品数量:</dt><dd>{{total.num}}</dd><dt>金额总计:</dt><dd>￥{{total.price|pricefilter}}</dd>
         	<dt>活动优惠:</dt><dd></dd><dt>应付总额:</dt><dd >￥<span class="font-24">{{total.price|pricefilter}}</span></dd></dl>
           <button  @click="confirm"  type="button" class="btn_pay"> 
				确认订单
			</button>
			</div>
    	</div>
    	</div>
</template>
<script>
       export default {
       	
        data () {
        		 const validatePhone = (rule, value, callback) => {
	      	 	if(value.length<0){
	      	 		 callback(new Error('手机号不能为空'));
	      	 	}
	          else if (!validatePHONE(value)) {
	            callback(new Error('请输入正确的手机号'));
	          } else {
	            callback();
	          }
        	};
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
	                        { required: true, validator: validatePhone ,trigger: 'blur' },
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
				},
				total:{
					price:0,
					num:0
				},
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
					    _this.total.price +=item.salePrice*item.quantity;
					     _this.total.num+=item.quantity;
				   });
        		}
        		//使用优惠券
        		else{
		        		this.cartList.forEach(function(item,index) {
							     _this.total.num+=item.quantity;
						   });
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
						//						  订单提交以后清空列表
						sessionStorage.removeItem("cart")
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
<style lang="scss" scoped="scoped">
 .clearfix:after {content: "."; display: block; height:0; clear:both; visibility: hidden;}
.clearfix { *zoom:1; }
		/*地址样式-s*/
.address-box .checked .adr-inner {
    border: 2px solid #0099ff;
    padding: 19px;
    color: #333;
    z-index: 1;
}
.address-box .adr-add {
    text-align: center;
}
.wrap-header {
	margin-top:40px
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
    width: 25%;
}
.address-box .adr-inner:hover {
    background-color: #fafafa;
}
.icon_checked {
	    background-position: -5px -71px;
    width: 18px;
    height: 18px;
    position: absolute;
    top: -2px;
    right: -2px;
    display: none;
}
.checked .icon_checked{
	display: block;
}
.address-box .adr-inner {
    position: relative;
    height: 125px;
    padding: 20px 15px 15px 20px;
    border: 1px solid #e9e9e9;
    color: #999;
}
.address-box .adr-body {
    margin-top: 10px;
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
    bottom: 7px;
    left: 20px;
}
.address-box:hover .adr-foot{
	display: inline-block;
}
.adr-foot a{
	margin-right: 10px;
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
.color-coupon{
	color:red
}
.wrap-header{
	margin-top:30px;
}
.promotion{
	color:red
}

/*地址样式-e*/
/*table cart2样式*/
.order-tb{
	margin-top: 20px;
}.cart2{
	width: 100%;
}
.cart2 img{
	max-width: 100px;
}
.title_name,.title_attr{
	text-align: left;
}
.title_name{
	font-weight: bold;
}
.cart_price{
	font-size: 16px;
}
.coupon-wrap{
	margin-top:20px;
}
.coupon-wrap input{
	width:200px;
	height: 40px;
	line-height:40px;
	border:1px solid #0099ff;
	text-align: center;
}
.coupon-wrap span{
	cursor: pointer;
	color:#0099ff;
}
.icon_add_address{
	background-position:-3px -94px ;
	width:45px;
	height: 45px;
}
.color-45{
	color: #454545;
}
</style>
