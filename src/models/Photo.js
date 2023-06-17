const mongoose  = require('mongoose');

const photoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    //commentList: Array,
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
})

const Photo = mongoose.model('Photo', photoSchema)

module.exports = Photo;