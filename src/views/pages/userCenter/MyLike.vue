<template>
<ul class="clearfix mylike">
                            <li v-for="(item,index) in likeList" :key="index">
                                <span @click="deletelike(item.id)" >❤</span>
                                <router-link :to="{ path: '/sort/sortDetail',query:{id:item.product_id} }" >
                                <img :src="item.model_img | imgfilter" alt="">
                                <p class="ptitle">{{item.model_no}}</p>
                                <p class="pt">{{item.model_name}}</p>
                                <p class="red">{{item.sale_price | pricefilter}}</p>
                                </router-link>
                            </li>

                        </ul>
</template>

<script>
		 export default {
    data () {
      return {
      likeList:[],
      }
    },
    methods: {
    	getLike(){
    		  	     	this.$axios({
						    method: 'post',
						    url:'/like',
						}).then((res)=>{
                             this.likeList=res;
						});
    	},
    	deletelike(v){
    			     	this.$axios({
						    method: 'post',
						    url:`/like/delete/${v}`,
						}).then((res)=>{
							if(res.code='200'){
								this.getLike();
							}
						});
    	}
  
    },
    	mounted() {
			this.getLike();
	},
   }
</script>

<style scoped="scoped">
            .mylike li{
                float: left;
                width:200px;
                margin-right: 20px;
                position: relative;
                margin-top: 30px;
            }
            .mylike li:nth-of-type(4n){
                margin-right: 0px;
            }
            .mylike img{
                width: 200px;
                height: 200px;
            }
            .mylike li span{
                position: absolute;
                top: 5px;
                right: 5px;
                color: #ff0000;
                font-weight: 400;
                font-size: 18px;
                border: none;
                padding: 0px;
                cursor: pointer;
            }
             .mylike li span.active,   .mylike li span:hover{
             	color:#666
             }
            .mylike .ptitle{
                font-weight: 400;
                font-size: 14px;
                text-align: center;
                color: #333333;
                height: 21px;
                line-height: 21px;
                margin: 0px;
                padding: 0px;
            }
            .new .mylike .ptitle:hover{
                color: #333333;
            }
            .mylike .pt{
                font-weight: 400;
                font-size: 14px;
                text-align: center;
                color: #999999;
                height: 21px;
                line-height: 21px;
                margin: 0px;
                padding: 0px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .new .mylike .pt:hover{
                color: #999999;
            }
            .new .mylike .red:hover{
                color: #FF0000;
            }
            .mylike .red{
                height: 21px;
                line-height: 21px;
                margin: 0px;
                padding: 0px;
                font-weight: 400;
                font-style: normal;
                font-size: 14px;
                color: #FF0000;
                text-align: center;
                margin-top: 8px;
            }
		
</style>