<!--1.模板-->
<template>
  <div id="home">
    <!-- <img src="./assets/logo.png">
    <HelloWorld/> -->
    <h1>{{title}}</h1>
    <app-header v-on:titleChanged="titlechanged($event)" v-bind:title2="title2"></app-header>

    <users v-bind:users2="users"></users> 
    <users v-bind:users2="users"></users> 

    <app-footer2 v-bind:title2="title2"></app-footer2>
  </div>
</template>

<script>
import HelloWorld from './HelloWorld'
//局部注册组件
import Users from './Users'
import Header from './Header'
import Footer2 from './Footer'

export default {
  name: 'home',
  // components: {
  //   HelloWorld
  // }
  data(){
    return {
      title:"这是我的第一个Vue脚手架项目！",
       users:[
        //   {name:"chenlei",position:"web开发",show:false},
        //   {name:"chenlei",position:"web开发",show:false},
        //   {name:"chenlei",position:"web开发",show:false},
        //   {name:"chenlei",position:"web开发",show:false},
        //   {name:"chenlei",position:"web开发",show:false},
        //   {name:"chenlei",position:"web开发",show:false},
        //   {name:"chenlei",position:"web开发",show:false},
        //   {name:"chenlei",position:"web开发",show:false},
        //   {name:"chenlei",position:"web开发",show:false}
      ],
      title2:"传递的是一个值，（num,string,boolean）"
    }
  },
  methods:{
    // 实现titleChanged事件的功能函数
    titlechanged(title){
      this.title2 = title;
    }
  },
  components:{
    "users": Users,
    "app-header":Header,
    "app-footer2":Footer2
  },
  created(){
      this.$http.get("http://jsonplaceholder.typicode.com/users").then((data) => {
        //   console.log(data);
        this.users = data.body;
      })
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
