"use client";

import { useState } from "react";
import { BackLink } from "@/components/BackLink";

export default function Page() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  return (
    <main>
      <BackLink />
      <h1>ทักทาย</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setMessage(name.trim() ? `สวัสดี, ${name}` : "กรุณากรอกชื่อ");
        }}
      >
        <label>
          ชื่อ <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>{" "}
        <button type="submit">ทักทาย</button>
      </form>
      {message && <p>{message}</p>}
    </main>
  );
}
