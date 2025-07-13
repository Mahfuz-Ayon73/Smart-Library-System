import dotenv from "dotenv";
import mongoose from "mongoose"

dotenv.config();

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);

        console.log('Connected to User Database');
        
    } 
    catch (error) {
        console.log('Unable to Connect to User Database ' , error);
    }
}

export default connectToDatabase;