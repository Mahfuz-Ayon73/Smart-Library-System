import express from 'express';
import {IssueBook,ReturnBook,UserLoanHistory,OverDueLoans,ExtendDate} from '../controllers/loan.controllers.js';

const router = express.Router();

router.post('/issue',IssueBook);

router.put('/return/:id',ReturnBook);

router.get('/history/:id',UserLoanHistory);

router.get('/overdue',OverDueLoans);

router.get('/:id/extend',ExtendDate);

export default router;