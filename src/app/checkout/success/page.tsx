import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="max-w-xl rounded-lg border border-[#eaeaea] bg-[#f9f9f9] p-6 sm:p-8">
          <h1 className="text-3xl font-semibold tracking-tight text-[#333333] sm:text-4xl">
            Thank you for your purchase!
          </h1>
          <p className="mt-4 text-base leading-7 text-[#5c5c5c]">
            Your order has been confirmed.
          </p>
          <Link
            className="mt-6 inline-flex rounded-sm bg-[#8377d1] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#6f64bb] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8377d1]"
            href="/"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </section>
  );
}
