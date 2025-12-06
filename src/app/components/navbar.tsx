"use client";

import * as React from "react";
import { CATEGORIES_SLUGS } from "@/constants";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
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
    <NavigationMenu>
      <Link className="cursor-pointer text-white" href="/">
        Logo
      </Link>
      <NavigationMenuList className="flex-wrap">
        {categories.map((category) => (
          <NavigationMenuItem key={category}>
            <NavigationMenuTrigger onClick={() => handleClick(category)}>
              {category}
            </NavigationMenuTrigger>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

// const ItemContent = ({ category }: { category: string }) => {
//   const [products, setProducts] = React.useState<string[] | null>(null);

//   useEffect(() => {
//     const getProducts = async () => {
//       const response = await fetch(
//         `https://dummyjson.com/products/category/${category}?limit=5`
//       );
//       const data = await response.json();
//       setProducts(data.products);
//     };
//     getProducts();
//   }, [category]);
//   console.log(products);
//   if (products === null) return null;
//   return (
//     <NavigationMenuContent className="text-white">
//       <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
//         {products.map((product) => (
//           <ListItem
//             href={`/products/${product.id}`}
//             title={product.title}
//             key={product.id}
//           >
//             {product.description}
//           </ListItem>
//         ))}
//       </ul>
//     </NavigationMenuContent>
//   );
// };

// function ListItem({
//   title,
//   children,
//   href,
//   ...props
// }: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
//   return (
//     <li {...props}>
//       <NavigationMenuLink asChild>
//         <Link href={href}>
//           <div className="text-sm leading-none font-medium">{title}</div>
//           <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
//             {children}
//           </p>
//         </Link>
//       </NavigationMenuLink>
//     </li>
//   );
// }
