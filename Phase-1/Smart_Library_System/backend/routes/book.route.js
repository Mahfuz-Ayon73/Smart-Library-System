import express from 'express';

const router = express.Router();

router.post('/add',AddBook);

router.put('/update',UpdateBook);

router.delete('/remove',RemoveBook);

export default router;