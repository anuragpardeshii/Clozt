import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({ username: '', email: '', mobile: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setSubmitting(true);
    try {
      await axios.post('/api/users/register', {
        username: form.username,
        email: form.email,
        mobile: form.mobile,
        password: form.password,
      });
      navigate('/login', { state: { registered: true }, replace: true });
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const fields = [
    { name: 'username', label: 'Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'mobile', label: 'Phone number', type: 'tel' },
    { name: 'password', label: 'Password', type: 'password' },
    { name: 'confirmPassword', label: 'Confirm password', type: 'password' },
  ];

  return (
    <main className="max-w-md mx-auto p-6 mt-12">
      <h1 className="text-2xl font-bold mb-6">Create account</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map(({ name, label, type }) => (
          <label key={name} className="block">
            <span className="block mb-1">{label}</span>
            <input
              name={name}
              type={type}
              value={form[name]}
              onChange={(event) => setForm({ ...form, [name]: event.target.value })}
              className="w-full border rounded p-2"
              required
            />
          </label>
        ))}
        {error && <p role="alert" className="text-red-600">{error}</p>}
        <button type="submit" disabled={submitting} className="bg-gray-800 text-white px-5 py-2 rounded disabled:opacity-50">
          {submitting ? 'Creating account...' : 'Sign up'}
        </button>
      </form>
      <p className="mt-4">Already have an account? <Link to="/login" className="text-blue-600 underline">Log in</Link></p>
    </main>
  );
}
