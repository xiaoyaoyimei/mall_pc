<template>
<div class="layout">
        <Layout>
             <app-header></app-header>
          <Content style="min-height: 520px;position:relative">
                   <router-view/>
                </Content>
                <app-footer></app-footer>
        </Layout>
</div>
</template>

<script>
import AppHeader from '@/components/RHeader'
import AppFooter from '@/components/RFooter'
	export default {
			data(){
				return {
				}
			},
        components:{
        	AppHeader,
        	AppFooter
        }
       }
</script>
