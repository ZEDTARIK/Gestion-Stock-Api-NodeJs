const mongoose = require('mongoose');
const Schema = mongoose.Schema({

    FullName: {
        type: String,
        require: true,
        min: 6,
        max: 60
    },
    UserName: {
        type: String,
        require: true,
        min: 3,
        max: 30
    },
    Email: {
        type: String,
        require: true,
        max: 30
    },
    InsertDateTime: {
        type: Date,
        default: Date.now
    },
    IsDeleted: {
        type: Number,
        default: 0
    }

});

module.exports = mongoose.model('User', Schema);