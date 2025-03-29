import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            family: 4,
        }).then(()=> console.log("Mongodb connected successfully")
        )
    } catch (error) {
        throw error
    }
}
