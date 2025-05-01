import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    const { Email, Password } = req.body;
    console.log('Login attempt with:', { Email, Password: '***' });
    
    try {
        const user = await User.findOne({ Email });
        console.log('User found:', user ? 'Yes' : 'No');
        
        if (!user) {
            return res.status(401).json({ success: false, message: "User doesn't exist" });
        }
        
        const isPasswordValid = await bcrypt.compare(Password, user.Password);
        console.log('Password valid:', isPasswordValid);
        
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { _id: user._id, email: user.Email },
            process.env.SECRET_KEY || 'your-secret-key',
            { expiresIn: '1y' }
        );
        
        console.log('Token generated:', token.substring(0, 20) + '...');
  
        return res.json({
            success: true,
            message: 'Login successful!',
            token: token,
            userId: user._id,
        });
  
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ success: false, message: 'Login failed', error: error.message });
    }
}

export const getAlluser = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const getuserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'user id not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateuser = async (req, res) => {
    try {
        const { Password,Email } = req.body;
        const userId = req.params.id; 

        const existinguser = await User.findById(userId);
        if (!existinguser) {
            return res.status(404).json({ message: 'user not found' });
        }

        const updateData = {
            Password,Email
        };

        const updateduser = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true } 
        );

        res.json({
            success:true,
            message: 'user updated successfully',
            user: updateduser
        });
    } catch (error) {
        res.status(500).json({ error: 'Error updating the branch', details: error.message });
    }
};

export const deleteuser = async (req, res) => {
    try {
        const userId = req.params.id; 
        const deleteduser = await User.findByIdAndDelete(userId); 
        if (!deleteduser) {
            return res.status(404).json({ message: 'user not found' });
        }
        res.json({
            success:true,
            message: 'user deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
 