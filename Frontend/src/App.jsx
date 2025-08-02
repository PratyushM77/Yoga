import "./App.css";
import Home from "./Components/Home";
import Login from "./Components/Login";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Register from "./Components/Register";
import Navbar from "./Components/Navbar";
import Publishsession from "./Components/Publishsession";
import Mysessions from "./Components/Mysessions";
import Draft from "./Components/Draft";
import EditDraft from "./Components/EditDraft";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/sessions" element={<Home />} />

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/publishsession" element={<Publishsession />} />
        <Route path="/mysessions" element={<Mysessions />} />
        <Route path="/draft" element={<Draft />} />

        <Route path="/draft/draftedit" element={<EditDraft />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
