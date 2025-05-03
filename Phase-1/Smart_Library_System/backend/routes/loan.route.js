import express from 'express';
import {IssueBook,ReturnBook,UserLoanHistory} from '../controllers/loan.controllers.js';

const router = express.Router();

router.post('/issue',IssueBook);

router.put('/return/:id',ReturnBook);

router.get('/history/:id',UserLoanHistory);

export default router;