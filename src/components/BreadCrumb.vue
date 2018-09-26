<template>
	  <!--<Breadcrumb separator=">">
        <BreadcrumbItem to="/">Home</BreadcrumbItem>
        <BreadcrumbItem to="/components/breadcrumb">Components</BreadcrumbItem>
        <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
    </Breadcrumb>-->
   
    	  <!--<Breadcrumb separator=">">
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem  v-for="item in $route.matched" :key="item.path">{{item.path}}</BreadcrumbItem>
    </Breadcrumb>-->
</template>


<script>
		export default {
        data () {
            return {
            }
        },
        		mounted() {
        			console.log(this)
		}
       }
</script>

<style>
</style>