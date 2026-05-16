import { BrowserRouter, Routes, Route } from "react-router-dom";
import Library from "./pages/Library";
import TreeDetails from "./pages/TreeDetails";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Library />} />
        <Route path="/tree/:id" element={<TreeDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;