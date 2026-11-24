"use client";

import { useState } from "react";
import { BackLink } from "@/components/BackLink";

export default function Page() {
  const [open, setOpen] = useState(false);
  return (
    <main>
      <BackLink />
      <h1>สินค้า</h1>
      <button onClick={() => setOpen(!open)}>{open ? "ซ่อนรายละเอียด" : "แสดงรายละเอียด"}</button>
      {open && <p>รายละเอียดสินค้า</p>}
      <ul>
        <li>ชา</li>
        <li>กาแฟ</li>
        <li>นม</li>
      </ul>
      <button disabled>ซื้อเลย</button>
    </main>
  );
}
