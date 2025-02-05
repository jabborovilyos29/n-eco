import ProductListing from "@/components/ProductListing";
import { Product } from "@/types";
import { Suspense } from "react";

async function getProducts(): Promise<Product[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/products`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
}

export default async function HomePage() {
  const initialProducts = await getProducts();

  return (
    <Suspense fallback={<div>Loading</div>}>
      <ProductListing initialProducts={initialProducts} />
    </Suspense>
  );
}
