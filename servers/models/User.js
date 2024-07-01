const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    Email: String,
    Password: String,
})

const UserModel = mongoose.model('user', UserSchema)
module.exports = UserModel