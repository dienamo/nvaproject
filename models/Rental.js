const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const rentalSchema = new Schema({
  user: {type : Schema.Types.ObjectId, ref: 'User'},
  car: {type : Schema.Types.ObjectId, ref: 'Car'},
  agency: {type : Schema.Types.ObjectId, ref: 'Agency'},
  dateOut : {type: Date , required: true},
  dateOfReturn : {type: Date , required: true},
  //withDriver : {type: Boolean , required: true},
  total: {type: Number , required: true},
  numberOfDays: {type: Number , required: true},
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Rental = mongoose.model('Rental', rentalSchema);
module.exports = Rental;