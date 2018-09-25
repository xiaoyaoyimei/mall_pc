<template>
<div class="layout">
        <Layout >
        	
             <app-header></app-header>
             <app-nav></app-nav>
             <app-tool-bar></app-tool-bar>
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
import AppToolBar from '@/components/ToolBar'
import AppNav from '@/components/Nav'
	export default {
			data(){
				return {
				}
			},
        components:{
        	AppHeader,
        	AppFooter,
        	AppToolBar,
        	AppNav
        }
       }
</script>

<style scoped="scoped">
</style>