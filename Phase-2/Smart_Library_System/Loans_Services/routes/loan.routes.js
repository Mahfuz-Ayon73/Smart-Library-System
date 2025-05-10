import express from "express";
import { IssueBook,ReturnBook,OverDueLoans,UserLoanHistory,ExtendDate } from "../controllers/loan.controllers.js";

const router = express.Router();

router.post('/issue',IssueBook);

router.put('/return/:id',ReturnBook);

router.get('/overdue',OverDueLoans);

router.get('/loanhistory/:id',UserLoanHistory);

router.get('/:id/extend',ExtendDate);

export default router;