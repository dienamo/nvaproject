const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();
const Car = require('../models/Car')
const Agency = require('../models/Agency')

router.post('/cars', (req, res, next)=>{
  let {brand,model,year,type,numberOfSeats,numberOfDoors,transmission,airConditionner,images,available,agency,feesPerDay,numberPlate,fuel} = req.body;
  let imageUrl = req.body.imageUrl
  Car.create({
    brand,
    model,
    year,
    type,
    fuel,
    numberOfSeats,
    numberOfDoors,
    transmission,
    airConditionner,
    images,
    available,
    agency,
    feesPerDay,
    numberPlate,
    imageUrl
  })
  .then(response => {
    res.json(response);
    Agency.update({$push:{cars : response}})
    .then(response=>{
      res.json(response)
    })
    .catch(err=>{
      console.log('Error',err)
    })
  })
  .catch(err => {
    res.json(err);
  })
});

router.get('/cars', (req, res, next) => {
  Car.find()
    .then(allTheCars => {
      res.json(allTheCars);
    })
    .catch(err => {
      res.json(err);
    })
});

router.get('/cars/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Car.findById(req.params.id)
    .populate('agency')
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.json(err);
    })
})

// PUT route => to update a specific Car
router.put('/cars/:id', (req, res, next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  Car.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Car with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})

// DELETE route => to delete a specific Car
router.delete('/cars/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Car.findByIdAndRemove(req.params.id)
    .then((car) => {
      Agency.findByIdAndUpdate(
        {_id: car.agency},
        {$pull: {cars: car._id}}
        )
        .then(car=>{
        res.json({ carId : req.params.id , message: `Car with ${req.params.id} is removed successfully.` });
      })
    })
    .catch( err => {
      res.json(err);
    })
})


module.exports = router;