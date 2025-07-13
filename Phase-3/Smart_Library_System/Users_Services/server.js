import express from "express";
import dotenv from "dotenv";
import connectToDatabase from "./db/connectToDB.js";
import UserRoute from './routes/user.route.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT ;

app.get('/',(req,res) => {
    res.send("<h1>hello from server</h1>")
})

app.use(express.json());
app.use('/api/users',UserRoute);

app.listen(PORT,() => {
    connectToDatabase();
    console.log('Server is running on port ',PORT);
})

