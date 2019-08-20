/**
 * 创建刻度
 */
function createMarks(){
    var markDom = document.querySelector(".mark");

    for(var i = 0;i < 60; i++){
        var markDiv = document.createElement('div');
        markDiv.style.transformOrigin = "250px 0px";
        markDiv.style.transform = "translateY(250px) rotate(" + i*6 + "deg)";
        if(i % 5 ===0){
            markDiv.className = "bold";
        }
        markDom.appendChild(markDiv);
    }
}

/**
 * 创建数字
 */
function createNumbers(){
    var numberContainer = document.querySelector(".number");
    var R = 220;//数字围绕的半径
    for(var i = 1; i <= 12; i++){
        var div = document.createElement("div");
        div.innerHTML = i;
        //计算角度
        var degree = (i - 3) * 30;
        //计算弧度
        var radian = degree * Math.PI / 180;
        div.style.left = Math.cos(radian) * R + "px";
        div.style.top = Math.sin(radian) * R + "px";
        numberContainer.appendChild(div);
    }
}

function setPointers(){
    var hDom = document.querySelector(".h");
    var mDom = document.querySelector(".m");
    var sDom = document.querySelector(".s");
    var now = new Date();
    var zero = new Date(now.getFullYear(),now.getMonth(),now.getDate());
    var timespan = now - zero;
    var hspan = timespan /(60*60*1000);
    var mspan = timespan / (60*1000);
    var sspan = timespan / 1000;
    var hdeg = (hspan - 3) * 30;
    var mdeg = (mspan - 15) * 6;
    var sdeg = (sspan - 15) * 6;
    hDom.style.transform = "translateY(-50%) rotate(" + hdeg + "deg)";
    mDom.style.transform = "translateY(-50%) rotate(" + mdeg + "deg)";
    sDom.style.transform = "translateY(-50%) rotate(" + sdeg + "deg)";
}

createMarks();
createNumbers();
setInterval(() => {
    setPointers();
}, 16);