const express = require('express');
const router = express.Router();
const Events = require('../models/event');
const multer = require('multer');
const { ensureAuthenticated } = require('../helpers/index');
const path = require('path')

//Disk Storage
const storageEngine = multer.diskStorage({
    destination: "./public/images",
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}--${file.originalname}`);
    },
});

//Checking File Type
const checkFileType = function (file, cb) {
    //Allowed file extensions
    const fileTypes = /jpeg|jpg|png|gif|svg/;
  
    //check extension names
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  
    const mimeType = fileTypes.test(file.mimetype);
  
    if (mimeType && extName) {
      return cb(null, true);
    } else {
      cb("Error: You can Only Upload Images!!");
    }
};

//Multer Upload
const upload = multer({
    storage: storageEngine,
    limits: { fileSize: 10000000 },
    fileFilter: (req, file, cb) => {
      checkFileType(file, cb);
    },
});


// Create New Event
router.post('/create', ensureAuthenticated, upload.single('image'), (req, res) => {
    Events.create({
        name: req.body.name,
        presentor: req.body.presentor,
        description: req.body.description,
        place: req.body.place,
        date: req.body.date,
        time: req.body.time,
        image: req.file.filename,
    })
        .then(event => res.redirect(`/events/${event._id}`))
        .catch(err => res.send(err))
});

//Testing Router
router.post('/create/test', (req, res) => {
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


router.get('/edit/:id', ensureAuthenticated, (req, res) => {
    Events.findById(req.params.id)
        .then(event => res.render('create-event', { event }))
        .catch(err => res.send(err))
})

//Edit Event
router.post('/update/:id', ensureAuthenticated, upload.single('image'), async (req, res) => {
    Events.findById(req.params.id)
        .then(async (event) => {
            const doc = await Events.findOneAndUpdate({ _id: req.params.id }, {
                name: req.body.name,
                presentor: req.body.presentor,
                description: req.body.description,
                place: req.body.place,
                date: req.body.date,
                time: req.body.time,
                image: req.file.filename || event.image,
            }, { new: true });
            res.send(doc)
        })
        .catch(err => res.send(err))
})

//Delete Event
router.post('/delete/:id', ensureAuthenticated, (req, res) => {
    Events.findOneAndDelete({_id: req.params.id}, req.body)
        .then(event => res.redirect('/events'))
        .catch(err => res.send(err))
});

module.exports = router;