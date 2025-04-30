import Loan from "../models/loan.model.js";

async function IssueBook(req, res) {
    try {
        const { user_id, book_id, due_date } = req.body;

        const newLoan = new Loan({
            user_id,
            book_id,
            issue_date: new Date(),
            due_date,
            status: "ACTIVE"
        })

        const isLoanCreated = await newLoan.save();

        if (isLoanCreated) {
            res.status(201).json({
                id: newLoan._id,
                user_id : newLoan.user_id,
                book_id : newLoan.book_id,
                issue_date: newLoan.issue_date,
                due_date : newLoan.due_date,
                status: newLoan.status
            })
        }
        else{
            res.status(401).json({
                message : "Loan Failed to create"
            })
        }
    }
    catch (error) {
        console.log("Error in Loan Controller");
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

export default IssueBook;