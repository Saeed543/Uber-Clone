const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        unique: true
    },
    displayName: String,
    email: {
        type: String,
        unique: true
    },
    picture: String,
    // Add other fields as needed
});

exports.User = mongoose.model('User', userSchema);