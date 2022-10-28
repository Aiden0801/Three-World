const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    browsers: [{
        id: {
            type: String,
            required: false,
        },
        name: {
            type: String,
            required: false,
        }
    }],
    //   password: {
    //     type: String,
    //     required: true
    //   },
    //   avatar: {
    //     type: String
    //   }, 
    //   date: {
    //     type: Date,
    //     default: Date.now
    //   }
});

module.exports = mongoose.models['user'] || mongoose.model('user', UserSchema);
