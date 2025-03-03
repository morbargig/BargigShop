const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemsSchema = new Schema({
    id: String,
    name: String,
    price: Number,
    Category: Array,
    sizes: Array,
    Collection: String,
    Description: String,
    image: String,
    color: Object
})

const Items = mongoose.model("Items", ItemsSchema)
module.exports = Items



