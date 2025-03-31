
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const propertySchema = new Schema({
    id:{type:Number},
    Name: {type:String},
    propertType: {type:String},
    Price: {type:Number},
    Address: {type:String},
    AreaSqft: {type:Number},
    Furnishing: {type:String},
    Room :{type:String},
    Status:{type:String},
}, { timestamps: true }); // Correct placement of timestamps

const Property= model('Property',propertySchema);

export default Property;