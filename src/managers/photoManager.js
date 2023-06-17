const Photo = require('../models/Photo')

exports.addPhoto = async (photoData) => {
    const newPhoto = await Photo.create(photoData)
}