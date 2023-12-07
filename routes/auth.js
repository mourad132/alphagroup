const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const Admin = require('../models/admin');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(function verify(username, password, cb) {
    Admin.findOne({ username })
        .then(user => {
            if(user == null){
                cb(null, false, "Invalid Username Or Password")
            } else {
                bcrypt.compare(password, user.password, function(err, result) {
                    if(result){
                        cb(null, user)
                    } else {
                        cb(null, result, "Invalid Username Or Password")
                    }
                });
            }
        })
        .catch(err => console.log(err))
}));

//Sign Up Page
router.get('/sign-up', (req, res) => {
    res.render('sign-up');
});

router.post('/sign-up', (req, res) => {
    if(req.body.register == "alphagrouppassword"){
        bcrypt.hash(req.body.password, 10, function(err, hash) {
            // Store hash in your password DB.
            Admin.create({
                username: req.body.username,
                password: hash,
                code: req.body.code,
                permission: req.body.permission
            })
                .then(admin => console.log(admin))
                .catch(err => console.log(err))
        });
    }
})

// Login Page
router.get('/login', (req, res) => {
    res.send('login')
});

//Login Route
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/admin/login'
}));

//logout Route
router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
});

module.exports = router;
