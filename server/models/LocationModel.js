const mongoose = require("mongoose");

const locationSchemea = mongoose.Schema({
    title :{
        type: String,
        required: [true, 'Please add a user ID']
    },
    coordinates :{
        type: [Number],
        required: [true, 'Please add a password']
    },
    description :{
        type: String,
        required: [true, 'Please add a password']
    },
    imageAddr:{
        type: [String]
    }
});

module.exports = mongoose.model("Location", locationSchemea);