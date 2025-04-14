
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({

    Email: {type:String},
    Password:{type:String}
  
}, { timestamps: true }); // Correct placement of timestamps

const user = model('user', userSchema);
export default user;
