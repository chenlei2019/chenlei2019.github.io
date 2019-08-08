var one = new Vue({
    el: '#vue-app-one',
    data: {
        title:"app one的内容",
    },
    methods: {
        punch: function(){

        },
        restart: function(){

        }
    },
    computed: {
        greet:function(){
            return "Hello app one"
        }
    }
});
var two = new Vue({
    el: '#vue-app-two',
    data: {
        title:"app two的内容"
    },
    methods: {
        changeTitle:function(){
            one.title = "已经改名字了！"
        }
    },
    computed: {
        greet:function(){
            return "Hello app two"
        }
    }
});
two.title = "app two 的title也发生变化了！"
