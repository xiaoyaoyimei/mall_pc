<template>
    <div class="new_header">
       <div class="inner clearfix">
       	<div class="main-wdith">
       	 <router-link  to="/index" class="logo"><img src="../assets/img/logo.png"></router-link>
        </div>
    </div>
    </div>

</template>
<script>
   // 引入公共的bug，来做为中间传达的工具
	import Bus from '@/assets/js/bus.js'
	 export default {
        data () {
            return {}
            	
        },

    }
</script>

<style scoped="scoped"  lang="scss">
.new_header{
	background: #191919;
}
.inner{
	padding-top: 15px;
	.logo{
		float: left;
	}
}
</style>
<style> 
.new_header	 .ivu-input{
    	height: 40px;
    	line-height:40px;
    	width:267px;
    	border-radius: 0;
    }
 .new_header   .ivu-form .ivu-form-item-label{
    		font-size: 15px;
    	color:#999
    }
</style>
