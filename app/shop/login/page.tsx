"use client";

import { useState } from "react";
import { useHydrated } from "@/lib/shop";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const hydrated = useHydrated();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/shop/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) {
      setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
      return;
    }
    const next = new URLSearchParams(window.location.search).get("next");
    window.location.assign(next && next.startsWith("/") ? next : "/shop");
  }

  return (
    <main>
      <h1>เข้าสู่ระบบ</h1>
      <form onSubmit={submit}>
        <p>
          <label>
            ชื่อผู้ใช้ <input disabled={!hydrated} value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
        </p>
        <p>
          <label>
            รหัสผ่าน <input disabled={!hydrated} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
        </p>
        <button type="submit" disabled={!hydrated}>เข้าสู่ระบบ</button>
      </form>
      {error && <p role="alert">{error}</p>}
    </main>
  );
}
