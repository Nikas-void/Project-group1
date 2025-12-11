"use client";
import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { useCart } from "@/app/components/cardContext";

interface Product {
  id: number;
  title: string;
  brand: string;
  category: string;
  price: number;
  rating: number;
  images: string[];
  thumbnail: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  const { addToCart } = useCart();

  useEffect(() => {
    const getProduct = async () => {
      const response = await fetch(
        `https://dummyjson.com/products/category/smartphones`
      );
      const result = await response.json();
      setProducts(result.products as Product[]);
    };
    getProduct();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    console.log(`Product ${product.title} added to cart!`);
  };

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 pb-[20%] md:grid-cols-3 lg:grid-cols-4">
      {products.slice(0, 4).map((product) => (
        <div key={product.id} className="w-full flex justify-center sm:px-2">
          <div className="">
            <div className="border  flex-wrap  rounded-lg shadow hover:shadow-lg transition">
              <Carousel className="w-full max-w-xs ">
                <CarouselContent>
                  {product.images.map((image: string) => (
                    <CarouselItem key={image}>
                      <Image
                        src={image}
                        width={400}
                        alt="product image"
                        height={400}
                      ></Image>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-1" />
                <CarouselNext className="right-1" />
              </Carousel>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-card">
                  {product.title}
                </h3>
                <p className="text-sm text-card ">
                  {product.brand} • {product.category}
                </p>
                <div className="flex items-center gap-2 mt-3 text-card">
                  <span className="text-xl font-bold">${product.price}</span>
                </div>
                <p className="mt-2 text-sm text-card">⭐ {product.rating}</p>

                <Button
                  onClick={() => handleAddToCart(product)}
                  className="mt-4 w-full bg-primary text-muted py-2 rounded-lg hover:bg-popover transition"
                >
                  Add to Cart
                </Button>

                <Link href={`products/${product.id}`} className="block">
                  <Button
                    variant="outline"
                    className="mt-2 w-full border-primary text-primary hover:bg-accent/10 py-2 rounded-lg transition"
                  >
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      ))}
    </div>
  );
}
