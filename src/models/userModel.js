const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    username:{
        type : String,
        requred : [true, "Please add a username"],
        unique:[true,"Email is already taken"]
    },
    password:{
        type: String,
        required:[true,"Please add a password"]
    },
    email:{
        type: String,
        required:[true,"Please add an email"],
        unique:[true,"Email is already taken"]
    },
},
{
    timestamps:true
});

module.exports = mongoose.model('User',userSchema);