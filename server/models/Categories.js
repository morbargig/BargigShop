const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    id: String,
    Catagories: Array
})

const Category = mongoose.model("Category", CategorySchema)
module.exports = Category



