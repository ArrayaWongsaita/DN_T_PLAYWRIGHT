"use client";

import { useRouter } from "next/navigation";
import { products, useCart } from "@/lib/shop";

export default function CartPage() {
  const cart = useCart();
  const router = useRouter();
  const lines = cart.map((c) => ({ ...products.find((p) => p.id === c.id)!, qty: c.qty }));
  const total = lines.reduce((sum, l) => sum + l.price * l.qty, 0);
  return (
    <main>
      <h1>ตะกร้า</h1>
      {lines.length === 0 ? (
        <p>ตะกร้าว่างเปล่า</p>
      ) : (
        <>
          <ul>
            {lines.map((l) => (
              <li key={l.id}>{`${l.name} x${l.qty} ฿${l.price * l.qty}`}</li>
            ))}
          </ul>
          <p>{`รวม ฿${total}`}</p>
          <button onClick={() => router.push("/shop/checkout")}>ไปชำระเงิน</button>
        </>
      )}
    </main>
  );
}
