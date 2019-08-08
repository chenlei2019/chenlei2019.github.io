//实现滚动条功能
var barHelper = (function(){
    var listDom = document.querySelector(".music .list");
    var bardom = document.querySelector(".music .scroll-bar");
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
        bardom.style.height = h + "px";
    }
    /**
     * 设置滚动条条儿的位置
     */
    function setBarTop(){
        var top = listDom.scrollTop / listDom.scrollHeight * listClientHeight;
        bardom.style.top = top + "px";
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
        


    }

})();