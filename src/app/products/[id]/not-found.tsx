import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="w-full">
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="max-w-xl border-l-4 border-[#9cbfa7] pl-5 sm:pl-7">
          <h1 className="text-3xl font-semibold tracking-tight text-[#333333] sm:text-4xl">
            Product not found
          </h1>
          <p className="mt-4 text-base leading-7 text-[#5c5c5c]">
            The product you are looking for is not available.
          </p>
          <Link
            className="mt-6 inline-flex rounded-sm bg-[#5c5c5c] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#333333] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8377d1]"
            href="/"
          >
            Return home
          </Link>
        </div>
      </section>
    </div>
  );
}
