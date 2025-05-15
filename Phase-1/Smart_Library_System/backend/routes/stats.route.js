import express from "express";
import {getPopularBooks , getAllActiveUsers} from "../controllers/stats.controller.js";

const router = express.Router();

router.get('/books/popular',getPopularBooks);
router.get('/users/active',getAllActiveUsers);

export default router;