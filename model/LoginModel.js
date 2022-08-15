const mongoose = require('mongoose')

const LoginModel = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    }
}, {timestamps:true} )
module.exports = mongoose.model("LoginModel",LoginModel)
