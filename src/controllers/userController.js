const router = require('express').Router();
const userManager = require('../managers/userManager');
const jwt = require('../lib/jwt');
const SECRET = '942f94ed-1430-4487-8dda-9337ea5897c1'

router.get('/login', function (req, res) {
    res.render('users/login');
});

router.post('/login', async function (req, res) {
    const { username, password } = req.body;

    try {
      const token = await userManager.login(username, password);
    } catch (error) {
        console.log(error.message);
    }

    res.cookie('token', token);

    res.redirect('/');
})

router.get('/register', function (req, res) {
    res.render('users/register');
});

router.post('/register', async function (req, res) {
    const { username, email, password, repeatPassword } = req.body;
    
    try {
        await userManager.register({username, email, password, repeatPassword});
    } catch (error) {
        console.log('fuck that');
    }

    res.redirect('/users/login');
});

module.exports = router;