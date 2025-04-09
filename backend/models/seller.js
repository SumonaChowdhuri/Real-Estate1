
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const sellerSchema = new Schema({
     Name:{type:String},
     Email:{type:String},
     Phone:{type:Number},
     Address:{type:String},
     PropertyID:{type:String} ,
     ListedPrice:{type:Number},
     Status:{type:String},
    }, { timestamps: true }); // Correct placement of timestamps

const Seller = model('Seller',sellerSchema);

export default Seller;