"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ProductResult {
  id: number;
  title: string;
  price: number;
  thumbnail?: string;
  category?: string;
}

const ALLOWED_CATEGORIES = [
  "laptops",
  "mens-watches",
  "womens-watches",
  "mobile-accessories",
  "smartphones",
  "sunglasses",
  "tablets",
];

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ProductResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const searchProducts = async (text: string) => {
    if (!text.trim()) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    try {
      const res = await fetch(
        `https://dummyjson.com/products/search?q=${encodeURIComponent(text)}`
      );

      if (!res.ok) {
        throw new Error(`API call failed with status: ${res.status}`);
      }

      const data = await res.json();
      const filtered = (data.products || []).filter((product: ProductResult) =>
        ALLOWED_CATEGORIES.includes(product.category || "")
      );
      setResults(filtered);
      setShowDropdown(true);
    } catch (error) {
      console.error("Error fetching products:", error);
      setResults([]);
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      searchProducts(query);
    }, 350);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  function handleProductClick(productId: number) {
    router.push(`/products/${productId}`);
    setQuery("");
    setResults([]);
    setShowDropdown(false);
  }

  return (
    <div className="w-full relative">
      <form onSubmit={handleFormSubmit} className="w-full">
        <input
          type="text"
          className="bg-popover text-white p-3 border border-[#333] w-full rounded-lg shadow placeholder-accent"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
      {showDropdown && results.length > 0 && (
        <div className="absolute top-12 left-0 w-full bg-popover border  rounded-lg shadow-lg max-h-[300px] overflow-y-auto z-50">
          {results.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              className="flex items-center gap-3 p-3 hover:bg-primary cursor-pointer border-b  border-primary last:border-b-0"
            >
              {product.thumbnail && (
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  width={40}
                  height={60}
                  className="rounded object-cover"
                />
              )}
              <div className="flex-1">
                <p className="text-white text-sm font-medium">
                  {product.title}
                </p>
                <p className="text-gray-400 text-xs">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
