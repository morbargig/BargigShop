const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    id: String,
    Catgories: Array
})

const Category = mongoose.model("Category", CategorySchema)
module.exports = Category



