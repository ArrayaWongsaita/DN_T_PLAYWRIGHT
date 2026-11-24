import { test, expect } from "@playwright/test";

// ================================================
// บทที่ 17 (ส่วนที่ 2): ใช้ session ที่ login ไว้แล้ว
// ฝึก: test.use({ storageState }), เทียบกับตอนไม่ได้ login
//
// ทำ e2e/shop/auth.setup.ts ให้เสร็จก่อน (ส่วนที่ 1)
//
//   test.describe("ชื่อกลุ่ม", () => {
//     test.use({ storageState: "playwright/.auth/user.json" });   ใช้ได้ทั้งกลุ่ม
//     test("...", async ({ page }) => { ... });
//   });
//
// หน้า /shop/checkout ต้อง login ก่อน ถ้าไม่ได้ login จะถูกส่งไป /shop/login?next=/shop/checkout
// ================================================


// ------------------------------------------------
// ข้อ 1: ใช้ storageState: เข้า /shop/checkout ต้องอยู่ที่ /shop/checkout (ไม่ถูกส่งไป login)
//        และเห็นหัวข้อ "ชำระเงิน"
// ------------------------------------------------
test.fixme("เข้า checkout ได้เลยโดยไม่ถูกส่งไปหน้า login", async ({ page }) => {});
// 👉 เขียน test ของข้อ 1 ตรงนี้ (ห่อด้วย describe + test.use)


// ------------------------------------------------
// ข้อ 2: ไม่ใช้ storageState: เข้า /shop/checkout ต้องถูกส่งไป URL ที่มี /shop/login
// ------------------------------------------------
test.fixme("ไม่ได้ login เข้า checkout ต้องถูกส่งไปหน้า login", async ({ page }) => {});
// 👉 เขียน test ของข้อ 2 ตรงนี้
