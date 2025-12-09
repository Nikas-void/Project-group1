"use client";

import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "next/navigation";
import { Loader } from "lucide-react";

const Products = () => {
  const searchParams = useSearchParams();

  const category = searchParams.get("category");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const res = await fetch(
        `https://dummyjson.com/products/category/${category}`
      );
      const data = await res.json();
      setProducts(data.products);
      setLoading(false);
    };

    getProducts();
  }, [category]);

  return (
    <div className="container  max-w-full flex justify-around mt-6">
      {loading ? (
        <div className="h-screen w-full flex justify-center items-center">
          <Loader color="black" className="spin" />
        </div>
      ) : (
        products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
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
