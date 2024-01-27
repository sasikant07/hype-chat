import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Messenger from "./components/Messenger";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Messenger />} />
        <Route path="/messenger/login" element={<Login />} />
        <Route path="/messenger/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
