"use client";

import { useEffect, useState } from "react";
import { addToCart, type Product } from "@/lib/shop";

export default function ShopPage() {
  const [items, setItems] = useState<Product[]>([]);
  useEffect(() => {
    fetch("/api/shop/products")
      .then((r) => r.json())
      .then(setItems);
  }, []);
  return (
    <main>
      <h1>ร้านค้า</h1>
      {items.map((p) => (
        <article key={p.id} style={{ border: "1px solid #ccc", padding: "0.5rem", margin: "0.5rem 0" }}>
          <h2>{p.name}</h2>
          <p>฿{p.price}</p>
          <button onClick={() => addToCart(p.id)}>{`เพิ่ม ${p.name} ลงตะกร้า`}</button>
        </article>
      ))}
    </main>
  );
}
