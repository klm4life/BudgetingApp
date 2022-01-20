import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Registration from "./pages/Registration";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<Registration />} />
        <Route path="/home" element={<h1>home page</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
