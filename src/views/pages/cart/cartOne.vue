<template>
	<div class='cart1'>
		<div class="Mycar">
			<h3 class="center1 ">购物车</h3>
		</div>

		<div v-if="cartList.length>0">
		<div class='carthead'>
			<Row>
				<Col  class='cartCol' span="24">
					<Col  span="2" class="center">
					<Checkbox :indeterminate="indeterminate"  :value="checkAll"   @click.prevent.native="handleCheckAll">全选</Checkbox>
					</Col>
					<Col span="4" >主图</Col>
					<Col span="9"><p >商品信息</p></Col>
					<Col span="2">
						<p >单价（元）</p>
					</Col>
					<Col span="3">
						<p >数量</p>
					</Col>
					<Col  span="2">
						<P >小计（元）</P>
					</Col>
					<Col  span="2">
						<P>操作</P>
					</Col>
				</Col>
			</Row>
		</div>
		<Row>
		    <Checkbox-group v-model="checkAllGroup" @on-change="checkAllGroupChange">
		 		<Col  class='cartCol' span="24" v-for="(x,index) in cartList" :key="index"> 
        			<Col class='cartcheckbok' span="2">
        			<Checkbox  :label="index"></Checkbox></Col>
					<Col span="4" ><img class='cartImg' :src="imageSrc+x.image"></Col>
					<Col span="9">
						<p class='cart_black'>{{x.productName}}</p>
						<p class='cart_gray'>{{x.productAttr}}</p>
						
					</Col>
					<Col span="2">
						<p class='cart_price'>￥{{x.salePrice}}</p>
					</Col>
					<Col span="3">
						<p class='cart_qua'>
							<div class="min-add">
						    <Icon type="minus-round" @click.native="jian(x,index)" class="min"  ></Icon>
						     <input class="text-box" name="pricenum"  type="tel" v-model="x.quantity*1" v-on:input="changeNumber($event,x,index)" placeholder="数量" data-max="50" />
						  <Icon type="plus-round" @click.native="jia(x,index)" class="add"></Icon>
						</div>
					</Col>
					<Col span="2">
						<p class='cart_price'>￥{{x.salePrice}}*{{x.quantity}}</p>
					</Col>
					<Col span="1">
						<span  @click="edit"  class="m_header_bar_menu">删除</span>
					</Col>
				</Col>
			</Checkbox-group>
		</Row>
			<div class='cartfoot'>
				<Row>
					<Col  class='cartCol' span="24">
						<Col  span="2" class="center">
									<Checkbox :indeterminate="indeterminate"  :value="checkAll"   @click.prevent.native="handleCheckAll">全选</Checkbox>
						</Col>
						<Col  span="2">
							<P class='color-dx'>总计：￥{{totalPrice}}</P>
						</Col>
						<Col class='cartButton1' span="20"> 
							<i-button class='cartButton'  @click.prevent.native="paymoney" type="error"> 
								结算({{zslcount}})
							</i-button>
						</Col>
					</Col>
				</Row>
			</div>
			</div>
				<div class="cart-empty"  v-else>
			<div></div><img src="../../../assets/img/cartempty.png">购物车是空的
			<router-link to="/index"  >去首页</router-link>
		</div>
	</div>
</template>

<script>
export default {
        data () {
            return {
            	imageSrc:this.global_.imgurl,
                indeterminate: true,
                checkAll: false,
				checkAllGroup: [],
				totalPrice:0,
				cartList:[{"image":"modelcolor/430X4308f5a50e83ca84c429ea1c464a0a3ac1120180518103520.jpg","quantity":"1","salePrice":0.02,"id":"80145d072aae4d61a13e4e632f7127f6","productName":"迪瑞克斯DXRacer FA01简约时尚电脑椅子家用可躺办公座椅电竞游戏","productAttr":"【炫红】"},{"image":"modelcolor/430X430587d734323864fb8a8857be2faf7146820180518104728.jpg","quantity":"1","salePrice":0.01,"id":"b3898073d0634e1cb6d4fcb3721d0042","productName":"迪瑞克斯DXRacer FE0电脑椅时尚LPL吃鸡游戏办公椅家用转椅电竞椅","productAttr":"【缤纷橙】"}],
				editface:true,
				zslcount:0,
				temp:[],
            }
		},
        methods: {

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
			edit(){
				this.editface=!this.editface;
			},
			edit1(){
			},
			paymoney(){
				if(this.checkAllGroup.length<1){
					 this.$Message.warning('您尚未选择任何商品');
					return false;
				}
				var goumai=[];
				this.checkAllGroup.forEach((i) => {
				  goumai.push(this.cartList[i])
				 // this.cartList.splice(i, 1);
				});
				 sessionStorage.removeItem('cart'); 
		         sessionStorage.setItem('cart', JSON.stringify(goumai)); 
				 this.$router.push({ name:'/carttwo'});
			},
			
			remove(){
				  this.$Modal.confirm({
                    title: '清空购物车提示',
                    content: '<p>您确定清空购物车</p>',
                    cancelText: '取消',
                     onOk: () => {
                       	this.$axios({
							    method: 'post',
							    url:'/order/shopping/clear',
								}).then((res)=>{
									if(res.code==200){
										this.cartList=[];
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

<style  lang="scss" >
 	@import '@/styles/color.scss';
 	.min-add .min,.min-add .add{
 		    color: #333;
    font-weight: bold;
    cursor: pointer;
    margin-right:5px;
    font-size: 14px;
    margin-left:3px;
 	}
 	.min-add .min,.min-add .add,.min-add input{
 		display: inline-block;
 	}
 	.min-add input{
 		font-size: 14px;
 		width:50px;
 		text-align: center;
 		background: #f5f5f5;border:0 none;
 		height:26px;
 	}
	.m_header_bar_title{
		font-size: 16px;
	}
	.cart1{
		margin-bottom:55px;
		max-width: 1100px;
		margin: 0 auto;
		min-height:700px;
		width: 100%;
		.center{
			text-align: center;
		}
		.cartCol{
			background-color: #fff;
			padding-bottom:10px;
			padding-top: 15px;
			height: 213px;
			border: 1px solid #eee;
			border-bottom: none;
			.cartcheckbok{
				height:16px;
				padding-left:30px;
				.ivu-checkbox-wrapper{
					width:16px;
					overflow:hidden;
					height: 16px;
					line-height: 16px;
				}
			}
			.cart_qua{
				font-size:14px;
			}
			.cartImg{
				max-width:100%;
			}
			.cart_black{
				color:$color-default;
				text-align: left;
			    padding-left: 20px;
			    box-sizing: border-box;
			    font-size: 14px;
			    text-overflow: ellipsis;
			    white-space: nowrap;
			    overflow: hidden;
			}
			.cart_gray{
				text-align:left;
				color:$color-gray;
				padding-left:20px;
				box-sizing:border-box;
				font-size:12px;
			}
			.cart_price{
				color:$color-dx;
				padding-left:20px;
			}
			.color-dx{
				color:$color-dx;
				text-align:left;
			}
			.cartButton1{
				text-align:right;
				
			}
			.cartButton{
				border-radius:0px;
				padding:15px 25px;
				.font-dx{
					color:$color-white;
					background-color: #f60;
				}
			}
			.cartButton:nth-of-type(2n){
				margin-left:-5px;
			}
			
		}
		.cartfoot{
			    background: #fff;
				border-top: 1px solid #eee;
				height: 49px;
				line-height:49px;
				z-index: 31;
				bottom: 0px;
				left: 0;
				width: 100%;
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
		}
		.carthead{
			   margin-bottom:20px;
			   border-bottom: 1px solid #eee;
			p{
				padding-left: 20px;
			}
			.ivu-row{
				.cartCol{
					height: 51px;
					line-height: 50px;
					padding-top:0px;
					border-bottom:1px solid #eee;
					padding-bottom: 0px;
					background: #fff;
				}
			}
		}
	}
	.cart-empty {
		text-align: center;
		font-size: 14px;
		img{
		max-width:100px;
		}
	}
</style>
