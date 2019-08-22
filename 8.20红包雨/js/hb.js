(function(){
    //默认红包雨的数量
    var Number_of_Leaves = 80;
    function init(){
        var container = document.getElementById('petalbox');
        //try作为错误处理机制
        try {
            for(var i =0; i < Number_of_Leaves; i++){
                console.log("进入第一步");
                container.appendChild(createAleaf());
            }
        } catch (e) {
            //处理错误
            console.log(e);
        }
    };

    function randomInteger(low,heigh){
        return low + Math.floor(Math.random()*(heigh - low));
    };


    //每一个红包的制作
    function createAleaf(){
        //获取页面元素
        var leafDiv = document.createElement("div");
        var img = document.createElement("img");

        img.src = 'images/hb/petal' + randomInteger(1,10) + '.png';


        //图片初始化位置
        leafDiv.style.top = randomInteger(-200,-100) + "px";
        leafDiv.style.left = randomInteger(0,1920) + "px";


        //动画效果制作，是由css3样式来完成的
        var spinAnimationName = (Math.random()<0.5) ? 'clockwiseSpin' : 'counterclockwiseSpinAndFlip';

        //红包雨图片的动作名称
        leafDiv.style.webkitAnimationName = "drop";
        leafDiv.style.animationName = "drop";
        img.style.animationName = spinAnimationName;
        //随机下落时间
        var fadeAndDropDuration = randomInteger(1.2,8.2);
        //随机旋转时间
        var spinDeration = randomInteger(3,4);
        // leafDiv.style.animationDuration = fadeAndDropDuration + "s" +", " + fadeAndDropDuration;
        leafDiv.style.animationDuration = fadeAndDropDuration + "s";
        //设定delay时间
        var leafDelay = randomInteger(0,2);
        img.style.animationDuration = spinDeration + "s";
        leafDiv.style.animationDelay = leafDelay + "s";
        leafDiv.appendChild(img);
        return leafDiv;
    };
    
    init();
})();