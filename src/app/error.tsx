"use client";

interface ErrorPageProps {
  reset: () => void;
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center bg-[#f9f9f9] px-5 py-10 sm:px-8">
      <section className="w-full max-w-xl rounded-lg bg-white px-5 py-10 text-center shadow-[0_4px_20px_rgba(0,0,0,0.05)] sm:px-10">
        <div>
          <h1 className="text-3xl font-medium text-[#333333] sm:text-4xl">
            Products are unavailable
          </h1>
          <p className="mt-4 text-base leading-7 text-[#5c5c5c]">
            We couldn&apos;t load the products. Please try again.
          </p>
          <button
            className="mt-7 rounded-sm bg-[#9cbfa7] px-7 py-3 text-sm font-medium text-white transition-[filter] hover:brightness-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8377d1]"
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
