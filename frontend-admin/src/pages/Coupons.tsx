import { useEffect, useState, type FormEvent } from 'react';
import { api } from '../api';
import CloztLoader from '../components/CloztLoader';
import type { Coupon, CouponInput } from '../types';

type CouponForm = {
  code: string;
  kind: 'percent' | 'fixed';
  value: string;
  minimumSpend: string;
  maxDiscount: string;
  expiresAt: string;
  active: boolean;
};

const emptyForm: CouponForm = {
  code: '', kind: 'percent', value: '', minimumSpend: '0', maxDiscount: '', expiresAt: '', active: true,
};

const couponToForm = (coupon: Coupon): CouponForm => ({
  code: coupon.code,
  kind: coupon.kind,
  value: String(coupon.value),
  minimumSpend: String(coupon.minimumSpend),
  maxDiscount: coupon.maxDiscount == null ? '' : String(coupon.maxDiscount),
  expiresAt: coupon.expiresAt.slice(0, 10),
  active: coupon.active,
});

export default function Coupons() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [form, setForm] = useState<CouponForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    let active = true;
    api.coupons()
      .then(({ coupons: items }) => { if (active) setCoupons(items); })
      .catch((cause: Error) => { if (active) setError(cause.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const saveCoupon = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setSaving(true);
    try {
      const input: CouponInput = {
        code: form.code.trim().toUpperCase(),
        kind: form.kind,
        value: Number(form.value),
        minimumSpend: Number(form.minimumSpend),
        maxDiscount: form.maxDiscount ? Number(form.maxDiscount) : null,
        expiresAt: new Date(`${form.expiresAt}T23:59:59.999`).toISOString(),
        active: form.active,
      };
      const { coupon } = editingId
        ? await api.updateCoupon(editingId, input)
        : await api.createCoupon(input);
      setCoupons((items) => editingId
        ? items.map((item) => item._id === editingId ? coupon : item)
        : [coupon, ...items]);
      setMessage(editingId ? 'Coupon updated.' : 'Coupon created.');
      setEditingId(null);
      setForm(emptyForm);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not save coupon.');
    } finally {
      setSaving(false);
    }
  };

  const deleteCoupon = async (coupon: Coupon) => {
    if (!window.confirm(`Delete coupon ${coupon.code}?`)) return;
    setError('');
    try {
      await api.deleteCoupon(coupon._id);
      setCoupons((items) => items.filter((item) => item._id !== coupon._id));
      if (editingId === coupon._id) { setEditingId(null); setForm(emptyForm); }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not delete coupon.');
    }
  };

  const toggleCoupon = async (coupon: Coupon) => {
    setError('');
    try {
      const { coupon: updated } = await api.updateCoupon(coupon._id, { ...coupon, active: !coupon.active });
      setCoupons((items) => items.map((item) => item._id === updated._id ? updated : item));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not update coupon.');
    }
  };

  return (
    <main className="page">
      <div className="page-heading flex items-end justify-between gap-6"><div><p className="eyebrow">COMMERCE / PROMOTIONS</p><h1>Coupons</h1><p>Create considered offers and manage their availability.</p></div><span className="heading-count">{coupons.length} total</span></div>
      {error && <p className="error" role="alert">{error}</p>}
      {message && <p className="mb-5 text-sm text-emerald-700" role="status">{message}</p>}
      <form onSubmit={saveCoupon} className="panel mb-6 max-w-4xl">
        <div className="mb-5 flex items-center justify-between gap-4"><h2 className="mb-0 text-lg font-semibold">{editingId ? 'Edit coupon' : 'New coupon'}</h2>{editingId && <button type="button" className="subtle" onClick={() => { setEditingId(null); setForm(emptyForm); }}>Cancel edit</button>}</div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <label>Code<input value={form.code} onChange={(event) => setForm({ ...form, code: event.target.value.toUpperCase() })} placeholder="WELCOME20" minLength={3} maxLength={24} required /></label>
          <label>Discount type<select value={form.kind} onChange={(event) => setForm({ ...form, kind: event.target.value as CouponForm['kind'] })} className="min-h-[43px] rounded-lg border border-[#dce3dc] bg-white px-3 text-sm"><option value="percent">Percentage</option><option value="fixed">Fixed amount</option></select></label>
          <label>{form.kind === 'percent' ? 'Percentage off' : 'Amount off (₹)'}<input type="number" min="0.01" max={form.kind === 'percent' ? 100 : undefined} step="0.01" value={form.value} onChange={(event) => setForm({ ...form, value: event.target.value })} required /></label>
          <label>Minimum bag value (₹)<input type="number" min="0" step="0.01" value={form.minimumSpend} onChange={(event) => setForm({ ...form, minimumSpend: event.target.value })} required /></label>
          <label>Maximum discount (₹, optional)<input type="number" min="0.01" step="0.01" value={form.maxDiscount} onChange={(event) => setForm({ ...form, maxDiscount: event.target.value })} /></label>
          <label>Expires on<input type="date" value={form.expiresAt} onChange={(event) => setForm({ ...form, expiresAt: event.target.value })} required /></label>
        </div>
        <label className="mt-5 flex items-center gap-2"><input type="checkbox" checked={form.active} onChange={(event) => setForm({ ...form, active: event.target.checked })} /> Active</label>
        <div className="mt-6 flex justify-end"><button type="submit" disabled={saving}>{saving ? 'Saving…' : editingId ? 'Save changes' : 'Create coupon'}</button></div>
      </form>
      <div className="panel catalog-panel">
        {loading ? <CloztLoader label="Loading coupons" /> : coupons.length === 0 ? <p className="empty">No coupons yet.</p> : (
          <div className="table-wrap"><table><thead><tr><th>Code</th><th>Offer</th><th>Minimum</th><th>Expires</th><th>Status</th><th>Actions</th></tr></thead><tbody>{coupons.map((coupon) => {
            const expired = new Date(coupon.expiresAt) <= new Date();
            return <tr key={coupon._id}>
              <td><strong>{coupon.code}</strong></td>
              <td>{coupon.kind === 'percent' ? `${coupon.value}% off` : `₹${coupon.value.toLocaleString()} off`}{coupon.maxDiscount != null ? ` · up to ₹${coupon.maxDiscount.toLocaleString()}` : ''}</td>
              <td>₹{coupon.minimumSpend.toLocaleString()}</td>
              <td>{new Date(coupon.expiresAt).toLocaleDateString()}</td>
              <td><span className="badge" data-status={expired || !coupon.active ? 'Cancelled' : 'Processing'}>{expired ? 'Expired' : coupon.active ? 'Active' : 'Paused'}</span></td>
              <td><div className="actions flex items-center gap-3"><button type="button" className="subtle" onClick={() => { setEditingId(coupon._id); setForm(couponToForm(coupon)); window.scrollTo(0, 0); }}>Edit</button><button type="button" className="subtle" onClick={() => toggleCoupon(coupon)}>{coupon.active ? 'Pause' : 'Activate'}</button><button type="button" className="danger-link" onClick={() => deleteCoupon(coupon)}>Delete</button></div></td>
            </tr>;
          })}</tbody></table></div>
        )}
      </div>
    </main>
  );
}
