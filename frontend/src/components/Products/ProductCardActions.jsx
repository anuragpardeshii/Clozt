import { Heart, ShoppingBag } from "lucide-react";
import PropTypes from "prop-types";

export default function ProductCardActions({
  productId,
  isWishlisted,
  actionLoading,
  onCartClick,
  onWishlistClick,
}) {
  const isAddingToCart = actionLoading.type === "cart" && actionLoading.id === productId;
  const isUpdatingWishlist = actionLoading.type === "wishlist" && actionLoading.id === productId;

  return (
    <div className="pointer-events-none absolute inset-0">
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onWishlistClick(productId);
        }}
        disabled={isUpdatingWishlist}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        aria-pressed={isWishlisted}
        title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        className={`pointer-events-auto absolute right-6 top-6 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/5 bg-white/95 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60 ${isWishlisted ? "text-rose-500" : "text-gray-700 hover:text-rose-500"}`}
      >
        <Heart size={17} strokeWidth={1.8} fill={isWishlisted ? "currentColor" : "none"} aria-hidden="true" />
      </button>
      <div className="product-card-cart absolute inset-x-6 bottom-6 z-10 flex justify-center transition-all duration-300 ease-out">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onCartClick(productId);
          }}
          disabled={isAddingToCart}
          className="pointer-events-auto inline-flex items-center justify-center gap-1.5 rounded-full border border-white/80 bg-white/95 px-4 py-2 text-xs font-medium text-gray-900 shadow-md backdrop-blur-sm transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60"
        >
          <ShoppingBag size={14} strokeWidth={1.8} aria-hidden="true" />
          {isAddingToCart ? "Adding..." : "Add to cart"}
        </button>
      </div>
    </div>
  );
}

ProductCardActions.propTypes = {
  productId: PropTypes.string.isRequired,
  isWishlisted: PropTypes.bool.isRequired,
  actionLoading: PropTypes.shape({
    type: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  onCartClick: PropTypes.func.isRequired,
  onWishlistClick: PropTypes.func.isRequired,
};
