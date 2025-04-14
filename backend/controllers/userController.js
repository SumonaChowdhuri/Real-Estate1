import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export const createUser = async (req, res) => {
    try {

        const { Password,Email} = req.body;
        if(!Password || !Email) {
            return res.status(400).json({ success: false, message: 'All fields are required!' });
        }

        const existinguser=await User.findOne({Email})
        if(existinguser){
            return res.status(400).json({success:false,message:"user Already exists"})
        }

        const hashedPassword = await bcrypt.hash(Password,10);//10 times loop chlkr passoword ko hash krega security ke liye,bcrypt ek package h 
        await User.create({Password:hashedPassword,Email})
        res.status(201).json({
            success:true,
            message: 'user created successfully'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error saving the user', details: error.message });
    }
};
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message:"user doesn't exist" });
        	}

        const isPasswordValid = await bcrypt.compare(password, User.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { _id: User._id, email: User.email},
            process.env.SECRET_KEY,
            { expiresIn: '1y' }
        );
  
        return res.json({
            success: true,
            message:'Login successful!',
            token: token,
            userId: User._id,
        });
  
    } catch (error) {
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
 