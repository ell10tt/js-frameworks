const placeholderCards = Array.from({ length: 4 }, (_, index) => index);

export default function ProductsLoading() {
  return (
    <section aria-busy="true" aria-labelledby="products-heading">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <h2
          id="products-heading"
          className="text-3xl font-semibold tracking-tight text-[#333333] sm:text-4xl"
        >
          Products
        </h2>
        <p className="sr-only" role="status">
          Loading products
        </p>
        <div
          aria-hidden="true"
          className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8"
        >
          {placeholderCards.map((placeholderCard) => (
            <div
              key={placeholderCard}
              className="overflow-hidden rounded-lg border border-[#eaeaea] bg-white"
            >
              <div className="aspect-square animate-pulse bg-[#f9f9f9]" />
              <div className="space-y-4 p-5">
                <div className="h-6 w-3/4 animate-pulse rounded bg-[#f9f9f9]" />
                <div className="h-5 w-1/3 animate-pulse rounded bg-[#f9f9f9]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
