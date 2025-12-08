"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/shop?search=${encodeURIComponent(query)}`);
  }

  return (
    <form onSubmit={handleSearch} className=" w-full ">
      <input
        type="text"
        className=" bg-popover p-3 border w-full rounded-xl shadow"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}
