import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <section className="flex w-full items-center justify-center bg-[#f9f9f9] px-5 py-12 sm:min-h-[80vh] sm:px-8">
      <div className="w-full max-w-xl rounded-lg bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] sm:p-10">
          <h1 className="text-center text-3xl font-medium text-[#333333]">
            Contact us
          </h1>
          <p className="mt-4 text-center text-base leading-7 text-[#5c5c5c]">
            Have a question about AllStore? Send us a message and we will get
            back to you as soon as we can.
          </p>

          <ContactForm />
      </div>
    </section>
  );
}
