import Book from "../models/book.model.js";
import Loan from "../models/loan.model.js";

async function IssueBook(req, res) {
    try {
        const { user_id, book_id, due_date } = req.body;

        const newLoan = new Loan({
            user_id,
            book_id,
            issue_date: new Date(),
            due_date,
            return_date : null,
            status: "ACTIVE"
        })

        const isLoanCreated = await newLoan.save();

        if (isLoanCreated) {

            res.status(201).json({
                id: newLoan._id,
                user_id: newLoan.user_id,
                book_id: newLoan.book_id,
                issue_date: newLoan.issue_date,
                due_date: newLoan.due_date,
                status: newLoan.status
            })
        }
        else {
            res.status(401).json({
                message: "Loan Failed to create"
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

async function ReturnBook(req, res) {
    try {
        const { id: loan_id } = req.params;

        const updatedLoan = await Loan.findByIdAndUpdate(loan_id,
            {
                status: "RETURNED",
                return_date : new Date()
            },
            { new: true }
        );

        if (updatedLoan) {
            res.status(201).json(updatedLoan);
        }
        else {
            res.status(401).json({
                message: "Loan failed to Return"
            });
        }

    }
    catch (error) {
        console.log("Error in Loan Controller");
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

async function UserLoanHistory(req,res) {
    try {

        const {id} = req.params;

        const allLoans = await Loan.find({user_id : id});
 
        if(allLoans){

            let loans = [];
             
            for(let loan of allLoans){
                
                const getBook = await Book.findById(loan.book_id);

                let loanFormat = {
                    "id": loan._id,
                    "book": {
                      "id": getBook._id,
                      "title": getBook.title,
                      "author": getBook.author
                    },
                    "issue_date": loan.issue_date,
                    "due_date": loan.due_date,
                    "return_date": loan.return_date,
                    "status": loan.status
                }

                loans.push(loanFormat);
            }
        
            res.status(201).json(loans);
        }
        else{
            res.status(401).json({
                message:"All loans failed to show"
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

export { IssueBook, ReturnBook , UserLoanHistory};