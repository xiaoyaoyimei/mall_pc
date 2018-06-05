<template>
	<div class="sort">
	<div class="main-wdith mt20">
        <ul class="search_list_wrap clearfix">
             <li  v-for="(item, index) in productNew" :key='index'>
               <router-link :to="{ path: '/sort/sortDetail',query:{id:item.id} }" tag="a" class="category_cover">
                     <img :src=' item.model_img |imgfilter'>
                </router-link>
                <div  class="title">
                      {{item.model_no}}
                </div>
                <div class="name">{{item.model_name}}</div>
                <div v-if="item.promotionTitle !=null" class="sku_tag ">{{item.promotionTitle}}</div> 
                  <div class="price">
                        {{item.sale_price}}
                   </div>
            </li>
            </ul>
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