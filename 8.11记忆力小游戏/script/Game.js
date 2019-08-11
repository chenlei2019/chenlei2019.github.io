// import Card from "./Card.js"

/**
 * 生成一个最小值到最大值之间的随机数（取值不到最大值）
 */
function getRandom(min,max){
    return Math.floor(Math.random()*(max - min) + min);
}

//ul元素
var listDom = document.querySelector(".list");

//实现游戏构造函数

function Game(){
    this.cards = [];
    this.isFlipping = false;//当前游戏中，是否有卡片正在翻开
}

/**
 * 初始化游戏
 */
Game.prototype.init = function(){
    //初始化数组
    this.cards=[];
    for(var i = 0; i < 18; i++){
        var index = getRandom(1,7);
        //加入两张一样的卡片
        this.cards.push(new Card(index));
        this.cards.push(new Card(index));
    }
    //数组随机排序
    this.cards.sort(function(){
        return Math.random() - 0.5;
    })
    //将卡片对应的dom加入到容器中
    this.initContainer();
    //处理卡片对象的事件
    this.addEvent();
}

/**
 * 初始化容器
 */
Game.prototype.initContainer = function(){
    listDom.innerHTML = "";
    for(var i = 0;i < this.cards.length;i++){
        this.cards[i].appendTo(listDom);
    }
}

/**
 * 给卡片对象添加事件
 */
Game.prototype.addEvent = function (){
    var that = this;//保存当前游戏对象
    for(var i = 0; i < this.cards.length;i++){
        var c = this.cards[i];//拿到卡片对象
        c.onClick = function(){
            if(this.status === "back" && !that.isFlipping){
                that.isFlipping = true;//设置为正在翻开
                this.setStatus("front");
            }
        }
        c.onTransitionEnd = function(){
            that.isFlipping = false;//设置为没有正在翻开
            //对比
            that.compareCards();
        }
    }
}

/**
 * 对比游戏中两张翻开的卡片，如果相同就消除，不同就设置为back状态
 */
Game.prototype.compareCards = function(){
    //1.获取两张翻开的卡片
    var cs = this.cards.filter(function(c){
        return c.status === "front";
    })
    if(cs.length !== 2){
        return;
    }
    //只处理两张翻开的卡片的情况
    var card1= cs[0],card2=cs[1];
    if(card1.equal(card2)){
        //一样，就清除
        card1.setStatus("clear");
        card2.setStatus("clear");
        //胜负判断
        //得到没有消除的卡片数组
        var unclearCards = this.cards.filter(function(c){
            return c.status !== "clear";
        });
        if(unclearCards.length === 0){
            console.log("游戏胜利！");
            alert("游戏胜利！");
        }
    }
    else {
        //不一样，就翻回去
        card1.setStatus("back");
        card2.setStatus("back");
    }
}

window.g = new Game();
g.init();

// export default Game