<template>
  <div id="single-blog">
      <h1>{{blog.title}}</h1>
      <article>{{blog.body}}</article>
      <p>作者：{{blog.author}}</p>
      <p>分类：</p>
      <ul>
          <li v-for="category in blog.categories" :key="category">
              {{category}}
          </li>
      </ul>
      <button @click="deleteSingleBlog()">删除</button>
      <router-link :to="'/edit/' + id">编辑</router-link>
  </div>
</template>

<script>
// import axios from 'axios'
import axios from '../axios-auth'
export default {
  name: 'single-blog',
  data(){
      return{
         id: this.$route.params.id,
         blog: {}
      }
  },
  methods:{
      deleteSingleBlog(){
          axios.delete("/blogs/" + this.id)
          .then((response) => {
              this.$router.push({path:'/'})
          })
      }
  },
  created(){

      axios.get('/blogs/' + this.id)
      .then((data) => {
          return data.data;
      })
      .then((data) => {
          console.log(data);
          this.blog = data;
      })

    //   this.$http.get('https://wd1182543348jfzvtq.wilddogio.com/posts/' + this.id + ".json")
    //   .then(function(data){
    //       return data.json();
    //     //   console.log(data);
    //   })
    //   .then(function(data){
                // this.blog = data;    
    //   })


    //   this.$http.get('../static/posts.json' + this.id)
    //   this.$http.get('https://jsonplaceholder.typicode.com/posts/' + this.id)
    //   .then(function(data){
    //     //   console.log(data);
    //      this.blog = data.body;
    //     //  console.log(this.blog);
    //   })
  },
  computed:{
     
  },


}
</script>

<style>
    #single-blog{
        max-width: 960px;
        margin: 0 auto;
        padding: 20px;
        background: #eee;
        border: 1px dotted #aaa;
    }

</style>
