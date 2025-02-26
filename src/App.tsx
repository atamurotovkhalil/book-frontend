import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import AllBook from "./component/AllBook";
import BookDetail from "./component/BookDetail";
import CreateBook from "./component/CreateBook";
import Navbar from "./component/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/allbooks" element={<AllBook />} />
          <Route path="/bookdetail/:id" element={<BookDetail />} />
          <Route path="/createbook" element={<CreateBook />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
