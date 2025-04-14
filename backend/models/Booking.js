
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const bookingSchema = new Schema({
    id:{type:Number},
    Name:{type: String},
    Email: {type:String},
    Phone: {type:String},
    Address:{type: String},
    CheckIN :{type:Number},
    CheckOut:{type:Number},
    Status:{type:String},
    Bookingstatus:{type:String},
  
}, { timestamps: true }); // Correct placement of timestamps

const Booking = model('Booking', bookingSchema);

export default Booking;