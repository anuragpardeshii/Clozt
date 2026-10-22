import { useState } from 'react';
import type { FormEvent } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth';
import CloztLoader from '../components/CloztLoader';

export default function Login() {
  const { user, loading, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const requestedPath = location.state?.from;
  const destination = typeof requestedPath === 'string' && requestedPath.startsWith('/') && !requestedPath.startsWith('//') && requestedPath !== '/login'
    ? requestedPath
    : '/products';

  if (loading) return <main className="centered"><CloztLoader label="Checking your session" /></main>;
  if (user) return <Navigate to={destination} replace />;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(email, password);
      navigate(destination, { replace: true });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not sign in.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="centered login-page grid min-h-screen place-items-center">
      <div className="panel login-panel">
        <div className="login-mark" aria-hidden="true">C</div>
        <p className="eyebrow">CLOZT ADMIN STUDIO</p>
        <h1>Welcome back.</h1>
        <p>Sign in to manage your collection, orders, and storefront.</p>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <label>Email<input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
          <label>Password<span className="password-input"><input type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required /><button type="button" className="password-toggle" onClick={() => setShowPassword((current) => !current)} aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword}>{showPassword ? 'Hide' : 'Show'}</button></span></label>
          {error && <p className="error" role="alert">{error}</p>}
          <button type="submit" disabled={submitting}>{submitting ? 'Signing in…' : 'Sign in'}</button>
        </form>
        <a className="login-store-link" href={import.meta.env.VITE_STOREFRONT_URL || 'http://localhost:5173/'}>← Return to storefront</a>
      </div>
    </main>
  );
}
