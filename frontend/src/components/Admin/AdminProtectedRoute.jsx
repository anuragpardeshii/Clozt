import { Link, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import PropTypes from 'prop-types';

export default function AdminProtectedRoute({ children }) {
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  if (!isAdmin) {
    return (
      <div className="max-w-xl mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold">Access denied</h1>
        <p className="mt-2">Your account does not have admin access.</p>
        <Link to="/" className="text-blue-600 underline">Return home</Link>
      </div>
    );
  }
  return children;
}

AdminProtectedRoute.propTypes = { children: PropTypes.node.isRequired };
