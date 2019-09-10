var lis = document.querySelectorAll('#wrap li'),
    shadowBox = document.querySelector('#shadowBox'),
    showPic = document.querySelector('#showPic'),
    prev = document.querySelector('.prev'),
    next = document.querySelector('.next'),
    imgCon = document.querySelector('#showPic .img'),
    bigImgs = imgCon.children;

var curNum = 0;
var canClick = true;


function loadImg(imgs,callback){
    var loadImgs = [],loadImgNum = 0;

    for(var i=0;i<imgs.length;i++){
        loadImgs[i] = new Image();
        loadImgs[i].onload = function(){
            loadImgNum++;
            if(loadImgNum == imgs.length){
                callback(loadImgs);
            }
        };
        loadImgs[i].src = imgs[i];
    }
}

var imgs = [];
for(var i = 0; i < lis.length; i++){
    imgs.push('images/work_'+i+'_big.jpg');
}

loadImg(imgs,function(images){
    for(var i=0;i<lis.length;i++){
        lis[i].index = i;
        lis[i].onclick = function(){
            shadowBox.style.height = document.documentElement.offsetHeight +'px';
            shadowBox.style.display = showPic.style.display = "block";

            setTimeout(() => {
                shadowBox.style.opacity=showPic.style.opacity=1;
                showPic.style.transform = 'scale(1)';
            }, 50);

            curNum = this.index;

            bigImgs[1].src = images[curNum].src;

            nextClick(images);
            prevClick(images);

        }
    }
});

shadowBox.addEventListener('click',function(){
    if(!canClick){
        return;
    }
    shadowBox.style.display = showPic.style.display='none';
    shadowBox.style.opacity = showPic.style.opacity = 0;
    showPic.styletransform = 'scale(0)';

});

function nextClick(images){
    var nextNum = 0;

    next.onclick = function(){
        if(!canClick){
            return;
        }
        canClick = false;//点击后立马变成false，再书合上后再变成true，只有为true的时候才能点

        /*
			点击的时候要做的事情
				1、背后图片的地址要换成正确的
				1、上面的图片走到右边
				2、下面的图片像翻书(tonn)一样打开（上一步结束后进行）
				3、上面的图片回到原始位置、下面图片合上（上一步结束后进行）
		 */


        //往右点击后下一张图片的索引是当前图片的索引+1
        nextNum = curNum +1;
        if(nextNum == lis.length){
            nextNum = 0;
        }
        bigImgs[0].src=images[nextNum].src;

        var endNum1 = 0;
        var endNum2 = 0;

        bigImgs[0].className=bigImgs[1].className='moveToRight';
        bigImgs[1].style.transform='translateX(600px) rotateY(-10deg)';

        bigImgs[1].addEventListener('transitionend',function(){

            endNum1++;
            bigImgs[0].style.transform='rotateY(-10deg)';
            bigImgs[1].style.transform='translateX(0px) rotateY(0)';
            /*
				这里要注意
					1、按正常的逻辑应该是上面的图回去了，然后下面图上再合上。所以需要知道什么时候上面的图回去了
					2、可能大家会再来个transitionend方法，其实不需要
					3、先在这里console.log(1)，看到会弹出两次
					3、在外面声明一个变量，用来存储结束事件发生的次数，当这个数字加到2的时候就代表上面的图片回去的结束事件发生了
			 */
            if(endNum1 ==2){
                bigImgs[0].style.transform='rotateY(0)';
                bigImgs[1].style.zIndex = 1;
                bigImgs[0].style.zIndex = 2;
            }
        });

        bigImgs[0].addEventListener('transitionend',function(){

            endNum2++;
            if(endNum2 == 2){
                /* 
					1、这个条件成立，说明现在的end事件对应的是书合上的过渡
					2、这里需要做两件事件
						1、更改当前图片的索引，下一张的索引在函数一开始就修改了
						2、还原图片的层级到初始状态
				 */
                //书合上了，也代表一次完整的运动走完了，然后就要改索引了。这里只需要
                curNum++;
                if(curNum == lis.length){
                    curNum = 0;
                }

                bigImgs[0].style.zIndex = 1;
                bigImgs[1].style.zIndex = 2;
                bigImgs[1].src = images[nextNum].src;

                canClick = true;
            }
        });

    }


}


function prevClick(images){
    var prevNum = 0;

    prev.onclick = function(){
        if(!canClick){
            return;
        }
        canClick = false;//点击后立马变成false，再书合上后再变成true，只有为true的时候才能点

        /*
			点击的时候要做的事情
				1、背后图片的地址要换成正确的
				1、上面的图片走到左边
				2、下面的图片像翻书(tonn)一样打开（上一步结束后进行）
				3、上面的图片回到原始位置、下面图片合上（上一步结束后进行）
		 */


        //往左点击后下一张图片的索引是当前图片的索引-1
        prevNum = curNum -1;
        if(prevNum == -1){
            prevNum = lis.length - 1;
        }
        bigImgs[0].src=images[prevNum].src;

        var endNum1 = 0;
        var endNum2 = 0;

        bigImgs[0].className=bigImgs[1].className='moveToLeft';
        bigImgs[1].style.transform='translateX(-600px) rotateY(10deg)';

        bigImgs[1].addEventListener('transitionend',function(){

            endNum1++;
            bigImgs[0].style.transform='rotateY(10deg)';
            bigImgs[1].style.transform='translateX(0px) rotateY(0)';
            /*
				这里要注意
					1、按正常的逻辑应该是上面的图回去了，然后下面图上再合上。所以需要知道什么时候上面的图回去了
					2、可能大家会再来个transitionend方法，其实不需要
					3、先在这里console.log(1)，看到会弹出两次
					3、在外面声明一个变量，用来存储结束事件发生的次数，当这个数字加到2的时候就代表上面的图片回去的结束事件发生了
			 */
            if(endNum1 ==2){
                bigImgs[0].style.transform='rotateY(0)';
                bigImgs[1].style.zIndex = 1;
                bigImgs[0].style.zIndex = 2;
            }
        });

        bigImgs[0].addEventListener('transitionend',function(){

            endNum2++;
            if(endNum2 == 2){
                /* 
					1、这个条件成立，说明现在的end事件对应的是书合上的过渡
					2、这里需要做两件事件
						1、更改当前图片的索引，下一张的索引在函数一开始就修改了
						2、还原图片的层级到初始状态
				 */
                //书合上了，也代表一次完整的运动走完了，然后就要改索引了。这里只需要
                curNum--;
                if(curNum == -1){
                    curNum = lis.length - 1;
                }

                bigImgs[0].style.zIndex = 1;
                bigImgs[1].style.zIndex = 2;
                bigImgs[1].src = images[prevNum].src;

                canClick = true;
            }
        });

    }


}