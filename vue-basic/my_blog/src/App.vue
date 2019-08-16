<template>
  <div id="app">
    <!-- <add-blog></add-blog> -->
    <show-blogs></show-blogs>
  </div>
</template>

<script>
import AddBlog from './components/AddBlog'
import ShowBlogs from './components/ShowBlogs'

export default {
  name: 'App',
  components: {
    AddBlog,ShowBlogs
  }
}
</script>

<style>

</style>
