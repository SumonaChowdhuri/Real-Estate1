
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const buyersSchema = new Schema({
    id:{type:Number},
    Buyers:{type:String},
    Email:{type:String}, 
    Phone:{type:Number}, 
    Address:{type:String}, 
    Room:{type:Number}, 
    Status:{type:String}
  
}, { timestamps: true }); // Correct placement of timestamps

const Buyers = model('Buyers',buyersSchema);

export default Buyers;