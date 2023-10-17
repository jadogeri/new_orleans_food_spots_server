const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true,"Please add user field"]
    },
    age:{
        type: Number,
        required: [true,"Please add age field"]
    },
    email:{
        type: String,
        required: [true,"Please add email field"]
    },
    
},{
    timestamps: true,
}
)

module.exports = mongoose.model('Contact',contactSchema)