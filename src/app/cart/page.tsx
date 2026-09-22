"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice, getCurrentPrice } from "@/utils/product";

export default function CartPage() {
  const { state } = useCart();

  if (!state.hasHydrated) {
    return (
      <section className="w-full">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <h1 className="text-3xl font-semibold tracking-tight text-[#333333] sm:text-4xl">
            Shopping Cart
          </h1>
          <p className="mt-8 text-base leading-7 text-[#5c5c5c]" role="status">
            Loading cart...
          </p>
        </div>
      </section>
    );
  }

  if (state.items.length === 0) {
    return (
      <section className="w-full">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <h1 className="text-3xl font-semibold tracking-tight text-[#333333] sm:text-4xl">
            Shopping Cart
          </h1>
          <div className="mt-8 rounded-lg border border-[#eaeaea] bg-[#f9f9f9] p-6 sm:p-8">
            <p className="text-base leading-7 text-[#5c5c5c]">
              Your cart is empty.
            </p>
            <Link
              className="mt-5 inline-flex rounded-sm bg-[#8377d1] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#6f64bb] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8377d1]"
              href="/"
            >
              Browse products
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <h1 className="text-3xl font-semibold tracking-tight text-[#333333] sm:text-4xl">
          Shopping Cart
        </h1>
        <ul className="mt-8 space-y-5">
          {state.items.map(({ product, quantity }) => (
            <li key={product.id}>
              <article className="flex flex-col gap-5 rounded-lg border border-[#eaeaea] bg-white p-5 sm:flex-row sm:items-center sm:p-6">
                <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-sm bg-[#f9f9f9] sm:h-28 sm:w-28">
                  <Image
                    alt={product.image.alt || product.title}
                    className="object-contain p-4"
                    fill
                    sizes="(min-width: 640px) 112px, 100vw"
                    src={product.image.url}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="break-words text-xl font-medium text-[#333333]">
                    {product.title}
                  </h2>
                  <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-3 text-base text-[#5c5c5c]">
                    <div>
                      <dt className="text-sm">Price</dt>
                      <dd className="mt-1 text-lg font-semibold text-[#333333]">
                        {formatPrice(
                          getCurrentPrice(product.price, product.discountedPrice),
                        )}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm">Quantity</dt>
                      <dd className="mt-1 text-lg font-semibold text-[#333333]">
                        {quantity}
                      </dd>
                    </div>
                  </dl>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
