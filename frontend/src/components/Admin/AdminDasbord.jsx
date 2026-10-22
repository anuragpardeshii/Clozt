import { Routes, Route, Navigate } from "react-router-dom";
import Admin from "./Admin";
import AllProducts from "./AllProducts";
import NewProduct from "./NewProduct";
import AdminOrders from "./AdminOrders";
import "flowbite";

export default function AdminDashboard() {
  return (
    <div>
      <Admin />
      <Routes>
        <Route index element={<Navigate to="all-products" replace />} />
        <Route path="all-products" element={<AllProducts />} />
        <Route path="add-new-products" element={<NewProduct />} />
        <Route path="orders" element={<AdminOrders />} />
      </Routes>
    </div>
  );
}
