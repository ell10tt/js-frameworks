import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center bg-[#f9f9f9] px-5 py-10 sm:px-8">
      <section className="w-full max-w-xl rounded-lg bg-white px-5 py-10 text-center shadow-[0_4px_20px_rgba(0,0,0,0.05)] sm:px-10">
        <div>
          <h1 className="text-3xl font-medium text-[#333333] sm:text-4xl">
            Product not found
          </h1>
          <p className="mt-4 text-base leading-7 text-[#5c5c5c]">
            The product you are looking for is not available.
          </p>
          <Link
            className="mt-7 inline-flex rounded-sm bg-[#9cbfa7] px-7 py-3 text-sm font-medium text-white transition-[filter] hover:brightness-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8377d1]"
            href="/"
          >
            Return home
          </Link>
        </div>
      </section>
    </div>
  );
}
