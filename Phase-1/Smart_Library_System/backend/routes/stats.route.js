import express from "express";
import getPopularBooks from "../controllers/stats.controller.js";

const router = express.Router();

router.get('/books/popular',getPopularBooks);

export default router;