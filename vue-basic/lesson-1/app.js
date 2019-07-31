new Vue({
    el: '#vue-app',
    data: {
        name: 'Shaun',
        job:'web开发'
    },
    methods:{
        greet: function(time){
            return 'Good ' + time +" " + this.name + '!';
        }
    }
});