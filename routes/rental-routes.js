const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();
const Car = require('../models/Car')
const Rental = require('../models/Rental')
const User = require('../models/User')
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
      User.findByIdAndUpdate(req.user._id , {$push:{rentals : response}} , {"new": true})
      .populate('rentals')
      .then(
        Car.findByIdAndUpdate({_id: car._id} , {available: false} , {"new": true})
        .then(response=>{
            res.json(response)
          })
          )
          .catch(err=>{
            console.log('Error',err)
          })
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
    .populate({
      path: "car", 
      model: "Car",
    })
    .populate({
      path: 'user',
      model: 'User'
    })
    .populate({
      path: 'agency',
      model: 'Agency'
    })
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

  Rental.findByIdAndUpdate(req.params.id , {orderStatus : 'En cours'}, {new: true})
  .populate({
    path: 'car',
    model: 'Car'
  })
  .populate({
    path: 'user',
    model: 'User'
  })
  .populate({
    path: 'agency',
    model: 'Agency'
  })
    .then((updatedRental) => {
      res.json({ message: `Rental with ${req.params.id} is updated successfully.`,updatedRental });
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
})

router.put('/cancelrental/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Rental.findByIdAndUpdate(req.params.id , {orderStatus : 'Annulée'}, {new: true})
  .populate({
    path: 'car',
    model: 'Car'
  })
  .populate({
    path: 'user',
    model: 'User'
  })
  .populate({
    path: 'agency',
    model: 'Agency'
  })
    .then(updatedRental => {
      Car.findByIdAndUpdate({_id: updatedRental.car._id} , {available: true} , {"new": true})
      .then(updatedCar=>{
        res.json({ message: `Rental with ${req.params.id} is updated successfully.`,updatedRental});
      })
    })
    .catch(err => {
      res.json(err);
    })
})

router.put('/terminaterental/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Rental.findByIdAndUpdate(req.params.id , {orderStatus : 'Terminée'}, {new: true})
  .populate({
    path: 'car',
    model: 'Car'
  })
  .populate({
    path: 'user',
    model: 'User'
  })
  .populate({
    path: 'agency',
    model: 'Agency'
  })
    .then(updatedRental => {
      Car.findByIdAndUpdate({_id: updatedRental.car._id} , {available: true} , {"new": true})
      .then(updatedCar=>{
        res.json({ message: `Rental with ${req.params.id} is updated successfully.`,updatedRental});
      })
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

router.get('/moncompte',(req,res,next)=>{
  // if (!id)...
  User.findById(req.user._id)
    .populate({ 
      path: "rentals", 
      model: "Rental",
      populate:{
        path: "car",
        model: 'Car'
      }
    })
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => console.error(err))
})

router.get('/users', (req, res, next) => {
  User.find()
    .populate({
      path: 'rentals',
      model: 'Rental'
    })
    .then(allTheUsers => {
      res.json(allTheUsers);
    })
    .catch(err => {
      res.json(err);
    })
});

router.get('/todonumber' , (req , res, next) => {
  Rental.find()
   .then(rentals=>{
     res.json(rentals.filter(rental=> rental.orderStatus === 'À traiter').length)
   })
})

router.get('/isreadynumber' , (req , res , next)=>{
  User.findById(req.user._id)
  .populate({
    path: 'rentals',
    model: 'Rental'
  })
  .then(user=>{
    // res.json(user.rentals.filter(rental=> rental.orderStatus === 'En cours').length)
    res.json(user.rentals)
  })
  .catch(err=>console.log(err))
})

router.put('/readbyuser' , (req , res , next)=>{
  Rental.update(
    {_id: {$in: req.body.ids}},
    {$set: {orderStatus : 'Lu'}},
    {multi : true}
  )
  .then(response => res.json(response))
})

module.exports = router;
