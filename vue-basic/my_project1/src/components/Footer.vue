<template>
    <footer>
        <h2>{{copyright}}--{{title2}}</h2>
    </footer>
</template>

<script>
// import Vue from 'vue'
export default{
    name:'app-footer',
    props:{
        title2:{
            type:String
        }
    },
    data(){
        return{
            copyright:"copyright 2019 chenlei Demo"
        }
    }
}
</script>

<style scoped>
    footer{
        background: #222;
        padding: 6px;
    }
    h2{
        color: lightgreen;
        text-align: center;
    }
</style>
