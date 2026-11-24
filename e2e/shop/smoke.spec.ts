import { test, expect } from "@playwright/test";

async function addTeaAndCoffee(page: import("@playwright/test").Page) {
  await page.goto("/shop");
  await page.getByRole("button", { name: "เพิ่ม ชา ลงตะกร้า" }).click();
  await page.getByRole("button", { name: "เพิ่ม กาแฟ ลงตะกร้า" }).click();
}

test("ใส่ชากับกาแฟแล้วตะกร้ารวม ฿130", async ({ page }) => {
  await addTeaAndCoffee(page);
  await expect(page.getByRole("link", { name: "ตะกร้า (2)" })).toBeVisible();
  await page.getByRole("link", { name: /^ตะกร้า/ }).click();
  await expect(page.getByText("รวม ฿130")).toBeVisible();
});

test("ยังไม่ login แล้วไป checkout ต้องถูกส่งไปหน้า login", async ({ page }) => {
  await page.goto("/shop/checkout");
  await expect(page).toHaveURL(/\/shop\/login\?next=\/shop\/checkout/);
});

test("login แล้ว checkout สำเร็จ", async ({ page }) => {
  await addTeaAndCoffee(page);
  await page.goto("/shop/login?next=/shop/checkout");
  await page.getByLabel("ชื่อผู้ใช้").fill("demo");
  await page.getByLabel("รหัสผ่าน").fill("1234");
  await page.getByRole("button", { name: "เข้าสู่ระบบ" }).click();
  await expect(page).toHaveURL(/\/shop\/checkout/);
  await page.getByRole("button", { name: "ยืนยันการสั่งซื้อ" }).click();
  await expect(page.getByText("สั่งซื้อสำเร็จ")).toBeVisible();
});

test("รหัสผ่านผิดต้องเห็นข้อความเตือน", async ({ page }) => {
  await page.goto("/shop/login");
  await page.getByLabel("ชื่อผู้ใช้").fill("demo");
  await page.getByLabel("รหัสผ่าน").fill("ผิด");
  await page.getByRole("button", { name: "เข้าสู่ระบบ" }).click();
  await expect(page.getByText("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง")).toBeVisible();
});

test("ตะกร้าแยกกันระหว่างผู้ใช้ (browser context) คนละคน", async ({ browser, baseURL }) => {
  const a = await browser.newContext({ baseURL });
  const b = await browser.newContext({ baseURL });
  const pageA = await a.newPage();
  const pageB = await b.newPage();
  await pageA.goto("/shop");
  await pageA.getByRole("button", { name: "เพิ่ม ชา ลงตะกร้า" }).click();
  await pageA.getByRole("link", { name: /^ตะกร้า/ }).click();
  await expect(pageA.getByText("รวม ฿50")).toBeVisible();
  await pageB.goto("/shop/cart");
  await expect(pageB.getByText("ตะกร้าว่างเปล่า")).toBeVisible();
  await a.close();
  await b.close();
});

test("กดยืนยันสั่งซื้อทันทีหลัง login redirect ต้องไม่หลุด (guard hydration race)", async ({ page }) => {
  await addTeaAndCoffee(page);
  await page.goto("/shop/cart");
  await page.getByRole("button", { name: "ไปชำระเงิน" }).click();
  await page.getByLabel("ชื่อผู้ใช้").fill("demo");
  await page.getByLabel("รหัสผ่าน").fill("1234");
  await page.getByRole("button", { name: "เข้าสู่ระบบ" }).click();
  await expect(page).toHaveURL(/\/shop\/checkout$/);
  await page.getByRole("button", { name: "ยืนยันการสั่งซื้อ" }).click();
  await expect(page.getByText("สั่งซื้อสำเร็จ")).toBeVisible();
});
