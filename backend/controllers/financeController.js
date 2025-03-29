import Finance from "../models/Finance.js";

export const createFinance = async (req, res) => {//controller hai
    try {// use for  catch error

        const { Name,amount, transactionType, catogery, PaymentMode, status } = req.body;
        if(!Name || !amount || !transactionType|| !catogery || !PaymentMode || !status) {
            return res.status(400).json({ success: false, message: 'All fields are required!' });
        }

        await Finance.create({Name,amount, transactionType, catogery, PaymentMode, status })
        res.status(201).json({
            message: 'Finance created successfully'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error saving the Finance', details: error.message });
    }
};

export const getAllFinance = async (req, res) => {
    try {
        const finances = await Finance.find();
        res.json(finances);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const getFinanceById = async (req, res) => {
    try {
        const financeId = req.params.id;
        const finance = await Finance.findById(financeId);
        if (!finance) {
            return res.status(404).json({ message: 'Finance id not found' });
        }
        res.json(finance);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateFinance = async (req, res) => {
    try {
        const { Name,amount, transactionType, catogery, PaymentMode, status  } = req.body;
        const financeId = req.params.id; 

        const existingFinance = await Finance.findById(financeId);
        if (!existingFinance) {
            return res.status(404).json({ message: 'finance not found' });
        }

        const updateData = {
            Name,amount, transactionType, catogery, PaymentMode, status 
        };

        const updatedFinance = await Finance.findByIdAndUpdate(
            financeId,
            updateData,
            { new: true } 
        );

        res.json({
            message: 'Finance updated successfully',
            finance: updatedFinance
        });
    } catch (error) {
        res.status(500).json({ error: 'Error updating the branch', details: error.message });
    }
};

export const deleteFinance = async (req, res) => {
    try {
        const financeId = req.params.id; 
        const deletedFinance = await Finance.findByIdAndDelete(financeId); 
        if (!deletedFinance) {
            return res.status(404).json({ message: 'Finance not found' });
        }
        res.json({ message: 'Finance deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};