var config = {
    rows:15,
    cols:15,
    gameDom:document.getElementById("game"),
    infoDom:document.getElementById("info"),
    splitSize:40,
    btnReset:document.getElementById("reset")
}
//棋盘
//棋盘中有很多旗子

var board;
var nextChess = 1;
var isGameOver = false;

// 初始化所有棋子
function initBoard(){
    board = new Array(config.rows);
    for(var i = 0;i < board.length; i++){
        board[i] = new Array(config.cols);

        board[i].fill(0);
    }
}
function init(){
    nextChess = 1;
    isGameOver = false;
    config.gameDom.innerHTML = "";
    initBoard();
    regEvent();

}


/**
 * 向指定的行和列放置一个棋子
 */
function putChess(row,col){
    if(row<0 || col<0 || row>config.rows -1 || col>config.cols-1){
        return;
    }
    if(board[row][col]){
        //这个位置已经有棋子了！
        return;
    }

    board[row][col] = nextChess;
    var div = document.createElement("div");
    div.className = "chess " + (nextChess===1 ? "black" : "white");
    div.style.left = col * config.splitSize + "px";
    div.style.top = row * config.splitSize + "px";
    config.gameDom.appendChild(div);

    if(nextChess === 1){
        nextChess = 2;
    }
    else{
        nextChess = 1;
    }

    //胜负判断
    if(hasWin(row,col)){
        //游戏结束
        isGameOver = true;
        config.gameDom.onclick = null;
    }
    showInfo();

}

function getChess(row,col){
    if(board[row] === undefined){
        return;
    }
    else if(board[row][col] === undefined){
        return;
    }
    return board[row][col];
}
/**
 * 是否有人胜利
 */
function hasWin(row,col){
    var chess = getChess(row,col);

    //横向是否有五子相连
    var line = 1;
    for(var i=col -1;getChess(row,i) === chess; i--){
        line++;
    }
    for(var i = col + 1;getChess(row,i) === chess; i++){
        line++;
    }
    if(line >=5){
        return true;
    }
     //纵向是否有五子相连
     var line = 1;
     for(var i=row -1;getChess(i,col) === chess; i--){
         line++;
     }
     for(var i = row + 1;getChess(i,col) === chess; i++){
         line++;
     }
     if(line >=5){
         return true;
     }
      //横向是否有五子相连
    var line = 1;
    for(var i=row -1,j = col + 1;getChess(i,j) === chess; i--,j++){
        line++;
    }
    for(var i = row + 1,j=col -1;getChess(i,j) === chess; i++,j--){
        line++;
    }
    if(line >=5){
        return true;
    }
     //横向是否有五子相连
     var line = 1;
     for(var i=row -1,j = col - 1;getChess(i,j) === chess; i--,j--){
         line++;
     }
     for(var i = row + 1,j=col +1;getChess(i,j) === chess; i++,j++){
         line++;
     }
     if(line >=5){
         return true;
     }
}

/**
 * 注册点击事件
 */
function regEvent(){
    config.gameDom.onclick = function(e){
        if(e.target.classList.contains("chess")){
            return;
        }
        var x = e.offsetX - 20,
            y = e.offsetY - 20;
            console.log(x,y);
        var col = Math.round(x / config.splitSize);
        var row = Math.round(y / config.splitSize);
        putChess(row,col);
    }
    config.btnReset.onclick = function(){
        init();
    }
}
/**
 * 显示信息
 */
function showInfo(){
    if(isGameOver){
        var who;
        if(nextChess === 1){
            who = "白棋胜利！"
        }
        else{
            who = "黑棋胜利！"
        }
        config.infoDom.innerHTML = "游戏结束" + who;
    }
    else{
        var who;
        if(nextChess === 1){
            who = "轮到黑棋！"
        }else{
            who = "轮到白棋！"
        }
        config.infoDom.innerHTML = who;
    }
}

init();