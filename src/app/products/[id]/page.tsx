"use client";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { IconPlus, IconStar } from "@tabler/icons-react";
import { useProductDetail } from "@/hooks/useProducts";
import { useCart } from "@/app/components/cardContext";
import { use } from "react";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  brand: string;
  rating: number;
  stock: number;
  images: string[];
  thumbnail: string;
}

const ProductDetail = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { addToCart } = useCart();
  const product = useProductDetail(id);
  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  if (!product)
    return (
      <div className="flex items-center justify-center h-screen text-lg">
        Loading...
      </div>
    );

  const discountedPrice = (
    product.price -
    (product.price / 100) * product.discountPercentage
  ).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Carousel */}
        <div className="flex items-center justify-center">
          <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-[500px]">
            <Carousel>
              <CarouselContent>
                {product.images?.map((imageSrc) => (
                  <CarouselItem key={imageSrc}>
                    <div className="flex justify-center">
                      <Image
                        src={imageSrc}
                        alt={product.title}
                        width={400}
                        height={400}
                        className="object-contain"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center space-y-6">
          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              {product.brand}
            </p>
            <h1 className="text-4xl font-bold text-gray-900 mt-2">
              {product.title}
            </h1>
            <p className="text-gray-600 mt-4 text-lg leading-relaxed max-w-md">
              {product.description}
            </p>
          </div>

          {/* Price Section */}
          <div className="bg-white rounded-2xl p-6 shadow-md space-y-3">
            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold text-gray-900">
                ${discountedPrice}
              </span>
              <span className="text-xl text-gray-400 line-through">
                ${product.price}
              </span>
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {product.discountPercentage}% OFF
              </span>
            </div>
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-2xl p-6 shadow-md grid grid-cols-2 gap-6">
            <div>
              <p className="text-gray-500 text-sm uppercase tracking-wide mb-2">
                Rating
              </p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-900">
                  {product.rating}
                </span>
                <IconStar className="text-yellow-400" fill="currentColor" />
              </div>
            </div>
            <div>
              <p className="text-gray-500 text-sm uppercase tracking-wide mb-2">
                Stock
              </p>
              <p
                className={`text-2xl font-bold ${
                  product.stock > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.stock > 0
                  ? `${product.stock} Available`
                  : "Out of Stock"}
              </p>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full py-6 text-lg font-semibold bg-primary hover:bg-popover text-white rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
          >
            <IconPlus size={24} />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
