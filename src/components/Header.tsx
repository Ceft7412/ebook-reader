import React, { useContext } from "react";
import logo from "../resources/images/logo-reader.png";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BookContext } from "../context/Context";
import { addBookToIndexedDB } from "../utils/db";
import { addBook } from "../utils/addBook";
import Info from "./modal/Info";

export default function Header() {
  const { booksEffect, setBooksEffect } = useContext(BookContext);

  const [isInfoOpen, setIsInfoOpen] = React.useState<boolean>(false);
  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (event.target.files) {
        const file = event.target.files[0];
        if (file.type !== "application/epub+zip") {
          return;
        }
        const reader = new FileReader();
        reader.onload = async (event) => {
          if (event.target) {
            // Adding the book to indexedDB first.
            const bookId = await addBookToIndexedDB(file);

            // Reading the file as an array buffer
            const arrayBuffer = event.target.result as ArrayBuffer;
            const book = await addBook(arrayBuffer, file, Number(bookId)); // Convert bookId to number
            const updatedBooksEffect = booksEffect ? [...booksEffect, book] : [book];
            setBooksEffect(updatedBooksEffect);
          }
        };
        reader.readAsArrayBuffer(file);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleModal = () => {
    setIsInfoOpen(!isInfoOpen);
  };
  return (
    <header className=" top-0 left-0 right-0 h-16 flex justify-between items-center px-2 sm:px-10 z-40  ">
      <img src={logo} alt="logo" width={100} height={120} />

      <div className="flex gap-2 items-center">
        <div className="flex items-center">
          <label
            htmlFor="upload"
            className="justify-self-end p-2 w-20 rounded transition-colors duration-300 border text-center text-[13px] cursor-pointer text-black/[0.8] hover:text-black hover:border-black/[0.3]"
          >
            Upload
          </label>
          <input
            type="file"
            id="upload"
            accept="application/epub+zip"
            className="hidden"
            onChange={handleFile}
          />
        </div>
        <span className="pl-3 text-[18px]" onClick={() => setIsInfoOpen(true)}>
          <AiOutlineInfoCircle />
        </span>
        {isInfoOpen && <Info handleModal={handleModal} />}
      </div>
    </header>
  );
}
