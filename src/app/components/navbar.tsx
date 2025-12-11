"use client";

import * as React from "react";
import { CATEGORIES_SLUGS } from "@/constants";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconPhoneDone,
  IconShoppingCartPlus,
} from "@tabler/icons-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SearchBar from "@/app/components/searchbar";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NavigationMenuDemo() {
  const [categories, setCategories] = React.useState<string[] | null>(null);
  const router = useRouter();

  React.useEffect(() => {
    const getProduct = async () => {
      const response = await fetch(
        "https://dummyjson.com/products/category-list"
      );
      const data = await response.json();
      const filteredData = data.filter((slug: string) =>
        CATEGORIES_SLUGS.includes(slug)
      );
      setCategories(filteredData);
    };
    getProduct();
  }, []);

  if (!categories) return null;

  const handleClick = (category: string) => {
    router.push(`/products/?category=${category}`);
  };

  return (
    <div className="bg-primary flex flex-col ">
      <div className="p-4 flex justify-between gap-2">
        <div className="text-foreground cursor-pointer">
          <Link href="/">i Space-д тавтай морилно уу</Link>
        </div>
        <div className="w-[70%] flex justify-center ">
          <SearchBar />
        </div>
        <div>
          <div className="text-foreground">
            <Sheet>
              <SheetTrigger className="size-11">
                <IconShoppingCartPlus />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Таны сагс </SheetTitle>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      <NavigationMenu className="p-2">
        <NavigationMenuList className="flex-wrap">
          {categories.map((category) => (
            <NavigationMenuItem
              onClick={() => handleClick(category)}
              key={category}
            >
              <NavigationMenuTrigger>{category}</NavigationMenuTrigger>
              <ItemContent category={category}></ItemContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const ItemContent = ({ category }: { category: string }) => {
  const [products, setProducts] = React.useState<string[] | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch(
        `https://dummyjson.com/products/category/${category}?limit=5`
      );
      const data = await response.json();
      setProducts(data.products);
    };
    getProducts();
  }, [category]);
  console.log(products);
  if (products === null) return null;
  return (
    <NavigationMenuContent className="text-foreground">
      <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
        {products.map((product: any) => (
          <ListItem
            thumbnail={product.thumbnail}
            href={`/products/${product.id}`}
            title={product.title}
            key={product.id}
          >
            {product.description}
          </ListItem>
        ))}
      </ul>
    </NavigationMenuContent>
  );
};

function ListItem({
  title,
  children,
  thumbnail,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & {
  href: string;
  title: string;
  thumbnail: string;
}) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="flex flex-row gap-5">
            <img src={thumbnail} className="h-20 w-20"></img>
            <div className="flex flex-col">
              <div className="text-sm leading-none font-medium">{title}</div>
              <p className="text-foreground line-clamp-2 text-sm leading-snug">
                {children}
              </p>
            </div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
