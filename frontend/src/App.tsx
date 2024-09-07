import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NextTopLoader from "nextjs-toploader";
import Homepage from "./screens/Homepage";
import Reader from "./screens/Reader";
import BookProvider from "./context/BookContext";

export default function App() {
  return (
    <BookProvider>
      <Router>
        <NextTopLoader />
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="reader" element={<Reader />} />
        </Routes>
      </Router>
    </BookProvider>
  );
}
