<template>
<div class="layout">
        <Layout>
             <app-header></app-header>
            <Layout >
                <Content style="min-height: 520px;position:relative">
                   <router-view/>
                </Content>
            </Layout>
             <app-footer></app-footer>
        </Layout>
</div>
</template>

<script>
import AppHeader from '@/components/RegisterHeader'
import AppFooter from '@/components/RegisterFooter'

	export default {
			data(){
				return {
				}
			},
        components:{
        	AppHeader,
        	AppFooter,
        }
       }
</script>
