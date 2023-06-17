const Photo = require('../models/Photo');

exports.addPhoto = (photoData) => Photo.create(photoData)

exports.getAllPhotos = () => Photo.find().populate('owner').lean()

exports.getOnePhoto = (photoId) => Photo.findById(photoId).populate('owner').lean()

exports.deletePhoto = (photoId) => Photo.findByIdAndDelete(photoId)

exports.updateOnePhoto = (photoId, photoData) => Photo.findByIdAndUpdate(photoId, photoData)

exports.addComment = async (photoId, commentData) => {
    const photo = await Photo.findById(photoId)
    console.log(commentData);
    photo.comments.push(commentData)
    console.log(photo);
    return photo.save()
}

exports.getAllComments = async (photoId) => {
    const photo = await Photo.findById(photoId).populate('comments.user').lean()
    return photo.comments
}

exports.getUserPhotos = (userId) => Photo.find({ owner: userId })