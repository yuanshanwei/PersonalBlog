const express = require('express')
const app = express();
const bodyParser = require('body-parser')
//引入mysql模块：
const mysql=require("mysql");
//引入moment时间就算模版：
const moment=require("moment");
//连接数据裤
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'blog'
  })
  
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(express.static('./views'))
// 虚拟目录
app.use('/node_modules', express.static('./node_modules')) 
//注：http访问不能有出现./"

// 设置 默认采用的模板引擎名称
app.set('view engine', 'ejs')
// 设置模板页面的存放路径  
app.set('views', './views') 

//注：访问不能有出现./
//   进去首页
//注：http访问不能有出现./"
app.get("/",(req,res) =>{
    res.render("index.ejs")  //这个地方可以点写index.ejs或者index 会自动获取
})
//  进入注册页
app.get("/register",(req,res) => {
    res.render("./user/register.ejs")
})
//  进入登录页
app.get('/login', (req, res) => {
    res.render('./user/login', {})
  })

//  注册用户信息
app.post("/register",(req,res) => {
    let userInfo=req.body;
    if (!userInfo.username || !userInfo.nickname || !userInfo.password) return res.status(400).send({ status: 400, msg: '请输入正确的表单信息!' })
    const chachongSql = 'select count(*) as count from users where username = ?'
    conn.query(chachongSql,userInfo.username,(err,result) =>{
        if(err) return res.status(500).send({ status: 500, msg: '查重失败!请重试!' })
    if (result[0].count !== 0) return res.status(400).send({ status: 400, msg: '用户名重复!请重试!' })
    userInfo.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
    const registerSql = 'insert into users set ?'
    conn.query(registerSql, userInfo, (err, result) => {
      if (err) return res.status(500).send({ status: 500, msg: '注册失败!请重试!' })
      res.send({ status: 200, msg: '注册成功!' })
    })
    })
})

//用户登录
app.post('/login', (req, res) => {
    let loginInfo=req.body;
    const loginSql = 'select * from users where username = ? and password = ?'
    conn.query(loginSql, [loginInfo.username, loginInfo.password], (err, result) => {
      if (err || result.length === 0) return res.status(400).send({ status: 400, msg: '登录失败!请重试!' })
      res.send({ status: 200, msg: '登录成功!' })
    })
  })





app.listen(3000,function(){
    console.log("http://192.168.14.21:3000")
})

