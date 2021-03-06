var doms = {
    imgContainer: document.querySelector('.img-container'),
    time:document.querySelector('.time'),
    divWin:document.getElementById('divwin'),
    divFail:document.getElementById('divfail'),
    divBegin:document.getElementById('divbegin'),
    container:document.querySelector('.container'),
    audBg:document.getElementById('audbg'),
    audRight:document.getElementById('audright'),
    audLose:document.getElementById('audlose'),
    audWin:document.getElementById('audwin'),
};

var cards=[];
var cardNumber = 12;
var maxTime = 30;
var curTime = maxTime;

// 开始游戏

function startGame(){
    //1.控制元素的显示隐藏
    doms.divBegin.style.display = "none";
    // doms.divFail.style.display = "none";
    doms.container.style.display = "block";
    //2.初始化所有照片
    initCards();
    //3.启动计时器
    startTime();
    //4.启动声音
    doms.audBg.play();

}

function getRandom(min,max){
    return Math.floor(Math.random()*(max - min) + min);
}

/**
 * 初始化所有的卡片
 */
function initCards(){
    for(var i = 0;i<cardNumber;i+=2){
        var n = getRandom(1,5);//注意是总数的一半！！
        cards.push(new Card(n));
        cards.push(new Card(n));
    }
        console.log(cards);
    
    cards.sort(function(){
        return Math.random() - 0.5;
    })
    
    for(var i = 0; i < cards.length;i++){
        doms.imgContainer.appendChild(cards[i].dom);
    }
}
/**
 * 创建卡片的构造函数
 */
function Card(n){
    this.number = n;
    this.isActive = false;
    this.isClear = false;

    var that = this;

    this.dom = document.createElement('div');
    this.dom.className = "item";
    this.dom.innerHTML = `<img src="images/role${n}.jpg" alt="">`;
    this.dom.onclick = function(){
        setActive(that);
    }

}

/**
 * 传递一个card对象，该函数控制该对象的选中
 * @param {*} card 
 */
function setActive(card){
    if(card.isClear){
        return;//如果卡片已经被消除了，该操作没有任何意义
    }
     //得到之前选中的card对象
    var before = getActiveCard();
      //设置当前卡片的选中状态
    card.isActive = true;
    card.dom.classList.add("active");
    if(!before){
        //之前没有任何卡片被选中
        return;
    }
  //判断是否能够消除,注意自己点自己两下不能消除！
    if(before.number === card.number && cards.indexOf(before) !== cards.indexOf(card)){
        before.isClear = true;
        card.isClear = true;
        before.dom.style.opacity = 0;
        card.dom.style.opacity = 0;
       //从数组中移除
        removeCard(card);
        removeCard(before);

        //播放消除声音
        doms.audRight.currentTime = 0;
        doms.audRight.play();
        // isWin();
        if(cards.length === 0){
            gameWin();
        }
    }
    else{
        before.isActive = false;
        before.dom.classList.remove("active");
    }

}

function removeCard(card){
    var index = cards.indexOf(card);
    cards.splice(index,1);
}

// function isWin(){

// }

/**
 * 找到选中的并且没有消失的卡片
 */
function getActiveCard(){
    for(var i = 0; i < cards.length; i++){
        if(cards[i].isActive && !cards[i].isClear){
            return cards[i];
        }
    }
}
/**
 * 游戏胜利
 */
function gameWin(){
    doms.container.style.display = "none";
    doms.divWin.style.display = "block";
    clearInterval(timer);
    doms.audWin.play();
    doms.audBg.pause();
}
/**
 * 游戏失败
 */
function gameFail(){
    doms.container.style.display = "none";
    doms.divFail.style.display = "block";
    clearInterval(timer);
    doms.audLose.play();
    doms.audBg.pause();
}

var timer;
/**
 * 启动倒计时
 */
function startTime(){
    doms.time.innerText = `${curTime}s`;
    timer = setInterval(function() {
        curTime--;
        doms.time.innerText = `${curTime}s`;
        if(curTime === 0){
            gameFail();
        }
    }, 1000);
}

doms.divBegin.onclick = function(){
    startGame();
}