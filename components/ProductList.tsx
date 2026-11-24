"use client";

import { useEffect, useState } from "react";

type Item = { id: number; name: string };
type State = { status: "loading" } | { status: "error" } | { status: "ready"; items: Item[] };

export function ProductList({ endpoint }: { endpoint: string }) {
  const [state, setState] = useState<State>({ status: "loading" });
  useEffect(() => {
    fetch(endpoint)
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json() as Promise<Item[]>;
      })
      .then((items) => setState({ status: "ready", items }))
      .catch(() => setState({ status: "error" }));
  }, [endpoint]);

  if (state.status === "loading") return <p>กำลังโหลด...</p>;
  if (state.status === "error") return <p>เกิดข้อผิดพลาด</p>;
  if (state.items.length === 0) return <p>ไม่มีสินค้า</p>;
  return (
    <ul>
      {state.items.map((i) => (
        <li key={i.id}>{i.name}</li>
      ))}
    </ul>
  );
}
