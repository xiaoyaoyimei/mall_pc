<template>
<div class="layout">
        <Layout>
             <app-header></app-header>
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
.help_wrap{
	    float: left;
    width: 990px;
    margin-left: 60px;
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
