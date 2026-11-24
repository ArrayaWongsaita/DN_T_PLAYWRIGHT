import { BackLink } from "@/components/BackLink";
import { ProductList } from "@/components/ProductList";

export default function Page() {
  return (
    <main>
      <BackLink />
      <h1>สินค้า</h1>
      <ProductList endpoint="/api/lessons/12-mock-api/products" />
    </main>
  );
}
