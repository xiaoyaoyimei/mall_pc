 <template>
        <div>
            <table class="order-tb" >
              <thead>
                  <tr>
                  	<th width='100'>主图</th>
                  	<th >商品</th>
                  	<th width='100'>单价</th>
                  	<th  width='100'>数量</th>
                  	<th width='100'>总价</th>
                  	<th width='100'>状态</th>
                   <th  width='100'>操作</th></tr>
              </thead>
              </table>
              <table class="order-tb orderitem-tb" v-for="(x,index) in cartList" :key="index">
                <tbody >
                  <tr class="title">
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
                          <td  width='100'> {{child.quantity}}</td>
                          <td  width='100'> ￥{{child.orderFee| pricefilter}}</td>
                           <td  width='100'> 
                          	<router-link :to="{name:'/order/detail',query:{orderNo:x.order.orderNo}}" v-if="i==0">订单详情</router-link>
                          </td>
                          <td    width='100'>
                          	<div v-if="i==0">
                            <div  v-if="x.order.orderStatus=='01'">
                            <a   @click="quzhifu(x.order.orderNo)">立即支付</a>
                            <a  id="${result.order_no}" href="javascript:void(0);" >取消订单</a>  
                            </div>
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
    return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
   }
},
    methods: {
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
.orderitem-tb .title{
	background:#efefef
}
</style>