import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import HomeProductCard from '../home/HomeProductCard';
import useProductActions from './useProductActions';
import CloztLoader from '../CloztLoader';

const categories = [
  { slug: 'top', label: 'T-shirts' },
  { slug: 'shirts', label: 'Shirts' },
  { slug: 'denim', label: 'Denim' },
  { slug: 'winter-wear', label: 'Winter wear' },
];
const collections = [
  { slug: 'all', label: 'All' },
  { slug: 'men', label: 'Men' },
  { slug: 'women', label: 'Women' },
  { slug: 'new-arrival', label: 'New arrivals' },
  { slug: 'sale', label: 'Sale' },
];

export default function ProductList() {
  const { listing, category } = useParams();
  const navigate = useNavigate();
  const actions = useProductActions();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortOrder, setSortOrder] = useState('featured');
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError('');
    setProducts([]);
    setVisibleCount(12);
    axios.get(`/api/products/${encodeURIComponent(listing)}/${encodeURIComponent(category)}`, { signal: controller.signal })
      .then(({ data }) => setProducts(Array.isArray(data) ? data : []))
      .catch((requestError) => { if (!axios.isCancel(requestError)) setError(requestError.response?.data?.message || 'Could not load this collection.'); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [listing, category]);

  const sortedProducts = useMemo(() => {
    const result = [...products];
    const price = (product) => product.listings?.includes('Sale') && product.salePrice != null ? product.salePrice : product.price;
    if (sortOrder === 'price-asc') result.sort((first, second) => price(first) - price(second));
    if (sortOrder === 'price-desc') result.sort((first, second) => price(second) - price(first));
    if (sortOrder === 'newest') result.sort((first, second) => new Date(second.createdAt) - new Date(first.createdAt));
    return result;
  }, [products, sortOrder]);

  const categoryName = categories.find((item) => item.slug === category)?.label || category;
  const collectionName = collections.find((item) => item.slug === listing)?.label || listing;

  return <main className="min-h-screen bg-[#f7f7f4] text-[#202320]">
    <div className="mx-auto max-w-7xl px-4 py-10">
      <nav className="mb-7 flex flex-wrap items-center gap-2 text-xs text-stone-500" aria-label="Breadcrumb"><Link to="/" className="hover:text-[#202320]">Home</Link><span aria-hidden="true">/</span><Link to={listing === 'all' ? '/' : `/${listing}`} className="hover:text-[#202320]">{collectionName}</Link><span aria-hidden="true">/</span><span className="font-semibold text-[#202320]">{categoryName}</span></nav>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5 border-b border-stone-200 pb-6"><div><p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">Clozt / Collection</p><h1 className="mt-2 text-3xl font-semibold">{collectionName} · {categoryName}</h1><p className="mt-2 text-sm text-stone-500">{loading ? 'Finding pieces…' : `${sortedProducts.length} ${sortedProducts.length === 1 ? 'piece' : 'pieces'}`}</p></div><div className="flex flex-wrap gap-3"><label className="grid gap-1 text-[11px] font-semibold uppercase tracking-wide text-stone-500">Collection<select value={listing} onChange={(event) => navigate(`/${event.target.value}/${category}`)} className="min-w-32 rounded-lg border border-stone-300 bg-white px-3 py-2 text-xs font-medium text-[#202320] focus:border-[#202320] focus:outline-none">{collections.map((item) => <option key={item.slug} value={item.slug}>{item.label}</option>)}</select></label><label className="grid gap-1 text-[11px] font-semibold uppercase tracking-wide text-stone-500">Category<select value={category} onChange={(event) => navigate(`/${listing}/${event.target.value}`)} className="min-w-32 rounded-lg border border-stone-300 bg-white px-3 py-2 text-xs font-medium text-[#202320] focus:border-[#202320] focus:outline-none">{categories.map((item) => <option key={item.slug} value={item.slug}>{item.label}</option>)}</select></label><label className="grid gap-1 text-[11px] font-semibold uppercase tracking-wide text-stone-500">Sort by<select value={sortOrder} onChange={(event) => { setSortOrder(event.target.value); setVisibleCount(12); }} className="min-w-40 rounded-lg border border-stone-300 bg-white px-3 py-2 text-xs font-medium text-[#202320] focus:border-[#202320] focus:outline-none"><option value="featured">Featured</option><option value="newest">Newest</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option></select></label></div></div>
      {loading ? <CloztLoader label="Loading products" /> : error ? <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-5 py-8 text-sm text-red-700">{error}</div> : sortedProducts.length === 0 ? <div className="rounded-xl border border-stone-200 bg-white px-6 py-16 text-center"><h2 className="text-lg font-semibold">No pieces found</h2><p className="mt-2 text-sm text-stone-500">Try a different collection or category.</p></div> : <><div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-6">{sortedProducts.slice(0, visibleCount).map((product) => <HomeProductCard key={product._id} product={product} actions={actions} />)}</div>{visibleCount < sortedProducts.length && <div className="py-10 text-center"><button type="button" onClick={() => setVisibleCount((count) => count + 12)} className="rounded-full border border-[#202320] px-6 py-2.5 text-xs font-semibold hover:bg-[#202320] hover:text-white">Load more</button></div>}</>}
    </div>
  </main>;
}
