function init(){
    addImg();
}
init();
var flag = true;
var len,img;
//在html中插入图片
function addImg(){
    var imgBox = document.getElementsByClassName('imgBox')[0];
    for(var i = 0; i < 50;i++){
        var num = Math.floor(Math.random()*10);
        var src = './pic/' + num + '.jpg';
        var dom = document.createElement('img');
        dom.setAttribute('src',src);
        imgBox.appendChild(dom);
    }
    bindEvent();
}

function bindEvent(){
    img = document.getElementsByTagName('img');
    len = img.length;

    var btn = document.getElementsByClassName('btn')[0];
    btn.addEventListener('click',function(){
        if(!flag){
            return;
        }
        flag = false;
        var endNum = 0;
        var secondNum = 0;
        for(var i = 0; i < len; i++){

            (function(i){

                setTimeout(function() {
                    monition(img[i],'2s',function(){
                        this.style.transform = 'scale(0)';
                        console.log("first:",endNum);
                    },function(){
                        // this.style.transform = 'scale(1)';
                        //速度太快，可能这个dom还没有执行完，又坚挺了dom的transitionend，程序就又执行了addEventListener的回调函数！！
                        monition(this,'2s',function(){
                            this.style.transform = 'scale(1)';
                            this.style.opacity = 0;
                            secondNum ++
                            console.log('second:',secondNum);
                        },function(){
                            endNum ++;
                            console.log('endNum',endNum);
                            if(endNum == len){
                                show();
                            }
                            
                        });
                    });
                }, Math.random()*1000);

            })(i);
           

        }
    })
}

//图片旋转函数
function show(){
    var allend = 0;
    for(var i = 0; i < len; i++){
        img[i].style.transition = '';
        img[i].style.transform = 'rotateY(0deg) translateZ(-' + Math.random()*500 + 'px)';
        (function (i){
            setTimeout(() => {
                // img[i].style.transition = '2s';
                // img[i].style.opacity = 1;
                // img[i].style.transform = 'rotateY(-360deg) translateZ(0)';
                monition(img[i],'2s',function(){
                    this.style.transition = '2s';
                    this.style.opacity = 1;
                    this.style.transform = 'rotateY(-360deg) translateZ(0)';
                },function(){
                    allend ++;
                    if(allend == len){
                        flag = true;
                    }
                });
            }, Math.random()*1000);
            console.log('show:',i);
        })(i);
    };
}

//封装运动函数
function monition(dom,time,doFun,callback){
    dom.style.transition = time;
    doFun.call(dom);
    var called = true;
    // 当所有图片运动完之后将锁打开，锁住防止transitionend回调函数重复执行！
    dom.addEventListener('transitionend',function(){
        if(called){
            callback.call(dom);
            called = false;
        }
        
    })
}