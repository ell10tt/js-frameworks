"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import type { CartItem } from "@/types/cart";
import type { Product } from "@/types/product";

interface CartState {
  items: CartItem[];
  hasHydrated: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; product: Product }
  | { type: "REMOVE_ITEM"; productId: string }
  | { type: "INCREASE_QUANTITY"; productId: string }
  | { type: "DECREASE_QUANTITY"; productId: string }
  | { type: "CLEAR_CART" }
  | { type: "HYDRATE_CART"; items: CartItem[] };

interface CartContextValue {
  state: CartState;
  dispatch: Dispatch<CartAction>;
}

interface CartProviderProps {
  children: ReactNode;
}

const CART_STORAGE_KEY = "allstore-cart:v1";

const initialCartState: CartState = {
  items: [],
  hasHydrated: false,
};

export const CartContext = createContext<CartContextValue | undefined>(
  undefined,
);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isProductImage(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.url === "string" &&
    typeof value.alt === "string"
  );
}

function isReview(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.username === "string" &&
    typeof value.rating === "number" &&
    typeof value.description === "string"
  );
}

function isProduct(value: unknown): value is Product {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.title === "string" &&
    typeof value.description === "string" &&
    typeof value.price === "number" &&
    typeof value.discountedPrice === "number" &&
    isProductImage(value.image) &&
    typeof value.rating === "number" &&
    Array.isArray(value.tags) &&
    value.tags.every((tag) => typeof tag === "string") &&
    Array.isArray(value.reviews) &&
    value.reviews.every(isReview)
  );
}

function isCartItem(value: unknown): value is CartItem {
  return (
    isRecord(value) &&
    isProduct(value.product) &&
    typeof value.quantity === "number" &&
    Number.isInteger(value.quantity) &&
    value.quantity > 0
  );
}

function getStoredCartItems(): CartItem[] {
  try {
    const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);

    if (!storedCart) {
      return [];
    }

    const parsedCart: unknown = JSON.parse(storedCart);

    return Array.isArray(parsedCart) ? parsedCart.filter(isCartItem) : [];
  } catch {
    return [];
  }
}

function saveCartItems(items: CartItem[]) {
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE_CART":
      return { items: action.items, hasHydrated: true };
    case "ADD_ITEM": {
      const itemExists = state.items.some(
        (item) => item.product.id === action.product.id,
      );

      if (itemExists) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.product.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { product: action.product, quantity: 1 }],
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (item) => item.product.id !== action.productId,
        ),
      };
    case "INCREASE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      };
    case "DECREASE_QUANTITY":
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.product.id === action.productId
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          )
          .filter((item) => item.quantity > 0),
      };
    case "CLEAR_CART":
      return { ...initialCartState, hasHydrated: state.hasHydrated };
  }
}

export function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  useEffect(() => {
    dispatch({ type: "HYDRATE_CART", items: getStoredCartItems() });
  }, []);

  useEffect(() => {
    if (state.hasHydrated) {
      saveCartItems(state.items);
    }
  }, [state.hasHydrated, state.items]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error("useCart must be used within a CartProvider.");
  }

  return cartContext;
}
