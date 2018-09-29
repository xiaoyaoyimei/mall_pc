<template>
<div class="layout">
        <Layout>
             <app-header></app-header>
			 <app-nav></app-nav>
            <Layout >
                <Content class='layout' :style="{ minHeight: '700px',background:'#ffffff'}">
				<div class="inner_help">
					<help-left></help-left>
					<div class="help_wrap"><router-view/></div>
				</div>
                </Content>
            </Layout>
             <app-footer></app-footer>
        </Layout>
    </div>
</template>

<script>
import AppHeader from '@/components/Header'
import AppNav from '@/components/Nav'
import AppFooter from '@/components/Footer'
import AppMenu from '@/components/Menu'
import HelpLeft from '@/components/HelpLeft'
	export default {
	    data () {
	        return {
	        }
		  },
		components:{
			AppHeader,
			AppNav,
        	AppFooter,
        	AppMenu,
        	HelpLeft
        },
    }
</script>

<style lang="scss" > 
.inner_help {
    padding-top: 25px;
    zoom: 1;
    min-height: 570px;
    width: 1190px;
    margin: 0 auto;
}
.side_bar_wrap{
	margin-bottom: 50px;
}
.help_wrap{
	    float: left;
    width: 990px;
    margin-left: 60px;
	margin-bottom: 50px;
}
.help_wrap h6{
	 font-size: 14px;
	 line-height: 32px;
}
.help_wrap p{
	line-height: 28px;
}
.help_wrap h3{
	text-align: center;
	font-size: 16px;
}
</style>
