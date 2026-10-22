import { useEffect, useState } from 'react';
import axios from 'axios';
import { User, Heart, ShoppingCart } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { SHOPPING_CHANGED_EVENT } from '../shoppingEvents';

const adminUrl = import.meta.env.VITE_ADMIN_URL || 'http://localhost:5174/';

export default function Navbar2() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [logoutError, setLogoutError] = useState('');
  const [shoppingCounts, setShoppingCounts] = useState({ cart: 0, wishlist: 0 });
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      setShoppingCounts({ cart: 0, wishlist: 0 });
      return undefined;
    }

    let active = true;
    let requestSequence = 0;
    const refreshCounts = async () => {
      const requestId = ++requestSequence;
      const [cartResult, wishlistResult] = await Promise.allSettled([
        axios.get('/api/cart', { withCredentials: true }),
        axios.get('/api/wishlist', { withCredentials: true }),
      ]);
      if (!active || requestId !== requestSequence) return;
      setShoppingCounts((current) => ({
        cart: cartResult.status === 'fulfilled'
          ? (cartResult.value.data.products ?? []).reduce((total, item) => total + item.quantity, 0)
          : current.cart,
        wishlist: wishlistResult.status === 'fulfilled'
          ? (wishlistResult.value.data.wishlist?.products ?? []).length
          : current.wishlist,
      }));
    };

    refreshCounts();
    window.addEventListener(SHOPPING_CHANGED_EVENT, refreshCounts);
    return () => {
      active = false;
      window.removeEventListener(SHOPPING_CHANGED_EVENT, refreshCounts);
    };
  }, [isAuthenticated, user?._id, location.pathname]);

  useEffect(() => {
    const closeDropdown = (event) => {
      if (!event.target.closest('.profile-dropdown')) setProfileOpen(false);
    };
    document.addEventListener('click', closeDropdown);
    return () => document.removeEventListener('click', closeDropdown);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setProfileOpen(false);
      navigate('/');
    } catch {
      setLogoutError('Could not sign out. Please try again.');
    }
  };

  return (
    <header className="w-full bg-white sticky top-0 z-50 shadow-sm">
      <nav className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="text-2xl font-bold text-gray-800">CLOZT</Link>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/men">Men</Link>
          <Link to="/women">Women</Link>
          <Link to="/new-arrival">New Arrival</Link>
          <Link to="/sale">Sale</Link>
        </div>
        <div className="flex items-center gap-4">
          {isAdmin && <a href={adminUrl} className="text-sm font-semibold text-gray-800">Admin</a>}
          <div className="relative profile-dropdown">
            <button type="button" aria-label="Account menu" aria-expanded={profileOpen} onClick={() => setProfileOpen(!profileOpen)}>
              <User size="1.3rem" />
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                {isAuthenticated ? (
                  <>
                    <p className="px-4 py-2 text-sm text-gray-500">{user.username}</p>
                    <Link to="/orders" onClick={() => setProfileOpen(false)} className="block px-4 py-2 hover:bg-gray-100">Orders</Link>
                    <Link to="/addresses" onClick={() => setProfileOpen(false)} className="block px-4 py-2 hover:bg-gray-100">Addresses</Link>
                    {isAdmin && <a href={adminUrl} onClick={() => setProfileOpen(false)} className="block px-4 py-2 hover:bg-gray-100">Admin dashboard</a>}
                    <button type="button" onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
                  </>
                ) : (
                  <Link to="/login" onClick={() => setProfileOpen(false)} className="block px-4 py-2 hover:bg-gray-100">Login</Link>
                )}
              </div>
            )}
          </div>
          <Link to="/wishlist" aria-label={`Wishlist, ${shoppingCounts.wishlist} items`} className="relative inline-flex p-1">
            <Heart size="1.3rem" aria-hidden="true" />
            {shoppingCounts.wishlist > 0 && <span aria-hidden="true" className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#202320] px-1 text-[10px] font-semibold leading-none tabular-nums text-white">{shoppingCounts.wishlist}</span>}
          </Link>
          <Link to="/cart" aria-label={`Cart, ${shoppingCounts.cart} items`} className="relative inline-flex p-1">
            <ShoppingCart size="1.3rem" aria-hidden="true" />
            {shoppingCounts.cart > 0 && <span aria-hidden="true" className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#202320] px-1 text-[10px] font-semibold leading-none tabular-nums text-white">{shoppingCounts.cart}</span>}
          </Link>
        </div>
      </nav>
      {logoutError && <p role="alert" className="text-center text-red-600">{logoutError}</p>}
    </header>
  );
}
