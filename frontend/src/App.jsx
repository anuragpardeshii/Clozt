import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import React from "react";
import "./index.css";
import MainLayout from "./components/Layout/MainLayout";
import AdminDashboard from "./components/Admin/AdminDasbord";
import AdminLogin from "./components/Admin/Login/Signup/AdminLogin";
import AdminProtectedRoute from "./components/Admin/AdminProtectedRoute";
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
import Cart from "./components/comman/Cart/Cart";
import Wishlist from "./components/Wishlist/Wishlist";
import Order from "./components/comman/Orders/Order";
import Summary from "./components/comman/Summary/Summary";
import Login from "./components/comman/Login/Login";
import Signup from "./components/comman/Signup/Signup";
import "flowbite";
import AdminRegister from "./components/Admin/Login/Signup/AdminRegister";
import ProductList from "./components/Products/ProductList";
import { AuthProvider, useAuth } from "./context/AuthContext";

function App() {
  const { user, login, logout, loading } = useAuth();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isLoginOrSignup =
    location.pathname.startsWith("/login") || location.pathname.startsWith("/signup");

  return (
    <>
      {isAdminRoute ? (
        <Routes>
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-signup" element={<AdminRegister/>}></Route>
          <Route
            path="/admin/*"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />
        </Routes>
      ) : isLoginOrSignup ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      ) : (
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/customer-care" element={<Help />} />
            <Route path="/about" element={<About />} />
            <Route path="/men" element={<Men />} />
            <Route path="/women" element={<Women />} />
            <Route path="/new-arrival" element={<New />} />
            <Route path="/sale" element={<Sale />} />
            <Route path="/:listing/:category" element={<ProductList/>} />
            <Route path="/product/:id" element={<Details />} />
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
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default AppWrapper;