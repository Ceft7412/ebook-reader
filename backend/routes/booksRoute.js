import express from "express";
const router = express.Router();
import { books, downloadBook } from "../controllers/booksController.js";

router.get("/", books);
router.get("/download", downloadBook);

export default router;
