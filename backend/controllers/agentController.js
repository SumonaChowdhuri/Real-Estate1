import Agent from "../models/Agent.js";

export const createAgent = async (req, res) => {//controller hai
    try {// use for  catch error

        const {Name, Email,Phone,Address, License,Experience,Rate,Status} = req.body;
        if(!Name || !Email || !Phone|| !Address || !License|| !Experience || !Rate|| !Status) {
            return res.status(400).json({ success: false, message: 'All fields are required!' });
        }

        await Agent.create({Name, Email, Phone, Address, License, Experience, Rate, Status})
        res.status(201).json({
            success:true,
            message: 'Agent created successfully'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error saving the Agent', details: error.message });
    }
};

export const getAllAgent = async (req, res) => {
    try {
        const agents = await Agent.find();
        res.json(agents);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const getAgentById = async (req, res) => {
    try {
        const agentId = req.params.id;
        const agent = await Agent.findById(agentId);
        if (!agent) {
            return res.status(404).json({ message: 'Agent id not found' });
        }
        res.json(agent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateAgent = async (req, res) => {
    try {
        const { Name, Email, Phone, Address, License, Experience, Rate, Status } = req.body;
        const agentId = req.params.id; 

        const existingAgent = await Agent.findById(agentId);
        if (!existingAgent) {
            return res.status(404).json({ message: 'agent not found' });
        }

        const updateData = {
            Name, Email, Phone, Address, License, Experience, Rate, Status
        };

        const updatedAgent = await Agent.findByIdAndUpdate(
            agentId,
            updateData,
            { new: true } 
        );

        res.json({
            message: 'Agent updated successfully',
            agent: updatedAgent
        });
    } catch (error) {
        res.status(500).json({ error: 'Error updating the branch', details: error.message });
    }
};

export const deleteAgent = async (req, res) => {
    try {
        const agentId = req.params.id; 
        const deletedAgent = await Agent.findByIdAndDelete(agentId); 
        if (!deletedAgent) {
            return res.status(404).json({ message: 'Agent not found' });
        }
        res.json({
             success:true,
             message: 'Agent deleted successfully' });
        } catch (error) {
        res.status(500).json({ message: error.message });
    }
};