//装字母图片的容器
var letterContainer = document.querySelector('.letters');
var score = 0;
var curLost = 0;
var maxLost = 10;
var divBoard = document.querySelector('.board');

/**
 * 得到最小值到最大值之间的随机数
 * @param {*} min 
 * @param {*} max 
 */
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomLetter(){
    var letterCode = getRandom(65,91);
    return String.fromCharCode(letterCode);
}

/**
 * Letter 构造函数，通过该函数，可以创建一个字母对象，
 * 包含imgdom元素，和其各种属性，比如字母属性，还有各种方法
 */
function Letter(){
    this.top = -100;
    this.left = getRandom(0,letterContainer.clientWidth - 100);

    this.letter = getRandomLetter();

    this.speed = getRandom(50,100);

    this.img = document.createElement('img');
    this.img.src = `img/letter/${this.letter}.png`;
    this.img.className = "letter";
    letterContainer.appendChild(this.img);
    this.img.style.left = this.left + 'px';
    this.render(); //设置纵坐标
}

/**
 * 将该字母重新显示
 */
Letter.prototype.render = function(){
    this.img.style.top = this.top +'px';
}
/**
 * 告知该函数经过的时间（单位毫秒）
 * 该函数会根据自身的top值、速度、和经过的时间，重新计算出当前的top值，然后自行改变top值，重新显示
 */
Letter.prototype.move = function (duration){
    var dis = this.speed * duration / 1000;
    this.top += dis;
    this.render();
}

/**
 * 杀死这个元素（将自己清除掉）
 */
Letter.prototype.kill = function (){
    this.img.remove();
    var index = letterArray.indexOf(this);
    letterArray.splice(index,1);
}

var letterArray = [];//用于保存产生的字母对象
var produceTimer;  //用于记录生产字母计时器的id
/**
 * 该函数用于生产字母
 */
function produceLetter(){
    clearInterval(produceTimer);
    produceTimer = setInterval(() => {
        letterArray.push(new Letter());
    }, 600);
}

var moveTimer;

function move(){
    clearInterval(moveTimer);
    moveTimer = setInterval(() => {
        for(var i = 0; i < letterArray.length; i++){

            var ltr = letterArray[i];
            ltr.move(16);

            if(ltr.top > letterContainer.clientHeight){
                ltr.kill();
                i--;
                curLost++;
                setBoard();
                if(curLost >= maxLost){
                    gameOver();
                }
            }
        }
    }, 16);
}
/**
 * 设置面板中的数据
 */
function setBoard(){
    divBoard.innerHTML =  `
    <p>得分：${score}</p>
    <p>丢失：${curLost} / ${maxLost}</p>
    `;
}

function gameOver(){
    clearInterval(produceTimer);
    clearInterval(moveTimer);
    window.onkeypress = null;
    document.querySelector('.gameover').style.display = 'block';
}

produceLetter();
move();
setBoard();

//注册键盘事件
window.onkeypress = function(e){
    var pressLetter = e.key.toUpperCase();
    for(var i = 0;i < letterArray.length; i++){
        var ltr = letterArray[i];
        if(ltr.letter === pressLetter){
            ltr.kill();
            score += 10;
            setBoard();
            return; //杀一个就返回，不要太贪心
        }
    }
}
