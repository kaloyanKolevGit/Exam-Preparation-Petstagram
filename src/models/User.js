const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    username: {
        unique: true,
        type: String,
        required: true,
        minLength: 2,
    },
    password:  {
        type: String,
        required: true,
        minLength: 4,
    },
    email:  {
        type: String,
        required: true,
        minLength: 10,
    },
})

userSchema.virtual('repeatPassword')
    .set(function(value) {
            if(this.password !== value) {
                throw new Error('Passwords missmatch');
            }
    })

userSchema.pre('save', async function() {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
})

const User = mongoose.model('User', userSchema)

module.exports = User;