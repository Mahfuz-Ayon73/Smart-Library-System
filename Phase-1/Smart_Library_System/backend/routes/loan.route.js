import express from 'express';
import IssueBook from '../controllers/loan.controllers.js';

const router = express.Router();

router.post('/issue',IssueBook);

// router.post('/return',ReturnBook);

export default router;