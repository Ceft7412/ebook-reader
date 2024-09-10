import { createContext } from "react";
import { Book } from "../constants/Book";
type Context = {
  bookToRead: Book | null;
  isLoadedBooks: boolean;
  booksEffect: Book[] | null;
  bookReader: any;
  tocDropdown: boolean | null;
  themeDropdown: boolean | null;
  sectionDisplay: string | "";
  setSectionDisplay: (section: string) => void;
  setTocDropdown: (isOpen: boolean) => void;
  setThemeDropdown: (isOpen: boolean) => void;
  setBookReader: (book: any) => void;
  handleReadingFile: (book: Book) => void;
  setBooksEffect: (books: Book[] | null) => void;
  setBookToRead: (book: Book | null) => void;
  setIsLoadedBooks: (isLoaded: boolean) => void;
};
const initialState: Context = {
  bookToRead: null,
  bookReader: null,
  tocDropdown: null,
  themeDropdown: null,
  isLoadedBooks: false,
  sectionDisplay: "",
  setSectionDisplay: () => {},
  setThemeDropdown: () => {},
  setBookReader: () => {},
  setTocDropdown: () => {},
  booksEffect: [],
  handleReadingFile: () => {},
  setBookToRead: () => {},
  setBooksEffect: () => {},
  setIsLoadedBooks: () => {},
};
export const BookContext = createContext<Context>(initialState);
