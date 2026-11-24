"use client";

import { useState } from "react";
import { BackLink } from "@/components/BackLink";

export default function Page() {
  const [fruits, setFruits] = useState(["แอปเปิล", "กล้วย", "องุ่น"]);
  return (
    <main>
      <BackLink />
      <h1>ผลไม้</h1>
      <ul>
        {fruits.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      <button onClick={() => setFruits([...fruits, "ส้ม"])}>เพิ่มผลไม้</button>
    </main>
  );
}
