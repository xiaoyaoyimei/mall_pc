<template>
<div class="layout">
        <Layout>
             <app-header></app-header>
            <Layout >
                <Content style="min-height: 520px;position:relative">
                   <router-view/>
                </Content>
            </Layout>
        </Layout>
</div>
</template>

<script>
import AppHeader from '@/components/RHeader'
	export default {
			data(){
				return {
				}
			},
        components:{
        	AppHeader,
        }
       }
</script>
