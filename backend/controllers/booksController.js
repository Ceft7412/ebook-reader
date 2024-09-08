import EPub from "epub";
import path from "path";
import fs from "fs/promises";
import crypto from "crypto";
import { URLSearchParams } from "url";

/**
 * @description Get books data from file system
 * @route GET /api/books
 */
export const books = async (req, res) => {
  // Defining the directory path containing the files to be read.
  const dirPath = path.join(process.cwd(), "backend/data/epub");

  // Declaring the variable to hold the filenames in an array.
  const fileNames = await fs.readdir(dirPath);

  const epubFilesnames = fileNames.filter(
    (filename) => path.extname(filename) === ".epub"
  );

  const books = await Promise.all(
    epubFilesnames.map(async (filename) => {
      const filePath = path.join(dirPath, filename);

      const epub = new EPub(filePath);
      await new Promise((resolve, reject) => {
        epub.on("end", resolve);
        epub.on("error", reject);
        epub.parse();
      });

      const metadata = epub.metadata;
      const {
        title,
        creator: author,
        cover: coverId,
        description,
        language,
        publisher,
      } = metadata;

      // Fetch and convert the cover image to a base64 string
      const coverData = await new Promise((resolve, reject) => {
        if (!coverId) {
          // Resolve with null if there's no cover image
          resolve(null);
          return;
        }

        epub.getImage(coverId, (error, data, mimeType) => {
          if (error) {
            reject(error);
          } else {
            const base64Image = `data:${mimeType};base64,${data.toString("base64")}`;
            resolve(base64Image);
          }
        });
      });
      // Read the entire file as a Buffer and convert to a base64 string
      const fileBuffer = await fs.readFile(filePath);
      const base64File = fileBuffer.toString("base64");

      // Generate a unique ID for the book based on the filename
      const hash = crypto.createHash("sha256");
      hash.update(filename);
      const id = hash.digest("hex");
      return {
        id: id,
        title,
        author,
        publisher,
        description,
        language,
        cover: coverData,
        hello: "helloworld",
        fileContent: base64File,
        link: `/api/download?filename=${encodeURIComponent(filename)}`,
        filename,
      };
    })
  );
  res.status(200).json({
    books,
  });
};
export const downloadBook = async (req, res) => {
  try {
    const searchParams = new URLSearchParams(req.url.split("?")[1]); // Parse the query string
    const filename = searchParams.get("filename"); // Get the filename from the query

    if (!filename) {
      return res.status(400).json({ error: "Filename is required" });
    }

    const filePath = path.join(process.cwd(), "backend/data/epub", filename);

    // Ensure the file exists and is an EPUB
    const fileExists = await fs
      .access(filePath)
      .then(() => true)
      .catch(() => false);

    if (!fileExists || path.extname(filename) !== ".epub") {
      return res.status(404).json({ error: "File not found o  Pr invalid format" });
    }

    // Read the file
    const fileBuffer = await fs.readFile(filePath);

    // Return the file data
    res.setHeader("Content-Type", "application/epub+zip");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    return res.end(fileBuffer);
  } catch (error) {
    console.error("Error downloading epub file:", error);
    return res.status(500).json({ error: "Error downloading epub file" });
  }
};
