// 后端的接口地址
module.exports = app =>{
    const express = require('express')
    const jwt = require('jsonwebtoken') // 引用jwt
    const AdminUser = require('../../models/AdminUser')
    const assert = require('http-assert')
    // 封装一个 登陆授权中间件
    const authMiddleware = require('../../middleware/auth')
    //封装一个 资源中间件
    const resourceMiddleware = require('../../middleware/resource')
    const router = express.Router({
        mergeParams: true // 合并url路径参数
    }) // express的子路由 进行curd操作

    // 新建
    router.post('/',async(req,res)=>{
        const model = await  req.Model.create(req.body)
        res.send(model)
    })
    //编辑
    router.put('/:id',async(req,res)=>{
        const model = await  req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    //删除
    router.delete('/:id',async(req,res)=>{
    await  req.Model.findByIdAndDelete(req.params.id)
        res.send({
            success: true
        })
    })
    //列表
    router.get('/',async(req,res)=>{
        const queryOptions = {}
        if(req.Model.modelName === 'Category'){
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(100)
        res.send(items)
    })
    // 详情
    router.get('/:id',async(req,res)=>{
        const model = await  req.Model.findById(req.params.id)
        res.send(model)
    })
    app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)
    // 处理上传的图片
    const multer = require('multer')
    const upload = multer({dest: __dirname + '/../../uploads'})
    app.post('/admin/api/upload', authMiddleware(), upload.single('file') ,async(req, res) =>{
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })
    app.post('/admin/api/login', async (req, res)=>{
        const {username, password} = req.body
        // 1.根据用户名找用户

        const user = await AdminUser.findOne({
            username: username
        }).select('password')
        assert(user, 422, '用户不存在') // 通过assert直接抛出异常 扔给下面的错误处理
        // 2.校验密码
        const isValid = require('bcryptjs').compareSync(password, user.password) // 返回的是一个布尔值 ture or false
        assert(isValid, 422, '密码错误') // 密码错误的时候
        // 3.返回token
        const token = jwt.sign({id: user._id}, app.get('secret'))
        res.send({token})
    })

    //错误处理函数 (捕获异常)
    app.use(async (err, req, res, next)=>{
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}