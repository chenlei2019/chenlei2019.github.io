let Tetris = {
    init(){
        //初始化
        const canvas = document.getElementById('myCanvas');
        this.gc = canvas.getContext('2d');
        //20*20的格子
        this.data = this.map(20,20);
        // this.render(data);

        //x轴的偏移量，之所以保存为变量 是以后我们做左右移动的时候需要通过改变这个值来实现
        this.x = 7;
        this._block = this.block();
        this.draw(this._block);
    },
    //地图数据,二维数组
    map(r,c){
        let data = [];
        for(let i = 0 ; i < c; i++){
            data.push([]);
            //每行长度为r
            data[i].length = r;
            //所有元素默认值为0
            data[i].fill(0);
        }
        return data;
    },

    //随机生成一个类型的方块
    block(){
        let index = Math.floor(Math.random()*7);
        return this.blockType[index];
    },
    //方块的类型
    blockType:[
        [[1,1,1,1]],
        [[1,1],[1,1]],
        [[1,1,0],[0,1,1]],
        [[0,1,1],[1,1,0]],
        [[0,1,0],[1,1,1]],
        [[1,0,0],[1,1,1]],
        [[0,0,1],[1,1,1]]
    ],
    //重绘画布
    draw(block){
        for(let i = 0; i < block.length; i++){
            for(let j = 0; j < block[0].length; j++){
                //要向x轴偏移，需要为j加一个偏移量即可
                this.data[i][j + this.x] = block[i][j];
            }
        }
        console.log(this.data);
        this.render(this.data);
    },
    //渲染画布
    render(data){
        //计算每个方块的宽高，方块之间的间隔为4
        let w = 500 / 20 - 4;
        let h = 500 / 20 - 4;

        //计算方块的行列
        let r = data.length;
        let c = data[0].length;

        for(let i = 0; i < c; i++){
            for(let j = 0; j < r; j++){
                //判断数组里面的值，若为1则渲染为红色 0渲染为白色
                this.gc.fillStyle = data[i][j] === 0 ? 'white' : 'red';
                 /*
                 * 坐标算法
                 * 画布宽度500 小方格宽度21 个数20 则 留下的空隙宽度为 500 - 21*20 = 80 其中 20个小方块可分4单位的间隙
                 * 20个方块之间有19个间隙 剩下一个4单位的距离 分配到小方块距离左右两侧的间隙
                 * 总结一下规律
                 * n行     x坐标
                 * 0       w*0 + 2
                 * 1       w*1 + 2 + 4
                 * 2       w*2 + 2 + 4*2
                 * 3       w*3 + 2 + 4*3
                 * ...
                 * n       w*n + 2 + 4*n
                 * 所以第j列的x坐标可以归纳为 (w+4)*j + 2
                 * y坐标亦然
                 */
                this.gc.fillRect((w + 4)*j + 2,(h + 4)*i + 2,w,h);
            }
        }
        //在坐标为100,100的位置画一个40*40的红色方块
        // this.gc.fillStyle = 'red';
        // this.gc.fillRect(100,100,40,40);
    }
};
Tetris.init();

// function map(r,c){
//     let data = [];
//     for(let i = 0 ; i < c; i++){
//         data.push([]);
//         //每行长度为r
//         data[i].length = r;
//         //所有元素默认值为0
//         data[i].fill(0);
//     }
//     return data;
// }
// console.log(map(20,20));