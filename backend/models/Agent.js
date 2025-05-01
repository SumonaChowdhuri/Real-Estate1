
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const agentSchema = new Schema({

    Name:{type:String},
    Email:{type:String},
    Address:{type:String},
    Phone:{type:String},
    License:{type:String}, 
    Experience:{type:String},
    Rate:{type:String},
    Status:{type:String},
  
}, { timestamps: true }); // Correct placement of timestamps

const Agent = model('Agent', agentSchema);

export default Agent;