import Image from "next/image";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-[#eaeaea] bg-white transition-shadow hover:shadow-md">
      <div className="relative aspect-square bg-[#f9f9f9]">
        <Image
          alt={product.image.alt}
          className="object-contain p-5"
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          src={product.image.url}
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 min-h-12 text-lg font-medium leading-6 text-[#333333]">
          {product.title}
        </h3>
        <p className="mt-4 text-base font-semibold text-[#5c5c5c]">
          {priceFormatter.format(product.discountedPrice)}
        </p>
      </div>
    </article>
  );
}
