const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username cannot be blank']
    },
    password: {
        type: String,
        required: [true, 'password cannot be blank']
    },
    role: {
        type: String,
        default:'user'
    }
})

module.exports = mongoose.model('User',userSchema);