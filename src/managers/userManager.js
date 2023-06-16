const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const {SECRET} = require('../config/config')

exports.login = async function (username, password) {
    const user = await User.findOne({username})  

    if(!user) {
        throw new Error('Invalid Password or Username');   
    }

    const authenticated = await bcrypt.compare(password, user.password);

    if(!authenticated) {
        throw new Error('Invalid Password or Username');   
    }

    const token = await generateToken(user)
    return token;
}

exports.register = async (userData) => {
    const user = await User.findOne({username: userData.username}) 
       if(user) {
        throw new Error('This username already exists');
    }
    const createdUser = await User.create(userData)

    const token = await generateToken(createdUser)
    return token;
}

async function generateToken(user) {
    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
    }

    const token = await jwt.sign(payload, SECRET, {expiresIn: '2d'})
    return token;
}