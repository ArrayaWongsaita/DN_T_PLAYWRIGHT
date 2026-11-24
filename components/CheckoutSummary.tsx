"use client";

import { useState } from "react";
import { clearCart, products, useCart, useHydrated } from "@/lib/shop";

export function CheckoutSummary() {
  const cart = useCart();
  const hydrated = useHydrated();
  const [done, setDone] = useState(false);
  const total = cart.reduce((sum, c) => sum + products.find((p) => p.id === c.id)!.price * c.qty, 0);

  if (done) return <p>สั่งซื้อสำเร็จ</p>;
  return (
    <>
      <p>{`ยอดชำระ ฿${total}`}</p>
      <button
        disabled={!hydrated}
        onClick={() => {
          clearCart();
          setDone(true);
        }}
      >
        ยืนยันการสั่งซื้อ
      </button>
    </>
  );
}
