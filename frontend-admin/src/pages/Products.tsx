import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import type { Product } from '../types';
import Pagination from '../components/Pagination';
import CloztLoader from '../components/CloztLoader';

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [revision, setRevision] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const timeout = window.setTimeout(() => { setDebouncedSearch(search.trim()); setPage(1); }, 250);
    return () => window.clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    api.productsPage(page, debouncedSearch)
      .then((result) => { if (active) { setProducts(result.products); setTotal(result.total); setPages(result.pages); } })
      .catch((cause: Error) => { if (active) setError(cause.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [page, debouncedSearch, revision]);

  const deleteProduct = async (product: Product) => {
    if (!window.confirm(`Delete ${product.title}?`)) return;
    setError('');
    setDeletingId(product._id);
    try {
      await api.deleteProduct(product._id);
      if (products.length === 1 && page > 1) setPage(page - 1);
      else setRevision((value) => value + 1);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not delete product.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="page">
      <div className="page-heading flex items-end justify-between gap-6">
        <div><p className="eyebrow">CATALOG / INVENTORY</p><h1>Products</h1><p>Keep your collection considered and up to date.</p></div>
        <Link className="button" to="/products/new"><span aria-hidden="true">＋</span> New product</Link>
      </div>
      <div className="panel catalog-panel">
        <div className="toolbar flex items-end justify-between gap-4">
          <label className="search-label">Search collection<input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Name, category, or color" /></label>
          <span className="result-count">{total} product{total === 1 ? '' : 's'}</span>
        </div>
        {error && <p className="error" role="alert">{error}</p>}
        {loading ? <CloztLoader label="Loading products" /> : products.length === 0 ? <p className="empty">No products found.</p> : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>Product</th><th>Category</th><th>Listing</th><th>Price</th><th>Sale</th><th>Actions</th></tr></thead>
              <tbody>{products.map((product) => (
                <tr key={product._id}>
                  <td><div className="product-cell flex items-center gap-3">{product.images?.[0] ? <img src={product.images[0]} alt="" /> : <span className="image-placeholder" />}<div><strong>{product.title}</strong><small>{product.color} · {product.gender}</small></div></div></td>
                  <td><span className="category-label">{product.category || '—'}</span></td>
                  <td><span className="listing-label">{(product.listings ?? []).filter((item) => item !== 'N/A').join(', ') || '—'}</span></td>
                  <td>₹{product.price.toLocaleString()}</td>
                  <td>{product.salePrice != null ? `₹${product.salePrice.toLocaleString()}${product.discount ? ` (${product.discount}% off)` : ''}` : '—'}</td>
                  <td><div className="actions flex items-center gap-4"><Link to={`/products/${product._id}/edit`}>Edit</Link><button type="button" className="danger-link" disabled={deletingId === product._id} onClick={() => deleteProduct(product)}>Delete</button></div></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
        <Pagination page={page} pages={pages} onChange={setPage} />
      </div>
    </main>
  );
}
