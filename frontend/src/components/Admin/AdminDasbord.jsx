import { Routes, Route } from "react-router-dom";
import Admin from "./Admin";
import AllProducts from "./AllProducts";
import NewProduct from "./NewProduct";
import "flowbite";

export default function AdminDashboard() {
  return (
    <div>
      <Admin /> {/* Sidebar/Header */}
      <Routes>
        <Route path="all-products" element={<AllProducts />} />
        <Route path="add-new-products" element={<NewProduct />} />
      </Routes>
    </div>
  );
}
