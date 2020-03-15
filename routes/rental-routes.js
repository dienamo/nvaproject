const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();
const Car = require('../models/Car')
const Rental = require('../models/Rental')
var nodemailer = require('nodemailer');

router.post('/rentals', (req, res, next)=>{
  let {car,dateOut,dateOfReturn,agency,numberOfDays} = req.body
  
  Car.findById(car).then(car => {
    const feesPerDay = car.feesPerDay;    
    // compute the total BUT server-side !!
    const total = numberOfDays * feesPerDay;
    
    Rental.create({
      user : req.user._id,
      car,
      dateOut,
      dateOfReturn,
      total: total,
      agency,
      numberOfDays
    })
    .then(response => {
        res.json(response);
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'nvisioauto@gmail.com',
            pass: 'hbzytesdluptbsqc'
          }
        });
        
        var mailOptions = {
          from: 'nvisioauto@gmail.com',
          to: req.user.username,
          subject: 'Sending Email using Node.js',
          html: `<h1>Merci ${req.user.name}</h1><p>That was easy!</p>`
        };

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
      })
      .catch(err => {
        res.json(err);
      })
  }).catch(err => res.status(500).json({message: err.message}))
  
});

router.get('/rentals', (req, res, next) => {
  Rental.find()
    .then(allTheRentals => {
      res.json(allTheRentals);
    })
    .catch(err => {
      res.json(err);
    })
});

router.get('/rentals/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Rental.findById(req.params.id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.json(err);
    })
})

// PUT route => to update a specific Rental
router.put('/rentals/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Rental.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Rental with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})

// DELETE route => to delete a specific Rental
router.delete('/rentals/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Rental.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Rental with ${req.params.id} is removed successfully.` });
    })
    .catch( err => {
      res.json(err);
    })
})


module.exports = router;