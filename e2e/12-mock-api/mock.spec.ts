import { test, expect } from "@playwright/test";

// ================================================
// บทที่ 12: mock API ด้วย page.route
// ฝึก: page.route, route.fulfill, page.waitForRequest
//
// หน้า /lessons/12-mock-api เรียก GET /api/lessons/12-mock-api/products (ได้ ชา กับ กาแฟ)
// page.route ดักคำขอ แล้วตอบกลับเองโดยไม่ไปถึงเซิร์ฟเวอร์ (เหมือน vi.spyOn(fetch) ที่เคยเรียน)
//
//   await page.route("**/api/lessons/12-mock-api/products", (route) =>
//     route.fulfill({ json: [{ id: 9, name: "นม" }] }),
//   );
//   await page.goto(url);     <-- ต้องตั้ง route "ก่อน" goto ไม่งั้นคำขอหลุดไปก่อน
//
//   const request = page.waitForRequest("**/api/...");   รอดูคำขอ
//   ... ทำให้เกิดคำขอ ...
//   (await request).method()                               ดู method ที่ส่งไป
// ================================================

const url = "/lessons/12-mock-api";


// ------------------------------------------------
// ข้อ 1: ไม่ mock: ต้องเห็นรายการ 2 อัน และเห็น "กาแฟ"
// ------------------------------------------------
test.fixme("ไม่ mock ต้องเห็นสินค้าจาก API จริง", async ({ page }) => {});
// 👉 เขียน test ของข้อ 1 ตรงนี้


// ------------------------------------------------
// ข้อ 2: mock ให้ API คืน [{ id: 9, name: "นม" }] แล้วต้องมีรายการเดียว คือ "นม"
// แนวทาง: page.route(...) ก่อน page.goto(url)
// ------------------------------------------------
test.fixme("mock API ให้คืนสินค้า นม ชิ้นเดียว", async ({ page }) => {});
// 👉 เขียน test ของข้อ 2 ตรงนี้


// ------------------------------------------------
// ข้อ 3: ตรวจว่าหน้าเว็บส่งคำขอ GET ไป API products จริง
// แนวทาง: const request = page.waitForRequest(...) ก่อน goto แล้ว expect((await request).method()).toBe("GET")
// ------------------------------------------------
test.fixme("หน้าเว็บต้องเรียก API products", async ({ page }) => {});
// 👉 เขียน test ของข้อ 3 ตรงนี้
