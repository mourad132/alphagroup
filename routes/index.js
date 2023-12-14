//Setting Up Express
const express = require('express');
const router = express.Router();
const Events = require('../models/event');
const { ensureAuthenticated } = require('../helpers/index.js')

//Landing Page
router.get('/', (req, res) => {
    res.render("landing");
});

//Home Page
router.get('/home', (req, res) => {
    Events.find({})
        .then(events => res.render('home', { events, user: req.user }))
        .catch(err => console.log(err));
})

// Events Page
router.get('/events', (req, res) => {
    Events.find({})
        .then(events => res.render('events', { events, user: req.user }))
        .catch(err => console.log(err));
})

router.get('/create-event', ensureAuthenticated, (req, res) => {
    res.render('create-event', { event: false })
})

// Event Page
router.get('/events/:id', (req, res) => {
    Events.findById(req.params.id)
        .then(event => res.render('event', { event, user: req.user }))
        .catch(err => console.log(err));
});

//Contact Us Page
router.get('/contact-us', (req, res) => {
    res.render('contact-us', { user: req.user });
})

module.exports = router;