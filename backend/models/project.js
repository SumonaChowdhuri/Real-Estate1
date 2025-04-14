import mongoose from "mongoose";
const {model,Schema}= mongoose;

const projectSchema=new Schema({
    projectName:{type:String},
    location:{type:String},
    developerName:{type:String},
    startDate:{type:String},
    endDate:{type:String},
    totalUnits:{type:String},
    status:{type:String},
})
const project=model ("project",projectSchema);

export default project;