const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    name: String,
    image: String,
    // color: Array
})

const Order = mongoose.model("Order", OrderSchema)
module.exports = Order



