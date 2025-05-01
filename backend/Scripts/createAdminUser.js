import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

dotenv.config();

const createAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      family: 4,
    });
    console.log("MongoDB connected successfully");

    // Check if admin user already exists
        const existingAdmin = await User.findOne({ Email: 'admin@inventory.com' });
        if (existingAdmin) {
          console.log("Admin user already exists");
          process.exit(0);
        }
    
        // Create admin user
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await User.create({
          Email: 'admin@inventory.com',
          Password: hashedPassword
        });

    console.log("Admin user created successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  }
};

createAdminUser(); 