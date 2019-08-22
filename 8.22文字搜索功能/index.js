var obj = {

    init:function(){
        this.nowIndex = 0;
        this.timer = null;

        this.slideAuto();

        this.bindEvent();
    },
    //绑定事件
    bindEvent:function(){
        //left right list circle
        var left = document.getElementsByClassName('left')[0];
        console.log(left);
        var right = document.getElementsByClassName('right')[0];
        var circle = document.getElementsByClassName('circle');
        var wrapper = document.getElementsByClassName('wrapper')[0]
        var that = this;
        left.onclick = function(){
            //向左运动
            that.move('left');
        };
        right.onclick = function(){
            //向右运动
            that.move('right');
        };
        for(var i=0;i<circle.length;i++){
            circle[i].setAttribute('data-index',i);
            circle[i].onclick = function(){
                var index = this.getAttribute('data-index');
                // console.log(index);
                that.move(index);
            }
        };
        wrapper.onmouseenter = function(){
            clearTimeout(that.timer);
        }
        wrapper.onmouseleave = function(){
            that.slideAuto();
        }
    },
    slideAuto:function(){
        var that = this;
        clearTimeout(that.timer);
        that.timer = setTimeout(() => {
            that.move('right');
        }, 2000);
    },
    move:function(dir){
        console.log(dir);
        var img = document.getElementsByTagName('img');
        var len = img.length;
        console.log(len);
        if(dir == 'left' || dir == 'right'){
            if(dir == 'left'){
                this.nowIndex-- ;
                this.nowIndex = this.nowIndex < 0 ? len -1 : this.nowIndex;
            }
            else{
                this.nowIndex++;
                this.nowIndex = this.nowIndex > len -1 ? 0 : this.nowIndex;
                this.slideAuto();
            }
        }else{
            this.nowIndex = dir;
            console.log(this.nowIndex);
        }
        var ulBox = document.getElementsByClassName('picBox')[0];
        ulBox.style.left = -this.nowIndex * 700 + "px";
        var box = document.getElementsByClassName('box');
        console.log(this.nowIndex);
        box[this.nowIndex].style.opacity = 1;
        for(var i = 0; i < len; i++){
            if(i != this.nowIndex){ //这里!==恒等于有问题！！nowIndex好像是字符！
                box[i].style.opacity = 0;
            }
        }
        this.changeStyle();
    },
    changeStyle:function(){
        var active = document.getElementsByClassName('active')[0];
        active.classList.remove('active');
        var circle = document.getElementsByClassName('circle');
        circle[this.nowIndex].classList.add('active');
    }
};
obj.init();