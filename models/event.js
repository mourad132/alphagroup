const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    name: String,
    presentor: String,
    image: String,
    date: String,
    time: String,
    description: String,
    place: String,    
});

module.exports = mongoose.model('Event', Schema);
