var obj = {
    init: function () {
        this.sun = document.getElementsByClassName('sun')[0];
        this.moon = document.getElementsByClassName('moon')[0];
        this.bindEvent();
    },
    bindEvent:function(){
        var self = this;
        var moon = this.moon;
        //拖拽事件 js down move up 
        moon.onmousedown = function(e){
            //console.log(e.clientX)
            //body/document
            var left = moon.offsetLeft;
            var disX = e.clientX - left;
            document.onmousemove = function(e){
                moon.style.left = (e.clientX - disX) + 'px';
                self.getVoice();
            }
            document.onmouseup = function (e){
                document.onmousemove =null;
            }
        }
    },
    getVoice:function(){
        var sun = this.sun;
        var moon = this.moon;
        var per;
        var d = sun.clientWidth;

        var sunL = sun.offsetLeft;
        var moonL = moon.offsetLeft;
        var sunR = sunL + d;
        var moonR = moonL + d;

        if(sunL > moonR || moonL > sunR){
            per = 0;
        }else{
            
            if(moonL > sunL){
                per = (sunR - moonL) / d;
            }else if(moonR >= sunL){
                per = (moonR - sunL) / d;
            }
        }
        // return per;
        this.change(per);
    },
    change:function(vol){
        var audio = document.getElementById('audio');
        var per = document.getElementsByClassName('per')[0];
        var wrap = document.getElementsByClassName('wrapper')[0];
        var body = document.getElementsByTagName('body')[0];
        var moon = this.moon;

        vol > 0 ? audio.play() : audio.pause();
        audio.volume = vol;

        var str = "Volume: " + (vol * 100).toPrecision(4) + "%";
        per.innerHTML = str;

        moon.style.backgroundColor = 'hsl(194,56%,' + (1 - vol) * 60 + '%)';
        body.style.backgroundColor = 'hsl(' + (194 + Math.floor(vol * 160)) + ',66%,' + (1 - vol) * 50 + '%)';

    }

}
obj.init();