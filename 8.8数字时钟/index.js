var obj = {

    init: function () {

        this.nums = Array.from(document.getElementsByClassName('nums'));
        this.classList = ['visible','close','close','far','far','distant','distant'];
        console.log(this.nums);
        this.use24Hours = true;//true是否用24小时制显示
        this.start();
    },
    start: function () {
        var self = this;
        setInterval(function(){
            // console.log(self);
            var time = self.getclock();
            self.nums.forEach(function(ele,i){
                var now = +time[i];
                var offset = 86 * now;
                // console.log(offset);
                ele.style.transform = 'translateY(calc(50vh - 43px - ' + offset +'px))';
                Array.from(ele.children).forEach(function(ele2,i2){
                    var classname = self.getClassname(now,i2);
                    ele2.className = classname;
                });
            });
        }, 200);
    },
    getClassname:function(now,i2){
        var name = this.classList.find(function(ele,i){
            return i2 - now === i || now - i2 === i;
        });
        return name || '';
    },
    getclock: function () {
        //返回一个当前时间拼接的字符串
        var d = new Date();
        var h = d.getHours(), m = d.getMinutes(), s = d.getSeconds();
        var time = [h, m, s];
        var str = time.reduce(function (p, ele, i) {
            return p + ('0' + ele).slice(-2);
        }, '');
        return str;
    }
}

obj.init();

//获取当前时间  页面居中显示时间 滑动（动画）  透明度opacity class