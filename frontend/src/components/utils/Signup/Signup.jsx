import { useState } from 'react';
import axios from 'axios';
import { ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AuthShell from '../Auth/AuthShell';
import AuthField from '../Auth/AuthField';
import { signupErrors } from '../Auth/authValidation';

const fields = [
  { name: 'username', label: 'Full name', type: 'text', placeholder: 'Your name', autoComplete: 'name', maxLength: 60 },
  { name: 'email', label: 'Email address', type: 'email', placeholder: 'you@example.com', autoComplete: 'email' },
  { name: 'mobile', label: 'Mobile number', type: 'tel', placeholder: '10-digit mobile number', autoComplete: 'tel', maxLength: 10 },
  { name: 'password', label: 'Password', type: 'password', placeholder: 'Create a password', autoComplete: 'new-password' },
  { name: 'confirmPassword', label: 'Confirm password', type: 'password', placeholder: 'Repeat your password', autoComplete: 'new-password' },
];

export default function Signup() {
  const [form, setForm] = useState({ username: '', email: '', mobile: '', password: '', confirmPassword: '' });
  const [touched, setTouched] = useState({});
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const errors = signupErrors(form);

  const handleChange = (event) => {
    const { name } = event.target;
    const value = name === 'mobile' ? event.target.value.replace(/\D/g, '').slice(0, 10) : event.target.value;
    setForm((current) => ({ ...current, [name]: value }));
    setTouched((current) => ({ ...current, [name]: true }));
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setTouched(Object.fromEntries(fields.map(({ name }) => [name, true])));
    if (Object.values(errors).some(Boolean)) return;
    setSubmitting(true);
    setError('');
    try {
      await axios.post('/api/users/register', {
        username: form.username.trim(),
        email: form.email.trim().toLowerCase(),
        mobile: form.mobile,
        password: form.password,
      });
      navigate('/login', { state: { registered: true }, replace: true });
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Could not create your account. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return <AuthShell eyebrow="Clozt / Join us" title="Make it yours." description="Create an account for saved favourites, a smoother checkout, and all your orders in one place." footer={<>Already have an account? <Link to="/login" className="font-semibold text-[#254b3d] underline underline-offset-4 hover:text-[#202320]">Sign in</Link></>}>
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {fields.map((field) => <AuthField key={field.name} {...field} value={form[field.name]} onChange={handleChange} error={touched[field.name] ? errors[field.name] : ''} />)}
      <p className="text-[11px] leading-5 text-stone-500">Use at least 8 characters with a letter and a number for your password.</p>
      {error && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">{error}</p>}
      <button type="submit" disabled={submitting} className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#202320] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#365044] disabled:cursor-not-allowed disabled:opacity-60">{submitting ? 'Creating account…' : 'Create account'}{!submitting && <ArrowRight size={16} aria-hidden="true" />}</button>
    </form>
  </AuthShell>;
}
