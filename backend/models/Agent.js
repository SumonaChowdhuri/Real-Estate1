
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const agentSchema = new Schema({

    name: {type:String},
    email: {type:String},
    phone: {type:Number},
    address:{type: String},
    license :{type:Number},
    Experience:{type:String},
    Rate:{type:Number},
    status:{type:String},
  
}, { timestamps: true }); // Correct placement of timestamps

const Agent = model('Agent', agentSchema);

export default Agent;