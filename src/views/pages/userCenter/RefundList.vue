 <template>
 	
        <div class="mb30">
        	
            <table class="order-tb" >
              <thead>
                  <tr>
                  	<th width='100'>主图</th>
                  	<th >商品</th>
                  	<th width='100'>单价</th>
                  	<th  width='50'>数量</th>
                  	<th width='100'>总价</th>
                  	<th width='100'>状态</th>
                   <th  width='150'>操作</th></tr>
              </thead>
              </table>
              <table class="order-tb orderitem-tb" v-for="(x,index) in pro" :key="index" v-if="cartList.length>0">
                <tbody >
                  <tr class="toptitle">
                  	<td  colspan="7">
                  		<span>订单号：{{x.order.orderNo}}</span>
                  		<span class="date">{{x.order.createTime | formatDate}}</span>  
                  		<span class="right"> {{statusfilter(x.order.orderStatus)}}</span>
                   </td>
                  </tr>
                  <tr  v-for="(child,i) in x.orderItems" :key="i">
                      <td class="goods_pic"  width='100'>
                              	<a href="javascript:void(0)"><img :src="child.productItemImg | imgfilter" alt=""></a>
                       </td>
                        <td>
                                 <div class="goods_title"> <p >{{child.productTitle}}</p>
                                <p>{{child.productAttrs}}</p>
                                </div>
                              
                        </td>
                        <td  width='100'>￥{{unitprice(child.orderFee,child.quantity) | pricefilter}}</td>
                          <td  width='50'> {{child.quantity}}</td>
                          <td  width='100'> ￥{{child.orderFee| pricefilter}}</td>
                           <td  width='100'> 
                          	<router-link :to="{name:'/order/detail',query:{orderNo:x.order.orderNo}}" >订单详情</router-link>
                          </td>
                          <td    width='200'>
                  
                         <div class="cz" >
                         	<button   class="btn"  @click="cancel(x.order.orderNo)" v-if="x.order.orderStatus=='01'||x.order.orderStatus=='02'||x.order.orderStatus=='05'">取消订单</button>
                         	<button   class="btn btn-dx"  @click="quzhifu(x.order.orderNo)" v-if="x.order.orderStatus=='01'">去支付</button>
                         	<button   class="btn btn-dx"  @click="qianshou(x.order.orderNo)" v-if="x.order.orderStatus=='06'">签收订单</button>
                         	<button   class="btn btn-dx"  @click="showrefund(x.order.orderNo)" v-if="x.order.orderStatus=='07'">退款退货</button>
                         </div>
                          </td> 
                          </tr>
                </tbody>
            </table>
             <div  class="flex-center" v-else>
						<img src="../../../assets/img/order_empty.png">
					<p>没有订单哦,<router-link :to="{path: '/index'}" >去首页看看</router-link></p>
				</div>
				 <Spin size="large" fix v-if="spinShow"></Spin>
				 		<!--退货-->
		  <Modal v-model="refundModal" width="500">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>申请退款</span>
        </p>
        <div style="text-align:center">
            <!--<p>退款原因</p>
            <p>  
            	<Select v-model="refundreason" style="width:200px">
			        <Option v-for="item in refundenums" :value="item.value" :key="item.value">{{ item.label }}</Option>
			    </Select>
            </p>-->
           
            <div class="refund"> <p>退款说明</p><textarea v-model="refundreason"></textarea></div>
        </div>
        <div slot="footer">
            <Button type="error" size="large" long  @click="refund">提交</Button>
        </div>
    </Modal>
					<Modal v-model="infoModal" width="500" :mask-closable="false">
			<p slot="header" style="color:#f60;text-align:center">
				<Icon type="ios-information-circle"></Icon>
				<span>填写物流单号</span>
			</p>
			<div>
				<div class="refund">
					<p>退款退货订单号</p><span>{{rfOrderNumer}}</span></div>
				<div class="refund">
					<p>物流单号</p><input placeholder="物流单号" v-model="expressNo">
				</div>
				<div class="refund">
					<p>物流公司</p><input placeholder="物流公司" v-model="logistics"></div>
			</div>
			<div slot="footer">
				<Button type="primary" size="large" long @click="submitLogisticsInfo">提交</Button>
			</div>
		</Modal>	 
        </div>
</template>

<script>
	import { formatDate } from '@/assets/js/date.js'
	export default {
	    data() {
	      return {
	      	infoModal: false,
	      	refundreason:'',
	      	refundModal:false,
	      	refundenums:[],
	      	spinShow:true,
	        cartList:[],
		    statusList:[],
		    pro:[],
		    refundorder:'',
		    	rfOrderNumer: '',
				expressNo: '',
				logistics: '',
	    	}
	   	 },
	   filters: {
	    formatDate(time) {
	    var date = new Date(time);
	    return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
	   }
	},
    methods: {
    	//				cancelrefund(value) {
//				this.$Modal.confirm({
//					content: '<p>确定取消该售后订单？</p>',
//					onOk: () => {
//						this.$axios({
//							method: 'post',
//							url: '/refund/cancel?refundOrderNo=' + value,
//						}).then((res) => {
//							if(res.code == '200') {
//								this.$Message.info(res.msg);
//								this.getRefundOrder();
//							} else {
//								this.$Message.info(res.msg);
//								this.getRefundOrder();
//							}
//						});
//					},
//					onCancel: () => {
//						this.$Message.info('放弃取消');
//					}
//				});
//			},
    			showLogisticsInfo(value) {
				this.infoModal = true,
					this.rfOrderNumer = value;
			},
						//提交物流信息
			submitLogisticsInfo() {
				var _this = this;
				_this.$axios({
					method: 'post',
					url: `/refund/submitLogisticsInfo?refundOrderNo=${_this.rfOrderNumer}&expressNo=${_this.expressNo}&logistics=${_this.logistics}`,
				}).then((res) => {
					if(res.code == '200') {
						_this.$Message.info(res.msg);
						_this.infoModal = false;
						_this.getOrder();
					} else {
						_this.$Message.error(res.msg);
						_this.infoModal = false;
						_this.getOrder();
					}
				});
			},
    	unitprice(p,q){
    		return p/q;
    	},
    	quzhifu(value){
    		this.$router.push({name:'/cartthree',query:{orderNo:value}});  
    	},
    	statusfilter(value){
    			for(var i = 0 ;i < this.statusList.length;i++){
					if(this.statusList[i].key == value){
						return this.statusList[i].value;
					}
				}
    	},
		seeDetail(value){
			this.$router.push({name:'/order/detail',params:{orderNo:value}});  
		},
		showrefund(value){
			this.refundModal=true
			this.refundorder=value;

		},
	
    	refund(){
	//refund/creare
			let _this=this;
            this.$axios({
			    method: 'post',
			    url:`/refund/creare?orderNo=${_this.refundorder}&remarks=${_this.refundreason}`,
			   // data:{orderNo:_this.refundorder,remarks:_this.refundreason}
			}).then((res)=>{
				if(res.code=='200'){
					  this.$Message.info(res.object);
					  this.getOrder();
				}
				else{
					  this.$Message.info(res.object);
					    this.getOrder();
				}
			});
                  
               
    	},
    	getStatusEnum(){
    			this.$axios({
						    method: 'get',
						    url:'/order/enums',
						}).then((res)=>{
							if(res.code=='200'){
							this.statusList = res.object;
							}
						});
						this.$axios({
						    method: 'get',
						    url:'/refund/enums',
						}).then((res)=>{
							if(res.code=='200'){
							this.refundenums = res.object;
							}
						});
    	},

    	  cancel(value){
                this.$Modal.confirm({
                    content: '<p>确定取消该订单？</p>',
                    onOk: () => {
                         		this.$axios({
					    method: 'post',
					    url:'/order/cancel/'+value,
					}).then((res)=>{
						if(res.code=='200'){
							  this.$Message.info(res.msg);
							  this.getOrder();
						}
						else{
							  this.$Message.info(res.msg);
							    this.getOrder();
						}
					});
                    },
                    onCancel: () => {
                        this.$Message.info('放弃取消');
                    }
                });
            },
         	  qianshou(value){
                this.$Modal.confirm({
                    content: '<p>确定签收该订单？</p>',
                    onOk: () => {
                      this.$axios({
					    method: 'post',
					    url:'/order/receive/'+value,
					}).then((res)=>{
						if(res.code=='200'){
							  this.$Message.info(res.msg);
							  this.getOrder();
						}
						else{
							  this.$Message.info(res.msg);
							 
						}
					});
                    },
                    onCancel: () => {
                        this.$Message.info('放弃签收');
                    }
                });
            },
	      getOrder(){
	      			this.$axios({
						    method: 'get',
						    url:'/order/list',
						}).then((res)=>{
							if(res.code=='200'){
								this.cartList = res.object;
								var ssss = this.cartList; 
							    this.pro = ssss; 
							}
							this.spinShow=false;
						});
			  },
	    },
         mounted() {
				this.getOrder();
				this.getStatusEnum();
		}
  }
</script>

<style scoped="scoped" lang="scss">
.order-tb{
	width: 100%;
}
.goods_title{
	float: left;
	width:300px;
	text-align: left;
}
.date{
	margin-left:10px ;
}
.right{
	float: right;
}
.orderitem-tb{
	margin-top: 20px;
}
.orderitem-tb .toptitle{
	background:#efefef;
}
.toptitle td{
	text-align: left;
}
.btn{
background:#fff;
    border: 1px solid #333;
    padding: 2px;
    cursor: pointer;
    }
    .btn:hover{
    	background: #f3f3f3;
    }
    .btn-dx{
    	border-color:#0099ff;
    	color:#0099ff;
    }
    .refund{
    	display: flex;
    	p{
    		width: 100px;
    	}
    	textarea{
    		width: 300px;
    		min-height: 60px;
    	}
    }
</style>