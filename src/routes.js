const router = require('express').Router()


router.get('/', (req, res) => {
    res.send('first action');
})


module.exports = router;