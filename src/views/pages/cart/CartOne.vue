<template>
	<div class='cart1 cartpage'>
		<div class="cart_top">
        <div class="cart_top_inner">
            <h2 class="cart_title">
             		   购物车
             		  </h2>
         </div>
        </div>
		<div v-if="cartList.length>0" class="cart_body">
		<div class='carthead'>
			<Row>
				<Col  class='cartCol' span="24">
					<Col  span="2" class="center">
					<Checkbox :indeterminate="indeterminate"  :value="checkAll"   @click.prevent.native="handleCheckAll">全选</Checkbox>
					</Col>
					<Col span="3" >主图</Col>
					<Col span="7">商品信息</Col>
					<Col span="3">规格</Col>
					<Col span="2">
						单价（元）
					</Col>
					<Col span="3">
						数量
					</Col>
					<Col  span="2">
						小计（元）
					</Col>
					<Col  span="2">
						操作
					</Col>
				</Col>
			</Row>
		</div>
		<Row>
		    <Checkbox-group v-model="checkAllGroup" @on-change="checkAllGroupChange" class="item_detail clearfix">
		 		<Col  class='cartCol' span="24" v-for="(x,index) in cartList" :key="index"> 
        			<Col class='cartcheckbok' span="2">
        					<Checkbox  :label="index" :key="index"></Checkbox>
        			</Col>
					<Col span="3" class="cart_img"><img  :src="x.image |imgfilter"></Col>
					<Col span="7" class='cart_product'>
						<p >{{x.productName}}</p>
					</Col>
					<Col span="3" class='cart_sku'><p>{{x.productAttr}}</p></Col>
					<Col span="2" class='cart_price'>
						<p >￥{{x.salePrice |pricefilter}}</p>
					</Col>
					<Col span="3"  class='cart_num'>
						<p class='cart_qua'>
							<div class="min-add">
						    <i  @click="jian(x,index)" class="min"  >-</i>
						     <input class="text-box" name="pricenum"  type="tel" v-model="x.quantity*1" v-on:input="changeNumber($event,x,index)" placeholder="数量" data-max="50" />
						  <i  @click="jia(x,index)" class="add">+</i>
						</div>
					</Col>
					<Col span="2">
						<p class='cart_price'>￥{{itemtotal(x.salePrice,x.quantity)|pricefilter}}</p>
					</Col>
					<Col span="1">
						<span class="operation_delete" @click="remove(x.id)">删除</span>
					</Col>
				</Col>
			</Checkbox-group>
		</Row>
			<div class='cart_bottom_wrap'>
				<div class="cart_bottom">
					<div class="cart_sum_left">
						<div   class="cart_sum_choose">
							<Checkbox :indeterminate="indeterminate"  :value="checkAll"   @click.prevent.native="handleCheckAll">全选</Checkbox>
						</div>
						<div class="cart_sum_delete" @click="removeall()">删除</div>
						</div>
						<div class="cart_sum_right">
						<div  class="cart_sum_price">
							<div class="cart_sum_num">已选商品<span class="color_f60">{{zslcount}}</span>款</div>
							<div class='total_price'>
                                                                                     合计：<span class="total_price_inner">
                            <span class="js_total_price">
                                                                                   ￥{{totalPrice |pricefilter}}                        
                            </span>
                        </span>
                        </div>
                        </div>
						<div class='cart_sum_to_order' @click="paymoney"> 
							去结算
						</div>
						</div>
				</div>
			</div>
			</div>
				<div class="cart_empty flex-center main-wdith"  v-else>
			 <img src="../../../assets/img/cartempty.png">
			 <div>购物车是空的</div>
			<router-link to="/index"  >去首页</router-link>
		</div>
	</div>
</template>

<script>
export default {
        data () {
            return {
                indeterminate: true,
                checkAll: false,
				checkAllGroup: [],
				totalPrice:0,
				cartList:[],
				editface:true,
				zslcount:0,
				temp:[],
            }
		},
        methods: {
				itemtotal(p,n){
					return Number(p)*n;
				},
        	 addcart(x){
              		this.$axios({
							    method: 'post',
							    url:'/order/shopping/add',
							    data:{
							    	productItemId:x.id,
							    	quantity:x.quantity
							   	 }
								}).then((res)=>{
									if(res.code=='200'){
										this.getCartList();
									}else{
										 this.$Message.warning(res.object);
									}
							});
              },
        	changeNumber: function(event,x,index){
					var obj=event.target;
					x.quantity = parseInt(obj.value);
					 if(this.temp.indexOf(index)<0){
					     		this.temp.push(index)
					     	}
					        this.checkAllGroup=this.temp;
							this.checkAllGroupChange(this.temp);
							this.addcart(x)
					},
					//添加
					jia:function(x,index){
						if(x.quantity>=x.max){
						x.quantity=x.max
						}else{
						x.quantity=parseInt(x.quantity)+1; 
							 if(this.temp.indexOf(index)<0){
					     		this.temp.push(index)
					     	}
					        this.checkAllGroup=this.temp;
							this.checkAllGroupChange(this.temp);
						  }
						this.addcart(x)
					},
					
					//减
					jian:function(x,index){
                           //删除的时候库存最小为1。所以无需删去选中的index
//						   if(this.temp.indexOf(index)>0){
//					     	this.temp.splice(index,1)
//						  }
						if(x.quantity==1){
						x.quantity==1
						}else{
						x.quantity=parseInt(x.quantity)-1; 
				 		this.checkAllGroup=this.temp;
						this.checkAllGroupChange(this.temp);
						this.addcart(x)
						}
					},
        	getCartList(){
        		if(localStorage.getItem('token')!=undefined){
        			this.nologin=false;
        			this.cartList=[],
        			this.$axios({
							    method: 'post',
							    url:'/order/shopping/list',
								}).then((res)=>{
									if(res.code=='200'){
										this.cartList=res.object;
									}
							});
					}
        	},
			paymoney(){
				if(this.checkAllGroup.length<1){
					 this.$Message.warning('您尚未选择任何商品');
					return false;
				}
				var goumai=[];
				this.checkAllGroup.forEach((i) => {
				  goumai.push(this.cartList[i])
				});
				 sessionStorage.removeItem('cart'); 
		         sessionStorage.setItem('cart', JSON.stringify(goumai)); 
				 this.$router.push({ name:'/carttwo'});
			},
			
				remove(id){
					let ids=[id];
				  this.$Modal.confirm({
                    title: '删除提示',
                    content: '<p><strong>确定要删除该商品？</strong></p>',
                    cancelText: '取消',
                     onOk: () => {
                       	this.$axios({
							    method: 'post',
							    url:'/order/shopping/deleByIds',
							    data:ids
								}).then((res)=>{
									if(res.code==200){
									this.$Message.info(res.object);
									this.getCartList()
									}
							});
                    },
                    onCancel: () => {
                        this.$Message.info('取消成功');
                    }
                });
			},
			   removeall(){
			   	if(this.checkAllGroup.length<1){
					 this.$Message.warning('您尚未选择任何商品');
					return false;
				}
			   	 	var ids=[];
				 this.checkAllGroup.forEach((i) => {
				  ids.push(this.cartList[i].id)
				});
                		  this.$Modal.confirm({
                    title: '删除提示',
                    content: '<p><strong>确定清空购物车？</strong></p>',
                    cancelText: '取消',
                     onOk: () => {
                       	this.$axios({
							    method: 'post',
							    url:'/order/shopping/deleByIds',
							    data:ids
								}).then((res)=>{
									if(res.code==200){
									this.$Message.info(res.object);
									this.getCartList()
									}
							});
                    },
                    onCancel: () => {
                        this.$Message.info('取消成功');
                    }
                });
               },
              	
            handleCheckAll () {
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;
                var _this=this;
                if (_this.checkAll) {
	                	_this.checkAllGroup=[];
	                	 _this.temp=[];
	                    _this.cartList.forEach(function(item,index) {
					    _this.checkAllGroup.push(index);
					    _this.temp.push(index);
					    _this.totalPrice+=item.salePrice*item.quantity;
					    _this.zslcount+=parseInt(item.quantity)
				      });
                } else {
					_this.checkAllGroup = [];
					_this.temp=[];
					_this.totalPrice=0;
					_this.zslcount=0;
                }
			},
            checkAllGroupChange (data) {
                if (data.length === this.cartList.length) {
                    this.indeterminate = false;
                    this.checkAll = true;
                } else if (data.length > 0) {
                    this.indeterminate = true;
                    this.checkAll = false;
                } else {
                    this.indeterminate = false;
                    this.checkAll = false;
				}
                 this.totalPrice=0;
                 this.zslcount=0;
                 data.forEach((i) => {
				   this.totalPrice += parseFloat(this.cartList[i].salePrice) * parseFloat(this.cartList[i].quantity);
				   this.zslcount+=parseInt(this.cartList[i].quantity)
				});
            }
        },
         mounted() {
				this.getCartList();
		}
    }
</script>

<style  lang="scss"  scoped="scoped">
.cartpage{
	.cart_top {
		    background-color: #fff;
		    border-bottom: 1px solid #e9e9e9;
		    margin-bottom: 20px;
	}
	.cart_top .cart_top_inner {
    width: 1200px;
    margin: 0 auto;
    font-weight: normal;
	}
	.cart_top .cart_title {
    font-size: 32px;
    line-height: 80px;
    color: #333;
    font-weight: normal;
	}
	.cart_body {
    width: 1200px;
    margin: 0 auto;
}
	.carthead{
	border: 1px solid #e9e9e9;
    background-color: #fafafa;
    height: 40px;
    line-height: 40px;
    color: #aaa;
	}
	.cartCol{
		    position: relative;
    z-index: auto;
    padding: 0 20px;
	}
	.item_detail{
	     border: 1px solid #ccc;
    margin-top: 20px;
    background: #fff;}
}
.cart_img img{
	width:90px
}
.cart_product{
    padding-left: 0;
    height: 16px;
    overflow: hidden;
}
.item_detail .cartCol .ivu-col{
	padding: 20px 0;
}
.text-box{
	    height: 22px;
    line-height: 22px;
    width: 34px;
    border: 1px solid #d6d6d6;
    background: #fff;
    border-left: 0;
    border-right: 0;
    text-align: center;
    float: left;
}
.min,.add{
	float: left;
	display: inline-block;
    position: relative;
    cursor: pointer;
    width: 22px;
    height: 22px;
    border: 1px solid #d6d6d6;
    text-align: center;
    }
    .operation_delete{
    	color:#333;
    	font-weight: bold;
    	cursor: pointer;
    }
    .cart_price{
    	color:#0099ff
    }
    .cart_bottom{
    	    width: 100%;
    height: 60px;
    margin-top: 30px;
     margin-bottom: 60px;
    padding-left: 10px;
    background-color: #fafafa;
    border: 1px solid #e9e9e9;
    position: relative;
    line-height: 60px;
    }
    .cart_bottom .cart_sum_right {
  float: right;
}
.cart_sum_delete{
	 margin-left: 40px;
	 cursor: pointer;
}   
.color_f60 {
	display: inline-block;
    padding: 0 3px;
    color: #0099ff;
    }
    .cart_sum_price,.cart_sum_num{
    	    margin-right: 40px;
    }
        .total_price_inner{
        	color: #0099ff;
    font-size: 18px;
    font-weight: bolder;
        }
        .cart_sum_to_order{
            width: 160px;
    text-align: center;
    font-size: 18px;
    background-color: #0099ff;
    color: #fff;
    cursor: pointer;
    }
   .cart_sum_left,.cart_sum_choose, .cart_sum_delete ,.total_price,.cart_sum_to_order,.cart_sum_price,.cart_sum_num{
    	float: left;
    }
    .cart_sum_left,.cart_sum_price{
    	line-height: 60px;
    }
    .cart_empty{
    text-align: center;
    border: 1px solid #e6e6e6;
    background-color: #fff;
    img{
    	width:90px
    }
    a{
    	font-size: 14px;
    	margin-top: 10px;
    }
    }
 
</style>
