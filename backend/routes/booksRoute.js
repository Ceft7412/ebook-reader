import express from "express";
const router = express.Router();
import { books } from "../controllers/booksController.js";

router.get("/", books);

export default router;
