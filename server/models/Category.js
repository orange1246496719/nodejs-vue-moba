const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    // 定义模型的字段
    name:{ type:String },
    parent:{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category'},
})
schema.virtual('children', {
    localField: '_id',
    foreignField: 'parent',
    justOne: false,
    ref: 'Category'
})

schema.virtual('newsList', {
    localField: '_id',
    foreignField: 'categories',
    justOne: false,
    ref: 'Article'
})
module.exports = mongoose.model('Category',schema) //导出Category模型