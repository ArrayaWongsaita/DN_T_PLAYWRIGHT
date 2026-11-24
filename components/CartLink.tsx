"use client";

import Link from "next/link";
import { useCart } from "@/lib/shop";

export function CartLink() {
  const count = useCart().reduce((n, c) => n + c.qty, 0);
  return <Link href="/shop/cart">{`ตะกร้า (${count})`}</Link>;
}
