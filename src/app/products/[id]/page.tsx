import Image from "next/image";
import { notFound } from "next/navigation";
import type { Product } from "@/types/product";
import { OnlineShopApiError, getProduct } from "@/services/online-shop";
import { formatPrice } from "@/utils/product";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  let product: Product;

  try {
    ({ data: product } = await getProduct(id));
  } catch (error) {
    if (
      error instanceof OnlineShopApiError &&
      (error.status === 400 || error.status === 404)
    ) {
      notFound();
    }

    throw error;
  }

  const hasDiscount = product.discountedPrice < product.price;

  return (
    <div className="w-full">
      <article className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-[#f9f9f9]">
            <Image
              alt={product.image.alt || product.title}
              className="object-contain p-8 sm:p-12"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              src={product.image.url}
            />
          </div>

          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-[#333333] sm:text-4xl lg:text-5xl">
              {product.title}
            </h1>
            <p
              aria-label={`Rating: ${product.rating} out of 5`}
              className="mt-5 text-base font-medium text-[#5c5c5c]"
            >
              <span aria-hidden="true" className="text-[#8377d1]">
                ★
              </span>{" "}
              {product.rating.toFixed(1)} / 5
            </p>
            <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-2">
              {hasDiscount && (
                <p className="text-base text-[#5c5c5c] line-through">
                  {formatPrice(product.price)}
                </p>
              )}
              <p className="text-2xl font-semibold text-[#333333]">
                {formatPrice(
                  hasDiscount ? product.discountedPrice : product.price,
                )}
              </p>
            </div>
            <p className="mt-8 text-base leading-7 text-[#5c5c5c] sm:text-lg sm:leading-8">
              {product.description}
            </p>

            {product.tags.length > 0 && (
              <ul aria-label="Product tags" className="mt-8 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-sm bg-[#f9f9f9] px-3 py-1 text-sm text-[#5c5c5c]"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}

            <button
              className="mt-8 w-full cursor-not-allowed rounded-sm bg-[#5c5c5c] px-5 py-3 text-sm font-medium text-white opacity-60 sm:w-auto"
              disabled
              type="button"
            >
              Add to Cart
            </button>
          </div>
        </div>

        <section aria-labelledby="reviews-heading" className="mt-16 border-t border-[#eaeaea] pt-12 sm:mt-20 sm:pt-16">
          <h2
            id="reviews-heading"
            className="text-2xl font-semibold tracking-tight text-[#333333] sm:text-3xl"
          >
            Reviews
          </h2>
          {product.reviews.length > 0 ? (
            <ul className="mt-8 grid gap-5 md:grid-cols-2">
              {product.reviews.map((review) => (
                <li
                  key={review.id}
                  className="rounded-lg border border-[#eaeaea] bg-white p-5"
                >
                  <article>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="font-medium text-[#333333]">
                        {review.username}
                      </h3>
                      <p
                        aria-label={`Rating: ${review.rating} out of 5`}
                        className="text-sm font-medium text-[#5c5c5c]"
                      >
                        <span aria-hidden="true" className="text-[#8377d1]">
                          ★
                        </span>{" "}
                        {review.rating.toFixed(1)} / 5
                      </p>
                    </div>
                    <p className="mt-4 leading-7 text-[#5c5c5c]">
                      {review.description}
                    </p>
                  </article>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-5 text-base leading-7 text-[#5c5c5c]">
              There are no reviews for this product yet.
            </p>
          )}
        </section>
      </article>
    </div>
  );
}
