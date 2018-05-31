<template>
<div class="layout">
        <Layout>
             <app-header></app-header>
            <Layout >
                <Content class='layout' :style="{ minHeight: '280px',marginTop:'24px'}">
				<div class="inner_wrap">
					<user-left></user-left>
					 
					 <div class="content_wrap"><router-view/></div>
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
import UserLeft from '@/components/UserLeft'
	export default {
	    data () {
	        return {
	        }
		  },
		components:{
        	AppHeader,
        	AppFooter,
        	AppMenu,
        	UserLeft
        },
    }
</script>

<style lang="scss" scoped="scoped"> 
.inner_wrap {
    padding-top: 25px;
    zoom: 1;
    min-height: 570px;
    width: 1190px;
    margin: 0 auto;
}
.content_wrap{
	    float: left;
    width: 990px;
    margin-left: 60px;
}
</style>