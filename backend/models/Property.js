
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const propertySchema = new Schema({
    id:{type:Number},
    name: {type:String},
    email: {type:String},
    phone: {type:Number},
    address: {type:String},
    Room :{type:String},
    status:{type:String},
  

  
}, { timestamps: true }); // Correct placement of timestamps

const Property= model('Property',propertySchema);

export default Property;