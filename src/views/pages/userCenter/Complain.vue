<template>
	<div style="padding:40px;">
		<h3>投诉建议 <i>+</i></h3>
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
    h3{
        font-weight: 400;
        color: #333333;        
        font-size: 24px;
        text-align: left;
    }
    h3 i{
        float: right;
        background-color: #c6c6c6;
        width: 33px;
        height: 33px;
        margin: 0 auto;
        border-radius: 50%;
        text-align: center;
        line-height: 28px;
        font-weight: 700;
        font-style: normal;
        font-size: 30px;
        color: #FFFFFF;
        cursor: pointer;
    }
</style>