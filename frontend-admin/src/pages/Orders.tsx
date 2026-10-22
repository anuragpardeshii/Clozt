import { useEffect, useState } from 'react';
import { api } from '../api';
import type { Order } from '../types';
import Pagination from '../components/Pagination';
import CloztLoader from '../components/CloztLoader';

const statuses = ['Pending', 'Paid', 'Processing', 'Packed', 'Dispatched', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled', 'Refunded'];

function availableStatuses(status: string, paymentMethod?: string) {
  if (['Cancelled', 'Refunded'].includes(status)) return [];
  const forward = statuses.slice(statuses.indexOf(status) + 1, 8).filter((next) => next !== 'Paid' || paymentMethod !== 'Cash on Delivery');
  if (status !== 'Delivered') forward.push('Cancelled');
  if (status === 'Delivered' && paymentMethod !== 'Cash on Delivery') forward.push('Refunded');
  return forward;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState('');
  const [savingId, setSavingId] = useState<string | null>(null);
  const [nextStatuses, setNextStatuses] = useState<Record<string, string>>({});
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    api.orders(page, filter)
      .then(({ orders: items, total: count, pages: pageCount }) => { if (active) { setOrders(items); setTotal(count); setPages(pageCount); } })
      .catch((cause: Error) => { if (active) setError(cause.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [page, filter, revision]);

  const saveStatus = async (order: Order) => {
    const status = nextStatuses[order._id];
    if (!status) return;
    setError('');
    setSavingId(order._id);
    try {
      const { order: updated } = await api.updateOrderStatus(order._id, status);
      if (filter && updated.status !== filter) {
        if (orders.length === 1 && page > 1) setPage(page - 1);
        else setRevision((value) => value + 1);
      } else setOrders((items) => items.map((item) => item._id === order._id ? updated : item));
      setNextStatuses((value) => ({ ...value, [order._id]: '' }));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not update order.');
    } finally {
      setSavingId(null);
    }
  };

  return (
    <main className="page">
      <div className="page-heading flex items-end justify-between gap-6"><div><p className="eyebrow">COMMERCE / FULFILLMENT</p><h1>Orders</h1><p>A clear view of every customer order.</p></div><span className="heading-count">{total} total</span></div>
      <label className="order-filter">Status <select value={filter} onChange={(event) => { setFilter(event.target.value); setPage(1); }}><option value="">All orders</option>{statuses.map((status) => <option key={status}>{status}</option>)}</select></label>
      {error && <p className="error" role="alert">{error}</p>}
      {loading ? <CloztLoader label="Loading orders" /> : orders.length === 0 ? <div className="panel empty">No orders found.</div> : (
        <div className="order-list grid gap-4">{orders.map((order) => (
          <article className="panel order-card" key={order._id}>
            <div className="order-top flex items-center justify-between gap-4"><div><strong>Order {order._id}</strong><small>{new Date(order.createdAt).toLocaleString()}</small></div><span className="badge" data-status={order.status}>{order.status}</span></div>
            <div className="order-grid">
              <div><h2>Customer</h2><p>{order.user?.username || 'Deleted user'}</p><small>{order.user?.email}</small></div>
              <div><h2>Items</h2>{order.items.map((item, index) => <p key={item._id || index}>{item.name || 'Unavailable product'}{item.size ? ` · Size ${item.size}` : ''} × {item.quantity} · ₹{item.price.toLocaleString()}</p>)}</div>
              <div><h2>Shipping</h2>{order.shippingAddress ? <p>{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p> : <p>Address unavailable</p>}</div>
            </div>
            <div className="order-footer flex items-center justify-between gap-4"><span>{order.paymentMethod || 'Payment method unavailable'}{order.couponCode ? ` · Coupon ${order.couponCode} saved ₹${(order.discountAmount || 0).toLocaleString()}` : ''}</span><strong>Total ₹{order.totalAmount.toLocaleString()}</strong></div>
            <div className="order-status-editor"><label>Update status <select value={nextStatuses[order._id] || ''} onChange={(event) => setNextStatuses((value) => ({ ...value, [order._id]: event.target.value }))} disabled={savingId === order._id}><option value="">Select next status</option>{availableStatuses(order.status, order.paymentMethod).map((status) => <option key={status} value={status}>{status}</option>)}</select></label><button type="button" disabled={!nextStatuses[order._id] || savingId === order._id} onClick={() => saveStatus(order)}>{savingId === order._id ? 'Saving…' : 'Save status'}</button></div>
            {!!order.statusHistory?.length && <details className="order-history"><summary>Status history</summary>{order.statusHistory.map((entry, index) => <p key={`${entry.changedAt}-${index}`}>{entry.status} · {new Date(entry.changedAt).toLocaleString()}</p>)}</details>}
          </article>
        ))}</div>
      )}
      <Pagination page={page} pages={pages} onChange={setPage} />
    </main>
  );
}
