
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const bookingSchema = new Schema({
    id:{type:Number},
    Name:{type: String},
    Email: {type:String},
    Phone: {type:Number},
    Address:{type: String},
    CheckIN :{type:String},
    CheckOut:{type:String},
    Status:{type:String},
    Bussinessstatus:{type:String},
  
}, { timestamps: true }); // Correct placement of timestamps

const Booking = model('Booking', bookingSchema);

export default Booking;