import { getProducts } from "@/services/online-shop";
import ProductCatalog from "./ProductCatalog";

export default async function ProductGrid() {
  const { data: products } = await getProducts();

  return (
    <section aria-labelledby="products-heading">
      <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 sm:py-16 lg:px-5">
        <h2
          id="products-heading"
          className="text-center text-3xl font-medium text-[#333333] sm:text-4xl"
        >
          All Products
        </h2>
        {products.length === 0 ? (
          <p className="mt-8 text-base leading-7 text-[#5c5c5c]" role="status">
            No products are available right now. Please check back later.
          </p>
        ) : (
          <ProductCatalog products={products} />
        )}
      </div>
    </section>
  );
}
