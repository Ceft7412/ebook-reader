import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NextTopLoader from "nextjs-toploader";
import Homepage from "./screens/Homepage";
import Reader from "./screens/Reader";
import BookProvider from "./context/BookContext";
import ReaderProvider from "./context/ReaderContext";

export default function App() {
  return (
    <BookProvider>
      <ReaderProvider>
        <Router>
          <NextTopLoader />
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="reader/:title/:id" element={<Reader />} />
          </Routes>
        </Router>
      </ReaderProvider>
    </BookProvider>
  );
}
