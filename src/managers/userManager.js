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

    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
    }

    const token = await jwt.sign(payload, SECRET, {expiresIn: '2d'})
    return token;
}

exports.register = async (userData) => {
    if(await User.findOne({username: userData.username})) {
        throw new Error('This username already exists');
    }
    User.create(userData);
}
exports.logout = function (req, res) {

}