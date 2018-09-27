<template>
	<div style="padding:40px;min-height:900px;">
		<h3 class="contactus">联系我们</h3>
        <div class="contactusdiv">
            <h6 class="h6">迪锐克斯科技无锡有限公司</h6>
            <p>服务热线：400-990-5033</p>
            <p>服务热线：400-829-6033</p>
            <p>官方邮箱：sales@dxracer.com.cn</p>
            <p>公司地址：江苏省无锡惠山经济开发区智慧路19号五彩科技大厦404室</p>
            <p class="topp">新浪微博：迪瑞克斯DXRacer</p>
            <p>官方微信号：DXRacer-CN</p>
            <p>官方交流群：487060608</p>
        </div>
	</div>
</template>

<script>
	import { validatePHONE } from '@/assets/js/validate';
	export default {
		data() {
			
			return {
				
			}
		},
		methods: {
        }
	}
</script>

<style scoped="scoped">
    .contactus{
        font-size: 24px;
        text-align: left;
        font-weight: 400;
        color: #333333;
    }
    .contactusdiv{
        padding-top: 45px;
    }
    .contactusdiv .h6{
        font-weight: 400;
        font-size: 18px;
        line-height: 36px;
        height: 36px;
        color: #333333;
        margin-bottom: 35px;
    }
    .contactusdiv p{
        font-weight: 400;
        font-size: 18px;
        line-height: 36px;
        color: #333333;
        height: 36px;
    }
    .contactusdiv .topp{
        margin-top: 68px;
    }
</style>
