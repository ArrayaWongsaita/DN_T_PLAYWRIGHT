"use client";

import { useState } from "react";
import { BackLink } from "@/components/BackLink";

export default function Page() {
  const [accepted, setAccepted] = useState(false);
  const [shipping, setShipping] = useState("ส่งปกติ");
  const [province, setProvince] = useState("กรุงเทพ");
  return (
    <main>
      <BackLink />
      <h1>สมัครสมาชิก</h1>
      <p>
        <label>
          <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} /> ยอมรับเงื่อนไข
        </label>
      </p>
      <fieldset>
        <legend>การจัดส่ง</legend>
        {["ส่งด่วน", "ส่งปกติ"].map((v) => (
          <label key={v}>
            <input type="radio" name="shipping" checked={shipping === v} onChange={() => setShipping(v)} /> {v}{" "}
          </label>
        ))}
      </fieldset>
      <p>
        <label>
          จังหวัด{" "}
          <select value={province} onChange={(e) => setProvince(e.target.value)}>
            <option>กรุงเทพ</option>
            <option>เชียงใหม่</option>
            <option>ภูเก็ต</option>
          </select>
        </label>
      </p>
      <button disabled={!accepted}>สมัคร</button>
    </main>
  );
}
