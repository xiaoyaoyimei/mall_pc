<template>
	<div class="sort">
	<div  class="flex-center" v-if="proList.length<1">
			<img src="../../assets/img/activity_empty.png">
			<p>暂无活动, 敬请期待</p>
		</div>
	<div class="main-wdith mt20">
        <ul class="search_list_wrap clearfix">
                   <li  v-for="(item, index) in proList" :key='index'>
			               <router-link :to="{ path: '/sort/sortDetail',query:{id:item.id} }" >
			                     <img :src=' item.model_img |imgfilter'>
			                </router-link>
			                <div  class="title">
			                      {{item.model_no}}
			                </div>
			                <div class="name">{{item.model_name}}</div>
			                <div v-if="item.promotionTitle !=null" class="sku_tag ">{{item.promotionTitle}}</div> 
			                  <div class="price">
			                                             ￥ {{item.sale_price|pricefilter}}
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
                proList:[],
            }
        },
        methods: {
    	     getNewChannel(){
			    	      this.$axios({
			        method: "GET",
			        url: "/index/index/product"
			      }).then(res => {
			        if (res.code == "200") {
			          this.proList = res.object;
			        }
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