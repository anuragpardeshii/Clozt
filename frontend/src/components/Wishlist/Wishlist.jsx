import { useEffect, useState } from 'react';
import axios from 'axios';
import { Heart, ShoppingBag, X } from 'lucide-react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { notifyShoppingChange } from '../utils/shoppingEvents';
import AccountPageHeader from '../utils/AccountPageHeader';
import CloztLoader from '../CloztLoader';

const formatPrice = (price) => `₹${new Intl.NumberFormat('en-IN').format(price)}`;

export default function Wishlist() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) return undefined;
    let active = true;
    axios.get('/api/wishlist', { withCredentials: true })
      .then(({ data }) => { if (active) setProducts(Array.isArray(data.wishlist?.products) ? data.wishlist.products : []); })
      .catch(() => { if (active) setError('Could not load your wishlist. Please try again.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [isAuthenticated]);

  if (!isAuthenticated) return <Navigate to="/login" state={{ from: '/wishlist' }} replace />;

  const removeProduct = async (productId) => {
    setBusyId(productId);
    setError('');
    try {
      const { data } = await axios.delete(`/api/wishlist/remove/${productId}`, { withCredentials: true });
      setProducts(Array.isArray(data.wishlist?.products) ? data.wishlist.products : []);
      notifyShoppingChange();
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Could not remove this item.');
    } finally {
      setBusyId(null);
    }
  };

  return <main className="min-h-screen bg-[#f7f7f4] text-[#202320]">
    <AccountPageHeader eyebrow="Clozt / Your collection" title="Your wishlist" description="Keep the pieces you love close until you are ready." badge={`${products.length} saved ${products.length === 1 ? 'piece' : 'pieces'}`} />
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-10">
      <section aria-label="Saved products">
        <div className="mb-5 flex items-end justify-between gap-4"><div><p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">Your selection</p><h2 className="mt-1 text-xl font-semibold">Saved pieces</h2></div><Link to="/cart" className="inline-flex items-center gap-2 text-xs font-medium text-stone-600 hover:text-[#202320]"><ShoppingBag size={16} aria-hidden="true" /> View bag</Link></div>
        {error && <p role="alert" className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700">{error}</p>}
        {loading ? <CloztLoader label="Loading wishlist" /> : products.length ? <div className="space-y-4">{products.map((product, index) => <article key={product._id} className="relative flex gap-4 rounded-xl border border-stone-200 bg-white p-4 transition-colors hover:border-stone-300 sm:gap-6 sm:p-5">
          <Link to={`/product/${product._id}`} className="h-40 w-28 shrink-0 overflow-hidden rounded-md bg-[#f4f4f1] sm:h-44 sm:w-32">{product.images?.[0] ? <img src={product.images[0]} alt={product.title} className="h-full w-full object-contain" /> : <span className="flex h-full items-center justify-center text-xs text-stone-400">No image</span>}</Link>
          <div className="min-w-0 flex-1 pr-6"><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-400">Saved piece {String(index + 1).padStart(2, '0')}</p><Link to={`/product/${product._id}`} className="mt-1 block line-clamp-2 text-sm font-semibold hover:underline">{product.title}</Link><p className="mt-3 text-sm font-semibold">{formatPrice(product.price)}</p><p className="mt-2 text-xs text-stone-500">Choose your size on the product page before adding to bag.</p><button type="button" onClick={() => navigate(`/product/${product._id}`, { state: { promptForSize: true } })} className="mt-5 inline-flex rounded-full bg-[#202320] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-stone-700">Select size</button></div>
          <button type="button" onClick={() => removeProduct(product._id)} disabled={busyId === product._id} aria-label={`Remove ${product.title} from wishlist`} className="absolute right-4 top-4 rounded-full p-1.5 text-stone-500 hover:bg-stone-100 hover:text-[#202320] disabled:opacity-50"><X size={17} aria-hidden="true" /></button>
        </article>)}</div> : <div className="rounded-xl border border-stone-200 bg-white px-6 py-16 text-center"><Heart size={36} className="mx-auto text-stone-400" aria-hidden="true" /><h2 className="mt-4 text-lg font-semibold">Your wishlist is empty</h2><p className="mt-2 text-sm text-stone-500">Explore the collection and save what catches your eye.</p><Link to="/" className="mt-6 inline-flex rounded-full bg-[#202320] px-6 py-3 text-xs font-semibold text-white hover:bg-stone-700">Continue shopping</Link></div>}
      </section>
      <aside className="h-fit rounded-xl border border-stone-200 bg-white p-6"><p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">A little reminder</p><h2 className="mt-3 text-lg font-semibold">Ready when you are.</h2><p className="mt-2 text-sm leading-6 text-stone-600">Saved pieces stay here until you remove them. Select an available size to add one to your bag.</p><Link to="/cart" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#202320] px-5 py-3 text-xs font-semibold hover:bg-[#202320] hover:text-white"><ShoppingBag size={15} aria-hidden="true" /> Go to your bag</Link></aside>
    </div>
  </main>;
}
