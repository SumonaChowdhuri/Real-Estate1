import project from "../models/project.js";

export const createproject = async(req,res) => {
    try{
        const  {projectName,location,developerName,startDate,endDate,totalUnits,status}= req.body
        if(!projectName||!location||!developerName||!startDate||!endDate||!totalUnits||!status){
            res.status(400).json({success:false,message:"All fields are required"})
        }
        await project.create({projectName,location,developerName,startDate,endDate,totalUnits,status})
        res.status(200).json({success:true,message:"created successfully"});
    }
    catch(error){
        res.status(500).json({success:false,details:error.message})
    }
}
export const getproject = async(req,res) => {
    try{
        const dev = await project.find();
        res.json(dev);
    }
    catch(error){
        res.status(404).json({message:error.message})
    }
}
export const getprojectById = async(req,res) => {
    try{
        const devId=req.params.id;
        const dev = await project.findById(devId);
        if(!dev){
            return res.status(404).json({message:"project Id not find"});
        }
        res.json(dev);
    }
    catch(error){
        res.status(400).json({message:error.message})
    }
}
export const updateproject = async(req,res) => {
    try {
        const{projectName,location,developerName,startDate,endDate,totalUnits,status} = req.body
        const devId = req.params.id;
        const existingDev = await project.findById(devId);
        if(!existingDev){
          return res.status(404).json({message:"project not find"});  
        }
        const updateproject = {projectName,location,developerName,startDate,endDate,totalUnits,status}
        const updatedDev = await project.findByIdAndUpdate(devId,updateproject,{ new: true });

        res.json({
            success:true,
            message: 'project updated successfully',
            dev: updatedDev
        });
    } catch (error) {
        res.status(500).json({ error: 'Error updating the branch', details: error.message });
    }
};
export const deleteproject = async (req, res) => {
    try {
        const devId = req.params.id; 
        const deleteproject = await project.findByIdAndDelete(devId); 
        if (!deleteproject) {
            return res.status(404).json({ message: 'project not found' });
        }
        res.json({
             success:true,
             message: 'project deleted successfully' });
        } catch (error) {
        res.status(500).json({ message: error.message });
    }
};