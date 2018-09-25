<template>
	<div>
	<div class="nav Nav">
			<div class="main-width clearfix">
				<router-link  to="/index" class="logo fl navcart"><img    src="../../../assets/img/logo-red.png"></router-link>
                <a href="" class="fl mycart">确认订单</a>
                <ul class="navCart">
                    <li><a href=""><p class="cartIcon iconIcon-successorder"></p><p>成功提交订单</p></a></li>
                    <li><a class="red" href=""><p class="cartIcon iconIcon-order-red"></p><p>填写核对订单</p></a></li>
                    <li><a class="" href=""><p class="cartIcon iconIcon-cart"></p><p>我的购物车</p></a></li>
                </ul>
			</div>
		</div>
		<div class="placeorder">
            <div class="placeorderlist">
                <div class="placeorderaddress">
                    <h5>收货地址</h5>
                    <ul class="clearfix">
                        <li :class="{default: index == selectItem}"  v-for="(addritem,index) in addressList" :key="index"  @click="chooseAddr(addritem.id,index)">
                            	<h6 class="name">{{addritem.person}}</h6>
                            <p class="phone">
                            	{{addritem.phone}}
                            </p>
                            <div class="address">{{addritem.receiveProvince}}{{addritem.receiveCity}}{{addritem.receiveDistrict}}{{addritem.address}}</div>
                            <button class="addressedit" @click="editmodal(addritem)">修改</button>
                        </li>
                        <li>
                            <div class="addaddress" @click="modaladdr=true">
                                <div>+</div>
                                <p>添加新地址</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="placeorderTable">
                    <div class="placeorderTitle clearfix">
                        <h5>商品及优惠卷</h5>
                       <router-link  to="/cart" >返回购物车 &gt;</router-link>
                    </div>
                    <table class="placeorderBody">
                        <tbody><tr v-for="(x,index) in cartList" :key="index" >
                            <td width="400">
                                <img :src="imageSrc+x.image" alt=""><span class="placeorderspan">{{x.productName}}</span>
                            </td>
                           <td width="150">	￥{{x.salePrice|pricefilter }}  x {{x.quantity}} </td><!--<p v-if="x.promotionTitle ==null&&xscoupon" >￥{{x.salePrice|pricefilter }}  x {{x.quantity}}</p>
											<p v-else>￥{{x.salePrice |pricefilter}} x {{x.quantity}}</p></td>-->
                            <td width="400" ><span v-if="x.promotionTitle !=null">{{x.promotionTitle}}</span>	</td>
                            <td width="150">	<p v-if="x.promotionTitle ==null&&xscoupon"   class="cart_price">￥{{x.salePrice|pricefilter}}</p>
											<p v-else>￥{{itemtotal(x.salePrice,x.quantity)|pricefilter}} </p></td>
                        </tr>
                    </tbody></table>
                    <div class="placeorderActivity clearfix">
                        <div class="shipping">参与活动</div>
                        <div class="information">
                            <div class="placeorderInformation">
                                使用优惠码 
                              <div v-for="(item,index) in inputlist" class="inlineBlock"> <input  class="input" type="text" ref="couponitem" onKeyUp="if(this.value.length>4){this.value=this.value.substr(0,4)}">-</div> 
                                <button class="btn"  @click='usecoupon'>确定</button>
                                <span class="cost">-￥{{(origintotal.price -total.price)|pricefilter}}</span>
                            </div>
                        </div>
                        
                    </div>
                    <div class="placeorderSend">
                        <span class="shipping">配送方式</span>
                        <span class="information"><span class="doubt">?</span>了解运费信息</span>
                        <span class="cost">快递费用 ￥100</span>
                    </div>
                    <div class="placeorderzhubei clearfix">
                        <span class="span">备注留言</span>
                        <textarea v-model.trim="beizhu"  cols="70" rows="2"></textarea>
                        <div class="placeorderTotal">
                            <p class="heji"><span class="num">商品件数：</span><span class="red">{{total.num}} 件</span></p>
                            <p class="heji"><span class="num">商品总价：</span><span class="red">￥{{origintotal.price|pricefilter}}</span></p>
                            <p class="heji"><span class="num">活动优惠：</span><span class="red">-￥{{(origintotal.price -total.price)|pricefilter}}</span></p>
                            <p class="heji"><span class="num">运费： </span><span class="red">100 元</span></p>
                            <div class="heji totalPrice"><span class="num">应付总额：</span><span class="red"><strong>￥{{total.price|pricefilter}}</strong> </span></div>
                            <div class="heji gopay" @click="confirm">去结算</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <Modal v-model="modaladdr" title="新增收货地址" @on-ok="ok" :loading="loading" style="width:600px;">
            <Form :model="addForm" ref="addForm" label-position="left"  :rules="ruleValidate" style="padding: 15px;"> 
                <FormItem label="" prop="person" class="mdalText">
                    <Input v-model="addForm.person"  placeholder="收货人" autocomplete="off"></Input>
                </FormItem>
                <FormItem label="" prop="phone" class="mdalTextphone">
                    <Input v-model="addForm.phone"  placeholder="联系电话" autocomplete="off"></Input>
                </FormItem>
                <FormItem label=""  prop="selectedOptionsAddr">
                    <Cascader  v-model="addForm.selectedOptionsAddr" :data="addressOption"></Cascader>
                </FormItem>
                <FormItem label="" prop="address" class="modaladdress modaladdressaddr">
                    <Input v-model="addForm.address" placeholder="详细地址"></Input>
                </FormItem>
            </Form>
		</Modal>
        <Modal ref='modaleditaddr' v-model="modaleditaddr" title="编辑收货地址" @on-ok="editaddr" style="width:600px;" :loading="loading"  >
            <Form :model="editForm" ref="editForm" label-position="left"  :rules="ruleValidate" style="padding: 15px;" > 
                <FormItem label="" prop="person" class="mdalText">
                    <Input v-model="editForm.person" placeholder="收货人"></Input>
                </FormItem>
                <FormItem label="" prop="phone" class="mdalTextphone">
                    <Input v-model="editForm.phone" placeholder="联系电话"></Input>
                </FormItem>
                <FormItem label=""  prop="selectedOptionsAddr">
                        <Cascader  v-model="editForm.selectedOptionsAddr" :data="addressOption"></Cascader>
                </FormItem>
                    <FormItem label="" prop="address" class="modaladdress modaladdressaddr">
                    <Input v-model="editForm.address" placeholder="详细地址"></Input>
                </FormItem>
            </Form>
        </Modal>
        </div>
</template>
<script>
	import Bus from '@/assets/js/bus.js'
	 import { validatePHONE } from '@/assets/js/validate';
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
            	 inputlist:[1,2,3,4],
            	beizhu:'',
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
	                    ],
	                     selectedOptionsAddr: [
                        { required: true, type: 'array',message: '请选择省市区', trigger: 'change' }
                   		 ],
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
				//商品原总价
				origintotal:{
					price:0,
				},
				//使用优惠券以后的总价
				total:{
					price:0,
					num:0
				},
            }
        },
        methods: {
        		itemtotal(p,n){
					return Number(p)*n;
				},
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
        			_this.total.num=0;
        			  this.cartList.forEach(function(item,index) {
					    _this.origintotal.price +=item.salePrice*item.quantity;
					     _this.total.price+=item.salePrice*item.quantity;
					     _this.total.num+=item.quantity;
				   });
        		}
        		//使用优惠券
        		else{
        			_this.total.num=0;
		        		this.cartList.forEach(function(item,index) {
							     _this.total.num+=item.quantity;
						   });
        		  let couponmethod=value;
	        		  if(couponmethod.availableSku==""&&couponmethod.availableCatalog==""){
	        		      _this.total.price=0;
		        	      if(couponmethod.couponMode=='rate'){
		        		  	    this.cartList.forEach(function(item,index) {
		        		  	    	if(item.promotionTitle!=''&&item.promotionTitle!=null&&item.promotionTitle!=undefined){
		        		  	    		_this.total.price +=item.salePrice*item.quantity;
		        		  	    	}else{
		        		  	    		item.salePrice=item.salePrice*(1-couponmethod.modeValue);
		        		  	    		_this.total.price +=item.salePrice*item.quantity;
		        		  	    	}
						   });
		        		  }else{
		        		  	    this.cartList.forEach(function(item,index) {
		        		  	    	if(item.promotionTitle!=''&&item.promotionTitle!=null&&item.promotionTitle!=undefined){
		        		  	    		_this.total.price +=item.salePrice*item.quantity;
		        		  	    	}else{
		        		  	    		item.salePrice=item.salePrice-couponmethod.modeValue;
		        		  	    		_this.total.price +=item.salePrice*item.quantity;
		        		  	    	}
						   });
		        		  }
	        		  }else if(couponmethod.availableSku!=""){
	        		  	  _this.total.price=0;
		        	      if(couponmethod.couponMode=='rate'){
		        		  	    this.cartList.forEach(function(item,index) {
		        		  	    	if(item.id==couponmethod.availableSku){
		        		  	    		item.salePrice=item.salePrice*(1-couponmethod.modeValue);
		        		  	    		_this.total.price+=item.salePrice*item.quantity
		        		  	    	}else{
		        		  	    		_this.total.price +=item.salePrice*item.quantity;
		        		  	    	}
						   		});
		        		  }else{
		        		  	    this.cartList.forEach(function(item,index) {
		        		  	    	if(item.id==couponmethod.availableSku){
		        		  	    		item.salePrice=item.salePrice-couponmethod.modeValue
		        		  	    		_this.total.price +=item.salePrice*item.quantity
		        		  	    	}else{
		        		  	    		_this.total.price +=item.salePrice*item.quantity;
		        		  	    	}
		        		  	    	
						   });
	        		  	}
	        		  }else{
	        		  	 _this.total.price=0;
		        	      if(couponmethod.couponMode=='rate'){
		        		  	    this.cartList.forEach(function(item,index) {
		        		  	    	if(item.productType==couponmethod.availableCatalog){
		        		  	    		item.salePrice=item.salePrice*(1-couponmethod.modeValue);
		        		  	    		_this.total.price +=item.salePrice*item.quantity
		        		  	    	}else{
		        		  	    		_this.total.price+=item.salePrice*item.quantity;
		        		  	    	}
						   		});
		        		  }else{
		        		  	    this.cartList.forEach(function(item,index) {
		        		  	    	if(item.productType==couponmethod.availableCatalog){
		        		  	    		item.salePrice=item.salePrice-couponmethod.modeValue;
		        		  	    		_this.total.price +=item.salePrice*item.quantity
		        		  	    	}else{
		        		  	    		_this.total.price +=item.salePrice*item.quantity;
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
	                    couponCode:this.couponCode,
	                    remark:this.beizhu
	          	};
    	   	  	this.$axios({
				    method: 'post',
				    url:'/order/shopping/confirm',
				    data:para
				}).then((res)=>{
					if(res.code=='200'){
						
						//						  订单提交以后清空列表
						sessionStorage.removeItem("cart")
						   Bus.$emit('cartmsg', "again");
						 this.$router.push({name:'/cartthree',query: { orderNo: res.object.orderAddress.orderNo}});  
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
           	this.xscoupon=false;
           	let _this=this;
           	this.$refs['couponitem'].forEach(function(item,index) {
           		_this.couponCode+=(item.value).replace(/(^\s*)|(\s*$)/g, "");
           		
           	})
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
          addnewdizhi(){
          	this.$refs['placeorderModal'].classList.remove("none")
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
.none {
    display: none;
}
 .placeorder{
    width: 100%;
    background-color: #F2F2F2;
    padding: 70px 0px;
}
.placeorderlist{
    margin: 0px auto;
    width: 1200px;
    background-color: #fff;
    padding-top: 83px;
    padding-left: 40px;
}
.placeorderaddress h5{
    font-size: 18px;
    width: 73px;
    height: 24px;
    font-weight: 300;
    margin-bottom: 20px;
}
.placeorderaddress .default{
    border: 1px solid #FF0000;
}
.placeorderaddress li{
    float: left;
    width: 250px;
    margin-right: 15px;
    border: 1px solid #999999;
    height:210px;
    position: relative;
    margin-bottom: 25px;
    cursor: pointer;
}
.placeorderaddress li .name{
    font-size: 18px;
    padding-top: 35px;
    padding-left: 25px;
    font-weight: 300;
}
.placeorderaddress li .phone{
    padding-top: 20px;
    padding-left: 25px;
}
.placeorderaddress .address{
    padding-left: 25px;
    overflow: hidden;
    max-height: 55px;
}
.placeorderaddress .addressedit{
    position: absolute;
    bottom: 5px;
    right: 0px;
    width: 50px;
    border: none;
    background-color: #fff;
    color: #ff0000;
}
.placeorderaddress .addaddress{
    width: 60%;
    margin: 80px auto;
    cursor: pointer;
}
.placeorderTable .placeorderspan{
    position: relative;
    top: 15px;
    display: inline-block;
    height: 40px;
    width: 300px;
    overflow: hidden;
}
.placeorderaddress .addaddress div {
    background-color:#c6c6c6;
    width: 33px;
    height: 33px;
    margin: 0 auto;
    border-radius: 50%;
    text-align: center;
    line-height: 28px;
    font-weight: 700;
    font-style: normal;
    font-size: 30px;
    color: #FFFFFF;
}
.placeorderaddress .addaddress p{
    font-weight: 400;
    font-size: 18px;
    color: #999999;
    text-align: center;
}
.placeorderlist .placeorderTable{
    margin-top: 30px;
    width: 100%;
    padding-right: 25px;
}
.placeorderTitle h5{
    float: left;
    font-weight: 400;
    font-size:18px;
    color: #333333;
    padding-left: 10px;
}
.placeorderTitle a{
    float: right;
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    color: #999999;
    text-align: right;
    width: 150px;
    height: 20px;
    background-color: #fff;
    border: none;
    padding-right: 35px;
    margin: 5px 0 5px;
}
.placeorderBody{
    border-top: 1px solid #c6c6c6;
    border-bottom:1px solid #c6c6c6;
    padding:20px 0px 30px;
}

.placeorderBody img{
    margin-right: 10px;
    height: 50px;
    margin-top:7px;
    margin-bottom: 8px; 
} 
.placeorderBody td{
    text-align: center;
    font-size: 14px;
    font-weight: 400px;
    overflow: hidden;
    color: #333333;
}
.placeorderBody tr td:nth-of-type(1){
    text-align: left;
    padding-left: 10px;
}
.placeorderBody tr td:nth-last-of-type(1){
    text-align: right;
    padding-right: 10px;
    color: #ff0000;
}
.placeorderBody .red{
    padding: 5px 10px ;
    border: 1px solid #FF0000;
    color: #FF0000;
}
.placeorderActivity{
    border-bottom: 1px solid #c6c6c6;
    padding: 30px 0 50px;
    width: 1100px;
}
.placeorderActivity .shipping{
    float: left;
    width: 200px;
    font-size: 18px;
    text-align: left;
    font-weight: 400;
    padding-left: 10px;
    color: #333333;
}
.placeorderActivity .placeorderInformation{
    font-size: 14px;
    font-weight: 400;
    font-weight: 400;
    color: #FF0000;
}
.placeorderInformation .btn{
    width: 50px;
    height: 30px;
    font-weight: 400;
    font-size: 14px;
    background-color: #FFFFFF;
    border: 1px solid rgba(255, 0, 0, 1);
    color: #FF0000;
}
.placeorderActivity .input{
    width: 93px;
    height: 31px;
    font-size: 14px;
    font-weight: 400;
    font-weight: 400;
    color: #FF0000;
    margin:0 10px;
    border: 1px solid #c6c6c6;
    text-align: center;
   
}
.placeorderActivity .information{
    float: left;
    width: 900px;
} 
.placeorderActivity .cost{
    float: right;
    width: 200px;
    text-align: right;
    font-weight: 400;
    font-size: 14px;
    color: #FF0000;
}
.placeorderSend{
    height: 85px;
    line-height: 85px;
}
.placeorderSend .shipping{
    font-size: 18px;
    font-weight: 400;
    color: #333333;
    display: inline-block;
    width: 200px;
    padding-left: 10px;
}
.placeorderSend .information{
    font-weight: 400;
    font-size: 14px;
    color: #999999;
    cursor: pointer;
}
.placeorderSend .cost{
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    color: #FF0000;
    float: right;
    padding-right: 35px;
}
.placeorderModal .modal{
    margin: 150px auto;
    width: 600px;
    background-color: #FFFFFF;
}
.placeorderModal .modalTitle{
    height:60px;
    line-height: 60px;
    width: 100%;
    background-color: #F2F2F2;
}

.ivu-modal-close .ivu-icon-ios-close-empty{
    color: #000000;
    padding-right: 25px;
    font-size: 18px;
    font-weight: 900;
    cursor: pointer;
}
.placeorderModal span{
    float: right;
    color: #000000;
    padding-right: 25px;
    font-size: 18px;
    font-weight: 900;
    cursor: pointer;
}
.placeorderModal .modalBody{
    padding: 15px 25px 45px;
}
 .mdalText{
    display: inline-block;
    width: 260px;
    margin-right: 10px;
    height: 45px;
    line-height: 45px;   
}
.mdalTextphone{
    display: inline-block;
    width: 260px;
    height: 45px;
    line-height: 45px;  
}
 .modaladdress{
    height: 45px;
    line-height: 45px;
    width: 535px;
    margin-top: 15px;
}
  .modaladdressaddr{
    height: 90px;
    line-height: 90px;
}
 .modalFoot{
    height: 90px;
    background-color: #F2F2F2;
    padding: 0px 25px;
    width: 100%;
    text-align: center;
}
//  button{
//     margin-top: 20px;
//     margin-right: 15px;
//     padding: 10px 50px;
//     color: #FFFFFF;
//     border: none;
    
// }
 .sure{
    background-color: #ff0000;
}
 .cancel{
    background-color: #888888;
}
#placeorderModal{
    position: fixed;
    left: calc(50% - 300px);
    top: 250px;
    width: 600px;
    height: 420px;
    background-color: #888888;
    opacity: 1;
}
.placeorderModal{
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    bottom: 0px;
    left: 0px;
    opacity: 0.8;
    background-color: #888888;
    z-index: 10;
    padding: 100px;
}
.doubt {
    padding: 0px 6px;
    color: #fff;
    height: 21px;
    border-radius: 50%;
    background-color: #d6d6d6;
    margin-right: 5px;
}
.placeorderinvoice{
    height: 90px;
    width: 1110px;
    border-top: 1px solid #c6c6c6;
    border-bottom: 1px solid #c6c6c6;
    line-height: 90px;
    font-size: 14px;
    color: #333333;
}
.placeorderinvoice .invoice{
    font-size: 18px;
    font-weight: 400;
    color: #333333;
    display: inline-block;
    padding-left: 10px;
    width: 200px;
}
.placeorderinvoice .invoiceinformation{
    display: inline-block;
    width: 748px;
    height: 90px;
}
.placeorderinvoice .text{
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    width: 282px;
    margin-right: 30px;
    border: #cccccc 1px solid
}
.placeorderinvoice .information{
    color: #888888;
}
.placeorderzhubei{
    padding-top: 25px;
    width: 1100px;
    padding-bottom: 45px;
}
.placeorderzhubei .span{
    font-size: 18px;
    font-weight: 400;
    color: #333333;
    display: inline-block;
    width: 200px;
    padding-left: 10px;
}
.placeorderzhubei textarea{
    vertical-align: top;
    border: #cccccc 1px solid;
    padding-left: 15px;
    line-height: 30px;
}
.placeorderTotal{
    float: right;
    width: 400px;
    margin-top: 30px;
}
.placeorderTotal .heji{
    width: 260px;
    float: right;
}
.placeorderTotal .num{
    float: left;
    width: 120px;
    font-weight: 400;
    font-size: 14px;
    text-align: right;
}
.placeorderTotal .red{
    float: right;
    width: 140px;
    text-align: right;
    padding-right: 10px;
    color: #FF0000;
    font-weight: 400;
    font-size: 14px;
    text-align: right;
}
.placeorderTotal .totalPrice{
    margin-top: 30px;
}
.placeorderTotal .red strong{
    font-size: 30px;
    line-height: 50px;
}
.placeorderTotal .totalPrice .num{
    padding-top: 20px;
}
.placeorderTotal .gopay{
    margin-top: 15px;
    text-align: center;
    width: 200px;
    font-weight: 400;
    font-style: normal;
    font-size: 18px;
    color: #FFFFFF;
    background-color: #ff0000;
    height: 50px;
    margin-right: 10px;
    line-height: 50px;
    cursor: pointer;
}
.inlineBlock{
	display: inline-block;
}
</style>
<style>
.ivu-modal-header-inner{
    font-size: 18px;
    font-weight: 400;
    color: #000000;
    padding-left: 25px;
    height:60px;
    line-height: 60px;

}
.ivu-modal-close .ivu-icon-ios-close-empty{
    color: #000000;
    font-weight: 900;
}
.ivu-modal-header {
    height:60px;
    line-height: 60px;
    width: 100%;
    background-color: #F2F2F2;
    padding: 0px;
}
.ivu-input{
    height: 45px;
    line-height: 45px;
    border: 1px solid #cccccc;
    border-radius: 0px;
}
.modaladdressaddr .ivu-input{
    height: 90px;
    line-height: 90px;
    border-radius: 0px;
}
.ivu-modal{
    width: 600px!important;
}
.ivu-modal-footer{
    height: 90px;
    background-color: #F2F2F2;
    padding: 0px 25px;
    width: 100%;
    text-align: center;
}
.ivu-btn-text{
    margin-top: 20px;
    margin-right: 15px;
    padding: 10px 50px;
    color: #FFFFFF;
    border: none;
    background-color: #888888;
    border-radius: 0px;
}
.ivu-btn-primary{
    background-color: #ff0000;
    margin-top: 20px;
    margin-right: 15px;
    padding: 10px 50px;
    color: #FFFFFF;
    border: none;
    border-radius: 0px;
}
</style>

