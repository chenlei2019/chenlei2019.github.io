new Vue({
    el: '#vue-app',
    data: {
        name: 'Shaun',
        job:'web开发',
        website:"http://www.clalyh.cn",
        websiteTag: "<a href='http://www.clalyh.cn'>website</a>",
    },
    methods:{
        greet: function(time){
            return 'Good ' + time +" " + this.name + '!';
        }
    }
});