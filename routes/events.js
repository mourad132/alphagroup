const express = require('express');
const router = express.Router();
const Events = require('../models/event');
const multer = require('multer');
const ensureAuthenticated = require('../helpers/index');
const path = require('path')

// router.use(ensureAuthenticated);

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
router.post('/create', upload.single('image'), (req, res) => {
    console.log(req.body)
    Events.create({
        name: req.body.name,
        presentor: req.body.presentor,
        description: req.body.description,
        place: req.body.place,
        date: req.body.date,
        time: req.body.time,
        image: req.file.filename,
    })
        .then(event => res.send(event))
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


//Edit Event
router.post('/update/:id', async (req, res) => {
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
router.post('/delete/:id', (req, res) => {
    Events.findOneAndDelete({_id: req.params.id}, req.body)
        .then(event => res.send(event))
        .catch(err => res.send(err))
});

module.exports = router;