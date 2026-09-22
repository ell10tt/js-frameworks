const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function formatPrice(price: number): string {
  return priceFormatter.format(price);
}

export function getCurrentPrice(price: number, discountedPrice: number): number {
  return discountedPrice < price ? discountedPrice : price;
}

export function getDiscountPercentage(
  price: number,
  discountedPrice: number,
): number {
  if (price <= 0 || discountedPrice >= price) {
    return 0;
  }

  return Math.round(((price - discountedPrice) / price) * 100);
}
