import Agent from "../Models/Agent.js";

export const createAgent = async (req, res) => {
    try {
        const {Name,Email,Address,Phone,License, Experience,Rate,Status} = req.body;
        console.log("🧾 Agent data received:", req.body);
        if (!Name|| !Email|| !Phone|| !Address|| !License|| !Experience|| !Rate|| !Status ) {
            return res.status(400).json({ success: false, message: 'All fields are required!' });
        }

        await Agent.create({ Name, Email, Phone, Address, License, Experience, Rate, Status}) 
        res.status(201).json({
           success:true,
            message: 'Agent created successfully'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error saving the Agent', details: error.message });
    }
};

export const getAllAgents = async (req, res) => {
    try {
        const agents = await Agent.find();
        res.json(agents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getAgentById = async (req, res) => {
    try {
        const AgentId = req.params.id;
        const Agent = await Agent.findById(AgentId);
        if (!Agent) {
            return res.status(404).json({ message: 'Agent id not found' });
        }
        res.json(Agent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateAgent = async (req, res) => {
    try {
        const { Name, Email, Phone, Address, lisenceNo, Experience, Rate, Status} = req.body;
        const AgentId = req.params.id; 

        const existingAgent = await Agent.findById(AgentId);
        if (!existingAgent) {
            return res.status(404).json({ message: 'Agent not found' });
        }

        const updateData = {
            Name, Email, Phone, Address, lisenceNo, Experience, Rate, Status
        };

        const updatedAgent = await Agent.findByIdAndUpdate(
            AgentId,
            updateData,
            { new: true } 
        );

        res.json({
            success:true,
            message: 'Agent updated successfully',
            Agent: updatedAgent
        });
    } catch (error) {
        res.status(500).json({ error: 'Error updating the Agent', details: error.message });
    }
};

export const deleteAgent = async (req, res) => {
    try {
        const AgentId = req.params.id; 
        const deletedAgent = await Agent.findByIdAndDelete(AgentId); 
        if (!deletedAgent) {
            return res.status(404).json({ message: 'Agent not found' });
        }
        res.json({ 
            success:true,
            message: 'Agent deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};