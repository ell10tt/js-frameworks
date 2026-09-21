"use client";

interface ErrorPageProps {
  reset: () => void;
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <div className="w-full">
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="max-w-xl border-l-4 border-[#9cbfa7] pl-5 sm:pl-7">
          <h1 className="text-3xl font-semibold tracking-tight text-[#333333] sm:text-4xl">
            Products are unavailable
          </h1>
          <p className="mt-4 text-base leading-7 text-[#5c5c5c]">
            We couldn&apos;t load the products. Please try again.
          </p>
          <button
            className="mt-6 rounded-sm bg-[#5c5c5c] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#333333] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8377d1]"
            onClick={reset}
            type="button"
          >
            Try again
          </button>
        </div>
      </section>
    </div>
  );
}
