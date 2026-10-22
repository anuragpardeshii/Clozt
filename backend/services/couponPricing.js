const getItemPrice = (product) => product.listings.includes("Sale") && product.salePrice != null
  ? product.salePrice
  : product.price;

const getCartSubtotal = (items) => items.reduce(
  (total, item) => total + getItemPrice(item.product) * item.quantity,
  0
);

const evaluateCoupon = (coupon, subtotal) => {
  if (!coupon || !coupon.active || coupon.expiresAt <= new Date()) {
    return { error: "This coupon is no longer available" };
  }
  if (subtotal < coupon.minimumSpend) {
    return { error: `Add ₹${Math.ceil(coupon.minimumSpend - subtotal)} more to use this coupon` };
  }
  const rawDiscount = coupon.kind === "percent"
    ? subtotal * coupon.value / 100
    : coupon.value;
  const discount = Math.round(Math.min(
    subtotal,
    rawDiscount,
    coupon.maxDiscount == null ? Infinity : coupon.maxDiscount
  ) * 100) / 100;
  return { discount, total: Math.round((subtotal - discount) * 100) / 100 };
};

module.exports = { getItemPrice, getCartSubtotal, evaluateCoupon };
