import express from 'express';
import {AddBook,SearchBook,UpdateBook,RemoveBook} from '../controllers/book.controller.js';

const router = express.Router();

router.post('/add',AddBook);

router.get('/',SearchBook);

router.patch('/update/:id',UpdateBook);

router.delete('/remove/:id',RemoveBook);

export default router;