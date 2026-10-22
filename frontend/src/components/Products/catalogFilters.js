export function matchesCategory(productCategory, selectedCategory) {
  if (!selectedCategory) return true;
  const category = String(productCategory || '').trim().toLowerCase();
  const selected = String(selectedCategory).toLowerCase();
  if (selected === 'top') return ['top', 't-shirt', 't-shirts', 'tshirt'].includes(category);
  if (selected === 'shirt') return ['shirt', 'shirts'].includes(category);
  if (selected === 'winter') return ['winter', 'winter wear'].includes(category);
  return category === selected;
}

export function effectivePrice(product) {
  return product.listings?.includes('Sale') && product.salePrice != null ? product.salePrice : product.price;
}
