var divToys = document.getElementById("toys");
/**
*全局配置
*/

var config = {
    toyWidth:200,
    divToySWidth: 470,
}

var toys = [];

/**
 * 创建一个娃娃对象
 */
function createToy(left){
    var timerId;
    var dis = 1.5;
    var toy = {
        left:left,
        dom:document.createElement("div"),
        show:function(){
            this.dom.style.left = this.left + "px";
        },
        autoMove:function(){
            clearInterval(timerId);
            timerId = setInterval(() => {
                toy.left += dis;
                toy.show();
                if(toy.left >= config.divToySWidth){
                    toy.remove();
                }
            }, 10);
        },
        stop: function(){
            clearInterval(timerId);
        },
        remove: function(){
            this.stop();
            this.dom.remove();

            var index = toys.indexOf(this);
            toys.splice(index,1);

            var lastToy = toys[toys.length -1];
            var left = lastToy.left - config.toyWidth;
            createToy(left);
        },
        ifCanBeCatched:function(){
            if(this.left >= 108 && this.left <= 140){
                return true;
            }
            return false;
        },
        raiseUp: function(){
            this.stop();
            this.dom.style.bottom = "265px";

            setTimeout(() => {
                toy.remove();
            }, 1000);
        }
    };
    toy.show();
    toy.autoMove();
    divToys.appendChild(toy.dom);
    toys.push(toy);
    return toy;
}

function createToys(){
    var number = 5;
    for(var i = 0; i < number; i++){
        var left = -(i + 1) * config.toyWidth;
        createToy(left);
    }
}

createToys();

var claw = {
    dom: document.getElementById("claw"),
    grab:function(){
        this.dom.style.height = "350px";
        setTimeout(() => {
            claw.grabToy();
            claw.dom.classList.remove("open");
            claw.dom.style.height = "80px";
            setTimeout(() => {
                claw.dom.classList.add("open");
            }, 1000);
        }, 1000);
    },
    grabToy: function(){
        for(var i = 0; i < toys.length; i++){
            var toy = toys[i];
            if(toy.ifCanBeCatched()){
                toy.raiseUp();
                return;
            }
        }
    }
}

var button = document.getElementById("button");

button.onclick = function(){
    if(button.classList.contains("down")){
        return;
    }
    button.classList.add("down");
    claw.grab();
    setTimeout(() => {
        button.classList.remove("down");
    }, 2000);
}