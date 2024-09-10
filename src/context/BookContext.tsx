import { fetchStoreBooks } from "../utils/db";
import { Book } from "../constants/Book";
import React, { useState, useEffect } from "react";
import { BookContext } from "./Context";
interface Props {
  children: React.ReactNode;
}

export default function BookProvider({ children }: Props) {
  const [booksEffect, setBooksEffect] = useState<Book[] | null>([]);
  const [bookToRead, setBookToRead] = useState<Book | null>(null);
  const [sectionDisplay, setSectionDisplay] = useState<string | "">("");
  console.log("sectionDisplay: ", sectionDisplay);
  console.log("bookToRead: ", bookToRead);
  const [bookReader, setBookReader] = useState(null);
  const [isLoadedBooks, setIsLoadedBooks] = useState(false);
  const [tocDropdown, setTocDropdown] = useState<boolean | null>(false);
  const [themeDropdown, setThemeDropdown] = useState<boolean | null>(false);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const store = (await fetchStoreBooks()) as Book[];
        setBooksEffect([...store]);
        setIsLoadedBooks(true);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBooks();
  }, []);

  console.log("booksEffect: ", booksEffect);
  const handleReadingFile = (book: Book) => {
    setBookToRead(book);
  };

  return (
    <BookContext.Provider
      value={{
        bookToRead,
        setBookToRead,
        themeDropdown,
        tocDropdown,
        handleReadingFile,
        booksEffect,
        sectionDisplay,
        setSectionDisplay,
        bookReader,
        setThemeDropdown,
        setTocDropdown,
        setBookReader,
        setBooksEffect,
        isLoadedBooks,
        setIsLoadedBooks,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}
