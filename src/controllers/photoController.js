const router = require('express').Router();
const { getErrorMessage } = require('../utils/errorHelpers');
const photoManager = require('../managers/photoManager')

router.get('/create', function (req, res) {
    res.render('./photos/create')
});

router.post('/create', async function (req, res) {
    photoData = {
        ...req.body,
        owner: req.user._id
    }
    try {
        await photoManager.addPhoto(photoData)
        res.redirect('/photos/catalog')
    } catch (error) {
        res.render('photos/create', { error: getErrorMessage(error) });
    }

})

router.get('/catalog', async function (req, res) {
    try {
        const photos = await photoManager.getAllPhotos()
        res.render('photos/catalog', { photos })
    } catch (error) {
        res.render('photos/catalog', { error: getErrorMessage(error) });
    }

})

router.get('/:photoId/details', async function (req, res) {
    try {
        const photo = await photoManager.getOnePhoto(req.params.photoId)
        const isAuth = res.locals.user?._id == photo.owner._id
        const loggedIn = res.locals.user?._id
        const allowComments = isAuth == false && loggedIn
        res.render('photos/details', { photo, isAuth, allowComments })

    } catch (error) {
        res.render('photos/details', { error: getErrorMessage(error) });
    }
});

module.exports = router;