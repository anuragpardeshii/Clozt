import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./index.css";
import MainLayout from "./components/Layout/MainLayout";
import Home from "./components/home/Home";
import Help from "./components/Help/Help";
import About from "./components/About/About";
import Men from "./components/Products/Men/Men";
import Sale from "./components/Products/Sale/Sale";
import New from "./components/Products/New/New";
import Women from "./components/Products/Women/Women";
import Details from "./components/utils/Details/Details";
import Cart from "./components/utils/Cart/Cart";
import Wishlist from "./components/Wishlist/Wishlist";
import Addresses from "./components/utils/Addresses/Addresses";
import Order from "./components/utils/Orders/Order";
import Login from "./components/utils/Login/Login";
import Signup from "./components/utils/Signup/Signup";
import PageNotFound from "./components/utils/PageNotFound";
import "flowbite";
import ProductList from "./components/Products/ProductList";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";
import CloztLoader from './components/CloztLoader';
import { adminUrl } from './config/siteUrls';

function AdminRedirect() {
  const { pathname } = useLocation();
  const destinations = {
    "/admin/add-new-products": "products/new",
    "/admin/all-products": "products",
    "/admin/orders": "orders",
    "/admin/coupons": "coupons",
  };
  const destination = destinations[pathname] || "analytics";

  useEffect(() => {
    window.location.replace(new URL(destination, adminUrl.endsWith("/") ? adminUrl : `${adminUrl}/`).toString());
  }, [destination]);

  return <CloztLoader label="Opening admin dashboard" />;
}

function TrackStorefrontVisit() {
  const { user } = useAuth();
  const { pathname } = useLocation();
  useEffect(() => {
    if (user?.role === 'admin' || pathname.startsWith('/admin')) return undefined;
    let sessionId;
    try {
      sessionId = window.sessionStorage.getItem('clozt-visit-session');
      if (!sessionId) {
        sessionId = window.crypto.randomUUID();
        window.sessionStorage.setItem('clozt-visit-session', sessionId);
      }
    } catch { return undefined; }
    const apiUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
    const send = () => fetch(`${apiUrl}/api/analytics/visit`, {
      method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, path: pathname }), keepalive: true,
    }).catch(() => undefined);
    send();
    const interval = window.setInterval(send, 5 * 60 * 1000);
    return () => window.clearInterval(interval);
  }, [pathname, user?.role]);
  return null;
}

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isLoginOrSignup =
    location.pathname.startsWith("/login") || location.pathname.startsWith("/signup");

  return (
    <>
      {isAdminRoute ? (
        <Routes>
          <Route path="/admin-login" element={<Navigate to="/login" replace />} />
          <Route path="/admin-signup" element={<Navigate to="/signup" replace />} />
          <Route path="/admin/*" element={<AdminRedirect />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      ) : isLoginOrSignup ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<PageNotFound />} />
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
            <Route path="/order-summary" element={<Navigate to="/cart" replace />} />
            <Route path="/orders" element={<Order />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/addresses" element={<Addresses />} />
            <Route path="*" element={<PageNotFound />} />
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
        <TrackStorefrontVisit />
        <App />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default AppWrapper;
