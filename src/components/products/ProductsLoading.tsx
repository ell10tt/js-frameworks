const placeholderCards = Array.from({ length: 4 }, (_, index) => index);

export default function ProductsLoading() {
  return (
    <section aria-busy="true" aria-labelledby="products-heading">
      <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 sm:py-16 lg:px-5">
        <h2
          id="products-heading"
          className="text-center text-3xl font-medium text-[#333333] sm:text-4xl"
        >
          All Products
        </h2>
        <p className="sr-only" role="status">
          Loading products
        </p>
        <div
          aria-hidden="true"
          className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {placeholderCards.map((placeholderCard) => (
            <div
              key={placeholderCard}
              className="overflow-hidden rounded-sm border border-[#eaeaea] bg-white"
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
