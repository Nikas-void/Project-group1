"use client";

import * as React from "react";
import Link from "next/link";
import { CATEGORIES_SLUGS } from "@/constants";
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useEffect } from "react";

export const Products = () => {
  return;
};

export default function NavigationMenuDemo() {
  const [categories, setCategories] = React.useState<string[] | null>(null);
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
  console.log(categories);
  if (!categories) return null;
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex-wrap">
        {categories.map((category) => (
          <NavigationMenuItem key={category}>
            <NavigationMenuTrigger>{category}</NavigationMenuTrigger>
            <ItemContent category={category}></ItemContent>
          </NavigationMenuItem>
        ))}
        {/* <NavigationMenuItem>
          <NavigationMenuTrigger>iphone</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6"
                    href="/"
                  >
                    <div className="mb-2 text-lg font-medium sm:mt-4">
                      Products
                    </div>
                    <p className="text-muted-foreground text-sm leading-tight">
                      You can see all our products placed on our Site.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Iphone 17">
                Innovative design for ultimate performance and battery life.
              </ListItem>
              <ListItem href="/docs/installation" title="iPhone Air">
                The thinnest iPhone ever. With the power of pro inside.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="iPhone 17">
                Even more delightful. Even more durable.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Watches</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <ListItem href="" title="i Series 11">
                watch1
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem> */}
      </NavigationMenuList>
    </NavigationMenu>
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
    <NavigationMenuContent className="text-white">
      <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
        {products.map((product) => (
          <ListItem
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
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
