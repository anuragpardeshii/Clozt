import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Admin() {
  const { user, logout } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch {
      setError('Could not sign out. Please try again.');
    }
  };

  return (
    <>
      <header className="border-b bg-white p-4 flex justify-between items-center">
        <Link to="/admin/all-products" className="font-bold text-xl">CLOZT Admin</Link>
        <div className="flex items-center gap-4">
          <span>{user.username}</span>
          <button type="button" onClick={handleLogout} className="text-red-600">Sign out</button>
        </div>
      </header>
      {error && <p role="alert" className="text-red-600 text-center">{error}</p>}
      <nav aria-label="Admin navigation" className="flex flex-wrap gap-4 border-b p-4">
        <Link to="/admin/all-products">All Products</Link>
        <Link to="/admin/add-new-products">Add New Product</Link>
        <Link to="/admin/orders">All Orders</Link>
        <Link to="/">Storefront</Link>
      </nav>
    </>
  );
}
