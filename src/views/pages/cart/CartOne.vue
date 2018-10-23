<template>
	<div class='cart1 cartpage'>
		<div class="nav Nav">
			<div class="main-width clearfix">
				<router-link  to="/index" class="logo fl navcart"><img   src="../../../assets/img/logo-red.png"></router-link>
                <span href="#" class="fl mycart">我的购物车</span>
                <ul class="navCart">
                    <li><p class="cartIcon iconIcon-successorder"></p><p>成功提交订单</p></li>
                    <li><p class="cartIcon iconIcon-cart-order"></p><p>填写核对订单</p></li>
                    <li class="red" ><p class="cartIcon iconIcon-cart-red"></p><p>我的购物车</p></li>
                </ul>
			</div>
		</div>
		<div class="cartlist clearfix">
			<div class="cartTablenull" v-if="cartnologin">
				<span>您尚未登录！<router-link  to="/login" >去登录</router-link></span>
			</div>
		<div class="cartlist clearfix"  v-else>
			<div class="cartTable" v-if="hasShow">
				<Checkbox-group v-model="checkAllGroup" @on-change="checkAllGroupChange" class="item_detail clearfix">
					<table>
						<thead>
							<tr>
								<th width="150">
									<Checkbox :indeterminate="indeterminate"   :value="checkAll" @click.prevent.native="handleCheckAll">全选</Checkbox>
								</th>
								<th width="400">商品名称</th>
								<th width="150">单价</th>
								<th width="200">数量</th>
								<th width="150">小计</th>
								<th width="150">操作</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(x,index) in cartList" :key="index">
								<td>
										<Checkbox :label="index" :key="index"></Checkbox>
								</td>

								<td>
									<div class="cartlistImg">
										<img :src="x.image |imgfilter">
									</div>
									<div class="cartlisstText">
										<h6>{{x.productName}}</h6>
										<p>{{x.productAttr}}</p>
									</div>
								</td>
								<td>
									<p class="salePrice">￥{{x.salePrice|pricefilter}}</p>
									<p class="price" v-if="x.promotionTitle!=null">￥{{x.originSalePrice|pricefilter}}</p>
								</td>
								<td>
									<div class="cartlistnum">
										<input class="cartminus" value="-" type="button" @click="jian(x,index)">
										<input class="num" value="1" type="text" v-model.lazy="x.quantity" v-on:blur="changeNumber($event,x,index)">
										<input class="cartadd" value="+" type="button" @click="jia(x,index)">
									</div>
									</td>
									<td>
										<p class="cartlist-red">￥{{itemtotal(x.salePrice,x.quantity)|pricefilter}}</p>
									</td>
									<td><span class="cartIcon cartIcon-delete" @click="remove(x.id)"></span></td>
								</tr>
							</tbody>
							<tfoot>
								<tr>
									<td align="center">
										<Checkbox  :indeterminate="indeterminate"  :value="checkAll" @click.prevent.native="handleCheckAll">全选</Checkbox> 
										<button class="operation_delete" @click="removeall()">删除</button></td>
									<td colspan="2">
										<router-link :to="{ path: '/index' }" class="cartshopping">继续购物</router-link>
										<span class="totalnum">共 <span>{{totalnum}}</span> 件商品，已选择 <span>{{zslcount}}</span> 件</span>
									</td>
									<td colspan="2">
										<p class="totalprice"><span class="span">共计优惠￥{{sale}}</span> 合计：
											<span class="total">    ￥{{totalPrice |pricefilter}}        </span></p>
									</td>
									<td><span class="cartPay" @click="paymoney">去结算</span></td>
								</tr>
							</tfoot>
						</table>
					</Checkbox-group>
				</div>
				<div class="cartTablenull" v-else>
					<img src="../../../assets/img/u15.png" alt="购物车为空">
					<span>您的购物车还是空的！<router-link  :to="{ path: '/sort',query:{keyword:''} }">马上去购物</router-link></span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// 引入公共的bug，来做为中间传达的工具
	import Bus from '@/assets/js/bus.js'
	export default {
		data() {
			return {
				indeterminate: false,
				checkAll: false,
				checkAllGroup: [],
				totalPrice: 0,
				cartList: [],
				editface: true,
				zslcount: 0,
				temp: [],
				sale: 0,
				totalnum: 0,
				cartnologin: true, //未登录
				hasShow:true
			}
		},
		methods: {
			itemtotal(p, n) {
				return Number(p) * n;
			},
			addcart(x) {
				this.$axios({
					method: 'post',
					url: '/order/shopping/add',
					data: {
						productItemIds: [x.id],
						quantity: x.quantity
					}
				}).then((res) => {
					if(res.code == '200') {
						Bus.$emit('cartmsg', "again");
					} else {
						this.$Message.warning(res.object);
					}
				});
			},
			changeNumber: function(event, x, index) {
				var obj = event.target;
				let n = /^[1-9]\d*$/;
				if(!n.test(obj.value)) {
					this.$Message.warning('商品数量须大于0个，请输入正整数');
					obj.value = 1
					x.quantity = 1
					this.getCartList()
					return false;
				}
				x.quantity = parseInt(obj.value);
				if(this.temp.indexOf(index) < 0) {
					this.temp.push(index)
				}
				this.checkAllGroup = this.temp;
				this.checkAllGroupChange(this.temp);
				this.addcart(x)
			},
			//添加
			jia: function(x, index) {
				if(x.quantity >= x.max) {
					x.quantity = x.max
				} else {
					x.quantity = parseInt(x.quantity) + 1;
					if(this.temp.indexOf(index) < 0) {
						this.temp.push(index)
					}
					this.checkAllGroup = this.temp;
					this.checkAllGroupChange(this.temp);
				}
				this.addcart(x)
			},
			//减
			jian: function(x, index) {
				//删除的时候库存最小为1。所以无需删去选中的index
				//						   if(this.temp.indexOf(index)>0){
				//					     	this.temp.splice(index,1)
				//						  }
				if(x.quantity == 1) {
					x.quantity == 1
				} else {
					x.quantity = parseInt(x.quantity) - 1;
					this.checkAllGroup = this.temp;
					this.checkAllGroupChange(this.temp);
					this.addcart(x)
				}
			},
			getCartList() {
				let _this = this;
				if(localStorage.getItem('token') != undefined) {
					this.cartnologin = false;
					this.cartList = [],
						this.$axios({
							method: 'post',
							url: '/order/shopping/list',
						}).then((res) => {
							if(res.code == '200') {
								this.cartList = res.object;
								if(this.cartList.length>0){
									this.hasShow=true;
								}else{
									this.hasShow=false;
								}
								this.totalnum = 0;
								this.sale = 0;
								this.cartList.forEach((item, index) => {
									_this.totalnum += parseInt(item.quantity);
									_this.sale += parseInt(item.originSalePrice - item.salePrice) * 100 * parseInt(item.quantity)
								});
								_this.sale = (_this.sale / 100).toFixed(2)
								this.handleCheckAll();
							}
						});
				} else {
					this.cartnologin = true;
					return false;
				}
			},
			paymoney() {
				if(this.checkAllGroup.length < 1) {
					this.$Message.warning('您尚未选择任何商品');
					return false;
				}
				var goumai = [];
				this.checkAllGroup.forEach((i) => {
					goumai.push(this.cartList[i])
				});
				sessionStorage.removeItem('cart');
				sessionStorage.setItem('cart', JSON.stringify(goumai));
				this.$router.push({
					name: '/carttwo',
					query: {
						orderfrom: 'B'
					}
				});
			},

			remove(id) {
				let ids = [id];
				this.$Modal.confirm({
					title: '删除提示',
					content: '<p><strong>确定要删除该商品？</strong></p>',
					cancelText: '取消',
					onOk: () => {
						this.$axios({
							method: 'post',
							url: '/order/shopping/deleByIds',
							data: ids
						}).then((res) => {
							if(res.code == 200) {
								this.$Message.info(res.object);
								Bus.$emit('cartmsg', "again");
								this.getCartList()
							}
						});
					},
					onCancel: () => {
						this.$Message.info('取消成功');
					}
				});
			},
			removeall() {
				if(this.checkAllGroup.length < 1) {
					this.$Message.warning('您尚未选择任何商品');
					return false;
				}
				var ids = [];
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
							url: '/order/shopping/deleByIds',
							data: ids
						}).then((res) => {
							if(res.code == 200) {
								this.$Message.info(res.object);
								Bus.$emit('cartmsg', "again");
								this.getCartList()
							}
						});
					}
				});
			},

			handleCheckAll() {

				if(this.indeterminate) {
					this.checkAll = false;
				} else {
					this.checkAll = !this.checkAll;
				}
				this.indeterminate = false;
				var _this = this;
				if(_this.checkAll) {
					_this.checkAllGroup = [];
					_this.temp = [];
					_this.totalPrice = 0;
					_this.zslcount = 0;
					_this.sale = 0;
					_this.cartList.forEach(function(item, index) {
						_this.checkAllGroup.push(index);
						_this.temp.push(index);
						_this.totalPrice += item.salePrice * item.quantity;
						_this.zslcount += parseFloat(item.quantity)
						_this.sale += (item.originSalePrice - item.salePrice) * parseFloat(item.quantity) * 100
					});
					_this.sale = (_this.sale / 100).toFixed(2);
				} else {
					_this.checkAllGroup = [];
					_this.temp = [];
					_this.totalPrice = 0;
					_this.zslcount = 0;
					_this.sale = 0;
				}
			},
			checkAllGroupChange(data) {
				this.totalnum = 0;
				this.sale = 0;
				this.cartList.forEach((item, index) => {
					this.totalnum += parseInt(item.quantity)
				});
				if(data.length === this.cartList.length) {
					this.indeterminate = false;
					this.checkAll = true;
				} else if(data.length > 0) {
					this.indeterminate = true;
					this.checkAll = false;
				} else {
					this.indeterminate = false;
					this.checkAll = false;
				}
				this.totalPrice = 0;
				this.zslcount = 0;
				this.sale = 0;
				data.forEach((i) => {
					this.totalPrice += parseFloat(this.cartList[i].salePrice) * parseFloat(this.cartList[i].quantity);
					this.zslcount += parseInt(this.cartList[i].quantity);
					this.sale += (this.cartList[i].originSalePrice - this.cartList[i].salePrice) * 100 * parseInt(this.cartList[i].quantity);
				});
				this.sale = this.sale / 100
			},
		},
		mounted() {
			this.getCartList();
		}
	}
</script>

<style lang="scss" scoped="scoped">
.operation_delete{
	border:0 none;
	background: #fff;
}
	.cartlist {
		background-color: rgb(238, 238, 238);
		padding: 50px 0px 70px;
	}
	
	.cartlist .cartTable {
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		background-color: #fff;
	}
	
	.cartlist .cartTable table {
		border-collapse: collapse;
	}
	
	.cartlist .cartTable thead tr {
		height: 70px;
		border-bottom: 1px solid #888888;
		color: #010000;
		font-weight: 400;
		font-size: 14px;
	}
	
	.cartlist .cartTable thead th {
		font-weight: 400;
	}
	
	.cartlist .cartTable thead th:nth-of-type(2) {
		text-align: left;
	}
	
	.cartlist .cartTable tbody td {
		height: 153px;
		text-align: center;
	}
	
	.cartTable tbody tr {
		border-top: 1px solid rgb(238, 238, 238);
	}
	
	.cartTable tbody tr td:nth-of-type(2) {
		text-align: left;
	}
	
	.cartTable .AllcheckBox {
		width: 70px;
		padding-left: 29px;
		margin-left: 24px;
	}
	
	.cartTable .left-checkBox {
		position: relative;
		left: -10px;
	}
	
	.cartTable .cartlistImg {
		float: left;
		width: 90px;
	}
	
	.cartTable .cartlistImg img {
		vertical-align: middle;
		width: 80px;
		height: 80px;
	}
	
	.cartTable .cartlisstText {
		float: left;
		width: 200px;
	}
	
	.cartTable .cartlisstText h6 {
		font-size: 18px;
		color: #000000;
		font-weight: 500;
		line-height: 27px;
		max-height: 54px;
		overflow: hidden;
	}
	
	.cartTable tfoot {
		border-top: 25px solid rgb(238, 238, 238);
		height: 85px;
	}
	
	.cartTable .cartlisstText p {
		font-size: 14px;
		color: #000000;
		font-weight: 300;
		line-height: 27px;
		max-height: 54px;
		overflow: hidden;
	}
	
	.cartTable .cartlisstText img {
		padding: 0px 10px;
		vertical-align: middle;
	}
	
	.cartTable .salePrice {
		font-size: 18px;
		font-weight: 500;
		color: #000000;
	}
	
	.cartTable .price {
		font-size: 14px;
		font-weight: 500;
		color: #000000;
		text-decoration: line-through;
	}
	
	.cartTable .cartlistnum {
		width: 150px;
		position: relative;
		border: 1px solid rgb(178, 178, 178);
		left: 25px;
	}
	
	.cartTable tfoot {
		border-top: 25px solid rgb(238, 238, 238);
		height: 85px;
	}
	
	.cartTable .cartshopping {
		text-align: center;
		font-size: 14px;
		font-weight: 500;
		border-right: 1px solid rgb(141, 141, 141);
		cursor: pointer;
		color: #000000;
		line-height: 15px;
		padding-right: 40px;
	}
	
	.cartTable .totalnum {
		padding-left: 40px;
		font-size: 14px;
		font-weight: 500;
		color: #000000;
	}
	
	.cartTable .totalprice {
		font-size: 18px;
		font-weight: 500;
		color: #ff0037;
		text-align: left;
	}
	
	.cartTable .cartPay {
		text-align: center;
		height: 60px;
		width: 100%;
		background-color: #ff0037;
		display: block;
		color: #fff;
		line-height: 60px;
		font-size: 24px;
		cursor: pointer;
	}
	
	.cartlistnum .cartminus,
	.cartlistnum .cartadd {
		position: absolute;
		width: 43px;
		height: 43px;
		border: none;
		color: #010000;
		font-size: 18px;
		font-size: 500;
		cursor: pointer;
	}
	
	.cartlist-red {
		color: #ff0000;
		font-size: 18px;
		font-size: 500;
	}
	
	.cartlistnum .cartminus {
		left: 0px;
	}
	
	.cartlistnum .cartadd {
		right: 0px;
	}
	
	.cartlistnum .num {
		width: 66px;
		height: 43px;
		border: none;
		text-align: center;
		font-size: 18px;
		font-size: 500;
	}
	
	.cartTable .totalnum span {
		color: #ff0037;
	}
	
	.cartTablenull {
		width: 650px;
		height: 210px;
		margin: 0 auto;
		background-color: rgb(238, 238, 238);
	}
	
	.cartTablenull img {
		opacity: 0.5;
		width: 240px;
	}
	
	.cartTablenull span {
		font-weight: 700;
		font-style: normal;
		font-size: 36px;
		color: #999999;
		float: right;
		width: 360px;
		margin-top: 35px;
	}
	
	.cartTablenull a {
		width: 180px;
		height: 50px;
		border-width: 1px;
		border-style: solid;
		border-color: red;
		border-radius: 0px;
		box-shadow: none;
		font-weight: 400;
		font-size: 18px;
		color: #FF0000;
		text-align: center;
		background-color: #ffffff;
		margin-top: 15px;
		display: inline-block;
		line-height: 50px;
	}
	
	.Msucceess {
		width: 100%;
		max-width: 1200px;
		margin: 0px auto;
		margin-bottom: 56px;
	}
	
	.Msucceess img {
		max-width: 260px;
		max-height: 260px;
	}
	
	.Msucceess .h5 {
		height: 1px;
		margin-top: 40px;
		text-align: center;
		border-top: 1px solid rgb(204, 204, 204);
	}
	
	.Msucceess .h5 h5 {
		position: relative;
		top: -18px;
		font-weight: 100;
		background: #fff;
		display: inline-block;
		width: 320px;
		text-align: center;
		font-size: 24px;
		color: rgb(110, 110, 110);
	}
	
	.Msucceess .likeList {
		margin-top: 36px;
	}
	
	.Msucceess .likeList li {
		float: left;
		width: calc(25% - 12px);
		padding: 15px;
		background-color: rgb(246, 246, 246);
		margin-right: 15px;
		text-align: center;
	}
	
	.Msucceess .likeList li:nth-of-type(4) {
		margin-right: 0px;
	}
	
	.Msucceess .stamp {
		width: 51px;
		height: 22px;
		box-sizing: border-box;
		font-size: 12px;
		font-weight: 700;
	}
	
	.Msucceess .stampRed {
		color: rgb(251, 84, 104);
		border: 2px solid rgb(226, 24, 24);
	}
	
	.Msucceess .likeList h5 {
		margin-top: 20px;
		font-size: 13px;
		color: black;
		font-weight: 900;
	}
	
	.Msucceess .des {
		color: #888888;
		font-weight: 300;
		font-size: 13px;
		height: 22px;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	
	.Msucceess .red {
		margin: 5px;
		color: #ff0037;
		font-size: 13px;
		font-weight: 900;
	}
	
	.Msucceess .gocart {
		width: 100px;
		height: 25px;
		box-sizing: border-box;
		border: 0;
		color: rgb(141, 141, 141);
		font-size: 13px;
		background-color: rgb(246, 246, 246);
	}
	
	.Msucceess .gocart span {
		width: 100px;
		height: 25px;
		font-weight: 700;
		border: 1px solid rgb(160, 160, 160);
		padding: 4px 10px;
	}
	
	.Msucceess .likebtn {
		margin: 21px auto;
		width: 100px;
		text-align: center;
	}
	
	.Msucceess .likebtn a {
		padding: 7px 8px;
		background-color: rgb(255, 255, 255);
		border: 1px solid rgb(204, 204, 204);
		font-weight: 900;
		font-size: 13px;
		color: black;
		margin-right: 5px;
		cursor: pointer;
	}
	
	.Msucceess .likebtn .gray {
		color: #888888;
	}
	
	.likeListImg {
		width: 80%;
	}
</style>
<style>
	.ivu-checkbox-wrapper+span,
	.ivu-checkbox+span {
		display: none;
	}
</style>