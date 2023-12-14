//Node Modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require("path");
const app = express();
const session = require('express-session');
const logger = require('morgan');
const passport = require('passport')

// Mongoose Connection
mongoose.connect("mongodb://localhost:27017/test")

//Setup
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Configure Passport
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'Alp%ha Gr$oup Secr#et',
  resave: true,
  saveUninitialized: true,
}));

app.use(passport.authenticate('session'));

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, username: user.username });
    });
  });
  
passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
});

// --------------
// *** ROUTES ***
// --------------

//Main Pages
app.use('/', require('./routes/index.js'));
app.use('/events', require('./routes/events.js'));

//Auth Routes
app.use('/admin', require('./routes/auth.js'));

//Server Listening
app.listen(3000 || PORTNAME, () => {
    console.log('Server Is Listening On Port 3000');
})
