const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    // 定义模型的字段
    name:{ type:String },
    items:[{
        image:{ type: String },
        url:{ type: String }
    }]
})
module.exports = mongoose.model('Ad',schema) //导出Article模型