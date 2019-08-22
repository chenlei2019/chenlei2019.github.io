
var config = {
    gameDom: document.getElementById("game"),
    maxX: 49,
    maxY: 49
}

class SnakeItem {
    constructor(prev, next, x, y) {
        this.prev = prev;
        this.next = next;
        this.x = x;
        this.y = y;
        this.dom = document.createElement("div");
        this.dom.className = "item";
        config.gameDom.appendChild(this.dom);
        this.isHead = false;
        this.show();
    }

    setHead() {
        this.isHead = true;
        this.show();
    }

    isOutOfRange(x, y) {
        if (x < 0 || x > config.maxX || y < 0 || y > config.maxY) {
            return true;
        }
        return false;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.show();
    }

    show() {
        this.dom.style.left = this.x * 10 + "px";
        this.dom.style.top = this.y * 10 + "px";
        if (this.isHead) {
            this.dom.classList.add("head")
        }
        else {
            this.dom.classList.remove("head")
        }
    }

    isTail() {
        return !this.next;
    }

    isHead() {
        return !this.prev;
    }

    /**
     * 移动尾巴到我的当前位置
     */
    moveTail() {
        this.next && this.next.moveTail();
        this.prev && this.setPosition(this.prev.x, this.prev.y);
    }
}

class Snake {
    constructor(length) {
        this.length = length;
        this.init();
        this.direction = "right";
        this.onCannotMove = null;
        this.onMove = null;
        this.timer = null;
    }

    init() {
        let item = null;
        for (let i = 0; i < this.length; i++) {
            var last = item;
            item = new SnakeItem(null, last, i, 0);
            last && (last.prev = item);
        }
        this.head = item;
        this.head.setHead();
    }

    moveToNext() {
        //计算下一个坐标
        var pos = this.getNextPosition();
        if (!this.isRightPosition(pos)) {
            this.onCannotMove && this.onCannotMove();
            return;
        }
        this.head.moveTail();
        this.head.setPosition(pos.x, pos.y);
        this.onMove && this.onMove();
    }

    hasPosition(x, y) {
        var item = this.head;
        do {
            if (item.x === x && item.y === y) {
                return true;
            }
        } while (item = item.next);
        return false;
    }

    isRightPosition(pos) {
        if (this.head.isOutOfRange(pos.x, pos.y) || this.hasPosition(pos.x, pos.y)) {
            return false;
        }
        return true;
    }

    getNextPosition() {
        var pos = { x: this.head.x, y: this.head.y };
        switch (this.direction) {
            case "left":
                pos.x--;
                break;
            case "right":
                pos.x++;
                break;
            case "up":
                pos.y--;
                break;
            case "down":
                pos.y++;
                break;
        }
        return pos;
    }

    move() {
        this.stop();
        this.timer = setInterval(() => {
            this.moveToNext();
        }, 300);
    }

    stop() {
        clearInterval(this.timer);
    }

    changeDirection(newDirection) {
        var allows;
        if (this.direction === "left" || this.direction === "right") {
            allows = ["up", "down"]
        }
        else {
            allows = ["left", "right"]
        }
        if (allows.includes(newDirection)) {
            this.direction = newDirection;
        }
    }

    stronger() {
        var tail = this.head;
        while (tail.next) {
            tail = tail.next;
        }
        tail.next = new SnakeItem(tail, null, tail.x, tail.y);
    }
}

class Food {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dom = document.createElement("div");
        this.dom.className = "food";
        this.dom.style.left = this.x * 10 + "px";
        this.dom.style.top = this.y * 10 + "px";
        config.gameDom.appendChild(this.dom);
    }

    remove() {
        this.dom.remove();
    }
}

class Game {
    constructor() {
        this.snake = new Snake(3);
        this.snake.onCannotMove = () => {
            window.onkeydown = null;
            console.log("游戏结束");
            this.snake.stop();
        }
        this.snake.onMove = () => {
            if (this.snake.head.x === this.food.x &&
                this.snake.head.y === this.food.y) {
                this.snake.stronger();
                this.food.remove();
                this.createFood();
            }
        }
        this.start();
        this.regEvent();
        this.createFood();
    }

    createFood() {
        var pos = this.getFoodPosition();
        this.food = new Food(pos.x, pos.y);
    }

    getFoodPosition() {
        var poses = [];
        for (let x = 0; x < config.maxX; x++) {
            for (let y = 0; y < config.maxY; y++) {
                if (!this.snake.hasPosition(x, y)) {
                    poses.push({ x, y });
                }
            }
        }
        var i = Math.floor(Math.random() * poses.length);
        return poses[i];
    }

    start() {
        this.snake.move();
    }

    stop() {
        this.snake.stop();
    }

    regEvent() {
        window.onkeydown = e => {
            switch (e.key) {
                case "ArrowDown":
                    this.snake.changeDirection("down");
                    break;
                case "ArrowUp":
                    this.snake.changeDirection("up");
                    break;
                case "ArrowLeft":
                    this.snake.changeDirection("left");
                    break;
                case "ArrowRight":
                    this.snake.changeDirection("right");
                    break;
                default: return;
            }

            this.snake.moveToNext();
        }
    }
}

var g = new Game();
