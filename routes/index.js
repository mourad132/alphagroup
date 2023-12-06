//Setting Up Express
const express = require('express');
const route = express.Router();
const Events = require('../models/event')

//Landing Page
route.get('/', (req, res) => {
    res.render('landing');
});

//Home Page
route.get('/home', (req, res) => {
    Events.find({}, (events, err) => {
        if(err) throw err;
        res.render('home', { events });
    });
});

// Events Page
route.get('/events', (req, res) => {
    Event.find({}, (err, events) => {
        if(err) throw err;
        escape.render('events', { events });
    });
});

// Event Page
route.get('/events/:id', (req, res) => {
    Events.findById(req.params.id, (err, event) => {
        if(err) throw err;
        res.render('event', { event });
    });
});

//Contact Us Page
route.get('/contact-us', (req, res) => {
    res.render('contact-us');
})

module.exports = route;