const Photo = require('../models/Photo');
const User = require('../models/User');

exports.addPhoto = async (photoData) => {
    const newPhoto = await Photo.create(photoData)
}

exports.getAllPhotos = async () => {
    const photos = await Photo.find().populate('owner').lean()
    return photos
}

exports.getOnePhoto = async (photoId) => {
    const photo = await Photo.findById(photoId).populate('owner').lean()
    return photo;
}