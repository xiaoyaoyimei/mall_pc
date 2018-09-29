<template>
    <div>
    <header class="bg-black ">
			<div class="main-width">
				<div class="fl header-left">
					<router-link  to="/index">首页</router-link>
					<hr class="spacer mlr8">
					<a href="javascript:void(0)">合作招商</a>
					<hr class="spacer mlr8">
					 <router-link  to="/help">操作指南</router-link>
				</div>
			</div>
		</header>

    </div>
</div>
</template>
<script>
</script>
<style >
	.btn-dxm{
	background: #fff;
    width: 108px;
    height: 50px;
    font-size: 14px;
    border:1px solid #ccc
}
.signin{
    position: relative;
    width: 100%;
    min-width: 1200px;
    overflow: hidden;
}
.signinImg{
    width: 1920px;
    position: relative;
    margin-left: 50%;
    left: -960px;
}
.signin form{
    position: absolute;
    top: 40px;
    right: 0;
    z-index: 100;
    width: 410px;
    min-height:530px;
    background-color: #ffffff;
    padding: 53px 46px;
}
.signin form h4{
    font-size: 24px;
    font-weight: 400;
    color:#333333;
    height: 31px;
    line-height:31px;
    margin-bottom: 20px;
}
.signin form input{
    width: 320px;
    height: 50px;
    line-height: 50px;
    padding-left: 15px;
    border: 1px solid #CCCCCC;
    font-weight: 400;
    font-size: 14px;
    color: #000000;
}
.signin .yanzheng{
    width: 201px;
    margin-right: 13px;
}
.pic-yzm{
    width: 100px;
    height: 50px;
    position: relative;
    top: -2px;
    cursor: pointer;
}
.signin .btn{
    width: 320px;
    height: 50px;
    background-color: rgba(255, 0, 0, 1);
    font-weight: 400;
    font-size: 18px;
    color: #FFFFFF;
    border: none;
}
.signin .btn:hover{
    background-color: rgba(255, 0, 0, 1)!important;
}
.signin p a{
    float: left;
    font-weight: 400;
    font-size: 14px;
    color: #999999;
    margin-top: 13px;
}
.signin h4 .a{
    font-weight: 400;
    font-size: 14px;
    color: #999999;
}
.signin .a{
    float: right;
}
.signin .p{
    text-align: center;
    margin-top: 10px;
    font-weight: 400;
    font-size: 14px;
    color: #999999;
}
.signin .pp{
    text-align: left;
    margin-top: 0px;
    font-weight: 400;
    font-size: 14px;
    color: #999999;
}
.signin input.w128,.signin .forget .w128{
	width:128px
}
.forget .w207{
	width:207px}
</style>
