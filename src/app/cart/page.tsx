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
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <h1 className="text-3xl font-semibold tracking-tight text-[#333333] sm:text-4xl">
          Shopping Cart
        </h1>
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
          <ul className="space-y-5">
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
                    <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
                      <div>
                        <p className="text-sm text-[#5c5c5c]">Quantity</p>
                        <div
                          aria-label={`Quantity controls for ${product.title}`}
                          className="mt-2 inline-flex items-center rounded-sm border border-[#eaeaea]"
                          role="group"
                        >
                          <button
                            aria-label={`Decrease quantity of ${product.title}`}
                            className="flex h-10 w-10 items-center justify-center text-lg text-[#333333] transition-colors hover:bg-[#f9f9f9] hover:text-[#8377d1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8377d1]"
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
                            className="flex h-10 w-10 items-center justify-center text-lg text-[#333333] transition-colors hover:bg-[#f9f9f9] hover:text-[#8377d1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8377d1]"
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
                        className="rounded-sm border border-[#eaeaea] px-4 py-2 text-sm font-medium text-[#5c5c5c] transition-colors hover:border-[#8377d1] hover:text-[#8377d1] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8377d1]"
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
            className="rounded-lg border border-[#eaeaea] bg-[#f9f9f9] p-5 sm:p-6"
          >
            <h2
              className="text-xl font-medium text-[#333333]"
              id="cart-summary-heading"
            >
              Order summary
            </h2>
            <div className="mt-5 flex items-baseline justify-between gap-4 border-b border-[#eaeaea] pb-5">
              <span className="text-base text-[#5c5c5c]">Total</span>
              <span className="text-2xl font-semibold text-[#333333]">
                {formatPrice(cartTotal)}
              </span>
            </div>
            <button
              className="mt-5 w-full rounded-sm bg-[#8377d1] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#6f64bb] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8377d1]"
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
