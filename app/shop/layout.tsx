import Link from "next/link";
import type { ReactNode } from "react";
import { CartLink } from "@/components/CartLink";

export default function ShopLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <nav style={{ display: "flex", gap: "1rem" }}>
        <Link href="/">หน้าแรก</Link>
        <Link href="/shop">ร้านค้า</Link>
        <CartLink />
      </nav>
      {children}
    </>
  );
}
