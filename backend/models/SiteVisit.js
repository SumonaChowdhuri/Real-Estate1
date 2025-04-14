import mongoose from "mongoose";
const {Schema,model} = mongoose;

const siteSchema = new Schema({
    propertyId:{type:String},
    visitorsName:{type:String},
    contactNo:{type:String},
    agentId:{type:String},
    scheduleDate:{type:String},
    visitStatus:{type:String},
}, { timestamps:true});

const SiteVisit = model('SiteVisit', siteSchema);

export default SiteVisit;