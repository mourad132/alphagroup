//Setting Up Express
const express = require('express');
const route = express.Router();
const Events = require('../models/event');
const ensureAuthenticated = require('../helpers/index.js')

//Landing Page
route.get('/', (req, res) => {
    res.render("landing");
});

//Home Page
route.get('/home', (req, res) => {
    Events.find({})
        .then(events => res.render('home', { events, user: req.user }))
        .catch(err => console.log(err));
})

// Events Page
route.get('/events', ensureAuthenticated, (req, res) => {
    Events.find({})
        .then(events => res.render("events", { events, user: req.user }))
        .catch(err => console.log(err));
})

// Event Page
route.get('/events/:id', (req, res) => {
    Events.findById(req.params.id)
        .then(event => res.send(event))
        .catch(err => console.log(err));
});

//Contact Us Page
route.get('/contact-us', (req, res) => {
    res.render('contact-us', { user: req.user });
})

module.exports = route;