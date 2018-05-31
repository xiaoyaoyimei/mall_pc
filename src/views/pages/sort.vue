<template>
	<div class="sort1">
        		<div class="header" @mouseleave="leave2">
                    <div class="inner">
                        <a class="site_logo" href="/?mtag=40005.1.10" title="美的"></a>
                        <!-- S 导航 -->
                        <div class="nav_wrap">
                            <ul class="nav" id="topNavWrap">
                                <!-- 美的商城_PC版_首页_顶部主导航 -->
                                <li class="item"><a class="item_tit"  href="#/index">首页</a></li>
                                <li class="item"><a class="item_tit"  href="#/sort">商品分类</a></li>
                                <li id="navInternal" style="display:none;" class="item"><a class="item_tit" target="_blank" href="/my/internal/?mtag=40005.1.11">美的员工福利频道</a></li>
                            </ul>
                        </div>
                        <!-- E 导航 -->
                        <!-- S 操作 -->
                        <div class="opt_wrap" id="optWrap">
                            <div class="opt opt_search opt_search_hover">
                                <!-- 美的商城_PC版_首页_搜索 -->
                                <div data-midea_mos_id="26,145" class="search_wrap">  
                                    
                                    <form action=""> 
                                            <input v-model="value11" @click="getList()" v-on:blur="changeCount()" placeholder="电竞椅" autocomplete="off" type="search"> 
                                        </form>   
                                    <input name="default_link" value="https://www.midea.cn/promote/pc/build/index/aWQwTfmdaS0x9OTcx?mtag=10022.12.1" type="hidden">  
                                    <i class="icon_opt icon_search" @click="gosearch()"></i> 
                                </div> 
                            </div>
                            <div class="opt opt_wx" @mouseenter="enter2" >
                                <i class="icon_opt icon_wx"></i>
                            </div>

                            <!-- S 购物车-->
                            <div class="opt opt_cart" @mouseenter="enter" >
                                <i class="icon_opt icon_cart_small"></i>
                                <span class="header_cart_num js_header_cart_num"></span>
                            </div>
                            <!-- E 购物车-->

                            <!-- S 未登陆 -->
                            <div class="opt opt_user opt_user_login_fail" id="unloginStatus" @mouseenter="enter1" style="display: block;">
                                <i class="icon_opt icon_user_main"></i>
                                <!--<i class="icon_atom icon_user_point_new"></i>-->
                                <span class="user_login_name">登录</span>
                                <!--<i class="icon_atom icon_user_point_new" id="dot" style="display: nonex;"></i>-->
                                <i class="icon_atom icon_user_point_new js_act_dot" style="display: none;"></i>
                                <!--下拉箭头-->
                                <!--<i class="icon_opt icon_arrow_show"></i>-->
                                <!--下面三角形-->
                                <!--<i class="icon_opt icon_arrow_link"></i>-->
                            </div>
                            <!-- E 未登陆 -->

                            <!-- S 登陆成功-->
                            <div class="opt opt_user opt_user_login_success js_opt_user_login_success">
                                <!--默认头像-->
                                <i class="icon_opt icon_user_main"></i>
                                <!--实际头像-->
                                <img class="user_login_img js_user_login_img" src="" alt="用户头像" width="20" height="20">
                                <!--<i class="icon_atom icon_user_point_new" id="dot" style="display: nonex;"></i>-->
                                <i class="icon_atom icon_user_point_new js_act_dot" id="dot"></i>
                                <!--用户名，优先昵称，再手机，最后是亲爱的美的用户-->
                                <span class="user_login_name js_user_login_name"></span>
                                <!--下拉箭头-->
                                <!--<i class="icon_opt icon_arrow_show"></i>-->
                                <!--下面三角形-->
                                <!--<i class="icon_opt icon_arrow_link"></i>-->
                            </div>

                            <div class="opt opt_user opt_enterprise_user_login_success js_opt_enterprise_user_login_success">
                                <i class="icon_opt icon_user_main"></i>
                                <img class="user_login_img js_user_login_img" src="" alt="用户头像" width="20" height="20">
                                <span class="user_login_name js_user_login_name"></span>
                            </div>
                            <!-- E 登陆成功-->


                        </div>
                        <!-- E 操作 -->
                    </div>

                    <!-- S 微信 -->
                    <div class="wx_wrap" style="display: none;" :class="{hidden2:hidden2}">
                        <img class="wx_qrcode" src="//img.mdcdn.cn/pc/img/mall/header_qr_app.png?t=20160105" alt="美的app下载二维码">
                    </div>

                    <div class="user_wrap user_unlogin_wrap JS_user_unlogin_wrap" :class="{hidden:hidden}" style="display:none">
                        <div class="row row_my_order">
                            <a href="#/user/orderlist" target="_blank">
                                <i class="icon_atom icon_my_order"></i>
                                <span class="fn">我的订单</span>
                            </a>
                        </div>
                        <div class="row row_address">
                            <a href="#/user/address" target="_blank">
                                <i class="icon_atom icon_address"></i>
                                <span class="fn">地址管理</span>
                            </a>
                        </div>
                        <div class="row row_account row_last">
                            <a href="#/user/myinfo" target="_blank">
                                <i class="icon icon_account"></i>
                                <span class="fn">账户设置</span>
                            </a>
                        </div>
                        <div class="row row_login_out row_last">
                            <i class="icon icon_login_out"></i>
                            <span class="fn">退出登录</span>
                        </div>
                    </div>
                    <!-- E 用户未登陆时的hover -->

                    <!-- S 购物车顶部导航弹窗 -->
                    <div class="common_cart_wrap" :class="{hidden1:hidden1}" style="right: 86px;">
                        <!-- S 购物车未登录 -->
                        <div class="common_cart_login" >
                            立即<a href="#/login">登录</a>，查看购物车商品
                        </div>
                        <!-- E 购物车未登录 -->

                        <!-- S 购物车无商品 -->
                        <div class="common_cart_nothing">
                            <div class="icon_opt icon_cart_middle"></div>
                            购物车中还没有商品，赶紧选购吧！
                        </div>
                        <!-- E 购物车无商品 -->

                        <!-- S 购物车有商品 -->
                        <div class="common_cart_something">
                            <ul class="common_cart_list js_common_cart_list">
                            </ul>
                            <div class="common_cart_bottom">
                                <a class="to_cart" href="#/cart">
                                    查看购物车
                                </a>
                            </div>
                        </div>
                        <!-- E 购物车有商品 -->
                    </div>
                    <!-- E 购物车顶部导航弹窗 -->

                </div>
	<div class="sort2">
		<div class="cate_cells">
			<div class="cate_cell col_10">
					<div class="cate_cell_hd">分类：</div>
					<div class="cate_cell_bd">
						<ul class="cate_list">
							<li class="" >
								<a href="#" class="mod_word">F系列</a>
							</li>
							<li class="filter_cur" >
								<a href="#" class="mod_word">O系列</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="content_wrap">
                <!-- <p  style='display:none'>{{keyword1}}</p> -->
        <!--S 商品筛选 -->
        <div class="cate_cells filter_wrap">
            <div class="cate_cell cate_bar">
                <div class="cate_cell_bd">
                                        <div class="mod_filter_item filter_cur filter_all js_mod_filter_item">推荐</div>
                    <div class="mod_filter_item filter_price js_mod_filter_item">
                                                    <ul class="price_box">
                                <li class="filter_price_attr filter_price_asc">价格从低到高</li>
                                <li class="filter_price_attr filter_price_desc">价格从高到低</li>
                            </ul>
                                                <span class="price_tip">价格</span><i class="icon_atom icon_down_arrow"></i></div>
                </div>
                <div class="cate_cell_ft filter_stock js_mod_filter_item"><i class="icon_atom icon_stock"></i>仅看有货</div>

            </div>

        </div>
        <!--E 商品筛选 -->

        <!-- S 商品筛选结果 list_wrap -->
        <ul class="search_list_wrap" id="searchListWrap">
            <input id="defaultDataNum" value="37" type="hidden">
            <li class="hproduct"  v-for="(item, index) in productList" :key='index'>
               <router-link :to="{ path: '/sort/sortDetail',query:{id:item.id} }" tag="a" class="category_cover">
                     <img :src='imageSrc + item.model_img'>
                </router-link>
                <div class="ft_message">
                    <div class="price_new">
                        <span class="price"><em>{{item.sale_price}}</em></span>
                     </div>
                    <div class="right_tip item_compare">
                         <div class="cart js_add_to_cart" data-click="" data-sku="1000000000100511132632">
                            <i class="cart_icon common_cart_icon"></i>
                            <span>购物车</span>
                        </div>
                    </div>
                </div>
                <a  class="fn">
                                {{item.model_name}}
                </a>
                <div class="sell_point">{{item.type_name}}</div>

                <div v-if="item.promotionTitle !=null" class="sku_tag sku_tag_important">{{item.promotionTitle}}</div> 
            </li>
           
            </ul>
        <!-- E 商品筛选结果 list_wrap -->
    </div>
		<page class="page" :current="currentPage"  @on-change="handlePage"  :total="totalSize"></page>
		<!-- <back-top :height="0" :bottom="200">
        	<div class="top" @click="top">返回顶端</div>
    	</back-top> -->
        </div>
	</div>
</template>
<script>
	// 节流函数
	const delay = (function() {
	let timer = 0;
	return function(callback, ms) {
		clearTimeout(timer);
		timer = setTimeout(callback, ms);
	};
	})();
    export default {
        data () {
            return {
				theme1: 'light',
				productList:[],
				imageSrc:this.global_.imgurl,
				startRow:1,
                pageSize:20,
                currentPage:1,
				title:'',
				value11: '',
                value12: '',
                totalSize:1,
                ha2:false,
                hidden:false,
                hidden1:false,
                hidden2:false,
                opt_search_hover:false,
			}
			
        },
        
		name: 'scroll-top',
		methods:{
			getMockData () {
            },
            getTargetKeys () {

            },
            handleChange2 (newTargetKeys) {
                this.targetKeys2 = newTargetKeys;
            },
            filterMethod (data, query) {
                return data.label.indexOf(query) > -1;
            },
			getList(){
				this.spinShow=true;
				 let routerParams = this.$route.query.value11;
				  this.productList=[];
                // 将数据放在当前组件的数据内
                if(routerParams!=""&&routerParams!=undefined){
                 this.value11 = routerParams;
				}
                this.$axios({
					method: 'GET',
					url:'/product/search?keyword='+this.value11+'&startRow='+this.startRow+'&pageSize='+this.pageSize,
				}).then((res)=>{
                    console.log(res)
					this.productList = res.itemsList;
					this.totalSize=res.total;
				})
                
			
			},

			top(){
				document.querySelector(".ivu-scroll-container").scrollTop = 0; 
            },
            handlePage(value) {  
                console.log(value)
                this.startRow = value * this.pageSize - 19;  
                // this.$axios({
				// 		method: 'GET',
				// 		url:'/product/search?startRow='+this.startRow+'&pageSize='+this.pageSize,
				// 		}).then((res)=>{
				// 			var arr = this.productList.concat(res.itemsList);
				// 			this.productList = arr;
				// 			console.log(this.productList)
							
                // 		})
                this.getList();
            },
			ha(){
				alert(this.ha2)
				this.ha2 = false;
			},
			ha1(){
				this.ha2 = true;
			},
            changeCount(){
                 this.opt_search_hover=false;
            },
            enter(){
                this.hidden1 =true;
                this.hidden2 =false;
                this.hidden =false;
            },
            enter1(){
                this.hidden =true;
                this.hidden1 =false;
                this.hidden2 =false;
            },
             enter2(){
                this.hidden2 =true;
                this.hidden1 =false;
                this.hidden =false;
            },
            leave2(){
                this.hidden2 =false;
                this.hidden1 =false;
                this.hidden =false;
            },
			async fetchData(val) {
				const res = await this.$axios({
					url: '写上你的URL',
					method: 'GET',
					params: { title: this.title },
				});
				this.search = res.list;
			},
		},
		watch: {
		//watch title change
			title() {
			delay(() => {
				this.fetchData();
			}, 300);
			},
		},
		 mounted(){
		   this.getList();
          },
    }
</script>

<style lang="scss">
 @import '@/styles/color.scss';
 .sort1{
     background: #f4f4f4;
 }
 .header{
    min-width: 1200px;
}
.header {
    background: #fff;
    height: 44px;
    background: #f30;
    position: relative;
    z-index: 50;
}
.header .inner {
    width: 100%;
    overflow: hidden;
    *zoom: 1;
    margin: 0 auto;
    position: relative;
}
.hidden, .hidden1, .hidden2{
    display: block!important;
}
.header .nav_wrap {
    float: left;
}
.header .nav .item {
    float: left;
}
.header .nav .item_tit {
    display: block;
    padding: 0 30px;
    font-family: "微软雅黑";
    height: 44px;
    line-height: 44px;
    color: #a3c3e6;
    font-size: 12px;
}
.header .opt_wrap {
    position: absolute;
    top: 0;
    right: 0;
    *right: auto;
    *float: right;
    *position: static;
}
.header .opt_wrap .opt_search {
    width: 45px;
}
.header .opt_wrap .opt_search_hover .search_wrap {
    width: 250px;
}
.header .opt_wrap .search_wrap {
    position: absolute;
    top: 0;
    right: 0;
    background: #fff;
    width: 75px;
    background: none;
    height: 44px;
    -webkit-transition: width .5s;
    -moz-transition: width .5s;
    -ms-transition: width .5s;
    -o-transition: width .5s;
    transition: width .5s;
    -webkit-user-select: none;
}
.header .opt_wrap .search_wrap form {
    display: none;
}
.header .opt_wrap .opt_search_hover form {
    display: block;
}
.header .opt_wrap .search_wrap input {
    width: 183px;
}
.header .opt_wrap .search_wrap input {
    display: block;
    -webkit-border-radius: 12px;
    -moz-border-radius: 12px;
    -ms-border-radius: 12px;
    font-family: 宋体;
    width: 100%;
    height: 44px;
    height: 43px\9;
    *position: relative;
    *top: -1px;
    line-height: 44px;
    padding: 0 10px 0 35px;
    border: 0 none;
        border-bottom-width: 0px;
        border-bottom-style: none;
        border-bottom-color: currentcolor;
    border-bottom: 1px solid #e0e0e0;
    border-radius: 0;
}
.header .opt_wrap .opt_search_hover .icon_search {
    top: 12px;
    left: 10px;
    background-position: -66px -215px;
}
.header .opt_wrap .search_wrap .icon_opt {
    margin: 0;
    position: absolute;
    right: 30px;
    cursor: pointer;
    z-index: 10;
}
.header .opt_wrap .opt_search_hover .icon_search {
    top: 12px;
    left: 10px;
    background-position: -66px -215px;
}
.header .opt_wrap .search_wrap .icon_opt {
    margin: 0;
    position: absolute;
    right: 30px;
    cursor: pointer;
}
.header .opt_wrap .icon_search {
    top: 12px;
    background-position: -96px -215px;
}
.header .icon_opt, .header .site_logo {
    background-image: url(../../assets/img/logo-white.png);
    background-repeat: no-repeat;
    background-position: center center;
}
.header .icon_opt {
    display: block;
    width: 20px;
    height: 20px;
    margin: 12px auto;
}
.header .icon_opt{
    background: url(//img.mdcdn.cn/pc/img/mall/index_sprite.png?t=20171107) no-repeat;
        background-image: url("//img.mdcdn.cn/pc/img/mall/index_sprite.png?t=20171107");
        background-repeat: no-repeat;
        background-position-x: 0%;
        background-position-y: 0%;
}
.header .site_logo {
    float: left;
    width: 120px;
    height: 44px;
    background-size: 100%;
}
.icon_search {
    width: 20px;
    height: 20px;
    background-position: -40px -100px;
}
.header .opt_wrap .opt_wx {
    width: 65px;
}
.header .opt_wrap .opt {
    float: left;
    position: relative;
    background: #fff;
    padding: 0;
    width: 75px;
    background: none;
    height: 44px;
    cursor: pointer;
}
.header .opt_wrap .icon_wx {
    background-position: -120px -215px;

}
.header .opt_wrap .opt_cart {
    width: auto;
    padding: 0 20px;
}
.header .opt_wrap .icon_cart_small {

    float: left;
    background-position: -146px -215px;
    cursor: pointer;

}
.header .opt_wrap .header_cart_num {
    display: block;
    float: left;
    color: #fff;
    margin: 11px 0 0 5px;
}
.opt_user_login_fail {
    width: 86px;
}
.header .opt_wrap .icon_user_main {
    float: left;
    width: 20px;
    height: 20px;
    cursor: pointer;
    background-position: -35px -216px;
    margin-left: 20px;
    *display: inline;
}
.header .opt_wrap .user_login_name {
    display: block;
    float: left;
    margin-left: 2px;
    cursor: pointer;
    line-height: 44px;
    color: #fff;
}
.header .opt_wrap .icon_user_point_new {

    float: left;
    width: 8px;
    height: 8px;
    margin-top: 5px;
    background-position: -30px -20px;
    display: none !important;

}
.header .opt_wrap .opt_user_login_success, .header .opt_wrap .opt_enterprise_user_login_success {
    width: auto;
	padding-right: 10px;
	display: none;

}
.opt_user_login_success .user_login_img, .opt_enterprise_user_login_success .user_login_img {
    display: none;
}
.header .opt_wrap .opt_user_login_success .user_login_name, .header .opt_wrap .opt_enterprise_user_login_success .user_login_name {
    max-width: 120px;
    overflow: hidden;
}
.wx_wrap {
    display: block;
    background: #fff;
    position: absolute;
    z-index: 51;
    border-top: 0 none;
    top: 44px;
    left: auto;
    right: 86px;
    margin: 0;
}
.wx_wrap .wx_qrcode {
    display: block;
    border: 0;
}
.header .common_cart_wrap .common_cart_login, .header .common_cart_wrap .common_cart_nothing {
    padding: 30px 0;
    color: #a1a1a1;
}
.header .common_cart_wrap .common_cart_login a, .header .common_cart_wrap .common_cart_nothing a {
    color: #269bdb;
}
.header .common_cart_wrap .common_cart_nothing {
    text-align: center;
}
.header .common_cart_wrap .common_cart_nothing .icon_cart_middle {
    width: 38px;
    height: 32px;
    margin: 0 auto 20px auto;
    background-position: -150px -253px;
}
.header .common_cart_wrap .common_cart_bottom {
    height: 60px;
}
.header .common_cart_wrap .common_cart_bottom .to_cart {
    float: right;
    background-color: #f60;
    color: #fff;
    width: 120px;
    height: 30px;
    line-height: 30px;
    margin: 15px 10px 0 0;
    cursor: pointer;
    border: 2px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
}
.header .common_cart_wrap {
    width: 360px;
    text-align: center;
    position: absolute;
    right: 86px;
    border: 1px solid #e0e0e0;
        border-top-width: 1px;
        border-top-style: solid;
        border-top-color: rgb(224, 224, 224);
    border-top: none;
    font-size: 12px;
    line-height: 12px;
    background-color: #fff;
    *zoom: 1;
    z-index: 51;
    display: none;
}
.header .user_wrap {
    top: 44px;
    left: auto;
    right: 0;
}
.user_wrap {
    width: 291px;
    background: #fff;
    position: absolute;
    top: 71px;
    left: 50%;
    margin-left: 302px;
    z-index: 51;
    border: 1px solid #d6d6d6;
        border-top-width: 1px;
        border-top-style: solid;
        border-top-color: rgb(214, 214, 214);
    border-top: 0 none;
}
.user_wrap .row {

    height: 48px;
    line-height: 48px;
    border-bottom: 1px solid #eeeeee;
    cursor: pointer;

}
.user_wrap .row_my_internal a {
    display: block;
    line-height: 48px;
}
.user_wrap a {
    width: 100%;
    display: inline-block;
}
.icon_atom {
    display: inline-block;
    *display: inline;
    *zoom: 1;
    width: 0;
    height: 0;
    background: url(//img.mdcdn.cn/pc/img/common/atom_sprite.png?t=201804271445) no-repeat 10000px 10000px;
        background-position-x: 10000px;
        background-position-y: 10000px;
}
.user_wrap .row .icon_internal {
    width: 20px;
    height: 20px;
    background-position: -261px -80px;
    margin: 0 6px 0 16px;
    position: relative;
    top: 4px;
}
.user_wrap .row .fn {
    color: #333;
}
.user_wrap .row .icon_my_order {
    width: 12px;
    height: 12px;
    background-position: -284px -44px;
    margin: 0 10px 0 20px;
    position: relative;
    top: 2px;
}
.user_wrap .row .icon_my_coupon {

    width: 20px;
    height: 20px;
    background-position: -240px -80px;
    margin: 0 6px 0 16px;
    position: relative;
    top: 4px;

}
.user_wrap .row .icon_my_score {
    width: 12px;
    height: 14px;
    background-position: -284px -23px;
    margin: 0 10px 0 20px;
    position: relative;
    top: 2px;
}
.user_wrap .row .icon_my_privilege {

    width: 12px;
    height: 12px;
    background-position: -208px -85px;
    margin: 0 10px 0 20px;
    position: relative;
    top: 2px;

}
.user_wrap .row .icon_my_midea_product {
    width: 12px;
    height: 12px;
    background-position: -65px -24px;
    margin: 0 10px 0 20px;
    position: relative;
    top: 2px;
}
.icon{

    background: url(//img.mdcdn.cn/pc/img/mall/sprite.png?t=20160701) no-repeat;
        background-position-x: 0%;
        background-position-y: 0%;

}
.user_wrap .row .icon_account {
    background-position: -235px -36px;
}
.user_wrap .row .icon {
    width: 12px;
    height: 12px;
    margin: 0 10px 0 20px;
    position: relative;
    top: 2px;
}
.icon {
    display: inline-block;
    *display: inline;
    *zoom: 1;
}
.user_wrap .row .icon_after_sale {

    width: 14px;
    height: 13px;
    background-position: -216px -102px;
    position: relative;
    top: 2px;
    margin: 0 10px 0 20px;

}
.user_wrap .row .icon_my_bill {

    width: 12px;
    height: 13px;
    background-position: -324px -44px;
    margin: 0 10px 0 20px;
    position: relative;
    top: 2px;

}
.user_wrap .row .icon_address {

    width: 12px;
    height: 12px;
    background-position: -301px -84px;
    margin: 0 10px 0 20px;
    position: relative;
    top: 2px;

}
.user_wrap .row .icon_login_out {
    background-position: -250px -36px;
}
.user_wrap .row .icon_my_collect {
    width: 20px;
    height: 20px;
    background-position: -220px -80px;
    margin: 0 6px 0 16px;
    position: relative;
    top: 4px;
}
 .sort2{
    // 
    width:100%;
    max-width: 1100px;
    margin:  0 auto;
    min-height:900px;
}
 .cate_cell {
    *overflow: visible !important;
    *height: 28px;
    *line-height: 28px;
}
.col_10 {
    padding: 10px 24px;
}
.cate_cell {
    padding: 10px 24px;
    position: relative;
    border-top: 1px solid #eee;
}
.col_10 .cate_cell_hd {
    width: 120px;
    height: 21px;
    line-height: 21px;
}
.cate_cell .cate_cell_hd {
    float: left;
    color: #999;
}
.col_10 .cate_cell_bd {
    margin-left: 120px;
}
.col_10 .cate_cell_bd .cate_list {
    overflow: visible;
    height: auto;
}
.cate_cell .cate_cell_bd .cate_list {
    overflow: hidden;
    height: 21px;
    color: #666;
}
.col_10 .cate_cell_bd .cate_list li {
    float: left;
    height: 21px;
    line-height: 21px;
    margin-right: 50px;
}
a {
    text-decoration: none;
    color: #333;
}
.cate_cell .cate_cell_bd .cate_list .filter_cur a {
    color: #0092d8;
}
.filter_wrap {
    margin: 16px 0;
}
.cate_cells {
    background-color: #fff;
    font-size: 12px;
    border: 1px solid #eee;
    color: #333;
}
.filter_wrap .cate_bar {
    line-height: 22px;
    height: 22px;
	box-sizing: content-box;
}
.cate_cell:first-child {
    border: none;
}
.cate_cell {
    padding: 10px 24px;
    position: relative;
    border-top: 1px solid #eee;
}
.cate_bar {
    background: #fcfcfc;
}
.filter_wrap .filter_cur {
    color: #0092d8;
}
.filter_wrap .filter_price {
    margin-right: 24px;
    position: relative;
}
.filter_wrap .mod_filter_item {
    display: inline-block;
    *display: inline;
    margin-right: 38px;
    cursor: pointer;
    vertical-align: middle;
}
.filter_wrap .mod_filter_item {
    display: inline-block;
    *display: inline;
    margin-right: 38px;
    cursor: pointer;
    vertical-align: middle;
}
.filter_address .address_wrap .address_selected {
    border: none;
    height: 22px;
    line-height: 22px;
    padding: 0;
}

.address_wrap .address_selected .address_option {
    margin: 0 0 0 5px;
    padding: 0;
    cursor: pointer;
    display: block;
    float: left;
    max-width: 53px;
}
.address_wrap .address_selected .address_option {
    line-height: 22px;
}
.address_wrap .arrow {
    position: relative;
    top: -1px;
    *top: 11px;
}
.icon_atom {
    display: inline-block;
    *display: inline;
    *zoom: 1;
    width: 0;
    height: 0;
    background: url(//img.mdcdn.cn/pc/img/common/atom_sprite.png?t=201804271445) no-repeat 10000px 10000px;
}
 .filter_wrap .mod_filter_item .icon_atom {
    vertical-align: middle;
    margin: 0 8px;
}
.icon_down_arrow {
    width: 10px;
    height: 9px;
    background-position: 0 -42px;
}
.filter_address, .filter_address .address_wrap {
    height: 22px;
    line-height: 22px;
}
.filter_wrap .filter_price .price_box {
    display: none;
}
.filter_wrap .price_box {
    color: #333;
    position: absolute;
    width: 123px;
    height: 100px;
    border: 1px solid #eee;
        border-top-width: 1px;
        border-top-style: solid;
        border-top-color: rgb(238, 238, 238);
    top: -11px;
    padding: 24px;
    box-sizing: border-box;
    background: #fff;
    z-index: 50;
    left: -25px;
    border-top: none;
}
.address_wrap .arrow {
    position: relative;
    top: -1px;
    *top: 11px;
    margin-left: 7px;
    background: url(//img.mdcdn.cn//pc/img/common/atom_sprite.png?t=20160701) no-repeat;
        background-position-x: 0%;
        background-position-y: 0%;
}
.address_wrap .address_selected .arrow {
    width: 10px;
    height: 6px;
    background-position: 0 -44px;
    display: inline-block;
}
.cate_cell .cate_cell_ft {
    position: absolute;
    right: 24px;
    top: 12px;
    line-height: 19px;
}
.search_list_wrap {
    width: 1117px;
    overflow: hidden;
    margin-top: 16px;
}
.search_list_wrap .hproduct {
    padding: 0 24px 21px;
    float: left;
    position: relative;
    width: 263px;
    margin: 0 16px 10px 0;
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #eee;
}
.search_list_wrap .hproduct .category_cover {
    display: block;
    width: 210px;
    height: 210px;
    margin: 40px 0;
}
.search_list_wrap .hproduct .category_cover img {
    width: 210px;
    height: 210px;
}
.search_list_wrap .hproduct .ft_message {
    font-size: 18px;
    height: 27px;
}
.search_list_wrap .hproduct .ft_message .price_new {
    float: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.search_list_wrap .hproduct .ft_message .price_new .price {
    color: #f60;
}
.search_list_wrap .hproduct .ft_message .price_new .price em {
    margin-left: 4px;
}
.search_list_wrap .hproduct .ft_message .comment_box {
    color: #999;
}
.search_list_wrap .hproduct .ft_message .right_tip {
    float: right;
    font-size: 12px;
    line-height: 27px;
}
.search_list_wrap .hproduct .ft_message .comment_box em {
    padding-left: 4px;
}
.search_list_wrap .hproduct .fn {
    display: block;
    height: 42px;
    font-size: 14px;
    overflow: hidden;
    word-break: break-all;
    margin: 8px auto 9px;
}
.search_list_wrap .hproduct .sell_point {
    color: #999;
    font-size: 12px;
    height: 18px;
}
.recommend_list_wrap li .pro_name, .search_list_wrap .hproduct .sell_point {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.item_compare .cart {
    float: left;
}
.item_compare .cart, .item_compare .compare {
    cursor: pointer;
}
.item_compare .cart .common_cart_icon {
    background-position: -39px -33px;
}
.item_compare .cart i, .item_compare .compare i {
    width: 18px;
    height: 18px;
    background: url("//img.mdcdn.cn/wp/src/p_mall/img/item_compare.png") no-repeat;
        background-position-x: 0%;
        background-position-y: 0%;
        background-size: auto auto;
    background-size: 100px 100px;
    display: inline-block;
    vertical-align: bottom;
}
.item_compare .cart span, .item_compare .compare span {
    margin-left: 5px;
}
.item_compare .compare {
    float: right;
}

.search_list_wrap .hproduct .sku_tag {
    position: absolute;
    top: 0;
    right: 0;
    color: #fff;
    font-size: 12px;
    height: 30px;
    line-height: 30px;
    padding: 0 20px;
}
.search_list_wrap .hproduct .sku_tag_important {
    background-color: #ff6600;
}
.search_list_wrap .hproduct .sku_tag_notice {
    background-color: #1bce8d;
}
.item_compare .compare .compare_icon {
    background-position: -12px -9px;
}
.page{
    text-align:center;
    padding: 20px 0px;
}
</style>