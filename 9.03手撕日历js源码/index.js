var pages = document.getElementById("pages");
var locale = window.navigator.language || 'en-us';//浏览器使用的语言

var date = new Date();
var dayNum = date.getDate();
var month = date.getMonth();
var dayName = date.toLocaleDateString(locale,{weekday:"long"});
var monthName = date.toLocaleDateString(locale,{month:"long"})
var year = date.getFullYear();


function daysInMonth(month,year){
    return new Date(year,month+1,0).getDate();
}
//获取新的日期
function getNewDate(){
    if(dayNum < daysInMonth(month,year)){
        dayNum++;
    }else{
        dayNum = 1;
    }
    //单日期补零
    if(dayNum == 1 && month < 11){
        month++;
    }else if(dayNum === 1 && month === 11){
        month = 0;
    }
    if(dayNum === 1 && month === 0){
        year++;
    }
    var newDate = new Date(year,month,dayNum);

     dayName = newDate.toLocaleDateString(locale,{weekday:"long"});
     monthName = newDate.toLocaleDateString(locale,{month:"long"});
    // console.log(newDate);
    // return newDate();
}

//e时间源
function handleClick(e){
    getNewDate();//当前时间的修正
    console.log(e);
    updateCalendar(e.target);

}

function updateCalendar(target){
    if(target && target.classList.contains('page')){
        target.classList.add('tear');
        //撕掉一页
        setTimeout(() => {
            pages.removeChild(target);
        }, 800);
    }else{
        return;
    }
    //添加日历卡
    renderPage();
}

function renderPage(){
    //动态创建一个html元素
    var newPage = document.createElement('div');
    newPage.classList.add('page');
    newPage.innerHTML = `<p class="month">${monthName}
    </p><p class="day">${dayNum}</p><p class="day-name">${dayName}</p><p class="year">${year}</p>`;
    //把这个元素添加到pages里面去
    pages.appendChild(newPage);
}

renderPage();
//追加事件
pages.addEventListener("click",handleClick);


