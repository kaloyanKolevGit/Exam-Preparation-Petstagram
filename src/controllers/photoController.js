const router = require('express').Router();
const photoManager = require('../managers/photoManager')

router.get('/create', function (req, res) {
    res.render('./photos/create')
});

router.post('/create', async function (req, res) {
    const { name, age, description, location, image } = req.body
    photoData = {
        name,
        age,
        description,
        location,
        image,
        owner: req.user._id
    }
    await photoManager.addPhoto(photoData)
    res.redirect('/catalog')
})

router.get('/catalog', async function (req, res) {
    const photos = await photoManager.getAllPhotos()

    res.render('./photos/catalog', { photos })
})

module.exports = router;