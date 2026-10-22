import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { notifyShoppingChange } from "../shoppingEvents";
import CloztLoader from '../../CloztLoader';

const formatPrice = (price) => `₹${new Intl.NumberFormat("en-IN").format(price)}`;
const sizeOrder = ["XS", "S", "M", "L", "XL", "XXL"];

export default function Details() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [sizeError, setSizeError] = useState("");
  const [cartMessage, setCartMessage] = useState(null);
  const [cartLoading, setCartLoading] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [wishlistMessage, setWishlistMessage] = useState("");
  const [reviews, setReviews] = useState([]);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    setProduct(null);
    setSelectedSize("");
    setSizeError(location.state?.promptForSize ? "Choose a size before adding to cart." : "");
    setCartMessage(null);
    setWishlistMessage("");
    window.scrollTo(0, 0);

    axios.get("/api/products")
      .then(({ data }) => {
        if (!active) return;
        const foundProduct = data.find((item) => item._id === id);
        if (!foundProduct) {
          setError("Product not found.");
          return;
        }
        setProducts(data);
        setProduct(foundProduct);
        setSelectedImage(foundProduct.images?.[0] || "");
        const requestedSize = new URLSearchParams(location.search).get("size");
        if (requestedSize && Number(foundProduct.sizes?.[requestedSize]) > 0) {
          setSelectedSize(requestedSize);
          setSizeError("");
        }
      })
      .catch(() => {
        if (active) setError("Could not load this product. Please try again.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, [id, location.search, location.state?.promptForSize]);

  useEffect(() => {
    let active = true;
    setReviews([]);
    setReviewRating(0);
    setReviewComment("");
    setReviewMessage("");
    axios.get(`/api/products/${id}/reviews`)
      .then(({ data }) => {
        if (active) setReviews(data.reviews || []);
      })
      .catch(() => {
        if (active) setReviewMessage("Reviews could not be loaded.");
      });
    return () => { active = false; };
  }, [id]);

  useEffect(() => {
    const existingReview = reviews.find((review) => review.user?._id === (user?._id || user?.id));
    if (existingReview) {
      setReviewRating(existingReview.rating);
      setReviewComment(existingReview.comment);
    }
  }, [reviews, user?._id, user?.id]);

  useEffect(() => {
    if (!isAuthenticated) {
      setIsInWishlist(false);
      return;
    }
    let active = true;
    axios.get("/api/wishlist", { withCredentials: true })
      .then(({ data }) => {
        if (active) setIsInWishlist((data.wishlist?.products || []).some((item) => item._id === id));
      })
      .catch(() => {
        if (active) setIsInWishlist(false);
      });
    return () => { active = false; };
  }, [id, isAuthenticated]);

  const sizes = useMemo(() => Object.entries(product?.sizes || {}).sort(([first], [second]) => {
    const firstIndex = sizeOrder.indexOf(first);
    const secondIndex = sizeOrder.indexOf(second);
    return (firstIndex < 0 ? sizeOrder.length : firstIndex) - (secondIndex < 0 ? sizeOrder.length : secondIndex);
  }), [product]);
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter((item) => item._id !== product._id)
      .sort((first, second) => {
        const score = (item) => Number(item.category === product.category) * 2 + Number(item.gender === product.gender);
        return score(second) - score(first);
      })
      .slice(0, 6);
  }, [product, products]);
  const averageRating = reviews.length
    ? reviews.reduce((total, review) => total + review.rating, 0) / reviews.length
    : 0;

  const handleCartClick = async () => {
    setCartMessage(null);
    if (!selectedSize) {
      setSizeError("Please select a size first.");
      return;
    }
    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/product/${id}?size=${encodeURIComponent(selectedSize)}` } });
      return;
    }
    setCartLoading(true);
    try {
      await axios.post("/api/cart/add", { productId: id, size: selectedSize, quantity: 1 }, { withCredentials: true });
      notifyShoppingChange();
      setCartMessage({ type: "success", text: `${selectedSize} added to cart.` });
    } catch (requestError) {
      setCartMessage({ type: "error", text: requestError.response?.data?.message || "Could not add to cart." });
    } finally {
      setCartLoading(false);
    }
  };

  const handleWishlistClick = async () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/product/${id}` } });
      return;
    }
    setWishlistLoading(true);
    setWishlistMessage("");
    try {
      if (isInWishlist) await axios.delete(`/api/wishlist/remove/${id}`, { withCredentials: true });
      else await axios.post("/api/wishlist/add", { productId: id }, { withCredentials: true });
      setIsInWishlist(!isInWishlist);
      notifyShoppingChange();
    } catch (requestError) {
      setWishlistMessage(requestError.response?.data?.message || "Could not update wishlist.");
    } finally {
      setWishlistLoading(false);
    }
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    setReviewMessage("");
    if (!reviewRating || reviewComment.trim().length < 10) {
      setReviewMessage("Choose a rating and write at least 10 characters.");
      return;
    }
    setReviewLoading(true);
    try {
      await axios.post(`/api/products/${id}/reviews`, { rating: reviewRating, comment: reviewComment.trim() }, { withCredentials: true });
      const { data } = await axios.get(`/api/products/${id}/reviews`);
      setReviews(data.reviews || []);
      setReviewMessage("Review saved. Thank you!");
    } catch (requestError) {
      setReviewMessage(requestError.response?.data?.message || "Could not save review.");
    } finally {
      setReviewLoading(false);
    }
  };

  if (loading) return <main className="mx-auto max-w-7xl px-4 py-16"><CloztLoader label="Loading product" /></main>;
  if (error || !product) return <main className="mx-auto max-w-7xl px-4 py-16 text-sm text-rose-600" role="alert">{error || "Product not found."}</main>;

  const price = product.listings?.includes("Sale") && product.salePrice != null ? product.salePrice : product.price;
  const ownReview = reviews.some((review) => review.user?._id === (user?._id || user?.id));

  return (
    <main className="mx-auto max-w-7xl px-4 pb-20 pt-8 text-gray-900 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap items-center gap-2 text-xs text-gray-500">
        <Link to="/" className="hover:text-gray-900">Home</Link><span>/</span>
        <Link to={product.gender === "Female" ? "/women" : "/men"} className="hover:text-gray-900">{product.gender === "Female" ? "Women" : "Men"}</Link><span>/</span>
        <span className="text-gray-700">{product.category}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
        <section aria-label="Product images">
          <div className="overflow-hidden rounded-2xl bg-[#f5f5f3]">
            {selectedImage ? (
              <img src={selectedImage} alt={product.title} className="aspect-[4/5] w-full object-contain" />
            ) : (
              <div className="flex aspect-[4/5] items-center justify-center text-sm text-gray-400">Image unavailable</div>
            )}
          </div>
          {product.images?.length > 1 && (
            <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
              {product.images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  aria-label={`View product image ${index + 1}`}
                  aria-pressed={selectedImage === image}
                  className={`h-20 w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-gray-50 transition-colors ${selectedImage === image ? "border-gray-900" : "border-transparent hover:border-gray-300"}`}
                >
                  <img src={image} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </section>

        <section aria-label="Product information" className="lg:pt-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Clozt / {product.category}</p>
          <h1 className="mt-3 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">{product.title}</h1>
          <a href="#reviews" className="mt-4 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
            <Star size={16} className={reviews.length ? "fill-amber-400 text-amber-400" : "text-gray-400"} aria-hidden="true" />
            {reviews.length ? `${averageRating.toFixed(1)} · ${reviews.length} ${reviews.length === 1 ? "review" : "reviews"}` : "Be the first to review"}
          </a>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="text-2xl font-semibold">{formatPrice(price)}</span>
              {price < product.price && <span className="text-sm text-gray-400 line-through">{formatPrice(product.price)}</span>}
            </div>
            <p className="mt-1 text-xs text-emerald-700">Inclusive of all taxes</p>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-sm font-semibold uppercase tracking-wide">Select size</h2>
              {selectedSize && <span className="text-xs text-gray-500">Selected: {selectedSize}</span>}
            </div>
            <div className="mt-4 flex flex-wrap gap-3" role="group" aria-label="Available sizes">
              {sizes.map(([size, stock]) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => { setSelectedSize(size); setSizeError(""); }}
                  disabled={Number(stock) < 1}
                  aria-pressed={selectedSize === size}
                  className={`min-h-12 min-w-12 rounded-full border px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-300 disabled:line-through ${selectedSize === size ? "border-gray-900 bg-gray-900 text-white" : "border-gray-300 hover:border-gray-900"}`}
                >
                  {size}
                </button>
              ))}
              {sizes.length === 0 && <p className="text-sm text-gray-500">No sizes available.</p>}
            </div>
            {sizeError && <p role="alert" className="mt-3 text-xs font-medium text-rose-600">{sizeError}</p>}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleCartClick}
              disabled={cartLoading || sizes.every(([, stock]) => Number(stock) < 1)}
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-gray-900 px-6 text-sm font-semibold text-white transition-colors hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ShoppingBag size={18} aria-hidden="true" /> {cartLoading ? "Adding..." : "Add to cart"}
            </button>
            <button
              type="button"
              onClick={handleWishlistClick}
              disabled={wishlistLoading}
              aria-pressed={isInWishlist}
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 px-6 text-sm font-semibold transition-colors hover:border-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 disabled:opacity-50"
            >
              <Heart size={18} fill={isInWishlist ? "currentColor" : "none"} className={isInWishlist ? "text-rose-500" : ""} aria-hidden="true" />
              {isInWishlist ? "Wishlisted" : "Wishlist"}
            </button>
          </div>
          {cartMessage && <p role="status" className={`mt-3 text-xs ${cartMessage.type === "success" ? "text-emerald-700" : "text-rose-600"}`}>{cartMessage.text}</p>}
          {wishlistMessage && <p role="alert" className="mt-3 text-xs text-rose-600">{wishlistMessage}</p>}

          <div className="mt-10 border-t border-gray-200 pt-7">
            <h2 className="text-sm font-semibold uppercase tracking-wide">Product details</h2>
            <p className="mt-4 whitespace-pre-line text-sm leading-7 text-gray-600">{product.description}</p>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex gap-4"><dt className="w-20 shrink-0 text-gray-500">Color</dt><dd>{product.color}</dd></div>
              <div className="flex gap-4"><dt className="w-20 shrink-0 text-gray-500">Category</dt><dd>{product.category}</dd></div>
            </dl>
            <p className="mt-6 text-xs text-gray-500">Cash on Delivery available at checkout.</p>
          </div>
        </section>
      </div>

      <section id="reviews" className="mt-20 border-t border-gray-200 pt-10 scroll-mt-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">From our customers</p>
            <h2 className="mt-2 text-2xl font-semibold">Ratings & reviews</h2>
            <div className="mt-5 flex items-end gap-3">
              <span className="text-4xl font-semibold">{reviews.length ? averageRating.toFixed(1) : "—"}</span>
              <Star size={24} className={reviews.length ? "mb-1 fill-amber-400 text-amber-400" : "mb-1 text-gray-300"} aria-hidden="true" />
              <span className="mb-1 text-sm text-gray-500">{reviews.length} {reviews.length === 1 ? "review" : "reviews"}</span>
            </div>
            {reviews.length > 0 && (
              <div className="mt-6 max-w-xs space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = reviews.filter((review) => review.rating === rating).length;
                  return (
                    <div key={rating} className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="w-4">{rating}</span><Star size={12} aria-hidden="true" />
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100"><div className="h-full rounded-full bg-gray-900" style={{ width: `${count / reviews.length * 100}%` }} /></div>
                      <span className="w-6 text-right">{count}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            {isAuthenticated ? (
              <form onSubmit={handleReviewSubmit} className="rounded-xl border border-gray-200 p-5 sm:p-6">
                <h3 className="text-sm font-semibold">{ownReview ? "Update your review" : "Write a review"}</h3>
                <div className="mt-4 flex gap-1" role="group" aria-label="Your rating">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button key={rating} type="button" onClick={() => setReviewRating(rating)} aria-label={`${rating} ${rating === 1 ? "star" : "stars"}`} aria-pressed={reviewRating === rating} className="rounded p-1 text-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900">
                      <Star size={24} fill={rating <= reviewRating ? "currentColor" : "none"} aria-hidden="true" />
                    </button>
                  ))}
                </div>
                <label htmlFor="review-comment" className="mt-4 block text-xs font-medium text-gray-600">Your thoughts</label>
                <textarea id="review-comment" value={reviewComment} onChange={(event) => setReviewComment(event.target.value)} maxLength={1000} rows={4} placeholder="How was the fit, feel, and quality?" className="mt-2 w-full resize-y rounded-lg border border-gray-300 p-3 text-sm focus:border-gray-900 focus:outline-none" />
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-gray-400">10–1000 characters</span>
                  <button type="submit" disabled={reviewLoading} className="rounded-lg bg-gray-900 px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-gray-700 disabled:opacity-50">{reviewLoading ? "Saving..." : "Submit review"}</button>
                </div>
                {reviewMessage && <p role="status" className="mt-3 text-xs text-gray-600">{reviewMessage}</p>}
              </form>
            ) : (
              <div className="rounded-xl border border-gray-200 p-6 text-sm text-gray-600">
                <Link to="/login" state={{ from: `/product/${id}` }} className="font-semibold text-gray-900 underline">Sign in</Link> to write a review.
              </div>
            )}
            <div className="mt-8 space-y-6">
              {reviews.length === 0 && <p className="text-sm text-gray-500">No reviews yet. Share your experience with this product.</p>}
              {reviews.map((review) => (
                <article key={review._id} className="border-b border-gray-100 pb-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1 text-sm font-semibold"><Star size={14} className="fill-amber-400 text-amber-400" aria-hidden="true" />{review.rating}/5</span>
                    <span className="text-xs text-gray-500">{review.user?.username || "Customer"}</span>
                    <time className="text-xs text-gray-400" dateTime={review.createdAt}>{new Date(review.createdAt).toLocaleDateString()}</time>
                  </div>
                  <p className="mt-3 whitespace-pre-line text-sm leading-6 text-gray-700">{review.comment}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="mt-20 border-t border-gray-200 pt-10">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">More to explore</p><h2 className="mt-2 text-2xl font-semibold">Similar products</h2></div>
            <Link to={product.gender === "Female" ? "/women" : "/men"} className="text-xs font-semibold text-gray-600 hover:text-gray-900">View all →</Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {relatedProducts.map((item) => {
              const itemPrice = item.listings?.includes("Sale") && item.salePrice != null ? item.salePrice : item.price;
              return (
                <Link key={item._id} to={`/product/${item._id}`} className="group block min-w-0">
                  <div className="overflow-hidden rounded-lg bg-[#f5f5f3]">
                    {item.images?.[0] ? <img src={item.images[0]} alt={item.title} loading="lazy" className="aspect-[4/5] w-full object-contain transition-transform duration-300 group-hover:scale-105" /> : <div className="flex aspect-[4/5] items-center justify-center text-xs text-gray-400">Image unavailable</div>}
                  </div>
                  <h3 className="mt-3 line-clamp-2 text-xs font-medium leading-5 text-gray-900">{item.title}</h3>
                  <p className="mt-1 text-xs font-semibold">{formatPrice(itemPrice)}</p>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
