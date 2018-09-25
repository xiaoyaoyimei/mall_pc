<template>
	<div class="newcenter">
		<h3>消息通知</h3>
		<ul>
			<li class="cartIcon icon-newli" v-for="(item,index) in newsList" :key="index">
				<p>[上新] 系统消息系统消息系统消息系统消息系统消息系统消息系统消息系统消息系统消消息
					<span>2018年9月14日13:18:54</span></p>
			</li>
			<li>
				<p>[调整] 系统消息系统消息系统消息系统消息系统消息系统消息系统消息系统消息系统统消息 <span>2018年9月14日13:18:54</span></p>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				newsList: [],
			}
		},
		methods: {
			getNews() {
				this.$axios({
					method: 'post',
					url: '/like',
				}).then((res) => {
					this.newsList = res;
				});
			}
		},
		mounted() {
			this.getNews();
		},
	}
</script>

<style scoped="scoped">
.newcenter ul{
    padding: 50px 0px;
}
.newcenter ul p{
    font-weight: 400;
    font-size: 14px;
    color: #666666;
    padding-top: 2px;
    text-indent: 0.75em;
}
.newcenter ul span{
    float: right;
    padding-right: 37px;
}
.newcenter ul p:hover{
    color: rgb(51, 51, 51);
}
icon-newli{
	 background-position: -153px -348px;
}
/*.newcenter .newli{
    list-style-type:none;
    background:url("../image/icon.png") no-repeat 0rem 0.3rem;
    background-position: -153px -348px;
}*/
</style>