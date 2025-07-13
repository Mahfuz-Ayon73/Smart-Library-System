import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function ConnectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to Database');
    } 
    catch (error) {
        console.log("Unable to Connect to Database ",error);
    }
}

export default ConnectToDatabase;