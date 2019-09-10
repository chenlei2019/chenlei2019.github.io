window.onload = function () {
    var oImg = document.getElementsByTagName('img');
    var len = oImg.length;
    var deg = 360 / len;

    //遍历到每一张图片
    for (var i = 0; i < len; i++) {
        oImg[i].style.transform = 'rotateY(' + deg * i + 'deg) translateZ(300px)';
        oImg[i].style.transition = 'all .5s liner ' + (len - 1 - i) * 0.1 + 's';
    }
    bindEvent();
}

function bindEvent() {
    var body = document.getElementsByTagName('body')[0];
    var oBox = document.getElementsByClassName('box')[0];

    var lastX,lastY,nowX,nowY,disX,disY;
    var rowX = 0,rowY = 0;
    var timer;

    //拖拽box————》x，y旋转box
    body.onmousedown = function (e) {
        lastX = e.clientX;
        lastY = e.clientY;

        body.onmousemove = function (e) {
            nowX = e.clientX;
            nowY = e.clientY;

            disX = nowX - lastX;
            disY = nowY - lastY;
            rowX -= disY * 0.2;
            rowY += disX * 0.2;

            oBox.style.transform = 'rotateX(' + rowX + 'deg) rotateY(' + rowY + 'deg)';

            lastX = nowX;
            lastY = nowY;
        }
        body.onmouseup = function(){
            body.onmousemove = null;
            //惯性
            timer = setInterval(() => {
                disX *=0.95;
                disY *=0.95;
                rowX -= disY * 0.5;
                rowY += disX * 0.5;
                oBox.style.transform = 'rotateX(' + rowX + 'deg) rotateY(' + rowY + 'deg)';

                if(Math.abs(disX) < 0.1 && Math.abs(disY) < 0.1 ){
                    clearInterval(timer);
                }
            }, 20);
        }
        return false;
    }
   
}
