/** 
 * 配置
*/
var config = {
    fragment: {
        //片段配置
        size: 34,
        r: 5//中间半圆的半径
    },
    canvas: {
        width: 200,
        height: 100,
    },
    barWidth:154,
    errorRang:5
}
//片段能移动的总距离
config.fragDistance = config.canvas.width - config.fragment.size;

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
/**
 * 获得弧度
 * @param {*} degree 
 */
function getRadian(degree) {
    return degree * Math.PI / 180;
}
/**
 * 从一个画布中，画一个片段 * 
 */
function drawFragment(ctx, x, y) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    var size = config.fragment.size, r = config.fragment.r;
    var nextX = x + (size / 2 - r);
    ctx.lineTo(nextX, y);

    ctx.arc(x + size / 2, y, r, getRadian(180), getRadian(0));

    nextX = x + size;
    ctx.lineTo(nextX, y);

    var nextY = y + (size / 2 - r);
    ctx.lineTo(nextX, nextY);

    ctx.arc(nextX, y + size / 2, r, getRadian(-90), getRadian(90), true);

    nextY = y + size;
    ctx.lineTo(nextX, nextY);
    ctx.lineTo(x, nextY);
    ctx.closePath();
}
/**
 * 清空画布
 */
function clear(ctx) {
    ctx.canvas.width = ctx.canvas.width;
}

var hole = {
    ctx: document.getElementById('cvsHole').getContext('2d'),
    /**
     * 画一个洞
     */
    draw: function () {
        clear(this.ctx);
        this.x = getRandom(config.fragment.size, config.canvas.width - config.fragment.size);
        this.y = getRandom(config.fragment.r, config.canvas.height - config.fragment.size);
        drawFragment(this.ctx, this.x, this.y);
        this.ctx.fillStyle = "#333";
        this.ctx.fill();
    }
}

// hole.draw();

/**
 * 画的图片片段
 */
var frag = {
    ctx: document.getElementById('cvsFrag').getContext("2d"),
    divContainer:document.querySelector(".frag"),
    divLeft:0,
    /**
     * 画一个片段，该片段的位置与hole的位置一致
     */
    draw: function (imgSrc) {
        clear(this.ctx);
        drawFragment(this.ctx, hole.x, hole.y);
        this.ctx.clip();
        var img = new Image();
        img.onload = function () {
            //this指向要出问题
            frag.ctx.drawImage(img, 0, 0, config.canvas.width, config.canvas.height);

        }
        img.src = imgSrc;
    },
    setLeft:function(left){
        this.divLeft = left;
        this.divContainer.style.left = this.divLeft + "px";
    }
}
/**
 * 画阴影
 */
var shadow = {
    ctx: document.getElementById('cvsShadow').getContext("2d"),
    /**
     * 画一个片段，该片段的位置与hole的位置一致
     */
    draw: function () {
        clear(this.ctx);
        drawFragment(this.ctx, hole.x, hole.y);
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = "#000";
        this.ctx.fill();
    }
}

function draw() {
    var index = getRandom(1,4);
    var imgUrl = "./images/t" + index + ".png";
    var snImg = document.querySelector(".snimg");
    snImg.style.backgroundImage = "url(" +imgUrl + ")";
    hole.draw();
    frag.draw(imgUrl);
    shadow.draw();
    frag.setLeft(-hole.x);
}

draw();

var reloadDom = document.querySelector(".reload");
reloadDom.onclick = draw;

var bar = document.querySelector(".bar");

bar.onmousedown = function(e){
    var pageX = e.pageX,
        left = 0,
        divLeft = frag.divLeft;
        console.log(divLeft);
        window.onmousemove = function(e){
            var disX = e.pageX - pageX;
            var newLeft = left + disX;
            // var newdivLeft = divLeft;
            if(newLeft < 0){
                newLeft = 0;
            }
            else if(newLeft > config.barWidth){
                newLeft = config.barWidth;
            }
            console.log(divLeft);
            var newdivLeft = newLeft / config.barWidth * config.fragDistance + divLeft;
            console.log(divLeft);
            bar.style.left = newLeft +"px";
            frag.divLeft = newdivLeft;
            frag.divContainer.style.left = newdivLeft + "px";
        }

        window.onmouseup = function(){
            window.onmousemove = null;

            //判断是否移动到位
            var left = Math.abs(frag.divLeft);
            if(left < config.errorRang){
                alert("验证成功！");
                bar.onmousedown = null;
                reloadDom.onclick = null;
                window.onmouseup = null;
            }
            else{
                alert("验证失败！");
                bar.style.left = 0;
                frag.setLeft(-hole.x);
            }
        }
}
