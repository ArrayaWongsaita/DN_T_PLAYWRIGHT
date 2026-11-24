"use client";

import { useState } from "react";
import { BackLink } from "@/components/BackLink";

export default function Page() {
  const [count, setCount] = useState(0);
  return (
    <main>
      <BackLink />
      <h1>ตัวนับ</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button> <button onClick={() => setCount(0)}>รีเซ็ต</button>
    </main>
  );
}
