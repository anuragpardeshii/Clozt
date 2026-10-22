import { useState } from 'react';
import axios from 'axios';
import { ArrowRight } from 'lucide-react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import AuthShell from '../Auth/AuthShell';
import AuthField from '../Auth/AuthField';
import { loginErrors } from '../Auth/authValidation';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [touched, setTouched] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, login } = useAuth();
  const errors = loginErrors(form);
  const destination = (account) => {
    const requestedPath = location.state?.from;
    return typeof requestedPath === 'string' && requestedPath.startsWith('/') && !requestedPath.startsWith('//') && (!requestedPath.startsWith('/admin') || account.role === 'admin')
      ? requestedPath
      : '/';
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setTouched((current) => ({ ...current, [name]: true }));
    setMessage('');
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setTouched({ email: true, password: true });
    if (Object.values(errors).some(Boolean)) return;
    setLoading(true);
    setMessage('');
    try {
      const { data } = await axios.post('/api/users/login', { email: form.email.trim(), password: form.password }, { withCredentials: true });
      login(data.user);
      navigate(destination(data.user), { replace: true });
    } catch (error) {
      setMessage(error.response?.status === 401 ? 'Invalid email or password. Please try again.' : error.response?.data?.message || 'Sign in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (user) return <Navigate to={destination(user)} replace />;

  return <AuthShell eyebrow="Clozt / Your account" title="Welcome back." description="Sign in to keep your favourite pieces, orders, and addresses close." footer={<>New to Clozt? <Link to="/signup" className="font-semibold text-[#254b3d] underline underline-offset-4 hover:text-[#202320]">Create an account</Link></>}>
    {location.state?.registered && <p role="status" className="mb-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-medium text-emerald-800">Account created. Sign in to continue.</p>}
    <form onSubmit={handleLogin} noValidate className="space-y-5">
      <AuthField name="email" label="Email address" type="email" value={form.email} onChange={handleChange} error={touched.email ? errors.email : ''} placeholder="you@example.com" autoComplete="email" />
      <AuthField name="password" label="Password" type="password" value={form.password} onChange={handleChange} error={touched.password ? errors.password : ''} placeholder="Enter your password" autoComplete="current-password" />
      {message && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">{message}</p>}
      <button type="submit" disabled={loading} className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#202320] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#365044] disabled:cursor-not-allowed disabled:opacity-60">{loading ? 'Signing in…' : 'Sign in'}{!loading && <ArrowRight size={16} aria-hidden="true" />}</button>
    </form>
  </AuthShell>;
}
