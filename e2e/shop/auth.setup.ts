import { test as setup, expect } from "@playwright/test";

// ================================================
// บทที่ 17 (ส่วนที่ 1): login ครั้งเดียว เก็บ session ไว้ใช้ซ้ำ
// ฝึก: setup project, page.context().storageState({ path })
//
// ถ้าทุก test ต้อง login เองจะช้าและซ้ำซ้อน วิธีที่นิยม:
//   1) ไฟล์ setup นี้ login "ครั้งเดียว" แล้วบันทึก cookie ลงไฟล์ playwright/.auth/user.json
//   2) test ที่ต้องการ login แล้ว ใช้ test.use({ storageState: "playwright/.auth/user.json" })
//
// playwright.config.ts มี project ชื่อ "setup" (รันไฟล์ auth.setup.ts) และ project chromium
// ตั้ง dependencies: ["setup"] ไว้แล้ว Playwright จึงรัน setup ให้ก่อนทุกครั้ง
//
//   await page.context().storageState({ path: "playwright/.auth/user.json" });
// ================================================

export const authFile = "playwright/.auth/user.json";

// ------------------------------------------------
// ข้อ 1: เปิด /shop/login กรอก demo / 1234 กด "เข้าสู่ระบบ" รอจนกลับมาหน้า /shop (toHaveURL)
//        แล้วเก็บ storageState ลง authFile
// แนวทาง: เปลี่ยน setup.fixme เป็น setup
// ------------------------------------------------
setup.fixme("login แล้วเก็บ storageState", async ({ page }) => {});
// 👉 เขียน setup ของข้อ 1 ตรงนี้
