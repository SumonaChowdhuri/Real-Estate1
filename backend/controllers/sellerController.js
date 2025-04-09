import Seller from "../models/Seller.js";

export const createSeller = async (req, res) => {//controller hai
    try {// use for  catch error

        const { Name,Email, Phone, Address, PropertyID,ListedPrice, Status} = req.body;
        if(!Name || !Email || !Phone|| !Address || !PropertyID ||!ListedPrice || !Status) {
            return res.status(400).json({ success: false, message: 'All fields are required!' });
        }

        await Seller.create({Name,Email, Phone, Address, PropertyID, ListedPrice, Status})
        res.status(201).json({
            success:true,
            message: 'Seller created successfully'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error saving the Seller', details: error.message });
    }
};

export const getAllSeller = async (req, res) => {
    try {
        const Sellers = await Seller.find();
        res.json(Sellers);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const getSellerById = async (req, res) => {
    try {
        const SellerId = req.params.id;
        const Seller = await Seller.findById(SellerId);
        if (!Seller) {
            return res.status(404).json({ message: 'Seller id not found' });
        }
        res.json(Seller);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateSeller = async (req, res) => {
    try {
        const { Name,Email, Phone, Address, PropertyID, ListedPrice,Status  } = req.body;
        const SellerId = req.params.id; 

        const existingSeller = await Seller.findById(SellerId);
        if (!existingSeller) {
            return res.status(404).json({ message: 'Seller not found' });
        }

        const updateData = {
            Name,Email, Phone, Address, PropertyID,ListedPrice, Status
        };

        const updatedSeller = await Seller.findByIdAndUpdate(
            SellerId,
            updateData,
            { new: true } 
        );

        res.json({
            message: 'Seller updated successfully',
            Seller: updatedSeller
        });
    } catch (error) {
        res.status(500).json({ error: 'Error updating the branch', details: error.message });
    }
};

export const deleteSeller = async (req, res) => {
    try {
        const SellerId = req.params.id; 
        const deletedSeller = await Seller.findByIdAndDelete(SellerId); 
        if (!deletedSeller) {
            return res.status(404).json({ message: 'Seller not found' });
        }
        res.json({
            success:true,
            message: 'Seller deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};