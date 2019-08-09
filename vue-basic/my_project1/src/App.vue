<!--1.模板-->
<template>
  <div id="app">
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/helloworld">HelloWorld</router-link></li>
      <!-- <li><a href="/">Home</a></li>
      <li><a href="/helloworld">HelloWorld</a></li> -->
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  // components: {
  //   HelloWorld
  // }
  data(){
    return {
    
    }
  }
}
</script>
<!--3.样式：解决样式-->
<style scoped>
h1 {
  margin: 10px auto;
  color: peru;
  text-align: center;
}
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
