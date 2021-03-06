const express = require('express');
const router  = express.Router();

// include CLOUDINARY:
const uploader = require('../configs/cloudinary');

router.post('/upload', uploader.single("imageUrl"), (req, res, next) => {
    console.log('file is: ', req.file)

    if (!req.file) {
      next(new Error('No file uploaded!'));
      return;
    }
    res.json({ secure_url: req.file.secure_url });
})

module.exports = router;