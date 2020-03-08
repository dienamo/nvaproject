const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();

const Agency = require('../models/Agency')

router.post('/agencies', (req, res, next)=>{
  let {name,address,latlng,phone,cars} = req.body
  Agency.create({
    name,
    cars,
    address,
    latlng,
    phone
  })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    })
});

router.get('/agencies', (req, res, next) => {
  Agency.find()
    .then(allTheAgencys => {
      res.json(allTheAgencys);
    })
    .catch(err => {
      res.json(err);
    })
});

router.get('/agencies/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Agency.findById(req.params.id)
    .populate('cars')
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.json(err);
    })
})

// PUT route => to update a specific Agency
router.put('/agencies/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Agency.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Agency with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})

// DELETE route => to delete a specific Agency
router.delete('/agencies/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Agency.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Agency with ${req.params.id} is removed successfully.` });
    })
    .catch( err => {
      res.json(err);
    })
})


module.exports = router;