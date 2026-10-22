import { useEffect, useState } from 'react';
import { api } from '../api';
import type { Customer } from '../types';
import Pagination from '../components/Pagination';
import CloztLoader from '../components/CloztLoader';

const formatDate = (value?: string) => value ? new Date(value).toLocaleString('en-IN') : '—';

export default function Users() {
  const [users, setUsers] = useState<Customer[]>([]);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const timeout = window.setTimeout(() => { setDebouncedSearch(search.trim()); setPage(1); }, 250);
    return () => window.clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    api.users(page, debouncedSearch)
      .then((result) => { if (active) { setUsers(result.users); setTotal(result.total); setPages(result.pages); } })
      .catch((cause: Error) => { if (active) setError(cause.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [page, debouncedSearch]);

  return <main className="page">
    <div className="page-heading"><p className="eyebrow">AUDIENCE / CUSTOMERS</p><h1>Users</h1><p>Customer accounts and recent activity.</p></div>
    <div className="panel catalog-panel">
      <div className="toolbar flex items-end justify-between gap-4"><label className="search-label">Search users<input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Name or email" /></label><span className="result-count">{total} customers</span></div>
      {error && <p className="error" role="alert">{error}</p>}
      {loading ? <CloztLoader label="Loading users" /> : users.length === 0 ? <p className="empty">No users found.</p> : <div className="table-wrap"><table><thead><tr><th>User</th><th>Joined</th><th>Last sign-in</th><th>Last active</th></tr></thead><tbody>{users.map((user) => <tr key={user._id}><td><strong>{user.username}</strong><small>{user.email}</small></td><td>{formatDate(user.createdAt)}</td><td>{formatDate(user.lastLoginAt)}</td><td>{formatDate(user.lastActiveAt)}</td></tr>)}</tbody></table></div>}
      <Pagination page={page} pages={pages} onChange={setPage} />
    </div>
  </main>;
}
