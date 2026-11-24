import { test, expect } from "@playwright/test";
import { ProductListPage } from "./pages/ProductListPage";
import { CartPage } from "./pages/CartPage";
import { LoginPage } from "./pages/LoginPage";

test("เพิ่มชากับกาแฟผ่าน Page Object แล้วตะกร้ามี 2 รายการ รวม ฿130", async ({ page }) => {
  const list = new ProductListPage(page);
  const cart = new CartPage(page);
  await list.goto();
  await list.add("ชา");
  await list.add("กาแฟ");
  await expect(list.cartLink).toHaveText("ตะกร้า (2)");
  await cart.goto();
  await expect(cart.items).toHaveCount(2);
  await expect(cart.total).toHaveText("รวม ฿130");
});

test("login ผิดต้องเห็น error", async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login("demo", "ผิด");
  await expect(login.error).toHaveText("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
});
