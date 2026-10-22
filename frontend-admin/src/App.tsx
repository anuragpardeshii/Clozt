import { NavLink, Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from './auth';
import Login from './pages/Login';
import Products from './pages/Products';
import ProductEditor from './pages/ProductEditor';
import Orders from './pages/Orders';
import Coupons from './pages/Coupons';
import Analytics from './pages/Analytics';
import Users from './pages/Users';
import CloztLoader from './components/CloztLoader';
import { storefrontUrl } from './siteUrls';

function AdminLayout() {
  const { user, loading, logout } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  if (loading) return <main className="centered"><CloztLoader label="Checking your session" /></main>;
  if (!user) return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  if (user.role !== 'admin') {
    return (
      <main className="centered">
        <div className="panel narrow">
          <h1>Access denied</h1>
          <p>Your account does not have admin access.</p>
          {error && <p className="error" role="alert">{error}</p>}
          <button type="button" onClick={() => logout().catch((cause: Error) => setError(cause.message))}>Sign out</button>
          <a href={storefrontUrl}>Return to storefront</a>
        </div>
      </main>
    );
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login', { replace: true });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not sign out.');
    }
  };

  return (
    <div className="app-shell grid min-h-screen">
      <aside className="sidebar sticky top-0 flex h-screen flex-col">
        <div className="brand flex items-center gap-3"><span className="brand-mark" aria-hidden="true">C</span><span>CLOZT<small>ADMIN STUDIO</small></span></div>
        <p className="nav-label">WORKSPACE</p>
        <nav className="grid gap-1" aria-label="Admin navigation">
          <NavLink to="/analytics">Analytics</NavLink>
          <NavLink to="/products" end>Products</NavLink>
          <NavLink to="/products/new">Add product</NavLink>
          <NavLink to="/orders">Orders</NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/coupons">Coupons</NavLink>
        </nav>
        <div className="sidebar-bottom mt-auto grid gap-3">
          <div className="account flex items-center gap-3"><span className="account-avatar" aria-hidden="true">{user.username?.charAt(0).toUpperCase() || 'A'}</span><p>{user.username}<small>{user.email}</small></p></div>
          <button type="button" className="subtle" onClick={handleLogout}>Sign out <span aria-hidden="true">↗</span></button>
        </div>
      </aside>
      <div className="workspace min-w-0">
        <header className="workspace-header flex items-center justify-between"><span>Workspace <span className="header-divider">/</span> Admin</span><div className="flex items-center gap-5"><a href={storefrontUrl}>View storefront <span aria-hidden="true">↗</span></a><button type="button" className="subtle mobile-signout" onClick={handleLogout}>Sign out</button></div></header>
        {error && <p className="error" role="alert">{error}</p>}
        <Outlet />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Navigate to="/analytics" replace />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/new" element={<ProductEditor />} />
        <Route path="/products/:id/edit" element={<ProductEditor />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/users" element={<Users />} />
        <Route path="/coupons" element={<Coupons />} />
        <Route path="/admin" element={<Navigate to="/analytics" replace />} />
        <Route path="/admin/all-products" element={<Navigate to="/products" replace />} />
        <Route path="/admin/add-new-products" element={<Navigate to="/products/new" replace />} />
        <Route path="/admin/orders" element={<Navigate to="/orders" replace />} />
        <Route path="/admin/users" element={<Navigate to="/users" replace />} />
        <Route path="/admin/coupons" element={<Navigate to="/coupons" replace />} />
        <Route path="/admin/analytics" element={<Navigate to="/analytics" replace />} />
      </Route>
      <Route path="*" element={<Navigate to="/analytics" replace />} />
    </Routes>
  );
}
