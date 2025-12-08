"use client";

import Image from "next/image";

const Products = ({ product }) => {
  return (
    <div className="w-full">
      <div className="border rounded-lg shadow hover:shadow-lg transition">
        <div className="relative w-full h-48">
          <Image
            width={200}
            height={120}
            src={product.images[0]}
            alt={"not found"}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold">{product.title}</h3>

          <p className="text-sm text-gray-500">
            {product.brand} • {product.category}
          </p>

          <div className="flex items-center gap-2 mt-3">
            <span className="text-xl font-bold">${product.price}</span>
          </div>

          <p className="mt-2 text-sm">⭐ {product.rating}</p>

          <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            View Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
