const express = require('express');
const route = express.Router();
const Events = require('../models/event');

// Create New Event
route.post('/create', (req, res) => {
    Events.create({
        name: req.body.name,
        presentor: req.body.presentor,
        description: req.body.description,
        place: req.body.place,
        date: req.body.date,
        time: req.body.time,
        image: req.body.image,
    })
        .then(event => res.send(event))
        .catch(err => res.send(err))
});

//Edit Event
route.post('/update/:id', async (req, res) => {
    const doc = await Events.findOneAndUpdate({ _id: req.params.id }, {
        name: req.body.name,
        presentor: req.body.presentor,
        description: req.body.description,
        place: req.body.place,
        date: req.body.date,
        time: req.body.time,
        image: req.body.image,
    }, { new: true });
    res.send(doc)
})

//Delete Event
route.post('/delete/:id', (req, res) => {
    Events.findOneAndDelete({_id: req.params.id}, req.body)
        .then(event => res.send(event))
        .catch(err => res.send(err))
});

module.exports = route;