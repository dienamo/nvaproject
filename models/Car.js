const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const carSchema = new Schema({
  brand: {type : String, enum: ['Mercedes','Audi','BMW','Toyota' , "Bentley"] , required: true},
  model: {type: String , required: true},
  type: {type : String, enum: ['4X4','Berline','Luxe'] , required: true},
  numberOfSeats : {type: Number , required: true},
  numberOfDoors : {type: Number , required: true},
  transmission : {type : String, enum: ['automatique', 'manuelle'] , required: true},
  airConditionner : {type: Boolean , required: true},
  images: [{type: String}],
  available : {type: Boolean , required: true},
  agency : {type : Schema.Types.ObjectId, ref: 'Agency'},
  feesPerDay:{type: Number , required: true},
  numberPlate: {type: String , required: true},
  imageUrl: { type: String, required: true }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Car = mongoose.model('Car', carSchema);
module.exports = Car;