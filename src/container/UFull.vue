<template>
<div class="layout">
        <Layout>
             <app-header></app-header>
            <Layout >
                <Content class='layout' :style="{ minHeight: '700px'}">
                	
				<div class="newcenter clearfix">
					<app-breadcrumb></app-breadcrumb>
					<user-left></user-left>
					<div class="newcenterbody"> <router-view/></div>
				</div>
                </Content>
            </Layout>
             <app-footer></app-footer>
        </Layout>
    </div>
</template>

<script>
	//个人中心
import AppHeader from '@/components/Header'
import AppFooter from '@/components/Footer'
import UserLeft from '@/components/UserLeft'
import AppBreadcrumb from '@/components/BreadCrumb'
	export default {
	    data () {
	        return {
	        }
		  },
		components:{
        	AppHeader,
        	AppFooter,
        	UserLeft,
        	AppBreadcrumb
        },
    }
</script>

<style lang="scss" scoped="scoped"> 
.newcenterbody{
    float: left;
    width: 940px;
    background-color: #FFFFFF;
    padding: 40px;
    position: relative;
}.newcenter {
    width: 1200px;
    margin: 0 auto;
    margin-top: 7px;
    position: relative;
    left: -3px;
}
</style>