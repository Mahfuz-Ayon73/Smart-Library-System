import express from "express";
import {getPopularBooks , getAllActiveUsers , getStatsOverview} from "../controllers/stats.controller.js";

const router = express.Router();

router.get('/books/popular',getPopularBooks);
router.get('/users/active',getAllActiveUsers);
router.get('/overview',getStatsOverview);

export default router;