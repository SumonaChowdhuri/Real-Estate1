import Buyers from "../models/Buyers.js";

export const createBuyers = async (req, res) => {//controller hai
    try {// use for  catch error

        const { Name, email, phone, address, Room, status } = req.body;
        if(!Name || !email || !phone|| !address  || !Room|| !status) {
            return res.status(400).json({ success: false, message: 'All fields are required!' });
        }

        await Buyers.create({Name, email, phone, address, Room, status})
        res.status(201).json({
            message: 'Buyers created successfully'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error saving the Buyers', details: error.message });
    }
};

export const getAllBuyers = async (req, res) => {
    try {
        const buyerss = await Buyers.find();
        res.json(buyerss);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const getBuyersById = async (req, res) => {
    try {
        const buyersId = req.params.id;
        const buyers = await Buyers.findById(buyersId);
        if (!buyers) {
            return res.status(404).json({ message: 'Buyers id not found' });
        }
        res.json(buyers);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateBuyers = async (req, res) => {
    try {
        const {  Name, email, phone, address, Room, status  } = req.body;
        const buyersId = req.params.id; 

        const existingBuyers = await Buyers.findById(buyersId);
        if (!existingBuyers) {
            return res.status(404).json({ message: 'buyers not found' });
        }

        const updateData = {
            Name, email, phone, address, Room, status 
        };

        const updatedBuyers = await Buyers.findByIdAndUpdate(
            buyersId,
            updateData,
            { new: true } 
        );

        res.json({
            message: 'Buyers updated successfully',
            buyers: updatedBuyers
        });
    } catch (error) {
        res.status(500).json({ error: 'Error updating the branch', details: error.message });
    }
};

export const deleteBuyers = async (req, res) => {
    try {
        const buyersId = req.params.id; 
        const deletedBuyers = await Buyers.findByIdAndDelete(buyersId); 
        if (!deletedBuyers) {
            return res.status(404).json({ message: 'Buyers not found' });
        }
        res.json({ message: 'Buyers deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};