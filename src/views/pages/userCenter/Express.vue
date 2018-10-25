<template>
	<div>

		<span class="status">已签收</span>

		<div class="logistics">

			<ul class="logisticsText" >

				<li class="clearfix" v-for="(item,index) in expressList" :key="index">

					<p class="logisticsTime">{{item.date}}</p>

					<p class="logisticsaddress">

						<span>【{{item.addr}}】{{item.remark}}</span>


					</p>

				</li>



			</ul>

			<div class="logisticsdetail">
				<p>运单号码： {{expressNo}} 物流公司： {{logistics}} </p>
				<p>发货地址： 江苏省无锡市惠山区五彩科技大厦</p>
				<!--<p>收货地址： 江苏省无锡市新吴区 000000 张晓明 158****5858</p>-->
			</div>

		</div>

	</div>

</template>

<script>
	export default {
		data() {
			return {
				expressList: [],
				orderNo:'',
				expressNo:'',
				logistics:''
			}
		},
		methods: {
			getList() {
				this.$axios({
					method: 'post',
					url: `/order/getRoute/${this.orderNo}`,
				}).then((res) => {
					this.expressList = res;
				});
			},
		},
		mounted() {
			this.orderNo=this.$route.query.orderNo;
			this.expressNo=this.$route.query.expressNo;
			this.logistics=this.$route.query.logistics;
			this.getList();
		},
	}
</script>

<style scoped="scoped">
	.status {
		display: block;
		font-weight: 400;
		font-size: 13px;
		color: #333333;
		text-align: center;
		width: 161px;
		height: 36px;
		line-height: 36px;
		background-color: #c6c6c6;
		margin-top: 40px;
	}
	
	.logistics {
		margin-top: 15px;
		border-top: 1px solid #c6c6c6;
	}
	
	.logisticsTime {
		float: left;
		width: 150px;
		font-weight: 400;
		font-size: 14px;
		color: #666666;
		line-height: 48px;
	}
	
	.logisticsaddress {
		float: left;
		width: 700px;
	}
	
	.logisticsaddress span {
		width: 100%;
		font-weight: 400;
		font-size: 14px;
		color: #666666;
		line-height: 48px;
	}
	
	.newcenterbody .logisticsText {
		padding-top: 20px;
		padding-bottom: 20px;
	}
	
	.newcenterbody .logisticsText p:hover {
		color: #666666;
	}
	
	.logisticsdetail {
		margin: 4px 0px;
		border-top: 1px solid #c6c6c6;
		padding-top: 45px;
	}
</style>