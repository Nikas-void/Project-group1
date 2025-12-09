"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const Products = ({ product }) => {
  const router = useRouter();
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
          <h3 className="text-lg font-semibold text-card">{product.title}</h3>

          <p className="text-sm text-card ">
            {product.brand} • {product.category}
          </p>

          <div className="flex items-center gap-2 mt-3 text-card">
            <span className="text-xl font-bold">${product.price}</span>
          </div>

          <p className="mt-2 text-sm text-card">⭐ {product.rating}</p>

          <Button
            className="mt-4 w-full bg-primary text-muted py-2 rounded-lg hover:bg-popover transition"
            onClick={() => {
              router.push(`products/${product.id}`);
            }}
          >
            View Product
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Products;
