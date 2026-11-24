"use client";

import { useState } from "react";
import { BackLink } from "@/components/BackLink";

export default function Page() {
  const [ready, setReady] = useState(false);
  return (
    <main>
      <BackLink />
      <h1>ปุ่มโหลด</h1>
      <button onClick={() => setReady(true)}>โหลด</button>
      {ready && <p>พร้อมแล้ว</p>}
    </main>
  );
}
