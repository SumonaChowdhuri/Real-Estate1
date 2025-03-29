import Lease from "../models/Lease.js";

export const createLease = async (req, res) => {//controller hai
    try {// use for  catch error

        const { Name, email, phone, address, StartDate, EndDate, MonthlyRent ,Deposite, status ,Lstatus } = req.body;
        if(!Name || !email || !phone|| !address || !StartDate|| !EndDate || !MonthlyRent||! Deposite|| !status||!Lstatus) {
            return res.status(400).json({ success: false, message: 'All fields are required!' });
        }

        await Lease.create({})
        res.status(201).json({
            message: 'Lease created successfully'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error saving the Lease', details: error.message });
    }
};

export const getAllLease = async (req, res) => {
    try {
        const leases = await Lease.find();
        res.json(leases);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const getLeaseById = async (req, res) => {
    try {
        const leaseId = req.params.id;
        const lease = await Lease.findById(leaseId);
        if (!lease) {
            return res.status(404).json({ message: 'Lease id not found' });
        }
        res.json(lease);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateLease = async (req, res) => {
    try {
        const { Name, email, phone, address, StartDate, EndDate, MonthlyRent ,Deposite, status ,Lstatus } = req.body;
        const leaseId = req.params.id; 

        const existingLease = await Lease.findById(leaseId);
        if (!existingLease) {
            return res.status(404).json({ message: 'lease not found' });
        }

        const updateData = {
            Name, email, phone, address, StartDate, EndDate, MonthlyRent ,Deposite, status ,Lstatus 
        };

        const updatedLease = await Lease.findByIdAndUpdate(
            leaseId,
            updateData,
            { new: true } 
        );

        res.json({
            message: 'Lease updated successfully',
            lease: updatedLease
        });
    } catch (error) {
        res.status(500).json({ error: 'Error updating the branch', details: error.message });
    }
};

export const deleteLease = async (req, res) => {
    try {
        const leaseId = req.params.id; 
        const deletedLease = await Lease.findByIdAndDelete(leaseId); 
        if (!deletedLease) {
            return res.status(404).json({ message: 'Lease not found' });
        }
        res.json({ message: 'Lease deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};