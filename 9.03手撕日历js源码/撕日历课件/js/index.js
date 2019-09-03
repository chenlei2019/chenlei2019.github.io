var pages = document.getElementById("pages");
//获取当前语言
var locale = window.navigator.language || 'en-us';
//日期
var date = new Date();//日期对象
var dayNum = date.getDate();//日期（几号）3
var month = date.getMonth();//月份
/**
 * 初始化
 * toLocaleDateString显示当前语言类型部分的日期格式
 * 参数1：当前语言类型
 * 参数2：json对象，需要显示的部分日期格式如：weekday，month，其参数为显示类型
 */
var dayName = date.toLocaleDateString(locale,{weekday:"long"});//星期几
var monthName = date.toLocaleDateString(locale,{month:"long"});//月份
var year = date.getFullYear()

//获取当前这个月的天数30
function daysInMonth(month,year){
    return new Date(year,month+1,0).getDate();
}

//获取新的日期
function getNewDate(){
    //判断当前天数是否在本月规定的月天数内
    if(dayNum < daysInMonth(month,year)){
        dayNum++;
    }else{
        dayNum=1;
    }
    //month0-11
    if(dayNum === 1 && month <11){
        month++
    }else if(dayNum === 1 && month === 11){
        month =0;//新年
    }
    //年的修正
    if(dayNum === 1 && month === 0){
        year++
    }
    //获取当前的指定时间
    var newDate = new Date(year,month,dayNum);
    //按照我们的指定格式显示
    var dayName = newDate.toLocaleDateString('en-us',{weekday:"long"});
    var monthName = newDate.toLocaleDateString('en-us',{month:"long"});

}

//e 时间源
function handleClick(e){
    getNewDate()//当前时间的修正
    updateCalendar(e.target);
}

function updateCalendar(target){
    if(target && target.classList.contains('page')){
        //添加一个撕掉样式
        target.classList.add('tear')
        //撕掉一页
        setTimeout(function(){
            pages.removeChild(target);
        },800);
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
   newPage.innerHTML = '\n <p class="month">'+
        monthName + '</p>\n <p class="day">' +
        dayNum +'</p>\n <p class="day-name">' +
        dayName + '</p>\n <p class="year">'+
        year +'</p>\n'; 
    //把这个元素添加的pages（div）
    pages.appendChild(newPage)
}

//打开第一张
renderPage();

//追加事件
pages.addEventListener("click",handleClick);
