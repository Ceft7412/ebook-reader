/**
 * DEPRECATED - This file is no longer in use. It only works in Node.js environment.
 */

// import EPub from "epub";
// import path from "path";
// import fs from "fs/promises";
// import CryptoJS from "crypto-js";

// export const fetchBooksFromFileSystem = async () => {
//   // Defining the directory path containing the files to be read.
//   const dirPath = path.dirname("src/resources/data/epub");
//   console.log("dirPath: ", dirPath);

//   // Declaring the variable to hold the filenames in an array.
//   const fileNames = await fs.readdir(dirPath);

//   const epubFilesnames = fileNames.filter(
//     (filename) => path.extname(filename) === ".epub"
//   );

//   const books = await Promise.all(
//     epubFilesnames.map(async (filename) => {
//       const filePath = path.join(dirPath, filename);

//       const epub = new EPub(filePath);
//       await new Promise((resolve, reject) => {
//         epub.on("end", resolve);
//         epub.on("error", reject);
//         epub.parse();
//       });

//       const metadata = epub.metadata;
//       const {
//         title,
//         creator: author,
//         cover: coverId,
//         description,
//         language,
//         publisher,
//       } = metadata;

//       // Fetch and convert the cover image to a base64 string
//       const coverData = await new Promise((resolve, reject) => {
//         if (!coverId) {
//           // Resolve with null if there's no cover image
//           resolve(null);
//           return;
//         }

//         epub.getImage(coverId, (error, data, mimeType) => {
//           if (error) {
//             reject(error);
//           } else {
//             const base64Image = `data:${mimeType};base64,${data.toString("base64")}`;
//             resolve(base64Image);
//           }
//         });
//       });
//       // Read the entire file as a Buffer and convert to a base64 string
//       const fileBuffer = await fs.readFile(filePath);
//       const base64File = fileBuffer.toString("base64");

//       // Generate a unique ID for the book based on the filename

//       const hash = CryptoJS.SHA256(book.book.name);
//       const id = hash.toString(CryptoJS.enc.Hex);

//       return {
//         id: id,
//         title,
//         author,
//         publisher,
//         description,
//         language,
//         cover: coverData,
//         hello: "helloworld",
//         fileContent: base64File,
//         link: filename,
//         filename,
//       };
//     })
//   );
//   return JSON.stringify(books);
// };
