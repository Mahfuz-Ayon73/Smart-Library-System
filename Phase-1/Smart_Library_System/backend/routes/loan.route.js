import express from 'express';

const router = express.Router();

router.post('issue',IssueBook);

router.post('return',ReturnBook);