import express from "express";
import { Register, Retrieve , Update } from "../controllers/user.controller.js";

const router = express.Router();

router.post('/register',Register);

router.patch('/update/:id',Update);

router.get('/retrieve/:id',Retrieve);

export default router;