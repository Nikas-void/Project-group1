import { Suspense } from "react";
import Products from "../components/Products";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>;
}) => {
  const query = await searchParams;
  return (
    <Suspense fallback={<div></div>}>
      <Products category={query.category} />;
    </Suspense>
  );
};

export default Page;
