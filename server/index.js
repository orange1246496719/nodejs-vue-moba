const express = require("express")

const app = express()

app.set('secret','i123asd34cg')
app.use(require('cors')()) //引入允许跨域模块
app.use(express.json()) // 中间件
app.use('/',express.static(__dirname + '/web')) // 托管静态文件
app.use('/admin',express.static(__dirname + '/admin')) // 托管静态文件
app.use('/uploads',express.static(__dirname + '/uploads')) // 托管静态文件

require('./plugins/db')(app) //app本身是一个函数 引用过来执行它
require('./routes/admin')(app)
require('./routes/web')(app)
app.listen(3000,()=>{
    console.log('App listening on port 3000!');
    
});