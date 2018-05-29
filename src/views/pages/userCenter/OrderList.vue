<template>
	<div class="order">
    <h4 class="C_deListTit">我的订单</h4>
    <div class="C_orderList">
        <div class="C_ot clearfix">
            <ul>
                <li><a href="javascript:void(0);" class="a_order_status active">全部订单</a></li>
                <li><a href="javascript:void(0);" class="a_order_status">待付款</a></li>
                <li><a href="javascript:void(0);" class="a_order_status">已付款</a></li>
                <li><a href="javascript:void(0);" class="a_order_status">已发货</a></li>
            </ul>
            <div class="C_otR fr"><input type="text" placeholder="订单号" id="order_no"><a href="javascript:void(0);" class="a_order_no"><i></i></a></div>
        </div>
        <div class="c_oc clearfix content">
            <table>
              <thead>
                  <tr><th class="left">订单详情</th><th class="left" width='100'>收货人</th><th class="left" width='100'>金额</th><th class="left" width='200'>状态</th></tr>
              </thead>
                <tbody>
                  <tr class="C_trth"><td ><span class="createTime">1018-05-20 00:00:00</span> <span>订单号：2012121243545645</span> 
                      <span>快递公司：摄魂风</span> <span> 快递单号：4546544521321531</span><span> 发货日期：0.0.212121</span>
                  </td><td></td><td></td><td></td><td><i></i></td></tr>
                  <tr class="C_trbd">
                      <td>
                          <div>
                              <div class="fl tr_img"><a href="#"><img src="../../../assets/img/a1.png" alt=""></a></div>
                              <div class=" fl tr_imginfo">
                                  <h3>DX定制男士套头卫衣1631S08-DX</h3>
                                <span>颜色:DX定制外套<br>尺码:165</span>
                              </div>
                              <div class="tr_QTY fl ">
                                  x2
                              </div>
                          </div>
                        </td>
                        <td>
                            <div class="C_infocontect">
                            <span class="C_infoName">
                              的速度
                            </span><b></b>                      
                            </div>
                        </td>
                          <td>
                              ￥100.00<br></td>
                          <td class="orderStatus">
                           待付款<p></p>
                            <div class="C_buyNow">
                            <a  href="">立即支付</a>
                            <a  id="${result.order_no}" href="javascript:void(0);" class="cancelOrder">取消订单</a>  
                            </div>
                          </td>  
                  </tr>
                </tbody>
                                <tbody>
                  <tr class="C_trth"><td ><span class="createTime">1018-05-20 00:00:00</span> <span>订单号：2012121243545645</span> 
                      <span>快递公司：摄魂风</span> <span> 快递单号：4546544521321531</span><span> 发货日期：0.0.212121</span>
                  </td><td></td><td></td><td></td><td><i></i></td></tr>
                  <tr class="C_trbd">
                      <td>
                          <div>
                              <div class="fl tr_img"><a href="#"><img src="../../../assets/img/a1.png" alt=""></a></div>
                              <div class=" fl tr_imginfo">
                                  <h3>DX定制男士套头卫衣1631S08-DX</h3>
                                <span>颜色:DX定制外套<br>尺码:165</span>
                              </div>
                              <div class="tr_QTY fl ">
                                  x2
                              </div>
                          </div>
                        </td>
                        <td>
                            <div class="C_infocontect">
                            <span class="C_infoName">
                              的速度
                            </span><b></b>                      
                            </div>
                        </td>
                          <td>
                              ￥100.00<p></p></td>
                          <td class="orderStatus">
                           待付款<p>
                            <div class="C_buyNow">
                            <a  href="">立即支付</a>
                            <a  id="${result.order_no}" href="javascript:void(0);" class="cancelOrder">取消订单</a>  
                            </div>
                          </td>  
                  </tr>
                </tbody>
                                <tbody>
                  <tr class="C_trth"><td ><span class="createTime">1018-05-20 00:00:00</span> <span>订单号：2012121243545645</span> 
                      <span>快递公司：摄魂风</span> <span> 快递单号：4546544521321531</span><span> 发货日期：0.0.212121</span>
                  </td><td></td><td></td><td></td><td><i></i></td></tr>
                  <tr class="C_trbd">
                      <td>
                          <div>
                              <div class="fl tr_img"><a href="#"><img src="../../../assets/img/a1.png" alt=""></a></div>
                              <div class=" fl tr_imginfo">
                                  <h3>DX定制男士套头卫衣1631S08-DX</h3>
                                <span>颜色:DX定制外套<br>尺码:165</span>
                              </div>
                              <div class="tr_QTY fl ">
                                  x2
                              </div>
                          </div>
                        </td>
                        <td>
                            <div class="C_infocontect">
                            <span class="C_infoName">
                              的速度
                            </span><b></b>                      
                            </div>
                        </td>
                          <td>
                              ￥100.00<p></p></td>
                          <td class="orderStatus">
                           已取消
                          </td>  
                  </tr>
                </tbody>
            </table>
        </div>

    </div>
  </div>
</template>

<script>
export default {
    data () {
      return {
        name: ''
      }
    },
    methods: {
      getParams () {
        // 取到路由带过来的参数 
        let routerParams = this.$route.query.tabname
        // 将数据放在当前组件的数据内
        this.name = routerParams
      }
    },
    watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      '$route': 'getParams'
    },
    mounted() {
			this.getParams();
		}
  }
</script>

<style scoped="scoped" lang="scss">
.C_deListTit {
    border-bottom: 1px solid #e7e7e7;
    line-height: 36px;
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 900;
    max-width: 1100px;
}
.left{
  text-align:left;
}
.C_ot ul {
  float: left;
}
.C_ot ul li {
  float: left;
  padding-right: 20px;
}
.C_ot .C_otR input {
  float: left;
  width: 158px;
  height: 23px;
  line-height: 18px;
  padding: 2px 5px 3px;
  border: 1px solid #ccc;
}
.C_ot .C_otR a {
  position: relative;
  float: left;
  width: 52px;
  height: 23px;
  line-height: 99em;
  overflow: hidden;
  border: 1px solid #ddd;
  border-left: 0;
  text-align: center;
  background-color: #f7f7f7;
}
.C_ot .C_otR a i {
  position: absolute;
  left: 17px;
  top: 3px;
  display: inline-block;
  vertical-align: middle;
  width: 18px;
  height: 16px;
  overflow: hidden;
  background: url(../../../assets/img/spring1.png) no-repeat -150px -42px;
}
.c_oc table thead {
  line-height: 36px;
}
.c_oc table tbody .C_trbd img {
  width: 60px;
  height: 60px;
  margin: 0 14px;
}
.clearfix:after {content: "."; display: block; height:0; clear:both; visibility: hidden;}
.clearfix { *zoom:1; }
.fr{
    float: right;
}
.fl{
    float: left;
}
.order{
  max-width: 1100px;
  width:100%;
  margin: 0 auto;
  min-height:900px;
}
</style>
<style>
.C_main .C_info .C_detail > ul > li ul > li{
  line-height: 26px;
}
.active{
  border-bottom: 2px solid rgb(228, 57, 60);
}
a{
  color: #555;
}
.c_oc table thead {
  line-height: 36px;
}
.c_oc table tbody .C_trbd img {
  width: 60px;
  height: 60px;
  margin: 0 14px;
}
.icon_cancel {
  position: relative;
}
.icon_cancel i {
  position: absolute;
  left: 38px;
  top: 6px;
  display: none;
  width: 18px;
  height: 16px;
  background: url(../../../assets/img/spring1.png) no-repeat -150px -90px;
}
.icon_cancel i:hover {
  position: absolute;
  left: 38px;
  top: 6px;
  display: none;
  width: 18px;
  height: 16px;
  background: url(../../../assets/img/spring1.png) no-repeat -148px -70px;
  cursor: pointer;
}
.tr_imginfo {
  line-height: 18px;
  overflow: hidden;
  color: #333;
  text-align: left;
  width: 240px;
  margin-right: 34px;
  overflow:hidden;
  text-overflow:ellipsis;
}
.tr_imginfo h3{
	font-size:14px;
	white-space:nowrap;
	overflow:hidden;
	text-overflow:ellipsis;
}

.tr_QTY {
  line-height: 60px;
  margin: 0 40px;
}
.C_infocontect {
  position: relative;
}
.hideInfo {
  position: absolute;
  z-index: 1;
  width: 220px;
  right: 46px;
  top: -32px;
  padding: 15px 20px;
  display: none;
  color: #666;
  line-height: 22px;
  background: #f7f7f7;
  border: 1px solid #ddd;
  box-shadow: 0 0 2px 2px #eee;
}
.hideInfo div {
  right: 39px;
  top: -32px;
  position: absolute;
  right: -10px;
  top: 32px;
  z-index: 100;
  width: 11px;
  height: 20px;
  background: #fff url(../../../assets/img/spring1.png) no-repeat -152px -117px;
}
.hideInfo:hover {
  display: inline-block;
}
.C_trth {
  line-height: 26px;
  background: #e7e7e7;
}
.C_trbd td {
  height: 60px;
  padding: 14px 14px 14px 0 ;
}
.C_buyNow {
  padding-right: 0 !important;
}
.C_buyNow a {
  display: inline-block;
  padding: 2px 0 3px;
  background: #f5f5f5;
  border: 1px solid #ddd;
  color: #333;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
  width: 76px;
  text-align: center;
}
.createTime {
  margin-right: 10px;
}
</style>