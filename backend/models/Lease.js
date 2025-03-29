
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const leaseSchema = new Schema({
    name: {type:String},
    email:{type: String},
    phone:{type: Number},
    address:{type: String},
    StartDate :{type:String},
   Enddate:{type:String},
    Monthlyrent:{type:Number},
    Deposite:{type:String},
    status:{type:String},
    Lstatus:{type:String},
  
}, { timestamps: true }); // Correct placement of timestamps

const Lease = model('Lease', leaseSchema);

export default Lease;