import { Suspense } from "react";
import ProductGrid from "@/components/products/ProductGrid";
import ProductsLoading from "@/components/products/ProductsLoading";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="w-full">
      <section className="bg-[#8377d1] px-5 py-7 text-center text-[#f5f5f5] sm:px-8 sm:py-8">
        <div className="mx-auto max-w-[1200px]">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Today&apos;s sales. We have discounts up to 90%!
          </h1>
          <p className="mt-2 text-xl sm:text-2xl">Your discount code: NOR0FF</p>
        </div>
      </section>

      <Suspense fallback={<ProductsLoading />}>
        <ProductGrid />
      </Suspense>
    </div>
  );
}
