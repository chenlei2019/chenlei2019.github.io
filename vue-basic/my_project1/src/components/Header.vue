<template>
    <!-- //  changeTitle2 -->
    <header v-on:click="titleChanged">
        <h1>{{title}}--{{title2}}</h1>
    </header>
</template>

<script>
// import func from '../../vue-temp/vue-editor-bridge';
// import Vue from 'vue'
export default{
    name:'app-header',
    props:{
        title2:{
            type:String
        },
        flag:true
    },
    data(){
        return{
            title:"header-Vue.js Demo",

        }
    },
    methods:{
        changeTitle2:function(){
            if(this.flag == true){
                this.title2 = "title2 changed";
                this.flag = false
            }
            else{
                this.title2 = "title2";
                this.flag = true
            }
            
        },
        titleChanged:function(){
            this.$emit("titleChanged","子向父组件传值")
            
        }
    },
    // beforeCreate:function(){
    //     alert("组件实例化之前执行的函数");
    // },
    // created:function(){
    //     alert("组件实例化完毕，但页面还未显示");
    // },
    // beforeMount:function(){
    //     alert("组件挂载前，页面仍未展示，但虚拟Dom已经配置");
    // },
    // mounted:function(){
    //     alert("组件挂载后，此方法执行后，页面显示");
    // },
    // beforeUpdate:function(){
    //     alert("组件更新前，页面仍未更新，但虚拟Dom已经配置");
    // },
    // updated:function(){
    //     alert("组件更新后，此方法执行后，页面显示");
    // },
    // beforeDestroy:function(){
    //     alert("组件销毁前！");
    // },
    // destroyed:function(){
    //     alert("组件销毁后！");
    // }
}
</script>

<style scoped>
    header{
        background: lightgreen;
        padding: 10px;
        cursor: pointer;
    }
    h1{
        color: #222;
        text-align: center;
    }
</style>
