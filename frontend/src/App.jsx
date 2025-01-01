import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./index.css";
import Navbar from "./components/comman/Navbar/Navbar";
import Footer from "./components/comman/Footer/Footer";
import Home from "./components/home/Home";
import Admin from "./components/Admin/Admin";
import Help from "./components/Help/Help";
import About from "./components/About/About";
import Men from "./components/Products/Men/Men";
import Sale from "./components/Products/Sale/Sale";
import New from "./components/Products/New/New";
import Women from "./components/Products/Women/Women";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname === "/admin";

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/customer-care" element={<Help/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/men" element={<Men/>} />
        <Route path="/women" element={<Women/>} />
        <Route path="/new-arrival" element={<New/>} />
        <Route path="/sale" element={<Sale/>} />
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
