"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/cart", label: "Cart" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const { state } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItemCount = state.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <header className="relative z-30 h-20 bg-white">
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-5 sm:px-8 lg:px-5">
        <Link
          aria-label="AllStore home"
          className="shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9cbfa7]"
          href="/"
        >
          <Image
            alt="AllStore"
            className="h-auto w-30 sm:w-[157px]"
            height={61}
            src="/images/allstore-logo.svg"
            width={244}
          />
        </Link>
        <nav aria-label="Primary navigation" className="hidden md:block">
          <ul className="flex items-center gap-16 text-2xl font-normal text-[#272932]">
            {navigationItems.map(({ href, label }) => (
              <li key={href}>
                <Link
                  className="rounded-sm transition-colors hover:text-[#9cbfa7] focus-visible:text-[#9cbfa7] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9cbfa7]"
                  href={href}
                >
                  {href === "/cart" ? `${label} (${cartItemCount})` : label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          aria-label="Open menu"
          className="flex h-10 w-10 items-center justify-center rounded-sm text-[#272932] transition-colors hover:text-[#9cbfa7] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9cbfa7] md:hidden"
          onClick={() => setIsMenuOpen(true)}
          type="button"
        >
          <svg aria-hidden="true" fill="none" height="24" viewBox="0 0 24 24" width="24">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
          </svg>
        </button>
      </div>
      <div
        aria-hidden={!isMenuOpen}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden ${isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setIsMenuOpen(false)}
      />
      <aside
        aria-label="Mobile navigation"
        className={`fixed inset-y-0 right-0 z-50 flex w-70 flex-col bg-white p-5 shadow-[-5px_0_15px_rgba(0,0,0,0.1)] transition-transform md:hidden ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        id="mobile-navigation"
      >
        <div className="flex items-center justify-between border-b border-[#eaeaea] pb-4">
          <span className="[font-family:var(--font-logo)] text-2xl text-[#333333]">Menu</span>
          <button
            aria-label="Close menu"
            className="rounded-sm p-1 text-[#333333] transition-colors hover:text-[#9cbfa7] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9cbfa7]"
            onClick={() => setIsMenuOpen(false)}
            type="button"
          >
            <svg aria-hidden="true" fill="none" height="24" viewBox="0 0 24 24" width="24">
              <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </button>
        </div>
        <nav aria-label="Mobile menu" className="mt-7">
          <ul className="space-y-5 text-xl font-medium text-[#333333]">
            {navigationItems.map(({ href, label }) => (
              <li key={href}>
                <Link
                  className="rounded-sm transition-colors hover:text-[#9cbfa7] focus-visible:text-[#9cbfa7] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9cbfa7]"
                  href={href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {href === "/cart" ? `${label} (${cartItemCount})` : label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </header>
  );
}
