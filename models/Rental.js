const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const rentalSchema = new Schema({
  user: {type : Schema.Types.ObjectId, ref: 'User'},
  car: {type : Schema.Types.ObjectId, ref: 'Car'},
  agency: {type : Schema.Types.ObjectId, ref: 'Agency'},
  dateOut : {type: Date , required: true},
  dateOfReturn : {type: Date , required: true},
  total: {type: Number , required: true},
  numberOfDays: {type: Number , required: true},
  driverFees :  {type : Number , required: true},
  orderStatus : {type : String , enum : ['À traiter' , 'En cours' , 'Lu' , 'Terminée' , 'Annulée'] , default : 'À traiter'}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Rental = mongoose.model('Rental', rentalSchema);
module.exports = Rental;