var datas = [
    {
        title: "HTML CSS", children: [
            {
                title: "1. 概述", children: [
                    { title: "1. HTML CSS简介" },
                    { title: "2. 开发环境的搭建" },
                    { title: "3. 第一个HTML页面" }
                ]
            },
            {
                title: "2. HTML基础", children: [
                    { title: "1. 什么是HTML" },
                    { title: "2. HTML中的术语" },
                    { title: "3. 常用元素" }
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
var tree = document.querySelector(".tree");
class Menu {
    constructor(menuObj, parentDom, callback) {
        this.title = menuObj.title;
        this.children = menuObj.children || [];
        this.status = "collapse";
        this.dom = document.createElement("div");
        this.dom.className = `menu${this.children.length ? " haschild" : ""}`;
        this.dom.innerHTML = `<div class="title">${this.title}</div>`;
        //添加子元素
        for (const child of this.children) {
            new Menu(child, this.dom, callback);
        }
        parentDom.appendChild(this.dom);
        this.dom.onclick = e => {
            callback && callback(this);
            e.stopPropagation();
            if (!this.children.length) {
                return;
            }
            if (this.status === "collapse") {
                this.status = "expand";
                this.dom.classList.add("expand");
            }
            else {
                this.status = "collapse";
                this.dom.classList.remove("expand");
            }
        }
    }
}

for (const data of datas) {
    new Menu(data, tree, function(d){
        console.log(d);
    });
}