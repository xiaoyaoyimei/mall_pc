<template>

  <div class="page">
    <embed :src="pdf |imgfilter " width="800" height="600"/>
  </div>

</template>



<script>
	export default {
		data() {
			return {
        pdf:'upload/2018v2.pdf'
			}
    },
  }
</script>



<style scoped>

</style>