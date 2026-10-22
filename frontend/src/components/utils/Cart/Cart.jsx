import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { Heart, ShoppingBag, X } from "lucide-react";
import PriceDetails from "./PriceDetails";
import CouponModal from "./CouponModal";
import { useAuth } from "../../../context/AuthContext";
import { notifyShoppingChange } from "../shoppingEvents";
import CloztLoader from '../../CloztLoader';

const formatPrice = (amount) => `₹${new Intl.NumberFormat("en-IN").format(amount)}`;

export default function Cart() {
  const { isAuthenticated, loading } = useAuth();
  const [cart, setCart] = useState({ products: [] });
  const [catalog, setCatalog] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponOpen, setCouponOpen] = useState(false);
  const [step, setStep] = useState("bag");
  const [cartLoading, setCartLoading] = useState(true);
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      setCartLoading(false);
      return;
    }
    let active = true;
    axios.get("/api/cart", { withCredentials: true })
      .then(({ data }) => { if (active) setCart(data || { products: [] }); })
      .catch(() => { if (active) setActionError("Could not load your bag."); })
      .finally(() => { if (active) setCartLoading(false); });
    axios.get("/api/coupons", { withCredentials: true })
      .then(({ data }) => { if (active) setCoupons(data.coupons || []); })
      .catch(() => { if (active) setCoupons([]); });
    axios.get("/api/products")
      .then(({ data }) => { if (active) setCatalog(Array.isArray(data) ? data : []); })
      .catch(() => { if (active) setCatalog([]); });
    return () => { active = false; };
  }, [isAuthenticated]);

  useEffect(() => {
    if (!appliedCoupon?.code) return undefined;
    if (!cart.products.length) {
      setAppliedCoupon(null);
      return undefined;
    }
    let active = true;
    axios.post("/api/coupons/preview", { code: appliedCoupon.code }, { withCredentials: true })
      .then(({ data }) => { if (active) setAppliedCoupon(data); })
      .catch(() => {
        if (active) {
          setAppliedCoupon(null);
          setActionError("Your coupon no longer applies to this bag.");
        }
      });
    return () => { active = false; };
  }, [cart, appliedCoupon?.code]);

  const itemCount = cart.products.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.products.reduce((total, item) => {
    const price = item.product.listings?.includes("Sale") && item.product.salePrice != null
      ? item.product.salePrice : item.product.price;
    return total + price * item.quantity;
  }, 0);
  const relatedProducts = useMemo(() => {
    const bagProducts = cart.products.map((item) => item.product);
    const bagIds = new Set(bagProducts.map((product) => product._id));
    return catalog.filter((product) => !bagIds.has(product._id))
      .sort((first, second) => {
        const score = (product) => bagProducts.reduce((highest, item) => Math.max(highest,
          Number(product.category === item.category) * 2 + Number(product.gender === item.gender)), 0);
        return score(second) - score(first);
      })
      .slice(0, 6);
  }, [cart.products, catalog]);

  const closeCoupons = useCallback(() => setCouponOpen(false), []);
  const previewCoupon = useCallback(async (code) => {
    const { data } = await axios.post("/api/coupons/preview", { code }, { withCredentials: true });
    return data;
  }, []);

  const updateItem = async (path, body) => {
    setActionError("");
    try {
      const { data } = await axios.put(path, body, { withCredentials: true });
      setCart(data);
      notifyShoppingChange();
    } catch (error) {
      setActionError(error.response?.data?.message || "Could not update this item.");
    }
  };

  const removeItem = async (itemId) => {
    setActionError("");
    try {
      const { data } = await axios.delete(`/api/cart/remove/${itemId}`, { withCredentials: true });
      setCart(data.cart);
      notifyShoppingChange();
    } catch (error) {
      setActionError(error.response?.data?.message || "Could not remove this item.");
    }
  };

  const moveToWishlist = async (item) => {
    setActionError("");
    try {
      await axios.post("/api/wishlist/add", { productId: item.product._id }, { withCredentials: true });
      notifyShoppingChange();
      const { data } = await axios.delete(`/api/cart/remove/${item._id}`, { withCredentials: true });
      setCart(data.cart);
      notifyShoppingChange();
    } catch (error) {
      setActionError(error.response?.data?.message || "Could not move this item to your wishlist.");
    }
  };

  if (loading || cartLoading) return <main className="mx-auto max-w-6xl px-5 py-16"><CloztLoader label="Loading your bag" /></main>;
  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <main className="min-h-screen bg-[#f7f7f4] text-[#202320]">
      <div className="bg-[#202320] px-4 py-10 text-white sm:py-14">
        <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-400">Clozt / Checkout</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{step === "bag" ? "Your bag" : "Delivery details"}</h1>
            <p className="mt-3 text-sm text-stone-300">{step === "bag" ? "Review your pieces before they head your way." : "One last detail before we get your order ready."}</p>
          </div>
          <p className="rounded-full border border-white/25 px-4 py-2 text-xs text-stone-200">
            <span className="font-semibold text-white">{step === "bag" ? "01" : "02"} / 02</span>
            <span className="ml-3">{step === "bag" ? "Bag review" : "Delivery & confirmation"}</span>
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-10">
        <section aria-label="Bag items">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">Your selection</p>
              <h2 className="mt-1 text-xl font-semibold">{itemCount} {itemCount === 1 ? "piece" : "pieces"}</h2>
            </div>
            <Link to="/wishlist" className="inline-flex items-center gap-2 text-xs font-medium text-stone-600 transition-colors hover:text-[#202320]"><Heart size={16} aria-hidden="true" /> View wishlist</Link>
          </div>
          {actionError && <p role="alert" className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700">{actionError}</p>}

          {cart.products.length ? (
            <div className="space-y-4">
              {cart.products.map((item, index) => {
                const product = item.product;
                const price = product.listings?.includes("Sale") && product.salePrice != null ? product.salePrice : product.price;
                const sizes = Object.entries(product.sizes || {}).filter(([size, stock]) => Number(stock) > 0 || size === item.size);
                return (
                  <article key={item._id} className="relative flex gap-4 rounded-xl border border-stone-200 bg-white p-4 transition-colors hover:border-stone-300 sm:gap-6 sm:p-5">
                    <Link to={`/product/${product._id}`} className="h-40 w-28 shrink-0 overflow-hidden rounded-md bg-[#f4f4f1] sm:h-44 sm:w-32">
                      {product.images?.[0] ? <img src={product.images[0]} alt={product.title} className="h-full w-full object-contain" /> : <span className="flex h-full items-center justify-center text-xs text-gray-400">No image</span>}
                    </Link>
                    <div className="min-w-0 flex-1 pr-6">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-400">Piece {String(index + 1).padStart(2, "0")}</p>
                      <Link to={`/product/${product._id}`} className="mt-1 block line-clamp-2 text-sm font-semibold hover:underline">{product.title}</Link>
                      <p className="mt-1 text-xs text-stone-500">{product.category} · {product.color}</p>
                      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
                        <label className="inline-flex items-center gap-2 text-stone-500">Size
                          <select value={item.size || ""} onChange={(event) => updateItem(`/api/cart/size/${item._id}`, { size: event.target.value })} aria-label={`Size for ${product.title}`} className="rounded-full border border-stone-300 bg-white px-3 py-1.5 text-xs font-semibold text-[#202320] focus:border-[#202320] focus:outline-none">
                            {!item.size && <option value="" disabled>Choose</option>}
                            {sizes.map(([size]) => <option key={size} value={size}>{size}</option>)}
                          </select>
                        </label>
                        <div className="inline-flex items-center rounded-full border border-stone-300 font-semibold">
                          <button type="button" onClick={() => item.quantity === 1 ? removeItem(item._id) : updateItem(`/api/cart/update/${item._id}`, { quantity: item.quantity - 1 })} aria-label={`Decrease quantity of ${product.title}`} className="px-3 py-1.5 hover:text-stone-500">−</button>
                          <span aria-label={`Quantity ${item.quantity}`} className="min-w-4 text-center">{item.quantity}</span>
                          <button type="button" onClick={() => updateItem(`/api/cart/update/${item._id}`, { quantity: item.quantity + 1 })} aria-label={`Increase quantity of ${product.title}`} className="px-3 py-1.5 hover:text-stone-500">+</button>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap items-baseline gap-2"><span className="text-sm font-semibold">{formatPrice(price)}</span>{price < product.price && <span className="text-xs text-stone-400 line-through">{formatPrice(product.price)}</span>}</div>
                      <button type="button" onClick={() => moveToWishlist(item)} className="mt-3 inline-flex items-center gap-1.5 text-xs text-stone-500 transition-colors hover:text-[#202320]"><Heart size={14} aria-hidden="true" /> Save to wishlist</button>
                    </div>
                    <button type="button" onClick={() => removeItem(item._id)} aria-label={`Remove ${product.title}`} className="absolute right-4 top-4 rounded-full p-1.5 text-stone-500 hover:bg-stone-100 hover:text-[#202320]"><X size={17} aria-hidden="true" /></button>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-xl border border-stone-200 bg-white px-6 py-16 text-center"><ShoppingBag size={36} className="mx-auto text-stone-400" aria-hidden="true" /><h2 className="mt-4 text-lg font-semibold">Your bag is empty</h2><p className="mt-2 text-sm text-stone-500">Find something you love and add it to your bag.</p><Link to="/" className="mt-6 inline-flex rounded-full bg-[#202320] px-6 py-3 text-xs font-semibold text-white hover:bg-stone-700">Continue shopping</Link></div>
          )}
        </section>
        <div>
          <PriceDetails cart={cart} coupon={appliedCoupon} onOpenCoupons={() => setCouponOpen(true)} onRemoveCoupon={() => setAppliedCoupon(null)} step={step} onStepChange={setStep} />
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mx-auto max-w-7xl border-t border-stone-200 px-4 pb-16 pt-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">Curated for you</p>
          <h2 className="mt-2 text-2xl font-semibold">Keep exploring</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-6">
            {relatedProducts.map((product) => {
              const price = product.listings?.includes("Sale") && product.salePrice != null ? product.salePrice : product.price;
              return <Link key={product._id} to={`/product/${product._id}`} className="group min-w-0">
                <div className="overflow-hidden rounded-lg bg-[#eeefeb]">{product.images?.[0] ? <img src={product.images[0]} alt={product.title} loading="lazy" className="aspect-[4/5] w-full object-contain transition-transform duration-300 group-hover:scale-105" /> : <div className="flex aspect-[4/5] items-center justify-center text-xs text-stone-400">Image unavailable</div>}</div>
                <p className="mt-3 line-clamp-2 text-xs font-medium leading-5">{product.title}</p>
                <p className="mt-1 text-xs font-semibold">{formatPrice(price)}</p>
              </Link>;
            })}
          </div>
        </section>
      )}
      <CouponModal open={couponOpen} coupons={coupons} subtotal={subtotal} appliedCoupon={appliedCoupon} onClose={closeCoupons} onPreview={previewCoupon} onApply={(preview) => { setAppliedCoupon(preview); setCouponOpen(false); setActionError(""); }} />
    </main>
  );
}
