const mongoose = require("mongoose");

const userSchemea = mongoose.Schema({
    username :{
        type: String,
        required: [true, 'Please add a username']
    },
    password :{
        type: String,
        required: [true, 'Please add a password']
    },
    locations: {
        type:[String]
    }
});

module.exports = mongoose.model("User", userSchemea);