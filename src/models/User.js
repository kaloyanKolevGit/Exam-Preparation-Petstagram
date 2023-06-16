const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        unique: true,
        type: String,
        required: true,
    },
    password:  {
        type: String,
        required: true,
    },
    email:  {
        type: String,
        required: true,
    },
})

userSchema.virtual('repeatPassword')
    .set(function(value) {
        if(this.passwords !== value) {
            throw new Error('Passwords missmatch');
        }
    })

const User = mongoose.model('User', userSchema)

module.exports = User;