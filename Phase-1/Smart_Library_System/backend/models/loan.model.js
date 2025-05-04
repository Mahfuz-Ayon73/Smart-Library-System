import mongoose from "mongoose";

const loanSchema = new mongoose.Schema(
    {
        book_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
            required: true
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true
        },
        issue_date: {
            type: Date,
            default : Date.now
        },
        due_date: {
            type: Date
        },
        return_date:{
            type: Date
        },
        status: {
            type: String,
            required: true
        },
        extensions_count:{
            type : Number,
            default : 0
        }
        
    },
    {
        timestamps: true
    }
);

const Loan = mongoose.model("Loan",loanSchema);

export default Loan;