import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./index.css";
import Navbar from "./components/comman/Navbar/Navbar";
import Footer from "./components/comman/Footer/Footer";
import Home from "./components/home/Home";
import Admin from "./components/Admin/Admin";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname === "/admin";

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;
