"use client";

import { useEffect, useState } from "react";
import { BackLink } from "@/components/BackLink";

export default function Page() {
  const [message, setMessage] = useState<string | null>(null);
  useEffect(() => {
    fetch("/api/lessons/11-auto-waiting/message")
      .then((r) => r.json())
      .then((d) => setMessage(d.message));
  }, []);
  return (
    <main>
      <BackLink />
      <h1>โหลดข้อมูล</h1>
      {message === null ? <p>กำลังโหลด...</p> : <p>{message}</p>}
    </main>
  );
}
