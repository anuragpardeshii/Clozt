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
import Details from "./components/comman/Details/Details";
import NewProduct from "./components/Admin/NewProduct";
import AllProducts from "./components/Admin/AllProducts";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");


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
        <Route path="/details" element={<Details/>} />
        <Route path="/admin/newProduct" element={<NewProduct/>} />
        <Route path="/admin/allProducts" element={<AllProducts/>} />
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
