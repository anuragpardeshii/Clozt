import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import React, { useState } from "react";
import "./index.css";
import MainLayout from "./components/Layout/MainLayout";
import AdminDashboard from "./components/Admin/AdminDasbord";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminProtectedRoute from "./components/Admin/AdminProtectedRoute";
import "flowbite";
import AdminRegister from "./components/Admin/AdminRegister";

function App() {
  const [user, setUser] = useState(null);
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
              <AdminProtectedRoute> {/* 🔒 Protect All Admin Routes */}
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />
        </Routes>
      ) : isLoginOrSignup ? (
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
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