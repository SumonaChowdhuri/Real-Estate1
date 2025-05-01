
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const bookingSchema = new Schema({
    Name:{type:String},
    Email:{type:String},
    Mobile:{type:Number},
    Address:{type:String},
    CheckIN:{type:String},
    CheckOut:{type:String},
    TotalAmount:{type:Number},
    PaymentStatus:{type:String},
    Bookingstatus:{type:String}
  
}, { timestamps: true }); // Correct placement of timestamps

const Booking = model('Booking', bookingSchema);

export default Booking;