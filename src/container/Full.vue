<template>
<div class="layout">
        <Layout>
             <app-header></app-header>
            <Layout >
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
        	AppMenu
        }
       }
</script>

<style scoped="scoped">
</style>