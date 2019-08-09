<template>
  <div class="users">
      <!-- <h1>Hello users!</h1> -->
      <ul>
          <li v-for="user in users2" v-on:click="user.show=!user.show">
            <h2>{{user.name}}</h2>
            <h3 v-show="user.show">{{user.position}}</h3>
          </li>

      </ul>
      <button v-on:click="deleteUser">删除</button>
  </div>
</template>

<script>
export default {
  name: 'users',
//   props:["users"],
  props:{
    users2:{
        type:Array,
        required:true
        }
    },
  data () {
    return {
    //   users:["Henry","Bucky","Emily"]
    //   users:[
    //       {name:"chenlei",position:"web开发",show:false},
    //       {name:"chenlei",position:"web开发",show:false},
    //       {name:"chenlei",position:"web开发",show:false},
    //       {name:"chenlei",position:"web开发",show:false},
    //       {name:"chenlei",position:"web开发",show:false},
    //       {name:"chenlei",position:"web开发",show:false},
    //       {name:"chenlei",position:"web开发",show:false},
    //       {name:"chenlei",position:"web开发",show:false},
    //       {name:"chenlei",position:"web开发",show:false}
    //   ]
    }
  },
  methods:{
      deleteUser:function(){
          this.users2.pop();
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user{
    width: 100%;
    max-width: 1200px;
    margin: 40px auto;
    padding: 0 20px;
    box-sizing: border-box;
}
ul{
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
}
li{
    flex-grow: 1;
    flex-basis: 200px;
    text-align: center;
    padding: 30px;
    border: 1px solid #222;
    margin: 10px;
}
h1, h2 {
    color: purple;
    font-weight: normal;
}

</style>
