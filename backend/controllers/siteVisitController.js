import SiteVisit from "../models/SiteVisit.js";

export const createSite = async (req,res) => {
    try {
        console.log("🧾 site data received:", req.body);
        const{propertyId,visitorsName,contactNo,agentId,scheduleDate,visitStatus}=req.body
        if(!propertyId||!visitorsName||!contactNo||!agentId||!scheduleDate||!visitStatus){

            return res.status(400).json({success:false, message:"All fields are required!"});
        }
        await SiteVisit.create({propertyId,visitorsName,contactNo,agentId,scheduleDate,visitStatus})
        res.status(200).json({success:true,message:"created successfull"});
    }
    catch (error) {
        res.status(500).json({ error: 'Error saving the Site', details: error.message });
    }
};
export const getSite = async (req,res) =>{
    try {
        console.log("🧾 site data received:", req.body);
        const Site = await SiteVisit.find();
        res.json(Site);
    }
    catch(error){
        res.status(400).json({message:error.message});
    }
};
export const getSideById = async (req, res) => {
    try {
        const siteId = req.params.id;
        const site = await SiteVisit.findById(siteId);
        if (!site) {
            return res.status(404).json({ message: 'site id not found' });
        }
        res.json(site);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
export const updateSite = async (req,res) => {
    try {
        const{propertyId,visitorsName,contactNo,agentId,scheduleDate,visitStatus}=req.body
        const siteId = req.params.id; 

        const existingSite = await SiteVisit.findById(siteId);
        if (!existingSite) {
            return res.status(404).json({ message: 'site not found' });
        }
        const updateSite = {
            propertyId,visitorsName,contactNo,agentId,scheduleDate,visitStatus
        };

        const updatedSite = await SiteVisit.findByIdAndUpdate(
            siteId,
            updateSite,
            { new: true } 
        );

        res.json({
            success:true,
            message: 'site updated successfully',
            site: updatedSite
        });
    } catch (error) {
        res.status(500).json({ error: 'Error updating the branch', details: error.message });
    }
};

export const deleteSite = async (req, res) => {
    try {
        const siteId = req.params.id; 
        const deletedSite = await SiteVisit.findByIdAndDelete(siteId); 
        if (!deletedSite) {
            return res.status(404).json({ message: 'Site not found' });
        }
        res.json({
             success:true,
             message: 'Site deleted successfully' });
        } catch (error) {
        res.status(500).json({ message: error.message });
    }
};