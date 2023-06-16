const router = require('express').Router();

router.get('/', async (req, res) => {
    res.render('home');
    console.log(req.user);
})

module.exports = router;