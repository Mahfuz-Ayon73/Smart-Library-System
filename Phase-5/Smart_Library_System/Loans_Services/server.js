import express from "express";
import dotenv from "dotenv";
import ConnectToDatabase from "./db/connectToDatabase.js";
import LoanRoutes from "./routes/loan.routes.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5082;

app.use(express.json());
app.use('/api/loans',LoanRoutes);

app.get('/',(req,res) => {
    res.send("<h1>Hello from Server</h1>");
})

app.listen(PORT,() => {
    ConnectToDatabase();
    console.log("server is running on port ",PORT);
});