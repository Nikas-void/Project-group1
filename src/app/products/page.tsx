import { Suspense } from "react";
import Products from "../components/Products";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>;
}) => {
  const query = await searchParams;
  return <Products category={query.category} />;
};

export default Page;
