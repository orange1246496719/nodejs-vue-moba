const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    // 定义模型的字段
    name:{ type:String },
    icon:{ type:String },
})
module.exports = mongoose.model('Item',schema) //导出Item模型