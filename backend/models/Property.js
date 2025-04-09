
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const propertySchema = new Schema({
    id:{type:String},
    Name: {type:String},
    PropertyType: {type:String},
    Price: {type:String},
    Address: {type:String},
    AreaSqft: {type:String},
    Furnishing: {type:String},
    status:{type:String},
}, { timestamps: true }); // Correct placement of timestamps

const Property= model('Property',propertySchema);

export default Property;