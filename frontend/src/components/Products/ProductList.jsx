import { useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import HomeProductCard from '../home/HomeProductCard';
import useProductActions from './useProductActions';
import useInfiniteProducts from './useInfiniteProducts';
import CloztLoader from '../CloztLoader';

const categories = [
  { slug: 'all', label: 'All products' },
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
  const [searchParams] = useSearchParams();
  const search = (searchParams.get('search') || '').trim();
  const navigate = useNavigate();
  const actions = useProductActions();
  const [sortOrder, setSortOrder] = useState('featured');
  const { products, total, loading, loadingMore, hasMore, error, sentinelRef, retry } = useInfiniteProducts(
    `/api/products/${encodeURIComponent(listing)}/${encodeURIComponent(category)}`,
    { search, sort: sortOrder },
  );
  const categoryName = categories.find((item) => item.slug === category)?.label || category;
  const collectionName = collections.find((item) => item.slug === listing)?.label || listing;
  const changeRoute = (nextListing, nextCategory) => navigate(`/${nextListing}/${nextCategory}${search ? `?search=${encodeURIComponent(search)}` : ''}`);

  return <main className="min-h-screen bg-[#f7f7f4] text-[#202320]">
    <div className="mx-auto max-w-7xl px-4 py-10">
      <nav className="mb-7 flex flex-wrap items-center gap-2 text-xs text-stone-500" aria-label="Breadcrumb"><Link to="/" className="hover:text-[#202320]">Home</Link><span aria-hidden="true">/</span><span className="font-semibold text-[#202320]">{search ? `Search for “${search}”` : `${collectionName} / ${categoryName}`}</span></nav>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5 border-b border-stone-200 pb-6"><div><p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">Clozt / Collection</p><h1 className="mt-2 text-3xl font-semibold">{search ? `Results for “${search}”` : `${collectionName} · ${categoryName}`}</h1><p className="mt-2 text-sm text-stone-500">{loading ? 'Finding pieces…' : `${total} ${total === 1 ? 'piece' : 'pieces'}`}</p></div><div className="flex flex-wrap gap-3"><label className="grid gap-1 text-[11px] font-semibold uppercase tracking-wide text-stone-500">Collection<select value={listing} onChange={(event) => changeRoute(event.target.value, category)} className="min-w-32 rounded-lg border border-stone-300 bg-white px-3 py-2 text-xs font-medium text-[#202320] focus:border-[#202320] focus:outline-none">{collections.map((item) => <option key={item.slug} value={item.slug}>{item.label}</option>)}</select></label><label className="grid gap-1 text-[11px] font-semibold uppercase tracking-wide text-stone-500">Category<select value={category} onChange={(event) => changeRoute(listing, event.target.value)} className="min-w-32 rounded-lg border border-stone-300 bg-white px-3 py-2 text-xs font-medium text-[#202320] focus:border-[#202320] focus:outline-none">{categories.map((item) => <option key={item.slug} value={item.slug}>{item.label}</option>)}</select></label><label className="grid gap-1 text-[11px] font-semibold uppercase tracking-wide text-stone-500">Sort by<select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)} className="min-w-40 rounded-lg border border-stone-300 bg-white px-3 py-2 text-xs font-medium text-[#202320] focus:border-[#202320] focus:outline-none"><option value="featured">Featured</option><option value="newest">Newest</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option></select></label></div></div>
      {loading ? <CloztLoader label="Loading products" /> : !products.length && !error ? <div className="rounded-xl border border-stone-200 bg-white px-6 py-16 text-center"><h2 className="text-lg font-semibold">No pieces found</h2><p className="mt-2 text-sm text-stone-500">Try another search, collection, or category.</p></div> : <>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">{products.map((product) => <HomeProductCard key={product._id} product={product} actions={actions} />)}</div>
        {error && <div role="alert" className="mt-8 rounded-xl border border-red-200 bg-red-50 px-5 py-5 text-sm text-red-700">{error} <button type="button" onClick={retry} className="ml-2 font-semibold underline">Try again</button></div>}
        {loadingMore && <div role="status" className="py-8 text-center text-xs text-stone-500">Loading more pieces…</div>}
        {hasMore && !error && <div ref={sentinelRef} aria-hidden="true" className="h-px" />}
      </>}
    </div>
  </main>;
}
