import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight text-[#333333] sm:text-4xl">
            Contact us
          </h1>
          <p className="mt-4 text-base leading-7 text-[#5c5c5c] sm:text-lg sm:leading-8">
            Have a question about AllStore? Send us a message and we will get
            back to you as soon as we can.
          </p>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
