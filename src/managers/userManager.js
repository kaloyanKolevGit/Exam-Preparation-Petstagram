const User = require('../models/User')

exports.login = function (username, password) {

}

exports.register = async (userData) => {
    if(await User.findOne({username: userData.username})) {
        throw new Error('This username already exists');
    }
    User.create(userData);
}
exports.logout = function (req, res) {

}