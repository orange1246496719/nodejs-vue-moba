const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    // 定义模型的字段
    username:{ type: String },
    // 对用户的密码进行加密操作 通过set函数去定义加密的方法
    password:{ type: String, 
        select: false, // 密码不做展示 防止编辑时 输入框里显示加密后的内容
        set(val) {
        return require("bcryptjs").hashSync(val, 10)
    }
},
})

module.exports = mongoose.model('AdminUser',schema) 