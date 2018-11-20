<wxs module="filters" src="../filters.wxs"></wxs>

<view class="stext">
	<view>{{statusfilter(refundOrderdetail.shoppingRefundOrder.refundOrderStatus)}}</view>
	<view>申请时间:{{filters.formatTime(refundOrderdetail.shoppingRefundOrder.createTime)}}</view>
	<view>退款金额:￥ {{filters.toFix(refundOrderdetail.shoppingRefundOrder.refundOrderTotalFee)}}</view>
</view>
	<view>订单编号：{{orderdetail.shippingOrder.orderNo}}</view>
	<view>成交时间：{{filters.formatTime(orderdetail.shippingOrder.createTime)}}</view>
	<view>商品总价：{{filters.toFix(orderdetail.shippingOrder.productFee))}}</view>
	<view>活动优惠：-￥<text wx:if="{{orderdetail.shippingOrder.discountFee!=''}}">{{filters.toFix(orderdetail.shippingOrder.discountFee)}}</text>
		<text v-else>0</text>
	</view>
	<view>运费：￥<text wx:if="{{orderdetail.shippingOrder.postageFee!=''}}">{{filters.toFix(orderdetail.shippingOrder.postageFee)}}</text>
		<text wx:else>0.00</text></view>

	<view>应付总额：￥{{filters.toFix(orderdetail.shippingOrder.orderTotalFee)}}</view>
	<view>退款编号：{{refundOrderdetail.shoppingRefundOrder.refundOrderNo}}</view>
	<view>退款金额：￥{{filters.toFix(refundOrderdetail.shoppingRefundOrder.refundOrderTotalFee)}}</view>
	<view>要求：{{refundOrderdetail.shoppingRefundOrder.remarks}}</view>
	<view>退货快递：{{refundOrderdetail.shoppingRefundOrder.logistics}}</view>
	<view>退货单号：{{refundOrderdetail.shoppingRefundOrder.expressNo}}</view>