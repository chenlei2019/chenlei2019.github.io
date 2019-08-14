<template>
  <div id="app">
    <div class="container">
      <app-header></app-header>
    </div>
    <div class="container">
      <router-view></router-view>
      <router-view></router-view>
      <router-view></router-view>
      <router-view></router-view>
    </div>
    <br>
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-4">
          <router-view name="orderingGuide"></router-view>
        </div>
        <div class="col-sm-12 col-md-4">
          <router-view name="delivery"></router-view>
        </div>
        <div class="col-sm-12 col-md-4">
          <router-view name="history"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/Header';
export default {
  components:{
    // appHeader:Header
    "app-header":Header
  },
  created(){
    //fetch
    // fetch("/apis/api/weather/city/101030100",{
    //   method:"get"
    // }).then(result => {
    //   // console.log(result)
    //   return result.json();
    // })
    // .then(data => {
    //   console.log(data);
    // })

  //axios
    // this.$axios.post("/apis//api/weather/city/101030100",{})
    this.$axios.get("/apis//api/weather/city/101030100",{})
    .then(data => {
      console.log(data.data.data.forecast[0].type);
    })
  }
}
</script>

<style>

</style>
