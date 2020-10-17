const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    ProductName: {
        type: String,
        require: true,
        min: 3,
        max: 100
    },
    ProductRef: {
        type: String
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

module.exports = mongoose.model('Product', Schema)