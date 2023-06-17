const router = require('express').Router();
const { getErrorMessage } = require('../utils/errorHelpers');
const photoManager = require('../managers/photoManager')
const { isAuth } = require('../middlewares/authMiddleware')

router.get('/create', isAuth, function (req, res) {
    res.render('./photos/create')
});

router.post('/create', isAuth, async function (req, res) {
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
        const comments = await photoManager.getAllComments(req.params.photoId)
        res.render('photos/details', { photo, isAuth, allowComments, comments })

    } catch (error) {
        res.render('photos/catalog', { error: getErrorMessage(error) });;
    }
});

router.get('/:photoId/delete', isAuth, async (req, res) => {
    try {
        await photoManager.deletePhoto(req.params.photoId)
        res.redirect('/photos/catalog')
    } catch (error) {
        const photo = photoManager.getOnePhoto(req.params.photoId)
        res.render(`photos/details`, { photo , error: "Unsuccessful deletion" });
    }
});

router.get('/:photoId/edit', isAuth, async (req, res) => {
    try {
        const photoData = await photoManager.getOnePhoto(req.params.photoId)
        res.render('photos/edit', {photoData})
    } catch (error) {
        const photo = photoManager.getOnePhoto(req.params.photoId)
        res.render(`photos/details`, { photo , error: "Error opening editor"});
    }
});

router.post('/:photoId/edit', isAuth, async (req, res) => {
    const newData = req.body
    try {
        await photoManager.updateOnePhoto(req.params.photoId, newData)
        res.redirect(`/photos/${req.params.photoId}/details`)
    } catch (error) {
        const photo = photoManager.getOnePhoto(req.params.photoId)
        res.render(`photos/details`, { photo , error: "Unsuccessful edit"});
    }
});

router.post('/:photoId/comments', async (req, res) => {
    const photo = photoManager.getOnePhoto(req.params.photoId)
    try {
        const { message } = req.body
        const user = req.user._id;
        await photoManager.addComment(req.params.photoId, { user, message })
        res.redirect(`/photos/${req.params.photoId}/details`)
    } catch (error) {
        res.render(`photos/details`, { photo , error: "There was an error posting your comment"});
    }
})

module.exports = router;