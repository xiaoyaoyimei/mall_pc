<template>
    <div class='paymoney'>
		<div class="Mycar">
			<h3 class="center1 ">订单结算</h3>
		</div>
		<!-- <div class="M_main center1 clearfix">
		    <div class="M_nav">
				<ul class="fl">
					<li class="S_iconCar">
						<div><i></i><b class="red">购物车</b></div> <span></span></li>
					<li class="S_iconCount">
						<div><i></i><b class="red">结算</b></div> <span></span></li>
					<li class="S_iconPay">
						<div><i></i><b class="">支付</b><span></span></div>
					</li>
					<li class="S_iconSucceed">
						<div><i></i><b>支付成功</b></div>
					</li>
				</ul>
    		</div>
		</div> -->
			<div class="P_received clearfix">
				<p class="P_rTit ">寄送到:</p>
				<div class="P_ownedAddress fl">
				<table class="" id="address_table"><tbody><tr class="P_addressHead"><th>配送到</th><th>收货人</th><th>所在地区</th><th>详细地址</th><th>手机</th></tr><tr class="P_addressList"><td><input class="chk_address_id" value="327" name="address_id" type="checkbox"></td> <td>要和</td><th>北京北京市崇文区</th><td>以后就交给</td><td>18336077236</td></tr></tbody></table>
				</div>    
			</div>
            <div class="chooseAddress">
            	<ul class="address" v-if="youdizhi">
				<!-- <li>
					<p><strong>{{addressList.person}} <label>{{addressList.phone}}</label></strong>
					<span>{{addressList.receiveProvince}}{{addressList.receiveCity}}{{addressList.receiveDistrict}}{{addressList.address}}</span></p>
						<Icon type="chevron-right"  @click.native="addAdd"></Icon>
				</li> -->

			   </ul>
                	<Button @click='show1'>新增收货地址</Button>
				<Form :model="addForm" ref="addForm" label-position="left" :label-width="100" :rules="ruleValidate" v-show="show"> 
					<FormItem label="收货人" prop="person">
						<Input v-model="addForm.person" placeholder="收货人"></Input>
					</FormItem>
					<FormItem label="手机号" prop="phone">
						<Input v-model="addForm.phone" placeholder="联系电话"></Input>
					</FormItem>
					<FormItem label="固定电话" >
						<Input v-model="addForm.tel" placeholder="固定电话"></Input>
					</FormItem>
					<FormItem label="所在地区"  prop="selectedOptionsAddr">
						<Cascader  v-model="addForm.selectedOptionsAddr" :data="addressOption"></Cascader>
					</FormItem>
					<FormItem label="详细地址" prop="address">
						<Input v-model="addForm.address" placeholder="详细地址"></Input>
					</FormItem>
				</Form>
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
		<Row>
		    <Checkbox-group v-model="checkAllGroup" @on-change="checkAllGroupChange">
		 		<Col  class='cartCol' span="24" v-for="(x,index) in cartList" :key="index"> 
 
					<Col span="4" ><p class="paddingLeft"><img class='cartImg' :src="imageSrc+x.image"></p></Col>
					<Col span="11">
						<p class='cart_black paddingLeft'>{{x.productName}}</p>
						<p class='cart_gray paddingLeft'>{{x.productAttr}}</p>
						
					</Col>
					<Col span="2">
						<p class='cart_price paddingLeft'>￥{{x.salePrice}}</p>
					</Col>
					<Col span="3">
						<p class='cart_qua paddingLeft'>*1</p>
					</Col>
					<Col span="2">
						<p class='cart_price paddingLeft'>￥{{x.salePrice}}</p>
					</Col>
				</Col>
			</Checkbox-group>
		</Row>

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
				show:false,
				youdizhi:false,
				tempcart:[],
				productItemIds:[],
				addForm: {
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
					selectedOptionsAddr: [
					{ required: true, type: 'array',message: '请选择省市区', trigger: 'blur' }
					],
					address:[
						{ required: true, message: '详细地址不能为空', trigger: 'blur' },
					]
				},
            }
        },
  		watch: {
            // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
               '$route': 'getDD'
          },
        methods: {
			show1(){
				if(this.show == false){
					this.show = true;
				}else{
					this.show = false;
				}
			},
        	getDD(){
                let routerParams = this.$route.params.address;
                if(routerParams!=undefined){
                	this.addressList=routerParams;
                	this.youdizhi=true
                }
        	},
        	addAdd(){
        		 sessionStorage.removeItem('fromc'); 
		         sessionStorage.setItem('fromc','dingdan'); 
        		 this.$router.push('/user/address') ;
        	},
		      getCartList(){
		        this.cartList =  JSON.parse(sessionStorage.getItem('cart')); 
		        var _this=this;
		        _this.productItemIds=[];
		          this.cartList.forEach(function(item,index) {
					    _this.totalPrice +=item.salePrice*item.quantity;
					    _this.productItemIds.push(item.id);
				      });
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
							 			_this.addressList=i
							 		}
							 	});
								 this.youdizhi=true
							}
						});
		      },
            confirm(){
	          	let para={
						addressId:this.addressList.id,
	                    productItemIds:this.productItemIds
				  };
				  this.$router.push({ name:'/cartthree'});
    	   	  	// this.$axios({
				//     method: 'post',
				//     url:'/order/shopping/confirm',
				//     data:para
				// }).then((res)=>{
				// 	if(res.code=='200'){
				// 		 this.$router.push({name:'/cartthree',params: { orderNo: res.msg}});  
				// 	}else{
				// 		 this.$Message.error(res.msg);
				// 	}
				// });
            }
        },
         mounted() {
         	this.getAddress();
         	this.getCartList();
         	this.getDD();
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
	background-color: #fffceb;
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
					background: $color-dx;
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
.P_ownedAddress table {
    border: 1px solid #e7e7e7;
}
table {
    border-collapse: collapse;
}
.P_ownedAddress table .P_addressHead {
    border-bottom: 1px solid #e7e7e7;
}
.P_ownedAddress table .P_addressHead th {
    height: 40px;
    padding: 0 5px;
    border-top: 1px solid #e7e7e7;
    border-bottom: 1px solid #e7e7e7;
    background: #f2f2f2;
    text-align: left;
}
.P_ownedAddress table .P_addressList {
    height: 40px;
    border-bottom: 1px solid #e7e7e7;
}
.P_ownedAddress table .P_addressList td {
    padding: 5px;
    white-space: normal;
    word-wrap: break-word;
    word-break: break-all;
    position: relative;
}
.center1 {
    margin: 0 auto;
    width: 1100px;
    /* background-color: pink; */
    /* height: 100px; */
}
.M_main .M_nav {
    height: 106px;
    background-color: #E5E5E5;
    margin: 16px 0;
    padding: 22px 76px;
}
.M_main .M_nav ul {
    text-align: center;
}
.fl {
    float: left;
}
.M_main .M_nav ul li {
    float: left;
    position: relative;
    margin-right: 245px;
}
.M_main .M_nav ul li div {
    width: 50px;
}
.M_main .M_nav ul li div i {
    display: block;
    width: 46px;
    height: 46px;
}
 .clearfix:after {content: "."; display: block; height:0; clear:both; visibility: hidden;}
.clearfix { *zoom:1; }
.S_iconCar i {
    background: url(../../../assets/img/spring1.png) 0px -6px no-repeat;
}
.S_iconCount i {
    background: url(../../../assets/img/spring1.png) 0px -60px no-repeat;
}
.S_iconPay i {
    background: url(../../../assets/img/spring1.png)  -64px -9px no-repeat;
}
.S_iconSucceed i {
    background: url(../../../assets/img/spring1.png)  -73px -117px no-repeat;
}
.M_main .M_nav ul .S_iconSucceed{
  margin-right: 0px;
}
.M_main .M_nav ul li div b {
    display: block;
    line-height: 30px;
}
.red {
    color: #E50011;
}
.Mycar {
    border-bottom: 1px solid #e7e7e7;
}
.Mycar h3 {
    font-size: 18px;
    font-weight: 900;
    line-height: 34px;
    height: 34px;
}
</style>
