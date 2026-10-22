import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../api';
import type { Product } from '../types';
import CloztLoader from '../components/CloztLoader';

const standardSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

type ProductDraft = {
  title: string;
  description: string;
  price: string;
  salePrice: string;
  color: string;
  gender: string;
  category: string;
  listings: string[];
  sizes: Record<string, number>;
};

function makeDraft(product?: Product): ProductDraft {
  const categoryAliases: Record<string, string> = { top: 'Top', 't-shirt': 'Top', 't-shirts': 'Top', tshirt: 'Top', shirt: 'Shirts', shirts: 'Shirts', denim: 'Denim', winter: 'Winter Wear', 'winter wear': 'Winter Wear' };
  const category = product?.category?.trim().toLowerCase();
  return {
    title: product?.title || '',
    description: product?.description || '',
    price: product ? String(product.price) : '',
    salePrice: product?.salePrice != null ? String(product.salePrice) : '',
    color: product?.color || '',
    gender: product?.gender?.toLowerCase() === 'male' ? 'Male' : product?.gender?.toLowerCase() === 'female' ? 'Female' : '',
    category: category ? categoryAliases[category] || '' : '',
    listings: product?.listings?.filter((listing) => listing !== 'N/A') || [],
    sizes: { ...Object.fromEntries(standardSizes.map((size) => [size, 0])), ...product?.sizes },
  };
}

function ProductForm({ product }: { product?: Product }) {
  const [draft, setDraft] = useState<ProductDraft>(() => makeDraft(product));
  const [existingImages, setExistingImages] = useState<string[]>(product?.images || []);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const onSale = draft.listings.includes('Sale');
  const discount = onSale && Number(draft.price) > 0 && Number(draft.salePrice) > 0
    ? Math.round((1 - Number(draft.salePrice) / Number(draft.price)) * 100)
    : 0;

  const toggleListing = (listing: string) => {
    setDraft((current) => ({
      ...current,
      listings: current.listings.includes(listing)
        ? current.listings.filter((item) => item !== listing)
        : [...current.listings, listing],
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    const price = Number(draft.price);
    const salePrice = Number(draft.salePrice);
    if (!Number.isFinite(price) || price <= 0) {
      setError('Enter a valid price greater than zero.');
      return;
    }
    if (onSale && (!Number.isFinite(salePrice) || salePrice <= 0 || salePrice >= price)) {
      setError('Sale price must be greater than zero and below the regular price.');
      return;
    }
    if (existingImages.length + files.length === 0) {
      setError('Add at least one product image.');
      return;
    }

    const form = new FormData();
    form.append('title', draft.title.trim());
    form.append('description', draft.description.trim());
    form.append('price', String(price));
    form.append('color', draft.color.trim());
    form.append('gender', draft.gender.trim());
    form.append('category', draft.category.trim());
    form.append('listings', JSON.stringify(draft.listings.length ? draft.listings : ['N/A']));
    form.append('sizes', JSON.stringify(draft.sizes));
    if (product) form.append('existingImages', JSON.stringify(existingImages));
    if (onSale) {
      form.append('salePrice', String(salePrice));
      form.append('discount', String(discount));
    } else if (product) {
      form.append('salePrice', '');
      form.append('discount', '');
    }
    files.forEach((file) => form.append('images', file));

    setSubmitting(true);
    try {
      if (product) await api.updateProduct(product._id, form);
      else await api.createProduct(form);
      navigate('/products', { replace: true });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not save product.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="page">
      <div className="page-heading flex items-end justify-between gap-6"><div><p className="eyebrow">CATALOG / PRODUCT</p><h1>{product ? 'Edit product' : 'Add product'}</h1><p>{product ? `Update ${product.title}` : 'Create a new storefront listing.'}</p></div><Link className="text-link" to="/products">← All products</Link></div>
      <form className="panel product-form" onSubmit={handleSubmit}>
        {error && <p className="error" role="alert">{error}</p>}
        <div className="form-grid grid">
          <label className="span-2">Title<input value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} required /></label>
          <label className="span-2">Description<textarea rows={4} value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} required /></label>
          <label>Gender<select value={draft.gender} onChange={(event) => setDraft({ ...draft, gender: event.target.value })} required><option value="" disabled>Select gender</option><option value="Male">Male</option><option value="Female">Female</option></select></label>
          <label>Category<select value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value })} required><option value="" disabled>Select category</option><option value="Top">T-shirts / tops</option><option value="Shirts">Shirts</option><option value="Denim">Denim</option><option value="Winter Wear">Winter wear</option></select></label>
          <label>Color<input value={draft.color} onChange={(event) => setDraft({ ...draft, color: event.target.value })} required /></label>
          <label>Price (₹)<input type="number" min="0.01" step="0.01" value={draft.price} onChange={(event) => setDraft({ ...draft, price: event.target.value })} required /></label>
          <fieldset className="span-2"><legend>Listings</legend><div className="checkbox-row">{['New Arrivals', 'Sale'].map((listing) => <label key={listing}><input type="checkbox" checked={draft.listings.includes(listing)} onChange={() => toggleListing(listing)} />{listing}</label>)}</div></fieldset>
          {onSale && <label>Sale price (₹)<input type="number" min="0.01" step="0.01" value={draft.salePrice} onChange={(event) => setDraft({ ...draft, salePrice: event.target.value })} required /><small>{discount > 0 ? `${discount}% off` : 'Must be below regular price'}</small></label>}
          <fieldset className="span-2"><legend>Available sizes</legend><div className="sizes-grid">{Object.entries(draft.sizes).map(([size, quantity]) => <label key={size}>{size}<input type="number" min="0" step="1" value={quantity} onChange={(event) => setDraft((current) => ({ ...current, sizes: { ...current.sizes, [size]: Number(event.target.value) } }))} /></label>)}</div></fieldset>
          <div className="span-2 image-section"><label htmlFor="product-images">Images</label><input id="product-images" type="file" accept="image/*" multiple onChange={(event) => setFiles(Array.from(event.target.files || []))} />
            {existingImages.length > 0 && <div className="image-grid">{existingImages.map((image, index) => <div className="image-tile" key={`${image}-${index}`}><img src={image} alt={`Product image ${index + 1}`} /><button type="button" className="subtle" onClick={() => setExistingImages((images) => images.filter((_, imageIndex) => imageIndex !== index))}>Remove</button></div>)}</div>}
            {files.length > 0 && <p className="file-list">New: {files.map((file) => file.name).join(', ')}</p>}
          </div>
        </div>
        <div className="form-actions flex justify-end gap-3"><Link className="button secondary" to="/products">Cancel</Link><button type="submit" disabled={submitting}>{submitting ? 'Saving…' : product ? 'Save changes' : 'Add product'}</button></div>
      </form>
    </main>
  );
}

export default function ProductEditor() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState('');

  useEffect(() => {
    setProduct(null);
    setError('');
    if (!id) {
      setLoading(false);
      return;
    }
    setLoading(true);
    let active = true;
    api.product(id)
      .then((selected) => { if (active) setProduct(selected); })
      .catch((cause: Error) => { if (active) setError(cause.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);

  if (loading) return <main className="page"><CloztLoader label="Loading product" /></main>;
  if (error) return <main className="page"><p className="error" role="alert">{error}</p><Link to="/products">Back to products</Link></main>;
  return <ProductForm key={product?._id || 'new'} product={product || undefined} />;
}
