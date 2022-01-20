import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Registration from "./pages/Registration";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>login page</h1>} />
        <Route path="/sign-up" element={<Registration />} />
        <Route path="/home" element={<h1>home page</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
