import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import CloztLoader from '../components/CloztLoader';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    axios.get('/api/users/auth/check')
      .then(({ data }) => {
        if (active) setUser(data.loggedIn ? data.user : null);
      })
      .catch(() => {
        if (active) setUser(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  const login = useCallback((userData) => setUser(userData), []);
  const logout = useCallback(async () => {
    await axios.post('/api/users/logout');
    setUser(null);
  }, []);
  const value = useMemo(() => ({
    user,
    login,
    logout,
    loading,
    isAuthenticated: Boolean(user),
    isAdmin: user?.role === 'admin',
  }), [user, login, logout, loading]);

  return <AuthContext.Provider value={value}>{loading ? <main className="min-h-screen grid place-items-center"><CloztLoader label="Loading Clozt" /></main> : children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}

AuthProvider.propTypes = { children: PropTypes.node.isRequired };
