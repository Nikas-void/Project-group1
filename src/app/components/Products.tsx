"use client";

import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "next/navigation";
import { Loader } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
const Products = () => {
  const searchParams = useSearchParams();

  const category = searchParams.get("category");
  const { products, loading } = useProducts(category || "");
  return (
    <div className="container min-h-[calc(100vh-11rem)]  max-w-full flex justify-around mt-6">
      {loading ? (
        <div className="h-screen w-full flex justify-center items-center">
          <Loader color="black" className="spin" />
        </div>
      ) : (
        products.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default Products;
