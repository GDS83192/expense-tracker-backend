//https://stackoverflow.com/questions/20766360/whats-the-meaning-of-trim-when-use-in-mongoose#:~:text=If%20you%20add%20%7B%20type%3A%20String,both%20sides%20of%20the%20string.

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { 
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: 4
    },
}, {
    timestamps: true,

})
const User = mongoose.model('User', userSchema)

module.exports = User;