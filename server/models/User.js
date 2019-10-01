const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    _id : String,
    name: String,
    password: String,
    phone: String,
    email: String,
    gender: String,
    points: { type: Number, default: 5 },
    city: String,
    ShopingCard: [{ type: mongoose.Types.ObjectId, ref: "Items" }],
    
    img: String
    // recipes: [{ type: mongoose.Types.ObjectId, ref: "recipe" }],
    // likes: [{ type: mongoose.Types.ObjectId, ref: "recipe" }]
})

const User = mongoose.model("User", UserSchema)
module.exports = User



