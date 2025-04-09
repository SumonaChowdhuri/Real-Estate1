
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const agentSchema = new Schema({

    Name: {type:String},
    Email: {type:String},
    Phone: {type:Number},
    Address:{type: String},
    License :{type:Number},
    Experience:{type:String},
    Rate:{type:Number},
    Status:{type:String},
  
}, { timestamps: true }); // Correct placement of timestamps

const Agent = model('Agent', agentSchema);

export default Agent;