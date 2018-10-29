<template>
	<div style="padding:40px;">
		<span class="status">{{orderStatus}}</span>
		<div class="logistics">
			<ul class="logisticsText" >
				<li class="clearfix" v-for="(item,index) in expressList" :key="index">
					<p class="logisticsTime" ><span v-if="item.show">{{item.date}}</span></p>
					<p class="logisticsaddress">
						<span>{{item.time}} &nbsp;&nbsp;&nbsp;&nbsp;【{{item.addr}}】&nbsp;{{item.remark}}</span>
					</p>
				</li>
			</ul>

			<div class="logisticsdetail">
				<p>运单号码： {{expressNo}} 物流公司： {{logistics}} </p>
				<p>发货地址： 江苏省无锡市江阴市青阳镇工业园区华澄路21号</p>
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
				logistics:'',
				orderStatus:''
			}
		},
		methods: {
			getList() {
				this.$axios({
					method: 'post',
					url: `/order/getRoute/${this.orderNo}`,
				}).then((res) => {
					this.expressList = res;
					for (let index = 0; index < this.expressList.length; index++) {
						if(index >0){
							if(this.expressList[index].date == this.expressList[index-1].date){
								this.expressList[index].show = false
							}else{
								this.expressList[index].show = true
							}
						}else{
							this.expressList[index].show = true
						}
					}
				});
			},
		},
		mounted() {
			this.orderNo=this.$route.query.orderNo;
			this.expressNo=this.$route.query.expressNo;
			this.logistics=this.$route.query.logistics;
			this.orderStatus=this.$route.query.orderStatus;
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
		padding-top: 2px;
		text-indent: 0.75em;
	}
	
	.logisticsaddress {
		float: left;
		width: 700px;
		height: 48px;
		line-height: 48px;
		overflow: hidden;
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
	.newcenter p {
		font-weight: 400;
		font-size: 16px;
		color: #666666;
		margin-bottom: 16px;
	}
</style>