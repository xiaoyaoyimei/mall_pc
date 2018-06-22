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

<style   lang="scss">
	.w-bai{
	width: 300px;
}
.new_header{
	background: #191919;
}
.inner{
	padding-top: 15px;
	.logo{
		float: left;
	}
}
.R-check{
			position: absolute;
			right: 0px;
			top: 0px;
			background-color: #fff;
			height: 40px;
			border-radius: 0;
		}
.flex-center-h{
	display: flex;
	justify-content: center;
	align-items: center;
}
.login_wrap {
    width: 380px;
    padding: 9px 38px 38px;
    background-color: #fff;
    border: 1px solid #d6d6d6;
    box-shadow: 0px 0px 4px 0px #d6d6d6;
    border-radius: 2px;
		.div{
			.lTitle{
				margin-bottom: 15px;
				font-size: 16px;
				margin-top: 20px;
			}
			.ul{
				overflow: hidden;
				border-bottom: 1px solid #eeeeee;
				.li{
					float: left;
					width: 60px;
					height: 65px;
					img{
						width: 49px;
						height: 49px;
					}
				}
			}
			.loginInput{
				width: 300px;
			}
			.login-link{
				a{
					color:#999;
				}
				a:hover{
					color:#0092d8;
				}
				.resetPassword{
					float: right;
				}
			}
		}
}
		.login_wrap_main {
			height: 620px;
			.loginA{
				width: 560px;
				height: 485px;
				.aImg{
					height: 485px;
					border-radius: 50%;
				}
			}
		}
		.login-link{
			font-size: 14px;
		}
</style>
<style> 
.login_wrap_main  	 .ivu-input{
    	height: 40px;
    	border-radius: 0;
    }
 .login_wrap_main     .ivu-form .ivu-form-item-label{
    		font-size: 15px;
    	color:#999
    }
</style>
