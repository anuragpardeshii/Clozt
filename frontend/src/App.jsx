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
import Cart from "./components/comman/Cart/Cart";
import Wishlist from "./components/Wishlist/Wishlist";
import Order from "./components/comman/Orders/Order";
import Summary from "./components/comman/Summary/Summary";
import Login from "./components/comman/Login/Login";
import Signup from "./components/comman/Signup/Signup";
import Navbar2 from "./components/comman/Navbar/Navbar2";

import axios from "axios";
import { useEffect, useState } from "react";
import MainLayout from "./components/Layout/MainLayout";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/user", { withCredentials: true })
      .then((response) => setUser(response.data.user))
      .catch(() => setUser(null));
  }, []);

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isLogin = location.pathname.startsWith("/Login");
  const isSignup = location.pathname.startsWith("/signup");

  return (
    <>
      {isAdminRoute || isSignup || isLogin ? (
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/newProduct" element={<NewProduct />} />
          <Route path="/admin/allProducts" element={<AllProducts />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
      ) : (
        <MainLayout user={user} setUser={setUser}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/customer-care" element={<Help />} />
            <Route path="/about" element={<About />} />
            <Route path="/men" element={<Men />} />
            <Route path="/women" element={<Women />} />
            <Route path="/new-arrival" element={<New />} />
            <Route path="/sale" element={<Sale />} />
            <Route path="/details" element={<Details />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order-summary" element={<Summary />} />
            <Route path="/orders" element={<Order />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
        </MainLayout>
      )}
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
