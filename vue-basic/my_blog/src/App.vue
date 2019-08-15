<template>
  <div id="app">
    <add-blog></add-blog>
  </div>
</template>

<script>
import AddBlog from './components/AddBlog'

export default {
  name: 'App',
  components: {
    AddBlog
  }
}
</script>

<style>
  #add-blog *{
    box-sizing: border-box;
  }

  #add-blog{
    margin:20px auto;
    max-width: 600px;
    padding: 20px;
  }
  label{
    display: block;
    margin: 20px 0 10px;
  }
  input[type="text"],textarea,select{
    display: block;
    width: 100%;
    padding: 8px;
  }
  #checkboxes label{
    display: inline-block;
    margin-top: 0;
  }
  #checkboxes input{
    display: inline-block;
    margin-right: 10px;
  }
</style>
