"use client";

import { useState } from "react";
import { BackLink } from "@/components/BackLink";

export default function Page() {
  const [items, setItems] = useState(["แอปเปิล", "กล้วย"]);
  return (
    <main>
      <BackLink />
      <h1>ฟอร์มและรายการ</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <p>
          <label>
            อีเมล <input type="email" placeholder="you@example.com" />
          </label>
        </p>
        <p>
          <label>
            รหัสผ่าน <input type="password" />
          </label>
        </p>
      </form>
      <ul>
        {items.map((name) => (
          <li key={name}>
            {name} <button onClick={() => setItems(items.filter((i) => i !== name))}>ลบ</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
