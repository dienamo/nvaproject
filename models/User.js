const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  name: {type : String , required: true},
  lastname: {type : String , required: true},
  username: {type : String , required: true},
  password: {type : String , required: true},
  address: {type : String , required: true},
  phonenumber: {type : Number , required: true},
  rentals: [{type : Schema.Types.ObjectId, ref: 'Rental'}] ,
  userStatus : {type : String ,  enum : ['admin' , 'standard'] , default : 'standard'}
}, 
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;