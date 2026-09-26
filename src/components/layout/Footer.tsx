export default function Footer() {
  return (
    <footer className="mt-8 border-t-6 border-[#8377d1] bg-white text-[#333333]">
      <div className="mx-auto grid max-w-[1200px] gap-8 px-5 py-8 text-sm leading-6 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-5">
        <div>
          <h2 className="text-xl font-medium">Customer Service</h2>
          <ul className="mt-3 space-y-1 text-[#5c5c5c]">
            <li>Contact Us</li>
            <li>FAQ</li>
            <li>Shipping &amp; Returns</li>
            <li>Payment Options</li>
            <li>Order Tracking</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-medium">Information</h2>
          <ul className="mt-3 space-y-1 text-[#5c5c5c]">
            <li>Privacy Policy</li>
            <li>Terms &amp; Conditions</li>
            <li>Size Guide</li>
            <li>Careers</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-medium">Contact</h2>
          <ul className="mt-3 space-y-1 text-[#5c5c5c]">
            <li>Email: support@allshop.com</li>
            <li>Phone: +1 (555) 123-4567</li>
          </ul>
          <h2 className="mt-5 text-xl font-medium">Live Chat</h2>
          <p className="mt-3 text-[#5c5c5c]">Available 9AM–6PM (Mon–Fri)</p>
        </div>
        <div>
          <h2 className="text-xl font-medium">AllStore</h2>
          <p className="mt-3 text-[#5c5c5c]">
            A simple shopping experience.
          </p>
        </div>
      </div>
    </footer>
  );
}
