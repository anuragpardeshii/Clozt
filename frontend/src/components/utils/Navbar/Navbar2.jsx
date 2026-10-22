import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { User, Heart, ShoppingCart, Search, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { SHOPPING_CHANGED_EVENT } from '../shoppingEvents';
import { adminUrl } from '../../../config/siteUrls';

export default function Navbar2() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [logoutError, setLogoutError] = useState('');
  const [shoppingCounts, setShoppingCounts] = useState({ cart: 0, wishlist: 0 });
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setSearchQuery(new URLSearchParams(location.search).get('search') || '');
    setSearchOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

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

  const handleSearch = (event) => {
    event.preventDefault();
    const query = searchQuery.trim();
    if (!query) {
      searchInputRef.current?.focus();
      return;
    }
    setSearchOpen(false);
    navigate(`/all/all?search=${encodeURIComponent(query)}`);
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
          <button type="button" aria-label={searchOpen ? 'Close product search' : 'Search products'} aria-expanded={searchOpen} aria-controls={searchOpen ? 'navbar-product-search' : undefined} onClick={() => setSearchOpen((current) => !current)} className="inline-flex p-1 text-[#202320] transition-colors hover:text-[#64776a]">{searchOpen ? <X size="1.3rem" aria-hidden="true" /> : <Search size="1.3rem" aria-hidden="true" />}</button>
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
      {searchOpen && <div id="navbar-product-search" className="absolute inset-x-0 top-full border-t border-stone-100 bg-white px-4 py-4 shadow-lg"><form onSubmit={handleSearch} role="search" className="mx-auto flex max-w-2xl items-center gap-3 rounded-full border border-stone-300 bg-[#f7f7f4] px-4 py-2 focus-within:border-[#254b3d]"><Search size={18} className="shrink-0 text-stone-500" aria-hidden="true" /><input ref={searchInputRef} type="search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} onKeyDown={(event) => { if (event.key === 'Escape') setSearchOpen(false); }} maxLength={80} aria-label="Search products" placeholder="Search pieces, colours, categories…" className="min-w-0 flex-1 border-0 bg-transparent text-sm text-[#202320] outline-none placeholder:text-stone-400" /><button type="submit" className="rounded-full bg-[#202320] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#365044]">Search</button></form></div>}
      {logoutError && <p role="alert" className="text-center text-red-600">{logoutError}</p>}
    </header>
  );
}
