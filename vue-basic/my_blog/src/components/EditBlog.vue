<template>
  <div id="add-blog">
    <h2>编辑博客!</h2>
    <form action v-if="!submmited">
      <label for>博客标题</label>
      <input type="text" v-model="blog.title" required />

      <label for>博客内容</label>
      <textarea v-model="blog.content" name id cols="30" rows="10"></textarea>
      <div id="checkboxes">
        <label for>Vue.js</label>
        <input type="checkbox" value="Vue.js" v-model="blog.categories" />
        <label for>Node.js</label>
        <input type="checkbox" value="Node.js" v-model="blog.categories" />
        <label for>React.js</label>
        <input type="checkbox" value="React.js" v-model="blog.categories" />
        <label for>Angular4.js</label>
        <input type="checkbox" value="Angular4.js" v-model="blog.categories" />
      </div>
      <label for>作者：</label>
      <select v-model="blog.author">
        <option v-for="author in authors" :key="author">{{author}}</option>
      </select>
      <button v-on:click.prevent="post">编辑博客</button>
    </form>

    <div v-if="submmited">
      <h3>您的博客编辑成功！</h3>
    </div>
    <hr />
    <div id="preview">
      <h3>博客总览</h3>
      <p>博客标题：{{blog.title}}</p>
      <p>博客内容</p>
      <p>{{blog.content}}</p>
      <p>博客分类</p>
      <ul>
        <li v-for="category in blog.categories" :key="category">{{category}}</li>
      </ul>
      <p>作者：{{blog.author}}</p>
    </div>
  </div>
</template>

<script>
import axios from "../axios-auth";
export default {
  //https://jsonplaceholder.typicode.com/
  //https://jsonplaceholder.typicode.com/posts
  name: "HelloWorld",
  data() {
    return {
      id: this.$route.params.id,
      blog: {},
      authors: ["chenlei", "xiaoliao", "xiaochen"],
      submmited: false
    };
  },
  methods: {
    fetchData() {
      console.log(this.id);
      axios
        .get("/blogs/" + this.id)
        .then(data => {
          return data.data;
        })
        .then(data => {
        //   console.log(data);
          this.blog = data;
        });
    },
    post: function() {
      axios.put("/blogs/" + this.id, this.blog).then(data => {
        this.submmited = true;
        console.log(data);
      });
    }
    // post:function(){
    //     this.$http.post("https://jsonplaceholder.typicode.com/posts",{
    //         title:this.blog.title,
    //         body:this.blog.content,
    //         userId:1
    //     }).then(function(data){
    //         this.blog.submmited = true;
    //         console.log(data)
    //     })
    // }
  },
  created() {
    this.fetchData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#add-blog * {
  box-sizing: border-box;
}

#add-blog {
  margin: 20px auto;
  max-width: 600px;
  padding: 20px;
}
label {
  display: block;
  margin: 20px 0 10px;
}
input[type="text"],
textarea,
select {
  display: block;
  width: 100%;
  padding: 8px;
}
textarea {
  height: 200px;
}
#checkboxes label {
  display: inline-block;
  margin-top: 0;
}
#checkboxes input {
  display: inline-block;
  margin-right: 10px;
}
button {
  display: block;
  margin: 20px 0;
  background: crimson;
  color: #fff;
  border: 0;
  padding: 14px;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
}
#preview {
  padding: 10px 20px;
  border: 1px dotted #ccc;
  margin: 30px 0;
}
#preview h3 {
  margin-top: 10px;
}
</style>
