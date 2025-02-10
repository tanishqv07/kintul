const mongoose = require("mongoose");

const OTPSchema = new mongoose.Schema({
    phone :{type:String, required: true, unique:true},
    otp :{type:String, required:true },
    createdAt :{type:Date, default:Date.now, expires:600},
});

module.exports("Otp", OTPSchema);