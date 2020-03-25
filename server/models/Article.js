const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    // 定义模型的字段
    title:{ type:String },
    body:{ type: String},
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref:'Category'}],
},{
    timestamps: true // 加时间戳
})
module.exports = mongoose.model('Article',schema) //导出Article模型