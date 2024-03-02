import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Messenger from "./components/Messenger";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/messenger/login" element={<Login />} />
        <Route path="/messenger/register" element={<Register />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="" element={<Messenger />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
