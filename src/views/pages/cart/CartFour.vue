<template>
	<div ref='alipayform'>
	</div>
</template>

<script>
	 export default {
    data () {
      return {
      	alipayform:'',
      }
    },
    methods: {
    	getalipay(){
    		this.aipayform=localStorage.getItem('alipay')
    		this.$refs['alipayform'].innerHTML=this.aipayform;
    		document.getElementsByName('punchout_form')[0].submit()
    	},
    },
    mounted() {
  	  	 	this.getalipay();
		}
  }
</script>

<style>
</style>