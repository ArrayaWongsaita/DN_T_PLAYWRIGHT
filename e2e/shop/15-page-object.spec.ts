import { test, expect } from "@playwright/test";
import { ProductListPage } from "./pages/ProductListPage";
import { CartPage } from "./pages/CartPage";
import { LoginPage } from "./pages/LoginPage";

// ================================================
// บทที่ 15: Page Object
// ฝึก: เขียน class ที่ห่อ locator และ action ของแต่ละหน้า
//
// ปัญหา: ถ้า test หลายอันต้องเขียน page.getByRole("button", { name: "เพิ่ม ชา ลงตะกร้า" }) ซ้ำๆ
// พอปุ่มเปลี่ยนชื่อ ต้องไล่แก้ทุก test
// Page Object รวมไว้ที่เดียว: test อ่านเหมือนประโยค (list.add("ชา")) และแก้ที่เดียวจบ
//
//   class ProductListPage {
//     readonly cartLink: Locator;
//     constructor(private readonly page: Page) { this.cartLink = page.getByRole(...); }
//     async goto() { await this.page.goto("/shop"); }
//   }
//   const list = new ProductListPage(page);
//   await list.goto();
//
// กฎ: assertion ไว้ใน test (expect) ส่วน Page Object ให้มีแค่ locator และ action
//
// ขั้นตอน: เติมโค้ดในไฟล์ใต้ e2e/shop/pages/ (มีโครงให้แล้ว หาจุด 👉) แล้วค่อยเขียน test ข้างล่าง
// ================================================


// ------------------------------------------------
// ข้อ 1: เติม ProductListPage, CartPage แล้วเขียน test: เพิ่มชากับกาแฟผ่าน Page Object
//        ลิงก์ตะกร้าต้องเป็น "ตะกร้า (2)" ในตะกร้ามี 2 รายการ และยอดรวมเป็น "รวม ฿130"
// ------------------------------------------------
test.fixme("เพิ่มชากับกาแฟผ่าน Page Object แล้วตะกร้ามี 2 รายการ รวม ฿130", async ({ page }) => {});
// 👉 เขียน test ของข้อ 1 ตรงนี้


// ------------------------------------------------
// ข้อ 2: เติม LoginPage แล้วเขียน test: login ด้วย demo / รหัสผิด ต้องเห็น error
//        "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"
// ------------------------------------------------
test.fixme("login ผิดต้องเห็น error", async ({ page }) => {});
// 👉 เขียน test ของข้อ 2 ตรงนี้
