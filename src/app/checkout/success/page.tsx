import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <section className="flex min-h-[70vh] w-full items-center justify-center bg-[#f9f9f9] px-5 py-10 sm:px-8">
      <div className="w-full max-w-lg rounded-lg bg-white px-5 py-10 text-center shadow-[0_10px_30px_rgba(0,0,0,0.05)] sm:px-10 sm:py-15">
        <div aria-hidden="true" className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#9cbfa7] text-4xl text-white">
          ✓
        </div>
        <div className="mt-8">
          <h1 className="text-3xl font-medium text-[#333333]">
            Thank you for your purchase!
          </h1>
          <p className="mt-5 text-lg text-[#333333]">
            Your order has been confirmed.
          </p>
          <Link
            className="mt-10 inline-flex rounded-sm bg-[#9cbfa7] px-9 py-4 text-base font-medium text-white transition-[filter] hover:brightness-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9cbfa7]"
            href="/"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </section>
  );
}
