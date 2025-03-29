
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const buyersSchema = new Schema({
    id:{type:Number},
    name: {type:String},
    email: {type:String},
    phone: {type:Number},
    address: {type:String},
    Room :{type:String},
    status:{type:String},
  

  
}, { timestamps: true }); // Correct placement of timestamps

const Buyers = model('Buyers',buyersSchema);

export default Buyers;