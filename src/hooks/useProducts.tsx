import { useEffect, useState } from "react";
import ProductDetail, { Product } from "@/app/products/[id]/page";
export const useProducts = (category: string) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch(
        `https://dummyjson.com/products/category/${category}`
      );
      const data = await res.json();
      setProducts(data.products);
      setLoading(false);
    };

    getProducts();
  }, [category]);
  return {
    products,
    loading,
  };
};

export const useProductDetail = (id: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await response.json();
      setProduct(data as Product);
    };
    fetchProduct();
  }, [id]);
  return product;
};
