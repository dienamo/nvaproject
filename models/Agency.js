const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const agencySchema = new Schema ({
  name : {type : String , require: true},
  cars : [{type : Schema.Types.ObjectId, ref: 'Car'}],
  address : {type : String , required: true},
  latlng : {type : Array, required : true },
},{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Agency = mongoose.model('Agency' , agencySchema);

module.exports = Agency