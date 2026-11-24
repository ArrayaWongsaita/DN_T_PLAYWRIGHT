import { products } from "@/lib/products";

export const dynamic = "force-dynamic";

export function GET() {
  return Response.json(products);
}
