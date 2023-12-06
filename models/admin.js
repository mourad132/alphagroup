const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    username: String,
    password: String,
    code: String,
    permission: Number,
});

module.exports = mongoose.model('Admin', Schema);
