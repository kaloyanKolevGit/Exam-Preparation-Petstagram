const mongoose  = require('mongoose');

const photoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
    },
    image: {
        type: String,
        required: true,
        match: /^https?:\/\//,
    },
    age: {
        type: Number,
        required: true,
        min: 1,
        max: 100,
    },
    description: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50,
    },
    location: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50,
    },
    comments: [
        {
            user: {
                type: mongoose.Types.ObjectId,
                required: true,
                ref: 'User',
            },
            message: {
                type: String,
                required: true,
            }
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
})

const Photo = mongoose.model('Photo', photoSchema)

module.exports = Photo;