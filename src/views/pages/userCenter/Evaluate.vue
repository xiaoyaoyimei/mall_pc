<template>
	<div class="eval-page">
		<h3>我的评价<span class="span">评价详情 快乐的你分享完美的使用心得~</span></h3>
		<ul class="evaluate"  v-if="evaluateList.length>0">
			<li class="li clearfix" v-for="(item,index) in evaluateList" :key="index">
				<div class="evaluateImg">
					<img :src="item.shippingOrderItems.productItemImg | imgfilter" alt="">
					<span>{{item.list.productItemNo}}</span>
					<span class="fubiao">{{item.list.productTitle}}</span>
					<span class="">￥{{item.list.productFee |pricefilter}}</span>
					<!--   <span class="red">活动信息展示区域</span>-->
				</div>
				<div class="evaluateText">
					<div class="fabulous">
						{{item.number}} 
						<i class="cartIcon iconIcon-zan-gray"  :class="{'iconIcon-zan-red':item.isZan=='Y' }" @click='zan(item.list.id,item.isZan)'></i>
					</div>
					<div class="fabulousText">
						{{item.list.commentContent}}
					</div>
					<div class="fabulousImg">
						<img :src="child | imgfilter" v-for="(child, index) in item.imgList">
					</div>
					<div class="fabulousTime">
						{{item.list.commentTime  | formatDate('yyyy-MM-dd hh:mm:ss')}} <!--<i class="cartIcon iconIcon-del"></i>-->
					</div>
				</div>
			</li>
		</ul>
		<div class="myorderempty "  v-else >
			<img src="../../../assets/img/eval.png">
			<div><h6>暂无任何评价记录~</h6>
				<router-link  to="/" >去首页</router-link>
			</div>
		</div>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				evaluateList: [],
			}
		},
		methods: {
			getEvaluate() {
				this.$axios({
					method: 'get',
					url: '/comment/mysearch',
				}).then((res) => {
					if(res.code == "200") {
						this.evaluateList = res.object;
					}
				});
			},
			//点赞
			zan(value, isZan) {
				let zanid = value;
				let Like = isZan;
				if(Like == 'N') {
					Like = 'yes'
				} else {
					Like = 'no'
				}
				this.$axios({
					method: 'post',
					url: `/comment/beLike/${zanid}/${Like}`,
				}).then((res) => {
					if(res.code == '200') {
						this.getEvaluate()
					}
				})
			},
			//删除评论
			
		},
		mounted() {
			this.getEvaluate();
		}
	}
</script>

<style  scoped="scoped">
	.eval-page {
		background-color: #f4f6f8;
	}
	
	.eval-page h3 {
		padding: 25px 40px;
		font-weight: 400;
		font-size: 24px;
		color: #333333;
		background-color: #ffffff;
		border: none;
		margin-bottom: 10px;
	}
	
	.span {
		display: inline;
		padding-left: 35px;
		font-weight: 400;
		font-size: 16px;
		color: #666666;
	}
	
	.evaluate {
		padding: 0px;
	}
	
	.evaluate .li {
		margin-bottom: 10px;
		background-color: #ffffff;
		padding: 40px 60px;
	}
	
	.evaluateImg {
		float: left;
		width: 260px;
		text-align: center;
		border-right: 1px solid #e1e1e1;
		position: relative;
		left: -40px;

	}
	
	.evaluateImg img {
		max-height: 175px;
		max-width:175px;
		margin-bottom: 10px;
	}
	
	.evaluateImg span {
	padding: 0px;
    display: block;
    width: 90%;
    text-align: center;
    font-weight: 400;
    font-size: 14px;
    height: 25px;
    line-height: 25px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
	.evaluateImg .fubiao {
		color: #666666;
	}
	
	.evaluateImg .red {
		margin-top: 15px;
		color: #ff0000;
	}
	
	.evaluateText {
		float: left;
		width: 530px;
		padding-left: 60px;
	}
	
	.evaluateText .fabulous {
		float: right;
		font-weight: 400;
		font-size: 16px;
		color: #000000;
	}
	
	.fabulousText {
		margin-top: 30px;
		font-weight: 400;
		font-size: 14px;
		color: #666666;
		line-height: 24px;
		height: 144px;
		overflow: hidden;
	}
	.fabulous i{
		cursor: pointer;
	}
	.fabulousImg {
		margin-top: 15px;
	}
	
	.fabulousImg img {
		max-height: 60px;
		max-width: 60px;
		margin-right: 15px;
		margin-bottom: 15px;
	}
	
	.fabulousTime {
		margin-top: 30px;
		font-weight: 400;
		font-size: 14px;
		color: #999999;
		line-height: 16px;
	}
	
	.fabulousTime i {
		float: right;
	}
	.eval-page .myorderempty {
		background-color: #ffffff;
		margin-top: 10px;
	}
	.myorderempty img{
		width: 64px;
		height: 64px;
	}
</style>
