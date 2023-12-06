const express = require('express');
const route = express.Router();

//Sign Up Page
route.get('/sign-up', (req, res) => {
    res.render('sign-up');
});


// Login Page
route.get('/login', (req, res) => {
    res.render('login');
});

module.exports = route;
