import { useContext } from "react";
import { BookContext } from "../context/Context";
import Books from "../components/Books";
import Header from "../components/Header";
export default function Home() {
  const { isLoadedBooks } = useContext(BookContext);

  if (!isLoadedBooks) {
    return (
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center">
        <span className="spinner" />
      </div>
    );
  }
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col py-24 px-1 sm:px-4 sm:p-24 min-w-80 ">
        <Books />
      </main>
    </>
  );
}
