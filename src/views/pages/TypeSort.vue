<template>
	<div>
		<div class="m_header_bar">
			<router-link to="/index"  class="m_header_bar_back"><Icon type="ios-arrow-back"></Icon></router-link>
			<span class="m_header_bar_title">分类页</span>
		</div>
		<div class="floor">
				<div   class="spdetail"    v-for="(item, index) in productNew" :key='index'>
							<router-link :to="{ path: '/sort/sortDetail',query:{id:item.id} }">
								<img  :src='item.model_img |imgfilter'>
							   <div>	<p class="sP">{{item.model_name}}
								</p>
								<p>{{item.type_name}}</p>
								<p>
									<span v-if="item.promotionTitle !=null" class="promotion">{{item.promotionTitle}}</span>
									<span v-else></span>
								</p>
								<h6 class="sh6">{{item.sale_price}}</h6>
								</div>
							</router-link>
						</div>
	   		<!--<Row  class="goodslist">
				<Col  :xs="12"  :md="6"  v-for="(item,index) in productNew" :key="index">
							<img  :src='item.model_img |imgfilter'>
						<a title="">{{item.model_name}}</a>
						<h4 class="color-dx">￥{{item.sale_price}}</h4>
				</Col>
			</Row>-->
	    </div>
	</div>
</template>
	
<script>
	export default {
        data () {
            return {
                productNew:[],
                startRow:0,
				pageSize:10,
            }
        },
        methods: {
    	     getNewChannel(){
    	     let type = this.$route.params.type;
    	     this.$axios({
						    method: 'GET',
						    url:'/product/type?id='+type+'&startRow='+this.startRow+'&pageSize='+this.pageSize,
						}).then((res)=>{
							 this.productNew=res.itemsList;
						});
						
    	      	},
    	},
        mounted() {
			this.getNewChannel();
		}
    }
</script>
<style>
</style>