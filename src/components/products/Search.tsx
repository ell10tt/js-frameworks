"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Product } from "@/types/product";

interface SearchProps {
  products: Product[];
}

const searchResultsId = "search-results";

export default function Search({ products }: SearchProps) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const results = useMemo(
    () =>
      normalizedQuery.length === 0
        ? []
        : products.filter((product) =>
            product.title.toLowerCase().includes(normalizedQuery),
          ),
    [normalizedQuery, products],
  );
  const hasQuery = normalizedQuery.length > 0;

  return (
    <div className="relative w-full max-w-xl">
      <label className="block text-sm font-medium text-[#333333]" htmlFor="product-search">
        Search products
      </label>
      <input
        aria-controls={hasQuery ? searchResultsId : undefined}
        className="mt-2 w-full rounded-full border border-[#eaeaea] bg-white px-5 py-3 text-base text-[#333333] outline-none transition-colors placeholder:text-[#5c5c5c] focus:border-[#9cbfa7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9cbfa7]"
        id="product-search"
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search by product name"
        type="search"
        value={query}
      />

      {hasQuery && (
        <div
          aria-live="polite"
          className="absolute z-20 mt-2 w-full overflow-hidden rounded-sm border border-[#eaeaea] bg-white shadow-md"
          id={searchResultsId}
        >
          {results.length > 0 ? (
            <ul aria-label="Search results" className="max-h-80 overflow-y-auto py-2">
              {results.map((product) => (
                <li key={product.id}>
                  <Link
                    className="block cursor-pointer px-4 py-3 text-[#333333] transition-colors hover:bg-[#f9f9f9] hover:text-[#9cbfa7] focus-visible:bg-[#f9f9f9] focus-visible:text-[#9cbfa7] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#9cbfa7]"
                    href={`/products/${product.id}`}
                  >
                    {product.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-3 text-[#5c5c5c]">No products found</p>
          )}
        </div>
      )}
    </div>
  );
}
