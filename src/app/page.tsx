export default function Home() {
  return (
    <section className="flex flex-1 bg-[#f9f9f9]">
      <div className="mx-auto flex w-full max-w-6xl items-center px-5 py-16 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
        <div className="max-w-2xl border-l-4 border-[#9cbfa7] pl-5 sm:pl-7">
          <h1 className="text-4xl font-semibold tracking-tight text-[#333333] sm:text-5xl lg:text-6xl">
            A simple way to shop.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#5c5c5c] sm:mt-6 sm:text-lg sm:leading-8">
            A calm foundation for a clear and convenient shopping experience.
          </p>
        </div>
      </div>
    </section>
  );
}
