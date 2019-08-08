<template>
  <div class="users">
      <ul>
          <li v-for="user in users">
              {{user}}
          </li>

      </ul>
  </div>
</template>

<script>
export default {
  name: 'users',
  data () {
    return {
      users:["Henry","Bucky","Emily"]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

</style>
