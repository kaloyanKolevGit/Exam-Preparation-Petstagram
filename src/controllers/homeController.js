const router = require('express').Router();
const photoManager = require('../managers/photoManager');
const { isAuth } = require('../middlewares/authMiddleware')

router.get('/', async (req, res) => {
    res.render('home');
})

router.get('/404', (req, res) => {
    res.render('404');
});

router.get('/profile', isAuth, async function (req, res) {
    const userPhotos = await photoManager.getUserPhotos(req.user._id).lean();
    res.render('users/profile', { userPhotos, userPhotosCount: userPhotos.length});
})

module.exports = router;