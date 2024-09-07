// import Books from "@/components/Books";
// import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { BookContext } from "../context/Context";
import Books from "../components/Books";
export default function Home() {
  const [books, setBooks] = useState([]);
  console.log("books: ", books);

  const { isLoadedBooks } = useContext(BookContext);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("/api/books");
        console.log("response: ", response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBooks(data.books);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooks();
  }, []);
  return (
    <>
      {/* <Header /> */}
      <main className="flex min-h-screen flex-col py-24 px-1 sm:px-4 sm:p-24 min-w-80 ">
        <Books />
      </main>
    </>
  );
}
