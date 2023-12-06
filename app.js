//Node Modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require("path");
const app = express();

// Mongoose Connection
mongoose.connect("mongodb+srv://mourad132:Momo2005@alphagroup.yb9dnte.mongodb.net/?retryWrites=true&w=majority")

//Setup
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// --------------
// *** ROUTES ***
// --------------

//Main Pages
app.use('/', require('./routes/index.js'));
app.use('/events', require('./routes/events.js'));

//Server Listening
app.listen(3000 || PORTNAME, () => {
    console.log('Server Is Listening On Port 3000');
})
