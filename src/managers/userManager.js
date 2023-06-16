const User = require('../models/User')
const mongoose = require('mongoose');

exports.login = function (username, password) {

}

exports.register = function (userdata) {
    const user = new User({
        username: userdata.username,
        email: userdata.email,
        password: userdata.password,
    });
    user.save()
}

exports.logout = function (req, res) {

}