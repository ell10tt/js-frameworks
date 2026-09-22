"use client";

import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/product";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { dispatch } = useCart();

  function handleAddToCart() {
    dispatch({ type: "ADD_ITEM", product });
    toast.success("Added to cart");
  }

  return (
    <button
      className="mt-8 w-full rounded-sm bg-[#8377d1] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#6f64bb] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8377d1] sm:w-auto"
      onClick={handleAddToCart}
      type="button"
    >
      Add to Cart
    </button>
  );
}
