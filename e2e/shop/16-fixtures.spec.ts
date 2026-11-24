import { test, expect } from "./fixtures";

// ================================================
// บทที่ 16: fixtures
// ฝึก: test.extend, ส่ง Page Object เข้า test ผ่านพารามิเตอร์
//
// fixture คือของที่ Playwright "เตรียมให้" ก่อน test รัน และเก็บกวาดให้หลังจบ
// เรารู้จัก page แล้ว ที่เป็น fixture ตัวหนึ่ง ตอนนี้สร้างของเราเองได้
//
//   export const test = base.extend<{ productList: ProductListPage }>({
//     productList: async ({ page }, use) => {
//       await use(new ProductListPage(page));    // use(...) ส่งค่าให้ test
//     },
//   });
//
//   test("...", async ({ productList }) => { await productList.goto(); });
//
// ข้อดี: test ไม่ต้อง new ทุกที และ fixture ขึ้นมาให้เฉพาะ test ที่ขอ
// ต้องทำ: เติม e2e/shop/fixtures.ts (หาจุด 👉) ให้เสร็จก่อน ไฟล์นี้ import test จาก "./fixtures"
// ================================================


// ------------------------------------------------
// ข้อ 1: เปิด /shop เพิ่ม "นม" ลิงก์ตะกร้าต้องเป็น "ตะกร้า (1)" แล้วเปิดตะกร้า ยอดรวม "รวม ฿40"
//        ใช้ fixture productList และ cart
// ------------------------------------------------
test.fixme("ใช้ fixture productList และ cart ได้เลยโดยไม่ต้อง new", async ({ productList, cart }) => {});
// 👉 เขียน test ของข้อ 1 ตรงนี้


// ------------------------------------------------
// ข้อ 2: ใช้ fixture loginPage: login ด้วย demo / รหัสผิด แล้ว error ต้องมองเห็น
// ------------------------------------------------
test.fixme("ใช้ fixture loginPage", async ({ loginPage }) => {});
// 👉 เขียน test ของข้อ 2 ตรงนี้
