"use client";

import * as React from "react";
import { CATEGORIES_SLUGS } from "@/constants";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconPhoneDone,
  IconShoppingCartPlus,
  IconX,
  IconMinus,
  IconPlus,
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

import { useCart, CartItem } from "@/app/components/cardContext";

export default function NavigationMenuDemo() {
  const [categories, setCategories] = React.useState<string[] | null>(null);
  const router = useRouter();

  const { cart, removeFromCart, updateQuantity } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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
              <SheetTrigger className="size-11 relative">
                <IconShoppingCartPlus />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-destructive rounded-full">
                    {totalItems}
                  </span>
                )}
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Таны сагс ({totalItems})</SheetTitle>
                  <SheetDescription>
                    Таны сагсанд {totalItems} бүтээгдэхүүн байна.
                  </SheetDescription>
                </SheetHeader>

                <div className="mt-4 space-y-4 overflow-y-auto max-h-[75vh] pb-20">
                  {cart.length === 0 ? (
                    <p className="text-center text-muted-foreground pt-4">
                      Таны сагс хоосон байна.
                    </p>
                  ) : (
                    cart.map((item) => (
                      <CartItemDisplay
                        key={item.id}
                        item={item}
                        removeFromCart={removeFromCart}
                        updateQuantity={updateQuantity}
                      />
                    ))
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="absolute bottom-0 w-full p-4  bg-popover shadow-lg">
                    <div className="flex justify-between font-bold text-lg mb-2">
                      <span>Нийт:</span>
                      <span>${totalCost.toFixed(2)}</span>
                    </div>
                    <Button className="w-full bg-background text-card hover:bg-background/80 cursor-pointer">
                      Checkout
                    </Button>
                  </div>
                )}
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

const CartItemDisplay = ({
  item,
  removeFromCart,
  updateQuantity,
}: {
  item: CartItem;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, change: number) => void;
}) => {
  const handleRemove = () => {
    removeFromCart(item.id);
  };

  const handleDecrease = () => {
    updateQuantity(item.id, -1);
  };

  const handleIncrease = () => {
    updateQuantity(item.id, 1);
  };

  return (
    <div className="flex gap-4 items-center border rounded-2xl px-2 pb-4 pt-2">
      <img
        src={item.thumbnail}
        alt={item.title}
        className="w-16 h-16 object-cover rounded-md shrink-0"
      />
      <div className="grow">
        <p className="font-semibold text-sm text-popover line-clamp-1">
          {item.title}
        </p>
        <p className="text-card text-xs">Үнэ: ${item.price.toFixed(2)}</p>

        <div className="flex items-center space-x-1 mt-1">
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6 p-0 bg-popover"
            onClick={handleDecrease}
            disabled={item.quantity <= 1}
          >
            <IconMinus className="h-4 w-4" />
          </Button>
          <span className="w-6 text-center text-sm text-card font-medium">
            {item.quantity}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6 p-0 bg-popover"
            onClick={handleIncrease}
          >
            <IconPlus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col  items-end gap-1">
        <div className="font-bold whitespace-nowrap text-chart-1">
          ${(item.price * item.quantity).toFixed(2)}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleRemove}
          className="h-6 w-6 text-accent hover:bg-red-100/50"
        >
          <IconX className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

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
