<template>

  <div class="page">
    <embed src="http://image-shop.dxracer.com.cn/upload/2018v2.pdf" width="800" height="600"/>
  </div>

</template>



<script>
let Base64 = require('js-base64').Base64
console.log(require('js-base64'))
export default {
  name: 'Home',
  data () {
    return {
      url: this.$axios.defaults.baseURL + '/upload/2018v2.pdf'
    }
  },

  methods: {

    OpenPDF () {
      this.$router.push({ name: 'PDF', query: { url: Base64.encode(this.url) } })

    }

  }

}

</script>



<style scoped>

</style>