import express from "express";
import dotenv from "dotenv";
import booksRoute from "./routes/booksRoute.js";
dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

// Route for getting all the books to display its - cover, title, author, description, publisher...
app.use("/api/books", booksRoute);

// Route for download a specific book
app.use("/api/books/download", booksRoute);

// PORT

app.get("/", (req, res) => res.send("Server is ready."));
app.listen(PORT, () => console.log(`Server is getting start in ${PORT}`));
