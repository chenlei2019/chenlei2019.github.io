/**
 * {
 *      title: 菜单的标题；
 *      children : [] 菜单的子菜单
 *      ...其他参数
 * }
 */
var dates = [
    {
        title: "HTML CSS", children: [
            {
                title: "1、概述", children: [
                    {
                        title: "1.HTML CSS 简介"
                    },
                    {
                        title: "2.开发环境的搭建"
                    },
                    {
                        title: "3.第一个HTML页面"
                    }
                ]
            },
            {
                title: "2、HTML基础", children: [
                    {
                        title: "1.什么是HTML"
                    },
                    {
                        title: "2.HTML中的术语"
                    },
                    {
                        title: "3.常用元素"
                    }
                ]
            }
        ]
    },
    {
        title: "JavaScript", children: [
            {
                title: "1. 概述", children: [
                    { title: "1. JavaScript发展史" },
                    { title: "2. 开发环境的搭建" },
                    { title: "3. 第一个JS程序" }
                ]
            },
            {
                title: "2. 核心概念", children: [
                    { title: "1. 变量" },
                    { title: "2. 数据和类型" },
                    { title: "3. 输入输出语句" }
                ]
            }
        ]
    }
]


/**
 * 根据传入的菜单对象，创建对应的DOM元素
 * @param {*} menuObj
 * @param {*} domContainer dom的容器
 */
// function createMenu(menuObj,domContainer){
//     var menuDom = document.createElement("div");
//     menuDom.className = "menu";
//     var hasChildren = true;
//     if(!menuObj.children || menuObj.length === 0){
//         hasChildren = false;
//     }
//     menuDom.innerHTML = `<div class = "head">
//                             ${hasChildren ? `<div class = "icon"></div>` : ""}
//                             <div class = "title">${menuObj.title}</div>`;
//     domContainer.appendChild(menuDom);
//     if(hasChildren){
//         //添加子菜单
//         for(var i = 0; i < menuObj.children.length; i++){
//             var child = menuObj.children[i];
//             createMenu(child,menuDom);
//         }
//     }

//     menuDom.onclick = function(e){
//         e.stopPropagation();
//         if(e.target.className === "icon"){
//             menuDom.classList.toggle("expand");
//             // if(menuDom.classList.contains("expand")){
//             //     menuDom.classList.remove("expand");
//             // }
//             // else{
//             //     menuDom.classList.add("expand");
//             // }
//         }
//     }
// }

// /**
//  * 初始化整个属性目录
//  */
// function initTree(){
//     var tree = document.querySelector(".tree");
//     for(var i = 0; i < dates.length; i++){
//         var menuObj = date[i];
//         createMenu(menuObj,tree);
//     }
// }
// initTree();

var tree = document.querySelector(".tree");

class Menu{
    constructor(menuObj,parentDom,callback){
        this.title = menuObj.title;
        this.children = menuObj.children || [];
        this.status = "collapse";
        this.dom = document.createElement("div");
        this.dom.className = `menu${this.children.length ? " haschild" : ""}`;
        this.dom.innerHTML = `<div class = "title">${this.title}</div>`;
        //添加子元素
        parentDom.appendChild(this.dom);
        for(const child of this.children){
            new Menu(child, this.dom,callback);
        }

        // parentDom.appendChild(this.dom);
        this.dom.onclick = e => {
            callback && callback(this);
            e.stopPropagation();
            if(!this.children.length){
                return;
            }
            if(this.status === "collapse"){
                this.status = "expand";
                this.dom.classList.add("expand");
            }
            else{
                this.status = "collapse";
                this.dom.classList.remove("expand");
            }
        }
    }
}

for(const data of dates){
    new Menu(data,tree,function (d){
        console.log(d);
    });
}