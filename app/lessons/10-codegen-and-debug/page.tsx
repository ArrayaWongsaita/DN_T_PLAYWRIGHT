"use client";

import { useState } from "react";
import { BackLink } from "@/components/BackLink";

export default function Page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [news, setNews] = useState(false);
  const [message, setMessage] = useState("");
  return (
    <main>
      <BackLink />
      <h1>สมัครรับข่าว</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setMessage(name.trim() ? "สมัครสำเร็จ" : "กรุณากรอกชื่อ");
        }}
      >
        <p>
          <label>
            ชื่อ <input value={name} onChange={(e) => setName(e.target.value)} />
          </label>
        </p>
        <p>
          <label>
            อีเมล <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
        </p>
        <p>
          <label>
            <input type="checkbox" checked={news} onChange={(e) => setNews(e.target.checked)} /> รับข่าวสาร
          </label>
        </p>
        <button type="submit">สมัคร</button>
      </form>
      {message && <p>{message}</p>}
    </main>
  );
}
