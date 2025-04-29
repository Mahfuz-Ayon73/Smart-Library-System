import express from 'express'
import {Register,Retrieve} from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register',Register);

// router.put('/update',Update);

router.get('/retrieve/:id',Retrieve);

export default router;