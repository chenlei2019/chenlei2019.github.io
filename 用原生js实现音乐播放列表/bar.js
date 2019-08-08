//实现滚动条功能
var barHelper = (function(){
    var listDom = document.querySelector(".music .list");
    var barDom = document.querySelector(".music .scroll-bar");
    //列表的可见高度
    var listClientHeight = listDom.clientHeight;
    /**
     * 设置滚动条条儿的高度
     */
    function setBarHeight(){
        var scrollHeight = listDom.scrollHeight;
        var h = listClientHeight / scrollHeight * listClientHeight;
        if(h >= listClientHeight){
            h = 0;
        }
        barDom.style.height = h + "px";
    }
    /**
     * 设置滚动条条儿的位置
     */
    function setBarTop(){
        var top = listDom.scrollTop / listDom.scrollHeight * listClientHeight;
        barDom.style.top = top + "px";
    }
    

    function init(){
        setBarHeight();
        setBarTop();
    }
    init();

    var timer = null;
    /**
     * 设置列表的scrollTop
     * @param {*} newScrollTop 
     */

    function setListScrollTop(newScrollTop){
        clearInterval(timer);//避免重复调用函数，停止之前的移动
        //使用动画实现滚动
        //例如：scrollTop  300 -> 100
        var spd = 1;//速度：1毫秒变化的距离
        var dis = newScrollTop - listDom.scrollTop;//移动的总距离
        var tick = 10;    //多少毫秒移动一次
        var duration = Math.abs(dis / spd);//计算移动的总时间
        var times = Math.ceil(duration / tick);//一共需要移动多少次
        var curTimes = 0;//当前移动的次数
        var everyDis = dis / times;//每次移动的距离
        timer = setInterval(function(){
            curTimes++;
            listDom.scrollTop += everyDis;
            setBarTop();
            if(curTimes === times){
                clearInterval(timer);
            }
        }, tick);
    }

    /**
     * 根据滚动条条儿的位置，直接设置（没有动画）列表的滚动高度
     */
    function setListScrollTopFromBarTop(top){
        var sh = top / listClientHeight * listDom.scrollHeight;
        listDom.scrollTop = sh;
    }
    /**
     * 鼠标滚轮事件
     */
    listDom.onmousewheel = function(e){
        //e.dltaY表示理论上，scrollTop应该改变的值
        console.log(e.deltaY);
        setListScrollTop(listDom.scrollTop + e.deltaY);
    }

    barDom.onmousedown = function(e){
        var y = e.pageY;//相对于网页的y坐标
        var top = parseFloat(getComputedStyle(this).top);//按下时的top值
        var h = barDom.clientHeight;//滚动条条儿自身的高度
        window.onmousemove = function(e){
            var newY = e.pageY;
            var newTop = top + (newY - y);
            if(newTop < 0){
                newTop = 0;
            } 
            else if(newTop > listClientHeight - h){
                newTop = listClientHeight - h;
            }
            barDom.style.top = newTop + "px";
            setListScrollTopFromBarTop(newTop);
        }

        window.onmouseup = function(){
            window.onmousemove = null;
        }
    }

    return {
        setBarHeight,
        init,
        setBarTop,
        setListScrollTop
    }

})();