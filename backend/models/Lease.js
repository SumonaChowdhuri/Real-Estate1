
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const leaseSchema = new Schema({
    Name: {type:String},
    Email:{type: String},
    Phone:{type: String},
    Address:{type: String},
    StartDate :{type:String},
    EndDate:{type:String},
    MonthlyRent:{type:String},
    Deposit:{type:String},
    Status:{type:String},
    LeaseStatus:{type:String},
  
}, { timestamps: true }); // Correct placement of timestamps

const Lease = model('Lease', leaseSchema);

export default Lease;