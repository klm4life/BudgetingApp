import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>login page</h1>} />
        <Route path="/registration" element={<h1>registration page</h1>} />
        <Route path="/home" element={<h1>home page</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
