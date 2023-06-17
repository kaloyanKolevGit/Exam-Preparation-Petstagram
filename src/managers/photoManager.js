const Photo = require('../models/Photo');

exports.addPhoto = (photoData) => Photo.create(photoData)

exports.getAllPhotos = () => Photo.find().populate('owner').lean()

exports.getOnePhoto = (photoId) => Photo.findById(photoId).populate('owner').lean()

exports.deletePhoto = (photoId) => Photo.findByIdAndDelete(photoId)