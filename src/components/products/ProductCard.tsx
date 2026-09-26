import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import {
  formatPrice,
  getCurrentPrice,
  getDiscountPercentage,
} from "@/utils/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.discountedPrice < product.price;
  const currentPrice = getCurrentPrice(
    product.price,
    product.discountedPrice,
  );
  const discountPercentage = getDiscountPercentage(
    product.price,
    product.discountedPrice,
  );

  return (
    <Link
      aria-label={`View ${product.title}`}
      className="group block h-full rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9cbfa7]"
      href={`/products/${product.id}`}
    >
      <article className="flex h-full flex-col overflow-hidden rounded-sm border border-[#eaeaea] bg-white p-5 transition-shadow group-hover:shadow-md">
        <div className="relative h-[280px] bg-[#f9f9f9]">
          {hasDiscount && (
            <span className="absolute right-3 top-3 z-10 rounded-sm bg-[#8377d1] px-3 py-1 text-sm font-semibold text-white">
              -{discountPercentage}%
            </span>
          )}
          <Image
            alt={product.image.alt || product.title}
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            src={product.image.url}
          />
        </div>
        <div className="flex flex-1 flex-col pt-5 text-center">
          <h3 className="line-clamp-2 min-h-12 text-xl font-medium leading-6 text-[#333333]">
            {product.title}
          </h3>
          <p
            aria-label={`Rating: ${product.rating} out of 5`}
            className="mt-3 text-sm font-medium text-[#5c5c5c]"
          >
            <span aria-hidden="true" className="text-[#9cbfa7]">
              ★
            </span>{" "}
            {product.rating.toFixed(1)} / 5
          </p>
          <div className="mt-auto pt-5">
            {hasDiscount ? (
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <p className="text-sm text-[#5c5c5c] line-through">
                  {formatPrice(product.price)}
                </p>
                <p className="text-lg font-semibold text-[#333333]">
                  {formatPrice(currentPrice)}
                </p>
              </div>
            ) : (
              <p className="text-lg font-semibold text-[#333333]">
                {formatPrice(currentPrice)}
              </p>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
