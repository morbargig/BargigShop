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
    appointments: [],
    img: String
})

const User = mongoose.model("User", UserSchema)
module.exports = User



