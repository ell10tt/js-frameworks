"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/cart", label: "Cart" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const { state } = useCart();
  const cartItemCount = state.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <header className="border-b border-[#eaeaea] bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-5 gap-y-4 px-5 py-4 sm:flex-nowrap sm:px-8 sm:py-5 lg:px-10">
        <Link
          aria-label="AllStore home"
          className="shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8377d1]"
          href="/"
        >
          <Image
            alt="AllStore"
            className="h-auto w-32 sm:w-36"
            height={61}
            priority
            src="/images/allstore-logo.svg"
            width={244}
          />
        </Link>
        <nav aria-label="Primary navigation" className="w-full sm:w-auto">
          <ul className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 text-sm font-medium text-[#333333] sm:justify-end sm:gap-x-8 sm:text-base">
            {navigationItems.map(({ href, label }) => (
              <li key={href}>
                <Link
                  className="rounded-sm transition-colors hover:text-[#8377d1] focus-visible:text-[#8377d1] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8377d1]"
                  href={href}
                >
                  {href === "/cart" ? `${label} (${cartItemCount})` : label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
