const router = require('express').Router();
const photoManager = require('../managers/photoManager')

router.get('/create', function (req, res) {
    res.render('./photos/create')
});

router.post('/create', function (req, res) {
    const {name, age, description, location, image} = req.body
    photoData = {
        name,
        age,
        description,
        location,
        image,
        owner: req.user._id
    }
    photoManager.addPhoto(photoData)
    res.redirect('/')
})

module.exports = router;