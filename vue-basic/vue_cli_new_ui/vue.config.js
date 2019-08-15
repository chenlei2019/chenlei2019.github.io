const goods = require("./data/goods.json");
// const weather = require("./data/weather.json");
module.exports = {
    baseUrl: "/",    //根路径
    outputDir: 'dist',
    assetsDir:"assets",   //静态资源目录（js，css，img，fonts）
    lintOnSave:false,   //是否开启eslint保存监测，有效值：true || false || ‘error’
    devServer: {
        open: true,
        host:'localhost',
        port: 8081,
        https: false,
        hotOnly:false,
        proxy: {
            //配置跨域
            '/api':{
                target:"http://localhost:5000/api",
                // target:"http://t.weather.sojson.com",
                ws:true,
                changeOrigin: true,
                pathRewrite:{
                    '^/api': ''
                }
            }
        },
        before(app) {
            //http://localhost:8081/api/goods
            app.get("/api/goods",(req,res) => {
                res.json(goods);
            })
            // app.get("/api/api/weather/city/101030100",(req,res) => {
            //     res.json(weather);//不行！！！
            // })
        }
    }
};