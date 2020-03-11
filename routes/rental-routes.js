const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();

const Rental = require('../models/Rental')

router.post('/rentals', (req, res, next)=>{
  let {car,dateOut,dateOfReturn,withDriver,rentalFees,reservationNumber} = req.body
  Rental.create({
    user : req.user._id,
    car,
    dateOut,
    dateOfReturn,
    withDriver,
    rentalFees,
    reservationNumber
  })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    })
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