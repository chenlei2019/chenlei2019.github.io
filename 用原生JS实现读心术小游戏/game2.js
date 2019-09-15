//将最终读心的结果定下来
var resultIndex = getRandom(0,16);
//设置最终读心的结果
document.querySelector(".result").src = `img/values/${resultIndex}.png`;
/**
 * 初始化右边的参考表格
 */
function initTable(){
    var rightContainer = document.querySelector(".right-container");
    //生成一个div
    for(var i = 0;i < 100;i++){

         var div = document.createElement('div');
    div.className = "item";
    if(i % 9 == 0){
        //骗人的，使用早就定好的值
        var n = resultIndex;
    }
    else{
        var n = getRandom(0,16);
    }
    div.innerHTML = `<span>${i}</span><img src = "img/values/${n}.png" />`;
    rightContainer.appendChild(div);
    }
}

/**
 * 得到一个最小值到最大值之间的随机数(取不到最大值)
 * @param {*} min 
 * @param {*} max 
 */
function getRandom(min,max){
    return Math.floor(Math.random()*(max - min) + min);
}

initTable();

//圆盘的dom
var board = document.querySelector(".board");

board.onclick = function () {
    // 让该div顺时针旋转1800度
    this.style.transform = "rotate(1800deg)";
    // 什么时候显示???
    // setTimeout(function(){

    // }, 4000)
}

//transitionend事件发生在过渡完成之后
board.addEventListener("transitionend",function(){
    console.log("过度完成");
    var divCenter = document.querySelector(".center")
    var divResult = document.querySelector(".result");
    divCenter.style.display = "none";
    divResult.style.display = "block";
})