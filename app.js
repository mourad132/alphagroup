//Node Modules
const expess = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const moment = require('moment');
const app = express();
const flash = require('flash');
const path = require("path");
const passport = require('passport');
const localStrategy = require('passport-local');

//Setup
app.set('view-engine', 'ejs');
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.locals.moment = require('moment');
moment().format();
moment.locale();
app.use(flash());

// --------------
// *** ROUTES ***
// --------------

//Main Pages
app.use('/', require('./routes/index.js'));

//Server Listening
app.listen(3000 || PORTNAME, () => {
    console.log('Server Is Listening On Port 3000');
})
