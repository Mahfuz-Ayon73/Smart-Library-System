import express from 'express'
import dotenv from 'dotenv'
import connectToDatabase from './db/ConnectToDatabase.js';
import userRoute from "./routes/user.route.js"
import bookRoute from "./routes/book.route.js"
import loanRoute from "./routes/loan.route.js"
import statRoute from "./routes/stats.route.js"

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json()) 

app.use('/api/users',userRoute);
app.use('/api/books',bookRoute);
app.use('/api/loans',loanRoute);
app.use('/api/stats',statRoute);

app.get('/',(req,res) => {
    res.send('<p>Server working</p>')
})

app.listen(PORT,() => {
    connectToDatabase();
    console.log('Server started to Port : ',PORT);
})
