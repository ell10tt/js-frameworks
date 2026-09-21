import type { ProductListResponse, ProductResponse } from "@/types/product";

const ONLINE_SHOP_ENDPOINT = "https://v2.api.noroff.dev/online-shop";

export class OnlineShopApiError extends Error {
  constructor(public readonly status: number) {
    super(`request failed ${status}.`);
    this.name = "OnlineShopApiError";
  }
}

async function getApiResponse<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new OnlineShopApiError(response.status);
  }

  return (await response.json()) as T;
}

export function getProducts(): Promise<ProductListResponse> {
  return getApiResponse<ProductListResponse>(ONLINE_SHOP_ENDPOINT);
}

export function getProduct(id: string): Promise<ProductResponse> {
  return getApiResponse<ProductResponse>(
    `${ONLINE_SHOP_ENDPOINT}/${encodeURIComponent(id)}`,
  );
}
