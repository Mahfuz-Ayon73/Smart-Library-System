import express from 'express';
import {IssueBook,ReturnBook,UserLoanHistory,OverDueLoans} from '../controllers/loan.controllers.js';

const router = express.Router();

router.post('/issue',IssueBook);

router.put('/return/:id',ReturnBook);

router.get('/history/:id',UserLoanHistory);

router.get('/overdue',OverDueLoans);

export default router;