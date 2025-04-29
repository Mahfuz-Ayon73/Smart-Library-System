import mongoose from "mongoose";

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to Database');
        
    } 
    catch (error) {
        console.error(error);
    }
}

export default connectToDatabase;