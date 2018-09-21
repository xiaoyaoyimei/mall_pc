<template>
<div class="layout">
        <Layout >
             <app-header></app-header>
             <Layout style="background: #fff;">
                <Content style="min-height: 640px;">
                   <router-view/>
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
			data(){
				return {
				}
			},
        components:{
        	AppHeader,
        	AppFooter,
        	AppMenu,
        }
       }
</script>

<style>
	.Nav{
    background-color: #fff;
    border-bottom: 2px solid rgb(255, 0, 0);
}
.nav .navcart{
    vertical-align: middle;
    margin-right: 20px;
}
.nav .mycart{
    font-size: 24px;
    color: #333333;
    line-height: 24px;
}
.nav .navCart{
    border-top: 1px dashed  rgb(204, 204, 204);
    height: 1px;
    width: 384px;
    float: right;
    margin-top: 15px;

}
.Nav .navCart .red{
    color: #ff0037;
}
.nav .navCart li{
    float: right;
    color: #333333;
    text-align: center;
    position: relative;
    top:-25px;
    margin-left: 90px;
    background: #fff;
}
.nav .navCart li:nth-last-of-type(1){
    margin-left: 0px;
}

</style>