"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types/product";
import { getCurrentPrice } from "@/utils/product";
import ProductCard from "./ProductCard";
import Search from "./Search";

type SortOption =
  | "default"
  | "price-low-to-high"
  | "price-high-to-low"
  | "rating-high-to-low";

interface ProductCatalogProps {
  products: Product[];
}

export default function ProductCatalog({ products }: ProductCatalogProps) {
  const [sortOption, setSortOption] = useState<SortOption>("default");
  const sortedProducts = useMemo(() => {
    const productsCopy = [...products];

    switch (sortOption) {
      case "price-low-to-high":
        return productsCopy.sort(
          (firstProduct, secondProduct) =>
            getCurrentPrice(
              firstProduct.price,
              firstProduct.discountedPrice,
            ) -
            getCurrentPrice(
              secondProduct.price,
              secondProduct.discountedPrice,
            ),
        );
      case "price-high-to-low":
        return productsCopy.sort(
          (firstProduct, secondProduct) =>
            getCurrentPrice(
              secondProduct.price,
              secondProduct.discountedPrice,
            ) -
            getCurrentPrice(
              firstProduct.price,
              firstProduct.discountedPrice,
            ),
        );
      case "rating-high-to-low":
        return productsCopy.sort(
          (firstProduct, secondProduct) => secondProduct.rating - firstProduct.rating,
        );
      default:
        return productsCopy;
    }
  }, [products, sortOption]);

  return (
    <>
      <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <Search products={products} />
        <div className="w-full sm:w-56">
          <label
            className="block text-sm font-medium text-[#333333]"
            htmlFor="product-sort"
          >
            Sort products
          </label>
          <select
            className="mt-2 w-full rounded-sm border border-[#eaeaea] bg-white px-4 py-3 text-base text-[#333333] outline-none transition-colors focus:border-[#8377d1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8377d1]"
            id="product-sort"
            onChange={(event) => setSortOption(event.target.value as SortOption)}
            value={sortOption}
          >
            <option value="default">Default</option>
            <option value="price-low-to-high">Price: Low to High</option>
            <option value="price-high-to-low">Price: High to Low</option>
            <option value="rating-high-to-low">Rating: High to Low</option>
          </select>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
