const Photo = require('../models/Photo');
const User = require('../models/User');

exports.addPhoto = async (photoData) => {
    const newPhoto = await Photo.create(photoData)
}

exports.getAllPhotos = async () => {
    const photos = await Photo.find().lean()
    photos.forEach(async (photo) => {
        const user = await User.findById(photo.owner)
        photo['ownerName'] = user.username
    })
    return photos
}

exports.getOnePhoto = async (photoId) => {
    const photo = await Photo.findById(photoId).lean()
    const user = await User.findById(photo.owner)
        photo['ownerName'] = user.username
    return photo;
}