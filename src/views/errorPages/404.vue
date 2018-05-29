<template>
<div class="lost center clearfix">
        <div class="L_tip">
        <p>提示：您可能输错了网址，或该网页已删除或不存在，系统将 <strong id="mes">5</strong> 秒后返回<a href="#/index">首页</a>或返回 <a href="#" onclick="history.go(-1)">上一页</a></p>
        </div>
    </div>
</template>

<script>
</script>

<style scoped="scoped">
.lost {
    margin: 10px auto;
    padding: 20px 0;
    background: url(../../assets/img/405.png) no-repeat;
    width: 1200px;
    height: 710px;
    position: relative;
}
.lost .L_tip {
    position: absolute;
    top: 20px;
    right: 0px;
    font-size: 18px;
    color: #78787E;
}
.lost .L_tip strong {
    font-size: 22px;
    color: #274157;
}
.lost .L_tip a {
    padding: 0 16px;
    color: #E50011;
    font-size: 22px;
}
 .clearfix:after {content: "."; display: block; height:0; clear:both; visibility: hidden;}
.clearfix { *zoom:1; }
</style>