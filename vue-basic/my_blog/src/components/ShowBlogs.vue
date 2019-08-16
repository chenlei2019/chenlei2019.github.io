<template>
  <div id="show-blogs">
      <h1>博客总览</h1>
      <div class="single-blog" v-for="blog in blogs">
          <h2>{{blog.title}}</h2>
          <article>
              {{blog.body}}
          </article>
      </div>
  </div>
</template>

<script>
export default {
  name: 'show-blogs',
  data(){
      return{
          blogs:[],
      }
  },
  created(){
      this.$http.get('../static/posts.json')
      .then(function(data){
        //   console.log(data);
         this.blogs = data.body.slice(0,10);
         console.log(this.blogs);
      })
  }
}
</script>

<style>
    #show-blogs{
        max-width: 800px;
        margin: 0 auto;
    }
    .single-blog{
        padding: 20px;
        margin: 20px 0;
        box-sizing: border-box;
        background: #eee;
    }

/* 
    register(){
        this.model.categoryIds = [];
        var that = this;
        this.registerOption.foreach(element => {
            if(!element.disabled){
                that.model.categoryIds.push(element.value);
            }
        })
    } */
</style>
