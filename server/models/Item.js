const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemSchema = new Schema({
    id : String,
    name: String,
    price: Number,
    Category: Array,
    sizes: Array,
    Collection: String,
    Discraption: String,
    image: String,
    color : Object
})

const Item = mongoose.model("Item", ItemSchema)
module.exports = Item



