"use client";
import React, { useState } from "react";
import { useEffect } from "react";
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

export default function home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProduct = async () => {
      const response = await fetch(
        `https://dummyjson.com/products/category/smartphones`
      );
      const result = await response.json();
      console.log(result);
      setProducts(result.products);
    };
    getProduct();
  }, []);
  console.log(products);
  return (
    <div className=" flex justify-between">
      {products.slice(0, 4).map((product: any) => (
        <div key={product.id} className=" w-fit mx-10">
          <div className="w-full">
            <div className="border rounded-lg shadow hover:shadow-lg transition">
              <Carousel className="w-full  max-w-xs ">
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

                <Link href={`products/${product.id}`}>
                  <Button className="mt-4 w-full bg-primary text-muted py-2 rounded-lg hover:bg-popover transition">
                    View Product
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
