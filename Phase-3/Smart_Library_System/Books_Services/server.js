import express from "express";
import dotenv from "dotenv";
import BookRoute from "./route/book.route.js"
import ConnectToDatabase from "./db/connectToDb.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use('/api/books',BookRoute);

app.listen(PORT, () => {
    ConnectToDatabase();
    console.log('Server is running on port ',PORT);
})