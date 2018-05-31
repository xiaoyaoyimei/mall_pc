<template>
        <div>
            <table class="order-tb">
              <thead>
                  <tr>
                  	<th >商品</th>
                  	<th width='100'>单价</th>
                  	<th  width='100'>数量</th>
                  	<th width='200'>状态</th>
                   <th  width='100'>操作</th></tr>
              </thead>
                <tbody v-for="(x,index) in cartList" :key="index">
                  <tr class="hidden_border">
                  	<td  colspan="5">
                  		<span>订单号：{{x.order.orderNo}}</span><span class="date">{{x.order.createTime | formatDate}}</span>  
                  </td>
                  </tr>
                  <tr  v-for="(child,i) in x.orderItems" :key="i">
                      <td>
                              <div class="goods_pic">
                              	<a href="javascript:void(0)"><img :src="child.productItemImg | imgfilter" alt=""></a>
                                 <div class="goods_title"> <p >{{child.productTitle}}</p>
                                <p>{{child.productAttrs}}</p>
                                </div>
                              </div>
                        </td>
                        <td> {{child.quantity}}</td>
                          <td> ￥{{child.orderFee}}</td>
                          <td>  {{statusfilter(x.order.orderStatus)}}
                          	<br/>
                          	<router-link :to="{name:'/order/detail',query:{orderNo:x.order.orderNo}}">订单详情</router-link>
                          </td>
                          <td >
                         
                            <div  v-if="x.order.orderStatus=='01'">
                            <a   @click="quzhifu(x.order.orderNo)">立即支付</a>
                            <a  id="${result.order_no}" href="javascript:void(0);" >取消订单</a>  
                            </div>
                          </td>  
                          
                  </tr>
                </tbody>
            </table>
        </div>
</template>

<script>
	import { formatDate } from '@/assets/js/date.js'
export default {
    data() {
    	 const temp=[] ;
      return {
        cartList:[],
       statusList:[]
    	}
   	 },
   	     filters: {
    formatDate(time) {
    var date = new Date(time);
    return formatDate(date, 'yyyy-MM-dd hh:mm');
   }
},
    methods: {
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
    	getStatusEnum(){
    			this.$axios({
						    method: 'get',
						    url:'/order/enums',
						}).then((res)=>{
							if(res.code=='200'){
							this.statusList = res.object;
							}
						
						});
    	},
	      getOrder(){
	      			this.$axios({
						    method: 'get',
						    url:'/order/list',
						}).then((res)=>{
							if(res.code=='200'){
								this.cartList= res.object;
							}
							
						});
	     	 }
	    },
         mounted() {
				this.getOrder();
				this.getStatusEnum();
		}
  }
</script>

<style scoped="scoped" lang="scss">
table {
    border-collapse: collapse;
    border-spacing: 0;
}
.order-tb thead{
	    border: 1px solid #e9e9e9;
    background-color: #fafafa;
    text-align: center;
    font-size: 12px;
    color: #999;
    line-height: 40px;
    height: 40px;
}

    .goods_pic a{
    	display: block;
    	float: left;
    }
    .goods_pic img{
    width: 120px;
    box-sizing: border-box;
    }
    .order-tb tbody {
    color: #333;
    background-color: #fff;
    text-align: center;
}
 .order-tb tbody  td{
 	border: 1px solid #e9e9e9;
 	padding:  20px;
 }
  .order-tb tbody .hidden_border{
    height: 40px;
    vertical-align: middle;
    border: 1px solid #e9e9e9;
    background-color: #fff;
    color: #333;
    font-size: 12px;
    position: relative;
    text-align: left;
    }
      .order-tb tbody .hidden_border td{
      	   padding: 0 20px 0 20px;
      }
.goods_title{
	float: left;
	width:300px;
	text-align: left;
}
.date{
	margin-left:10px ;
}
</style>