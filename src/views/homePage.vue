<template>
  <div class="fullScreen">
      <router-link to="/">
           <img :src="bg" alt=""> -->
      </router-link>
   
  </div>
</template>

<script>

export default {
  data(){
    return{
         bg:require('../../static/homePage.png'),
    }
  }
    
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .fullScreen{
      width: 100%;
      height: 100%;
    img{
      width: 100%;
      height: 100%;
      display: block
    }
  }

</style>