"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { formatPrice, getCurrentPrice } from "@/utils/product";

export default function CartPage() {
  const { state, dispatch } = useCart();
  const router = useRouter();

  if (!state.hasHydrated) {
    return (
      <section className="w-full">
        <div className="mx-auto max-w-[1000px] px-5 py-10 sm:px-8 lg:px-5">
          <h1 className="[font-family:var(--font-logo)] text-center text-3xl font-normal text-[#333333] sm:text-4xl">
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
        <div className="mx-auto max-w-[1000px] px-5 py-10 sm:px-8 lg:px-5">
          <h1 className="[font-family:var(--font-logo)] text-center text-3xl font-normal text-[#333333] sm:text-4xl">
            Shopping Cart
          </h1>
          <div className="mt-8 rounded-sm border border-[#eaeaea] bg-white p-6 sm:p-8">
            <p className="text-base leading-7 text-[#5c5c5c]">
              Your cart is empty.
            </p>
            <Link
              className="mt-5 inline-flex rounded-sm bg-[#9cbfa7] px-8 py-3 text-base font-medium text-white transition-[filter] hover:brightness-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9cbfa7]"
              href="/"
            >
              Browse products
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const cartTotal = state.items.reduce(
    (total, { product, quantity }) =>
      total +
      getCurrentPrice(product.price, product.discountedPrice) * quantity,
    0,
  );

  function handleCheckout() {
    dispatch({ type: "CLEAR_CART" });
    router.push("/checkout/success");
  }

  return (
    <section className="w-full">
      <div className="mx-auto max-w-[1000px] px-5 py-10 sm:px-8 lg:px-5">
        <h1 className="[font-family:var(--font-logo)] text-center text-3xl font-normal text-[#333333] sm:text-4xl">
          Shopping Cart
        </h1>
        <div className="mt-8">
          <ul className="border-t border-[#eaeaea]">
            {state.items.map(({ product, quantity }) => (
              <li key={product.id}>
                <article className="flex flex-col gap-5 border-b border-[#eaeaea] py-5 sm:flex-row sm:items-center">
                  <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-lg border border-[#eaeaea] bg-white sm:h-25 sm:w-25">
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
                    <dl className="mt-4 text-base text-[#5c5c5c]">
                      <div>
                        <dt className="text-sm">Price</dt>
                        <dd className="mt-1 text-lg font-semibold text-[#333333]">
                          {formatPrice(
                            getCurrentPrice(
                              product.price,
                              product.discountedPrice,
                            ),
                          )}
                        </dd>
                      </div>
                    </dl>
                    <div className="mt-5 flex flex-wrap items-end justify-between gap-4 sm:mt-3">
                      <div>
                        <p className="text-sm text-[#5c5c5c]">Quantity</p>
                        <div
                          aria-label={`Quantity controls for ${product.title}`}
                          className="mt-2 inline-flex items-center rounded-sm border border-[#eaeaea]"
                          role="group"
                        >
                          <button
                            aria-label={`Decrease quantity of ${product.title}`}
                            className="flex h-8 w-8 items-center justify-center rounded-sm border border-[#eaeaea] text-lg text-[#333333] transition-colors hover:border-[#9cbfa7] hover:bg-[#9cbfa7] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9cbfa7]"
                            onClick={() =>
                              dispatch({
                                type: "DECREASE_QUANTITY",
                                productId: product.id,
                              })
                            }
                            type="button"
                          >
                            -
                          </button>
                          <span
                            aria-label={`Quantity of ${product.title}: ${quantity}`}
                            aria-live="polite"
                            className="min-w-10 px-2 text-center text-base font-semibold text-[#333333]"
                          >
                            {quantity}
                          </span>
                          <button
                            aria-label={`Increase quantity of ${product.title}`}
                            className="flex h-8 w-8 items-center justify-center rounded-sm border border-[#eaeaea] text-lg text-[#333333] transition-colors hover:border-[#9cbfa7] hover:bg-[#9cbfa7] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9cbfa7]"
                            onClick={() =>
                              dispatch({
                                type: "INCREASE_QUANTITY",
                                productId: product.id,
                              })
                            }
                            type="button"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        className="rounded-sm bg-[#ff6b6b] px-4 py-2 text-sm font-medium text-white transition-[filter] hover:brightness-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff6b6b]"
                        onClick={() => {
                          dispatch({ type: "REMOVE_ITEM", productId: product.id });
                          toast.success("Removed from cart");
                        }}
                        type="button"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
          <aside
            aria-labelledby="cart-summary-heading"
            className="ml-auto mt-10 max-w-sm text-right"
          >
            <h2
              className="text-3xl font-medium text-[#333333]"
              id="cart-summary-heading"
            >
              Order summary
            </h2>
            <div className="mt-5 flex items-baseline justify-end gap-4 border-b border-[#eaeaea] pb-5">
              <span className="text-lg text-[#5c5c5c]">Total</span>
              <span className="text-2xl font-medium text-[#333333]">
                {formatPrice(cartTotal)}
              </span>
            </div>
            <button
              className="mt-5 w-full rounded-sm bg-[#9cbfa7] px-5 py-4 text-base font-medium text-white transition-[filter] hover:brightness-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9cbfa7]"
              onClick={handleCheckout}
              type="button"
            >
              Checkout
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
}
