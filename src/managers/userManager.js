const User = require('../models/User')
const bcrypt = require('bcrypt');

exports.login = async function (username, password) {
    const user = await User.findOne({username})  

    if(!user) {
        throw new Error('Invalid Password or Username');   
    }

    const authenticated = await bcrypt.compare(password, user.password);

    if(!authenticated) {
        throw new Error('Invalid Password or Username');   
    }
}

exports.register = async (userData) => {
    if(await User.findOne({username: userData.username})) {
        throw new Error('This username already exists');
    }
    User.create(userData);
}
exports.logout = function (req, res) {

}