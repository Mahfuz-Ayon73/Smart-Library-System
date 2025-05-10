import Loan from "../models/loan.models.js";
import axios from "axios";

async function IssueBook(req, res) {
    try {
        const { user_id, book_id, due_date } = req.body;

        const bookResponse = await axios.get(`http://localhost:8081/api/books/getbook/${book_id}`);

        const book = bookResponse.data;

        if (book.available_copies <= 0) {
            return res.status(400).json({
                message: "No available book to borrow"
            })
        }

        const newLoan = new Loan({
            user_id,
            book_id,
            issue_date: new Date(),
            due_date,
            return_date: null,
            status: "ACTIVE"
        })

        const isLoanCreated = await newLoan.save();
        
        await axios.patch(`http://localhost:8081/api/books/update/${book_id}`,
            {
                available_copies: book.available_copies - 1
            }
        );
        console.log("Book updated");


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
                return_date: new Date()
            },
            { new: true }
        );

        if (updatedLoan) {
            res.status(201).json(updatedLoan);
            await updateReturnedBook(updatedLoan.book_id);
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

async function UserLoanHistory(req, res) {
    try {

        const { id } = req.params;

        const allLoans = await Loan.find({ user_id: id });

        if (allLoans) {

            let loans = [];

            for (let loan of allLoans) {

                const foundBook = await axios.get(`http://localhost:8081/api/books/getbook/${loan.book_id}`);

                if (loan.status === "ACTIVE") {
                    console.log(foundBook);

                    let loanFormat = {
                        "id": loan._id,
                        "book": {
                            "id": foundBook._id,
                            "title": foundBook.title,
                            "author": foundBook.author
                        },
                        "issue_date": loan.issue_date,
                        "due_date": loan.due_date,
                        "return_date": loan.return_date,
                        "status": loan.status
                    }

                    loans.push(loanFormat);
                }
            }

            res.status(201).json(loans);
        }
        else {
            res.status(401).json({
                message: "All loans failed to show"
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

async function OverDueLoans(req, res) {
    try {
        const allLoans = await Loan.find();

        let overDueLoans = [];

        const currentData = new Date();

        const millisecondsInADay = 1000 * 60 * 60 * 24;

        for (let loan of allLoans) {
            if (loan.due_date < currentData) {
                let user = await axios.get(`http://localhost:8080/api/users/retrieve/${loan.user_id}`);
                let book = await axios.get(`http://localhost:8081/api/books/getbook/${loan.book_id}`);
                const daysOverdue = Math.ceil((currentData - loan.due_date) / millisecondsInADay);

                const formatLoan = {
                    "id": loan._id,
                    "user": {
                        "id": user._id,
                        "name": user.name,
                        "email": user.email
                    },
                    "book": {
                        "id": book._id,
                        "title": book.title,
                        "author": book.author,
                    },
                    "issue_date": loan.issue_date,
                    "due_date": loan.due_date,
                    "days_overdue": daysOverdue
                }

                overDueLoans.push(formatLoan);
            }
        }

        res.status(200).json(overDueLoans);
    }
    catch (error) {
        console.log("Error in Loan Controller");
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

async function ExtendDate(req, res) {
    try {
        const { id } = req.params;

        const { extension_days } = req.body;

        const getLoan = await Loan.findById(id);

        const original_due_date = new Date(getLoan.due_date);

        const extended_date = new Date(original_due_date.getTime() + extension_days * 24 * 60 * 60 * 1000);

        const updatedLoan = await Loan.findByIdAndUpdate(
            id,
            {
                "due_date": extended_date,
                "extensions_count": (getLoan.extensions_count || 0) + 1
            },
            {
                new: true
            }
        )

        if (updatedLoan) {
            res.status(200).json({

                "id": updatedLoan._id,
                "user_id": updatedLoan.user_id,
                "book_id": updatedLoan.book_id,
                "issue_date": updatedLoan.issue_date,
                "original_due_date": original_due_date,
                "extended_due_date": updatedLoan.due_date,
                "status": updatedLoan.status,
                "extensions_count": updatedLoan.extensions_count

            });
        }
        else {
            res.status(400).json({
                message: "Failed to Update Loan"
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

export { IssueBook, ReturnBook, UserLoanHistory, OverDueLoans, ExtendDate };