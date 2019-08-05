new Vue({
    el: '#vue-app',
    data: {

        characters:["Mario","Luffy","Yoshi"],
        users:[
            {name:"Henry",age:30},
            {name:"Bucky",age:18},
            {name:"Emily",age:25}
        ]
        // error:false,
        // success:false,
        // changeColor:false,
        // changeLength:false,
        // age: 20,
        // a: 0,
        // b: 0
        // name: '陈磊',
        // age: '38',
        // x: 0,
        // y: 0
    },
    computed:{



        // compClasses:function(){
        //     return {
        //         changeColor:this.changeColor,
        //         changeLength:this.changeLength,
        //     }
        // }

        // compClasses:function(){
        //     return {
        //         changeColor:this.changeColor,
        //         changeLength:this.changeLength,
        //     }
        // }

        // addToA:function(){
        //     console.log('add to a');
        //     return this.a + this.age;
        // },
        // addToB:function(){
        //     console.log('add to b');
        //     return this.b + this.age;
        // }
    },
    methods: {
        // addToA:function(){
        //     console.log('add to a');
        //     return this.a + this.age;
        // },
        // addToB:function(){
        //     console.log('add to b');
        //     return this.b + this.age;
        // }
        // logName:function(){
        //     console.log('你正在输入名字！');
        //     this.name = this.$refs.name.value;
        // //    console.log(this.$refs.name.value);
        // },
        // logAge:function(){
        //     console.log('你正在输入年龄！');
        //     this.age = this.$refs.age.value;
        // },
    }
});
