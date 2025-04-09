
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const leaseSchema = new Schema({
    Name: {type:String},
    Email:{type: String},
    Phone:{type: Number},
    Address:{type: String},
    StartDate :{type:String},
    Enddate:{type:String},
    MonthlyRent:{type:Number},
    Deposit:{type:String},
    status:{type:String},
    LeaseStatus:{type:String},
  
}, { timestamps: true }); // Correct placement of timestamps

const Lease = model('Lease', leaseSchema);

export default Lease;