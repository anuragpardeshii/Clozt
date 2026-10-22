import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ProductCardActions from "../Products/ProductCardActions";

const formatPrice = (amount) => `₹${new Intl.NumberFormat("en-IN").format(amount)}`;

export default function HomeProductCard({ product, actions, badge }) {
  const salePrice = product.listings?.includes("Sale") && product.salePrice != null
    ? product.salePrice : null;
  const price = salePrice ?? product.price;

  return (
    <article className="product-card group min-w-0">
      <div className="relative mb-3 overflow-hidden rounded-lg bg-gray-100">
        <Link to={`/product/${product._id}`} className="block" aria-label={`View ${product.title}`}>
          {product.images?.[0] ? (
            <img src={product.images[0]} alt={product.title} className="h-[280px] w-full object-contain transition-transform duration-500 group-hover:scale-[1.03] sm:h-[340px]" loading="lazy" />
          ) : (
            <span className="flex h-[280px] items-center justify-center text-xs text-gray-400 sm:h-[340px]">No image available</span>
          )}
        </Link>
        {badge && <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-gray-800 shadow-sm">{badge}</span>}
        <ProductCardActions
          productId={product._id}
          isWishlisted={actions.wishlistIds.has(product._id)}
          actionLoading={actions.actionLoading}
          onCartClick={actions.handleCartClick}
          onWishlistClick={actions.handleWishlistClick}
        />
      </div>
      <Link to={`/product/${product._id}`} className="line-clamp-2 text-sm font-medium text-gray-900 hover:text-rose-500">{product.title}</Link>
      <p className="mt-1 flex flex-wrap items-baseline gap-2 text-sm font-semibold text-gray-900">
        <span>{formatPrice(price)}</span>
        {salePrice != null && salePrice < product.price && <span className="text-xs font-normal text-gray-400 line-through">{formatPrice(product.price)}</span>}
      </p>
    </article>
  );
}

HomeProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    salePrice: PropTypes.number,
    listings: PropTypes.arrayOf(PropTypes.string),
    images: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  actions: PropTypes.shape({
    wishlistIds: PropTypes.instanceOf(Set).isRequired,
    actionLoading: PropTypes.object.isRequired,
    handleCartClick: PropTypes.func.isRequired,
    handleWishlistClick: PropTypes.func.isRequired,
  }).isRequired,
  badge: PropTypes.string,
};
