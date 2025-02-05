"use client";
import { Product } from "@/types";
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Sorting from "./Sorting";
import ProductCard from "./ProductCard";
import useDebounce from "@/hooks/useDebounce";

interface ProductListingProps {
  initialProducts: Product[];
}

export default function ProductListing({
  initialProducts,
}: ProductListingProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchTerm = useDebounce(searchQuery, 700);
  const [sortBy, setSortBy] = useState<"price" | "rating" | "">("");
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    let filtered = initialProducts.filter((product) =>
      product.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
    );
    if (sortBy) {
      filtered = filtered.sort((a, b) => a[sortBy] - b[sortBy]);
    }
    setProducts(filtered);
  }, [debouncedSearchTerm, sortBy, initialProducts]);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row justify-between mb-4">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <Sorting sortBy={sortBy} onChange={setSortBy} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.slice(0, visibleCount).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {visibleCount < products.length && (
        <div className="text-center mt-6">
          <button
            onClick={loadMore}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Load More
          </button>
        </div>
      )}
    </main>
  );
}
