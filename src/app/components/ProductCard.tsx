"use client";

import { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      setProducts(data.products);
    };

    getProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
      {products.map((p) => (
        <div
          key={p.id}
          className="border rounded-lg shadow hover:shadow-lg transition"
        >
          {/* IMAGE */}
          <div className="relative w-full h-48">
            <img
              src={p.thumbnail}
              alt={p.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* CONTENT */}
          <div className="p-4">
            <h3 className="text-lg font-semibold">{p.title}</h3>

            <p className="text-sm text-gray-500">
              {p.brand} • {p.category}
            </p>

            <div className="flex items-center gap-2 mt-3">
              <span className="text-xl font-bold">${p.price}</span>
            </div>

            <p className="mt-2 text-sm">⭐ {p.rating}</p>

            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              View Product
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
