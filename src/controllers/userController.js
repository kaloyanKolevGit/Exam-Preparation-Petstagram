const router = require('express').Router();
const userManager = require('../managers/userManager');
const {TOKEN_KEY} = require('../config/config')

router.get('/login', function (req, res) {
    res.render('users/login');
});

router.post('/login', async function (req, res) {
    const { username, password } = req.body;

    let token;

    token = await userManager.login(username, password);


    res.cookie(TOKEN_KEY, token);
    res.redirect('/');
})

router.get('/register', function (req, res) {
    res.render('users/register');
});

router.post('/register', async function (req, res) {
    const { username, email, password, repeatPassword } = req.body;

    await userManager.register({username, email, password, repeatPassword});

    res.redirect('/users/login');
});

router.get('/logout', async function (req, res) {
    res.clearCookie('token')
    res.redirect('/');
})

module.exports = router;