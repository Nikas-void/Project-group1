"use client";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { IconPlus } from "@tabler/icons-react";
import Image from "next/image";
import { use, useEffect, useState } from "react";

const ProductDetail = ({ params }: { params: Promise<{ id: string }> }) => {
  const [product, setProduct] = useState<any>(null);
  const { id } = use(params);
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await response.json();
      setProduct(data);
    };
    fetchProduct();
  }, []);

  if (!product) return <div>...loading</div>;

  return (
    <div className="h-screen">
      <div className="flex mt-10 justify-around px-20 ">
        <div className="border-2 rounded-2xl shadow-2xl ">
          <Carousel className="w-full max-w-xs ">
            <CarouselContent>
              {product.images.map((imageSrc: any) => (
                <CarouselItem key={imageSrc}>
                  <Image
                    src={imageSrc}
                    alt={product.title}
                    width={400}
                    height={400}
                  ></Image>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div>
          <div className="border-b-2 border-black">
            <span className="flex max-w-[500px] text-2xl items-center text-card">
              {product.description}
            </span>
          </div>
          <div className="grid grid-cols-2 text-card">
            <div className="flex flex-col gap-3">
              <span className="flex text-3xl font-bold  w-full">
                <span className="text-2xl font-light text-red-600 ">
                  {product.discountPercentage}%off
                </span>
                <p className="text-[15px] font-light mt-0 text-card">USD</p>
                {(
                  product.price -
                  (product.price / 100) * product.discountPercentage
                ).toFixed(2)}
              </span>
              <span className=" font-bold ">
                orginal price: <del>${product.price}</del>
              </span>
              <div>
                <Button className="w-50 text-2xl bg-popover hover:bg-primary">
                  <IconPlus /> Plus
                </Button>
              </div>
            </div>
            <div className="flex flex-col text-sl font-bold">
              <span>Brand: {product.brand}</span>
              <span>Rating: {product.rating}</span>
              <span>In Stock: {product.stock}</span>
              <span>{}</span>
              <span>{}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
