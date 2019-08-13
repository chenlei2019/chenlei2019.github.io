<template>
<div class="row">
    <div class="col-sm-12 text-center" id="home">
        <div class="background">
            <h1>欢迎大家品尝pizza</h1>
            <h2>这里有你非常喜欢的pizza！</h2>
                <button @click="goToMenu" class="btn btn-success">Let's order!</button>
        </div>
    </div>
    <!-- <h1>Home</h1>
    <button @click="goToMenu" class="btn btn-success">Let's order!</button> -->
</div>
    
</template>

<script>
export default {
    methods:{
        goToMenu(){
            //跳转到上一次浏览的页面
            // this.$router.go(-1)

            //指定跳转到指定的地址
            // this.$router.replace('/menu')

            //指定路由的名字下
            // this.$router.replace({name:'menuLink'})

            //通过push进行跳转
            // this.$router.push('/menu');
            this.$router.push({name:'menuLink'});
            // this.$router.push('/menu')
        }
    }
}
</script>

<style>
#home{
    background:url("../../src/assets/pizza.jpg") no-repeat center center;
    background-size: 100%;
    height: 85vh;
    width: 100vw;
    padding: 10%; 
}
h1 h2{
    margin: 6%;
}
.background{
    background: #eee;
    opacity: 0.8;
    max-width: 70vw;
    margin-right: 0 auto;
    padding: 20px 0;
}

</style>