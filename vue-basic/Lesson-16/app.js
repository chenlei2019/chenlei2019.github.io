// var data = {
//     name:"三石"
// }
Vue.component("greeting",{
    template:`<p>大家好，给大家介绍一下我自己，我的名字叫：{{name}}！
    <button v-on:click="changeName">改名</button></p>
        `,
    data:function(){
        // return data
        return {
            
             name:"chenlei"
        }
    },
    methods:{
        changeName:function(){
            this.name = "xiaoliao"
        }
    }
})

new Vue({
    el: '#vue-app-one',
});
new Vue({
    el: '#vue-app-two',
});
