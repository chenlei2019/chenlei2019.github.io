/**
 * 全局参数
 */
var origin = {
    size : 500,
}
/**
 * 用于移动和调整大小以达到剪切目的的对象
 */
var cut = {
    dom: document.querySelector(".cut"),
    left: 150,
    top: 150,
    size: 150,
    
    //根据当前位置的属性，重新设置dom对象的样式
    show: function(){
        this.dom.style.left = this.left + "px";
        this.dom.style.top = this.top + "px";
        this.dom.style.width = this.size + "px";
        this.dom.style.height = this.size + "px";
    },

    /**
     * 移动到指定的位置
     * @param {*} left
     * @param {*} top
     */
    move: function(left,top){
        if(left < 0){
            left = 0
        }
        else if(left > origin.size - this.size){
            left = origin.size - this.size;
        }
        if(top < 0){
            top = 0;
        }
        else if(top > origin.size - this.size){
            top = origin.size - this.size;
        }
        this.left = left;
        this.top = top;
        this.show();
        result.setResult();
    },

    /**
     * 用于注册移动事件
     */
    moveEvent:function(){
        var that = this;
        this.dom.ontouchstart = function(e){
            var pageX = e.targetTouches[0].clientX,
                pageY = e.targetTouches[0].clientY,
                left = that.left,
                top = that.top;
            document.ontouchmove = function(e){
                var disX = e.targetTouches[0].clientX - pageX;
                var disY = e.targetTouches[0].clientY - pageY;
                that.onmove(left + disX, top + disY);
            }
            document.ontouchend = function(){
                document.ontouchmove = null;
            }
        }
    },
    /**
     * 用于注册重置大小的事件
     */
    resize: function(newSize){
        if(newSize < 50){
            newSize = 50;
        }
        var maxX = origin.size - this.left;
        var maxY = origin.size - this.top;
        var max = maxX>maxY?maxY:maxX;
        if(newSize > max){
            newSize = max;
        }
        this.size = newSize;
        this.show();
        result.setResult();
    },
    /**
     * 注册尺寸改变的事件
     */
    resizeEvent:function(){
        var resizeDom = document.querySelector(".cut .resize");
        var that = this;
        resizeDom.ontouchstart = function(e){
            e.stopPropagation();//阻止事件冒泡
            var pageX = e.targetTouches[0].clientX;
            var pageY = e.targetTouches[0].clientY;
            var size = that.size;
            document.ontouchmove = function(e){
                var disX = e.targetTouches[0].clientX - pageX;
                var disY = e.targetTouches[0].clientY - pageY;
                var max = disX > disY ? disX : disY;
                that.resize(size + max);
            }
            document.ontouchend = function(){
                document.ontouchmove = null;
            }
        }
    }
}

cut.moveEvent();
cut.resizeEvent();

/**
 * 截取结果展示对象
 */
var result = {
    size: 150,
    dom: document.querySelector(".right"),
    bgSize: 0,
    bgLeft: 0,
    bgTop: 0,

    show: function(){
        this.dom.style.backgroundSize = this.bgSize + "px " + this.bgSize + "px";
        this.dom.style.backgroundPosition = "-" + this.bgLeft + "px " + "-" + this.bgTop + "px"; 
    },
    /**
     * 根据左边截图区域的信息，设置当前区域背景图片的尺寸和位置
     */
    setResult:function(){
        //1.设置背景图尺寸
        this.bgSize = this.size / (cut.size / origin.size);
        console.log(this.bgSize);
        //2.设置背景图片的位置
        this.bgLeft = cut.left / origin.size * this.bgSize ;
        this.bgTop = cut.top / origin.size * this.bgSize ;
        console.log(this.bgLeft,this.bgTop);

        //3.显示
        this.show();

    }
}
result.setResult();