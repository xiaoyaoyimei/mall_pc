<template>
<div class="layout">
        <Layout>
             <app-header></app-header>
            <Layout >
                <Content class='layout' :style="{ minHeight: '280px',marginTop:'24px'}">
					<div class="user">
					
						<div class="C_main clearfix">
							<div class="C_info center">

								<div class="C_option fl">
									<ul>
										<li class="customer C_select"><router-link :to="{path: '/user/myinfo'}">更多个人信息 <i class="C_arrow"></i></router-link> </li>
										<li class="shipp_Address"><router-link :to="{path: '/user/address'}">收货地址 <i></i></router-link> </li>
										<li class="my_order"><router-link :to="{path: '/user/orderlist'}">我的订单 <i></i></router-link> </li>
										<!-- <li class="my_APIorder"><router-link :to="{path: '/user/hostoryorderlist'}">历史消费订单 <i></i></router-link></li> -->
										<li class="my_event"><router-link :to="{path: '/user/mycoupon'}">我的优惠券 <i></i></router-link> </li>
										<li class="my_event"><router-link :to="{path: '/user/couponcenter'}">领劵中心 <i></i></router-link> </li>
										<li class="my_vote"><router-link :to="{path: '/user/mylove'}">我的收藏 <i></i></router-link> </li>
										<!-- <li class="my_invoice">在线客服 <i></i> </li>
										<li class="my_question">关于我们 <i></i> </li> -->
									</ul>
								</div>
								<div class="C_detail hidden">
									<ul class="C_deList">
										<li class="C_module">
											<div id="myDx">
												<router-view/>
											</div>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
                </Content>
            </Layout>
             <app-footer></app-footer>
        </Layout>
    </div>
</template>

<script>
import AppHeader from '@/components/Header'
import AppFooter from '@/components/Footer'
import AppMenu from '@/components/Menu'
	export default {
	    data () {
	        return {
	        	userinfo:{
					 iconUrl: '',
					  },
				spanLeft: 5,
                spanRight: 19
	        }
		  },
		components:{
        	AppHeader,
        	AppFooter,
        	AppMenu
        },
	      methods:{
	      	getUser(){
	      				this.$axios({
					    method: 'post',
					    url:'/account',
					}).then((res)=>{
						this.userinfo = Object.assign({},res.data);
					});
			  },
			  toggleClick () {
                if (this.spanLeft === 5) {
                    this.spanLeft = 2;
                    this.spanRight = 22;
                } else {
                    this.spanLeft = 5;
                    this.spanRight = 19;
                }
			},
			height(){
				var height=  document.getElementsByClassName("C_module")[0].offsetHeight +"px";
				document.getElementsByClassName("C_detail")[0].style.cssText="height:"+height;
			}      
			 },
	      mounted(){
			this.getUser();
			this.height();
		  },
		  computed: {
            iconSize () {
                return this.spanLeft === 5 ? 14 : 24;
            }
        },
    }
</script>

<style lang="scss"> 
 @import '@/styles/color.scss';
 /*头部样式*/
.user-header a{
	color:#fff;
}
.user{
	width:100%;
	max-width:1100px;
	margin: 0px auto;
}
.C_main {
	margin-top: 20px;
	padding-bottom: 50px;
}
.clearfix:after {content: "."; display: block; height:0; clear:both; visibility: hidden;}
.clearfix { *zoom:1; }
.fl{
	float:left;
}
.C_main .C_info .C_option {
	height: 500px;
	width: 126px;
}
.hidden{
	overflow:hidden;
}
.C_module{
	display:block!important;
}
.C_main .C_info .C_option ul li {
	font-size: 12px;
	line-height: 30px;
	height: 30px;
	background-color: #e7e7e7;
	margin-bottom: 6px;
	text-indent: 1em;
	cursor: pointer;
	position: relative;
	border-bottom-radius: 3px;
	border-bottom-left-radius: 20px;
	text-shadow: 1px;
	box-shadow: 1px 3px 0px rgba(0, 0, 0, .2);
}
.C_main .C_info .C_option ul li i {
	border-width: 6px;
	border-style: solid;
	border-color: transparent transparent transparent #999;
	position: absolute;
	top: 10px;
	right: 0px;
}
.C_main .C_info .C_option ul li .C_arrow {
	border-color: #e1e1e1  transparent transparent transparent ;
	position: absolute;
	top: 12px;
	right: 6px;
}
.C_main .C_info .C_detail {
	position: relative;
}
.C_main .C_info .C_detail > ul > li {
	padding: 36px;
	padding-top: 0;
	position: absolute;
	top: 0;
	left: 0;
	display:block;
}
.C_main .C_info .C_detail > ul > li ul > li {
	height: 26px;
}
.C_changePass table td {
	line-height: 34px;
}
.tabs .ha .ivu-col-span-6{
	color:#E50011;
	background-color:$color-white;
}
a{
	color:#555!important;
}
.C_select {
    background-color: #E50011 !important;
    color: #fff;
}
.C_select a{
	color: #fff!important;
}
.C_main .C_info .C_option ul li .C_arrow {
    border-color: #e1e1e1 transparent transparent transparent;
    position: absolute;
    top: 12px;
    right: 6px;
}
</style>