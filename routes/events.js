const express = require('express');
const route = express.Router();
const Events = require('../models/event');

// Create New Event
route.post('/create', (req, res) => {
    Events.create(req.body)
        .then(event => res.send(event))
        .catch(err => res.send(err))
});

//Edit Event
route.post('/update/:id', (req, res) => {
    Events.findOneAndUpdate({_id: req.params.id}, req.body)
        .then(event => res.send(event))
        .catch(err => res.send(err))
})

//Delete Event
route.post('/delete/:id', (req, res) => {
    Events.findOneAndDelete({_id: req.params.id}, req.body)
        .then(event => res.send(event))
        .catch(err => console.log(err))
});

module.exports = route;