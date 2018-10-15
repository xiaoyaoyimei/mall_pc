<template>
<div class="layout">
        <Layout>
             <app-header></app-header>
             <app-nav style="background: #fff;"></app-nav>
            <Layout >
                <Content class='layout' :style="{ minHeight: '700px'}">
                	
				<div class="newcenter clearfix">
					<Breadcrumb separator=">" style="margin-top:20px;margin-bottom: 10px;">
				        <BreadcrumbItem to="/">首页</BreadcrumbItem>
				        <BreadcrumbItem>个人中心</BreadcrumbItem>
				    </Breadcrumb>
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
import AppNav from '@/components/Nav'
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
        	AppBreadcrumb,
        	AppNav
        },
    }
</script>

<style lang="scss" scoped="scoped"> 
.newcenterbody{
    float: left;
    width: 940px;
    background-color: #FFFFFF;
    position: relative;
    margin-bottom: 40px;
}.newcenter {
    width: 1200px;
    margin: 0 auto;
    margin-top: 7px;
    position: relative;
      margin-bottom:5px;
}
</style>