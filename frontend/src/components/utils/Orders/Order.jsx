import { useEffect, useState } from 'react';
import axios from 'axios';
import { ArrowUpRight, Package, ShoppingBag } from 'lucide-react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import AccountPageHeader from '../AccountPageHeader';
import CloztLoader from '../../CloztLoader';

const stages = ['Pending', 'Processing', 'Packed', 'Dispatched', 'Shipped', 'Out for Delivery', 'Delivered'];
const formatPrice = (amount) => `₹${new Intl.NumberFormat('en-IN').format(Number(amount) || 0)}`;

export default function Order() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) return undefined;
    const controller = new AbortController();
    axios.get('/api/orders', { signal: controller.signal, withCredentials: true })
      .then(({ data }) => setOrders(Array.isArray(data.orders) ? data.orders : []))
      .catch((requestError) => { if (!axios.isCancel(requestError)) setError('Could not load your orders. Please try again.'); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [isAuthenticated]);

  if (!isAuthenticated) return <Navigate to="/login" state={{ from: '/orders' }} replace />;

  const totalSpent = orders.filter((order) => !['Cancelled', 'Refunded'].includes(order.status)).reduce((total, order) => total + (Number(order.totalAmount) || 0), 0);

  return <main className="min-h-screen bg-[#f7f7f4] text-[#202320]">
    <AccountPageHeader eyebrow="Clozt / Your account" title="Your orders" description="Every piece, from your bag to your door." badge={`${orders.length} ${orders.length === 1 ? 'order' : 'orders'}`} />
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-10">
      <section aria-label="Order history">
        <div className="mb-5 flex items-end justify-between gap-4"><div><p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">Your history</p><h2 className="mt-1 text-xl font-semibold">Recent orders</h2></div><Link to="/" className="inline-flex items-center gap-1 text-xs font-medium text-stone-600 hover:text-[#202320]">Continue shopping <ArrowUpRight size={14} aria-hidden="true" /></Link></div>
        {location.state?.placed && <p role="status" className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-medium text-emerald-800">Your order was placed successfully. We will update its progress here.</p>}
        {error && <p role="alert" className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700">{error}</p>}
        {loading ? <CloztLoader label="Loading orders" /> : !error && !orders.length ? <div className="rounded-xl border border-stone-200 bg-white px-6 py-16 text-center"><Package size={36} className="mx-auto text-stone-400" aria-hidden="true" /><h2 className="mt-4 text-lg font-semibold">No orders yet</h2><p className="mt-2 text-sm text-stone-500">Once you place an order, you can follow its progress here.</p><Link to="/" className="mt-6 inline-flex rounded-full bg-[#202320] px-6 py-3 text-xs font-semibold text-white hover:bg-stone-700">Explore the collection</Link></div> : <div className="space-y-5">{orders.map((order) => {
          const statusIndex = order.status === 'Paid' ? 0 : stages.indexOf(order.status);
          const latestUpdate = order.statusHistory?.[order.statusHistory.length - 1];
          const address = order.shippingAddress;
          return <article key={order._id} className="overflow-hidden rounded-xl border border-stone-200 bg-white transition-colors hover:border-stone-300">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-stone-100 px-5 py-4 sm:px-6"><div><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-400">Order · {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p><h3 className="mt-1 break-all text-sm font-semibold">#{order._id}</h3></div><span className={`rounded-full px-3 py-1.5 text-[11px] font-semibold ${['Cancelled', 'Refunded'].includes(order.status) ? 'bg-stone-100 text-stone-600' : order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-800' : 'bg-[#edf2ed] text-[#254b3d]'}`}>{order.status}</span></div>
            <div className="px-5 py-5 sm:px-6">
              {statusIndex >= 0 && <div aria-label={`Order progress: ${order.status}`}><div className="grid grid-cols-7 gap-1.5">{stages.map((stage, index) => <span key={stage} className={`h-1.5 rounded-full ${index <= statusIndex ? 'bg-[#254b3d]' : 'bg-stone-200'}`} />)}</div><div className="mt-2 flex justify-between text-[10px] font-medium text-stone-500"><span>Placed</span><span>{order.status === 'Delivered' ? 'Delivered' : `Current: ${order.status}`}</span></div></div>}
              <div className="mt-5 space-y-3">{(order.items || []).map((item, index) => {
                const productId = typeof item.product === 'string' ? item.product : item.product?._id;
                return <div key={item._id || `${productId}-${index}`} className="flex gap-4"><div className="h-20 w-16 shrink-0 overflow-hidden rounded-md bg-[#f4f4f1]">{item.image ? <img src={item.image} alt={item.name || 'Ordered item'} className="h-full w-full object-contain" /> : <span className="flex h-full items-center justify-center text-[10px] text-stone-400">No image</span>}</div><div className="min-w-0 flex-1">{productId ? <Link to={`/product/${productId}`} className="line-clamp-2 text-sm font-semibold hover:underline">{item.name || 'Unavailable product'}</Link> : <p className="line-clamp-2 text-sm font-semibold">{item.name || 'Unavailable product'}</p>}<p className="mt-1 text-xs text-stone-500">{item.size ? `Size ${item.size} · ` : ''}Qty {item.quantity}</p><p className="mt-2 text-xs font-semibold">{formatPrice(item.price * item.quantity)}</p></div></div>;
              })}</div>
              <div className="mt-5 grid gap-4 border-t border-stone-100 pt-4 text-xs sm:grid-cols-2"><div><p className="font-semibold">Delivery address</p><p className="mt-1 leading-5 text-stone-600">{address ? `${address.address}, ${address.city}, ${address.state} ${address.postalCode}, ${address.country}` : 'Address unavailable'}</p></div><div><p className="font-semibold">Payment & updates</p><p className="mt-1 leading-5 text-stone-600">{order.paymentMethod || 'Payment method unavailable'}{latestUpdate ? ` · Updated ${new Date(latestUpdate.changedAt).toLocaleDateString('en-IN')}` : ''}{order.trackingNumber ? ` · Tracking ${order.trackingNumber}` : ''}</p></div></div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 bg-[#fbfbf9] px-5 py-4 text-xs sm:px-6"><span className="text-stone-500">{order.couponCode ? `Coupon ${order.couponCode} saved ${formatPrice(order.discountAmount)}` : `${(order.items || []).length} ${order.items?.length === 1 ? 'item' : 'items'}`}</span><strong className="text-sm">Total {formatPrice(order.totalAmount)}</strong></div>
          </article>;
        })}</div>}
      </section>
      <aside className="h-fit rounded-xl border border-stone-200 bg-white p-6"><p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">Your account</p><h2 className="mt-3 text-lg font-semibold">All in one place.</h2><p className="mt-2 text-sm leading-6 text-stone-600">Review order status and keep your delivery details up to date.</p><div className="mt-6 flex items-center justify-between border-t border-stone-100 pt-5 text-xs"><span className="text-stone-500">Order value</span><strong>{formatPrice(totalSpent)}</strong></div><Link to="/addresses" className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-[#202320] px-5 py-3 text-xs font-semibold hover:bg-[#202320] hover:text-white">Manage addresses</Link><Link to="/cart" className="mt-3 inline-flex w-full items-center justify-center gap-2 text-xs font-semibold text-stone-600 hover:text-[#202320]"><ShoppingBag size={15} aria-hidden="true" /> Return to bag</Link></aside>
    </div>
  </main>;
}
