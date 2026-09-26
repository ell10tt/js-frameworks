import Image from "next/image";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/products/AddToCartButton";
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
      <article className="mx-auto max-w-[1100px] px-5 py-10 sm:px-8 sm:py-12 lg:px-5 lg:py-15">
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-start md:gap-16">
          <div className="relative aspect-square overflow-hidden rounded-sm border border-[#eaeaea] bg-white">
            <Image
              alt={product.image.alt || product.title}
              className="object-contain p-5"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              src={product.image.url}
            />
          </div>

          <div>
            <h1 className="text-3xl font-medium text-[#9b98d5] sm:text-4xl">
              {product.title}
            </h1>
            <p
              aria-label={`Rating: ${product.rating} out of 5`}
              className="mt-5 text-base font-medium text-[#5c5c5c]"
            >
              <span aria-hidden="true" className="text-[#9cbfa7]">
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
            <p className="mt-8 text-base leading-7 text-[#5c5c5c]">
              {product.description}
            </p>

            {product.tags.length > 0 && (
              <ul aria-label="Product tags" className="mt-8 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <li
                    key={tag}
                  className="rounded-sm bg-[#f9f9f9] px-2 py-1 text-sm text-[#5c5c5c]"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}

            <AddToCartButton product={product} />
          </div>
        </div>

        <section aria-labelledby="reviews-heading" className="mt-12 border-t border-[#eaeaea] pt-8 sm:mt-16">
          <h2
            id="reviews-heading"
            className="text-2xl font-medium text-[#333333]"
          >
            Reviews
          </h2>
          {product.reviews.length > 0 ? (
            <ul className="mt-5">
              {product.reviews.map((review) => (
                <li
                  key={review.id}
                  className="border-b border-[#eaeaea] py-4 last:border-b-0"
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
                        <span aria-hidden="true" className="text-[#9cbfa7]">
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
