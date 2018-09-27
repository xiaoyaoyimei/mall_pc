<template>
	<div class="eval-page">
		<h3>我的评价<span class="span">评价详情 快乐的你分享完美的使用心得~</span></h3>
		<ul class="evaluate"  v-if="evaluateList.length>0">
			<li class="li clearfix" v-for="(item,index) in evaluateList" :key="index">
				<div class="evaluateImg">
					<img :src="item.list.iconUrl" alt="">
					<span>{{item.list.productItemNo}}</span>
					<span class="fubiao">{{item.list.productTitle}}</span>
					<span class="">￥{{item.list.productFee}}</span>
					<!--   <span class="red">活动信息展示区域</span>-->
				</div>
				<div class="evaluateText">
					<!--<div class="zan">
						<span class="fr">
							<i class="icon-new icon-zan" :class="{'icon-zan-active':item.isZan=='Y' }" @click='zan(item.list.id,item.isZan)' ></i>
							{{item.number}}</span>
					</div>-->
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
						{{item.list.commentTime  | formatDate}} <!--<i class="cartIcon iconIcon-del"></i>-->
					</div>
				</div>
			</li>
		</ul>
		<div class="myorderempty "  v-else >
			<i class="cartIcon iconIcon-order"></i>
			<div><h6>暂无记录~</h6>
				<router-link  to="/sort" >购物建议</router-link>
				<router-link  to="/sort" >去下单</router-link>
			</div>
		</div>
	</div>

</template>

<script>
	import { formatDate } from '@/assets/js/date.js'
	export default {
		data() {
			return {
				evaluateList: [],
			}
		},
			filters: {
			formatDate(time) {
				var date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
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
					Like = 'Y'
				} else {
					Like = 'N'
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
		background-color: #f2f2f2;
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
	}
	
	.evaluateImg img {
		height: 175px;
		margin-bottom: 10px;
	}
	
	.evaluateImg span {
	padding: 0px;
    display: block;
    width: 100%;
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
		height: 60px;
		margin-right: 15px;
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
</style>
<style>

</style>
