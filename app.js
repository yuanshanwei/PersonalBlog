const express = require('express')
const app = express();

// app.use(express.static('./views'))
// 虚拟目录
app.use('/node_modules', express.static('./node_modules')) 
//注：访问不能有出现./"

// 设置 默认采用的模板引擎名称
app.set('view engine', 'ejs')
// 设置模板页面的存放路径  
app.set('views', './views') 

//注：访问不能有出现./"
app.get("/",(req,res) =>{
    res.render("index.ejs")  //这个地方可以点写index.ejs或者index 会自动获取
})

app.listen(3000,function(){
    console.log("http://192.168.14.21:3000")
})

